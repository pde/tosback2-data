
/*
yuiloader-dom-event.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=(""+A[C]).split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules,B,H,G,F,C;if(!I[A]){I[A]={versions:[],builds:[]};}B=I[A];H=D.version;G=D.build;F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var D=function(H){var I=0;return parseFloat(H.replace(/\./g,function(){return(I++==1)?"":".";}));},G=navigator,F={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:G.cajaVersion,secure:false,os:null},C=navigator&&navigator.userAgent,E=window&&window.location,B=E&&E.href,A;F.secure=B&&(B.toLowerCase().indexOf("https")===0);if(C){if((/windows|win32/i).test(C)){F.os="windows";}else{if((/macintosh/i).test(C)){F.os="macintosh";}}if((/KHTML/).test(C)){F.webkit=1;}A=C.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){F.webkit=D(A[1]);if(/ Mobile\//.test(C)){F.mobile="Apple";}else{A=C.match(/NokiaN[^\/]*/);if(A){F.mobile=A[0];}}A=C.match(/AdobeAIR\/([^\s]*)/);if(A){F.air=A[0];}}if(!F.webkit){A=C.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){F.opera=D(A[1]);A=C.match(/Opera Mini[^;]*/);if(A){F.mobile=A[0];}}else{A=C.match(/MSIE\s([^;]*)/);if(A&&A[1]){F.ie=D(A[1]);}else{A=C.match(/Gecko\/([^\s]*)/);if(A){F.gecko=1;A=C.match(/rv:([^\s\)]*)/);if(A&&A[1]){F.gecko=D(A[1]);}}}}}}return F;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C++){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var B=YAHOO.lang,A=Object.prototype,H="[object Array]",C="[object Function]",G="[object Object]",E=[],F=["toString","valueOf"],D={isArray:function(I){return A.toString.apply(I)===H;},isBoolean:function(I){return typeof I==="boolean";},isFunction:function(I){return(typeof I==="function")||A.toString.apply(I)===C;},isNull:function(I){return I===null;},isNumber:function(I){return typeof I==="number"&&isFinite(I);},isObject:function(I){return(I&&(typeof I==="object"||B.isFunction(I)))||false;},isString:function(I){return typeof I==="string";},isUndefined:function(I){return typeof I==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(K,J){var I,M,L;for(I=0;I<F.length;I=I+1){M=F[I];L=J[M];if(B.isFunction(L)&&L!=A[M]){K[M]=L;}}}:function(){},extend:function(L,M,K){if(!M||!L){throw new Error("extend failed, please check that "+"all dependencies are included.");}var J=function(){},I;J.prototype=M.prototype;L.prototype=new J();L.prototype.constructor=L;L.superclass=M.prototype;if(M.prototype.constructor==A.constructor){M.prototype.constructor=M;}if(K){for(I in K){if(B.hasOwnProperty(K,I)){L.prototype[I]=K[I];}}B._IEEnumFix(L.prototype,K);}},augmentObject:function(M,L){if(!L||!M){throw new Error("Absorb failed, verify dependencies.");}var I=arguments,K,N,J=I[2];if(J&&J!==true){for(K=2;K<I.length;K=K+1){M[I[K]]=L[I[K]];}}else{for(N in L){if(J||!(N in M)){M[N]=L[N];}}B._IEEnumFix(M,L);}},augmentProto:function(L,K){if(!K||!L){throw new Error("Augment failed, verify dependencies.");}var I=[L.prototype,K.prototype],J;for(J=2;J<arguments.length;J=J+1){I.push(arguments[J]);}B.augmentObject.apply(this,I);},dump:function(I,N){var K,M,P=[],Q="{...}",J="f(){...}",O=", ",L=" => ";if(!B.isObject(I)){return I+"";}else{if(I instanceof Date||("nodeType" in I&&"tagName" in I)){return I;}else{if(B.isFunction(I)){return J;}}}N=(B.isNumber(N))?N:3;if(B.isArray(I)){P.push("[");for(K=0,M=I.length;K<M;K=K+1){if(B.isObject(I[K])){P.push((N>0)?B.dump(I[K],N-1):Q);}else{P.push(I[K]);}P.push(O);}if(P.length>1){P.pop();}P.push("]");}else{P.push("{");for(K in I){if(B.hasOwnProperty(I,K)){P.push(K+L);if(B.isObject(I[K])){P.push((N>0)?B.dump(I[K],N-1):Q);}else{P.push(I[K]);}P.push(O);}}if(P.length>1){P.pop();}P.push("}");}return P.join("");},substitute:function(Y,J,R){var N,M,L,U,V,X,T=[],K,O="dump",S=" ",I="{",W="}",Q,P;for(;;){N=Y.lastIndexOf(I);if(N<0){break;}M=Y.indexOf(W,N);if(N+1>=M){break;}K=Y.substring(N+1,M);U=K;X=null;L=U.indexOf(S);if(L>-1){X=U.substring(L+1);U=U.substring(0,L);}V=J[U];if(R){V=R(U,V,X);}if(B.isObject(V)){if(B.isArray(V)){V=B.dump(V,parseInt(X,10));}else{X=X||"";Q=X.indexOf(O);if(Q>-1){X=X.substring(4);}P=V.toString();if(P===G||Q>-1){V=B.dump(V,parseInt(X,10));}else{V=P;}}}else{if(!B.isString(V)&&!B.isNumber(V)){V="~-"+T.length+"-~";T[T.length]=K;}}Y=Y.substring(0,N)+V+Y.substring(M+1);}for(N=T.length-1;N>=0;N=N-1){Y=Y.replace(new RegExp("~-"+N+"-~"),"{"+T[N]+"}","g");}return Y;},trim:function(I){try{return I.replace(/^\s+|\s+$/g,"");}catch(J){return I;}},merge:function(){var L={},J=arguments,I=J.length,K;for(K=0;K<I;K=K+1){B.augmentObject(L,J[K],true);}return L;},later:function(P,J,Q,L,M){P=P||0;J=J||{};var K=Q,O=L,N,I;if(B.isString(Q)){K=J[Q];}if(!K){throw new TypeError("method undefined");}if(O&&!B.isArray(O)){O=[L];}N=function(){K.apply(J,O||E);};I=(M)?setInterval(N,P):setTimeout(N,P);return{interval:M,cancel:function(){if(this.interval){clearInterval(I);}else{clearTimeout(I);}}};},isValue:function(I){return(B.isObject(I)||B.isString(I)||B.isNumber(I)||B.isBoolean(I));}};B.hasOwnProperty=(A.hasOwnProperty)?function(I,J){return I&&I.hasOwnProperty(J);}:function(I,J){return !B.isUndefined(I[J])&&I.constructor.prototype[J]!==I[J];};D.augmentObject(B,D,true);YAHOO.util.Lang=B;B.augment=B.augmentProto;YAHOO.augment=B.augmentProto;YAHOO.extend=B.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.8.0r4",build:"2449"});
YAHOO.util.Get=function(){var M={},L=0,R=0,E=false,N=YAHOO.env.ua,S=YAHOO.lang;var J=function(W,T,X){var U=X||window,Y=U.document,Z=Y.createElement(W);for(var V in T){if(T[V]&&YAHOO.lang.hasOwnProperty(T,V)){Z.setAttribute(V,T[V]);}}return Z;};var I=function(U,V,T){var W={id:"yui__dyn_"+(R++),type:"text/css",rel:"stylesheet",href:U};if(T){S.augmentObject(W,T);}return J("link",W,V);};var P=function(U,V,T){var W={id:"yui__dyn_"+(R++),type:"text/javascript",src:U};if(T){S.augmentObject(W,T);}return J("script",W,V);};var A=function(T,U){return{tId:T.tId,win:T.win,data:T.data,nodes:T.nodes,msg:U,purge:function(){D(this.tId);}};};var B=function(T,W){var U=M[W],V=(S.isString(T))?U.win.document.getElementById(T):T;if(!V){Q(W,"target node not found: "+T);}return V;};var Q=function(W,V){var T=M[W];if(T.onFailure){var U=T.scope||T.win;T.onFailure.call(U,A(T,V));}};var C=function(W){var T=M[W];T.finished=true;if(T.aborted){var V="transaction "+W+" was aborted";Q(W,V);return;}if(T.onSuccess){var U=T.scope||T.win;T.onSuccess.call(U,A(T));}};var O=function(V){var T=M[V];if(T.onTimeout){var U=T.scope||T;T.onTimeout.call(U,A(T));}};var G=function(V,Z){var U=M[V];if(U.timer){U.timer.cancel();}if(U.aborted){var X="transaction "+V+" was aborted";Q(V,X);return;}if(Z){U.url.shift();if(U.varName){U.varName.shift();}}else{U.url=(S.isString(U.url))?[U.url]:U.url;if(U.varName){U.varName=(S.isString(U.varName))?[U.varName]:U.varName;}}var c=U.win,b=c.document,a=b.getElementsByTagName("head")[0],W;if(U.url.length===0){if(U.type==="script"&&N.webkit&&N.webkit<420&&!U.finalpass&&!U.varName){var Y=P(null,U.win,U.attributes);Y.innerHTML='YAHOO.util.Get._finalize("'+V+'");';U.nodes.push(Y);a.appendChild(Y);}else{C(V);}return;}var T=U.url[0];if(!T){U.url.shift();return G(V);}if(U.timeout){U.timer=S.later(U.timeout,U,O,V);}if(U.type==="script"){W=P(T,c,U.attributes);}else{W=I(T,c,U.attributes);}F(U.type,W,V,T,c,U.url.length);U.nodes.push(W);if(U.insertBefore){var e=B(U.insertBefore,V);if(e){e.parentNode.insertBefore(W,e);}}else{a.appendChild(W);}if((N.webkit||N.gecko)&&U.type==="css"){G(V,T);}};var K=function(){if(E){return;}E=true;for(var T in M){var U=M[T];if(U.autopurge&&U.finished){D(U.tId);delete M[T];}}E=false;};var D=function(Z){if(M[Z]){var T=M[Z],U=T.nodes,X=U.length,c=T.win.document,a=c.getElementsByTagName("head")[0],V,Y,W,b;if(T.insertBefore){V=B(T.insertBefore,Z);if(V){a=V.parentNode;}}for(Y=0;Y<X;Y=Y+1){W=U[Y];if(W.clearAttributes){W.clearAttributes();}else{for(b in W){delete W[b];}}a.removeChild(W);}T.nodes=[];}};var H=function(U,T,V){var X="q"+(L++);V=V||{};if(L%YAHOO.util.Get.PURGE_THRESH===0){K();}M[X]=S.merge(V,{tId:X,type:U,url:T,finished:false,aborted:false,nodes:[]});var W=M[X];W.win=W.win||window;W.scope=W.scope||W.win;W.autopurge=("autopurge" in W)?W.autopurge:(U==="script")?true:false;if(V.charset){W.attributes=W.attributes||{};W.attributes.charset=V.charset;}S.later(0,W,G,X);return{tId:X};};var F=function(c,X,W,U,Y,Z,b){var a=b||G;if(N.ie){X.onreadystatechange=function(){var d=this.readyState;if("loaded"===d||"complete"===d){X.onreadystatechange=null;a(W,U);}};}else{if(N.webkit){if(c==="script"){if(N.webkit>=420){X.addEventListener("load",function(){a(W,U);});}else{var T=M[W];if(T.varName){var V=YAHOO.util.Get.POLL_FREQ;T.maxattempts=YAHOO.util.Get.TIMEOUT/V;T.attempts=0;T._cache=T.varName[0].split(".");T.timer=S.later(V,T,function(j){var f=this._cache,e=f.length,d=this.win,g;for(g=0;g<e;g=g+1){d=d[f[g]];if(!d){this.attempts++;if(this.attempts++>this.maxattempts){var h="Over retry limit, giving up";T.timer.cancel();Q(W,h);}else{}return;}}T.timer.cancel();a(W,U);},null,true);}else{S.later(YAHOO.util.Get.POLL_FREQ,null,a,[W,U]);}}}}else{X.onload=function(){a(W,U);};}}};return{POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(T){S.later(0,null,C,T);},abort:function(U){var V=(S.isString(U))?U:U.tId;var T=M[V];if(T){T.aborted=true;}},script:function(T,U){return H("script",T,U);},css:function(T,U){return H("css",T,U);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"2.8.0r4",build:"2449"});(function(){var Y=YAHOO,util=Y.util,lang=Y.lang,env=Y.env,PROV="_provides",SUPER="_supersedes",REQ="expanded",AFTER="_after";var YUI={dupsAllowed:{"yahoo":true,"get":true},info:{"root":"2.8.0r4/build/","base":"http://yui.yahooapis.com/2.8.0r4/build/","comboBase":"http://yui.yahooapis.com/combo?","skin":{"defaultSkin":"sam","base":"assets/skins/","path":"skin.css","after":["reset","fonts","grids","base"],"rollup":3},dupsAllowed:["yahoo","get"],"moduleInfo":{"animation":{"type":"js","path":"animation/animation-min.js","requires":["dom","event"]},"autocomplete":{"type":"js","path":"autocomplete/autocomplete-min.js","requires":["dom","event","datasource"],"optional":["connection","animation"],"skinnable":true},"base":{"type":"css","path":"base/base-min.css","after":["reset","fonts","grids"]},"button":{"type":"js","path":"button/button-min.js","requires":["element"],"optional":["menu"],"skinnable":true},"calendar":{"type":"js","path":"calendar/calendar-min.js","requires":["event","dom"],supersedes:["datemeth"],"skinnable":true},"carousel":{"type":"js","path":"carousel/carousel-min.js","requires":["element"],"optional":["animation"],"skinnable":true},"charts":{"type":"js","path":"charts/charts-min.js","requires":["element","json","datasource","swf"]},"colorpicker":{"type":"js","path":"colorpicker/colorpicker-min.js","requires":["slider","element"],"optional":["animation"],"skinnable":true},"connection":{"type":"js","path":"connection/connection-min.js","requires":["event"],"supersedes":["connectioncore"]},"connectioncore":{"type":"js","path":"connection/connection_core-min.js","requires":["event"],"pkg":"connection"},"container":{"type":"js","path":"container/container-min.js","requires":["dom","event"],"optional":["dragdrop","animation","connection"],"supersedes":["containercore"],"skinnable":true},"containercore":{"type":"js","path":"container/container_core-min.js","requires":["dom","event"],"pkg":"container"},"cookie":{"type":"js","path":"cookie/cookie-min.js","requires":["yahoo"]},"datasource":{"type":"js","path":"datasource/datasource-min.js","requires":["event"],"optional":["connection"]},"datatable":{"type":"js","path":"datatable/datatable-min.js","requires":["element","datasource"],"optional":["calendar","dragdrop","paginator"],"skinnable":true},datemath:{"type":"js","path":"datemath/datemath-min.js","requires":["yahoo"]},"dom":{"type":"js","path":"dom/dom-min.js","requires":["yahoo"]},"dragdrop":{"type":"js","path":"dragdrop/dragdrop-min.js","requires":["dom","event"]},"editor":{"type":"js","path":"editor/editor-min.js","requires":["menu","element","button"],"optional":["animation","dragdrop"],"supersedes":["simpleeditor"],"skinnable":true},"element":{"type":"js","path":"element/element-min.js","requires":["dom","event"],"optional":["event-mouseenter","event-delegate"]},"element-delegate":{"type":"js","path":"element-delegate/element-delegate-min.js","requires":["element"]},"event":{"type":"js","path":"event/event-min.js","requires":["yahoo"]},"event-simulate":{"type":"js","path":"event-simulate/event-simulate-min.js","requires":["event"]},"event-delegate":{"type":"js","path":"event-delegate/event-delegate-min.js","requires":["event"],"optional":["selector"]},"event-mouseenter":{"type":"js","path":"event-mouseenter/event-mouseenter-min.js","requires":["dom","event"]},"fonts":{"type":"css","path":"fonts/fonts-min.css"},"get":{"type":"js","path":"get/get-min.js","requires":["yahoo"]},"grids":{"type":"css","path":"grids/grids-min.css","requires":["fonts"],"optional":["reset"]},"history":{"type":"js","path":"history/history-min.js","requires":["event"]},"imagecropper":{"type":"js","path":"imagecropper/imagecropper-min.js","requires":["dragdrop","element","resize"],"skinnable":true},"imageloader":{"type":"js","path":"imageloader/imageloader-min.js","requires":["event","dom"]},"json":{"type":"js","path":"json/json-min.js","requires":["yahoo"]},"layout":{"type":"js","path":"layout/layout-min.js","requires":["element"],"optional":["animation","dragdrop","resize","selector"],"skinnable":true},"logger":{"type":"js","path":"logger/logger-min.js","requires":["event","dom"],"optional":["dragdrop"],"skinnable":true},"menu":{"type":"js","path":"menu/menu-min.js","requires":["containercore"],"skinnable":true},"paginator":{"type":"js","path":"paginator/paginator-min.js","requires":["element"],"skinnable":true},"profiler":{"type":"js","path":"profiler/profiler-min.js","requires":["yahoo"]},"profilerviewer":{"type":"js","path":"profilerviewer/profilerviewer-min.js","requires":["profiler","yuiloader","element"],"skinnable":true},"progressbar":{"type":"js","path":"progressbar/progressbar-min.js","requires":["element"],"optional":["animation"],"skinnable":true},"reset":{"type":"css","path":"reset/reset-min.css"},"reset-fonts-grids":{"type":"css","path":"reset-fonts-grids/reset-fonts-grids.css","supersedes":["reset","fonts","grids","reset-fonts"],"rollup":4},"reset-fonts":{"type":"css","path":"reset-fonts/reset-fonts.css","supersedes":["reset","fonts"],"rollup":2},"resize":{"type":"js","path":"resize/resize-min.js","requires":["dragdrop","element"],"optional":["animation"],"skinnable":true},"selector":{"type":"js","path":"selector/selector-min.js","requires":["yahoo","dom"]},"simpleeditor":{"type":"js","path":"editor/simpleeditor-min.js","requires":["element"],"optional":["containercore","menu","button","animation","dragdrop"],"skinnable":true,"pkg":"editor"},"slider":{"type":"js","path":"slider/slider-min.js","requires":["dragdrop"],"optional":["animation"],"skinnable":true},"storage":{"type":"js","path":"storage/storage-min.js","requires":["yahoo","event","cookie"],"optional":["swfstore"]},"stylesheet":{"type":"js","path":"stylesheet/stylesheet-min.js","requires":["yahoo"]},"swf":{"type":"js","path":"swf/swf-min.js","requires":["element"],"supersedes":["swfdetect"]},"swfdetect":{"type":"js","path":"swfdetect/swfdetect-min.js","requires":["yahoo"]},"swfstore":{"type":"js","path":"swfstore/swfstore-min.js","requires":["element","cookie","swf"]},"tabview":{"type":"js","path":"tabview/tabview-min.js","requires":["element"],"optional":["connection"],"skinnable":true},"treeview":{"type":"js","path":"treeview/treeview-min.js","requires":["event","dom"],"optional":["json","animation","calendar"],"skinnable":true},"uploader":{"type":"js","path":"uploader/uploader-min.js","requires":["element"]},"utilities":{"type":"js","path":"utilities/utilities.js","supersedes":["yahoo","event","dragdrop","animation","dom","connection","element","yahoo-dom-event","get","yuiloader","yuiloader-dom-event"],"rollup":8},"yahoo":{"type":"js","path":"yahoo/yahoo-min.js"},"yahoo-dom-event":{"type":"js","path":"yahoo-dom-event/yahoo-dom-event.js","supersedes":["yahoo","event","dom"],"rollup":3},"yuiloader":{"type":"js","path":"yuiloader/yuiloader-min.js","supersedes":["yahoo","get"]},"yuiloader-dom-event":{"type":"js","path":"yuiloader-dom-event/yuiloader-dom-event.js","supersedes":["yahoo","dom","event","get","yuiloader","yahoo-dom-event"],"rollup":5},"yuitest":{"type":"js","path":"yuitest/yuitest-min.js","requires":["logger"],"optional":["event-simulate"],"skinnable":true}}},ObjectUtil:{appendArray:function(o,a){if(a){for(var i=0;
i<a.length;i=i+1){o[a[i]]=true;}}},keys:function(o,ordered){var a=[],i;for(i in o){if(lang.hasOwnProperty(o,i)){a.push(i);}}return a;}},ArrayUtil:{appendArray:function(a1,a2){Array.prototype.push.apply(a1,a2);},indexOf:function(a,val){for(var i=0;i<a.length;i=i+1){if(a[i]===val){return i;}}return -1;},toObject:function(a){var o={};for(var i=0;i<a.length;i=i+1){o[a[i]]=true;}return o;},uniq:function(a){return YUI.ObjectUtil.keys(YUI.ArrayUtil.toObject(a));}}};YAHOO.util.YUILoader=function(o){this._internalCallback=null;this._useYahooListener=false;this.onSuccess=null;this.onFailure=Y.log;this.onProgress=null;this.onTimeout=null;this.scope=this;this.data=null;this.insertBefore=null;this.charset=null;this.varName=null;this.base=YUI.info.base;this.comboBase=YUI.info.comboBase;this.combine=false;this.root=YUI.info.root;this.timeout=0;this.ignore=null;this.force=null;this.allowRollup=true;this.filter=null;this.required={};this.moduleInfo=lang.merge(YUI.info.moduleInfo);this.rollups=null;this.loadOptional=false;this.sorted=[];this.loaded={};this.dirty=true;this.inserted={};var self=this;env.listeners.push(function(m){if(self._useYahooListener){self.loadNext(m.name);}});this.skin=lang.merge(YUI.info.skin);this._config(o);};Y.util.YUILoader.prototype={FILTERS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(o){if(o){for(var i in o){if(lang.hasOwnProperty(o,i)){if(i=="require"){this.require(o[i]);}else{this[i]=o[i];}}}}var f=this.filter;if(lang.isString(f)){f=f.toUpperCase();if(f==="DEBUG"){this.require("logger");}if(!Y.widget.LogWriter){Y.widget.LogWriter=function(){return Y;};}this.filter=this.FILTERS[f];}},addModule:function(o){if(!o||!o.name||!o.type||(!o.path&&!o.fullpath)){return false;}o.ext=("ext" in o)?o.ext:true;o.requires=o.requires||[];this.moduleInfo[o.name]=o;this.dirty=true;return true;},require:function(what){var a=(typeof what==="string")?arguments:what;this.dirty=true;YUI.ObjectUtil.appendArray(this.required,a);},_addSkin:function(skin,mod){var name=this.formatSkin(skin),info=this.moduleInfo,sinf=this.skin,ext=info[mod]&&info[mod].ext;if(!info[name]){this.addModule({"name":name,"type":"css","path":sinf.base+skin+"/"+sinf.path,"after":sinf.after,"rollup":sinf.rollup,"ext":ext});}if(mod){name=this.formatSkin(skin,mod);if(!info[name]){var mdef=info[mod],pkg=mdef.pkg||mod;this.addModule({"name":name,"type":"css","after":sinf.after,"path":pkg+"/"+sinf.base+skin+"/"+mod+".css","ext":ext});}}return name;},getRequires:function(mod){if(!mod){return[];}if(!this.dirty&&mod.expanded){return mod.expanded;}mod.requires=mod.requires||[];var i,d=[],r=mod.requires,o=mod.optional,info=this.moduleInfo,m;for(i=0;i<r.length;i=i+1){d.push(r[i]);m=info[r[i]];YUI.ArrayUtil.appendArray(d,this.getRequires(m));}if(o&&this.loadOptional){for(i=0;i<o.length;i=i+1){d.push(o[i]);YUI.ArrayUtil.appendArray(d,this.getRequires(info[o[i]]));}}mod.expanded=YUI.ArrayUtil.uniq(d);return mod.expanded;},getProvides:function(name,notMe){var addMe=!(notMe),ckey=(addMe)?PROV:SUPER,m=this.moduleInfo[name],o={};if(!m){return o;}if(m[ckey]){return m[ckey];}var s=m.supersedes,done={},me=this;var add=function(mm){if(!done[mm]){done[mm]=true;lang.augmentObject(o,me.getProvides(mm));}};if(s){for(var i=0;i<s.length;i=i+1){add(s[i]);}}m[SUPER]=o;m[PROV]=lang.merge(o);m[PROV][name]=true;return m[ckey];},calculate:function(o){if(o||this.dirty){this._config(o);this._setup();this._explode();if(this.allowRollup){this._rollup();}this._reduce();this._sort();this.dirty=false;}},_setup:function(){var info=this.moduleInfo,name,i,j;for(name in info){if(lang.hasOwnProperty(info,name)){var m=info[name];if(m&&m.skinnable){var o=this.skin.overrides,smod;if(o&&o[name]){for(i=0;i<o[name].length;i=i+1){smod=this._addSkin(o[name][i],name);}}else{smod=this._addSkin(this.skin.defaultSkin,name);}m.requires.push(smod);}}}var l=lang.merge(this.inserted);if(!this._sandbox){l=lang.merge(l,env.modules);}if(this.ignore){YUI.ObjectUtil.appendArray(l,this.ignore);}if(this.force){for(i=0;i<this.force.length;i=i+1){if(this.force[i] in l){delete l[this.force[i]];}}}for(j in l){if(lang.hasOwnProperty(l,j)){lang.augmentObject(l,this.getProvides(j));}}this.loaded=l;},_explode:function(){var r=this.required,i,mod;for(i in r){if(lang.hasOwnProperty(r,i)){mod=this.moduleInfo[i];if(mod){var req=this.getRequires(mod);if(req){YUI.ObjectUtil.appendArray(r,req);}}}}},_skin:function(){},formatSkin:function(skin,mod){var s=this.SKIN_PREFIX+skin;if(mod){s=s+"-"+mod;}return s;},parseSkin:function(mod){if(mod.indexOf(this.SKIN_PREFIX)===0){var a=mod.split("-");return{skin:a[1],module:a[2]};}return null;},_rollup:function(){var i,j,m,s,rollups={},r=this.required,roll,info=this.moduleInfo;if(this.dirty||!this.rollups){for(i in info){if(lang.hasOwnProperty(info,i)){m=info[i];if(m&&m.rollup){rollups[i]=m;}}}this.rollups=rollups;}for(;;){var rolled=false;for(i in rollups){if(!r[i]&&!this.loaded[i]){m=info[i];s=m.supersedes;roll=false;if(!m.rollup){continue;}var skin=(m.ext)?false:this.parseSkin(i),c=0;if(skin){for(j in r){if(lang.hasOwnProperty(r,j)){if(i!==j&&this.parseSkin(j)){c++;roll=(c>=m.rollup);if(roll){break;}}}}}else{for(j=0;j<s.length;j=j+1){if(this.loaded[s[j]]&&(!YUI.dupsAllowed[s[j]])){roll=false;break;}else{if(r[s[j]]){c++;roll=(c>=m.rollup);if(roll){break;}}}}}if(roll){r[i]=true;rolled=true;this.getRequires(m);}}}if(!rolled){break;}}},_reduce:function(){var i,j,s,m,r=this.required;for(i in r){if(i in this.loaded){delete r[i];}else{var skinDef=this.parseSkin(i);if(skinDef){if(!skinDef.module){var skin_pre=this.SKIN_PREFIX+skinDef.skin;for(j in r){if(lang.hasOwnProperty(r,j)){m=this.moduleInfo[j];var ext=m&&m.ext;if(!ext&&j!==i&&j.indexOf(skin_pre)>-1){delete r[j];}}}}}else{m=this.moduleInfo[i];s=m&&m.supersedes;if(s){for(j=0;j<s.length;j=j+1){if(s[j] in r){delete r[s[j]];}}}}}}},_onFailure:function(msg){YAHOO.log("Failure","info","loader");var f=this.onFailure;if(f){f.call(this.scope,{msg:"failure: "+msg,data:this.data,success:false});
}},_onTimeout:function(){YAHOO.log("Timeout","info","loader");var f=this.onTimeout;if(f){f.call(this.scope,{msg:"timeout",data:this.data,success:false});}},_sort:function(){var s=[],info=this.moduleInfo,loaded=this.loaded,checkOptional=!this.loadOptional,me=this;var requires=function(aa,bb){var mm=info[aa];if(loaded[bb]||!mm){return false;}var ii,rr=mm.expanded,after=mm.after,other=info[bb],optional=mm.optional;if(rr&&YUI.ArrayUtil.indexOf(rr,bb)>-1){return true;}if(after&&YUI.ArrayUtil.indexOf(after,bb)>-1){return true;}if(checkOptional&&optional&&YUI.ArrayUtil.indexOf(optional,bb)>-1){return true;}var ss=info[bb]&&info[bb].supersedes;if(ss){for(ii=0;ii<ss.length;ii=ii+1){if(requires(aa,ss[ii])){return true;}}}if(mm.ext&&mm.type=="css"&&!other.ext&&other.type=="css"){return true;}return false;};for(var i in this.required){if(lang.hasOwnProperty(this.required,i)){s.push(i);}}var p=0;for(;;){var l=s.length,a,b,j,k,moved=false;for(j=p;j<l;j=j+1){a=s[j];for(k=j+1;k<l;k=k+1){if(requires(a,s[k])){b=s.splice(k,1);s.splice(j,0,b[0]);moved=true;break;}}if(moved){break;}else{p=p+1;}}if(!moved){break;}}this.sorted=s;},toString:function(){var o={type:"YUILoader",base:this.base,filter:this.filter,required:this.required,loaded:this.loaded,inserted:this.inserted};lang.dump(o,1);},_combine:function(){this._combining=[];var self=this,s=this.sorted,len=s.length,js=this.comboBase,css=this.comboBase,target,startLen=js.length,i,m,type=this.loadType;YAHOO.log("type "+type);for(i=0;i<len;i=i+1){m=this.moduleInfo[s[i]];if(m&&!m.ext&&(!type||type===m.type)){target=this.root+m.path;target+="&";if(m.type=="js"){js+=target;}else{css+=target;}this._combining.push(s[i]);}}if(this._combining.length){YAHOO.log("Attempting to combine: "+this._combining,"info","loader");var callback=function(o){var c=this._combining,len=c.length,i,m;for(i=0;i<len;i=i+1){this.inserted[c[i]]=true;}this.loadNext(o.data);},loadScript=function(){if(js.length>startLen){YAHOO.util.Get.script(self._filter(js),{data:self._loading,onSuccess:callback,onFailure:self._onFailure,onTimeout:self._onTimeout,insertBefore:self.insertBefore,charset:self.charset,timeout:self.timeout,scope:self});}};if(css.length>startLen){YAHOO.util.Get.css(this._filter(css),{data:this._loading,onSuccess:loadScript,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,scope:self});}else{loadScript();}return;}else{this.loadNext(this._loading);}},insert:function(o,type){this.calculate(o);this._loading=true;this.loadType=type;if(this.combine){return this._combine();}if(!type){var self=this;this._internalCallback=function(){self._internalCallback=null;self.insert(null,"js");};this.insert(null,"css");return;}this.loadNext();},sandbox:function(o,type){this._config(o);if(!this.onSuccess){throw new Error("You must supply an onSuccess handler for your sandbox");}this._sandbox=true;var self=this;if(!type||type!=="js"){this._internalCallback=function(){self._internalCallback=null;self.sandbox(null,"js");};this.insert(null,"css");return;}if(!util.Connect){var ld=new YAHOO.util.YUILoader();ld.insert({base:this.base,filter:this.filter,require:"connection",insertBefore:this.insertBefore,charset:this.charset,onSuccess:function(){this.sandbox(null,"js");},scope:this},"js");return;}this._scriptText=[];this._loadCount=0;this._stopCount=this.sorted.length;this._xhr=[];this.calculate();var s=this.sorted,l=s.length,i,m,url;for(i=0;i<l;i=i+1){m=this.moduleInfo[s[i]];if(!m){this._onFailure("undefined module "+m);for(var j=0;j<this._xhr.length;j=j+1){this._xhr[j].abort();}return;}if(m.type!=="js"){this._loadCount++;continue;}url=m.fullpath;url=(url)?this._filter(url):this._url(m.path);var xhrData={success:function(o){var idx=o.argument[0],name=o.argument[2];this._scriptText[idx]=o.responseText;if(this.onProgress){this.onProgress.call(this.scope,{name:name,scriptText:o.responseText,xhrResponse:o,data:this.data});}this._loadCount++;if(this._loadCount>=this._stopCount){var v=this.varName||"YAHOO";var t="(function() {\n";var b="\nreturn "+v+";\n})();";var ref=eval(t+this._scriptText.join("\n")+b);this._pushEvents(ref);if(ref){this.onSuccess.call(this.scope,{reference:ref,data:this.data});}else{this._onFailure.call(this.varName+" reference failure");}}},failure:function(o){this.onFailure.call(this.scope,{msg:"XHR failure",xhrResponse:o,data:this.data});},scope:this,argument:[i,url,s[i]]};this._xhr.push(util.Connect.asyncRequest("GET",url,xhrData));}},loadNext:function(mname){if(!this._loading){return;}if(mname){if(mname!==this._loading){return;}this.inserted[mname]=true;if(this.onProgress){this.onProgress.call(this.scope,{name:mname,data:this.data});}}var s=this.sorted,len=s.length,i,m;for(i=0;i<len;i=i+1){if(s[i] in this.inserted){continue;}if(s[i]===this._loading){return;}m=this.moduleInfo[s[i]];if(!m){this.onFailure.call(this.scope,{msg:"undefined module "+m,data:this.data});return;}if(!this.loadType||this.loadType===m.type){this._loading=s[i];var fn=(m.type==="css")?util.Get.css:util.Get.script,url=m.fullpath,self=this,c=function(o){self.loadNext(o.data);};url=(url)?this._filter(url):this._url(m.path);if(env.ua.webkit&&env.ua.webkit<420&&m.type==="js"&&!m.varName){c=null;this._useYahooListener=true;}fn(url,{data:s[i],onSuccess:c,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,varName:m.varName,scope:self});return;}}this._loading=null;if(this._internalCallback){var f=this._internalCallback;this._internalCallback=null;f.call(this);}else{if(this.onSuccess){this._pushEvents();this.onSuccess.call(this.scope,{data:this.data});}}},_pushEvents:function(ref){var r=ref||YAHOO;if(r.util&&r.util.Event){r.util.Event._load();}},_filter:function(str){var f=this.filter;return(f)?str.replace(new RegExp(f.searchExp,"g"),f.replaceStr):str;},_url:function(path){return this._filter((this.base||"")+path);}};})();YAHOO.register("yuiloader",YAHOO.util.YUILoader,{version:"2.8.0r4",build:"2449"});
(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var E=YAHOO.util,L=YAHOO.lang,m=YAHOO.env.ua,A=YAHOO.lang.trim,d={},h={},N=/^t(?:able|d|h)$/i,X=/color$/i,K=window.document,W=K.documentElement,e="ownerDocument",n="defaultView",v="documentElement",t="compatMode",b="offsetLeft",P="offsetTop",u="offsetParent",Z="parentNode",l="nodeType",C="tagName",O="scrollLeft",i="scrollTop",Q="getBoundingClientRect",w="getComputedStyle",a="currentStyle",M="CSS1Compat",c="BackCompat",g="class",F="className",J="",B=" ",s="(?:^|\\s)",k="(?= |$)",U="g",p="position",f="fixed",V="relative",j="left",o="top",r="medium",q="borderLeftWidth",R="borderTopWidth",D=m.opera,I=m.webkit,H=m.gecko,T=m.ie;E.Dom={CUSTOM_ATTRIBUTES:(!W.hasAttribute)?{"for":"htmlFor","class":F}:{"htmlFor":"for","className":g},DOT_ATTRIBUTES:{},get:function(z){var AB,x,AA,y,Y,G;if(z){if(z[l]||z.item){return z;}if(typeof z==="string"){AB=z;z=K.getElementById(z);G=(z)?z.attributes:null;if(z&&G&&G.id&&G.id.value===AB){return z;}else{if(z&&K.all){z=null;x=K.all[AB];for(y=0,Y=x.length;y<Y;++y){if(x[y].id===AB){return x[y];}}}}return z;}if(YAHOO.util.Element&&z instanceof YAHOO.util.Element){z=z.get("element");}if("length" in z){AA=[];for(y=0,Y=z.length;y<Y;++y){AA[AA.length]=E.Dom.get(z[y]);}return AA;}return z;}return null;},getComputedStyle:function(G,Y){if(window[w]){return G[e][n][w](G,null)[Y];}else{if(G[a]){return E.Dom.IE_ComputedStyle.get(G,Y);}}},getStyle:function(G,Y){return E.Dom.batch(G,E.Dom._getStyle,Y);},_getStyle:function(){if(window[w]){return function(G,y){y=(y==="float")?y="cssFloat":E.Dom._toCamel(y);var x=G.style[y],Y;if(!x){Y=G[e][n][w](G,null);if(Y){x=Y[y];}}return x;};}else{if(W[a]){return function(G,y){var x;switch(y){case"opacity":x=100;try{x=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(z){try{x=G.filters("alpha").opacity;}catch(Y){}}return x/100;case"float":y="styleFloat";default:y=E.Dom._toCamel(y);x=G[a]?G[a][y]:null;return(G.style[y]||x);}};}}}(),setStyle:function(G,Y,x){E.Dom.batch(G,E.Dom._setStyle,{prop:Y,val:x});},_setStyle:function(){if(T){return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){switch(x){case"opacity":if(L.isString(Y.style.filter)){Y.style.filter="alpha(opacity="+y*100+")";if(!Y[a]||!Y[a].hasLayout){Y.style.zoom=1;}}break;case"float":x="styleFloat";default:Y.style[x]=y;}}else{}};}else{return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){if(x=="float"){x="cssFloat";}Y.style[x]=y;}else{}};}}(),getXY:function(G){return E.Dom.batch(G,E.Dom._getXY);},_canPosition:function(G){return(E.Dom._getStyle(G,"display")!=="none"&&E.Dom._inDoc(G));},_getXY:function(){if(K[v][Q]){return function(y){var z,Y,AA,AF,AE,AD,AC,G,x,AB=Math.floor,AG=false;if(E.Dom._canPosition(y)){AA=y[Q]();AF=y[e];z=E.Dom.getDocumentScrollLeft(AF);Y=E.Dom.getDocumentScrollTop(AF);AG=[AB(AA[j]),AB(AA[o])];if(T&&m.ie<8){AE=2;AD=2;AC=AF[t];if(m.ie===6){if(AC!==c){AE=0;AD=0;}}if((AC===c)){G=S(AF[v],q);x=S(AF[v],R);if(G!==r){AE=parseInt(G,10);}if(x!==r){AD=parseInt(x,10);}}AG[0]-=AE;AG[1]-=AD;}if((Y||z)){AG[0]+=z;AG[1]+=Y;}AG[0]=AB(AG[0]);AG[1]=AB(AG[1]);}else{}return AG;};}else{return function(y){var x,Y,AA,AB,AC,z=false,G=y;if(E.Dom._canPosition(y)){z=[y[b],y[P]];x=E.Dom.getDocumentScrollLeft(y[e]);Y=E.Dom.getDocumentScrollTop(y[e]);AC=((H||m.webkit>519)?true:false);while((G=G[u])){z[0]+=G[b];z[1]+=G[P];if(AC){z=E.Dom._calcBorders(G,z);}}if(E.Dom._getStyle(y,p)!==f){G=y;while((G=G[Z])&&G[C]){AA=G[i];AB=G[O];if(H&&(E.Dom._getStyle(G,"overflow")!=="visible")){z=E.Dom._calcBorders(G,z);}if(AA||AB){z[0]-=AB;z[1]-=AA;}}z[0]+=x;z[1]+=Y;}else{if(D){z[0]-=x;z[1]-=Y;}else{if(I||H){z[0]+=x;z[1]+=Y;}}}z[0]=Math.floor(z[0]);z[1]=Math.floor(z[1]);}else{}return z;};}}(),getX:function(G){var Y=function(x){return E.Dom.getXY(x)[0];};return E.Dom.batch(G,Y,E.Dom,true);},getY:function(G){var Y=function(x){return E.Dom.getXY(x)[1];};return E.Dom.batch(G,Y,E.Dom,true);},setXY:function(G,x,Y){E.Dom.batch(G,E.Dom._setXY,{pos:x,noRetry:Y});},_setXY:function(G,z){var AA=E.Dom._getStyle(G,p),y=E.Dom.setStyle,AD=z.pos,Y=z.noRetry,AB=[parseInt(E.Dom.getComputedStyle(G,j),10),parseInt(E.Dom.getComputedStyle(G,o),10)],AC,x;if(AA=="static"){AA=V;y(G,p,AA);}AC=E.Dom._getXY(G);if(!AD||AC===false){return false;}if(isNaN(AB[0])){AB[0]=(AA==V)?0:G[b];}if(isNaN(AB[1])){AB[1]=(AA==V)?0:G[P];}if(AD[0]!==null){y(G,j,AD[0]-AC[0]+AB[0]+"px");}if(AD[1]!==null){y(G,o,AD[1]-AC[1]+AB[1]+"px");}if(!Y){x=E.Dom._getXY(G);if((AD[0]!==null&&x[0]!=AD[0])||(AD[1]!==null&&x[1]!=AD[1])){E.Dom._setXY(G,{pos:AD,noRetry:true});}}},setX:function(Y,G){E.Dom.setXY(Y,[G,null]);},setY:function(G,Y){E.Dom.setXY(G,[null,Y]);},getRegion:function(G){var Y=function(x){var y=false;if(E.Dom._canPosition(x)){y=E.Region.getRegion(x);}else{}return y;};return E.Dom.batch(G,Y,E.Dom,true);},getClientWidth:function(){return E.Dom.getViewportWidth();},getClientHeight:function(){return E.Dom.getViewportHeight();},getElementsByClassName:function(AB,AF,AC,AE,x,AD){AF=AF||"*";AC=(AC)?E.Dom.get(AC):null||K;if(!AC){return[];}var Y=[],G=AC.getElementsByTagName(AF),z=E.Dom.hasClass;for(var y=0,AA=G.length;y<AA;++y){if(z(G[y],AB)){Y[Y.length]=G[y];}}if(AE){E.Dom.batch(Y,AE,x,AD);}return Y;},hasClass:function(Y,G){return E.Dom.batch(Y,E.Dom._hasClass,G);},_hasClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom._getAttribute(x,F)||J;if(Y.exec){G=Y.test(y);}else{G=Y&&(B+y+B).indexOf(B+Y+B)>-1;}}else{}return G;},addClass:function(Y,G){return E.Dom.batch(Y,E.Dom._addClass,G);},_addClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom._getAttribute(x,F)||J;if(!E.Dom._hasClass(x,Y)){E.Dom.setAttribute(x,F,A(y+B+Y));G=true;}}else{}return G;},removeClass:function(Y,G){return E.Dom.batch(Y,E.Dom._removeClass,G);},_removeClass:function(y,x){var Y=false,AA,z,G;if(y&&x){AA=E.Dom._getAttribute(y,F)||J;E.Dom.setAttribute(y,F,AA.replace(E.Dom._getClassRegex(x),J));z=E.Dom._getAttribute(y,F);if(AA!==z){E.Dom.setAttribute(y,F,A(z));Y=true;if(E.Dom._getAttribute(y,F)===""){G=(y.hasAttribute&&y.hasAttribute(g))?g:F;
y.removeAttribute(G);}}}else{}return Y;},replaceClass:function(x,Y,G){return E.Dom.batch(x,E.Dom._replaceClass,{from:Y,to:G});},_replaceClass:function(y,x){var Y,AB,AA,G=false,z;if(y&&x){AB=x.from;AA=x.to;if(!AA){G=false;}else{if(!AB){G=E.Dom._addClass(y,x.to);}else{if(AB!==AA){z=E.Dom._getAttribute(y,F)||J;Y=(B+z.replace(E.Dom._getClassRegex(AB),B+AA)).split(E.Dom._getClassRegex(AA));Y.splice(1,0,B+AA);E.Dom.setAttribute(y,F,A(Y.join(J)));G=true;}}}}else{}return G;},generateId:function(G,x){x=x||"yui-gen";var Y=function(y){if(y&&y.id){return y.id;}var z=x+YAHOO.env._id_counter++;if(y){if(y[e]&&y[e].getElementById(z)){return E.Dom.generateId(y,z+x);}y.id=z;}return z;};return E.Dom.batch(G,Y,E.Dom,true)||Y.apply(E.Dom,arguments);},isAncestor:function(Y,x){Y=E.Dom.get(Y);x=E.Dom.get(x);var G=false;if((Y&&x)&&(Y[l]&&x[l])){if(Y.contains&&Y!==x){G=Y.contains(x);}else{if(Y.compareDocumentPosition){G=!!(Y.compareDocumentPosition(x)&16);}}}else{}return G;},inDocument:function(G,Y){return E.Dom._inDoc(E.Dom.get(G),Y);},_inDoc:function(Y,x){var G=false;if(Y&&Y[C]){x=x||Y[e];G=E.Dom.isAncestor(x[v],Y);}else{}return G;},getElementsBy:function(Y,AF,AB,AD,y,AC,AE){AF=AF||"*";AB=(AB)?E.Dom.get(AB):null||K;if(!AB){return[];}var x=[],G=AB.getElementsByTagName(AF);for(var z=0,AA=G.length;z<AA;++z){if(Y(G[z])){if(AE){x=G[z];break;}else{x[x.length]=G[z];}}}if(AD){E.Dom.batch(x,AD,y,AC);}return x;},getElementBy:function(x,G,Y){return E.Dom.getElementsBy(x,G,Y,null,null,null,true);},batch:function(x,AB,AA,z){var y=[],Y=(z)?AA:window;x=(x&&(x[C]||x.item))?x:E.Dom.get(x);if(x&&AB){if(x[C]||x.length===undefined){return AB.call(Y,x,AA);}for(var G=0;G<x.length;++G){y[y.length]=AB.call(Y,x[G],AA);}}else{return false;}return y;},getDocumentHeight:function(){var Y=(K[t]!=M||I)?K.body.scrollHeight:W.scrollHeight,G=Math.max(Y,E.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var Y=(K[t]!=M||I)?K.body.scrollWidth:W.scrollWidth,G=Math.max(Y,E.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,Y=K[t];if((Y||T)&&!D){G=(Y==M)?W.clientHeight:K.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,Y=K[t];if(Y||T){G=(Y==M)?W.clientWidth:K.body.clientWidth;}return G;},getAncestorBy:function(G,Y){while((G=G[Z])){if(E.Dom._testElement(G,Y)){return G;}}return null;},getAncestorByClassName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return E.Dom.hasClass(y,G);};return E.Dom.getAncestorBy(Y,x);},getAncestorByTagName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return y[C]&&y[C].toUpperCase()==G.toUpperCase();};return E.Dom.getAncestorBy(Y,x);},getPreviousSiblingBy:function(G,Y){while(G){G=G.previousSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getPreviousSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,Y){while(G){G=G.nextSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getNextSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,x){var Y=(E.Dom._testElement(G.firstChild,x))?G.firstChild:null;return Y||E.Dom.getNextSiblingBy(G.firstChild,x);},getFirstChild:function(G,Y){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getFirstChildBy(G);},getLastChildBy:function(G,x){if(!G){return null;}var Y=(E.Dom._testElement(G.lastChild,x))?G.lastChild:null;return Y||E.Dom.getPreviousSiblingBy(G.lastChild,x);},getLastChild:function(G){G=E.Dom.get(G);return E.Dom.getLastChildBy(G);},getChildrenBy:function(Y,y){var x=E.Dom.getFirstChildBy(Y,y),G=x?[x]:[];E.Dom.getNextSiblingBy(x,function(z){if(!y||y(z)){G[G.length]=z;}return false;});return G;},getChildren:function(G){G=E.Dom.get(G);if(!G){}return E.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||K;return Math.max(G[v].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||K;return Math.max(G[v].scrollTop,G.body.scrollTop);},insertBefore:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}return G[Z].insertBefore(Y,G);},insertAfter:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}if(G.nextSibling){return G[Z].insertBefore(Y,G.nextSibling);}else{return G[Z].appendChild(Y);}},getClientRegion:function(){var x=E.Dom.getDocumentScrollTop(),Y=E.Dom.getDocumentScrollLeft(),y=E.Dom.getViewportWidth()+Y,G=E.Dom.getViewportHeight()+x;return new E.Region(x,y,G,Y);},setAttribute:function(Y,G,x){E.Dom.batch(Y,E.Dom._setAttribute,{attr:G,val:x});},_setAttribute:function(x,Y){var G=E.Dom._toCamel(Y.attr),y=Y.val;if(x&&x.setAttribute){if(E.Dom.DOT_ATTRIBUTES[G]){x[G]=y;}else{G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;x.setAttribute(G,y);}}else{}},getAttribute:function(Y,G){return E.Dom.batch(Y,E.Dom._getAttribute,G);},_getAttribute:function(Y,G){var x;G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;if(Y&&Y.getAttribute){x=Y.getAttribute(G,2);}else{}return x;},_toCamel:function(Y){var x=d;function G(y,z){return z.toUpperCase();}return x[Y]||(x[Y]=Y.indexOf("-")===-1?Y:Y.replace(/-([a-z])/gi,G));},_getClassRegex:function(Y){var G;if(Y!==undefined){if(Y.exec){G=Y;}else{G=h[Y];if(!G){Y=Y.replace(E.Dom._patterns.CLASS_RE_TOKENS,"\\$1");G=h[Y]=new RegExp(s+Y+k,U);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g},_testElement:function(G,Y){return G&&G[l]==1&&(!Y||Y(G));},_calcBorders:function(x,y){var Y=parseInt(E.Dom[w](x,R),10)||0,G=parseInt(E.Dom[w](x,q),10)||0;if(H){if(N.test(x[C])){Y=0;G=0;}}y[0]+=G;y[1]+=Y;return y;}};var S=E.Dom[w];if(m.opera){E.Dom[w]=function(Y,G){var x=S(Y,G);if(X.test(G)){x=E.Dom.Color.toRGB(x);}return x;};}if(m.webkit){E.Dom[w]=function(Y,G){var x=S(Y,G);if(x==="rgba(0, 0, 0, 0)"){x="transparent";}return x;};}if(m.ie&&m.ie>=8&&K.documentElement.hasAttribute){E.Dom.DOT_ATTRIBUTES.type=true;}})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this.y=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this.x=B;this[0]=B;
this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top),D=Math.min(this.right,E.right),A=Math.min(this.bottom,E.bottom),B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top),D=Math.max(this.right,E.right),A=Math.max(this.bottom,E.bottom),B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D),C=F[1],E=F[0]+D.offsetWidth,A=F[1]+D.offsetHeight,B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}YAHOO.util.Point.superclass.constructor.call(this,B,A,B,A);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var B=YAHOO.util,A="clientTop",F="clientLeft",J="parentNode",K="right",W="hasLayout",I="px",U="opacity",L="auto",D="borderLeftWidth",G="borderTopWidth",P="borderRightWidth",V="borderBottomWidth",S="visible",Q="transparent",N="height",E="width",H="style",T="currentStyle",R=/^width|height$/,O=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,M={get:function(X,Z){var Y="",a=X[T][Z];if(Z===U){Y=B.Dom.getStyle(X,U);}else{if(!a||(a.indexOf&&a.indexOf(I)>-1)){Y=a;}else{if(B.Dom.IE_COMPUTED[Z]){Y=B.Dom.IE_COMPUTED[Z](X,Z);}else{if(O.test(a)){Y=B.Dom.IE.ComputedStyle.getPixel(X,Z);}else{Y=a;}}}}return Y;},getOffset:function(Z,e){var b=Z[T][e],X=e.charAt(0).toUpperCase()+e.substr(1),c="offset"+X,Y="pixel"+X,a="",d;if(b==L){d=Z[c];if(d===undefined){a=0;}a=d;if(R.test(e)){Z[H][e]=d;if(Z[c]>d){a=d-(Z[c]-d);}Z[H][e]=L;}}else{if(!Z[H][Y]&&!Z[H][e]){Z[H][e]=b;}a=Z[H][Y];}return a+I;},getBorderWidth:function(X,Z){var Y=null;if(!X[T][W]){X[H].zoom=1;}switch(Z){case G:Y=X[A];break;case V:Y=X.offsetHeight-X.clientHeight-X[A];break;case D:Y=X[F];break;case P:Y=X.offsetWidth-X.clientWidth-X[F];break;}return Y+I;},getPixel:function(Y,X){var a=null,b=Y[T][K],Z=Y[T][X];Y[H][K]=Z;a=Y[H].pixelRight;Y[H][K]=b;return a+I;},getMargin:function(Y,X){var Z;if(Y[T][X]==L){Z=0+I;}else{Z=B.Dom.IE.ComputedStyle.getPixel(Y,X);}return Z;},getVisibility:function(Y,X){var Z;while((Z=Y[T])&&Z[X]=="inherit"){Y=Y[J];}return(Z)?Z[X]:S;},getColor:function(Y,X){return B.Dom.Color.toRGB(Y[T][X])||Q;},getBorderColor:function(Y,X){var Z=Y[T],a=Z[X]||Z.color;return B.Dom.Color.toRGB(B.Dom.Color.toHex(a));}},C={};C.top=C.right=C.bottom=C.left=C[E]=C[N]=M.getOffset;C.color=M.getColor;C[G]=C[P]=C[V]=C[D]=M.getBorderWidth;C.marginTop=C.marginRight=C.marginBottom=C.marginLeft=M.getMargin;C.visibility=M.getVisibility;C.borderColor=C.borderTopColor=C.borderRightColor=C.borderBottomColor=C.borderLeftColor=M.getBorderColor;B.Dom.IE_COMPUTED=C;B.Dom.IE_ComputedStyle=M;})();(function(){var C="toString",A=parseInt,B=RegExp,D=YAHOO.util;D.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Dom.Color.re_RGB.test(E)){E=D.Dom.Color.toHex(E);}if(D.Dom.Color.re_hex.exec(E)){E="rgb("+[A(B.$1,16),A(B.$2,16),A(B.$3,16)].join(", ")+")";}return E;},toHex:function(H){H=D.Dom.Color.KEYWORDS[H]||H;if(D.Dom.Color.re_RGB.exec(H)){var G=(B.$1.length===1)?"0"+B.$1:Number(B.$1),F=(B.$2.length===1)?"0"+B.$2:Number(B.$2),E=(B.$3.length===1)?"0"+B.$3:Number(B.$3);H=[G[C](16),F[C](16),E[C](16)].join("");}if(H.length<6){H=H.replace(D.Dom.Color.re_hex3,"$1$1");}if(H!=="transparent"&&H.indexOf("#")<0){H="#"+H;}return H.toLowerCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.8.0r4",build:"2449"});YAHOO.util.CustomEvent=function(D,C,B,A,E){this.type=D;this.scope=C||window;this.silent=B;this.fireOnce=E;this.fired=false;this.firedWith=null;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var F="_YUICEOnSubscribe";if(D!==F){this.subscribeEvent=new YAHOO.util.CustomEvent(F,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,D){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,D);}var A=new YAHOO.util.Subscriber(B,C,D);if(this.fireOnce&&this.fired){this.notify(A,this.firedWith);}else{this.subscribers.push(A);}},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var H=[],A=this.subscribers.length;var D=[].slice.call(arguments,0),C=true,F,B=false;if(this.fireOnce){if(this.fired){return true;}else{this.firedWith=D;}}this.fired=true;if(!A&&this.silent){return true;}if(!this.silent){}var E=this.subscribers.slice();for(F=0;F<A;++F){var G=E[F];if(!G){B=true;}else{C=this.notify(G,D);if(false===C){if(!this.silent){}break;}}}return(C!==false);},notify:function(F,C){var B,H=null,E=F.getScope(this.scope),A=YAHOO.util.Event.throwErrors;if(!this.silent){}if(this.signature==YAHOO.util.CustomEvent.FLAT){if(C.length>0){H=C[0];}try{B=F.fn.call(E,H,F.obj);}catch(G){this.lastError=G;if(A){throw G;}}}else{try{B=F.fn.call(E,this.type,C,F.obj);}catch(D){this.lastError=D;if(A){throw D;}}}return B;},unsubscribeAll:function(){var A=this.subscribers.length,B;for(B=A-1;B>-1;B--){this._delete(B);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(A,B,C){this.fn=A;this.obj=YAHOO.lang.isUndefined(B)?null:B;this.overrideContext=C;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var G=false,H=[],J=[],A=0,E=[],B=0,C={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},D=YAHOO.env.ua.ie,F="focusin",I="focusout";return{POLL_RETRYS:500,POLL_INTERVAL:40,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:D,_interval:null,_dri:null,_specialTypes:{focusin:(D?"focusin":"focus"),focusout:(D?"focusout":"blur")},DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){this._interval=YAHOO.lang.later(this.POLL_INTERVAL,this,this._tryPreloadAttach,null,true);}},onAvailable:function(Q,M,O,P,N){var K=(YAHOO.lang.isString(Q))?[Q]:Q;for(var L=0;L<K.length;L=L+1){E.push({id:K[L],fn:M,obj:O,overrideContext:P,checkReady:N});}A=this.POLL_RETRYS;this.startInterval();},onContentReady:function(N,K,L,M){this.onAvailable(N,K,L,M,true);},onDOMReady:function(){this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,arguments);},_addListener:function(M,K,V,P,T,Y){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var Q=0,S=M.length;Q<S;++Q){W=this.on(M[Q],K,V,P,T)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var O=this.getEl(M);if(O){M=O;}else{this.onAvailable(M,function(){YAHOO.util.Event._addListener(M,K,V,P,T,Y);});return true;}}}if(!M){return false;}if("unload"==K&&P!==this){J[J.length]=[M,K,V,P,T];return true;}var L=M;if(T){if(T===true){L=P;}else{L=T;}}var N=function(Z){return V.call(L,YAHOO.util.Event.getEvent(Z,M),P);};var X=[M,K,V,N,L,P,T,Y];var R=H.length;H[R]=X;try{this._simpleAdd(M,K,N,Y);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}return true;},_getType:function(K){return this._specialTypes[K]||K;},addListener:function(M,P,L,N,O){var K=((P==F||P==I)&&!YAHOO.env.ua.ie)?true:false;return this._addListener(M,this._getType(P),L,N,O,K);},addFocusListener:function(L,K,M,N){return this.on(L,F,K,M,N);},removeFocusListener:function(L,K){return this.removeListener(L,F,K);},addBlurListener:function(L,K,M,N){return this.on(L,I,K,M,N);},removeBlurListener:function(L,K){return this.removeListener(L,I,K);},removeListener:function(L,K,R){var M,P,U;K=this._getType(K);if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var S=true;for(M=L.length-1;M>-1;M--){S=(this.removeListener(L[M],K,R)&&S);}return S;}}if(!R||!R.call){return this.purgeElement(L,false,K);}if("unload"==K){for(M=J.length-1;M>-1;M--){U=J[M];if(U&&U[0]==L&&U[1]==K&&U[2]==R){J.splice(M,1);return true;}}return false;}var N=null;var O=arguments[3];if("undefined"===typeof O){O=this._getCacheIndex(H,L,K,R);}if(O>=0){N=H[O];}if(!L||!N){return false;}var T=N[this.CAPTURE]===true?true:false;try{this._simpleRemove(L,K,N[this.WFN],T);}catch(Q){this.lastError=Q;return false;}delete H[O][this.WFN];delete H[O][this.FN];H.splice(O,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;if(!K){if(L.type=="mouseout"){K=L.toElement;
}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in C)){K=C[K];}return K;},_getCacheIndex:function(M,P,Q,O){for(var N=0,L=M.length;N<L;N=N+1){var K=M[N];if(K&&K[this.FN]==O&&K[this.EL]==P&&K[this.TYPE]==Q){return N;}}return -1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+B;++B;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",YAHOO,0,0,1),_load:function(L){if(!G){G=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(E.length===0){A=0;if(this._interval){this._interval.cancel();this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var Q=!G;if(!Q){Q=(A>0&&E.length>0);}var P=[];var R=function(T,U){var S=T;if(U.overrideContext){if(U.overrideContext===true){S=U.obj;}else{S=U.overrideContext;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=E.length;L<K;L=L+1){O=E[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(G||N.nextSibling||!Q){M.push(O);E[L]=null;}}else{R(N,O);E[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}A--;if(Q){for(L=E.length-1;L>-1;L--){O=E[L];if(!O||!O.id){E.splice(L,1);}}this.startInterval();}else{if(this._interval){this._interval.cancel();this._interval=null;}}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[H,J];}else{if(K==="unload"){L=[J];}else{K=this._getType(K);L=[H];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(R){var L=YAHOO.util.Event,O,N,M,Q,P,S=J.slice(),K;for(O=0,Q=J.length;O<Q;++O){M=S[O];if(M){K=window;if(M[L.ADJ_SCOPE]){if(M[L.ADJ_SCOPE]===true){K=M[L.UNLOAD_OBJ];}else{K=M[L.ADJ_SCOPE];}}M[L.FN].call(K,L.getEvent(R,M[L.EL]),M[L.UNLOAD_OBJ]);S[O]=null;}}M=null;K=null;J=null;if(H){for(N=H.length-1;N>-1;N--){M=H[N];if(M){L.removeListener(M[L.EL],M[L.TYPE],M[L.FN],N);}}M=null;}L._simpleRemove(window,"unload",L._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;EU.onFocus=EU.addFocusListener;EU.onBlur=EU.addBlurListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(EU.isIE){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;EU._ready();}};}else{YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,overrideContext:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);
},createEvent:function(B,G){this.__yui_events=this.__yui_events||{};var E=G||{},D=this.__yui_events,F;if(D[B]){}else{F=new YAHOO.util.CustomEvent(B,E.scope||this,E.silent,YAHOO.util.CustomEvent.FLAT,E.fireOnce);D[B]=F;if(E.onSubscribeCallback){F.subscribeEvent.subscribe(E.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var A=this.__yui_subscribers[B];if(A){for(var C=0;C<A.length;++C){F.subscribe(A[C].fn,A[C].obj,A[C].overrideContext);}}}return D[B];},fireEvent:function(B){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[B];if(!D){return null;}var A=[];for(var C=1;C<arguments.length;++C){A.push(arguments[C]);}return D.fire.apply(D,A);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};(function(){var A=YAHOO.util.Event,C=YAHOO.lang;YAHOO.util.KeyListener=function(D,I,E,F){if(!D){}else{if(!I){}else{if(!E){}}}if(!F){F=YAHOO.util.KeyListener.KEYDOWN;}var G=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(C.isString(D)){D=document.getElementById(D);}if(C.isFunction(E)){G.subscribe(E);}else{G.subscribe(E.fn,E.scope,E.correctScope);}function H(O,N){if(!I.shift){I.shift=false;}if(!I.alt){I.alt=false;}if(!I.ctrl){I.ctrl=false;}if(O.shiftKey==I.shift&&O.altKey==I.alt&&O.ctrlKey==I.ctrl){var J,M=I.keys,L;if(YAHOO.lang.isArray(M)){for(var K=0;K<M.length;K++){J=M[K];L=A.getCharCode(O);if(J==L){G.fire(L,O);break;}}}else{L=A.getCharCode(O);if(M==L){G.fire(L,O);}}}}this.enable=function(){if(!this.enabled){A.on(D,F,H);this.enabledEvent.fire(I);}this.enabled=true;};this.disable=function(){if(this.enabled){A.removeListener(D,F,H);this.disabledEvent.fire(I);}this.enabled=false;};this.toString=function(){return"KeyListener ["+I.keys+"] "+D.tagName+(D.id?"["+D.id+"]":"");};};var B=YAHOO.util.KeyListener;B.KEYDOWN="keydown";B.KEYUP="keyup";B.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.8.0r4",build:"2449"});YAHOO.register("yuiloader-dom-event", YAHOO, {version: "2.8.0r4", build: "2449"});

/*
cookie-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.namespace("util");YAHOO.util.Cookie={_createCookieString:function(B,D,C,A){var F=YAHOO.lang,E=encodeURIComponent(B)+"="+(C?encodeURIComponent(D):D);if(F.isObject(A)){if(A.expires instanceof Date){E+="; expires="+A.expires.toUTCString();}if(F.isString(A.path)&&A.path!==""){E+="; path="+A.path;}if(F.isString(A.domain)&&A.domain!==""){E+="; domain="+A.domain;}if(A.secure===true){E+="; secure";}}return E;},_createCookieHashString:function(B){var D=YAHOO.lang;if(!D.isObject(B)){throw new TypeError("Cookie._createCookieHashString(): Argument must be an object.");}var C=[];for(var A in B){if(D.hasOwnProperty(B,A)&&!D.isFunction(B[A])&&!D.isUndefined(B[A])){C.push(encodeURIComponent(A)+"="+encodeURIComponent(String(B[A])));}}return C.join("&");},_parseCookieHash:function(E){var D=E.split("&"),F=null,C={};if(E.length>0){for(var B=0,A=D.length;B<A;B++){F=D[B].split("=");C[decodeURIComponent(F[0])]=decodeURIComponent(F[1]);}}return C;},_parseCookieString:function(J,A){var K={};if(YAHOO.lang.isString(J)&&J.length>0){var B=(A===false?function(L){return L;}:decodeURIComponent);var H=J.split(/;\s/g),I=null,C=null,E=null;for(var D=0,F=H.length;D<F;D++){E=H[D].match(/([^=]+)=/i);if(E instanceof Array){try{I=decodeURIComponent(E[1]);C=B(H[D].substring(E[1].length+1));}catch(G){}}else{I=decodeURIComponent(H[D]);C="";}K[I]=C;}}return K;},exists:function(A){if(!YAHOO.lang.isString(A)||A===""){throw new TypeError("Cookie.exists(): Cookie name must be a non-empty string.");}var B=this._parseCookieString(document.cookie,true);return B.hasOwnProperty(A);},get:function(B,A){var E=YAHOO.lang,C;if(E.isFunction(A)){C=A;A={};}else{if(E.isObject(A)){C=A.converter;}else{A={};}}var D=this._parseCookieString(document.cookie,!A.raw);if(!E.isString(B)||B===""){throw new TypeError("Cookie.get(): Cookie name must be a non-empty string.");}if(E.isUndefined(D[B])){return null;}if(!E.isFunction(C)){return D[B];}else{return C(D[B]);}},getSub:function(A,C,B){var E=YAHOO.lang,D=this.getSubs(A);if(D!==null){if(!E.isString(C)||C===""){throw new TypeError("Cookie.getSub(): Subcookie name must be a non-empty string.");}if(E.isUndefined(D[C])){return null;}if(!E.isFunction(B)){return D[C];}else{return B(D[C]);}}else{return null;}},getSubs:function(B){var A=YAHOO.lang.isString;if(!A(B)||B===""){throw new TypeError("Cookie.getSubs(): Cookie name must be a non-empty string.");}var C=this._parseCookieString(document.cookie,false);if(A(C[B])){return this._parseCookieHash(C[B]);}return null;},remove:function(B,A){if(!YAHOO.lang.isString(B)||B===""){throw new TypeError("Cookie.remove(): Cookie name must be a non-empty string.");}A=YAHOO.lang.merge(A||{},{expires:new Date(0)});return this.set(B,"",A);},removeSub:function(B,E,A){var F=YAHOO.lang;A=A||{};if(!F.isString(B)||B===""){throw new TypeError("Cookie.removeSub(): Cookie name must be a non-empty string.");}if(!F.isString(E)||E===""){throw new TypeError("Cookie.removeSub(): Subcookie name must be a non-empty string.");}var D=this.getSubs(B);if(F.isObject(D)&&F.hasOwnProperty(D,E)){delete D[E];if(!A.removeIfEmpty){return this.setSubs(B,D,A);}else{for(var C in D){if(F.hasOwnProperty(D,C)&&!F.isFunction(D[C])&&!F.isUndefined(D[C])){return this.setSubs(B,D,A);}}return this.remove(B,A);}}else{return"";}},set:function(B,C,A){var E=YAHOO.lang;A=A||{};if(!E.isString(B)){throw new TypeError("Cookie.set(): Cookie name must be a string.");}if(E.isUndefined(C)){throw new TypeError("Cookie.set(): Value cannot be undefined.");}var D=this._createCookieString(B,C,!A.raw,A);document.cookie=D;return D;},setSub:function(B,D,C,A){var F=YAHOO.lang;if(!F.isString(B)||B===""){throw new TypeError("Cookie.setSub(): Cookie name must be a non-empty string.");}if(!F.isString(D)||D===""){throw new TypeError("Cookie.setSub(): Subcookie name must be a non-empty string.");}if(F.isUndefined(C)){throw new TypeError("Cookie.setSub(): Subcookie value cannot be undefined.");}var E=this.getSubs(B);if(!F.isObject(E)){E={};}E[D]=C;return this.setSubs(B,E,A);},setSubs:function(B,C,A){var E=YAHOO.lang;if(!E.isString(B)){throw new TypeError("Cookie.setSubs(): Cookie name must be a string.");}if(!E.isObject(C)){throw new TypeError("Cookie.setSubs(): Cookie value must be an object.");}var D=this._createCookieString(B,this._createCookieHashString(C),false,A);document.cookie=D;return D;}};YAHOO.register("cookie",YAHOO.util.Cookie,{version:"2.8.0r4",build:"2449"});
/*
connection-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A);},setDefaultPostHeader:function(A){if(typeof A=="string"){this._default_post_header=A;}else{if(typeof A=="boolean"){this._use_default_post_header=A;}}},setDefaultXhrHeader:function(A){if(typeof A=="string"){this._default_xhr_header=A;}else{this._use_default_xhr_header=A;}},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A;}},createXhrObject:function(F){var D,A,B;try{A=new XMLHttpRequest();D={conn:A,tId:F,xhr:true};}catch(C){for(B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);D={conn:A,tId:F,xhr:true};break;}catch(E){}}}finally{return D;}},getConnectionObject:function(A){var C,D=this._transaction_id;try{if(!A){C=this.createXhrObject(D);}else{C={tId:D};if(A==="xdr"){C.conn=this._transport;C.xdr=true;}else{if(A==="upload"){C.upload=true;}}}if(C){this._transaction_id++;}}catch(B){}return C;},asyncRequest:function(G,D,F,A){var E,C,B=(F&&F.argument)?F.argument:null;if(this._isFileUpload){C="upload";}else{if(F.xdr){C="xdr";}}E=this.getConnectionObject(C);if(!E){return null;}else{if(F&&F.customevents){this.initCustomEvents(E,F);}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(E,F,D,A);return E;}if(G.toUpperCase()=="GET"){if(this._sFormData.length!==0){D+=((D.indexOf("?")==-1)?"?":"&")+this._sFormData;}}else{if(G.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData;}}}if(G.toUpperCase()=="GET"&&(F&&F.cache===false)){D+=((D.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();}if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);}}if((G.toUpperCase()==="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader("Content-Type",this._default_post_header);}if(E.xdr){this.xdr(E,G,D,F,A);return E;}E.conn.open(G,D,true);if(this._has_default_headers||this._has_http_headers){this.setHeader(E);}this.handleReadyState(E,F);E.conn.send(A||"");if(this._isFormSubmit===true){this.resetFormState();}this.startEvent.fire(E,B);if(E.startEvent){E.startEvent.fire(E,B);}return E;}},initCustomEvents:function(A,C){var B;for(B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);A[this._customEvents[B][0]].subscribe(C.customevents[B]);}}},handleReadyState:function(C,D){var B=this,A=(D&&D.argument)?D.argument:null;if(D&&D.timeout){this._timeOut[C.tId]=window.setTimeout(function(){B.abort(C,D,true);},D.timeout);}this._poll[C.tId]=window.setInterval(function(){if(C.conn&&C.conn.readyState===4){window.clearInterval(B._poll[C.tId]);delete B._poll[C.tId];if(D&&D.timeout){window.clearTimeout(B._timeOut[C.tId]);delete B._timeOut[C.tId];}B.completeEvent.fire(C,A);if(C.completeEvent){C.completeEvent.fire(C,A);}B.handleTransactionResponse(C,D);}},this._polling_interval);},handleTransactionResponse:function(B,I,D){var E,A,G=(I&&I.argument)?I.argument:null,C=(B.r&&B.r.statusText==="xdr:success")?true:false,H=(B.r&&B.r.statusText==="xdr:failure")?true:false,J=D;try{if((B.conn.status!==undefined&&B.conn.status!==0)||C){E=B.conn.status;}else{if(H&&!J){E=0;}else{E=13030;}}}catch(F){E=13030;}if((E>=200&&E<300)||E===1223||C){A=B.xdr?B.r:this.createResponseObject(B,G);if(I&&I.success){if(!I.scope){I.success(A);}else{I.success.apply(I.scope,[A]);}}this.successEvent.fire(A);if(B.successEvent){B.successEvent.fire(A);}}else{switch(E){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:A=this.createExceptionObject(B.tId,G,(D?D:false));if(I&&I.failure){if(!I.scope){I.failure(A);}else{I.failure.apply(I.scope,[A]);}}break;default:A=(B.xdr)?B.response:this.createResponseObject(B,G);if(I&&I.failure){if(!I.scope){I.failure(A);}else{I.failure.apply(I.scope,[A]);}}}this.failureEvent.fire(A);if(B.failureEvent){B.failureEvent.fire(A);}}this.releaseObject(B);A=null;},createResponseObject:function(A,G){var D={},I={},E,C,F,B;try{C=A.conn.getAllResponseHeaders();F=C.split("\n");for(E=0;E<F.length;E++){B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=YAHOO.lang.trim(F[E].substring(B+2));}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(G){D.argument=G;}return D;},createExceptionObject:function(H,D,A){var F=0,G="communication failure",C=-1,B="transaction aborted",E={};E.tId=H;if(A){E.status=C;E.statusText=B;}else{E.status=F;E.statusText=G;}if(D){E.argument=D;}return E;},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;B[A]=D;if(C){this._has_default_headers=true;}else{this._has_http_headers=true;}},setHeader:function(A){var B;if(this._has_default_headers){for(B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B]);}}}if(this._has_http_headers){for(B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B]);
}}this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){this._default_headers={};this._has_default_headers=false;},abort:function(E,G,A){var D,B=(G&&G.argument)?G.argument:null;E=E||{};if(E.conn){if(E.xhr){if(this.isCallInProgress(E)){E.conn.abort();window.clearInterval(this._poll[E.tId]);delete this._poll[E.tId];if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{if(E.xdr){E.conn.abort(E.tId);D=true;}}}else{if(E.upload){var C="yuiIO"+E.tId;var F=document.getElementById(C);if(F){YAHOO.util.Event.removeListener(F,"load");document.body.removeChild(F);if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{D=false;}}if(D===true){this.abortEvent.fire(E,B);if(E.abortEvent){E.abortEvent.fire(E,B);}this.handleTransactionResponse(E,G,true);}return D;},isCallInProgress:function(A){A=A||{};if(A.xhr&&A.conn){return A.conn.readyState!==4&&A.conn.readyState!==0;}else{if(A.xdr&&A.conn){return A.conn.isCallInProgress(A.tId);}else{if(A.upload===true){return document.getElementById("yuiIO"+A.tId)?true:false;}else{return false;}}}},releaseObject:function(A){if(A&&A.conn){A.conn=null;A=null;}}};(function(){var G=YAHOO.util.Connect,H={};function D(I){var J='<object id="YUIConnectionSwf" type="application/x-shockwave-flash" data="'+I+'" width="0" height="0">'+'<param name="movie" value="'+I+'">'+'<param name="allowScriptAccess" value="always">'+"</object>",K=document.createElement("div");document.body.appendChild(K);K.innerHTML=J;}function B(L,I,J,M,K){H[parseInt(L.tId)]={"o":L,"c":M};if(K){M.method=I;M.data=K;}L.conn.send(J,M,L.tId);}function E(I){D(I);G._transport=document.getElementById("YUIConnectionSwf");}function C(){G.xdrReadyEvent.fire();}function A(J,I){if(J){G.startEvent.fire(J,I.argument);if(J.startEvent){J.startEvent.fire(J,I.argument);}}}function F(J){var K=H[J.tId].o,I=H[J.tId].c;if(J.statusText==="xdr:start"){A(K,I);return;}J.responseText=decodeURI(J.responseText);K.r=J;if(I.argument){K.r.argument=I.argument;}this.handleTransactionResponse(K,I,J.statusText==="xdr:abort"?true:false);delete H[J.tId];}G.xdr=B;G.swf=D;G.transport=E;G.xdrReadyEvent=new YAHOO.util.CustomEvent("xdrReady");G.xdrReady=C;G.handleXdrResponse=F;})();(function(){var D=YAHOO.util.Connect,F=YAHOO.util.Event;D._isFormSubmit=false;D._isFileUpload=false;D._formNode=null;D._sFormData=null;D._submitElementValue=null;D.uploadEvent=new YAHOO.util.CustomEvent("upload"),D._hasSubmitListener=function(){if(F){F.addListener(document,"click",function(J){var I=F.getTarget(J),H=I.nodeName.toLowerCase();if((H==="input"||H==="button")&&(I.type&&I.type.toLowerCase()=="submit")){D._submitElementValue=encodeURIComponent(I.name)+"="+encodeURIComponent(I.value);}});return true;}return false;}();function G(T,O,J){var S,I,R,P,W,Q=false,M=[],V=0,L,N,K,U,H;this.resetFormState();if(typeof T=="string"){S=(document.getElementById(T)||document.forms[T]);}else{if(typeof T=="object"){S=T;}else{return;}}if(O){this.createFrame(J?J:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=S;return;}for(L=0,N=S.elements.length;L<N;++L){I=S.elements[L];W=I.disabled;R=I.name;if(!W&&R){R=encodeURIComponent(R)+"=";P=encodeURIComponent(I.value);switch(I.type){case"select-one":if(I.selectedIndex>-1){H=I.options[I.selectedIndex];M[V++]=R+encodeURIComponent((H.attributes.value&&H.attributes.value.specified)?H.value:H.text);}break;case"select-multiple":if(I.selectedIndex>-1){for(K=I.selectedIndex,U=I.options.length;K<U;++K){H=I.options[K];if(H.selected){M[V++]=R+encodeURIComponent((H.attributes.value&&H.attributes.value.specified)?H.value:H.text);}}}break;case"radio":case"checkbox":if(I.checked){M[V++]=R+P;}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(Q===false){if(this._hasSubmitListener&&this._submitElementValue){M[V++]=this._submitElementValue;}Q=true;}break;default:M[V++]=R+P;}}}this._isFormSubmit=true;this._sFormData=M.join("&");this.initHeader("Content-Type",this._default_form_header);return this._sFormData;}function C(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";}function B(H){var I="yuiIO"+this._transaction_id,J;if(YAHOO.env.ua.ie){J=document.createElement('<iframe id="'+I+'" name="'+I+'" />');if(typeof H=="boolean"){J.src="javascript:false";}}else{J=document.createElement("iframe");J.id=I;J.name=I;}J.style.position="absolute";J.style.top="-1000px";J.style.left="-1000px";document.body.appendChild(J);}function E(H){var K=[],I=H.split("&"),J,L;for(J=0;J<I.length;J++){L=I[J].indexOf("=");if(L!=-1){K[J]=document.createElement("input");K[J].type="hidden";K[J].name=decodeURIComponent(I[J].substring(0,L));K[J].value=decodeURIComponent(I[J].substring(L+1));this._formNode.appendChild(K[J]);}}return K;}function A(K,V,L,J){var Q="yuiIO"+K.tId,R="multipart/form-data",T=document.getElementById(Q),M=(document.documentMode&&document.documentMode===8)?true:false,W=this,S=(V&&V.argument)?V.argument:null,U,P,I,O,H,N;H={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",L);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",Q);if(YAHOO.env.ua.ie&&!M){this._formNode.setAttribute("encoding",R);}else{this._formNode.setAttribute("enctype",R);}if(J){U=this.appendPostData(J);}this._formNode.submit();this.startEvent.fire(K,S);if(K.startEvent){K.startEvent.fire(K,S);}if(V&&V.timeout){this._timeOut[K.tId]=window.setTimeout(function(){W.abort(K,V,true);},V.timeout);}if(U&&U.length>0){for(P=0;P<U.length;P++){this._formNode.removeChild(U[P]);}}for(I in H){if(YAHOO.lang.hasOwnProperty(H,I)){if(H[I]){this._formNode.setAttribute(I,H[I]);}else{this._formNode.removeAttribute(I);}}}this.resetFormState();N=function(){if(V&&V.timeout){window.clearTimeout(W._timeOut[K.tId]);delete W._timeOut[K.tId];}W.completeEvent.fire(K,S);if(K.completeEvent){K.completeEvent.fire(K,S);
}O={tId:K.tId,argument:V.argument};try{O.responseText=T.contentWindow.document.body?T.contentWindow.document.body.innerHTML:T.contentWindow.document.documentElement.textContent;O.responseXML=T.contentWindow.document.XMLDocument?T.contentWindow.document.XMLDocument:T.contentWindow.document;}catch(X){}if(V&&V.upload){if(!V.scope){V.upload(O);}else{V.upload.apply(V.scope,[O]);}}W.uploadEvent.fire(O);if(K.uploadEvent){K.uploadEvent.fire(O);}F.removeListener(T,"load",N);setTimeout(function(){document.body.removeChild(T);W.releaseObject(K);},100);};F.addListener(T,"load",N);}D.setForm=G;D.resetFormState=C;D.createFrame=B;D.appendPostData=E;D.uploadFile=A;})();YAHOO.register("connection",YAHOO.util.Connect,{version:"2.8.0r4",build:"2449"});

/*
event-mouseenter-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4 
*/
(function(){var B=YAHOO.util.Event,G=YAHOO.lang,E=B.addListener,F=B.removeListener,C=B.getListeners,D=[],H={mouseenter:"mouseover",mouseleave:"mouseout"},A=function(N,M,L){var J=B._getCacheIndex(D,N,M,L),I,K;if(J>=0){I=D[J];}if(N&&I){K=F.call(B,I[0],M,I[3]);if(K){delete D[J][2];delete D[J][3];D.splice(J,1);}}return K;};G.augmentObject(B._specialTypes,H);G.augmentObject(B,{_createMouseDelegate:function(I,J,K){return function(Q,M){var P=this,L=B.getRelatedTarget(Q),O,N;if(P!=L&&!YAHOO.util.Dom.isAncestor(P,L)){O=P;if(K){if(K===true){O=J;}else{O=K;}}N=[Q,P,J];if(M){N.splice(2,0,M);}return I.apply(O,N);}};},addListener:function(M,L,K,N,O){var I,J;if(H[L]){I=B._createMouseDelegate(K,N,O);I.mouseDelegate=true;D.push([M,L,K,I]);J=E.call(B,M,L,I);}else{J=E.apply(B,arguments);}return J;},removeListener:function(L,K,J){var I;if(H[K]){I=A.apply(B,arguments);}else{I=F.apply(B,arguments);}return I;},getListeners:function(N,M){var L=[],P,K=(M==="mouseover"||M==="mouseout"),O,J,I;if(M&&(K||H[M])){P=C.call(B,N,this._getType(M));if(P){for(J=P.length-1;J>-1;J--){I=P[J];O=I.fn.mouseDelegate;if((H[M]&&O)||(K&&!O)){L.push(I);}}}}else{L=C.apply(B,arguments);}return(L&&L.length)?L:null;}},true);B.on=B.addListener;}());YAHOO.register("event-mouseenter",YAHOO.util.Event,{version:"2.8.0r4",build:"2449"});

/*
event-delegate-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var A=YAHOO.util.Event,C=YAHOO.lang,B=[],D=function(H,E,F){var G;if(!H||H===F){G=false;}else{G=YAHOO.util.Selector.test(H,E)?H:D(H.parentNode,E,F);}return G;};C.augmentObject(A,{_createDelegate:function(F,E,G,H){return function(I){var J=this,N=A.getTarget(I),L=E,P=(J.nodeType===9),Q,K,O,M;if(C.isFunction(E)){Q=E(N);}else{if(C.isString(E)){if(!P){O=J.id;if(!O){O=A.generateId(J);}M=("#"+O+" ");L=(M+E).replace(/,/gi,(","+M));}if(YAHOO.util.Selector.test(N,L)){Q=N;}else{if(YAHOO.util.Selector.test(N,((L.replace(/,/gi," *,"))+" *"))){Q=D(N,L,J);}}}}if(Q){K=Q;if(H){if(H===true){K=G;}else{K=H;}}return F.call(K,I,Q,J,G);}};},delegate:function(F,J,L,G,H,I){var E=J,K,M;if(C.isString(G)&&!YAHOO.util.Selector){return false;}if(J=="mouseenter"||J=="mouseleave"){if(!A._createMouseDelegate){return false;}E=A._getType(J);K=A._createMouseDelegate(L,H,I);M=A._createDelegate(function(P,O,N){return K.call(O,P,N);},G,H,I);}else{M=A._createDelegate(L,G,H,I);}B.push([F,E,L,M]);return A.on(F,E,M);},removeDelegate:function(F,J,I){var K=J,H=false,G,E;if(J=="mouseenter"||J=="mouseleave"){K=A._getType(J);}G=A._getCacheIndex(B,F,K,I);if(G>=0){E=B[G];}if(F&&E){H=A.removeListener(E[0],E[1],E[3]);if(H){delete B[G][2];delete B[G][3];B.splice(G,1);}}return H;}});}());YAHOO.register("event-delegate",YAHOO.util.Event,{version:"2.8.0r4",build:"2449"});

/*
datasource-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var lang=YAHOO.lang,util=YAHOO.util,Ev=util.Event;util.DataSourceBase=function(oLiveData,oConfigs){if(oLiveData===null||oLiveData===undefined){return;}this.liveData=oLiveData;this._oQueue={interval:null,conn:null,requests:[]};this.responseSchema={};if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){if(sConfig){this[sConfig]=oConfigs[sConfig];}}}var maxCacheEntries=this.maxCacheEntries;if(!lang.isNumber(maxCacheEntries)||(maxCacheEntries<0)){maxCacheEntries=0;}this._aIntervals=[];this.createEvent("cacheRequestEvent");this.createEvent("cacheResponseEvent");this.createEvent("requestEvent");this.createEvent("responseEvent");this.createEvent("responseParseEvent");this.createEvent("responseCacheEvent");this.createEvent("dataErrorEvent");this.createEvent("cacheFlushEvent");var DS=util.DataSourceBase;this._sName="DataSource instance"+DS._nIndex;DS._nIndex++;};var DS=util.DataSourceBase;lang.augmentObject(DS,{TYPE_UNKNOWN:-1,TYPE_JSARRAY:0,TYPE_JSFUNCTION:1,TYPE_XHR:2,TYPE_JSON:3,TYPE_XML:4,TYPE_TEXT:5,TYPE_HTMLTABLE:6,TYPE_SCRIPTNODE:7,TYPE_LOCAL:8,ERROR_DATAINVALID:"Invalid data",ERROR_DATANULL:"Null data",_nIndex:0,_nTransactionId:0,_getLocationValue:function(field,context){var locator=field.locator||field.key||field,xmldoc=context.ownerDocument||context,result,res,value=null;try{if(!lang.isUndefined(xmldoc.evaluate)){result=xmldoc.evaluate(locator,context,xmldoc.createNSResolver(!context.ownerDocument?context.documentElement:context.ownerDocument.documentElement),0,null);while(res=result.iterateNext()){value=res.textContent;}}else{xmldoc.setProperty("SelectionLanguage","XPath");result=context.selectNodes(locator)[0];value=result.value||result.text||null;}return value;}catch(e){}},issueCallback:function(callback,params,error,scope){if(lang.isFunction(callback)){callback.apply(scope,params);}else{if(lang.isObject(callback)){scope=callback.scope||scope||window;var callbackFunc=callback.success;if(error){callbackFunc=callback.failure;}if(callbackFunc){callbackFunc.apply(scope,params.concat([callback.argument]));}}}},parseString:function(oData){if(!lang.isValue(oData)){return null;}var string=oData+"";if(lang.isString(string)){return string;}else{return null;}},parseNumber:function(oData){if(!lang.isValue(oData)||(oData==="")){return null;}var number=oData*1;if(lang.isNumber(number)){return number;}else{return null;}},convertNumber:function(oData){return DS.parseNumber(oData);},parseDate:function(oData){var date=null;if(!(oData instanceof Date)){date=new Date(oData);}else{return oData;}if(date instanceof Date){return date;}else{return null;}},convertDate:function(oData){return DS.parseDate(oData);}});DS.Parser={string:DS.parseString,number:DS.parseNumber,date:DS.parseDate};DS.prototype={_sName:null,_aCache:null,_oQueue:null,_aIntervals:null,maxCacheEntries:0,liveData:null,dataType:DS.TYPE_UNKNOWN,responseType:DS.TYPE_UNKNOWN,responseSchema:null,useXPath:false,toString:function(){return this._sName;},getCachedResponse:function(oRequest,oCallback,oCaller){var aCache=this._aCache;if(this.maxCacheEntries>0){if(!aCache){this._aCache=[];}else{var nCacheLength=aCache.length;if(nCacheLength>0){var oResponse=null;this.fireEvent("cacheRequestEvent",{request:oRequest,callback:oCallback,caller:oCaller});for(var i=nCacheLength-1;i>=0;i--){var oCacheElem=aCache[i];if(this.isCacheHit(oRequest,oCacheElem.request)){oResponse=oCacheElem.response;this.fireEvent("cacheResponseEvent",{request:oRequest,response:oResponse,callback:oCallback,caller:oCaller});if(i<nCacheLength-1){aCache.splice(i,1);this.addToCache(oRequest,oResponse);}oResponse.cached=true;break;}}return oResponse;}}}else{if(aCache){this._aCache=null;}}return null;},isCacheHit:function(oRequest,oCachedRequest){return(oRequest===oCachedRequest);},addToCache:function(oRequest,oResponse){var aCache=this._aCache;if(!aCache){return;}while(aCache.length>=this.maxCacheEntries){aCache.shift();}var oCacheElem={request:oRequest,response:oResponse};aCache[aCache.length]=oCacheElem;this.fireEvent("responseCacheEvent",{request:oRequest,response:oResponse});},flushCache:function(){if(this._aCache){this._aCache=[];this.fireEvent("cacheFlushEvent");}},setInterval:function(nMsec,oRequest,oCallback,oCaller){if(lang.isNumber(nMsec)&&(nMsec>=0)){var oSelf=this;var nId=setInterval(function(){oSelf.makeConnection(oRequest,oCallback,oCaller);},nMsec);this._aIntervals.push(nId);return nId;}else{}},clearInterval:function(nId){var tracker=this._aIntervals||[];for(var i=tracker.length-1;i>-1;i--){if(tracker[i]===nId){tracker.splice(i,1);clearInterval(nId);}}},clearAllIntervals:function(){var tracker=this._aIntervals||[];for(var i=tracker.length-1;i>-1;i--){clearInterval(tracker[i]);}tracker=[];},sendRequest:function(oRequest,oCallback,oCaller){var oCachedResponse=this.getCachedResponse(oRequest,oCallback,oCaller);if(oCachedResponse){DS.issueCallback(oCallback,[oRequest,oCachedResponse],false,oCaller);return null;}return this.makeConnection(oRequest,oCallback,oCaller);},makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oRawResponse=this.liveData;this.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);return tId;},handleResponse:function(oRequest,oRawResponse,oCallback,oCaller,tId){this.fireEvent("responseEvent",{tId:tId,request:oRequest,response:oRawResponse,callback:oCallback,caller:oCaller});var xhr=(this.dataType==DS.TYPE_XHR)?true:false;var oParsedResponse=null;var oFullResponse=oRawResponse;if(this.responseType===DS.TYPE_UNKNOWN){var ctype=(oRawResponse&&oRawResponse.getResponseHeader)?oRawResponse.getResponseHeader["Content-Type"]:null;if(ctype){if(ctype.indexOf("text/xml")>-1){this.responseType=DS.TYPE_XML;}else{if(ctype.indexOf("application/json")>-1){this.responseType=DS.TYPE_JSON;}else{if(ctype.indexOf("text/plain")>-1){this.responseType=DS.TYPE_TEXT;}}}}else{if(YAHOO.lang.isArray(oRawResponse)){this.responseType=DS.TYPE_JSARRAY;
}else{if(oRawResponse&&oRawResponse.nodeType&&(oRawResponse.nodeType===9||oRawResponse.nodeType===1||oRawResponse.nodeType===11)){this.responseType=DS.TYPE_XML;}else{if(oRawResponse&&oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){this.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){this.responseType=DS.TYPE_TEXT;}}}}}}}switch(this.responseType){case DS.TYPE_JSARRAY:if(xhr&&oRawResponse&&oRawResponse.responseText){oFullResponse=oRawResponse.responseText;}try{if(lang.isString(oFullResponse)){var parseArgs=[oFullResponse].concat(this.parseJSONArgs);if(lang.JSON){oFullResponse=lang.JSON.parse.apply(lang.JSON,parseArgs);}else{if(window.JSON&&JSON.parse){oFullResponse=JSON.parse.apply(JSON,parseArgs);}else{if(oFullResponse.parseJSON){oFullResponse=oFullResponse.parseJSON.apply(oFullResponse,parseArgs.slice(1));}else{while(oFullResponse.length>0&&(oFullResponse.charAt(0)!="{")&&(oFullResponse.charAt(0)!="[")){oFullResponse=oFullResponse.substring(1,oFullResponse.length);}if(oFullResponse.length>0){var arrayEnd=Math.max(oFullResponse.lastIndexOf("]"),oFullResponse.lastIndexOf("}"));oFullResponse=oFullResponse.substring(0,arrayEnd+1);oFullResponse=eval("("+oFullResponse+")");}}}}}}catch(e1){}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseArrayData(oRequest,oFullResponse);break;case DS.TYPE_JSON:if(xhr&&oRawResponse&&oRawResponse.responseText){oFullResponse=oRawResponse.responseText;}try{if(lang.isString(oFullResponse)){var parseArgs=[oFullResponse].concat(this.parseJSONArgs);if(lang.JSON){oFullResponse=lang.JSON.parse.apply(lang.JSON,parseArgs);}else{if(window.JSON&&JSON.parse){oFullResponse=JSON.parse.apply(JSON,parseArgs);}else{if(oFullResponse.parseJSON){oFullResponse=oFullResponse.parseJSON.apply(oFullResponse,parseArgs.slice(1));}else{while(oFullResponse.length>0&&(oFullResponse.charAt(0)!="{")&&(oFullResponse.charAt(0)!="[")){oFullResponse=oFullResponse.substring(1,oFullResponse.length);}if(oFullResponse.length>0){var objEnd=Math.max(oFullResponse.lastIndexOf("]"),oFullResponse.lastIndexOf("}"));oFullResponse=oFullResponse.substring(0,objEnd+1);oFullResponse=eval("("+oFullResponse+")");}}}}}}catch(e){}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseJSONData(oRequest,oFullResponse);break;case DS.TYPE_HTMLTABLE:if(xhr&&oRawResponse.responseText){var el=document.createElement("div");el.innerHTML=oRawResponse.responseText;oFullResponse=el.getElementsByTagName("table")[0];}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseHTMLTableData(oRequest,oFullResponse);break;case DS.TYPE_XML:if(xhr&&oRawResponse.responseXML){oFullResponse=oRawResponse.responseXML;}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseXMLData(oRequest,oFullResponse);break;case DS.TYPE_TEXT:if(xhr&&lang.isString(oRawResponse.responseText)){oFullResponse=oRawResponse.responseText;}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseTextData(oRequest,oFullResponse);break;default:oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseData(oRequest,oFullResponse);break;}oParsedResponse=oParsedResponse||{};if(!oParsedResponse.results){oParsedResponse.results=[];}if(!oParsedResponse.meta){oParsedResponse.meta={};}if(!oParsedResponse.error){oParsedResponse=this.doBeforeCallback(oRequest,oFullResponse,oParsedResponse,oCallback);this.fireEvent("responseParseEvent",{request:oRequest,response:oParsedResponse,callback:oCallback,caller:oCaller});this.addToCache(oRequest,oParsedResponse);}else{oParsedResponse.error=true;this.fireEvent("dataErrorEvent",{request:oRequest,response:oRawResponse,callback:oCallback,caller:oCaller,message:DS.ERROR_DATANULL});}oParsedResponse.tId=tId;DS.issueCallback(oCallback,[oRequest,oParsedResponse],oParsedResponse.error,oCaller);},doBeforeParseData:function(oRequest,oFullResponse,oCallback){return oFullResponse;},doBeforeCallback:function(oRequest,oFullResponse,oParsedResponse,oCallback){return oParsedResponse;},parseData:function(oRequest,oFullResponse){if(lang.isValue(oFullResponse)){var oParsedResponse={results:oFullResponse,meta:{}};return oParsedResponse;}return null;},parseArrayData:function(oRequest,oFullResponse){if(lang.isArray(oFullResponse)){var results=[],i,j,rec,field,data;if(lang.isArray(this.responseSchema.fields)){var fields=this.responseSchema.fields;for(i=fields.length-1;i>=0;--i){if(typeof fields[i]!=="object"){fields[i]={key:fields[i]};}}var parsers={},p;for(i=fields.length-1;i>=0;--i){p=(typeof fields[i].parser==="function"?fields[i].parser:DS.Parser[fields[i].parser+""])||fields[i].converter;if(p){parsers[fields[i].key]=p;}}var arrType=lang.isArray(oFullResponse[0]);for(i=oFullResponse.length-1;i>-1;i--){var oResult={};rec=oFullResponse[i];if(typeof rec==="object"){for(j=fields.length-1;j>-1;j--){field=fields[j];data=arrType?rec[j]:rec[field.key];if(parsers[field.key]){data=parsers[field.key].call(this,data);}if(data===undefined){data=null;}oResult[field.key]=data;}}else{if(lang.isString(rec)){for(j=fields.length-1;j>-1;j--){field=fields[j];data=rec;if(parsers[field.key]){data=parsers[field.key].call(this,data);}if(data===undefined){data=null;}oResult[field.key]=data;}}}results[i]=oResult;}}else{results=oFullResponse;}var oParsedResponse={results:results};return oParsedResponse;}return null;},parseTextData:function(oRequest,oFullResponse){if(lang.isString(oFullResponse)){if(lang.isString(this.responseSchema.recordDelim)&&lang.isString(this.responseSchema.fieldDelim)){var oParsedResponse={results:[]};var recDelim=this.responseSchema.recordDelim;var fieldDelim=this.responseSchema.fieldDelim;if(oFullResponse.length>0){var newLength=oFullResponse.length-recDelim.length;if(oFullResponse.substr(newLength)==recDelim){oFullResponse=oFullResponse.substr(0,newLength);
}if(oFullResponse.length>0){var recordsarray=oFullResponse.split(recDelim);for(var i=0,len=recordsarray.length,recIdx=0;i<len;++i){var bError=false,sRecord=recordsarray[i];if(lang.isString(sRecord)&&(sRecord.length>0)){var fielddataarray=recordsarray[i].split(fieldDelim);var oResult={};if(lang.isArray(this.responseSchema.fields)){var fields=this.responseSchema.fields;for(var j=fields.length-1;j>-1;j--){try{var data=fielddataarray[j];if(lang.isString(data)){if(data.charAt(0)=='"'){data=data.substr(1);}if(data.charAt(data.length-1)=='"'){data=data.substr(0,data.length-1);}var field=fields[j];var key=(lang.isValue(field.key))?field.key:field;if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}else{bError=true;}}catch(e){bError=true;}}}else{oResult=fielddataarray;}if(!bError){oParsedResponse.results[recIdx++]=oResult;}}}}}return oParsedResponse;}}return null;},parseXMLResult:function(result){var oResult={},schema=this.responseSchema;try{for(var m=schema.fields.length-1;m>=0;m--){var field=schema.fields[m];var key=(lang.isValue(field.key))?field.key:field;var data=null;if(this.useXPath){data=YAHOO.util.DataSource._getLocationValue(field,result);}else{var xmlAttr=result.attributes.getNamedItem(key);if(xmlAttr){data=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(key);if(xmlNode&&xmlNode.item(0)){var item=xmlNode.item(0);data=(item)?((item.text)?item.text:(item.textContent)?item.textContent:null):null;if(!data){var datapieces=[];for(var j=0,len=item.childNodes.length;j<len;j++){if(item.childNodes[j].nodeValue){datapieces[datapieces.length]=item.childNodes[j].nodeValue;}}if(datapieces.length>0){data=datapieces.join("");}}}}}if(data===null){data="";}if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}}catch(e){}return oResult;},parseXMLData:function(oRequest,oFullResponse){var bError=false,schema=this.responseSchema,oParsedResponse={meta:{}},xmlList=null,metaNode=schema.metaNode,metaLocators=schema.metaFields||{},i,k,loc,v;try{if(this.useXPath){for(k in metaLocators){oParsedResponse.meta[k]=YAHOO.util.DataSource._getLocationValue(metaLocators[k],oFullResponse);}}else{metaNode=metaNode?oFullResponse.getElementsByTagName(metaNode)[0]:oFullResponse;if(metaNode){for(k in metaLocators){if(lang.hasOwnProperty(metaLocators,k)){loc=metaLocators[k];v=metaNode.getElementsByTagName(loc)[0];if(v){v=v.firstChild.nodeValue;}else{v=metaNode.attributes.getNamedItem(loc);if(v){v=v.value;}}if(lang.isValue(v)){oParsedResponse.meta[k]=v;}}}}}xmlList=(schema.resultNode)?oFullResponse.getElementsByTagName(schema.resultNode):null;}catch(e){}if(!xmlList||!lang.isArray(schema.fields)){bError=true;}else{oParsedResponse.results=[];for(i=xmlList.length-1;i>=0;--i){var oResult=this.parseXMLResult(xmlList.item(i));oParsedResponse.results[i]=oResult;}}if(bError){oParsedResponse.error=true;}else{}return oParsedResponse;},parseJSONData:function(oRequest,oFullResponse){var oParsedResponse={results:[],meta:{}};if(lang.isObject(oFullResponse)&&this.responseSchema.resultsList){var schema=this.responseSchema,fields=schema.fields,resultsList=oFullResponse,results=[],metaFields=schema.metaFields||{},fieldParsers=[],fieldPaths=[],simpleFields=[],bError=false,i,len,j,v,key,parser,path;var buildPath=function(needle){var path=null,keys=[],i=0;if(needle){needle=needle.replace(/\[(['"])(.*?)\1\]/g,function(x,$1,$2){keys[i]=$2;return".@"+(i++);}).replace(/\[(\d+)\]/g,function(x,$1){keys[i]=parseInt($1,10)|0;return".@"+(i++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(needle)){path=needle.split(".");for(i=path.length-1;i>=0;--i){if(path[i].charAt(0)==="@"){path[i]=keys[parseInt(path[i].substr(1),10)];}}}else{}}return path;};var walkPath=function(path,origin){var v=origin,i=0,len=path.length;for(;i<len&&v;++i){v=v[path[i]];}return v;};path=buildPath(schema.resultsList);if(path){resultsList=walkPath(path,oFullResponse);if(resultsList===undefined){bError=true;}}else{bError=true;}if(!resultsList){resultsList=[];}if(!lang.isArray(resultsList)){resultsList=[resultsList];}if(!bError){if(schema.fields){var field;for(i=0,len=fields.length;i<len;i++){field=fields[i];key=field.key||field;parser=((typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""])||field.converter;path=buildPath(key);if(parser){fieldParsers[fieldParsers.length]={key:key,parser:parser};}if(path){if(path.length>1){fieldPaths[fieldPaths.length]={key:key,path:path};}else{simpleFields[simpleFields.length]={key:key,path:path[0]};}}else{}}for(i=resultsList.length-1;i>=0;--i){var r=resultsList[i],rec={};if(r){for(j=simpleFields.length-1;j>=0;--j){rec[simpleFields[j].key]=(r[simpleFields[j].path]!==undefined)?r[simpleFields[j].path]:r[j];}for(j=fieldPaths.length-1;j>=0;--j){rec[fieldPaths[j].key]=walkPath(fieldPaths[j].path,r);}for(j=fieldParsers.length-1;j>=0;--j){var p=fieldParsers[j].key;rec[p]=fieldParsers[j].parser(rec[p]);if(rec[p]===undefined){rec[p]=null;}}}results[i]=rec;}}else{results=resultsList;}for(key in metaFields){if(lang.hasOwnProperty(metaFields,key)){path=buildPath(metaFields[key]);if(path){v=walkPath(path,oFullResponse);oParsedResponse.meta[key]=v;}}}}else{oParsedResponse.error=true;}oParsedResponse.results=results;}else{oParsedResponse.error=true;}return oParsedResponse;},parseHTMLTableData:function(oRequest,oFullResponse){var bError=false;var elTable=oFullResponse;var fields=this.responseSchema.fields;var oParsedResponse={results:[]};if(lang.isArray(fields)){for(var i=0;i<elTable.tBodies.length;i++){var elTbody=elTable.tBodies[i];for(var j=elTbody.rows.length-1;j>-1;j--){var elRow=elTbody.rows[j];var oResult={};for(var k=fields.length-1;k>-1;k--){var field=fields[k];var key=(lang.isValue(field.key))?field.key:field;
var data=elRow.cells[k].innerHTML;if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}oParsedResponse.results[j]=oResult;}}}else{bError=true;}if(bError){oParsedResponse.error=true;}else{}return oParsedResponse;}};lang.augmentProto(DS,util.EventProvider);util.LocalDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_LOCAL;if(oLiveData){if(YAHOO.lang.isArray(oLiveData)){this.responseType=DS.TYPE_JSARRAY;}else{if(oLiveData.nodeType&&oLiveData.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oLiveData.nodeName&&(oLiveData.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;oLiveData=oLiveData.cloneNode(true);}else{if(YAHOO.lang.isString(oLiveData)){this.responseType=DS.TYPE_TEXT;}else{if(YAHOO.lang.isObject(oLiveData)){this.responseType=DS.TYPE_JSON;}}}}}}else{oLiveData=[];this.responseType=DS.TYPE_JSARRAY;}util.LocalDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.LocalDataSource,DS);lang.augmentObject(util.LocalDataSource,DS);util.FunctionDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_JSFUNCTION;oLiveData=oLiveData||function(){};util.FunctionDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.FunctionDataSource,DS,{scope:null,makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oRawResponse=(this.scope)?this.liveData.call(this.scope,oRequest,this):this.liveData(oRequest);if(this.responseType===DS.TYPE_UNKNOWN){if(YAHOO.lang.isArray(oRawResponse)){this.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse&&oRawResponse.nodeType&&oRawResponse.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oRawResponse&&oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){this.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){this.responseType=DS.TYPE_TEXT;}}}}}}this.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);return tId;}});lang.augmentObject(util.FunctionDataSource,DS);util.ScriptNodeDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_SCRIPTNODE;oLiveData=oLiveData||"";util.ScriptNodeDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.ScriptNodeDataSource,DS,{getUtility:util.Get,asyncMode:"allowAll",scriptCallbackParam:"callback",generateRequestCallback:function(id){return"&"+this.scriptCallbackParam+"=YAHOO.util.ScriptNodeDataSource.callbacks["+id+"]";},doBeforeGetScriptNode:function(sUri){return sUri;},makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});if(util.ScriptNodeDataSource._nPending===0){util.ScriptNodeDataSource.callbacks=[];util.ScriptNodeDataSource._nId=0;}var id=util.ScriptNodeDataSource._nId;util.ScriptNodeDataSource._nId++;var oSelf=this;util.ScriptNodeDataSource.callbacks[id]=function(oRawResponse){if((oSelf.asyncMode!=="ignoreStaleResponses")||(id===util.ScriptNodeDataSource.callbacks.length-1)){if(oSelf.responseType===DS.TYPE_UNKNOWN){if(YAHOO.lang.isArray(oRawResponse)){oSelf.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse.nodeType&&oRawResponse.nodeType==9){oSelf.responseType=DS.TYPE_XML;}else{if(oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){oSelf.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){oSelf.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){oSelf.responseType=DS.TYPE_TEXT;}}}}}}oSelf.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);}else{}delete util.ScriptNodeDataSource.callbacks[id];};util.ScriptNodeDataSource._nPending++;var sUri=this.liveData+oRequest+this.generateRequestCallback(id);sUri=this.doBeforeGetScriptNode(sUri);this.getUtility.script(sUri,{autopurge:true,onsuccess:util.ScriptNodeDataSource._bumpPendingDown,onfail:util.ScriptNodeDataSource._bumpPendingDown});return tId;}});lang.augmentObject(util.ScriptNodeDataSource,DS);lang.augmentObject(util.ScriptNodeDataSource,{_nId:0,_nPending:0,callbacks:[]});util.XHRDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_XHR;this.connMgr=this.connMgr||util.Connect;oLiveData=oLiveData||"";util.XHRDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.XHRDataSource,DS,{connMgr:null,connXhrMode:"allowAll",connMethodPost:false,connTimeout:0,makeConnection:function(oRequest,oCallback,oCaller){var oRawResponse=null;var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oSelf=this;var oConnMgr=this.connMgr;var oQueue=this._oQueue;var _xhrSuccess=function(oResponse){if(oResponse&&(this.connXhrMode=="ignoreStaleResponses")&&(oResponse.tId!=oQueue.conn.tId)){return null;}else{if(!oResponse){this.fireEvent("dataErrorEvent",{request:oRequest,response:null,callback:oCallback,caller:oCaller,message:DS.ERROR_DATANULL});DS.issueCallback(oCallback,[oRequest,{error:true}],true,oCaller);return null;}else{if(this.responseType===DS.TYPE_UNKNOWN){var ctype=(oResponse.getResponseHeader)?oResponse.getResponseHeader["Content-Type"]:null;if(ctype){if(ctype.indexOf("text/xml")>-1){this.responseType=DS.TYPE_XML;}else{if(ctype.indexOf("application/json")>-1){this.responseType=DS.TYPE_JSON;}else{if(ctype.indexOf("text/plain")>-1){this.responseType=DS.TYPE_TEXT;}}}}}this.handleResponse(oRequest,oResponse,oCallback,oCaller,tId);}}};var _xhrFailure=function(oResponse){this.fireEvent("dataErrorEvent",{request:oRequest,response:oResponse,callback:oCallback,caller:oCaller,message:DS.ERROR_DATAINVALID});if(lang.isString(this.liveData)&&lang.isString(oRequest)&&(this.liveData.lastIndexOf("?")!==this.liveData.length-1)&&(oRequest.indexOf("?")!==0)){}oResponse=oResponse||{};
oResponse.error=true;DS.issueCallback(oCallback,[oRequest,oResponse],true,oCaller);return null;};var _xhrCallback={success:_xhrSuccess,failure:_xhrFailure,scope:this};if(lang.isNumber(this.connTimeout)){_xhrCallback.timeout=this.connTimeout;}if(this.connXhrMode=="cancelStaleRequests"){if(oQueue.conn){if(oConnMgr.abort){oConnMgr.abort(oQueue.conn);oQueue.conn=null;}else{}}}if(oConnMgr&&oConnMgr.asyncRequest){var sLiveData=this.liveData;var isPost=this.connMethodPost;var sMethod=(isPost)?"POST":"GET";var sUri=(isPost||!lang.isValue(oRequest))?sLiveData:sLiveData+oRequest;var sRequest=(isPost)?oRequest:null;if(this.connXhrMode!="queueRequests"){oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,_xhrCallback,sRequest);}else{if(oQueue.conn){var allRequests=oQueue.requests;allRequests.push({request:oRequest,callback:_xhrCallback});if(!oQueue.interval){oQueue.interval=setInterval(function(){if(oConnMgr.isCallInProgress(oQueue.conn)){return;}else{if(allRequests.length>0){sUri=(isPost||!lang.isValue(allRequests[0].request))?sLiveData:sLiveData+allRequests[0].request;sRequest=(isPost)?allRequests[0].request:null;oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,allRequests[0].callback,sRequest);allRequests.shift();}else{clearInterval(oQueue.interval);oQueue.interval=null;}}},50);}}else{oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,_xhrCallback,sRequest);}}}else{DS.issueCallback(oCallback,[oRequest,{error:true}],true,oCaller);}return tId;}});lang.augmentObject(util.XHRDataSource,DS);util.DataSource=function(oLiveData,oConfigs){oConfigs=oConfigs||{};var dataType=oConfigs.dataType;if(dataType){if(dataType==DS.TYPE_LOCAL){lang.augmentObject(util.DataSource,util.LocalDataSource);return new util.LocalDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_XHR){lang.augmentObject(util.DataSource,util.XHRDataSource);return new util.XHRDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_SCRIPTNODE){lang.augmentObject(util.DataSource,util.ScriptNodeDataSource);return new util.ScriptNodeDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_JSFUNCTION){lang.augmentObject(util.DataSource,util.FunctionDataSource);return new util.FunctionDataSource(oLiveData,oConfigs);}}}}}if(YAHOO.lang.isString(oLiveData)){lang.augmentObject(util.DataSource,util.XHRDataSource);return new util.XHRDataSource(oLiveData,oConfigs);}else{if(YAHOO.lang.isFunction(oLiveData)){lang.augmentObject(util.DataSource,util.FunctionDataSource);return new util.FunctionDataSource(oLiveData,oConfigs);}else{lang.augmentObject(util.DataSource,util.LocalDataSource);return new util.LocalDataSource(oLiveData,oConfigs);}}};lang.augmentObject(util.DataSource,DS);})();YAHOO.util.Number={format:function(B,E){if(!isFinite(+B)){return"";}B=!isFinite(+B)?0:+B;E=YAHOO.lang.merge(YAHOO.util.Number.format.defaults,(E||{}));var C=B<0,F=Math.abs(B),A=E.decimalPlaces,I=E.thousandsSeparator,H,G,D;if(A<0){H=F-(F%1)+"";D=H.length+A;if(D>0){H=Number("."+H).toFixed(D).slice(2)+new Array(H.length-D+1).join("0");}else{H="0";}}else{H=F<1&&F>=0.5&&!A?"1":F.toFixed(A);}if(F>1000){G=H.split(/\D/);D=G[0].length%3||3;G[0]=G[0].slice(0,D)+G[0].slice(D).replace(/(\d{3})/g,I+"$1");H=G.join(E.decimalSeparator);}H=E.prefix+H+E.suffix;return C?E.negativeFormat.replace(/#/,H):H;}};YAHOO.util.Number.format.defaults={decimalSeparator:".",decimalPlaces:null,thousandsSeparator:"",prefix:"",suffix:"",negativeFormat:"-#"};(function(){var A=function(C,E,D){if(typeof D==="undefined"){D=10;}for(;parseInt(C,10)<D&&D>1;D/=10){C=E.toString()+C;}return C.toString();};var B={formats:{a:function(D,C){return C.a[D.getDay()];},A:function(D,C){return C.A[D.getDay()];},b:function(D,C){return C.b[D.getMonth()];},B:function(D,C){return C.B[D.getMonth()];},C:function(C){return A(parseInt(C.getFullYear()/100,10),0);},d:["getDate","0"],e:["getDate"," "],g:function(C){return A(parseInt(B.formats.G(C)%100,10),0);},G:function(E){var F=E.getFullYear();var D=parseInt(B.formats.V(E),10);var C=parseInt(B.formats.W(E),10);if(C>D){F++;}else{if(C===0&&D>=52){F--;}}return F;},H:["getHours","0"],I:function(D){var C=D.getHours()%12;return A(C===0?12:C,0);},j:function(G){var F=new Date(""+G.getFullYear()+"/1/1 GMT");var D=new Date(""+G.getFullYear()+"/"+(G.getMonth()+1)+"/"+G.getDate()+" GMT");var C=D-F;var E=parseInt(C/60000/60/24,10)+1;return A(E,0,100);},k:["getHours"," "],l:function(D){var C=D.getHours()%12;return A(C===0?12:C," ");},m:function(C){return A(C.getMonth()+1,0);},M:["getMinutes","0"],p:function(D,C){return C.p[D.getHours()>=12?1:0];},P:function(D,C){return C.P[D.getHours()>=12?1:0];},s:function(D,C){return parseInt(D.getTime()/1000,10);},S:["getSeconds","0"],u:function(C){var D=C.getDay();return D===0?7:D;},U:function(F){var C=parseInt(B.formats.j(F),10);var E=6-F.getDay();var D=parseInt((C+E)/7,10);return A(D,0);},V:function(F){var E=parseInt(B.formats.W(F),10);var C=(new Date(""+F.getFullYear()+"/1/1")).getDay();var D=E+(C>4||C<=1?0:1);if(D===53&&(new Date(""+F.getFullYear()+"/12/31")).getDay()<4){D=1;}else{if(D===0){D=B.formats.V(new Date(""+(F.getFullYear()-1)+"/12/31"));}}return A(D,0);},w:"getDay",W:function(F){var C=parseInt(B.formats.j(F),10);var E=7-B.formats.u(F);var D=parseInt((C+E)/7,10);return A(D,0,10);},y:function(C){return A(C.getFullYear()%100,0);},Y:"getFullYear",z:function(E){var D=E.getTimezoneOffset();var C=A(parseInt(Math.abs(D/60),10),0);var F=A(Math.abs(D%60),0);return(D>0?"-":"+")+C+F;},Z:function(C){var D=C.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/,"$2").replace(/[a-z ]/g,"");if(D.length>4){D=B.formats.z(C);}return D;},"%":function(C){return"%";}},aggregates:{c:"locale",D:"%m/%d/%y",F:"%Y-%m-%d",h:"%b",n:"\n",r:"locale",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"},format:function(G,F,D){F=F||{};if(!(G instanceof Date)){return YAHOO.lang.isValue(G)?G:"";}var H=F.format||"%m/%d/%Y";if(H==="YYYY/MM/DD"){H="%Y/%m/%d";}else{if(H==="DD/MM/YYYY"){H="%d/%m/%Y";}else{if(H==="MM/DD/YYYY"){H="%m/%d/%Y";}}}D=D||"en";if(!(D in YAHOO.util.DateLocale)){if(D.replace(/-[a-zA-Z]+$/,"") in YAHOO.util.DateLocale){D=D.replace(/-[a-zA-Z]+$/,"");
}else{D="en";}}var J=YAHOO.util.DateLocale[D];var C=function(L,K){var M=B.aggregates[K];return(M==="locale"?J[K]:M);};var E=function(L,K){var M=B.formats[K];if(typeof M==="string"){return G[M]();}else{if(typeof M==="function"){return M.call(G,G,J);}else{if(typeof M==="object"&&typeof M[0]==="string"){return A(G[M[0]](),M[1]);}else{return K;}}}};while(H.match(/%[cDFhnrRtTxX]/)){H=H.replace(/%([cDFhnrRtTxX])/g,C);}var I=H.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g,E);C=E=undefined;return I;}};YAHOO.namespace("YAHOO.util");YAHOO.util.Date=B;YAHOO.util.DateLocale={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],r:"%I:%M:%S %p",x:"%d/%m/%y",X:"%T"};YAHOO.util.DateLocale["en"]=YAHOO.lang.merge(YAHOO.util.DateLocale,{});YAHOO.util.DateLocale["en-US"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{c:"%a %d %b %Y %I:%M:%S %p %Z",x:"%m/%d/%Y",X:"%I:%M:%S %p"});YAHOO.util.DateLocale["en-GB"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{r:"%l:%M:%S %P %Z"});YAHOO.util.DateLocale["en-AU"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"]);})();YAHOO.register("datasource",YAHOO.util.DataSource,{version:"2.8.0r4",build:"2449"});

/*
autocomplete-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.widget.DS_JSArray=YAHOO.util.LocalDataSource;YAHOO.widget.DS_JSFunction=YAHOO.util.FunctionDataSource;YAHOO.widget.DS_XHR=function(B,A,D){var C=new YAHOO.util.XHRDataSource(B,D);C._aDeprecatedSchema=A;return C;};YAHOO.widget.DS_ScriptNode=function(B,A,D){var C=new YAHOO.util.ScriptNodeDataSource(B,D);C._aDeprecatedSchema=A;return C;};YAHOO.widget.DS_XHR.TYPE_JSON=YAHOO.util.DataSourceBase.TYPE_JSON;YAHOO.widget.DS_XHR.TYPE_XML=YAHOO.util.DataSourceBase.TYPE_XML;YAHOO.widget.DS_XHR.TYPE_FLAT=YAHOO.util.DataSourceBase.TYPE_TEXT;YAHOO.widget.AutoComplete=function(G,B,J,C){if(G&&B&&J){if(J&&YAHOO.lang.isFunction(J.sendRequest)){this.dataSource=J;}else{return;}this.key=0;var D=J.responseSchema;if(J._aDeprecatedSchema){var K=J._aDeprecatedSchema;if(YAHOO.lang.isArray(K)){if((J.responseType===YAHOO.util.DataSourceBase.TYPE_JSON)||(J.responseType===YAHOO.util.DataSourceBase.TYPE_UNKNOWN)){D.resultsList=K[0];this.key=K[1];D.fields=(K.length<3)?null:K.slice(1);}else{if(J.responseType===YAHOO.util.DataSourceBase.TYPE_XML){D.resultNode=K[0];this.key=K[1];D.fields=K.slice(1);}else{if(J.responseType===YAHOO.util.DataSourceBase.TYPE_TEXT){D.recordDelim=K[0];D.fieldDelim=K[1];}}}J.responseSchema=D;}}if(YAHOO.util.Dom.inDocument(G)){if(YAHOO.lang.isString(G)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;this._elTextbox=document.getElementById(G);}else{this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=G;}YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}else{return;}if(YAHOO.util.Dom.inDocument(B)){if(YAHOO.lang.isString(B)){this._elContainer=document.getElementById(B);}else{this._elContainer=B;}if(this._elContainer.style.display=="none"){}var E=this._elContainer.parentNode;var A=E.tagName.toLowerCase();if(A=="div"){YAHOO.util.Dom.addClass(E,"yui-ac");}else{}}else{return;}if(this.dataSource.dataType===YAHOO.util.DataSourceBase.TYPE_LOCAL){this.applyLocalFilter=true;}if(C&&(C.constructor==Object)){for(var I in C){if(I){this[I]=C[I];}}}this._initContainerEl();this._initProps();this._initListEl();this._initContainerHelperEls();var H=this;var F=this._elTextbox;YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(B,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(B,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(B,"click",H._onContainerClick,H);YAHOO.util.Event.addListener(B,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(B,"resize",H._onContainerResize,H);YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);YAHOO.util.Event.addListener(window,"unload",H._onWindowUnload,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerPopulateEvent=new YAHOO.util.CustomEvent("containerPopulate",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);this.textboxChangeEvent=new YAHOO.util.CustomEvent("textboxChange",this);F.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.applyLocalFilter=null;YAHOO.widget.AutoComplete.prototype.queryMatchCase=false;YAHOO.widget.AutoComplete.prototype.queryMatchContains=false;YAHOO.widget.AutoComplete.prototype.queryMatchSubset=false;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.typeAheadDelay=0.5;YAHOO.widget.AutoComplete.prototype.queryInterval=500;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.suppressInputUpdate=false;YAHOO.widget.AutoComplete.prototype.resultTypeList=true;YAHOO.widget.AutoComplete.prototype.queryQuestionMark=true;YAHOO.widget.AutoComplete.prototype.autoSnapContainer=true;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.getInputEl=function(){return this._elTextbox;};YAHOO.widget.AutoComplete.prototype.getContainerEl=function(){return this._elContainer;
};YAHOO.widget.AutoComplete.prototype.isFocused=function(){return this._bFocused;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListEl=function(){return this._elList;};YAHOO.widget.AutoComplete.prototype.getListItemMatch=function(A){if(A._sResultMatch){return A._sResultMatch;}else{return null;}};YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){if(A._oResultData){return A._oResultData;}else{return null;}};YAHOO.widget.AutoComplete.prototype.getListItemIndex=function(A){if(YAHOO.lang.isNumber(A._nItemIndex)){return A._nItemIndex;}else{return null;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(B){if(this._elHeader){var A=this._elHeader;if(B){A.innerHTML=B;A.style.display="";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(B){if(this._elFooter){var A=this._elFooter;if(B){A.innerHTML=B;A.style.display="";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(A){if(this._elBody){var B=this._elBody;YAHOO.util.Event.purgeElement(B,true);if(A){B.innerHTML=A;B.style.display="";}else{B.innerHTML="";B.style.display="none";}this._elList=null;}};YAHOO.widget.AutoComplete.prototype.generateRequest=function(B){var A=this.dataSource.dataType;if(A===YAHOO.util.DataSourceBase.TYPE_XHR){if(!this.dataSource.connMethodPost){B=(this.queryQuestionMark?"?":"")+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}else{B=(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}}else{if(A===YAHOO.util.DataSourceBase.TYPE_SCRIPTNODE){B="&"+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}}return B;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(B){this._bFocused=true;var A=(this.delimChar)?this._elTextbox.value+B:B;this._sendQuery(A);};YAHOO.widget.AutoComplete.prototype.snapContainer=function(){var A=this._elTextbox,B=YAHOO.util.Dom.getXY(A);B[1]+=YAHOO.util.Dom.get(A).offsetHeight+2;YAHOO.util.Dom.setXY(this._elContainer,B);};YAHOO.widget.AutoComplete.prototype.expandContainer=function(){this._toggleContainer(true);};YAHOO.widget.AutoComplete.prototype.collapseContainer=function(){this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype.clearList=function(){var B=this._elList.childNodes,A=B.length-1;for(;A>-1;A--){B[A].style.display="none";}};YAHOO.widget.AutoComplete.prototype.getSubsetMatches=function(E){var D,C,A;for(var B=E.length;B>=this.minQueryLength;B--){A=this.generateRequest(E.substr(0,B));this.dataRequestEvent.fire(this,D,A);C=this.dataSource.getCachedResponse(A);if(C){return this.filterResults.apply(this.dataSource,[E,C,C,{scope:this}]);}}return null;};YAHOO.widget.AutoComplete.prototype.preparseRawResponse=function(C,B,A){var D=((this.responseStripAfter!=="")&&(B.indexOf))?B.indexOf(this.responseStripAfter):-1;if(D!=-1){B=B.substring(0,D);}return B;};YAHOO.widget.AutoComplete.prototype.filterResults=function(K,M,Q,L){if(L&&L.argument&&L.argument.query){K=L.argument.query;}if(K&&K!==""){Q=YAHOO.widget.AutoComplete._cloneObject(Q);var I=L.scope,P=this,C=Q.results,N=[],B=I.maxResultsDisplayed,J=(P.queryMatchCase||I.queryMatchCase),A=(P.queryMatchContains||I.queryMatchContains);for(var D=0,H=C.length;D<H;D++){var F=C[D];var E=null;if(YAHOO.lang.isString(F)){E=F;}else{if(YAHOO.lang.isArray(F)){E=F[0];}else{if(this.responseSchema.fields){var O=this.responseSchema.fields[0].key||this.responseSchema.fields[0];E=F[O];}else{if(this.key){E=F[this.key];}}}}if(YAHOO.lang.isString(E)){var G=(J)?E.indexOf(decodeURIComponent(K)):E.toLowerCase().indexOf(decodeURIComponent(K).toLowerCase());if((!A&&(G===0))||(A&&(G>-1))){N.push(F);}}if(H>B&&N.length===B){break;}}Q.results=N;}else{}return Q;};YAHOO.widget.AutoComplete.prototype.handleResponse=function(C,A,B){if((this instanceof YAHOO.widget.AutoComplete)&&this._sName){this._populateList(C,A,B);}};YAHOO.widget.AutoComplete.prototype.doBeforeLoadData=function(C,A,B){return true;};YAHOO.widget.AutoComplete.prototype.formatResult=function(B,D,A){var C=(A)?A:"";return C;};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(D,A,C,B){return true;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var B=this.toString();var A=this._elTextbox;var D=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerPopulateEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();this.textboxChangeEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(A,true);YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerPopulateEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;
YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete.prototype.textboxChangeEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=false;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._elList=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sPastSelections="";YAHOO.widget.AutoComplete.prototype._sInitInputValue=null;YAHOO.widget.AutoComplete.prototype._elCurListItem=null;YAHOO.widget.AutoComplete.prototype._elCurPrehighlightItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._nTypeAheadDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var B=this.minQueryLength;if(!YAHOO.lang.isNumber(B)){this.minQueryLength=1;}var E=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(E)||(E<1)){this.maxResultsDisplayed=10;}var F=this.queryDelay;if(!YAHOO.lang.isNumber(F)||(F<0)){this.queryDelay=0.2;}var C=this.typeAheadDelay;if(!YAHOO.lang.isNumber(C)||(C<0)){this.typeAheadDelay=0.2;}var A=this.delimChar;if(YAHOO.lang.isString(A)&&(A.length>0)){this.delimChar=[A];}else{if(!YAHOO.lang.isArray(A)){this.delimChar=null;}}var D=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(D)||(D<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&A){}};YAHOO.widget.AutoComplete.prototype._initContainerHelperEls=function(){if(this.useShadow&&!this._elShadow){var A=document.createElement("div");A.className="yui-ac-shadow";A.style.width=0;A.style.height=0;this._elShadow=this._elContainer.appendChild(A);}if(this.useIFrame&&!this._elIFrame){var B=document.createElement("iframe");B.src=this._iFrameSrc;B.frameBorder=0;B.scrolling="no";B.style.position="absolute";B.style.width=0;B.style.height=0;B.style.padding=0;B.tabIndex=-1;B.role="presentation";B.title="Presentational iframe shim";this._elIFrame=this._elContainer.appendChild(B);}};YAHOO.widget.AutoComplete.prototype._initContainerEl=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var C=document.createElement("div");C.className="yui-ac-content";C.style.display="none";this._elContent=this._elContainer.appendChild(C);var B=document.createElement("div");B.className="yui-ac-hd";B.style.display="none";this._elHeader=this._elContent.appendChild(B);var D=document.createElement("div");D.className="yui-ac-bd";this._elBody=this._elContent.appendChild(D);var A=document.createElement("div");A.className="yui-ac-ft";A.style.display="none";this._elFooter=this._elContent.appendChild(A);}else{}};YAHOO.widget.AutoComplete.prototype._initListEl=function(){var C=this.maxResultsDisplayed,A=this._elList||document.createElement("ul"),B;while(A.childNodes.length<C){B=document.createElement("li");B.style.display="none";B._nItemIndex=A.childNodes.length;A.appendChild(B);}if(!this._elList){var D=this._elBody;YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";this._elList=D.appendChild(A);}this._elBody.style.display="";};YAHOO.widget.AutoComplete.prototype._focus=function(){var A=this;setTimeout(function(){try{A._elTextbox.focus();}catch(B){}},0);};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var A=this;if(!A._queryInterval&&A.queryInterval){A._queryInterval=setInterval(function(){A._onInterval();},A.queryInterval);}};YAHOO.widget.AutoComplete.prototype.enableIntervalDetection=YAHOO.widget.AutoComplete.prototype._enableIntervalDetection;YAHOO.widget.AutoComplete.prototype._onInterval=function(){var A=this._elTextbox.value;var B=this._sLastTextboxValue;if(A!=B){this._sLastTextboxValue=A;this._sendQuery(A);}};YAHOO.widget.AutoComplete.prototype._clearInterval=function(){if(this._queryInterval){clearInterval(this._queryInterval);this._queryInterval=null;}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)||(A==229)){return true;}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(D){if(this.minQueryLength<0){this._toggleContainer(false);return;}if(this.delimChar){var A=this._extractQuery(D);D=A.query;this._sPastSelections=A.previous;}if((D&&(D.length<this.minQueryLength))||(!D&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return;}D=encodeURIComponent(D);this._nDelayID=-1;if(this.dataSource.queryMatchSubset||this.queryMatchSubset){var C=this.getSubsetMatches(D);if(C){this.handleResponse(D,C,{query:D});return;
}}if(this.dataSource.responseStripAfter){this.dataSource.doBeforeParseData=this.preparseRawResponse;}if(this.applyLocalFilter){this.dataSource.doBeforeCallback=this.filterResults;}var B=this.generateRequest(D);this.dataRequestEvent.fire(this,D,B);this.dataSource.sendRequest(B,{success:this.handleResponse,failure:this.handleResponse,scope:this,argument:{query:D}});};YAHOO.widget.AutoComplete.prototype._populateListItem=function(B,A,C){B.innerHTML=this.formatResult(A,C,B._sResultMatch);};YAHOO.widget.AutoComplete.prototype._populateList=function(K,F,C){if(this._nTypeAheadDelayID!=-1){clearTimeout(this._nTypeAheadDelayID);}K=(C&&C.query)?C.query:K;var H=this.doBeforeLoadData(K,F,C);if(H&&!F.error){this.dataReturnEvent.fire(this,K,F.results);if(this._bFocused){var M=decodeURIComponent(K);this._sCurQuery=M;this._bItemSelected=false;var R=F.results,A=Math.min(R.length,this.maxResultsDisplayed),J=(this.dataSource.responseSchema.fields)?(this.dataSource.responseSchema.fields[0].key||this.dataSource.responseSchema.fields[0]):0;if(A>0){if(!this._elList||(this._elList.childNodes.length<A)){this._initListEl();}this._initContainerHelperEls();var I=this._elList.childNodes;for(var Q=A-1;Q>=0;Q--){var P=I[Q],E=R[Q];if(this.resultTypeList){var B=[];B[0]=(YAHOO.lang.isString(E))?E:E[J]||E[this.key];var L=this.dataSource.responseSchema.fields;if(YAHOO.lang.isArray(L)&&(L.length>1)){for(var N=1,S=L.length;N<S;N++){B[B.length]=E[L[N].key||L[N]];}}else{if(YAHOO.lang.isArray(E)){B=E;}else{if(YAHOO.lang.isString(E)){B=[E];}else{B[1]=E;}}}E=B;}P._sResultMatch=(YAHOO.lang.isString(E))?E:(YAHOO.lang.isArray(E))?E[0]:(E[J]||"");P._oResultData=E;this._populateListItem(P,E,M);P.style.display="";}if(A<I.length){var G;for(var O=I.length-1;O>=A;O--){G=I[O];G.style.display="none";}}this._nDisplayedItems=A;this.containerPopulateEvent.fire(this,K,R);if(this.autoHighlight){var D=this._elList.firstChild;this._toggleHighlight(D,"to");this.itemArrowToEvent.fire(this,D);this._typeAhead(D,K);}else{this._toggleHighlight(this._elCurListItem,"from");}H=this._doBeforeExpandContainer(this._elTextbox,this._elContainer,K,R);this._toggleContainer(H);}else{this._toggleContainer(false);}return;}}else{this.dataErrorEvent.fire(this,K,F);}};YAHOO.widget.AutoComplete.prototype._doBeforeExpandContainer=function(D,A,C,B){if(this.autoSnapContainer){this.snapContainer();}return this.doBeforeExpandContainer(D,A,C,B);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var A=(this.delimChar)?this._extractQuery(this._elTextbox.value):{previous:"",query:this._elTextbox.value};this._elTextbox.value=A.previous;this.selectionEnforceEvent.fire(this,A.query);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var A=null;for(var B=0;B<this._nDisplayedItems;B++){var C=this._elList.childNodes[B];var D=(""+C._sResultMatch).toLowerCase();if(D==this._sCurQuery.toLowerCase()){A=C;break;}}return(A);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(B,D){if(!this.typeAhead||(this._nKeyCode==8)){return;}var A=this,C=this._elTextbox;if(C.setSelectionRange||C.createTextRange){this._nTypeAheadDelayID=setTimeout(function(){var F=C.value.length;A._updateValue(B);var G=C.value.length;A._selectText(C,F,G);var E=C.value.substr(F,G);A.typeAheadEvent.fire(A,D,E);},(this.typeAheadDelay*1000));}};YAHOO.widget.AutoComplete.prototype._selectText=function(D,A,B){if(D.setSelectionRange){D.setSelectionRange(A,B);}else{if(D.createTextRange){var C=D.createTextRange();C.moveStart("character",A);C.moveEnd("character",B-D.value.length);C.select();}else{D.select();}}};YAHOO.widget.AutoComplete.prototype._extractQuery=function(H){var C=this.delimChar,F=-1,G,E,B=C.length-1,D;for(;B>=0;B--){G=H.lastIndexOf(C[B]);if(G>F){F=G;}}if(C[B]==" "){for(var A=C.length-1;A>=0;A--){if(H[F-1]==C[A]){F--;break;}}}if(F>-1){E=F+1;while(H.charAt(E)==" "){E+=1;}D=H.substring(0,E);H=H.substr(E);}else{D="";}return{previous:D,query:H};};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(D){var E=this._elContent.offsetWidth+"px";var B=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){var C=this._elIFrame;if(D){C.style.width=E;C.style.height=B;C.style.padding="";}else{C.style.width=0;C.style.height=0;C.style.padding=0;}}if(this.useShadow&&this._elShadow){var A=this._elShadow;if(D){A.style.width=E;A.style.height=B;}else{A.style.width=0;A.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(I){var D=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return;}if(!I){this._toggleHighlight(this._elCurListItem,"from");this._nDisplayedItems=0;this._sCurQuery=null;if(this._elContent.style.display=="none"){return;}}var A=this._oAnim;if(A&&A.getEl()&&(this.animHoriz||this.animVert)){if(A.isAnimated()){A.stop(true);}var G=this._elContent.cloneNode(true);D.appendChild(G);G.style.top="-9000px";G.style.width="";G.style.height="";G.style.display="";var F=G.offsetWidth;var C=G.offsetHeight;var B=(this.animHoriz)?0:F;var E=(this.animVert)?0:C;A.attributes=(I)?{width:{to:F},height:{to:C}}:{width:{to:B},height:{to:E}};if(I&&!this._bContainerOpen){this._elContent.style.width=B+"px";this._elContent.style.height=E+"px";}else{this._elContent.style.width=F+"px";this._elContent.style.height=C+"px";}D.removeChild(G);G=null;var H=this;var J=function(){A.onComplete.unsubscribeAll();if(I){H._toggleContainerHelpers(true);H._bContainerOpen=I;H.containerExpandEvent.fire(H);}else{H._elContent.style.display="none";H._bContainerOpen=I;H.containerCollapseEvent.fire(H);}};this._toggleContainerHelpers(false);this._elContent.style.display="";A.onComplete.subscribe(J);A.animate();}else{if(I){this._elContent.style.display="";this._toggleContainerHelpers(true);this._bContainerOpen=I;this.containerExpandEvent.fire(this);}else{this._toggleContainerHelpers(false);this._elContent.style.display="none";this._bContainerOpen=I;this.containerCollapseEvent.fire(this);}}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){if(A){var B=this.highlightClassName;
if(this._elCurListItem){YAHOO.util.Dom.removeClass(this._elCurListItem,B);this._elCurListItem=null;}if((C=="to")&&B){YAHOO.util.Dom.addClass(A,B);this._elCurListItem=A;}}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(B,C){var A=this.prehighlightClassName;if(this._elCurPrehighlightItem){YAHOO.util.Dom.removeClass(this._elCurPrehighlightItem,A);}if(B==this._elCurListItem){return;}if((C=="mouseover")&&A){YAHOO.util.Dom.addClass(B,A);this._elCurPrehighlightItem=B;}else{YAHOO.util.Dom.removeClass(B,A);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(C){if(!this.suppressInputUpdate){var F=this._elTextbox;var E=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var B=C._sResultMatch;var D="";if(E){D=this._sPastSelections;D+=B+E;if(E!=" "){D+=" ";}}else{D=B;}F.value=D;if(F.type=="textarea"){F.scrollTop=F.scrollHeight;}var A=F.value.length;this._selectText(F,A,A);this._elCurListItem=C;}};YAHOO.widget.AutoComplete.prototype._selectItem=function(A){this._bItemSelected=true;this._updateValue(A);this._sPastSelections=this._elTextbox.value;this._clearInterval();this.itemSelectEvent.fire(this,A,A._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._elCurListItem){this._selectItem(this._elCurListItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){if(this._bContainerOpen){var H=this._elCurListItem,D=-1;if(H){D=H._nItemIndex;}var E=(G==40)?(D+1):(D-1);if(E<-2||E>=this._nDisplayedItems){return;}if(H){this._toggleHighlight(H,"from");this.itemArrowFromEvent.fire(this,H);}if(E==-1){if(this.delimChar){this._elTextbox.value=this._sPastSelections+this._sCurQuery;}else{this._elTextbox.value=this._sCurQuery;}return;}if(E==-2){this._toggleContainer(false);return;}var F=this._elList.childNodes[E],B=this._elContent,C=YAHOO.util.Dom.getStyle(B,"overflow"),I=YAHOO.util.Dom.getStyle(B,"overflowY"),A=((C=="auto")||(C=="scroll")||(I=="auto")||(I=="scroll"));if(A&&(E>-1)&&(E<this._nDisplayedItems)){if(G==40){if((F.offsetTop+F.offsetHeight)>(B.scrollTop+B.offsetHeight)){B.scrollTop=(F.offsetTop+F.offsetHeight)-B.offsetHeight;}else{if((F.offsetTop+F.offsetHeight)<B.scrollTop){B.scrollTop=F.offsetTop;}}}else{if(F.offsetTop<B.scrollTop){this._elContent.scrollTop=F.offsetTop;}else{if(F.offsetTop>(B.scrollTop+B.offsetHeight)){this._elContent.scrollTop=(F.offsetTop+F.offsetHeight)-B.offsetHeight;}}}}this._toggleHighlight(F,"to");this.itemArrowToEvent.fire(this,F);if(this.typeAhead){this._updateValue(F);}}};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":if(C.prehighlightClassName){C._togglePrehighlight(D,"mouseover");}else{C._toggleHighlight(D,"to");}C.itemMouseOverEvent.fire(C,D);break;case"div":if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){C._bOverContainer=true;return;}break;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":if(C.prehighlightClassName){C._togglePrehighlight(D,"mouseout");}else{C._toggleHighlight(D,"from");}C.itemMouseOutEvent.fire(C,D);break;case"ul":C._toggleHighlight(C._elCurListItem,"to");break;case"div":if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){C._bOverContainer=false;return;}break;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerClick=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":C._toggleHighlight(D,"to");C._selectItem(D);return;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){B._focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){B._toggleContainerHelpers(B._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){var C=A.keyCode;if(B._nTypeAheadDelayID!=-1){clearTimeout(B._nTypeAheadDelayID);}switch(C){case 9:if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){if(B._elCurListItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 13:if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){if(B._elCurListItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 27:B._toggleContainer(false);return;case 39:B._jumpSelection();break;case 38:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);B._moveSelection(C);}break;case 40:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);B._moveSelection(C);}break;default:B._bItemSelected=false;B._toggleHighlight(B._elCurListItem,"from");B.textboxKeyEvent.fire(B,C);break;}if(C===18){B._enableIntervalDetection();}B._nKeyCode=C;};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,B){var C=A.keyCode;if(YAHOO.env.ua.opera||(navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&(YAHOO.env.ua.webkit<420)){switch(C){case 9:if(B._bContainerOpen){if(B.delimChar){YAHOO.util.Event.stopEvent(A);}if(B._elCurListItem){B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 13:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);if(B._elCurListItem){B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;default:break;}}else{if(C==229){B._enableIntervalDetection();}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(A,C){var B=this.value;C._initProps();var D=A.keyCode;if(C._isIgnoreKey(D)){return;
}if(C._nDelayID!=-1){clearTimeout(C._nDelayID);}C._nDelayID=setTimeout(function(){C._sendQuery(B);},(C.queryDelay*1000));};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){if(!B._bFocused){B._elTextbox.setAttribute("autocomplete","off");B._bFocused=true;B._sInitInputValue=B._elTextbox.value;B.textboxFocusEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,C){if(!C._bOverContainer||(C._nKeyCode==9)){if(!C._bItemSelected){var B=C._textMatchesOption();if(!C._bContainerOpen||(C._bContainerOpen&&(B===null))){if(C.forceSelection){C._clearSelection();}else{C.unmatchedItemSelectEvent.fire(C,C._sCurQuery);}}else{if(C.forceSelection){C._selectItem(B);}}}C._clearInterval();C._bFocused=false;if(C._sInitInputValue!==C._elTextbox.value){C.textboxChangeEvent.fire(C);}C.textboxBlurEvent.fire(C);C._toggleContainer(false);}else{C._focus();}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(A,B){if(B&&B._elTextbox&&B.allowBrowserAutocomplete){B._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){return this.generateRequest(A);};YAHOO.widget.AutoComplete.prototype.getListItems=function(){var C=[],B=this._elList.childNodes;for(var A=B.length-1;A>=0;A--){C[A]=B[A];}return C;};YAHOO.widget.AutoComplete._cloneObject=function(D){if(!YAHOO.lang.isValue(D)){return D;}var F={};if(YAHOO.lang.isFunction(D)){F=D;}else{if(YAHOO.lang.isArray(D)){var E=[];for(var C=0,B=D.length;C<B;C++){E[C]=YAHOO.widget.AutoComplete._cloneObject(D[C]);}F=E;}else{if(YAHOO.lang.isObject(D)){for(var A in D){if(YAHOO.lang.hasOwnProperty(D,A)){if(YAHOO.lang.isValue(D[A])&&YAHOO.lang.isObject(D[A])||YAHOO.lang.isArray(D[A])){F[A]=YAHOO.widget.AutoComplete._cloneObject(D[A]);}else{F[A]=D[A];}}}}else{F=D;}}}return F;};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.8.0r4",build:"2449"});

/*
element-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,setter:null,getter:null,validator:null,getValue:function(){var A=this.value;if(this.getter){A=this.getter.call(this.owner,this.name,A);}return A;},setValue:function(F,B){var E,A=this.owner,C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false;}}if(this.setter){F=this.setter.call(A,F,this.name);if(F===undefined){}}if(this.method){this.method.call(A,F,this.name);}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};if(C){this._written=false;}this._initialConfig=this._initialConfig||{};for(var A in B){if(B.hasOwnProperty(A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig,true);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};var B=this._configs[C];if(!B||!this._configs.hasOwnProperty(C)){return null;}return B.getValue();},set:function(D,E,B){this._configs=this._configs||{};var C=this._configs[D];if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;var C=[],B;for(B in this._configs){if(A.hasOwnProperty(this._configs,B)&&!A.isUndefined(this._configs[B])){C[C.length]=B;}}return C;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs||{};var F=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(F.hasOwnProperty(E[D])){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};var B=this._configs[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};if(!this._configs[B]){C.name=B;this._configs[B]=this.createAttribute(C);}else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var B=YAHOO.util.Dom,D=YAHOO.util.AttributeProvider,C={mouseenter:true,mouseleave:true};var A=function(E,F){this.init.apply(this,arguments);};A.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"mouseenter":true,"mouseleave":true,"focus":true,"blur":true,"submit":true,"change":true};A.prototype={DOM_EVENTS:null,DEFAULT_HTML_SETTER:function(G,E){var F=this.get("element");if(F){F[E]=G;}return G;},DEFAULT_HTML_GETTER:function(E){var F=this.get("element"),G;if(F){G=F[E];}return G;},appendChild:function(E){E=E.get?E.get("element"):E;return this.get("element").appendChild(E);},getElementsByTagName:function(E){return this.get("element").getElementsByTagName(E);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(E,F){E=E.get?E.get("element"):E;F=(F&&F.get)?F.get("element"):F;return this.get("element").insertBefore(E,F);},removeChild:function(E){E=E.get?E.get("element"):E;return this.get("element").removeChild(E);},replaceChild:function(E,F){E=E.get?E.get("element"):E;F=F.get?F.get("element"):F;return this.get("element").replaceChild(E,F);},initAttributes:function(E){},addListener:function(J,I,K,H){H=H||this;var E=YAHOO.util.Event,G=this.get("element")||this.get("id"),F=this;if(C[J]&&!E._createMouseDelegate){return false;}if(!this._events[J]){if(G&&this.DOM_EVENTS[J]){E.on(G,J,function(M,L){if(M.srcElement&&!M.target){M.target=M.srcElement;}if((M.toElement&&!M.relatedTarget)||(M.fromElement&&!M.relatedTarget)){M.relatedTarget=E.getRelatedTarget(M);}if(!M.currentTarget){M.currentTarget=G;}F.fireEvent(J,M,L);},K,H);}this.createEvent(J,{scope:this});}return YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){return this.addListener.apply(this,arguments);},subscribe:function(){return this.addListener.apply(this,arguments);},removeListener:function(F,E){return this.unsubscribe.apply(this,arguments);},addClass:function(E){B.addClass(this.get("element"),E);},getElementsByClassName:function(F,E){return B.getElementsByClassName(F,E,this.get("element"));},hasClass:function(E){return B.hasClass(this.get("element"),E);},removeClass:function(E){return B.removeClass(this.get("element"),E);},replaceClass:function(F,E){return B.replaceClass(this.get("element"),F,E);},setStyle:function(F,E){return B.setStyle(this.get("element"),F,E);
},getStyle:function(E){return B.getStyle(this.get("element"),E);},fireQueue:function(){var F=this._queue;for(var G=0,E=F.length;G<E;++G){this[F[G][0]].apply(this,F[G][1]);}},appendTo:function(F,G){F=(F.get)?F.get("element"):B.get(F);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:F});G=(G&&G.get)?G.get("element"):B.get(G);var E=this.get("element");if(!E){return false;}if(!F){return false;}if(E.parent!=F){if(G){F.insertBefore(E,G);}else{F.appendChild(E);}}this.fireEvent("appendTo",{type:"appendTo",target:F});return E;},get:function(E){var G=this._configs||{},F=G.element;if(F&&!G[E]&&!YAHOO.lang.isUndefined(F.value[E])){this._setHTMLAttrConfig(E);}return D.prototype.get.call(this,E);},setAttributes:function(K,H){var F={},I=this._configOrder;for(var J=0,E=I.length;J<E;++J){if(K[I[J]]!==undefined){F[I[J]]=true;this.set(I[J],K[I[J]],H);}}for(var G in K){if(K.hasOwnProperty(G)&&!F[G]){this.set(G,K[G],H);}}},set:function(F,H,E){var G=this.get("element");if(!G){this._queue[this._queue.length]=["set",arguments];if(this._configs[F]){this._configs[F].value=H;}return;}if(!this._configs[F]&&!YAHOO.lang.isUndefined(G[F])){this._setHTMLAttrConfig(F);}return D.prototype.set.apply(this,arguments);},setAttributeConfig:function(E,F,G){this._configOrder.push(E);D.prototype.setAttributeConfig.apply(this,arguments);},createEvent:function(F,E){this._events[F]=true;return D.prototype.createEvent.apply(this,arguments);},init:function(F,E){this._initElement(F,E);},destroy:function(){var E=this.get("element");YAHOO.util.Event.purgeElement(E,true);this.unsubscribeAll();if(E&&E.parentNode){E.parentNode.removeChild(E);}this._queue=[];this._events={};this._configs={};this._configOrder=[];},_initElement:function(G,F){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];F=F||{};F.element=F.element||G||null;var I=false;var E=A.DOM_EVENTS;this.DOM_EVENTS=this.DOM_EVENTS||{};for(var H in E){if(E.hasOwnProperty(H)){this.DOM_EVENTS[H]=E[H];}}if(typeof F.element==="string"){this._setHTMLAttrConfig("id",{value:F.element});}if(B.get(F.element)){I=true;this._initHTMLElement(F);this._initContent(F);}YAHOO.util.Event.onAvailable(F.element,function(){if(!I){this._initHTMLElement(F);}this.fireEvent("available",{type:"available",target:B.get(F.element)});},this,true);YAHOO.util.Event.onContentReady(F.element,function(){if(!I){this._initContent(F);}this.fireEvent("contentReady",{type:"contentReady",target:B.get(F.element)});},this,true);},_initHTMLElement:function(E){this.setAttributeConfig("element",{value:B.get(E.element),readOnly:true});},_initContent:function(E){this.initAttributes(E);this.setAttributes(E,true);this.fireQueue();},_setHTMLAttrConfig:function(E,G){var F=this.get("element");G=G||{};G.name=E;G.setter=G.setter||this.DEFAULT_HTML_SETTER;G.getter=G.getter||this.DEFAULT_HTML_GETTER;G.value=G.value||F[E];this._configs[E]=new YAHOO.util.Attribute(G,this);}};YAHOO.augment(A,D);YAHOO.util.Element=A;})();YAHOO.register("element",YAHOO.util.Element,{version:"2.8.0r4",build:"2449"});

/*
swf-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.namespace("widget");(function(){var M=0;var L=YAHOO.env.ua;var P="ShockwaveFlash";if(L.gecko||L.webkit||L.opera){if((mF=navigator.mimeTypes["application/x-shockwave-flash"])){if((eP=mF.enabledPlugin)){var F=[];F=eP.description.replace(/\s[rd]/g,".").replace(/[A-Za-z\s]+/g,"").split(".");M=F[0]+".";switch((F[2].toString()).length){case 1:M+="00";break;case 2:M+="0";break;}M+=F[2];M=parseFloat(M);}}}else{if(L.ie){try{var Q=new ActiveXObject(P+"."+P+".6");Q.AllowScriptAccess="always";}catch(K){if(Q!=null){M=6;}}if(M==0){try{var B=new ActiveXObject(P+"."+P);var F=[];F=B.GetVariable("$version").replace(/[A-Za-z\s]+/g,"").split(",");M=F[0]+".";switch((F[2].toString()).length){case 1:M+="00";break;case 2:M+="0";break;}M+=F[2];M=parseFloat(M);}catch(K){}}}}L.flash=M;YAHOO.util.SWFDetect={getFlashVersion:function(){return M;},isFlashVersionAtLeast:function(R){return M>=R;}};var H=YAHOO.util.Dom,O=YAHOO.util.Event,I=YAHOO.util.SWFDetect,J=YAHOO.lang,G="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",E="application/x-shockwave-flash",D="10.22",A="http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?"+Math.random(),C="YAHOO.widget.SWF.eventHandler",N={align:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""};YAHOO.widget.SWF=function(R,i,c){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._id=H.generateId(null,"yuiswf");if(c.host){this._host=c.host;}var e=this._id;var U=H.get(R);var S=(c["version"]||D);var b=I.isFlashVersionAtLeast(S);var a=(L.flash>=8);var V=a&&!b&&c["useExpressInstall"];var Z=(V)?A:i;var Y="<object ";var f,X;var g="YUISwfId="+e+"&YUIBridgeCallback="+C;YAHOO.widget.SWF._instances[e]=this;if(U&&(b||V)&&Z){Y+='id="'+e+'" ';if(L.ie){Y+='classid="'+G+'" ';}else{Y+='type="'+E+'" data="'+Z+'" ';}f="100%";X="100%";Y+='width="'+f+'" height="'+X+'">';if(L.ie){Y+='<param name="movie" value="'+Z+'"/>';}for(var T in c.fixedAttributes){if(N.hasOwnProperty(T)){Y+='<param name="'+T+'" value="'+c.fixedAttributes[T]+'"/>';}}for(var d in c.flashVars){var W=c.flashVars[d];if(J.isString(W)){g+="&"+d+"="+encodeURIComponent(W);}}if(g){Y+='<param name="flashVars" value="'+g+'"/>';}Y+="</object>";U.innerHTML=Y;}YAHOO.widget.SWF.superclass.constructor.call(this,H.get(e));this._swf=H.get(e);};YAHOO.widget.SWF._instances=YAHOO.widget.SWF._instances||{};YAHOO.widget.SWF.eventHandler=function(R,S){YAHOO.widget.SWF._instances[R]._eventHandler(S);};YAHOO.extend(YAHOO.widget.SWF,YAHOO.util.Element,{_eventHandler:function(R){if(R.type=="swfReady"){this.createEvent("swfReady",{fireOnce:true});this.fireEvent("swfReady",R);}else{if(R.type=="log"){}else{if(this._host&&this._host.fireEvent){this._host.fireEvent(R.type,R);}else{this.fireEvent(R.type,R);}}}},callSWF:function(S,R){if(!R){R=[];}if(this._swf[S]){return(this._swf[S].apply(this._swf,R));}else{return null;}},toString:function(){return"SWF "+this._id;}});})();YAHOO.register("swf",YAHOO.widget.SWF,{version:"2.8.0r4",build:"2449"});

/*
YAHOO.lang.JSON
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var l=YAHOO.lang,isFunction=l.isFunction,isObject=l.isObject,isArray=l.isArray,_toStr=Object.prototype.toString,Native=(YAHOO.env.ua.caja?window:this).JSON,_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/^[\],:{}\s]*$/,_SPECIAL_CHARS=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},UNDEFINED="undefined",OBJECT="object",NULL="null",STRING="string",NUMBER="number",BOOLEAN="boolean",DATE="date",_allowable={"undefined":UNDEFINED,"string":STRING,"[object String]":STRING,"number":NUMBER,"[object Number]":NUMBER,"boolean":BOOLEAN,"[object Boolean]":BOOLEAN,"[object Date]":DATE,"[object RegExp]":OBJECT},EMPTY="",OPEN_O="{",CLOSE_O="}",OPEN_A="[",CLOSE_A="]",COMMA=",",COMMA_CR=",\n",CR="\n",COLON=":",COLON_SP=": ",QUOTE='"';Native=_toStr.call(Native)==="[object JSON]"&&Native;function _char(c){if(!_CHARS[c]){_CHARS[c]="\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);}return _CHARS[c];}function _revive(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(l.hasOwnProperty(value,k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;}function _prepare(s){return s.replace(_UNICODE_EXCEPTIONS,_char);}function _isSafe(str){return l.isString(str)&&_UNSAFE.test(str.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""));}function _parse(s,reviver){s=_prepare(s);if(_isSafe(s)){return _revive(eval("("+s+")"),reviver);}throw new SyntaxError("JSON.parse");}function _type(o){var t=typeof o;return _allowable[t]||_allowable[_toStr.call(o)]||(t===OBJECT?(o?OBJECT:NULL):UNDEFINED);}function _string(s){return QUOTE+s.replace(_SPECIAL_CHARS,_char)+QUOTE;}function _indent(s,space){return s.replace(/^/gm,space);}function _stringify(o,w,space){if(o===undefined){return undefined;}var replacer=isFunction(w)?w:null,format=_toStr.call(space).match(/String|Number/)||[],_date=YAHOO.lang.JSON.dateToString,stack=[],tmp,i,len;if(replacer||!isArray(w)){w=undefined;}if(w){tmp={};for(i=0,len=w.length;i<len;++i){tmp[w[i]]=true;}w=tmp;}space=format[0]==="Number"?new Array(Math.min(Math.max(0,space),10)+1).join(" "):(space||EMPTY).slice(0,10);function _serialize(h,key){var value=h[key],t=_type(value),a=[],colon=space?COLON_SP:COLON,arr,i,keys,k,v;if(isObject(value)&&isFunction(value.toJSON)){value=value.toJSON(key);}else{if(t===DATE){value=_date(value);}}if(isFunction(replacer)){value=replacer.call(h,key,value);}if(value!==h[key]){t=_type(value);}switch(t){case DATE:case OBJECT:break;case STRING:return _string(value);case NUMBER:return isFinite(value)?value+EMPTY:NULL;case BOOLEAN:return value+EMPTY;case NULL:return NULL;default:return undefined;}for(i=stack.length-1;i>=0;--i){if(stack[i]===value){throw new Error("JSON.stringify. Cyclical reference");}}arr=isArray(value);stack.push(value);if(arr){for(i=value.length-1;i>=0;--i){a[i]=_serialize(value,i)||NULL;}}else{keys=w||value;i=0;for(k in keys){if(keys.hasOwnProperty(k)){v=_serialize(value,k);if(v){a[i++]=_string(k)+colon+v;}}}}stack.pop();if(space&&a.length){return arr?OPEN_A+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_A:OPEN_O+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_O;}else{return arr?OPEN_A+a.join(COMMA)+CLOSE_A:OPEN_O+a.join(COMMA)+CLOSE_O;}}return _serialize({"":o},"");}YAHOO.lang.JSON={useNativeParse:!!Native,useNativeStringify:!!Native,isSafe:function(s){return _isSafe(_prepare(s));},parse:function(s,reviver){return Native&&YAHOO.lang.JSON.useNativeParse?Native.parse(s,reviver):_parse(s,reviver);},stringify:function(o,w,space){return Native&&YAHOO.lang.JSON.useNativeStringify?Native.stringify(o,w,space):_stringify(o,w,space);},dateToString:function(d){function _zeroPad(v){return v<10?"0"+v:v;}return d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+COLON+_zeroPad(d.getUTCMinutes())+COLON+_zeroPad(d.getUTCSeconds())+"Z";},stringToDate:function(str){var m=str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/);if(m){var d=new Date();d.setUTCFullYear(m[1],m[2]-1,m[3]);d.setUTCHours(m[4],m[5],m[6],(m[7]||0));return d;}return str;}};YAHOO.lang.JSON.isValid=YAHOO.lang.JSON.isSafe;})();YAHOO.register("json",YAHOO.lang.JSON,{version:"2.8.0r4",build:"2449"});

YAHOO.util.History=(function(){var C=null;var K=null;var F=false;var D=[];var B=[];function I(){var M,L;L=top.location.href;M=L.indexOf("#");return M>=0?L.substr(M+1):null;}function A(){var M,N,O=[],L=[];for(M in D){if(YAHOO.lang.hasOwnProperty(D,M)){N=D[M];O.push(M+"="+N.initialState);L.push(M+"="+N.currentState);}}K.value=O.join("&")+"|"+L.join("&");if(YAHOO.env.ua.webkit){K.value+="|"+B.join(",");}}function H(L){var Q,R,M,O,P,T,S,N;if(!L){for(M in D){if(YAHOO.lang.hasOwnProperty(D,M)){O=D[M];O.currentState=O.initialState;O.onStateChange(unescape(O.currentState));}}return;}P=[];T=L.split("&");for(Q=0,R=T.length;Q<R;Q++){S=T[Q].split("=");if(S.length===2){M=S[0];N=S[1];P[M]=N;}}for(M in D){if(YAHOO.lang.hasOwnProperty(D,M)){O=D[M];N=P[M];if(!N||O.currentState!==N){O.currentState=N||O.initialState;O.onStateChange(unescape(O.currentState));}}}}function J(O){var L,N;L='<html><body><div id="state">'+O+"</div></body></html>";try{N=C.contentWindow.document;N.open();N.write(L);N.close();return true;}catch(M){return false;}}function G(){var O,L,N,M;if(!C.contentWindow||!C.contentWindow.document){setTimeout(G,10);return;}O=C.contentWindow.document;L=O.getElementById("state");N=L?L.innerText:null;M=I();setInterval(function(){var U,Q,R,S,T,P;O=C.contentWindow.document;L=O.getElementById("state");U=L?L.innerText:null;T=I();if(U!==N){N=U;H(N);if(!N){Q=[];for(R in D){if(YAHOO.lang.hasOwnProperty(D,R)){S=D[R];Q.push(R+"="+S.initialState);}}T=Q.join("&");}else{T=N;}top.location.hash=T;M=T;A();}else{if(T!==M){M=T;J(T);}}},50);F=true;YAHOO.util.History.onLoadEvent.fire();}function E(){var S,U,Q,W,M,O,V,P,T,N,L,R;Q=K.value.split("|");if(Q.length>1){V=Q[0].split("&");for(S=0,U=V.length;S<U;S++){W=V[S].split("=");if(W.length===2){M=W[0];P=W[1];O=D[M];if(O){O.initialState=P;}}}T=Q[1].split("&");for(S=0,U=T.length;S<U;S++){W=T[S].split("=");if(W.length>=2){M=W[0];N=W[1];O=D[M];if(O){O.currentState=N;}}}}if(Q.length>2){B=Q[2].split(",");}if(YAHOO.env.ua.ie){if(typeof document.documentMode==="undefined"||document.documentMode<8){G();}else{YAHOO.util.Event.on(top,"hashchange",function(){var X=I();H(X);A();});F=true;YAHOO.util.History.onLoadEvent.fire();}}else{L=history.length;R=I();setInterval(function(){var Z,X,Y;X=I();Y=history.length;if(X!==R){R=X;L=Y;H(R);A();}else{if(Y!==L&&YAHOO.env.ua.webkit){R=X;L=Y;Z=B[L-1];H(Z);A();}}},50);F=true;YAHOO.util.History.onLoadEvent.fire();}}return{onLoadEvent:new YAHOO.util.CustomEvent("onLoad"),onReady:function(L,M,N){if(F){setTimeout(function(){var O=window;if(N){if(N===true){O=M;}else{O=N;}}L.call(O,"onLoad",[],M);},0);}else{YAHOO.util.History.onLoadEvent.subscribe(L,M,N);}},register:function(N,L,P,Q,R){var O,M;if(typeof N!=="string"||YAHOO.lang.trim(N)===""||typeof L!=="string"||typeof P!=="function"){throw new Error("Missing or invalid argument");}if(D[N]){return;}if(F){throw new Error("All modules must be registered before calling YAHOO.util.History.initialize");}N=escape(N);L=escape(L);O=null;if(R===true){O=Q;}else{O=R;}M=function(S){return P.call(O,S,Q);};D[N]={name:N,initialState:L,currentState:L,onStateChange:M};},initialize:function(L,M){if(F){return;}if(YAHOO.env.ua.opera&&typeof history.navigationMode!=="undefined"){history.navigationMode="compatible";}if(typeof L==="string"){L=document.getElementById(L);}if(!L||L.tagName.toUpperCase()!=="TEXTAREA"&&(L.tagName.toUpperCase()!=="INPUT"||L.type!=="hidden"&&L.type!=="text")){throw new Error("Missing or invalid argument");}K=L;if(YAHOO.env.ua.ie&&(typeof document.documentMode==="undefined"||document.documentMode<8)){if(typeof M==="string"){M=document.getElementById(M);}if(!M||M.tagName.toUpperCase()!=="IFRAME"){throw new Error("Missing or invalid argument");}C=M;}YAHOO.util.Event.onDOMReady(E);},navigate:function(M,N){var L;if(typeof M!=="string"||typeof N!=="string"){throw new Error("Missing or invalid argument");}L={};L[M]=N;return YAHOO.util.History.multiNavigate(L);},multiNavigate:function(M){var L,N,P,O,Q;if(typeof M!=="object"){throw new Error("Missing or invalid argument");}if(!F){throw new Error("The Browser History Manager is not initialized");}for(N in M){if(!D[N]){throw new Error("The following module has not been registered: "+N);}}L=[];for(N in D){if(YAHOO.lang.hasOwnProperty(D,N)){P=D[N];if(YAHOO.lang.hasOwnProperty(M,N)){O=M[unescape(N)];}else{O=unescape(P.currentState);}N=escape(N);O=escape(O);L.push(N+"="+O);}}Q=L.join("&");if(YAHOO.env.ua.ie&&(typeof document.documentMode==="undefined"||document.documentMode<8)){return J(Q);}else{top.location.hash=Q;if(YAHOO.env.ua.webkit){B[history.length]=Q;A();}return true;}},getCurrentState:function(L){var M;if(typeof L!=="string"){throw new Error("Missing or invalid argument");}if(!F){throw new Error("The Browser History Manager is not initialized");}M=D[L];if(!M){throw new Error("No such registered module: "+L);}return unescape(M.currentState);},getBookmarkedState:function(Q){var P,M,L,S,N,R,O;if(typeof Q!=="string"){throw new Error("Missing or invalid argument");}L=top.location.href.indexOf("#");if(L>=0){S=top.location.href.substr(L+1);N=S.split("&");for(P=0,M=N.length;P<M;P++){R=N[P].split("=");if(R.length===2){O=R[0];if(O===Q){return unescape(R[1]);}}}}return null;},getQueryStringParameter:function(Q,N){var O,M,L,S,R,P;N=N||top.location.href;L=N.indexOf("?");S=L>=0?N.substr(L+1):N;L=S.lastIndexOf("#");S=L>=0?S.substr(0,L):S;R=S.split("&");for(O=0,M=R.length;O<M;O++){P=R[O].split("=");if(P.length>=2){if(P[0]===Q){return unescape(P[1]);}}}return null;}};})();YAHOO.register("history",YAHOO.util.History,{version:"2.8.0r4",build:"2449"});

/*	SWFObject v2.0 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var Z="undefined",P="object",B="Shockwave Flash",h="ShockwaveFlash.ShockwaveFlash",W="application/x-shockwave-flash",K="SWFObjectExprInst",G=window,g=document,N=navigator,f=[],H=[],Q=null,L=null,T=null,S=false,C=false;var a=function(){var l=typeof g.getElementById!=Z&&typeof g.getElementsByTagName!=Z&&typeof g.createElement!=Z&&typeof g.appendChild!=Z&&typeof g.replaceChild!=Z&&typeof g.removeChild!=Z&&typeof g.cloneNode!=Z,t=[0,0,0],n=null;if(typeof N.plugins!=Z&&typeof N.plugins[B]==P){n=N.plugins[B].description;if(n){n=n.replace(/^.*\s+(\S+\s+\S+$)/,"$1");t[0]=parseInt(n.replace(/^(.*)\..*$/,"$1"),10);t[1]=parseInt(n.replace(/^.*\.(.*)\s.*$/,"$1"),10);t[2]=/r/.test(n)?parseInt(n.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof G.ActiveXObject!=Z){var o=null,s=false;try{o=new ActiveXObject(h+".7")}catch(k){try{o=new ActiveXObject(h+".6");t=[6,0,21];o.AllowScriptAccess="always"}catch(k){if(t[0]==6){s=true}}if(!s){try{o=new ActiveXObject(h)}catch(k){}}}if(!s&&o){try{n=o.GetVariable("$version");if(n){n=n.split(" ")[1].split(",");t=[parseInt(n[0],10),parseInt(n[1],10),parseInt(n[2],10)]}}catch(k){}}}}var v=N.userAgent.toLowerCase(),j=N.platform.toLowerCase(),r=/webkit/.test(v)?parseFloat(v.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,i=false,q=j?/win/.test(j):/win/.test(v),m=j?/mac/.test(j):/mac/.test(v);/*@cc_on i=true;@if(@_win32)q=true;@elif(@_mac)m=true;@end@*/return{w3cdom:l,pv:t,webkit:r,ie:i,win:q,mac:m}}();var e=function(){if(!a.w3cdom){return }J(I);if(a.ie&&a.win){try{g.write("<script id=__ie_ondomload defer=true src=//:><\/script>");var i=c("__ie_ondomload");if(i){i.onreadystatechange=function(){if(this.readyState=="complete"){this.parentNode.removeChild(this);V()}}}}catch(j){}}if(a.webkit&&typeof g.readyState!=Z){Q=setInterval(function(){if(/loaded|complete/.test(g.readyState)){V()}},10)}if(typeof g.addEventListener!=Z){g.addEventListener("DOMContentLoaded",V,null)}M(V)}();function V(){if(S){return }if(a.ie&&a.win){var m=Y("span");try{var l=g.getElementsByTagName("body")[0].appendChild(m);l.parentNode.removeChild(l)}catch(n){return }}S=true;if(Q){clearInterval(Q);Q=null}var j=f.length;for(var k=0;k<j;k++){f[k]()}}function J(i){if(S){i()}else{f[f.length]=i}}function M(j){if(typeof G.addEventListener!=Z){G.addEventListener("load",j,false)}else{if(typeof g.addEventListener!=Z){g.addEventListener("load",j,false)}else{if(typeof G.attachEvent!=Z){G.attachEvent("onload",j)}else{if(typeof G.onload=="function"){var i=G.onload;G.onload=function(){i();j()}}else{G.onload=j}}}}}function I(){var l=H.length;for(var j=0;j<l;j++){var m=H[j].id;if(a.pv[0]>0){var k=c(m);if(k){H[j].width=k.getAttribute("width")?k.getAttribute("width"):"0";H[j].height=k.getAttribute("height")?k.getAttribute("height"):"0";if(O(H[j].swfVersion)){if(a.webkit&&a.webkit<312){U(k)}X(m,true)}else{if(H[j].expressInstall&&!C&&O("6.0.65")&&(a.win||a.mac)){D(H[j])}else{d(k)}}}}else{X(m,true)}}}function U(m){var k=m.getElementsByTagName(P)[0];if(k){var p=Y("embed"),r=k.attributes;if(r){var o=r.length;for(var n=0;n<o;n++){if(r[n].nodeName.toLowerCase()=="data"){p.setAttribute("src",r[n].nodeValue)}else{p.setAttribute(r[n].nodeName,r[n].nodeValue)}}}var q=k.childNodes;if(q){var s=q.length;for(var l=0;l<s;l++){if(q[l].nodeType==1&&q[l].nodeName.toLowerCase()=="param"){p.setAttribute(q[l].getAttribute("name"),q[l].getAttribute("value"))}}}m.parentNode.replaceChild(p,m)}}function F(i){if(a.ie&&a.win&&O("8.0.0")){G.attachEvent("onunload",function(){var k=c(i);if(k){for(var j in k){if(typeof k[j]=="function"){k[j]=function(){}}}k.parentNode.removeChild(k)}})}}function D(j){C=true;var o=c(j.id);if(o){if(j.altContentId){var l=c(j.altContentId);if(l){L=l;T=j.altContentId}}else{L=b(o)}if(!(/%$/.test(j.width))&&parseInt(j.width,10)<310){j.width="310"}if(!(/%$/.test(j.height))&&parseInt(j.height,10)<137){j.height="137"}g.title=g.title.slice(0,47)+" - Flash Player Installation";var n=a.ie&&a.win?"ActiveX":"PlugIn",k=g.title,m="MMredirectURL="+G.location+"&MMplayerType="+n+"&MMdoctitle="+k,p=j.id;if(a.ie&&a.win&&o.readyState!=4){var i=Y("div");p+="SWFObjectNew";i.setAttribute("id",p);o.parentNode.insertBefore(i,o);o.style.display="none";G.attachEvent("onload",function(){o.parentNode.removeChild(o)})}R({data:j.expressInstall,id:K,width:j.width,height:j.height},{flashvars:m},p)}}function d(j){if(a.ie&&a.win&&j.readyState!=4){var i=Y("div");j.parentNode.insertBefore(i,j);i.parentNode.replaceChild(b(j),i);j.style.display="none";G.attachEvent("onload",function(){j.parentNode.removeChild(j)})}else{j.parentNode.replaceChild(b(j),j)}}function b(n){var m=Y("div");if(a.win&&a.ie){m.innerHTML=n.innerHTML}else{var k=n.getElementsByTagName(P)[0];if(k){var o=k.childNodes;if(o){var j=o.length;for(var l=0;l<j;l++){if(!(o[l].nodeType==1&&o[l].nodeName.toLowerCase()=="param")&&!(o[l].nodeType==8)){m.appendChild(o[l].cloneNode(true))}}}}}return m}function R(AE,AC,q){var p,t=c(q);if(typeof AE.id==Z){AE.id=q}if(a.ie&&a.win){var AD="";for(var z in AE){if(AE[z]!=Object.prototype[z]){if(z=="data"){AC.movie=AE[z]}else{if(z.toLowerCase()=="styleclass"){AD+=' class="'+AE[z]+'"'}else{if(z!="classid"){AD+=" "+z+'="'+AE[z]+'"'}}}}}var AB="";for(var y in AC){if(AC[y]!=Object.prototype[y]){AB+='<param name="'+y+'" value="'+AC[y]+'" />'}}t.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AD+">"+AB+"</object>";F(AE.id);p=c(AE.id)}else{if(a.webkit&&a.webkit<312){var AA=Y("embed");AA.setAttribute("type",W);for(var x in AE){if(AE[x]!=Object.prototype[x]){if(x=="data"){AA.setAttribute("src",AE[x])}else{if(x.toLowerCase()=="styleclass"){AA.setAttribute("class",AE[x])}else{if(x!="classid"){AA.setAttribute(x,AE[x])}}}}}for(var w in AC){if(AC[w]!=Object.prototype[w]){if(w!="movie"){AA.setAttribute(w,AC[w])}}}t.parentNode.replaceChild(AA,t);p=AA}else{var s=Y(P);s.setAttribute("type",W);for(var v in AE){if(AE[v]!=Object.prototype[v]){if(v.toLowerCase()=="styleclass"){s.setAttribute("class",AE[v])}else{if(v!="classid"){s.setAttribute(v,AE[v])}}}}for(var u in AC){if(AC[u]!=Object.prototype[u]&&u!="movie"){E(s,u,AC[u])}}t.parentNode.replaceChild(s,t);p=s}}return p}function E(k,i,j){var l=Y("param");l.setAttribute("name",i);l.setAttribute("value",j);k.appendChild(l)}function c(i){return g.getElementById(i)}function Y(i){return g.createElement(i)}function O(k){var j=a.pv,i=k.split(".");i[0]=parseInt(i[0],10);i[1]=parseInt(i[1],10);i[2]=parseInt(i[2],10);return(j[0]>i[0]||(j[0]==i[0]&&j[1]>i[1])||(j[0]==i[0]&&j[1]==i[1]&&j[2]>=i[2]))?true:false}function A(m,j){if(a.ie&&a.mac){return }var l=g.getElementsByTagName("head")[0],k=Y("style");k.setAttribute("type","text/css");k.setAttribute("media","screen");if(!(a.ie&&a.win)&&typeof g.createTextNode!=Z){k.appendChild(g.createTextNode(m+" {"+j+"}"))}l.appendChild(k);if(a.ie&&a.win&&typeof g.styleSheets!=Z&&g.styleSheets.length>0){var i=g.styleSheets[g.styleSheets.length-1];if(typeof i.addRule==P){i.addRule(m,j)}}}function X(k,i){var j=i?"visible":"hidden";if(S){c(k).style.visibility=j}else{A("#"+k,"visibility:"+j)}}return{registerObject:function(l,i,k){if(!a.w3cdom||!l||!i){return }var j={};j.id=l;j.swfVersion=i;j.expressInstall=k?k:false;H[H.length]=j;X(l,false)},getObjectById:function(l){var i=null;if(a.w3cdom&&S){var j=c(l);if(j){var k=j.getElementsByTagName(P)[0];if(!k||(k&&typeof j.SetVariable!=Z)){i=j}else{if(typeof k.SetVariable!=Z){i=k}}}}return i},embedSWF:function(n,u,r,t,j,m,k,p,s){if(!a.w3cdom||!n||!u||!r||!t||!j){return }r+="";t+="";if(O(j)){X(u,false);var q=(typeof s==P)?s:{};q.data=n;q.width=r;q.height=t;var o=(typeof p==P)?p:{};if(typeof k==P){for(var l in k){if(k[l]!=Object.prototype[l]){if(typeof o.flashvars!=Z){o.flashvars+="&"+l+"="+k[l]}else{o.flashvars=l+"="+k[l]}}}}J(function(){R(q,o,u);if(q.id==u){X(u,true)}})}else{if(m&&!C&&O("6.0.65")&&(a.win||a.mac)){X(u,false);J(function(){var i={};i.id=i.altContentId=u;i.width=r;i.height=t;i.expressInstall=m;D(i)})}}},getFlashPlayerVersion:function(){return{major:a.pv[0],minor:a.pv[1],release:a.pv[2]}},hasFlashPlayerVersion:O,createSWF:function(k,j,i){if(a.w3cdom&&S){return R(k,j,i)}else{return undefined}},createCSS:function(j,i){if(a.w3cdom){A(j,i)}},addDomLoadEvent:J,addLoadEvent:M,getQueryParamValue:function(m){var l=g.location.search||g.location.hash;if(m==null){return l}if(l){var k=l.substring(1).split("&");for(var j=0;j<k.length;j++){if(k[j].substring(0,k[j].indexOf("="))==m){return k[j].substring((k[j].indexOf("=")+1))}}}return""},expressInstallCallback:function(){if(C&&L){var i=c(K);if(i){i.parentNode.replaceChild(L,i);if(T){X(T,true);if(a.ie&&a.win){L.style.display="block"}}L=null;T=null;C=false}}}}}();


/*
yStorage
*/
(function(){function l(){if(d.jStorage)try{c=m(""+d.jStorage)}catch(a){d.jStorage="{}"}else d.jStorage="{}";i=d.jStorage?(""+d.jStorage).length:0}function g(){try{d.jStorage=n(c),"CookieStorage"==f&&YAHOO.util.Cookie.set("user_jStorage",d.jStorage,{path:"/",expires:new Date((new Date).getTime()+31536E7)}),i=d.jStorage?(""+d.jStorage).length:0}catch(a){}}function h(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
return!0}function j(){var a,b,d,e=Infinity,f=!1;clearTimeout(o);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;d=c.__jstorage_meta.TTL;for(b in d)d.hasOwnProperty(b)&&(d[b]<=a?(delete d[b],delete c[b],f=!0):d[b]<e&&(e=d[b]));Infinity!=e&&(o=setTimeout(j,e-a));f&&g()}}if(!Object.toJSON&&!window.JSON&&!YAHOO.lang.JSON)throw Error("Make sure yuiloader-header-startup.js contains YAHOO.lang.JSON");var c={},d={jStorage:"{}"},e=null,i=0,n=Object.toJSON||window.JSON&&(JSON.encode||
JSON.stringify)||YAHOO&&YAHOO.lang&&YAHOO.lang.JSON&&YAHOO.lang.JSON.stringify,m=window.JSON&&(JSON.decode||JSON.parse)||YAHOO&&YAHOO.lang&&YAHOO.lang.JSON&&YAHOO.lang.JSON.parse,f=!1,o,k={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||
window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};yStorage={version:"0.1.6.1",set:function(a,b){h(a);k.isXML(b)?b={_is_xml:!0,xml:k.encode(b)}:"function"==typeof b?b=null:b&&"object"==typeof b&&(b=m(n(b)));c[a]=b;g();return b},get:function(a,b){h(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml&&c[a]._is_xml?k.decode(c[a].xml):
c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){h(a);return a in c?(delete c[a],c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],g(),!0):!1},setTTL:function(a,b){var d=+new Date;h(a);b=Number(b)||0;return a in c?(c.__jstorage_meta||(c.__jstorage_meta={}),c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],g(),j(),!0):!1},flush:function(){c={};g();return!0},
storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=b&&a.push(b);return a},storageSize:function(){return i},currentBackend:function(){return f},storageAvailable:function(){return!!f},reInit:function(){var a;if(e&&e.addBehavior){a=document.createElement("link");e.parentNode.replaceChild(a,e);e=a;e.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(e);e.load("jStorage");
a="{}";try{a=e.getAttribute("jStorage")}catch(b){}d.jStorage=a;f="userDataBehavior"}l()}};(function(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(d=window.localStorage,f="localStorage")}catch(c){}else f="CookieStorage",d.jStorage=YAHOO.util.Cookie.get("user_jStorage",{path:"/"});l();j()})()})();

