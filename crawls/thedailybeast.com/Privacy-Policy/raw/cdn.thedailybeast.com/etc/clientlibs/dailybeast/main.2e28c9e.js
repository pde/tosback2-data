var rightRail=$(".c-col-wrapper");
var ad=$(".floatingad .ad");
if(rightRail.length&&ad.length&&!dailybeast.modes.isEditMode){var spaceBetween=200;
var leftOffset=rightRail.offset().left+33;
var border=rightRail.offset().top+rightRail.height()+spaceBetween;
rightRail.bind("DOMSubtreeModified",function(){border=rightRail.offset().top+rightRail.height()+spaceBetween
});
window.onresize=function(){leftOffset=rightRail.offset().left+33;
ad.css("left",leftOffset)
};
function updateFloatingAd(){var B=window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop;
var A=$("#pageFooter").offset().top;
if(ad.floating==undefined&&B>border&&A-B>ad.height()){ad.stop().hide();
ad.css("position","fixed");
ad.css("top",-ad.height());
ad.css("left",leftOffset);
ad.show();
ad.animate({top:"0px"},700);
ad.floating=true
}else{if(ad.floating&&B<=border||A-B<ad.height()){ad.stop().animate({top:-ad.height()},"fast",function(){ad.css("position","");
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
}},_refresh:function(A){if((this._isReady()&&$(this.element).is(":visible"))||$(this.element).attr("showAd")=="true"){this._setReady(false);
this._render(this._generateUrl(A))
}},_render:function(B){var D=this;
var A="<script src='"+B+"'><\/script>";
writeCapture.writeOnGetElementById=true;
if(this.options.render=="false"){$(this.element).hide()
}var C=writeCapture.sanitize(A,{done:function(){D._setReady(true)
}});
$(this.element).html(C);
if(this._adParams.adDebug){this._enableDebugging(B)
}},_isReady:function(){return $.data(this.element,"isReady")
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
if(typeof console!="undefined"){console.log(B)
}$("body").append(D)
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
var primaryAccount="rtstdailybeast";
var contentPath=dailybeast.metatags.getContentPath();
if(isContentNewsweek(contentPath)){primaryAccount="rtstnewsweek"
}var s_account=primaryAccount+",rtstglobal";
if(phantomFacebookRequestCheck()||googleWebPreviewRequestCheck()){s_account="rtstdailybeastfbexclude"
}var s=s_gi(s_account);
s.charSet="ISO-8859-1";
s.currencyCode="USD";
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters="javascript:,www.thedailybeast.com,thedailybeast.com,outbrain.com,newsweek.com,localhost,127.0.0.1";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s._channelDomain="Social Media Sites|facebook.com,twitter.com,digg.com,stumbleupon.com,fark.com,reddit.com,linkedin.com,myspace.com,buzz.yahoo.com,delicious.com,del.icio.us,newsvine.com>MSN|.msn.com>MSNBC|msnbc.com,msnbc.msn.com";
s.usePlugins=true;
s.doPlugins=function(A){A.campaign=A.getQueryParam("cid");
if(!A.campaign){A.campaign=A.getQueryParam("cmpid");
A.campaign=A.getValOnce(A.campaign,"s_campaign",0)
}A.events=A.apl(A.events,"event1",",",1);
A.eVar1="D=c1";
A.eVar2="D=c2";
A.eVar3="D=c3";
A.eVar4="D=c4";
A.eVar5="D=c5";
A.eVar6="D=c12";
A.eVar7="D=c13";
A.eVar8="D=c21";
A.eVar9="D=c22";
A.prop31=isUserLoggedIn();
A.prop37=A.getTimeParting("h","-5");
A.prop38=A.getTimeParting("d","-5");
A.prop39=A.getTimeParting("w","-5");
A.eVar10="D=c37";
A.eVar11="D=c38";
A.eVar12="D=c39";
A.prop40=A.getNewRepeat();
A.eVar13="D=c40";
A.prop41=A.getDaysSinceLastVisit("s_lv");
A.eVar14="D=c41";
A.eVar16="D=pageName";
A.eVar19="D=c15";
A.eVar20="D=c16";
A.eVar21="D=c17";
A.eVar22="D=c6";
A.eVar23="D=c7";
A.eVar24="D=c8"
};
function isContentNewsweek(A){if(A==undefined){return false
}if(A.toLowerCase().indexOf("/content/newsweek")==0){return true
}return false
}function phantomFacebookRequestCheck(){var A=navigator.userAgent.toLowerCase();
if(A.indexOf("facebookexternalhit/*")!=-1){return true
}var C=window.location.href.toLowerCase();
if(C.indexOf("fb_xd_bust")!=-1){return true
}if(C.indexOf("fb_xd_fragment")!=-1){return true
}var B=document.referrer.toLowerCase();
if(B.indexOf("//www.facebook.com/plugins/")!=-1){return true
}return false
}function googleWebPreviewRequestCheck(){var A=navigator.userAgent.toLowerCase();
if(A.indexOf("google web preview")!=-1){return true
}return false
}function googleWebPreviewCheck(C){var B="";
var A=navigator.userAgent.toLowerCase();
if(A.indexOf("google web preview")==-1){return C
}return B
}var isUserLoggedIn=function(){var A=getCookie("userLoggedIn");
if(A=="true"){return"member"
}return"unregistered"
};
function getCookie(B){var A=document.cookie.split(/[; ]+/);
for(var C=0;
C<A.length;
C++){var D=A[C].substring(0,A[C].indexOf("="));
if(D==B){return A[C].substring(B.length+1)
}}}function trackReadMoreCollapseClick(B,A){s.linkTrackVars="events,prop19,prop20,prop23";
s.linkTrackEvents="event13";
s.events="event13";
s.prop23=B;
if(A!=undefined){s.prop19=A.attr("href")
}s.prop20=document.title;
s.tl(this,"o","Read More - Collapse Click")
}s.getQueryParam=new Function("p","d","u","var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k","if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''");
s.getValOnce=new Function("v","c","e","var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
s.getNewRepeat=new Function("d","cn","var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length==0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'New';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
s.getTimeParting=new Function("t","z","var s=this,cy;dc=new Date('1/1/2000');if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}else{;z=parseFloat(z);var dsts=new Date(s.dstStart);var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}if(t=='d'){return dow};if(t=='w'){return dt}}};");
s.getDaysSinceLastVisit=new Function("c","var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getTime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.setTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s.c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) return f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s!=f5) return '';else return cval_s;");
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.apl=new Function("l","v","d","u","var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)l=l?l+d+v:v;return l");
s.getPercentPageViewed=new Function("","var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("","var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
s.getPPVSetup=new Function("","var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s.getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,false);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEvent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCalc);}");
s.getPPVSetup();
s.getPreviousValue=new Function("v","c","el","var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.visitorNamespace="rtst";
s.trackingServer="rtst.122.2o7.net";
var s_code="",s_objectID;
function s_gi(F,G,P){var I="s.version='H.24.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",L=window,C=L.s_c_il,A=navigator,N=A.userAgent,M=A.appVersion,H=M.indexOf("MSIE "),B=N.indexOf("Netscape6/"),K,E,D,J,O;
if(F){F=F.toLowerCase();
if(C){for(D=0;
D<2;
D++){for(E=0;
E<C.length;
E++){O=C[E];
J=O._c;
if((!J||J=="s_c"||(D>0&&J=="s_l"))&&(O.oun==F||(O.fs&&O.sa&&O.fs(O.oun,F)))){if(O.sa){O.sa(F)
}if(J=="s_c"){return O
}}else{O=0
}}}}}L.s_an="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
L.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
L.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
L.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
L.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
L.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
L.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
L.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
I=s_d(I);
if(H>0){K=parseInt(E=M.substring(H+5));
if(K>3){K=parseFloat(E)
}}else{if(B>0){K=parseFloat(N.substring(B+10))
}else{K=parseFloat(M)
}}if(K<5||M.indexOf("Opera")>=0||N.indexOf("Opera")>=0){I=s_ft(I)
}if(!O){O=new Object;
if(!L.s_c_in){L.s_c_il=new Array;
L.s_c_in=0
}O._il=L.s_c_il;
O._in=L.s_c_in;
O._il[O._in]=O;
L.s_c_in++
}O._c="s_c";
(new Function("s","un","pg","ss",I))(O,F,G,P);
return O
}function s_giqf(){var A=window,E=A.s_giq,C,B,D;
if(E){for(C=0;
C<E.length;
C++){B=E[C];
D=s_gi(B.oun);
D.sa(B.un);
D.setTagContainer(B.tagContainerName)
}}A.s_giq=0
}s_giqf();
var dailybeast=dailybeast||{};
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
}this._adParams={};
var hash=window.location.hash;
if(hash.length>1){hash=hash.substring(1);
var params=hash.split(";");
for(var i=0;
i<params.length;
i++){var param=params[i].split("=");
this._adParams[param[0]]=param[1]
}}var data=eval("("+$(this).attr("data-breakout")+")");
var request=dailybeast.advertising.request.generateRequest({params:data.params,topic:data.topic,siteID:data.siteID,zone:data.zone,size:"1x2,300x600,300x250,395x533",tile:i,ord:dailybeast.interstitial.getOrd(),adParams:this._adParams});
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
if(typeof console!="undefined"){console.log(request)
}$("body").append(info)
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
E.prevAll().not(".quoteStart").not("div[data-brightcove]").hide();
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
$.widget("ui.brightcove",{options:{autoplay:false,userAgents:[/like Mac OS X/i],videoURL:"http://api.brightcove.com/services/library?command=find_video_by_id&media_delivery=http&video_id={videoPlayerID}&token=_5vx_9BTqETPP4_plTM4ivgSdhnj-d3MKPQIZxqEaoY.",videoPlayerID:"70306727001",width:"630",height:"389"},destroy:function(){$.widget.prototype.apply(this,arguments)
},_create:function(){if(this._isUserAgentMatch()){this._requestVideo()
}},_isUserAgentMatch:function(){var A=false;
for(i in this.options.userAgents.length){if(navigator.userAgent.match(this.options.userAgents[i])){A=true;
break
}}return A
},_requestVideo:function(){var B=$(this.element).find("object").attr("id");
var C=this.options.videoURL.replace("{videoPlayerID}",this.options.videoPlayerID);
var A=this;
$.ajax({url:C,dataType:"jsonp",success:function(D){A._renderVideo(D)
}})
},_renderVideo:function(B){var A=document.createElement("video");
if(!B.FLVFullLength.videoCodec=="H264"){A.setAttribute("src",B.FLVURL)
}else{for(video in B.renditions){if(B.renditions[video].videoCodec=="H264"){A.setAttribute("src",B.renditions[video].url);
break
}}}A.setAttribute("poster",B.videoStillURL);
A.setAttribute("controls","true");
A.setAttribute("autoplay",this.options.autoplay);
A.setAttribute("width",this.options.width);
A.setAttribute("height",this.options.height);
A.autoplay=this.options.autoplay;
$(this.element).empty().append(A)
}});
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
var dailybeast=dailybeast||{};
dailybeast.janrain=dailybeast.janrain||{};
dailybeast.janrain.recoverPassword=function(){var A=window.location.protocol+"//"+window.location.host;
$("#fancybox-frame").attr("src",A+"/content/dailybeast/services/password-reset.html?step=email")
};
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
 * jQuery Tools v1.2.6 - The missing UI library for the Web
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
(function(B){B.tools=B.tools||{version:"v1.2.6"},B.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};
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
}}),B.each(["onBeforeSeek","onSeek","onAddItem"],function(S,T){B.isFunction(Q[T])&&B(P).bind(T,Q[T]),P[T]=function(U){U&&B(P).bind(T,U);
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
}Q.keyboard&&B(document).bind("keydown.scrollable",function(S){if(!(!Q.keyboard||S.altKey||S.ctrlKey||S.metaKey||B(S.target).is(":input"))){if(Q.keyboard!="static"&&D!=P){return 
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
function G(){if(I){clearTimeout(I)
}I=setTimeout(function(){F.next()
},D.interval)
}F&&(C=F),F.play=function(){I||(H=!1,J.bind("onSeek",G),G())
},F.pause=function(){I=clearTimeout(I),J.unbind("onSeek",G)
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
},J&&(history.pushState({i:0}),B(window).bind("popstate",function(O){var P=O.originalEvent.state;
P&&N.seekTo(P.i)
}));
function H(O,Q,P){N.seekTo(Q),P.preventDefault(),J&&history.pushState({i:Q})
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
var AF=AG.nextSibling,AE=AG.parentNode;
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
}function B(G,H){A(G).append('<object id="myExperience'+H.src+'" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="'+H.width+'" /><param name="height" value="'+H.height+'" /><param name="playerID" value="'+(H.playerID?H.playerID:"1140772469001")+'" /><param name="playerKey" value="'+(H.playerKey?H.playerKey:"AQ~~,AAAAAAEDRq0~,qRcfDOX2mNtWW87VePrJiaFRXUo43tGn")+'" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="autoStart" value="'+C+'" /><param name="@videoPlayer" value="'+H.src+'" /><param name="wmode" value="opaque" /></object>')
}function F(G,H){A(G).append('<object class="video-player" width="'+H.width+'" height="'+H.height+'"><param name="movie" value="'+H.src+'"></param><param name="width" value="'+H.width+'" /><param name="allowFullScreen" value="true"></param><embed src="'+H.src+'" type="application/x-shockwave-flash" width="'+H.width+'" height="'+H.height+'" allowFullScreen="true"></embed></object>')
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
var dailybeast=dailybeast||{};
dailybeast.wrapstream=function(){var B="";
function D(){B=$(".stream");
$(".stream-more").live("click",function(E){E.preventDefault();
A(B.find(".stream-more a").data("src"),false)
});
$(".sort-oldest, .sort-newest").click(function(E){E.preventDefault();
$(this).parent().find("a").css("font-weight","normal");
$(this).css("font-weight","bold");
A($(this).data("src"),true)
});
$(".timeago").timeago();
$("[data-video]").once("data-video",function(){$(this).playOverlay(true)
});
$(".overlay").once("overlay",function(){$(this).verticalAlign()
});
$(".stream-gallery").once("stream-gallery",function(){$(this).slides({play:0,slideSpeed:500,pause:2500,hoverPause:true,generatePagination:false})
});
$("a.expand-collapse").click(function(){var E=$(this);
var F=E.siblings("a.more");
E.parent().siblings(".stream-read-more").slideToggle("slow",function(){C(E,F)
});
return false
});
$("a.arrowright").click(function(){var E=$(this).html();
trackReadMoreCollapseClick(E,$(this))
})
}function C(F,H){var G=F.html();
var E=F.data("expanded");
if(E||E===undefined){F.html("Collapse");
F.removeClass("arrowdown");
F.addClass("arrowup");
F.data("expanded",false);
H.show()
}else{F.html("Read More");
F.removeClass("arrowup");
F.addClass("arrowdown");
F.data("expanded",true);
H.hide()
}trackReadMoreCollapseClick(G,H)
}function A(F,E){B.find(".stream-more").remove();
if(F.length>0){$.ajax({url:F,success:function(G){if(E){B.html(G)
}else{B.append(G)
}$("[data-video]").once("data-video",function(){$(this).playOverlay(true)
});
$(".overlay").once("overlay",function(){$(this).verticalAlign()
});
$(".stream-gallery").once("stream-gallery",function(){$(this).slides({play:0,pause:2500,hoverPause:true,generatePagination:false})
});
if(typeof twttr!="undefined"){twttr.widgets.load()
}if(typeof FB!="undefined"){FB.XFBML.parse()
}if(typeof gapi!="undefined"){gapi.plusone.go()
}$("span[data-counter]").each(function(){new Echo.Counter({target:this,appkey:(window.location.hostname.substring(0,3)==="www"?"prod":"dev")+".newsweek.com",query:"childrenof:"+$(this).attr("data-counter")+" -source:Twitter"})
})
}})
}}return{init:D}
}();
var isAppleDevice=navigator.userAgent.match(/(iPad|iPhone|iPod)/i)!=null;
var isMacWebKit=$.browser.webkit&&(navigator.userAgent.match(/Mac OS/i)!=null);
$(function(){if(isAppleDevice){$("[data-brightcove]").each(function(){var data=$.parseJSON($(this).attr("data-brightcove"));
$(this).brightcove({videoPlayerID:data.videoPlayerID,width:data.width,height:data.height})
});
if($("[data-brightcove]")){$("body").bind("fancybox-open",function(event){$("[data-brightcove]").css("visibility","hidden")
});
$("body").bind("fancybox-close",function(event){$("[data-brightcove]").css("visibility","visible")
})
}}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("article[data-slideshow]").each(function(){var data=$.parseJSON($(this).attr("data-slideshow"));
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
function handleBackplaneLogin(msg){if(msg.type=="session/ready"){if(msg.payload.session){identityUrl=msg.payload.session.poco.entry.accounts[0].identityUrl;
$.cookie("userLoggedIn","true")
}}else{if(msg.type=="identity/logout"){$.cookie("userLoggedIn","false")
}}}var $loginForm=$(".userLogin");
var janrainConfig=$.parseJSON($loginForm.attr("data-janrain"));
if(!dailybeast.modes.isEditMode&&janrainConfig.domain!==""&&janrainConfig.clientId!==""){var busName="newsweek.com";
var appKey=(window.location.hostname.substring(0,3)==="www"?"prod":"dev")+".newsweek.com";
if(typeof Backplane!="undefined"){Backplane.init({serverBaseURL:"http://api.echoenabled.com/v1",busName:busName});
$.cookie("bp_channel_id",Backplane.getChannelID());
Backplane.subscribe(handleBackplaneLogin)
}var baseUrl=window.location.protocol+"//"+window.location.host;
var redirectUrl=encodeURIComponent(baseUrl+"/content/dailybeast/services/janrain.html");
var xdReceiverUrl=encodeURIComponent(baseUrl+"/etc/static/dailybeast/capture_xdcomm.html");
var login={width:666,height:728,url:"https://"+janrainConfig.domain+"/oauth/signin?client_id="+janrainConfig.clientId+"&response_type=code&redirect_uri="+redirectUrl+"&xd_receiver="+xdReceiverUrl+"&recover_password_callback=dailybeast.janrain.recoverPassword&bp_channel="};
var register={width:666,height:728,url:"https://"+janrainConfig.domain+"/oauth/legacy_register?client_id="+janrainConfig.clientId+"&flags=stay_in_window&response_type=code&redirect_uri="+redirectUrl+"&xd_receiver="+xdReceiverUrl+"&recover_password_callback=dailybeast.janrain.recoverPassword&bp_channel="};
if($loginForm.length>0){new Echo.Auth({target:$loginForm.get(0),appkey:appKey,identityManager:{login:login,edit:login,signup:register},plugins:[{name:"TDBLogin"}]})
}var targetUrl=window.location.protocol+"//"+window.location.host+window.location.pathname;
targetUrl=targetUrl.replace(/\.[0-9]+\.html$/i,".html");
$("div[data-echo]").each(function(){var $echo=$(this);
var data=$.parseJSON($echo.attr("data-echo"));
var enableComments=!(data.disable)||true;
var enableReplies=data.lockThread||true;
var formAuth={name:"FormAuth",identityManagerLogin:login,identityManagerSignup:register,identityManagerEdit:login,submitPermissions:"forceLogin",nestedPlugins:[{name:"BeastCommentsLogin"}]};
var $submit=$echo.find(".comments-submit-form");
if($submit.length>0){var submitConfig={target:$submit.get(0),appkey:appKey,targetURL:targetUrl,postingTimeout:90,plugins:[formAuth]};
new Echo.Submit(submitConfig)
}var $stream=$echo.find(".comments-stream");
if($stream.length>0){var streamConfig={appkey:appKey,target:$stream.get(0),query:"childrenof:"+targetUrl+" -source:Twitter -state:ModeratorDeleted,ModeratorFlagged,SystemFlagged -user.state:ModeratorBanned childrenItemsPerPage:100 childrenSortOrder:chronological children:1 -source:Twitter -state:ModeratorDeleted,ModeratorFlagged,SystemFlagged -user.state:ModeratorBanned",flashColor:"#EFEFEF",slideTimeout:500,fadeTimeout:500,liveStreamItems:5,streamStateLabel:{icon:false,text:false},plugins:[{name:"BeastComments"},{name:"Curation"},{name:"Like"},{name:"CommunityFlag"},{name:"UserPrivileges"},{name:"UserBan"},{name:"HeaderControls"},{name:"Whirlpools",after:2,clickable:true}]};
if(enableComments&&enableReplies){streamConfig.plugins.push({name:"Reply",nestedPlugins:[formAuth]})
}new Echo.Stream(streamConfig)
}});
$("span[data-counter]").each(function(){new Echo.Counter({target:this,appkey:appKey,query:"childrenof:"+$(this).attr("data-counter")+" -source:Twitter"})
})
}if($("#video-page").length>0){dailybeast.videopage.init()
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
}$form.find("button[name=cancel]").click(function(){if(events.cancel){events.cancel($form,$button)
}return false
});
$button.click(function(){email=$form.find("[name=email]").val();
$form.find("[name=email]").blur();
$form.find("[name=email]").attr("disabled",true);
var data={email:email!="Enter your email address"?email:""};
if(events.submit){events.submit($form,$button)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:data,dataType:"json",complete:function(){if(events.complete){events.complete($form,$button)
}},success:function(data){if(data.msg!==undefined&&(data.msg.toLowerCase().indexOf("invalid")!=-1||data.msg.toLowerCase().indexOf("enter")!=-1)){showMessage("Please provide a valid email address.",false);
$form.find("[name=email]").attr("disabled",false);
if(events.cancel){events.cancel($form,$button)
}}else{if(data.msg!==undefined&&data.msg.toLowerCase().indexOf("please select")==-1){showMessage(data.msg,false);
$form.find("[name=email]").attr("disabled",false)
}else{if(events.validateComplete){events.validateComplete($form)
}}}},error:function(xhr){var data=$.parseJSON(xhr.responseText);
if(data.msg!=undefined){showMessage(data.msg,true)
}}});
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
function introduceSlide(slide){slide.find("[data-video]").playOverlay(true,true);
slide.find(".heading-container, .title, .switcher-overlay").fadeIn();
slide.find("img").not(".switcher-overlay").animate({opacity:1},100);
if(isAppleDevice){slide.find("[data-video]").click();
slide.mouseover(function(){if(slide.find("iframe, object")){slide.find(".title").hide()
}})
}slide.find("[data-video]").click(function(){slide.find(".title").hide()
});
slide.find(".title").show()
}function hideSlide(slide){slide.find(".heading-container, .title, .switcher-overlay").fadeOut(100);
slide.find("[data-video]").find("iframe, object").remove();
slide.find("img").not(".switcher-overlay").animate({opacity:0.3},100).fadeIn();
slide.find(".data-video-processed a").not(".switcher-overlay").fadeIn()
}var slide;
$(window).load(function(){switcher.scrollable({circular:true,onSeek:function(e,index){if(!slide){slide=$(this.getItems()[0])
}hideSlide(slide);
slide=$(this.getItems()[index]);
introduceSlide(slide)
}});
if(slides.size()>1){slides.slice(1,2).not(".ad").clone().addClass("cloned").appendTo(".switcher .items");
slides.slice(slides.size()-2,slides.size()-1).not(".ad").clone().addClass("cloned").prependTo(".switcher .items");
$(".switcher .items").css("left",(-$(slides[0]).position().left));
if(!($.browser.msie&&$.browser.version=="7.0")){switcher.navigator()
}$(".switcher .browse-link").show()
}introduceSlide($(slides[0]));
if($.browser.msie&&$.browser.version=="7.0"){$(".switcher-wrapper .title").css("bottom","60px")
}var el=$(".switcher .navi");
el.css("left",el.parent().width()/2-el.width()/2-5);
$(".switcher-wrapper").css("visibility","visible");
if($.browser.webkit){$(".switcher .scrollable .ad a img").css("border-left-width","0px")
}})
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
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".wrap-twitter .items").twitter({query:$(".wrap-twitter .items").data("query"),count:$(".wrap-twitter .items").data("limit")})
}if(dailybeast.metatags.getTemplate()=="wrap"){trackReadMoreCollapseClick("Wrap Page View")
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
var newsweek=newsweek||{};
newsweek.Flyout=function(A,C){var B=this;
this.duration=500;
this.$e=A;
A.find(".flyout-ad").css("background-image","url("+C+")");
A.find(".flyout-header, .minimize").click(function(){B.toggle();
return false
});
A.find(".close").click(function(){B.close();
return false
})
};
newsweek.Flyout.prototype.start=function(B,C){var A=this;
setTimeout(function(){A.show();
if(C!=0){A.autoCloseTimeout=setTimeout(function(){A.toggle()
},C)
}},B)
};
newsweek.Flyout.prototype.show=function(){this.$e.find(".cover").attr("src",newsweek.coverUrl||"");
this.$e.show().animate({bottom:10},this.duration)
};
newsweek.Flyout.prototype.toggle=function(){if(this.autoCloseTimeout){clearTimeout(this.autoCloseTimeout);
delete this.autoCloseTimeout
}this.$e.find(".flyout-body").slideToggle(this.duration);
this.$e.find(".minimize").toggleClass("minimized")
};
newsweek.Flyout.prototype.close=function(){this.$e.remove()
};