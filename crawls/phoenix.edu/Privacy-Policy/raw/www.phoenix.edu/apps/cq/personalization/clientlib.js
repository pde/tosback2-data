if(!CQ_Analytics.UpxDataMgr){CQ_Analytics.UpxDataMgr=function(){};
CQ_Analytics.UpxDataMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.UpxDataMgr.prototype.STOREKEY="UPXDATA";
CQ_Analytics.UpxDataMgr.prototype.STORENAME="upxdata";
CQ_Analytics.UpxDataMgr.prototype.init=function(){var a=new CQ_Analytics.SessionPersistence();
var b=a.get(this.getStoreKey());
if(!b||b==""){this.data={};
for(var c in this.initProperty){this.data[c]=this.initProperty[c]
}}else{this.data=this.parse(b)
}this.persist();
this.fireEvent("update")
};
CQ_Analytics.UpxDataMgr.prototype.getLabel=function(a){return a
};
CQ_Analytics.UpxDataMgr.prototype.getLink=function(a){return""
};
CQ_Analytics.UpxDataMgr.prototype.clear=function(){var a=new CQ_Analytics.SessionPersistence();
a.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.UpxDataMgr=new CQ_Analytics.UpxDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.UpxDataMgr)
};
CQ_Analytics.Cookie.set=function(e,g,h){var a="";
if(h){var d=new Date();
d.setTime(d.getTime()+(h*24*60*60*1000));
a="; expires="+d.toGMTString()
}var c=window.location.hostname;
var f=".phoenix.edu";
if(c&&c.length>0){if(c.split(".").length>1){var b=c.indexOf(".");
f=b>-1?c.substring(b):c
}else{f=""
}}document.cookie=e+"="+g+a+"; path=/; domain="+f
};
CQ_Analytics.Utils.loadElement=function(c,i){var h;
try{h=new ActiveXObject("Msxml2.XMLHTTP")
}catch(g){try{h=new ActiveXObject("Microsoft.XMLHTTP")
}catch(f){try{h=new XMLHttpRequest()
}catch(d){h=false
}}}var b="#"+i;
h.onreadystatechange=function(){if(h.readyState==4){if(h.status==200){$(b).html(h.responseText);
$(b+"_loadingimg").remove();
$(b).show();
var j=c.substring(0,c.indexOf("/_jcr_content/par.disableEdit.html"));
var l=j.split("/");
var e=l.length>1?l[l.length-2]:"";
var k=l.length>0?l[l.length-1]:"";
$(b).find("a").each(function(){var o=encodeURI($(this).html());
var n=encodeURI(e)+"-_-"+encodeURI(k)+"-_-"+o;
var m=this.href+"?cm_sp="+n
});
COMMON_moduleInitializer.initializeMiscModules()
}else{$(b+"_loadingimg").remove();
$(b).show()
}}};
var a=function(){h.open("GET",c,true);
h.send(null)
};
window.setTimeout(a,1)
};
function initializeTeaserLoader(b,e,f,d,a){d=d=="true"||d===true;
if(window.CQ_Analytics){var c=function(){var k="/_jcr_content/par.disableEdit.html";
var j=function(m){var o="";
var q=new Array();
if(CQ_Analytics.SegmentMgr){var p=0;
for(var n=0;
n<b.length;
n++){if(!b[n]["segments"]||b[n]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(b[n]["segments"])===true){var l=CQ_Analytics.SegmentMgr.getMaxBoost(b[n]["segments"]);
if(m==b[n].path){o+=CQ.I18n.getMessage("<b>Teaser {0} is resolved ( boost = {1} )</b><br>",[b[n]["name"],l])
}else{o+=CQ.I18n.getMessage("Teaser {0} is resolved with ( boost = {1} )<br>",[b[n]["name"],l])
}if(l==p){q.push(b[n])
}else{if(l>p){q=new Array();
q.push(b[n]);
p=l
}}}else{o+=CQ.I18n.getMessage("Teaser {0} is not resolved<br>",b[n]["name"])
}}}o+=CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>",e);
return o
};
var i=a;
var g=null;
var h=function(){var r=new Array();
if(CQ_Analytics.SegmentMgr){var o=0;
for(var m=0;
m<b.length;
m++){if(!b[m]["segments"]||b[m]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(b[m]["segments"])===true){var q=CQ_Analytics.SegmentMgr.getMaxBoost(b[m]["segments"]);
if(q==o){r.push(b[m])
}else{if(q>o){r=new Array();
r.push(b[m]);
o=q
}}}}}if(r.length>0){var s=r[0];
if(CQ_Analytics.StrategyMgr){var t=CQ_Analytics.StrategyMgr.choose(e,r);
if(t!=null){s=t
}}if(!i||i.path!=s.path){i=s;
CQ_Analytics.Utils.loadElement(s.path+k,f);
var p=$("div#"+f);
COMMON_moduleInitializer.activateScripts(p);
if(d){if(n){n.remove()
}var l=CQ.Ext.get(f);
if(l){var n=new CQ.Ext.ToolTip({target:l,html:j(i.path),title:CQ.I18n.getMessage("Selection decision"),width:420})
}}}else{$("#"+f+"_loadingimg").remove();
$("#"+f).show()
}}else{if(d&&n){n.remove()
}$("#"+f+"_loadingimg").remove();
CQ_Analytics.Utils.clearElement(f);
i=null
}};
h.call();
if(CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr.addListener("update",h)
}};
if(CQ_Analytics.ClickstreamcloudMgr){if(CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded){c.call(this)
}else{CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",c)
}}}};
