(function(){var a=(function(){var b={Windows:{Firefox:3.5,Safari:5,Chrome:10,Explorer:7},Mac:{Firefox:3.5,Safari:5,Chrome:10}},c={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS"
},searchString:function(g){for(var d=0;
d<g.length;
d++){var e=g[d].string;
var f=g[d].prop;
this.versionSearchString=g[d].versionSearch||g[d].identity;
if(e){if(e.indexOf(g[d].subString)!==-1){return g[d].identity
}}else{if(f){return g[d].identity
}}}},searchVersion:function(e){var d=e.indexOf(this.versionSearchString);
if(d===-1){return
}return parseFloat(e.substring(d+this.versionSearchString.length+1))
},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
c.init();
return{init:function(){var d=b[c.OS][c.browser];
if(c.version<d&&a.lastDisplayed()){a.notify()
}},notify:function(){var e=$("#browserUpgradeNotification"),d,f=document.location.host,g=f.substring(f.indexOf("."));
utils.createCookie("browser","true",30,null,g);
e.overlay({onLoad:function(){if($.fn.bgiframe){$("#exposeMask").bgiframe()
}},closeOnClick:false,fixed:false,target:"#browserUpgradeNotificationOverlay",mask:{color:null}});
d=c.browser==="Explorer"?"Internet Explorer":c.browser;
$("#browserUpgradeNotification").html('<div id="browserUpgradeNotification"><div class="buh1">It looks like you are using <span class="browserVersion">'+d+" "+c.version+'</span>.</div><div><div class="buh3">Enhance your Phoenix.edu experience</div><p>You&apos;re using an older browser (a software program used to explore the web) which is not optimal for viewing the University of Phoenix website. Consider downloading a new browser to maximize your experience on this and other websites. Your new browser should display web pages properly, increase your web surfing speed and enhance your security.</p><div class="downloads"><div class="buh3">Upgrade your browser</div><ul><li class="chrome"><a href="http://www.google.com/chrome"><span class="icn"></span><span class="action">Download Google Chrome</span></a></li><li class="ff"><a href="http://www.mozilla.org/en-US/firefox/new/"><span class="icn"></span><span class="action">Download Firefox</span></a></li></ul><ul><li class="safari"><a href="http://www.apple.com/safari/"><span class="icn"></span><span class="action">Download Safari</span></a></li><li class="ie"><a href="http://http://windows.microsoft.com/en-US/internet-explorer/download-ie"><span class="icn"></span><span class="action">Download Internet explorer</span></a></li></ul></div></div></div></div>');
$(".browserUpgrade").modal("show");
e.overlay().load()
},lastDisplayed:function(){var d=utils.getCookie("browser");
if(d==="true"){return false
}else{return true
}}}
}());
a.init()
}());