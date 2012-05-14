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
window.Backplane=window.Backplane||{channelByBus:{},config:{},initialized:false,subscribers:{},awaiting:{since:0,until:0,queue:[]},intervals:{min:1,frequent:5,regular:60,slowdown:120}};
Backplane.init=function(A){A=A||{};
if(this.initialized||!A.serverBaseURL||!A.busName){return false
}this.initialized=true;
this.timers={};
this.config=A;
this.channelByBus=this.getCookieChannels();
this.config.customChannelName=A.channelName;
this.config.channelName=this.getChannelName();
this.config.serverBaseURL=this.normalizeURL(A.serverBaseURL);
this.config.channelID=this.generateChannelID();
this.request();
return true
};
Backplane.subscribe=function(B){if(!this.initialized){return false
}var A=(new Date()).valueOf()+Math.random();
this.subscribers[A]=B;
return A
};
Backplane.unsubscribe=function(A){if(!this.initialized||!A){return false
}delete this.subscribers[A]
};
Backplane.getChannelID=function(){if(!this.initialized){return false
}return this.config.channelID
};
Backplane.expectMessages=function(A){this.expectMessagesWithin(60,A)
};
Backplane.expectMessagesWithin=function(A,B){if(!this.initialized||!A){return false
}this.awaiting.since=this.getTS();
this.awaiting.interval=A;
this.awaiting.nonstop=!B;
if(B){B=typeof B=="string"?[B]:B;
this.awaiting.queue.push(B)
}var C=this.awaiting.since+A;
if(C>this.awaiting.until){this.awaiting.until=C
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
Backplane.getCookieChannels=function(){var C=(document.cookie||"").match(/backplane-channel=(.*?)(?:$|;)/);
if(!C||!C[1]){return{}
}var B={};
var E=C[1].split("|");
for(var D=0;
D<E.length;
D++){var A=E[D].split(":");
B[decodeURIComponent(A[0])]=decodeURIComponent(A[1])
}return B
};
Backplane.setCookieChannels=function(){var B=[];
for(var A in this.channelByBus){if(this.channelByBus.hasOwnProperty(A)){B.push(encodeURIComponent(A)+":"+encodeURIComponent(this.channelByBus[A]))
}}var C=new Date();
C.setFullYear(C.getFullYear()+5);
document.cookie="backplane-channel="+B.join("|")+";expires="+C.toGMTString()+";path=/"
};
Backplane.resetCookieChannel=function(){delete this.channelByBus[this.config.busName];
this.setCookieChannels();
this.config.channelName=this.getChannelName();
this.config.channelID=this.generateChannelID()
};
Backplane.normalizeURL=function(A){return A.replace(/^\s*(https?:\/\/)?(.*?)[\s\/]*$/,function(B,D,C){return(D||window.location.protocol+"//")+C
})
};
Backplane.calcTimeout=function(){var D,B=this.getTS();
if(B<this.awaiting.until){if(!this.awaiting.nonstop&&!this.awaiting.queue.length){this.awaiting.until=B;
return this.calcTimeout()
}var C=B-this.awaiting.since;
var A=this.intervals.frequent-this.intervals.min;
D=this.intervals.min+Math.round(A*C/this.awaiting.interval)
}else{if(B<this.awaiting.until+this.intervals.slowdown){var C=B-this.awaiting.until;
var A=this.intervals.regular-this.intervals.frequent;
D=this.intervals.frequent+Math.round(A*C/this.intervals.slowdown)
}else{D=typeof this.since=="undefined"?0:this.intervals.regular;
this.awaiting.nonstop=false
}}return D*1000
};
Backplane.request=function(){var A=this;
if(!this.initialized){return false
}this.stopTimer("regular");
this.stopTimer("watchdog");
this.timers.regular=setTimeout(function(){A.timers.watchdog=setTimeout(function(){A.request()
},5000);
var C=document.createElement("script");
C.type="text/javascript";
C.charset="utf-8";
C.src=A.config.channelID+"?callback=Backplane.response"+(A.since?"&since="+encodeURIComponent(A.since):"")+"&rnd="+Math.random();
var B=document.getElementsByTagName("head")[0]||document.documentElement;
B.insertBefore(C,B.firstChild);
C.onload=C.onreadystatechange=function(){var D=C.readyState;
if(!D||D==="loaded"||D==="complete"){C.onload=C.onreadystatechange=null;
if(C.parentNode){C.parentNode.removeChild(C)
}}}
},this.calcTimeout())
};
Backplane.response=function(D){var I=this;
this.stopTimer("watchdog");
D=D||[];
var H=D.length?D[D.length-1].id:this.since;
if(typeof this.since=="undefined"){D=[]
}this.since=H||"";
for(var F=0;
F<D.length;
F++){for(var E in this.subscribers){if(this.subscribers.hasOwnProperty(E)){this.subscribers[E](D[F].message)
}}var G=[];
for(var C=0;
C<this.awaiting.queue.length;
C++){var A=false;
for(var B=0;
B<this.awaiting.queue[C].length;
B++){if(this.awaiting.queue[C][B]==D[F].message.type){A=true
}}if(!A){G.push(this.awaiting.queue[C])
}}this.awaiting.queue=G
}this.request()
};
Backplane.stopTimer=function(A){var B=this.timers[A];
if(B){clearTimeout(B)
}};
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
A.addCss(".echo-application-message { padding: 15px 0px; text-align: center; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; border: 1px solid #E4E4E4; }.echo-application-message-icon { display: inline-block; height: 16px; padding-left: 16px; background: no-repeat left center; }.echo-application-message .echo-application-message-icon { padding-left: 21px; height: auto; }.echo-application-message-empty { background-image: url(//c0.echoenabled.com/images/information.png); }.echo-application-message-loading { background-image: url(//c0.echoenabled.com/images/loading.gif); }.echo-application-message-error { background-image: url(//c0.echoenabled.com/images/warning.gif); }","application")
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
$.widget("ui.echo",{options:{appKey:"dev.newsweek.com",busName:"thedailybeast.com",serverBaseURL:"http://api.echoenabled.com/v1",enableComments:true,enableReplies:true,enableLikes:true,enableWhirlPool:true,enableCommunityFlag:true,enableUserBan:true,targetURL:window.location.protocol+"//"+window.location.host+window.location.pathname,identityManager:{url:"https://signin.thedailybeast.com/openid/embed?flags=stay_in_window,no_immediate&token_url=http%3A%2F%2Fechoenabled.com%2Fapps%2Fjanrain%2Fwaiting.html&bp_channel=",width:420,height:260},elements:{submit:null,stream:null,counter:null},plugins:{submit:[],stream:[]}},destroy:function(){$.widget.prototype.apply(this,arguments)
},getAuth:function(){return _.deepClone(this._baseAuth)
},_create:function(){var B=this.options;
this._elements={};
for(var A in B.elements){this._elements[A]=$(B.elements[A])
}this._baseConfig={appkey:B.appKey,plugins:[]};
this._baseAuth={name:"FormAuth",identityManagerLogin:B.identityManager,identityManagerSignup:B.identityManager,identityManagerEdit:B.identityManager,submitPermissions:"forceLogin"};
if(typeof Backplane!=="undefined"){Backplane.init({serverBaseURL:B.serverBaseURL,busName:B.busName});
$(document).trigger("echo-backplane-init");
if(B.elements.submit.length>0){this._renderSubmit()
}if(B.elements.stream.length>0){this._renderStream()
}}if(B.elements.counter.length>0){this._renderCounter()
}},_renderSubmit:function(){var C=this.options;
var A=_.deepClone(this._baseConfig);
A.target=this._elements.submit.get(0);
A.targetURL=C.targetURL;
A.postingTimeout=90;
var B=_.deepClone(this._baseAuth);
A.plugins.push(B);
_.each(C.plugins.submit,function(D){A.plugins.push(D)
});
new Echo.Submit(A)
},_renderStream:function(){var C=this.options;
var A=_.deepClone(this._baseConfig);
A.target=this._elements.stream.get(0);
A.query="childrenof:"+C.targetURL;
A.flashColor="#EFEFEF";
A.slideTimeout=500;
A.fadeTimeout=500;
A.liveStreamItems=5;
A.streamStateLabel={icon:false,text:false};
_.each(C.plugins.stream,function(D){A.plugins.push(D)
});
var B=_.deepClone(this._baseAuth);
A.plugins.push({name:"Curation"});
if(C.enableReplies&&C.enableComments){A.plugins.push({name:"Reply",nestedPlugins:[{name:"FormAuth",identityManagerLogin:{width:420,height:260,url:"loginPromptURL"},identityManagerSignup:{width:420,height:260,url:"signupPromptURL"},identityManagerEdit:{width:420,height:260,url:"editPromptURL"}}]})
}if(C.enableLikes){A.plugins.push({name:"Like",nestedPlugins:[B]})
}if(C.enableWhirlPool){A.plugins.push({name:"Whirlpools",after:2,clickable:true})
}if(C.enableUserBan){A.plugins.push({name:"UserBan"})
}if(C.enableCommunityFlag){A.plugins.push({name:"CommunityFlag"})
}A.plugins.push({name:"UserPrivileges"});
new Echo.Stream(A)
},_renderCounter:function(){var B=this.options;
var A=_.deepClone(this._baseConfig);
A.target=this._elements.counter.get(0);
A.query="childrenof:"+B.targetURL;
new Echo.Counter(A)
}});