/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
var UPX_userDefaultValue=function(){var d=0;
var a={postalCode:"",state:"",city:"",country:"",orga:"",usMilitary:false};
var c=[];
var b=function(){for(i=0;
i<c.length;
i++){c[i]()
}};
return{init:function(){if(d==0){d=-1;
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){var f=CQ_Analytics.UpxDataMgr.getProperty("userValueInit")
}if(f&&f=="true"){var e=CQ_Analytics.UpxDataMgr.getProperty("orga");
if(e){a.orga=e
}e=CQ_Analytics.UpxDataMgr.getProperty("stateProvince");
if(e){a.state=e
}e=CQ_Analytics.UpxDataMgr.getProperty("postalCode");
if(e){a.postalCode=UPX_userDefaultValue.validateZipCode(e)
}e=CQ_Analytics.UpxDataMgr.getProperty("city");
if(e){a.city=e
}e=CQ_Analytics.UpxDataMgr.getProperty("country");
if(e){a.country=e
}e=CQ_Analytics.UpxDataMgr.getProperty("usMilitary");
if(e){a.usMilitary=e
}d=1
}else{$.getJSON("/public/bin/servlet/altcloud/UserServlet.location.json?",{},function(g){if(g){if(g.orga){a.orga=g.orga;
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("orga",g.orga)
}}if(g.state){a.state=g.state;
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("stateProvince",g.state)
}}if(g.postal_code){a.postalCode=UPX_userDefaultValue.validateZipCode(g.postal_code);
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("postalCode",a.postalCode)
}}if(g.city){a.city=g.city;
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("city",g.city)
}}if(g.country){a.country=g.country;
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("country",g.country)
}}if(g.us_military.toString()!=null){a.usMilitary=g.us_military;
if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("usMilitary",g.us_military)
}}}if(CQ_Analytics.hasOwnProperty("UpxDataMgr")){CQ_Analytics.UpxDataMgr.setProperty("userValueInit","true")
}d=1;
b()
})
}}},getPostalCode:function(){return a.postalCode
},getState:function(){return a.state
},getCity:function(){return a.city
},getCountry:function(){return a.country
},getOrga:function(){return a.orga
},ready:function(e){if(d>0){e()
}else{c.push(e)
}},validateZipCode:function(f){if(!f||f.length<5){return""
}if(f.length>5){f=f.substr(0,5)
}var e=/^\d{5}$/;
if(e.test(f)){return f
}else{return""
}},isUsMilitary:function(){return a.usMilitary
}}
}();
COMMON_moduleInitializer.registerOverlay("COMMON_tabs_display",{functionName:"UPX_tabsDisplay",jsLocation:"/etc/designs/ac/js/component_tabsDisplay.js",runInit:true});
COMMON_moduleInitializer.registerOverlay("COMMON_flowPlayer",{functionName:"UPX_videoplayer",jsLocation:"/etc/designs/ac/js/component_videoplayer.js",runInit:true});
COMMON_moduleInitializer.registerOverlay("COMMON_componentSocialLinks",{functionName:"UPXComponentSocialLinks",jsLocation:"/etc/designs/ac/js/componentComponentSocialLinks.js",runInit:true});
var UPX_default=function(){var a={campaign:"campaign",clearfix:"clearFix",colctrl:"colctrl",ctaTop:"cta_top",emptyNode:"emptyNode",pullText:"pullText",sansSerifFontStack:"Calibri, 'Trebuchet MS', Helvetica, sans-serif",section:"section",staticMap:"staticMap",teaser:"teaser"};
return{init:function(){UPX_default.addClasses();
UPX_default.addFlashParams();
UPX_default.IETitleRenameFix()
},addClasses:function(){$("body").fontunstack(a.sansSerifFontStack);
$("body.machinepage_2col .tabsComponent .textimage:first-child, body.machinepage_3col .tabsComponent .textimage:first-child").addClass(COMMON_globalConstants.firstChild)
},addFlashParams:function(){$("div.socialfeeds div#ytvideos object").append('<param value="opaque" name="wmode">')
},IETitleRenameFix:function(){if($.browser&&$.browser.msie){var b=document.title;
document.attachEvent("onpropertychange",function(c){if(c.propertyName==="title"&&document.title!==b&&!$("body#coursespage").length){setTimeout(function(){document.title=b
},1)
}})
}}}
}();
var UPX_linkedComponents=function(){return{init:function(){if($("div.rfi").length){UPX_linkedComponents.bindRFIElements()
}},bindTuitioninfoInputs:function(a){var b=tuitionInfoObjects[a];
$(b.zipInput).unbind("keyup.UPX_linkedComponents").bind("keyup.UPX_linkedComponents",function(){if($(this).val().length===5){UPX_linkedComponents.updateZip($(this).val(),"t")
}});
$(b.areaInterestSelect).unbind("change.UPX_linkedComponents").bind("change.UPX_linkedComponents",function(){UPX_linkedComponents.updateAreaOfInterest(tuitionProgFinderProgAreaMap[$(this).val()],"t")
});
$(b.degreeLevelSelect).unbind("change.UPX_linkedComponents").bind("change.UPX_linkedComponents",function(){UPX_linkedComponents.updateDegreeLevel($(this).val(),"t")
})
},bindCampusfinderInputs:function(b){var a=campusFinderObjects[b];
$(a.zipCodeInput).unbind("keyup.UPX_linkedComponents").bind("keyup.UPX_linkedComponents",function(){var c=$(this).val();
if(c.length===5){$.getJSON("/public/bin/servlet/altcloud/zipcodecheckservlet.json/f/zip/"+c,{},function(d){if(d.valid){CQ_Analytics.UpxDataMgr.setProperty("postalCode",c);
CQ_Analytics.UpxDataMgr.setProperty("orga",d.orga);
CQ_Analytics.UpxDataMgr.setProperty("stateProvince",d.state);
CQ_Analytics.UpxDataMgr.setProperty("city",d.city);
UPX_linkedComponents.updateZip(c,"c")
}})
}})
},bindProgramfilterInputs:function(a){var b=programFilterObjects[a];
$(b.programZipInput).unbind("keyup.UPX_linkedComponents").bind("keyup.UPX_linkedComponents",function(){if($(this).val().length===5){UPX_linkedComponents.updateZip($(this).val(),"p")
}});
$(b.contEduZipInput).unbind("keyup.UPX_linkedComponents").bind("keyup.UPX_linkedComponents",function(){if($(this).val().length===5){UPX_linkedComponents.updateZip($(this).val(),"p")
}});
$(b.programAreaSel).unbind("change.UPX_linkedComponents").bind("change.UPX_linkedComponents",function(){UPX_linkedComponents.updateAreaOfInterest($(this).val(),"p")
});
$(b.programLevelSel).unbind("change.UPX_linkedComponents").bind("change.UPX_linkedComponents",function(){UPX_linkedComponents.updateDegreeLevel($(this).val(),"p")
})
},bindProgramExplorerElements:function(){$("ul#pf_degrees > li").unbind("click.UPX_linkedComponents").bind("click.UPX_linkedComponents",function(){var a=UPX_linkedComponents.util_extractValueFromClasses($(this).attr("class"));
if(a){UPX_linkedComponents.updateDegreeLevel(a,"pe")
}});
$("ul#explorerAreaDrop > li").unbind("click.UPX_linkedComponents").bind("click.UPX_linkedComponents",function(){var a=UPX_linkedComponents.util_extractValueFromClasses($(this).attr("class"));
if(a){UPX_linkedComponents.updateAreaOfInterest(a,"pe")
}});
$("ul#ai_options > li").unbind("click.UPX_linkedComponents").bind("click.UPX_linkedComponents",function(){var a=UPX_linkedComponents.util_extractValueFromClasses($(this).attr("class"));
if(a){UPX_linkedComponents.updateAreaOfInterest(a,"pe")
}});
$("form#explorerZipForm input#explorerZipInput").unbind("keyup.UPX_linkedComponents").bind("keyup.UPX_linkedComponents",function(){if($(this).val().length===5){UPX_linkedComponents.updateZip($(this).val(),"pe")
}})
},bindRFIElements:function(){$("div.rfi input#postalCode").unbind("keyup.UPX_linkedComponents").bind("keyup.UPX_linkedComponents",function(){if($(this).val().length===5){UPX_linkedComponents.updateZip($(this).val(),"rfi")
}});
$("div.rfi select#areaInterest").unbind("change.UPX_linkedComponents").bind("change.UPX_linkedComponents",function(){switch($(this).val()){case"1":var a="business-and-management";
break;
case"2":var a="criminal-justice-and-security";
break;
case"3":var a="education";
break;
case"4":var a="human-services";
break;
case"5":var a="nursing-and-health-care";
break;
case"6":var a="psychology";
break;
case"7":var a="technology";
break
}UPX_linkedComponents.updateAreaOfInterest(a,"rfi")
})
},updateAreaOfInterest:function(a,e){if(e!="t"&&typeof tuitionInfoObjects!="undefined"){var c=tuitionProgFinderProgAreaMap[a];
if(!c){c=CQ_Analytics.UpxDataMgr.getProperty("tuition_prog_area")
}if(!c){c=""
}for(var i in tuitionInfoObjects){if(i!=="remove"&&i!=="indexOf"){var d=tuitionInfoObjects[i];
$(d.areaInterestSelect).val(c)
}}}if(e!="p"&&typeof programFilterObjects!="undefined"){for(var b in programFilterObjects){if(b!=="remove"&&b!=="indexOf"){var f=programFilterObjects[b];
$(f.programAreaSel).val(a)
}}}if($("div.program_explorer").length){var g=rfiCookieValueMap[a];
UPX_programExplorer.ExAreaInterest.changeArea(g);
UPX_programExplorer.ExBackground.fadeBG(g);
$("#explorerArea").mouseleave();
if(e=="pe"&&typeof tuitionInfoObjects!="undefined"){for(var i in tuitionInfoObjects){if(i!=="remove"&&i!=="indexOf"){var d=tuitionInfoObjects[i];
if(d.infoDivWrapper.length){UPX_tuitionInfo.displayTuitionInfo(d)
}}}}}switch(a){case"business-and-management":var h="1";
break;
case"criminal-justice-and-security":var h="2";
break;
case"education":var h="3";
break;
case"human-services":var h="4";
break;
case"nursing-and-health-care":case"nursing":case"health-care":var h="5";
break;
case"psychology":var h="6";
break;
case"technology":var h="7";
break
}$("div.rfi select#areaInterest").val(h)
},updateDegreeLevel:function(e,a){if(typeof tuitionInfoObjects!="undefined"){for(var b in tuitionInfoObjects){if(b!=="remove"&&b!=="indexOf"){var d=tuitionInfoObjects[b];
$(d.degreeLevelSelect).val(e)
}}}if(typeof programFilterObjects!="undefined"){for(var c in programFilterObjects){if(c!=="remove"&&c!=="indexOf"){var f=programFilterObjects[c];
$(f.programLevelSel).val(e)
}}}if($("div.program_explorer").length){$("#pf_degrees li.active").removeClass("active");
UPX_programExplorer.ExUser.degree_level.level=e;
CQ_Analytics.UpxDataMgr.setProperty("degreeInterest",e);
UPX_programExplorer.ExPrograms.setupPrograms(e);
$("#pf_degrees li."+e).addClass("active");
if(a=="pe"&&typeof tuitionInfoObjects!="undefined"){for(var b in tuitionInfoObjects){if(b!=="remove"&&b!=="indexOf"){var d=tuitionInfoObjects[b];
if(d.infoDivWrapper.length){UPX_tuitionInfo.displayTuitionInfo(d)
}}}}}},updateZip:function(f,a){if(a!=="t"&&typeof tuitionInfoObjects!="undefined"){for(var d in tuitionInfoObjects){if(d!=="remove"&&d!=="indexOf"){UPX_tuitionInfo.updateZip(f,d)
}}}if(a!=="p"&&typeof programFilterObjects!="undefined"){for(var e in programFilterObjects){if(e!=="remove"&&e!=="indexOf"){UPX_programFilter.updateZip(f,e)
}}}if(typeof campusFinderObjects!="undefined"){for(var g in campusFinderObjects){var b=campusFinderObjects[g];
if(g!=="remove"&&g!=="indexOf"){$(b.zipCodeInput).val(f)
}}}if(a!=="pe"){if($("div.program_explorer").length){$("input#explorerZipInput").val(f);
UPX_programExplorer.validateZipCode()
}}$("div.rfi input#postalCode").val(f)
},util_extractValueFromClasses:function(b){var c=false;
var d=b.split(" ");
for(var a=0;
a<d.length;
a++){if(d[a]!=="active"&&d[a]!=="hover"){c=d[a]
}}return c
}}
}();
$(document).ready(function(){UPX_userDefaultValue.init();
UPX_default.init();
UPX_topNav.init();
COMMON_moduleInitializer.initializeQueuedModules();
COMMON_moduleInitializer.initializeMiscModules()
});
var theCookieName="rf_prepop";
function setCookie(g,d,e,i,f,b){if(!f){var a=window.location.hostname;
var c=a.substring(a.indexOf("://")+3);
if(c.indexOf(".")!=c.lastIndexOf(".")){var f=c.substring(c.indexOf("."))
}}if(!i){var i="/"
}var h=g+"="+escape(d)+((e)?"; expires="+e.toGMTString():"")+((i)?"; path="+i:"")+((f)?"; domain="+f:"")+((b)?"; secure":"");
document.cookie=h
}function getCookie(f){var b=document.cookie;
var e=f+"=";
var d=b.indexOf("; "+e);
if(d==-1){d=b.indexOf(e);
if(d!=0){return null
}}else{d+=2
}var a=b.indexOf(";",d);
if(a==-1){a=b.length
}var c=unescape(b.substring(d+e.length,a));
return c
}function deleteCookie(e,d,c){var a=new Date();
fixDate(a);
var b=new Date(a.getTime()-28*24*60*60*1000);
if(getCookie(e)){document.cookie=e+"="+((d)?"; path="+d:"")+((c)?"; domain="+c:"")+"; expires="+b.toGMTString()
}}function fixDate(b){var c=new Date(0);
var a=c.getTime();
if(a>0){b.setTime(b.getTime()-a)
}}function returnUrlAttributeValue(b){var d=document.location.href;
if(d.indexOf("?")!=-1){var f=d.substring(d.indexOf("?")+1,d.length);
var e=f.split("&");
for(var c=0,a=e.length;
c<a;
c++){curItem=e[c];
if(curItem.substring(0,curItem.indexOf("=")).toLowerCase()==b.toLowerCase()){return curItem.substring(curItem.indexOf("=")+1,curItem.length);
break
}}return""
}else{return""
}}function returnCookieAttributeValue(f,c){var e=getCookie(f);
var b=(e)?e.split("&"):"";
for(var d=0,a=b.length;
d<a;
d++){curItem=b[d];
if(curItem.substring(0,curItem.indexOf("=")).toLowerCase()==c.toLowerCase()){return curItem.substring(curItem.indexOf("=")+1,curItem.length);
break
}}return""
}function setCookieValue(o,l){var p=l.split("=");
CQ_Analytics.UpxDataMgr.setProperty(p[0],p[1]);
var g=getCookie(o);
var f=(g)?"&":"";
var c=false;
if(g!=null){var b=l.substring(0,l.indexOf("="));
var a=g.split("&");
if(a.length>0){for(var e=0,d=a.length;
e<d;
e++){var n=a[e].split("=")[0];
if(n===b){c=true
}}}if(!c){setCookie(o,g+f+l,"","/");
return
}else{if(a.length>0){var k=l.split("=")[0];
var m=l.split("=")[1];
var h="";
for(var e=0,d=a.length;
e<d;
e++){if(a[e].split("=").length>1){n=a[e].split("=")[0];
if(n==k){h=h+n+"="+m
}else{h=h+a[e]
}if(e+1!=d){h=h+"&"
}}}if(h!=""){setCookie(o,h,"","/")
}}}}else{setCookie(o,l,"","/")
}}function returnPopulatedValue(d,b,a){var c=returnUrlAttributeValue(b);
if(c!=""){if(b=="CLPhone"&&!returnSimplePhoneCheck(c)){return a
}return c
}else{strCookieVal=returnCookieAttributeValue(d,b);
if(strCookieVal==""&&a){return a
}else{return strCookieVal
}}}function returnSimplePhoneCheck(d){var c=/^\d\d\d\.\d\d\d\.\d\d\d\d$/;
var b=/^\d\d\d\-\d\d\d\-\d\d\d\d$/;
var a=/^\d-\d\d\d\-\d\d\d\-\d\d\d\d$/;
if(d.match(c)||d.match(b)||d.match(a)){return true
}else{return false
}}function addQueryParamsToCookie(f){var c=document.location.href;
if(c.indexOf("?")!=-1){var e=c.substring(c.indexOf("?")+1,c.length);
var d=e.split("&");
for(var b=0,a=d.length;
b<a;
b++){curItem=d[b];
setCookieValue(f,curItem)
}}}function cookieArgSpooler(e,a){var d=a.split(",");
for(var b=0,c=d.length;
b<c;
b++){thisValue=returnUrlAttributeValue(d[b]);
if(thisValue==""&&d[b].indexOf("=")!=-1){thisValue=d[b].substring(d[b].indexOf("=")+1,d[b].length)
}if(returnUrlAttributeValue(d[b])!=""){setCookieValue(e,d[b]+"="+thisValue)
}}}function popup(j,e,b,i,g,m,k,l,f,h,d,n){if(m){i=(screen.width-e)/2;
g=(screen.height-b)/2
}var a="location="+n+",scrollbars="+l+",menubar="+f+",toolbar="+h+",resizable="+d+",left="+i+",top="+g+",width="+e+",height="+b;
var c=window.open(j,k,a);
c.focus()
}function openChat(i,c,a,h,f,l,j,k,e,g,b,o,d,p){if(parent==window){var n=p/100;
var m=Math.random();
if(m<=n){window.location=d+"?uri="+location.pathname
}else{popup(i,c,a,h,f,l,j,k,e,g,b,o)
}}}function openNewChat(){if(parent==window){window.location=chatUrl+"?uri="+location.pathname
}}function retainThisObject(a,b){return function(){return b.apply(a,arguments)
}
}function trimString(a){if(a.trim){return a.trim()
}else{return a.replace(/(^\s*)|(\s*$)/g,"")
}};
var rfiCookieValueMap={"arts-and-sciences":"9","business-and-management":"1","criminal-justice-and-security":"2",education:"3","nursing-and-health-care":"5","human-services":"4",psychology:"6",technology:"7"};
var rfiProgramValueIDMap={"1":"business-and-management","2":"criminal-justice-and-security","3":"education","4":"human-services","5":"nursing-and-health-care","6":"psychology","7":"technology","9":"arts-and-sciences"};
var tuitionProgFinderProgAreaMap={"arts-and-sciences":"arts-and-sciences","business-and-management":"business-and-management","criminal-justice-and-security":"criminal-justice-and-security",education:"education",nursing:"nursing-and-health-care","health-care":"nursing-and-health-care","human-services":"human-services",psychology:"psychology",technology:"technology"};
var formatRfiMap={Campus:"ground",Online:"online"};
function setCookieVals(d,c,a){var b=new Date();
b.setDate(b.getDate()+90);
setRfiCookieVal(d,c,a);
setCookie("pf_"+d,c,b,"/")
}function setRfiCookieVal(f,e,a){var d=new Date();
d.setDate(d.getDate()+90);
var c=mapToRfiCookieName(f);
var b=mapToRfiCookieValue(c,e);
if(c&&c.length>0&&b&&b.length>0){setCookieValue(a,c+"="+b)
}}function setCQAnalyticsCookieVal(d,c){var b=mapToRfiCookieName(d);
var a=mapToRfiCookieValue(b,c);
if(b&&b.length>0&&a&&a.length>0){CQ_Analytics.UpxDataMgr.setProperty(b,a)
}}function clearPfCookieVal(b){var a=new Date();
a.setDate(a.getDate()+90);
setCookie("pf_"+b,"",a,"/")
}function clearCookieVals(b,a){clearPfCookieVal(b);
setRfiCookieVal(b,"",a)
}function getCookieVal(b){var a=null;
a=getCookie("pf_"+b);
return a
}function allowedInNumberInput(a){var b=true;
if(a.which>47&&a.which<58){}else{if(a.which==8){}else{if(a.which==0){}else{b=false
}}}return b
}function mapToRfiCookieName(a){switch(a){case"learning_format":return"learningFormat";
break;
case"program_area":return"areaOfInterest";
break;
default:return a
}return a
}function mapToRfiCookieValue(a,c){switch(a){case"learningFormat":switch(c){case"ground":return"Campus";
break;
case"online":return"Online";
break;
default:return c
}break;
case"areaOfInterest":if(c==="nursing"||c==="health-care"){c="nursing-and-health-care"
}var b=rfiCookieValueMap[c];
if(b){return b
}else{return""
}break;
default:return c
}return c
};
var referer=document.referrer;
var e=/^((\w+):\/\/)([^:\/\s]+)/;
if(referer!=null&&referer.length>0&&referer.match(e)){var host=RegExp.$3;
var queryName="";
var engine="";
if(host.indexOf("google")>0||host.indexOf("bing")>0){engine=host.split(".")[1];
queryName="q"
}else{if(host.indexOf("yahoo")>0){engine="yahoo";
queryName="p"
}else{if(host.indexOf("aol")>0){engine="aol";
queryName="query"
}}}var queryString=referer.substring(referer.indexOf("?"));
if(referer.length>0){var query;
var params=queryString.substring(1).split("&");
var found=false;
var count=0;
var pattern=/^(\w+)=(\S+)$/;
while(!found&&count<params.length){if(params[count].match(pattern)){var key=RegExp.$1;
var value=RegExp.$2;
if(key.match(queryName)){found=true;
CQ_Analytics.UpxDataMgr.setProperty("referring_domain",escape(host));
CQ_Analytics.UpxDataMgr.setProperty("referring_url",escape(referer));
CQ_Analytics.UpxDataMgr.setProperty("referring_engine",escape(engine));
if(engine!=""){CQ_Analytics.UpxDataMgr.setProperty("referring_term",escape(value))
}}}count++
}}}var pageURL=document.location.href;
if(pageURL.indexOf("?")!=-1){var strQuery=pageURL.substring(pageURL.indexOf("?")+1,pageURL.length);
strQuery=strQuery.indexOf("#")!=-1?strQuery.substring(0,strQuery.indexOf("#")):strQuery;
var arrQuery=strQuery.split("&");
for(var i=0,v=arrQuery.length;
i<v;
i++){var arrNameValue=arrQuery[i].split("=");
if(arrNameValue.length>1&&arrNameValue[1].length>0){CQ_Analytics.UpxDataMgr.setProperty(arrNameValue[0],arrNameValue[1])
}}};
function isAuthenticated(){var a=false;
var b=runProfileRequest("authenticated",null,null);
if(b.error==null){if(b.authenticated=="true"){a=true
}}return a
}function profileExistsByEmail(c){var a=false;
var b=runProfileRequest("exists_by_email","email="+c,null);
if(b.error==null){if(b.exists=="true"){a=true
}}return a
}function profileExistsByScreenName(b){var a=false;
var c=runProfileRequest("exists_by_screen_name","screen_name="+b,null);
if(c.error==null){if(c.exists=="true"){a=true
}}return a
}function profileExists(b,d){var a=false;
var c=runProfileRequest("exists","screen_name="+b+"&email="+d,null);
if(c.error==null){if(c.exists=="true"){a=true
}}return a
}function authenticateUser(b,c,d){var a=runProfileRequest("login","email="+b+"&pw="+c,d);
return a
}function addProfile(k,h,f,j,c,l,b,g,m,a,i,e){var d="screen_name="+k+"&email="+h+"&pw="+f+"&postal_code="+j+"&profile_group="+c;
if(l!=null){d+="&alt_email="+l
}if(b!=null){d+="&first_name="+b
}if(g!=null){d+="&last_name="+g
}if(m!=null){d+="&middle_name="+m
}if(a!=null){d+="&photo_ref="+a
}if(i!=null){d+="&self_desc="+i
}var n=runProfileRequest("add",d,e);
return n
}function addPublicProfile(a,c,e,d,f){var b=addProfile(a,c,e,d,"public",null,null,null,null,null,null,f);
return b
}function addFacultyProfile(a,c,e,d,f){var b=addProfile(a,c,e,d,"faculty",null,null,null,null,null,null,f);
return b
}function addStudentProfile(a,c,e,d,f){var b=addProfile(a,c,e,d,"students",null,null,null,null,null,null,f);
return b
}function addAlumniProfile(a,c,e,d,f){var b=addProfile(a,c,e,d,"alumni",null,null,null,null,null,null,f);
return b
}function getProfile(b){var a=runProfileRequest("get",null,b);
return a
}function addArticle(c,b,a,f,e){var d=runProfileRequest("add_article","header_image_ref="+escape(c)+"&title="+escape(b)+"&text="+escape(a)+"&lead_in_text"+escape(f),e);
return d
}function addComment(d,b,a,e){var c=runProfileRequest("add_comment","article_ref="+escape(d)+"&title="+escape(b)+"&text="+escape(a),e);
return c
}function getArticles(b,c){var a=runProfileRequest("get_articles",(b?("email="+b):null),c);
return a
}function getArticlesByCriteria(c,g,e,a,f){var d="";
d+=addArrayParams("category",g);
if(d.length>0){d+="&"
}d+=addArrayParams("campus",e);
if(d.length>0){d+="&"
}d+=addArrayParams("tag",a);
if(c!=null){if(d.length>0){d+="&"
}d+="email="+c
}var b=runProfileRequest("get_articles",d,f);
return b
}function getComments(b,c){var a=runProfileRequest("get_comments","article_ref="+b,c);
return a
}function addArticleCriteria(d,g,b,a,f){var e="";
e+=addArrayParams("category",g);
if(e.length>0){e+="&"
}e+=addArrayParams("campus",b);
if(e.length>0){e+="&"
}e+=addArrayParams("tag",a);
if(e.length>0){e+="&"
}e+="article_ref="+d;
var c=runProfileRequest("add_article_criteria",e,f);
return c
}function executeCommentApproval(e,c,d){var b="";
b+=addArrayParams("approval",e);
if(b.length>0){b+="&"
}b+=addArrayParams("disapproval",c);
var a=runProfileRequest("exec_comment_approval",b,d);
return a
}function addArrayParams(b,a){var c="";
if(a!=null){for(idx=0;
idx<a.length;
idx++){if(c.length>0){c+="&"
}c+=b+"="+a[idx]
}}return c
}function runProfileRequest(strReqName,strParams,fnCallback){var strUrl="/bin/ac/servlet/ProfileServlet."+strReqName+".json";
var xhr=createXHR();
var bAsync=(fnCallback!=null);
var resp=null;
if(!strParams){strParams=""
}xhr.open("POST",strUrl,bAsync);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.setRequestHeader("Content-length",strParams.length);
xhr.setRequestHeader("Connection","close");
if(bAsync){xhr.onreadystatechange=function(){if(xhr.readyState==4){try{resp=eval("("+xhr.responseText+")")
}catch(error){resp=eval("("+{error:error}+")")
}fnCallback(resp)
}};
xhr.send(strParams)
}else{xhr.send(strParams);
try{resp=eval("("+xhr.responseText+")")
}catch(error){resp={error:error}
}}return resp
};
var UPX_topNav=function(){var b={};
var a={highlighted:"highlighted",highlightedPrev:"highlightedPrev"};
return{init:function(){UPX_topNav.cacheVariables();
UPX_topNav.addClasses();
UPX_topNav.bindTabLinks()
},addClasses:function(){$("ul#topNavTabLinks li.highlighted").prev().addClass(a.highlightedPrev);
$("ul#topNavTabLinks > li:first").addClass(COMMON_globalConstants.firstChild);
$("ul#topNavTabLinks > li:last").addClass(COMMON_globalConstants.lastChild)
},bindTabLinks:function(){var e=$("ul#topNavTabLinks > li a.tabLink");
var d=$("ul#topNavTabLinks > li");
e.unbind("click.UPX_topNav").bind("click.UPX_topNav",function(h){var i=$(this);
var f=e.index(this);
var g=i.parents("li");
var h=h||window.event;
h.preventDefault();
$("#topNavTabContentContainer > div.tabContent").removeClass(COMMON_globalConstants.current);
if(g.hasClass(COMMON_globalConstants.current)){UPX_topNav.updateTabListItemClasses(d)
}else{UPX_topNav.updateTabListItemClasses(d);
g.addClass(COMMON_globalConstants.current);
g.prev().addClass(COMMON_globalConstants.currentPrev);
g.next().addClass(COMMON_globalConstants.currentNext);
$($("#topNavTabContentContainer > div.tabContent").get(f)).addClass(COMMON_globalConstants.current)
}UPX_siteSearch.closeSearch()
});
var c=$("div#topNavTabContentContainer > div.tabContent div.closeTabLink a");
c.unbind("click.UPX_topNav").bind("click.UPX_topNav",function(j){var i=$(this);
var f=$("div#topNavTabContentContainer > div.tabContent").index($("#topNavTabContentContainer > div.current"));
var j=j||window.event;
j.preventDefault();
i.parents("div.tabContent").removeClass(COMMON_globalConstants.current);
var h=$(d.get(f));
h.removeClass(COMMON_globalConstants.current);
h.removeClass(COMMON_globalConstants.currentPrev);
h.prev().removeClass(COMMON_globalConstants.currentPrev);
h.removeClass(COMMON_globalConstants.currentFirstChild);
h.removeClass(COMMON_globalConstants.currentLastChild);
var g=$(d.get(b.initialHighlightedIndex));
g.addClass(a.highlighted);
g.prev().addClass(a.highlightedPrev)
})
},cacheVariables:function(){b.initialHighlightedIndex=$("ul#topNavTabLinks > li").index($("ul#topNavTabLinks > li.highlighted"))
},closeTabs:function(){$("ul#topNavTabLinks > li").removeClass(COMMON_globalConstants.current);
$("ul#topNavTabLinks > li:first").removeClass(COMMON_globalConstants.currentFirstChild);
$("ul#topNavTabLinks > li:last").removeClass(COMMON_globalConstants.currentLastChild);
$("ul#topNavTabLinks > li").removeClass(COMMON_globalConstants.currentPrev);
$("ul#topNavTabLinks > li").removeClass(COMMON_globalConstants.currentNext);
$("div#topNavTabContentContainer > div.tabContent").removeClass(COMMON_globalConstants.current)
},updateTabListItemClasses:function(c){c.each(function(){$(this).removeClass(a.highlighted);
$(this).removeClass(a.highlightedPrev);
$(this).removeClass(COMMON_globalConstants.current);
$(this).removeClass(COMMON_globalConstants.currentPrev);
$(this).removeClass(COMMON_globalConstants.currentNext)
})
}}
}();
var UPX_autoComplete=function(){var i={DOWN:40,ENTER:13,ESCAPE:27,NUMPAD_ENTER:108,TAB:9,UP:38};
var e;
var f;
var c="";
var a;
var k;
var b;
var g=function(l){a.find("a.ac_over").removeClass("ac_over");
l.addClass("ac_over");
k.val(l.text())
};
var j=function(){if(b&&typeof b=="function"){b(k.val())
}};
var d=function(l){$(document).on("mouseover.UPX_autoComplete","div#ac_results a",function(m){g($(this))
});
$(document).on("click.UPX_autoComplete","div#ac_results a",function(m){m.preventDefault();
j()
});
k.bind("keydown.UPX_autoComplete",function(n){switch(n.keyCode){case i.UP:n.preventDefault();
if(a.is(":parent")){var m=a.find("a.ac_over");
if(m.length>0&&m.prev().length>0){nextItem=m.prev()
}else{nextItem=a.find("a:last")
}g(nextItem)
}break;
case i.DOWN:n.preventDefault();
if(a.is(":parent")){var m=a.find("a.ac_over");
if(m.length>0&&m.next().length>0){nextItem=m.next()
}else{nextItem=a.find("a:first")
}g(nextItem)
}break;
case i.ENTER:case i.NUMPAD_ENTER:n.preventDefault();
clearTimeout(e);
j();
a.hide();
a.find("a.resultItem").remove();
break;
case i.TAB:return;
case i.ESCAPE:clearTimeout(e);
a.hide();
a.find("a.resultItem").remove();
break;
default:clearTimeout(e);
e=setTimeout(function(){if(c!=k.val()){UPX_autoComplete.search(l)
}},l.delay);
break
}});
k.bind("blur.UPX_autoComplete",function(m){clearTimeout(f);
f=setTimeout(function(){a.hide();
a.find("a.resultItem").remove()
},150)
})
};
var h;
return{init:function(l){k=l.searchInput;
b=l.resultFn;
inputOffset=k.offset();
divWidth=k.outerWidth()-2;
divTop=inputOffset.top+k.outerHeight();
divLeft=inputOffset.left;
if($("div#ac_results").length===0){h=$("div#siteSearchContainer > form");
if($("body.alternate").length){h=$("div#alternatesiteSearchContainer > form")
}a=$("<div></div>").attr("id","ac_results").css({position:"absolute",width:divWidth,display:"none"}).appendTo(h);
$("div#ac_results").bgiframe();
d(l)
}},search:function(l){c=k.val();
$.ajax({url:l.url,dataType:"jsonp",data:{q:'topic:"'+c+'"',rows:10,indent:"on",sort:"topic_count desc"},success:function(m){UPX_autoComplete.displayResults($.map(m.response.docs,function(o,n){return o.topic
}))
}})
},displayResults:function(l){a.find("a.resultItem").remove();
$.each(l,function(m,n){n=$("<span />").html(n).text();
$('<a href="#"></a>').attr("class","resultItem").text(n).appendTo(a)
});
if(l.length>0){h.find("div#ac_results").show()
}else{h.find("div#ac_results").hide()
}}}
}();
var utils=(function(){var c=null,b={funcs:[],serviceCalled:false,serviceReturned:false},a={funcs:[],serviceCalled:false,serviceReturned:false,authenticated:null};
function d(){var e;
if(a.authenticated!==null){while(a.funcs.length>0){e=a.funcs.pop();
e(a.authenticated)
}}}return{createCookie:function(f,l,m,n,k,e,g){if(!f&&typeof f!="string"){return false
}var j=f+"="+l;
if(m){var i=new Date();
m=parseInt(m);
i.setTime(i.getTime()+(m*24*60*60*1000));
var h="; expires="+i.toGMTString()
}else{var h=""
}j+=h;
n=(n)?("; path="+n):("; path=/");
j+=n;
k=(k)?("; domain="+k):"";
j+=k;
e=(e)?("; secure"):"";
j+=e;
document.cookie=j;
return true
},getCookie:function(f,h){var j=f+"=";
var e=document.cookie.split(h||";");
for(var g=0;
g<e.length;
g++){var k=e[g];
while(k.charAt(0)==" "){k=k.substring(1,k.length)
}if(k.indexOf(j)==0){return k.substring(j.length,k.length)
}}return null
},deleteCookie:function(e){utils.createCookie(e,"",-1,"","",true)
},checkProfileService:function(h){if(document.location.protocol!=="https:"){return false
}if(!b.serviceReturned){b.funcs.push(h);
if(!b.serviceCalled){b.serviceCalled=true;
try{ProfileService.init();
ProfileService.get(function(){CQ_Analytics.UpxDataMgr.init();
b.serviceReturned=true;
while(b.funcs.length>0){var e=b.funcs.pop();
e()
}},b)
}catch(g){$("div.tuitionCostEstimateSummary").ajaxError(function(k,l,j,i){if(j.dataType=="script"){$(this).text("Triggered ajaxError handler.")
}});
var f="/profile/js/profile.js";
$.getScript(f,function(e,i){setTimeout("utils.profileServiceCallback()",1000)
})
}}}else{h()
}},profileServiceCallback:function(){ProfileService.init();
ProfileService.get(function(){CQ_Analytics.UpxDataMgr.init();
b.serviceReturned=true;
while(b.funcs.length>0){var e=b.funcs.pop();
e()
}},b)
},isAuthenticated:function(f){var e;
a.funcs.push(f);
if(!a.serviceReturned){if(!a.serviceCalled){a.serviceCalled=true;
e="https://"+location.host+"/auth.is_authenticated.json?callback=?";
$.getJSON(e,function(g){if(g.authenticated==="true"){a.authenticated=true
}else{a.authenticated=false
}a.serviceReturned=true;
d()
})
}}else{d()
}},getQueryVariable:function(f){if(c==null){c=decodeURIComponent(location.search.substring(1))
}var j=c.split("&");
for(var g=0;
g<j.length;
g++){if(!j[g]){continue
}var h=j[g];
var e=h.indexOf("=");
var k=h.substr(0,e);
if(k===f){return h.substr(e+1)
}}return null
},parseStringToObj:function(j,p){if(!j){return null
}var l=j.split(p||"&"),h={},k,f,o,n,e=l.length,m=/^([^=]*)[=](.*)$/i,g=0;
for(;
g<e;
g++){if(!l[g]){continue
}k=l[g];
f=k.match(m);
if(f){o=f[1];
n=decodeURIComponent(f[2]);
h[o]=n
}}return h
},resizeIframe:function(f,h,k){var g=$("#"+k);
var i=g.contents().find("body");
var e=h?h:i.width();
var j=f?f:i.height();
g.animate({height:j,width:e},{duration:200,easing:"swing"})
},escapejQuerySelector:function(e){if(e){return e.replace(/([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g,"\\$1")
}else{return e
}},replaceUnicodeCharactersForDisplay:function(e){if(e){e=e.replace("\u8220",'"');
e=e.replace("\u8221",'"');
e=e.replace("\u8216","'");
e=e.replace("\u8217","'");
e=e.replace("\uFFFD","")
}return e
}}
})();
utils.linkify=(function(){var t="[a-z\\d.-]+://",w="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",B="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",q="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",y="(?:"+B+q+"|"+w+")",p="(?:[;/][^#?<>\\s]*)?",z="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",A="\\b"+t+"[^<>\\s]+",D="\\b"+y+p+z+"(?!\\w)",r="mailto:",u="(?:"+r+")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"+y+z+"(?!\\w)",s=new RegExp("(?:"+A+"|"+D+"|"+u+")","ig"),x=new RegExp("^"+t,"i"),C={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b?:":"b?9"},v={callback:function(a,b){return b?'<a href="'+b+'" title="'+b+'">'+a+"</a>":a
},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};
return function(m,h){h=h||{};
var k,l,g,f,j="",n=[],F,o,d,i,c,b,e,a;
for(l in v){if(h[l]===undefined){h[l]=v[l]
}}while(k=s.exec(m)){g=k[0];
o=s.lastIndex;
d=o-g.length;
if(/[\/:]/.test(m.charAt(d-1))){continue
}do{i=g;
a=g.substr(-1);
e=C[a];
if(e){c=g.match(new RegExp("\\"+e+"(?!$)","g"));
b=g.match(new RegExp("\\"+a,"g"));
if((c?c.length:0)<(b?b.length:0)){g=g.substr(0,g.length-1);
o--
}}if(h.punct_regexp){g=g.replace(h.punct_regexp,function(E){o-=E.length;
return""
})
}}while(g.length&&g!==i);
f=g;
if(!x.test(f)){f=(f.indexOf("@")!==-1?(!f.indexOf(r)?"":r):!f.indexOf("irc.")?"irc://":!f.indexOf("ftp.")?"ftp://":"http://")+f
}if(F!=d){n.push([m.slice(F,d)]);
F=o
}n.push([g,f])
}n.push([m.substr(F)]);
for(l=0;
l<n.length;
l++){j+=h.callback.apply(window,n[l])
}return j||m
}
})();
if(getCookie("iri")){var strCookieValue=getCookie("iri");
var strAptiNetURL="https://partner.aptimus.com/AptiNet/OrderAction?poid=15748_79620_7_76&page=orderconfirm&output=text/xml&"+strCookieValue.substring(1,strCookieValue.length-1);
$.get(strAptiNetURL);
deleteCookie("iri")
};
var UPXProfileLightbox=(function(){var l;
var k;
var a;
var f;
var h;
var b=false;
var e={closeOnClick:false,oneInstance:false,fixed:false,mask:{color:null}};
var d=[];
var j=[];
var i=[];
var c=[];
var g=81;
return{init:function(n){l=$("#profileLightboxTrigger");
k=$("#profileLightboxIframe");
f=$("#profileLightboxLoad");
h=$("#profileLightboxLoadImg");
e.target=$("#profileLightboxContent");
l.overlay(e);
a=l.overlay();
b=true;
d=n.actions;
j=n.urls;
i=n.heights;
c=n.widths;
var p=utils.getQueryVariable("profileAction");
if(p!==null&&p.length>0){var o={action:p};
var m=utils.getQueryVariable("profileRedirect");
if(m&&m.length>0){o.redirectUrl=decodeURIComponent(m)
}UPXProfileLightbox.open(o)
}},open:function(n){var o="";
if(n.redirectUrl&&n.redirectUrl.length>0){o="?redirect="+encodeURIComponent(n.redirectUrl)
}var m=$.inArray(n.action,d);
if(m<0){return
}k.attr("src",location.protocol+"//"+location.host+j[m]+o);
f.css({top:(i[m]-g)/2,width:c[m]});
f.addClass("show");
k.css("visibility","hidden");
k.bind("load.UPXProfileLightbox",(function(){f.removeClass("show");
$(this).css("visibility","visible");
$(this).contents().find('input[type="text"]:first').focus()
}));
if(a.isOpened()){k.animate({height:i[m],width:c[m]},{duration:200,easing:"swing"})
}else{k.css({height:i[m],width:c[m]});
a.load()
}},close:function(){a.close()
},resizeIframe:function(n,o){var p=k.contents().find("body");
var m=o?o:p.width();
var q=n?n:p.height();
k.animate({height:q,width:m},{duration:200,easing:"swing"})
},showThrobber:function(){f.addClass("show");
k.css("visibility","hidden")
}}
})();
var UPXHeaderAlternate=function(){var g=undefined,c=undefined,e=undefined,f=undefined;
function a(){c.removeClass("hover");
$("#flyoutWrapper").slideUp("fast",function(){e.addClass("hide")
});
$("#flyoutWrapper img.flyoutArrow").slideUp(55)
}function b(){c=$(f).addClass("hover");
var h="#"+d();
e=$(h).removeClass("hide");
$("#flyoutWrapper").slideDown(50);
$("#flyoutWrapper").find("mg.flyoutArrow").slideDown(50)
}function d(){var h=$(f).children("a").prop("class");
if(h!==undefined){h=h.slice(0,h.length-3);
return h
}else{return""
}}return{init:function(){if($("#pageHeader").hasClass("editMode")){UPXHeaderAlternate.bindEditModeHandlers()
}else{UPXHeaderAlternate.bindHandlers()
}},bindHandlers:function(){$("#MainNav li.flyoutNav").bind("click",function(h){h.preventDefault()
});
$("#MainNav li.flyoutNav").bind("mouseenter",function(){if(undefined!=g){clearTimeout(g)
}f=this;
g=setTimeout(b,50)
});
$("#MainNav li.flyoutNav").bind("mouseleave",function(){if(undefined!=g){clearTimeout(g)
}if(c){g=setTimeout(a,200)
}});
$("#flyoutWrapper").bind("mouseenter",function(){if(undefined!=g){clearTimeout(g)
}if(c){g=setTimeout(b,50)
}});
$("#flyoutWrapper").bind("mouseleave",function(){if(undefined!=g){clearTimeout(g)
}if(c){g=setTimeout(a,200)
}});
$("a#chatLive").bind("click",function(){cmCreateManualLinkClickTag("?cm_sp=CTA-_-Chat Live-_-Header","Chat Live",strCmTitle);
pageTracker._trackPageview("/virtual/link/CTA/Chat Live/Header");
openChat("/chat.html",500,400,0,0,true,"UOPX","yes","no","no","yes","no","https://www.phoenix.edu/chat/chatContainer.jsp",100)
})
},bindEditModeHandlers:function(){$("#MainNav").find("li.flyoutNav").children("a").bind("click",function(k){k.preventDefault();
var i=$(this),j=i.prop("class"),h=j.slice(0,j.length-3);
$("#flyoutWrapper").toggle().find("#"+h).toggleClass("hide")
})
}}
}();
$(function(){UPXHeaderAlternate.init()
});