/* 
Foresee survey code include for /foresee/foresee-alive.js - Begin
*/

var FSR = {
    'version': '6.1.0',
    'date': '07/22/2010',
    'enabled': true,
	'auto' : true,
	'encode' : true,
    'files': '/foresee/',
    'id': 'KQSramEereeZ8BQS8jPwzw==',
    'sites': [{
        path: /\w+-?\w+\.(com|org|edu|gov|net)/
    }, {
        path: '.',
        domain: 'default'
    }]
};


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="fsr.a="+A+";path=/"+((FSR.site.domain)?";domain="+FSR.site.domain+";":";")
}(function(){if(window!=window.top){return }function G(K){if(typeof K=="object"){var J=K.constructor.toString().match(/array/i);
return(J!=null)}return false}var I=FSR.sites;for(var F=0,D=I.length;F<D;F++){var B;if(!G(I[F].path)){I[F].path=[I[F].path]
}for(var E=0,C=I[F].path.length;E<C;E++){if(B=document.location.href.match(I[F].path[E])){FSR.siteid=F;
FSR.site=FSR.sites[FSR.siteid];if(!FSR.site.domain){FSR.site.domain=B[0]}else{if(FSR.site.domain=="default"){FSR.site.domain=false
}}if(!FSR.site.name){FSR.site.name=B[0]}var A=["files","js_files","image_files","html_files"];for(var F=0,H=A.length;
F<H;F++){if(FSR.site[A[F]]){FSR[A[F]]=FSR.site[A[F]]}}break}}if(B){break}}if(!window["fsr$timer"]){fsr$setAlive();
window["fsr$timer"]=setInterval(fsr$setAlive,1000)}})();

