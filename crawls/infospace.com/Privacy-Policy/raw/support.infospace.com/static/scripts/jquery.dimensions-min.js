(function(B){var E=B.fn.height,A=B.fn.width;
B.fn.extend({height:function(){if(!this[0]){D()
}if(this[0]==window){if((B.browser.mozilla||B.browser.opera)&&B(document).width()>self.innerWidth){return self.innerHeight-H()
}else{return self.innerHeight||B.boxModel&&document.documentElement.clientHeight||document.body.clientHeight
}}if(this[0]==document){return Math.max(document.body.scrollHeight,document.body.offsetHeight)
}return E.apply(this,arguments)
},width:function(){if(!this[0]){D()
}if(this[0]==window){if((B.browser.mozilla||B.browser.opera)&&B(document).height()>self.innerHeight){return self.innerWidth-H()
}else{return self.innerWidth||B.boxModel&&document.documentElement.clientWidth||document.body.clientWidth
}}if(this[0]==document){if(B.browser.mozilla){var I=self.pageXOffset;
self.scrollTo(99999999,self.pageYOffset);
var J=self.pageXOffset;
self.scrollTo(I,self.pageYOffset);
return document.body.offsetWidth+J
}else{return Math.max(document.body.scrollWidth,document.body.offsetWidth)
}}return A.apply(this,arguments)
},innerHeight:function(){if(!this[0]){D()
}return this[0]==window||this[0]==document?this.height():this.is(":visible")?this[0].offsetHeight-G(this,"borderTopWidth")-G(this,"borderBottomWidth"):this.height()+G(this,"paddingTop")+G(this,"paddingBottom")
},innerWidth:function(){if(!this[0]){D()
}return this[0]==window||this[0]==document?this.width():this.is(":visible")?this[0].offsetWidth-G(this,"borderLeftWidth")-G(this,"borderRightWidth"):this.width()+G(this,"paddingLeft")+G(this,"paddingRight")
},outerHeight:function(I){if(!this[0]){D()
}I=B.extend({margin:false},I||{});
return this[0]==window||this[0]==document?this.height():this.is(":visible")?this[0].offsetHeight+(I.margin?(G(this,"marginTop")+G(this,"marginBottom")):0):this.height()+G(this,"borderTopWidth")+G(this,"borderBottomWidth")+G(this,"paddingTop")+G(this,"paddingBottom")+(I.margin?(G(this,"marginTop")+G(this,"marginBottom")):0)
},outerWidth:function(I){if(!this[0]){D()
}I=B.extend({margin:false},I||{});
return this[0]==window||this[0]==document?this.width():this.is(":visible")?this[0].offsetWidth+(I.margin?(G(this,"marginLeft")+G(this,"marginRight")):0):this.width()+G(this,"borderLeftWidth")+G(this,"borderRightWidth")+G(this,"paddingLeft")+G(this,"paddingRight")+(I.margin?(G(this,"marginLeft")+G(this,"marginRight")):0)
},scrollLeft:function(I){if(!this[0]){D()
}if(I!=undefined){return this.each(function(){if(this==window||this==document){window.scrollTo(I,B(window).scrollTop())
}else{this.scrollLeft=I
}})
}if(this[0]==window||this[0]==document){return self.pageXOffset||B.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft
}return this[0].scrollLeft
},scrollTop:function(I){if(!this[0]){D()
}if(I!=undefined){return this.each(function(){if(this==window||this==document){window.scrollTo(B(window).scrollLeft(),I)
}else{this.scrollTop=I
}})
}if(this[0]==window||this[0]==document){return self.pageYOffset||B.boxModel&&document.documentElement.scrollTop||document.body.scrollTop
}return this[0].scrollTop
},position:function(I){return this.offset({margin:false,scroll:false,relativeTo:this.offsetParent()},I)
},offset:function(M,U){if(!this[0]){D()
}var N=0,I=0,T=0,S=0,J=this[0],a=this[0],L,Z,X=B.css(J,"position"),Y=B.browser.mozilla,K=B.browser.msie,V=B.browser.opera,Q=B.browser.safari,W=B.browser.safari&&parseInt(B.browser.version)>520,R=false,P=false,M=B.extend({margin:true,border:false,padding:false,scroll:true,lite:false,relativeTo:document.body},M||{});
if(M.lite){return this.offsetLite(M,U)
}if(M.relativeTo.jquery){M.relativeTo=M.relativeTo[0]
}if(J.tagName=="BODY"){N=J.offsetLeft;
I=J.offsetTop;
if(Y){N+=G(J,"marginLeft")+(G(J,"borderLeftWidth")*2);
I+=G(J,"marginTop")+(G(J,"borderTopWidth")*2)
}else{if(V){N+=G(J,"marginLeft");
I+=G(J,"marginTop")
}else{if((K&&jQuery.boxModel)){N+=G(J,"borderLeftWidth");
I+=G(J,"borderTopWidth")
}else{if(W){N+=G(J,"marginLeft")+G(J,"borderLeftWidth");
I+=G(J,"marginTop")+G(J,"borderTopWidth")
}}}}}else{do{Z=B.css(a,"position");
N+=a.offsetLeft;
I+=a.offsetTop;
if(Y||K||W){N+=G(a,"borderLeftWidth");
I+=G(a,"borderTopWidth");
if(Y&&Z=="absolute"){R=true
}if(K&&Z=="relative"){P=true
}}L=a.offsetParent||document.body;
if(M.scroll||Y){do{if(M.scroll){T+=a.scrollLeft;
S+=a.scrollTop
}if(V&&(B.css(a,"display")||"").match(/table-row|inline/)){T=T-((a.scrollLeft==a.offsetLeft)?a.scrollLeft:0);
S=S-((a.scrollTop==a.offsetTop)?a.scrollTop:0)
}if(Y&&a!=J&&B.css(a,"overflow")!="visible"){N+=G(a,"borderLeftWidth");
I+=G(a,"borderTopWidth")
}a=a.parentNode
}while(a!=L)
}a=L;
if(a==M.relativeTo&&!(a.tagName=="BODY"||a.tagName=="HTML")){if(Y&&a!=J&&B.css(a,"overflow")!="visible"){N+=G(a,"borderLeftWidth");
I+=G(a,"borderTopWidth")
}if(((Q&&!W)||V)&&Z!="static"){N-=G(L,"borderLeftWidth");
I-=G(L,"borderTopWidth")
}break
}if(a.tagName=="BODY"||a.tagName=="HTML"){if(((Q&&!W)||(K&&B.boxModel))&&X!="absolute"&&X!="fixed"){N+=G(a,"marginLeft");
I+=G(a,"marginTop")
}if(W||(Y&&!R&&X!="fixed")||(K&&X=="static"&&!P)){N+=G(a,"borderLeftWidth");
I+=G(a,"borderTopWidth")
}break
}}while(a)
}var O=F(J,M,N,I,T,S);
if(U){B.extend(U,O);
return this
}else{return O
}},offsetLite:function(I,P){if(!this[0]){D()
}var J=0,K=0,O=0,N=0,Q=this[0],L,I=B.extend({margin:true,border:false,padding:false,scroll:true,relativeTo:document.body},I||{});
if(I.relativeTo.jquery){I.relativeTo=I.relativeTo[0]
}do{J+=Q.offsetLeft;
K+=Q.offsetTop;
L=Q.offsetParent||document.body;
if(I.scroll){do{O+=Q.scrollLeft;
N+=Q.scrollTop;
Q=Q.parentNode
}while(Q!=L)
}Q=L
}while(Q&&Q.tagName!="BODY"&&Q.tagName!="HTML"&&Q!=I.relativeTo);
var M=F(this[0],I,J,K,O,N);
if(P){B.extend(P,M);
return this
}else{return M
}},offsetParent:function(){if(!this[0]){D()
}var I=this[0].offsetParent;
while(I&&(I.tagName!="BODY"&&B.css(I,"position")=="static")){I=I.offsetParent
}return B(I)
}});
var D=function(){throw"Dimensions: jQuery collection is empty"
};
var G=function(I,J){return parseInt(B.css(I.jquery?I[0]:I,J))||0
};
var F=function(K,N,I,J,L,M){if(!N.margin){I-=G(K,"marginLeft");
J-=G(K,"marginTop")
}if(N.border&&((B.browser.safari&&parseInt(B.browser.version)<520)||B.browser.opera)){I+=G(K,"borderLeftWidth");
J+=G(K,"borderTopWidth")
}else{if(!N.border&&!((B.browser.safari&&parseInt(B.browser.version)<520)||B.browser.opera)){I-=G(K,"borderLeftWidth");
J-=G(K,"borderTopWidth")
}}if(N.padding){I+=G(K,"paddingLeft");
J+=G(K,"paddingTop")
}if(N.scroll&&(!B.browser.opera||K.offsetLeft!=K.scrollLeft&&K.offsetTop!=K.scrollLeft)){L-=K.scrollLeft;
M-=K.scrollTop
}return N.scroll?{top:J-M,left:I-L,scrollTop:M,scrollLeft:L}:{top:J,left:I}
};
var C=0;
var H=function(){if(!C){var I=B("<div>").css({width:100,height:100,overflow:"auto",position:"absolute",top:-1000,left:-1000}).appendTo("body");
C=100-I.append("<div>").find("div").css({width:"100%",height:200}).width();
I.remove()
}return C
}
})(jQuery);