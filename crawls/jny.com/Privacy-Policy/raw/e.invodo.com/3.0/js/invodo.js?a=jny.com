var INVODO_NS={};
INVODO_NS.thisScriptSrc="";
INVODO_NS.thisSrcStringPattern="3.0/js/invodo";
try{INVODO_NS.allScriptsSoFar=document.getElementsByTagName("script");
INVODO_NS.tempString=INVODO_NS.allScriptsSoFar[INVODO_NS.allScriptsSoFar.length-1].src;
if(INVODO_NS.tempString.indexOf(INVODO_NS.thisSrcStringPattern)>-1){INVODO_NS.thisScriptSrc=INVODO_NS.tempString
}else{INVODO_NS.allScriptsLength=INVODO_NS.allScriptsSoFar.length;
for(var i=0;
i<INVODO_NS.allScriptsLength;
i++){INVODO_NS.tempString=INVODO_NS.allScriptsSoFar[i].src;
if(INVODO_NS.tempString.indexOf(INVODO_NS.thisSrcStringPattern)>-1){INVODO_NS.thisScriptSrc=INVODO_NS.tempString;
break
}}}}catch(e){}(function(w){if(w.Invodo){return
}if(!w.console){w.console={}
}var f=["asserts","count","dir","dirxml","error","group","groupEnd","info","log","profile","profileEnd","time","timeEnd","trace","warn","markTimeline"];
while(f.length>0){var u=f.shift();
if(typeof w.console[u]==="undefined"){w.console[u]=function(){}
}}var ba=(function(){var bi=[];
try{var bh=w.document.getElementsByTagName("script"),bj=bh.length;
while(bj-->0){var bk=bh[bj];
if(bk.src){bi.push(bk.src)
}}}catch(bl){}return bi
})(),an=w.document,aa=w.navigator,az=Object.prototype.toString,x,ae=w.Invodo||null,V,aX,aH="unknown",y="",U={},aA={},aT={},N={},bd={},a2={},a0,ar=w.location.hostname,aV=ar.split("."),ad="."+aV.slice(aV.length-2,aV.length).join("."),Y=function(){Y=aN();
return Y.apply(this,arguments)
},j=w.jQuery,T=j&&j.fn&&j.fn.jquery,z=/(\d+)?(?:[.](\d+))?(?:[.](\d+))?(?:[.](\d+))?.*/,av=T&&a1(j.fn.jquery,[1,3,2]),al,E=new Date().getTime(),aS="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),a,v="invodoLogCookie",bb=7,aF=5,bc=10,aC,J,H=h(),a6,q=[],Z=0,P,at=2000,B=new Date().getTime(),a7=false,ah={podStart:[],podComplete:[],videoStart:[],videoPause:[],videoComplete:[]},A=[],Q=[],d=[],ak=[],au=[],aO={},bg="invodoVisitor",ac=90,am=30*24*60*60*1000,k=/http.*\/p\/(\w{8}).*/,n=/^\w+:\/\//,bf=/(?:^|&)([^&=]*)=?([^&]*)/g,ao="/3.0",be="12.9.2.7",ag=false,ap=w.location.protocol==="https:"?"https:":"http:",s=ap+"//e.invodo.com",W=ap+"//log.invodo.com",X="rtmp://aoaef.invodo.com/",a3=ap+"//e.invodo.com/media/",aM="http://aoael.invodo.com/media/",ay="/s",aE="",D="/log",S="",C={jQuery:m(ap+"//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js","js",function(){V.$jq=ab.$jq=j=w.jQuery.noConflict(true)
},false),iFixPng:m(O("ext/jquery.ifixpng"),"js",function(){j.ifixpng(b("/i/x.gif",S))
},false),onePixelGif:m(b("/i/x.gif",S),"image",false,false),cta:m(O("cta.invodo"),"js",function(){var bh=w.Invodo.__CTA;
bh.__tunnel(function(bi){ab.CTA=aG=bi;
return ab
})
},false),viewer:m(O("viewer.invodo"),"js",function(){var bh=w.Invodo.__Viewer;
bh.__tunnel(function(bi){ab.Viewer=l=bi;
return ab
})
},false),viewerTemplates:m(O("viewer.tmpl"),"js",false,function(){aX.__template=function(bh){ab.templates=bh
}
}),viewerStyles:m(aj("css","viewer.css"),"css"),inPlayerSwf:m(aj("fl","InPlayer.swf"),"swf")},a5=["jQuery","cta"],F=["jQuery","viewer","viewerTemplates","viewerStyles"],ai=["iFixPng","onePixelGif"],I={},ab,aG,l,af=(function(){var br=aa.userAgent,bx=br.toLowerCase(),bv=aa.platform,bi=bv.toLowerCase(),bl=(/(chrome)[ \/]([\w.]+)/.exec(bx))||(/(webkit)[ \/]([\w.]+)/.exec(bx))||(/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(bx))||(/(msie) ([\w.]+)/.exec(bx))||(!/compatible/.test(bx)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(bx))||[],bo=an.createElement("video"),bm=!!an.createElement("video").canPlayType,bj=false,bn=[0,0,0],bz=null,bh="Shockwave Flash",bB="ShockwaveFlash.ShockwaveFlash",bq="application/x-shockwave-flash";
if(typeof aa.plugins!="undefined"&&typeof aa.plugins[bh]=="object"){bz=aa.plugins[bh].description;
if(bz&&!(typeof aa.mimeTypes!="undefined"&&aa.mimeTypes[bq]&&!aa.mimeTypes[bq].enabledPlugin)){bj=true;
bz=bz.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
bn[0]=parseInt(bz.replace(/^(.*)[.].*$/,"$1"),10);
bn[1]=parseInt(bz.replace(/^.*[.](.*)\s.*$/,"$1"),10);
bn[2]=/[a-zA-Z]/.test(bz)?parseInt(bz.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof w.ActiveXObject!="undefined"){try{var bA=new ActiveXObject(bB);
if(bA){bz=bA.GetVariable("$version");
if(bz){bz=bz.split(" ")[1].split(",");
bn=[parseInt(bz[0],10),parseInt(bz[1],10),parseInt(bz[2],10)];
bj=true
}}}catch(by){}}}var bs="",bt="",bp="",bw="",bu="",bk="";
if(bm&&bo.canPlayType){try{bs=bo.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
bp=bo.canPlayType('video/mp4; codecs="avc1.58A01E, mp4a.40.2"');
bt=bo.canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"');
bw=bo.canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"');
bu=bo.canPlayType('video/ogg; codecs="theora, vorbis"');
bk=bo.canPlayType('video/webm; codecs="vp8, vorbis"')
}catch(by){}}return{platform:bv,userAgent:br,win:bi?/win/.test(bi):/win/.test(bx),mac:bi?/mac/.test(bi):/mac/.test(bx),browser:bl[1]||"",browserVer:bl[2]||"0",ie:!+"\v1",gecko:(function(bC){bC[bC]=bC+"";
return bC[bC]!=bC+""
})(new String("__count__")),opera:w.opera&&az.call(w.opera)=="[object Opera]",webkit:!!(/(webkit)[ \/]([\w.]+)/.exec(bx)),sw:w.screen.width,sh:w.screen.height,ww:w.innerWidth!=null?w.innerWidth:an.body!=null?an.body.clientWidth:null,wh:w.innerHeight!=null?w.innerHeight:an.body!=null?an.body.clientHeight:null,h264Base:bs,h264Extend:bp,h264Main:bt,h264High:bw,oggTheora:bu,webM:bk,flash:bj?bn:false,jQuery:T?j.fn.jquery:false}
})();
w.Invodo=V=w.Invodo||(function(){aX={init:function(bh){if(!bh){bh={}
}aX.cdnBaseUrl=s=bh.cdnBaseUrl||s;
aX.apiBaseUrl=W=(bh.apiBaseUrl||W);
aX.configUrl=ay=(bh.configUrl||ay);
aX.logoUrl=aE=(bh.logoUrl||aE);
aX.embeddedSelector=(bh.embeddedSelector||"div.InvodoViewer,#InvodoVideoPlayer");
aX.popupSelector=(bh.popupSelector||"a.InvodoPL,span.InvodoPL");
aX.overlayLinkSelector=(bh.popupSelector||".InvodoViewerLink");
if(bh.canonicalUrl&&!a){a=bh.canonicalUrl;
r("caSet",{ca:a})
}if(bh.viewers){aU(bh.viewers)
}if(bh.callsToAction){aq(bh.callsToAction)
}if(bh.maxLogCookies!=x){aF=bh.maxLogCookies>=0?bh.maxLogCookies:0;
aF=aF<=bc?aF:bc
}},config:function(bp){var bi=bp[0];
for(var bm=1;
bm<bp.length;
bm++){if(bp[bm].affiliate===aH){bi=bp[bm]
}}var bn=bi.sku;
N=bi.variations?a9(bi.experiment,bi.variations):bi.viewer;
var bj=N?N.podId:false;
if(bj){if(bn){U[bn]=U[bn]||bj;
bd[bn]=bd[bn]||N;
I[bj]=I[bn]
}bd[bj]=bd[bj]||N;
Q[Q.length]=bj
}if(c(bi.variations)){for(var bl=0;
bl<bi.variations.length;
bl++){var bk=bi.variations[bl];
var bo=bk.podId;
if(bo&&!bd[bo]){if(N){bd[bo]=bd[bj]
}else{aT[bo]=true;
p(a5,(function(br){return function(){j(V.__CTA.getCtaSelectors(br.podId).join(",")).hide();
if(br.sku){j(V.__CTA.getCtaSelectors(br.sku).join(",")).hide()
}}
})(bk))
}}}}if(N){var bh={podId:bj};
if(bn){bh.sku=bn
}var bq=aA[bj]||aA[bn];
if(c(bq)&&bq.length>0){bh.functionCount=bq.length;
r("foundContent",bh);
p(a5,function(){for(var br=0,bs=bq.length;
br<bs;
br++){bq[br](bh)
}})
}}},getPlayerInfo:function(){try{return an.getElementById("InvodoVideoPlayer").inPlayerGetInfo()
}catch(bh){return false
}},isPaused:function(){try{return an.getElementById("InvodoVideoPlayer").inPlayerIsPaused()
}catch(bh){return false
}},isPlaying:function(){try{return an.getElementById("InvodoVideoPlayer").inPlayerIsPlaying()
}catch(bh){return false
}},isStopped:function(){try{return an.getElementById("InvodoVideoPlayer").inPlayerIsStopped()
}catch(bh){return false
}},playerConfig:function(bh){a2=bh
},auto:function(bi){V.init(bi);
var bh=[];
aZ(function(bj,bk){bh.push({podId:bk})
},true);
V.init({viewers:bh})
},conversion:function(bh,bi){switch(bh){case"pageShown":case"cartAdd":case"cartRemove":case"ctaView":case"itemPurchase":case"pageView":o(bh,bi);
break;
default:if(bh.match(/^custom\d{2}$/)){o(bh,bi)
}else{w.console.warn("Unknown conversion type: "+bh)
}}},pauseViewer:function(bh){var bi=R(bh);
if(!bi){return
}V.__Viewer.pause(bi)
},playViewer:function(bh){var bi=R(bh);
if(!bi){return
}V.__Viewer.play((bi))
},showViewer:function(){var bl,bj=null,bn;
function bm(bo){if(a8(bo)){bl=bo
}else{if(bo){bl=bo.podId;
bj=bo.podFrame;
bn=bo.sku
}}}if(arguments.length>=2){bm(arguments[0]);
bj=arguments[1]
}else{if(arguments.length===1){bm(arguments[0])
}else{if(arguments.lenth===0){return
}}}var bh={};
var bk;
if(bl){bk=bh.podId=bl
}else{if(bn){bk=bh.sku=bn
}}V.init({viewers:bh});
var bi=arguments;
p(I[bk],(function(){V.__Viewer.show.apply(null,bi)
}))
},registerEventListener:function(bk,bj){bk=c(bk)?bk:[bk];
for(var bi=0;
bi<bk.length;
bi++){var bh=bk[bi];
if(!a8(bh)||!ah.hasOwnProperty(bh)||!c(ah[bh])){w.console.warn('"'+bh+'" is not a valid event name.');
continue
}if(!aR(bj)){w.console.warn('The callback for "'+bh+'" must be a function.');
continue
}ah[bh].push(bj)
}},removeEventListener:function(bo,bn){bo=c(bo)?bo:[bo];
for(var bl=0;
bl<bo.length;
bl++){var bj=bo[bl];
if(!a8(bj)||!ah.hasOwnProperty(bj)||!c(ah[bj])){w.console.log('"'+bj+'" is not a valid event name.');
continue
}var bm=ah[bj];
var bh=[];
for(var bk=0;
bk<bm.length;
bk++){var bi=bm[bk];
if(bi!==bn){bh.push(bi)
}}ah[bj]=bh
}},EVENT:{POD_START:"podStart",VIDEO_PAUSE:"videoPause",POD_COMPLETE:"podComplete",VIDEO_START:"videoStart",VIDEO_COMPLETE:"videoComplete"},version:{major:3,minor:0,patch:0},noConflict:aP};
return aX
})();
function aZ(bs,br){if(!br&&a0){if(bs){for(var bi in a0){if(a0.hasOwnProperty(bi)){bs(bt,bi)
}}}return a0
}a0={};
var bu=Y(aX.embeddedSelector,an);
for(var bm=0;
bm<bu.length;
bm++){var bt=bu[bm];
var bo=Y(aX.popupSelector,bt);
for(var bl=0;
bl<bo.length;
bl++){var bp=bo[bl];
var bh=bp.getAttribute("href");
var bj;
if(bh){var bn=k.exec(bh);
bj=bn.length>0?bn[1]:false
}else{var bq=bp.getAttribute("data-pod");
bj=bq?bq:false
}if(!a0[bj]){a0[bj]=[]
}a0[bj].push(bt);
if(bs){try{bs(bt,bj)
}catch(bk){w.console.error("Exception while executing findViewers() callback",bk)
}}}}return a0
}function K(bh){if(bh&&bh.replace){return bh.replace(/\'/g,"&quot;").replace(/\"/g,"&quot;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
}else{return bh+""
}}function G(){for(var bi=0;
bi<arguments.length;
bi++){if(bi==0){var bh=arguments[0]
}if(bi==1){var bj=document.createElement(arguments[1])
}if(bi>1){bj.setAttribute(arguments[bi][0],K(arguments[bi][1]))
}}bh.appendChild(bj)
}function aQ(bl){if(bl&&bl.config){if(bl.frames&&bl.frames.length>0){var bj=document.getElementsByTagName("html")[0];
var bh=document.createAttribute("xmlns:og");
bh.nodeValue="http://ogp.me/ns#";
bj.setAttributeNode(bh);
var bk=document.getElementsByTagName("head")[0];
for(var bi=0;
bi<bl.frames.length;
bi++){var bp=bl.frames[bi];
var bm=b("/fl/InPlayer.swf")+"?RTMP="+bl.config.rtmpBase+"&filename="+bp.RTMP+"/"+bp.filename;
var bn=b(bl.config.imageBase+bp.thumbnailUrl);
G(bk,"link",["rel","image_src"],["href",bn]);
G(bk,"link",["rel","video_src"],["href",bm]);
G(bk,"meta",["name","medium"],["content","video"]);
G(bk,"meta",["name","video_height"],["content",bp.height]);
G(bk,"meta",["name","video_width"],["content",bp.width]);
G(bk,"meta",["name","video_type"],["content","application/x-shockwave-flash"]);
G(bk,"meta",["property","og:video"],["content",bm]);
G(bk,"meta",["property","og:video:type"],["content","application/x-shockwave-flash"]);
G(bk,"meta",["property","og:video:height"],["content",bp.height]);
G(bk,"meta",["property","og:video:width"],["content",bp.width]);
if(bp&&bp.duration){var bo=parseInt(bp.duration);
bo=(bo<1)?1:bo;
G(bk,"meta",["property","og:video:duration"],["content",bo])
}}}}}function aU(by){by=c(by)?by:[by];
function bu(){var bD=aZ();
for(var bP=0;
bP<by.length;
bP++){var bB=by[bP];
var bM=bB.podId?bB.podId:U[bB.sku];
var bI=bB.podId||bB.sku;
if(bM&&!aT[bI]){aT[bI]=true;
var bR=bd[bM];
if(bB.sku){bd[bB.sku]=bR
}if(bR){bR.config=a2;
if(bR.config.og=="true"){aQ(bR)
}var bG=a2&&a2.rtmpBase?a2.rtmpBase:X;
var bC=a2&&a2.imageBase?a2.imageBase:a3;
if(ap==="https:"&&bC.match(/http:\/\/[^.]+[.]invodo[.]com\/media\//)){bC=a3
}var bQ=a2&&a2.httpBase?a2.httpBase:aM;
var bJ=bR.frames;
for(bO=0;
bO<bJ.length;
bO++){var bK=bJ[bO];
if(bK.baseUrlsApplied===true){continue
}bK.baseUrlsApplied=true;
bK.previewUrl=bC+bK.previewUrl;
bK.thumbnailUrl=bC+bK.thumbnailUrl;
bK.RTMP=bG+bK.RTMP;
bK.HTTP=bQ+bK.HTTP
}}if(bI!==bM&&aT[bM]){continue
}aT[bM]=true;
if(bB.selector){var bF=Y(bB.selector,an);
for(var bN=0;
bN<bF.length;
bN++){var bS=bF[bN];
if(!bD[bM]){bD[bM]=[]
}bD[bM].push(bS)
}}w.Invodo.__Viewer.init(bM,bB);
var bA=bB.footerMode?bB.footerMode:false;
var bE=bB.viewerButtonText?bB.viewerButtonText:false;
var bH=bB.viewerButtonCallback?bB.viewerButtonCallback:false;
if(bA){w.Invodo.__Viewer.setFooterMode(bA)
}if(bH||bE){w.Invodo.__Viewer.setViewerButton(bM,bH,bE,bB.type)
}if(bd[bM]){w.Invodo.__Viewer.config(bd[bM])
}if(c(bD[bM])){var bL=bD[bM];
for(var bO=0;
bO<bL.length;
bO++){V.__Viewer.initHybridEmbeddedBlock(bL[bO],bM,bB)
}}}}}for(var bv=0;
bv<by.length;
bv++){var bj=by[bv];
var bs=bj.podId;
var bq=bj.sku;
if(!bj.type||bj.type==="h"){bj.type="o"
}var bw=bs&&typeof aT[bs]==="undefined";
var bm=bq&&typeof aT[bq]==="undefined";
var bx=bw?bs:(bm?bq:x);
if(bw||bm){bd[bx]=false;
var bp="";
var bk=encodeURIComponent(aH);
if(bw){var bl=aB(bs)+"/"+bs.charAt(bs.length-1)+"/"+bs;
bp=s+"/3.0/pl/"+bl+".js"
}else{if(bm){var bn=encodeURIComponent(bq);
var br=aB(bk+"/"+bn+".js");
var bo=encodeURIComponent(bk)+"/"+encodeURIComponent(bn)+".js";
bp=s+"/3.0/pl/"+br+"/"+bo
}}var bz=F.slice(0);
C["pl"+bx]=m(bp,"js");
bz.push("pl"+bx);
var bi=encodeURIComponent(y);
var bt=(!y?encodeURIComponent(bk):(encodeURIComponent(bk)+"/"+encodeURIComponent(bi)))+".js";
var bh=s+"/3.0/s/"+bt;
C["cfg"+aH]=m(bh,"js");
bz.push("cfg"+aH);
I[bx]=bz;
p(bz,bu)
}}}function aq(bn){function bi(bp,bo,bq){if(!c(aA[bp])){aA[bp]=new Array()
}aA[bp].push(function(bt){bt.selector=bo;
var bs=Y(bo,an);
for(var br=0;
br<bs.length;
br++){bq(bs[br],bt)
}})
}bn=c(bn)?bn:[bn];
for(var bk=0;
bk<bn.length;
bk++){var bj=bn[bk];
var bm=bj&&bj.foundContent;
var bl=bj.podId||bj.ctaCallTo||bj.sku;
var bh=bj.selector;
if(!bl||!bh){continue
}if(bm===true){bi(bl,bh,function(bo){j(bo).show()
})
}else{if(a8(bm)){bi(bl,bh,(function(bo){return function(bp){j(bp).css("display",bo)
}
})(bm))
}else{if(aR(bm)){bi(bl,bh,bm)
}}}}p(a5,(function(bo){return function(){for(var bq=0;
bq<bo.length;
bq++){var bp=bo[bq];
if(bp.selector&&(bp.podId||bp.sku)){w.Invodo.__CTA.init();
w.Invodo.__CTA.attach(bp)
}}}
})(bn))
}function a9(bk,bo){var bn=t(bg);
var bj;
if(bn){var bi=aW(bn).split("_");
for(i=0;
i<bi.length;
i++){if(bi[i].match("^"+bk+"-")){var bm=bi[i].split("-");
bk=bm[0];
bj=bm[1];
if(bj!=="nv"&&typeof bo[bj]==="undefined"){bj=x
}break
}}}var bl;
if(bj){bl=bj==="nv"?false:bo[bj]
}else{bj=g(bo);
bl=bo[bj]
}var bh=bk+"/"+bj;
A[A.length]=bh;
if(bl){bl.exp=bh
}ax(bn,bk,bj);
r("experimentBranchChosen",{exp:bh});
return bl
}function ax(bh,bk,bj){var bq=aW(bh);
var bn=bh.substring(0,22);
var bp=bn;
var br=new Date().getTime();
var bo=bq.split("_");
var bl=!bk;
for(i=0;
i<bo.length;
i++){var bm=bo[i].split("-");
if(bk&&bm[0]===bk){bl=true;
bp=bp+"_"+bk+"-"+(typeof bj==="undefined"?bm[1]:bj)+"-"+new Date().getTime()
}else{var bi=bm[2];
if(br-bi<=am){bp=bp+"_"+bo[i]
}}}if(!bl){bp=bp+"_"+bk+"-"+bj+"-"+new Date().getTime()
}aK(bg,bp,ac,ad);
return bn
}function g(bj){var bh=Math.floor(Math.random()*101);
var bi=0;
for(i=0;
i<bj.length;
i++){if(bh>=bi&&bh<(bi+bj[i].percentage)){return i
}else{bi=bi+bj[i].percentage
}}return"nv"
}function aW(bh){return bh.substring(23)
}function aK(bj,bl,bm,bk){var bh="";
if(bm){var bi=new Date();
bi.setTime(bi.getTime()+(bm*24*60*60*1000));
bh="; expires="+bi.toGMTString()
}an.cookie=encodeURIComponent(bj)+"="+encodeURIComponent(bl)+bh+"; path=/"+((bk)?";domain="+bk:"")
}function t(bi){var bk=encodeURIComponent(bi)+"=";
var bh=an.cookie.split(/\s*;\s*/);
for(var bj=0;
bj<bh.length;
bj++){var bl=bh[bj];
if(bl.indexOf(bk)===0){return decodeURIComponent(bl.substring(bk.length))
}}return null
}function aJ(bh){aK(encodeURIComponent(bh),"",-1)
}function o(bk,bl){var bj={};
for(var bm in bl){switch(bm){case"pageName":bl.p=bl.pageName;
delete bl.pageName;
break;
case"pageType":bl.pt=bl.pageType;
delete bl.pageType;
break;
case"parentPageName":bl.pp=bl.parentPageName;
delete bl.parentPageName;
break;
case"parentPageType":bl.ppt=bl.parentPageType;
delete bl.parentPageType;
break;
case"product":bl.pd=bl.product;
delete bl.product;
break;
case"masterProduct":bl.mpd=bl.masterProduct;
delete bl.masterProduct;
break;
case"quantity":bl.qty=bl.quantity;
delete bl.quantity;
break
}}bl.exp=A.join(",");
bl.podsPresented=Q.join(",");
bl.podsViewed=d.join(",");
bl.framesViewed=ak.join(",");
bl.framesCompleted=au.join(",");
var bh="";
for(var bi in aO){if(bl.hasOwnProperty(bi)){bh+=(bi+"/"+aO[bi]+",")
}}bl.framesMaxTimePlayed=bh.slice(0,-1);
r(bk,bl);
aY()
}function r(bh,bk){if(bk==null){bk=""
}if(a8(bk)){bk={val:bk}
}if(a7){w.console.log("Event",bh,bk)
}q[q.length]="e"+(Z++)+"="+bh+"="+((new Date().getTime())-E)+(bk?";"+aw(bk):"");
if(ah.hasOwnProperty(bh)&&c(ah[bh])){if(!bk.eventName){bk.eventName=bh
}var bj=ah[bh];
for(var bi=0;
bi<bj.length;
bi++){setTimeout((function(bm,bl){return function(){bm(bl)
}
})(bj[bi],bk),10)
}}}function aw(bj){var bh="";
for(var bi in bj){if(bj.hasOwnProperty(bi)){bh+=encodeURIComponent(bi);
bh+="=";
bh+=encodeURIComponent(bj[bi]);
bh+=";"
}}return bh.slice(0,-1)
}function aY(bk){bk=!!bk;
if(q.length>0){B=new Date().getTime();
var bm=b(D,W)+"?id="+H+"&s="+aC+"&v="+J+"&a="+aH,bl=bm,bj;
while(q.length>0){bj=q.shift();
if(bj&&bj.length>0){bl+="&";
bl+=bj
}if(q.length==0||(!bk&&bl.length>1500)){var bh=v;
var bi=aF;
while(t(bh)!==null){bh+="_";
if(--bi===0){bh=v;
break
}}if(aF>0){aK(bh,bl,bb)
}(function(bo){var bn=new Image();
bn.onload=bn.onerror=function(){bn.onload=bn.onerror=null;
aJ(bo)
};
bn.src=bl
})(bh);
bl=bm
}}}}function aP(){var bh=w.Invodo;
w.Invodo=ae;
return bh
}function R(bh){if(!bh||a8(bh)){return bh
}if(bh.podId){return bh.podId
}if(bh.sku){return U[bh.sku]
}return bh
}function b(bi,bj){if(!a8(bi)){bi=""
}if(!a8(bj)){bj=""
}var bh=(n.test(bi)?"":bj)+bi;
return((n.test(bh)?"":s+ao)+bh)
}function O(bh){return aj("js",bh+(ag?"-uncompressed":"")+".js")
}function aj(bh,bi){return"/"+be+"/"+bh+"/"+bi
}function L(bj,bh,bi){if(bj.attachEvent){bj.attachEvent("on"+bh,bi)
}else{bj.addEventListener(bh,bi,false)
}}function a4(bj,bh,bi){if(bj.detachEvent){bj.detachEvent("on"+bh,bi)
}else{bj.removeEventListener(bh,bi,false)
}}function a1(bi,bl){if(!a8(bi)){return false
}var bh=z.exec(bi);
var bj=0;
var bk;
while(bl[bj]!=x){bk=parseInt(bh[bj+1]);
if(bk==bl[bj]){bj++;
continue
}return bk>bl[bj]
}return true
}function m(bl,bi,bk,bh){var bj={src:bl,loadStarted:false,loadComplete:false,type:bi,preLoadCallback:bh,postLoadCallback:bk};
return bj
}function p(bi,bq){var bh=0;
var bj=600;
var bo=50;
function br(){for(var bt=0;
bt<bi.length;
bt++){if(!C[bi[bt]].loadComplete){bh++;
if(bh>bj){bh=bj=bo=null;
continue
}setTimeout(br,bo);
return
}}if(c(bi.callbackList)){var bs;
while(bs=bi.callbackList.shift()){bs()
}}}if(aR(bq)){if(!c(bi.callbackList)){bi.callbackList=[]
}bi.callbackList.push(bq)
}var bp=bi.length;
for(var bk=0;
bk<bp;
bk++){var bl=bi[bk];
var bn=C[bl];
if(bn.loadStarted===false){bn.loadStarted=new Date().getTime();
if(aR(bn.preLoadCallback)){bn.preLoadCallback()
}var bm=(function(bs,bt){return function(bv){bt.loadComplete=new Date().getTime();
var bu={name:bs,type:bt.type,lt:(bt.loadComplete-bt.loadStarted)};
if(bv!==x){bu.e=bv
}if(bv===x&&aR(bt.postLoadCallback)){return bt.postLoadCallback()
}return true
}
}(bl,bn));
switch(bn.type){case"js":aL(bn.src,bm);
break;
case"css":M(bn.src,bm);
break;
default:(function(bu,bt){var bs=new Image();
bs.onload=function(bv){bs.onload=bs.onerror=bs.onabort=null;
bt()
};
bs.onerror=function(bv){bs.onload=bs.onerror=bs.onabort=null;
bt(bu.type==="i"?"e":x)
};
bs.onabort=function(bv){bs.onload=bs.onerror=bs.onabort=null;
bt("a")
};
bs.src=b(bu.src)
})(bn,bm)
}}}setTimeout(br,50)
}function aL(bi,bj){function bh(){var bk=false;
var bm=an.createElement("script");
bm.type="text/javascript";
bm.async=true;
bm.onload=bm.onerror=bm.onabort=bm.onreadystatechange=function(bn){if(bk){bm.onload=bm.onerror=bm.onabort=bm.onreadystatechange=null;
return
}else{if(this.readyState&&this.readyState!=="loaded"&&this.readyState!=="complete"){return
}}bk=true;
bm.onload=bm.onerror=bm.onreadystatechange=null;
if(aR(bj)){if(bn){if(bn.type=="error"){bj("e");
return
}else{if(bn.type==="abort"){bj("a");
return
}}}bj()
}};
bm.src=b(bi);
var bl=an.getElementsByTagName("script")[0];
bl.parentNode.insertBefore(bm,bl)
}if(an.readyState==="complete"||an.readyState==="loaded"){setTimeout(bh,0)
}else{L(w,"load",bh)
}}function M(bi,bn){var bk=an.createElement("link");
bk.rel="stylesheet";
bk.media="screen";
bk.type="text/css";
bk.href=b(bi);
bk.id="invodo_css_"+Math.random();
if("onload" in bk&&!af.webkit){if(aR(bn)){bk.onload=function(){bk.onload=null;
if(aR(bn)){bn()
}}
}}else{var bl=0,bm=25,bh=3*1000;
(function bj(){try{var br=an.styleSheets;
for(var bq=0;
bq<br.length;
bq++){var bp=br[bq];
var bo=bp.ownerNode?bp.ownerNode:bp.owningElement;
if(bo&&bo.id==bk.id){if(aR(bn)){bn();
return
}}}}catch(bs){}bl+=bm;
if(bl>bh){if(aR(bn)){bn("t")
}return
}setTimeout(bj,bm)
})()
}an.getElementsByTagName("head")[0].appendChild(bk)
}function aB(bl){var bh=131,bk=0;
for(var bi=0,bj=bl.length;
bi<bj;
bi++){bk=(((bk*bh)%65535)+bl.charCodeAt(bi))%65535
}return Math.abs(bk%8)
}function aI(bh){bh.preventDefault();
return false
}function c(bh){return bh&&az.call(bh)==="[object Array]"
}function a8(bh){return bh&&az.call(bh)==="[object String]"
}function aR(bh){return bh&&az.call(bh)==="[object Function]"
}function h(){var bi=new Array();
for(var bj=0;
bj<5;
bj++){bi[bj]=Math.random()*16777216|0
}var bk=new Array();
bk[0]=aS[bi[0]&3];
for(var bh=1;
bh<22;
bh++){bk[bh]=aS[(bi[0|(bh/5)]>>6*(bh%4))&63]
}return bk.join("")
}function aD(bj,bi){var bh;
if(bj.currentStyle){bh=bj.currentStyle[bi]
}else{if(w.getComputedStyle){bh=w.getComputedStyle(bj,null).getPropertyValue(bi)
}}return bh
}(function(){if(an.readyState==null&&an.addEventListener){an.addEventListener("DOMContentLoaded",function bz(){an.removeEventListener("DOMContentLoaded",bz,false);
an.readyState="complete"
},false);
an.readyState="loading"
}var bi=ba.length,bv=false,bu=false,br={},bm=false,bp=false,bh=/^(.*\/)?jquery[^\/]*\.js/i,bx=/https?\:\/\/(?:e([.][^.]+[.])invodo.com|[^\/]+)(:\d*)?(\/[^\/]+)?\/3[.]0\/js\/invodo(-auto)?(-uncompressed)?[.]js(?:\?([^#]*))?/i;
while(bi--&&!bv&&!bu){try{if(!bv){if(INVODO_NS.thisScriptSrc.length>1){bv=INVODO_NS.thisScriptSrc.match(bx)
}else{bv=ba[bi].match(bx)
}if(bv){if(!!bv[1]){s=ap+"//e"+bv[1]+"invodo.com";
W=ap+"//log"+bv[1]+"invodo.com"
}s+=((bv[2]?bv[2]:"")+(bv[3]?bv[3]:""));
bv[6].replace(bf,function(bC,bB,bD){if(bB){if(bB==="a"){aH=decodeURIComponent(bD)
}else{if(bB==="s"){y=decodeURIComponent(bD)
}else{if(bB!=="_"){bm=true;
br[decodeURIComponent(bB)]=decodeURIComponent(bD)
}}}}});
bp=!!bv[4];
ag=!!bv[5];
continue
}}if(!al){bu=ba[bi].match(bh);
if(bu){al=ba[bi]
}}}catch(bj){r("errorPageLoad",w.top.location.href.toString())
}}if(bp){V.auto(br)
}else{if(bm){V.init(br)
}}if(av&&al&&al.src){C.jQuery.src=al.src
}var bt=t("invodoViewer");
if(bt){aC=bt.substring(0,22);
a6=bt.substring(22)||"";
aK("invodoViewer",aC+H)
}else{aC=h();
a6=false;
aK("invodoViewer",aC)
}var bq=t(bg);
if(!bq){J=h();
aK(bg,J,ac,ad)
}else{J=ax(bq)
}var bw=b(D,W);
bw+="?id="+H;
if(a6){bw+="&pid="+a6
}bw+="&a="+encodeURIComponent(aH);
if(y){bw+="&sf="+encodeURIComponent(y)
}bw+="&s="+aC;
bw+="&v="+J;
bw+="&ua="+aw(af);
bw+="&page="+encodeURIComponent(w.location);
if(an.referrer&&an.referrer.length>0){bw+="&ref="+encodeURIComponent(an.referrer)
}var bo=2;
(function bn(){var bB=new Image();
bB.onError=function(){if(bo-->0){setTimeout(bn,500)
}};
bB.src=bw
})();
var by=v;
var bs=0;
while(bs++<bc){var bA=t(by);
if(!bA){break
}if(bA.indexOf(W)!==0){bA=bA.replace(/^[^:]+:\/\/[^\/]+/,W)
}bA+=("&d="+bs);
(function(bD,bB){var bC=new Image();
bC.onload=bC.onerror=function(){bC.onload=bC.onerror=null;
aJ(bD)
};
bC.src=bB
})(by,bA);
by+="_"
}P=setInterval(function(){aY()
},at);
L(w,"unload",function bl(){try{clearInterval(P);
r("pageUnload");
aY(true);
var bG=ah,bC,bD,bB;
for(var bF in bG){bD=bG[bF];
if(bG.hasOwnProperty(bF)&&c(bD)){for(bC=0,bB=bD.length;
bC<bB;
bC++){bD[bC]=x
}}bG[bF]=[]
}}catch(bE){}try{a4(w,"unload",bl)
}catch(bE){}});
if(!a){(function bk(){var bG=an.readyState==="complete"||an.readyState==="loaded";
try{if(a){return
}var bE=document.getElementsByTagName("link");
for(var bF=0,bI=bE.length;
bF<bI;
bF++){var bH=bE[bF];
if(bH.getAttribute("rel")==="canonical"){a=bH.getAttribute("href");
if(a){var bJ=/^(ftp|http|https):/;
if(!bJ.test(a)){var bB=document.getElementsByTagName("base")[0];
bB=(bB&&bB.href)?bB.href:"";
if(bB){var bK=bB.substring(bB.length-1,bB.length);
if(bK!="/"){bB+="/"
}var bD=a.substring(0,1);
if(bD=="/"){a=a.substring(1,a.length)
}a=bB+a
}}r("caSet",{ca:a});
return
}}}}catch(bC){console.log("Error looking for canonical link tag.",bC)
}if(!bG){L(w,"load",bk)
}})()
}})();
ab={resourcePath:S,affiliateKey:aH,viewerConfigs:bd,initCtas:aq,logEvent:r,podViewed:d,frameViewed:ak,frameCompleted:au,frameMaxTimePlayedHash:aO,buildResourceObject:m,loadResourcesAndExec:p,loadableResources:C,iFixPngResources:ai,resolvePodId:R,canonicalUri:b,versionedJsUri:O,versionedUri:aj,isArray:c,isFunction:aR,isString:a8,getStyle:aD,noop:aI,ua:af};
function aN(){var bs=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,bt=0,bv=Object.prototype.toString,bn=false,bm=true;
[0,0].sort(function(){bm=false;
return 0
});
var bj=function(bE,bz,bH,bI){bH=bH||[];
var bK=bz=bz||document;
if(bz.nodeType!==1&&bz.nodeType!==9){return[]
}if(!bE||typeof bE!=="string"){return bH
}var bF=[],bB,bM,bP,bA,bD=true,bC=bk(bz),bJ=bE;
while((bs.exec(""),bB=bs.exec(bJ))!==null){bJ=bB[3];
bF.push(bB[1]);
if(bB[2]){bA=bB[3];
break
}}if(bF.length>1&&bo.exec(bE)){if(bF.length===2&&bp.relative[bF[0]]){bM=bw(bF[0]+bF[1],bz)
}else{bM=bp.relative[bF[0]]?[bz]:bj(bF.shift(),bz);
while(bF.length){bE=bF.shift();
if(bp.relative[bE]){bE+=bF.shift()
}bM=bw(bE,bM)
}}}else{if(!bI&&bF.length>1&&bz.nodeType===9&&!bC&&bp.match.ID.test(bF[0])&&!bp.match.ID.test(bF[bF.length-1])){var bL=bj.find(bF.shift(),bz,bC);
bz=bL.expr?bj.filter(bL.expr,bL.set)[0]:bL.set[0]
}if(bz){var bL=bI?{expr:bF.pop(),set:br(bI)}:bj.find(bF.pop(),bF.length===1&&(bF[0]==="~"||bF[0]==="+")&&bz.parentNode?bz.parentNode:bz,bC);
bM=bL.expr?bj.filter(bL.expr,bL.set):bL.set;
if(bF.length>0){bP=br(bM)
}else{bD=false
}while(bF.length){var bO=bF.pop(),bN=bO;
if(!bp.relative[bO]){bO=""
}else{bN=bF.pop()
}if(bN==null){bN=bz
}bp.relative[bO](bP,bN,bC)
}}else{bP=bF=[]
}}if(!bP){bP=bM
}if(!bP){bj.error(bO||bE)
}if(bv.call(bP)==="[object Array]"){if(!bD){bH.push.apply(bH,bP)
}else{if(bz&&bz.nodeType===1){for(var bG=0;
bP[bG]!=null;
bG++){if(bP[bG]&&(bP[bG]===true||bP[bG].nodeType===1&&bq(bz,bP[bG]))){bH.push(bM[bG])
}}}else{for(var bG=0;
bP[bG]!=null;
bG++){if(bP[bG]&&bP[bG].nodeType===1){bH.push(bM[bG])
}}}}}else{br(bP,bH)
}if(bA){bj(bA,bK,bH,bI);
bj.uniqueSort(bH)
}return bH
};
bj.uniqueSort=function(bA){if(bu){bn=bm;
bA.sort(bu);
if(bn){for(var bz=1;
bz<bA.length;
bz++){if(bA[bz]===bA[bz-1]){bA.splice(bz--,1)
}}}}return bA
};
bj.matches=function(bz,bA){return bj(bz,null,null,bA)
};
bj.find=function(bG,bz,bH){var bF,bD;
if(!bG){return[]
}for(var bC=0,bB=bp.order.length;
bC<bB;
bC++){var bE=bp.order[bC],bD;
if((bD=bp.leftMatch[bE].exec(bG))){var bA=bD[1];
bD.splice(1,1);
if(bA.substr(bA.length-1)!=="\\"){bD[1]=(bD[1]||"").replace(/\\/g,"");
bF=bp.find[bE](bD,bz,bH);
if(bF!=null){bG=bG.replace(bp.match[bE],"");
break
}}}}if(!bF){bF=bz.getElementsByTagName("*")
}return{set:bF,expr:bG}
};
bj.filter=function(bK,bJ,bN,bD){var bB=bK,bP=[],bH=bJ,bF,bz,bG=bJ&&bJ[0]&&bk(bJ[0]);
while(bK&&bJ.length){for(var bI in bp.filter){if((bF=bp.leftMatch[bI].exec(bK))!=null&&bF[2]){var bA=bp.filter[bI],bO,bM,bC=bF[1];
bz=false;
bF.splice(1,1);
if(bC.substr(bC.length-1)==="\\"){continue
}if(bH===bP){bP=[]
}if(bp.preFilter[bI]){bF=bp.preFilter[bI](bF,bH,bN,bP,bD,bG);
if(!bF){bz=bO=true
}else{if(bF===true){continue
}}}if(bF){for(var bE=0;
(bM=bH[bE])!=null;
bE++){if(bM){bO=bA(bM,bF,bE,bH);
var bL=bD^!!bO;
if(bN&&bO!=null){if(bL){bz=true
}else{bH[bE]=false
}}else{if(bL){bP.push(bM);
bz=true
}}}}}if(bO!==x){if(!bN){bH=bP
}bK=bK.replace(bp.match[bI],"");
if(!bz){return[]
}break
}}}if(bK===bB){if(bz==null){bj.error(bK)
}else{break
}}bB=bK
}return bH
};
bj.error=function(bz){throw"Syntax error, unrecognized expression: "+bz
};
var bp=bj.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(bz){return bz.getAttribute("href")
}},relative:{"+":function(bF,bA){var bC=typeof bA==="string",bE=bC&&!/\W/.test(bA),bG=bC&&!bE;
if(bE){bA=bA.toLowerCase()
}for(var bB=0,bz=bF.length,bD;
bB<bz;
bB++){if((bD=bF[bB])){while((bD=bD.previousSibling)&&bD.nodeType!==1){}bF[bB]=bG||bD&&bD.nodeName.toLowerCase()===bA?bD||false:bD===bA
}}if(bG){bj.filter(bA,bF,true)
}},">":function(bF,bA){var bD=typeof bA==="string";
if(bD&&!/\W/.test(bA)){bA=bA.toLowerCase();
for(var bB=0,bz=bF.length;
bB<bz;
bB++){var bE=bF[bB];
if(bE){var bC=bE.parentNode;
bF[bB]=bC.nodeName.toLowerCase()===bA?bC:false
}}}else{for(var bB=0,bz=bF.length;
bB<bz;
bB++){var bE=bF[bB];
if(bE){bF[bB]=bD?bE.parentNode:bE.parentNode===bA
}}if(bD){bj.filter(bA,bF,true)
}}},"":function(bC,bA,bE){var bB=bt++,bz=bx;
if(typeof bA==="string"&&!/\W/.test(bA)){var bD=bA=bA.toLowerCase();
bz=bh
}bz("parentNode",bA,bB,bC,bD,bE)
},"~":function(bC,bA,bE){var bB=bt++,bz=bx;
if(typeof bA==="string"&&!/\W/.test(bA)){var bD=bA=bA.toLowerCase();
bz=bh
}bz("previousSibling",bA,bB,bC,bD,bE)
}},find:{ID:function(bA,bB,bC){if(typeof bB.getElementById!=="undefined"&&!bC){var bz=bB.getElementById(bA[1]);
return bz?[bz]:[]
}},NAME:function(bB,bE){if(typeof bE.getElementsByName!=="undefined"){var bA=[],bD=bE.getElementsByName(bB[1]);
for(var bC=0,bz=bD.length;
bC<bz;
bC++){if(bD[bC].getAttribute("name")===bB[1]){bA.push(bD[bC])
}}return bA.length===0?null:bA
}},TAG:function(bz,bA){return bA.getElementsByTagName(bz[1])
}},preFilter:{CLASS:function(bC,bA,bB,bz,bF,bG){bC=" "+bC[1].replace(/\\/g,"")+" ";
if(bG){return bC
}for(var bD=0,bE;
(bE=bA[bD])!=null;
bD++){if(bE){if(bF^(bE.className&&(" "+bE.className+" ").replace(/[\t\n]/g," ").indexOf(bC)>=0)){if(!bB){bz.push(bE)
}}else{if(bB){bA[bD]=false
}}}}return false
},ID:function(bz){return bz[1].replace(/\\/g,"")
},TAG:function(bA,bz){return bA[1].toLowerCase()
},CHILD:function(bz){if(bz[1]==="nth"){var bA=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(bz[2]==="even"&&"2n"||bz[2]==="odd"&&"2n+1"||!/\D/.test(bz[2])&&"0n+"+bz[2]||bz[2]);
bz[2]=(bA[1]+(bA[2]||1))-0;
bz[3]=bA[3]-0
}bz[0]=bt++;
return bz
},ATTR:function(bD,bA,bB,bz,bE,bF){var bC=bD[1].replace(/\\/g,"");
if(!bF&&bp.attrMap[bC]){bD[1]=bp.attrMap[bC]
}if(bD[2]==="~="){bD[4]=" "+bD[4]+" "
}return bD
},PSEUDO:function(bD,bA,bB,bz,bE){if(bD[1]==="not"){if((bs.exec(bD[3])||"").length>1||/^\w/.test(bD[3])){bD[3]=bj(bD[3],null,null,bA)
}else{var bC=bj.filter(bD[3],bA,bB,true^bE);
if(!bB){bz.push.apply(bz,bC)
}return false
}}else{if(bp.match.POS.test(bD[0])||bp.match.CHILD.test(bD[0])){return true
}}return bD
},POS:function(bz){bz.unshift(true);
return bz
}},filters:{enabled:function(bz){return bz.disabled===false&&bz.type!=="hidden"
},disabled:function(bz){return bz.disabled===true
},checked:function(bz){return bz.checked===true
},selected:function(bz){bz.parentNode.selectedIndex;
return bz.selected===true
},parent:function(bz){return !!bz.firstChild
},empty:function(bz){return !bz.firstChild
},has:function(bB,bA,bz){return !!bj(bz[3],bB).length
},header:function(bz){return/h\d/i.test(bz.nodeName)
},text:function(bz){return"text"===bz.type
},radio:function(bz){return"radio"===bz.type
},checkbox:function(bz){return"checkbox"===bz.type
},file:function(bz){return"file"===bz.type
},password:function(bz){return"password"===bz.type
},submit:function(bz){return"submit"===bz.type
},image:function(bz){return"image"===bz.type
},reset:function(bz){return"reset"===bz.type
},button:function(bz){return"button"===bz.type||bz.nodeName.toLowerCase()==="button"
},input:function(bz){return/input|select|textarea|button/i.test(bz.nodeName)
}},setFilters:{first:function(bA,bz){return bz===0
},last:function(bB,bA,bz,bC){return bA===bC.length-1
},even:function(bA,bz){return bz%2===0
},odd:function(bA,bz){return bz%2===1
},lt:function(bB,bA,bz){return bA<bz[3]-0
},gt:function(bB,bA,bz){return bA>bz[3]-0
},nth:function(bB,bA,bz){return bz[3]-0===bA
},eq:function(bB,bA,bz){return bz[3]-0===bA
}},filter:{PSEUDO:function(bF,bB,bC,bG){var bA=bB[1],bD=bp.filters[bA];
if(bD){return bD(bF,bC,bB,bG)
}else{if(bA==="contains"){return(bF.textContent||bF.innerText||bi([bF])||"").indexOf(bB[3])>=0
}else{if(bA==="not"){var bE=bB[3];
for(var bC=0,bz=bE.length;
bC<bz;
bC++){if(bE[bC]===bF){return false
}}return true
}else{bj.error("Syntax error, unrecognized expression: "+bA)
}}}},CHILD:function(bz,bC){var bF=bC[1],bA=bz;
switch(bF){case"only":case"first":while((bA=bA.previousSibling)){if(bA.nodeType===1){return false
}}if(bF==="first"){return true
}bA=bz;
case"last":while((bA=bA.nextSibling)){if(bA.nodeType===1){return false
}}return true;
case"nth":var bB=bC[2],bI=bC[3];
if(bB===1&&bI===0){return true
}var bE=bC[0],bH=bz.parentNode;
if(bH&&(bH.sizcache!==bE||!bz.nodeIndex)){var bD=0;
for(bA=bH.firstChild;
bA;
bA=bA.nextSibling){if(bA.nodeType===1){bA.nodeIndex=++bD
}}bH.sizcache=bE
}var bG=bz.nodeIndex-bI;
if(bB===0){return bG===0
}else{return(bG%bB===0&&bG/bB>=0)
}}},ID:function(bA,bz){return bA.nodeType===1&&bA.getAttribute("id")===bz
},TAG:function(bA,bz){return(bz==="*"&&bA.nodeType===1)||bA.nodeName.toLowerCase()===bz
},CLASS:function(bA,bz){return(" "+(bA.className||bA.getAttribute("class"))+" ").indexOf(bz)>-1
},ATTR:function(bE,bC){var bB=bC[1],bz=bp.attrHandle[bB]?bp.attrHandle[bB](bE):bE[bB]!=null?bE[bB]:bE.getAttribute(bB),bF=bz+"",bD=bC[2],bA=bC[4];
return bz==null?bD==="!=":bD==="="?bF===bA:bD==="*="?bF.indexOf(bA)>=0:bD==="~="?(" "+bF+" ").indexOf(bA)>=0:!bA?bF&&bz!==false:bD==="!="?bF!==bA:bD==="^="?bF.indexOf(bA)===0:bD==="$="?bF.substr(bF.length-bA.length)===bA:bD==="|="?bF===bA||bF.substr(0,bA.length+1)===bA+"-":false
},POS:function(bD,bA,bB,bE){var bz=bA[2],bC=bp.setFilters[bz];
if(bC){return bC(bD,bB,bA,bE)
}}}};
var bo=bp.match.POS;
for(var bl in bp.match){bp.match[bl]=new RegExp(bp.match[bl].source+/(?![^\[]*\])(?![^\(]*\))/.source);
bp.leftMatch[bl]=new RegExp(/(^(?:.|\r|\n)*?)/.source+bp.match[bl].source.replace(/\\(\d+)/g,function(bA,bz){return"\\"+(bz-0+1)
}))
}var br=function(bA,bz){bA=Array.prototype.slice.call(bA,0);
if(bz){bz.push.apply(bz,bA);
return bz
}return bA
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType
}catch(by){br=function(bD,bC){var bA=bC||[];
if(bv.call(bD)==="[object Array]"){Array.prototype.push.apply(bA,bD)
}else{if(typeof bD.length==="number"){for(var bB=0,bz=bD.length;
bB<bz;
bB++){bA.push(bD[bB])
}}else{for(var bB=0;
bD[bB];
bB++){bA.push(bD[bB])
}}}return bA
}
}var bu;
if(document.documentElement.compareDocumentPosition){bu=function(bA,bz){if(!bA.compareDocumentPosition||!bz.compareDocumentPosition){if(bA==bz){bn=true
}return bA.compareDocumentPosition?-1:1
}var bB=bA.compareDocumentPosition(bz)&4?-1:bA===bz?0:1;
if(bB===0){bn=true
}return bB
}
}else{if("sourceIndex" in document.documentElement){bu=function(bA,bz){if(!bA.sourceIndex||!bz.sourceIndex){if(bA==bz){bn=true
}return bA.sourceIndex?-1:1
}var bB=bA.sourceIndex-bz.sourceIndex;
if(bB===0){bn=true
}return bB
}
}else{if(document.createRange){bu=function(bC,bA){if(!bC.ownerDocument||!bA.ownerDocument){if(bC==bA){bn=true
}return bC.ownerDocument?-1:1
}var bB=bC.ownerDocument.createRange(),bz=bA.ownerDocument.createRange();
bB.setStart(bC,0);
bB.setEnd(bC,0);
bz.setStart(bA,0);
bz.setEnd(bA,0);
var bD=bB.compareBoundaryPoints(Range.START_TO_END,bz);
if(bD===0){bn=true
}return bD
}
}}}function bi(bz){var bA="",bC;
for(var bB=0;
bz[bB];
bB++){bC=bz[bB];
if(bC.nodeType===3||bC.nodeType===4){bA+=bC.nodeValue
}else{if(bC.nodeType!==8){bA+=bi(bC.childNodes)
}}}return bA
}(function(){var bA=document.createElement("div"),bB="script"+(new Date).getTime();
bA.innerHTML="<a name='"+bB+"'/>";
var bz=document.documentElement;
bz.insertBefore(bA,bz.firstChild);
if(document.getElementById(bB)){bp.find.ID=function(bD,bE,bF){if(typeof bE.getElementById!=="undefined"&&!bF){var bC=bE.getElementById(bD[1]);
return bC?bC.id===bD[1]||typeof bC.getAttributeNode!=="undefined"&&bC.getAttributeNode("id").nodeValue===bD[1]?[bC]:x:[]
}};
bp.filter.ID=function(bE,bC){var bD=typeof bE.getAttributeNode!=="undefined"&&bE.getAttributeNode("id");
return bE.nodeType===1&&bD&&bD.nodeValue===bC
}
}bz.removeChild(bA);
bz=bA=null
})();
(function(){var bz=document.createElement("div");
bz.appendChild(document.createComment(""));
if(bz.getElementsByTagName("*").length>0){bp.find.TAG=function(bA,bE){var bD=bE.getElementsByTagName(bA[1]);
if(bA[1]==="*"){var bC=[];
for(var bB=0;
bD[bB];
bB++){if(bD[bB].nodeType===1){bC.push(bD[bB])
}}bD=bC
}return bD
}
}bz.innerHTML="<a href='#'></a>";
if(bz.firstChild&&typeof bz.firstChild.getAttribute!=="undefined"&&bz.firstChild.getAttribute("href")!=="#"){bp.attrHandle.href=function(bA){return bA.getAttribute("href",2)
}
}bz=null
})();
if(document.querySelectorAll){(function(){var bz=bj,bB=document.createElement("div");
bB.innerHTML="<p class='TEST'></p>";
if(bB.querySelectorAll&&bB.querySelectorAll(".TEST").length===0){return
}bj=function(bF,bE,bC,bD){bE=bE||document;
if(!bD&&bE.nodeType===9&&!bk(bE)){try{return br(bE.querySelectorAll(bF),bC)
}catch(bG){}}return bz(bF,bE,bC,bD)
};
for(var bA in bz){bj[bA]=bz[bA]
}bB=null
})()
}(function(){var bz=document.createElement("div");
bz.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!bz.getElementsByClassName||bz.getElementsByClassName("e").length===0){return
}bz.lastChild.className="e";
if(bz.getElementsByClassName("e").length===1){return
}bp.order.splice(1,0,"CLASS");
bp.find.CLASS=function(bA,bB,bC){if(typeof bB.getElementsByClassName!=="undefined"&&!bC){return bB.getElementsByClassName(bA[1])
}};
bz=null
})();
function bh(bA,bF,bE,bI,bG,bH){for(var bC=0,bB=bI.length;
bC<bB;
bC++){var bz=bI[bC];
if(bz){bz=bz[bA];
var bD=false;
while(bz){if(bz.sizcache===bE){bD=bI[bz.sizset];
break
}if(bz.nodeType===1&&!bH){bz.sizcache=bE;
bz.sizset=bC
}if(bz.nodeName.toLowerCase()===bF){bD=bz;
break
}bz=bz[bA]
}bI[bC]=bD
}}}function bx(bA,bF,bE,bI,bG,bH){for(var bC=0,bB=bI.length;
bC<bB;
bC++){var bz=bI[bC];
if(bz){bz=bz[bA];
var bD=false;
while(bz){if(bz.sizcache===bE){bD=bI[bz.sizset];
break
}if(bz.nodeType===1){if(!bH){bz.sizcache=bE;
bz.sizset=bC
}if(typeof bF!=="string"){if(bz===bF){bD=true;
break
}}else{if(bj.filter(bF,[bz]).length>0){bD=bz;
break
}}}bz=bz[bA]
}bI[bC]=bD
}}}var bq=document.compareDocumentPosition?function(bA,bz){return !!(bA.compareDocumentPosition(bz)&16)
}:function(bA,bz){return bA!==bz&&(bA.contains?bA.contains(bz):true)
};
var bk=function(bz){var bA=(bz?bz.ownerDocument||bz:0).documentElement;
return bA?bA.nodeName!=="HTML":false
};
var bw=function(bz,bG){var bC=[],bD="",bE,bB=bG.nodeType?[bG]:bG;
while((bE=bp.match.PSEUDO.exec(bz))){bD+=bE[0];
bz=bz.replace(bp.match.PSEUDO,"")
}bz=bp.relative[bz]?bz+"*":bz;
for(var bF=0,bA=bB.length;
bF<bA;
bF++){bj(bz,bB[bF],bC)
}return bj.filter(bD,bC)
};
return bj
}})(window);