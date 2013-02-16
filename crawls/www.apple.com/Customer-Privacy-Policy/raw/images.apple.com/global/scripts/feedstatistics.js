if(typeof(AC.addEvent)==="undefined"){AC.addEvent=function(d,e,f){if(d.addEventListener){return d.addEventListener(e,f,false)
}return d.attachEvent("on"+e,f)}}var FeedStatistics=function(){if(typeof(aiRequestsEnabled)!=="undefined"&&aiRequestsEnabled===false){return
}this.hostUri=window.location.protocol+"//"+window.location.hostname+"/search/instant/feedStatistics";
this.params={};this.params.model="marcom_en_US";this.params.locale="en_US";this.callback="FeedStatistics.callbackSuccess";
this.storageDays=0;this.readTimer=3000;this.countryScope="us";this.globalNavScope=["global","mac","ipod","iphone","ipad","ipoditunes"];
this.searchPageScope=["global"];this.readScope=["global","mac","ipod","iphone","ipad","ipoditunes"]
};FeedStatistics.callbackSuccess=function(b){if(typeof window.console!=="undefined"){if(typeof(responseLog)!=="undefined"&&responseLog===true){console.log(b)
}}};FeedStatistics.prototype.globalNavFeed=function(){if(this.checkScope(this.globalNavScope)){var b=document.getElementById("sp-searchtext");
if(typeof(b)!=="undefined"&&b!=null){this.inputFeed(b)}}};FeedStatistics.prototype.searchInputFeed=function(){if(this.checkScope(this.searchPageScope)){var b=document.getElementById("barsearchapple");
if(typeof(b)!=="undefined"&&b!=null){this.inputFeed(b)}}};FeedStatistics.prototype.inputFeed=function(d){if(d){var e=this;
var f=e.getStorageItem("query");AC.addEvent(d,"keyup",function(b){if(!b){b=event
}var a=b.keyCode;if(a===13&&!b.altKey&&f&&f!==""&&f!==d.value){e.updateNotViewed()
}})}};FeedStatistics.prototype.searchResultFeed=function(){if(this.checkScope(this.searchPageScope)){var c=document.body.className;
var d;if(c&&(c==="search")){d=document.getElementById("www").getElementsByTagName("li");
if(Search.allResults&&Search.allResults.length===0){this.updateSearched(false)}else{this.updateSearched(true);
this.loadResultListeners(d)}this.updateStorageItem("next",false)}}};FeedStatistics.prototype.nextPageFeed=function(){if(this.checkScope(this.searchPageScope)){var c=document.body.className;
var d=document.getElementById("www").getElementsByTagName("li");if((typeof(d)!=="undefined")&&(d.length!==0)){this.loadResultListeners(d)
}if((c)&&(c==="search")){if((typeof(this.getStorageItem("next"))!=="undefined")&&(this.getStorageItem("next")===true)){return
}else{this.updateNextPage();this.updateStorageItem("next",true)}}}};FeedStatistics.prototype.readFeed=function(){if(this.checkScope(this.readScope)){if(typeof(s)!=="undefined"){if(typeof(s.pageType)!=="undefined"&&s.pageType==="errorPage"){return
}}if((this.getStorageItem("read")!==null)&&(window.location.href===this.getStorageItem("selectedUri"))){var c=new Date();
var d=this;this.currentTime=c.getTime();AC.addEvent(window,"beforeunload",function(h){var b=new Date();
var a=b.getTime()-d.currentTime;var g=Math.round(a/1000);if(a>d.readTimer){d.updateRead(true,g)
}else{d.updateRead(false,g)}d.updateStorageItem("read",null)})}}};FeedStatistics.prototype.updateNotViewed=function(){if(typeof(aiRequestsEnabled)!=="undefined"&&aiRequestsEnabled!==false){var b=this.params;
b.feedType="notviewed";b.feedQuery=(this.getStorageItem("query")!==null)?encodeURIComponent(this.getStorageItem("query")):null;
this.sendRequest(b)}};FeedStatistics.prototype.updateSearched=function(c){var d=this.params;
d.feedType="searched";d.hasResults=(c===true)?"true":"false";d.feedQuery=encodeURIComponent(this.getQueryFromUri());
d.feedLastSuggestions=(this.getStorageItem("lastSuggestions")!==null)?encodeURIComponent(this.getStorageItem("lastSuggestions")):null;
this.sendRequest(d);this.updateStorageItem("query",this.getQueryFromUri())};FeedStatistics.prototype.updateNextPage=function(){var b=this.params;
b.feedType="nextpage";b.feedQuery=encodeURIComponent(this.getQueryFromUri());this.sendRequest(b)
};FeedStatistics.prototype.updateRead=function(f,d){var e=this.params;e.feedType=(f)?"read":"notread";
e.feedArticleID=(this.getStorageItem("selectedUri")!==null)?this.getStorageItem("selectedUri"):null;
e.feedQuery=(this.getStorageItem("query")!==null)?encodeURIComponent(this.getStorageItem("query")):null;
e.position=(this.getStorageItem("position")!==null)?this.getStorageItem("position"):null;
e.timeSpent=d;this.sendRequest(e)};FeedStatistics.prototype.updateLastSuggestions=function(b){this.updateStorageItem("lastSuggestions",b)
};FeedStatistics.prototype.updateLastQuery=function(b){this.updateStorageItem("query",b)
};FeedStatistics.prototype.udpateResultActivity=function(d,c){this.updateStorageItem("read",false);
this.updateStorageItem("position",d);this.updateStorageItem("selectedUri",c)};FeedStatistics.prototype.loadResultListeners=function(v){try{var i=this;
var r;var w=v.length;var n;var o;var p;var q;var t;for(r=0;r<w;r+=1){var m=v[r].getElementsByTagName("a");
AC.addEvent(m[0],"mousedown",function(b){n=this;var c=(!n.attributes)?n.position:n.getAttribute("position"),a=(!n.attributes)?n.href:n.getAttribute("href");
if(c&&a){o=c;q=a}i.udpateResultActivity(o,q);return false});AC.addEvent(m[1],"mousedown",function(a){n=this;
if(n.attributes.position&&n.attributes.href){p=n.attributes.position.value;t=n.attributes.href.value
}i.udpateResultActivity(p,t);return false})}}catch(u){}};FeedStatistics.prototype.getStorageItem=function(d){var c=AC.Storage.getItem("feedStats");
if((typeof(c)!=="undefined")&&(c!==null)){if(typeof(c[d])!=="undefined"){return c[d]
}else{return null}}};FeedStatistics.prototype.updateStorageItem=function(h,i){var j={};
j[h]=i;var g=AC.Storage.getItemObject("feedStats");if((typeof(g)!=="undefined")&&(g!==null)){if(g.hasOwnProperty("value")){var f=Object.extend(g.value,j);
AC.Storage.setItem("feedStats",f,this.storageDays)}else{return}}else{AC.Storage.setItem("feedStats",j,this.storageDays)
}};FeedStatistics.prototype.sendRequest=function(f){var d=this.generateStatisticsUri(f);
if(d.indexOf(location.protocol+"//"+location.host)===0){var e;if(window.XMLHttpRequest){e=new XMLHttpRequest()
}else{e=new ActiveXObject("Microsoft.XMLHTTP")}e.open("GET",d,false);e.send()}};
FeedStatistics.prototype.generateStatisticsUri=function(f){function e(a){a=unescape(a);
a=a.replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s\s+/g," ");a=escape(a);return a
}f.feedQuery=e(f.feedQuery);var d=this.hostUri+"?feedType="+f.feedType+"&query="+f.feedQuery+"&locale="+f.locale+"&model="+f.model;
if(f.feedType){switch(f.feedType){case"notviewed":break;case"searched":d=d+"&hasResults="+f.hasResults+"&lastSuggestions="+f.feedLastSuggestions;
break;case"nextpage":break;case"read":d=d+"&articleID="+f.feedArticleID+"&position="+f.position+"&timeSpent="+f.timeSpent;
break;case"notread":d=d+"&articleID="+f.feedArticleID+"&position="+f.position+"&timeSpent="+f.timeSpent;
break;default:break}d=d+"&callback="+this.callback}return d};FeedStatistics.prototype.checkScope=function(c){var d;
if((typeof(searchCountry)!=="undefined")&&(typeof(searchSection)!=="undefined")){if(searchCountry===this.countryScope){for(d=0;
d<c.length;d+=1){if(searchSection===c[d]){return true}}}}else{return false}return false
};FeedStatistics.prototype.getQueryFromUri=function(){var i=window.location.href;
var f="q";f=f.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var g="[\\?&]"+f+"=([^&#]*)";
var j=new RegExp(g);var h=j.exec(i);if(h===null){return""}return decodeURIComponent(h[1])
};Event.onDOMReady(function(){if(typeof(aiRequestsEnabled)!=="undefined"&&aiRequestsEnabled!==false){var b=new FeedStatistics();
b.globalNavFeed();b.readFeed()}});