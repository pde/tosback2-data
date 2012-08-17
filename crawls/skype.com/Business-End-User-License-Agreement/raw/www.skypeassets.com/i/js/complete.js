/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
if(typeof YAHOO=="undefined"){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang={isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice)&&!A.hasOwnProperty(B.length);}return false;},isBoolean:function(A){return typeof A==="boolean";},isFunction:function(A){return typeof A==="function";},isNull:function(A){return A===null;},isNumber:function(A){return typeof A==="number"&&isFinite(A);},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false;},isString:function(A){return typeof A==="string";},isUndefined:function(A){return typeof A==="undefined";},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B);}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B];},_IEEnumFix:function(C,B){if(YAHOO.env.ua.ie){var E=["toString","valueOf"],A;for(A=0;A<E.length;A=A+1){var F=E[A],D=B[F];if(YAHOO.lang.isFunction(D)&&D!=Object.prototype[F]){C[F]=D;}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E;}if(C){for(var A in C){D.prototype[A]=C[A];}YAHOO.lang._IEEnumFix(D.prototype,C);}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.");}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]];}}else{for(F in D){if(B||!E[F]){E[F]=D[F];}}YAHOO.lang._IEEnumFix(E,D);}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.");}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B]);}YAHOO.lang.augmentObject.apply(this,A);},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)){return A+"";}else{if(A instanceof Date||("nodeType" in A&&"tagName" in A)){return A;}else{if(C.isFunction(A)){return B;}}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}if(I.length>1){I.pop();}I.push("]");}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}}if(I.length>1){I.pop();}I.push("}");}return I.join("");},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break;}F=Q.indexOf(O,G);if(G+1>=F){break;}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E);}N=B[M];if(J){N=J(M,N,P);}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10));}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4);}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10));}else{N=N.toString();}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C;}}Q=Q.substring(0,G)+N+Q.substring(F+1);}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g");}return Q;},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"");}catch(B){return A;}},merge:function(){var C={},A=arguments,B;for(B=0;B<A.length;B=B+1){YAHOO.lang.augmentObject(C,A[B],true);}return C;},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.1",build:"541"});(function(){var B=YAHOO.util,K,I,H=0,J={},F={};var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var M=function(O){if(!E.HYPHEN.test(O)){return O;}if(J[O]){return J[O];}var P=O;while(E.HYPHEN.exec(P)){P=P.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[O]=P;return P;};var N=function(P){var O=F[P];if(!O){O=new RegExp("(?:^|\\s+)"+P+"(?:\\s+|$)");F[P]=O;}return O;};if(document.defaultView&&document.defaultView.getComputedStyle){K=function(O,R){var Q=null;if(R=="float"){R="cssFloat";}var P=document.defaultView.getComputedStyle(O,"");if(P){Q=P[M(R)];}return O.style[R]||Q;};}else{if(document.documentElement.currentStyle&&G){K=function(O,Q){switch(M(Q)){case"opacity":var S=100;try{S=O.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(R){try{S=O.filters("alpha").opacity;}catch(R){}}return S/100;case"float":Q="styleFloat";default:var P=O.currentStyle?O.currentStyle[Q]:null;return(O.style[Q]||P);}};}else{K=function(O,P){return O.style[P];};}}if(G){I=function(O,P,Q){switch(P){case"opacity":if(YAHOO.lang.isString(O.style.filter)){O.style.filter="alpha(opacity="+Q*100+")";if(!O.currentStyle||!O.currentStyle.hasLayout){O.style.zoom=1;}}break;case"float":P="styleFloat";default:O.style[P]=Q;}};}else{I=function(O,P,Q){if(P=="float"){P="cssFloat";}O.style[P]=Q;};}var D=function(O,P){return O&&O.nodeType==1&&(!P||P(O));};YAHOO.util.Dom={get:function(Q){if(Q&&(Q.tagName||Q.item)){return Q;}if(YAHOO.lang.isString(Q)||!Q){return document.getElementById(Q);}if(Q.length!==undefined){var R=[];for(var P=0,O=Q.length;P<O;++P){R[R.length]=B.Dom.get(Q[P]);}return R;}return Q;},getStyle:function(O,Q){Q=M(Q);var P=function(R){return K(R,Q);};return B.Dom.batch(O,P,B.Dom,true);},setStyle:function(O,Q,R){Q=M(Q);var P=function(S){I(S,Q,R);};B.Dom.batch(O,P,B.Dom,true);},getXY:function(O){var P=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=document.body){return false;}var Q=null;var V=[];var S;var T=R.ownerDocument;if(R.getBoundingClientRect){S=R.getBoundingClientRect();return[S.left+B.Dom.getDocumentScrollLeft(R.ownerDocument),S.top+B.Dom.getDocumentScrollTop(R.ownerDocument)];}else{V=[R.offsetLeft,R.offsetTop];Q=R.offsetParent;var U=this.getStyle(R,"position")=="absolute";if(Q!=R){while(Q){V[0]+=Q.offsetLeft;V[1]+=Q.offsetTop;if(L&&!U&&this.getStyle(Q,"position")=="absolute"){U=true;}Q=Q.offsetParent;}}if(L&&U){V[0]-=R.ownerDocument.body.offsetLeft;V[1]-=R.ownerDocument.body.offsetTop;}}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(B.Dom.getStyle(Q,"display").search(/^inline|table-row.*$/i)){V[0]-=Q.scrollLeft;V[1]-=Q.scrollTop;}Q=Q.parentNode;}return V;};return B.Dom.batch(O,P,B.Dom,true);},getX:function(O){var P=function(Q){return B.Dom.getXY(Q)[0];};return B.Dom.batch(O,P,B.Dom,true);},getY:function(O){var P=function(Q){return B.Dom.getXY(Q)[1];};return B.Dom.batch(O,P,B.Dom,true);},setXY:function(O,R,Q){var P=function(U){var T=this.getStyle(U,"position");if(T=="static"){this.setStyle(U,"position","relative");T="relative";}var W=this.getXY(U);if(W===false){return false;}var V=[parseInt(this.getStyle(U,"left"),10),parseInt(this.getStyle(U,"top"),10)];if(isNaN(V[0])){V[0]=(T=="relative")?0:U.offsetLeft;}if(isNaN(V[1])){V[1]=(T=="relative")?0:U.offsetTop;}if(R[0]!==null){U.style.left=R[0]-W[0]+V[0]+"px";}if(R[1]!==null){U.style.top=R[1]-W[1]+V[1]+"px";}if(!Q){var S=this.getXY(U);if((R[0]!==null&&S[0]!=R[0])||(R[1]!==null&&S[1]!=R[1])){this.setXY(U,R,true);}}};B.Dom.batch(O,P,B.Dom,true);},setX:function(P,O){B.Dom.setXY(P,[O,null]);},setY:function(O,P){B.Dom.setXY(O,[null,P]);},getRegion:function(O){var P=function(Q){if((Q.parentNode===null||Q.offsetParent===null||this.getStyle(Q,"display")=="none")&&Q!=document.body){return false;}var R=B.Region.getRegion(Q);return R;};return B.Dom.batch(O,P,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(S,W,T,U){W=W||"*";T=(T)?B.Dom.get(T):null||document;if(!T){return[];}var P=[],O=T.getElementsByTagName(W),V=N(S);for(var Q=0,R=O.length;Q<R;++Q){if(V.test(O[Q].className)){P[P.length]=O[Q];if(U){U.call(O[Q],O[Q]);}}}return P;},hasClass:function(Q,P){var O=N(P);var R=function(S){return O.test(S.className);};return B.Dom.batch(Q,R,B.Dom,true);},addClass:function(P,O){var Q=function(R){if(this.hasClass(R,O)){return false;}R.className=YAHOO.lang.trim([R.className,O].join(" "));return true;};return B.Dom.batch(P,Q,B.Dom,true);},removeClass:function(Q,P){var O=N(P);var R=function(S){if(!this.hasClass(S,P)){return false;}var T=S.className;S.className=T.replace(O," ");if(this.hasClass(S,P)){this.removeClass(S,P);}S.className=YAHOO.lang.trim(S.className);return true;};return B.Dom.batch(Q,R,B.Dom,true);},replaceClass:function(R,P,O){if(!O||P===O){return false;}var Q=N(P);var S=function(T){if(!this.hasClass(T,P)){this.addClass(T,O);return true;}T.className=T.className.replace(Q," "+O+" ");if(this.hasClass(T,P)){this.replaceClass(T,P,O);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},generateId:function(O,Q){Q=Q||"yui-gen";var P=function(R){if(R&&R.id){return R.id;}var S=Q+H++;if(R){R.id=S;}return S;};return B.Dom.batch(O,P,B.Dom,true)||P.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);if(!P||!Q){return false;}var O=function(R){if(P.contains&&R.nodeType&&!L){return P.contains(R);}else{if(P.compareDocumentPosition&&R.nodeType){return !!(P.compareDocumentPosition(R)&16);}else{if(R.nodeType){return !!this.getAncestorBy(R,function(S){return S==P;});}}}return false;};return B.Dom.batch(Q,O,B.Dom,true);},inDocument:function(O){var P=function(Q){if(L){while(Q=Q.parentNode){if(Q==document.documentElement){return true;}}return false;}return this.isAncestor(document.documentElement,Q);};return B.Dom.batch(O,P,B.Dom,true);},getElementsBy:function(V,P,Q,S){P=P||"*";
Q=(Q)?B.Dom.get(Q):null||document;if(!Q){return[];}var R=[],U=Q.getElementsByTagName(P);for(var T=0,O=U.length;T<O;++T){if(V(U[T])){R[R.length]=U[T];if(S){S(U[T]);}}}return R;},batch:function(S,V,U,Q){S=(S&&(S.tagName||S.item))?S:B.Dom.get(S);if(!S||!V){return false;}var R=(Q)?U:window;if(S.tagName||S.length===undefined){return V.call(R,S,U);}var T=[];for(var P=0,O=S.length;P<O;++P){T[T.length]=V.call(R,S[P],U);}return T;},getDocumentHeight:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;var O=Math.max(P,B.Dom.getViewportHeight());return O;},getDocumentWidth:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;var O=Math.max(P,B.Dom.getViewportWidth());return O;},getViewportHeight:function(){var O=self.innerHeight;var P=document.compatMode;if((P||G)&&!C){O=(P=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;}return O;},getViewportWidth:function(){var O=self.innerWidth;var P=document.compatMode;if(P||G){O=(P=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth;}return O;},getAncestorBy:function(O,P){while(O=O.parentNode){if(D(O,P)){return O;}}return null;},getAncestorByClassName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return B.Dom.hasClass(R,O);};return B.Dom.getAncestorBy(P,Q);},getAncestorByTagName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return R.tagName&&R.tagName.toUpperCase()==O.toUpperCase();};return B.Dom.getAncestorBy(P,Q);},getPreviousSiblingBy:function(O,P){while(O){O=O.previousSibling;if(D(O,P)){return O;}}return null;},getPreviousSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getPreviousSiblingBy(O);},getNextSiblingBy:function(O,P){while(O){O=O.nextSibling;if(D(O,P)){return O;}}return null;},getNextSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getNextSiblingBy(O);},getFirstChildBy:function(O,Q){var P=(D(O.firstChild,Q))?O.firstChild:null;return P||B.Dom.getNextSiblingBy(O.firstChild,Q);},getFirstChild:function(O,P){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getFirstChildBy(O);},getLastChildBy:function(O,Q){if(!O){return null;}var P=(D(O.lastChild,Q))?O.lastChild:null;return P||B.Dom.getPreviousSiblingBy(O.lastChild,Q);},getLastChild:function(O){O=B.Dom.get(O);return B.Dom.getLastChildBy(O);},getChildrenBy:function(P,R){var Q=B.Dom.getFirstChildBy(P,R);var O=Q?[Q]:[];B.Dom.getNextSiblingBy(Q,function(S){if(!R||R(S)){O[O.length]=S;}return false;});return O;},getChildren:function(O){O=B.Dom.get(O);if(!O){}return B.Dom.getChildrenBy(O);},getDocumentScrollLeft:function(O){O=O||document;return Math.max(O.documentElement.scrollLeft,O.body.scrollLeft);},getDocumentScrollTop:function(O){O=O||document;return Math.max(O.documentElement.scrollTop,O.body.scrollTop);},insertBefore:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}return O.parentNode.insertBefore(P,O);},insertAfter:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}if(O.nextSibling){return O.parentNode.insertBefore(P,O.nextSibling);}else{return O.parentNode.appendChild(P);}}};})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.1",build:"541"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){var E=this.subscribers.length;if(!E&&this.silent){return true;}var H=[],G=true,D,I=false;for(D=0;D<arguments.length;++D){H.push(arguments[D]);}var A=H.length;if(!this.silent){}for(D=0;D<E;++D){var L=this.subscribers[D];if(!L){I=true;}else{if(!this.silent){}var K=L.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(H.length>0){B=H[0];}try{G=L.fn.call(K,B,L.obj);}catch(F){this.lastError=F;}}else{try{G=L.fn.call(K,this.type,H,L.obj);}catch(F){this.lastError=F;}}if(false===G){if(!this.silent){}return false;}}}if(I){var J=[],C=this.subscribers;for(D=0,E=C.length;D<E;D=D+1){J.push(C[D]);}this.subscribers=J;}return true;},unsubscribeAll:function(){for(var B=0,A=this.subscribers.length;B<A;++B){this._delete(A-1-B);}this.subscribers=[];return B;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers[A]=null;},toString:function(){return"CustomEvent: '"+this.type+"', scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var J=false;var I=[];var K=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var L=this;var M=function(){L._tryPreloadAttach();};this._interval=setInterval(M,this.POLL_INTERVAL);}},onAvailable:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:false});C=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(L,N,M){if(J){setTimeout(function(){var O=window;if(M){if(M===true){O=N;}else{O=M;}}L.call(O,"DOMReady",[],N);},0);}else{this.DOMReadyEvent.subscribe(L,N,M);}},onContentReady:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:true});C=this.POLL_RETRYS;this.startInterval();},addListener:function(N,L,W,R,M){if(!W||!W.call){return false;}if(this._isValidCollection(N)){var X=true;for(var S=0,U=N.length;S<U;++S){X=this.on(N[S],L,W,R,M)&&X;}return X;}else{if(YAHOO.lang.isString(N)){var Q=this.getEl(N);if(Q){N=Q;}else{this.onAvailable(N,function(){YAHOO.util.Event.on(N,L,W,R,M);});return true;}}}if(!N){return false;}if("unload"==L&&R!==this){K[K.length]=[N,L,W,R,M];return true;}var Z=N;if(M){if(M===true){Z=R;}else{Z=M;}}var O=function(a){return W.call(Z,YAHOO.util.Event.getEvent(a,N),R);};var Y=[N,L,W,O,Z,R,M];var T=I.length;I[T]=Y;if(this.useLegacyEvent(N,L)){var P=this.getLegacyIndex(N,L);if(P==-1||N!=G[P][0]){P=G.length;B[N.id+L]=P;G[P]=[N,L,N["on"+L]];E[P]=[];N["on"+L]=function(a){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(a),P);};}E[P].push(Y);}else{try{this._simpleAdd(N,L,O,false);}catch(V){this.lastError=V;this.removeListener(N,L,W);return false;}}return true;},fireLegacyEvent:function(P,N){var R=true,L,T,S,U,Q;T=E[N];for(var M=0,O=T.length;M<O;++M){S=T[M];if(S&&S[this.WFN]){U=S[this.ADJ_SCOPE];Q=S[this.WFN].call(U,P);R=(R&&Q);}}L=G[N];if(L&&L[2]){L[2](P);}return R;},getLegacyIndex:function(M,N){var L=this.generateId(M)+N;if(typeof B[L]=="undefined"){return -1;}else{return B[L];}},useLegacyEvent:function(M,N){if(this.webkit&&("click"==N||"dblclick"==N)){var L=parseInt(this.webkit,10);if(!isNaN(L)&&L<418){return true;}}return false;},removeListener:function(M,L,U){var P,S,W;if(typeof M=="string"){M=this.getEl(M);}else{if(this._isValidCollection(M)){var V=true;for(P=0,S=M.length;P<S;++P){V=(this.removeListener(M[P],L,U)&&V);}return V;}}if(!U||!U.call){return this.purgeElement(M,false,L);}if("unload"==L){for(P=0,S=K.length;P<S;P++){W=K[P];if(W&&W[0]==M&&W[1]==L&&W[2]==U){K[P]=null;return true;}}return false;}var Q=null;var R=arguments[3];if("undefined"===typeof R){R=this._getCacheIndex(M,L,U);}if(R>=0){Q=I[R];}if(!M||!Q){return false;}if(this.useLegacyEvent(M,L)){var O=this.getLegacyIndex(M,L);var N=E[O];if(N){for(P=0,S=N.length;P<S;++P){W=N[P];if(W&&W[this.EL]==M&&W[this.TYPE]==L&&W[this.FN]==U){N[P]=null;break;}}}}else{try{this._simpleRemove(M,L,Q[this.WFN],false);}catch(T){this.lastError=T;return false;}}delete I[R][this.WFN];delete I[R][this.FN];I[R]=null;return true;},getTarget:function(N,M){var L=N.target||N.srcElement;return this.resolveTextNode(L);},resolveTextNode:function(L){if(L&&3==L.nodeType){return L.parentNode;}else{return L;}},getPageX:function(M){var L=M.pageX;if(!L&&0!==L){L=M.clientX||0;if(this.isIE){L+=this._getScrollLeft();}}return L;},getPageY:function(L){var M=L.pageY;if(!M&&0!==M){M=L.clientY||0;if(this.isIE){M+=this._getScrollTop();}}return M;},getXY:function(L){return[this.getPageX(L),this.getPageY(L)];
},getRelatedTarget:function(M){var L=M.relatedTarget;if(!L){if(M.type=="mouseout"){L=M.toElement;}else{if(M.type=="mouseover"){L=M.fromElement;}}}return this.resolveTextNode(L);},getTime:function(N){if(!N.time){var M=new Date().getTime();try{N.time=M;}catch(L){this.lastError=L;return M;}}return N.time;},stopEvent:function(L){this.stopPropagation(L);this.preventDefault(L);},stopPropagation:function(L){if(L.stopPropagation){L.stopPropagation();}else{L.cancelBubble=true;}},preventDefault:function(L){if(L.preventDefault){L.preventDefault();}else{L.returnValue=false;}},getEvent:function(Q,O){var P=Q||window.event;if(!P){var R=this.getEvent.caller;while(R){P=R.arguments[0];if(P&&Event==P.constructor){break;}R=R.caller;}}if(P&&this.isIE){try{var N=P.srcElement;if(N){var M=N.type;}}catch(L){P.target=O;}}return P;},getCharCode:function(M){var L=M.keyCode||M.charCode||0;if(YAHOO.env.ua.webkit&&(L in D)){L=D[L];}return L;},_getCacheIndex:function(P,Q,O){for(var N=0,M=I.length;N<M;++N){var L=I[N];if(L&&L[this.FN]==O&&L[this.EL]==P&&L[this.TYPE]==Q){return N;}}return -1;},generateId:function(L){var M=L.id;if(!M){M="yuievtautoid-"+A;++A;L.id=M;}return M;},_isValidCollection:function(M){try{return(typeof M!=="string"&&M.length&&!M.tagName&&!M.alert&&typeof M[0]!=="undefined");}catch(L){return false;}},elCache:{},getEl:function(L){return(typeof L==="string")?document.getElementById(L):L;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(M){if(!H){H=true;var L=YAHOO.util.Event;L._ready();L._tryPreloadAttach();}},_ready:function(M){if(!J){J=true;var L=YAHOO.util.Event;L.DOMReadyEvent.fire();L._simpleRemove(document,"DOMContentLoaded",L._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}if(this.isIE){if(!J){this.startInterval();return false;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var M,L,O,N;for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&!O.checkReady){N=this.getEl(O.id);if(N){R(N,O);F[M]=null;}else{P.push(O);}}}for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&O.checkReady){N=this.getEl(O.id);if(N){if(H||N.nextSibling){R(N,O);F[M]=null;}}else{P.push(O);}}}C=(P.length===0)?0:C-1;if(Q){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return true;},purgeElement:function(O,P,R){var Q=this.getListeners(O,R),N,L;if(Q){for(N=0,L=Q.length;N<L;++N){var M=Q[N];this.removeListener(O,M.type,M.fn,M.index);}}if(P&&O&&O.childNodes){for(N=0,L=O.childNodes.length;N<L;++N){this.purgeElement(O.childNodes[N],P,R);}}},getListeners:function(N,L){var Q=[],M;if(!L){M=[I,K];}else{if(L=="unload"){M=[K];}else{M=[I];}}for(var P=0;P<M.length;P=P+1){var T=M[P];if(T&&T.length>0){for(var R=0,S=T.length;R<S;++R){var O=T[R];if(O&&O[this.EL]===N&&(!L||L===O[this.TYPE])){Q.push({type:O[this.TYPE],fn:O[this.FN],obj:O[this.OBJ],adjust:O[this.OVERRIDE],scope:O[this.ADJ_SCOPE],index:R});}}}}return(Q.length)?Q:null;},_unload:function(S){var R=YAHOO.util.Event,P,O,M,L,N;for(P=0,L=K.length;P<L;++P){M=K[P];if(M){var Q=window;if(M[R.ADJ_SCOPE]){if(M[R.ADJ_SCOPE]===true){Q=M[R.UNLOAD_OBJ];}else{Q=M[R.ADJ_SCOPE];}}M[R.FN].call(Q,R.getEvent(S,M[R.EL]),M[R.UNLOAD_OBJ]);K[P]=null;M=null;Q=null;}}K=null;if(I&&I.length>0){O=I.length;while(O){N=O-1;M=I[N];if(M){R.removeListener(M[R.EL],M[R.TYPE],M[R.FN],N);}O=O-1;}M=null;R.clearCache();}for(P=0,L=G.length;P<L;++P){G[P][0]=null;G[P]=null;}G=null;R._simpleRemove(window,"unload",R._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var L=document.documentElement,M=document.body;if(L&&(L.scrollTop||L.scrollLeft)){return[L.scrollTop,L.scrollLeft];}else{if(M){return[M.scrollTop,M.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(N,O,M,L){N.addEventListener(O,M,(L));};}else{if(window.attachEvent){return function(N,O,M,L){N.attachEvent("on"+O,M);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(N,O,M,L){N.removeEventListener(O,M,(L));};}else{if(window.detachEvent){return function(M,N,L){M.detachEvent("on"+N,L);};}else{return function(){};}}}()};}();(function(){var D=YAHOO.util.Event;D.on=D.addListener;if(D.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var B,E=document,A=E.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){B=document.createElement("script");var C=E.getElementsByTagName("head")[0]||A;C.insertBefore(B,C.firstChild);}else{E.write("<script id=\"_yui_eu_dr\" defer=\"true\" src=\"//:\"></script>");B=document.getElementById("_yui_eu_dr");}if(B){B.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};}else{}B=null;}else{if(D.webkit){D._drwatch=setInterval(function(){var F=document.readyState;if("loaded"==F||"complete"==F){clearInterval(D._drwatch);D._drwatch=null;D._ready();}},D.POLL_INTERVAL);}else{D._simpleAdd(document,"DOMContentLoaded",D._ready);}}D._simpleAdd(window,"load",D._load);D._simpleAdd(window,"unload",D._unload);D._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};
var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(K,J){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(K.shiftKey==F.shift&&K.altKey==F.alt&&K.ctrlKey==F.ctrl){var H;var G;if(F.keys instanceof Array){for(var I=0;I<F.keys.length;I++){H=F.keys[I];if(H==K.charCode){D.fire(K.charCode,K);break;}else{if(H==K.keyCode){D.fire(K.keyCode,K);break;}}}}else{H=F.keys;if(H==K.charCode){D.fire(K.charCode,K);}else{if(H==K.keyCode){D.fire(K.keyCode,K);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.1",build:"541"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.3.1", build: "541"});
/**
 * Copyright (c) 2007, Skype Technologies S.A. All rights reserved.
 * Partly based on YUI library (http://developer.yahoo.com/yui/).
 * Version: 0.1
 */

/**
 * The SKYPE object is the single global object used by Skype Common Library.
 * It contains utility functions for strings, arrays, cookies, preferences, and
 * logging. SKYPE.util, SKYPE.user are namespaces created automatically for
 * and used by the library.
 * @module skype
 * @title  SKYPE Global
 */
if (typeof SKYPE == "undefined")
{
    /**
     * The SKYPE global namespace object
     * @class SKYPE
     * @static
     */
    var SKYPE = {};
}

/**
 * Returns the namespace specified and creates it if it doesn't exist
 * <pre>
 * SKYPE.namespace("property.package");
 * SKYPE.namespace("SKYPE.property.package");
 * </pre>
 * Either of the above would create SKYPE.property, then
 * SKYPE.property.package
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * SKYPE.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * @method namespace
 * @static
 * @param  {String*} arguments 1-n namespaces to create 
 * @return {Object}  A reference to the last namespace object created
 */
SKYPE.namespace = function()
{
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; ++i)
    {
        d=a[i].split(".");
        o=SKYPE;
        // SKYPE is implied, so it is ignored if it is included
        for (j=(d[0] == "SKYPE") ? 1 : 0; j<d.length; ++j)
        {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};

/**
 * Uses YAHOO.widget.Logger to output a log message, if the widget is available.
 *
 * @method log
 * @static
 * @param  {String}  msg  The message to log.
 * @param  {String}  cat  The log category for the message.  Default
 *                        categories are "info", "warn", "error", time".
 *                        Custom categories can be used as well. (opt)
 * @param  {String}  src  The source of the the message (opt)
 * @return {Boolean}      True if the log operation was successful.
 */
SKYPE.__log_enabled = null;
SKYPE.log = function(msg, cat, src)
{
    var YL = YAHOO.lang;
    
    if (SKYPE.__log_enabled === null)
    {
        SKYPE.__log_enabled = (
            location.host.indexOf(".test") > -1
            || document.cookie.indexOf("debug") > -1
            || location.search.indexOf("debug") > -1
        );
        
        if (!SKYPE.__log_enabled) return;
        
        SKYPE.__log_type = null;
        if (YAHOO.widget.Logger && YAHOO.widget.Logger.log)
            SKYPE.__log_type = "yui";
        else if (YAHOO.env.ua.gecko && typeof console != "undefined" && (YL.isFunction(console.log) || YL.isObject(console.log)))
            SKYPE.__log_type = "firebug";
        else if (YAHOO.env.ua.webkit && YL.isObject(window.console) && YL.isFunction(window.console.log))
            SKYPE.__log_type = "webkit";
        else if (YAHOO.env.ua.opera && YL.isObject(opera) && YL.isFunction(opera.postError))
            SKYPE.__log_type = "opera";
    }
    if (!SKYPE.__log_enabled) return;
    
    switch (SKYPE.__log_type)
    {
        // YUI logger
        case "yui":
            return YAHOO.widget.Logger.log(msg, cat, src);
            break;
        
        // Firefox Firebug
        case "firebug":
            if (cat && (YL.isFunction(console[cat]) || YL.isObject(console[cat])))
                console[cat](msg);
            else
                console.log((cat ? "["+cat.toUpperCase()+"] " : "") + msg);
            break;
            
        // Safari/WebKit JS console
        case "webkit":
            window.console.log((cat ? "["+cat.toUpperCase()+"] " : "") + msg);
            break;
        
        // Opera error console
        case "opera":
            opera.postError((cat ? "["+cat.toUpperCase()+"] " : "") + msg);
            break;
    }
};

/**
 * Registers a module with the SKYPE object
 * @method register
 * @static
 * @param {String}   name    the name of the module (event, slider, etc)
 * @param {Function} mainClass a reference to class in the module.  This
 *                             class will be tagged with the version info
 *                             so that it will be possible to identify the
 *                             version that is in use when multiple versions
 *                             have loaded
 * @param {Object}   data      metadata object for the module.  Currently it
 *                             is expected to contain a "version" property
 *                             and a "build" property at minimum.
 */
SKYPE.register = function(name, mainClass, data) {
    var mods = SKYPE.env.modules;
    if (!mods[name]) {
        mods[name] = { versions:[], builds:[] };
    }
    var m=mods[name],v=data.version,b=data.build,ls=SKYPE.env.listeners;
    m.name = name;
    m.version = v;
    m.build = b;
    m.versions.push(v);
    m.builds.push(b);
    m.mainClass = mainClass;
    // fire the module load listeners
    for (var i=0;i<ls.length;i=i+1) {
        ls[i](m);
    }
    // label the main class
    if (mainClass) {
        mainClass.VERSION = v;
        mainClass.BUILD = b;
    } else {
        SKYPE.log("mainClass is undefined for module " + name, "warn");
    }
};


/**
 * SKYPE.env is used to keep track of what is known about the YUI library and
 * the browsing environment
 * @class YAHOO.env
 * @static
 */
SKYPE.env = SKYPE.env || {

    /**
     * Keeps the version info for all modules that have reported themselves
     * @property modules
     * @type Object[]
     */
    modules: [],
    
    /**
     * List of functions that should be executed every time a module
     * reports itself.
     * @property listeners
     * @type Function[]
     */
    listeners: []
};

/**
 * Returns the version data for the specified module:
 *      <dl>
 *      <dt>name:</dt>      <dd>The name of the module</dd>
 *      <dt>version:</dt>   <dd>The version in use</dd>
 *      <dt>build:</dt>     <dd>The build number in use</dd>
 *      <dt>versions:</dt>  <dd>All versions that were registered</dd>
 *      <dt>builds:</dt>    <dd>All builds that were registered.</dd>
 *      <dt>mainClass:</dt> <dd>An object that was was stamped with the
 *                 current version and build. If 
 *                 mainClass.VERSION != version or mainClass.BUILD != build,
 *                 multiple versions of pieces of the library have been
 *                 loaded, potentially causing issues.</dd>
 *       </dl>
 *
 * @method getVersion
 * @static
 * @param {String}  name the name of the module (event, slider, etc)
 * @return {Object} The version info
 */
SKYPE.env.getVersion = function(name) {
    return SKYPE.env.modules[name] || null;
};

SKYPE.namespace("util", "user");

SKYPE.util.Browser = function()
{
    // Partly from ExtJS lib
    var ua = navigator.userAgent.toLowerCase();
    var isStrict = document.compatMode == "CSS1Compat";
    var isOpera = ua.indexOf("opera") > -1;
    var isSafari = /webkit|khtml/.test(ua);
    var isIE = ua.indexOf("msie") > -1;
    var isIE6 = ua.indexOf("msie 6") > -1;
    var isIE7 = ua.indexOf("msie 7") > -1;
    var isGecko = !isSafari && ua.indexOf("gecko") > -1;
    var isBorderBox = isIE && !isStrict;
    var isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1);
    var isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1);
    var isLinux = /x11|linux|freebsd|netbsd/.test(ua);
    
    return {
        isStrict: isStrict
        ,isOpera: isOpera
        ,isSafari: isSafari
        ,isIE: isIE
        ,isIE6: isIE6
        ,isIE7: isIE7
        ,isGecko: isGecko
        ,isBorderBox: isBorderBox
        ,isWindows: isWindows
        ,isMac: isMac
        ,isLinux: isLinux
    };
}();

SKYPE.register("skype", SKYPE, {version: "1.0.0", build: "1"});
SKYPE.namespace("navigation");
SKYPE.namespace("util");
SKYPE.namespace("user");
SKYPE.namespace("helpers");

SKYPE.navigation.mouseOverTabs = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        var mainMenuItems = D.getElementsBy(function(el) { return el; }, 'li', 'mainNavigation');
        for (var i=0; i < mainMenuItems.length; i++)
        {
            if (!D.hasClass(mainMenuItems[i], "active"))
            {
                E.addListener(mainMenuItems[i], "mouseover", function() { D.addClass(this, "hover"); });
                E.addListener(mainMenuItems[i], "mouseout", function() { D.removeClass(this, "hover"); });
            }
        }
    });
}();

SKYPE.navigation.removeIEFlicker = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        if(SKYPE.util.Browser.isIE && !SKYPE.util.Browser.isIE7){
            try {
                document.execCommand("BackgroundImageCache", false, true);
            } catch(e) {
            
            }
        }
    });
}();

