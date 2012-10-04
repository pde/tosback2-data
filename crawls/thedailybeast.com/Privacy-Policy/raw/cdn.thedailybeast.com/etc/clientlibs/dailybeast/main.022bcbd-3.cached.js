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
}else{window.onscroll=updateFloatingAd
}}$.widget("ui.advertising",{options:{iFrame:false,editNamespace:"edit",adNamespace:"ad",entityNamespace:"entity",topicNamespace:"topic",packageNamespace:"package",audienceScienceCookie:"rsi_segs",customTile:"false",disable:"false",render:"true",siteID:"5480.iac.thedailybeast",topic:"",size:"",params:null,tile:1,ord:dailybeast.interstitial.getOrd(),zone:"",template:""},refresh:function(A){this._refresh(A)
},hide:function(){this._hide()
},show:function(){this._show()
},_create:function(){if(this.options.disable=="false"){this._setSize();
this._setAdParams();
$.data(this.element,"isReady",true)
}},_refresh:function(A){if((this._isReady()&&$(this.element).is(":visible"))||$(this.element).attr("forceShowing")=="true"){this._setReady(false);
this._render(this._generateUrl(A))
}},_render:function(B){var C=this;
if(this.options.iFrame){$(this.element).html('<iframe width="'+this._width+'" height="'+this._height+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowTransparency="true" src="/etc/static/dailybeast/dart.html#'+encodeURIComponent(B)+'"/>');
this._setReady(true)
}else{var A="<script src='"+B+"'><\/script>";
if($.browser.msie){writeCapture.proxyGetElementById=true
}else{writeCapture.writeOnGetElementById=true
}$(this.element).html(writeCapture.sanitize(A,{done:function(){C._setReady(true);
if(C._adParams.adDebug){C._enableDebugging(B)
}}}))
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
var GalleryView;
(function(A){GalleryView=function(C,D){var B=this;
this.$el=C;
this.settings=A.extend({onClose:function(){var E=A(".btn-close-x").attr("href");
if(document.referrer){var F=document.referrer.replace(/([^\?#]*)[\?#](.*)/gim,"$1");
var G=window.location.href.replace(/([^\?#]*)[\?#](.*)/gim,"$1");
if(F&&F!=G&&F.indexOf(window.location.host)>=0){E=F
}}A.log("Closing and navigating to:"+E);
window.location=E
}},D);
if(D.data!==undefined){this.setViewData(D.data)
}A(window).unbind(".galleryView").bind("resize.galleryView",function(){B.resize()
}).bind("orientationchange.galleryView",function(){B.resize()
}).bind("popstate.galleryView",function(E){if(E.originalEvent&&B.gallery&&!B.isSameGallery(window.location.pathname)){B.loadGallery(window.location.pathname+window.location.hash,false)
}}).bind("hashchange.galleryView",function(){B.renderSlideUrl(window.location.pathname+window.location.hash)
});
A(document).unbind(".galleryView").bind("keydown.galleryView",function(E){if(E.keyCode==37){B.previous();
B.showInterstitialAdIfAppropriate();
dailybeast.analytics.trackGalleryClick("PREVIOUSKEY",B.fullScreen)
}else{if(E.keyCode==39){B.next();
B.showInterstitialAdIfAppropriate();
dailybeast.analytics.trackGalleryClick("NEXTKEY",B.fullScreen)
}}});
if(A("#gallery").length==1){this.attachEvents();
this.resize()
}setTimeout(function(){A("#gallery .img-canvas").css("visibility","visible");
A("#gallery .aside .copy").css("visibility","visible")
},2000)
};
GalleryView.IMAGE_SIZES=["medium","large","xlarge"];
GalleryView.IMAGE_SIZE_DIVISOR=700;
GalleryView.prototype.showLoading=function(D,C){var B=this;
B.hideLoading();
B.loadingSlide=D;
setTimeout(function(){if(B.loadingSlide===D){A("#gallery .slide-thumbnail a").each(function(E,G){var F=A(G);
if(F.attr("href").indexOf(D.url)>=0){F.find("img").addClass("loading");
F.parent().addClass("gallery-loader")
}})
}},typeof C!="undefined"?C:1)
};
GalleryView.prototype.hideLoading=function(){var B=this;
B.loadingSlide=null;
A("#gallery .slide-thumbnail img").removeClass("loading");
A("#gallery .slide-thumbnail .gallery-loader").removeClass("gallery-loader")
};
GalleryView.prototype.loadGallery=function(C,D){var B=this;
if(B.$el.length>=1){B.$el.addClass("gallery-loader")
}A.ajax(C.replace(/\.html.*/,".gallery.json"),{dataType:"json",success:function(G){var F=G.gallery.slides;
for(var E=0,H=F.length;
E<H;
E++){if(F[E].url==C){G.currentSlide=E
}}B.setViewData(G);
B.render();
if(D){B.pushState()
}if(B.$el.length>=1){B.$el.removeClass("gallery-loader")
}}})
};
GalleryView.prototype.setViewData=function(B){this.data=B;
this.gallery=B.gallery;
this.slideIndex=B.currentSlide;
this.slideCount=B.gallery.slides.length;
this.galleryContext=baseContext.push(B).push(B.gallery);
this.slideUrlMapping=this.getSlideUrlMapping(B.gallery);
this.moreGalleries=false;
this.fullScreen=false;
this.captions=true;
this.clickCount=0;
this.shownInterstitial=false;
this.imageSizeIndex=1;
this.imageSizeIndexLoaded=1;
this.updatingImage=false
};
GalleryView.prototype.reset=function(){this.slideIndex=0;
this.data.currentSlide=this.slideIndex;
this.galleryContext=baseContext.push(this.data).push(this.data.gallery);
this.clickCount=0;
this.shownInterstitial=false;
this.imageSizeIndexLoaded=1;
this.updatingImage=false;
this.moreGalleries=false;
this.setSlideHash();
this.render()
};
GalleryView.prototype.render=function(){var C=this;
var B=A("#gallery");
renderTemplate("dailybeast_components_gallery2_gallery",baseContext.push(this.data),function(D){if(B.length==0){C.$el.html(D)
}else{B.replaceWith(D)
}C.attachEvents();
C.resize();
C.moreGalleriesShow();
C.initAds();
C.refreshAds();
C.shareTools.refresh();
C.header.undimTitle();
C.header.pushBrowserTitle(C.gallery.longTitle);
dailybeast.analytics.trackPageview({pageNum:C.slideIndex+1})
})
};
GalleryView.prototype.resize=function(){var J=A(window).height(),D=A("#gallery .heading").outerHeight(true),H=A("#gallery .info-thbnail-wrapper").outerHeight(true),E=A("#gallery .heading-slide").outerHeight(),B=A("#gallery .ad-aside").outerHeight(true),I=(J-D-25)-(E+B),C=88,F=J-D-H-10-(this.fullScreen?C:0),G=A("#gallery .main").width();
A("#gallery .img-canvas-wrapper, #gallery .img-canvas").css({height:F,width:G});
A("#gallery .img-canvas img").css({"max-height":F,"max-width":G});
if(!this.fullScreen){A("#gallery .text").css("height",I)
}this.updateImageSize()
};
GalleryView.prototype.attachEvents=function(){var C=this;
C.detectFullScreen();
A(".img-canvas img").one("load",function(){if(!C.updatingImage&&A(this).css("visibility")=="hidden"){C.showImageCanvasAndText()
}});
A("#gallery").on("click.GalleryView","a[href]",function(){var D=A(this).attr("href");
if(C.isSameGallery(D)){if(window.location.pathname+window.location.hash==D){if(C.viewAllView){C.showContent();
C.viewAllView.hide()
}if(!C.fullScreen&&C.shareTools){C.shareTools.show()
}C.showImageCanvasAndText()
}else{C.showInterstitialAdIfAppropriate()
}}else{if(Modernizr.history&&GalleryUrlUtil.isAGallery(D)){C.loadGallery(D,true);
return false
}}});
this.viewAllView=new ViewAllView(A("#gallery .gallery-content"),this);
var B=new PagedDataProvider(function(F,E){var D=C.gallery.id+".related-gallery."+F+"."+E+".json";
A.log("fetching related galleries data from "+D);
return D
},{pageSize:50,eager:true});
this.moreGalleriesView=new Expandy(A("#gallery .heading"),B,{itemHeight:163,itemWidth:171,mainTemplate:"dailybeast_components_gallery2_moregalleries_main",itemsTemplate:"dailybeast_components_gallery2_moregalleries_galleries",afterNext:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESNEXT")
},afterPrevious:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESPREVIOUS")
},afterRender:function(){A(".more-galleries .items img").unbind("error").bind("error",function(D){D.currentTarget.src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg"
})
}});
this.moreGalleriesView.show(0);
A(".img-canvas-wrapper .next").click(function(){C.next();
C.showInterstitialAdIfAppropriate();
dailybeast.analytics.trackGalleryClick("NEXT",C.fullScreen);
return false
});
A(".img-canvas-wrapper .previous").click(function(){C.previous();
C.showInterstitialAdIfAppropriate();
dailybeast.analytics.trackGalleryClick("PREVIOUS",C.fullScreen);
return false
});
this.updateButtons();
A(".img-canvas-wrapper .next, .img-canvas-wrapper .previous").focus(function(){A(this).blur()
});
A(".view-all-button").click(function(){C.hideContent();
C.shareTools.hide();
C.hideImageCanvasAndText();
if(C.moreGalleries){C.moreGalleriesClose()
}C.viewAllView.show(C.slideIndex);
dailybeast.analytics.trackGalleryClick("VIEWALL",C.fullScreen);
return false
});
A(".enter-fullscreen-button").click(function(){if(C.moreGalleries){C.moreGalleriesClose();
C.enterFullScreen()
}else{C.enterFullScreen()
}dailybeast.analytics.trackGalleryClick("FULLSCREEN",C.fullScreen);
return false
});
A(".exit-fullscreen-button").click(function(){C.exitFullScreen();
dailybeast.analytics.trackGalleryClick("EXITFULLSCREEN",C.fullScreen);
return false
});
A(".more-gallery").click(function(){if(C.moreGalleries){C.moreGalleriesClose()
}else{C.moreGalleriesOpen();
dailybeast.analytics.trackGalleryClick("MOREGALLERIES",C.fullScreen)
}return false
});
A(".captions-button").click(function(){if(C.captions){C.showCaptions();
dailybeast.analytics.trackGalleryClick("SHOWCAPTIONS",C.fullScreen)
}else{dailybeast.analytics.trackGalleryClick("HIDECAPTIONS",C.fullScreen);
C.hideCaptions()
}return false
});
if(this.settings.onClose){A("#gallery .heading .btn-close-x").click(function(){C.close();
C.header.popBrowserTitle();
dailybeast.analytics.trackGalleryClick("HIDECAPTIONS-X",C.fullScreen);
return false
})
}A("#gallery").on("click.GalleryView",".aside .btn-close-x",function(){C.hideCaptions();
return false
});
this.thumbnailView=new ThumbnailView(this.gallery.slides,this.slideIndex,this.gallery.introSlide);
this.header=new GalleryHeader();
this.relatedGalleriesView=new RelatedGalleriesView(this,B,this.header);
this.shareTools=new ShareTools(A("#gallery .sharetools"));
if(window.location.hash){this.renderSlideUrl(window.location.pathname+window.location.hash)
}};
GalleryView.prototype.next=function(){if(this.slideIndex+1<this.slideCount){this.renderSlide(this.slideIndex+1)
}else{if(this.fullScreen){this.exitFullScreen()
}this.moreGalleriesHide(function(){this.relatedGalleriesView.render()
})
}};
GalleryView.prototype.previous=function(){if(this.slideIndex-1>=0){this.renderSlide(this.slideIndex-1)
}};
GalleryView.prototype.updateButtons=function(){var B=A(".img-canvas-wrapper .previous");
if(this.slideIndex==0){B.hide()
}else{B.show()
}};
GalleryView.prototype.finishRenderSlide=function(B){var J=this;
var F=J.slideIndex,G=J.slideCount,I=J.imageSizeIndex,D=J.gallery.slides[F],C=J.galleryContext.push(D,F,G),E=GalleryView.IMAGE_SIZES[I],H=D.image.sizes[E];
if(B==H){A.log("Rendering the rest of the slide");
J.hideImageCanvasAndText();
replaceTemplate("dailybeast_components_gallery2_info",C,A("#gallery .info"));
renderTemplate("dailybeast_components_gallery2_aside",C,function(K){A("#gallery .copy").replaceWith(K);
J.resize()
});
A(".img-canvas img").attr("src",H);
this.updatingImage=false;
J.updateButtons();
J.showImageCanvasAndText();
dailybeast.analytics.trackPageview({pageNum:F+1});
J.refreshAds()
}};
GalleryView.prototype.renderSlide=function(C){if(this.viewAllView){this.showContent();
this.viewAllView.hide()
}if(!this.fullScreen&&this.shareTools){this.shareTools.show()
}if(this.slideIndex!==C){this.slideIndex=C;
var B=this,D=this.gallery.slides[C];
if(!this.fullScreen){this.setSlideHash()
}B.thumbnailView.highlight(this.slideIndex);
this.updateImage(D);
A(".img-canvas img").attr("alt",D.title)
}};
GalleryView.prototype.renderSlideUrl=function(C){var B=this.slideUrlMapping[C];
if(B===undefined&&this.isSameGallery(C)){B=0
}if(B!==undefined&&B!=this.slideIndex){this.renderSlide(B);
return true
}return false
};
GalleryView.prototype.setSlideHash=function(){if(window.location.hash!==""||this.slideIndex!==0){var B=this.gallery.slides[this.slideIndex].url,C=B.lastIndexOf("#");
if(C!==-1){window.location.hash=B.substr(C+1,B.length)
}}};
GalleryView.prototype.pushState=function(){var B=this.gallery.slides[this.slideIndex].url;
if(window.location.pathname!==B){history.pushState({galleryUrl:this.gallery.url,slideIndex:this.slideIndex},this.gallery.title,B)
}};
GalleryView.prototype.preloadSlideImage=function(E){if(0<=E&&E<this.slideCount){var B=this.gallery.slides[E],C=GalleryView.IMAGE_SIZES[this.imageSizeIndex],D=B.image;
if(D.sizes&&C in D.sizes){A.log("preloading "+D.sizes[C]);
new Image().src=D.sizes[C]
}}};
GalleryView.prototype.updateImage=function(G){var B=this,C=GalleryView.IMAGE_SIZES[this.imageSizeIndex],E=G.image;
if(E.sizes&&C in E.sizes){var F=E.sizes[C];
if(F!=A(".img-canvas img").attr("src")){this.imageSizeIndexLoaded=this.imageSizeIndex;
A.log("Updating the image to:"+F);
this.showLoading(G,200);
var D=new Image();
A(D).bind("load",function(){B.hideLoading();
B.finishRenderSlide(F)
}).bind("error",function(){B.hideLoading()
});
this.updatingImage=true;
D.src=F
}}this.preloadSlideImage(this.slideIndex+1);
this.preloadSlideImage(this.slideIndex-1)
};
GalleryView.prototype.updateImageSize=function(){var C=this.computeImageSizeIndex();
if(this.first||C>this.imageSizeIndexLoaded){this.first=false;
A.log("image size index increased - updating image now");
this.imageSizeIndex=C;
var B=this.gallery.slides[this.slideIndex];
this.updateImage(B)
}else{this.imageSizeIndex=C
}};
GalleryView.prototype.computeImageSizeIndex=function(){var B=A("#gallery .img-canvas").width();
return Math.min(Math.floor(B/GalleryView.IMAGE_SIZE_DIVISOR),GalleryView.IMAGE_SIZES.length-1)
};
GalleryView.prototype.showContent=function(){A(".content").show()
};
GalleryView.prototype.hideContent=function(){A(".content").hide()
};
GalleryView.prototype.initAds=function(){dailybeast.advertising.init("#gallery")
};
GalleryView.prototype.refreshAds=function(){dailybeast.advertising.refresh(A("#gallery .ad-aside"));
dailybeast.advertising.refresh(A("#gallery .ad-footer"));
dailybeast.advertising.refresh(A("#gallery .ad-fullscreen-tracker"))
};
GalleryView.prototype.getContentHeight=function(){return A(window).height()-A("#gallery .heading").outerHeight(true)
};
GalleryView.prototype.getSlideUrlMapping=function(B){var D={},C=0;
A.each(B.slides,function(){D[this.url]=C++
});
return D
};
GalleryView.prototype.showInterstitialAdIfAppropriate=function(){if(!this.fullScreen&&!this.shownInterstitial&&++this.clickCount>4){A.log("displaying interstitial ad");
A("#gallery .ad-interstitial").show();
dailybeast.advertising.refresh(A("#gallery .ad-interstitial"));
this.shownInterstitial=true
}};
GalleryView.prototype.moreGalleriesHide=function(B){this.moreGalleriesClose(B);
A(".more-gallery").hide()
};
GalleryView.prototype.moreGalleriesShow=function(){A(".more-gallery").show()
};
GalleryView.prototype.moreGalleriesOpen=function(C){var B=this;
A(".more-galleries").slideDown("slow",function(){C!==undefined&&C.call(B)
});
this.moreGalleriesView.onResize();
this.moreGalleries=true
};
GalleryView.prototype.moreGalleriesClose=function(C){var B=this;
A(".more-galleries").slideUp("slow",function(){C!==undefined&&C.call(B)
});
this.moreGalleries=false
};
GalleryView.prototype.enterFullScreen=function(){this.header.disableFlexibleTitle();
var B=document.getElementById("gallery");
if(B.requestFullscreen){B.requestFullscreen()
}else{if(B.mozRequestFullScreen){B.mozRequestFullScreen()
}else{if(B.webkitRequestFullScreen){B.webkitRequestFullScreen()
}else{this.onFullScreenChange(true)
}}}};
GalleryView.prototype.exitFullScreen=function(){if(document.exitFullscreen){document.exitFullscreen()
}else{if(document.mozCancelFullScreen){document.mozCancelFullScreen()
}else{if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()
}else{this.onFullScreenChange(false)
}}}};
GalleryView.prototype.onFullScreenChange=function(B){this.fullScreen=B;
if(B){A("body").addClass("fullscreen");
A("#gallery .text").css("height","auto");
this.shareTools.hide();
dailybeast.advertising.refresh(A("#gallery .ad-fullscreen"));
this.refreshAds();
this.addAside();
this.hideCaptions();
this.resize()
}else{A("body").removeClass("fullscreen");
this.shareTools.show();
this.removeAside(function(){this.refreshAds()
});
this.header.enableFlexibleTitle();
this.resize()
}};
GalleryView.prototype.detectFullScreen=function(){var B=this;
A(document).bind("fullscreenchange",function(){B.onFullScreenChange(document.fullscreen)
}).bind("mozfullscreenchange",function(){B.onFullScreenChange(document.mozFullScreen)
}).bind("webkitfullscreenchange",function(){B.onFullScreenChange(document.webkitIsFullScreen)
})
};
GalleryView.prototype.addAside=function(){A(".img-canvas-wrapper").append(A(".aside"))
};
GalleryView.prototype.removeAside=function(C){var B=this;
A(".aside").insertAfter(A(".main"));
A(".aside").show();
C!==undefined&&C.call(B)
};
GalleryView.prototype.showCaptions=function(){A(".aside").slideDown();
A(".captions-button").html("Hide Captions");
this.captions=false
};
GalleryView.prototype.hideCaptions=function(){A(".aside").slideUp();
A(".captions-button").html("Show Captions");
this.captions=true
};
GalleryView.prototype.close=function(){if(this.settings.onClose){A(window).unbind(".galleryView");
A(document).unbind(".galleryView");
this.settings.onClose()
}};
GalleryView.prototype.isSameGallery=function(B){return this.isSameUrl(B,this.gallery.url)
};
GalleryView.prototype.isSameUrl=function(C,B){C=C.match(/(https?:\/\/[^\/]*)?([^\.]*)/i)[2];
return B.indexOf(C)>=0
};
GalleryView.prototype.showImageCanvasAndText=function(){A("#gallery .img-canvas").fadeTo(0,0).css("visibility","visible").fadeTo(300,1);
A("#gallery .aside .copy").fadeTo(0,0).css("visibility","visible").fadeTo(300,1)
};
GalleryView.prototype.hideImageCanvasAndText=function(){A("#gallery .img-canvas").fadeTo(0,0).css("visibility","hidden").fadeTo(300,0);
A("#gallery .aside .copy").fadeTo(0,0).css("visibility","hidden").fadeTo(300,0)
}
})(jQuery);
var RelatedGalleriesView;
(function(A){RelatedGalleriesView=function(B,C,D){this.initializeConstants();
this.galleryView=B;
this.relatedGalleriesArray=C;
this.header=D;
this.container=null;
this.slider=null;
this.isExpanding=false;
this.isContracting=false;
this.position=0;
this.positionOffset=0;
this.previousButton=null;
this.visibleColumnCount=this.INITIAL_VISIBLE_COLUMN_COUNT;
this.totalGalleries=999999
};
RelatedGalleriesView.prototype.initializeConstants=function(){this.MIN_VISIBLE_COLUMN_COUNT=2;
this.MAX_VISIBLE_COLUMN_COUNT=8;
this.MIN_COLUMN_WIDTH=230;
this.MAX_COLUMN_WIDTH=340;
this.LOGICAL_WIDTH=2000;
this.INITIAL_VISIBLE_COLUMN_COUNT=3;
this.FLEX_DURATION=500;
this.COLUMN_COUNT=20;
this.TOTAL_BUTTON_COLUMN_WIDTH=156
};
RelatedGalleriesView.prototype.render=function(){var B=this;
renderTemplate("dailybeast_components_gallery2_related_relatedgalleries",baseContext.push(this.galleryView.data),function(C){A("#gallery .gallery-content").html(C);
B.attachEvents();
B.visibleColumnCount=B.INITIAL_VISIBLE_COLUMN_COUNT;
B.container=A(".related-galleries");
B.slider=A(".slider");
B.previousButton=A(".gallery-content .previous-button");
B.position=0;
B.positionOffset=0;
B.resize();
B.initializeAd();
B.refreshAd();
B.populateVisibleColumns();
B.header.dimTitle()
})
};
RelatedGalleriesView.prototype.populateVisibleColumns=function(){this.updateSliderButtons();
var B=this;
var C=this.position;
var E=C*2;
var F=this.position+this.visibleColumnCount;
var D=F*2;
if(E<this.totalGalleries){this.relatedGalleriesArray.get(E,D,function(G,H){B.totalGalleries=H;
B.populateColumns(C,F)
})
}else{this.populateColumns(C,F)
}};
RelatedGalleriesView.prototype.populateColumns=function(C,D){for(var B=C;
B<D;
B++){this.populate(B,0);
this.populate(B,1)
}};
RelatedGalleriesView.prototype.populate=function(F,G){var C=((F*2)+G)%this.totalGalleries;
var D=(G*20)+F-this.positionOffset;
var B=A(".related-gallery:eq("+D+")");
var E=this.relatedGalleriesArray.array[C];
if(E!==undefined){if(E.imageUrl!==undefined){B.find("img").attr("src",E.imageUrl)
}B.attr("href",E.url);
B.find(".title").html(E.title);
B.css("visibility","visible")
}else{B.css("visibility","hidden")
}};
RelatedGalleriesView.prototype.previous=function(){this.moveColumnsLeft(Math.min(this.visibleColumnCount,this.position));
this.position=Math.max(this.position-this.visibleColumnCount,0);
this.populateVisibleColumns();
this.slide(0)
};
RelatedGalleriesView.prototype.next=function(){this.position+=this.visibleColumnCount;
this.populateVisibleColumns();
var B=this;
this.slide(this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH,function(){B.moveColumnsRight()
})
};
RelatedGalleriesView.prototype.slide=function(B,C){if(B!=0){B*=-1
}this.slider.animate({"margin-left":B+"px"},C)
};
RelatedGalleriesView.prototype.updateSliderButtons=function(){if(this.position<=0){this.previousButton.css("visibility","hidden")
}else{this.previousButton.css("visibility","visible")
}};
RelatedGalleriesView.prototype.resize=function(){if(this.shouldExpand()&&!this.isExpanding&&!this.isContracting){this.isExpanding=true;
this.isContracting=false;
this.expand()
}else{if(this.shouldContract()&&!this.isContracting&&!this.isExpanding){this.isContracting=true;
this.isExpanding=false;
this.contract()
}}};
RelatedGalleriesView.prototype.shouldExpand=function(){return this.visibleColumnCount<this.MAX_VISIBLE_COLUMN_COUNT&&this.getColumnWidth()>this.MAX_COLUMN_WIDTH
};
RelatedGalleriesView.prototype.expand=function(){var B=this;
this.visibleColumnCount++;
this.populateVisibleColumns();
this.flex(function(){if(B.shouldExpand()){B.expand()
}else{B.isExpanding=false
}})
};
RelatedGalleriesView.prototype.shouldContract=function(){return this.visibleColumnCount>this.MIN_VISIBLE_COLUMN_COUNT&&this.getColumnWidth()<this.MIN_COLUMN_WIDTH
};
RelatedGalleriesView.prototype.contract=function(){var B=this;
this.visibleColumnCount--;
this.flex(function(){if(B.shouldContract()){B.contract()
}else{B.isContracting=false
}})
};
RelatedGalleriesView.prototype.flex=function(B){var C=(this.LOGICAL_WIDTH/this.visibleColumnCount)+"%";
this.slider.animate({width:C},this.FLEX_DURATION,B)
};
RelatedGalleriesView.prototype.getColumnWidth=function(){var B=(this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH)/this.visibleColumnCount;
return B
};
RelatedGalleriesView.prototype.initializeAd=function(){dailybeast.advertising.init(".related-galleries")
};
RelatedGalleriesView.prototype.refreshAd=function(){dailybeast.advertising.refresh(A(".related-galleries .ad-related"))
};
RelatedGalleriesView.prototype.attachEvents=function(){var B=this;
A(window).unbind(".relatedGalleries").bind("resize.relatedGalleries",function(){B.resize()
});
A(".related-gallery img").error(function(C){C.currentTarget.src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg"
});
A(".related-galleries .replay-button").click(function(){B.galleryView.reset();
dailybeast.analytics.trackGalleryClick("REPLAY");
return false
});
A(".related-galleries .previous-button").click(function(){B.previous();
return false
});
A(".related-galleries .next-button").click(function(){B.next();
return false
})
};
RelatedGalleriesView.prototype.moveColumnsRight=function(){var D=this.position-this.positionOffset;
var C=A(".related-gallery").slice(0,D);
this.resetCells(C);
var B=A(".related-gallery:eq("+(this.COLUMN_COUNT-1)+")");
C.insertAfter(B);
C=A(".related-gallery").slice(this.COLUMN_COUNT,D+this.COLUMN_COUNT);
this.resetCells(C);
B=A(".related-gallery:eq("+((this.COLUMN_COUNT*2)-1)+")");
C.insertAfter(B);
this.positionOffset=this.position;
this.slider.css("margin-left","0px")
};
RelatedGalleriesView.prototype.moveColumnsLeft=function(D){var C=A(".related-gallery").slice(this.COLUMN_COUNT-D,this.COLUMN_COUNT);
this.resetCells(C);
var B=A(".related-gallery:eq(0)");
C.insertBefore(B);
C=A(".related-gallery").slice((this.COLUMN_COUNT*2)-D,this.COLUMN_COUNT*2);
this.resetCells(C);
B=A(".related-gallery:eq("+this.COLUMN_COUNT+")");
C.insertBefore(B);
this.positionOffset-=D;
this.slider.css("margin-left",-this.getColumnWidth()*D)
};
RelatedGalleriesView.prototype.resetCells=function(B){B.find("img").attr("src","/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg");
B.find(".title").html("LOADING...")
}
})(jQuery);
var ViewAllView;
(function(A){ViewAllView=function(B,C){this.$el=B;
this.galleryView=C;
this.list=C.gallery.slides;
this.capacity=0;
this.minRows=2;
this.minColumns=4;
this.offset=0;
this.itemWidth=200;
this.itemHeight=200;
this.focus=0
};
ViewAllView.prototype.onResize=function(){var B=this.getMeasurements();
if(B.capacity!=this.capacity){this.capacity=B.capacity;
this.capacityChanged()
}this.resize(B)
};
ViewAllView.prototype.resize=function(B){A("#gallery .view-all-slides").height(B.rows*this.itemHeight);
A("#gallery .view-all-wrapper").width(B.columns*this.itemWidth)
};
ViewAllView.prototype.getMeasurements=function(){var E=A("#gallery .gallery-content").width()-2*A("#gallery .view-all-wrapper .next").width(),D=Math.max(Math.floor(this.galleryView.getContentHeight()/this.itemWidth),this.minRows),C=Math.max(Math.floor(E/this.itemHeight),this.minColumns),B=D*C;
return{rows:D,columns:C,capacity:B}
};
ViewAllView.prototype.capacityChanged=function(){this.fillCapacity();
this.renderPagination();
this.updateButtons()
};
ViewAllView.prototype.renderPagination=function(){var C=this,B=this.getPagination();
if(B.length>0){renderTemplate("dailybeast_components_gallery2_viewall_pagination",{pagination:B},function(D){A(".view-all-pagination").replaceWith(D)
})
}else{A(".view-all-pagination").empty()
}};
ViewAllView.prototype.renderPage=function(B){this.offset=B;
this.focus=B;
A(".view-all-slides").empty();
this.fillCapacity();
this.updateButtons()
};
ViewAllView.prototype.updateButtons=function(){var C=A(".view-all-wrapper .previous");
if(this.offset!=0){C.show()
}else{C.hide()
}var B=A(".view-all-wrapper .next");
if(this.offset+this.capacity<this.list.length){B.show()
}else{B.hide()
}A(".view-all-pagination li a[data-offset="+this.offset+"]").parent().addClass("active").siblings().removeClass("active")
};
ViewAllView.prototype.bindEvents=function(){var B=this;
A(".view-all").on("click",".view-all-pagination li a",function(){var D=A(this),C=D.parent(),E=D.data();
if(E&&E.offset!==undefined){B.renderPage(E.offset)
}dailybeast.analytics.trackGalleryClick("VIEWALLPAGINATION");
return false
});
A(".view-all .previous").click(function(){B.renderPage(Math.max(0,B.offset-B.capacity));
dailybeast.analytics.trackGalleryClick("VIEWALLPREVIOUS");
return false
});
A(".view-all .next").click(function(){B.renderPage(Math.min(B.offset+B.capacity,B.list.length-1));
dailybeast.analytics.trackGalleryClick("VIEWALLNEXT");
return false
});
A(window).unbind("resize.viewAll").bind("resize.viewAll",function(){B.onResize()
})
};
ViewAllView.prototype.fillCapacity=function(){var B=A("#gallery .view-all-slides li").length,D=this.list.length,E=this.getOffsetFromIndex(this.focus);
if(this.offset<E){A("#gallery .view-all-slides li").slice(0,E-this.offset).remove();
B-=E-this.offset
}else{if(this.offset>E){renderTemplate("dailybeast_components_gallery2_viewall_slides",{slides:this.list.slice(E,this.offset)},function(F){A(".view-all-slides").prepend(F)
});
B+=E+this.offset
}}this.offset=E;
if(B<this.capacity&&B<D){var C=this.list.slice(this.offset+B,Math.min(this.offset+this.capacity,D));
renderTemplate("dailybeast_components_gallery2_viewall_slides",{slides:C},function(F){A(".view-all-slides").append(F)
})
}};
ViewAllView.prototype.show=function(C){this.focus=C;
var B=this;
renderTemplate("dailybeast_components_gallery2_viewall_main",{slides:[]},function(E){A("#gallery .gallery-content").prepend(E);
var D=B.getMeasurements();
B.capacity=D.capacity;
B.offset=B.getOffsetFromIndex(C);
B.capacityChanged();
B.resize(D);
B.bindEvents()
})
};
ViewAllView.prototype.getPagination=function(){var D=[],B;
if(this.capacity!==0&&(B=Math.ceil(this.list.length/this.capacity))>1){for(var E=0;
E<B;
E++){var F=E*this.capacity,C=F+this.capacity;
D.push({active:F<=this.focus&&this.focus<C,offset:E*this.capacity,number:E+1})
}}return D
};
ViewAllView.prototype.getOffsetFromIndex=function(B){return Math.min(Math.floor(B/this.capacity)*this.capacity,this.list.length)
};
ViewAllView.prototype.hide=function(){A(".view-all").remove();
A(window).unbind("resize.viewAll")
}
})(jQuery);
function PagedDataProvider(A,B){this.array=[];
this.queue=[];
this.busy=false;
this.getUrl=A;
this.count=null;
this.page=0;
this.totalPages=null;
this.settings=$.extend({pageSize:20,eager:false,eagerness:0.2},B)
}PagedDataProvider.prototype={get:function(B,A,D){var C=this.getPageRange(B,A);
if(this.hasMore()&&this.page<C.end){this.queue.push({type:"fetch",pageRange:C});
if(D){this.queue.push({type:"read",startIndex:B,endIndex:A,callback:D})
}}else{this.read(B,A,D);
if(this.settings.eager){this.doEagerFetch(A)
}}if(!this.busy){this.doQueue()
}},indexToPage:function(A){return Math.ceil(A/this.settings.pageSize)
},getPageRange:function(D,B){var C=this.indexToPage(D),A=this.indexToPage(B);
return{start:Math.max(this.page,C),end:A}
},doEagerFetch:function(C){var B=this.page*this.settings.pageSize,A=B-Math.ceil(this.settings.pageSize*this.settings.eagerness);
if(C>=A&&this.hasMore()){this.queue.push({type:"fetch",pageRange:{start:this.page,end:this.page+1}})
}},hasMore:function(){return this.totalPages==null||this.page<this.totalPages
},fetch:function(D){this.busy=true;
var A=this,C=D.start*this.settings.pageSize,B=(D.end-D.start)*this.settings.pageSize;
$.getJSON(this.getUrl(C,B),function(G){var F=G.galleries;
A.count=G.totalCount;
A.totalPages=Math.ceil(A.count/A.settings.pageSize);
for(var E=0,H=F.length;
E<H;
E++){A.array[E+C]=F[E]
}A.page=A.indexToPage(C+F.length-1);
A.doQueue()
})
},read:function(B,A,C){if(C){C(this.array.slice(B,A),this.count)
}},queuedRead:function(B,A,C){this.read(B,A,C);
this.doQueue()
},doQueue:function(){var A=this.queue.shift();
if(A!==undefined){if(A.type=="fetch"){this.fetch(A.pageRange)
}else{if(A.type=="read"){this.queuedRead(A.startIndex,A.endIndex,A.callback)
}}}else{this.busy=false
}}};
var ThumbnailView;
(function(A){ThumbnailView=function(C,B,D){this.capacity=10;
this.duration=500;
this.busy=false;
this.introSlide=D;
this.list=C;
this.count=C.length;
this.index=B;
this.range=this.getRangeFromIndex(this.index);
this.offset=this.range.start;
this.bindEvents();
this.updateButtons();
this.thumbnailWidth=A(".slide-inner-wrapper li:last").outerWidth(true)
};
ThumbnailView.prototype.bindEvents=function(){var B=this;
A(".slide-thumbnail-wrapper .next").click(function(){B.next();
dailybeast.analytics.trackGalleryClick("SCRUBBERNEXT");
return false
});
A(".slide-thumbnail-wrapper .previous").click(function(){dailybeast.analytics.trackGalleryClick("SCRUBBERPREVIOUS");
B.previous();
return false
})
};
ThumbnailView.prototype.updateButtons=function(){var C=A(".slide-thumbnail-wrapper .previous");
if(this.offset>0){C.show()
}else{C.hide()
}var B=A(".slide-thumbnail-wrapper .next");
if(this.offset+this.capacity<this.count){B.show()
}else{B.hide()
}};
ThumbnailView.prototype.render=function(C){var B=this;
renderTemplate("dailybeast_components_gallery2_thumbnails_main",this.getTemplateContext(C.start,C.end),function(D){A(".slide-thumbnail-wrapper").replaceWith(D);
B.range=C;
B.offset=C.start;
B.busy=false;
B.bindEvents();
B.updateButtons()
})
};
ThumbnailView.prototype.next=function(){if(!this.busy){var B=this.getRangeFromOffset(this.offset+this.capacity);
this.showRange(B)
}};
ThumbnailView.prototype.previous=function(){if(!this.busy){var B=this.getRangeFromOffset(this.offset-this.capacity);
this.showRange(B)
}};
ThumbnailView.prototype.showRange=function(D){var C=this;
if(D.start!=this.offset){this.busy=true;
if(this.range.start>D.start||this.range.end<D.end){if(this.range.start-this.capacity<=D.start&&this.range.end+this.capacity>=D.end){var E=D.start;
var B=D.end;
if(this.range.start>D.start&&this.range.start<D.end){B=this.range.start
}if(this.range.end<D.end&&this.range.end>D.start){E=this.range.end
}renderTemplate("dailybeast_components_gallery2_thumbnails_thumbnails",this.getTemplateContext(E,B),function(F){var G=A(".slide-inner-wrapper");
if(B<=C.offset){G.css({left:"-="+(B-E)*C.thumbnailWidth});
G.prepend(F)
}else{G.append(F)
}C.range.start=Math.min(D.start,C.range.start);
C.range.end=Math.max(D.end,C.range.end);
C.scrollTo(D.start)
})
}else{this.render(D)
}}else{this.scrollTo(D.start)
}}else{this.highlightThumbnail()
}};
ThumbnailView.prototype.getTemplateContext=function(C,B){return baseContext.push({slides:this.list,thumbnailStart:C,thumbnailEnd:B,currentSlide:this.index,introSlide:this.introSlide})
};
ThumbnailView.prototype.scrollTo=function(C){var B=this;
A(".slide-inner-wrapper").animate({left:"+="+((this.offset-C)*this.thumbnailWidth)},this.duration,function(){B.offset=C;
B.highlightThumbnail();
B.updateButtons();
B.busy=false
})
};
ThumbnailView.prototype.highlightThumbnail=function(){A(".slide-inner-wrapper li").removeClass("active").eq(this.index-this.range.start).addClass("active")
};
ThumbnailView.prototype.highlight=function(B){if(!this.busy){this.index=B;
this.showRange(this.getRangeFromIndex(B))
}};
ThumbnailView.prototype.getRangeFromOffset=function(C){var D=Math.max(0,C),B=Math.min(D+this.capacity,this.count);
if(D+this.capacity>this.count){D=Math.max(0,this.count-this.capacity)
}return{start:D,end:B}
};
ThumbnailView.prototype.getRangeFromIndex=function(C){var B=Math.min(Math.floor(C/this.capacity+1)*this.capacity,this.count);
return{start:Math.max(0,B-this.capacity),end:B}
}
})(jQuery);
(function(A){function B(D,E,C){this.$parent=D;
this.$e=null;
this.provider=E;
this.capacity=0;
this.offset=0;
this.total=0;
this.eventNamespace="expandy"+new Date().getTime();
this.settings=A.extend({mainTemplate:"",itemsTemplate:"",itemWidth:0,itemHeight:0,minRows:1,minColumns:1,afterNext:null,afterPrevious:null,afterRender:null},C)
}B.prototype={onResize:function(){var C=this.getMeasurements();
if(C.capacity!=this.capacity){this.capacity=C.capacity;
this.capacityChanged()
}this.resize(C)
},resize:function(C){this.$e.find(".items").height(C.rows*this.settings.itemHeight).width(C.columns*this.settings.itemWidth)
},getMeasurements:function(){var F=this.$e.width()-2*this.$e.find(".next").width(),E=Math.max(Math.floor(this.$e.height()/this.settings.itemHeight),this.settings.minRows),D=Math.max(Math.floor(F/this.settings.itemWidth),this.settings.minColumns),C=E*D;
return{rows:E,columns:D,capacity:C}
},capacityChanged:function(){this.fillCapacity();
this.updateButtons()
},renderPage:function(C){this.offset=C;
this.$e.find(".items").empty();
this.fillCapacity();
this.updateButtons()
},updateButtons:function(){var D=this.$e.find(".previous");
if(this.offset!=0){D.show()
}else{D.hide()
}var C=this.$e.find(".next");
if(this.offset+this.capacity<this.total){C.show()
}else{C.hide()
}},bindEvents:function(){var C=this;
this.$e.find(".previous").click(function(){C.renderPage(C.offset-C.capacity);
if(C.settings.afterPrevious){C.settings.afterPrevious()
}return false
});
this.$e.find(".next").click(function(){C.renderPage(C.offset+C.capacity);
if(C.settings.afterNext){C.settings.afterNext()
}return false
});
A(window).bind("resize."+this.eventNamespace,function(){C.onResize()
})
},fillCapacity:function(){var D=this,E=this.$e.find(".items li").length;
if(E<this.capacity){var F=this.offset+E,C=F+this.capacity-E;
this.provider.get(F,C,function(H,G){D.total=G;
renderTemplate(D.settings.itemsTemplate,{items:H},function(I){D.$e.find(".items").append(I);
if(D.settings.afterRender){D.settings.afterRender()
}})
})
}},show:function(D){var C=this;
renderTemplate(this.settings.mainTemplate,{items:[]},function(F){C.$e=A(F).appendTo(C.$parent);
var E=C.getMeasurements();
C.capacity=E.capacity;
C.provider.get(0,C.capacity,function(H,G){C.total=G;
C.offset=C.getOffsetFromIndex(D);
C.capacityChanged();
C.resize(E)
});
C.bindEvents()
})
},getOffsetFromIndex:function(C){return Math.min(Math.floor(C/this.capacity)*this.capacity,this.total)
},hide:function(){this.$e.remove();
A(window).unbind("."+this.eventNamespace)
}};
window.Expandy=B
})(jQuery);
if(typeof domReady==="undefined"){$.warn("applying domReady hack");
domReady=function(A){A()
}
}var ShareTools;
(function(A){ShareTools=function(B){this.$container=B;
this.loadScripts()
};
ShareTools.prototype.refresh=function(){A.log("refreshing gallery share tools");
if(typeof FB!="undefined"){FB.XFBML.parse()
}if(typeof stButtons!="undefined"){stButtons.locateElements()
}if(typeof gapi!="undefined"){gapi.plusone.go()
}if(typeof twttr!="undefined"){twttr.widgets.load()
}};
ShareTools.prototype.loadScripts=function(){A.log("loading scripts for gallery share tools");
A.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
if(dailybeast.modes.isAuthorEnvironment){A.log("in author mode so manually loading sharetools scripts");
head.js("https://apis.google.com/js/plusone.js","http://connect.facebook.net/en_US/all.js",function(){FB.init({appId:"189930913679",status:true,cookie:true,xfbml:true})
})
}};
ShareTools.prototype.show=function(){this.$container.show()
};
ShareTools.prototype.hide=function(){this.$container.hide()
}
})(jQuery);
(function(B){function A(){this.titleElement=B("#gallery .title");
this.browserTitleStack=new Array();
this.flexibleTitle=new FlexibleText(B("#gallery .title-inner-container"),B("#gallery .title-inner-container .title"),106);
this.attachEvents();
this.flexibleTitle.reset()
}A.prototype={attachEvents:function(){var C=this;
B(window).unbind(".galleryHeader");
B(window).bind("resize.galleryHeader",function(){C.flexibleTitle.update()
});
B(window).bind("load.galleryHeader",function(){C.flexibleTitle.reset()
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
(function(B){function A(F,D,E){this.$container=F;
this.$text=D;
this.maxHeight=E;
var C="tracer"+new Date().getTime();
this.$text.after("&nbsp;<span class='"+C+"'>");
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
return this.fontSize<this.maxFontSize&&(this.lineCount<this.maxLineCount-1||(this.lineCount<this.maxLineCount&&this.$tracer.position().left<this.$container.width()/2))
},shouldShrinkFont:function(){return this.getLineCount()>this.maxLineCount
},updateMaxLineCount:function(C){this.maxLineCount+=C;
this.lineHeight=Math.floor(this.maxHeight/this.maxLineCount);
this.fontSize=Math.floor(this.lineHeight*this.fontSizeRatio);
var D=(this.implicitBottomMargin-this.lineHeight+this.fontSize)*2;
this.$text.css({"font-size":this.fontSize+"px","line-height":this.lineHeight+"px"});
this.$container.css({"margin-bottom":D+"px"})
},getLineCount:function(){return Math.ceil(this.$container.height()/this.lineHeight)
},enable:function(){this.lineHeight=parseInt(this.$text.css("line-height"));
this.maxLineCount=Math.floor(this.maxHeight/this.lineHeight);
this.fontSize=parseInt(this.$text.css("font-size"));
this.maxFontSize=this.fontSize;
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
(function(Al,Ak){function AL(B,A){this._d=B,this._isUTC=!!A
}function AK(A){return A<0?Math.ceil(A):Math.floor(A)
}function AJ(J){var I=this._data={},H=J.years||J.y||0,G=J.months||J.M||0,F=J.weeks||J.w||0,E=J.days||J.d||0,D=J.hours||J.h||0,C=J.minutes||J.m||0,B=J.seconds||J.s||0,A=J.milliseconds||J.ms||0;
this._milliseconds=A+B*1000+C*60000+D*3600000,this._days=E+F*7,this._months=G+H*12,I.milliseconds=A%1000,B+=AK(A/1000),I.seconds=B%60,C+=AK(B/60),I.minutes=C%60,D+=AK(C/60),I.hours=D%24,E+=AK(D/24),E+=F*7,I.days=E%30,G+=AK(E/30),I.months=G%12,H+=AK(G/12),I.years=H
}function AI(B,A){var C=B+"";
while(C.length<A){C="0"+C
}return C
}function AH(B,A,G){var F=A._milliseconds,E=A._days,D=A._months,C;
F&&B._d.setTime(+B+F*G),E&&B.date(B.date()+E*G),D&&(C=B.date(),B.date(1).month(B.month()+D*G).date(Math.min(C,B.daysInMonth())))
}function AG(A){return Object.prototype.toString.call(A)==="[object Array]"
}function AF(A){return new Al(A[0],A[1]||0,A[2]||1,A[3]||0,A[4]||0,A[5]||0,A[6]||0)
}function AE(N,M){function A(Q){var O,P;
switch(Q){case"M":return L+1;
case"Mo":return L+1+C(L+1);
case"MM":return AI(L+1,2);
case"MMM":return Aj.monthsShort[L];
case"MMMM":return Aj.months[L];
case"D":return K;
case"Do":return K+C(K);
case"DD":return AI(K,2);
case"DDD":return O=new Al(J,L,K),P=new Al(J,0,1),~~((O-P)/86400000+1.5);
case"DDDo":return O=A("DDD"),O+C(O);
case"DDDD":return AI(A("DDD"),3);
case"d":return I;
case"do":return I+C(I);
case"ddd":return Aj.weekdaysShort[I];
case"dddd":return Aj.weekdays[I];
case"w":return O=new Al(J,L,K-I+5),P=new Al(O.getFullYear(),0,4),~~((O-P)/86400000/7+1.5);
case"wo":return O=A("w"),O+C(O);
case"ww":return AI(A("w"),2);
case"YY":return AI(J%100,2);
case"YYYY":return J;
case"a":return B?B(H,G,!1):H>11?"pm":"am";
case"A":return B?B(H,G,!0):H>11?"PM":"AM";
case"H":return H;
case"HH":return AI(H,2);
case"h":return H%12||12;
case"hh":return AI(H%12||12,2);
case"m":return G;
case"mm":return AI(G,2);
case"s":return F;
case"ss":return AI(F,2);
case"S":return ~~(E/100);
case"SS":return AI(~~(E/10),2);
case"SSS":return AI(E,3);
case"Z":return(D<0?"-":"+")+AI(~~(Math.abs(D)/60),2)+":"+AI(~~(Math.abs(D)%60),2);
case"ZZ":return(D<0?"-":"+")+AI(~~(10*Math.abs(D)/6),4);
case"L":case"LL":case"LLL":case"LLLL":case"LT":return AE(N,Aj.longDateFormat[Q]);
default:return Q.replace(/(^\[)|(\\)|\]$/g,"")
}}var L=N.month(),K=N.date(),J=N.year(),I=N.day(),H=N.hours(),G=N.minutes(),F=N.seconds(),E=N.milliseconds(),D=-N.zone(),C=Aj.ordinal,B=Aj.meridiem;
return M.replace(Aa,A)
}function AD(A){switch(A){case"DDDD":return AW;
case"YYYY":return AV;
case"S":case"SS":case"SSS":case"DDD":return AX;
case"MMM":case"MMMM":case"ddd":case"dddd":case"a":case"A":return AU;
case"Z":case"ZZ":return AT;
case"T":return AS;
case"MM":case"DD":case"dd":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return AY;
default:return new RegExp(A.replace("\\",""))
}}function AC(B,A,E,D){var C;
switch(B){case"M":case"MM":E[1]=A==null?0:~~A-1;
break;
case"MMM":case"MMMM":for(C=0;
C<12;
C++){if(Aj.monthsParse[C].test(A)){E[1]=C;
break
}}break;
case"D":case"DD":case"DDD":case"DDDD":E[2]=~~A;
break;
case"YY":A=~~A,E[0]=A+(A>70?1900:2000);
break;
case"YYYY":E[0]=~~Math.abs(A);
break;
case"a":case"A":D.isPm=(A+"").toLowerCase()==="pm";
break;
case"H":case"HH":case"h":case"hh":E[3]=~~A;
break;
case"m":case"mm":E[4]=~~A;
break;
case"s":case"ss":E[5]=~~A;
break;
case"S":case"SS":case"SSS":E[6]=~~(("0."+A)*1000);
break;
case"Z":case"ZZ":D.isUTC=!0,C=(A+"").match(AO),C&&C[1]&&(D.tzh=~~C[1]),C&&C[2]&&(D.tzm=~~C[2]),C&&C[0]==="+"&&(D.tzh=-D.tzh,D.tzm=-D.tzm)
}}function AB(A,G){var F=[0,0,1,0,0,0,0],E={tzh:0,tzm:0},D=G.match(Aa),C,B;
for(C=0;
C<D.length;
C++){B=(AD(D[C]).exec(A)||[])[0],A=A.replace(AD(D[C]),""),AC(D[C],B,F,E)
}return E.isPm&&F[3]<12&&(F[3]+=12),E.isPm===!1&&F[3]===12&&(F[3]=0),F[3]+=E.tzh,F[4]+=E.tzm,E.isUTC?new Al(Al.UTC.apply({},F)):AF(F)
}function AA(B,A){var F=Math.min(B.length,A.length),E=Math.abs(B.length-A.length),D=0,C;
for(C=0;
C<F;
C++){~~B[C]!==~~A[C]&&D++
}return D+E
}function Z(I,H){var G,F=I.match(AZ)||[],E,D=99,C,B,A;
for(C=0;
C<H.length;
C++){B=AB(I,H[C]),E=AE(new AL(B),H[C]).match(AZ)||[],A=AA(F,E),A<D&&(D=A,G=B)
}return G
}function Y(A){var C="YYYY-MM-DDT",B;
if(AR.exec(A)){for(B=0;
B<4;
B++){if(AP[B][1].exec(A)){C+=AP[B][0];
break
}}return AT.exec(A)?AB(A,C+" Z"):AB(A,C)
}return new Al(A)
}function X(B,A,E,D){var C=Aj.relativeTime[B];
return typeof C=="function"?C(A||1,!!E,B,D):C.replace(/%d/i,A||1)
}function W(B,A){var H=Ah(Math.abs(B)/1000),G=Ah(H/60),F=Ah(G/60),E=Ah(F/24),D=Ah(E/365),C=H<45&&["s",H]||G===1&&["m"]||G<45&&["mm",G]||F===1&&["h"]||F<22&&["hh",F]||E===1&&["d"]||E<=25&&["dd",E]||E<=45&&["M"]||E<345&&["MM",Ah(E/30)]||D===1&&["y"]||["yy",D];
return C[2]=A,C[3]=B>0,X.apply({},C)
}function V(B,A){Aj.fn[B]=function(C){var D=this._isUTC?"UTC":"";
return C!=null?(this._d["set"+D+A](C),this):this._d["get"+D+A]()
}
}function U(A){Aj.duration.fn[A]=function(){return this._data[A]
}
}function T(B,A){Aj.duration.fn["as"+B]=function(){return +this/A
}
}var Aj,Ai="1.6.2",Ah=Math.round,Ag,Af={},Ae="en",Ad=typeof module!="undefined",Ac="months|monthsShort|monthsParse|weekdays|weekdaysShort|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),Ab=/^\/?Date\((\-?\d+)/i,Aa=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|LT|LL?L?L?)/g,AZ=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,AY=/\d\d?/,AX=/\d{1,3}/,AW=/\d{3}/,AV=/\d{4}/,AU=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,AT=/Z|[\+\-]\d\d:?\d\d/i,AS=/T/i,AR=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,AQ="YYYY-MM-DDTHH:mm:ssZ",AP=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],AO=/([\+\-]|\d\d)/gi,AN="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),AM={Milliseconds:1,Seconds:1000,Minutes:60000,Hours:3600000,Days:86400000,Months:2592000000,Years:31536000000};
Aj=function(E,D){if(E===null||E===""){return null
}var C,B,A;
return Aj.isMoment(E)?(C=new Al(+E._d),A=E._isUTC):D?AG(D)?C=Z(E,D):C=AB(E,D):(B=Ab.exec(E),C=E===Ak?new Al:B?new Al(+B[1]):E instanceof Al?E:AG(E)?AF(E):typeof E=="string"?Y(E):new Al(E)),new AL(C,A)
},Aj.utc=function(A,B){return AG(A)?new AL(new Al(Al.UTC.apply({},A)),!0):B&&A?Aj(A+" +0000",B+" Z").utc():Aj(A&&!AT.exec(A)?A+"+0000":A).utc()
},Aj.unix=function(A){return Aj(A*1000)
},Aj.duration=function(B,A){var E=Aj.isDuration(B),D=typeof B=="number",C=E?B._data:D?{}:B;
return D&&(A?C[A]=B:C.milliseconds=B),new AJ(C)
},Aj.humanizeDuration=function(B,A,C){return Aj.duration(B,A===!0?null:A).humanize(A===!0?!0:C)
},Aj.version=Ai,Aj.defaultFormat=AQ,Aj.lang=function(B,A){var E,D,C=[];
if(!B){return Ae
}if(A){for(E=0;
E<12;
E++){C[E]=new RegExp("^"+A.months[E]+"|^"+A.monthsShort[E].replace(".",""),"i")
}A.monthsParse=A.monthsParse||C,Af[B]=A
}if(Af[B]){for(E=0;
E<Ac.length;
E++){Aj[Ac[E]]=Af[B][Ac[E]]||Af.en[Ac[E]]
}Ae=B
}else{Ad&&(D=require("./lang/"+B),Aj.lang(B,D))
}},Aj.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:!1,calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(B){var A=B%10;
return ~~(B%100/10)===1?"th":A===1?"st":A===2?"nd":A===3?"rd":"th"
}}),Aj.isMoment=function(A){return A instanceof AL
},Aj.isDuration=function(A){return A instanceof AJ
},Aj.fn=AL.prototype={clone:function(){return Aj(this)
},valueOf:function(){return +this._d
},unix:function(){return Math.floor(+this._d/1000)
},toString:function(){return this._d.toString()
},toDate:function(){return this._d
},utc:function(){return this._isUTC=!0,this
},local:function(){return this._isUTC=!1,this
},format:function(A){return AE(this,A?A:Aj.defaultFormat)
},add:function(B,A){var C=A?Aj.duration(+A,B):Aj.duration(B);
return AH(this,C,1),this
},subtract:function(B,A){var C=A?Aj.duration(+A,B):Aj.duration(B);
return AH(this,C,-1),this
},diff:function(J,I,H){var G=this._isUTC?Aj(J).utc():Aj(J).local(),F=(this.zone()-G.zone())*60000,E=this._d-G._d-F,D=this.year()-G.year(),C=this.month()-G.month(),B=this.date()-G.date(),A;
return I==="months"?A=D*12+C+B/30:I==="years"?A=D+(C+B/30)/12:A=I==="seconds"?E/1000:I==="minutes"?E/60000:I==="hours"?E/3600000:I==="days"?E/86400000:I==="weeks"?E/604800000:E,H?A:Ah(A)
},from:function(B,A){return Aj.duration(this.diff(B)).humanize(!A)
},fromNow:function(A){return this.from(Aj(),A)
},calendar:function(){var B=this.diff(Aj().sod(),"days",!0),A=Aj.calendar,D=A.sameElse,C=B<-6?D:B<-1?A.lastWeek:B<0?A.lastDay:B<1?A.sameDay:B<2?A.nextDay:B<7?A.nextWeek:D;
return this.format(typeof C=="function"?C.apply(this):C)
},isLeapYear:function(){var A=this.year();
return A%4===0&&A%100!==0||A%400===0
},isDST:function(){return this.zone()<Aj([this.year()]).zone()||this.zone()<Aj([this.year(),5]).zone()
},day:function(B){var A=this._isUTC?this._d.getUTCDay():this._d.getDay();
return B==null?A:this.add({d:B-A})
},sod:function(){return Aj(this).hours(0).minutes(0).seconds(0).milliseconds(0)
},eod:function(){return this.sod().add({d:1,ms:-1})
},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()
},daysInMonth:function(){return Aj(this).month(this.month()+1).date(0).date()
}};
for(Ag=0;
Ag<AN.length;
Ag++){V(AN[Ag].toLowerCase(),AN[Ag])
}V("year","FullYear"),Aj.duration.fn=AJ.prototype={weeks:function(){return AK(this.days()/7)
},valueOf:function(){return this._milliseconds+this._days*86400000+this._months*2592000000
},humanize:function(B){var A=+this,D=Aj.relativeTime,C=W(A,!B);
return B&&(C=(A<=0?D.past:D.future).replace(/%s/i,C)),C
}};
for(Ag in AM){AM.hasOwnProperty(Ag)&&(T(Ag,AM[Ag]),U(Ag.toLowerCase()))
}T("Weeks",604800000),Ad&&(module.exports=Aj),typeof window!="undefined"&&typeof ender=="undefined"&&(window.moment=Aj),typeof define=="function"&&define.amd&&define("moment",[],function(){return Aj
})
})(Date);
var moment=window.moment;
var baseContext=dust.makeBase({first:function(B,C,A,D){if(D&&D.of&&D.of.length>0){return B.render(A.block,C.push(D.of[0],0,D.of.length))
}},rest:function(B,C,A,D){return D.of&&D.of.length>1?D.of.slice(1):undefined
},length:function(A,B){return B.stack.of
},comma:function(A,B){return B.stack.index<B.stack.of-1?", ":""
},formatDate:function(B,C,A,D){if(D.date&&D.format){return B.write(moment(D.date).format(D.format))
}},slice:function(C,E,B,F){var G=Math.max(0,F.start),A=Math.min(F.of.length,F.end);
for(var D=G;
D<A;
D++){C.render(B.block,E.push(F.of[D],D,F.of.length))
}},nth:function(B,C,A,E){if(E){var D=E.of,F=E.n;
if(D&&D.length>F){return B.render(A.block,C.push(D[F],F,D.length))
}}},repeat:function(B,C,A,D){for(i=0;
i<D.count;
i++){B.render(A.block,C)
}},atIndex:function(B,C,A,D){if(D.index==C.stack.index){return B.render(A.block,C)
}},equals:function(B,C,A,D){if(D.prop===D.value){return B.render(A.block,C)
}},isIntro:function(B,C,A){var D=C.get("introSlide")&&C.stack.index==0;
if(D){return B.render(A.block,C)
}else{return B.render(A["else"],C)
}},slideNumber:function(A,B){var D=B.get("introSlide"),C=D&&B.stack.index==0;
return C?"":B.stack.index+(D?0:1)
},listicleNumber:function(C,D){var A=D.get("listicleType"),F=D.get("introSlide"),E=F&&D.stack.index==0,B="";
if(!E){if(A=="DESCENDING"){B=D.stack.of-D.stack.index
}else{if(A=="ASCENDING"){B=D.stack.index+(F?0:1)
}}}return B
},totalSlides:function(A,B){return B.get("slideCount")-(B.get("introSlide")?1:0)
}});
(function(){dust.register("dailybeast_components_ads_advertising_advertisement",E);
function E(H,G){return H.exists(G.get("badgeEnabled"),G,{block:D},null).write('<div class="ad ').reference(G.get("name"),G,"h").write(" ").reference(G.get("position"),G,"h").write('" data-advertising="{siteID: \'').reference(G.get("siteId"),G,"h").write("', zone: '").reference(G.get("zone"),G,"h").write("', template: '").reference(G.get("template"),G,"h").write("', size: '").reference(G.get("size"),G,"h").write("', tile: '").reference(G.get("tile"),G,"h").write("', iFrame: ").exists(G.get("iFrame"),G,{"else":C,block:B},null).write(", disable: '").exists(G.get("disabled"),G,{"else":A,block:F},null).write("', params: '").reference(G.get("parameters"),G,"h").write("'}\"></div>")
}function D(H,G){return H.write('<div class="ad ad-badge ').reference(G.get("position"),G,"h").write('">- Advertisement -</div>')
}function C(H,G){return H.write("false")
}function B(H,G){return H.write("true")
}function A(H,G){return H.write("false")
}function F(H,G){return H.write("true")
}return E
})();
(function(){dust.register("dailybeast_components_gallery2_thumbnails_thumbnails",E);
function E(G,F){return G.section(F.get("slice"),F,{block:D},{of:F.get("slides"),start:F.get("thumbnailStart"),end:F.get("thumbnailEnd")})
}function D(G,F){return G.write("<li ").section(F.get("atIndex"),F,{block:C},{index:F.get("currentSlide")}).write('><a href="').reference(F.get("url"),F,"h").write('"><img alt="" src="').reference(F.getPath(false,["thumbnail","sizes","thumbnail"]),F,"h").write('"/>').section(F.get("isIntro"),F,{"else":B,block:A},null).write("</a></li>")
}function C(G,F){return G.write('class="active"')
}function B(G,F){return G.write('<div class="number">').reference(F.get("slideNumber"),F,"h").write("</div>")
}function A(G,F){return G
}return E
})();
(function(){dust.register("dailybeast_components_gallery2_thumbnails_main",A);
function A(C,B){return C.write('<div class="slide-thumbnail-wrapper"><div class="slide-thumbnail"><a class="previous small" href="#"><i></i></a><a class="next small" href="#"><i></i></a><ul class="slide-inner-wrapper clearfix">').partial("dailybeast_components_gallery2_thumbnails_thumbnails",B,null).write("</ul></div></div>")
}return A
})();
(function(){dust.register("dailybeast_components_gallery2_related_relatedgallery",A);
function A(C,B){return C.write('<a class="related-gallery" href=""><img src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg" class="image" /><div class="title-container"><div class="title">LOADING...</div></div></a>')
}return A
})();
(function(){dust.register("dailybeast_components_gallery2_related_relatedgalleries",C);
function C(E,D){return E.write('<div class="related-galleries"><div class="replay-button-wrapper"><span class="replay-button"><span class="replay-button-content">REPLAY GALLERY</span></span></div><div class="header">').reference(D.get("relatedGalleriesTitle"),D,"h").write('</div><div class="outer-row"><div class="button-column"><div class="previous-button"></div></div><div class="outer-cell"><div class="slider"><div class="inner-row">').section(D.get("repeat"),D,{block:B},{count:"20"}).write('</div><div class="inner-row">').section(D.get("repeat"),D,{block:A},{count:"20"}).write('</div></div></div><div class="button-column"><div class="next-button"></div></div></div>').partial("dailybeast_components_ads_advertising_advertisement",D.rebase(D.get("relatedAd")),null).write("</div>")
}function B(E,D){return E.partial("dailybeast_components_gallery2_related_relatedgallery",D,null)
}function A(E,D){return E.partial("dailybeast_components_gallery2_related_relatedgallery",D,null)
}return C
})();
(function(){dust.register("dailybeast_components_gallery2_viewall_pagination",C);
function C(E,D){return E.write('<ul class="view-all-pagination">').section(D.get("pagination"),D,{block:B},null).write("</ul>")
}function B(E,D){return E.write('<li class="').exists(D.get("active"),D,{block:A},null).write('"><a href="#" data-offset="').reference(D.get("offset"),D,"h").write('">').reference(D.get("number"),D,"h").write("</a></li>")
}function A(E,D){return E.write("active")
}return C
})();
(function(){dust.register("dailybeast_components_gallery2_viewall_main",A);
function A(C,B){return C.write('<div class="view-all"><div class="view-all-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><ul class="view-all-slides clearfix">').partial("dailybeast_components_gallery2_viewall_slides",B,null).write("</ul></div>").partial("dailybeast_components_gallery2_viewall_pagination",B,null).write("</div>")
}return A
})();
(function(){dust.register("dailybeast_components_gallery2_viewall_slides",B);
function B(D,C){return D.section(C.get("slides"),C,{block:A},null)
}function A(D,C){return D.write('<li><a href="').reference(C.get("url"),C,"h").write('"><img src="').reference(C.getPath(false,["image","sizes","viewAll"]),C,"h").write('"/></a></li>')
}return B
})();
(function(){dust.register("dailybeast_components_gallery2_moregalleries_galleries",D);
function D(F,E){return F.section(E.get("items"),E,{block:C},null)
}function C(F,E){return F.write('<li><a href="').reference(E.get("url"),E,"h").write('"><span><img alt="').reference(E.get("title"),E,"h").write('" src="').exists(E.get("imageUrl"),E,{"else":B,block:A},null).write('"/></span><h3 class="heading-style-a">').reference(E.get("title"),E,"h").write("</h3></a></li>")
}function B(F,E){return F.write("/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg")
}function A(F,E){return F.reference(E.get("imageUrl"),E,"h")
}return D
})();
(function(){dust.register("dailybeast_components_gallery2_moregalleries_main",A);
function A(C,B){return C.write('<div class="more-galleries"><div class="more-galleries-arrows"><a class="previous large" href="#"><i></i></a><a class="next large" href="#"><i></i></a></div><ul class="items clearfix">').partial("dailybeast_components_gallery2_moregalleries_galleries",B,null).write("</ul></div>")
}return A
})();
(function(){dust.register("dailybeast_components_gallery2_gallery",C);
function C(E,D){return E.section(D.get("gallery"),D,{block:B},null)
}function B(E,D){return E.write('<div id="gallery"><div class="container-16">').partial("dailybeast_components_gallery2_header",D,null).write('<div class="gallery-content">').partial("dailybeast_components_gallery2_sharetools",D,null).section(D.get("nth"),D,{block:A},{of:D.get("slides"),n:D.get("currentSlide")}).partial("dailybeast_components_ads_advertising_advertisement",D.rebase(D.get("interstitialAd")),null).write("</div></div></div>")
}function A(E,D){return E.partial("dailybeast_components_gallery2_slide",D,null)
}return C
})();
(function(){dust.register("dailybeast_components_gallery2_aside",E);
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
(function(){dust.register("dailybeast_components_gallery2_header",A);
function A(C,B){return C.write('<div class="heading size1of1"><a class="btn-close-x" href="').reference(B.get("homeUrl"),B,"h").write('"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a><div class="captions-exit"><a class="captions-button" href="#">show captions</a><a class="exit-fullscreen-button" href="#">exit fullscreen</a></div><div class="logo"><a class="primary-logo" href="').reference(B.get("homeUrl"),B,"h").write('" role="navigation" data-track="{\'title\':\'dailybeastlogo\'}"><img src="/etc/clientlibs/dailybeast/img/logo/daily-beast.png" width="116" height="139" alt="The Daily Beast"/></a></div><div class="title-outer-container"><div class="red-line"></div><div class="title-inner-container"><h1 class="title">').reference(B.get("title"),B,"h").write('</h1></div><a href="#" class="more-gallery heading-style-r"><h4>More Galleries</h4></a></div></div>')
}return A
})();
(function(){dust.register("dailybeast_components_gallery2_sharetools",A);
function A(C,B){return C.write('<ul class="sharetools"><li><div st_title="').reference(B.get("title"),B,"h").write('" st_url="').reference(B.get("url"),B,"h").write('" st_image="').reference(B.getPath(false,["image","sizes","medium"]),B,"h").write('" st_summary="').reference(B.get("description"),B,"h").write('" class="st_email_custom">EMAIL</div></li><li class="facebook"><fb:like href="').reference(B.get("url"),B,"h").write('" send="false" layout="box_count" width="45" show_faces="true"></fb:like></li><li class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="').reference(B.get("galleryShortUrl"),B,"h").write('" data-text="').reference(B.get("title"),B,"h").write('"data-via="thedailybeast" data-count="vertical" data-related="newsweek:Newsweek"></a></li><li class="gplusone"><div class="g-plusone" data-href="').reference(B.get("url"),B,"h").write('" data-size="tall" data-callback="plusClick"></div></li></ul>')
}return A
})();
(function(){dust.register("dailybeast_components_gallery2_info",E);
function E(G,F){return G.write('<span class="info">').section(F.get("isIntro"),F,{"else":D,block:B},null).write("</span>")
}function D(G,F){return G.write('<span class="slide-number">').reference(F.get("slideNumber"),F,"h").write(" of ").reference(F.get("totalSlides"),F,"h").write("</span>\n").exists(F.get("credit"),F,{block:C},null)
}function C(G,F){return G.write('<span class="photo-credit" property="dc:creator">').reference(F.get("credit"),F,"h").write("</span>")
}function B(G,F){return G.exists(F.get("credit"),F,{block:A},null)
}function A(G,F){return G.write('<span class="photo-credit no-border" property="dc:creator">').reference(F.get("credit"),F,"h").write("</span>")
}return E
})();
(function(){dust.register("dailybeast_components_gallery2_slide",A);
function A(C,B){return C.write('<div class="content size1of1 clearfix"><div class="main"><div class="img-canvas-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><div class="img-canvas"><img alt="').reference(B.get("title"),B,"h").write('" src="').reference(B.getPath(false,["image","sizes","large"]),B,"h").write('"></div></div><div class="info-thbnail-wrapper"><div class="img-info-wrapper"><div class="img-info">').partial("dailybeast_components_gallery2_info",B,null).write('<div class="fullscreen-view-all"><a class="enter-fullscreen-button" href="#">enter fullscreen</a><a class="view-all-button" href="#">view all <span class="slide-count">(').reference(B.get("totalSlides"),B,"h").write(")</span></a>\n</div></div></div>").partial("dailybeast_components_gallery2_thumbnails_main",B,null).write("</div>").partial("dailybeast_components_ads_advertising_advertisement",B.rebase(B.get("footerAd")),null).partial("dailybeast_components_ads_advertising_advertisement",B.rebase(B.get("fullscreenAd")),null).partial("dailybeast_components_ads_advertising_advertisement",B.rebase(B.get("fullscreenAdTracker")),null).write('</div><div class="aside">').partial("dailybeast_components_gallery2_aside",B,null).partial("dailybeast_components_ads_advertising_advertisement",B.rebase(B.get("asideAd")),null).write("</div></div>")
}return A
})();
var dailybeast=dailybeast||{};
var _gaq=_gaq||[];
var _qevents=_qevents||[];
dailybeast.analytics=function(){var L=["google","sitecatalyst","nielsen","comscore","quantcast"];
var J={};
function I(Q,P){Q=Q.toLocaleLowerCase();
if(_.indexOf(L,Q)>-1){J[Q]=P
}}function F(S,R){if(_.hasValue(J[S])&&_.hasValue(J[S].rules)){var Q=J[S].rules;
for(var P in R){if(_.hasValue(Q[P])){Q[P](R)
}}}return R
}function K(R){if(!_.hasValue(R)){R={}
}for(var Q in J){var P=_.deepClone(R);
switch(Q){case"google":H(P);
break;
case"sitecatalyst":M(P);
break;
case"nielsen":A(P);
break;
case"comscore":N(P);
break;
case"quantcast":D(P);
break
}}}function O(R){if(_.hasValue(R.title)){for(var Q in J){var P=_.deepClone(R);
switch(Q){case"google":G(P);
break;
case"sitecatalyst":C(P);
break;
case"nielsen":break;
case"comscore":break;
case"quantcast":break
}}}}function H(P){P.url=(_.hasValue(P.url))?P.url:window.location.pathname;
F("google",P);
_gaq.push(["_trackPageview",P.url])
}function M(U){var S=s_gi(s_account);
S.events="event1";
var P=_.keys(S);
$.grep(P,function(W,V){if(_.startsWith(W,"eVar")){S[W]=""
}});
F("sitecatalyst",U);
var T=J.sitecatalyst;
if(_.hasValue(T.mappings)){for(var R in U){var Q=T.mappings[R];
S[Q]=U[R]
}}S.t()
}function A(Q){F("nielsen",Q);
var P=J.nielsen;
(function(){var R=new Image(1,1);
R.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci="+P.providerID+"&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=usergen&rnd=",(new Date()).getTime()].join("")
})()
}function N(Q){F("comscore",Q);
var P=J.comscore;
if(typeof COMSCORE=="undefined"){_.logMessage("comScore tracking was not executed because the COMSCORE object was not initialized properly!");
return 
}COMSCORE.beacon({c1:P.c1,c2:P.c2,c3:"",c4:"",c5:"",c6:"",c15:""})
}function D(Q){F("quantcast",Q);
var P=J.quantcast;
_qevents.push({qacct:"p-bcLY1r4ynM-2-"})
}function C(V){var P="";
if(V.section||V.title){P="tdb";
P+=" - "+dailybeast.metatags.getTemplate();
if(_.hasValue(V.section)){P+=" - "+V.section
}if(_.hasValue(V.title)){P+=" - "+V.title
}if(_.hasValue(V.index)){P+=" - item "+V.index
}}var S=s_gi(s_account);
var U=[];
for(var R in V.eVars){S[R]=V.eVars[R];
U.push(R)
}S.linkTrackVars=U.join(",");
var Q=V.events.join(",");
S.linkTrackVars+=(S.linkTrackVars)?","+Q:Q;
S.linkTrackVars+=",events";
S.linkTrackEvents=Q;
S.events=Q;
if(V.delayLoad){var T=V.link||(document.createElement("a"));
S.tl(T,"o",P)
}else{S.tl(true,"o",P)
}}function G(Q){var P="";
if(_.hasValue(Q.section)){P+=Q.section
}if(_.hasValue(Q.title)){P+=((P.length>0)?" - ":"")+Q.title
}if(_.hasValue(Q.index)){P+=" - item "+Q.index
}_gaq.push(["_trackEvent","Module Click",dailybeast.metatags.getTemplate(),P])
}function E(P,S){var R=s_gi(s_account);
R.linkTrackVars="eVar50,eVar51,events";
R.linkTrackEvents="event32";
R.eVar50=P;
var Q=false;
if(S){Q=true
}R.eVar51=""+Q;
R.events="event32";
R.tl(this,"o","Vertical Gallery Click Tracking")
}function B(R,P){var Q=s_gi(s_account);
Q.linkTrackVars="eVar37,eVar38,events";
Q.linkTrackEvents="event33";
Q.eVar37=R;
Q.eVar38=P;
Q.events="event33";
Q.tl(this,"o","Sharetool Click Tracking")
}return{addProvider:I,trackPageview:K,trackEvent:O,trackGalleryClick:E,trackSharetoolClick:B}
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
M+=J(O.template);
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
(function(B,A){var D=B.History=B.History||{},C=B.jQuery;
if(typeof D.Adapter!="undefined"){throw new Error("History.js Adapter has already been loaded...")
}D.Adapter={bind:function(F,E,G){C(F).bind(E,G)
},trigger:function(F,E,G){C(F).trigger(E,G)
},extractEventData:function(E,H,G){var F=H&&H.originalEvent&&H.originalEvent[E]||G&&G[E]||A;
return F
},onDomLoad:function(E){C(E)
}},typeof D.init!="undefined"&&D.init()
})(window),function(N,M){var L=N.console||M,K=N.document,J=N.navigator,I=N.sessionStorage||!1,H=N.setTimeout,G=N.clearTimeout,F=N.setInterval,E=N.clearInterval,D=N.JSON,C=N.alert,B=N.History=N.History||{},A=N.history;
D.stringify=D.stringify||D.encode,D.parse=D.parse||D.decode;
if(typeof B.init!="undefined"){throw new Error("History.js Core has already been loaded...")
}B.init=function(){return typeof B.Adapter=="undefined"?!1:(typeof B.initCore!="undefined"&&B.initCore(),typeof B.initHtml4!="undefined"&&B.initHtml4(),!0)
},B.initCore=function(){if(typeof B.initCore.initialized!="undefined"){return !1
}B.initCore.initialized=!0,B.options=B.options||{},B.options.hashChangeInterval=B.options.hashChangeInterval||100,B.options.safariPollInterval=B.options.safariPollInterval||500,B.options.doubleCheckInterval=B.options.doubleCheckInterval||500,B.options.storeInterval=B.options.storeInterval||1000,B.options.busyDelay=B.options.busyDelay||250,B.options.debug=B.options.debug||!1,B.options.initialTitle=B.options.initialTitle||K.title,B.intervalList=[],B.clearAllIntervals=function(){var R,Q=B.intervalList;
if(typeof Q!="undefined"&&Q!==null){for(R=0;
R<Q.length;
R++){E(Q[R])
}B.intervalList=null
}},B.debug=function(){(B.options.debug||!1)&&B.log.apply(B,arguments)
},B.log=function(){var R=typeof L!="undefined"&&typeof L.log!="undefined"&&typeof L.log.apply!="undefined",Q=K.getElementById("log"),X,W,V,U,T;
R?(U=Array.prototype.slice.call(arguments),X=U.shift(),typeof L.debug!="undefined"?L.debug.apply(L,[X,U]):L.log.apply(L,[X,U])):X="\n"+arguments[0]+"\n";
for(W=1,V=arguments.length;
W<V;
++W){T=arguments[W];
if(typeof T=="object"&&typeof D!="undefined"){try{T=D.stringify(T)
}catch(S){}}X+="\n"+T+"\n"
}return Q?(Q.value+=X+"\n-----\n",Q.scrollTop=Q.scrollHeight-Q.clientHeight):R||C(X),!0
},B.getInternetExplorerMajorVersion=function(){var Q=B.getInternetExplorerMajorVersion.cached=typeof B.getInternetExplorerMajorVersion.cached!="undefined"?B.getInternetExplorerMajorVersion.cached:function(){var S=3,R=K.createElement("div"),T=R.getElementsByTagName("i");
while((R.innerHTML="<!--[if gt IE "+ ++S+"]><i></i><![endif]-->")&&T[0]){}return S>4?S:!1
}();
return Q
},B.isInternetExplorer=function(){var Q=B.isInternetExplorer.cached=typeof B.isInternetExplorer.cached!="undefined"?B.isInternetExplorer.cached:Boolean(B.getInternetExplorerMajorVersion());
return Q
},B.emulated={pushState:!Boolean(N.history&&N.history.pushState&&N.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(J.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(J.userAgent)),hashChange:Boolean(!("onhashchange" in N||"onhashchange" in K)||B.isInternetExplorer()&&B.getInternetExplorerMajorVersion()<8)},B.enabled=!B.emulated.pushState,B.bugs={setHash:Boolean(!B.emulated.pushState&&J.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(J.userAgent)),safariPoll:Boolean(!B.emulated.pushState&&J.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(J.userAgent)),ieDoubleCheck:Boolean(B.isInternetExplorer()&&B.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(B.isInternetExplorer()&&B.getInternetExplorerMajorVersion()<7)},B.isEmptyObject=function(R){for(var Q in R){return !1
}return !0
},B.cloneObject=function(R){var Q,S;
return R?(Q=D.stringify(R),S=D.parse(Q)):S={},S
},B.getRootUrl=function(){var Q=K.location.protocol+"//"+(K.location.hostname||K.location.host);
if(K.location.port||!1){Q+=":"+K.location.port
}return Q+="/",Q
},B.getBaseHref=function(){var R=K.getElementsByTagName("base"),Q=null,S="";
return R.length===1&&(Q=R[0],S=Q.href.replace(/[^\/]+$/,"")),S=S.replace(/\/+$/,""),S&&(S+="/"),S
},B.getBaseUrl=function(){var Q=B.getBaseHref()||B.getBasePageUrl()||B.getRootUrl();
return Q
},B.getPageUrl=function(){var R=B.getState(!1,!1),Q=(R||{}).url||K.location.href,S;
return S=Q.replace(/\/+$/,"").replace(/[^\/]+$/,function(U,T,V){return/\./.test(U)?U:U+"/"
}),S
},B.getBasePageUrl=function(){var Q=K.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(S,R,T){return/[^\/]$/.test(S)?"":S
}).replace(/\/+$/,"")+"/";
return Q
},B.getFullUrl=function(R,Q){var T=R,S=R.substring(0,1);
return Q=typeof Q=="undefined"?!0:Q,/[a-z]+\:\/\//.test(R)||(S==="/"?T=B.getRootUrl()+R.replace(/^\/+/,""):S==="#"?T=B.getPageUrl().replace(/#.*/,"")+R:S==="?"?T=B.getPageUrl().replace(/[\?#].*/,"")+R:Q?T=B.getBaseUrl()+R.replace(/^(\.\/)+/,""):T=B.getBasePageUrl()+R.replace(/^(\.\/)+/,"")),T.replace(/\#$/,"")
},B.getShortUrl=function(R){var Q=R,T=B.getBaseUrl(),S=B.getRootUrl();
return B.emulated.pushState&&(Q=Q.replace(T,"")),Q=Q.replace(S,"/"),B.isTraditionalAnchor(Q)&&(Q="./"+Q),Q=Q.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),Q
},B.store={},B.idToState=B.idToState||{},B.stateToId=B.stateToId||{},B.urlToId=B.urlToId||{},B.storedStates=B.storedStates||[],B.savedStates=B.savedStates||[],B.normalizeStore=function(){B.store.idToState=B.store.idToState||{},B.store.urlToId=B.store.urlToId||{},B.store.stateToId=B.store.stateToId||{}
},B.getState=function(R,Q){typeof R=="undefined"&&(R=!0),typeof Q=="undefined"&&(Q=!0);
var S=B.getLastSavedState();
return !S&&Q&&(S=B.createStateObject()),R&&(S=B.cloneObject(S),S.url=S.cleanUrl||S.url),S
},B.getIdByState=function(R){var Q=B.extractId(R.url),S;
if(!Q){S=B.getStateString(R);
if(typeof B.stateToId[S]!="undefined"){Q=B.stateToId[S]
}else{if(typeof B.store.stateToId[S]!="undefined"){Q=B.store.stateToId[S]
}else{for(;
;
){Q=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");
if(typeof B.idToState[Q]=="undefined"&&typeof B.store.idToState[Q]=="undefined"){break
}}B.stateToId[S]=Q,B.idToState[Q]=R
}}}return Q
},B.normalizeState=function(R){var Q,S;
if(!R||typeof R!="object"){R={}
}if(typeof R.normalized!="undefined"){return R
}if(!R.data||typeof R.data!="object"){R.data={}
}Q={},Q.normalized=!0,Q.title=R.title||"",Q.url=B.getFullUrl(B.unescapeString(R.url||K.location.href)),Q.hash=B.getShortUrl(Q.url),Q.data=B.cloneObject(R.data),Q.id=B.getIdByState(Q),Q.cleanUrl=Q.url.replace(/\??\&_suid.*/,""),Q.url=Q.cleanUrl,S=!B.isEmptyObject(Q.data);
if(Q.title||S){Q.hash=B.getShortUrl(Q.url).replace(/\??\&_suid.*/,""),/\?/.test(Q.hash)||(Q.hash+="?"),Q.hash+="&_suid="+Q.id
}return Q.hashedUrl=B.getFullUrl(Q.hash),(B.emulated.pushState||B.bugs.safariPoll)&&B.hasUrlDuplicate(Q)&&(Q.url=Q.hashedUrl),Q
},B.createStateObject=function(R,Q,T){var S={data:R,title:Q,url:T};
return S=B.normalizeState(S),S
},B.getStateById=function(Q){Q=String(Q);
var R=B.idToState[Q]||B.store.idToState[Q]||M;
return R
},B.getStateString=function(R){var Q,T,S;
return Q=B.normalizeState(R),T={data:Q.data,title:R.title,url:R.url},S=D.stringify(T),S
},B.getStateId=function(R){var Q,S;
return Q=B.normalizeState(R),S=Q.id,S
},B.getHashByState=function(R){var Q,S;
return Q=B.normalizeState(R),S=Q.hash,S
},B.extractId=function(R){var Q,T,S;
return T=/(.*)\&_suid=([0-9]+)$/.exec(R),S=T?T[1]||R:R,Q=T?String(T[2]||""):"",Q||!1
},B.isTraditionalAnchor=function(R){var Q=!/[\/\?\.]/.test(R);
return Q
},B.extractState=function(R,Q){var U=null,T,S;
return Q=Q||!1,T=B.extractId(R),T&&(U=B.getStateById(T)),U||(S=B.getFullUrl(R),T=B.getIdByUrl(S)||!1,T&&(U=B.getStateById(T)),!U&&Q&&!B.isTraditionalAnchor(R)&&(U=B.createStateObject(null,null,S))),U
},B.getIdByUrl=function(Q){var R=B.urlToId[Q]||B.store.urlToId[Q]||M;
return R
},B.getLastSavedState=function(){return B.savedStates[B.savedStates.length-1]||M
},B.getLastStoredState=function(){return B.storedStates[B.storedStates.length-1]||M
},B.hasUrlDuplicate=function(R){var Q=!1,S;
return S=B.extractState(R.url),Q=S&&S.id!==R.id,Q
},B.storeState=function(Q){return B.urlToId[Q.url]=Q.id,B.storedStates.push(B.cloneObject(Q)),Q
},B.isLastSavedState=function(R){var Q=!1,U,T,S;
return B.savedStates.length&&(U=R.id,T=B.getLastSavedState(),S=T.id,Q=U===S),Q
},B.saveState=function(Q){return B.isLastSavedState(Q)?!1:(B.savedStates.push(B.cloneObject(Q)),!0)
},B.getStateByIndex=function(R){var Q=null;
return typeof R=="undefined"?Q=B.savedStates[B.savedStates.length-1]:R<0?Q=B.savedStates[B.savedStates.length+R]:Q=B.savedStates[R],Q
},B.getHash=function(){var Q=B.unescapeHash(K.location.hash);
return Q
},B.unescapeString=function(Q){var S=Q,R;
for(;
;
){R=N.unescape(S);
if(R===S){break
}S=R
}return S
},B.unescapeHash=function(R){var Q=B.normalizeHash(R);
return Q=B.unescapeString(Q),Q
},B.normalizeHash=function(R){var Q=R.replace(/[^#]*#/,"").replace(/#.*/,"");
return Q
},B.setHash=function(R,Q){var U,T,S;
return Q!==!1&&B.busy()?(B.pushQueue({scope:B,callback:B.setHash,args:arguments,queue:Q}),!1):(U=B.escapeHash(R),B.busy(!0),T=B.extractState(R,!0),T&&!B.emulated.pushState?B.pushState(T.data,T.title,T.url,!1):K.location.hash!==U&&(B.bugs.setHash?(S=B.getPageUrl(),B.pushState(null,null,S+"#"+U,!1)):K.location.hash=U),B)
},B.escapeHash=function(Q){var R=B.normalizeHash(Q);
return R=N.escape(R),B.bugs.hashEscape||(R=R.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),R
},B.getHashByUrl=function(R){var Q=String(R).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");
return Q=B.unescapeHash(Q),Q
},B.setTitle=function(R){var Q=R.title,T;
Q||(T=B.getStateByIndex(0),T&&T.url===R.url&&(Q=T.title||B.options.initialTitle));
try{K.getElementsByTagName("title")[0].innerHTML=Q.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")
}catch(S){}return K.title=Q,B
},B.queues=[],B.busy=function(R){typeof R!="undefined"?B.busy.flag=R:typeof B.busy.flag=="undefined"&&(B.busy.flag=!1);
if(!B.busy.flag){G(B.busy.timeout);
var Q=function(){var S,U,T;
if(B.busy.flag){return 
}for(S=B.queues.length-1;
S>=0;
--S){U=B.queues[S];
if(U.length===0){continue
}T=U.shift(),B.fireQueueItem(T),B.busy.timeout=H(Q,B.options.busyDelay)
}};
B.busy.timeout=H(Q,B.options.busyDelay)
}return B.busy.flag
},B.busy.flag=!1,B.fireQueueItem=function(Q){return Q.callback.apply(Q.scope||B,Q.args||[])
},B.pushQueue=function(Q){return B.queues[Q.queue||0]=B.queues[Q.queue||0]||[],B.queues[Q.queue||0].push(Q),B
},B.queue=function(R,Q){return typeof R=="function"&&(R={callback:R}),typeof Q!="undefined"&&(R.queue=Q),B.busy()?B.pushQueue(R):B.fireQueueItem(R),B
},B.clearQueue=function(){return B.busy.flag=!1,B.queues=[],B
},B.stateChanged=!1,B.doubleChecker=!1,B.doubleCheckComplete=function(){return B.stateChanged=!0,B.doubleCheckClear(),B
},B.doubleCheckClear=function(){return B.doubleChecker&&(G(B.doubleChecker),B.doubleChecker=!1),B
},B.doubleCheck=function(Q){return B.stateChanged=!1,B.doubleCheckClear(),B.bugs.ieDoubleCheck&&(B.doubleChecker=H(function(){return B.doubleCheckClear(),B.stateChanged||Q(),!0
},B.options.doubleCheckInterval)),B
},B.safariStatePoll=function(){var Q=B.extractState(K.location.href),R;
if(!B.isLastSavedState(Q)){R=Q
}else{return 
}return R||(R=B.createStateObject()),B.Adapter.trigger(N,"popstate"),B
},B.back=function(Q){return Q!==!1&&B.busy()?(B.pushQueue({scope:B,callback:B.back,args:arguments,queue:Q}),!1):(B.busy(!0),B.doubleCheck(function(){B.back(!1)
}),A.go(-1),!0)
},B.forward=function(Q){return Q!==!1&&B.busy()?(B.pushQueue({scope:B,callback:B.forward,args:arguments,queue:Q}),!1):(B.busy(!0),B.doubleCheck(function(){B.forward(!1)
}),A.go(1),!0)
},B.go=function(R,Q){var S;
if(R>0){for(S=1;
S<=R;
++S){B.forward(Q)
}}else{if(!(R<0)){throw new Error("History.go: History.go requires a positive or negative integer passed.")
}for(S=-1;
S>=R;
--S){B.back(Q)
}}return B
};
if(B.emulated.pushState){var P=function(){};
B.pushState=B.pushState||P,B.replaceState=B.replaceState||P
}else{B.onPopState=function(Q,V){var U=!1,T=!1,S,R;
return B.doubleCheckComplete(),S=B.getHash(),S?(R=B.extractState(S||K.location.href,!0),R?B.replaceState(R.data,R.title,R.url,!1):(B.Adapter.trigger(N,"anchorchange"),B.busy(!1)),B.expectedStateId=!1,!1):(U=B.Adapter.extractEventData("state",Q,V)||!1,U?T=B.getStateById(U):B.expectedStateId?T=B.getStateById(B.expectedStateId):T=B.extractState(K.location.href),T||(T=B.createStateObject(null,null,K.location.href)),B.expectedStateId=!1,B.isLastSavedState(T)?(B.busy(!1),!1):(B.storeState(T),B.saveState(T),B.setTitle(T),B.Adapter.trigger(N,"statechange"),B.busy(!1),!0))
},B.Adapter.bind(N,"popstate",B.onPopState),B.pushState=function(Q,U,T,S){if(B.getHashByUrl(T)&&B.emulated.pushState){throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).")
}if(S!==!1&&B.busy()){return B.pushQueue({scope:B,callback:B.pushState,args:arguments,queue:S}),!1
}B.busy(!0);
var R=B.createStateObject(Q,U,T);
return B.isLastSavedState(R)?B.busy(!1):(B.storeState(R),B.expectedStateId=R.id,A.pushState(R.id,R.title,R.url),B.Adapter.trigger(N,"popstate")),!0
},B.replaceState=function(Q,U,T,S){if(B.getHashByUrl(T)&&B.emulated.pushState){throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).")
}if(S!==!1&&B.busy()){return B.pushQueue({scope:B,callback:B.replaceState,args:arguments,queue:S}),!1
}B.busy(!0);
var R=B.createStateObject(Q,U,T);
return B.isLastSavedState(R)?B.busy(!1):(B.storeState(R),B.expectedStateId=R.id,A.replaceState(R.id,R.title,R.url),B.Adapter.trigger(N,"popstate")),!0
}
}if(I){try{B.store=D.parse(I.getItem("History.store"))||{}
}catch(O){B.store={}
}B.normalizeStore()
}else{B.store={},B.normalizeStore()
}B.Adapter.bind(N,"beforeunload",B.clearAllIntervals),B.Adapter.bind(N,"unload",B.clearAllIntervals),B.saveState(B.storeState(B.extractState(K.location.href,!0))),I&&(B.onUnload=function(){var R,Q;
try{R=D.parse(I.getItem("History.store"))||{}
}catch(S){R={}
}R.idToState=R.idToState||{},R.urlToId=R.urlToId||{},R.stateToId=R.stateToId||{};
for(Q in B.idToState){if(!B.idToState.hasOwnProperty(Q)){continue
}R.idToState[Q]=B.idToState[Q]
}for(Q in B.urlToId){if(!B.urlToId.hasOwnProperty(Q)){continue
}R.urlToId[Q]=B.urlToId[Q]
}for(Q in B.stateToId){if(!B.stateToId.hasOwnProperty(Q)){continue
}R.stateToId[Q]=B.stateToId[Q]
}B.store=R,B.normalizeStore(),I.setItem("History.store",D.stringify(R))
},B.intervalList.push(F(B.onUnload,B.options.storeInterval)),B.Adapter.bind(N,"beforeunload",B.onUnload),B.Adapter.bind(N,"unload",B.onUnload));
if(!B.emulated.pushState){B.bugs.safariPoll&&B.intervalList.push(F(B.safariStatePoll,B.options.safariPollInterval));
if(J.vendor==="Apple Computer, Inc."||(J.appCodeName||"")==="Mozilla"){B.Adapter.bind(N,"hashchange",function(){B.Adapter.trigger(N,"popstate")
}),B.getHash()&&B.Adapter.onDomLoad(function(){B.Adapter.trigger(N,"hashchange")
})
}}},B.init()
}(window);
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
var isStreamOn=$("#home-page .videoBlock header").attr("stream")=="true";
if(!isAppleDevice&&isStreamOn){$("#home-page .video-container.video").hide();
$("#home-page .video-container.stream").show()
}$(function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("article[data-slideshow]").each(function(){var data=$.parseJSON($(this).attr("data-slideshow"));
if(_.hasValue(data.interstitials)){data.interstitials=data.interstitials.split(",");
_.each(data.interstitials,function(value,index){try{data.interstitials[index]=parseInt(data.interstitials[index])
}catch(error){data.interstitials=[3]
}})
}$(this).gallery({url:data.url,enableAutoPlay:false,display:data.display||"standard",interstitials:data.interstitials,containers:{slide:$(this).find("div.gallery-slide"),viewAll:$("div.slide-view-all"),interstitial:$("div.slide-interstitial")},elements:{next:$(this).find("a.gallery-nav-button-next, img.gallery-slide-image"),previous:$(this).find("a.gallery-nav-button-previous"),index:$(this).find(".gallery-nav-index"),title:$(this).find("h2.gallery-slide-heading"),description:$(this).find(".gallery-slide-copy"),byline:$(this).find(".gallery-slide-photo-credit")},updated:function(evt,ui){dailybeast.analytics.trackPageview({pageNum:ui.index});
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
if($("#video-page").length>0){dailybeast.videopage.init();
$(window).resize(function(){dailybeast.videopage.positionNextPreviousImage()
})
}if($("#videos-page").length>0){dailybeast.videopage.positionNextPreviousImage();
$(window).resize(function(){dailybeast.videopage.positionNextPreviousImage()
})
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
$(".video-feature-container").slides({play:0,pause:2500,hoverPause:true,container:"slides",generatePagination:false,paginationClass:"slider-pagination",prev:"previous",next:"next",autoHeight:true,animationStart:function(){var cslide=$(".video-feature-container div[data-video]:visible");
cslide.find(".video-details, a").show();
cslide.find("img").show();
cslide.find("iframe, object").remove();
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
}var curVideo;
function showVideoOverlay(videoPath){var videoOverlay=$("#videoOverlay");
if(!videoOverlay.length){videoOverlay=$('<div id="videoOverlay"><div class="videoWrapper"></div></div>').appendTo("body");
$('<header><a class="overlayVideos" href="javascript: window.location.href = dailybeast.links.beastTv + \'.html\'"><div class="beast-tv"></div></a></header>').insertBefore(".videoWrapper")
}videoOverlay.overlay({top:"center",speed:"fast",load:true,onClose:function(){videoOverlay.removeData("overlay");
videoOverlay.find(".videoWrapper").html("")
},mask:{color:"#000",loadSpeed:0,closeSpeed:0,opacity:0.5}});
videoOverlay.find(".videoWrapper").load(videoPath.replace(".html",".videooverlay.html"),function(){$("#videoOverlay .videoOverlayList").jScrollPane({animateTo:true,animateStep:10,animateInterval:10});
curVideo=$(".videoOverlayList li").first().addClass("current");
dailybeast.video.addVideoEventListener(onVideoEvent);
$(".videoOverlayList li").click(function(e){e.preventDefault();
$(".videoOverlayList li").removeClass("current");
loadOverlayVideo(curVideo=$(this).addClass("current"))
});
$("#videoOverlay .videoWrapper").css("background-image","none");
loadOverlayStuff()
});
window.onorientationchange=function(){var viewportHeight=jQuery(window).height();
var elHeight=$("#videoOverlay").height();
$("#videoOverlay").css("top",((viewportHeight/2)-(elHeight/2))-40)
}
}function onVideoEvent(event){var eventType=event.type;
if(eventType=="mediaComplete"||(dailybeast.video.ytAPIReady&&event.data==YT.PlayerState.ENDED)){$(".videoOverlayList li").removeClass("current");
curVideo=curVideo.next().addClass("current");
if(curVideo.length==0){$(".videoOverlayList li:first-child").click()
}else{loadOverlayVideo(curVideo)
}setTimeout(function(){$(".videoOverlayList")[0].scrollTo($(".videoOverlayList .current").position().top)
},2000)
}}function loadOverlayVideo(element){var path=element.find("a").attr("href").replace(".html",".videooverlayplayer.html");
$("#videoOverlay .left").empty().load(path,loadOverlayStuff)
}function loadOverlayStuff(){dailybeast.advertising.init("#videoOverlay");
dailybeast.advertising.display("#videoOverlay");
if($.browser.msie){setTimeout(function(){dailybeast.loadSocialTools()
},750)
}else{dailybeast.loadSocialTools()
}}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$('#featureSlider a[href*="/videos/"],#home-page .video-container a[href*="/videos/"],#home-page .grid-7 a[href*="/videos/"],#home-page a.tout[href*="/videos/"],.video-container a[href*="/videos/"],.video-block-list a[href*="/videos/"],#layout2-page .hVideoList a[href*="/videos/"],#layout5-page .hVideoList a[href*="/videos/"],#layout3-page .secondaryRiver a[href*="/videos/"],#layout1-page .secondaryRiver a[href*="/videos/"],#layout1-page .mediaBoxout a[href*="/videos/"]').click(function(e){e.preventDefault();
showVideoOverlay($(this).attr("href"))
});
if($.browser.msie&&isStreamOn){$('#home-page .video-container .heading a[href*="/videos/"]').off("click")
}}dailybeast.loadSocialTools=function(){stButtons.locateElements();
if(typeof twttr!="undefined"){twttr.widgets.load()
}if(typeof FB!="undefined"){FB.XFBML.parse()
}if(typeof gapi!="undefined"){try{gapi.plusone.go()
}catch(e){}}$("span[data-counter]").each(function(){new Echo.Counter({target:this,appkey:(window.location.hostname.substring(0,3)==="www"?"prod":"dev")+".newsweek.com",query:"childrenof:"+$(this).attr("data-counter")+" -source:Twitter"})
});
$("#videoOverlay .livefyre-comment-button").each(function(){LF.CommentCount({replacer:function(element,count){var articleId=$(element).attr("data-lf-article-id");
$.log("LF CommentCount returned "+count+" for "+articleId);
if(count>=0){$(element).html("Comments ("+count+")")
}}})
})
}
});
function plusClick(A){var B="GOOGLEPLUS";
if(A.state=="off"){B="GOOGLEMINUS"
}dailybeast.analytics.trackSharetoolClick(B,A.href)
}$(".st_email_custom").click(function(){dailybeast.analytics.trackSharetoolClick("EMAIL",window.location.pathname)
});
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
(function(G){function O(U,X){var W=(U&65535)+(X&65535),V=(U>>16)+(X>>16)+(W>>16);
return(V<<16)|(W&65535)
}function S(U,V){return(U<<V)|(U>>>(32-V))
}function C(Z,W,V,U,Y,X){return O(S(O(O(W,Z),O(U,X)),Y),V)
}function B(W,V,e,Z,U,Y,X){return C((V&e)|((~V)&Z),W,V,U,Y,X)
}function I(W,V,e,Z,U,Y,X){return C((V&Z)|(e&(~Z)),W,V,U,Y,X)
}function N(W,V,e,Z,U,Y,X){return C(V^e^Z,W,V,U,Y,X)
}function A(W,V,e,Z,U,Y,X){return C(e^(V|(~Z)),W,V,U,Y,X)
}function D(j,Z){j[Z>>5]|=128<<((Z)%32);
j[(((Z+64)>>>9)<<4)+14]=Z;
var W,Y,X,V,U,h=1732584193,g=-271733879,f=-1732584194,e=271733878;
for(W=0;
W<j.length;
W+=16){Y=h;
X=g;
V=f;
U=e;
h=B(h,g,f,e,j[W],7,-680876936);
e=B(e,h,g,f,j[W+1],12,-389564586);
f=B(f,e,h,g,j[W+2],17,606105819);
g=B(g,f,e,h,j[W+3],22,-1044525330);
h=B(h,g,f,e,j[W+4],7,-176418897);
e=B(e,h,g,f,j[W+5],12,1200080426);
f=B(f,e,h,g,j[W+6],17,-1473231341);
g=B(g,f,e,h,j[W+7],22,-45705983);
h=B(h,g,f,e,j[W+8],7,1770035416);
e=B(e,h,g,f,j[W+9],12,-1958414417);
f=B(f,e,h,g,j[W+10],17,-42063);
g=B(g,f,e,h,j[W+11],22,-1990404162);
h=B(h,g,f,e,j[W+12],7,1804603682);
e=B(e,h,g,f,j[W+13],12,-40341101);
f=B(f,e,h,g,j[W+14],17,-1502002290);
g=B(g,f,e,h,j[W+15],22,1236535329);
h=I(h,g,f,e,j[W+1],5,-165796510);
e=I(e,h,g,f,j[W+6],9,-1069501632);
f=I(f,e,h,g,j[W+11],14,643717713);
g=I(g,f,e,h,j[W],20,-373897302);
h=I(h,g,f,e,j[W+5],5,-701558691);
e=I(e,h,g,f,j[W+10],9,38016083);
f=I(f,e,h,g,j[W+15],14,-660478335);
g=I(g,f,e,h,j[W+4],20,-405537848);
h=I(h,g,f,e,j[W+9],5,568446438);
e=I(e,h,g,f,j[W+14],9,-1019803690);
f=I(f,e,h,g,j[W+3],14,-187363961);
g=I(g,f,e,h,j[W+8],20,1163531501);
h=I(h,g,f,e,j[W+13],5,-1444681467);
e=I(e,h,g,f,j[W+2],9,-51403784);
f=I(f,e,h,g,j[W+7],14,1735328473);
g=I(g,f,e,h,j[W+12],20,-1926607734);
h=N(h,g,f,e,j[W+5],4,-378558);
e=N(e,h,g,f,j[W+8],11,-2022574463);
f=N(f,e,h,g,j[W+11],16,1839030562);
g=N(g,f,e,h,j[W+14],23,-35309556);
h=N(h,g,f,e,j[W+1],4,-1530992060);
e=N(e,h,g,f,j[W+4],11,1272893353);
f=N(f,e,h,g,j[W+7],16,-155497632);
g=N(g,f,e,h,j[W+10],23,-1094730640);
h=N(h,g,f,e,j[W+13],4,681279174);
e=N(e,h,g,f,j[W],11,-358537222);
f=N(f,e,h,g,j[W+3],16,-722521979);
g=N(g,f,e,h,j[W+6],23,76029189);
h=N(h,g,f,e,j[W+9],4,-640364487);
e=N(e,h,g,f,j[W+12],11,-421815835);
f=N(f,e,h,g,j[W+15],16,530742520);
g=N(g,f,e,h,j[W+2],23,-995338651);
h=A(h,g,f,e,j[W],6,-198630844);
e=A(e,h,g,f,j[W+7],10,1126891415);
f=A(f,e,h,g,j[W+14],15,-1416354905);
g=A(g,f,e,h,j[W+5],21,-57434055);
h=A(h,g,f,e,j[W+12],6,1700485571);
e=A(e,h,g,f,j[W+3],10,-1894986606);
f=A(f,e,h,g,j[W+10],15,-1051523);
g=A(g,f,e,h,j[W+1],21,-2054922799);
h=A(h,g,f,e,j[W+8],6,1873313359);
e=A(e,h,g,f,j[W+15],10,-30611744);
f=A(f,e,h,g,j[W+6],15,-1560198380);
g=A(g,f,e,h,j[W+13],21,1309151649);
h=A(h,g,f,e,j[W+4],6,-145523070);
e=A(e,h,g,f,j[W+11],10,-1120210379);
f=A(f,e,h,g,j[W+2],15,718787259);
g=A(g,f,e,h,j[W+9],21,-343485551);
h=O(h,Y);
g=O(g,X);
f=O(f,V);
e=O(e,U)
}return[h,g,f,e]
}function P(V){var W,U="";
for(W=0;
W<V.length*32;
W+=8){U+=String.fromCharCode((V[W>>5]>>>(W%32))&255)
}return U
}function J(V){var W,U=[];
U[(V.length>>2)-1]=undefined;
for(W=0;
W<U.length;
W+=1){U[W]=0
}for(W=0;
W<V.length*8;
W+=8){U[W>>5]|=(V.charCodeAt(W/8)&255)<<(W%32)
}return U
}function K(U){return P(D(J(U),U.length*8))
}function E(W,Z){var V,Y=J(W),U=[],X=[],a;
U[15]=X[15]=undefined;
if(Y.length>16){Y=D(Y,W.length*8)
}for(V=0;
V<16;
V+=1){U[V]=Y[V]^909522486;
X[V]=Y[V]^1549556828
}a=D(U.concat(J(Z)),512+Z.length*8);
return P(D(X.concat(a),512+128))
}function T(W){var Y="0123456789abcdef",V="",U,X;
for(X=0;
X<W.length;
X+=1){U=W.charCodeAt(X);
V+=Y.charAt((U>>>4)&15)+Y.charAt(U&15)
}return V
}function M(U){return unescape(encodeURIComponent(U))
}function Q(U){return K(M(U))
}function L(U){return T(Q(U))
}function H(U,V){return E(M(U),M(V))
}function R(U,V){return T(H(U,V))
}function F(V,W,U){if(!W){if(!U){return L(V)
}else{return Q(V)
}}if(!U){return R(W,V)
}else{return H(W,V)
}}if(typeof define==="function"&&define.amd){define(function(){return F
})
}else{G.md5=F
}}(this));
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
var FullScreenOverlay;
(function(A){FullScreenOverlay=function(B){this.$overlay=null;
this.settings=A.extend({onClose:function(){}},B)
};
FullScreenOverlay.prototype.enableScrolling=function(){A("html").css({overflow:"auto"});
A(window).scrollTop(this.scrollTop)
};
FullScreenOverlay.prototype.disableScrolling=function(){this.scrollTop=A(window).scrollTop();
A("html").css({overflow:"hidden"})
};
FullScreenOverlay.prototype.open=function(B){this.$overlay=A("#fullscreen-overlay");
this.disableScrolling();
if(this.$overlay.length<=0){this.$overlay=A('<div id="fullscreen-overlay"></div>').css({display:"none",position:"fixed",top:"0px",left:"0px"}).appendTo("body")
}this.$overlay.html(B);
if(!this.$overlay.is(":visible")){this.$overlay.fadeIn(50)
}return this.$overlay
};
FullScreenOverlay.prototype.close=function(){this.enableScrolling();
if(this.$overlay!=null){this.$overlay.fadeOut(50);
this.$overlay.html("")
}this.settings.onClose()
}
})(jQuery);
var GalleryUrlUtil={galleryConfig:{},isAGallery:function(C){var D=GalleryUrlUtil;
if($.isEmptyObject(D.galleryConfig)){var B=$.parseJSON($("body").attr("data-gallery-config"));
D.galleryConfig.startDate=new Date(B.startDate.replace(/-/g,"/"));
D.galleryConfig.endDate=new Date(B.endDate.replace(/-/g,"/"))
}var E=false;
var F=/.*\/galleries\/([0-9]*)\/([0-9]*)\/([0-9]*)\/.*/g;
var A=F.exec(C);
try{if(A&&A.length>3){var H=new Date(A[1]+"/"+A[2]+"/"+A[3]);
E=H.getTime()>=D.galleryConfig.startDate.getTime()&&H.getTime()<=D.galleryConfig.endDate.getTime()
}}catch(G){$.warn("Error parsing date in url:"+C)
}return C&&E
}};
(function(C){var B=new FullScreenOverlay(),D=window.location.pathname,A=null;
function F(G){B=new FullScreenOverlay({onClose:E});
A=new GalleryView(B.open(),{onClose:function(){B.close()
}});
A.loadGallery(G,true)
}function E(){A.hideLoading();
if(Modernizr.history){history.pushState(null,"",D)
}}C(function(){if(Modernizr.history&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&C("#gallery2-page").length==0){C("a[href]").each(function(){var G=C(this);
var H=G.attr("href");
if(GalleryUrlUtil.isAGallery(H)&&!isAppleDevice){G.click(function(){F(H);
return false
})
}});
C(window).bind("popstate",function(G){if(location.pathname==D){if(B!=null){B.close();
B=null
}}else{if(B==null){var H=History.getState();
if(H!=null&&H.galleryUrl){F(H.galleryUrl)
}else{if(GalleryUrlUtil.isAGallery(location.pathname)){F(location.href)
}}}}})
}else{C.warn("Not attaching galleries as overlays.  HTML5 history not detected:"+Modernizr.history)
}})
})(jQuery);
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
A.initFancyBox=function(){var C="echo-css-fancybox";
if($("#"+C).length){return 
}var B=document.getElementsByTagName("head")[0]||document.documentElement;
B.insertBefore($("<link>",{rel:"stylesheet",id:C,type:"text/css",href:"/etc/clientlibs/dailybeast/fancybox/jquery.fancybox-1.3.4.css"}).get(0),$(B).children().get(0))
};
A.initLoginBox=function(){A.initFancyBox();
A.loginForm.append("<span class='loginFancyboxAnchor'></span>");
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
if(A.loginForm.length>0){$.log("Adding Backplane 1.2");
loadBackplane1_2();
$.log("Backplane 1.2 Added, now trying to init");
Backplane(A.init);
Backplane.init({serverBaseURL:"https://backplane1.janrainbackplane.com/v1.2",busName:"newsweek.com",initFrameFilter:Backplane.identityServices.init})
}else{$.log("Adding Backplane 1.2");
loadBackplane1_2();
$.log("Backplane 1.2 Added, resetting cookie channel");
Backplane.resetCookieChannel()
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
})(this)
};
$(function(){window.dailybeast=window.dailybeast||{};
window.dailybeast.livefyre=window.dailybeast.livefyre||function(){var B={};
B.lfScripts=$("[data-lf-domain]");
B.network=B.lfScripts.length>0?$(B.lfScripts[0]).attr("data-lf-domain"):"";
B.commentContainer=$("#livefyre");
B.chatContainer=$("#livefyre-chat");
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
A.enableNotifier();
A.chatContainer.show()
};
A.loadStream=function(){if($("#livefyre").length>0){fyre.conv.load({network:A.network,authDelegate:A.authDelegate},[A.config],A.lfready)
}};
A.loadCommentCounts=function(){$.log("Loading comment counts");
LF.CommentCount({replacer:function(B,D){var C=$(B).attr("data-lf-article-id");
if(C==A.config.articleId){$.log("Deferring to live count - as the article id has a stream on the page")
}else{$.log("LF CommentCount returned "+D+" for "+C);
if(D>=0){$(B).html("Comments ("+D+")")
}}}})
};
A.initAvatarQTip=function(){$("#livefyre").on("mouseover",".fyre-comment-like-imgs .fyre-avatar a",function(C){var B=$(this);
if(typeof B.data("qtip")==="undefined"){B.qtip({content:B.data("title"),show:{ready:true,when:{event:"mouseover"}},hide:"mouseout",position:{corner:{tooltip:"topLeft",target:"rightBottom"}},style:{border:{width:5,radius:10},padding:10,textAlign:"center",tip:true,name:"light"}})
}})
};
A.init=function(){try{$.log("Initializing livefyre on the Beast",A.network);
if(typeof $.tdburl.hash.suppressCommentLoad=="undefined"){A.loadStream()
}A.loadCommentCounts();
A.initAvatarQTip()
}catch(B){$.log("Could not init livefyre",B)
}};
A.init()
});