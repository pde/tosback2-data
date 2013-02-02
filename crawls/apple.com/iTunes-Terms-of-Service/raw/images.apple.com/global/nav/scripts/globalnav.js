if(typeof(AC)==="undefined"){AC={}}document.createElement("nav");AC.addEvent=function(d,e,f){if(d.addEventListener){return d.addEventListener(e,f,false)
}else{return d.attachEvent("on"+e,f)}};AC.removeEvent=function(d,e,f){if(d.removeEventListener){return d.removeEventListener(e,f,false)
}else{return d.detachEvent("on"+e,f)}};AC.removeClassName=function(d,c){c=new RegExp(c,"g");
if(d){d.className=d.className.replace(c,"").replace(/ +/g," ").replace(/ +$/gm,"").replace(/^ +/gm,"")
}};AC.getPreviousSibling=function(b){while(b=b.previousSibling){if(b.nodeType===1){return b
}}};if(typeof(AC.Detector)==="undefined"){AC.Detector={_iOSVersion:null,iOSVersion:function(){if(this._iOSVersion===null){this._iOSVersion=(navigator.userAgent.match(/applewebkit/i)&&(navigator.platform.match(/iphone/i)||navigator.platform.match(/ipod/i)||navigator.platform.match(/ipad/i)))?parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_",".")):false
}return this._iOSVersion},_svgAsBackground:null,svgAsBackground:function(f){if(this._svgAsBackground===null){var d=function(){AC.Detector._svgAsBackground=true;
if(typeof(f)==="function"){f()}};var e=document.createElement("img");e.setAttribute("src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
if(e.complete){e.style.visibility="hidden";e.style.position="absolute";document.body.appendChild(e);
window.setTimeout(function(){AC.Detector._svgAsBackground=false;if(e.width>=100){document.body.removeChild(e);
d()}else{document.body.removeChild(e)}},1)}else{this._svgAsBackground=false;e.onload=d
}}else{if(this._svgAsBackground&&typeof(f)==="function"){f()}}return this._svgAsBackground
},_style:null,_prefixes:null,_preFixes:null,_css:null,isCSSAvailable:function(i){if(!this._style){this._style=document.createElement("browserdetect").style
}if(!this._prefixes){this._prefixes="-webkit- -moz- -o- -ms- -khtml- ".split(" ")
}if(!this._preFixes){this._preFixes="Webkit Moz O ms Khtml ".split(" ")}if(!this._css){this._css={}
}i=i.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(i){case"gradient":if(this._css.gradient!==undefined){return this._css.gradient
}var i="background-image:";var l="gradient(linear,left top,right bottom,from(#9f9),to(white));";
var m="linear-gradient(left top,#9f9, white);";this._style.cssText=(i+this._prefixes.join(l+i)+this._prefixes.join(m+i)).slice(0,-i.length);
this._css.gradient=(this._style.backgroundImage.indexOf("gradient")!==-1);return this._css.gradient;
case"inset-box-shadow":if(this._css["inset-box-shadow"]!==undefined){return this._css["inset-box-shadow"]
}var i="box-shadow:";var j="#fff 0 1px 1px inset;";this._style.cssText=this._prefixes.join(i+j);
this._css["inset-box-shadow"]=(this._style.cssText.indexOf("inset")!==-1);return this._css["inset-box-shadow"];
default:var n=i.split("-");var r=n.length;var o;var p;var q;if(n.length>0){i=n[0];
for(p=1;p<r;p+=1){i+=n[p].substr(0,1).toUpperCase()+n[p].substr(1)}}o=i.substr(0,1).toUpperCase()+i.substr(1);
if(this._css[i]!==undefined){return this._css[i]}for(q=this._preFixes.length-1;
q>=0;q--){if(this._style[this._preFixes[q]+i]!==undefined||this._style[this._preFixes[q]+o]!==undefined){this._css[i]=true;
return true}}return false}return false}}}AC.GlobalNav=function(){var d=this;var c;
this.globalHeader=document.getElementById("globalheader");this.globalSearch=document.getElementById("sp-searchtext");
this.globalStylesheet=document.getElementById("globalheader-stylesheet");if(this.globalHeader){this.globalHeader.className+=" globalheader-js";
AC.Detector.svgAsBackground(function(){d.globalHeader.className+=" svg"});if(navigator.userAgent.match(/applewebkit/i)){if(!navigator.geolocation){this.globalHeader.className+=" decelerate"
}else{if(navigator.platform.match(/ipad/i)||navigator.platform.match(/iphone/i)||navigator.platform.match(/ipod/i)){this.globalHeader.className+=" ios"
}}if(AC.Detector.iOSVersion()&&AC.Detector.iOSVersion()<=3.2){this.globalHeader.className+=" ios3"
}if(!AC.Detector.isCSSAvailable("inset-box-shadow")||(navigator.userAgent.match(/chrome/i)&&navigator.userAgent.match(/windows/i))){this.globalHeader.className+=" noinset"
}}this.enhanceSearch();this.decorateSearchInput();this.vml();this.decorateTabStates();
if(AC.GlobalNav.canEnhance()&&this.globalStylesheet){this.enhancedGlobalStylesheet=this.globalStylesheet.cloneNode(true);
this.enhancedGlobalStylesheet.id="globalheader-enhanced-stylesheet";this.enhancedGlobalStylesheet.href=this.globalStylesheet.href.replace("/navigation.css","/enhanced.css");
this.globalStylesheet.parentNode.appendChild(this.enhancedGlobalStylesheet)}this.loaded()
}};AC.GlobalNav._canEnhance=null;AC.GlobalNav.canEnhance=function(){if(AC.GlobalNav.canEnhance._canEnhance==null){var b=navigator.userAgent.replace(/^.*version\/([\d\.]*) .*$/i,"$1").split(".");
AC.GlobalNav.canEnhance._canEnhance=(AC.Detector.isCSSAvailable("transition-property")&&AC.Detector.isCSSAvailable("gradient")&&(AC.Detector.iOSVersion()===false||AC.Detector.iOSVersion()>=3.2)&&!(navigator.userAgent.match(/applewebkit/i)&&b.length===3&&(b[0]<=4&&b[1]<=0&&b[2]<=2)))
}return AC.GlobalNav.canEnhance._canEnhance};AC.GlobalNav.prototype.enhanceSearch=function(){this.globalSearchForm=document.getElementById("g-search");
if(this.globalSearchForm&&this.globalSearch){if(typeof(searchCountry)==="undefined"){searchCountry="us"
}if(SearchShortcut.geoMap[searchCountry.toUpperCase()].directory){var h=SearchShortcut.geoMap[searchCountry.toUpperCase()].directory
}else{if(searchCountry!=="us"){var h="/"+searchCountry.replace(/_/,"")}else{h=""
}}var e={global:"http://www.apple.com"+h+"/search/",ipad:"http://www.apple.com"+h+"/search/",iphone:"http://www.apple.com"+h+"/search/",ipoditunes:"http://www.apple.com"+h+"/search/",mac:"http://www.apple.com"+h+"/search/",store:"http://www.apple.com"+h+"/search/",support:"http://www.info.apple.com/searchredir.html"};
if(typeof(window.searchHost)!=="undefined"&&window.searchHost===true){var g=window.location.protocol+"//"+window.location.hostname;
if(searchSection!=="support"){var f=e[searchSection].replace("http://www.apple.com",g)
}}else{var f=e[searchSection]||"http://www.apple.com/search/"}this.globalSearchForm.setAttribute("action",f);
this.globalSearchForm.setAttribute("method","get");this.searchWrapper=document.getElementById("globalsearch");
this.resultsPanel=document.getElementById("sp-results");this.searchPosition="globalNav";
this.enhancedSearch=enhancedSearch=new SearchShortcut("globalnav",this.globalSearchForm,this.globalSearch,"sp-results",this.searchPosition);
SearchShortcut.globalNavCallback=function(a){enhancedSearch.loadJson(a)};SearchShortcut.loadXmlToDoc=function(a){enhancedSearch.loadXmlToDoc(a)
}}};AC.GlobalNav.prototype.decorateSearchInput=function(){if(this.globalSearch){var k=document.getElementById("g-search");
var j=document.createDocumentFragment();var h;var l;var m;var n=this;var i=true;
this.globalSearch.setAttribute("autocomplete","off");this.globalSearch.setAttribute("autocorrect","off");
this.globalSearch.setAttribute("autocapitalize","off");this.globalSearch.setAttribute("role","combobox");
this.globalSearch.setAttribute("aria-owns",this.resultsPanel.id);this.globalSearch.setAttribute("aria-haspopup","true");
this.globalSearch.setAttribute("aria-autocomplete","both");h=document.createElement("input");
this.globalSearch.parentNode.replaceChild(h,this.globalSearch);l=document.createElement("div");
l.className="reset";resetEnd=function(a){if(a.target===l&&window.getComputedStyle(l,null)["opacity"]==="0"){l.style.display="none"
}};if(window.addEventListener){l.addEventListener("transitionend",resetEnd,true);
l.addEventListener("transitionEnd",resetEnd,true);l.addEventListener("oTransitionEnd",resetEnd,false);
l.addEventListener("mozTransitionEnd",resetEnd,false);l.addEventListener("webkitTransitionEnd",resetEnd,false)
}if(this.globalSearch.value.length===0){k.className+=" empty"}j.appendChild(this.globalSearch);
j.appendChild(l);m=function(a){i=false;n.globalSearch.value="";if(n.enhancedSearch){n.enhancedSearch.hideResults()
}window.setTimeout(function(){k.className+=" empty";i=true;n.globalSearch.focus()
},10)};AC.addEvent(l,"mousedown",m);AC.addEvent(this.globalSearch,"focus",function(a){if(i){l.style.display="";
window.setTimeout(function(){n.globalHeader.className+=" searchmode"},10)}});AC.addEvent(this.globalSearch,"blur",function(a){if(i){l.style.display="";
window.setTimeout(function(){AC.removeClassName(n.globalHeader,"searchmode")},10)
}else{i=true}});AC.addEvent(this.globalSearch,"keydown",function(b){var a=b.keyCode;
i=true;if(n.globalSearch.value.length>=0){l.style.display="";window.setTimeout(function(){AC.removeClassName(k,"empty")
},10)}else{if(!k.className.match("empty")){k.className+=" empty"}}if(b.keyCode===27){m(b)
}});if(h){h.parentNode.replaceChild(j,h)}}};AC.GlobalNav.prototype.vml=function(){var h;
var g;var j;var f;var i;if(!AC.Detector.isCSSAvailable("border-radius")&&document.namespaces&&this.globalHeader){document.namespaces.add("v","urn:schemas-microsoft-com:vml");
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
var e=this;var f=this.globalHeader.className.replace(/ .*/,"");var d;for(d=this.globalNavItems.length-1;
d>=0;d--){if(this.globalNavItems[d].href.match(f)){this.currentTab=this.globalNavItems[d]
}AC.addEvent(this.globalNavItems[d],"mousedown",function(b){var a=(b.target)?b.target:b.srcElement;
a=e.getPreviousNavItem(a);if(a&&a!==e.currentTab){a.className+=" before"}});AC.addEvent(this.globalNavItems[d],"mouseout",function(b){var a=(b.target)?b.target:b.srcElement;
a=e.getPreviousNavItem(a);if(a&&a!==e.currentTab){AC.removeClassName(a,"before")
}})}if(this.currentTab){this.currentTab=this.getPreviousNavItem(this.currentTab);
this.currentTab.className+=" before"}};AC.GlobalNav.prototype.loaded=function(c){var d=this;
if(this.loadedTimeout){window.clearTimeout(this.loadedTimeout)}if(!this.cancelLoadedTimeout){this.cancelLoadedTimeout=window.setTimeout(function(){d.loaded(true)
},500)}if(!this.testEnhancedLoaded){this.testEnhancedLoaded=document.createElement("div");
this.testEnhancedLoaded.id="globalheader-loaded-test";document.body.appendChild(this.testEnhancedLoaded)
}if(c||this.testEnhancedLoaded.offsetWidth===0){this.globalHeader.className+=" globalheader-loaded"
}else{this.loadedTimeout=window.setTimeout(function(){d.loaded()},10)}};var SearchShortcut=function(h,k,m,i,j){this.searchWrapper=typeof(h)==="string"?document.getElementById(h):h;
this.searchForm=typeof(k)==="string"?document.getElementById(k):k;this.searchInput=typeof(m)==="string"?document.getElementById(m):m;
this.resultsPanel=typeof(i)==="string"?document.getElementById(i):i;this.searchPosition=j;
this.globalHeader=document.getElementById("globalheader");this.aiSuggestionToggle=true;
this.aiTimeoutLimit=3000;this.aiTimeoutFlag=true;this.addSection();var l=(/applewebkit/i.test(navigator.userAgent)&&!/ipad/i.test(navigator.userAgent)&&/mobile/i.test(navigator.userAgent))||/webos/i.test(navigator.userAgent)||/android/i.test(navigator.userAgent)||/blackberry/i.test(navigator.userAgent)||/windows ce/i.test(navigator.userAgent)||/opera mini/i.test(navigator.userAgent);
if(l){aiRequestsEnabled=false;deactivateSearchShortcuts=true}if(this.shouldVML()){this.resultsPanel.className+=" sp-results-vml"
}this.addSpinner();this.minimumCharactersForSearch=0;this.entryDelay=0;this.currentRequest=false;
this.quickLinks=SearchShortcut.geoMap.US.shortcuts;this.suggestedSearchLinks=SearchShortcut.geoMap.US.suggestionsText;
this.noResults=SearchShortcut.geoMap.US.noResults;if(typeof(searchCountry)!=="undefined"&&searchCountry){this.quickLinks=SearchShortcut.geoMap[searchCountry.toUpperCase()].shortcuts||this.quickLinks;
this.noResults=SearchShortcut.geoMap[searchCountry.toUpperCase()].noResults||this.noResults
}var n=this;AC.addEvent(this.searchForm,"submit",function(b){try{b.preventDefault();
b.stopPropagation()}catch(a){}return false});AC.addEvent(this.searchInput,"keydown",function(a){n.handleKeyEvent(a)
});AC.addEvent(this.searchInput,"keyup",function(a){n.handleKeyEvent(a)});AC.addEvent(this.searchInput,"blur",function(a){n.onBlur(a)
});AC.addEvent(this.searchInput,"focus",function(a){n.searchText=n.searchInput.value
})};SearchShortcut.prototype.shouldVML=function(){return(!AC.Detector.isCSSAvailable("border-radius")&&document.namespaces)
};SearchShortcut.prototype.addSpinner=function(){this.spinner=document.createElement("div");
this.spinner.className="spinner hide";this.searchInput.parentNode.appendChild(this.spinner)
};SearchShortcut.prototype.hideSpinner=function(){this.spinner.className+=" hide"
};SearchShortcut.prototype.showSpinner=function(){AC.removeClassName(this.spinner,"hide")
};SearchShortcut.prototype.addSection=function(){var b=document.getElementById("search-section");
if(!b){b=document.createElement("input");b.id="search-section";b.type="hidden";
b.name="sec";b.value=window.searchSection;this.searchForm.appendChild(b)}else{if(b){b.value=window.searchSection
}}};SearchShortcut.prototype.handleKeyEvent=function(p){var m=this;var n=(typeof(window.event)!=="undefined")?event.keyCode:p.keyCode;
var l=p.type||event.type;var u={13:"enter",9:"tab",27:"escape",38:"arrowUp",40:"arrowDown",39:"arrowRight",37:"arrowLeft",17:"arrowRight",91:"arrowLeft",35:"end",36:"home"};
var v=function(){try{p.preventDefault();p.stopPropagation()}catch(a){}};var t={enter:{keydown:function(){var a=(typeof(FeedStatistics)!=="undefined")?new FeedStatistics():false;
if(!p.altKey){if(m.selected){if(a){a.updateStorageItem("search type","common searches")
}m.go(m.selected.data.url)}else{if(typeof(FeedStatistics)!=="undefined"){if(a){a.updateStorageItem("search type","user")
}m.hideResults();m.fullSearch()}else{m.hideResults();m.fullSearch()}}}}},tab:{keydown:function(){m.hideResults()
}},escape:{keydown:function(){m.results={}}},arrowUp:{keydown:function(){if(m.results){v()
}},keyup:function(){if(m.results){v();if(m.selected){if(m.selected&&m.selected.index>0){m.selected.deselect();
m.selected=m.results[m.selected.index-1].select()}else{m.searchInput.value=m.searchText;
m.selected.deselect();m.selected=false}if(m.resultsShowing===true){m.updateSearchFieldWithSuggestions()
}}}}},arrowDown:{keyup:function(){if(m.results){v();if(m.selected&&m.results[m.selected.index+1]){m.selected.deselect();
m.selected=m.results[m.selected.index+1].select()}else{if(!m.selected&&m.results[0]){m.selected=m.results[0].select()
}}if(m.resultsShowing===true){m.updateSearchFieldWithSuggestions()}}}},arrowLeft:{keyup:function(){if(m.results){v()
}}},arrowRight:{keyup:function(){if(m.results){v()}}},everyKey:{keydown:function(){if(m.searchInput.value===""){m.results={}
}},keyup:function(){var a=m.searchInput.value;if(m.searchInput.value===""){m.searchText=""
}else{if(a.length>m.minimumCharactersForSearch&&!m.selected){m.searchText=a;m.startKeystrokeTimer()
}}}},unmappedKey:{keyup:function(){m.selected=false;var a=m.searchInput.value;a=a.replace(/^\s+/g,"").replace(/\s+$/g,"");
a=a.replace(/\s\s+/g," ");if(a.length>m.minimumCharactersForSearch){m.searchText=a;
m.startKeystrokeTimer()}else{m.hideSpinner();m.hideResults()}}}};var o=t[u[n]]||t.unmappedKey;
var w=(typeof(o)!=="undefined")?o[l]:null;var r=t.everyKey;var q=(typeof(r)!=="undefined")?r[l]:null;
if(w){w()}if(q){q()}};SearchShortcut.prototype.updateSearchFieldWithSuggestions=function(){if((typeof this.selected.data)!=="undefined"){if(this.selected.data.category==="Suggestions"){this.searchInput.value=this.selected.data.desc
}else{if(this.selected.data.category==="Quick Link"){this.searchInput.value=this.searchText
}else{if(this.selected.data.category==="No Results"){return}}}}};SearchShortcut.prototype.onMouseMove=function(b){b=b||window.event;
this.mouseEventTarget=(b.target)?b.target:b.srcElement;if(this.shouldHideOnMouseOut){if(!this.isOverResults()){this.hideResults(b)
}}};SearchShortcut.prototype.isOverResults=function(b){if(!this.mouseEventTarget){return false
}while((this.mouseEventTarget.id!=="sp-results")&&this.mouseEventTarget.parentNode){this.mouseEventTarget=this.mouseEventTarget.parentNode
}return(this.mouseEventTarget.id==="sp-results")};SearchShortcut.prototype.onBlur=function(b){if(this.isOverResults()){this.shouldHideOnMouseOut=true
}else{if(!this.selected&&!this.isOverResults()){this.hideResults(b)}else{if(this.selected&&!this.isOverResults()){this.hideResults(b);
this.searchInput.value=this.searchText}}}};SearchShortcut.prototype.startKeystrokeTimer=function(){if(this.timeoutId){window.clearTimeout(this.timeoutId)
}var b=this;this.timeoutId=window.setTimeout(function(){b.commitKeystroke()},this.entryDelay)
};SearchShortcut.prototype.commitKeystroke=function(){if(typeof(deactivateSearchShortcuts)!=="undefined"&&deactivateSearchShortcuts){return
}this.search(this.searchText)};SearchShortcut.prototype.fullSearchUrl=function(){var b=this.searchForm.getAttribute("action");
return b};SearchShortcut.prototype.getQueryParameters=function(l){var g=this.searchForm.elements,h,k,j=this.searchForm.getAttribute("action");
this._formValues=[];for(h=g.length-1;h>=0;h--){var k=g[h];if(k.name!=="q"&&j.indexOf(k.name)===-1){this._formValues.push(k.name+"="+k.value);
this._formValues[k.name]=k.name}}var i="?q="+encodeURIComponent(l);if(this.searchPosition==="globalNav"){if(typeof(searchSection)!=="undefined"&&searchSection){i+="&section="+searchSection
}if(typeof(searchCountry)!=="undefined"&&searchCountry){i+="&geo="+searchCountry.toLowerCase()
}}return i};SearchShortcut.prototype.search=function(l){this.showSpinner();var n=this;
if(this.searchPosition==="globalNav"){var j=new SearchShortcut.quickLinks();var m=this.getQueryParameters(l);
var i=j.generateScript(m);this.sendRequest(i)}if(searchCountry&&searchCountry==="us"){if(typeof(aiRequestsEnabled)!=="undefined"&&aiRequestsEnabled!==false){var k=new SearchShortcut.appleInstant(this.searchPosition);
var h=k.generateScript(l);this.sendRequest(h);if(this.aiTimeoutId){window.clearTimeout(this.aiTimeoutId)
}this.aiTimeoutFlag=true;this.aiTimeoutId=window.setTimeout(function(){n.hideSpinner();
n.aiTimeoutFlag=false},this.aiTimeoutLimit)}else{this.hideSpinner()}}};SearchShortcut.prototype.sendRequest=function(d){var c=document.getElementsByTagName("head")[0];
c.appendChild(d)};SearchShortcut.prototype.loadData=function(){this.results=new Array();
var h;var e;var f;var g;if(!this.searchSuggestions&&this.searchShortcuts){g=this.searchShortcuts.length;
for(h=0;h<g;h+=1){this.results.push(this.searchShortcuts[h])}}else{if(this.searchSuggestions&&!this.searchShortcuts){f=this.searchSuggestions.length;
for(h=0;h<f;h+=1){this.results.push(this.searchSuggestions[h])}}else{if(this.searchSuggestions&&this.searchShortcuts){f=this.searchSuggestions.length;
g=this.searchShortcuts.length;for(h=0;h<f;h+=1){this.results.push(this.searchSuggestions[h])
}for(e=0;e<g;e+=1){this.results.push(this.searchShortcuts[e])}}}}};SearchShortcut.prototype.loadJson=function(c){this.hideSpinner();
if((typeof(this.aiTimeoutFlag)!=="undefined")&&this.aiTimeoutFlag===false){return
}if(typeof(aiDisplaySuggestions)==="undefined"||aiDisplaySuggestions===false){return
}if(c.hasOwnProperty("0")){this.parseJsonResults(c);if(typeof(JSON.stringify)==="function"){this.lastSuggestions=JSON.stringify(c)
}this.loadData();if(this.results){this.renderResults()}}else{delete this.searchSuggestions;
this.lastSuggestions={};this.loadData();if(this.results){this.renderResults()}}if(typeof(FeedStatistics)!=="undefined"){var d=new FeedStatistics();
d.updateLastSuggestions(this.lastSuggestions)}};SearchShortcut.prototype.parseJsonResults=function(k){var g="";
var i=-1;var l;if(g.length>0){this.hideResults();return}else{if(k){this.searchSuggestions=new Array();
for(l in k){if(k.hasOwnProperty(l)){var j=parseInt(l,10);var h={url:this.fullSearchUrl()+this.getQueryParameters(k[j]),desc:k[j],category:"Suggestions"};
this.searchSuggestions[j]=h}}}}};SearchShortcut.prototype.loadXmlToDoc=function(h){var e;
if(window.ActiveXObject){e=new ActiveXObject("Microsoft.XMLDOM");e.async="false";
e.loadXML(h)}else{var g=new DOMParser();e=g.parseFromString(h,"text/xml")}this.hideSpinner();
var f=e.getElementsByTagName("term");if(f.length>0&&f[0].childNodes.length>0){this.term=f[0].firstChild.nodeValue;
this.xml=e.getElementsByTagName("search_results")[0];this.parseResults(this.xml)
}else{return}if(this.searchShortcuts){this.loadData()}if(this.results){this.renderResults()
}};SearchShortcut.prototype.parseResults=function(l){var m=l.getElementsByTagName("error");
var j;var n;var i;var h;var k;if(m.length>0){this.hideResults();return}else{j=l.getElementsByTagName("match");
n=0;this.searchShortcuts=new Array();if(j.length>6){n=6}else{n=j.length}for(k=0;
k<n;k+=1){i=j[k];h={title:i.getAttribute("title"),url:i.getAttribute("url"),desc:i.getAttribute("copy"),priority:i.getAttribute("priority"),image:i.getAttribute("image"),category:"Quick Link"};
h.url=decodeURIComponent(h.url);this.searchShortcuts.push(h)}}};SearchShortcut.prototype.renderResults=function(){var i=this;
if(!this.hideResultsOnMouseOut){this.hideResultsOnMouseOut=function(a){if(!i.resultsShowing){return
}i.onMouseMove(a)};AC.addEvent(document,"mousemove",this.hideResultsOnMouseOut)
}this.resultsShowing=true;this.resultsPanel.innerHTML="";var n=document.createDocumentFragment(),o=document.createElement("div"),x=document.createElement("div"),t=document.createElement("h3"),q=document.createElement("ul"),w=this.results.length;
q.setAttribute("role","listbox");o.className="sp-shadow";n.appendChild(o);if(this.shouldVML()){document.namespaces.add("v","urn:schemas-microsoft-com:vml");
roundrect=document.createElement("v:roundrect");roundrect.id="sp-roundrect";roundrect.strokeColor="#fff";
roundrect.fillColor="#fff";roundrect.arcSize=".01";roundrect.appendChild(x);n.appendChild(roundrect)
}else{n.appendChild(x)}if(w===0){this.results[0]={title:this.noResults,url:this.fullSearchUrl()+this.getQueryParameters(this.searchText),category:"No Results"};
q.className="noresults"}var w=this.results.length;var v=true;var p=true;var u;for(u=0;
u<w;u+=1){if(v){if(this.results[u].category==="Suggestions"){var r=document.createElement("h3");
r.className="suggestions";r.innerHTML=this.suggestedSearchLinks;q.appendChild(r);
v=false}}if(p){if(this.results[u].category==="Quick Link"){var y=document.createElement("h3");
y.className="quicklinks";y.innerHTML=this.quickLinks;q.appendChild(y);p=false}}this.results[u]=new SearchShortcut.result(u,this.results[u],i);
this.results[u].element.setAttribute("role","option");this.results[u].element.setAttribute("aria-setsize",w);
this.results[u].element.setAttribute("aria-posinset",u+1);q.appendChild(this.results[u].element)
}if(v===false&&p===false){q.className="suggestions-quicklinks"}else{if(v!==false&&p===false){q.className="quicklinks"
}else{if(v===false&&p!==false){q.className="suggestions"}else{if(this.results.length===0&&this.results[0].category==="No Results"){q.className="noresults suggestions-quicklinks"
}}}}x.appendChild(q);this.resultsPanel.appendChild(n);if(this.shouldVML()){o.style.height=x.offsetHeight+"px";
o.style.display="block"}this.hideAllQuicktimeMovies()};SearchShortcut.prototype.hideResults=function(d,c){if(this.hideResultsOnMouseOut){AC.removeEvent(document,"mousemove",this.hideResultsOnMouseOut);
delete this.hideResultsOnMouseOut}this.selected=false;this.shouldHideOnMouseOut=false;
this.resultsPanel.innerHTML="";this.showAllQuicktimeMovies();this.resultsShowing=false
};SearchShortcut.prototype.track=function(i,g){if(typeof(s_gi)==="undefined"||!s_gi){return
}var j="appleglobal";var h="appleussearch";var f=null;if(typeof(searchCountry)!=="undefined"&&searchCountry&&searchCountry!=="US"){f=SearchShortcut.geoMap[searchCountry.toUpperCase()].code
}if(f){j="apple"+f+"global";h="apple"+f+"search"}s=s_gi(j+","+h);s.linkTrackVars="eVar2,eVar4,prop7,prop10";
s.eVar2="WWW-sc: "+i.toLowerCase();s.prop7="WWW-sc: "+i.toLowerCase();s.eVar4=g;
s.prop10=g;s.tl(this,"o","Shortcut Search")};SearchShortcut.prototype.fullSearch=function(o){this.searchText=this.searchInput.value;
this.searchText=this.searchText.replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s\s+/g," ");
var m=this.fullSearchUrl()+this.getQueryParameters(this.searchText);if(typeof(FeedStatistics)!=="undefined"){var n=new FeedStatistics();
n.inputFeed();var k=n.getStorageItem("query"),p=n.getQueryFromUri(),i=this.searchText,l=n.getStorageItem("next"),j=(document.location.href.indexOf(location.protocol+"//"+document.domain+"/search/")===0);
if(k&&i!==""&&i!==k){if(!l&&j){n.updateNotViewed()}}n.updateLastQuery(i);n.updateStorageItem("next",false)
}document.location=m.replace("q=undefined&","")};SearchShortcut.prototype.go=function(b){this.track(this.searchText,b);
document.location=b};SearchShortcut.prototype.shouldHideQuicktimeMovies=function(){var l=navigator.userAgent,g=/opera/i.test(l),i=(/msie/i.test(l)&&!g),k=/firefox/i.test(l),h=/chrome/i.test(l),j=(/applewebkit/i.test(l)&&!h);
win=/windows/i.test(l),mac=/mac/i.test(l);if(mac&&(j||h)){return false}if(win&&(i||j||h)){return false
}return true};SearchShortcut.prototype.hideAllQuicktimeMovies=function(){if(this.shouldHideQuicktimeMovies()){if(typeof(AC)!=="undefined"&&typeof(AC.Quicktime)!=="undefined"&&typeof(AC.Quicktime.controllers)!=="undefined"){function y(b){var a=curtop=0;
if(b.offsetParent){a=b.offsetLeft;curtop=b.offsetTop;while(b=b.offsetParent){a+=b.offsetLeft;
curtop+=b.offsetTop}}return[a,curtop]}function E(q,j,b,o,f,k,d,p){var l=q+b;var a=j+o;
var m=f+d;var c=k+p;var n=Math.max(q,f);var h=Math.max(j,k);var r=Math.min(l,m);
var g=Math.min(a,c);return r>n&&g>h}var G=AC.Quicktime.controllers;var F={width:328,height:448};
var e=y(this.resultsPanel);var i=e[0]-328;var t=e[1];var u=w+F.width;var v=x+F.height;
for(var C=G.length-1;C>=0;C--){var D=G[C].movie;var z=Element.getDimensions(D);
var B=y(D);var w=B[0];var x=B[1];if(E(w,x,z.width,z.height,i,t,F.width,F.height)){this.pausedControllers.push(G[C]);
G[C].Stop();G[C].movie.style.visibility="hidden"}}}else{this.qtm=document.getElementsByTagName("object");
for(var C=0;C<this.qtm.length;C++){if(typeof(this.qtm[C].Stop)!=="undefined"){this.qtm[C].Stop()
}try{if(typeof(this.qtm[C].getElementsByTagName("embed")[0].Stop)!=="undefined"){this.qtm[C].getElementsByTagName("embed")[0].Stop()
}}catch(A){}this.qtm[C].style.visibility="hidden"}}}};SearchShortcut.prototype.showAllQuicktimeMovies=function(){if(typeof(AC)!=="undefined"&&typeof(AC.Quicktime)!=="undefined"&&typeof(AC.Quicktime.controllers)!=="undefined"){for(var d=this.pausedControllers.length-1;
d>=0;d--){this.pausedControllers[d].movie.style.visibility="visible";if(navigator.userAgent.match(/Firefox/i)){this.pausedControllers[d].movie.style.zIndex="100";
setTimeout(this.pausedControllers[d].Play.bind(this.pausedControllers[d]),100)}else{this.pausedControllers[d].Play()
}}this.pausedControllers=[]}else{if(this.qtm){for(var d=0;d<this.qtm.length;d++){this.qtm[d].style.visibility="visible";
if(typeof(this.qtm[d].Play)!=="undefined"){this.qtm[d].Play()}try{if(typeof(this.qtm[d].getElementsByTagName("embed")[0].Play)!=="undefined"){this.qtm[d].getElementsByTagName("embed")[0].Play()
}}catch(c){}}}}};SearchShortcut.descriptionCharacters=105;SearchShortcut.titleCharacters=39;
SearchShortcut.result=function(d,f,e){this.index=d;this.data=f;this.qLinks=e;this.data.truncated={};
if(this.data.desc){this.data.truncated.desc=unescape(this.data.desc);if(this.data.truncated.desc.length>SearchShortcut.descriptionCharacters){this.data.truncated.desc=this.data.truncated.desc.substring(0,this.data.truncated.desc.lastIndexOf(" ",this.descriptionCharacters-11))+"&hellip;"
}}if(this.data.title){this.data.truncated.title=unescape(this.data.title);if(this.data.truncated.title.length>SearchShortcut.titleCharacters){this.data.truncated.title=this.data.truncated.title.substring(0,this.data.truncated.title.lastIndexOf(" ",30))+"&hellip;"
}}this.render()};SearchShortcut.result.prototype.render=function(){var l=document.createDocumentFragment();
var k=document.createElement("li");var n;var p;var o;var m;var j=this;var q=this.qLinks;
var r=window.location.protocol+"//"+window.location.hostname;l.appendChild(k);if(this.data.url){n=document.createElement("a");
if(typeof(window.searchHost)!=="undefined"&&window.searchHost===true){n.href=decodeURIComponent(this.data.url).replace("http://www.apple.com",r)
}else{n.href=decodeURIComponent(this.data.url)}if(this.data.category==="Suggestions"){n.className="suggestions"
}AC.addEvent(n,"mousedown",function(b){if(q){q.go(j.data.url);if(typeof(FeedStatistics)!=="undefined"){var a=new FeedStatistics();
a.updateStorageItem("search type","common searches")}}});k.appendChild(n)}if(this.data.image){p=new Image();
p.src=this.data.image;p.alt=this.data.title;n.appendChild(p);if(/MSIE (5\.5|6\.)/.test(navigator.userAgent)){p.src="/global/elements/blank.gif";
p.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.data.image+'",sizingMethod="scale")'
}}if(this.data.truncated.title){o=document.createElement("h4");o.innerHTML=this.data.truncated.title;
n.appendChild(o)}if(this.data.truncated.desc){m=document.createElement("p");m.innerHTML=this.data.truncated.desc;
n.appendChild(m)}this.element=k};SearchShortcut.result.prototype.select=function(){this.element.className+=" focus";
return this};SearchShortcut.result.prototype.deselect=function(){AC.removeClassName(this.element,"focus");
return this};SearchShortcut.quickLinks=function(){this.baseShortcutsUrl="http://www.apple.com/global/nav/scripts/shortcuts.php"
};SearchShortcut.quickLinks.prototype.generateScript=function(d){var f=this.baseShortcutsUrl+d+"&transport=js";
var e=document.createElement("script");e.id="xdShortcutContainer";e.type="text/javascript";
e.src=f;return e};SearchShortcut.appleInstant=function(d){this.aiLocale="en_US";
this.aiModel=typeof(modelValue)==="undefined"?"marcom_en_US":modelValue;if(typeof(window.searchHost)!=="undefined"&&window.searchHost===true){var c=window.location.protocol+"//"+window.location.hostname;
this.aiGetSuggestionsUrl=c+"/search/instant/getSuggestions"}else{this.aiGetSuggestionsUrl="http://www.apple.com/search/instant/getSuggestions"
}if(d==="searchPage"){this.aiGetSuggestionsCallback="SearchShortcut.searchPageCallback"
}else{if(d==="globalNav"){this.aiGetSuggestionsCallback="SearchShortcut.globalNavCallback"
}}};SearchShortcut.appleInstant.prototype.generateScript=function(f){var d=this.aiGetSuggestionsUrl+"?&query="+encodeURIComponent(f)+"&locale="+this.aiLocale+"&model="+this.aiModel+"&callback="+this.aiGetSuggestionsCallback;
var e=document.createElement("script");e.id="xdSuggestionsContainer";e.type="text/javascript";
e.src=d;return e};SearchShortcut.geoMap={US:{code:"",noResults:"No suggestions found. Search all of apple.com.",viewAll:"View all search results",shortcuts:"Recommended Results",suggestionsText:"Common Searches",searchText:"Search"},ASIA:{code:"asia"},AT:{code:"at",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},AU:{code:"au"},BE_FR:{code:"bf",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},BE_NL:{code:"bl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",shortcuts:"Snelkoppelingen",searchText:"Zoek"},BR:{code:"br",noResults:"Não encontrado. Tente a busca em apple.com",viewAll:"Ver todos os resultados da busca",shortcuts:"Links rapidos",searchText:"Buscar"},CA_EN:{code:"ca",directory:"/ca"},CA_FR:{code:"ca",directory:"/ca/fr",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Recherche"},CH_DE:{code:"ce",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},CH_FR:{code:"cr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},CN:{code:"cn",directory:".cn",noResults:"找不到快速搜索结果，请尝试 apple.com.cn 的完整搜索",shortcuts:"快速链接",viewAll:"查看所有搜索结果",searchText:"搜索"},DE:{code:"de",viewAll:"Alle Suchergebnisse",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",searchText:"Suchen"},DK:{code:"dk",noResults:"Ingen genvej fundet. Prøv at søge på hele apple.com.",viewAll:"Vis alle søgeresultater",shortcuts:"Hurtige henvisninger",searchText:"Søg"},ES:{code:"es",noResults:"Ningún atajo. Búsqueda completa en apple.com",viewAll:"Ver todos los resultados de búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},FI:{code:"fi",noResults:"Ei oikotietä. Etsi koko apple.com.",viewAll:"Katso hakutulokset",shortcuts:"Pikalinkit",searchText:"Etsi"},FR:{code:"fr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},HK:{code:"hk",noResults:"找不到快速搜尋結果，請試試 apple.com 的完整搜尋",viewAll:"檢視所有搜尋結果",shortcuts:"快速連結",searchText:"搜尋"},HK_EN:{code:"hk",directory:"/hk/en"},ID:{code:"id"},IE:{code:"ie"},IN:{code:"in"},IT:{code:"it",noResults:"Nessuna scorciatoia trovata. Provate su apple.com",viewAll:"Mostra tutti i risultati",shortcuts:"Collegamenti rapidi",searchText:"Cerca"},JP:{code:"jp",noResults:"ショートカットは見つかりませんでした。検索はこちら。",viewAll:"すべての検索結果を見る",shortcuts:"クイックリンク",searchText:"Search"},KR:{code:"kr",noResults:"일치하는 검색결과가 없습니다. 다시 검색하기.",shortcuts:"빠른 연결",viewAll:"검색 결과 전체 보기."},LA:{code:"la",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},LAE:{code:"lae",noResults:"No shortcut found. Search all of apple.com.",viewAll:"View all search results",searchText:"Search"},MX:{code:"mx",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},MY:{code:"my"},NL:{code:"nl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",shortcuts:"Snelkoppelingen",searchText:"Zoek"},NO:{code:"no",noResults:"Fant ingen snarvei. Søk på hele apple.com.",viewAll:"Vis alle søkeresultater",shortcuts:"Hurtigkoblinger",searchText:"Søk"},NZ:{code:"nz"},PH:{code:"ph"},PL:{code:"pl",noResults:"Fraza nie została odnaleziona. Użyj apple.com.",viewAll:"Przeglądaj wszystkie wyniki",shortcuts:"Podręczne łącza",searchText:"Szukaj"},PT:{code:"pt",noResults:"Nenhum resultado. Tente pesquisar em apple.com.",viewAll:"Ver todos os resultados de pesquisa",shortcuts:"Ligações rápidas",searchText:"Procurar"},RU:{code:"ru",noResults:"Ссылок нет. Попробуйте расширенный поиск.",viewAll:"Показать все результаты поиска",shortcuts:"Быстрые ссылки",searchText:"Поиск"},SE:{code:"se",noResults:"Ingen genväg hittad. Sök i hela apple.com.",viewAll:"Visa alla sökresultat",shortcuts:"Snabblänkar",searchText:"Sök"},SG:{code:"sg"},TH:{code:"th"},TW:{code:"tw",noResults:"快速搜尋找不到，試試 apple.com 完整搜尋",viewAll:"瀏覽搜索結果",shortcuts:"快速連結",searchText:"搜尋"},UK:{code:"uk"},VN:{code:"vn"},ZA:{code:"za"},PO:null,TR:null,UA:null,RO:null,CZ:null,HU:null,BG:null,HR:null,GR:null,IS:null};