/* NOTE: Use SKYPE.util.smartDefaultTextFields instead! */
SKYPE.navigation.clearSearchInput = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        if(D.get("google-input")) {
            var searchField = D.get("google-input");
            var initialValue = searchField.value;
            E.addListener(searchField, "focus", function() { if(searchField.value == initialValue) { searchField.value = ""; } });
            E.addListener(searchField, "blur", function() { if(searchField.value == "") { searchField.value = initialValue; } });
        }
    });
}();

SKYPE.navigation.changeLanguage = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        E.addListener(D.get("userLanguage"), "change", function() {
            // replace [LC] in form action with language code from userLanguage selection
            var changeUrl = D.get("userPreferencesForm").action.replace(/(%5B|\[)LC(%5D|\])/g, D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value);
            
            SKYPE.user.Preferences.setLanguage(D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value);
            SKYPE.user.Preferences.save();

            // if not changing to light site then check if we can keep the page
            if(!D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value.match("(zh-Hans|cs|da|nl|et|fi|ko|no|hu|pt-pt|es-world|ar)") && !window.location.hostname.match("secure|search|share|support|about|jobs")) {
                // split window.location into urlArray - protocol+hostname, intl/XX-XXXXX, rest of the url
                var reg = new RegExp("(^"+window.location.protocol+"//"+window.location.hostname+"/)"+"(intl/[a-zA-Z-]{2,8})?/?(.*)");
                var urlArray = reg.exec(window.location);
                if(typeof urlArray[1] != undefined) {
                    var newLocation = urlArray[1];  
                    newLocation +=  "intl/" + D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value + "/";
                    if(typeof urlArray[3] != undefined) {
                        newLocation += urlArray[3];
                    }
                    changeUrl = newLocation;
                }
            }
            window.location = changeUrl;
        });
        E.addListener(window, "load", function() {
            if (typeof SKYPE.user.Preferences.getLanguage() != "undefined" && SKYPE.user.Preferences.getLanguage() == "") {
                SKYPE.user.Preferences.setLanguage(D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value);
                SKYPE.user.Preferences.save();
            }
        });
    });
}();

