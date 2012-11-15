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
var gomez=gomez?gomez:{};
gomez.h3=function(C,A){for(var B in A){C[B]=A[B]
}return C
};
gomez.h3(gomez,{b3:function(A){if(A<=0){return false
}return Math.random()<=A&&A
},b0:function(C){var B=document.cookie;
var A=B.match(new RegExp(";[ ]*"+C+"=([^;]*)"));
if(!A){A=B.match(new RegExp("^"+C+"=([^;]*)"))
}if(A){return unescape(A[1])
}return""
},c2:function(B,G,C,A,D,I){try{var H=this,F=H.domain?H.domain:location.hostname;
var E=B+"="+escape(G)+(C?";expires="+C.toGMTString():"")+(A?";path="+A:";path=/")+(D?";domain="+D:";domain="+F)+(I?";secure":"");
document.cookie=E
}catch(C){}},z0:function(D){var B=this;
if(D){var C=B.b0("__g_c");
if(!C){return""
}var A=C.match(new RegExp(D+":([^|]*)"));
if(A){return unescape(A[1])
}return""
}else{return""
}},z1:function(D,A){var B=this;
if(D){var C=B.b0("__g_c");
if(C){if(C.indexOf(D+":")!=-1){C=C.replace(new RegExp("("+D+":[^|]*)"),D+":"+A)
}else{C=C==" "?D+":"+A:C+"|"+D+":"+A
}B.c2("__g_c",C)
}else{B.c2("__g_c",D+":"+A)
}}},b2:function(A,C){var B=this,E=new Date(B.gt()+946080000000),D=""+A+"_"+C;
B.c2("__g_u",D,E);
B.gc.c=A;
B.gc.d=C;
B.z1("c",A);
B.z1("d",C)
},gt:function(){return new Date().getTime()
},b5:function(){return new Date().getTime()-gomez.gs
},j1:function(A){if(A){if(A.indexOf("<")!=-1||A.indexOf("%3C")!=-1||A.indexOf("%3c")!=-1){return null
}if(window.decodeURIComponent){return decodeURIComponent(A)
}else{return unescape(A)
}}return null
},f1:function(A,B){try{if(A){if(!/(^http|^https)/.test(A)){if(B==1){return gomez.j1(location.hostname)
}else{return A
}}var E=new RegExp("(^http|^https|):/{2}([^?#;]*)");
if(B==1){E=new RegExp("(^http|^https|):/{2}([^/?]*)")
}var C=A.match(E);
if(C&&B==1){return gomez.j1(C[2])
}else{if(C){return C[0]
}}}return null
}catch(D){return null
}},j3:function(D){try{var B=this,A=escape((window.location+D).replace(new RegExp("([:/.])","gm"),""));
if(A&&A.length>100){A=A.substring(0,100)
}if(window.localStorage){window.localStorage.setItem(A,B.gt())
}else{B.z1("r",A+"___"+B.gt())
}}catch(C){return 
}},j2:function(){try{var A,C=this,B=escape((document.referrer+window.location).replace(new RegExp("([:/.])","gm"),""));
if(B&&B.length>100){B=B.substring(0,100)
}if(window.localStorage){A=window.localStorage.getItem(B)
}if(!A){var F=C.z0("r");
if(F){var D=F.split("___");
if(D&&D[0]==B){A=D[1]
}}}C.j4();
return A
}catch(E){return 
}},j4:function(){try{var B=this;
if(window.localStorage){var A=escape((document.referrer+window.location).replace(new RegExp("([:/.])","gm"),""));
if(A&&A.length>100){A=A.substring(0,100)
}window.localStorage.removeItem(A)
}else{B.z1("r","")
}}catch(C){return 
}},j5:function(){var A="";
for(var B=0;
B<3;
B++){A=A+(((1+Math.random())*65536)|0).toString(16).substring(1)
}A=parseInt(A,16);
return A
},j6:function(){var A=this;
var C=A.b0("__g_u");
if(C&&C!="1"&&C.indexOf("NaN")==-1&&C.indexOf("undefined")==-1){var B=C.split("_");
if(B.length>5){if(parseInt(B[5])<new Date().getTime()){return undefined
}else{return parseFloat(B[2])
}}}return undefined
},nameEvent:function(){},startInterval:function(){},endInterval:function(){},customValue:function(){}});
gomez.P=function(){};
gomez.P.prototype={hash:function(D){if(!D){return""
}var B=this,C="{n:"+B.f9(D.n)+"|";
for(var A in D){if(A=="n"){continue
}if(typeof (D[A])=="string"||typeof (D[A])=="number"){C+=A+":"+B.f9(D[A])+"|"
}}C=C.substring(0,C.length-1);
return C+"}"
},f9:function(A){A=""+A;
A=A.replace("|","#$#").replace(":","$*$").replace("{","@#@").replace("}","*@*").replace("&","!*!");
return A
},g0:function(){var E=this,H=gomez;
if(H.grpIds){H.h3(H.gc,H.grpIds)
}if(H.wrate){H.gc.r=H.wrate
}H.gc.e=H.grpId;
for(var D=1;
D<5;
D++){if(H["grpId"+D]!=undefined){H.gc["e"+D]=H["grpId"+D]
}}H.gc.b=H.pgId;
H.gc.l=H.f1(H.m,2);
if(self.screen){H.gc.m=screen.width;
H.gc.o=screen.height
}else{if(self.java){var C=java.awt.Toolkit.getDefaultToolkit();
var F=C.getScreenSize();
H.gc.m=F.width;
H.gc.o=F.height
}}H.gc.p=navigator.platform;
if(navigator.cpuClass){H.gc.q=navigator.cpuClass
}if(!H.gc.f&&!H.gc.g){try{var B=new Array("MSIE","Firefox","Opera","Safari","Chrome"),A=document.createElement("div");
if(A.addBehavior&&document.body){A.addBehavior("#default#clientCaps");
H.gc.k=A.connectionType
}}catch(G){}for(var D=0;
D<B.length;
D++){if(navigator.userAgent.indexOf(B[D])!=-1){H.gc.g=B[D];
H.gc.f=(new String(navigator.userAgent.substring(navigator.userAgent.indexOf(B[D])).match(/[\d.]+/))).substring(0)
}}if(!H.gc.f&&!H.gc.g){H.gc.g=navigator.vendor||navigator.appName;
H.gc.f=(new String(navigator.appVersion.match(/[\d.]+/))).substring(0)
}}return E.hash(H.gc)
}};
try{gomez.gc={n:"c"};
var iU=gomez.b0("__g_u");
if(iU==undefined||iU==""){gomez.b2(gomez.j5(),0)
}var sR=gomez.j6();
if(sR==undefined){sR=1;
gomez.isFirstVi=true
}else{gomez.isFirstVi=false
}var wR=gomez.wrate?parseFloat(gomez.wrate):(gomez.wrate==0?0:1);
wR=wR<0?0:(wR>1?1:wR);
gomez.inSample=gomez.z0("a");
if(!gomez.inSample||gomez.inSample==""){if(gomez.b3(wR*sR)){gomez.inSample=1
}else{gomez.inSample=0
}gomez.z1("a",gomez.inSample)
}else{gomez.inSample=parseInt(gomez.inSample)
}gomez.runFlg=gomez.inSample>0;
if(gomez.runFlg){gomez.clickT=gomez.j2();
gomez.h1=function(A,B){return A?A:B
};
gomez.gs=gomez.h1(gomez.gs,new Date().getTime());
gomez.acctId=gomez.h1(gomez.acctId,"");
gomez.pgId=gomez.h1(gomez.pgId,"");
gomez.grpId=gomez.h1(gomez.grpId,"");
gomez.E=function(A){this.s=A
};
gomez.E.prototype={g1:function(C){var B=gomez,A=B.g6(C);
if(A){A.e=B.b5()
}}};
gomez.L=function(A){this.a=A
};
gomez.L.prototype={g2:function(C){var H=gomez,B=H.b5();
var I=document.getElementsByTagName(C);
var F=H.k;
if(C=="script"){F=H.j
}if(C=="iframe"){F=H.l
}if(I){var D=I.length;
for(var E=0;
E<D;
E++){var G=I[E].src||I[E].href;
if(G&&!F[G]){var A=new gomez.E(F);
H.grm[G]=A;
F[G]=new H.c7(G,B);
if(H.gIE&&C=="script"){H.e2(I[E],"readystatechange",H.d2,false)
}else{H.e2(I[E],"load",A.g1,false)
}}}}}};
gomez.L.m=new Object;
gomez.S=function(){var A=this,B=gomez.acctId+".r.axf8.net";
A.x=("https:"==location.protocol?"https:":"http:")+"//"+B+"/mr/b.gif?";
A.pvHttpUrl=("https:"==location.protocol?"https:":"http:")+"//"+B+"/mr/e.gif?";
A.abHttpUrl=("https:"==location.protocol?"https:":"http:")+"//"+B+"/mr/f.gif?"
};
gomez.h2=function(){var A=this;
A.gIE=false;
A.f=new Object;
A._h=0;
A.j=new Object;
A.k=new Object;
A.l=new Object;
A.m=location.href;
A.p=-1;
A.q=-1;
A.u=new Array;
A._w=false;
A.gSfr=/KHTML|WebKit/i.test(navigator.userAgent);
A.grm=new Object;
A.b;
A.d=false;
A.x=false;
A.s=new gomez.S;
A._a=false;
A.h6=false;
A.n1=0;
A.c=false
};
gomez.h3(gomez,{h5:function(A){try{var C=document.createElement("script");
C.async=true;
if(navigator.userAgent.indexOf("Firefox/3.5")!=-1){C.defer=true
}C.src=A;
C.type="text/javascript";
if(document.body){document.body.appendChild(C)
}else{if(document.documentElement.getElementsByTagName("head")[0]){document.documentElement.getElementsByTagName("head")[0].appendChild(C)
}}}catch(D){var B=gomez;
if(B.gSfr){document.write("<script src='"+A+"'><\/script>")
}}},a9:function(){var C=gomez,B=C.z0("a"),G=C.b0("__g_u"),E=C.z0("h"),A=C.z0("b");
C.gc.h=A;
if(E){C.n1=parseInt(E)
}if(!C.gc.h){C.gc.h=1
}C.z1("b",parseInt(C.gc.h)+1);
if(B){C.a=parseInt(B);
if(C.a==1){C._w=true
}else{if(C.a==3){C.x=true;
C._w=true
}}C.d=true
}if(!C.gc.a){return 
}if(A){C.gc.c=C.z0("c");
C.gc.i=C.z0("e");
C.gc.j=C.z0("f");
C.iFS=false
}else{var D="v=1";
C.c2("__g_u","1",new Date(C.gt()+1000));
C.iFS=true;
if(C.b0("__g_u")&&G&&G!="1"&&G.indexOf("NaN")==-1&&G.indexOf("undefined")==-1){D="v=0";
var F=G.split("_");
C.b2(parseInt(F[0]),parseInt(F[1])+1);
if(F[4]&&F[4]!="0"&&C.gt()<parseInt(F[5])&&F[2]&&F[2]!="0"){C.b1(parseFloat(F[2]),parseFloat(F[3]),parseFloat(F[4]),parseInt(F[5]));
if(F[6]){C.n0(parseInt(F[6]))
}}}C.h6=true
}C.gc.d=C.z0("d");
if(!C.gc.d||(C.gc.d&&C.gc.d==0)){C.z1("d",1);
C.gc.d=1
}C.b=C.z0("g");
C.j8();
if(B&&!C.isFirstVi&&C._w&&!C._a){C.h7();
C._a=true
}},h7:function(){var B=gomez,A=B.tloc?B.tloc:("https:"==location.protocol?"https:":"http:")+"//"+B.acctId+".t.axf8.net/js/gtag7.0.js";
B.h5(A)
},n0:function(B){var A=gomez,E=new Date(A.gt()+946080000000),D=A.b0("__g_u");
A.n1=B;
A.z1("h",B);
if(D&&D!="1"&&D.indexOf("NaN")==-1&&D.indexOf("undefined")==-1){var C=D.split("_");
D=""+C[0]+"_"+C[1]+"_"+C[2]+"_"+C[3]+"_"+C[4]+"_"+C[5]+"_"+B;
A.c2("__g_u",D,E)
}},b1:function(A,C,E,D){var B=this;
if(C==undefined){C=1
}B.d=true;
B.z1("e",A);
B.z1("f",C);
B.gc.i=A;
B.gc.j=C;
B.h4(A,C,E,D)
},b3:function(C,A,D){var B=this;
B.d=true;
if(D==undefined){D=1
}if(C==0||C==1){B.a=C;
if(C==1){B._w=true;
if(!B._a){B.h7();
B._a=true
}}else{B.d=false
}B.z1("a",B.a);
if(A!=undefined){B.b1(A,D)
}}else{if(C==2){B.h4(A,D)
}}},h4:function(D,C,B,G){var H=this,F=new Date(H.gt()+946080000000),E=H.b0("__g_u");
if(E&&E!="1"&&E.indexOf("NaN")==-1&&E.indexOf("undefined")==-1){var A=E.split("_"),I;
if(G){I=G
}else{if(B&&B>=0){I=new Date(H.gt()+parseInt(B*86400000)).getTime()
}else{B=5;
I=new Date(H.gt()+432000000).getTime()
}}E=""+A[0]+"_"+A[1]+"_"+D+"_"+C+"_"+B+"_"+I;
H.c2("__g_u",E,F)
}},b6:function(){var A=gomez;
A.p=A.b5()
},f8:function(){var A=this;
if(A.pollId1){clearInterval(A.pollId1)
}},b7:function(){var A=gomez;
A.f8();
A.q=A.b5()
},c7:function(A,C){var B=this;
B.m=A;
B.s=C
},c8:function(){var D=gomez,F=D.b5(),A=document.images.length;
if(A>D._h){for(var C=D._h;
C<A;
++C){var B=document.images[C].src;
if(B){var E=new gomez.E(D.f);
D.grm[B]=E;
D.f[B]=new D.c7(B,F);
D.e2(document.images[C],"load",D.c4,false);
D.e2(document.images[C],"error",D.c5,false);
D.e2(document.images[C],"abort",D.c6,false)
}}}D._h=A
},c4:function(C){var B=gomez,A=B.g6(C);
if(A){A.e=B.b5()
}},c5:function(C){var B=gomez,A=B.g6(C);
if(A){A.e=B.b5();
A.b=1
}},c6:function(C){var B=gomez,A=B.g6(C);
if(A){A.a=B.b5()
}},g6:function(D){var C=gomez,D=window.event?window.event:D,A=C.d8(D),B;
if(C.grm[A.src||A.href]&&C.grm[A.src||A.href].s){B=C.grm[A.src||A.href].s[A.src||A.href]
}return B
},d2:function(){var A=gomez;
var C=window.event?window.event:C,B=A.d8(C);
if(B.readyState=="loaded"||B.readyState=="complete"){var D=A.j[B.src];
if(D){D.e=A.b5()
}}},nameEvent:function(B){var A=this;
A.f6(B,1)
},startInterval:function(B){var A=this;
A.f6(B,2,1)
},endInterval:function(B){var A=this;
A.f6(B,2,2)
},f6:function(E,D,A){if(E&&E.length>20){E=E.substring(0,20)
}var B=this,C=B.u;
if(D==3){C[C.length]={n:"a",a:E,b:A,e:D,f:undefined}
}else{C[C.length]={n:"a",a:E,b:B.b5(),e:D,f:A}
}},customValue:function(C,A){var B=this;
if(typeof (A)!="number"){return 
}B.f6(C,3,A)
},d8:function(A){if(gomez.gIE){return A.srcElement||{}
}else{return A.currentTarget||A.target||{}
}},e2:function(D,C,B,F){var E="on"+C;
if(D.addEventListener){D.addEventListener(C,B,F)
}else{if(D.attachEvent){D.attachEvent(E,B)
}else{var A=D[E];
if(typeof D[E]!="function"){D[E]=B
}else{D[E]=function(G){A(G);
B(G)
}
}}}},i1:function(){var C=window.document,A=false,B=function(){if(!A){A=true;
gomez.b6();
gomez.a9()
}};
(function(){try{C.documentElement.doScroll("left")
}catch(D){setTimeout(arguments.callee,50);
return 
}B()
})();
C.onreadystatechange=function(){if(C.readyState=="complete"){C.onreadystatechange=null;
B()
}}
},j7:function(B,F){try{var A=this,E=gomez;
if(!B){return 
}B+="{n:u|e:1}";
var D="";
if(A.isFirstVi){D="&a="+E.acctId+"&r=1&s=1"
}else{if(A.iFS){D="&a="+E.acctId+"&r="+A.j6()
}}if(window.encodeURIComponent){B=encodeURIComponent(B)
}else{B=escape(B)
}E.h5(E.e(F)+"info="+B+D)
}catch(C){}return 
},e:function(A){if(!/\?|&/.test(A)){if(!/\?/.test(A)){A+="?"
}else{A+="&"
}}return A
},j8:function(){var A=gomez,C=new gomez.P();
var B=C.g0();
A.j7(B,A.s.pvHttpUrl)
},g7:function(){try{var t=gomez;
t.gc.a=t.acctId;
/*@cc_on t.gIE=true;@*/
if(!t.gIE){t.gIE=!-[1,]
}if(t.gIE){t.i1();
window.attachEvent("onload",t.b7)
}else{if(window.addEventListener){window.addEventListener("DOMContentLoaded",t.b6,false);
window.addEventListener("load",t.b7,false)
}else{if(t.gSfr){var m=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(m);
delete m;
t.b6();
t.b7()
}},10)
}else{return 
}}}if(!t.jbo){t.c8();
t.pollId1=setInterval(t.c8,10)
}if(!t.gIE){t.a9()
}}catch(e){return 
}}});
gomez.h2();
gomez.g7()
}}catch(e){}var JSON;
if(!JSON){JSON={}
}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}
}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){if(typeof rep[i]==="string"){k=rep[i];
v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());
var docViewer;
function getDocViewer(){if(docViewer){return docViewer
}else{docViewer=window.FlexPaperViewer_Instance.getApi()
}return docViewer
}window.FlexPaperViewer=window.$f=function(){var A=arguments[2].config;
window.FlexPaperViewer_Instance=flashembed(arguments[1],{src:arguments[0]+".swf",version:[10,0],expressInstall:"js/expressinstall.swf"},{SwfFile:escape(A.SwfFile),Scale:A.Scale,ZoomTransition:A.ZoomTransition,ZoomTime:A.ZoomTime,ZoomInterval:A.ZoomInterval,FitPageOnLoad:A.FitPageOnLoad,FitWidthOnLoad:A.FitWidthOnLoad,PrintEnabled:A.PrintEnabled,FullScreenAsMaxWindow:A.FullScreenAsMaxWindow,ProgressiveLoading:A.ProgressiveLoading,MinZoomSize:A.MinZoomSize,MaxZoomSize:A.MaxZoomSize,SearchMatchAll:A.SearchMatchAll,SearchServiceUrl:A.SearchServiceUrl,InitViewMode:A.InitViewMode,BitmapBasedRendering:A.BitmapBasedRendering,StartAtPage:A.StartAtPage,ViewModeToolsVisible:A.ViewModeToolsVisible,ZoomToolsVisible:A.ZoomToolsVisible,NavToolsVisible:A.NavToolsVisible,CursorToolsVisible:A.CursorToolsVisible,SearchToolsVisible:A.SearchToolsVisible,localeChain:A.localeChain,key:A.key})
};
function onExternalLinkClicked(A){window.location.href=A
}function onProgress(A,B){}function onDocumentLoading(){}function onCurrentPageChanged(A){}function onDocumentLoaded(A){}function onPageLoading(A){}function onPageLoaded(A){}function onDocumentLoadedError(A){}function onDocumentPrinted(){}(function(){var G=document.all,I="http://www.adobe.com/go/getflashplayer",C=typeof jQuery=="function",E=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,B={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};
if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};
__flash_savedUnloadHandler=function(){}
})
}function H(M,L){if(L){for(var K in L){if(L.hasOwnProperty(K)){M[K]=L[K]
}}}return M
}function A(K,N){var M=[];
for(var L in K){if(K.hasOwnProperty(L)){M[L]=N(K[L])
}}return M
}window.flashembed=function(K,M,L){if(typeof K=="string"){K=document.getElementById(K.replace("#",""))
}if(!K){return 
}K.onclick=function(){return false
};
if(typeof M=="string"){M={src:M}
}return new D(K,H(H({},B),M),L)
};
var F=H(window.flashembed,{conf:B,getVersion:function(){var M,K;
try{K=navigator.plugins["Shockwave Flash"].description.slice(16)
}catch(O){try{M=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
K=M&&M.GetVariable("$version")
}catch(N){try{M=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
K=M&&M.GetVariable("$version")
}catch(L){}}}K=E.exec(K);
return K?[K[1],K[3]]:[0,0]
},asString:function(L){if(L===null||L===undefined){return null
}var K=typeof L;
if(K=="object"&&L.push){K="array"
}switch(K){case"string":L=L.replace(new RegExp('(["\\\\])',"g"),"\\$1");
L=L.replace(/^\s?(\d+\.?\d+)%/,"$1pct");
return'"'+L+'"';
case"array":return"["+A(L,function(O){return F.asString(O)
}).join(",")+"]";
case"function":return'"function()"';
case"object":var M=[];
for(var N in L){if(L.hasOwnProperty(N)){M.push('"'+N+'":'+F.asString(L[N]))
}}return"{"+M.join(",")+"}"
}return String(L).replace(/\s/g," ").replace(/\'/g,'"')
},getHTML:function(O,L){O=H({},O);
var N='<object width="'+O.width+'" height="'+O.height+'" id="'+O.id+'" name="'+O.id+'"';
if(O.cachebusting){O.src+=((O.src.indexOf("?")!=-1?"&":"?")+Math.random())
}if(O.w3c||!G){N+=' data="'+O.src+'" type="application/x-shockwave-flash"'
}else{N+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
}N+=">";
if(O.w3c||G){N+='<param name="movie" value="'+O.src+'" />'
}O.width=O.height=O.id=O.w3c=O.src=null;
O.onFail=O.version=O.expressInstall=null;
for(var M in O){if(O[M]){N+='<param name="'+M+'" value="'+O[M]+'" />'
}}var P="";
if(L){for(var K in L){if(L[K]){var Q=L[K];
P+=K+"="+(/function|object/.test(typeof Q)?F.asString(Q):Q)+"&"
}}P=P.slice(0,-1);
N+='<param name="flashvars" value=\''+P+"' />"
}N+='<param name="wmode" value="opaque"/>';
N+="</object>";
return N
},isSupported:function(K){return J[0]>K[0]||J[0]==K[0]&&J[1]>=K[1]
}});
var J=F.getVersion();
function D(K,O,N){if(F.isSupported(O.version)){K.innerHTML=F.getHTML(O,N)
}else{if(O.expressInstall&&F.isSupported([6,65])){K.innerHTML=F.getHTML(H(O,{src:O.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title})
}else{if(!K.innerHTML.replace(/\s/g,"")){var M=((document.location.protocol=="https:")?"https://":"http://");
K.innerHTML="<a href='http://www.adobe.com/go/getflashplayer'><img src='"+M+"www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>";
if(K.tagName=="A"){K.onclick=function(){location.href=I
}
}}if(O.onFail){var L=O.onFail.call(this);
if(typeof L=="string"){K.innerHTML=L
}}}}if(G){window[O.id]=document.getElementById(O.id)
}H(this,{getRoot:function(){return K
},getOptions:function(){return O
},getConf:function(){return N
},getApi:function(){return K.firstChild
}})
}if(C){jQuery.tools=jQuery.tools||{version:"1.2.5"};
jQuery.tools.flashembed={conf:B};
jQuery.fn.flashembed=function(L,K){return this.each(function(){$(this).data("flashembed",flashembed(this,L,K))
})
}
}})();
$(function(){var B=0;
var N=300;
var h=500;
var Q=0;
var A=0;
var L=false;
var Y=0;
var S=0;
var H=".uheader .newmenu-container";
var W=".uheader .newmenu-container .newmenu-contents";
var U=".uheader .newmenu-container .newmenu-contents div.level.primary";
var i=".uheader .newmenu-container .newmenu-contents div.level.middle.one";
var g=".uheader .newmenu-container .newmenu-contents div.level.middle.two";
var X=".uheader .newmenu-container .newmenu-contents div.level.menu-content";
var I=true;
var C=true;
var b=0-$(U).width();
$(i).css("margin-left",b);
var F=0-$(i).width();
$(g).css("margin-left",F);
var V=0-($(U).width()+$(i).width());
$(X).css("margin-left",V);
var R="";
var P=false;
if($.browser.msie){$(U+" img.selectedImg").attr("src","/etc/designs/intel/us/en/images/new-menu-background-white-selected-IE.png");
$(i+" img.selectedImg").each(function(j){$(this).attr("src","/etc/designs/intel/us/en/images/new-menu-background-white-selected-IE.png")
});
$(g+" img.selectedImg").each(function(j){$(this).attr("src","/etc/designs/intel/us/en/images/new-menu-background-white-selected-IE.png")
})
}function E(){$(U+"  div.primaryItemContainer").each(function(j){A+=$(this).outerHeight("true")
});
if($.browser.msie){A+=1
}L=true
}function a(q,m){var l=$(q).hasClass("open");
var k=false;
var j=0;
if(!l){$(q).css({visibility:"hidden",display:"block"})
}if($(m).css("display")=="none"){k=true
}if(k){$(m).show()
}if(q==X){var n=0;
var p=0;
$(m+" div.links-column").each(function(r){if($(this).hasClass("no-column-two")){n+=$(this).outerHeight("true")
}else{if($(this).hasClass("one")){p=$(this).outerHeight("true");
if($(this).next().hasClass("two")){if($(this).next().outerHeight("true")>p){p=$(this).next().outerHeight("true")
}}}n+=p;
p=0
}});
if($(m+" h2").length>0){n+=$(m+" h2").outerHeight("true")
}if($(m+" div.highlight").length>0){var o=$(m+" div.highlight div.highlight-img").outerHeight();
if($(m+" div.highlight div.highlight-content").outerHeight()>o){o=$(m+" div.highlight div.highlight-content").outerHeight()
}$(m+" div.highlight").css("height",o);
n+=$(m+" div.highlight").outerHeight("true")
}$(m).css("height",n);
Y=$(m).outerHeight("true");
S=$(X+" div.new-menu-close-button").height()+5;
j=Y+S
}else{j=$(m).outerHeight()
}if(k){$(m).hide()
}if(!l){$(q).css({visibility:"",display:""})
}return j
}function f(m,l){var k=22;
var j=l+" h2";
if(m>(Y+S)){k=m-(Y+S)
}$(j).css("padding-top",k);
$(j).addClass("margin-set");
$(l).css("height",Y+k);
return(Y+k+S)
}function G(l,k,m){var j=0;
if(l!=""){j=a(i,l)
}if(k!=""){if(a(g,k)>j){j=a(g,k)
}}if(m!=""){if(a(X,m)>j){j=a(X,m)
}}if(j<A){j=A
}if($(m+" div.highlight").length>0&&!$(m+" h2").hasClass("margin-set")){j=f(j,m)
}$(U).height(j);
$(i).height(j);
$(g).height(j);
$(X).height(j)
}function O(l){var m=$(l).position().top;
var k=$(l).height();
var j=$("img",$(l).parent()).height();
$("img",$(l).parent()).show();
if($("img",$(l).parent()).css("margin-top")!="0px"){$("img",$(l).parent()).animate({"margin-top":m+(k/2)-(j/2)},N,"linear")
}else{$("img",$(l).parent()).css("margin-top",m+(k/2)-(j/2))
}if($(l).parent().parent().hasClass("middle")&&$(l).parent().parent().hasClass("one")&&I){$("img",$(l).parent()).hide();
I=false
}if($(l).parent().parent().hasClass("middle")&&$(l).parent().parent().hasClass("two")&&C){$("img",$(l).parent()).hide();
C=false
}}function M(l){var m=$(l).position().top;
var k=$(l).height();
var j=$("img",$(l).parent()).height();
$("img",$(l).parent()).show();
$("img",$(l).parent()).css("margin-top",m+(k/2)-(j/2)-3)
}function Z(k){var j="first";
if(R!=""&&!P){j=R
}var l="";
var n="";
var m=$(i+" "+k+" p."+j).attr("menucontainer");
if(m.indexOf("_content")<0){l=m;
n=$(g+" "+l+" p."+j).attr("menucontainer")
}else{n=m
}$(i+" div.middle-content").hide().removeClass("open");
$(i+" "+k).show().addClass("open");
$(i+" "+k+" p.middle-item").removeClass("selected");
$(i+" "+k+" p."+j).addClass("selected");
if(!$(i).hasClass("open")){$(i).show().addClass("open");
$(i).animate({"margin-left":"0px"},N,"linear",function(){$(i+" img.selectedImg").show();
if(l==""){T(n,true)
}else{K(l,n)
}})
}else{if(l==""){T(n,true)
}else{K(l,n)
}}O(i+" "+k+" p."+j)
}function K(k,l){var j="first";
if(R!=""&&!P){j=R
}$(X+" div.main-content.open").hide();
$(X+" "+l).show();
$(g+" div.middle-content").hide().removeClass("open");
$(g+" "+k).show().addClass("open");
$(g+" "+k+" p.middle-item").removeClass("selected");
$(g+" "+k+" p."+j).addClass("selected");
if(!$(g).hasClass("open")){$(g).show().addClass("open");
$(g).animate({"margin-left":"0px"},N,"linear",function(){$(g+" img.selectedImg").show();
T(l,false)
})
}else{T(l,false)
}O(g+" "+k+" p."+j)
}function T(k,j){$(X+" div.main-content").hide().removeClass("open");
$(X+" "+k).show().addClass("open");
if(!$(X).hasClass("open")){$(X).show().addClass("open");
$(X).animate({"margin-left":"0px"},N,"linear",function(){})
}if(j&&$(g).hasClass("open")){$(g).animate({"margin-left":F},N,"linear",function(){$(g+" div.middle-content p.middle-item").removeClass("selected");
$(g+" div.middle-content").removeClass("open");
$(g).hide().removeClass("open")
})
}P=true
}function J(k){var j="first";
if(R!=""&&!P){j=R
}M($(k));
$(U+" div.primaryItemContainer.selected").removeClass("selected");
$(k).addClass("selected");
var m=$("p",k).attr("menucontainer");
var l="";
var n="";
if($(i+" "+m+" p."+j).attr("menucontainer").indexOf("_content")<0){l=$(i+" "+m+" p."+j).attr("menucontainer");
n=$(g+" "+l+" p."+j).attr("menucontainer");
G(i+" "+m,g+" "+l,X+" "+n)
}else{n=$(i+" "+m+" p."+j).attr("menucontainer");
G(i+" "+m,"",X+" "+n)
}if(R!=""&&!P){$(U).animate({height:"toggle"},N,"linear",function(){$(U).addClass("open");
if(!L){E()
}Z(m)
})
}else{Z(m)
}}function D(){$(U+" img").css({"margin-top":"0px",display:"none"});
$(U+" div.primaryItemContainer.selected").removeClass("selected");
$(U).animate({height:"toggle"},h,"linear",function(){$(W).hide();
$(H).hide();
$(this).height(A);
$(this).removeClass("open");
$(H).removeClass("open")
})
}function d(){if($(X).hasClass("open")){$(X+" div.main-content").hide().removeClass("open");
$(X).animate({"margin-left":V,height:"toggle"},h,"linear");
$(X).delay(h/2).hide().removeClass("open")
}if($(g).hasClass("open")){$(g+" div.middle-content").hide().removeClass("open");
$(g+" div.middle-content p.middle-item").removeClass("selected");
$(g).animate({"margin-left":F,height:"toggle"},h,"linear",function(){$(g).hide().removeClass("open")
})
}if($(i).hasClass("open")){$(i+" div.middle-content").hide().removeClass("open");
$(i+" div.middle-content p.middle-item").removeClass("selected");
$(i).animate({"margin-left":b,height:"toggle"},h,"linear",function(){$(i).hide().removeClass("open")
})
}D();
$("#header ul li.newmenu a").removeClass("open");
I=true;
C=true;
P=false
}function c(){$(H).show().addClass("open");
$(W).show();
$("#header ul li.newmenu a").addClass("open");
if(typeof $(W).attr("programidentifier")!=="undefined"&&$(W).attr("programidentifier")!==false){R="PI-"+$(W).attr("programidentifier");
J($(U+" div.primaryItemContainer."+R))
}else{$(U).animate({height:"toggle"},N,"linear");
$(U).addClass("open");
if(!L){E()
}}}$("#header ul li.newmenu").click(function(){if($(H).hasClass("open")){d()
}else{c()
}});
$("#header ul li.newmenu a").click(function(){if($(H).hasClass("open")){d()
}else{c()
}});
$("body").click(function(j){if($(H).hasClass("open")&&!$(j.target).hasClass("dont-close-menu")){d()
}});
$(X+" div.new-menu-close-button img").click(function(){d()
});
$(U+" div.primaryItemContainer").click(function(){if(!$(this).hasClass("selected")){J(this)
}});
$(i+" div.middle-content p.middle-item").click(function(){if(!$(this).hasClass("linkItem")&&!$(this).hasClass("selected")){$(i+" div.middle-content").removeClass("open");
$(i+" div.middle-content p.middle-item.selected").removeClass("selected");
$(this).addClass("selected");
$(this).parent().addClass("open");
O(this);
var j="";
var k="";
if($(this).attr("menucontainer").indexOf("_content")<0){j=$(this).attr("menucontainer");
k=$(g+" "+j+" p.first").attr("menucontainer");
G(i+" div.middle-content.open",g+" "+j,X+" "+k);
K(j,k)
}else{k=$(this).attr("menucontainer");
G(i+" div.middle-content.open","",X+" "+k);
T(k,true)
}}});
$(g+" div.middle-content p.middle-item").click(function(){if(!$(this).hasClass("selected")){$(g+" div.middle-content").removeClass("open");
$(g+" div.middle-content p.middle-item.selected").removeClass("selected");
$(this).addClass("selected");
$(this).parent().addClass("open");
O(this);
var j=$(this).attr("menucontainer");
G(i+" div.middle-content.open",g+" div.middle-content.open",X+" "+j);
T(j,false)
}})
});
var interval;
var newsinterval;
var homeTimer=lockInterval=controlshidden=noloop=0;
var noloopShowcase=0;
var shuffleImg=1;
var carouselStart="";
var stopTicker=false;
var scrolling=false;
var pageLoadTimerDelay=5000;
var inactivityTimerDelay=5000;
var transitionInterval=3000;
var slideTimer=100;
var accordionTimer=500;
var fadeDuration=600;
var menuTimeout=500;
var tickerScrollSpeed=7000;
var popTitle;
var popDesc;
var str,bN,bM,bV,OS;
$(function(){setNavClassFromCookie();
str=navigator.appVersion.toLowerCase().replace(/[^a-zA-Z 0-9 . / _]+/g,"").split(" ");
OS=str[1].substr(0,3);
if($.browser.msie){bN="ie";
OS=str[4].substr(0,3);
bV=$.browser.version;
slideTimer=0;
bM=document.documentMode;
if(bV=="7.0"&&bM=="8"){bV="8.0"
}}if($.browser.opera){bN="opera";
bV=$.browser.version.substr(0,4)
}if($.browser.mozilla){var H=navigator.userAgent.toLowerCase();
H=H.replace(/[^a-zA-Z 0-9 . / _]+/g,"").split(" ");
bN="ff";
bV=H[H.length-1].split("/",2)[1].substr(0,3)
}if($.browser.webkit){if(str[str.length-2].split("/",2)[0]==="chrome"){bN=str[str.length-2].split("/",2)[0];
bV=str[str.length-2].split("/",2)[1].substr(0,4)
}else{if(str[str.length-2].split("/",2)[0]==="mobile"){bN=str[str.length-2].split("/",2)[0].substr(0,1)+"_"+str[str.length-1].split("/",2)[0];
bV=str[6];
if(str[1]==="ipad"){bV=str[5]
}}else{bN=str[str.length-1].split("/",2)[0];
bV=str[str.length-2].split("/",2)[1]
}}}$("body").addClass(OS+" "+bN+" "+bN+bV.replace(/[^0-9]+/g,"_"));
$("body.ie .uheader.header #header li.directory").attr("aria-haspopup","true");
$("body.ie .uheader.header div.unav li.subnavtext").each(function(J){$(this).attr("aria-haspopup","true")
});
if($(".printlogo").length==0){$("<img src='/etc/designs/intel/us/en/images/printlogo.png' class='printlogo' style='display:none'/>").prependTo("body")
}$(".navigation:nth-child(3)").addClass("nobodr");
$(".cust-table table tr td:first-child").addClass("addcolor");
$(".cust-table table tr:even").addClass("evenrows");
$(".cust-table table tr:odd").addClass("oddrows");
var A=$(window).height();
var B=$(window).width();
try{$(".pdf-link").fancybox({width:"900",height:"660",autoScale:"true"})
}catch(C){}var D="";
$('.clearOnFocus[title="password"], .clearOnFocus[title="Password"]').live("focus click",function(){if($(this).siblings().length>0){$(this).hide().siblings().removeClass("hidden").show()
}});
centerVertically($(".centerMeVertically").not(".imagetext centerMeVertically"));
centerVertically($(".imagetext .centerMeVertically"),0,305);
$('.clearOnFocus[type="password"]').blur(function(){if($(this).siblings().length>0&&$(this).val()==""){$(this).hide().siblings().removeClass("hidden").show()
}});
$("body").delegate(".clearOnFocus","focus",function(){if($(this).val()==$(this).attr("title")){D=$(this).val();
$(this).val("")
}});
$("body").delegate(".clearOnFocus","blur",function(){if($(this).val()==""){$(this).val(D)
}});
$(".share-buttons-toggle").bind("click",function(){$(".extra-share-buttons").toggle();
$(".share-buttons-toggle span.share-more").toggle();
$(".share-buttons-toggle span.share-less").toggle()
});
$(".module .sidebar a").bind("click",function(L){var J=$(this).parent("li").index();
var M=$(this).parents(".module-content").find(".panel").eq(J);
$(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
$(M).addClass("selected").siblings().removeClass("selected");
if($(this).parents(".related-comp").hasClass("module")){var K=$(this).parents(".related-comp").find(".relatedViewMore");
switch($(this).data("name")){case"assetdetail":K.find("span").text(K.data("viewcontent"));
K.attr("href",K.data("urlcontent"));
break;
case"topiccollection":K.find("span").text(K.data("viewtopics"));
K.attr("href",K.data("urltopics"));
break;
case"productcollection":K.find("span").text(K.data("viewproducts"));
break
}}});
$("#main-hero .home-toggle, .collection-hero .home-toggle").bind("click",function(J){J.preventDefault();
$("#main-hero .business-toggle, .collection-hero .business-toggle").removeClass("active");
$("#main-hero .home-toggle, .collection-hero .home-toggle").addClass("active");
$("#main-hero, .collection-hero ").removeClass("business").addClass("home");
if($("#main-hero .carousel-controls.home .carousel-dot.active, .collection-hero .carousel-controls.home .carousel-dot.active").hasClass("grey")){$("#main-hero, .collection-hero ").removeClass("blue").addClass("grey")
}if($("#main-hero .carousel-controls.home .carousel-dot.active, .collection-hero .carousel-controls.home .carousel-dot.active").hasClass("blue")){$("#main-hero, .collection-hero ").removeClass("grey").addClass("blue")
}});
$("#main-hero .business-toggle, .collection-hero .business-toggle").bind("click",function(J){J.preventDefault();
$("#main-hero .home-toggle, .collection-hero .home-toggle").removeClass("active");
$("#main-hero .business-toggle, .collection-hero .business-toggle").addClass("active");
$("#main-hero, .collection-hero ").removeClass("home").addClass("business");
if($("#main-hero .carousel-controls.business .carousel-dot.active, .collection-hero .carousel-controls.business .carousel-dot.active").hasClass("grey")){$("#main-hero, .collection-hero ").removeClass("blue").addClass("grey")
}if($("#main-hero .carousel-controls.business .carousel-dot.active, .collection-hero .carousel-controls.business .carousel-dot.active").hasClass("blue")){$("#main-hero, .collection-hero ").removeClass("grey").addClass("blue")
}});
$(".business-toggle").live("mouseenter",function(J){showTooltip($(this).attr("alt"),$(this))
});
$(".home-toggle").live("mouseenter",function(J){showTooltip($(this).attr("alt"),$(this))
});
$(".business-toggle, .home-toggle, .save").live("mouseleave",function(){var J=$(this);
window.setTimeout(function(){if($(".tooltip-flyout").attr("hasmouse")!="true"&&J.attr("hasmouse")!="true"){hideTooltip()
}},150)
});
if($("#lookup-hero table").not(".legend").find("tr").length>5){$("#lookup-hero table").not(".legend").find("tr").each(function(J){if(J>=5){$(this).addClass("hidden")
}});
$("#lookup-hero .show-more").removeClass("hidden")
}$(".cust-table").find("table:eq(0)").each(function(K){if($(this).find("tr").length>6){$(this).find("tr").each(function(M){if(M>=6){$(this).addClass("hidden")
}});
$(this).siblings().find("tr").addClass("hidden");
var J=$(".view-more-products").data("viewMoreProductText");
var L=$(".view-more-products").data("viewLessProductText");
$(this).parent().append('<a href="#" class="show-more-a">'+J+'</a><a href="#" class="show-less-a hidden">'+L+"</a>")
}});
$(".cust-table .show-more-a").live("click",function(J){J.preventDefault();
$(this).siblings().find("tr").removeClass("hidden");
$(this).siblings(".show-less-a").removeClass("hidden");
$(this).addClass("hidden")
});
$(".cust-table .show-less-a").live("click",function(J){J.preventDefault();
$(this).siblings().each(function(K){$(".cust-table").find("table:eq(0)").each(function(L){if($(this).find("tr").length>6){$(this).find("tr").each(function(M){if(M>=6){$(this).addClass("hidden")
}})
}$(this).siblings().find("tr").addClass("hidden")
})
});
$(this).siblings(".show-more-a").removeClass("hidden");
$(this).addClass("hidden")
});
$("#lookup-hero .show-more, .cust-table .show-more").live("click",function(J){J.preventDefault();
$(this).parents("#lookup-hero, .cust-table").find("table tr, .show-less").removeClass("hidden");
$(this).addClass("hidden")
});
$("#lookup-hero .show-less, .cust-table .show-less").live("click",function(J){J.preventDefault();
$(this).parents("#lookup-hero, .cust-table").find("table tr").each(function(K){if(K>=6){$(this).addClass("hidden")
}});
$(this).parents("#lookup-hero, .cust-table").find(".show-more").removeClass("hidden");
$(this).addClass("hidden")
});
if($("body").hasClass("video-detail")){$(".video-nav ul li a").bind("click",function(K){K.preventDefault();
var J="#"+$(this).attr("rel");
$(".video-panel").addClass("hidden");
$(J).removeClass("hidden")
});
$("#conversations-hero ul li a").bind("click",function(J){J.preventDefault();
var K="#"+$(this).attr("rel");
$("#conversations-hero ul li a").removeClass("selected");
$(this).addClass("selected");
$(".conversation div").addClass("hidden");
$(K).removeClass("hidden")
})
}$(".module .header").live("click",function(J){if(J.target==this){$(this).siblings(".content").slideToggle()
}});
$(".subheading.show-more").live("click",function(J){J.preventDefault();
$(this).parent().removeClass("collapsed");
updateMenuHeight()
});
$(".subheading.show-less").live("click",function(J){J.preventDefault();
$(this).parent().addClass("collapsed");
updateMenuHeight()
});
$(".directory").live("click mouseenter",function(J){if(J.type=="click"&&$(this).attr("hasmouse")=="true"){J.preventDefault();
$(this).attr("hasmouse","");
closeNavMenu(1)
}else{$(this).attr("hasmouse","true");
if(!$(this).find("a").hasClass("selected")){$(".directory a, .sites a, .library a, .my-intel .link, .my-intel-link, .save").removeClass("selected");
closeMyIntel();
closeSigninBox();
$(this).find("a").addClass("selected");
$(this).addClass("selected");
$("#menu-wrapper").show();
$("#subnav-wrapper").css({position:"fixed",top:"61px"});
$(".boxnav.navbg").slideDown(slideTimer);
$(".subnavtext:first-child").trigger("click");
updateMenuHeight()
}}});
$("#close-menu").live("click",function(J){J.preventDefault();
closeNavMenu(1)
});
$(".subnavtext").each(function(J){$(this).bind("click mouseenter",function(K){if(K.type=="click"){K.preventDefault()
}$(this).attr("hasmouse","true");
var M=$(this);
var L=1;
if(K.type=="mouseenter"){L=100
}window.setTimeout(function(){if(!M.hasClass("active")&&M.attr("hasmouse")=="true"){$(".subnavtext").removeClass("active");
$(".submenu").hide();
$(".submenu").eq(J).show();
$("#submenu-wrapper").slideDown(slideTimer,function(){if(M.attr("hasmouse")=="true"){$(".subnavtext").removeClass("active");
M.addClass("active");
updateMenuHeight()
}});
closeNavMenu()
}},L)
})
});
$(".subnavtext").live("mouseleave",function(J){$(this).attr("hasmouse","")
});
$(".boxnav, .directory").live("mouseenter",function(J){$(this).attr("hasmouse","true")
});
$(".boxnav, .directory").live("mouseleave",function(J){$(this).attr("hasmouse","");
closeNavMenu()
});
$("#menu-close-btn").live("click",function(J){J.preventDefault();
closeNavMenu(1,true)
});
$(".language").live("click",function(J){J.preventDefault();
$("#language-chooser").slideToggle(fadeDuration,function(){$("#language-chooser").toggleClass("hidden");
$(".language").toggleClass("selected")
})
});
$("#language-chooser .close-button").live("click",function(J){J.preventDefault();
closeLanguageMenu(1,true)
});
$(".tools").live("click",function(J){J.preventDefault();
$("#tools-chooser").slideToggle(fadeDuration,function(){$("#tools-chooser").toggleClass("hidden");
$(".tools").toggleClass("selected")
})
});
$("#tools-chooser .close-button").live("click",function(J){J.preventDefault();
closeToolsMenu(1,true)
});
$(".my-intel-link").bind("mouseenter",function(K){$this=$(this);
$this.attr("hasmouse","true");
var J=($this.offset().left+($this.outerWidth()/2*0))+20;
var L=($this.offset().top+$this.outerHeight())+20;
window.setTimeout(function(){if($this.attr("hasmouse")=="true"&&$(".tooltip-flyout").attr("hasmouse")!="true"){showTooltip($this.attr("alt"),$this)
}},100)
});
$(".save, .my-intel-link").bind("mouseleave",function(J){if(!($(J.target).hasClass("my-intel-link")||$(J.target).hasClass("save"))||true){$(this).attr("hasmouse","")
}window.setTimeout(function(){if($(".tooltip-flyout").attr("hasmouse")!="true"&&$(".my-intel-link, .save").attr("hasmouse")!="true"){hideTooltip()
}},150)
});
$(".save, .my-intel-link").bind("click",function(J){J.preventDefault();
if($(".my-intel-link, .save").hasClass("selected")){closeMyIntel(1,true)
}else{closeSigninBox();
$(".my-intel .link, .currentpage").removeClass("selected");
$(".boxnav.myintelbg").slideDown(function(){$(".my-intel-link, .save").addClass("selected")
})
}});
$(".create-btn").bind("click",function(J){J.preventDefault();
$(".register-myintel").addClass("boxnav myintelbg").removeClass("hidden").show();
$(".savedcontent").addClass("hidden").removeClass("boxnav myintelbg").hide()
});
$(".register-myintel .cancel").bind("click",function(J){J.preventDefault();
$(".savedcontent").addClass("boxnav myintelbg").removeClass("hidden").show();
$(".register-myintel").addClass("hidden").removeClass("boxnav myintelbg").hide()
});
$(".savedcontent .sign-in").live("click",function(J){J.preventDefault();
$(".savedcontent .navigationmyintelfirst ul.login").addClass("hidden").hide();
$(".savedcontent .navigationmyintelfirst ul.profile").removeClass("hidden").show()
});
$(".savedcontent .log-out").live("click",function(J){$(".savedcontent .navigationmyintelfirst ul.profile").addClass("hidden").hide();
$(".savedcontent .navigationmyintelfirst ul.login").removeClass("hidden").show()
});
$(".myintelbg .close-button, .myintel-close-btn").live("click",function(J){J.preventDefault();
closeMyIntel()
});
$(".searchmyintel li a").live("click",function(K){K.preventDefault();
$(".searchmyintel li a").removeClass("selected");
$(this).addClass("selected");
var J=$(".searchmyintel li a").index(this);
$(".middlemyintel > div").removeClass("selected").addClass("hidden");
$(".middlemyintel > div").eq(J).addClass("selected").removeClass("hidden")
});
$("#footnotes .close-button").live("click",function(J){J.preventDefault();
$(this).removeClass("close-button").addClass("open-button").parents(".module").addClass("closed").find(".module-content").slideUp()
});
$("#footnotes .open-button").live("click",function(J){J.preventDefault();
$(this).removeClass("open-button").addClass("close-button").parents(".module").removeClass("closed").find(".module-content").slideDown()
});
$(document).bind("click",function(J){if($(J.target).parents(".boxnav.navbg, .directory, .sites, .library, .background-slider-items").length==0){if(!$(J.target).hasClass("slider-item")||$(J.target).attr("hasmouse")!="true"){closeNavMenu(1)
}}if($(J.target).parents(".menu-wrappermyintel, .savedcontent, .register-myintel, .my-intel-link, .save, .tooltip-flyout, .background-slider-items").length==0&&!$(J.target).hasClass("savedcontent")&&!$(J.target).hasClass("save")&&!$(J.target).hasClass("my-intel-link")&&!$(J.target).hasClass("register-myintel")){if(!$(J.target).hasClass("slider-item")||$(J.target).attr("hasmouse")=="true"){closeMyIntel(1)
}}if($(J.target).parents("#language-chooser, .language, .background-slider-items").length==0&&!$(J.target).hasClass("language")&&!$(J.target).hasClass("slider-item")){closeLanguageMenu(1)
}if($(J.target).parents("#tools-chooser, .tools, .background-slider-items").length==0&&!$(J.target).hasClass("tools")&&!$(J.target).hasClass("slider-item")){closeToolsMenu(1)
}if($(J.target).parents("#hpsform, .predictive-search, .background-slider-items, #rotatingshowcase a").length==0&&!$(J.target).hasClass("predictive-search")&&!$(J.target).hasClass("slider-item")&&!$(J.target).hasClass("prev")&&!$(J.target).hasClass("next")){$("#hpsform .predictive-search").addClass("hideme");
$("#searchBox").attr("value",$("#searchBox").attr("title"))
}if($(J.target).parents(".signin-nav-box, .sign-in-link").length==0&&!$(J.target).hasClass("signin-nav-box")){closeSigninBox(1)
}});
$(".searchmyintel li.savedCont a").mouseenter(function(){$(".recetlyViewedframe").hide();
$(".savedframe").show()
},function(){$(".recetlyViewedframe").hide()
});
$(".searchmyintel li.recentViewed a").mouseenter(function(){$(".savedframe").hide();
$(".recetlyViewedframe").show()
},function(){$(".recetlyViewedframe").hide();
$(".savedframe").show()
});
$(".see-all.more").bind("click",function(J){J.preventDefault();
$(this).siblings().show();
$(this).hide()
});
$(".see-all.less").bind("click",function(J){J.preventDefault();
$(this).siblings(".filter").slice(5).hide();
$(this).siblings(".more").show();
$(this).hide()
});
$(".see-all a").live("click",function(J){$(this).parent().trigger("click")
});
$(".close-btn, .filter-checkbox").live("click",function(J){J.preventDefault();
closePreviews()
});
$(".preview-btn").live("click",function(K){K.preventDefault();
closePreviews();
$(this).addClass("hidden");
$(this).siblings(".open-btn").addClass("hidden");
$(this).parents(".list-item-content-wrapper").find(".list-item-desc").addClass("hidden");
$(this).parents(".list-item-content-wrapper").find(".list-item-descLong").removeClass("hidden");
$(this).siblings(".view-btn, .close-btn").removeClass("hidden");
$(this).parents(".list-item, .list-item-wrapper").addClass("open");
var J=$(this).parents(".list-item-content-wrapper").outerHeight();
if($(this).parents(".list-item").find(".list-item-img-wrapper").length>0){if($(this).parents(".list-item").find(".list-item-img-wrapper").outerHeight()>J){J=$(this).parents(".list-item").find(".list-item-img-wrapper").outerHeight()
}}$(this).parents(".list-item-content-wrapper, .list-item-img-wrapper").css("height",J);
$(this).parents(".list-item-wrapper").css("height",J+60);
matchHeights()
});
$(".filter-list-title").live("click",function(J){J.preventDefault();
if(!$(this).hasClass("no-toggle")&&!$(this).parents(".filter-list-wrapper").hasClass("no-toggle")){if($(this).parents("#filter-list-list").hasClass("locked")){$(this).toggleClass("closed");
$(this).parent(".filter-list-wrapper").siblings(".filter-list-wrapper").not(".filter-list-wrapper.no-toggle").find(".filter-list-title").addClass("closed");
$(this).parents("#filter-list-list").find(".filter-list-title.closed").siblings(".filter-list,.toggle-options").slideUp(slideTimer,function(){matchHeights()
});
if($(this).hasClass("closed")){if($(this).parent(".filter-list-wrapper").next(".filter-list-wrapper").length>0){$(this).parent(".filter-list-wrapper").next(".filter-list-wrapper").not(".filter-list-wrapper.no-toggle").find(".filter-list-title").removeClass("closed");
$(this).parent(".filter-list-wrapper").next(".filter-list-wrapper").not(".filter-list-wrapper.no-toggle").find(".filter-list, .toggle-options").not(".hidden").slideDown(slideTimer,function(){matchHeights()
})
}else{$(this).parent(".filter-list-wrapper").prev(".filter-list-wrapper").not(".filter-list-wrapper.no-toggle").find(".filter-list-title").removeClass("closed");
$(this).parent(".filter-list-wrapper").prev(".filter-list-wrapper").not(".filter-list-wrapper.no-toggle").find(".filter-list, .toggle-options").not(".hidden").slideDown(slideTimer,function(){matchHeights()
})
}}else{$(this).removeClass("closed");
$(this).siblings(".filter-list, .toggle-options").not(".hidden").slideDown(accordionTimer,function(){matchHeights()
})
}}else{$(this).siblings("ul").children("li").show();
$(this).siblings("ul").children("li.see-all.more").hide();
$(".filter-list-title").parent(".filter-list-wrapper").not(".filter-list-wrapper.no-toggle").find(".filter-list-title").not(this).addClass("closed");
$(".filter-list-title").parents(".filter-list-wrapper").find(".filter-list-title.closed").siblings(".filter-list,.toggle-options").slideUp(slideTimer,function(){matchHeights()
});
if($(this).hasClass("closed")){$(this).removeClass("closed");
$(this).siblings(".filter-list, .toggle-options").not(".hidden").slideDown("fast",function(){matchHeights();
$(".see-all.more").siblings().show();
$(".see-all.more").hide()
})
}else{$(this).addClass("closed");
$(this).siblings(".filter-list, .toggle-options").slideUp("fast",function(){matchHeights()
})
}}}});
$(".filter-list-toggle .toggle-option").live("click",function(K){K.preventDefault();
if(!$(this).hasClass("active")){var J=$(this).index();
$(this).addClass("active");
$(this).siblings(".toggle-option").removeClass("active");
$(this).parents(".filter-list-wrapper").find(".filter-list.option").addClass("hidden").hide().removeClass("active");
$(this).parents(".filter-list-wrapper").find(".filter-list.option").eq(J).addClass("active").removeClass("hidden").show()
}});
if($("body").hasClass("video-detail")){$(".video-nav ol li a").bind("click",function(K){K.preventDefault();
var J="#"+$(this).attr("rel");
$(".video-panel").addClass("hidden");
$(J).removeClass("hidden")
});
$(".conversation #forums, .conversation #blogs").addClass("hidden");
$("#conversations-hero ul li a").bind("click",function(J){J.preventDefault();
var K="#"+$(this).attr("rel");
$("#conversations-hero ul li").removeClass("selected");
$(".conversation #forums, .conversation #blogs, .conversation #tweets").removeClass("selected").addClass("hidden");
$(this).parent().removeClass("hidden").addClass("selected");
$(K).removeClass("hidden")
})
}$("#gallery-hero ul li a").bind("click",function(M){M.preventDefault();
$(this).parent().addClass("selected-photo").siblings().removeClass("selected-photo");
$("#gallery-hero .image-viewer").show();
$(".thumbs-viewer").hide();
$(".view-gallery").show();
var J=$(this).parents(".module").find(".carousel-controls");
J.attr("itemContainer",".image-viewer");
J.find(".carousel-dot").remove();
for(var L=0;
L<$(".image-viewer-wrapper .carousel-item").length;
L++){J.find(".carousel-right").before('<img class="carousel-dot" src="/etc/designs/intel/us/en/images/blank.png" />')
}var K=$("#gallery-hero ul li a").index(this);
if(K==0){J.find(".carousel-left").css("visibility","hidden")
}else{J.find(".carousel-left").css("visibility","")
}if(K==($("#gallery-hero ul li a").length-1)){J.find(".carousel-right").css("visibility","hidden")
}else{J.find(".carousel-right").css("visibility","")
}$(".image-viewer-wrapper .carousel-item").removeClass("active").css({"z-index":"",left:""});
J.find(".carousel-dot").eq(K).addClass("active");
$(".image-viewer-wrapper .carousel-item").eq(K).addClass("active").css({"z-index":"1",left:0})
});
$("#gallery-hero a.view-gallery").bind("click",function(L){L.preventDefault();
$("#gallery-hero .image-viewer").hide();
$(".thumbs-viewer").show();
$(".view-gallery").hide();
var J=$(this).parents(".module").find(".carousel-controls");
J.attr("itemcontainer",".thumbs-viewer");
J.find(".carousel-dot").remove();
for(var K=0;
K<$(".thumbs-viewer .carousel-item").length;
K++){J.find(".carousel-right").before('<img class="carousel-dot" src="/etc/designs/intel/us/en/images/blank.png" />')
}J.find(".carousel-dot").first().addClass("active")
});
$(".carousel-dot").live("click",function(M){M.preventDefault();
var J=$(this).index()-$(this).siblings(".carousel-left").length;
if(!$(this).hasClass("active")){var L=$(this).parents(".gallery-controls").find(".carousel-controls").attr("itemContainer");
if($(L).length>1){var O=$(this).parent().parent();
while(O.find(L).length<1){O=O.parent()
}L=O.find(L)
}var N=$(L).find(".carousel-item").eq(J);
var K=$(L).find(".carousel-item.active");
var Q=1;
if(($(this).parent().find(".carousel-dot.active").position().left-$(this).position().left)<0){Q=-1
}K.css({left:0});
$(this).parent().find(".carousel-dot").removeClass("active");
$(this).addClass("active");
var P=$(this);
if($(this).prev(".carousel-dot").length==0){$(this).parent().find(".carousel-left").css("visibility","hidden")
}else{$(this).parent().find(".carousel-left").css("visibility","")
}if($(this).next(".carousel-dot").length==0){$(this).parent().find(".carousel-right").css("visibility","hidden")
}else{$(this).parent().find(".carousel-right").css("visibility","")
}$(L).find(".carousel-item").not(".active").css({"z-index":"1",left:(-Q*$(L).innerWidth())});
$(L).find(".carousel-item").css("z-index","0").removeClass("active");
K.css("z-index","1").animate({left:(Q*$(L).innerWidth())},500);
N.css("z-index","1").animate({left:0},500,function(){$(L).find(".carousel-item").not(N).removeClass("active").css({left:$(L).innerWidth()});
N.addClass("active");
K.css("z-index","0");
if(P.hasClass("grey")){$(L).parents(".module").removeClass("blue").addClass("grey")
}else{if(P.hasClass("blue")){$(L).parents(".module").removeClass("grey").addClass("blue")
}}})
}});
$(".carousel-right").live("click",function(K){K.preventDefault();
var J=$(this).parent().attr("itemContainer");
if($(J).length>1){var L=$(this).parent().parent();
while(L.find(J).length<1){L=L.parent()
}J=L.find(J)
}nextCarousel($(J),$(this).parent())
});
$(".carousel-left").live("click",function(K){K.preventDefault();
var J=$(this).parent().attr("itemContainer");
if($(J).length>1){var L=$(this).parent().parent();
while(L.find(J).length<1){L=L.parent()
}J=L.find(J)
}prevCarousel($(J),$(this).parent())
});
$("#footer .latest-news .toggle").live("click",function(J){J.preventDefault();
toggleFooterNews()
});
scrolling=false;
if(newsinterval!=undefined){newsinterval=window.clearInterval(newsinterval)
}newsinterval=window.setInterval(scrollTicker,tickerScrollSpeed);
$("ul.subnav li").bind("click mouseenter",function(K){var N=$(this).outerWidth();
var J=$(this).position();
var L=Math.round(J.left);
var O=L+Math.round(N/2)-1000;
var M=O+"px bottom";
if(!$(this).children(".sign-in-link").length>0||$(this).children(".lock-icon").length>0){$("ul.subnav").css("background-position",M)
}});
$("ul.subnav li").bind("mouseleave",function(K){if($("ul.subnav li.selected").length>0){var N=$("ul.subnav li.selected").outerWidth();
var J=$("ul.subnav li.selected").position();
var L=Math.round(J.left);
var O=L+Math.round(N/2)-1000;
var M=O+"px bottom";
$("ul.subnav").css("background-position",M)
}});
$(".my-intel .link, .sign-in-link .link").live("click mouseenter",function(K){var N=$(this).width();
var J=$(this).offset();
var L=Math.round(J.left);
var O=L+Math.round(N/2)-4000;
if($(this).is(".my-intel-link")||$(this).is(".save")){O-=$("#my-intel-count").width()
}var M=O+"px top";
if(!$(this).parents(".sign-in-link").length>0||$(this).children(".lock-icon").length>0){$(".home.wrapper #header").css("background-position",M)
}});
$(".my-intel .link, .sign-in-link .link").live("mouseleave",function(K){if($(".my-intel .link.selected").length>0){var N=$(".my-intel .link.selected").width();
var J=$(".my-intel .link.selected").offset();
var L=Math.round(J.left);
var O=L+Math.round(N/2)-4000;
if($(this).is(".my-intel-link")||$(this).is(".save")){O-=$("#my-intel-count").width()
}var M=O+"px top";
$(".home.wrapper #header").css("background-position",M)
}else{$(".home.wrapper #header").css("background-position","")
}});
$(".sign-in-link .link").live("click mouseenter",function(K){var N=$(this).width();
var J=$(this).offset();
var L=Math.round(J.left);
var O=L+Math.round(N/2)-3990;
if($(this).is(".sign-in-link")||$(this).is(".save")){O-=$("#sign-in-link").width()
}var M=O+"px top";
if($(this).children(".down-arrow").length<=0){$(".wrapper #header").css("background-position",M)
}});
$(".sign-in-link .link").live("mouseleave",function(K){if($(".my-intel .link.selected").length>0){var N=$(".my-intel .link.selected").width();
var J=$(".my-intel .link.selected").offset();
var L=Math.round(J.left);
var O=L+Math.round(N/2)-4000;
if($(this).is(".sign-in-link")||$(this).is(".save")){O-=$("#sign-in-link").width()
}var M=O+"px top";
$(".wrapper #header").css("background-position",M)
}else{$(".wrapper #header").css("background-position","")
}});
$(".prochatbox .toggle").live("click",function(J){J.preventDefault();
toggleChat()
});
$(".shopblade .img-wrap").bind("click",function(J){window.location=$(this).parent().attr("href")
});
$(".marquee-module a.prev").bind("click",function(K){K.preventDefault();
var J=$(this).parent().find("ul li.selected");
if($(this).parent().find("ul li.selected").length<1){J=$(this).parent().find("ul li:visible")
}if($(this).parent().find("ul li:visible")<1){J=$(this).parent().find("ul li:first-child")
}if($(J).is(":first-child")){$(J).removeClass("selected").siblings("li").last().addClass("selected")
}else{$(J).removeClass("selected").prev().addClass("selected")
}});
if(!noloopShowcase){interval=window.clearTimeout(interval);
interval=window.setTimeout("rotatingshowcase()",transitionInterval)
}$(".marquee-module a.next").bind("click",function(L){L.preventDefault();
var J=$(this).parent().find("ul li.selected");
if($(this).parent().find("ul li.selected").length<1){J=$(this).parent().find("ul li:visible")
}if($(this).parent().find("ul li:visible")<1){J=$(this).parent().find("ul li:first-child")
}$(J).removeClass("selected");
var K=true;
while(K){if($(J).is(":last-child")){J=$(J).siblings("li").first();
K=false;
break
}J=$(J).next();
if($(J).is("li")){K=false;
break
}}$(J).addClass("selected");
if(!noloopShowcase){if($(this).parents("#rotatingshowcase").find("ul li").length>1){interval=window.clearTimeout(interval);
interval=window.setTimeout("rotatingshowcase()",transitionInterval)
}}});
if($(".filter-lists-container").length>0){matchHeights()
}if($("#background-player").length>0){if($("#background-player img").length>0){var F=new Image();
$(F).load(function(){centerInParent($("#background-wrapper .background-item"))
});
F.src=$("#background-player img").attr("src")
}}$("#content").not(".home #content").css("min-height",($(".boxnav.navbg").outerHeight()+60)+"px");
$(window).resize(function(){if($(".filter-lists-container").length>0){matchHeights()
}updateMenuHeight()
});
$("#specs-hero ul.specs-navigation li.selected ul").slideDown(200);
$("#specs-hero ul.specs-navigation li a.filter").bind("click",function(J){J.preventDefault();
if($(this).parent().hasClass("selected")){}else{$("#specs-hero ul.specs-navigation li").removeClass("selected");
$(this).parent().addClass("selected");
$("#specs-hero ul.specs-navigation li ul").slideUp(200);
$(this).next("ul").slideDown(200)
}});
$("#comp-hero ul.laptops-desktops li a").bind("click",function(J){J.preventDefault();
$("#comp-hero ul.laptops-desktops li a").removeClass("selected");
$(this).addClass("selected")
});
$("#comp-hero .content-detail:first").slideDown(200);
$("#comp-hero .family-head").hover(function(){$(this).addClass("hover")
},function(){$(this).removeClass("hover")
});
$("#comp-hero .family-head").bind("click",function(J){J.preventDefault();
if($(this).hasClass("selected")){$(this).removeClass("selected").next(".content-detail").slideUp(200)
}else{$(this).addClass("selected").next(".content-detail").slideDown(200)
}});
$("#comp-hero a.compare-button").bind("click",function(L){L.preventDefault();
var J=$("#comp-hero a.compare-selected").length;
if($(this).hasClass("compare-select")){$(this).removeClass("compare-select").addClass("compare-selected").text("Selected")
}else{if($(this).hasClass("compare-selected")){$(this).removeClass("compare-selected").addClass("compare-select").text("Select")
}}var K=$("#comp-hero a.compare-selected").length;
$("#compare-items h3 span").text(K);
if(K==5&&J==4){$("#comp-hero a.compare-select").removeClass("compare-select").addClass("compare-full").text("Queue Full")
}else{if(K==4&&J==5){$("#comp-hero a.compare-full").removeClass("compare-full").addClass("compare-select").text("Select")
}}});
$("#comp-hero #compare-items a.remove-all").bind("click",function(J){J.preventDefault();
$("#comp-hero #compare-items ul li").html("");
$("#comp-hero a.compare-selected, #comp-hero a.compare-full").removeClass("compare-selected").removeClass("compare-full").addClass("compare-select").text("Select")
});
$("#comp-hero #compare-items li a.remove").bind("click",function(J){J.preventDefault();
$(this).parent().html("")
});
$("#comp-hero table.family th span").hover(function(K){var J="#"+$(this).attr("class");
$(J).css({position:"absolute",top:K.pageY+25,left:K.pageX}).show()
},function(){var J="#"+$(this).attr("class");
$(J).hide()
});
$("#lookup-hero .family-head").hover(function(){$(this).addClass("hover")
},function(){$(this).removeClass("hover")
});
$("#lookup-hero .family-head").bind("click",function(J){J.preventDefault();
if($(this).hasClass("selected")){$(this).removeClass("selected").next(".content-detail").slideUp(200)
}else{$(this).addClass("selected").next(".content-detail").slideDown(200)
}});
$(".assetcontentpar table.striped tr:even").addClass("even");
$(".assetcontentpar table.striped tr:odd").addClass("odd");
$("ul.share-page li.toggle a").bind("click",function(J){J.preventDefault();
$("ul.share-page li.extra").toggleClass("visible");
$("ul.share-page li.toggle").toggleClass("less")
});
$("ul.share-page-top li.toggle a").bind("click",function(J){J.preventDefault();
$("ul.share-page-top li.extra").toggleClass("visible");
$("ul.share-page-top li.toggle").toggleClass("less");
$("ul.share-page-top").toggleClass("less-width")
});
$("ul.share-page-top li:not(.function) a, ul.share-page li:not(.toggle) a").bind("click",function(J){$("#share-popup").toggleClass("visible")
});
$("#share-popup a.close").bind("click",function(J){J.preventDefault();
$("#share-popup").toggleClass("visible")
});
$("#content .module").first().addClass("print-me");
$("#footnotes").addClass("print-me");
if((navigator.userAgent.indexOf("iPad")!=-1)){$(".ipad").removeClass("hidden").show();
$(".nonipad").addClass("hidden").hide()
}if(bN=="ie"&&bV<"9.0"){$("#menu-wrapper").append("<div class='ie_shadow'></div>")
}$('a[href="#"]').bind("click",function(J){J.preventDefault()
});
var G="";
$(".clrSgn").live("focus",function(){if($(this).val()==$(this).attr("title")){G=$(this).val();
$(this).val("");
$(this).css({color:"#000","border-color":"#0071C5"})
}});
$(".clrSgn").live("blur",function(){if($(this).val()==""){$(this).val(G);
$(this).css({color:"#ccc","border-color":"#8E8F8F"})
}});
$(".typTxt").show();
$(".typPass").hide();
$(".typTxt").live("focus click",function(){$(this).hide();
$(".typPass").show();
$(".typPass").css({color:"#000","border-color":"#0071C5"});
setTimeout(function(){$(".typPass").focus()
},10)
});
$(".typPass").live("blur",function(){if($(".typPass").val()==""){$(".typTxt").show();
$(".typPass").hide();
$(".typTxt").css({color:"#ccc","border-color":"#8E8F8F"})
}});
$(".pdf-view").bind("mouseenter",function(N){$this=$(this);
$this.attr("hasmouse","true");
var O=$this.attr("data-preview");
var L=$this.attr("data-download");
var M=$this.attr("data-previewtext");
var R=$this.attr("data-downloadtext");
var P=$this.attr("data-titletext");
var K=" &nbsp; | &nbsp;"+$this.attr("data-size");
var J='<a data-wap="{&quot;linktype&quot;:&quot;previewpdf&quot;}" href="'+O+'">'+M+'</a> &nbsp; | &nbsp; <a data-wap="{&quot;linktype&quot;:&quot;downloadpdf&quot;}" href="'+L+'" title="'+P+'">'+R+"</a>"+K;
var S=($this.offset().left)-70;
var Q=$this.offset().top;
window.setTimeout(function(){if($this.attr("hasmouse")=="true"&&$(".tooltip-flyout").attr("hasmouse")!="true"){showTooltip("",S,Q);
$(".tooltip-flyout .content p").html(J);
if(bN=="ie"&&bV<"8.0"){$(".tooltip-flyout").width($(".tooltip-flyout .content p").width()+11)
}$(".tooltip-flyout").addClass("pdf-tip");
$(".tooltip-flyout").addClass("wapwrapper");
$(".tooltip-flyout").attr("data-component","tooltip-flyout");
$(".tooltip-flyout").attr("data-component-id","1")
}},100)
});
$(".pdf-view").bind("mouseleave",function(J){if(!$(J.target).hasClass("pdf-view")||true){$(this).attr("hasmouse","")
}window.setTimeout(function(){if($(".tooltip-flyout").attr("hasmouse")!="true"&&$(".pdf-view").attr("hasmouse")!="true"){hideTooltip();
$(".tooltip-flyout .content p").html("");
$(".tooltip-flyout").width("");
$(".tooltip-flyout").removeClass("pdf-tip");
$(".tooltip-flyout").removeClass("wapwrapper");
$(".tooltip-flyout").removeAttr("data-component");
$(".tooltip-flyout").removeAttr("data-component-id")
}},250)
});
var E;
$("#searchBox").focusin(function(J){$("#predictive-search ul li").find("a").removeClass("result_hover");
if(E!==null&&($("#searchBox").val()!=="")){$("#searchBox").val(E)
}else{$("#searchBox").val("")
}});
$("#searchBox").keydown(function(J){E=$("#searchBox").val();
if(J.keyCode==40){J.preventDefault();
if($("#bestResults").children().length>0){$("#bestResults a").focus().addClass("result_hover")
}else{$("#otherResults li:first-child a").focus().addClass("result_hover")
}}else{if(J.keyCode==38){$("#otherResults li:last-child").children("a").focus().addClass("result_hover")
}}});
$(document).delegate("#bestResults a.result_hover","keydown",function(J){if(J.keyCode==40){J.preventDefault();
$(this).removeClass("result_hover");
$("#otherResults li:first-child a").focus().addClass("result_hover")
}else{if(J.keyCode==38){$(this).removeClass("result_hover");
$("#searchBox").focus()
}}});
$(document).delegate("#otherResults li a.result_hover","keydown",function(J){if(J.keyCode==40){J.preventDefault();
$(this).removeClass("result_hover");
$(this).parent("li").next("li").children("a").focus().addClass("result_hover");
if($(this).parent("li").next("li").html()==null){$("#searchBox").focus()
}}else{if(J.keyCode==38){$(this).parent("li").prev("li").children("a").focus().addClass("result_hover");
$(this).removeClass("result_hover");
if($(this).parent("li").prev("li").html()==null){if($("#bestResults").children().length>0){$("#bestResults a").focus().addClass("result_hover")
}else{$("#searchBox").focus()
}}}}});
$(document).delegate("#bestResults","mouseover",function(J){E=$("#searchBox").val();
$("#predictive-search ul li").find("a").removeClass("result_hover");
$(this).children("a").focus().addClass("result_hover");
if(E!==null){$("#searchBox").val(E)
}});
$(document).delegate("#otherResults li","mouseover",function(J){E=$("#searchBox").val();
$("#predictive-search ul li").find("a").removeClass("result_hover");
$(this).children("a").focus().addClass("result_hover");
if(E!==null){$("#searchBox").val(E)
}});
$(".collapsable .module-header").bind("click",function(J){J.preventDefault();
$(this).siblings(".module-content").slideToggle();
$(this).children("a").toggleClass("close-button");
$(this).parent(".collapsable").toggleClass("closed");
if($(this).parent(".collapsable").hasClass("closed")){$(this).siblings(".module-content").children(".optionalComponent").hide();
$(this).siblings(".module-content").children(".show-config-details").removeClass("toggle-view")
}});
$(".show-config-details").bind("click",function(J){J.preventDefault();
$(this).siblings(".optionalComponent").slideToggle();
$(this).toggleClass("roll-up")
});
if(!shuffleImg){$(".rotatingShowcaseFeature li").shuffle()
}$("#benchmark-blade ul li:nth-child(4n)").css("clear","both");
if(bN=="ff"&&bV>=3.6||bN=="ie"&&bV>=7||bN=="safari"&&bV>="3"||bN=="chrome"&&bV>=5){$("body").addClass("new_browser")
}else{$("body").addClass("old_browser")
}var I=[];
$("ul.flow li canvas.content").each(function(){imgWidth=$(this).attr("src");
I.push(imgWidth)
});
$("ul.flow li img.content").each(function(){imgWidth=$(this).attr("src");
I.push(imgWidth)
});
$(".ContentFlow a.item, .ContentFlow .item a, .ContentFlow .item canvas").live("click",function(J){if(!$(this).hasClass("active")){J.preventDefault()
}});
if($(".conversation-bubble p").hasClass("not-shown")!="false"){$("#conversationFeature .marquee-module.images p.not-shown").parent().children(".comment").addClass("author")
}$(".related-ul > li:even").css("clear","both");
if($(".customfiltered").length){$(".small-icon-3col li:nth-child(4n)").addClass("clearfloat");
$(".small-icon-2col li:nth-child(odd)").addClass("clearfloat");
$(".panel:visible > .carousel-item").eqlHgts();
$(".content-items > .carousel-item").eqlHgts().siblings(".gallery-controls").find(".large").filter(function(){$(this).css("top",-($(this).parents(".content-items").height()/2))
});
$(".customfiltered .sidebar a").bind("click",function(L){var J=$(this).attr("rel"),K=$(this).parents(".sidebar").siblings("'."+J+"'");
var M;
K.filter(function(){return M=$(this).attr("style")
});
if(typeof M==="undefined"&&K.children().hasClass("carousel-item")){K.children(".carousel-item").eqlHgts()
}})
}if($(".video-carousal").length){$(".video-carousal ul:first-child").addClass("active").css("left","0");
$(".video-carousal ul:first-child").each(function(J){if($(this).find("li").length<4){var K=($(this).find("li").length)*($(this).find("li").outerWidth()+40);
$(this).addClass("clearfix").css({width:K,position:"relative",margin:"0 auto"})
}});
$(window).load(function(){$(".video-carousal > .carousel-item").eqlHgts().parent().siblings(".gallery-controls").find(".large").filter(function(){$(this).css("top",-($(this).parents(".gallery-controls").siblings(".video-carousal").height()/2+25))
})
});
if($(".solutionsblade").length){$(".solutionsblade .video-carousal > .carousel-item").eqlHgts().parent().siblings(".gallery-controls").find(".large").filter(function(){$(this).css("top",-($(this).parents(".gallery-controls").siblings(".video-carousal").height()/2+25))
})
}}if($(".iframe iframe").length){$(".iframe iframe").load(function(){var J=$(this).contents().height();
$(this).height(J)
})
}$(".mostpopular ul > li:nth-child(4n)").addClass("clearfloat");
$(".mostpopular2 ul > li:nth-child(4n)").addClass("clearfloat")
});
function replaceVal(){$("#predictive-search ul li a").each(function(A){$(this).focusin(function(){var B=$(this).text();
$("#searchBox").val(B)
})
})
}(function(A){A.fn.shuffle=function(){var D=this.get(),C=function(E){return Math.floor(Math.random()*E)
},B=A.map(D,function(){var F=C(D.length),E=A(D[F]).clone(true)[0];
D.splice(F,1);
return E
});
this.each(function(E){A(this).replaceWith(A(B[E]))
});
return A(B)
}
})(jQuery);
function rotatingshowcase(){$("#rotatingshowcase a.next").click()
}function closeSigninBox(F,C){if($(".sign-in-link, .tooltip-flyout, .signin-nav-box").attr("hasmouse")!="true"||C){$(".signin-nav-box").slideUp("fast",function(){$(".sign-in-link .link a").removeClass("selected");
$(".currentpage").addClass("selected")
});
if($(".sign-in-link .link.selected").length>0){var E=$(".sign-in-link .link.selected").width();
var A=$(".sign-in-link .link.selected").offset();
var B=Math.round(A.left);
var G=B+Math.round(E/2)-4000;
if($(this).is(".sign-in-link")||$(this).is(".save")){G-=$("#sign-in-link").width()
}var D=G+"px top";
$(".home.wrapper #header").css("background-position",D)
}else{$(".home.wrapper #header").css("background-position","")
}}}function matchHeights(){}function nextBGCarousel(){if($("#background-slider-items").position().left>($(".slider-item").length-4)*-57&&!$("#next-arrow").hasClass("disabled")){var A=57*4;
$(".slider-item").show();
$("#background-slider-items").animate({left:"-="+A},"fast",function(){$(".slider-arrow").addClass("disabled");
var C=$("#background-slider-items").position().left;
var B=$("#background-slider-wrapper").innerWidth();
if(($(".slider-item.selected").position().left+C)<0){$(".slider-item.selected").css({width:55,height:36})
}else{$(".slider-item.selected").css({width:"",height:""})
}$(".slider-item").each(function(D){if(($(this).position().left+$(this).outerWidth()+C)>B){$(this).hide()
}});
if($("#background-slider-items").position().left<0){$("#prev-arrow").removeClass("disabled")
}else{$("#prev-arrow").addClass("disabled")
}if($("#background-slider-items").position().left<=($(".slider-item").length-4)*-57){$("#next-arrow").addClass("disabled")
}else{$("#next-arrow").removeClass("disabled")
}})
}}function prevBGCarousel(){if($("#background-slider-items").position().left<0&&!$("#prev-arrow").hasClass("disabled")){$(".slider-arrow").addClass("disabled");
var A=57*4;
$(".slider-item").show();
$("#background-slider-items").animate({left:"+="+A},"fast",function(){var C=$("#background-slider-items").position().left;
var B=$("#background-slider-wrapper").innerWidth();
if(($(".slider-item.selected").position().left+C)<0){$(".slider-item.selected").css({width:55,height:36})
}else{$(".slider-item.selected").css({width:"",height:""})
}$(".slider-item").each(function(D){if(($(this).position().left+$(this).outerWidth()+C)>B){$(this).hide()
}});
if($("#background-slider-items").position().left>=0){$("#prev-arrow").addClass("disabled")
}else{$("#prev-arrow").removeClass("disabled")
}if($("#background-slider-items").position().left<=($(".slider-item").length-4)*-57){$("#next-arrow").addClass("disabled")
}else{$("#next-arrow").removeClass("disabled")
}})
}}function resetBGCarousel(){if($("#background-slider-items").position().left<0&&!$("#prev-arrow").hasClass("disabled")){$(".slider-arrow").addClass("disabled");
$(".slider-item").show();
$("#background-slider-items").animate({left:0},"fast",function(){var B=$("#background-slider-items").position().left;
var A=$("#background-slider-wrapper").innerWidth();
if(($(".slider-item.selected").position().left+B)<0){$(".slider-item.selected").css({width:55,height:36})
}else{$(".slider-item.selected").css({width:"",height:""})
}$(".slider-item").each(function(C){if(($(this).position().left+$(this).outerWidth()+B)>A){$(this).hide()
}});
if($("#background-slider-items").position().left>=0){$("#prev-arrow").addClass("disabled")
}else{$("#prev-arrow").removeClass("disabled")
}if($("#background-slider-items").position().left<=($(".slider-item").length-4)*-57){$("#next-arrow").addClass("disabled")
}else{$("#next-arrow").removeClass("disabled")
}})
}}function changeBG(E,D,F,C,I,H){if(!E){var E="#ffffff"
}if(!D){var D=""
}if(!C){var C=""
}if(!I){var I=""
}if(!H){var H=""
}if(F&&!$(F).hasClass("selected")&&!$(F).hasClass("disabled")){$(".slider-item").addClass("disabled");
var A,B;
$(".slider-item.selected").css({width:"",height:""});
$(".slider-item").each(function(K){if($(this).hasClass("selected")){$(this).removeClass("selected");
var L=$(this).attr("src");
var J=L.lastIndexOf(".75.49");
if(J>=0){L=L.replace(".75.49",".57.38")
}$(this).attr("src",L)
}});
A=$(F).attr("src");
B=A.lastIndexOf(".");
if(B>=0&&A.indexOf(".75.49")==-1){A=A.replace(".57.38",".75.49")
}$(F).attr("src",A).addClass("selected");
var G=$("#background-wrapper").children();
if($(D).hasClass("background-video")){if($("#background-video-player .videoContainer img").length>0){$("#background-video-player .videoContainer img").attr("src",$(D).attr("still"))
}else{$("#background-video-player .videoContainer").prepend("<img alt='' src='"+$(D).attr("still")+"' />")
}$("#background-video-player").hide().css("background-color",E).prependTo($("#background-wrapper")).fadeIn(fadeDuration,function(){if($(D).hasClass("background-video")){intelVideoLoadVideo($(D).attr("data"));
hideHomeControls();
lockInterval=1;
if(homeTimer){interval=window.clearTimeout(interval)
}intelVideoPlay()
}else{if(controlshidden){showHomeControls()
}}});
$("#background-wrapper").animate({backgroundColor:E},fadeDuration);
centerInParent($("#background-video-player"))
}else{$(D).hide().css("background-color",E).prependTo($("#background-wrapper")).fadeIn(fadeDuration);
$("#background-wrapper").animate({backgroundColor:E},fadeDuration);
centerInParent($(D))
}$("#background-wrapper").animate({backgroundColor:E},fadeDuration);
centerInParent($(D));
G.fadeOut(fadeDuration,function(){G.appendTo("#background-items");
$(".slider-item").removeClass("disabled");
$("body, #content").css("background-color",E)
});
if(C!=""){$("#home-copy h2").text(C);
$("#home-copy h4 a").text(I).attr("href",H)
}}if(!lockInterval&&!noloop){if(!homeTimer){homeTimer=1;
interval=window.setTimeout(nextBG,transitionInterval)
}else{interval=window.clearTimeout(interval);
interval=window.setTimeout(nextBG,transitionInterval)
}}}function nextBG(){var B=$(".slider-item.selected").next(".slider-item");
if($(".slider-item.selected").next(".slider-item").length<=0){B=$(".slider-item").first()
}var D=$(".slider-item.selected").attr("onclick")+",";
D=D.replace("'#","").replace("'","").split(",")[1];
if(D==carouselStart||noloop==1){lockInterval=1;
noloop=1;
if(homeTimer){interval=window.clearTimeout(interval)
}}else{if(carouselStart==""){carouselStart=D
}var C=$("#background-slider-items").position().left;
var A=$("#background-slider-wrapper").innerWidth();
B.show();
if((B.position().left+B.outerWidth()+C)>A){$("#next-arrow").trigger("click")
}else{if((B.position().left+B.outerWidth()+C)<0){resetBGCarousel()
}}B.trigger("click")
}}function centerInParent(C,B,G){if(!B){var B=0
}if(!G){var G=0
}var F=$(C).parent().outerWidth()-(G);
var E=$(C).parent().outerHeight()-(B);
var A=(E-$(C).innerHeight())/2;
var D=(F-$(C).innerWidth())/2;
$(C).css({position:"absolute",top:A,left:D})
}function centerVertically(C,B,D){if(!B){var B=0
}if(!D){var D=$(C).parent().outerHeight()-(B)
}var A=(D-$(C).outerHeight())/2;
$(C).css({position:"absolute",top:A,"margin-top":"0px","margin-bottom":"0px"})
}function closePreviews(){$(".list-item, .list-item-wrapper, .list-item-content-wrapper, .list-item-img-wrapper").removeClass("open").css("height","");
$(".view-btn, .close-btn, .list-item-descLong").addClass("hidden");
$(".preview-btn, .open-btn, .list-item-desc").removeClass("hidden");
matchHeights()
}function closeMyIntel(F,C){if($(".boxnav.myintelbg, .tooltip-flyout, .save, .my-intel-link").attr("hasmouse")!="true"||C){$(".boxnav.myintelbg").slideUp("fast",function(){$(".my-intel-link, .save").removeClass("selected");
$(".currentpage").addClass("selected");
$(".register-myintel").removeClass("boxnav myintelbg").addClass("hidden");
$(".savedcontent").addClass("boxnav myintelbg")
});
if($(".my-intel .link.selected").length>0){var E=$(".my-intel .link.selected").width();
var A=$(".my-intel .link.selected").offset();
var B=Math.round(A.left);
var G=B+Math.round(E/2)-4000;
if($(this).is(".my-intel-link")||$(this).is(".save")){G-=$("#my-intel-count").width()
}var D=G+"px top";
$(".home.wrapper #header").css("background-position",D)
}else{$(".home.wrapper #header").css("background-position","")
}}}function closeNavMenu(B,A){if(!B){var B=menuTimeout
}if(!A){var A=false
}if(A){$(".subnavtext").removeClass("active");
$(".directory, .directory a, .sites a, .library a").removeClass("selected");
$("#submenu-wrapper").slideUp(slideTimer);
$(".boxnav.navbg").slideUp(slideTimer,function(){updateMenuHeight();
$("#menu-wrapper").hide();
if(!$(".my-intel-link, .save").hasClass("selected")){$(".currentpage").addClass("selected")
}});
return 
}window.setTimeout(function(){if($(".boxnav.navbg").attr("hasmouse")!="true"&&$(".directory").attr("hasmouse")!="true"){$(".subnavtext").removeClass("active");
$(".directory, .directory a, .sites a, .library a").removeClass("selected");
$("#submenu-wrapper").slideUp(slideTimer);
$(".boxnav.navbg").slideUp(slideTimer,function(){updateMenuHeight();
$("#menu-wrapper").hide();
if(!$(".my-intel-link, .save").hasClass("selected")){$(".currentpage").addClass("selected")
}$("ul.subnav").css("background-position","left bottom")
})
}},B)
}function updateMenuHeight(){$(".navright, .home #content, body").css("min-height","");
if($("#submenu-wrapper:visible").length>0){$("#content").css("min-height",($(".boxnav.navbg").outerHeight()+60)+"px");
$("body").css("min-height",($(".boxnav.navbg").outerHeight()+65)+"px");
$(".navright, .navigation").css("min-height","").css("min-height",($(".boxnav.navbg").innerHeight()-135));
$("#background-player, #background-wrapper").height($("body").innerHeight());
$(".ie_shadow").css("min-height","").css("min-height",($(".boxnav.navbg").innerHeight()-45)).show()
}else{$(".ie_shadow").hide().css("min-height","");
$("body, .home #content, #background-player, #background-wrapper, .navright, .navigation").css("min-height","");
$("#background-player, #background-wrapper").height($(".home.wrapper").innerHeight())
}if($("#background-player").length>0){centerInParent($("#background-wrapper").children(".background-item").first())
}}function toggleFooterNews(){if($("#footer .latest-news a").hasClass("open")){stopTicker=true;
$(".news-items").stop().css({left:""});
window.clearInterval(newsinterval);
$("#footer .latest-news").animate({width:68},"fast",function(){$("#footer .latest-news").addClass("closed")
});
$("#footer .latest-news a").removeClass("open")
}else{scrolling=false;
if(newsinterval!=undefined){newsinterval=window.clearInterval(newsinterval)
}newsinterval=window.setInterval(scrollTicker,tickerScrollSpeed);
$("#footer .latest-news a").addClass("open")
}}function getBackButton(A,B,C){if(A[C]!=undefined){return A[C]
}return B
}function closeLanguageMenu(){$("#language-chooser").slideUp(fadeDuration);
$(".language").removeClass("selected")
}function closeToolsMenu(){$("#tools-chooser").slideUp(fadeDuration);
$(".tools").removeClass("selected")
}function nextCarousel(A,E){if($(A).find(".carousel-item.active").length>0){$(A).find(".carousel-item").not(".active").css({left:$(A).innerWidth()});
var C=$(A).find(".carousel-item.active");
C.css({left:0});
var D=$(E).find(".carousel-dot.active").next(".carousel-dot");
if(D.length==0){D=$(E).find(".carousel-dot").first()
}var B=$(A).find(".carousel-item.active").next(".carousel-item");
if(B.length==0){B=$(A).find(".carousel-item").first()
}$(E).find(".carousel-dot").removeClass("active");
$(D).addClass("active");
if($(E).find(".carousel-dot.active").prev(".carousel-dot").length==0){$(E).find(".carousel-left").css("visibility","hidden")
}else{$(E).find(".carousel-left").css("visibility","")
}if($(E).find(".carousel-dot.active").next(".carousel-dot").length==0){$(E).find(".carousel-right").css("visibility","hidden")
}else{$(E).find(".carousel-right").css("visibility","")
}$(A).find(".carousel-item").css("z-index","0").removeClass("active");
B.css("z-index","1");
C.animate({left:-920},500);
B.animate({left:0},500,function(){$(A).find(".carousel-item").not(B).removeClass("active").css({left:$(A).innerWidth()});
B.addClass("active")
})
}}function prevCarousel(A,E){if($(A).find(".carousel-item.active").length>0){$(A).find(".carousel-item").not(".active").css({left:-$(A).innerWidth()});
var C=$(A).find(".carousel-item.active");
C.css({left:0});
var D=$(E).find(".carousel-dot.active").prev(".carousel-dot");
if(D.length==0){D=$(E).find(".carousel-dot").last()
}var B=$(A).find(".carousel-item.active").prev(".carousel-item");
if(B.length==0){B=$(A).find(".carousel-item").last()
}$(E).find(".carousel-dot").removeClass("active");
$(D).addClass("active");
if($(E).find(".carousel-dot.active").prev(".carousel-dot").length==0){$(E).find(".carousel-left").css("visibility","hidden")
}else{$(E).find(".carousel-left").css("visibility","")
}if($(E).find(".carousel-dot.active").next(".carousel-dot").length==0){$(E).find(".carousel-right").css("visibility","hidden")
}else{$(E).find(".carousel-right").css("visibility","")
}$(A).find(".carousel-item").css("z-index","0").removeClass("active");
B.css("z-index","1");
C.animate({left:920},500);
B.animate({left:0},500,function(){$(A).find(".carousel-item").not(B).removeClass("active").css({left:-$(A).innerWidth()});
B.addClass("active")
})
}}function scrollTicker(){if((stopTicker!=undefined&&stopTicker)||scrolling){return false
}scrolling=true;
var B=$("#footer .latest-news .news-item.selected").show();
var A=B.next(".news-item");
if(B.next(".news-item").length<=0){A=$("#footer .latest-news .news-item:first")
}B.fadeOut("fast",function(){B.removeClass("selected");
A.fadeIn("fast",function(){A.addClass("selected");
stopTicker=false;
scrolling=false
})
})
}function createTooltip(B){var A='<div class="tooltip-flyout hidden">';
A+='<div class="top">';
A+='<div class="right"></div>';
A+="</div>";
A+='<div class="middle">';
A+='<div class="right">';
A+='<div class="content">';
A+="<p>"+B+"</p>";
A+="</div>";
A+="</div>";
A+="</div>";
A+='<div class="bottom">';
A+='<div class="right"></div>';
A+="</div>";
A+="</div>";
$("body").append(A);
$(".tooltip-flyout").live("mouseenter",function(C){$(this).attr("hasmouse","true")
});
$(".tooltip-flyout").live("mouseleave",function(C){$(this).attr("hasmouse","");
window.setTimeout(function(){hideTooltip()
},100)
});
$(".tooltip-flyout").live("click",function(C){if(!$(this).hasClass("pdf-tip")){C.preventDefault();
$(this).attr("hasmouse","");
hideTooltip()
}})
}function showTooltip(F,A,G){if(!A&&!G){var A=0;
var G=0;
if(!E){var E=window.event
}if(E.pageX||E.pageY){A=E.pageX;
G=E.pageY
}else{if(E.clientX||E.clientY){A=E.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
G=E.clientY+document.body.scrollTop+document.documentElement.scrollTop
}}}else{if(!G){var D=$(A);
var A=D.offset().left+D.outerWidth()/4;
var G=D.offset().top+(D.outerHeight()/2);
$(".tooltip-flyout").die("click");
$(".tooltip-flyout").live("click",function(H){$(".tooltip-flyout").attr("hasmouse","");
hideTooltip()
})
}}if($(".tooltip-flyout").length<1){createTooltip(F)
}else{$(".tooltip-flyout .content p").text(F)
}$(".tooltip-flyout").offset({top:0,left:0});
$(".tooltip-flyout").removeClass("hidden").show();
var C=A-$(".tooltip-flyout").outerWidth()-30;
var B=G+($(".tooltip-flyout").outerHeight()/3);
if(B<50){B=50
}if(C<0){C=0
}$(".tooltip-flyout").css({top:B+"px",left:C+"px"})
}function hideTooltip(){if($(".tooltip-flyout").attr("hasmouse")!="true"){$(".tooltip-flyout").addClass("hidden").hide()
}}function toggleChat(){$("#lpInvite").slideToggle()
}function createCookie(C,D,E){if(E){var B=new Date();
B.setTime(B.getTime()+(E*24*60*60*1000));
var A="; expires="+B.toGMTString()
}else{var A=""
}document.cookie=C+"="+D+A+"; path=/"
}function readCookie(B){var D=B+"=";
var A=document.cookie.split(";");
for(var C=0;
C<A.length;
C++){var E=A[C];
while(E.charAt(0)==" "){E=E.substring(1,E.length)
}if(E.indexOf(D)==0){return E.substring(D.length,E.length)
}}return null
}function eraseCookie(A){createCookie(A,"",-1)
}function setAgnosticCookie(){if(readCookie("usertype")==null){createCookie("usertype","agnostic",60);
setNavClassFromCookie()
}}function setConsumerCookie(){createCookie("usertype","consumer",60);
setNavClassFromCookie()
}function setBusinessCookie(){createCookie("usertype","business",60);
setNavClassFromCookie()
}function setNavClassFromCookie(){var A=readCookie("usertype");
if(A=="business"){$(".boxnav.navbg").addClass("business").removeClass("consumer");
if($(".slider-item.work").length>0){$(".slider-item.work").first().trigger("click")
}}else{$(".boxnav.navbg").addClass("consumer").removeClass("business");
if($(".slider-item.home").length>0){$(".slider-item.home").first().trigger("click")
}}}function hide_popUp(){$("#contBlockOverlay").remove();
$("#hideBG").remove()
}$.fn.preload=function(){this.each(function(){var A=new Image();
A.src=this
})
};
$(".edNavBar li").live("mouseenter",function(A){$(this).attr("hasmouse","true");
$(this).children(".dropdown-menu").slideDown("fast",function(){$(this).children(".drpdwn-content-block").find("a:last-child").addClass("last-child");
$(".edNavBar").find("li").removeClass("active");
$(this).parent("li").addClass("active")
})
});
$(".edNavBar li").live("mouseleave",function(A){$(this).attr("hasmouse","");
$(this).children(".dropdown-menu").slideUp("fast",function(){$(this).children(".drpdwn-content-block").find("a:last-child").removeClass("last-child");
$(".edNavBar").find("li").removeClass("active")
})
});
$.fn.eqlHgts=function(){var C=$(this),A=null,B=0;
C.each(function(){var D=$(this).height();
if($(this).index()===0){B=0
}if(D>B){B=D;
A=$(this)
}if(A!=null){if(A.siblings(".gallery-controls").length!=0){A.parent().css("min-height",B+20)
}else{A.parent().css("min-height",B)
}}});
return this
};
$(function(){$(".module-type-1 .sidebar a, .module-type-2 .sidebar a, .module-type-4 .sidebar a").bind("click",function(A){A.preventDefault();
$(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
$(this).closest(".module").find(".panel").eq($(this).closest("li").index()).addClass("selected").siblings().removeClass("selected");
$(this).closest(".module").find(".panel .module-slider-wrap").recalcSlControls()
});
$(".module .module-slider-wrap").slider({speed:300})
});
(function(B){function A(C,D){this.element=B(C);
this.opts=B.extend({slContSel:"module-slider-container",slItemSel:"module-slider-item",slControlsSel:"module-slider-controls",slDotsSel:"module-slider-dots",slLeftSel:"module-slider-left",slRightSel:"module-slider-right",speed:800,checkControlsAfter:false},D);
this.init()
}A.prototype.init=function(){var D=this;
var E=B("."+this.opts.slItemSel,this.element);
var C=E.length;
this.itemWidth=E.width();
this.clickable=true;
this.element.width(this.itemWidth);
this.maxIndex=C-1;
this.currentIndex=0;
B("."+this.opts.slContSel,this.element).css("width",C*this.itemWidth);
if(C==1||C==0){this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slLeftSel+" a").hide();
this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slRightSel+" a").hide();
this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slDotsSel+" a").hide();
return 
}for(var F=0;
F<C;
F++){B(document.createElement("li")).html("<a rel="+F+' href="#">'+(F+1)+"</a>").appendTo(this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slDotsSel)).click(function(G){G.preventDefault();
D.animate(B("a",B(this)).attr("rel"))
})
}this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slLeftSel+" a").click(function(G){G.preventDefault();
D.animate("prev")
});
this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slRightSel+" a").click(function(G){G.preventDefault();
D.animate("next")
});
this.recalcControls();
this.setCurrent(0);
this.checkControls()
};
A.prototype.recalcControls=function(){var C=this.element.next("."+this.opts.slControlsSel);
var D=C.find("."+this.opts.slLeftSel).outerWidth()+C.find("."+this.opts.slRightSel).outerWidth()+C.find("."+this.opts.slDotsSel).outerWidth();
C.css("padding-left",(C.width()-D)/2)
};
A.prototype.setCurrent=function(C){C=parseInt(C);
this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slDotsSel+" li").removeClass("active");
this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slDotsSel+" li").eq(C).addClass("active")
};
A.prototype.animate=function(D){var C=this;
function I(){if(C.currentIndex>C.maxIndex){C.currentIndext=0
}if(C.currentIndex<0){C.currentIndex=C.maxIndex
}B("."+C.opts.slContSel,C.element).css("margin-left",(C.currentIndex*C.itemWidth*-1));
C.clickable=true;
C.setCurrent(C.currentIndex);
if(!C.opts.checkControlsAfter){C.checkControls()
}}if(this.clickable){this.clickable=false;
var E=this.currentIndex;
switch(D){case"next":this.currentIndex=(E>=this.maxIndex)?parseInt(this.maxIndex):parseInt(this.currentIndex)+1;
break;
case"prev":this.currentIndex=(this.currentIndex<=0)?0:parseInt(this.currentIndex)-1;
break;
case"first":this.currentIndex=0;
break;
case"last":this.currentIndex=this.maxIndex;
break;
default:this.currentIndex=D;
break
}var H=Math.abs(E-this.currentIndex);
var F=H*this.opts.speed;
var G=(this.currentIndex*this.itemWidth*-1);
if(!this.opts.checkControlsAfter){this.checkControls()
}B("."+this.opts.slContSel,this.element).animate({marginLeft:G},{queue:false,duration:F,complete:I})
}};
A.prototype.checkControls=function(){if(this.currentIndex==this.maxIndex){this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slRightSel+" a").hide()
}else{this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slRightSel+" a").show()
}if(this.currentIndex==0){this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slLeftSel+" a").hide()
}else{this.element.next("."+this.opts.slControlsSel).find("."+this.opts.slLeftSel+" a").show()
}};
B.fn.extend({slider:function(C){return this.each(function(){this.slider=new A(this,C)
})
},recalcSlControls:function(){return this.each(function(){this.slider.recalcControls()
})
}})
})(jQuery);
$(function(){var E=$(".right-rail").height();
var K=$(".content-well").height();
if(!$("#content div.module").hasClass("in-author-mode")){var I=$(".rr-components .rightrailcustomizable").outerHeight();
var B=$(".rr-top").outerHeight();
var A=$(".rr-bottom").outerHeight();
var L=200;
var F=200;
var C=800;
var J=0;
var G=0;
var H=50;
var D=false;
if((I+B+A)>K){D=true;
G=K-(B+A);
if(G<H){G=H
}if(K<(B+A+G)){K=B+A+G
}$(".rr-components").height(G);
$(".right-rail").height(K)
}if((I+B+A)<K){$(".right-rail").height(I+B+A);
G=I
}if(D){$(".controls").show();
$(".rr-bottom .controls .scroll .down").bind("click",function(M){if($(this).hasClass("active")){if((I-(J+G))<L){J=I-G;
$(this).removeClass("active")
}else{J+=L
}if(J+G==I){$(this).removeClass("active")
}$(".rr-components").animate({scrollTop:J},C);
if(J!=0&&!($(".rr-bottom .controls .scroll .up").hasClass("active"))){$(".rr-bottom .controls .scroll .up").addClass("active")
}}});
$(".rr-bottom .controls .scroll .up").bind("click",function(M){if($(this).hasClass("active")){if(J<F){J=0;
$(this).removeClass("active")
}else{J-=F
}if(J==0){$(this).removeClass("active")
}$(".rr-components").animate({scrollTop:J},C);
if(J!=(I-G)&&!($(".rr-bottom .controls .scroll .down").hasClass("active"))){$(".rr-bottom .controls .scroll .down").addClass("active")
}}})
}}$(".rr-components .content-binder .cb-link").children("a").each(function(M){if(checkIfVisited($(this).attr("href"))){$(this).parent("div.cb-link").addClass("visited")
}});
$(".rr-components .content-binder .cb-link").children("a").bind("click",function(M){$(this).parent("div.cb-link").addClass("visited");
document.cookie=$(this).attr("href")+"=hasBeenVisited"
});
$(".rr-components .content-binder .cb-link.with-image").hover(function(){$(this).children("a").children("div.image-desc").show()
},function(){$(this).children("a").children("div.image-desc").hide()
})
});
var cookies=document.cookie.split(";");
function checkIfVisited(A){for(var B=0;
B<cookies.length;
B++){var C=cookies[B];
if(C.indexOf(A)!=-1){return true
}}return false
}$(document).ready(function(I){var A;
var B=$(".sidebar-compatible-products");
if(B.hasClass("has-sub")){A=B.find(".sub-categories:first li:first a").attr("rel")
}else{A=B.find(".category.first a").attr("rel")
}function F(){var O=$("#compatibleProducts ."+A).children("ul").length;
var N='<img alt="selector" class="carousel-dot" src="/etc/designs/intel/us/en/images/blank.png">',L='<img alt="selector" class="carousel-dot active" src="/etc/designs/intel/us/en/images/blank.png">',M='<img alt="next" class="carousel-right" src="/etc/designs/intel/us/en/images/carouselRight.png">',P='<img alt="next" class="carousel-left" src="/etc/designs/intel/us/en/images/carouselLeft.png" style="visibility: hidden;">';
$("#compatibleProducts ."+A).find(".carousel-item").removeClass("active").removeAttr("style");
$("#compatibleProducts ."+A).find(".carousel-item:first").addClass("active").css({"z-index":1,left:0});
$("#compatibleProducts .gallery-controls").css("visibility","hidden");
$("#compatibleProducts .gallery-controls .carousel-controls").attr("itemcontainer","");
$("#compatibleProducts .carousel-controls").html("");
if(O>1){$("#compatibleProducts .gallery-controls").css("visibility","visible");
$("#compatibleProducts .gallery-controls .carousel-controls").attr("itemcontainer","."+A);
$("#compatibleProducts .carousel-controls").append(P+L);
while(O>1){$("#compatibleProducts .carousel-controls").append(N);
O--
}$("#compatibleProducts .carousel-controls").append(M)
}}F();
$("#compatibleProducts .module-content ul.sidebar-compatible-products.has-sub li.category").click(function(){$("#compatibleProducts .module-content ul.sidebar-compatible-products.has-sub li.sub-categories").hide();
$("#compatibleProducts .module-content ul.sidebar-compatible-products.has-sub li.collapse").addClass("expand");
$("#compatibleProducts .module-content ul.sidebar-compatible-products.has-sub li.collapse").removeClass("collapse");
$(this).next().show();
$("ul li:first a",$(this).next()).addClass("selected");
A=$("ul li:first a",$(this).next()).attr("rel");
F();
$(this).addClass("collapse");
$(this).removeClass("expand")
});
$("#compatibleProducts .sidebar-compatible-products li.category a").click(function(){if($(".sidebar-compatible-products").hasClass("has-sub")){A=$(this).attr("rel")+"-sub1"
}else{A=$(this).attr("rel")
}$("#compatibleProducts .sidebar-compatible-products li.category a").removeClass("selected");
$("#compatibleProducts div.panel").removeClass("selected");
$(this).addClass("selected");
$("."+A).addClass("selected");
F()
});
$("#compatibleProducts .sidebar-compatible-products li.sub-categories ul li a").click(function(){A=$(this).attr("rel");
$("#compatibleProducts .sidebar-compatible-products li.sub-categories ul li a").removeClass("selected");
$("#compatibleProducts div.panel").removeClass("selected");
$(this).addClass("selected");
$("."+A).addClass("selected");
F()
});
var C=0;
$(".productDetailNavigation .navItems ul.items").each(function(L){if($(this).height()>C){C=$(this).height()
}});
$(".productDetailNavigation .navItems ul.items").each(function(L){$(this).css("height",C)
});
var E=600;
var G=150;
var D=275;
var H=0;
function K(){$(".productDetailNavigation .navItems").css("display","none");
$(".pdtNavShowToggle p.expand").show();
$(".pdtNavShowToggle p.close").hide();
$(".pdtNavShowToggle").removeClass("close");
$(".pdtNavShowToggle").addClass("expand")
}$(".productDetailNavigation .navItems ul li a").bind("click",function(M){$(".productDetailNavigation .navItems ul li.selected").removeClass("selected");
$(".productDetailNavigation .navSection div.item.selected").removeClass("selected");
$(this).parent().addClass("selected");
$(this).parent().css("background","");
var L=$(this).parent().parent().index()+1;
$(".productDetailNavigation .navSection div.item:nth-child("+L+")").addClass("selected");
if($(this).parent().parent().parent().parent().hasClass("fixed")){$(".productDetailNavigation.collapseVersion .navItems").css("display","none")
}M.preventDefault();
eleId=$(this).attr("href");
if(eleId=="#"){H=0
}else{if(!$(".productDetailNavigation").hasClass("fixed")){H=$(eleId).position().top-G-D
}else{H=$(eleId).position().top-G
}}console.log(eleId+": "+H);
if(H<0){H=0
}K();
$("html, body").stop().animate({scrollTop:H},E,"swing");
console.log(H)
});
if($(".productDetailNavigation .navSection").length){var J=$(".productDetailNavigation .navSection").position().top;
$(window).scroll(function(){if(J>=$(window).scrollTop()){if($(".productDetailNavigation").hasClass("fixed")){$(".productDetailNavigation").removeClass("fixed")
}}else{if(!$(".productDetailNavigation").hasClass("fixed")){$(".productDetailNavigation").addClass("fixed")
}}})
}$(".pdtNavShowToggle p.close").click(function(L){$(".productDetailNavigation .navItems").css("display","none");
$(".pdtNavShowToggle p.expand").show();
$(this).hide();
$(".pdtNavShowToggle").removeClass("close");
$(".pdtNavShowToggle").addClass("expand");
$(".productDetailNavigation .navSection div.item").css("cursor","pointer")
});
$(".pdtNavShowToggle p.expand").click(function(L){$(".productDetailNavigation .navItems").css("display","");
$(".pdtNavShowToggle p.close").show();
$(this).hide();
$(".pdtNavShowToggle").removeClass("expand");
$(".pdtNavShowToggle").addClass("close");
$(".productDetailNavigation .navSection div.item").css("cursor","text")
});
$(".productDetailNavigation .navSection div.item").click(function(L){if($(".pdtNavShowToggle p").hasClass("expand")){$(".productDetailNavigation .navItems").css("display","");
$(".pdtNavShowToggle p.close").show();
$(".pdtNavShowToggle p.expand").hide();
$(".pdtNavShowToggle").removeClass("expand");
$(".pdtNavShowToggle").addClass("close");
$(".productDetailNavigation .navSection div.item").css("cursor","text")
}})
});