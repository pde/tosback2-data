if(typeof(AC)=="undefined"){AC={}}document.createElement("nav");AC.addEvent=function(d,e,f){if(d.addEventListener){return d.addEventListener(e,f,false)
}else{return d.attachEvent("on"+e,f)}};AC.removeEvent=function(d,e,f){if(d.removeEventListener){return d.removeEventListener(e,f,false)
}else{return d.detachEvent("on"+e,f)}};AC.removeClassName=function(d,c){c=new RegExp(c,"g");
d.className=d.className.replace(c,"").replace(/ +/g," ").replace(/ +$/gm,"").replace(/^ +/gm,"")
};AC.getPreviousSibling=function(b){while(b=b.previousSibling){if(b.nodeType==1){return b
}}};if(typeof(AC.Detector)=="undefined"){AC.Detector={_iOSVersion:null,iOSVersion:function(){if(this._iOSVersion===null){this._iOSVersion=(navigator.userAgent.match(/applewebkit/i)&&(navigator.platform.match(/iphone/i)||navigator.platform.match(/ipod/i)||navigator.platform.match(/ipad/i)))?parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_",".")):false
}return this._iOSVersion},_svgAsBackground:null,svgAsBackground:function(f){if(this._svgAsBackground===null){var d=function(){AC.Detector._svgAsBackground=true;
if(typeof(f)=="function"){f()}};var e=document.createElement("img");e.setAttribute("src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
if(e.complete){e.style.visibility="hidden";e.style.position="absolute";document.body.appendChild(e);
window.setTimeout(function(){AC.Detector._svgAsBackground=false;if(e.width>=100){document.body.removeChild(e);
d()}else{document.body.removeChild(e)}},1)}else{this._svgAsBackground=false;e.onload=d
}}else{if(this._svgAsBackground&&typeof(f)=="function"){f()}}return this._svgAsBackground
},_style:null,_prefixes:null,_preFixes:null,_css:null,isCSSAvailable:function(i){if(!this._style){this._style=document.createElement("browserdetect").style
}if(!this._prefixes){this._prefixes="-webkit- -moz- -o- -ms- -khtml- ".split(" ")
}if(!this._preFixes){this._preFixes="Webkit Moz O ms Khtml ".split(" ")}if(!this._css){this._css={}
}i=i.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(i){case"gradient":if(this._css.gradient!==undefined){return this._css.gradient
}var i="background-image:",l="gradient(linear,left top,right bottom,from(#9f9),to(white));",m="linear-gradient(left top,#9f9, white);";
this._style.cssText=(i+this._prefixes.join(l+i)+this._prefixes.join(m+i)).slice(0,-i.length);
this._css.gradient=(this._style.backgroundImage.indexOf("gradient")!==-1);return this._css.gradient;
case"inset-box-shadow":if(this._css["inset-box-shadow"]!==undefined){return this._css["inset-box-shadow"]
}var i="box-shadow:",j="#fff 0 1px 1px inset;";this._style.cssText=this._prefixes.join(i+j);
this._css["inset-box-shadow"]=(this._style.cssText.indexOf("inset")!==-1);return this._css["inset-box-shadow"];
default:var n=i.split("-"),r=n.length,o,p,q;if(n.length>0){i=n[0];for(p=1;p<r;p++){i+=n[p].substr(0,1).toUpperCase()+n[p].substr(1)
}}o=i.substr(0,1).toUpperCase()+i.substr(1);if(this._css[i]!==undefined){return this._css[i]
}for(q=this._preFixes.length-1;q>=0;q--){if(this._style[this._preFixes[q]+i]!==undefined||this._style[this._preFixes[q]+o]!==undefined){this._css[i]=true;
return true}}return false}return false}}}AC.GlobalNav=function(){var d=this,c;this.globalHeader=document.getElementById("globalheader");
this.globalSearch=document.getElementById("sp-searchtext");this.globalStylesheet=document.getElementById("globalheader-stylesheet");
if(this.globalHeader){this.globalHeader.className+=" globalheader-js";AC.Detector.svgAsBackground(function(){d.globalHeader.className+=" svg"
});if(navigator.userAgent.match(/applewebkit/i)){if(!navigator.geolocation){this.globalHeader.className+=" decelerate"
}else{if(navigator.platform.match(/ipad/i)||navigator.platform.match(/iphone/i)||navigator.platform.match(/ipod/i)){this.globalHeader.className+=" ios"
}}if(AC.Detector.iOSVersion()&&AC.Detector.iOSVersion()<=3.2){this.globalHeader.className+=" ios3"
}if(!AC.Detector.isCSSAvailable("inset-box-shadow")||navigator.userAgent.match(/chrome/i)&&navigator.userAgent.match(/windows/i)){this.globalHeader.className+=" noinset"
}}this.enhanceSearch();this.decorateSearchInput();this.vml();this.decorateTabStates();
if(AC.GlobalNav.canEnhance()&&this.globalStylesheet){this.enhancedGlobalStylesheet=this.globalStylesheet.cloneNode(true);
this.enhancedGlobalStylesheet.id="globalheader-enhanced-stylesheet";this.enhancedGlobalStylesheet.href=this.globalStylesheet.href.replace("/navigation.css","/enhanced.css");
this.globalStylesheet.parentNode.appendChild(this.enhancedGlobalStylesheet)}this.loaded()
}};AC.GlobalNav._canEnhance=null;AC.GlobalNav.canEnhance=function(){if(AC.GlobalNav.canEnhance._canEnhance==null){var b=navigator.userAgent.replace(/^.*version\/([\d\.]*) .*$/i,"$1").split(".");
AC.GlobalNav.canEnhance._canEnhance=(AC.Detector.isCSSAvailable("transition-property")&&AC.Detector.isCSSAvailable("gradient")&&(AC.Detector.iOSVersion()===false||AC.Detector.iOSVersion()>=3.2)&&!(navigator.userAgent.match(/applewebkit/i)&&b.length==3&&(b[0]<=4&&b[1]<=0&&b[2]<=2)))
}return AC.GlobalNav.canEnhance._canEnhance};AC.GlobalNav.prototype.enhanceSearch=function(){this.globalSearchForm=document.getElementById("g-search");
if(this.globalSearchForm&&this.globalSearch){if(typeof(searchCountry)=="undefined"){searchCountry="us"
}if(SearchShortcut.geoMap[searchCountry.toUpperCase()].directory){var f=SearchShortcut.geoMap[searchCountry.toUpperCase()].directory
}else{if(searchCountry!="us"){var f="/"+searchCountry.replace(/_/,"")}else{f=""
}}var d={global:"http://www.apple.com"+f+"/search/",ipad:"http://www.apple.com"+f+"/search/",iphone:"http://www.apple.com"+f+"/search/",ipoditunes:"http://www.apple.com"+f+"/search/",mac:"http://www.apple.com"+f+"/search/",store:"http://www.apple.com"+f+"/search/",support:"http://www.info.apple.com/searchredir.html"};
var e=d[searchSection]||"http://www.apple.com/search/";this.globalSearchForm.setAttribute("action",e);
this.globalSearchForm.setAttribute("method","get");this.searchShortcut=searchShortcut=new SearchShortcut(this.globalSearchForm,this.globalSearch);
SearchShortcut.loadXmlToDoc=function(a){searchShortcut.loadXmlToDoc(a)}}};AC.GlobalNav.prototype.decorateSearchInput=function(){if(this.globalSearch){var k,j,h,l,m,n=this,i=true,k=document.getElementById("g-search");
j=document.createDocumentFragment();this.globalSearch.setAttribute("autocomplete","off");
h=document.createElement("input");this.globalSearch.parentNode.replaceChild(h,this.globalSearch);
l=document.createElement("div");l.className="reset";resetEnd=function(a){if(a.target==l&&window.getComputedStyle(l,null)["opacity"]=="0"){l.style.display="none"
}};if(window.addEventListener){l.addEventListener("transitionend",resetEnd,true);
l.addEventListener("transitionEnd",resetEnd,true);l.addEventListener("oTransitionEnd",resetEnd,false);
l.addEventListener("mozTransitionEnd",resetEnd,false);l.addEventListener("webkitTransitionEnd",resetEnd,false)
}if(this.globalSearch.value.length==0){k.className+=" empty"}j.appendChild(this.globalSearch);
j.appendChild(l);m=function(a){i=false;n.globalSearch.value="";if(n.searchShortcut){n.searchShortcut.hideResults()
}window.setTimeout(function(){k.className+=" empty";i=true},10)};AC.addEvent(l,"mousedown",m);
AC.addEvent(this.globalSearch,"focus",function(a){if(i){l.style.display="";window.setTimeout(function(){n.globalHeader.className+=" searchmode"
},10)}});AC.addEvent(this.globalSearch,"blur",function(a){if(i){l.style.display="";
window.setTimeout(function(){AC.removeClassName(n.globalHeader,"searchmode")},10)
}else{i=true}});AC.addEvent(this.globalSearch,"keydown",function(b){var a=b.keyCode;
i=true;if(n.globalSearch.value.length>=0){l.style.display="";window.setTimeout(function(){AC.removeClassName(k,"empty")
},10)}else{if(!k.className.match("empty")){k.className+=" empty"}}if(b.keyCode===27){m(b)
}});if(h){h.parentNode.replaceChild(j,h)}}};AC.GlobalNav.prototype.vml=function(){var h,g,j,f,i;
if(!AC.Detector.isCSSAvailable("border-radius")&&document.namespaces&&this.globalHeader){document.namespaces.add("v","urn:schemas-microsoft-com:vml");
h=document.createDocumentFragment();g=document.createElement("v:roundrect");g.setAttribute("id","globalheader-roundrect");
g.setAttribute("stroked",true);g.setAttribute("strokeColor","#737373");g.setAttribute("arcSize",".1");
h.appendChild(g);j=this.globalHeader.currentStyle.backgroundImage;this.globalHeader.style.backgroundImage="none";
j=j.replace(/url\(["']*([^"']*)["']*\)/,"$1");f=document.createElement("v:fill");
f.setAttribute("id","globalheader-fill");f.setAttribute("type","tile");f.setAttribute("src",j);
g.appendChild(f);i=document.createElement("v:roundrect");i.setAttribute("id","globalheader-shadow");
i.setAttribute("stroked",false);i.setAttribute("fillColor","#999");i.setAttribute("arcSize",".1");
h.appendChild(i);this.globalHeader.appendChild(h)}};AC.GlobalNav.prototype.getPreviousNavItem=function(b){while(b.tagName.toLowerCase()!=="li"){b=b.parentNode
}b=AC.getPreviousSibling(b);if(!b){return false}if(b.tagName.toLowerCase()!=="li"){return false
}b=b.getElementsByTagName("a");if(!b[0]){return false}return b[0]};AC.GlobalNav.prototype.decorateTabStates=function(){this.globalNavItems=this.globalHeader.getElementsByTagName("a");
var e=this,f=this.globalHeader.className.replace(/ .*/,""),d;for(d=this.globalNavItems.length-1;
d>=0;d--){if(this.globalNavItems[d].href.match(f)){this.currentTab=this.globalNavItems[d]
}AC.addEvent(this.globalNavItems[d],"mousedown",function(b){var a=(b.target)?b.target:b.srcElement;
a=e.getPreviousNavItem(a);if(a&&a!==e.currentTab){a.className+=" before"}});AC.addEvent(this.globalNavItems[d],"mouseout",function(b){var a=(b.target)?b.target:b.srcElement;
a=e.getPreviousNavItem(a);if(a&&a!==e.currentTab){AC.removeClassName(a,"before")
}})}if(this.currentTab){this.currentTab=this.getPreviousNavItem(this.currentTab);
this.currentTab.className+=" before"}};AC.GlobalNav.prototype.loaded=function(c){var d=this;
if(this.loadedTimeout){window.clearTimeout(this.loadedTimeout)}if(!this.cancelLoadedTimeout){this.cancelLoadedTimeout=window.setTimeout(function(){d.loaded(true)
},500)}if(!this.testEnhancedLoaded){this.testEnhancedLoaded=document.createElement("div");
this.testEnhancedLoaded.id="globalheader-loaded-test";document.body.appendChild(this.testEnhancedLoaded)
}if(c||this.testEnhancedLoaded.offsetWidth==0){this.globalHeader.className+=" globalheader-loaded"
}else{this.loadedTimeout=window.setTimeout(function(){d.loaded()},10)}};var SearchShortcut=function(g,e){this.searchWrapper=document.getElementById("globalsearch");
this.searchForm=g;this.resultsPanel=document.getElementById("sp-results");this.searchInput=e;
this.addSection();var h=(/applewebkit/i.test(navigator.userAgent)&&/mobile/i.test(navigator.userAgent))||/webos/i.test(navigator.userAgent)||/android/i.test(navigator.userAgent)||/blackberry/i.test(navigator.userAgent)||/windows ce/i.test(navigator.userAgent)||/opera mini/i.test(navigator.userAgent);
if(h||(typeof(deactivateSearchShortcuts)!=="undefined"&&deactivateSearchShortcuts)){return
}if(this.shouldVML()){this.resultsPanel.className+=" sp-results-vml"}this.addSpinner();
this.baseUrl="http://www.apple.com/global/nav/scripts/shortcuts.php";this.minimumCharactersForSearch=0;
this.entryDelay=150;this.currentRequest=false;this.quickLinks=SearchShortcut.geoMap.US.shortcuts;
this.noResults=SearchShortcut.geoMap.US.noResults;if(typeof(searchCountry)!="undefined"&&searchCountry){this.quickLinks=SearchShortcut.geoMap[searchCountry.toUpperCase()].shortcuts||this.quickLinks;
this.noResults=SearchShortcut.geoMap[searchCountry.toUpperCase()].noResults||this.noResults
}var f=this;AC.addEvent(this.searchForm,"submit",function(b){try{b.preventDefault();
b.stopPropagation()}catch(a){}return false});AC.addEvent(document,"mousemove",function(a){if(!f.resultsShowing){return
}f.onMouseMove(a)});AC.addEvent(this.searchInput,"keydown",function(a){f.onKeyDown(a)
});AC.addEvent(this.searchInput,"keyup",function(a){f.onKeyUp(a)});AC.addEvent(this.searchInput,"blur",function(a){f.onBlur(a)
})};SearchShortcut.prototype.shouldVML=function(){return(!AC.Detector.isCSSAvailable("border-radius")&&document.namespaces)
};SearchShortcut.prototype.addSpinner=function(){this.spinner=document.createElement("div");
this.spinner.className="spinner hide";this.searchInput.parentNode.appendChild(this.spinner)
};SearchShortcut.prototype.hideSpinner=function(){this.spinner.className+=" hide"
};SearchShortcut.prototype.showSpinner=function(){AC.removeClassName(this.spinner,"hide")
};SearchShortcut.prototype.addSection=function(){var b=document.getElementById("search-section");
if(!b){b=document.createElement("input");b.id="search-section";b.type="hidden";
b.name="sec";b.value=window.searchSection;this.searchForm.appendChild(b)}else{if(b){b.value=window.searchSection
}}};SearchShortcut.prototype.onKeyDown=function(d){var c=typeof(event)!="undefined"?event.keyCode:d.keyCode;
if(!d){d=event}if(c==13&&!d.altKey){if(this.selected){this.go(this.selected.data.url)
}else{this.hideResults();this.fullSearch()}}else{if(c==9){this.hideResults()}}};
SearchShortcut.prototype.onKeyUp=function(f){var g=typeof(event)!="undefined"?event.keyCode:f.keyCode;
if(!f){f=event}if(g==40&&this.results){try{f.preventDefault();f.stopPropagation()
}catch(h){}if(this.selected&&this.results[this.selected.index+1]){this.selected.deselect();
this.selected=this.results[this.selected.index+1].select()}else{if(!this.selected&&this.results[0]){this.selected=this.results[0].select()
}}}else{if(g==38&&this.results){try{f.preventDefault();f.stopPropagation()}catch(h){}if(this.selected&&this.selected.index>0){this.selected.deselect();
this.selected=this.results[this.selected.index-1].select()}}else{this.selected=false;
var e=this.searchInput.value;e=e.replace(/[%\^\?\!\*\/<>\$]/ig,"").replace(/^\s+/g,"").replace(/\s+$/g,"");
if(e.length>this.minimumCharactersForSearch){this.searchText=e;this.startKeystrokeTimer()
}else{this.hideSpinner();this.hideResults()}}}};SearchShortcut.prototype.onMouseMove=function(b){b=b||window.event;
this.mouseEventTarget=(b.target)?b.target:b.srcElement;if(this.shouldHideOnMouseOut){if(!this.isOverResults()){this.hideResults(b)
}}};SearchShortcut.prototype.isOverResults=function(b){if(!this.mouseEventTarget){return false
}while((this.mouseEventTarget.id!=="sp-results")&&this.mouseEventTarget.parentNode){this.mouseEventTarget=this.mouseEventTarget.parentNode
}return(this.mouseEventTarget.id==="sp-results")};SearchShortcut.prototype.onBlur=function(b){if(this.isOverResults()){this.shouldHideOnMouseOut=true
}if(!this.selected&&!this.isOverResults()){this.hideResults(b)}};SearchShortcut.prototype.startKeystrokeTimer=function(){if(this.timeoutId){window.clearTimeout(this.timeoutId)
}var b=this;this.timeoutId=window.setTimeout(function(){b.commitKeystroke()},this.entryDelay)
};SearchShortcut.prototype.commitKeystroke=function(){this.search(this.searchText)
};SearchShortcut.prototype.fullSearchUrl=function(){var b=this.searchForm.getAttribute("action");
return b};SearchShortcut.prototype.getQueryParameters=function(l){var g=this.searchForm.elements,h,k,j=this.searchForm.getAttribute("action");
this._formValues=[];for(h=g.length-1;h>=0;h--){var k=g[h];if(k.name!=="q"&&j.indexOf(k.name)===-1){this._formValues.push(k.name+"="+k.value);
this._formValues[k.name]=k.name}}var i="?q="+encodeURIComponent(l);if(typeof(searchSection)!="undefined"&&searchSection){i+="&section="+searchSection
}if(typeof(searchCountry)!="undefined"&&searchCountry){i+="&geo="+searchCountry.toLowerCase()
}return i};SearchShortcut.prototype.search=function(f){var e=this.baseUrl+this.getQueryParameters(f);
this.showSpinner();e+="&transport=js";var d=document.getElementsByTagName("head")[0];
script=document.createElement("script");script.id="xdShortcutContainer";script.type="text/javascript";
script.src=e;d.appendChild(script)};SearchShortcut.prototype.loadXmlToDoc=function(d){var e;
if(window.ActiveXObject){e=new ActiveXObject("Microsoft.XMLDOM");e.async="false";
e.loadXML(d)}else{var f=new DOMParser();e=f.parseFromString(d,"text/xml")}this.hideSpinner();
this.term=e.getElementsByTagName("term")[0].firstChild.nodeValue;this.xml=e.getElementsByTagName("search_results")[0];
this.parseResults(this.xml);if(this.results){this.renderResults()}};SearchShortcut.prototype.parseResults=function(k){var l=k.getElementsByTagName("error");
if(l.length>0){this.hideResults();return}else{var i=k.getElementsByTagName("match");
this.results=new Array();for(var j=0;j<i.length;j++){var h=i[j];var g={title:h.getAttribute("title"),url:h.getAttribute("url"),desc:h.getAttribute("copy"),category:h.getAttribute("category"),priority:h.getAttribute("priority"),image:h.getAttribute("image")};
g.url=decodeURIComponent(g.url);this.results.push(g)}}};SearchShortcut.prototype.renderResults=function(){this.resultsShowing=true;
this.resultsPanel.innerHTML="";var j=document.createDocumentFragment(),k=document.createElement("div"),l=document.createElement("div"),m=document.createElement("h3"),n=document.createElement("ul"),h=this.results.length;
k.className="sp-shadow";j.appendChild(k);if(this.shouldVML()){document.namespaces.add("v","urn:schemas-microsoft-com:vml");
roundrect=document.createElement("v:roundrect");roundrect.id="sp-roundrect";roundrect.strokeColor="#fff";
roundrect.fillColor="#fff";roundrect.arcSize=".01";roundrect.appendChild(l);j.appendChild(roundrect)
}else{j.appendChild(l)}if(h===0){this.results[0]={title:this.noResults,url:this.fullSearchUrl()+this.getQueryParameters(this.term)};
n.className="noresults"}else{m.innerHTML=this.quickLinks;l.appendChild(m)}var h=this.results.length;
for(var i=0;i<h;i++){if(i>5){delete this.results[i]}else{this.results[i]=new SearchShortcut.result(i,this.results[i]);
n.appendChild(this.results[i].element)}}l.appendChild(n);this.resultsPanel.appendChild(j);
if(this.shouldVML()){k.style.height=l.offsetHeight+"px";k.style.display="block"
}this.hideAllQuicktimeMovies()};SearchShortcut.prototype.hideResults=function(d,c){this.selected=false;
this.shouldHideOnMouseOut=false;this.resultsPanel.innerHTML="";this.showAllQuicktimeMovies();
this.resultsShowing=false};SearchShortcut.prototype.track=function(i,g){if(typeof(s_gi)=="undefined"||!s_gi){return
}var j="appleglobal";var h="appleussearch";var f=null;if(typeof(searchCountry)!="undefined"&&searchCountry&&searchCountry!="US"){f=SearchShortcut.geoMap[searchCountry.toUpperCase()].code
}if(f){j="apple"+f+"global";h="apple"+f+"search"}s=s_gi(j+","+h);s.linkTrackVars="eVar2,eVar4,prop7,prop10";
s.eVar2="WWW-sc: "+i.toLowerCase();s.prop7="WWW-sc: "+i.toLowerCase();s.eVar4=g;
s.prop10=g;s.tl(this,"o","Shortcut Search")};SearchShortcut.prototype.fullSearch=function(d){var c=this.fullSearchUrl()+this.getQueryParameters(this.searchText);
document.location=c.replace("q=undefined&","")};SearchShortcut.prototype.go=function(b){this.track(this.searchText,b);
document.location=b};SearchShortcut.prototype.shouldHideQuicktimeMovies=function(){var l=navigator.userAgent,g=/opera/i.test(l),i=(/msie/i.test(l)&&!g),k=/firefox/i.test(l),h=/chrome/i.test(l),j=(/applewebkit/i.test(l)&&!h);
win=/windows/i.test(l),mac=/mac/i.test(l);if(mac&&(j||h)){return false}if(win&&(i||j||h)){return false
}return true};SearchShortcut.prototype.hideAllQuicktimeMovies=function(){if(this.shouldHideQuicktimeMovies()){if(typeof(AC)!="undefined"&&typeof(AC.Quicktime)!="undefined"&&typeof(AC.Quicktime.controllers)!="undefined"){function y(b){var a=curtop=0;
if(b.offsetParent){a=b.offsetLeft;curtop=b.offsetTop;while(b=b.offsetParent){a+=b.offsetLeft;
curtop+=b.offsetTop}}return[a,curtop]}function E(q,j,b,o,f,k,d,p){var l=q+b;var a=j+o;
var m=f+d;var c=k+p;var n=Math.max(q,f);var h=Math.max(j,k);var r=Math.min(l,m);
var g=Math.min(a,c);return r>n&&g>h}var G=AC.Quicktime.controllers;var F={width:328,height:448};
var e=y(this.resultsPanel);var i=e[0]-328;var t=e[1];var u=w+F.width;var v=x+F.height;
for(var C=G.length-1;C>=0;C--){var D=G[C].movie;var z=Element.getDimensions(D);
var B=y(D);var w=B[0];var x=B[1];if(E(w,x,z.width,z.height,i,t,F.width,F.height)){this.pausedControllers.push(G[C]);
G[C].Stop();G[C].movie.style.visibility="hidden"}}}else{this.qtm=document.getElementsByTagName("object");
for(var C=0;C<this.qtm.length;C++){if(typeof(this.qtm[C].Stop)!="undefined"){this.qtm[C].Stop()
}try{if(typeof(this.qtm[C].getElementsByTagName("embed")[0].Stop)!="undefined"){this.qtm[C].getElementsByTagName("embed")[0].Stop()
}}catch(A){}this.qtm[C].style.visibility="hidden"}}}};SearchShortcut.prototype.showAllQuicktimeMovies=function(){if(typeof(AC)!="undefined"&&typeof(AC.Quicktime)!="undefined"&&typeof(AC.Quicktime.controllers)!="undefined"){for(var d=this.pausedControllers.length-1;
d>=0;d--){this.pausedControllers[d].movie.style.visibility="visible";if(navigator.userAgent.match(/Firefox/i)){this.pausedControllers[d].movie.style.zIndex="100";
setTimeout(this.pausedControllers[d].Play.bind(this.pausedControllers[d]),100)}else{this.pausedControllers[d].Play()
}}this.pausedControllers=[]}else{if(this.qtm){for(var d=0;d<this.qtm.length;d++){this.qtm[d].style.visibility="visible";
if(typeof(this.qtm[d].Play)!="undefined"){this.qtm[d].Play()}try{if(typeof(this.qtm[d].getElementsByTagName("embed")[0].Play)!="undefined"){this.qtm[d].getElementsByTagName("embed")[0].Play()
}}catch(c){}}}}};SearchShortcut.descriptionCharacters=105;SearchShortcut.titleCharacters=39;
SearchShortcut.result=function(d,c){this.index=d;this.data=c;this.data.truncated={};
if(this.data.desc){this.data.truncated.desc=unescape(this.data.desc);if(this.data.truncated.desc.length>SearchShortcut.descriptionCharacters){this.data.truncated.desc=this.data.truncated.desc.substring(0,this.data.truncated.desc.lastIndexOf(" ",this.descriptionCharacters-11))+"&hellip;"
}}if(this.data.title){this.data.truncated.title=unescape(this.data.title);if(this.data.truncated.title.length>SearchShortcut.titleCharacters){this.data.truncated.title=this.data.truncated.title.substring(0,this.data.truncated.title.lastIndexOf(" ",30))+"&hellip;"
}}this.render()};SearchShortcut.result.prototype.render=function(){var j,l,m,h,k,n,i=this;
j=document.createDocumentFragment();l=document.createElement("li");j.appendChild(l);
if(this.data.url){m=document.createElement("a");m.href=decodeURIComponent(this.data.url);
AC.addEvent(m,"mousedown",function(a){if(searchShortcut){searchShortcut.go(i.data.url)
}});l.appendChild(m)}if(this.data.image){h=new Image();h.src=this.data.image;h.alt=this.data.title;
m.appendChild(h);if(/MSIE (5\.5|6\.)/.test(navigator.userAgent)){h.src="/global/elements/blank.gif";
h.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.data.image+'",sizingMethod="scale")'
}}if(this.data.truncated.title){k=document.createElement("h4");k.innerHTML=this.data.truncated.title;
m.appendChild(k)}if(this.data.truncated.desc){n=document.createElement("p");n.innerHTML=this.data.truncated.desc;
m.appendChild(n)}this.element=l};SearchShortcut.result.prototype.select=function(){this.element.className+=" focus";
return this};SearchShortcut.result.prototype.deselect=function(){AC.removeClassName(this.element,"focus");
return this};SearchShortcut.geoMap={US:{code:"",noResults:"No shortcut found. Search all of apple.com.",viewAll:"View all search results",shortcuts:"Quick Links",searchText:"Search"},ASIA:{code:"asia"},AT:{code:"at",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},AU:{code:"au"},BE_FR:{code:"bf",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},BE_NL:{code:"bl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",shortcuts:"Snelkoppelingen",searchText:"Zoek"},BR:{code:"br",noResults:"Não encontrado. Tente a busca em apple.com",viewAll:"Ver todos os resultados da busca",shortcuts:"Links rapidos",searchText:"Buscar"},CA_EN:{code:"ca",directory:"/ca"},CA_FR:{code:"ca",directory:"/ca/fr",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Recherche"},CH_DE:{code:"ce",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},CH_FR:{code:"cr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},CN:{code:"cn",directory:".cn",noResults:"找不到快速搜索结果，请尝试 apple.com.cn 的完整搜索",shortcuts:"快速链接",viewAll:"查看所有搜索结果",searchText:"搜索"},DE:{code:"de",viewAll:"Alle Suchergebnisse",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",searchText:"Suchen"},DK:{code:"dk",noResults:"Ingen genvej fundet. Prøv at søge på hele apple.com.",viewAll:"Vis alle søgeresultater",shortcuts:"Hurtige henvisninger",searchText:"Søg"},ES:{code:"es",noResults:"Ningún atajo. Búsqueda completa en apple.com",viewAll:"Ver todos los resultados de búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},FI:{code:"fi",noResults:"Ei oikotietä. Etsi koko apple.com.",viewAll:"Katso hakutulokset",shortcuts:"Pikalinkit",searchText:"Etsi"},FR:{code:"fr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},HK:{code:"hk",noResults:"找不到快速搜尋結果，請試試 apple.com 的完整搜尋",viewAll:"檢視所有搜尋結果",shortcuts:"快速連結",searchText:"搜尋"},HK_EN:{code:"hk",directory:"/hk/en"},ID:{code:"id"},IE:{code:"ie"},IN:{code:"in"},IT:{code:"it",noResults:"Nessuna scorciatoia trovata. Provate su apple.com",viewAll:"Mostra tutti i risultati",shortcuts:"Collegamenti rapidi",searchText:"Cerca"},JP:{code:"jp",noResults:"ショートカットは見つかりませんでした。検索はこちら。",viewAll:"すべての検索結果を見る",shortcuts:"クイックリンク",searchText:"Search"},KR:{code:"kr",noResults:"일치하는 검색결과가 없습니다. 다시 검색하기.",shortcuts:"빠른 연결",viewAll:"검색 결과 전체 보기."},LA:{code:"la",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},LAE:{code:"lae",noResults:"No shortcut found. Search all of apple.com.",viewAll:"View all search results",searchText:"Search"},MX:{code:"mx",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},MY:{code:"my"},NL:{code:"nl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",shortcuts:"Snelkoppelingen",searchText:"Zoek"},NO:{code:"no",noResults:"Fant ingen snarvei. Søk på hele apple.com.",viewAll:"Vis alle søkeresultater",shortcuts:"Hurtigkoblinger",searchText:"Søk"},NZ:{code:"nz"},PH:{code:"ph"},PL:{code:"pl",noResults:"Fraza nie została odnaleziona. Użyj apple.com.",viewAll:"Przeglądaj wszystkie wyniki",shortcuts:"Podręczne łącza",searchText:"Szukaj"},PT:{code:"pt",noResults:"Nenhum resultado. Tente pesquisar em apple.com.",viewAll:"Ver todos os resultados de pesquisa",shortcuts:"Ligações rápidas",searchText:"Procurar"},RU:{code:"ru",noResults:"Ссылок нет. Попробуйте расширенный поиск.",viewAll:"Показать все результаты поиска",shortcuts:"Быстрые ссылки",searchText:"Поиск"},SE:{code:"se",noResults:"Ingen genväg hittad. Sök i hela apple.com.",viewAll:"Visa alla sökresultat",shortcuts:"Snabblänkar",searchText:"Sök"},SG:{code:"sg"},TH:{code:"th"},TW:{code:"tw",noResults:"快速搜尋找不到，試試 apple.com 完整搜尋",viewAll:"瀏覽搜索結果",shortcuts:"快速連結",searchText:"搜尋"},UK:{code:"uk"},VN:{code:"vn"},ZA:{code:"za"},PO:null,TR:null,UA:null,RO:null,CZ:null,HU:null,BG:null,HR:null,GR:null,IS:null};