/* 
Foresee survey code include for /foresee/foresee-alive.js - End
*/

if (window.verticalAcuityLibFlag) {
   YAHOO.util.Get.script("http://scripts.verticalacuity.com/vat/mon/vtw.js",{
   onSuccess: function(){
   }
});
}

isMinNS4=(document.layers)?1:0;
isMinIE4=(document.all)?1:0;
isMinIE5=(document.getElementById&&document.all)?1:0;
isNS6=(document.getElementById&&!document.all)?1:0;

//assign indexOf to the array object if using IE <9
/*if(!Array.indexOf){
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj){
				return i;
			}
		}
		return -1;
	}
}*/

var thisX=0;
var thisY=0;
var thistdX=0;
var thistdY=0;
var thisElement;
var thistdElement;
var newwindow='';
var OAS_MJX_on;
var isLocal=(window.location.hostname.indexOf("weather.com")>=0)?1:0;


if(typeof YAHOO.yuiLoadEvents=="undefined")YAHOO.namespace("yuiLoadEvents");
YAHOO.yuiLoadEvents.popService=new YAHOO.util.CustomEvent("loaded");
if(typeof wxtools=="undefined")wxtools={};
if(typeof wxtools.popService=="undefined"){
	wxtools.popService=function(){
		if(typeof wxtools.popService.instance=="undefined"){
			wxtools.popService.instance=this}
		else{
			alert("Instance already created.");
			return wxtools.popService.instance;
		}

		if(typeof wxtools.tooltips=="undefined")wxtools.tooltips={};
		if(typeof wxtools.popintos=="undefined")wxtools.popintos={}

		this.createToolTip=function(event,fireArgs,params){
			var ttId="";
			var ttId="";
			var anchorId=[];
			var text=null;
			var showdelay=100;
			var hidedelay=100;
			var autodismissdelay=8000;
			var position=["above",0,0];
			var container=document.body;
			var width=null;
			var constraintoviewport=false;
			if(params.ttId!=null)ttId=params.ttId;
			if(params.position!=null)position=params.position;
			if(params.showdelay!=null)showdelay=params.showdelay;
			if(params.hidedelay!=null)hidedelay=params.hidedelay;
			if(params.autodismissdelay!=null)autodismissdelay=params.autodismissdelay;
			if(params.anchorId!=null)anchorId=params.anchorId;
			if(params.container!=null)container=params.container;
			if(params.text!=null)text=params.text;
			if(params.width!=null)width=params.width+"px";
			var configParams={showdelay:showdelay,hidedelay:hidedelay,autodismissdelay:autodismissdelay,context:anchorId,container:container,text:text,width:width,constraintoviewport:constraintoviewport};
			for(p in params){
				if(p!="ttId" && p!="showdelay" && p!="hidedelay" && p!="autodismissdelay" && p!="anchorId" && p!="container" && p!="text" && p!="width" && p!="constraintoviewport" && p!="position" && p!="className"){
					configParams[p]=params[p];
				}
			}

			wxtools.tooltips[ttId]=new YAHOO.widget.Tooltip(ttId,configParams);
			if(params.className!=null&&params.className!=""){
				wxtools.tooltips[ttId].element.className=params.className;
			}

			wxtools.tooltips[ttId].contextTriggerEvent.subscribe(function(type,args){
				var aboveOrBelow=position[0];
				var screenTop=parseInt(YAHOO.util.Dom.getClientRegion().top);
				var screenBtm=parseInt(YAHOO.util.Dom.getClientRegion().bottom);
				var xPos=parseInt(YAHOO.util.Dom.getX(anchorId))+position[1];
				var yPos=parseInt(YAHOO.util.Dom.getY(anchorId));
				var xTTpos=parseInt(YAHOO.util.Dom.getX(ttId));
				var yTTpos=parseInt(YAHOO.util.Dom.getY(ttId));
				var ttHeight=parseInt(YAHOO.util.Dom.getRegion(ttId).bottom,10)-
				parseInt(YAHOO.util.Dom.getRegion(ttId).top,10);
				var anchorHeight=parseInt(YAHOO.util.Dom.getRegion(anchorId)[0].bottom,10)-
				parseInt(YAHOO.util.Dom.getRegion(anchorId)[0].top,10);
				var aboveOffset=ttHeight+Math.ceil(anchorHeight/3);
				var belowOffset=anchorHeight+Math.ceil(anchorHeight/3);
				if(position[2]==0&&screenTop>=yPos-aboveOffset&&aboveOrBelow=="above"){
					aboveOrBelow="below";
				} else if(screenTop>=yPos-position[2]&&aboveOrBelow=="above"){
					aboveOrBelow="below";
					position[2]=0;
				} else if(position[2]==0&&screenBtm<=yPos+belowOffset+ttHeight&&aboveOrBelow=="below"){
					aboveOrBelow="above";
				} else if(screenBtm<=yPos+position[2]+ttHeight&&aboveOrBelow=="below"){
					aboveOrBelow="above";
					position[2]=0;
				}

				if(aboveOrBelow=="above"){
					if(position[2]==0||position[2]<=aboveOffset){
						yPos-=aboveOffset;
					} else {
						yPos-=position[2];
					}
				} else {
					if(position[2]==0||position[2]<=belowOffset){
						yPos+=belowOffset;
					}else{
						yPos+=position[2];
					}
				}

				this.cfg.setProperty("xy",[xPos,yPos]);
			});
		}

		this.createPopInto=function(event,args,params){
			var fixedcenter=true;
			var visible=false;
			var close=false;
			var width="300px";
			var draggable=false;
			var trigger="click";
			var context=null;
			var modal=false;
			var underlay="none";
			if(params.fixedcenter!=null)fixedcenter=params.fixedcenter;
			if(params.visible!=null)visible=params.visible;
			if(params.close!=null)close=params.close;
			if(params.width!=null)width=params.width+"px";
			if(params.draggable!=null)draggable=params.draggable;
			if(params.trigger!=null)trigger=params.trigger;
			if(params.context!=null){
				context=params.context;
				fixedcenter=false;
			}

			if(params.modal!=null)modal=params.modal;
			if(params.underlay!=null)underlay=params.underlay;
			var configParams={context:context,fixedcenter:fixedcenter,visible:visible,draggable:draggable,close:close,width:width,modal:modal,underlay:underlay}

			for(p in params){
				if(p!="context"&&p!="fixedcenter"&&p!="visible"&&p!="draggable"&&p!="close"&&p!="width"&&p!="modal"&&p!="underlay"&&p!="piHeader"&&p!="piBody"&&p!="piFooter"&&p!="className"){
					configParams[p]=params[p];
				}
			}

			wxtools.popintos[params.contentId]=new YAHOO.widget.Panel(params.contentId,configParams);
			if(params.className!=null){
				wxtools.popintos[params.contentId].renderEvent.subscribe(function(){
					var o=wxtools.popintos[params.contentId].body;
					o.parentNode.className=params.className;
				}
				);
			}

			if(params.piHeader!=null)wxtools.popintos[params.contentId].setHeader(params.piHeader);
			if(params.piBody!=null)wxtools.popintos[params.contentId].setBody(params.piBody);
			if(params.piFooter!=null)wxtools.popintos[params.contentId].setFooter(params.piFooter);
			if(params.piBody!=null){
				wxtools.popintos[params.contentId].render(document.body);
			}else{
				wxtools.popintos[params.contentId].render();
			}

			if(trigger=='hover'){
				YAHOO.util.Event.addListener(params.anchorId,'mouseover',wxtools.popintos[params.contentId].show,wxtools.popintos[params.contentId],true);
				YAHOO.util.Event.addListener(params.anchorId,'mouseout',function(){
				YAHOO.util.Dom.setStyle(params.contentId+'_c','visibility','hidden')}
				);
			}else{
				YAHOO.util.Event.addListener(params.anchorId,trigger,wxtools.popintos[params.contentId].show,wxtools.popintos[params.contentId],true);
			}

			if(params.hideId!=null){
				YAHOO.util.Event.addListener(params.hideId,"click",wxtools.popintos[params.contentId].hide,wxtools.popintos[params.contentId],true);
			}
		}

		var init=function(){
			var loader=new YAHOO.util.YUILoader();
			loader.require("container","animation");
			loader.loadOptional=true;
			loader.base="http://j.imwx.com/global/common/elements/javascript/2.5.2/";
			loader.combine=true;
			loader.onSuccess=function(){
				YAHOO.yuiLoadEvents.popService.fire();
			};
			loader.insert();
		};
		YAHOO.util.Event.onDOMReady(init);
	}
}


