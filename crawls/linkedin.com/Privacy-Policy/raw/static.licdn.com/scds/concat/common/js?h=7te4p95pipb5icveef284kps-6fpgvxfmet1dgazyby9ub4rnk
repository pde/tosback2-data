

/* 7te4p95pipb5icveef284kps */

LI.define("Login");
LI.Login=function(f,d){d=d||{};
d={autoFocus:(d.autoFocus!==false)?true:false,disableSubmit:d.disableSubmit||false,submitId:d.submitId||"btn-login"};
var b=YDom.getElementsBy(function(h){return(h.type=="text"||h.type=="password")
},"input",f),a=YDom.get(d.submitId);
function c(){for(var j=0,h=b.length;
j<h;
j++){if(b[j].value===""){b[j].focus();
break
}}}function e(){if(b[0].value!==""&&b[1].value!==""){a.disabled=false
}else{a.disabled=true
}}if(d.autoFocus){c()
}if(d.disableSubmit){e();
var g=setInterval(e,100)
}};

/* 6fpgvxfmet1dgazyby9ub4rnk */

var langSwitch=function(){var c;
function b(){var j;
var g=YDom.get("nav-utility-lang");
var h=g.getElementsByTagName("a");
YEvent.on(g,"click",function(){var i=this;
if(YDom.hasClass(i,"hover")){return
}j=setTimeout(function(){YDom.addClass(i,"hover")
},0)
});
YEvent.on(g,"mouseout",function(k){var l=this;
var i=YEvent.getRelatedTarget(k);
if(l!=i&&!YDom.isAncestor(l,i)){YDom.removeClass(l,"hover")
}clearTimeout(j)
});
h[0].onclick=function(){return false
};
var d=YDom.get("lang-list");
var f=d.getElementsByTagName("a");
for(var e=0;
f.length>e;
e++){f[e].onclick=function(){a(this.lang);
return false
}
}}function a(d){c.i18nLang.value=d;
c.submit()
}return{init:function(){if(!document.languageSelectorForm){return false
}c=document.languageSelectorForm;
b()
}}
}();
YEvent.on(window,"load",langSwitch.init);