SKYPE.navigation.buttonHovers = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        var buttonsOnPage = D.getElementsByClassName("button", "a");
        for (var i=0; i < buttonsOnPage.length; i++)
        {
                E.addListener(buttonsOnPage[i], "mouseover", function() { D.addClass(this, "buttonHover"); });
                E.addListener(buttonsOnPage[i], "mouseout", function() { D.removeClass(this, "buttonHover"); });
                E.addListener(buttonsOnPage[i], "mousedown", function() { D.addClass(this, "buttonActive"); });
        }
    });
}();

// Add image alpha for IE on pageload
SKYPE.loadImgPngAlpha = function() 
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.addListener(window, "load", function()
    {
        SKYPE.imgPngAlpha();
    });
}();

// So one can add image alpha separately from page load as well
SKYPE.imgPngAlpha = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    // if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer") {
    if (YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) {
        for (var i = 0; i < document.images.length; i++) {
            var img = document.images[i];
            var imgName = img.src.toUpperCase();
            if(imgName.substring(imgName.length-3, imgName.length) == "PNG" && img.className.indexOf("alphaPng",0) != -1) {
                var imgID = (img.id) ? "id='" + img.id + "' " : "";
                var imgClass = (img.className) ? "class='" + img.className + "' " : "";
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
                var imgStyle = "display:inline-block;" + img.style.cssText;
                if(img.align == "left") imgStyle = "float:left;" + imgStyle;
                if(img.align == "right") imgStyle = "float:right;" + imgStyle;
                if(img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
                var strNewHTML = "<span " + imgID + imgClass + imgTitle
                + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
                img.outerHTML = strNewHTML;
                i = i-1;
            }
        }
    }
};

/* Settings */

/* @legal: Cookie handling code from the book "JavaScript: The Definitive Guide" by David Flanagan published by O'Reilly. ISBN: 0-596-00048-0 */
SKYPE.util.Cookie = function(document, name, hours, path, domain, secure, fieldsep, valuesep)
{
    this.document = document;
    this.name = name;
    if (hours) {
        this.expiration = new Date((new Date()).getTime() + hours*3600000);
    } else {
        this.expiration = null;
    }
    this.path = path ? path : null;
    this.domain = domain ? domain : null;
    this.secure = secure ? true : false;
    this.fieldsep = fieldsep ? fieldsep : ':';
    this.valuesep = valuesep ? valuesep : '&';
    this.isSimpleValue = false;
    // Actual cookie data is held in this one
    this.data = {};
};
SKYPE.util.Cookie.prototype = {
    /**
     * Saves values set in cookie.
     */
    store: function (doSort) {
        var cookieval = "";
        var cookie = "";
        var keys = [];
        if (typeof this.data == "object")
        {
            for(var prop in this.data)
            {
                keys.push(prop);
            }
            if (doSort)
                keys.sort();
            for (var i=0; i < keys.length; i++)
            {
                if (cookieval != "") cookieval += this.fieldsep;
                cookieval += keys[i] + this.valuesep + escape(this.data[keys[i]]);
            }
        }
        else
        {
            cookieval = escape(this.data.toString());
        }
        cookie = this.name + '=' + cookieval;
        if (this.expiration)
            cookie += '; expires=' + this.expiration.toGMTString();
        if (this.path) cookie += '; path=' + this.path;
        if (this.domain) cookie += '; domain=' + this.domain;
        if (this.secure) cookie += '; secure';
        this.document.cookie = cookie;
    },
    
    /**
     * Loads values from cookie
     */
    load: function()
    {
        if (this.isSimpleValue && typeof this.data != "string")
            this.data = this.data.toString();
        var allcookies = this.document.cookie;
        if (allcookies == "") return false;
        var start = allcookies.indexOf(this.name + '=');
        if (start == -1) return false;
        start += this.name.length + 1;
        var end = allcookies.indexOf(';', start);
        if (end == -1) end = allcookies.length;
        var cookieval = allcookies.substring(start, end);
        if (!this.isSimpleValue)
        {
            var a = cookieval.split(this.fieldsep);
            for (var i=0; i < a.length; i++)
                a[i] = a[i].split(this.valuesep);
            for (var i = 0; i < a.length; i++)
                this.data[a[i][0]] = unescape(a[i][1]);
        } else {
            this.data = cookieval;
        }
        return true;
    },
    
    /**
     * Removes cookie if it was set.
     */
    remove: function()
    {
        var cookie = this.name + '=';
        if (this.path) cookie += '; path=' + this.path;
        if (this.domain) cookie += '; domain=' + this.domain;
        cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
        this.document.cookie = cookie;
    }
};

/**
 * Skype Preference Cookie Handling
 */
