var _marinTrack=new Object({host:"tracker.marinsm.com",clientId:"lphf4ydgl0",expires:365,getKeyValues:function(){var a=["mkwid","utm_content","pcrid"];
return a},setClientId:function(a){this.clientId=a;return this},getClientId:function(){return this.clientId
},setHost:function(a){this.host=a;return this},getHost:function(){return this.host
},setExpires:function(a){this.expires=a;return this},getExpires:function(a){var b=new Date();
if(typeof a!="number"){a=this.expires}b.setTime(b.getTime()+(a*24*60*60*1000));return"; expires="+b.toUTCString()
},_getBrowserTzOffset:function(){var a=new Date();return a.getTimezoneOffset()/60
},_isFunction:function(a){return !!a&&typeof a!="string"&&!a.nodeName&&a.constructor!=Array&&/^[\s[]?function/.test(a+"")
},_escapeStr:function(b,a){if(b==null||b==""){return""}var d=encodeURIComponent;return this._isFunction(d)?(a?encodeURI(b):d(b)):escape(b)
},trackPage:function(){if(this.firstHit()){var a=window.location.protocol+"//"+this.getHost()+"/tp?act=1&cid="+this._escapeStr(this.clientId)+"&tz="+this._escapeStr(this._getBrowserTzOffset())+"&ref="+this._escapeStr(document.referrer)+"&page="+this._escapeStr(window.location);
if(this._hasUuidCookie()){a+="&uuid="+this._escapeStr(this._getUuidCookie())}else{a+="&uuid="+this._escapeStr(this._generateUuid())
}this._writeImage(a)}},firstHit:function(){var a=this._hasClientKeyword(window.location.toString())||this._hasClientKeyword(document.referrer)||!this._compareDomains(document.referrer,window.location.toString());
if(!this._hasUuidCookie()){this._setCookie("_msuuid",this._generateUuid())}return a
},_compareDomains:function(b,a){var d=/^([^:]*:\/\/)?([^:]*:[^@]*@)?([^\/:\?]*\.[^\/:\?]*)?(:[^\/]*)?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i;
try{return b.match(d)[3]==a.match(d)[3]}catch(c){}return false},_pruneDomain:function(a){var b=a.indexOf("/",8);
var c=a.indexOf("?",8);if(b>=0){return a.substring(b+1)}else{if(c>=0){return a.substring(c+1)
}else{return""}}},_hasKeyword:function(a,b){var c=this._pruneDomain(b);if(c.length>0){var d=new RegExp("\\W"+a+"\\W");
return d.test(c)}return false},_hasClientKeyword:function(c){if(c==null||c==""){return false
}var a=this.getKeyValues();for(var b=0;b<a.length;b++){if(this._hasKeyword(a[b],c)){return true
}}return false},processOrders:function(){var a=document.getElementsByName("utmform");
if(typeof(a)=="undefined"){a=document.getElementsByTagName("form")}for(var c=0;c<a.length;
c++){if(a[c].getAttribute("name")=="utmform"){var b=this._handleForm(a[c]);this._writeImage(b)
}}},_handleForm:function(b){if(b.utmtrans!=undefined&&b.utmtrans.value!=undefined){var a=window.location.protocol+"//"+this.getHost()+"/tp?act=2&cid="+this._escapeStr(this.clientId)+"&tz="+this._escapeStr(this._getBrowserTzOffset())+"&trans="+this._escapeStr(b.utmtrans.value)+"&ref="+this._escapeStr(document.referrer)+"&page="+this._escapeStr(window.location);
if(this._hasUuidCookie()){a+="&uuid="+this._escapeStr(this._getUuidCookie())}else{a+="&uuid="+this._escapeStr(this._generateUuid())
}if(typeof _marinTransaction!="undefined"){if(typeof _marinTransaction.currency!="undefined"){a+="&currency="+this._escapeStr(_marinTransaction.currency)
}}return a}},_getCookie:function(a){var f=null;if(document.cookie&&document.cookie!=""){var d=document.cookie.split(";");
for(var c=0;c<d.length;c++){var b=d[c];b=b.replace(/^\s+/,"");var e=a+"_"+this.clientId;
if(b.substring(0,e.length+1)==(e+"=")){f=decodeURIComponent(b.substring(e.length+1));
break}}}return f},_setCookie:function(a,b){if(b==null||b==""){return this}document.cookie=a+"_"+this.clientId+"="+this._escapeStr(b)+"; path=/"+this.getExpires();
return this},_writeImage:function(a){a=a+"&rnd="+Math.round(Math.random()*2147483647);
document.write('<img src="'+a+'" border="0" height="1" width="1" />')},_getUuidCookie:function(){return this._getCookie("_msuuid")
},_hasUuidCookie:function(){var a=this._getUuidCookie();return(a!=null&&a.length>0)
},_generateUuid:function(){var g="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var f=g,d=[],b=Math.random;var c=f.length;var e;d[8]=d[13]=d[18]=d[23]="-";d[14]="4";
for(var a=0;a<36;a++){if(!d[a]){e=0|b()*16;d[a]=f[(a==19)?(e&3)|8:e&15]}}return d.join("")
}});