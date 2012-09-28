var MP={
/* mp_trans_disable_start */
Version:"1.0.23",Domains:{es:"espanol.southwest.com"},SrcLang:"en",
/* mp_trans_disable_end */
UrlLang:"mp_js_current_lang",SrcUrl:decodeURIComponent("mp_js_orgin_url"),
/* mp_trans_disable_start */
init:function(){if(MP.UrlLang.indexOf("p_js_")==1){MP.SrcUrl=window.top.document.location.href;
MP.UrlLang=MP.SrcLang
}},getCookie:function(b){var c=document.cookie.indexOf(b+"=");
if(c<0){return null
}c=c+b.length+1;
var a=document.cookie.indexOf(";",c);
if(a<0){a=document.cookie.length
}while(document.cookie.charAt(c)==" "){c++
}return decodeURIComponent(document.cookie.substring(c,a))
},setCookie:function(b,e,f,d){var c=b+"="+encodeURIComponent(e);
if(f){c+="; path="+f
}if(d){c+="; domain="+d
}var a=new Date();
a.setTime(a.getTime()+1000*60*60*24*365);
c+="; expires="+a.toUTCString();
document.cookie=c
},switchLanguage:function(b){if(b!=MP.SrcLang){var a=document.createElement("SCRIPT");
a.src=location.protocol+"//"+MP.Domains[b]+"/"+MP.SrcLang+b+"/?1023749632;"+encodeURIComponent(MP.SrcUrl);
document.body.appendChild(a)
}else{if(b==MP.SrcLang&&MP.UrlLang!=MP.SrcLang){var a=document.createElement("SCRIPT");
a.src=location.protocol+"//"+MP.Domains[MP.UrlLang]+"/"+MP.SrcLang+MP.UrlLang+"/?1023749634;"+encodeURIComponent(location.href);
document.body.appendChild(a)
}}return false
},switchToLang:function(a){window.top.location.href=a
}
/* mp_trans_disable_end */
};