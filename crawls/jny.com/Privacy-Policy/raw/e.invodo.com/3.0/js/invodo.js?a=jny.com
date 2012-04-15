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
}}}}catch(e){}(function(w){if(!w.console){w.console={}
}var f=["asserts","count","dir","dirxml","error","group","groupEnd","info","log","profile","profileEnd","time","timeEnd","trace","warn","markTimeline"];
while(f.length>0){var u=f.shift();
if(typeof w.console[u]==="undefined"){w.console[u]=function(){}
}}var a7=(function(){var bf=[];
try{var be=w.document.getElementsByTagName("script"),bg=be.length;
while(bg-->0){var bh=be[bg];
if(bh.src){bf.push(bh.src)
}}}catch(bi){}return bf
})(),am=w.document,aa=w.navigator,ax=Object.prototype.toString,x,ad=w.Invodo||null,V,aU,aF="unknown",y="",U={},ay={},aR={},N={},ba={},aZ={},aX,Y=function(){Y=aL();
return Y.apply(this,arguments)
},j=w.jQuery,T=j&&j.fn&&j.fn.jquery,z=/(\d+)?(?:[.](\d+))?(?:[.](\d+))?(?:[.](\d+))?.*/,at=T&&aY(j.fn.jquery,[1,3,2]),ak,E=new Date().getTime(),aQ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),a,v="invodoLogCookie",a8=7,aD=5,a9=10,aA,J,H=h(),a3,q=[],Z=0,P,aq=2000,B=new Date().getTime(),a4=false,ag={podStart:[],podComplete:[],videoStart:[],videoPause:[],videoComplete:[]},A=[],Q=[],d=[],aj=[],ar=[],aM={},bd="invodoVisitor",ac=60,al=30*24*60*60*1000,k=/http.*\/p\/(\w{8}).*/,n=/^\w+:\/\//,bc=/(?:^|&)([^&=]*)=?([^&]*)/g,an="/3.0",bb="12.4.1.4",af=false,ao=w.location.protocol==="https:"?"https:":"http:",s=ao+"//e.invodo.com",W=ao+"//log.invodo.com",X="rtmp://aoaef.invodo.com/",a0=ao+"//e.invodo.com/media/",aK="http://aoael.invodo.com/media/",aw="/s",aC="",D="/log",S="",C={jQuery:m(ao+"//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js","js",function(){V.$jq=ab.$jq=j=w.jQuery.noConflict(true)
},false),iFixPng:m(O("ext/jquery.ifixpng"),"js",function(){j.ifixpng(b("/i/x.gif",S))
},false),onePixelGif:m(b("/i/x.gif",S),"image",false,false),cta:m(O("cta.invodo"),"js",function(){var be=w.Invodo.__CTA;
be.__tunnel(function(bf){ab.CTA=aE=bf;
return ab
})
},false),viewer:m(O("viewer.invodo"),"js",function(){var be=w.Invodo.__Viewer;
be.__tunnel(function(bf){ab.Viewer=l=bf;
return ab
})
},false),viewerTemplates:m(O("viewer.tmpl"),"js",false,function(){aU.__template=function(be){ab.templates=be
}
}),viewerStyles:m(ai("css","viewer.css"),"css"),inPlayerSwf:m(ai("fl","InPlayer.swf"),"swf")},a2=["jQuery","cta"],F=["jQuery","viewer","viewerTemplates","viewerStyles"],ah=["iFixPng","onePixelGif"],I={},ab,aE,l,ae=(function(){var bo=aa.userAgent,bu=bo.toLowerCase(),bs=aa.platform,bf=bs.toLowerCase(),bi=(/(chrome)[ \/]([\w.]+)/.exec(bu))||(/(webkit)[ \/]([\w.]+)/.exec(bu))||(/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(bu))||(/(msie) ([\w.]+)/.exec(bu))||(!/compatible/.test(bu)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(bu))||[],bl=am.createElement("video"),bj=!!am.createElement("video").canPlayType,bg=false,bk=[0,0,0],bw=null,be="Shockwave Flash",by="ShockwaveFlash.ShockwaveFlash",bn="application/x-shockwave-flash";
if(typeof aa.plugins!="undefined"&&typeof aa.plugins[be]=="object"){bw=aa.plugins[be].description;
if(bw&&!(typeof aa.mimeTypes!="undefined"&&aa.mimeTypes[bn]&&!aa.mimeTypes[bn].enabledPlugin)){bg=true;
bw=bw.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
bk[0]=parseInt(bw.replace(/^(.*)[.].*$/,"$1"),10);
bk[1]=parseInt(bw.replace(/^.*[.](.*)\s.*$/,"$1"),10);
bk[2]=/[a-zA-Z]/.test(bw)?parseInt(bw.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof w.ActiveXObject!="undefined"){try{var bx=new ActiveXObject(by);
if(bx){bw=bx.GetVariable("$version");
if(bw){bw=bw.split(" ")[1].split(",");
bk=[parseInt(bw[0],10),parseInt(bw[1],10),parseInt(bw[2],10)];
bg=true
}}}catch(bv){}}}var bp="",bq="",bm="",bt="",br="",bh="";
if(bj&&bl.canPlayType){try{bp=bl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
bm=bl.canPlayType('video/mp4; codecs="avc1.58A01E, mp4a.40.2"');
bq=bl.canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"');
bt=bl.canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"');
br=bl.canPlayType('video/ogg; codecs="theora, vorbis"');
bh=bl.canPlayType('video/webm; codecs="vp8, vorbis"')
}catch(bv){}}return{platform:bs,userAgent:bo,win:bf?/win/.test(bf):/win/.test(bu),mac:bf?/mac/.test(bf):/mac/.test(bu),browser:bi[1]||"",browserVer:bi[2]||"0",ie:!+"\v1",gecko:(function(bz){bz[bz]=bz+"";
return bz[bz]!=bz+""
})(new String("__count__")),opera:w.opera&&ax.call(w.opera)=="[object Opera]",webkit:!!(/(webkit)[ \/]([\w.]+)/.exec(bu)),sw:w.screen.width,sh:w.screen.height,ww:w.innerWidth!=null?w.innerWidth:am.body!=null?am.body.clientWidth:null,wh:w.innerHeight!=null?w.innerHeight:am.body!=null?am.body.clientHeight:null,h264Base:bp,h264Extend:bm,h264Main:bq,h264High:bt,oggTheora:br,webM:bh,flash:bg?bk:false,jQuery:T?j.fn.jquery:false}
})();
w.Invodo=V=w.Invodo||(function(){aU={init:function(be){if(!be){be={}
}aU.cdnBaseUrl=s=be.cdnBaseUrl||s;
aU.apiBaseUrl=W=(be.apiBaseUrl||W);
aU.configUrl=aw=(be.configUrl||aw);
aU.logoUrl=aC=(be.logoUrl||aC);
aU.embeddedSelector=(be.embeddedSelector||"div.InvodoViewer,#InvodoVideoPlayer");
aU.popupSelector=(be.popupSelector||"a.InvodoPL,span.InvodoPL");
aU.overlayLinkSelector=(be.popupSelector||".InvodoViewerLink");
if(be.canonicalUrl&&!a){a=be.canonicalUrl;
r("caSet",{ca:a})
}if(be.viewers){aS(be.viewers)
}if(be.callsToAction){ap(be.callsToAction)
}if(be.maxLogCookies!=x){aD=be.maxLogCookies>=0?be.maxLogCookies:0;
aD=aD<=a9?aD:a9
}},config:function(bm){var bf=bm[0];
for(var bj=1;
bj<bm.length;
bj++){if(bm[bj].affiliate===aF){bf=bm[bj]
}}var bk=bf.sku;
N=bf.variations?a6(bf.experiment,bf.variations):bf.viewer;
var bg=N?N.podId:false;
if(bg){if(bk){U[bk]=U[bk]||bg;
ba[bk]=ba[bk]||N;
I[bg]=I[bk]
}ba[bg]=ba[bg]||N;
Q[Q.length]=bg
}if(c(bf.variations)){for(var bi=0;
bi<bf.variations.length;
bi++){var bh=bf.variations[bi];
var bl=bh.podId;
if(bl&&!ba[bl]){if(N){ba[bl]=ba[bg]
}else{aR[bl]=true;
p(a2,(function(bo){return function(){j(V.__CTA.getCtaSelectors(bo.podId).join(",")).hide();
if(bo.sku){j(V.__CTA.getCtaSelectors(bo.sku).join(",")).hide()
}}
})(bh))
}}}}if(N){var be={podId:bg};
if(bk){be.sku=bk
}var bn=ay[bg]||ay[bk];
if(c(bn)&&bn.length>0){be.functionCount=bn.length;
r("foundContent",be);
p(a2,function(){for(var bo=0,bp=bn.length;
bo<bp;
bo++){bn[bo](be)
}})
}}},getPlayerInfo:function(){try{return am.getElementById("InvodoVideoPlayer").inPlayerGetInfo()
}catch(be){return false
}},isPaused:function(){try{return am.getElementById("InvodoVideoPlayer").inPlayerIsPaused()
}catch(be){return false
}},isPlaying:function(){try{return am.getElementById("InvodoVideoPlayer").inPlayerIsPlaying()
}catch(be){return false
}},isStopped:function(){try{return am.getElementById("InvodoVideoPlayer").inPlayerIsStopped()
}catch(be){return false
}},playerConfig:function(be){aZ=be
},auto:function(bf){V.init(bf);
var be=[];
aW(function(bg,bh){be.push({podId:bh})
},true);
V.init({viewers:be})
},conversion:function(be,bf){switch(be){case"pageShown":case"cartAdd":case"cartRemove":case"ctaView":case"itemPurchase":case"pageView":o(be,bf);
break;
default:if(be.match(/^custom\d{2}$/)){o(be,bf)
}else{w.console.warn("Unknown conversion type: "+be)
}}},pauseViewer:function(be){var bf=R(be);
if(!bf){return
}V.__Viewer.pause(bf)
},playViewer:function(be){var bf=R(be);
if(!bf){return
}V.__Viewer.play((bf))
},showViewer:function(){var bi,bg=null,bk;
function bj(bl){if(a5(bl)){bi=bl
}else{if(bl){bi=bl.podId;
bg=bl.podFrame;
bk=bl.sku
}}}if(arguments.length>=2){bj(arguments[0]);
bg=arguments[1]
}else{if(arguments.length===1){bj(arguments[0])
}else{if(arguments.lenth===0){return
}}}var be={};
var bh;
if(bi){bh=be.podId=bi
}else{if(bk){bh=be.sku=bk
}}V.init({viewers:be});
var bf=arguments;
p(I[bh],(function(){V.__Viewer.show.apply(null,bf)
}))
},registerEventListener:function(bh,bg){bh=c(bh)?bh:[bh];
for(var bf=0;
bf<bh.length;
bf++){var be=bh[bf];
if(!a5(be)||!ag.hasOwnProperty(be)||!c(ag[be])){w.console.warn('"'+be+'" is not a valid event name.');
continue
}if(!aP(bg)){w.console.warn('The callback for "'+be+'" must be a function.');
continue
}ag[be].push(bg)
}},removeEventListener:function(bl,bk){bl=c(bl)?bl:[bl];
for(var bi=0;
bi<bl.length;
bi++){var bg=bl[bi];
if(!a5(bg)||!ag.hasOwnProperty(bg)||!c(ag[bg])){w.console.log('"'+bg+'" is not a valid event name.');
continue
}var bj=ag[bg];
var be=[];
for(var bh=0;
bh<bj.length;
bh++){var bf=bj[bh];
if(bf!==bk){be.push(bf)
}}ag[bg]=be
}},EVENT:{POD_START:"podStart",VIDEO_PAUSE:"videoPause",POD_COMPLETE:"podComplete",VIDEO_START:"videoStart",VIDEO_COMPLETE:"videoComplete"},version:{major:3,minor:0,patch:0},noConflict:aN};
return aU
})();
function aW(bp,bo){if(!bo&&aX){if(bp){for(var bf in aX){if(aX.hasOwnProperty(bf)){bp(bq,bf)
}}}return aX
}aX={};
var br=Y(aU.embeddedSelector,am);
for(var bj=0;
bj<br.length;
bj++){var bq=br[bj];
var bl=Y(aU.popupSelector,bq);
for(var bi=0;
bi<bl.length;
bi++){var bm=bl[bi];
var be=bm.getAttribute("href");
var bg;
if(be){var bk=k.exec(be);
bg=bk.length>0?bk[1]:false
}else{var bn=bm.getAttribute("data-pod");
bg=bn?bn:false
}if(!aX[bg]){aX[bg]=[]
}aX[bg].push(bq);
if(bp){try{bp(bq,bg)
}catch(bh){w.console.error("Exception while executing findViewers() callback",bh)
}}}}return aX
}function K(be){if(be&&be.replace){return be.replace(/\'/g,"&quot;").replace(/\"/g,"&quot;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
}else{return be+""
}}function G(){for(var bf=0;
bf<arguments.length;
bf++){if(bf==0){var be=arguments[0]
}if(bf==1){var bg=document.createElement(arguments[1])
}if(bf>1){bg.setAttribute(arguments[bf][0],K(arguments[bf][1]))
}}be.appendChild(bg)
}function aO(bi){if(bi&&bi.config){if(bi.frames&&bi.frames.length>0){var bg=document.getElementsByTagName("html")[0];
var be=document.createAttribute("xmlns:og");
be.nodeValue="http://ogp.me/ns#";
bg.setAttributeNode(be);
var bh=document.getElementsByTagName("head")[0];
for(var bf=0;
bf<bi.frames.length;
bf++){var bm=bi.frames[bf];
var bj=b("/fl/InPlayer.swf")+"?RTMP="+bi.config.rtmpBase+"&filename="+bm.RTMP+"/"+bm.filename;
var bk=b(bi.config.imageBase+bm.thumbnailUrl);
G(bh,"link",["rel","image_src"],["href",bk]);
G(bh,"link",["rel","video_src"],["href",bj]);
G(bh,"meta",["name","medium"],["content","video"]);
G(bh,"meta",["name","video_height"],["content",bm.height]);
G(bh,"meta",["name","video_width"],["content",bm.width]);
G(bh,"meta",["name","video_type"],["content","application/x-shockwave-flash"]);
G(bh,"meta",["property","og:video"],["content",bj]);
G(bh,"meta",["property","og:video:type"],["content","application/x-shockwave-flash"]);
G(bh,"meta",["property","og:video:height"],["content",bm.height]);
G(bh,"meta",["property","og:video:width"],["content",bm.width]);
if(bm&&bm.duration){var bl=parseInt(bm.duration);
bl=(bl<1)?1:bl;
G(bh,"meta",["property","og:video:duration"],["content",bl])
}}}}}function aS(bv){bv=c(bv)?bv:[bv];
function br(){var bA=aW();
for(var bM=0;
bM<bv.length;
bM++){var by=bv[bM];
var bJ=by.podId?by.podId:U[by.sku];
var bF=by.podId||by.sku;
if(bJ&&!aR[bF]){aR[bF]=true;
var bO=ba[bJ];
if(by.sku){ba[by.sku]=bO
}if(bO){bO.config=aZ;
if(bO.config.og=="true"){aO(bO)
}var bD=aZ&&aZ.rtmpBase?aZ.rtmpBase:X;
var bz=aZ&&aZ.imageBase?aZ.imageBase:a0;
if(ao==="https:"&&bz.match(/http:\/\/[^.]+[.]invodo[.]com\/media\//)){bz=a0
}var bN=aZ&&aZ.httpBase?aZ.httpBase:aK;
var bG=bO.frames;
for(bL=0;
bL<bG.length;
bL++){var bH=bG[bL];
if(bH.baseUrlsApplied===true){continue
}bH.baseUrlsApplied=true;
bH.previewUrl=bz+bH.previewUrl;
bH.thumbnailUrl=bz+bH.thumbnailUrl;
bH.RTMP=bD+bH.RTMP;
bH.HTTP=bN+bH.HTTP
}}if(bF!==bJ&&aR[bJ]){continue
}aR[bJ]=true;
if(by.selector){var bC=Y(by.selector,am);
for(var bK=0;
bK<bC.length;
bK++){var bP=bC[bK];
if(!bA[bJ]){bA[bJ]=[]
}bA[bJ].push(bP)
}}w.Invodo.__Viewer.init(bJ,by);
var bx=by.footerMode?by.footerMode:false;
var bB=by.viewerButtonText?by.viewerButtonText:false;
var bE=by.viewerButtonCallback?by.viewerButtonCallback:false;
if(bx){w.Invodo.__Viewer.setFooterMode(bx)
}if(bE||bB){w.Invodo.__Viewer.setViewerButton(bJ,bE,bB,by.type)
}if(ba[bJ]){w.Invodo.__Viewer.config(ba[bJ])
}if(c(bA[bJ])){var bI=bA[bJ];
for(var bL=0;
bL<bI.length;
bL++){V.__Viewer.initHybridEmbeddedBlock(bI[bL],bJ,by)
}}}}}for(var bs=0;
bs<bv.length;
bs++){var bg=bv[bs];
var bp=bg.podId;
var bn=bg.sku;
if(!bg.type||bg.type==="h"){bg.type="o"
}var bt=bp&&typeof aR[bp]==="undefined";
var bj=bn&&typeof aR[bn]==="undefined";
var bu=bt?bp:(bj?bn:x);
if(bt||bj){ba[bu]=false;
var bm="";
var bh=encodeURIComponent(aF);
if(bt){var bi=az(bp)+"/"+bp.charAt(bp.length-1)+"/"+bp;
bm=s+"/3.0/pl/"+bi+".js"
}else{if(bj){var bk=encodeURIComponent(bn);
var bo=az(bh+"/"+bk+".js");
var bl=encodeURIComponent(bh)+"/"+encodeURIComponent(bk)+".js";
bm=s+"/3.0/pl/"+bo+"/"+bl
}}var bw=F.slice(0);
C["pl"+bu]=m(bm,"js");
bw.push("pl"+bu);
var bf=encodeURIComponent(y);
var bq=(!y?encodeURIComponent(bh):(encodeURIComponent(bh)+"/"+encodeURIComponent(bf)))+".js";
var be=s+"/3.0/s/"+bq;
C["cfg"+aF]=m(be,"js");
bw.push("cfg"+aF);
I[bu]=bw;
p(bw,br)
}}}function ap(bk){function bf(bm,bl,bn){if(!c(ay[bm])){ay[bm]=new Array()
}ay[bm].push(function(bq){bq.selector=bl;
var bp=Y(bl,am);
for(var bo=0;
bo<bp.length;
bo++){bn(bp[bo],bq)
}})
}bk=c(bk)?bk:[bk];
for(var bh=0;
bh<bk.length;
bh++){var bg=bk[bh];
var bj=bg&&bg.foundContent;
var bi=bg.podId||bg.ctaCallTo||bg.sku;
var be=bg.selector;
if(!bi||!be){continue
}if(bj===true){bf(bi,be,function(bl){j(bl).show()
})
}else{if(a5(bj)){bf(bi,be,(function(bl){return function(bm){j(bm).css("display",bl)
}
})(bj))
}else{if(aP(bj)){bf(bi,be,bj)
}}}}p(a2,(function(bl){return function(){for(var bn=0;
bn<bl.length;
bn++){var bm=bl[bn];
if(bm.selector&&(bm.podId||bm.sku)){w.Invodo.__CTA.init();
w.Invodo.__CTA.attach(bm)
}}}
})(bk))
}function a6(bh,bl){var bk=t(bd);
var bg;
if(bk){var bf=aT(bk).split("_");
for(i=0;
i<bf.length;
i++){if(bf[i].match("^"+bh+"-")){var bj=bf[i].split("-");
bh=bj[0];
bg=bj[1];
if(bg!=="nv"&&typeof bl[bg]==="undefined"){bg=x
}break
}}}var bi;
if(bg){bi=bg==="nv"?false:bl[bg]
}else{bg=g(bl);
bi=bl[bg]
}var be=bh+"/"+bg;
A[A.length]=be;
if(bi){bi.exp=be
}av(bk,bh,bg);
r("experimentBranchChosen",{exp:be});
return bi
}function av(be,bh,bg){var bn=aT(be);
var bk=be.substring(0,22);
var bm=bk;
var bo=new Date().getTime();
var bl=bn.split("_");
var bi=!bh;
for(i=0;
i<bl.length;
i++){var bj=bl[i].split("-");
if(bh&&bj[0]===bh){bi=true;
bm=bm+"_"+bh+"-"+(typeof bg==="undefined"?bj[1]:bg)+"-"+new Date().getTime()
}else{var bf=bj[2];
if(bo-bf<=al){bm=bm+"_"+bl[i]
}}}if(!bi){bm=bm+"_"+bh+"-"+bg+"-"+new Date().getTime()
}aI(bd,bm,ac);
return bk
}function g(bg){var be=Math.floor(Math.random()*101);
var bf=0;
for(i=0;
i<bg.length;
i++){if(be>=bf&&be<(bf+bg[i].percentage)){return i
}else{bf=bf+bg[i].percentage
}}return"nv"
}function aT(be){return be.substring(23)
}function aI(bg,bi,bj,bh){var be="";
if(bj){var bf=new Date();
bf.setTime(bf.getTime()+(bj*24*60*60*1000));
be="; expires="+bf.toGMTString()
}am.cookie=encodeURIComponent(bg)+"="+encodeURIComponent(bi)+be+"; path=/"+((bh)?";domain="+bh:"")
}function t(bf){var bh=encodeURIComponent(bf)+"=";
var be=am.cookie.split(/\s*;\s*/);
for(var bg=0;
bg<be.length;
bg++){var bi=be[bg];
if(bi.indexOf(bh)===0){return decodeURIComponent(bi.substring(bh.length))
}}return null
}function aH(be){aI(encodeURIComponent(be),"",-1)
}function o(bh,bi){var bg={};
for(var bj in bi){switch(bj){case"pageName":bi.p=bi.pageName;
delete bi.pageName;
break;
case"parentPageName":bi.pp=bi.parentPageName;
delete bi.parentPageName;
break;
case"product":bi.pd=bi.product;
delete bi.product;
break;
case"masterProduct":bi.mpd=bi.masterProduct;
delete bi.masterProduct;
break;
case"quantity":bi.qty=bi.quantity;
delete bi.quantity;
break
}}bi.exp=A.join(",");
bi.podsPresented=Q.join(",");
bi.podsViewed=d.join(",");
bi.framesViewed=aj.join(",");
bi.framesCompleted=ar.join(",");
var be="";
for(var bf in aM){if(bi.hasOwnProperty(bf)){be+=(bf+"/"+aM[bf]+",")
}}bi.framesMaxTimePlayed=be.slice(0,-1);
r(bh,bi);
aV()
}function r(be,bh){if(bh==null){bh=""
}if(a5(bh)){bh={val:bh}
}if(a4){w.console.log("Event",be,bh)
}q[q.length]="e"+(Z++)+"="+be+"="+((new Date().getTime())-E)+(bh?";"+au(bh):"");
if(ag.hasOwnProperty(be)&&c(ag[be])){if(!bh.eventName){bh.eventName=be
}var bg=ag[be];
for(var bf=0;
bf<bg.length;
bf++){setTimeout((function(bj,bi){return function(){bj(bi)
}
})(bg[bf],bh),10)
}}}function au(bg){var be="";
for(var bf in bg){if(bg.hasOwnProperty(bf)){be+=encodeURIComponent(bf);
be+="=";
be+=encodeURIComponent(bg[bf]);
be+=";"
}}return be.slice(0,-1)
}function aV(bh){bh=!!bh;
if(q.length>0){B=new Date().getTime();
var bj=b(D,W)+"?id="+H+"&s="+aA+"&v="+J+"&a="+aF,bi=bj,bg;
while(q.length>0){bg=q.shift();
if(bg&&bg.length>0){bi+="&";
bi+=bg
}if(q.length==0||(!bh&&bi.length>1500)){var be=v;
var bf=aD;
while(t(be)!==null){be+="_";
if(--bf===0){be=v;
break
}}if(aD>0){aI(be,bi,a8)
}(function(bl){var bk=new Image();
bk.onload=bk.onerror=function(){bk.onload=bk.onerror=null;
aH(bl)
};
bk.src=bi
})(be);
bi=bj
}}}}function aN(){var be=w.Invodo;
w.Invodo=ad;
return be
}function R(be){if(!be||a5(be)){return be
}if(be.podId){return be.podId
}if(be.sku){return U[be.sku]
}return be
}function b(bf,bg){if(!a5(bf)){bf=""
}if(!a5(bg)){bg=""
}var be=(n.test(bf)?"":bg)+bf;
return((n.test(be)?"":s+an)+be)
}function O(be){return ai("js",be+(af?"-uncompressed":"")+".js")
}function ai(be,bf){return"/"+bb+"/"+be+"/"+bf
}function L(bg,be,bf){if(bg.attachEvent){bg.attachEvent("on"+be,bf)
}else{bg.addEventListener(be,bf,false)
}}function a1(bg,be,bf){if(bg.detachEvent){bg.detachEvent("on"+be,bf)
}else{bg.removeEventListener(be,bf,false)
}}function aY(bf,bi){if(!a5(bf)){return false
}var be=z.exec(bf);
var bg=0;
var bh;
while(bi[bg]!=x){bh=parseInt(be[bg+1]);
if(bh==bi[bg]){bg++;
continue
}return bh>bi[bg]
}return true
}function m(bi,bf,bh,be){var bg={src:bi,loadStarted:false,loadComplete:false,type:bf,preLoadCallback:be,postLoadCallback:bh};
return bg
}function p(bf,bn){var be=0;
var bg=600;
var bl=50;
function bo(){for(var bq=0;
bq<bf.length;
bq++){if(!C[bf[bq]].loadComplete){be++;
if(be>bg){be=bg=bl=null;
continue
}setTimeout(bo,bl);
return
}}if(c(bf.callbackList)){var bp;
while(bp=bf.callbackList.shift()){bp()
}}}if(aP(bn)){if(!c(bf.callbackList)){bf.callbackList=[]
}bf.callbackList.push(bn)
}var bm=bf.length;
for(var bh=0;
bh<bm;
bh++){var bi=bf[bh];
var bk=C[bi];
if(bk.loadStarted===false){bk.loadStarted=new Date().getTime();
if(aP(bk.preLoadCallback)){bk.preLoadCallback()
}var bj=(function(bp,bq){return function(bs){bq.loadComplete=new Date().getTime();
var br={name:bp,type:bq.type,lt:(bq.loadComplete-bq.loadStarted)};
if(bs!==x){br.e=bs
}if(bs===x&&aP(bq.postLoadCallback)){return bq.postLoadCallback()
}return true
}
}(bi,bk));
switch(bk.type){case"js":aJ(bk.src,bj);
break;
case"css":M(bk.src,bj);
break;
default:(function(br,bq){var bp=new Image();
bp.onload=function(bs){bp.onload=bp.onerror=bp.onabort=null;
bq()
};
bp.onerror=function(bs){bp.onload=bp.onerror=bp.onabort=null;
bq(br.type==="i"?"e":x)
};
bp.onabort=function(bs){bp.onload=bp.onerror=bp.onabort=null;
bq("a")
};
bp.src=b(br.src)
})(bk,bj)
}}}setTimeout(bo,50)
}function aJ(bf,bg){function be(){var bh=false;
var bj=am.createElement("script");
bj.type="text/javascript";
bj.async=true;
bj.onload=bj.onerror=bj.onabort=bj.onreadystatechange=function(bk){if(bh){bj.onload=bj.onerror=bj.onabort=bj.onreadystatechange=null;
return
}else{if(this.readyState&&this.readyState!=="loaded"&&this.readyState!=="complete"){return
}}bh=true;
bj.onload=bj.onerror=bj.onreadystatechange=null;
if(aP(bg)){if(bk){if(bk.type=="error"){bg("e");
return
}else{if(bk.type==="abort"){bg("a");
return
}}}bg()
}};
bj.src=b(bf);
var bi=am.getElementsByTagName("script")[0];
bi.parentNode.insertBefore(bj,bi)
}if(am.readyState==="complete"||am.readyState==="loaded"){setTimeout(be,0)
}else{L(w,"load",be)
}}function M(bf,bk){var bh=am.createElement("link");
bh.rel="stylesheet";
bh.media="screen";
bh.type="text/css";
bh.href=b(bf);
bh.id="invodo_css_"+Math.random();
if("onload" in bh&&!ae.webkit){if(aP(bk)){bh.onload=function(){bh.onload=null;
if(aP(bk)){bk()
}}
}}else{var bi=0,bj=25,be=3*1000;
(function bg(){try{var bo=am.styleSheets;
for(var bn=0;
bn<bo.length;
bn++){var bm=bo[bn];
var bl=bm.ownerNode?bm.ownerNode:bm.owningElement;
if(bl&&bl.id==bh.id){if(aP(bk)){bk();
return
}}}}catch(bp){}bi+=bj;
if(bi>be){if(aP(bk)){bk("t")
}return
}setTimeout(bg,bj)
})()
}am.getElementsByTagName("head")[0].appendChild(bh)
}function az(bi){var be=131,bh=0;
for(var bf=0,bg=bi.length;
bf<bg;
bf++){bh=(((bh*be)%65535)+bi.charCodeAt(bf))%65535
}return Math.abs(bh%8)
}function aG(be){be.preventDefault();
return false
}function c(be){return be&&ax.call(be)==="[object Array]"
}function a5(be){return be&&ax.call(be)==="[object String]"
}function aP(be){return be&&ax.call(be)==="[object Function]"
}function h(){var bf=new Array();
for(var bg=0;
bg<5;
bg++){bf[bg]=Math.random()*16777216|0
}var bh=new Array();
bh[0]=aQ[bf[0]&3];
for(var be=1;
be<22;
be++){bh[be]=aQ[(bf[0|(be/5)]>>6*(be%4))&63]
}return bh.join("")
}function aB(bg,bf){var be;
if(bg.currentStyle){be=bg.currentStyle[bf]
}else{if(w.getComputedStyle){be=w.getComputedStyle(bg,null).getPropertyValue(bf)
}}return be
}(function(){if(am.readyState==null&&am.addEventListener){am.addEventListener("DOMContentLoaded",function bw(){am.removeEventListener("DOMContentLoaded",bw,false);
am.readyState="complete"
},false);
am.readyState="loading"
}var bf=a7.length,bs=false,br=false,bo={},bj=false,bm=false,be=/^(.*\/)?jquery[^\/]*\.js/i,bu=/https?\:\/\/(?:e([.][^.]+[.])invodo.com|[^\/]+)(:\d*)?(\/[^\/]+)?\/3[.]0\/js\/invodo(-auto)?(-uncompressed)?[.]js(?:\?([^#]*))?/i;
while(bf--&&!bs&&!br){try{if(!bs){if(INVODO_NS.thisScriptSrc.length>1){bs=INVODO_NS.thisScriptSrc.match(bu)
}else{bs=a7[bf].match(bu)
}if(bs){if(!!bs[1]){s=ao+"//e"+bs[1]+"invodo.com";
W=ao+"//log"+bs[1]+"invodo.com"
}s+=((bs[2]?bs[2]:"")+(bs[3]?bs[3]:""));
bs[6].replace(bc,function(bz,by,bA){if(by){if(by==="a"){aF=decodeURIComponent(bA)
}else{if(by==="s"){y=decodeURIComponent(bA)
}else{if(by!=="_"){bj=true;
bo[decodeURIComponent(by)]=decodeURIComponent(bA)
}}}}});
bm=!!bs[4];
af=!!bs[5];
continue
}}if(!ak){br=a7[bf].match(be);
if(br){ak=a7[bf]
}}}catch(bg){r("errorPageLoad",w.top.location.href.toString())
}}if(bm){V.auto(bo)
}else{if(bj){V.init(bo)
}}if(at&&ak&&ak.src){C.jQuery.src=ak.src
}var bq=t("invodoViewer");
if(bq){aA=bq.substring(0,22);
a3=bq.substring(22)||"";
aI("invodoViewer",aA+H)
}else{aA=h();
a3=false;
aI("invodoViewer",aA)
}var bn=t(bd);
if(!bn){J=h();
aI(bd,J,ac)
}else{J=av(bn)
}var bt=b(D,W);
bt+="?id="+H;
if(a3){bt+="&pid="+a3
}bt+="&a="+encodeURIComponent(aF);
if(y){bt+="&sf="+encodeURIComponent(y)
}bt+="&s="+aA;
bt+="&v="+J;
bt+="&ua="+au(ae);
bt+="&page="+encodeURIComponent(w.location);
if(am.referrer&&am.referrer.length>0){bt+="&ref="+encodeURIComponent(am.referrer)
}var bl=2;
(function bk(){var by=new Image();
by.onError=function(){if(bl-->0){setTimeout(bk,500)
}};
by.src=bt
})();
var bv=v;
var bp=0;
while(bp++<a9){var bx=t(bv);
if(!bx){break
}if(bx.indexOf(W)!==0){bx=bx.replace(/^[^:]+:\/\/[^\/]+/,W)
}bx+=("&d="+bp);
(function(bA,by){var bz=new Image();
bz.onload=bz.onerror=function(){bz.onload=bz.onerror=null;
aH(bA)
};
bz.src=by
})(bv,bx);
bv+="_"
}P=setInterval(function(){aV()
},aq);
L(w,"unload",function bi(){try{clearInterval(P);
r("pageUnload");
aV(true);
var bD=ag,bz,bA,by;
for(var bC in bD){bA=bD[bC];
if(bD.hasOwnProperty(bC)&&c(bA)){for(bz=0,by=bA.length;
bz<by;
bz++){bA[bz]=x
}}bD[bC]=[]
}}catch(bB){}try{a1(w,"unload",bi)
}catch(bB){}});
if(!a){(function bh(){var bD=am.readyState==="complete"||am.readyState==="loaded";
try{if(a){return
}var bB=document.getElementsByTagName("link");
for(var bC=0,bF=bB.length;
bC<bF;
bC++){var bE=bB[bC];
if(bE.getAttribute("rel")==="canonical"){a=bE.getAttribute("href");
if(a){var bG=/^(ftp|http|https):/;
if(!bG.test(a)){var by=document.getElementsByTagName("base")[0];
by=(by&&by.href)?by.href:"";
if(by){var bH=by.substring(by.length-1,by.length);
if(bH!="/"){by+="/"
}var bA=a.substring(0,1);
if(bA=="/"){a=a.substring(1,a.length)
}a=by+a
}}r("caSet",{ca:a});
return
}}}}catch(bz){console.log("Error looking for canonical link tag.",bz)
}if(!bD){L(w,"load",bh)
}})()
}})();
ab={resourcePath:S,affiliateKey:aF,viewerConfigs:ba,initCtas:ap,logEvent:r,podViewed:d,frameViewed:aj,frameCompleted:ar,frameMaxTimePlayedHash:aM,buildResourceObject:m,loadResourcesAndExec:p,loadableResources:C,iFixPngResources:ah,resolvePodId:R,canonicalUri:b,versionedJsUri:O,versionedUri:ai,isArray:c,isFunction:aP,isString:a5,getStyle:aB,noop:aG,ua:ae};
function aL(){var bp=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,bq=0,bs=Object.prototype.toString,bk=false,bj=true;
[0,0].sort(function(){bj=false;
return 0
});
var bg=function(bB,bw,bE,bF){bE=bE||[];
var bH=bw=bw||document;
if(bw.nodeType!==1&&bw.nodeType!==9){return[]
}if(!bB||typeof bB!=="string"){return bE
}var bC=[],by,bJ,bM,bx,bA=true,bz=bh(bw),bG=bB;
while((bp.exec(""),by=bp.exec(bG))!==null){bG=by[3];
bC.push(by[1]);
if(by[2]){bx=by[3];
break
}}if(bC.length>1&&bl.exec(bB)){if(bC.length===2&&bm.relative[bC[0]]){bJ=bt(bC[0]+bC[1],bw)
}else{bJ=bm.relative[bC[0]]?[bw]:bg(bC.shift(),bw);
while(bC.length){bB=bC.shift();
if(bm.relative[bB]){bB+=bC.shift()
}bJ=bt(bB,bJ)
}}}else{if(!bF&&bC.length>1&&bw.nodeType===9&&!bz&&bm.match.ID.test(bC[0])&&!bm.match.ID.test(bC[bC.length-1])){var bI=bg.find(bC.shift(),bw,bz);
bw=bI.expr?bg.filter(bI.expr,bI.set)[0]:bI.set[0]
}if(bw){var bI=bF?{expr:bC.pop(),set:bo(bF)}:bg.find(bC.pop(),bC.length===1&&(bC[0]==="~"||bC[0]==="+")&&bw.parentNode?bw.parentNode:bw,bz);
bJ=bI.expr?bg.filter(bI.expr,bI.set):bI.set;
if(bC.length>0){bM=bo(bJ)
}else{bA=false
}while(bC.length){var bL=bC.pop(),bK=bL;
if(!bm.relative[bL]){bL=""
}else{bK=bC.pop()
}if(bK==null){bK=bw
}bm.relative[bL](bM,bK,bz)
}}else{bM=bC=[]
}}if(!bM){bM=bJ
}if(!bM){bg.error(bL||bB)
}if(bs.call(bM)==="[object Array]"){if(!bA){bE.push.apply(bE,bM)
}else{if(bw&&bw.nodeType===1){for(var bD=0;
bM[bD]!=null;
bD++){if(bM[bD]&&(bM[bD]===true||bM[bD].nodeType===1&&bn(bw,bM[bD]))){bE.push(bJ[bD])
}}}else{for(var bD=0;
bM[bD]!=null;
bD++){if(bM[bD]&&bM[bD].nodeType===1){bE.push(bJ[bD])
}}}}}else{bo(bM,bE)
}if(bx){bg(bx,bH,bE,bF);
bg.uniqueSort(bE)
}return bE
};
bg.uniqueSort=function(bx){if(br){bk=bj;
bx.sort(br);
if(bk){for(var bw=1;
bw<bx.length;
bw++){if(bx[bw]===bx[bw-1]){bx.splice(bw--,1)
}}}}return bx
};
bg.matches=function(bw,bx){return bg(bw,null,null,bx)
};
bg.find=function(bD,bw,bE){var bC,bA;
if(!bD){return[]
}for(var bz=0,by=bm.order.length;
bz<by;
bz++){var bB=bm.order[bz],bA;
if((bA=bm.leftMatch[bB].exec(bD))){var bx=bA[1];
bA.splice(1,1);
if(bx.substr(bx.length-1)!=="\\"){bA[1]=(bA[1]||"").replace(/\\/g,"");
bC=bm.find[bB](bA,bw,bE);
if(bC!=null){bD=bD.replace(bm.match[bB],"");
break
}}}}if(!bC){bC=bw.getElementsByTagName("*")
}return{set:bC,expr:bD}
};
bg.filter=function(bH,bG,bK,bA){var by=bH,bM=[],bE=bG,bC,bw,bD=bG&&bG[0]&&bh(bG[0]);
while(bH&&bG.length){for(var bF in bm.filter){if((bC=bm.leftMatch[bF].exec(bH))!=null&&bC[2]){var bx=bm.filter[bF],bL,bJ,bz=bC[1];
bw=false;
bC.splice(1,1);
if(bz.substr(bz.length-1)==="\\"){continue
}if(bE===bM){bM=[]
}if(bm.preFilter[bF]){bC=bm.preFilter[bF](bC,bE,bK,bM,bA,bD);
if(!bC){bw=bL=true
}else{if(bC===true){continue
}}}if(bC){for(var bB=0;
(bJ=bE[bB])!=null;
bB++){if(bJ){bL=bx(bJ,bC,bB,bE);
var bI=bA^!!bL;
if(bK&&bL!=null){if(bI){bw=true
}else{bE[bB]=false
}}else{if(bI){bM.push(bJ);
bw=true
}}}}}if(bL!==x){if(!bK){bE=bM
}bH=bH.replace(bm.match[bF],"");
if(!bw){return[]
}break
}}}if(bH===by){if(bw==null){bg.error(bH)
}else{break
}}by=bH
}return bE
};
bg.error=function(bw){throw"Syntax error, unrecognized expression: "+bw
};
var bm=bg.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(bw){return bw.getAttribute("href")
}},relative:{"+":function(bC,bx){var bz=typeof bx==="string",bB=bz&&!/\W/.test(bx),bD=bz&&!bB;
if(bB){bx=bx.toLowerCase()
}for(var by=0,bw=bC.length,bA;
by<bw;
by++){if((bA=bC[by])){while((bA=bA.previousSibling)&&bA.nodeType!==1){}bC[by]=bD||bA&&bA.nodeName.toLowerCase()===bx?bA||false:bA===bx
}}if(bD){bg.filter(bx,bC,true)
}},">":function(bC,bx){var bA=typeof bx==="string";
if(bA&&!/\W/.test(bx)){bx=bx.toLowerCase();
for(var by=0,bw=bC.length;
by<bw;
by++){var bB=bC[by];
if(bB){var bz=bB.parentNode;
bC[by]=bz.nodeName.toLowerCase()===bx?bz:false
}}}else{for(var by=0,bw=bC.length;
by<bw;
by++){var bB=bC[by];
if(bB){bC[by]=bA?bB.parentNode:bB.parentNode===bx
}}if(bA){bg.filter(bx,bC,true)
}}},"":function(bz,bx,bB){var by=bq++,bw=bu;
if(typeof bx==="string"&&!/\W/.test(bx)){var bA=bx=bx.toLowerCase();
bw=be
}bw("parentNode",bx,by,bz,bA,bB)
},"~":function(bz,bx,bB){var by=bq++,bw=bu;
if(typeof bx==="string"&&!/\W/.test(bx)){var bA=bx=bx.toLowerCase();
bw=be
}bw("previousSibling",bx,by,bz,bA,bB)
}},find:{ID:function(bx,by,bz){if(typeof by.getElementById!=="undefined"&&!bz){var bw=by.getElementById(bx[1]);
return bw?[bw]:[]
}},NAME:function(by,bB){if(typeof bB.getElementsByName!=="undefined"){var bx=[],bA=bB.getElementsByName(by[1]);
for(var bz=0,bw=bA.length;
bz<bw;
bz++){if(bA[bz].getAttribute("name")===by[1]){bx.push(bA[bz])
}}return bx.length===0?null:bx
}},TAG:function(bw,bx){return bx.getElementsByTagName(bw[1])
}},preFilter:{CLASS:function(bz,bx,by,bw,bC,bD){bz=" "+bz[1].replace(/\\/g,"")+" ";
if(bD){return bz
}for(var bA=0,bB;
(bB=bx[bA])!=null;
bA++){if(bB){if(bC^(bB.className&&(" "+bB.className+" ").replace(/[\t\n]/g," ").indexOf(bz)>=0)){if(!by){bw.push(bB)
}}else{if(by){bx[bA]=false
}}}}return false
},ID:function(bw){return bw[1].replace(/\\/g,"")
},TAG:function(bx,bw){return bx[1].toLowerCase()
},CHILD:function(bw){if(bw[1]==="nth"){var bx=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(bw[2]==="even"&&"2n"||bw[2]==="odd"&&"2n+1"||!/\D/.test(bw[2])&&"0n+"+bw[2]||bw[2]);
bw[2]=(bx[1]+(bx[2]||1))-0;
bw[3]=bx[3]-0
}bw[0]=bq++;
return bw
},ATTR:function(bA,bx,by,bw,bB,bC){var bz=bA[1].replace(/\\/g,"");
if(!bC&&bm.attrMap[bz]){bA[1]=bm.attrMap[bz]
}if(bA[2]==="~="){bA[4]=" "+bA[4]+" "
}return bA
},PSEUDO:function(bA,bx,by,bw,bB){if(bA[1]==="not"){if((bp.exec(bA[3])||"").length>1||/^\w/.test(bA[3])){bA[3]=bg(bA[3],null,null,bx)
}else{var bz=bg.filter(bA[3],bx,by,true^bB);
if(!by){bw.push.apply(bw,bz)
}return false
}}else{if(bm.match.POS.test(bA[0])||bm.match.CHILD.test(bA[0])){return true
}}return bA
},POS:function(bw){bw.unshift(true);
return bw
}},filters:{enabled:function(bw){return bw.disabled===false&&bw.type!=="hidden"
},disabled:function(bw){return bw.disabled===true
},checked:function(bw){return bw.checked===true
},selected:function(bw){bw.parentNode.selectedIndex;
return bw.selected===true
},parent:function(bw){return !!bw.firstChild
},empty:function(bw){return !bw.firstChild
},has:function(by,bx,bw){return !!bg(bw[3],by).length
},header:function(bw){return/h\d/i.test(bw.nodeName)
},text:function(bw){return"text"===bw.type
},radio:function(bw){return"radio"===bw.type
},checkbox:function(bw){return"checkbox"===bw.type
},file:function(bw){return"file"===bw.type
},password:function(bw){return"password"===bw.type
},submit:function(bw){return"submit"===bw.type
},image:function(bw){return"image"===bw.type
},reset:function(bw){return"reset"===bw.type
},button:function(bw){return"button"===bw.type||bw.nodeName.toLowerCase()==="button"
},input:function(bw){return/input|select|textarea|button/i.test(bw.nodeName)
}},setFilters:{first:function(bx,bw){return bw===0
},last:function(by,bx,bw,bz){return bx===bz.length-1
},even:function(bx,bw){return bw%2===0
},odd:function(bx,bw){return bw%2===1
},lt:function(by,bx,bw){return bx<bw[3]-0
},gt:function(by,bx,bw){return bx>bw[3]-0
},nth:function(by,bx,bw){return bw[3]-0===bx
},eq:function(by,bx,bw){return bw[3]-0===bx
}},filter:{PSEUDO:function(bC,by,bz,bD){var bx=by[1],bA=bm.filters[bx];
if(bA){return bA(bC,bz,by,bD)
}else{if(bx==="contains"){return(bC.textContent||bC.innerText||bf([bC])||"").indexOf(by[3])>=0
}else{if(bx==="not"){var bB=by[3];
for(var bz=0,bw=bB.length;
bz<bw;
bz++){if(bB[bz]===bC){return false
}}return true
}else{bg.error("Syntax error, unrecognized expression: "+bx)
}}}},CHILD:function(bw,bz){var bC=bz[1],bx=bw;
switch(bC){case"only":case"first":while((bx=bx.previousSibling)){if(bx.nodeType===1){return false
}}if(bC==="first"){return true
}bx=bw;
case"last":while((bx=bx.nextSibling)){if(bx.nodeType===1){return false
}}return true;
case"nth":var by=bz[2],bF=bz[3];
if(by===1&&bF===0){return true
}var bB=bz[0],bE=bw.parentNode;
if(bE&&(bE.sizcache!==bB||!bw.nodeIndex)){var bA=0;
for(bx=bE.firstChild;
bx;
bx=bx.nextSibling){if(bx.nodeType===1){bx.nodeIndex=++bA
}}bE.sizcache=bB
}var bD=bw.nodeIndex-bF;
if(by===0){return bD===0
}else{return(bD%by===0&&bD/by>=0)
}}},ID:function(bx,bw){return bx.nodeType===1&&bx.getAttribute("id")===bw
},TAG:function(bx,bw){return(bw==="*"&&bx.nodeType===1)||bx.nodeName.toLowerCase()===bw
},CLASS:function(bx,bw){return(" "+(bx.className||bx.getAttribute("class"))+" ").indexOf(bw)>-1
},ATTR:function(bB,bz){var by=bz[1],bw=bm.attrHandle[by]?bm.attrHandle[by](bB):bB[by]!=null?bB[by]:bB.getAttribute(by),bC=bw+"",bA=bz[2],bx=bz[4];
return bw==null?bA==="!=":bA==="="?bC===bx:bA==="*="?bC.indexOf(bx)>=0:bA==="~="?(" "+bC+" ").indexOf(bx)>=0:!bx?bC&&bw!==false:bA==="!="?bC!==bx:bA==="^="?bC.indexOf(bx)===0:bA==="$="?bC.substr(bC.length-bx.length)===bx:bA==="|="?bC===bx||bC.substr(0,bx.length+1)===bx+"-":false
},POS:function(bA,bx,by,bB){var bw=bx[2],bz=bm.setFilters[bw];
if(bz){return bz(bA,by,bx,bB)
}}}};
var bl=bm.match.POS;
for(var bi in bm.match){bm.match[bi]=new RegExp(bm.match[bi].source+/(?![^\[]*\])(?![^\(]*\))/.source);
bm.leftMatch[bi]=new RegExp(/(^(?:.|\r|\n)*?)/.source+bm.match[bi].source.replace(/\\(\d+)/g,function(bx,bw){return"\\"+(bw-0+1)
}))
}var bo=function(bx,bw){bx=Array.prototype.slice.call(bx,0);
if(bw){bw.push.apply(bw,bx);
return bw
}return bx
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType
}catch(bv){bo=function(bA,bz){var bx=bz||[];
if(bs.call(bA)==="[object Array]"){Array.prototype.push.apply(bx,bA)
}else{if(typeof bA.length==="number"){for(var by=0,bw=bA.length;
by<bw;
by++){bx.push(bA[by])
}}else{for(var by=0;
bA[by];
by++){bx.push(bA[by])
}}}return bx
}
}var br;
if(document.documentElement.compareDocumentPosition){br=function(bx,bw){if(!bx.compareDocumentPosition||!bw.compareDocumentPosition){if(bx==bw){bk=true
}return bx.compareDocumentPosition?-1:1
}var by=bx.compareDocumentPosition(bw)&4?-1:bx===bw?0:1;
if(by===0){bk=true
}return by
}
}else{if("sourceIndex" in document.documentElement){br=function(bx,bw){if(!bx.sourceIndex||!bw.sourceIndex){if(bx==bw){bk=true
}return bx.sourceIndex?-1:1
}var by=bx.sourceIndex-bw.sourceIndex;
if(by===0){bk=true
}return by
}
}else{if(document.createRange){br=function(bz,bx){if(!bz.ownerDocument||!bx.ownerDocument){if(bz==bx){bk=true
}return bz.ownerDocument?-1:1
}var by=bz.ownerDocument.createRange(),bw=bx.ownerDocument.createRange();
by.setStart(bz,0);
by.setEnd(bz,0);
bw.setStart(bx,0);
bw.setEnd(bx,0);
var bA=by.compareBoundaryPoints(Range.START_TO_END,bw);
if(bA===0){bk=true
}return bA
}
}}}function bf(bw){var bx="",bz;
for(var by=0;
bw[by];
by++){bz=bw[by];
if(bz.nodeType===3||bz.nodeType===4){bx+=bz.nodeValue
}else{if(bz.nodeType!==8){bx+=bf(bz.childNodes)
}}}return bx
}(function(){var bx=document.createElement("div"),by="script"+(new Date).getTime();
bx.innerHTML="<a name='"+by+"'/>";
var bw=document.documentElement;
bw.insertBefore(bx,bw.firstChild);
if(document.getElementById(by)){bm.find.ID=function(bA,bB,bC){if(typeof bB.getElementById!=="undefined"&&!bC){var bz=bB.getElementById(bA[1]);
return bz?bz.id===bA[1]||typeof bz.getAttributeNode!=="undefined"&&bz.getAttributeNode("id").nodeValue===bA[1]?[bz]:x:[]
}};
bm.filter.ID=function(bB,bz){var bA=typeof bB.getAttributeNode!=="undefined"&&bB.getAttributeNode("id");
return bB.nodeType===1&&bA&&bA.nodeValue===bz
}
}bw.removeChild(bx);
bw=bx=null
})();
(function(){var bw=document.createElement("div");
bw.appendChild(document.createComment(""));
if(bw.getElementsByTagName("*").length>0){bm.find.TAG=function(bx,bB){var bA=bB.getElementsByTagName(bx[1]);
if(bx[1]==="*"){var bz=[];
for(var by=0;
bA[by];
by++){if(bA[by].nodeType===1){bz.push(bA[by])
}}bA=bz
}return bA
}
}bw.innerHTML="<a href='#'></a>";
if(bw.firstChild&&typeof bw.firstChild.getAttribute!=="undefined"&&bw.firstChild.getAttribute("href")!=="#"){bm.attrHandle.href=function(bx){return bx.getAttribute("href",2)
}
}bw=null
})();
if(document.querySelectorAll){(function(){var bw=bg,by=document.createElement("div");
by.innerHTML="<p class='TEST'></p>";
if(by.querySelectorAll&&by.querySelectorAll(".TEST").length===0){return
}bg=function(bC,bB,bz,bA){bB=bB||document;
if(!bA&&bB.nodeType===9&&!bh(bB)){try{return bo(bB.querySelectorAll(bC),bz)
}catch(bD){}}return bw(bC,bB,bz,bA)
};
for(var bx in bw){bg[bx]=bw[bx]
}by=null
})()
}(function(){var bw=document.createElement("div");
bw.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!bw.getElementsByClassName||bw.getElementsByClassName("e").length===0){return
}bw.lastChild.className="e";
if(bw.getElementsByClassName("e").length===1){return
}bm.order.splice(1,0,"CLASS");
bm.find.CLASS=function(bx,by,bz){if(typeof by.getElementsByClassName!=="undefined"&&!bz){return by.getElementsByClassName(bx[1])
}};
bw=null
})();
function be(bx,bC,bB,bF,bD,bE){for(var bz=0,by=bF.length;
bz<by;
bz++){var bw=bF[bz];
if(bw){bw=bw[bx];
var bA=false;
while(bw){if(bw.sizcache===bB){bA=bF[bw.sizset];
break
}if(bw.nodeType===1&&!bE){bw.sizcache=bB;
bw.sizset=bz
}if(bw.nodeName.toLowerCase()===bC){bA=bw;
break
}bw=bw[bx]
}bF[bz]=bA
}}}function bu(bx,bC,bB,bF,bD,bE){for(var bz=0,by=bF.length;
bz<by;
bz++){var bw=bF[bz];
if(bw){bw=bw[bx];
var bA=false;
while(bw){if(bw.sizcache===bB){bA=bF[bw.sizset];
break
}if(bw.nodeType===1){if(!bE){bw.sizcache=bB;
bw.sizset=bz
}if(typeof bC!=="string"){if(bw===bC){bA=true;
break
}}else{if(bg.filter(bC,[bw]).length>0){bA=bw;
break
}}}bw=bw[bx]
}bF[bz]=bA
}}}var bn=document.compareDocumentPosition?function(bx,bw){return !!(bx.compareDocumentPosition(bw)&16)
}:function(bx,bw){return bx!==bw&&(bx.contains?bx.contains(bw):true)
};
var bh=function(bw){var bx=(bw?bw.ownerDocument||bw:0).documentElement;
return bx?bx.nodeName!=="HTML":false
};
var bt=function(bw,bD){var bz=[],bA="",bB,by=bD.nodeType?[bD]:bD;
while((bB=bm.match.PSEUDO.exec(bw))){bA+=bB[0];
bw=bw.replace(bm.match.PSEUDO,"")
}bw=bm.relative[bw]?bw+"*":bw;
for(var bC=0,bx=by.length;
bC<bx;
bC++){bg(bw,by[bC],bz)
}return bg.filter(bA,bz)
};
return bg
}})(window);