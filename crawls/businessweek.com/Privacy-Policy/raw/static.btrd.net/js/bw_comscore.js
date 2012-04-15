var comScore_account="3005059";
var comScore_site="002";
var comScore_prefix="bb";
var comScore_cookie="bdfpc";
var BBBW_comScore=new function(){this.params=new Object();
this.prefix=window.comScore_prefix||"";
this.account_id=window.comScore_account||undefined;
this.site_id=window.comScore_site||undefined;
this.unique_cookie=window.comScore_cookie||undefined;
this.rand=function(n){var a="",c="",r="";
for(c=0;
c<n;
c++){r=Math.floor(Math.random()*10);
a=a+r+""
}return a
};
this.get_uid_value=function(){var d=new Date();
return this.site_id+"."+this.rand(10)+"."+d.getTime()
};
this.set_uid_cookie=function(){this.read_cookie(this.unique_cookie)?"":this.write_cookie(this.unique_cookie,this.get_uid_value(),36159)
};
this.write_cookie=function(name,value,days){if(days){var date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires="; expires="+date.toGMTString()
}else{var expires=""
}document.cookie=name+"="+value+expires+"; path=/"
};
this.read_cookie=function(name){var n=name+"=";
var ca=document.cookie.split(";");
for(var i=0;
i<ca.length;
i++){var c=ca[i];
while(c.charAt(0)==" "){c=c.substring(1,c.length)
}if(c.indexOf(n)==0){return c.substring(n.length,c.length)
}}return null
};
this.dump_attrs=function(){var r=[];
var obj=this.params;
for(var key in obj){r.push(key+": "+obj[key])
}return r
};
this.tracking_url=function(){var params=this.params,t="",unique=this.read_cookie(this.unique_cookie),m=(typeof encodeURIComponent!="undefined"?encodeURIComponent:escape);
t=t+"http"+(document.location.href.charAt(4)=="s"?"s://sb":"://b")+".scorecardresearch.com/p?c1=2&c2="+m(this.account_id);
t=t+"&"+m(this.prefix)+"_vid="+unique;
for(var prop in params){t=t+"&"+m(prop)+"="+m(params[prop])
}return t
};
this.track=function(){this.set_uid_cookie();
var u=this.tracking_url();
comScore(u);
function comScore(t){var b="comScore",o=document,f=o.location,a="",e="undefined",g=2048,s,k,p,h,r="characterSet",n="defaultCharset",m=(typeof encodeURIComponent!=e?encodeURIComponent:escape);
if(o.cookie.indexOf(b+"=")!=-1){p=o.cookie.split(";");
for(h=0,f=p.length;
h<f;
h++){var q=p[h].indexOf(b+"=");
if(q!=-1){a="&"+unescape(p[h].substring(q+b.length+1))
}}}t=t+"&ns__t="+(new Date().getTime());
t=t+"&ns_c="+(o[r]?o[r]:(o[n]?o[n]:""))+"&c8="+m(o.title)+a+"&c7="+m(f&&f.href?f.href:o.URL)+"&c9="+m(o.referrer);
if(t.length>g&&t.indexOf("&")>0){s=t.substr(0,g-8).lastIndexOf("&");
t=(t.substring(0,s)+"&ns_cut="+m(t.substring(s+1))).substr(0,g)
}if(o.images){k=new Image();
if(typeof ns_p==e){ns_p=k
}k.src=t
}else{o.write(["<","p","><",'img src="',t,'" height="1" width="1" alt="*"',"><","/p",">"].join(""))
}}}
};
