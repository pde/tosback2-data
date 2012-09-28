/*
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */
(function(B,A){(function(E){var F={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},D=false;
E(window).bind("load.jcarousel",function(){D=true
});
E.jcarousel=function(K,H){this.options=E.extend({},F,H||{});
this.locked=false;
this.autoStopped=false;
this.container=null;
this.clip=null;
this.list=null;
this.buttonNext=null;
this.buttonPrev=null;
this.buttonNextState=null;
this.buttonPrevState=null;
if(!H||H.rtl===undefined){this.options.rtl=(E(K).attr("dir")||E("html").attr("dir")||"").toLowerCase()=="rtl"
}this.wh=!this.options.vertical?"width":"height";
this.lt=!this.options.vertical?(this.options.rtl?"right":"left"):"top";
var O="",M=K.className.split(" ");
for(var J=0;
J<M.length;
J++){if(M[J].indexOf("jcarousel-skin")!=-1){E(K).removeClass(M[J]);
O=M[J];
break
}}if(K.nodeName.toUpperCase()=="UL"||K.nodeName.toUpperCase()=="OL"){this.list=E(K);
this.clip=this.list.parents(".jcarousel-clip");
this.container=this.list.parents(".jcarousel-container")
}else{this.container=E(K);
this.list=this.container.find("ul,ol").eq(0);
this.clip=this.container.find(".jcarousel-clip")
}if(this.clip.size()===0){this.clip=this.list.wrap("<div></div>").parent()
}if(this.container.size()===0){this.container=this.clip.wrap("<div></div>").parent()
}if(O!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1){this.container.wrap('<div class=" '+O+'"></div>')
}this.buttonPrev=E(".jcarousel-prev",this.container);
if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null){this.buttonPrev=E(this.options.buttonPrevHTML).appendTo(this.container)
}this.buttonPrev.addClass(this.className("jcarousel-prev"));
this.buttonNext=E(".jcarousel-next",this.container);
if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null){this.buttonNext=E(this.options.buttonNextHTML).appendTo(this.container)
}this.buttonNext.addClass(this.className("jcarousel-next"));
this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});
this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css((this.options.rtl?"right":"left"),0);
this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});
if(!this.options.vertical&&this.options.rtl){this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl")
}var L=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;
var N=this.list.children("li");
var P=this;
if(N.size()>0){var G=0,I=this.options.offset;
N.each(function(){P.format(this,I++);
G+=P.dimension(this,L)
});
this.list.css(this.wh,(G+100)+"px");
if(!H||H.size===undefined){this.options.size=N.size()
}}this.container.css("display","block");
this.buttonNext.css("display","block");
this.buttonPrev.css("display","block");
this.funcNext=function(){P.next()
};
this.funcPrev=function(){P.prev()
};
this.funcResize=function(){if(P.resizeTimer){clearTimeout(P.resizeTimer)
}P.resizeTimer=setTimeout(function(){P.reload()
},100)
};
if(this.options.initCallback!==null){this.options.initCallback(this,"init")
}if(!D&&E.browser.safari){this.buttons(false,false);
E(window).bind("load.jcarousel",function(){P.setup()
})
}else{this.setup()
}};
var C=E.jcarousel;
C.fn=C.prototype={jcarousel:"0.2.8"};
C.fn.extend=C.extend=E.extend;
C.fn.extend({setup:function(){this.first=null;
this.last=null;
this.prevFirst=null;
this.prevLast=null;
this.animating=false;
this.timer=null;
this.resizeTimer=null;
this.tail=null;
this.inTail=false;
if(this.locked){return 
}this.list.css(this.lt,this.pos(this.options.offset)+"px");
var G=this.pos(this.options.start,true);
this.prevFirst=this.prevLast=null;
this.animate(G,false);
E(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);
if(this.options.setupCallback!==null){this.options.setupCallback(this)
}},reset:function(){this.list.empty();
this.list.css(this.lt,"0px");
this.list.css(this.wh,"10px");
if(this.options.initCallback!==null){this.options.initCallback(this,"reset")
}this.setup()
},reload:function(){if(this.tail!==null&&this.inTail){this.list.css(this.lt,C.intval(this.list.css(this.lt))+this.tail)
}this.tail=null;
this.inTail=false;
if(this.options.reloadCallback!==null){this.options.reloadCallback(this)
}if(this.options.visible!==null){var I=this;
var J=Math.ceil(this.clipping()/this.options.visible),H=0,G=0;
this.list.children("li").each(function(K){H+=I.dimension(this,J);
if(K+1<I.first){G=H
}});
this.list.css(this.wh,H+"px");
this.list.css(this.lt,-G+"px")
}this.scroll(this.first,false)
},lock:function(){this.locked=true;
this.buttons()
},unlock:function(){this.locked=false;
this.buttons()
},size:function(G){if(G!==undefined){this.options.size=G;
if(!this.locked){this.buttons()
}}return this.options.size
},has:function(H,I){if(I===undefined||!I){I=H
}if(this.options.size!==null&&I>this.options.size){I=this.options.size
}for(var G=H;
G<=I;
G++){var J=this.get(G);
if(!J.length||J.hasClass("jcarousel-item-placeholder")){return false
}}return true
},get:function(G){return E(">.jcarousel-item-"+G,this.list)
},add:function(K,O){var L=this.get(K),I=0,H=E(O);
if(L.length===0){var N,J=C.intval(K);
L=this.create(K);
while(true){N=this.get(--J);
if(J<=0||N.length){if(J<=0){this.list.prepend(L)
}else{N.after(L)
}break
}}}else{I=this.dimension(L)
}if(H.get(0).nodeName.toUpperCase()=="LI"){L.replaceWith(H);
L=H
}else{L.empty().append(O)
}this.format(L.removeClass(this.className("jcarousel-item-placeholder")),K);
var M=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;
var G=this.dimension(L,M)-I;
if(K>0&&K<this.first){this.list.css(this.lt,C.intval(this.list.css(this.lt))-G+"px")
}this.list.css(this.wh,C.intval(this.list.css(this.wh))+G+"px");
return L
},remove:function(G){var H=this.get(G);
if(!H.length||(G>=this.first&&G<=this.last)){return 
}var I=this.dimension(H);
if(G<this.first){this.list.css(this.lt,C.intval(this.list.css(this.lt))+I+"px")
}H.remove();
this.list.css(this.wh,C.intval(this.list.css(this.wh))-I+"px")
},next:function(){if(this.tail!==null&&!this.inTail){this.scrollTail(false)
}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size)?1:this.first+this.options.scroll)
}},prev:function(){if(this.tail!==null&&this.inTail){this.scrollTail(true)
}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1)?this.options.size:this.first-this.options.scroll)
}},scrollTail:function(G){if(this.locked||this.animating||!this.tail){return 
}this.pauseAuto();
var H=C.intval(this.list.css(this.lt));
H=!G?H-this.tail:H+this.tail;
this.inTail=!G;
this.prevFirst=this.first;
this.prevLast=this.last;
this.animate(H)
},scroll:function(H,G){if(this.locked||this.animating){return 
}this.pauseAuto();
this.animate(this.pos(H),G)
},pos:function(U,H){var I=C.intval(this.list.css(this.lt));
if(this.locked||this.animating){return I
}if(this.options.wrap!="circular"){U=U<1?1:(this.options.size&&U>this.options.size?this.options.size:U)
}var R=this.first>U;
var W=this.options.wrap!="circular"&&this.first<=1?1:this.first;
var Z=R?this.get(W):this.get(this.last);
var T=R?W:W-1;
var X=null,S=0,P=false,Y=0,V;
while(R?--T>=U:++T<U){X=this.get(T);
P=!X.length;
if(X.length===0){X=this.create(T).addClass(this.className("jcarousel-item-placeholder"));
Z[R?"before":"after"](X);
if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(T<=0||T>this.options.size)){V=this.get(this.index(T));
if(V.length){X=this.add(T,V.clone(true))
}}}Z=X;
Y=this.dimension(X);
if(P){S+=Y
}if(this.first!==null&&(this.options.wrap=="circular"||(T>=1&&(this.options.size===null||T<=this.options.size)))){I=R?I+Y:I-Y
}}var M=this.clipping(),O=[],G=0,N=0;
Z=this.get(U-1);
T=U;
while(++G){X=this.get(T);
P=!X.length;
if(X.length===0){X=this.create(T).addClass(this.className("jcarousel-item-placeholder"));
if(Z.length===0){this.list.prepend(X)
}else{Z[R?"before":"after"](X)
}if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(T<=0||T>this.options.size)){V=this.get(this.index(T));
if(V.length){X=this.add(T,V.clone(true))
}}}Z=X;
Y=this.dimension(X);
if(Y===0){throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...")
}if(this.options.wrap!="circular"&&this.options.size!==null&&T>this.options.size){O.push(X)
}else{if(P){S+=Y
}}N+=Y;
if(N>=M){break
}T++
}for(var L=0;
L<O.length;
L++){O[L].remove()
}if(S>0){this.list.css(this.wh,this.dimension(this.list)+S+"px");
if(R){I-=S;
this.list.css(this.lt,C.intval(this.list.css(this.lt))-S+"px")
}}var K=U+G-1;
if(this.options.wrap!="circular"&&this.options.size&&K>this.options.size){K=this.options.size
}if(T>K){G=0;
T=K;
N=0;
while(++G){X=this.get(T--);
if(!X.length){break
}N+=this.dimension(X);
if(N>=M){break
}}}var J=K-G+1;
if(this.options.wrap!="circular"&&J<1){J=1
}if(this.inTail&&R){I+=this.tail;
this.inTail=false
}this.tail=null;
if(this.options.wrap!="circular"&&K==this.options.size&&(K-G+1)>=1){var Q=C.intval(this.get(K).css(!this.options.vertical?"marginRight":"marginBottom"));
if((N-Q)>M){this.tail=N-M-Q
}}if(H&&U===this.options.size&&this.tail){I-=this.tail;
this.inTail=true
}while(U-->J){I+=this.dimension(this.get(U))
}this.prevFirst=this.first;
this.prevLast=this.last;
this.first=J;
this.last=K;
return I
},animate:function(K,G){if(this.locked||this.animating){return 
}this.animating=true;
var H=this;
var I=function(){H.animating=false;
if(K===0){H.list.css(H.lt,0)
}if(!H.autoStopped&&(H.options.wrap=="circular"||H.options.wrap=="both"||H.options.wrap=="last"||H.options.size===null||H.last<H.options.size||(H.last==H.options.size&&H.tail!==null&&!H.inTail))){H.startAuto()
}H.buttons();
H.notify("onAfterAnimation");
if(H.options.wrap=="circular"&&H.options.size!==null){for(var M=H.prevFirst;
M<=H.prevLast;
M++){if(M!==null&&!(M>=H.first&&M<=H.last)&&(M<1||M>H.options.size)){H.remove(M)
}}}};
this.notify("onBeforeAnimation");
if(!this.options.animation||G===false){this.list.css(this.lt,K+"px");
I()
}else{var L=!this.options.vertical?(this.options.rtl?{right:K}:{left:K}):{top:K};
var J={duration:this.options.animation,easing:this.options.easing,complete:I};
if(E.isFunction(this.options.animationStepCallback)){J.step=this.options.animationStepCallback
}this.list.animate(L,J)
}},startAuto:function(H){if(H!==undefined){this.options.auto=H
}if(this.options.auto===0){return this.stopAuto()
}if(this.timer!==null){return 
}this.autoStopped=false;
var G=this;
this.timer=window.setTimeout(function(){G.next()
},this.options.auto*1000)
},stopAuto:function(){this.pauseAuto();
this.autoStopped=true
},pauseAuto:function(){if(this.timer===null){return 
}window.clearTimeout(this.timer);
this.timer=null
},buttons:function(I,H){if(I==null){I=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="first")||this.options.size===null||this.last<this.options.size);
if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>=this.options.size){I=this.tail!==null&&!this.inTail
}}if(H==null){H=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="last")||this.first>1);
if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1){H=this.tail!==null&&this.inTail
}}var G=this;
if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);
if(I){this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext)
}this.buttonNext[I?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",I?false:true);
if(this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=I){this.buttonNext.each(function(){G.options.buttonNextCallback(G,this,I)
}).data("jcarouselstate",I)
}}else{if(this.options.buttonNextCallback!==null&&this.buttonNextState!=I){this.options.buttonNextCallback(G,null,I)
}}if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);
if(H){this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev)
}this.buttonPrev[H?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",H?false:true);
if(this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=H){this.buttonPrev.each(function(){G.options.buttonPrevCallback(G,this,H)
}).data("jcarouselstate",H)
}}else{if(this.options.buttonPrevCallback!==null&&this.buttonPrevState!=H){this.options.buttonPrevCallback(G,null,H)
}}this.buttonNextState=I;
this.buttonPrevState=H
},notify:function(G){var H=this.prevFirst===null?"init":(this.prevFirst<this.first?"next":"prev");
this.callback("itemLoadCallback",G,H);
if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",G,H,this.first);
this.callback("itemFirstOutCallback",G,H,this.prevFirst)
}if(this.prevLast!==this.last){this.callback("itemLastInCallback",G,H,this.last);
this.callback("itemLastOutCallback",G,H,this.prevLast)
}this.callback("itemVisibleInCallback",G,H,this.first,this.last,this.prevFirst,this.prevLast);
this.callback("itemVisibleOutCallback",G,H,this.prevFirst,this.prevLast,this.first,this.last)
},callback:function(K,N,G,L,J,I,H){if(this.options[K]==null||(typeof this.options[K]!="object"&&N!="onAfterAnimation")){return 
}var O=typeof this.options[K]=="object"?this.options[K][N]:this.options[K];
if(!E.isFunction(O)){return 
}var P=this;
if(L===undefined){O(P,G,N)
}else{if(J===undefined){this.get(L).each(function(){O(P,this,L,G,N)
})
}else{var Q=function(R){P.get(R).each(function(){O(P,this,R,G,N)
})
};
for(var M=L;
M<=J;
M++){if(M!==null&&!(M>=I&&M<=H)){Q(M)
}}}}},create:function(G){return this.format("<li></li>",G)
},format:function(J,I){J=E(J);
var H=J.get(0).className.split(" ");
for(var G=0;
G<H.length;
G++){if(H[G].indexOf("jcarousel-")!=-1){J.removeClass(H[G])
}}J.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+I)).css({"float":(this.options.rtl?"right":"left"),"list-style":"none"}).attr("jcarouselindex",I);
return J
},className:function(G){return G+" "+G+(!this.options.vertical?"-horizontal":"-vertical")
},dimension:function(I,J){var H=E(I);
if(J==null){return !this.options.vertical?(H.outerWidth(true)||C.intval(this.options.itemFallbackDimension)):(H.outerHeight(true)||C.intval(this.options.itemFallbackDimension))
}else{var G=!this.options.vertical?J-C.intval(H.css("marginLeft"))-C.intval(H.css("marginRight")):J-C.intval(H.css("marginTop"))-C.intval(H.css("marginBottom"));
E(H).css(this.wh,G+"px");
return this.dimension(H)
}},clipping:function(){return !this.options.vertical?this.clip[0].offsetWidth-C.intval(this.clip.css("borderLeftWidth"))-C.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-C.intval(this.clip.css("borderTopWidth"))-C.intval(this.clip.css("borderBottomWidth"))
},index:function(G,H){if(H==null){H=this.options.size
}return Math.round((((G-1)/H)-Math.floor((G-1)/H))*H)+1
}});
C.extend({defaults:function(G){return E.extend(F,G||{})
},intval:function(G){G=parseInt(G,10);
return isNaN(G)?0:G
},windowLoaded:function(){D=true
}});
E.fn.jcarousel=function(I){if(typeof I=="string"){var G=E(this).data("jcarousel"),H=Array.prototype.slice.call(arguments,1);
return G[I].apply(G,H)
}else{return this.each(function(){var J=E(this).data("jcarousel");
if(J){if(I){E.extend(J.options,I)
}J.reload()
}else{E(this).data("jcarousel",new C(this,I))
}})
}}
})(B)
})(window.$CQ||window.$||function(){throw new Error("jQuery is not defined")
}(),window.$CQ||window.$);