function getCookieVal(offset){
	if(!isLocal)return false;
	var endstr=document.cookie.indexOf(";",offset);
	if(endstr==-1)endstr=document.cookie.length;
	return unescape(document.cookie.substring(offset,endstr));
}

function GetCookie(name){
	if(!isLocal)return false;
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while(i<clen){
		var j=i+alen;
		if(document.cookie.substring(i,j)==arg)return getCookieVal(j);
		i=document.cookie.indexOf(" ",i)+1;
		if(i==0)break;
	}

	return"";
}

function fixBadUP(instring) {
	instring=instring.replace(/\\\"/g,"");
	instring=instring.replace(/\"/g,"");
	instring=escape(instring);
	instring=instring.replace(/\%5E/g,"|");
	return instring;
}

function unEscJava(string){
	var value=unescape(string);
	return value.replace(/\+/g," ");
}

function getUserPreferences(itemno){
	var getUP=GetCookie("UserPreferences");
	if(getUP.length>4){
		if(0<getUP.indexOf("\"")){
			getUP=fixBadUP(getUP);
			SetCookie("UserPreferences",getUP);
		}

		var splitUP=getUP.split("|");
		if(splitUP[itemno]){
			var myVal=unEscJava(splitUP[itemno]);
			return myVal;
		}else{
			return"";
		}
	}else{
		return"";
	}
}

function smartTrack(URL,TS){
	// Depreacated 
	return false;
}

function newTrack(HASH){
	return intelliTrak(HASH);
}

var isLinkClicked=false;
function setClick(){
	isLinkClicked=true;
}

function unsetClick(){
	isLinkClicked=false;
}



/****
*	The infamous intelliTRAK function used to handle all our from string implementations
*	
*****/

function intelliTrak(HASH){
	var pos = HASH["href"].indexOf('#');
	if(pos >0){
		HASH["anchor"] = HASH["href"].substr(pos+1);
	}
	if(isLinkClicked){
		var URL='';
		var delim='?';
		if(typeof HASH=='undefined'){
			var HASH={};
		}

		if(HASH.href!='undefined'){
			URL=HASH["href"];
		}

		for(var n in HASH){
			if(n!='href' && n!='anchor' && n!='from'){
				if(URL.indexOf('?')>1){
					URL=URL+"&"+n+"="+HASH[n];
				}else{
					URL=URL+delim+n+"="+HASH[n];
				}
				delim='&';
			} else if(n=='from') {
				HASH[n] = HASH[n].replace(/%timeframe%/g,wx.config.page.pif_timeframe);
				var userDeclaration = 'undeclared';
				if (wx.config.user.apps != '') userDeclaration = 'declared';
				HASH[n] = HASH[n].replace(/%undeclared%/g,userDeclaration);
				//var expdate=new Date();
				//FixCookieDate(expdate);
				//expdate.setTime(expdate.getTime()+(0));
				SetCookie("fromStr",HASH[n],"","/",".weather.com");
			}
		}

		var thisUP=getUserPreferences(11);
		var thisLID=GetCookie('LocID');
		
			if(thisUP.length>=5) {
				URL=URL.replace(/%uploc%/g,thisUP);
			} else if(thisLID.length>=5) {
				URL=URL.replace(/%uploc%/g,thisLID);
			} else {
				URL=URL.replace(/%uploc%/g,'');
			}
			if(thisLID.length>=5) {
				URL=URL.replace(/%locid%/g,thisLID); 
			} else { 
				URL=URL.replace(/%locid%/g,'');
			}

		
			var finalURL=URL;
			var paramList="";
			if(finalURL.indexOf('?')>1){
				var finalOffset=finalURL.indexOf('?');
				paramList=finalURL.substring(finalOffset);
				finalURL=finalURL.substring(0,finalOffset);
			}
	
			var parms=paramList.split('&');
			for(var i=0;i<parms.length;i++){
				var pos=parms[i].indexOf('#');
				if(pos>0){
					var key=parms[i].substring(pos);
					finalURL=finalURL+parms[i].substring(0,pos);
				}else{
					finalURL=finalURL+parms[i];
				}
				if(i<parms.length-1){
					finalURL=finalURL+"&";
				}
			}
	
			URL=finalURL.replace(/%ref%/g,finalURL);
			if(URL.indexOf('http')==-1){
				var HEADER_host=window.location.hostname;
				if(HEADER_host!='delta.weather.com'&&HEADER_host!='beta.weather.com'&&HEADER_host!='w3.weather.com')HEADER_host='www.weather.com';
				HEADER_host='http://'+HEADER_host;
				URL=HEADER_host+URL;
			}
		
		unsetClick();
		if(HASH["anchor"]!='undefined'&&HASH["anchor"]!=null&&HASH["anchor"]!=''){
			URL=URL+'#'+HASH["anchor"];
		}

		return URL;
	}else{
		if(HASH["anchor"]!='undefined'&&HASH["anchor"]!=null&&HASH["anchor"]!=''){
			return HASH.href+'#'+HASH["anchor"];
		}else{
			return HASH.href;
		}
	}
}
YAHOO.namespace('weather'); 
YAHOO.weather.intelliTrak = intelliTrak;
window.intelliTrak = intelliTrak;
YAHOO.weather.intelliTrak.isLinkClicked=false;

function splitLink(condition,trueLink,falseLink,TS){
	if(condition){
		var tempHash = {'href':trueLink,'from':TS};
		document.location = intelliTrak(tempHash)+"?from="+TS;
	}else{
		var tempHash = {'href':falseLink,'from':TS};
		document.location = intelliTrak(tempHash)+"?from="+TS;
	}
}


(function() {
	var YUE=YAHOO.util.Event;
	var YUD=YAHOO.util.Dom;
	YUE.onDOMReady(function() {
		YUE.on(document.body,"mousedown",function(e) {
			var oTarget=YUE.getTarget(e);
			if(oTarget.nodeName&&(oTarget.nodeName.toUpperCase()=="IMG" || 
									oTarget.nodeName.toUpperCase()=="DIV" || 
										oTarget.nodeName.toUpperCase()=="B" ||
											oTarget.nodeName.toUpperCase()=="STRONG" ||
												oTarget.nodeName.toUpperCase()=="A" || 
													oTarget.nodeName.toUpperCase()=="I" ||
														oTarget.nodeName.toUpperCase()=="SPAN" ||
															oTarget.nodeName.toUpperCase()=="SUB" ||
																oTarget.nodeName.toUpperCase()=="EM" ||
																	oTarget.nodeName.toUpperCase()=="SUP" )) {
				var pn=oTarget.parentNode;
				if(pn && pn.nodeName && (pn.nodeName.toUpperCase()=="A" || pn.nodeName.toUpperCase()=="AAA")) {
					oTarget=pn;
					//alert("Daniel Debug - Come see me if you need this turned off. =>"+ oTarget.nodeName.toUpperCase() + ", => " + pn.nodeName.toUpperCase());
				}
			}
			var oFrom=YUD.getAttribute(oTarget, "from");
			if((oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="B" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="STRONG" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="EM" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="IMG" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="DIV" || oTarget.nodeName.toUpperCase()=="A")&& oFrom!==null && oTarget.nodeName) {
				setClick();
			}
		});

		YUE.on(document.body,"mouseup",function(e) {
			var oTarget=YUE.getTarget(e);
			if(oTarget.nodeName&& (oTarget.nodeName.toUpperCase()=="IMG" || oTarget.nodeName.toUpperCase()=="DIV" || 
														 oTarget.nodeName.toUpperCase()=="B" || oTarget.nodeName.toUpperCase()=="STRONG" || oTarget.nodeName.toUpperCase()=="EM" ||
														 oTarget.nodeName.toUpperCase()=="A" || oTarget.nodeName.toUpperCase()=="I" ||
														 oTarget.nodeName.toUpperCase()=="SPAN" || oTarget.nodeName.toUpperCase()=="SUB" ||
														 oTarget.nodeName.toUpperCase()=="SUP")) {
				var pn=oTarget.parentNode;
				if((pn.nodeName.toUpperCase()=="AAA" || pn.nodeName.toUpperCase()=="A") && pn && pn.nodeName) {
					oTarget=pn;
				}
			}
			var oFrom=YUD.getAttribute(oTarget, "from");
			var oHref=YUD.getAttribute(oTarget, "href");
			
			if( (oTarget.nodeName.toUpperCase()=="DIV" || oTarget.nodeName.toUpperCase()=="A") && oFrom!==null && oTarget.nodeName) {
				if(oHref&&oHref.indexOf("from")=="-1") {
				var eles={};
			for(i=0;i<oTarget.attributes.length;i++){
				if(oTarget.attributes[i].nodeName=="href"||oTarget.attributes[i].nodeName=="onclick"||oTarget.attributes[i].nodeName=="onmousedown"||oTarget.attributes[i].nodeName=="id"||oTarget.attributes[i].nodeName=="class"||oTarget.attributes[i].nodeName=="onmouseup"||oTarget.attributes[i].nodeName=="language"||oTarget.attributes[i].nodeName=="dataFld"||oTarget.attributes[i].nodeName=="oncontextmenu"||oTarget.attributes[i].nodeName=="onrowexit"||oTarget.attributes[i].nodeName=="onbeforepaste"||oTarget.attributes[i].nodeName=="onactivate"||oTarget.attributes[i].nodeName=="lang"||oTarget.attributes[i].nodeName=="onmousemove"||oTarget.attributes[i].nodeName=="onmove"||oTarget.attributes[i].nodeName=="onselectstart"||oTarget.attributes[i].nodeName=="oncontrolselect"||oTarget.attributes[i].nodeName=="oncut"||oTarget.attributes[i].nodeName=="onrowenter"||oTarget.attributes[i].nodeName=="onpaste"||oTarget.attributes[i].nodeName=="onreadystatechange"||oTarget.attributes[i].nodeName=="onbeforedeactivate"||oTarget.attributes[i].nodeName=="hideFocus"||oTarget.attributes[i].nodeName=="dir"||oTarget.attributes[i].nodeName=="onlosecapture"||oTarget.attributes[i].nodeName=="ondrag"||oTarget.attributes[i].nodeName=="ondragstart"||oTarget.attributes[i].nodeName=="oncellchange"||oTarget.attributes[i].nodeName=="onfilterchange"||oTarget.attributes[i].nodeName=="onrowsinserted"||oTarget.attributes[i].nodeName=="ondatasetcomplete"||oTarget.attributes[i].nodeName=="onmousewheel"||oTarget.attributes[i].nodeName=="ondragenter"||oTarget.attributes[i].nodeName=="onblur"||oTarget.attributes[i].nodeName=="onresizeend"||oTarget.attributes[i].nodeName=="onerrorupdate"||oTarget.attributes[i].nodeName=="onbeforecopy"||oTarget.attributes[i].nodeName=="ondblclick"||oTarget.attributes[i].nodeName=="onkeyup"||oTarget.attributes[i].nodeName=="onresizestart"||oTarget.attributes[i].nodeName=="onmouseover"||oTarget.attributes[i].nodeName=="onmouseleave"||oTarget.attributes[i].nodeName=="onmoveend"||oTarget.attributes[i].nodeName=="title"||oTarget.attributes[i].nodeName=="onresize"||oTarget.attributes[i].nodeName=="contentEditable"||oTarget.attributes[i].nodeName=="dataFormatAs"||oTarget.attributes[i].nodeName=="ondrop"||oTarget.attributes[i].nodeName=="onpage"||oTarget.attributes[i].nodeName=="onrowsdelete"||oTarget.attributes[i].nodeName=="style"||oTarget.attributes[i].nodeName=="onfocusout"||oTarget.attributes[i].nodeName=="ondatasetchanged"||oTarget.attributes[i].nodeName=="ondeactivate"||oTarget.attributes[i].nodeName=="onpropertychange"||oTarget.attributes[i].nodeName=="ondragover"||oTarget.attributes[i].nodeName=="onhelp"||oTarget.attributes[i].nodeName=="ondragend"||oTarget.attributes[i].nodeName=="onbeforeeditfocus"||oTarget.attributes[i].nodeName=="disabled"||oTarget.attributes[i].nodeName=="onfocus"||oTarget.attributes[i].nodeName=="accessKey"||oTarget.attributes[i].nodeName=="onscroll"||oTarget.attributes[i].nodeName=="onbeforeactivate"||oTarget.attributes[i].nodeName=="onbeforecut"||oTarget.attributes[i].nodeName=="dataSrc"||oTarget.attributes[i].nodeName=="oncopy"||oTarget.attributes[i].nodeName=="onfocusin"||oTarget.attributes[i].nodeName=="tabIndex"||oTarget.attributes[i].nodeName=="onbeforeupdate"||oTarget.attributes[i].nodeName=="ondataavailable"||oTarget.attributes[i].nodeName=="onmovestart"||oTarget.attributes[i].nodeName=="onmouseout"||oTarget.attributes[i].nodeName=="onmouseenter"||oTarget.attributes[i].nodeName=="onlayoutcomplete"||oTarget.attributes[i].nodeName=="implementation"||oTarget.attributes[i].nodeName=="onafterupdate"||oTarget.attributes[i].nodeName=="ondragleave"||oTarget.attributes[i].nodeName=="target"||oTarget.attributes[i].nodeName=="urn"||oTarget.attributes[i].nodeName=="rev"||oTarget.attributes[i].nodeName=="hreflang"||oTarget.attributes[i].nodeName=="shape"||oTarget.attributes[i].nodeName=="type"||oTarget.attributes[i].nodeName=="coords"||oTarget.attributes[i].nodeName=="methods"||oTarget.attributes[i].nodeName=="rel"||oTarget.attributes[i].nodeName=="charset"||oTarget.attributes[i].nodeName=="name"||oTarget.attributes[i].nodeName=="aria-haspopup"||oTarget.attributes[i].nodeName=="aria-disabled"||oTarget.attributes[i].nodeName=="aria-hidden"||oTarget.attributes[i].nodeName=="aria-level"||oTarget.attributes[i].nodeName=="aria-busy"||oTarget.attributes[i].nodeName=="aria-checked"||oTarget.attributes[i].nodeName=="aria-readonly"||oTarget.attributes[i].nodeName=="aria-secret"||oTarget.attributes[i].nodeName=="aria-posinset"||oTarget.attributes[i].nodeName=="aria-relevant"||oTarget.attributes[i].nodeName=="aria-live"||oTarget.attributes[i].nodeName=="aria-labelledby"||oTarget.attributes[i].nodeName=="aria-pressed"||oTarget.attributes[i].nodeName=="aria-invalid"||oTarget.attributes[i].nodeName=="aria-valuenow"||oTarget.attributes[i].nodeName=="aria-selected"||oTarget.attributes[i].nodeName=="aria-owns"||oTarget.attributes[i].nodeName=="aria-valuemax"||oTarget.attributes[i].nodeName=="aria-valuemin"||oTarget.attributes[i].nodeName=="aria-setsize"||oTarget.attributes[i].nodeName.indexOf("aria")!=-1||oTarget.attributes[i].nodeName=="onsubmit"||oTarget.attributes[i].nodeName=="onkeydown"||oTarget.attributes[i].nodeName=="onkeypress"){
			}
			else{
			var name=oTarget.attributes[i].nodeName;
			eles[name]=oTarget.attributes[i].nodeValue;
			}
			}
			}
			}

			if(oTarget.nodeName && oFrom!==null){
				if(oTarget.nodeName.toUpperCase()=="A") {
					eles['href'] = YUD.getAttribute(oTarget, "href");
					YUD.setAttribute(oTarget, "href",intelliTrak(eles));
				} else if(oTarget.nodeName.toUpperCase()=="DIV") {
					SetCookie("fromStr",oFrom,"","/",".weather.com");
				} else {
					YUD.setAttribute(oTarget, "href",intelliTrak(eles));
				}
			}
		});
	});
})();

function hugMe(typeOfUser){

	if(!isLocal)return;
	var WWW_host=window.location.hostname;
	if(WWW_host!='delta.weather.com'&&WWW_host!='w3.weather.com'&&WWW_host!='beta.weather.com')WWW_host='www.weather.com';
	WWW_host='http://'+WWW_host;
	var getTwcLocId=getUserPreferences("11");
	
	
	var getHugmeLocationType=getUserPreferences("22");
	
		
	var isHugged=false;
	var hasData=false;
	var hasAlert=false;
	if(getTwcLocId&&getTwcLocId!=" "&&getHugmeLocationType&&getHugmeLocationType!=" "){
		hp_hugmeblock();
		if(hp_hugmedata&&hp_hugmedata[0]!='false'){
			isHugged=true;
			if(hp_hugmedata[1]!='false'){
				hasData=true;
			}
			if(hp_hugmedata[2]!='false'){
				hasAlert=true;
			}
		}
	}
	if(isHugged){
	var locType='';
	//WX258 changes start
	var urlStucture = seoUrlGenerator(hp_hugmedata[7],hp_hugmedata[8]);
	//WX258 changes end
	if(hp_hugmedata[9]){
		locType=':'+hp_hugmedata[9];
	};
	//WX258 changes start
	var locationURL=WWW_host+"/weather/today/"+urlStucture;
	//WX258 changes end
	var locationURL=WWW_host+"/weather/local/"+hp_hugmedata[8]+locType;
	var alertStr='<B>';
	var alertCloseStr='</B>';
	if(hp_hugmedata[2]!='false'){alertStr='<B STYLE="background-color:#9A0000;color:#FFFFFF;">';};
	var fullLocationName=hp_hugmedata[7];
	var ind=fullLocationName.indexOf('(');
	if(ind>0){fullLocationName=fullLocationName.substring(0,ind-1);};
	var locationName=fullLocationName;
	if(locationName.length>20){
		locationName=locationName.substring(0,17);
		locationName+="...";
	};
	var hugltype=getUserPreferences("22");
	var hugVName=getUserPreferences("16");
	var myHugURL="";
	if(hugltype!="1"&&hugltype!="4"){
	myHugURL="http://www.weather.com/weather/hugme/"+getUserPreferences("23")
	}else{
	myHugURL="http://www.weather.com/weather/hugme/"+getUserPreferences("11")
	};
	if(typeOfUser=="notsignedin"){
		document.write('<DIV id="hbHTemp" class="hbText"><A HREF="'+locationURL+'" TITLE="'+fullLocationName+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hugme\',\'refer\':\'hugme\'});">'+locationName+'</A> &nbsp;');
		if(hugltype!="1"&&hugltype!="4"){
			document.write('<A HREF="'+myHugURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({	\'href\':this.href,\'from\':\'hat_hugchange\',\'fromhsearch\':\'true\',\'selvid\':\''+getUserPreferences("22")+'\',\'hloc\':\''+getUserPreferences("11")+'\',\'hlocname\':\''+getUserPreferences("10")+'\'});">Edit</A>');
		}else{
			document.write('<A HREF="'+myHugURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({	\'href\':this.href,\'from\':\'hat_hugchange\',\'fromhsearch\':\'true\',\'selname\':\''+hugVName+'\'});">Edit</A>');
		}
		document.write('&nbsp;<SPAN id="hbTempIDTwo" class="TempBackgroundNone">&nbsp;<A HREF="'+locationURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hugme\',\'refer\':\'hugme\'});">'+alertStr+hp_hugmedata[3]+'&deg;'+alertCloseStr+hp_hugmedata[4]+'</A>&nbsp;</SPAN>');
		document.write('<div class="iconclass"><A HREF="'+locationURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hugme\',\'refer\':\'hugme\'});"><IMG src="http://i.imwx.com/web/common/wxicons/25/'+hp_hugmedata[6]+'.gif" width="20" height="20" border="0" align="middle"></A></div>');
		document.write('</DIV>');
	}else if(typeOfUser=="signedin"){
		document.write('<A HREF="'+locationURL+'" TITLE="'+fullLocationName+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hugme\',\'refer\':\'hugme\'});">'+locationName+'</A> &nbsp;');
		if(hugltype!="1"&& hugltype!="4"){
			document.write('<A HREF="'+myHugURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hat_hugchange\',\'fromhsearch\':\'true\',\'selvid\':\''+getUserPreferences("22")+'\',\'hloc\':\''+getUserPreferences("11")+'\',\'hlocname\':\''+getUserPreferences("10")+'\'});">Edit</A>');
		}else{
			document.write('<A HREF="'+myHugURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hat_hugchange\',\'fromhsearch\':\'true\',\'selname\':\''+hugVName+'\'});">Edit</A>');
		}
	}
	document.write('&nbsp;<SPAN id="hbTempIDOne" class="TempBackgroundNone">&nbsp;<A HREF="'+locationURL+'" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hugme\',\'refer\':\'hugme\'});">'+alertStr+hp_hugmedata[3]+'&deg;'+alertCloseStr+hp_hugmedata[4]+'</A>&nbsp;</SPAN>');
	}else if(!isHugged&&typeOfUser!="signedin"){
		document.write('<div id="localOneClick" class="hbText"><A HREF="http://www.weather.com/weather/hugme" onmousedown="setClick();" onmouseup="this.href=intelliTrak({\'href\':this.href,\'from\':\'hugset\',\'refer\':\'hugset\'});">Local weather in 1-click</a> | </div>');
	}
}


//WX258 changes start
function seoUrlGenerator(location,locid){
    var locPresName = location;	
	var filtered ="()1234567890";
	var i;
	var returnString="";
	for(i=0;i<locPresName.length;i++){
		var c=locPresName.charAt(i);
		for(j=0;j<filtered.length;j++){
			if(c==filtered.charAt(j)){
				returnString+=c;
			}
		}
	}
	var newlocPresName = locPresName.replace(returnString, "");	
	var splitUplocPresName=newlocPresName.split(",");	
	var newSEOURL = splitUplocPresName[0]+"+"+splitUplocPresName[1].split(' ').join('')+"+"+locid;
	
	return newSEOURL;
}
//WX258 changes end
function checkForm(){
	var WWW_host=window.location.hostname;
	if(WWW_host!='delta.weather.com'&&WWW_host!='w3.weather.com'&&WWW_host!='beta.weather.com')WWW_host='www.weather.com';
	WWW_host='http://'+WWW_host;
	document.whatwhere.action=WWW_host+"/search/enhanced";
	if(document.whatwhere.where.value=="Enter city or US zip"){
	return false;
	}
	else if(document.whatwhere.whatprefs.selectedIndex>0){
	var thisVal=document.whatwhere.whatprefs.options[document.whatwhere.whatprefs.selectedIndex].value;
	document.whatwhere.what.value=thisVal;
	var retVal=changeCommandToVal(thisVal);
	setUserPreferences('16',retVal);
	document.whatwhere.from.value="whatwhere_drop";
	}
	else if(getUserPreferences('16')&&getUserPreferences('16').length>1){
	var thisVal=getUserPreferences('16');
	var retVal=changeValToCommand(thisVal);
	document.whatwhere.what.value=retVal;
	}
	else{
	document.whatwhere.what.value='WeatherLocalUndeclared';
	}

	whatWhereValue=stringFilterChecker(document.whatwhere.where.value);
	whatWhereValue=recognizeZipCode(whatWhereValue);
	document.whatwhere.where.value=whatWhereValue;
	document.whatwhere.lswa.value=document.whatwhere.what.value;
	document.whatwhere.lswe.value=document.whatwhere.where.value;
	if(document.whatwhere.where.value.length==5&&document.whatwhere.where.value>0&&document.whatwhere.where.value<100000){
		var lp="/weather/local/";
		var wh=document.whatwhere.what.value;
		if(document.whatwhere.from.value=='whatwhere'||document.whatwhere.from.value=='whatwhere_drop'){
			updateRecentSearch(document.whatwhere.where.value);
		}

  //WX258 changes - remove anything that has to do with sunsafety, achesandpains and health (general)
		if(wh=='Weather36HourAllergiesCommand')lp="/outlook/health/allergies/local/";
		else if(wh=='Weather36HourAirQualityCommand')lp="/outlook/health/airquality/local/";		
		else if(wh=='Weather36HourColdAndFluCommand')lp="/outlook/health/coldandflu/local/";
		else if(wh=='Weather36HourHomeCommand')lp="/outlook/homeandgarden/home/local/";
		else if(wh=='Weather36HourGardenCommand')lp="/outlook/homeandgarden/garden/local/";
		else if(wh=='Weather36HourSchooldayCommand')lp="/outlook/homeandgarden/schoolday/local/";
		else if(wh=='Weather36HourSportsCommand')lp="/outlook/events/sports/local/";
		else if(wh=='Weather36HourWeddingCommand')lp="/outlook/events/weddings/local/";
		else if(wh=='Weather36HourInterstateCommand')lp="/outlook/driving/interstate/local/";
		else if(wh=='Weather36HourBoatAndBeachCommand')lp="/outlook/recreation/boatandbeach/local/";
		else if(wh=='Weather36HourGolfCommand')lp="/outlook/recreation/golf/local/";
		else if(wh=='Weather36HourSkiCommand')lp="/outlook/recreation/ski/local/";
		else if(wh=='Weather36HourBusinessTravelerCommand')lp="/outlook/travel/businesstraveler/local/";
		else if(wh=='Weather36HourVacationPlannerCommand')lp="/outlook/travel/vacationplanner/local/";
		else if(wh=='Weather36HourOutdoorsCommand')lp="/outlook/recreation/outdoors/local/";
		else if(wh=='Weather36HourFitnessCommand')lp="/outlook/health/fitness/local/";
	  else if(wh=='Weather36HourSunSafetyCommand')lp="/outlook/health/skin/local/";
	  else if(wh=='Weather36HourAchesAndPainsCommand')lp="/outlook/health/achesandpains/local/";
		else if(wh=='Weather36HourHealthCommand')lp="/outlook/health/general/local/";
		else if(wh=='Weather36HourPetsCommand')lp="/outlook/homeandgarden/pets/local/";
		document.location=WWW_host+lp+document.whatwhere.where.value+"?lswe="+document.whatwhere.lswe.value+"&lwsa="+document.whatwhere.lswa.value+"&from="+document.whatwhere.from.value;
		return false;
	}else{
		return true;
	}
}

function recognizeZipCode(search){
	filteredNumbers="1234567890";
	var i;
	var returnString="";
	for(i=0;i<search.length;i++){
		var c=search.charAt(i);
		for(j=0;j<filteredNumbers.length;j++){
			if(c==filteredNumbers.charAt(j))returnString+=c;
		}
	}
	if(returnString.length!=5){
		returnString=search;
	}
	return returnString;
}

function updateRecentSearch(where){
	getRecentSearch=getUserPreferences('27');
	if(getRecentSearch==''){
		setUserPreferences('27',where+':*:*');
	}else{
		alreadyExist=false;
		var splitUpSearches=getRecentSearch.split("^");
		for(var i=0;
		i<splitUpSearches.length;
		i++){
		var splitEachSearch=splitUpSearches[i].split(":");
		if(splitEachSearch[0]==where){
		alreadyExist=true;
		}
		}

		if(!alreadyExist){
			if(splitUpSearches.length==6){
				tempRecentSearch=getRecentSearch.split("^").splice(0,5);
				var buff="";
				for(var j=0;j<tempRecentSearch.length;j++){
					if(j==0){
						buff+=tempRecentSearch[j];
					}else{
						buff+="^"+tempRecentSearch[j];
					}
				}
				setUserPreferences('27',where+':*:*^'+buff);
			}else{
				setUserPreferences('27',where+':*:*^'+getRecentSearch);
			}
		}
	}
}

function buildLocator(URL,locator,preText,postText){
	if(postText==null||postText==undefined){
		postText="";
		if(preText==null||preText==undefined){
			preText="for";
			if(locator==null){
				locator="locator";
				if(URL==null){
					return false;
				}
			}
		}
	}
	if(getUserPreferences("11")&&getUserPreferences("11").length>1){
		thisUPLocID=getUserPreferences("11");
		thisUPPresName=thisUPLocID;
		thisUPLocType=getUserPreferences(22);
		if(thisUPLocType!="1"&&thisUPLocType!="4"){
			thisUPLocID=getUserPreferences(23);
			thisUPPresName=getUserPreferences(24);
		}else{
			if(getUserPreferences("10")){
				thisUPPresName=getUserPreferences("10");
			}
		}
		if(thisUPPresName&&thisUPPresName.length>1){
			document.write(preText+" <A HREF=\"#\" onClick=\"return smartTrack('"+URL+thisUPLocID+"','"+locator+"')\" >"+thisUPPresName+"</a> "+postText+" <B>or</B><br><br>\n");
		}
	}
}

function doIntercept(mapUrl,mapHandle,mapParams){
	if(!getUserPreferences("3")||getUserPreferences("3")==" "||getUserPreferences("3")=="null"||!getUserPreferences("4")||getUserPreferences("4")==" "||getUserPreferences("4")=="null"){
		mapWindowOpen(mapUrl,mapHandle,mapParams);
	}else{
		var vertLocation=mapUrl.split("?");
		var newLocation=vertLocation[1].split("&");
		var newLoc=unEscJava(newLocation[0]);
		if(newLocation[1])smartTrack((newLoc+"?"+newLocation[1]),'%ref%');
		else smartTrack(newLoc,'%ref%');
	}
	return false;
}

function getChannelPrefs(itemno){
	var getUP=GetCookie("ChannelPrefs");
	if(getUP.length>2){
		var splitUP=getUP.split("|");
		if(splitUP[itemno]){
			var myVal=unEscJava(splitUP[itemno]);
			return myVal;
		}else{
			return"";
		}
	}else{
		return"";
	}
}

function setUserPreferences(itemno,itemval){
	if(!isLocal)return false;
	var expdate=new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
	var getUP=GetCookie("UserPreferences");
	var splitUP=getUP.split("|");
	if(!splitUP[1]||(splitUP[1].length<1))splitUP[1]=" ";
	if(!splitUP[0]||splitUP[0]!=3){
		var defaultUP=new Array("3"," ","0","real","fast","-1","-1","-1","-1","-1"," "," "," "," "," ","-1","Undeclared"," "," "," "," ","hp","4"," "," "," ","");
		for(var i=0;i<defaultUP.length;i++)	{
			if(!splitUP[i]||(splitUP[i].length<1))splitUP[i]=defaultUP[i];
		}
		splitUP[0]=defaultUP[0];
	}
	var myVal=escape(itemval);
	splitUP[itemno]=myVal;
	var vertCookie=splitUP.join("|");
	SetCookie("UserPreferences",vertCookie,expdate,"/",".weather.com"); 
	return true;
}

function setAppPrefs(){
	if(!isLocal)return false;
	var expdate=new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
	var appsCookieVal = GetCookie("a");
	if (!appsCookieVal || appsCookieVal.length == 0) {
		var declaredApp;
		var wpath=window.location.pathname;
		if(wpath.indexOf("driving")!=-1){
			declaredApp = "traffic";
		} else if(wpath.indexOf("events/sports")!=-1 || wpath.indexOf("events/mlb")!=-1 
			|| wpath.indexOf("events/nfl")!=-1 || wpath.indexOf("events/college-football-weather")!=-1 
			|| wpath.indexOf("events/special")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("events/weddings")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("health/airquality")!=-1) {
			declaredApp = "";
		} else if(wpath.indexOf("health/achesandpains")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("health/allergies")!=-1){
			declaredApp = "pollen";
		} else if(wpath.indexOf("health/coldandflu")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("health/fitness")!=-1){
			declaredApp = "fitness";
		} else if(wpath.indexOf("health/skin")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("homeandgarden/garden")!=-1){
			declaredApp = "garden";
		} else if(wpath.indexOf("homeandgarden/home")!=-1){
			declaredApp = "home-imp";
		} else if(wpath.indexOf("homeandgarden/holidays")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("homeandgarden/pets")!=-1){
			declaredApp = "pet-care";
		} else if(wpath.indexOf("homeandgarden/schoolday")!=-1){
			declaredApp = "moms-planner";
		} else if(wpath.indexOf("recreation/boatandbeach")!=-1){
			declaredApp = "marine";
		} else if(wpath.indexOf("recreation/golf")!=-1){
			declaredApp = "golf";
		} else if(wpath.indexOf("recreation/outdoors")!=-1){
			declaredApp = "fishing";
		} else if(wpath.indexOf("recreation/ski")!=-1){
			declaredApp = "";
		} else if(wpath.indexOf("travel/businesstraveler")!=-1 ){
			declaredApp = "flight-status";
		} else if(wpath.indexOf("travel/vacationplanner")!=-1 || wpath.indexOf("travel/destination-guides")!=-1){
			declaredApp = "climate";
		} 
		if (declaredApp && declaredApp.length > 0) {	
			SetCookie("a",declaredApp,expdate,"/",".weather.com"); 
		}
	}

	
	return true;
}

function fixUserPreferences(){
	if(!isLocal)return false;
	var expdate=new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
	var getUP=GetCookie("UserPreferences");
	var splitUP=getUP.split("|");
	if(!splitUP[1])splitUP[1]=" ";
	else if(splitUP[1].length<1)splitUP[1]=" ";
	if(splitUP[16])splitUP.splice(16,1);
	var vertCookie=splitUP.join("|");
	SetCookie("UserPreferences",vertCookie,expdate,"/",".weather.com");
	return true;
}

function setChannelPrefs(itemno,itemval,itempath){
	if(!isLocal)return false;
	var expdate=new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
	var getUP=GetCookie("ChannelPrefs");
	var splitUP=getUP.split("|");
	for(var i=0;i<=8;i++){
		if(!splitUP[i]||(splitUP[i].length<1))splitUP[i]=-1;
	}
	splitUP[itemno]=itemval;
	var vertCookie=splitUP.join("|");
	SetCookie("ChannelPrefs",vertCookie,expdate,itempath,".weather.com");
	return true;
}

function updateCookieExpDate(cookieName){
	var expdate=new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
	var tempCookie=GetCookie(cookieName);
	if(tempCookie.length>0){
		SetExpDate(cookieName,tempCookie,expdate,"/",".weather.com");
	}
	return true;
}

function updateCookieUnescape(cookieName){
	var expdate=new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
	var tempCookie=GetCookie(cookieName);
	if(tempCookie.length>0){
		SetCookieUnescapeValue(cookieName,tempCookie,expdate,"/",".weather.com");
	}
	return true;
}

function DeleteCookie(name,path,domain){
	if(!isLocal)return false;
	if(GetCookie(name))document.cookie=name+"="+((path)?";path="+path:"")+((domain)?";domain="+domain:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function FixCookieDate(date){
	var base=new Date(0);
	var skew=base.getTime();
	if(skew>0)date.setTime(date.getTime()-skew);
}

function SetCookie(name,value,expires,path,domain,secure){
	if(!isLocal)return false;
	document.cookie=name+"="+escape(value)+((expires)?";expires="+expires.toGMTString():"")+((path)?";path="+path:"")+((domain)?";domain="+domain:"")+((secure)?";secure":"");
}

function SetCookieUnescapeValue(name,value,expires,path,domain,secure){
	if(!isLocal)return false;
	document.cookie=name+"="+unescape(value)+((expires)?"; expires="+expires.toGMTString():"")+((path)?"; path="+path:"")+((domain)?"; domain="+domain:"")+((secure)?"; secure":"");
}

function goWhatWhere(thisWhat){
	if(document.whatwhere.where.value==""){
		return true;
	}else{
		document.whatwhere.what.value=thisWhat;
		document.whatwhere.submit();
		return false;
	}
}

function mapSwap(url){
	if(url!=""){
		if(url=="special"){
			location.href="/maps/";
		}else{
			if(isMinIE4)document.all.mapI.src=url;
			if(isMinNS4)thisElement.src=url;
			if(isNS6)document.getElementById("mapI").src=url;
		}
	}
	return false;
}

function tdSwap(url){
	if(url!=""){
		if(isMinIE4)document.all.tdI.src=url;
		if(isMinNS4)thistdElement.src=url;
		if(isNS6)document.getElementById("tdI").src=url;
	}
	return false;
}

function mapWindowOpen(mapUrl,mapHandle,mapParams){
	var thisGuy=window.open(mapUrl,mapHandle,mapParams);
	if(isMinIE5||isNS6)thisGuy.focus();
	return false;
}

function imgReplace(imgName,newImgSrc){
	if(document.images)document.images[imgName].src=newImgSrc;
}

function goLocation(loc,trgt){
	if(loc!=null){
		if((loc.length>0)&&(loc.toLowerCase()!='default'))window.open(loc,trgt);
	}
}

function makeObjectNS4(){
	var ItemElement=new Layer(306);
	ItemElement.name="mapN";
	ItemElement.src=mapNURL;
	ItemElement.visibility="show";
	ItemElement.pageY=thisY;
	ItemElement.pageX=thisX;
	ItemElement.zIndex="300";
	return ItemElement;
}

function maketdObjectNS4(){
	var ItemtdElement=new Layer(306);
	ItemtdElement.name="tdN";
	ItemtdElement.src=tdNURL;
	ItemtdElement.visibility="show";
	ItemtdElement.pageY=thistdY;
	ItemtdElement.pageX=thistdX;
	ItemtdElement.zIndex="300";
	return ItemtdElement;
}

function loadTenday(){
	thistdX=document.tdholdspace.x;
	thistdY=document.tdholdspace.y;
	thistdElement=maketdObjectNS4();
}

  //WX258 changes - remove anything that has to do with sunsafety, achesandpains and health (general)
function changeCommandToVal(whatVal){
	if(whatVal=='Weather36HourAllergiesCommand')return'Allergies';
	else if(whatVal=='Weather36HourAirQualityCommand')return'AirQuality';
	else if(whatVal=='Weather36HourColdAndFluCommand')return'ColdAndFlu';
	else if(whatVal=='Weather36HourHomeCommand')return'HomePlanner';
	else if(whatVal=='Weather36HourGardenCommand')return'Lawn';
	else if(whatVal=='Weather36HourSchooldayCommand')return'Schoolday';
	else if(whatVal=='Weather36HourSportsCommand')return'SportingEvents';
	else if(whatVal=='Weather36HourWeddingCommand')return'Weddings';
	else if(whatVal=='Weather36HourInterstateCommand')return'Interstate';
	else if(whatVal=='Weather36HourBoatAndBeachCommand')return'BoatAndBeach';
	else if(whatVal=='Weather36HourGolfCommand')return'Golf';
	else if(whatVal=='Weather36HourSkiCommand')return'Ski';
	else if(whatVal=='Weather36HourBusinessTravelerCommand')return'BusinessTravel';
	else if(whatVal=='Weather36HourVacationPlannerCommand')return'VacationPlanner';
	else if(whatVal=='Weather36HourOutdoorsCommand')return'Outdoors';
	else if(whatVal=='Weather36HourFitnessCommand')return'Fitness';
	else if(whatVal=='Weather36HourPetsCommand')return'Pets';
	else if(whatVal=='WeatherLocalTravel')return'BusinessTravel';
	else if(whatVal=='WeatherLocalRecreation')return'Golf';
	else if(whatVal=='WeatherLocalHomeAndGarden')return'Lawn';
	else if(whatVal=='WeatherLocalDriving')return'Interstate';
	else return' ';
}
  //WX258 changes - remove anything that has to do with sunsafety, achesandpains and health (general)
function changeValToCommand(whatVal){
	if(whatVal=='Allergies')return'Weather36HourAllergiesCommand';
	else if(whatVal=='AirQuality')return'Weather36HourAirQualityCommand';	
	else if(whatVal=='ColdAndFlu')return'Weather36HourColdAndFluCommand';
	else if(whatVal=='HomePlanner')return'Weather36HourHomeCommand';
	else if(whatVal=='Lawn')return'Weather36HourGardenCommand';
	else if(whatVal=='Schoolday')return'Weather36HourSchoolDayCommand';
	else if(whatVal=='SportingEvents')return'Weather36HourSportsCommand';
	else if(whatVal=='Weddings')return'Weather36HourWeddingCommand';
	else if(whatVal=='Interstate')return'Weather36HourInterstateCommand';
	else if(whatVal=='BoatAndBeach')return'Weather36HourBoatAndBeachCommand';
	else if(whatVal=='Golf')return'Weather36HourGolfCommand';
	else if(whatVal=='Ski')return'Weather36HourSkiCommand';
	else if(whatVal=='BusinessTravel')return'Weather36HourBusinessTravelerCommand';
	else if(whatVal=='VacationPlanner')return'Weather36HourVacationPlannerCommand';
	else if(whatVal=='Outdoors')return'Weather36HourOutdoorsCommand';
	else if(whatVal=='NationalParks')return'Weather36HourOutdoorsCommand';
	else if(whatVal=='Fitness')return'Weather36HourFitnessCommand';
	else if(whatVal=='Pets')return'Weather36HourPetsCommand';	
	else if(whatVal=='Travel')return'Weather36HourBusinessTravelerCommand';
	else if(whatVal=='Recreation')return'Weather36HourGolfCommand';
	else if(whatVal=='HomeAndGarden')return'Weather36HourGardenCommand';
	else if(whatVal=='Driving')return'Weather36HourInterstateCommand';
	else return'WeatherLocalUndeclared';
}


function newWindowFocus(url,wid,hei){
	mapWindowOpen(url,'nwin',"resizable=yes,toolbar=yes,status=yes,scrollbars=yes,location=yes,menubar=yes,directories=yes,width="+wid+",height="+hei);
}

function addEvent(objObject,strEventName,fnHandler){
	if(objObject.addEventListener)
	objObject.addEventListener(strEventName,fnHandler,false);
	else if(objObject.attachEvent)
	objObject.attachEvent("on"+strEventName,fnHandler);
}

function customHugMe(){
	if(!isLocal)return;
	var WWW_host=window.location.hostname;
	var gotMyPrefs=GetCookie("MyPrefs");
	if(WWW_host!='delta.weather.com'&&WWW_host!='w3.weather.com'&&WWW_host!='beta.weather.com')WWW_host='www.weather.com';
	WWW_host='http://'+WWW_host;
	var thisDay=new Date();
	if(getUserPreferences("11")&&getUserPreferences("11").length>1){
		thisUPLocID=getUserPreferences("11");
		if(getUserPreferences("10")&&getUserPreferences("10").length>1){
			thisUPPresName=getUserPreferences("10");
		}else{
			thisUPPresName=thisUPLocID;
		}

		var thisUPURL="/weather/today/";//WX258 changes
		var promoText="Local Forecast for ";
		if(getUserPreferences("16")&&getUserPreferences("16").length>1){
        //WX258 changes - remove anything that has to do with sunsafety, achesandpains and health (general)
			var gup=getUserPreferences("16");
			if(gup=='Allergies'){
			thisUPURL="/outlook/health/allergies/local/";
			}else if(gup=='AirQuality'){
			thisUPURL="/outlook/health/airquality/local/";
			}else if(gup=='ColdAndFlu'){
			thisUPURL="/outlook/health/coldandflu/local/";
			}else if(gup=='Golf'){
			thisUPURL="/outlook/recreation/golf/local/";
			}else if(gup=='Ski'){
			thisUPURL="/outlook/recreation/ski/local/";
			}else if(gup=='BoatAndBeach'){
			thisUPURL="/outlook/recreation/boatandbeach/local/";
			}else if(gup=='Outdoors'){
			thisUPURL="/outlook/recreation/outdoors/local/";
			}else if(gup=='NationalParks'){
			thisUPURL="/outlook/recreation/outdoors/local/";
			}else if(gup=='BusinessTravel'){
			thisUPURL="/outlook/travel/businesstraveler/local/";
			}else if(gup=='VacationPlanner'){
			thisUPURL="/outlook/travel/vacationplanner/local/";
			}else if(gup=='HomePlanner'){
			thisUPURL="/outlook/homeandgarden/home/local/";
			}else if(gup=='Lawn'){
			thisUPURL="/outlook/homeandgarden/garden/local/";
			}else if(gup=='Schoolday'){
			thisUPURL="/outlook/homeandgarden/schoolday/local/";
			}else if(gup=='SportingEvents'){
			thisUPURL="/outlook/events/sports/local/";
			}else if(gup=='Weddings'){
			thisUPURL="/outlook/events/weddings/local/";
			}else if(gup=='Interstate'){
			thisUPURL="/outlook/driving/interstate/local/";
			}else if(gup=='Fitness'){
			thisUPURL="/outlook/health/fitness/local/";
			}else if(gup=='Pets'){
			thisUPURL="/outlook/homeandgarden/pets/local/";
			}else if(gup=='Travel'){
			thisUPURL="/outlook/travel/businesstraveler/local/";
			setUserPreferences('16','BusinessTravel');
			}else if(gup=='Recreation'){
			thisUPURL="/outlook/recreation/golf/local/";
			setUserPreferences('16','Golf');
			}else if(gup=='HomeAndGarden'){
			thisUPURL="/outlook/homeandgarden/garden/local/";
			setUserPreferences('16','Lawn');
			}else if(gup=='Driving'){
			thisUPURL="/outlook/driving/interstate/local/";
			setUserPreferences('16','Interstate');
			}
		}

		document.write("<FONT CLASS=\"captionText\"><A HREF=\""+WWW_host+thisUPURL+thisUPLocID+"?from=zipcode"+"\" CLASS=\"whiteVerdanaLink11\">"+promoText+"<BR>"+thisUPPresName+"</A></FONT>");
	}else if(gotMyPrefs.length>1){
		var myPageURL="/weather/my/";
		var promoText="View My Page";
		document.write("<A HREF=\""+WWW_host+myPageURL+"?from=zipcode"+"\" CLASS=\"whiteVerdanaLink11\">"+promoText+"</A></FONT>");
	}else{
		document.write("<A HREF=\""+WWW_host+"/weather/my/signup?from=zipcode\" CLASS=\"whiteVerdanaLink11\">Customize weather.com</A>");
	}
}

function hatInfo(){
	if(!isLocal)return;
	var WWW_host=window.location.hostname;
	var PROFILE_URL="https://registration.weather.com/registration/myprofile/step1?from=hat_name&refer=hat_name";
	var getTicketWeb=GetCookie("Ticket_web");
	var gotMyPrefs=GetCookie("MyPrefs");
	if(WWW_host!='delta.weather.com'&&WWW_host!='w3.weather.com'&&WWW_host!='beta.weather.com')WWW_host='www.weather.com';
	WWW_host='http://'+WWW_host;
	var thisDay=new Date();
	var greetString="";
	if(getUserPreferences("12")){
		thisUPName=getUserPreferences("12");
		if(thisUPName.indexOf("@")!=-1&&thisUPName.indexOf(".")!=-1){
			thisUPName="";
		}else{
			if(thisUPName.length>8){
				thisUPName=thisUPName.substr(0,5)+"...";
			}
		}
	}else{
		thisUPName="";
	}

	greetString="Welcome";
	var isIE5Check=(document.getElementById&&document.all)?1:0;
	if(isIE5Check){
		document.write("<div id=\"hatMakeHome\">");
		document.write("<style>#hbHWelcome{left:11px;width:200px;text-align:left;}</style>");
		document.write("");
		document.write("</div>");
	}else{
		if(thisUPName!=""&&gotUrs==1||thisUPName!=""&&gotTicketWeb.length>1){
			document.write(greetString+", <A HREF="+PROFILE_URL+">"+thisUPName+"</A>.");
		}
		else{
			document.write(greetString+".");
		}
	}
}

function searchTermType(){
	var locIdCheck=/^[A-Z]{4}\d{4}$/g;
	var zipCodeCheck=/^\d+$/g;
	var searchTermObject=window.location.pathname.split("/");
	var searchTermLocID=searchTermObject[searchTermObject.length-1];
	if(searchTermLocID.indexOf(":")!=-1){
		var searchTermLocType=searchTermLocID.split(":");
		if(searchTermLocType[searchTermLocType.length-1]=='5')return'golf';
		else if(searchTermLocType[searchTermLocType.length-1]=='9')return'airport';
		else if(searchTermLocType[searchTermLocType.length-1]=='11')return'ski';
		else if(searchTermLocType[searchTermLocType.length-1]=='16')return'street';
		else if(searchTermLocType[searchTermLocType.length-1]=='17')return'school';
		else if(searchTermLocType[searchTermLocType.length-1]=='19')return'park';
		else if(searchTermLocType[searchTermLocType.length-1]=='20')return'venue';
	}else if(searchTermLocID.match(locIdCheck)){
		return'city';
	}else if(searchTermLocID.match(zipCodeCheck)){
		return'zip';
	}else{
		return'';
	}
}

function openvideoplayer(parms,player,dim,lid){
	var thisGuy;
	var isPop_up=true;
	if(isPop_up){
		thisGuy=window.open("/multimedia/videoplayer.html?"+parms,player,dim,lid);
		if(isMinIE5||isNS6)thisGuy.focus();
	}else{
		window.location.href="/multimedia/videoplayer.html?"+parms;
	}
	return false;
}

function openVideoPlayer(parms){
	var thisGuy;
	var isPop_up=true;
	if(isPop_up){
		thisGuy=window.open("/multimedia/videoplayer.html?"+parms,'player','width=1000,height=677,nostatus','lid2');
		if(isMinIE5||isNS6)thisGuy.focus();
	}else{
		if(self.parent.frames.length!=0)self.parent.location="/multimedia/videoplayer.html?"+parms;
		else window.location="/multimedia/videoplayer.html?"+parms;
	}
	return false;
}

var declInput;//var for UP16 and later for local storage use.

setUserPreferences('0','3');
var hmp=getUserPreferences('26');
hmp=hmp.replace(/\&quot\;/g,'');
hmp=hmp.replace(/\"/g,'');
hmp=hmp.replace(/\\/g,'');
setUserPreferences('26',hmp);
if(getUserPreferences("26").length<1){
  //WX258 changes - remove anything that has to do with sunsafety, achesandpains and health (general)
  	var wpath=window.location.pathname;
  	
  	var setUP16 = false;
		if(wpath.indexOf("health/airquality")!=-1){
			declInput = "AirQuality";
		}
	
		else if(wpath.indexOf("health/skin")!=-1){
			declInput = "SunSafety";
		}
		
		else if(wpath.indexOf("health/achesandpains")!=-1){
			declInput = "AchesAndPains";
		}
	
		else if(wpath.indexOf("health/allergies")!=-1){
			declInput = "Allergies";
		}
	
		else if(wpath.indexOf("recreation/boatandbeach")!=-1){
			declInput = "BoatAndBeach";
		}
	
		else if(wpath.indexOf("travel/businesstraveler")!=-1 ){
			declInput = "BusinessTravel";
		}
	
		else if(wpath.indexOf("health/coldandflu")!=-1){
			declInput = "ColdAndFlu";
		}
	
		else if(wpath.indexOf("driving")!=-1){
			declInput = "Driving";
		}
	
		else if(wpath.indexOf("health/fitness")!=-1){
			declInput = "Fitness";
		}
	
		else if(wpath.indexOf("recreation/golf")!=-1){
			declInput = "Golf";
		}
	
		else if(wpath.indexOf("homeandgarden/home")!=-1 || wpath.indexOf("homeandgarden/holidays")!=-1){
			declInput = "HomePlanner";
		}
	
		else if(wpath.indexOf("homeandgarden/garden")!=-1){
			declInput = "Lawn";
		}
	
		else if(wpath.indexOf("recreation/outdoors")!=-1){
			declInput = "Outdoors";
		}
	
		else if(wpath.indexOf("homeandgarden/pets")!=-1){
			declInput = "Pets";
		}
	
		else if(wpath.indexOf("homeandgarden/schoolday")!=-1){
			declInput = "Schoolday";
		}
	
		else if(wpath.indexOf("recreation/ski")!=-1){
			declInput="Ski";
		}
	
		else if(wpath.indexOf("events/sports")!=-1 || wpath.indexOf("events/mlb")!=-1 || wpath.indexOf("events/nfl")!=-1 || wpath.indexOf("events/college-football-weather")!=-1 || wpath.indexOf("events/special")!=-1){
			declInput="SportingEvents";
			
		}
	
		else if(wpath.indexOf("travel/vacationplanner")!=-1 || wpath.indexOf("travel/destination-guides")!=-1){
			declInput="VacationPlanner";
			
		}
	
		else if(wpath.indexOf("events/weddings")!=-1){
			declInput="Weddings";
			
		}
		
		//if (setUP16 == true)setUserPreferences("16", declInput);
	
		
}

//setAppPrefs();//remove for lsr project RTOY

function stringFilterChecker(s){
	filteredValues="*|/\":<>[]{}`\;()@&$#%";
	var i;
	var returnString="";
	for(i=0;i<s.length;i++){
		var c=s.charAt(i);
		if(filteredValues.indexOf(c)==-1)returnString+=c;
	}
	while(returnString.substring(0,1)==' ')
	returnString=returnString.substring(1,returnString.length);
	while(returnString.substring(returnString.length-1,returnString.length)==' ')
	returnString=returnString.substring(0,returnString.length-1);
	return returnString;
}

function analyticus(domainValue,productId){
	var protocol="http://";
	var domain=(domainValue==null||domainValue=="")?"":domainValue;
	var productID=(productId==null||productId=="")?"":"/"+productId;
	var actionID="";
	var cacheBuster="?cb="+new Date().getTime();
	var baseURLQryString=(window.location.search.length>0)?"&"+window.location.search.substring(1):"";
	function writeToServer(argActionID){
		if(productID==""||domain=="")return;
		actionID=(argActionID==null||argActionID=="")?"":"/"+argActionID;
		document.write('<img src="'+protocol+domain+productID+actionID+cacheBuster+baseURLQryString+'" width="1" height="1" />');
	}
	this.logAction=function(actionID){
		writeToServer(actionID);
	};
}

function placeSWFobject(swfURL,swfID,width,height,flashvars,params,bgc,attr,flashversion){
	var _bgc=(typeof bgc!="undefined"&&bgc!=null)?bgc:"#FFFFFF";
	var _params={	"swliveconnect":"true","allowScriptAccess":"always","bgcolor":_bgc}	;
	if(typeof params!="undefined"&&params!=null){
		_params=params;
		_params["bgcolor"]=_bgc;
	}
	var _attr={"id":swfID,"name":swfID};
	if(typeof attr!="undefined"&&attr!=null){
		_attr=attr;
	}
	var _flashversion=(typeof flashversion!="undefined"&&flashversion!=null)?flashversion:"9";
	if(!document.getElementById(swfID)){
		alert("There is no object with id = "+swfID);
		return;
	}
	swfobject.embedSWF(swfURL,swfID,width,height,_flashversion,"http://f.imwx.com/global/web/expressInstall.swf",flashvars,_params,_attr);
}

function getFlashVarTag(url,width,height,id,flashvars,bgcolor,params,flashversion){
	var fv=(typeof flashversion!="undefined")?flashversion:"9.0.0";
	var newTarget=id+'_container';
	document.write('<div id="'+newTarget+'"></div>');
	var bgc=(bgcolor&&bgcolor!="")?bgcolor:'#FFFFFF';
	var _flashvars={};
	var flashvars=flashvars.split('&');
	for(var i=0;i<flashvars.length;i++){
		var test4XML=flashvars[i].match(/=/g);
		if(test4XML!=null&&test4XML!=""&&test4XML.length>1){
			var paramname=flashvars[i].substr(0,flashvars[i].indexOf("="));
			var paramvalue=flashvars[i].substr(flashvars[i].indexOf("=")+1);
			_flashvars[paramname]=paramvalue;
		}else{
			var pS=flashvars[i].split('=');
			_flashvars[pS[0]]=pS[1];
		}
	}
	var _params={"swliveconnect":"true","allowScriptAccess":"always","bgcolor":bgc};
	if(typeof params!="undefined"&&params!=null){
		var params=params.split('&');
		for(var i=0;i<params.length;i++){
			var pA=params[i].split('=');
			_params[pA[0]]=pA[1];
		}
	}
	swfobject.embedSWF(url,newTarget,width,height,fv,"http://f.imwx.com/global/web/expressInstall.swf",_flashvars,_params,{"id":id,"name":id});
}

var timerRunning=false;
function findPosX(obj){
	var curleft=0;
	if(isNS6||isMinIE4){
		if(obj.offsetParent){
			while(obj.offsetParent){
				curleft+=obj.offsetLeft
				obj=obj.offsetParent;
			}
		}
	}else if(isMinNS4)curleft+=obj.x;
	return curleft;
}

function findPosY(obj){
	var curtop=0;
	if(isNS6||isMinIE4){
		if(obj.offsetParent){
			while(obj.offsetParent){
				curtop+=obj.offsetTop
				obj=obj.offsetParent;
			}
		}
	}else if(isMinNS4)curtop+=obj.y;
	return curtop;
}

function showImgX(imgName){
	if(isMinNS4){
		return document.images[imgName].x;
	}else if(isMinIE4){
		return findPosX(document.all[imgName]);
	}else if(isNS6){
		return findPosX(document.getElementById(imgName));
	}
}

function showImgY(imgName){
	if(isMinNS4){
		return document.images[imgName].y;
	}else if(isMinIE4){
		return findPosY(document.all[imgName]);
	}else if(isNS6){
		return findPosY(document.getElementById(imgName));
	}
}

function showDivX(divName){
	if(isMinNS4){
		return document.layers[divName].pageX;
	}else if(isMinIE4){
		return document.all[divName].style.left.replace(/px/,'');
	}else if(isNS6){
		return parseInt(document.getElementById(divName).style.left);
	}
}

function showDivY(divName){
	if(isMinNS4){
		return document.layers[divName].clip.width;
	}else if(isMinIE4){
		return document.all[divName].style.top.replace(/px/,'');
	}else if(isNS6){
		return parseInt(document.getElementById(divName).style.top);
	}
}

function moveDiv(divName,anchorName,osX,osY){
	if(isMinNS4){
		xposition=(anchorName!='null')?document.images[anchorName].x:0;
		yposition=(anchorName!='null')?document.images[anchorName].y:0;
		xPoint=(osX)?xposition+osX:xposition;
		yPoint=(osY)?yposition+osY:yposition;
		document.layers[divName].pageX=xPoint+'px';
		document.layers[divName].pageY=yPoint+'px';
		document.layers[divName].visibility="show";
	}else if(isMinIE4){
		var over=document.all[divName];
		xposition=(anchorName!='null')?findPosX(document.all[anchorName]):0;
		yposition=(anchorName!='null')?findPosY(document.all[anchorName]):0;
		xPoint=(osX)?xposition+osX:xposition;
		yPoint=(osY)?yposition+osY:yposition;
		over.style.left=xPoint+'px';
		over.style.top=yPoint+'px';
		over.style.visibility="visible";
	}else if(isNS6){
		var over=document.getElementById(divName);
		xposition=(anchorName!='null')?findPosX(document.getElementById(anchorName)):0;
		yposition=(anchorName!='null')?findPosY(document.getElementById(anchorName)):0;
		xPoint=(osX)?xposition+osX:xposition;
		yPoint=(osY)?yposition+osY:yposition;
		over.style.left=xPoint+'px';
		over.style.top=yPoint+'px';
		over.style.visibility="visible";
	}
}
function writeDiv(divName,divContent){
	if(document.getElementById(divName) != null) {
		if(isMinNS4){
			document.layers[divName].document.write(divContent);
			document.layers[divName].document.close();
		}else if(isMinIE4){
			document.all[divName].innerHTML=divContent;
		}else if(isNS6){
			document.getElementById(divName).innerHTML=divContent;
		}
	}
}

function clipDiv(divName,clipTop,clipRight,clipBottom,clipLeft){
	if(isMinNS4){
		document.layers[divName].clip.left=clipLeft;
		document.layers[divName].clip.right=clipRight;
		document.layers[divName].clip.top=clipTop;
		document.layers[divName].clip.bottom=clipBottom;
	}else if(isMinIE4){
		document.all[divName].style.clip="rect("+clipTop+"px "+clipRight+"px "+clipBottom+"px "+clipLeft+"px)";
	}else if(isNS6){
		document.getElementById(divName).style.clip="rect("+clipTop+"px "+clipRight+"px "+clipBottom+"px "+clipLeft+"px)";
	}
}

function hideDiv(divName){
	if(isMinNS4){
		document.layers[divName].visibility="hide";
	}else if(isMinIE4){
		document.all[divName].style.visibility="hidden";
	}else if(isNS6){
		document.getElementById(divName).style.visibility="hidden";
	}
}

function showDiv(divName){
	if(isMinNS4){
		document.layers[divName].visibility="show";
	}else if(isMinIE4){
		document.all[divName].style.visibility="visible";
	}else if(isNS6){
		document.getElementById(divName).style.visibility="visible";
	}
}

function stopSlide(){
	if(timerRunning)clearInterval(timerID);
	timerRunning=false;
}

function startSlide(slideDiv,slideX,slideY,slideUnits,slideInt){
	stopSlide();
	timerRunning=true;
	xDone=false;
	yDone=false;
	var thisX=(slideX=='null')?showDivX(slideDiv):slideX;
	var thisY=(slideY=='null')?showDivY(slideDiv):slideY;
	slideFunc="slideDiv('"+slideDiv+"',"+thisX+","+thisY+","+slideUnits+")";
	timerID=setInterval(slideFunc,slideInt);
}

function readDiv(divName){
	if(isMinIE4&&document.all[divName])return document.all[divName].innerHTML;
	else if(isNS6&&document.getElementById(divName))return document.getElementById(divName).innerHTML;
	else return'';
}

function slideDiv(slideDivName,destX,destY,moveUnits){
	var yDone=false;
	var xDone=false;
	var divX=parseInt(showDivX(slideDivName));
	var divY=parseInt(showDivY(slideDivName));
	if(divX==destX||((divX<destX)&&(divX+moveUnits>=destX))||((divX>destX)&&(divX-moveUnits<=destX))){
		xDone=true;
		divX=parseInt(destX);
	}else if((divX+moveUnits)>destX){
		divX-=moveUnits;
	}else{
		divX+=moveUnits;
	}

	if(divY==destY||((divY<destY)&&(divY+moveUnits>=destY))||((divY>destY)&&(divY-moveUnits<=destY))){
		yDone=true;
		divY=parseInt(destY);
	}else if((divY+moveUnits)>destY){
		divY-=moveUnits;
	}else{
		divY+=moveUnits;
	}

	moveDiv(slideDivName,'null',divX,divY);
	if(xDone&&yDone){
		stopSlide();
	}
}

function stringFilter(input){
	s=input.value;
	filteredValues="*|/\":<>[]{}`\;()@&$#%";
	var i;
	var returnString="";
	for(i=0;i<s.length;i++){
		var c=s.charAt(i);
		if(filteredValues.indexOf(c)==-1)returnString+=c;
	}
	input.value=returnString;
}

var myHugRSSURL="http://rss.weather.com/weather/rss/local/";
var titleVal="The Weather Channel: Local Weather Outlook [RSS] for ";
var linkElement="<LINK REL=\"alternate\" TYPE=\"application/rss+xml\" TITLE=\"";
var hugmeLocationType='22';
var hugmeLocationZip='23';
var hugmeLocationZipPresentationName='24'
var favLocID='11';
var favLocPresName='10';
var urlTrackingStr="?cm_ven=LWO&cm_cat=rss&par=LWO_rss";
try{
	var hugmeLocationTypeVal=getUserPreferences(hugmeLocationType);
	if(hugmeLocationTypeVal!="1"&&hugmeLocationTypeVal!="4"){
		myHugRSSURL+=getUserPreferences(hugmeLocationZip)+urlTrackingStr;
		titleVal+=getUserPreferences(hugmeLocationZipPresentationName);
	}else{
		myHugRSSURL+=getUserPreferences(favLocID)+urlTrackingStr;
		titleVal+=getUserPreferences(favLocPresName);
	}

	linkElement+=titleVal+'" HREF="'+myHugRSSURL+'">';
	if(getUserPreferences(hugmeLocationZip)!=" "){
		document.write(linkElement);
	}
}catch(err){
	var errorVal=err.toString();
}

/*
*	PutScript added 11/30/09
*	BZ 28466
*/
function putScript(earl,fragment) {
                var head = document.getElementsByTagName('head')[0];
                var script = document.getElementById(fragment + '_targetReq');
                if (script) {
                                head.removeChild(script);
                                delete script;
                }
                script = document.createElement('script');
                script.id = [fragment,'_targetReq'].join('');
                script.type = 'text/javascript';
                script.src = [earl];
                head.appendChild(script);
}

if(typeof wxtools=="undefined")wxtools={};
if(typeof wxtools.events=="undefined")wxtools.events={};
wxtools.events.docSizeChange = new YAHOO.util.CustomEvent("docSizeChange");

//SET up local storage for hard Declarations
var appsToHardDeclarations = {
		"achesandpains":"aches",
		"airquality":"airq",
		"allergies":"algy",
		"boatandbeach":"bnb",
		"businesstravel":"btrav",
		"climate":"clim",
		"coldandflu":"cold",
		"driving":"driv",
		"events":"undc",
		"fishing":"fish",
		"fitness":"fit",
		"flightstatus":"flt",
		"garden":"gdn",
		"golf":"golf",
		"health":"hlth",
		"home":"home",
		"homeimp":"himp",
		"homeplanner":"hmpl",
		"lawn":"lawn",
		"livingsmart":"live",
		"marine":"mar",
		"momsplanner":"mp",
		"news":"news",
		"outdooractivity":"odact",
		"outdoors":"outd",
		"petcare":"pcare",
		"pets":"pets",
		"pollen":"plln",
		"schoolday":"schd",
		"ski":"ski",
		"sportingevents":"undc",
		"sports":"spts",
		"sunsafety":"sun",
		"traffic":"traff",
		"travel":"trvl",
		"vacationplanner":"vac",
		"weddings":"wed",
//		"undeclared":"undc",
		"flight-status":"flt",
        "traffic":"traff",
        "fitness":"fit",
        "golf":"golf",
        "home-imp":"himp",
        "pet-care":"pcare",
        "moms-planner":"mp"
       };
