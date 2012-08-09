UPX.browserUpgradeNotification=(function(){var b={Windows:{Firefox:3.5,Safari:5,Chrome:10,Explorer:7},Mac:{Firefox:3.5,Safari:5,Chrome:10}},a=$("#browserUpgradeNotification");
var c={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS"
},searchString:function(g){for(var d=0;
d<g.length;
d++){var e=g[d].string;
var f=g[d].prop;
this.versionSearchString=g[d].versionSearch||g[d].identity;
if(e){if(e.indexOf(g[d].subString)!=-1){return g[d].identity
}}else{if(f){return g[d].identity
}}}},searchVersion:function(e){var d=e.indexOf(this.versionSearchString);
if(d==-1){return
}return parseFloat(e.substring(d+this.versionSearchString.length+1))
},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
c.init();
return{init:function(){var d=b[c.OS][c.browser];
if(a.length>0){if(c.version<d&&UPX_browserUpgradeNotification.lastDisplayed()){UPX_browserUpgradeNotification.notify()
}}},notify:function(){var d,e=document.location.host,f=e.substring(e.indexOf("."));
utils.createCookie("browser","true",30,null,f);
a.overlay({onLoad:function(){if($.fn.bgiframe){$("#exposeMask").bgiframe()
}},closeOnClick:false,fixed:false,target:"#browserUpgradeNotificationOverlay",mask:{color:null}});
d=c.browser==="Explorer"?"Internet Explorer":c.browser;
a.find("span.browserVersion").text(d+" "+c.version);
a.overlay().load()
},lastDisplayed:function(){var d=utils.getCookie("browser");
if(d==="true"){return false
}else{return true
}}}
}());
UPX.browserUpgradeNotification.init();