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
}}}if(isAppleDevice){document.addEventListener("touchend",updateFloatingAd,false)
}else{$(window).on("scroll",updateFloatingAd)
}}$.widget("ui.advertising",{options:{iFrame:false,editNamespace:"edit",adNamespace:"ad",entityNamespace:"entity",topicNamespace:"topic",packageNamespace:"package",audienceScienceCookie:"rsi_segs",customTile:"false",disable:"false",render:"true",siteID:"5480.iac.thedailybeast",topic:"",size:"",params:null,tile:1,ord:dailybeast.interstitial.getOrd(),zone:"",template:""},refresh:function(A){this._refresh(A)
},hide:function(){this._hide()
},show:function(){this._show()
},_create:function(){if(this.options.disable=="false"){this._setSize();
this._setAdParams();
$.data(this.element,"isReady",true)
}},_refresh:function(A){if((this._isReady()&&$(this.element).is(":visible"))||$(this.element).attr("forceShowing")=="true"){this._setReady(false);
this._render(this._generateUrl(A))
}},_render:function(B){var C=this;
if(!C._adParams.adDisable){if(this.options.iFrame){$(this.element).html('<iframe width="'+this._width+'" height="'+this._height+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowTransparency="true" src="/etc/static/dailybeast/dart.html#'+encodeURIComponent(B)+'"/>');
this._setReady(true)
}else{var A="<script src='"+B+"'><\/script>";
if($.browser.msie){writeCapture.proxyGetElementById=true
}else{writeCapture.writeOnGetElementById=true
}$(this.element).html(writeCapture.sanitize(A,{done:function(){C._setReady(true);
if(C._adParams.adDebug){C._enableDebugging(B)
}if($(C.element).html().indexOf("grey.gif")>=0){$(C.element).hide()
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
this.galleryContext=baseContext.push(this.data).push(this.data.gallery);
this.setSlideHash();
this.render();
this.bindWindowAndDocumentEvents()
},setViewData:function(C){this.init();
this.data=C;
this.gallery=C.gallery;
this.slideIndex=C.currentSlide;
this.slideCount=C.gallery.slides.length;
this.galleryContext=baseContext.push(C).push(C.gallery);
this.slideUrlMapping=this.getSlideUrlMapping(C.gallery)
},bindWindowAndDocumentEvents:function(){var D=this,E=true,C=window.location.hash;
A(window).unbind(".galleryView").bind("resize.galleryView",function(){D.resize()
}).bind("orientationchange.galleryView",function(){D.resize()
}).bind("popstate.galleryView",function(F){if(F.originalEvent&&D.gallery&&!D.isSameGallery(window.location.pathname)){D.loadGallery(D.getCurrentRelativeUrl(),false)
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
A.ajax(D.replace(/\.html.*/,".gallery.json"),{dataType:"json",success:function(I){var H=I.gallery.slides,F,J;
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
}})
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
},trackPageView:function(F){var H=window.location.protocol+"//"+window.location.host+this.gallery.slides[this.slideIndex].url,G=this.gallery.id.replace("/content",""),J=this.gallery.id.indexOf("newsweek")===-1?"db":"nw",E="Gallery 2",I=J+" - "+E+" - "+this.data.gallery.title,D="";
A.each(this.gallery.tags,function(L,K){if(D===""){D=K.id
}else{D+="|"+K.id
}});
var C;
C=dailybeast.metatags.getPlatform();
if(!F){F=this.referringUrl
}dailybeast.analytics.trackPageview({pageNum:this.slideIndex,url:H,referer:F,pageName:I,previousPageName:this.previousPageTitle,templateName:this.gallery.type,contentPath:G,wrapName:this.gallery.wrap,tags:D,platform:C})
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
}if(typeof IN!="undefined"){IN.parse(A("#gallery")[0])
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
(function(){dust.register("mobilenewsweek/components/pages/section/body",K);
function K(O,N){return O.write('<section class="newsweek-page"><section class="page container_12"><header class="header"><h1 class="page-title">').reference(N.get("title"),N,"h").write('</h1></header><section class="body clearfix">').section(N.get("coverStory"),N,{block:I},null).write('<section class="carousel"><ul class="list-media clearfix">').section(N.getPath(false,["slider","items"]),N,{block:H},null).write('</ul><div class="view-more">').section(N.get("pagination"),N,{block:G},null).write('</div></section></section></section><aside class="aside container_12"><section class="module">').section(N.get("include"),N,{},{resourceType:"mobilenewsweek/components/section/features"}).write('</section><section class="module">').partial("mobilebeast/components/page/footerad",N,null).write("</section>").exists(N.get("columns"),N,{block:E},null).exists(N.get("international"),N,{block:C},null).exists(N.get("photoGalleries"),N,{block:A},null).exists(N.get("omnivore"),N,{block:L},null).write("</aside></section>")
}function I(O,N){return O.section(N.get("include"),N,{},{resourceType:"mobilebeast/components/featureditem"})
}function H(O,N){return O.section(N.get("include"),N,{},{resourceType:"mobilebeast/components/articlelistitem"})
}function G(O,N){return O.exists(N.get("nextPage"),N,{block:F},null)
}function F(O,N){return O.write('<a href="').reference(N.get("nextPage"),N,"h").write('">More Features<span class="icon-arrow-east" aria-hidden="true"></span></a>')
}function E(O,N){return O.write('<section class="module">').section(N.get("columns"),N,{block:D},null).write("</section>")
}function D(O,N){return O.partial("mobilenewsweek/components/pages/section/module_list",N,null)
}function C(O,N){return O.write('<section class="module">').section(N.get("international"),N,{block:B},null).write("</section>")
}function B(O,N){return O.partial("mobilenewsweek/components/pages/section/module_list",N,null)
}function A(O,N){return O.write('<section class="module">').section(N.get("photoGalleries"),N,{block:M},null).write("</section>")
}function M(O,N){return O.partial("mobilenewsweek/components/pages/section/module_list",N,null)
}function L(O,N){return O.write('<section class="module">').section(N.get("omnivore"),N,{block:J},null).write("</section>")
}function J(O,N){return O.partial("mobilenewsweek/components/pages/section/module_list",N,null)
}return K
})();
(function(){dust.register("mobilenewsweek/components/pages/section/module_list",E);
function E(H,G){return H.write('<header class="header"><h2 class="header-title">').reference(G.get("header"),G,"h").write('</h2></header><ul class="list-media clearfix">').section(G.get("items"),G,{block:D},null).write('</ul><div class="view-more">').section(G.get("pagination"),G,{block:A},null).write("</div>")
}function D(H,G){return H.write('<li><article class="clearfix"><div class="grid_4 first clearfix"><a class="clearfix" href="').reference(G.get("url"),G,"h").write('">').partial("mobilebeast/components/media/thumbnail",G,null).write('</a></div><div class="prefix_4"><h4 class="rubric">').reference(G.get("rubric"),G,"h").write('</h4><h3 class="title"><a href="').reference(G.get("url"),G,"h").write('">').reference(G.get("shortTitle"),G,"h").write("</a></h3>").section(G.get("authors"),G,{block:C},null).write("</div></article></li>")
}function C(H,G){return H.write('<small class="byline">by ').reference(G.get("name"),G,"h").helper("sep",G,{block:B},null).write("</small>")
}function B(H,G){return H.write(", ")
}function A(H,G){return H.exists(G.get("nextPage"),G,{block:F},null)
}function F(H,G){return H.write('<a href="').reference(G.get("nextPage"),G,"h").write('">More Features<span class="icon-arrow-east" aria-hidden="true"></span></a>')
}return E
})();
(function(){dust.register("mobilenewsweek/components/section/features/features",D);
function D(F,E){return F.write('<header class="header"><h2 class="header-title">Features & Highlights</h2></header><ul class="list-media">').section(E.getPath(false,["features","items"]),E,{block:C},null).write('</ul><div class="view-more">').section(E.get("pagination"),E,{block:B},null).write("</div>")
}function C(F,E){return F.section(E.get("include"),E,{},{resourceType:"mobilebeast/components/articlelistitem"})
}function B(F,E){return F.exists(E.get("nextPage"),E,{block:A},null)
}function A(F,E){return F.write('<a href="').reference(E.get("nextPage"),E,"h").write('">More Features<span class="icon-arrow-east" aria-hidden="true"></span></a>')
}return D
})();
(function(){dust.register("mobilebeast/components/slider/slider",C);
function C(E,D){return E.write('<div class="slider"><ul class="slides">').section(D.getPath(false,["slider","items"]),D,{block:B},null).section(D.get("teasers"),D,{block:A},null).write('</ul></div><nav class="slide-nav lines"><ul class="listInline clearfix"><li class="prev grid_4"><a href="#"><span class="icon-arrow-west"></span>Prev</a></li><li class="slide-count grid_4"><span class="slide-number">1</span> of <span class="total-slides"></span></li><li class="next grid_4"><a href="#">Next<span class="icon-arrow-east"></span></a></li></ul></nav>')
}function B(E,D){return E.partial("mobilebeast/components/slider/slide",D,null)
}function A(E,D){return E.partial("mobilebeast/components/slider/slide",D,null)
}return C
})();
(function(){dust.register("mobilebeast/components/slider/slide",D);
function D(F,E){return F.write('<li class="slide" data-id="').reference(E.get("id"),E,"h").write('" data-number="').reference(E.get("slideNumber"),E,"h").write('"><article>').section(E.get("image"),E,{block:C},null).write('<h2 class="title"><a href="').reference(E.get("url"),E,"h").write('">').reference(E.get("shortTitle"),E,"h").write('</a></h2><p class="dek">').reference(E.get("dek"),E,"h",["s"]).write("</p></article></li>")
}function C(F,E){return F.write('<a href="').reference(E.get("url"),E,"h").write('"><img class="img-100 next" alt="').reference(E.get("title"),E,"h").write('" title="').reference(E.get("title"),E,"h").write('" src="').reference(E.getPath(false,["sizes","large"]),E,"h").write('"/></a><figcaption class="photocredit">').section(E.get("credits"),E,{block:B},null).write("</figcaption>")
}function B(F,E){return F.reference(E.getPath(true,[]),E,"h").helper("sep",E,{block:A},null)
}function A(F,E){return F.write(", ")
}return D
})();
(function(){dust.register("mobilebeast/components/callout/callout",B);
function B(D,C){return D.exists(C.get("text"),C,{block:A},null)
}function A(D,C){return D.write('<h3 class="callout dots"><a href="').reference(C.get("link"),C,"h").write('">').reference(C.get("text"),C,"h").write("</a></h3>")
}return B
})();
(function(){dust.register("mobilebeast/components/text/text",A);
function A(C,B){return C.reference(B.get("text"),B,"h",["s"])
}return A
})();
(function(){dust.register("mobilebeast/components/articlelistitem/articlelistitem",L);
function L(P,O){return P.write('<li><article class="clearfix"><div class="grid_4 first clearfix"><a class="img" href="').reference(O.get("url"),O,"h").write('">').partial("mobilebeast/components/media/thumbnail",O,null).write('</a></div><div class="prefix_4"><h3 class="rubric">').section(O.get("equals"),O,{"else":J,block:H},{prop:O.get("root_resourceType"),value:"mobilebeast/components/pages/wrap"}).write('</h3><h2 class="title"><a href="').reference(O.get("url"),O,"h").write('">').reference(O.get("shortTitle"),O,"h").write("</a></h2>").section(O.get("neq"),O,{block:E},{prop:O.get("type"),value:"video"}).section(O.get("equals"),O,{"else":M,block:I},{prop:O.get("root_resourceType"),value:"mobilebeast/components/pages/content"}).write("</div></article></li>")
}function J(P,O){return P.reference(O.get("rubric"),O,"h")
}function H(P,O){return P.exists(O.get("rubric"),O,{"else":G,block:F},null)
}function G(P,O){return P.reference(O.get("type"),O,"h")
}function F(P,O){return P.reference(O.get("rubric"),O,"h")
}function E(P,O){return P.exists(O.get("byline"),O,{"else":D,block:N},null)
}function D(P,O){return P.exists(O.get("authors"),O,{block:C},null)
}function C(P,O){return P.write('<small class="byline">by ').section(O.get("authors"),O,{block:B},null).write("</small>")
}function B(P,O){return P.reference(O.get("name"),O,"h").helper("sep",O,{block:A},null)
}function A(P,O){return P.write(", ")
}function N(P,O){return P.write('<small class="byline">by ').reference(O.get("byline"),O,"h").write("</small>")
}function M(P,O){return P.section(O.get("equals"),O,{block:K},{prop:O.get("type"),value:"video"})
}function K(P,O){return P.write('<time class="timestamp" datetime="').reference(O.getPath(false,["publicationDate","w3cDateTime"]),O,"h").write('" pubdate="pubdate">').reference(O.getPath(false,["publicationDate","mediumDateTime"]),O,"h").write("</time>")
}function I(P,O){return P.write('<time class="timestamp" datetime="').reference(O.getPath(false,["publicationDate","w3cDateTime"]),O,"h").write('" pubdate="pubdate">').reference(O.getPath(false,["publicationDate","mediumDateTime"]),O,"h").write("</time>")
}return L
})();
(function(){dust.register("mobilebeast/components/gallery/gallery",J);
function J(N,M){return N.write('<section class="grid_12"><div class="gallery">').partial("mobilebeast/components/gallery/controls",M,null).write('<ul class="slides">').section(M.get("slides"),M,{block:I},null).write("</ul></div></section>")
}function I(N,M){return N.write('<li class="slide" data-id="').reference(M.get("id"),M,"h").write('" data-number="').reference(M.get("slideNumber"),M,"h").write('">').section(M.get("image"),M,{block:H},null).write('<h2 class="title">').section(M.get("isIntro"),M,{"else":E,block:C},null).reference(M.get("title"),M,"h").write("</h2>").section(M.get("isIntro"),M,{block:B},null).write('<div class="dek">').reference(M.get("caption"),M,"h",["s"]).write("</div></li>")
}function H(N,M){return N.write('<img class="img-100 next" alt="').reference(M.get("title"),M,"h").write('" title="').reference(M.get("title"),M,"h").write('" src="').reference(M.getPath(false,["sizes","large"]),M,"h").write('"/><figcaption class="photocredit">').section(M.get("credits"),M,{block:G},null).write("</figcaption>")
}function G(N,M){return N.reference(M.getPath(true,[]),M,"h").helper("sep",M,{block:F},null)
}function F(N,M){return N.write(", ")
}function E(N,M){return N.reference(M.get("listicleNumber"),M,"h").exists(M.get("listicleType"),M,{block:D},null)
}function D(N,M){return N.write(". ")
}function C(N,M){return N
}function B(N,M){return N.exists(M.get("authors"),M,{block:A},null)
}function A(N,M){return N.write('<small class="byline">by ').section(M.get("authors"),M,{block:L},null).write("</small>")
}function L(N,M){return N.reference(M.get("name"),M,"h").helper("sep",M,{block:K},null)
}function K(N,M){return N.write(", ")
}return J
})();
(function(){dust.register("mobilebeast/components/gallery/controls",A);
function A(C,B){return C.write('<nav class="slide-nav lines"><ul class="listInline clearfix"><li class="prev grid_4"><a href="#"><span class="icon-arrow-west"></span>Prev</a></li><li class="slide-count grid_4"><span class="slide-number">1</span> of ').reference(B.get("totalSlides"),B,"h").write('</li><li class="next grid_4"><a href="#">Next<span class="icon-arrow-east"></span></a></li></ul></nav>')
}return A
})();
(function(){dust.register("mobilebeast/components/featureditem/featureditem",E);
function E(H,G){return H.write('<section class="featured clearfix"><article class="clearfix"><div class="grid_6  first clearfix"><a class="img" href="').reference(G.get("url"),G,"h").write('"><img class="img-100 clearfix" alt="').reference(G.getPath(false,["image","alt"]),G,"h").write('" title="').reference(G.getPath(false,["image","title"]),G,"h").write('" src="').reference(G.getPath(false,["image","sizes","large"]),G,"h").write('"/></a></div><div class="prefix_6 clearfix"><h2 class="title"><a href="').reference(G.get("url"),G,"h").write('">').reference(G.get("shortTitle"),G,"h").write("</a></h2>").exists(G.get("byline"),G,{"else":D,block:F},null).write("</div></article></section>")
}function D(H,G){return H.exists(G.get("authors"),G,{block:C},null)
}function C(H,G){return H.write('<small class="byline">by ').section(G.get("authors"),G,{block:B},null).write("</small>")
}function B(H,G){return H.reference(G.get("name"),G,"h").helper("sep",G,{block:A},null)
}function A(H,G){return H.write(", ")
}function F(H,G){return H.write('<small class="byline">by ').reference(G.get("byline"),G,"h").write("</small>")
}return E
})();
(function(){dust.register("mobilebeast/components/pages/topic/body",E);
function E(I,H){return I.write('<section class="topic-page"><section class="page container_12"><header class="header"><h1 class="page-title">').reference(H.get("title"),H,"h").write('</h1></header><section class="body clearfix">').section(H.get("first"),H,{block:D},{of:H.get("features")}).write('<section class="carousel"><ul class="list-media">').section(H.get("rest"),H,{block:C},{of:H.get("features")}).write("</ul>").section(H.get("pagination"),H,{block:B},null).write('</section></section></section><aside class="aside container_12"><section class="module">').section(H.get("include"),H,{},{path:"footerad"}).write("</section>").exists(H.get("galleries"),H,{block:G},null).exists(H.get("videos"),H,{block:F},null).write("</aside></section>")
}function D(I,H){return I.section(H.get("include"),H,{},{resourceType:"mobilebeast/components/featureditem"})
}function C(I,H){return I.section(H.get("include"),H,{},{resourceType:"mobilebeast/components/articlelistitem"})
}function B(I,H){return I.exists(H.get("nextPage"),H,{block:A},null)
}function A(I,H){return I.write('<div class="view-more"><a href="').reference(H.get("nextPage"),H,"h").write('">More Features<span class="icon-arrow-east" aria-hidden="true"></span></a></div>')
}function G(I,H){return I.write('<section class="module">').section(H.get("include"),H,{},{path:"recirc_galleries"}).write("</section>")
}function F(I,H){return I.write('<section class="module videos">').section(H.get("include"),H,{},{path:"recirc_videos"}).write("</section>")
}return E
})();
(function(){dust.register("mobilebeast/components/pages/topic/features",D);
function D(F,E){return F.write('<ul class="list-media">').section(E.get("features"),E,{block:C},null).write('</ul><div class="view-more">').section(E.get("pagination"),E,{block:B},null).write("</div>")
}function C(F,E){return F.section(E.get("include"),E,{},{resourceType:"mobilebeast/components/articlelistitem"})
}function B(F,E){return F.exists(E.get("nextPage"),E,{block:A},null)
}function A(F,E){return F.write('<a href="').reference(E.get("nextPage"),E,"h").write('">More Features<span class="icon-arrow-east" aria-hidden="true"></span></a>')
}return D
})();
(function(){dust.register("mobilebeast/components/pages/topic/recirc_videos",B);
function B(D,C){return D.write('<header class="header"><h2 class="header-title">Video</h2></header><ul class="list-media clearfix">').section(C.get("videos"),C,{block:A},null).write('</ul><div class="view-more"><a href="/content/dailybeast/').reference(C.get("tagName"),C,"h").write('.video.html">View More Videos<span class="icon-arrow-east" aria-hidden="true"></span></a></div>')
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return B
})();
(function(){dust.register("mobilebeast/components/pages/topic/recirc_galleries",C);
function C(E,D){return E.write('<header class="header"><h2 class="header-title">Beast Galleries</h2></header><ul class="list-2col no-outer-margin clearfix">').section(D.get("slice"),D,{block:B},{of:D.get("galleries"),start:0,end:2}).section(D.get("slice"),D,{block:A},{of:D.get("galleries"),start:2,end:4}).write('</ul><div class="view-more"><a href="/content/dailybeast/').reference(D.get("tagName"),D,"h").write('.gallery.html">View More Galleries<span class="icon-arrow-east" aria-hidden="true"></span></a></div>')
}function B(E,D){return E.write('<li class="grid_6 row1 clearfix"><article class="clearfix"><a href="').reference(D.get("url"),D,"h").write('">').partial("mobilebeast/components/media/thumbnail",D,null).write('</a><h3 class="title"><a href="').reference(D.get("url"),D,"h").write('">').reference(D.get("shortTitle"),D,"h").write("</a></h3></article></li>")
}function A(E,D){return E.write('<li class="grid_6 clearfix"><article class="clearfix"><a href="').reference(D.get("url"),D,"h").write('">').partial("mobilebeast/components/media/thumbnail",D,null).write('</a><h3 class="title"><a href="').reference(D.get("url"),D,"h").write('">').reference(D.get("shortTitle"),D,"h").write("</a></h3></article></li>")
}return C
})();
(function(){dust.register("mobilebeast/components/pages/content/body",B);
function B(D,C){return D.write('<section class="content-page"><section class="page container_12"><header class="header"><h1 class="page-title">').reference(C.get("pageName"),C,"h").write('</h1></header><section class="body clearfix"><ul class="list-media clearfix">').section(C.get("results"),C,{block:A},{root_resourceType:C.get("resourceType")}).write("</ul></section>").section(C.get("include"),C,{},{path:"pagination"}).write('</section><aside class="aside container_12"><section class="module">').section(C.get("include"),C,{},{path:"footerad"}).write("</section></aside></section>")
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return B
})();
(function(){dust.register("mobilebeast/components/pages/wrap/body",E);
function E(I,H){return I.write('<section class="wrap-page"><section class="page container_12"><header class="header"><h1 class="page-title">').reference(H.get("title"),H,"h").write('</h1></header><section class="body clearfix">').section(H.get("equals"),H,{block:D},{prop:H.getPath(false,["pagination","currentPage"]),value:1}).write('<section class="carousel"><ul class="list-media clearfix">').section(H.get("equals"),H,{"else":B,block:G},{prop:H.getPath(false,["pagination","currentPage"]),value:1}).write("</ul></section>").section(H.get("include"),H,{},{path:"pagination"}).write('</section></section><aside class="aside container_12"><section class="module">').section(H.get("include"),H,{},{path:"footerad"}).write("</section></aside></section>")
}function D(I,H){return I.section(H.get("first"),H,{block:C},{of:H.get("stream")})
}function C(I,H){return I.section(H.get("include"),H,{},{resourceType:"mobilebeast/components/featureditem"})
}function B(I,H){return I.section(H.get("stream"),H,{block:A},null)
}function A(I,H){return I.section(H.get("include"),H,{},{resourceType:"mobilebeast/components/articlelistitem"})
}function G(I,H){return I.section(H.get("rest"),H,{block:F},{of:H.get("stream")})
}function F(I,H){return I.section(H.get("include"),H,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return E
})();
(function(){dust.register("mobilebeast/components/pages/home/galleries",C);
function C(E,D){return E.write('<header class="header"><h2 class="header-title">Beast Galleries</h2></header><ul class="list-2col no-outer-margin clearfix">').section(D.get("slice"),D,{block:B},{of:D.get("galleries"),start:0,end:2}).section(D.get("slice"),D,{block:A},{of:D.get("galleries"),start:2,end:4}).write('</ul><div class="view-more"><a href="/content/dailybeast/galleries.html">View More Galleries<span class="icon-arrow-east" aria-hidden="true"></span></a></div>')
}function B(E,D){return E.write('<li class="grid_6 row1 clearfix"><article class="clearfix"><a href="').reference(D.get("url"),D,"h").write('">').partial("mobilebeast/components/media/thumbnail",D,null).write('</a><h3 class="title"><a href="').reference(D.get("url"),D,"h").write('">').reference(D.get("shortTitle"),D,"h").write("</a></h3></article></li>")
}function A(E,D){return E.write('<li class="grid_6 clearfix"><article class="clearfix"><a href="').reference(D.get("url"),D,"h").write('">').partial("mobilebeast/components/media/thumbnail",D,null).write('</a><h3 class="title"><a href="').reference(D.get("url"),D,"h").write('">').reference(D.get("shortTitle"),D,"h").write("</a></h3></article></li>")
}return C
})();
(function(){dust.register("mobilebeast/components/pages/home/cheatsheet",E);
function E(H,G){return H.write('<section class="page"><header class="header"><h3 class="page-title">Cheat Sheet</h3></header>').section(G.get("cheatSheet"),G,{block:D},null).write("</section>")
}function D(H,G){return H.write('<section class="cheats"><ul>').section(G.get("cheats"),G,{block:C},null).write('</ul><div class="view-more"><a href="/content/dailybeast/cheat-sheet.html">View Full Cheat Sheet<span class="icon-arrow-east" aria-hidden="true"></span></a></div></section>')
}function C(H,G){return H.write('<li class="cheat"><article><section class="body"><header><h3 class="rubric">').exists(G.get("rubric"),G,{"else":B,block:A},null).write('</h3><h2 class="title" name=""><a href="').reference(G.get("url"),G,"h").write('">').section(G.get("inList"),G,{block:F},null).reference(G.get("title"),G,"h").write('</a></h2></header><a href="').reference(G.get("url"),G,"h").write('"><img class="img-33" alt="').reference(G.getPath(false,["image","caption"]),G,"h").write('" title="').reference(G.getPath(false,["image","title"]),G,"h").write('" src="').reference(G.getPath(false,["image","sizes","large"]),G,"h").write('"/></a></section></article></li>')
}function B(H,G){return H.reference(G.get("type"),G,"h")
}function A(H,G){return H.reference(G.get("rubric"),G,"h")
}function F(H,G){return H.write("<span>").reference(G.get("position"),G,"h").write(". </span>")
}return E
})();
(function(){dust.register("mobilebeast/components/pages/home/body",B);
function B(D,C){return D.write('<section class="home-page"><section class="page container_12"><section class="topbox featured clearfix">').section(C.get("include"),C,{},{resourceType:"mobilebeast/components/slider"}).write('</section><section class="cheatsheet">').section(C.get("include"),C,{},{path:"cheatsheet"}).write('</section><section class="stories module">').section(C.get("include"),C,{},{path:"stories"}).write('</section><section class="ad-speedbump module">').section(C.get("include"),C,{},{path:"footerad"}).write('</section><section class="videos module">').section(C.get("include"),C,{},{path:"videos"}).write('</section><section class="voxbox module">').section(C.get("include"),C,{},{path:"voxbox"}).write('</section><section class="ad-speedbump module">').section(C.get("include"),C,{},{path:"footerad"}).write('</section><section class="galleries module">').section(C.get("include"),C,{},{path:"galleries"}).write("</section>").section(C.get("sections"),C,{block:A},null).write('<section class="module">').section(C.get("include"),C,{},{path:"footerad"}).write("</section></section></section>")
}function A(D,C){return D.write('<section class="specials module">').partial("mobilebeast/components/pages/home/specials",C,null).write("</section>")
}return B
})();
(function(){dust.register("mobilebeast/components/pages/home/videos",B);
function B(D,C){return D.write('<header class="header"><h2 class="header-title">Beast TV</h2></header><section class="body clearfix"><ul class="list-media clearfix">').section(C.get("videos"),C,{block:A},null).write('</ul><div class="view-more"><a href="/content/dailybeast/videos.html">View More Videos<span class="icon-arrow-east" aria-hidden="true"></span></a></div></section>')
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return B
})();
(function(){dust.register("mobilebeast/components/pages/home/specials",B);
function B(D,C){return D.write('<header class="header"><h2 class="header-title">').reference(C.get("title"),C,"h").write('</h2></header><section class="body clearfix"><ul class="list-media clearfix">').section(C.get("highlights"),C,{block:A},null).write('</ul><div class="view-more"><a href="').reference(C.get("url"),C,"h").write('">More In ').reference(C.get("title"),C,"h").write('<span class="icon-arrow-east" aria-hidden="true"></span></a></div></section>')
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return B
})();
(function(){dust.register("mobilebeast/components/pages/home/story",E);
function E(J,I){return J.write('<li class="').section(I.get("atIndex"),I,{block:D},{index:0}).write(" ").exists(I.get("textOnly"),I,{block:C},null).write('"><article class="clearfix"><h4 class="rubric">').reference(I.get("rubric"),I,"h").write("</h4>").notexists(I.get("textOnly"),I,{block:B},null).write('<h3 class="title"><a href="').reference(I.get("url"),I,"h").write('">').reference(I.get("shortTitle"),I,"h").write("</a></h3>").section(I.get("authors"),I,{block:G},null).write("</article></li>")
}function D(J,I){return J.write("row1")
}function C(J,I){return J.write("text-only")
}function B(J,I){return J.write('<a class="img" href="').reference(I.get("url"),I,"h").write('">').section(I.get("equals"),I,{"else":A,block:H},{prop:I.get("type"),value:"video"}).write("</a>")
}function A(J,I){return J.write('<img class="img-100 clearfix" alt="').reference(I.getPath(false,["image","alt"]),I,"h").write('" title="').reference(I.getPath(false,["image","title"]),I,"h").write('" src="').reference(I.getPath(false,["image","sizes","medium"]),I,"h").write('"/>')
}function H(J,I){return J.partial("mobilebeast/components/video/thumbnail",I,null)
}function G(J,I){return J.write('<small class="byline">by ').reference(I.get("name"),I,"h").helper("sep",I,{block:F},null).write("</small>")
}function F(J,I){return J.write(", ")
}return E
})();
(function(){dust.register("mobilebeast/components/pages/home/stories",C);
function C(E,D){return E.write('<header class="header"><h2 class="header-title">Features</h2></header><section class="body clearfix">').section(D.getPath(false,["stories","stories"]),D,{block:B},null).write("</section>")
}function B(E,D){return E.write('<ul class="grid_6 clearfix">').section(D.getPath(true,[]),D,{block:A},null).write("</ul>")
}function A(E,D){return E.partial("mobilebeast/components/pages/home/story",D,null)
}return C
})();
(function(){dust.register("mobilebeast/components/pages/home/voxbox",C);
function C(E,D){return E.write('<header class="header"><h2 class="header-title">Vox Box</h2></header><section class="body clearfix">').section(D.get("voxBox"),D,{block:B},null).write("</section>")
}function B(E,D){return E.write('<ul class="list-media clearfix">').section(D.get("items"),D,{block:A},null).write("</ul>")
}function A(E,D){return E.section(D.get("include"),D,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return C
})();
(function(){dust.register("mobilebeast/components/pages/cheat/body",A);
function A(C,B){return C.write('<section class="cheat"><section class="page container_12"><header class="header"><time class="timestamp" datetime="').reference(B.getPath(false,["publicationDate","w3cDateTime"]),B,"h").write('" pubdate="pubdate">').reference(B.getPath(false,["publicationDate","mediumDate"]),B,"h").write("</time></header><article>").section(B.get("include"),B,{},{path:"content"}).write('</article></section><aside class="aside container_12"><section class="module">').section(B.get("include"),B,{},{path:"footerad"}).write('</section><section class="module">').section(B.get("include"),B,{},{path:"recirc"}).write("</section></aside></section>")
}return A
})();
(function(){dust.register("mobilebeast/components/pages/cheat/content",I);
function I(K,J){return K.write('<section class="body"><header><h3 class="rubric">').exists(J.get("rubric"),J,{"else":H,block:G},null).write('</h3><h2 class="title" name="">').section(J.get("inList"),J,{block:F},null).reference(J.get("title"),J,"h").write('</h2></header><div class="cheat-body"><section class="sharetools dots">').section(J.get("include"),J,{},{resourceType:"mobilebeast/components/sharetools"}).write('</section><section class="text">').exists(J.get("image"),J,{block:E},null).section(J.get("body"),J,{block:D},null).section(J.get("externalReference"),J,{block:C},null).write('<time class="timestamp" datetime="').reference(J.getPath(false,["publicationDate","w3cDateTime"]),J,"h").write('" pubdate="pubdate">').reference(J.getPath(false,["publicationDate","longDateTime"]),J,"h").write("</time>").exists(J.get("xtraInsights"),J,{block:B},null).write("</section></div></section>")
}function H(K,J){return K.reference(J.get("type"),J,"h")
}function G(K,J){return K.reference(J.get("rubric"),J,"h")
}function F(K,J){return K.write("<span>").reference(J.get("position"),J,"h").write(". </span>")
}function E(K,J){return K.write('<div><img class="img-100" alt="').reference(J.getPath(false,["image","caption"]),J,"h").write('" title="').reference(J.getPath(false,["image","title"]),J,"h").write('" src="').reference(J.getPath(false,["image","sizes","large"]),J,"h").write('"/><figcaption class="photocredit">').reference(J.getPath(false,["image","credits"]),J,"h").write("</figcaption></div>")
}function D(K,J){return K.section(J.get("include"),J,{},{resourceType:J.getPath(true,["resourceType"])})
}function C(K,J){return K.write('<div class="read-more"><a href="').reference(J.get("url"),J,"h").write('" target="_blank">Read it at ').reference(J.get("title"),J,"h").write("</a></div>")
}function B(K,J){return K.write('<div class="insight"><h3 class="page-title">Xtra Insight</h3><ul class="list-bullet">').section(J.get("xtraInsights"),J,{block:A},null).write("</ul></div>")
}function A(K,J){return K.write('<li><a href="').reference(J.get("url"),J,"h").write('">').reference(J.get("title"),J,"h").write("</a></li>")
}return I
})();
(function(){dust.register("mobilebeast/components/pages/cheat/recirc",C);
function C(E,D){return E.section(D.get("recirc"),D,{block:B},null)
}function B(E,D){return E.write('<header class="header"><h2 class="header-title">More cheats</h2></header><ul class="list-media clearfix">').section(D.get("relatedPages"),D,{block:A},null).write("</ul>")
}function A(E,D){return E.section(D.get("include"),D,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return C
})();
(function(){dust.register("mobilebeast/components/pages/article/body",I);
function I(K,J){return K.write('<section class=\'article-page\'><article class="page container_12"><header class="header">').section(J.get("equals"),J,{block:H},{prop:J.get("resourceType"),value:"mobilenewsweek/components/pages/article"}).write('<h1 class="title">').reference(J.get("title"),J,"h").write('</h1><div class="byline-time">').exists(J.get("authors"),J,{block:F},null).write('<time class="timestamp" datetime="').reference(J.getPath(false,["publicationDate","w3cDateTime"]),J,"h").write('" pubdate="pubdate">').reference(J.getPath(false,["publicationDate","mediumDateTime"]),J,"h").write("</time></div>").exists(J.get("updatedDek"),J,{"else":C,block:B},null).write('</header><section class="sharetools dots">').section(J.get("include"),J,{},{resourceType:"mobilebeast/components/sharetools"}).write('</section><section class="body">').section(J.get("body"),J,{block:A},null).write('</section><section class="sharetools dots">').section(J.get("include"),J,{},{resourceType:"mobilebeast/components/sharetools"}).write('</section></article><aside class="aside container_12"><section class="module">').section(J.get("include"),J,{},{path:"outbrain"}).write('</section><section class="module">').section(J.get("include"),J,{},{path:"recirc"}).write('</section><section class="module">').section(J.get("include"),J,{},{path:"footerad"}).write("</section></aside></section>")
}function H(K,J){return K.write('<div class="newsweek clearfix "><img class="grid_5 first clearfix" alt="from newsweek" title="From Newsweek" src=\'').section(J.get("versionable"),J,{block:G},{url:"/etc/clientlibs/mobilebeast/img/graphics/fromnewseek_banner.png"}).write("'/></div>")
}function G(K,J){return K
}function F(K,J){return K.write('<small class="byline">by ').section(J.get("authors"),J,{block:E},null).write("</small>")
}function E(K,J){return K.reference(J.get("name"),J,"h").helper("sep",J,{block:D},null)
}function D(K,J){return K.write(", ")
}function C(K,J){return K.write('<div class="dek">').reference(J.get("dek"),J,"h",["s"]).write("</div>")
}function B(K,J){return K.write('<div class="dek updated-dek"><div class="center-absolute"><div class="heading-updated">Updated</div></div>').reference(J.getPath(false,["updatedDek","text"]),J,"h",["s"]).write('</div><div class="dek grayed">').reference(J.get("dek"),J,"h",["s"]).write("</div>")
}function A(K,J){return K.section(J.get("include"),J,{},{resourceType:J.getPath(true,["resourceType"])})
}return I
})();
(function(){dust.register("mobilebeast/components/pages/article/outbrain",B);
function B(D,C){return D.section(C.get("recirc"),C,{block:A},null)
}function A(D,C){return D.write('<header class="header"><h2 class="header-title">Related</h2></header><div class="OUTBRAIN" data-src="').reference(C.get("outbrainUrl"),C,"h").write('" data-widget-id="MB_1" data-ob-template="The Daily Beast"></div>')
}return B
})();
(function(){dust.register("mobilebeast/components/pages/search/body",N);
function N(R,Q){return R.write('<section class="search-page page body container_12"><form  class="search-form" action="/content/dailybeast/search.html" method="GET"><fieldset class="search-box"><input type="search" name="q" title="Search" placeholder="Search The Daily Beast" class="search-input" value="').reference(Q.getPath(false,["params","query"]),Q,"h").write('"/><input type="submit" name="op" class="search-submit-btn" value="Search"/><input type="hidden" name="_charset_" value="utf-8"/></fieldset><div class="result-numbers">Showing ').reference(Q.get("resultsStart"),Q,"h").write(" - ").reference(Q.get("resultsEnd"),Q,"h").write(" <span>of</span> ").reference(Q.get("totalResults"),Q,"h").write(" results</div>").section(Q.get("params"),Q,{block:L},null).write('</form><ul class="search-results list-media">').section(Q.get("results"),Q,{block:M},null).write("</ul>").section(Q.get("include"),Q,{},{path:"pagination"}).write("</section>")
}function L(R,Q){return R.write('<fieldset class="search-filters clearfix"><a class="filter" href="#"><label ').section(Q.get("equals"),Q,{block:J},{prop:Q.get("type"),value:""}).write(' for="all-filter">All</label><input type="radio" id="all-filter" name="type" value="" ').section(Q.get("equals"),Q,{block:H},{prop:Q.get("type"),value:""}).write('/></a><a class="filter" href="#"><label ').section(Q.get("equals"),Q,{block:F},{prop:Q.get("type"),value:"stories"}).write(' for="stories-filter">Stories</label><input type="radio" id="stories-filter" name="type" value="stories" ').section(Q.get("equals"),Q,{block:E},{prop:Q.get("type"),value:"stories"}).write('/></a><a class="filter" href="#"><label ').section(Q.get("equals"),Q,{block:D},{prop:Q.get("type"),value:"cheats"}).write(' for="cheats-filter">Cheats</label><input type="radio" id="cheats-filter" name="type" value="cheats" ').section(Q.get("equals"),Q,{block:C},{prop:Q.get("type"),value:"cheats"}).write('/></a><a class="filter" href="#"><label ').section(Q.get("equals"),Q,{block:B},{prop:Q.get("type"),value:"galleries"}).write(' for="galleries-filter">Galleries</label><input type="radio" id="galleries-filter" name="type" value="galleries" ').section(Q.get("equals"),Q,{block:A},{prop:Q.get("type"),value:"galleries"}).write('/></a><a class="filter" href="#"><label ').section(Q.get("equals"),Q,{block:P},{prop:Q.get("type"),value:"videos"}).write(' for="videos-filter">Videos</label><input type="radio" id="videos-filter" name="type" value="videos" ').section(Q.get("equals"),Q,{block:O},{prop:Q.get("type"),value:"videos"}).write("/></a></fieldset>")
}function J(R,Q){return R.write('class="active"')
}function H(R,Q){return R.write('checked="checked"')
}function F(R,Q){return R.write('class="active"')
}function E(R,Q){return R.write('checked="checked"')
}function D(R,Q){return R.write('class="active"')
}function C(R,Q){return R.write('checked="checked"')
}function B(R,Q){return R.write('class="active"')
}function A(R,Q){return R.write(' checked="checked"')
}function P(R,Q){return R.write('class="active"')
}function O(R,Q){return R.write('checked="checked"')
}function M(R,Q){return R.write('<li><article><header><h3 class="rubric">').reference(Q.get("rubric"),Q,"h").write('</h3><h2 class="title" property="dc:title"><a href="').reference(Q.get("url"),Q,"h").write('">').reference(Q.get("title"),Q,"h",["s"]).write('</a></h2><div class="byline-time">').exists(Q.get("authors"),Q,{block:K},null).write('<time class="timestamp" datetime="').reference(Q.getPath(false,["publicationDate","w3cDateTime"]),Q,"h").write('" pubdate="pubdate">').reference(Q.getPath(false,["publicationDate","mediumDateTime"]),Q,"h").write('</time></div></header><p class="summary">').reference(Q.get("summary"),Q,"h",["s"]).write('<a class="view-more" href="').reference(Q.get("url"),Q,"h").write('"> more</a></p></article></li>')
}function K(R,Q){return R.write('<small class="byline">by ').section(Q.get("authors"),Q,{block:I},null).write("</small>")
}function I(R,Q){return R.reference(Q.get("name"),Q,"h").helper("sep",Q,{block:G},null)
}function G(R,Q){return R.write(", ")
}return N
})();
(function(){dust.register("mobilebeast/components/pages/gallery/body",A);
function A(C,B){return C.write('<section class="gallery-page"><article class="page container_12"><section class="body featured clearfix"><header class="header"><h1 class="page-title">').reference(B.get("title"),B,"h").write("</h1></header>").section(B.get("include"),B,{},{resourceType:"mobilebeast/components/gallery"}).write('</section><section class="sharetools dots">').section(B.get("include"),B,{},{resourceType:"mobilebeast/components/sharetools"}).write('</section></article><aside class="aside container_12"><section class="module">').section(B.get("include"),B,{},{path:"footerad"}).write('</section><section class="module">').section(B.get("include"),B,{},{path:"recirc"}).write("</section></aside></section>")
}return A
})();
(function(){dust.register("mobilebeast/components/pages/gallery/recirc",D);
function D(F,E){return F.section(E.get("recirc"),E,{block:C},null)
}function C(F,E){return F.write('<header class="header"><h2 class="header-title">').reference(E.get("relatedGalleriesTitle"),E,"h").write('</h2></header><ul class="list-2col no-outer-margin clearfix">').section(E.get("slice"),E,{block:B},{of:E.get("relatedPages"),start:0,end:2}).section(E.get("slice"),E,{block:A},{of:E.get("relatedPages"),start:2,end:4}).write('</ul><div class="view-more"><a href="/content/dailybeast/galleries.html">View All<span class="icon-arrow-east" aria-hidden="true"></span></a></div>')
}function B(F,E){return F.write('<li class="grid_6 row1 clearfix"><a href="').reference(E.get("url"),E,"h").write('">').partial("mobilebeast/components/media/thumbnail",E,null).write('</a><h3 class="title"><a href="').reference(E.get("url"),E,"h").write('">').reference(E.get("shortTitle"),E,"h").write("</a></h3></li>")
}function A(F,E){return F.write('<li class="grid_6 clearfix"><a href="').reference(E.get("url"),E,"h").write('">').partial("mobilebeast/components/media/thumbnail",E,null).write('</a><h3 class="title"><a href="').reference(E.get("url"),E,"h").write('">').reference(E.get("shortTitle"),E,"h").write("</a></h3></li>")
}return D
})();
(function(){dust.register("mobilebeast/components/pages/videos/body",C);
function C(E,D){return E.section(D.get("equals"),D,{"else":B,block:A},{prop:D.getPath(false,["pagination","currentPage"]),value:1})
}function B(E,D){return E.section(D.get("include"),D,{},{path:"rest"})
}function A(E,D){return E.section(D.get("include"),D,{},{path:"first"})
}return C
})();
(function(){dust.register("mobilebeast/components/pages/videos/beast_shows",D);
function D(F,E){return F.write('<header class="header"><h2 class="header-title">').exists(E.get("showsTitle"),E,{"else":C,block:B},null).write('</h2></header><ul class="list-media">').section(E.get("videos"),E,{block:A},null).write("</ul>")
}function C(F,E){return F.write("Beast Shows")
}function B(F,E){return F.reference(E.get("showsTitle"),E,"h")
}function A(F,E){return F.section(E.get("include"),E,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return D
})();
(function(){dust.register("mobilebeast/components/pages/videos/original_shows",B);
function B(D,C){return D.write('<header class="header"><h2 class="header-title">Original Shows</h2></header><ul class="list-media">').section(C.get("originalShows"),C,{block:A},null).write("</ul>")
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return B
})();
(function(){dust.register("mobilebeast/components/pages/video/body",B);
function B(D,C){return D.write('<section class="video-page"><article class="page container_12"><header class="header"><h1 class="page-title"><a href="/content/dailybeast/videos.html">Video</a></h1></header><section class="body clearfix"><div class="featured">').section(C.get("video"),C,{block:A},null).write('<h2 class="title">').reference(C.get("title"),C,"h").write('</h2><div class="dek">').reference(C.get("caption"),C,"h",["s"]).write('</div></div></section><section class="sharetools dots">').section(C.get("include"),C,{},{resourceType:"mobilebeast/components/sharetools"}).write('</section></article><aside class="aside container_12"><section class="module">').section(C.get("include"),C,{},{path:"footerad"}).write('</section><section class="module videos">').section(C.get("include"),C,{},{path:"recirc"}).write("</section></aside></section>")
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:C.getPath(true,["resourceType"])})
}return B
})();
(function(){dust.register("mobilebeast/components/pages/video/recirc",D);
function D(F,E){return F.section(E.get("recirc"),E,{block:C},null)
}function C(F,E){return F.write('<header class="header"><h2 class="header-title">MORE VIDEOS</h2></header><ul class="list-2col no-outer-margin clearfix">').section(E.get("slice"),E,{block:B},{of:E.get("relatedPages"),start:0,end:2}).section(E.get("slice"),E,{block:A},{of:E.get("relatedPages"),start:2,end:4}).write('</ul><div class="view-more"><a href="/content/dailybeast/videos.html">View More Videos<span class="icon-arrow-east" aria-hidden="true"></span></a></div>')
}function B(F,E){return F.write('<li class="grid_6 row1 clearfix"><article><a href="').reference(E.get("url"),E,"h").write('">').partial("mobilebeast/components/media/thumbnail",E,null).write('</a><h3 class="title"><a href="').reference(E.get("url"),E,"h").write('">').reference(E.get("shortTitle"),E,"h").write("</a></h3></article></li>")
}function A(F,E){return F.write('<li class="grid_6 clearfix"><article><a href="').reference(E.get("url"),E,"h").write('">').partial("mobilebeast/components/media/thumbnail",E,null).write('</a><h3 class="title"><a href="').reference(E.get("url"),E,"h").write('">').reference(E.get("shortTitle"),E,"h").write("</a></h3></article></li>")
}return D
})();
(function(){dust.register("mobilebeast/components/pages/cheatsheet/body",B);
function B(D,C){return D.write('<section class="cheatsheet-page"><section class="page container_12"><header class="header"><time class="timestamp" datetime="').reference(C.getPath(false,["publicationDate","w3cDateTime"]),C,"h").write('" pubdate="pubdate">').reference(C.getPath(false,["publicationDate","mediumDate"]),C,"h").write('</time></header><section class="cheats"><ul>').section(C.get("body"),C,{block:A},null).write('</ul></section></section><section class="module">').section(C.get("include"),C,{},{path:"footerad"}).write("</section></section>")
}function A(D,C){return D.write('<li class="cheat"><article>').partial("mobilebeast/components/pages/cheat/content",C,null).write("</article></li>")
}return B
})();
(function(){dust.register("mobilebeast/components/sharetools/sharetools",A);
function A(C,B){return C.write('<ul class="social list-inline"><li class="grid_3"><a class="icon-facebook" aria-hidden="true" data-link="').reference(B.get("url"),B,"h").write('" data-picture="').reference(B.getPath(false,["shareTools","shareToolsImage"]),B,"h").write('" data-name="').reference(B.getPath(false,["shareTools","escapedTitle"]),B,"h").write('" data-description="').reference(B.getPath(false,["shareTools","escapedDescription"]),B,"h").write('" data-page-name="').reference(B.getPath(false,["analytics","analyticsPageName"]),B,"h").write('"><span class="visuallyhidden">facebook</span></a></li><li class="grid_3"><a class="icon-twitter" aria-hidden="true" data-link="').reference(B.get("url"),B,"h").write('" target="_blank" href="https://twitter.com/intent/tweet?url=').reference(B.getPath(false,["shareTools","shortUrl"]),B,"h").write("&via=").reference(B.getPath(false,["shareTools","twitterVia"]),B,"h").write("&related=").reference(B.getPath(false,["shareTools","twitterRelated"]),B,"h",["uc"]).write("&text=").reference(B.get("title"),B,"h",["uc"]).write("&counturl=").reference(B.get("url"),B,"h").write('" data-page-name="').reference(B.getPath(false,["analytics","analyticsPageName"]),B,"h").write('"><span class="visuallyhidden">twitter</span></a></li><li class="grid_3"><a class="icon-google-plus" aria-hidden="true" data-link="').reference(B.get("url"),B,"h").write('" target="_blank" href="https://plus.google.com/share?url=').reference(B.get("url"),B,"h").write('" data-page-name="').reference(B.getPath(false,["analytics","analyticsPageName"]),B,"h").write('"><span class="visuallyhidden">google plus</span></a></li><li class="grid_3"><a class="icon-email-square" aria-hidden="true" data-link="').reference(B.get("url"),B,"h").write('" href="mailto:?subject=').reference(B.get("title"),B,"h",["uc"]).write("&body=%0D%0A").reference(B.getPath(false,["shareTools","shortUrl"]),B,"h").write("%0D%0A%0D%0A").reference(B.getPath(false,["metadata","title"]),B,"h",["uc"]).write("%0D%0A%0D%0A").reference(B.getPath(false,["metadata","description"]),B,"h",["uc"]).write('" data-page-name="').reference(B.getPath(false,["analytics","analyticsPageName"]),B,"h").write('"><span class="visuallyhidden">email</span></a></li></ul>')
}return A
})();
(function(){dust.register("mobilebeast/components/analytics/quantcast",A);
function A(C,B){return C.write('<script type="text/javascript">var _qevents = _qevents || [];(function() {var elem = document.createElement(\'script\');elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";elem.async = true;elem.type = "text/javascript";var scpt = document.getElementsByTagName(\'script\')[0];scpt.parentNode.insertBefore(elem, scpt);})();<\/script>')
}return A
})();
(function(){dust.register("mobilebeast/components/analytics/body_top",B);
function B(D,C){return D.section(C.get("analytics"),C,{block:A},null)
}function A(D,C){return D.partial("mobilebeast/components/analytics/omniture",C,null).partial("mobilebeast/components/analytics/comscore",C,null).partial("mobilebeast/components/analytics/quantcast",C,null)
}return B
})();
(function(){dust.register("mobilebeast/components/analytics/google",A);
function A(C,B){return C.write("<script type=\"text/javascript\">var _qevents = _qevents || [];var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-17082295-1']);_gaq.push(['_setDomainName', '.thedailybeast.com']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();<\/script>")
}return A
})();
(function(){dust.register("mobilebeast/components/analytics/comscore",A);
function A(C,B){return C.write('<script language="JavaScript" type="text/javascript">var _comscore = _comscore || [];_comscore.push({c1: 2,c2: "6433482",c7: document.URL,c8: getAnalyticsPageName(),c9: document.referrer});(function() {var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];s.async = true;s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/c2/6433482/cs.js";el.parentNode.insertBefore(s, el);})();<\/script><noscript><img src="http://b.scorecardresearch.com/p?c1=2&c2=6433482&c3=&c4=&c5=&c6=&c15=&cv=2.0&cj=1" style="display:none" width="0" height="0" alt="" /></noscript>')
}return A
})();
(function(){dust.register("mobilebeast/components/analytics/omniture",A);
function A(C,B){return C.write('<!-- SiteCatalyst code version: H.24.4.Copyright 1996-2012 Adobe, Inc. All Rights ReservedMore info available at http://www.omniture.com --><script language="JavaScript" type="text/javascript"><!--\nfunction getAnalyticsPageName() {return "').reference(B.get("analyticsPageName"),B,"h").write('";}s.pageName="').reference(B.get("analyticsPageName"),B,"h").write('";s.server="thedailybeast.com";s.channel=dailybeast.metatags.getTopic();s.hier1="').reference(B.get("pageHierarchy"),B,"h").write('";s.prop1="').reference(B.get("normalizedPagePath"),B,"h").write('";s.prop2=dailybeast.metatags.getTags().join("|");s.prop3=dailybeast.metatags.getTemplate();s.prop4="').reference(B.get("pageNum"),B,"h").write('";s.prop5=\'D=pageName+" : "+c4\';s.prop7=s.getPreviousValue(s.pageName,"s_pv");if(s.prop7) {s.prop6=s.getPercentPageViewed();}s.prop8=dailybeast.metatags.getWrap();s.prop11=dailybeast.metatags.getAuthors().join("|");s.prop12="').reference(B.get("source"),B,"h").write('";s.prop13="').reference(B.get("publicationDate"),B,"h").write('";s.prop14="').reference(B.get("issueDate"),B,"h").write('";s.prop15=dailybeast.metatags.getAllAdTags().join("|");s.prop16=navigator.userAgent;s.prop17=dailybeast.metatags.getAllTags().join("|");s.prop18="Screen";s.prop21="";s.prop22="').reference(B.get("blogName"),B,"h").write('";s.prop32="').reference(B.get("searchQuery"),B,"h").write('";s.prop33="').reference(B.get("searchNumFound"),B,"h").write('";s.prop34="CQ54";s.prop35="";s.prop42=dailybeast.cookie.UserCookies.getUserTypeForOmniture();s.prop43=dailybeast.cookie.UserCookies.getUserIdForOmniture();s.prop44=dailybeast.metatags.getPlatform();/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/var s_code=s.t();if(s_code)document.write(s_code)//--><\/script><script language="JavaScript" type="text/javascript"><!--\nif(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')//--><\/script><noscript><img src="http://rtst.122.2o7.net/b/ss/rtstdailybeast/1/H.24.4--NS/0"height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/--><!-- End SiteCatalyst code version: H.24.4. -->')
}return A
})();
(function(){dust.register("mobilebeast/components/analytics/body_bottom",B);
function B(D,C){return D.section(C.get("analytics"),C,{block:A},null)
}function A(D,C){return D.partial("mobilebeast/components/analytics/google",C,null).partial("mobilebeast/components/analytics/quantcast_tag",C,null)
}return B
})();
(function(){dust.register("mobilebeast/components/analytics/quantcast_tag",A);
function A(C,B){return C.write('<script type="text/javascript">_qevents.push( { qacct:"p-bcLY1r4ynM-2-", labels:dailybeast.analytics.getQuantcastLabelString() } );<\/script><noscript><div style="display: none;"><img src="//pixel.quantserve.com/pixel/p-bcLY1r4ynM-2-.gif" height="1" width="1" alt="Quantcast"/></div></noscript>')
}return A
})();
(function(){dust.register("mobilebeast/components/inlineimage/inlineimage",E);
function E(G,F){return G.write('<div><img class="img-100" title="').reference(F.get("title"),F,"h").write('" alt="').reference(F.get("alt"),F,"h").write('" src="').reference(F.getPath(false,["sizes","large"]),F,"h").write('"/><figcaption class="photocredit">').reference(F.get("caption"),F,"h").exists(F.get("caption"),F,{block:D},null).section(F.get("credits"),F,{block:C},null).exists(F.get("caption"),F,{block:A},null).write("</figcaption></div>")
}function D(G,F){return G.write(" (")
}function C(G,F){return G.reference(F.getPath(true,[]),F,"h").helper("sep",F,{block:B},null)
}function B(G,F){return G.write(", ")
}function A(G,F){return G.write(")")
}return E
})();
(function(){dust.register("mobilebeast/components/page/pagination",I);
function I(K,J){return K.write('<nav class="slide-nav lines">').section(J.get("pagination"),J,{block:H},null).write("</nav>")
}function H(K,J){return K.write('<ul class="listInline clearfix"><li class="prev grid_4">').exists(J.get("previousPage"),J,{"else":G,block:F},null).write('</li><li class="slide-count grid_4"><span class="result-numbers">').helper("if",J,{"else":E,block:D},{cond:C}).write(" <span>of</span> ").reference(J.get("totalPages"),J,"h").write('</span></li><li class="next grid_4">').exists(J.get("nextPage"),J,{"else":B,block:A},null).write("</li></ul>")
}function G(K,J){return K.write('<span class="icon-arrow-west"></span>Prev')
}function F(K,J){return K.write('<a href="').reference(J.get("previousPage"),J,"h").write('"><span class="icon-arrow-west"></span>Prev</a>')
}function E(K,J){return K.reference(J.get("currentPage"),J,"h")
}function D(K,J){return K.write("0")
}function C(K,J){return K.reference(J.get("totalPages"),J,"h").write(" == 0")
}function B(K,J){return K.write('Next<span class="icon-arrow-east"></span>')
}function A(K,J){return K.write('<a href="').reference(J.get("nextPage"),J,"h").write('">Next<span class="icon-arrow-east"></span></a>')
}return I
})();
(function(){dust.register("mobilebeast/components/page/header",C);
function C(E,D){return E.write('<header class="head"><section class="ad-section"><div class="ad-mobile-banner">').section(D.get("adBillboard"),D,{block:B},null).write('</div></section><nav class="nav-wrapper"><ul class="primary-nav" role="navigation"><li class="home"><a data-track="{\'title\':\'navbar\'}" href="/content/dailybeast.html"><img src=\'').section(D.get("versionable"),D,{block:A},{url:"/etc/clientlibs/mobilebeast/img/logo/daily-beast-mobile.png"}).write('\' alt="The Daily Beast"/></a></li><li class="cs"><a data-track="{\'title\':\'navbar\'}" href="/content/dailybeast/cheat-sheet.html">Cheat Sheet</a></li><li class="more"><a data-track="{\'title\':\'navbar\'}" href="#">More <span class="icon-caret-down" aria-hidden="true"></span></a></li><li class="search"><a data-track="{\'title\':\'navbar\'}" href="#"><span class="hidden">Search</span><span class="search-btn icon-search" aria-hidden="true"></span></a></li></ul><section class="container_12"><form  class="search-form" action="/content/dailybeast/search.html" method="GET"><fieldset class="search-box"><input type="search" name="q" title="Search" placeholder="Search The Daily Beast" class="search-input"/><input type="submit" name="op" class="search-submit-btn" value="Search"/><input type="hidden" name="_charset_" value="utf-8"/></fieldset></form></section><section class="dropdown"><ul class="list-2col clearfix" role="navigation"><li class="row1"><a href="/content/dailybeast/politics.html">politics</a></li><li class="row1"><a href="http://andrewsullivan.thedailybeast.com/">andrew sullivan</a></li><li><a href="/content/dailybeast/us-news.html">US news</a></li><li><a href="/content/dailybeast/spin-cycle.html">howard kurtz</a></li><li><a href="/content/dailybeast/world.html">international</a></li><li><a href="/content/dailybeast/voxbox/daniel-gross.html">daniel gross</a></li><li><a href="/content/dailybeast/business.html">business</a></li><li><a href="/content/dailybeast/women-in-the-world.html">women in the world</a></li><li><a href="/content/dailybeast/entertainment.html">culture</a></li><li><a href="/content/dailybeast/fashion.html">fashion beast</a></li><li><a class="beast-red" href="/content/newsweek.html">newsweek</a></li><li><a href="/content/dailybeast/books.html">book beast</a></li></ul></section></nav></header>')
}function B(E,D){return E.section(D.get("include"),D,{},{resourceType:D.getPath(true,["resourceType"])})
}function A(E,D){return E
}return C
})();
(function(){dust.register("mobilebeast/components/page/footerad",B);
function B(D,C){return D.write('<section class="ad-section"><div class="ad-mobile-banner">').section(C.get("adBillboard"),C,{block:A},null).write("</div></section>")
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:C.getPath(true,["resourceType"])})
}return B
})();
(function(){dust.register("mobilebeast/components/page/body",A);
function A(C,B){return C
}return A
})();
(function(){dust.register("mobilebeast/components/page/footer",A);
function A(C,B){return C.write('<footer class="footer container_12"><section class="module"><header class="header"><h2 class="header-title">Sections</h2></header><nav class="nav-wrapper"><ul class="list-2col no-outer-margin clearfix" role="navigation"><li class="row1"><a href="/content/dailybeast/politics.html">politics</a></li><li class="row1"><a href="http://andrewsullivan.thedailybeast.com/">andrew sullivan</a></li><li><a href="/content/dailybeast/us-news.html">US news</a></li><li><a href="/content/dailybeast/spin-cycle.html">howard kurtz</a></li><li><a href="/content/dailybeast/world.html">international</a></li><li><a href="/content/dailybeast/voxbox/daniel-gross.html">daniel gross</a></li><li><a href="/content/dailybeast/business.html">business</a></li><li><a href="/content/dailybeast/women-in-the-world.html">women in the world</a></li><li><a href="/content/dailybeast/entertainment.html">culture</a></li><li><a href="/content/dailybeast/fashion.html">fashion beast</a></li><li><a class="beast-red" href="/content/newsweek.html">newsweek</a></li><li><a href="/content/dailybeast/books.html">book beast</a></li></ul></nav></section><section class="footerList"><small class="back-to-top"><span>Back to Top</span></small><ul class="list-inline dots"><li><a href="#" class="full-site-link">Full Site</a></li></ul><ul class="list-inline bottom-social"><li><a data-track="tdb-follow" href="http://www.twitter.com/thedailybeast" target="_blank"><span>follow us</span><span class="icon-twitter"/></a></li><li><a data-track="tdb-follow" href="http://www.facebook.com/thedailybeast" target="_blank"><span>like us</span><span class="icon-facebook"/></a></li></ul><ul class="list-inline"><li><a href="/content/dailybeast/company/help.html">Help</a></li><li><a href="/content/dailybeast/company/about-us.html">About</a></li><li><a href="/content/dailybeast/company/contact-us.html">Contact Us</a></li><li><a href="/content/dailybeast/company/privacy-policy.html">Privacy Policy</a></li></ul><ul class="list-inline"><li><a href="/content/dailybeast/company/terms-of-use.html">Terms of Use</a></li><li><a href="/content/dailybeast/company/copyright-trademark.html">Copyright & Trademark</a></li></ul><small class="copyright">&copy; 2012 The Newsweek / Daily Beast Company LLC</small></section></footer>')
}return A
})();
(function(){dust.register("mobilebeast/components/page/head",I);
function I(K,J){return K.write('<head><meta charset="utf-8" />').section(J.get("metadata"),J,{block:H},null).write('<!-- mobile webapp images --><link rel="apple-touch-icon-precomposed" sizes="57x57"   href=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/img/logo/dailybeast-touch-logo-s.png"}).write('\' /><link rel="apple-touch-icon-precomposed" sizes="72x72"   href=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/img/logo/dailybeast-touch-logo-m.png"}).write('\' /><link rel="apple-touch-icon-precomposed" sizes="114x114" href=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/img/logo/dailybeast-touch-logo-l.png"}).write('\' /><link rel="apple-touch-icon-precomposed" sizes="144x144" href=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/img/logo/dailybeast-touch-logo-xl.png"}).write('\' /><link rel="apple-touch-icon-precomposed" sizes="250x250" href=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/img/logo/dailybeast-touch-logo-xxl.png"}).write("' /><!-- stylesheets --><link rel=\"stylesheet\" href='").section(J.get("versionable"),J,{},{url:"/content/dailybeast.typography.css"}).write('\' type="text/css"/><link rel="stylesheet" href=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/styles.css"}).write('\' type="text/css"/><!-- scripts --><script type="text/javascript" src=\'').section(J.get("versionable"),J,{},{url:"/etc/clientlibs/mobilebeast/head.js"}).write('\'><\/script><!--[if lte IE 7]><script src="lte-ie7.js"><\/script><![endif]--></head>')
}function H(K,J){return K.write("<title>").reference(J.get("title"),J,"h").write('</title><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta name="viewport" content="width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1, user-scalable = no"/><meta name="content-type" content="text/html; charset=UTF-8" /><meta name="platform" content="mobile"/>').section(J.get("metaTags"),J,{block:G},null).section(J.get("ogImages"),J,{block:D},null).section(J.get("ogVideos"),J,{block:C},null).write('<link rel="canonical" href="').reference(J.get("canonicalUrl"),J,"h").write('" /><!-- favicon --><link rel="shortcut icon" href="/etc/static/dailybeast/favicon.ico" />')
}function G(K,J){return K.write("<meta ").exists(J.get("property"),J,{"else":F,block:E},null).write(' content="').reference(J.get("content"),J,"h").write('"/>')
}function F(K,J){return K.write('name="').reference(J.get("name"),J,"h").write('"')
}function E(K,J){return K.write('property="').reference(J.get("name"),J,"h").write('"')
}function D(K,J){return K.write('<meta property="og:image" content="').reference(J.get("url"),J,"h").write('"/>')
}function C(K,J){return K.write('<meta property="og:video" content="').reference(J.get("url"),J,"h").write('" />').exists(J.get("type"),J,{block:B},null).exists(J.get("secureUrl"),J,{block:A},null)
}function B(K,J){return K.write('<meta property="og:video:type" content="').reference(J.get("type"),J,"h").write('" />')
}function A(K,J){return K.write('<meta property="og:video:secure_url" content="').reference(J.get("secureUrl"),J,"h").write('" />')
}return I
})();
(function(){dust.register("mobilebeast/components/page/page",A);
function A(C,B){return C.write('<!DOCTYPE html><html lang="en">').section(B.get("include"),B,{},{path:"head"}).write("<body>").partial("mobilebeast/components/analytics/body_top",B,null).write('<div class="mobile">').section(B.get("include"),B,{},{path:"header"}).section(B.get("include"),B,{},{path:"body"}).section(B.get("include"),B,{},{path:"footer"}).write('</div><script type="text/javascript" src=\'').section(B.get("versionable"),B,{},{url:"/etc/clientlibs/mobilebeast/main.js"}).write("'><\/script>").partial("mobilebeast/components/analytics/body_bottom",B,null).write("</body></html>")
}return A
})();
(function(){dust.register("mobilebeast/components/page/recirc",C);
function C(E,D){return E.section(D.get("recirc"),D,{block:B},null)
}function B(E,D){return E.write('<header class="header"><h2 class="header-title">Stories You Might Like</h2></header><ul class="list-media clearfix">').section(D.get("relatedPages"),D,{block:A},null).write("</ul>")
}function A(E,D){return E.section(D.get("include"),D,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return C
})();
(function(){dust.register("mobilebeast/components/ads/advertising/advertising",E);
function E(H,G){return H.exists(G.get("badgeEnabled"),G,{block:D},null).write('<div class="ad ').reference(G.get("name"),G,"h").write(" ").reference(G.get("position"),G,"h").write('" forceShowing="true" data-advertising="{siteID: \'').reference(G.get("siteId"),G,"h").write("', zone: '").reference(G.get("zone"),G,"h").write("', template: '").reference(G.get("template"),G,"h").write("', size: '300x50', tile: '").reference(G.get("tile"),G,"h").write("', iFrame: ").exists(G.get("iFrame"),G,{"else":C,block:B},null).write(", disable: '").exists(G.get("disabled"),G,{"else":A,block:F},null).write("', params: '").reference(G.get("parameters"),G,"h").write("'}\"></div>")
}function D(H,G){return H.write('<div class="ad ad-badge ').reference(G.get("position"),G,"h").write('">- Advertisement -</div>')
}function C(H,G){return H.write("false")
}function B(H,G){return H.write("true")
}function A(H,G){return H.write("false")
}function F(H,G){return H.write("true")
}return E
})();
(function(){dust.register("mobilebeast/components/media/thumbnail",D);
function D(F,E){return F.write('<div class="media-thumbnail"><img class="img-100 clearfix" alt="').reference(E.getPath(false,["image","alt"]),E,"h").write('" title="').reference(E.getPath(false,["image","title"]),E,"h").write('" src="').reference(E.getPath(false,["image","sizes","medium"]),E,"h").write('"/>').section(E.get("equals"),E,{"else":C,block:A},{prop:E.get("type"),value:"video"}).write("</div>")
}function C(F,E){return F.section(E.get("equals"),E,{block:B},{prop:E.get("type"),value:"gallery"})
}function B(F,E){return F.write('<img class="media-thumbnail-overlay"src="').section(E.get("versionable"),E,{},{url:"/etc/clientlibs/mobilebeast/img/media/thumbnail-overlay-gallery-500x333.png"}).write('" />')
}function A(F,E){return F.write('<img class="media-thumbnail-overlay"src="').section(E.get("versionable"),E,{},{url:"/etc/clientlibs/mobilebeast/img/media/thumbnail-overlay-video-500x333.png"}).write('" />')
}return D
})();
(function(){dust.register("mobilebeast/components/video/brightcove/brightcove",A);
function A(C,B){return C.write('<section class="multimedia"><div class="brightcovewrapper"><object id="').reference(B.get("videoplayer"),B,"h").write('" name="myExperience').reference(B.get("videoplayer"),B,"h").write('" class="BrightcoveExperience"><a rel="media:thumbnail" href="').reference(B.getPath(false,["image","sizes","medium"]),B,"h").write('"></a><param name="bgcolor" value="').reference(B.get("bgcolor"),B,"h").write('"/><param name="width" value="300"/><param name="height" value="225"/><param name="playerID" value="1140772469001"/><param name="playerKey" value="AQ~~,AAAAAAEDRq0~,qRcfDOX2mNtWW87VePrJiaFRXUo43tGn"/><param name="isVid" value="true"/><param name="isUI" value="true"/><param name="dynamicStreaming" value="true"/><param name="autoStart" value="false"/><param name="mute" value="false"/><param name="@videoPlayer" value="').reference(B.get("videoplayer"),B,"h").write('"/><param name="wmode" value="opaque"/><param name="includeAPI" value="true"/><param name="templateLoadHandler" value="dailybeast.video.onPlayerLoaded"/><a rel="media:thumbnail" href="').reference(B.getPath(false,["image","sizes","medium"]),B,"h").write('"></a><span property="media:title" content="').reference(B.get("shortTitle"),B,"h").write('"></span><span property="media:type" content="application/x-shockwave-flash"></span><span property="media:region" content="*"></span><span property="dc:description" content="').reference(B.get("description"),B,"h").write('"></span></object></div><figcaption class="photocredit">').reference(B.get("extendedCaption"),B,"h").write("</figcaption></section><script type=\"text/javascript\">brightcove.createExperiences();var supportsOrientationChange = \"onorientationchange\" in window;var orientationEvent = supportsOrientationChange ? \"orientationchange\" : \"resize\";$(window).bind(orientationEvent, function () {setTimeout(function () {$('.BrightcoveExperience').each(function () {var path = $(this).attr('src');$(this).attr('src', '');$(this).width($('.brightcovewrapper').width());$(this).height($('.brightcovewrapper iframe').width() * 0.58);$(this).attr('src', path);});}, 1000);});<\/script>")
}return A
})();
(function(){dust.register("mobilebeast/components/video/vimeo/vimeo",A);
function A(C,B){return C.write('<section class="multimedia vimeowrapper"><iframe class="vimeo" src="').reference(B.get("src"),B,"h").write('?title=0&byline=0&portrait=0" frameborder="0"webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></section>')
}return A
})();
(function(){dust.register("mobilebeast/components/video/youtube/youtube",A);
function A(C,B){return C.write('<section class="multimedia youtubewrapper"><iframe class="youtube" id="ytplayer" type="text/html" width="').reference(B.get("width"),B,"h").write('" height="').reference(B.get("height"),B,"h").write('"src="').reference(B.get("src"),B,"h").write('" frameborder="0"></iframe><script type="text/javascript">//    dailybeast.video.initYTPlayer("ytplayer");<\/script></section>')
}return A
})();
(function(){dust.register("mobilebeast/components/pages/videos/first",D);
function D(F,E){return F.write('<section class="videos-page"><section class="page container_12"><header class="header"><h1 class="page-title">Video</h1></header><section class="body clearfix">').section(E.get("first"),E,{block:C},{of:E.getPath(false,["slider","items"])}).write('<section class="carousel"><ul class="list-media clearfix">').section(E.get("rest"),E,{block:A},{of:E.getPath(false,["slider","items"])}).write('</ul></section></section></section><aside class="aside container_12"><section class="module videos">').section(E.get("include"),E,{},{path:"original_shows"}).write('</section><section class="module">').section(E.get("include"),E,{},{path:"footerad"}).write('</section><section class="module videos">').section(E.get("include"),E,{},{path:"beast_shows"}).write("</section>").section(E.get("include"),E,{},{path:"pagination"}).write("</aside></section>")
}function C(F,E){return F.write('<section class="featured clearfix"><article class="clearfix">').section(E.get("video"),E,{block:B},null).write('<h2 class="title"><a href="').reference(E.get("url"),E,"h").write('">').reference(E.get("shortTitle"),E,"h").write('</a></h2><div class="dek">').reference(E.get("caption"),E,"h",["s"]).write("</div></article></section>")
}function B(F,E){return F.section(E.get("include"),E,{},{resourceType:E.getPath(true,["resourceType"])})
}function A(F,E){return F.section(E.get("include"),E,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return D
})();
(function(){dust.register("mobilebeast/components/pages/videos/rest",B);
function B(D,C){return D.write('<section class="content-page"><section class="page container_12"><header class="header"><h1 class="page-title">Video</h1></header><section class="body clearfix"><ul class="list-media clearfix">').section(C.get("videos"),C,{block:A},null).write("</ul></section>").section(C.get("include"),C,{},{path:"pagination"}).write('</section><aside class="aside container_12"><section class="module">').section(C.get("include"),C,{},{path:"footerad"}).write("</section></aside></section>")
}function A(D,C){return D.section(C.get("include"),C,{},{resourceType:"mobilebeast/components/articlelistitem"})
}return B
})();
(function(Q){var y,Y="1.7.2",AC=Math.round,AD,p={},c="en",o=(typeof module!=="undefined"&&module.exports),O="months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),V=/^\/?Date\((\-?\d+)/i,K=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g,P=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g,AE=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,G=/\d\d?/,q=/\d{1,3}/,r=/\d{3}/,h=/\d{1,4}/,j=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,B=/Z|[\+\-]\d\d:?\d\d/i,R=/T/i,k=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,D="YYYY-MM-DDTHH:mm:ssZ",I=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],a=/([\+\-]|\d\d)/gi,M="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),z={Milliseconds:1,Seconds:1000,Minutes:60000,Hours:3600000,Days:86400000,Months:2592000000,Years:31536000000},L={},e="DDD w M D d".split(" "),T="M D H h m s w".split(" "),H={M:function(){return this.month()+1
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
var dailybeast=dailybeast||{};
dailybeast.templating={getDustPartial:function(C,D){var B=this.getDustTemplate(C,D),A=dust.cache[B];
return A?A:null
},getDustTemplate:function(B,C){var A=B+(C!==undefined?"/"+C:B.substring(B.lastIndexOf("/")));
if(dust.cache[A]){return A
}else{if(dailybeast.componentHierarchy[B]){return this.getDustTemplate(dailybeast.componentHierarchy[B],C)
}}return null
}};
var baseContext=dust.makeBase({first:function(B,C,A,D){if(D&&D.of&&D.of.length>0){return B.render(A.block,C.push(D.of[0],0,D.of.length))
}return B
},rest:function(B,C,A,D){return D.of&&D.of.length>1?D.of.slice(1):undefined
},length:function(A,B){return B.stack.of
},comma:function(A,B){return B.stack.index<B.stack.of-1?", ":""
},formatDate:function(B,C,A,D){if(D.date&&D.format){return B.write(moment(D.date).format(D.format))
}return B
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
},equals:function(B,C,A,D){if(D.prop===D.value){return B.render(A.block,C)
}else{if(A["else"]){return B.render(A["else"],C)
}}return B
},neq:function(B,C,A,D){if(D.prop!==D.value){return B.render(A.block,C)
}else{if(A["else"]){return B.render(A["else"],C)
}}return B
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
},include:function(C,D,B,G){var E=G.resourceType,F=G.path,A=null;
if(E!==undefined){A=dailybeast.templating.getDustPartial(E)
}else{if(F!==undefined){A=dailybeast.templating.getDustPartial(D.get("resourceType"),F)
}}return A?A(C,D):C
},versionable:function(C,E,A,F){if(F.url){var B=E.get("buildInfo")["revision"];
var G=F.url.split(".").pop();
var D=F.url+".dres."+G+"/"+B+".cached."+G;
return C.write(D)
}return C
}});
var dailybeast=dailybeast||{};
dailybeast.componentHierarchy={"newsweek/components/page/quizpage":"newsweek/components/page/contentpage","education/components/content/featureimage/featuredimage":"foundation/components/parbase","newsweek/components/page/graphicpage":"newsweek/components/page/contentpage","education/components/content/inlinerelated":"newsweek/components/content/inlinerelated","dailybeast/components/gallery":"foundation/components/parbase","dailybeast/components/grid":"foundation/components/parsys","dailybeast/components/pages/gallery2":"dailybeast/components/page","dailybeast/components/inlineimage":"dailybeast/components/image","dailybeast/components/pages/topic":"dailybeast/components/page","education/components/content/feature/image":"foundation/components/parbase","dailybeast/components/pagelist/combo":"dailybeast/components/pagelist/item","education/components/page/interactivepage":"education/components/page/contentpage","mobilebeast/components/gallery":"dailybeast/components/gallery","dailybeast/components/home/photoslider":"foundation/components/parsys","dailybeast/components/pages/cheatsheet":"dailybeast/components/page","newsweek/components/content/mainimage":"dailybeast/components/inlineimage","newsweek/components/content/advertising":"dailybeast/components/ads/breakout","mobilebeast/components/pages/article":"mobilebeast/components/page","education/components/content/byline":"newsweek/components/content/byline","education/components/page/authorspage":"education/components/page/contentpage","education/components/content/vimeo":"newsweek/components/content/vimeo","dailybeast/components/topic/layout3/featurepanel/feature":"dailybeast/components/pagelist/item","education/components/content/brightcove":"newsweek/components/content/brightcove","newsweek/components/pages/blogentry":"dailybeast/components/pages/article","newsweek/components/content/brightcove":"dailybeast/components/video/brightcove","dailybeast/components/pages/gallery":"dailybeast/components/page","mobilebeast/components/pages/search":"mobilebeast/components/page","newsweek/components/content/flash":"foundation/components/parbase","dailybeast/components/pages/video":"dailybeast/components/page","education/components/page/searchpage":"education/components/page/contentpage","newsweek/components/content/youtube":"dailybeast/components/video/youtube","dailybeast/components/topic/videolist":"dailybeast/components/pagelist","dailybeast/wcm/components/newsletter":"foundation/components/page","newsweek/components/pages/section":"dailybeast/components/page","newsweek/components/section/slider":"dailybeast/components/slider","dailybeast/wcm/components/reference":"foundation/components/parbase","dailybeast/components/topic/layout2/slider":"dailybeast/components/slider","dailybeast/components/oembed":"newsweek/components/content/oembed","education/components/content/hulu":"newsweek/components/content/hulu","education/components/page/homepage":"education/components/page/contentpage","education/components/content/featureimage/image":"foundation/components/parbase","dailybeast/components/topic/layout1/top":"dailybeast/components/pagelist/combo","mobilenewsweek/components/section/features":"newsweek/components/section/features","dailybeast/components/trendingtopics":"dailybeast/components/links","dailybeast/wcm/components/heading":"dailybeast/components/page","dailybeast/components/tout":"foundation/components/parbase","dailybeast/components/home/contributors":"foundation/components/parsys","education/components/content/mainimage":"newsweek/components/content/mainimage","foundation/components/text":"foundation/components/parbase","education/components/content/youtube":"newsweek/components/content/youtube","dailybeast/components/pages/cheatstream":"dailybeast/components/pages/cheatsheet","dailybeast/components/home/partnerstory":"dailybeast/components/home/story","dailybeast/components/pages/grid12":"dailybeast/components/page","mobilebeast/components/ads/advertising":"dailybeast/components/ads/advertising","mobilebeast/components/text":"dailybeast/components/text","mobilebeast/components/pages/videos":"mobilebeast/components/page","education/components/content/collegerankingteasers":"foundation/components/parbase","mobilebeast/components/pages/video":"mobilebeast/components/page","dailybeast/components/topic/layout2/video":"dailybeast/components/pagelist/item","education/components/content/advertising":"newsweek/components/content/advertising","dailybeast/components/topic/highlight":"dailybeast/components/pagelist/combo","dailybeast/components/topic/layout2/featuredvideo":"dailybeast/components/pagelist/item","dailybeast/components/text":"foundation/components/parbase","dailybeast/components/flash":"foundation/components/parbase","dailybeast/components/ads/breakout":"dailybeast/components/ads/advertising","education/components/content/comments":"newsweek/components/content/comments","dailybeast/components/topic/layout2/nophoto":"dailybeast/components/pagelist/combo","education/components/page/generalcontentpage":"education/components/page/contentpage","newsweek/components/page/contentpage":"foundation/components/page","dailybeast/components/home/features":"foundation/components/parsys","dailybeast/components/pages/article":"dailybeast/components/page","dailybeast/components/wrap/curatedpage":"dailybeast/components/page","dailybeast/components/pages/home":"dailybeast/components/page","education/components/content/searchresults":"newsweek/component/content/search","newsweek/components/section/slider/slide":"dailybeast/components/slider/slide","education/components/content/featureimage":"education/components/content/feature","education/components/page/articlepage":"education/components/page/contentpage","newsweek/components/pages/video":"dailybeast/components/pages/video","mobilebeast/components/pages/cheatsheet":"mobilebeast/components/page","dailybeast/components/topic/layout1/large":"dailybeast/components/topic/highlight","newsweek/components/content/vimeo":"dailybeast/components/video/vimeo","newsweek/components/page/videopage":"/apps/newsweek/components/pages/video","education/components/page/videopage":"education/components/page/mediapage","dailybeast/components/pages/content":"dailybeast/components/page","mobilebeast/components/pages/gallery":"mobilebeast/components/page","education/components/content/bigtextimagetease/image":"foundation/components/parbase","education/components/page/landingpage":"education/components/page/articlepage","dailybeast/components/home/gallery":"foundation/components/image","dailybeast/components/topic/layout3/featurepanel":"foundation/components/parsys","dailybeast/components/pages/wrap":"dailybeast/components/page","dailybeast/components/pages/videos":"dailybeast/components/page","newsweek/components/page/articlepage":"newsweek/components/pages/article","dailybeast/components/listicle":"foundation/components/parsys","dailybeast/oracle/components/page":"dailybeast/components/page","education/components/content/taglist":"newsweek/components/content/taglist","education/components/page/contentpage":"newsweek/components/page/contentpage","education/components/content/sharetools":"newsweek/components/content/sharetools","education/components/content/sponsoredimage":"foundation/components/parbase","dailybeast/components/listicle/new":"foundation/components/parsys/new","dailybeast/components/slider":"foundation/components/parsys","dailybeast/components/gallery2":"foundation/components/parbase","mobilenewsweek/components/pages/section":"mobilebeast/components/page","newsweek/components/pages/article":"dailybeast/components/pages/article","dailybeast/components/wrap/contributors":"dailybeast/components/page","dailybeast/components/topic/layout2/gallery":"dailybeast/components/pagelist/item","mobilebeast/components/pages/home":"mobilebeast/components/page","dailybeast/components/twitter/list":"dailybeast/components/twitter/search","geometrixx/components/assetshare":"geometrixx/components/page","newsweek/components/page/packagepage":"newsweek/components/page/contentpage","dailybeast/components/pages/cheatsheet/parsys":"foundation/components/parsys","dailybeast/components/gallery/slide/image":"dailybeast/components/image","dailybeast/components/pages/author":"dailybeast/components/page","mobilebeast/components/slider":"dailybeast/components/text","mobilebeast/components/inlineimage":"dailybeast/components/inlineimage","geometrixx/components/widepage":"geometrixx/components/page","education/components/page/flowlistpage":"education/components/page/contentpage","education/components/content/collegerankingteasers/image":"foundation/components/parbase","dailybeast/components/topic/videolist/video":"dailybeast/components/pagelist/item","dailybeast/components/topic/layout1/medium":"dailybeast/components/topic/highlight","mobilenewsweek/components/pages/article":"mobilebeast/components/pages/article","dailybeast/components/topic/layout2/withphoto":"dailybeast/components/pagelist/combo","dailybeast/components/pages/cheat":"dailybeast/components/pages/cheatsheet","dailybeast/components/topic/gallerylist/gallery":"dailybeast/components/pagelist/item","newsweek/components/section/stories":"foundation/components/parsys","dailybeast/components/home/galleries":"foundation/components/parbase","dailybeast/components/pages/profile":"dailybeast/components/page","education/components/content/image":"foundation/components/parbase","newsweek/components/page/interactivepage":"dailybeast/components/pages/interactive","newsweek/components/content/pagebreak":"dailybeast/components/pagebreak","dailybeast/components/topic/layout3/medium":"dailybeast/components/pagelist/combo","geometrixx/components/contentpage":"geometrixx/components/page","geometrixx/components/homepage":"geometrixx/components/page","mobilebeast/components/pages/content":"mobilebeast/components/page","education/components/content/simpleimage":"newsweek/components/content/image","education/components/page/blogpage":"education/components/page/contentpage","newsweek/components/page/seriespage":"foundation/components/page","dailybeast/components/ads/floatingad":"dailybeast/components/ads/advertising","education/components/content/pagebreak":"newsweek/components/content/pagebreak","geometrixx/components/forum":"geometrixx/components/page","geometrixx/components/mobilecontentpage":"wcm/mobile/components/page","newsweek/components/page/magazinepreviewpage":"foundation/components/page","mobilebeast/components/pages/wrap":"mobilebeast/components/page","mobilebeast/components/page":"dailybeast/components/page","dailybeast/wcm/components/partners":"dailybeast/components/page","geometrixx/components/page":"foundation/components/page","dailybeast/components/gallery2/slide/image":"dailybeast/components/image","education/components/page/tagpage":"education/components/page/contentpage","mobilebeast/components/pages/topic":"mobilebeast/components/page","education/components/content/mostpopularmultimedia":"newsweek/components/content/mostpopularmultimedia","education/components/content/flowlist":"newsweek/components/content/flowlist","education/components/content/blogimage":"foundation/components/parbase","dailybeast/components/topic/layout1/featuredvideo":"dailybeast/components/pagelist/item","dailybeast/components/pages/archive":"dailybeast/components/pages/content","geometrixx/components/productlist":"foundation/components/parbase","dailybeast/components/topic/gallerylist":"dailybeast/components/pagelist","dailybeast/components/topic/layout2/slider/slide":"dailybeast/components/pagelist/item","mobilebeast/components/callout":"dailybeast/components/callout","dailybeast/components/wrap/switcher":"foundation/components/parsys","dailybeast/components/newsletters":"foundation/components/parsys","dailybeast/components/topic/layout6/story":"dailybeast/components/pagelist/item","dailybeast/components/insights":"foundation/components/parsys","dailybeast/components/contentimage":"foundation/components/image","dailybeast/components/twitter/widget":"foundation/components/parbase","education/components/page/blogentrypage":"education/components/page/articlepage","dailybeast/components/pages/search":"dailybeast/components/page","education/components/page/mediapage":"education/components/page/contentpage","newsweek/components/content/image":"dailybeast/components/image","dailybeast/components/topic/layout3/featuredgallery":"dailybeast/components/pagelist/item","dailybeast/components/pages/listicle":"dailybeast/components/pages/article","dailybeast/components/topic/layout3/large":"dailybeast/components/pagelist/combo","mobilebeast/components/pages/cheat":"mobilebeast/components/page","newsweek/components/content/inlineimage":"dailybeast/components/inlineimage","mobilebeast/components/pages/gallery2":"mobilebeast/components/pages/gallery","dailybeast/wcm/components/breakout":"dailybeast/components/page","education/components/content/feature":"foundation/components/parbase","geometrixx/components/newsletterpage":"mcm/components/newsletter/page","dailybeast/wcm/components/partner":"dailybeast/components/page","geometrixx/components/list":"foundation/components/list","dailybeast/components/image":"foundation/components/image","dailybeast/components/pages/interactive":"dailybeast/components/pages/article","education/components/content/authorsidebar":"newsweek/components/content/authorsidebar","newsweek/components/pages/gallery":"dailybeast/components/pages/gallery","dailybeast/components/home/teaser":"foundation/components/parbase","dailybeast/components/pages/blogentry":"dailybeast/components/pages/article","dailybeast/components/pages/rankings":"dailybeast/components/page","foundation/components/image":"foundation/components/parbase","dailybeast/components/home/stories":"foundation/components/parsys","education/components/content/inlineimage":"newsweek/components/content/inlineimage","geometrixx/components/title":"foundation/components/title","geometrixx/components/asseteditor":"geometrixx/components/page","dailybeast/components/home/suggestions":"foundation/components/parsys","education/components/content/flowlistimage":"newsweek/components/content/image","newsweek/components/page/blogentrypage":"newsweek/components/page/articlepage","dailybeast/components/pagelist":"foundation/components/parsys","dailybeast/components/page":"foundation/components/page","dailybeast/components/pages/company":"dailybeast/components/page","newsweek/components/page/mediapage":"newsweek/components/pages/gallery","newsweek/components/page/blogpage":"dailybeast/components/pages/content","education/components/content/flash":"newsweek/components/content/flash"};
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
}function D(G,F){return G.write("<li ").section(F.get("atIndex"),F,{block:C},{index:F.get("currentSlide")}).write('><a href="').reference(F.get("url"),F,"h").write('"><img alt="" src="').reference(F.getPath(false,["thumbnail","sizes","thumbnail"]),F,"h").write('"/>').section(F.get("isIntro"),F,{"else":B,block:A},null).write("</a></li>")
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
(function(){dust.register("dailybeast/components/gallery2/gallery",C);
function C(E,D){return E.section(D.get("gallery"),D,{block:B},null)
}function B(E,D){return E.write('<div id="gallery"><div class="container-16">').partial("dailybeast/components/gallery2/header",D,null).write('<div class="gallery-content">').partial("dailybeast/components/gallery2/sharetools",D,null).section(D.get("nth"),D,{block:A},{of:D.get("slides"),n:D.get("currentSlide")}).partial("dailybeast/components/ads/advertising/advertisement",D.rebase(D.get("interstitialAd")),null).write("</div></div></div>")
}function A(E,D){return E.partial("dailybeast/components/gallery2/slide",D,null)
}return C
})();
(function(){dust.register("dailybeast/components/gallery2/aside",E);
function E(J,I){return J.write('<div class="copy-style-b copy"><a class="btn-close-x" href="#"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a>').section(I.get("isIntro"),I,{"else":D,block:C},null).write('<div class="heading-slide"><h2 class="heading-style-t">').reference(I.get("title"),I,"h").write("</h2>").exists(I.get("contentDate"),I,{block:B},null).exists(I.get("location"),I,{block:H},null).exists(I.get("authors"),I,{block:G},null).write('</div><div class="text">').reference(I.get("caption"),I,"h",["s"]).write("</div></div>")
}function D(J,I){return J.write('<span class="listicle-number">').reference(I.get("listicleNumber"),I,"h").write("</span>")
}function C(J,I){return J
}function B(J,I){return J.write('<time class="timestamp" property="dc:created" datetime="').reference(I.get("contentDate"),I,"h").write('" pubdate="pubdate">').section(I.get("formatDate"),I,{},{date:I.get("contentDate"),format:"MMM D, YYYY"}).exists(I.get("location"),I,{block:A},null).write("</time>")
}function A(J,I){return J.write(" - ")
}function H(J,I){return J.write('<span class="location">').reference(I.get("location"),I,"h").write("</span>")
}function G(J,I){return J.write('<span class="byline byline-style-a"><span>by</span>\n').section(I.get("authors"),I,{block:F},null).write("</span>")
}function F(J,I){return J.write('<a rel="author" property="foaf:publications" href="/content/dailybeast/contributors/').reference(I.get("id"),I,"h").write('.html">').reference(I.get("name"),I,"h").write("</a>").reference(I.get("comma"),I,"h")
}return E
})();
(function(){dust.register("dailybeast/components/gallery2/header",A);
function A(C,B){return C.write('<div class="heading size1of1"><a class="btn-close-x" href="').reference(B.get("homeUrl"),B,"h").write('"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a><div class="captions-exit"><a class="captions-button" href="#">show captions</a><a class="exit-fullscreen-button" href="#">exit fullscreen</a></div><div class="logo"><a class="primary-logo" href="').reference(B.get("homeUrl"),B,"h").write('" role="navigation" data-track="{\'title\':\'dailybeastlogo\'}"><img src="/etc/clientlibs/dailybeast/img/logo/daily-beast.png" width="93" height="112" alt="The Daily Beast"/></a></div><div class="title-outer-container"><div class="red-line"></div><div class="title-inner-container"><h1 class="title">').reference(B.get("title"),B,"h").write('</h1></div><a href="#" class="more-gallery heading-style-r"><h4>More Galleries</h4></a></div></div>')
}return A
})();
(function(){dust.register("dailybeast/components/gallery2/sharetools",A);
function A(C,B){return C.write('<ul class="sharetools"><li><div st_title="').reference(B.get("title"),B,"h").write('" st_url="').reference(B.get("url"),B,"h").write('" st_image="').reference(B.getPath(false,["image","sizes","medium"]),B,"h").write('" st_summary="').reference(B.get("description"),B,"h").write('"class="st_email_custom">EMAIL</div></li><li class="fbshare lazy-fb-share"data-link="').reference(B.get("url"),B,"h").write('"data-picture="').reference(B.getPath(false,["image","sizes","medium"]),B,"h").write('"data-name="').reference(B.get("title"),B,"h").write('"data-description="').reference(B.get("description"),B,"h").write('"data-redirect-uri="').reference(B.get("url"),B,"h").write('"data-background-image="/etc/clientlibs/dailybeast/img/social/fbshare.png"><a class="fbshare-btn"  onclick="postToFeed(this);"> </a></li><li class="facebook"><fb:like href="').reference(B.get("url"),B,"h").write('" send="false" layout="box_count" width="45" show_faces="false"></fb:like></li><li class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="').reference(B.get("galleryShortUrl"),B,"h").write('"data-counturl="').reference(B.get("twitterCountUrl"),B,"h").write('" data-text="').reference(B.get("title"),B,"h").write('" data-via="').reference(B.get("twitterVia"),B,"h").write('" data-related="').reference(B.get("twitterRelated"),B,"h").write('"data-count="vertical"></a></li><li class="gplusone"><div class="g-plusone" data-href="').reference(B.get("url"),B,"h").write('" data-size="tall" data-callback="plusClick"></div></li><li class="linkedin lazy-linkedin"><script type="IN/Share" data-url="').reference(B.get("url"),B,"h").write('"><\/script></li></ul>')
}return A
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
function A(C,B){return C.write('<div class="content size1of1 clearfix"><div class="main"><div class="img-canvas-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><div class="img-canvas"><img alt="').reference(B.get("title"),B,"h").write('" src="').reference(B.getPath(false,["image","sizes","large"]),B,"h").write('"></div></div><div class="info-thbnail-wrapper"><div class="img-info-wrapper"><div class="img-info">').partial("dailybeast/components/gallery2/info",B,null).write('<div class="fullscreen-view-all"><a class="enter-fullscreen-button" href="#">enter fullscreen</a><a class="view-all-button" href="#viewAll">view all <span class="slide-count">(').reference(B.get("totalSlides"),B,"h").write(")</span></a>\n</div></div></div>").partial("dailybeast/components/gallery2/thumbnails/main",B,null).write("</div>").partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("footerAd")),null).partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("fullscreenAd")),null).partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("fullscreenAdTracker")),null).write('</div><div class="aside">').partial("dailybeast/components/gallery2/aside",B,null).partial("dailybeast/components/ads/advertising/advertisement",B.rebase(B.get("asideAd")),null).write("</div></div>")
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
var dailybeast=dailybeast||{};
var _gaq=_gaq||[];
var _qevents=_qevents||[];
dailybeast.analytics=function(){var P=["google","sitecatalyst","nielsen","comscore","quantcast"];
var S={};
function C(Z,Y){Z=Z.toLocaleLowerCase();
if(_.indexOf(P,Z)>-1){S[Z]=Y
}}function B(b,a){if(_.hasValue(S[b])&&_.hasValue(S[b].rules)){var Z=S[b].rules;
for(var Y in a){if(_.hasValue(Z[Y])){Z[Y](a)
}}}return a
}function I(a){if(!_.hasValue(a)){a={}
}for(var Z in S){var Y=_.deepClone(a);
switch(Z){case"google":D(Y);
break;
case"sitecatalyst":E(Y);
break;
case"nielsen":W(Y);
break;
case"comscore":X(Y);
break;
case"quantcast":H(Y);
break
}}}function K(a){if(_.hasValue(a.title)){for(var Z in S){var Y=_.deepClone(a);
switch(Z){case"google":V(Y);
break;
case"sitecatalyst":L(Y);
break;
case"nielsen":break;
case"comscore":break;
case"quantcast":break
}}}}function D(Y){Y.url=(_.hasValue(Y.url))?Y.url:window.location.pathname;
B("google",Y);
_gaq.push(["_setDomainName","none"]);
_gaq.push(["_trackPageview",Y.url])
}function E(d){var b=s_gi(s_account);
b.events="event1";
var Y=_.keys(b);
$.grep(Y,function(g,f){if(_.startsWith(g,"eVar")){b[g]=""
}});
B("sitecatalyst",d);
var c=S.sitecatalyst;
if(_.hasValue(c.mappings)){for(var a in d){var Z=c.mappings[a];
b[Z]=d[a]
}}b.t()
}function W(Z){B("nielsen",Z);
var Y=S.nielsen;
(function(){var a=new Image(1,1);
a.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci="+Y.providerID+"&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=usergen&rnd=",(new Date()).getTime()].join("")
})()
}function X(Z){B("comscore",Z);
var Y=S.comscore;
if(typeof COMSCORE=="undefined"){$.warn("COMSCORE was not defined.  comScore call was was not performed.");
return 
}COMSCORE.beacon({c1:Y.c1,c2:Y.c2,c3:"",c4:"",c5:"",c6:"",c7:Z.url?Z.url:"",c8:Z.pageName?Z.pageName:"",c9:Z.referer?Z.referer:"",c15:""})
}function H(d){var b=[],Z,Y,a,e,c;
if(d.tags){Y=d.tags.split("|");
for(Z=0;
Z<Y.length;
Z++){if(Y[Z].indexOf("topic:")==0){b.push(Y[Z])
}}a="";
e=b.length;
for(Z=0;
Z<e;
Z++){if(a.length>0){a+=", "
}a+=b[Z]
}}c=S.quantcast;
_qoptions={qacct:c.qacct,labels:a,event:"refresh"};
if(typeof quantserve=="undefined"){$.warn("Function quantserve() is not defined.  Quantcast call was not performed.");
return 
}quantserve()
}function L(e){var Y="";
if(e.section||e.title){Y="tdb";
Y+=" - "+dailybeast.metatags.getTemplate();
if(_.hasValue(e.section)){Y+=" - "+e.section
}if(_.hasValue(e.title)){Y+=" - "+e.title
}if(_.hasValue(e.index)){Y+=" - item "+e.index
}}var b=s_gi(s_account);
var d=[];
for(var a in e.eVars){b[a]=e.eVars[a];
d.push(a)
}b.linkTrackVars=d.join(",");
var Z=e.events.join(",");
b.linkTrackVars+=(b.linkTrackVars)?","+Z:Z;
b.linkTrackVars+=",events";
b.linkTrackEvents=Z;
b.events=Z;
if(e.delayLoad){var c=e.link||(document.createElement("a"));
b.tl(c,"o",Y)
}else{b.tl(true,"o",Y)
}}function V(Z){var Y="";
if(_.hasValue(Z.section)){Y+=Z.section
}if(_.hasValue(Z.title)){Y+=((Y.length>0)?" - ":"")+Z.title
}if(_.hasValue(Z.index)){Y+=" - item "+Z.index
}_gaq.push(["_trackEvent","Module Click",dailybeast.metatags.getTemplate(),Y])
}function M(Y,b){var a=s_gi(s_account);
a.linkTrackVars="eVar50,eVar51,events";
a.linkTrackEvents="event32";
a.eVar50=Y;
var Z=false;
if(b){Z=true
}a.eVar51=""+Z;
a.events="event32";
a.tl(this,"o","Vertical Gallery Click Tracking")
}function T(b,Z,Y){var a=s_gi(s_account);
a.linkTrackVars="eVar37,eVar38,events";
a.linkTrackEvents="event33";
if(typeof Y!="undefined"){a.pageName=Y;
a.pageURL=Z
}a.eVar37=b;
a.eVar38=Z;
a.events="event33";
a.tl(this,"o","Sharetool Click Tracking");
if(typeof Y!="undefined"){a.pageName=getAnalyticsPageName()
}}function F(a,Y,Z){var b=s_gi(s_account);
b.linkTrackVars="eVar52,eVar53,eVar54,events";
b.linkTrackEvents="event34";
b.eVar52=Y;
b.eVar53=Z;
b.eVar54=a;
b.events="event34";
b.tl(this,"o","More Galleries Conversion Click Tracking")
}function U(Z){var Y=s_gi(s_account);
Y.linkTrackVars="eVar52,events";
Y.linkTrackEvents="event35";
Y.eVar52=Z;
Y.events="event35";
Y.tl(this,"o","Galleries Complete Click Tracking")
}function O(a){var Z=s_gi(s_account),b=Z.linkTrackVars,Y=Z.linkTrackEvents;
Z.linkTrackVars="eVar56,eVar57,eVar58,eVar59,eVar60,eVar61,events";
Z.linkTrackEvents="event36";
Z.eVar56=a;
Z.eVar57=dailybeast.metatags.getTemplate();
Z.eVar58=getAnalyticsPageName();
Z.eVar59=A();
Z.eVar60=R();
Z.eVar61=N();
Z.events="event36";
Z.tl(this,"o","Mobile to/from Desktop Switching");
Z.linkTrackVars=b;
Z.linkTrackEvents=Y
}function G(){var Z=s_gi(s_account),a=Z.linkTrackVars,Y=Z.linkTrackEvents;
Z.linkTrackVars="eVar58,eVar59,eVar60,eVar61,events";
Z.linkTrackEvents="event37";
Z.eVar58=getAnalyticsPageName();
Z.eVar59=A();
Z.eVar60=R();
Z.eVar61=N();
Z.events="event37";
Z.tl(this,"o","Screen Orientation Switch");
Z.linkTrackVars=a;
Z.linkTrackEvents=Y
}function N(){if(typeof window.orientation=="undefined"){return undefined
}switch(window.orientation){case 0:case 180:return("Portrait");
break;
case 90:case -90:return("Landscape")
}return"Unknown"
}function R(){var Y=screen.width;
var Z=screen.height;
return Y+"x"+Z
}function A(){(function(g){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(g)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(g.substr(0,4))
})(navigator.userAgent||navigator.vendor||window.opera);
if(!jQuery.browser.mobile){return"Desktop"
}else{var f=navigator.userAgent.toLowerCase();
var Y=/ipad/i.test(f);
if(Y){return"iPad"
}var a=/iphone/i.test(f);
if(a){return"iPhone"
}var e=/ipod/i.test(f);
if(e){return"iPod"
}var b=/android/i.test(f);
if(b){return"Android"
}var c=/blackberry/i.test(f);
if(c){return"Blackberry"
}var d=/webos/i.test(f);
if(d){return"WebOS"
}var Z=/windows phone/i.test(f);
if(Z){return"Windows Phone"
}}}function Q(){var d=[];
var a=dailybeast.metatags.getContentPath();
var c=dailybeast.metatags.getWrap();
var Y=dailybeast.metatags.getTags("topic",false);
if(a=="/content/dailybeast"){d.push("Homepage");
return d
}else{if(a.indexOf("/content/dailybeast/cheat-sheets")==0){d.push("Cheat-Sheet-Landing-Page");
return d
}else{if(a.indexOf("/cheats/")!=-1){d.push("Cheat");
return d
}else{if(a.indexOf("/content/dailybeast/videos")==0){d.push("Video");
return d
}}}}if(a.indexOf("/content/newsweek")==0){d.push("Newsweek")
}if(c.length>0){var Z=c.lastIndexOf("/");
var e=c.substring(Z+1);
d.push("wrap:"+e)
}for(var b=0;
b<Y.length;
b++){d.push(Y[b])
}return d
}function J(Y){var b=Q();
var a="";
var c=b.length;
for(var Z=0;
Z<c;
Z++){if(a.length>0){a+=", "
}a+=b[Z]
}return a
}return{addProvider:C,trackPageview:I,trackEvent:K,trackGalleryClick:M,trackSharetoolClick:T,trackMoreGalleriesConversionClick:F,trackGalleriesCompleteClick:U,getQuantcastLabelString:J,trackPlatformSwitch:O,trackScreenOrientationChange:G}
}();
$(window).bind("orientationchange",dailybeast.analytics.trackScreenOrientationChange);
function trackReadOnCollapse(C,B){var A=s_gi(s_account);
A.linkTrackVars="eVar25,eVar26,events";
A.linkTrackEvents="event13";
A.eVar25=C;
A.eVar26=B;
A.events="event13";
A.tl(this,"o","Read On - Collapse Tracking")
}var dailybeast=dailybeast||{};
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
dailybeast.analytics.addProvider("google",{rules:{pageNum:function(A){A.pageNum++;
A.url=A.url.replace(".html",".page"+A.pageNum+".html")
}}});
dailybeast.analytics.addProvider("sitecatalyst",{rules:{pageNum:function(A){A.pageNum++
}},mappings:{contentPath:"prop1",templateName:"prop3",pageNum:"prop4",previousPageName:"prop7",wrapName:"prop8",tags:"prop17",url:"pageURL",referer:"referrer",pageName:"pageName",platform:"prop44"}});
dailybeast.analytics.addProvider("nielsen",{providerID:"us-302188h"});
dailybeast.analytics.addProvider("comscore",{c1:2,c2:6433482});
dailybeast.analytics.addProvider("quantcast",{qacct:"p-bcLY1r4ynM-2-"});
$.priorityQ.domReady.add("Analytics Providers",$.priorityQ.CRITICAL,function(){dailybeast.analytics.configuration.init()
});
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
$(selector+" div[data-advertising]").each(function(){var data=eval("("+$(this).attr("data-advertising")+")");
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
}function renderTemplate(A,B,C){dust.render(A,B,function(E,D){if(E){console.log(E)
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
}function G(){$(".storyScroller-scrollable").scrollable({next:".storyScroller-next",prev:".storyScroller-previous",steps:5,api:true});
this.chapterAPI=$(".storyScroller-scrollable").data("scrollable");
var Q=5;
$.each(this.chapterAPI.getItems(),function(R){if(R==0||R%Q==0){var S=$("<a/>").attr("href","#"+R);
S.click(function(T){T.preventDefault();
$(".storyScroller-scrollable").data("scrollable").seekTo(R)
});
$(".playlist .pagination").append(S)
}});
$(".playlist .pagination a").wrap("<li></li>");
this.chapterAPI.onSeek(function(S,R){if(this.getIndex()>=this.getSize()-Q){$(chapterAPI.getConf().next).addClass("disabled")
}$(".playlist .pagination li").removeClass("current");
$('.playlist .pagination a[href="#'+this.getIndex()+'"]').parent().addClass("current")
});
this.chapterAPI.onBeforeSeek(function(S,R){if(this.getIndex()>=this.getSize()-Q){if(R>this.getIndex()){return false
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
var isAppleDevice=navigator.userAgent.match(/(iPad|iPhone|iPod)/i)!=null;
var isMacWebKit=$.browser.webkit&&(navigator.userAgent.match(/Mac OS/i)!=null);
var isUserScrolling=false;
var isStreamOn=$("#home-page .videoBlock header").attr("stream")=="true";
if(!isAppleDevice&&isStreamOn){$("#home-page .video-container.video").hide();
$("#home-page .video-container.stream").show()
}$(window).bind("scrollstart",function(){isUserScrolling=true
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
$(".gallery-item").floattip({tip:{element:".float-tip",paddingX:20,paddingY:20},stage:{element:".galleries"}})
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
e.find(".videoWrapper").load(f.replace(".html",".videooverlay.html"),function(){$("#videoOverlay .videoOverlayList").jScrollPane({animateTo:true,animateStep:10,animateInterval:10});
Y=$(".videoOverlayList li").first().addClass("current");
dailybeast.video.addVideoEventListener(J);
$(".videoOverlayList li").click(function(g){g.preventDefault();
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
}$.priorityQ.domReady.add("Newsletter Forms",$.priorityQ.SOMETIME,function(){function E(O,P){P=P||{};
var Q=O.find("button");
function R(U,T){if(P.showMessage){P.showMessage(U,T)
}else{var S=O.find(".message").text(U).show("slow");
setTimeout(function(){S.hide("slow")
},5000)
}}O.submit(function(){if(P.validate){var S=P.validate(O);
if(S){R(S,true);
return false
}}var T={email:O.find("[name=email]").val(),subscriptions:[]};
O.find("[name=subscriptions]:checked").each(function(){T.subscriptions.push($(this).val())
});
if(P.submit){P.submit(O,Q)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:T,dataType:"json",complete:function(){if(P.complete){P.complete(O,Q)
}},success:function(U){if(U.msg!==undefined){R(U.msg,false)
}},error:function(V){var U=$.parseJSON(V.responseText);
if(U.msg!==undefined){R(U.msg,true)
}}});
return false
})
}if($("#newsletters-page").length!=0){E($(".newsletters form"),{validate:function(O){return !O.find("input[name=tos]").is(":checked")?"Please confirm that you have read and agree to the Terms of Service and Privacy Policy.":""
},submit:function(O,P){P.text("submitting...").attr("disabled",true)
},complete:function(O,P){P.text("submit").attr("disabled",false)
}})
}$(".signup").each(function(){var O=$(this);
var R=$(this).find(".message-dialog.confirm");
R.click(function(){R.hide()
});
var Q=$(this).find(".message-dialog.error");
Q.click(function(){Q.hide()
});
var P=$(this).find(".loading-indicator");
E($(this).find("form"),{showMessage:function(T,S){if(!S){if(T.toLowerCase().indexOf("invalid")>=0){S=true;
T="Sorry, that's not a valid email address. Please try again."
}else{T="Thanks! You're subscribed."
}}if(S){Q.find(".text-cell").text(T);
Q.show()
}else{R.find(".text-cell").text(T);
R.show()
}},validate:function(S){var T=S.find("input[name=email]").val();
T=$.trim(T);
return T.length==0?"Please enter your email address.":""
},submit:function(S,T){P.show()
},complete:function(S,T){P.hide()
}})
});
var B=false;
function H(P,R){R=R||{};
var S=P.find("button[name=validate]");
var U=P.find("[name=email]");
var Q="";
function T(W,V){P.find("button[name=confirm]").attr("disabled",false);
P.find("button[name=cancel]").attr("disabled",false);
P.find("input[name=tos]").attr("disabled",false);
P.find("[name=subscriptions]").each(function(){$(this).attr("disabled",false)
});
B=false;
P.find("img").show();
P.find(".input-text").addClass("input-error");
P.find(".message").text(W);
setTimeout(function(){P.find(".message").text("");
P.find(".input-text").removeClass("input-error");
P.find("img").hide()
},5000)
}function O(){Q=U.val();
U.blur();
U.attr("disabled",true);
var V={email:Q!="Enter your email address"?Q:""};
if(R.submit){R.submit(P,S)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:V,dataType:"json",complete:function(){if(R.complete){R.complete(P,S)
}},success:function(W){if(W.msg!==undefined&&(W.msg.toLowerCase().indexOf("invalid")!=-1||W.msg.toLowerCase().indexOf("enter")!=-1)){T("Please provide a valid email address.",false);
U.attr("disabled",false);
if(R.cancel){R.cancel(P,S)
}}else{if(W.msg!==undefined&&W.msg.toLowerCase().indexOf("please select")==-1){T(W.msg,false);
U.attr("disabled",false)
}else{if(R.validateComplete){R.validateComplete(P)
}}}},error:function(X){var W=$.parseJSON(X.responseText);
if(W.msg!=undefined){T(W.msg,true)
}}})
}P.find("button[name=cancel]").click(function(){if(R.cancel){R.cancel(P,S)
}return false
});
U.keypress(function(V){if(V.which==13){V.preventDefault();
O()
}});
S.click(function(){O();
return false
});
P.submit(function(){if(B){return false
}else{B=true
}if(R.validate){var V=R.validate(P);
if(V){T(V,true);
return false
}}P.find("button[name=confirm]").attr("disabled",true);
P.find("button[name=cancel]").attr("disabled",true);
P.find("input[name=tos]").attr("disabled",true);
P.find("[name=subscriptions]").each(function(){$(this).attr("disabled",true)
});
var W={email:Q,tos:P.find("input[name=tos]").is(":checked"),subscriptions:[]};
P.find("[name=subscriptions]:checked").each(function(){W.subscriptions.push($(this).val())
});
if(R.submit){R.submit(P,S)
}P.find("[name=subscriptions]:checked").each(function(){P.find("#thankList").append('<li class="clearfix">'+$(this).next("h2").text()+"</li>")
});
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:W,dataType:"json",complete:function(){if(R.complete){R.complete(P,S)
}},success:function(X){if(X.msg!==undefined&&X.msg.toLowerCase().indexOf("successfully added")==-1){T(X.msg,false)
}else{if(R.success){R.success(P)
}}},error:function(Y){var X=$.parseJSON(Y.responseText);
if(X.msg!==undefined){T(X.msg,true)
}}});
return false
})
}if($("#cheatsheet-page").length!=0){var N=$(".submitform");
var L=N.find("#thankList");
var J=N.find("[name=email]");
var F=N.find("button[name=validate]");
var I=N.find("button[name=confirm]");
var C=N.find("input[name=tos]");
var D;
var A;
if($.browser.msie){D=N.find(".setup");
A=N.find(".confirmed")
}else{D=$(N.find(".setup")[1]);
A=$(N.find(".confirmed")[1])
}var M=[];
var G=0;
N.find("[name=subscriptions]").each(function(){M[G]=$(this).attr("checked");
$(this).attr("disabled",false);
G++
});
if(isMacWebKit||$.browser.msie){var K=J.attr("placeholder");
J.focus(function(){if(J.val()==""||J.val()==K){J.attr("placeholder","");
J.val("")
}}).blur(function(){if(J.val()==""||J.val()==J.attr("placeholder")){J.attr("placeholder",K);
J.val(K)
}}).blur()
}if($.browser.msie||$.browser.mozilla){J.val("");
J.blur();
C.attr("checked",false);
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"GET",dataType:"json",success:function(O){G=0;
N.find("[name=subscriptions]").each(function(){$(this).attr("checked",O[G].enabled);
M[G]=O[G].enabled?"checked":"";
G++
})
},error:function(P){var O=$.parseJSON(P.responseText);
if(O.msg!==undefined){showMessage(O.msg,true)
}}})
}J.attr("disabled",false);
F.attr("disabled",false);
I.attr("disabled",false);
C.attr("disabled",false);
H(N,{validate:function(O){return !C.is(":checked")?"Please agree to privacy policy.":""
},validateComplete:function(P){var O=J.outerWidth()+P.find("button[name=validate]").outerWidth()-31;
D.width(O);
A.width(O);
D.show("fast",function(){if($.browser.msie){$(D[0]).height($(D[1]).height())
}})
},cancel:function(O,P){C.attr("checked",false);
D.hide("fast",function(){var Q=0;
O.find("[name=subscriptions]").each(function(){$(this).attr("checked",M[Q]=="checked");
$(this).attr("disabled",false);
Q++
});
C.attr("disabled",false)
});
P.attr("disabled",false);
J.val("");
J.blur();
J.attr("disabled",false);
I.attr("disabled",false);
B=false;
P.focus();
P.blur()
},submit:function(O,P){P.attr("disabled",true);
L.find(".clearfix").remove();
J.blur()
},complete:function(O,P){J.blur()
},success:function(O){D.hide("fast",function(){var P=0;
O.find("[name=subscriptions]").each(function(){$(this).attr("checked",M[P]=="checked");
$(this).attr("disabled",false);
P++
});
C.attr("disabled",false);
O.find("button[name=cancel]").attr("disabled",false)
});
A.show("fast",function(){if($.browser.msie){$(A[0]).height($(A[1]).height())
}})
}});
N.find("button[name=close]").click(function(){C.attr("checked",false);
N.find("button[name=validate]").attr("disabled",false);
J.val("");
J.blur();
J.attr("disabled",false);
I.attr("disabled",false);
B=false;
F.focus();
F.blur();
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
}$.priorityQ.domReady.add("Social Button Placeholders",$.priorityQ.NORMAL,function(){$(".social-placeholder").on("click",function(G){var D=$(this);
var E=D.attr("data-window")?$.parseJSON(D.attr("data-window")):{};
var F=D.attr("data-width")?D.attr("data-width"):500;
var B=D.attr("data-height")?D.attr("data-height"):400;
var H=function A(I,J,R){var Q=typeof I.screenX!="undefined"?I.screenX:I.screenLeft;
var L=typeof I.screenY!="undefined"?I.screenY:I.screenTop;
var N=typeof I.outerWidth!="undefined"?I.outerWidth:document.documentElement.clientWidth;
var O=typeof I.outerHeight!="undefined"?I.outerHeight:(document.documentElement.clientHeight-22);
var M=(Q<0)?I.screen.width+Q:Q;
var K=parseInt(M+((N-J)/2),10);
var P=parseInt(L+((O-R)/2.5),10);
return{width:parseInt(J),height:parseInt(R),left:K,top:P}
}(window,F,B);
var C=window.open(D.attr("href"),"Share","status=0,scrollbars=0,menubar=0,location=0,toolbar=0,width="+H.width+",height="+H.height+",left="+H.left+",top="+H.top);
return false
})
});
$.priorityQ.windowReady.add("Lazy Social Buttons",$.priorityQ.SOMETIME,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".lazy-like").lazyFacebook();
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
var GalleryUrlUtil={isAGallery:function(A){return A&&A.match("/galleries/")
}};
(function(D){var C=null,B=false,E=window.location.pathname,A=null;
function H(){A.hideLoading();
if(Modernizr.history){history.pushState(null,"",E)
}B=false
}function G(I){if(C===null){C=new FullScreenOverlay({onClose:H})
}A=new GalleryView(C.open(),{onClose:function(){C.close()
}});
A.loadGallery(I,true);
B=true
}function F(){return Modernizr.history&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&D("#gallery2-page").length===0
}D(function(){if(F()){D("a[href]").each(function(){var I=D(this);
var J=I.attr("href");
if(GalleryUrlUtil.isAGallery(J)&&!isAppleDevice){I.click(function(){G(J);
return false
})
}});
D(window).bind("popstate",function(){if(location.pathname===E){if(C!==null){C.close();
B=false
}}else{if(!B){var I=window.location.pathname+window.location.hash;
if(GalleryUrlUtil.isAGallery(I)){G(I)
}}}})
}else{D.warn("Not attaching galleries as overlays.  HTML5 history not detected:"+Modernizr.history)
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
A.onUserLogin=function(){A.closeLoginForm()
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
A.authDelegate.login=function(){dailybeast.janrain.openLoginForm()
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
A.loadStream=function(){if($("#livefyre").length>0&&typeof A.authDelegate!="undefined"){try{fyre.conv.load({network:A.network,authDelegate:A.authDelegate},[A.config],A.lfready)
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
$("#livefyre").on("mouseover",".fyre-comment-like-imgs .fyre-avatar a",function(C){var B=$(this);
if(typeof B.data("qtip")==="undefined"){B.qtip({content:B.data("title"),show:{ready:true,when:{event:"mouseover"}},hide:"mouseout",position:{corner:{tooltip:"topLeft",target:"rightBottom"}},style:{border:{width:5,radius:10},padding:10,textAlign:"center",tip:true,name:"light"}})
}})
};
A.init=function(){try{$.log("Initializing livefyre on the Beast",A.network);
window.dailybeast.janrain.loginForm.bind("userLoggedIn",A.onUserLogin);
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