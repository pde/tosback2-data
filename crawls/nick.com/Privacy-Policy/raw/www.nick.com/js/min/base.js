if(typeof KIDS=="undefined"||!KIDS){var KIDS={}
}KIDS.IS_DEV=(window.location.hostname.indexOf("localhost")>=0||window.location.hostname.indexOf("d.mtvi.com")>0||window.location.port==9090);
KIDS.IS_QA=window.location.hostname.indexOf("q.mtvi.com")>0;
KIDS.IS_DEV_ENV=KIDS.IS_DEV||KIDS.IS_QA;
KIDS.IS_LIVE=!KIDS.IS_DEV_ENV;
KIDS.IS_DEBUG=KIDS.IS_DEV_ENV&&window&&typeof window.console!=="undefined";
KIDS.namespace=function(e,c){c=c==null?KIDS:c;
var b=e,k=null,g,f,h;
h=e.split(".");
k=c;
for(f=(h[0]==c)?1:0;
f<h.length;
f++){k[h[f]]=k[h[f]]||{};
k=k[h[f]]
}return k
};
KIDS.namespace("utils",KIDS);
KIDS.utils.URL_DEV_NICK="www.nick-d.mtvi.com";
KIDS.utils.URL_QA_NICK="www.nick-q.mtvi.com";
KIDS.utils.URL_LIVE_NICK="www.nick.com";
KIDS.utils.URL_DEV_NICK_GAMES="games.nick-d.mtvi.com";
KIDS.utils.URL_QA_NICK_GAMES="games.nick-q.mtvi.com";
KIDS.utils.URL_LIVE_NICK_GAMES="games.nick.com";
KIDS.utils.isEmptyString=function(a){return a==null||a==undefined||a==""||a==="undefined"||a=="null"
};
KIDS.utils.trim=function(a){return a==null?"":a.replace(/^\s+|\s+$/g,"")
};
KIDS.utils.isValidEmail=function(b){if(KIDS.utils.isEmptyString(b)){return false
}var a=/^([a-z0-9_\-\.%])+\@([A-Za-z0-9_\-\.])+\.([a-z]{2,4})$/i;
return a.test(b)
};
KIDS.utils.getCookie=function(c){if(KIDS.utils.isEmptyString(c)){return null
}var a=document.cookie.toString();
if(a.length>0){var d=a.indexOf(c+"=");
if(d!=-1){d+=c.length+1;
var b=a.indexOf(";",d);
if(b==-1){b=a.length
}return unescape(a.substring(d,b))
}}return null
};
KIDS.utils.getDomain=function(){return window.location.hostname
};
KIDS.utils.getNickDomain=function(){if(KIDS.IS_LIVE){return KIDS.utils.URL_LIVE_NICK
}else{if(KIDS.IS_QA){return KIDS.utils.URL_QA_NICK
}else{return KIDS.utils.URL_DEV_NICK
}}};
KIDS.utils.getNickGamesDomain=function(){if(KIDS.IS_LIVE){return KIDS.utils.URL_LIVE_NICK_GAMES
}else{if(KIDS.IS_QA){return KIDS.utils.URL_QA_NICK_GAMES
}else{return KIDS.utils.URL_DEV_NICK_GAMES
}}};
KIDS.utils.getQueryString=function(c){if(c==null){return""
}var a="";
for(var b in c){if(!b||!c[b]){continue
}if(a!=""){a+="&"
}a+=b+"="+escape(c[b])
}return a
};
KIDS.utils.getGdcXml=function(d,c){var b='<answers collectionID="'+d+'">';
for(var a in c){b+='<answer tag="'+a+'"><![CDATA['+c[a]+"]]></answer>"
}b+="</answers>";
return b
};
KIDS.utils.doSwfLog=function(a){NickLog.debug("[SWF] "+a)
};
KIDS.utils.getSwf=function(a){if(navigator.appName.indexOf("Microsoft")!=-1){return window[a]
}else{if(document[a]!=null&&document[a].length!=undefined){return document[a][1]
}return document[a]
}};
KIDS.utils.trimArray=function(a,c){if(a==null){return null
}for(var b=0;
b<a.length;
b++){a[b]=c?a[b].toLowerCase():a[b];
a[b]=KIDS.utils.trim(a[b])
}return a
};
KIDS.utils.getParameter=function(b){var d=document.location.search;
if(KIDS.utils.isEmptyString(d)){return null
}d=d.substring(1);
d=d.split("&");
var a=null;
for(var c=0;
c<d.length;
c++){a=d[c].split("=");
if(a!=null&&a[0]==b){return a[1]
}}return null
};
KIDS.utils.getUrlParts=function(b){var a=b.replace("//","/").split("/");
return a
};
KIDS.utils.getUrlPath=function(c){var b=KIDS.utils.getUrlParts(c);
var d;
if(c.indexOf("http://")>-1){d=b.splice(0,2).join("/")
}var a=b.join("/");
return a
};
KIDS.utils.getContextPath=function(a,b,e,f){var d=getUrlPath(a);
if(e&&d.lastIndexOf(".")>=0){d=d.substring(0,d.lastIndexOf("."))
}b=b==null||b==""?"":b;
var c=new RegExp("^"+b+"/","i");
d=d.replace(c,"");
if(f){d=d.replace(/\/index$/i,"")
}d=d.replace(/\/$/,"");
if(d.indexOf("/")>=0){d=d.replace(/\/$/,"")
}if(d==""){d="hub"
}d=b+"_"+d;
return d
};
KIDS.properties=null;
KIDS.add=function(a,b){if(a==null||a==""){return
}if(KIDS.properties==null){KIDS.properties={}
}KIDS.properties[a]=b
};
KIDS.get=function(a){if(a==null||a==""){return null
}if(KIDS.properties==null){return null
}return KIDS.properties[a]
};
KIDS.utils.printObj=function(c){if(!c){NickLog.debug(">PrintObj: ["+c+"] -"+typeof(c))
}NickLog.debug(">PrintObj: type: "+typeof(c));
if(typeof(c)!="object"){return
}for(var b in c){try{NickLog.debug(">PrintObj: key: "+b+" | "+c[b])
}catch(a){NickLog.debug(">PrintObj: error: "+b+" | "+a)
}}};
KIDS.utils.doLog=function(a){NickLog.debug(a,false,arguments)
};
KIDS.utils.isNumeric=function(c){var b=true;
try{b=!isNaN(parseFloat(c))&&isFinite(c)
}catch(a){b=false
}return b
};
KIDS.utils.parseInt=function(c){var a=-1;
try{a=!isNaN(parseInt(c))&&isFinite(c)?parseFloat(c):-1
}catch(b){a=-1
}return a
};
KIDS.utils.parseFloat=function(c){var a=-1;
try{a=!isNaN(parseFloat(c))&&isFinite(c)?parseFloat(c):-1
}catch(b){a=-1
}return a
};
KIDS.utils.openBumper=function(a,e,h,b,g,f,d,c){NickLog.warn("openBumper: site specific override missing!");
window.open(e)
};
KIDS.utils.isIpad=function(){if(typeof ESI==="undefined"||!ESI||ESI.os==null){return false
}return ESI.os.toLowerCase()==="ipad"
};
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.namespace=function(a){KIDS.namespace(a,NICK)
};
NICK.namespace("utils",NICK);
NICK.utils.isEmptyString=KIDS.utils.isEmptyString;
NICK.utils.trim=KIDS.utils.trim;
NICK.utils.getCookie=KIDS.utils.getCookie;
NICK.utils.getDomain=KIDS.utils.getDomain;
NICK.utils.printObj=KIDS.utils.printObj;
NICK.utils.getQueryString=KIDS.utils.getQueryString;
NICK.utils.getGdcXml=KIDS.utils.getGdcXml;
NICK.utils.getSwf=KIDS.utils.getSwf;
NICK.utils.thisMovie=KIDS.utils.getSwf;
NICK.utils.trimArray=KIDS.utils.trimArray;
NICK.utils.getUrlParts=KIDS.utils.getUrlParts;
NICK.utils.getUrlPath=KIDS.utils.getUrlPath;
NICK.utils.getContextPath=KIDS.utils.getContextPath;
NICK.add=KIDS.add;
NICK.get=KIDS.get;
NICK.utils.getNickDomain=KIDS.utils.getNickDomain;
NICK.IS_DEV=KIDS.IS_DEV;
NICK.IS_QA=KIDS.IS_QA;
NICK.IS_DEV_ENV=KIDS.IS_DEV_ENV;
NICK.IS_LIVE=KIDS.IS_LIVE;
NICK.IS_DEBUG=NICK.IS_DEV_ENV&&window&&typeof window.console!="undefined";
NICK.utils.URL_DEV_NICK=KIDS.utils.URL_DEV_NICK;
NICK.utils.URL_QA_NICK=KIDS.utils.URL_QA_NICK;
NICK.utils.URL_LIVE_NICK=KIDS.utils.URL_LIVE_NICK;
NICK.utils.URL_SPRING_NICK="spring.nick.com";
NICK.utils.URL_MTVN_D="nick.mtvnimages-d.mtvi.com";
NICK.utils.URL_MTVN_Q="nick.mtvnimages-q.mtvi.com";
NICK.utils.URL_MTVN_L="nick.mtvnimages.com";
NICK.utils.URL_MTVN=null;
NICK.utils.initMtvnImageUrl=function(){var a=document.location.href;
var b=NICK.utils.getUrlParts(a);
if(b[1]=="localhost:9090"){b[1]=NICK.utils.URL_DEV_NICK
}switch(b[1]){case NICK.utils.URL_DEV_NICK:NICK.utils.URL_MTVN=NICK.utils.URL_MTVN_D;
break;
case NICK.utils.URL_QA_NICK:NICK.utils.URL_MTVN=NICK.utils.URL_MTVN_Q;
break;
default:NICK.utils.URL_MTVN=NICK.utils.URL_MTVN_L
}};
NICK.utils.getImage=function(b,c,a){c=c||null;
a=a||null;
return NICK.utils.getMtvnImageUrl(b,c,a)
};
NICK.utils.getMtvnImageUrl=function(d,b,a){if(NICK.utils.isEmptyString(NICK.utils.URL_MTVN)){NICK.utils.initMtvnImageUrl()
}var c=NICK.utils.getUrlPath(d);
c=c!=null&&c.indexOf("/")==0?c:"/"+c;
if(b){c+="?height="+b
}if(a&&!b){c+="?"
}else{if(a){c+="&"
}}if(a){c+="width="+a
}return"http://"+NICK.utils.URL_MTVN+c
};
NICK.utils.getStageDomain=function(){if(KIDS.IS_LIVE){return".com"
}if(KIDS.IS_QA){return"-q.mtvi.com"
}if(KIDS.IS_DEV){return"-d.mtvi.com"
}};
NICK.utils.getStageString=function(b,c,a){if(KIDS.IS_LIVE){return a
}if(KIDS.IS_QA){return c
}if(KIDS.IS_DEV){return b
}};
NICK.utils.doLog=function(a){NickLog.debug(a,false,arguments)
};
NICK.utils.getUsername=function(){return NICK.utils.getCookie("loggedInScreenName")
};
getUsername=NICK.utils.getUsername;
NICK.utils.getSessionId=function(){return NICK.utils.getCookie("JSESSIONID")
};
getSessionId=NICK.utils.getSessionId;
NICK.utils.hideElement=function(a){if(!a||!$(a)){return
}$(a).setStyle("visibility","hidden")
};
NICK.utils.showElement=function(a){if(!a||!$(a)){return
}$(a).setStyle("visibility","visible");
if($(a).getStyle("display")=="none"){$(a).setStyle("display","block")
}};
NICK.utils.toggleButton=function(b,a){if(!$(b)){return
}$(b).set("disabled",!a)
};
NICK.utils.validateDivIds=function(){if(!NICK.IS_DEBUG){return
}var d=new Object();
var b=document.getElementsByTagName("div");
for(var a=0;
a<b.length;
a++){if(b[a].id==null||b[a].id==""||b[a].id=="FLASH_AD"){continue
}if(d[b[a].id]!=null){NickLog.warn("Duplicate element ID found: ["+b[a].id+"]")
}d[b[a].id]=b[a].id
}var c=document.getElementsByTagName("object");
for(var a=0;
a<c.length;
a++){if(c[a].id==null||c[a].id==""||c[a].id=="FLASH_AD"){continue
}if(d[c[a].id]!=null){NickLog.warn("Duplicate element ID found: ["+c[a].id+"]")
}d[c[a].id]=c[a].id
}};
NICK.utils.doBookmark=function(){var b="Nick.com";
var a="http://www.nick.com";
if(document.all){window.external.AddFavorite(a,b)
}else{if(window.sidebar){window.sidebar.addPanel(b,a,"")
}else{if(window.sidebar&&window.sidebar.addPanel){window.sidebar.addPanel(b,a,"")
}}}};
NICK.utils.initTooltip=function(){$(".with-nick-tooltip").unbind("mouseenter").unbind("mouseleave");
$(".with-nick-tooltip").tooltip({contentSelector:".tooltip-content",id:"nick-tooltip",allowAccess:false,followMouse:true,lockTo:"side",lockToElement:"img:first",offsetX:-13})
};
NICK.utils.addTooltip=function(){};
NICK.utils.openNewBumper=function(a,b){NICK.utils.openBumper(a,b,null,null,null,true)
};
NICK.utils.openBumper=function(h,d,c,f,l,j,m,k){var i="http://www.nick.com/common/bumpers/bumperFrameset.jhtml?";
if(NICK.config.SITE_NAME=="nicktoons"){var e="http://www.nick.com/common/bumpers/fullpage/nicktoons.jhtml?"
}else{if(NICK.config.SITE_NAME=="nickatnite"){var e="http://www.nick.com/common/bumpers/fullpage/nickatnite.jhtml?"
}else{if(NICK.config.SITE_NAME=="teennick"){var e="http://www.teennick.com/common/bumpers/fullpage/teennick.html?"
}else{var e="http://www.nick.com/common/bumpers/fullpage/index.jhtml?"
}}}var b="wBumper";
var a="advertiser";
c=c!=null&&c;
m=m==undefined?true:m;
switch(h){case"external":i="http://www.nick.com/common/bumpers/go.jhtml?";
i+=f==null?"":("bumper="+escape(f)+"&");
i+=l==null?"":("bumperHeight="+l+"&");
i+=m==undefined?"":("isInHouse="+m+"&");
a="destination";
break;
case"fullPage":i=e;
a="destination";
break;
case"paysite":break;
case"grown-ups":break;
case"launchpad":break;
case"ag":break;
case"sponsor":break;
case"full-redirect":i="/utils/bumper/half-page.html?";
break;
default:h="sponsor";
break
}var g=i+b+"="+h+"&"+a+"="+escape(d);
if(c){g+="&onair_landing=true"
}if(c&&h=="external"){g=e+a+"="+escape(g)
}if(j){window.open(g,"bumper","status=1,scrollbars=1,location=1,resizable=1,toolbar=1,menubar=1")
}else{window.location.href=g
}};
NICK.utils.wrapOPABanner=function(){};
NICK.utils.displayScreenShot=function(){};
KIDS.utils.openBumper=NICK.utils.openBumper;
NICK.utils.hideSwfs=function(a){if(a){a=a+" "
}else{a=""
}$(a+".swf").not(".swfnohide").find("> *").each(function(){obj=$(this);
obj.css("visibility","hidden")
})
};
NICK.utils.showSwfs=function(a){if(a){a=a+" "
}else{a=""
}$(a+".swf > *").each(function(){obj=$(this);
obj.css("visibility","visible")
})
};
NICK.utils.initComcast=function(){if(typeof projX==="undefined"||!projX){NICK.utils.doLog("NICK.utils.initComcast: projX not found");
return
}NICK.utils.doLog("NICK.utils.initComcast:3: overriding functions");
projX.displayEventPre=function(){NICK.utils.doLog("NICK.utils.initComcast: hide swfs");
NICK.utils.hideSwfs();
return true
};
projX.closeEvent=function(){NICK.utils.doLog("NICK.utils.initComcast: close overlay");
NICK.utils.showSwfs()
}
};
doSwfEmbedCompleteNick=function(a){if(a==null||a.id=="GamePlayer"){return
}var b=document.getElementById("projxalert");
if(b==null||b.style.display=="none"){return
}KIDS.utils.doLog("doSwfObjectEmbed (nick override): alert found: hiding swfs");
NICK.utils.hideSwfs()
};
NICK.utils.openOverlay=function(){NICK.utils.doLog("NICK.utils.openOverlay(): Deprecated. Use: NICK.overlay.open().")
};
NICK.utils.closeOverlay=function(){NICK.utils.doLog("NICK.utils.closeOverlay(): Deprecated. Use: NICK.overlay.close().")
};
NICK.utils.initAdFreePage=function(){if(KIDS.get("adfree")!=="true"){return
}$("a").not(".nick-overlay").not(".no-adfree").not(".o_popup_close").not("[href^=javascript]").bind("click",NICK.utils.doBumperOverride);
$(".brand-mamabar-more-list .bumper").remove()
};
NICK.utils.initAdFreeLinks=function(){NICK.utils.initAdFreePage();
$("#top-menu a").bind("click",NICK.utils.doBumperOverride);
$("#page-menu a").bind("click",NICK.utils.doBumperOverride);
$("#submenu-wrapper a").bind("click",NICK.utils.doBumperOverride);
if($(".nick-footer-siteblock")){$(".nick-footer-siteblock a").bind("click",NICK.utils.doBumperOverrideNewWin);
$(".nick-footer-text a").bind("click",NICK.utils.doBumperOverride);
$(".nick-footer-menu a").bind("click",NICK.utils.doBumperOverride)
}$("#carousel-more-games-carousel a").live("click",NICK.utils.doBumperOverride);
$(".UserCommentCollection a").live("click",NICK.utils.doBumperOverride)
};
NICK.utils.initExternalLinks=function(){if($.browser.msie&&$.browser.version==="7.0"){$("a[href^='http']").each(function(){var a=$(this);
if(a.attr("href").indexOf(window.location.hostname)===-1){a.attr("target","_blank")
}})
}else{$("a[href^='http']").attr("target","_blank")
}};
NICK.utils.initAGLinks=function(){$("a[href^='http://www.addictinggames.com']").bind("click",NICK.utils.doAGBumperOverride)
};
NICK.utils.doAGBumperOverride=function(a){NICK.utils.openBumper("ag",this.href,null,null,null,true);
return false
};
NICK.utils.doBumperOverride=function(a){NICK.utils.openBumper("fullPage",this.href,null,null,null,false);
return false
};
NICK.utils.doBumperOverrideNewWin=function(a){NICK.utils.openBumper("fullPage",this.href,null,null,null,true);
return false
};
NICK.utils.random=function(a){return Math.floor(a*(Math.random()%1))
};
NICK.utils.randomBetween=function(b,a){return b+NICK.utils.random(a-b+1)
};
NICK.utils.getNoRepeatRandoms=function(d,c){var b=new Array();
var d=Math.min(d,c);
while(b.length<d){var f=NICK.utils.randomBetween(0,c);
var e=false;
for(var a=0;
a<b.length;
a++){if(b[a]==f){e=true
}}if(e==false){b.push(f)
}}return b
};
NICK.utils.timezone=function(){var i=new Date();
var b=new Date(i.getFullYear(),0,1,0,0,0,0);
var g=new Date(i.getFullYear(),6,1,0,0,0,0);
var h=b.toGMTString();
var j=new Date(h.substring(0,h.lastIndexOf(" ")-1));
h=g.toGMTString();
var f=new Date(h.substring(0,h.lastIndexOf(" ")-1));
var e=(b-j)/(1000*60*60);
var d=(g-f)/(1000*60*60);
var c;
if(e==d){c="0"
}else{var a=e-d;
if(a>=0){e=d
}c="1"
}return e
};
NICK.utils.getTimezone=function(){if(NICK.utils.timezone()==-8){return"west"
}else{return"east"
}};
NICK.utils.getTimezoneKCA=function(){return"east"
};
NICK.utils.goMyNick=function(a){if(KIDS.get("adfree")==="true"){NICK.utils.openBumper("fullPage",a,null,null,null,false)
}else{document.location.href=a
}};
NICK.utils.setCookie=function(a,b){this.setCookie2(a,b,"","","","")
};
NICK.utils.setCookie2=function(c,e,a,g,d,f){var b=c+"="+escape(e)+((a)?"; expires="+a.toGMTString():"")+((g)?"; path="+g:"")+((d)?"; domain="+d:"")+((f)?"; secure":"");
document.cookie=b
};
NICK.utils.getUUID=function(){var a=NICK.utils.getCookie("NICK_UUID");
if(a==null){a=NICK.utils.generateUUID();
NICK.utils.setCookie2("NICK_UUID",a,new Date((new Date).getTime()+(1000*60*60*24*365)))
}return a
};
NICK.utils.generateUUID=function(a,d){var f="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),c=[],b;
d=d||f.length;
if(a){for(b=0;
b<a;
b++){c[b]=f[0|Math.random()*d]
}}else{var e;
c[8]=c[13]=c[18]=c[23]="-";
c[14]="4";
for(b=0;
b<36;
b++){if(!c[b]){e=0|Math.random()*16;
c[b]=f[(b==19)?(e&3)|8:e]
}}}return c.join("")
};
NICK.utils.containsSpaces=function(a){return(a.search(/\s/g)!==-1)?true:false
};
NICK.utils.relativeDate=function(c){var b=c;
if(typeof c==="string"){c=new Date(c)
}if(isNaN(c.getTime())===true){return b
}var h={suffixPast:"ago",suffixFuture:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years"};
var a=c.getTime()-new Date().getTime();
var j=a<=0?h.suffixPast:h.suffixFuture;
a=Math.abs(a);
var g=a/1000;
var d=g/60;
var f=d/60;
var i=f/24;
var e=i/365;
if(g<45){b=h.seconds
}else{if(g<90){b=h.minute
}else{if(d<45){b=h.minutes;
b=b.replace(/%d/i,Math.round(d))
}else{if(d<90){b=h.hour
}else{if(f<24){b=h.hours;
b=b.replace(/%d/i,Math.round(f))
}else{if(f<48){b=h.day
}else{if(i<30){b=h.days;
b=b.replace(/%d/i,Math.floor(i))
}else{if(i<60){b=h.month
}else{if(i<365){b=h.months;
b=b.replace(/%d/i,Math.floor(i/30))
}else{if(e<2){b=h.year
}else{b=h.years;
b=b.replace(/%d/i,Math.floor(e))
}}}}}}}}}}return b+" "+j
};
NICK.utils.addCommas=function(c){var d=Number(c).toString();
var e="";
if(d.indexOf(".")!==-1){var b=d.split(".");
if(b.length===2){e="."+b[1];
d=d.replace(e,"")
}}var a=/(\d+)(\d{3})/;
while(a.test(d)){d=d.replace(a,"$1,$2")
}return d+e
};
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.namespace("config");
NICK.config.URL_COMMENT_POST="http://"+NICK.utils.getNickDomain()+"/xml/gdc_json.jhtml";
NICK.config.IMX_RATE="/api/ratings/1.0/rate";
NICK.config.IMX_PUT="/api/imx/1.0/put";
NICK.config.IMX_VIEW_COUNT="/api/imx/1.0/report";
NICK.config.SITE_NAME="nick";
NICK.config.CHANNEL_ID="11";
NICK.config.SID_PREPEND="Nick__";
var NICK_LOG_ERROR=0;
var NICK_LOG_WARNING=2;
var NICK_LOG_DEBUG=4;
var NICK_LOG_INFO=8;
var NICK_LOG_FATAL=22;
var NickLog=function(){var f=KIDS&&(KIDS.IS_DEBUG||KIDS.utils.getParameter("_log")=="on");
var d=f&&typeof window.console.log!="undefined";
var a=f&&!!window.console.firebug;
var b=f&&console.log.apply==="function";
function e(h){var g=h.callee.caller;
var i=[];
while(g!=null){var j=g.name||c(g.toString());
if(j.length!==0){i.push(j)
}g=g.caller
}return"["+i.reverse().join(" -> ")+"]"
}function c(g){var h=/function\s*([\w\-$]+)?\s*\(/i;
return h.test(g)?RegExp.$1:""
}return{addMessage:function(j,i,g,h){if(!f){return
}if(a){var k;
switch(i){case NICK_LOG_FATAL:j="[FATAL]: "+j;
case NICK_LOG_ERROR:k="error";
break;
case NICK_LOG_WARNING:k="warn";
break;
case NICK_LOG_INFO:k="info";
break;
default:k="log"
}console[k](j+"\t%o",h.callee.caller);
if(g===true){console.trace()
}}else{if(d){if(b){window.console.log.apply(window.console,arguments)
}else{console.log(j)
}}}if(g===true&&!b&&!a){console.log("Stack: "+e(h))
}},debug:function(i,g,h){this.addMessage(i,NICK_LOG_DEBUG,g,h||arguments)
},warn:function(g){this.addMessage(g,NICK_LOG_WARNING,false,arguments)
},error:function(g){this.addMessage(g,NICK_LOG_ERROR,false,arguments)
},info:function(g){this.addMessage(g,NICK_LOG_INFO,false,arguments)
},fatal:function(g){this.addMessage(g,NICK_LOG_FATAL,false,arguments)
}}
}();
var NickEvents=function(){var a={};
return{bind:function(b,c){$(document).bind(b,c);
NickLog.info('Bound new method to "'+b+'".')
},trigger:function(b,c){if(a[b]){$(document).trigger(b,c);
a[b].calls++;
NickLog.info('Triggered "'+b+'". ('+a[b].calls+")")
}else{NickLog.warn('Attempting to trigger "'+b+'" when no method has been bound.')
}}}
}();
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.request={lstnrs:{},defaults:{type:"GET",url:null,data:null,dataType:"jsonp",async:true,onSuccess:null,cache:false,onFail:null},messages:{INVALID_RESPONSE:"Invalid reponse",INVALID_URL:"Invalid url requested"},errors:{SERVER:"_ERROR_SERVER",REQUEST:"_ERROR_REQUEST",RESPONSE:"_ERROR_RESPONSE",URL:"_ERROR_URL"},codes:{RESPONSE_OK:"ok",RESPONSE_ERROR:"error"},doRequest:function(a){var b=new NICK.request.NickRequest(a);
b.doRequest()
}};
NICK.request.NickRequest=function(a){this.settings=$.extend({},NICK.request.defaults,a)
};
NICK.request.NickRequest.prototype.sanitizeUrlData=function(){var e=this.settings.url.indexOf("?");
if(e<=0){return
}var d=this.settings.url.substring(e+1);
var c=d.split("&");
var b=null;
for(var a=0;
a<c.length;
a++){b=c[a].split("=");
if(b==null||b[0]==null||b[1]==null){continue
}this.settings.data[b[0]]=b[1]
}this.settings.url=this.settings.url.substring(0,e)
};
NICK.request.NickRequest.prototype.doRequest=function(){this.settings.data=this.settings.data==null?{}:this.settings.data;
if(this.settings.url==null){this.onFail(this.getError(NICK.request.errors.URL,NICK.request.messages.INVALID_URL));
return
}this.sanitizeUrlData();
if(this.settings.dataType=="jsonp"){this.initJsonpHandler()
}else{var b=this;
this.settings.success=function(c){b.doResponse.apply(b,arguments)
};
this.settings.error=function(c){b.doRequestError.apply(b,arguments)
}
}try{$.ajax(this.settings)
}catch(a){NickLog.error("NickRequest: error: "+a);
this.onFail({_ERROR_SERVER:a})
}};
NICK.request.NickRequest.prototype.initJsonpHandler=function(){var b=this;
var a=this.getJsonpKey();
this.settings.jsonpCallback='NICK.request.lstnrs["'+a+'"]';
NICK.request.lstnrs[a]=function(c){this.callback=b;
this.callback.doResponse(c);
NICK.request.lstnrs[a]=undefined;
try{delete NICK.request.lstnrs[a]
}catch(d){}}
};
NICK.request.NickRequest.prototype.getJsonpKey=function(){var a=this.settings.url.replace("http://","");
a=a.replace(/[\.\-/]/g,"");
var b=1;
while(NICK.request.lstnrs[a+b]!=null){b++
}return a+b
};
NICK.request.NickRequest.prototype.doResponse=function(a){switch(this.settings.dataType){case"jsonp":case"json":this.doResponseJson(a);
break;
case"xml":this.doResponseXml(a);
break;
case"html":this.doResponseHtml(a);
break;
default:NickLog.warn(">>NICK.request: No response handler for type: "+this.settings.dataType)
}};
NICK.request.NickRequest.prototype.doResponseJson=function(a){if(a==null){this.onFail(this.getError(NICK.request.errors.RESPONSE,NICK.request.messages.INVALID_RESPONSE))
}else{if(a.code==NICK.request.codes.RESPONSE_OK){this.onSuccess(a)
}else{if(a.code==NICK.request.codes.RESPONSE_ERROR){this.onFail(a.errors)
}else{this.onSuccess(a)
}}}};
NICK.request.NickRequest.prototype.doResponseXml=function(a){if(a==null){this.onFail(this.getError(NICK.request.errors.RESPONSE,NICK.request.messages.INVALID_RESPONSE))
}else{if($(a).find("response").attr("status")==NICK.request.codes.RESPONSE_OK){this.onSuccess(a)
}else{if($(a).find("response").attr("status")==NICK.request.codes.RESPONSE_ERROR){var b={};
$(a).find("error").each(function(){b[$(this).attr("name")]=$(this).text()
});
this.onFail(b)
}}}};
NICK.request.NickRequest.prototype.doResponseHtml=function(a){if(a==null){this.onFail(this.getError(NICK.request.errors.RESPONSE,NICK.request.messages.INVALID_RESPONSE));
return
}else{this.onSuccess(a)
}};
NICK.request.NickRequest.prototype.onFail=function(a){var b=typeof a=="string"?{request:a}:a;
if(this.settings.onFail){this.settings.onFail(b)
}else{NickLog.error("NickRequest: doRequest: Failed: "+a)
}};
NICK.request.NickRequest.prototype.onSuccess=function(a){if(this.settings.onSuccess){this.settings.onSuccess(a)
}else{NickLog.info("NickRequest: doRequest: OK")
}};
NICK.request.NickRequest.prototype.doRequestError=function(c,a,b){this.onFail(this.getError(NICK.request.errors.REQUEST,a))
};
NICK.request.NickRequest.prototype.getError=function(b,c){var a=new Object();
a[b]=c;
return a
};
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.namespace("login.forgot");
NICK.namespace("login.interval");
NICK.namespace("login.games");
NICK.login.nickLoginUrl="http://"+NICK.utils.getNickDomain()+"/common/login/check.jhtml";
NICK.login.nickRegUrl="http://"+NICK.utils.getNickDomain()+"/common/registration/register.jhtml";
NICK.login.nickAuthQuestionUrl="http://"+NICK.utils.getNickDomain()+"/registration/data_files/getUserQuestion.jhtml";
NICK.login.nickAuthAnswerUrl="http://"+NICK.utils.getNickDomain()+"/registration/data_files/verify_answer.jhtml";
NICK.login.nickPrepGamesUrl="http://"+NICK.utils.getNickDomain()+"/nicktropolis/game/data/prep_games_js.jhtml";
NICK.login.doNickCookieCheck=function(){if(NICK.utils.getCookie("mtvnauthcookie")){NICK.utils.doLog("LOGIN COOKIE FOUND!!!");
NICK.userData={};
NICK.userData.loggedIn="true";
NICK.userData.screenName=NICK.userData.nickName=NICK.utils.getCookie("loggedInScreenName");
NICK.userData.gender=NICK.utils.getCookie("gender");
NICK.userData.age=NICK.utils.getCookie("age");
NICK.login.prepGamesServer();
$(document).trigger("authStatus")
}else{NICK.utils.doLog("LOGIN COOKIE NOT FOUND!!!")
}};
NICK.login.doNickCheck=function(){var a={res:"js",auto:"on",login_type:"LOGIN_CHECK"};
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickLoginUrl,data:a,onSuccess:function(b){NickLog.info("Auth: doNickCheck: onSuccess");
NICK.userData=null;
NICK.userData=b;
if(b.loggedIn=="true"){NICK.login.prepGamesServer()
}$(document).trigger("authStatus",b)
},onFail:function(c){NICK.login.interval.stop();
for(var b in c){NICK.utils.doLog("doNickCheck: error: "+b+" - "+c[b])
}}})
};
NICK.login.doLogIn=function(a){NICK.utils.doLog("doLogIn!");
$("#o-btn-login").animate({opacity:0});
NICK.overlay.loadingToggle();
if(!doCheckLogInData(a)){return
}var b={res:"js",auto:"on",screenName:a.username,password:a.password};
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickLoginUrl,data:b,onSuccess:function(c){NICK.utils.doLog("doLogIn: onSuccess : "+c.loggedIn);
NICK.userData=null;
NICK.userData=c;
if(NICK.utils.isEmptyString(NICK.userData.nickName)){NICK.userData.nickName=NICK.userData.screenName
}NICK.utils.doLog("doLogIn: onSuccess: "+c.loggedIn);
NICK.utils.doLog("doLogIn: nickName: "+NICK.userData.nickName);
NICK.utils.doLog("gender: "+NICK.userData.gender);
NICK.utils.doLog("age: "+NICK.userData.age);
NICK.login.setLoginCookies();
if(c.loggedIn=="true"){$(document).trigger("loggedIn",c);
NICK.login.prepGamesServer();
NICK.club.messages.loginWelcome()
}else{if(c.approved=="B"){NICK.utils.doLog("doLogIn: Triggering B");
$(document).trigger("bannedUserFail")
}else{if(c.approved=="S"){$(document).trigger("bannedUserTempFail")
}else{$(document).trigger("logInFail")
}}}},onFail:function(d){NICK.utils.doLog("doLogIn: onFail");
for(var c in d){NICK.utils.doLog("doLogIn: error: "+c+" - "+d[c])
}}})
};
function doCheckLogInData(a){if(NICK.utils.isEmptyString(a.username)||NICK.utils.isEmptyString(NICK.utils.trim(a.password))||NICK.utils.containsSpaces(a.username)){NICK.utils.doLog("doLogIn: empty user/pwd");
stopLoginVisualFX();
showLoginErrorMessage();
return false
}return true
}function stopLoginVisualFX(){NICK.overlay.loadingToggle();
$("#o-btn-login").animate({opacity:1})
}function showLoginErrorMessage(){NICK.utils.doLog("FAIL");
$("#loginError").show();
$("#nickLogin").show();
$("#loginLoader").hide();
$("#bannedUserError").hide();
$("#bannedUserTempError").hide()
}NICK.login.doLogOut=function(){this.clearLoginCookies();
NICK.login.interval.stop();
var a={res:"js",forceLogout:"true"};
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickLoginUrl,data:a,onSuccess:function(b){NICK.utils.doLog("doLogOut: onSuccess : "+b.loggedIn);
NICK.userData=b;
$(document).trigger("loggedOut",b)
},onFail:function(c){for(var b in c){NICK.utils.doLog("doLogOut: error: "+b+" - "+c[b])
}}});
return false
};
NICK.login.clearLoginCookies=function(){var b="";
var a="";
if(KIDS.IS_DEV){b=".nick-d.mtvi.com";
a=KIDS.utils.URL_DEV_NICK
}if(KIDS.IS_QA){b=".nick-q.mtvi.com";
a=KIDS.utils.URL_QA_NICK
}if(KIDS.IS_LIVE){b=".nick.com";
a=KIDS.utils.URL_LIVE_NICK
}NICK.utils.setCookie2("JSESSIONIDGAMES","","","/",b,"");
NICK.utils.setCookie2("mtvnauthcookie","","","/",b,"");
NICK.utils.setCookie2("loggedInScreenName","","","/",b,"");
NICK.utils.setCookie2("avatar","","","/","","");
NICK.utils.setCookie2("gender","","","/","","");
NICK.utils.setCookie2("age","","","/","","");
NICK.utils.setCookie2("buddyRequests","","","/","","")
};
NICK.login.setLoginCookies=function(){if(NICK.userData==null){return
}NICK.utils.setCookie2("gender",NICK.userData.gender,"","/","","");
NICK.utils.setCookie2("age",NICK.userData.age,"","/","","")
};
NICK.login.doRegister=function(a){var b=a;
b.res="js";
b.trylogin="true";
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickRegUrl,data:b,onSuccess:function(c){NICK.utils.doLog("doRegister: onSuccess : ");
if(c.success=="true"){doRegSuccess(c,a)
}else{doRegFail(c,a)
}},onFail:function(d){for(var c in d){NICK.utils.doLog("doRegister: error: "+c+" - "+d[c])
}}})
};
NICK.login.getAvatar=function(){if(NICK.userData==null||NICK.utils.isEmptyString(NICK.userData.avatar)){return""
}return NICK.userData.avatar
};
NICK.login.getCreated=function(){if(NICK.userData==null||NICK.utils.isEmptyString(NICK.userData.created)){return""
}return NICK.userData.created
};
NICK.login.getNickPoints=function(){if(NICK.userData==null||NICK.utils.isEmptyString(NICK.userData.nickPoints)){return""
}return NICK.userData.nickPoints
};
NICK.login.getGender=function(){if(NICK.userData==null||NICK.utils.isEmptyString(NICK.userData.gender)){return""
}return NICK.userData.gender
};
NICK.login.getAge=function(){if(NICK.userData==null||NICK.utils.isEmptyString(NICK.userData.age)){return""
}return NICK.userData.age
};
NICK.login.getNickName=function(){if(NICK.userData==null){return""
}var a=NICK.userData.screenName;
if(NICK.utils.isEmptyString(a)){a=NICK.userData.nickName
}return NICK.utils.isEmptyString(a)?"":a.toLowerCase()
};
NICK.login.loginName=NICK.login.getNickName;
NICK.login.getLoginStatus=function(){if(NICK.userData==null||NICK.utils.isEmptyString(NICK.userData.loggedIn)){return"false"
}return NICK.userData.loggedIn
};
NICK.login.setLoginStatus=function(a){if(a==null){return
}if(NICK.userData==null){NICK.userData={}
}NICK.userData.loggedIn=a
};
NICK.login.isLoggedIn=function(){return NICK.login.getLoginStatus()=="true"
};
NICK.login.forgot.questionData="";
NICK.login.forgot.submitAuthQuestion=function(){NICK.utils.doLog("submitAuthQuestion");
if($("#getQuestionDiv").css("display")!="none"){NICK.login.forgot.submitNickname()
}else{NICK.login.forgot.submitAnswer()
}};
NICK.login.forgot.submitNickname=function(){NICK.overlay.loadingToggle();
var b=$("#usernameField").val();
NICK.utils.doLog("submitNickName: ["+b+"]");
if(NICK.utils.isEmptyString(b)){NICK.overlay.loadingToggle();
$("#failMsg").show().html("Incorrect NickName");
return
}var a={username:$("#usernameField").val(),showComments:"false",responseType:"json"};
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickAuthQuestionUrl,data:a,onSuccess:function(c){NICK.overlay.loadingToggle();
NICK.utils.doLog("response question:"+c.question);
if(c.questionid!="null"){NICK.login.forgot.questionData=c;
$("#secretQuestion").html(c.question);
$("#getQuestionDiv").hide();
$("#getAnswerDiv").show();
$("#failMsg").hide()
}else{$("#failMsg").show().html("Incorrect NickName")
}},onFail:function(d){NICK.overlay.loadingToggle();
for(var c in d){NICK.utils.doLog("submitNickname: error: "+c+" - "+d[c])
}}})
};
NICK.login.forgot.submitAnswer=function(){NICK.overlay.loadingToggle();
NICK.utils.doLog("submitAnswer");
var a=$("#answerField").val();
if(NICK.utils.isEmptyString(a)){NICK.overlay.loadingToggle();
$("#failMsg").show().html("Incorrect Answer");
return
}var b={username:NICK.login.forgot.questionData.username,questionid:NICK.login.forgot.questionData.questionid,answer:a,responseType:"json"};
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickAuthAnswerUrl,data:b,onSuccess:function(c){NICK.overlay.loadingToggle();
NICK.utils.doLog("response valid:"+c.valid);
if(c.valid=="true"){$("#failMsg").hide();
$("#getAnswerDiv").hide();
$(".o_popup_forgot .actions").hide();
$("#yourPassword").show().html("Your password is: "+c.password)
}else{NICK.utils.doLog("response invalid:"+c.approved);
if(c.approved=="B"){NICK.utils.doLog("doLogIn: Triggering B");
$(document).trigger("bannedUserFail")
}else{if(c.approved=="S"){$(document).trigger("bannedUserTempFail")
}else{$("#failMsg").show().html("Incorrect Answer")
}}}},onFail:function(d){NICK.overlay.loadingToggle();
for(var c in d){NICK.utils.doLog("submitAnswer: error: "+c+" - "+d[c])
}}})
};
NICK.login.prepGamesServer=function(){NICK.utils.doLog("Prep Games Combined: complete: triggering");
$(document).trigger("loggedInGames")
};
NICK.login.interval.id=-1;
NICK.login.interval.time=3600000;
NICK.login.interval.loading=false;
NICK.login.interval.init=function(){NickLog.debug("login.interval.init");
if(NICK.login.interval.id!=null&&NICK.login.interval.id>=0){return
}NICK.login.interval.id=setInterval("NICK.login.interval.doPingLogin()",NICK.login.interval.time)
};
NICK.login.interval.doPingLogin=function(){if(NICK.login.interval.loading){NickLog.debug("login.interval.doPingLogin: check already in progress");
return
}var a={res:"js",login_type:"LOGIN_CHECK"};
NICK.login.interval.loading=true;
NickLog.debug("doPingLogin: queued: loading: "+NICK.login.interval.loading);
NICK.request.doRequest({dataType:"jsonp",url:NICK.login.nickLoginUrl,data:a,onSuccess:function(b){NICK.userData=null;
NICK.userData=b;
NICK.login.interval.loading=false;
NickLog.info("doPingLogin: success: loading: "+NICK.login.interval.loading)
},onFail:function(c){NICK.login.doLogOut();
NICK.login.interval.stop();
NICK.login.interval.loading=false;
NickLog.info("doPingLogin: fail: loading: "+NICK.login.interval.loading);
for(var b in c){NICK.utils.doLog("doPingLogin: error: "+b+" - "+c[b])
}}})
};
NICK.login.interval.stop=function(){NickLog.debug("login.interval.stop: id: "+NICK.login.interval.id);
if(NICK.login.interval.id<0){return
}clearInterval(NICK.login.interval.id);
NICK.login.interval.id=-1
};
$(function(){$(document).bind("loggedIn",function(){NICK.overlay.loadingToggle();
NICK.overlay.close();
$("#o-btn-login").css("opacity",1)
});
$(document).bind("logInFail bannedUserFail bannedUserTempFail",function(){stopLoginVisualFX()
});
$(document).bind("logInFail",function(){showLoginErrorMessage()
});
$(document).bind("bannedUserFail",function(){NICK.utils.doLog("Banned User");
$("#loginError").hide();
$("#nickLogin").show();
$("#loginLoader").hide();
$("#bannedUserError").show();
$("#bannedUserTempError").hide()
});
$(document).bind("bannedUserTempFail",function(){NICK.utils.doLog("Banned User");
$("#loginError").hide();
$("#nickLogin").show();
$("#loginLoader").hide();
$("#bannedUserError").hide();
$("#bannedUserTempError").show()
})
});
NICK.login.prompt=function(){NICK.overlay.open("Please Sign In","/overlay/login.html",{method:"ajax"})
};
NICK.login.games.doLogin=function(a){if(a==null){a="doLoginResponse"
}$("#games-player-game").addClass("hidden").addClass("swfnohide");
NICK.login.prompt();
$(document).unbind("loggedIn.games");
$(document).bind("loggedIn.games",function(b){$("#games-player-game").removeClass("hidden").removeClass("swfnohide");
NICK.utils.doLog(b);
$(this).unbind(b);
NickProxy.swfObserver.dispatch(a,NICK.userData)
})
};
NICK.login.games.doCheckLogin=function(b){if(b==null){b="doCheckLoginResponse"
}var a;
if(NICK.userData!=null&&NICK.userData!=undefined){a=NICK.userData
}NickProxy.swfObserver.dispatch(b,a)
};
NICK.login.games.watchUserLogOut=function(a){if(a==null){a="watchUserLogOutResponse"
}$(document).unbind("loggedOut.games");
$(document).bind("loggedOut.games",function(b){NickProxy.swfObserver.dispatch(a)
})
};
$(document).ready(function(){NICK.login.doNickCookieCheck()
});
var NickComments=function(){var a=NICK.config.URL_COMMENT_POST;
var f="/api/comments/1.0/display";
var d={game:383,video:384,troopgrid:394,blog:472,quiz:481};
var b="Please enter a comment.";
var c="There were errors in your story submission. Please try again.";
var e="Thanks! Your comment was posted. Once it's approved, it will show up on the site!";
var l="Please wait while we post your comment...";
var k={};
var g=[100,80];
function i(n){var m=[];
n.each(function(){var o=$(this).attr("nickuid");
if(o.length>0){m.push(o)
}});
NICK.request.doRequest({dataType:"jsonp",data:{userNames:m.join(",")},url:"http://"+NICK.utils.getNickDomain()+"/sbcom/data/avatar/get_user_avatar.jhtml",onSuccess:function(q){var o=q.data;
for(var p in o){n.filter('[nickuid="'+p+'"]').html(NICK.avatar.image(o[p],g[0],g[1]))
}}})
}function h(n,o,m){if(n&&n.code=="ok"){j(m,e);
$("#"+o).get(0).reset()
}else{j(m,c);
$("#"+o).slideDown(function(){$("div.comments-module .box-middle").css("display","none").css("display","block");
$(".pagination .num-blk").css("margin","0px").css("margin","0 auto")
})
}}function j(m,n){$("#"+m).fadeOut("fast",function(){if(n&&n.length){$(this).text(n).fadeIn("fast")
}})
}return{setCollectionHTML:function(m,n){if(NICK.config.SITE_NAME=="nicktoons"){$.extend(n,{parentSiteAlias:"site-nicktoons"})
}$.extend(n,{size:n.rows,rows:20});
$.get(f,n,function(q){var p=$("#"+m).html(q);
p.find(".UserComment").hide();
var r=NICK.utils.getNoRepeatRandoms(n.size,n.rows);
for(var o=0;
o<r.length;
o++){p.find(".UserComment").eq(r[o]-1).show()
}p.find(".UserComment:hidden").remove();
i(p.find(".UserCommentAvatar"))
});
if(!k.domid){k.domid=true;
NickEvents.bind("pagination_go.new-comments-pagination",function(o,p){return function(q){NickComments.setCollectionHTML(o,$.extend(p,{start:(q.page*q.max)-q.max}))
}
}(m,n))
}},setCollectionStaticListHTML:function(m,n){if(NICK.config.SITE_NAME=="nicktoons"){$.extend(n,{parentSiteAlias:"site-nicktoons"})
}$.extend(n,{size:n.rows,rows:20});
$.get(f,n,function(p){var o=$("#"+m).html(p);
i(o.find(".UserCommentAvatar"))
});
if(!k.domid){k.domid=true;
NickEvents.bind("pagination_go.static-comments-pagination",function(o,p){return function(q){NickComments.setCollectionStaticListHTML(o,$.extend(p,{start:(q.page*q.max)-q.max,rows:5,page:q.page}))
}
}(m,n))
}},setAvatarSize:function(n,m){g=[n,m]
},post:function(q,r,m){var n=NICK.get("type");
if(n=="club"){n="game"
}var o={cid:d[n],type:"userComment",workflow_stages:"producer",workflow_name:"UPickDailyWorkflow",status_url:"/fuseugc/stateCallback.jhtml",suspend_url:"/fuseugc/suspendCallbackKaraoke.jhtml",resume_url:"/fuseugc/resumeCallback.jhtml",publish_url:"/fuseugc/publishUPD.jhtml",itemid:NICK.get("cmsId"),membername:NICK.login.getNickName(),comment:$("#"+r).val(),cp_CommentMessage:$("#"+r).val(),cp_ParentContentTitle:window.document.title,cp_ParentContentType:(NICK.get("isPlayList")=="true")?"playlist":n,cp_ParentContentPermalink:NICK.get("canonicalUrl"),cp_CreatorPermalink:"http://"+NICK.utils.URL_LIVE_NICK+"/club/main/"+NICK.login.getNickName()+"/"};
if(o.comment.length==0){return j(m,b)
}if(o.itemid.length==0){return j(m,c)
}j(m,"");
$("#"+q).slideUp("slow",function(){j(m,l);
$("div.comments-module .box-middle").css("display","none").css("display","block");
$(".pagination .num-blk").css("margin","0px").css("margin","0 auto")
});
var p={cid:o.cid,xml:NICK.utils.getGdcXml(o.cid,o)};
$.ajax({type:"POST",url:a,data:p,jsonp:"jsonCallback",dataType:"jsonp",success:function(s){setTimeout(function(){h(s,q,m)
},1000)
}})
},clear:function(o,m){try{if($("#"+o).get(0)){$("#"+o).get(0).reset()
}$("#"+m).empty()
}catch(n){NICK.utils.doLog("NickComments Clear error: "+n)
}}}
}();
var NickSearch=function(a){var c="http://search.mtvnservices"+NICK.utils.getStageDomain()+"/typeahead/suggest/";
var g=null;
var f=true;
var d="";
var h="";
var i=NICK.config.SOLR_SITENAME==undefined?"solr_nick":NICK.config.SOLR_SITENAME;
var k=$.extend({wait:500,fields:["title_t","contentSuperType_s","wideThumbnail_s","thumbnail_t","showLookupUrlAlias_s","primaryTypeTag_s","urlAlias_s"],complete:function(){NickLog.error("NickSearch: No Callback Specified!")
}},a);
function b(m){if(h.length==0||d.length==0){return false
}if(h!=d){j()
}else{h=""
}f=true;
var l={};
l.total=m.response.numFound;
l.items=m.response.docs;
l.offset=m.response.start;
k.complete(l)
}function j(){f=false;
g=setTimeout(function(){h=d;
$.ajax({url:c,dataType:"jsonp",data:{siteName:i,fl:k.fields.join(","),q:h},success:b})
},k.wait)
}function e(){f=true;
clearTimeout(g)
}return{suggest:function(l){if(l&&l.length>0){d=l;
if(f){j()
}else{return false
}}else{e();
d="";
k.complete(false);
return false
}}}
};
NICK.namespace("search");
NICK.search.currentQueryDisplay=null;
NICK.search.compressedView=false;
NICK.search.init=function(){NICK.search.currentQueryDisplay=$("#NickSearchUI_Current_Query");
NICK.search.NickSearch=new NickSearch({complete:NICK.search.complete});
$("#search-term").bind("keyup",function(){var a=$(this).val();
if(a.length){NICK.search.currentQueryDisplay.text('"'+a+'"')
}else{NICK.search.currentQueryDisplay.text("")
}$("#NickSearchUI_More").attr("href","/search/?term="+a);
NICK.search.NickSearch.suggest(a)
});
NICK.search.handleSize();
$(window).bind("resize",NICK.search.handleSize)
};
NICK.search.complete=function(d){if(d&&d.items.length>0){$(".NickSearchUI_Section ul").empty();
var c,b,e;
for(var a=0;
a<Math.min(d.items.length,(NICK.search.compressedView?5:6));
a++){c=d.items[a];
b=NICK.search.getItemTemplate(c.contentSuperType_s[0]);
e=c.wideThumbnail_s?c.wideThumbnail_s[0]:c.thumbnail_t[0];
b.find(".NickSearchUI_Link ").attr("href",NICK.search.getURL(c));
b.find(".NickSearchUI_Image").attr("src",NICK.utils.getImage(e,66,126));
b.find(".NickSearchUI_Title").text(c.title_t[0]);
b.appendTo(NICK.search.getSectionByType(c.contentSuperType_s[0],"ul"))
}$(".NickSearchUI_Section").each(function(f){if($(this).find("li").size()==0){$(this).hide()
}else{$(this).show()
}});
NICK.search.showSuggest();
$(".NickSearchUI_Section").removeClass("last").filter(":visible:last").addClass("last")
}else{NICK.search.hideSuggest()
}};
NICK.search.getSectionByType=function(a,c){var b;
switch(a){case"video":b=$("#NickSearchUI_Videos");
break;
case"game":b=$("#NickSearchUI_Games");
break;
case"show":b=$("#NickSearchUI_Shows");
break
}if(c){b=b.find(c)
}return b
};
NICK.search.getURL=function(a){switch(a.contentSuperType_s[0]){case"video":return"/videos/clip/"+a.urlAlias_s[0]+".html";
case"game":if(a.primaryTypeTag_s){switch(a.primaryTypeTag_s[0]){case"ClubHouses":return"/club/clubhouses/"+a.urlAlias_s[0]+".html";
case"ClubGame":return"/club/"+a.urlAlias_s[0]+".html";
case"ClubCinema":return"/club/clubhouses/club-cinema/"+a.urlAlias_s[0]+".html";
case"Mall":return"/club/mall/"+a.urlAlias_s[0]+".html";
default:return"/games/"+a.urlAlias_s[0]+".html"
}}else{return"/games/"+a.urlAlias_s[0]+".html"
}case"show":return a.showLookupUrlAlias_s?"/shows/"+a.showLookupUrlAlias_s[0]:"/"
}};
NICK.search.getItemTemplate=function(b){var a='<li class="clearfix">';
a+='<a class="NickSearchUI_Link" href="#">';
a+='<div class="NickSearchUI_Image_Wrapper">';
a+='<img class="NickSearchUI_Image" />';
if(b=="video"){a+='<div class="NickSearchUI_Video_Icon"></div>'
}a+="</div>";
a+='<span class="NickSearchUI_Title"></span>';
a+="</a>";
a+="</li>";
return $(a)
};
NICK.search.showSuggest=function(){$("#NickSearchUI").show();
$(document).bind("click.NickSearch",function(a){if($(a.originalTarget).parents("#NickSearchUI").size()==0){NICK.search.hideSuggest()
}})
};
NICK.search.hideSuggest=function(){$("#NickSearchUI").hide();
$(document).unbind(".NickSearch")
};
NICK.search.handleSize=function(){if($(window).height()<710){NICK.search.compressedView=true
}else{NICK.search.compressedView=false
}};
$(document).ready(NICK.search.init);
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.namespace("sendToFriend");
NICK.utils.validateEmail=function(a){return KIDS.utils.isValidEmail(a)
};
NICK.sendToFriend.URL_WORD_FILTER="http://www.nick.com/dynamo/wordfilter/index.jhtml?name=";
NICK.sendToFriend.goodWordsCounter=0;
NICK.sendToFriend.formSubmitting=false;
NICK.sendToFriend.formLoaded=function(){$("#failMsg").hide();
$("#badwordMsg").hide();
$("#bademailMsg").hide();
$("#emailSentMsg").hide();
$("#badnameMsg").hide();
$("#sendToFriendForm").show();
$("#send-to-a-friend div.loadingAnimation").hide()
};
NICK.sendToFriend.validate=function(){$("#failMsg").hide();
$("#badwordMsg").hide();
$("#bademailMsg").hide();
$("#emailSentMsg").hide();
$("#badnameMsg").hide();
$("#send-to-a-friend div.loadingAnimation").show();
$("#send-to-a-friend div.loadingAnimation h4").html("Validating...");
if($("#yourName").attr("value")==""){$("#failMsg").show();
$("#badnameMsg").show();
$("#yourName").removeClass("textboxerror");
$("#yourName").addClass("textboxerror")
}else{$("#yourName").removeClass("textboxwrapper");
$("#yourName").addClass("textboxwrapper")
}if($("#friendsName").attr("value")==""){$("#failMsg").show();
$("#badnameMsg").show();
$("#friendsName").removeClass("textboxerror");
$("#friendsName").addClass("textboxerror")
}else{$("#friendsName").removeClass("textboxerror");
$("#friendsName").addClass("textboxerror")
}if((!NICK.utils.validateEmail($("#friendsEmail").attr("value")))){$("#failMsg").show();
$("#bademailMsg").show();
$("#friendsEmail").removeClass("textboxerror");
$("#friendsEmail").addClass("textboxerror")
}else{$("#friendsEmail").removeClass("textboxerror");
$("#friendsEmail").addClass("textboxerror")
}NICK.sendToFriend.goodWordsCounter=0;
NICK.sendToFriend.checkBadWord($("#yourName"));
NICK.sendToFriend.checkBadWord($("#friendsName"))
};
NICK.sendToFriend.checkBadWord=function(d){var c=d.attr("value");
var a=NICK.utils.getNickDomain();
var b="http://"+a+"/common/wordfilter/json.jhtml";
NICK.request.doRequest({dataType:"jsonp",url:b,data:{v:"1",word:c},onSuccess:function(f){NICK.utils.doLog("Dirty Word Response:"+f.data[0].code);
if(f.data[0].code=="bad"){d.attr("value","");
NICK.sendToFriend.goodWordsCounter=0;
$("#failMsg").css("display","block");
$("#badwordMsg").css("display","block");
$("#send-to-a-friend div.loadingAnimation").hide()
}else{NICK.sendToFriend.goodWordsCounter++;
$("#send-to-a-friend div.loadingAnimation").hide();
if(NICK.sendToFriend.goodWordsCounter==2&&$("#failMsg").css("display")=="none"){NICK.sendToFriend.goodWordsCounter=0;
NICK.sendToFriend.formSubmitting=true;
var i=$("#friendsEmail").val();
var e=$("#yourName").val();
var g=$("#friendsName").val();
var h=window.location;
NICK.sendToFriend.sendEmail(e,g,i,h)
}}},onFail:function(f){for(var e in f){NICK.utils.doLog("Dirty Word Response: Error: "+e+" - "+f[e])
}}})
};
NICK.sendToFriend.sendEmail=function(b,e,g,f){$("#failMsg").hide();
$("#badwordMsg").hide();
$("#bademailMsg").hide();
$("#emailSentMsg").hide();
$("#badnameMsg").hide();
$("#sendToFriendForm").hide();
$("#send-to-a-friend div.loadingAnimation").show();
var d=NICK.utils.getNickDomain();
if(NICK.config.SITE_NAME=="nicktoons"){var a="http://"+d+"/sbcom/data/sendToFriend/send_nicktoons.jhtml"
}else{var a="http://"+d+"/sbcom/data/sendToFriend/send_nick.jhtml"
}var c=$("<div/>").text(f.toString()).html();
if(NICK.sendToFriend.overrideTemplate==undefined){template=NICK.get("type")
}NICK.request.doRequest({dataType:"jsonp",url:a,data:{email:g,senderName:b,friendsName:e,URLpath:c,etype:template,id:NICK.get("cmsId"),domain:window.location.hostname,section:NICK.get("type")},onSuccess:function(h){NICK.utils.doLog("Email Send Success!");
$("#send-to-a-friend div.loadingAnimation").hide();
$("#sentMessage").show().html("Congrats! This has been sent to your friend.");
KIDS.reporting.omnifunctions.sendSTFEmailSent()
},onFail:function(i){$("#sentMessage").show().html("There was an error sending your message. Please try again.");
$("#sendToFriendForm").show();
for(var h in i){NICK.utils.doLog("Bad load: Error: "+h+" - "+i[h]);
alert(i[h])
}}})
};
NICK.namespace("search");
NICK.search.validate=function(){var a=KIDS.utils.trim(document.getElementById("search-term").value);
if(a.length<=0){return false
}var b="/search/?term="+escape(a);
if(KIDS.get("adfree")==="true"){NICK.utils.openBumper("fullPage",b,null,null,null,false)
}else{document.location.href=b
}return false
};
NICK.search.navcarousel=function(){var g=0;
var c=$("#submenu");
var b=$("#navNext");
var d=$("#navPrevious");
var a=c.find("ul");
var f=c.find(".image");
if(KIDS.get("uri")!=="/"){var e=$("#submenu-wrapper").width()-(($(".ctrl").outerWidth(true)*2)+($(".cap").outerWidth(true)*2));
c.css("width",e);
$(window).bind("resize",function(){e=$("#submenu-wrapper").width()-(($(".ctrl").outerWidth(true)*2)+($(".cap").outerWidth(true)*2));
c.css("width",e);
d.addClass("end");
g=0;
a.css("left",0);
if(c.width()<c.find("ul").width()){b.removeClass("end")
}else{b.addClass("end")
}})
}if(c.width()<c.find("ul").width()){b.removeClass("end")
}else{b.addClass("end")
}$(".ctrl, .cap").removeClass("hidden");
d.click(function(){if($(this).hasClass("end")!==true){if(c.width()<c.find("ul").width()){b.removeClass("end")
}var i=Math.floor(c.width()/f.outerWidth(true));
var h="-"+((i*f.outerWidth(true))*(g-1));
var j=f.size()-(i*g);
if((g-1)===0){h=0;
d.addClass("end")
}else{d.removeClass("end")
}g--;
a.animate({left:h+"px"},500)
}});
b.click(function(){if($(this).hasClass("end")!==true){if(c.width()<c.find("ul").width()){d.removeClass("end")
}var i=Math.floor(c.width()/f.outerWidth(true));
var h=((i*f.outerWidth(true))*(g+1));
var j=f.size()-(i*(g+1));
if(j<=i){h=c.find("ul").width()-c.width();
b.addClass("end")
}else{b.removeClass("end")
}a.animate({left:"-"+h+"px"},500);
g++
}})
};
$(document).ready(function(){setHeaderStatus();
$(document).bind("authStatus loggedIn loggedOut",function(){setHeaderStatus()
});
$("a.bumper, #nick-arcade-bumper a").each(function(){$(this).click(function(a){a.preventDefault();
NICK.utils.openBumper("paysite",$(this).attr("href"));
return false
})
});
if($("#submenu-more").size()>0){$("#submenu-more").click(openMoreSubMenu).children("a").removeClass("active")
}NICK.utils.initExternalLinks();
if(NICK.get("adfree")=="true"){NICK.utils.initAdFreeLinks()
}$("#submenu .image a, #submenu-content li a").tooltip({id:"label-tooltip",contentTitle:true,followMouse:true,allowAccess:false,lockTo:"top",allowFlip:false,delay:0});
NICK.search.navcarousel();
if(jQuery.support.htmlSerialize==false&&parseInt(jQuery.browser.version)==6){prepareIE6()
}});
function openMoreSubMenu(c){c.preventDefault();
var f=$("#submenu-wrapper");
var b=$("#submenu-content");
var d=$("#submenu-more").find("a span");
if(f.hasClass("expanded")){var a="More";
if(d.is(".more-shows")){a="Shows"
}b.slideUp("fast",function(){f.removeClass("expanded")
});
d.text(a);
d.attr("title",a)
}else{f.addClass("expanded");
b.slideDown("fast");
d.text("Close");
d.attr("title","Close")
}}function setHeaderAvatar(){if(NICK.utils.getCookie("avatar")){$("#UAPreview").html(NICK.avatar.image(NICK.utils.getCookie("avatar"),72,50,true))
}else{NICK.utils.doLog("Avatar Cookie Value: "+NICK.utils.getCookie("avatar"));
NICK.request.doRequest({dataType:"jsonp",url:"http://"+NICK.utils.getNickDomain()+"/sbcom/data/avatar/get_user_avatar.jhtml",data:{userNames:NICK.login.getNickName()},onSuccess:function(a){var b=a.data[NICK.login.getNickName()];
NICK.utils.setCookie2("avatar",b,"","/","","");
NICK.userData.avatar=b;
$("#UAPreview").html(NICK.avatar.image(NICK.utils.getCookie("avatar"),72,50,true));
$(document).trigger("avatarReady")
},onFail:function(b){for(var a in b){NICK.utils.doLog("Get Avatar: error: "+a+" - "+b[a])
}}})
}}function setBuddyRequests(){if(NICK.utils.getCookie("buddyRequests")){var a=NICK.utils.getCookie("buddyRequests");
NICK.utils.doLog("Buddy Cookie: "+a);
if(a>0){$("#buddyRequestCount").text(NICK.utils.getCookie("buddyRequests"));
$("#buddyRequestCount").parent().show()
}}else{NICK.request.doRequest({dataType:"jsonp",url:"http://"+NICK.utils.getNickDomain()+"/sbcom/data/profile/nick/buddy/getBuddyRequestList.jhtml",onSuccess:function(b){var c=b.size;
NICK.utils.setCookie2("buddyRequests",c,"","/","","");
NICK.userData.buddyRequests=c;
NICK.utils.doLog("Buddy Request: "+c);
if(c>0){$("#buddyRequestCount").text(NICK.utils.getCookie("buddyRequests"));
$("#buddyRequestCount").parent().show()
}$(document).trigger("buddyRequestReady")
}})
}}function setHeaderStatus(){$("#mynick").css("display","inline");
if(NICK.login.isLoggedIn()){NickLog.info(NICK.login.getNickName()+" successfully logged in.");
$(".mynick-noauth").hide();
var a=NICK.login.getNickName();
var b='<div id="mynick-private" class="mynick-auth">';
b+="<h5><a href='javascript:NICK.club.global.gotoProfile()' class=\"profile\">"+a+"</a></h5>";
b+=" | ";
b+='<a href="#" onclick="return NICK.login.doLogOut();" class="logout">Log Out</a>';
b+="<a href='javascript:NICK.club.global.goToBuddyRequest()' style='display:none;'><span id=\"buddyRequestCount\">0</span></a>";
b+="</div>";
$("#mynick-private").remove();
$("#mynick").append(b);
setHeaderAvatar();
setBuddyRequests();
$(".mynick-auth").show()
}else{NickLog.warn("No user session found.");
$("#mynick-private").remove();
$("#UAPreview").html('<img class="png" id="user-avatar" src="/assets/default_avatar.png" width="45" height="50" />');
$(".mynick-auth").hide();
$(".mynick-noauth").show()
}}function prepareIE6(){$(".png, h1.icon").supersleight({shim:"/assets/transparent.gif",apply_positioning:false});
if($.cookie("IE6Upgrade")!="true"){$.cookie("IE6Upgrade","true",{expires:30});
$('<div id="IE6UpgradeBar" style="display: none;"><div class="container"><a class="text" href="#" onclick="return openIE6upgrade();">You are using an out of date browser. Upgrade to Microsoft Internet Explorer 8 for best results.</p><a class="close" href="#" onclick="return closeIE6bar();">Close</a></div></div>').prependTo("body").slideDown("slow")
}}function openIE6upgrade(){KIDS.reporting.omnifunctions.sendLinkEvent("","IE6-Upgrade");
NICK.utils.openBumper("fullPage","http://www.microsoft.com/windows/internet-explorer/default.aspx",null,null,null,false);
return false
}function closeIE6bar(){$("#IE6UpgradeBar").slideUp("slow")
}function sendLogin(){var a={username:$(".o_popup_login input[name='nickUsername']").val(),password:$(".o_popup_login input[name='nickPassword']").val()};
NICK.login.doLogIn(a)
};
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.namespace("pagination");
NICK.pagination.itemOffset=-1;
NICK.pagination.sortOverride="";
NICK.pagination.setItemOffset=function(a){NICK.utils.doLog(">setItemOffSet: "+a);
NICK.pagination.itemOffset=a
};
NICK.pagination.getItemOffset=function(){return NICK.pagination.itemOffset
};
NICK.pagination.goToPage=function(c,a,d,b){NICK.utils.doLog("Pagination!: goToPage: "+d);
d=d==null?"":""+d;
if(NICK.pagination.sortOverride!=""){b=NICK.pagination.sortOverride
}$(document).trigger({type:"pagination_go."+d,page:c,max:a,id:d,sort:b})
};
NICK.pagination.goNext=function(c,a,d,b){NICK.pagination.goToPage(c,a,d,b)
};
NICK.pagination.goPrevious=function(c,a,d,b){NICK.pagination.goToPage(c,a,d,b)
};
NICK.pagination.setSortOverride=function(a){NICK.pagination.sortOverride=a
};
$(document).bind("pagination_go.",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max)
});
$(document).bind("pagination_go.game-browser-pagination",function(b){var c=NICK.pagination.getItemOffset();
if(c<=0){NICK.listings.getDataPages(b.sort,b.page,b.max);
return
}var a=0;
if(b.page==1){a=0
}else{if(b.page<=2){a=c
}else{a=((b.page*b.max-b.max)-c)
}}NICK.utils.doLog("Pagination: "+c+" | "+b.page+" | "+b.max+" | "+a);
NICK.listings.getData(NICK.listings.getUriOverride(),b.sort,a,b.page)
});
$(document).bind("pagination_go.collection-grid-pagination",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max)
});
$(document).bind("pagination_go.collection-grid-paginationfullEpisodeItem",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"fullEpisodeItem"})
});
$(document).bind("pagination_go.collection-grid-paginationvideoItem",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"videoItem"})
});
$(document).bind("pagination_go.collection-grid-paginationvideoPlaylist",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"videoPlaylist"})
});
$(document).bind("pagination_go.collection-grid-all-paginationfullEpisodeItem",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"fullEpisodeItem",viewType:"collectionAll"})
});
$(document).bind("pagination_go.collection-grid-all-pagination",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{viewType:"collectionAll"})
});
$(document).bind("pagination_go.collection-grid-all-paginationvideoItem",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"videoItem",viewType:"collectionAll"})
});
$(document).bind("pagination_go.collection-grid-paginationMovie",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.overrideURI="/videos/movie/";
NICK.listings.getDataPages(a.sort,a.page,a.max)
});
$(document).bind("pagination_go.collection-grid-all-paginationvideoPlaylist",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"videoPlaylist",viewType:"collectionAll"})
});
$(document).bind("pagination_go.collection-playlist-all",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
NICK.listings.getDataPages(a.sort,a.page,a.max,{type:"videoPlaylist",viewType:"collectionPlaylistAll"})
});
$(document).bind("pagination_go.tag-search-pagination",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
l=document.location.href.split("?");
l=l[0];
if(a.page>1){l+="?page="+a.page+"&start="+(a.page-1)*a.max
}document.location.href=l
});
$(document).bind("pagination_go.search-pagination",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id);
l=document.location.href.split("?");
t=l[1].split("&");
t=t[0].split("=");
t=t[1];
getfqterms=l[1].split("&");
fq=0;
for(i=0;
i<getfqterms.length;
i++){fqcheck=getfqterms[i].split("=");
if(fqcheck[0]=="fq"){fq=fqcheck[1]
}}l=l[0];
l+="?term="+t;
if(fq){l+="&fq="+fq
}if(a.page>1){l+="&page="+a.page+"&start="+(a.page-1)*a.max
}document.location.href=l
});
$(document).bind("pagination_go.games-by-show-all-pagination",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id+" | page: "+a.page+" | max: "+a.max);
var b={sort:"",start:(a.page*a.max-a.max),page:a.page};
NICK.request.doRequest({dataType:"html",url:"/ajax/listing-game/games-by-show-all.html",data:b,onSuccess:function(c){$("div.filter-target").html(c)
},onFail:function(d){for(var c in d){NICK.utils.doLog("Sort Response: Error: "+c+" - "+d[c])
}}})
});
$(document).bind("pagination_go.shows-list-pagination",function(a){NICK.utils.doLog("Pagination: event: "+a.type+" | "+a.id+" | page: "+a.page+" | max: "+a.max);
var b={sort:"",start:(a.page*a.max-a.max),page:a.page};
NICK.request.doRequest({dataType:"html",url:"/ajax/listing-video/shows-list.html",data:b,onSuccess:function(c){$("div.filter-target").html(c)
},onFail:function(d){for(var c in d){NICK.utils.doLog("Sort Response: Error: "+c+" - "+d[c])
}}})
});
$(document).bind("pagination_go.comments-pagination",function(a){NICK.utils.doLog("Pagination: Comments event: "+a.type+" | "+a.id+" | page: "+a.page+" | max: "+a.max);
NICK.comments.loadComments(a.type,null,NICK.comments.urlAlias,(a.page*a.max-a.max),20)
});
NICK.namespace("club.parents");
NICK.club.parents.concernTechURL="http://"+NICK.utils.getNickDomain()+"/nicktropolis/game/data/report_tech.jhtml";
NICK.club.parents.concernSafetyURL="http://"+NICK.utils.getNickDomain()+"/nicktropolis/game/data/report_safety.jhtml";
NICK.club.parents.reportConcern=function(){var a=$("#parentFormReportConcern");
var d=$("input[name='email']",a);
var c=$("input[name='name']",a);
var e=$("input[name='type']:checked",a);
var b=$("textarea",a);
var f=false;
$(".group",a).removeClass("error");
if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(d.val())==false){f=true;
d.parents(".group").addClass("error")
}if($("input[name='type']:checked").size()==0){f=true;
e.parents(".group").addClass("error")
}if(b.val().length<6){f=true;
b.parents(".group").addClass("error")
}if(f==false){$(".o_popup_report_concern").addClass("complete").html("<h2>Thank you for taking the time to describe your Nick.com experience. Each and every concern is read by our staff and will be responded to as quickly as possible.</h2>");
NICK.request.doRequest({dataType:"json",url:(e.val()=="report_safety"?NICK.club.parents.concernSafetyURL:NICK.club.parents.concernTechURL),data:{email:d.val(),name:c.val(),issue:b.val()}})
}return false
};
if(typeof NICK=="undefined"||!NICK){var NICK={}
}NICK.Poll=function(a){this.urlStandard="/sbcom/data/poll/pkcav.jhtml";
this.urlAkamai="http://www.nick.com/sbcom/data/poll/fcdm/kca/";
this.urlResults="/sbcom/data/poll/success.jhtml";
this.pollNameParam="pollName";
this.ballotNameParam="ballotName";
this.lineItemIdParam="lineItemId";
this.lineIndexParam="vote";
this.defaults={type:"GET",dataType:"jsonp",useAkamai:false};
this.settings=$.extend({},this.defaults,a);
this.getUrl=function(c){var b="";
if(this.settings.useAkamai){b=this.urlAkamai+c+"/"
}else{b="http://"+KIDS.utils.getNickDomain()+this.urlStandard
}return b
};
this.getResultsUrl=function(){return"http://"+KIDS.utils.getNickDomain()+this.urlResults
};
this.doSubmit=function(f,c,b,e){var d={};
d[this.pollNameParam]=f;
d[this.ballotNameParam]=c;
d[this.lineItemIdParam]=b;
d[this.lineIndexParam]=e;
NICK.request.doRequest({dataType:this.settings.dataType,type:this.settings.type,url:this.getUrl(f),data:d,onSuccess:function(g){NICK.utils.doLog("Poll: doSubmit: onSuccess")
},onFail:function(g){NICK.utils.doLog("Poll: doSubmit: onFail")
}})
};
this.getResults=function(c){var b={};
b[this.pollNameParam]=c;
NICK.utils.doLog("getResults: "+this.getResultsUrl());
NICK.request.doRequest({dataType:this.settings.dataType,url:this.getResultsUrl(),data:b,onSuccess:function(d){NICK.utils.doLog("Poll: getResults: onSuccess")
},onFail:function(d){NICK.utils.doLog("Poll: getResults: onFail")
}})
}
};
NICK.polls={};
NICK.polls.resultsListeners=null;
NICK.polls.doVoteResults=function(b,a,c){if(NICK.polls.resultsListeners==null||NICK.polls.resultsListeners[a]==null){NICK.utils.doLog("Polls: doVoteResults: no listener found: "+a);
return
}NICK.utils.doLog("Polls: doVoteResults: executing results: "+a+" | "+b+" | "+c);
NICK.polls.resultsListeners[a].callback(b,c,NICK.polls.resultsListeners[a].data)
};
NICK.polls.addListener=function(a,b,c){if(NICK.polls.resultsListeners==null){NICK.polls.resultsListeners={}
}NICK.polls.resultsListeners[a]={callback:b,data:c}
};
NICK.polls.removeListener=function(a){if(NICK.polls.resultsListeners==null){return
}NICK.polls.resultsListeners[a]=null
};