SKYPE.user.Preferences = function()
{
    var values = {
        'LC':''
        ,'CCY':''
        ,'CC':''
        ,'TZ':''
        ,'VER':''
        ,'TS':''
        ,'TM':''
        ,'VAT':''
        ,'UCP':''
        ,'ENV':''
    };
    
    var domain = null;
    var cookieName = "SC";
    var cookie = null;
    var path = "/";
    var secure = false;
    var expires = null;
    var _parsing = false;
    
    var platformNames = {
        '0':'windows'
        ,'1':'pocketpc'
        ,'2':'linux'
        ,'3':'osx'
    };
    
    return {
        init: function()
        {
            this.setDomain();
            expires = 365;
            this.parseCookie();
        },
        getCookie: function()
        {
            var c = new SKYPE.util.Cookie(document, cookieName, expires, path, domain, secure, ":", "=");
            c.load();
            return c;
        },
        scrubCookieValue: function(value)
        {
            return value.replace(/[\n\r]/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        setDomain: function(dom)
        {
            if (dom) {
                domain = dom;
            } else if (location && location.hostname) {
                var parts = location.hostname.split(".");
                var i = parts.length;
                if (i >= 2 && isNaN(parseInt(parts[i-1]))) {
                    domain = "."+parts[i-2]+"."+parts[i-1];
                }
            }
        },
        parseCookie: function()
        {
            cookie = this.getCookie();
            var knownSetters = {
                'LC': 'setLanguage'
                ,'CCY': 'setCurrency'
                ,'CC': 'setCountryCode'
                ,'TZ': 'setTimezone'
                ,'VER': 'setVersion'
                ,'TS': 'setTimeStamp'
                ,'TM': 'setTimeModified'
                ,'VAT': 'setVatEligible'
                ,'UCP': 'setClientProfile'
            };
            _parsing = true;
            for (var prop in cookie.data)
            {
                if (prop.search(/[A-Z]+/) != -1)
                {
                    if (knownSetters[prop])
                        this[knownSetters[prop]](cookie.data[prop]);
                    else
                        this.setValue(prop, cookie.data[prop]);
                }
            }
            _parsing = false;
            return true;
        },
        
        save: function()
        {
            for (var val in values)
            {
                cookie.data[val] = values[val];
            }
            cookie.store(true);
        },
        
        clear: function()
        {
            cookie.remove();
        },
        
        getValue: function(key, def)
        {
            if (typeof def == "undefined")
                def = "";
            if (values[key] && values[key] != null && values[key].length)
                return values[key];
            return def;
        },
        setValue: function(key, value)
        {
            values[key] = value.toString();
        },
        
        touchCookie: function()
        {
            var now = parseInt(new Date().getTime()/1000);
            if (_parsing)
                return false;
            if (!this.getTimeStamp().length)
                this.setValue("TS", now);
            this.setValue("TM", now);
            return true;
        },
        
        setLanguage: function(value)
        {
            /* TODO: Should do validation here before setting? */
            this.setValue("LC", value.replace(/_/g, "-"));
            this.touchCookie();
            return true;
        },
        getLanguage: function(def)
        {
            return this.getValue("LC", def);
        },
        
        setCurrency: function(value)
        {
            if (/^([A-Z]{3}|[0-9]{3})$/.test(value) == false)
                value = "";
            this.setValue("CCY", value);
            this.touchCookie();
            return true;
        },
        getCurrency: function(def)
        {
            return this.getValue("CCY", def);
        },
        
        setCountryCode: function(value)
        {
            if (/^([A-Z]{2,3}|[0-9]{3})$/.test(value) == false)
                value = "";
            this.setValue("CC", value);
            this.touchCookie();
            return true;
        },
        getCountryCode: function(def)
        {
            return this.getValue("CC", def);
        },
        
        formatDecimal: function(value)
        {
            if (value < 10)
                return "0" + value;
            return value;
        },
        
        setTimezone: function(value)
        {
            if (/^([-+]((0[0-9]|1[0-3]):[0-5][0-9]|14:00)|Z)$/.test(value) == false)
            {
                var matches = value.match(/^([-+]?)([0-9]{1,2})(\.[0-9])?$/);
                if (matches)
                {
                    var sign = matches[1] && matches[1].length ? matches[1] : '+';
                    var hours = parseInt(matches[2]);
                    var minutes = matches[3] && matches[3].length ? parseInt(60 * parseFloat(matches[3])) : 0;
                    if (hours > 14) hours = 14;
                    if (hours == 14) minutes = 0;
                    if (minutes > 59) minutes = 0;
                    value = sign+this.formatDecimal(hours)+":"+this.formatDecimal(minutes);
                }
            }
            this.setValue("TZ", value);
            this.touchCookie();
            return true;
        },
        getTimezone: function(def)
        {
            return this.getValue("TZ", def);
        },
        
        setVersion: function(value)
        {
            if (typeof value == "object")
            {
                var defaultValues = {
                    'platform':''
                    ,'platformname':''
                    ,'version':''
                    ,'campaign':''
                    ,'partner':''
                    ,'partnername':''
                };
                for (var prop in defaultValues)
                {
                    if (value[prop] == null)
                        value[prop] = defaultValues[prop];
                }
                var splitVer = value.version.split(".");
                
                value = value.platform+"/"+splitVer[0]+"."+splitVer[1]+"."+(value.partner.length ? value.partner : splitVer[2])+"."+splitVer[3]+"/"+value.campaign;
            }
            
            if (/^[0-9]?\/[0-9]{1,2}(\.[0-9]{1,3}){3}\/[0-9]*$/.test(value) == false)
                return false;
            
            this.setValue("VER", value);
            this.touchCookie();
            return true;
        },
        getVersion: function(def)
        {
            return this.getValue("VER", def);
        },
        getParsedVersion: function(def)
        {
            var result = {
                'platform':''
                ,'platformname':''
                ,'version':''
                ,'campaign':''
                ,'partner':''
                ,'partnername':''
            };
            var ver = this.getVersion(def);
            if (!ver.length)
                return result;
            var splitVer = ver.split("/");
            result.platform = splitVer[0];
            result.version = splitVer[1];
            result.campaign = splitVer[2];
            splitVer = result.version.split(".");
            result.partner = (splitVer.length > 2 && splitVer[2]) ? splitVer[2] : 0;
            return result;
        },
        
        setTimeStamp: function(value)
        {
            this.setValue("TS", value);
            this.touchCookie();
        },
        getTimeStamp: function(def)
        {
            return parseInt(this.getValue("TS", def));
        },
        
        setTimeModified: function(value)
        {
            if (_parsing)
            {
                this.setValue("TM", value);
            }
            this.touchCookie();
        },
        getTimeModified: function(def)
        {
            return parseInt(this.getValue("TM", def));
        },
        
        setClientProfile: function(value)
        {
            this.setValue("UCP", value);
            this.touchCookie();
        },
        getClientProfile: function(def)
        {
            return this.getValue("UCP", def);
        },
        
        setVatEligible: function(value)
        {
            var result = "";
            // If string was passed in, then only accept "true" and "false" as valid
            if (typeof value == "string")
            {
                if (value == "true") result = "true";
                else if (value == "false") result = "false";
                else result = "";
            }
            // Turn booleans into strings
            else if (typeof value == "boolean")
            {
                result = value ? "true" : "false";
            }
            // Accept only numbers 0 and 1, nothing else
            else if (typeof value == "number")
            {
                if (value == 1) result = "true";
                else if (value == 0) result = "false";
                else result = "";
            }
            this.setValue("VAT", result);
            this.touchCookie();
        },
        isVatEligible: function()
        {
            var val = this.getValue("VAT");
            if (val == "true") return true;
            else if (val == "false") return false;
            else return null;
        },
        
        setEnv: function(value)
        {
            value = value.replace(/\//g, "-");
            
            if (!this.getEnv(value))
            {
                var env = this.getValue("ENV");
                env = env.length ? env.split("/") : [];
                env.push(value);
                this.setValue("ENV", env.join("/"));
                this.touchCookie();
            }
        },
        getEnv: function(value)
        {
            value = value.replace(/\//g, "-");
            
            var env = this.getValue("ENV").split("/");
            for (var i = 0; i < env.length; i++)
            {
                if (env[i] === value) return true;
            }
            return false;
        },
        deleteEnv: function(value)
        {
            var env = this.getValue("ENV").split("/");
            for (var i=0; i < env.length; i++)
            {
                if (env[i] === value)
                {
                    env.splice(i, 1);
                }
            };
            this.setValue("ENV", env.join("/"));
            this.touchCookie();
        },
        clearEnv: function()
        {
            this.setValue("ENV", "");
            this.touchCookie();
        },
        
        debug: function()
        {
            var result = "";
            for (var key in values)
            {
                result = result + key + " = " + values[key] + "\n";
            }
            return result;
        }
    };
}();
SKYPE.user.Preferences.init();

SKYPE.findParentTag = function(el, tagName)
{
    tagName = tagName.toUpperCase();

    while (el.parentNode)
    {
        if (el.parentNode.tagName.toUpperCase() == tagName)
        {
            return el.parentNode;
        }
        el = el.parentNode;
    }

    return null;
};

/* Cancels default functionality for an element */

SKYPE.util.cancelDefault = function(e) {
    var E = YAHOO.util.Event;
    E.preventDefault(e);
};

/* changes form buttons on pages */

SKYPE.submitButtons = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    E.onDOMReady(function()
    {
        var formsOnPage = document.getElementsByTagName("form");
        for (var i=0; i < formsOnPage.length; i++) {
                var buttons = formsOnPage[i].getElementsByTagName("button");
                if(buttons[0] != undefined) {
                    var buttonsLength = buttons.length;
                    for (var k = buttonsLength - 1; k >= 0; k--) {
                        if(buttons[k].className.indexOf('submitButton') > -1 || buttons[k].className.indexOf('glassButton') > -1) {
                            var buttonclasses = buttons[k].className.split(" ");
                            var buttonvalue = buttons[k].innerHTML;
                            var wrapper = document.createElement("span");
                            var a = document.createElement("a");
                            var innerspan = document.createElement("span");
                            var defaultclass = true;
                            var colorclass, iconclass;
                            if(buttons[k].className.indexOf('big') > -1) {
                                D.addClass(wrapper, "button");
                            } else {
                                D.addClass(wrapper, "buttonSmall"); 
                            }
                            for (var j=0; j < buttonclasses.length; j++) {
                                if (buttonclasses[j] == "blue" || buttonclasses[j] == "green" || buttonclasses[j] == "yellow") {
                                    defaultclass = false;
                                    colorclass = buttonclasses[j];
                                } else if (buttonclasses[j].match("shop") || buttonclasses[j].match("skypeCredit") || buttonclasses[j].match("skypeOnlineNr") || buttonclasses[j].match("skypeVoicemail")) {
                                    iconclass = buttonclasses[j];
                                } else {
                                    D.addClass(wrapper, buttonclasses[j]);
                                }
                                if(buttonclasses[j] == "disabled") {
                                    D.addClass(a, "disabled");
                                }
                            }
                            if (defaultclass) {
                                D.addClass(a, "gray");
                            } else {
                                D.addClass(a, colorclass);
                            }
                            D.addClass(a, iconclass);
                            wrapper.appendChild(a);
                            var buttonId = "submitButton"+i;
                            if (buttons[k].id != "") {
                                buttonId = buttons[k].id;
                            }
                            wrapper.setAttribute("id", buttonId);
                            a.appendChild(innerspan);


                            if(buttons[k].className.indexOf('glassButton') > -1 && buttons[k].value.length > 0) {
                                a.setAttribute("href",buttons[k].value);
                            } else {
                                a.setAttribute("href","#");
                            }
                            innerspan.innerHTML = buttonvalue;
                            buttons[k].parentNode.appendChild(wrapper);

                            var buttonType = buttons[k].getAttribute('type');
                            if (buttonType == "submit") {
                                var submitbutton = D.get(buttonId);
                                E.addListener(a, "click", SKYPE.util.cancelDefault);
                                E.addListener(a, "click", function(e)
                                {
                                    if (D.hasClass(a, "disabled")) {
                                        YAHOO.util.Event.stopEvent(e);
                                        return false;
                                    }

                                    var frm = SKYPE.findParentTag(this,"form");
                                    if (typeof FIC_checkForm != "undefined") {
                                        var status = FIC_checkForm(e);
                                        if (!status) {
                                            YAHOO.util.Event.stopEvent(e);
                                            return false;
                                        }
                                    }
                                    frm.submit();
                                });
                            } else if (buttonType == "reset") {
                                var resetbutton = D.get(buttonId);
                                E.addListener(a, "click", SKYPE.util.cancelDefault);
                                E.addListener(a, "click", function()
                                {
                                    SKYPE.findParentTag(this,"form").reset();
                                });
                            } else if (buttonType == "button" && buttons[k].getAttribute('onclick')) {
                                a.setAttribute("onclick", buttons[k].getAttribute('onclick'));
                            }

                            var oldbutton = buttons[k].parentNode.removeChild(buttons[k]);
                        }
                        buttonclasses = buttonclasses.join(",");
                        if(buttonclasses.indexOf("submitButton") > -1) {
                            var submitbutton = D.get(buttonId);
                            E.addListener(submitbutton, "click", SKYPE.util.cancelDefault);
                            E.addListener(submitbutton, "click", function(e)
                            {
                                if (D.hasClass(a, "disabled")) {
                                    YAHOO.util.Event.stopEvent(e);
                                    return false;
                                }

                                var frm = SKYPE.findParentTag(this,"form");
                                if (typeof FIC_checkForm != "undefined") {
                                    var status = FIC_checkForm(e);
                                    if (!status) {
                                        YAHOO.util.Event.stopEvent(e);
                                        return false;
                                    }
                                }
                                frm.submit();
                            });
                        }
                    }
                }
            }
    });
}();


/**
 * Adds dummy text functionality to textfields based on title and value attributes
 */
SKYPE.util.smartDefaultTextFields = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    E.onDOMReady(function(){
        D.getElementsByClassName("defaultText", "", "", function() {
            if (this.value == "") {
                return;
            }
            if (this.value == "" && this.value != "") {
                this.value = this.title;
            }
            if (this.value != this.title) {
                D.removeClass(this, "defaultText");
            }
            E.addListener(this, "focus", function() {
                if (this.value == this.title) {
                    this.value = "";
                    D.removeClass(this, "defaultText");
                }
            });
            E.addListener(this, "blur", function() {
                if (this.value == "") {
                    this.value = this.title;
                    D.addClass(this, "defaultText");
                }
            });
        });
    });
}();


/* Load CSS with javascript help */

SKYPE.loadCss = function (filename) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};

/* Filter for main and sub select box, depends on nested selectionsArray predefined */

SKYPE.subSelectBoxHandler = function(mainSelectId, subSelectId) {
    
    var addOption = function(el, optionText, optionValue) {

        var option = document.createElement("OPTION");                
        if (optionValue === false) {
            option.text = el.title;
        } else {
            option.text = optionText;            
            option.value = optionValue;    
        }
                
        try {
            el.add(option, null); // doesn't work in IE
        } catch(e) {
            el.add(option); // works in IE
        }
    };
    
    var addOptions = function(el, selectionsArray, indx) {
        for (var i = 1; i < selectionsArray.length; i++) {
            addOption(el, selectionsArray[i], indx);
        }
    };
    
    // add change handler for mainSelect
    E.addListener(D.get(mainSelectId), "change", function() {
        D.get(subSelectId).innerHTML = "";
        var selectedValue = this.options[this.selectedIndex].value;

        if (selectedValue != this.title) {
            addOptions(D.get(subSelectId), selectionsArray[selectedValue], true);
        } else {
            addOption(D.get(subSelectId), D.get(subSelectId).title, true);
        }
    });
    
    // build mainSelect
    for (var i = 0; i < selectionsArray.length; i++) {
        addOption(D.get(mainSelectId), selectionsArray[i][0], i);
    }
};


/**
 * Smooth scroll class
 *
 * Usage:
 * <a href="#target" class="smoothscroll">Scroll to #target</a>
 */
SKYPE.util.Scroll = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var scroll = {
        _minStep: 100,
        _prevWin: {"x": -1, "y": -1},
        _delay: 19,
        getPos: function(el) {
            if (typeof el == "undefined") {

                var x1 = x2 = x3 = 0;
                var y1 = y2 = y3 = 0;

                if (document.documentElement) {
                    x1 = document.documentElement.scrollLeft || 0;
                    y1 = document.documentElement.scrollTop || 0;
                }

                if (document.body) {
                    x2 = document.body.scrollLeft || 0;
                    y2 = document.body.scrollTop || 0;
                }

                x3 = window.scrollX || 0;
                y3 = window.scrollY || 0;

                var x = Math.max(x1, Math.max(x2, x3));
                var y = Math.max(y1, Math.max(y2, y3));

            } else {
                var o = D.get(el);

                if (o) {
                    var x = o.offsetLeft;
                    var y = o.offsetTop;
                } else {
                    var x = null;
                    var y = null;
                }

            }


            return {"x": x, "y": y};
        },
        to: function(target) {
            if (typeof target == "undefined") {
                this.up();
            } else {
                var obj = this.getPos(target);
                if (obj.y != null) {
                    var win = this.getPos();
                    if (obj.y < win.y) {
                        this.up(target);
                    } else if (obj.y > win.y){
                        this.down(target);
                    }
                }
            }
        },
        up: function(target) {
            var obj = {};
            var win = this.getPos();
            if (typeof target != "undefined") {
                obj = this.getPos(target);
                obj.y = Math.max(0, obj.y - 8);
            }

            win.y = Math.max(win.y - (Math.max(this._minStep, Math.floor((win.y - obj.y) / 3))), obj.y);
            window.scrollTo(obj.x, win.y);

            if (win.y > obj.y) {
                window.setTimeout(
                    function(){
                        scroll.up(target);
                    }
                    ,this._delay
                );
            }
        },
        down: function(target) {
            var obj = {};
            var win = this.getPos();
            if (this._prevWin.y == win.y) {
                return true;
            }
            this._prevWin.y = win.y;

            if (typeof target != "undefined") {
                obj = this.getPos(target);
                obj.y = Math.max(0, obj.y - 8);
            }

            win.y = Math.min(win.y + (Math.max(this._minStep, Math.floor((obj.y - win.y) / 3))), obj.y);
            window.scrollTo(obj.x, win.y);

            if (win.y < obj.y && this._prevWin.y != win.y) {
                window.setTimeout(
                    function(){
                        scroll.down(target);
                    }
                    ,this._delay
                );
            }
        }
    };

    return {
        init: function() {
            E.onDOMReady(function(){
                D.getElementsByClassName("smoothscroll", "a", document, function() {
                    var uri = this.getAttribute("href").split("#");
                    if (uri[0] == document.location.href || uri[0] == "") {
                        anchor = true;
                    }
                    if (anchor) {
                        if (document.getElementById(uri[1])) {
                            E.addListener(this, "click", SKYPE.util.cancelDefault);
                            E.addListener(this, "click", function() {
                                scroll.to(uri[1]);
                            });
                        }
                    }
                });
            });
        }
    };
}();
SKYPE.util.Scroll.init();


