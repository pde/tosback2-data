function cq5forms_isArray(A){if(typeof A.length=="number"&&typeof A.item=="function"){return true
}else{return false
}}function cq5forms_showMsg(E,C,D,A){var B=document.forms[E].elements[C];
alert(D);
if(cq5forms_isArray(B)){if(!A){A=0
}B[A].focus()
}else{B.focus()
}}function cq5forms_isEmpty(B){var A=true;
if(cq5forms_isArray(B)){for(i=0;
i<B.length;
i++){if(B[i].type=="radio"||B[i].type=="checkbox"){if(B[i].checked){A=false
}}else{if(B[i].value.length>0){A=false
}}}}else{if(B.type=="radio"||B.type=="checkbox"){if(B.checked){A=false
}}else{if(B.value.length>0){A=false
}}}return A
}function cq5forms_regcheck(F,D){var B=false;
var C=D.exec(F);
if(C){var A=F.length;
var E=C[0].length;
B=(E==A)
}return B
}(function(A){A(function(){function C(F,G){try{if(A.cq.isAuthor()||window.location.hash=="#debug"){if(typeof console!="undefined"&&typeof console.log!="undefined"){console.log(F);
console.log(G)
}alert(F.name+":\n"+F.message+".\n"+G+".")
}}catch(H){}}try{var D=A.browser.msie?0:250;
function B(F){try{if(window.location.hash.length>0&&A(window.location.hash,F).length>0){window.location=(window.location+"").replace(window.location.hash,"")
}}catch(G){C(G,"Could not remove hash")
}}try{A(".cq-carousel").each(function(){var U=A(this);
var G=+A("var[title='play-delay']",this).text();
if(!G){G=6000
}var J=+A("var[title='transition-time']",this).text();
if(!J){J=1000
}var S=A(".cq-carousel-banners",this);
var N=A(".cq-carousel-banner-switch",this);
var T=N.find("a");
var O=A(".cq-carousel-banner-item",this);
var F=O.outerWidth();
var P=O.filter(":first");
var L=null;
var H=null;
var K=0;
var M=A("a.cq-carousel-control-prev",this);
M.click(function(){if(M.is(".cq-carousel-active")){A(T[(K+T.length-1)%T.length]).click()
}return false
});
var R=A("a.cq-carousel-control-next",this);
R.click(function(){if(R.is(".cq-carousel-active")){A(T[(K+1)%T.length]).click()
}return false
});
if(T.length>1){R.addClass("cq-carousel-active")
}function I(){Q();
if(G>0){H=setInterval(function(){A(T[(K+1)%T.length]).click()
},G)
}}function Q(){if(H!==null){clearInterval(H);
H=null
}}if(D||A.browser.version>6){P.css("left",0)
}else{P.show()
}T.click(function(){var X=A(this);
var V=O.filter(X.attr("href"));
var W=V.prevAll().length;
var Y=(W>K||H!==null)?1:-1;
if(!X.is(".cq-carousel-active")){T.removeClass("cq-carousel-active");
X.addClass("cq-carousel-active");
if(P.is(":animated")){P.stop(true,true);
L.stop(true,true)
}if(D){V.css({left:Y*F}).animate({left:0,opacity:1},J);
P.animate({left:-Y*F,opacity:0},J)
}else{if(A.browser.version>6){V.css({left:Y*F}).animate({left:0},J);
P.animate({left:-Y*F},J)
}else{V.fadeIn();
P.fadeOut()
}}L=P;
P=V;
K=W;
if(K>0){M.addClass("cq-carousel-active")
}else{M.removeClass("cq-carousel-active")
}if(K<T.length-1){R.addClass("cq-carousel-active")
}else{R.removeClass("cq-carousel-active")
}}return false
}).each(function(){var V=A(this);
V.attr("title",V.text())
}).filter(":first").addClass("cq-carousel-active");
I();
U.hover(function(){Q();
M.fadeIn();
R.fadeIn()
},function(){I();
M.fadeOut();
R.fadeOut()
});
B(this)
})
}catch(E){C(E,"Could not initialize the banners")
}}catch(E){C(E,"Init failed")
}})
})($CQ||$);