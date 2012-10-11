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
},updateAreaOfInterest:function(g,c){if(c!="t"&&typeof tuitionInfoObjects!="undefined"){var e=tuitionProgFinderProgAreaMap[g];
if(!e){e=CQ_Analytics.UpxDataMgr.getProperty("tuition_prog_area")
}if(!e){e=""
}for(var d in tuitionInfoObjects){if(d!=="remove"&&d!=="indexOf"){var f=tuitionInfoObjects[d];
$(f.areaInterestSelect).val(e)
}}}if($("div.program_explorer").length){var b=rfiCookieValueMap[g];
UPX_programExplorer.ExAreaInterest.changeArea(b);
UPX_programExplorer.ExBackground.fadeBG(b);
$("#explorerArea").mouseleave();
if(c=="pe"&&typeof tuitionInfoObjects!="undefined"){for(var d in tuitionInfoObjects){if(d!=="remove"&&d!=="indexOf"){var f=tuitionInfoObjects[d];
if(f.infoDivWrapper.length){UPX_tuitionInfo.displayTuitionInfo(f)
}}}}}switch(g){case"business-and-management":var a="1";
break;
case"criminal-justice-and-security":var a="2";
break;
case"education":var a="3";
break;
case"human-services":var a="4";
break;
case"nursing-and-health-care":case"nursing":case"health-care":var a="5";
break;
case"psychology":var a="6";
break;
case"technology":var a="7";
break
}$("div.rfi select#areaInterest").val(a)
},updateDegreeLevel:function(d,a){if(typeof tuitionInfoObjects!="undefined"){for(var b in tuitionInfoObjects){if(b!=="remove"&&b!=="indexOf"){var c=tuitionInfoObjects[b];
$(c.degreeLevelSelect).val(d)
}}}if($("div.program_explorer").length){$("#pf_degrees li.active").removeClass("active");
UPX_programExplorer.ExUser.degree_level.level=d;
CQ_Analytics.UpxDataMgr.setProperty("degreeInterest",d);
UPX_programExplorer.ExPrograms.setupPrograms(d);
$("#pf_degrees li."+d).addClass("active");
if(a=="pe"&&typeof tuitionInfoObjects!="undefined"){for(var b in tuitionInfoObjects){if(b!=="remove"&&b!=="indexOf"){var c=tuitionInfoObjects[b];
if(c.infoDivWrapper.length){UPX_tuitionInfo.displayTuitionInfo(c)
}}}}}},updateZip:function(c,a){if(a!=="t"&&typeof tuitionInfoObjects!="undefined"){for(var b in tuitionInfoObjects){if(b!=="remove"&&b!=="indexOf"){UPX_tuitionInfo.updateZip(c,b)
}}}if(a!=="pe"){if($("div.program_explorer").length){$("input#explorerZipInput").val(c);
UPX_programExplorer.validateZipCode()
}}$("div.rfi input#postalCode").val(c)
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
}}function setCQAnalyticsCookieVal(d,c){var b=mapToRfiCookieName(d),a=mapToRfiCookieValue(b,c);
if(b&&b.length>0&&a&&a.length>0){UPX.dataMgr.set("rfi",b,a)
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
case ("postalCode"||"zipCode"):return"postal_code";
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
}CQ_Analytics.SegmentResolved=function(a){if(CQ_Analytics.SegmentMgr){var c=CQ_Analytics.SegmentMgr.getResolved();
var b=false;
$.each(c,function(d,e){if(c[d]==a){b=true
}});
return b
}else{return"CQ_Analytics.SegmentMgr Is Not Available"
}};
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
var l;
var j;
var b;
var g=function(m){a.find("a.ac_over").removeClass("ac_over");
m.addClass("ac_over");
j.val(m.text())
};
var k=function(){if(b&&typeof b=="function"){b(j.val())
}};
var d=function(m){$(document).on("mouseover.UPX_autoComplete","div#ac_results a",function(n){g($(this))
});
$(document).on("click.UPX_autoComplete","div#ac_results a",function(n){n.preventDefault();
k()
});
l.on("keydown.UPX_autoComplete",function(o){j=$(o.target);
switch(o.keyCode){case i.UP:o.preventDefault();
if(a.is(":parent")){var n=a.find("a.ac_over");
if(n.length>0&&n.prev().length>0){nextItem=n.prev()
}else{nextItem=a.find("a:last")
}g(nextItem)
}break;
case i.DOWN:o.preventDefault();
if(a.is(":parent")){var n=a.find("a.ac_over");
if(n.length>0&&n.next().length>0){nextItem=n.next()
}else{nextItem=a.find("a:first")
}g(nextItem)
}break;
case i.ENTER:case i.NUMPAD_ENTER:o.preventDefault();
clearTimeout(e);
k();
a.hide();
a.find("a.resultItem").remove();
break;
case i.TAB:return;
case i.ESCAPE:clearTimeout(e);
a.hide();
a.find("a.resultItem").remove();
break;
default:clearTimeout(e);
e=setTimeout(function(){if(c!=j.val()){m.searchInput=j;
UPX_autoComplete.search(m)
}},m.delay);
break
}});
l.on("blur.UPX_autoComplete",function(n){clearTimeout(f);
f=setTimeout(function(){a.hide();
a.find("a.resultItem").remove()
},150)
})
};
var h;
return{init:function(m){l=m.searchInput;
b=m.resultFn;
inputOffset=l.offset();
divWidth=l.outerWidth()-2;
divTop=inputOffset.top+l.outerHeight();
divLeft=inputOffset.left;
if($("div#ac_results").length===0){h=$(".searchForm");
a=$("<div></div>").attr("id","ac_results").css({position:"absolute",width:divWidth,display:"none"}).appendTo(h);
$("div#ac_results").bgiframe();
d(m)
}else{h=$(".searchForm");
a=$("#ac_results");
$("div#ac_results").bgiframe();
d(m)
}},search:function(m){c=j.val();
c=$("<div/>").text(c).html();
$.ajax({url:m.url,dataType:"jsonp",data:{q:'topic:"'+c+'"',rows:10,indent:"on",sort:"topic_count desc"},success:function(n){UPX_autoComplete.displayResults($.map(n.response.docs,function(p,o){return p.topic
}))
}})
},displayResults:function(m){a.find("a.resultItem").remove();
$.each(m,function(n,o){o=$("<span />").html(o).text();
$('<a href="#"></a>').attr("class","resultItem").text(o).appendTo(a)
});
if(m.length>0){h.find("div#ac_results").show()
}else{h.find("div#ac_results").hide()
}}}
}();
var utils=(function(){var d=null,c={funcs:[],serviceCalled:false,serviceReturned:false},a={funcs:[],serviceCalled:false,serviceReturned:false,authenticated:null};
function e(){var f;
if(a.authenticated!==null){while(a.funcs.length>0){f=a.funcs.pop();
f(a.authenticated)
}}}function b(){var f;
ProfileService.get(function(){CQ_Analytics.UpxDataMgr.init();
c.serviceReturned=true;
while(c.funcs.length>0){f=c.funcs.pop();
f()
}},c)
}return{createCookie:function(g,m,n,o,l,f,h){if(!g&&typeof g!="string"){return false
}var k=g+"="+m;
if(n){var j=new Date();
n=parseInt(n);
j.setTime(j.getTime()+(n*24*60*60*1000));
var i="; expires="+j.toGMTString()
}else{var i=""
}k+=i;
o=(o)?("; path="+o):("; path=/");
k+=o;
l=(l)?("; domain="+l):"";
k+=l;
f=(f)?("; secure"):"";
k+=f;
document.cookie=k;
return true
},getCookie:function(g,j){var k=g+"=";
var f=document.cookie.split(j||";");
for(var h=0;
h<f.length;
h++){var l=f[h];
while(l.charAt(0)==" "){l=l.substring(1,l.length)
}if(l.indexOf(k)==0){return l.substring(k.length,l.length)
}}return null
},deleteCookie:function(f){utils.createCookie(f,"",-1,"","",true)
},checkProfileService:function(h){if(location.protocol!=="https:"){return false
}if(!c.serviceReturned){c.funcs.push(h);
if(!c.serviceCalled){c.serviceCalled=true;
try{b()
}catch(g){var f="/profile/js/profile.js";
$.ajax(f,{dataType:"script",cache:true,success:function(){b()
},error:function(){if(console){}}})
}}}else{h()
}},isAuthenticated:function(g){var f;
if(UPX.editmode){return false
}a.funcs.push(g);
if(!a.serviceReturned){if(!a.serviceCalled){a.serviceCalled=true;
f="https://"+location.host+"/auth.is_authenticated.jsonp?callback=?";
$.getJSON(f,function(h){if(h.authenticated==="true"){a.authenticated=true
}else{a.authenticated=false
}a.serviceReturned=true;
e()
})
}}else{e()
}},getQueryVariable:function(g){if(d==null){d=decodeURIComponent(location.search.substring(1))
}var k=d.split("&");
for(var h=0;
h<k.length;
h++){if(!k[h]){continue
}var j=k[h];
var f=j.indexOf("=");
var l=j.substr(0,f);
if(l===g){return j.substr(f+1)
}}return null
},parseStringToObj:function(k,q){if(!k){return null
}var m=k.split(q||"&"),j={},l,g,p,o,f=m.length,n=/^([^=]*)[=](.*)$/i,h=0;
for(;
h<f;
h++){if(!m[h]){continue
}l=m[h];
g=l.match(n);
if(g){p=g[1];
o=decodeURIComponent(g[2]);
j[p]=o
}}return j
},resizeIframe:function(g,i,l){var h=$("#"+l);
var j=h.contents().find("body");
var f=i?i:j.width();
var k=g?g:j.height();
h.animate({height:k,width:f},{duration:200,easing:"swing"})
},escapejQuerySelector:function(f){if(f){return f.replace(/([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g,"\\$1")
}else{return f
}},replaceUnicodeCharactersForDisplay:function(f){if(f){f=f.replace("\u8220",'"');
f=f.replace("\u8221",'"');
f=f.replace("\u8216","'");
f=f.replace("\u8217","'");
f=f.replace("\u0092","'");
f=f.replace("\uFFFD","");
f=f.replace(/&lt;/g,"<");
f=f.replace(/&gt;/g,">")
}return f
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
var JSON;
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
if(!window.UPX){window.UPX={}
}(function(e,k,b){var g=e.document,m=e.navigator,n=e.location,p={postal_code:"postalCode",us_military:"usMilitary",state:"state",city:"city",orga:"orga",country:"country"},l="firstName",f="lastName",a="postalCode",c="city",i="state",h="emailAddress",o="line1",j="line2",d=(function(){var K=/\S/,aa=/^\s+/,P=/\s+$/,D=/\d/,ab=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,aj=/^[\],:{}\s]*$/,t=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,E=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,C=/(?:^|:|,)(?:\s*\[)+/g,x=Object.prototype.toString,F=Object.prototype.hasOwnProperty,ae=Array.prototype.push,I=Array.prototype.slice,q=String.prototype.trim,L=Array.prototype.indexOf,ac,al,V,J,z,r,S={},W,U,O="session-data",R=true,H,y="/api/session-service/1/uopx/session/",Q=[],ad={},Y={authenticated:false,roles:null,authId:b,sessionReady:false,get:function(ap,an,ar){var at,aq,ao;
if(typeof ar==="undefined"){ar={};
if(typeof an==="undefined"){an=ap;
ap=b
}else{if(typeof an==="function"){ar.callback=an;
an=ap;
ap=b
}else{if(typeof an==="boolean"){ar.defaults=an;
an=ap;
ap=b
}}}if(typeof ar.defaults==="undefined"){ar.defaults=false
}}else{if(jQuery.type(ar)==="object"){ar.defaults=ar.defaults||false
}else{if(jQuery.type(ar)==="function"){aq=ar;
ar={callback:aq,defaults:false}
}else{if(jQuery.type(ar)==="boolean"){at=ar;
ar={defaults:at}
}}}if(typeof an==="undefined"){an=ap;
ap=b
}}if(typeof an==="undefined"){ao=Array.prototype.slice.call(arguments);
ao.push("get");
B.apply(this,ao);
return
}return Z(ap,an,ar)
},set:function(aq,an,ao,ar){var ap;
if(typeof ar!=="function"){if(typeof ao==="function"){ar=ao;
if(typeof an==="object"){ao=b
}else{ao=an;
an=aq;
aq=b
}}else{if(typeof an==="function"){ar=an;
an=aq;
aq=ao=b
}else{if(typeof ao==="undefined"){ar=b;
if(jQuery.type(an)==="object"){}else{if(typeof an!=="undefined"){ao=an;
an=aq;
aq=b
}else{an=aq;
aq=ao=b
}}}}}}return am(aq,an,ao,ar)
},clearSession:function(ao){var an="";
S={};
$.extend(S,W);
an=x(S);
G(sessioncookie,an,365);
return true
},clear:function(ao,aq){var an=y+ac,ap={};
ap[ao]=aq;
jQuery.ajax({url:an,type:"PUT",contentType:contentType,data:ap,cache:false,success:function(ar){U=parseInt(ar,10);
G(revisionCookie,U,365,H,"/")
},error:function(at,au,ar){if(console){console.log(ar)
}}})
},ready:function(an){if(Y.sessionReady){an()
}else{Q.push(an)
}},dump:function(an){if(an==="session"){return S
}else{if(an==="data"){return ad
}}},bind:function(ap,an,ao){if(typeof ao==="function"){if(typeof ap==="undefined"&&typeof an==="undefined"){throw new B(I.call(arguments),"bind")
}if(ap&&jQuery.type(ap)!=="string"&&jQuery.type(ap)!=="array"){throw new B(I.call(arguments),"bind")
}}else{if(typeof an==="function"){ao=an;
an=ap;
ap=b
}else{throw new v()
}}return N(ap,an,ao)
},trigger:function(ao,ap){var an=I.call(arguments),aq=an.length;
if(typeof ap==="undefined"){ap=ao;
ao=b
}s(ao,ap)
}};
function ah(){var an;
while(Q.length>0){an=Q.pop();
an()
}Q=[]
}function N(at,ap,ar){var an,aq,ao;
if(typeof at==="string"){at=at.split(" ")
}if(typeof ap==="string"){ap=ap.split(" ")
}if(jQuery.type(ap)!=="array"){return
}if(jQuery.type(at)==="array"){jQuery.each(at,function(av,au){an=ad[au]||(ad[au]={});
for(ao=ap.length-1;
ao>=0;
ao=ao-1){aq=ap[ao];
if(jQuery.type(an[aq])!=="array"){an[aq]=[]
}(an[aq]).push(ar)
}})
}else{an=ad;
for(ao=ap.length-1;
ao>=0;
ao=ao-1){aq=ap[ao];
if(jQuery.type(an[aq])!=="array"){an[aq]=[]
}(an[aq]).push(ar)
}}return
}function s(ao,ap){var an,aq;
if(typeof ao==="undefined"){an=ad;
aq=S
}else{an=ad[ao];
aq=S[ao]
}if(typeof ap==="string"){ap=ap.split(" ")
}if(jQuery.type(ap)!=="array"){return
}jQuery(ap).each(function(at,aw){var au,ar=0,av;
if(typeof an!=="undefined"&&F.call(an,aw)){fnsArray=an[aw];
av=fnsArray.length;
for(;
ar<av;
ar++){(fnsArray[ar]).call(this,aw,aq[aw])
}}})
}function B(an,ao){this.arg=an;
this.method=ao;
this.message=" arguments passed are not in expected format/type for the method ";
this.toString=function(){return this.arg+this.message+'"'+this.method+'"'
}
}function v(an){var ao;
if(an){ao="Passed in arguments:"+an+"; missing one/more of required parameters"
}else{ao="Insufficient arguments were passed to the method"
}this.message=ao;
this.toString=function(){return this.message
}
}function T(au,ar){var ao,aq="=",ap,av,an=[],at={};
ar=ar||",";
if(au===b||au===null){return at
}ao=au.split(ar);
for(ap=ao.length-1;
ap>=0;
ap=ap-1){av=ao[ap];
an=typeof av==="string"?ao[ap].split(aq):null;
if(an!==null){at[an[0]]=an.length>1?an[1]:null
}}return at
}function M(ap){var ao="",an;
if(typeof ap==="string"){return ap
}for(an in ap){if(F(ap,an)){ao+=an+"="+ap[an]+","
}}ao=ao.substring(0,ao.length-1);
return ao
}function A(aq){var ar,at,ao=null,au,an,ap;
ar=decodeURIComponent(g.cookie);
if(typeof aq==="undefined"){ao=ar;
return ao
}else{aq=aq+"=";
at=new RegExp(aq,"ig");
an=ar.split(";");
for(ap=an.length-1;
ap>-1;
ap=ap-1){au=an[ap];
au=au.replace(aa,"").replace(P,"");
if(au.search(at)===0){ao=au.substring(aq.length,au.length)
}}return ao
}}function G(ao,av,ap,au,aw,an){var at,ar=new Date(),aq="";
au=";domain="+(au||".phoenix.edu");
an=an?";secure":"";
aw=";path="+(aw||"/");
if(typeof ao!=="string"){return false
}at=ao+"="+av;
if(ap){ar.setTime(ar.getTime()+(ap*24*60*60*1000));
aq="; expires="+ar.toGMTString()
}g.cookie=at+aq+aw+au+an;
return true
}function af(an){G(an,"",-1)
}function Z(at,av,ap){var aq,au,ar,an,ax,ao=false;
if(typeof at!=="undefined"&&at!=="profile"){if(jQuery.inArray(at,k.pageComponents)==-1&&R){ao=true;
jQuery.ajax(y+ac+"/keys/"+at,{success:function(az,aA,ay){if(jQuery.inArray(at,k.pageComponents)==-1){k.pageComponents.push(at);
if(az.$curRevision){S[at]=az[at]
}}Z(at,av,ap)
},error:function(ay,aA,az){if(jQuery.inArray(at,k.pageComponents)==-1){k.pageComponents.push(at)
}if(F.call(ap,"defaults")&&ap.defaults===true){Z(at,av,ap)
}if(F.call(ap,"callback")&&typeof ap.callback==="function"){ap.callback.call(this,az,ap.data)
}},dataType:"json",type:"GET",cache:false});
return
}}try{if(typeof at==="string"){au=S[at]
}else{au=S
}if(jQuery.type(av)==="array"){aq={};
for(ar=av.length-1;
ar>=0;
ar=ar-1){ax=av[ar];
if(typeof au!=="undefined"&&F.call(au,ax)){aq[ax]=au[ax]
}if(typeof aq[ax]==="undefined"&&ap.defaults===true){aq[ax]=S.essentials[ax]
}}}else{if(typeof au!=="undefined"){aq=au[av]
}if((typeof aq==="undefined"||typeof aq==="null")&&(ap.defaults===true||typeof at==="undefined")){aq=S.essentials[av]
}}return(F.call(ap,"callback")&&typeof ap.callback==="function"&&!ao)?ap.callback.call(this,"success",aq,ap.data):aq
}catch(aw){if(console){console.log(aw);
console.log(aw.stack)
}}}function am(an,az,ao,av){var aI,aq,aJ="",aA,at=false,au,aG="application/json",aD="revision",aL={},aw=false,aK,ap,aB=0,ar,ax,ay,aF,aE={},aC=[a,i,c,l,f,h,o,j,"id","smUserId","financialCalcTempData","homePhoneAreaCode","homePhonePhoneNumber","homePhoneExtension","mobilePhoneAreaCode","mobilePhonePhoneNumber","mobilePhoneExtentsion"];
try{if(!F.call(S,"essentials")){S.essentials={}
}if(typeof an==="string"&&S[an]!==b){aI=S[an];
if(an==="profile"){aw=true
}ap=ad[an]
}else{if(typeof an==="string"){aI=S[an]={};
ap=ad[an];
if(an==="profile"){aw=true
}}else{aI=S.essentials;
ap=ad
}}if(jQuery.type(az)==="object"){for(aq in az){if(F.call(az,aq)){aA=az[aq];
aI[aq]=aA;
if(an==="profile"&&Y.authenticated&&F.call(ProfileService.profile,aq)){ProfileService.profile[aq]=aA;
at=true
}if(typeof ap!=="undefined"&&F.call(ap,aq)){aK=ap[aq];
ar=aK.length;
for(;
aB<ar;
aB++){(aK[aB]).call(this,aq,aA)
}}if(typeof ad!=="undefined"&&F.call(ad,aq)){aK=ad[aq];
ar=aK.length;
for(;
aB<ar;
aB++){(aK[aB]).call(this,aq,aA)
}}}}if(!aw){if(typeof an!=="undefined"){aL[an]=aI;
jQuery.extend(S.essentials,aI);
aL.essentials=S.essentials
}else{aL.essentials=aI
}aL=JSON.stringify(aL)
}}else{aI[az]=ao;
if(!aw){if(typeof an!=="undefined"){aL[an]=aI;
S.essentials[az]=ao;
aL.essentials=S.essentials
}else{aL.essentials=aI
}aL=JSON.stringify(aL)
}if(an==="profile"&&Y.authenticated&&F.call(ProfileService.profile,az)){if(!jQuery.inArray(az,aC)){S.essentials[az]=ao
}ProfileService.profile[az]=ao;
at=true
}if(typeof ap!=="undefined"&&F.call(ap,az)){aK=ap[az];
ar=aK.length;
for(;
aB<ar;
aB++){(aK[aB]).call(this,az,ao)
}}if(typeof ad!=="undefined"&&F.call(ad,az)){aK=ad[az];
ar=aK.length;
for(;
aB<ar;
aB++){(aK[aB]).call(this,az,ao)
}}}if(at){ProfileService.update(function(aM){S.profile=ProfileService.profile;
if(typeof av==="function"){av.call(this,aM)
}})
}else{if(R){au=y+ac;
jQuery.ajax({url:au,type:"PUT",contentType:aG,data:aL,cache:false,success:function(aM){U=parseInt(aM,10);
G(aD,U,365,H,"/");
if(typeof av==="function"){av.call(this,"success","200")
}},error:function(aN,aO,aM){if(typeof av==="function"){av.call(this,"failed to update",aM,aN)
}}})
}else{aE.essentials=S.essentials;
aF=JSON.stringify(aE);
G(O,aF,365,H,"/")
}}return true
}catch(aH){if(console){console.log(aH);
console.log(aH.stack)
}}}function ag(aq,ap){var ao={},an,ar;
for(an in aq){if(F.call(aq,an)){ar=ap[an];
ao[ar]=aq[an]
}}return ao
}function X(ao,an){var aq,ap=[a,i,c,l,f,h,o,j,"id","smUserId","financialCalcTempData","homePhoneAreaCode","homePhonePhoneNumber","homePhoneExtension","mobilePhoneAreaCode","mobilePhonePhoneNumber","mobilePhoneExtentsion"];
for(aq in an){if(aq&&typeof an[aq]==="string"){if((aq===a||aq===i||aq===c)&&an.postalCode!==""&&an.state!==""&&an.city!==""){ao.essentials[aq]=an[aq]
}if(!jQuery.inArray(aq,ap)){if(!ao.essentials[aq]&&an[aq]){ao.essentials[aq]=an[aq]
}}}}return ao
}function ak(ao){var ar="https://",aq=n.host,an=ar+aq+"/auth.is_authenticated.jsonp",ap=ar+aq+"/auth.info.jsonp?callback=?";
jQuery.ajax(an,{success:function(at,av,au){if(av==="success"){Y.authenticated=at.authenticated==="true"
}},error:function(){},complete:function(at,au){if(Y.authenticated===true){jQuery.ajax(ap,{success:function(av,ax,aw){Y.authId=av.user_info.username;
Y.roles=av.user_info.roles
},complete:function(av,aw){ao()
},cache:false})
}else{ao()
}},dataType:"jsonp",jsonpCallback:"callback",cache:false})
}function w(){if(J&&z&&r){if(typeof W!=="undefined"){W=ag(W,p);
S.essentials={};
jQuery.extend(S.essentials,W)
}if(typeof al!=="undefined"){jQuery.extend(true,S,al)
}if(typeof V!=="undefined"){S.profile=V;
X(S,V)
}Y.sessionReady=true;
ah()
}}(function ai(){var aq=0,ao,au,ar="profile",av="session-id",at="revision",ap=n.host.split("."),an="/public/bin/servlet/altcloud/UserServlet.location.json?",aw=A(ar);
H=ap[ap.length-2]+"."+ap[ap.length-1];
if(k.editmode){return
}ac=A(av);
U=parseInt(A(at),10);
R=k.sessionservice;
al=A(O);
if(!R||(typeof al==="string"&&al!=="")){al=al?JSON.parse(al):{};
J=true;
w();
if(R){if(ac===null||ac.trim()===""){jQuery.ajax(y,{success:function(ax){ac=ax.$id;
S.$id=ax.$id;
U=ax.$curRevision;
G(av,ac,365,H,"/");
G(at,U,365,H,"/");
J=true;
w()
},error:function(){J=true;
w()
},dataType:"json",type:"POST",cache:false})
}af(O)
}}else{if(ac===null||ac.trim()===""){jQuery.ajax(y,{success:function(ax){ac=ax.$id;
S.$id=ax.$id;
U=ax.$curRevision;
G(av,ac,365,H,"/");
G(at,U,365,H,"/");
J=true;
w()
},error:function(){J=true;
w()
},dataType:"json",type:"POST",cache:false})
}else{if(U>1){au=y+ac+"/keys/";
ao=k.pageComponents.length;
for(;
aq<ao;
aq=aq+1){au+=k.pageComponents[aq]+","
}au+="essentials";
k.pageComponents.push("essentials");
jQuery.ajax(au,{success:function(ax){al=ax
},complete:function(){J=true;
w()
},dataType:"json",type:"GET",cache:false})
}else{k.pageComponents.push("essentials");
S.$id=ac;
J=true;
w()
}}}jQuery.getJSON(an,function(ax,ay){if(ay==="success"&&jQuery.type(ax)==="object"){W=ax;
r=true;
w()
}});
ak(function(){if(n.protocol==="https:"&&Y.authenticated===true){if(aw!==null){V=T(aw,"||");
Y.profileReady=true;
z=true;
w()
}utils.checkProfileService(function(){V=jQuery.extend({},ProfileService.profile);
z=true;
Y.profileReady=true;
w()
})
}else{z=true;
w()
}})
}());
return Y
}());
k.dataMgr=d
}(window,UPX));
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
var UPXHeaderAlternate=function(){var f=undefined,d=undefined,c=undefined,e,g,b=undefined;
function h(){d.removeClass("hover");
$("#flyoutWrapper").slideUp("fast");
$("#flyoutWrapper img.flyoutArrow").slideUp(55)
}function a(){d=$(b).addClass("hover");
var s="#"+i();
var q=$(s+" .flyoutArrow");
$("#flyoutWrapper").show();
$("#flyoutWrapper").css("left",e);
var j="#"+i();
c=$(j).removeClass("hide");
var k,o,l,n,v,p,u,t,m=33;
$("#flyoutWrapper").slideDown(50);
$("#flyoutWrapper").find("img.flyoutArrow").slideDown(50);
k=$(b).outerWidth();
u=$(".skeleton .header").outerWidth();
v=$("#flyoutWrapper").outerWidth();
p=Math.floor(v/2);
o=$(b).position().left;
l=k+o;
n=$("#flyoutWrapper").position().left;
e=e||$("#flyoutWrapper").css("left");
var r=(l-p-m);
if((r+v)>u){r=u-v
}else{if(r<0){r=0
}}$("#flyoutWrapper").css("left",r+"px");
t=l-$("#flyoutWrapper").position().left-m;
$("#flyoutWrapper .flyoutArrow").css("left",t+"px")
}function i(){var j=$(b).children("a").prop("class");
if(j!==undefined){j=j.slice(0,j.length-3);
return j
}else{return""
}}return{init:function(){if($("#pageHeader").hasClass("editMode")){UPXHeaderAlternate.bindEditModeHandlers()
}else{UPXHeaderAlternate.bindHandlers()
}},bindHandlers:function(){$(".MainNav li.flyoutNav").live("click",function(j){j.preventDefault()
});
$(".MainNav li.flyoutNav").live("mouseenter",function(){b=this;
if(g&&g!=this){$(g).removeClass("hover");
$("#flyoutWrapper .flyout").addClass("hide");
$("#flyoutWrapper").hide()
}g=this;
if(undefined!=f){clearTimeout(f)
}f=setTimeout(a,50)
});
$(".MainNav li.flyoutNav").live("mouseleave",function(){if(undefined!=f){clearTimeout(f)
}if(d){f=setTimeout(h,200)
}});
$("#flyoutWrapper").live("mouseenter",function(){if(undefined!=f){clearTimeout(f)
}if(d){f=setTimeout(a,50)
}});
$("#flyoutWrapper").live("mouseleave",function(){if(undefined!=f){clearTimeout(f)
}if(d){f=setTimeout(h,200)
}});
$(".header a#chatLive").live("click",function(){cmCreateManualLinkClickTag("?cm_sp=CTA-_-Chat Live-_-Header","Chat Live",document.title);
if(typeof pageTracker==="function"){pageTracker._trackPageview("/virtual/link/CTA/Chat Live/Header")
}var j="uopx",k="student",l=window.location.pathname;
if($("body.homepageContEd").length||$("body.secondary").length||$("body.superHub").length||$("body.hub").length||$("body.certificates").length){k="Single_Course"
}window.location=window.location.protocol+"//"+window.location.host+"/chat/chatNow?uri="+l+"&tenant="+j+"&queue="+k
})
},bindEditModeHandlers:function(){$(".MainNav").find("li.flyoutNav").children("a").on("click",function(m){m.preventDefault();
var k=$(this),l=k.prop("class"),j=l.slice(0,l.length-3);
$("#flyoutWrapper").toggle().find("#"+j).toggleClass("hide")
})
}}
}();
var chosen=null;
var exclusionCookie=CQ_Analytics.Cookie.read("CampaignExclusion");
var exclusionFlag=exclusionCookie!=null&&exclusionCookie=="true";
var exclusionEnabled=false;
function setMboxCookie(a,c){var b=false;
if(exclusionFlag){b=true
}else{if(exclusionEnabled){if(chosen!=a){b=true
}else{if(c=="session"){CQ_Analytics.Cookie.set("CampaignExclusion",true)
}else{if(c=="2week"){CQ_Analytics.Cookie.set("CampaignExclusion",true,14)
}}}}}return b
}$(function(){UPXHeaderAlternate.init()
});