/**
 * Add search field tweaks
 */
SKYPE.navigation.searchFieldTweaks = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var _setDisabled = function(el) {
        if (typeof el == "undefined" || !el) {
            return;
        }

        if (el.tagName.toUpperCase() == "INPUT") {
            el.disabled = true;
        } else {
            D.addClass(el, "disabled");
        }
    };

    var _setEnabled = function(el) {
        if (typeof el == "undefined" || !el) {
            return;
        }

        if (el.tagName.toUpperCase() == "INPUT") {
            el.disabled = false;
        } else {
            D.removeClass(el, "disabled");
        }
    };

    E.onDOMReady(function()
    {
        D.getElementsByClassName("search", "input", document, function(){
            var initialValue = this.title;

            var frm = D.getAncestorByTagName(this, "FORM");
            var submitButton;

            var inputs = frm.getElementsByTagName("input");
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "submit") {
                    submitButton = inputs[i];
                    break;
                }
            }

            if (!submitButton) {
                var niceButton = D.getElementsByClassName("submitButton", "span", frm)[0];
                if (niceButton) {
                    submitButton = niceButton.getElementsByTagName("a")[0];
                }
            }

            if (SKYPE.util.Browser.isSafari) {
                this.setAttribute('type',      "search");
                this.setAttribute('accesskey', "s");
                this.setAttribute('autosave',  "com.skype."+this.id+"_history");
                this.setAttribute('results',   "5");
            }
            if (this.value == "") {
                this.value = initialValue;
            }
            if (this.value == initialValue) {
                this.style.color = "#666666";
                _setDisabled(submitButton);
            }
            E.addListener(this, "focus", function() {
                if(this.value == initialValue) {
                    this.style.color = "#000000";
                    this.value = "";
                    _setEnabled(submitButton);
                }
            });
            E.addListener(this, "blur", function() {
                if(this.value == "") {
                    this.style.color = "#666666";
                    this.value = initialValue;
                    _setDisabled(submitButton);
                }
            });
        });
    });
}();


/**
 * Add form.submit() funcionality to nice <a> buttons
 *
 * Adds submit() handler to links which have 'formSubmit' class. Triggers submit() event
 * on the parent form. If no form was found, no click handler will be added and link will
 * act as it should.
 */
SKYPE.navigation.formSubmitLinks = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function() {
        D.getElementsByClassName("formSubmit", "a", document, function(){
            var f = SKYPE.findParentTag(this, "form");
            if (f) {
                E.addListener(this, "click", cancelDefault);
                E.addListener(this, "click", function(){
                    f.submit();
                });
            }
        });
    });
}();

/**
 * Align elements to the center. Element parentNode must be wider than element
 */
SKYPE.util.alignElementToCenter = function(element) {
    if (typeof element != "undefined") {
        var elementParent = element.parentNode;
        var elementParentWidth = parseInt(elementParent.offsetWidth) - (parseInt(D.getStyle(elementParent, "padding-left")) + parseInt(D.getStyle(elementParent, "padding-right")));
        if (elementParentWidth > element.offsetWidth) {
            var leftMargin = (elementParentWidth - element.offsetWidth) / 2 + "px";   
            // set element to the center
            D.setStyle(element, "margin-left", leftMargin);        
        }
    }
};

/**
 * Fancy Tooltips
 *
 * Shows nice tooltip instead of generic browser `title` parameter.
 *
 * Usage:
 * <code>
 *  <a href="link.html" title="I'm a fancy tooltip" class="tooltip">hover me</a>
 * </code>
 *
 * Required: animation.js
 */
SKYPE.util.FancyTips = function() {
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    var A = YAHOO.util.Anim;

    E.onDOMReady(function(){
        
        if (typeof A == "undefined" || !A || !D.getElementsByClassName("tooltip")) {
            return;
        }
        
        // Create tooltip element if not present
        if (!D.get("fancyTip")) {
            var tip = document.createElement("div");
            tip.id = "fancyTip";
            tip.innerHTML = "<div class='pointer'></div><div class='tip'></div>";
            document.body.appendChild(tip);
        }

        // Define mouseover animation
        var animIn = new A(tip, {
            opacity: { to: 1},
            top: { by: -5 }
        }, 0.1);

        // Define mouseout animation
        var animOut = new A(tip, {
            opacity: { to: 0},
            top: { by: 5 }
        }, 0.08);
        animOut.onComplete.subscribe(function(){
            D.setXY(tip, [-100, -100]);
        });

        // Attach tooltips to elements with class="tooltip"
        D.getElementsByClassName("tooltip", "", document, function() {

            if (typeof this.title != "undefined" && this.title) {
                // Mouseover
                E.addListener(this, "mouseover", function() {
                    if (animOut.isAnimated()) {
                        animOut.stop();
                    }

                    var tipLoc = D.getXY(this);
                    D.setStyle(tip, 'opacity', 0);
                    var elementHeight = this.offsetHeight;
                    D.setXY(tip, [tipLoc[0] - 5, tipLoc[1] + elementHeight]);

                    var text = D.getElementsByClassName("tip", "", tip)[0];
                    text.innerHTML = this.title;
                    this.title = "";

                    animIn.animate();
                });

                // Mouseout
                E.addListener(this, "mouseout", function() {
                    if (animIn.isAnimated()) {
                        animIn.stop();
                    }

                    animOut.animate();
                    var text = D.getElementsByClassName("tip", "", tip)[0];
                    this.title = text.innerHTML;
                });
            }
        });

    });
}();

SKYPE.util.AbBlocksController = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var blocks = 0;
    var currentBlock = 0;

    E.onDOMReady(function() {
        var blockElements = D.getElementsByClassName("abBlockContainer");
        blocks = blockElements.length;
        
        // adds ?ver=1 / ?ver=2 etc feature for debugging
        
        if (location.href.match(/[?&]ver=([^&]+)/)) {
            var blockVersion = location.href.match(/[?&]ver=([^&]+)/)[1];
            // case if user uses ?ver=a/A/b/B for debugging
            if (!parseInt(blockVersion)) {
               blockVersion = blockVersion.toUpperCase().charCodeAt(0) - 64;
            }
        } else {
            var blockVersion = false;
        }
        
        if (blockVersion) {
            if (blockVersion == 0 || blockVersion > blocks ) {
                blockVersion = 1;
            }
            _showBlock(blockVersion);
        }
        
        // define currentBlock
        for (var i = 0; i < blocks; i++) {
            if (!D.hasClass(blockElements[i], "hiddenBlock")) {
                currentBlock = i + 1;
            }
        }
        
    });

    var _showBlock = function(no) {
        var blockElements = D.getElementsByClassName("abBlockContainer");
        blockCount = blockElements.length;

        if (no < 0 || no > blockCount) {
            return;
        }

        if (blockCount > 1) {
            D.replaceClass(blockElements, "shownBlock", "hiddenBlock");
            D.replaceClass(blockElements[no - 1], "hiddenBlock", "shownBlock");
            
            currentBlock = no;
        }
          
    };

    return {
        count: function() {
            return blocks;
        },
        activate: function(no) {
            _showBlock(no);
        },
        current: function() {
            return currentBlock;
        }
    };
}();


/**
 * Triggers automatic downloads
 *
 * Searches for links with '.autodownload' class name and fires the request on them
 */
SKYPE.navigation.AutoDownload = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    E.on(window, "load", function() {
        D.getElementsByClassName('autodownload', 'A', '', function() {
            if (location.href.match(/author-/) == null) {
                location.href = this.href;
            }
        });
    });
}();


/* TODO: Make this pretty */

function hide(elem) {
    var item = document.getElementById(elem);
    if (item) {
        item.style.display = 'none';
    }
}
function show(elem) {
    var item = document.getElementById(elem);
    if (item) {
        item.style.display = '';
    }
}
function selecttab(tab) {
    var tabs = tab.parentNode.parentNode.childNodes;
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].tagName == "LI") {
            tabs[i].className = "";
        }
    }
    tab.parentNode.className = "selected";
}

/* Opens links with class="targetBlank" in new window */

SKYPE.util.targetBlank = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function() {
        var targetBlankLinks = D.getElementsByClassName("targetBlank", "a");
        for (i=0;i < targetBlankLinks.length; i++) {
            E.addListener(targetBlankLinks[i], "click", SKYPE.util.cancelDefault);
            E.addListener(targetBlankLinks[i], "click", function(){
                window.open(this.href);
                return false;
            });
        }
    });
}();


/* close or open block */
SKYPE.util.toggleBlock = function() {
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    
    E.onDOMReady(function() {
        D.getElementsByClassName('toggleBlock', 'div', '', function() {
            D.addClass(this, 'closed');
        });
        D.getElementsByClassName('toggleTitle', 'div', '', function() {
            D.setStyle(this, 'display', 'block');
        });
        
        var allLinks = D.getElementsByClassName('showContent', 'a');
        E.addListener(allLinks, 'click', SKYPE.util.cancelDefault);
        E.addListener(allLinks, 'click', function() {
            var ancestor = D.getAncestorByClassName(this, 'toggleBlock');
            if (D.hasClass(ancestor,'open')) {
                D.removeClass(ancestor, 'open');
                D.addClass(ancestor, 'closed');
            } else {
                D.removeClass(ancestor, 'closed');
                D.addClass(ancestor, 'open');
            }
        });
    });
}();

