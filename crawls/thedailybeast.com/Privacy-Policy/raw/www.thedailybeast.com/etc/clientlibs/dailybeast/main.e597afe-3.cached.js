var cCol=$(".c-col-wrapper");
var ad=$(".floatingad .ad");
if(cCol.length&&ad.length&&!dailybeast.modes.isEditMode){var spaceBetweenColAndAd=200;
var adLeftOffset=cCol.offset().left+33;
window.onresize=function(){adLeftOffset=cCol.offset().left+33;
ad.css("left",adLeftOffset)
};
function updateFloatingAd(){var A=window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop;
var C=cCol.offset().top+cCol.height()+spaceBetweenColAndAd;
var B=$("#ad-bottom").offset().top-A;
if(ad.length&&ad.floating==undefined&&A>C&&B>ad.height()){$(".floatingad").height($(".floatingad").height());
ad.css("position","fixed");
ad.css("top",-ad.height());
ad.css("left",adLeftOffset);
ad.animate({top:"0px"},700);
ad.floating=true
}else{if(ad.floating&&A<=C||B<ad.height()){ad.stop().animate({top:-ad.height()},"fast",function(){ad.css("position","");
ad.floating=undefined
})
}}}if(isAppleDevice){document.addEventListener("touchend",updateFloatingAd,false)
}else{window.onscroll=updateFloatingAd
}}$.widget("ui.advertising",{options:{editNamespace:"edit",adNamespace:"ad",entityNamespace:"entity",topicNamespace:"topic",packageNamespace:"package",audienceScienceCookie:"rsi_segs",customTile:"false",disable:"false",render:"true",siteID:"5480.iac.thedailybeast",topic:"",size:"",params:null,tile:1,ord:dailybeast.interstitial.getOrd(),zone:""},refresh:function(A){this._refresh(A)
},hide:function(){this._hide()
},show:function(){this._show()
},_create:function(){if(this.options.disable=="false"){this._setSize();
this._setAdParams();
$.data(this.element,"isReady",true)
}},_refresh:function(A){if((this._isReady()&&$(this.element).is(":visible"))||$(this.element).attr("forceShowing")=="true"){this._setReady(false);
this._render(this._generateUrl(A))
}},_render:function(B){var C=this;
var A="<script src='"+B+"'><\/script>";
if($.browser.msie){writeCapture.proxyGetElementById=true
}else{writeCapture.writeOnGetElementById=true
}$(this.element).html(writeCapture.sanitize(A,{done:function(){C._setReady(true);
if(C._adParams.adDebug){C._enableDebugging(B)
}}}))
},_isReady:function(){return $.data(this.element,"isReady")
},_setReady:function(A){$.data(this.element,"isReady",A)
},_setAdParams:function(){this._adParams={};
var B=window.location.hash;
if(B.length>1){B=B.substring(1);
var D=B.split(";");
for(var A=0;
A<D.length;
A++){var C=D[A].split("=");
this._adParams[C[0]]=C[1]
}}},_generateUrl:function(A){return dailybeast.advertising.request.generateRequest({siteID:this.options.siteID,zone:this.options.zone,element:this.element,tile:this.options.tile,size:this.options.size,params:this.options.params,ord:A,adParams:this._adParams})
},_hide:function(){$(this.element).css("visibility","hidden")
},_show:function(){$(this.element).css("visibility","visible")
},_setSize:function(){var B=this.options.size.split(",");
for(var A=0;
A<B.length;
A++){this._width=Math.max(B[A].split("x")[0],this._width||0);
this._height=Math.max(B[A].split("x")[1],this._height||0)
}},_enableDebugging:function(B){if($.data(this.element,"debug")){$.data(this.element,"debug").remove()
}var E=$(this.element).offset();
var D=$(document.createElement("div"));
$("body").css("position","relative");
D.attr("style","background: white; border: 3px solid #D1232A; padding: 5px; position: absolute; width: 300px; z-index: 9998; word-wrap:break-word");
D.css("top",E.top+"px");
D.css("left",E.left+"px");
D.css("overflow","hidden");
var C="<strong>Tile "+this.options.tile+"</strong><br />";
var A=B+'<br /><a href="'+B+'" target="_blank">Link &#187;</a>';
$(D).html(C+A);
$(D).hover(function(){$(this).css("z-index",9999)
},function(){$(this).css("z-index",9998)
});
$.data(this.element,"debug",D);
$("body").append(D)
}});
$.widget("ui.gallery",{options:{url:"",duration:5,display:"window",enableAutoPlay:false,interstitials:[],indexText:"{0} / {1}",countdownText:"{0} seconds left",bylineText:'<span class="slide-byline" property="dc:creator">{0}</span>',containers:{slide:null,endSlide:null,viewAll:null,interstitial:null,intro:$(".gallery-intro")},elements:{next:null,previous:null,pause:null,play:null,index:null,title:null,description:null,byline:null,countdown:null,replay:null,viewAll:null,thumbnail:null,start:$("a.gallery-start")}},_create:function(){$(".gallery-ad div[data-advertising]").bind("DOMSubtreeModified",function(){$(".gallery-ad").each(function(){var B=$(".ad",this).height();
if($(".ad",this).height()>5&&B>5){$(this).css("min-height",B)
}})
});
this._currentIndex=this._getInitialCurrentIndex();
this._timer=null;
this._paused=!this.options.enableAutoPlay;
var A=this;
$.ajax({url:this.options.url,dataType:"json",success:function(C){A._title=C.title||null;
A._path=C.path;
A._slides=C.slides||null;
A._subTemplate="slide";
if(A._slides){A._bindElements();
A._openShow()
}var D=window.location.hash;
if(D.indexOf("#slide")!=-1){var B=parseInt(D.replace("#slide",""));
if(B>0){$(".gallery-start").click();
A._show(B-1,true)
}}else{$(".gallery-slide, .gallery-intro").show()
}}})
},slides:function(){return this._slides
},currentIndex:function(){return this._currentIndex
},length:function(){return this._getLength()
},destroy:function(){$.widget.prototype.apply(this,arguments)
},pause:function(){this._pause()
},play:function(){this._play()
},next:function(){this._next()
},previous:function(){this._previous()
},show:function(A){this._show(A)
},showEndSlide:function(){this._showEndSlide()
},openShow:function(){this._openShow()
},startShow:function(){this._startShow()
},_pause:function(){this._clearTimer();
this._stopCountdown();
this._paused=true;
$(this.options.elements.pause).hide();
$(this.options.elements.play).show();
this._trigger("paused",null,this._getState())
},_play:function(){this._paused=false;
if(this._currentIndex+1!=this._getLength()){var B=this.options.duration*1000;
this._startCountdown();
var A=this;
this._timer=setTimeout(function(){if(A._countdownInterval){clearInterval(A._countdownInterval)
}A._next()
},B)
}$(this.options.elements.play).hide();
$(this.options.elements.pause).show();
this._trigger("played",null,this._getState())
},_next:function(){var A=this._currentIndex+1;
if(A<this._getLength()){var C=$(this.options.containers.interstitial);
var B=(C.length>0&&!(C.is(":visible"))&&($.inArray(A,this.options.interstitials)>=0));
if(B){this._showInterstitial()
}else{if(C.is(":visible")&&$.inArray(this._currentIndex,this.options.interstitials)>=0){A--
}this._show(A)
}}},_setSlideIndex:function(A){window.location.hash="slide"+(A+1)
},_previous:function(){var A=this._currentIndex-1;
if(A>=0){var C=$(this.options.containers.interstitial);
var B=(C.length>0&&!(C.is(":visible"))&&($.inArray(this._currentIndex,this.options.interstitials)>=0));
if(B){this._showInterstitial()
}else{if(C.is(":visible")&&$.inArray(this._currentIndex+1,this.options.interstitials)>=0){A++
}this._show(A)
}}},_clearTimer:function(){clearTimeout(this._timer);
this._timer=null
},_bindElements:function(){var A=this;
var B=this.options.elements;
$(B.next).live("click",function(C){C.preventDefault();
A._next()
});
$(B.previous).live("click",function(C){C.preventDefault();
A._previous()
});
$(B.pause).live("click",function(C){C.preventDefault();
A._pause()
});
$(B.play).live("click",function(C){C.preventDefault();
A._play()
});
$(B.replay).live("click",function(C){C.preventDefault();
A._show(0)
});
$(B.thumbnail).live("click",function(D){D.preventDefault();
var C=$(D.target).index();
A._show(C)
});
$(B.viewAll).live("click",function(C){C.preventDefault();
A._showViewAll()
});
$(B.start).live("click",function(C){C.preventDefault();
A._startGallery()
})
},_getLength:function(){var A=this._slides.length;
if(this.options.containers.endSlide!=null){A++
}return A
},_getState:function(){var A={index:this._currentIndex,length:this._slides.length,container:this._activeContainer,display:this.options.display};
if(this.options.containers.endSlide!=null){A.length++
}return A
},_isFirstSlide:function(){if($(this.options.containers.interstitial).is(":visible")){return false
}return(this._currentIndex==0)
},_isLastSlide:function(){if($(this.options.containers.interstitial).is(":visible")){return false
}var A=this._slides.length-1;
if(_.hasValue(this.options.containers.endSlide)){A++
}return(this._currentIndex==A)
},_preload:function(B){var C=this;
if(C._slides[B]){var A=new Image();
A.src=C._slides[B].imageUrl
}},_show:function(B,C){this._clearTimer();
if(B<this._slides.length&&B>=0){this._currentIndex=B;
var A=this._slides[this._currentIndex];
if(!this._paused){this._play()
}var D=$(this.options.containers.slide).find("img");
$(D).attr("src",this._slides[B].imageUrl);
this._preload(this._currentIndex+1);
this._updateElements();
if(!C){this._trigger("updated",null,this._getState())
}if(this._currentIndex==this._slides.length-1&&this.options.containers.endSlide==null){this._pause();
this._trigger("finished",null,this._getState())
}}else{if(B==this._slides.length&&this.options.containers.endSlide!=null){this._currentIndex=B;
this._trigger("updated",null,this._getState());
this._pause();
this._showEndSlide()
}}this._showContainer(this.options.containers.slide);
this._setSlideIndex(B);
this._unhideTitle()
},_showContainer:function(A){if(A!=null){for(var B in this.options.containers){var C=this.options.containers[B];
if(A==C){$(C).show();
this._activeContainer=B
}else{$(C).hide()
}}}},_showEndSlide:function(){if(this.options.containers.endSlide){this._updateElements();
this._showContainer(this.options.containers.endSlide);
this._trigger("finished",null,this._getState())
}},_showInterstitial:function(){this._showContainer(this.options.containers.interstitial);
this._updateElements();
this._trigger("interstitialed",null,this._getState());
this._hideTitle()
},_hideTitle:function(){$(".grid-10, .from-newsweek-flag").css("visibility","hidden")
},_unhideTitle:function(){$(".grid-10, .from-newsweek-flag").css("visibility","visible")
},_showViewAll:function(){this._showContainer(this.options.containers.viewAll)
},_startGallery:function(){$(".gallery-container").show();
this._show(0)
},_getInitialCurrentIndex:function(){var A=window.location.href.split(".");
var B=A[A.length-2];
var D=new RegExp(/(slide)[0-9]+/i);
var C=0;
if(D.test(B)){C=B.substring(5);
C--
}return C
},_openShow:function(){var A=this;
this._trigger("opened",null,this._getState());
this._startShow()
},_renderCountdown:function(A){if(A==null||A<0){$(this.options.elements.countdown).text("")
}else{if(A-1>=0){$(this.options.elements.countdown).text(this.options.countdownText.replace("{0}",A-1))
}}},_startShow:function(){this._trigger("started",null,this._getState());
this._updateElements();
if(this.options.enableAutoPlay){this._play()
}},_startCountdown:function(){if($(this.options.elements.countdown).length>0){this._stopCountdown();
var B=this.options.duration;
this._renderCountdown(B);
var A=this;
this._countdownInterval=setInterval(function(){B-=1;
A._renderCountdown(B)
},1000)
}},_stopCountdown:function(){if(this._countdownInterval){clearInterval(this._countdownInterval);
this._countdownInterval=null;
this._renderCountdown(null)
}},_updateElements:function(){$(this.options.elements.next).toggleClass("disabled",this._isLastSlide());
$(this.options.elements.previous).toggleClass("disabled",this._isFirstSlide());
var B=this.options.indexText.replace("{0}",this._currentIndex+1).replace("{1}",this._getLength());
$(this.options.elements.index).html(B);
if(_.hasValue(this._slides[this._currentIndex])){var A=this._slides[this._currentIndex];
$(this.options.elements.title).html(A.title||"");
$(this.options.elements.description).html(A.description||"");
if(_.hasValue(A.creator)){var C=this.options.bylineText.replace("{0}",A.creator);
$(this.options.elements.byline).html(C||"")
}else{$(this.options.elements.byline).html("")
}}}});
$.widget("ui.featureslider",{options:{autoplay:true,circular:true,interval:7500,elements:{slider:null,items:null,next:null,prev:null,pause:null,play:null,navigator:null}},_create:function(){var C=this.options;
var B=this.element;
this._elements={};
for(var A in C.elements){this._elements[A]=$(C.elements[A])
}this._index=0;
this._paused=!C.autoplay;
this._slides=null;
$(B).find(C.elements.slider).scrollable({items:C.elements.items,next:C.elements.next,prev:C.elements.prev,circular:C.circular}).autoscroll({autoplay:C.autoplay,interval:C.interval}).navigator({navi:C.elements.navigator});
this._api=this._elements.slider.data("scrollable");
this._bindElements()
},destroy:function(){$.widget.prototype.apply(this,arguments)
},pause:function(){this._pause()
},play:function(){this._play()
},next:function(){this._next()
},previous:function(){this._previous()
},show:function(A){this._show(A)
},getState:function(){return this._getState()
},_pause:function(){this._paused=true;
this._api.stop();
this._elements.pause.hide();
this._elements.play.show();
this._trigger("paused",null,this._getState())
},_play:function(){this._paused=false;
this._api.play();
this._elements.pause.show();
this._elements.play.hide();
this._trigger("played",null,this._getState())
},_next:function(){this._api.next()
},_previous:function(){this._api.prev()
},_bindElements:function(){var A=this;
this._elements.pause.live("click",function(B){B.preventDefault();
A._pause()
});
this._elements.play.live("click",function(B){B.preventDefault();
A._play()
});
$(this.element).hover(function(){A._api.stop()
},function(){if(!A._paused){A._api.play()
}})
},_getState:function(){var B=this;
if(!_.hasValue(this._slides)){this._slides=[];
var A=$(".featureSlider-slide:not(.cloned)");
$(A).each(function(D,E){var C=$(E);
if(C.find("[data-advertising]").length>0){B._slides.push({title:"",text:"Sponsored"})
}else{B._slides.push({title:C.find("h2").text(),text:C.find("p").text()})
}})
}return{index:this._index,slides:this._slides}
},_show:function(A){this._api.show(A);
this._trigger("shown",null,this._getState())
}});
(function(A){A(function(){var B=A("#search-form");
if(B.length==1){A(".type-selector label").click(function(){A("#"+A(this).attr("for")).prop("checked",true);
B.submit()
});
A("#time-filter, #order-filter").change(function(){B.submit()
})
}})
})(jQuery);
$(function(){if($("#vFeatureCenter").length!=0){var J=null;
var A=$("#features li[about]:visible");
var F=$("#features li:first");
var B=$("#playVFeature .play");
var O=$("#playVFeature .pause");
var I=$("#playVFeatureCount span");
var L=$("#features li");
var C=$("#vFeaturePanel ol li");
var M=false;
var K={};
var N={};
function H(){var Q=A.next();
if(Q.length!=0){A=Q
}else{A=F
}}function G(){A.siblings().hide();
A.fadeIn("slow");
$("#vFeatureCenter div[data-advertising]").advertising("refresh",dailybeast.interstitial.getOrd());
var Q=A.attr("about");
var R=N[Q];
if(R!==undefined){R.siblings().removeClass("on");
R.addClass("on");
I.text(R.index()+1)
}}function E(){clearInterval(J);
J=setInterval(function(){H();
G()
},8000)
}function D(){E();
B.hide();
O.show();
M=false
}function P(){clearInterval(J);
O.hide();
B.show();
M=true
}L.each(function(){var Q=$(this);
var R=Q.attr("about");
if(R){K[R]=Q
}});
C.each(function(){var R=$(this);
var Q=R.attr("about");
N[Q]=R;
R.mouseenter(function(){if(K[Q]!==undefined){A=K[Q];
if(!M){E()
}G()
}})
});
O.click(function(Q){Q.preventDefault();
H();
P()
});
B.click(function(Q){Q.preventDefault();
G();
D()
});
D()
}});
(function(A){var B=A.fn.val;
A.iHint=function(E,C){var D=A(E);
E.iHint={text:"iHint Text",className:"iHint-default"};
A.extend(E.iHint,C);
D.blur(function(){if(!B.call(D)){D.addClass(E.iHint.className);
B.call(D,E.iHint.text)
}}).focus(function(){if(B.call(D)==E.iHint.text){D.removeClass(E.iHint.className);
B.call(D,"")
}}).trigger("blur")
};
A.fn.iHint=function(C){return this.each(function(){new A.iHint(this,C)
})
};
A.fn.val=function(C){if(this[0]&&this[0].iHint){if(typeof (C)=="undefined"){if(B.apply(this,arguments)==this[0].iHint.text){return""
}}else{this.removeClass(this[0].iHint.className);
return B.apply(this,arguments)
}}return B.apply(this,arguments)
}
})(jQuery);
(function(jQuery){eval(function(p,a,c,k,e,r){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))
};
if(!"".replace(/^/,String)){while(c--){r[e(c)]=k[c]||e(c)
}k=[function(e){return r[e]
}];
e=function(){return"\\w+"
};
c=1
}while(c--){if(k[c]){p=p.replace(new RegExp("\\b"+e(c)+"\\b","g"),k[c])
}}return p
}("h.i['1a']=h.i['z'];h.O(h.i,{y:'D',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});",62,74,"||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce".split("|"),0,{}))
})(jQuery);
(function(A){if(!window.Echo){window.Echo={}
}if(!Echo.Global){Echo.Global={}
}if(!Echo.Vars){Echo.Vars={regexps:{matchLabel:/{Label:([^:}]+[^}]*)}/g,matchData:/{Data:(([a-z]+\.)*[a-z]+)}/ig,mobileUA:/mobile|midp-|opera mini|iphone|ipad|blackberry|nokia|samsung|docomo|symbian|windows ce|windows phone|android|up\.browser|ipod|netfront|skyfire|palm|webos|audiovox/i,parseUrl:/^((([^:\/\?#]+):)?\/\/)?([^\/\?#]*)?([^\?#]*)(\?([^#]*))?(#(.*))?/,w3cdtf:/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)Z$/}}
}A.extend({addCss:function(D,F){Echo.Vars.css=Echo.Vars.css||{index:1,processed:{}};
if(F){if(Echo.Vars.css.processed[F]){return 
}Echo.Vars.css.processed[F]=true
}var C="";
var B=Echo.Vars.css.anchor;
if(B&&B.length){C=B.html()
}if(C.length+D.length>100000){Echo.Vars.css.index++;
B=null;
C=""
}var E=A('<style id="echo-css-'+Echo.Vars.css.index+'" type="text/css">'+C+D+"</style>");
if(B&&B.length){B.replaceWith(E)
}else{if(Echo.Vars.css.anchor){Echo.Vars.css.anchor.after(E)
}else{A(document.getElementsByTagName("head")[0]||document.documentElement).prepend(E)
}}Echo.Vars.css.anchor=E
},foldl:function(C,B,D){A.each(B,function(E,F){result=D(F,C,E);
if(result!==undefined){C=result
}});
return C
},intersperse:function(B,C){return A.foldl([],B,function(E,F,D){if(F.length){F.push(C)
}F.push(E)
})
},getNestedValue:function(B,F,G,H){if(typeof B=="string"){B=B.split(/\./)
}if(!B.length){return F
}var E=true;
var C=function(J,I){if(H){H(I,J)
}if(typeof I[J]=="undefined"){E=false
}else{return I[J]
}};
var D=B.length==1?C(B.pop(),F):A.foldl(F,B,C);
return E?D:G
},setNestedValue:function(G,B,E){var C=B.split(/\./);
var F=C.pop();
var D=A.getNestedValue(C,G,undefined,function(I,H){if(typeof I[H]=="undefined"){I[H]={}
}});
D[F]=E
},htmlize:function(B){if(!B){return""
}return A("<div>").text(B).html()
},object2JSON:function(F){var D=function(G){var H={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
return G.replace(/[\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\\]/g,function(I){return(H.hasOwnProperty(I))?H[I]:"\\u"+("0000"+I.charCodeAt(0).toString(16)).slice(-4)
})
};
var C;
switch(typeof F){case"number":C=isFinite(F)?F:"null";
break;
case"string":C='"'+D(F)+'"';
break;
case"boolean":C='"'+F.toString()+'"';
break;
default:if(F instanceof Array){var B=A.map(F,function(G){return A.object2JSON(G)
});
C="["+B.join(",")+"]"
}else{if(F instanceof Object){var E=F.exportProperties||F;
var B=A.foldl([],E,function(I,H,G){if(E instanceof Array){G=I;
I=F[G]
}H.push('"'+G+'":'+A.object2JSON(I))
});
C="{"+B.join(",")+"}"
}else{C="null"
}}}return C
},htmlTextTruncate:function(M,E,L){if(!E||M.length<E){return M
}var O=[],H=0,G=0;
var K="br hr input img area param base link meta option".split(" ");
var C=A.foldl({},K,function(R,Q,P){Q[R]=true
});
for(var F=0;
F<M.length;
F++){var D=M.charAt(F);
if(D=="<"){var J=M.indexOf(">",F);
if(J<0){return M
}var B=M.substring(F+1,J);
var N={name:"",closing:false};
if(B.charAt(0)=="/"){N.closing=true;
B=B.substring(1)
}N.name=B.match(/(\w)+/)[0];
if(N.closing){var I=O.pop();
if(!I||I.name!=N.name){return M
}}else{if(!C[N.name]){O.push(N)
}}F=J
}else{if(D=="&"&&M.substring(F).match(/^(\S)+;/)){F=M.indexOf(";",F)
}else{if(H==E){G=F;
break
}H++
}}}if(G){M=M.substring(0,G)+(L||"");
for(var F=O.length-1;
F>=0;
F--){M+="</"+O[F].name+">"
}}return M
},mapClass2Object:function(C,B){B=B||{};
C.find("*").andSelf().each(function(E,F){if(F.className){var D=F.className.split(/[ ]+/);
A.each(D,function(G,H){B[H]=F
})
}});
return B
},stripTags:function(B){return A("<div>").html(B).text()
},parseUrl:function(B){var C=B.match(Echo.Vars.regexps.parseUrl);
return C?{scheme:C[3],domain:C[4],path:C[5],query:C[7],fragment:C[9]}:undefined
},toDOM:function(C,G,F){var D=A(C);
var E=A.mapClass2Object(D);
var H={set:function(I,J){E[G+I]=J
},get:function(I,K){var J=E[(K?"":G)+I];
return J&&A(J)
},remove:function(J){var I;
if(typeof J=="string"){I=G+J
}else{I=J.echo.name
}A(E[I]).remove();
delete E[I]
},content:D};
var B;
if(typeof F=="object"){B=function(I,J,K){if(!F[I]){return 
}return F[I](J,K)
}
}else{B=F
}A.each(E,function(M,J){var L=M.match(G+"(.*)");
var I=L?L[1]:undefined;
if(I&&B){J=A(J);
J.echo=J.echo||{};
J.echo.name=M;
var K=B(I,J,H);
if(typeof K!="undefined"){J.empty().append(K)
}}});
return H
},loadScriptContent:function(D,F){Echo.Vars.scriptState=Echo.Vars.scriptState||{};
if(Echo.Vars.scriptState[D]=="loaded"){F();
return 
}var E=Echo.Broadcast.subscribe("internal.scriptLoaded",function(G,H){if(D!=H){return 
}Echo.Broadcast.unsubscribe("internal.scriptLoaded",E);
F()
});
if(Echo.Vars.scriptState[D]=="loading"){return 
}Echo.Vars.scriptState[D]="loading";
var C=document.createElement("script");
C.type="text/javascript";
C.charset="utf-8";
C.src=D;
var B=document.getElementsByTagName("head")[0]||document.documentElement;
B.insertBefore(C,B.firstChild);
C.onload=C.onreadystatechange=function(){var G=C.readyState;
if(!G||G=="loaded"||G=="complete"){Echo.Vars.scriptState[D]="loaded";
Echo.Broadcast.publish("internal.scriptLoaded",D);
C.onload=C.onreadystatechange=null
}}
},sendPostRequest:function(C,E,G){var F="echo-post-"+Math.random();
var B=A("#echo-post-request").length?A("#echo-post-request").empty():A('<div id="echo-post-request"/>').css({height:0}).prependTo("body");
A('<iframe id="'+F+'" name="'+F+'" width="0" height="0" frameborder="0" border="0"></iframe>').appendTo(B);
var D=A("<form/>",{target:F,method:"POST",enctype:"application/x-www-form-urlencoded",acceptCharset:"UTF-8",action:C}).appendTo(B);
A.each(E,function(H,I){A("<input/>",{type:"hidden",name:H,value:I}).appendTo(D)
});
D.submit();
G()
},getVisibleColor:function(C){var B;
do{B=C.css("backgroundColor");
if(B!=""&&B!="transparent"&&!/rgba\(0, 0, 0, 0\)/.test(B)||A.nodeName(C.get(0),"body")){break
}}while(C=C.parent());
return B||"transparent"
},timestampFromW3CDTF:function(B){var E=["year","month","day","hours","minutes","seconds"];
var C={};
var D=B.match(Echo.Vars.regexps.w3cdtf);
A.each(E,function(F,G){C[G]=D[F+1]
});
return Date.UTC(C.year,C.month-1,C.day,C.hours,C.minutes,C.seconds)/1000
},isMobileDevice:function(){return Echo.Vars.regexps.mobileUA.test(navigator.userAgent)
}});
if(!Echo.Plugins){Echo.Plugins={}
}Echo.isExtended=function(B,D,C){if(!B){return false
}C=C||true;
var E=[B].concat(D).join(".");
Echo.Vars.extensions=Echo.Vars.extensions||{};
if(Echo.Vars.extensions[E]==C){return true
}Echo.Vars.extensions[E]=C;
return false
};
Echo.extendRenderer=function(B,F,D,C){if(!B||!Echo[B]||!F||!D||!A.isFunction(D)||Echo.isExtended(C,[B,"renderer",F])){return 
}var E=Echo[B].prototype.renderers[F]||function(){};
Echo[B].prototype.renderers[F]=function(){var H=C&&this.config.get("plugins."+C);
if(!H||!H.enabled){return E.apply(this,arguments)
}var G=this;
if(!this.parentRenderer){this.parentRenderer=function(J,I){return G.parentRenderers[J].apply(G,I)
}
}this.parentRenderers=this.parentRenderers||{};
this.parentRenderers[F]=E;
return D.apply(this,arguments)
}
};
Echo.extendTemplate=function(C,E,I,B,H){if(!C||!Echo[C]||!I||!B||!E||Echo.isExtended(H,[C,"template",B,I],E)){return 
}var G=Echo[C].prototype.template;
var F=A.isFunction(G)?G:function(){return G
};
var D={insertBefore:"before",insertAfter:"after",insertAsFirstChild:"prepend",insertAsLastChild:"append",replace:"replaceWith"};
Echo[C].prototype.template=function(){var J=H&&this.config.get("plugins."+H);
if(!J||!J.enabled){return F.call(this)
}var K=A("<div/>").html(F.call(this));
A("."+B,K)[D[I]](E);
return K.html()
}
};
Echo.include=function(B,D){if(!B.length){return D()
}var C=B.pop();
Echo.include(B,function(){if(typeof C.loaded=="undefined"){if(C.application){C.loaded=function(){return !!Echo[C.application]
}
}else{D()
}}if(A.isFunction(C.loaded)&&!C.loaded()){A.loadScriptContent(C.url,D)
}else{D()
}})
};
Echo.createPlugin=function(C){if(!C||!C.name||!C.init||!C.applications){return{}
}var B=C.name;
var E=function(){var F=function(G){return"plugins."+B+(G?"."+G:"")
};
F.get=function(G,H,I,J){return G.config.get(F(H),J?G.config.get(H,I):I)
};
F.set=function(G,H,I){G.config.set(F(H),I)
};
F.remove=function(G,H){G.config.remove(F(H))
};
return F
};
var D=C.init||function(){};
Echo.Plugins[B]=Echo.Plugins[B]||A.extend(C,{init:function(H,G){var F=H.config.get(G,"enabled");
if(typeof F=="undefined"){H.config.set(G,"enabled",true)
}D(H,G)
},set:function(F,G,H){F.vars=F.vars||{};
F.vars[B]=F.vars[B]||{};
A.setNestedValue(F.vars[B],G,H)
},get:function(F,G){var H=(F.vars||{})[B]||{};
if(!G){return H
}return A.getNestedValue(G,H)
},addCss:function(F){A.addCss(F,"plugins-"+B)
},label:function(F,G){return Echo.Localization.label(F,"Plugins."+B,G)
},addLabels:function(F){Echo.Localization.extend(F,"Plugins."+B)
},topic:function(H,G){var F=typeof H=="string"?H:H.namespace;
return F+".Plugins."+B+"."+G
},config:E(),subscribe:function(H,G,I){var F=this;
return H.subscribe(G,function(){if(!H.isPluginEnabled(F.name)){return 
}I.apply(this,arguments)
})
},publish:function(G,F,H){G.publish(F,H)
},unsubscribe:function(G,F,H){G.unsubscribe(F,H)
},extendRenderer:function(F,H,G){Echo.extendRenderer(F,H,G,B)
},extendTemplate:function(G,H,I,F){Echo.extendTemplate(G,H,I,F,B)
},addItemControl:function(G,H){var F=G.config.get("itemControls."+B,[]);
G.config.set("itemControls."+B,F.concat(H))
},assembleConfig:function(F,G){G.user=F.user;
G.appkey=F.config.get("appkey","");
G.plugins=this.config.get(F,"nestedPlugins",[]);
G.contextId=F.config.get("contextId");
G.apiBaseURL=F.config.get("apiBaseURL");
return(new Echo.Config(G,this.config.get(F))).getAsHash()
}});
return Echo.Plugins[B]
};
if(!Echo.Broadcast){Echo.Broadcast={}
}Echo.Broadcast.initContext=function(C,B){B=B||"empty";
Echo.Vars.subscriptions=Echo.Vars.subscriptions||{};
Echo.Vars.subscriptions[B]=Echo.Vars.subscriptions[B]||{};
Echo.Vars.subscriptions[B][C]=Echo.Vars.subscriptions[B][C]||{};
return B
};
Echo.Broadcast.subscribe=function(C,D,B){var E=(new Date()).valueOf()+Math.random();
B=Echo.Broadcast.initContext(C,B);
Echo.Vars.subscriptions[B][C][E]=D;
return E
};
Echo.Broadcast.unsubscribe=function(C,D,B){B=Echo.Broadcast.initContext(C,B);
if(C&&D){delete Echo.Vars.subscriptions[B][C][D]
}else{if(C){delete Echo.Vars.subscriptions[B][C]
}}};
Echo.Broadcast.publish=function(C,D,B){B=Echo.Broadcast.initContext(C,B);
if(B=="*"){A.each(Echo.Vars.subscriptions,function(E){A.each(Echo.Vars.subscriptions[E][C]||{},function(G,F){F.apply(this,[C,D])
})
})
}else{if(Echo.Vars.subscriptions[B][C]){A.each(Echo.Vars.subscriptions[B][C],function(F,E){E.apply(this,[C,D])
})
}if(B!="empty"){Echo.Broadcast.publish(C,D,"empty")
}}};
if(!Echo.Object){Echo.Object=function(){}
}Echo.Object.prototype.init=function(B){A.extend(this,B||{})
};
Echo.Object.prototype.template="";
Echo.Object.prototype.namespace="";
Echo.Object.prototype.cssPrefix="echo-";
Echo.Object.prototype.substitute=function(C,D){var B=this;
C=C.replace(Echo.Vars.regexps.matchLabel,function(F,E){return B.label(E)
});
C=C.replace(Echo.Vars.regexps.matchData,function(F,E){return A.getNestedValue(E,D,"")
});
return C
};
Echo.Object.prototype.renderers={};
Echo.Object.prototype.label=function(C,D){var B=Echo.Localization.label(C,this.namespace,D);
return B!=C?B:Echo.Localization.label(C,"",D)
};
Echo.Object.prototype.render=function(D,E,G,B){var C=this;
if(D){if(A.isFunction(this.renderers[D])){return this.renderers[D].call(this,E,G,B)
}}else{var F=A.isFunction(this.template)?this.template():this.template;
this.dom=A.toDOM(this.substitute(F,this.data||{}),this.cssPrefix,function(){return C.render.apply(C,arguments)
});
return this.dom.content
}};
Echo.Object.prototype.rerender=function(B,D){var J=this;
if(!B){if(this.dom){this.dom.content.replaceWith(this.render())
}return 
}if(!this.dom){return 
}if(typeof B!="string"){A.map(B,function(K){J.rerender(K,D)
});
return 
}else{if(!this.dom.get(B)){return 
}}if(D){var I=A.isFunction(this.template)?this.template():this.template;
var G=this.substitute(I,this.data||{});
var E=this.dom.get(B);
var H=A("."+this.cssPrefix+B,A(G));
H=A.toDOM(H,this.cssPrefix,function(K,L,M){J.dom.set(K,L);
return J.render.apply(J,arguments)
}).content;
E.replaceWith(H)
}else{var F=this.dom.get(B);
var C=this.renderers[B].call(this,F,this.dom);
if(typeof C!="undefined"){F.empty().append(C)
}}};
Echo.Object.prototype.hyperlink=function(E,D){D=D||{};
if(D.openInNewWindow&&!E.target){E.target="_blank"
}var C=E.caption||"";
delete E.caption;
if(!D.skipEscaping){E.href=A.htmlize(E.href)
}E.href=E.href||"javascript:void(0)";
var B=A.foldl([],E,function(H,G,F){G.push(F+'="'+H+'"')
});
return"<a "+B.join(" ")+">"+C+"</a>"
};
Echo.Object.prototype.newContextId=function(){return(new Date()).valueOf()+Math.random()
};
Echo.Object.prototype.getContextId=function(){return this.config&&this.config.get("contextId")
};
Echo.Object.prototype.subscribe=function(B,C){return Echo.Broadcast.subscribe(B,C,this.getContextId())
};
Echo.Object.prototype.unsubscribe=function(B,C){Echo.Broadcast.unsubscribe(B,C,this.getContextId())
};
Echo.Object.prototype.publish=function(B,C){Echo.Broadcast.publish(B,C,this.getContextId())
};
Echo.Object.prototype.clearCache=function(){if(this.vars&&this.vars.cache){this.vars.cache={}
}};
Echo.Application=function(){this.addCss()
};
Echo.Application.prototype=new Echo.Object();
Echo.Application.prototype.errorMessages={error_waiting:"Loading. Please wait...",error_result_too_large:"(result_too_large) The search result is too large.",error_wrong_query:"(wrong_query) Incorrect or missing query parameter.",error_incorrect_appkey:"(incorrect_appkey) Incorrect or missing appkey.",error_internal_error:"(internal_error) Unknown server error.",error_quota_exceeded:"(quota_exceeded) Required more quota than is available.",error_incorrect_user_id:"(incorrect_user_id) Incorrect user specified in User ID predicate.",error_timeout:"(timeout) Query was not processed within reasonable time.",error_unknown:"(unknown) Unknown error."};
Echo.Application.prototype.initApplication=function(D){var B=this;
var C=this.config.get("appkey");
if(!C){this.showMessage({type:"error",message:"Incorrect or missing mandatory parameter appkey"});
return 
}this.config.get("target").addClass("echo-ui");
this.user=this.config.get("user")||new Echo.User({appkey:C,apiBaseURL:this.config.get("apiBaseURL"),contextId:this.config.get("contextId")});
this.user.init(function(){B.initPlugins(D)
});
Echo.Localization.extend(this.errorMessages)
};
Echo.Application.prototype.messageTemplates={compact:'<span class="echo-application-message-icon echo-application-message-{Data:type}" title="{Data:message}"></span>',"default":'<div class="echo-application-message"><span class="echo-application-message-icon echo-application-message-{Data:type} echo-primaryFont">{Data:message}</span></div>'};
Echo.Application.prototype.showMessage=function(C,D){if(!this.config.get("debug")&&C.type=="error"){return 
}var B=this.messageTemplates[C.layout||this.messageLayout||"default"];
(D||this.config.get("target")).empty().append(this.substitute(B,C))
};
Echo.Application.prototype.handleErrorResponse=function(G,D){var B=this;
D=D||{};
var H=this.config.get("target");
var E=function(){if(B.waitingTimeoutStep>0){if(B.waitingTimeoutStep<4){B.waitingTimeoutStep++
}}else{B.waitingTimeoutStep=1
}return Math.round(Math.exp(B.waitingTimeoutStep))*1000
};
if(this.error!=G){if(!this.config.get("debug")){H.hide()
}else{var C=this.label("error_"+G.errorCode);
var F=C=="error_"+G.errorCode?"("+G.errorCode+") "+(G.errorMessage||""):C;
H.show();
this.showMessage({type:G.errorCode=="waiting"?"loading":"error",message:F},D.messageTarget)
}}this.error=G;
if(G.errorCode=="waiting"||G.errorCode=="busy"){this.waitingTimer=setTimeout(function(){B.cleanupErrorHandlers();
if(D.waitingHandler){D.waitingHandler()
}else{B.refresh()
}},E())
}else{this.waitingTimeoutStep=0
}if(D.callback){D.callback(G)
}};
Echo.Application.prototype.cleanupErrorHandlers=function(B){if(B){this.waitingTimeoutStep=0;
delete this.error
}if(this.waitingTimer){clearTimeout(this.waitingTimer)
}};
Echo.Application.prototype.initPlugins=function(E){var D=this;
var C=this.config.get("pluginsOrder");
var B=A.foldl([],C,function(F,H){var G=Echo.Plugins[F];
if(G&&G.dependencies&&G.dependencies.length){return H.concat(G.dependencies)
}});
Echo.include(B,function(){A.map(C,function(F){var G=Echo.Plugins[F];
if(G&&G.init&&D.isPluginApplicable(G)){G.init(G,D)
}});
if(E){E()
}})
};
Echo.Application.prototype.enablePlugin=function(B){this.config.set("plugins."+B+".enabled",true)
};
Echo.Application.prototype.disablePlugin=function(B){this.config.set("plugins."+B+".enabled",false)
};
Echo.Application.prototype.isPluginEnabled=function(B){return this.config.get("plugins."+B+".enabled",true)
};
Echo.Application.prototype.isPluginApplicable=function(D){var C=this,B=false;
A.each(D.applications,function(F,E){if(Echo[E]&&C instanceof Echo[E]){B=true;
return false
}});
return B
};
Echo.Application.prototype.initConfig=function(D,E,C){var B={};
B.target=function(F){return A(F)
};
B.plugins=function(G){var F=A.foldl({hash:{},order:[]},G||[],function(H,I){var J=A.inArray(H.name,I.order);
if(J>=0){I.order.splice(J,1)
}I.order.push(H.name);
I.hash[H.name]=H
});
this.set("pluginsOrder",F.order);
return F.hash
};
D=A.extend({plugins:[]},D||{});
E=A.extend({appkey:"",apiBaseURL:"http://api.echoenabled.com",liveUpdates:true,liveUpdatesTimeout:10,debug:true,contextId:this.newContextId()},E||{});
this.config=new Echo.Config(D,E,function(F,H){var G=C&&C[F]||B&&B[F];
return G?G.call(this,H):H
})
};
Echo.Application.prototype.sendAPIRequest=function(B,C){B.query.appkey=this.config.get("appkey");
A.get(this.config.get("apiBaseURL")+"/v1/"+B.endpoint,B.query,C,"jsonp")
};
Echo.Application.prototype.initLiveUpdates=function(D,B){var C=this;
this.liveUpdates={originalTimeout:this.config.get("liveUpdatesTimeout"),timers:{},timeouts:[],responseHandler:function(E){if(C.liveUpdates.timers.watchdog){clearTimeout(C.liveUpdates.timers.watchdog)
}C.changeLiveUpdatesTimeout(E.liveUpdatesTimeout);
B(E)
},requestParamsGetter:D}
};
Echo.Application.prototype.changeLiveUpdatesTimeout=function(B){B=parseInt(B);
if(!B&&this.liveUpdates.originalTimeout!=this.config.get("liveUpdatesTimeout")){this.config.set("liveUpdatesTimeout",this.liveUpdates.originalTimeout)
}else{if(B&&B>this.config.get("liveUpdatesTimeout")){this.config.set("liveUpdatesTimeout",B)
}}};
Echo.Application.prototype.stopLiveUpdates=function(){if(this.liveUpdates.timers.regular){clearTimeout(this.liveUpdates.timers.regular)
}if(this.liveUpdates.timers.watchdog){clearTimeout(this.liveUpdates.timers.watchdog)
}};
Echo.Application.prototype.startLiveUpdates=function(D){var B=this;
if(!this.liveUpdates||!D&&!this.config.get("liveUpdates")&&!this.liveUpdates.timeouts.length){return 
}this.stopLiveUpdates();
if(D){this.liveUpdates.timeouts=[0,1,3]
}var C=this.liveUpdates.timeouts.length?this.liveUpdates.timeouts.shift():this.config.get("liveUpdatesTimeout");
this.liveUpdates.timers.regular=setTimeout(function(){B.liveUpdates.timers.watchdog=setTimeout(function(){B.startLiveUpdates()
},5000);
B.sendAPIRequest(B.liveUpdates.requestParamsGetter(),B.liveUpdates.responseHandler)
},C*1000)
};
Echo.Application.prototype.addCss=function(){var C="echo-css-fancybox";
if(A("#"+C).length){return 
}var B=document.getElementsByTagName("head")[0]||document.documentElement;
B.insertBefore(A("<link>",{rel:"stylesheet",id:C,type:"text/css",href:"/etc/clientlibs/dailybeast/fancybox/jquery.fancybox-1.3.4.css"}).get(0),A(B).children().get(0));
A.addCss(".echo-application-message { padding: 15px 0px; text-align: center; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; border: 1px solid #E4E4E4; }.echo-application-message-icon { display: inline-block; height: 16px; padding-left: 16px; background: no-repeat left center; }.echo-application-message .echo-application-message-icon { padding-left: 21px; height: auto; }.echo-application-message-empty { display: none; background-image: url(//c0.echoenabled.com/images/information.png); }.echo-application-message-loading { background-image: url(//c0.echoenabled.com/images/loading.gif); }.echo-application-message-error { background-image: url(//c0.echoenabled.com/images/warning.gif); }","application")
};
Echo.User=function(B){this.data={};
this.config=new Echo.Config(B,{appkey:"",apiBaseURL:"http://api.echoenabled.com",contextId:undefined})
};
Echo.User.prototype.init=function(E){var B=this;
this.callback=E||function(){};
if(!this.config.get("appkey")||!window.Backplane||!Backplane.getChannelID()){this.set({});
this.callback();
return 
}this.listenEvents();
var D=this._global("get","state");
if(D=="ready"){this.set(A.extend({},this._global("get","data")));
this.callback()
}else{var C=Echo.Broadcast.subscribe("User.onInit",function(F,G){if(G.appkey!=B.config.get("appkey")){return 
}Echo.Broadcast.unsubscribe("User.onInit",C);
B.set(A.extend({},B._global("get","data")));
B.callback()
});
if(D=="init"){this.request()
}}};
Echo.User.prototype.listenEvents=function(){var B=this;
if(this.backplaneSubscriptionID){return 
}var C=function(F){var E=(F?"":"internal.")+"User.onInvalidate";
var G={data:B.data,appkey:B.config.get("appkey")};
var D=F?undefined:B.config.get("contextId");
Echo.Broadcast.publish(E,G,D)
};
this.backplaneSubscriptionID=Backplane.subscribe(function(E){if(E.type=="identity/ack"){var D=false;
if(B._global("get","state")=="ready"){D=true;
B._global("set","state","init")
}B.init(function(){C();
if(D){C(true)
}})
}})
};
Echo.User.prototype._global=function(E,C,D){var B=this.config.get("appkey");
Echo.Vars.users=Echo.Vars.users||{};
Echo.Vars.users[B]=Echo.Vars.users[B]||{state:"init",data:{}};
if(E=="get"){return Echo.Vars.users[B][C]
}Echo.Vars.users[B][C]=D
};
Echo.User.prototype.set=function(){if(!arguments.length){return 
}if(arguments.length==1&&typeof arguments[0]=="object"){this._global("set","data",arguments[0]);
this.data=this.normalize(arguments[0]);
this.account=this.assemble()
}else{if(arguments.length==2&&typeof arguments[0]=="string"){this.account[arguments[0]]=arguments[1]
}}};
Echo.User.prototype.get=function(B,C){return(this.account.hasOwnProperty(B)&&typeof this.account[B]!="undefined")?this.account[B]:C
};
Echo.User.prototype.logout=function(C){var B=this;
A.get(window.location.protocol+"//apps.echoenabled.com/v2/logout",{sessionID:Backplane.getChannelID()},function(D){Backplane.expectMessages("identity/ack")
},"jsonp")
};
Echo.User.prototype.request=function(D){var B=this,C=this.config.get("appkey");
this._global("set","state","waiting");
A.get(this.config.get("apiBaseURL")+"/v1/users/whoami",{appkey:C,sessionID:Backplane.getChannelID()},function(E){if(E.result&&E.result=="session_not_found"){E={}
}B._global("set","state","ready");
B.set(A.extend({},E));
Echo.Broadcast.publish("User.onInit",{data:E,appkey:C});
if(D){D()
}},"jsonp")
};
Echo.User.prototype.normalize=function(C){var B=function(D){return A.foldl({},D||[],function(E,F){F[E]=true
})
};
C=C||{};
C.echo=C.echo||{};
A.extend(C,C.echo);
C.poco=C.poco||{entry:{}};
C.roles=B(C.echo.roles);
C.markers=B(C.echo.markers);
C.sessionID=window.Backplane&&Backplane.getChannelID()||undefined;
C.accounts=C.poco.entry.accounts||[];
return C
};
Echo.User.prototype.getActiveAccounts=function(){return A.map(this.data.accounts,function(B){if(B.loggedIn=="true"){return B
}})
};
Echo.User.prototype.assemble=function(){var B=this.getActiveAccounts();
var C=B[0]||{};
return A.extend(this.data,{id:C.identityUrl||this.data.poco.entry.id||C.userid,name:this.data.poco.entry.displayName||C.username,avatar:A.foldl(undefined,C.photos||[],function(D){if(D.type=="avatar"){return D.value
}}),state:this.data.echo.state||"Untouched",domain:C.domain,logged:!!B.length,defaultAvatar:"//c0.echoenabled.com/images/avatar-default.png",fakeIdentityURL:"http://js-kit.com/ECHO/user/fake_user"})
};
Echo.User.prototype.hasIdentity=function(C){var B=false;
A.each(this.data.accounts,function(D,E){if(E.identityUrl&&E.identityUrl==C){B=true;
return false
}});
return B
};
Echo.User.prototype.hasAny=function(E,C){if(!this.account){return false
}var B=this,D=false;
A.each(C,function(F,H){var G=B.get(E,{});
if((typeof G=="string"&&G==H)||G[H]){D=true;
return false
}});
return D
};
Echo.User.prototype.hasAnyRole=function(B){return this.hasAny("roles",B)
};
Echo.User.prototype.isAdmin=function(){return this.hasAny("roles",["administrator","moderator"])
};
Echo.User.prototype.logged=function(){return !!(this.account&&this.account.logged)
};
Echo.Config=function(E,C,D){var B=this;
this.normalize=D||function(F,G){return G
};
this.data={};
this.cache={};
if(!C&&!D){this.data=E
}else{A.each(this.combine(E,A.extend({},C)),function(F,G){B.set(F,G)
})
}};
Echo.Config.prototype.get=function(C,D){var B=C;
if(typeof B!="string"){B=B.join(".")
}if(!this.cache.hasOwnProperty(B)){this.cache[B]=A.getNestedValue(C,this.data)
}return typeof this.cache[B]=="undefined"?D:this.cache[B]
};
Echo.Config.prototype.set=function(B,D){var C=B.split(/\./);
delete this.cache[B];
if(typeof D=="object"){this.clearCacheByPrefix(B)
}return A.setNestedValue(this.data,B,this.normalize(C.pop(),D))
};
Echo.Config.prototype.remove=function(B){var C=B.split(/\./);
var E=C.pop();
var D=A.getNestedValue(C,this.data);
delete D[E]
};
Echo.Config.prototype.combine=function(D,C){var B=this;
return A.foldl(C,D,function(G,F,E){F[E]=A.isPlainObject(G)&&C.hasOwnProperty(E)?B.combine(G,C[E]):G
})
};
Echo.Config.prototype.extend=function(B){var C=this;
A.each(B,function(D,E){C.set(D,E)
})
};
Echo.Config.prototype.getAsHash=function(){return this.data
};
Echo.Config.prototype.clearCacheByPrefix=function(C){var B=this;
C+=".";
A.each(this.cache,function(D,E){if(!D.indexOf(C)){delete B.cache[D]
}})
};
if(!Echo.UI){Echo.UI={cornersCss:function(B,C){return("{scope}.ui-corner-tl { -moz-border-radius-topleft: {radius}; -webkit-border-top-left-radius: {radius}; border-top-left-radius: {radius}; }{scope}.ui-corner-tr { -moz-border-radius-topright: {radius}; -webkit-border-top-right-radius: {radius}; border-top-right-radius: {radius}; }{scope}.ui-corner-bl { -moz-border-radius-bottomleft: {radius}; -webkit-border-bottom-left-radius: {radius}; border-bottom-left-radius: {radius}; }{scope}.ui-corner-br { -moz-border-radius-bottomright: {radius}; -webkit-border-bottom-right-radius: {radius}-bottom-right-radius: {radius}; }{scope}.ui-corner-top { -moz-border-radius-topleft: {radius}; -webkit-border-top-left-radius: {radius}; border-top-left-radius: {radius}; -moz-border-radius-topright: {radius}; -webkit-border-top-right-radius: {radius}; border-top-right-radius: {radius}; }{scope}.ui-corner-bottom { -moz-border-radius-bottomleft: {radius}; -webkit-border-bottom-left-radius: {radius}; border-bottom-left-radius: {radius}; -moz-border-radius-bottomright: {radius}; -webkit-border-bottom-right-radius: {radius}; border-bottom-right-radius: {radius}; }{scope}.ui-corner-right {  -moz-border-radius-topright: {radius}; -webkit-border-top-right-radius: {radius}; border-top-right-radius: {radius}; -moz-border-radius-bottomright: {radius}; -webkit-border-bottom-right-radius: {radius}; border-bottom-right-radius: {radius}; }{scope}.ui-corner-left { -moz-border-radius-topleft: {radius}; -webkit-border-top-left-radius: {radius}; border-top-left-radius: {radius}; -moz-border-radius-bottomleft: {radius}; -webkit-border-bottom-left-radius: {radius}; border-bottom-left-radius: {radius}; }{scope}.ui-corner-all { -moz-border-radius: {radius}; -webkit-border-radius: {radius}; border-radius: {radius}; }").replace(/{scope}/g,C||"").replace(/{radius}/g,B)
}}
}(function(){A.addCss('.echo-ui { text-align: left; }.echo-ui .ui-helper-hidden { display: none; }.echo-ui .ui-helper-hidden-accessible { position: absolute; left: -99999999px; }.echo-ui .ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.3; text-decoration: none; font-size: 100%; list-style: none; }.echo-ui .ui-helper-clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }.echo-ui .ui-helper-clearfix { display: inline-block; }/* required comment for clearfix to work in Opera \\*/* html .echo-ui .ui-helper-clearfix { height:1%; }.echo-ui .ui-helper-clearfix { display:block; }/* end clearfix */.echo-ui .ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; filter:Alpha(Opacity=0); }.echo-ui .ui-resizable-handle { position: absolute;font-size: 0.1px;z-index: 99999; display: block;}.echo-ui .ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; }.echo-ui .ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0; }.echo-ui .ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0; }.echo-ui .ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0; height: 100%; }.echo-ui .ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0; height: 100%; }.echo-ui .ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; }.echo-ui .ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; }.echo-ui .ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; }.echo-ui .ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}.echo-ui .ui-state-disabled { cursor: default !important; }.echo-ui .ui-icon { display: block; text-indent: -99999px; overflow: hidden; background-repeat: no-repeat; width: 16px; height: 16px; }.echo-ui .ui-widget-header { font-weight: bold; border: 0px; }.echo-ui, .echo-ui .ui-widget :active { outline: none; }.echo-ui .ui-state-default { border: 1px solid #d3d3d3; background: #e6e6e6; color: #555555; }.echo-ui .ui-state-default a, .echo-ui .ui-state-default a:link, .echo-ui .ui-state-default a:visited { color: #555555; text-decoration: none; }.echo-ui .ui-state-hover, .echo-ui .ui-state-focus { border: 1px solid #999999; background: #dfebf2; color: #212121; }.echo-ui .ui-state-hover a, .echo-ui .ui-state-hover a:hover { color: #212121; text-decoration: none; }.echo-ui .ui-state-active { border: 1px solid #aaaaaa; background: #dfebf2; color: #212121; }.echo-ui .ui-state-active a, .echo-ui .ui-state-active a:link, .echo-ui .ui-state-active a:visited { color: #212121; text-decoration: none; }.echo-primaryBackgroundColor {  }.echo-secondaryBackgroundColor { background-color: #F4F4F4; }.echo-trinaryBackgroundColor { background-color: #ECEFF5; }.echo-primaryColor { color: #3A3A3A; }.echo-secondaryColor { color: #C6C6C6; }.echo-primaryFont { font-family: Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 16px; }.echo-secondaryFont { font-family: Arial, sans-serif; font-size: 11px; }.echo-linkColor, .echo-linkColor a { color: #476CB8; }.echo-clickable { cursor: pointer; }.echo-relative { position: relative; }.echo-clear { clear: both; }',"ui-general")
})();
Echo.UI.Dialog=function(B){B.config=B.config||{};
this.init(B);
this.config.dialogClass="echo-ui echo-dialog "+(this.config.dialogClass||"");
this.addCss();
this.contentElement=this.render().dialog(this.config).addClass("ui-corner-all");
if(this.content){if(A.isFunction(this.content)){this.content(this.contentElement)
}else{this.contentElement.append(this.content)
}}this.widget=this.contentElement.dialog("widget");
if(this.hasTabs){A(".ui-dialog-titlebar",this.widget).after(A(".echo-tabs-header",this.widget))
}};
Echo.UI.Dialog.prototype=new Echo.Object();
Echo.UI.Dialog.prototype.cssPrefix="echo-dialog-";
Echo.UI.Dialog.prototype.template="<div></div>";
Echo.UI.Dialog.prototype.open=function(){this.contentElement.hide();
this.contentElement.dialog("open");
this.contentElement.show()
};
Echo.UI.Dialog.prototype.close=function(){this.contentElement.dialog("close")
};
Echo.UI.Dialog.prototype.addCss=function(){A.addCss(".echo-dialog { position: absolute; padding: 0px 7px 20px 7px; width: 300px; border: 1px solid #aaaaaa; background: #dfebf2; -moz-border-radius: 7px; -webkit-border-radius: 7px; border-radius: 7px;"+(!A.browser.msie?" overflow: hidden;":"")+" }.echo-dialog .ui-dialog-titlebar { background: #dfebf2; cursor: move; padding: 7px 0px 10px 5px; position: relative; color: #4a4a4a; font: 18px Helvetica,sans-serif; }.echo-dialog .ui-dialog-titlebar .ui-state-default, .echo-dialog .ui-dialog-titlebar .ui-state-active, .echo-dialog .ui-dialog-titlebar .ui-state-hover, .echo-dialog .ui-dialog-titlebar .ui-state-focus { border: 0px; background: none; }.echo-dialog .ui-dialog-title { float: left; margin: .1em 16px .2em 0; } .echo-dialog .ui-dialog-titlebar-close { position: absolute; right: 0px; top: 50%; width: 19px; margin: -10px 0 0 0; padding: 0px; height: 18px; }.echo-dialog .ui-dialog-titlebar-close span { display: block; margin: 1px; }.echo-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus { padding: 0px; }.echo-dialog .ui-dialog-content { border: 0; padding: 0px; margin: 0px; background: #ffffff; overflow: auto; }.echo-dialog .ui-resizable-se { width: 14px; height: 14px; right: 3px; bottom: 3px; }.echo-dialog .ui-icon-closethick { background: no-repeat top right url(//c0.echoenabled.com/images/container/closeWindow.png); }.echo-dialog .ui-icon-grip-diagonal-se { background: no-repeat bottom right url(//c0.echoenabled.com/images/container/resizeHandle.png); }"+Echo.UI.cornersCss("7px",".echo-dialog "),"ui-dialog");
if(A.browser.msie){A.addCss(".echo-dialog .ui-dialog-content { zoom: 1; position: relative; }","ui-dialog-ie")
}};
Echo.UI.Tabs=function(D){var C=this;
D.config=D.config||{};
this.init(D);
if(!this.tabs){return 
}var B=this.idPrefix;
this.idPrefix=this.idPrefix+Math.ceil(Math.random()*999999999)+"-";
this.addCss();
var E=A.foldl([],this.tabs,function(G,H,F){G.classPrefix=B;
G.idPrefix=C.idPrefix;
if(G.icon){G.label="<span>"+G.label+"</span>"
}if(G.disabled){H.push(F)
}});
this.target.append(this.render());
this.tabIndexById={};
A.each(this.tabs,function(F,G){C.tabIndexById[G.id]=F;
if(G.content){var H=A("#"+G.idPrefix+G.id);
if(A.isFunction(G.content)){G.content(H)
}else{H.append(G.content)
}}});
if(this.addUIClass!==false){this.target.addClass("echo-ui")
}A.extend(this.config,{disabled:E.concat(C.config.disabled||[]),select:function(F,G){C.content[G.index?"addClass":"removeClass"]("ui-corner-tl")
}});
this.headerElement=A(".echo-tabs-header",this.target).tabs(this.config);
this.panelsElement=A(".echo-tabs-panels",this.target).tabs(this.config);
A(".echo-tabs-header, .echo-tabs-header .ui-tabs-nav",this.target).removeClass("ui-corner-all");
this.content=A(this.content||".echo-tabs-panels",this.target);
this.content.removeClass("ui-corner-all").addClass("ui-corner-tr ui-corner-bottom")
};
Echo.UI.Tabs.prototype=new Echo.Object();
Echo.UI.Tabs.prototype.cssPrefix="echo-tabs-";
Echo.UI.Tabs.prototype.template=function(){var B=this;
return'<div class="echo-tabs"><div class="echo-tabs echo-tabs-header"><ul>'+A.map(this.tabs,function(C){return B.substitute('<li><a class="echo-{Data:classPrefix}{Data:id}" href="#{Data:idPrefix}{Data:id}">{Data:label}</a></li>',C)
}).join("\n")+'</ul></div><div class="echo-tabs echo-tabs-panels"></div></div>'
};
Echo.UI.Tabs.prototype.renderers={};
Echo.UI.Tabs.prototype.renderers.panels=function(C){var B=this;
A.each(this.tabs,function(D,E){var F=A.toDOM(B.substitute('<div id="{Data:idPrefix}{Data:id}" class="{Data:idPrefix}{Data:id}"></div>',E));
C.append(F.content)
})
};
Echo.UI.Tabs.prototype.select=function(B){this.headerElement.tabs("select",this.tabIndexById[B])
};
Echo.UI.Tabs.prototype.addCss=function(){A.addCss(".echo-ui .ui-tabs { position: relative; padding: 0px; border: 0px; }.echo-tabs .echo-tabs-panels { background: #ffffff; }.echo-ui .ui-tabs .ui-tabs-nav { margin: 0; padding: 0px; }.echo-ui .ui-tabs .ui-tabs-nav li { list-style: none; float: left; position: relative; top: 1px; margin: 0 .2em 1px 0; border-bottom: 0 !important; padding: 0; white-space: nowrap; }.echo-ui .ui-tabs .ui-tabs-nav li a { float: left; padding: .3em .7em; text-decoration: none; font-size: 12px; font-family: Helvetica,sans-serif; }.echo-ui .ui-tabs .ui-tabs-nav li.ui-tabs-selected { margin-bottom: 0; padding-bottom: 1px; }.echo-ui .ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .echo-ui .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .echo-ui .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; color: #4a4a4a; }.echo-ui .ui-tabs .ui-tabs-nav li a, .echo-ui .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; color: #393939; }.echo-ui .ui-tabs .ui-tabs-panel { display: block; border-width: 0; padding: 1em 1.4em; background: none; }.echo-ui .ui-tabs .ui-tabs-hide { display: none !important; }.echo-ui .echo-tabs-header .ui-state-hover, .echo-ui .echo-tabs-header .ui-state-focus { border: 0px; background: none; color: #212121; }.echo-ui .echo-tabs-header .ui-state-default { border: 0px; background: none; font-weight: normal; }.echo-ui .echo-tabs-header .ui-state-active { border: 0px; background: #ffffff; font-weight: bold; }.echo-ui .ui-tabs .ui-tabs-nav li a span { display: inline-block; padding-left: 22px; }"+(A.browser.opera?".echo-ui .ui-tabs-nav { height: 25px; overflow: hidden; }":"")+Echo.UI.cornersCss("7px",".echo-tabs "),"ui-tabs");
if(A.browser.msie){A.addCss(".echo-ui .ui-tabs { zoom:  1; position: static; }","ui-tabs-ie")
}};
Echo.UI.Button=function(C,B){this.states=B||{};
this.element=A(C);
this.addCss();
if(this.states.normal&&!this.states.normal.label){this.states.normal.label=A(C).html()
}A(C).button(this.states.normal).wrap('<span class="echo-button"></span>');
this.wrapper=A(C).parent()
};
Echo.UI.Button.prototype=new Echo.Object();
Echo.UI.Button.prototype.setState=function(B){this.element.removeClass("ui-button-text-only ui-button-text-icons ui-button-text-icon");
this.element.button("option",this.states[B])
};
Echo.UI.Button.prototype.addCss=function(){A.addCss(".echo-button .ui-button { display: inline-block; position: relative; padding: 0; margin-right: .1em; text-decoration: none !important; cursor: pointer; text-align: center; overflow: visible; }.echo-button .ui-button-icon-only { width: 1.8em; }.echo-button button.ui-button-icon-only { width: 2em; }.echo-button .ui-button-icons-only { width: 3em; }.echo-button button.ui-button-icons-only { width: 3.3em; }.echo-button .ui-button .ui-button-text { display: block; }.echo-button .ui-button-text-only .ui-button-text { padding: .4em .8em; }.echo-button .ui-button-icon-only .ui-button-text, .echo-button .ui-button-icons-only .ui-button-text { padding: .4em; text-indent: -9999999px; }.echo-button .ui-button-text-icon .ui-button-text, .echo-button .ui-button-text-icons .ui-button-text { padding: .4em .8em .4em 2.1em; }.echo-button .ui-button-text-icons .ui-button-text { padding-left: 1.9em; padding-right: 1.9em; }.echo-button input.ui-button { padding: .4em .8em; }.echo-button .ui-button-icon-only .ui-icon, .echo-button .ui-button-text-icon .ui-icon, .echo-button .ui-button-text-icons .ui-icon, .echo-button .ui-button-icons-only .ui-icon { position: absolute; top: 50%; margin-top: -8px; }.echo-button .ui-button-icon-only .ui-icon { left: 50%; margin-left: -8px; }.echo-button .ui-button-text-icon .ui-button-icon-primary, .echo-button .ui-button-text-icons .ui-button-icon-primary, .echo-button .ui-button-icons-only .ui-button-icon-primary { left: .3em; }.echo-button .ui-button-text-icons .ui-button-icon-secondary, .echo-button .ui-button-icons-only .ui-button-icon-secondary { right: .3em; }.echo-button button.ui-button::-moz-focus-inner { border: 0; padding: 0; }.echo-button .ui-state-default { border: 1px solid #d3d3d3; background: #e6e6e6; color: #555555; }.echo-button .ui-state-default a, .echo-ui .ui-state-default a:link, .echo-button .ui-state-default a:visited { color: #555555; text-decoration: none; }.echo-button .ui-state-hover, .echo-button .ui-state-focus { border: 1px solid #999999; background: #dfebf2; color: #212121; }.echo-button .ui-state-active { border: 1px solid #aaaaaa; background: #dfebf2; color: #212121; }"+Echo.UI.cornersCss("4px",".echo-button button"),"ui-buttons");
if(A.browser.msie){A.addCss(".echo-button .ui-button { zoom: 1; }","ui-buttons-ie")
}A.addCss(".echo-button .ui-icon-arrow-right { background: no-repeat center url(//c0.echoenabled.com/images/curation/button/apply_normal.png); }.echo-button .ui-icon-save { margin-right: 5px; background: no-repeat center url(//c0.echoenabled.com/images/curation/button/save_normal.png); }.echo-button .ui-icon-waiting { margin-right: 5px; background: no-repeat center url(//c0.echoenabled.com/images/loading.gif); }","ui-buttons-icons")
};
if(!Echo.Localization){Echo.Localization={labels:{}}
}Echo.Localization.key=function(B,C){return(C?C+".":"")+B
};
Echo.Localization.extend=function(C,B){A.each(C,function(D,E){Echo.Localization.labels[Echo.Localization.key(D,B)]=E
})
};
Echo.Localization.label=function(C,D,E){var B=Echo.Localization.labels[Echo.Localization.key(C,D)]||C;
A.each(E||{},function(F,G){B=B.replace(new RegExp("{"+F+"}","g"),G)
});
return B
}
})(jQuery);
(function(A){Echo.Localization.extend({edit:"Edit",loading:"Loading...",login:"Login",logout:"Logout",loggingOut:"Logging out...",or:"or",signup:"signup"},"Auth");
Echo.Auth=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={};
this.initConfig(C);
this.initApplication(function(){B.addCss();
B.listenEvents();
B.config.get("target").empty().append(B.render())
})
};
Echo.Auth.prototype=new Echo.Application();
Echo.Auth.prototype.namespace="Auth";
Echo.Auth.prototype.cssPrefix="echo-auth-";
Echo.Auth.prototype.renderers={};
Echo.Auth.prototype.template=function(){return this.templates[this.user.logged()?"logged":"anonymous"]
};
Echo.Auth.prototype.templates={};
Echo.Auth.prototype.templates.anonymous='<div class="echo-auth-anonymous echo-primaryFont"><span class="echo-auth-login echo-linkColor echo-clickable">{Label:login}</span><span class="echo-auth-or echo-secondaryColor"> {Label:or} </span><span class="echo-auth-signup echo-linkColor echo-clickable">{Label:signup}</span></div>';
Echo.Auth.prototype.templates.logged='<div class="echo-auth-logged echo-primaryFont echo-primaryColor"><div class="echo-auth-avatar"></div><div class="echo-auth-name"></div><div class="echo-auth-edit echo-linkColor echo-clickable">{Label:edit}</div><div class="echo-auth-logout echo-linkColor echo-clickable">{Label:logout}</div><div class="echo-clear"></div></div>';
Echo.Auth.prototype.renderers.logout=function(C){var B=this;
C.click(function(){C.empty().append(B.label("loggingOut"));
B.user.logout()
})
};
Echo.Auth.prototype.renderers.login=function(B){this.assembleIdentityControl("login",B)
};
Echo.Auth.prototype.renderers.edit=function(B){this.assembleIdentityControl("edit",B)
};
Echo.Auth.prototype.renderers.signup=function(B){this.assembleIdentityControl("signup",B)
};
Echo.Auth.prototype.renderers.or=function(B){if(!this.config.get("identityManager.login")||!this.config.get("identityManager.signup")||!this.user.get("sessionID")){B.hide()
}};
Echo.Auth.prototype.renderers.avatar=function(D){var B=this;
var C=this.user.get("avatar",this.user.get("defaultAvatar"));
D.append(A("<img>",{src:C}).bind({error:function(){A(this).attr("src",B.user.get("defaultAvatar"))
}}))
};
Echo.Auth.prototype.renderers.name=function(B){B.append(this.user.get("name",""))
};
Echo.Auth.prototype.assembleIdentityControl=function(E,D){var C=this;
var F=this.config.get("identityManager."+E);
if(!F||!this.user.get("sessionID")){return D.hide()
}var B=function(G){var J=encodeURIComponent(C.user.get("sessionID",""));
var I=A.parseUrl(G);
var H=I.query?I.query.match(/=$/)?J:"&sessionID="+J:"sessionID="+J;
return C.substitute("{Data:scheme}://{Data:domain}{Data:path}?{Data:query}{Data:fragment}",{scheme:I.scheme||"http",domain:I.domain,path:I.path,query:(I.query||"")+H,fragment:I.fragment?("#"+I.fragment):""})
};
if(F.type=="script"){D.click(function(){A.getScript(B(F.url))
})
}else{D.fancybox({autoScale:false,height:F.height,href:B(F.url),onClosed:function(){if(A.browser.msie&&document.compatMode!="CSS1Compat"){var G=A("#fancybox-overlay").get(0).style;
G.removeExpression("height");
G.removeExpression("width")
}A("body").trigger("fancybox-close")
},onComplete:function(){var G=(A.browser.msie&&document.compatMode!="CSS1Compat"?40:0);
A("#fancybox-frame").css({width:F.width-G,height:F.height-G})
},onStart:function(){Backplane.expectMessages("identity/ack");
if(A.browser.msie&&document.compatMode!="CSS1Compat"){var G=A("#fancybox-overlay").get(0).style;
G.setExpression("height","Math.max(document.body.clientHeight, document.body.scrollHeight)");
G.setExpression("width","Math.max(document.body.clientWidth, document.body.scrollWidth)")
}A("body").trigger("fancybox-open")
},padding:0,scrolling:"no",transitionIn:"elastic",transitionOut:"elastic",type:"iframe",width:F.width})
}};
Echo.Auth.prototype.listenEvents=function(){var B=this;
this.subscribe("internal.User.onInvalidate",function(){A.fancybox.close();
B.rerender()
})
};
Echo.Auth.prototype.addCss=function(){A.addCss(".echo-submit-auth .echo-auth-logout { float: right; }.echo-auth-anonymous { text-align: right; }.echo-auth-avatar { float: left; }.echo-auth-avatar img { width: 24px; height: 24px; }.echo-auth-name { float: left; font-size: 18px; line-height: 24px; margin-left: 5px; font-weight: bold; }.echo-auth-edit { float: left; margin: 6px 0px 0px 12px; }","auth")
}
})(jQuery);
(function(A){Echo.Counter=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={};
this.data={};
this.initConfig(C,{debug:false});
this.messageLayout="compact";
this.initApplication(function(){B.contextId=B.newContextId();
B.showMessage({type:"loading"});
B.initLiveUpdates(function(){return{endpoint:"count",query:{q:B.config.get("query","")}}
},function(D){B.handleResponse(D)
});
if(B.config.get("data")){B.handleResponse(B.config.get("data"))
}else{B.request()
}B.listenEvents()
})
};
Echo.Counter.prototype=new Echo.Application();
Echo.Counter.prototype.namespace="Counter";
Echo.Counter.prototype.request=function(){var B=this;
this.sendAPIRequest({endpoint:"count",query:{q:B.config.get("query","")}},function(C){B.handleResponse(C)
})
};
Echo.Counter.prototype.refresh=function(){this.stopLiveUpdates();
this.data={};
this.showMessage({type:"loading"});
this.request()
};
Echo.Counter.prototype.listenEvents=function(){var B=this;
A.map(["Submit.onPostComplete","Submit.onEditComplete"],function(C){Echo.Broadcast.subscribe(C,function(){B.startLiveUpdates(true)
})
})
};
Echo.Counter.prototype.handleResponse=function(C){var B=this;
var D=this.config.get("target");
C=C||{};
if(C.result=="error"&&C.errorCode!="more_than"){this.handleErrorResponse(C);
return 
}this.cleanupErrorHandlers(true);
D.show();
D.html(C.errorCode=="more_than"?(C.errorMessage+"+"):C.count);
if(A.isEmptyObject(this.data)||this.data.count!=C.count){this.publish("Counter.onUpdate",{data:C,query:this.config.get("query",""),target:this.config.get("target").get(0)})
}this.data=C;
this.startLiveUpdates()
}
})(jQuery);
(function(A){Echo.Localization.extend({apply:"Apply",cancel:"Cancel","delete":"Delete",deleteQueryConfirmMessage:'Are you sure you want to delete the "{Data:name}" query?',edit:"Edit",save:"Save",saving:"Saving...",textFieldEmptyError:"Query field can not be empty!",titleFieldEmptyError:"Title field can not be empty!"},"Query");
Echo.Query=function(B){this.vars={};
this.mode="view";
this.init(B)
};
Echo.Query.prototype=new Echo.Object();
Echo.Query.prototype.namespace="Query";
Echo.Query.prototype.cssPrefix="echo-query-";
Echo.Query.prototype.template=function(){return'<div class="echo-query-container echo-curation-primary-font"><div class="echo-query-quickButton echo-query-applyButton echo-clickable" title="{Label:apply}"></div><div class="echo-query-controls"><div class="echo-query-quickButton echo-query-deleteButton echo-clickable" title="{Label:delete}"></div><div class="echo-query-quickButton echo-query-editButton echo-clickable" title="{Label:edit}"></div><div class="echo-clear"></div></div>'+(this.mode=="view"?'<div class="echo-query-content echo-query-content-view"><span>{Data:title}</span></div>':'<div class="echo-query-content echo-query-content-edit"><div class="echo-query-title-container"><input class="echo-query-title echo-curation-primary-font echo-curation-input" value="{Data:title}"></div><div><textarea class="echo-query-text echo-curation-primary-font echo-curation-input" spellcheck="false">{Data:query}</textarea></div></div><div class="echo-query-buttons"><button type="button" class="echo-query-saveButton echo-curation-secondary-font">{Label:save}</button><button type="button" class="echo-query-cancelButton echo-curation-secondary-font">{Label:cancel}</button><div class="echo-clear"></div></div>')+'<div class="echo-clear"></div></div>'
};
Echo.Query.prototype.renderers={};
Echo.Query.prototype.renderers.container=function(C){var B=this;
C.bind({mouseleave:function(){if(B.mode=="edit"){return 
}B.dom.get("controls").hide()
},mouseenter:function(){if(B.mode=="edit"){return 
}B.dom.get("controls").show()
}});
if(this.mode=="view"){C.addClass("echo-clickable").click(function(){B.publish("QueryPalette.onApply",{title:B.data.title,query:B.data.query})
})
}};
Echo.Query.prototype.renderers.editButton=function(C){var B=this;
C.click(function(){B.publish("internal.Query.onEdit",B.data);
B.mode="edit";
B.rerender()
})
};
Echo.Query.prototype.renderers.deleteButton=function(C){var B=this;
C.click(function(){if(confirm(B.substitute(B.label("deleteQueryConfirmMessage"),{name:B.data.title}))){B.dom.remove("container");
B.publish("internal.Query.onDelete",B.data)
}})
};
Echo.Query.prototype.renderers.applyButton=function(D){var B=this;
var C=function(E){return B.mode=="edit"?B.dom.get(E=="query"?"text":E).val():B.data[E]
};
D.click(function(E){B.publish("QueryPalette.onApply",{title:C("title"),query:C("query")});
E.stopPropagation()
})
};
Echo.Query.prototype.renderers.saveButton=function(D){var B=this;
var C=new Echo.UI.Button(D,{normal:{icons:{primary:"ui-icon-save"},disabled:false},saving:{icons:{primary:"ui-icon-waiting"},disabled:true,label:B.label("saving")}});
D.click(function(){var E={};
A.each(["title","text"],function(H,F){var G=A.trim(A.stripTags(B.dom.get(F).val()));
if(!G){alert(B.label(F+"FieldEmptyError"));
B.dom.get(F).focus();
return false
}E[F]=G
});
if(!E.title||!E.text){return false
}C.setState("saving");
B.data.title=E.title;
B.data.query=E.text;
B.publish("internal.Query.onSave",{query:B.data,callback:function(){B.mode="view";
B.rerender()
}})
})
};
Echo.Query.prototype.renderers.cancelButton=function(C){var B=this;
new Echo.UI.Button(C);
C.click(function(){B.mode="view";
B.rerender()
})
};
Echo.Localization.extend({advancedBuilderSwitch:"Quick Editor",apply:"Apply",chronological:"Chronological",editMore:"Edit More...",emptyQueriesList:"No saved queries...",itemsPerPage:"Items per page",help:"Help",loadingQueriesList:"Loading...",path:"Path",query:"Query",queryBuilder:"Query Builder",quickBuilderSwitch:"Advanced Editor",repliesDescending:"Replies Count (descending)",likesDescending:"Likes Count (descending)",flagsDescending:"Flags Count (descending)",reverseChronological:"Reverse Chronological",savedQueries:"Saved Queries",saveToList:"Save to list",saving:"Saving...",sortOrder:"Sort Order",states:"States",stateCommunityFlagged:"Flagged by Community",stateModeratorApproved:"Approved by Moderator",stateModeratorDeleted:"Deleted by Moderator",stateModeratorFlagged:"Flagged by Moderator",stateSystemFlagged:"Flagged by System",stateUntouched:"New",textFieldEmptyError:"Query field can not be empty!",viewingOptions:"Viewing Options"},"QueryPalette");
Echo.QueryPalette=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={};
this.queries=[];
this.queryById={};
this.builders={};
this.builderMode="quick";
this.states=["Untouched","ModeratorApproved","ModeratorDeleted","CommunityFlagged","ModeratorFlagged","SystemFlagged"];
this.initConfig(C,{query:{path:window.location.protocol+"//"+window.location.host+"/*",states:["Untouched","SystemFlagged","CommunityFlagged","ModeratorFlagged"],itemsPerPage:12,sortOrder:"reverseChronological"},domain:window.location.host,autoRequest:false,queriesAppURL:window.location.protocol+"//apps.echoenabled.com/v2/query"});
this.initApplication(function(){B.addCss();
B.prepareQuery();
B.listenEvents();
B.config.get("target").empty().append(B.render());
if(B.config.get("autoRequest")){B.requestSavedQueries()
}})
};
Echo.QueryPalette.prototype=new Echo.Application();
Echo.QueryPalette.prototype.namespace="QueryPalette";
Echo.QueryPalette.prototype.cssPrefix="echo-curation-queries-";
Echo.QueryPalette.prototype.template='<div class="echo-curation-queries"><div class="echo-curation-queries-header"><div class="echo-curation-queries-header-left echo-curation-secondary-font">{Label:queryBuilder}</div><div class="echo-curation-queries-header-right"><a class="echo-curation-queries-builderModeSwitcher echo-clickable echo-linkColor"></a></div><div class="echo-clear"></div></div><div class="echo-curation-queries-builder"></div><div class="echo-curation-queries-buttons"><button type="button" class="echo-curation-queries-helpButton echo-curation-secondary-font">{Label:help}</button><button type="button" class="echo-curation-queries-applyButton echo-curation-secondary-font">{Label:apply}</button><button type="button" class="echo-curation-queries-editButton echo-curation-secondary-font">{Label:editMore}</button><button type="button" class="echo-curation-queries-saveButton echo-curation-secondary-font">{Label:saveToList}</button><div class="echo-clear"></div></div><div class="echo-curation-queries-header echo-curation-secondary-font">{Label:savedQueries}</div><div class="echo-curation-queries-savedQueries"></div>';
"</div>";
Echo.QueryPalette.prototype.renderers={};
Echo.QueryPalette.prototype.renderers.quickEditor=function(){var C=this;
var B=function(F){var G='<div class="{Data:prefix}"><input type="checkbox" id="{Data:prefix}{Data:name}" class="{Data:prefix}{Data:name}"{Data:checked}><label for="{Data:prefix}{Data:name}" class="echo-clickable"><span class="{Data:prefix}{Data:name}Label echo-curation-primary-font">{Data:label}</span></label></div>';
return A.map(F,function(H){return C.substitute(G,{checked:C.query.states[H]?" checked":"",prefix:"echo-curation-queries-state",name:H,label:C.label("state"+H)})
}).join("\n")
};
var E='<div class="echo-curation-queries-wrapper"><div class="echo-curation-queries-subheader echo-curation-secondary-font">{Label:path}</div><div><input class="echo-curation-primary-font echo-curation-queries-path echo-curation-input"></div><div class="echo-curation-queries-subheader echo-curation-secondary-font">{Label:states}</div><div class="echo-curation-queries-content"><div class="echo-curation-queries-block echo-curation-queries-left">'+B(["Untouched","ModeratorApproved","ModeratorDeleted"])+'</div><div class="echo-curation-queries-block">'+B(["CommunityFlagged","ModeratorFlagged","SystemFlagged"])+'</div><div class="echo-clear"></div></div><div class="echo-curation-queries-subheader echo-curation-secondary-font">{Label:viewingOptions}</div><div class="echo-curation-queries-viewOptions-itemsPerPage echo-curation-primary-font"><span class="echo-curation-queries-view-option">{Label:itemsPerPage}:</span><input class="echo-curation-queries-itemsPerPage echo-curation-primary-font"></div><div class="echo-curation-queries-viewOptions-sortOrder echo-curation-primary-font"><span class="echo-curation-queries-view-option">{Label:sortOrder}:</span><select class="echo-curation-queries-sortOrder echo-curation-primary-font"><option value="chronological">{Label:chronological}</option><option value="reverseChronological">{Label:reverseChronological}</option><option value="repliesDescending">{Label:repliesDescending}</option><option value="likesDescending">{Label:likesDescending}</option><option value="flagsDescending">{Label:flagsDescending}</option></select></div></div>';
var D=A.foldl({},["path","itemsPerPage","sortOrder"],function(F,G){G[F]=function(H){H.val(C.query[F])
}
});
this.builders.quick=A.toDOM(this.substitute(E),"echo-curation-queries-",D);
return this.builders.quick.content
};
Echo.QueryPalette.prototype.renderers.advancedEditor=function(){var B=this;
var D='<div class="echo-curation-queries-wrapper"><div class="echo-curation-queries-subheader echo-curation-secondary-font">{Label:query}</div><div class="echo-curation-queries-content"><textarea class="echo-curation-queries-query echo-curation-input" spellcheck="false"></textarea></div></div>';
var C={query:function(E){E.val(B.query.text)
}};
this.builders.advanced=A.toDOM(this.substitute(D),"echo-curation-queries-",C);
return this.builders.advanced.content
};
Echo.QueryPalette.prototype.renderers.builder=function(B){var C=this.render(this.builderMode+"Editor");
(B||this.dom.get("builder")).empty().append(C)
};
Echo.QueryPalette.prototype.renderers.builderModeSwitcher=function(C){var B=this;
(C||this.dom.get("builderModeSwitcher")).empty().append(this.label(this.builderMode+"BuilderSwitch")).unbind("click").one("click",function(){B.toggleBuilderView()
})
};
Echo.QueryPalette.prototype.renderers.helpButton=function(B){new Echo.UI.Button(B);
B.click(function(){window.open("http://wiki.aboutecho.com/API-method-search")
})
};
Echo.QueryPalette.prototype.renderers.editButton=function(C){var B=this;
new Echo.UI.Button(C);
C.click(function(){B.toggleBuilderView(true)
})
};
Echo.QueryPalette.prototype.renderers.saveButton=function(D){var B=this;
var C=new Echo.UI.Button(D,{normal:{icons:{primary:"ui-icon-save"},disabled:false},saving:{icons:{primary:"ui-icon-waiting"},disabled:true,label:B.label("saving")}});
D.hide().click(function(){var G=B.config.get("appkey")+"-"+window.location.host+"-"+(new Date().getTime())+"-"+Math.round(Math.random()*1000);
var E=B.dom.get("savedQueries");
var F=B.initQuery({id:G,title:"Query #"+(B.queries.length+1),query:B.builders.advanced.get("query").val()||""});
if(!A.trim(F.data.query)){alert(B.label("textFieldEmptyError"));
B.builders.advanced.get("query").focus();
return false
}C.setState("saving");
B.queryById[G]=F;
if(!B.queries.length){E.empty()
}B.queries.unshift(F);
B.sendRequest({action:"save",id:G,title:F.data.title,query:F.data.query},function(){C.setState("normal");
var H=F.render();
E.prepend(H);
H.hide().css({backgroundColor:"#ffff99"}).slideDown(700).animate({backgroundColor:"#ffffff"},4000,"easeInOutExpo")
})
})
};
Echo.QueryPalette.prototype.renderers.applyButton=function(C){var B=this;
new Echo.UI.Button(C,{normal:{icons:{primary:"ui-icon-arrow-right"}}});
C.click(function(){B.query.text=B.builderMode=="quick"?B.assembleQuery():B.builders.advanced.get("query").val()||"";
if(B.builderMode=="quick"){B.saveQuickView()
}B.publish("QueryPalette.onApply",{query:B.query.text})
})
};
Echo.QueryPalette.prototype.prepareQuery=function(){this.query=this.config.get("query");
if(this.query){this.query.states=A.foldl({},this.query.states||[],function(C,B){B[C]=true
})
}};
Echo.QueryPalette.prototype.listenEvents=function(){var B=this;
this.subscribe("internal.Query.onEdit",function(C,D){B.collapseQueriesExcept(D.id)
});
this.subscribe("internal.Query.onDelete",function(C,D){B.deleteQuery(D.id);
if(!B.queries.length){B.renderQueriesMessage("empty")
}B.sendRequest({id:D.id,action:"delete"})
});
this.subscribe("internal.Query.onSave",function(C,D){B.sendRequest({action:"save",id:D.query.id,title:D.query.title,query:D.query.query},D.callback)
})
};
Echo.QueryPalette.prototype.toggleBuilderView=function(B){var D="quick";
var C={edit:this.dom.get("editButton"),save:this.dom.get("saveButton")};
if(this.builderMode=="quick"){D="advanced";
C.edit.hide();
C.save.show();
if(B||!this.query.text){this.query.text=this.assembleQuery()
}this.saveQuickView()
}else{C.edit.show();
C.save.hide()
}this.builderMode=D;
this.rerender(["builder","builderModeSwitcher"])
};
Echo.QueryPalette.prototype.deleteQuery=function(B){if(this.queryById[B]){this.queries=A.foldl([],this.queries,function(D,C){if(D.data.id!=B){C.push(D)
}})
}};
Echo.QueryPalette.prototype.collapseQueriesExcept=function(B){if(this.queryById[B]){A.map(this.queries,function(C){if(C.mode=="edit"&&C.data.id!=B){C.mode="view";
C.rerender()
}})
}};
Echo.QueryPalette.prototype.assembleQuery=function(){var D=[],C=this.builders.quick;
if(C.get("path")&&A.trim(C.get("path").val())!=""){D.push("scope:"+A.trim(C.get("path").val()))
}var B=A.foldl([],this.states,function(F,E){if(C.get("state"+F).attr("checked")){E.push(F)
}});
if(B.length){D.push("state:"+B.join(","))
}D.push("sortOrder:"+C.get("sortOrder").val());
if(C.get("itemsPerPage").val()>0){D.push("itemsPerPage:"+C.get("itemsPerPage").val())
}return D.join(" ")
};
Echo.QueryPalette.prototype.saveQuickView=function(){var B=this.builders.quick;
this.query.path=B.get("path").val();
this.query.states=A.foldl({},this.states,function(D,C){if(B.get("state"+D).attr("checked")){C[D]=true
}});
this.query.sortOrder=B.get("sortOrder").val();
this.query.itemsPerPage=B.get("itemsPerPage").val()||0
};
Echo.QueryPalette.prototype.sendRequest=function(B,C){B.appkey=this.config.get("appkey");
B.domain=this.config.get("domain");
C=C||function(){};
A.get(this.config.get("queriesAppURL"),B,C,"jsonp")
};
Echo.QueryPalette.prototype.requestSavedQueries=function(){var B=this;
this.renderQueriesMessage("loading");
this.sendRequest({action:"list"},function(C){B.handleSavedQueriesResponse(C)
})
};
Echo.QueryPalette.prototype.handleSavedQueriesResponse=function(D){var C=this;
D=D||[];
if(!D.length){C.renderQueriesMessage("empty");
return 
}var B=C.dom.get("savedQueries").empty();
this.queries=A.foldl([],D,function(E,G){var F=C.initQuery(E);
C.queryById[E.id]=F;
B.append(F.render());
G.push(F)
})
};
Echo.QueryPalette.prototype.refresh=function(){this.requestSavedQueries()
};
Echo.QueryPalette.prototype.renderQueriesMessage=function(B){this.showMessage({type:B,message:this.label(B+"QueriesList")},this.dom.get("savedQueries"))
};
Echo.QueryPalette.prototype.initQuery=function(B){return new Echo.Query({data:B,config:new Echo.Config(this.config.getAsHash())})
};
Echo.QueryPalette.prototype.addCss=function(){var B=this;
A.addCss(".echo-curation-queries {}.echo-curation-queries-wrapper { margin: 0px 5px; }.echo-curation-primary-font { font-family: Arial; font-size: 12px; color: #393939; }.echo-curation-secondary-font { font-family: Arial; font-weight: bold; font-size: 11px; color: #4a4a4a; }.echo-curation-input { width: 100%; border: 1px solid #e1e1e1; }.echo-curation-queries-header { height: 25px; line-height: 25px; padding: 0px 5px; background-color: #e8e8e8; }.echo-curation-queries-header-left { float: left; }.echo-curation-queries-header-right { float: right; }.echo-curation-queries-builderModeSwitcher { font-family: Arial; font-size: 11px; text-decoration: underline; }input.echo-curation-queries-itemsPerPage { width: 48px; height: 20px; border: 1px solid #e1e1e1; }.echo-curation-queries-subheader { margin: 10px 0px; }.echo-curation-queries-block { float: left; }.echo-curation-queries-left { margin-right: 40px; }textarea.echo-curation-queries-query { height: 200px; }.echo-curation-queries-state { margin-bottom: 10px; line-height: 18px; }.echo-curation-queries-state input { margin: 0px; }.echo-curation-queries-state span { display: inline-block; margin-left: 5px; padding-left: 18px; }.echo-curation-queries-buttons { margin: 20px 5px; }.echo-curation-queries-helpButton { float: left; }.echo-curation-queries-editButton, .echo-curation-queries-saveButton { float: right; }.echo-curation-queries-applyButton { float: right; margin-left: 10px; }.echo-curation-queries-viewOptions-itemsPerPage { margin-bottom: 10px; }.echo-curation-queries-view-option { padding-right: 5px; }.echo-curation-queries .echo-application-message { border: 0px; }"+A.map(B.states,function(C){return B.substitute('.echo-curation-queries-state{Data:name}Label { background: url("{Data:img}") no-repeat; }',{name:C,img:"//c0.echoenabled.com/images/curation/status/"+C.toLowerCase()+".png"})
}).join("\n"),"curation");
if(A.browser.msie){A.addCss(".echo-curation-input { width: 99%; }","curation-ie")
}A.addCss(".echo-query-container { margin: 5px; line-height: 25px; border-bottom: 1px solid #e1e1e1; }.echo-query-controls { float: right; width: 40px; display: none; }.echo-query-quickButton { height: 16px; width: 16px; margin-top: 4px; }.echo-query-applyButton { float: left; margin-right: 5px; background: url(//c0.echoenabled.com/images/curation/apply.png) no-repeat; }.echo-query-deleteButton { float: right; background: url(//c0.echoenabled.com/images/curation/delete.png) no-repeat; }.echo-query-editButton { float: right; background: url(//c0.echoenabled.com/images/curation/edit.png) no-repeat; margin-right: 5px; }.echo-query-content { margin-left: 21px; }.echo-query-content-view { margin-right: 40px; }.echo-query-buttons { margin: 5px 0px; }.echo-query-saveButton { float: right; margin-left: 5px; }.echo-query-cancelButton { float: right }.echo-query-text { height: 80px; }.echo-query-title-container { margin-bottom: 5px; }.echo-query-title { margin-top: 4px; }","query")
};
Echo.Localization.extend({title:"Bulk Actions",itemsCount:"Apply the following transformation to the <strong>{count}</strong> selected item(s)",actionBlockIP:"Block IP",actionBlockUser:"Block User",actionCommunityFlagged:"Flag",actionModeratorApproved:"Approve",actionModeratorDeleted:"Delete",actionModeratorFlagged:"Spam"},"BulkActions");
Echo.BulkActions=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={};
this.init({data:C.data});
this.initConfig(C);
this.initApplication(function(){B.addCss();
B.config.get("target").empty().append(B.render())
})
};
Echo.BulkActions.prototype=new Echo.Application();
Echo.BulkActions.prototype.namespace="BulkActions";
Echo.BulkActions.prototype.cssPrefix="echo-bulk-actions-";
Echo.BulkActions.prototype.template='<div class="echo-bulk-actions"><div class="echo-bulk-actions-header echo-curation-secondary-font">{Label:title}</div><div class="echo-bulk-actions-info echo-curation-primary-font"></div><div class="echo-bulk-actions-buttons"></div></div>';
Echo.BulkActions.prototype.renderers={};
Echo.BulkActions.prototype.renderers.info=function(B){(B||this.dom.get("info")).empty().append(this.label("itemsCount",{count:this.data.items.length}))
};
Echo.BulkActions.prototype.renderers.buttons=function(C){var B=this;
var D='<div class="echo-bulk-actions-button echo-curation-primary-font echo-bulk-actions-{Data:class}">{Data:label}</div>';
A.map(this.actions(),function(G){var F={"class":G.name,label:B.label("action"+G.name)};
var E=A(B.substitute(D,F)).click(function(){G.callback()
});
C.append(E)
})
};
Echo.BulkActions.prototype.refresh=function(B){this.data.items=B;
this.rerender("info")
};
Echo.BulkActions.prototype.actions=function(){var B=this;
var C=A.map(["ModeratorApproved","ModeratorDeleted","CommunityFlagged","ModeratorFlagged"],function(D){return{name:D,callback:function(){B.publish("BulkActions.onStatusChange",{state:D})
}}
});
return C
};
Echo.BulkActions.prototype.addCss=function(){var B=this;
A.addCss(".echo-bulk-actions-header { height: 25px; line-height: 25px; padding: 0px 5px; background-color: #e8e8e8; }.echo-bulk-actions-info { margin: 20px 0px 10px; }.echo-bulk-actions-button { padding-left: 23px; cursor: pointer; margin: 10px 0px 10px 10px; line-height: 18px; }"+A.map(B.actions(),function(C){return B.substitute('.echo-bulk-actions-{Data:name} { background: url("//c0.echoenabled.com/images/curation/actions/{Data:img}.png") no-repeat; }',{name:C.name,img:C.name.toLowerCase()})
}).join("\n"),"bulk-actions")
}
})(jQuery);
(function(A){Echo.Localization.extend({defaultModeSwitchTitle:"Switch to metadata view",guest:"Guest",today:"Today",yesterday:"Yesterday",lastWeek:"Last Week",lastMonth:"Last Month",secondAgo:"Second Ago",secondsAgo:"Seconds Ago",minuteAgo:"Minute Ago",minutesAgo:"Minutes Ago",hourAgo:"Hour Ago",hoursAgo:"Hours Ago",dayAgo:"Day Ago",daysAgo:"Days Ago",weekAgo:"Week Ago",weeksAgo:"Weeks Ago",metadataModeSwitchTitle:"Return to default view",monthAgo:"Month Ago",monthsAgo:"Months Ago",sharedThisOn:"I shared this on {service}...",userID:"User ID:",fromLabel:"from",viaLabel:"via"},"Item");
Echo.Item=function(B){this.vars={};
this.blocked=false;
this.controlsOrder=[];
this.controls={};
this.init(B)
};
Echo.Item.prototype=new Echo.Object();
Echo.Item.prototype.cssPrefix="echo-item-";
Echo.Item.prototype.namespace="Item";
Echo.Item.prototype.template='<div class="echo-item-content"><div class="echo-item-container"><div class="echo-item-avatar-wrapper"><div class="echo-item-avatar"></div></div><div class="echo-item-wrapper"><div class="echo-item-subwrapper"><div class="echo-item-subcontainer"><div class="echo-item-frame"><div class="echo-item-modeSwitch echo-clickable"></div><div class="echo-item-authorName echo-linkColor"></div><div class="echo-clear"></div><div class="echo-item-data"><div class="echo-item-re"></div><div class="echo-item-body echo-primaryColor"></div><div class="echo-item-markers echo-secondaryFont echo-secondaryColor"></div><div class="echo-item-tags echo-secondaryFont echo-secondaryColor"></div></div><div class="echo-item-metadata"><div class="echo-item-metadata-userID"><span class="echo-item-metadata-title echo-item-metadata-icon echo-item-metadata-userID">{Label:userID}</span><span class="echo-item-metadata-value">{Data:actor.id}</span></div></div><div class="echo-item-footer echo-secondaryColor echo-secondaryFont"><img class="echo-item-sourceIcon echo-clickable"><div class="echo-item-date"></div><div class="echo-item-from"></div><div class="echo-item-via"></div><div class="echo-item-controls"></div><div class="echo-clear"></div></div></div></div><div class="echo-clear"></div></div></div><div class="echo-clear"></div><div class="echo-item-childrenMarker"></div></div><div class="echo-item-children"></div></div>';
Echo.Item.prototype.renderers={};
Echo.Item.prototype.renderers.authorName=function(B){return this.data.actor.title||this.label("guest")
};
Echo.Item.prototype.renderers.markers=function(B,C){this.render("extraField",B,C,{type:"markers"})
};
Echo.Item.prototype.renderers.tags=function(B,C){this.render("extraField",B,C,{type:"tags"})
};
Echo.Item.prototype.renderers.extraField=function(F,H,B){var E=this;
var G=(B||{}).type;
if(!this.data.object[G]||!this.user.isAdmin()){H.remove(F);
return 
}var C=this.config.get("limits."+G);
var D=A.foldl([],this.data.object[G],function(K,L){var J=(K.length>C)?'<span title="{Data:item}">{Data:truncatedItem}</span>':"<span>{Data:item}</span>";
var I=A.htmlTextTruncate(K,C,"...");
L.push(E.substitute(J,{item:K,truncatedItem:I}))
});
F.prepend(D.sort().join(", "))
};
Echo.Item.prototype.renderers.container=function(D,F){var C=this;
D.removeClass(A.map(["child","root","child-thread","root-thread"],function(G){return"echo-item-container-"+G
}).join(" "));
var B=this.threading?"-thread":"";
if(this.depth){D.addClass("echo-item-container-child"+B);
D.addClass("echo-trinaryBackgroundColor")
}else{D.addClass("echo-item-container-root"+B)
}D.addClass("echo-item-depth-"+this.depth);
var E=function(G){A.map(C.controlsOrder,function(H){if(!C.controls[H].element){return 
}C.controls[H].clickableElements[G+"Class"]("echo-linkColor")
})
};
if(!A.isMobileDevice()){D.unbind(["mouseleave","mouseenter"]).hover(function(){if(C.user.isAdmin()){F.get("modeSwitch").show()
}E("add")
},function(){if(C.user.isAdmin()){F.get("modeSwitch").hide()
}E("remove")
})
}};
Echo.Item.prototype.renderers.modeSwitch=function(D){var C=this;
D.hide();
if(!this.user.isAdmin()){return 
}var E="default";
var B=function(F){F.attr("title",C.label(E+"ModeSwitchTitle"))
};
B(D);
D.click(function(){E=(E=="default"?"metadata":"default");
B(D);
C.dom.get("data").toggle();
C.dom.get("metadata").toggle()
});
if(A.isMobileDevice()){D.show()
}};
Echo.Item.prototype.renderers.wrapper=function(B){B.addClass("echo-item-wrapper"+(this.depth?"-child":"-root"))
};
Echo.Item.prototype.renderers.avatar=function(){var B=this;
var D=(!this.depth?48:24);
var C=this.data.actor.avatar||this.user.get("defaultAvatar");
return A("<img>",{src:C,width:D,height:D}).bind({error:function(){A(this).attr("src",B.user.get("defaultAvatar"))
}})
};
Echo.Item.prototype.renderers.children=function(C,D){var B=this;
A.each(C.children(),function(E,F){A(F).detach()
});
A.map(this.children,function(F){var E=!F.dom;
C.append(E?F.render():F.dom.content);
if(F.deleted){B.publish("internal.Item.onDelete",{item:F})
}else{if(F.added){B.publish("internal.Item.onAdd",{item:F})
}else{if(E&&F instanceof Echo.Item){B.publish("internal.Item.onRender",{item:F})
}}}})
};
Echo.Item.prototype.renderers.control=function(C,H,B){if(!B||!B.name){return 
}var D=B.template||'<a class="echo-item-control echo-item-control-{Data:name}">{Data:label}</a>';
var F={label:B.label||"",name:B.name};
var G=A(this.substitute(D,F));
var E=A(".echo-clickable",G);
if(!E.length){E=G;
G.addClass("echo-clickable")
}E[B.onetime?"one":"bind"]({click:function(I){I.stopPropagation();
if(B.callback){B.callback()
}}});
if(A.isMobileDevice()){E.addClass("echo-linkColor")
}return G
};
Echo.Item.prototype.renderers.controlsDelimiter=function(){return A('<span class="echo-item-control-delim"> \u00b7 </span>')
};
Echo.Item.prototype.renderers.controls=function(E){var D=this;
this.assembleControls();
this.sortControls();
var B=E.empty();
var C=this.render("controlsDelimiter");
A.map(this.controlsOrder,function(F){var G=D.controls[F];
if(!G||!G.visible()){return 
}var H=G.dom||D.render("control",undefined,undefined,G);
if(H){D.controls[F].element=H;
D.controls[F].clickableElements=A(".echo-clickable",H);
if(!D.controls[F].clickableElements.length){D.controls[F].clickableElements=H
}B.append(C.clone(true)).append(H)
}})
};
Echo.Item.prototype.renderers.re=function(){if(!this.config.get("reTag")){return 
}var M=this;
var D=this.data.object.context;
var K="";
var J=this.data.object.permalink;
var B=this.config.get("limits");
var I=this.config.get("openLinksInNewWindow");
var L=function(N){var O=A.parseUrl(N);
return(O&&O.domain)?O.domain:N
};
var E=function(O){var N=B.reTitle;
if(!O.title){N=B.reLink;
O.title=O.uri.replace(/^https?:\/\/(.*)/ig,"$1")
}if(O.title.length>N){O.title=O.title.substring(0,N)+"..."
}return"<div>"+M.hyperlink({"class":"echo-primaryColor",href:O.uri,caption:"Re: "+A.stripTags(O.title)},{openInNewWindow:I})+"</div>"
};
var G=document.location.href;
var H=L(G);
if(J==G||this.depth||!D||!D.length){return 
}var C=false;
A.each(D,function(N,O){if(O.uri==G){C=true;
return false
}});
if(C){return 
}if(this.config.get("optimizedContext")){var F=D[0];
A.each(D,function(N,O){if(L(O.uri)==H){F=O;
return false
}});
if(F){K=E(F)
}}else{A.each(D,function(N,O){K+=E(O)
})
}return A(K)
};
Echo.Item.prototype.renderers.sourceIcon=function(B,C){if(!this.config.get("viaLabel.icon")||this.data.source.name=="jskit"||this.data.source.name=="echo"){C.remove(B)
}B.hide().attr("src",A.htmlize(this.data.source.icon||this.config.get("providerIcon"))).show().one("error",function(){C.remove(B)
}).wrap(this.hyperlink({href:this.data.source.uri||this.data.object.permalink},{openInNewWindow:this.config.get("openLinksInNewWindow")}))
};
Echo.Item.prototype.renderers.via=function(D,E){var B=this;
var C=function(F){return(B.data[F].name||"").toLowerCase()
};
if(C("source")==C("provider")){return 
}this.render("viaText",D,E,{label:"via",field:"provider"})
};
Echo.Item.prototype.renderers.from=function(B,C){this.render("viaText",B,C,{label:"from",field:"source"})
};
Echo.Item.prototype.renderers.viaText=function(D,F,B){B=B||{};
var E=this.data[B.field];
if(!this.config.get("viaLabel.text")||!E.name||E.name=="jskit"||E.name=="echo"){return 
}var C=this.hyperlink({"class":"echo-secondaryColor",href:E.uri||this.data.object.permalink,caption:E.name},{openInNewWindow:this.config.get("openLinksInNewWindow")});
D.html("&nbsp;"+this.label(B.label+"Label")+"&nbsp;").append(C)
};
Echo.Item.prototype.renderers.body=function(C){var N=this;
var H=function(U){return C.append("<span>"+U+"</span>")
};
var L=this.data.object.content.replace(/<!\[CDATA\[(.*?)\]\]>/g,"$1");
var P=this.data.source.name;
var Q=this.config.get("openLinksInNewWindow");
var K=this.config.get("contentTransformations."+this.data.object.content_type,{});
if(P&&P=="Twitter"&&this.config.get("aggressiveSanitization")){H(this.label("sharedThisOn",{service:P}));
return 
}var F=this.config.get("limits");
var I=function(U){var W=(U.length>F.tags)?'<span class="echo-item-tag" title="{Data:tag}">{Data:truncatedTag}</span>':'<span class="echo-item-tag">{Data:tag}</span>';
var V=U.substring(0,F.tags)+"...";
return(N.substitute(W,{tag:U,truncatedTag:V}))
};
if(K.hashtags){L=L.replace(/(#|\uff03)(<a[^>]*>[^<]*<\/a>)/ig,function(V,U,W){return I(W)
})
}var D=function(U){if(!K.hashtags){return U
}return U.replace(/(^|[^\w&\/])(?:#|\uff03)([^\s\.,;:'"#@\$%<>!\?\(\)\[\]]+)/ig,function(W,V,X){return V+I(X)
})
};
var M=function(V){var U=[];
V=V.replace(/((<a\s+[^>]*>)(.*?)(<\/a>))|<.*?>/ig,function(X,W,b,a,Z){if(W){var Y=M(a);
Y.text=D(Y.text);
X=b+O(Y)+Z
}U.push(X);
return" %%HTML_TAG%% "
});
return{text:V,tags:U}
};
var O=function(U){A.each(U.tags,function(W,V){U.text=U.text.replace(" %%HTML_TAG%% ",V)
});
return U.text
};
var T="((?:http|ftp|https):\\/\\/(?:[a-z0-9#:\\/\\;\\?\\-\\.\\+,@&=%!\\*\\'(){}\\[\\]$_|^~`](?!gt;|lt;))+)";
var S=function(U){return U.replace(/(<a\s+[^>]*>)(.*?)(<\/a>)/ig,function(W,V,Y,X){if(new RegExp("^"+T+"$").test(Y)){Y=Y.length>F.bodyLink?Y.substring(0,F.bodyLink)+"...":Y
}if(Q&&!/\s+target=("[^<>"]*"|'[^<>']*'|\w+)/.test(V)){V=V.replace(/(^<a\s+[^>]*)(>$)/,'$1 target="_blank"$2')
}return V+Y+X
})
};
var R=M(L);
if(P&&P!="jskit"&&P!="echo"){var E=this.depth?this.data.target.id:this.config.get("reTag")?this.data.object.permalink||this.data.target.id:undefined;
if(E){R.text=R.text.replace(new RegExp(E,"g"),"");
if(!/\S/.test(R.text)){H(this.label("sharedThisOn",{service:P}));
return 
}}}var B=R.text=D(R.text);
if(K.urls){R.text=R.text.replace(new RegExp(T,"ig"),function(V,U){return N.hyperlink({href:U,caption:U},{skipEscaping:true,openInNewWindow:Q})
})
}if(K.smileys){if(R.text!=B){R=M(O(R))
}var G=this.initSmileysConfig();
if(R.text.match(G.regexps.test)){A.each(G.codes,function(U,V){R.text=R.text.replace(G.regexps[V],G.tag(G.hash[V]))
})
}}if(K.newlines){R.text=R.text.replace(/\n\n+/g,"\n\n");
R.text=R.text.replace(/\n/g,"&nbsp;<br>")
}var J=S(O(R));
if(F.body){J=A.htmlTextTruncate(J,F.body,"...")
}H(J)
};
Echo.Item.prototype.renderers.date=function(C){var B=C||this.dom&&this.dom.get("date");
this.calcAge();
if(B){B.html(this.age)
}};
Echo.Item.prototype.initSmileysConfig=function(){if(Echo.Vars.smileys){return Echo.Vars.smileys
}var B=function(E){return E.replace(/([\W])/g,"\\$1")
};
var C=Echo.Vars.smileys={codes:[],regexps:[]};
C.hash={":)":{file:"smile.png",title:"Smile"},":-)":{file:"smile.png",title:"Smile"},";)":{file:"wink.png",title:"Wink"},";-)":{file:"wink.png",title:"Wink"},":(":{file:"unhappy.png",title:"Frown"},":-(":{file:"unhappy.png",title:"Frown"},"=-O":{file:"surprised.png",title:"Surprised"},":-D":{file:"grin.png",title:"Laughing"},":-P":{file:"tongue.png",title:"Tongue out"},"=)":{file:"happy.png",title:"Happy"},"B-)":{file:"evilgrin.png",title:"Evil grin"}};
var D=[];
A.each(C.hash,function(E){var F=B(E);
D.push(F);
C.codes.push(E);
C.regexps[E]=new RegExp(F,"g")
});
C.regexps.test=new RegExp(D.join("|"));
C.tag=function(E){return'<img class="echo-item-smiley-icon" src="//c0.echoenabled.com/images/smileys/emoticon_'+E.file+'" title="'+E.title+'" border="0" alt="'+E.title+'" />'
};
return C
};
Echo.Item.prototype.assembleControls=function(){var C=this;
var B=[];
A.each(this.config.get("itemControls",{}),function(E,D){A.map(D,function(H){var G=A.isFunction(H)?H.call(C):A.extend({},H);
if(!G.name){return 
}var J=G.callback||function(){};
G.callback=function(){J.call(C);
C.publish("internal.Item.onControlClick",{name:G.name,plugin:E,item:{data:C.data,target:C.dom.content}})
};
G.label=G.label||G.name;
G.plugin=E;
if(typeof G.visible=="undefined"){G.visible=true
}var I=G.visible;
G.visible=function(){return I&&C.config.get("plugins."+E+".enabled")
};
var F=E+"."+G.name;
C.controls[F]=G;
if(A.inArray(F,C.controlsOrder)<0){B.push(F)
}})
});
C.controlsOrder=B.concat(C.controlsOrder)
};
Echo.Item.prototype.sortControls=function(){var C=this;
var E=this.controlsOrder;
var F=this.config.get("itemControlsOrder");
if(!F){this.config.set("itemControlsOrder",E)
}else{if(F!=E){var D=function(G,H,I){if(!C.controls[G]){return 
}H.push(G);
I=I||A.inArray(G,E);
if(I>=0){delete E[I]
}};
var B=A.foldl([],F,function(G,I){if(/^(.*)\./.test(G)){D(G,I)
}else{var H=new RegExp("^"+G+".");
A.map(E,function(K,J){if(K&&K.match(H)){D(K,I,J)
}})
}});
this.controlsOrder=B;
this.config.set("itemControlsOrder",B)
}else{if(!F.length){this.controlsOrder=[]
}}}};
Echo.Item.prototype.traverse=function(B,E,D){var C=this;
A.each(B||[],function(F,G){D=C.traverse(G.children,E,E(G,D))
});
return D
};
Echo.Item.prototype.refreshDate=function(){this.rerender("date");
A.map(this.children||[],function(B){B.refreshDate()
})
};
Echo.Item.prototype.calcAge=function(){if(!this.timestamp){return 
}var D=this;
var H=new Date(this.timestamp*1000);
var E=(new Date()).getTime();
var B;
var G=Math.floor((E-H.getTime())/1000);
var F=Math.floor(G/86400);
var C=function(I,J){return I+" "+D.label(J+(I==1?"":"s")+"Ago")
};
if(isNaN(F)||F<0||F>=365){B=H.toLocaleDateString()+", "+H.toLocaleTimeString()
}else{if(G<60){B=C(G,"second")
}else{if(G<60*60){G=Math.floor(G/60);
B=C(G,"minute")
}else{if(G<60*60*24){G=Math.floor(G/(60*60));
B=C(G,"hour")
}else{if(G<60*60*48){B=this.label("yesterday")
}else{if(F<7){B=C(F,"day")
}else{if(F<14){B=this.label("lastWeek")
}else{if(F<30){G=Math.floor(F/7);
B=C(G,"week")
}else{if(F<60){B=this.label("lastMonth")
}else{if(F<365){G=Math.floor(F/31);
B=C(G,"month")
}}}}}}}}}}if(this.age!=B){this.age=B
}};
Echo.Item.prototype.block=function(C){if(this.blocked){return 
}this.blocked=true;
var E=this.dom.get("container");
var D=E.width();
var B=E.outerHeight();
this.blockers={backdrop:A('<div class="echo-item-blocker-backdrop"></div>').css({width:D,height:B}),message:A(this.substitute('<div class="echo-item-blocker-message">{Data:label}</div>',{label:C})).css({left:((parseInt(D)-200)/2)+"px",top:((parseInt(B)-20)/2)+"px"})};
E.addClass("echo-relative").prepend(this.blockers.backdrop).prepend(this.blockers.message)
};
Echo.Item.prototype.unblock=function(){if(!this.blocked){return 
}this.blocked=false;
this.blockers.backdrop.remove();
this.blockers.message.remove();
this.dom.get("container").removeClass("echo-relative")
};
Echo.Item.prototype.getAccumulator=function(B){return this.data.object.accumulators[B]
};
Echo.Localization.extend({guest:"Guest",live:"Live",paused:"Paused",more:"More",loading:"Loading...",emptyStream:"No items at this time...","new":"new"},"Stream");
Echo.Stream=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={cache:{}};
this.initConfig(C,{aggressiveSanitization:false,children:{depth:2,sortOrder:"chronological"},childrenMaxDepth:1,contentTransformations:{text:["smileys","hashtags","urls","newlines"],html:["smileys","hashtags","urls","newlines"],xhtml:["smileys","hashtags","urls"]},fadeTimeout:2800,flashColor:"#ffff99",itemControlsOrder:undefined,itemsPerPage:15,maxBodyLinkLength:50,maxBodyCharacters:undefined,maxReLinkLength:30,maxReTitleLength:143,maxTagLength:16,maxMarkerLength:16,openLinksInNewWindow:false,optimizedContext:true,providerIcon:"http://c0.echoenabled.com/images/favicons/comments.png",reTag:true,slideTimeout:700,sortOrder:"reverseChronological",streamStateLabel:{icon:true,text:true},submissionProxyURL:window.location.protocol+"//apps.echoenabled.com/v2/esp/activity",streamStateToggleBy:"mouseover",viaLabel:{icon:false,text:false}},this.assembleConfigNormalizer());
this.initVars();
this.initApplication(function(){B.addCss();
B.config.get("target").empty().append(B.render());
B.recalcEffectsTimeouts();
B.initLiveUpdates(function(){return{endpoint:"search",query:{q:B.constructSearchQuery(),since:B.nextSince||0}}
},function(D){B.handleLiveUpdatesResponse(D)
});
if(B.config.get("data")){B.handleInitialResponse(B.config.get("data"),function(D){B.lastRequest={initial:true,data:D};
B.render("body")
})
}else{B.initialItemsRequest()
}B.listenEvents();
B.publish("Stream.onRender",B.prepareBroadcastParams())
})
};
Echo.Stream.prototype=new Echo.Application();
Echo.Stream.prototype.namespace="Stream";
Echo.Stream.prototype.cssPrefix="echo-stream-";
Echo.Stream.prototype.template='<div class="echo-stream-container echo-primaryFont echo-primaryBackgroundColor"><div class="echo-stream-header"><div class="echo-stream-state echo-secondaryColor"></div><div class="echo-clear"></div></div><div class="echo-stream-body"></div><div class="echo-stream-more"></div><div class="echo-stream-brand"><a class="echo-stream-brand-link" href="http://aboutecho.com" target="_blank"><div class="echo-stream-brand-message">social networking by</div></a></div></div>';
Echo.Stream.prototype.renderers={};
Echo.Stream.prototype.renderers.body=function(D){var C=this;
D=D||this.dom.get("body");
if(!this.lastRequest){var B=(this.error&&this.error.errorCode=="waiting")?"waiting":"loading";
this.showMessage({type:"loading",message:this.label(B)},D);
return 
}if(this.lastRequest.data.length){if(this.lastRequest.initial){D.empty()
}this.appendRootItems(this.lastRequest.data,D)
}else{this.showMessage({type:"empty",message:this.label("emptyStream")},D)
}if(this.lastRequest.initial&&this.config.get("streamStateToggleBy")=="mouseover"&&this.config.get("liveUpdates")){D.bind({mouseleave:function(){C.setStreamState("live")
},mouseenter:function(){C.setStreamState("paused")
}})
}this.publish("Stream.onReady",this.prepareBroadcastParams({initial:this.lastRequest.initial}))
};
Echo.Stream.prototype.renderers.state=function(E){var B=this;
var C=this.config.get("streamStateLabel");
if((!C.icon&&!C.text)||!this.config.get("liveUpdates")){return 
}var G=0;
if(this.activities.state=="paused"){G=A.foldl(0,B.activities.queue,function(H,I){if(H.affectCounter){return ++I
}})
}var F=this.activities.state+G;
if(F==this.activities.lastState){return 
}E=(E||this.dom.get("state")).empty();
if(!this.activities.lastState&&this.config.get("streamStateToggleBy")=="button"){E.addClass("echo-linkColor echo-clickable").click(function(H){B.setStreamState(B.activities.state=="paused"?"live":"paused")
})
}var D={picture:'<span class="echo-stream-state-picture echo-stream-state-picture-'+this.activities.state+'"></span>',message:this.config.get("streamStateToggleBy")=="button"?'<a href="javascript:void(0)" class="echo-stream-state-message">{Label:'+this.activities.state+"}</a>":'<span class="echo-stream-state-message">{Label:'+this.activities.state+"}</span>",count:' <span class="echo-stream-state-count">({Data:count} {Label:new})</span>'};
if(C.icon){E.append(D.picture)
}if(C.text){E.append(this.substitute(D.message));
if(G&&this.activities.state=="paused"){E.append(this.substitute(D.count,{count:G}))
}}this.activities.lastState=F
};
Echo.Stream.prototype.renderers.more=function(C,D){var B=this;
if(this.isViewComplete||!this.threads.length){C.empty().hide();
return 
}C.empty().append(this.label("more")).bind({mouseenter:function(){C.addClass("echo-stream-more-hover")
},mouseleave:function(){C.removeClass("echo-stream-more-hover")
}}).show().unbind("click").one("click",function(){B.publish("Stream.onMoreButtonPress",B.prepareBroadcastParams());
C.html(B.label("loading"));
B.moreRequestItems(C)
})
};
Echo.Stream.prototype.initVars=function(){this.activities={queue:[],state:this.config.get("liveUpdates")?"live":"paused",lastState:"",animations:0};
this.hasInitialData=false;
this.items={};
this.threads=[];
this.cleanupErrorHandlers()
};
Echo.Stream.prototype.listenEvents=function(){var B=this;
this.subscribe("internal.User.onInvalidate",function(){B.refresh()
});
this.subscribe("internal.Item.onAdd",function(C,D){D.item.dom.content.hide();
B.queueActivity({action:"animation",actorID:D.item.data.actor.id,itemUnique:D.item.data.unique,handler:function(){delete D.item.added;
B.addItemSpotUpdate(D.item)
}})
});
this.subscribe("internal.Item.onDelete",function(C,D){B.queueActivity({action:"animation",itemUnique:D.item.data.unique,actorID:D.item.data.actor.id,handler:function(){delete D.item.deleted;
B.deleteItemSpotUpdate(D.item)
}})
});
this.subscribe("internal.Item.onRender",function(C,D){B.publish("Stream.Item.onRender",B.prepareBroadcastParams({item:{data:D.item.data,target:D.item.dom.content}}))
});
this.subscribe("internal.Item.onControlClick",function(C,D){var C=B.namespace+".Item.onControlClick";
B.publish(C,B.prepareBroadcastParams(D))
});
A.map(["Submit.onPostComplete","Submit.onEditComplete"],function(C){Echo.Broadcast.subscribe(C,function(){B.startLiveUpdates(true)
})
})
};
Echo.Stream.prototype.initialItemsRequest=function(){var B=this;
this.requestItems({},function(C){B.lastRequest={initial:true,data:C};
B.render("body")
})
};
Echo.Stream.prototype.moreRequestItems=function(C){var B=this;
C=C||this.dom.get("more");
this.lastRequest={initial:false};
this.requestItems({pageAfter:'"'+(B.nextPageAfter||"0")+'"'},function(D){if(D.length){B.lastRequest.data=D;
B.render("body")
}else{C.html(B.label("emptyStream")).delay(1000).fadeOut(1000)
}})
};
Echo.Stream.prototype.setStreamState=function(B){this.activities.state=B;
if(B=="live"){this.executeNextActivity()
}this.rerender("state")
};
Echo.Stream.prototype.refresh=function(){this.stopLiveUpdates();
this.initVars();
delete this.lastRequest;
this.clearCache();
this.rerender();
this.initialItemsRequest();
this.publish("Stream.onRerender",this.prepareBroadcastParams())
};
Echo.Stream.prototype.extractPresentationConfig=function(B){return A.foldl({},["sortOrder","itemsPerPage","safeHTML"],function(C,D){if(B[C]){D[C]=B[C]
}})
};
Echo.Stream.prototype.extractTimeframeConfig=function(D){var C=function(I){var E=I.match(/^(<|>)(.*)$/);
var J=E[1];
var G=E[2].match(/^'([0-9]+) seconds ago'$/);
var F=G?function(){return Math.floor((new Date()).getTime()/1000)-G[1]
}:function(){return E[2]
};
var H;
if(J=="<"){H=function(K){return K<F()
}
}else{if(J==">"){H=function(K){return K>F()
}
}}return H
};
var B=A.foldl([],["before","after"],function(E,G){if(!D[E]){return 
}var F=C(D[E]);
if(F){G.push(F)
}});
return{timeframe:B}
};
Echo.Stream.prototype.assembleConfigNormalizer=function(){var B=this;
var E=function(F){return F<0?0:F
};
var D={contentTransformations:function(F){A.each(F,function(H,G){F[H]=A.foldl({},G||[],function(I,J){J[I]=true
})
});
return F
},safeHTML:function(F){return"off"!=F
},streamStateToggleBy:function(F){if(F=="mouseover"&&A.isMobileDevice()){return"button"
}return F
},fadeTimeout:E,slideTimeout:E};
var C={body:"maxBodyCharacters",reLink:"maxReLinkLength",reTitle:"maxReTitleLength",bodyLink:"maxBodyLinkLength",tags:"maxTagLength",markers:"maxMarkerLength"};
A.each(C,function(G,F){D[F]=function(H){this.set("limits."+G,H);
return H
}
});
return D
};
Echo.Stream.prototype.getRespectiveAccumulator=function(D,C){var B={likesDescending:"likesCount",flagsDescending:"flagsCount",repliesDescending:"repliesCount"};
return D.getAccumulator(B[C])
};
Echo.Stream.prototype.appendRootItems=function(D,B){var C=this;
var E=document.createDocumentFragment();
A.each(D||[],function(F,G){E.appendChild(G.render().get(0));
C.publish("Stream.Item.onRender",C.prepareBroadcastParams({item:{data:G.data,target:G.dom.content}}))
});
B.append(E);
this.rerender("more")
};
Echo.Stream.prototype.prepareBroadcastParams=function(B){B=B||{};
B.target=this.config.get("target").get(0);
B.query=this.config.get("query");
if(B.item&&B.item.target){B.item.target=B.item.target.get(0)
}return B
};
Echo.Stream.prototype.constructSearchQuery=function(B){var C=B&&B.pageAfter&&"pageAfter:"+B.pageAfter||"";
return[this.config.get("query",""),C].join(" ")
};
Echo.Stream.prototype.requestItems=function(B,D){var C=this;
this.sendAPIRequest({endpoint:"search",query:{q:this.constructSearchQuery(B)}},function(E){C.handleInitialResponse(E,D)
})
};
Echo.Stream.prototype.handleInitialResponse=function(H,F){var D=this,C=[],B=[];
var G=this.lastRequest&&!this.lastRequest.initial;
H=H||{};
if(H.result=="error"){this.handleErrorResponse(H,{messageTarget:G?D.dom.get("more"):D.dom.get("body"),waitingHandler:function(){if(G){D.moreRequestItems()
}else{D.refresh()
}}});
return 
}this.cleanupErrorHandlers(true);
this.config.get("target").show();
this.changeLiveUpdatesTimeout(H.liveUpdatesTimeout);
this.nextSince=H.nextSince||0;
this.nextPageAfter=H.nextPageAfter;
this.config.extend(this.extractPresentationConfig(H));
this.config.extend(this.extractTimeframeConfig(H));
var E=D.config.get("sortOrder");
H.entries=H.entries||[];
this.publish("Stream.onDataReceive",D.prepareBroadcastParams({entries:H.entries,initial:!this.hasInitialData}));
A.each(H.entries,function(I,K){K=D.normalizeEntry(K);
var J=D.initItem(K);
D.applyStructureUpdates("add",J);
if(D.isRootItem(J)){D.addItemToList(B,J,E)
}});
this.hasInitialData=true;
this.isViewComplete=B.length!=this.config.get("itemsPerPage");
F(B);
this.startLiveUpdates()
};
Echo.Stream.prototype.checkTimeframeSatisfy=function(){var C=this;
var B=this.config.get("timeframe");
var D=A.foldl([],this.threads,function(E,G){var F=A.foldl(true,B,function(I,H){return H?I(E.timestamp):false
});
if(!F){G.push(E)
}});
A.map(D,function(E){C.applySpotUpdates("delete",E)
})
};
Echo.Stream.prototype.handleLiveUpdatesResponse=function(C){var B=this;
C=C||{};
if(C.result=="error"){this.startLiveUpdates();
return 
}this.nextSince=C.nextSince||0;
this.refreshItemsDate();
this.checkTimeframeSatisfy();
this.applyLiveUpdates(C.entries);
this.render("state");
this.executeNextActivity();
this.startLiveUpdates()
};
Echo.Stream.prototype.applyLiveUpdates=function(B){var C=this;
A.each(B||[],function(D,G){G=C.normalizeEntry(G);
var F=C.items[G.unique];
var H=C.classifyAction(G);
if(!F&&H!="post"){return 
}switch(H){case"post":if(F){C.applySpotUpdates("replace",C.updateItem(G))
}else{F=C.initItem(G,true);
var E=C.isRootItem(F)?C.withinVisibleFrame(F):C.hasParentItem(F);
if(E){C.publish("Stream.Item.onReceive",C.prepareBroadcastParams({item:{data:F.data}}));
C.applySpotUpdates("add",F)
}else{delete C.items[G.unique]
}}break;
case"delete":C.applySpotUpdates("delete",F);
break
}});
this.recalcEffectsTimeouts()
};
Echo.Stream.prototype.recalcEffectsTimeouts=function(){var D=this;
var F={fade:D.config.get("fadeTimeout"),slide:D.config.get("slideTimeout")};
D.timeouts=D.timeouts||{fade:F.fade,slide:F.slide};
if(F.fade==0&&F.slide==0){return 
}D.timeouts.coeff=D.timeouts.coeff||{fade:D.timeouts.fade/(F.fade+F.slide),slide:D.timeouts.slide/(F.fade+F.slide)};
var B=function(H,G){G=Math.round(G*D.timeouts.coeff[H]);
if(G<100){return 0
}if(G>F[H]){return F[H]
}return G
};
var E=D.config.get("liveUpdatesTimeout")*1000*0.8;
var C=D.activities.queue.length?E/D.activities.queue.length:E;
D.timeouts.fade=B("fade",C);
D.timeouts.slide=B("slide",C)
};
Echo.Stream.prototype.refreshItemsDate=function(){A.map(this.threads,function(B){B.refreshDate()
})
};
Echo.Stream.prototype.executeNextActivity=function(){var B=this.activities;
if(B.animations>0||!B.queue.length||(B.state=="paused"&&B.queue[0].action!="replace"&&!B.queue[0].isCurrentUser)){return 
}B.queue.shift().handler()
};
Echo.Stream.prototype.applySpotUpdates=function(E,D){var B=this;
var C=function(F){switch(F){case"add":B.applyStructureUpdates(F,D);
D.added=true;
if(B.isRootItem(D)){B.placeRootItem(D)
}else{var I=B.getParentItem(D);
if(I&&I.dom){I.rerender(["container","children"])
}}B.executeNextActivity();
break;
case"replace":D.unblock();
if(B.maybeMoveItem(D)){var G=B.getItemListIndex(D,B.threads);
B.applyStructureUpdates(F,D);
var H=B.getItemListIndex(D,B.threads);
if(G!=H){B.applySpotUpdates("move",D)
}}if(D&&D.dom){D.rerender("container",true)
}B.executeNextActivity();
break;
case"delete":D.deleted=true;
if(B.isRootItem(D)){B.publish("internal.Item.onDelete",{item:D});
B.applyStructureUpdates(F,D)
}else{var I=B.getParentItem(D);
if(I){I.rerender("children");
B.applyStructureUpdates(F,D);
I.rerender("container")
}}B.executeNextActivity();
break;
case"move":B.moveItemSpotUpdate(D);
break
}};
this.queueActivity({action:E,itemUnique:D.data.unique,actorID:D.data.actor.id,handler:function(){C(E)
}})
};
Echo.Stream.prototype.queueActivity=function(E){var B=E.actorID&&this.user.hasIdentity(E.actorID);
var D=this.getActivityDependency(A.extend(E,{isCurrentUser:B}));
var C={action:E.action,type:E.type||"",affectCounter:E.action=="add",itemUnique:E.itemUnique,isCurrentUser:B,handler:function(){E.handler()
}};
if(D.dependent||typeof D.index=="undefined"){this.activities.queue.push(C)
}else{this.activities.queue.splice(D.index,0,C)
}};
Echo.Stream.prototype.getActivityDependency=function(D){var B;
var C=D.action!="replace"&&D.action!="animation";
A.each(this.activities.queue,function(E,F){if(C){if(typeof B=="undefined"&&D.isCurrentUser&&!F.isCurrentUser){C=false;
B=E;
return false
}}else{if(typeof B=="undefined"&&(D.action=="replace"&&F.action!="replace"||D.action=="animation"&&F.action!="animation"||D.isCurrentUser&&!F.isCurrentUser)){B=E
}if(D.action=="replace"&&F.action=="add"&&F.itemUnique==D.itemUnique){C=true;
return false
}}});
return{dependent:C,index:B}
};
Echo.Stream.prototype.addItemSpotUpdate=function(F){var D=this;
this.activities.animations++;
if(this.timeouts.slide){var G=F.dom.content.show().css("height");
F.dom.content.css("height",G).hide().animate({height:"show",marginTop:"show",marginBottom:"show",paddingTop:"show",paddingBottom:"show"},this.timeouts.slide,function(){if(!F.dom||!F.dom.content){return 
}F.dom.content.css("height","")
})
}else{F.dom.content.show()
}var E=function(){if(!F.dom||!F.dom.content){return 
}D.publish("Stream.Item.onRender",D.prepareBroadcastParams({item:{data:F.data,target:F.dom.content}}))
};
if(this.timeouts.fade){var B=F.dom.get("container");
var C=A.getVisibleColor(B);
B.delay(this.timeouts.slide).css({backgroundColor:this.config.get("flashColor")}).animate({backgroundColor:C},this.timeouts.fade,"linear",function(){B.css("backgroundColor","");
E();
D.activities.animations--;
D.executeNextActivity()
})
}else{E();
this.activities.animations--;
this.executeNextActivity()
}};
Echo.Stream.prototype.deleteItemSpotUpdate=function(C,D){var B=this;
this.activities.animations++;
D=D||function(){if(!C.dom||!C.dom.content){return 
}C.dom.remove("content");
delete C.dom;
C.vars={};
var E=A.foldl(0,B.items,function(F,G){return G+1
});
if(!E){B.showMessage({type:"empty",message:B.label("emptyStream")},B.dom.get("body"))
}B.activities.animations--;
B.executeNextActivity()
};
if(this.timeouts.slide){C.dom.content.slideUp(this.timeouts.slide,D)
}else{D()
}};
Echo.Stream.prototype.moveItemSpotUpdate=function(C){var B=this;
B.deleteItemSpotUpdate(C,function(){if(!C.dom||!C.dom.content){return 
}B.activities.animations--;
C.dom.content.detach();
delete C.dom;
C.vars={};
B.placeRootItem(C)
})
};
Echo.Stream.prototype.classifyAction=function(B){return(B.verbs[0]=="http://activitystrea.ms/schema/1.0/delete")?"delete":"post"
};
Echo.Stream.prototype.isRootItem=function(B){return !this.config.get("childrenMaxDepth")||B.id==B.conversation
};
Echo.Stream.prototype.hasParentItem=function(B){return !!this.getParentItem(B)
};
Echo.Stream.prototype.maybeMoveItem=function(B){return this.isRootItem(B)&&this.config.get("sortOrder").match(/flags|replies|likes/)
};
Echo.Stream.prototype.withinVisibleFrame=function(C){var B=this.threads.length?this.threads[this.threads.length-1]:undefined;
if(this.isViewComplete||B==undefined){return true
}return this.compareItems(B,C,this.config.get("sortOrder"))
};
Echo.Stream.prototype.getParentItem=function(B){return this.isRootItem(B)?undefined:this.items[B.data.parentUnique]
};
Echo.Stream.prototype.compareItems=function(D,B,F){var E=this;
switch(F){case"chronological":return D.timestamp>B.timestamp;
case"reverseChronological":return D.timestamp<=B.timestamp;
case"likesDescending":case"repliesDescending":case"flagsDescending":var C=function(G){return E.getRespectiveAccumulator(G,F)
};
return(C(D)<C(B)||(C(D)==C(B)&&this.compareItems(D,B,"reverseChronological")))
}};
Echo.Stream.prototype.placeRootItem=function(E){var D=E.render();
if(this.threads.length>1){var F=this.getItemListIndex(E,this.threads);
var B=this.threads[F+1],C=this.threads[F-1];
if(B){B.dom.content.before(D)
}else{C.dom.content.after(D)
}}else{this.dom.get("body").empty().append(D)
}this.publish("internal.Item.onAdd",{item:E})
};
Echo.Stream.prototype.getItemListIndex=function(C,B){var D;
A.each(B||[],function(E,F){if(F==C){D=E;
return false
}});
return D
};
Echo.Stream.prototype.initItem=function(E,F){var B=this;
var D=new Echo.Item({children:[],config:new Echo.Config(this.config.getAsHash()),conversation:E.target.conversationID,data:E,depth:0,id:E.object.id,live:F,threading:false,timestamp:A.timestampFromW3CDTF(E.object.published),user:this.user});
var C=D.template;
D.template=function(){if(!B.vars.cache.itemTemplate){B.vars.cache.itemTemplate=A.isFunction(C)?C.apply(this,arguments):C
}return B.vars.cache.itemTemplate
};
this.items[D.data.unique]=D;
return D
};
Echo.Stream.prototype.updateItem=function(C){var B=this.items[C.unique];
B.data=C;
return B
};
Echo.Stream.prototype.addItemToList=function(C,F,D){var B=this;
if(F.live||F.forceInject){var E=false;
A.each(C||[],function(G,H){if(B.compareItems(H,F,D)){C.splice(G,0,F);
E=true;
return false
}});
if(!E){C.push(F)
}delete F.forceInject
}else{C.push(F)
}this.items[F.data.unique]=F
};
Echo.Stream.prototype.applyStructureUpdates=function(H,G,D){var C=this;
D=D||{};
switch(H){case"add":if(!this.isRootItem(G)){var E=this.getParentItem(G);
if(!E){delete this.items[G.data.unique];
return 
}G.depth=E.depth+1;
if(G.depth>this.config.get("childrenMaxDepth")){G.depth=this.config.get("childrenMaxDepth");
G.data.parentUnique=E.data.parentUnique;
G.data.target.id=E.data.target.id;
G.forceInject=true;
this.applyStructureUpdates("add",G);
return 
}E.threading=true;
var F=this.config.get("children.sortOrder");
if(F!="chronological"){G.forceInject=true
}this.addItemToList(E.children,G,F)
}else{this.addItemToList(this.threads,G,this.config.get("sortOrder"))
}break;
case"delete":var B=null;
if(this.isRootItem(G)){B=this.threads
}else{B=this.items[G.data.parentUnique].children;
if(B.length==1){var E=this.getParentItem(G);
if(E){E.threading=false
}}}B.splice(this.getItemListIndex(G,B),1);
if(!D.keepChildren){G.traverse(G.children,function(I){delete C.items[I.data.unique]
})
}delete this.items[G.data.unique];
break;
case"replace":if(this.maybeMoveItem(G)){this.applyStructureUpdates("delete",G,{keepChildren:true});
G.forceInject=true;
this.applyStructureUpdates("add",G)
}break
}};
Echo.Stream.prototype.normalizeEntry=function(C){if(C.normalized){return C
}var B=this;
C.normalized=true;
A.each(C.targets||[],function(D,E){if((E.id==E.conversationID)||(E.id==C.object.id)||(B.items[E.id+E.conversationID])){C.target=E
}});
C.object.content_type=C.object.content_type||"text";
C.object.accumulators=C.object.accumulators||{};
C.object.accumulators.repliesCount=parseInt(C.object.accumulators.repliesCount||"0");
C.object.accumulators.flagsCount=parseInt(C.object.accumulators.flagsCount||"0");
C.object.accumulators.likesCount=parseInt(C.object.accumulators.likesCount||"0");
C.object.context=C.object.context||[];
C.object.flags=C.object.flags||[];
C.object.likes=C.object.likes||[];
C.target=C.target||C.targets[0]||{};
C.target.conversationID=C.target.conversationID||C.object.id;
C.source=C.source||{};
C.provider=C.provider||{};
C.unique=C.object.id+C.target.conversationID;
C.parentUnique=C.target.id+C.target.conversationID;
return C
};
Echo.Stream.prototype.addCss=function(){var C=this;
A.addCss('.echo-stream-message-wrapper { padding: 15px 0px; text-align: center; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; border: 1px solid #E4E4E4; }.echo-stream-message-empty, .echo-stream-message-loading, .echo-stream-message-error { display: inline-block; height: 16px; padding-left: 21px; background: no-repeat left center; }.echo-stream-message-empty { background-image: url(//c0.echoenabled.com/images/information.png); }.echo-stream-message-loading { background-image: url(//c0.echoenabled.com/images/loading.gif); }.echo-stream-message-error { background-image: url(//c0.echoenabled.com/images/warning.gif); }.echo-stream-header { margin: 10px 0px 10px 20px; }.echo-stream-state { float: right; }.echo-stream-state-picture { display: inline-block; height: 9px; width: 8px; }.echo-stream-state-picture-paused { background: url("//c0.echoenabled.com/images/control_pause.png") no-repeat center center; }.echo-stream-state-picture-live { background: url("//c0.echoenabled.com/images/control_play.png") no-repeat center center; }.echo-stream-state-message { margin-left: 5px; text-decoration: none; }.echo-clickable a.echo-stream-state-message:hover { text-decoration: underline; }.echo-stream-brand { text-align: right; display: none; }.echo-stream-brand-message { display: inline-block; height: 17px; line-height: 17px; border: none; padding-right: 48px; background: url(//c0.echoenabled.com/images/echo-brand.png) no-repeat right; font-size: 10px; font-family: Arial; }.echo-stream-container a.echo-stream-brand-link { text-decoration: none; color: #666666; } .echo-stream-more-hover { background-color: #E4E4E4; }.echo-stream-more { text-align: center; border: solid 1px #E4E4E4; margin-top: 10px; padding: 10px; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; cursor: pointer; font-weight: bold; }.echo-stream-more .echo-application-message { padding: 0; border: none; border-radius: 0; }',"stream");
A.addCss('.echo-item-content { word-wrap: break-word; }.echo-item-container-root { padding: 10px 0px; }.echo-item-container-root-thread { padding: 10px 0px 0px 0px; }.echo-item-container-child { padding: 10px; margin: 0px 20px 2px 0px; }.echo-item-container-child-thread { padding: 10px; margin: 0px 20px 2px 0px; }.echo-item-avatar-wrapper { margin-right: -58px; float: left; position: relative; }.echo-item-children .echo-item-avatar-wrapper { margin-right: -34px; }.echo-item-children .echo-item-subwrapper { margin-left: 34px; }.echo-item-wrapper { float: left; width: 100%; }.echo-item-subwrapper { margin-left: 58px; }.echo-item-subcontainer { float: left; width: 100%; }.echo-item-markers { line-height: 16px; background: url(//c0.echoenabled.com/images/curation/metadata/marker.png) no-repeat; padding: 0px 0px 4px 21px; margin-top: 7px; }.echo-item-tags { line-height: 16px; background: url(//c0.echoenabled.com/images/tag_blue.png) no-repeat; padding: 0px 0px 4px 21px; }.echo-item-metadata { display: none; }.echo-item-metadata-title { font-weight: bold; line-height: 25px; height: 25px; margin-right: 5px; }.echo-item-metadata-icon { display: inline-block; padding-left: 26px; }div.echo-item-metadata-userID { border-bottom: 1px solid #e1e1e1; border-top: 1px solid #e1e1e1;}span.echo-item-metadata-userID { background: url("//c0.echoenabled.com/images/curation/metadata/user.png") no-repeat left center; }.echo-item-modeSwitch { float: right; width: 16px; height: 16px; background:url("//c0.echoenabled.com/images/curation/metadata/flip.png") no-repeat 0px 3px; }.echo-item-childrenMarker { border-color: transparent transparent #ECEFF5; border-width: 0px 11px 11px; border-style: solid; margin: 3px 0px 0px 77px; height: 1px; width: 0px; display: none; }.echo-item-container-root-thread .echo-item-childrenMarker { display: block; }.echo-item-avatar { width: 48px; height: 48px; }.echo-item-children .echo-item-avatar { width: 24px; height: 24px; }.echo-item-authorName { float: left; font-size: 15px; font-family: Arial, sans-serif; font-weight: bold; }.echo-item-re { font-weight: bold; }.echo-item-re a:link, .echo-item-re a:visited, .echo-item-re a:active { text-decoration: none; }.echo-item-re a:hover { text-decoration: underline; }.echo-item-body { padding-top: 4px; }.echo-item-controls { float: left; margin-left: 3px; }.echo-item-sourceIcon { float: left; height: 16px; width: 16px; margin-right: 5px; border: 0px; }.echo-item-date, .echo-item-from, .echo-item-via { float: left; }.echo-item-from a, .echo-item-via a { text-decoration: none; color: #C6C6C6; }.echo-item-from a:hover, .echo-item-via a:hover { color: #476CB8; }.echo-item-tag { display: inline-block; height: 16px; background: url("//c0.echoenabled.com/images/tag_blue.png") no-repeat; padding-left: 18px; }.echo-item-blocker-backdrop { position: absolute; left: 0px; top: 0px; background: #FFFFFF; opacity: 0.7; z-index: 100; }.echo-item-blocker-message { position: absolute; z-index: 200; width: 200px; height: 20px; line-height: 20px; text-align: center; background-color: #FFFF99; border: 1px solid #C6C677; opacity: 0.7; -moz-border-radius: 0.5em 0.5em 0.5em 0.5em; }',"item");
var B=[];
for(var D=0;
D<=this.config.get("childrenMaxDepth");
D++){B.push(".echo-item-depth-"+D+" { margin-left: "+(D?68+(D-1)*44:0)+"px; }")
}A.addCss(B.join("\n"),"item-depths-"+this.config.get("childrenMaxDepth"));
if(A.browser.msie){A.addCss(".echo-item-childrenMarker { font-size: 1px; line-height: 1px; filter: chroma(color=black); }.echo-item-blocker-backdrop, .echo-item-blocker-message { filter:Alpha(Opacity=70); }.echo-stream-container { zoom: 1; }.echo-item-content { zoom: 1; }.echo-item-container { zoom: 1; }.echo-item-subwrapper { zoom: 1; }.echo-item-avatar-wrapper { position: static; }.echo-stream-state-picture { vertical-align: middle; }","stream-ie")
}}
})(jQuery);
(function(A){Echo.Localization.extend({createdBy:"Created by",loading:"Loading...",markers:"Markers:",markersHint:"Marker1, marker2, marker3, ...",on:"on",post:"Post",posting:"Posting...",postingFailed:'There was a server error while trying to submit your item. Please try again in a few minutes. <b>Error: "{error}"</b>.',postingTimeout:"There was a network issue while trying to submit your item. Please try again in a few minutes.",tagsHint:"Tag1, tag2, tag3, ...",tags:"Tags:",update:"Update",updating:"Updating...",yourName:"Your Name (required)",yourWebsiteOptional:"Your website (optional)"},"Submit");
Echo.Submit=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={};
this.initConfig(C,{targetURL:document.location.href,submissionProxyURL:window.location.protocol+"//apps.echoenabled.com/v2/esp/activity",markers:[],source:{},tags:[],mode:"standard",data:{},inReplyTo:{},actionString:"Type your comment here...",postingTimeout:30});
this.initialMode=this.config.get("mode");
this.initApplication(function(){B.contextId=B.config.get("contextId",B.newContextId());
B.addCss();
B.config.get("target").empty().append(B.render());
B.listenEvents();
B.publish("Submit.onRender",B.prepareBroadcastParams())
})
};
Echo.Submit.prototype=new Echo.Application();
Echo.Submit.prototype.namespace="Submit";
Echo.Submit.prototype.cssPrefix="echo-submit-";
Echo.Submit.prototype.template=function(){return this.templates[this.config.get("mode")]
};
Echo.Submit.prototype.templates={};
Echo.Submit.prototype.templates.standard='<div class="echo-submit-container"><div class="echo-submit-header"></div><div class="echo-submit-body"><div class="echo-submit-content echo-submit-border"><textarea class="echo-submit-text echo-submit-text-area echo-primaryFont echo-primaryColor"></textarea></div><div class="echo-submit-markersContainer echo-submit-metadata-container echo-primaryFont echo-primaryColor"><div class="echo-submit-metadata-label">{Label:markers}</div><div class="echo-submit-metadata-wrapper"><div class="echo-submit-metadata-subwrapper echo-submit-border "><input class="echo-submit-markers echo-primaryFont"></div></div><div class="echo-clear"></div></div><div class="echo-submit-tagsContainer echo-submit-metadata-container echo-primaryFont echo-primaryColor"><div class="echo-submit-metadata-label">{Label:tags}</div><div class="echo-submit-metadata-wrapper"><div class="echo-submit-metadata-subwrapper echo-submit-border "><input class="echo-submit-tags echo-submit-border echo-primaryFont"></div></div><div class="echo-clear"></div></div></div><div class="echo-submit-controls"><div class="echo-submit-post-container echo-ui"><button type="button" class="echo-submit-postButton echo-primaryFont"></button></div><div class="echo-clear"></div></div></div>';
Echo.Submit.prototype.templates.edit=Echo.Submit.prototype.templates.standard;
Echo.Submit.prototype.templates.compact='<div class="echo-submit-container"><div class="echo-submit-content echo-submit-border"><input class="echo-submit-text echo-submit-text-input echo-primaryFont echo-primaryColor"></div></div>';
Echo.Submit.prototype.renderers={};
Echo.Submit.prototype.renderers.container=function(B){if(this.initialMode=="compact"){B.click(function(C){C.stopPropagation()
})
}};
Echo.Submit.prototype.renderers.tagsContainer=Echo.Submit.prototype.renderers.markersContainer=function(B,C){if(this.user.isAdmin()){B.show()
}else{B.hide()
}};
Echo.Submit.prototype.renderers.metaFields=function(C,F,B){var D=B.type;
var E=this.config.get("data.object."+D,this.config.get(D,[]));
F.get(D).iHint({text:this.label(D+"Hint"),className:"echo-secondaryColor"}).val(A.trim(A.stripTags(E.join(", ")))).blur()
};
Echo.Submit.prototype.renderers.markers=function(B,C){this.render("metaFields",B,C,{type:"markers"})
};
Echo.Submit.prototype.renderers.tags=function(B,C){this.render("metaFields",B,C,{type:"tags"})
};
Echo.Submit.prototype.renderers.editModeUserInfo=function(C,G){var E='<div class="echo-submit-userInfoWrapper echo-primaryFont echo-primaryFont echo-primaryColor">{Label:createdBy} <span class="echo-submit-author">{Data:author}</span> {Label:on} {Data:date}</div>';
var D={};
var F=this.config.get("data.object.published");
var B=new Date(A.timestampFromW3CDTF(F)*1000);
return A.toDOM(this.substitute(E,{date:B.toLocaleDateString()+", "+B.toLocaleTimeString(),author:this.config.get("data.actor.title",this.label("guest"))}),this.cssPrefix,{}).content
};
Echo.Submit.prototype.renderers.anonymousModeUserInfo=function(C,G){var B=this;
var F="echo-submit-anonymousUserInfo";
var E='<div class="echo-submit-userInfoWrapper"><div class="{Data:prefix}Avatar"></div><div class="{Data:prefix}Fields"><div class="{Data:prefix}FieldsWrapper"><div class="{Data:prefix}NameContainer echo-submit-border"><input class="{Data:prefix}Name echo-primaryFont echo-primaryColor"></div><div class="{Data:prefix}UrlContainer echo-submit-border"><input class="{Data:prefix}Url echo-primaryFont echo-primaryColor"></div></div></div><div class="echo-clear"></div></div>';
var D={Avatar:function(I){var H=B.user.get("avatar",B.user.get("defaultAvatar"));
I.append('<img src="'+H+'">')
},Name:function(H){G.set("anonymousUserInfoName",H);
H.val(B.user.get("name","")).iHint({text:B.label("yourName"),className:"echo-secondaryColor"})
},Url:function(H){G.set("anonymousUserInfoUrl",H);
H.val(B.user.get("domain","")).iHint({text:B.label("yourWebsiteOptional"),className:"echo-secondaryColor"})
}};
var E=this.substitute(E,{prefix:F});
return A.toDOM(E,F,D).content
};
Echo.Submit.prototype.renderers.header=function(B,D){var C=this.config.get("mode")=="edit"?"edit":"anonymous";
return this.render(C+"ModeUserInfo",B,D)
};
Echo.Submit.prototype.renderers.text=function(C){var B=this,D=this.config.get("data.object.content");
if(D){C.val(D)
}C.iHint({text:B.config.get("actionString"),className:"echo-secondaryColor"});
if(this.config.get("mode")=="compact"){C.focus(function(){B.config.set("mode","standard");
B.rerender();
setTimeout(function(){B.dom.get("text").focus()
},0);
B.publish("Submit.onExpand",B.prepareBroadcastParams())
})
}};
Echo.Submit.prototype.renderers.postButton=function(E){var C=this,F=this.config.get("mode")=="edit";
var D=new Echo.UI.Button(E,{normal:{icons:false,disabled:false,label:C.label(F?"update":"post")},posting:{icons:{primary:"ui-icon-waiting"},disabled:true,label:C.label(F?"updating":"posting")}});
C.posting=C.posting||{};
C.posting.subscriptions=C.posting.subscriptions||[];
var B=function(G,I,H){A.each(["Post","Edit"],function(L,J){var K="Submit.on"+J+G;
var M=C.posting.subscriptions;
if(M[K]){C.unsubscribe(K,M[K])
}M[K]=C.subscribe(K,function(N,O){if(C.config.get("target").get(0)!=O.target){return 
}D.setState(I);
if(H){H()
}})
})
};
B("Init","posting");
B("Complete","normal",function(){C.dom.get("text").val("").trigger("blur");
C.rerender(["tagsContainer","markersContainer"])
});
B("Error","normal");
this.posting.action=this.posting.action||function(){var G=false;
A.each(["anonymousUserInfoName","text"],function(I,H){G=C.highlightMandatory(C.dom.get(H));
return !G
});
if(G){return 
}C.post()
};
E.unbind("click",this.posting.action).bind("click",this.posting.action)
};
Echo.Submit.prototype.post=function(){var K=this,F=this.config.get("mode")=="edit";
var D=function(L){return K.dom.get(L)
};
var C=function(L,M){var N=F?"Edit":"Post";
K.publish("Submit.on"+N+L,K.prepareBroadcastParams({postData:M}))
};
var E;
if(F){E=[].concat(K.getContentUpdate(D("text").val()),K.getMetaDataUpdates("tag","tags",D("tags").val()),K.getMetaDataUpdates("mark","markers",D("markers").val()));
if(!E.length){C("Complete",[]);
return 
}}else{E={avatar:K.user.get("avatar",""),content:D("text").val(),markers:A.trim(D("markers").val()),name:K.user.get("name",(K.user.logged()?"":D("anonymousUserInfoName").val())),source:K.config.get("source"),tags:A.trim(D("tags").val()),target:K.config.get("targetURL"),url:K.user.get("domain",(K.user.logged()?"":D("anonymousUserInfoUrl").val())),verb:"post"}
}var B;
var J=false;
var I=function(N){if(B){clearTimeout(B)
}if(N.result=="error"){if(J){return 
}var L=J=(N.errorCode=="timeout");
var M=L?K.label("postingTimeout"):K.label("postingFailed",{error:N.errorMessage||N.errorCode});
A.fancybox({content:'<div class="echo-submit-error">'+M+"</div>",height:70,width:L?320:390,padding:15,orig:D("text"),autoDimensions:false,transitionIn:"elastic",transitionOut:"elastic",onComplete:function(){if(A.browser.msie&&document.compatMode!="CSS1Compat"){var O=arguments[2];
var P=2*O.padding+40;
A("#fancybox-wrap").css({width:O.width+P,height:O.height+P})
}}});
C("Error",N)
}else{C("Complete",E)
}};
C("Init",E);
var H={appkey:K.config.get("appkey"),content:A.object2JSON(E),sessionID:K.user.get("sessionID","")};
A.ajax({type:"GET",url:K.config.get("submissionProxyURL"),data:H,success:I,error:function(){I({result:"error",errorCode:"internal_error"})
},dataType:"jsonp"});
var G=this.config.get("postingTimeout");
if(G){B=setTimeout(function(){I({result:"error",errorCode:"timeout"})
},G*1000)
}};
Echo.Submit.prototype.highlightMandatory=function(B){if(B&&!A.trim(B.val())){B.parent().addClass("echo-submit-mandatory");
B.focus(function(){A(this).parent().removeClass("echo-submit-mandatory")
});
return true
}return false
};
Echo.Submit.prototype.prepareBroadcastParams=function(B){B=B||{};
B.data=this.config.get("data");
B.target=this.config.get("target").get(0);
B.targetURL=this.config.get("targetURL");
B.inReplyTo=this.config.get("inReplyTo");
return B
};
Echo.Submit.prototype.getContentUpdate=function(B){if(this.config.get("data.object.content","")==B){return[]
}return[{verb:"update",field:"content",value:B,target:this.config.get("data.object.id")}]
};
Echo.Submit.prototype.getMetaDataUpdates=function(I,D,F){var C=this;
var E=function(J){return A.map(J||[],function(K){return A.trim(K)
})
};
var B={modified:E(F.split(",")),current:E(this.config.get("data.object."+D,""))};
var H=[];
var G=function(K,J,L){A.map(K,function(M){if(M&&A.inArray(M,J)==-1){var N={verb:L,target:C.config.get("data.object.id")};
N[D]=M;
H.push(N)
}})
};
G(B.current,B.modified,"un"+I);
G(B.modified,B.current,I);
return H
};
Echo.Submit.prototype.switchMode=function(C){if(!C){C=(this.config.get("mode")=="standard"?"compact":"standard")
}if(this.config.get("mode")!=C){this.config.set("mode",C);
this.rerender();
var B="Submit.on"+(C=="compact"?"Collapse":"Expand");
this.publish(B,this.prepareBroadcastParams())
}};
Echo.Submit.prototype.refresh=function(){this.rerender(["container","header","markersContainer","tagsContainer","postButton"]);
this.publish("Submit.onRerender",this.prepareBroadcastParams())
};
Echo.Submit.prototype.listenEvents=function(){var B=this;
this.subscribe("internal.User.onInvalidate",function(){B.refresh()
});
if(this.initialMode=="compact"){Echo.Broadcast.subscribe("document.onclick",function(){if(B.dom&&B.dom.get("text").val()){return 
}B.switchMode("compact")
});
if(!Echo.Vars.onClickRegistered){A(document).click(function(){Echo.Broadcast.publish("document.onclick")
});
Echo.Vars.onClickRegistered=true
}}};
Echo.Submit.prototype.addCss=function(){A.addCss(".echo-submit-header { margin-bottom: 3px; }.echo-submit-anonymousUserInfoAvatar { float: left; margin-right: -48px; }.echo-submit-anonymousUserInfoAvatar img { width: 48px; height: 48px; }.echo-submit-anonymousUserInfoFields { width: 100%; float: left; }.echo-submit-anonymousUserInfoFields input { width: 100%; }.echo-submit-anonymousUserInfoFieldsWrapper { margin-left: 53px; }.echo-submit-anonymousUserInfoNameContainer { margin: 1px 0px 4px 0px; padding: 0px 2px 1px 3px; background-color: #fff; }.echo-submit-anonymousUserInfoName { font-size: 14px; font-weight: bold; border: none; }.echo-submit-anonymousUserInfoUrlContainer { padding: 0px 2px 1px 3px; background-color: #fff; }.echo-submit-anonymousUserInfoUrl { height: 19px; border: none; }.echo-submit-author { font-weight: bold; }.echo-submit-content { padding: 5px 5px 5px 6px; background-color: #fff; }.echo-submit-text-area { width: 100%; height: 102px; padding: 0px; margin: 0px; border: none; resize:none ; }.echo-submit-text-input { width: 100%; border: none; }.echo-submit-metadata-container { margin-top: 6px; }.echo-submit-metadata-label { float: left; width: 50px; margin-right: -50px; text-align: right; line-height: 22px; }.echo-submit-metadata-wrapper { float: left; width: 100%; }.echo-submit-metadata-subwrapper { margin-left: 55px; padding: 2px 2px 2px 3px; background-color: #fff; }.echo-submit-metadata-subwrapper input { width: 100%; border: none; }.echo-submit-controls { margin-top: 5px; }.echo-submit-post-container { float: right; }.echo-submit-border { border: 1px solid #d2d2d2; }.echo-submit-mandatory { border: 1px solid red; }.echo-submit-queries-view-option { padding-right: 5px; }.echo-submit-error { color: #444444; font: 14px Arial; line-height: 150%; padding-left: 85px; background: no-repeat url(http://c0.echoenabled.com/images/info70.png); height: 70px; }","submit");
if(A.browser.msie){A.addCss(".echo-submit-container { zoom: 1; }.echo-submit-body { zoom: 1; }.echo-submit-header { zoom: 1; }.echo-submit-content { zoom: 1; }.echo-submit-markersContainer { zoom: 1; }.echo-submit-tagsContainer { zoom: 1; }","submit-ie")
}if(A.browser.webkit){A.addCss(".echo-submit-container input, .echo-submit-container textarea { background-position: 0px; }.echo-submit-text-area { outline: none; }.echo-submit-anonymousUserInfoName { outline: none; }.echo-submit-anonymousUserInfoUrl { outline: none; }.echo-submit-metadata-subwrapper input { outline: none; }","submit-webkit")
}}
})(jQuery);
(function(A){Echo.Localization.extend({you:"You"},"UserListItem");
Echo.UserListItem=function(B){this.vars={};
this.init(B);
this.addCss()
};
Echo.UserListItem.prototype=new Echo.Object();
Echo.UserListItem.prototype.namespace="UserListItem";
Echo.UserListItem.prototype.cssPrefix="echo-user-list-item-";
Echo.UserListItem.prototype.renderers={};
Echo.UserListItem.prototype.template='<span class="echo-user-list-item-container"><img class="echo-user-list-item-avatar"><span class="echo-user-list-item-title">{Data:title}</span></span>';
Echo.UserListItem.prototype.renderers.avatar=function(D,E){var B=this;
var C=this.data.avatar||this.user.get("defaultAvatar");
if(this.config.get("userLabel.avatar")){D.attr("src",C).bind({error:function(){A(this).attr("src",B.user.get("defaultAvatar"))
}});
if(!this.config.get("userLabel.text")){D.attr("title",this.data.title)
}}else{E.remove(D)
}};
Echo.UserListItem.prototype.renderers.title=function(B,C){if(this.config.get("userLabel.text")){return this.isYou()?this.label("you"):this.data.title
}else{C.remove(B)
}};
Echo.UserListItem.prototype.isYou=function(){return this.data.id&&this.data.id==this.user.get("id")
};
Echo.UserListItem.prototype.addCss=function(){A.addCss(".echo-user-list-item-avatar { width: 16px; height: 16px; margin: 0px 3px 0px 0px; vertical-align: text-top; }.echo-user-list-only-avatars .echo-user-list-item-avatar { margin: 0px 2px; }.echo-user-list-item-container, .echo-user-list-item-container span { white-space: nowrap; }.echo-user-list-only-avatars .echo-user-list-item-container { white-space: normal; }","user-list-item")
};
Echo.Localization.extend({and:"and",more:"more"},"UserList");
Echo.UserList=function(C){if(!C||!C.target){return 
}var B=this;
this.vars={};
this.initVars();
this.initConfig(C,{checkViewTimeout:2,initialUsersCount:undefined,totalUsersCount:undefined,query:"",suffixText:"",userLabel:{avatar:true,text:true}});
this.messageLayout="compact";
this.initApplication(function(){B.addCss();
B.config.get("target").empty().append(B.render());
if(B.config.get("query")){B.showMessage({type:"loading"},B.dom.get("container"));
B.initLiveUpdates(function(){return{endpoint:"search",query:{q:B.config.get("query"),since:B.nextSince||0}}
},function(E){B.handleLiveUpdatesResponse(E)
});
B.request()
}else{if(B.config.get("data")){var D=B.config.get("data");
D.itemsPerPage=D.itemsPerPage||2;
B.config.set("liveUpdates",false);
B.handleInitialResponse(D)
}}})
};
Echo.UserList.prototype=new Echo.Application();
Echo.UserList.prototype.namespace="UserList";
Echo.UserList.prototype.cssPrefix="echo-user-list-";
Echo.UserList.prototype.template='<span class="echo-user-list-container"><span class="echo-user-list-actors"></span><span class="echo-user-list-more"></span><span class="echo-user-list-suffixText"></span></span>';
Echo.UserList.prototype.renderers={};
Echo.UserList.prototype.renderers.more=function(E){var D=this;
if(!this.isMoreButtonVisible()){E.hide();
return 
}E.empty().show();
var F=this.count.total-this.count.visible;
var C=(F>0?F+" ":"")+this.label("more");
var B=!this.fromExternalData()||this.count.visible<this.users.length;
if(B){E.addClass("echo-linkColor").append(this.hyperlink({caption:C}))
}else{E.removeClass("echo-linkColor").append(C)
}this.moreRequestInProgress=false;
if(B){E.one("click",function(){D.getMoreUsers()
})
}};
Echo.UserList.prototype.renderers.actors=function(D){var C=this;
if(!this.users.length){return 
}var I=[];
var F=this.config.get("userLabel");
if(!this.users.length||!F.avatar&&!F.text){return 
}var H=(F.avatar&&!F.text?"addClass":"removeClass");
D[H]("echo-user-list-only-avatars");
var E=function(L,K){var J=K?' class="echo-user-list-'+K+'"':"";
return"<span"+J+">"+L+"</span>"
};
A.map(this.users.slice(0,this.count.visible),function(J){I.push(J.instance.render())
});
var B=this.config.get("userLabel.text")?", ":"";
var G;
if(!this.isMoreButtonVisible()){G=I.pop()
}if(I.length){I=B?A.intersperse(I,E(B,"delimiter")):I;
I.push(E("&nbsp;"+this.label("and")+" ","and"))
}if(!this.isMoreButtonVisible()){I.push(G)
}A.map(I,function(J){D.append(J)
})
};
Echo.UserList.prototype.renderers.suffixText=function(){return this.config.get("suffixText","")
};
Echo.UserList.prototype.initVars=function(){this.users=[];
this.uniqueUsers={};
this.isViewComplete=false;
delete this.nextPageAfter;
this.count={total:0,visible:0};
this.cleanupErrorHandlers()
};
Echo.UserList.prototype.isMoreButtonVisible=function(){return !this.fromExternalData()&&!this.isViewComplete||this.count.visible<this.count.total
};
Echo.UserList.prototype.fromExternalData=function(){return !this.config.get("query")&&!!this.config.get("data")
};
Echo.UserList.prototype.getMoreUsers=function(){if(this.fromExternalData()){this.count.visible+=this.config.get("itemsPerPage");
if(this.count.visible>this.users.length){this.count.visible=this.users.length
}this.rerender()
}else{if(!this.moreRequestInProgress){this.showMessage({type:"loading"},this.dom.get("more"));
this.moreRequestInProgress=true
}this.request()
}};
Echo.UserList.prototype.request=function(){var B=this;
var C=this.config.get("query");
if(typeof this.nextPageAfter!="undefined"){C='pageAfter:"'+this.nextPageAfter+'" '+C
}this.sendAPIRequest({endpoint:"search",query:{q:C}},function(D){B.changeLiveUpdatesTimeout(D.liveUpdatesTimeout);
B.handleInitialResponse(D)
})
};
Echo.UserList.prototype.handleInitialResponse=function(B){if(B.result=="error"){this.handleErrorResponse(B);
return 
}this.cleanupErrorHandlers(true);
if(B.itemsPerPage&&B.itemsPerPage!=this.config.get("itemsPerPage")){this.config.set("itemsPerPage",+B.itemsPerPage)
}if(this.fromExternalData()){this.count.total=this.config.get("totalUsersCount",0)
}this.nextSince=B.nextSince||0;
this.nextPageAfter=B.nextPageAfter||0;
if(!B.entries.length){if(!this.isViewComplete){this.isViewComplete=true;
this.rerender()
}this.startLiveUpdates();
return 
}if(!this.count.visible){if(this.fromExternalData()){this.count.visible=this.config.get("initialUsersCount",this.config.get("itemsPerPage"))
}else{this.count.visible=this.config.get("itemsPerPage")
}}this.processResponse(B)
};
Echo.UserList.prototype.handleLiveUpdatesResponse=function(C){var B=this;
if(C.result=="error"){this.startLiveUpdates();
return 
}this.nextSince=C.nextSince||0;
if(!C.entries.length){this.startLiveUpdates();
return 
}this.processResponse(C,true)
};
Echo.UserList.prototype.processResponse=function(F,E){var C=this;
var D=new Echo.Config(this.config.getAsHash());
var B=false;
var G=false;
A.each(F.entries,function(K,M){var L=(M.verbs&&M.verbs[0]=="http://activitystrea.ms/schema/1.0/delete");
var I=C.uniqueUsers[M.actor.id];
if(L&&!I){return 
}if(L){if(!--I.itemsCount){var J;
A.each(C.users,function(O,N){if(N.instance.data.id==M.actor.id){J=O;
return false
}});
C.users.splice(J,1);
delete C.uniqueUsers[M.actor.id];
G=true
}}else{if(I){I.itemsCount++
}else{var H=new Echo.UserListItem({data:M.actor,user:C.user,config:D});
I={itemsCount:1,instance:H};
C.users[H.isYou()?"unshift":"push"](I);
C.uniqueUsers[M.actor.id]=I;
B=true
}}});
if(this.fromExternalData()){this.count.total=Math.max(this.users.length,this.count.total)
}else{this.count.total=this.count.visible=this.users.length
}this.count.visible=Math.min(this.count.visible,this.users.length);
if(!this.count.total){this.isViewComplete=false
}if(B||G){this.rerender()
}if(E||B){this.startLiveUpdates()
}else{this.getMoreUsers()
}};
Echo.UserList.prototype.refresh=function(){this.stopLiveUpdates();
this.initVars();
this.rerender();
if(this.config.get("query")){this.request()
}else{if(this.config.get("data")){this.handleInitialResponse(this.config.get("data"))
}}};
Echo.UserList.prototype.getVisibleUsersCount=function(){return this.count.visible
};
Echo.UserList.prototype.addCss=function(){A.addCss(".echo-user-list-container { line-height: 20px; vertical-align: middle; }.echo-user-list-more { white-space: nowrap; }.echo-user-list-more .echo-application-message-icon { display: inline; margin: 0px 5px; }","user-list")
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"CommunityFlag",applications:["Stream"],dependencies:[{application:"UserList",url:"//cdn.echoenabled.com/clientapps/v2/user-list.js"}],init:function(D,C){if(typeof D.config.get(C,"showUserList")=="undefined"){D.config.set(C,"showUserList",true)
}D.extendRenderer("Item","flags",D.renderers.Item.users);
D.extendTemplate("Item",D.template,"insertAsLastChild","echo-item-data");
D.addItemControl(C,D.assembleControl("Flag",C));
D.addItemControl(C,D.assembleControl("Unflag",C));
D.addCss(D.css)
}});
A.template='<div class="echo-item-flags"></div>';
A.addLabels({flaggedThis:" flagged this.",flagControl:"Flag",unflagControl:"Unflag",flagProcessing:"Flagging...",unflagProcessing:"Unflagging..."});
A.assembleControl=function(D,C){var E=function(){var F=this;
F.controls[A.name+"."+D].element.empty().append(A.label(D.toLowerCase()+"Processing"));
B.get(A.config.get(C,"submissionProxyURL","",true),{appkey:C.config.get("appkey"),content:B.object2JSON({verb:D.toLowerCase(),target:F.id}),sessionID:F.user.get("sessionID","")},function(){var G=A.topic(C,"on"+D+"Complete");
A.publish(C,G,C.prepareBroadcastParams({item:{data:F.data,target:F.dom.content}}));
C.startLiveUpdates(true)
},"jsonp")
};
return function(){var G=this;
var F=G.data.object.flags.length;
var H=(B.map(G.data.object.flags,function(I){if(G.user.hasIdentity(I.actor.id)){return I
}})).length>0?"Unflag":"Flag";
return{name:D,label:'<span class="echo-clickable">'+A.label(D.toLowerCase()+"Control")+"</span>"+(G.user.isAdmin()&&F?" ("+F+")":""),visible:G.user.logged()&&H==D,onetime:true,callback:E}
}
};
A.renderers={Item:{}};
A.renderers.Item.users=function(E,H){var F=this;
if(!F.data.object.flags.length||!F.user.isAdmin()||!A.config.get(F,"showUserList")){E.hide();
return 
}var G=5;
var C=A.get(F,"userList")?A.get(F,"userList").getVisibleUsersCount():G;
var D=A.assembleConfig(F,{target:E.get(0),data:{itemsPerPage:G,entries:F.data.object.flags},initialUsersCount:C,suffixText:A.label("flaggedThis")});
A.set(F,"userList",new Echo.UserList(D));
E.show()
};
A.css=".echo-item-flags { background: url(//c0.echoenabled.com/images/curation/status/communityflagged.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }"
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"Curation",applications:["Stream"],dependencies:[{application:"QueryPalette",url:"//cdn.echoenabled.com/clientapps/v2/curation.js"}],init:function(D,C){D.set(C,"queue",[]);
D.addCss(D.assembleCss());
D.extendRenderer("Item","status",D.renderers.Item.status);
D.extendRenderer("Item","statusIcon",D.renderers.Item.statusIcon);
D.extendRenderer("Item","statusCheckbox",D.renderers.Item.statusCheckbox);
D.extendTemplate("Item",D.statusItemTemplate,"insertAfter","echo-item-avatar");
D.extendRenderer("Stream","curate",D.renderers.Stream.curate);
D.extendTemplate("Stream",D.curateStreamTemplate,"insertAsFirstChild","echo-stream-header");
D.listenEvents(C);
D.addItemControl(C,D.assembleControl("Approve",C));
D.addItemControl(C,D.assembleControl("Spam",C));
D.addItemControl(C,D.assembleControl("Delete",C))
}});
A.statusItemTemplate='<div class="echo-item-status"><input type="checkbox" class="echo-item-statusCheckbox"><div class="echo-item-statusIcon"></div><div class="echo-clear"></div></div>';
A.curateStreamTemplate='<div class="echo-stream-curate echo-linkColor"></div>',A.addLabels({approveControl:"Approve",deleteControl:"Delete",spamControl:"Spam",changingStatusToCommunityFlagged:"Flagging...",changingStatusToModeratorApproved:"Approving...",changingStatusToModeratorDeleted:"Deleting...",changingStatusToModeratorFlagged:"Marking as spam...",queries:"Queries",actions:"Actions",curate:"Curate",curation:"Curation",statusCommunityFlagged:"Flagged by Community",statusModeratorApproved:"Approved by Moderator",statusModeratorDeleted:"Deleted by Moderator",statusModeratorFlagged:"Flagged by Moderator",statusSystemFlagged:"Flagged by System",statusUntouched:"New"});
A.statuses=["Untouched","ModeratorApproved","ModeratorDeleted","CommunityFlagged","ModeratorFlagged","SystemFlagged"];
A.control2status={Spam:"ModeratorFlagged",Delete:"ModeratorDeleted",Approve:"ModeratorApproved"};
A.renderers={Item:{},Stream:{}};
A.renderers.Item.status=function(D){var E=this;
if(!E.user.isAdmin()){D.hide();
return 
}if(E.depth){D.addClass("echo-item-status-child")
}var C=E.data.object.status||"Untouched";
D.addClass("echo-item-status-"+C)
};
A.renderers.Item.statusIcon=function(D){var E=this;
if(!E.user.isAdmin()){return 
}var C=E.data.object.status||"Untouched";
var F=A.label("status"+C);
D.addClass("echo-item-status-icon-"+C).attr("title",F)
};
A.renderers.Item.statusCheckbox=function(C){var D=this;
if(!D.user.isAdmin()){return 
}C.click(function(){A.set(D,"selected",!A.get(D,"selected"));
D.publish(A.topic("internal.Item","onSelect"),{item:D})
}).attr("checked",A.get(D,"selected"))
};
A.renderers.Stream.curate=function(C,E){var D=this;
if(!D.user.isAdmin()||!Echo.QueryPalette){C.hide();
return 
}C.empty().append('<span class="echo-stream-curate-label">'+A.label("curate")+"</span>").show().click(function(){A.assembleDialog(D);
A.get(D,"dialog").open()
})
};
A.extractURI=function(C){var D=C.match(/(?:url|scope|childrenof):(\S+)(?: |$)/);
return D?D[1]:window.location.protocol+"//"+window.location.host+"/*"
};
A.assembleDialog=function(E){if(A.get(E,"dialog")){return 
}var D=function(H){var G=A.assembleConfig(E,{target:H,query:{path:A.extractURI(E.config.get("query")),states:["Untouched","SystemFlagged","CommunityFlagged","ModeratorFlagged"],itemsPerPage:E.config.get("itemsPerPage"),sortOrder:E.config.get("sortOrder")}});
A.set(E,"palette",new Echo.QueryPalette(G));
A.subscribe(E,"QueryPalette.onApply",function(I,J){E.config.set("query",J.query);
E.refresh()
})
};
var C=function(H){var G=A.assembleConfig(E,{target:H,data:{items:A.get(E,"queue")}});
A.set(E,"bulk",new Echo.BulkActions(G))
};
var F=function(G){A.set(E,"tabs",new Echo.UI.Tabs({target:B(G),content:B(G),addUIClass:false,idPrefix:"curation-tabs-",tabs:[{id:"queries",label:A.label("queries"),icon:true,content:D},{id:"actions",label:A.label("actions"),icon:true,content:C}]}))
};
A.set(E,"dialog",new Echo.UI.Dialog({content:F,hasTabs:true,config:{autoOpen:false,open:function(){A.get(E,"palette").refresh()
},title:A.label("curation"),width:500,height:550,minWidth:450,minHeight:415,maxHeight:600}}))
};
A.listenEvents=function(C){A.subscribe(C,C.namespace+".onRerender",function(){C.rerender("curate")
});
A.subscribe(C,A.topic("internal.Item","onSelect"),function(F,H){var E=H.item;
if(A.get(E,"selected")){A.get(C,"queue").push(E);
A.assembleDialog(C);
A.get(C,"dialog").open();
A.get(C,"tabs").select("actions")
}else{var D=A.get(C,"queue");
A.set(C,"queue",B.foldl([],D,function(I,J){if(I.data.unique!=E.data.unique){J.push(I)
}}))
}if(A.get(C,"bulk")){A.get(C,"bulk").refresh(A.get(C,"queue"))
}var G=A.get(E,"selected")?"Select":"Unselect";
A.publish(C,A.topic(C.namespace+".Item","on"+G),C.prepareBroadcastParams({item:{data:E.data,target:E.dom.content}}))
});
A.subscribe(C,"BulkActions.onStatusChange",function(E,F){var D=[];
B.each(A.get(C,"queue"),function(H,I){I.block(A.label("changingStatusTo"+F.state));
A.set(I,"selected",false);
D.push(I)
});
A.set(C,"queue",[]);
if(A.get(C,"bulk")){A.get(C,"bulk").refresh([])
}if(!D.length){return 
}var G=B.map(D,function(H){return{verb:"update",target:H.id,author:H.data.actor.id,field:"state",value:F.state}
});
B.sendPostRequest(A.config.get(C,"submissionProxyURL","",true),{appkey:C.config.get("appkey"),content:B.object2JSON(G),sessionID:C.user.get("sessionID","")},function(){C.startLiveUpdates(true)
})
})
};
A.changeItemStatus=function(D,C){A.set(D,"selected",false);
D.data.object.status=C;
D.rerender("controls");
D.rerender("status",true)
};
A.assembleControl=function(D,C){var E=function(){var G=this;
var F=A.control2status[D];
G.block(A.label("changingStatusTo"+F));
B.get(A.config.get(C,"submissionProxyURL","",true),{appkey:C.config.get("appkey"),content:B.object2JSON({verb:"update",target:G.id,author:G.data.actor.id,field:"state",value:F}),sessionID:G.user.get("sessionID","")},function(H){if(H.result=="error"){G.unblock()
}else{A.changeItemStatus(G,F);
C.startLiveUpdates(true)
}},"jsonp")
};
return function(){var F=this;
return{name:D,label:A.label(D.toLowerCase()+"Control"),visible:F.user.isAdmin()&&F.data.object.status!=A.control2status[D],callback:E}
}
};
A.assembleCss=function(){var C="";
if(B.browser.msie){C=".echo-item-status { zoom: 1; }.echo-item-statusCheckbox { margin: 1px; }"
}return'.echo-item-status { width: 48px; height: 24px; }.echo-item-status-child { width: 24px; height: 48px; }.echo-item-statusCheckbox { float: left; margin: 4px; }.echo-item-status-child .echo-item-statusCheckbox { display: block; }.echo-item-statusIcon { float: right; margin: 4px; width: 16px; height: 16px; }.echo-item-status-Untouched { background: #00aaff; }.echo-item-status-ModeratorApproved { background: #bdfb6d; }.echo-item-status-ModeratorDeleted { background: #f20202; }.echo-item-status-SystemFlagged, .echo-item-status-CommunityFlagged, .echo-item-status-ModeratorFlagged { background: #ff9e00; }.echo-stream-curate { float: right; margin-left: 15px; cursor: pointer; font-family: Arial; font-size: 11px; }.echo-curation-tabs-queries span { background: no-repeat center left url("//c0.echoenabled.com/images/curation/tabs/queries.png"); }.echo-curation-tabs-actions span { background: no-repeat center left url("//c0.echoenabled.com/images/curation/tabs/actions.png"); }'+B.map(A.statuses,function(D){return".echo-item-status-icon-"+D+'{ background: url("//c0.echoenabled.com/images/curation/status/'+D.toLowerCase()+'.png") no-repeat; }'
}).join("")+C
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"Edit",applications:["Stream","Submit"],dependencies:[{application:"Submit",url:"//cdn.echoenabled.com/clientapps/v2/submit.js"}],init:function(E,C){if(C instanceof Echo.Stream){var D=E.config.get(C,"layout");
if(!D||!/^(?:popup|inline)$/.test(D)){E.config.set(C,"layout","popup")
}E.addCss(E.css);
E.listenEvents(C);
E.addItemControl(C,E.assembleControl(C))
}else{if(C instanceof Echo.Submit){E.extendTemplate("Submit",E.template,"insertAfter","echo-submit-post-container");
E.extendRenderer("Submit","cancelButton",function(G){var F=this;
G.click(function(){F.publish("Submit.onEditError",F.prepareBroadcastParams())
})
})
}}}});
A.template='<div class="echo-submit-cancelButton-container"><a href="javascript:void(0);" class="echo-submit-cancelButton echo-primaryFont echo-clickable echo-linkColor">'+A.label("cancel")+"</a></div>";
A.addLabels({edit:"Edit",editControl:"Edit",updating:"Updating...",cancel:"cancel"});
A.popupClose=function(C){if(A.get(C,"popup")){A.get(C,"popup").close()
}};
A.submitConfig=function(C,D,E){return A.assembleConfig(C,{target:E,data:D.data,mode:"edit",targetURL:D.id})
};
A.callbacks={inline:{},popup:{}};
A.callbacks.inline={control:function(D){var E=this;
var C=A.submitConfig(D,E,E.dom.get("subcontainer"));
C.plugins.push({name:"Edit"});
new Echo.Submit(C);
E.dom.content.get(0).scrollIntoView(true)
},events:{complete:function(C){C.rerender()
}}};
A.callbacks.inline.events.error=A.callbacks.inline.events.complete;
A.callbacks.popup={control:function(D){var E=this;
A.popupClose(E);
var C=new Echo.UI.Dialog({content:function(G){B(G).addClass("echo-edit-item-container");
var F=A.submitConfig(D,E,G);
F.plugins.push({name:"Edit"});
new Echo.Submit(F)
},config:{autoOpen:true,title:A.label("edit"),width:400,height:320,minWidth:300,minHeight:320}});
A.set(E,"popup",C)
},events:{init:function(C){C.block(A.label("updating"))
},complete:function(C){A.popupClose(C)
},error:function(C){A.popupClose(C);
C.unblock()
}}};
A.assembleControl=function(C){return function(){var D=this;
return{name:"Edit",label:A.label("editControl"),visible:D.user.isAdmin()||D.user.hasIdentity(D.data.actor.id),callback:function(){var E=A.config.get(C,"layout");
A.callbacks[E].control.call(D,C)
}}
}
};
A.listenEvents=function(C){var D=A.callbacks[A.config.get(C,"layout")].events;
B.each(["Init","Complete","Error"],function(F,E){A.subscribe(C,"Submit.onEdit"+E,function(H,G){var J=C.items[G.data.unique];
var I=D[E.toLowerCase()];
if(J&&I){I(J)
}})
})
};
A.css=".echo-edit-item-container .echo-submit-container { margin: 10px; }.echo-submit-cancelButton { float: right; margin: 6px 15px 0px 0px; }"
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"FormAuth",applications:["Submit"],dependencies:[{application:"Auth",url:"//cdn.echoenabled.com/clientapps/v2/auth.js"}],init:function(D,C){D.extendTemplate("Submit",'<div class="echo-submit-auth"></div>',"insertBefore","echo-submit-header");
D.extendRenderer("Submit","auth",D.renderers.Submit.auth);
D.extendRenderer("Submit","header",D.renderers.Submit.header);
D.extendRenderer("Submit","container",D.renderers.Submit.container);
D.extendRenderer("Submit","postButton",D.renderers.Submit.postButton);
D.extendRenderer("Submit","forcedLoginUserInfo",D.renderers.Submit.forcedLoginUserInfo);
D.addCss(D.css)
}});
A.css=".echo-submit-forcedLoginUserInfoMessage { font-size: 14px; font-weight: bold; }";
A.addLabels({youMustBeLoggedIn:"You must be logged in to comment"});
A.renderers={Submit:{}};
A.renderers.Submit.auth=function(E,F){var D=this;
if(!D.user.get("sessionID")||D.config.get("mode")=="edit"){return 
}var C=B.foldl({},["Edit","Login","Signup"],function(G,H){H[G.toLowerCase()]=A.config.get(D,"identityManager"+G)
});
new Echo.Auth(A.assembleConfig(D,{target:E,identityManager:C}))
};
A.renderers.Submit.container=function(D,E){var C=this;
C.parentRenderer("container",arguments);
D.removeClass("echo-submit-logged echo-submit-anonymous echo-submit-forcedLogin");
D.addClass("echo-submit-"+A.getStatus(C))
};
A.renderers.Submit.header=function(E,F){var D=this;
var C=A.getStatus(D);
if(C=="forcedLogin"){return D.render("forcedLoginUserInfo",E,F)
}if(C=="logged"){E.empty();
return 
}return D.parentRenderer("header",arguments)
};
A.renderers.Submit.postButton=function(D,F){var C=this;
var E=A.get(C,"postButtonHandler");
if(!E){E=function(G){if(C.user.logged()){G.stopImmediatePropagation();
if(!C.highlightMandatory(C.dom.get("text"))){C.post()
}}else{if(C.config.get("mode")!="edit"&&A.getPermissions(C)=="forceLogin"){G.stopImmediatePropagation();
C.dom.get("forcedLoginUserInfoMessage").css({color:"red"})
}}};
A.set(C,"postButtonHandler",E)
}D.unbind("click",E).bind("click",E);
C.parentRenderer("postButton",arguments)
};
A.renderers.Submit.forcedLoginUserInfo=function(C,G){var F="echo-submit-forcedLoginUserInfo";
var E='<div class="echo-submit-userInfoWrapper echo-primaryFont"><span class="{Data:prefix}Message echo-secondaryColor">{Data:label}</span></div>';
var D={Message:function(H){G.set("forcedLoginUserInfoMessage",H)
}};
var E=this.substitute(E,{prefix:F,label:A.label("youMustBeLoggedIn")});
return B.toDOM(E,F,D).content
};
A.getPermissions=function(C){return A.config.get(C,"submitPermissions","allowGuest")
};
A.getStatus=function(C){if(C.user.logged()){return"logged"
}if(A.getPermissions(C)=="forceLogin"){return"forcedLogin"
}return"anonymous"
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"ItemAccumulatorDisplay",applications:["Stream"],init:function(D,C){D.extendTemplate("Item",D.template,"insertBefore","echo-item-modeSwitch");
D.extendRenderer("Item","accumulatorContainer",D.renderers.Item.accumulatorContainer);
D.addCss(D.css);
D.listenEvents(C)
}});
A.renderers={Item:{}};
A.template='<div class="echo-item-accumulatorContainer"></div>';
A.renderers.Item.accumulatorContainer=function(F){var H=this;
var D=A.config.get(H,"accumulator","repliesCount");
var E=H.data.object.accumulators[D];
var G=A.get(H,"count")||{};
if(typeof G.current=="undefined"){var J=A.config.get(H,"countTickTimeout",1);
A.set(H,"countTickTimeout",J*1000);
A.set(H,"count",{actual:E,current:E});
F.append(E);
return 
}A.stopTimer(H);
var C=H.dom.get("container");
C.stop(true,true);
if(G.actual!=E){G.actual=E;
A.set(H,"count",G)
}F.append(G.current);
if(G.current!=G.actual){var I=A.get(H,"originalBGColor");
if(typeof I=="undefined"){I=B.getVisibleColor(C);
A.set(H,"originalBGColor",I)
}C.css({backgroundColor:H.config.get("flashColor")});
A.animateCounter(H,I)
}};
A.listenEvents=function(C){A.subscribe(C,"Stream.Item.onRender",function(D,F){var E=C.items[F.item.data.unique];
if(!E||!E.dom){return 
}A.set(E,"originalBGColor",B.getVisibleColor(E.dom.get("container")))
})
};
A.stopTimer=function(C){var D=A.get(C,"timer");
if(D){clearTimeout(D)
}A.set(C,"timer",undefined)
};
A.animateCounter=function(E,F){A.stopTimer(E);
var D=A.get(E,"count");
if(typeof D.current!="undefined"&&D.current==D.actual&&!A.get(E,"animationInProgress")){var C=E.dom.get("container");
A.set(E,"animationInProgress",true);
C.animate({backgroundColor:F},E.config.get("fadeTimeout"),"linear",function(){C.css("backgroundColor","");
A.set(E,"animationInProgress",false)
});
return 
}A.set(E,"timer",setTimeout(function(){var G=A.get(E,"count");
if(G.current!=G.actual){G.current<G.actual?G.current++:G.current--;
A.set(E,"count.current",G.current);
E.dom.get("accumulatorContainer").html(G.current);
A.animateCounter(E,F)
}},A.get(E,"countTickTimeout")))
};
A.css=".echo-item-accumulatorContainer { float: right; margin-right: 7px; }"
})(jQuery);
(function(A){A.belowthefold=function(C,D){var B=A(window).height()+A(window).scrollTop();
return B<=A(C).offset().top-D.threshold
};
A.abovethetop=function(B,C){var D=A(window).scrollTop();
return D>=A(B).offset().top+A(B).height()-C.threshold
};
A.rightofscreen=function(C,D){var B=A(window).width()+A(window).scrollLeft();
return B<=A(C).offset().left-D.threshold
};
A.leftofscreen=function(B,C){var D=A(window).scrollLeft();
return D>=A(B).offset().left+A(B).width()-C.threshold
};
A.inviewport=function(B,C){return !A.rightofscreen(B,C)&&!A.leftofscreen(B,C)&&!A.belowthefold(B,C)&&!A.abovethetop(B,C)
};
A.extend(A.expr[":"],{"below-the-fold":function(C,D,B){return A.belowthefold(C,{threshold:0})
},"above-the-top":function(C,D,B){return A.abovethetop(C,{threshold:0})
},"left-of-screen":function(C,D,B){return A.leftofscreen(C,{threshold:0})
},"right-of-screen":function(C,D,B){return A.rightofscreen(C,{threshold:0})
},"in-viewport":function(C,D,B){return A.inviewport(C,{threshold:0})
}})
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"ItemsAutoRequest",applications:["Stream"],init:function(D,C){B(window).bind("scroll",function(F){if(!C.isPluginEnabled(D.name)){return 
}var E=C.dom&&C.dom.get("more");
if(E&&!D.get(C,"requestInProgress")&&B.inviewport(E,{threshold:0})){D.set(C,"requestInProgress",true);
E.click()
}});
D.subscribe(C,"Stream.onDataReceive",function(){D.set(C,"requestInProgress",false)
})
}})
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"JanrainSharing",applications:["Submit"],init:function(D,C){if(!Echo.Global){Echo.Global={}
}if(!D.config.get(C,"appId")||!D.config.get(C,"xdReceiver")){return 
}D.listenEvents(C)
}});
A.contentMaxLength=120;
A.addLabels({sharePrompt:"Share your comment:"});
A.isReplyToTweet=function(C){return !!(C&&C.source&&C.source.name=="Twitter")
};
A.getTweetAuthor=function(C){return C.actor.id.replace(/http\:\/\/twitter.com\//,"")
};
A.truncate=function(D,C){return C>0&&D.length>C?D.substring(0,C)+"...":D
};
A.prepareContent=function(E,D){var G=B.stripTags(E.postData.content);
var C=A.config.get(D,"activity.shareContent");
if(C){return A.label(C,{domain:window.location.host,content:A.truncate(G,30)})
}if(A.isReplyToTweet(E.inReplyTo)){var F=A.getTweetAuthor(E.inReplyTo);
return A.label("@{author} {content}",{author:F,content:A.truncate(G,A.contentMaxLength-F.length-2)})
}return A.truncate(G,A.contentMaxLength)
};
A.listenEvents=function(D){var E="subscriptionID-"+D.getContextId();
if(A.get(Echo.Global,E)){return 
}var C=A.subscribe(D,"Submit.onPostComplete",function(I,H){var G=function(J,K){return A.config.get(D,J,K)
};
var F=("https:"==document.location.protocol)?"https://":"http://static.";
B.loadScriptContent(F+"rpxnow.com/js/lib/rpx.js",function(){RPXNOW.init({appId:G("appId"),xdReceiver:G("xdReceiver")});
RPXNOW.loadAndRun(["Social"],function(){var J=new RPXNOW.Social.Activity(G("activity.sharePrompt",A.label("sharePrompt")),A.prepareContent(H,D),G("activity.itemURL",H.targetURL));
RPXNOW.Social.publishActivity(J)
})
})
});
A.set(Echo.Global,E,C)
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"Like",applications:["Stream","UserList"],dependencies:[{application:"UserList",url:"//cdn.echoenabled.com/clientapps/v2/user-list.js"}],init:function(D,C){if(C instanceof Echo.Stream){D.extendRenderer("Item","likes",D.renderers.Item.likes);
D.extendTemplate("Item",D.templates.likeList,"insertAsLastChild","echo-item-data");
D.addItemControl(C,D.assembleControl("Like",C));
D.addItemControl(C,D.assembleControl("Unlike",C));
D.subscribe(C,D.topic("internal.Item","onUnlike"),function(E,F){D.sendRequest(C,{verb:"unlike",target:F.item.object.id,author:F.actor.id},function(){C.startLiveUpdates(true)
})
})
}else{if(C instanceof Echo.UserList){D.extendRenderer("UserList","container",D.renderers.UserList.container);
D.extendRenderer("UserListItem","adminUnlike",D.renderers.UserListItem.adminUnlike);
D.extendTemplate("UserListItem",D.templates.adminUnlike,"insertAsLastChild","echo-user-list-item-container")
}}D.addCss(D.css)
}});
A.addLabels({likeThis:"like this.",likesThis:"likes this.",likeControl:"Like",unlikeControl:"Unlike",unlikeOnBehalf:"Unlike on behalf of this user",likeProcessing:"Liking...",unlikeProcessing:"Unliking..."});
A.templates={likeList:'<div class="echo-item-likes"></div>',adminUnlike:'<img class="echo-user-list-item-adminUnlike" src="//cdn.echoenabled.com/images/container/closeWindow.png" title="'+A.label("unlikeOnBehalf")+'" width="10" height="9">'};
A.sendRequest=function(C,D,E){B.get(A.config.get(C,"submissionProxyURL","",true),{appkey:C.config.get("appkey"),content:B.object2JSON(D),sessionID:C.user.get("sessionID","")},E,"jsonp")
};
A.assembleControl=function(D,C){var E=function(){var F=this;
F.controls[A.name+"."+D].element.empty().append(A.label(D.toLowerCase()+"Processing"));
A.sendRequest(C,{verb:D.toLowerCase(),target:F.id},function(){var G=A.topic(C,"on"+D+"Complete");
A.publish(C,G,C.prepareBroadcastParams({item:{data:F.data,target:F.dom.content}}));
C.startLiveUpdates(true)
})
};
return function(){var F=this;
var G=(B.map(F.data.object.likes,function(H){if(F.user.hasIdentity(H.actor.id)){return H
}})).length>0?"Unlike":"Like";
return{name:D,label:A.label(D.toLowerCase()+"Control"),visible:F.user.logged()&&G==D,onetime:true,callback:E}
}
};
A.renderers={Item:{},UserList:{},UserListItem:{}};
A.renderers.Item.likes=function(F){var K=this;
if(!K.data.object.likes.length){F.hide();
return 
}var H=5;
var J=A.get(K,"userList")?A.get(K,"userList").getVisibleUsersCount():H;
var I=false;
var G=K.user.get("id");
var C=K.data.object.likes;
B.each(C,function(L,M){if(M.actor.id==G){I=true;
return false
}});
var D=A.assembleConfig(K,{target:F.get(0),data:{itemsPerPage:H,entries:C},initialUsersCount:J,totalUsersCount:K.data.object.accumulators.likesCount,suffixText:A.label(C.length>1||I?"likeThis":"likesThis")});
D.plugins.push({name:"Like"});
var E=new Echo.UserList(D);
A.set(K,"userList",E);
F.show();
K.subscribe(A.topic("internal.UserListItem","onUnlike"),function(L,M){if(M.target!=F.get(0)){return 
}K.publish(A.topic("internal.Item","onUnlike"),{actor:M.actor,item:K.data})
})
};
A.renderers.UserList.container=function(C){var D=this;
D.parentRenderer("container",arguments);
if(!D.user.isAdmin()){return 
}C.addClass("echo-user-list-highlight")
};
A.renderers.UserListItem.adminUnlike=function(C){var D=this;
if(!D.user.isAdmin()){C.remove();
return 
}C.one("click",function(){D.dom.get("container").css("opacity",0.3);
A.publish(D,A.topic("internal.UserListItem","onUnlike"),{actor:D.data,target:D.config.get("target").get(0)})
})
};
A.css=".echo-item-likes { background: url(//c0.echoenabled.com/images/likes.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }.echo-item-likes .echo-user-list-highlight { line-height: 23px; }.echo-item-likes .echo-user-list-highlight .echo-user-list-item-container { display: inline-block; line-height: 16px; background-color: #EEEEEE; padding: 1px 3px; border: 1px solid #D2D2D2; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; margin: 0px 2px; }.echo-item-likes .echo-user-list-highlight .echo-user-list-delimiter { display: none; }.echo-item-likes .echo-user-list-item-adminUnlike { cursor: pointer; margin-left: 3px; }"+(B.browser.msie?".echo-item-likes .echo-user-list-highlight span { vertical-align: middle; }.echo-item-likes { background-position: 0px 2px; }":"")
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"MetadataManager",applications:["Stream"],init:function(E,D){var C=E.config.get(D,"controls");
B.each(C,function(F,G){E.addItemControl(D,E.assembleControl("Mark",G,D));
E.addItemControl(D,E.assembleControl("Unmark",G,D))
})
}});
A.addLabels({markProcessing:"Adding {type} {marker}...",unmarkProcessing:"Removing {type} {marker}..."});
A.assembleControl=function(G,H,E){var F=H.marker?"marker":"tag";
var C=(H.marker||H.tag);
var D=G+"As"+C.replace(/[^a-z0-9_-]/ig,"");
var I=function(){var K=this;
var J=G.toLowerCase();
K.controls[A.name+"."+D].element.empty().append(A.label(J+"Processing",{type:F,marker:C}));
var L={verb:F=="tag"?J.replace(/mark/g,"tag"):J,target:K.id};
L[F+"s"]=C;
B.get(A.config.get(E,"submissionProxyURL","",true),{appkey:E.config.get("appkey"),content:B.object2JSON(L),sessionID:K.user.get("sessionID","")},function(){E.startLiveUpdates(true)
},"jsonp")
};
return function(){var J=this;
return{name:D,label:H["label"+G],visible:A.isControlVisible(E,J,H,C,G,F),onetime:true,callback:I}
}
};
A.isControlVisible=function(J,K,E,F,D,I){var C=(B.inArray(F,K.data.object[I+"s"]||[])==-1)^(D=="Unmark");
if(!C||!K.user.logged()){return false
}if(K.user.isAdmin()){return true
}var H=A.config.get(J,"submissionProxyURL");
if(I=="marker"&&!H){return false
}E.visible=E.visible||function(){return false
};
if(B.isFunction(E.visible)){return E.visible(J,K)
}if(B.isEmptyObject(E.visible)){return false
}var G=true;
B.each(["state","roles","markers"],function(M,N){var L=E.visible["user."+N];
if(L){L=typeof L=="string"?[L]:L;
if(!K.user.hasAny(N,L)){G=false;
return false
}}});
return G
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"Reply",applications:["Stream"],dependencies:[{application:"Submit",url:"//cdn.echoenabled.com/clientapps/v2/submit.js"}],init:function(D,C){if(!Echo.Global){Echo.Global={}
}D.extendRenderer("Item","children",D.renderers.Item.children);
D.extendRenderer("Item","replyForm",D.renderers.Item.replyForm);
D.extendRenderer("Item","container",D.renderers.Item.container);
D.extendTemplate("Item",D.template,"insertAfter","echo-item-children");
D.listenEvents(C);
D.addItemControl(C,D.assembleControl("Reply",C))
}});
A.template='<div class="echo-item-replyForm"></div>';
A.addLabels({replyControl:"Reply"});
A.assembleControl=function(D,C){var E=function(){var G=this;
var H=G.dom.get("replyForm");
if(!A.get(G,"form")){A.createForm(G,H)
}if(A.get(G,"form.initialized")){if(!G.children.length){A.view(G,"toggle");
G.rerender("container")
}}else{G.rerender("replyForm")
}var F=A.get(G,"form");
F.instance.switchMode();
if(F.visible){if(F.instance.dom){text=F.instance.dom.get("text");
if(text&&text.is(":visible")){text.focus();
return 
}}H.get(0).scrollIntoView(false)
}};
return function(){var F=this;
return{name:"Reply",label:A.label("replyControl"),visible:!F.depth,callback:E}
}
};
A.renderers={Item:{}};
A.renderers.Item.children=function(C,E){var D=this;
D.rerender("replyForm");
D.parentRenderer("children",arguments)
};
A.renderers.Item.replyForm=function(D,F){var E=this;
if(E.depth){return 
}if((!E.depth&&E.children.length&&!A.get(E,"form"))||A.get(Echo.Global,A.getFormKey(E))){A.createForm(E,D)
}else{if(!A.get(E,"form")){return 
}}var C=!!E.children.length;
if(!A.get(E,"form.initialized")){A.set(E,"form.initialized",true);
D.addClass("echo-item-container echo-item-container-child echo-trinaryBackgroundColor echo-item-depth-"+(E.depth+1));
if(!C){E.rerender("container")
}else{if(A.get(E,"form.visible")){A.view(E,"show")
}}}else{if(A.get(E,"form.visible")&&(!C||E.children.length==1&&E.children[0].deleted)){A.view(E,"hide")
}else{if(C){A.view(E,"show")
}}}};
A.renderers.Item.container=function(C,F){var E=this;
var D=E.threading;
if(A.get(E,"form.visible")){E.threading=true
}E.parentRenderer("container",arguments);
E.threading=D
};
A.prepareParams=function(C,D){return C.prepareBroadcastParams({plugin:A.name,form:A.get(D,"form"),item:{data:D.data,target:D.dom.content}})
};
A.listenEvents=function(C){B.map(["Expand","Collapse"],function(D){A.subscribe(C,"Submit.on"+D,function(H,F){var G=C.items[F.data.unique];
if(!G||!A.get(G,"form")){return 
}if(D=="Collapse"&&!G.children.length){A.view(G,"hide");
G.rerender("container")
}var E=A.topic(C,"onForm"+D);
A.publish(C,E,A.prepareParams(C,G))
})
});
A.subscribe(C,"Submit.onPostComplete",function(E,D){var F=C.items[D.data.unique];
if(!F){return 
}A.get(F,"form.instance").switchMode("compact")
})
};
A.createForm=function(F,H){var C=A.assembleConfig(F,{target:H.get(0),inReplyTo:F.data,data:{unique:F.data.unique},mode:"compact",targetURL:F.id});
var D=A.getFormKey(F);
var E=(A.get(Echo.Global,D)||{}).instance;
if(E){var I=E.dom.get("text").val();
E.config.set("target",H);
H.empty().append(E.render());
if(I){E.dom.get("text").val(I)
}}else{E=new Echo.Submit(C)
}var G={instance:E,initialized:false,visible:true};
A.set(Echo.Global,D,G);
A.set(F,"form",G)
};
A.view=function(D,E){var C=E=="toggle"?!A.get(D,"form.visible"):E=="show";
A.set(D,"form.visible",C);
A.get(D,"form.instance").config.get("target")[E]()
};
A.getFormKey=function(C){return"forms."+C.data.unique+"-"+C.getContextId()
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"SubmitTextCounter",applications:["Submit"],init:function(D,C){D.extendRenderer("Submit","text",D.renderers.Submit.text);
D.extendRenderer("Submit","counterLabel",D.renderers.Submit.counterLabel);
D.extendTemplate("Submit",D.counterTemplate,"insertAfter","echo-submit-content");
D.listenEvents(C)
}});
A.addLabels({limited:"{typed}/{left} characters",unlimited:"{typed} characters"});
A.counterTemplate='<div class="echo-submit-counterLabel echo-primaryFont echo-primaryColor"></div>';
A.renderers={Submit:{}};
A.renderers.Submit.text=function(E,G){var D=this;
D.parentRenderer("text",arguments);
var C=A.config.get(D,"limit",0);
var F=A.get(D,"keyPressHandler");
if(!F){F=function(){if(C){var H=E.val();
if(H.length<=C){A.set(D,"text",H)
}else{if(H.length>C){E.val(A.get(D,"text"));
return 
}}}D.rerender("counterLabel")
};
A.set(D,"keyPressHandler",F)
}E.unbind("blur focus keyup keypress",F).bind("blur focus keyup keypress",F)
};
A.renderers.Submit.counterLabel=function(F,H){var E=this;
if(E.config.get("mode")=="compact"){F.hide();
return 
}var G=H.get("text").val().length;
var C=A.config.get(E,"limit",0);
var D=A.label(A.config.get(E,"label",C?"limited":"unlimited"),{typed:G,left:Math.max(C-G,0),limit:C});
F.text(D)
};
A.listenEvents=function(C){A.subscribe(C,"Submit.onPostComplete",function(){C.rerender("counterLabel")
})
}
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"UserBan",applications:["Stream"],init:function(D,C){D.addItemControl(C,D.assembleControl("Ban",C));
D.addItemControl(C,D.assembleControl("Unban",C));
D.addCss(D.css)
}});
A.addLabels({banUser:"Ban User",unbanUser:"Unban",userBanned:"Banned User",processingAction:"Setting up '{state}' user state..."});
A.controlLabels={banned:'<span class="echo-item-control-state echo-item-control-state-banned">'+A.label("userBanned")+'</span>(<span class="echo-clickable">'+A.label("unbanUser")+"</span>)",unbanned:'<span class="echo-clickable">'+A.label("banUser")+"</span>"};
A.assembleControl=function(D,C){var E=function(){var F=this;
var G=D=="Ban"?"ModeratorBanned":"Untouched";
F.controls[A.name+"."+D].element.empty().append(A.label("processingAction",{state:G}));
B.get(A.config.get(C,"submissionProxyURL","",true),{appkey:C.config.get("appkey"),content:B.object2JSON({endpoint:"users/update",field:"state",value:G,identityURL:F.data.actor.id,username:F.data.actor.title}),sessionID:C.user.get("sessionID","")},function(H){if(!H||H.result=="error"){F.rerender();
return 
}B.map(C.threads,function(I){I.traverse(I.children,function(J){A.applyUserStateUpdate(J,F,G)
});
A.applyUserStateUpdate(I,F,G)
})
},"jsonp")
};
return function(){var G=this;
var F=A.isUserBanned(G);
var H=G.data.actor.id!=G.user.get("fakeIdentityURL")&&F^(D=="Ban");
return{name:D,label:A.controlLabels[F?"banned":"unbanned"],visible:H&&G.user.isAdmin(),callback:E,onetime:true}
}
};
A.applyUserStateUpdate=function(E,D,C){if(E.data.actor.id!=D.data.actor.id){return 
}E.data.actor.status=C;
E.rerender()
};
A.isUserBanned=function(C){return C.data.actor.status=="ModeratorBanned"
};
A.css=".echo-item-control-state { margin-right: 3px; }.echo-item-control-state-banned { color: #FF0000; }"
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"UserComments",applications:["Stream"],init:function(D,C){D.set(C,"query",C.config.get("query"));
D.extendTemplate("Stream",D.restoreQueryControlTemplate,"insertAsFirstChild","echo-stream-header");
D.extendRenderer("Item","avatar",D.renderers.Item.avatar);
D.extendRenderer("Item","authorName",D.renderers.Item.authorName);
D.extendRenderer("Stream","restoreQuery",D.renderers.Stream.restoreQuery);
D.extendRenderer("Stream","restoreQueryControl",D.renderers.Stream.restoreQueryControl);
D.listenEvents(C);
D.addCss(D.css)
}});
A.renderers={Item:{},Stream:{}};
A.addLabels({allCommentsByUser:"View all comments by {name}",allCommentsByAnonymous:"View all comments by anonymous users",restoreQuery:"Back to original query"});
A.anonymousUserID="http://js-kit.com/ECHO/user/fake_user";
A.restoreQueryControlTemplate='<div class="echo-stream-restoreQuery echo-linkColor"><a href="javascript:void(0)" class="echo-stream-restoreQueryControl">'+A.label("restoreQuery")+"</a></div>";
A.listenEvents=function(C){A.subscribe(C,A.topic("internal.Item","updateQuery"),function(D,F){var E=C.substitute("user.id:'{Data:id}' {Data:query}",{id:F.item.data.actor.id,query:C.config.get("query")});
A.applyQuery(C,E)
})
};
A.applyQuery=function(C,D){C.config.set("query",D);
C.refresh()
};
A.setClickHandler=function(D,E,C,F){var G=A.get(D,C);
if(!G){G=F;
A.set(D,C,F)
}E.unbind("click",G).bind("click",G)
};
A.bindHandler=function(E,C){var D=function(){E.publish(A.topic("internal.Item","updateQuery"),{item:E})
};
var F=E.data.actor.id!=A.anonymousUserID?A.label("allCommentsByUser",{name:E.data.actor.title||E.label("guest")}):A.label("allCommentsByAnonymous");
A.setClickHandler(E,C,"userComments",D);
C.attr("title",F).addClass("echo-clickable")
};
A.renderers.Item.avatar=function(C){var D=this;
A.bindHandler(D,C);
return D.parentRenderer("avatar",arguments)
};
A.renderers.Item.authorName=function(C,E){var D=this;
A.bindHandler(D,C);
return D.parentRenderer("authorName",arguments)
};
A.renderers.Stream.restoreQuery=function(D,F){var C=this;
var E=A.get(C,"query")!=C.config.get("query");
D[E?"show":"hide"]()
};
A.renderers.Stream.restoreQueryControl=function(D){var C=this;
A.setClickHandler(C,D,"defaultQuery",function(){A.applyQuery(C,A.get(C,"query"))
})
};
A.css=".echo-stream-restoreQuery { float: left; }"
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"UserPrivileges",applications:["Stream"],init:function(D,C){D.addItemControl(C,D.assembleControl("GrantPermissions",C));
D.addCss(D.css)
}});
A.addLabels({moderatorRole:"Moderator",administratorRole:"Administrator",userControl:"Demote to User",moderatorControl:"Promote to Moderator",administratorControl:"Promote to Admin",setRoleAction:"Setting up '{role}' role...",unsetRoleAction:"Removing '{role}' role..."});
A.roles=["","moderator","administrator"];
A.assembleControl=function(D,C){var E=function(){var I=this;
var J=A.getRole(I);
var H=A.getNextRole(J);
var G=H!=""?(I.data.actor.roles||[]).concat(H):B.foldl([],I.data.actor.roles||[],function(L,K){if(B.inArray(L,A.roles)<0){K.push(L)
}});
var F=H==""?"unset":"set";
I.controls[A.name+"."+D].element.empty().append(A.label(F+"RoleAction",{role:H||J}));
B.get(A.config.get(C,"submissionProxyURL","",true),{appkey:C.config.get("appkey"),content:B.object2JSON({endpoint:"users/update",field:"roles",value:G.length?G.join(","):"-",identityURL:I.data.actor.id,username:I.data.actor.title}),sessionID:C.user.get("sessionID","")},function(K){if(!K||K.result=="error"){I.rerender();
return 
}B.map(C.threads,function(L){L.traverse(L.children,function(M){A.applyUserRolesUpdate(M,I,G)
});
A.applyUserRolesUpdate(L,I,G)
})
},"jsonp")
};
return function(){var H=this;
var I=A.getRole(H);
var G=(I?'<span class="echo-item-control-role echo-item-control-role-{Data:role}">{Data:label}</span>(<span class="echo-clickable">{Data:button}</span>)':'<span class="echo-clickable">{Data:button}</span>');
var F=H.substitute(G,{role:I,label:I?A.label(I+"Role"):"",button:A.label((A.getNextRole(I)||"user")+"Control")});
return{name:D,label:F,visible:H.data.actor.id!=H.user.get("fakeIdentityURL")&&H.user.hasAny("roles",["administrator"]),callback:E,onetime:true}
}
};
A.getRole=function(D){var C="";
B.each(D.data.actor.roles||[],function(F,E){if(B.inArray(E,A.roles)>0){C=E;
if(E=="administrator"){return false
}}});
return C
};
A.getNextRole=function(C){return A.roles[(B.inArray(C,A.roles)+1)%A.roles.length]
};
A.applyUserRolesUpdate=function(E,D,C){if(E.data.actor.id!=D.data.actor.id){return 
}E.data.actor.roles=C;
E.rerender()
};
A.css=".echo-item-control-role { margin-right: 3px; }.echo-item-control-role-moderator { color: #0000FF; }.echo-item-control-role-administrator { color: #008000; }"
})(jQuery);
(function(B){var A=Echo.createPlugin({name:"Whirlpools",applications:["Stream"],init:function(F,D){var C=F.config.get(D);
var G=(typeof C.after=="undefined"?2:C.after);
var E=G/2;
D.config.combine({after:G,legacy:Math.floor(E),recent:Math.ceil(E)},C);
F.addCss(F.css);
F.extendRenderer("Item","children",F.renderers.Item.children)
}});
A.addLabels({moreExpand:"more (expand)",moreItems:"more items"});
A.initMarker=function(C,D){return new A.Marker({after:A.config.get(C,"after"),count:D,depth:C.depth+1,clickable:A.config.get(C,"clickable")},{onexpand:function(){A.set(C,"expanded",true);
C.rerender("children")
}})
};
A.renderers={Item:{}};
A.renderers.Item.children=function(F,E){var K=this;
var I=arguments;
var D=A.config.get(K);
var G=function(L){var M=K.children;
K.children=L;
K.parentRenderer("children",I);
K.children=M
};
if(!K.children.length||K.children.length<=D.after||A.get(K,"expanded")){K.parentRenderer("children",I);
return 
}if(D.after==0&&K.children.length){var H=K.traverse(K.children,function(M,L){return ++L
},0);
G([A.initMarker(K,H)]);
return 
}var J=K.children.slice(D.recent,K.children.length-D.legacy);
var H=K.traverse(J,function(M,L){return ++L
},0);
var C=[].concat(A.getRecentChildren(K,D.recent),A.initMarker(K,H),A.getLegacyChildren(K,D.legacy));
G(C)
};
A.getRecentChildren=function(G,F){var C=F;
for(var E=0;
E<F;
E++){if(G.children[E].added||G.children[E].deleted){var D=G.children[E].added?"deleted":"added";
G.children[C++][D]=true
}}return G.children.slice(0,C)
};
A.getLegacyChildren=function(H,G){var F=H.children.length;
var C=F-G;
for(var E=F-G;
E<F;
E++){if(H.children[E].added||H.children[E].deleted){var D=H.children[E].added?"deleted":"added";
H.children[--C][D]=true
}}return H.children.slice(C)
};
A.Marker=function(D,C){D.label=this.label("more"+(D.clickable?"Expand":"Items"));
this.init({data:D,callbacks:C})
};
A.Marker.prototype=new Echo.Object();
A.Marker.prototype.namespace="Plugins.Whirlpools";
A.Marker.prototype.cssPrefix="echo-whirlpool-";
A.Marker.prototype.renderers={};
A.Marker.prototype.template='<div class="echo-whirlpool-container echo-trinaryBackgroundColor echo-item-depth-{Data:depth} echo-item-container-child"><span class="echo-whirlpool-message">{Data:count} {Data:label}</span></div>';
A.Marker.prototype.renderers.container=function(D){var C=this;
if(this.data.clickable){D.addClass("echo-clickable").click(function(){C.callbacks.onexpand()
})
}if(this.data.after==0){D.addClass(this.cssPrefix+"container-collapse-all")
}};
A.Marker.prototype.renderers.message=function(C){if(this.data.clickable){C.addClass("echo-linkColor")
}};
A.css='.echo-whirlpool-container { text-align: center; }.echo-whirlpool-container-collapse-all { text-align: left; }.echo-whirlpool-message { display: inline-block; padding-left: 18px; background: url("//c0.echoenabled.com/images/whirlpool.png") no-repeat center left; }'
})(jQuery);
(function(C){var A=Echo.createPlugin({name:"BeastComments",applications:["Stream"],init:function(E,D){if(D instanceof Echo.Stream){E.extendTemplate("Stream",E.templates.stream,"replace","echo-stream-container");
E.extendTemplate("Item",E.templates.item,"replace","echo-item-content");
E.extendRenderer("Item","avatar",E.renderers.avatar)
}}});
A.renderers={};
A.renderers.avatar=function(){var D=this;
var F=(!this.depth?48:24);
var E=this.data.actor.avatar;
if(E){return C("<img>",{src:E,width:F,height:F}).bind({error:function(){C(this).remove()
}})
}};
A.templates={};
A.templates.stream='<div class="echo-stream-container echo-primaryFont echo-primaryBackgroundColor"><div class="echo-stream-header"><div class="echo-stream-state echo-secondaryColor"></div><div class="echo-clear"></div></div><div class="echo-stream-body"></div><div class="echo-stream-more"></div><div class="echo-stream-brand"><a class="echo-stream-brand-link" href="http://aboutecho.com" target="_blank"><div class="echo-stream-brand-message">social networking by</div></a></div></div>';
A.templates.item='<div class="echo-item-content"><div class="echo-item-container"><div class="echo-item-avatar-wrapper"><div class="echo-item-avatar"></div></div><div class="echo-item-wrapper"><div class="echo-item-subwrapper"><div class="echo-item-subcontainer"><div class="echo-item-frame"><div class="echo-item-modeSwitch echo-clickable"></div><div class="echo-item-authorName echo-linkColor"></div><div class="echo-item-date timestamp"></div><div class="echo-clear"></div><div class="echo-item-data"><div class="echo-item-body echo-primaryColor"></div></div><div class="echo-item-metadata"><div class="echo-item-metadata-userID"><span class="echo-item-metadata-title echo-item-metadata-icon echo-item-metadata-userID">{Label:userID}</span><span class="echo-item-metadata-value">{Data:actor.id}</span></div></div><div class="echo-secondaryColor echo-secondaryFont"><div class="echo-item-controls"></div><div class="echo-clear"></div></div></div></div><div class="echo-clear"></div></div></div><div class="echo-clear"></div></div><div class="echo-item-children"></div></div>';
var B=Echo.createPlugin({name:"BeastCommentsLogin",applications:["FormAuth","Auth"],init:function(E,D){E.extendRenderer("Auth","avatar",E.renderers.avatar);
E.extendTemplate("Auth",E.templates.logged,"replace","echo-auth-logged");
E.parentPlugin=Echo.Plugins.FormAuth
}});
B.renderers={};
B.renderers.avatar=function(F){var D=this;
var E=this.user.get("avatar");
if(E){F.append(C("<img>",{src:E})).bind({error:function(){C(this).remove()
}})
}};
B.templates={};
B.templates.logged='<div class="echo-auth-logged echo-primaryFont echo-primaryColor"><div class="echo-auth-avatar"></div><div class="echo-auth-name"></div><div class="echo-auth-logout echo-linkColor echo-clickable">{Label:logout}</div><div class="echo-clear"></div></div>';
Echo.Localization.extend({emptyStream:"Start the conversation."},"Stream")
})(jQuery);
var tdbLoginPlugin=Echo.createPlugin({name:"TDBLogin",applications:["FormAuth","Auth"],init:function(B,A){B.extendTemplate("Auth",tdbLoginPlugin.templates.anonymous,"replace","echo-auth-anonymous");
B.extendTemplate("Auth",tdbLoginPlugin.templates.logged,"replace","echo-auth-logged");
B.parentPlugin=Echo.Plugins.FormAuth
}});
tdbLoginPlugin.templates={};
tdbLoginPlugin.templates.anonymous='<span><a class="echo-auth-login">Login</a></span>';
tdbLoginPlugin.templates.logged='<span class="echo-auth-name"></span><span><a class="echo-auth-logout">Logout</a></span>';
(function(B){var A=Echo.createPlugin({name:"HeaderControls",applications:["Stream"],init:function(D,C){if(Echo.Stream&&C instanceof Echo.Stream){D.set(C,"query",C.config.get("query"));
D.classifyStreamSortingOrder(C);
D.extendTemplate("Stream",D.streamHeaderTemplate,"replace","echo-stream-header");
D.extendRenderer("Stream","state",D.renderers.Stream.state);
D.extendRenderer("Stream","streamStateLiveButton",D.renderers.Stream.streamStateLiveButton);
D.extendRenderer("Stream","streamStatePauseButton",D.renderers.Stream.streamStatePauseButton);
D.extendRenderer("Stream","sortOrderControls",D.renderers.Stream.sortOrderControls);
D.extendRenderer("Stream","pausedEventsCount",D.renderers.Stream.pausedEventsCount);
D.addCss(D.css)
}}});
A.addLabels({live:"Live",pause:"Pause",paused:"Paused",sortby:"Sort by",newest:"Newest",oldest:"Oldest",popular:"Popular",twitter:"Twitter"});
A.streamHeaderTemplate=function(){var C="";
C+='<div class="echo-stream-header echo-stream-advancedHeader">';
C+='<div class="echo-stream-streamStateButtons">';
C+='<div class="echo-stream-streamStateLiveButton echo-header-state"><a href="javascript:void(0);">Live</a></div>';
C+='<div class="echo-stream-streamStatePauseButton echo-header-state"><a href="javascript:void(0);">Pause</a></div>';
C+='<div class="echo-stream-pausedEventsCount"></div>';
C+="</div>";
C+='<div class="echo-header-sort">';
C+='<select class="echo-stream-sortOrderControls">';
C+='<option value="sortby">Sort by:</option>';
C+='<option value="newest">Newest</option>';
C+='<option value="oldest">Oldest</option>';
C+='<option value="popular">Popular</option>';
C+="</select>";
C+="</div>";
C+='<div class="echo-header-clear"></div>';
C+='<div class="echo-stream-state"></div>';
C+="</div>";
return C
};
A.renderers={Stream:{}};
A.renderers.Stream.state=function(C,E){var D=this;
if(!D.config.get("liveUpdates")){D.activities.state="paused"
}A.setStreamState(D.activities.state,D,E);
D.render("pausedEventsCount")
};
A.renderers.Stream.streamStateLiveButton=function(C){var D=this;
C.click(function(){D.setStreamState("live");
if(!D.config.get("liveUpdates")){D.config.set("liveUpdates",true);
D.refresh();
return 
}if(!D.dom||D.config.get("streamStateToggleBy")!="mouseover"){return 
}D.dom.get("body").bind({mouseleave:function(){D.setStreamState("live")
},mouseenter:function(){D.setStreamState("paused")
}})
})
};
A.renderers.Stream.streamStatePauseButton=function(C){var D=this;
C.click(function(){D.setStreamState("paused");
if(!D.dom){return 
}D.dom.get("body").unbind("mouseleave").unbind("mouseenter")
})
};
A.renderers.Stream.sortOrderControls=function(C){var D=this;
C.val(A.get(D,"sortBy","sortby"));
C.unbind("change").bind("change",function(){D.config.set("query",A.assembleSearchQuery(D,this.value));
D.refresh();
A.set(D,"sortBy",this.value);
D.rerender("sortOrderControls")
})
};
A.renderers.Stream.pausedEventsCount=function(){var E=this;
if(!E.dom){return 
}var C=E.dom.get("pausedEventsCount");
var D=A.countVisibleActivities(E);
if(E.activities.state=="paused"&&D){C.empty().append("<span> ("+D+" new)</span>");
return 
}C.empty()
};
A.countVisibleActivities=function(D){var C=0;
if(D.activities.state=="paused"){C=B.foldl(0,D.activities.queue,function(E,F){if(E.affectCounter){return ++F
}})
}return C
};
A.assembleSearchQuery=function(E,F){var D=A.get(E,"query");
var C=function(G){if(!D.match(/sortOrder/)){return"sortOrder:"+G+" "+D
}return D.replace(/sortOrder:(\w+)/,"sortOrder:"+G)
};
switch(F){case"oldest":D=C("chronological");
break;
case"popular":D=C("likesDescending");
break;
default:D=C("reverseChronological");
break
}return D
};
A.classifyStreamSortingOrder=function(G){var F=A.get(G,"query");
var E=F.match(/sortOrder:(\w+)/);
var D=E&&E[1]?E[1]:"reverseChronological";
var C={reverseChronological:"newest",chronological:"oldest",likesDescending:"popular"};
A.set(G,"sortBy",C[D])
};
A.setStreamState=function(E,G,F){F=F||G.dom;
if(!F){return 
}var D={live:F.get("streamStateLiveButton"),paused:F.get("streamStatePauseButton")};
var C=E=="live"?"paused":"live";
D[C].removeClass("echo-header-state-active");
D[E].addClass("echo-header-state-active")
};
A.css=".echo-stream-advancedHeader { margin: 0px !important; border-bottom:1px solid #e0e0e0; }.echo-stream-header { font-size:0.9em; color:#333; padding:1em 0em 1em 1em; }.echo-stream-header .echo-header-state { visibility:hidden;float:left; }.echo-stream-header .echo-header-state a, .echo-stream-header .echo-header-state a:link, .echo-stream-header .echo-header-state a:visited { color:#666; text-decoration:none; }.echo-stream-header .echo-header-state a:hover, .echo-stream-header .echo-header-state a:active { color:#333; text-decoration:underline; }.echo-stream-header .echo-header-state-active, .echo-stream-header .echo-header-state-active a { font-weight:bold; }.echo-stream-header .echo-stream-streamStateLiveButton { float:left; margin-right:0.5em; no-repeat top left; padding-left:19px; text-transform:uppercase; }.echo-stream-header .echo-stream-streamStatePauseButton { float:left; no-repeat top left; padding-left:19px; }.echo-stream-header .echo-stream-pausedEventsCount { margin-left: 10px; float: left; }.echo-stream-header .echo-header-sort { float:right; text-align:right; color:#999; }.echo-stream-header .echo-header-sort a, .echo-stream-header .echo-header-sort a:link, .echo-stream-header .echo-header-sort a:visited { color:#666; text-decoration:none; }.echo-stream-header .echo-header-sort a:hover, .echo-stream-header .echo-header-sort a:active { color:#333; text-decoration:underline; }.echo-stream-header .echo-header-sort-active, .echo-stream-header .echo-header-sort-active a { font-weight:bold; }.echo-stream-header .echo-header-sort-by {}.echo-stream-header .echo-header-sort-newest {}.echo-stream-header .echo-header-sort-oldest {}.echo-stream-header .echo-header-sort-popular {}.echo-stream-header .echo-header-clear { clear:both; }"
})(jQuery);
$(function(){function E(J){$.log("Backplane message:"+J.type);
if(J.type=="session/ready"){if(J.payload.session){identityUrl=J.payload.session.poco.entry.accounts[0].identityUrl;
$.cookie("userLoggedIn","true")
}}else{if(J.type=="identity/logout"){$.cookie("userLoggedIn","false")
}}}if(!dailybeast.modes.isEditMode){var C=$(".echoUserLogin");
var I={domain:"newsweek.janraincapture.com",clientId:"mrxvh5sy2tmjfj3r4vra6gs47kxacujz"};
var F=(window.location.hostname.substring(0,3)==="www"?"prod":"dev")+".newsweek.com";
var D=window.location.protocol+"//"+window.location.host;
var A=encodeURIComponent(D+"/content/dailybeast/services/janrain.html");
var B=encodeURIComponent(D+"/etc/static/dailybeast/capture_xdcomm.html");
var G={width:666,height:728,url:"https://"+I.domain+"/oauth/signin?client_id="+I.clientId+"&response_type=code&redirect_uri="+A+"&xd_receiver="+B+"&recover_password_callback=dailybeast.janrain.recoverPassword&bp_channel="};
var H={width:666,height:728,url:"https://"+I.domain+"/oauth/legacy_register?client_id="+I.clientId+"&flags=stay_in_window&response_type=code&redirect_uri="+A+"&xd_receiver="+B+"&recover_password_callback=dailybeast.janrain.recoverPassword&bp_channel="};
if(C.length>0||$("#blackout").length>0){window.Backplane=window.Backplane||{channelByBus:{},config:{},initialized:false,subscribers:{},awaiting:{since:0,until:0,queue:[]},intervals:{min:1,frequent:5,regular:60,slowdown:120}};
Backplane.init=function(J){J=J||{};
if(this.initialized||!J.serverBaseURL||!J.busName){return false
}this.initialized=true;
this.timers={};
this.config=J;
this.channelByBus=this.getCookieChannels();
this.config.customChannelName=J.channelName;
this.config.channelName=this.getChannelName();
this.config.serverBaseURL=this.normalizeURL(J.serverBaseURL);
this.config.channelID=this.generateChannelID();
this.request();
return true
};
Backplane.subscribe=function(K){if(!this.initialized){return false
}var J=(new Date()).valueOf()+Math.random();
this.subscribers[J]=K;
return J
};
Backplane.unsubscribe=function(J){if(!this.initialized||!J){return false
}delete this.subscribers[J]
};
Backplane.getChannelID=function(){if(!this.initialized){return false
}return this.config.channelID
};
Backplane.expectMessages=function(J){this.expectMessagesWithin(60,J)
};
Backplane.expectMessagesWithin=function(J,K){if(!this.initialized||!J){return false
}this.awaiting.since=this.getTS();
this.awaiting.interval=J;
this.awaiting.nonstop=!K;
if(K){K=typeof K=="string"?[K]:K;
this.awaiting.queue.push(K)
}var L=this.awaiting.since+J;
if(L>this.awaiting.until){this.awaiting.until=L
}this.request()
};
Backplane.generateChannelID=function(){return this.config.serverBaseURL+"/bus/"+this.config.busName+"/channel/"+this.config.channelName
};
Backplane.getChannelName=function(){if(!this.initialized){return false
}if(this.config.customChannelName){return this.config.customChannelName
}if(!this.channelByBus[this.config.busName]){this.channelByBus[this.config.busName]=(new Date()).valueOf().toString()+Math.random().toString().substr(2,5);
this.setCookieChannels()
}return this.channelByBus[this.config.busName]
};
Backplane.getTS=function(){return Math.round((new Date()).valueOf()/1000)
};
Backplane.getCookieChannels=function(){var L=(document.cookie||"").match(/backplane-channel=(.*?)(?:$|;)/);
if(!L||!L[1]){return{}
}var K={};
var N=L[1].split("|");
for(var M=0;
M<N.length;
M++){var J=N[M].split(":");
K[decodeURIComponent(J[0])]=decodeURIComponent(J[1])
}return K
};
Backplane.setCookieChannels=function(){var K=[];
for(var J in this.channelByBus){if(this.channelByBus.hasOwnProperty(J)){K.push(encodeURIComponent(J)+":"+encodeURIComponent(this.channelByBus[J]))
}}var L=new Date();
L.setFullYear(L.getFullYear()+5);
document.cookie="backplane-channel="+K.join("|")+";expires="+L.toGMTString()+";path=/"
};
Backplane.resetCookieChannel=function(){delete this.channelByBus[this.config.busName];
this.setCookieChannels();
this.config.channelName=this.getChannelName();
this.config.channelID=this.generateChannelID()
};
Backplane.normalizeURL=function(J){return J.replace(/^\s*(https?:\/\/)?(.*?)[\s\/]*$/,function(K,M,L){return(M||window.location.protocol+"//")+L
})
};
Backplane.calcTimeout=function(){var M,K=this.getTS();
if(K<this.awaiting.until){if(!this.awaiting.nonstop&&!this.awaiting.queue.length){this.awaiting.until=K;
return this.calcTimeout()
}var L=K-this.awaiting.since;
var J=this.intervals.frequent-this.intervals.min;
M=this.intervals.min+Math.round(J*L/this.awaiting.interval)
}else{if(K<this.awaiting.until+this.intervals.slowdown){var L=K-this.awaiting.until;
var J=this.intervals.regular-this.intervals.frequent;
M=this.intervals.frequent+Math.round(J*L/this.intervals.slowdown)
}else{M=typeof this.since=="undefined"?0:this.intervals.regular;
this.awaiting.nonstop=false
}}return M*1000
};
Backplane.request=function(){var J=this;
if(!this.initialized){return false
}this.stopTimer("regular");
this.stopTimer("watchdog");
this.timers.regular=setTimeout(function(){J.timers.watchdog=setTimeout(function(){J.request()
},5000);
var L=document.createElement("script");
L.type="text/javascript";
L.charset="utf-8";
L.src=J.config.channelID+"?callback=Backplane.response"+(J.since?"&since="+encodeURIComponent(J.since):"")+"&rnd="+Math.random();
var K=document.getElementsByTagName("head")[0]||document.documentElement;
K.insertBefore(L,K.firstChild);
L.onload=L.onreadystatechange=function(){var M=L.readyState;
if(!M||M==="loaded"||M==="complete"){L.onload=L.onreadystatechange=null;
if(L.parentNode){L.parentNode.removeChild(L)
}}}
},this.calcTimeout())
};
Backplane.response=function(M){var R=this;
this.stopTimer("watchdog");
M=M||[];
var Q=M.length?M[M.length-1].id:this.since;
if(typeof this.since=="undefined"){M=[]
}this.since=Q||"";
for(var O=0;
O<M.length;
O++){for(var N in this.subscribers){if(this.subscribers.hasOwnProperty(N)){this.subscribers[N](M[O].message)
}}var P=[];
for(var L=0;
L<this.awaiting.queue.length;
L++){var J=false;
for(var K=0;
K<this.awaiting.queue[L].length;
K++){if(this.awaiting.queue[L][K]==M[O].message.type){J=true
}}if(!J){P.push(this.awaiting.queue[L])
}}this.awaiting.queue=P
}this.request()
};
Backplane.stopTimer=function(J){var K=this.timers[J];
if(K){clearTimeout(K)
}};
Backplane.init({serverBaseURL:"http://api.echoenabled.com/v1",busName:"newsweek.com"});
$.cookie("bp_channel_id",Backplane.getChannelID());
Backplane.subscribe(E);
$.log("Set up backplane for echo");
new Echo.Auth({target:C.get(0),appkey:F,identityManager:{login:G,edit:G,signup:H},plugins:[{name:"TDBLogin"}]})
}$("div[data-echo]").each(function(){var J=$(this);
var Q=$.parseJSON(J.attr("data-echo"));
var M=!(Q.disable==="true")&&C.length>0;
var S=!(Q.lockThread==="true")&&C.length>0;
var P=Q.target!="undefined"?(Q.target):(window.location.protocol+"//"+window.location.host+window.location.pathname).replace(/\.[0-9]+\.html$/i,".html");
if(C.length>0){var L={name:"FormAuth",identityManagerLogin:G,identityManagerSignup:H,identityManagerEdit:G,submitPermissions:"forceLogin",nestedPlugins:[{name:"BeastCommentsLogin"}]};
var O=J.find(".comments-submit-form");
if(O.length>0){var K={target:O.get(0),appkey:F,targetURL:P,postingTimeout:90,plugins:[L]};
new Echo.Submit(K)
}}var R=J.find(".comments-stream");
if(R.length>0){var N={appkey:F,target:R.get(0),query:"childrenof:"+P+" -source:Twitter -state:ModeratorDeleted,ModeratorFlagged,SystemFlagged -user.state:ModeratorBanned childrenItemsPerPage:100 childrenSortOrder:chronological children:1 -source:Twitter -state:ModeratorDeleted,ModeratorFlagged,SystemFlagged -user.state:ModeratorBanned",flashColor:"#EFEFEF",slideTimeout:500,fadeTimeout:500,liveStreamItems:5,streamStateLabel:{icon:false,text:false},plugins:[{name:"BeastComments"},{name:"Curation"},{name:"Like"},{name:"CommunityFlag"},{name:"UserPrivileges"},{name:"UserBan"},{name:"HeaderControls"},{name:"Whirlpools",after:2,clickable:true}]};
if(M&&S){$.log("Enabling reply plugin");
N.plugins.push({name:"Reply",nestedPlugins:[L]})
}new Echo.Stream(N)
}});
$("span[data-counter]").each(function(){new Echo.Counter({target:this,appkey:F,query:"childrenof:"+$(this).attr("data-counter")+" -source:Twitter"})
})
}});
jQuery.tdburl=function(){var C={};
C.hash={};
var A=window.location.hash;
if(A.length>1){var E=A.substring(1).split(";");
for(var B=0;
B<E.length;
B++){var D=E[B].split("=");
C.hash[D[0]]=D[1]
}}return C
}();
jQuery.cookie=function(B,I,L){if(typeof I!="undefined"){L=L||{};
if(I===null){I="";
L.expires=-1
}var E="";
if(L.expires&&(typeof L.expires=="number"||L.expires.toUTCString)){var F;
if(typeof L.expires=="number"){F=new Date();
F.setTime(F.getTime()+(L.expires*24*60*60*1000))
}else{F=L.expires
}E="; expires="+F.toUTCString()
}var K=L.path?"; path="+(L.path):"";
var G=L.domain?"; domain="+(L.domain):"";
var A=L.secure?"; secure":"";
document.cookie=[B,"=",encodeURIComponent(I),E,K,G,A].join("")
}else{var D=null;
if(document.cookie&&document.cookie!=""){var J=document.cookie.split(";");
for(var H=0;
H<J.length;
H++){var C=jQuery.trim(J[H]);
if(C.substring(0,B.length+1)==(B+"=")){D=decodeURIComponent(C.substring(B.length+1));
break
}}}return D
}};
dailybeast.logger=dailybeast.logger||function(){var A={};
A.INFO=10;
A.WARN=20;
A.ERROR=30;
A.NONE=40;
A.console={log:function(){if(window.console&&window.console.log&&A.level<=A.INFO){if(typeof window.console.log=="function"){window.console.log.apply(window.console,arguments)
}}},warn:function(){if(window.console&&window.console.warn&&A.level<=A.WARN){if(typeof window.console.warn=="function"){window.console.warn.apply(window.console,arguments)
}}},error:function(){if(window.console&&window.console.error&&A.level<=A.ERROR){if(typeof window.console.error=="function"){window.console.error.apply(window.console,arguments)
}}}};
var B=$.cookie("loglevel")?$.cookie("loglevel"):$.tdburl.hash.loglevel;
switch(B){case"info":A.level=A.INFO;
break;
case"warn":A.level=A.WARN;
break;
case"error":A.level=A.ERROR;
break;
default:A.level=A.NONE
}return A
}();
(function(){var A=jQuery;
var B=dailybeast.logger.console;
A.log=B.log;
A.warn=B.warn;
A.error=B.error
})();
var player;
var experience;
var videoPlayer;
var BCLcurrentVideo;
var currentVideo;
var currentRendition;
var videoPosition;
var debug=true;
var useSecondTracking=true;
var videoTrackingIntervalInSec=15;
var percentageViewedforVideoToBeConsideredComplete=75;
var videoTrackingIntervalsInSeconds={};
var videoViewCompleted=false;
if(useSecondTracking&&debug){logMsg("Video progress tracking turned on every "+videoTrackingIntervalInSec+" seconds.")
}function onPlayerLoaded(A){logMsg("onPlayerLoaded("+A+") starts");
player=brightcove.api.getExperience(A);
logMsg("player object created by calling brightcove.api.getExperience("+A+");");
if(debug){if(player.type==brightcove.playerType.FLASH){logMsg("Flash Brightcove Player is loaded!")
}else{logMsg("HTML5 Brightcove Player is loaded!")
}logMsg("The video player is hosted here: "+location.href)
}videoPlayer=player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
logMsg("videoPlayer object created by calling player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER)");
experience=player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
logMsg("experience object created by calling player.getModule(brightcove.api.modules.APIModules.EXPERIENCE)");
determineCurrentVideo();
determineCurrentRendition();
logMsg("Calling experienceModule.getReady(readyHandler);");
experience.getReady(readyHandler);
logMsg("onPlayerLoaded("+A+") completed")
}function determineCurrentVideo(){if(typeof (currentVideo)=="undefined"||currentVideo==null){logMsg("getCurrentVideo(): Calling asynchronous version of videoPlayer.getCurrentVideo()");
videoPlayer.getCurrentVideo(A)
}function A(B){logMsg("currentVideoHandler was called back with result: ");
logMsg(B);
currentVideo=B
}}function determineCurrentRendition(){if(typeof (currentRendition)=="undefined"||currentRendition==null){logMsg("determineCurrentRendition(): Calling asynchronous version of videoPlayer.getCurrentRendition()");
videoPlayer.getCurrentRendition(A)
}function A(B){logMsg("currentRenditionHandler was called back with result:");
logMsg(B);
currentRendition=B
}}function readyHandler(A){if(A===true){logMsg("Calling onPlayerReady() directly!");
onPlayerReady(null)
}else{logMsg("Added event listener for brightcove.player.events.ExperienceEvent.TEMPLATE_READY to call onPlayerReady()");
experience.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY,onPlayerReady)
}}function onPlayerReady(){logMsg("onPlayerReady() starts");
determineCurrentVideo();
determineCurrentRendition();
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN,mediaBeginEventHandler);
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY,mediaEventHandler);
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE,mediaEventHandler);
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP,mediaEventHandler);
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.SEEK_NOTIFY,mediaEventHandler);
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.ERROR,mediaEventHandler);
videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE,mediaEventHandler);
videoPlayer.addEventListener(brightcove.api.events.CuePointEvent.CUE,cuePointHandler);
logMsg("onPlayerReady() completed")
}function mediaBeginEventHandler(A){if(useSecondTracking){videoTrackingIntervalsInSeconds=initSecondsIntervalTracking(A.duration,videoTrackingIntervalInSec)
}trackStartVideo(getVideoId(),getVideoLength(),"Brightcove Smart Player")
}function initSecondsIntervalTracking(A,B){var D={};
for(var C=B;
C<A;
C+=B){D[C]=C
}return D
}function mediaEventHandler(A){var C;
var B;
if(A.type=="mediaProgress"){if(debug){logMsg("mediaEventHandler(pEvent): Event: "+A.type+" fired.  Video position: "+A.position)
}return 
}var D=getVideoId();
if(debug){logMsg("mediaEventHandler(pEvent): Event: "+A.type+" fired.  Video position: "+A.position)
}if(A.type=="mediaStop"){trackStopVideo(D,A.position)
}else{if(A.type=="mediaPlay"){trackPlayVideo(D,A.position)
}else{if(A.type=="mediaComplete"){trackCompleteVideo(D,A.position);
trackCloseVideo(D)
}else{if(debug){logMsg("mediaEventHandler called with pEvent type:"+A.type)
}}}}}s.Media.monitor=function(B,E){var A=E.event;
var D;
var C;
if(A!="MONITOR"){if(debug){logMsg("Exit s.Media.monitor(): Events of type that are not 'MONITOR' are not welcome here")
}return 
}if(A=="MONITOR"){C=Math.round(E.offset);
if(videoTrackingIntervalsInSeconds[C]!=undefined){if(useSecondTracking){trackVideoProgress(E.name)
}videoTrackingIntervalsInSeconds[C]=undefined
}D=E.percent*1000;
if(D>=percentageViewedforVideoToBeConsideredComplete&&!videoViewCompleted){trackCompleteVideo(E.name,C);
videoViewCompleted=true
}}};
function trackStartVideo(C,B,A){s.linkTrackVars="events,prop25,eVar25,eVar26,eVar27";
s.linkTrackEvents="event9,event10,event14,event15";
logMsg("trackStartVideo() starts!");
s.Media.open(C,B,A);
if(debug){logMsg("Omniture s.Media.open('"+C+"',"+B+", 'Lothar's Player') called.")
}trackPlayVideo(C,0)
}function trackPlayVideo(B,A){s.Media.play(B,A);
if(debug){logMsg("Omniture s.Media.play("+B+","+A+") called.")
}}function trackStopVideo(B,A){s.Media.stop(B,A);
if(debug){logMsg("Omniture s.Media.stop("+B+","+A+") called.")
}}function trackCloseVideo(A){s.Media.close(A);
if(debug){logMsg("Omniture s.Media.close("+A+") called.")
}}function trackCompleteVideo(B,A){s.Media.complete(B,A);
if(debug){logMsg("Omniture s.Media.complete("+B+","+A+") called.")
}}function trackVideoProgress(A){s.Media.track(A);
if(debug){logMsg("Omniture s.Media.track("+A+") called.")
}}function cuePointHandler(A){$.log("EVENT: "+A.type+" fired ("+A.cuePoint.time+", "+A.cuePoint.metadata+")")
}function getCurrentVideo(){return currentVideo
}function getCurrentRendition(){return currentRendition
}function showCurrentVideo(){var A=getCurrentVideo();
$.log("Current Video:");
showObject(A)
}function showCurrentRendition(){var A=getCurrentRendition();
$.log("Current Rendition:");
showObject(A)
}function showObject(A){$.log("Show Object:",A)
}function getVideoDisplayName(){return getCurrentVideo().displayName
}function getVideoId(){return getCurrentVideo().displayName
}function getVideoLength(A){return getCurrentVideo().length
}function getVideoShortDescription(A){return getCurrentVideo().shortDescription
}function getVideoOffset(A){return A.position
}function logMsg(A){$.log(A)
}var dailybeast=dailybeast||{};
var _gaq=_gaq||[];
var _qevents=_qevents||[];
dailybeast.analytics=function(){var J=["google","sitecatalyst","nielsen","comscore","quantcast"];
var H={};
function G(O,N){O=O.toLocaleLowerCase();
if(_.indexOf(J,O)>-1){H[O]=N
}}function D(Q,P){if(_.hasValue(H[Q])&&_.hasValue(H[Q].rules)){var O=H[Q].rules;
for(var N in P){if(_.hasValue(O[N])){O[N](P)
}}}return P
}function I(P){if(!_.hasValue(P)){P={}
}for(var O in H){var N=_.deepClone(P);
switch(O){case"google":F(N);
break;
case"sitecatalyst":K(N);
break;
case"nielsen":A(N);
break;
case"comscore":L(N);
break;
case"quantcast":C(N);
break
}}}function M(P){if(_.hasValue(P.title)){for(var O in H){var N=_.deepClone(P);
switch(O){case"google":E(N);
break;
case"sitecatalyst":B(N);
break;
case"nielsen":break;
case"comscore":break;
case"quantcast":break
}}}}function F(N){N.url=(_.hasValue(N.url))?N.url:window.location.pathname;
D("google",N);
_gaq.push(["_trackPageview",N.url])
}function K(S){var Q=s_gi(s_account);
Q.events="event1";
var N=_.keys(Q);
$.grep(N,function(U,T){if(_.startsWith(U,"eVar")){Q[U]=""
}});
D("sitecatalyst",S);
var R=H.sitecatalyst;
if(_.hasValue(R.mappings)){for(var P in S){var O=R.mappings[P];
Q[O]=S[P]
}}Q.t()
}function A(O){D("nielsen",O);
var N=H.nielsen;
(function(){var P=new Image(1,1);
P.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci="+N.providerID+"&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=usergen&rnd=",(new Date()).getTime()].join("")
})()
}function L(O){D("comscore",O);
var N=H.comscore;
if(typeof COMSCORE=="undefined"){_.logMessage("comScore tracking was not executed because the COMSCORE object was not initialized properly!");
return 
}COMSCORE.beacon({c1:N.c1,c2:N.c2,c3:"",c4:"",c5:"",c6:"",c15:""})
}function C(O){D("quantcast",O);
var N=H.quantcast;
_qevents.push({qacct:"p-bcLY1r4ynM-2-"})
}function B(T){var N="";
if(T.section||T.title){N="tdb";
N+=" - "+dailybeast.metatags.getTemplate();
if(_.hasValue(T.section)){N+=" - "+T.section
}if(_.hasValue(T.title)){N+=" - "+T.title
}if(_.hasValue(T.index)){N+=" - item "+T.index
}}var Q=s_gi(s_account);
var S=[];
for(var P in T.eVars){Q[P]=T.eVars[P];
S.push(P)
}Q.linkTrackVars=S.join(",");
var O=T.events.join(",");
Q.linkTrackVars+=(Q.linkTrackVars)?","+O:O;
Q.linkTrackVars+=",events";
Q.linkTrackEvents=O;
Q.events=O;
if(T.delayLoad){var R=T.link||(document.createElement("a"));
Q.tl(R,"o",N)
}else{Q.tl(true,"o",N)
}}function E(O){var N="";
if(_.hasValue(O.section)){N+=O.section
}if(_.hasValue(O.title)){N+=((N.length>0)?" - ":"")+O.title
}if(_.hasValue(O.index)){N+=" - item "+O.index
}_gaq.push(["_trackEvent","Module Click",dailybeast.metatags.getTemplate(),N])
}return{addProvider:G,trackPageview:I,trackEvent:M}
}();
var dailybeast=dailybeast||{};
dailybeast.analytics=dailybeast.analytics||{};
dailybeast.analytics.configuration=function(){function init(){bindDocumentClick()
}function bindDocumentClick(){$("*[data-track]").live("click",function(event){var target=$(event.target);
var link=$(target).closest("a");
var track=$(this);
var section=$(target).closest("[data-section]");
if(link.length>0){var data=eval("("+track.attr("data-track")+")");
if(typeof data.delayLoad==undefined){data.delayLoad=(link.attr("href").indexOf("#")!=0)
}if(data.isRealLink){data.link=link.get(0)
}var context=(section.length>0)?section:$(document);
var siblings=$(context).find("[data-track='"+track.attr("data-track")+"']");
if(siblings.length>1){data.index=$(siblings).index($(track))+1
}var parents=track.parents();
var sections=[];
for(var i=parents.length-1;
i>=0;
i--){var parent=$(parents[i]);
if(parent.attr("data-section")){var sectionData=$.parseJSON(parent.attr("data-section"));
sections.push(sectionData.title)
}}if(sections.length>0){data.section=sections.join(" - ")
}data.events=["event2"];
data.eVars={eVar1:null,eVar3:null,eVar15:data.section,eVar16:"D=pageName",eVar17:data.title};
dailybeast.analytics.trackEvent(data)
}})
}return{init:init}
}();
(function(Q,P,O){function D(S){var R={x:S.offsetLeft,y:S.offsetTop};
while(S=S.offsetParent){R.x+=S.offsetLeft,R.y+=S.offsetTop
}return R
}function E(S,R){for(var T in R){S[T]===O&&(S[T]=R[T])
}return S
}function F(S,R){for(var T in R){S.style[G(S,T)||T]=R[T]
}return S
}function G(S,R){var V=S.style,U,T;
if(V[R]!==O){return R
}R=R.charAt(0).toUpperCase()+R.slice(1);
for(T=0;
T<N.length;
T++){U=N[T]+R;
if(V[U]!==O){return U
}}}function H(Z,Y,X,W){var V=["opacity",Y,~~(Z*100),X,W].join("-"),U=0.01+X/W*100,T=Math.max(1-(1-Z)/Y*(100-U),Z),S=L.substring(0,L.indexOf("Animation")).toLowerCase(),R=S&&"-"+S+"-"||"";
M[V]||(I.insertRule("@"+R+"keyframes "+V+"{0%{opacity:"+T+"}"+U+"%{opacity:"+Z+"}"+(U+0.01)+"%{opacity:1}"+(U+Y)%100+"%{opacity:"+Z+"}100%{opacity:"+T+"}}",0),M[V]=1);
return V
}function J(S,R,T){T&&!T.parentNode&&J(S,T),S.insertBefore(R,T||null);
return S
}function K(R,U){var T=P.createElement(R||"div"),S;
for(S in U){T[S]=U[S]
}return T
}var N=["webkit","Moz","ms","O"],M={},L;
J(P.getElementsByTagName("head")[0],K("style"));
var I=P.styleSheets[P.styleSheets.length-1],C=function A(R){if(!this.spin){return new A(R)
}this.opts=E(R||{},{lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:0.25,fps:20})
},B=C.prototype={spin:function(h){this.stop();
var g=this,f=g.el=F(K(),{position:"relative"}),Z,Y;
h&&(Y=D(J(h,f,h.firstChild)),Z=D(f),F(f,{left:(h.offsetWidth>>1)-Z.x+Y.x+"px",top:(h.offsetHeight>>1)-Z.y+Y.y+"px"})),f.setAttribute("aria-role","progressbar"),g.lines(f,g.opts);
if(!L){var X=g.opts,W=0,V=X.fps,U=V/X.speed,T=(1-X.opacity)/(U*X.trail/100),S=U/X.lines;
(function R(){W++;
for(var b=X.lines;
b;
b--){var c=Math.max(1-(W+b*S)%U*T,X.opacity);
g.opacity(f,X.lines-b,c,X)
}g.timeout=g.el&&setTimeout(R,~~(1000/V))
})()
}return g
},stop:function(){var R=this.el;
R&&(clearTimeout(this.timeout),R.parentNode&&R.parentNode.removeChild(R),this.el=O);
return this
}};
B.lines=function(S,R){function T(W,X){return F(K(),{position:"absolute",width:R.length+R.width+"px",height:R.width+"px",background:W,boxShadow:X,transformOrigin:"left",transform:"rotate("+~~(360/R.lines*V)+"deg) translate("+R.radius+"px,0)",borderRadius:(R.width>>1)+"px"})
}var V=0,U;
for(;
V<R.lines;
V++){U=F(K(),{position:"absolute",top:1+~(R.width/2)+"px",transform:"translate3d(0,0,0)",opacity:R.opacity,animation:L&&H(R.opacity,R.trail,V,R.lines)+" "+1/R.speed+"s linear infinite"}),R.shadow&&J(U,F(T("#000","0 0 4px #000"),{top:"2px"})),J(S,J(U,T(R.color,"0 0 1px rgba(0,0,0,.1)")))
}return S
},B.opacity=function(S,R,T){R<S.childNodes.length&&(S.childNodes[R].style.opacity=T)
},function(){var S=F(K("group"),{behavior:"url(#default#VML)"}),R;
if(!G(S,"transform")&&S.adj){for(R=4;
R--;
){I.addRule(["group","roundrect","fill","stroke"][R],"behavior:url(#default#VML)")
}B.lines=function(h,g){function T(b,e,c){J(W,J(F(X(),{rotation:360/g.lines*b+"deg",left:~~e}),J(F(K("roundrect",{arcsize:1}),{width:Z,height:g.width,left:g.radius,top:-g.width>>1,filter:c}),K("fill",{color:g.color,opacity:g.opacity}),K("stroke",{opacity:0}))))
}function X(){return F(K("group",{coordsize:Y+" "+Y,coordorigin:-Z+" "+-Z}),{width:Y,height:Y})
}var Z=g.length+g.width,Y=2*Z,W=X(),V=~(g.length+g.radius+g.width)+"px",U;
if(g.shadow){for(U=1;
U<=g.lines;
U++){T(U,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")
}}for(U=1;
U<=g.lines;
U++){T(U)
}return J(F(h,{margin:V+" 0 0 "+V,zoom:1}),W)
},B.opacity=function(U,T,X,W){var V=U.firstChild;
W=W.shadow&&W.lines||0,V&&T+W<V.childNodes.length&&(V=V.childNodes[T+W],V=V&&V.firstChild,V=V&&V.firstChild,V&&(V.opacity=X))
}
}else{L=G(S,"animation")
}}(),Q.Spinner=C
})(window,document);
var dailybeast=dailybeast||{};
dailybeast.advertising=function(){function display(){$("div[data-advertising]").advertising("refresh",dailybeast.interstitial.getOrd());
initBreakout()
}function refresh(target){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isUsingFrames){var random=Math.random().toString();
random=random.substring(2,random.length);
$(".prWrap").each(function(){$(this).remove()
});
if(_.hasValue(target)){$(target).advertising("refresh",random)
}else{$("div[data-advertising]").advertising("refresh",random)
}}}function init(){var ord=dailybeast.interstitial.getOrd();
var ads=generateOrderedAdList();
for(var key in ads){var ad=ads[key];
var data=eval("("+ad.attr("data-advertising")+")");
$(ad).advertising({disable:data.disable,siteID:data.siteID,topic:data.topic,size:data.size,zone:data.zone,params:data.params,tile:key,ord:ord})
}}function requestBreakout(breakout){var url="/content/advertising/breakthroughs/"+breakout+".js";
$.getScript(url)
}function initBreakout(){$("div[data-breakout]").each(function(){var i=2;
var ads=generateOrderedAdList();
for(var key in ads){i++
}this._adParams=$.tdburl.hash;
var data=eval("("+$(this).attr("data-breakout")+")");
var request=dailybeast.advertising.request.generateRequest({params:data.params,topic:data.topic,siteID:data.siteID,zone:data.zone,size:"1x1,300x600,300x250,395x533",tile:i,ord:dailybeast.interstitial.getOrd(),adParams:this._adParams});
var script="<script src='"+request+"'><\/script>";
writeCapture.writeOnGetElementById=true;
$(this).html(writeCapture.sanitize(script));
if(this._adParams.adDebug){var offset=$(this).offset();
var info=$(document.createElement("div"));
$("body").css("position","relative");
info.attr("style","background: white; border: 3px solid #D1232A; padding: 5px; position: absolute; width: 300px; z-index: 9998; word-wrap: break-word;");
info.css("top",offset.top+"px");
info.css("left",offset.left+"px");
info.css("overflow","hidden");
var head="<strong>Break Through</strong><br />";
var body=request+'<br /><a href="'+request+'" target="_blank">Link &#187;</a>';
info.html(body);
info.hover(function(){$(this).css("z-index",9999)
},function(){$(this).css("z-index",9998)
});
$("body").append(info)
}})
}function generateOrderedAdList(){var ads={};
$("div[data-advertising]").each(function(){var data=eval("("+$(this).attr("data-advertising")+")");
if(data.tile){ads[data.tile]=$(this)
}});
var i=2;
$("div[data-advertising]").each(function(){var data=eval("("+$(this).attr("data-advertising")+")");
if(!data.tile){while(ads[i]){i++
}ads[i]=$(this)
}});
return ads
}function showOverlay(){var overlayShown=$.cookie("db_adOverlay");
overlayShown=false;
if(overlayShown==null||!overlayShown){var $overlay=$("[data-overlay]");
$overlay.show();
$overlay.dialog({dialogClass:"adOverlay",draggable:false,resizable:false,position:"top"});
dailybeast.advertising.refresh($overlay.find("div[data-advertising]"));
$.cookie("ads_overlayShown",true)
}}return{init:init,initBreakout:initBreakout,requestBreakout:requestBreakout,display:display,refresh:refresh,showOverlay:showOverlay}
}();
var dailybeast=dailybeast||{};
dailybeast.advertising=dailybeast.advertising||{};
dailybeast.advertising.request=function(){var D={siteID:"5480.iac.thedailybeast",tile:1,size:"1x1",keyword:"",params:"",element:""};
function K(N){var O=_.deepClone(D);
_.extend(O,N);
if(!O.ord){O.ord=E()
}var M="";
M+=("http://ad.doubleclick.net/adj/"+O.siteID+"/");
M+=H(O.zone);
M+=";tile="+O.tile;
M+=";sz="+O.size;
M+=C(O.element);
M+=J();
M+=L();
M+=F();
M+=B(O.keyword,O.adParams);
M+=A(O.params);
M+=";ord="+O.ord+"?";
return M
}function E(){var M=Math.random().toString();
M=M.substring(2,M.length);
return M
}function I(Q){Q=Q||"rsi_segs";
if($.cookie){var O=$.cookie(Q);
var P="";
if(O){var M=O.split("|");
for(var N=0;
N<M.length;
N++){P+=";rs="+M[N].replace("J05531_","j")
}}return P
}else{return""
}}function G(M){var P="";
var N=dailybeast.metatags.getTags(M);
for(var O=0;
O<N.length;
O++){P+=";dir="+N[O]
}return P
}function B(M,Q){var P="";
if(_.hasValue(M)){P=";kw="+M
}else{var N=dailybeast.metatags.getTags("ad");
for(var O=0;
O<N.length;
O++){P+=";kw="+N[O].replace("ad:","")
}}if(_.hasValue(Q)){P+=";kw="+Q.adKeyword
}return P
}function A(N){var M="";
if(_.hasValue(N)){if(_.isArray(N)){M=";"+N.join(";")
}else{if(_.isString(N)){M=";"+N
}}}return M
}function L(){var N="";
var M=dailybeast.metatags.getTemplate();
if(M=="blogentry"||M=="blog"){var O=/[^A-Za-z.]/g;
var P=dailybeast.metatags.getSection().toLowerCase().replace(O,"-");
N=(P.length>0)?";blog="+P.toLowerCase():""
}return N
}function F(){var M="";
var N=dailybeast.metatags.getContentPath();
if(N.indexOf("/content/newsweek")===0){M=";section=newsweek"
}return M
}function C(M){var N="";
var P=[];
if(_.isArray(M)||_.isString(M)){if(_.hasValue($)){P=$(M).closest("div[data-section]")
}}else{if(_.isElement(M)){}}if(P.length>0){var O=$.parseJSON($(P).attr("data-section"));
N=";pos="+O.title
}return N
}function J(){var M="";
if(dailybeast.metatags.getTemplate()){M=";template="+dailybeast.metatags.getTemplate()
}return M
}function H(N){var P="";
if(_.hasValue(N)){P=N
}else{var O=dailybeast.metatags.getTags("topic",true);
var M=dailybeast.metatags.getTags("package",true);
if(O.length>0){P+=O[0]
}if(P.length>0&&M.length>0){P+=M[0]
}}return P
}return{generateRequest:K,generateOrd:E,generateZone:H,generateTemplate:J,generatePosition:C,generateBlog:L,generateParams:A,generateKeyword:B,generateDir:G,generateAudienceScience:I}
}();
var BCMAPI=new function(){this.token="esQXrWiMb5SB4pVyTMQSECQNWKloZu9RZWd8o3OehAY.";
this.callback="BCMAPI.flush";
this.url="http://api.brightcove.com/services/library";
this.calls=[{command:"find_all_videos",def:false},{command:"find_video_by_id",def:"video_id"},{command:"find_video_by_id_unfiltered",def:"video_id"},{command:"find_videos_by_ids",def:"video_ids"},{command:"find_videos_by_ids_unfiltered",def:"video_ids"},{command:"find_video_by_reference_id",def:"reference_id"},{command:"find_video_by_reference_id_unfiltered",def:"reference_id"},{command:"find_videos_by_reference_ids",def:"reference_ids"},{command:"find_videos_by_reference_ids_unfiltered",def:"reference_ids"},{command:"find_videos_by_campaign_id",def:"campaign_id"},{command:"find_videos_by_tags",def:"or_tags"},{command:"find_videos_by_text",def:"text"},{command:"find_videos_by_user_id",def:"user_id"},{command:"find_modified_videos",def:"from_date"},{command:"find_related_videos",def:"video_id"},{command:"find_all_playlists",def:false},{command:"find_playlist_by_id",def:"playlist_id"},{command:"find_playlists_by_ids",def:"playlist_ids"},{command:"find_playlist_by_reference_id",def:"reference_id"},{command:"find_playlists_by_reference_ids",def:"reference_ids"},{command:"find_playlists_for_player_id",def:"player_id"},{command:"search_videos",def:"all"}];
this.inject=function(B){var A=document.createElement("script");
A.setAttribute("src",this.url+"?"+B);
A.setAttribute("type","text/javascript");
document.getElementsByTagName("head")[0].appendChild(A);
return true
};
this.find=function(F,E){F=F.toLowerCase().replace(/(find_)|(_)|(get_)/g,"");
E=E||null;
var C=null;
var A="";
for(var B in this.calls){if(typeof this.calls[B].command=="undefined"){continue
}if(F==this.calls[B].command.toLowerCase().replace(/(find_)|(_)|(get_)/g,"")){F=this.calls[B].command;
if(typeof this.calls[B].def!="undefined"){C=this.calls[B].def
}break
}}A="command="+F;
if((typeof E=="object")&&E){for(var D in E){if(D=="selector"){A+="&"+C+"="+encodeURIComponent(E[D])
}else{A+="&"+D+"="+encodeURIComponent(E[D])
}}if(typeof E.callback!="string"){A+="&callback="+this.callback
}if(typeof E.token!="string"){A+="&token="+this.token
}}else{if(E){A+="&"+C+"="+encodeURIComponent(E)+"&callback="+this.callback;
A+="&token="+this.token
}else{A+="&token="+this.token;
A+="&callback="+this.callback
}}this.inject(A);
return true
};
this.search=function(A){return this.find("search_videos",A)
};
this.flush=function(A){return true
}
}();
$.widget("ui.pagination",{options:{activeClass:"active",disabledClass:"disabled",articleElement:"article",pageNumberText:"(Page {0} of {1})",pageNumberElement:"",minWordsForLastPage:0,wordsPerPage:250,disabled:false,paginationItemsElement:"",nextElement:"",showAllElement:"",firstPageElements:"",nextPageElements:""},_create:function(){if(!this.options.disabled){var A=this;
this._elements=$(this.options.articleElement).find(".text.section p").add(".section").not(".new, .text, .pagebreak");
this._totalWordCount=0;
$(this._elements).each(function(){A._totalWordCount+=$(this).text().split(" ").length
});
this._pageCount=0;
this._currentIndex=0;
this._pageMarkers=this._determinePageMarkers();
if(this._pageCount>1){this.element.show();
this._renderPagination();
this._bindElements();
this._show(0,true)
}else{this.element.hide()
}}},show:function(A){this._show(A)
},showAll:function(){this._showAll()
},hideAll:function(){this._hideAll()
},next:function(){this._next()
},destroy:function(){$.widget.prototype.apply(this,arguments)
},_bindElements:function(){var A=this;
$(this.options.nextElement).live("click",function(B){B.preventDefault();
A._next()
});
$(this.options.showAllElement).live("click",function(B){B.preventDefault();
A._showAll()
});
$(this.options.hideAllElement).live("click",function(B){B.preventDefault();
A._hideAll()
});
$(this.options.paginationItemsElement).find("a[data-page]").live("click",function(B){B.preventDefault();
var C=$(this).attr("data-page");
A._show(parseInt(C))
})
},_determinePageMarkers:function(){var E=this;
var D=0;
var F=this._totalWordCount;
var A=[0];
var C=0;
E._pageStarts=[];
if($(this.options.articleElement).find(".pagebreak").length>0){var B=0;
$(this.options.articleElement).find(".text.section p").add(".section").not(".new, .text").each(function(G,H){if(!$(this).hasClass("pagebreak")){B++
}if($(this).hasClass("pagebreak")){A.push(B);
E._pageStarts.push(E._elements[B]);
E._pageCount++
}if(G==E._elements.size()-1){E._pageCount++
}})
}else{$(this._elements).each(function(G,I){if(D<=E.options.wordsPerPage||D==0){var H=$(this).text().split(" ").length;
D+=H;
F-=H
}if(D>E.options.wordsPerPage&&F>E.options.minWordsForLastPage){A.push(G+1);
E._pageStarts.push(E._elements[G+1]);
D=0;
E._pageCount++
}if(G==E._elements.size()-1&&D!=0){E._pageCount++
}})
}return A
},_show:function(A,F){if(A<this._pageCount){this._currentIndex=A;
$(this.options.articleElement).find(":not(script)").not(".header-tooltip").show();
if(A>0){var E=$(this._pageStarts[A-1]);
E.prevAll().not(".quoteStart").hide();
E.closest(".section").prevAll("div, blockquote, figure").hide();
if(E.closest(".section").find("p:first").is(":visible")){var D=E.closest(".section").prevAll("div, blockquote, figure");
for(var C=0;
C<D.length;
C++){if($(D[C]).hasClass("inline-content")||$(D[C]).find(".inline-content").length>0){$(D[C]).show()
}else{if($(D[C]).hasClass("text")){break
}}}}}var B=$(this._pageStarts[A]);
B.hide();
B.nextAll().hide();
B.closest(".section").nextAll("div, blockquote, figure").hide();
$(".storyMeta").hide();
if($(B).index()==0||B.parent("blockquote, .brightcove").length>0){B.closest(".section").hide()
}var D=B.closest(".section").prevAll("div, figure");
if(!(D.length==1&&A==0)){for(var C=0;
C<D.length;
C++){if($(D[C]).hasClass("inline-content")||$(D[C]).find(".inline-content").length>0){$(D[C]).hide()
}else{break
}}}this._updateElements();
if(F===undefined||F!==true){this._updateAnalytics();
this._trigger("updated",this._currentIndex)
}window.scrollTo(0,0);
if(this._currentIndex==(this._pageCount-1)){this._trigger("finished");
$(".storyMeta").show()
}}},_showAll:function(){$(this.options.articleElement).find(":not(script)").not(".header-tooltip").show();
$(this.options.showAllElement).hide();
$(this.options.hideAllElement).show();
$(this.options.nextElement).hide();
$(this.options.paginationItemsElement).hide();
$(this.options.pageNumberElement).hide();
$(".storyMeta").show();
this._updateAnalytics(-1);
this._trigger("updated",this._currentIndex)
},_hideAll:function(){this._show(this._currentIndex);
$(this.options.showAllElement).show();
$(this.options.hideAllElement).hide();
$(this.options.nextElement).show();
$(this.options.paginationItemsElement).show();
$(this.options.pageNumberElement).show();
this._updateAnalytics();
this._trigger("updated",this._currentIndex)
},_next:function(){this._show(this._currentIndex+1)
},_renderPagination:function(){var A="<ul>";
for(var B=0;
B<this._pageCount;
B++){A+="<li><a href='#' data-page='"+B+'\' data-track=\'{"title":"pagination"}\'>'+(B+1)+"</a></li>"
}A+="</ul>";
$(this.options.paginationItemsElement).append(A)
},_updateElements:function(){var C=this;
if(this._currentIndex==(this._pageCount-1)){$(this.options.nextElement).addClass(this.options.disabledClass)
}else{$(this.options.nextElement).removeClass(this.options.disabledClass)
}$(this.options.paginationItemsElement).find("a[data-page]").removeClass(this.options.activeClass);
var B=$(this.options.paginationItemsElement).find("a[data-page]:eq("+this._currentIndex+")");
B.addClass(this.options.activeClass);
var A=this.options.pageNumberText.replace("{0}",this._currentIndex+1).replace("{1}",this._pageCount);
$(this.options.pageNumberElement).text(A);
if(this._currentIndex==0){$(this.options.firstPageElements).show();
$(this.options.nextPageElements).hide()
}else{$(this.options.firstPageElements).hide();
$(this.options.nextPageElements).show()
}},_updateAnalytics:function(B){try{var A=B||this._currentIndex;
dailybeast.analytics.trackPageview({pageNum:A+1})
}catch(C){}}});
var dailybeast=dailybeast||{};
dailybeast.videopage=function(){var F=true;
var E=null;
var P=0;
var K=null;
var M={};
var N={NOW_PLAYING:"Now Playing:",UP_NEXT:"Up Next"};
function L(){if($.cookie("video-continuous")!=null){F=$.cookie("video-continuous")=="true";
if(F){$("#continuous-play").attr("checked","checked")
}else{$("#continuous-play").removeAttr("checked")
}}window.onTemplateLoaded=B;
H();
J();
R();
Q()
}function B(S){E=S;
K=S;
var T=brightcove.getExperience(E).getModule(APIModules.VIDEO_PLAYER);
T.addEventListener(BCVideoEvent.VIDEO_COMPLETE,A);
T.addEventListener(BCMediaEvent.ERROR,A);
if(F){T.loadVideo(K)
}}function I(U){var Y=U.videos;
var T="";
var W="";
for(var V=0;
V<Y.length;
V++){var X=Y[V];
X.nextVideo=(V+1<Y.length)?Y[V+1]:null;
X.previousVideo=(V>0)?Y[V-1]:null;
M[X.id]=X;
var S="media chapter";
T+='<li data-id="'+X.id+'">';
T+='<a href="#">';
T+='<img width="167" height="112" alt="'+X.name+'" src="'+X.videoStillURL+'">';
T+='<div class="itemData">';
T+='<span class="chapter-number" href="#'+X.id+'">'+W+"</span>";
T+='<h3 class="heading">'+X.name+"</h3>";
T+="</div>";
T+="</a>";
T+="</li>"
}if(!M[K]){M[K]={};
M[K].nextVideo=Y[0]
}$(".storyScroller-scrollable .items").append(T);
D(E)
}function J(){$("#continuous-play").live("change",function(S){G($(this))
})
}function H(){$(".storyScroller-scrollable").scrollable({next:".storyScroller-next",prev:".storyScroller-previous",steps:5,api:true});
this.chapterAPI=$(".storyScroller-scrollable").data("scrollable");
var S=5;
$.each(this.chapterAPI.getItems(),function(T){if(T==0||T%S==0){var U=$("<a/>").attr("href","#"+T);
U.click(function(V){V.preventDefault();
$(".storyScroller-scrollable").data("scrollable").seekTo(T)
});
$(".playlist .pagination").append(U)
}});
$(".playlist .pagination a").wrap("<li></li>");
this.chapterAPI.onSeek(function(U,T){if(this.getIndex()>=this.getSize()-S){$(chapterAPI.getConf().next).addClass("disabled")
}$(".playlist .pagination li").removeClass("current");
$('.playlist .pagination a[href="#'+this.getIndex()+'"]').parent().addClass("current")
});
this.chapterAPI.onBeforeSeek(function(U,T){if(this.getIndex()>=this.getSize()-S){if(T>this.getIndex()){return false
}}});
setTimeout(function(){R()
},250)
}function R(){var S=$(".storyScroller-scrollable").find(".current").index();
S=S-(S%5);
if(S!=P){this.chapterAPI.begin(0).seekTo(S);
P=S
}$('.playlist .pagination a[href="#'+S+'"]').parent().addClass("current")
}function A(S){var T=M[K];
if($(".current").next().length>0&&F){nextVideoTimeout=setTimeout(function(){var U=location.host;
var V=$(".current").next().find("a:eq(0)").attr("href");
window.location.href="http://"+U+V
},1000)
}}function G(S){F=$(S).is(":checked");
$.cookie("video-continuous",F)
}function C(S){var T="/content/newsweek/brightcove-search."+S+".json";
$.getJSON(T,function(X){if(X.success){var Y=X.path;
var U="/content/dailybeast";
if(Y.indexOf(U)==0){Y=Y.substring(U.length);
Y+=".html"
}window.location=Y
}else{var W=brightcove.getExperience(E).getModule(APIModules.VIDEO_PLAYER);
W.loadVideo(S);
var V=M[S];
O(S);
D(S);
R()
}})
}function O(S){var U=M[S];
$(".video-header .video-heading").text(U.name);
$(".video-copy").text(U.shortDescription);
try{var V=new Date(parseInt(U.publishedDate));
V=$.datepicker.formatDate("MM dd, yy",V);
$(".video-header .timestamp").text(V)
}catch(T){$(".video-header .timestamp").text("")
}$(".tags").remove()
}function Q(){if($(".playlist .items").children("li").length>3){var U=$(".playlist li.current");
var S=U.data("src")==$(".playlist li:last-child").data("src")?$(".playlist li:first-child"):U.next();
var T=U.data("src")==$(".playlist li:first-child").data("src")?$(".playlist li:last-child"):U.prev();
$(".video-image-next").css("background-image","url("+S.data("src")+")");
$(".video-image-previous").css("background-image","url("+T.data("src")+")");
$(".video-feature a.next").attr("href",S.find("a").attr("href"));
$(".video-feature a.previous").attr("href",T.find("a").attr("href"))
}}function D(T){var U=$(".storyScroller-scrollable .current");
U.removeClass("current");
U.find(".chapter-number").text("").hide();
U=$(".storyScroller-scrollable li[data-id="+T+"]");
U.addClass("current");
U.find(".chapter-number").text(N.NOW_PLAYING).show();
var S=U.next("div");
if(S.length>0){S.find(".chapter-number").text(N.UP_NEXT).show()
}K=T
}return{init:L,getPlaylistHandler:I}
}();
var dailybeast=dailybeast||{};
dailybeast.story=function(){function A(){var H=$("#fontSizer");
var C=$("#sizeUp");
var D=$("#sizeDown");
var G=$(".article-body");
var E=0;
var F=["normal","big","bigger","biggest"];
var B=F.length-1;
$(C).bind("click",function(I){I.preventDefault();
E++;
if(E>B){E=B
}else{$(D).removeClass("disabled");
$(G).removeClass("big").removeClass("bigger").removeClass("biggest");
$(G).addClass(F[E]);
if(E==B){$(C).addClass("disabled")
}}});
$(D).bind("click",function(I){I.preventDefault();
E--;
if(E<0){E=0
}else{$(C).removeClass("disabled");
$(G).removeClass("big").removeClass("bigger").removeClass("biggest");
$(G).addClass(F[E]);
if(E==0){$(D).addClass("disabled")
}}})
}return{setupFontSizer:A}
}();
(function(C){var A={},B=0;
C.fn.once=function(G,E){if(typeof G!="string"){if(!(G in A)){A[G]=++B
}if(!E){E=G
}G="jquery-once-"+A[G]
}var D=G+"-processed",F=this.not("."+D).addClass(D);
return C.isFunction(E)?F.each(E):F
}
})(jQuery);
(function(A){A.fn.twitter=function(J,I){var E=A.extend({query:"newsweek",count:4},J),G="",B=this,D=function(M){var L=/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig,K=/\B@([_a-z0-9]+)/ig;
return M.replace(L,"<a href='$1' target='_blank'>$1</a>").replace(K,"<a href='http://twitter.com/$1' target='_blank'>@$1</a>")
},H=function(P){var L=(P&&P.split(" "))||"",N=L[1]+" "+L[2]+", "+L[5]+" "+L[3],M=new Date(N),O=(((new Date()).getTime()-M.getTime())/1000)-(new Date().getTimezoneOffset()*-1*60),K=Math.floor(O/86400);
if(isNaN(K)||K<0){return 
}return K===0&&(O<60&&"just now"||O<120&&"1 minute ago"||O<3600&&Math.floor(O/60)+" minutes ago"||O<7200&&"1 hour ago"||O<86400&&Math.floor(O/3600)+" hours ago")||K===1&&"Yesterday"||K<7&&K+" days ago"||K<31&&Math.floor(K/7)+" weeks ago"||K<365&&Math.floor(K/31)+" months ago"||Math.floor(K/365)+" years ago"
},F=function(L,K,M){A.ajax({url:"http://search.twitter.com/search.json?&q="+L+"&rpp="+K+"&callback=?&include_rts=true",dataType:"json",success:function(N){M(N.results,K)
}})
},C=function(L,K){B.each(function(){var M=A(this);
M.html("");
A.each(L,function(N,O){M.append("<p id="+O.id+">"+D(O.text)+"</p>");
M.append('<div class="divider"></div>')
})
});
if(typeof I==="function"){I(B)
}};
F(E.query,E.count,C);
return this
}
}(jQuery));
/*
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(B){B.tools=B.tools||{version:"v1.2.7"},B.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};
function A(G,F){var I=parseInt(G.css(F),10);
if(I){return I
}var H=G[0].currentStyle;
return H&&H.width&&parseInt(H.width,10)
}function E(F,H){var G=B(H);
return G.length<2?G:F.parent().find(H)
}var D;
function C(R,Q){var P=this,O=R.add(P),N=R.children(),M=0,L=Q.vertical;
D||(D=P),N.length>1&&(N=B(Q.items,R)),Q.size>1&&(Q.circular=!1),B.extend(P,{getConf:function(){return Q
},getIndex:function(){return M
},getSize:function(){return P.getItems().size()
},getNaviButtons:function(){return H.add(G)
},getRoot:function(){return R
},getItemWrap:function(){return N
},getItems:function(){return N.find(Q.item).not("."+Q.clonedClass)
},move:function(T,S){return P.seekTo(M+T,S)
},next:function(S){return P.move(Q.size,S)
},prev:function(S){return P.move(-Q.size,S)
},begin:function(S){return P.seekTo(0,S)
},end:function(S){return P.seekTo(P.getSize()-1,S)
},focus:function(){D=P;
return P
},addItem:function(S){S=B(S),Q.circular?(N.children().last().before(S),N.children().first().replaceWith(S.clone().addClass(Q.clonedClass))):(N.append(S),G.removeClass("disabled")),O.trigger("onAddItem",[S]);
return P
},seekTo:function(T,X,V){T.jquery||(T*=1);
if(Q.circular&&T===0&&M==-1&&X!==0){return P
}if(!Q.circular&&T<0||T>P.getSize()||T<-1){return P
}var U=T;
T.jquery?T=P.getItems().index(T):U=P.getItems().eq(T);
var S=B.Event("onBeforeSeek");
if(!V){O.trigger(S,[T,X]);
if(S.isDefaultPrevented()||!U.length){return P
}}var W=L?{top:-U.position().top}:{left:-U.position().left};
M=T,D=P,X===undefined&&(X=Q.speed),N.animate(W,X,Q.easing,V||function(){O.trigger("onSeek",[T])
});
return P
}}),B.each(["onBeforeSeek","onSeek","onAddItem"],function(S,T){B.isFunction(Q[T])&&B(P).on(T,Q[T]),P[T]=function(U){U&&B(P).on(T,U);
return P
}
});
if(Q.circular){var K=P.getItems().slice(-1).clone().prependTo(N),J=P.getItems().eq(1).clone().appendTo(N);
K.add(J).addClass(Q.clonedClass),P.onBeforeSeek(function(T,S,U){if(!T.isDefaultPrevented()){if(S==-1){P.seekTo(K,U,function(){P.end(0)
});
return T.preventDefault()
}S==P.getSize()&&P.seekTo(J,U,function(){P.begin(0)
})
}});
var I=R.parents().add(R).filter(function(){if(B(this).css("display")==="none"){return !0
}});
I.length?(I.show(),P.seekTo(0,0,function(){}),I.hide()):P.seekTo(0,0,function(){})
}var H=E(R,Q.prev).click(function(S){S.stopPropagation(),P.prev()
}),G=E(R,Q.next).click(function(S){S.stopPropagation(),P.next()
});
Q.circular||(P.onBeforeSeek(function(T,S){setTimeout(function(){T.isDefaultPrevented()||(H.toggleClass(Q.disabledClass,S<=0),G.toggleClass(Q.disabledClass,S>=P.getSize()-1))
},1)
}),Q.initialIndex||H.addClass(Q.disabledClass)),P.getSize()<2&&H.add(G).addClass(Q.disabledClass),Q.mousewheel&&B.fn.mousewheel&&R.mousewheel(function(T,S){if(Q.mousewheel){P.move(S<0?1:-1,Q.wheelSpeed||50);
return !1
}});
if(Q.touch){var F={};
N[0].ontouchstart=function(T){var S=T.touches[0];
F.x=S.clientX,F.y=S.clientY
},N[0].ontouchmove=function(T){if(T.touches.length==1&&!N.is(":animated")){var S=T.touches[0],V=F.x-S.clientX,U=F.y-S.clientY;
P[L&&U>0||!L&&V>0?"next":"prev"](),T.preventDefault()
}}
}Q.keyboard&&B(document).on("keydown.scrollable",function(S){if(!(!Q.keyboard||S.altKey||S.ctrlKey||S.metaKey||B(S.target).is(":input"))){if(Q.keyboard!="static"&&D!=P){return 
}var T=S.keyCode;
if(L&&(T==38||T==40)){P.move(T==38?-1:1);
return S.preventDefault()
}if(!L&&(T==37||T==39)){P.move(T==37?-1:1);
return S.preventDefault()
}}}),Q.initialIndex&&P.seekTo(Q.initialIndex,0,function(){})
}B.fn.scrollable=function(F){var G=this.data("scrollable");
if(G){return G
}F=B.extend({},B.tools.scrollable.conf,F),this.each(function(){G=new C(B(this),F),B(this).data("scrollable",G)
});
return F.api?G:this
}
})(jQuery);
(function(B){var A=B.tools.scrollable;
A.autoscroll={conf:{autoplay:!0,interval:3000,autopause:!0}},B.fn.autoscroll=function(E){typeof E=="number"&&(E={interval:E});
var D=B.extend({},A.autoscroll.conf,E),C;
this.each(function(){var F=B(this).data("scrollable"),J=F.getRoot(),I,H=!1;
function G(){I&&clearTimeout(I),I=setTimeout(function(){F.next()
},D.interval)
}F&&(C=F),F.play=function(){I||(H=!1,J.on("onSeek",G),G())
},F.pause=function(){I=clearTimeout(I),J.off("onSeek",G)
},F.resume=function(){H||F.play()
},F.stop=function(){H=!0,F.pause()
},D.autopause&&J.add(F.getNaviButtons()).hover(F.pause,F.resume),D.autoplay&&F.play()
});
return D.api?C:this
}
})(jQuery);
(function(B){var A=B.tools.scrollable;
A.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};
function C(D,F){var E=B(F);
return E.length<2?E:D.parent().find(F)
}B.fn.navigator=function(E){typeof E=="string"&&(E={navi:E}),E=B.extend({},A.navigator.conf,E);
var D;
this.each(function(){var N=B(this).data("scrollable"),M=E.navi.jquery?E.navi:C(N.getRoot(),E.navi),L=N.getNaviButtons(),K=E.activeClass,J=E.history&&history.pushState,I=N.getConf().size;
N&&(D=N),N.getNaviButtons=function(){return L.add(M)
},J&&(history.pushState({i:0},""),B(window).on("popstate",function(O){var P=O.originalEvent.state;
P&&N.seekTo(P.i)
}));
function H(O,Q,P){N.seekTo(Q),P.preventDefault(),J&&history.pushState({i:Q},"")
}function G(){return M.find(E.naviItem||"> *")
}function F(O){var P=B("<"+(E.naviItem||"a")+"/>").click(function(Q){H(B(this),O,Q)
});
O===0&&P.addClass(K),E.indexed&&P.text(O+1),E.idPrefix&&P.attr("id",E.idPrefix+O);
return P.appendTo(M)
}G().length?G().each(function(O){B(this).click(function(P){H(B(this),O,P)
})
}):B.each(N.getItems(),function(O){O%I==0&&F(O)
}),N.onBeforeSeek(function(P,O){setTimeout(function(){if(!P.isDefaultPrevented()){var R=O/I,Q=G().eq(R);
Q.length&&G().removeClass(K).eq(R).addClass(K)
}},1)
}),N.onAddItem(function(O,Q){var P=N.getItems().index(Q);
P%I==0&&F(P)
})
});
return E.api?D:this
}
})(jQuery);
(function(h,A){var J=A.document;
function c(Q){var AD=J.createElement("div");
J.body.insertBefore(AD,null);
h.replaceWith(AD,'<script type="text/javascript">'+Q+"<\/script>")
}h=h||(function(Q){return{ajax:Q.ajax,$:function(AD){return Q(AD)[0]
},replaceWith:function(AD,AH){var AG=Q(AD)[0];
if(!AG){return 
}var AF=AG.nextSibling,AE=AG.parentNode;
Q(AG).remove();
if(AF){Q(AF).before(AH)
}else{Q(AE).append(AH)
}},onLoad:function(AD){Q(AD)
},copyAttrs:function(AJ,AF){var AH=Q(AF),AE=AJ.attributes;
for(var AG=0,AD=AE.length;
AG<AD;
AG++){if(AE[AG]&&AE[AG].value){try{AH.attr(AE[AG].name,AE[AG].value)
}catch(AI){}}}}}
})(A.jQuery);
h.copyAttrs=h.copyAttrs||function(){};
h.onLoad=h.onLoad||function(){throw"error: autoAsync cannot be used without jQuery or defining writeCaptureSupport.onLoad"
};
function u(AF,AE){for(var AD=0,Q=AF.length;
AD<Q;
AD++){if(AE(AF[AD])===false){return 
}}}function W(Q){return Object.prototype.toString.call(Q)==="[object Function]"
}function P(Q){return Object.prototype.toString.call(Q)==="[object String]"
}function V(AE,AD,Q){return Array.prototype.slice.call(AE,AD||0,Q||AE&&AE.length)
}function g(AF,AE){var Q=false;
u(AF,AD);
function AD(AG){return !(Q=AE(AG))
}return Q
}function p(Q){this._queue=[];
this._children=[];
this._parent=Q;
if(Q){Q._addChild(this)
}}p.prototype={_addChild:function(Q){this._children.push(Q)
},push:function(Q){this._queue.push(Q);
this._bubble("_doRun")
},pause:function(){this._bubble("_doPause")
},resume:function(){this._bubble("_doResume")
},_bubble:function(AD){var Q=this;
while(!Q[AD]){Q=Q._parent
}return Q[AD]()
},_next:function(){if(g(this._children,Q)){return true
}function Q(AE){return AE._next()
}var AD=this._queue.shift();
if(AD){AD()
}return !!AD
}};
function I(Q){if(Q){return new p(Q)
}p.call(this);
this.paused=0
}I.prototype=(function(){function Q(){}Q.prototype=p.prototype;
return new Q()
})();
I.prototype._doRun=function(){if(!this.running){this.running=true;
try{while(this.paused<1&&this._next()){}}finally{this.running=false
}}};
I.prototype._doPause=function(){this.paused++
};
I.prototype._doResume=function(){this.paused--;
this._doRun()
};
function q(){}q.prototype={_html:"",open:function(){this._opened=true;
if(this._delegate){this._delegate.open()
}},write:function(Q){if(this._closed){return 
}this._written=true;
if(this._delegate){this._delegate.write(Q)
}else{this._html+=Q
}},writeln:function(Q){this.write(Q+"\n")
},close:function(){this._closed=true;
if(this._delegate){this._delegate.close()
}},copyTo:function(Q){this._delegate=Q;
Q.foobar=true;
if(this._opened){Q.open()
}if(this._written){Q.write(this._html)
}if(this._closed){Q.close()
}}};
var E=(function(){var Q={f:J.getElementById};
try{Q.f.call(J,"abc");
return true
}catch(AD){return false
}})();
function m(Q){u(Q,function(AD){var AE=J.getElementById(AD.id);
if(!AE){L("<proxyGetElementById - finish>","no element in writen markup with id "+AD.id);
return 
}u(AD.el.childNodes,function(AF){AE.appendChild(AF)
});
if(AE.contentWindow){A.setTimeout(function(){AD.el.contentWindow.document.copyTo(AE.contentWindow.document)
},1)
}h.copyAttrs(AD.el,AE)
})
}function T(AD,Q){if(Q&&Q[AD]===false){return false
}return Q&&Q[AD]||O[AD]
}function Z(AD,AM){var AI=[],AH=T("proxyGetElementById",AM),AK=T("writeOnGetElementById",AM),Q={write:J.write,writeln:J.writeln,finish:function(){},out:""};
AD.state=Q;
J.write=AL;
J.writeln=AE;
if(AH||AK){Q.getEl=J.getElementById;
J.getElementById=AF;
if(AK){findEl=AJ
}else{findEl=AG;
Q.finish=function(){m(AI)
}
}}function AL(AN){Q.out+=AN
}function AE(AN){Q.out+=AN+"\n"
}function AG(AO){var AN=J.createElement("div");
AI.push({id:AO,el:AN});
AN.contentWindow={document:new q()};
return AN
}function AJ(AP){var AN=h.$(AD.target);
var AO=J.createElement("div");
AN.parentNode.insertBefore(AO,AN);
h.replaceWith(AO,Q.out);
Q.out="";
return E?Q.getEl.call(J,AP):Q.getEl(AP)
}function AF(AO){var AN=E?Q.getEl.call(J,AO):Q.getEl(AO);
return AN||findEl(AO)
}return Q
}function z(Q){J.write=Q.write;
J.writeln=Q.writeln;
if(Q.getEl){J.getElementById=Q.getEl
}return Q.out
}function r(Q){return Q&&Q.replace(/^\s*<!(\[CDATA\[|--)/,"").replace(/(\]\]|--)>\s*$/,"")
}function B(){}function D(AD,Q){console.error("Error",Q,"executing code:",AD)
}var L=W(A.console&&console.error)?D:B;
function w(AE,AD,Q){var AF=Z(AD,Q);
try{c(r(AE))
}catch(AG){L(AE,AG)
}finally{z(AF)
}return AF
}function t(AD){var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(AD);
return Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)
}function x(Q){return new RegExp("[\\s\\r\\n]"+Q+"=(?:([\"'])([\\s\\S]*?)\\1|([^\\s>]+))","i")
}function K(Q){var AD=x(Q);
return function(AE){var AF=AD.exec(AE)||[];
return AF[2]||AF[3]
}
}var S=/(<script[^>]*>)([\s\S]*?)<\/script>/ig,e=/<script[^>]*\/>/ig,N=x("src"),AB=K("src"),R=K("type"),AC=K("language"),f="__document_write_ajax_callbacks__",d="__document_write_ajax_div-",G="window['"+f+"']['%d']();",M=A[f]={},Y='<script type="text/javascript">'+G+"<\/script>",l=0;
function C(){return(++l).toString()
}function k(AD,AE){var Q;
if(W(AD)){Q=AD;
AD=null
}AD=AD||{};
Q=Q||AD&&AD.done;
AD.done=AE?function(){AE(Q)
}:Q;
return AD
}var b=new I();
var a=[];
var F=window._debugWriteCapture?function(){}:function(Q,AE,AD){a.push({type:Q,src:AE,data:AD})
};
var o=window._debugWriteCapture?function(){}:function(){a.push(arguments)
};
function AA(Q){var AD=C();
M[AD]=function(){Q();
delete M[AD]
};
return AD
}function n(Q){return Y.replace(/%d/,AA(Q))
}function v(AH,AL,AE,AJ){var AI=AE&&new I(AE)||b;
AL=k(AL);
var AG=T("done",AL);
var Q="";
var AD=T("fixUrls",AL);
if(!W(AD)){AD=function(AM){return AM
}
}if(W(AG)){Q=n(function(){AI.push(AG)
})
}return AH.replace(S,AK).replace(e,AF)+Q;
function AF(AM){return AK(AM,AM.substring(0,AM.length-2)+">","")
}function AK(AO,AZ,AN){var AS=AB(AZ),AR=R(AZ)||"",Ag=AC(AZ)||"",Af=(!AR&&!Ag)||AR.toLowerCase().indexOf("javascript")!==-1||Ag.toLowerCase().indexOf("javascript")!==-1;
F("replace",AS,AO);
if(!Af){return AO
}var Aa=AA(AU),AT=d+Aa,AY,AQ={target:"#"+AT,parent:AJ};
function AU(){AI.push(AY)
}if(AS){AS=AD(AS);
AZ=AZ.replace(N,"");
if(t(AS)){AY=Ae
}else{if(T("asyncAll",AL)){AY=Ad()
}else{AY=AX
}}}else{AY=Ac
}function Ac(){AM(AN)
}function AX(){h.ajax({cache:true,url:AS,type:"GET",dataType:"text",async:false,success:function(Ah){AM(Ah)
}})
}function AP(Aj,Ah,Ai){L("<XHR for "+AS+">",Ai);
AI.resume()
}function AV(){return n(function(){AI.resume()
})
}function Ad(){var Aj,Ai;
function Ah(Al,Ak){if(!Aj){Ai=Al;
return 
}try{AM(Al,AV())
}catch(Am){L(Al,Am)
}}h.ajax({cache:true,url:AS,type:"GET",dataType:"text",async:true,success:Ah,error:AP});
return function(){Aj=true;
if(Ai){AM(Ai)
}else{AI.pause()
}}
}function Ae(Ah){var Aj=Z(AQ,AL);
AI.pause();
F("pause",AS);
h.ajax({cache:true,url:AS,type:"GET",dataType:"script",success:Ai,error:AP});
function Ai(Am,Al,Ak){F("out",AS,Aj.out);
AW(z(Aj),n(Aj.finish)+AV());
F("resume",AS)
}}function AM(Ai,Ah){var Aj=w(Ai,AQ,AL);
Ah=n(Aj.finish)+(Ah||"");
AW(Aj.out,Ah)
}function Ab(Ah){var Aj={};
for(var Ai in Ah){if(Ah.hasOwnProperty(Ai)){Aj[Ai]=Ah[Ai]
}}delete Aj.done;
return Aj
}function AW(Ai,Ah){h.replaceWith(AQ.target,v(Ai,Ab(AL),AI,AQ)+(Ah||""))
}return'<div style="display: none" id="'+AT+'"></div>'+AZ+G.replace(/%d/,Aa)+"<\/script>"
}}function j(AD,AE){var Q=b;
u(AD,function(AF){Q.push(AG);
function AG(){AF.action(v(AF.html,AF.options,Q),AF)
}});
if(AE){Q.push(AE)
}}function y(Q){var AD=Q;
while(AD&&AD.nodeType===1){Q=AD;
AD=AD.lastChild;
while(AD&&AD.nodeType!==1){AD=AD.previousSibling
}}return Q
}function H(Q){var AE=J.write,AH=J.writeln,AD,AF=[];
J.writeln=function(AI){J.write(AI+"\n")
};
var AG;
J.write=function(AJ){var AI=y(J.body);
if(AI!==AD){AD=AI;
AF.push(AG={el:AI,out:[]})
}AG.out.push(AJ)
};
h.onLoad(function(){var AL,AO,AJ,AN,AM;
Q=k(Q);
AM=Q.done;
Q.done=function(){J.write=AE;
J.writeln=AH;
if(AM){AM()
}};
for(var AK=0,AI=AF.length;
AK<AI;
AK++){AL=AF[AK].el;
AO=J.createElement("div");
AL.parentNode.insertBefore(AO,AL.nextSibling);
AJ=AF[AK].out.join("");
AN=AI-AK===1?v(AJ,Q):v(AJ);
h.replaceWith(AO,AN)
}})
}function X(AH){var AI=document.getElementsByTagName("script"),AO,AD,AM,Q,AE,AG,AF=0,AK=AH?n(function(){if(++AF>=AJ.length){AH()
}}):"",AJ=[];
for(var AL=0,AN=AI.length;
AL<AN;
AL++){AO=AI[AL];
AE=AO.getAttribute("extsrc");
AG=AO.getAttribute("asyncsrc");
if(AE||AG){AJ.push({ext:AE,async:AG,s:AO})
}}for(AL=0,AN=AJ.length;
AL<AN;
AL++){AD=AJ[AL];
if(AD.ext){AM='<script type="text/javascript" src="'+AD.ext+'"> <\/script>';
h.replaceWith(AD.s,v(AM)+AK)
}else{if(AD.async){AM='<script type="text/javascript" src="'+AD.async+'"> <\/script>';
h.replaceWith(AD.s,v(AM,{asyncAll:true},new I())+AK)
}}}}var U="writeCapture";
var O=A[U]={_original:A[U],fixUrls:function(Q){return Q.replace(/&amp;/g,"&")
},noConflict:function(){A[U]=this._original;
return this
},debug:a,proxyGetElementById:false,_forTest:{Q:I,GLOBAL_Q:b,$:h,matchAttr:K,slice:V,capture:Z,uncapture:z,captureWrite:w},replaceWith:function(Q,AE,AD){h.replaceWith(Q,v(AE,AD))
},html:function(Q,AF,AD){var AE=h.$(Q);
AE.innerHTML="<span/>";
h.replaceWith(AE.firstChild,v(AF,AD))
},load:function(Q,AE,AD){h.ajax({cache:true,url:AE,dataType:"text",type:"GET",success:function(AF){O.html(Q,AF,AD)
}})
},extsrc:X,autoAsync:H,sanitize:v,sanitizeSerial:j}
})(this.writeCaptureSupport,this);
jQuery.fn.textPlaceholder=function(){return this.each(function(){var B=this;
if(B.placeholder&&"placeholder" in document.createElement(B.tagName)){return 
}var C=B.getAttribute("placeholder");
var A=jQuery(B);
if(B.value===""||B.value==C){A.addClass("text-placeholder");
B.value=C
}A.focus(function(){if(A.hasClass("text-placeholder")){this.value="";
A.removeClass("text-placeholder")
}});
A.blur(function(){if(this.value===""){A.addClass("text-placeholder");
this.value=C
}else{A.removeClass("text-placeholder")
}});
B.form&&jQuery(B.form).submit(function(){if(A.hasClass("text-placeholder")){B.value=""
}})
})
};
(function(D){D.timeago=function(G){if(G instanceof Date){return A(G)
}else{if(typeof G==="string"){return A(D.timeago.parse(G))
}else{return A(D.timeago.datetime(G))
}}};
var F=D.timeago;
D.extend(D.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",numbers:[]}},inWords:function(L){var M=this.settings.strings;
var I=M.prefixAgo;
var Q=M.suffixAgo;
if(this.settings.allowFuture){if(L<0){I=M.prefixFromNow;
Q=M.suffixFromNow
}L=Math.abs(L)
}var O=L/1000;
var G=O/60;
var N=G/60;
var P=N/24;
var J=P/365;
function H(R,T){var S=D.isFunction(R)?R(T,L):R;
var U=(M.numbers&&M.numbers[T])||T;
return S.replace(/%d/i,U)
}var K=O<45&&H(M.seconds,Math.round(O))||O<90&&H(M.minute,1)||G<45&&H(M.minutes,Math.round(G))||G<90&&H(M.hour,1)||N<24&&H(M.hours,Math.round(N))||N<48&&H(M.day,1)||P<30&&H(M.days,Math.floor(P))||P<60&&H(M.month,1)||P<365&&H(M.months,Math.floor(P/30))||J<2&&H(M.year,1)||H(M.years,Math.floor(J));
return D.trim([I,K,Q].join(" "))
},parse:function(H){var G=D.trim(H);
G=G.replace(/\.\d\d\d+/,"");
G=G.replace(/-/,"/").replace(/-/,"/");
G=G.replace(/T/," ").replace(/Z/," UTC");
G=G.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
return new Date(G)
},datetime:function(H){var I=D(H).get(0).tagName.toLowerCase()==="time";
var G=I?D(H).attr("datetime"):D(H).attr("title");
return F.parse(G)
}});
D.fn.timeago=function(){var H=this;
H.each(C);
var G=F.settings;
if(G.refreshMillis>0){setInterval(function(){H.each(C)
},G.refreshMillis)
}return H
};
function C(){var G=B(this);
if(!isNaN(G.datetime)){D(this).text(A(G.datetime))
}return this
}function B(G){G=D(G);
if(!G.data("timeago")){G.data("timeago",{datetime:F.datetime(G)});
var H=D.trim(G.text());
if(H.length>0){G.attr("title",H)
}}return G.data("timeago")
}function A(G){return F.inWords(E(G))
}function E(G){return(new Date().getTime()-G.getTime())
}document.createElement("abbr");
document.createElement("time")
}(jQuery));
(function(A){A.fn.upprev=function(C){function B(){var E=0;
if(typeof (window.pageYOffset)=="number"){E=window.pageYOffset
}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){E=document.body.scrollTop
}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){E=document.documentElement.scrollTop
}}}return E
}var D={};
var C=A.extend(D,C);
return this.each(function(){var E=false;
var F=true;
A(window).scroll(function(){var G=B()+A(window).height()>=A(document).height()*55/100;
if(G&&!E){A("#upprev_box").stop().animate({right:"0px"});
F=false
}else{if(E&&B()==0){E=false
}else{if(!F){F=true;
A("#upprev_box").stop().animate({right:"-400px"})
}}}});
A("#upprev_close").click(function(){A("#upprev_box").stop().animate({right:"-400px"});
E=true;
F=true
})
})
}
})(jQuery);
(function(A){A.fn.playOverlay=function(C,E){function D(G,H){A(G).append('<iframe class="video-player" type="text/html" width="'+H.width+'" height="'+H.height+'" src="'+H.src+'&amp;wmode=opaque" frameborder="0"></iframe>')
}function B(G,H){A(G).append('<!-- and the Omniture tracker --><object id="myExperience'+H.src+'" name="myExperience'+H.src+'" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="'+H.width+'" /><param name="height" value="'+H.height+'" /><param name="playerID" value="1140772469001" /><param name="playerKey" value="AQ~~%2CAAAAAAEDRq0~%2CqRcfDOX2mNtWW87VePrJiaFRXUo43tGn" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="autoStart" value="'+C+'" /><param name="@videoPlayer" value="'+H.src+'" /><param name="wmode" value="opaque" /><param name="includeAPI" value="true"/> <!-- include the SMART player API --><param name="templateLoadHandler" value="onPlayerLoaded"/> <!-- onPlayerLoaded is the hook for the Javascript Omniture tracker  --></object>')
}function F(G,H){A(G).append('<object class="video-player" width="'+H.width+'" height="'+H.height+'"><param name="movie" value="'+H.src+'"/><param name="width" value="'+H.width+'" /><param name="allowFullScreen" value="true"/><embed src="'+H.src+'" type="application/x-shockwave-flash" width="'+H.width+'" height="'+H.height+'" allowFullScreen="true"></embed></object>')
}return this.each(function(){A(this).click(function(H){H.preventDefault();
if(A(this).find("object, iframe").length>0){return false
}var I=A.parseJSON(A(this).attr("data-video"));
if(I.ignore&&!E){return false
}if(I.type=="brightcove"){B(this,I);
brightcove.createExperiences()
}else{if(I.type=="youtube"){var J=I.src.split("v=")[1];
if(J==undefined){J=I.src.split("/v/")[1]
}var G=J.indexOf("&");
if(G!=-1){J=J.substring(0,G)
}I.src="http://www.youtube.com/embed/"+J+"?fs=1"+(C?"&autoplay=1":"");
D(this,I)
}else{if(I.type=="vimeo"){I.src="http://player.vimeo.com/video/"+I.src.replace("http://vimeo.com/","")+(C?"?autoplay=true":"");
D(this,I)
}else{if(I.type=="hulu"){F(this,I)
}}}}A(this).find(".video-details, img, a").hide()
})
})
}
})(jQuery);
(function(A){A.fn.slides=function(B){B=A.extend({},A.fn.slides.option,B);
return this.each(function(){A("."+B.container,A(this)).children().wrapAll('<div class="slides_control"/>');
var V=A(this),J=A(".slides_control",V),Z=J.children().size(),Q=J.children().outerWidth(),M=J.children().outerHeight(),D=B.start-1,L=B.effect.indexOf(",")<0?B.effect:B.effect.replace(" ","").split(",")[0],S=B.effect.indexOf(",")<0?L:B.effect.replace(" ","").split(",")[1],O=0,N=0,C=0,P=0,U,H,I,X,W,T,K,F;
function E(c,b,a){if(!H&&U){H=true;
B.animationStart(P+1);
switch(c){case"next":N=P;
O=P+1;
O=Z===O?0:O;
X=Q*2;
c=-Q*2;
P=O;
break;
case"prev":N=P;
O=P-1;
O=O===-1?Z-1:O;
X=0;
c=0;
P=O;
break;
case"pagination":O=parseInt(a,10);
N=A("."+B.paginationClass+" li."+B.currentClass+" a",V).attr("href").match("[^#/]+$");
if(O>N){X=Q*2;
c=-Q*2
}else{X=0;
c=0
}P=O;
break
}if(b==="fade"){if(B.crossfade){J.children(":eq("+O+")",V).css({zIndex:10}).fadeIn(B.fadeSpeed,B.fadeEasing,function(){if(B.autoHeight){J.animate({height:J.children(":eq("+O+")",V).outerHeight()},B.autoHeightSpeed,function(){J.children(":eq("+N+")",V).css({display:"none",zIndex:0});
J.children(":eq("+O+")",V).css({zIndex:0});
B.animationComplete(O+1);
H=false
})
}else{J.children(":eq("+N+")",V).css({display:"none",zIndex:0});
J.children(":eq("+O+")",V).css({zIndex:0});
B.animationComplete(O+1);
H=false
}})
}else{J.children(":eq("+N+")",V).fadeOut(B.fadeSpeed,B.fadeEasing,function(){if(B.autoHeight){J.animate({height:J.children(":eq("+O+")",V).outerHeight()},B.autoHeightSpeed,function(){J.children(":eq("+O+")",V).fadeIn(B.fadeSpeed,B.fadeEasing)
})
}else{J.children(":eq("+O+")",V).fadeIn(B.fadeSpeed,B.fadeEasing,function(){if(A.browser.msie){A(this).get(0).style.removeAttribute("filter")
}})
}B.animationComplete(O+1);
H=false
})
}}else{J.children(":eq("+O+")").css({left:X,display:"block"});
if(B.autoHeight){J.animate({left:c,height:J.children(":eq("+O+")").outerHeight()},B.slideSpeed,B.slideEasing,function(){J.css({left:-Q});
J.children(":eq("+O+")").css({left:Q,zIndex:5});
J.children(":eq("+N+")").css({left:Q,display:"none",zIndex:0});
B.animationComplete(O+1);
H=false
})
}else{J.animate({left:c},B.slideSpeed,B.slideEasing,function(){J.css({left:-Q});
J.children(":eq("+O+")").css({left:Q,zIndex:5});
J.children(":eq("+N+")").css({left:Q,display:"none",zIndex:0});
B.animationComplete(O+1);
H=false
})
}}if(B.pagination){A("."+B.paginationClass+" li."+B.currentClass,V).removeClass(B.currentClass);
A("."+B.paginationClass+" li:eq("+O+")",V).addClass(B.currentClass)
}}}function R(){clearInterval(V.data("interval"))
}function G(){if(B.pause){clearTimeout(V.data("pause"));
clearInterval(V.data("interval"));
K=setTimeout(function(){clearTimeout(V.data("pause"));
F=setInterval(function(){E("next",L)
},B.play);
V.data("interval",F)
},B.pause);
V.data("pause",K)
}else{R()
}}if(Z<2){return 
}if(D<0){D=0
}if(D>Z){D=Z-1
}if(B.start){P=D
}if(B.randomize){J.randomize()
}A("."+B.container,V).css({overflow:"hidden",position:"relative"});
J.children().css({position:"absolute",top:0,left:J.children().outerWidth(),zIndex:0,display:"none"});
J.css({position:"relative",width:(Q*3),height:M,left:-Q});
A("."+B.container,V).css({display:"block"});
if(B.autoHeight){J.children().css({height:"auto"});
J.animate({height:J.children(":eq("+D+")").outerHeight()},B.autoHeightSpeed)
}if(B.preload&&J.find("img:eq("+D+")").length){A("."+B.container,V).css({background:"url("+B.preloadImage+") no-repeat 50% 50%"});
var Y=J.find("img:eq("+D+")").attr("src")+"?"+(new Date()).getTime();
if(A("img",V).parent().attr("class")!="slides_control"){T=J.children(":eq(0)")[0].tagName.toLowerCase()
}else{T=J.find("img:eq("+D+")")
}J.find("img:eq("+D+")").attr("src",Y).load(function(){J.find(T+":eq("+D+")").fadeIn(B.fadeSpeed,B.fadeEasing,function(){A(this).css({zIndex:5});
A("."+B.container,V).css({background:""});
U=true;
B.slidesLoaded()
})
})
}else{J.children(":eq("+D+")").fadeIn(B.fadeSpeed,B.fadeEasing,function(){U=true;
B.slidesLoaded()
})
}if(B.bigTarget){J.children().css({cursor:"pointer"});
J.children().click(function(){E("next",L);
return false
})
}if(B.hoverPause&&B.play){J.bind("mouseover",function(){R()
});
J.bind("mouseleave",function(){G()
})
}if(B.generateNextPrev){A("."+B.container,V).after('<a href="#" class="'+B.prev+'">Prev</a>');
A("."+B.prev,V).after('<a href="#" class="'+B.next+'">Next</a>')
}A("."+B.next,V).click(function(a){a.preventDefault();
if(B.play){G()
}E("next",L)
});
A("."+B.prev,V).click(function(a){a.preventDefault();
if(B.play){G()
}E("prev",L)
});
if(B.generatePagination){if(B.prependPagination){V.prepend("<ul class="+B.paginationClass+"></ul>")
}else{V.append("<ul class="+B.paginationClass+"></ul>")
}J.children().each(function(){A("."+B.paginationClass,V).append('<li><a href="#'+C+'">'+(C+1)+"</a></li>");
C++
})
}else{A("."+B.paginationClass+" li a",V).each(function(){A(this).attr("href","#"+C);
C++
})
}A("."+B.paginationClass+" li:eq("+D+")",V).addClass(B.currentClass);
A("."+B.paginationClass+" li a",V).click(function(){if(B.play){G()
}I=A(this).attr("href").match("[^#/]+$");
if(P!=I){E("pagination",S,I)
}return false
});
A("a.link",V).click(function(){if(B.play){G()
}I=A(this).attr("href").match("[^#/]+$")-1;
if(P!=I){E("pagination",S,I)
}return false
});
if(B.play){F=setInterval(function(){E("next",L)
},B.play);
V.data("interval",F)
}})
};
A.fn.slides.option={preload:false,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:false,next:"next",prev:"prev",pagination:true,generatePagination:true,prependPagination:false,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:false,randomize:false,play:0,pause:0,hoverPause:false,autoHeight:true,autoHeightSpeed:350,bigTarget:false,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}};
A.fn.randomize=function(C){function B(){return(Math.round(Math.random())-0.5)
}return(A(this).each(function(){var F=A(this);
var E=F.children();
var D=E.length;
if(D>1){E.hide();
var G=[];
for(i=0;
i<D;
i++){G[G.length]=i
}G=G.sort(B);
A.each(G,function(I,H){var K=E.eq(H);
var J=K.clone(true);
J.show().appendTo(F);
if(C!==undefined){C(K,J)
}K.remove()
})
}}))
}
})(jQuery);
(function(A){A.fn.verticalAlign=function(B){var C={offset:0,position:"top",percentage:"50%"};
if(B){A.extend(C,B)
}return this.each(function(E){var F=A(this).height();
var G=A(this).outerHeight();
var D=(F+(G-F))/2;
A(this).css("margin-top",((C.position=="top")?"-":"")+(D+C.offset)+"px");
A(this).css("top",C.percentage);
A(this).css("position","absolute")
})
}
})(jQuery);
$.widget("ui.floattip",{options:{stage:{element:null,paddingX:15,paddingY:15},tip:{element:null,paddingX:20,paddingY:20}},destroy:function(){$.widget.prototype.apply(this,arguments)
},_create:function(){this.tip=$(this.element).find(this.options.tip.element);
this.bindHover()
},bindHover:function(){var B=this;
var A=$(this.element);
var C=this.tip;
A.bind("mousemove",function(E){var D=B.calculatePosition(E);
C.css(D);
C.show()
});
A.bind("mouseout",function(D){C.hide()
})
},calculatePosition:function(A){var J=$(this.element);
var H={};
var E=this.options.tip.paddingX;
var C=this.options.tip.paddingY;
var D=J.offset();
H.left=A.pageX-D.left+E;
H.top=A.pageY-D.top+C;
if(this.options.stage.element){var I=$(this.options.stage.element);
var G=this.tip;
var B=I.offset();
if((A.pageX-B.left)+G.width()+E+this.options.stage.paddingX>I.width()){H.left=H.left-(3*E)-G.width()
}if((A.pageY-B.top)+G.height()+C+this.options.stage.paddingY>I.height()){H.top=H.top-(2*C)-G.height()
}}for(var F in H){H[F]=H[F]+"px"
}return H
}});
(function(A){A.fn.spin=function(D,C){var B={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}};
if(Spinner){return this.each(function(){var F=A(this),E=F.data();
if(E.spinner){E.spinner.stop();
delete E.spinner
}if(D!==false){if(typeof D==="string"){if(D in B){D=B[D]
}else{D={}
}if(C){D.color=C
}}if(A.browser.msie&&(A.browser.version==7||A.browser.version==8)){E.spinner=null
}else{E.spinner=new Spinner(A.extend({color:F.css("color")},D)).spin(this)
}}})
}else{}}
})(jQuery);
(function(Af){var AX,AQ,AP,Ac,AJ,AZ,AI,AW,AM,AL,AT=0,Ad={},AV=[],AU=0,Ae={},AY=[],AG=null,AO=new Image,AE=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,R=/[^\.]\.(swf)\s*$/i,AD,AC=1,AN=0,AR="",AS,Aa,Ab=false,AK=Af.extend(Af("<div/>")[0],{prop:0}),AB=Af.browser.msie&&Af.browser.version<7&&!window.XMLHttpRequest,AA=function(){AQ.hide();
AO.onerror=AO.onload=null;
AG&&AG.abort();
AX.empty()
},x=function(){if(false===Ad.onError(AV,AT,Ad)){AQ.hide();
Ab=false
}else{Ad.titleShow=false;
Ad.width="auto";
Ad.height="auto";
AX.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
AH()
}},AF=function(){var B=AV[AT],I,E,D,G,F,A;
AA();
Ad=Af.extend({},Af.fn.fancybox.defaults,typeof Af(B).data("fancybox")=="undefined"?Ad:Af(B).data("fancybox"));
A=Ad.onStart(AV,AT,Ad);
if(A===false){Ab=false
}else{if(typeof A=="object"){Ad=Af.extend(Ad,A)
}D=Ad.title||(B.nodeName?Af(B).attr("title"):B.title)||"";
if(B.nodeName&&!Ad.orig){Ad.orig=Af(B).children("img:first").length?Af(B).children("img:first"):Af(B)
}if(D===""&&Ad.orig&&Ad.titleFromAlt){D=Ad.orig.attr("alt")
}I=Ad.href||(B.nodeName?Af(B).attr("href"):B.href)||null;
if(/^(?:javascript)/i.test(I)||I=="#"){I=null
}if(Ad.type){E=Ad.type;
if(!I){I=Ad.content
}}else{if(Ad.content){E="html"
}else{if(I){E=I.match(AE)?"image":I.match(R)?"swf":Af(B).hasClass("iframe")?"iframe":I.indexOf("#")===0?"inline":"ajax"
}}}if(E){if(E=="inline"){B=I.substr(I.indexOf("#"));
E=Af(B).length>0?"inline":"ajax"
}Ad.type=E;
Ad.href=I;
Ad.title=D;
if(Ad.autoDimensions){if(Ad.type=="html"||Ad.type=="inline"||Ad.type=="ajax"){Ad.width="auto";
Ad.height="auto"
}else{Ad.autoDimensions=false
}}if(Ad.modal){Ad.overlayShow=true;
Ad.hideOnOverlayClick=false;
Ad.hideOnContentClick=false;
Ad.enableEscapeButton=false;
Ad.showCloseButton=false
}Ad.padding=parseInt(Ad.padding,10);
Ad.margin=parseInt(Ad.margin,10);
AX.css("padding",Ad.padding+Ad.margin);
Af(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){Af(this).replaceWith(AZ.children())
});
switch(E){case"html":AX.html(Ad.content);
AH();
break;
case"inline":if(Af(B).parent().is("#fancybox-content")===true){Ab=false;
break
}Af('<div class="fancybox-inline-tmp" />').hide().insertBefore(Af(B)).bind("fancybox-cleanup",function(){Af(this).replaceWith(AZ.children())
}).bind("fancybox-cancel",function(){Af(this).replaceWith(AX.children())
});
Af(B).appendTo(AX);
AH();
break;
case"image":Ab=false;
Af.fancybox.showActivity();
AO=new Image;
AO.onerror=function(){x()
};
AO.onload=function(){Ab=true;
AO.onerror=AO.onload=null;
Ad.width=AO.width;
Ad.height=AO.height;
Af("<img />").attr({id:"fancybox-img",src:AO.src,alt:Ad.title}).appendTo(AX);
w()
};
AO.src=I;
break;
case"swf":Ad.scrolling="no";
G='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+Ad.width+'" height="'+Ad.height+'"><param name="movie" value="'+I+'"></param>';
F="";
Af.each(Ad.swf,function(J,K){G+='<param name="'+J+'" value="'+K+'"></param>';
F+=" "+J+'="'+K+'"'
});
G+='<embed src="'+I+'" type="application/x-shockwave-flash" width="'+Ad.width+'" height="'+Ad.height+'"'+F+"></embed></object>";
AX.html(G);
AH();
break;
case"ajax":Ab=false;
Af.fancybox.showActivity();
Ad.ajax.win=Ad.ajax.success;
AG=Af.ajax(Af.extend({},Ad.ajax,{url:I,data:Ad.ajax.data||{},error:function(J){J.status>0&&x()
},success:function(J,K,L){if((typeof L=="object"?L:AG).status==200){if(typeof Ad.ajax.win=="function"){A=Ad.ajax.win(I,J,K,L);
if(A===false){AQ.hide();
return 
}else{if(typeof A=="string"||typeof A=="object"){J=A
}}}AX.html(J);
AH()
}}}));
break;
case"iframe":w()
}}else{x()
}}},AH=function(){var A=Ad.width,B=Ad.height;
A=A.toString().indexOf("%")>-1?parseInt((Af(window).width()-Ad.margin*2)*parseFloat(A)/100,10)+"px":A=="auto"?"auto":A+"px";
B=B.toString().indexOf("%")>-1?parseInt((Af(window).height()-Ad.margin*2)*parseFloat(B)/100,10)+"px":B=="auto"?"auto":B+"px";
AX.wrapInner('<div style="width:'+A+";height:"+B+";overflow: "+(Ad.scrolling=="auto"?"auto":Ad.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');
Ad.width=AX.width();
Ad.height=AX.height();
w()
},w=function(){var A,B;
AQ.hide();
if(Ac.is(":visible")&&false===Ae.onCleanup(AY,AU,Ae)){Af.event.trigger("fancybox-cancel");
Ab=false
}else{Ab=true;
Af(AZ.add(AP)).unbind();
Af(window).unbind("resize.fb scroll.fb");
Af(document).unbind("keydown.fb");
Ac.is(":visible")&&Ae.titlePosition!=="outside"&&Ac.css("height",Ac.height());
AY=AV;
AU=AT;
Ae=Ad;
if(Ae.overlayShow){AP.css({"background-color":Ae.overlayColor,opacity:Ae.overlayOpacity,cursor:Ae.hideOnOverlayClick?"pointer":"auto",height:Af(document).height()});
if(!AP.is(":visible")){AB&&Af("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"
}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"
});
AP.show()
}}else{AP.hide()
}Aa=P();
AR=Ae.title||"";
AN=0;
AW.empty().removeAttr("style").removeClass();
if(Ae.titleShow!==false){if(Af.isFunction(Ae.titleFormat)){A=Ae.titleFormat(AR,AY,AU,Ae)
}else{A=AR&&AR.length?Ae.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+AR+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+Ae.titlePosition+'">'+AR+"</div>":false
}AR=A;
if(!(!AR||AR==="")){AW.addClass("fancybox-title-"+Ae.titlePosition).html(AR).appendTo("body").show();
switch(Ae.titlePosition){case"inside":AW.css({width:Aa.width-Ae.padding*2,marginLeft:Ae.padding,marginRight:Ae.padding});
AN=AW.outerHeight(true);
AW.appendTo(AJ);
Aa.height+=AN;
break;
case"over":AW.css({marginLeft:Ae.padding,width:Aa.width-Ae.padding*2,bottom:Ae.padding}).appendTo(AJ);
break;
case"float":AW.css("left",parseInt((AW.width()-Aa.width-40)/2,10)*-1).appendTo(Ac);
break;
default:AW.css({width:Aa.width-Ae.padding*2,paddingLeft:Ae.padding,paddingRight:Ae.padding}).appendTo(Ac)
}}}AW.hide();
if(Ac.is(":visible")){Af(AI.add(AM).add(AL)).hide();
A=Ac.position();
AS={top:A.top,left:A.left,width:Ac.width(),height:Ac.height()};
B=AS.width==Aa.width&&AS.height==Aa.height;
AZ.fadeTo(Ae.changeFade,0.3,function(){var D=function(){AZ.html(AX.contents()).fadeTo(Ae.changeFade,1,k)
};
Af.event.trigger("fancybox-change");
AZ.empty().removeAttr("filter").css({"border-width":Ae.padding,width:Aa.width-Ae.padding*2,height:Ad.autoDimensions?"auto":Aa.height-AN-Ae.padding*2});
if(B){D()
}else{AK.prop=0;
Af(AK).animate({prop:1},{duration:Ae.changeSpeed,easing:Ae.easingChange,step:g,complete:D})
}})
}else{Ac.removeAttr("style");
AZ.css("border-width",Ae.padding);
if(Ae.transitionIn=="elastic"){AS=a();
AZ.html(AX.contents());
Ac.show();
if(Ae.opacity){Aa.opacity=0
}AK.prop=0;
Af(AK).animate({prop:1},{duration:Ae.speedIn,easing:Ae.easingIn,step:g,complete:k})
}else{Ae.titlePosition=="inside"&&AN>0&&AW.show();
AZ.css({width:Aa.width-Ae.padding*2,height:Ad.autoDimensions?"auto":Aa.height-AN-Ae.padding*2}).html(AX.contents());
Ac.css(Aa).fadeIn(Ae.transitionIn=="none"?0:Ae.speedIn,k)
}}}},H=function(){if(Ae.enableEscapeButton||Ae.enableKeyboardNav){Af(document).bind("keydown.fb",function(A){if(A.keyCode==27&&Ae.enableEscapeButton){A.preventDefault();
Af.fancybox.close()
}else{if((A.keyCode==37||A.keyCode==39)&&Ae.enableKeyboardNav&&A.target.tagName!=="INPUT"&&A.target.tagName!=="TEXTAREA"&&A.target.tagName!=="SELECT"){A.preventDefault();
Af.fancybox[A.keyCode==37?"prev":"next"]()
}}})
}if(Ae.showNavArrows){if(Ae.cyclic&&AY.length>1||AU!==0){AM.show()
}if(Ae.cyclic&&AY.length>1||AU!=AY.length-1){AL.show()
}}else{AM.hide();
AL.hide()
}},k=function(){if(!Af.support.opacity){AZ.get(0).style.removeAttribute("filter");
Ac.get(0).style.removeAttribute("filter")
}Ad.autoDimensions&&AZ.css("height","auto");
Ac.css("height","auto");
AR&&AR.length&&AW.show();
Ae.showCloseButton&&AI.show();
H();
Ae.hideOnContentClick&&AZ.bind("click",Af.fancybox.close);
Ae.hideOnOverlayClick&&AP.bind("click",Af.fancybox.close);
Af(window).bind("resize.fb",Af.fancybox.resize);
Ae.centerOnScroll&&Af(window).bind("scroll.fb",Af.fancybox.center);
if(Ae.type=="iframe"){Af('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(Af.browser.msie?'allowtransparency="true""':"")+' scrolling="'+Ad.scrolling+'" src="'+Ae.href+'"></iframe>').appendTo(AZ)
}Ac.show();
Ab=false;
Af.fancybox.center();
Ae.onComplete(AY,AU,Ae);
var A,B;
if(AY.length-1>AU){A=AY[AU+1].href;
if(typeof A!=="undefined"&&A.match(AE)){B=new Image;
B.src=A
}}if(AU>0){A=AY[AU-1].href;
if(typeof A!=="undefined"&&A.match(AE)){B=new Image;
B.src=A
}}},g=function(A){var B={width:parseInt(AS.width+(Aa.width-AS.width)*A,10),height:parseInt(AS.height+(Aa.height-AS.height)*A,10),top:parseInt(AS.top+(Aa.top-AS.top)*A,10),left:parseInt(AS.left+(Aa.left-AS.left)*A,10)};
if(typeof Aa.opacity!=="undefined"){B.opacity=A<0.5?0.5:A
}Ac.css(B);
AZ.css({width:B.width-Ae.padding*2,height:B.height-AN*A-Ae.padding*2})
},c=function(){return[Af(window).width()-Ae.margin*2,Af(window).height()-Ae.margin*2,Af(document).scrollLeft()+Ae.margin,Af(document).scrollTop()+Ae.margin]
},P=function(){var A=c(),E={},D=Ae.autoScale,B=Ae.padding*2;
E.width=Ae.width.toString().indexOf("%")>-1?parseInt(A[0]*parseFloat(Ae.width)/100,10):Ae.width+B;
E.height=Ae.height.toString().indexOf("%")>-1?parseInt(A[1]*parseFloat(Ae.height)/100,10):Ae.height+B;
if(D&&(E.width>A[0]||E.height>A[1])){if(Ad.type=="image"||Ad.type=="swf"){D=Ae.width/Ae.height;
if(E.width>A[0]){E.width=A[0];
E.height=parseInt((E.width-B)/D+B,10)
}if(E.height>A[1]){E.height=A[1];
E.width=parseInt((E.height-B)*D+B,10)
}}else{E.width=Math.min(E.width,A[0]);
E.height=Math.min(E.height,A[1])
}}E.top=parseInt(Math.max(A[3]-20,A[3]+(A[1]-E.height-40)*0.5),10);
E.left=parseInt(Math.max(A[2]-20,A[2]+(A[0]-E.width-40)*0.5),10);
return E
},a=function(){var A=Ad.orig?Af(Ad.orig):false,B={};
if(A&&A.length){B=A.offset();
B.top+=parseInt(A.css("paddingTop"),10)||0;
B.left+=parseInt(A.css("paddingLeft"),10)||0;
B.top+=parseInt(A.css("border-top-width"),10)||0;
B.left+=parseInt(A.css("border-left-width"),10)||0;
B.width=A.width();
B.height=A.height();
B={width:B.width+Ae.padding*2,height:B.height+Ae.padding*2,top:B.top-Ae.padding-20,left:B.left-Ae.padding-20}
}else{A=c();
B={width:Ae.padding*2,height:Ae.padding*2,top:parseInt(A[3]+A[1]*0.5,10),left:parseInt(A[2]+A[0]*0.5,10)}
}return B
},C=function(){if(AQ.is(":visible")){Af("div",AQ).css("top",AC*-40+"px");
AC=(AC+1)%12
}else{clearInterval(AD)
}};
Af.fn.fancybox=function(A){if(!Af(this).length){return this
}Af(this).data("fancybox",Af.extend({},A,Af.metadata?Af(this).metadata():{})).unbind("click.fb").bind("click.fb",function(B){B.preventDefault();
if(!Ab){Ab=true;
Af(this).blur();
AV=[];
AT=0;
B=Af(this).attr("rel")||"";
if(!B||B==""||B==="nofollow"){AV.push(this)
}else{AV=Af("a[rel="+B+"], area[rel="+B+"]");
AT=AV.index(this)
}AF()
}});
return this
};
Af.fancybox=function(A,F){var D;
if(!Ab){Ab=true;
D=typeof F!=="undefined"?F:{};
AV=[];
AT=parseInt(D.index,10)||0;
if(Af.isArray(A)){for(var B=0,E=A.length;
B<E;
B++){if(typeof A[B]=="object"){Af(A[B]).data("fancybox",Af.extend({},D,A[B]))
}else{A[B]=Af({}).data("fancybox",Af.extend({content:A[B]},D))
}}AV=jQuery.merge(AV,A)
}else{if(typeof A=="object"){Af(A).data("fancybox",Af.extend({},D,A))
}else{A=Af({}).data("fancybox",Af.extend({content:A},D))
}AV.push(A)
}if(AT>AV.length||AT<0){AT=0
}AF()
}};
Af.fancybox.showActivity=function(){clearInterval(AD);
AQ.show();
AD=setInterval(C,66)
};
Af.fancybox.hideActivity=function(){AQ.hide()
};
Af.fancybox.next=function(){return Af.fancybox.pos(AU+1)
};
Af.fancybox.prev=function(){return Af.fancybox.pos(AU-1)
};
Af.fancybox.pos=function(A){if(!Ab){A=parseInt(A);
AV=AY;
if(A>-1&&A<AY.length){AT=A;
AF()
}else{if(Ae.cyclic&&AY.length>1){AT=A>=AY.length?0:AY.length-1;
AF()
}}}};
Af.fancybox.cancel=function(){if(!Ab){Ab=true;
Af.event.trigger("fancybox-cancel");
AA();
Ad.onCancel(AV,AT,Ad);
Ab=false
}};
Af.fancybox.close=function(){function A(){AP.fadeOut("fast");
AW.empty().hide();
Ac.hide();
Af.event.trigger("fancybox-cleanup");
AZ.empty();
Ae.onClosed(AY,AU,Ae);
AY=Ad=[];
AU=AT=0;
Ae=Ad={};
Ab=false
}if(!(Ab||Ac.is(":hidden"))){Ab=true;
if(Ae&&false===Ae.onCleanup(AY,AU,Ae)){Ab=false
}else{AA();
Af(AI.add(AM).add(AL)).hide();
Af(AZ.add(AP)).unbind();
Af(window).unbind("resize.fb scroll.fb");
Af(document).unbind("keydown.fb");
AZ.find("iframe").attr("src",AB&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");
Ae.titlePosition!=="inside"&&AW.empty();
Ac.stop();
if(Ae.transitionOut=="elastic"){AS=a();
var B=Ac.position();
Aa={top:B.top,left:B.left,width:Ac.width(),height:Ac.height()};
if(Ae.opacity){Aa.opacity=1
}AW.empty().hide();
AK.prop=1;
Af(AK).animate({prop:0},{duration:Ae.speedOut,easing:Ae.easingOut,step:g,complete:A})
}else{Ac.fadeOut(Ae.transitionOut=="none"?0:Ae.speedOut,A)
}}}};
Af.fancybox.resize=function(){AP.is(":visible")&&AP.css("height",Af(document).height());
Af.fancybox.center(true)
};
Af.fancybox.center=function(A){var D,B;
if(!Ab){B=A===true?1:0;
D=c();
!B&&(Ac.width()>D[0]||Ac.height()>D[1])||Ac.stop().animate({top:parseInt(Math.max(D[3]-20,D[3]+(D[1]-AZ.height()-40)*0.5-Ae.padding)),left:parseInt(Math.max(D[2]-20,D[2]+(D[0]-AZ.width()-40)*0.5-Ae.padding))},typeof A=="number"?A:200)
}};
Af.fancybox.init=function(){if(!Af("#fancybox-wrap").length){Af("body").append(AX=Af('<div id="fancybox-tmp"></div>'),AQ=Af('<div id="fancybox-loading"><div></div></div>'),AP=Af('<div id="fancybox-overlay"></div>'),Ac=Af('<div id="fancybox-wrap"></div>'));
AJ=Af('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(Ac);
AJ.append(AZ=Af('<div id="fancybox-content"></div>'),AI=Af('<a id="fancybox-close"></a>'),AW=Af('<div id="fancybox-title"></div>'),AM=Af('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),AL=Af('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
AI.click(Af.fancybox.close);
AQ.click(Af.fancybox.cancel);
AM.click(function(A){A.preventDefault();
Af.fancybox.prev()
});
AL.click(function(A){A.preventDefault();
Af.fancybox.next()
});
Af.fn.mousewheel&&Ac.bind("mousewheel.fb",function(A,B){if(Ab){A.preventDefault()
}else{if(Af(A.target).get(0).clientHeight==0||Af(A.target).get(0).scrollHeight===Af(A.target).get(0).clientHeight){A.preventDefault();
Af.fancybox[B>0?"prev":"next"]()
}}});
Af.support.opacity||Ac.addClass("fancybox-ie");
if(AB){AQ.addClass("fancybox-ie6");
Ac.addClass("fancybox-ie6");
Af('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(AJ)
}}};
Af.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};
Af(document).ready(function(){Af.fancybox.init()
})
})(jQuery);
var dailybeast=dailybeast||{};
dailybeast.wrapstream=function(){var A="";
function C(){A=$(".stream");
$(".timeago").timeago();
$("[data-video]").once("data-video",function(){$(this).playOverlay(true)
});
$(".overlay").once("overlay",function(){$(this).verticalAlign()
});
$(".stream-gallery").once("stream-gallery",function(){$(this).slides({play:0,slideSpeed:500,pause:2500,hoverPause:true,generatePagination:false})
});
$("a.expand-collapse").click(function(){var D=$(this);
var E=D.siblings("a.more");
D.parent().siblings(".stream-read-more").slideToggle("slow",function(){B(D,E)
});
return false
});
$("a.arrowright").click(function(){var D=$(this).html();
trackReadMoreCollapseClick(D,$(this))
})
}function B(E,G){var F=E.html();
var D=E.data("expanded");
if(D||D===undefined){E.html("Collapse");
E.removeClass("arrowdown");
E.addClass("arrowup");
E.data("expanded",false);
G.show()
}else{E.html("Read More");
E.removeClass("arrowup");
E.addClass("arrowdown");
E.data("expanded",true);
G.hide()
}trackReadMoreCollapseClick(F,G)
}return{init:C}
}();
var isAppleDevice=navigator.userAgent.match(/(iPad|iPhone|iPod)/i)!=null;
var isMacWebKit=$.browser.webkit&&(navigator.userAgent.match(/Mac OS/i)!=null);
if(!isAppleDevice&&$("#home-page .videoBlock header").attr("stream")=="true"){$("#home-page .video-container.video").hide();
$("#home-page .video-container.stream").show()
}$(function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("article[data-slideshow]").each(function(){var data=$.parseJSON($(this).attr("data-slideshow"));
if(_.hasValue(data.interstitials)){data.interstitials=data.interstitials.split(",");
_.each(data.interstitials,function(value,index){try{data.interstitials[index]=parseInt(data.interstitials[index])
}catch(error){data.interstitials=[3]
}})
}$(this).gallery({url:data.url,enableAutoPlay:false,display:data.display||"standard",interstitials:data.interstitials,containers:{slide:$(this).find("div.gallery-slide"),viewAll:$("div.slide-view-all"),interstitial:$("div.slide-interstitial")},elements:{next:$(this).find("a.gallery-nav-button-next, img.gallery-slide-image"),previous:$(this).find("a.gallery-nav-button-previous"),index:$(this).find(".gallery-nav-index"),title:$(this).find("h2.gallery-slide-heading"),description:$(this).find(".gallery-slide-copy"),byline:$(this).find(".gallery-slide-photoCredit")},updated:function(evt,ui){dailybeast.analytics.trackPageview({pageNum:ui.index});
dailybeast.advertising.refresh()
},interstitialed:function(evt,ui){dailybeast.advertising.refresh()
}})
})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames){$("div[data-slider]").each(function(){var data=$.parseJSON($(this).attr("data-slider"));
var isPlaying=true;
$(this).featureslider({circular:true,autoplay:true,interval:7500,containers:{tooltip:".tooltip"},elements:{slider:".featureSlider-slider",items:".featureSlider-slides",next:".featureSlider-next",prev:".featureSlider-previous",pause:".featureSlider-pause",play:".featureSlider-play",navigator:".featureSlider-pagination",tipTitle:".tooltip h2 a",tipText:".tooltip p"}})
});
var navigationTop=$(".featureSlider-navigation");
var $tip=$(".toolTip");
$(".featureSlider-pagination a").live("mouseover mouseout",function(event){if((document.all&&!window.opera&&window.XMLHttpRequest)?true:false){$("#main > div[class=grid-4]").css("position","static")
}if(event.type=="mouseover"&&!$(event.target).closest("li").hasClass("active")){var $item=$(this).closest("li");
var slide=$("div[data-slider]").featureslider("getState").slides[$item.index()];
$tip.find("h2").text(slide.title);
$tip.find("p").text(slide.text);
var left=$item.position().left;
left+=$item.parent().position().left;
var top=navigationTop.position().top-$tip.outerHeight();
$tip.css({left:left-($tip.outerWidth()/2)+($item.outerWidth())+"px",top:top+"px",display:"block"})
}else{$tip.css({display:"none"})
}})
}var $carousel=$("#storyFeature");
if($carousel.length==1){var $tabs=$("ul li",$carousel);
var $image=$("#storyFeatureImage",$carousel);
$tabs.mouseenter(function(){$tabs.removeClass("on");
$(this).addClass("on");
var myImage=$(".photo",this).clone();
var myCredit=$(".photoCredit",this).clone();
$image.empty().append(myImage).append(myCredit)
})
}dailybeast.analytics.addProvider("google",{rules:{pageNum:function(params){params.pageNum++;
params.url=params.url.replace(".html",".page"+params.pageNum+".html")
}}});
dailybeast.analytics.addProvider("sitecatalyst",{rules:{pageNum:function(params){params.pageNum++
}},mappings:{pageNum:"prop4"}});
dailybeast.analytics.addProvider("nielsen",{providerID:"us-302188h"});
dailybeast.analytics.addProvider("comscore",{c1:2,c2:6433482});
dailybeast.analytics.addProvider("quantcast",{qacct:"p-bcLY1r4ynM-2-"});
dailybeast.analytics.configuration.init();
if($("#video-page").length>0){dailybeast.videopage.init()
}if($("body#article-page,body#blogentry-page").length>0){dailybeast.story.setupFontSizer()
}$("[placeholder]").textPlaceholder();
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isUsingFrames){$(".adStory .heading a").bind("click",function(e){e.preventDefault();
window.open($(".adStory").find("div[data-advertising] a").attr("href"))
});
dailybeast.advertising.init();
dailybeast.advertising.display()
}var paginationEnabled=false;
if(!dailybeast.modes.isEditMode&&(dailybeast.metatags.getTemplate()=="article")){var minWordsForLastPage=200;
var wordsPerPage=750;
$("div[data-pagination]").each(function(){var data=eval("("+$(this).attr("data-pagination")+")");
data.minWordsForLastPage=parseInt(data.minWordsForLastPage);
data.wordsPerPage=parseInt(data.wordsPerPage);
$(this).pagination({minWordsForLastPage:data.minWordsForLastPage||minWordsForLastPage,wordsPerPage:data.wordsPerPage||wordsPerPage,disabled:data.disabled,articleElement:$(this).closest("article"),nextElement:$(this).find(".next"),paginationItemsElement:$(this).find(".pagination"),firstPageElements:$(this).closest("article").find(".dek, .heading-updated, .updated-dek"),nextPageElements:$(this).closest("article").find(".page-number"),showAllElement:$(this).find(".showAll"),hideAllElement:$(this).find(".hideAll"),pageNumberElement:$(this).closest("article").find(".page-number")})
});
$("div[data-pagination]").bind("paginationupdated",function(){dailybeast.advertising.refresh()
})
}if($(".listicle-pagination").length>0){var api=$(".listicle-pagination").scrollable({next:".next-10",prev:".previous-10",items:".items",api:true});
setTimeout(function(){var index=$(".listicle-pagination").find("a.active").parent().index();
api.begin(0).seekTo(index)
},250)
}var $featureAd=$("[data-featureAd]");
if($featureAd.length==1&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){var data=$.parseJSON($featureAd.attr("data-featureAd"));
if(data.delay!==undefined){setTimeout(function(){$featureAd.hide();
$featureAd.next(".featureBlock").fadeIn("slow")
},data.delay*1000)
}}var wrapAd=function(){if(!($(".adMark").length)&&$(".center-col .ad").height()>16){$(".center-col").before('<div class="adMark">Advertisement</div>');
$(".center-col").css("background-color","#EFEFEF")
}};
if(!$.browser.msie||($.browser.msie&&$.browser.version=="9.0")){$(".center-col .ad").bind("DOMNodeInserted",function(event){wrapAd()
})
}else{setTimeout(function(){wrapAd()
},500)
}function bindNewsletterSignUp($form,events){events=events||{};
var $button=$form.find("button");
function showMessage(message,isError){if(events.showMessage){events.showMessage(message,isError)
}else{var $msg=$form.find(".message").text(message).show("slow");
setTimeout(function(){$msg.hide("slow")
},5000)
}}$form.submit(function(){if(events.validate){var errorMsg=events.validate($form);
if(errorMsg){showMessage(errorMsg,true);
return false
}}var data={email:$form.find("[name=email]").val(),subscriptions:[]};
$form.find("[name=subscriptions]:checked").each(function(){data.subscriptions.push($(this).val())
});
if(events.submit){events.submit($form,$button)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:data,dataType:"json",complete:function(){if(events.complete){events.complete($form,$button)
}},success:function(data){if(data.msg!==undefined){showMessage(data.msg,false)
}},error:function(xhr){var data=$.parseJSON(xhr.responseText);
if(data.msg!==undefined){showMessage(data.msg,true)
}}});
return false
})
}if($("#newsletters-page").length!=0){bindNewsletterSignUp($(".newsletters form"),{validate:function($form){return !$form.find("input[name=tos]").is(":checked")?"Please confirm that you have read and agree to the Terms of Service and Privacy Policy.":""
},submit:function($form,$button){$button.text("submitting...").attr("disabled",true)
},complete:function($form,$button){$button.text("submit").attr("disabled",false)
}})
}$(".signup").each(function(){var parent=$(this);
var confirmDialog=$(this).find(".message-dialog.confirm");
confirmDialog.click(function(){confirmDialog.hide()
});
var errorDialog=$(this).find(".message-dialog.error");
errorDialog.click(function(){errorDialog.hide()
});
var loadingIndicator=$(this).find(".loading-indicator");
bindNewsletterSignUp($(this).find("form"),{showMessage:function(message,isError){if(!isError){if(message.toLowerCase().indexOf("invalid")>=0){isError=true;
message="Sorry, that's not a valid email address. Please try again."
}else{message="Thanks! You're subscribed."
}}if(isError){errorDialog.find(".text-cell").text(message);
errorDialog.show()
}else{confirmDialog.find(".text-cell").text(message);
confirmDialog.show()
}},validate:function($form){var emailAddress=$form.find("input[name=email]").val();
emailAddress=$.trim(emailAddress);
return emailAddress.length==0?"Please enter your email address.":""
},submit:function($form,$button){loadingIndicator.show()
},complete:function($form,$button){loadingIndicator.hide()
}})
});
var submittedNewsletterCheatsheets=false;
function bindNewsletterCheatsheetsSignUp($form,events){events=events||{};
var $button=$form.find("button[name=validate]");
var $input=$form.find("[name=email]");
var email="";
function showMessage(message,isError){$form.find("button[name=confirm]").attr("disabled",false);
$form.find("button[name=cancel]").attr("disabled",false);
$form.find("input[name=tos]").attr("disabled",false);
$form.find("[name=subscriptions]").each(function(){$(this).attr("disabled",false)
});
submittedNewsletterCheatsheets=false;
$form.find("img").show();
$form.find(".input-text").addClass("input-error");
$form.find(".message").text(message);
setTimeout(function(){$form.find(".message").text("");
$form.find(".input-text").removeClass("input-error");
$form.find("img").hide()
},5000)
}function validateEmail(){email=$input.val();
$input.blur();
$input.attr("disabled",true);
var data={email:email!="Enter your email address"?email:""};
if(events.submit){events.submit($form,$button)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:data,dataType:"json",complete:function(){if(events.complete){events.complete($form,$button)
}},success:function(data){if(data.msg!==undefined&&(data.msg.toLowerCase().indexOf("invalid")!=-1||data.msg.toLowerCase().indexOf("enter")!=-1)){showMessage("Please provide a valid email address.",false);
$input.attr("disabled",false);
if(events.cancel){events.cancel($form,$button)
}}else{if(data.msg!==undefined&&data.msg.toLowerCase().indexOf("please select")==-1){showMessage(data.msg,false);
$input.attr("disabled",false)
}else{if(events.validateComplete){events.validateComplete($form)
}}}},error:function(xhr){var data=$.parseJSON(xhr.responseText);
if(data.msg!=undefined){showMessage(data.msg,true)
}}})
}$form.find("button[name=cancel]").click(function(){if(events.cancel){events.cancel($form,$button)
}return false
});
$input.keypress(function(event){if(event.which==13){event.preventDefault();
validateEmail()
}});
$button.click(function(){validateEmail();
return false
});
$form.submit(function(){if(submittedNewsletterCheatsheets){return false
}else{submittedNewsletterCheatsheets=true
}if(events.validate){var errorMsg=events.validate($form);
if(errorMsg){showMessage(errorMsg,true);
return false
}}$form.find("button[name=confirm]").attr("disabled",true);
$form.find("button[name=cancel]").attr("disabled",true);
$form.find("input[name=tos]").attr("disabled",true);
$form.find("[name=subscriptions]").each(function(){$(this).attr("disabled",true)
});
var data={email:email,tos:$form.find("input[name=tos]").is(":checked"),subscriptions:[]};
$form.find("[name=subscriptions]:checked").each(function(){data.subscriptions.push($(this).val())
});
if(events.submit){events.submit($form,$button)
}$form.find("[name=subscriptions]:checked").each(function(){$form.find("#thankList").append('<li class="clearfix">'+$(this).next("h2").text()+"</li>")
});
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:data,dataType:"json",complete:function(){if(events.complete){events.complete($form,$button)
}},success:function(data){if(data.msg!==undefined&&data.msg.toLowerCase().indexOf("successfully added")==-1){showMessage(data.msg,false)
}else{if(events.success){events.success($form)
}}},error:function(xhr){var data=$.parseJSON(xhr.responseText);
if(data.msg!==undefined){showMessage(data.msg,true)
}}});
return false
})
}if($("#cheatsheet-page").length!=0){var $form=$(".submitform");
var $element=$form.find("#thankList");
var $input=$form.find("[name=email]");
var $validate=$form.find("button[name=validate]");
var $confirm=$form.find("button[name=confirm]");
var $tos=$form.find("input[name=tos]");
var $setup;
var $confirmed;
if($.browser.msie){$setup=$form.find(".setup");
$confirmed=$form.find(".confirmed")
}else{$setup=$($form.find(".setup")[1]);
$confirmed=$($form.find(".confirmed")[1])
}var newsletters=[];
var i=0;
$form.find("[name=subscriptions]").each(function(){newsletters[i]=$(this).attr("checked");
$(this).attr("disabled",false);
i++
});
if(isMacWebKit||$.browser.msie){var placeholder=$input.attr("placeholder");
$input.focus(function(){if($input.val()==""||$input.val()==placeholder){$input.attr("placeholder","");
$input.val("")
}}).blur(function(){if($input.val()==""||$input.val()==$input.attr("placeholder")){$input.attr("placeholder",placeholder);
$input.val(placeholder)
}}).blur()
}if($.browser.msie||$.browser.mozilla){$input.val("");
$input.blur();
$tos.attr("checked",false);
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"GET",dataType:"json",success:function(data){i=0;
$form.find("[name=subscriptions]").each(function(){$(this).attr("checked",data[i].enabled);
newsletters[i]=data[i].enabled?"checked":"";
i++
})
},error:function(xhr){var data=$.parseJSON(xhr.responseText);
if(data.msg!==undefined){showMessage(data.msg,true)
}}})
}$input.attr("disabled",false);
$validate.attr("disabled",false);
$confirm.attr("disabled",false);
$tos.attr("disabled",false);
bindNewsletterCheatsheetsSignUp($form,{validate:function($form){return !$tos.is(":checked")?"Please agree to privacy policy.":""
},validateComplete:function($form){var oWidth=$input.outerWidth()+$form.find("button[name=validate]").outerWidth()-31;
$setup.width(oWidth);
$confirmed.width(oWidth);
$setup.show("fast",function(){if($.browser.msie){$($setup[0]).height($($setup[1]).height())
}})
},cancel:function($form,$button){$tos.attr("checked",false);
$setup.hide("fast",function(){var i=0;
$form.find("[name=subscriptions]").each(function(){$(this).attr("checked",newsletters[i]=="checked");
$(this).attr("disabled",false);
i++
});
$tos.attr("disabled",false)
});
$button.attr("disabled",false);
$input.val("");
$input.blur();
$input.attr("disabled",false);
$confirm.attr("disabled",false);
submittedNewsletterCheatsheets=false;
$button.focus();
$button.blur()
},submit:function($form,$button){$button.attr("disabled",true);
$element.find(".clearfix").remove();
$input.blur()
},complete:function($form,$button){$input.blur()
},success:function($form){$setup.hide("fast",function(){var i=0;
$form.find("[name=subscriptions]").each(function(){$(this).attr("checked",newsletters[i]=="checked");
$(this).attr("disabled",false);
i++
});
$tos.attr("disabled",false);
$form.find("button[name=cancel]").attr("disabled",false)
});
$confirmed.show("fast",function(){if($.browser.msie){$($confirmed[0]).height($($confirmed[1]).height())
}})
}});
$form.find("button[name=close]").click(function(){$tos.attr("checked",false);
$form.find("button[name=validate]").attr("disabled",false);
$input.val("");
$input.blur();
$input.attr("disabled",false);
$confirm.attr("disabled",false);
submittedNewsletterCheatsheets=false;
$validate.focus();
$validate.blur();
$confirmed.hide("fast");
return false
})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$.ajax({url:"http://api.wunderground.com/api/16398c7bfc8f3c8e/geolookup/conditions/q/autoip.json",dataType:"jsonp",success:function(parsed_json){if(parsed_json.current_observation){var temp_f=parsed_json.current_observation["temp_f"];
var icon=parsed_json.current_observation["icon"];
var html='<img class="icon" src="http://icons.wxug.com/i/c/g/'+icon+'.gif" width="25" height="25">'+temp_f+"&deg;";
$(".weather").html(html)
}}})
}if($("body").attr("id")!="videos-page"){$("[data-video]").playOverlay(true)
}if(isAppleDevice){$("[data-video]").click()
}if((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive")){var breakingVideo=$("#breaking-video");
var breakingVideoClose=$("#breaking-video-closed");
var videoContainer=$("#video-container");
var videoHTML=videoContainer.html();
function openBreakingVideo(){$.cookie("breaking-video","open",{expires:1});
breakingVideo.show();
videoContainer.html(videoHTML);
if(videoContainer.data("playerType")=="brightcove"){brightcove.createExperiences()
}breakingVideoClose.hide()
}function closeBreakingVideo(){$.cookie("breaking-video","closed",{expires:1});
breakingVideoClose.show();
videoContainer.html("");
breakingVideo.hide()
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".breaking-video-close").bind("click",function(e){e.preventDefault();
closeBreakingVideo()
});
breakingVideoClose.bind("click",function(e){e.preventDefault();
openBreakingVideo()
});
if($.cookie("breaking-video")!="closed"){openBreakingVideo()
}else{closeBreakingVideo()
}}$(".gallery-item").bind("mousemove",function(){$(this).closest(".galleries").find(".gallery-item img").css("opacity",0.5);
$(this).find("img").css("opacity",1)
});
$(".galleries-logo").bind("mousemove",function(){$(this).closest(".galleries").find(".gallery-item img").css("opacity",1)
});
$(".galleries").bind("mouseenter",function(event){$(this).find("img").css("opacity",0.5)
});
$(".galleries").bind("mouseleave",function(){$(this).find("img").css("opacity",1)
});
$(".galleries img").each(function(){$(this).removeAttr("title")
});
$(".gallery-item").floattip({tip:{element:".float-tip",paddingX:20,paddingY:20},stage:{element:".galleries"}})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive"))){$(".features").slides({play:0,pause:2500,hoverPause:true,generatePagination:false,container:"features-container",next:"features-next",prev:"features-previous"})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&(dailybeast.metatags.getTemplate()=="home")){$("#home-page .contributors").slides({play:0,pause:2500,hoverPause:true,container:"contributors-container",paginationClass:"pagination",next:"pagination-next",prev:"pagination-previous",autoHeight:true});
$("#home-page .contributors").each(function(){$(this).find(".pagination").wrap('<span class="inner"></span>');
var inner=$(this).find(".inner");
$(this).find(".pagination-previous").prependTo(inner);
$(this).find(".pagination-next").appendTo(inner);
inner.wrap('<div class="wrapper"></div>')
});
$("#home-page .photoslider, #interactive-page .photoslider").slides({play:0,pause:2500,hoverPause:true,generatePagination:false,container:"photoslider-container",animationStart:function(){$("#home-page .heading-container").hide()
},animationComplete:function(){$("#home-page .heading-container").each(function(){$(this).verticalAlign($(this).data());
$(this).fadeIn()
})
},slidesLoaded:function(){}});
var photoSliderInitialized=false;
function initializePhotoSlider(){if(!photoSliderInitialized){$("#home-page .heading-container").each(function(){$(this).verticalAlign($(this).data());
$(this).fadeIn()
});
photoSliderInitialized=true
}}$(window).load(function(){initializePhotoSlider()
});
window.setTimeout(function(){initializePhotoSlider()
},15000);
var homeInnerContributer=$("#home-page .contributors .inner");
var homeContributerElementWidth=$("#home-page .contributors").width();
homeInnerContributer.css("left",(homeContributerElementWidth/2-homeInnerContributer.width()/2)-10)
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&(dailybeast.metatags.getTemplate()=="wrap")){var switcher=$(".switcher .scrollable");
var slides=$(".switcher .slide:not(.cloned)");
var slideWidth=$(".switcher .slide").width();
function introduceSlide(slide,index){slide.find("[data-video]").playOverlay(true,true);
slide.find(".heading-container, .title, .switcher-overlay").fadeIn();
slide.find("img").not(".switcher-overlay").animate({opacity:1},100);
if(isAppleDevice){slide.find("[data-video]").click();
slide.mouseover(function(){if(slide.find("iframe, object")){slide.find(".title").hide()
}})
}slide.find("[data-video]").click(function(){slide.find(".title").hide()
});
slide.find(".title").show()
}function hideSlide(slide,e,index,direction){slide.find(".heading-container, .title, .switcher-overlay").fadeOut(100);
slide.find("[data-video]").find("iframe, object").remove();
slide.find("img").not(".switcher-overlay").animate({opacity:0.3},100).fadeIn();
slide.find(".data-video-processed a").not(".switcher-overlay").fadeIn();
if(slide.hasClass("ad")){hideAd(slide,e,index,direction)
}}function hideAd(slide,e,index,direction){if(slide.hasClass("ad")&&slide.width()>3){lastIndex=index;
slide.animate({opacity:0})
}}var slide;
var lastIndex=0;
switcher.scrollable({circular:true,onSeek:function(e,index){if(!slide){slide=$(this.getItems()[0])
}if(lastIndex<index){hideSlide(slide,e,index,"toRight")
}else{hideSlide(slide,e,index)
}slide=$(this.getItems()[index]);
introduceSlide(slide,index);
lastIndex=index
},onBeforeSeek:function(e,index){var slide=$(this.getItems()[index]);
if(slide.hasClass("ad")){if(slide.find("[data-advertising]").children().length>0){slide.animate({opacity:1},400)
}else{e.preventDefault();
switcher.scrollable().seekTo(index+(lastIndex<index?1:-1))
}}if(lastIndex<index){hideAd(slide.prev(),e,index)
}else{hideAd(slide.next(),e,index)
}}});
if(slides.size()>1){slides.not(".ad").slice(1,2).clone().addClass("cloned").appendTo(".switcher .items");
slides.not(".ad").slice(slides.size()-2,slides.size()-1).clone().addClass("cloned").prependTo(".switcher .items");
$(".switcher .items").css("left",(-$(slides[0]).position().left));
if(!($.browser.msie&&$.browser.version=="7.0")){switcher.navigator()
}$(".switcher .browse-link").show()
}introduceSlide($(slides[0]));
if($.browser.msie&&$.browser.version=="7.0"){$(".switcher-wrapper .title").css("bottom","60px")
}var el=$(".switcher .navi");
el.css("left",el.parent().width()/2-el.width()/2-5);
$(".switcher-wrapper").css("visibility","visible")
}$("#home-page .featureSlider-next").attr("data-track","{'title':'topbox-next'}");
$("#home-page .featureSlider-previous").attr("data-track","{'title':'topbox-prev'}");
$("#home-page .featureSlider-pause").attr("data-track","{'title':'topbox-pause'}");
$("#home-page .bottom .image.section a").each(function(){$(this).attr("data-track","{'title':'"+$(this).find("img").attr("title")+"'}")
});
$(".subscriptionheader a").attr("data-track","{'title':'trial-issues'}");
$(".beast-tv").parent("a").attr("data-track","{'title':'beasttv-logo'}");
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("#wrap-page .contributors, #article-page .contributors").slides({play:0,pause:2500,hoverPause:true,container:"contributors-container",paginationClass:"pagination",next:"pagination-next",prev:"pagination-previous",autoHeight:true});
$("#wrap-page .contributors, #article-page .contributors").each(function(){$(this).find(".pagination").wrap('<span class="inner"></span>');
var inner=$(this).find(".inner");
$(this).find(".pagination-previous").prependTo(inner);
$(this).find(".pagination-next").appendTo(inner);
inner.wrap('<div class="wrapper"></div>')
});
var innerContributerElement=$("#wrap-page .contributors .inner, #article-page .contributors .inner");
var contributerElementWidth=$("#wrap-page .contributors, #article-page .contributors").width();
innerContributerElement.css("left",(contributerElementWidth/2-innerContributerElement.width()/2)-10)
}var featureOverlay=(function(e){var slide=$(".slides_control",$(".video-feature-container")).children(":eq("+e+")");
slide.playOverlay(true);
if(isAppleDevice){slide.click();
slide.find("img").hide();
slide.mouseover(function(){slide.find(".video-details").hide()
})
}else{slide.find(".overlay").verticalAlign({offset:(slide.find(".video-details").height()/2)});
slide.find(".overlay").fadeIn()
}slide.find(".video-details, a").show()
});
var videoFeatureAd=false;
$(".video-feature-container").slides({play:0,pause:2500,hoverPause:true,container:"slides",generatePagination:false,paginationClass:"slider-pagination",prev:"previous",autoHeight:true,animationStart:function(){$(".video-feature-container div[data-video]:visible").find("iframe, object").remove();
$(".video-image-next img").hide();
$(".video-image-previous img").hide();
$(".video-feature-container").find("img.overlay").hide()
},animationComplete:function(e){if(!videoFeatureAd){var control=$(".slides_control",$(".video-feature-container"));
if(control.children().size()>=4){var nextImage=$(".video-image-next");
var prevImage=$(".video-image-previous");
nextImage.css("background-image",control.children(":eq("+(control.children().size()===e?0:e)+")").find(".video-details").data("src"));
prevImage.css("background-image",control.children(":eq("+(e==1?control.children().size()-1:e-2)+")").find(".video-details").data("src"));
nextImage.fadeIn();
prevImage.fadeIn()
}control.children(":eq("+(e-1)+")").find("img, .video-details").show()
}featureOverlay((e-1))
},slidesLoaded:function(){$(".slider-pagination").show();
featureOverlay(0)
}}).bind("adEnabled",function(){videoFeatureAd=true
});
$("div.video-filter ul.filter li a").live("click",function(e){e.preventDefault();
$("div.video-filter a.selected").each(function(){$(this).attr("class","");
$(this).find("span").remove()
});
$(this).attr("class","selected");
$(this).append(" <span>&nbsp;&nbsp;</span>");
var grid=$("#video-explorer-grid");
grid.children().remove();
grid.spin("large");
grid.load($(this).data("search-src"));
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames){if($(this).data("hash").length>0){window.location.hash=$(this).data("hash")
}}});
$("#video-explorer-grid ul.pagination li a").live("click",function(e){e.preventDefault();
var grid=$("#video-explorer-grid");
grid.children().remove();
grid.spin("large");
grid.load($(this).data("search-src"));
$("#video-explorer-grid").load($(this).data("search-src"));
window.scrollTo(0,$("#video-explorer").offset().top)
});
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames&&dailybeast.metatags.getTemplate()=="videos"&&window.location.hash.length>0){var hashFilter=function(e){var elem=$('div.video-filter ul.filter li a[data-hash="'+e.replace("#","")+'"]');
if(elem.length>0){elem.attr("class","selected");
elem.append(" <span>&nbsp;&nbsp;</span>");
var grid=$("#video-explorer-grid");
if(grid.length>0){}}};
hashFilter(window.location.hash)
}if($(".stream-gallery").length>0||$("#wrap-page").length>0){dailybeast.wrapstream.init()
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){if($(".wrap-twitter .items").length>0){$(".wrap-twitter .items").twitter({query:$(".wrap-twitter .items").data("query"),count:$(".wrap-twitter .items").data("limit")})
}}if(dailybeast.metatags.getTemplate()=="wrap"){trackReadMoreCollapseClick("Wrap Page View")
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){(function(){var dowSymbol="INDU";
var nasdaqSymbol="COMPX";
$.getJSON("/content/dailybeast/services/stock-quote.json",{symbols:[dowSymbol,nasdaqSymbol]},function(data){var dow=data[dowSymbol];
if(dow){$(".stock .dowCountTitle").text("Dow ");
$(".stock .dowCount").text(addCommas(dow.last));
setStockChange($(".stock .dowRate"),dow.change)
}var nasdaq=data[nasdaqSymbol];
if(dow){$(".stock .nasdaqCountTitle").text(", Nasdaq ");
$(".stock .nasdaqCount").text(addCommas(nasdaq.last));
setStockChange($(".stock .nasdaqRate"),nasdaq.change)
}$(".stock").show()
});
function setStockChange($elem,num){var up=num>0;
$elem.text((up?"+":"")+addCommas(num));
if(up){$elem.removeClass("down").addClass("up")
}else{$elem.removeClass("up").addClass("down")
}}function addCommas(num){var numRounded=(Math.round(num*10)/10).toFixed(1);
var parts=numRounded.split(".");
var whole=parts[0];
var regex=/(\d+)(\d{3})/;
while(regex.test(whole)){whole=whole.replace(regex,"$1,$2")
}return whole+((parts.length>0)?"."+parts[1]:"")
}})()
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".contributors-auto").slides({play:0,pause:2500,hoverPause:true,container:"slide-container",next:"pagination-next",prev:"pagination-previous",paginationClass:"pagination",generateNextPrev:true,slidesLoaded:function(){var pos=0;
$(".contributors-auto .slide").each(function(){if($(this).find("a.active").length>0){$(".contributors-auto .pagination li:eq("+pos+") a").delay(5000).click()
}pos++
})
}});
$(".contributors-auto").find(".pagination").wrap('<div class="pagination-wrap clearfix"></div>');
$(".contributors-auto").find(".pagination-previous").prependTo(".pagination-wrap");
$(".contributors-auto").find(".pagination-next").appendTo(".pagination-wrap")
}});
var dailybeast=dailybeast||{};
dailybeast.slider={addSlides:function(C,D,B){if(dailybeast.modes.isEditMode){for(var A=0;
A<C;
A++){var E={};
E["./jcr:lastModified"]="";
E["./jcr:lastModifiedBy"]="";
E["./jcr:created"]="";
E["./jcr:createdBy"]="";
E["./sling:resourceType"]="dailybeast/components/slider/slide";
E[":nameHint"]="slide";
E[":order"]="";
E._charset_="utf-8";
CQ.utils.HTTP.post(D+"/",null,E,this)
}CQ.Util.reload()
}}};
var dailybeast=dailybeast||{};
dailybeast.cookie=dailybeast.cookie||{};
dailybeast.cookie.UserCookies=dailybeast.cookie.UserCookies||{};
UserCookies=dailybeast.cookie.UserCookies;
UserCookies.userTypes={};
UserCookies.userTypes["andrewsullivan.thedailybeast.com"]="ads";
UserCookies.userTypes["www.realclearpolitics.com"]="rcp";
UserCookies.userTypes["realclearpolitics.com"]="rcp";
UserCookies.userTypes["www.reddit.com"]="rdt";
UserCookies.userTypes["www.huffingtonpost.com"]="hfp";
UserCookies.userTypes["www.drudgereport.com"]="drr";
UserCookies.userTypes["drudgereport.com"]="drr";
UserCookies.userTypes["www.ew.com"]="etw";
UserCookies.userTypes["popwatch.ew.com"]="etw";
UserCookies.userTypes["www.fark.com"]="frk";
UserCookies.userTypes["m.fark.com"]="frk";
UserCookies.userTypes["digg.com"]="dig";
UserCookies.userTypes["gofugyourself.com"]="gfy";
UserCookies.userTypes["www.askmen.com"]="akm";
UserCookies.userTypes["www.stylelist.com"]="stl";
UserCookies.userTypes["politicalwire.com"]="plw";
UserCookies.userTypes["gawker.com"]="gkr";
UserCookies.userTypes["jezebel.com"]="jzl";
UserCookies.userTypes["www.facebook.com"]="fbk";
UserCookies.userTypeCookieName="utp";
UserCookies.defaultUserType="gnr";
UserCookies.getUserType=function(){userType=$.cookie(UserCookies.userTypeCookieName);
if(userType==null){userType=UserCookies.defaultUserType
}return userType
};
UserCookies.updateUserType=function(){userType=$.cookie(UserCookies.userTypeCookieName);
if(userType==null){referrer=document.referrer;
if(referrer!=null&&referrer.length>0){referrer=referrer.toLowerCase();
referrerHostname=referrer.split("/")[2].split(":")[0];
userType=UserCookies.userTypes[referrerHostname]
}}if(userType!=null){$.cookie(UserCookies.userTypeCookieName,userType,{path:"/",expires:365})
}return userType
};
UserCookies.getUserTypeForOmniture=function(){userType=UserCookies.updateUserType();
if(userType==null){userType=""
}return userType
};
$(function(){UserCookies.updateUserType()
});
$(function(){window.dailybeast=window.dailybeast||{};
window.dailybeast.janrain=window.dailybeast.janrain||function(){var B={};
B.loginForm=$(".userLogin");
B.loginAction=B.loginForm.find(".userLoginAction");
B.config=B.loginForm.length>0?$.parseJSON(B.loginForm.attr("data-janrain")):{};
B.baseUrl=window.location.protocol+"//"+window.location.host;
B.redirectUrl=encodeURIComponent(B.baseUrl+"/content/dailybeast/services/janrain.html");
B.xdReceiverUrl=encodeURIComponent(B.baseUrl+"/etc/static/dailybeast/capture_xdcomm.html");
B.loginUrl="https://"+B.config.domain+"/oauth/signin?client_id="+B.config.clientId+"&response_type=code&redirect_uri="+B.redirectUrl+"&xd_receiver="+B.xdReceiverUrl+"&recover_password_callback=dailybeast.janrain.recoverPassword&bp_channel=";
B.registerUrl="https://"+B.config.domain+"/oauth/legacy_register?client_id="+B.config.clientId+"&flags=stay_in_window&response_type=code&redirect_uri="+B.redirectUrl+"&xd_receiver="+B.xdReceiverUrl+"&recover_password_callback=dailybeast.janrain.recoverPassword&bp_channel=";
B.userData={};
return B
}();
var A=dailybeast.janrain;
A.handleMessage=function(B){$.log("Backplane message",B);
if(B.type=="identity/login"){if(typeof B.payload!="undefined"){$.log("User successfully logged in");
A.setUserData(B.payload);
A.displayUserOrLogin();
$.cookie("bp_channel_id",Backplane.getChannelID())
}A.closeLoginForm()
}};
A.isUserLoggedIn=function(){return !$.isEmptyObject(A.userData)
};
A.getDisplayName=function(){return A.userData.displayName
};
A.displayUser=function(){var B=A.getDisplayName();
$.log("Displaying the logged in username",B);
A.loginForm.css("left","-9999px");
A.loginAction.html(B);
A.loginForm.css("min-width",A.loginForm.width());
A.loginForm.css("left","0px");
A.loginAction.unbind("click");
A.loginAction.click(function(){A.logout()
});
A.loginAction.hover(function(){A.loginAction.html("Sign out")
},function(){A.loginAction.html(B)
})
};
A.displayLogin=function(){$.log("Displaying the login link");
A.loginForm.css("left","-9999px");
$.log("Displaying sign in");
$.log("Setting width");
A.loginForm.css("min-width",A.loginForm.width());
A.loginForm.css("left","0px");
A.loginAction.unbind("mouseenter mouseleave");
A.loginAction.unbind("click");
A.loginAction.click(function(){A.openLoginForm()
});
$.log("Setting up link:",A.loginAction);
A.loginAction.html("Sign in")
};
A.displayUserOrLogin=function(){if(A.isUserLoggedIn()){A.displayUser()
}else{A.displayLogin()
}};
A.setUserData=function(B){$.log("Setting user data from backplane payload",B);
A.userData=(!$.isEmptyObject(B)&&typeof B.identities!="undefined")?B.identities.entry:null
};
A.recoverPassword=function(){return $("#fancybox-frame").attr("src",A.baseUrl+"/content/dailybeast/services/password-reset.html?step=email")
};
A.logout=function(){$.log("Logging out "+A.getDisplayName());
$.cookie("bp_channel_id",null);
A.setUserData(null);
Backplane.resetCookieChannel();
A.loginAction.unbind("mouseenter mouseleave");
A.loginAction.unbind("click");
A.loginAction.html("Signing out");
A.loginAction.data("state","signingout");
setTimeout(function(){$.log("Logout may have failed or is taking too long, going to try to finish anyway");
A.finishLogout()
})
};
A.finishLogout=function(){$.log("Finishing logout");
window.location.reload()
};
A.closeLoginForm=function(){$.fancybox.close()
};
A.openLoginForm=function(){$.log("Opening the login form");
A.loginFancyBoxAnchor.trigger("click")
};
A.initLoginBox=function(){A.loginForm.append("<span class='loginFancyboxAnchor'></span>");
A.loginFancyBoxAnchor=$(".loginFancyboxAnchor");
A.loginFancyBoxAnchor.fancybox({autoScale:false,height:728,width:666,padding:0,scrolling:"no",transitionIn:"elastic",transitionOut:"elastic",type:"iframe",href:A.loginUrl+Backplane.getChannelID(),onClosed:function(){if($.browser.msie&&document.compatMode!="CSS1Compat"){var B=$("#fancybox-overlay").get(0).style;
B.removeExpression("height");
B.removeExpression("width")
}$("body").trigger("fancybox-close")
},onComplete:function(){var B=($.browser.msie&&document.compatMode!="CSS1Compat"?40:0);
$("#fancybox-frame").css({width:this.width-B,height:this.height-B})
},onStart:function(){Backplane.expectMessages("identity/login");
if($.browser.msie&&document.compatMode!="CSS1Compat"){var B=$("#fancybox-overlay").get(0).style;
B.setExpression("height","Math.max(document.body.clientHeight, document.body.scrollHeight)");
B.setExpression("width","Math.max(document.body.clientWidth, document.body.scrollWidth)")
}$("body").trigger("fancybox-open")
}})
};
A.init=function(){$.log("Backplane 1.2 initialized - subscribing to events");
if(A.loginAction.data("state")=="signingout"){A.finishLogout()
}else{A.backplaneMessages=Backplane.subscribe(A.handleMessage);
$.log("Setting up the user box");
A.initLoginBox();
A.displayUserOrLogin()
}};
if($("#blackout").length>0){if($.cookie("signin-blackout")==null){$.cookie("bp_channel_id",null);
$.log(Backplane);
if(typeof window.Backplane!="undefined"){$.log("Resetting cookie channel");
window.Backplane.resetCookieChannel()
}}}if(A.loginForm.length>0){$.log("Adding Backplane 1.2");
loadBackplane1_2();
$.log("Backplane 1.2 Added, now trying to init");
Backplane(A.init);
Backplane.init({serverBaseURL:"https://backplane1.janrainbackplane.com/v1.2",busName:"newsweek.com",initFrameFilter:Backplane.identityServices.init})
}});
var loadBackplane1_2=function(){window.Backplane=window.Backplane||(function(){var BP=function(fn){if(Backplane.getChannelID()){fn()
}else{Backplane.onInit=(function(){var original_onInit=Backplane.onInit;
return function(){original_onInit();
fn()
}
})()
}};
BP.version="1.2.1";
BP.channelByBus={};
BP.config={};
BP.initialized=false;
BP.firstFrameReceived=false;
BP.cachedMessages={};
BP.cachedMessagesIndex=[];
BP.cacheMax=0;
BP.subscribers={};
BP.serverChannel=true;
BP.awaiting={since:0,until:0,queue:[]};
BP.intervals={min:1,frequent:5,regular:60,slowdown:120};
BP.onInit=function(){};
return BP
})();
Backplane.init=function(config){config=config||{};
if(this.initialized||!config.serverBaseURL||!config.busName){return false
}this.initialized=true;
this.timers={};
this.config=config;
this.config.serverBaseURL=this.normalizeURL(config.serverBaseURL);
this.channelByBus=this.getCookieChannels();
this.cacheMax=config.cacheMax||this.cacheMax;
if(typeof config.serverChannel!=="undefined"){this.serverChannel=config.serverChannel
}if(typeof this.config.channelExpires=="undefined"){var d=new Date();
d.setFullYear(d.getFullYear()+5);
this.config.channelExpires=d.toGMTString()
}if(this.getChannelName()){this.finishInit(false)
}else{this.fetchNewChannel()
}return true
};
Backplane.subscribe=function(callback){if(!this.initialized){return false
}var id=(new Date()).valueOf()+Math.random();
this.subscribers[id]=callback;
if(this.firstFrameReceived){for(var i=0;
i<this.cachedMessagesIndex.length;
i++){callback(this.cachedMessages[this.cachedMessagesIndex[i]])
}}return id
};
Backplane.unsubscribe=function(subscriptionID){if(!this.initialized||!subscriptionID){return false
}delete this.subscribers[subscriptionID]
};
Backplane.getChannelID=function(){if(!this.initialized){return false
}return this.config.channelID
};
Backplane.expectMessages=function(types){this.expectMessagesWithin(60,types)
};
Backplane.expectMessagesWithin=function(interval,types){if(!this.initialized||!interval){return false
}this.awaiting.since=this.getTS();
this.awaiting.interval=interval;
this.awaiting.nonstop=!types;
if(types){types=typeof types=="string"?[types]:types;
this.awaiting.queue.push(types)
}var until=this.awaiting.since+interval;
if(until>this.awaiting.until){this.awaiting.until=until
}this.request()
};
Backplane.finishInit=function(channelName){if(channelName){this.channelByBus[this.config.busName]=channelName
}this.setCookieChannels();
this.config.channelName=this.getChannelName();
this.config.channelID=this.generateChannelID();
this.onInit();
this.request()
};
Backplane.generateChannelID=function(){return this.config.serverBaseURL+"/bus/"+this.config.busName+"/channel/"+this.config.channelName
};
Backplane.getChannelName=function(){if(!this.initialized){return false
}if(!this.channelByBus[this.config.busName]){if(this.serverChannel){return false
}else{this.channelByBus[this.config.busName]=(new Date()).valueOf().toString()+Math.random().toString().substr(2,5);
this.setCookieChannels()
}}return this.channelByBus[this.config.busName]
};
Backplane.getTS=function(){return Math.round((new Date()).valueOf()/1000)
};
Backplane.getCookieChannels=function(){var match=(document.cookie||"").match(/backplane-channel=(.*?)(?:$|;)/);
if(!match||!match[1]){return{}
}var channelByBus={};
var parts=match[1].split("|");
for(var i=0;
i<parts.length;
i++){var m=parts[i].split(":");
channelByBus[decodeURIComponent(m[0])]=decodeURIComponent(m[1])
}return channelByBus
};
Backplane.setCookieChannels=function(){var parts=[];
for(var i in this.channelByBus){if(this.channelByBus.hasOwnProperty(i)){parts.push(encodeURIComponent(i)+":"+encodeURIComponent(this.channelByBus[i]))
}}document.cookie="backplane-channel="+parts.join("|")+";expires="+this.config.channelExpires+";path=/";
$.log("Cookie channel set to:"+document.cookie)
};
Backplane.resetCookieChannel=function(){delete this.channelByBus[this.config.busName];
this.setCookieChannels();
if(this.serverChannel){this.fetchNewChannel()
}else{this.config.channelName=this.getChannelName();
this.config.channelID=this.generateChannelID()
}};
Backplane.fetchNewChannel=function(){oldScript=document.getElementById("fetchChannelId");
if(oldScript){if(oldScript.parentNode){oldScript.parentNode.removeChild(oldScript)
}for(var prop in oldScript){delete oldScript[prop]
}}$.log("Fetching a new channel id");
var script=document.createElement("script");
script.src=this.config.serverBaseURL+"/bus/"+this.config.busName+"/channel/new?callback=Backplane.finishInit&cb="+(Math.random()*10000000000000000);
script.type="text/javascript";
script.id="fetchChannelId";
var firstScript=document.getElementsByTagName("script")[0];
firstScript.parentNode.insertBefore(script,firstScript);
$.log("Just inserted script node to fetch, now we wait for the finishInit")
};
Backplane.normalizeURL=function(rawURL){return rawURL.replace(/^\s*(https?:\/\/)?(.*?)[\s\/]*$/,function(match,proto,uri){return(proto||window.location.protocol+"//")+uri
})
};
Backplane.calcTimeout=function(){var timeout,ts=this.getTS();
if(ts<this.awaiting.until){if(!this.awaiting.nonstop&&!this.awaiting.queue.length){this.awaiting.until=ts;
return this.calcTimeout()
}var relative=ts-this.awaiting.since;
var limit=this.intervals.frequent-this.intervals.min;
timeout=this.intervals.min+Math.round(limit*relative/this.awaiting.interval)
}else{if(ts<this.awaiting.until+this.intervals.slowdown){var relative=ts-this.awaiting.until;
var limit=this.intervals.regular-this.intervals.frequent;
timeout=this.intervals.frequent+Math.round(limit*relative/this.intervals.slowdown)
}else{timeout=typeof this.since=="undefined"?0:this.intervals.regular;
this.awaiting.nonstop=false
}}return timeout*1000
};
Backplane.request=function(){var self=this;
if(!this.initialized){return false
}this.stopTimer("regular");
this.stopTimer("watchdog");
this.timers.regular=setTimeout(function(){self.timers.watchdog=setTimeout(function(){self.request()
},5000);
var script=document.createElement("script");
script.type="text/javascript";
script.charset="utf-8";
script.src=self.config.channelID+"?callback=Backplane.response"+(self.since?"&since="+encodeURIComponent(self.since):"")+"&rnd="+Math.random();
var container=document.getElementsByTagName("head")[0]||document.documentElement;
container.insertBefore(script,container.firstChild);
script.onload=script.onreadystatechange=function(){var state=script.readyState;
if(!state||state==="loaded"||state==="complete"){script.onload=script.onreadystatechange=null;
if(script.parentNode){script.parentNode.removeChild(script)
}}}
},this.calcTimeout())
};
Backplane.response=function(messages){var self=this;
this.stopTimer("watchdog");
messages=messages||[];
var since=messages.length?messages[messages.length-1].id:this.since;
if(typeof this.since=="undefined"){if(typeof this.config.initFrameFilter!="undefined"){messages=this.config.initFrameFilter(messages)
}else{messages=[]
}}this.since=since||"";
for(var i=0;
i<messages.length;
i++){for(var j in this.subscribers){if(this.subscribers.hasOwnProperty(j)){this.subscribers[j](messages[i].message)
}}if(this.cacheMax>0){if(!this.cachedMessages.hasOwnProperty([messages[i].id])){this.cachedMessages[messages[i].id]=messages[i];
this.cachedMessagesIndex.push(messages[i].id)
}if(this.cachedMessagesIndex.length>this.cacheMax){delete this.cachedMessages[this.cachedMessagesIndex[0]];
this.cachedMessagesIndex.splice(0,1)
}}var queue=[];
for(var k=0;
k<this.awaiting.queue.length;
k++){var satisfied=false;
for(var l=0;
l<this.awaiting.queue[k].length;
l++){if(this.awaiting.queue[k][l]==messages[i].message.type){satisfied=true
}}if(!satisfied){queue.push(this.awaiting.queue[k])
}}this.awaiting.queue=queue
}this.firstFrameReceived=true;
this.request()
};
Backplane.stopTimer=function(name){var timer=this.timers[name];
if(timer){clearTimeout(timer)
}};
Backplane.identityServices={};
Backplane.identityServices.init=function(messages){var replayObjects={};
for(var i=0;
i<messages.length;
i++){if(messages[i].message.sticky&&messages[i].message.sticky==true){if(typeof messages[i].message.payload.identities=="undefined"){console.info("not an identity message");
continue
}var id=messages[i].message.payload.identities.entry.id;
if(messages[i].message.type=="identity/logout"){delete replayObjects["identity/login"+id]
}else{replayObjects[messages[i].message.type+id]=messages[i]
}}}var replay=[];
for(var j in replayObjects){replay.push(replayObjects[j])
}return replay
};
CAPTURE={resize:function(jargs){var args=JSON.parse(jargs);
jQuery("#fancybox-inner").css({width:args.w+"px",height:args.h+"px"});
jQuery("#fancybox-wrap").css({width:args.w+"px",height:args.h+"px"});
jQuery("#fancybox-content").css({height:args.h+"px",width:args.w+"px"});
jQuery("#fancybox-frame").css({width:args.w+"px",height:args.h+"px"});
jQuery.fancybox.resize();
jQuery.fancybox.center()
}};
(function(h){function c(a){window.console&&console.log&&console.log(a)
}function d(a){c("Got xdmessage: "+a.data);
a.data.indexOf("capture:")!==0?c("Ignoring message: "+a.data):i(a.data.substring(8))
}function i(a){var b,c,d,f,e,g;
b=a.indexOf(";");
if(b<0){throw Error("Capture xdreceiver: Missing flags separator.")
}c=a.substring(0,b).split(",");
f=a.substring(b+1);
b=f.indexOf(":");
if(b<0){throw Error("Capture xdreceiver: Missing func separator.")
}a=f.substring(0,b);
d=decodeURIComponent(f.substring(b+1));
g={refresh:function(){h.document.cookie="janrain_sso_checked=;expires="+(new Date).toGMTString()+";path=/;"
},logout:function(a){g.refresh();
h.document.location.href=a
}};
if(function(a,c){for(var b=0;
b<a.length;
b++){if(a[b]==c){return b
}}return -1
}(c,"sso")>=0){e=g[a],e(d)
}else{try{e=window.eval(a);
if(typeof e=="undefined"){throw Error("unable to eval "+a)
}window.setTimeout(function(){e(d)
},0)
}catch(i){window.console&&console.log&&console.log("xdcomm: error running function "+a)
}}}window.addEventListener?(c("Setting up event listener 3"),window.addEventListener("message",d,false)):window.attachEvent?(c("Setting up event listener 1"),window.attachEvent("onmessage",d)):document.attachEvent?(c("Setting up event listener 2"),document.attachEvent("onmessage",d)):c("Failed to setup an event listener")
})(this)
};
$(function(){window.dailybeast=window.dailybeast||{};
window.dailybeast.livefyre=window.dailybeast.livefyre||function(){var B={};
B.lfScripts=$("[data-lf-domain]");
B.network=B.lfScripts.length>0?$(B.lfScripts[0]).attr("data-lf-domain"):"";
B.commentContainer=$("#livefyre");
B.config=B.commentContainer.length>0?$.parseJSON(B.commentContainer.attr("data-livefyre")):{};
B.liveCountHeader=B.commentContainer.find(".comment-count-header");
B.liveCount=$('[data-lf-article-id="'+B.config.articleId+'"]');
return B
}();
var A=dailybeast.livefyre;
A.authDelegate=new fyre.conv.BackplaneAuthDelegate(window.Backplane);
A.authDelegate.login=function(){dailybeast.janrain.openLoginForm()
};
A.authDelegate.logout=function(){dailybeast.janrain.logout()
};
A.authDelegate.viewProfile=function(){};
A.authDelegate.editProfile=function(){};
A.updateLiveCount=function(B){if(!$.isEmptyObject(A.liveCount)){A.liveCount.html("Comments ("+B+")")
}};
A.updateLiveCountHeader=function(B){if(!$.isEmptyObject(A.liveCountHeader)){B>=10?A.liveCountHeader.html("("+B+")"):A.liveCountHeader.html("")
}};
A.onCommentCountUpdated=function(B){$.log("Latest count from LF stream event:"+B);
if(B>=0){A.updateLiveCount(B);
A.updateLiveCountHeader(B)
}};
A.enableNotifier=function(){if($.tdburl.hash.lfNotify=="true"){if($(".fyre-notifier-container").length>0){$.log("Enabling the LF notifier",$(".fyre-notifier-container"));
$(".fyre-notifier-container").css("left","0px")
}else{setTimeout(A.enableNotifier,1000)
}}};
A.lfready=function(B){B.on("commentCountUpdated",A.onCommentCountUpdated);
if(!$.isEmptyObject(A.liveCount)&&A.liveCount.html()==""){A.updateLiveCount(0)
}A.commentContainer.show();
A.enableNotifier()
};
A.init=function(){try{$.log("Initializing livefyre on the Beast",A.network);
if($("#livefyre").length>0){fyre.conv.load({network:A.network,authDelegate:A.authDelegate},[A.config],A.lfready)
}LF.CommentCount({replacer:function(C,E){var D=$(C).attr("data-lf-article-id");
if(D==A.config.articleId){$.log("Deferring to live count - as the article id has a stream on the page")
}else{$.log("LF CommentCount returned "+E+" for "+D);
if(E>=0){$(C).html("Comments ("+E+")")
}}}})
}catch(B){$.log("Could not init livefyre",B)
}};
A.init()
});