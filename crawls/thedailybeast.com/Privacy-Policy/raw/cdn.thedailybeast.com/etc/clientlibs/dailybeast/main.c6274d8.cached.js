var cCol=$(".c-col-wrapper");
var ad=$(".floatingad .ad");
if(cCol.length&&ad.length&&!dailybeast.modes.isEditMode){var spaceBetweenColAndAd=200;
var adLeftOffset=cCol.offset().left+33;
$(window).on("resize",function(){adLeftOffset=cCol.offset().left+33;
ad.css("left",adLeftOffset)
});
function updateFloatingAd(){var A=window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop;
var C=cCol.offset().top+cCol.height()+spaceBetweenColAndAd;
var B=$("#ad-bottom").offset().top-A;
if(ad.length&&ad.floating==undefined&&A>C&&B>ad.height()){if($(".floatingad ").height()>100){$(".floatingad").height($(".floatingad ").height())
}ad.css("position","fixed");
ad.css("top",-ad.height());
ad.css("left",adLeftOffset);
ad.animate({top:"0px"},700);
ad.floating=true
}else{if(ad.floating&&A<=C||B<ad.height()){ad.stop().animate({top:-ad.height()},"fast",function(){ad.css("position","");
ad.floating=undefined
})
}}}if(!isMobile.any()){$(window).on("scroll",updateFloatingAd)
}}$.widget("ui.advertising",{options:{iFrame:false,editNamespace:"edit",adNamespace:"ad",entityNamespace:"entity",topicNamespace:"topic",packageNamespace:"package",audienceScienceCookie:"rsi_segs",customTile:"false",disable:"false",render:"true",siteID:"5480.iac.thedailybeast",topic:"",size:"",params:null,tile:1,ord:dailybeast.interstitial.getOrd(),zone:"",template:""},refresh:function(A){this._refresh(A)
},hide:function(){this._hide()
},show:function(){this._show()
},_create:function(){if(this.options.disable=="false"){this._setSize();
this._setAdParams();
$.data(this.element,"isReady",true)
}},_refresh:function(A){if((this._isReady()&&$(this.element).is(":visible"))||$(this.element).attr("forceShowing")=="true"){this._setReady(false);
this._render(this._generateUrl(A))
}},_render:function(C){var E=this;
if(!E._adParams.adDisable){if(this.options.iFrame){$(this.element).html('<iframe width="'+this._width+'" height="'+this._height+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowTransparency="true" src="/etc/static/dailybeast/dart.html#'+encodeURIComponent(C)+'"/>');
this._setReady(true)
}else{var B="<script src='"+C+"'><\/script>";
var D=navigator.userAgent.toLowerCase();
var A=/android 2\.3/i.test(D);
if($.browser.msie||A){writeCapture.proxyGetElementById=true
}else{writeCapture.writeOnGetElementById=true
}$(this.element).html(writeCapture.sanitize(B,{done:function(){E._setReady(true);
if(E._adParams.adDebug){E._enableDebugging(C)
}if($(E.element).html().indexOf("grey.gif")>=0){$(E.element).hide()
}}}))
}}},_isReady:function(){return $.data(this.element,"isReady")
},_setReady:function(A){if(A){$.perf("Ad has completed loading,"+this)
}$.data(this.element,"isReady",A)
},_setAdParams:function(){this._adParams={};
var B=window.location.hash;
if(B.length>1){B=B.substring(1);
var D=B.split(";");
for(var A=0;
A<D.length;
A++){var C=D[A].split("=");
this._adParams[C[0]]=C[1]
}}},_generateUrl:function(A){return dailybeast.advertising.request.generateRequest({siteID:this.options.siteID,zone:this.options.zone,template:this.options.template,element:this.element,tile:this.options.tile,size:this.options.size,params:this.options.params,ord:A,adParams:this._adParams})
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
D.attr("style","background: white; border: 3px solid #D1232A; padding: 5px; position: absolute; width: 300px; z-index: 9998; word-wrap:break-word; color:black");
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
(function(A){function B(E,D){var C=this;
this.$parent=E;
this.IMAGE_SIZES=["medium","large","xlarge"];
this.IMAGE_SIZE_DIVISOR=700;
this.init();
this.settings=A.extend({onClose:function(){var F=C.$gallery.find(".btn-close-x").attr("href");
if(document.referrer&&!GalleryUrlUtil.isAGallery(document.referrer)){F=document.referrer
}A.log("Closing and navigating to:"+F);
window.location=F
}},D);
if(D.data!==undefined){this.setViewData(D.data)
}this.bindWindowAndDocumentEvents();
if(A("#gallery").length===1){this.assignDomElements();
this.attachEvents();
if(!this.checkHash()){this.trackPageView()
}this.resize()
}setTimeout(function(){C.$imageCanvas.css("visibility","visible");
C.$gallery.find(".aside .copy").css("visibility","visible")
},2000)
}B.prototype={init:function(){this.fullScreen=false;
this.captions=true;
this.clickCount=0;
this.shownInterstitial=false;
this.imageSizeIndex=1;
this.imageSizeIndexLoaded=1;
this.updatingImage=false;
this.first=true
},reset:function(){this.init();
this.slideIndex=0;
this.data.currentSlide=this.slideIndex;
this.galleryContext=baseContext.push(this.data).push(this.data);
this.setSlideHash();
this.render();
this.bindWindowAndDocumentEvents()
},setViewData:function(C){this.init();
this.data=C;
this.gallery=C;
this.slideIndex=C.currentSlide;
this.slideCount=C.slides.length;
this.galleryContext=baseContext.push(C).push(C);
this.slideUrlMapping=this.getSlideUrlMapping(C)
},bindWindowAndDocumentEvents:function(){var D=this,E=true,C=window.location.hash;
A(window).unbind(".galleryView").bind("resize.galleryView",function(){D.resize()
}).bind("orientationchange.galleryView",function(){D.resize()
}).bind("popstate.galleryView",function(F){if(F.originalEvent&&D.gallery&&!D.isSameGallery(window.location.pathname)&&GalleryUrlUtil.isAGallery(D.getCurrentRelativeUrl())){D.loadGallery(D.getCurrentRelativeUrl(),false)
}}).bind("hashchange.galleryView",function(){if(!E||window.location.hash!==C){D.renderUrl(D.getCurrentRelativeUrl())
}E=false
});
A(document).unbind(".galleryView").bind("keydown.galleryView",function(F){if(F.keyCode===37){D.previous();
dailybeast.analytics.trackGalleryClick("PREVIOUSKEY",D.fullScreen)
}else{if(F.keyCode===39){D.next();
dailybeast.analytics.trackGalleryClick("NEXTKEY",D.fullScreen)
}}});
if(this.moreGalleriesView!==undefined){this.moreGalleriesView.bindWindowEvents()
}},unbindWindowAndDocumentEvents:function(){A(window).unbind(".galleryView");
A(document).unbind(".galleryView");
if(this.moreGalleriesView!==undefined){this.moreGalleriesView.unbindWindowEvents()
}},loadGallery:function(D,E){var C=this;
this.$parent.addClass("gallery-loader");
A.ajax(D.replace(/\.html.*/,".gallery.json"),{dataType:"json",success:function(I){var H=I.slides,F,J;
for(F=0,J=H.length;
F<J;
F++){if(H[F].url===D){I.currentSlide=F
}}C.setViewData(I);
if(this.relatedGalleriesView!==undefined){C.relatedGalleriesView.remove()
}var G=A(location).attr("href");
C.render();
if(E){C.pushState()
}C.$parent.removeClass("gallery-loader");
C.trackPageView(G)
},error:function(F){if(F.status==404){window.location.href="/404"
}}})
},render:function(){var D=this,C=A("#gallery");
renderTemplate("dailybeast/components/gallery2/gallery",baseContext.push(this.data),function(E){if(C.length===0){D.$parent.html(E)
}else{C.replaceWith(E)
}D.assignDomElements();
D.bindWindowAndDocumentEvents();
D.attachEvents();
D.resize();
D.initAds();
D.refreshAds();
D.shareTools.refresh("gallery");
D.header.undimTitle();
D.header.pushBrowserTitle(D.gallery.longTitle)
})
},trackPageView:function(K){function J(R){var U=window.location.search.substring(1);
if(_.hasValue(U)){var Q=U.split("&");
for(var T=0;
T<Q.length;
T++){var S=Q[T].split("=");
if(decodeURIComponent(S[0])==R){var P=decodeURIComponent(S[1]);
return P
}}}return undefined
}var C=this.gallery.id.indexOf("newsweek")===-1?"db":"nw",G="Gallery 2",F=C+" - "+G+" - "+this.gallery.title;
var O=J("source");
if(O){var L=J("account");
var D=J("medium");
dailybeast.analytics.trackSocialMedia(F,O,L,D)
}var N=J("ref");
var I=window.location.protocol+"//"+window.location.host+this.gallery.slides[this.slideIndex].url,M=this.gallery.id.replace("/content",""),H="";
A.each(this.gallery.tags,function(Q,P){if(H===""){H=P.id
}else{H+="|"+P.id
}});
var E;
E=dailybeast.metatags.getPlatform();
if(!K){K=this.referringUrl
}dailybeast.analytics.trackPageview({pageNum:this.slideIndex,url:I,referer:K,pageName:F,previousPageName:this.previousPageTitle,templateName:this.gallery.type,contentPath:M,wrapName:this.gallery.wrap,tags:H,platform:E,campaignTracking:N})
},resize:function(){var L=A(window).height(),D=this.$gallery.find(".gallery-content").width(),F=this.$gallery.find(".heading").outerHeight(true),J=this.$gallery.find(".info-thbnail-wrapper").outerHeight(true),H=this.$gallery.find(".heading-slide").outerHeight(),C=this.$gallery.find(".ad-aside").outerHeight(true),K=(L-F-25)-(H+C),E=this.$gallery.find(".ad-fullscreen").outerHeight(true),I=this.$gallery.find(".main").width(),G=L-J-10-E;
if(!this.fullScreen){this.$gallery.find(".text").css("height",K);
G=L-F-J-10
}this.$gallery.find(".img-canvas-wrapper, .img-canvas").css({height:G,width:I});
this.$image.css({"max-height":G,"max-width":I});
this.viewAllView.resize(D,L-F);
this.updateImageSize()
},attachEvents:function(){var D=this;
D.previousPageTitle=D.getBrowserTitle();
this.$image.one("load",function(){if(!D.updatingImage&&A(this).css("visibility")==="hidden"){D.showImageCanvasAndText()
}});
this.$gallery.on("click.GalleryView","a[href]",function(){var E=A(this).attr("href");
if(D.isSameGallery(E)&&D.getCurrentRelativeUrl()!==E){D.showInterstitialAdIfAppropriate()
}else{if(Modernizr.history&&GalleryUrlUtil.isAGallery(E)){D.loadGallery(E,true);
return false
}}});
this.viewAllView=new ViewAllView(this.$gallery.find(".gallery-content"),this.gallery.slides);
var C=new PagedDataProvider(function(G,F){var E=D.gallery.id+".related-gallery."+G+"."+F+".json";
A.log("fetching related galleries data from "+E);
return E
},{pageSize:50,eager:true,eagerness:0.4,listProperty:"galleries"});
this.moreGalleriesView=new MoreGalleriesView(this.$gallery.find(".heading"),C);
this.$imageCanvasWrapper.find(".next").click(function(){D.next();
dailybeast.analytics.trackGalleryClick("NEXT",D.fullScreen);
return false
});
this.$imageCanvasWrapper.find(".previous").click(function(){D.previous();
dailybeast.analytics.trackGalleryClick("PREVIOUS",D.fullScreen);
return false
});
this.updateButtons();
this.$imageCanvasWrapper.find(".next, .previous").focus(function(){A(this).blur()
});
this.$gallery.find(".enter-fullscreen-button").click(function(){D.moreGalleriesView.close();
D.enterFullScreen();
dailybeast.analytics.trackGalleryClick("FULLSCREEN",D.fullScreen);
return false
});
this.$gallery.find(".exit-fullscreen-button").click(function(){D.exitFullScreen();
dailybeast.analytics.trackGalleryClick("EXITFULLSCREEN",D.fullScreen);
return false
});
this.$gallery.find(".captions-button").click(function(){if(D.captions){D.showCaptions();
dailybeast.analytics.trackGalleryClick("SHOWCAPTIONS",D.fullScreen)
}else{dailybeast.analytics.trackGalleryClick("HIDECAPTIONS",D.fullScreen);
D.hideCaptions()
}return false
});
this.$gallery.find(".heading .btn-close-x").click(function(){D.close();
D.header.popBrowserTitle();
return false
});
this.$gallery.on("click.GalleryView",".aside .btn-close-x",function(){D.hideCaptions();
dailybeast.analytics.trackGalleryClick("HIDECAPTIONS-X",D.fullScreen);
return false
});
this.thumbnailView=new ThumbnailView(this.gallery.slides,this.slideIndex,this.gallery.introSlide);
this.header=new GalleryHeader();
this.relatedGalleriesView=new RelatedGalleriesView(this,C,this.header);
this.shareTools=new ShareTools(this.$gallery.find(".sharetools"))
},getCurrentRelativeUrl:function(){return window.location.pathname+window.location.hash
},checkHash:function(){return window.location.hash&&this.renderUrl(this.getCurrentRelativeUrl())
},next:function(){if(this.slideIndex+1<this.slideCount){this.renderSlide(this.slideIndex+1)
}else{this.referringUrl=A(location).attr("href");
window.location.hash="endSlide"
}},previous:function(){if(this.slideIndex-1>=0){this.renderSlide(this.slideIndex-1)
}},updateButtons:function(){var C=this.$imageCanvasWrapper.find(".previous");
if(this.slideIndex===0){C.hide()
}else{C.show()
}},showViewAll:function(){this.hideContent();
this.shareTools.hide();
this.hideImageCanvasAndText();
this.moreGalleriesView.close();
this.viewAllView.show(this.slideIndex);
this.resize();
dailybeast.analytics.trackGalleryClick("VIEWALL",this.fullScreen)
},showEndSlide:function(){var C=this;
dailybeast.analytics.trackGalleriesCompleteClick(this.referringUrl);
if(this.fullScreen){this.exitFullScreen()
}this.unbindWindowAndDocumentEvents();
this.moreGalleriesView.hide(function(){C.relatedGalleriesView.render()
})
},renderSlide:function(D,C){this.referringUrl=A(location).attr("href");
if(this.viewAllView){this.showContent();
this.viewAllView.hide()
}if(!this.fullScreen&&this.shareTools){this.shareTools.show()
}if(this.slideIndex!==D){this.slideIndex=D;
var E=this.gallery.slides[D];
this.setSlideHash();
this.thumbnailView.highlight(this.slideIndex);
this.updateImage(E,true);
this.$image.attr("alt",E.title);
if(C===undefined||C){this.showInterstitialAdIfAppropriate()
}}},renderUrl:function(D){var E=false;
if(D.indexOf("#viewAll")!==-1){this.showViewAll();
E=true
}else{if(D.indexOf("#endSlide")!==-1){this.showEndSlide();
E=true
}else{var C=this.slideUrlMapping[D];
if(C===undefined&&this.isSameGallery(D)){C=0
}if(C!==undefined&&C!==this.slideIndex){this.renderSlide(C,false);
E=true
}}}return E
},setSlideHash:function(){if(window.location.hash!==""||this.slideIndex!==0){var C=this.gallery.slides[this.slideIndex].url,D=C.lastIndexOf("#");
if(D!==-1){window.location.hash=C.substr(D+1,C.length)
}}},pushState:function(){var C=this.gallery.slides[this.slideIndex].url;
if(this.getCurrentRelativeUrl()!==C){history.pushState({galleryUrl:this.gallery.url,slideIndex:this.slideIndex},this.gallery.title,C)
}},preloadSlideImage:function(F){if(0<=F&&F<this.slideCount){var C=this.gallery.slides[F],D=this.IMAGE_SIZES[this.imageSizeIndex],E=C.image;
if(E.sizes&&E.sizes[D]!==undefined){A.log("preloading "+E.sizes[D]);
new Image().src=E.sizes[D]
}}},finishUpdateImage:function(H,D){var C=this,G=this.gallery.slides[this.slideIndex],E=this.IMAGE_SIZES[this.imageSizeIndex],F=G.image.sizes[E],I;
if(H===F){A.log("Rendering the rest of the slide");
this.hideImageCanvasAndText();
if(D){I=this.galleryContext.push(G,this.slideIndex,this.slideCount);
replaceTemplate("dailybeast/components/gallery2/info",I,this.$gallery.find(".info"));
renderTemplate("dailybeast/components/gallery2/aside",I,function(J){C.$gallery.find(".copy").replaceWith(J);
C.resize()
})
}C.$imageCanvas.find("img").attr("src",F);
this.updatingImage=false;
this.updateButtons();
this.showImageCanvasAndText()
}if(D){this.refreshAds();
this.trackPageView()
}},updateImage:function(I,D){var C=this,E=this.IMAGE_SIZES[this.imageSizeIndex],G=I.image;
if(G.sizes&&G.sizes[E]!==undefined){var H=G.sizes[E];
if(H!==this.$image.attr("src")){this.imageSizeIndexLoaded=this.imageSizeIndex;
A.log("Updating the image to:"+H);
this.showLoading(I,200);
var F=new Image();
A(F).bind("load",function(){C.hideLoading();
C.finishUpdateImage(H,D)
}).bind("error",function(){C.hideLoading()
});
this.updatingImage=true;
F.src=H
}}this.preloadSlideImage(this.slideIndex+1);
this.preloadSlideImage(this.slideIndex-1)
},updateImageSize:function(){var D=this.computeImageSizeIndex();
if(this.first||D>this.imageSizeIndexLoaded){this.first=false;
A.log("image size index increased - updating image now");
this.imageSizeIndex=D;
var C=this.gallery.slides[this.slideIndex];
this.updateImage(C)
}else{this.imageSizeIndex=D
}},computeImageSizeIndex:function(){var C=this.$imageCanvas.width();
return Math.min(Math.floor(C/this.IMAGE_SIZE_DIVISOR),this.IMAGE_SIZES.length-1)
},showContent:function(){this.$gallery.find(".content").show()
},hideContent:function(){this.$gallery.find(".content").hide()
},initAds:function(){dailybeast.advertising.init("#gallery")
},refreshAds:function(){var C=Math.random().toString();
C=C.substring(2,C.length);
this.$gallery.find(".ad-aside, .ad-footer, .ad-fullscreen-tracker").advertising("refresh",C)
},getSlideUrlMapping:function(C){var E={},D=0;
A.each(C.slides,function(){E[this.url]=D++
});
return E
},showInterstitialAdIfAppropriate:function(){if(!this.fullScreen&&!this.shownInterstitial&&++this.clickCount>4){A.log("displaying interstitial ad");
var C=this.$gallery.find(".ad-interstitial").show();
dailybeast.advertising.refresh(C);
this.shownInterstitial=true
}},enterFullScreen:function(){var C=this;
this.$gallery.fullScreen({callback:function(D){C.onFullScreenChange(D)
},fullscreenClass:"fullscreen",fakeFullscreen:true})
},exitFullScreen:function(){this.$gallery.cancelFullScreen()
},onFullScreenChange:function(C){this.fullScreen=C;
if(C){this.$gallery.find(".text").css("height","auto");
this.shareTools.hide();
dailybeast.advertising.refresh(this.$gallery.find(".ad-fullscreen"));
this.animateHeader();
this.moveAside();
this.hideCaptions();
this.header.disableFlexibleTitle()
}else{this.shareTools.show();
this.stopHeader();
this.moveAsideBack();
this.refreshAds();
this.header.enableFlexibleTitle()
}this.resize()
},moveAside:function(){var C=this.$gallery.find(".aside");
C.find("div[data-advertising] iframe").remove();
this.$imageCanvasWrapper.append(C)
},moveAsideBack:function(){this.$gallery.find(".aside").insertAfter(this.$gallery.find(".main")).show()
},showCaptions:function(){this.$gallery.find(".aside").slideDown();
this.$gallery.find(".captions-button").html("Hide Captions");
this.captions=false
},hideCaptions:function(){this.$gallery.find(".aside").slideUp();
this.$gallery.find(".captions-button").html("Show Captions");
this.captions=true
},close:function(){if(this.settings.onClose){A(window).unbind(".galleryView");
A(document).unbind(".galleryView");
this.settings.onClose()
}},isSameGallery:function(C){return this.isSameUrl(C,this.gallery.url)
},isSameUrl:function(D,C){D=D.match(/(https?:\/\/[^\/]*)?([^\.]*)/i)[2];
return C.indexOf(D)>=0
},showImageCanvasAndText:function(){this.$imageCanvas.stop(true,true).fadeTo(0,0).css("visibility","visible").fadeTo(300,1);
this.$gallery.find(".aside .copy").stop(true,true).fadeTo(0,0).css("visibility","visible").fadeTo(300,1)
},hideImageCanvasAndText:function(){this.$imageCanvas.stop(true,true).fadeTo(0,0).css("visibility","hidden").fadeTo(300,0);
this.$gallery.find(".aside .copy").stop(true,true).fadeTo(0,0).css("visibility","hidden").fadeTo(300,0)
},getBrowserTitle:function(){return A("title").html()
},showLoading:function(E,D){var C=this;
this.loadingSlide=E;
setTimeout(function(){if(C.loadingSlide===E){C.$imageCanvas.addClass("gallery-loader").find("img").addClass("loading")
}},D!==undefined?D:1)
},hideLoading:function(){this.loadingSlide=null;
this.$imageCanvas.removeClass("gallery-loader").find("img").removeClass("loading")
},assignDomElements:function(){this.$gallery=A("#gallery");
this.$imageCanvasWrapper=this.$gallery.find(".img-canvas-wrapper");
this.$imageCanvas=this.$gallery.find(".img-canvas");
this.$image=this.$imageCanvas.find("img")
},animateHeader:function(){var D=this,G=this.$gallery.find(".heading"),C=false,F=true,E=function(){G.animate({top:-G.outerHeight(true)},400);
F=false
};
this.headerTimeout=setTimeout(E,2000);
this.$gallery.bind("mousemove.fullscreenView",function(){if(!F&&!C){C=true;
G.animate({top:0},400,function(){C=false;
F=true
})
}clearTimeout(D.headerTimeout);
D.headerTimeout=setTimeout(E,2000)
})
},stopHeader:function(){clearTimeout(this.headerTimeout);
this.$gallery.unbind("mousemove.fullscreenView");
this.$gallery.find(".heading").stop(true,true).css("top","")
}};
window.GalleryView=B
})(jQuery);
(function(B){function A(C,D){this.$parent=C;
this.busy=false;
this.expanded=false;
this.grid=new FlexibleGrid(C,D,{itemHeight:163,itemWidth:171,mainTemplate:"dailybeast/components/gallery2/moregalleries/main",pageTemplate:"dailybeast/components/gallery2/moregalleries/page",itemsTemplate:"dailybeast/components/gallery2/moregalleries/galleries",afterNext:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESNEXT")
},afterPrevious:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESPREVIOUS")
},afterRender:function(){B(".more-galleries").lazyImage()
}});
this.grid.show();
this.attachEvents()
}A.prototype={attachEvents:function(){var C=this;
this.$parent.find(".more-gallery").click(function(){if(!C.busy){if(C.expanded){C.close()
}else{C.open();
dailybeast.analytics.trackGalleryClick("MOREGALLERIES",false)
}}return false
});
B("#gallery .more-galleries").on("click","li a",function(){dailybeast.analytics.trackMoreGalleriesConversionClick("MOREGALLERIES",B(location).attr("href"),B(this).context.protocol+"//"+B(this).context.host+B(this).attr("href"))
})
},bindWindowEvents:function(){this.grid.bindWindowEvents()
},unbindWindowEvents:function(){this.grid.unbindWindowEvents()
},hide:function(C){this.close(C);
this.$parent.find(".more-gallery").hide()
},show:function(){this.$parent.find(".more-gallery").show()
},open:function(D){this.busy=true;
var C=this;
this.$parent.find(".more-galleries").slideDown("slow",function(){if(D!==undefined){D.call(null)
}C.busy=false
});
this.grid.resize();
this.expanded=true
},close:function(D){this.busy=true;
var C=this;
this.$parent.find(".more-galleries").slideUp("slow",function(){if(D!==undefined){D.call(null)
}C.busy=false
});
this.expanded=false
}};
window.MoreGalleriesView=A
})(jQuery);
(function(B){function A(C,D,E){this.galleryView=C;
this.relatedGalleriesArray=D;
this.header=E;
this.container=null;
this.slider=null;
this.isExpanding=false;
this.isContracting=false;
this.position=0;
this.positionOffset=0;
this.previousButton=null;
this.visibleColumnCount=this.INITIAL_VISIBLE_COLUMN_COUNT;
this.totalGalleries=999999
}A.prototype={MIN_VISIBLE_COLUMN_COUNT:2,MAX_VISIBLE_COLUMN_COUNT:8,LOGICAL_WIDTH:2000,INITIAL_VISIBLE_COLUMN_COUNT:3,FLEX_DURATION:500,COLUMN_COUNT:20,TOTAL_BUTTON_COLUMN_WIDTH:156,OPTIMAL_COLUMN_WIDTH:275,render:function(){var C=this;
renderTemplate("dailybeast/components/gallery2/related/relatedgalleries",baseContext.push(this.galleryView.data),function(E){B("#gallery .gallery-content").html(E);
C.assignDomElements();
C.attachEvents();
C.visibleColumnCount=C.INITIAL_VISIBLE_COLUMN_COUNT;
C.container=B(".related-galleries");
C.slider=C.container.find(".slider");
C.previousButton=B(".gallery-content .previous-button");
C.position=0;
C.positionOffset=0;
C.resize();
C.refreshAd();
C.populateVisibleColumns();
C.header.dimTitle();
var F=B(location).attr("href");
var D=C.galleryView.referringUrl;
dailybeast.analytics.trackPageview({pageNum:C.galleryView.gallery.slideCount,url:F,referer:D})
})
},populateVisibleColumns:function(){this.updateSliderButtons();
var C=this;
var D=this.position;
var F=D*2;
var G=this.position+this.visibleColumnCount;
var E=G*2;
if(F<this.totalGalleries){this.relatedGalleriesArray.get(F,E,function(H,I){C.totalGalleries=I;
C.populateColumns(D,G)
})
}else{this.populateColumns(D,G)
}},populateColumns:function(D,E){for(var C=D;
C<E;
C++){this.populate(C,0);
this.populate(C,1)
}},populate:function(F,G){var D=((F*2)+G)%this.totalGalleries;
var E=this.relatedGalleriesArray.array[D];
if(E!==undefined){var C=this.cells[G][F%this.COLUMN_COUNT];
if(E.imageUrl!==undefined){C.children("img").attr("src",E.imageUrl)
}C.attr("href",E.url);
C.find(".title").html(E.title);
C.css("visibility","visible")
}else{C.css("visibility","hidden")
}},previous:function(){this.moveColumnsLeft(Math.min(this.visibleColumnCount,this.position));
this.position=Math.max(this.position-this.visibleColumnCount,0);
this.populateVisibleColumns();
this.slide(0)
},next:function(){this.position+=this.visibleColumnCount;
this.populateVisibleColumns();
var C=this;
this.slide(this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH,function(){C.moveColumnsRight()
})
},slide:function(C,D){if(C!=0){C*=-1
}this.slider.animate({"margin-left":C+"px"},D)
},updateSliderButtons:function(){if(this.position<=0){this.previousButton.css("visibility","hidden")
}else{this.previousButton.css("visibility","visible")
}},resize:function(){var C=this.getOptimalColumnCount();
if(this.visibleColumnCount<C&&!this.isExpanding&&!this.isContracting){this.isExpanding=true;
this.isContracting=false;
this.expand()
}else{if(this.visibleColumnCount>C&&!this.isContracting&&!this.isExpanding){this.isContracting=true;
this.isExpanding=false;
this.contract()
}}},getOptimalColumnCount:function(){var D=this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH;
var C=Math.round(D/this.OPTIMAL_COLUMN_WIDTH);
C=Math.max(Math.min(C,this.MAX_VISIBLE_COLUMN_COUNT),this.MIN_VISIBLE_COLUMN_COUNT);
return C
},expand:function(){var C=this;
this.visibleColumnCount++;
this.populateVisibleColumns();
this.flex(function(){if(C.visibleColumnCount<C.getOptimalColumnCount()){C.expand()
}else{C.isExpanding=false
}})
},contract:function(){var C=this;
this.visibleColumnCount--;
this.flex(function(){if(C.visibleColumnCount>C.getOptimalColumnCount()){C.contract()
}else{C.isContracting=false
}})
},flex:function(C){var D=(this.LOGICAL_WIDTH/this.visibleColumnCount)+"%";
this.slider.animate({width:D},this.FLEX_DURATION,C)
},getColumnWidth:function(){return(this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH)/this.visibleColumnCount
},refreshAd:function(){dailybeast.advertising.init(".related-galleries");
dailybeast.advertising.refresh(B(".related-galleries .ad-related"))
},attachEvents:function(){var C=this;
B(window).off(".relatedGalleries").on("resize.relatedGalleries",function(){C.resize()
});
B(".related-galleries").on("click","a",function(){dailybeast.analytics.trackMoreGalleriesConversionClick("RECIRCULATION",this.baseURI,this.href)
});
B(".related-gallery img").error(function(D){D.currentTarget.src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg"
});
B(".related-galleries .replay-button").click(function(){C.remove();
C.galleryView.reset();
dailybeast.analytics.trackGalleryClick("REPLAY");
return false
});
B(".related-galleries .previous-button").click(function(){C.previous();
dailybeast.analytics.trackGalleryClick("RECIRCULATIONPREVIOUS");
dailybeast.analytics.trackPageview({pageNum:C.galleryView.gallery.slideCount});
return false
});
B(".related-galleries .next-button").click(function(){C.next();
dailybeast.analytics.trackGalleryClick("RECIRCULATIONNEXT");
dailybeast.analytics.trackPageview({pageNum:C.galleryView.gallery.slideCount});
return false
})
},moveColumnsRight:function(){var E=this.position-this.positionOffset;
var D=B(".related-gallery").slice(0,E);
this.resetCells(D);
var C=B(".related-gallery:eq("+(this.COLUMN_COUNT-1)+")");
D.insertAfter(C);
D=B(".related-gallery").slice(this.COLUMN_COUNT,E+this.COLUMN_COUNT);
this.resetCells(D);
C=B(".related-gallery:eq("+((this.COLUMN_COUNT*2)-1)+")");
D.insertAfter(C);
this.positionOffset=this.position;
this.slider.css("margin-left","0px")
},moveColumnsLeft:function(E){var D=B(".related-gallery").slice(this.COLUMN_COUNT-E,this.COLUMN_COUNT);
this.resetCells(D);
var C=B(".related-gallery:eq(0)");
D.insertBefore(C);
D=B(".related-gallery").slice((this.COLUMN_COUNT*2)-E,this.COLUMN_COUNT*2);
this.resetCells(D);
C=B(".related-gallery:eq("+this.COLUMN_COUNT+")");
D.insertBefore(C);
this.positionOffset-=E;
this.slider.css("margin-left",-this.getColumnWidth()*E)
},resetCells:function(C){C.find("img").attr("src","/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg");
C.find(".title").html("LOADING...")
},remove:function(){B(window).off(".relatedGalleries");
B("#gallery .gallery-content").empty()
},assignDomElements:function(){this.cells=new Array();
for(var E=0;
E<2;
E++){this.cells[E]=new Array();
for(var D=0;
D<this.COLUMN_COUNT;
D++){var C=(E*this.COLUMN_COUNT)+D;
this.cells[E][D]=B(".related-gallery:eq("+C+")")
}}}};
window.RelatedGalleriesView=A
})(jQuery);
(function(B){function A(D,C){this.$parent=D;
this.slides=C;
this.grid=new FlexibleGrid(D,new ArrayDataProvider(C),{itemHeight:200,itemWidth:200,minRows:2,minColumns:4,handleResize:false,mainTemplate:"dailybeast/components/gallery2/viewall/main",pageTemplate:"dailybeast/components/gallery2/viewall/page",itemsTemplate:"dailybeast/components/gallery2/viewall/slides",itemsSelector:".view-all-slides",itemsWrapperSelector:".view-all-wrapper",paginationTemplate:"dailybeast/components/gallery2/viewall/pagination",paginationSelector:".view-all-pagination",afterNext:function(){dailybeast.analytics.trackGalleryClick("VIEWALLPREVIOUS")
},afterPrevious:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESPREVIOUS")
},afterPagination:function(){dailybeast.analytics.trackGalleryClick("VIEWALLPAGINATION")
},afterRender:function(){B(".view-all-slides").lazyImage()
}})
}A.prototype={resize:function(D,C){this.grid.resize(D,C)
},show:function(C){this.grid.show(C)
},hide:function(){this.grid.hide()
}};
window.ViewAllView=A
})(jQuery);
(function(B){function A(D,C,E){this.capacity=10;
this.duration=500;
this.busy=false;
this.introSlide=E;
this.list=D;
this.count=D.length;
this.index=C;
this.range=this.getRangeFromIndex(this.index);
this.offset=this.range.start;
this.bindEvents();
this.updateButtons();
this.thumbnailWidth=B(".slide-inner-wrapper li:last").outerWidth(true)
}A.prototype={bindEvents:function(){var C=this;
B(".slide-thumbnail-wrapper .next").click(function(){C.next();
dailybeast.analytics.trackGalleryClick("SCRUBBERNEXT");
return false
});
B(".slide-thumbnail-wrapper .previous").click(function(){dailybeast.analytics.trackGalleryClick("SCRUBBERPREVIOUS");
C.previous();
return false
})
},updateButtons:function(){var D=B(".slide-thumbnail-wrapper .previous");
if(this.offset>0){D.show()
}else{D.hide()
}var C=B(".slide-thumbnail-wrapper .next");
if(this.offset+this.capacity<this.count){C.show()
}else{C.hide()
}},render:function(D){var C=this;
renderTemplate("dailybeast/components/gallery2/thumbnails/main",this.getTemplateContext(D.start,D.end),function(E){B(".slide-thumbnail-wrapper").replaceWith(E);
C.range=D;
C.offset=D.start;
C.busy=false;
C.bindEvents();
C.updateButtons()
})
},next:function(){if(!this.busy){var C=this.getRangeFromOffset(this.offset+this.capacity);
this.showRange(C)
}},previous:function(){if(!this.busy){var C=this.getRangeFromOffset(this.offset-this.capacity);
this.showRange(C)
}},showRange:function(E){var D=this;
if(E.start!==this.offset){this.busy=true;
if(this.range.start>E.start||this.range.end<E.end){if(this.range.start-this.capacity<=E.start&&this.range.end+this.capacity>=E.end){var F=E.start;
var C=E.end;
if(this.range.start>E.start&&this.range.start<E.end){C=this.range.start
}if(this.range.end<E.end&&this.range.end>E.start){F=this.range.end
}renderTemplate("dailybeast/components/gallery2/thumbnails/thumbnails",this.getTemplateContext(F,C),function(G){var H=B(".slide-inner-wrapper");
if(C<=D.offset){H.css({left:"-="+(C-F)*D.thumbnailWidth});
H.prepend(G)
}else{H.append(G)
}D.range.start=Math.min(E.start,D.range.start);
D.range.end=Math.max(E.end,D.range.end);
D.scrollTo(E.start)
})
}else{this.render(E)
}}else{this.scrollTo(E.start)
}}else{this.highlightThumbnail()
}},getTemplateContext:function(D,C){return baseContext.push({slides:this.list,thumbnailStart:D,thumbnailEnd:C,currentSlide:this.index,introSlide:this.introSlide})
},scrollTo:function(D){var C=this;
B(".slide-inner-wrapper").animate({left:"+="+((this.offset-D)*this.thumbnailWidth)},this.duration,function(){C.offset=D;
C.highlightThumbnail();
C.updateButtons();
C.busy=false
})
},highlightThumbnail:function(){B(".slide-inner-wrapper li").removeClass("active").eq(this.index-this.range.start).addClass("active")
},highlight:function(C){if(!this.busy){this.index=C;
this.showRange(this.getRangeFromIndex(C))
}},getRangeFromOffset:function(D){var E=Math.max(0,D),C=Math.min(E+this.capacity,this.count);
if(E+this.capacity>this.count){E=Math.max(0,this.count-this.capacity)
}return{start:E,end:C}
},getRangeFromIndex:function(D){var C=Math.min(Math.floor(D/this.capacity+1)*this.capacity,this.count);
return{start:Math.max(0,C-this.capacity),end:C}
}};
window.ThumbnailView=A
})(jQuery);
if(typeof domReady==="undefined"){$.log("applying domReady hack");
domReady=function(A){A()
}
}var ShareTools;
(function(A){ShareTools=function(B){this.$container=B;
this.loadScripts()
};
ShareTools.prototype.refresh=function(B){A.log("refreshing gallery share tools");
if(typeof FB!="undefined"){FB.XFBML.parse();
updateShareNumber();
A(window).scroll()
}if(typeof stButtons!="undefined"){stButtons.locateElements();
A("div.st_email_custom").click(function(){dailybeast.analytics.trackSharetoolClick("EMAIL",window.location.pathname)
})
}if(typeof gapi!="undefined"){if(typeof B!="undefined"){gapi.plusone.go(B)
}else{gapi.plusone.go()
}}if(typeof twttr!="undefined"){twttr.widgets.load()
}if(typeof IN!="undefined"&&typeof IN.parse!="undefined"&&A("#gallery").length===1){IN.parse(A("#gallery")[0])
}};
ShareTools.prototype.loadScripts=function(){if(dailybeast.modes.isAuthorEnvironment){A.log("in author mode so forcing load of sharetools scripts");
head.js("https://apis.google.com/js/plusone.js","http://connect.facebook.net/en_US/all.js","http://platform.twitter.com/widgets.js","http://platform.linkedin.com/in.js",function(){FB.init({appId:"189930913679",status:true,cookie:true,xfbml:true})
})
}};
ShareTools.prototype.show=function(){this.$container.show()
};
ShareTools.prototype.hide=function(){this.$container.hide()
}
})(jQuery);
(function(B){function A(){this.titleElement=B("#gallery .title");
this.browserTitleStack=new Array();
this.flexibleTitle=new FlexibleText(B("#gallery .title-inner-container"),B("#gallery .title-inner-container .title"));
this.attachEvents();
this.flexibleTitle.reset()
}A.prototype={attachEvents:function(){var C=this;
B(window).off(".galleryHeader");
B(window).on("resize.galleryHeader",function(){C.flexibleTitle.update()
});
B(window).on("load.galleryHeader",function(){C.flexibleTitle.reset()
})
},enableFlexibleTitle:function(){this.flexibleTitle.enable();
this.flexibleTitle.reset()
},disableFlexibleTitle:function(){this.flexibleTitle.disable()
},dimTitle:function(){this.titleElement.addClass("dimmed")
},undimTitle:function(){this.titleElement.removeClass("dimmed")
},pushBrowserTitle:function(C){this.browserTitleStack.push(this.getBrowserTitle());
this.setBrowserTitle(C+" - The Daily Beast")
},popBrowserTitle:function(){if(this.browserTitleStack.length>0){this.setBrowserTitle(this.browserTitleStack.pop())
}},getBrowserTitle:function(){return B("title").html()
},setBrowserTitle:function(C){B("title").html(C)
}};
window.GalleryHeader=A
})(jQuery);
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
(function(dust){var _console=(typeof console!=="undefined")?console:{log:function(){}};
function isSelect(context){var value=context.current();
return typeof value==="object"&&value.isSelect===true
}function jsonFilter(key,value){if(typeof value==="function"){return value.toString()
}return value
}function filter(chunk,context,bodies,params,filterOp){params=params||{};
var body=bodies.block,actualKey,expectedValue,filterOpType=params.filterOpType||"";
if(typeof params.key!=="undefined"){actualKey=dust.helpers.tap(params.key,chunk,context)
}else{if(isSelect(context)){actualKey=context.current().selectKey;
if(context.current().isResolved){filterOp=function(){return false
}
}}else{_console.log("No key specified for filter in:"+filterOpType+" helper ");
return chunk
}}expectedValue=dust.helpers.tap(params.value,chunk,context);
if(filterOp(coerce(expectedValue,params.type,context),coerce(actualKey,params.type,context))){if(isSelect(context)){context.current().isResolved=true
}if(body){return chunk.render(body,context)
}else{_console.log("Missing body block in the "+filterOpType+" helper ");
return chunk
}}else{if(bodies["else"]){return chunk.render(bodies["else"],context)
}}return chunk
}function coerce(value,type,context){if(value){switch(type||typeof (value)){case"number":return +value;
case"string":return String(value);
case"boolean":value=(value==="false"?false:value);
return Boolean(value);
case"date":return new Date(value);
case"context":return context.get(value)
}}return value
}var helpers={tap:function(input,chunk,context){var output=input;
if(typeof input==="function"){if(input.isFunction===true){output=input()
}else{output="";
chunk.tap(function(data){output+=data;
return""
}).render(input,context).untap();
if(output===""){output=false
}}}return output
},sep:function(chunk,context,bodies){var body=bodies.block;
if(context.stack.index===context.stack.of-1){return chunk
}if(body){return bodies.block(chunk,context)
}else{return chunk
}},idx:function(chunk,context,bodies){var body=bodies.block;
if(body){return bodies.block(chunk,context.push(context.stack.index))
}else{return chunk
}},contextDump:function(chunk,context,bodies,params){var p=params||{},to=p.to||"output",key=p.key||"current",dump;
to=dust.helpers.tap(to,chunk,context),key=dust.helpers.tap(key,chunk,context);
if(key==="full"){dump=JSON.stringify(context.stack,jsonFilter,2)
}else{dump=JSON.stringify(context.stack.head,jsonFilter,2)
}if(to==="console"){_console.log(dump);
return chunk
}else{return chunk.write(dump)
}},"if":function(chunk,context,bodies,params){var body=bodies.block,skip=bodies["else"];
if(params&&params.cond){var cond=params.cond;
cond=dust.helpers.tap(cond,chunk,context);
if(eval(cond)){if(body){return chunk.render(bodies.block,context)
}else{_console.log("Missing body block in the if helper!");
return chunk
}}if(skip){return chunk.render(bodies["else"],context)
}}else{_console.log("No condition given in the if helper!")
}return chunk
},math:function(chunk,context,bodies,params){if(params&&typeof params.key!=="undefined"&&params.method){var key=params.key,method=params.method,operand=params.operand,round=params.round,mathOut=null,operError=function(){_console.log("operand is required for this math method");
return null
};
key=dust.helpers.tap(key,chunk,context);
operand=dust.helpers.tap(operand,chunk,context);
switch(method){case"mod":if(operand===0||operand===-0){_console.log("operand for divide operation is 0/-0: expect Nan!")
}mathOut=parseFloat(key)%parseFloat(operand);
break;
case"add":mathOut=parseFloat(key)+parseFloat(operand);
break;
case"subtract":mathOut=parseFloat(key)-parseFloat(operand);
break;
case"multiply":mathOut=parseFloat(key)*parseFloat(operand);
break;
case"divide":if(operand===0||operand===-0){_console.log("operand for divide operation is 0/-0: expect Nan/Infinity!")
}mathOut=parseFloat(key)/parseFloat(operand);
break;
case"ceil":mathOut=Math.ceil(parseFloat(key));
break;
case"floor":mathOut=Math.floor(parseFloat(key));
break;
case"round":mathOut=Math.round(parseFloat(key));
break;
case"abs":mathOut=Math.abs(parseFloat(key));
break;
default:_console.log("method passed is not supported")
}if(mathOut!==null){if(round){mathOut=Math.round(mathOut)
}if(bodies&&bodies.block){return chunk.render(bodies.block,context.push({isSelect:true,isResolved:false,selectKey:mathOut}))
}else{return chunk.write(mathOut)
}}else{return chunk
}}else{_console.log("Key is a required parameter for math helper along with method/operand!")
}return chunk
},select:function(chunk,context,bodies,params){var body=bodies.block;
if(params&&typeof params.key!=="undefined"){var key=dust.helpers.tap(params.key,chunk,context);
if(body){return chunk.render(bodies.block,context.push({isSelect:true,isResolved:false,selectKey:key}))
}else{_console.log("Missing body block in the select helper ");
return chunk
}}else{_console.log("No key given in the select helper!")
}return chunk
},eq:function(chunk,context,bodies,params){if(params){params.filterOpType="eq"
}return filter(chunk,context,bodies,params,function(expected,actual){return actual===expected
})
},ne:function(chunk,context,bodies,params){if(params){params.filterOpType="ne";
return filter(chunk,context,bodies,params,function(expected,actual){return actual!==expected
})
}return chunk
},lt:function(chunk,context,bodies,params){if(params){params.filterOpType="lt";
return filter(chunk,context,bodies,params,function(expected,actual){return actual<expected
})
}},lte:function(chunk,context,bodies,params){if(params){params.filterOpType="lte";
return filter(chunk,context,bodies,params,function(expected,actual){return actual<=expected
})
}return chunk
},gt:function(chunk,context,bodies,params){if(params){params.filterOpType="gt";
return filter(chunk,context,bodies,params,function(expected,actual){return actual>expected
})
}return chunk
},gte:function(chunk,context,bodies,params){if(params){params.filterOpType="gte";
return filter(chunk,context,bodies,params,function(expected,actual){return actual>=expected
})
}return chunk
},"default":function(chunk,context,bodies,params){if(params){params.filterOpType="default"
}return filter(chunk,context,bodies,params,function(expected,actual){return true
})
},size:function(chunk,context,bodies,params){var key,value=0,nr,k;
params=params||{};
key=params.key;
if(!key||key===true){value=0
}else{if(dust.isArray(key)){value=key.length
}else{if(!isNaN(parseFloat(key))&&isFinite(key)){value=key
}else{if(typeof key==="object"){nr=0;
for(k in key){if(Object.hasOwnProperty.call(key,k)){nr++
}}value=nr
}else{value=(key+"").length
}}}}return chunk.write(value)
}};
dust.helpers=helpers
})(typeof exports!=="undefined"?module.exports=require("dustjs-linkedin"):dust);
var dailybeast=dailybeast||{};
dailybeast.templating={getDustPartial:function(C,D){var B=this.getDustTemplate(C,D),A=dust.cache[B];
return A?A:null
},getDustTemplate:function(B,C){if(B==undefined||B==null){return null
}var A=B+(C!==undefined?"/"+C:B.substring(B.lastIndexOf("/")));
if(dust.cache[A]){return A
}else{if(dailybeast.componentHierarchy[B]){return this.getDustTemplate(dailybeast.componentHierarchy[B],C)
}}return null
}};
dust.helpers=dust.helpers||{};
dust.helpers.include=function(C,D,B,G){var E=G.resourceType,F=G.path,A=null;
if(E!==undefined){A=dailybeast.templating.getDustPartial(E)
}else{if(F!==undefined){A=dailybeast.templating.getDustPartial(D.get("resourceType"),F)
}}return A?A(C,D):C
};
dust.helpers.versionable=function(H,C,A,E){if(E.url){var G=C.get("buildInfo")["revision"],F=E.url.lastIndexOf("."),I=E.url.substr(F+1),B=E.url.substr(0,F),D;
if(I==="js"||I==="css"){D=B+"."+G+".cached."+I
}else{D=E.url+".dres."+I+"/"+G+".cached."+I
}return H.write(D)
}return H
};
dust.helpers.formatDate=function(B,C,A,D){var E="America/New_York";
if(D.date&&D.format){E=D.tz?D.tz:E;
return B.write(moment(D.date).tz(E).format(D.format))
}return B
};
var baseContext=dust.makeBase({first:function(B,C,A,D){if(D&&D.of&&D.of.length>0){return B.render(A.block,C.push(D.of[0],0,D.of.length))
}return B
},rest:function(B,C,A,D){return D.of&&D.of.length>1?D.of.slice(1):undefined
},length:function(A,B){return B.stack.of
},slice:function(C,E,B,F){if(F.of!==undefined&&F.start!==undefined&&F.end!==undefined){var G=Math.max(0,F.start),A=Math.min(F.of.length,F.end);
for(var D=G;
D<A;
D++){C.render(B.block,E.push(F.of[D],D,F.of.length))
}}},nth:function(B,C,A,E){if(E){var D=E.of,F=E.n;
if(D&&D.length>F){return B.render(A.block,C.push(D[F],F,D.length))
}}return B
},repeat:function(B,C,A,D){for(i=0;
i<D.count;
i++){B.render(A.block,C)
}},atIndex:function(B,C,A,D){if(D.index==C.stack.index){return B.render(A.block,C)
}return B
},inList:function(B,C,A){if(C.stack.index!==undefined){return B.render(A.block,C)
}else{if(A["else"]){return B.render(A["else"],C)
}}return B
},position:function(A,B){return B.stack.index+1
},isIntro:function(B,C,A){var D=C.get("introSlide")&&C.stack.index==0;
if(D){return B.render(A.block,C)
}else{if(A["else"]){return B.render(A["else"],C)
}}return B
},slideNumber:function(A,B){var D=B.get("introSlide"),C=D&&B.stack.index==0;
return C?"":B.stack.index+(D?0:1)
},listicleNumber:function(C,D){var A=D.get("listicleType"),F=D.get("introSlide"),E=F&&D.stack.index==0,B="";
if(!E){if(A=="DESCENDING"){B=D.stack.of-D.stack.index
}else{if(A=="ASCENDING"){B=D.stack.index+(F?0:1)
}}}return B
},totalSlides:function(A,B){return B.get("slideCount")-(B.get("introSlide")?1:0)
}});
if(!Array.prototype.forEach){Array.prototype.forEach=function(D,C){for(var B=0,A=this.length;
B<A;
++B){D.call(C,this[B],B,this)
}}
}(function(Q){var y,Y="1.7.2",AC=Math.round,AD,p={},c="en",o=(typeof module!=="undefined"&&module.exports),O="months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),V=/^\/?Date\((\-?\d+)/i,K=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g,P=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g,AE=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,G=/\d\d?/,q=/\d{1,3}/,r=/\d{3}/,h=/\d{1,4}/,j=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,B=/Z|[\+\-]\d\d:?\d\d/i,R=/T/i,k=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,D="YYYY-MM-DDTHH:mm:ssZ",I=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],a=/([\+\-]|\d\d)/gi,M="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),z={Milliseconds:1,Seconds:1000,Minutes:60000,Hours:3600000,Days:86400000,Months:2592000000,Years:31536000000},L={},e="DDD w M D d".split(" "),T="M D H h m s w".split(" "),H={M:function(){return this.month()+1
},MMM:function(AG){return U("monthsShort",this.month(),this,AG)
},MMMM:function(AG){return U("months",this.month(),this,AG)
},D:function(){return this.date()
},DDD:function(){var AH=new Date(this.year(),this.month(),this.date()),AG=new Date(this.year(),0,1);
return ~~(((AH-AG)/86400000)+1.5)
},d:function(){return this.day()
},dd:function(AG){return U("weekdaysMin",this.day(),this,AG)
},ddd:function(AG){return U("weekdaysShort",this.day(),this,AG)
},dddd:function(AG){return U("weekdays",this.day(),this,AG)
},w:function(){var AH=new Date(this.year(),this.month(),this.date()-this.day()+5),AG=new Date(AH.getFullYear(),0,4);
return ~~((AH-AG)/86400000/7+1.5)
},YY:function(){return AB(this.year()%100,2)
},YYYY:function(){return AB(this.year(),4)
},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),true)
},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),false)
},H:function(){return this.hours()
},h:function(){return this.hours()%12||12
},m:function(){return this.minutes()
},s:function(){return this.seconds()
},S:function(){return ~~(this.milliseconds()/100)
},SS:function(){return AB(~~(this.milliseconds()/10),2)
},SSS:function(){return AB(this.milliseconds(),3)
},Z:function(){var AH=-this.zone(),AG="+";
if(AH<0){AH=-AH;
AG="-"
}return AG+AB(~~(AH/60),2)+":"+AB(~~AH%60,2)
},ZZ:function(){var AH=-this.zone(),AG="+";
if(AH<0){AH=-AH;
AG="-"
}return AG+AB(~~(10*AH/6),4)
}};
function U(AI,AH,AG,AJ){var AK=AG.lang();
return AK[AI].call?AK[AI](AG,AJ):AK[AI][AH]
}function m(AH,AG){return function(AI){return AB(AH.call(this,AI),AG)
}
}function f(AG){return function(AI){var AH=AG.call(this,AI);
return AH+this.lang().ordinal(AH)
}
}while(e.length){AD=e.pop();
H[AD+"o"]=f(H[AD])
}while(T.length){AD=T.pop();
H[AD+AD]=m(H[AD],2)
}H.DDDD=m(H.DDD,3);
function S(AH,AG,AI){this._d=AH;
this._isUTC=!!AG;
this._a=AH._a||null;
this._lang=AI||false
}function AF(AJ){var AL=this._data={},AM=AJ.years||AJ.y||0,AH=AJ.months||AJ.M||0,AG=AJ.weeks||AJ.w||0,AP=AJ.days||AJ.d||0,AN=AJ.hours||AJ.h||0,AK=AJ.minutes||AJ.m||0,AO=AJ.seconds||AJ.s||0,AI=AJ.milliseconds||AJ.ms||0;
this._milliseconds=AI+AO*1000+AK*60000+AN*3600000;
this._days=AP+AG*7;
this._months=AH+AM*12;
AL.milliseconds=AI%1000;
AO+=x(AI/1000);
AL.seconds=AO%60;
AK+=x(AO/60);
AL.minutes=AK%60;
AN+=x(AK/60);
AL.hours=AN%24;
AP+=x(AN/24);
AP+=AG*7;
AL.days=AP%30;
AH+=x(AP/30);
AL.months=AH%12;
AM+=x(AH/12);
AL.years=AM;
this._lang=false
}function x(AG){if(AG<0){return Math.ceil(AG)
}else{return Math.floor(AG)
}}function AB(AI,AH){var AG=AI+"";
while(AG.length<AH){AG="0"+AG
}return AG
}function u(AI,AK,AJ){var AH=AK._milliseconds,AL=AK._days,AM=AK._months,AG;
if(AH){AI._d.setTime(+AI+AH*AJ)
}if(AL){AI.date(AI.date()+AL*AJ)
}if(AM){AG=AI.date();
AI.date(1).month(AI.month()+AM*AJ).date(Math.min(AG,AI.daysInMonth()))
}}function b(AG){return Object.prototype.toString.call(AG)==="[object Array]"
}function t(AK,AJ){var AG=Math.min(AK.length,AJ.length),AH=Math.abs(AK.length-AJ.length),AL=0,AI;
for(AI=0;
AI<AG;
AI++){if(~~AK[AI]!==~~AJ[AI]){AL++
}}return AL+AH
}function J(AH,AM,AL,AK){var AJ,AI,AG=[];
for(AJ=0;
AJ<7;
AJ++){AG[AJ]=AH[AJ]=(AH[AJ]==null)?(AJ===2?1:0):AH[AJ]
}AH[7]=AG[7]=AM;
if(AH[8]!=null){AG[8]=AH[8]
}AH[3]+=AL||0;
AH[4]+=AK||0;
AI=new Date(0);
if(AM){AI.setUTCFullYear(AH[0],AH[1],AH[2]);
AI.setUTCHours(AH[3],AH[4],AH[5],AH[6])
}else{AI.setFullYear(AH[0],AH[1],AH[2]);
AI.setHours(AH[3],AH[4],AH[5],AH[6])
}AI._a=AG;
return AI
}function X(AJ,AH){var AI,AG,AK=[];
if(!AH&&o){AH=require("./lang/"+AJ)
}for(AI=0;
AI<O.length;
AI++){AH[O[AI]]=AH[O[AI]]||p.en[O[AI]]
}for(AI=0;
AI<12;
AI++){AG=y([2000,AI]);
AK[AI]=new RegExp("^"+(AH.months[AI]||AH.months(AG,""))+"|^"+(AH.monthsShort[AI]||AH.monthsShort(AG,"")).replace(".",""),"i")
}AH.monthsParse=AH.monthsParse||AK;
p[AJ]=AH;
return AH
}function W(AG){var AH=(typeof AG==="string")&&AG||AG&&AG._lang||null;
return AH?(p[AH]||X(AH)):y
}function g(AG){if(AG.match(/\[.*\]/)){return AG.replace(/^\[|\]$/g,"")
}return AG.replace(/\\/g,"")
}function w(AI){var AJ=AI.match(K),AG,AH;
for(AG=0,AH=AJ.length;
AG<AH;
AG++){if(H[AJ[AG]]){AJ[AG]=H[AJ[AG]]
}else{AJ[AG]=g(AJ[AG])
}}return function(AL){var AK="";
for(AG=0;
AG<AH;
AG++){AK+=typeof AJ[AG].call==="function"?AJ[AG].call(AL,AI):AJ[AG]
}return AK
}
}function n(AG,AJ){var AH=5;
function AI(AK){return AG.lang().longDateFormat[AK]||AK
}while(AH--&&P.test(AJ)){AJ=AJ.replace(P,AI)
}if(!L[AJ]){L[AJ]=w(AJ)
}return L[AJ](AG)
}function F(AG){switch(AG){case"DDDD":return r;
case"YYYY":return h;
case"S":case"SS":case"SSS":case"DDD":return q;
case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return j;
case"Z":case"ZZ":return B;
case"T":return R;
case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return G;
default:return new RegExp(AG.replace("\\",""))
}}function E(AL,AJ,AI,AK){var AH,AG;
switch(AL){case"M":case"MM":AI[1]=(AJ==null)?0:~~AJ-1;
break;
case"MMM":case"MMMM":for(AH=0;
AH<12;
AH++){if(W().monthsParse[AH].test(AJ)){AI[1]=AH;
AG=true;
break
}}if(!AG){AI[8]=false
}break;
case"D":case"DD":case"DDD":case"DDDD":if(AJ!=null){AI[2]=~~AJ
}break;
case"YY":AI[0]=~~AJ+(~~AJ>70?1900:2000);
break;
case"YYYY":AI[0]=~~Math.abs(AJ);
break;
case"a":case"A":AK.isPm=((AJ+"").toLowerCase()==="pm");
break;
case"H":case"HH":case"h":case"hh":AI[3]=~~AJ;
break;
case"m":case"mm":AI[4]=~~AJ;
break;
case"s":case"ss":AI[5]=~~AJ;
break;
case"S":case"SS":case"SSS":AI[6]=~~(("0."+AJ)*1000);
break;
case"Z":case"ZZ":AK.isUTC=true;
AH=(AJ+"").match(a);
if(AH&&AH[1]){AK.tzh=~~AH[1]
}if(AH&&AH[2]){AK.tzm=~~AH[2]
}if(AH&&AH[0]==="+"){AK.tzh=-AK.tzh;
AK.tzm=-AK.tzm
}break
}if(AJ==null){AI[8]=false
}}function l(AI,AM){var AG=[0,0,1,0,0,0,0],AH={tzh:0,tzm:0},AL=AM.match(K),AJ,AK;
for(AJ=0;
AJ<AL.length;
AJ++){AK=(F(AL[AJ]).exec(AI)||[])[0];
if(AK){AI=AI.slice(AI.indexOf(AK)+AK.length)
}if(H[AL[AJ]]){E(AL[AJ],AK,AG,AH)
}}if(AH.isPm&&AG[3]<12){AG[3]+=12
}if(AH.isPm===false&&AG[3]===12){AG[3]=0
}return J(AG,AH.isUTC,AH.tzh,AH.tzm)
}function Z(AK,AM){var AH,AN=AK.match(AE)||[],AL,AO=99,AJ,AG,AI;
for(AJ=0;
AJ<AM.length;
AJ++){AG=l(AK,AM[AJ]);
AL=n(new S(AG),AM[AJ]).match(AE)||[];
AI=t(AN,AL);
if(AI<AO){AO=AI;
AH=AG
}}return AH
}function AA(AG){var AI="YYYY-MM-DDT",AH;
if(k.exec(AG)){for(AH=0;
AH<4;
AH++){if(I[AH][1].exec(AG)){AI+=I[AH][0];
break
}}return B.exec(AG)?l(AG,AI+" Z"):l(AG,AI)
}return new Date(AG)
}function v(AH,AJ,AI,AK,AL){var AG=AL.relativeTime[AH];
return(typeof AG==="function")?AG(AJ||1,!!AI,AH,AK):AG.replace(/%d/i,AJ||1)
}function d(AI,AG,AH){var AN=AC(Math.abs(AI)/1000),AJ=AC(AN/60),AM=AC(AJ/60),AO=AC(AM/24),AK=AC(AO/365),AL=AN<45&&["s",AN]||AJ===1&&["m"]||AJ<45&&["mm",AJ]||AM===1&&["h"]||AM<22&&["hh",AM]||AO===1&&["d"]||AO<=25&&["dd",AO]||AO<=45&&["M"]||AO<345&&["MM",AC(AO/30)]||AK===1&&["y"]||["yy",AK];
AL[2]=AG;
AL[3]=AI>0;
AL[4]=AH;
return v.apply({},AL)
}y=function(AH,AJ){if(AH===null||AH===""){return null
}var AI,AG;
if(y.isMoment(AH)){return new S(new Date(+AH._d),AH._isUTC,AH._lang)
}else{if(AJ){if(b(AJ)){AI=Z(AH,AJ)
}else{AI=l(AH,AJ)
}}else{AG=V.exec(AH);
AI=AH===Q?new Date():AG?new Date(+AG[1]):AH instanceof Date?AH:b(AH)?J(AH):typeof AH==="string"?AA(AH):new Date(AH)
}}return new S(AI)
};
y.utc=function(AG,AH){if(b(AG)){return new S(J(AG,true),true)
}if(typeof AG==="string"&&!B.exec(AG)){AG+=" +0000";
if(AH){AH+=" Z"
}}return y(AG,AH).utc()
};
y.unix=function(AG){return y(AG*1000)
};
y.duration=function(AG,AK){var AJ=y.isDuration(AG),AI=(typeof AG==="number"),AL=(AJ?AG._data:(AI?{}:AG)),AH;
if(AI){if(AK){AL[AK]=AG
}else{AL.milliseconds=AG
}}AH=new AF(AL);
if(AJ){AH._lang=AG._lang
}return AH
};
y.humanizeDuration=function(AG,AH,AI){return y.duration(AG,AH===true?null:AH).humanize(AH===true?true:AI)
};
y.version=Y;
y.defaultFormat=D;
y.lang=function(AI,AG){var AH;
if(!AI){return c
}if(AG||!p[AI]){X(AI,AG)
}if(p[AI]){for(AH=0;
AH<O.length;
AH++){y[O[AH]]=p[AI][O[AH]]
}y.monthsParse=p[AI].monthsParse;
c=AI
}};
y.langData=W;
y.isMoment=function(AG){return AG instanceof S
};
y.isDuration=function(AG){return AG instanceof AF
};
y.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:function(AG,AH,AI){if(AG>11){return AI?"pm":"PM"
}else{return AI?"am":"AM"
}},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(AH){var AG=AH%10;
return(~~(AH%100/10)===1)?"th":(AG===1)?"st":(AG===2)?"nd":(AG===3)?"rd":"th"
}});
y.fn=S.prototype={clone:function(){return y(this)
},valueOf:function(){return +this._d
},unix:function(){return Math.floor(+this._d/1000)
},toString:function(){return this._d.toString()
},toDate:function(){return this._d
},toArray:function(){var AG=this;
return[AG.year(),AG.month(),AG.date(),AG.hours(),AG.minutes(),AG.seconds(),AG.milliseconds(),!!this._isUTC]
},isValid:function(){if(this._a){if(this._a[8]!=null){return !!this._a[8]
}return !t(this._a,(this._a[7]?y.utc(this._a):y(this._a)).toArray())
}return !isNaN(this._d.getTime())
},utc:function(){this._isUTC=true;
return this
},local:function(){this._isUTC=false;
return this
},format:function(AG){return n(this,AG?AG:y.defaultFormat)
},add:function(AG,AI){var AH=AI?y.duration(+AI,AG):y.duration(AG);
u(this,AH,1);
return this
},subtract:function(AG,AI){var AH=AI?y.duration(+AI,AG):y.duration(AG);
u(this,AH,-1);
return this
},diff:function(AN,AI,AP){var AG=this._isUTC?y(AN).utc():y(AN).local(),AK=(this.zone()-AG.zone())*60000,AO=this._d-AG._d-AK,AM=this.year()-AG.year(),AL=this.month()-AG.month(),AJ=this.date()-AG.date(),AH;
if(AI==="months"){AH=AM*12+AL+AJ/30
}else{if(AI==="years"){AH=AM+(AL+AJ/30)/12
}else{AH=AI==="seconds"?AO/1000:AI==="minutes"?AO/60000:AI==="hours"?AO/3600000:AI==="days"?AO/86400000:AI==="weeks"?AO/604800000:AO
}}return AP?AH:AC(AH)
},from:function(AH,AG){return y.duration(this.diff(AH)).lang(this._lang).humanize(!AG)
},fromNow:function(AG){return this.from(y(),AG)
},calendar:function(){var AJ=this.diff(y().sod(),"days",true),AI=this.lang().calendar,AH=AI.sameElse,AG=AJ<-6?AH:AJ<-1?AI.lastWeek:AJ<0?AI.lastDay:AJ<1?AI.sameDay:AJ<2?AI.nextDay:AJ<7?AI.nextWeek:AH;
return this.format(typeof AG==="function"?AG.apply(this):AG)
},isLeapYear:function(){var AG=this.year();
return(AG%4===0&&AG%100!==0)||AG%400===0
},isDST:function(){return(this.zone()<y([this.year()]).zone()||this.zone()<y([this.year(),5]).zone())
},day:function(AH){var AG=this._isUTC?this._d.getUTCDay():this._d.getDay();
return AH==null?AG:this.add({d:AH-AG})
},startOf:function(AG){switch(AG.replace(/s$/,"")){case"year":this.month(0);
case"month":this.date(1);
case"day":this.hours(0);
case"hour":this.minutes(0);
case"minute":this.seconds(0);
case"second":this.milliseconds(0)
}return this
},endOf:function(AG){return this.startOf(AG).add(AG.replace(/s?$/,"s"),1).subtract("ms",1)
},sod:function(){return this.clone().startOf("day")
},eod:function(){return this.clone().endOf("day")
},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()
},daysInMonth:function(){return y.utc([this.year(),this.month()+1,0]).date()
},lang:function(AG){if(AG===Q){return W(this)
}else{this._lang=AG;
return this
}}};
function N(AG,AH){y.fn[AG]=function(AI){var AJ=this._isUTC?"UTC":"";
if(AI!=null){this._d["set"+AJ+AH](AI);
return this
}else{return this._d["get"+AJ+AH]()
}}
}for(AD=0;
AD<M.length;
AD++){N(M[AD].toLowerCase(),M[AD])
}N("year","FullYear");
y.duration.fn=AF.prototype={weeks:function(){return x(this.days()/7)
},valueOf:function(){return this._milliseconds+this._days*86400000+this._months*2592000000
},humanize:function(AJ){var AK=+this,AG=this.lang().relativeTime,AH=d(AK,!AJ,this.lang()),AI=AK<=0?AG.past:AG.future;
if(AJ){if(typeof AI==="function"){AH=AI(AH)
}else{AH=AI.replace(/%s/i,AH)
}}return AH
},lang:y.fn.lang};
function A(AG){y.duration.fn[AG]=function(){return this._data[AG]
}
}function C(AG,AH){y.duration.fn["as"+AG]=function(){return +this/AH
}
}for(AD in z){if(z.hasOwnProperty(AD)){C(AD,z[AD]);
A(AD.toLowerCase())
}}C("Weeks",604800000);
if(o){module.exports=y
}if(typeof ender==="undefined"){this["moment"]=y
}if(typeof define==="function"&&define.amd){define("moment",[],function(){return y
})
}}).call(this);
(function(){var W,P=(typeof module!=="undefined"&&module.exports),C="africa antarctica asia australasia etcetera northamerica pacificnew southamerica".split(" "),Q,K={},T={},S={},G={};
W=P?require("moment"):this.moment;
if(W===undefined){throw"Can't find moment"
}Q=W.fn.format;
function O(X,e,Z,b,c,a,Y,d){this._name=X;
this._from=+e;
this._to=+Z;
this._month=+b;
this._dayVal=+c;
if(c.indexOf(":")>-1){c=c.split(":");
this._dowVal=+c[0];
this._dayVal=+c[1];
this.date=O.prototype._dateFirst
}else{if(this._dayVal<1){this._dayVal=-this._dayVal;
this.date=O.prototype._dateLast
}}this._time=+a;
this._offset=+Y;
this._letters=d
}O.prototype={contains:function(Y){var X=Y.year(),Z=this.start(X);
if(Y>=Z&&X<=this._to){return true
}return false
},containsYear:function(X){if(X>=this._from&&X<=this._to){return true
}return false
},letters:function(){return this._letters
},offset:function(){return this._offset
},start:function(X){X=Math.min(Math.max(X,this._from),this._to);
return W.utc([X,this._month,this.date(X),0,this._time])
},date:function(X){return this._dayVal
},_dateFirst:function(a){var Z=this._dayVal,b=this._dowVal,Y=W([a,this._month,1]).day(),X=this._dowVal+1-Y;
while(X<Z){X+=7
}return X
},_dateLast:function(b){var Z=this._dayVal,c=Z%7,a=W([b,this._month+1,1]).day(),Y=W([b,this._month,1]).daysInMonth(),X=Y+(c-(a-1))-(~~(Z/7)*7);
if(c>=a){X-=7
}return X
}};
function D(X,Y){this._year=X;
this._rule=Y
}D.prototype={start:function(){return this._rule.start(this._year)
},offset:function(){return this._rule._offset
},rule:function(){return this._rule
}};
function L(Z,Y){var X=Z.start(),c=Y.start();
if(X>c){return -1
}else{if(X<c){return 1
}else{return 0
}}}function R(X){this._name=X;
this._rules=[]
}R.prototype={add:function(X){this._rules.push(X)
},_ruleYears:function(Y,a){var X,Z;
for(X=0;
X<this._rules.length;
X++){Z=this._rules[X];
if(Z.containsYear(Y)){a.push(new D(Y,Z))
}}},rules:function(Z){var X,Y=W.utc([Z.year(),0,1,-1]),a=[];
this._ruleYears(Z.year(),a);
this._ruleYears(Z.year()-1,a);
a.sort(L);
return a
},rule:function(a,d){var c=this.rules(a),b,Z,X,Y;
for(Y=0;
Y<c.length-1;
Y++){Z=c[Y+1];
b=c[Y];
X=W.utc(a).add("m",d+Z.offset());
if(X>=b.start()){return b.rule()
}}throw"Rule not found"
}};
function B(Y,Z,b,X,a){this._name=Y;
this._offset=+Z;
this._ruleSet=U(b);
this._format=X;
this._until=+a||9999
}B.prototype={contains:function(X){if(X.year()<=this._until){return true
}return false
},rule:function(X){return this._ruleSet.rule(X,this._offset)
},format:function(X){return this._format.replace("%s",this.rule(X).letters())
},offset:function(X){return this._offset+this.rule(X).offset()
}};
function M(Y,X){var Z=W(Y._until)-W(X._until);
if(Z>0){return 1
}if(Z<0){return -1
}return 0
}function A(X){this._name=X;
this._zones=[]
}A.prototype={zone:function(Z){var Y,X;
for(Y=0;
Y<this._zones.length;
Y++){if(this._zones[Y].contains(Z)){return this._zones[Y]
}}},add:function(X){this._zones.push(X);
this._zones.sort(M)
},name:function(){return this._name
},format:function(X){return this.zone(X).format(X)
},offset:function(X){return -this.zone(X).offset(X)
}};
function J(Y){var X;
for(X in Y){Y[X].forEach(function(Z){F(X+","+Z)
})
}}function F(Y){if(K[Y]){return K[Y]
}var a=Y.split(","),X=H(a[0]),Z=new O(X,a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]);
K[Y]=Z;
U(X).add(Z);
return Z
}function H(X){return(X||"").toLowerCase().replace(/\//g,"_")
}function N(X){var Y;
for(Y in X){X[Y].forEach(function(Z){V(Y+","+Z)
})
}}function V(Z){if(S[Z]){return S[Z]
}var a=Z.split(","),Y=H(a[0]),X=new B(Y,a[1],a[2],a[3],a[4]);
S[Z]=X;
E(Y).add(X);
return X
}function U(X){X=H(X);
if(!T[X]){T[X]=new R(X)
}return T[X]
}function E(X){X=H(X);
if(!G[X]){G[X]=new A(X)
}return G[X]
}W.fn.format=function(){var Y=this,X=this;
if(this._z&&this._z.offset){Y=this.clone().utc();
Y.add("m",-this._z.offset(this));
if(arguments[0]){arguments[0]=arguments[0].replace(/ZZ/g,function(){var a=-X._z.offset(X),Z="+";
if(a<0){a=-a;
Z="-"
}return"["+Z+I(~~(10*a/6),4)+"]"
});
arguments[0]=arguments[0].replace(/Z/g,function(){var a=-X._z.offset(X),Z="+";
if(a<0){a=-a;
Z="-"
}return"["+Z+I(~~(a/60),2)+":"+I(~~a%60,2)+"]"
});
arguments[0]=arguments[0].replace(/z/g,function(){return"["+X._z.format(X)+"]"
})
}}return Q.apply(Y,arguments)
};
function I(Z,Y){var X=Z+"";
while(X.length<Y){X="0"+X
}return X
}W.fn.tz=function(X){this._z=E(X);
return this
};
W.tz={addRules:J,addRule:F,getRuleSet:U,addZones:N,addZone:V,getZoneSet:E};
F("-,0,9999,0,0,0,0,S");
if(P){C.forEach(function(Y){var X=require("./zones/"+Y);
N(X.zones);
J(X.rules)
})
}if(P){module.exports=W.tz
}if(typeof define==="function"&&define.amd){define("moment",[],function(){return W.tz
})
}}).apply(this);
(function(){var A={rules:{Algeria:["1916,1916,5,14,1380,60,S","1916,1919,9,0:1,1380,0,-","1917,1917,2,24,1380,60,S","1918,1918,2,9,1380,60,S","1919,1919,2,1,1380,60,S","1920,1920,1,14,1380,60,S","1920,1920,9,23,1380,0,-","1921,1921,2,14,1380,60,S","1921,1921,5,21,1380,0,-","1939,1939,8,11,1380,60,S","1939,1939,10,19,60,0,-","1944,1945,3,1:1,120,60,S","1944,1944,9,8,120,0,-","1945,1945,8,16,60,0,-","1971,1971,3,25,1380,60,S","1971,1971,8,26,1380,0,-","1977,1977,4,6,0,60,S","1977,1977,9,21,0,0,-","1978,1978,2,24,60,60,S","1978,1978,8,22,180,0,-","1980,1980,3,25,0,60,S","1980,1980,9,31,120,0,-"],Egypt:["1940,1940,6,15,0,60,S","1940,1940,9,1,0,0,-","1941,1941,3,15,0,60,S","1941,1941,8,16,0,0,-","1942,1944,3,1,0,60,S","1942,1942,9,27,0,0,-","1943,1945,10,1,0,0,-","1945,1945,3,16,0,60,S","1957,1957,4,10,0,60,S","1957,1958,9,1,0,0,-","1958,1958,4,1,0,60,S","1959,1981,4,1,60,60,S","1959,1965,8,30,180,0,-","1966,1994,9,1,180,0,-","1982,1982,6,25,60,60,S","1983,1983,6,12,60,60,S","1984,1988,4,1,60,60,S","1989,1989,4,6,60,60,S","1990,1994,4,1,60,60,S","1995,2010,3,-5,0,60,S","1995,2005,8,-4,1380,0,-","2006,2006,8,21,1380,0,-","2007,2007,8,4:1,1380,0,-","2008,2008,7,-4,1380,0,-","2009,2009,7,20,1380,0,-","2010,2010,7,11,0,0,-","2010,2010,8,10,0,60,S","2010,2010,8,-4,1380,0,-"],Ghana:["1936,1942,8,1,0,20,GHST","1936,1942,11,31,0,0,GMT"],Libya:["1951,1951,9,14,120,60,S","1952,1952,0,1,0,0,-","1953,1953,9,9,120,60,S","1954,1954,0,1,0,0,-","1955,1955,8,30,0,60,S","1956,1956,0,1,0,0,-","1982,1984,3,1,0,60,S","1982,1985,9,1,0,0,-","1985,1985,3,6,0,60,S","1986,1986,3,4,0,60,S","1986,1986,9,3,0,0,-","1987,1989,3,1,0,60,S","1987,1989,9,1,0,0,-"],Mauritius:["1982,1982,9,10,0,60,S","1983,1983,2,21,0,0,-","2008,2008,9,0,120,60,S","2009,2009,2,0,120,0,-"],Morocco:["1939,1939,8,12,0,60,S","1939,1939,10,19,0,0,-","1940,1940,1,25,0,60,S","1945,1945,10,18,0,0,-","1950,1950,5,11,0,60,S","1950,1950,9,29,0,0,-","1967,1967,5,3,720,60,S","1967,1967,9,1,0,0,-","1974,1974,5,24,0,60,S","1974,1974,8,1,0,0,-","1976,1977,4,1,0,60,S","1976,1976,7,1,0,0,-","1977,1977,8,28,0,0,-","1978,1978,5,1,0,60,S","1978,1978,7,4,0,0,-","2008,2008,5,1,0,60,S","2008,2008,8,1,0,0,-","2009,2009,5,1,0,60,S","2009,2009,7,21,0,0,-","2010,2010,4,2,0,60,S","2010,2010,7,8,0,0,-","2011,2011,3,3,0,60,S","2011,2011,6,31,0,0,-"],Namibia:["1994,9999,8,0:1,120,60,S","1995,9999,3,0:1,120,0,-"],SL:["1935,1942,5,1,0,40,SLST","1935,1942,9,1,0,0,WAT","1957,1962,5,1,0,60,SLST","1957,1962,8,1,0,0,GMT"],SA:["1942,1943,8,0:15,120,60,-","1943,1944,2,0:15,120,0,-"],Sudan:["1970,1970,4,1,0,60,S","1970,1985,9,15,0,0,-","1971,1971,3,30,0,60,S","1972,1985,3,0,0,60,S"],Tunisia:["1939,1939,3,15,1380,60,S","1939,1939,10,18,1380,0,-","1940,1940,1,25,1380,60,S","1941,1941,9,6,0,0,-","1942,1942,2,9,0,60,S","1942,1942,10,2,180,0,-","1943,1943,2,29,120,60,S","1943,1943,3,17,120,0,-","1943,1943,3,25,120,60,S","1943,1943,9,4,120,0,-","1944,1945,3,1:1,120,60,S","1944,1944,9,8,0,0,-","1945,1945,8,16,0,0,-","1977,1977,3,30,0,60,S","1977,1977,8,24,0,0,-","1978,1978,4,1,0,60,S","1978,1978,9,1,0,0,-","1988,1988,5,1,0,60,S","1988,1990,8,0,0,0,-","1989,1989,2,26,0,60,S","1990,1990,4,1,0,60,S","2005,2005,4,1,0,60,S","2005,2005,8,30,60,0,-","2006,2008,2,0,120,60,S","2006,2008,9,0,120,0,-"]},zones:{"Africa/Algiers":["12,-,LMT,1891,Mar,15,0:01","9,-,PMT,1911,Mar,11,","0,Algeria,WE%sT,1940,Feb,25,2:00","60,Algeria,CE%sT,1946,Oct,7","0,-,WET,1956,Jan,29","60,-,CET,1963,Apr,14","0,Algeria,WE%sT,1977,Oct,21","60,Algeria,CE%sT,1979,Oct,26","0,Algeria,WE%sT,1981,May","60,-,CET"],"Africa/Luanda":["52,-,LMT,1892","52,-,AOT,1911,May,26,","60,-,WAT"],"Africa/Porto-Novo":["10,-,LMT,1912","0,-,GMT,1934,Feb,26","60,-,WAT"],"Africa/Gaborone":["103,-,LMT,1885","120,-,CAT,1943,Sep,19,2:00","120,1:00,CAST,1944,Mar,19,2:00","120,-,CAT"],"Africa/Ouagadougou":["6,-,LMT,1912","0,-,GMT"],"Africa/Bujumbura":["117,-,LMT,1890","120,-,CAT"],"Africa/Douala":["38,-,LMT,1912","60,-,WAT"],"Atlantic/Cape_Verde":["-26,-,LMT,1907,","-120,-,CVT,1942,Sep","-120,1:00,CVST,1945,Oct,15","-120,-,CVT,1975,Nov,25,2:00","-60,-,CVT"],"Africa/Bangui":["74,-,LMT,1912","60,-,WAT"],"Africa/Ndjamena":["60,-,LMT,1912","60,-,WAT,1979,Oct,14","60,1:00,WAST,1980,Mar,8","60,-,WAT"],"Indian/Comoro":["173,-,LMT,1911,Jul,","180,-,EAT"],"Africa/Kinshasa":["61,-,LMT,1897,Nov,9","60,-,WAT"],"Africa/Lubumbashi":["109,-,LMT,1897,Nov,9","120,-,CAT"],"Africa/Brazzaville":["61,-,LMT,1912","60,-,WAT"],"Africa/Abidjan":["16,-,LMT,1912","0,-,GMT"],"Africa/Djibouti":["172,-,LMT,1911,Jul","180,-,EAT"],"Africa/Cairo":["125,-,LMT,1900,Oct","120,Egypt,EE%sT"],"Africa/Malabo":["35,-,LMT,1912","0,-,GMT,1963,Dec,15","60,-,WAT"],"Africa/Asmara":["155,-,LMT,1870","155,-,AMT,1890,","155,-,ADMT,1936,May,5,","180,-,EAT"],"Africa/Addis_Ababa":["154,-,LMT,1870","155,-,ADMT,1936,May,5,","180,-,EAT"],"Africa/Libreville":["37,-,LMT,1912","60,-,WAT"],"Africa/Banjul":["-54,-,LMT,1912","-54,-,BMT,1935,","-60,-,WAT,1964","0,-,GMT"],"Africa/Accra":["0,-,LMT,1918","0,Ghana,%s"],"Africa/Conakry":["54,-,LMT,1912","0,-,GMT,1934,Feb,26","-60,-,WAT,1960","0,-,GMT"],"Africa/Bissau":["-58,-,LMT,1911,May,26","-60,-,WAT,1975","0,-,GMT"],"Africa/Nairobi":["147,-,LMT,1928,Jul","180,-,EAT,1930","150,-,BEAT,1940","165,-,BEAUT,1960","180,-,EAT"],"Africa/Maseru":["110,-,LMT,1903,Mar","120,-,SAST,1943,Sep,19,2:00","120,1:00,SAST,1944,Mar,19,2:00","120,-,SAST"],"Africa/Monrovia":["43,-,LMT,1882","43,-,MMT,1919,Mar,","44,-,LRT,1972,May,","0,-,GMT"],"Africa/Tripoli":["52,-,LMT,1920","60,Libya,CE%sT,1959","120,-,EET,1982","60,Libya,CE%sT,1990,May,4","120,-,EET,1996,Sep,30","60,-,CET,1997,Apr,4","60,1:00,CEST,1997,Oct,4","120,-,EET"],"Indian/Antananarivo":["190,-,LMT,1911,Jul","180,-,EAT,1954,Feb,27,23:00s","180,1:00,EAST,1954,May,29,23:00s","180,-,EAT"],"Africa/Blantyre":["140,-,LMT,1903,Mar","120,-,CAT"],"Africa/Bamako":["32,-,LMT,1912","0,-,GMT,1934,Feb,26","-60,-,WAT,1960,Jun,20","0,-,GMT"],"Africa/Nouakchott":["-57,-,LMT,1912","0,-,GMT,1934,Feb,26","-60,-,WAT,1960,Nov,28","0,-,GMT"],"Indian/Mauritius":["230,-,LMT,1907,","240,Mauritius,MU%sT,"],"Indian/Mayotte":["180,-,LMT,1911,Jul,","180,-,EAT"],"Africa/Casablanca":["30,-,LMT,1913,Oct,26","0,Morocco,WE%sT,1984,Mar,16","60,-,CET,1986","0,Morocco,WE%sT"],"Africa/El_Aaiun":["52,-,LMT,1934,Jan","-60,-,WAT,1976,Apr,14","0,-,WET"],"Africa/Maputo":["130,-,LMT,1903,Mar","120,-,CAT"],"Africa/Windhoek":["68,-,LMT,1892,Feb,8","90,-,SWAT,1903,Mar,","120,-,SAST,1942,Sep,20,2:00","120,1:00,SAST,1943,Mar,21,2:00","120,-,SAST,1990,Mar,21,","120,-,CAT,1994,Apr,3","60,Namibia,WA%sT"],"Africa/Niamey":["8,-,LMT,1912","-60,-,WAT,1934,Feb,26","0,-,GMT,1960","60,-,WAT"],"Africa/Lagos":["13,-,LMT,1919,Sep","60,-,WAT"],"Indian/Reunion":["221,-,LMT,1911,Jun,","240,-,RET,"],"Africa/Kigali":["120,-,LMT,1935,Jun","120,-,CAT"],"Atlantic/St_Helena":["22,-,LMT,1890,","22,-,JMT,1951,","0,-,GMT"],"Africa/Sao_Tome":["26,-,LMT,1884","36,-,LMT,1912,","0,-,GMT"],"Africa/Dakar":["-51,-,LMT,1912","-60,-,WAT,1941,Jun","0,-,GMT"],"Indian/Mahe":["221,-,LMT,1906,Jun,","240,-,SCT,"],"Africa/Freetown":["53,-,LMT,1882","53,-,FMT,1913,Jun,","-60,SL,%s,1957","0,SL,%s"],"Africa/Mogadishu":["181,-,LMT,1893,Nov","180,-,EAT,1931","150,-,BEAT,1957","180,-,EAT"],"Africa/Johannesburg":["112,-,LMT,1892,Feb,8","90,-,SAST,1903,Mar","120,SA,SAST"],"Africa/Khartoum":["130,-,LMT,1931","120,Sudan,CA%sT,2000,Jan,15,12:00","180,-,EAT"],"Africa/Juba":["126,-,LMT,1931","120,Sudan,CA%sT,2000,Jan,15,12:00","180,-,EAT"],"Africa/Mbabane":["124,-,LMT,1903,Mar","120,-,SAST"],"Africa/Dar_es_Salaam":["157,-,LMT,1931","180,-,EAT,1948","165,-,BEAUT,1961","180,-,EAT"],"Africa/Lome":["4,-,LMT,1893","0,-,GMT"],"Africa/Tunis":["40,-,LMT,1881,May,12","9,-,PMT,1911,Mar,11,","60,Tunisia,CE%sT"],"Africa/Kampala":["129,-,LMT,1928,Jul","180,-,EAT,1930","150,-,BEAT,1948","165,-,BEAUT,1957","180,-,EAT"],"Africa/Lusaka":["113,-,LMT,1903,Mar","120,-,CAT"],"Africa/Harare":["124,-,LMT,1903,Mar","120,-,CAT"]},lastZone:"Africa/Harare"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{ArgAQ:["1964,1966,2,1,0,0,-","1964,1966,9,15,0,60,S","1967,1967,3,2,0,0,-","1967,1968,9,0:1,0,60,S","1968,1969,3,0:1,0,0,-","1974,1974,0,23,0,60,S","1974,1974,4,1,0,0,-"],ChileAQ:["1972,1986,2,0:9,180,0,-","1974,1987,9,0:9,240,60,S","1987,1987,3,12,180,0,-","1988,1989,2,0:9,180,0,-","1988,1988,9,0:1,240,60,S","1989,1989,9,0:9,240,60,S","1990,1990,2,18,180,0,-","1990,1990,8,16,240,60,S","1991,1996,2,0:9,180,0,-","1991,1997,9,0:9,240,60,S","1997,1997,2,30,180,0,-","1998,1998,2,0:9,180,0,-","1998,1998,8,27,240,60,S","1999,1999,3,4,180,0,-","1999,9999,9,0:9,240,60,S","2000,9999,2,0:9,180,0,-"],AusAQ:["1917,1917,0,1,1,60,-","1917,1917,2,25,120,0,-","1942,1942,0,1,120,60,-","1942,1942,2,29,120,0,-","1942,1942,8,27,120,60,-","1943,1944,2,0,120,0,-","1943,1943,9,3,120,60,-"],ATAQ:["1967,1967,9,0:1,120,60,-","1968,1968,2,0,120,0,-","1968,1985,9,0,120,60,-","1969,1971,2,0:8,120,0,-","1972,1972,1,0,120,0,-","1973,1981,2,0:1,120,0,-","1982,1983,2,0,120,0,-","1984,1986,2,0:1,120,0,-","1986,1986,9,0:15,120,60,-","1987,1990,2,0:15,120,0,-","1987,1987,9,0:22,120,60,-","1988,1990,9,0,120,60,-","1991,1999,9,0:1,120,60,-","1991,2005,2,0,120,0,-","2000,2000,7,0,120,60,-","2001,9999,9,0:1,120,60,-","2006,2006,3,0:1,120,0,-","2007,2007,2,0,120,0,-","2008,9999,3,0:1,120,0,-"],NZAQ:["1974,1974,10,3,120,60,D","1975,1988,9,0,120,60,D","1989,1989,9,8,120,60,D","1990,2006,9,0:1,120,60,D","1975,1975,1,23,120,0,S","1976,1989,2,0:1,120,0,S","1990,2007,2,0:15,120,0,S","2007,9999,8,0,120,60,D","2008,9999,3,0:1,120,0,S"]},zones:{"Antarctica/Casey":["0,-,zzz,1969","480,-,WST,2009,Oct,18,2:00","0","660,-,CAST,2010,Mar,5,2:00","0","480,-,WST"],"Antarctica/Davis":["0,-,zzz,1957,Jan,13","420,-,DAVT,1964,Nov,","0,-,zzz,1969,Feb","420,-,DAVT,2009,Oct,18,2:00","300,-,DAVT,2010,Mar,10,20:00u","420,-,DAVT"],"Antarctica/Mawson":["0,-,zzz,1954,Feb,13","360,-,MAWT,2009,Oct,18,2:00","0","300,-,MAWT"],"Antarctica/Macquarie":["0,-,zzz,1911","600,-,EST,1916,Oct,1,2:00","600,1:00,EST,1917,Feb","600,AusAQ,EST,1967","600,ATAQ,EST,2010,Apr,4,3:00","660,-,MIST,"],"Indian/Kerguelen":["0,-,zzz,1950,","300,-,TFT,"],"Antarctica/DumontDUrville":["0,-,zzz,1947","600,-,PMT,1952,Jan,14,","0,-,zzz,1956,Nov","600,-,DDUT,"],"Antarctica/Syowa":["0,-,zzz,1957,Jan,29","180,-,SYOT,"],"Antarctica/Vostok":["0,-,zzz,1957,Dec,16","360,-,VOST,"],"Antarctica/Rothera":["0,-,zzz,1976,Dec,1","-180,-,ROTT,"],"Antarctica/Palmer":["0,-,zzz,1965","-240,ArgAQ,AR%sT,1969,Oct,5","-180,ArgAQ,AR%sT,1982,May","-240,ChileAQ,CL%sT"],"Antarctica/McMurdo":["0,-,zzz,1956","720,NZAQ,NZ%sT"]},lastZone:"Antarctica/McMurdo"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{EUAsia:["1981,9999,2,0,60,60,S","1979,1995,8,0,60,0,-","1996,9999,9,0,60,0,-"],"E-EurAsia":["1981,9999,2,0,0,60,S","1979,1995,8,0,0,0,-","1996,9999,9,0,0,0,-"],RussiaAsia:["1981,1984,3,1,0,60,S","1981,1983,9,1,0,0,-","1984,1991,8,0,120,0,-","1985,1991,2,0,120,60,S","1992,1992,2,-6,1380,60,S","1992,1992,8,-6,1380,0,-","1993,9999,2,0,120,60,S","1993,1995,8,0,120,0,-","1996,9999,9,0,120,0,-"],Azer:["1997,9999,2,0,240,60,S","1997,9999,9,0,300,0,-"],Dhaka:["2009,2009,5,19,1380,60,S","2009,2009,11,31,1439,0,-"],Shang:["1940,1940,5,3,0,60,D","1940,1941,9,1,0,0,S","1941,1941,2,16,0,60,D"],PRC:["1986,1986,4,4,0,60,D","1986,1991,8,0:11,0,0,S","1987,1991,3,0:10,0,60,D"],HK:["1941,1941,3,1,210,60,S","1941,1941,8,30,210,0,-","1946,1946,3,20,210,60,S","1946,1946,11,1,210,0,-","1947,1947,3,13,210,60,S","1947,1947,11,30,210,0,-","1948,1948,4,2,210,60,S","1948,1951,9,0,210,0,-","1952,1952,9,25,210,0,-","1949,1953,3,0:1,210,60,S","1953,1953,10,1,210,0,-","1954,1964,2,0:18,210,60,S","1954,1954,9,31,210,0,-","1955,1964,10,0:1,210,0,-","1965,1976,3,0:16,210,60,S","1965,1976,9,0:16,210,0,-","1973,1973,11,30,210,60,S","1979,1979,4,0:8,210,60,S","1979,1979,9,0:16,210,0,-"],Taiwan:["1945,1951,4,1,0,60,D","1945,1951,9,1,0,0,S","1952,1952,2,1,0,60,D","1952,1954,10,1,0,0,S","1953,1959,3,1,0,60,D","1955,1961,9,1,0,0,S","1960,1961,5,1,0,60,D","1974,1975,3,1,0,60,D","1974,1975,9,1,0,0,S","1979,1979,5,30,0,60,D","1979,1979,8,30,0,0,S"],Macau:["1961,1962,2,0:16,210,60,S","1961,1964,10,0:1,210,0,-","1963,1963,2,0:16,0,60,S","1964,1964,2,0:16,210,60,S","1965,1965,2,0:16,0,60,S","1965,1965,9,31,0,0,-","1966,1971,3,0:16,210,60,S","1966,1971,9,0:16,210,0,-","1972,1974,3,0:15,0,60,S","1972,1973,9,0:15,0,0,-","1974,1977,9,0:15,210,0,-","1975,1977,3,0:15,210,60,S","1978,1980,3,0:15,0,60,S","1978,1980,9,0:15,0,0,-"],Cyprus:["1975,1975,3,13,0,60,S","1975,1975,9,12,0,0,-","1976,1976,4,15,0,60,S","1976,1976,9,11,0,0,-","1977,1980,3,0:1,0,60,S","1977,1977,8,25,0,0,-","1978,1978,9,2,0,0,-","1979,1997,8,0,0,0,-","1981,1998,2,0,0,60,S"],Iran:["1978,1980,2,21,0,60,D","1978,1978,9,21,0,0,S","1979,1979,8,19,0,0,S","1980,1980,8,23,0,0,S","1991,1991,4,3,0,60,D","1992,1995,2,22,0,60,D","1991,1995,8,22,0,0,S","1996,1996,2,21,0,60,D","1996,1996,8,21,0,0,S","1997,1999,2,22,0,60,D","1997,1999,8,22,0,0,S","2000,2000,2,21,0,60,D","2000,2000,8,21,0,0,S","2001,2003,2,22,0,60,D","2001,2003,8,22,0,0,S","2004,2004,2,21,0,60,D","2004,2004,8,21,0,0,S","2005,2005,2,22,0,60,D","2005,2005,8,22,0,0,S","2008,2008,2,21,0,60,D","2008,2008,8,21,0,0,S","2009,2011,2,22,0,60,D","2009,2011,8,22,0,0,S","2012,2012,2,21,0,60,D","2012,2012,8,21,0,0,S","2013,2015,2,22,0,60,D","2013,2015,8,22,0,0,S","2016,2016,2,21,0,60,D","2016,2016,8,21,0,0,S","2017,2019,2,22,0,60,D","2017,2019,8,22,0,0,S","2020,2020,2,21,0,60,D","2020,2020,8,21,0,0,S","2021,2023,2,22,0,60,D","2021,2023,8,22,0,0,S","2024,2024,2,21,0,60,D","2024,2024,8,21,0,0,S","2025,2027,2,22,0,60,D","2025,2027,8,22,0,0,S","2028,2029,2,21,0,60,D","2028,2029,8,21,0,0,S","2030,2031,2,22,0,60,D","2030,2031,8,22,0,0,S","2032,2033,2,21,0,60,D","2032,2033,8,21,0,0,S","2034,2035,2,22,0,60,D","2034,2035,8,22,0,0,S","2036,2037,2,21,0,60,D","2036,2037,8,21,0,0,S"],Iraq:["1982,1982,4,1,0,60,D","1982,1984,9,1,0,0,S","1983,1983,2,31,0,60,D","1984,1985,3,1,0,60,D","1985,1990,8,0,60,0,S","1986,1990,2,0,60,60,D","1991,2007,3,1,180,60,D","1991,2007,9,1,180,0,S"],Zion:["1940,1940,5,1,0,60,D","1942,1944,10,1,0,0,S","1943,1943,3,1,120,60,D","1944,1944,3,1,0,60,D","1945,1945,3,16,0,60,D","1945,1945,10,1,120,0,S","1946,1946,3,16,120,60,D","1946,1946,10,1,0,0,S","1948,1948,4,23,0,120,DD","1948,1948,8,1,0,60,D","1948,1949,10,1,120,0,S","1949,1949,4,1,0,60,D","1950,1950,3,16,0,60,D","1950,1950,8,15,180,0,S","1951,1951,3,1,0,60,D","1951,1951,10,11,180,0,S","1952,1952,3,20,120,60,D","1952,1952,9,19,180,0,S","1953,1953,3,12,120,60,D","1953,1953,8,13,180,0,S","1954,1954,5,13,0,60,D","1954,1954,8,12,0,0,S","1955,1955,5,11,120,60,D","1955,1955,8,11,0,0,S","1956,1956,5,3,0,60,D","1956,1956,8,30,180,0,S","1957,1957,3,29,120,60,D","1957,1957,8,22,0,0,S","1974,1974,6,7,0,60,D","1974,1974,9,13,0,0,S","1975,1975,3,20,0,60,D","1975,1975,7,31,0,0,S","1985,1985,3,14,0,60,D","1985,1985,8,15,0,0,S","1986,1986,4,18,0,60,D","1986,1986,8,7,0,0,S","1987,1987,3,15,0,60,D","1987,1987,8,13,0,0,S","1988,1988,3,9,0,60,D","1988,1988,8,3,0,0,S","1989,1989,3,30,0,60,D","1989,1989,8,3,0,0,S","1990,1990,2,25,0,60,D","1990,1990,7,26,0,0,S","1991,1991,2,24,0,60,D","1991,1991,8,1,0,0,S","1992,1992,2,29,0,60,D","1992,1992,8,6,0,0,S","1993,1993,3,2,0,60,D","1993,1993,8,5,0,0,S","1994,1994,3,1,0,60,D","1994,1994,7,28,0,0,S","1995,1995,2,31,0,60,D","1995,1995,8,3,0,0,S","1996,1996,2,15,0,60,D","1996,1996,8,16,0,0,S","1997,1997,2,21,0,60,D","1997,1997,8,14,0,0,S","1998,1998,2,20,0,60,D","1998,1998,8,6,0,0,S","1999,1999,3,2,120,60,D","1999,1999,8,3,120,0,S","2000,2000,3,14,120,60,D","2000,2000,9,6,60,0,S","2001,2001,3,9,60,60,D","2001,2001,8,24,60,0,S","2002,2002,2,29,60,60,D","2002,2002,9,7,60,0,S","2003,2003,2,28,60,60,D","2003,2003,9,3,60,0,S","2004,2004,3,7,60,60,D","2004,2004,8,22,60,0,S","2005,2005,3,1,120,60,D","2005,2005,9,9,120,0,S","2006,2010,2,5:26,120,60,D","2006,2006,9,1,120,0,S","2007,2007,8,16,120,0,S","2008,2008,9,5,120,0,S","2009,2009,8,27,120,0,S","2010,2010,8,12,120,0,S","2011,2011,3,1,120,60,D","2011,2011,9,2,120,0,S","2012,2015,2,5:26,120,60,D","2012,2012,8,23,120,0,S","2013,2013,8,8,120,0,S","2014,2014,8,28,120,0,S","2015,2015,8,20,120,0,S","2016,2016,3,1,120,60,D","2016,2016,9,9,120,0,S","2017,2021,2,5:26,120,60,D","2017,2017,8,24,120,0,S","2018,2018,8,16,120,0,S","2019,2019,9,6,120,0,S","2020,2020,8,27,120,0,S","2021,2021,8,12,120,0,S","2022,2022,3,1,120,60,D","2022,2022,9,2,120,0,S","2023,2032,2,5:26,120,60,D","2023,2023,8,24,120,0,S","2024,2024,9,6,120,0,S","2025,2025,8,28,120,0,S","2026,2026,8,20,120,0,S","2027,2027,9,10,120,0,S","2028,2028,8,24,120,0,S","2029,2029,8,16,120,0,S","2030,2030,9,6,120,0,S","2031,2031,8,21,120,0,S","2032,2032,8,12,120,0,S","2033,2033,3,1,120,60,D","2033,2033,9,2,120,0,S","2034,2037,2,5:26,120,60,D","2034,2034,8,17,120,0,S","2035,2035,9,7,120,0,S","2036,2036,8,28,120,0,S","2037,2037,8,13,120,0,S"],Japan:["1948,1948,4,0:1,120,60,D","1948,1951,8,6:8,120,0,S","1949,1949,3,0:1,120,60,D","1950,1951,4,0:1,120,60,D"],Jordan:["1973,1973,5,6,0,60,S","1973,1975,9,1,0,0,-","1974,1977,4,1,0,60,S","1976,1976,10,1,0,0,-","1977,1977,9,1,0,0,-","1978,1978,3,30,0,60,S","1978,1978,8,30,0,0,-","1985,1985,3,1,0,60,S","1985,1985,9,1,0,0,-","1986,1988,3,5:1,0,60,S","1986,1990,9,5:1,0,0,-","1989,1989,4,8,0,60,S","1990,1990,3,27,0,60,S","1991,1991,3,17,0,60,S","1991,1991,8,27,0,0,-","1992,1992,3,10,0,60,S","1992,1993,9,5:1,0,0,-","1993,1998,3,5:1,0,60,S","1994,1994,8,5:15,0,0,-","1995,1998,8,5:15,0,0,-","1999,1999,6,1,0,60,S","1999,2002,8,-5,0,0,-","2000,2001,2,-4,0,60,S","2002,9999,2,-4,1440,60,S","2003,2003,9,24,0,0,-","2004,2004,9,15,0,0,-","2005,2005,8,-5,0,0,-","2006,9999,9,-5,0,0,-"],Kyrgyz:["1992,1996,3,0:7,0,60,S","1992,1996,8,0,0,0,-","1997,2005,2,0,150,60,S","1997,2004,9,0,150,0,-"],ROK:["1960,1960,4,15,0,60,D","1960,1960,8,13,0,0,S","1987,1988,4,0:8,0,60,D","1987,1988,9,0:8,0,0,S"],Lebanon:["1920,1920,2,28,0,60,S","1920,1920,9,25,0,0,-","1921,1921,3,3,0,60,S","1921,1921,9,3,0,0,-","1922,1922,2,26,0,60,S","1922,1922,9,8,0,0,-","1923,1923,3,22,0,60,S","1923,1923,8,16,0,0,-","1957,1961,4,1,0,60,S","1957,1961,9,1,0,0,-","1972,1972,5,22,0,60,S","1972,1977,9,1,0,0,-","1973,1977,4,1,0,60,S","1978,1978,3,30,0,60,S","1978,1978,8,30,0,0,-","1984,1987,4,1,0,60,S","1984,1991,9,16,0,0,-","1988,1988,5,1,0,60,S","1989,1989,4,10,0,60,S","1990,1992,4,1,0,60,S","1992,1992,9,4,0,0,-","1993,9999,2,0,0,60,S","1993,1998,8,0,0,0,-","1999,9999,9,0,0,0,-"],NBorneo:["1935,1941,8,14,0,20,TS","1935,1941,11,14,0,0,-"],Mongol:["1983,1984,3,1,0,60,S","1983,1983,9,1,0,0,-","1985,1998,2,0,0,60,S","1984,1998,8,0,0,0,-","2001,2001,3,-6,120,60,S","2001,2006,8,-6,120,0,-","2002,2006,2,-6,120,60,S"],Pakistan:["2002,2002,3,0:2,1,60,S","2002,2002,9,0:2,1,0,-","2008,2008,5,1,0,60,S","2008,2008,10,1,0,0,-","2009,2009,3,15,0,60,S","2009,2009,10,1,0,0,-"],EgyptAsia:["1957,1957,4,10,0,60,S","1957,1958,9,1,0,0,-","1958,1958,4,1,0,60,S","1959,1967,4,1,60,60,S","1959,1965,8,30,180,0,-","1966,1966,9,1,180,0,-"],Palestine:["1999,2005,3,5:15,0,60,S","1999,2003,9,5:15,0,0,-","2004,2004,9,1,60,0,-","2005,2005,9,4,120,0,-","2006,2008,3,1,0,60,S","2006,2006,8,22,0,0,-","2007,2007,8,4:8,120,0,-","2008,2008,7,-5,0,0,-","2009,2009,2,-5,0,60,S","2009,2009,8,5:1,120,0,-","2010,2010,2,-6,1,60,S","2010,2010,7,11,0,0,-"],Phil:["1936,1936,10,1,0,60,S","1937,1937,1,1,0,0,-","1954,1954,3,12,0,60,S","1954,1954,6,1,0,0,-","1978,1978,2,22,0,60,S","1978,1978,8,21,0,0,-"],Syria:["1920,1923,3,0:15,120,60,S","1920,1923,9,0:1,120,0,-","1962,1962,3,29,120,60,S","1962,1962,9,1,120,0,-","1963,1965,4,1,120,60,S","1963,1963,8,30,120,0,-","1964,1964,9,1,120,0,-","1965,1965,8,30,120,0,-","1966,1966,3,24,120,60,S","1966,1976,9,1,120,0,-","1967,1978,4,1,120,60,S","1977,1978,8,1,120,0,-","1983,1984,3,9,120,60,S","1983,1984,9,1,120,0,-","1986,1986,1,16,120,60,S","1986,1986,9,9,120,0,-","1987,1987,2,1,120,60,S","1987,1988,9,31,120,0,-","1988,1988,2,15,120,60,S","1989,1989,2,31,120,60,S","1989,1989,9,1,120,0,-","1990,1990,3,1,120,60,S","1990,1990,8,30,120,0,-","1991,1991,3,1,0,60,S","1991,1992,9,1,0,0,-","1992,1992,3,8,0,60,S","1993,1993,2,26,0,60,S","1993,1993,8,25,0,0,-","1994,1996,3,1,0,60,S","1994,2005,9,1,0,0,-","1997,1998,2,-1,0,60,S","1999,2006,3,1,0,60,S","2006,2006,8,22,0,0,-","2007,2007,2,-5,0,60,S","2007,2007,10,5:1,0,0,-","2008,2008,3,5:1,0,60,S","2008,2008,10,1,0,0,-","2009,2009,2,-5,0,60,S","2010,9999,3,5:1,0,60,S","2009,9999,9,-5,0,0,-"]},zones:{"Asia/Kabul":["276,-,LMT,1890","240,-,AFT,1945","270,-,AFT"],"Asia/Yerevan":["178,-,LMT,1924,May,2","180,-,YERT,1957,Mar,","240,RussiaAsia,YER%sT,1991,Mar,31,2:00s","180,1:00,YERST,1991,Sep,23,","180,RussiaAsia,AM%sT,1995,Sep,24,2:00s","240,-,AMT,1997","240,RussiaAsia,AM%sT"],"Asia/Baku":["199,-,LMT,1924,May,2","180,-,BAKT,1957,Mar,","240,RussiaAsia,BAK%sT,1991,Mar,31,2:00s","180,1:00,BAKST,1991,Aug,30,","180,RussiaAsia,AZ%sT,1992,Sep,lastSat,23:00","240,-,AZT,1996,","240,EUAsia,AZ%sT,1997","240,Azer,AZ%sT"],"Asia/Bahrain":["202,-,LMT,1920,","240,-,GST,1972,Jun","180,-,AST"],"Asia/Dhaka":["361,-,LMT,1890","353,-,HMT,1941,Oct,","390,-,BURT,1942,May,15,","330,-,IST,1942,Sep","390,-,BURT,1951,Sep,30","360,-,DACT,1971,Mar,26,","360,-,BDT,2009","360,Dhaka,BD%sT"],"Asia/Thimphu":["358,-,LMT,1947,Aug,15,","330,-,IST,1987,Oct","360,-,BTT,"],"Indian/Chagos":["289,-,LMT,1907","300,-,IOT,1996,","360,-,IOT"],"Asia/Brunei":["459,-,LMT,1926,Mar,","450,-,BNT,1933","480,-,BNT"],"Asia/Rangoon":["384,-,LMT,1880,","384,-,RMT,1920,","390,-,BURT,1942,May,","540,-,JST,1945,May,3","390,-,MMT,"],"Asia/Phnom_Penh":["419,-,LMT,1906,Jun,9","426,-,SMT,1911,Mar,11,0:01,","420,-,ICT,1912,May","480,-,ICT,1931,May","420,-,ICT"],"Asia/Harbin":["506,-,LMT,1928,","510,-,CHAT,1932,Mar,","480,-,CST,1940","540,-,CHAT,1966,May","510,-,CHAT,1980,May","480,PRC,C%sT"],"Asia/Shanghai":["485,-,LMT,1928","480,Shang,C%sT,1949","480,PRC,C%sT"],"Asia/Chongqing":["426,-,LMT,1928,","420,-,LONT,1980,May,","480,PRC,C%sT"],"Asia/Urumqi":["350,-,LMT,1928,","360,-,URUT,1980,May,","480,PRC,C%sT"],"Asia/Kashgar":["303,-,LMT,1928,","330,-,KAST,1940,","300,-,KAST,1980,May","480,PRC,C%sT"],"Asia/Hong_Kong":["456,-,LMT,1904,Oct,30","480,HK,HK%sT,1941,Dec,25","540,-,JST,1945,Sep,15","480,HK,HK%sT"],"Asia/Taipei":["486,-,LMT,1896,","480,Taiwan,C%sT"],"Asia/Macau":["454,-,LMT,1912","480,Macau,MO%sT,1999,Dec,20,","480,PRC,C%sT"],"Asia/Nicosia":["133,-,LMT,1921,Nov,14","120,Cyprus,EE%sT,1998,Sep","120,EUAsia,EE%sT"],"Asia/Tbilisi":["179,-,LMT,1880","179,-,TBMT,1924,May,2,","180,-,TBIT,1957,Mar,","240,RussiaAsia,TBI%sT,1991,Mar,31,2:00s","180,1:00,TBIST,1991,Apr,9,","180,RussiaAsia,GE%sT,1992,","180,E-EurAsia,GE%sT,1994,Sep,lastSun","240,E-EurAsia,GE%sT,1996,Oct,lastSun","240,1:00,GEST,1997,Mar,lastSun","240,E-EurAsia,GE%sT,2004,Jun,27","180,RussiaAsia,GE%sT,2005,Mar,lastSun,2:00","240,-,GET"],"Asia/Dili":["502,-,LMT,1912","480,-,TLT,1942,Feb,21,23:00,","540,-,JST,1945,Sep,23","540,-,TLT,1976,May,3","480,-,CIT,2000,Sep,17,00:00","540,-,TLT"],"Asia/Kolkata":["353,-,LMT,1880,","353,-,HMT,1941,Oct,","390,-,BURT,1942,May,15,","330,-,IST,1942,Sep","330,1:00,IST,1945,Oct,15","330,-,IST"],"Asia/Jakarta":["427,-,LMT,1867,Aug,10","427,-,JMT,1923,Dec,31,23:47:12,","440,-,JAVT,1932,Nov,","450,-,WIT,1942,Mar,23","540,-,JST,1945,Sep,23","450,-,WIT,1948,May","480,-,WIT,1950,May","450,-,WIT,1964","420,-,WIT"],"Asia/Pontianak":["437,-,LMT,1908,May","437,-,PMT,1932,Nov,","450,-,WIT,1942,Jan,29","540,-,JST,1945,Sep,23","450,-,WIT,1948,May","480,-,WIT,1950,May","450,-,WIT,1964","480,-,CIT,1988,Jan,1","420,-,WIT"],"Asia/Makassar":["477,-,LMT,1920","477,-,MMT,1932,Nov,","480,-,CIT,1942,Feb,9","540,-,JST,1945,Sep,23","480,-,CIT"],"Asia/Jayapura":["562,-,LMT,1932,Nov","540,-,EIT,1944,Sep,1","570,-,CST,1964","540,-,EIT"],"Asia/Tehran":["205,-,LMT,1916","205,-,TMT,1946,","210,-,IRST,1977,Nov","240,Iran,IR%sT,1979","210,Iran,IR%sT"],"Asia/Baghdad":["177,-,LMT,1890","177,-,BMT,1918,","180,-,AST,1982,May","180,Iraq,A%sT"],"Asia/Jerusalem":["140,-,LMT,1880","140,-,JMT,1918,","120,Zion,I%sT"],"Asia/Tokyo":["558,-,LMT,1887,Dec,31,15:00u","540,-,JST,1896","540,-,CJT,1938","540,Japan,J%sT"],"Asia/Amman":["143,-,LMT,1931","120,Jordan,EE%sT"],"Asia/Almaty":["307,-,LMT,1924,May,2,","300,-,ALMT,1930,Jun,21,","360,RussiaAsia,ALM%sT,1991","360,-,ALMT,1992","360,RussiaAsia,ALM%sT,2005,Mar,15","360,-,ALMT"],"Asia/Qyzylorda":["261,-,LMT,1924,May,2","240,-,KIZT,1930,Jun,21,","300,-,KIZT,1981,Apr,1","300,1:00,KIZST,1981,Oct,1","360,-,KIZT,1982,Apr,1","300,RussiaAsia,KIZ%sT,1991","300,-,KIZT,1991,Dec,16,","300,-,QYZT,1992,Jan,19,2:00","360,RussiaAsia,QYZ%sT,2005,Mar,15","360,-,QYZT"],"Asia/Aqtobe":["228,-,LMT,1924,May,2","240,-,AKTT,1930,Jun,21,","300,-,AKTT,1981,Apr,1","300,1:00,AKTST,1981,Oct,1","360,-,AKTT,1982,Apr,1","300,RussiaAsia,AKT%sT,1991","300,-,AKTT,1991,Dec,16,","300,RussiaAsia,AQT%sT,2005,Mar,15,","300,-,AQTT"],"Asia/Aqtau":["201,-,LMT,1924,May,2","240,-,FORT,1930,Jun,21,","300,-,FORT,1963","300,-,SHET,1981,Oct,1,","360,-,SHET,1982,Apr,1","300,RussiaAsia,SHE%sT,1991","300,-,SHET,1991,Dec,16,","300,RussiaAsia,AQT%sT,1995,Mar,lastSun,2:00,","240,RussiaAsia,AQT%sT,2005,Mar,15","300,-,AQTT"],"Asia/Oral":["205,-,LMT,1924,May,2,","240,-,URAT,1930,Jun,21,","300,-,URAT,1981,Apr,1","300,1:00,URAST,1981,Oct,1","360,-,URAT,1982,Apr,1","300,RussiaAsia,URA%sT,1989,Mar,26,2:00","240,RussiaAsia,URA%sT,1991","240,-,URAT,1991,Dec,16,","240,RussiaAsia,ORA%sT,2005,Mar,15,","300,-,ORAT"],"Asia/Bishkek":["298,-,LMT,1924,May,2","300,-,FRUT,1930,Jun,21,","360,RussiaAsia,FRU%sT,1991,Mar,31,2:00s","300,1:00,FRUST,1991,Aug,31,2:00,","300,Kyrgyz,KG%sT,2005,Aug,12,","360,-,KGT"],"Asia/Seoul":["507,-,LMT,1890","510,-,KST,1904,Dec","540,-,KST,1928","510,-,KST,1932","540,-,KST,1954,Mar,21","480,ROK,K%sT,1961,Aug,10","510,-,KST,1968,Oct","540,ROK,K%sT"],"Asia/Pyongyang":["503,-,LMT,1890","510,-,KST,1904,Dec","540,-,KST,1928","510,-,KST,1932","540,-,KST,1954,Mar,21","480,-,KST,1961,Aug,10","540,-,KST"],"Asia/Kuwait":["191,-,LMT,1950","180,-,AST"],"Asia/Vientiane":["410,-,LMT,1906,Jun,9,","426,-,SMT,1911,Mar,11,0:01,","420,-,ICT,1912,May","480,-,ICT,1931,May","420,-,ICT"],"Asia/Beirut":["142,-,LMT,1880","120,Lebanon,EE%sT"],"Asia/Kuala_Lumpur":["406,-,LMT,1901,Jan,1","415,-,SMT,1905,Jun,1,","420,-,MALT,1933,Jan,1,","420,0:20,MALST,1936,Jan,1","440,-,MALT,1941,Sep,1","450,-,MALT,1942,Feb,16","540,-,JST,1945,Sep,12","450,-,MALT,1982,Jan,1","480,-,MYT,"],"Asia/Kuching":["441,-,LMT,1926,Mar","450,-,BORT,1933,","480,NBorneo,BOR%sT,1942,Feb,16","540,-,JST,1945,Sep,12","480,-,BORT,1982,Jan,1","480,-,MYT"],"Indian/Maldives":["294,-,LMT,1880,","294,-,MMT,1960,","300,-,MVT,"],"Asia/Hovd":["366,-,LMT,1905,Aug","360,-,HOVT,1978,","420,Mongol,HOV%sT"],"Asia/Ulaanbaatar":["427,-,LMT,1905,Aug","420,-,ULAT,1978,","480,Mongol,ULA%sT"],"Asia/Choibalsan":["458,-,LMT,1905,Aug","420,-,ULAT,1978","480,-,ULAT,1983,Apr","540,Mongol,CHO%sT,2008,Mar,31,","480,Mongol,CHO%sT"],"Asia/Kathmandu":["341,-,LMT,1920","330,-,IST,1986","345,-,NPT,"],"Asia/Muscat":["234,-,LMT,1920","240,-,GST"],"Asia/Karachi":["268,-,LMT,1907","330,-,IST,1942,Sep","330,1:00,IST,1945,Oct,15","330,-,IST,1951,Sep,30","300,-,KART,1971,Mar,26,","300,Pakistan,PK%sT,"],"Asia/Gaza":["137,-,LMT,1900,Oct","120,Zion,EET,1948,May,15","120,EgyptAsia,EE%sT,1967,Jun,5","120,Zion,I%sT,1996","120,Jordan,EE%sT,1999","120,Palestine,EE%sT,2011,Apr,2,12:01","120,1:00,EEST,2011,Aug,1","120,-,EET"],"Asia/Hebron":["140,-,LMT,1900,Oct","120,Zion,EET,1948,May,15","120,EgyptAsia,EE%sT,1967,Jun,5","120,Zion,I%sT,1996","120,Jordan,EE%sT,1999","120,Palestine,EE%sT,2008,Aug","120,1:00,EEST,2008,Sep","120,Palestine,EE%sT,2011,Apr,1,12:01","120,1:00,EEST,2011,Aug,1","120,-,EET,2011,Aug,30","120,1:00,EEST,2011,Sep,30,3:00","120,-,EET"],"Asia/Manila":["-844,-,LMT,1844,Dec,31","484,-,LMT,1899,May,11","480,Phil,PH%sT,1942,May","540,-,JST,1944,Nov","480,Phil,PH%sT"],"Asia/Qatar":["206,-,LMT,1920,","240,-,GST,1972,Jun","180,-,AST"],"Asia/Riyadh":["186,-,LMT,1950","180,-,AST"],"Asia/Singapore":["415,-,LMT,1901,Jan,1","415,-,SMT,1905,Jun,1,","420,-,MALT,1933,Jan,1,","420,0:20,MALST,1936,Jan,1","440,-,MALT,1941,Sep,1","450,-,MALT,1942,Feb,16","540,-,JST,1945,Sep,12","450,-,MALT,1965,Aug,9,","450,-,SGT,1982,Jan,1,","480,-,SGT"],"Asia/Colombo":["319,-,LMT,1880","319,-,MMT,1906,","330,-,IST,1942,Jan,5","330,0:30,IHST,1942,Sep","330,1:00,IST,1945,Oct,16,2:00","330,-,IST,1996,May,25,0:00","390,-,LKT,1996,Oct,26,0:30","360,-,LKT,2006,Apr,15,0:30","330,-,IST"],"Asia/Damascus":["145,-,LMT,1920,","120,Syria,EE%sT"],"Asia/Dushanbe":["275,-,LMT,1924,May,2","300,-,DUST,1930,Jun,21,","360,RussiaAsia,DUS%sT,1991,Mar,31,2:00s","300,1:00,DUSST,1991,Sep,9,2:00s","300,-,TJT,"],"Asia/Bangkok":["402,-,LMT,1880","402,-,BMT,1920,Apr,","420,-,ICT"],"Asia/Ashgabat":["233,-,LMT,1924,May,2,","240,-,ASHT,1930,Jun,21,","300,RussiaAsia,ASH%sT,1991,Mar,31,2:00","240,RussiaAsia,ASH%sT,1991,Oct,27,","240,RussiaAsia,TM%sT,1992,Jan,19,2:00","300,-,TMT"],"Asia/Dubai":["221,-,LMT,1920","240,-,GST"],"Asia/Samarkand":["267,-,LMT,1924,May,2","240,-,SAMT,1930,Jun,21,","300,-,SAMT,1981,Apr,1","300,1:00,SAMST,1981,Oct,1","360,-,TAST,1982,Apr,1,","300,RussiaAsia,SAM%sT,1991,Sep,1,","300,RussiaAsia,UZ%sT,1992","300,-,UZT"],"Asia/Tashkent":["277,-,LMT,1924,May,2","300,-,TAST,1930,Jun,21,","360,RussiaAsia,TAS%sT,1991,Mar,31,2:00","300,RussiaAsia,TAS%sT,1991,Sep,1,","300,RussiaAsia,UZ%sT,1992","300,-,UZT"],"Asia/Ho_Chi_Minh":["426,-,LMT,1906,Jun,9","426,-,SMT,1911,Mar,11,0:01,","420,-,ICT,1912,May","480,-,ICT,1931,May","420,-,ICT"],"Asia/Aden":["180,-,LMT,1950","180,-,AST"]},lastZone:"Asia/Aden"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{Aus:["1917,1917,0,1,1,60,-","1917,1917,2,25,120,0,-","1942,1942,0,1,120,60,-","1942,1942,2,29,120,0,-","1942,1942,8,27,120,60,-","1943,1944,2,0,120,0,-","1943,1943,9,3,120,60,-"],AW:["1974,1974,9,0,120,60,-","1975,1975,2,0:1,120,0,-","1983,1983,9,0,120,60,-","1984,1984,2,0:1,120,0,-","1991,1991,10,17,120,60,-","1992,1992,2,0:1,120,0,-","2006,2006,11,3,120,60,-","2007,2009,2,0,120,0,-","2007,2008,9,0,120,60,-"],AQ:["1971,1971,9,0,120,60,-","1972,1972,1,0,120,0,-","1989,1991,9,0,120,60,-","1990,1992,2,0:1,120,0,-"],Holiday:["1992,1993,9,0,120,60,-","1993,1994,2,0:1,120,0,-"],AS:["1971,1985,9,0,120,60,-","1986,1986,9,19,120,60,-","1987,2007,9,0,120,60,-","1972,1972,1,27,120,0,-","1973,1985,2,0:1,120,0,-","1986,1990,2,0:15,120,0,-","1991,1991,2,3,120,0,-","1992,1992,2,22,120,0,-","1993,1993,2,7,120,0,-","1994,1994,2,20,120,0,-","1995,2005,2,0,120,0,-","2006,2006,3,2,120,0,-","2007,2007,2,0,120,0,-","2008,9999,3,0:1,120,0,-","2008,9999,9,0:1,120,60,-"],AT:["1967,1967,9,0:1,120,60,-","1968,1968,2,0,120,0,-","1968,1985,9,0,120,60,-","1969,1971,2,0:8,120,0,-","1972,1972,1,0,120,0,-","1973,1981,2,0:1,120,0,-","1982,1983,2,0,120,0,-","1984,1986,2,0:1,120,0,-","1986,1986,9,0:15,120,60,-","1987,1990,2,0:15,120,0,-","1987,1987,9,0:22,120,60,-","1988,1990,9,0,120,60,-","1991,1999,9,0:1,120,60,-","1991,2005,2,0,120,0,-","2000,2000,7,0,120,60,-","2001,9999,9,0:1,120,60,-","2006,2006,3,0:1,120,0,-","2007,2007,2,0,120,0,-","2008,9999,3,0:1,120,0,-"],AV:["1971,1985,9,0,120,60,-","1972,1972,1,0,120,0,-","1973,1985,2,0:1,120,0,-","1986,1990,2,0:15,120,0,-","1986,1987,9,0:15,120,60,-","1988,1999,9,0,120,60,-","1991,1994,2,0:1,120,0,-","1995,2005,2,0,120,0,-","2000,2000,7,0,120,60,-","2001,2007,9,0,120,60,-","2006,2006,3,0:1,120,0,-","2007,2007,2,0,120,0,-","2008,9999,3,0:1,120,0,-","2008,9999,9,0:1,120,60,-"],AN:["1971,1985,9,0,120,60,-","1972,1972,1,27,120,0,-","1973,1981,2,0:1,120,0,-","1982,1982,3,0:1,120,0,-","1983,1985,2,0:1,120,0,-","1986,1989,2,0:15,120,0,-","1986,1986,9,19,120,60,-","1987,1999,9,0,120,60,-","1990,1995,2,0:1,120,0,-","1996,2005,2,0,120,0,-","2000,2000,7,0,120,60,-","2001,2007,9,0,120,60,-","2006,2006,3,0:1,120,0,-","2007,2007,2,0,120,0,-","2008,9999,3,0:1,120,0,-","2008,9999,9,0:1,120,60,-"],LH:["1981,1984,9,0,120,60,-","1982,1985,2,0:1,120,0,-","1985,1985,9,0,120,30,-","1986,1989,2,0:15,120,0,-","1986,1986,9,19,120,30,-","1987,1999,9,0,120,30,-","1990,1995,2,0:1,120,0,-","1996,2005,2,0,120,0,-","2000,2000,7,0,120,30,-","2001,2007,9,0,120,30,-","2006,2006,3,0:1,120,0,-","2007,2007,2,0,120,0,-","2008,9999,3,0:1,120,0,-","2008,9999,9,0:1,120,30,-"],Cook:["1978,1978,10,12,0,30,HS","1979,1991,2,0:1,0,0,-","1979,1990,9,0,0,30,HS"],Fiji:["1998,1999,10,0:1,120,60,S","1999,2000,1,0,180,0,-","2009,2009,10,29,120,60,S","2010,2010,2,0,180,0,-","2010,2010,9,24,120,60,S","2011,2011,2,0:1,180,0,-","2011,2011,9,23,120,60,S","2012,2012,0,22,180,0,-"],NC:["1977,1978,11,0:1,0,60,S","1978,1979,1,27,0,0,-","1996,1996,11,1,120,60,S","1997,1997,2,2,120,0,-"],NZ:["1927,1927,10,6,120,60,S","1928,1928,2,4,120,0,M","1928,1933,9,0:8,120,30,S","1929,1933,2,0:15,120,0,M","1934,1940,3,0,120,0,M","1934,1940,8,0,120,30,S","1946,1946,0,1,0,0,S","1974,1974,10,0:1,120,60,D","1975,1975,1,0,120,0,S","1975,1988,9,0,120,60,D","1976,1989,2,0:1,120,0,S","1989,1989,9,0:8,120,60,D","1990,2006,9,0:1,120,60,D","1990,2007,2,0:15,120,0,S","2007,9999,8,0,120,60,D","2008,9999,3,0:1,120,0,S"],Chatham:["1974,1974,10,0:1,120,60,D","1975,1975,1,0,120,0,S","1975,1988,9,0,120,60,D","1976,1989,2,0:1,120,0,S","1989,1989,9,0:8,120,60,D","1990,2006,9,0:1,120,60,D","1990,2007,2,0:15,120,0,S","2007,9999,8,0,120,60,D","2008,9999,3,0:1,120,0,S"],Tonga:["1999,1999,9,7,120,60,S","2000,2000,2,19,120,0,-","2000,2001,10,0:1,120,60,S","2001,2002,0,0,120,0,-"],Vanuatu:["1983,1983,8,25,0,60,S","1984,1991,2,0:23,0,0,-","1984,1984,9,23,0,60,S","1985,1991,8,0:23,0,60,S","1992,1993,0,0:23,0,0,-","1992,1992,9,0:23,0,60,S"]},zones:{"Australia/Darwin":["523,-,LMT,1895,Feb","540,-,CST,1899,May","570,Aus,CST"],"Australia/Perth":["463,-,LMT,1895,Dec","480,Aus,WST,1943,Jul","480,AW,WST"],"Australia/Eucla":["515,-,LMT,1895,Dec","525,Aus,CWST,1943,Jul","525,AW,CWST"],"Australia/Brisbane":["612,-,LMT,1895","600,Aus,EST,1971","600,AQ,EST"],"Australia/Lindeman":["595,-,LMT,1895","600,Aus,EST,1971","600,AQ,EST,1992,Jul","600,Holiday,EST"],"Australia/Adelaide":["554,-,LMT,1895,Feb","540,-,CST,1899,May","570,Aus,CST,1971","570,AS,CST"],"Australia/Hobart":["589,-,LMT,1895,Sep","600,-,EST,1916,Oct,1,2:00","600,1:00,EST,1917,Feb","600,Aus,EST,1967","600,AT,EST"],"Australia/Currie":["575,-,LMT,1895,Sep","600,-,EST,1916,Oct,1,2:00","600,1:00,EST,1917,Feb","600,Aus,EST,1971,Jul","600,AT,EST"],"Australia/Melbourne":["579,-,LMT,1895,Feb","600,Aus,EST,1971","600,AV,EST"],"Australia/Sydney":["604,-,LMT,1895,Feb","600,Aus,EST,1971","600,AN,EST"],"Australia/Broken_Hill":["565,-,LMT,1895,Feb","600,-,EST,1896,Aug,23","540,-,CST,1899,May","570,Aus,CST,1971","570,AN,CST,2000","570,AS,CST"],"Australia/Lord_Howe":["636,-,LMT,1895,Feb","600,-,EST,1981,Mar","630,LH,LHST"],"Indian/Christmas":["422,-,LMT,1895,Feb","420,-,CXT,"],"Pacific/Rarotonga":["-561,-,LMT,1901,","-570,-,CKT,1978,Nov,12,","-600,Cook,CK%sT"],"Indian/Cocos":["387,-,LMT,1900","390,-,CCT,"],"Pacific/Fiji":["713,-,LMT,1915,Oct,26,","720,Fiji,FJ%sT,"],"Pacific/Gambier":["-421,-,LMT,1912,Oct,","-540,-,GAMT,"],"Pacific/Marquesas":["-522,-,LMT,1912,Oct","-510,-,MART,"],"Pacific/Tahiti":["-482,-,LMT,1912,Oct,","-600,-,TAHT,"],"Pacific/Guam":["-819,-,LMT,1844,Dec,31","579,-,LMT,1901,","600,-,GST,2000,Dec,23,","600,-,ChST,"],"Pacific/Tarawa":["692,-,LMT,1901,","720,-,GILT,"],"Pacific/Enderbury":["-636,-,LMT,1901","-720,-,PHOT,1979,Oct,","-660,-,PHOT,1995","780,-,PHOT"],"Pacific/Kiritimati":["-571,-,LMT,1901","-560,-,LINT,1979,Oct,","-600,-,LINT,1995","840,-,LINT"],"Pacific/Saipan":["-823,-,LMT,1844,Dec,31","583,-,LMT,1901","540,-,MPT,1969,Oct,","600,-,MPT,2000,Dec,23","600,-,ChST,"],"Pacific/Majuro":["684,-,LMT,1901","660,-,MHT,1969,Oct,","720,-,MHT"],"Pacific/Kwajalein":["669,-,LMT,1901","660,-,MHT,1969,Oct","-720,-,KWAT,1993,Aug,20,","720,-,MHT"],"Pacific/Chuuk":["607,-,LMT,1901","600,-,CHUT,"],"Pacific/Pohnpei":["632,-,LMT,1901,","660,-,PONT,"],"Pacific/Kosrae":["651,-,LMT,1901","660,-,KOST,1969,Oct,","720,-,KOST,1999","660,-,KOST"],"Pacific/Nauru":["667,-,LMT,1921,Jan,15,","690,-,NRT,1942,Mar,15,","540,-,JST,1944,Aug,15","690,-,NRT,1979,May","720,-,NRT"],"Pacific/Noumea":["665,-,LMT,1912,Jan,13","660,NC,NC%sT"],"Pacific/Auckland":["699,-,LMT,1868,Nov,2","690,NZ,NZ%sT,1946,Jan,1","720,NZ,NZ%sT"],"Pacific/Chatham":["733,-,LMT,1957,Jan,1","765,Chatham,CHA%sT"],"Pacific/Niue":["-641,-,LMT,1901,","-640,-,NUT,1951,","-630,-,NUT,1978,Oct,1","-660,-,NUT"],"Pacific/Norfolk":["671,-,LMT,1901,","672,-,NMT,1951,","690,-,NFT,"],"Pacific/Palau":["537,-,LMT,1901,","540,-,PWT,"],"Pacific/Port_Moresby":["588,-,LMT,1880","588,-,PMMT,1895,","600,-,PGT,"],"Pacific/Pitcairn":["-440,-,LMT,1901,","-450,-,PNT,1998,Apr,27,00:00","-480,-,PST,"],"Pacific/Pago_Pago":["757,-,LMT,1879,Jul,5","-638,-,LMT,1911","-630,-,SAMT,1950,","-660,-,NST,1967,Apr,","-660,-,BST,1983,Nov,30,","-660,-,SST,"],"Pacific/Apia":["753,-,LMT,1879,Jul,5","-634,-,LMT,1911","-630,-,SAMT,1950,","-660,-,WST,2010,Sep,26","-660,1:00,WSDT,2011,Apr,2,4:00","-660,-,WST,2011,Sep,24,3:00","-660,1:00,WSDT,2011,Dec,30","780,1:00,WSDT,2012,Apr,1,4:00","780,-,WST"],"Pacific/Guadalcanal":["639,-,LMT,1912,Oct,","660,-,SBT,"],"Pacific/Fakaofo":["-636,-,LMT,1901","-600,-,TKT,"],"Pacific/Tongatapu":["739,-,LMT,1901","740,-,TOT,1941,","780,-,TOT,1999","780,Tonga,TO%sT"],"Pacific/Funafuti":["716,-,LMT,1901","720,-,TVT,"],"Pacific/Johnston":["-600,-,HST"],"Pacific/Midway":["-611,-,LMT,1901","-660,-,NST,1956,Jun,3","-660,1:00,NDT,1956,Sep,2","-660,-,NST,1967,Apr,","-660,-,BST,1983,Nov,30,","-660,-,SST,"],"Pacific/Wake":["666,-,LMT,1901","720,-,WAKT,"],"Pacific/Efate":["673,-,LMT,1912,Jan,13,","660,Vanuatu,VU%sT,"],"Pacific/Wallis":["735,-,LMT,1901","720,-,WFT,"]},lastZone:"Pacific/Wallis"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{},zones:{"Etc/GMT":["0,-,GMT"],"Etc/UTC":["0,-,UTC"],"Etc/UCT":["0,-,UCT"],"Etc/GMT-14":["840,-,GMT-14,"],"Etc/GMT-13":["780,-,GMT-13"],"Etc/GMT-12":["720,-,GMT-12"],"Etc/GMT-11":["660,-,GMT-11"],"Etc/GMT-10":["600,-,GMT-10"],"Etc/GMT-9":["540,-,GMT-9"],"Etc/GMT-8":["480,-,GMT-8"],"Etc/GMT-7":["420,-,GMT-7"],"Etc/GMT-6":["360,-,GMT-6"],"Etc/GMT-5":["300,-,GMT-5"],"Etc/GMT-4":["240,-,GMT-4"],"Etc/GMT-3":["180,-,GMT-3"],"Etc/GMT-2":["120,-,GMT-2"],"Etc/GMT-1":["60,-,GMT-1"],"Etc/GMT+1":["-60,-,GMT+1"],"Etc/GMT+2":["-120,-,GMT+2"],"Etc/GMT+3":["-180,-,GMT+3"],"Etc/GMT+4":["-240,-,GMT+4"],"Etc/GMT+5":["-300,-,GMT+5"],"Etc/GMT+6":["-360,-,GMT+6"],"Etc/GMT+7":["-420,-,GMT+7"],"Etc/GMT+8":["-480,-,GMT+8"],"Etc/GMT+9":["-540,-,GMT+9"],"Etc/GMT+10":["-600,-,GMT+10"],"Etc/GMT+11":["-660,-,GMT+11"],"Etc/GMT+12":["-720,-,GMT+12"]},lastZone:"Etc/GMT+12"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{"GB-Eire":["1916,1916,4,21,120,60,BST","1916,1916,9,1,120,0,GMT","1917,1917,3,8,120,60,BST","1917,1917,8,17,120,0,GMT","1918,1918,2,24,120,60,BST","1918,1918,8,30,120,0,GMT","1919,1919,2,30,120,60,BST","1919,1919,8,29,120,0,GMT","1920,1920,2,28,120,60,BST","1920,1920,9,25,120,0,GMT","1921,1921,3,3,120,60,BST","1921,1921,9,3,120,0,GMT","1922,1922,2,26,120,60,BST","1922,1922,9,8,120,0,GMT","1923,1923,3,0:16,120,60,BST","1923,1924,8,0:16,120,0,GMT","1924,1924,3,0:9,120,60,BST","1925,1926,3,0:16,120,60,BST","1925,1938,9,0:2,120,0,GMT","1927,1927,3,0:9,120,60,BST","1928,1929,3,0:16,120,60,BST","1930,1930,3,0:9,120,60,BST","1931,1932,3,0:16,120,60,BST","1933,1933,3,0:9,120,60,BST","1934,1934,3,0:16,120,60,BST","1935,1935,3,0:9,120,60,BST","1936,1937,3,0:16,120,60,BST","1938,1938,3,0:9,120,60,BST","1939,1939,3,0:16,120,60,BST","1939,1939,10,0:16,120,0,GMT","1940,1940,1,0:23,120,60,BST","1941,1941,4,0:2,60,120,BDST","1941,1943,7,0:9,60,60,BST","1942,1944,3,0:2,60,120,BDST","1944,1944,8,0:16,60,60,BST","1945,1945,3,1:2,60,120,BDST","1945,1945,6,0:9,60,60,BST","1945,1946,9,0:2,120,0,GMT","1946,1946,3,0:9,120,60,BST","1947,1947,2,16,120,60,BST","1947,1947,3,13,60,120,BDST","1947,1947,7,10,60,60,BST","1947,1947,10,2,120,0,GMT","1948,1948,2,14,120,60,BST","1948,1948,9,31,120,0,GMT","1949,1949,3,3,120,60,BST","1949,1949,9,30,120,0,GMT","1950,1952,3,0:14,120,60,BST","1950,1952,9,0:21,120,0,GMT","1953,1953,3,0:16,120,60,BST","1953,1960,9,0:2,120,0,GMT","1954,1954,3,0:9,120,60,BST","1955,1956,3,0:16,120,60,BST","1957,1957,3,0:9,120,60,BST","1958,1959,3,0:16,120,60,BST","1960,1960,3,0:9,120,60,BST","1961,1963,2,0,120,60,BST","1961,1968,9,0:23,120,0,GMT","1964,1967,2,0:19,120,60,BST","1968,1968,1,18,120,60,BST","1972,1980,2,0:16,120,60,BST","1972,1980,9,0:23,120,0,GMT","1981,1995,2,0,60,60,BST","1981,1989,9,0:23,60,0,GMT","1990,1995,9,0:22,60,0,GMT"],EU:["1977,1980,3,0:1,60,60,S","1977,1977,8,0,60,0,-","1978,1978,9,1,60,0,-","1979,1995,8,0,60,0,-","1981,9999,2,0,60,60,S","1996,9999,9,0,60,0,-"],"W-Eur":["1977,1980,3,0:1,60,60,S","1977,1977,8,0,60,0,-","1978,1978,9,1,60,0,-","1979,1995,8,0,60,0,-","1981,9999,2,0,60,60,S","1996,9999,9,0,60,0,-"],"C-Eur":["1916,1916,3,30,1380,60,S","1916,1916,9,1,60,0,-","1917,1918,3,1:15,120,60,S","1917,1918,8,1:15,120,0,-","1940,1940,3,1,120,60,S","1942,1942,10,2,120,0,-","1943,1943,2,29,120,60,S","1943,1943,9,4,120,0,-","1944,1945,3,1:1,120,60,S","1944,1944,9,2,120,0,-","1945,1945,8,16,120,0,-","1977,1980,3,0:1,120,60,S","1977,1977,8,0,120,0,-","1978,1978,9,1,120,0,-","1979,1995,8,0,120,0,-","1981,9999,2,0,120,60,S","1996,9999,9,0,120,0,-"],"E-Eur":["1977,1980,3,0:1,0,60,S","1977,1977,8,0,0,0,-","1978,1978,9,1,0,0,-","1979,1995,8,0,0,0,-","1981,9999,2,0,0,60,S","1996,9999,9,0,0,0,-"],Russia:["1917,1917,6,1,1380,60,MST","1917,1917,11,28,0,0,MMT","1918,1918,4,31,1320,120,MDST","1918,1918,8,16,60,60,MST","1919,1919,4,31,1380,120,MDST","1919,1919,6,1,120,60,S","1919,1919,7,16,0,0,-","1921,1921,1,14,1380,60,S","1921,1921,2,20,1380,120,M","1921,1921,8,1,0,60,S","1921,1921,9,1,0,0,-","1981,1984,3,1,0,60,S","1981,1983,9,1,0,0,-","1984,1991,8,0,120,0,-","1985,1991,2,0,120,60,S","1992,1992,2,-6,1380,60,S","1992,1992,8,-6,1380,0,-","1993,2010,2,0,120,60,S","1993,1995,8,0,120,0,-","1996,2010,9,0,120,0,-"],Albania:["1940,1940,5,16,0,60,S","1942,1942,10,2,180,0,-","1943,1943,2,29,120,60,S","1943,1943,3,10,180,0,-","1974,1974,4,4,0,60,S","1974,1974,9,2,0,0,-","1975,1975,4,1,0,60,S","1975,1975,9,2,0,0,-","1976,1976,4,2,0,60,S","1976,1976,9,3,0,0,-","1977,1977,4,8,0,60,S","1977,1977,9,2,0,0,-","1978,1978,4,6,0,60,S","1978,1978,9,1,0,0,-","1979,1979,4,5,0,60,S","1979,1979,8,30,0,0,-","1980,1980,4,3,0,60,S","1980,1980,9,4,0,0,-","1981,1981,3,26,0,60,S","1981,1981,8,27,0,0,-","1982,1982,4,2,0,60,S","1982,1982,9,3,0,0,-","1983,1983,3,18,0,60,S","1983,1983,9,1,0,0,-","1984,1984,3,1,0,60,S"],Austria:["1920,1920,3,5,120,60,S","1920,1920,8,13,120,0,-","1946,1946,3,14,120,60,S","1946,1948,9,0:1,120,0,-","1947,1947,3,6,120,60,S","1948,1948,3,18,120,60,S","1980,1980,3,6,0,60,S","1980,1980,8,28,0,0,-"],Belgium:["1918,1918,2,9,0,60,S","1918,1919,9,6:1,1380,0,-","1919,1919,2,1,1380,60,S","1920,1920,1,14,1380,60,S","1920,1920,9,23,1380,0,-","1921,1921,2,14,1380,60,S","1921,1921,9,25,1380,0,-","1922,1922,2,25,1380,60,S","1922,1927,9,6:1,1380,0,-","1923,1923,3,21,1380,60,S","1924,1924,2,29,1380,60,S","1925,1925,3,4,1380,60,S","1926,1926,3,17,1380,60,S","1927,1927,3,9,1380,60,S","1928,1928,3,14,1380,60,S","1928,1938,9,0:2,120,0,-","1929,1929,3,21,120,60,S","1930,1930,3,13,120,60,S","1931,1931,3,19,120,60,S","1932,1932,3,3,120,60,S","1933,1933,2,26,120,60,S","1934,1934,3,8,120,60,S","1935,1935,2,31,120,60,S","1936,1936,3,19,120,60,S","1937,1937,3,4,120,60,S","1938,1938,2,27,120,60,S","1939,1939,3,16,120,60,S","1939,1939,10,19,120,0,-","1940,1940,1,25,120,60,S","1944,1944,8,17,120,0,-","1945,1945,3,2,120,60,S","1945,1945,8,16,120,0,-","1946,1946,4,19,120,60,S","1946,1946,9,7,120,0,-"],Bulg:["1979,1979,2,31,1380,60,S","1979,1979,9,1,60,0,-","1980,1982,3,6:1,1380,60,S","1980,1980,8,29,60,0,-","1981,1981,8,27,120,0,-"],Czech:["1945,1945,3,8,120,60,S","1945,1945,10,18,120,0,-","1946,1946,4,6,120,60,S","1946,1949,9,0:1,120,0,-","1947,1947,3,20,120,60,S","1948,1948,3,18,120,60,S","1949,1949,3,9,120,60,S"],Denmark:["1916,1916,4,14,1380,60,S","1916,1916,8,30,1380,0,-","1940,1940,4,15,0,60,S","1945,1945,3,2,120,60,S","1945,1945,7,15,120,0,-","1946,1946,4,1,120,60,S","1946,1946,8,1,120,0,-","1947,1947,4,4,120,60,S","1947,1947,7,10,120,0,-","1948,1948,4,9,120,60,S","1948,1948,7,8,120,0,-"],Thule:["1991,1992,2,0,120,60,D","1991,1992,8,0,120,0,S","1993,2006,3,0:1,120,60,D","1993,2006,9,0,120,0,S","2007,9999,2,0:8,120,60,D","2007,9999,10,0:1,120,0,S"],Finland:["1942,1942,3,3,0,60,S","1942,1942,9,3,0,0,-","1981,1982,2,0,120,60,S","1981,1982,8,0,180,0,-"],France:["1916,1916,5,14,1380,60,S","1916,1919,9,0:1,1380,0,-","1917,1917,2,24,1380,60,S","1918,1918,2,9,1380,60,S","1919,1919,2,1,1380,60,S","1920,1920,1,14,1380,60,S","1920,1920,9,23,1380,0,-","1921,1921,2,14,1380,60,S","1921,1921,9,25,1380,0,-","1922,1922,2,25,1380,60,S","1922,1938,9,6:1,1380,0,-","1923,1923,4,26,1380,60,S","1924,1924,2,29,1380,60,S","1925,1925,3,4,1380,60,S","1926,1926,3,17,1380,60,S","1927,1927,3,9,1380,60,S","1928,1928,3,14,1380,60,S","1929,1929,3,20,1380,60,S","1930,1930,3,12,1380,60,S","1931,1931,3,18,1380,60,S","1932,1932,3,2,1380,60,S","1933,1933,2,25,1380,60,S","1934,1934,3,7,1380,60,S","1935,1935,2,30,1380,60,S","1936,1936,3,18,1380,60,S","1937,1937,3,3,1380,60,S","1938,1938,2,26,1380,60,S","1939,1939,3,15,1380,60,S","1939,1939,10,18,1380,0,-","1940,1940,1,25,120,60,S","1941,1941,4,5,0,120,M","1941,1941,9,6,0,60,S","1942,1942,2,9,0,120,M","1942,1942,10,2,180,60,S","1943,1943,2,29,120,120,M","1943,1943,9,4,180,60,S","1944,1944,3,3,120,120,M","1944,1944,9,8,60,60,S","1945,1945,3,2,120,120,M","1945,1945,8,16,180,0,-","1976,1976,2,28,60,60,S","1976,1976,8,26,60,0,-"],Germany:["1946,1946,3,14,120,60,S","1946,1946,9,7,120,0,-","1947,1949,9,0:1,120,0,-","1947,1947,3,6,180,60,S","1947,1947,4,11,120,120,M","1947,1947,5,29,180,60,S","1948,1948,3,18,120,60,S","1949,1949,3,10,120,60,S"],SovietZone:["1945,1945,4,24,120,120,M","1945,1945,8,24,180,60,S","1945,1945,10,18,120,0,-"],Greece:["1932,1932,6,7,0,60,S","1932,1932,8,1,0,0,-","1941,1941,3,7,0,60,S","1942,1942,10,2,180,0,-","1943,1943,2,30,0,60,S","1943,1943,9,4,0,0,-","1952,1952,6,1,0,60,S","1952,1952,10,2,0,0,-","1975,1975,3,12,0,60,S","1975,1975,10,26,0,0,-","1976,1976,3,11,120,60,S","1976,1976,9,10,120,0,-","1977,1978,3,0:1,120,60,S","1977,1977,8,26,120,0,-","1978,1978,8,24,240,0,-","1979,1979,3,1,540,60,S","1979,1979,8,29,120,0,-","1980,1980,3,1,0,60,S","1980,1980,8,28,0,0,-"],Hungary:["1918,1918,3,1,180,60,S","1918,1918,8,29,180,0,-","1919,1919,3,15,180,60,S","1919,1919,8,15,180,0,-","1920,1920,3,5,180,60,S","1920,1920,8,30,180,0,-","1945,1945,4,1,1380,60,S","1945,1945,10,3,0,0,-","1946,1946,2,31,120,60,S","1946,1949,9,0:1,120,0,-","1947,1949,3,0:4,120,60,S","1950,1950,3,17,120,60,S","1950,1950,9,23,120,0,-","1954,1955,4,23,0,60,S","1954,1955,9,3,0,0,-","1956,1956,5,0:1,0,60,S","1956,1956,8,0,0,0,-","1957,1957,5,0:1,60,60,S","1957,1957,8,0,180,0,-","1980,1980,3,6,60,60,S"],Iceland:["1917,1918,1,19,1380,60,S","1917,1917,9,21,60,0,-","1918,1918,10,16,60,0,-","1939,1939,3,29,1380,60,S","1939,1939,10,29,120,0,-","1940,1940,1,25,120,60,S","1940,1940,10,3,120,0,-","1941,1941,2,2,60,60,S","1941,1941,10,2,60,0,-","1942,1942,2,8,60,60,S","1942,1942,9,25,60,0,-","1943,1946,2,0:1,60,60,S","1943,1948,9,0:22,60,0,-","1947,1967,3,0:1,60,60,S","1949,1949,9,30,60,0,-","1950,1966,9,0:22,60,0,-","1967,1967,9,29,60,0,-"],Italy:["1916,1916,5,3,0,60,S","1916,1916,9,1,0,0,-","1917,1917,3,1,0,60,S","1917,1917,8,30,0,0,-","1918,1918,2,10,0,60,S","1918,1919,9,0:1,0,0,-","1919,1919,2,2,0,60,S","1920,1920,2,21,0,60,S","1920,1920,8,19,0,0,-","1940,1940,5,15,0,60,S","1944,1944,8,17,0,0,-","1945,1945,3,2,120,60,S","1945,1945,8,15,0,0,-","1946,1946,2,17,120,60,S","1946,1946,9,6,120,0,-","1947,1947,2,16,0,60,S","1947,1947,9,5,0,0,-","1948,1948,1,29,120,60,S","1948,1948,9,3,120,0,-","1966,1968,4,0:22,0,60,S","1966,1969,8,0:22,0,0,-","1969,1969,5,1,0,60,S","1970,1970,4,31,0,60,S","1970,1970,8,0,0,0,-","1971,1972,4,0:22,0,60,S","1971,1971,8,0,60,0,-","1972,1972,9,1,0,0,-","1973,1973,5,3,0,60,S","1973,1974,8,0,0,0,-","1974,1974,4,26,0,60,S","1975,1975,5,1,0,60,S","1975,1977,8,0,0,0,-","1976,1976,4,30,0,60,S","1977,1979,4,0:22,0,60,S","1978,1978,9,1,0,0,-","1979,1979,8,30,0,0,-"],Latvia:["1989,1996,2,0,120,60,S","1989,1996,8,0,120,0,-"],Lux:["1916,1916,4,14,1380,60,S","1916,1916,9,1,60,0,-","1917,1917,3,28,1380,60,S","1917,1917,8,17,60,0,-","1918,1918,3,1:15,120,60,S","1918,1918,8,1:15,120,0,-","1919,1919,2,1,1380,60,S","1919,1919,9,5,180,0,-","1920,1920,1,14,1380,60,S","1920,1920,9,24,120,0,-","1921,1921,2,14,1380,60,S","1921,1921,9,26,120,0,-","1922,1922,2,25,1380,60,S","1922,1922,9,0:2,60,0,-","1923,1923,3,21,1380,60,S","1923,1923,9,0:2,120,0,-","1924,1924,2,29,1380,60,S","1924,1928,9,0:2,60,0,-","1925,1925,3,5,1380,60,S","1926,1926,3,17,1380,60,S","1927,1927,3,9,1380,60,S","1928,1928,3,14,1380,60,S","1929,1929,3,20,1380,60,S"],Malta:["1973,1973,2,31,0,60,S","1973,1973,8,29,0,0,-","1974,1974,3,21,0,60,S","1974,1974,8,16,0,0,-","1975,1979,3,0:15,120,60,S","1975,1980,8,0:15,120,0,-","1980,1980,2,31,120,60,S"],Neth:["1916,1916,4,1,0,60,NST","1916,1916,9,1,0,0,AMT","1917,1917,3,16,120,60,NST","1917,1917,8,17,120,0,AMT","1918,1921,3,1:1,120,60,NST","1918,1921,8,-1,120,0,AMT","1922,1922,2,0,120,60,NST","1922,1936,9,0:2,120,0,AMT","1923,1923,5,5:1,120,60,NST","1924,1924,2,0,120,60,NST","1925,1925,5,5:1,120,60,NST","1926,1931,4,15,120,60,NST","1932,1932,4,22,120,60,NST","1933,1936,4,15,120,60,NST","1937,1937,4,22,120,60,NST","1937,1937,6,1,0,60,S","1937,1939,9,0:2,120,0,-","1938,1939,4,15,120,60,S","1945,1945,3,2,120,60,S","1945,1945,8,16,120,0,-"],Norway:["1916,1916,4,22,60,60,S","1916,1916,8,30,0,0,-","1945,1945,3,2,120,60,S","1945,1945,9,1,120,0,-","1959,1964,2,0:15,120,60,S","1959,1965,8,0:15,120,0,-","1965,1965,3,25,120,60,S"],Poland:["1918,1919,8,16,120,0,-","1919,1919,3,15,120,60,S","1944,1944,3,3,120,60,S","1944,1944,9,4,120,0,-","1945,1945,3,29,0,60,S","1945,1945,10,1,0,0,-","1946,1946,3,14,0,60,S","1946,1946,9,7,120,0,-","1947,1947,4,4,120,60,S","1947,1949,9,0:1,120,0,-","1948,1948,3,18,120,60,S","1949,1949,3,10,120,60,S","1957,1957,5,2,60,60,S","1957,1958,8,0,60,0,-","1958,1958,2,30,60,60,S","1959,1959,4,31,60,60,S","1959,1961,9,0:1,60,0,-","1960,1960,3,3,60,60,S","1961,1964,4,0,60,60,S","1962,1964,8,0,60,0,-"],Port:["1916,1916,5,17,1380,60,S","1916,1916,10,1,60,0,-","1917,1917,1,28,1380,60,S","1917,1921,9,14,1380,0,-","1918,1918,2,1,1380,60,S","1919,1919,1,28,1380,60,S","1920,1920,1,29,1380,60,S","1921,1921,1,28,1380,60,S","1924,1924,3,16,1380,60,S","1924,1924,9,14,1380,0,-","1926,1926,3,17,1380,60,S","1926,1929,9,6:1,1380,0,-","1927,1927,3,9,1380,60,S","1928,1928,3,14,1380,60,S","1929,1929,3,20,1380,60,S","1931,1931,3,18,1380,60,S","1931,1932,9,6:1,1380,0,-","1932,1932,3,2,1380,60,S","1934,1934,3,7,1380,60,S","1934,1938,9,6:1,1380,0,-","1935,1935,2,30,1380,60,S","1936,1936,3,18,1380,60,S","1937,1937,3,3,1380,60,S","1938,1938,2,26,1380,60,S","1939,1939,3,15,1380,60,S","1939,1939,10,18,1380,0,-","1940,1940,1,24,1380,60,S","1940,1941,9,5,1380,0,-","1941,1941,3,5,1380,60,S","1942,1945,2,6:8,1380,60,S","1942,1942,3,25,1320,120,M","1942,1942,7,15,1320,60,S","1942,1945,9,6:24,1380,0,-","1943,1943,3,17,1320,120,M","1943,1945,7,6:25,1320,60,S","1944,1945,3,6:21,1320,120,M","1946,1946,3,6:1,1380,60,S","1946,1946,9,6:1,1380,0,-","1947,1949,3,0:1,120,60,S","1947,1949,9,0:1,120,0,-","1951,1965,3,0:1,120,60,S","1951,1965,9,0:1,120,0,-","1977,1977,2,27,0,60,S","1977,1977,8,25,0,0,-","1978,1979,3,0:1,0,60,S","1978,1978,9,1,0,0,-","1979,1982,8,0,60,0,-","1980,1980,2,0,0,60,S","1981,1982,2,0,60,60,S","1983,1983,2,0,120,60,S"],Romania:["1932,1932,4,21,0,60,S","1932,1939,9,0:1,0,0,-","1933,1939,3,0:2,0,60,S","1979,1979,4,27,0,60,S","1979,1979,8,0,0,0,-","1980,1980,3,5,1380,60,S","1980,1980,8,0,60,0,-","1991,1993,2,0,0,60,S","1991,1993,8,0,0,0,-"],Spain:["1917,1917,4,5,1380,60,S","1917,1919,9,6,1380,0,-","1918,1918,3,15,1380,60,S","1919,1919,3,5,1380,60,S","1924,1924,3,16,1380,60,S","1924,1924,9,4,1380,0,-","1926,1926,3,17,1380,60,S","1926,1929,9,6:1,1380,0,-","1927,1927,3,9,1380,60,S","1928,1928,3,14,1380,60,S","1929,1929,3,20,1380,60,S","1937,1937,4,22,1380,60,S","1937,1939,9,6:1,1380,0,-","1938,1938,2,22,1380,60,S","1939,1939,3,15,1380,60,S","1940,1940,2,16,1380,60,S","1942,1942,4,2,1320,120,M","1942,1942,8,1,1320,60,S","1943,1946,3,6:13,1320,120,M","1943,1943,9,3,1320,60,S","1944,1944,9,10,1320,60,S","1945,1945,8,30,60,60,S","1946,1946,8,30,0,0,-","1949,1949,3,30,1380,60,S","1949,1949,8,30,60,0,-","1974,1975,3,6:13,1380,60,S","1974,1975,9,0:1,60,0,-","1976,1976,2,27,1380,60,S","1976,1977,8,0,60,0,-","1977,1978,3,2,1380,60,S","1978,1978,9,1,60,0,-"],SpainAfrica:["1967,1967,5,3,720,60,S","1967,1967,9,1,0,0,-","1974,1974,5,24,0,60,S","1974,1974,8,1,0,0,-","1976,1977,4,1,0,60,S","1976,1976,7,1,0,0,-","1977,1977,8,28,0,0,-","1978,1978,5,1,0,60,S","1978,1978,7,4,0,0,-"],Swiss:["1941,1942,4,1:1,60,60,S","1941,1942,9,1:1,120,0,-"],Turkey:["1916,1916,4,1,0,60,S","1916,1916,9,1,0,0,-","1920,1920,2,28,0,60,S","1920,1920,9,25,0,0,-","1921,1921,3,3,0,60,S","1921,1921,9,3,0,0,-","1922,1922,2,26,0,60,S","1922,1922,9,8,0,0,-","1924,1924,4,13,0,60,S","1924,1925,9,1,0,0,-","1925,1925,4,1,0,60,S","1940,1940,5,30,0,60,S","1940,1940,9,5,0,0,-","1940,1940,11,1,0,60,S","1941,1941,8,21,0,0,-","1942,1942,3,1,0,60,S","1942,1942,10,1,0,0,-","1945,1945,3,2,0,60,S","1945,1945,9,8,0,0,-","1946,1946,5,1,0,60,S","1946,1946,9,1,0,0,-","1947,1948,3,0:16,0,60,S","1947,1950,9,0:2,0,0,-","1949,1949,3,10,0,60,S","1950,1950,3,19,0,60,S","1951,1951,3,22,0,60,S","1951,1951,9,8,0,0,-","1962,1962,6,15,0,60,S","1962,1962,9,8,0,0,-","1964,1964,4,15,0,60,S","1964,1964,9,1,0,0,-","1970,1972,4,0:2,0,60,S","1970,1972,9,0:2,0,0,-","1973,1973,5,3,60,60,S","1973,1973,10,4,180,0,-","1974,1974,2,31,120,60,S","1974,1974,10,3,300,0,-","1975,1975,2,30,0,60,S","1975,1976,9,0,0,0,-","1976,1976,5,1,0,60,S","1977,1978,3,0:1,0,60,S","1977,1977,9,16,0,0,-","1979,1980,3,0:1,180,60,S","1979,1982,9,1:11,0,0,-","1981,1982,2,0,180,60,S","1983,1983,6,31,0,60,S","1983,1983,9,2,0,0,-","1985,1985,3,20,0,60,S","1985,1985,8,28,0,0,-","1986,1990,2,0,120,60,S","1986,1990,8,0,120,0,-","1991,2006,2,0,60,60,S","1991,1995,8,0,60,0,-","1996,2006,9,0,60,0,-"]},zones:{"Europe/London":["1,-,LMT,1847,Dec,1,0:00s","0,GB-Eire,%s,1968,Oct,27","60,-,BST,1971,Oct,31,2:00u","0,GB-Eire,%s,1996","0,EU,GMT/BST"],"Europe/Dublin":["25,-,LMT,1880,Aug,2","25,-,DMT,1916,May,21,2:00","25,1:00,IST,1916,Oct,1,2:00s","0,GB-Eire,%s,1921,Dec,6,","0,GB-Eire,GMT/IST,1940,Feb,25,2:00","0,1:00,IST,1946,Oct,6,2:00","0,-,GMT,1947,Mar,16,2:00","0,1:00,IST,1947,Nov,2,2:00","0,-,GMT,1948,Apr,18,2:00","0,GB-Eire,GMT/IST,1968,Oct,27","60,-,IST,1971,Oct,31,2:00u","0,GB-Eire,GMT/IST,1996","0,EU,GMT/IST"],WET:["0,EU,WE%sT"],CET:["60,C-Eur,CE%sT"],MET:["60,C-Eur,ME%sT"],EET:["120,EU,EE%sT"],"Europe/Tirane":["79,-,LMT,1914","60,-,CET,1940,Jun,16","60,Albania,CE%sT,1984,Jul","60,EU,CE%sT"],"Europe/Andorra":["6,-,LMT,1901","0,-,WET,1946,Sep,30","60,-,CET,1985,Mar,31,2:00","60,EU,CE%sT"],"Europe/Vienna":["65,-,LMT,1893,Apr","60,C-Eur,CE%sT,1920","60,Austria,CE%sT,1940,Apr,1,2:00s","60,C-Eur,CE%sT,1945,Apr,2,2:00s","60,1:00,CEST,1945,Apr,12,2:00s","60,-,CET,1946","60,Austria,CE%sT,1981","60,EU,CE%sT"],"Europe/Minsk":["110,-,LMT,1880","110,-,MMT,1924,May,2,","120,-,EET,1930,Jun,21","180,-,MSK,1941,Jun,28","60,C-Eur,CE%sT,1944,Jul,3","180,Russia,MSK/MSD,1990","180,-,MSK,1991,Mar,31,2:00s","120,1:00,EEST,1991,Sep,29,2:00s","120,-,EET,1992,Mar,29,0:00s","120,1:00,EEST,1992,Sep,27,0:00s","120,Russia,EE%sT,2011,Mar,27,2:00s","180,-,FET,"],"Europe/Brussels":["17,-,LMT,1880","17,-,BMT,1892,May,1,12:00,","0,-,WET,1914,Nov,8","60,-,CET,1916,May,1,0:00","60,C-Eur,CE%sT,1918,Nov,11,11:00u","0,Belgium,WE%sT,1940,May,20,2:00s","60,C-Eur,CE%sT,1944,Sep,3","60,Belgium,CE%sT,1977","60,EU,CE%sT"],"Europe/Sofia":["93,-,LMT,1880","116,-,IMT,1894,Nov,30,","120,-,EET,1942,Nov,2,3:00","60,C-Eur,CE%sT,1945","60,-,CET,1945,Apr,2,3:00","120,-,EET,1979,Mar,31,23:00","120,Bulg,EE%sT,1982,Sep,26,2:00","120,C-Eur,EE%sT,1991","120,E-Eur,EE%sT,1997","120,EU,EE%sT"],"Europe/Prague":["57,-,LMT,1850","57,-,PMT,1891,Oct,","60,C-Eur,CE%sT,1944,Sep,17,2:00s","60,Czech,CE%sT,1979","60,EU,CE%sT"],"Europe/Copenhagen":["50,-,LMT,1890","50,-,CMT,1894,Jan,1,","60,Denmark,CE%sT,1942,Nov,2,2:00s","60,C-Eur,CE%sT,1945,Apr,2,2:00","60,Denmark,CE%sT,1980","60,EU,CE%sT"],"Atlantic/Faroe":["27,-,LMT,1908,Jan,11,","0,-,WET,1981","0,EU,WE%sT"],"America/Danmarkshavn":["-46,-,LMT,1916,Jul,28","-180,-,WGT,1980,Apr,6,2:00","-180,EU,WG%sT,1996","0,-,GMT"],"America/Scoresbysund":["-33,-,LMT,1916,Jul,28,","-120,-,CGT,1980,Apr,6,2:00","-120,C-Eur,CG%sT,1981,Mar,29","-60,EU,EG%sT"],"America/Godthab":["-154,-,LMT,1916,Jul,28,","-180,-,WGT,1980,Apr,6,2:00","-180,EU,WG%sT"],"America/Thule":["-205,-,LMT,1916,Jul,28,","-240,Thule,A%sT"],"Europe/Tallinn":["99,-,LMT,1880","99,-,TMT,1918,Feb,","60,C-Eur,CE%sT,1919,Jul","99,-,TMT,1921,May","120,-,EET,1940,Aug,6","180,-,MSK,1941,Sep,15","60,C-Eur,CE%sT,1944,Sep,22","180,Russia,MSK/MSD,1989,Mar,26,2:00s","120,1:00,EEST,1989,Sep,24,2:00s","120,C-Eur,EE%sT,1998,Sep,22","120,EU,EE%sT,1999,Nov,1","120,-,EET,2002,Feb,21","120,EU,EE%sT"],"Europe/Helsinki":["99,-,LMT,1878,May,31","99,-,HMT,1921,May,","120,Finland,EE%sT,1983","120,EU,EE%sT"],"Europe/Paris":["9,-,LMT,1891,Mar,15,0:01","9,-,PMT,1911,Mar,11,0:01,","0,France,WE%sT,1940,Jun,14,23:00","60,C-Eur,CE%sT,1944,Aug,25","0,France,WE%sT,1945,Sep,16,3:00","60,France,CE%sT,1977","60,EU,CE%sT"],"Europe/Berlin":["53,-,LMT,1893,Apr","60,C-Eur,CE%sT,1945,May,24,2:00","60,SovietZone,CE%sT,1946","60,Germany,CE%sT,1980","60,EU,CE%sT"],"Europe/Gibraltar":["21,-,LMT,1880,Aug,2,0:00s","0,GB-Eire,%s,1957,Apr,14,2:00","60,-,CET,1982","60,EU,CE%sT"],"Europe/Athens":["94,-,LMT,1895,Sep,14","94,-,AMT,1916,Jul,28,0:01,","120,Greece,EE%sT,1941,Apr,30","60,Greece,CE%sT,1944,Apr,4","120,Greece,EE%sT,1981","0","0","120,EU,EE%sT"],"Europe/Budapest":["76,-,LMT,1890,Oct","60,C-Eur,CE%sT,1918","60,Hungary,CE%sT,1941,Apr,6,2:00","60,C-Eur,CE%sT,1945","60,Hungary,CE%sT,1980,Sep,28,2:00s","60,EU,CE%sT"],"Atlantic/Reykjavik":["-33,-,LMT,1837","-33,-,RMT,1908,","-60,Iceland,IS%sT,1968,Apr,7,1:00s","0,-,GMT"],"Europe/Rome":["49,-,LMT,1866,Sep,22","49,-,RMT,1893,Nov,1,0:00s,","60,Italy,CE%sT,1942,Nov,2,2:00s","60,C-Eur,CE%sT,1944,Jul","60,Italy,CE%sT,1980","60,EU,CE%sT"],"Europe/Riga":["96,-,LMT,1880","96,-,RMT,1918,Apr,15,2:00,","96,1:00,LST,1918,Sep,16,3:00,","96,-,RMT,1919,Apr,1,2:00","96,1:00,LST,1919,May,22,3:00","96,-,RMT,1926,May,11","120,-,EET,1940,Aug,5","180,-,MSK,1941,Jul","60,C-Eur,CE%sT,1944,Oct,13","180,Russia,MSK/MSD,1989,Mar,lastSun,2:00s","120,1:00,EEST,1989,Sep,lastSun,2:00s","120,Latvia,EE%sT,1997,Jan,21","120,EU,EE%sT,2000,Feb,29","120,-,EET,2001,Jan,2","120,EU,EE%sT"],"Europe/Vaduz":["38,-,LMT,1894,Jun","60,-,CET,1981","60,EU,CE%sT"],"Europe/Vilnius":["101,-,LMT,1880","84,-,WMT,1917,","95,-,KMT,1919,Oct,10,","60,-,CET,1920,Jul,12","120,-,EET,1920,Oct,9","60,-,CET,1940,Aug,3","180,-,MSK,1941,Jun,24","60,C-Eur,CE%sT,1944,Aug","180,Russia,MSK/MSD,1991,Mar,31,2:00s","120,1:00,EEST,1991,Sep,29,2:00s","120,C-Eur,EE%sT,1998","120,-,EET,1998,Mar,29,1:00u","60,EU,CE%sT,1999,Oct,31,1:00u","120,-,EET,2003,Jan,1","120,EU,EE%sT"],"Europe/Luxembourg":["24,-,LMT,1904,Jun","60,Lux,CE%sT,1918,Nov,25","0,Lux,WE%sT,1929,Oct,6,2:00s","0,Belgium,WE%sT,1940,May,14,3:00","60,C-Eur,WE%sT,1944,Sep,18,3:00","60,Belgium,CE%sT,1977","60,EU,CE%sT"],"Europe/Malta":["58,-,LMT,1893,Nov,2,0:00s,","60,Italy,CE%sT,1942,Nov,2,2:00s","60,C-Eur,CE%sT,1945,Apr,2,2:00s","60,Italy,CE%sT,1973,Mar,31","60,Malta,CE%sT,1981","60,EU,CE%sT"],"Europe/Chisinau":["115,-,LMT,1880","115,-,CMT,1918,Feb,15,","104,-,BMT,1931,Jul,24,","120,Romania,EE%sT,1940,Aug,15","120,1:00,EEST,1941,Jul,17","60,C-Eur,CE%sT,1944,Aug,24","180,Russia,MSK/MSD,1990","180,-,MSK,1990,May,6","120,-,EET,1991","120,Russia,EE%sT,1992","120,E-Eur,EE%sT,1997","120,EU,EE%sT"],"Europe/Monaco":["29,-,LMT,1891,Mar,15","9,-,PMT,1911,Mar,11,","0,France,WE%sT,1945,Sep,16,3:00","60,France,CE%sT,1977","60,EU,CE%sT"],"Europe/Amsterdam":["19,-,LMT,1835","19,Neth,%s,1937,Jul,1","20,Neth,NE%sT,1940,May,16,0:00,","60,C-Eur,CE%sT,1945,Apr,2,2:00","60,Neth,CE%sT,1977","60,EU,CE%sT"],"Europe/Oslo":["43,-,LMT,1895,Jan,1","60,Norway,CE%sT,1940,Aug,10,23:00","60,C-Eur,CE%sT,1945,Apr,2,2:00","60,Norway,CE%sT,1980","60,EU,CE%sT"],"Europe/Warsaw":["84,-,LMT,1880","84,-,WMT,1915,Aug,5,","60,C-Eur,CE%sT,1918,Sep,16,3:00","120,Poland,EE%sT,1922,Jun","60,Poland,CE%sT,1940,Jun,23,2:00","60,C-Eur,CE%sT,1944,Oct","60,Poland,CE%sT,1977","60,W-Eur,CE%sT,1988","60,EU,CE%sT"],"Europe/Lisbon":["36,-,LMT,1884","36,-,LMT,1912,Jan,1,","0,Port,WE%sT,1966,Apr,3,2:00","60,-,CET,1976,Sep,26,1:00","0,Port,WE%sT,1983,Sep,25,1:00s","0,W-Eur,WE%sT,1992,Sep,27,1:00s","60,EU,CE%sT,1996,Mar,31,1:00u","0,EU,WE%sT"],"Atlantic/Azores":["-18,-,LMT,1884,","-6,-,HMT,1911,May,24,","-120,Port,AZO%sT,1966,Apr,3,2:00,","-60,Port,AZO%sT,1983,Sep,25,1:00s","-60,W-Eur,AZO%sT,1992,Sep,27,1:00s","0,EU,WE%sT,1993,Mar,28,1:00u","-60,EU,AZO%sT"],"Atlantic/Madeira":["-53,-,LMT,1884,","-53,-,FMT,1911,May,24,","-60,Port,MAD%sT,1966,Apr,3,2:00,","0,Port,WE%sT,1983,Sep,25,1:00s","0,EU,WE%sT"],"Europe/Bucharest":["104,-,LMT,1891,Oct","104,-,BMT,1931,Jul,24,","120,Romania,EE%sT,1981,Mar,29,2:00s","120,C-Eur,EE%sT,1991","120,Romania,EE%sT,1994","120,E-Eur,EE%sT,1997","120,EU,EE%sT"],"Europe/Kaliningrad":["82,-,LMT,1893,Apr","60,C-Eur,CE%sT,1945","120,Poland,CE%sT,1946","180,Russia,MSK/MSD,1991,Mar,31,2:00s","120,Russia,EE%sT,2011,Mar,27,2:00s","180,-,FET,"],"Europe/Moscow":["150,-,LMT,1880","150,-,MMT,1916,Jul,3,","150,Russia,%s,1919,Jul,1,2:00","180,Russia,MSK/MSD,1922,Oct","120,-,EET,1930,Jun,21","180,Russia,MSK/MSD,1991,Mar,31,2:00s","120,Russia,EE%sT,1992,Jan,19,2:00s","180,Russia,MSK/MSD,2011,Mar,27,2:00s","240,-,MSK"],"Europe/Volgograd":["177,-,LMT,1920,Jan,3","180,-,TSAT,1925,Apr,6,","180,-,STAT,1930,Jun,21,","240,-,STAT,1961,Nov,11","240,Russia,VOL%sT,1989,Mar,26,2:00s,","180,Russia,VOL%sT,1991,Mar,31,2:00s","240,-,VOLT,1992,Mar,29,2:00s","180,Russia,VOL%sT,2011,Mar,27,2:00s","240,-,VOLT"],"Europe/Samara":["200,-,LMT,1919,Jul,1,2:00","180,-,SAMT,1930,Jun,21","240,-,SAMT,1935,Jan,27","240,Russia,KUY%sT,1989,Mar,26,2:00s,","180,Russia,KUY%sT,1991,Mar,31,2:00s","120,Russia,KUY%sT,1991,Sep,29,2:00s","180,-,KUYT,1991,Oct,20,3:00","240,Russia,SAM%sT,2010,Mar,28,2:00s,","180,Russia,SAM%sT,2011,Mar,27,2:00s","240,-,SAMT"],"Asia/Yekaterinburg":["242,-,LMT,1919,Jul,15,4:00","240,-,SVET,1930,Jun,21,","300,Russia,SVE%sT,1991,Mar,31,2:00s","240,Russia,SVE%sT,1992,Jan,19,2:00s","300,Russia,YEK%sT,2011,Mar,27,2:00s","360,-,YEKT,"],"Asia/Omsk":["293,-,LMT,1919,Nov,14","300,-,OMST,1930,Jun,21,","360,Russia,OMS%sT,1991,Mar,31,2:00s","300,Russia,OMS%sT,1992,Jan,19,2:00s","360,Russia,OMS%sT,2011,Mar,27,2:00s","420,-,OMST"],"Asia/Novosibirsk":["331,-,LMT,1919,Dec,14,6:00","360,-,NOVT,1930,Jun,21,","420,Russia,NOV%sT,1991,Mar,31,2:00s","360,Russia,NOV%sT,1992,Jan,19,2:00s","420,Russia,NOV%sT,1993,May,23,","360,Russia,NOV%sT,2011,Mar,27,2:00s","420,-,NOVT"],"Asia/Novokuznetsk":["348,-,NMT,1920,Jan,6","360,-,KRAT,1930,Jun,21,","420,Russia,KRA%sT,1991,Mar,31,2:00s","360,Russia,KRA%sT,1992,Jan,19,2:00s","420,Russia,KRA%sT,2010,Mar,28,2:00s","360,Russia,NOV%sT,2011,Mar,27,2:00s","420,-,NOVT,"],"Asia/Krasnoyarsk":["371,-,LMT,1920,Jan,6","360,-,KRAT,1930,Jun,21,","420,Russia,KRA%sT,1991,Mar,31,2:00s","360,Russia,KRA%sT,1992,Jan,19,2:00s","420,Russia,KRA%sT,2011,Mar,27,2:00s","480,-,KRAT"],"Asia/Irkutsk":["417,-,LMT,1880","417,-,IMT,1920,Jan,25,","420,-,IRKT,1930,Jun,21,","480,Russia,IRK%sT,1991,Mar,31,2:00s","420,Russia,IRK%sT,1992,Jan,19,2:00s","480,Russia,IRK%sT,2011,Mar,27,2:00s","540,-,IRKT"],"Asia/Yakutsk":["518,-,LMT,1919,Dec,15","480,-,YAKT,1930,Jun,21,","540,Russia,YAK%sT,1991,Mar,31,2:00s","480,Russia,YAK%sT,1992,Jan,19,2:00s","540,Russia,YAK%sT,2011,Mar,27,2:00s","600,-,YAKT"],"Asia/Vladivostok":["527,-,LMT,1922,Nov,15","540,-,VLAT,1930,Jun,21,","600,Russia,VLA%sT,1991,Mar,31,2:00s","540,Russia,VLA%sST,1992,Jan,19,2:00s","600,Russia,VLA%sT,2011,Mar,27,2:00s","660,-,VLAT"],"Asia/Sakhalin":["570,-,LMT,1905,Aug,23","540,-,CJT,1938","540,-,JST,1945,Aug,25","660,Russia,SAK%sT,1991,Mar,31,2:00s,","600,Russia,SAK%sT,1992,Jan,19,2:00s","660,Russia,SAK%sT,1997,Mar,lastSun,2:00s","600,Russia,SAK%sT,2011,Mar,27,2:00s","660,-,SAKT"],"Asia/Magadan":["603,-,LMT,1924,May,2","600,-,MAGT,1930,Jun,21,","660,Russia,MAG%sT,1991,Mar,31,2:00s","600,Russia,MAG%sT,1992,Jan,19,2:00s","660,Russia,MAG%sT,2011,Mar,27,2:00s","720,-,MAGT"],"Asia/Kamchatka":["634,-,LMT,1922,Nov,10","660,-,PETT,1930,Jun,21,","720,Russia,PET%sT,1991,Mar,31,2:00s","660,Russia,PET%sT,1992,Jan,19,2:00s","720,Russia,PET%sT,2010,Mar,28,2:00s","660,Russia,PET%sT,2011,Mar,27,2:00s","720,-,PETT"],"Asia/Anadyr":["709,-,LMT,1924,May,2","720,-,ANAT,1930,Jun,21,","780,Russia,ANA%sT,1982,Apr,1,0:00s","720,Russia,ANA%sT,1991,Mar,31,2:00s","660,Russia,ANA%sT,1992,Jan,19,2:00s","720,Russia,ANA%sT,2010,Mar,28,2:00s","660,Russia,ANA%sT,2011,Mar,27,2:00s","720,-,ANAT"],"Europe/Belgrade":["82,-,LMT,1884","60,-,CET,1941,Apr,18,23:00","60,C-Eur,CE%sT,1945","60,-,CET,1945,May,8,2:00s","60,1:00,CEST,1945,Sep,16,2:00s","60,-,CET,1982,Nov,27","60,EU,CE%sT"],"Europe/Madrid":["14,-,LMT,1901,Jan,1,0:00s","0,Spain,WE%sT,1946,Sep,30","60,Spain,CE%sT,1979","60,EU,CE%sT"],"Africa/Ceuta":["21,-,LMT,1901","0,-,WET,1918,May,6,23:00","0,1:00,WEST,1918,Oct,7,23:00","0,-,WET,1924","0,Spain,WE%sT,1929","0,SpainAfrica,WE%sT,1984,Mar,16","60,-,CET,1986","60,EU,CE%sT"],"Atlantic/Canary":["-59,-,LMT,1922,Mar,","-60,-,CANT,1946,Sep,30,1:00,","0,-,WET,1980,Apr,6,0:00s","0,1:00,WEST,1980,Sep,28,0:00s","0,EU,WE%sT"],"Europe/Stockholm":["72,-,LMT,1879,Jan,1","60,-,SET,1900,Jan,1,","60,-,CET,1916,May,14,23:00","60,1:00,CEST,1916,Oct,1,01:00","60,-,CET,1980","60,EU,CE%sT"],"Europe/Zurich":["34,-,LMT,1848,Sep,12","29,-,BMT,1894,Jun,","60,Swiss,CE%sT,1981","60,EU,CE%sT"],"Europe/Istanbul":["115,-,LMT,1880","116,-,IMT,1910,Oct,","120,Turkey,EE%sT,1978,Oct,15","180,Turkey,TR%sT,1985,Apr,20,","120,Turkey,EE%sT,2007","120,EU,EE%sT,2011,Mar,27,1:00u","120,-,EET,2011,Mar,28,1:00u","120,EU,EE%sT"],"Europe/Kiev":["122,-,LMT,1880","122,-,KMT,1924,May,2,","120,-,EET,1930,Jun,21","180,-,MSK,1941,Sep,20","60,C-Eur,CE%sT,1943,Nov,6","180,Russia,MSK/MSD,1990","180,-,MSK,1990,Jul,1,2:00","120,-,EET,1992","120,E-Eur,EE%sT,1995","120,EU,EE%sT"],"Europe/Uzhgorod":["89,-,LMT,1890,Oct","60,-,CET,1940","60,C-Eur,CE%sT,1944,Oct","60,1:00,CEST,1944,Oct,26","60,-,CET,1945,Jun,29","180,Russia,MSK/MSD,1990","180,-,MSK,1990,Jul,1,2:00","60,-,CET,1991,Mar,31,3:00","120,-,EET,1992","120,E-Eur,EE%sT,1995","120,EU,EE%sT"],"Europe/Zaporozhye":["140,-,LMT,1880","140,-,CUT,1924,May,2,","120,-,EET,1930,Jun,21","180,-,MSK,1941,Aug,25","60,C-Eur,CE%sT,1943,Oct,25","180,Russia,MSK/MSD,1991,Mar,31,2:00","120,E-Eur,EE%sT,1995","120,EU,EE%sT"],"Europe/Simferopol":["136,-,LMT,1880","136,-,SMT,1924,May,2,","120,-,EET,1930,Jun,21","180,-,MSK,1941,Nov","60,C-Eur,CE%sT,1944,Apr,13","180,Russia,MSK/MSD,1990","180,-,MSK,1990,Jul,1,2:00","120,-,EET,1992","120,E-Eur,EE%sT,1994,May","180,E-Eur,MSK/MSD,1996,Mar,31,3:00s","180,1:00,MSD,1996,Oct,27,3:00s","180,Russia,MSK/MSD,1997","180,-,MSK,1997,Mar,lastSun,1:00u","120,EU,EE%sT"]},lastZone:"Europe/Simferopol"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{US:["1918,1919,2,0,120,60,D","1918,1919,9,0,120,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,30,120,0,S","1967,2006,9,0,120,0,S","1967,1973,3,0,120,60,D","1974,1974,0,6,120,60,D","1975,1975,1,23,120,60,D","1976,1986,3,0,120,60,D","1987,2006,3,0:1,120,60,D","2007,9999,2,0:8,120,60,D","2007,9999,10,0:1,120,0,S"],NYC:["1920,1920,2,0,120,60,D","1920,1920,9,0,120,0,S","1921,1966,3,0,120,60,D","1921,1954,8,0,120,0,S","1955,1966,9,0,120,0,S"],Chicago:["1920,1920,5,13,120,60,D","1920,1921,9,0,120,0,S","1921,1921,2,0,120,60,D","1922,1966,3,0,120,60,D","1922,1954,8,0,120,0,S","1955,1966,9,0,120,0,S"],Denver:["1920,1921,2,0,120,60,D","1920,1920,9,0,120,0,S","1921,1921,4,22,120,0,S","1965,1966,3,0,120,60,D","1965,1966,9,0,120,0,S"],CA:["1948,1948,2,14,120,60,D","1949,1949,0,1,120,0,S","1950,1966,3,0,120,60,D","1950,1961,8,0,120,0,S","1962,1966,9,0,120,0,S"],Indianapolis:["1941,1941,5,22,120,60,D","1941,1954,8,0,120,0,S","1946,1954,3,0,120,60,D"],Marengo:["1951,1951,3,0,120,60,D","1951,1951,8,0,120,0,S","1954,1960,3,0,120,60,D","1954,1960,8,0,120,0,S"],Vincennes:["1946,1946,3,0,120,60,D","1946,1946,8,0,120,0,S","1953,1954,3,0,120,60,D","1953,1959,8,0,120,0,S","1955,1955,4,1,0,60,D","1956,1963,3,0,120,60,D","1960,1960,9,0,120,0,S","1961,1961,8,0,120,0,S","1962,1963,9,0,120,0,S"],Perry:["1946,1946,3,0,120,60,D","1946,1946,8,0,120,0,S","1953,1954,3,0,120,60,D","1953,1959,8,0,120,0,S","1955,1955,4,1,0,60,D","1956,1963,3,0,120,60,D","1960,1960,9,0,120,0,S","1961,1961,8,0,120,0,S","1962,1963,9,0,120,0,S"],Pike:["1955,1955,4,1,0,60,D","1955,1960,8,0,120,0,S","1956,1964,3,0,120,60,D","1961,1964,9,0,120,0,S"],Starke:["1947,1961,3,0,120,60,D","1947,1954,8,0,120,0,S","1955,1956,9,0,120,0,S","1957,1958,8,0,120,0,S","1959,1961,9,0,120,0,S"],Pulaski:["1946,1960,3,0,120,60,D","1946,1954,8,0,120,0,S","1955,1956,9,0,120,0,S","1957,1960,8,0,120,0,S"],Louisville:["1921,1921,4,1,120,60,D","1921,1921,8,1,120,0,S","1941,1961,3,0,120,60,D","1941,1941,8,0,120,0,S","1946,1946,5,2,120,0,S","1950,1955,8,0,120,0,S","1956,1960,9,0,120,0,S"],Detroit:["1948,1948,3,0,120,60,D","1948,1948,8,0,120,0,S","1967,1967,5,14,120,60,D","1967,1967,9,0,120,0,S"],Menominee:["1946,1946,3,0,120,60,D","1946,1946,8,0,120,0,S","1966,1966,3,0,120,60,D","1966,1966,9,0,120,0,S"],Canada:["1918,1918,3,14,120,60,D","1918,1918,9,31,120,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,30,120,0,S","1974,1986,3,0,120,60,D","1974,2006,9,0,120,0,S","1987,2006,3,0:1,120,60,D","2007,9999,2,0:8,120,60,D","2007,9999,10,0:1,120,0,S"],StJohns:["1917,1917,3,8,120,60,D","1917,1917,8,17,120,0,S","1919,1919,4,5,1380,60,D","1919,1919,7,12,1380,0,S","1920,1935,4,0:1,1380,60,D","1920,1935,9,0,1380,0,S","1936,1941,4,1:9,0,60,D","1936,1941,9,1:2,0,0,S","1946,1950,4,0:8,120,60,D","1946,1950,9,0:2,120,0,S","1951,1986,3,0,120,60,D","1951,1959,8,0,120,0,S","1960,1986,9,0,120,0,S","1987,1987,3,0:1,1,60,D","1987,2006,9,0,1,0,S","1988,1988,3,0:1,1,120,DD","1989,2006,3,0:1,1,60,D","2007,2011,2,0:8,1,60,D","2007,2010,10,0:1,1,0,S"],Halifax:["1916,1916,3,1,0,60,D","1916,1916,9,1,0,0,S","1920,1920,4,9,0,60,D","1920,1920,7,29,0,0,S","1921,1921,4,6,0,60,D","1921,1922,8,5,0,0,S","1922,1922,3,30,0,60,D","1923,1925,4,0:1,0,60,D","1923,1923,8,4,0,0,S","1924,1924,8,15,0,0,S","1925,1925,8,28,0,0,S","1926,1926,4,16,0,60,D","1926,1926,8,13,0,0,S","1927,1927,4,1,0,60,D","1927,1927,8,26,0,0,S","1928,1931,4,0:8,0,60,D","1928,1928,8,9,0,0,S","1929,1929,8,3,0,0,S","1930,1930,8,15,0,0,S","1931,1932,8,1:24,0,0,S","1932,1932,4,1,0,60,D","1933,1933,3,30,0,60,D","1933,1933,9,2,0,0,S","1934,1934,4,20,0,60,D","1934,1934,8,16,0,0,S","1935,1935,5,2,0,60,D","1935,1935,8,30,0,0,S","1936,1936,5,1,0,60,D","1936,1936,8,14,0,0,S","1937,1938,4,0:1,0,60,D","1937,1941,8,1:24,0,0,S","1939,1939,4,28,0,60,D","1940,1941,4,0:1,0,60,D","1946,1949,3,0,120,60,D","1946,1949,8,0,120,0,S","1951,1954,3,0,120,60,D","1951,1954,8,0,120,0,S","1956,1959,3,0,120,60,D","1956,1959,8,0,120,0,S","1962,1973,3,0,120,60,D","1962,1973,9,0,120,0,S"],Moncton:["1933,1935,5,0:8,60,60,D","1933,1935,8,0:8,60,0,S","1936,1938,5,0:1,60,60,D","1936,1938,8,0:1,60,0,S","1939,1939,4,27,60,60,D","1939,1941,8,6:21,60,0,S","1940,1940,4,19,60,60,D","1941,1941,4,4,60,60,D","1946,1972,3,0,120,60,D","1946,1956,8,0,120,0,S","1957,1972,9,0,120,0,S","1993,2006,3,0:1,1,60,D","1993,2006,9,0,1,0,S"],Mont:["1917,1917,2,25,120,60,D","1917,1917,3,24,0,0,S","1919,1919,2,31,150,60,D","1919,1919,9,25,150,0,S","1920,1920,4,2,150,60,D","1920,1922,9,0:1,150,0,S","1921,1921,4,1,120,60,D","1922,1922,3,30,120,60,D","1924,1924,4,17,120,60,D","1924,1926,8,0,150,0,S","1925,1926,4,0:1,120,60,D","1927,1927,4,1,0,60,D","1927,1932,8,0,0,0,S","1928,1931,3,0,0,60,D","1932,1932,4,1,0,60,D","1933,1940,3,0,0,60,D","1933,1933,9,1,0,0,S","1934,1939,8,0,0,0,S","1946,1973,3,0,120,60,D","1945,1948,8,0,120,0,S","1949,1950,9,0,120,0,S","1951,1956,8,0,120,0,S","1957,1973,9,0,120,0,S"],Toronto:["1919,1919,2,30,1410,60,D","1919,1919,9,26,0,0,S","1920,1920,4,2,120,60,D","1920,1920,8,26,0,0,S","1921,1921,4,15,120,60,D","1921,1921,8,15,120,0,S","1922,1923,4,0:8,120,60,D","1922,1926,8,0:15,120,0,S","1924,1927,4,0:1,120,60,D","1927,1932,8,0,120,0,S","1928,1931,3,0,120,60,D","1932,1932,4,1,120,60,D","1933,1940,3,0,120,60,D","1933,1933,9,1,120,0,S","1934,1939,8,0,120,0,S","1945,1946,8,0,120,0,S","1946,1946,3,0,120,60,D","1947,1949,3,0,0,60,D","1947,1948,8,0,0,0,S","1949,1949,10,0,0,0,S","1950,1973,3,0,120,60,D","1950,1950,10,0,120,0,S","1951,1956,8,0,120,0,S","1957,1973,9,0,120,0,S"],Winn:["1916,1916,3,23,0,60,D","1916,1916,8,17,0,0,S","1918,1918,3,14,120,60,D","1918,1918,9,31,120,0,S","1937,1937,4,16,120,60,D","1937,1937,8,26,120,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,0,120,0,S","1946,1946,4,12,120,60,D","1946,1946,9,13,120,0,S","1947,1949,3,0,120,60,D","1947,1949,8,0,120,0,S","1950,1950,4,1,120,60,D","1950,1950,8,30,120,0,S","1951,1960,3,0,120,60,D","1951,1958,8,0,120,0,S","1959,1959,9,0,120,0,S","1960,1960,8,0,120,0,S","1963,1963,3,0,120,60,D","1963,1963,8,22,120,0,S","1966,1986,3,0,120,60,D","1966,2005,9,0,120,0,S","1987,2005,3,0:1,120,60,D"],Regina:["1918,1918,3,14,120,60,D","1918,1918,9,31,120,0,S","1930,1934,4,0:1,0,60,D","1930,1934,9,0:1,0,0,S","1937,1941,3,0:8,0,60,D","1937,1937,9,0:8,0,0,S","1938,1938,9,0:1,0,0,S","1939,1941,9,0:8,0,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,0,120,0,S","1946,1946,3,0:8,120,60,D","1946,1946,9,0:8,120,0,S","1947,1957,3,0,120,60,D","1947,1957,8,0,120,0,S","1959,1959,3,0,120,60,D","1959,1959,9,0,120,0,S"],Swift:["1957,1957,3,0,120,60,D","1957,1957,9,0,120,0,S","1959,1961,3,0,120,60,D","1959,1959,9,0,120,0,S","1960,1961,8,0,120,0,S"],Edm:["1918,1919,3,0:8,120,60,D","1918,1918,9,31,120,0,S","1919,1919,4,27,120,0,S","1920,1923,3,0,120,60,D","1920,1920,9,0,120,0,S","1921,1923,8,0,120,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,0,120,0,S","1947,1947,3,0,120,60,D","1947,1947,8,0,120,0,S","1967,1967,3,0,120,60,D","1967,1967,9,0,120,0,S","1969,1969,3,0,120,60,D","1969,1969,9,0,120,0,S","1972,1986,3,0,120,60,D","1972,2006,9,0,120,0,S"],Vanc:["1918,1918,3,14,120,60,D","1918,1918,9,31,120,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,30,120,0,S","1946,1986,3,0,120,60,D","1946,1946,9,13,120,0,S","1947,1961,8,0,120,0,S","1962,2006,9,0,120,0,S"],NT_YK:["1918,1918,3,14,120,60,D","1918,1918,9,27,120,0,S","1919,1919,4,25,120,60,D","1919,1919,10,1,0,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,30,120,0,S","1965,1965,3,0,0,120,DD","1965,1965,9,0,120,0,S","1980,1986,3,0,120,60,D","1980,2006,9,0,120,0,S","1987,2006,3,0:1,120,60,D"],Mexico:["1939,1939,1,5,0,60,D","1939,1939,5,25,0,0,S","1940,1940,11,9,0,60,D","1941,1941,3,1,0,0,S","1943,1943,11,16,0,60,W","1944,1944,4,1,0,0,S","1950,1950,1,12,0,60,D","1950,1950,6,30,0,0,S","1996,2000,3,0:1,120,60,D","1996,2000,9,0,120,0,S","2001,2001,4,0:1,120,60,D","2001,2001,8,0,120,0,S","2002,9999,3,0:1,120,60,D","2002,9999,9,0,120,0,S"],Bahamas:["1964,1975,9,0,120,0,S","1964,1975,3,0,120,60,D"],Barb:["1977,1977,5,12,120,60,D","1977,1978,9,0:1,120,0,S","1978,1980,3,0:15,120,60,D","1979,1979,8,30,120,0,S","1980,1980,8,25,120,0,S"],Belize:["1918,1942,9,0:2,0,30,HD","1919,1943,1,0:9,0,0,S","1973,1973,11,5,0,60,D","1974,1974,1,9,0,0,S","1982,1982,11,18,0,60,D","1983,1983,1,12,0,0,S"],CR:["1979,1980,1,0,0,60,D","1979,1980,5,0:1,0,0,S","1991,1992,0,6:15,0,60,D","1991,1991,6,1,0,0,S","1992,1992,2,15,0,0,S"],Cuba:["1928,1928,5,10,0,60,D","1928,1928,9,10,0,0,S","1940,1942,5,0:1,0,60,D","1940,1942,8,0:1,0,0,S","1945,1946,5,0:1,0,60,D","1945,1946,8,0:1,0,0,S","1965,1965,5,1,0,60,D","1965,1965,8,30,0,0,S","1966,1966,4,29,0,60,D","1966,1966,9,2,0,0,S","1967,1967,3,8,0,60,D","1967,1968,8,0:8,0,0,S","1968,1968,3,14,0,60,D","1969,1977,3,0,0,60,D","1969,1971,9,0,0,0,S","1972,1974,9,8,0,0,S","1975,1977,9,0,0,0,S","1978,1978,4,7,0,60,D","1978,1990,9,0:8,0,0,S","1979,1980,2,0:15,0,60,D","1981,1985,4,0:5,0,60,D","1986,1989,2,0:14,0,60,D","1990,1997,3,0:1,0,60,D","1991,1995,9,0:8,0,0,S","1996,1996,9,6,0,0,S","1997,1997,9,12,0,0,S","1998,1999,2,0,0,60,D","1998,2003,9,0,0,0,S","2000,2004,3,0:1,0,60,D","2006,2010,9,0,0,0,S","2007,2007,2,0:8,0,60,D","2008,2008,2,0:15,0,60,D","2009,2010,2,0:8,0,60,D","2011,2011,2,0:15,0,60,D","2011,2011,10,13,0,0,S","2012,9999,2,0:8,0,60,D","2012,9999,9,0,0,0,S"],DR:["1966,1966,9,30,0,60,D","1967,1967,1,28,0,0,S","1969,1973,9,0,0,30,HD","1970,1970,1,21,0,0,S","1971,1971,0,20,0,0,S","1972,1974,0,21,0,0,S"],Salv:["1987,1988,4,0:1,0,60,D","1987,1988,8,0,0,0,S"],Guat:["1973,1973,10,25,0,60,D","1974,1974,1,24,0,0,S","1983,1983,4,21,0,60,D","1983,1983,8,22,0,0,S","1991,1991,2,23,0,60,D","1991,1991,8,7,0,0,S","2006,2006,3,30,0,60,D","2006,2006,9,1,0,0,S"],Haiti:["1983,1983,4,8,0,60,D","1984,1987,3,0,0,60,D","1983,1987,9,0,0,0,S","1988,1997,3,0:1,60,60,D","1988,1997,9,0,60,0,S","2005,2006,3,0:1,0,60,D","2005,2006,9,0,0,0,S"],Hond:["1987,1988,4,0:1,0,60,D","1987,1988,8,0,0,0,S","2006,2006,4,0:1,0,60,D","2006,2006,7,1:1,0,0,S"],Nic:["1979,1980,2,0:16,0,60,D","1979,1980,5,1:23,0,0,S","2005,2005,3,10,0,60,D","2005,2005,9,0:1,0,0,S","2006,2006,3,30,120,60,D","2006,2006,9,0:1,60,0,S"],TC:["1979,1986,3,0,120,60,D","1979,2006,9,0,120,0,S","1987,2006,3,0:1,120,60,D","2007,9999,2,0:8,120,60,D","2007,9999,10,0:1,120,0,S"]},zones:{EST:["-300,-,EST"],MST:["-420,-,MST"],HST:["-600,-,HST"],EST5EDT:["-300,US,E%sT"],CST6CDT:["-360,US,C%sT"],MST7MDT:["-420,US,M%sT"],PST8PDT:["-480,US,P%sT"],"America/New_York":["-184,-,LMT,1883,Nov,18,12:03:58","-300,US,E%sT,1920","-300,NYC,E%sT,1942","-300,US,E%sT,1946","-300,NYC,E%sT,1967","-300,US,E%sT"],"America/Chicago":["-250,-,LMT,1883,Nov,18,12:09:24","-360,US,C%sT,1920","-360,Chicago,C%sT,1936,Mar,1,2:00","-300,-,EST,1936,Nov,15,2:00","-360,Chicago,C%sT,1942","-360,US,C%sT,1946","-360,Chicago,C%sT,1967","-360,US,C%sT"],"America/North_Dakota/Center":["-315,-,LMT,1883,Nov,18,12:14:48","-420,US,M%sT,1992,Oct,25,02:00","-360,US,C%sT"],"America/North_Dakota/New_Salem":["-315,-,LMT,1883,Nov,18,12:14:21","-420,US,M%sT,2003,Oct,26,02:00","-360,US,C%sT"],"America/North_Dakota/Beulah":["-313,-,LMT,1883,Nov,18,12:12:53","-420,US,M%sT,2010,Nov,7,2:00","-360,US,C%sT"],"America/Denver":["-301,-,LMT,1883,Nov,18,12:00:04","-420,US,M%sT,1920","-420,Denver,M%sT,1942","-420,US,M%sT,1946","-420,Denver,M%sT,1967","-420,US,M%sT"],"America/Los_Angeles":["-368,-,LMT,1883,Nov,18,12:07:02","-480,US,P%sT,1946","-480,CA,P%sT,1967","-480,US,P%sT"],"America/Juneau":["902,-,LMT,1867,Oct,18","-423,-,LMT,1900,Aug,20,12:00","-480,-,PST,1942","-480,US,P%sT,1946","-480,-,PST,1969","-480,US,P%sT,1980,Apr,27,2:00","-540,US,Y%sT,1980,Oct,26,2:00,","-480,US,P%sT,1983,Oct,30,2:00","-540,US,Y%sT,1983,Nov,30","-540,US,AK%sT"],"America/Sitka":["898,-,LMT,1867,Oct,18","-539,-,LMT,1900,Aug,20,12:00","-480,-,PST,1942","-480,US,P%sT,1946","-480,-,PST,1969","-480,US,P%sT,1983,Oct,30,2:00","-540,US,Y%sT,1983,Nov,30","-540,US,AK%sT"],"America/Metlakatla":["913,-,LMT,1867,Oct,18","-434,-,LMT,1900,Aug,20,12:00","-480,-,PST,1942","-480,US,P%sT,1946","-480,-,PST,1969","-480,US,P%sT,1983,Oct,30,2:00","-480,-,MeST"],"America/Yakutat":["881,-,LMT,1867,Oct,18","-522,-,LMT,1900,Aug,20,12:00","-540,-,YST,1942","-540,US,Y%sT,1946","-540,-,YST,1969","-540,US,Y%sT,1983,Nov,30","-540,US,AK%sT"],"America/Anchorage":["840,-,LMT,1867,Oct,18","-481,-,LMT,1900,Aug,20,12:00","-600,-,CAT,1942","-600,US,CAT/CAWT,1945,Aug,14,23:00u","-600,US,CAT/CAPT,1946,","-600,-,CAT,1967,Apr","-600,-,AHST,1969","-600,US,AH%sT,1983,Oct,30,2:00","-540,US,Y%sT,1983,Nov,30","-540,US,AK%sT"],"America/Nome":["778,-,LMT,1867,Oct,18","-659,-,LMT,1900,Aug,20,12:00","-660,-,NST,1942","-660,US,N%sT,1946","-660,-,NST,1967,Apr","-660,-,BST,1969","-660,US,B%sT,1983,Oct,30,2:00","-540,US,Y%sT,1983,Nov,30","-540,US,AK%sT"],"America/Adak":["733,-,LMT,1867,Oct,18","-614,-,LMT,1900,Aug,20,12:00","-660,-,NST,1942","-660,US,N%sT,1946","-660,-,NST,1967,Apr","-660,-,BST,1969","-660,US,B%sT,1983,Oct,30,2:00","-600,US,AH%sT,1983,Nov,30","-600,US,HA%sT"],"Pacific/Honolulu":["-569,-,LMT,1896,Jan,13,12:00,","-570,-,HST,1933,Apr,30,2:00,","-570,1:00,HDT,1933,May,21,12:00,","-570,-,HST,1942,Feb,09,2:00,","-570,1:00,HDT,1945,Sep,30,2:00,","-570,-,HST,1947,Jun,8,2:00,","-600,-,HST"],"America/Phoenix":["-392,-,LMT,1883,Nov,18,11:31:42","-420,US,M%sT,1944,Jan,1,00:01","-420,-,MST,1944,Apr,1,00:01","-420,US,M%sT,1944,Oct,1,00:01","-420,-,MST,1967","-420,US,M%sT,1968,Mar,21","-420,-,MST"],"America/Boise":["-376,-,LMT,1883,Nov,18,12:15:11","-480,US,P%sT,1923,May,13,2:00","-420,US,M%sT,1974","-420,-,MST,1974,Feb,3,2:00","-420,US,M%sT"],"America/Indiana/Indianapolis":["-256,-,LMT,1883,Nov,18,12:15:22","-360,US,C%sT,1920","-360,Indianapolis,C%sT,1942","-360,US,C%sT,1946","-360,Indianapolis,C%sT,1955,Apr,24,2:00","-300,-,EST,1957,Sep,29,2:00","-360,-,CST,1958,Apr,27,2:00","-300,-,EST,1969","-300,US,E%sT,1971","-300,-,EST,2006","-300,US,E%sT"],"America/Indiana/Marengo":["-255,-,LMT,1883,Nov,18,12:14:37","-360,US,C%sT,1951","-360,Marengo,C%sT,1961,Apr,30,2:00","-300,-,EST,1969","-300,US,E%sT,1974,Jan,6,2:00","-360,1:00,CDT,1974,Oct,27,2:00","-300,US,E%sT,1976","-300,-,EST,2006","-300,US,E%sT"],"America/Indiana/Vincennes":["-250,-,LMT,1883,Nov,18,12:09:53","-360,US,C%sT,1946","-360,Vincennes,C%sT,1964,Apr,26,2:00","-300,-,EST,1969","-300,US,E%sT,1971","-300,-,EST,2006,Apr,2,2:00","-360,US,C%sT,2007,Nov,4,2:00","-300,US,E%sT"],"America/Indiana/Tell_City":["-253,-,LMT,1883,Nov,18,12:12:57","-360,US,C%sT,1946","-360,Perry,C%sT,1964,Apr,26,2:00","-300,-,EST,1969","-300,US,E%sT,1971","-300,-,EST,2006,Apr,2,2:00","-360,US,C%sT"],"America/Indiana/Petersburg":["-251,-,LMT,1883,Nov,18,12:10:53","-360,US,C%sT,1955","-360,Pike,C%sT,1965,Apr,25,2:00","-300,-,EST,1966,Oct,30,2:00","-360,US,C%sT,1977,Oct,30,2:00","-300,-,EST,2006,Apr,2,2:00","-360,US,C%sT,2007,Nov,4,2:00","-300,US,E%sT"],"America/Indiana/Knox":["-254,-,LMT,1883,Nov,18,12:13:30","-360,US,C%sT,1947","-360,Starke,C%sT,1962,Apr,29,2:00","-300,-,EST,1963,Oct,27,2:00","-360,US,C%sT,1991,Oct,27,2:00","-300,-,EST,2006,Apr,2,2:00","-360,US,C%sT"],"America/Indiana/Winamac":["-254,-,LMT,1883,Nov,18,12:13:35","-360,US,C%sT,1946","-360,Pulaski,C%sT,1961,Apr,30,2:00","-300,-,EST,1969","-300,US,E%sT,1971","-300,-,EST,2006,Apr,2,2:00","-360,US,C%sT,2007,Mar,11,2:00","-300,US,E%sT"],"America/Indiana/Vevay":["-260,-,LMT,1883,Nov,18,12:19:44","-360,US,C%sT,1954,Apr,25,2:00","-300,-,EST,1969","-300,US,E%sT,1973","-300,-,EST,2006","-300,US,E%sT"],"America/Kentucky/Louisville":["-257,-,LMT,1883,Nov,18,12:16:58","-360,US,C%sT,1921","-360,Louisville,C%sT,1942","-360,US,C%sT,1946","-360,Louisville,C%sT,1961,Jul,23,2:00","-300,-,EST,1968","-300,US,E%sT,1974,Jan,6,2:00","-360,1:00,CDT,1974,Oct,27,2:00","-300,US,E%sT"],"America/Kentucky/Monticello":["-261,-,LMT,1883,Nov,18,12:20:36","-360,US,C%sT,1946","-360,-,CST,1968","-360,US,C%sT,2000,Oct,29,2:00","-300,US,E%sT"],"America/Detroit":["-268,-,LMT,1905","-360,-,CST,1915,May,15,2:00","-300,-,EST,1942","-300,US,E%sT,1946","-300,Detroit,E%sT,1973","-300,US,E%sT,1975","-300,-,EST,1975,Apr,27,2:00","-300,US,E%sT"],"America/Menominee":["-250,-,LMT,1885,Sep,18,12:00","-360,US,C%sT,1946","-360,Menominee,C%sT,1969,Apr,27,2:00","-300,-,EST,1973,Apr,29,2:00","-360,US,C%sT"],"America/St_Johns":["-150,-,LMT,1884","-150,StJohns,N%sT,1918","-150,Canada,N%sT,1919","-150,StJohns,N%sT,1935,Mar,30","-150,StJohns,N%sT,1942,May,11","-150,Canada,N%sT,1946","-150,StJohns,N%sT,2011,Nov","-150,Canada,N%sT"],"America/Goose_Bay":["-239,-,LMT,1884,","-150,-,NST,1918","-150,Canada,N%sT,1919","-150,-,NST,1935,Mar,30","-150,-,NST,1936","-150,StJohns,N%sT,1942,May,11","-150,Canada,N%sT,1946","-150,StJohns,N%sT,1966,Mar,15,2:00","-240,StJohns,A%sT,2011,Nov","-240,Canada,A%sT"],"America/Halifax":["-226,-,LMT,1902,Jun,15","-240,Halifax,A%sT,1918","-240,Canada,A%sT,1919","-240,Halifax,A%sT,1942,Feb,9,2:00s","-240,Canada,A%sT,1946","-240,Halifax,A%sT,1974","-240,Canada,A%sT"],"America/Glace_Bay":["-121,-,LMT,1902,Jun,15","-240,Canada,A%sT,1953","-240,Halifax,A%sT,1954","-240,-,AST,1972","-240,Halifax,A%sT,1974","-240,Canada,A%sT"],"America/Moncton":["-221,-,LMT,1883,Dec,9","-300,-,EST,1902,Jun,15","-240,Canada,A%sT,1933","-240,Moncton,A%sT,1942","-240,Canada,A%sT,1946","-240,Moncton,A%sT,1973","-240,Canada,A%sT,1993","-240,Moncton,A%sT,2007","-240,Canada,A%sT"],"America/Blanc-Sablon":["-132,-,LMT,1884","-240,Canada,A%sT,1970","-240,-,AST"],"America/Montreal":["-186,-,LMT,1884","-300,Mont,E%sT,1918","-300,Canada,E%sT,1919","-300,Mont,E%sT,1942,Feb,9,2:00s","-300,Canada,E%sT,1946","-300,Mont,E%sT,1974","-300,Canada,E%sT"],"America/Toronto":["-283,-,LMT,1895","-300,Canada,E%sT,1919","-300,Toronto,E%sT,1942,Feb,9,2:00s","-300,Canada,E%sT,1946","-300,Toronto,E%sT,1974","-300,Canada,E%sT"],"America/Thunder_Bay":["-243,-,LMT,1895","-360,-,CST,1910","-300,-,EST,1942","-300,Canada,E%sT,1970","-300,Mont,E%sT,1973","-300,-,EST,1974","-300,Canada,E%sT"],"America/Nipigon":["-247,-,LMT,1895","-300,Canada,E%sT,1940,Sep,29","-300,1:00,EDT,1942,Feb,9,2:00s","-300,Canada,E%sT"],"America/Rainy_River":["-342,-,LMT,1895","-360,Canada,C%sT,1940,Sep,29","-360,1:00,CDT,1942,Feb,9,2:00s","-360,Canada,C%sT"],"America/Atikokan":["-354,-,LMT,1895","-360,Canada,C%sT,1940,Sep,29","-360,1:00,CDT,1942,Feb,9,2:00s","-360,Canada,C%sT,1945,Sep,30,2:00","-300,-,EST"],"America/Winnipeg":["-332,-,LMT,1887,Jul,16","-360,Winn,C%sT,2006","-360,Canada,C%sT"],"America/Regina":["-302,-,LMT,1905,Sep","-420,Regina,M%sT,1960,Apr,lastSun,2:00","-360,-,CST"],"America/Swift_Current":["-409,-,LMT,1905,Sep","-420,Canada,M%sT,1946,Apr,lastSun,2:00","-420,Regina,M%sT,1950","-420,Swift,M%sT,1972,Apr,lastSun,2:00","-360,-,CST"],"America/Edmonton":["-387,-,LMT,1906,Sep","-420,Edm,M%sT,1987","-420,Canada,M%sT"],"America/Vancouver":["-468,-,LMT,1884","-480,Vanc,P%sT,1987","-480,Canada,P%sT"],"America/Dawson_Creek":["-480,-,LMT,1884","-480,Canada,P%sT,1947","-480,Vanc,P%sT,1972,Aug,30,2:00","-420,-,MST"],"America/Pangnirtung":["0,-,zzz,1921,","-240,NT_YK,A%sT,1995,Apr,Sun>=1,2:00","-300,Canada,E%sT,1999,Oct,31,2:00","-360,Canada,C%sT,2000,Oct,29,2:00","-300,Canada,E%sT"],"America/Iqaluit":["0,-,zzz,1942,Aug,","-300,NT_YK,E%sT,1999,Oct,31,2:00","-360,Canada,C%sT,2000,Oct,29,2:00","-300,Canada,E%sT"],"America/Resolute":["0,-,zzz,1947,Aug,31,","-360,NT_YK,C%sT,2000,Oct,29,2:00","-300,-,EST,2001,Apr,1,3:00","-360,Canada,C%sT,2006,Oct,29,2:00","-300,-,EST,2007,Mar,11,3:00","-360,Canada,C%sT"],"America/Rankin_Inlet":["0,-,zzz,1957,","-360,NT_YK,C%sT,2000,Oct,29,2:00","-300,-,EST,2001,Apr,1,3:00","-360,Canada,C%sT"],"America/Cambridge_Bay":["0,-,zzz,1920,","-420,NT_YK,M%sT,1999,Oct,31,2:00","-360,Canada,C%sT,2000,Oct,29,2:00","-300,-,EST,2000,Nov,5,0:00","-360,-,CST,2001,Apr,1,3:00","-420,Canada,M%sT"],"America/Yellowknife":["0,-,zzz,1935,","-420,NT_YK,M%sT,1980","-420,Canada,M%sT"],"America/Inuvik":["0,-,zzz,1953,","-480,NT_YK,P%sT,1979,Apr,lastSun,2:00","-420,NT_YK,M%sT,1980","-420,Canada,M%sT"],"America/Whitehorse":["-540,-,LMT,1900,Aug,20","-540,NT_YK,Y%sT,1966,Jul,1,2:00","-480,NT_YK,P%sT,1980","-480,Canada,P%sT"],"America/Dawson":["-523,-,LMT,1900,Aug,20","-540,NT_YK,Y%sT,1973,Oct,28,0:00","-480,NT_YK,P%sT,1980","-480,Canada,P%sT"],"America/Cancun":["-253,-,LMT,1922,Jan,1,0:12:56","-360,-,CST,1981,Dec,23","-300,Mexico,E%sT,1998,Aug,2,2:00","-360,Mexico,C%sT"],"America/Merida":["-242,-,LMT,1922,Jan,1,0:01:32","-360,-,CST,1981,Dec,23","-300,-,EST,1982,Dec,2","-360,Mexico,C%sT"],"America/Matamoros":["-320,-,LMT,1921,Dec,31,23:20:00","-360,-,CST,1988","-360,US,C%sT,1989","-360,Mexico,C%sT,2010","-360,US,C%sT"],"America/Monterrey":["-319,-,LMT,1921,Dec,31,23:18:44","-360,-,CST,1988","-360,US,C%sT,1989","-360,Mexico,C%sT"],"America/Mexico_City":["-324,-,LMT,1922,Jan,1,0:23:24","-420,-,MST,1927,Jun,10,23:00","-360,-,CST,1930,Nov,15","-420,-,MST,1931,May,1,23:00","-360,-,CST,1931,Oct","-420,-,MST,1932,Apr,1","-360,Mexico,C%sT,2001,Sep,30,02:00","-360,-,CST,2002,Feb,20","-360,Mexico,C%sT"],"America/Ojinaga":["-303,-,LMT,1922,Jan,1,0:02:20","-420,-,MST,1927,Jun,10,23:00","-360,-,CST,1930,Nov,15","-420,-,MST,1931,May,1,23:00","-360,-,CST,1931,Oct","-420,-,MST,1932,Apr,1","-360,-,CST,1996","-360,Mexico,C%sT,1998","-360,-,CST,1998,Apr,Sun>=1,3:00","-420,Mexico,M%sT,2010","-420,US,M%sT"],"America/Chihuahua":["-416,-,LMT,1921,Dec,31,23:55:40","-420,-,MST,1927,Jun,10,23:00","-360,-,CST,1930,Nov,15","-420,-,MST,1931,May,1,23:00","-360,-,CST,1931,Oct","-420,-,MST,1932,Apr,1","-360,-,CST,1996","-360,Mexico,C%sT,1998","-360,-,CST,1998,Apr,Sun>=1,3:00","-420,Mexico,M%sT"],"America/Hermosillo":["-397,-,LMT,1921,Dec,31,23:36:08","-420,-,MST,1927,Jun,10,23:00","-360,-,CST,1930,Nov,15","-420,-,MST,1931,May,1,23:00","-360,-,CST,1931,Oct","-420,-,MST,1932,Apr,1","-360,-,CST,1942,Apr,24","-420,-,MST,1949,Jan,14","-480,-,PST,1970","-420,Mexico,M%sT,1999","-420,-,MST"],"America/Mazatlan":["-415,-,LMT,1921,Dec,31,23:54:20","-420,-,MST,1927,Jun,10,23:00","-360,-,CST,1930,Nov,15","-420,-,MST,1931,May,1,23:00","-360,-,CST,1931,Oct","-420,-,MST,1932,Apr,1","-360,-,CST,1942,Apr,24","-420,-,MST,1949,Jan,14","-480,-,PST,1970","-420,Mexico,M%sT"],"America/Bahia_Banderas":["-419,-,LMT,1921,Dec,31,23:59:00","-420,-,MST,1927,Jun,10,23:00","-360,-,CST,1930,Nov,15","-420,-,MST,1931,May,1,23:00","-360,-,CST,1931,Oct","-420,-,MST,1932,Apr,1","-360,-,CST,1942,Apr,24","-420,-,MST,1949,Jan,14","-480,-,PST,1970","-420,Mexico,M%sT,2010,Apr,4,2:00","-360,Mexico,C%sT"],"America/Tijuana":["-372,-,LMT,1922,Jan,1,0:11:56","-420,-,MST,1924","-480,-,PST,1927,Jun,10,23:00","-420,-,MST,1930,Nov,15","-480,-,PST,1931,Apr,1","-480,1:00,PDT,1931,Sep,30","-480,-,PST,1942,Apr,24","-480,1:00,PWT,1945,Aug,14,23:00u","-480,1:00,PPT,1945,Nov,12,","-480,-,PST,1948,Apr,5","-480,1:00,PDT,1949,Jan,14","-480,-,PST,1954","-480,CA,P%sT,1961","-480,-,PST,1976","-480,US,P%sT,1996","-480,Mexico,P%sT,2001","-480,US,P%sT,2002,Feb,20","-480,Mexico,P%sT,2010","-480,US,P%sT"],"America/Santa_Isabel":["-381,-,LMT,1922,Jan,1,0:20:32","-420,-,MST,1924","-480,-,PST,1927,Jun,10,23:00","-420,-,MST,1930,Nov,15","-480,-,PST,1931,Apr,1","-480,1:00,PDT,1931,Sep,30","-480,-,PST,1942,Apr,24","-480,1:00,PWT,1945,Aug,14,23:00u","-480,1:00,PPT,1945,Nov,12,","-480,-,PST,1948,Apr,5","-480,1:00,PDT,1949,Jan,14","-480,-,PST,1954","-480,CA,P%sT,1961","-480,-,PST,1976","-480,US,P%sT,1996","-480,Mexico,P%sT,2001","-480,US,P%sT,2002,Feb,20","-480,Mexico,P%sT"],"America/Anguilla":["-228,-,LMT,1912,Mar,2","-240,-,AST"],"America/Antigua":["-233,-,LMT,1912,Mar,2","-300,-,EST,1951","-240,-,AST"],"America/Nassau":["-291,-,LMT,1912,Mar,2","-300,Bahamas,E%sT,1976","-300,US,E%sT"],"America/Barbados":["-122,-,LMT,1924,","-122,-,BMT,1932,","-240,Barb,A%sT"],"America/Belize":["-248,-,LMT,1912,Apr","-360,Belize,C%sT"],"Atlantic/Bermuda":["-221,-,LMT,1930,Jan,1,2:00,","-240,-,AST,1974,Apr,28,2:00","-240,Bahamas,A%sT,1976","-240,US,A%sT"],"America/Cayman":["-275,-,LMT,1890,","-293,-,KMT,1912,Feb,","-300,-,EST"],"America/Costa_Rica":["-264,-,LMT,1890,","-264,-,SJMT,1921,Jan,15,","-360,CR,C%sT"],"America/Havana":["-271,-,LMT,1890","-271,-,HMT,1925,Jul,19,12:00,","-300,Cuba,C%sT"],"America/Dominica":["-235,-,LMT,1911,Jul,1,0:01,","-240,-,AST"],"America/Santo_Domingo":["-201,-,LMT,1890","-200,-,SDMT,1933,Apr,1,12:00,","-300,DR,E%sT,1974,Oct,27","-240,-,AST,2000,Oct,29,02:00","-300,US,E%sT,2000,Dec,3,01:00","-240,-,AST"],"America/El_Salvador":["-244,-,LMT,1921,","-360,Salv,C%sT"],"America/Grenada":["-233,-,LMT,1911,Jul,","-240,-,AST"],"America/Guadeloupe":["-234,-,LMT,1911,Jun,8,","-240,-,AST"],"America/Guatemala":["-358,-,LMT,1918,Oct,5","-360,Guat,C%sT"],"America/Port-au-Prince":["-191,-,LMT,1890","-191,-,PPMT,1917,Jan,24,12:00,","-300,Haiti,E%sT"],"America/Tegucigalpa":["-252,-,LMT,1921,Apr","-360,Hond,C%sT"],"America/Jamaica":["-293,-,LMT,1890,","-293,-,KMT,1912,Feb,","-300,-,EST,1974,Apr,28,2:00","-300,US,E%sT,1984","-300,-,EST"],"America/Martinique":["-236,-,LMT,1890,","-236,-,FFMT,1911,May,","-240,-,AST,1980,Apr,6","-240,1:00,ADT,1980,Sep,28","-240,-,AST"],"America/Montserrat":["-232,-,LMT,1911,Jul,1,0:01,","-240,-,AST"],"America/Managua":["-255,-,LMT,1890","-255,-,MMT,1934,Jun,23,","-360,-,CST,1973,May","-300,-,EST,1975,Feb,16","-360,Nic,C%sT,1992,Jan,1,4:00","-300,-,EST,1992,Sep,24","-360,-,CST,1993","-300,-,EST,1997","-360,Nic,C%sT"],"America/Panama":["-282,-,LMT,1890","-281,-,CMT,1908,Apr,22,","-300,-,EST"],"America/Puerto_Rico":["-216,-,LMT,1899,Mar,28,12:00,","-240,-,AST,1942,May,3","-240,US,A%sT,1946","-240,-,AST"],"America/St_Kitts":["-230,-,LMT,1912,Mar,2,","-240,-,AST"],"America/St_Lucia":["-236,-,LMT,1890,","-236,-,CMT,1912,","-240,-,AST"],"America/Miquelon":["-136,-,LMT,1911,May,15,","-240,-,AST,1980,May","-180,-,PMST,1987,","-180,Canada,PM%sT"],"America/St_Vincent":["-236,-,LMT,1890,","-236,-,KMT,1912,","-240,-,AST"],"America/Grand_Turk":["-196,-,LMT,1890","-293,-,KMT,1912,Feb,","-300,TC,E%sT"],"America/Tortola":["-222,-,LMT,1911,Jul,","-240,-,AST"],"America/St_Thomas":["-221,-,LMT,1911,Jul,","-240,-,AST"]},lastZone:"America/St_Thomas"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{},zones:{},lastZone:null};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
(function(){var A={rules:{Arg:["1930,1930,11,1,0,60,S","1931,1931,3,1,0,0,-","1931,1931,9,15,0,60,S","1932,1940,2,1,0,0,-","1932,1939,10,1,0,60,S","1940,1940,6,1,0,60,S","1941,1941,5,15,0,0,-","1941,1941,9,15,0,60,S","1943,1943,7,1,0,0,-","1943,1943,9,15,0,60,S","1946,1946,2,1,0,0,-","1946,1946,9,1,0,60,S","1963,1963,9,1,0,0,-","1963,1963,11,15,0,60,S","1964,1966,2,1,0,0,-","1964,1966,9,15,0,60,S","1967,1967,3,2,0,0,-","1967,1968,9,0:1,0,60,S","1968,1969,3,0:1,0,0,-","1974,1974,0,23,0,60,S","1974,1974,4,1,0,0,-","1988,1988,11,1,0,60,S","1989,1993,2,0:1,0,0,-","1989,1992,9,0:15,0,60,S","1999,1999,9,0:1,0,60,S","2000,2000,2,3,0,0,-","2007,2007,11,30,0,60,S","2008,2009,2,0:15,0,0,-","2008,2008,9,0:15,0,60,S"],SanLuis:["2008,2009,2,0:8,0,0,-","2007,2009,9,0:8,0,60,S"],Brazil:["1931,1931,9,3,660,60,S","1932,1933,3,1,0,0,-","1932,1932,9,3,0,60,S","1949,1952,11,1,0,60,S","1950,1950,3,16,60,0,-","1951,1952,3,1,0,0,-","1953,1953,2,1,0,0,-","1963,1963,11,9,0,60,S","1964,1964,2,1,0,0,-","1965,1965,0,31,0,60,S","1965,1965,2,31,0,0,-","1965,1965,11,1,0,60,S","1966,1968,2,1,0,0,-","1966,1967,10,1,0,60,S","1985,1985,10,2,0,60,S","1986,1986,2,15,0,0,-","1986,1986,9,25,0,60,S","1987,1987,1,14,0,0,-","1987,1987,9,25,0,60,S","1988,1988,1,7,0,0,-","1988,1988,9,16,0,60,S","1989,1989,0,29,0,0,-","1989,1989,9,15,0,60,S","1990,1990,1,11,0,0,-","1990,1990,9,21,0,60,S","1991,1991,1,17,0,0,-","1991,1991,9,20,0,60,S","1992,1992,1,9,0,0,-","1992,1992,9,25,0,60,S","1993,1993,0,31,0,0,-","1993,1995,9,0:11,0,60,S","1994,1995,1,0:15,0,0,-","1996,1996,1,11,0,0,-","1996,1996,9,6,0,60,S","1997,1997,1,16,0,0,-","1997,1997,9,6,0,60,S","1998,1998,2,1,0,0,-","1998,1998,9,11,0,60,S","1999,1999,1,21,0,0,-","1999,1999,9,3,0,60,S","2000,2000,1,27,0,0,-","2000,2001,9,0:8,0,60,S","2001,2006,1,0:15,0,0,-","2002,2002,10,3,0,60,S","2003,2003,9,19,0,60,S","2004,2004,10,2,0,60,S","2005,2005,9,16,0,60,S","2006,2006,10,5,0,60,S","2007,2007,1,25,0,0,-","2007,2007,9,0:8,0,60,S","2008,9999,9,0:15,0,60,S","2008,2011,1,0:15,0,0,-","2012,2012,1,0:22,0,0,-","2013,2014,1,0:15,0,0,-","2015,2015,1,0:22,0,0,-","2016,2022,1,0:15,0,0,-","2023,2023,1,0:22,0,0,-","2024,2025,1,0:15,0,0,-","2026,2026,1,0:22,0,0,-","2027,2033,1,0:15,0,0,-","2034,2034,1,0:22,0,0,-","2035,2036,1,0:15,0,0,-","2037,2037,1,0:22,0,0,-","2038,9999,1,0:15,0,0,-"],Chile:["1927,1932,8,1,0,60,S","1928,1932,3,1,0,0,-","1942,1942,5,1,240,0,-","1942,1942,7,1,300,60,S","1946,1946,6,15,240,60,S","1946,1946,8,1,180,0,-","1947,1947,3,1,240,0,-","1968,1968,10,3,240,60,S","1969,1969,2,30,180,0,-","1969,1969,10,23,240,60,S","1970,1970,2,29,180,0,-","1971,1971,2,14,180,0,-","1970,1972,9,0:9,240,60,S","1972,1986,2,0:9,180,0,-","1973,1973,8,30,240,60,S","1974,1987,9,0:9,240,60,S","1987,1987,3,12,180,0,-","1988,1989,2,0:9,180,0,-","1988,1988,9,0:1,240,60,S","1989,1989,9,0:9,240,60,S","1990,1990,2,18,180,0,-","1990,1990,8,16,240,60,S","1991,1996,2,0:9,180,0,-","1991,1997,9,0:9,240,60,S","1997,1997,2,30,180,0,-","1998,1998,2,0:9,180,0,-","1998,1998,8,27,240,60,S","1999,1999,3,4,180,0,-","1999,2010,9,0:9,240,60,S","2011,2011,7,0:16,240,60,S","2012,9999,9,0:9,240,60,S","2000,2007,2,0:9,180,0,-","2008,2008,2,30,180,0,-","2009,2009,2,0:9,180,0,-","2010,2010,3,0:1,180,0,-","2011,2011,4,0:2,180,0,-","2012,9999,2,0:9,180,0,-"],CO:["1992,1992,4,3,0,60,S","1993,1993,3,4,0,0,-"],Falk:["1937,1938,8,0,0,60,S","1938,1942,2,0:19,0,0,-","1939,1939,9,1,0,60,S","1940,1942,8,0,0,60,S","1943,1943,0,1,0,0,-","1983,1983,8,0,0,60,S","1984,1985,3,0,0,0,-","1984,1984,8,16,0,60,S","1985,2000,8,0:9,0,60,S","1986,2000,3,0:16,0,0,-","2001,2010,3,0:15,120,0,-","2012,9999,3,0:15,120,0,-","2001,9999,8,0:1,120,60,S"],Para:["1975,1988,9,1,0,60,S","1975,1978,2,1,0,0,-","1979,1991,3,1,0,0,-","1989,1989,9,22,0,60,S","1990,1990,9,1,0,60,S","1991,1991,9,6,0,60,S","1992,1992,2,1,0,0,-","1992,1992,9,5,0,60,S","1993,1993,2,31,0,0,-","1993,1995,9,1,0,60,S","1994,1995,1,0,0,0,-","1996,1996,2,1,0,0,-","1996,2001,9,0:1,0,60,S","1997,1997,1,0,0,0,-","1998,2001,2,0:1,0,0,-","2002,2004,3,0:1,0,0,-","2002,2003,8,0:1,0,60,S","2004,2009,9,0:15,0,60,S","2005,2009,2,0:8,0,0,-","2010,9999,9,0:1,0,60,S","2010,9999,3,0:8,0,0,-"],Peru:["1938,1938,0,1,0,60,S","1938,1938,3,1,0,0,-","1938,1939,8,0,0,60,S","1939,1940,2,0:24,0,0,-","1986,1987,0,1,0,60,S","1986,1987,3,1,0,0,-","1990,1990,0,1,0,60,S","1990,1990,3,1,0,0,-","1994,1994,0,1,0,60,S","1994,1994,3,1,0,0,-"],Uruguay:["1923,1923,9,2,0,30,HS","1924,1926,3,1,0,0,-","1924,1925,9,1,0,30,HS","1933,1935,9,0,0,30,HS","1934,1936,2,6:25,1380,0,-","1936,1936,10,1,0,30,HS","1937,1941,2,0,0,0,-","1937,1940,9,0,0,30,HS","1941,1941,7,1,0,30,HS","1942,1942,0,1,0,0,-","1942,1942,11,14,0,60,S","1943,1943,2,14,0,0,-","1959,1959,4,24,0,60,S","1959,1959,10,15,0,0,-","1960,1960,0,17,0,60,S","1960,1960,2,6,0,0,-","1965,1967,3,0:1,0,60,S","1965,1965,8,26,0,0,-","1966,1967,9,31,0,0,-","1968,1970,4,27,0,30,HS","1968,1970,11,2,0,0,-","1972,1972,3,24,0,60,S","1972,1972,7,15,0,0,-","1974,1974,2,10,0,30,HS","1974,1974,11,22,0,60,S","1976,1976,9,1,0,0,-","1977,1977,11,4,0,60,S","1978,1978,3,1,0,0,-","1979,1979,9,1,0,60,S","1980,1980,4,1,0,0,-","1987,1987,11,14,0,60,S","1988,1988,2,14,0,0,-","1988,1988,11,11,0,60,S","1989,1989,2,12,0,0,-","1989,1989,9,29,0,60,S","1990,1992,2,0:1,0,0,-","1990,1991,9,0:21,0,60,S","1992,1992,9,18,0,60,S","1993,1993,1,28,0,0,-","2004,2004,8,19,0,60,S","2005,2005,2,27,120,0,-","2005,2005,9,9,120,60,S","2006,2006,2,12,120,0,-","2006,9999,9,0:1,120,60,S","2007,9999,2,0:8,120,0,-"]},zones:{"null":["0"],"America/Argentina/Buenos_Aires":["-127,-,LMT,1894,Oct,31","-224,-,CMT,1920,May,","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,Arg,AR%sT"],"America/Argentina/Cordoba":["-224,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1991,Mar,3","-240,-,WART,1991,Oct,20","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,Arg,AR%sT"],"America/Argentina/Salta":["-219,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1991,Mar,3","-240,-,WART,1991,Oct,20","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/Tucuman":["-220,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1991,Mar,3","-240,-,WART,1991,Oct,20","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,Jun,1","-240,-,WART,2004,Jun,13","-180,Arg,AR%sT"],"America/Argentina/La_Rioja":["-213,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1991,Mar,1","-240,-,WART,1991,May,7","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,Jun,1","-240,-,WART,2004,Jun,20","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/San_Juan":["-206,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1991,Mar,1","-240,-,WART,1991,May,7","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,May,31","-240,-,WART,2004,Jul,25","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/Jujuy":["-219,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1990,Mar,4","-240,-,WART,1990,Oct,28","-240,1:00,WARST,1991,Mar,17","-240,-,WART,1991,Oct,6","-180,1:00,ARST,1992","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/Catamarca":["-217,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1991,Mar,3","-240,-,WART,1991,Oct,20","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,Jun,1","-240,-,WART,2004,Jun,20","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/Mendoza":["-205,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1990,Mar,4","-240,-,WART,1990,Oct,15","-240,1:00,WARST,1991,Mar,1","-240,-,WART,1991,Oct,15","-240,1:00,WARST,1992,Mar,1","-240,-,WART,1992,Oct,18","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,May,23","-240,-,WART,2004,Sep,26","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/San_Luis":["-215,-,LMT,1894,Oct,31","-224,-,CMT,1920,May","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1990","-180,1:00,ARST,1990,Mar,14","-240,-,WART,1990,Oct,15","-240,1:00,WARST,1991,Mar,1","-240,-,WART,1991,Jun,1","-180,-,ART,1999,Oct,3","-240,1:00,WARST,2000,Mar,3","-180,-,ART,2004,May,31","-240,-,WART,2004,Jul,25","-180,Arg,AR%sT,2008,Jan,21","-240,SanLuis,WAR%sT"],"America/Argentina/Rio_Gallegos":["-204,-,LMT,1894,Oct,31","-224,-,CMT,1920,May,","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,Jun,1","-240,-,WART,2004,Jun,20","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Argentina/Ushuaia":["-207,-,LMT,1894,Oct,31","-224,-,CMT,1920,May,","-240,-,ART,1930,Dec","-240,Arg,AR%sT,1969,Oct,5","-180,Arg,AR%sT,1999,Oct,3","-240,Arg,AR%sT,2000,Mar,3","-180,-,ART,2004,May,30","-240,-,WART,2004,Jun,20","-180,Arg,AR%sT,2008,Oct,18","-180,-,ART"],"America/Aruba":["-200,-,LMT,1912,Feb,12,","-210,-,ANT,1965,","-240,-,AST"],"America/La_Paz":["-208,-,LMT,1890","-208,-,CMT,1931,Oct,15,","-208,1:00,BOST,1932,Mar,21,","-240,-,BOT,"],"America/Noronha":["-111,-,LMT,1914","-120,Brazil,FN%sT,1990,Sep,17","-120,-,FNT,1999,Sep,30","-120,Brazil,FN%sT,2000,Oct,15","-120,-,FNT,2001,Sep,13","-120,Brazil,FN%sT,2002,Oct,1","-120,-,FNT"],"America/Belem":["-167,-,LMT,1914","-180,Brazil,BR%sT,1988,Sep,12","-180,-,BRT"],"America/Santarem":["-142,-,LMT,1914","-240,Brazil,AM%sT,1988,Sep,12","-240,-,AMT,2008,Jun,24,00:00","-180,-,BRT"],"America/Fortaleza":["-86,-,LMT,1914","-180,Brazil,BR%sT,1990,Sep,17","-180,-,BRT,1999,Sep,30","-180,Brazil,BR%sT,2000,Oct,22","-180,-,BRT,2001,Sep,13","-180,Brazil,BR%sT,2002,Oct,1","-180,-,BRT"],"America/Recife":["-101,-,LMT,1914","-180,Brazil,BR%sT,1990,Sep,17","-180,-,BRT,1999,Sep,30","-180,Brazil,BR%sT,2000,Oct,15","-180,-,BRT,2001,Sep,13","-180,Brazil,BR%sT,2002,Oct,1","-180,-,BRT"],"America/Araguaina":["-168,-,LMT,1914","-180,Brazil,BR%sT,1990,Sep,17","-180,-,BRT,1995,Sep,14","-180,Brazil,BR%sT,2003,Sep,24","-180,-,BRT"],"America/Maceio":["-98,-,LMT,1914","-180,Brazil,BR%sT,1990,Sep,17","-180,-,BRT,1995,Oct,13","-180,Brazil,BR%sT,1996,Sep,4","-180,-,BRT,1999,Sep,30","-180,Brazil,BR%sT,2000,Oct,22","-180,-,BRT,2001,Sep,13","-180,Brazil,BR%sT,2002,Oct,1","-180,-,BRT"],"America/Bahia":["-86,-,LMT,1914","-180,Brazil,BR%sT,2003,Sep,24","-180,-,BRT,2011,Oct,16","-180,Brazil,BR%sT"],"America/Sao_Paulo":["-174,-,LMT,1914","-180,Brazil,BR%sT,1963,Oct,23,00:00","-180,1:00,BRST,1964","-180,Brazil,BR%sT"],"America/Campo_Grande":["-142,-,LMT,1914","-240,Brazil,AM%sT"],"America/Cuiaba":["-136,-,LMT,1914","-240,Brazil,AM%sT,2003,Sep,24","-240,-,AMT,2004,Oct,1","-240,Brazil,AM%sT"],"America/Porto_Velho":["-225,-,LMT,1914","-240,Brazil,AM%sT,1988,Sep,12","-240,-,AMT"],"America/Boa_Vista":["-238,-,LMT,1914","-240,Brazil,AM%sT,1988,Sep,12","-240,-,AMT,1999,Sep,30","-240,Brazil,AM%sT,2000,Oct,15","-240,-,AMT"],"America/Manaus":["-240,-,LMT,1914","-240,Brazil,AM%sT,1988,Sep,12","-240,-,AMT,1993,Sep,28","-240,Brazil,AM%sT,1994,Sep,22","-240,-,AMT"],"America/Eirunepe":["-201,-,LMT,1914","-300,Brazil,AC%sT,1988,Sep,12","-300,-,ACT,1993,Sep,28","-300,Brazil,AC%sT,1994,Sep,22","-300,-,ACT,2008,Jun,24,00:00","-240,-,AMT"],"America/Rio_Branco":["-209,-,LMT,1914","-300,Brazil,AC%sT,1988,Sep,12","-300,-,ACT,2008,Jun,24,00:00","-240,-,AMT"],"America/Santiago":["-198,-,LMT,1890","-198,-,SMT,1910,","-300,-,CLT,1916,Jul,1,","-198,-,SMT,1918,Sep,1,","-240,-,CLT,1919,Jul,1,","-198,-,SMT,1927,Sep,1,","-300,Chile,CL%sT,1947,May,22,","-240,Chile,CL%sT"],"Pacific/Easter":["-403,-,LMT,1890","-403,-,EMT,1932,Sep,","-420,Chile,EAS%sT,1982,Mar,13,21:00,","-360,Chile,EAS%sT"],"America/Bogota":["-184,-,LMT,1884,Mar,13","-184,-,BMT,1914,Nov,23,","-300,CO,CO%sT,"],"America/Curacao":["-205,-,LMT,1912,Feb,12,","-210,-,ANT,1965,","-240,-,AST"],"America/Guayaquil":["-281,-,LMT,1890","-286,-,QMT,1931,","-300,-,ECT,"],"Pacific/Galapagos":["-242,-,LMT,1931,","-300,-,ECT,1986","-360,-,GALT,"],"Atlantic/Stanley":["-129,-,LMT,1890","-129,-,SMT,1912,Mar,12,","-240,Falk,FK%sT,1983,May,","-180,Falk,FK%sT,1985,Sep,15","-240,Falk,FK%sT"],"America/Cayenne":["-151,-,LMT,1911,Jul","-240,-,GFT,1967,Oct,","-180,-,GFT"],"America/Guyana":["-128,-,LMT,1915,Mar,","-135,-,GBGT,1966,May,26,","-135,-,GYT,1975,Jul,31,","-180,-,GYT,1991","-240,-,GYT"],"America/Asuncion":["-130,-,LMT,1890","-130,-,AMT,1931,Oct,10,","-240,-,PYT,1972,Oct,","-180,-,PYT,1974,Apr","-240,Para,PY%sT"],"America/Lima":["-292,-,LMT,1890","-292,-,LMT,1908,Jul,28,","-300,Peru,PE%sT,"],"Atlantic/South_Georgia":["-94,-,LMT,1890,","-120,-,GST,"],"America/Paramaribo":["-140,-,LMT,1911","-140,-,PMT,1935,","-140,-,PMT,1945,Oct,","-150,-,NEGT,1975,Nov,20,","-150,-,SRT,1984,Oct,","-180,-,SRT"],"America/Port_of_Spain":["-234,-,LMT,1912,Mar,2","-240,-,AST"],"America/Montevideo":["-136,-,LMT,1898,Jun,28","-136,-,MMT,1920,May,1,","-150,Uruguay,UY%sT,1942,Dec,14,","-180,Uruguay,UY%sT"],"America/Caracas":["-213,-,LMT,1890","-213,-,CMT,1912,Feb,12,","-210,-,VET,1965,","-240,-,VET,2007,Dec,9,03:00","-210,-,VET"]},lastZone:"America/Caracas"};
function B(C){C.addRules(A.rules);
C.addZones(A.zones)
}if(typeof module!=="undefined"){module.exports=A
}else{if(typeof define==="function"&&define.amd){define(["moment-timezone"],B)
}if(this.moment&&this.moment.tz){B(this.moment.tz)
}}}).call(this);
var dailybeast=dailybeast||{};
dailybeast.componentHierarchy={"education/components/content/featureimage/featuredimage":"foundation/components/parbase","newsweek/components/page/graphicpage":"newsweek/components/page/contentpage","education/components/content/inlinerelated":"newsweek/components/content/inlinerelated","witw/components/pages/gallery":"witw/components/pages/atomic","dailybeast/components/gallery":"foundation/components/parbase","dailybeast/components/grid":"foundation/components/parsys","dailybeast/components/pages/gallery2":"dailybeast/components/page","dailybeast/components/inlineimage":"dailybeast/components/image","dailybeast/components/pages/topic":"dailybeast/components/page","education/components/content/feature/image":"foundation/components/parbase","dailybeast/components/pagelist/combo":"dailybeast/components/pagelist/item","education/components/page/interactivepage":"education/components/page/contentpage","mobilebeast/components/gallery":"dailybeast/components/gallery","dailybeast/components/home/photoslider":"foundation/components/parsys","witw/components/gallery/slide":"dailybeast/components/gallery2/slide","dailybeast/components/pages/cheatsheet":"dailybeast/components/page","newsweek/components/content/mainimage":"dailybeast/components/inlineimage","newsweek/components/content/advertising":"dailybeast/components/ads/breakout","mobilebeast/components/pages/article":"mobilebeast/components/page","education/components/content/byline":"newsweek/components/content/byline","witw/components/links":"dailybeast/components/links","education/components/page/authorspage":"education/components/page/contentpage","education/components/content/vimeo":"newsweek/components/content/vimeo","dailybeast/components/topic/layout3/featurepanel/feature":"dailybeast/components/pagelist/item","education/components/content/brightcove":"newsweek/components/content/brightcove","newsweek/components/pages/blogentry":"dailybeast/components/pages/article","witw/components/cheatreference":"dailybeast/components/cheatreference","newsweek/components/content/brightcove":"dailybeast/components/video/brightcove","dailybeast/components/pages/gallery":"dailybeast/components/page","mobilebeast/components/pages/search":"mobilebeast/components/page","witw/components/pages/atomic":"witw/components/page","newsweek/components/content/flash":"foundation/components/parbase","dailybeast/components/pages/video":"dailybeast/components/page","education/components/page/searchpage":"education/components/page/contentpage","newsweek/components/content/youtube":"dailybeast/components/video/youtube","dailybeast/components/topic/videolist":"dailybeast/components/pagelist","dailybeast/wcm/components/newsletter":"foundation/components/page","newsweek/components/pages/section":"dailybeast/components/page","newsweek/components/section/slider":"dailybeast/components/slider","witw/components/video/livestream":"dailybeast/components/video/livestream","dailybeast/wcm/components/reference":"foundation/components/parbase","dailybeast/components/topic/layout2/slider":"dailybeast/components/slider","dailybeast/components/oembed":"newsweek/components/content/oembed","education/components/content/hulu":"newsweek/components/content/hulu","education/components/page/homepage":"education/components/page/contentpage","education/components/content/featureimage/image":"foundation/components/parbase","dailybeast/components/topic/layout1/top":"dailybeast/components/pagelist/combo","mobilenewsweek/components/section/features":"newsweek/components/section/features","dailybeast/components/trendingtopics":"dailybeast/components/links","dailybeast/wcm/components/heading":"dailybeast/components/page","dailybeast/components/tout":"foundation/components/parbase","dailybeast/components/home/contributors":"foundation/components/parsys","education/components/content/mainimage":"newsweek/components/content/mainimage","foundation/components/text":"foundation/components/parbase","education/components/content/youtube":"newsweek/components/content/youtube","dailybeast/components/pages/cheatstream":"dailybeast/components/pages/cheatsheet","dailybeast/components/home/partnerstory":"dailybeast/components/home/story","dailybeast/components/pages/grid12":"dailybeast/components/page","mobilebeast/components/ads/advertising":"dailybeast/components/ads/advertising","mobilebeast/components/text":"dailybeast/components/text","mobilebeast/components/pages/videos":"mobilebeast/components/page","witw/components/snippet":"dailybeast/components/snippet","education/components/content/collegerankingteasers":"foundation/components/parbase","witw/components/pages/wrap":"witw/components/page","mobilebeast/components/pages/video":"mobilebeast/components/page","dailybeast/components/topic/layout2/video":"dailybeast/components/pagelist/item","witw/components/page":"dailybeast/components/page","education/components/content/advertising":"newsweek/components/content/advertising","dailybeast/components/topic/highlight":"dailybeast/components/pagelist/combo","dailybeast/components/topic/layout2/featuredvideo":"dailybeast/components/pagelist/item","dailybeast/components/text":"foundation/components/parbase","dailybeast/components/flash":"foundation/components/parbase","dailybeast/components/ads/breakout":"dailybeast/components/ads/advertising","mobilebeast/components/storify":"dailybeast/components/storify","witw/components/video/brightcove":"dailybeast/components/video/brightcove","witw/components/pages/article":"witw/components/pages/atomic","education/components/content/comments":"newsweek/components/content/comments","dailybeast/components/topic/layout2/nophoto":"dailybeast/components/pagelist/combo","education/components/page/generalcontentpage":"education/components/page/contentpage","newsweek/components/page/contentpage":"foundation/components/page","dailybeast/components/home/features":"foundation/components/parsys","dailybeast/components/pages/article":"dailybeast/components/page","dailybeast/components/wrap/curatedpage":"dailybeast/components/page","dailybeast/components/pages/home":"dailybeast/components/page","education/components/content/searchresults":"newsweek/component/content/search","witw/components/text":"dailybeast/components/text","newsweek/components/section/slider/slide":"dailybeast/components/slider/slide","education/components/content/featureimage":"education/components/content/feature","education/components/page/articlepage":"education/components/page/contentpage","newsweek/components/pages/video":"dailybeast/components/pages/video","mobilebeast/components/pages/cheatsheet":"mobilebeast/components/page","dailybeast/components/topic/layout1/large":"dailybeast/components/topic/highlight","newsweek/components/content/vimeo":"dailybeast/components/video/vimeo","newsweek/components/page/videopage":"/apps/newsweek/components/pages/video","education/components/page/videopage":"education/components/page/mediapage","dailybeast/components/pages/content":"dailybeast/components/page","mobilebeast/components/pages/gallery":"mobilebeast/components/page","education/components/content/bigtextimagetease/image":"foundation/components/parbase","education/components/page/landingpage":"education/components/page/articlepage","dailybeast/components/home/gallery":"foundation/components/image","witw/components/pages/tweet":"witw/components/pages/atomic","dailybeast/components/topic/layout3/featurepanel":"foundation/components/parsys","dailybeast/components/pages/wrap":"dailybeast/components/page","dailybeast/components/pages/videos":"dailybeast/components/page","newsweek/components/page/articlepage":"newsweek/components/pages/article","dailybeast/components/listicle":"foundation/components/parsys","dailybeast/oracle/components/page":"dailybeast/components/page","education/components/content/taglist":"newsweek/components/content/taglist","education/components/page/contentpage":"newsweek/components/page/contentpage","mobilenewsweek/components/page/articlepage":"mobilenewsweek/components/pages/article","witw/components/ads/advertising":"dailybeast/components/ads/advertising","education/components/content/sharetools":"newsweek/components/content/sharetools","education/components/content/sponsoredimage":"foundation/components/parbase","dailybeast/components/listicle/new":"foundation/components/parsys/new","dailybeast/components/slider":"foundation/components/parsys","dailybeast/components/gallery2":"foundation/components/parbase","mobilenewsweek/components/pages/section":"mobilebeast/components/page","newsweek/components/pages/article":"dailybeast/components/pages/article","dailybeast/components/wrap/contributors":"dailybeast/components/page","dailybeast/components/topic/layout2/gallery":"dailybeast/components/pagelist/item","mobilebeast/components/pages/home":"mobilebeast/components/page","dailybeast/components/twitter/list":"dailybeast/components/twitter/search","witw/components/pages/video":"witw/components/pages/atomic","witw/components/gallery":"dailybeast/components/gallery2","geometrixx/components/assetshare":"geometrixx/components/page","witw/components/video/youtube":"dailybeast/components/video/youtube","newsweek/components/page/packagepage":"newsweek/components/page/contentpage","dailybeast/components/pages/cheatsheet/parsys":"foundation/components/parsys","dailybeast/components/gallery/slide/image":"dailybeast/components/image","dailybeast/components/pages/author":"dailybeast/components/page","mobilebeast/components/slider":"dailybeast/components/text","mobilebeast/components/inlineimage":"dailybeast/components/inlineimage","geometrixx/components/widepage":"geometrixx/components/page","education/components/page/flowlistpage":"education/components/page/contentpage","education/components/content/collegerankingteasers/image":"foundation/components/parbase","dailybeast/components/topic/videolist/video":"dailybeast/components/pagelist/item","dailybeast/components/topic/layout1/medium":"dailybeast/components/topic/highlight","mobilenewsweek/components/pages/article":"mobilebeast/components/pages/article","dailybeast/components/topic/layout2/withphoto":"dailybeast/components/pagelist/combo","witw/components/pages/topic":"witw/components/page","witw/components/pullquote":"dailybeast/components/pullquote","witw/components/pages/cheat":"witw/components/pages/article","dailybeast/components/pages/cheat":"dailybeast/components/pages/cheatsheet","mobilebeast/components/pages/grid12":"mobilebeast/components/page","dailybeast/components/topic/gallerylist/gallery":"dailybeast/components/pagelist/item","newsweek/components/section/stories":"foundation/components/parsys","dailybeast/components/home/galleries":"foundation/components/parbase","dailybeast/components/pages/profile":"dailybeast/components/page","education/components/content/image":"foundation/components/parbase","newsweek/components/page/interactivepage":"dailybeast/components/pages/interactive","newsweek/components/content/pagebreak":"dailybeast/components/pagebreak","dailybeast/components/topic/layout3/medium":"dailybeast/components/pagelist/combo","geometrixx/components/contentpage":"geometrixx/components/page","mobilebeast/components/twitter/widget":"dailybeast/components/twitter/widget","geometrixx/components/homepage":"geometrixx/components/page","mobilebeast/components/pages/content":"mobilebeast/components/page","mobilebeast/components/blockquote":"dailybeast/components/blockquote","education/components/content/simpleimage":"newsweek/components/content/image","education/components/page/blogpage":"education/components/page/contentpage","newsweek/components/page/seriespage":"foundation/components/page","dailybeast/components/ads/floatingad":"dailybeast/components/ads/advertising","education/components/content/pagebreak":"newsweek/components/content/pagebreak","geometrixx/components/forum":"geometrixx/components/page","geometrixx/components/mobilecontentpage":"wcm/mobile/components/page","newsweek/components/page/magazinepreviewpage":"foundation/components/page","mobilebeast/components/pages/wrap":"mobilebeast/components/page","mobilebeast/components/page":"dailybeast/components/page","dailybeast/wcm/components/partners":"dailybeast/components/page","geometrixx/components/page":"foundation/components/page","dailybeast/components/gallery2/slide/image":"dailybeast/components/image","education/components/page/tagpage":"education/components/page/contentpage","mobilebeast/components/pages/topic":"mobilebeast/components/page","education/components/content/mostpopularmultimedia":"newsweek/components/content/mostpopularmultimedia","education/components/content/flowlist":"newsweek/components/content/flowlist","education/components/content/blogimage":"foundation/components/parbase","dailybeast/components/topic/layout1/featuredvideo":"dailybeast/components/pagelist/item","dailybeast/components/pages/archive":"dailybeast/components/pages/content","geometrixx/components/productlist":"foundation/components/parbase","dailybeast/components/topic/gallerylist":"dailybeast/components/pagelist","dailybeast/components/topic/layout2/slider/slide":"dailybeast/components/pagelist/item","mobilebeast/components/callout":"dailybeast/components/callout","dailybeast/components/wrap/switcher":"foundation/components/parsys","dailybeast/components/newsletters":"foundation/components/parsys","dailybeast/components/topic/layout6/story":"dailybeast/components/pagelist/item","dailybeast/components/insights":"foundation/components/parsys","witw/components/oembed":"dailybeast/components/oembed","dailybeast/components/contentimage":"foundation/components/image","dailybeast/components/twitter/widget":"foundation/components/parbase","education/components/page/blogentrypage":"education/components/page/articlepage","dailybeast/components/pages/search":"dailybeast/components/page","mobilebeast/components/pages/company":"mobilebeast/components/page","education/components/page/mediapage":"education/components/page/contentpage","newsweek/components/content/image":"dailybeast/components/image","dailybeast/components/topic/layout3/featuredgallery":"dailybeast/components/pagelist/item","dailybeast/components/pages/listicle":"dailybeast/components/pages/article","witw/components/pages/home":"witw/components/page","dailybeast/components/topic/layout3/large":"dailybeast/components/pagelist/combo","mobilebeast/components/pages/cheat":"mobilebeast/components/page","newsweek/components/content/inlineimage":"dailybeast/components/inlineimage","mobilebeast/components/pages/gallery2":"mobilebeast/components/pages/gallery","witw/components/hero":"dailybeast/components/wrap/curatedpage","dailybeast/wcm/components/breakout":"dailybeast/components/page","education/components/content/feature":"foundation/components/parbase","geometrixx/components/newsletterpage":"mcm/components/newsletter/page","witw/components/tout":"dailybeast/components/wrap/curatedpage","dailybeast/wcm/components/partner":"dailybeast/components/page","geometrixx/components/list":"foundation/components/list","dailybeast/components/image":"foundation/components/image","dailybeast/components/pages/interactive":"dailybeast/components/pages/article","education/components/content/authorsidebar":"newsweek/components/content/authorsidebar","newsweek/components/pages/gallery":"dailybeast/components/pages/gallery","dailybeast/components/home/teaser":"foundation/components/parbase","dailybeast/components/pages/blogentry":"dailybeast/components/pages/article","dailybeast/components/pages/rankings":"dailybeast/components/page","foundation/components/image":"foundation/components/parbase","dailybeast/components/home/stories":"foundation/components/parsys","education/components/content/inlineimage":"newsweek/components/content/inlineimage","witw/components/inlineimage":"dailybeast/components/inlineimage","geometrixx/components/title":"foundation/components/title","geometrixx/components/asseteditor":"geometrixx/components/page","dailybeast/components/home/suggestions":"foundation/components/parsys","education/components/content/flowlistimage":"newsweek/components/content/image","newsweek/components/page/blogentrypage":"newsweek/components/page/articlepage","dailybeast/components/pagelist":"foundation/components/parsys","dailybeast/components/page":"foundation/components/page","dailybeast/components/pages/company":"dailybeast/components/page","mobilebeast/components/pages/author":"mobilebeast/components/page","newsweek/components/page/mediapage":"newsweek/components/pages/gallery","newsweek/components/page/blogpage":"dailybeast/components/pages/content","witw/components/video/vimeo":"dailybeast/components/video/vimeo","education/components/content/flash":"newsweek/components/content/flash"};
(function(){dust.register("dailybeast/components/ads/advertising/advertisement",E);
function E(H,G){return H.exists(G.get("badgeEnabled"),G,{block:D},null).write('<div class="ad ').reference(G.get("name"),G,"h").write(" ").reference(G.get("position"),G,"h").write('" data-advertising="{siteID: \'').reference(G.get("siteId"),G,"h").write("', zone: '").reference(G.get("zone"),G,"h").write("', template: '").reference(G.get("template"),G,"h").write("', size: '").reference(G.get("size"),G,"h").write("', tile: '").reference(G.get("tile"),G,"h").write("', iFrame: ").exists(G.get("iFrame"),G,{"else":C,block:B},null).write(", disable: '").exists(G.get("disabled"),G,{"else":A,block:F},null).write("', params: '").reference(G.get("parameters"),G,"h").write("'}\"></div>")
}function D(H,G){return H.write('<div class="ad ad-badge ').reference(G.get("position"),G,"h").write('">- Advertisement -</div>')
}function C(H,G){return H.write("false")
}function B(H,G){return H.write("true")
}function A(H,G){return H.write("false")
}function F(H,G){return H.write("true")
}return E
})();
(function(){dust.register("dailybeast/components/gallery2/thumbnails/thumbnails",E);
function E(G,F){return G.section(F.get("slice"),F,{block:D},{of:F.get("slides"),start:F.get("thumbnailStart"),end:F.get("thumbnailEnd")})
}function D(G,F){return G.write("<li ").section(F.get("atIndex"),F,{block:C},{index:F.get("currentSlide")}).write('><a href="').reference(F.get("url"),F,"h").write('"><img alt="" src="').reference(F.getPath(false,["thumbnail","sizes","default"]),F,"h").write('"/>').section(F.get("isIntro"),F,{"else":B,block:A},null).write("</a></li>")
}function C(G,F){return G.write('class="active"')
}function B(G,F){return G.write('<div class="number">').reference(F.get("slideNumber"),F,"h").write("</div>")
}function A(G,F){return G
}return E
})();
(function(){dust.register("dailybeast/components/gallery2/thumbnails/main",A);
function A(C,B){return C.write('<div class="slide-thumbnail-wrapper"><div class="slide-thumbnail"><a class="previous small" href="#"><i></i></a><a class="next small" href="#"><i></i></a><ul class="slide-inner-wrapper clearfix">').partial("dailybeast/components/gallery2/thumbnails/thumbnails",B,null).write("</ul></div></div>")
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/related/relatedgallery",A);
function A(C,B){return C.write('<a class="related-gallery" href=""><img src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg" class="image" /><div class="title-container"><div class="title">LOADING...</div></div></a>')
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/related/relatedgalleries",C);
function C(E,D){return E.write('<div class="related-galleries"><div class="replay-button-wrapper"><span class="replay-button"><span class="replay-button-content">REPLAY GALLERY</span></span></div><div class="header">').reference(D.get("relatedGalleriesTitle"),D,"h").write('</div><div class="outer-row"><div class="button-column"><div class="previous-button"></div></div><div class="outer-cell"><div class="slider"><div class="inner-row">').section(D.get("repeat"),D,{block:B},{count:"20"}).write('</div><div class="inner-row">').section(D.get("repeat"),D,{block:A},{count:"20"}).write('</div></div></div><div class="button-column"><div class="next-button"></div></div></div>').partial("dailybeast/components/ads/advertising/advertisement",D.rebase(D.get("relatedAd")),null).write("</div>")
}function B(E,D){return E.partial("dailybeast/components/gallery2/related/relatedgallery",D,null)
}function A(E,D){return E.partial("dailybeast/components/gallery2/related/relatedgallery",D,null)
}return C
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/pagination",C);
function C(E,D){return E.write('<ul class="view-all-pagination">').section(D.get("pagination"),D,{block:B},null).write("</ul>")
}function B(E,D){return E.write('<li class="').exists(D.get("active"),D,{block:A},null).write('"><a href="#" data-offset="').reference(D.get("offset"),D,"h").write('">').reference(D.get("number"),D,"h").write("</a></li>")
}function A(E,D){return E.write("active")
}return C
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/main",A);
function A(C,B){return C.write('<div class="view-all"><div class="view-all-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><div class="slider"><div class="slide">').partial("dailybeast/components/gallery2/viewall/page",B,null).write("</div></div></div>").partial("dailybeast/components/gallery2/viewall/pagination",B,null).write("</div>")
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/slides",B);
function B(D,C){return D.section(C.get("items"),C,{block:A},null)
}function A(D,C){return D.write('<li><a href="').reference(C.get("url"),C,"h").write('"><img src="/etc/clientlibs/dailybeast/img/placeholder/96x96.jpg" data-src="').reference(C.getPath(false,["image","sizes","viewAll"]),C,"h").write('"/></a></li>')
}return B
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/page",A);
function A(C,B){return C.write('<ul class="view-all-slides clearfix">').partial("dailybeast/components/gallery2/viewall/slides",B,null).write("</ul>")
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/moregalleries/galleries",B);
function B(D,C){return D.section(C.get("items"),C,{block:A},null)
}function A(D,C){return D.write('<li><a href="').reference(C.get("url"),C,"h").write('"><span><img alt="').reference(C.get("title"),C,"h").write('" src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg" data-src="').reference(C.get("imageUrl"),C,"h").write('"/></span><h3 class="heading-style-a">').reference(C.get("title"),C,"h").write("</h3></a></li>")
}return B
})();
(function(){dust.register("dailybeast/components/gallery2/moregalleries/main",A);
function A(C,B){return C.write('<div class="more-galleries"><div class="more-galleries-arrows"><a class="previous large" href="#"><i></i></a><a class="next large" href="#"><i></i></a></div><div class="slider"><div class="slide">').partial("dailybeast/components/gallery2/moregalleries/page",B,null).write("</div></div></div>")
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/moregalleries/page",A);
function A(C,B){return C.write('<ul class="items clearfix">').partial("dailybeast/components/gallery2/moregalleries/galleries",B,null).write("</ul>")
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/gallery",B);
function B(D,C){return D.write('<div id="gallery"><div class="container-16">').partial("dailybeast/components/gallery2/header",C,null).write('<div class="gallery-content">').partial("dailybeast/components/gallery2/sharetools",C,null).section(C.get("nth"),C,{block:A},{of:C.get("slides"),n:C.get("currentSlide")}).partial("dailybeast/components/ads/advertising/advertisement",C.rebase(C.get("adInterstitial")),null).write("</div></div></div>")
}function A(D,C){return D.partial("dailybeast/components/gallery2/slide",C,null)
}return B
})();
(function(){dust.register("dailybeast/components/gallery2/aside",E);
function E(J,I){return J.write('<div class="copy-style-b copy"><a class="btn-close-x" href="#"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a>').section(I.get("isIntro"),I,{"else":D,block:C},null).write('<div class="heading-slide"><h2 class="heading-style-t">').reference(I.get("title"),I,"h").write("</h2>").exists(I.get("contentDate"),I,{block:B},null).exists(I.get("location"),I,{block:H},null).exists(I.get("authors"),I,{block:G},null).write('</div><div class="text">').reference(I.get("caption"),I,"h",["s"]).write("</div></div>")
}function D(J,I){return J.write('<span class="listicle-number">').reference(I.get("listicleNumber"),I,"h").write("</span>")
}function C(J,I){return J
}function B(J,I){return J.write('<time class="timestamp" property="dc:created" datetime="').reference(I.get("contentDate"),I,"h").write('" pubdate="pubdate">').helper("formatDate",I,{},{date:I.get("contentDate"),format:"MMM D, YYYY"}).exists(I.get("location"),I,{block:A},null).write("</time>")
}function A(J,I){return J.write(" - ")
}function H(J,I){return J.write('<span class="location">').reference(I.get("location"),I,"h").write("</span>")
}function G(J,I){return J.write('<span class="byline byline-style-a"><span>by</span>\n').section(I.get("authors"),I,{block:F},null).write("</span>")
}function F(J,I){return J.write('<a rel="author" property="foaf:publications" href="').reference(I.get("url"),I,"h").write('">').reference(I.get("name"),I,"h").write("</a>").reference(I.get("comma"),I,"h")
}return E
})();
(function(){dust.register("dailybeast/components/gallery2/header",A);
function A(C,B){return C.write('<div class="heading size1of1"><a class="btn-close-x" href="').reference(B.get("homeUrl"),B,"h").write('"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a><div class="captions-exit"><a class="captions-button" href="#">show captions</a><a class="exit-fullscreen-button" href="#">exit fullscreen</a></div><div class="logo"><a class="primary-logo" href="').reference(B.get("homeUrl"),B,"h").write('" role="navigation" data-track="{\'title\':\'dailybeastlogo\'}"><img src="/etc/clientlibs/dailybeast/img/logo/daily-beast.png" width="93" height="112" alt="The Daily Beast"/></a></div><div class="title-outer-container"><div class="red-line"></div><div class="title-inner-container"><h1 class="title">').reference(B.get("title"),B,"h").write('</h1></div><a href="#" class="more-gallery heading-style-r"><h4>More Galleries</h4></a></div></div>')
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/sharetools",B);
function B(D,C){return D.section(C.get("shareTools"),C,{block:A},null)
}function A(D,C){return D.write('<ul class="sharetools"><li><div st_title="').reference(C.get("escapedTitle"),C,"h").write('" st_url="').reference(C.get("url"),C,"h").write('" st_image="').reference(C.get("shareToolsImage"),C,"h").write('" st_summary="').reference(C.get("escapedDescription"),C,"h").write('"class="st_email_custom">EMAIL</div></li><li class="fbshare lazy-fb-share"data-link="').reference(C.get("url"),C,"h").write('"data-picture="').reference(C.get("shareToolsImage"),C,"h").write('"data-name="').reference(C.get("escapedTitle"),C,"h").write('"data-description="').reference(C.get("escapedDescription"),C,"h").write('"data-redirect-uri="').reference(C.get("url"),C,"h").write('"data-background-image="/etc/clientlibs/dailybeast/img/social/fbshare.png"><a class="fbshare-btn"  onclick="postToFeed(this);"> </a></li><li class="facebook"><fb:like href="').reference(C.get("url"),C,"h").write('" send="false" layout="box_count" width="45" show_faces="false"></fb:like></li><li class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="').reference(C.get("shortUrl"),C,"h").write('"data-counturl="').reference(C.get("url"),C,"h").write('" data-text="').reference(C.get("escapedTitle"),C,"h").write('" data-via="').reference(C.get("twitterVia"),C,"h").write('" data-related="').reference(C.get("twitterRelated"),C,"h").write('"data-count="vertical"></a></li><li class="gplusone"><div class="g-plusone" data-href="').reference(C.get("url"),C,"h").write('" data-size="tall" data-callback="plusClick"></div></li><li class="linkedin lazy-linkedin"><script type="IN/Share" data-url="').reference(C.get("url"),C,"h").write('"><\/script></li></ul>')
}return B
})();
(function(){dust.register("dailybeast/components/gallery2/info",E);
function E(G,F){return G.write('<span class="info">').section(F.get("isIntro"),F,{"else":D,block:B},null).write("</span>")
}function D(G,F){return G.write('<span class="slide-number">').reference(F.get("slideNumber"),F,"h").write(" of ").reference(F.get("totalSlides"),F,"h").write("</span>\n").exists(F.get("credit"),F,{block:C},null)
}function C(G,F){return G.write('<span class="photo-credit" property="dc:creator">').reference(F.get("credit"),F,"h").write("</span>")
}function B(G,F){return G.exists(F.get("credit"),F,{block:A},null)
}function A(G,F){return G.write('<span class="photo-credit no-border" property="dc:creator">').reference(F.get("credit"),F,"h").write("</span>")
}return E
})();
(function(){dust.register("dailybeast/components/gallery2/slide",A);
function A(C,B){return C.write('<div class="content size1of1 clearfix"><div class="main"><div class="img-canvas-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><div class="img-canvas"><img alt="').reference(B.get("title"),B,"h").write('" src="').reference(B.getPath(false,["image","sizes","large"]),B,"h").write('"></div></div><div class="info-thbnail-wrapper"><div class="img-info-wrapper"><div class="img-info">').partial("dailybeast/components/gallery2/info",B,null).write('<div class="fullscreen-view-all"><a class="enter-fullscreen-button" href="#">enter fullscreen</a><a class="view-all-button" href="#viewAll">view all <span class="slide-count">(').reference(B.get("totalSlides"),B,"h").write(")</span></a>\n</div></div></div>").partial("dailybeast/components/gallery2/thumbnails/main",B,null).write("</div>").partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("adFooter")),null).partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("adFullscreen")),null).partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("adFullscreenTracker")),null).write('</div><div class="aside">').partial("dailybeast/components/gallery2/aside",B,null).partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("adAside")),null).write("</div></div>")
}return A
})();
function ArrayDataProvider(A){this.array=A
}ArrayDataProvider.prototype={get:function(B,A,C){if(C){C(this.array.slice(B,A),this.array.length)
}}};
(function(A){function B(C,D){this.array=[];
this.queue=[];
this.busy=false;
this.getUrl=C;
this.count=null;
this.page=0;
this.totalPages=null;
this.settings=A.extend({pageSize:20,listProperty:"list",totalCountProperty:"totalCount",eager:false,eagerness:0.2},D)
}B.prototype={get:function(D,C,F){var E=this.getPageRange(D,C);
if(this.hasMore()&&this.page<E.end){this.queue.push({type:"fetch",pageRange:E});
if(F){this.queue.push({type:"read",startIndex:D,endIndex:C,callback:F})
}}else{this.read(D,C,F);
if(this.settings.eager){this.doEagerFetch(C)
}}if(!this.busy){this.doQueue()
}},indexToPage:function(C){return Math.ceil(C/this.settings.pageSize)
},getPageRange:function(F,D){var E=this.indexToPage(F),C=this.indexToPage(D);
return{start:Math.max(this.page,E),end:C}
},doEagerFetch:function(E){var D=this.page*this.settings.pageSize,C=D-Math.ceil(this.settings.pageSize*this.settings.eagerness);
if(E>=C&&this.hasMore()){this.queue.push({type:"fetch",pageRange:{start:this.page,end:this.page+1}})
}},hasMore:function(){return this.totalPages===null||this.page<this.totalPages
},fetch:function(F){this.busy=true;
var C=this,E=F.start*this.settings.pageSize,D=(F.end-F.start)*this.settings.pageSize;
A.getJSON(this.getUrl(E,D),function(I){var H=I[C.settings.listProperty],G,J;
C.count=I[C.settings.totalCountProperty];
C.totalPages=Math.ceil(C.count/C.settings.pageSize);
for(G=0,J=H.length;
G<J;
G++){C.array[G+E]=H[G]
}C.page=C.indexToPage(E+H.length-1);
C.doQueue()
})
},read:function(D,C,E){if(E){E(this.array.slice(D,C),this.count)
}},queuedRead:function(D,C,E){this.read(D,C,E);
this.doQueue()
},doQueue:function(){var C=this.queue.shift();
if(C!==undefined){if(C.type==="fetch"){this.fetch(C.pageRange)
}else{if(C.type==="read"){this.queuedRead(C.startIndex,C.endIndex,C.callback)
}}}else{this.busy=false
}}};
window.PagedDataProvider=B
})(jQuery);
(function(B){function A(D,E,C){this.$parent=D;
this.$e=null;
this.provider=E;
this.capacity=0;
this.offset=0;
this.focus=0;
this.total=0;
this.eventNamespace="FlexibleGrid"+new Date().getTime();
this.busy=false;
this.settings=B.extend({mainTemplate:"",pageTemplate:"",itemsTemplate:"",itemsWrapperSelector:".items",itemsSelector:".items",slideSelector:".slide",sliderSelector:".slider",paginationTemplate:"",paginationSelector:".pagination",animationDuration:400,initialHeight:0,initialWidth:0,itemWidth:0,itemHeight:0,minRows:1,minColumns:1,afterNext:null,afterPrevious:null,afterRender:null,handleResize:true,onCapacityChange:null},C);
this.pagination=!!this.settings.paginationTemplate;
this.width=this.settings.initialWidth;
this.height=this.settings.initialHeight
}A.prototype={resize:function(E,C){if(this.$e!==null){this.width=E===undefined?this.$e.width():E;
this.height=C===undefined?this.$e.height():C;
var D=this.getMeasurements();
if(D.capacity!=this.capacity){this.capacity=D.capacity;
this.capacityChanged()
}this.resizeElement(D)
}},resizeElement:function(C){this.$e.find(this.settings.itemsSelector).width(C.adjustedWidth).height(C.adjustedHeight);
this.$e.find(this.settings.itemsWrapperSelector).width(C.adjustedWidth);
this.$e.find(this.settings.sliderSelector).width(C.adjustedWidth).height(C.adjustedHeight)
},getMeasurements:function(){var E=this.width-2*this.$e.find(".next").width(),D=Math.max(Math.floor(this.height/this.settings.itemHeight),this.settings.minRows),C=Math.max(Math.floor(E/this.settings.itemWidth),this.settings.minColumns);
return{rows:D,columns:C,capacity:D*C,adjustedWidth:C*this.settings.itemWidth,adjustedHeight:D*this.settings.itemHeight}
},capacityChanged:function(){this.fillCapacity(this.$e.find(this.settings.itemsSelector));
if(this.pagination){this.renderPagination()
}this.updateButtons()
},renderPage:function(F){if(!this.busy&&F!=this.offset){this.busy=true;
var D=this,E=this.$e.find(this.settings.slideSelector),C=F>this.offset;
this.offset=F;
this.focus=F;
renderTemplate(this.settings.pageTemplate,null,function(I){var H=B(I)[C?"appendTo":"prependTo"](E),G=D.getMeasurements();
H.css({width:G.adjustedWidth,height:G.adjustedHeight});
console.log(H);
E.css("left",C?0:-G.adjustedWidth);
D.fillCapacity(H);
E.animate({left:(C?"-=":"+=")+G.adjustedWidth},D.settings.animationDuration,function(){E.find(D.settings.itemsSelector)[C?"first":"last"]().remove();
E.css("left",0);
D.updateButtons();
D.busy=false
})
})
}},renderPagination:function(){var E=this,D=this.getPagination(),C=E.$e.find(this.settings.paginationSelector);
if(D.length>0){renderTemplate(this.settings.paginationTemplate,{pagination:D},function(F){C.replaceWith(F)
})
}else{C.empty()
}},getPagination:function(){var E=[],C;
if(this.capacity!==0&&(C=Math.ceil(this.total/this.capacity))>1){for(var F=0;
F<C;
F++){var G=F*this.capacity,D=G+this.capacity;
E.push({active:G<=this.focus&&this.focus<D,offset:F*this.capacity,number:F+1})
}}return E
},updateButtons:function(){var D=this.$e.find(".previous");
if(this.offset!=0){D.show()
}else{D.hide()
}var C=this.$e.find(".next");
if(this.offset+this.capacity<this.total){C.show()
}else{C.hide()
}this.$e.find(this.settings.paginationSelector).find("li a[data-offset="+this.offset+"]").parent().addClass("active").siblings().removeClass("active")
},bindEvents:function(){var C=this;
this.$e.find(".previous").click(function(){C.renderPage(C.offset-C.capacity);
if(C.settings.afterPrevious){C.settings.afterPrevious()
}return false
});
this.$e.find(".next").click(function(){C.renderPage(C.offset+C.capacity);
if(C.settings.afterNext){C.settings.afterNext()
}return false
});
if(this.pagination){this.$e.on("click",this.settings.paginationSelector+" li a",function(){var D=B(this),E=D.data();
if(E&&E.offset!==undefined){C.renderPage(E.offset)
}if(C.settings.afterPagination){C.settings.afterPagination()
}return false
})
}this.bindWindowEvents()
},bindWindowEvents:function(){var C=this;
if(this.settings.handleResize){B(window).unbind("."+this.eventNamespace).bind("resize."+this.eventNamespace,function(){C.resize()
})
}},unbindWindowEvents:function(){B(window).unbind("."+this.eventNamespace)
},fillCapacity:function(C){var D=this,G=C.find("li"),E=G.length,F=this.getOffsetFromIndex(this.focus);
this.provider.get(F,F+this.capacity,function(J,I){if(D.offset<F){G.slice(0,F-D.offset).remove();
E-=F-D.offset
}else{if(D.offset>F){renderTemplate(D.settings.itemsTemplate,{items:J.slice(0,D.offset-F)},function(K){C.prepend(K);
if(D.settings.afterRender){D.settings.afterRender()
}});
E+=F+D.offset
}}D.offset=F;
if(E<D.capacity&&E<I){var H=J.slice(E,Math.min(D.capacity,I));
renderTemplate(D.settings.itemsTemplate,{items:H},function(K){C.append(K);
if(D.settings.afterRender){D.settings.afterRender()
}})
}})
},show:function(D){D=D===undefined?0:D;
if(this.$e===null){this.focus=D;
var C=this;
renderTemplate(this.settings.mainTemplate,{items:[]},function(F){C.$e=B(F).appendTo(C.$parent);
var E=C.getMeasurements();
C.capacity=E.capacity;
C.provider.get(0,C.capacity,function(H,G){C.total=G;
C.offset=C.getOffsetFromIndex(D);
C.capacityChanged();
C.resizeElement(E)
});
C.bindEvents()
})
}},getOffsetFromIndex:function(C){return Math.min(Math.floor(C/this.capacity)*this.capacity,this.total)
},hide:function(){if(this.$e!==null){this.$e.remove();
this.$e=null
}B(window).unbind("."+this.eventNamespace)
}};
window.FlexibleGrid=A
})(jQuery);
(function(B){function A(F,E,D){this.$container=F;
this.$text=E;
this.settings=B.extend({maxHeight:106,maxFontSize:48,maxLineHeight:53},D);
this.$text.html(B.trim(this.$text.html()));
var C="ftTracer"+new Date().getTime();
this.$text.after("&nbsp;<span class='"+C+"'></span>");
this.$tracer=B("."+C);
this.enable()
}A.prototype={update:function(){if(this.enabled){if(this.$container.width()>this.containerWidth){while(this.shouldGrowFont()){this.growFont()
}}else{while(this.shouldShrinkFont()){this.shrinkFont()
}}this.containerWidth=this.$container.width()
}},reset:function(){if(this.enabled){while(this.shouldGrowFont()){this.growFont()
}while(this.shouldShrinkFont()){this.shrinkFont()
}this.containerWidth=this.$container.width()
}},shrinkFont:function(){this.updateMaxLineCount(0.5)
},growFont:function(){this.updateMaxLineCount(-0.5)
},shouldGrowFont:function(){this.lineCount=this.getLineCount();
return this.fontSize<this.settings.maxFontSize&&(this.lineCount<this.maxLineCount-1||(this.lineCount<this.maxLineCount&&this.$tracer.position().left<this.$container.width()/2))
},shouldShrinkFont:function(){return this.getLineCount()>this.maxLineCount
},updateMaxLineCount:function(C){this.maxLineCount+=C;
this.lineHeight=Math.floor(this.settings.maxHeight/this.maxLineCount);
this.fontSize=Math.floor(this.lineHeight*this.fontSizeRatio);
var D=(this.implicitBottomMargin-this.lineHeight+this.fontSize)*2;
this.$text.css({"font-size":this.fontSize+"px","line-height":this.lineHeight+"px"});
this.$container.css({"margin-bottom":D+"px"})
},getLineCount:function(){return Math.ceil(this.$container.height()/this.lineHeight)
},enable:function(){this.lineHeight=this.settings.maxLineHeight;
this.fontSize=this.settings.maxFontSize;
this.maxLineCount=Math.floor(this.settings.maxHeight/this.lineHeight);
this.fontSizeRatio=this.fontSize/this.lineHeight;
this.implicitBottomMargin=this.lineHeight-this.fontSize;
this.containerWidth=this.$container.width();
this.enabled=true
},disable:function(){this.enabled=false;
this.$text.removeAttr("style");
this.$container.removeAttr("style")
}};
window.FlexibleText=A
})(jQuery);
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
dailybeast.advertising=function(){function display(selector){selector=selector||"";
$(selector+" div[data-advertising]").advertising("refresh",dailybeast.interstitial.getOrd())
}function refresh(target){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isUsingFrames){var random=Math.random().toString();
random=random.substring(2,random.length);
$(".prWrap").each(function(){$(this).remove()
});
if(_.hasValue(target)){$(target).advertising("refresh",random)
}else{$("div[data-advertising]").advertising("refresh",random)
}}}function init(selector){selector=selector||"";
var ord=dailybeast.interstitial.getOrd();
var ads=generateOrderedAdList(selector);
for(var key in ads){var ad=ads[key];
var data=eval("("+ad.attr("data-advertising")+")");
$(ad).advertising({iFrame:data.iFrame,disable:data.disable,siteID:data.siteID,topic:data.topic,size:data.size,zone:data.zone,template:data.template,params:data.params,tile:key,ord:ord})
}}function initSingleAd(ad){var data=eval("("+ad.attr("data-advertising")+")");
var ord=dailybeast.interstitial.getOrd();
$(ad).advertising({iFrame:data.iFrame,disable:data.disable,siteID:data.siteID,topic:data.topic,size:data.size,zone:data.zone,template:data.template,params:data.params,ord:ord})
}function generateOrderedAdList(selector){var ads={};
var adElements=$(selector+" div[data-advertising]");
if(adElements.length==0){adElements=$("div[data-advertising]"+selector)
}adElements.each(function(){var data=eval("("+$(this).attr("data-advertising")+")");
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
}}return{init:init,initSingleAd:initSingleAd,display:display,refresh:refresh,showOverlay:showOverlay}
}();
$.priorityQ.windowReady.add("Advertising",$.priorityQ.CRITICAL,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isUsingFrames){$(".adStory .heading a").bind("click",function(A){A.preventDefault();
window.open($(".adStory").find("div[data-advertising] a").attr("href"))
});
dailybeast.advertising.init();
dailybeast.advertising.display()
}});
var dailybeast=dailybeast||{};
dailybeast.advertising=dailybeast.advertising||{};
dailybeast.advertising.request=function(){var D={siteID:"5480.iac.thedailybeast",tile:1,size:"1x1",keyword:"",params:"",element:""};
function K(O){var P=_.deepClone(D);
_.extend(P,O);
if(!P.ord){P.ord=E()
}var M=H(P.zone);
var Q=dailybeast.interstitial.extract_S_FromZone(M);
var R=dailybeast.interstitial.getShowtag();
var N="";
N+=("http://ad.doubleclick.net/adj/"+P.siteID+"/");
N+=M;
N+=";tile="+P.tile;
N+=";sz="+P.size;
N+=Q;
N+=R;
N+=C(P.element);
N+=J(P.template);
N+=L();
N+=F();
N+=B(P.keyword,P.adParams);
N+=A(P.params);
N+=";ord="+P.ord+"?";
return N
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
}}if(_.hasValue(Q.adKeyword)){P+=";kw="+Q.adKeyword
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
}function J(N){var M="";
if(_.hasValue(N)){M=";template="+N
}else{if(dailybeast.metatags.getTemplate()){M=";template="+dailybeast.metatags.getTemplate()
}}return M
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
(function(){var A=jQuery.event.special,C="D"+(+new Date()),B="D"+(+new Date()+1);
A.scrollstart={setup:function(){var E,D=function(H){var F=this,G=arguments;
if(E){clearTimeout(E)
}else{H.type="scrollstart";
jQuery.event.handle.apply(F,G)
}E=setTimeout(function(){E=null
},A.scrollstop.latency)
};
jQuery(this).bind("scroll",D).data(C,D)
},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(C))
}};
A.scrollstop={latency:350,setup:function(){var E,D=function(H){var F=this,G=arguments;
if(E){clearTimeout(E)
}E=setTimeout(function(){E=null;
H.type="scrollstop";
jQuery.event.handle.apply(F,G)
},A.scrollstop.latency)
};
jQuery(this).bind("scroll",D).data(B,D)
},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(B))
}}
})();
(function(B){var J={},A,K,C=document,H=window,G=C.documentElement,I=B.expando;
B.event.special.inview={add:function(L){J[L.guid+"-"+this[I]]={data:L,$element:B(this)}
},remove:function(L){try{delete J[L.guid+"-"+this[I]]
}catch(M){}}};
function F(){var N,L,M={height:H.innerHeight,width:H.innerWidth};
if(!M.height){N=C.compatMode;
if(N||!B.support.boxModel){L=N==="CSS1Compat"?G:C.body;
M={height:L.clientHeight,width:L.clientWidth}
}}return M
}function D(){return{top:H.pageYOffset||G.scrollTop||C.body.scrollTop,left:H.pageXOffset||G.scrollLeft||C.body.scrollLeft}
}function E(){var P=B(),O,M=0;
B.each(J,function(Z,Y){var W=Y.data.selector,X=Y.$element;
P=P.add(W?X.find(W):X)
});
O=P.length;
if(O){A=A||F();
K=K||D();
for(;
M<O;
M++){if(!B.contains(G,P[M])){continue
}var U=B(P[M]),V={height:U.height(),width:U.width()},L=U.offset(),Q=U.data("inview"),S,R,T;
if(!K||!A){return 
}var N=A.height+parseInt(U.attr("data-sensitivity")||"0");
if(L.top+V.height>K.top&&L.top<K.top+N&&L.left+V.width>K.left&&L.left<K.left+A.width){S=(K.left>L.left?"right":(K.left+A.width)<(L.left+V.width)?"left":"both");
R=(K.top>L.top?"bottom":(K.top+N.height)<(L.top+V.height)?"top":"both");
T=S+"-"+R;
if(!Q||Q!==T){U.data("inview",T).trigger("inview",[true,S,R])
}}else{if(Q){U.data("inview",false).trigger("inview",[false])
}}}}}B(H).bind("scroll resize",function(){A=K=null
});
B(window).bind("scrollstop",E);
B(window).on("load",E);
setInterval(function(){if(!isUserScrolling){E()
}},3000)
})(jQuery);
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
this._trigger("updated",this._currentIndex);
window.scrollTo(0,0)
}else{if(!window.location.hash){window.scrollTo(0,0)
}}if(this._currentIndex==(this._pageCount-1)){this._trigger("finished");
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
function replaceTemplate(B,C,A){renderTemplate(B,C,function(D){A.replaceWith(D)
})
}function renderTemplate(A,B,C){dust.render(A,B,function(E,D){if(E){$.log(E)
}else{C(D)
}})
}var dailybeast=dailybeast||{};
dailybeast.videopage=function(){var A=true;
var I=null;
var K=0;
var P=null;
var M={};
var J={NOW_PLAYING:"Now Playing:",UP_NEXT:"Up Next"};
function O(){if($.cookie("video-continuous")!=null){A=$.cookie("video-continuous")=="true";
if(A){$("#continuous-play").attr("checked","checked")
}else{$("#continuous-play").removeAttr("checked")
}}dailybeast.video.addVideoEventListener(D);
G();
E();
F();
H();
L()
}function C(S){var W=S.videos;
var R="";
var U="";
for(var T=0;
T<W.length;
T++){var V=W[T];
V.nextVideo=(T+1<W.length)?W[T+1]:null;
V.previousVideo=(T>0)?W[T-1]:null;
M[V.id]=V;
var Q="media chapter";
R+='<li data-id="'+V.id+'">';
R+='<a href="#">';
R+='<img width="167" height="112" alt="'+V.name+'" src="'+V.videoStillURL+'">';
R+='<div class="itemData">';
R+='<span class="chapter-number" href="#'+V.id+'">'+U+"</span>";
R+='<h3 class="heading">'+V.name+"</h3>";
R+="</div>";
R+="</a>";
R+="</li>"
}if(!M[P]){M[P]={};
M[P].nextVideo=W[0]
}$(".storyScroller-scrollable .items").append(R);
B(I)
}function E(){$("#continuous-play").live("change",function(Q){N($(this))
})
}function G(){$(".storyScroller-scrollable").scrollable({next:".storyScroller-next",prev:".storyScroller-previous",size:5,api:true});
this.chapterAPI=$(".storyScroller-scrollable").data("scrollable");
var Q=5;
$.each(this.chapterAPI.getItems(),function(R){if(R==1||R%Q==1){var S=$("<a/>").attr("href","#"+(R-1));
S.click(function(T){T.preventDefault();
if("current"!=this.parentElement.className){$(".storyScroller-scrollable").data("scrollable").seekTo(R==1?0:R)
}});
$(".playlist .pagination").append(S)
}});
$(".playlist .pagination a").wrap("<li></li>");
if(this.chapterAPI.getItems().length<=(Q+1)){$(chapterAPI.getConf().next).addClass("disabled")
}this.chapterAPI.onSeek(function(S,R){if(this.getIndex()>=this.getSize()-Q){$(chapterAPI.getConf().next).addClass("disabled")
}var T=$('.playlist .pagination a[href="#'+(this.getIndex()==0?0:this.getIndex()-1)+'"]').parent();
if(T.length!=0){$(".playlist .pagination li").removeClass("current");
T.addClass("current")
}});
this.chapterAPI.onBeforeSeek(function(S,R){if(this.getIndex()==0&&R==5&&this.getSize()>5){$(".storyScroller-scrollable").data("scrollable").seekTo(6);
return false
}else{if(this.getIndex()==6&&R==1){$(".storyScroller-scrollable").data("scrollable").seekTo(0);
return false
}}if(this.getIndex()>=this.getSize()-Q){if(R>this.getIndex()){return false
}}});
setTimeout(function(){F()
},250)
}function F(){var Q=$(".storyScroller-scrollable").find(".current").index();
Q=Q-(Q%5);
if(Q!=K){this.chapterAPI.begin(0).seekTo(Q);
K=Q
}$('.playlist .pagination a[href="#'+Q+'"]').parent().addClass("current")
}function D(Q){if(Q.type=="mediaComplete"||(dailybeast.video.ytAPIReady&&Q.data==YT.PlayerState.ENDED)){var R=M[P];
if($(".current").next().length>0&&A){nextVideoTimeout=setTimeout(function(){var S=location.host;
var T=$(".current").next().find("a:eq(0)").attr("href");
window.location.href="http://"+S+T
},1000)
}}}function N(Q){A=$(Q).is(":checked");
$.cookie("video-continuous",A)
}function H(){if($(".playlist .items").children("li").length>3){var S=$(".playlist li.current");
var Q=S.data("src")==$(".playlist li:last-child").data("src")?$(".playlist li:first-child"):S.next();
var R=S.data("src")==$(".playlist li:first-child").data("src")?$(".playlist li:last-child"):S.prev();
$(".video-image-next").css("background-image","url("+Q.data("src")+")");
$(".video-image-previous").css("background-image","url("+R.data("src")+")");
$(".video-feature a.next").attr("href",Q.find("a").attr("href"));
$(".video-feature a.previous").attr("href",R.find("a").attr("href"))
}}function B(R){var S=$(".storyScroller-scrollable .current");
S.removeClass("current");
S.find(".chapter-number").text("").hide();
S=$(".storyScroller-scrollable li[data-id="+R+"]");
S.addClass("current");
S.find(".chapter-number").text(J.NOW_PLAYING).show();
var Q=S.next("div");
if(Q.length>0){Q.find(".chapter-number").text(J.UP_NEXT).show()
}P=R
}function L(){var R=$(".video-feature-background").width(),Q=215,S=Q/R*100;
newPosition=Math.round(S+50);
$(".video-image-next").css("left",newPosition+"%");
$(".video-image-previous").css("right",newPosition+"%")
}return{init:O,getPlaylistHandler:C,positionNextPreviousImage:L}
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
$.priorityQ.windowReady.add("Font Sizer",$.priorityQ.WHENEVER,function(){if($("body#article-page,body#blogentry-page").length>0){dailybeast.story.setupFontSizer()
}});
(function(C){var A={},B=0;
C.fn.once=function(G,E){if(typeof G!="string"){if(!(G in A)){A[G]=++B
}if(!E){E=G
}G="jquery-once-"+A[G]
}var D=G+"-processed",F=this.not("."+D).addClass(D);
return C.isFunction(E)?F.each(E):F
}
})(jQuery);
/*
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * toolbox/toolbox.expose.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(B){B.tools=B.tools||{version:"v1.2.7"},B.tools.overlay={addEffect:function(F,E,G){D[F]=[E,G]
},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!B.browser.msie||B.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};
var A=[],D={};
B.tools.overlay.addEffect("default",function(E,H){var G=this.getConf(),F=B(window);
G.fixed||(E.top+=F.scrollTop(),E.left+=F.scrollLeft()),E.position=G.fixed?"fixed":"absolute",this.getOverlay().css(E).fadeIn(G.speed,H)
},function(E){this.getOverlay().fadeOut(this.getConf().closeSpeed,E)
});
function C(O,N){var M=this,L=O.add(M),K=B(window),J,I,H,G=B.tools.expose&&(N.mask||N.expose),F=Math.random().toString().slice(10);
G&&(typeof G=="string"&&(G={color:G}),G.closeOnClick=G.closeOnEsc=!1);
var E=N.target||O.attr("rel");
I=E?B(E):null||O;
if(!I.length){throw"Could not find Overlay: "+E
}O&&O.index(I)==-1&&O.click(function(P){M.load(P);
return P.preventDefault()
}),B.extend(M,{load:function(T){if(M.isOpened()){return M
}var P=D[N.effect];
if(!P){throw'Overlay: cannot find effect : "'+N.effect+'"'
}N.oneInstance&&B.each(A,function(){this.close(T)
}),T=T||B.Event(),T.type="onBeforeLoad",L.trigger(T);
if(T.isDefaultPrevented()){return M
}H=!0,G&&B(I).expose(G);
var U=N.top,S=N.left,R=I.outerWidth({margin:!0}),Q=I.outerHeight({margin:!0});
typeof U=="string"&&(U=U=="center"?Math.max((K.height()-Q)/2,0):parseInt(U,10)/100*K.height()),S=="center"&&(S=Math.max((K.width()-R)/2,0)),P[0].call(M,{top:U,left:S},function(){H&&(T.type="onLoad",L.trigger(T))
}),G&&N.closeOnClick&&B.mask.getMask().one("click",M.close),N.closeOnClick&&B(document).on("click."+F,function(V){B(V.target).parents(I).length||M.close(V)
}),N.closeOnEsc&&B(document).on("keydown."+F,function(V){V.keyCode==27&&M.close(V)
});
return M
},close:function(P){if(!M.isOpened()){return M
}P=P||B.Event(),P.type="onBeforeClose",L.trigger(P);
if(!P.isDefaultPrevented()){H=!1,D[N.effect][1].call(M,function(){P.type="onClose",L.trigger(P)
}),B(document).off("click."+F+" keydown."+F),G&&B.mask.close();
return M
}},getOverlay:function(){return I
},getTrigger:function(){return O
},getClosers:function(){return J
},isOpened:function(){return H
},getConf:function(){return N
}}),B.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(P,Q){B.isFunction(N[Q])&&B(M).on(Q,N[Q]),M[Q]=function(R){R&&B(M).on(Q,R);
return M
}
}),J=I.find(N.close||".close"),!J.length&&!N.close&&(J=B('<a class="close"></a>'),I.prepend(J)),J.click(function(P){M.close(P)
}),N.load&&M.load()
}B.fn.overlay=function(F){var E=this.data("overlay");
if(E){return E
}B.isFunction(F)&&(F={onBeforeLoad:F}),F=B.extend(!0,{},B.tools.overlay.conf,F),this.each(function(){E=new C(B(this),F),A.push(E),B(this).data("overlay",E)
});
return F.api?E:this
}
})(jQuery);
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
(function(I){I.tools=I.tools||{version:"v1.2.7"};
var H;
H=I.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};
function G(){if(I.browser.msie){var J=I(document).height(),K=I(window).height();
return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,J-K<20?K:J]
}return[I(document).width(),I(document).height()]
}function F(J){if(J){return J.call(I.mask)
}}var E,D,C,B,A;
I.mask={load:function(L,K){if(C){return this
}typeof L=="string"&&(L={color:L}),L=L||B,B=L=I.extend(I.extend({},H.conf),L),E=I("#"+L.maskId),E.length||(E=I("<div/>").attr("id",L.maskId),I("body").append(E));
var J=G();
E.css({position:"absolute",top:0,left:0,width:J[0],height:J[1],display:"none",opacity:L.startOpacity,zIndex:L.zIndex}),L.color&&E.css("backgroundColor",L.color);
if(F(L.onBeforeLoad)===!1){return this
}L.closeOnEsc&&I(document).on("keydown.mask",function(M){M.keyCode==27&&I.mask.close(M)
}),L.closeOnClick&&E.on("click.mask",function(M){I.mask.close(M)
}),I(window).on("resize.mask",function(){I.mask.fit()
}),K&&K.length&&(A=K.eq(0).css("zIndex"),I.each(K,function(){var M=I(this);
/relative|absolute|fixed/i.test(M.css("position"))||M.css("position","relative")
}),D=K.css({zIndex:Math.max(L.zIndex+1,A=="auto"?0:A)})),E.css({display:"block"}).fadeTo(L.loadSpeed,L.opacity,function(){I.mask.fit(),F(L.onLoad),C="full"
}),C=!0;
return this
},close:function(){if(C){if(F(B.onBeforeClose)===!1){return this
}E.fadeOut(B.closeSpeed,function(){F(B.onClose),D&&D.css({zIndex:A}),C=!1
}),I(document).off("keydown.mask"),E.off("click.mask"),I(window).off("resize.mask")
}return this
},fit:function(){if(C){var J=G();
E.css({width:J[0],height:J[1]})
}},getMask:function(){return E
},isLoaded:function(J){return J?C=="full":C
},getConf:function(){return B
},getExposed:function(){return D
}},I.fn.mask=function(J){I.mask.load(J);
return this
},I.fn.expose=function(J){I.mask.load(J,this);
return this
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
}u(AD.el.childNodes,function(AF){if(AF!==undefined){AE.appendChild(AF)
}});
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
(function(A){A.fn.lazyImage=function(){this.find("img[data-src]").each(function(){var B=A(this),D=B.data().src;
if(D){var C=new Image();
A(C).load(function(){B.attr("src",D).removeAttr("data-src")
});
C.src=D
}})
}
})(jQuery);
(function(F){var A={},G=false;
function E(){var H=document.documentElement;
return("requestFullscreen" in H)||("mozRequestFullScreen" in H&&document.mozFullScreenEnabled)||("webkitRequestFullScreen" in H)
}function D(H){var I=H.get(0);
if(I.requestFullscreen){I.requestFullscreen()
}else{if(I.mozRequestFullScreen){I.mozRequestFullScreen()
}else{if(I.webkitRequestFullScreen){I.webkitRequestFullScreen()
}else{if(A.fakeFullscreen){G=true;
F(I).addClass(A.fullscreenClass);
A.callback(G)
}}}}}function C(H){if(document.exitFullscreen){document.exitFullscreen()
}else{if(document.mozCancelFullScreen){document.mozCancelFullScreen()
}else{if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()
}else{if(A.fakeFullscreen){G=false;
H.removeClass(A.fullscreenClass);
A.callback(G)
}}}}}function B(H){F(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange",function(){G=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen;
H(G)
})
}F.support.fullscreen=E();
F.fn.fullScreen=function(I){var H=this;
if(G){C();
return H
}A=F.extend({callback:F.noop(),fullscreenClass:"fullScreen",fakeFullscreen:false},I);
if((!F.support.fullscreen&&!A.fakeFullscreen)||H.length!==1){return H
}H.addClass(A.fullscreenClass);
D(H);
B(function(J){if(!J){H.removeClass(A.fullscreenClass);
F(document).off("fullscreenchange mozfullscreenchange webkitfullscreenchange")
}A.callback(J)
});
return H
};
F.fn.cancelFullScreen=function(){C(this);
return this
}
}(jQuery));
/*
 * jquery.qtip. The jQuery tooltip plugin
 *
 * Copyright (c) 2009 Craig Thompson
 * http://craigsworks.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : February 2009
 * Version : 1.0.0-rc3
 * Released: Tuesday 12th May, 2009 - 00:00
 * Debug: jquery.qtip.debug.js
 */
(function(F){F.fn.qtip=function(a,T){var X,S,Z,R,W,V,U,Y;
if(typeof a=="string"){if(typeof F(this).data("qtip")!=="object"){F.fn.qtip.log.error.call(self,1,F.fn.qtip.constants.NO_TOOLTIP_PRESENT,false)
}if(a=="api"){return F(this).data("qtip").interfaces[F(this).data("qtip").current]
}else{if(a=="interfaces"){return F(this).data("qtip").interfaces
}}}else{if(!a){a={}
}if(typeof a.content!=="object"||(a.content.jquery&&a.content.length>0)){a.content={text:a.content}
}if(typeof a.content.title!=="object"){a.content.title={text:a.content.title}
}if(typeof a.position!=="object"){a.position={corner:a.position}
}if(typeof a.position.corner!=="object"){a.position.corner={target:a.position.corner,tooltip:a.position.corner}
}if(typeof a.show!=="object"){a.show={when:a.show}
}if(typeof a.show.when!=="object"){a.show.when={event:a.show.when}
}if(typeof a.show.effect!=="object"){a.show.effect={type:a.show.effect}
}if(typeof a.hide!=="object"){a.hide={when:a.hide}
}if(typeof a.hide.when!=="object"){a.hide.when={event:a.hide.when}
}if(typeof a.hide.effect!=="object"){a.hide.effect={type:a.hide.effect}
}if(typeof a.style!=="object"){a.style={name:a.style}
}a.style=C(a.style);
R=F.extend(true,{},F.fn.qtip.defaults,a);
R.style=A.call({options:R},R.style);
R.user=F.extend(true,{},a)
}return F(this).each(function(){if(typeof a=="string"){V=a.toLowerCase();
Z=F(this).qtip("interfaces");
if(typeof Z=="object"){if(T===true&&V=="destroy"){while(Z.length>0){Z[Z.length-1].destroy()
}}else{if(T!==true){Z=[F(this).qtip("api")]
}for(X=0;
X<Z.length;
X++){if(V=="destroy"){Z[X].destroy()
}else{if(Z[X].status.rendered===true){if(V=="show"){Z[X].show()
}else{if(V=="hide"){Z[X].hide()
}else{if(V=="focus"){Z[X].focus()
}else{if(V=="disable"){Z[X].disable(true)
}else{if(V=="enable"){Z[X].disable(false)
}}}}}}}}}}}else{U=F.extend(true,{},R);
U.hide.effect.length=R.hide.effect.length;
U.show.effect.length=R.show.effect.length;
if(U.position.container===false){U.position.container=F(document.body)
}if(U.position.target===false){U.position.target=F(this)
}if(U.show.when.target===false){U.show.when.target=F(this)
}if(U.hide.when.target===false){U.hide.when.target=F(this)
}S=F.fn.qtip.interfaces.length;
for(X=0;
X<S;
X++){if(typeof F.fn.qtip.interfaces[X]=="undefined"){S=X;
break
}}W=new D(F(this),U,S);
F.fn.qtip.interfaces[S]=W;
if(typeof F(this).data("qtip")=="object"){if(typeof F(this).attr("qtip")==="undefined"){F(this).data("qtip").current=F(this).data("qtip").interfaces.length
}F(this).data("qtip").interfaces.push(W)
}else{F(this).data("qtip",{current:0,interfaces:[W]})
}if(U.content.prerender===false&&U.show.when.event!==false&&U.show.ready!==true){U.show.when.target.bind(U.show.when.event+".qtip-"+S+"-create",{qtip:S},function(b){Y=F.fn.qtip.interfaces[b.data.qtip];
Y.options.show.when.target.unbind(Y.options.show.when.event+".qtip-"+b.data.qtip+"-create");
Y.cache.mouse={x:b.pageX,y:b.pageY};
O.call(Y);
Y.options.show.when.target.trigger(Y.options.show.when.event)
})
}else{W.cache.mouse={x:U.show.when.target.offset().left,y:U.show.when.target.offset().top};
O.call(W)
}}})
};
function D(T,S,U){var R=this;
R.id=U;
R.options=S;
R.status={animated:false,rendered:false,disabled:false,focused:false};
R.elements={target:T.addClass(R.options.style.classes.target),tooltip:null,wrapper:null,content:null,contentWrapper:null,title:null,button:null,tip:null,bgiframe:null};
R.cache={mouse:{},position:{},toggle:0};
R.timers={};
F.extend(R,R.options.api,{show:function(X){var W,Y;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"show")
}if(R.elements.tooltip.css("display")!=="none"){return R
}R.elements.tooltip.stop(true,false);
W=R.beforeShow.call(R,X);
if(W===false){return R
}function V(){if(R.options.position.type!=="static"){R.focus()
}R.onShow.call(R,X);
if(F.browser.msie){R.elements.tooltip.get(0).style.removeAttribute("filter")
}}R.cache.toggle=1;
if(R.options.position.type!=="static"){R.updatePosition(X,(R.options.show.effect.length>0))
}if(typeof R.options.show.solo=="object"){Y=F(R.options.show.solo)
}else{if(R.options.show.solo===true){Y=F("div.qtip").not(R.elements.tooltip)
}}if(Y){Y.each(function(){if(F(this).qtip("api").status.rendered===true){F(this).qtip("api").hide()
}})
}if(typeof R.options.show.effect.type=="function"){R.options.show.effect.type.call(R.elements.tooltip,R.options.show.effect.length);
R.elements.tooltip.queue(function(){V();
F(this).dequeue()
})
}else{switch(R.options.show.effect.type.toLowerCase()){case"fade":R.elements.tooltip.fadeIn(R.options.show.effect.length,V);
break;
case"slide":R.elements.tooltip.slideDown(R.options.show.effect.length,function(){V();
if(R.options.position.type!=="static"){R.updatePosition(X,true)
}});
break;
case"grow":R.elements.tooltip.show(R.options.show.effect.length,V);
break;
default:R.elements.tooltip.show(null,V);
break
}R.elements.tooltip.addClass(R.options.style.classes.active)
}return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_SHOWN,"show")
},hide:function(X){var W;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"hide")
}else{if(R.elements.tooltip.css("display")==="none"){return R
}}clearTimeout(R.timers.show);
R.elements.tooltip.stop(true,false);
W=R.beforeHide.call(R,X);
if(W===false){return R
}function V(){R.onHide.call(R,X)
}R.cache.toggle=0;
if(typeof R.options.hide.effect.type=="function"){R.options.hide.effect.type.call(R.elements.tooltip,R.options.hide.effect.length);
R.elements.tooltip.queue(function(){V();
F(this).dequeue()
})
}else{switch(R.options.hide.effect.type.toLowerCase()){case"fade":R.elements.tooltip.fadeOut(R.options.hide.effect.length,V);
break;
case"slide":R.elements.tooltip.slideUp(R.options.hide.effect.length,V);
break;
case"grow":R.elements.tooltip.hide(R.options.hide.effect.length,V);
break;
default:R.elements.tooltip.hide(null,V);
break
}R.elements.tooltip.removeClass(R.options.style.classes.active)
}return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_HIDDEN,"hide")
},updatePosition:function(V,W){var b,f,l,j,g,d,X,h,a,c,k,Z,e,Y;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updatePosition")
}else{if(R.options.position.type=="static"){return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.CANNOT_POSITION_STATIC,"updatePosition")
}}f={position:{left:0,top:0},dimensions:{height:0,width:0},corner:R.options.position.corner.target};
l={position:R.getPosition(),dimensions:R.getDimensions(),corner:R.options.position.corner.tooltip};
if(R.options.position.target!=="mouse"){if(R.options.position.target.get(0).nodeName.toLowerCase()=="area"){j=R.options.position.target.attr("coords").split(",");
for(b=0;
b<j.length;
b++){j[b]=parseInt(j[b])
}g=R.options.position.target.parent("map").attr("name");
d=F('img[usemap="#'+g+'"]:first').offset();
f.position={left:Math.floor(d.left+j[0]),top:Math.floor(d.top+j[1])};
switch(R.options.position.target.attr("shape").toLowerCase()){case"rect":f.dimensions={width:Math.ceil(Math.abs(j[2]-j[0])),height:Math.ceil(Math.abs(j[3]-j[1]))};
break;
case"circle":f.dimensions={width:j[2]+1,height:j[2]+1};
break;
case"poly":f.dimensions={width:j[0],height:j[1]};
for(b=0;
b<j.length;
b++){if(b%2==0){if(j[b]>f.dimensions.width){f.dimensions.width=j[b]
}if(j[b]<j[0]){f.position.left=Math.floor(d.left+j[b])
}}else{if(j[b]>f.dimensions.height){f.dimensions.height=j[b]
}if(j[b]<j[1]){f.position.top=Math.floor(d.top+j[b])
}}}f.dimensions.width=f.dimensions.width-(f.position.left-d.left);
f.dimensions.height=f.dimensions.height-(f.position.top-d.top);
break;
default:return F.fn.qtip.log.error.call(R,4,F.fn.qtip.constants.INVALID_AREA_SHAPE,"updatePosition");
break
}f.dimensions.width-=2;
f.dimensions.height-=2
}else{if(R.options.position.target.add(document.body).length===1){f.position={left:F(document).scrollLeft(),top:F(document).scrollTop()};
f.dimensions={height:F(window).height(),width:F(window).width()}
}else{if(typeof R.options.position.target.attr("qtip")!=="undefined"){f.position=R.options.position.target.qtip("api").cache.position
}else{f.position=R.options.position.target.offset()
}f.dimensions={height:R.options.position.target.outerHeight(),width:R.options.position.target.outerWidth()}
}}X=F.extend({},f.position);
if(f.corner.search(/right/i)!==-1){X.left+=f.dimensions.width
}if(f.corner.search(/bottom/i)!==-1){X.top+=f.dimensions.height
}if(f.corner.search(/((top|bottom)Middle)|center/)!==-1){X.left+=(f.dimensions.width/2)
}if(f.corner.search(/((left|right)Middle)|center/)!==-1){X.top+=(f.dimensions.height/2)
}}else{f.position=X={left:R.cache.mouse.x,top:R.cache.mouse.y};
f.dimensions={height:1,width:1}
}if(l.corner.search(/right/i)!==-1){X.left-=l.dimensions.width
}if(l.corner.search(/bottom/i)!==-1){X.top-=l.dimensions.height
}if(l.corner.search(/((top|bottom)Middle)|center/)!==-1){X.left-=(l.dimensions.width/2)
}if(l.corner.search(/((left|right)Middle)|center/)!==-1){X.top-=(l.dimensions.height/2)
}h=(F.browser.msie)?1:0;
a=(F.browser.msie&&parseInt(F.browser.version.charAt(0))===6)?1:0;
if(R.options.style.border.radius>0){if(l.corner.search(/Left/)!==-1){X.left-=R.options.style.border.radius
}else{if(l.corner.search(/Right/)!==-1){X.left+=R.options.style.border.radius
}}if(l.corner.search(/Top/)!==-1){X.top-=R.options.style.border.radius
}else{if(l.corner.search(/Bottom/)!==-1){X.top+=R.options.style.border.radius
}}}if(h){if(l.corner.search(/top/)!==-1){X.top-=h
}else{if(l.corner.search(/bottom/)!==-1){X.top+=h
}}if(l.corner.search(/left/)!==-1){X.left-=h
}else{if(l.corner.search(/right/)!==-1){X.left+=h
}}if(l.corner.search(/leftMiddle|rightMiddle/)!==-1){X.top-=1
}}if(R.options.position.adjust.screen===true){X=N.call(R,X,f,l)
}if(R.options.position.target==="mouse"&&R.options.position.adjust.mouse===true){if(R.options.position.adjust.screen===true&&R.elements.tip){k=R.elements.tip.attr("rel")
}else{k=R.options.position.corner.tooltip
}X.left+=(k.search(/right/i)!==-1)?-6:6;
X.top+=(k.search(/bottom/i)!==-1)?-6:6
}if(!R.elements.bgiframe&&F.browser.msie&&parseInt(F.browser.version.charAt(0))==6){F("select, object").each(function(){Z=F(this).offset();
Z.bottom=Z.top+F(this).height();
Z.right=Z.left+F(this).width();
if(X.top+l.dimensions.height>=Z.top&&X.left+l.dimensions.width>=Z.left){J.call(R)
}})
}X.left+=R.options.position.adjust.x;
X.top+=R.options.position.adjust.y;
e=R.getPosition();
if(X.left!=e.left||X.top!=e.top){Y=R.beforePositionUpdate.call(R,V);
if(Y===false){return R
}R.cache.position=X;
if(W===true){R.status.animated=true;
R.elements.tooltip.animate(X,200,"swing",function(){R.status.animated=false
})
}else{R.elements.tooltip.css(X)
}R.onPositionUpdate.call(R,V);
if(typeof V!=="undefined"&&V.type&&V.type!=="mousemove"){F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_POSITION_UPDATED,"updatePosition")
}}return R
},updateWidth:function(V){var W;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateWidth")
}else{if(V&&typeof V!=="number"){return F.fn.qtip.log.error.call(R,2,"newWidth must be of type number","updateWidth")
}}W=R.elements.contentWrapper.siblings().add(R.elements.tip).add(R.elements.button);
if(!V){if(typeof R.options.style.width.value=="number"){V=R.options.style.width.value
}else{R.elements.tooltip.css({width:"auto"});
W.hide();
if(F.browser.msie){R.elements.wrapper.add(R.elements.contentWrapper.children()).css({zoom:"normal"})
}V=R.getDimensions().width+1;
if(!R.options.style.width.value){if(V>R.options.style.width.max){V=R.options.style.width.max
}if(V<R.options.style.width.min){V=R.options.style.width.min
}}}}if(V%2!==0){V-=1
}R.elements.tooltip.width(V);
W.show();
if(R.options.style.border.radius){R.elements.tooltip.find(".qtip-betweenCorners").each(function(X){F(this).width(V-(R.options.style.border.radius*2))
})
}if(F.browser.msie){R.elements.wrapper.add(R.elements.contentWrapper.children()).css({zoom:"1"});
R.elements.wrapper.width(V);
if(R.elements.bgiframe){R.elements.bgiframe.width(V).height(R.getDimensions.height)
}}return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_WIDTH_UPDATED,"updateWidth")
},updateStyle:function(V){var Y,Z,W,X,a;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateStyle")
}else{if(typeof V!=="string"||!F.fn.qtip.styles[V]){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.STYLE_NOT_DEFINED,"updateStyle")
}}R.options.style=A.call(R,F.fn.qtip.styles[V],R.options.user.style);
R.elements.content.css(P(R.options.style));
if(R.options.content.title.text!==false){R.elements.title.css(P(R.options.style.title,true))
}R.elements.contentWrapper.css({borderColor:R.options.style.border.color});
if(R.options.style.tip.corner!==false){if(F("<canvas>").get(0).getContext){Y=R.elements.tooltip.find(".qtip-tip canvas:first");
W=Y.get(0).getContext("2d");
W.clearRect(0,0,300,300);
X=Y.parent("div[rel]:first").attr("rel");
a=B(X,R.options.style.tip.size.width,R.options.style.tip.size.height);
H.call(R,Y,a,R.options.style.tip.color||R.options.style.border.color)
}else{if(F.browser.msie){Y=R.elements.tooltip.find('.qtip-tip [nodeName="shape"]');
Y.attr("fillcolor",R.options.style.tip.color||R.options.style.border.color)
}}}if(R.options.style.border.radius>0){R.elements.tooltip.find(".qtip-betweenCorners").css({backgroundColor:R.options.style.border.color});
if(F("<canvas>").get(0).getContext){Z=G(R.options.style.border.radius);
R.elements.tooltip.find(".qtip-wrapper canvas").each(function(){W=F(this).get(0).getContext("2d");
W.clearRect(0,0,300,300);
X=F(this).parent("div[rel]:first").attr("rel");
Q.call(R,F(this),Z[X],R.options.style.border.radius,R.options.style.border.color)
})
}else{if(F.browser.msie){R.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function(){F(this).attr("fillcolor",R.options.style.border.color)
})
}}}return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_STYLE_UPDATED,"updateStyle")
},updateContent:function(Z,X){var Y,W,V;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateContent")
}else{if(!Z){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateContent")
}}Y=R.beforeContentUpdate.call(R,Z);
if(typeof Y=="string"){Z=Y
}else{if(Y===false){return 
}}if(F.browser.msie){R.elements.contentWrapper.children().css({zoom:"normal"})
}if(Z.jquery&&Z.length>0){Z.clone(true).appendTo(R.elements.content).show()
}else{R.elements.content.html(Z)
}W=R.elements.content.find("img[complete=false]");
if(W.length>0){V=0;
W.each(function(b){F('<img src="'+F(this).attr("src")+'" />').load(function(){if(++V==W.length){a()
}})
})
}else{a()
}function a(){R.updateWidth();
if(X!==false){if(R.options.position.type!=="static"){R.updatePosition(R.elements.tooltip.is(":visible"),true)
}if(R.options.style.tip.corner!==false){M.call(R)
}}}R.onContentUpdate.call(R);
return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_CONTENT_UPDATED,"loadContent")
},loadContent:function(V,Y,Z){var X;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"loadContent")
}X=R.beforeContentLoad.call(R);
if(X===false){return R
}if(Z=="post"){F.post(V,Y,W)
}else{F.get(V,Y,W)
}function W(a){R.onContentLoad.call(R);
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_CONTENT_LOADED,"loadContent");
R.updateContent(a)
}return R
},updateTitle:function(V){if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateTitle")
}else{if(!V){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateTitle")
}}returned=R.beforeTitleUpdate.call(R);
if(returned===false){return R
}if(R.elements.button){R.elements.button=R.elements.button.clone(true)
}R.elements.title.html(V);
if(R.elements.button){R.elements.title.prepend(R.elements.button)
}R.onTitleUpdate.call(R);
return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_TITLE_UPDATED,"updateTitle")
},focus:function(Z){var X,W,V,Y;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"focus")
}else{if(R.options.position.type=="static"){return F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.CANNOT_FOCUS_STATIC,"focus")
}}X=parseInt(R.elements.tooltip.css("z-index"));
W=6000+F("div.qtip[qtip]").length-1;
if(!R.status.focused&&X!==W){Y=R.beforeFocus.call(R,Z);
if(Y===false){return R
}F("div.qtip[qtip]").not(R.elements.tooltip).each(function(){if(F(this).qtip("api").status.rendered===true){V=parseInt(F(this).css("z-index"));
if(typeof V=="number"&&V>-1){F(this).css({zIndex:parseInt(F(this).css("z-index"))-1})
}F(this).qtip("api").status.focused=false
}});
R.elements.tooltip.css({zIndex:W});
R.status.focused=true;
R.onFocus.call(R,Z);
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_FOCUSED,"focus")
}return R
},disable:function(V){if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"disable")
}if(V){if(!R.status.disabled){R.status.disabled=true;
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_DISABLED,"disable")
}else{F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED,"disable")
}}else{if(R.status.disabled){R.status.disabled=false;
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_ENABLED,"disable")
}else{F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED,"disable")
}}return R
},destroy:function(){var V,W,X;
W=R.beforeDestroy.call(R);
if(W===false){return R
}if(R.status.rendered){R.options.show.when.target.unbind("mousemove.qtip",R.updatePosition);
R.options.show.when.target.unbind("mouseout.qtip",R.hide);
R.options.show.when.target.unbind(R.options.show.when.event+".qtip");
R.options.hide.when.target.unbind(R.options.hide.when.event+".qtip");
R.elements.tooltip.unbind(R.options.hide.when.event+".qtip");
R.elements.tooltip.unbind("mouseover.qtip",R.focus);
R.elements.tooltip.remove()
}else{R.options.show.when.target.unbind(R.options.show.when.event+".qtip-create")
}if(typeof R.elements.target.data("qtip")=="object"){X=R.elements.target.data("qtip").interfaces;
if(typeof X=="object"&&X.length>0){for(V=0;
V<X.length-1;
V++){if(X[V].id==R.id){X.splice(V,1)
}}}}delete F.fn.qtip.interfaces[R.id];
if(typeof X=="object"&&X.length>0){R.elements.target.data("qtip").current=X.length-1
}else{R.elements.target.removeData("qtip")
}R.onDestroy.call(R);
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_DESTROYED,"destroy");
return R.elements.target
},getPosition:function(){var V,W;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getPosition")
}V=(R.elements.tooltip.css("display")!=="none")?false:true;
if(V){R.elements.tooltip.css({visiblity:"hidden"}).show()
}W=R.elements.tooltip.offset();
if(V){R.elements.tooltip.css({visiblity:"visible"}).hide()
}return W
},getDimensions:function(){var V,W;
if(!R.status.rendered){return F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getDimensions")
}V=(!R.elements.tooltip.is(":visible"))?true:false;
if(V){R.elements.tooltip.css({visiblity:"hidden"}).show()
}W={height:R.elements.tooltip.outerHeight(),width:R.elements.tooltip.outerWidth()};
if(V){R.elements.tooltip.css({visiblity:"visible"}).hide()
}return W
}})
}function O(){var R,V,T,S,U,X,W;
R=this;
R.beforeRender.call(R);
R.status.rendered=true;
R.elements.tooltip='<div qtip="'+R.id+'" class="qtip '+(R.options.style.classes.tooltip||R.options.style)+'"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:'+R.options.position.type+';">  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">    <div class="qtip-contentWrapper" style="overflow:hidden;">       <div class="qtip-content '+R.options.style.classes.content+'"></div></div></div></div>';
R.elements.tooltip=F(R.elements.tooltip);
R.elements.tooltip.appendTo(R.options.position.container);
R.elements.tooltip.data("qtip",{current:0,interfaces:[R]});
R.elements.wrapper=R.elements.tooltip.children("div:first");
R.elements.contentWrapper=R.elements.wrapper.children("div:first").css({background:R.options.style.background});
R.elements.content=R.elements.contentWrapper.children("div:first").css(P(R.options.style));
if(F.browser.msie){R.elements.wrapper.add(R.elements.content).css({zoom:1})
}if(R.options.hide.when.event=="unfocus"){R.elements.tooltip.attr("unfocus",true)
}if(typeof R.options.style.width.value=="number"){R.updateWidth()
}if(F("<canvas>").get(0).getContext||F.browser.msie){if(R.options.style.border.radius>0){L.call(R)
}else{R.elements.contentWrapper.css({border:R.options.style.border.width+"px solid "+R.options.style.border.color})
}if(R.options.style.tip.corner!==false){E.call(R)
}}else{R.elements.contentWrapper.css({border:R.options.style.border.width+"px solid "+R.options.style.border.color});
R.options.style.border.radius=0;
R.options.style.tip.corner=false;
F.fn.qtip.log.error.call(R,2,F.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED,"render")
}if((typeof R.options.content.text=="string"&&R.options.content.text.length>0)||(R.options.content.text.jquery&&R.options.content.text.length>0)){T=R.options.content.text
}else{if(typeof R.elements.target.attr("title")=="string"&&R.elements.target.attr("title").length>0){T=R.elements.target.attr("title").replace("\\n","<br />");
R.elements.target.attr("title","")
}else{if(typeof R.elements.target.attr("alt")=="string"&&R.elements.target.attr("alt").length>0){T=R.elements.target.attr("alt").replace("\\n","<br />");
R.elements.target.attr("alt","")
}else{T=" ";
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.NO_VALID_CONTENT,"render")
}}}if(R.options.content.title.text!==false){I.call(R)
}R.updateContent(T);
K.call(R);
if(R.options.show.ready===true){R.show()
}if(R.options.content.url!==false){S=R.options.content.url;
U=R.options.content.data;
X=R.options.content.method||"get";
R.loadContent(S,U,X)
}R.onRender.call(R);
F.fn.qtip.log.error.call(R,1,F.fn.qtip.constants.EVENT_RENDERED,"render")
}function L(){var e,Y,S,a,W,d,T,f,c,X,V,b,Z,R,U;
e=this;
e.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove();
S=e.options.style.border.width;
a=e.options.style.border.radius;
W=e.options.style.border.color||e.options.style.tip.color;
d=G(a);
T={};
for(Y in d){T[Y]='<div rel="'+Y+'" style="'+((Y.search(/Left/)!==-1)?"left":"right")+":0; position:absolute; height:"+a+"px; width:"+a+'px; overflow:hidden; line-height:0.1px; font-size:1px">';
if(F("<canvas>").get(0).getContext){T[Y]+='<canvas height="'+a+'" width="'+a+'" style="vertical-align: top"></canvas>'
}else{if(F.browser.msie){f=a*2+3;
T[Y]+='<v:arc stroked="false" fillcolor="'+W+'" startangle="'+d[Y][0]+'" endangle="'+d[Y][1]+'" style="width:'+f+"px; height:"+f+"px; margin-top:"+((Y.search(/bottom/)!==-1)?-2:-1)+"px; margin-left:"+((Y.search(/Right/)!==-1)?d[Y][2]-3.5:-1)+'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'
}}T[Y]+="</div>"
}c=e.getDimensions().width-(Math.max(S,a)*2);
X='<div class="qtip-betweenCorners" style="height:'+a+"px; width:"+c+"px; overflow:hidden; background-color:"+W+'; line-height:0.1px; font-size:1px;">';
V='<div class="qtip-borderTop" dir="ltr" style="height:'+a+"px; margin-left:"+a+'px; line-height:0.1px; font-size:1px; padding:0;">'+T.topLeft+T.topRight+X;
e.elements.wrapper.prepend(V);
b='<div class="qtip-borderBottom" dir="ltr" style="height:'+a+"px; margin-left:"+a+'px; line-height:0.1px; font-size:1px; padding:0;">'+T.bottomLeft+T.bottomRight+X;
e.elements.wrapper.append(b);
if(F("<canvas>").get(0).getContext){e.elements.wrapper.find("canvas").each(function(){Z=d[F(this).parent("[rel]:first").attr("rel")];
Q.call(e,F(this),Z,a,W)
})
}else{if(F.browser.msie){e.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>')
}}R=Math.max(a,(a+(S-a)));
U=Math.max(S-a,0);
e.elements.contentWrapper.css({border:"0px solid "+W,borderWidth:U+"px "+R+"px"})
}function Q(T,V,R,S){var U=T.get(0).getContext("2d");
U.fillStyle=S;
U.beginPath();
U.arc(V[0],V[1],R,0,Math.PI*2,false);
U.fill()
}function E(U){var S,R,W,T,V;
S=this;
if(S.elements.tip!==null){S.elements.tip.remove()
}R=S.options.style.tip.color||S.options.style.border.color;
if(S.options.style.tip.corner===false){return 
}else{if(!U){U=S.options.style.tip.corner
}}W=B(U,S.options.style.tip.size.width,S.options.style.tip.size.height);
S.elements.tip='<div class="'+S.options.style.classes.tip+'" dir="ltr" rel="'+U+'" style="position:absolute; height:'+S.options.style.tip.size.height+"px; width:"+S.options.style.tip.size.width+'px; margin:0 auto; line-height:0.1px; font-size:1px;">';
if(F("<canvas>").get(0).getContext){S.elements.tip+='<canvas height="'+S.options.style.tip.size.height+'" width="'+S.options.style.tip.size.width+'"></canvas>'
}else{if(F.browser.msie){T=S.options.style.tip.size.width+","+S.options.style.tip.size.height;
V="m"+W[0][0]+","+W[0][1];
V+=" l"+W[1][0]+","+W[1][1];
V+=" "+W[2][0]+","+W[2][1];
V+=" xe";
S.elements.tip+='<v:shape fillcolor="'+R+'" stroked="false" filled="true" path="'+V+'" coordsize="'+T+'" style="width:'+S.options.style.tip.size.width+"px; height:"+S.options.style.tip.size.height+"px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:"+((U.search(/top/)!==-1)?"bottom":"top")+'"></v:shape>';
S.elements.tip+='<v:image style="behavior:url(#default#VML);"></v:image>';
S.elements.contentWrapper.css("position","relative")
}}S.elements.tooltip.prepend(S.elements.tip+"</div>");
S.elements.tip=S.elements.tooltip.find("."+S.options.style.classes.tip).eq(0);
if(F("<canvas>").get(0).getContext){H.call(S,S.elements.tip.find("canvas:first"),W,R)
}if(U.search(/top/)!==-1&&F.browser.msie&&parseInt(F.browser.version.charAt(0))===6){S.elements.tip.css({marginTop:-4})
}M.call(S,U)
}function H(S,U,R){var T=S.get(0).getContext("2d");
T.fillStyle=R;
T.beginPath();
T.moveTo(U[0][0],U[0][1]);
T.lineTo(U[1][0],U[1][1]);
T.lineTo(U[2][0],U[2][1]);
T.fill()
}function M(T){var S,V,R,W,U;
S=this;
if(S.options.style.tip.corner===false||!S.elements.tip){return 
}if(!T){T=S.elements.tip.attr("rel")
}V=positionAdjust=(F.browser.msie)?1:0;
S.elements.tip.css(T.match(/left|right|top|bottom/)[0],0);
if(T.search(/top|bottom/)!==-1){if(F.browser.msie){if(parseInt(F.browser.version.charAt(0))===6){positionAdjust=(T.search(/top/)!==-1)?-3:1
}else{positionAdjust=(T.search(/top/)!==-1)?1:2
}}if(T.search(/Middle/)!==-1){S.elements.tip.css({left:"50%",marginLeft:-(S.options.style.tip.size.width/2)})
}else{if(T.search(/Left/)!==-1){S.elements.tip.css({left:S.options.style.border.radius-V})
}else{if(T.search(/Right/)!==-1){S.elements.tip.css({right:S.options.style.border.radius+V})
}}}if(T.search(/top/)!==-1){S.elements.tip.css({top:-positionAdjust})
}else{S.elements.tip.css({bottom:positionAdjust})
}}else{if(T.search(/left|right/)!==-1){if(F.browser.msie){positionAdjust=(parseInt(F.browser.version.charAt(0))===6)?1:((T.search(/left/)!==-1)?1:2)
}if(T.search(/Middle/)!==-1){S.elements.tip.css({top:"50%",marginTop:-(S.options.style.tip.size.height/2)})
}else{if(T.search(/Top/)!==-1){S.elements.tip.css({top:S.options.style.border.radius-V})
}else{if(T.search(/Bottom/)!==-1){S.elements.tip.css({bottom:S.options.style.border.radius+V})
}}}if(T.search(/left/)!==-1){S.elements.tip.css({left:-positionAdjust})
}else{S.elements.tip.css({right:positionAdjust})
}}}R="padding-"+T.match(/left|right|top|bottom/)[0];
W=S.options.style.tip.size[(R.search(/left|right/)!==-1)?"width":"height"];
S.elements.tooltip.css("padding",0);
S.elements.tooltip.css(R,W);
if(F.browser.msie&&parseInt(F.browser.version.charAt(0))==6){U=parseInt(S.elements.tip.css("margin-top"))||0;
U+=parseInt(S.elements.content.css("margin-top"))||0;
S.elements.tip.css({marginTop:U})
}}function I(){var R=this;
if(R.elements.title!==null){R.elements.title.remove()
}R.elements.title=F('<div class="'+R.options.style.classes.title+'">').css(P(R.options.style.title,true)).css({zoom:(F.browser.msie)?1:0}).prependTo(R.elements.contentWrapper);
if(R.options.content.title.text){R.updateTitle.call(R,R.options.content.title.text)
}if(R.options.content.title.button!==false&&typeof R.options.content.title.button=="string"){R.elements.button=F('<a class="'+R.options.style.classes.button+'" style="float:right; position: relative"></a>').css(P(R.options.style.button,true)).html(R.options.content.title.button).prependTo(R.elements.title).click(function(S){if(!R.status.disabled){R.hide(S)
}})
}}function K(){var S,U,T,R;
S=this;
U=S.options.show.when.target;
T=S.options.hide.when.target;
if(S.options.hide.fixed){T=T.add(S.elements.tooltip)
}if(S.options.hide.when.event=="inactive"){R=["click","dblclick","mousedown","mouseup","mousemove","mouseout","mouseenter","mouseleave","mouseover"];
function X(Y){if(S.status.disabled===true){return 
}clearTimeout(S.timers.inactive);
S.timers.inactive=setTimeout(function(){F(R).each(function(){T.unbind(this+".qtip-inactive");
S.elements.content.unbind(this+".qtip-inactive")
});
S.hide(Y)
},S.options.hide.delay)
}}else{if(S.options.hide.fixed===true){S.elements.tooltip.bind("mouseover.qtip",function(){if(S.status.disabled===true){return 
}clearTimeout(S.timers.hide)
})
}}function W(Y){if(S.status.disabled===true){return 
}if(S.options.hide.when.event=="inactive"){F(R).each(function(){T.bind(this+".qtip-inactive",X);
S.elements.content.bind(this+".qtip-inactive",X)
});
X()
}clearTimeout(S.timers.show);
clearTimeout(S.timers.hide);
S.timers.show=setTimeout(function(){S.show(Y)
},S.options.show.delay)
}function V(Y){if(S.status.disabled===true){return 
}if(S.options.hide.fixed===true&&S.options.hide.when.event.search(/mouse(out|leave)/i)!==-1&&F(Y.relatedTarget).parents("div.qtip[qtip]").length>0){Y.stopPropagation();
Y.preventDefault();
clearTimeout(S.timers.hide);
return false
}clearTimeout(S.timers.show);
clearTimeout(S.timers.hide);
S.elements.tooltip.stop(true,true);
S.timers.hide=setTimeout(function(){S.hide(Y)
},S.options.hide.delay)
}if((S.options.show.when.target.add(S.options.hide.when.target).length===1&&S.options.show.when.event==S.options.hide.when.event&&S.options.hide.when.event!=="inactive")||S.options.hide.when.event=="unfocus"){S.cache.toggle=0;
U.bind(S.options.show.when.event+".qtip",function(Y){if(S.cache.toggle==0){W(Y)
}else{V(Y)
}})
}else{U.bind(S.options.show.when.event+".qtip",W);
if(S.options.hide.when.event!=="inactive"){T.bind(S.options.hide.when.event+".qtip",V)
}}if(S.options.position.type.search(/(fixed|absolute)/)!==-1){S.elements.tooltip.bind("mouseover.qtip",S.focus)
}if(S.options.position.target==="mouse"&&S.options.position.type!=="static"){U.bind("mousemove.qtip",function(Y){S.cache.mouse={x:Y.pageX,y:Y.pageY};
if(S.status.disabled===false&&S.options.position.adjust.mouse===true&&S.options.position.type!=="static"&&S.elements.tooltip.css("display")!=="none"){S.updatePosition(Y)
}})
}}function N(T,U,Z){var Y,R,W,X,S,V;
Y=this;
if(Z.corner=="center"){return U.position
}R=F.extend({},T);
X={x:false,y:false};
S={left:(R.left<F.fn.qtip.cache.screen.scroll.left),right:(R.left+Z.dimensions.width+2>=F.fn.qtip.cache.screen.width+F.fn.qtip.cache.screen.scroll.left),top:(R.top<F.fn.qtip.cache.screen.scroll.top),bottom:(R.top+Z.dimensions.height+2>=F.fn.qtip.cache.screen.height+F.fn.qtip.cache.screen.scroll.top)};
W={left:(S.left&&(Z.corner.search(/right/i)!=-1||(Z.corner.search(/right/i)==-1&&!S.right))),right:(S.right&&(Z.corner.search(/left/i)!=-1||(Z.corner.search(/left/i)==-1&&!S.left))),top:(S.top&&Z.corner.search(/top/i)==-1),bottom:(S.bottom&&Z.corner.search(/bottom/i)==-1)};
if(W.left){if(Y.options.position.target!=="mouse"){R.left=U.position.left+U.dimensions.width
}else{R.left=Y.cache.mouse.x
}X.x="Left"
}else{if(W.right){if(Y.options.position.target!=="mouse"){R.left=U.position.left-Z.dimensions.width
}else{R.left=Y.cache.mouse.x-Z.dimensions.width
}X.x="Right"
}}if(W.top){if(Y.options.position.target!=="mouse"){R.top=U.position.top+U.dimensions.height
}else{R.top=Y.cache.mouse.y
}X.y="top"
}else{if(W.bottom){if(Y.options.position.target!=="mouse"){R.top=U.position.top-Z.dimensions.height
}else{R.top=Y.cache.mouse.y-Z.dimensions.height
}X.y="bottom"
}}if(R.left<0){R.left=T.left;
X.x=false
}if(R.top<0){R.top=T.top;
X.y=false
}if(Y.options.style.tip.corner!==false){R.corner=new String(Z.corner);
if(X.x!==false){R.corner=R.corner.replace(/Left|Right|Middle/,X.x)
}if(X.y!==false){R.corner=R.corner.replace(/top|bottom/,X.y)
}if(R.corner!==Y.elements.tip.attr("rel")){E.call(Y,R.corner)
}}return R
}function P(T,S){var U,R;
U=F.extend(true,{},T);
for(R in U){if(S===true&&R.search(/(tip|classes)/i)!==-1){delete U[R]
}else{if(!S&&R.search(/(width|border|tip|title|classes|user)/i)!==-1){delete U[R]
}}}return U
}function C(R){if(typeof R.tip!=="object"){R.tip={corner:R.tip}
}if(typeof R.tip.size!=="object"){R.tip.size={width:R.tip.size,height:R.tip.size}
}if(typeof R.border!=="object"){R.border={width:R.border}
}if(typeof R.width!=="object"){R.width={value:R.width}
}if(typeof R.width.max=="string"){R.width.max=parseInt(R.width.max.replace(/([0-9]+)/i,"$1"))
}if(typeof R.width.min=="string"){R.width.min=parseInt(R.width.min.replace(/([0-9]+)/i,"$1"))
}if(typeof R.tip.size.x=="number"){R.tip.size.width=R.tip.size.x;
delete R.tip.size.x
}if(typeof R.tip.size.y=="number"){R.tip.size.height=R.tip.size.y;
delete R.tip.size.y
}return R
}function A(){var R,S,T,W,U,V;
R=this;
T=[true,{}];
for(S=0;
S<arguments.length;
S++){T.push(arguments[S])
}W=[F.extend.apply(F,T)];
while(typeof W[0].name=="string"){W.unshift(C(F.fn.qtip.styles[W[0].name]))
}W.unshift(true,{classes:{tooltip:"qtip-"+(arguments[0].name||"defaults")}},F.fn.qtip.styles.defaults);
U=F.extend.apply(F,W);
V=(F.browser.msie)?1:0;
U.tip.size.width+=V;
U.tip.size.height+=V;
if(U.tip.size.width%2>0){U.tip.size.width+=1
}if(U.tip.size.height%2>0){U.tip.size.height+=1
}if(U.tip.corner===true){U.tip.corner=(R.options.position.corner.tooltip==="center")?false:R.options.position.corner.tooltip
}return U
}function B(U,T,S){var R={bottomRight:[[0,0],[T,S],[T,0]],bottomLeft:[[0,0],[T,0],[0,S]],topRight:[[0,S],[T,0],[T,S]],topLeft:[[0,0],[0,S],[T,S]],topMiddle:[[0,S],[T/2,0],[T,S]],bottomMiddle:[[0,0],[T,0],[T/2,S]],rightMiddle:[[0,0],[T,S/2],[0,S]],leftMiddle:[[T,0],[T,S],[0,S/2]]};
R.leftTop=R.bottomRight;
R.rightTop=R.bottomLeft;
R.leftBottom=R.topRight;
R.rightBottom=R.topLeft;
return R[U]
}function G(R){var S;
if(F("<canvas>").get(0).getContext){S={topLeft:[R,R],topRight:[0,R],bottomLeft:[R,0],bottomRight:[0,0]}
}else{if(F.browser.msie){S={topLeft:[-90,90,0],topRight:[-90,90,-R],bottomLeft:[90,270,0],bottomRight:[90,270,-R]}
}}return S
}function J(){var R,S,T;
R=this;
T=R.getDimensions();
S='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:'+T.height+"px; width:"+T.width+'px" />';
R.elements.bgiframe=R.elements.wrapper.prepend(S).children(".qtip-bgiframe:first")
}F(document).ready(function(){F.fn.qtip.cache={screen:{scroll:{left:F(window).scrollLeft(),top:F(window).scrollTop()},width:F(window).width(),height:F(window).height()}};
var R;
F(window).bind("resize scroll",function(S){clearTimeout(R);
R=setTimeout(function(){if(S.type==="scroll"){F.fn.qtip.cache.screen.scroll={left:F(window).scrollLeft(),top:F(window).scrollTop()}
}else{F.fn.qtip.cache.screen.width=F(window).width();
F.fn.qtip.cache.screen.height=F(window).height()
}for(i=0;
i<F.fn.qtip.interfaces.length;
i++){var T=F.fn.qtip.interfaces[i];
if(T.status.rendered===true&&(T.options.position.type!=="static"||T.options.position.adjust.scroll&&S.type==="scroll"||T.options.position.adjust.resize&&S.type==="resize")){T.updatePosition(S,true)
}}},100)
});
F(document).bind("mousedown.qtip",function(S){if(F(S.target).parents("div.qtip").length===0){F(".qtip[unfocus]").each(function(){var T=F(this).qtip("api");
if(F(this).is(":visible")&&!T.status.disabled&&F(S.target).add(T.elements.target).length>1){T.hide(S)
}})
}})
});
F.fn.qtip.interfaces=[];
F.fn.qtip.log={error:function(){return this
}};
F.fn.qtip.constants={};
F.fn.qtip.defaults={content:{prerender:false,text:false,url:false,data:null,title:{text:false,button:false}},position:{target:false,corner:{target:"bottomRight",tooltip:"topLeft"},adjust:{x:0,y:0,mouse:true,screen:false,scroll:true,resize:true},type:"absolute",container:false},show:{when:{target:false,event:"mouseover"},effect:{type:"fade",length:100},delay:140,solo:false,ready:false},hide:{when:{target:false,event:"mouseout"},effect:{type:"fade",length:100},delay:0,fixed:false},api:{beforeRender:function(){},onRender:function(){},beforePositionUpdate:function(){},onPositionUpdate:function(){},beforeShow:function(){},onShow:function(){},beforeHide:function(){},onHide:function(){},beforeContentUpdate:function(){},onContentUpdate:function(){},beforeContentLoad:function(){},onContentLoad:function(){},beforeTitleUpdate:function(){},onTitleUpdate:function(){},beforeDestroy:function(){},onDestroy:function(){},beforeFocus:function(){},onFocus:function(){}}};
F.fn.qtip.styles={defaults:{background:"white",color:"#111",overflow:"hidden",textAlign:"left",width:{min:0,max:250},padding:"5px 9px",border:{width:1,radius:0,color:"#d3d3d3"},tip:{corner:false,color:false,size:{width:13,height:13},opacity:1},title:{background:"#e1e1e1",fontWeight:"bold",padding:"7px 12px"},button:{cursor:"pointer"},classes:{target:"",tip:"qtip-tip",title:"qtip-title",button:"qtip-button",content:"qtip-content",active:"qtip-active"}},cream:{border:{width:3,radius:0,color:"#F9E98E"},title:{background:"#F0DE7D",color:"#A27D35"},background:"#FBF7AA",color:"#A27D35",classes:{tooltip:"qtip-cream"}},light:{border:{width:3,radius:0,color:"#E2E2E2"},title:{background:"#f1f1f1",color:"#454545"},background:"white",color:"#454545",classes:{tooltip:"qtip-light"}},dark:{border:{width:3,radius:0,color:"#303030"},title:{background:"#404040",color:"#f3f3f3"},background:"#505050",color:"#f3f3f3",classes:{tooltip:"qtip-dark"}},red:{border:{width:3,radius:0,color:"#CE6F6F"},title:{background:"#f28279",color:"#9C2F2F"},background:"#F79992",color:"#9C2F2F",classes:{tooltip:"qtip-red"}},green:{border:{width:3,radius:0,color:"#A9DB66"},title:{background:"#b9db8c",color:"#58792E"},background:"#CDE6AC",color:"#58792E",classes:{tooltip:"qtip-green"}},blue:{border:{width:3,radius:0,color:"#ADD9ED"},title:{background:"#D0E9F5",color:"#5E99BD"},background:"#E5F6FE",color:"#4D9FBF",classes:{tooltip:"qtip-blue"}}}
})(jQuery);
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
}function B(G,H){A(G).append('<object id="myExperience'+H.src+'" name="myExperience'+H.src+'" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="'+H.width+'" /><param name="height" value="'+H.height+'" /><param name="playerID" value="1140772469001" /><param name="playerKey" value="AQ~~%2CAAAAAAEDRq0~%2CqRcfDOX2mNtWW87VePrJiaFRXUo43tGn" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="autoStart" value="'+C+'" /><param name="@videoPlayer" value="'+H.src+'" /><param name="wmode" value="opaque" /><param name="includeAPI" value="true"/> <!-- include the SMART player API --><param name="templateLoadHandler" value="dailybeast.video.onPlayerLoaded"/> <!-- onPlayerLoaded is the hook for the Javascript Omniture tracker  --></object>')
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
(function(B){B.fn.slides=function(C){C=B.extend({},B.fn.slides.option,C);
return this.each(function(){B("."+C.container,B(this)).children().wrapAll('<div class="slides_control"/>');
var W=B(this),K=B(".slides_control",W),a=K.children().size(),R=K.children().outerWidth(),N=K.children().outerHeight(),E=C.start-1,M=C.effect.indexOf(",")<0?C.effect:C.effect.replace(" ","").split(",")[0],T=C.effect.indexOf(",")<0?M:C.effect.replace(" ","").split(",")[1],P=0,O=0,D=0,Q=0,V,I,J,Y,X,U,L,G;
function F(d,c,b){if(!I&&V){I=true;
C.animationStart(Q+1);
switch(d){case"next":O=Q;
P=Q+1;
P=a===P?0:P;
Y=R*2;
d=-R*2;
Q=P;
break;
case"prev":O=Q;
P=Q-1;
P=P===-1?a-1:P;
Y=0;
d=0;
Q=P;
break;
case"pagination":P=parseInt(b,10);
O=B("."+C.paginationClass+" li."+C.currentClass+" a",W).attr("href").match("[^#/]+$");
if(P>O){Y=R*2;
d=-R*2
}else{Y=0;
d=0
}Q=P;
break
}if(c==="fade"){if(C.crossfade){K.children(":eq("+P+")",W).css({zIndex:10}).fadeIn(C.fadeSpeed,C.fadeEasing,function(){if(C.autoHeight){K.animate({height:K.children(":eq("+P+")",W).outerHeight()},C.autoHeightSpeed,function(){K.children(":eq("+O+")",W).css({display:"none",zIndex:0});
K.children(":eq("+P+")",W).css({zIndex:0});
C.animationComplete(P+1);
I=false
})
}else{K.children(":eq("+O+")",W).css({display:"none",zIndex:0});
K.children(":eq("+P+")",W).css({zIndex:0});
C.animationComplete(P+1);
I=false
}})
}else{K.children(":eq("+O+")",W).fadeOut(C.fadeSpeed,C.fadeEasing,function(){if(C.autoHeight){K.animate({height:K.children(":eq("+P+")",W).outerHeight()},C.autoHeightSpeed,function(){K.children(":eq("+P+")",W).fadeIn(C.fadeSpeed,C.fadeEasing)
})
}else{K.children(":eq("+P+")",W).fadeIn(C.fadeSpeed,C.fadeEasing,function(){if(B.browser.msie){B(this).get(0).style.removeAttribute("filter")
}})
}C.animationComplete(P+1);
I=false
})
}}else{K.children(":eq("+P+")").css({left:Y,display:"block"});
if(C.autoHeight){K.animate({left:d,height:K.children(":eq("+P+")").outerHeight()},C.slideSpeed,C.slideEasing,function(){K.css({left:-R});
K.children(":eq("+P+")").css({left:R,zIndex:5});
K.children(":eq("+O+")").css({left:R,display:"none",zIndex:0});
C.animationComplete(P+1);
I=false
})
}else{K.animate({left:d},C.slideSpeed,C.slideEasing,function(){K.css({left:-R});
K.children(":eq("+P+")").css({left:R,zIndex:5});
K.children(":eq("+O+")").css({left:R,display:"none",zIndex:0});
C.animationComplete(P+1);
I=false
})
}}if(C.pagination){B("."+C.paginationClass+" li."+C.currentClass,W).removeClass(C.currentClass);
B("."+C.paginationClass+" li:eq("+P+")",W).addClass(C.currentClass)
}}}function S(){clearInterval(W.data("interval"))
}function H(){if(C.pause){clearTimeout(W.data("pause"));
clearInterval(W.data("interval"));
L=setTimeout(function(){clearTimeout(W.data("pause"));
G=setInterval(function(){F("next",M)
},C.play);
W.data("interval",G)
},C.pause);
W.data("pause",L)
}else{S()
}}if(a<2){return 
}if(E<0){E=0
}if(E>a){E=a-1
}if(C.start){Q=E
}if(C.randomize){K.randomize()
}B("."+C.container,W).css({overflow:"hidden",position:"relative"});
K.children().css({position:"absolute",top:0,left:K.children().outerWidth(),zIndex:0,display:"none"});
K.css({position:"relative",width:(R*3),height:N,left:-R});
B("."+C.container,W).css({display:"block"});
if(C.autoHeight){K.children().css({height:"auto"});
K.animate({height:K.children(":eq("+E+")").outerHeight()},C.autoHeightSpeed)
}if(C.preload&&K.find("img:eq("+E+")").length){B("."+C.container,W).css({background:"url("+C.preloadImage+") no-repeat 50% 50%"});
var Z=K.find("img:eq("+E+")").attr("src")+"?"+(new Date()).getTime();
if(B("img",W).parent().attr("class")!="slides_control"){U=K.children(":eq(0)")[0].tagName.toLowerCase()
}else{U=K.find("img:eq("+E+")")
}K.find("img:eq("+E+")").attr("src",Z).load(function(){K.find(U+":eq("+E+")").fadeIn(C.fadeSpeed,C.fadeEasing,function(){B(this).css({zIndex:5});
B("."+C.container,W).css({background:""});
V=true;
C.slidesLoaded()
})
})
}else{K.children(":eq("+E+")").fadeIn(C.fadeSpeed,C.fadeEasing,function(){V=true;
C.slidesLoaded()
})
}if(C.bigTarget){K.children().css({cursor:"pointer"});
K.children().click(function(){F("next",M);
return false
})
}if(C.hoverPause&&C.play){K.bind("mouseover",function(){S()
});
K.bind("mouseleave",function(){H()
})
}if(C.generateNextPrev){B("."+C.container,W).after('<a href="#" class="'+C.prev+'">Prev</a>');
B("."+C.prev,W).after('<a href="#" class="'+C.next+'">Next</a>')
}B("."+C.next,W).click(function(b){b.preventDefault();
A();
if(C.play){H()
}F("next",M)
});
B("."+C.prev,W).click(function(b){b.preventDefault();
A();
if(C.play){H()
}F("prev",M)
});
if(C.generatePagination){if(C.prependPagination){W.prepend("<ul class="+C.paginationClass+"></ul>")
}else{W.append("<ul class="+C.paginationClass+"></ul>")
}K.children().each(function(){B("."+C.paginationClass,W).append('<li><a href="#'+D+'">'+(D+1)+"</a></li>");
D++
})
}else{B("."+C.paginationClass+" li a",W).each(function(){B(this).attr("href","#"+D);
D++
})
}B("."+C.paginationClass+" li:eq("+E+")",W).addClass(C.currentClass);
B("."+C.paginationClass+" li a",W).click(function(){A();
if(C.play){H()
}J=B(this).attr("href").match("[^#/]+$");
if(Q!=J){F("pagination",T,J)
}return false
});
B("a.link",W).click(function(){A();
if(C.play){H()
}J=B(this).attr("href").match("[^#/]+$")-1;
if(Q!=J){F("pagination",T,J)
}return false
});
if(C.play){G=setInterval(function(){F("next",M)
},C.play);
W.data("interval",G)
}})
};
function A(){var E=B("object[class='BrightcoveExperience']").attr("id");
if(E==undefined){return 
}var C=brightcove.api.getExperience(E);
if(C==undefined){return 
}var D=C.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
D.pause(true)
}B.fn.slides.option={preload:false,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:false,next:"next",prev:"prev",pagination:true,generatePagination:true,prependPagination:false,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:false,randomize:false,play:0,pause:0,hoverPause:false,autoHeight:true,autoHeightSpeed:350,bigTarget:false,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}};
B.fn.randomize=function(D){function C(){return(Math.round(Math.random())-0.5)
}return(B(this).each(function(){var G=B(this);
var F=G.children();
var E=F.length;
if(E>1){F.hide();
var H=[];
for(i=0;
i<E;
i++){H[H.length]=i
}H=H.sort(C);
B.each(H,function(J,I){var L=F.eq(I);
var K=L.clone(true);
K.show().appendTo(G);
if(D!==undefined){D(L,K)
}L.remove()
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
$("#wrap-page .overlay").once("overlay",function(){$(this).verticalAlign()
});
$(".stream-gallery").once("stream-gallery",function(){$(this).slides({play:0,slideSpeed:500,pause:2500,hoverPause:true,generatePagination:false});
$(this).find(".next").show();
$(this).find(".prev").show()
});
$("#wrap-page a.expand-collapse").click(function(){var D=$(this);
var E=D.siblings("a.more");
D.parent().siblings(".stream-read-more").slideToggle("slow",function(){B(D,E)
});
return false
});
$("#wrap-page a.arrowright").click(function(){var D=$(this).html();
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
$.priorityQ.windowReady.add("Attaching Wrap Galleries",$.priorityQ.NORMAL,function(){dailybeast.wrapstream.init()
});
var isStreamOn=$("#home-page .videoBlock header").attr("stream")=="true";
if(!isAppleDevice&&isStreamOn){$("#home-page .video-container.video").hide();
$("#home-page .video-container.stream").show()
}var isUserScrolling=false;
$(window).bind("scrollstart",function(){isUserScrolling=true
});
$(window).bind("scrollstop",function(){isUserScrolling=false
});
$.priorityQ.domReady.add("Misc handlers",$.priorityQ.WHENEVER,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("article[data-slideshow]").each(function(){var d=$.parseJSON($(this).attr("data-slideshow"));
if(_.hasValue(d.interstitials)){d.interstitials=d.interstitials.split(",");
_.each(d.interstitials,function(g,f){try{d.interstitials[f]=parseInt(d.interstitials[f])
}catch(e){d.interstitials=[3]
}})
}$(this).gallery({url:d.url,enableAutoPlay:false,display:d.display||"standard",interstitials:d.interstitials,containers:{slide:$(this).find("div.gallery-slide"),viewAll:$("div.slide-view-all"),interstitial:$("div.slide-interstitial")},elements:{next:$(this).find("a.gallery-nav-button-next, img.gallery-slide-image"),previous:$(this).find("a.gallery-nav-button-previous"),index:$(this).find(".gallery-nav-index"),title:$(this).find("h2.gallery-slide-heading"),description:$(this).find(".gallery-slide-copy"),byline:$(this).find(".gallery-slide-photo-credit")},updated:function(e,f){dailybeast.analytics.trackPageview({pageNum:f.index});
dailybeast.advertising.refresh()
},interstitialed:function(e,f){dailybeast.advertising.refresh()
}})
})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("div[data-slider]").each(function(){var d=$.parseJSON($(this).attr("data-slider"));
var e=true;
$(this).featureslider({circular:true,autoplay:true,interval:7500,containers:{tooltip:".tooltip"},elements:{slider:".featureSlider-slider",items:".featureSlider-slides",next:".featureSlider-next",prev:".featureSlider-previous",pause:".featureSlider-pause",play:".featureSlider-play",navigator:".featureSlider-pagination",tipTitle:".tooltip h2 a",tipText:".tooltip p"}})
});
var I=$(".featureSlider-navigation");
var X=$(".toolTip");
$(".featureSlider-pagination a").live("mouseover mouseout",function(f){if((document.all&&!window.opera&&window.XMLHttpRequest)?true:false){$("#main > div[class=grid-4]").css("position","static")
}if(f.type=="mouseover"&&!$(f.target).closest("li").hasClass("active")){var e=$(this).closest("li");
var d=$("div[data-slider]").featureslider("getState").slides[e.index()];
X.find("h2").text(d.title);
X.find("p").text(d.text);
var h=e.position().left;
h+=e.parent().position().left;
var g=I.position().top-X.outerHeight();
X.css({left:h-(X.outerWidth()/2)+(e.outerWidth())+"px",top:g+"px",display:"block"})
}else{X.css({display:"none"})
}})
}var T=$("#storyFeature");
if(T.length==1){var B=$("ul li",T);
var D=$("#storyFeatureImage",T);
B.mouseenter(function(){B.removeClass("on");
$(this).addClass("on");
var e=$(".photo",this).clone();
var d=$(".photoCredit",this).clone();
D.empty().append(e).append(d)
})
}if($("#video-page").length>0){dailybeast.videopage.init();
$(window).resize(function(){dailybeast.videopage.positionNextPreviousImage()
})
}if($("#videos-page").length>0){dailybeast.videopage.positionNextPreviousImage();
$(window).resize(function(){dailybeast.videopage.positionNextPreviousImage()
})
}$("[placeholder]").textPlaceholder();
var G=$("[data-featureAd]");
if(G.length==1&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){var b=$.parseJSON(G.attr("data-featureAd"));
if(b.delay!==undefined){setTimeout(function(){G.hide();
G.next(".featureBlock").fadeIn("slow")
},b.delay*1000)
}}var K=function(){if(!($(".adMark").length)&&$(".center-col .ad").height()>16){$(".center-col").before('<div class="adMark">Advertisement</div>');
$(".center-col").css("background-color","#EFEFEF")
}};
if(!$.browser.msie||($.browser.msie&&$.browser.version=="9.0")){$(".center-col .ad").bind("DOMNodeInserted",function(d){K()
})
}else{setTimeout(function(){K()
},500)
}if($("body").attr("id")!="videos-page"){$("[data-video]").playOverlay(true)
}if(isAppleDevice){$("[data-video]").click()
}if((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive")){$(".gallery-item").bind("mousemove",function(){$(this).closest(".galleries").find(".gallery-item img").css("opacity",0.5);
$(this).find("img").css("opacity",1)
});
$(".galleries-logo").bind("mousemove",function(){$(this).closest(".galleries").find(".gallery-item img").css("opacity",1)
});
$(".galleries").bind("mouseenter",function(d){$(this).find("img").css("opacity",0.5)
});
$(".galleries").bind("mouseleave",function(){$(this).find("img").css("opacity",1)
});
$(".galleries img").each(function(){$(this).removeAttr("title")
});
$(".gallery-item").floattip({tip:{element:".float-tip",paddingX:20,paddingY:20},stage:{element:".galleries"}});
$(".gallery-item a").click(function(d){if($(this).attr("href")=="#"){d.preventDefault();
window.location.href="/404"
}})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive"))){$(".features").slides({play:0,pause:2500,hoverPause:true,generatePagination:false,container:"features-container",next:"features-next",prev:"features-previous"})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&(dailybeast.metatags.getTemplate()=="home")){$("#home-page .contributors").slides({play:0,pause:2500,hoverPause:true,container:"contributors-container",paginationClass:"pagination",next:"pagination-next",prev:"pagination-previous",autoHeight:true});
$("#home-page .contributors").each(function(){$(this).find(".pagination").wrap('<span class="inner"></span>');
var d=$(this).find(".inner");
$(this).find(".pagination-previous").prependTo(d);
$(this).find(".pagination-next").appendTo(d);
d.wrap('<div class="wrapper"></div>')
});
$("#home-page .photoslider, #interactive-page .photoslider").slides({play:0,pause:2500,hoverPause:true,generatePagination:false,container:"photoslider-container",animationStart:function(){$("#home-page .heading-container").hide()
},animationComplete:function(){$("#home-page .heading-container").each(function(){$(this).verticalAlign($(this).data());
$(this).fadeIn()
})
},slidesLoaded:function(){}});
var Q=false;
function P(){if(!Q){$("#home-page .heading-container").each(function(){$(this).verticalAlign($(this).data());
$(this).fadeIn()
});
Q=true
}}$(window).load(function(){P()
});
window.setTimeout(function(){P()
},15000);
var L=$("#home-page .contributors .inner");
var Z=$("#home-page .contributors").width();
L.css("left",(Z/2-L.width()/2)-10)
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&(dailybeast.metatags.getTemplate()=="wrap")){var a=$(".switcher .scrollable");
var U=$(".switcher .slide:not(.cloned)");
var F=$(".switcher .slide").width();
function R(d,e){d.find("[data-video]").playOverlay(true,true);
d.find(".heading-container, .title, .switcher-overlay").fadeIn();
d.find("img").not(".switcher-overlay").animate({opacity:1},100);
if(isAppleDevice){d.find("[data-video]").click();
d.mouseover(function(){if(d.find("iframe, object")){d.find(".title").hide()
}})
}d.find("[data-video]").click(function(){d.find(".title").hide()
});
d.find(".title").show()
}function S(d,h,f,g){d.find(".heading-container, .title, .switcher-overlay").fadeOut(100);
d.find("[data-video]").find("iframe, object").remove();
d.find("img").not(".switcher-overlay").animate({opacity:0.3},100).fadeIn();
d.find(".data-video-processed a").not(".switcher-overlay").fadeIn();
if(d.hasClass("ad")){H(d,h,f,g)
}}function H(d,h,f,g){if(d.hasClass("ad")&&d.width()>3){W=f;
d.animate({opacity:0})
}}var A;
var W=0;
a.scrollable({circular:true,onSeek:function(f,d){if(!A){A=$(this.getItems()[0])
}if(W<d){S(A,f,d,"toRight")
}else{S(A,f,d)
}A=$(this.getItems()[d]);
R(A,d);
W=d
},onBeforeSeek:function(g,f){var d=$(this.getItems()[f]);
if(d.hasClass("ad")){if(d.find("[data-advertising]").children().length>0){d.animate({opacity:1},400)
}else{g.preventDefault();
a.scrollable().seekTo(f+(W<f?1:-1))
}}if(W<f){H(d.prev(),g,f)
}else{H(d.next(),g,f)
}}});
if(U.size()>1){U.not(".ad").slice(1,2).clone().addClass("cloned").appendTo(".switcher .items");
U.not(".ad").slice(U.size()-2,U.size()-1).clone().addClass("cloned").prependTo(".switcher .items");
$(".switcher .items").css("left",(-$(U[0]).position().left));
if(!($.browser.msie&&$.browser.version=="7.0")){a.navigator()
}$(".switcher .browse-link").show()
}R($(U[0]));
if($.browser.msie&&$.browser.version=="7.0"){$(".switcher-wrapper .title").css("bottom","60px")
}var C=$(".switcher .navi");
C.css("left",C.parent().width()/2-C.width()/2-5);
$(".switcher-wrapper").css("visibility","visible")
}$("#home-page .featureSlider-next").attr("data-track","{'title':'topbox-next'}");
$("#home-page .featureSlider-previous").attr("data-track","{'title':'topbox-prev'}");
$("#home-page .featureSlider-pause").attr("data-track","{'title':'topbox-pause'}");
$("#home-page .bottom .image.section a").each(function(){$(this).attr("data-track","{'title':'"+$(this).find("img").attr("title")+"'}")
});
$(".subscriptionheader a").attr("data-track","{'title':'trial-issues'}");
$(".beast-tv").parent("a").attr("data-track","{'title':'beasttv-logo'}");
var N=(function(f){var d=$(".slides_control",$(".video-feature-container")).children(":eq("+f+")");
d.playOverlay(true);
if(isAppleDevice){d.click();
d.find("img").hide();
d.mouseover(function(){d.find(".video-details").hide()
})
}else{d.find(".overlay").verticalAlign({offset:(d.find(".video-details").height()/2)});
d.find(".overlay").fadeIn()
}d.find(".video-details, a").show()
});
var O=false;
$(".video-feature-container").slides({play:0,pause:2500,hoverPause:true,container:"slides",generatePagination:false,paginationClass:"slider-pagination",prev:"previous",next:"next",autoHeight:true,animationStart:function(){var d=$(".video-feature-container div[data-video]:visible");
d.find(".video-details, a").show();
d.find("img").show();
d.find("iframe, object").remove();
$(".video-image-next img").hide();
$(".video-image-previous img").hide();
$(".video-feature-container").find("img.overlay").hide()
},animationComplete:function(g){if(!O){var f=$(".slides_control",$(".video-feature-container"));
if(f.children().size()>=4){var d=$(".video-image-next");
var h=$(".video-image-previous");
d.css("background-image",f.children(":eq("+(f.children().size()===g?0:g)+")").find(".video-details").data("src"));
h.css("background-image",f.children(":eq("+(g==1?f.children().size()-1:g-2)+")").find(".video-details").data("src"));
d.fadeIn();
h.fadeIn()
}f.children(":eq("+(g-1)+")").find("img, .video-details").show()
}N((g-1))
},slidesLoaded:function(){$(".slider-pagination").show();
N(0)
}}).bind("adEnabled",function(){O=true
});
$("div.video-filter ul.filter li a").live("click",function(f){f.preventDefault();
$("div.video-filter a.selected").each(function(){$(this).attr("class","");
$(this).find("span").remove()
});
$(this).attr("class","selected");
$(this).append(" <span>&nbsp;&nbsp;</span>");
var d=$("#video-explorer-grid");
d.children().remove();
d.spin("large");
d.load($(this).data("search-src"));
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames){if($(this).data("hash").length>0){window.location.hash=$(this).attr("data-hash");
window.scrollTo(0,$("#video-explorer").offset().top)
}}});
$("#video-explorer-grid ul.pagination li a").live("click",function(f){f.preventDefault();
var d=$("#video-explorer-grid");
d.children().remove();
d.spin("large");
d.load($(this).data("search-src"));
$("#video-explorer-grid").load($(this).data("search-src"));
window.scrollTo(0,$("#video-explorer").offset().top)
});
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames&&dailybeast.metatags.getTemplate()=="videos"&&window.location.hash.length>0){var V=function(g){var f=$('div.video-filter ul.filter li a[data-hash="'+g.replace("#","")+'"]');
if(f.length>0){f.attr("class","selected");
f.append(" <span>&nbsp;&nbsp;</span>");
var d=$("#video-explorer-grid");
if(d.length>0){d.spin("large");
d.load(f.data("search-src"));
d.load(f.data("search-src"));
$("body,html").animate({scrollTop:$("#video-explorer").offset().top},{duration:"slow",easing:"swing"});
$("#video-explorer").focus()
}}};
V(window.location.hash)
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".contributors-auto").slides({play:0,pause:2500,hoverPause:true,container:"slide-container",next:"pagination-next",prev:"pagination-previous",paginationClass:"pagination",generateNextPrev:true,slidesLoaded:function(){var d=0;
$(".contributors-auto .slide").each(function(){if($(this).find("a.active").length>0){$(".contributors-auto .pagination li:eq("+d+") a").delay(5000).click()
}d++
})
}});
$(".contributors-auto").find(".pagination").wrap('<div class="pagination-wrap clearfix"></div>');
$(".contributors-auto").find(".pagination-previous").prependTo(".pagination-wrap");
$(".contributors-auto").find(".pagination-next").appendTo(".pagination-wrap")
}var Y;
function c(f){var e=$("#videoOverlay");
if(!e.length){e=$('<div id="videoOverlay"><div class="videoWrapper"></div></div>').appendTo("body");
$('<header><a class="overlayVideos" href="javascript: window.location.href = dailybeast.links.beastTv + \'.html\'"><div class="beast-tv"></div></a></header>').insertBefore(".videoWrapper")
}e.overlay({top:"center",speed:"fast",load:true,onClose:function(){d();
e.removeData("overlay");
e.find(".videoWrapper").html("")
},mask:{color:"#000",loadSpeed:0,closeSpeed:0,opacity:0.5}});
e.find(".videoWrapper").load(f.replace(".html",".videooverlay.html"),function(h,g){if(g=="error"){window.location.href="/404";
return 
}$("#videoOverlay .videoOverlayList").jScrollPane({animateTo:true,animateStep:10,animateInterval:10});
Y=$(".videoOverlayList li").first().addClass("current");
dailybeast.video.addVideoEventListener(J);
$(".videoOverlayList li").click(function(j){j.preventDefault();
d();
$(".videoOverlayList li").removeClass("current");
M(Y=$(this).addClass("current"))
});
$("#videoOverlay .videoWrapper").css("background-image","none");
E()
});
window.onorientationchange=function(){var h=jQuery(window).height();
var g=$("#videoOverlay").height();
$("#videoOverlay").css("top",((h/2)-(g/2))-40)
};
function d(){var g=$('object[class="BrightcoveExperience"]');
if(g){var j=g.attr("id");
if(j){var h=dailybeast.video.getOmnitureTracker(j);
if(h){h.stopVideoTracker()
}}}}}function J(e){var d=e.type;
if(d=="mediaComplete"||(dailybeast.video.ytAPIReady&&e.data==YT.PlayerState.ENDED)){$(".videoOverlayList li").removeClass("current");
Y=Y.next().addClass("current");
if(Y.length==0){$(".videoOverlayList li:first-child").click()
}else{M(Y)
}setTimeout(function(){$(".videoOverlayList")[0].scrollTo($(".videoOverlayList .current").position().top)
},2000)
}}function M(d){var e=d.find("a").attr("href").replace(".html",".videooverlayplayer.html");
$("#videoOverlay .left").empty().load(e,E)
}function E(){dailybeast.advertising.init("#videoOverlay");
dailybeast.advertising.display("#videoOverlay");
dailybeast.loadSocialTools()
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$('#featureSlider a[href*="/videos/"],#home-page .video-container a[href*="/videos/"],#home-page .grid-7 a[href*="/videos/"],#home-page a.tout[href*="/videos/"],.video-container a[href*="/videos/"],.video-block-list a[href*="/videos/"],#layout2-page .hVideoList a[href*="/videos/"],#layout5-page .hVideoList a[href*="/videos/"],#layout3-page .secondaryRiver a[href*="/videos/"],#layout1-page .secondaryRiver a[href*="/videos/"],#layout1-page .mediaBoxout a[href*="/videos/"]').click(function(d){d.preventDefault();
c($(this).attr("href"))
});
if($.browser.msie&&isStreamOn){$('#home-page .video-container .heading a[href*="/videos/"]').off("click")
}}dailybeast.loadSocialTools=function(){stButtons.locateElements();
$("#videoOverlay .lazy-like").lazyFacebook();
$("#videoOverlay .lazy-fb-share").lazyFacebookShare();
$("#videoOverlay .lazy-plusone").lazyPlusOne();
$("#videoOverlay .lazy-twitter").lazyTwitter();
$("#videoOverlay .lazy-linkedin").lazyLinkedin()
}
});
$.priorityQ.domReady.add("Analtyics - Google Plus Button",$.priorityQ.IMPORTANT,function(){window.plusClick=function A(B){var C="GOOGLEPLUS";
if(B.state=="off"){C="GOOGLEMINUS"
}dailybeast.analytics.trackSharetoolClick(C,B.href)
};
$(".st_email_custom").click(function(){dailybeast.analytics.trackSharetoolClick("EMAIL",window.location.pathname)
})
});
$.priorityQ.windowReady.add("Mobile Preference Link Setup",$.priorityQ.NORMAL,function(){$("#toMobile").on("click",function(){dailybeast.commons.PlatformPreferenceUtils.setMobile();
dailybeast.analytics.trackPlatformSwitch("to-mobile");
window.location.reload();
return false
})
});
if((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive")){$.priorityQ.domReady.add("Home Page War Module",$.priorityQ.IMPORTANT,function(){dailybeast.warmodule=dailybeast.warmodule||function(){var A={};
dailybeast.warmodule_openHandler=dailybeast.warmodule_openHandler||function(){A.breakingVideo.show();
A.videoContainer.html(A.videoHTML);
if(A.videoContainer.data("playerType")=="brightcove"){brightcove.createExperiences()
}A.breakingVideoClosed.hide()
};
dailybeast.warmodule_closeHandler=dailybeast.warmodule_closeHandler||function(){A.breakingVideoClosed.show();
A.breakingVideo.hide();
A.videoContainer.html("")
};
A._openModule=function(){$.log("Opening war module");
$.cookie("breaking-video","open",{expires:1});
var B=dailybeast.warmodule_openHandler;
if(B){B()
}};
A._closeModule=function(){$.log("Closing war module");
$.cookie("breaking-video","closed",{expires:1});
var B=dailybeast.warmodule_closeHandler;
if(B){B()
}};
A.breakingVideo=$("#breaking-video");
A.breakingVideoClosed=$("#breaking-video-closed");
A.videoContainer=$("#video-container");
A.videoHTML=A.videoContainer.html();
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){A.videoContainer.html("");
$(".breaking-video-close").bind("click",function(B){B.preventDefault();
A._closeModule()
});
A.breakingVideoClosed.bind("click",function(B){B.preventDefault();
A._openModule()
})
}return A
}();
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){if($.cookie("breaking-video")!="closed"){dailybeast.warmodule._openModule()
}}})
}var dailybeast=dailybeast||{};
dailybeast.newsletters=function(){function A(B,C){C=C||{};
var D=B.find("button");
function E(H,G){if(C.showMessage){C.showMessage(H,G)
}else{var F=B.find(".message").text(H).show("slow");
setTimeout(function(){F.hide("slow")
},5000)
}}B.submit(function(){if(C.validate){var F=C.validate(B);
if(F){E(F,true);
return false
}}var G={email:B.find("[name=email]").val(),subscriptions:[]};
B.find("[name=subscriptions]:checked").each(function(){G.subscriptions.push($(this).val())
});
if(C.submit){C.submit(B,D)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:G,dataType:"json",complete:function(){if(C.complete){C.complete(B,D)
}},success:function(H){if(H.msg!==undefined){E(H.msg,false)
}},error:function(I){var H=$.parseJSON(I.responseText);
if(H.msg!==undefined){E(H.msg,true)
}}});
return false
})
}return{bindNewsletterSignUp:A}
}();
$.priorityQ.domReady.add("Newsletter Forms",$.priorityQ.SOMETIME,function(){if($("#newsletters-page").length!=0){dailybeast.newsletters.bindNewsletterSignUp($(".newsletters form"),{validate:function(N){return !N.find("input[name=tos]").is(":checked")?"Please confirm that you have read and agree to the Terms of Service and Privacy Policy.":""
},submit:function(N,O){O.text("submitting...").attr("disabled",true)
},complete:function(N,O){O.text("submit").attr("disabled",false)
}})
}$(".signup").each(function(){var N=$(this);
var Q=$(this).find(".message-dialog.confirm");
Q.click(function(){Q.hide()
});
var P=$(this).find(".message-dialog.error");
P.click(function(){P.hide()
});
var O=$(this).find(".loading-indicator");
dailybeast.newsletters.bindNewsletterSignUp($(this).find("form"),{showMessage:function(S,R){if(!R){if(S.toLowerCase().indexOf("invalid")>=0){R=true;
S="Sorry, that's not a valid email address. Please try again."
}else{S="Thanks! You're subscribed."
}}if(R){P.find(".text-cell").text(S);
P.show()
}else{Q.find(".text-cell").text(S);
Q.show()
}},validate:function(R){var S=R.find("input[name=email]").val();
S=$.trim(S);
return S.length==0?"Please enter your email address.":""
},submit:function(R,S){O.show()
},complete:function(R,S){O.hide()
}})
});
var B=false;
function G(O,Q){Q=Q||{};
var R=O.find("button[name=validate]");
var T=O.find("[name=email]");
var P="";
function S(V,U){O.find("button[name=confirm]").attr("disabled",false);
O.find("button[name=cancel]").attr("disabled",false);
O.find("input[name=tos]").attr("disabled",false);
O.find("[name=subscriptions]").each(function(){$(this).attr("disabled",false)
});
B=false;
O.find("img").show();
O.find(".input-text").addClass("input-error");
O.find(".message").text(V);
setTimeout(function(){O.find(".message").text("");
O.find(".input-text").removeClass("input-error");
O.find("img").hide()
},5000)
}function N(){P=T.val();
T.blur();
T.attr("disabled",true);
var U={email:P!="Enter your email address"?P:""};
if(Q.submit){Q.submit(O,R)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:U,dataType:"json",complete:function(){if(Q.complete){Q.complete(O,R)
}},success:function(V){if(V.msg!==undefined&&(V.msg.toLowerCase().indexOf("invalid")!=-1||V.msg.toLowerCase().indexOf("enter")!=-1)){S("Please provide a valid email address.",false);
T.attr("disabled",false);
if(Q.cancel){Q.cancel(O,R)
}}else{if(V.msg!==undefined&&V.msg.toLowerCase().indexOf("please select")==-1){S(V.msg,false);
T.attr("disabled",false)
}else{if(Q.validateComplete){Q.validateComplete(O)
}}}},error:function(W){var V=$.parseJSON(W.responseText);
if(V.msg!=undefined){S(V.msg,true)
}}})
}O.find("button[name=cancel]").click(function(){if(Q.cancel){Q.cancel(O,R)
}return false
});
T.keypress(function(U){if(U.which==13){U.preventDefault();
N()
}});
R.click(function(){N();
return false
});
O.submit(function(){if(B){return false
}else{B=true
}if(Q.validate){var U=Q.validate(O);
if(U){S(U,true);
return false
}}O.find("button[name=confirm]").attr("disabled",true);
O.find("button[name=cancel]").attr("disabled",true);
O.find("input[name=tos]").attr("disabled",true);
O.find("[name=subscriptions]").each(function(){$(this).attr("disabled",true)
});
var V={email:P,tos:O.find("input[name=tos]").is(":checked"),subscriptions:[]};
O.find("[name=subscriptions]:checked").each(function(){V.subscriptions.push($(this).val())
});
if(Q.submit){Q.submit(O,R)
}O.find("[name=subscriptions]:checked").each(function(){O.find("#thankList").append('<li class="clearfix">'+$(this).next("h2").text()+"</li>")
});
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:V,dataType:"json",complete:function(){if(Q.complete){Q.complete(O,R)
}},success:function(W){if(W.msg!==undefined&&W.msg.toLowerCase().indexOf("successfully added")==-1){S(W.msg,false)
}else{if(Q.success){Q.success(O)
}}},error:function(X){var W=$.parseJSON(X.responseText);
if(W.msg!==undefined){S(W.msg,true)
}}});
return false
})
}if($("#cheatsheet-page").length!=0){var M=$(".submitform");
var K=M.find("#thankList");
var I=M.find("[name=email]");
var E=M.find("button[name=validate]");
var H=M.find("button[name=confirm]");
var C=M.find("input[name=tos]");
var D;
var A;
if($.browser.msie){D=M.find(".setup");
A=M.find(".confirmed")
}else{D=$(M.find(".setup")[1]);
A=$(M.find(".confirmed")[1])
}var L=[];
var F=0;
M.find("[name=subscriptions]").each(function(){L[F]=$(this).attr("checked");
$(this).attr("disabled",false);
F++
});
if(isMacWebKit||$.browser.msie){var J=I.attr("placeholder");
I.focus(function(){if(I.val()==""||I.val()==J){I.attr("placeholder","");
I.val("")
}}).blur(function(){if(I.val()==""||I.val()==I.attr("placeholder")){I.attr("placeholder",J);
I.val(J)
}}).blur()
}if($.browser.msie||$.browser.mozilla){I.val("");
I.blur();
C.attr("checked",false);
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"GET",dataType:"json",success:function(N){F=0;
M.find("[name=subscriptions]").each(function(){$(this).attr("checked",N[F].enabled);
L[F]=N[F].enabled?"checked":"";
F++
})
},error:function(O){var N=$.parseJSON(O.responseText);
if(N.msg!==undefined){showMessage(N.msg,true)
}}})
}I.attr("disabled",false);
E.attr("disabled",false);
H.attr("disabled",false);
C.attr("disabled",false);
G(M,{validate:function(N){return !C.is(":checked")?"Please agree to privacy policy.":""
},validateComplete:function(O){var N=I.outerWidth()+O.find("button[name=validate]").outerWidth()-31;
D.width(N);
A.width(N);
D.show("fast",function(){if($.browser.msie){$(D[0]).height($(D[1]).height())
}})
},cancel:function(N,O){C.attr("checked",false);
D.hide("fast",function(){var P=0;
N.find("[name=subscriptions]").each(function(){$(this).attr("checked",L[P]=="checked");
$(this).attr("disabled",false);
P++
});
C.attr("disabled",false)
});
O.attr("disabled",false);
I.val("");
I.blur();
I.attr("disabled",false);
H.attr("disabled",false);
B=false;
O.focus();
O.blur()
},submit:function(N,O){O.attr("disabled",true);
K.find(".clearfix").remove();
I.blur()
},complete:function(N,O){I.blur()
},success:function(N){D.hide("fast",function(){var O=0;
N.find("[name=subscriptions]").each(function(){$(this).attr("checked",L[O]=="checked");
$(this).attr("disabled",false);
O++
});
C.attr("disabled",false);
N.find("button[name=cancel]").attr("disabled",false)
});
A.show("fast",function(){if($.browser.msie){$(A[0]).height($(A[1]).height())
}})
}});
M.find("button[name=close]").click(function(){C.attr("checked",false);
M.find("button[name=validate]").attr("disabled",false);
I.val("");
I.blur();
I.attr("disabled",false);
H.attr("disabled",false);
B=false;
E.focus();
E.blur();
A.hide("fast");
return false
})
}});
dailybeast.lazyLoader=dailybeast.lazyLoader||function(){var A={};
A.loadInView=function(D){D=D||{};
var C=$(this);
var B=(D.sensitivity||"0");
if(window.location.hash.indexOf("suppressLoadInView")>=0){B=-10000
}else{if(window.location.hash.indexOf("loadInViewImmediate")>=0){B=10000
}}C.attr("data-sensitivity",B);
C.on("inview",function(F,G){var E=$(this);
if(G){E.attr("is-inview","true");
dailybeast.retry.start({name:D.name,minDelay:10,progressive:false,toRun:function(){if(typeof D.runIf=="undefined"||D.runIf()){$.log("Loading "+D.name);
return D.handler(E)
}return false
},cancelWhen:function(){return E.attr("is-inview")!="true"
},onSuccess:function(){E.unbind("inview")
}})
}else{E.attr("is-inview","false")
}})
};
jQuery.fn.loadInView=A.loadInView;
A.ifDataExists=function(C,B){if(C){return B
}else{return""
}};
A.lazyFacebook=function(){$(this).loadInView({name:"Facebook Like Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(B){if(typeof FB!="undefined"){var C=$(B);
C.html('<fb:like href="'+C.attr("data-href")+'" '+A.ifDataExists(C.attr("data-send"),'send="'+C.attr("data-send")+'" ')+A.ifDataExists(C.attr("data-layout"),'layout="'+C.attr("data-layout")+'" ')+A.ifDataExists(C.attr("data-page-name"),'pagename="'+C.attr("data-page-name")+'" ')+'width="90" height="21" '+A.ifDataExists(C.attr("data-show-faces"),'show_faces="'+C.attr("data-show_faces")+'" ')+A.ifDataExists(C.attr("data-action"),'action="'+C.attr("data-action")+'" ')+A.ifDataExists(C.attr("data-colorscheme"),'colorscheme="'+C.attr("data-colorscheme")+'" ')+A.ifDataExists(C.attr("data-ref"),'ref="'+C.attr("data-ref")+'"')+"></fb:like>");
FB.XFBML.parse(C.get(0));
return true
}else{$.warn("FB not loaded yet");
return false
}}})
};
jQuery.fn.lazyFacebook=A.lazyFacebook;
A.lazyFacebookShare=function(){$(this).loadInView({name:"Facebook Share Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(B){if(typeof FB!="undefined"){var C=$(B);
var D='SELECT share_count FROM link_stat WHERE url ="'+C.attr("data-link")+'"';
FB.api("/fql",{q:D},function(F){var E=0;
if(F.data){E=F.data[0].share_count
}C.html('<a class="fbshare-btn " onclick="postToFeed(this)" style="background-image: url('+C.attr("data-background-image")+');" ></a><span class="fbshare-count"><span class="fbnumber" id="fbnumber">'+formatShareNumber(E)+'</span><span class="countNub"><s></s><i></i></span></span>')
});
return true
}else{$.warn("FB not loaded yet");
return false
}}})
};
jQuery.fn.lazyFacebookShare=A.lazyFacebookShare;
A.lazyPlusOne=function(){$(this).loadInView({name:"Google Plus One",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(B){if(typeof gapi!="undefined"){var C=$(B);
var D="g-plusone"+Math.floor((Math.random()*1000000000)+1);
C.html('<div id="'+D+'" class="g-plusone"></div>');
gapi.plusone.render(D,{href:C.attr("data-href"),size:C.attr("data-size"),callback:C.attr("data-callback")?C.attr("data-callback"):"",count:C.attr("data-count")});
C.removeClass("lazy-placeholder");
return true
}else{$.warn("GAPI not loaded yet");
return false
}}})
};
jQuery.fn.lazyPlusOne=A.lazyPlusOne;
A.lazyTwitter=function(){$(this).loadInView({name:"Twitter Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(B){var C=$(B);
if(window.twttr&&window.twttr.widgets&&window.twttr.widgets.load){C.html('<a href="https://twitter.com/share" class="twitter-share-button" data-count="'+C.attr("data-count")+'" '+A.ifDataExists(C.attr("data-counturl"),'data-counturl="'+C.attr("data-counturl")+'" ')+'data-url="'+C.attr("data-url")+'" data-text="'+C.attr("data-text")+'" data-related="'+C.attr("data-related")+'" data-via="'+C.attr("data-via")+'" data-size="m" >Tweet</a>');
window.twttr.widgets.load();
if(C.attr("data-counturl")){try{$.getJSON("http://cdn.api.twitter.com/1/urls/count.json?callback=?&url="+C.attr("data-counturl"),function(F){var E=F.count;
if(E<10){C.find("iframe").css("width","78")
}else{if(E<100){C.find("iframe").css("width","81")
}else{if(E<1000){C.find("iframe").css("width","88")
}else{if(E<10000){C.find("iframe").css("width","97")
}}}}})
}catch(D){$.warn("Could not adjust the size of the twitter button",D)
}}return true
}else{return false
}}})
};
jQuery.fn.lazyTwitter=A.lazyTwitter;
A.lazyTwitterFollow=function(){$(this).loadInView({name:"Twitter Follow Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(B){var C=$(B);
C.html('<iframe allowtransparency="true" frameborder="0" scrolling="no"src="http://platform.twitter.com/widgets/follow_button.html?screen_name='+C.attr("data-screen-name")+"&show_count="+C.attr("data-show-count")+'&" style="width:'+C.attr("data-width")+';height:20px"></iframe>');
return true
}})
};
jQuery.fn.lazyTwitterFollow=A.lazyTwitterFollow;
A.lazyLinkedin=function(){$(this).loadInView({name:"Linked In",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(D){$.log("Running for",D);
var B=$(D);
var C=function(){var E="linkedIn"+Math.floor((Math.random()*1000000000)+1);
B.html('<div id="'+E+'"><script type="IN/Share" data-url="'+getAbsolutePath()+'"><\/script></div>');
IN.parse(document.getElementById(E))
};
if(typeof IN=="undefined"){$.getScript("http://platform.linkedin.com/in.js",function(){C()
})
}else{C()
}return true
}})
};
jQuery.fn.lazyLinkedin=A.lazyLinkedin;
return A
}(jQuery);
function postToFeed(B){var C=$(B).parent(".lazy-fb-share");
var D={method:"feed",link:C.attr("data-link"),picture:C.attr("data-picture"),name:C.attr("data-name"),caption:"The Daily Beast",description:C.attr("data-description")};
function E(F){FB.XFBML.parse();
updateShareNumber()
}var A=FB.ui(D,E);
dailybeast.analytics.trackSharetoolClick("FBSHARE",C.attr("data-link"),C.attr("data-page-name"))
}function updateShareNumber(){$(".lazy-fb-share").each(function(A,C){var B=$(C);
if($(B).find("#fbnumber").length==0){$(B).lazyFacebookShare()
}else{var D='SELECT share_count FROM link_stat WHERE url ="'+B.attr("data-link")+'"';
FB.api("/fql",{q:D},function(F){var E=0;
if(F.data[0]){E=F.data[0].share_count
}$(B).find("#fbnumber").text(formatShareNumber(E))
})
}})
}function formatShareNumber(A){if(A<1000){return A
}if(A<100000){return(Math.floor(A/1000*10))/10+"k"
}if(A<1000000){return Math.floor(A/1000)+"k"
}if(A<100000000){return Math.floor(A/1000000*10)/10+"m"
}if(A>=100000000){return Math.floor(A/1000000)+"m"
}return A
}function getAbsolutePath(){return location.protocol+"//"+location.host+location.pathname
}$.priorityQ.windowReady.add("Lazy Social Buttons",$.priorityQ.SOMETIME,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".lazy-like").lazyFacebook();
$(".lazy-fb-share").lazyFacebookShare();
$(".lazy-plusone").lazyPlusOne();
$(".lazy-twitter").lazyTwitter();
$(".lazy-linkedin").lazyLinkedin();
$(".lazy-twitter-follow").lazyTwitterFollow()
}});
$.priorityQ.windowReady.add("Weather Widget",$.priorityQ.SOMETIME,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$.ajax({url:"http://api.wunderground.com/api/16398c7bfc8f3c8e/geolookup/conditions/q/autoip.json",dataType:"jsonp",success:function(B){if(B.current_observation){var A=B.current_observation["temp_f"];
var D=B.current_observation["icon"];
var C='<img class="icon" src="http://icons.wxug.com/i/c/g/'+D+'.gif" width="25" height="25">'+A+"&deg;";
$(".weather").html(C)
}}})
}});
$.priorityQ.windowReady.add("Stock ticker",$.priorityQ.SOMETIME,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){var C="INDU";
var B="COMPX";
$.getJSON("/content/dailybeast/services/stock-quote.json",{symbols:[C,B]},function(F){var G=F[C];
if(G){$(".stock .dowCountTitle").text("Dow ");
$(".stock .dowCount").text(D(G.last));
A($(".stock .dowRate"),G.change)
}var E=F[B];
if(G){$(".stock .nasdaqCountTitle").text(", Nasdaq ");
$(".stock .nasdaqCount").text(D(E.last));
A($(".stock .nasdaqRate"),E.change)
}$(".stock").show()
});
function A(F,G){var E=G>0;
F.text((E?"+":"")+D(G));
if(E){F.removeClass("down").addClass("up")
}else{F.removeClass("up").addClass("down")
}}function D(F){var E=(Math.round(F*10)/10).toFixed(1);
var I=E.split(".");
var H=I[0];
var G=/(\d+)(\d{3})/;
while(G.test(H)){H=H.replace(G,"$1,$2")
}return H+((I.length>0)?"."+I[1]:"")
}}});
$.priorityQ.domReady.add("Wrap Contributors",$.priorityQ.NORMAL,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("#wrap-page .contributors, #article-page .contributors").slides({play:0,pause:2500,hoverPause:true,container:"contributors-container",paginationClass:"pagination",next:"pagination-next",prev:"pagination-previous",autoHeight:true});
$("#wrap-page .contributors, #article-page .contributors").each(function(){$(this).find(".pagination").wrap('<span class="inner"></span>');
var C=$(this).find(".inner");
$(this).find(".pagination-previous").prependTo(C);
$(this).find(".pagination-next").appendTo(C);
C.wrap('<div class="wrapper"></div>')
});
var B=$("#wrap-page .contributors .inner, #article-page .contributors .inner");
var A=$("#wrap-page .contributors, #article-page .contributors").width();
B.css("left",(A/2-B.width()/2)-10)
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
(function(A){A.event.special.mousewheel={setup:function(){var B=A.event.special.mousewheel.handler;
if(A.browser.mozilla){A(this).bind("mousemove.mousewheel",function(C){A.data(this,"mwcursorposdata",{pageX:C.pageX,pageY:C.pageY,clientX:C.clientX,clientY:C.clientY})
})
}if(this.addEventListener){this.addEventListener((A.browser.mozilla?"DOMMouseScroll":"mousewheel"),B,false)
}else{this.onmousewheel=B
}},teardown:function(){var B=A.event.special.mousewheel.handler;
A(this).unbind("mousemove.mousewheel");
if(this.removeEventListener){this.removeEventListener((A.browser.mozilla?"DOMMouseScroll":"mousewheel"),B,false)
}else{this.onmousewheel=function(){}
}A.removeData(this,"mwcursorposdata")
},handler:function(D){var B=Array.prototype.slice.call(arguments,1);
var E=0,C=true;
if(D.wheelDelta){E=D.wheelDelta/120
}if(D.detail){E=-D.detail/3
}D=A.event.fix(D||window.event);
A.extend(D,A.data(this,"mwcursorposdata")||{});
if(D.wheelDelta){E=D.wheelDelta/120
}if(D.detail){E=-D.detail/3
}D.data=D.data||{};
D.type="mousewheel";
B.unshift(E);
B.unshift(D);
return A.event.handle.apply(this,B)
}};
A.fn.extend({mousewheel:function(B){return B?this.bind("mousewheel",B):this.trigger("mousewheel")
},unmousewheel:function(B){return this.unbind("mousewheel",B)
}})
})(jQuery);
(function(A){A.jScrollPane={active:[]};
A.fn.jScrollPane=function(C){C=A.extend({},A.fn.jScrollPane.defaults,C);
var B=function(){return false
};
return this.each(function(){var S=A(this);
var d=this;
var AQ=0;
var l;
var AR;
var Q;
var AG=C.topCapHeight;
var J;
if(A(this).parent().is(".jScrollPaneContainer")){J=A(this).parent();
AQ=C.maintainPosition?S.position().top:0;
var P=A(this).parent();
l=P.innerWidth();
AR=P.outerHeight();
A(">.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown, >.jScrollCap",P).remove();
S.css({top:0})
}else{S.data("originalStyleTag",S.attr("style"));
S.css("overflow","hidden");
this.originalPadding=S.css("paddingTop")+" "+S.css("paddingRight")+" "+S.css("paddingBottom")+" "+S.css("paddingLeft");
this.originalSidePaddingTotal=(parseInt(S.css("paddingLeft"))||0)+(parseInt(S.css("paddingRight"))||0);
l=S.innerWidth();
AR=S.innerHeight();
J=A("<div></div>").addClass("jScrollPaneContainer").css({height:AR+"px",width:l+"px"});
if(C.enableKeyboardNavigation){J.attr("tabindex",C.tabIndex)
}S.wrap(J);
J=S.parent();
A(document).bind("emchange",function(AS,AT,p){S.jScrollPane(C)
})
}Q=AR;
if(C.reinitialiseOnImageLoad){var R=A.data(d,"jScrollPaneImagesToLoad")||A("img",S);
var I=[];
if(R.length){R.each(function(p,AS){A(this).bind("load readystatechange",function(){if(A.inArray(p,I)==-1){I.push(AS);
R=A.grep(R,function(AV,AU){return AV!=AS
});
A.data(d,"jScrollPaneImagesToLoad",R);
var AT=A.extend(C,{reinitialiseOnImageLoad:false});
S.jScrollPane(AT)
}}).each(function(AT,AU){if(this.complete||this.complete===undefined){this.src=this.src
}})
})
}}var AA=this.originalSidePaddingTotal;
var AM=l-C.scrollbarWidth-C.scrollbarMargin-AA;
var w={height:"auto",width:AM+"px"};
if(C.scrollbarOnLeft){w.paddingLeft=C.scrollbarMargin+C.scrollbarWidth+"px"
}else{w.paddingRight=C.scrollbarMargin+"px"
}S.css(w);
var y=S.outerHeight();
var t=AR/y;
var x=t<0.99;
J[x?"addClass":"removeClass"]("jScrollPaneScrollable");
if(x){J.append(A("<div></div>").addClass("jScrollCap jScrollCapTop").css({height:C.topCapHeight}),A("<div></div>").addClass("jScrollPaneTrack").css({width:C.scrollbarWidth+"px"}).append(A("<div></div>").addClass("jScrollPaneDrag").css({width:C.scrollbarWidth+"px"}).append(A("<div></div>").addClass("jScrollPaneDragTop").css({width:C.scrollbarWidth+"px"}),A("<div></div>").addClass("jScrollPaneDragBottom").css({width:C.scrollbarWidth+"px"}))),A("<div></div>").addClass("jScrollCap jScrollCapBottom").css({height:C.bottomCapHeight}));
var AN=A(">.jScrollPaneTrack",J);
var T=A(">.jScrollPaneTrack .jScrollPaneDrag",J);
var AP;
var G=[];
var AD;
var u=function(){if(AD>4||AD%4==0){AL(AI+AP*h)
}AD++
};
if(C.enableKeyboardNavigation){J.bind("keydown.jscrollpane",function(p){switch(p.keyCode){case 38:AP=-1;
AD=0;
u();
G[G.length]=setInterval(u,100);
return false;
case 40:AP=1;
AD=0;
u();
G[G.length]=setInterval(u,100);
return false;
case 33:case 34:return false;
default:}}).bind("keyup.jscrollpane",function(AS){if(AS.keyCode==38||AS.keyCode==40){for(var p=0;
p<G.length;
p++){clearInterval(G[p])
}return false
}})
}if(C.showArrows){var q;
var X;
var O=function(p){A("html").unbind("mouseup",O);
q.removeClass("jScrollActiveArrowButton");
clearInterval(X)
};
var g=function(){A("html").bind("mouseup",O);
q.addClass("jScrollActiveArrowButton");
AD=0;
u();
X=setInterval(u,100)
};
J.append(A("<a></a>").attr({href:"javascript:;",tabindex:-1}).addClass("jScrollArrowUp").css({width:C.scrollbarWidth+"px",top:C.topCapHeight+"px"}).html("Scroll up").bind("mousedown",function(){q=A(this);
AP=-1;
g();
this.blur();
return false
}).bind("click",B),A("<a></a>").attr({href:"javascript:;",tabindex:-1}).addClass("jScrollArrowDown").css({width:C.scrollbarWidth+"px",bottom:C.bottomCapHeight+"px"}).html("Scroll down").bind("mousedown",function(){q=A(this);
AP=1;
g();
this.blur();
return false
}).bind("click",B));
var U=A(">.jScrollArrowUp",J);
var M=A(">.jScrollArrowDown",J)
}if(C.arrowSize){Q=AR-C.arrowSize-C.arrowSize;
AG+=C.arrowSize
}else{if(U){var AE=U.height();
C.arrowSize=AE;
Q=AR-AE-M.height();
AG+=AE
}}Q-=C.topCapHeight+C.bottomCapHeight;
AN.css({height:Q+"px",top:AG+"px"});
var AJ=A(this).css({position:"absolute",overflow:"visible"});
var D;
var e;
var h;
var AI=0;
var b=t*AR/2;
var f=function(AS,AU){var AT=AU=="X"?"Left":"Top";
return AS["page"+AU]||(AS["client"+AU]+(document.documentElement["scroll"+AT]||document.body["scroll"+AT]))||0
};
var o=function(){return false
};
var AH=function(){z();
D=T.offset();
D.top-=AI;
e=Q-T[0].offsetHeight;
h=2*C.wheelSpeed*e/y
};
var E=function(p){AH();
b=f(p,"Y")-AI-D.top;
A("html").bind("mouseup",Y).bind("mousemove",r).bind("mouseleave",Y);
if(A.browser.msie){A("html").bind("dragstart",o).bind("selectstart",o)
}return false
};
var Y=function(){A("html").unbind("mouseup",Y).unbind("mousemove",r);
b=t*AR/2;
if(A.browser.msie){A("html").unbind("dragstart",o).unbind("selectstart",o)
}};
var AL=function(AS){J.scrollTop(0);
AS=AS<0?0:(AS>e?e:AS);
AI=AS;
T.css({top:AS+"px"});
var AT=AS/e;
S.data("jScrollPanePosition",(AR-y)*-AT);
AJ.css({top:((AR-y)*AT)+"px"});
S.trigger("scroll");
if(C.showArrows){U[AS==0?"addClass":"removeClass"]("disabled");
M[AS==e?"addClass":"removeClass"]("disabled")
}};
var r=function(p){AL(f(p,"Y")-D.top-b)
};
var AB=Math.max(Math.min(t*(AR-C.arrowSize*2),C.dragMaxHeight),C.dragMinHeight);
T.css({height:AB+"px"}).bind("mousedown",E);
var v;
var V;
var L;
var AF=function(){if(V>8||V%4==0){AL((AI-((AI-L)/2)))
}V++
};
var AO=function(){clearInterval(v);
A("html").unbind("mouseup",AO).unbind("mousemove",n)
};
var n=function(p){L=f(p,"Y")-D.top-b
};
var Z=function(p){AH();
n(p);
V=0;
A("html").bind("mouseup",AO).bind("mousemove",n);
v=setInterval(AF,100);
AF();
return false
};
AN.bind("mousedown",Z);
J.bind("mousewheel",function(AS,AU){AU=AU||(AS.wheelDelta?AS.wheelDelta/120:(AS.detail)?-AS.detail/3:0);
AH();
z();
var AT=AI;
AL(AI-AU*h);
var p=AT!=AI;
return !p
});
var F;
var c;
function j(){var p=(F-AI)/C.animateStep;
if(p>1||p<-1){AL(AI+p)
}else{AL(F);
z()
}}var z=function(){if(c){clearInterval(c);
delete F
}};
var AK=function(AV,p){if(typeof AV=="string"){try{$e=A(AV,S)
}catch(AU){return 
}if(!$e.length){return 
}AV=$e.offset().top-S.offset().top
}z();
var AT=y-AR;
AV=AV>AT?AT:AV;
S.data("jScrollPaneMaxScroll",AT);
var AS=AV/AT*e;
if(p||!C.animateTo){AL(AS)
}else{J.scrollTop(0);
F=AS;
c=setInterval(j,C.animateInterval)
}};
S[0].scrollTo=AK;
S[0].scrollBy=function(AS){var p=-parseInt(AJ.css("top"))||0;
AK(p+AS)
};
AH();
AK(-AQ,true);
A("*",this).bind("focus",function(AW){var AV=A(this);
var AY=0;
var AS=100;
while(AV[0]!=S[0]){AY+=AV.position().top;
AV=AV.offsetParent();
if(!AS--){return 
}}var p=-parseInt(AJ.css("top"))||0;
var AX=p+AR;
var AU=AY>p&&AY<AX;
if(!AU){var AT=AY-C.scrollbarMargin;
if(AY>p){AT+=A(this).height()+15+C.scrollbarMargin-AR
}AK(AT)
}});
if(C.observeHash){if(location.hash&&location.hash.length>1){setTimeout(function(){AK(location.hash)
},A.browser.safari?100:0)
}A(document).bind("click",function(AS){$target=A(AS.target);
if($target.is("a")){var p=$target.attr("href");
if(p&&p.substr(0,1)=="#"&&p.length>1){setTimeout(function(){AK(p,!C.animateToInternalLinks)
},A.browser.safari?100:0)
}}})
}function a(p){A(document).bind("mousemove.jScrollPaneDragging",W);
A(document).bind("mouseup.jScrollPaneDragging",N)
}var m;
var H;
function k(){direction=m<0?-1:1;
S[0].scrollBy(m/2)
}function K(){if(H){clearInterval(H);
H=undefined
}}function W(AT){var AU=S.parent().offset().top;
var p=AU+AR;
var AS=f(AT,"Y");
m=AS<AU?AS-AU:(AS>p?AS-p:0);
if(m==0){K()
}else{if(!H){H=setInterval(k,100)
}}}function N(p){A(document).unbind("mousemove.jScrollPaneDragging").unbind("mouseup.jScrollPaneDragging");
K()
}J.bind("mousedown.jScrollPane",a);
A.jScrollPane.active.push(S[0])
}else{S.css({height:AR+"px",width:l-this.originalSidePaddingTotal+"px",padding:this.originalPadding});
S[0].scrollTo=S[0].scrollBy=function(){};
S.parent().unbind("mousewheel").unbind("mousedown.jScrollPane").unbind("keydown.jscrollpane").unbind("keyup.jscrollpane")
}if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))||(navigator.userAgent.match(/Android/i))){var AC=1
}else{var AC=0
}J.bind("touchstart",function(AS){var AU=AI;
if(AC){AS=AS.originalEvent.touches[0]
}var p=AS.pageY;
var AT=AS.pageX;
J.bind("touchmove",function(AV){if(AC){AV.preventDefault();
AV=AV.originalEvent.touches[0]
}var AW=AU-(AV.pageY-p);
AL(AW)
});
J.bind("touchend",function(AV){J.unbind("touchmove touchend")
})
})
})
};
A.fn.jScrollPaneRemove=function(){A(this).each(function(){$this=A(this);
var B=$this.parent();
if(B.is(".jScrollPaneContainer")){$this.css({top:"",height:"",width:"",padding:"",overflow:"",position:""});
$this.attr("style",$this.data("originalStyleTag"));
B.after($this).remove()
}})
};
A.fn.jScrollPane.defaults={scrollbarWidth:10,scrollbarMargin:5,wheelSpeed:18,showArrows:false,arrowSize:0,animateTo:false,dragMinHeight:1,dragMaxHeight:99999,animateInterval:100,animateStep:3,maintainPosition:true,scrollbarOnLeft:false,reinitialiseOnImageLoad:false,tabIndex:0,enableKeyboardNavigation:true,animateToInternalLinks:false,topCapHeight:0,bottomCapHeight:0,observeHash:true};
A(window).bind("unload",function(){var C=A.jScrollPane.active;
for(var B=0;
B<C.length;
B++){C[B].scrollTo=C[B].scrollBy=null
}})
})(jQuery);
var dailybeast=dailybeast||{};
dailybeast.flyout=dailybeast.flyout||{};
dailybeast.flyout.recommendation=dailybeast.flyout.recommendation||{};
dailybeast.flyout.recommendation.RecommendedLinksFlyoutStatic=dailybeast.flyout.recommendation.RecommendedLinksFlyoutStatic||{};
RecommendedLinksFlyoutStatic=dailybeast.flyout.recommendation.RecommendedLinksFlyoutStatic;
RecommendedLinksFlyoutStatic.isHomePage=function(){return $("body").attr("id")=="home-page"
};
RecommendedLinksFlyoutStatic.isArticlePage=function(){return $("body").attr("id")=="article-page"
};
RecommendedLinksFlyoutStatic.getScrollPercentage=function(){var B=$(window).scrollTop();
var D=$(window).height();
var C=$(document).height();
var A=B/(C-D)*100;
return A
};
RecommendedLinksFlyoutStatic.getDefaultRecommendedLinks=function(){var B=dailybeast.cookie.UserCookies.defaultUserType;
var A=RecommendedLinksFlyoutStatic.recommendedLinksMap[B];
return A
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout=function(A){this.flyoutElement=A;
this.visible=false;
this.closed=false
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.show=function(){if(this.isShowable()){this.markVisible(true);
this.flyoutElement.stop();
this.flyoutElement.show();
var A=this.flyoutElement.width();
this.flyoutElement.css("right",-A);
this.flyoutElement.animate({right:0},500)
}else{$.log("Not showing the recommendation flyout")
}};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.hide=function(){if(this.isVisible()){this.markVisible(false);
this.flyoutElement.stop();
var A=this.flyoutElement.width();
this.flyoutElement.animate({right:-A},500,function(){$(this).hide()
})
}};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.close=function(){this.closed=true;
this.hide()
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.isShowable=function(){return !this.isVisible()&&!this.closed&&!window.flyoutLock
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.isVisible=function(){return this.visible
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.markVisible=function(A){this.visible=A;
window.flyoutLock=A
};
RecommendedLinksFlyoutStatic.initializeFlyout=function(B,H){var G=B.title;
var E=B.rubric;
var C=B.url;
var A=false;
$("#recommended-links-flyout a").html(G);
$("#recommended-links-flyout a").prop("href",C);
$("#recommended-links-flyout a").attr("data-track","'title':'recommended-links-"+H+"'");
$("#recommended-links-flyout .rubric-area").html(E);
RecommendedLinksFlyoutStatic.instance=new dailybeast.flyout.recommendation.RecommendedLinksFlyout($("#recommended-links-flyout"));
var F=$("#recommended-links-flyout .close-icon");
F.click(function(){RecommendedLinksFlyoutStatic.instance.close()
});
var D=$("#recommended-links-flyout a");
D.click(function(){trackFlyoutClick(C)
});
$(window).scroll(function(){var I=1500;
if($(".storymeta").length>0){I=$(".storymeta").offset().top
}else{if($(".storyFooter").length>0){I=$(".storyFooter").offset().top
}}var J=$(window).scrollTop();
var K=$(window).height();
if(J+K>I){if(!window.flyoutLock&&!RecommendedLinksFlyoutStatic.instance.isVisible()){RecommendedLinksFlyoutStatic.instance.show();
trackFlyoutVisible(C,A);
A=true
}}else{if(RecommendedLinksFlyoutStatic.instance.isVisible()){RecommendedLinksFlyoutStatic.instance.hide()
}}})
};
function trackFlyoutVisible(B,A){if(A){return 
}s.linkTrackVars="prop50,eVar30,events";
s.linkTrackEvents="event30";
s.prop50=B;
s.eVar30=B;
s.events="event30";
s.tl(this,"o","Flyout Tracking")
}function trackFlyoutClick(A){s.linkTrackVars="prop50,eVar30,events";
s.linkTrackEvents="event31";
s.prop50=A;
s.eVar30=A;
s.events="event31";
s.tl(this,"o","Flyout Click Tracking")
}RecommendedLinksFlyoutStatic.getAvailableRecommendedLinks=function(){var D=[];
var E=dailybeast.cookie.UserCookies.getUserType();
var F=RecommendedLinksFlyoutStatic.recommendedLinksMap[E]||[];
var C=RecommendedLinksFlyoutStatic.getDefaultRecommendedLinks()||[];
var B=UserCookies.getVisitedUrls();
if(B==null){D=D.concat(F);
D=D.concat(C)
}else{for(i=0;
i<F.length;
i++){var A=F[i];
if(B.indexOf(A.urlHashCode)<0){D.push(A)
}}for(i=0;
i<C.length;
i++){A=C[i];
if(B.indexOf(A.urlHashCode)<0){D.push(A)
}}}return D
};
RecommendedLinksFlyoutStatic.chooseRecommendedLink=function(){var B=null;
var C=RecommendedLinksFlyoutStatic.getAvailableRecommendedLinks();
if(C.length>0){var A=Math.floor(Math.random()*C.length);
B=C[A]
}return B
};
dailybeast.flyout.recommendation.RecommendedLinksFlyoutStatic.instance;
$(function(){if(RecommendedLinksFlyoutStatic.isArticlePage()){if(!(typeof RecommendedLinksFlyoutStatic.recommendedLinksMap==="undefined")){var A=RecommendedLinksFlyoutStatic.chooseRecommendedLink();
if(A!=null){RecommendedLinksFlyoutStatic.initializeFlyout(A,userType)
}}}});
(function(B){function A(C){this.$overlay=null;
this.settings=B.extend({onClose:function(){}},C)
}A.prototype={listenForEscKey:function(){var C=this;
B(document).bind("keydown.FullScreenOverlay",function(D){if(D.keyCode===27&&B("#wbx-lb-cont-div").length===0){C.close()
}})
},enableScrolling:function(){B("html").css({overflow:"auto"});
B(window).scrollTop(this.scrollTop)
},disableScrolling:function(){this.scrollTop=B(window).scrollTop();
B("html").css({overflow:"hidden"})
},open:function(C){this.$overlay=B("#fullscreen-overlay");
this.disableScrolling();
if(this.$overlay.length<=0){this.$overlay=B('<div id="fullscreen-overlay"></div>').css({display:"none",position:"fixed",top:"0px",left:"0px"}).appendTo("body")
}this.$overlay.html(C);
if(!this.$overlay.is(":visible")){this.$overlay.fadeIn(50)
}this.listenForEscKey();
return this.$overlay
},close:function(){this.enableScrolling();
if(this.$overlay!==null){this.$overlay.fadeOut(50);
this.$overlay.html("")
}B(document).unbind(".FullScreenOverlay");
this.settings.onClose()
}};
window.FullScreenOverlay=A
})(jQuery);
var GalleryUrlUtil={isAGallery:function(A){return A&&(A.match("/galleries/")||A.match("/photo/"))
}};
(function(C){var B=null,A=false,D=window.location.pathname,F=document.title,I=null;
function E(){I.hideLoading();
document.title=F;
if(Modernizr.history){history.pushState(null,"",D)
}A=false
}function H(J){if(B===null){B=new FullScreenOverlay({onClose:E})
}I=new GalleryView(B.open(),{onClose:function(){B.close()
}});
I.loadGallery(J,true);
A=true
}function G(){return Modernizr.history&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&C("#gallery2-page").length===0
}C(function(){if(G()){C("a[href]").each(function(){var J=C(this);
var K=J.attr("href");
if(GalleryUrlUtil.isAGallery(K)&&!isAppleDevice){J.click(function(){H(K);
return false
})
}});
C(window).bind("popstate",function(){C(".fb_dialog_close_icon").click();
C(".stclose").click();
if(location.pathname===D){if(B!==null){B.close();
A=false
}}else{if(!A){var J=window.location.pathname+window.location.hash;
if(GalleryUrlUtil.isAGallery(J)){H(J)
}}}})
}else{C.warn("Not attaching galleries as overlays.  HTML5 history not detected:"+Modernizr.history)
}})
})(jQuery);
$.priorityQ.windowReady.add("Pagination",$.priorityQ.NORMAL,function(){var paginationEnabled=false;
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
}});
var loadBackplane1_2=function(){$.log("Adding Backplane 1.2");
window.Backplane=window.Backplane||(function(){var BP=function(fn){if(Backplane.getChannelID()){fn()
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
(function(a){function b(a){if(a.data.indexOf("capture:")!==0){return 
}c(a.data.substring(8))
}function c(b){var c,b,d,e,f,g,h,i,j,k;
c=b.indexOf(";");
if(c<0){throw new Error("Capture xdreceiver: Missing flags separator.")
}d=b.substring(0,c).split(","),h=b.substring(c+1),c=h.indexOf(":");
if(c<0){throw new Error("Capture xdreceiver: Missing func separator.")
}g=h.substring(0,c),f=decodeURIComponent(h.substring(c+1)),i=function(a,b){for(var c=0;
c<a.length;
c++){if(a[c]==b){return c
}}return -1
},k={refresh:function(){a.document.cookie="janrain_sso_checked=;expires="+(new Date).toGMTString()+";path=/;"
},logout:function(b){k.refresh(),a.document.location.href=b
}};
if(i(d,"sso")>=0){j=k[g],j(f);
return 
}try{j=window.eval(g);
if(typeof j=="undefined"){throw new Error("unable to eval "+g)
}window.setTimeout(function(){j(f)
},0)
}catch(l){window.console&&console.log&&console.log("xdcomm: error running function "+g)
}}window.addEventListener?window.addEventListener("message",b,!1):window.attachEvent?window.attachEvent("onmessage",b):document.attachEvent&&document.attachEvent("onmessage",b)
})(this);
$.log("Done adding Backplane 1.2")
};
$.priorityQ.domReady.add("Jainrain Services",$.priorityQ.IMPORTANT,function(){window.dailybeast=window.dailybeast||{};
window.dailybeast.janrain=window.dailybeast.janrain||function(){var B={};
B.loginForm=$(".userLogin");
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
listeners=[];
A.registerLoginListener=function(B){listeners.push(B)
};
A.handleMessage=function(B){$.log("Backplane message",B);
if(B.type=="identity/login"){if(typeof B.payload!="undefined"&&!A.isUserLoggedIn()){$.log("User successfully logged in");
A.setUserData(B.payload)
}A.loginForm.trigger("userLoggedIn")
}};
A.isUserLoggedIn=function(){return !$.isEmptyObject(A.userData)
};
A.getDisplayName=function(){return A.userData.displayName
};
A.setUserData=function(B){$.log("Setting user data from backplane payload",B);
A.userData=(!$.isEmptyObject(B)&&typeof B.identities!="undefined")?B.identities.entry:null
};
A.recoverPassword=function(){return $("#fancybox-frame").attr("src",A.baseUrl+"/content/dailybeast/services/password-reset.html?step=email")
};
A.logout=function(){$.log("Logging out "+A.getDisplayName());
A.setUserData(null);
Backplane.resetCookieChannel();
A.loginForm.data("state","signingout");
A.finishLogout()
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
}$("body").trigger("fancybox-close");
if(!A.isUserLoggedIn()){dailybeast.livefyre.delegate.failure()
}},onComplete:function(){var B=($.browser.msie&&document.compatMode!="CSS1Compat"?40:0);
$("#fancybox-frame").css({width:this.width-B,height:this.height-B})
},onStart:function(){Backplane.expectMessages("identity/login");
if($.browser.msie&&document.compatMode!="CSS1Compat"){var B=$("#fancybox-overlay").get(0).style;
B.setExpression("height","Math.max(document.body.clientHeight, document.body.scrollHeight)");
B.setExpression("width","Math.max(document.body.clientWidth, document.body.scrollWidth)")
}$("body").trigger("fancybox-open")
}})
};
A.onUserLogin=function(){for(var B=0;
B<listeners.length;
B++){listeners[B].call()
}A.closeLoginForm()
};
A.init=function(){$.log("Backplane 1.2 initialized - subscribing to events");
if(A.loginForm.data("state")=="signingout"){A.finishLogout()
}else{A.loginForm.bind("userLoggedIn",A.onUserLogin);
A.backplaneMessages=Backplane.subscribe(A.handleMessage);
$.log("Setting up the user box");
A.initLoginBox()
}};
if(A.loginForm.length>0){loadBackplane1_2();
Backplane(A.init);
Backplane.init({serverBaseURL:"https://backplane1.janrainbackplane.com/v1.2",busName:"newsweek.com",initFrameFilter:Backplane.identityServices.init})
}else{loadBackplane1_2()
}});
$.priorityQ.domReady.add("Livefyre Objects",$.priorityQ.IMPORTANT,function(){window.dailybeast=window.dailybeast||{};
window.dailybeast.livefyre=window.dailybeast.livefyre||function(){var B={};
B.$lfScripts=$("[data-lf-domain]");
B.network=B.$lfScripts.length>0?$(B.$lfScripts[0]).attr("data-lf-domain"):"";
B.$commentContainer=$("#livefyre");
B.config=B.$commentContainer.length>0?$.parseJSON(B.$commentContainer.attr("data-livefyre")):{};
B.streamType=$("#livefyre-chat").length<=0?"comments":"chat";
B.notifierEnabled=(B.$commentContainer.attr("data-notifier-enabled")=="true"||$.tdburl.hash.lfNotify=="true")&&B.streamType=="comments";
B.avatarsEnabled=(B.$commentContainer.attr("data-avatar-enabled")=="true"||$.tdburl.hash.avatarEnabled=="true");
B.$liveCountHeader=B.$commentContainer.find(".comment-count-header");
B.$liveCount=$('[data-lf-article-id="'+B.config.articleId+'"]');
B.defaultPattern="(%1)";
return B
}();
var A=dailybeast.livefyre;
if(typeof fyre!="undefined"){A.authDelegate=new fyre.conv.BackplaneAuthDelegate(window.Backplane);
A.authDelegate.login=function(B){A.delegate=B;
dailybeast.janrain.openLoginForm()
};
A.authDelegate.logout=function(){dailybeast.janrain.logout()
};
A.authDelegate.viewProfile=function(){};
A.authDelegate.editProfile=function(){}
}A.expandPattern=function(D){var E=$(D).attr("data-pattern");
var B=E?E:A.defaultPattern;
for(var C=1;
C<arguments.length;
C++){B=B.replace("%"+C,arguments[C])
}return B
};
A.updateLiveCount=function(B){if(!$.isEmptyObject(A.$liveCount)){A.$liveCount.each(function(C,D){$(D).html(A.expandPattern(D,B))
})
}};
A.updateLiveCountHeader=function(B){if(!$.isEmptyObject(A.$liveCountHeader)){A.$liveCountHeader.each(function(C,D){B>=10?$(D).html(A.expandPattern(D,B)):$(D).html("")
})
}};
A.onCommentCountUpdated=function(B){$.log("Latest count from LF stream event:"+B);
if(B>=0){A.updateLiveCount(B);
A.updateLiveCountHeader(B)
}};
A.onUserLogin=function(){A.initNotifier()
};
A.isNotifierEnabled=function(){return($("#livefyre").length>0&&A.$commentContainer.attr("data-notifier-enabled")=="true"&&window.dailybeast.janrain.isUserLoggedIn())||$.tdburl.hash.lfNotify=="true"
};
A.initNotifier=function(){if(A.isNotifierEnabled()){dailybeast.retry.start({name:"Livefyre Notifier",toRun:function(){if($(".fyre-notifier-container").length>0){$.log("Enabling the LF notifier",$(".fyre-notifier-container"));
$(".fyre-notifier-container").css("left","0px");
if($.tdburl.hash.lfNotify=="true"){$(".fyre-notifier-container").show()
}return true
}else{return false
}}})
}else{$.log("LF Notifier is not enabled.")
}};
A.lfready=function(C){try{$.log("Livefyre is ready, attaching custom handlers");
C.on("commentCountUpdated",A.onCommentCountUpdated);
if(!$.isEmptyObject(A.$liveCount)&&A.$liveCount.html()==""){A.updateLiveCount(0)
}A.initAvatarQTip();
A.initNotifier();
A.$commentContainer.removeClass("spinner");
A.$commentContainer.find("#lf_comment_stream").show()
}catch(B){$.error("Livefyre failed to load",B);
A.$commentContainer.hide()
}};
A.loadStream=function(){if($("#livefyre").length>0&&typeof A.authDelegate!="undefined"){try{fyre.conv.load({network:A.network,authDelegate:A.authDelegate,},[A.config],A.lfready)
}catch(B){$.error("Livefyre failed to load",B);
A.$commentContainer.hide()
}}};
A.loadCommentCounts=function(){if(typeof LF!="undefined"){$.log("Loading comment counts");
LF.CommentCount({replacer:function(B,D){var C=$(B).attr("data-lf-article-id");
if(C==A.config.articleId){$.log("Deferring to live count - as the article id has a stream on the page")
}else{$.log("LF CommentCount returned "+D+" for "+C);
if(D>=0){$(B).html(A.expandPattern(B,D))
}}}})
}};
A.initAvatarQTip=function(){if(!A.avatarsEnabled){$("<style type='text/css'> #livefyre .fyre-comment-like-imgs .fyre-avatar {display: none;} </style>").appendTo("head")
}$("#livefyre").on("click",".fyre-comment-like-imgs .fyre-avatar a",false);
$("#livefyre").on("mouseover",".fyre-comment-like-imgs .fyre-avatar",function(C){var B=$(this);
if(typeof B.data("qtip")==="undefined"){B.qtip({content:B.data("title"),show:{ready:true,when:{event:"mouseover"}},hide:"mouseout",position:{corner:{tooltip:"topLeft",target:"rightBottom"}},style:{border:{width:5,radius:10},padding:10,textAlign:"center",tip:true,name:"light"}})
}})
};
A.init=function(){try{$.log("Initializing livefyre on the Beast",A.network);
window.dailybeast.janrain.loginForm.bind("userLoggedIn",A.onUserLogin);
window.dailybeast.janrain.registerLoginListener(function(){if(A.delegate){A.delegate.success()
}});
A.loadCommentCounts();
if(typeof $.tdburl.hash.suppressCommentLoad=="undefined"){A.loadStream()
}}catch(B){$.error("Could not init livefyre",B)
}}
});
$.priorityQ.windowReady.add("Livefyre",$.priorityQ.NORMAL,function(){if(window.dailybeast.livefyre){window.dailybeast.livefyre.init()
}});
var dailybeast=dailybeast||{};
dailybeast.commons=dailybeast.commons||{};
dailybeast.commons.NamespaceUtils={initNamespace:function(D){var E=D.split(".");
var A=window;
for(var C=0;
C<E.length;
C++){var B=E[C];
A[B]=A[B]||{};
A=A[B]
}return A
}};
dailybeast.commons.NamespaceUtils.initNamespace("dailybeast.commons");
dailybeast.commons.PlatformPreferenceUtils={cookieName:"X-UA-Device-force",setMobile:function(){$.log("setting platform preference cookie to mobile");
$.cookie(this.cookieName,"mobile",{path:"/",expires:10000})
},setDesktop:function(){$.log("setting platform preference cookie to desktop");
$.cookie(this.cookieName,"desktop",{path:"/",expires:10000})
}};