/* translations for download flow */
SKYPE.helpers.Translations = function(lang, string) {
    if (typeof lang == "undefined" || typeof string == "undefined") {
        return "";
    }
    var language = lang;
    var text = string;

    var translations = [
        ["AR",[
            ["register_and_download","تسجيل وتنزيل"]
        ]],
        ["BR",[
            ["register_and_download","Registrar-se e fazer o download"]
        ]],
        ["CS",[
            ["register_and_download","Registrovat se a stáhnout"]
        ]],
        ["DA",[
            ["register_and_download","Registrer dig og hent Skype"]
        ]],
        ["DE",[
            ["register_and_download","Registrieren und herunterladen"]
        ]],
        ["EN",[
            ["register_and_download","Register and download"]
        ]],
        ["ES",[
            ["register_and_download","Regístrate y descarga"]
        ]],
        ["ET",[
            ["register_and_download","Registreeru ja laadi alla"]
        ]],
        ["FI",[
            ["register_and_download","Rekisteröidy ja lataa"]
        ]],
        ["FR",[
            ["register_and_download","S’inscrire et télécharger"]
        ]],
        ["HU",[
            ["register_and_download","Regisztrálás és letöltés"]
        ]],
        ["IT",[
            ["register_and_download","Registrati e scarica"]
        ]],
        ["JA",[
            ["register_and_download","登録してダウンロード"]
        ]],
        ["KO",[
            ["register_and_download","등록 및 다운로드"]
        ]],
        ["NL",[
            ["register_and_download","Registreren en downloaden"]
        ]],
        ["NO",[
            ["register_and_download","Registrer deg og last ned"]
        ]],
        ["PL",[
            ["register_and_download","Zarejestruj się i pobierz"]
        ]],
        ["PT",[
            ["register_and_download","Fazer registo e descarregar"]
        ]],
        ["RU",[
            ["register_and_download","Pегистрироваться и загрузить"]
        ]],
        ["SV",[
            ["register_and_download","Gå med och ladda ner"]
        ]],
        ["ZH-S",[
            ["register_and_download","注册并下载"]
        ]],
        ["ZH-T",[
            ["register_and_download","註冊與下載"]
        ]],
        ["TR",[
            ["register_and_download","Kaydolun ve yükleyin"]
        ]]
    ];
    
    for (i=0;i<translations.length;i++) {
        if (translations[i][0] == lang) {
            lang = i;
            break;
        }
    }
    
    if (lang == language) {
        return "";
    }
    
    for (j=0;j<translations[lang][1].length;j++) {
        if (translations[lang][1][j][0] == string) {
            string = j;
            break;
        }
    }
    
    if (string == text) {
        return "";
    } else {
        return translations[lang][1][string][1];
    }
};

