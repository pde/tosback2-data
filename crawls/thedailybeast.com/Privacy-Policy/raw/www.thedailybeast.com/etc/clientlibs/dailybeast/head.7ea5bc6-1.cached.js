window.onerror=function(F,C,B){try{if(window.location.hash&&window.location.hash.indexOf("sendDebugReport")>=0){var D=((Math.random()*10000000000000000));
window.location.hash=window.location.hash+";"+D;
var A=document.createElement("img");
A.setAttribute("src","http://www.thedailybeast.com/etc/clientlibs/dailybeast/img/placeholder/blank.png?sendDebugReport&msg="+encodeURIComponent(F)+"&url="+encodeURIComponent(C)+"&linenumber="+encodeURIComponent(B)+"    &id="+D);
A.setAttribute("height","1px");
A.setAttribute("width","1px");
document.body.appendChild(A)
}}catch(E){}return false
};
window.Modernizr=function(AR,AQ,AP){function O(){AN.input=function(B){for(var A=0,C=B.length;
A<C;
A++){T[B[A]]=B[A] in AG
}return T
}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),AN.inputtypes=function(A){for(var F=0,E,D,C,B=A.length;
F<B;
F++){AG.setAttribute("type",D=A[F]),E=AG.type!=="text",E&&(AG.value=AF,AG.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(D)&&AG.style.WebkitAppearance!==AP?(AL.appendChild(AG),C=AQ.defaultView,E=C.getComputedStyle&&C.getComputedStyle(AG,null).WebkitAppearance!=="textfield"&&AG.offsetHeight!==0,AL.removeChild(AG)):/^(search|tel)$/.test(D)||(/^(url|email)$/.test(D)?E=AG.checkValidity&&AG.checkValidity()===!1:/^color$/.test(D)?(AL.appendChild(AG),AL.offsetWidth,E=AG.value!=AF,AL.removeChild(AG)):E=AG.value!=AF)),V[A[F]]=!!E
}return V
}("search tel url email datetime date month week time datetime-local number range color".split(" "))
}function S(B,A){var D=B.charAt(0).toUpperCase()+B.substr(1),C=(B+" "+AB.join(D+" ")+D).split(" ");
return U(C,A)
}function U(B,A){for(var C in B){if(AH[B[C]]!==AP){return A=="pfx"?B[C]:!0
}}return !1
}function W(B,A){return !!~(""+B).indexOf(A)
}function Y(B,A){return typeof B===A
}function AA(B,A){return AC(AD.join(B+";")+(A||""))
}function AC(A){AH.cssText=A
}var AO="2.0.6",AN={},AM=!0,AL=AQ.documentElement,AK=AQ.head||AQ.getElementsByTagName("head")[0],AJ="modernizr",AI=AQ.createElement(AJ),AH=AI.style,AG=AQ.createElement("input"),AF=":)",AE=Object.prototype.toString,AD=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),AB="Webkit Moz O ms Khtml".split(" "),Z={svg:"http://www.w3.org/2000/svg"},X={},V={},T={},R=[],Q=function(A,H,G,F){var E,D,C,B=AQ.createElement("div");
if(parseInt(G,10)){while(G--){C=AQ.createElement("div"),C.id=F?F[G]:AJ+(G+1),B.appendChild(C)
}}E=["&shy;","<style>",A,"</style>"].join(""),B.id=AJ,B.innerHTML+=E,AL.appendChild(B),D=H(B,A),B.parentNode.removeChild(B);
return !!D
},N=function(){function B(E,D){D=D||AQ.createElement(A[E]||"div"),E="on"+E;
var C=E in D;
C||(D.setAttribute||(D=AQ.createElement("div")),D.setAttribute&&D.removeAttribute&&(D.setAttribute(E,""),C=Y(D[E],"function"),Y(D[E],AP)||(D[E]=AP),D.removeAttribute(E))),D=null;
return C
}var A={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};
return B
}(),M,K={}.hasOwnProperty,J;
!Y(K,AP)&&!Y(K.call,AP)?J=function(B,A){return K.call(B,A)
}:J=function(B,A){return A in B&&Y(B.constructor.prototype[A],AP)
};
var P=function(D,C){var B=D.join(""),A=C.length;
Q(B,function(a,I){var H=AQ.styleSheets[AQ.styleSheets.length-1],G=H.cssRules&&H.cssRules[0]?H.cssRules[0].cssText:H.cssText||"",F=a.childNodes,E={};
while(A--){E[F[A].id]=F[A]
}AN.touch="ontouchstart" in AR||E.touch.offsetTop===9,AN.csstransforms3d=E.csstransforms3d.offsetLeft===9,AN.generatedcontent=E.generatedcontent.offsetHeight>=1,AN.fontface=/src/i.test(G)&&G.indexOf(I.split(" ")[0])===0
},A,C)
}(['@font-face {font-family:"font";src:url("https://")}',["@media (",AD.join("touch-enabled),("),AJ,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",AD.join("transform-3d),("),AJ,")","{#csstransforms3d{left:9px;position:absolute}}"].join(""),['#generatedcontent:after{content:"',AF,'";visibility:hidden}'].join("")],["fontface","touch","csstransforms3d","generatedcontent"]);
X.flexbox=function(){function E(G,F,I,H){G.style.cssText=AD.join(F+":"+I+";")+(H||"")
}function A(G,F,I,H){F+=":",G.style.cssText=(F+AD.join(I+";"+F)).slice(0,-F.length)+(H||"")
}var D=AQ.createElement("div"),C=AQ.createElement("div");
A(D,"display","box","width:42px;padding:0;"),E(C,"box-flex","1","width:10px;"),D.appendChild(C),AL.appendChild(D);
var B=C.offsetWidth===42;
D.removeChild(C),AL.removeChild(D);
return B
},X.canvas=function(){var A=AQ.createElement("canvas");
return !!A.getContext&&!!A.getContext("2d")
},X.canvastext=function(){return !!AN.canvas&&!!Y(AQ.createElement("canvas").getContext("2d").fillText,"function")
},X.webgl=function(){return !!AR.WebGLRenderingContext
},X.touch=function(){return AN.touch
},X.geolocation=function(){return !!navigator.geolocation
},X.postmessage=function(){return !!AR.postMessage
},X.websqldatabase=function(){var A=!!AR.openDatabase;
return A
},X.indexedDB=function(){for(var A=-1,B=AB.length;
++A<B;
){if(AR[AB[A].toLowerCase()+"IndexedDB"]){return !0
}}return !!AR.indexedDB
},X.hashchange=function(){return N("hashchange",AR)&&(AQ.documentMode===AP||AQ.documentMode>7)
},X.history=function(){return !!AR.history&&!!history.pushState
},X.draganddrop=function(){return N("dragstart")&&N("drop")
},X.websockets=function(){for(var A=-1,B=AB.length;
++A<B;
){if(AR[AB[A]+"WebSocket"]){return !0
}}return"WebSocket" in AR
},X.rgba=function(){AC("background-color:rgba(150,255,150,.5)");
return W(AH.backgroundColor,"rgba")
},X.hsla=function(){AC("background-color:hsla(120,40%,100%,.5)");
return W(AH.backgroundColor,"rgba")||W(AH.backgroundColor,"hsla")
},X.multiplebgs=function(){AC("background:url(https://),url(https://),red url(https://)");
return/(url\s*\(.*?){3}/.test(AH.background)
},X.backgroundsize=function(){return S("backgroundSize")
},X.borderimage=function(){return S("borderImage")
},X.borderradius=function(){return S("borderRadius")
},X.boxshadow=function(){return S("boxShadow")
},X.textshadow=function(){return AQ.createElement("div").style.textShadow===""
},X.opacity=function(){AA("opacity:.55");
return/^0.55$/.test(AH.opacity)
},X.cssanimations=function(){return S("animationName")
},X.csscolumns=function(){return S("columnCount")
},X.cssgradients=function(){var B="background-image:",A="gradient(linear,left top,right bottom,from(#9f9),to(white));",C="linear-gradient(left top,#9f9, white);";
AC((B+AD.join(A+B)+AD.join(C+B)).slice(0,-B.length));
return W(AH.backgroundImage,"gradient")
},X.cssreflections=function(){return S("boxReflect")
},X.csstransforms=function(){return !!U(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])
},X.csstransforms3d=function(){var A=!!U(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);
A&&"webkitPerspective" in AL.style&&(A=AN.csstransforms3d);
return A
},X.csstransitions=function(){return S("transitionProperty")
},X.fontface=function(){return AN.fontface
},X.generatedcontent=function(){return AN.generatedcontent
},X.video=function(){var A=AQ.createElement("video"),D=!1;
try{if(D=!!A.canPlayType){D=new Boolean(D),D.ogg=A.canPlayType('video/ogg; codecs="theora"');
var C='video/mp4; codecs="avc1.42E01E';
D.h264=A.canPlayType(C+'"')||A.canPlayType(C+', mp4a.40.2"'),D.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"')
}}catch(B){}return D
},X.audio=function(){var A=AQ.createElement("audio"),C=!1;
try{if(C=!!A.canPlayType){C=new Boolean(C),C.ogg=A.canPlayType('audio/ogg; codecs="vorbis"'),C.mp3=A.canPlayType("audio/mpeg;"),C.wav=A.canPlayType('audio/wav; codecs="1"'),C.m4a=A.canPlayType("audio/x-m4a;")||A.canPlayType("audio/aac;")
}}catch(B){}return C
},X.localstorage=function(){try{return !!localStorage.getItem
}catch(A){return !1
}},X.sessionstorage=function(){try{return !!sessionStorage.getItem
}catch(A){return !1
}},X.webworkers=function(){return !!AR.Worker
},X.applicationcache=function(){return !!AR.applicationCache
},X.svg=function(){return !!AQ.createElementNS&&!!AQ.createElementNS(Z.svg,"svg").createSVGRect
},X.inlinesvg=function(){var A=AQ.createElement("div");
A.innerHTML="<svg/>";
return(A.firstChild&&A.firstChild.namespaceURI)==Z.svg
},X.smil=function(){return !!AQ.createElementNS&&/SVG/.test(AE.call(AQ.createElementNS(Z.svg,"animate")))
},X.svgclippaths=function(){return !!AQ.createElementNS&&/SVG/.test(AE.call(AQ.createElementNS(Z.svg,"clipPath")))
};
for(var L in X){J(X,L)&&(M=L.toLowerCase(),AN[M]=X[L](),R.push((AN[M]?"":"no-")+M))
}AN.input||O(),AC(""),AI=AG=null,AR.attachEvent&&function(){var A=AQ.createElement("div");
A.innerHTML="<elem></elem>";
return A.childNodes.length!==1
}()&&function(AS,z){function A(e){var d=-1;
while(++d<v){e.createElement(w[d])
}}AS.iepp=AS.iepp||{};
var y=AS.iepp,x=y.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",w=x.split("|"),v=w.length,u=new RegExp("(^|\\s)("+x+")","gi"),t=new RegExp("<(/*)("+x+")","gi"),c=/^\s*[\{\}]\s*$/,I=new RegExp("(^|[^\\n]*?\\s)("+x+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),H=z.createDocumentFragment(),G=z.documentElement,F=G.firstChild,E=z.createElement("body"),D=z.createElement("style"),C=/print|all/,B;
y.getCSS=function(i,d){if(i+""===AP){return""
}var m=-1,l=i.length,k,j=[];
while(++m<l){k=i[m];
if(k.disabled){continue
}d=k.media||d,C.test(d)&&j.push(y.getCSS(k.imports,d),k.cssText),d="all"
}return j.join("")
},y.parseCSS=function(e){var d=[],f;
while((f=I.exec(e))!=null){d.push(((c.exec(f[1])?"\n":f[1])+f[2]+f[3]).replace(u,"$1.iepp_$2")+f[4])
}return d.join("\n")
},y.writeHTML=function(){var b=-1;
B=B||z.body;
while(++b<v){var h=z.getElementsByTagName(w[b]),g=h.length,f=-1;
while(++f<g){h[f].className.indexOf("iepp_")<0&&(h[f].className+=" iepp_"+w[b])
}}H.appendChild(B),G.appendChild(E),E.className=B.className,E.id=B.id,E.innerHTML=B.innerHTML.replace(t,"<$1font")
},y._beforePrint=function(){D.styleSheet.cssText=y.parseCSS(y.getCSS(z.styleSheets,"all")),y.writeHTML()
},y.restoreHTML=function(){E.innerHTML="",G.removeChild(E),G.appendChild(B)
},y._afterPrint=function(){y.restoreHTML(),D.styleSheet.cssText=""
},A(z),A(H);
y.disablePP||(F.insertBefore(D,F.firstChild),D.media="print",D.className="iepp-printshim",AS.attachEvent("onbeforeprint",y._beforePrint),AS.attachEvent("onafterprint",y._afterPrint))
}(AR,AQ),AN._version=AO,AN._prefixes=AD,AN._domPrefixes=AB,AN.hasEvent=N,AN.testProp=function(A){return U([A])
},AN.testAllProps=S,AN.testStyles=Q,AL.className=AL.className.replace(/\bno-js\b/,"")+(AM?" js "+R.join(" "):"");
return AN
}(this,this.document),function(AP,AO,AN){function AF(A){return !A||A=="loaded"||A=="complete"
}function AG(){var B=1,A=-1;
while(AA.length- ++A){if(AA[A].s&&!(B=AA[A].r)){break
}}B&&AJ()
}function AH(A){var C=AO.createElement("script"),B;
C.src=A.s,C.onreadystatechange=C.onload=function(){!B&&AF(C.readyState)&&(B=1,AG(),C.onload=C.onreadystatechange=null)
},AD(function(){B||(B=1,AG())
},L.errorTimeout),A.e?C.onload():AC.parentNode.insertBefore(C,AC)
}function AI(A){var D=AO.createElement("link"),C;
D.href=A.s,D.rel="stylesheet",D.type="text/css";
if(!A.e&&(M||W)){var B=function(E){AD(function(){if(!C){try{E.sheet.cssRules.length?(C=1,AG()):B(E)
}catch(F){F.code==1000||F.message=="security"||F.message=="denied"?(C=1,AD(function(){AG()
},0)):B(E)
}}},0)
};
B(D)
}else{D.onload=function(){C||(C=1,AD(function(){AG()
},0))
},A.e&&D.onload()
}AD(function(){C||(C=1,AG())
},L.errorTimeout),!A.e&&AC.parentNode.insertBefore(D,AC)
}function AJ(){var A=AA.shift();
Y=1,A?A.t?AD(function(){A.t=="c"?AI(A):AH(A)
},0):(A(),AG()):Y=0
}function AK(g,b,H,G,F,E){function D(){!B&&AF(C.readyState)&&(A.r=B=1,!Y&&AG(),C.onload=C.onreadystatechange=null,AD(function(){Q.removeChild(C)
},0))
}var C=AO.createElement(g),B=0,A={t:H,s:b,e:E};
C.src=C.data=b,!U&&(C.style.display="none"),C.width=C.height="0",g!="object"&&(C.type=H),C.onload=C.onreadystatechange=D,g=="img"?C.onerror=D:g=="script"&&(C.onerror=function(){A.e=A.r=1,AJ()
}),AA.splice(G,0,A),Q.insertBefore(C,U?null:AC),AD(function(){B||(Q.removeChild(C),A.r=A.e=B=1,AG())
},L.errorTimeout)
}function AL(B,A,D){var C=A=="c"?I:J;
Y=0,A=A||"j",V(B)?AK(C,B,A,this.i++,AE,D):(AA.splice(this.i++,0,B),AA.length==1&&AJ());
return this
}function AM(){var A=L;
A.loader={load:AL,i:0};
return A
}var AE=AO.documentElement,AD=AP.setTimeout,AC=AO.getElementsByTagName("script")[0],AB={}.toString,AA=[],Y=0,W="MozAppearance" in AE.style,U=W&&!!AO.createRange().compareNode,S=W&&!U,Q=U?AE:AC.parentNode,O=AP.opera&&AB.call(AP.opera)=="[object Opera]",M="webkitAppearance" in AE.style,K=M&&"async" in AO.createElement("script"),J=W?"object":O||K?"img":"script",I=M?"img":J,Z=Array.isArray||function(A){return AB.call(A)=="[object Array]"
},X=function(A){return Object(A)===A
},V=function(A){return typeof A=="string"
},T=function(A){return AB.call(A)=="[object Function]"
},R=[],P={},N,L;
L=function(B){function F(i){var H=i.split("!"),o=R.length,n=H.pop(),m=H.length,l={url:n,origUrl:n,prefixes:H},k,j;
for(j=0;
j<m;
j++){k=P[H[j]],k&&(l=k(l))
}for(j=0;
j<o;
j++){l=R[j](l)
}return l
}function G(c,H,m,l,k){var f=F(c),d=f.autoCallback;
if(!f.bypass){H&&(H=T(H)?H:H[c]||H[l]||H[c.split("/").pop().split("?")[0]]);
if(f.instead){return f.instead(c,H,m,l,k)
}m.load(f.url,f.forceCSS||!f.forceJS&&/css$/.test(f.url)?"c":AN,f.noexec),(T(H)||T(d))&&m.load(function(){AM(),H&&H(f.origUrl,k,l),d&&d(f.origUrl,k,l)
})
}}function A(e,H){function o(b){if(V(b)){G(b,k,H,0,n)
}else{if(X(b)){for(j in b){b.hasOwnProperty(j)&&G(b[j],k,H,j,n)
}}}}var n=!!e.test,m=n?e.yep:e.nope,l=e.load||e.both,k=e.callback,j;
o(m),o(l),e.complete&&H.load(e.complete)
}var E,D,C=this.yepnope.loader;
if(V(B)){G(B,0,C,0)
}else{if(Z(B)){for(E=0;
E<B.length;
E++){D=B[E],V(D)?G(D,0,C,0):Z(D)?L(D):X(D)&&A(D,C)
}}else{X(B)&&A(B,C)
}}},L.addPrefix=function(B,A){P[B]=A
},L.addFilter=function(A){R.push(A)
},L.errorTimeout=10000,AO.readyState==null&&AO.addEventListener&&(AO.readyState="loading",AO.addEventListener("DOMContentLoaded",N=function(){AO.removeEventListener("DOMContentLoaded",N,0),AO.readyState="complete"
},0)),AP.yepnope=AM()
}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))
};
(function(){var a=this,W=a._,e={},AA=Array.prototype,d=Object.prototype,AC=AA.slice,U=AA.unshift,R=d.toString,g=d.hasOwnProperty,T=AA.forEach,S=AA.map,Q=AA.reduce,O=AA.reduceRight,N=AA.filter,L=AA.every,J=AA.some,c=AA.indexOf,G=AA.lastIndexOf;
d=Array.isArray;
var P=Object.keys,Y=Function.prototype.bind,AD=function(A){return new k(A)
};
typeof module!=="undefined"&&module.exports?(module.exports=AD,AD._=AD):a._=AD;
AD.VERSION="1.1.6";
var AB=AD.each=AD.forEach=function(A,E,D){if(A!=null){if(T&&A.forEach===T){A.forEach(E,D)
}else{if(AD.isNumber(A.length)){for(var C=0,B=A.length;
C<B;
C++){if(E.call(D,A[C],C,A)===e){break
}}}else{for(C in A){if(g.call(A,C)&&E.call(D,A[C],C,A)===e){break
}}}}}};
AD.map=function(B,D,A){var C=[];
if(B==null){return C
}if(S&&B.map===S){return B.map(D,A)
}AB(B,function(E,H,F){C[C.length]=D.call(A,E,H,F)
});
return C
};
AD.reduce=AD.foldl=AD.inject=function(A,E,D,C){var B=D!==void 0;
A==null&&(A=[]);
if(Q&&A.reduce===Q){return C&&(E=AD.bind(E,C)),B?A.reduce(E,D):A.reduce(E)
}AB(A,function(H,F,I){!B&&F===0?(D=H,B=!0):D=E.call(C,D,H,F,I)
});
if(!B){throw new TypeError("Reduce of empty array with no initial value")
}return D
};
AD.reduceRight=AD.foldr=function(A,D,C,B){A==null&&(A=[]);
if(O&&A.reduceRight===O){return B&&(D=AD.bind(D,B)),C!==void 0?A.reduceRight(D,C):A.reduceRight(D)
}A=(AD.isArray(A)?A.slice():AD.toArray(A)).reverse();
return AD.reduce(A,D,C,B)
};
AD.find=AD.detect=function(B,D,A){var C;
Z(B,function(E,F,H){if(D.call(A,E,F,H)){return C=E,!0
}});
return C
};
AD.filter=AD.select=function(B,D,A){var C=[];
if(B==null){return C
}if(N&&B.filter===N){return B.filter(D,A)
}AB(B,function(E,F,H){D.call(A,E,F,H)&&(C[C.length]=E)
});
return C
};
AD.reject=function(B,D,A){var C=[];
if(B==null){return C
}AB(B,function(E,F,H){D.call(A,E,F,H)||(C[C.length]=E)
});
return C
};
AD.every=AD.all=function(B,D,A){var C=!0;
if(B==null){return C
}if(L&&B.every===L){return B.every(D,A)
}AB(B,function(E,F,H){if(!(C=C&&D.call(A,E,F,H))){return e
}});
return C
};
var Z=AD.some=AD.any=function(A,D,C){D||(D=AD.identity);
var B=!1;
if(A==null){return B
}if(J&&A.some===J){return A.some(D,C)
}AB(A,function(F,E,H){if(B=D.call(C,F,E,H)){return e
}});
return B
};
AD.include=AD.contains=function(B,C){var A=!1;
if(B==null){return A
}if(c&&B.indexOf===c){return B.indexOf(C)!=-1
}Z(B,function(D){if(A=D===C){return !0
}});
return A
};
AD.invoke=function(A,C){var B=AC.call(arguments,2);
return AD.map(A,function(D){return(C.call?C||D:D[C]).apply(D,B)
})
};
AD.pluck=function(A,B){return AD.map(A,function(C){return C[B]
})
};
AD.max=function(A,D,C){if(!D&&AD.isArray(A)){return Math.max.apply(Math,A)
}var B={computed:-Infinity};
AB(A,function(F,E,H){E=D?D.call(C,F,E,H):F;
E>=B.computed&&(B={value:F,computed:E})
});
return B.value
};
AD.min=function(A,D,C){if(!D&&AD.isArray(A)){return Math.min.apply(Math,A)
}var B={computed:Infinity};
AB(A,function(F,E,H){E=D?D.call(C,F,E,H):F;
E<B.computed&&(B={value:F,computed:E})
});
return B.value
};
AD.sortBy=function(A,C,B){return AD.pluck(AD.map(A,function(E,D,F){return{value:E,criteria:C.call(B,E,D,F)}
}).sort(function(E,D){var H=E.criteria,F=D.criteria;
return H<F?-1:H>F?1:0
}),"value")
};
AD.sortedIndex=function(A,F,E){E||(E=AD.identity);
for(var D=0,C=A.length;
D<C;
){var B=D+C>>1;
E(A[B])<E(F)?D=B+1:C=B
}return D
};
AD.toArray=function(A){if(!A){return[]
}if(A.toArray){return A.toArray()
}if(AD.isArray(A)){return A
}if(AD.isArguments(A)){return AC.call(A)
}return AD.values(A)
};
AD.size=function(A){return AD.toArray(A).length
};
AD.first=AD.head=function(B,A,C){return A!=null&&!C?AC.call(B,0,A):B[0]
};
AD.rest=AD.tail=function(B,A,C){return AC.call(B,A==null||C?1:A)
};
AD.last=function(A){return A[A.length-1]
};
AD.compact=function(A){return AD.filter(A,function(B){return !!B
})
};
AD.flatten=function(A){return AD.reduce(A,function(B,C){if(AD.isArray(C)){return B.concat(AD.flatten(C))
}B[B.length]=C;
return B
},[])
};
AD.without=function(A){var B=AC.call(arguments,1);
return AD.filter(A,function(C){return !AD.include(B,C)
})
};
AD.uniq=AD.unique=function(A,B){return AD.reduce(A,function(C,E,D){if(0==D||(B===!0?AD.last(C)!=E:!AD.include(C,E))){C[C.length]=E
}return C
},[])
};
AD.intersect=function(A){var B=AC.call(arguments,1);
return AD.filter(AD.uniq(A),function(C){return AD.every(B,function(D){return AD.indexOf(D,C)>=0
})
})
};
AD.zip=function(){for(var A=AC.call(arguments),D=AD.max(AD.pluck(A,"length")),C=Array(D),B=0;
B<D;
B++){C[B]=AD.pluck(A,""+B)
}return C
};
AD.indexOf=function(A,D,C){if(A==null){return -1
}var B;
if(C){return C=AD.sortedIndex(A,D),A[C]===D?C:-1
}if(c&&A.indexOf===c){return A.indexOf(D)
}C=0;
for(B=A.length;
C<B;
C++){if(A[C]===D){return C
}}return -1
};
AD.lastIndexOf=function(B,A){if(B==null){return -1
}if(G&&B.lastIndexOf===G){return B.lastIndexOf(A)
}for(var C=B.length;
C--;
){if(B[C]===A){return C
}}return -1
};
AD.range=function(B,A,F){arguments.length<=1&&(A=B||0,B=0);
F=arguments[2]||1;
for(var E=Math.max(Math.ceil((A-B)/F),0),D=0,C=Array(E);
D<E;
){C[D++]=B,B+=F
}return C
};
AD.bind=function(B,A){if(B.bind===Y&&Y){return Y.apply(B,AC.call(arguments,1))
}var C=AC.call(arguments,2);
return function(){return B.apply(A,C.concat(AC.call(arguments)))
}
};
AD.bindAll=function(A){var B=AC.call(arguments,1);
B.length==0&&(B=AD.functions(A));
AB(B,function(C){A[C]=AD.bind(A[C],A)
});
return A
};
AD.memoize=function(A,C){var B={};
C||(C=AD.identity);
return function(){var D=C.apply(this,arguments);
return g.call(B,D)?B[D]:B[D]=A.apply(this,arguments)
}
};
AD.delay=function(B,A){var C=AC.call(arguments,2);
return setTimeout(function(){return B.apply(B,C)
},A)
};
AD.defer=function(A){return AD.delay.apply(AD,[A,1].concat(AC.call(arguments,1)))
};
var X=function(B,A,D){var C;
return function(){var H=this,F=arguments,E=function(){C=null;
B.apply(H,F)
};
D&&clearTimeout(C);
if(D||!C){C=setTimeout(E,A)
}}
};
AD.throttle=function(B,A){return X(B,A,!1)
};
AD.debounce=function(B,A){return X(B,A,!0)
};
AD.once=function(B){var A=!1,C;
return function(){if(A){return C
}A=!0;
return C=B.apply(this,arguments)
}
};
AD.wrap=function(B,A){return function(){var C=[B].concat(AC.call(arguments));
return A.apply(this,C)
}
};
AD.compose=function(){var A=AC.call(arguments);
return function(){for(var B=AC.call(arguments),C=A.length-1;
C>=0;
C--){B=[A[C].apply(this,B)]
}return B[0]
}
};
AD.after=function(B,A){return function(){if(--B<1){return A.apply(this,arguments)
}}
};
AD.keys=P||function(B){if(B!==Object(B)){throw new TypeError("Invalid object")
}var A=[],C;
for(C in B){g.call(B,C)&&(A[A.length]=C)
}return A
};
AD.values=function(A){return AD.map(A,AD.identity)
};
AD.functions=AD.methods=function(A){return AD.filter(AD.keys(A),function(B){return AD.isFunction(A[B])
}).sort()
};
AD.extend=function(A){AB(AC.call(arguments,1),function(B){for(var C in B){B[C]!==void 0&&(A[C]=B[C])
}});
return A
};
AD.defaults=function(A){AB(AC.call(arguments,1),function(B){for(var C in B){A[C]==null&&(A[C]=B[C])
}});
return A
};
AD.clone=function(A){return AD.isArray(A)?A.slice():AD.extend({},A)
};
AD.tap=function(B,A){A(B);
return B
};
AD.isEqual=function(A,E){if(A===E){return !0
}var D=typeof A;
if(D!=typeof E){return !1
}if(A==E){return !0
}if(!A&&E||A&&!E){return !1
}if(A._chain){A=A._wrapped
}if(E._chain){E=E._wrapped
}if(A.isEqual){return A.isEqual(E)
}if(AD.isDate(A)&&AD.isDate(E)){return A.getTime()===E.getTime()
}if(AD.isNaN(A)&&AD.isNaN(E)){return !1
}if(AD.isRegExp(A)&&AD.isRegExp(E)){return A.source===E.source&&A.global===E.global&&A.ignoreCase===E.ignoreCase&&A.multiline===E.multiline
}if(D!=="object"){return !1
}if(A.length&&A.length!==E.length){return !1
}D=AD.keys(A);
var C=AD.keys(E);
if(D.length!=C.length){return !1
}for(var B in A){if(!(B in E)||!AD.isEqual(A[B],E[B])){return !1
}}return !0
};
AD.isEmpty=function(A){if(AD.isArray(A)||AD.isString(A)){return A.length===0
}for(var B in A){if(g.call(A,B)){return !1
}}return !0
};
AD.isElement=function(A){return !!(A&&A.nodeType==1)
};
AD.isArray=d||function(A){return R.call(A)==="[object Array]"
};
AD.isArguments=function(A){return !(!A||!g.call(A,"callee"))
};
AD.isFunction=function(A){return !(!A||!A.constructor||!A.call||!A.apply)
};
AD.isString=function(A){return !!(A===""||A&&A.charCodeAt&&A.substr)
};
AD.isNumber=function(A){return !!(A===0||A&&A.toExponential&&A.toFixed)
};
AD.isNaN=function(A){return A!==A
};
AD.isBoolean=function(A){return A===!0||A===!1
};
AD.isDate=function(A){return !(!A||!A.getTimezoneOffset||!A.setUTCFullYear)
};
AD.isRegExp=function(A){return !(!A||!A.test||!A.exec||!(A.ignoreCase||A.ignoreCase===!1))
};
AD.isNull=function(A){return A===null
};
AD.isUndefined=function(A){return A===void 0
};
AD.noConflict=function(){a._=W;
return this
};
AD.identity=function(A){return A
};
AD.times=function(B,A,D){for(var C=0;
C<B;
C++){A.call(D,C)
}};
AD.mixin=function(A){AB(AD.functions(A),function(B){M(B,AD[B]=A[B])
})
};
var K=0;
AD.uniqueId=function(B){var A=K++;
return B?B+A:A
};
AD.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};
AD.template=function(A,C){var B=AD.templateSettings;
B="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+A.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(B.interpolate,function(E,D){return"',"+D.replace(/\\'/g,"'")+",'"
}).replace(B.evaluate||null,function(E,D){return"');"+D.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"
}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";
B=new Function("obj",B);
return C?B(C):B
};
var k=function(A){this._wrapped=A
};
AD.prototype=k.prototype;
var V=function(A,B){return B?AD(A).chain():A
},M=function(A,B){k.prototype[A]=function(){var C=AC.call(arguments);
U.call(C,this._wrapped);
return V(B.apply(AD,C),this._chain)
}
};
AD.mixin(AD);
AB(["pop","push","reverse","shift","sort","splice","unshift"],function(B){var A=AA[B];
k.prototype[B]=function(){A.apply(this._wrapped,arguments);
return V(this._wrapped,this._chain)
}
});
AB(["concat","join","slice"],function(B){var A=AA[B];
k.prototype[B]=function(){return V(A.apply(this._wrapped,arguments),this._chain)
}
});
k.prototype.chain=function(){this._chain=!0;
return this
};
k.prototype.value=function(){return this._wrapped
}
})();
(function(){function B(D){if(D){return C.escapeRegExp(D)
}return"\\s"
}var A=String.prototype.trim,C;
C=this._s={capitalize:function(D){return D.charAt(0).toUpperCase()+D.substring(1).toLowerCase()
},join:function(D){for(var E="",F=1;
F<arguments.length;
F+=1){E+=String(arguments[F]);
if(F!==arguments.length-1){E+=String(D)
}}return E
},escapeRegExp:function(D){return D.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")
},reverse:function(D){return Array.prototype.reverse.apply(D.split("")).join("")
},contains:function(D,E){return D.indexOf(E)!==-1
},clean:function(D){return C.strip(D.replace(/\s+/g," "))
},trim:function(D,E){if(!E&&A){return A.call(D)
}E=B(E);
return D.replace(new RegExp("^["+E+"]+|["+E+"]+$","g"),"")
},ltrim:function(D,E){E=B(E);
return D.replace(new RegExp("^["+E+"]+","g"),"")
},rtrim:function(D,E){E=B(E);
return D.replace(new RegExp("["+E+"]+$","g"),"")
},startsWith:function(D,E){return D.length>=E.length&&D.substring(0,E.length)===E
},endsWith:function(D,E){return D.length>=E.length&&D.substring(D.length-E.length)===E
},sprintf:function(){for(var D=0,E,J=arguments[D++],G=[],K,I,H;
J;
){if(K=/^[^\x25]+/.exec(J)){G.push(K[0])
}else{if(K=/^\x25{2}/.exec(J)){G.push("%")
}else{if(K=/^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(J)){if((E=arguments[K[1]||D++])==null||E==undefined){throw"Too few arguments."
}if(/[^s]/.test(K[7])&&typeof E!="number"){throw"Expecting number but found "+typeof E
}switch(K[7]){case"b":E=E.toString(2);
break;
case"c":E=String.fromCharCode(E);
break;
case"d":E=parseInt(E);
break;
case"e":E=K[6]?E.toExponential(K[6]):E.toExponential();
break;
case"f":E=K[6]?parseFloat(E).toFixed(K[6]):parseFloat(E);
break;
case"o":E=E.toString(8);
break;
case"s":E=(E=String(E))&&K[6]?E.substring(0,K[6]):E;
break;
case"u":E=Math.abs(E);
break;
case"x":E=E.toString(16);
break;
case"X":E=E.toString(16).toUpperCase();
break
}E=/[def]/.test(K[7])&&K[2]&&E>=0?"+"+E:E;
I=K[3]?K[3]=="0"?"0":K[3].charAt(1):" ";
H=K[5]-String(E).length-0;
if(K[5]){H=H;
for(var F=[];
H>0;
F[--H]=I){}I=F.join("")
}else{I=""
}I=I;
G.push(""+(K[4]?E+I:I+E))
}else{throw"Huh ?!"
}}}J=J.substring(K[0].length)
}return G.join("")
}};
this._s.strip=C.trim;
this._s.lstrip=C.ltrim;
this._s.rstrip=C.rtrim;
this._&&this._.mixin(this._s)
})();
_.mixin({deepClone:function(C){if(C==null||typeof (C)!="object"){return C
}var A=new C.constructor();
for(var B in C){A[B]=_.deepClone(C[B])
}return A
},hasValue:function(A){return(typeof A!="undefined"&&A!=null&&A!="")
},cookie:function(C,F){if(typeof F=="undefined"){var B=document.cookie.split(/[; ]+/);
for(var D=0;
D<B.length;
D++){var G=B[D].substring(0,B[D].indexOf("="));
if(G==C){return B[D].substring(C.length+1)
}}}else{var A=null;
if(F.expires){A=new Date();
A.setDate(A.getDate()+F.expires)
}var E=F.path||"/";
document.cookie=C+"="+escape(F.value)+((A==null)?"":";expires="+A.toUTCString())+";path="+E
}},logMessage:function(A){if(window.console){console.log(A)
}}});
var swfobject=function(){var AQ="undefined",Ac="object",AB="Shockwave Flash",X="ShockwaveFlash.ShockwaveFlash",Ad="application/x-shockwave-flash",AC="SWFObjectExprInst",AW="onreadystatechange",AF=window,Ak=document,Aa=navigator,AA=false,Z=[Am],Af=[],AG=[],AL=[],Ai,AD,AP,AS,AK=false,At=false,Ag,AN,Ah=true,AH=function(){var A=typeof Ak.getElementById!=AQ&&typeof Ak.getElementsByTagName!=AQ&&typeof Ak.createElement!=AQ,E=Aa.userAgent.toLowerCase(),C=Aa.platform.toLowerCase(),H=C?/win/.test(C):/win/.test(E),J=C?/mac/.test(C):/mac/.test(E),G=/webkit/.test(E)?parseFloat(E.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,D=!+"\v1",F=[0,0,0],K=null;
if(typeof Aa.plugins!=AQ&&typeof Aa.plugins[AB]==Ac){K=Aa.plugins[AB].description;
if(K&&!(typeof Aa.mimeTypes!=AQ&&Aa.mimeTypes[Ad]&&!Aa.mimeTypes[Ad].enabledPlugin)){AA=true;
D=false;
K=K.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
F[0]=parseInt(K.replace(/^(.*)\..*$/,"$1"),10);
F[1]=parseInt(K.replace(/^.*\.(.*)\s.*$/,"$1"),10);
F[2]=/[a-zA-Z]/.test(K)?parseInt(K.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof AF.ActiveXObject!=AQ){try{var I=new ActiveXObject(X);
if(I){K=I.GetVariable("$version");
if(K){D=true;
K=K.split(" ")[1].split(",");
F=[parseInt(K[0],10),parseInt(K[1],10),parseInt(K[2],10)]
}}}catch(B){}}}return{w3:A,pv:F,wk:G,ie:D,win:H,mac:J}
}(),Aj=function(){if(!AH.w3){return 
}if((typeof Ak.readyState!=AQ&&Ak.readyState=="complete")||(typeof Ak.readyState==AQ&&(Ak.getElementsByTagName("body")[0]||Ak.body))){Ao()
}if(!AK){if(typeof Ak.addEventListener!=AQ){Ak.addEventListener("DOMContentLoaded",Ao,false)
}if(AH.ie&&AH.win){Ak.attachEvent(AW,function(){if(Ak.readyState=="complete"){Ak.detachEvent(AW,arguments.callee);
Ao()
}});
if(AF==top){(function(){if(AK){return 
}try{Ak.documentElement.doScroll("left")
}catch(A){setTimeout(arguments.callee,0);
return 
}Ao()
})()
}}if(AH.wk){(function(){if(AK){return 
}if(!/loaded|complete/.test(Ak.readyState)){setTimeout(arguments.callee,0);
return 
}Ao()
})()
}Ab(Ao)
}}();
function Ao(){if(AK){return 
}try{var B=Ak.getElementsByTagName("body")[0].appendChild(AR("span"));
B.parentNode.removeChild(B)
}catch(A){return 
}AK=true;
var D=Z.length;
for(var C=0;
C<D;
C++){Z[C]()
}}function AJ(A){if(AK){A()
}else{Z[Z.length]=A
}}function Ab(A){if(typeof AF.addEventListener!=AQ){AF.addEventListener("load",A,false)
}else{if(typeof Ak.addEventListener!=AQ){Ak.addEventListener("load",A,false)
}else{if(typeof AF.attachEvent!=AQ){Al(AF,"onload",A)
}else{if(typeof AF.onload=="function"){var B=AF.onload;
AF.onload=function(){B();
A()
}
}else{AF.onload=A
}}}}}function Am(){if(AA){Y()
}else{AM()
}}function Y(){var D=Ak.getElementsByTagName("body")[0];
var B=AR(Ac);
B.setAttribute("type",Ad);
var A=D.appendChild(B);
if(A){var C=0;
(function(){if(typeof A.GetVariable!=AQ){var E=A.GetVariable("$version");
if(E){E=E.split(" ")[1].split(",");
AH.pv=[parseInt(E[0],10),parseInt(E[1],10),parseInt(E[2],10)]
}}else{if(C<10){C++;
setTimeout(arguments.callee,10);
return 
}}D.removeChild(B);
A=null;
AM()
})()
}else{AM()
}}function AM(){var G=Af.length;
if(G>0){for(var H=0;
H<G;
H++){var C=Af[H].id;
var L=Af[H].callbackFn;
var A={success:false,id:C};
if(AH.pv[0]>0){var I=Ar(C);
if(I){if(AO(Af[H].swfVersion)&&!(AH.wk&&AH.wk<312)){AX(C,true);
if(L){A.success=true;
A.ref=AU(C);
L(A)
}}else{if(Af[H].expressInstall&&AT()){var E={};
E.data=Af[H].expressInstall;
E.width=I.getAttribute("width")||"0";
E.height=I.getAttribute("height")||"0";
if(I.getAttribute("class")){E.styleclass=I.getAttribute("class")
}if(I.getAttribute("align")){E.align=I.getAttribute("align")
}var F={};
var D=I.getElementsByTagName("param");
var K=D.length;
for(var J=0;
J<K;
J++){if(D[J].getAttribute("name").toLowerCase()!="movie"){F[D[J].getAttribute("name")]=D[J].getAttribute("value")
}}AE(E,F,C,L)
}else{Ae(I);
if(L){L(A)
}}}}}else{AX(C,true);
if(L){var B=AU(C);
if(B&&typeof B.SetVariable!=AQ){A.success=true;
A.ref=B
}L(A)
}}}}}function AU(B){var D=null;
var C=Ar(B);
if(C&&C.nodeName=="OBJECT"){if(typeof C.SetVariable!=AQ){D=C
}else{var A=C.getElementsByTagName(Ac)[0];
if(A){D=A
}}}return D
}function AT(){return !At&&AO("6.0.65")&&(AH.win||AH.mac)&&!(AH.wk&&AH.wk<312)
}function AE(F,D,H,E){At=true;
AP=E||null;
AS={success:false,id:H};
var A=Ar(H);
if(A){if(A.nodeName=="OBJECT"){Ai=An(A);
AD=null
}else{Ai=A;
AD=H
}F.id=AC;
if(typeof F.width==AQ||(!/%$/.test(F.width)&&parseInt(F.width,10)<310)){F.width="310"
}if(typeof F.height==AQ||(!/%$/.test(F.height)&&parseInt(F.height,10)<137)){F.height="137"
}Ak.title=Ak.title.slice(0,47)+" - Flash Player Installation";
var B=AH.ie&&AH.win?"ActiveX":"PlugIn",C="MMredirectURL="+AF.location.toString().replace(/&/g,"%26")+"&MMplayerType="+B+"&MMdoctitle="+Ak.title;
if(typeof D.flashvars!=AQ){D.flashvars+="&"+C
}else{D.flashvars=C
}if(AH.ie&&AH.win&&A.readyState!=4){var G=AR("div");
H+="SWFObjectNew";
G.setAttribute("id",H);
A.parentNode.insertBefore(G,A);
A.style.display="none";
(function(){if(A.readyState==4){A.parentNode.removeChild(A)
}else{setTimeout(arguments.callee,10)
}})()
}AZ(F,D,H)
}}function Ae(A){if(AH.ie&&AH.win&&A.readyState!=4){var B=AR("div");
A.parentNode.insertBefore(B,A);
B.parentNode.replaceChild(An(A),B);
A.style.display="none";
(function(){if(A.readyState==4){A.parentNode.removeChild(A)
}else{setTimeout(arguments.callee,10)
}})()
}else{A.parentNode.replaceChild(An(A),A)
}}function An(B){var D=AR("div");
if(AH.win&&AH.ie){D.innerHTML=B.innerHTML
}else{var E=B.getElementsByTagName(Ac)[0];
if(E){var A=E.childNodes;
if(A){var F=A.length;
for(var C=0;
C<F;
C++){if(!(A[C].nodeType==1&&A[C].nodeName=="PARAM")&&!(A[C].nodeType==8)){D.appendChild(A[C].cloneNode(true))
}}}}}return D
}function AZ(E,G,C){var D,A=Ar(C);
if(AH.wk&&AH.wk<312){return D
}if(A){if(typeof E.id==AQ){E.id=C
}if(AH.ie&&AH.win){var F="";
for(var I in E){if(E[I]!=Object.prototype[I]){if(I.toLowerCase()=="data"){G.movie=E[I]
}else{if(I.toLowerCase()=="styleclass"){F+=' class="'+E[I]+'"'
}else{if(I.toLowerCase()!="classid"){F+=" "+I+'="'+E[I]+'"'
}}}}}var H="";
for(var J in G){if(G[J]!=Object.prototype[J]){H+='<param name="'+J+'" value="'+G[J]+'" />'
}}A.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+F+">"+H+"</object>";
AG[AG.length]=E.id;
D=Ar(E.id)
}else{var B=AR(Ac);
B.setAttribute("type",Ad);
for(var K in E){if(E[K]!=Object.prototype[K]){if(K.toLowerCase()=="styleclass"){B.setAttribute("class",E[K])
}else{if(K.toLowerCase()!="classid"){B.setAttribute(K,E[K])
}}}}for(var L in G){if(G[L]!=Object.prototype[L]&&L.toLowerCase()!="movie"){Ap(B,L,G[L])
}}A.parentNode.replaceChild(B,A);
D=B
}}return D
}function Ap(B,D,C){var A=AR("param");
A.setAttribute("name",D);
A.setAttribute("value",C);
B.appendChild(A)
}function AV(A){var B=Ar(A);
if(B&&B.nodeName=="OBJECT"){if(AH.ie&&AH.win){B.style.display="none";
(function(){if(B.readyState==4){As(A)
}else{setTimeout(arguments.callee,10)
}})()
}else{B.parentNode.removeChild(B)
}}}function As(A){var B=Ar(A);
if(B){for(var C in B){if(typeof B[C]=="function"){B[C]=null
}}B.parentNode.removeChild(B)
}}function Ar(A){var C=null;
try{C=Ak.getElementById(A)
}catch(B){}return C
}function AR(A){return Ak.createElement(A)
}function Al(A,C,B){A.attachEvent(C,B);
AL[AL.length]=[A,C,B]
}function AO(A){var B=AH.pv,C=A.split(".");
C[0]=parseInt(C[0],10);
C[1]=parseInt(C[1],10)||0;
C[2]=parseInt(C[2],10)||0;
return(B[0]>C[0]||(B[0]==C[0]&&B[1]>C[1])||(B[0]==C[0]&&B[1]==C[1]&&B[2]>=C[2]))?true:false
}function AY(B,F,A,C){if(AH.ie&&AH.mac){return 
}var E=Ak.getElementsByTagName("head")[0];
if(!E){return 
}var G=(A&&typeof A=="string")?A:"screen";
if(C){Ag=null;
AN=null
}if(!Ag||AN!=G){var D=AR("style");
D.setAttribute("type","text/css");
D.setAttribute("media",G);
Ag=E.appendChild(D);
if(AH.ie&&AH.win&&typeof Ak.styleSheets!=AQ&&Ak.styleSheets.length>0){Ag=Ak.styleSheets[Ak.styleSheets.length-1]
}AN=G
}if(AH.ie&&AH.win){if(Ag&&typeof Ag.addRule==Ac){Ag.addRule(B,F)
}}else{if(Ag&&typeof Ak.createTextNode!=AQ){Ag.appendChild(Ak.createTextNode(B+" {"+F+"}"))
}}}function AX(A,C){if(!Ah){return 
}var B=C?"visible":"hidden";
if(AK&&Ar(A)){Ar(A).style.visibility=B
}else{AY("#"+A,"visibility:"+B)
}}function AI(B){var A=/[\\\"<>\.;]/;
var C=A.exec(B)!=null;
return C&&typeof encodeURIComponent!=AQ?encodeURIComponent(B):B
}var Aq=function(){if(AH.ie&&AH.win){window.attachEvent("onunload",function(){var A=AL.length;
for(var B=0;
B<A;
B++){AL[B][0].detachEvent(AL[B][1],AL[B][2])
}var D=AG.length;
for(var C=0;
C<D;
C++){AV(AG[C])
}for(var E in AH){AH[E]=null
}AH=null;
for(var F in swfobject){swfobject[F]=null
}swfobject=null
})
}}();
return{registerObject:function(A,E,C,B){if(AH.w3&&A&&E){var D={};
D.id=A;
D.swfVersion=E;
D.expressInstall=C;
D.callbackFn=B;
Af[Af.length]=D;
AX(A,false)
}else{if(B){B({success:false,id:A})
}}},getObjectById:function(A){if(AH.w3){return AU(A)
}},embedSWF:function(K,E,H,F,C,A,B,I,G,J){var D={success:false,id:E};
if(AH.w3&&!(AH.wk&&AH.wk<312)&&K&&E&&H&&F&&C){AX(E,false);
AJ(function(){H+="";
F+="";
var Q={};
if(G&&typeof G===Ac){for(var O in G){Q[O]=G[O]
}}Q.data=K;
Q.width=H;
Q.height=F;
var N={};
if(I&&typeof I===Ac){for(var P in I){N[P]=I[P]
}}if(B&&typeof B===Ac){for(var L in B){if(typeof N.flashvars!=AQ){N.flashvars+="&"+L+"="+B[L]
}else{N.flashvars=L+"="+B[L]
}}}if(AO(C)){var M=AZ(Q,N,E);
if(Q.id==E){AX(E,true)
}D.success=true;
D.ref=M
}else{if(A&&AT()){Q.data=A;
AE(Q,N,E,J);
return 
}else{AX(E,true)
}}if(J){J(D)
}})
}else{if(J){J(D)
}}},switchOffAutoHideShow:function(){Ah=false
},ua:AH,getFlashPlayerVersion:function(){return{major:AH.pv[0],minor:AH.pv[1],release:AH.pv[2]}
},hasFlashPlayerVersion:AO,createSWF:function(A,B,C){if(AH.w3){return AZ(A,B,C)
}else{return undefined
}},showExpressInstall:function(B,A,D,C){if(AH.w3&&AT()){AE(B,A,D,C)
}},removeSWF:function(A){if(AH.w3){AV(A)
}},createCSS:function(B,A,C,D){if(AH.w3){AY(B,A,C,D)
}},addDomLoadEvent:AJ,addLoadEvent:Ab,getQueryParamValue:function(B){var A=Ak.location.search||Ak.location.hash;
if(A){if(/\?/.test(A)){A=A.split("?")[1]
}if(B==null){return AI(A)
}var C=A.split("&");
for(var D=0;
D<C.length;
D++){if(C[D].substring(0,C[D].indexOf("="))==B){return AI(C[D].substring((C[D].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(At){var A=Ar(AC);
if(A&&Ai){A.parentNode.replaceChild(Ai,A);
if(AD){AX(AD,true);
if(AH.ie&&AH.win){Ai.style.display="block"
}}if(AP){AP(AS)
}}At=false
}}}
}();
var dailybeast=dailybeast||{};
dailybeast.metatags=function(){var L=[];
var I="";
var H=[];
var F="";
var B="";
var K="";
var E="";
var P=function(){var T=document.getElementsByTagName("meta");
for(var U=0;
U<T.length;
U++){var X=T[U];
var W="";
if(_.hasValue(X.attributes.name)){W=X.attributes.name.nodeValue
}else{if(_.hasValue(X.attributes["http-equiv"])){W=X.attributes["http-equiv"].nodeValue
}}if(W!=null&&_.hasValue(X.attributes.content)){var V=X.attributes.content.nodeValue;
if(V.length>0){switch(W){case"authors":L=V.split(",");
break;
case"section":I=V;
break;
case"tags":H=V.split(",");
break;
case"template":F=V;
break;
case"wrap":B=V;
break;
case"template-title":K=V;
break;
case"contentpath":E=V;
break
}}}}}();
function O(){return L
}function D(){return H
}function A(){return I
}function C(W,X){W+=":";
var V=[];
if(H){for(var U=0;
U<H.length;
U++){if(H[U].indexOf(W)>=0&&H[U].length>0){var T=(X)?H[U].substring(W.length):H[U];
V.push(T)
}}}return V
}function Q(X,Y){var V=[];
if(H){for(var U=0;
U<H.length;
U++){var W=H[U];
if(W.substr(0,X.length)==X){var T=(Y)?H[U].substr(X.length):H[U];
V.push(T)
}}}return V
}function R(){return F
}function S(){return B
}function N(){return K
}function G(){var T=C("topic");
if(T.length>0){return T[0].replace("topic:","")
}return""
}function M(){var T=C("ad");
return T
}function J(){return E
}return{getAuthors:O,getAllTags:D,getSection:A,getTags:C,getTagsByPath:Q,getTemplate:R,getWrap:S,getTemplateTitle:N,getTopic:G,getAllAdTags:M,getContentPath:J}
}();
var dailybeast=dailybeast||{};
dailybeast.modes=function(){var D=typeof (CQ)!="undefined"?CQ.WCM.isEditMode():false;
var B=typeof (CQ)!="undefined"?CQ.WCM.isDesignMode():false;
var A=typeof (CQ)!="undefined"?CQ.WCM.isPreviewMode():false;
var E=(D||B||A||false);
var C=(window.top.location!=window.location)||false;
return{isEditMode:D,isDesignMode:B,isPreviewMode:A,isAuthorEnvironment:E,isUsingFrames:C}
}();
var dailybeast=dailybeast||{};
dailybeast.interstitial=function(){var E={};
var L=null;
var Q=null;
var B=document.all&&!window.opera;
var K={};
var C=null;
var I=null;
var J={"default":"nwswk.misc"};
function M(Y){D();
var a=O(Y);
var d=dailybeast.metatags.getTags("topic",true);
if(d.length>0){d=d[0]
}var c=Y.zone||d;
var f=Y.size;
var b="";
if(E.adKeyword){b=";test="+E.adKeyword
}else{var g=dailybeast.metatags.getTags("ad");
for(var Z=0;
Z<g.length;
Z++){b+=";kw="+g[Z].replace("ad:","")
}}var X=Math.random().toString();
C=X.substring(2,X.length);
I=1;
var W=S();
var e=";template="+dailybeast.metatags.getTemplate();
var V="http://ad.doubleclick.net/adj/"+a+"/"+c+";tile="+I+";dcopt=ist;sz="+f+e+W+b+";ord="+C+"?";
document.write("\n<script src='"+V+"'><\/script>")
}function U(){window.onload=function(){K.creative=creative;
K.creativeBackup=creativeBackupURL;
K.width=creativeWidth;
K.height=creativeHeight;
K.clickTag=clickTag;
K.timer=intLength;
K.opacity=semiOpaque||1;
document.getElementsByTagName("html")[0].style.overflow="hidden";
document.body.style.overflow="hidden";
L=document.getElementById("interstitial");
L.appendChild(R());
L.appendChild(P());
L.appendChild(A());
var V=(K.timer)?K.timer*1000:15000;
setTimeout(function(){T()
},V);
L.style.display="block";
window.scrollTo(0,0)
}
}function N(W){var V=document.cookie.split(/[; ]+/);
for(var X=0;
X<V.length;
X++){var Y=V[X].substring(0,V[X].indexOf("="));
if(Y==W){return V[X].substring(W.length+1)
}}}function H(W,X,Y){var V=new Date();
V.setDate(V.getDate()+Y);
document.cookie=W+"="+escape(X)+((V==null)?"":";expires="+V.toUTCString())
}function O(Y){var X=J["default"];
if(Y.siteID){X=Y.siteID
}else{var V=dailybeast.metatags.getTags("topic",true);
if(V.length>0){X=J[V[0]]||X
}else{var W=dailybeast.metatags.getTemplate();
X=J[W]||X
}}return X
}function S(){var V="";
return V
}function T(V){L.style.display="none";
document.getElementsByTagName("html")[0].style.overflow="";
document.body.style.overflow="";
return false
}function R(V){V=V||K.opacity;
var W=document.createElement("div");
W.className="scrim";
if(V){W.style.opacity=V;
W.style.filter="alpha(opacity="+V*100+")"
}return W
}function P(){var Y=document.createElement("div");
Y.className="header";
var X=document.createElement("a");
X.setAttribute("id","newsweek-logo-mini");
X.setAttribute("href","#");
var W=document.createElement("a");
W.className="skip";
W.innerHTML="SKIP &#187;";
W.setAttribute("href","#");
W.setAttribute("data-track","{'title':'skip interstitial'}");
W.onmouseup=dailybeast.interstitial.hideInterstitial;
var V=document.createElement("div");
V.className="message";
V.innerHTML="The page you requested will appear shortly<br /><strong>ADVERTISEMENT</strong>";
Y.appendChild(X);
Y.appendChild(W);
Y.appendChild(V);
return Y
}function A(){var W=(B)?document.all.clientHeight+"px":window.innerHeight;
var V;
var Y="-"+(creativeWidth/2)+"px";
if(K.creative.charAt(0)!="<"){if(K.creative.match(".swf")&&K.creative.match("http")){flaCreative='<div id="flashCreative" style="margin-left: '+Y+'"><a href="'+_creative.clickTag+'" target="_blank"><img src="'+K.creativeBackup+'" border="0" /></a></div>';
flaCreative+='<script type="text/javascript">swfobject.embedSWF("'+K.creative+"?"+K.clickTag+'","flashCreative","'+K.width+'","'+K.height+'","8.0.0","http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash",{menu:"false",quality:"high",wmode:"transparent",allowscriptaccess:"always",type:"application/x-shockwave-flash"},{id:"flashCreative",name:"flashCreative"})<\/script>';
V=flaCreative
}else{if((K.creative.match(".jpg")||K.creative.match(".gif")||K.creative.match(".png"))&&K.creative.match("http")){V='<a style="margin-left: '+Y+'" href="'+K.clickTag+'" target="_blank"><img src="'+K.creative+'" border="0" /></a>'
}else{if(K.creative.match("http")&&!K.creative.match("<")){V='<iframe style="margin-left: '+Y+'" frameborder="0" scrolling="no" width="'+K.width+'" height="'+K.height+'" src="'+K.creative+'"></iframe>'
}}}}var X=document.createElement("div");
X.innerHTML=V;
X.className="creative";
return X
}function D(){E={};
var W=window.location.hash;
if(W.length>1){W=W.substring(1);
var Y=W.split(";");
for(var V=0;
V<Y.length;
V++){var X=Y[V].split("=");
E[X[0]]=X[1]
}}}function G(){return C
}function F(){return I
}return{init:M,render:U,hideInterstitial:T,getOrd:G,getTile:F}
}();
(function(){if(_.cookie("show_mobile")!="false"){var B=["home","article","cheat"];
var C=dailybeast.metatags.getTemplate();
var D=(_(B).indexOf(C)>=0);
if(D){var A="";
if(C=="home"){A=window.location.protocol+"//"+window.location.host+"/content/dailybeast/mobile/home.html"
}else{A=window.location.href.substring(0,window.location.href.indexOf(".html"))+".mobile.html"
}(function(F,E){if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop |iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(F)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(F.substr(0,4))){window.location=E
}})(navigator.userAgent||navigator.vendor||window.opera,A)
}}});
(function(AD){function C(){AA||(AA=!0,J(Z,function(A){O(A)
}))
}function D(a,B){var A=AD.createElement("script");
A.type="text/"+(a.type||"javascript"),A.src=a.src||a,A.async=!1,A.onreadystatechange=A.onload=function(){var b=A.readyState;
!B.done&&(!b||/loaded|complete/.test(b))&&(B.done=!0,B())
},(AD.body||AC).appendChild(A)
}function E(B,A){if(B.state==P){return A&&A()
}if(B.state==Q){return T.ready(B.name,A)
}if(B.state==R){return B.onpreload.push(function(){E(B,A)
})
}B.state=Q,D(B.url,function(){B.state=P,A&&A(),J(X[B.name],function(b){O(b)
}),H()&&AA&&J(X.ALL,function(b){O(b)
})
})
}function F(B,A){B.state===undefined&&(B.state=R,B.onpreload=[],D({src:B.url,type:"cache"},function(){G(B)
}))
}function G(A){A.state=S,J(A.onpreload,function(B){B.call()
})
}function H(B){B=B||W;
var A;
for(var d in B){if(B.hasOwnProperty(d)&&B[d].state!=P){return !1
}A=!0
}return A
}function I(A){return Object.prototype.toString.call(A)=="[object Function]"
}function J(B,A){if(!!B){typeof B=="object"&&(B=[].slice.call(B));
for(var d=0;
d<B.length;
d++){A.call(B,B[d],d)
}}}function K(B){var A;
if(typeof B=="object"){for(var f in B){B[f]&&(A={name:f,url:B[f]})
}}else{A={name:M(B),url:B}
}var e=W[A.name];
if(e&&e.url===A.url){return e
}W[A.name]=A;
return A
}function M(B){var A=B.split("/"),f=A[A.length-1],e=f.indexOf("?");
return e!=-1?f.substring(0,e):f
}function O(A){A._done||(A(),A._done=1)
}var AC=AD.documentElement,AB,AA,Z=[],Y=[],X={},W={},V=AD.createElement("script").async===!0||"MozAppearance" in AD.documentElement.style||window.opera,U=window.head_conf&&head_conf.head||"head",T=window[U]=window[U]||function(){T.ready.apply(null,arguments)
},S=1,R=2,Q=3,P=4;
V?T.js=function(){var B=arguments,A=B[B.length-1],d={};
I(A)||(A=null),J(B,function(b,a){b!=A&&(b=K(b),d[b.name]=b,E(b,A&&a==B.length-2?function(){H(d)&&O(A)
}:null))
});
return T
}:T.js=function(){var B=arguments,A=[].slice.call(B,1),c=A[0];
if(!AB){Y.push(function(){T.js.apply(null,B)
});
return T
}c?(J(A,function(b){I(b)||F(K(b))
}),E(K(B[0]),I(c)?c:function(){T.js.apply(null,A)
})):E(K(B[0]));
return T
},T.ready=function(A,d){if(A==AD){AA?O(d):Z.push(d);
return T
}I(A)&&(d=A,A="ALL");
if(typeof A!="string"||!I(d)){return T
}var a=W[A];
if(a&&a.state==P||A=="ALL"&&H()&&AA){O(d);
return T
}var B=X[A];
B?B.push(d):B=X[A]=[d];
return T
},T.ready(AD,function(){H()&&J(X.ALL,function(A){O(A)
}),T.feature&&T.feature("domloaded",!0)
});
if(window.addEventListener){AD.addEventListener("DOMContentLoaded",C,!1),window.addEventListener("load",C,!1)
}else{if(window.attachEvent){AD.attachEvent("onreadystatechange",function(){AD.readyState==="complete"&&C()
});
var N=1;
try{N=window.frameElement
}catch(L){}!N&&AC.doScroll&&function(){try{AC.doScroll("left"),C()
}catch(A){setTimeout(arguments.callee,1);
return 
}}(),window.attachEvent("onload",C)
}}!AD.readyState&&AD.addEventListener&&(AD.readyState="loading",AD.addEventListener("DOMContentLoaded",handler=function(){AD.removeEventListener("DOMContentLoaded",handler,!1),AD.readyState="complete"
},!1)),setTimeout(function(){AB=!0,J(Y,function(A){A()
})
},300)
})(document);