/* find and replace links */
SKYPE.helpers.UpdateLinks = function(className, client, noClient) {
    if (typeof className == "undefined" || typeof client == "undefined" || typeof noClient == "undefined") {
        return;
    }
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    var url = window.location.pathname;
    var lang = url.match(/intl\/([-a-zA-Z]+)\//)[1].toUpperCase();

    if (lang == "EN-GB" || lang == "EN-US") {
        lang = "EN";
    } if (lang == "ES-ES") {
        lang = "ES";
    } else if (lang == "PT-BR") {
        lang = "BR";
    } else if (lang == "ZH-HANS") {
        lang = "ZH-S";
    } else if (lang == "ZH-HANT") {
        lang = "ZH-T";
    }

    var text = SKYPE.helpers.Translations(lang,"register_and_download");

    E.onDOMReady(function() {

            D.getElementsByClassName("editFlow", "a", document, function() {
                D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","hidden");
            });

            var links = D.getElementsByClassName(className);

            if (typeof SKYPE.util.ClientDetection != "undefined") {
                SKYPE.util.ClientDetection.subscribe(
                    function() {
                        if (SKYPE.util.ClientDetection.getSessionUsername() == "") {
                            if (SKYPE.util.ClientDetection.isInstalled()) {
                                for (i=0;i<links.length;i++) {
                                    links[i].href = client + encodeURIComponent(links[i].href);
                                }
                            } else {
                                for (i=0;i<links.length;i++) {
                                    links[i].href = noClient + encodeURIComponent(links[i].href);
                                    if (text != "") {
                                        D.getChildren(links[i])[0].innerHTML = text;
                                    }
                                }
                            }
                            if (!SKYPE.util.Browser.isIE6 && D.get("downloadButtonWrapper") != null) {
                                SKYPE.util.alignElementToCenter(D.get("downloadButtonWrapper"));
                            }
                            if (!SKYPE.util.Browser.isIE6 && D.get("contentDownloadButtonWrapper") != null) {
                                SKYPE.util.alignElementToCenter(D.get("contentDownloadButtonWrapper"));
                            }
                        }
                        D.getElementsByClassName("editFlow", "a", document, function() {
                            D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","visible");
                        });
                    }
                    ,{}
                    ,false
                    ,function() {
                        SKYPE.log("Client detection failure");
                        D.getElementsByClassName("editFlow", "a", document, function() {
                            D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","visible");
                        });
                    }
                );
            } else {
                D.getElementsByClassName("editFlow", "a", document, function() {
                    D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","visible");
                });
            }
    });
};

/**
 * Adds tooltip to all external links stating that you’re leaveing skype.com (legal requirement)
 */
SKYPE.getExternalLinks = function() {
	var D = YAHOO.util.Dom;
	var E = YAHOO.util.Event;
	var A = YAHOO.util.Anim;
	
	var addNote = function(el) {
		var message = D.get('externalLinkTip');
		var messageHeight = message.offsetHeight;
		
		E.addListener(el, 'mouseover', function() {
		    if (typeof A != "undefined") {
		        var animation = new A(message, { 'top': { from: D.getY(this)-messageHeight-8, to: D.getY(this)-messageHeight }}, 0.2);
    			D.setX(message, D.getX(this)-10);
    			animation.animate();
		    } else {
		        D.setX(message, D.getX(this)-10);
		        D.setY(message, D.getY(this)-messageHeight);
		    }
		});
		E.addListener(el, 'mouseout', function() {
			D.setXY(message, [-1000,-1000]);
		});
	};
	
	var imageCheck = function(list) {
		var x = false;
		for (i=0;i<list.length;i++) {
			if (list[i].tagName.toUpperCase() == "IMG") {
				x = true;
			}
		}
		return x;
	};

	E.onDOMReady(function() {
		var allLinks = document.getElementsByTagName('a');
		var i = allLinks.length;
		
		while (i--) {
			var linkValue = allLinks[i].href;
			if (linkValue && !linkValue.match(/\.skype\.(com|net|test)/)) {
				
				if (imageCheck(D.getChildren(allLinks[i]))) {
					// D.setStyle(allLinks[i], "display", "inline-block");
				}
				addNote(allLinks[i]);
			};
		};
	});
}();

// Deprecated. Remove this include from your site, if you still use it./*global swfobject, container, makeContainerDiv, document, console, aCustomTrackable*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2, regexp: false*/

var SKYPE = SKYPE || {};
SKYPE.inclient = SKYPE.inclient || {};

SKYPE.inclient.Trackable = (function () { 
  
  var createCookie = function (name, value, days) {
  
    var expires = "", 
        host = "",
        dom = "",
        date;

    try {
      host = location.host.split(".");
      if (host.length === 3) {
        dom = "; domain=" + "." + host[1] + "." + host[2];
      }
    }
    catch (err) {}

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    
    document.cookie = name + "=" + value + expires + "; path=/" + dom;
  },

  readCookie = function (name) {
    var nameEQ  = name + "=",
    ca          = document.cookie.split(';'),
    i, c;
    
    for (i = 0; i < ca.length; i = i + 1) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  isAlreadyTagged = function ()
  {
    return ((readCookie("channel_source") !== null) || 
            (readCookie("channel")        !== null));
  },

  eraseCookie = function (name) {
    createCookie(name, "", -1);
  },

  /*********************
   * Trackable Channels  
   *********************/
  
  trackableNatural = function (referrer, url, param) {

    if ((typeof referrer === "undefined") || 
        referrer === ""                   ||
        (param.indexOf("cm_mmc=") !== -1) || /* exclude when cm_mmc= */ 
        (param.indexOf("source=") !== -1)) {
      return false;
    }
    
    var segment = { cookie: "", cookie_time: 90 },
    
    sengs   = [ /* Order matters, because it stops eval when match */
      { regex: /google\..*(\?q=|&q=)([^&]+).*/,                    cookie: "259" },
      { regex: /yahoo\.co.*(\?p=|&p=)([^&]+).*/,                   cookie: "260" },
      { regex: /bing\..*(\?q=|&q=)([^&]+).*/,                      cookie: "261" },
      { regex: /msn\..*(\?q=|&q=)([^&]+).*/,                       cookie: "261" },
      { regex: /^http:\/\/search\.live\.com.*(\?q=|&q=)([^&]+).*/, cookie: "261" },
      { regex: /yandex\.ru\/.*([\?|&]text=)([^&]+).*/,             cookie: "353" }
    ],

    tkey;
    
    for (tkey in sengs) {
      if (referrer.match(sengs[tkey].regex)) {
        segment.cookie = sengs[tkey].cookie;
        return segment;
      }
    }   
  },

  trackableTagger = function (referrer, url, param) {
    
    var tags = {
      "cm_mmc=paids|":                      { cookie: "225", cookie_time: 90 },
      "cm_mmc=afcj|":                       { cookie: "211", cookie_time: 90 },
      "cm_mmc=hp-_-promo-_-client-_-08":    { cookie: "161", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-ctaf": { cookie: "212", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-wtaf": { cookie: "213", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-ftaf": { cookie: "374", cookie_time: 90 },
      "cm_mmc=banna|sg":                    { cookie: "223", cookie_time: 90 },

      "cm_mmc=banap|paidart-_-apac|jp|ja-_-paidart-_-txtfree": { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|travel|au|en-_-wego-_-bonus1":             { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|travel|au|en-_-wego-_-bonus2":             { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|creditcard-_-apac|jp|ja-_-jcb-_-txtfree":  { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-network-_-bnr300":   { cookie: "345", cookie_time: 90 }
    },
    tag = "";
    
    for (tag in tags) {
      if (param.indexOf(tag) !== -1) {
        return tags[tag];
      }
    }
    
  },

  trackableTransparent = function (referrer, url, param) {    

    if (param.indexOf("cm_mmc=") === -1) {
      return false;
    }

    var segment = {cookie: "", cookie_time: 90},
        tagvals = param.split("-_-");

    if ((tagvals.length          ===  3) &&  /* should contain 3 parts */ 
        (tagvals[1].indexOf("z") ===  0) &&  /* 2rd param should start with Z */ 
        (tagvals[0].indexOf("|") !== -1)) {  /* 1st param should contain a | */ 
      segment.cookie = tagvals[1].replace("z", "");
      return segment;
    } 
  },


  /* ******** */

  getAllSegmentMethods = function () { 
    return [trackableNatural,
            trackableTagger,
            trackableTransparent];
  };
  
  return {

    segment: function (referrer, url, search) {
      
      if (isAlreadyTagged()) {
        return false;
      }

      var f_referrer  = (referrer || "").toLowerCase(),
      f_url           = (url || "").toLowerCase(),
      f_param         = decodeURIComponent(search || "").toLowerCase(),

      all_segment     = getAllSegmentMethods(),
      segment         = null,
      i;

      for (i = 0; i < all_segment.length; i = i + 1) { 
        segment = all_segment[i](f_referrer, f_url, f_param);
        if ((typeof segment !== "undefined") && segment && 
            (typeof segment.cookie_time === "number") &&
            (typeof segment.cookie === "string") && segment.cookie !== "") {
          createCookie("channel", segment.cookie, segment.cookie_time);
          return ("channel:" + segment.cookie + ":" + segment.cookie_time);
        }
      }
    }
  };
}());


SKYPE.inclient.Trackable
  .segment(document.referrer, location.pathname, location.search);
/*global YAHOO, SKYPE, swfobject, container, makeContainerDiv, document, console, pageTracker, aCustomInclient*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

if (typeof SKYPE.inclient === "undefined") {
  SKYPE.namespace("inclient");
}

SKYPE.inclient.Acquisition = (function () {
  
  var the_referrer  = document.referrer.toLowerCase(),
  the_url           = location.pathname.toLowerCase(),
  the_param         = (decodeURIComponent(location.search)).toLowerCase(),
  
  getCMTagValues = function (a_param) {
    
    var a_temp,
    segment     = { channel: "", source: "", group: "", detail: ""};
    
    if (a_param.indexOf("cm_mmc=") === -1) {
      return false; //if no cm_mmc, drops off
    }
    
    /* get the cm_mmc part */
    a_temp = a_param.match(/cm_mmc=([^&]*)/)[1];
    
    /* breaks into 4 */
    a_temp = a_temp.split("-_-");
    
    if (a_temp.length === 4) {
      segment.channel = a_temp[0];
      segment.source  = a_temp[1];
      segment.group   = a_temp[2];
      segment.detail  = a_temp[3];

      return segment;
    }
    else {
      return false;
    }
  },
  
  isSegmentValid = function (segment) {
    return ((typeof segment.channel !== "undefined") && (typeof segment.source !== "undefined") &&
            (typeof segment.group !== "undefined") && (typeof segment.detail !== "undefined"));
  },
  
  isInClientValid = function (acquisition_channel, partner_site, group, detailed_source) {
    return ((typeof acquisition_channel !== "undefined") && acquisition_channel.match(/^[A-Z-_|\.0-9]+$/i) &&
            (typeof partner_site !== "undefined") && partner_site.match(/^[A-Z-_|\.0-9]+$/i) &&
            (typeof group !== "undefined") && group.match(/^[A-Z-_|\.0-9]+$/i) &&
            (typeof detailed_source !== "undefined"));
  },

  isTransparentTag = function (tag) {
    
    /* should contain cm_mmc*/
    if (tag.indexOf("cm_mmc=") === -1) {
      return false; 
    }

    var tagvals = tag.split("-_-");

    if ((tagvals.length          ===  3) &&  /* should contain 3 parts */ 
        (tagvals[1].indexOf("z") ===  0) &&  /* 2rd param should start with Z */ 
        (tagvals[0].indexOf("|") !== -1)) {  /* 1st param should contain a | */ 
      return tagvals;
    } 
    else {
      return false;
    }
  },

  writeTrackingFlash = function (trackingFlashUrl, acquisition_channel, partner_site, group, detailed_source) {
    var params = {
      wmode: "transparent",
      allowScriptAccess: "always"
    },
        flashvars = {
      acquisition_channel: acquisition_channel,
      partner_site: partner_site,
      group: group
    },
       divId;
    if (typeof detailed_source !== "undefined") {
      flashvars.detailed_source = detailed_source;
    }
    
    divId = makeContainerDiv("inclientreportingFlashDiv").id;
    swfobject.embedSWF(trackingFlashUrl, divId, 3, 3, "9.0.0", null, flashvars, params, {id: "trackFls", bgcolor: "#FFFFFF"});
  },
  
  makeContainerDiv = function (divId) {
    var container = document.createElement("DIV");
    container.id = divId;
    YAHOO.util.Dom.setStyle(container, "position", "absolute");
    YAHOO.util.Dom.setStyle(container, "width", "3px");
    YAHOO.util.Dom.setStyle(container, "height", "3px");
    YAHOO.util.Dom.setStyle(container, "font", "1px monospace");
    YAHOO.util.Dom.setStyle(container, "top", "0px");
    YAHOO.util.Dom.setStyle(container, "left", "0px");
    document.body.appendChild(container);
    return container;
  },
  
  /**********************
   *  Reporting Methods */
  inClientReport = function (acquisition_channel, partner_site, group, detailed_source) {

    if (!isInClientValid(acquisition_channel, partner_site, group, detailed_source)) {
      return false;
    }

    var MODE = SKYPE.settings.waMode,
    trackingFlashUrl = (MODE === "production") ? "" + SKYPE.settings.assetsPath + "/apps/inclient/tracker.swf" :
      "" + SKYPE.settings.assetsPath + "/apps/inclient/tracker-pretrack.swf";
    if (MODE === "production") {
      writeTrackingFlash(trackingFlashUrl, acquisition_channel, partner_site, group, detailed_source);
    }
    else {
      if ((typeof console !== "undefined") && (typeof console.log !== "undefined")) {
        console.log("Inclient.report: ", arguments);
      }
      writeTrackingFlash(trackingFlashUrl, acquisition_channel, partner_site, group, detailed_source);
    }
    return true;
  },

  /*************
   * Inclient Channels  
   *************/

  /* All the channels bellow are invoked in pre-defined way, 
   * so all are required to have same interfacing rules:
   * - inclient... = function (a_referrer, a_url, a_param) {
   * - return false, when no channel found.
   * - return { channel: "", source: "", group: "", detail: ""}, when channel found.
   */
  
  inclientNatural = function (a_referrer, a_url, a_param) {

    //Excluding the stuff coming in with marketing tags
    if ((typeof a_referrer === "undefined") || a_referrer === "" ||
	(a_param.indexOf("cm_mmc=") !== -1) || (a_param.indexOf("source=") !== -1)) {
      return false;
    }

    var segment = { channel: "", source: "", group: "", detail: ""},

    s_engines   = {/*Order matters, because it stops eval when match*/
      "google-suggest": /google\..*(\?q=|&q=)([^&]+).*source=suggest.*/,
      "google":         /google\..*(\?q=|&q=)([^&]+).*/,
      "yahoo":          /yahoo\.co.*(\?p=|&p=)([^&]+).*/,
      "bing":           /bing\..*(\?q=|&q=)([^&]+).*/,
      "msn":            /msn\..*(\?q=|&q=)([^&]+).*/,
      "msn.live":       /^http:\/\/search\.live\.com.*(\?q=|&q=)([^&]+).*/,
      "yandex":         /yandex\.ru\/.*([\?|&]text=)([^&]+).*/,
      "baidu":          /baidu\.com\/.*([\?|&]wd=)([^&]+).*/,
      "naver":          /naver\.com\/.*([\?|&]query=)([^&]+).*/,
      "ayna":           /ayna\.com\/.*(\?q=|&q=)([^&]+).*/,
      "wala":           /search\.walla\.co\.il\/.*(\?q=|&q=)([^&]+).*/
    },

    the_params  = {
      "google":         /q=([^&]*)/,
      "google-suggest": /q=([^&]*)/,
      "yahoo":          /p=([^&]*)/,
      "bing":           /q=([^&]*)/,
      "msn":            /q=([^&]*)/,
      "msn.live":       /q=([^&]*)/,
      "yandex":         /text=([^&]*)/,
      "baidu":          /wd=([^&]*)/,
      "naver":          /query=([^&]*)/,
      "ayna":           /q=([^&]*)/,
      "wala":           /q=([^&]*)/
    },
    
    tkey, tkey2;

    //figure out which engine
    for (tkey in s_engines) {
      if (a_referrer.match(s_engines[tkey])) {
        segment.channel = "natural-search";
        segment.source = tkey;
        break;
      }
    }

    if (segment.channel === "") {
      return false; //no inclient neither cookie, drops off
    }

    //figure out the local
    segment.group = a_referrer.replace("http://", "").split("/")[0];

    //figure out the search keyword
    for (tkey2 in the_params) {
      if (tkey2 === segment.source) {
        segment.detail = a_referrer.match(the_params[tkey2])[1];
        break;
      }
    }
    return segment;
  },
  
  inclientTagger = function (a_referrer, a_url, a_param) {
    
    var tags = [
      "cm_mmc=paids|",
      "cm_mmc=aff",
      "cm_mmc=banem|cnn", 
      "cm_mmc=banla|",
      "cm_mmc=banna|", 
      "cm_mmc=banap|", 
      "cm_mmc=viral|",
      "cm_mmc=socialm"
    ],
    idx = 0;
    
    for (idx in tags) {
      if (a_param.indexOf(tags[idx]) !== -1) {
        return getCMTagValues(a_param);
      }
    }
    return false; //none matched, so drops off
  },

  /* To be used, to directly report values 
   * variables to be used:
   * var aCustomInclient = { channel: "", source: "", group: "", detail: ""};
   */
  inclientCustom = function (a_referrer, a_url, a_param) {
    if (typeof aCustomInclient !== "undefined") {
      return aCustomInclient;
    }
  },

  inclientTransparent = function (a_referrer, a_url, a_param) {

    var segment = { channel: "", source: "", group: "", detail: ""},
        isTrans = isTransparentTag(a_param);

    // if is not a Trans tag then drop off.
    if (!isTrans) {
      return false;
    }
        
    segment.channel = isTrans[0].split("|")[0].replace("cm_mmc=", "").replace("?", "");
    segment.source  = isTrans[0].split("|")[1];
    segment.group   = isTrans[1];
    segment.detail  = isTrans[2];
    
    return segment;
 
  },

  getAllSegmentMethods = function () {
    return [inclientNatural, inclientTagger, inclientCustom, inclientTransparent];
  };

  YAHOO.util.Event.onDOMReady(function () {
    SKYPE.inclient.Acquisition.segment(the_referrer, the_url, the_param);
  });

  return {

    //SKYPE.inclient.Acquisition.segment();
    segment: function (a_referrer, a_url, a_param) {

      var f_referrer = (a_referrer || the_referrer).toLowerCase(),
      f_url          = (a_url || the_url).toLowerCase(),
      f_param        = (decodeURIComponent(a_param || the_param)).toLowerCase(),
      all_segment    = getAllSegmentMethods(),
      segment        = null,
      sucess         = false, 
      i;

      for (i = 0; i < all_segment.length; i = i + 1) {
        segment = all_segment[i](f_referrer, f_url, f_param);
        if (segment && isSegmentValid(segment) && segment.channel !== "") {
          sucess = inClientReport(segment.channel, segment.source, segment.group, segment.detail);
          break;
        }
      }

      return ((sucess) ? "channel:" + segment.channel + ";source:" + segment.source +
              ";group:" + segment.group + ";detail:" + segment.detail : false);
    }
  };
}());
// Deprecated. All sampling is now in PHP. Automatic download trigger moved to skype-helpers
/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();SKYPE.namespace("util");SKYPE.util.ClientDetection=function(){var _loaded=false;var _available=false;var _detectionSwfUrl="http://api.skype.com/detection/detection_as3.swf";var _detectionSwfID="detectionswf";var _containerID="detection-container";var _failureTimeout=5000;var _verbose=false;var D=YAHOO.util.Dom;var E=YAHOO.util.Event;var _so={};var _sessionso={};var _loadDetection=function(){if(_loaded){return;}if(typeof SWFObject=="undefined"){return;}var container=D.get(_containerID);if(!container){container=document.createElement("DIV");container.id=_containerID;D.setStyle(container,"position","absolute");D.setStyle(container,"width","10px");D.setStyle(container,"height","10px");D.setStyle(container,"font","1px monospace");D.setStyle(container,"top","0px");D.setStyle(container,"left","-10px");D.setStyle(container,"overflow","hidden");document.body.appendChild(container);log("Created detection container div#"+_containerID);}var so=new SWFObject(_detectionSwfUrl,_detectionSwfID,"10","10","9","#FFFFFF");so.addParam("allowScriptAccess","always");so.write(_containerID);log("Created Flash detection object inside container");_loaded=true;window.setTimeout(_failureCheck,_failureTimeout);};var _getItem=function(name){if(typeof _so[name]=="undefined"||_so[name]==null||(typeof _so[name]=="string"&&!_so[name].length)||_so[name]=="null"){return null;}return _so[name];};var _failureCheck=function(){if(!_available){log("Triggering failure since failure check timout was called");onDetectionFailure.fire();}};var _readSWFData=function(){try{log("Reading detection data from SWF");var swf=D.get(_detectionSwfID);var soData=swf.getSharedObjectData();var sessionData=swf.getSessionData();SKYPE.util.ClientDetection.setSharedObjectData(soData,sessionData);}catch(e){log("Reading data from detection SWF failed - "+e);}};var log=function(msg){if(_verbose&&typeof console!="undefined"&&console.log){console.log("[ClientDetection] "+msg);}};var onDetectionAvailable=new YAHOO.util.CustomEvent("onDetectionAvailable");var onDetectionFailure=new YAHOO.util.CustomEvent("onDetectionFailure");onDetectionAvailable.subscribe(function(){_available=true;YAHOO.util.Dom.setStyle(_containerID,"visibility","hidden");});return{setVerbose:function(verbose){_verbose=verbose;log("Toggled verbose mode on");},setSWF:function(swfUrl){_detectionSwfUrl=swfUrl;log("Set SWF URL to "+swfUrl);},isReady:function(){return _available;},ready:function(){log("Got notice from Flash detection that it is ready");window.setTimeout(_readSWFData,10);return true;},setSharedObjectData:function(data,sessionData){_so=data;_sessionso=sessionData||{};log("Set detection data inside ClientDetection, calling onDetectionAvailable event");onDetectionAvailable.fire();return true;},isInstalled:function(){return _getItem("ui_version")!=null;},isAbandonedInstall:function(){var installDate=_getItem("ui_installdate");var timeNow=(new Date()).getTime()/1000;var downloadDate=_getItem("download_date");var timeFromDownload=timeNow-downloadDate;var minAbandonTime=5*60;var maxAbandonTime=8*24*60*60;return(installDate==null&&downloadDate!=null&&timeFromDownload>minAbandonTime&&timeFromDownload<maxAbandonTime);},getVersion:function(){return _getItem("ui_version");},getPlatform:function(){var version=_getItem("os_version");if(version){if(version.indexOf("Macintosh")!=-1){return"macosx";}else{if(version.indexOf("Linux")!=-1){return"linux";}}return"windows";}return null;},getPlatformID:function(){switch(SKYPE.util.ClientDetection.getPlatform()){case"windows":return 0;case"macosx":return 3;case"linux":return 2;}return"";},getOSTimezone:function(){return _getItem("os_timezone")||parseInt(new Date().getTimezoneOffset()/60);},getProfileTimezone:function(){return _getItem("ui_timezone");},getSessionUsername:function(){if(typeof _sessionso.username=="string"){var timeNow=(new Date()).getTime()/1000;if(typeof _sessionso.expires!="undefined"&&_sessionso.expires<timeNow){try{log("Session seems to have expired, clearing it in SWF");D.get(_detectionSwfID).clearSessionData();}catch(e){}return"";}return _sessionso.username;}return"";},getSkypeUserAge:function(){var installed=_getItem("ui_installdate");if(typeof installed=="string"){installed=parseInt(installed);}if(installed==null||isNaN(installed)||installed==0){return -1;}var age=Math.floor(((new Date()).getTime()/1000-installed)/60/60/24);return age;},getUserSegment:function(){return _sessionso.segment?_sessionso.segment:"";},setUserSegment:function(segment){try{var swf=D.get(_detectionSwfID);if(swf.setUserSegment){swf.setUserSegment(segment);_sessionso.segment=swf.getUserSegment();}}catch(e){}},isQualifiedVersion:function(reqver,thisver){var ver=(thisver||_getItem("ui_version")).split(".");reqver=reqver.split(".");try{if(parseInt(ver[0])>parseInt(reqver[0])||(parseInt(ver[0])==parseInt(reqver[0])&&parseInt(ver[1])>parseInt(reqver[1]))||(parseInt(ver[0])==parseInt(reqver[0])&&parseInt(ver[1])==parseInt(reqver[1])&&parseInt(ver[3])>=parseInt(reqver[3]))){return true;}}catch(e){}return false;},subscribe:function(fn,obj,override,failurefn){onDetectionAvailable.subscribe(fn,obj,override);E.onDOMReady(_loadDetection,null,this);if(typeof failurefn=="function"){onDetectionFailure.subscribe(failurefn,obj,override);}}};}();SKYPE.util.ConditionalContent = function()
{
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    
    var alts;
    
    E.onDOMReady(function()
    {
        // Get all alternative content blocks
        alts = D.getElementsByClassName("alternative", "DIV", document.body, function()
        {
            // Hide if it's not default block
            D.setStyle(this, "display", (D.hasClass(this, "cond-default") ? "block" : "none"));
        });
    });
    
    var filters = {
        "30days": function()
        {
            var age = SKYPE.util.ClientDetection.getSkypeUserAge();
            if (age >= 1 && age <= 30)
            {
                return D.getElementsByClassName("cond-30days", "DIV");
            }
            return [];
        }
        ,"existing": function()
        {
            var installed = SKYPE.util.ClientDetection.isInstalled();
            if (installed)
            {
                return D.getElementsByClassName("cond-existing", "DIV");
            }
            return [];
        }
    };
    
    _getFiltered = function()
    {
        var result = [];
        var tmp;
        for (filter in filters)
        {
            tmp = filters[filter]();
            //SKYPE.log("Running conditionals filter "+filter+" found "+tmp.length+" items");
            result = result.concat(tmp);
            if (result.length) break;
        }
        return result;
    };
    
    return {
        run: function()
        {
            SKYPE.util.ConditionalContent.cookify();
            SKYPE.util.ConditionalContent.switchAlternatives();
            SKYPE.util.ConditionalContent.toggleUsername();
			//SKYPE.util.ConditionalContent.checkAbandonedDownload();
            //SKYPE.util.ConditionalContent.switchPages();
        }
		
		,checkAbandonedDownload: function()
		{
			//SKYPE.log("check abandon install")
			var installed = SKYPE.util.ClientDetection.isInstalled();
            var abandonInstall = SKYPE.util.ClientDetection.isAbandonedInstall();
			var root = this._getRoot();
            
			if (!installed && location.pathname == root && abandonInstall)
			{
		        location.href = root + "completedownload/";
			}
		}
		
		
		,_getRoot: function() 
		{
		    var root = "";
            // Top root / or /intl/xx/ root
            var rootRE = /^(\/|\/intl\/[^\/]+\/)(useskype\/)?$/;
            
            // Check if we are on root page
            var result = location.pathname.match(rootRE);
            if (result)
            {
                root = result[1];
            }
			return root;
		}
		
		,cookify: function()
		{
            var installed = SKYPE.util.ClientDetection.isInstalled();
            var age = SKYPE.util.ClientDetection.getSkypeUserAge();
            
            // Set the profile value in SC cookie
            var modTime = SKYPE.user.Preferences.getTimeModified();
            
            // SKYPE.log("Checking if should cookify user, installed: "+installed+", modtime: "+modTime);

            if (installed)
            {
                var modify = false;
                // 24 hours delay is for new user check
                if (isNaN(modTime) || modTime < (new Date()).getTime() / 1000 - 60*60*24)
                {
                    SKYPE.log("Modification time is more than a day ago, checking profile");
                    if (age > 30)
                    {
                        SKYPE.log("Setting cookie profile to: existing");
                        SKYPE.user.Preferences.setClientProfile("existing");
                    }
                    else
                    {
                        SKYPE.log("Setting cookie profile to: 30days");
                        SKYPE.user.Preferences.setClientProfile("30days");
                    }
                    modify = true;
                }

                // Check wether client version has been updated
                var skypeVer = SKYPE.util.ClientDetection.getPlatformID()+"/"+SKYPE.util.ClientDetection.getVersion()+"/";
                
                // Ignore when source=installer etc is on URL
                if (skypeVer != SKYPE.user.Preferences.getVersion() && location.search.indexOf("source=") == -1) {
                    SKYPE.log("Setting installed version to "+skypeVer);
                    SKYPE.user.Preferences.setVersion(skypeVer);
                    modify = true;
                }

                // Only update cookie if needed
                if (modify) {
                    SKYPE.log("Updating cookie with client profile info");
                    SKYPE.user.Preferences.save();
                }
            }
        }
        
        ,switchPages: function()
        {
            // 
            // if landing on root
            //  - send to useskype if known user
            // 
            // if landing on useskype
            //  - send to completedownload if known download abandoner
            //  - send to newtoskype if seems totally new
            //  - send to welcomeback if returning user age > 30 days
            //  - leave on useskype if known and age < 30 days
            // 
			
            var installed = SKYPE.util.ClientDetection.isInstalled();
            var age = SKYPE.util.ClientDetection.getSkypeUserAge();
            var root = this._getRoot();
            
            // known user on front page
            if (installed && location.pathname == root)
            {
                // returning user age > 30 days
                if (age > 30)
                {
                    location.href = root+"welcomeback/";
                }
                else
                {
                    location.href = root+"welcomeback/";
                }
            }
            else if (location.pathname == root+"useskype/")
            {
                // seems totally new
                if (!installed)
                {
                    location.href = root+"welcomeback/";
                }
                // returning user age > 30 days
                else if (installed && age > 30)
                {
                    location.href = root+"welcomeback/";
                }
                // known and age < 30 days
                else if (installed && age < 30)
                {
                    SKYPE.log("Leave on existing page");
                }
                // known download abandoner
                // TODO: add completedownload check with other SO data
            }
        }
        
        ,switchAlternatives: function()
        {
            //SKYPE.log("Switching alternative content blocks");
            
            var enableAlts = _getFiltered();
            if (enableAlts.length)
            {
                D.setStyle(enableAlts, "display", "block");
                SKYPE.util.ConditionalContent.hideDefaults();
            }
            else
            {
                SKYPE.util.ConditionalContent.showDefaults();
            }
        }
        ,showDefaults: function()
        {
            D.getElementsByClassName("cond-default", "DIV", document.body, function()
            {
                D.setStyle(this, "display", "block");
            });
        }
        ,hideDefaults: function()
        {
            D.getElementsByClassName("cond-default", "DIV", document.body, function()
            {
                D.setStyle(this, "display", "none");
            });
        }
        
        ,toggleUsername: function()
        {
            if (typeof SKYPE.util.ClientDetection == "undefined"
                || typeof SKYPE.util.ClientDetection.getSessionUsername == "undefined")
            {
                return;
            }
            var username = SKYPE.util.ClientDetection.getSessionUsername();
            
            if (!username.length) return;
            
            if (D.get("loggedin-username")) D.get("loggedin-username").innerHTML = username.replace(/[<>]/, "");
            
            if (D.get("loggedin-welcome")) D.setStyle(D.get("loggedin-welcome"), "display", "inline");
            if (D.get("loggedin-links")) D.setStyle(D.get("loggedin-links"), "display", "inline");
            if (D.get("loggedin-signout")) D.setStyle(D.get("loggedin-signout"), "display", "inline");
            if (D.get("loggedin-signin")) D.setStyle(D.get("loggedin-signin"), "display", "none");
            if (D.get("loggedin-haveskype")) D.setStyle(D.get("loggedin-haveskype"), "display", "none");
            if (D.get("main-menu-account")) D.setStyle(D.get("main-menu-account"), "display", "inline");
        }
    };
}();

if (typeof SKYPE.util.ClientDetection != "undefined")
{
    SKYPE.util.ClientDetection.subscribe(
        SKYPE.util.ConditionalContent.run
        ,{}
        ,false
        ,function() {SKYPE.log('client detection failure'); }
    );
}
SKYPE.namespace("flash");
SKYPE.flash._player = function(url) {
	var _dynCssReady = false;

	// Dom / event manipulations
	var _getById  = (typeof jQuery != "undefined") ? function(id) { return $("#" + id)[0]; }             : YAHOO.util.Dom.get;
	var _domReady = (typeof jQuery != "undefined") ? function(callback) { $(document).ready(callback); } : function(callback) { YAHOO.util.Event.onDOMReady(callback); };

	var _removeClass = (typeof jQuery != "undefined") ? function(element, className) { $(element).removeClass(className); } : YAHOO.util.Dom.removeClass;
	var _addClass    = (typeof jQuery != "undefined") ? function(element, className) { $(element).addClass(className); }    : YAHOO.util.Dom.addClass;
	
	var _divIds = [];
	
	var _getInternetExplorerVersion = function ()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re	= new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
			  rv = parseFloat( RegExp.$1 );
			}
		return rv;
	};

	var _getLang = function() {
		// get selected language from language bar
		var lang = _getById("userLanguage") && _getById("userLanguage").options[_getById("userLanguage").selectedIndex].value;

		// if no language bar, get it from html attribute (exclude 'en')
		if (!lang) {
			if ("en" != document.getElementsByTagName("html")[0].lang) {
				lang = document.getElementsByTagName("html")[0].lang;
			}
		}

		//trust cookie when no language bar on page
		if (!lang && SKYPE && SKYPE.user && SKYPE.user.Preferences) {
			lang = SKYPE.user.Preferences.getLanguage();
		}

		return lang;
	};


	var writePlayer = function(divId, width, height, conf, bgcolor) {
        var params = {
          menu: "false",
          allowscriptaccess: "always",
          allowfullscreen: "true",
          bgcolor: bgcolor,
          wmode: (conf.transparent ? "transparent" : "opaque")
        };
        var flashvars = conf;

		//autoplay rule from url
		if (document.location.href.indexOf("autoplay") > 0) {
			flashvars.autoPlay = "true";
		}

		//tracking
		if (typeof conf.tracking != "undefined" && typeof s_account != "undefined") {
			flashvars.omniAccount = s_account;
		}

		//language
		if (typeof conf.lang == "undefined") {
			//try to detect document language
			flashvars.lang = _getLang();
		}

		//avoid noflash content flicker in old Firefox and IE
		_removeClass(divId, "jsHidden");
		
        //
        // iPhone uses .mov embed code
        //
		var isIPhone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i));
		var hasIPhoneMovie = (typeof conf.iphoneUrl != "undefined");
		if (isIPhone && hasIPhoneMovie) {
			writeIPhone(divId, conf.iphoneUrl, width, height);
		}
		
        //
        // Using SWFObject 2.x library (http://code.google.com/p/swfobject/)
        //
		else if (typeof swfobject != "undefined" && swfobject.embedSWF) {
		    var attributes = {
              id: divId,
              name: divId
            };
            
		    swfobject.embedSWF(url, divId, width, height, "9.0.0","/i/flash/expressinstall.swf", flashvars, params, attributes);
		}
		
		//
        // Using SWFObject 1.5 library (http://blog.deconcept.com/swfobject/)
        //
        else if (typeof SWFObject != "undefined") {
            var id = "videoPlayer" + _divIds.length;
            
    		var so = new SWFObject(url, id, width, height, 9, bgcolor);
    		so.useExpressInstall('/i/flash/expressinstall.swf');
    		
    		// inject flashvars
    		for (name in flashvars) {
            	so.addVariable(name, flashvars[name]);
        	}
        	// inject params
        	for (name in params) {
            	so.addParam(name, params[name]);
        	}
    		so.write(divId);
    		
    		//Register flash div id
            _divIds.push(divId);
		}
 	};


	var writeIPhone = function(divId, url, width, height) {
		if (_getById(divId)) {
			_getById(divId).innerHTML = '<embed src="'+url+'" target="myself" width="'+width+'" height="'+height+'" controller="false" autoplay="false" scale="1" cache="true" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"/>';
		}
	};
	
	//returns flash object based on original div
	var getSwf = function(divId) {
		var id = divId;
		var obj = false;
		
		//for swfobject 1.5
		for (i in _divIds) {
			if (_divIds[i] == divId) {
				id = "videoPlayer"+i;
			}
		}
		var ieVersion = _getInternetExplorerVersion();
		if (ieVersion > -1 && ieVersion < 8) {
			obj = window[id];
		}
		
		obj = document[id];
		return obj;
		// return (navigator.appName.indexOf("Microsoft") != -1 ? window[id] : document[id]);
	};


	return {
		//SKYPE.flash.VideoPlayer.write();
		write: function(divId, width, height, conf, bgcolor) {
			//error conditions
			if (arguments.length < 4 || typeof conf != "object") {
				return;
			}

			// Load dynamic css file that contains jsHidden class which hides "no flash installed" alert warning
			if (!_dynCssReady && SKYPE.loadCss) {
				SKYPE.loadCss(SKYPE.settings.assetsPath+'/i/css/dynamic.css');
				_dynCssReady = true;
			}

			_domReady(function() {
				writePlayer(divId, width, height, conf, bgcolor || "#FFFFFF");
			});
		}
		,stop: function(divId) {
			try {
				var swf = getSwf(divId);
				if (swf) {
					swf.stopVideo();
				}
			} catch(e) {}
		},
		hasFlash: function() {
			//SWFObject 2.2 
			if (typeof swfobject != "undefined" && swfobject.hasFlashPlayerVersion) { 
				return swfobject.hasFlashPlayerVersion("9.0.0");
			}
			//SWFObject 1.5 
			else if (typeof SWFObject != "undefined") {
				return true;
			} else {
			    return false;
			}
		}
	};
};

SKYPE.flash.VideoPlayer         = SKYPE.flash._player("http://download.skype.com/share/videos/player.swf");
SKYPE.flash.BusinessVideoPlayer = SKYPE.flash._player("http://download.skype.com/share/videos/business/player.swf");

if (SKYPE.settings.waMode == "staging") {
	SKYPE.flash.VideoPlayer         = SKYPE.flash._player("http://download.skype.com/share/videos/player.swf");
	SKYPE.flash.BusinessVideoPlayer = SKYPE.flash._player("http://download.skype.com/share/videos/business/player.swf");
}