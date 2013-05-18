var cCol=$(".c-col-wrapper");
var ad=$(".floatingad .ad");
if(cCol.length&&ad.length&&!dailybeast.modes.isEditMode){var spaceBetweenColAndAd=200;
var adLeftOffset=cCol.offset().left+33;
$(window).on("resize",function(){adLeftOffset=cCol.offset().left+33;
ad.css("left",adLeftOffset)
});
function updateFloatingAd(){var a=window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop;
var c=cCol.offset().top+cCol.height()+spaceBetweenColAndAd;
var b=$("#ad-bottom").offset().top-a;
if(ad.length&&ad.floating==undefined&&a>c&&b>ad.height()){if($(".floatingad ").height()>100){$(".floatingad").height($(".floatingad ").height())
}ad.css("position","fixed");
ad.css("top",-ad.height());
ad.css("left",adLeftOffset);
ad.animate({top:"0px"},700);
ad.floating=true
}else{if(ad.floating&&a<=c||b<ad.height()){ad.stop().animate({top:-ad.height()},"fast",function(){ad.css("position","");
ad.floating=undefined
})
}}}if(!isMobile.any()){$(window).on("scroll",updateFloatingAd)
}}$.widget("ui.advertising",{options:{iFrame:false,editNamespace:"edit",adNamespace:"ad",entityNamespace:"entity",topicNamespace:"topic",packageNamespace:"package",audienceScienceCookie:"rsi_segs",customTile:"false",disable:"false",render:"true",siteID:"5480.iac.thedailybeast",topic:"",size:"",params:null,tile:1,ord:dailybeast.interstitial.getOrd(),zone:"",template:""},refresh:function(a){this._refresh(a)
},hide:function(){this._hide()
},show:function(){this._show()
},_create:function(){if(this.options.disable=="false"){this._setSize();
this._setAdParams();
$.data(this.element,"isReady",true)
}},_refresh:function(a){if((this._isReady()&&$(this.element).is(":visible"))||$(this.element).attr("forceShowing")=="true"){this._setReady(false);
this._render(this._generateUrl(a))
}},_render:function(c){var e=this;
if(typeof e._adParams!="undefined"&&!e._adParams.adDisable){if(this.options.iFrame){$(this.element).html('<iframe width="'+this._width+'" height="'+this._height+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowTransparency="true" src="/etc/static/dailybeast/dart.html#'+encodeURIComponent(c)+'"/>');
this._setReady(true)
}else{var b="<script src='"+c+"'><\/script>";
var d=navigator.userAgent.toLowerCase();
var a=/android 2\.3/i.test(d);
if($.browser.msie||a){writeCapture.proxyGetElementById=true
}else{writeCapture.writeOnGetElementById=true
}$(this.element).html(writeCapture.sanitize(b,{done:function(){e._setReady(true);
if(e._adParams.adDebug){e._enableDebugging(c)
}if($(e.element).html().indexOf("grey.gif")>=0){$(e.element).hide()
}}}))
}}},_isReady:function(){return $.data(this.element,"isReady")
},_setReady:function(a){if(a){$.perf("Ad has completed loading,"+this)
}$.data(this.element,"isReady",a)
},_setAdParams:function(){this._adParams={};
var b=window.location.hash;
if(b.length>1){b=b.substring(1);
var d=b.split(";");
for(var a=0;
a<d.length;
a++){var c=d[a].split("=");
this._adParams[c[0]]=c[1]
}}},_generateUrl:function(a){return dailybeast.advertising.request.generateRequest({siteID:this.options.siteID,zone:this.options.zone,template:this.options.template,element:this.element,tile:this.options.tile,size:this.options.size,params:this.options.params,ord:a,adParams:this._adParams})
},_hide:function(){$(this.element).css("visibility","hidden")
},_show:function(){$(this.element).css("visibility","visible")
},_setSize:function(){var b=this.options.size.split(",");
for(var a=0;
a<b.length;
a++){this._width=Math.max(b[a].split("x")[0],this._width||0);
this._height=Math.max(b[a].split("x")[1],this._height||0)
}},_enableDebugging:function(b){if($.data(this.element,"debug")){$.data(this.element,"debug").remove()
}var e=$(this.element).offset();
var d=$(document.createElement("div"));
$("body").css("position","relative");
d.attr("style","background: white; border: 3px solid #D1232A; padding: 5px; position: absolute; width: 300px; z-index: 9998; word-wrap:break-word; color:black");
d.css("top",e.top+"px");
d.css("left",e.left+"px");
d.css("overflow","hidden");
var c="<strong>Tile "+this.options.tile+"</strong><br />";
var a=b+'<br /><a href="'+b+'" target="_blank">Link &#187;</a>';
$(d).html(c+a);
$(d).hover(function(){$(this).css("z-index",9999)
},function(){$(this).css("z-index",9998)
});
$.data(this.element,"debug",d);
$("body").append(d)
}});
(function(a){function b(e,d){var c=this;
this.$parent=e;
this.IMAGE_SIZES=["medium","large","xlarge"];
this.IMAGE_SIZE_DIVISOR=700;
this.init();
this.settings=a.extend({onClose:function(){var f=c.$gallery.find(".btn-close-x").attr("href");
if(document.referrer&&!GalleryUrlUtil.isAGallery(document.referrer)){f=document.referrer
}a.log("Closing and navigating to:"+f);
window.location=f
}},d);
if(d.data!==undefined){this.setViewData(d.data)
}this.bindWindowAndDocumentEvents();
if(a("#gallery").length===1){this.assignDomElements();
this.attachEvents();
if(!this.checkHash()){this.trackPageView()
}this.resize()
}setTimeout(function(){c.$imageCanvas.css("visibility","visible");
c.$gallery.find(".aside .copy").css("visibility","visible")
},2000)
}b.prototype={init:function(){this.fullScreen=false;
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
},setViewData:function(c){this.init();
this.data=c;
this.gallery=c;
this.slideIndex=c.currentSlide;
this.slideCount=c.slides.length;
this.galleryContext=baseContext.push(c).push(c);
this.slideUrlMapping=this.getSlideUrlMapping(c)
},bindWindowAndDocumentEvents:function(){var d=this,e=true,c=window.location.hash;
a(window).unbind(".galleryView").bind("resize.galleryView",function(){d.resize()
}).bind("orientationchange.galleryView",function(){d.resize()
}).bind("popstate.galleryView",function(f){if(f.originalEvent&&d.gallery&&!d.isSameGallery(window.location.pathname)&&GalleryUrlUtil.isAGallery(d.getCurrentRelativeUrl())){d.loadGallery(d.getCurrentRelativeUrl(),false)
}}).bind("hashchange.galleryView",function(){if(!e||window.location.hash!==c){d.renderUrl(d.getCurrentRelativeUrl())
}e=false
});
a(document).unbind(".galleryView").bind("keydown.galleryView",function(f){if(f.keyCode===37){d.previous();
dailybeast.analytics.trackGalleryClick("PREVIOUSKEY",d.fullScreen)
}else{if(f.keyCode===39){d.next();
dailybeast.analytics.trackGalleryClick("NEXTKEY",d.fullScreen)
}}});
if(this.moreGalleriesView!==undefined){this.moreGalleriesView.bindWindowEvents()
}},unbindWindowAndDocumentEvents:function(){a(window).unbind(".galleryView");
a(document).unbind(".galleryView");
if(this.moreGalleriesView!==undefined){this.moreGalleriesView.unbindWindowEvents()
}},loadGallery:function(d,e){var c=this;
this.$parent.addClass("gallery-loader");
a.ajax(d.replace(/\.html.*/,".gallery.json"),{dataType:"json",success:function(j){var h=j.slides,f,k;
for(f=0,k=h.length;
f<k;
f++){if(h[f].url===d){j.currentSlide=f
}}c.setViewData(j);
if(this.relatedGalleriesView!==undefined){c.relatedGalleriesView.remove()
}var g=a(location).attr("href");
c.render();
if(e){c.pushState()
}c.$parent.removeClass("gallery-loader");
c.trackPageView(g)
},error:function(f){if(f.status==404){window.location.href="/404"
}}})
},render:function(){var d=this,c=a("#gallery");
renderTemplate("dailybeast/components/gallery2/gallery",baseContext.push(this.data),function(e){if(c.length===0){d.$parent.html(e)
}else{c.replaceWith(e)
}d.assignDomElements();
d.bindWindowAndDocumentEvents();
d.attachEvents();
d.resize();
d.initAds();
d.refreshAds();
d.shareTools.refresh("gallery");
d.header.undimTitle();
d.header.pushBrowserTitle(d.gallery.longTitle)
})
},trackPageView:function(l){function k(t){var w=window.location.search.substring(1);
if(_.hasValue(w)){var r=w.split("&");
for(var v=0;
v<r.length;
v++){var u=r[v].split("=");
if(decodeURIComponent(u[0])==t){var q=decodeURIComponent(u[1]);
return q
}}}return undefined
}var c=this.gallery.id.indexOf("newsweek")===-1?"db":"nw",g="Gallery 2",f=c+" - "+g+" - "+this.gallery.title;
var p=k("source");
if(p){var m=k("account");
var d=k("medium");
dailybeast.analytics.trackSocialMedia(f,p,m,d)
}var o=k("ref");
var j=window.location.protocol+"//"+window.location.host+this.gallery.slides[this.slideIndex].url,n=this.gallery.id.replace("/content",""),h="";
a.each(this.gallery.tags,function(r,q){if(h===""){h=q.id
}else{h+="|"+q.id
}});
var e;
e=dailybeast.metatags.getPlatform();
if(!l){l=this.referringUrl
}dailybeast.analytics.trackPageview({pageNum:this.slideIndex,url:j,referer:l,pageName:f,previousPageName:this.previousPageTitle,templateName:this.gallery.type,contentPath:n,wrapName:this.gallery.wrap,tags:h,platform:e,campaignTracking:o})
},resize:function(){var m=a(window).height(),d=this.$gallery.find(".gallery-content").width(),f=this.$gallery.find(".heading").outerHeight(true),k=this.$gallery.find(".info-thbnail-wrapper").outerHeight(true),h=this.$gallery.find(".heading-slide").outerHeight(),c=this.$gallery.find(".ad-aside").outerHeight(true),l=(m-f-25)-(h+c),e=this.$gallery.find(".ad-fullscreen").outerHeight(true),j=this.$gallery.find(".main").width(),g=m-k-10-e;
if(!this.fullScreen){this.$gallery.find(".text").css("height",l);
g=m-f-k-10
}this.$gallery.find(".img-canvas-wrapper, .img-canvas").css({height:g,width:j});
this.$image.css({"max-height":g,"max-width":j});
this.viewAllView.resize(d,m-f);
this.updateImageSize()
},attachEvents:function(){var d=this;
d.previousPageTitle=d.getBrowserTitle();
this.$image.one("load",function(){if(!d.updatingImage&&a(this).css("visibility")==="hidden"){d.showImageCanvasAndText()
}});
this.$gallery.on("click.GalleryView","a[href]",function(){var e=a(this).attr("href");
if(d.isSameGallery(e)&&d.getCurrentRelativeUrl()!==e){d.showInterstitialAdIfAppropriate()
}else{if(Modernizr.history&&GalleryUrlUtil.isAGallery(e)){d.loadGallery(e,true);
return false
}}});
this.viewAllView=new ViewAllView(this.$gallery.find(".gallery-content"),this.gallery.slides);
var c=new PagedDataProvider(function(g,f){var e=d.gallery.id+".related-gallery."+g+"."+f+".json";
a.log("fetching related galleries data from "+e);
return e
},{pageSize:50,eager:true,eagerness:0.4,listProperty:"galleries"});
this.moreGalleriesView=new MoreGalleriesView(this.$gallery.find(".heading"),c);
this.$imageCanvasWrapper.find(".next").click(function(){d.next();
dailybeast.analytics.trackGalleryClick("NEXT",d.fullScreen);
return false
});
this.$imageCanvasWrapper.find(".previous").click(function(){d.previous();
dailybeast.analytics.trackGalleryClick("PREVIOUS",d.fullScreen);
return false
});
this.updateButtons();
this.$imageCanvasWrapper.find(".next, .previous").focus(function(){a(this).blur()
});
this.$gallery.find(".enter-fullscreen-button").click(function(){d.moreGalleriesView.close();
d.enterFullScreen();
dailybeast.analytics.trackGalleryClick("FULLSCREEN",d.fullScreen);
return false
});
this.$gallery.find(".exit-fullscreen-button").click(function(){d.exitFullScreen();
dailybeast.analytics.trackGalleryClick("EXITFULLSCREEN",d.fullScreen);
return false
});
this.$gallery.find(".captions-button").click(function(){if(d.captions){d.showCaptions();
dailybeast.analytics.trackGalleryClick("SHOWCAPTIONS",d.fullScreen)
}else{dailybeast.analytics.trackGalleryClick("HIDECAPTIONS",d.fullScreen);
d.hideCaptions()
}return false
});
this.$gallery.find(".heading .btn-close-x").click(function(){d.close();
d.header.popBrowserTitle();
return false
});
this.$gallery.on("click.GalleryView",".aside .btn-close-x",function(){d.hideCaptions();
dailybeast.analytics.trackGalleryClick("HIDECAPTIONS-X",d.fullScreen);
return false
});
this.thumbnailView=new ThumbnailView(this.gallery.slides,this.slideIndex,this.gallery.introSlide);
this.header=new GalleryHeader();
this.relatedGalleriesView=new RelatedGalleriesView(this,c,this.header);
this.shareTools=new ShareTools(this.$gallery.find(".sharetools"))
},getCurrentRelativeUrl:function(){return window.location.pathname+window.location.hash
},checkHash:function(){return window.location.hash&&this.renderUrl(this.getCurrentRelativeUrl())
},next:function(){if(this.slideIndex+1<this.slideCount){this.renderSlide(this.slideIndex+1)
}else{this.referringUrl=a(location).attr("href");
window.location.hash="endSlide"
}},previous:function(){if(this.slideIndex-1>=0){this.renderSlide(this.slideIndex-1)
}},updateButtons:function(){var c=this.$imageCanvasWrapper.find(".previous");
if(this.slideIndex===0){c.hide()
}else{c.show()
}},showViewAll:function(){this.hideContent();
this.shareTools.hide();
this.hideImageCanvasAndText();
this.moreGalleriesView.close();
this.viewAllView.show(this.slideIndex);
this.resize();
dailybeast.analytics.trackGalleryClick("VIEWALL",this.fullScreen)
},showEndSlide:function(){var c=this;
dailybeast.analytics.trackGalleriesCompleteClick(this.referringUrl);
if(this.fullScreen){this.exitFullScreen()
}this.unbindWindowAndDocumentEvents();
this.moreGalleriesView.hide(function(){c.relatedGalleriesView.render()
})
},renderSlide:function(d,c){this.referringUrl=a(location).attr("href");
if(this.viewAllView){this.showContent();
this.viewAllView.hide()
}if(!this.fullScreen&&this.shareTools){this.shareTools.show()
}if(this.slideIndex!==d){this.slideIndex=d;
var e=this.gallery.slides[d];
this.setSlideHash();
this.thumbnailView.highlight(this.slideIndex);
this.updateImage(e,true);
this.$image.attr("alt",e.title);
if(c===undefined||c){this.showInterstitialAdIfAppropriate()
}}},renderUrl:function(d){var e=false;
if(d.indexOf("#viewAll")!==-1){this.showViewAll();
e=true
}else{if(d.indexOf("#endSlide")!==-1){this.showEndSlide();
e=true
}else{var c=this.slideUrlMapping[d];
if(c===undefined&&this.isSameGallery(d)){c=0
}if(c!==undefined&&c!==this.slideIndex){this.renderSlide(c,false);
e=true
}}}return e
},setSlideHash:function(){if(window.location.hash!==""||this.slideIndex!==0){var c=this.gallery.slides[this.slideIndex].url,d=c.lastIndexOf("#");
if(d!==-1){window.location.hash=c.substr(d+1,c.length)
}}},pushState:function(){var c=this.gallery.slides[this.slideIndex].url;
if(this.getCurrentRelativeUrl()!==c){history.pushState({galleryUrl:this.gallery.url,slideIndex:this.slideIndex},this.gallery.title,c)
}},preloadSlideImage:function(f){if(0<=f&&f<this.slideCount){var c=this.gallery.slides[f],d=this.IMAGE_SIZES[this.imageSizeIndex],e=c.image;
if(e.sizes&&e.sizes[d]!==undefined){a.log("preloading "+e.sizes[d]);
new Image().src=e.sizes[d]
}}},finishUpdateImage:function(h,d){var c=this,g=this.gallery.slides[this.slideIndex],e=this.IMAGE_SIZES[this.imageSizeIndex],f=g.image.sizes[e],j;
if(h===f){a.log("Rendering the rest of the slide");
this.hideImageCanvasAndText();
if(d){j=this.galleryContext.push(g,this.slideIndex,this.slideCount);
replaceTemplate("dailybeast/components/gallery2/info",j,this.$gallery.find(".info"));
renderTemplate("dailybeast/components/gallery2/aside",j,function(k){c.$gallery.find(".copy").replaceWith(k);
c.resize()
})
}c.$imageCanvas.find("img").attr("src",f);
this.updatingImage=false;
this.updateButtons();
this.showImageCanvasAndText()
}if(d){this.refreshAds();
this.trackPageView()
}},updateImage:function(j,d){var c=this,e=this.IMAGE_SIZES[this.imageSizeIndex],g=j.image;
if(g.sizes&&g.sizes[e]!==undefined){var h=g.sizes[e];
if(h!==this.$image.attr("src")){this.imageSizeIndexLoaded=this.imageSizeIndex;
a.log("Updating the image to:"+h);
this.showLoading(j,200);
var f=new Image();
a(f).bind("load",function(){c.hideLoading();
c.finishUpdateImage(h,d)
}).bind("error",function(){c.hideLoading()
});
this.updatingImage=true;
f.src=h
}}this.preloadSlideImage(this.slideIndex+1);
this.preloadSlideImage(this.slideIndex-1)
},updateImageSize:function(){var d=this.computeImageSizeIndex();
if(this.first||d>this.imageSizeIndexLoaded){this.first=false;
a.log("image size index increased - updating image now");
this.imageSizeIndex=d;
var c=this.gallery.slides[this.slideIndex];
this.updateImage(c)
}else{this.imageSizeIndex=d
}},computeImageSizeIndex:function(){var c=this.$imageCanvas.width();
return Math.min(Math.floor(c/this.IMAGE_SIZE_DIVISOR),this.IMAGE_SIZES.length-1)
},showContent:function(){this.$gallery.find(".content").show()
},hideContent:function(){this.$gallery.find(".content").hide()
},initAds:function(){dailybeast.advertising.init("#gallery")
},refreshAds:function(){var c=Math.random().toString();
c=c.substring(2,c.length);
this.$gallery.find(".ad-aside, .ad-footer, .ad-fullscreen-tracker").advertising("refresh",c)
},getSlideUrlMapping:function(c){var e={},d=0;
a.each(c.slides,function(){e[this.url]=d++
});
return e
},showInterstitialAdIfAppropriate:function(){if(!this.fullScreen&&!this.shownInterstitial&&++this.clickCount>4){a.log("displaying interstitial ad");
var c=this.$gallery.find(".ad-interstitial").show();
dailybeast.advertising.refresh(c);
this.shownInterstitial=true
}},enterFullScreen:function(){var c=this;
this.$gallery.fullScreen({callback:function(d){c.onFullScreenChange(d)
},fullscreenClass:"fullscreen",fakeFullscreen:true})
},exitFullScreen:function(){this.$gallery.cancelFullScreen()
},onFullScreenChange:function(c){this.fullScreen=c;
if(c){this.$gallery.find(".text").css("height","auto");
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
},moveAside:function(){var c=this.$gallery.find(".aside");
c.find("div[data-advertising] iframe").remove();
this.$imageCanvasWrapper.append(c)
},moveAsideBack:function(){this.$gallery.find(".aside").insertAfter(this.$gallery.find(".main")).show()
},showCaptions:function(){this.$gallery.find(".aside").slideDown();
this.$gallery.find(".captions-button").html("Hide Captions");
this.captions=false
},hideCaptions:function(){this.$gallery.find(".aside").slideUp();
this.$gallery.find(".captions-button").html("Show Captions");
this.captions=true
},close:function(){if(this.settings.onClose){a(window).unbind(".galleryView");
a(document).unbind(".galleryView");
this.settings.onClose()
}},isSameGallery:function(c){return this.isSameUrl(c,this.gallery.url)
},isSameUrl:function(d,c){d=d.match(/(https?:\/\/[^\/]*)?([^\.]*)/i)[2];
return c.indexOf(d)>=0
},showImageCanvasAndText:function(){this.$imageCanvas.stop(true,true).fadeTo(0,0).css("visibility","visible").fadeTo(300,1);
this.$gallery.find(".aside .copy").stop(true,true).fadeTo(0,0).css("visibility","visible").fadeTo(300,1)
},hideImageCanvasAndText:function(){this.$imageCanvas.stop(true,true).fadeTo(0,0).css("visibility","hidden").fadeTo(300,0);
this.$gallery.find(".aside .copy").stop(true,true).fadeTo(0,0).css("visibility","hidden").fadeTo(300,0)
},getBrowserTitle:function(){return a("title").html()
},showLoading:function(e,d){var c=this;
this.loadingSlide=e;
setTimeout(function(){if(c.loadingSlide===e){c.$imageCanvas.addClass("gallery-loader").find("img").addClass("loading")
}},d!==undefined?d:1)
},hideLoading:function(){this.loadingSlide=null;
this.$imageCanvas.removeClass("gallery-loader").find("img").removeClass("loading")
},assignDomElements:function(){this.$gallery=a("#gallery");
this.$imageCanvasWrapper=this.$gallery.find(".img-canvas-wrapper");
this.$imageCanvas=this.$gallery.find(".img-canvas");
this.$image=this.$imageCanvas.find("img")
},animateHeader:function(){var d=this,g=this.$gallery.find(".heading"),c=false,f=true,e=function(){g.animate({top:-g.outerHeight(true)},400);
f=false
};
this.headerTimeout=setTimeout(e,2000);
this.$gallery.bind("mousemove.fullscreenView",function(){if(!f&&!c){c=true;
g.animate({top:0},400,function(){c=false;
f=true
})
}clearTimeout(d.headerTimeout);
d.headerTimeout=setTimeout(e,2000)
})
},stopHeader:function(){clearTimeout(this.headerTimeout);
this.$gallery.unbind("mousemove.fullscreenView");
this.$gallery.find(".heading").stop(true,true).css("top","")
}};
window.GalleryView=b
})(jQuery);
(function(b){function a(c,d){this.$parent=c;
this.busy=false;
this.expanded=false;
this.grid=new FlexibleGrid(c,d,{itemHeight:163,itemWidth:171,mainTemplate:"dailybeast/components/gallery2/moregalleries/main",pageTemplate:"dailybeast/components/gallery2/moregalleries/page",itemsTemplate:"dailybeast/components/gallery2/moregalleries/galleries",afterNext:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESNEXT")
},afterPrevious:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESPREVIOUS")
},afterRender:function(){b(".more-galleries").lazyImage()
}});
this.grid.show();
this.attachEvents()
}a.prototype={attachEvents:function(){var c=this;
this.$parent.find(".more-gallery").click(function(){if(!c.busy){if(c.expanded){c.close()
}else{c.open();
dailybeast.analytics.trackGalleryClick("MOREGALLERIES",false)
}}return false
});
b("#gallery .more-galleries").on("click","li a",function(){dailybeast.analytics.trackMoreGalleriesConversionClick("MOREGALLERIES",b(location).attr("href"),b(this).context.protocol+"//"+b(this).context.host+b(this).attr("href"))
})
},bindWindowEvents:function(){this.grid.bindWindowEvents()
},unbindWindowEvents:function(){this.grid.unbindWindowEvents()
},hide:function(c){this.close(c);
this.$parent.find(".more-gallery").hide()
},show:function(){this.$parent.find(".more-gallery").show()
},open:function(d){this.busy=true;
var c=this;
this.$parent.find(".more-galleries").slideDown("slow",function(){if(d!==undefined){d.call(null)
}c.busy=false
});
this.grid.resize();
this.expanded=true
},close:function(d){this.busy=true;
var c=this;
this.$parent.find(".more-galleries").slideUp("slow",function(){if(d!==undefined){d.call(null)
}c.busy=false
});
this.expanded=false
}};
window.MoreGalleriesView=a
})(jQuery);
(function(b){function a(c,d,e){this.galleryView=c;
this.relatedGalleriesArray=d;
this.header=e;
this.container=null;
this.slider=null;
this.isExpanding=false;
this.isContracting=false;
this.position=0;
this.positionOffset=0;
this.previousButton=null;
this.visibleColumnCount=this.INITIAL_VISIBLE_COLUMN_COUNT;
this.totalGalleries=999999
}a.prototype={MIN_VISIBLE_COLUMN_COUNT:2,MAX_VISIBLE_COLUMN_COUNT:8,LOGICAL_WIDTH:2000,INITIAL_VISIBLE_COLUMN_COUNT:3,FLEX_DURATION:500,COLUMN_COUNT:20,TOTAL_BUTTON_COLUMN_WIDTH:156,OPTIMAL_COLUMN_WIDTH:275,render:function(){var c=this;
renderTemplate("dailybeast/components/gallery2/related/relatedgalleries",baseContext.push(this.galleryView.data),function(e){b("#gallery .gallery-content").html(e);
c.assignDomElements();
c.attachEvents();
c.visibleColumnCount=c.INITIAL_VISIBLE_COLUMN_COUNT;
c.container=b(".related-galleries");
c.slider=c.container.find(".slider");
c.previousButton=b(".gallery-content .previous-button");
c.position=0;
c.positionOffset=0;
c.resize();
c.refreshAd();
c.populateVisibleColumns();
c.header.dimTitle();
var f=b(location).attr("href");
var d=c.galleryView.referringUrl;
dailybeast.analytics.trackPageview({pageNum:c.galleryView.gallery.slideCount,url:f,referer:d})
})
},populateVisibleColumns:function(){this.updateSliderButtons();
var c=this;
var d=this.position;
var f=d*2;
var g=this.position+this.visibleColumnCount;
var e=g*2;
if(f<this.totalGalleries){this.relatedGalleriesArray.get(f,e,function(h,j){c.totalGalleries=j;
c.populateColumns(d,g)
})
}else{this.populateColumns(d,g)
}},populateColumns:function(d,e){for(var c=d;
c<e;
c++){this.populate(c,0);
this.populate(c,1)
}},populate:function(f,g){var d=((f*2)+g)%this.totalGalleries;
var e=this.relatedGalleriesArray.array[d];
if(e!==undefined){var c=this.cells[g][f%this.COLUMN_COUNT];
if(e.imageUrl!==undefined){c.children("img").attr("src",e.imageUrl)
}c.attr("href",e.url);
c.find(".title").html(e.title);
c.css("visibility","visible")
}else{c.css("visibility","hidden")
}},previous:function(){this.moveColumnsLeft(Math.min(this.visibleColumnCount,this.position));
this.position=Math.max(this.position-this.visibleColumnCount,0);
this.populateVisibleColumns();
this.slide(0)
},next:function(){this.position+=this.visibleColumnCount;
this.populateVisibleColumns();
var c=this;
this.slide(this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH,function(){c.moveColumnsRight()
})
},slide:function(c,d){if(c!=0){c*=-1
}this.slider.animate({"margin-left":c+"px"},d)
},updateSliderButtons:function(){if(this.position<=0){this.previousButton.css("visibility","hidden")
}else{this.previousButton.css("visibility","visible")
}},resize:function(){var c=this.getOptimalColumnCount();
if(this.visibleColumnCount<c&&!this.isExpanding&&!this.isContracting){this.isExpanding=true;
this.isContracting=false;
this.expand()
}else{if(this.visibleColumnCount>c&&!this.isContracting&&!this.isExpanding){this.isContracting=true;
this.isExpanding=false;
this.contract()
}}},getOptimalColumnCount:function(){var d=this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH;
var c=Math.round(d/this.OPTIMAL_COLUMN_WIDTH);
c=Math.max(Math.min(c,this.MAX_VISIBLE_COLUMN_COUNT),this.MIN_VISIBLE_COLUMN_COUNT);
return c
},expand:function(){var c=this;
this.visibleColumnCount++;
this.populateVisibleColumns();
this.flex(function(){if(c.visibleColumnCount<c.getOptimalColumnCount()){c.expand()
}else{c.isExpanding=false
}})
},contract:function(){var c=this;
this.visibleColumnCount--;
this.flex(function(){if(c.visibleColumnCount>c.getOptimalColumnCount()){c.contract()
}else{c.isContracting=false
}})
},flex:function(c){var d=(this.LOGICAL_WIDTH/this.visibleColumnCount)+"%";
this.slider.animate({width:d},this.FLEX_DURATION,c)
},getColumnWidth:function(){return(this.container.width()-this.TOTAL_BUTTON_COLUMN_WIDTH)/this.visibleColumnCount
},refreshAd:function(){dailybeast.advertising.init(".related-galleries");
dailybeast.advertising.refresh(b(".related-galleries .ad-related"))
},attachEvents:function(){var c=this;
b(window).off(".relatedGalleries").on("resize.relatedGalleries",function(){c.resize()
});
b(".related-galleries").on("click","a",function(){dailybeast.analytics.trackMoreGalleriesConversionClick("RECIRCULATION",this.baseURI,this.href)
});
b(".related-gallery img").error(function(d){d.currentTarget.src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg"
});
b(".related-galleries .replay-button").click(function(){c.remove();
c.galleryView.reset();
dailybeast.analytics.trackGalleryClick("REPLAY");
return false
});
b(".related-galleries .previous-button").click(function(){c.previous();
dailybeast.analytics.trackGalleryClick("RECIRCULATIONPREVIOUS");
dailybeast.analytics.trackPageview({pageNum:c.galleryView.gallery.slideCount});
return false
});
b(".related-galleries .next-button").click(function(){c.next();
dailybeast.analytics.trackGalleryClick("RECIRCULATIONNEXT");
dailybeast.analytics.trackPageview({pageNum:c.galleryView.gallery.slideCount});
return false
})
},moveColumnsRight:function(){var e=this.position-this.positionOffset;
var d=b(".related-gallery").slice(0,e);
this.resetCells(d);
var c=b(".related-gallery:eq("+(this.COLUMN_COUNT-1)+")");
d.insertAfter(c);
d=b(".related-gallery").slice(this.COLUMN_COUNT,e+this.COLUMN_COUNT);
this.resetCells(d);
c=b(".related-gallery:eq("+((this.COLUMN_COUNT*2)-1)+")");
d.insertAfter(c);
this.positionOffset=this.position;
this.slider.css("margin-left","0px")
},moveColumnsLeft:function(e){var d=b(".related-gallery").slice(this.COLUMN_COUNT-e,this.COLUMN_COUNT);
this.resetCells(d);
var c=b(".related-gallery:eq(0)");
d.insertBefore(c);
d=b(".related-gallery").slice((this.COLUMN_COUNT*2)-e,this.COLUMN_COUNT*2);
this.resetCells(d);
c=b(".related-gallery:eq("+this.COLUMN_COUNT+")");
d.insertBefore(c);
this.positionOffset-=e;
this.slider.css("margin-left",-this.getColumnWidth()*e)
},resetCells:function(c){c.find("img").attr("src","/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg");
c.find(".title").html("LOADING...")
},remove:function(){b(window).off(".relatedGalleries");
b("#gallery .gallery-content").empty()
},assignDomElements:function(){this.cells=new Array();
for(var e=0;
e<2;
e++){this.cells[e]=new Array();
for(var d=0;
d<this.COLUMN_COUNT;
d++){var c=(e*this.COLUMN_COUNT)+d;
this.cells[e][d]=b(".related-gallery:eq("+c+")")
}}}};
window.RelatedGalleriesView=a
})(jQuery);
(function(b){function a(d,c){this.$parent=d;
this.slides=c;
this.grid=new FlexibleGrid(d,new ArrayDataProvider(c),{itemHeight:200,itemWidth:200,minRows:2,minColumns:4,handleResize:false,mainTemplate:"dailybeast/components/gallery2/viewall/main",pageTemplate:"dailybeast/components/gallery2/viewall/page",itemsTemplate:"dailybeast/components/gallery2/viewall/slides",itemsSelector:".view-all-slides",itemsWrapperSelector:".view-all-wrapper",paginationTemplate:"dailybeast/components/gallery2/viewall/pagination",paginationSelector:".view-all-pagination",afterNext:function(){dailybeast.analytics.trackGalleryClick("VIEWALLPREVIOUS")
},afterPrevious:function(){dailybeast.analytics.trackGalleryClick("MOREGALLERIESPREVIOUS")
},afterPagination:function(){dailybeast.analytics.trackGalleryClick("VIEWALLPAGINATION")
},afterRender:function(){b(".view-all-slides").lazyImage()
}})
}a.prototype={resize:function(d,c){this.grid.resize(d,c)
},show:function(c){this.grid.show(c)
},hide:function(){this.grid.hide()
}};
window.ViewAllView=a
})(jQuery);
(function(b){function a(d,c,e){this.capacity=10;
this.duration=500;
this.busy=false;
this.introSlide=e;
this.list=d;
this.count=d.length;
this.index=c;
this.range=this.getRangeFromIndex(this.index);
this.offset=this.range.start;
this.bindEvents();
this.updateButtons();
this.thumbnailWidth=b(".slide-inner-wrapper li:last").outerWidth(true)
}a.prototype={bindEvents:function(){var c=this;
b(".slide-thumbnail-wrapper .next").click(function(){c.next();
dailybeast.analytics.trackGalleryClick("SCRUBBERNEXT");
return false
});
b(".slide-thumbnail-wrapper .previous").click(function(){dailybeast.analytics.trackGalleryClick("SCRUBBERPREVIOUS");
c.previous();
return false
})
},updateButtons:function(){var d=b(".slide-thumbnail-wrapper .previous");
if(this.offset>0){d.show()
}else{d.hide()
}var c=b(".slide-thumbnail-wrapper .next");
if(this.offset+this.capacity<this.count){c.show()
}else{c.hide()
}},render:function(d){var c=this;
renderTemplate("dailybeast/components/gallery2/thumbnails/main",this.getTemplateContext(d.start,d.end),function(e){b(".slide-thumbnail-wrapper").replaceWith(e);
c.range=d;
c.offset=d.start;
c.busy=false;
c.bindEvents();
c.updateButtons()
})
},next:function(){if(!this.busy){var c=this.getRangeFromOffset(this.offset+this.capacity);
this.showRange(c)
}},previous:function(){if(!this.busy){var c=this.getRangeFromOffset(this.offset-this.capacity);
this.showRange(c)
}},showRange:function(e){var d=this;
if(e.start!==this.offset){this.busy=true;
if(this.range.start>e.start||this.range.end<e.end){if(this.range.start-this.capacity<=e.start&&this.range.end+this.capacity>=e.end){var f=e.start;
var c=e.end;
if(this.range.start>e.start&&this.range.start<e.end){c=this.range.start
}if(this.range.end<e.end&&this.range.end>e.start){f=this.range.end
}renderTemplate("dailybeast/components/gallery2/thumbnails/thumbnails",this.getTemplateContext(f,c),function(g){var h=b(".slide-inner-wrapper");
if(c<=d.offset){h.css({left:"-="+(c-f)*d.thumbnailWidth});
h.prepend(g)
}else{h.append(g)
}d.range.start=Math.min(e.start,d.range.start);
d.range.end=Math.max(e.end,d.range.end);
d.scrollTo(e.start)
})
}else{this.render(e)
}}else{this.scrollTo(e.start)
}}else{this.highlightThumbnail()
}},getTemplateContext:function(d,c){return baseContext.push({slides:this.list,thumbnailStart:d,thumbnailEnd:c,currentSlide:this.index,introSlide:this.introSlide})
},scrollTo:function(d){var c=this;
b(".slide-inner-wrapper").animate({left:"+="+((this.offset-d)*this.thumbnailWidth)},this.duration,function(){c.offset=d;
c.highlightThumbnail();
c.updateButtons();
c.busy=false
})
},highlightThumbnail:function(){b(".slide-inner-wrapper li").removeClass("active").eq(this.index-this.range.start).addClass("active")
},highlight:function(c){if(!this.busy){this.index=c;
this.showRange(this.getRangeFromIndex(c))
}},getRangeFromOffset:function(d){var e=Math.max(0,d),c=Math.min(e+this.capacity,this.count);
if(e+this.capacity>this.count){e=Math.max(0,this.count-this.capacity)
}return{start:e,end:c}
},getRangeFromIndex:function(d){var c=Math.min(Math.floor(d/this.capacity+1)*this.capacity,this.count);
return{start:Math.max(0,c-this.capacity),end:c}
}};
window.ThumbnailView=a
})(jQuery);
if(typeof domReady==="undefined"){$.log("applying domReady hack");
domReady=function(b){b()
}
}var ShareTools;
(function(a){ShareTools=function(b){this.$container=b;
this.loadScripts()
};
ShareTools.prototype.refresh=function(b){a.log("refreshing gallery share tools");
if(typeof FB!="undefined"){FB.XFBML.parse();
updateShareNumber();
a(window).scroll()
}if(typeof stButtons!="undefined"){stButtons.locateElements();
a("div.st_email_custom").click(function(){dailybeast.analytics.trackSharetoolClick("EMAIL",window.location.pathname)
})
}if(typeof gapi!="undefined"){if(typeof b!="undefined"){gapi.plusone.go(b)
}else{gapi.plusone.go()
}}if(typeof twttr!="undefined"){twttr.widgets.load()
}if(typeof IN!="undefined"&&typeof IN.parse!="undefined"&&a("#gallery").length===1){IN.parse(a("#gallery")[0])
}};
ShareTools.prototype.loadScripts=function(){if(dailybeast.modes.isAuthorEnvironment){a.log("in author mode so forcing load of sharetools scripts");
head.js("https://apis.google.com/js/plusone.js","http://connect.facebook.net/en_US/all.js","http://platform.twitter.com/widgets.js","http://platform.linkedin.com/in.js",function(){FB.init({appId:"189930913679",status:true,cookie:true,xfbml:true})
})
}};
ShareTools.prototype.show=function(){this.$container.show()
};
ShareTools.prototype.hide=function(){this.$container.hide()
}
})(jQuery);
(function(b){function a(){this.titleElement=b("#gallery .title");
this.browserTitleStack=new Array();
this.flexibleTitle=new FlexibleText(b("#gallery .title-inner-container"),b("#gallery .title-inner-container .title"));
this.attachEvents();
this.flexibleTitle.reset()
}a.prototype={attachEvents:function(){var c=this;
b(window).off(".galleryHeader");
b(window).on("resize.galleryHeader",function(){c.flexibleTitle.update()
});
b(window).on("load.galleryHeader",function(){c.flexibleTitle.reset()
})
},enableFlexibleTitle:function(){this.flexibleTitle.enable();
this.flexibleTitle.reset()
},disableFlexibleTitle:function(){this.flexibleTitle.disable()
},dimTitle:function(){this.titleElement.addClass("dimmed")
},undimTitle:function(){this.titleElement.removeClass("dimmed")
},pushBrowserTitle:function(c){this.browserTitleStack.push(this.getBrowserTitle());
this.setBrowserTitle(c+" - The Daily Beast")
},popBrowserTitle:function(){if(this.browserTitleStack.length>0){this.setBrowserTitle(this.browserTitleStack.pop())
}},getBrowserTitle:function(){return b("title").html()
},setBrowserTitle:function(c){b("title").html(c)
}};
window.GalleryHeader=a
})(jQuery);
$.widget("ui.gallery",{options:{url:"",duration:5,display:"window",enableAutoPlay:false,interstitials:[],indexText:"{0} / {1}",countdownText:"{0} seconds left",bylineText:'<span class="slide-byline" property="dc:creator">{0}</span>',containers:{slide:null,endSlide:null,viewAll:null,interstitial:null,intro:$(".gallery-intro")},elements:{next:null,previous:null,pause:null,play:null,index:null,title:null,description:null,byline:null,countdown:null,replay:null,viewAll:null,thumbnail:null,start:$("a.gallery-start")}},_create:function(){$(".gallery-ad div[data-advertising]").bind("DOMSubtreeModified",function(){$(".gallery-ad").each(function(){var b=$(".ad",this).height();
if($(".ad",this).height()>5&&b>5){$(this).css("min-height",b)
}})
});
this._currentIndex=this._getInitialCurrentIndex();
this._timer=null;
this._paused=!this.options.enableAutoPlay;
var a=this;
$.ajax({url:this.options.url,dataType:"json",success:function(c){a._title=c.title||null;
a._path=c.path;
a._slides=c.slides||null;
a._subTemplate="slide";
if(a._slides){a._bindElements();
a._openShow()
}var d=window.location.hash;
if(d.indexOf("#slide")!=-1){var b=parseInt(d.replace("#slide",""));
if(b>0){$(".gallery-start").click();
a._show(b-1,true)
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
},show:function(a){this._show(a)
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
if(this._currentIndex+1!=this._getLength()){var b=this.options.duration*1000;
this._startCountdown();
var a=this;
this._timer=setTimeout(function(){if(a._countdownInterval){clearInterval(a._countdownInterval)
}a._next()
},b)
}$(this.options.elements.play).hide();
$(this.options.elements.pause).show();
this._trigger("played",null,this._getState())
},_next:function(){var a=this._currentIndex+1;
if(a<this._getLength()){var c=$(this.options.containers.interstitial);
var b=(c.length>0&&!(c.is(":visible"))&&($.inArray(a,this.options.interstitials)>=0));
if(b){this._showInterstitial()
}else{if(c.is(":visible")&&$.inArray(this._currentIndex,this.options.interstitials)>=0){a--
}this._show(a)
}}},_setSlideIndex:function(a){window.location.hash="slide"+(a+1)
},_previous:function(){var a=this._currentIndex-1;
if(a>=0){var c=$(this.options.containers.interstitial);
var b=(c.length>0&&!(c.is(":visible"))&&($.inArray(this._currentIndex,this.options.interstitials)>=0));
if(b){this._showInterstitial()
}else{if(c.is(":visible")&&$.inArray(this._currentIndex+1,this.options.interstitials)>=0){a++
}this._show(a)
}}},_clearTimer:function(){clearTimeout(this._timer);
this._timer=null
},_bindElements:function(){var a=this;
var b=this.options.elements;
$(b.next).live("click",function(c){c.preventDefault();
a._next()
});
$(b.previous).live("click",function(c){c.preventDefault();
a._previous()
});
$(b.pause).live("click",function(c){c.preventDefault();
a._pause()
});
$(b.play).live("click",function(c){c.preventDefault();
a._play()
});
$(b.replay).live("click",function(c){c.preventDefault();
a._show(0)
});
$(b.thumbnail).live("click",function(d){d.preventDefault();
var c=$(d.target).index();
a._show(c)
});
$(b.viewAll).live("click",function(c){c.preventDefault();
a._showViewAll()
});
$(b.start).live("click",function(c){c.preventDefault();
a._startGallery()
})
},_getLength:function(){var a=this._slides.length;
if(this.options.containers.endSlide!=null){a++
}return a
},_getState:function(){var a={index:this._currentIndex,length:this._slides.length,container:this._activeContainer,display:this.options.display};
if(this.options.containers.endSlide!=null){a.length++
}return a
},_isFirstSlide:function(){if($(this.options.containers.interstitial).is(":visible")){return false
}return(this._currentIndex==0)
},_isLastSlide:function(){if($(this.options.containers.interstitial).is(":visible")){return false
}var a=this._slides.length-1;
if(_.hasValue(this.options.containers.endSlide)){a++
}return(this._currentIndex==a)
},_preload:function(b){var c=this;
if(c._slides[b]){var a=new Image();
a.src=c._slides[b].imageUrl
}},_show:function(b,c){this._clearTimer();
if(b<this._slides.length&&b>=0){this._currentIndex=b;
var a=this._slides[this._currentIndex];
if(!this._paused){this._play()
}var d=$(this.options.containers.slide).find("img");
$(d).attr("src",this._slides[b].imageUrl);
this._preload(this._currentIndex+1);
this._updateElements();
if(!c){this._trigger("updated",null,this._getState())
}if(this._currentIndex==this._slides.length-1&&this.options.containers.endSlide==null){this._pause();
this._trigger("finished",null,this._getState())
}}else{if(b==this._slides.length&&this.options.containers.endSlide!=null){this._currentIndex=b;
this._trigger("updated",null,this._getState());
this._pause();
this._showEndSlide()
}}this._showContainer(this.options.containers.slide);
this._setSlideIndex(b);
this._unhideTitle()
},_showContainer:function(a){if(a!=null){for(var b in this.options.containers){var c=this.options.containers[b];
if(a==c){$(c).show();
this._activeContainer=b
}else{$(c).hide()
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
},_getInitialCurrentIndex:function(){var a=window.location.href.split(".");
var b=a[a.length-2];
var d=new RegExp(/(slide)[0-9]+/i);
var c=0;
if(d.test(b)){c=b.substring(5);
c--
}return c
},_openShow:function(){var a=this;
this._trigger("opened",null,this._getState());
this._startShow()
},_renderCountdown:function(a){if(a==null||a<0){$(this.options.elements.countdown).text("")
}else{if(a-1>=0){$(this.options.elements.countdown).text(this.options.countdownText.replace("{0}",a-1))
}}},_startShow:function(){this._trigger("started",null,this._getState());
this._updateElements();
if(this.options.enableAutoPlay){this._play()
}},_startCountdown:function(){if($(this.options.elements.countdown).length>0){this._stopCountdown();
var b=this.options.duration;
this._renderCountdown(b);
var a=this;
this._countdownInterval=setInterval(function(){b-=1;
a._renderCountdown(b)
},1000)
}},_stopCountdown:function(){if(this._countdownInterval){clearInterval(this._countdownInterval);
this._countdownInterval=null;
this._renderCountdown(null)
}},_updateElements:function(){$(this.options.elements.next).toggleClass("disabled",this._isLastSlide());
$(this.options.elements.previous).toggleClass("disabled",this._isFirstSlide());
var b=this.options.indexText.replace("{0}",this._currentIndex+1).replace("{1}",this._getLength());
$(this.options.elements.index).html(b);
if(_.hasValue(this._slides[this._currentIndex])){var a=this._slides[this._currentIndex];
$(this.options.elements.title).html(a.title||"");
$(this.options.elements.description).html(a.description||"");
if(_.hasValue(a.creator)){var c=this.options.bylineText.replace("{0}",a.creator);
$(this.options.elements.byline).html(c||"")
}else{$(this.options.elements.byline).html("")
}}}});
$.widget("ui.featureslider",{options:{autoplay:true,circular:true,interval:7500,elements:{slider:null,items:null,next:null,prev:null,pause:null,play:null,navigator:null}},_create:function(){var c=this.options;
var b=this.element;
this._elements={};
for(var a in c.elements){this._elements[a]=$(c.elements[a])
}this._index=0;
this._paused=!c.autoplay;
this._slides=null;
$(b).find(c.elements.slider).scrollable({items:c.elements.items,next:c.elements.next,prev:c.elements.prev,circular:c.circular}).autoscroll({autoplay:c.autoplay,interval:c.interval}).navigator({navi:c.elements.navigator});
this._api=this._elements.slider.data("scrollable");
this._bindElements()
},destroy:function(){$.widget.prototype.apply(this,arguments)
},pause:function(){this._pause()
},play:function(){this._play()
},next:function(){this._next()
},previous:function(){this._previous()
},show:function(a){this._show(a)
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
},_bindElements:function(){var a=this;
this._elements.pause.live("click",function(b){b.preventDefault();
a._pause()
});
this._elements.play.live("click",function(b){b.preventDefault();
a._play()
});
$(this.element).hover(function(){a._api.stop()
},function(){if(!a._paused){a._api.play()
}})
},_getState:function(){var b=this;
if(!_.hasValue(this._slides)){this._slides=[];
var a=$(".featureSlider-slide:not(.cloned)");
$(a).each(function(d,e){var c=$(e);
if(c.find("[data-advertising]").length>0){b._slides.push({title:"",text:"Sponsored"})
}else{b._slides.push({title:c.find("h2").text(),text:c.find("p").text()})
}})
}return{index:this._index,slides:this._slides}
},_show:function(a){this._api.show(a);
this._trigger("shown",null,this._getState())
}});
(function(a){a(function(){var b=a("#search-form");
if(b.length==1){a(".type-selector label").click(function(){a("#"+a(this).attr("for")).prop("checked",true);
b.submit()
});
a("#time-filter, #order-filter").change(function(){b.submit()
})
}})
})(jQuery);
$(function(){if($("#vFeatureCenter").length!=0){var k=null;
var a=$("#features li[about]:visible");
var f=$("#features li:first");
var b=$("#playVFeature .play");
var p=$("#playVFeature .pause");
var j=$("#playVFeatureCount span");
var m=$("#features li");
var c=$("#vFeaturePanel ol li");
var n=false;
var l={};
var o={};
function h(){var r=a.next();
if(r.length!=0){a=r
}else{a=f
}}function g(){a.siblings().hide();
a.fadeIn("slow");
$("#vFeatureCenter div[data-advertising]").advertising("refresh",dailybeast.interstitial.getOrd());
var r=a.attr("about");
var t=o[r];
if(t!==undefined){t.siblings().removeClass("on");
t.addClass("on");
j.text(t.index()+1)
}}function e(){clearInterval(k);
k=setInterval(function(){h();
g()
},8000)
}function d(){e();
b.hide();
p.show();
n=false
}function q(){clearInterval(k);
p.hide();
b.show();
n=true
}m.each(function(){var r=$(this);
var t=r.attr("about");
if(t){l[t]=r
}});
c.each(function(){var t=$(this);
var r=t.attr("about");
o[r]=t;
t.mouseenter(function(){if(l[r]!==undefined){a=l[r];
if(!n){e()
}g()
}})
});
p.click(function(r){r.preventDefault();
h();
q()
});
b.click(function(r){r.preventDefault();
g();
d()
});
d()
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
}function coerce(value,type,context){if(value){switch(type||typeof(value)){case"number":return +value;
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
function LRUCache(a){this.size=0;
this.limit=a;
this._keymap={}
}LRUCache.prototype.put=function(a,c){var b={key:a,value:c};
this._keymap[a]=b;
if(this.tail){this.tail.newer=b;
b.older=this.tail
}else{this.head=b
}this.tail=b;
if(this.size===this.limit){return this.shift()
}else{this.size++
}};
LRUCache.prototype.shift=function(){var a=this.head;
if(a){if(this.head.newer){this.head=this.head.newer;
this.head.older=undefined
}else{this.head=undefined
}a.newer=a.older=undefined;
delete this._keymap[a.key]
}return a
};
LRUCache.prototype.get=function(b,a){var c=this._keymap[b];
if(c===undefined){return
}if(c===this.tail){return c.value
}if(c.newer){if(c===this.head){this.head=c.newer
}c.newer.older=c.older
}if(c.older){c.older.newer=c.newer
}c.newer=undefined;
c.older=this.tail;
if(this.tail){this.tail.newer=c
}this.tail=c;
return a?c:c.value
};
LRUCache.prototype.find=function(a){return this._keymap[a]
};
LRUCache.prototype.set=function(a,c){var d,b=this.get(a,true);
if(b){d=b.value;
b.value=c
}else{d=this.put(a,c);
if(d){d=d.value
}}return d
};
LRUCache.prototype.remove=function(a){var b=this._keymap[a];
if(!b){return
}delete this._keymap[b.key];
if(b.newer&&b.older){b.older.newer=b.newer;
b.newer.older=b.older
}else{if(b.newer){b.newer.older=undefined;
this.head=b.newer
}else{if(b.older){b.older.newer=undefined;
this.tail=b.older
}else{this.head=this.tail=undefined
}}}this.size--;
return b.value
};
LRUCache.prototype.removeAll=function(){this.head=this.tail=undefined;
this.size=0;
this._keymap={}
};
if(typeof Object.keys==="function"){LRUCache.prototype.keys=function(){return Object.keys(this._keymap)
}
}else{LRUCache.prototype.keys=function(){var b=[];
for(var a in this._keymap){b.push(a)
}return b
}
}LRUCache.prototype.forEach=function(a,b,d){if(b===true){d=true;
b=undefined
}else{if(typeof b!=="object"){b=this
}}if(d){var c=this.tail;
while(c){a.call(b,c.key,c.value,this);
c=c.older
}}else{var c=this.head;
while(c){a.call(b,c.key,c.value,this);
c=c.newer
}}};
LRUCache.prototype.toJSON=function(){var a=[],b=this.head;
while(b){a.push({key:b.key.toJSON(),value:b.value.toJSON()});
b=b.newer
}return a
};
LRUCache.prototype.toString=function(){var a="",b=this.head;
while(b){a+=String(b.key)+":"+b.value;
if(b=b.newer){a+=" < "
}}return a
};
if(typeof this==="object"){this.LRUCache=LRUCache
}var dailybeast=dailybeast||{};
dailybeast.templating={getDustPartial:function(c,d){var b=this.getDustTemplate(c,d),a=dust.cache[b];
return a?a:null
},getDustTemplate:function(b,c){if(b==undefined||b==null){return null
}var a=b+(c!==undefined?"/"+c:b.substring(b.lastIndexOf("/")));
if(dust.cache[a]){return a
}else{if(dailybeast.componentHierarchy[b]){return this.getDustTemplate(dailybeast.componentHierarchy[b],c)
}}return null
}};
dust.helpers=dust.helpers||{};
dust.helpers.include=function(c,d,b,g){var e=g.resourceType,f=g.path,a=null;
if(e!==undefined){a=dailybeast.templating.getDustPartial(e)
}else{if(f!==undefined){a=dailybeast.templating.getDustPartial(d.get("resourceType"),f)
}}return a?a(c,d):c
};
dust.helpers.versionable=function(h,c,a,e){if(e.url){var g=c.get("buildInfo")["revision"],f=e.url.lastIndexOf("."),j=e.url.substr(f+1),b=e.url.substr(0,f),d;
if(j==="js"||j==="css"){d=b+"."+g+".cached."+j
}else{d=e.url+".dres."+j+"/"+g+".cached."+j
}return h.write(d)
}return h
};
dust.helpers.leadingZero=function(e,f,a,h){if(h.num&&h.places){var d=h.num;
var c=h.places;
var g=c-d.toString().length+1;
var b=new Array(+(g>0&&g)).join("0")+d;
return e.write(b)
}return e
};
dust.helpers.or=function(b,c,a,d){if(d.a||d.b){return b.render(a.block,c)
}return b
};
dust.filters=dust.filters||{};
dust.filters.sh=function(a){console.log("Removing html from: "+a);
return typeof a==="string"?a.replace(/<[^<>]*>/g,""):a
};
(function(){var d="America/New_York",c=new LRUCache(1000),a={fullDate:"MM.DD.YY",mediumDate:"MMM D",mediumDateTime:"MMM D, YYYY h:mm a z",longDateTime:"MMMM D, YYYY h:mm a z",w3cDate:"YYYY-MM-DD",w3cDateTime:"YYYY-MM-DD[T]HH:mm:ssZ"};
function e(g,l,k){var h,f,j;
k=a[k]?a[k]:k;
l=l?l:d;
h=g+l+k;
j=c.get(h);
f=j;
if(!j){f=moment(g).tz(l).format(k);
c.put(h,f)
}return f
}function b(f,k,j){var h={},g;
for(g in j){if(j.hasOwnProperty(g)&&g!=="date"&&g!=="format"&&g!="tz"){h[g]=e(f,k,j[g])
}}return h
}dust.helpers.formatDate=function(h,j,f,l){var g=l.date,k=l.format,m=l.tz;
if(g){if(f.block){h.render(f.block,j.push(b(g,m,l)))
}else{if(k){return h.write(e(g,m,k))
}}}return h
}
})();
var baseContext=dust.makeBase({first:function(b,c,a,d){if(d&&d.of&&d.of.length>0){return b.render(a.block,c.push(d.of[0],0,d.of.length))
}return b
},rest:function(b,c,a,d){return d.of&&d.of.length>1?d.of.slice(1):undefined
},length:function(a,b){return b.stack.of
},slice:function(c,e,b,f){if(f.of!==undefined&&f.start!==undefined&&f.end!==undefined){var g=Math.max(0,f.start),a=Math.min(f.of.length,f.end);
for(var d=g;
d<a;
d++){c.render(b.block,e.push(f.of[d],d,f.of.length))
}}},nth:function(b,c,a,e){if(e){var d=e.of,f=e.n;
if(d&&d.length>f){return b.render(a.block,c.push(d[f],f,d.length))
}}return b
},repeat:function(b,c,a,d){for(i=0;
i<d.count;
i++){b.render(a.block,c)
}},atIndex:function(b,c,a,d){if(d.index==c.stack.index){return b.render(a.block,c)
}return b
},inList:function(b,c,a){if(c.stack.index!==undefined){return b.render(a.block,c)
}else{if(a["else"]){return b.render(a["else"],c)
}}return b
},position:function(a,b){return b.stack.index+1
},isIntro:function(b,c,a){var d=c.get("introSlide")&&c.stack.index==0;
if(d){return b.render(a.block,c)
}else{if(a["else"]){return b.render(a["else"],c)
}}return b
},slideNumber:function(a,b){var d=b.get("introSlide"),c=d&&b.stack.index==0;
return c?"":b.stack.index+(d?0:1)
},listicleNumber:function(c,d){var a=d.get("listicleType"),f=d.get("introSlide"),e=f&&d.stack.index==0,b="";
if(!e){if(a=="DESCENDING"){b=d.stack.of-d.stack.index
}else{if(a=="ASCENDING"){b=d.stack.index+(f?0:1)
}}}return b
},totalSlides:function(a,b){return b.get("slideCount")-(b.get("introSlide")?1:0)
},columns:function(m,e,b,h){var k=h.items,d=h.width,c=h.style,a=[h.evenStyle,c].join(" "),l=[h.oddStyle,c].join(" "),g=[],j,f;
for(j=0;
j<d;
j++){g[j]={items:[],style:(j%2===0?a:l)}
}for(j=0,f=k.length;
j<f;
j++){g[j%d].items.push(k[j])
}for(j=0;
j<d;
j++){m.render(b.block,e.push(g[j],j,d))
}}});
if(!Array.prototype.forEach){Array.prototype.forEach=function(d,c){for(var b=0,a=this.length;
b<a;
++b){d.call(c,this[b],b,this)
}}
}(function(r){var Y,A="1.7.2",ac=Math.round,ae,Q={},E="en",P=(typeof module!=="undefined"&&module.exports),p="months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),x=/^\/?Date\((\-?\d+)/i,l=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g,q=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g,af=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,g=/\d\d?/,R=/\d{1,3}/,S=/\d{3}/,J=/\d{1,4}/,K=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,b=/Z|[\+\-]\d\d:?\d\d/i,t=/T/i,L=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,d="YYYY-MM-DDTHH:mm:ssZ",j=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],C=/([\+\-]|\d\d)/gi,n="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Z={Milliseconds:1,Seconds:1000,Minutes:60000,Hours:3600000,Days:86400000,Months:2592000000,Years:31536000000},m={},G="DDD w M D d".split(" "),v="M D H h m s w".split(" "),h={M:function(){return this.month()+1
},MMM:function(ah){return w("monthsShort",this.month(),this,ah)
},MMMM:function(ah){return w("months",this.month(),this,ah)
},D:function(){return this.date()
},DDD:function(){var ai=new Date(this.year(),this.month(),this.date()),ah=new Date(this.year(),0,1);
return ~~(((ai-ah)/86400000)+1.5)
},d:function(){return this.day()
},dd:function(ah){return w("weekdaysMin",this.day(),this,ah)
},ddd:function(ah){return w("weekdaysShort",this.day(),this,ah)
},dddd:function(ah){return w("weekdays",this.day(),this,ah)
},w:function(){var ai=new Date(this.year(),this.month(),this.date()-this.day()+5),ah=new Date(ai.getFullYear(),0,4);
return ~~((ai-ah)/86400000/7+1.5)
},YY:function(){return ab(this.year()%100,2)
},YYYY:function(){return ab(this.year(),4)
},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),true)
},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),false)
},H:function(){return this.hours()
},h:function(){return this.hours()%12||12
},m:function(){return this.minutes()
},s:function(){return this.seconds()
},S:function(){return ~~(this.milliseconds()/100)
},SS:function(){return ab(~~(this.milliseconds()/10),2)
},SSS:function(){return ab(this.milliseconds(),3)
},Z:function(){var ai=-this.zone(),ah="+";
if(ai<0){ai=-ai;
ah="-"
}return ah+ab(~~(ai/60),2)+":"+ab(~~ai%60,2)
},ZZ:function(){var ai=-this.zone(),ah="+";
if(ai<0){ai=-ai;
ah="-"
}return ah+ab(~~(10*ai/6),4)
}};
function w(aj,ai,ah,ak){var al=ah.lang();
return al[aj].call?al[aj](ah,ak):al[aj][ai]
}function N(ai,ah){return function(aj){return ab(ai.call(this,aj),ah)
}
}function H(ah){return function(aj){var ai=ah.call(this,aj);
return ai+this.lang().ordinal(ai)
}
}while(G.length){ae=G.pop();
h[ae+"o"]=H(h[ae])
}while(v.length){ae=v.pop();
h[ae+ae]=N(h[ae],2)
}h.DDDD=N(h.DDD,3);
function u(ai,ah,aj){this._d=ai;
this._isUTC=!!ah;
this._a=ai._a||null;
this._lang=aj||false
}function ag(ak){var am=this._data={},an=ak.years||ak.y||0,ai=ak.months||ak.M||0,ah=ak.weeks||ak.w||0,aq=ak.days||ak.d||0,ao=ak.hours||ak.h||0,al=ak.minutes||ak.m||0,ap=ak.seconds||ak.s||0,aj=ak.milliseconds||ak.ms||0;
this._milliseconds=aj+ap*1000+al*60000+ao*3600000;
this._days=aq+ah*7;
this._months=ai+an*12;
am.milliseconds=aj%1000;
ap+=X(aj/1000);
am.seconds=ap%60;
al+=X(ap/60);
am.minutes=al%60;
ao+=X(al/60);
am.hours=ao%24;
aq+=X(ao/24);
aq+=ah*7;
am.days=aq%30;
ai+=X(aq/30);
am.months=ai%12;
an+=X(ai/12);
am.years=an;
this._lang=false
}function X(ah){if(ah<0){return Math.ceil(ah)
}else{return Math.floor(ah)
}}function ab(aj,ai){var ah=aj+"";
while(ah.length<ai){ah="0"+ah
}return ah
}function U(aj,al,ak){var ai=al._milliseconds,am=al._days,an=al._months,ah;
if(ai){aj._d.setTime(+aj+ai*ak)
}if(am){aj.date(aj.date()+am*ak)
}if(an){ah=aj.date();
aj.date(1).month(aj.month()+an*ak).date(Math.min(ah,aj.daysInMonth()))
}}function D(ah){return Object.prototype.toString.call(ah)==="[object Array]"
}function T(al,ak){var ah=Math.min(al.length,ak.length),ai=Math.abs(al.length-ak.length),am=0,aj;
for(aj=0;
aj<ah;
aj++){if(~~al[aj]!==~~ak[aj]){am++
}}return am+ai
}function k(ai,an,am,al){var ak,aj,ah=[];
for(ak=0;
ak<7;
ak++){ah[ak]=ai[ak]=(ai[ak]==null)?(ak===2?1:0):ai[ak]
}ai[7]=ah[7]=an;
if(ai[8]!=null){ah[8]=ai[8]
}ai[3]+=am||0;
ai[4]+=al||0;
aj=new Date(0);
if(an){aj.setUTCFullYear(ai[0],ai[1],ai[2]);
aj.setUTCHours(ai[3],ai[4],ai[5],ai[6])
}else{aj.setFullYear(ai[0],ai[1],ai[2]);
aj.setHours(ai[3],ai[4],ai[5],ai[6])
}aj._a=ah;
return aj
}function z(ak,ai){var aj,ah,al=[];
if(!ai&&P){ai=require("./lang/"+ak)
}for(aj=0;
aj<p.length;
aj++){ai[p[aj]]=ai[p[aj]]||Q.en[p[aj]]
}for(aj=0;
aj<12;
aj++){ah=Y([2000,aj]);
al[aj]=new RegExp("^"+(ai.months[aj]||ai.months(ah,""))+"|^"+(ai.monthsShort[aj]||ai.monthsShort(ah,"")).replace(".",""),"i")
}ai.monthsParse=ai.monthsParse||al;
Q[ak]=ai;
return ai
}function y(ah){var ai=(typeof ah==="string")&&ah||ah&&ah._lang||null;
return ai?(Q[ai]||z(ai)):Y
}function I(ah){if(ah.match(/\[.*\]/)){return ah.replace(/^\[|\]$/g,"")
}return ah.replace(/\\/g,"")
}function W(aj){var ak=aj.match(l),ah,ai;
for(ah=0,ai=ak.length;
ah<ai;
ah++){if(h[ak[ah]]){ak[ah]=h[ak[ah]]
}else{ak[ah]=I(ak[ah])
}}return function(am){var al="";
for(ah=0;
ah<ai;
ah++){al+=typeof ak[ah].call==="function"?ak[ah].call(am,aj):ak[ah]
}return al
}
}function O(ah,ak){var ai=5;
function aj(al){return ah.lang().longDateFormat[al]||al
}while(ai--&&q.test(ak)){ak=ak.replace(q,aj)
}if(!m[ak]){m[ak]=W(ak)
}return m[ak](ah)
}function f(ah){switch(ah){case"DDDD":return S;
case"YYYY":return J;
case"S":case"SS":case"SSS":case"DDD":return R;
case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return K;
case"Z":case"ZZ":return b;
case"T":return t;
case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return g;
default:return new RegExp(ah.replace("\\",""))
}}function e(am,ak,aj,al){var ai,ah;
switch(am){case"M":case"MM":aj[1]=(ak==null)?0:~~ak-1;
break;
case"MMM":case"MMMM":for(ai=0;
ai<12;
ai++){if(y().monthsParse[ai].test(ak)){aj[1]=ai;
ah=true;
break
}}if(!ah){aj[8]=false
}break;
case"D":case"DD":case"DDD":case"DDDD":if(ak!=null){aj[2]=~~ak
}break;
case"YY":aj[0]=~~ak+(~~ak>70?1900:2000);
break;
case"YYYY":aj[0]=~~Math.abs(ak);
break;
case"a":case"A":al.isPm=((ak+"").toLowerCase()==="pm");
break;
case"H":case"HH":case"h":case"hh":aj[3]=~~ak;
break;
case"m":case"mm":aj[4]=~~ak;
break;
case"s":case"ss":aj[5]=~~ak;
break;
case"S":case"SS":case"SSS":aj[6]=~~(("0."+ak)*1000);
break;
case"Z":case"ZZ":al.isUTC=true;
ai=(ak+"").match(C);
if(ai&&ai[1]){al.tzh=~~ai[1]
}if(ai&&ai[2]){al.tzm=~~ai[2]
}if(ai&&ai[0]==="+"){al.tzh=-al.tzh;
al.tzm=-al.tzm
}break
}if(ak==null){aj[8]=false
}}function M(aj,an){var ah=[0,0,1,0,0,0,0],ai={tzh:0,tzm:0},am=an.match(l),ak,al;
for(ak=0;
ak<am.length;
ak++){al=(f(am[ak]).exec(aj)||[])[0];
if(al){aj=aj.slice(aj.indexOf(al)+al.length)
}if(h[am[ak]]){e(am[ak],al,ah,ai)
}}if(ai.isPm&&ah[3]<12){ah[3]+=12
}if(ai.isPm===false&&ah[3]===12){ah[3]=0
}return k(ah,ai.isUTC,ai.tzh,ai.tzm)
}function B(al,an){var ai,ao=al.match(af)||[],am,ap=99,ak,ah,aj;
for(ak=0;
ak<an.length;
ak++){ah=M(al,an[ak]);
am=O(new u(ah),an[ak]).match(af)||[];
aj=T(ao,am);
if(aj<ap){ap=aj;
ai=ah
}}return ai
}function aa(ah){var aj="YYYY-MM-DDT",ai;
if(L.exec(ah)){for(ai=0;
ai<4;
ai++){if(j[ai][1].exec(ah)){aj+=j[ai][0];
break
}}return b.exec(ah)?M(ah,aj+" Z"):M(ah,aj)
}return new Date(ah)
}function V(ai,ak,aj,al,am){var ah=am.relativeTime[ai];
return(typeof ah==="function")?ah(ak||1,!!aj,ai,al):ah.replace(/%d/i,ak||1)
}function F(aj,ah,ai){var ao=ac(Math.abs(aj)/1000),ak=ac(ao/60),an=ac(ak/60),ap=ac(an/24),al=ac(ap/365),am=ao<45&&["s",ao]||ak===1&&["m"]||ak<45&&["mm",ak]||an===1&&["h"]||an<22&&["hh",an]||ap===1&&["d"]||ap<=25&&["dd",ap]||ap<=45&&["M"]||ap<345&&["MM",ac(ap/30)]||al===1&&["y"]||["yy",al];
am[2]=ah;
am[3]=aj>0;
am[4]=ai;
return V.apply({},am)
}Y=function(ai,ak){if(ai===null||ai===""){return null
}var aj,ah;
if(Y.isMoment(ai)){return new u(new Date(+ai._d),ai._isUTC,ai._lang)
}else{if(ak){if(D(ak)){aj=B(ai,ak)
}else{aj=M(ai,ak)
}}else{ah=x.exec(ai);
aj=ai===r?new Date():ah?new Date(+ah[1]):ai instanceof Date?ai:D(ai)?k(ai):typeof ai==="string"?aa(ai):new Date(ai)
}}return new u(aj)
};
Y.utc=function(ah,ai){if(D(ah)){return new u(k(ah,true),true)
}if(typeof ah==="string"&&!b.exec(ah)){ah+=" +0000";
if(ai){ai+=" Z"
}}return Y(ah,ai).utc()
};
Y.unix=function(ah){return Y(ah*1000)
};
Y.duration=function(ah,al){var ak=Y.isDuration(ah),aj=(typeof ah==="number"),am=(ak?ah._data:(aj?{}:ah)),ai;
if(aj){if(al){am[al]=ah
}else{am.milliseconds=ah
}}ai=new ag(am);
if(ak){ai._lang=ah._lang
}return ai
};
Y.humanizeDuration=function(ah,ai,aj){return Y.duration(ah,ai===true?null:ai).humanize(ai===true?true:aj)
};
Y.version=A;
Y.defaultFormat=d;
Y.lang=function(aj,ah){var ai;
if(!aj){return E
}if(ah||!Q[aj]){z(aj,ah)
}if(Q[aj]){for(ai=0;
ai<p.length;
ai++){Y[p[ai]]=Q[aj][p[ai]]
}Y.monthsParse=Q[aj].monthsParse;
E=aj
}};
Y.langData=y;
Y.isMoment=function(ah){return ah instanceof u
};
Y.isDuration=function(ah){return ah instanceof ag
};
Y.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:function(ah,ai,aj){if(ah>11){return aj?"pm":"PM"
}else{return aj?"am":"AM"
}},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(ai){var ah=ai%10;
return(~~(ai%100/10)===1)?"th":(ah===1)?"st":(ah===2)?"nd":(ah===3)?"rd":"th"
}});
Y.fn=u.prototype={clone:function(){return Y(this)
},valueOf:function(){return +this._d
},unix:function(){return Math.floor(+this._d/1000)
},toString:function(){return this._d.toString()
},toDate:function(){return this._d
},toArray:function(){var ah=this;
return[ah.year(),ah.month(),ah.date(),ah.hours(),ah.minutes(),ah.seconds(),ah.milliseconds(),!!this._isUTC]
},isValid:function(){if(this._a){if(this._a[8]!=null){return !!this._a[8]
}return !T(this._a,(this._a[7]?Y.utc(this._a):Y(this._a)).toArray())
}return !isNaN(this._d.getTime())
},utc:function(){this._isUTC=true;
return this
},local:function(){this._isUTC=false;
return this
},format:function(ah){return O(this,ah?ah:Y.defaultFormat)
},add:function(ah,aj){var ai=aj?Y.duration(+aj,ah):Y.duration(ah);
U(this,ai,1);
return this
},subtract:function(ah,aj){var ai=aj?Y.duration(+aj,ah):Y.duration(ah);
U(this,ai,-1);
return this
},diff:function(ao,aj,aq){var ah=this._isUTC?Y(ao).utc():Y(ao).local(),al=(this.zone()-ah.zone())*60000,ap=this._d-ah._d-al,an=this.year()-ah.year(),am=this.month()-ah.month(),ak=this.date()-ah.date(),ai;
if(aj==="months"){ai=an*12+am+ak/30
}else{if(aj==="years"){ai=an+(am+ak/30)/12
}else{ai=aj==="seconds"?ap/1000:aj==="minutes"?ap/60000:aj==="hours"?ap/3600000:aj==="days"?ap/86400000:aj==="weeks"?ap/604800000:ap
}}return aq?ai:ac(ai)
},from:function(ai,ah){return Y.duration(this.diff(ai)).lang(this._lang).humanize(!ah)
},fromNow:function(ah){return this.from(Y(),ah)
},calendar:function(){var ak=this.diff(Y().sod(),"days",true),aj=this.lang().calendar,ai=aj.sameElse,ah=ak<-6?ai:ak<-1?aj.lastWeek:ak<0?aj.lastDay:ak<1?aj.sameDay:ak<2?aj.nextDay:ak<7?aj.nextWeek:ai;
return this.format(typeof ah==="function"?ah.apply(this):ah)
},isLeapYear:function(){var ah=this.year();
return(ah%4===0&&ah%100!==0)||ah%400===0
},isDST:function(){return(this.zone()<Y([this.year()]).zone()||this.zone()<Y([this.year(),5]).zone())
},day:function(ai){var ah=this._isUTC?this._d.getUTCDay():this._d.getDay();
return ai==null?ah:this.add({d:ai-ah})
},startOf:function(ah){switch(ah.replace(/s$/,"")){case"year":this.month(0);
case"month":this.date(1);
case"day":this.hours(0);
case"hour":this.minutes(0);
case"minute":this.seconds(0);
case"second":this.milliseconds(0)
}return this
},endOf:function(ah){return this.startOf(ah).add(ah.replace(/s?$/,"s"),1).subtract("ms",1)
},sod:function(){return this.clone().startOf("day")
},eod:function(){return this.clone().endOf("day")
},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()
},daysInMonth:function(){return Y.utc([this.year(),this.month()+1,0]).date()
},lang:function(ah){if(ah===r){return y(this)
}else{this._lang=ah;
return this
}}};
function o(ah,ai){Y.fn[ah]=function(aj){var ak=this._isUTC?"UTC":"";
if(aj!=null){this._d["set"+ak+ai](aj);
return this
}else{return this._d["get"+ak+ai]()
}}
}for(ae=0;
ae<n.length;
ae++){o(n[ae].toLowerCase(),n[ae])
}o("year","FullYear");
Y.duration.fn=ag.prototype={weeks:function(){return X(this.days()/7)
},valueOf:function(){return this._milliseconds+this._days*86400000+this._months*2592000000
},humanize:function(ak){var al=+this,ah=this.lang().relativeTime,ai=F(al,!ak,this.lang()),aj=al<=0?ah.past:ah.future;
if(ak){if(typeof aj==="function"){ai=aj(ai)
}else{ai=aj.replace(/%s/i,ai)
}}return ai
},lang:Y.fn.lang};
function a(ah){Y.duration.fn[ah]=function(){return this._data[ah]
}
}function c(ah,ai){Y.duration.fn["as"+ah]=function(){return +this/ai
}
}for(ae in Z){if(Z.hasOwnProperty(ae)){c(ae,Z[ae]);
a(ae.toLowerCase())
}}c("Weeks",604800000);
if(P){module.exports=Y
}if(typeof ender==="undefined"){this["moment"]=Y
}if(typeof define==="function"&&define.amd){define("moment",[],function(){return Y
})
}}).call(this);
(function(){var y,q=(typeof module!=="undefined"&&module.exports),c="africa antarctica asia australasia etcetera northamerica pacificnew southamerica".split(" "),r,l={},v={},u={},g={};
y=q?require("moment"):this.moment;
if(y===undefined){throw"Can't find moment"
}r=y.fn.format;
function p(z,G,B,D,E,C,A,F){this._name=z;
this._from=+G;
this._to=+B;
this._month=+D;
this._dayVal=+E;
if(E.indexOf(":")>-1){E=E.split(":");
this._dowVal=+E[0];
this._dayVal=+E[1];
this.date=p.prototype._dateFirst
}else{if(this._dayVal<1){this._dayVal=-this._dayVal;
this.date=p.prototype._dateLast
}}this._time=+C;
this._offset=+A;
this._letters=F
}p.prototype={contains:function(A){var z=A.year(),B=this.start(z);
if(A>=B&&z<=this._to){return true
}return false
},containsYear:function(z){if(z>=this._from&&z<=this._to){return true
}return false
},letters:function(){return this._letters
},offset:function(){return this._offset
},start:function(z){z=Math.min(Math.max(z,this._from),this._to);
return y.utc([z,this._month,this.date(z),0,this._time])
},date:function(z){return this._dayVal
},_dateFirst:function(C){var B=this._dayVal,D=this._dowVal,A=y([C,this._month,1]).day(),z=this._dowVal+1-A;
while(z<B){z+=7
}return z
},_dateLast:function(D){var B=this._dayVal,E=B%7,C=y([D,this._month+1,1]).day(),A=y([D,this._month,1]).daysInMonth(),z=A+(E-(C-1))-(~~(B/7)*7);
if(E>=C){z-=7
}return z
}};
function d(z,A){this._year=z;
this._rule=A
}d.prototype={start:function(){return this._rule.start(this._year)
},offset:function(){return this._rule._offset
},rule:function(){return this._rule
}};
function m(B,A){var z=B.start(),C=A.start();
if(z>C){return -1
}else{if(z<C){return 1
}else{return 0
}}}function t(z){this._name=z;
this._rules=[]
}t.prototype={add:function(z){this._rules.push(z)
},_ruleYears:function(A,C){var z,B;
for(z=0;
z<this._rules.length;
z++){B=this._rules[z];
if(B.containsYear(A)){C.push(new d(A,B))
}}},rules:function(B){var z,A=y.utc([B.year(),0,1,-1]),C=[];
this._ruleYears(B.year(),C);
this._ruleYears(B.year()-1,C);
C.sort(m);
return C
},rule:function(C,F){var E=this.rules(C),D,B,z,A;
for(A=0;
A<E.length-1;
A++){B=E[A+1];
D=E[A];
z=y.utc(C).add("m",F+B.offset());
if(z>=D.start()){return D.rule()
}}throw"Rule not found"
}};
function b(A,B,D,z,C){this._name=A;
this._offset=+B;
this._ruleSet=w(D);
this._format=z;
this._until=+C||9999
}b.prototype={contains:function(z){if(z.year()<=this._until){return true
}return false
},rule:function(z){return this._ruleSet.rule(z,this._offset)
},format:function(z){return this._format.replace("%s",this.rule(z).letters())
},offset:function(z){return this._offset+this.rule(z).offset()
}};
function n(A,z){var B=y(A._until)-y(z._until);
if(B>0){return 1
}if(B<0){return -1
}return 0
}function a(z){this._name=z;
this._zones=[]
}a.prototype={zone:function(B){var A,z;
for(A=0;
A<this._zones.length;
A++){if(this._zones[A].contains(B)){return this._zones[A]
}}},add:function(z){this._zones.push(z);
this._zones.sort(n)
},name:function(){return this._name
},format:function(z){return this.zone(z).format(z)
},offset:function(z){return -this.zone(z).offset(z)
}};
function k(A){var z;
for(z in A){A[z].forEach(function(B){f(z+","+B)
})
}}function f(A){if(l[A]){return l[A]
}var C=A.split(","),z=h(C[0]),B=new p(z,C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]);
l[A]=B;
w(z).add(B);
return B
}function h(z){return(z||"").toLowerCase().replace(/\//g,"_")
}function o(z){var A;
for(A in z){z[A].forEach(function(B){x(A+","+B)
})
}}function x(B){if(u[B]){return u[B]
}var C=B.split(","),A=h(C[0]),z=new b(A,C[1],C[2],C[3],C[4]);
u[B]=z;
e(A).add(z);
return z
}function w(z){z=h(z);
if(!v[z]){v[z]=new t(z)
}return v[z]
}function e(z){z=h(z);
if(!g[z]){g[z]=new a(z)
}return g[z]
}y.fn.format=function(B){var C=this,z=this,A=B||y.defaultFormat;
if(this._z&&this._z.offset){C=this.clone().utc();
C.add("m",-this._z.offset(this));
A=A.replace(/ZZ/g,function(){var E=-z._z.offset(z),D="+";
if(E<0){E=-E;
D="-"
}return"["+D+j(~~(10*E/6),4)+"]"
});
A=A.replace(/Z/g,function(){var E=-z._z.offset(z),D="+";
if(E<0){E=-E;
D="-"
}return"["+D+j(~~(E/60),2)+":"+j(~~E%60,2)+"]"
});
A=A.replace(/z/g,function(){return"["+z._z.format(z)+"]"
})
}return r.call(C,A)
};
function j(B,A){var z=B+"";
while(z.length<A){z="0"+z
}return z
}y.fn.tz=function(z){this._z=e(z);
return this
};
y.tz={addRules:k,addRule:f,getRuleSet:w,addZones:o,addZone:x,getZoneSet:e};
f("-,0,9999,0,0,0,0,S");
if(q){c.forEach(function(B){var A=require("./zones/"+B);
o(A.zones);
k(A.rules)
})
}if(q){module.exports=y.tz
}if(typeof define==="function"&&define.amd){define("moment",[],function(){return y.tz
})
}}).apply(this);
(function(){var b={rules:{US:["1918,1919,2,0,120,60,D","1918,1919,9,0,120,0,S","1942,1942,1,9,120,60,W","1945,1945,7,14,1380,60,P","1945,1945,8,30,120,0,S","1967,2006,9,0,120,0,S","1967,1973,3,0,120,60,D","1974,1974,0,6,120,60,D","1975,1975,1,23,120,60,D","1976,1986,3,0,120,60,D","1987,2006,3,0:1,120,60,D","2007,9999,2,0:8,120,60,D","2007,9999,10,0:1,120,0,S"],NYC:["1920,1920,2,0,120,60,D","1920,1920,9,0,120,0,S","1921,1966,3,0,120,60,D","1921,1954,8,0,120,0,S","1955,1966,9,0,120,0,S"]},zones:{"America/New_York":["-184,-,LMT,1883,Nov,18,12:03:58","-300,US,E%sT,1920","-300,NYC,E%sT,1942","-300,US,E%sT,1946","-300,NYC,E%sT,1967","-300,US,E%sT"]},lastZone:"America/New_York"};
function a(c){c.addRules(b.rules);
c.addZones(b.zones)
}if(typeof module!=="undefined"&&module.exports){module.exports=b
}else{if(typeof define==="function"&&define.amd){require(["moment-timezone"],a)
}if(this.moment&&this.moment.tz){a(this.moment.tz)
}}}).call(this);
var dailybeast=dailybeast||{};
dailybeast.componentHierarchy={"user/components/pages/reset-password/success":"user/components/page","education/components/content/featureimage/featuredimage":"foundation/components/parbase","newsweek/components/page/graphicpage":"newsweek/components/page/contentpage","education/components/content/inlinerelated":"newsweek/components/content/inlinerelated","witw/components/pages/gallery":"witw/components/pages/atomic","dailybeast/components/gallery":"foundation/components/parbase","dailybeast/components/grid":"foundation/components/parsys","dailybeast/components/pages/gallery2":"dailybeast/components/page","user/components/pages/find-account":"user/components/page","dailybeast/components/inlineimage":"dailybeast/components/image","dailybeast/components/pages/topic":"dailybeast/components/page","education/components/content/feature/image":"foundation/components/parbase","dailybeast/components/pagelist/combo":"dailybeast/components/pagelist/item","education/components/page/interactivepage":"education/components/page/contentpage","mobilebeast/components/gallery":"dailybeast/components/gallery","dailybeast/components/home/photoslider":"foundation/components/parsys","witw/components/gallery/slide":"dailybeast/components/gallery2/slide","dailybeast/components/pages/cheatsheet":"dailybeast/components/page","newsweek/components/content/mainimage":"dailybeast/components/inlineimage","newsweek/components/content/advertising":"dailybeast/components/ads/breakout","mobilebeast/components/pages/article":"mobilebeast/components/page","education/components/content/byline":"newsweek/components/content/byline","witw/components/links":"dailybeast/components/links","nwglobal/components/pages/photosphere":"nwglobal/components/page","education/components/page/authorspage":"education/components/page/contentpage","education/components/content/vimeo":"newsweek/components/content/vimeo","dailybeast/components/topic/layout3/featurepanel/feature":"dailybeast/components/pagelist/item","education/components/content/brightcove":"newsweek/components/content/brightcove","newsweek/components/pages/blogentry":"dailybeast/components/pages/article","witw/components/cheatreference":"dailybeast/components/cheatreference","newsweek/components/content/brightcove":"dailybeast/components/video/brightcove","dailybeast/components/pages/gallery":"dailybeast/components/page","mobilebeast/components/pages/search":"mobilebeast/components/page","witw/components/pages/atomic":"witw/components/page","newsweek/components/content/flash":"foundation/components/parbase","user/components/pages/account/options":"user/components/pages/account","dailybeast/components/pages/video":"dailybeast/components/page","education/components/page/searchpage":"education/components/page/contentpage","newsweek/components/content/youtube":"dailybeast/components/video/youtube","dailybeast/components/topic/videolist":"dailybeast/components/pagelist","dailybeast/wcm/components/newsletter":"foundation/components/page","newsweek/components/pages/section":"dailybeast/components/page","newsweek/components/section/slider":"dailybeast/components/slider","witw/components/video/livestream":"dailybeast/components/video/livestream","dailybeast/wcm/components/reference":"foundation/components/parbase","dailybeast/components/topic/layout2/slider":"dailybeast/components/slider","dailybeast/components/oembed":"newsweek/components/content/oembed","education/components/content/hulu":"newsweek/components/content/hulu","nwglobal/components/callout":"dailybeast/components/callout","education/components/page/homepage":"education/components/page/contentpage","education/components/content/featureimage/image":"foundation/components/parbase","dailybeast/components/topic/layout1/top":"dailybeast/components/pagelist/combo","mobilenewsweek/components/section/features":"newsweek/components/section/features","dailybeast/components/trendingtopics":"dailybeast/components/links","dailybeast/wcm/components/heading":"dailybeast/components/page","dailybeast/components/tout":"foundation/components/parbase","user/components/pages/find-account/link-account":"user/components/page","dailybeast/components/home/contributors":"foundation/components/parsys","education/components/content/mainimage":"newsweek/components/content/mainimage","foundation/components/text":"foundation/components/parbase","education/components/content/youtube":"newsweek/components/content/youtube","dailybeast/components/pages/cheatstream":"dailybeast/components/pages/cheatsheet","nwglobal/components/page":"dailybeast/components/page","dailybeast/components/home/partnerstory":"dailybeast/components/home/story","dailybeast/components/pages/grid12":"dailybeast/components/page","user/components/pages/account/add-username/success":"user/components/page","mobilebeast/components/ads/advertising":"dailybeast/components/ads/advertising","mobilebeast/components/text":"dailybeast/components/text","user/components/pages/change-password/success":"user/components/page","mobilebeast/components/pages/videos":"mobilebeast/components/page","witw/components/snippet":"dailybeast/components/snippet","education/components/content/collegerankingteasers":"foundation/components/parbase","witw/components/pages/wrap":"witw/components/page","nwglobal/components/pages/longarticle":"nwglobal/components/pages/article","mobilebeast/components/pages/video":"mobilebeast/components/page","dailybeast/components/topic/layout2/video":"dailybeast/components/pagelist/item","witw/components/page":"dailybeast/components/page","education/components/content/advertising":"newsweek/components/content/advertising","dailybeast/components/topic/highlight":"dailybeast/components/pagelist/combo","dailybeast/components/topic/layout2/featuredvideo":"dailybeast/components/pagelist/item","dailybeast/components/text":"foundation/components/parbase","dailybeast/components/flash":"foundation/components/parbase","dailybeast/components/ads/breakout":"dailybeast/components/ads/advertising","nwglobal/components/article/break":"dailybeast/components/inlineimage","mobilebeast/components/storify":"dailybeast/components/storify","nwglobal/components/content/htmleditor":"foundation/components/parbase","witw/components/video/brightcove":"dailybeast/components/video/brightcove","witw/components/pages/article":"witw/components/pages/atomic","education/components/content/comments":"newsweek/components/content/comments","dailybeast/components/topic/layout2/nophoto":"dailybeast/components/pagelist/combo","nwglobal/components/pages/shortarticle":"nwglobal/components/pages/article","education/components/page/generalcontentpage":"education/components/page/contentpage","newsweek/components/page/contentpage":"foundation/components/page","dailybeast/components/home/features":"foundation/components/parsys","dailybeast/components/pages/article":"dailybeast/components/page","dailybeast/components/wrap/curatedpage":"dailybeast/components/page","dailybeast/components/pages/home":"dailybeast/components/page","education/components/content/searchresults":"newsweek/component/content/search","witw/components/text":"dailybeast/components/text","newsweek/components/section/slider/slide":"dailybeast/components/slider/slide","education/components/content/featureimage":"education/components/content/feature","education/components/page/articlepage":"education/components/page/contentpage","newsweek/components/pages/video":"dailybeast/components/pages/video","mobilebeast/components/pages/cheatsheet":"mobilebeast/components/page","dailybeast/components/topic/layout1/large":"dailybeast/components/topic/highlight","user/components/pages/account/add-username":"user/components/page","newsweek/components/content/vimeo":"dailybeast/components/video/vimeo","user/components/pages/password-expired/success":"user/components/page","newsweek/components/page/videopage":"/apps/newsweek/components/pages/video","education/components/page/videopage":"education/components/page/mediapage","nwglobal/components/video/youtube":"dailybeast/components/video/youtube","dailybeast/components/pages/content":"dailybeast/components/page","mobilebeast/components/pages/gallery":"mobilebeast/components/page","education/components/content/bigtextimagetease/image":"foundation/components/parbase","education/components/page/landingpage":"education/components/page/articlepage","dailybeast/components/home/gallery":"foundation/components/image","user/components/pages/signin/success":"user/components/page","user/components/pages/reset-password":"user/components/page","witw/components/pages/tweet":"witw/components/pages/atomic","dailybeast/components/topic/layout3/featurepanel":"foundation/components/parsys","dailybeast/components/pages/wrap":"dailybeast/components/page","dailybeast/components/pages/videos":"dailybeast/components/page","nwglobal/components/pages/offer":"nwglobal/components/page","user/components/pages/account/subscribe":"user/components/page","newsweek/components/page/articlepage":"newsweek/components/pages/article","dailybeast/components/listicle":"foundation/components/parsys","user/components/pages/account":"user/components/page","dailybeast/oracle/components/page":"dailybeast/components/page","user/components/pages/signup/success":"user/components/page","education/components/content/taglist":"newsweek/components/content/taglist","education/components/page/contentpage":"newsweek/components/page/contentpage","mobilenewsweek/components/page/articlepage":"mobilenewsweek/components/pages/article","user/components/pages/signin":"user/components/page","nwglobal/components/pages/betterworld":"nwglobal/components/page","witw/components/ads/advertising":"dailybeast/components/ads/advertising","education/components/content/sharetools":"newsweek/components/content/sharetools","education/components/content/sponsoredimage":"foundation/components/parbase","dailybeast/components/listicle/new":"foundation/components/parsys/new","dailybeast/components/slider":"foundation/components/parsys","dailybeast/components/gallery2":"foundation/components/parbase","mobilenewsweek/components/pages/section":"mobilebeast/components/page","newsweek/components/pages/article":"dailybeast/components/pages/article","dailybeast/components/wrap/contributors":"dailybeast/components/page","dailybeast/components/topic/layout2/gallery":"dailybeast/components/pagelist/item","mobilebeast/components/pages/home":"mobilebeast/components/page","dailybeast/components/twitter/list":"dailybeast/components/twitter/search","witw/components/pages/video":"witw/components/pages/atomic","witw/components/gallery":"dailybeast/components/gallery2","geometrixx/components/assetshare":"geometrixx/components/page","witw/components/video/youtube":"dailybeast/components/video/youtube","newsweek/components/page/packagepage":"newsweek/components/page/contentpage","dailybeast/components/pages/cheatsheet/parsys":"foundation/components/parsys","dailybeast/components/gallery/slide/image":"dailybeast/components/image","dailybeast/components/pages/author":"dailybeast/components/page","mobilebeast/components/slider":"dailybeast/components/text","mobilebeast/components/inlineimage":"dailybeast/components/inlineimage","geometrixx/components/widepage":"geometrixx/components/page","education/components/page/flowlistpage":"education/components/page/contentpage","education/components/content/collegerankingteasers/image":"foundation/components/parbase","dailybeast/components/topic/videolist/video":"dailybeast/components/pagelist/item","dailybeast/components/topic/layout1/medium":"dailybeast/components/topic/highlight","mobilenewsweek/components/pages/article":"mobilebeast/components/pages/article","dailybeast/components/topic/layout2/withphoto":"dailybeast/components/pagelist/combo","witw/components/pages/topic":"witw/components/page","witw/components/pullquote":"dailybeast/components/pullquote","witw/components/pages/cheat":"witw/components/pages/article","dailybeast/components/pages/cheat":"dailybeast/components/pages/cheatsheet","nwglobal/components/article/image":"dailybeast/components/inlineimage","mobilebeast/components/pages/grid12":"mobilebeast/components/page","dailybeast/components/topic/gallerylist/gallery":"dailybeast/components/pagelist/item","newsweek/components/section/stories":"foundation/components/parsys","dailybeast/components/home/galleries":"foundation/components/parbase","dailybeast/components/pages/profile":"dailybeast/components/page","user/components/pages/signup":"user/components/page","education/components/content/image":"foundation/components/parbase","newsweek/components/page/interactivepage":"dailybeast/components/pages/interactive","nwglobal/components/inlineimage":"dailybeast/components/inlineimage","newsweek/components/content/pagebreak":"dailybeast/components/pagebreak","dailybeast/components/topic/layout3/medium":"dailybeast/components/pagelist/combo","geometrixx/components/contentpage":"geometrixx/components/page","mobilebeast/components/twitter/widget":"dailybeast/components/twitter/widget","user/components/pages/find-account/link-account/success":"user/components/page","geometrixx/components/homepage":"geometrixx/components/page","mobilebeast/components/pages/content":"mobilebeast/components/page","mobilebeast/components/blockquote":"dailybeast/components/blockquote","education/components/content/simpleimage":"newsweek/components/content/image","nwglobal/components/pages/culture":"nwglobal/components/pages/betterworld","nwglobal/components/text":"dailybeast/components/text","education/components/page/blogpage":"education/components/page/contentpage","nwglobal/components/pullquote":"dailybeast/components/pullquote","newsweek/components/page/seriespage":"foundation/components/page","dailybeast/components/ads/floatingad":"dailybeast/components/ads/advertising","education/components/content/pagebreak":"newsweek/components/content/pagebreak","user/components/pages/account/resume":"user/components/page","geometrixx/components/forum":"geometrixx/components/page","geometrixx/components/mobilecontentpage":"wcm/mobile/components/page","user/components/pages/account/billing-info":"user/components/page","newsweek/components/page/magazinepreviewpage":"foundation/components/page","mobilebeast/components/pages/wrap":"mobilebeast/components/page","mobilebeast/components/page":"dailybeast/components/page","dailybeast/wcm/components/partners":"dailybeast/components/page","geometrixx/components/page":"foundation/components/page","dailybeast/components/gallery2/slide/image":"dailybeast/components/image","education/components/page/tagpage":"education/components/page/contentpage","mobilebeast/components/pages/topic":"mobilebeast/components/page","education/components/content/mostpopularmultimedia":"newsweek/components/content/mostpopularmultimedia","education/components/content/flowlist":"newsweek/components/content/flowlist","education/components/content/blogimage":"foundation/components/parbase","dailybeast/components/topic/layout1/featuredvideo":"dailybeast/components/pagelist/item","nwglobal/components/gallery/section/slide":"dailybeast/components/gallery2/slide","dailybeast/components/pages/archive":"dailybeast/components/pages/content","geometrixx/components/productlist":"foundation/components/parbase","dailybeast/components/topic/gallerylist":"dailybeast/components/pagelist","dailybeast/components/topic/layout2/slider/slide":"dailybeast/components/pagelist/item","mobilebeast/components/callout":"dailybeast/components/callout","dailybeast/components/wrap/switcher":"foundation/components/parsys","nwglobal/components/video/brightcove":"dailybeast/components/video/brightcove","dailybeast/components/newsletters":"foundation/components/parsys","dailybeast/components/topic/layout6/story":"dailybeast/components/pagelist/item","dailybeast/components/insights":"foundation/components/parsys","witw/components/oembed":"dailybeast/components/oembed","dailybeast/components/contentimage":"foundation/components/image","nwglobal/components/video/vimeo":"dailybeast/components/video/vimeo","dailybeast/components/twitter/widget":"foundation/components/parbase","education/components/page/blogentrypage":"education/components/page/articlepage","dailybeast/components/pages/search":"dailybeast/components/page","mobilebeast/components/pages/company":"mobilebeast/components/page","education/components/page/mediapage":"education/components/page/contentpage","newsweek/components/content/image":"dailybeast/components/image","user/components/pages/change-password":"user/components/page","dailybeast/components/topic/layout3/featuredgallery":"dailybeast/components/pagelist/item","dailybeast/components/pages/listicle":"dailybeast/components/pages/article","witw/components/pages/home":"witw/components/page","dailybeast/components/topic/layout3/large":"dailybeast/components/pagelist/combo","nwglobal/components/pages/article":"nwglobal/components/page","mobilebeast/components/pages/cheat":"mobilebeast/components/page","newsweek/components/content/inlineimage":"dailybeast/components/inlineimage","mobilebeast/components/pages/gallery2":"mobilebeast/components/pages/gallery","witw/components/hero":"dailybeast/components/wrap/curatedpage","nwglobal/components/gallery":"foundation/components/parsys","dailybeast/wcm/components/breakout":"dailybeast/components/page","education/components/content/feature":"foundation/components/parbase","geometrixx/components/newsletterpage":"mcm/components/newsletter/page","nwglobal/components/ads/advertising":"dailybeast/components/ads/advertising","witw/components/tout":"dailybeast/components/wrap/curatedpage","dailybeast/wcm/components/partner":"dailybeast/components/page","nwglobal/components/pages/home":"nwglobal/components/page","geometrixx/components/list":"foundation/components/list","dailybeast/components/image":"foundation/components/image","dailybeast/components/pages/interactive":"dailybeast/components/pages/article","education/components/content/authorsidebar":"newsweek/components/content/authorsidebar","newsweek/components/pages/gallery":"dailybeast/components/pages/gallery","dailybeast/components/home/teaser":"foundation/components/parbase","dailybeast/components/pages/blogentry":"dailybeast/components/pages/article","dailybeast/components/pages/rankings":"dailybeast/components/page","foundation/components/image":"foundation/components/parbase","dailybeast/components/home/stories":"foundation/components/parsys","education/components/content/inlineimage":"newsweek/components/content/inlineimage","user/components/pages/find-account/success":"user/components/page","witw/components/inlineimage":"dailybeast/components/inlineimage","geometrixx/components/title":"foundation/components/title","nwglobal/components/tout":"foundation/components/parbase","geometrixx/components/asseteditor":"geometrixx/components/page","dailybeast/components/home/suggestions":"foundation/components/parsys","education/components/content/flowlistimage":"newsweek/components/content/image","newsweek/components/page/blogentrypage":"newsweek/components/page/articlepage","dailybeast/components/pagelist":"foundation/components/parsys","nwglobal/components/gallery/section/slide/image":"dailybeast/components/image","user/components/pages/password-expired":"user/components/page","dailybeast/components/page":"foundation/components/page","dailybeast/components/pages/company":"dailybeast/components/page","mobilebeast/components/pages/author":"mobilebeast/components/page","newsweek/components/page/mediapage":"newsweek/components/pages/gallery","newsweek/components/page/blogpage":"dailybeast/components/pages/content","witw/components/video/vimeo":"dailybeast/components/video/vimeo","education/components/content/flash":"newsweek/components/content/flash"};
(function(){dust.register("dailybeast/components/ads/advertising/advertisement",e);
function e(h,g){return h.exists(g.get("badgeEnabled"),g,{block:d},null).write('<div class="ad ').reference(g.get("name"),g,"h").write(" ").reference(g.get("position"),g,"h").write('" data-advertising="{siteID: \'').reference(g.get("siteId"),g,"h").write("', zone: '").reference(g.get("zone"),g,"h").write("', template: '").reference(g.get("template"),g,"h").write("', size: '").reference(g.get("size"),g,"h").write("', tile: '").reference(g.get("tile"),g,"h").write("', iFrame: ").exists(g.get("iFrame"),g,{"else":c,block:b},null).write(", disable: '").exists(g.get("disabled"),g,{"else":a,block:f},null).write("', params: '").reference(g.get("parameters"),g,"h").write("'}\"></div>")
}function d(h,g){return h.write('<div class="ad ad-badge ').reference(g.get("position"),g,"h").write('">- Advertisement -</div>')
}function c(h,g){return h.write("false")
}function b(h,g){return h.write("true")
}function a(h,g){return h.write("false")
}function f(h,g){return h.write("true")
}return e
})();
(function(){dust.register("dailybeast/components/gallery2/thumbnails/thumbnails",e);
function e(g,f){return g.section(f.get("slice"),f,{block:d},{of:f.get("slides"),start:f.get("thumbnailStart"),end:f.get("thumbnailEnd")})
}function d(g,f){return g.write("<li ").section(f.get("atIndex"),f,{block:c},{index:f.get("currentSlide")}).write('><a href="').reference(f.get("url"),f,"h").write('"><img alt="" src="').reference(f.getPath(false,["thumbnail","sizes","default"]),f,"h").write('"/>').section(f.get("isIntro"),f,{"else":b,block:a},null).write("</a></li>")
}function c(g,f){return g.write('class="active"')
}function b(g,f){return g.write('<div class="number">').reference(f.get("slideNumber"),f,"h").write("</div>")
}function a(g,f){return g
}return e
})();
(function(){dust.register("dailybeast/components/gallery2/thumbnails/main",a);
function a(c,b){return c.write('<div class="slide-thumbnail-wrapper"><div class="slide-thumbnail"><a class="previous small" href="#"><i></i></a><a class="next small" href="#"><i></i></a><ul class="slide-inner-wrapper clearfix">').partial("dailybeast/components/gallery2/thumbnails/thumbnails",b,null).write("</ul></div></div>")
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/related/relatedgallery",a);
function a(c,b){return c.write('<a class="related-gallery" href=""><img src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg" class="image" /><div class="title-container"><div class="title">LOADING...</div></div></a>')
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/related/relatedgalleries",c);
function c(e,d){return e.write('<div class="related-galleries"><div class="replay-button-wrapper"><span class="replay-button"><span class="replay-button-content">REPLAY GALLERY</span></span></div><div class="header">').reference(d.get("relatedGalleriesTitle"),d,"h").write('</div><div class="outer-row"><div class="button-column"><div class="previous-button"></div></div><div class="outer-cell"><div class="slider"><div class="inner-row">').section(d.get("repeat"),d,{block:b},{count:"20"}).write('</div><div class="inner-row">').section(d.get("repeat"),d,{block:a},{count:"20"}).write('</div></div></div><div class="button-column"><div class="next-button"></div></div></div>').partial("dailybeast/components/ads/advertising/advertisement",d.rebase(d.get("relatedAd")),null).write("</div>")
}function b(e,d){return e.partial("dailybeast/components/gallery2/related/relatedgallery",d,null)
}function a(e,d){return e.partial("dailybeast/components/gallery2/related/relatedgallery",d,null)
}return c
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/pagination",c);
function c(e,d){return e.write('<ul class="view-all-pagination">').section(d.get("pagination"),d,{block:b},null).write("</ul>")
}function b(e,d){return e.write('<li class="').exists(d.get("active"),d,{block:a},null).write('"><a href="#" data-offset="').reference(d.get("offset"),d,"h").write('">').reference(d.get("number"),d,"h").write("</a></li>")
}function a(e,d){return e.write("active")
}return c
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/main",a);
function a(c,b){return c.write('<div class="view-all"><div class="view-all-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><div class="slider"><div class="slide">').partial("dailybeast/components/gallery2/viewall/page",b,null).write("</div></div></div>").partial("dailybeast/components/gallery2/viewall/pagination",b,null).write("</div>")
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/slides",b);
function b(d,c){return d.section(c.get("items"),c,{block:a},null)
}function a(d,c){return d.write('<li><a href="').reference(c.get("url"),c,"h").write('"><img src="/etc/clientlibs/dailybeast/img/placeholder/96x96.jpg" data-src="').reference(c.getPath(false,["image","sizes","viewAll"]),c,"h").write('"/></a></li>')
}return b
})();
(function(){dust.register("dailybeast/components/gallery2/viewall/page",a);
function a(c,b){return c.write('<ul class="view-all-slides clearfix">').partial("dailybeast/components/gallery2/viewall/slides",b,null).write("</ul>")
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/moregalleries/galleries",b);
function b(d,c){return d.section(c.get("items"),c,{block:a},null)
}function a(d,c){return d.write('<li><a href="').reference(c.get("url"),c,"h").write('"><span><img alt="').reference(c.get("title"),c,"h").write('" src="/etc/clientlibs/dailybeast/img/placeholder/368x246.jpg" data-src="').reference(c.get("imageUrl"),c,"h").write('"/></span><h3 class="heading-style-a">').reference(c.get("title"),c,"h").write("</h3></a></li>")
}return b
})();
(function(){dust.register("dailybeast/components/gallery2/moregalleries/main",a);
function a(c,b){return c.write('<div class="more-galleries"><div class="more-galleries-arrows"><a class="previous large" href="#"><i></i></a><a class="next large" href="#"><i></i></a></div><div class="slider"><div class="slide">').partial("dailybeast/components/gallery2/moregalleries/page",b,null).write("</div></div></div>")
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/moregalleries/page",a);
function a(c,b){return c.write('<ul class="items clearfix">').partial("dailybeast/components/gallery2/moregalleries/galleries",b,null).write("</ul>")
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/gallery",b);
function b(d,c){return d.write('<div id="gallery"><div class="container-16">').partial("dailybeast/components/gallery2/header",c,null).write('<div class="gallery-content">').partial("dailybeast/components/gallery2/sharetools",c,null).section(c.get("nth"),c,{block:a},{of:c.get("slides"),n:c.get("currentSlide")}).partial("dailybeast/components/ads/advertising/advertisement",c.rebase(c.get("adInterstitial")),null).write("</div></div></div>")
}function a(d,c){return d.partial("dailybeast/components/gallery2/slide",c,null)
}return b
})();
(function(){dust.register("dailybeast/components/gallery2/aside",j);
function j(l,k){return l.write('<div class="copy-style-b copy"><a class="btn-close-x" href="#"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a>').section(k.get("isIntro"),k,{"else":h,block:g},null).write('<div class="heading-slide"><h2 class="heading-style-t">').reference(k.get("title"),k,"h").write("</h2>").exists(k.get("contentDate"),k,{block:f},null).exists(k.get("location"),k,{block:d},null).exists(k.get("authors"),k,{block:c},null).write('</div><div class="text">').reference(k.get("caption"),k,"h",["s"]).write("</div></div>")
}function h(l,k){return l.write('<span class="listicle-number">').reference(k.get("listicleNumber"),k,"h").write("</span>")
}function g(l,k){return l
}function f(l,k){return l.write('<time class="timestamp" property="dc:created" datetime="').reference(k.get("contentDate"),k,"h").write('" pubdate="pubdate">').helper("formatDate",k,{},{date:k.get("contentDate"),format:"MMM D, YYYY"}).exists(k.get("location"),k,{block:e},null).write("</time>")
}function e(l,k){return l.write(" - ")
}function d(l,k){return l.write('<span class="location">').reference(k.get("location"),k,"h").write("</span>")
}function c(l,k){return l.write('<span class="byline byline-style-a"><span>by</span>\n').section(k.get("authors"),k,{block:b},null).write("</span>")
}function b(l,k){return l.write('<a rel="author" property="foaf:publications" href="').reference(k.get("url"),k,"h").write('">').reference(k.get("name"),k,"h").write("</a>").helper("sep",k,{block:a},null)
}function a(l,k){return l.write(", ")
}return j
})();
(function(){dust.register("dailybeast/components/gallery2/header",a);
function a(c,b){return c.write('<div class="heading size1of1"><a class="btn-close-x" href="').reference(b.get("homeUrl"),b,"h").write('"><img src="/etc/clientlibs/dailybeast/img/icon/button-close-x.png"/></a><div class="captions-exit"><a class="captions-button" href="#">show captions</a><a class="exit-fullscreen-button" href="#">exit fullscreen</a></div><div class="logo"><a class="primary-logo" href="').reference(b.get("homeUrl"),b,"h").write('" role="navigation" data-track="{\'title\':\'dailybeastlogo\'}"><img src="/etc/clientlibs/dailybeast/img/logo/daily-beast.png" width="93" height="112" alt="The Daily Beast"/></a></div><div class="title-outer-container"><div class="red-line"></div><div class="title-inner-container"><h1 class="title">').reference(b.get("title"),b,"h").write('</h1></div><a href="#" class="more-gallery heading-style-r"><h4>More Galleries</h4></a></div></div>')
}return a
})();
(function(){dust.register("dailybeast/components/gallery2/sharetools",b);
function b(d,c){return d.section(c.get("shareTools"),c,{block:a},null)
}function a(d,c){return d.write('<ul class="sharetools"><li><div st_title="').reference(c.get("escapedTitle"),c,"h").write('" st_url="').reference(c.get("url"),c,"h").write('" st_image="').reference(c.get("shareToolsImage"),c,"h").write('" st_summary="').reference(c.get("escapedDescription"),c,"h").write('"class="st_email_custom">EMAIL</div></li><li class="fbshare lazy-fb-share"data-link="').reference(c.get("url"),c,"h").write('"data-picture="').reference(c.get("shareToolsImage"),c,"h").write('"data-name="').reference(c.get("escapedTitle"),c,"h").write('"data-description="').reference(c.get("escapedDescription"),c,"h").write('"data-redirect-uri="').reference(c.get("url"),c,"h").write('"data-background-image="/etc/clientlibs/dailybeast/img/social/fbshare.png"><a class="fbshare-btn"  onclick="postToFeed(this);"> </a></li><li class="facebook"><fb:like href="').reference(c.get("url"),c,"h").write('" send="false" layout="box_count" width="45" show_faces="false"></fb:like></li><li class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="').reference(c.get("shortUrl"),c,"h").write('"data-counturl="').reference(c.get("url"),c,"h").write('" data-text="').reference(c.get("escapedTitle"),c,"h").write('" data-via="').reference(c.get("twitterVia"),c,"h").write('" data-related="').reference(c.get("twitterRelated"),c,"h").write('"data-count="vertical"></a></li><li class="gplusone"><div class="g-plusone" data-href="').reference(c.get("url"),c,"h").write('" data-size="tall" data-callback="plusClick"></div></li><li class="linkedin lazy-linkedin"><script type="IN/Share" data-url="').reference(c.get("url"),c,"h").write('"><\/script></li></ul>')
}return b
})();
(function(){dust.register("dailybeast/components/gallery2/info",e);
function e(g,f){return g.write('<span class="info">').section(f.get("isIntro"),f,{"else":d,block:b},null).write("</span>")
}function d(g,f){return g.write('<span class="slide-number">').reference(f.get("slideNumber"),f,"h").write(" of ").reference(f.get("totalSlides"),f,"h").write("</span>\n").exists(f.get("credit"),f,{block:c},null)
}function c(g,f){return g.write('<span class="photo-credit" property="dc:creator">').reference(f.get("credit"),f,"h").write("</span>")
}function b(g,f){return g.exists(f.get("credit"),f,{block:a},null)
}function a(g,f){return g.write('<span class="photo-credit no-border" property="dc:creator">').reference(f.get("credit"),f,"h").write("</span>")
}return e
})();
(function(){dust.register("dailybeast/components/gallery2/slide",a);
function a(c,b){return c.write('<div class="content size1of1 clearfix"><div class="main"><div class="img-canvas-wrapper"><a class="previous" href="#"><i></i></a><a class="next" href="#"><i></i></a><div class="img-canvas"><img alt="').reference(b.get("title"),b,"h").write('" src="').reference(b.getPath(false,["image","sizes","large"]),b,"h").write('"></div></div><div class="info-thbnail-wrapper"><div class="img-info-wrapper"><div class="img-info">').partial("dailybeast/components/gallery2/info",b,null).write('<div class="fullscreen-view-all"><a class="enter-fullscreen-button" href="#">enter fullscreen</a><a class="view-all-button" href="#viewAll">view all <span class="slide-count">(').reference(b.get("totalSlides"),b,"h").write(")</span></a>\n</div></div></div>").partial("dailybeast/components/gallery2/thumbnails/main",b,null).write("</div>").partial("dailybeast/components/ads/advertising/advertisement",b.rebase(b.get("adFooter")),null).partial("dailybeast/components/ads/advertising/advertisement",b.rebase(b.get("adFullscreen")),null).partial("dailybeast/components/ads/advertising/advertisement",b.rebase(b.get("adFullscreenTracker")),null).write('</div><div class="aside">').partial("dailybeast/components/gallery2/aside",b,null).partial("dailybeast/components/ads/advertising/advertisement",b.rebase(b.get("adAside")),null).write("</div></div>")
}return a
})();
function ArrayDataProvider(a){this.array=a
}ArrayDataProvider.prototype={get:function(b,a,c){if(c){c(this.array.slice(b,a),this.array.length)
}}};
(function(a){function b(c,d){this.array=[];
this.queue=[];
this.busy=false;
this.getUrl=c;
this.count=null;
this.page=0;
this.totalPages=null;
this.settings=a.extend({pageSize:20,listProperty:"list",totalCountProperty:"totalCount",eager:false,eagerness:0.2},d)
}b.prototype={get:function(d,c,f){var e=this.getPageRange(d,c);
if(this.hasMore()&&this.page<e.end){this.queue.push({type:"fetch",pageRange:e});
if(f){this.queue.push({type:"read",startIndex:d,endIndex:c,callback:f})
}}else{this.read(d,c,f);
if(this.settings.eager){this.doEagerFetch(c)
}}if(!this.busy){this.doQueue()
}},indexToPage:function(c){return Math.ceil(c/this.settings.pageSize)
},getPageRange:function(f,d){var e=this.indexToPage(f),c=this.indexToPage(d);
return{start:Math.max(this.page,e),end:c}
},doEagerFetch:function(e){var d=this.page*this.settings.pageSize,c=d-Math.ceil(this.settings.pageSize*this.settings.eagerness);
if(e>=c&&this.hasMore()){this.queue.push({type:"fetch",pageRange:{start:this.page,end:this.page+1}})
}},hasMore:function(){return this.totalPages===null||this.page<this.totalPages
},fetch:function(f){this.busy=true;
var c=this,e=f.start*this.settings.pageSize,d=(f.end-f.start)*this.settings.pageSize;
a.getJSON(this.getUrl(e,d),function(j){var h=j[c.settings.listProperty],g,k;
c.count=j[c.settings.totalCountProperty];
c.totalPages=Math.ceil(c.count/c.settings.pageSize);
for(g=0,k=h.length;
g<k;
g++){c.array[g+e]=h[g]
}c.page=c.indexToPage(e+h.length-1);
c.doQueue()
})
},read:function(d,c,e){if(e){e(this.array.slice(d,c),this.count)
}},queuedRead:function(d,c,e){this.read(d,c,e);
this.doQueue()
},doQueue:function(){var c=this.queue.shift();
if(c!==undefined){if(c.type==="fetch"){this.fetch(c.pageRange)
}else{if(c.type==="read"){this.queuedRead(c.startIndex,c.endIndex,c.callback)
}}}else{this.busy=false
}}};
window.PagedDataProvider=b
})(jQuery);
(function(b){function a(d,e,c){this.$parent=d;
this.$e=null;
this.provider=e;
this.capacity=0;
this.offset=0;
this.focus=0;
this.total=0;
this.eventNamespace="FlexibleGrid"+new Date().getTime();
this.busy=false;
this.settings=b.extend({mainTemplate:"",pageTemplate:"",itemsTemplate:"",itemsWrapperSelector:".items",itemsSelector:".items",slideSelector:".slide",sliderSelector:".slider",paginationTemplate:"",paginationSelector:".pagination",animationDuration:400,initialHeight:0,initialWidth:0,itemWidth:0,itemHeight:0,minRows:1,minColumns:1,afterNext:null,afterPrevious:null,afterRender:null,handleResize:true,onCapacityChange:null},c);
this.pagination=!!this.settings.paginationTemplate;
this.width=this.settings.initialWidth;
this.height=this.settings.initialHeight
}a.prototype={resize:function(e,c){if(this.$e!==null){this.width=e===undefined?this.$e.width():e;
this.height=c===undefined?this.$e.height():c;
var d=this.getMeasurements();
if(d.capacity!=this.capacity){this.capacity=d.capacity;
this.capacityChanged()
}this.resizeElement(d)
}},resizeElement:function(c){this.$e.find(this.settings.itemsSelector).width(c.adjustedWidth).height(c.adjustedHeight);
this.$e.find(this.settings.itemsWrapperSelector).width(c.adjustedWidth);
this.$e.find(this.settings.sliderSelector).width(c.adjustedWidth).height(c.adjustedHeight)
},getMeasurements:function(){var e=this.width-2*this.$e.find(".next").width(),d=Math.max(Math.floor(this.height/this.settings.itemHeight),this.settings.minRows),c=Math.max(Math.floor(e/this.settings.itemWidth),this.settings.minColumns);
return{rows:d,columns:c,capacity:d*c,adjustedWidth:c*this.settings.itemWidth,adjustedHeight:d*this.settings.itemHeight}
},capacityChanged:function(){this.fillCapacity(this.$e.find(this.settings.itemsSelector));
if(this.pagination){this.renderPagination()
}this.updateButtons()
},renderPage:function(f){if(!this.busy&&f!=this.offset){this.busy=true;
var d=this,e=this.$e.find(this.settings.slideSelector),c=f>this.offset;
this.offset=f;
this.focus=f;
renderTemplate(this.settings.pageTemplate,null,function(j){var h=b(j)[c?"appendTo":"prependTo"](e),g=d.getMeasurements();
h.css({width:g.adjustedWidth,height:g.adjustedHeight});
e.css("left",c?0:-g.adjustedWidth);
d.fillCapacity(h);
e.animate({left:(c?"-=":"+=")+g.adjustedWidth},d.settings.animationDuration,function(){e.find(d.settings.itemsSelector)[c?"first":"last"]().remove();
e.css("left",0);
d.updateButtons();
d.busy=false
})
})
}},renderPagination:function(){var e=this,d=this.getPagination(),c=e.$e.find(this.settings.paginationSelector);
if(d.length>0){renderTemplate(this.settings.paginationTemplate,{pagination:d},function(f){c.replaceWith(f)
})
}else{c.empty()
}},getPagination:function(){var e=[],c;
if(this.capacity!==0&&(c=Math.ceil(this.total/this.capacity))>1){for(var f=0;
f<c;
f++){var g=f*this.capacity,d=g+this.capacity;
e.push({active:g<=this.focus&&this.focus<d,offset:f*this.capacity,number:f+1})
}}return e
},updateButtons:function(){var d=this.$e.find(".previous");
if(this.offset!=0){d.show()
}else{d.hide()
}var c=this.$e.find(".next");
if(this.offset+this.capacity<this.total){c.show()
}else{c.hide()
}this.$e.find(this.settings.paginationSelector).find("li a[data-offset="+this.offset+"]").parent().addClass("active").siblings().removeClass("active")
},bindEvents:function(){var c=this;
this.$e.find(".previous").click(function(){c.renderPage(c.offset-c.capacity);
if(c.settings.afterPrevious){c.settings.afterPrevious()
}return false
});
this.$e.find(".next").click(function(){c.renderPage(c.offset+c.capacity);
if(c.settings.afterNext){c.settings.afterNext()
}return false
});
if(this.pagination){this.$e.on("click",this.settings.paginationSelector+" li a",function(){var d=b(this),e=d.data();
if(e&&e.offset!==undefined){c.renderPage(e.offset)
}if(c.settings.afterPagination){c.settings.afterPagination()
}return false
})
}this.bindWindowEvents()
},bindWindowEvents:function(){var c=this;
if(this.settings.handleResize){b(window).unbind("."+this.eventNamespace).bind("resize."+this.eventNamespace,function(){c.resize()
})
}},unbindWindowEvents:function(){b(window).unbind("."+this.eventNamespace)
},fillCapacity:function(c){var d=this,g=c.find("li"),e=g.length,f=this.getOffsetFromIndex(this.focus);
this.provider.get(f,f+this.capacity,function(k,j){if(d.offset<f){g.slice(0,f-d.offset).remove();
e-=f-d.offset
}else{if(d.offset>f){renderTemplate(d.settings.itemsTemplate,{items:k.slice(0,d.offset-f)},function(l){c.prepend(l);
if(d.settings.afterRender){d.settings.afterRender()
}});
e+=f+d.offset
}}d.offset=f;
if(e<d.capacity&&e<j){var h=k.slice(e,Math.min(d.capacity,j));
renderTemplate(d.settings.itemsTemplate,{items:h},function(l){c.append(l);
if(d.settings.afterRender){d.settings.afterRender()
}})
}})
},show:function(d){d=d===undefined?0:d;
if(this.$e===null){this.focus=d;
var c=this;
renderTemplate(this.settings.mainTemplate,{items:[]},function(f){c.$e=b(f).appendTo(c.$parent);
var e=c.getMeasurements();
c.capacity=e.capacity;
c.provider.get(0,c.capacity,function(h,g){c.total=g;
c.offset=c.getOffsetFromIndex(d);
c.capacityChanged();
c.resizeElement(e)
});
c.bindEvents()
})
}},getOffsetFromIndex:function(c){return Math.min(Math.floor(c/this.capacity)*this.capacity,this.total)
},hide:function(){if(this.$e!==null){this.$e.remove();
this.$e=null
}b(window).unbind("."+this.eventNamespace)
}};
window.FlexibleGrid=a
})(jQuery);
(function(b){function a(f,e,d){this.$container=f;
this.$text=e;
this.settings=b.extend({maxHeight:106,maxFontSize:48,maxLineHeight:53},d);
this.$text.html(b.trim(this.$text.html()));
var c="ftTracer"+new Date().getTime();
this.$text.after("&nbsp;<span class='"+c+"'></span>");
this.$tracer=b("."+c);
this.enable()
}a.prototype={update:function(){if(this.enabled){if(this.$container.width()>this.containerWidth){while(this.shouldGrowFont()){this.growFont()
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
},updateMaxLineCount:function(c){this.maxLineCount+=c;
this.lineHeight=Math.floor(this.settings.maxHeight/this.maxLineCount);
this.fontSize=Math.floor(this.lineHeight*this.fontSizeRatio);
var d=(this.implicitBottomMargin-this.lineHeight+this.fontSize)*2;
this.$text.css({"font-size":this.fontSize+"px","line-height":this.lineHeight+"px"});
this.$container.css({"margin-bottom":d+"px"})
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
window.FlexibleText=a
})(jQuery);
(function(n){var b=function(r,p){if(typeof(p)=="undefined"){p={}
}this.init(r,p)
},d=b.prototype,q,a=["canvas","vml"],e=["oval","spiral","square","rect","roundRect"],f=/^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,h=navigator.appVersion.indexOf("MSIE")!==-1&&parseFloat(navigator.appVersion.split("MSIE")[1])===8?true:false,o=!!document.createElement("canvas").getContext,g=40,l=true,m=function(p,u,r){var t=document.createElement(p),v;
for(v in r){t[v]=r[v]
}if(typeof(u)!=="undefined"){u.appendChild(t)
}return t
},j=function(r,p){for(var t in p){r.style[t]=p[t]
}return r
},c=function(r,p){for(var t in p){r.setAttribute(t,p[t])
}return r
},k=function(v,p,u,t){v.save();
v.translate(p,u);
v.rotate(t);
v.translate(-p,-u);
v.beginPath()
};
d.init=function(u,t){if(typeof(t.safeVML)==="boolean"){l=t.safeVML
}try{if(document.getElementById(u)!==undefined){this.mum=document.getElementById(u)
}else{this.mum=document.body
}}catch(r){this.mum=document.body
}t.id=typeof(t.id)!=="undefined"?t.id:"canvasLoader";
this.cont=m("div",this.mum,{id:t.id});
if(o){q=a[0];
this.can=m("canvas",this.cont);
this.con=this.can.getContext("2d");
this.cCan=j(m("canvas",this.cont),{display:"none"});
this.cCon=this.cCan.getContext("2d")
}else{q=a[1];
if(typeof(b.vmlSheet)==="undefined"){document.getElementsByTagName("head")[0].appendChild(m("style"));
b.vmlSheet=document.styleSheets[document.styleSheets.length-1];
var p=["group","oval","roundrect","fill"];
for(var v=0;
v<p.length;
v++){b.vmlSheet.addRule(p[v],"behavior:url(#default#VML); position:absolute;")
}}this.vml=m("group",this.cont)
}this.setColor(this.color);
this.draw();
j(this.cont,{display:"none"})
};
d.cont={};
d.can={};
d.con={};
d.cCan={};
d.cCon={};
d.timer={};
d.activeId=0;
d.diameter=40;
d.setDiameter=function(p){this.diameter=Math.round(Math.abs(p));
this.redraw()
};
d.getDiameter=function(){return this.diameter
};
d.cRGB={};
d.color="#000000";
d.setColor=function(p){this.color=f.test(p)?p:"#000000";
this.cRGB=this.getRGB(this.color);
this.redraw()
};
d.getColor=function(){return this.color
};
d.shape=e[0];
d.setShape=function(p){var r;
for(r in e){if(p===e[r]){this.shape=p;
this.redraw();
break
}}};
d.getShape=function(){return this.shape
};
d.density=40;
d.setDensity=function(p){if(l&&q===a[1]){this.density=Math.round(Math.abs(p))<=g?Math.round(Math.abs(p)):g
}else{this.density=Math.round(Math.abs(p))
}if(this.density>360){this.density=360
}this.activeId=0;
this.redraw()
};
d.getDensity=function(){return this.density
};
d.range=1.3;
d.setRange=function(p){this.range=Math.abs(p);
this.redraw()
};
d.getRange=function(){return this.range
};
d.speed=2;
d.setSpeed=function(p){this.speed=Math.round(Math.abs(p))
};
d.getSpeed=function(){return this.speed
};
d.fps=24;
d.setFPS=function(p){this.fps=Math.round(Math.abs(p));
this.reset()
};
d.getFPS=function(){return this.fps
};
d.getRGB=function(p){p=p.charAt(0)==="#"?p.substring(1,7):p;
return{r:parseInt(p.substring(0,2),16),g:parseInt(p.substring(2,4),16),b:parseInt(p.substring(4,6),16)}
};
d.draw=function(){var C=0,B,z,D,v,u,L,p,O,K=this.density,M=Math.round(K*this.range),r,P=0,A,F,N,G,I=1000,t=0,J=this.cCon,E=this.diameter,H=0.47;
if(q===a[0]){J.clearRect(0,0,I,I);
c(this.can,{width:E,height:E});
c(this.cCan,{width:E,height:E});
while(C<K){r=C<=M?1-((1-P)/M*C):r=P;
L=270-360/K*C;
p=L/180*Math.PI;
J.fillStyle="rgba("+this.cRGB.r+","+this.cRGB.g+","+this.cRGB.b+","+r.toString()+")";
switch(this.shape){case e[0]:case e[1]:B=E*0.07;
v=E*H+Math.cos(p)*(E*H-B)-E*H;
u=E*H+Math.sin(p)*(E*H-B)-E*H;
J.beginPath();
if(this.shape===e[1]){J.arc(E*0.5+v,E*0.5+u,B*r,0,Math.PI*2,false)
}else{J.arc(E*0.5+v,E*0.5+u,B,0,Math.PI*2,false)
}break;
case e[2]:B=E*0.12;
v=Math.cos(p)*(E*H-B)+E*0.5;
u=Math.sin(p)*(E*H-B)+E*0.5;
k(J,v,u,p);
J.fillRect(v,u-B*0.5,B,B);
break;
case e[3]:case e[4]:z=E*0.3;
D=z*0.27;
v=Math.cos(p)*(D+(E-D)*0.13)+E*0.5;
u=Math.sin(p)*(D+(E-D)*0.13)+E*0.5;
k(J,v,u,p);
if(this.shape===e[3]){J.fillRect(v,u-D*0.5,z,D)
}else{O=D*0.55;
J.moveTo(v+O,u-D*0.5);
J.lineTo(v+z-O,u-D*0.5);
J.quadraticCurveTo(v+z,u-D*0.5,v+z,u-D*0.5+O);
J.lineTo(v+z,u-D*0.5+D-O);
J.quadraticCurveTo(v+z,u-D*0.5+D,v+z-O,u-D*0.5+D);
J.lineTo(v+O,u-D*0.5+D);
J.quadraticCurveTo(v,u-D*0.5+D,v,u-D*0.5+D-O);
J.lineTo(v,u-D*0.5+O);
J.quadraticCurveTo(v,u-D*0.5,v+O,u-D*0.5)
}break
}J.closePath();
J.fill();
J.restore();
++C
}}else{j(this.cont,{width:E,height:E});
j(this.vml,{width:E,height:E});
switch(this.shape){case e[0]:case e[1]:N="oval";
B=I*0.14;
break;
case e[2]:N="roundrect";
B=I*0.12;
break;
case e[3]:case e[4]:N="roundrect";
B=I*0.3;
break
}z=D=B;
v=I*0.5-D;
u=-D*0.5;
while(C<K){r=C<=M?1-((1-P)/M*C):r=P;
L=270-360/K*C;
switch(this.shape){case e[1]:z=D=B*r;
v=I*0.5-B*0.5-B*r*0.5;
u=(B-B*r)*0.5;
break;
case e[0]:case e[2]:if(h){u=0;
if(this.shape===e[2]){v=I*0.5-D*0.5
}}break;
case e[3]:case e[4]:z=B*0.95;
D=z*0.28;
if(h){v=0;
u=I*0.5-D*0.5
}else{v=I*0.5-z;
u=-D*0.5
}t=this.shape===e[4]?0.6:0;
break
}F=c(j(m("group",this.vml),{width:I,height:I,rotation:L}),{coordsize:I+","+I,coordorigin:-I*0.5+","+(-I*0.5)});
A=j(m(N,F,{stroked:false,arcSize:t}),{width:z,height:D,top:u,left:v});
G=m("fill",A,{color:this.color,opacity:r});
++C
}}this.tick(true)
};
d.clean=function(){if(q===a[0]){this.con.clearRect(0,0,1000,1000)
}else{var p=this.vml;
if(p.hasChildNodes()){while(p.childNodes.length>=1){p.removeChild(p.firstChild)
}}}};
d.redraw=function(){this.clean();
this.draw()
};
d.reset=function(){if(typeof(this.timer)==="number"){this.hide();
this.show()
}};
d.tick=function(r){var t=this.con,p=this.diameter;
if(!r){this.activeId+=360/this.density*this.speed
}if(q===a[0]){t.clearRect(0,0,p,p);
k(t,p*0.5,p*0.5,this.activeId/180*Math.PI);
t.drawImage(this.cCan,0,0,p,p);
t.restore()
}else{if(this.activeId>=360){this.activeId-=360
}j(this.vml,{rotation:this.activeId})
}};
d.show=function(){if(typeof(this.timer)!=="number"){var p=this;
this.timer=self.setInterval(function(){p.tick()
},Math.round(1000/this.fps));
j(this.cont,{display:"block"})
}};
d.hide=function(){if(typeof(this.timer)==="number"){clearInterval(this.timer);
delete this.timer;
j(this.cont,{display:"none"})
}};
d.kill=function(){var r=this.cont;
if(typeof(this.timer)==="number"){this.hide()
}if(q===a[0]){r.removeChild(this.can);
r.removeChild(this.cCan)
}else{r.removeChild(this.vml)
}var p;
for(p in this){delete this[p]
}};
n.CanvasLoader=b
}(window));
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.4 (Thu, 10 Jan 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function(m,p,j,e){var d=j(m),a=j(p),q=j.fancybox=function(){q.open.apply(this,arguments)
},l=navigator.userAgent.match(/msie/),c=null,f=p.createTouch!==e,k=function(r){return r&&r.hasOwnProperty&&r instanceof j
},b=function(r){return r&&j.type(r)==="string"
},n=function(r){return b(r)&&r.indexOf("%")>0
},h=function(r){return(r&&!(r.style.overflow&&r.style.overflow==="hidden")&&((r.clientWidth&&r.scrollWidth>r.clientWidth)||(r.clientHeight&&r.scrollHeight>r.clientHeight)))
},o=function(u,t){var r=parseInt(u,10)||0;
if(t&&n(u)){r=q.getViewport()[t]/100*r
}return Math.ceil(r)
},g=function(r,t){return o(r,t)+"px"
};
j.extend(q,{version:"2.1.4",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:true,autoHeight:false,autoWidth:false,autoResize:true,autoCenter:!f,fitToView:true,aspectRatio:false,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:true,closeBtn:true,closeClick:false,nextClick:false,mouseWheel:true,autoPlay:false,playSpeed:3000,preload:3,modal:false,loop:true,ajax:{dataType:"html",headers:{"X-fancyBox":true}},iframe:{scrolling:"auto",preload:true},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:true,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:true,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:true,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:true,title:true},onCancel:j.noop,beforeLoad:j.noop,afterLoad:j.noop,beforeShow:j.noop,afterShow:j.noop,beforeChange:j.noop,beforeClose:j.noop,afterClose:j.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:false,isOpen:false,isOpened:false,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:false},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(t,r){if(!t){return
}if(!j.isPlainObject(r)){r={}
}if(false===q.close(true)){return
}if(!j.isArray(t)){t=k(t)?j(t).get():[t]
}j.each(t,function(y,z){var x={},u,C,A,B,w,D,v;
if(j.type(z)==="object"){if(z.nodeType){z=j(z)
}if(k(z)){x={href:z.data("fancybox-href")||z.attr("href"),title:z.data("fancybox-title")||z.attr("title"),isDom:true,element:z};
if(j.metadata){j.extend(true,x,z.metadata())
}}else{x=z
}}u=r.href||x.href||(b(z)?z:null);
C=r.title!==e?r.title:x.title||"";
A=r.content||x.content;
B=A?"html":(r.type||x.type);
if(!B&&x.isDom){B=z.data("fancybox-type");
if(!B){w=z.prop("class").match(/fancybox\.(\w+)/);
B=w?w[1]:null
}}if(b(u)){if(!B){if(q.isImage(u)){B="image"
}else{if(q.isSWF(u)){B="swf"
}else{if(u.charAt(0)==="#"){B="inline"
}else{if(b(z)){B="html";
A=z
}}}}}if(B==="ajax"){D=u.split(/\s+/,2);
u=D.shift();
v=D.shift()
}}if(!A){if(B==="inline"){if(u){A=j(b(u)?u.replace(/.*(?=#[^\s]+$)/,""):u)
}else{if(x.isDom){A=z
}}}else{if(B==="html"){A=u
}else{if(!B&&!u&&x.isDom){B="inline";
A=z
}}}}j.extend(x,{href:u,type:B,content:A,title:C,selector:v});
t[y]=x
});
q.opts=j.extend(true,{},q.defaults,r);
if(r.keys!==e){q.opts.keys=r.keys?j.extend({},q.defaults.keys,r.keys):false
}q.group=t;
return q._start(q.opts.index)
},cancel:function(){var r=q.coming;
if(!r||false===q.trigger("onCancel")){return
}q.hideLoading();
if(q.ajaxLoad){q.ajaxLoad.abort()
}q.ajaxLoad=null;
if(q.imgPreload){q.imgPreload.onload=q.imgPreload.onerror=null
}if(r.wrap){r.wrap.stop(true,true).trigger("onReset").remove()
}q.coming=null;
if(!q.current){q._afterZoomOut(r)
}},close:function(r){q.cancel();
if(false===q.trigger("beforeClose")){return
}q.unbindEvents();
if(!q.isActive){return
}if(!q.isOpen||r===true){j(".fancybox-wrap").stop(true).trigger("onReset").remove();
q._afterZoomOut()
}else{q.isOpen=q.isOpened=false;
q.isClosing=true;
j(".fancybox-item, .fancybox-nav").remove();
q.wrap.stop(true,true).removeClass("fancybox-opened");
q.transitions[q.current.closeMethod]()
}},play:function(u){var r=function(){clearTimeout(q.player.timer)
},w=function(){r();
if(q.current&&q.player.isActive){q.player.timer=setTimeout(q.next,q.current.playSpeed)
}},t=function(){r();
j("body").unbind(".player");
q.player.isActive=false;
q.trigger("onPlayEnd")
},v=function(){if(q.current&&(q.current.loop||q.current.index<q.group.length-1)){q.player.isActive=true;
j("body").bind({"afterShow.player onUpdate.player":w,"onCancel.player beforeClose.player":t,"beforeLoad.player":r});
w();
q.trigger("onPlayStart")
}};
if(u===true||(!q.player.isActive&&u!==false)){v()
}else{t()
}},next:function(t){var r=q.current;
if(r){if(!b(t)){t=r.direction.next
}q.jumpto(r.index+1,t,"next")
}},prev:function(t){var r=q.current;
if(r){if(!b(t)){t=r.direction.prev
}q.jumpto(r.index-1,t,"prev")
}},jumpto:function(t,v,r){var u=q.current;
if(!u){return
}t=o(t);
q.direction=v||u.direction[(t>=u.index?"next":"prev")];
q.router=r||"jumpto";
if(u.loop){if(t<0){t=u.group.length+(t%u.group.length)
}t=t%u.group.length
}if(u.group[t]!==e){q.cancel();
q._start(t)
}},reposition:function(v,r){var u=q.current,t=u?u.wrap:null,w;
if(t){w=q._getPosition(r);
if(v&&v.type==="scroll"){delete w.position;
t.stop(true,true).animate(w,200)
}else{if(!q.isOpen){t.css(w)
}else{t.animate(w,200)
}u.pos=j.extend({},u.dim,w)
}}},update:function(u){var r=(u&&u.type),t=!r||r==="orientationchange";
if(t){clearTimeout(c);
c=null
}if(!q.isOpen||c){return
}c=setTimeout(function(){var v=q.current;
if(!v||q.isClosing){return
}q.wrap.removeClass("fancybox-tmp");
if(t||r==="load"||(r==="resize"&&v.autoResize)){q._setDimension()
}if(!(r==="scroll"&&v.canShrink)){q.reposition(u)
}q.trigger("onUpdate");
c=null
},(t&&!f?0:300))
},toggle:function(r){if(q.isOpen){q.current.fitToView=j.type(r)==="boolean"?r:!q.current.fitToView;
if(f){q.wrap.removeAttr("style").addClass("fancybox-tmp");
q.trigger("onUpdate")
}q.update()
}},hideLoading:function(){a.unbind(".loading");
j("#fancybox-loading").remove()
},showLoading:function(){var t,r;
q.hideLoading();
t=j('<div id="fancybox-loading"><div></div></div>').click(q.cancel).appendTo("body");
a.bind("keydown.loading",function(u){if((u.which||u.keyCode)===27){u.preventDefault();
q.cancel()
}});
if(!q.defaults.fixed){r=q.getViewport();
t.css({position:"absolute",top:(r.h*0.5)+r.y,left:(r.w*0.5)+r.x})
}},getViewport:function(){var r=(q.current&&q.current.locked)||false,t={x:d.scrollLeft(),y:d.scrollTop()};
if(r){t.w=r[0].clientWidth;
t.h=r[0].clientHeight
}else{t.w=f&&m.innerWidth?m.innerWidth:d.width();
t.h=f&&m.innerHeight?m.innerHeight:d.height()
}return t
},unbindEvents:function(){if(q.wrap&&k(q.wrap)){q.wrap.unbind(".fb")
}a.unbind(".fb");
d.unbind(".fb")
},bindEvents:function(){var t=q.current,r;
if(!t){return
}d.bind("orientationchange.fb"+(f?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),q.update);
r=t.keys;
if(r){a.bind("keydown.fb",function(w){var u=w.which||w.keyCode,v=w.target||w.srcElement;
if(u===27&&q.coming){return false
}if(!w.ctrlKey&&!w.altKey&&!w.shiftKey&&!w.metaKey&&!(v&&(v.type||j(v).is("[contenteditable]")))){j.each(r,function(x,y){if(t.group.length>1&&y[u]!==e){q[x](y[u]);
w.preventDefault();
return false
}if(j.inArray(u,y)>-1){q[x]();
w.preventDefault();
return false
}})
}})
}if(j.fn.mousewheel&&t.mouseWheel){q.wrap.bind("mousewheel.fb",function(z,A,v,u){var y=z.target||null,w=j(y),x=false;
while(w.length){if(x||w.is(".fancybox-skin")||w.is(".fancybox-wrap")){break
}x=h(w[0]);
w=j(w).parent()
}if(A!==0&&!x){if(q.group.length>1&&!t.canShrink){if(u>0||v>0){q.prev(u>0?"down":"left")
}else{if(u<0||v<0){q.next(u<0?"up":"right")
}}z.preventDefault()
}}})
}},trigger:function(t,v){var r,u=v||q.coming||q.current;
if(!u){return
}if(j.isFunction(u[t])){r=u[t].apply(u,Array.prototype.slice.call(arguments,1))
}if(r===false){return false
}if(u.helpers){j.each(u.helpers,function(x,w){if(w&&q.helpers[x]&&j.isFunction(q.helpers[x][t])){w=j.extend(true,{},q.helpers[x].defaults,w);
q.helpers[x][t](w,u)
}})
}j.event.trigger(t+".fb")
},isImage:function(r){return b(r)&&r.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
},isSWF:function(r){return b(r)&&r.match(/\.(swf)((\?|#).*)?$/i)
},_start:function(t){var u={},y,r,v,w,x;
t=o(t);
y=q.group[t]||null;
if(!y){return false
}u=j.extend(true,{},q.opts,y);
w=u.margin;
x=u.padding;
if(j.type(w)==="number"){u.margin=[w,w,w,w]
}if(j.type(x)==="number"){u.padding=[x,x,x,x]
}if(u.modal){j.extend(true,u,{closeBtn:false,closeClick:false,nextClick:false,arrows:false,mouseWheel:false,keys:null,helpers:{overlay:{closeClick:false}}})
}if(u.autoSize){u.autoWidth=u.autoHeight=true
}if(u.width==="auto"){u.autoWidth=true
}if(u.height==="auto"){u.autoHeight=true
}u.group=q.group;
u.index=t;
q.coming=u;
if(false===q.trigger("beforeLoad")){q.coming=null;
return
}v=u.type;
r=u.href;
if(!v){q.coming=null;
if(q.current&&q.router&&q.router!=="jumpto"){q.current.index=t;
return q[q.router](q.direction)
}return false
}q.isActive=true;
if(v==="image"||v==="swf"){u.autoHeight=u.autoWidth=false;
u.scrolling="visible"
}if(v==="image"){u.aspectRatio=true
}if(v==="iframe"&&f){u.scrolling="scroll"
}u.wrap=j(u.tpl.wrap).addClass("fancybox-"+(f?"mobile":"desktop")+" fancybox-type-"+v+" fancybox-tmp "+u.wrapCSS).appendTo(u.parent||"body");
j.extend(u,{skin:j(".fancybox-skin",u.wrap),outer:j(".fancybox-outer",u.wrap),inner:j(".fancybox-inner",u.wrap)});
j.each(["Top","Right","Bottom","Left"],function(A,z){u.skin.css("padding"+z,g(u.padding[A]))
});
q.trigger("onReady");
if(v==="inline"||v==="html"){if(!u.content||!u.content.length){return q._error("content")
}}else{if(!r){return q._error("href")
}}if(v==="image"){q._loadImage()
}else{if(v==="ajax"){q._loadAjax()
}else{if(v==="iframe"){q._loadIframe()
}else{q._afterLoad()
}}}},_error:function(r){j.extend(q.coming,{type:"html",autoWidth:true,autoHeight:true,minWidth:0,minHeight:0,scrolling:"no",hasError:r,content:q.coming.tpl.error});
q._afterLoad()
},_loadImage:function(){var r=q.imgPreload=new Image();
r.onload=function(){this.onload=this.onerror=null;
q.coming.width=this.width;
q.coming.height=this.height;
q._afterLoad()
};
r.onerror=function(){this.onload=this.onerror=null;
q._error("image")
};
r.src=q.coming.href;
if(r.complete!==true){q.showLoading()
}},_loadAjax:function(){var r=q.coming;
q.showLoading();
q.ajaxLoad=j.ajax(j.extend({},r.ajax,{url:r.href,error:function(t,u){if(q.coming&&u!=="abort"){q._error("ajax",t)
}else{q.hideLoading()
}},success:function(t,u){if(u==="success"){r.content=t;
q._afterLoad()
}}}))
},_loadIframe:function(){var r=q.coming,t=j(r.tpl.iframe.replace(/\{rnd\}/g,new Date().getTime())).attr("scrolling",f?"auto":r.iframe.scrolling).attr("src",r.href);
j(r.wrap).bind("onReset",function(){try{j(this).find("iframe").hide().attr("src","//about:blank").end().empty()
}catch(u){}});
if(r.iframe.preload){q.showLoading();
t.one("load",function(){j(this).data("ready",1);
if(!f){j(this).bind("load.fb",q.update)
}j(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
q._afterLoad()
})
}r.content=t.appendTo(r.inner);
if(!r.iframe.preload){q._afterLoad()
}},_preloadImages:function(){var x=q.group,w=q.current,r=x.length,u=w.preload?Math.min(w.preload,r-1):0,v,t;
for(t=1;
t<=u;
t+=1){v=x[(w.index+t)%r];
if(v.type==="image"&&v.href){new Image().src=v.href
}}},_afterLoad:function(){var t=q.coming,v=q.current,A="fancybox-placeholder",x,y,z,u,r,w;
q.hideLoading();
if(!t||q.isActive===false){return
}if(false===q.trigger("afterLoad",t,v)){t.wrap.stop(true).trigger("onReset").remove();
q.coming=null;
return
}if(v){q.trigger("beforeChange",v);
v.wrap.stop(true).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()
}q.unbindEvents();
x=t;
y=t.content;
z=t.type;
u=t.scrolling;
j.extend(q,{wrap:x.wrap,skin:x.skin,outer:x.outer,inner:x.inner,current:x,previous:v});
r=x.href;
switch(z){case"inline":case"ajax":case"html":if(x.selector){y=j("<div>").html(y).find(x.selector)
}else{if(k(y)){if(!y.data(A)){y.data(A,j('<div class="'+A+'"></div>').insertAfter(y).hide())
}y=y.show().detach();
x.wrap.bind("onReset",function(){if(j(this).find(y).length){y.hide().replaceAll(y.data(A)).data(A,false)
}})
}}break;
case"image":y=x.tpl.image.replace("{href}",r);
break;
case"swf":y='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+r+'"></param>';
w="";
j.each(x.swf,function(B,C){y+='<param name="'+B+'" value="'+C+'"></param>';
w+=" "+B+'="'+C+'"'
});
y+='<embed src="'+r+'" type="application/x-shockwave-flash" width="100%" height="100%"'+w+"></embed></object>";
break
}if(!(k(y)&&y.parent().is(x.inner))){x.inner.append(y)
}q.trigger("beforeShow");
x.inner.css("overflow",u==="yes"?"scroll":(u==="no"?"hidden":u));
q._setDimension();
q.reposition();
q.isOpen=false;
q.coming=null;
q.bindEvents();
if(!q.isOpened){j(".fancybox-wrap").not(x.wrap).stop(true).trigger("onReset").remove()
}else{if(v.prevMethod){q.transitions[v.prevMethod]()
}}q.transitions[q.isOpened?x.nextMethod:x.openMethod]();
q._preloadImages()
},_setDimension:function(){var V=q.getViewport(),R=0,X=false,Z=false,D=q.wrap,P=q.skin,aa=q.inner,M=q.current,N=M.width,K=M.height,G=M.minWidth,z=M.minHeight,T=M.maxWidth,L=M.maxHeight,F=M.scrolling,x=M.scrollOutside?M.scrollbarWidth:0,J=M.margin,y=o(J[1]+J[3]),w=o(J[0]+J[2]),u,t,Q,S,I,H,O,B,A,W,v,Y,r,C,E;
D.add(P).add(aa).width("auto").height("auto").removeClass("fancybox-tmp");
u=o(P.outerWidth(true)-P.width());
t=o(P.outerHeight(true)-P.height());
Q=y+u;
S=w+t;
I=n(N)?(V.w-Q)*o(N)/100:N;
H=n(K)?(V.h-S)*o(K)/100:K;
if(M.type==="iframe"){C=M.content;
if(M.autoHeight&&C.data("ready")===1){try{if(C[0].contentWindow.document.location){aa.width(I).height(9999);
E=C.contents().find("body");
if(x){E.css("overflow-x","hidden")
}H=E.height()
}}catch(U){}}}else{if(M.autoWidth||M.autoHeight){aa.addClass("fancybox-tmp");
if(!M.autoWidth){aa.width(I)
}if(!M.autoHeight){aa.height(H)
}if(M.autoWidth){I=aa.width()
}if(M.autoHeight){H=aa.height()
}aa.removeClass("fancybox-tmp")
}}N=o(I);
K=o(H);
A=I/H;
G=o(n(G)?o(G,"w")-Q:G);
T=o(n(T)?o(T,"w")-Q:T);
z=o(n(z)?o(z,"h")-S:z);
L=o(n(L)?o(L,"h")-S:L);
O=T;
B=L;
if(M.fitToView){T=Math.min(V.w-Q,T);
L=Math.min(V.h-S,L)
}Y=V.w-y;
r=V.h-w;
if(M.aspectRatio){if(N>T){N=T;
K=o(N/A)
}if(K>L){K=L;
N=o(K*A)
}if(N<G){N=G;
K=o(N/A)
}if(K<z){K=z;
N=o(K*A)
}}else{N=Math.max(G,Math.min(N,T));
if(M.autoHeight&&M.type!=="iframe"){aa.width(N);
K=aa.height()
}K=Math.max(z,Math.min(K,L))
}if(M.fitToView){aa.width(N).height(K);
D.width(N+u);
W=D.width();
v=D.height();
if(M.aspectRatio){while((W>Y||v>r)&&N>G&&K>z){if(R++>19){break
}K=Math.max(z,Math.min(L,K-10));
N=o(K*A);
if(N<G){N=G;
K=o(N/A)
}if(N>T){N=T;
K=o(N/A)
}aa.width(N).height(K);
D.width(N+u);
W=D.width();
v=D.height()
}}else{N=Math.max(G,Math.min(N,N-(W-Y)));
K=Math.max(z,Math.min(K,K-(v-r)))
}}if(x&&F==="auto"&&K<H&&(N+u+x)<Y){N+=x
}aa.width(N).height(K);
D.width(N+u);
W=D.width();
v=D.height();
X=(W>Y||v>r)&&N>G&&K>z;
Z=M.aspectRatio?(N<O&&K<B&&N<I&&K<H):((N<O||K<B)&&(N<I||K<H));
j.extend(M,{dim:{width:g(W),height:g(v)},origWidth:I,origHeight:H,canShrink:X,canExpand:Z,wPadding:u,hPadding:t,wrapSpace:v-P.outerHeight(true),skinSpace:P.height()-K});
if(!C&&M.autoHeight&&K>z&&K<L&&!Z){aa.height("auto")
}},_getPosition:function(u){var y=q.current,t=q.getViewport(),w=y.margin,v=q.wrap.width()+w[1]+w[3],r=q.wrap.height()+w[0]+w[2],x={position:"absolute",top:w[0],left:w[3]};
if(y.autoCenter&&y.fixed&&!u&&r<=t.h&&v<=t.w){x.position="fixed"
}else{if(!y.locked){x.top+=t.y;
x.left+=t.x
}}x.top=g(Math.max(x.top,x.top+((t.h-r)*y.topRatio)));
x.left=g(Math.max(x.left,x.left+((t.w-v)*y.leftRatio)));
return x
},_afterZoomIn:function(){var r=q.current;
if(!r){return
}q.isOpen=q.isOpened=true;
q.wrap.css("overflow","visible").addClass("fancybox-opened");
q.update();
if(r.closeClick||(r.nextClick&&q.group.length>1)){q.inner.css("cursor","pointer").bind("click.fb",function(t){if(!j(t.target).is("a")&&!j(t.target).parent().is("a")){t.preventDefault();
q[r.closeClick?"close":"next"]()
}})
}if(r.closeBtn){j(r.tpl.closeBtn).appendTo(q.skin).bind("click.fb",function(t){t.preventDefault();
q.close()
})
}if(r.arrows&&q.group.length>1){if(r.loop||r.index>0){j(r.tpl.prev).appendTo(q.outer).bind("click.fb",q.prev)
}if(r.loop||r.index<q.group.length-1){j(r.tpl.next).appendTo(q.outer).bind("click.fb",q.next)
}}q.trigger("afterShow");
if(!r.loop&&r.index===r.group.length-1){q.play(false)
}else{if(q.opts.autoPlay&&!q.player.isActive){q.opts.autoPlay=false;
q.play()
}}},_afterZoomOut:function(r){r=r||q.current;
j(".fancybox-wrap").trigger("onReset").remove();
j.extend(q,{group:{},opts:{},router:false,current:null,isActive:false,isOpened:false,isOpen:false,isClosing:false,wrap:null,skin:null,outer:null,inner:null});
q.trigger("afterClose",r)
}});
q.transitions={getOrigPosition:function(){var v=q.current,t=v.element,y=v.orig,x={},r=50,z=50,w=v.hPadding,A=v.wPadding,u=q.getViewport();
if(!y&&v.isDom&&t.is(":visible")){y=t.find("img:first");
if(!y.length){y=t
}}if(k(y)){x=y.offset();
if(y.is("img")){r=y.outerWidth();
z=y.outerHeight()
}}else{x.top=u.y+(u.h-z)*v.topRatio;
x.left=u.x+(u.w-r)*v.leftRatio
}if(q.wrap.css("position")==="fixed"||v.locked){x.top-=u.y;
x.left-=u.x
}x={top:g(x.top-w*v.topRatio),left:g(x.left-A*v.leftRatio),width:g(r+A),height:g(z+w)};
return x
},step:function(t,u){var w,y,z,r=u.prop,v=q.current,x=v.wrapSpace,A=v.skinSpace;
if(r==="width"||r==="height"){w=u.end===u.start?1:(t-u.start)/(u.end-u.start);
if(q.isClosing){w=1-w
}y=r==="width"?v.wPadding:v.hPadding;
z=t-y;
q.skin[r](o(r==="width"?z:z-(x*w)));
q.inner[r](o(r==="width"?z:z-(x*w)-(A*w)))
}},zoomIn:function(){var w=q.current,t=w.pos,u=w.openEffect,v=u==="elastic",r=j.extend({opacity:1},t);
delete r.position;
if(v){t=this.getOrigPosition();
if(w.openOpacity){t.opacity=0.1
}}else{if(u==="fade"){t.opacity=0.1
}}q.wrap.css(t).animate(r,{duration:u==="none"?0:w.openSpeed,easing:w.openEasing,step:v?this.step:null,complete:q._afterZoomIn})
},zoomOut:function(){var v=q.current,t=v.closeEffect,u=t==="elastic",r={opacity:0.1};
if(u){r=this.getOrigPosition();
if(v.closeOpacity){r.opacity=0.1
}}q.wrap.animate(r,{duration:t==="none"?0:v.closeSpeed,easing:v.closeEasing,step:u?this.step:null,complete:q._afterZoomOut})
},changeIn:function(){var x=q.current,u=x.nextEffect,t=x.pos,r={opacity:1},w=q.direction,y=200,v;
t.opacity=0.1;
if(u==="elastic"){v=w==="down"||w==="up"?"top":"left";
if(w==="down"||w==="right"){t[v]=g(o(t[v])-y);
r[v]="+="+y+"px"
}else{t[v]=g(o(t[v])+y);
r[v]="-="+y+"px"
}}if(u==="none"){q._afterZoomIn()
}else{q.wrap.css(t).animate(r,{duration:x.nextSpeed,easing:x.nextEasing,complete:q._afterZoomIn})
}},changeOut:function(){var u=q.previous,t=u.prevEffect,r={opacity:0.1},v=q.direction,w=200;
if(t==="elastic"){r[v==="down"||v==="up"?"top":"left"]=(v==="up"||v==="left"?"-":"+")+"="+w+"px"
}u.wrap.animate(r,{duration:t==="none"?0:u.prevSpeed,easing:u.prevEasing,complete:function(){j(this).trigger("onReset").remove()
}})
}};
q.helpers.overlay={defaults:{closeClick:true,speedOut:200,showEarly:true,css:{},locked:!f,fixed:true},overlay:null,fixed:false,create:function(r){r=j.extend({},this.defaults,r);
if(this.overlay){this.close()
}this.overlay=j('<div class="fancybox-overlay"></div>').appendTo("body");
this.fixed=false;
if(r.fixed&&q.defaults.fixed){this.overlay.addClass("fancybox-overlay-fixed");
this.fixed=true
}},open:function(t){var r=this;
t=j.extend({},this.defaults,t);
if(this.overlay){this.overlay.unbind(".overlay").width("auto").height("auto")
}else{this.create(t)
}if(!this.fixed){d.bind("resize.overlay",j.proxy(this.update,this));
this.update()
}if(t.closeClick){this.overlay.bind("click.overlay",function(u){if(j(u.target).hasClass("fancybox-overlay")){if(q.isActive){q.close()
}else{r.close()
}}})
}this.overlay.css(t.css).show()
},close:function(){j(".fancybox-overlay").remove();
d.unbind("resize.overlay");
this.overlay=null;
if(this.margin!==false){j("body").css("margin-right",this.margin);
this.margin=false
}if(this.el){this.el.removeClass("fancybox-lock")
}},update:function(){var t="100%",r;
this.overlay.width(t).height("100%");
if(l){r=Math.max(p.documentElement.offsetWidth,p.body.offsetWidth);
if(a.width()>r){t=a.width()
}}else{if(a.width()>d.width()){t=a.width()
}}this.overlay.width(t).height(a.height())
},onReady:function(r,t){j(".fancybox-overlay").stop(true,true);
if(!this.overlay){this.margin=a.height()>d.height()||j("body").css("overflow-y")==="scroll"?j("body").css("margin-right"):false;
this.el=p.all&&!p.querySelector?j("html"):j("body");
this.create(r)
}if(r.locked&&this.fixed){t.locked=this.overlay.append(t.wrap);
t.fixed=false
}if(r.showEarly===true){this.beforeShow.apply(this,arguments)
}},beforeShow:function(r,t){if(t.locked){this.el.addClass("fancybox-lock");
if(this.margin!==false){j("body").css("margin-right",o(this.margin)+t.scrollbarWidth)
}}this.open(r)
},onUpdate:function(){if(!this.fixed){this.update()
}},afterClose:function(r){if(this.overlay&&!q.isActive){this.overlay.fadeOut(r.speedOut,j.proxy(this.close,this))
}}};
q.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(t){var v=q.current,x=v.title,r=t.type,w,u;
if(j.isFunction(x)){x=x.call(v.element,v)
}if(!b(x)||j.trim(x)===""){return
}w=j('<div class="fancybox-title fancybox-title-'+r+'-wrap">'+x+"</div>");
switch(r){case"inside":u=q.skin;
break;
case"outside":u=q.wrap;
break;
case"over":u=q.inner;
break;
default:u=q.skin;
w.appendTo("body");
if(l){w.width(w.width())
}w.wrapInner('<span class="child"></span>');
q.current.margin[2]+=Math.abs(o(w.css("margin-bottom")));
break
}w[(t.position==="top"?"prependTo":"appendTo")](u)
}};
j.fn.fancybox=function(u){var t,v=j(this),r=this.selector||"",w=function(A){var z=j(this).blur(),x=t,y,B;
if(!(A.ctrlKey||A.altKey||A.shiftKey||A.metaKey)&&!z.is(".fancybox-wrap")){y=u.groupAttr||"data-fancybox-group";
B=z.attr(y);
if(!B){y="rel";
B=z.get(0)[y]
}if(B&&B!==""&&B!=="nofollow"){z=r.length?j(r):v;
z=z.filter("["+y+'="'+B+'"]');
x=z.index(this)
}u.index=x;
if(q.open(z,u)!==false){A.preventDefault()
}}};
u=u||{};
t=u.index||0;
if(!r||u.live===false){v.unbind("click.fb-start").bind("click.fb-start",w)
}else{a.undelegate(r,"click.fb-start").delegate(r+":not('.fancybox-item, .fancybox-nav')","click.fb-start",w)
}this.filter("[data-fancybox-start=1]").trigger("click");
return this
};
a.ready(function(){if(j.scrollbarWidth===e){j.scrollbarWidth=function(){var t=j('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),u=t.children(),r=u.innerWidth()-u.height(99).innerWidth();
t.remove();
return r
}
}if(j.support.fixedPosition===e){j.support.fixedPosition=(function(){var t=j('<div style="position:fixed;top:20px;"></div>').appendTo("body"),r=(t[0].offsetTop===20||t[0].offsetTop===15);
t.remove();
return r
}())
}j.extend(q.defaults,{scrollbarWidth:j.scrollbarWidth(),fixed:j.support.fixedPosition,parent:j("body")})
})
}(window,document,jQuery));
(function(a){a.extend(a,{placeholder:{browser_supported:function(){return this._supported!==undefined?this._supported:(this._supported=!!("placeholder" in a('<input type="text">')[0]))
},shim:function(c){var b={color:"#888",cls:"placeholder",selector:"input[placeholder], textarea[placeholder]"};
a.extend(b,c);
return !this.browser_supported()&&a(b.selector)._placeholder_shim(b)
}}});
a.extend(a.fn,{_placeholder_shim:function(d){function c(f){var g=a(f).offsetParent().offset();
var e=a(f).offset();
return{top:e.top-g.top,left:e.left-g.left,width:a(f).width()}
}function b(f){var e=f.data("target");
if(typeof e!=="undefined"){f.css(c(e));
a(window).one("resize",function(){b(f)
})
}}return this.each(function(){var h=a(this);
if(h.is(":visible")){if(h.data("placeholder")){var e=h.data("placeholder");
e.css(c(h));
return true
}var g={};
if(!h.is("textarea")&&h.css("height")!="auto"){g={lineHeight:h.css("height"),whiteSpace:"nowrap"}
}var f=a("<label />").text(h.attr("placeholder")).addClass(d.cls).css(a.extend({position:"absolute",display:"inline","float":"none",overflow:"hidden",textAlign:"left",color:d.color,cursor:"text",marginTop:h.css("border-bottom-width"),paddingTop:h.css("padding-top"),paddingRight:h.css("padding-right"),paddingBottom:h.css("padding-bottom"),paddingLeft:h.css("padding-left"),fontSize:h.css("font-size"),fontFamily:h.css("font-family"),fontStyle:h.css("font-style"),fontWeight:h.css("font-weight"),textTransform:h.css("text-transform"),backgroundColor:"transparent",zIndex:99},g)).css(c(this)).attr("for",this.id).data("target",h).click(function(){a(this).data("target").focus()
}).insertBefore(this);
h.data("placeholder",f).focus(function(){f.hide()
}).blur(function(){f[h.val().length?"hide":"show"]()
}).triggerHandler("blur");
h.change(function(){f[h.val().length>0?"hide":"show"]()
});
a(window).one("resize",function(){b(f)
})
}})
}})
})(jQuery);
jQuery(document).add(window).bind("ready load",function(){if(jQuery.placeholder){jQuery.placeholder.shim()
}});
$.priorityQ.domReady.add("User Service",$.priorityQ.IMPORTANT,function(){function a(){var b=this;
b.userData={};
var c=$(".user-nav");
b.config={};
b._configureLinks();
b._updateLastVisited();
b.signin();
b.statePolling=setInterval(function(){b.checkState()
},1000)
}a.prototype={events:{signedIn:{bind:function(b){$(document).on("userSignedIn",b)
},unbind:function(b){$(document).unbind(b)
},trigger:function(){$(document).trigger("userSignedIn")
}},signedOut:{bind:function(b){$(document).on("userSignedOut",b)
},unbind:function(b){$(document).unbind(b)
},trigger:function(){$(document).trigger("userSignedOut")
}},refreshUI:{bind:function(b){$(document).on("userRefreshUI",b)
},unbind:function(b){$(document).unbind(b)
},trigger:function(){$(document).trigger("userRefreshUI")
}}},signout:function(){var b=this;
b.userData={};
$.cookie("nb_u",null,{path:"/"});
$.cookie("nb_s",null,{path:"/"});
b.events.signedOut.trigger()
},signin:function(){var c=this;
var b=c.fetchState();
if(typeof b!="undefined"){c.userData=b;
c.events.signedIn.trigger();
$.log("User is signed in",b)
}},checkState:function(){var b=this.fetchState();
if(b&&this.userData&&b.checksum!=this.userData.checksum){$.log("Change in user state detected",b.id);
if(b.id&&b.id!=""){this.signin()
}else{this.signout()
}}},fetchState:function(){var d=this;
var c={};
var g=$.cookie("nb_u");
g=g?decodeURIComponent(g):"";
var f=$.cookie("nb_s");
f=f?decodeURIComponent(f):"";
try{var b=jQuery.base64.decode(g);
if(b&&b!=""){c=JSON.parse(b);
c.sessionId=f
}}catch(h){$.error("Could not fetch user state - something isn't right, signout",h.stack);
d.signout()
}return c
},hasActiveSession:function(){var b=this;
return b.userData&&b.userData.sessionId&&b.userData.sessionId!=""
},isUserSignedIn:function(){var b=this;
return !$.isEmptyObject(b.userData)
},getDisplayName:function(){var b=this;
var c="";
if(b.userData){c=b.userData.username;
$.log("Setting display name:"+c);
if(!c){c=b.getEmail()
}if(!c){c="Signed In"
}}return $("<div/>").text(c).html()
},getId:function(){return this.userData.id
},getEmail:function(){return this.userData.email
},getLastVisited:function(){return $.cookie("nb_l")
},_updateLastVisited:function(){var b=window.location.pathname;
if($(".not-returnable").length<=0){var c=window.location.protocol+"//"+window.location.host+window.location.pathname;
$.cookie("nb_l",c,{path:"/",expires:1})
}},_configureLinks:function(){var b=$("#user-and-nav-links").data();
if(b!=null){this.config.links=b.links
}else{$.error("couldn't get links from config - user dialogs are probably broken")
}}};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.service=new a()
});
$.priorityQ.domReady.add("User Interactive Child Dispatcher",$.priorityQ.IMPORTANT,function(){function a(){var b=this;
b.userService=dailybeast.user.service;
b.referrer=$.tdburl.param.referrer;
b.refreshUI()
}a.prototype={navigate:function(b){if(b.indexOf("/content/user")>=0){window.location=b
}else{this._postMessage("navigate",{href:b})
}},cancel:function(){this._postMessage("cancel")
},startSignin:function(){this._postMessage("startSignin")
},afterSignin:function(){this._postMessage("afterSignin")
},afterSignup:function(){this._postMessage("afterSignup")
},startSignout:function(){this._postMessage("startSignout")
},afterSignout:function(){this._postMessage("afterSignout")
},startPaymentJourney:function(b){this._postMessage("startPaymentJourney")
},startUsernameJourney:function(){this._postMessage("startUsernameJourney")
},refreshUI:function(){var b=this;
b._attachInteractiveLinks();
b.$pageBody=$(".user-page");
b.height=b.$pageBody.height();
if(b.resizer){clearInterval(b.resizer)
}b.resizer=setInterval(function(){var c=b.$pageBody.height();
if(c!=b.height){b.height=c;
b._reportHeight(b.height)
}},500);
b._reportHeight(b.height)
},_postMessage:function(c,b){var d=b||{};
d.event=c;
$.log("Posting a message from the child to: http://"+window.location.host,d);
setTimeout(function(){window.parent.postMessage(JSON.stringify(d),"*")
},0)
},_doctorUrl:function(b){b=b.replace(/#.*/,"");
if(this.referrer){var c="referrer="+encodeURIComponent(this.referrer);
b+=b.indexOf("?")>=0?"&"+c:"?"+c
}return b
},_reportHeight:function(b){this._postMessage("_resizeFancyBox",{height:b+150})
},_attachInteractiveLinks:function(){var b=this;
$(".user-intercept a").on("click",function(d){var f=$(this);
if(!f.hasClass("dispatcher-ignore")){d.preventDefault();
var c=f.attr("href");
if(f.hasClass("continue")){b.afterSignin()
}else{if(f.hasClass("cancel")){b.cancel()
}else{if(c.indexOf("/content/user")>=0){window.location=b._doctorUrl(c)
}else{b.navigate(c)
}}}}});
$(".user-intercept form").each(function(c,e){var d=$(e);
d.attr("action",b._doctorUrl(d.attr("action")))
})
}};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.dispatcherRegistry=window.dailybeast.user.dispatcherRegistry||{};
window.dailybeast.user.dispatcherRegistry.InteractiveChildDispatcher=a
});
$.priorityQ.domReady.add("User Interactive Dispatcher",$.priorityQ.IMPORTANT,function(){function a(){var b=this;
b.userService=dailybeast.user.service;
var c=function(d){try{var g=d.originalEvent;
var f=JSON.parse(g.data);
$.log("Message received",g);
if(a.sameDomain(g.origin)){switch(f.event){case"cancel":$.log("Cancel received from child frame",f,g.origin);
b._closeFancyBox();
break;
case"startSignin":$.log("Start Signin received from child frame",f,g.origin);
b.startSignin();
break;
case"afterSignin":$.log("After Signin received from child frame",f,g.origin);
b.afterSignin();
break;
case"startSignout":$.log("Start Signout received from child frame",f,g.origin);
b.startSignout();
break;
case"afterSignup":$.log("After Signup received from child frame",f,g.origin);
b.afterSignup();
break;
case"navigate":$.log("Navigate received from child frame",f,g.origin);
if(f.href){b.navigate(f.href)
}break;
case"startPaymentJourney":$.log("Start Payment Journey received from child frame",f,g.origin);
if(f.href){b.startPaymentJourney(f.href)
}case"startUsernameJourney":$.log("Start Username Journey received from child frame",f,g.origin);
if(f.href){b.startUsernameJourney()
}case"_resizeFancyBox":$.log("Resize FancyBox received from child frame",f,g.origin);
b._resizeFancyBox(f);
break
}}}catch(g){}};
$(window).bind("message",c)
}a.sameDomain=function(b){var c=b.split(".");
while(c.length>2){c.shift()
}return(window.location.host.indexOf(c.join("."))>=0)
};
a.prototype={navigate:function(b){window.location=b
},startSignin:function(){this._openFancyBox({href:this.userService.config.links.user.signin})
},afterSignin:function(){this._closeFancyBox()
},startSignout:function(){this.userService.signout()
},afterSignout:function(){},afterSignup:function(){var b=this;
setTimeout(function(){b._closeFancyBox()
},30000)
},startPaymentJourney:function(b){this._openFancyBox({href:b})
},startUsernameJourney:function(){this._openFancyBox({href:this.userService.config.links.user.addUsername})
},refreshUI:function(){},_openFancyBox:function(e){var d=this;
if(!d.$fancyBoxAnchor){$.log("Adding an anchor for fancybox");
var c=Math.random()*10000000000|0;
$("body").append("<span id='"+c+"' class='loginFancyboxAnchor'></span>");
d.$fancyBoxAnchor=$("#"+c);
d.$fancyBoxAnchor.loader=new CanvasLoader(c,{id:"fancybox-loader"});
var b=d.$fancyBoxAnchor.loader;
b.setColor("#e81e1e");
b.setDiameter(63);
b.setDensity(59);
b.setRange(0.6);
b.setSpeed(4);
b.setFPS(30)
}d.$fancybox=d.$fancyBoxAnchor.fancybox($.extend({padding:0,scrolling:"no",maxWidth:"450px",fitToView:false,autoSize:false,autoResize:true,autoCenter:false,type:"iframe",iframe:{scrolling:"no",},nextSpeed:0,prevSpeed:0,beforeLoad:function(){d.$fancyBoxAnchor.loader.show()
},afterShow:function(){d.$fancyBoxAnchor.loader.hide()
},beforeClose:function(){d.$fancyBoxAnchor.loader.show()
},afterClose:function(){d.$fancyBoxAnchor.loader.hide();
d.userService.checkState()
},helpers:{overlay:{locked:false}}},e));
d.$fancyBoxAnchor.trigger("click")
},_closeFancyBox:function(){if($.fancybox.isOpen||$.fancybox.isActive){$.fancybox.close()
}},_resizeFancyBox:function(d){if($.fancybox.current){var e=d.width+30;
var c=$.fancybox.current.width;
if(e&&(Math.abs(e-c)>80)){$.fancybox.current.content.width(e);
$.fancybox.inner.animate({width:e},300,function(){$.fancybox.reposition()
});
$.fancybox.current.maxWidth=e;
$.fancybox.current.width=e
}var b=d.height+30;
var f=$.fancybox.current.height;
if(b&&(Math.abs(b-f)>80)){$.fancybox.current.content.height(b);
$.fancybox.inner.animate({height:b},300,function(){$.fancybox.reposition()
});
$.fancybox.current.maxHeight=b;
$.fancybox.current.height=b
}}},};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.dispatcherRegistry=window.dailybeast.user.dispatcherRegistry||{};
window.dailybeast.user.dispatcherRegistry.InteractiveDispatcher=a
});
$.priorityQ.domReady.add("User Page Dispatcher",$.priorityQ.IMPORTANT,function(){function a(){var b=this;
b.userService=dailybeast.user.service;
b.userService.events.signedOut.bind(function(c){b.afterSignout()
});
b.refreshUI()
}a.prototype={navigate:function(b){if(b&&b.indexOf("/content/user")>=0){window.location=this._doctorUrl(b)
}else{window.location=b
}},cancel:function(){this.navigate(this.userService.config.links.user.resume)
},startSignin:function(){this.navigate(this.userService.config.links.user.signin)
},afterSignin:function(){this.navigate(this.userService.config.links.user.resume)
},startSignout:function(){this.userService.signout()
},afterSignout:function(){this.startSignin()
},afterSignup:function(){var b=this;
setTimeout(function(){b.afterSignin()
},30000)
},startPaymentJourney:function(b){this.navigate(b)
},startUsernameJourney:function(){this.navigate(this.userService.config.links.user.addUsername)
},refreshUI:function(){this.referrer=$.tdburl.param.referrer;
this._attachUIEvents()
},_attachUIEvents:function(){var b=this;
$(".user-intercept a").on("click",function(f){var d=$(this);
if(!d.hasClass("dispatcher-ignore")){f.preventDefault();
var c=d.attr("href");
if(d.hasClass("continue")){b.afterSignin()
}else{if(d.hasClass("cancel")){b.cancel()
}else{if(c&&c.indexOf("/content/user")>=0){window.location=b._doctorUrl(c)
}else{b.navigate(c)
}}}}});
$(".user-intercept form").each(function(c,e){var d=$(e);
d.attr("action",b._doctorUrl(d.attr("action")))
})
},_doctorUrl:function(b){if(this.referrer&&b.indexOf("referrer=")<0&&this.referrer!=b){var c="referrer="+encodeURIComponent(this.referrer);
b+=b.indexOf("?")>=0?"&"+c:"?"+c
}return b
}};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.dispatcherRegistry=window.dailybeast.user.dispatcherRegistry||{};
window.dailybeast.user.dispatcherRegistry.PageDispatcher=a
});
$.priorityQ.domReady.add("User Dispatcher",$.priorityQ.IMPORTANT,function(){function a(){var c=this;
c.userService=dailybeast.user.service;
var b=dailybeast.user.dispatcherRegistry;
var e=function(){return(window.location+"").indexOf("/content/user")>=0&&window.parent!=window
};
var d=function(){return $(window).width()>550&&(window.location+"").indexOf("/content/user")<0&&window.postMessage
};
if(e()){$.log("Using the Interactive Child Dispatcher",window.location);
c.delegate=new b.InteractiveChildDispatcher()
}else{if(d()){$.log("Using the Interactive Dispatcher",window.location);
c.delegate=new b.InteractiveDispatcher()
}else{$.log("Using the Page Dispatcher",window.location);
c.delegate=new b.PageDispatcher()
}}c.userService.events.refreshUI.bind(function(f){c.refreshUI()
})
}a.prototype={navigate:function(b){if(this.delegate){this.delegate.navigate(b)
}},cancel:function(){if(this.delegate){this.delegate.cancel()
}},startSignin:function(){if(this.delegate){this.delegate.startSignin()
}},afterSignin:function(){if(this.delegate){this.delegate.afterSignin()
}},startSignout:function(){if(this.delegate){this.delegate.startSignout()
}},afterSignout:function(){if(this.delegate){this.delegate.afterSignout()
}},afterSignup:function(){if(this.delegate){this.delegate.afterSignup()
}},startPaymentJourney:function(b){if(this.delegate){this.delegate.startPaymentJourney(b)
}},startUsernameJourney:function(){if(this.delegate){this.delegate.startUsernameJourney()
}},refreshUI:function(){if(this.delegate){this.delegate.refreshUI()
}}};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.dispatcher=new a()
});
$.priorityQ.domReady.add("User Dropdown",$.priorityQ.IMPORTANT,function(){function a(){var b=this;
b.ready=false;
b.$hoverArea=$(".user-login");
b.userService=dailybeast.user.service;
b.userDispatcher=dailybeast.user.dispatcher;
if(b.$hoverArea&&b.$hoverArea.length>0){b.$dropdown=$(".user-login .dropdown-area");
b.$dropdownOptions=b.$hoverArea.find(".dropdown");
b.$action=b.$hoverArea.find(".user-login-action");
b.ready=b.$dropdown&&b.$dropdown.length>0&&b.$dropdownOptions&&b.$dropdownOptions.length>0&&b.$action&&b.$action.length>0;
if(b.ready){b._attachUIEvents();
b._handleUserStateChange();
b.userService.events.signedIn.bind(function(c){b._handleUserStateChange()
});
b.userService.events.signedOut.bind(function(c){b._handleUserStateChange()
})
}}}a.prototype={openUserDropDown:function(){var b=this;
if(b.userService.isUserSignedIn()){b.$dropdown.show();
b.dropdownHidden=false
}},closeUserDropDown:function(){var b=this;
b.$dropdown.hide();
$(".user-login .dropdown-area").hide();
b.dropdownHidden=true
},_attachUIEvents:function(){var b=this;
b._attachHoverState();
b._attachClickState();
b._attachSignoutClick()
},_attachSignoutClick:function(){var b=this;
b.$hoverArea.on("click",".user-signout",function(c){c.preventDefault();
b.closeUserDropDown();
b.userDispatcher.startSignout()
})
},_attachSigninClick:function(){var b=this;
b.$action.on("click",function(c){c.preventDefault();
b.userDispatcher.startSignin()
})
},_detachSigninClick:function(){var b=this;
b.$action.unbind("click")
},_attachHoverState:function(){var b=this;
b.$hoverArea.hover(function(){b.openUserDropDown()
},function(){b.closeUserDropDown()
})
},_attachClickState:function(){var b=this;
b.$hoverArea.on("click",function(c){if(b.dropdownHidden){b.openUserDropDown()
}else{b.closeUserDropDown()
}})
},_detachHoverState:function(){var b=this;
b.$hoverArea.unbind("mouseenter mouseleave")
},_handleUserStateChange:function(){var b=this;
if(b.userService.isUserSignedIn()){b._displayUser();
b._renderDropdown()
}else{b._displayLogin()
}},_renderDropdown:function(){var b=this;
if(b.$dropdown&&b.$dropdown.length>0){renderTemplate("user/components/pages/account/options/body",{accountLink:b.userService.config.links.user.account,accountHelpLink:b.userService.config.links.nav.help},function(c){b.$dropdown.html(c)
})
}},_displayUser:function(){var c=this;
var b=c.userService.getDisplayName();
$.log("Displaying the logged in username",b);
c._modifyActionText(b);
c._attachHoverState();
c._detachSigninClick()
},_displayLogin:function(){var b=this;
$.log("Displaying the login link");
b._modifyActionText("Sign in");
b._detachHoverState();
b._attachSigninClick()
},_modifyActionText:function(c){var b=this;
b.$hoverArea.css("left","-9999px");
b.$action.html(c);
b.$hoverArea.css("left","0px")
}};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.dropdown=new a()
});
$.priorityQ.domReady.add("User Form Validator",$.priorityQ.NORMAL,function(){function a(){var b=this;
b.validator={};
b.userService=dailybeast.user.service;
b.refreshUI();
b.userService.events.refreshUI.bind(function(c){b.refreshUI()
})
}a.discoverElement=function(c){var b=$("#"+c);
if(!(b&&b.length>0)){b=$("."+c)
}return b
};
a.prototype={refreshUI:function(){var b=this;
$("form").each(function(d,e){var c=$(e).attr("data-validators");
if(c){b.validator=JSON.parse(c);
$.log("Discovered validators",b.validator)
}});
$("[data-validator]").each(function(c,e){var d=$(e);
if(b._isActive(d)){d.change(function(f){setTimeout(function(){b._showError(d,!b._validate(d))
},250)
})
}})
},isValid:function(){var b=this;
var c=true;
$("[data-validator]").each(function(d,g){var e=$(g);
if(b._isActive(e)){var f=b._validate(e);
b._showError(e,!f);
c=(c&&f)
}});
return c
},_highlightElement:function(b){var c;
if(b){c=b.attr("data-validator-highlight")?a.discoverElement(b.attr("data-validator-highlight")):b
}return c?c:b
},_isActive:function(b){return b&&b.length>0&&(b.is(":visible")||b.attr("data-validator-when")=="always")
},_validate:function(c){var b=this;
switch(c.attr("data-validator")){case"email":var d=b._matchesAll(c.attr("value"),b.validator.emailPatterns);
return d;
case"password":var d=b._matchesAll(c.attr("value"),b.validator.passwordPatterns);
return d;
case"username":var d=b._matchesAll(c.attr("value"),b.validator.usernamePatterns);
return d;
case"accountNumber":var d=b._matchesAll(c.attr("value"),b.validator.accountNumberPatterns);
return d;
case"name":var d=b._matchesAll(c.attr("value"),b.validator.namePatterns);
return d;
case"checked":var d=b._matchesAll(c.attr("value"),["yes"]);
return d;
case"confirm":var d=b._confirmed(c);
return d
}return true
},_showError:function(b,d){var c=this._highlightElement(b);
d&&c?c.addClass("error"):c.removeClass("error");
var e=b.attr("data-validator-message");
if(e){a.discoverElement(e).each(function(f,h){var g=$(h);
d?g.addClass("critical"):g.removeClass("active").removeClass("critical")
})
}},_confirmed:function(c){var b=c.attr("data-validator-confirm");
if(b){var d=a.discoverElement(b);
return d.attr("value")==c.attr("value")
}return false
},_matchesAll:function(d,c){if(c){for(var b=0;
b<c.length;
b++){var e=new RegExp("^"+c[b]+"$");
if(!e.test(d)){return false
}}return true
}else{return false
}}};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.validator=new a()
});
$.priorityQ.domReady.add("User Page",$.priorityQ.NORMAL,function(){function a(){var b=this;
b.referrer=$.tdburl.param.referrer;
b.userService=dailybeast.user.service;
b.userDispatcher=dailybeast.user.dispatcher;
b.validator=dailybeast.user.validator;
b.refreshUI();
b.userService.events.refreshUI.bind(function(c){b.refreshUI()
})
}a.prototype={refreshUI:function(){var b=this;
var c=$(".user-page");
if(c&&c.length>0){b._defaultEmail();
b._attachToForm();
b._attachCheckboxes();
b._attachInlineFormToggle();
b._attachInlineFormCancel();
b._attachSubscribe();
b._showReferrerMessage()
}},_showReferrerMessage:function(){if(this._indexOf([this.referrer,this.userService.getLastVisited()],"/newsweek")){$(".newsweek-message").removeClass("inactive")
}if(this._indexOf([this.referrer,this.userService.getLastVisited()],"/subscribe")){$(".username-form").addClass("inactive")
}},_indexOf:function(e,d){for(var c=0,b=e.length;
c<b;
c++){if(e[c]&&e[c].indexOf(d)>=0){return true
}}return false
},_defaultEmail:function(){var b=$(".defaultEmail");
if(b.length>0&&b.val()==""&&this.userService.isUserSignedIn()&&this.userService.getEmail()){b.val(this.userService.getEmail());
b.trigger("change")
}},_attachToForm:function(){var b=this;
$("form").on("submit",function(d){var c=$(this);
if(c.attr("action").indexOf("/content/user")<0){return
}$(".general-error").removeClass("critical");
if(b.validator.isValid()&&c.data("submitting")!=true){$.log("Submitting form");
c.data("submitting",true);
$("input.submit").addClass("submitting");
b._showLoader(c);
$.ajax({type:"POST",url:c.attr("action"),data:c.serialize(),success:function(e){b._hideLoader(c);
c.data("submitting",false);
$("input.submit").removeClass("submitting");
$("section.user-page").fadeOut(250,function(g){var f=$(e);
$("section.user-page").replaceWith(f.find("section.user-page"));
b.userService.events.refreshUI.trigger();
$(e).filter("script").each(function(){if($(this).hasClass("ajax-runnable")){$("section.user-page").append(this)
}})
})
},error:function(e){b._hideLoader(c);
c.data("submitting",false);
$("input.submit").removeClass("submitting");
$(".general-error").addClass("critical")
}})
}d.preventDefault()
})
},_showLoader:function(c){var d=c.find(".submit-loader");
if(d.length>0){var b=d.data("loader");
if(!b){var e=Math.floor(Math.random()*100000000);
d.attr("id","submit-loader"+e);
b=new CanvasLoader("submit-loader"+e,{id:"userpage-loader"+e});
b.setColor("#e81e1e");
b.setDiameter(16);
b.setDensity(59);
b.setRange(0.6);
b.setSpeed(4);
b.setFPS(30);
d.data("loader",b)
}b.show()
}},_hideLoader:function(c){var e=c.find(".submit-loader");
if(e){var d=$(e);
var b=d.data("loader");
if(b){b.hide()
}}},_attachCheckboxes:function(){$("a.checkbox").each(function(c,e){var d=$(e);
var g=$(d.find("input[type=hidden]"));
var b=$(d.find(".checked"));
if(g&&g.length>0&&b&&b.length>0){var f=function(h){var j=g.val();
if(h){j=(j=="no"?"yes":"no")
}g.val(j);
b.html(j=="no"?"":"X");
if(h){g.trigger("change")
}};
d.on("click",function(h){h.preventDefault();
f(true)
});
f(false)
}})
},_attachInlineFormToggle:function(){$(".inline-form-trigger").on("click",function(d){d.preventDefault();
var c=$(this).attr("open-target");
var b=$("#"+c);
if((b).is(":visible")){b.hide()
}else{$(".inline-form").hide();
b.show()
}})
},_attachInlineFormCancel:function(){$(".inline-cancel").on("click",function(b){$(this).closest(".inline-form").hide();
b.preventDefault()
})
},_attachSubscribe:function(){var b=this;
$(".startPaymentJourney").on("click",function(f){$.log("Click on start payment");
f.preventDefault();
var c=$(this);
c.addClass("selected");
var d=c.attr("href");
b.userDispatcher.startPaymentJourney(d)
})
}};
new a()
});
$.priorityQ.domReady.add("User Wait",$.priorityQ.NORMAL,function(){function a(){var b=this;
b.timeout=30000;
b.userService=dailybeast.user.service;
b.userDispatcher=dailybeast.user.dispatcher;
b.refreshUI();
b.userService.events.refreshUI.bind(function(c){b.refreshUI()
})
}a.prototype={refreshUI:function(){var b=this;
$(".user-wait").each(function(c,d){b._attachToElement($(d))
})
},_showLoader:function(c){if(c.length>0){var b=c.data("loader");
if(!b){var d=Math.floor(Math.random()*100000000);
c.attr("id","submit-loader"+d);
b=new CanvasLoader("submit-loader"+d,{id:"userpage-loader"+d});
b.setColor("#e81e1e");
b.setDiameter(16);
b.setDensity(59);
b.setRange(0.6);
b.setSpeed(4);
b.setFPS(30);
c.data("loader",b)
}b.show()
}},_hideLoader:function(c){if(c.length>0){var b=c.data("loader");
if(b){b.hide()
}}},_attachToElement:function(c){var b=this;
var d=0;
b._showLoader(c);
var e=setTimeout(function(){$.log("Firing timout:",b.timeout);
b._hideLoader(c);
$(".user-wait-next").removeClass("inactive")
},b.timeout)
},};
window.dailybeast.user=window.dailybeast.user||{};
window.dailybeast.user.wait=new a()
});
(function(){dust.register("user/components/pages/account/add-username/success/body",c);
function c(e,d){return e.write('<section class="user-page ').reference(d.get("pageName"),d,"h").write('"><script class="ajax-runnable">').exists(d.get("referrer"),d,{"else":b,block:a},null).write('<\/script><header class="header grid_12 clearfix"><hgroup><div><h1 class="title">Registering Nickname</h1><div class="user-wait"></div></div><hr></hgroup></header><div class="body"><a href="#" class="inactive continue user-wait-next"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></section>')
}function b(e,d){return e.write('$.priorityQ.domReady.add("Updating user info...", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.afterSignin();});')
}function a(e,d){return e.write('$.priorityQ.domReady.add("Continuing", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.navigate("').reference(d.get("referrer"),d,"h").write('");});')
}return c
})();
(function(){dust.register("user/components/pages/find-account/link-account/success/body",b);
function b(d,c){return d.write('<section class="user-page"><script class="ajax-runnable">$.priorityQ.domReady.add("Continuing", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.afterSignup();});<\/script><header class="header grid_12 clearfix"><h1 class="title">Sign Up Complete</h1><hr></header><div class="body"><p class="info">Thanks for registering. ').exists(c.get("email"),c,{block:a},null).write('</p><a href="#" class="continue"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></section>')
}function a(d,c){return d.write("We&apos;ve sent an e-mail to ").reference(c.get("email"),c,"h").write(" for your records.")
}return b
})();
(function(){dust.register("user/components/pages/account/form/sign-up-button",b);
function b(d,c){return d.write('    <div class="form-submit"><input type="submit" value="Sign Up" class="submit" /><span class="message ').section(c.getPath(false,["error","general"]),c,{block:a},null).write(' general-error">Something went wrong trying to create your account.  Please try again in a little bit and hopefully we can create your account this time.</span><div class="submit-loader"></div></div>')
}function a(d,c){return d.write("critical")
}return b
})();
(function(){dust.register("user/components/pages/reset-password/success/body",b);
function b(d,c){return d.write('<section class="user-page"><header class="header grid_12 clearfix"><h1 class="title">Check your email</h1><hr></header><div class="body">').exists(c.get("email"),c,{block:a},null).write('<p class="info">Please check your email for a message from Newsweek/The Daily Beast with the subject line "Newsweek/Daily Beast Password Reset".</p><p class="info">If you don&apos;t receive it, please check your spam folder, or <a href="').reference(c.getPath(false,["links","nav","contactUs"]),c,"h").write('">contact customer service</a> for support.</p></div></section>')
}function a(d,c){return d.write('<p class="info">We&apos;ve sent an email to ').reference(c.get("email"),c,"h").write(" with your new password.</p>")
}return b
})();
(function(){dust.register("user/components/pages/account/form/password",e);
function e(g,f){return g.write('    <div class="form-group clearfix"><div class="form-text"><span class="message ').section(f.getPath(false,["error","password","invalid"]),f,{block:d},null).write(' password-invalid">Password must be at least 8 characters, no spaces</span><div><input class="').section(f.getPath(false,["error","password","invalid"]),f,{block:c},null).write('" type="password" name="password"id="passwordInput" placeholder="').reference(f.get("placeholder"),f,"h").write('" autocomplete="off" value="').reference(f.get("password"),f,"h").write('"data-validator="password" data-validator-message="password-invalid" /></div></div></div><div class="form-group clearfix"><div class="form-text"><div><span class="message ').section(f.getPath(false,["error","password","confirm"]),f,{block:b},null).write(' password-confirm">Please make sure your passwords match</span><input class="').section(f.getPath(false,["error","password","confirm"]),f,{block:a},null).write('" type="password" name="passwordConfirm"id="passwordConfirmInput" placeholder="Re-enter Your ').reference(f.get("placeholder"),f,"h").write('" autocomplete="off" value="').reference(f.get("passwordConfirm"),f,"h").write('"data-validator="confirm" data-validator-message="password-confirm" data-validator-confirm="passwordInput"   /></div></div></div>')
}function d(g,f){return g.write("critical")
}function c(g,f){return g.write("error")
}function b(g,f){return g.write("active")
}function a(g,f){return g.write("error")
}return e
})();
(function(){dust.register("user/components/pages/account/options/body",a);
function a(c,b){return c.write('<ul id="user-options"><li><a href="').reference(b.get("accountLink"),b,"h").write('" class="user-account">My Account</a></li><li><a href="').reference(b.get("accountHelpLink"),b,"h").write('" class="user-help">Help</a></li><li><a class="user-signout">Sign Out</a></li></ul>')
}return a
})();
(function(){dust.register("user/components/pages/account/form/save-cancel-button",a);
function a(c,b){return c.write('        <div class="form-group clearfix"><div class="form-submit"><input type="submit" value="Save" class="submit" /><a href="').reference(b.getPath(false,["links","user","resume"]),b,"h").write('" class="cancel"><input type="button" value="Cancel" class="submit" /></a><div class="submit-loader"></div></div></div>')
}return a
})();
(function(){dust.register("user/components/pages/account/form/username",d);
function d(f,e){return f.write('    <div class="form-group clearfix username-form"><div class="form-text"><div><span class="message ').section(e.getPath(false,["error","username","exists"]),e,{block:c},null).write('">Nickname already taken. Try again</span><span class="message ').section(e.getPath(false,["error","username","invalid"]),e,{block:b},null).write(' username-invalid">Please enter a nickname longer than 3 characters, containing only letters, numbers, underscores, or dashes</span><input class="').section(e.getPath(false,["error","username"]),e,{block:a},null).write('" type="text" name="username"id="usernameInput" placeholder="Nickname" value="').reference(e.get("username"),e,"h").write('"data-validator="username" data-validator-message="username-invalid" /></div></div></div>')
}function c(f,e){return f.write("critical")
}function b(f,e){return f.write("critical")
}function a(f,e){return f.write("error")
}return d
})();
(function(){dust.register("user/components/pages/find-account/success/body",b);
function b(d,c){return d.write('<section class="user-page ').reference(c.get("pageName"),c,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Check your email</h1><hr></header><div class="body"><p>Your subscription has been located.  A new password for your login was sent to the email address on file').exists(c.get("email"),c,{block:a},null).write(" ").reference(c.get("email"),c,"h").write('.  Check your email to get access to your account.  If this is not your email, please <a href="').reference(c.get("signupLink"),c,"h").write('">register a new one now</a>.</p><a href="#" class="continue"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></section>')
}function a(d,c){return d.write(",")
}return b
})();
(function(){dust.register("user/components/pages/signin/success/body",c);
function c(e,d){return e.write('<section class="user-page ').reference(d.get("pageName"),d,"h").write('"><script class="ajax-runnable">').exists(d.get("referrer"),d,{"else":b,block:a},null).write('<\/script><header class="header grid_12 clearfix"><hgroup><div><h1 class="title">Signing you in</h1><div class="user-wait"></div></div><hr></hgroup></header><div class="body"><a href="#" class="inactive continue user-wait-next"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></section>')
}function b(e,d){return e.write('$.priorityQ.domReady.add("Signing in...", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.afterSignin();});')
}function a(e,d){return e.write('$.priorityQ.domReady.add("Continuing", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.navigate("').reference(d.get("referrer"),d,"h").write('");});')
}return c
})();
(function(){dust.register("user/components/pages/account/subscribe/body",e);
function e(g,f){return g.write('<section class="user-page">').notexists(f.get("error"),f,{"else":d,block:a},null).write("</section>")
}function d(g,f){return g.write('<div class="body"><div class="sub-form user-form"><div class="form-group clearfix"><span class="message ').section(f.getPath(false,["error","subscription","exists"]),f,{block:c},null).write('">You already have a subscription.  Thanks for trying to buy more!</span><span class="message ').section(f.getPath(false,["error","general"]),f,{block:b},null).write('">Something happened and we could not process your subscription request.Please <a href="/content/dailybeast/company/contact-us.html" >contact us</a> if the problem persists!</span><a href="#" class="continue"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></div></div>')
}function c(g,f){return g.write("active")
}function b(g,f){return g.write("critical")
}function a(g,f){return g.write('<script class="ajax-runnable">$.priorityQ.domReady.add("Payment navigate", $.priorityQ.IMPORTANT, function() {dailybeast.user.dispatcher.navigate("').reference(f.get("paymentUrl"),f,"h").write('");});<\/script><header class="header grid_12 clearfix"><h1 class="title">Starting your order</h1><div class="user-wait"></div><hr></header><div class="body"><div class="sub-form user-form"><div class="form-group clearfix"><a href="').reference(f.get("paymentUrl"),f,"h").write('" class="inactive user-wait-next"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></div></div>')
}return e
})();
(function(){dust.register("user/components/pages/change-password/success/body",a);
function a(c,b){return c.write('<section class="user-page ').reference(b.get("pageName"),b,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Your password has been changed</h1><hr></header><div class="body"><p class="info">Your password has been changed and you are logged in. To update your password again or to manage your account, you can visit&nbsp;<a href="').reference(b.getPath(false,["links","user","account"]),b,"h").write('">your account</a> page.</p><a href="#" class="continue"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></section>')
}return a
})();
(function(){dust.register("user/components/pages/signup/success/body",d);
function d(f,e){return f.write('<section class="user-page">').exists(e.get("referrer"),e,{"else":c,block:a},null).write("</section>")
}function c(f,e){return f.write('<script class="ajax-runnable">$.priorityQ.domReady.add("Continuing", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.afterSignup();});<\/script><header class="header grid_12 clearfix"><h1 class="title">Sign Up Complete</h1><hr></header><div class="body"><p>Thanks for registering. ').exists(e.get("email"),e,{block:b},null).write('</p><a href="#" class="continue"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div>')
}function b(f,e){return f.write("We&apos;ve sent an e-mail to ").reference(e.get("email"),e,"h").write(" for your records.")
}function a(f,e){return f.write('<script class="ajax-runnable">$.priorityQ.domReady.add("Continuing", $.priorityQ.NORMAL, function() {dailybeast.user.dispatcher.navigate("').reference(e.get("referrer"),e,"h").write('")});<\/script><header class="header grid_12 clearfix"><h1 class="title">Signing you up</h1><div class="user-wait"></div><hr></header><div class="body"><a href="#" class="inactive continue user-wait-next"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div>')
}return d
})();
(function(){dust.register("user/components/pages/find-account/link-account/body",a);
function a(c,b){return c.write('<section class="user-page ').reference(b.get("pageName"),b,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Create you account</h1><p>Subscription Found! Set up an online account:</p><hr></header><form class="sub-form user-form" action="').reference(b.getPath(false,["links","user","linkAccount"]),b,"h").write('" method="POST" data-validators="').reference(b.get("validator"),b,"h").write('">').partial("user/components/pages/account/form/email",b,null).partial("user/components/pages/account/form/password",b,{placeholder:"Password"}).partial("user/components/pages/account/form/username",b,null).partial("user/components/pages/account/form/age-confirm",b,null).partial("user/components/pages/account/form/sign-up-button",b,null).partial("user/components/pages/account/form/agreement",b,null).write('<input type="hidden" name="accountNumber" value="').reference(b.get("accountNumber"),b,"h").write('" /><input type="hidden" name="lastName" value="').reference(b.get("lastName"),b,"h").write('" /></form></section>')
}return a
})();
(function(){dust.register("user/components/pages/account/form/save-cancel-inline-button",a);
function a(c,b){return c.write('        <div class="form-group clearfix"><div class="form-submit"><input type="submit" value="Save" class="submit" /><a href="#" class="inline-cancel"><input type="button" value="Cancel" class="submit" /></a><div class="submit-loader"></div></div></div>')
}return a
})();
(function(){dust.register("user/components/pages/password-expired/success/body",b);
function b(d,c){return d.write('<section class="user-page ').reference(c.get("pageName"),c,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Check your email</h1><hr></header><div class="body"><p>').exists(c.get("email"),c,{block:a},null).write(' &nbsp;Please check your e-mail for a message with the subject line "Your Password Has Been Reset". &nbsp;When you get it, come back and sign in. &nbsp;</p><a href="').reference(c.getPath(false,["links","user","changePassword"]),c,"h").write('"><div class="form-submit"><input type="submit" value="Sign In" class="submit"></div></a></div></section>')
}function a(d,c){return d.write("Your password expired and has been automatically reset. We&apos;ve sent an e-mail to ").reference(c.get("email"),c,"h").write(".")
}return b
})();
(function(){dust.register("user/components/pages/account/form/agreement",a);
function a(c,b){return c.write('    <div class="form-group clearfix"><span class="message active">By clicking SIGN UP, you confirm that you accept our <a href="').reference(b.getPath(false,["links","nav","termsOfService"]),b,"h").write('">Terms of Use</a>\nand have read and understood our <a href="').reference(b.getPath(false,["links","nav","privacyPolicy"]),b,"h").write('">Privacy Policy.</a></span></div>')
}return a
})();
(function(){dust.register("user/components/pages/account/form/age-confirm",c);
function c(e,d){return e.write('    <div class="form-group clearfix"><span class="message ').section(d.getPath(false,["error","ageConfirm"]),d,{block:b},null).write(' ageConfirm">Please check the box</span><a href="javascript:void(0);" class="checkbox"><div class="form-checkbox ').section(d.getPath(false,["error","ageConfirm"]),d,{block:a},null).write(' age-confirm-checkbox"><span class="checked"></span><input type="hidden" name="ageConfirm" id="ageConfirmInput" value="no"data-validator="checked" data-validator-message="ageConfirm" data-validator-highlight="age-confirm-checkbox" data-validator-when="always"  /></div><label for="ageConfirmInput">I affirm that I am 13 years of age or older, or have parent/guardian permission.</label></a></div>')
}function b(e,d){return e.write("critical")
}function a(e,d){return e.write("error")
}return c
})();
(function(){dust.register("user/components/services/livefyre/get-user/get-user",a);
function a(c,b){return c.reference(b.get("user"),b,"h",["js"])
}return a
})();
(function(){dust.register("user/components/pages/account/resume/page",a);
function a(c,b){return c.write('<html lang="en" style="background:').reference(b.get("siteBackground"),b,"h").write(';"><meta http-equiv="refresh" content="0;URL=\'http://www.thedailybeast.com\'"></html>')
}return a
})();
(function(){dust.register("user/components/pages/account/add-username/body",a);
function a(c,b){return c.write('<section class="user-page ').reference(b.get("pageName"),b,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">ADD NICKNAME</h1><p>You\'ve signed in as ').reference(b.get("email"),b,"h").write('.</p><br/><p>In order to post comments, you need to add a nickname to your profile. Please enter one now:</p><hr></header><div class="body"><form class="sub-form user-form" action="').reference(b.getPath(false,["links","user","addUsername"]),b,"h").write('" method="POST" data-validators="').reference(b.get("validator"),b,"h").write('">').partial("user/components/pages/account/form/username",b,null).partial("user/components/pages/account/form/save-button",b,null).write("</form></div></section>")
}return a
})();
(function(){dust.register("user/components/pages/account/form/email",e);
function e(j,h){return j.write('    <div class="form-group clearfix"><div class="form-text"><span class="message ').section(h.getPath(false,["error","email","exists"]),h,{block:d},null).write('">The email address you entered is already in use. ').notexists(h.get("user"),h,{block:c},null).write('</span><span class="message ').section(h.getPath(false,["error","email","invalid"]),h,{block:b},null).write(' email-invalid">Email entered is not a valid email address</span><div><input class="').section(h.getPath(false,["error","email"]),h,{block:a},null).write('" type="text" name="email" id="emailInput"placeholder="Email Address" value="').reference(h.get("email"),h,"h").write('"data-validator="email" data-validator-message="email-invalid"></input></div></div></div><div class="form-group clearfix"><div class="form-text"><span class="message ').section(h.getPath(false,["error","email","confirm"]),h,{block:g},null).write(' email-confirm">Email verification doesn&apos;t match</span><div><input class="').section(h.getPath(false,["error","email","confirm"]),h,{block:f},null).write('" type="text" name="emailConfirm"id="emailConfirmInput" placeholder="Re-enter Your Email Address" value="').reference(h.get("emailConfirm"),h,"h").write('"data-validator="confirm" data-validator-message="email-confirm" data-validator-confirm="emailInput" /></div></div></div>')
}function d(j,h){return j.write("critical")
}function c(j,h){return j.write('If it is yours, please <a href="').reference(h.getPath(false,["links","user","signin"]),h,"h").write('">sign in</a>.')
}function b(j,h){return j.write("critical")
}function a(j,h){return j.write("error")
}function g(j,h){return j.write("critical")
}function f(j,h){return j.write("error")
}return e
})();
(function(){dust.register("user/components/pages/account/billing-info/body",a);
function a(c,b){return c.write('<section class="user-page"><script class="ajax-runnable">$.priorityQ.domReady.add("Billing navigate", $.priorityQ.IMPORTANT, function() {dailybeast.user.dispatcher.navigate("').reference(b.get("billingLink"),b,"h").write('");});<\/script><header class="header grid_12 clearfix"><h1 class="title">Opening billing information</h1><div class="user-wait"></div><hr></header><div class="body"><div class="sub-form user-form"><div class="form-group clearfix"><a href="').reference(b.get("billingLink"),b,"h").write('" class="inactive user-wait-next"><div class="form-submit"><input type="submit" value="Ok" class="submit"></div></a></div></div></div></section>')
}return a
})();
(function(){dust.register("user/components/pages/account/form/save-button",a);
function a(c,b){return c.write('        <div class="form-group clearfix"><div class="form-submit"><input type="submit" value="Save" class="submit" /><div class="submit-loader"></div></div></div>')
}return a
})();
(function(){dust.register("user/components/pages/account/billing",a);
function a(c,b){return c.write('<div class="billing"><p><strong><a href="').reference(b.getPath(false,["links","user","billing"]),b,"h").write('" class="dispatcher-ignore" target="_blank">Billing Information</a></strong></p></div>')
}return a
})();
(function(){dust.register("user/components/pages/password-expired/body",d);
function d(f,e){return f.write('<section class="user-page ').reference(e.get("pageName"),e,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Password Expired</h1><p>We\'re sorry, your password expired. To reset it, please enter your email address below and click Submit.</p><hr></header><div class="body"><form class="sub-form user-form" action="').reference(e.getPath(false,["links","user","passwordExpired"]),e,"h").write('" method="POST"><div class="form-group clearfix"><div class="form-text"><span class="message ').section(e.getPath(false,["error","email","invalid"]),e,{block:c},null).write('">Please enter a valid email address.</span><div><input class="').section(e.getPath(false,["error","email","invalid"]),e,{block:b},null).write('" type="text" name="email" id="emailInput" placeholder="Email Address" value="').reference(e.get("email"),e,"h").write('" ></input></div></div></div><div class="form-submit"><input type="submit" value="Submit" class="submit"><div class="submit-loader"></div></div></form><div class="form-group clearfix"><span class="message ').section(e.getPath(false,["error","general"]),e,{block:a},null).write(' general-error">There was a problem resetting your password.  Please try again later.</span></div></div></section>')
}function c(f,e){return f.write("active")
}function b(f,e){return f.write("error")
}function a(f,e){return f.write("critical")
}return d
})();
(function(){dust.register("user/components/pages/find-account/body",e);
function e(h,g){return h.write('<section class="user-page ').reference(g.get("pageName"),g,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Find Your Account</h1><p>If you had a print subscription and can&apos;t login, try looking up your subscription using the account number printed on your label.</p><hr></header><div class="body"><form class="sub-form user-form" action="').reference(g.getPath(false,["links","user","findAccount"]),g,"h").write('" method="POST" data-validators="').reference(g.get("validator"),g,"h").write('"><div class="form-group clearfix"><img width="350px" src="').helper("versionable",g,{},{url:"/etc/clientlibs/user/img/find-account-label.gif"}).write('" /></div><div class="form-group clearfix"><div class="form-text"><span class="message ').section(g.getPath(false,["error","accountNumber","invalid"]),g,{block:d},null).write(' accountNumber-invalid">Enter a valid 9-digit account number</span><div><input class="').section(g.getPath(false,["error","accountNumber","invalid"]),g,{block:c},null).write('" type="text" name="accountNumber"id="accountNumberInput" placeholder="Account Number from Label" value="').reference(g.get("accountNumber"),g,"h").write('"data-validator="accountNumber" data-validator-message="accountNumber-invalid"></input></div></div></div><div class="form-group clearfix"><div class="form-text"><span class="message ').section(g.getPath(false,["error","lastName","invalid"]),g,{block:b},null).write(' lastName-invalid">Please enter the last name from the label</span><div><input class="').section(g.getPath(false,["error","lastName","invalid"]),g,{block:a},null).write('" type="text" name="lastName"id="lastNameInput" placeholder="Last Name on Label" value="').reference(g.get("lastName"),g,"h").write('"data-validator="name" data-validator-message="lastName-invalid"></input></div></div></div><div class="form-submit"><input type="submit" value="Submit" class="submit"><span class="message ').section(g.getPath(false,["error","general"]),g,{block:f},null).write(' general-error">That account was not in our records.</span><div class="submit-loader"></div></div></form></div></section>')
}function d(h,g){return h.write("critical")
}function c(h,g){return h.write("error")
}function b(h,g){return h.write("critical")
}function a(h,g){return h.write("error")
}function f(h,g){return h.write("critical")
}return e
})();
(function(){dust.register("user/components/pages/signup/body",a);
function a(c,b){return c.write('<section class="user-page"><header class="header grid_12 clearfix"><h1 class="title">Sign Up</h1><p>Already registered? <a href="').reference(b.getPath(false,["links","user","signin"]),b,"h").write('">Sign in &gt;</a></p><hr></header><div class="body"><form class="sub-form user-form" action="').reference(b.getPath(false,["links","user","signup"]),b,"h").write('" method="POST" data-validators="').reference(b.get("validator"),b,"h").write('">').partial("user/components/pages/account/form/email",b,null).partial("user/components/pages/account/form/password",b,{placeholder:"Password"}).partial("user/components/pages/account/form/username",b,null).partial("user/components/pages/account/form/age-confirm",b,null).partial("user/components/pages/account/form/sign-up-button",b,null).partial("user/components/pages/account/form/agreement",b,null).write("</form></div></section>")
}return a
})();
(function(){dust.register("user/components/pages/account/message",d);
function d(f,e){return f.write('<span class="message success ').exists(e.get("submitted"),e,{block:c},null).write('">Account information saved.</span><span class="message ').section(e.getPath(false,["error","general"]),e,{block:a},null).write('">Something went wrong trying to update your account.  Please try again in a little bit and hopefully we can update your account this time.</span>')
}function c(f,e){return f.notexists(e.get("errors"),e,{block:b},null)
}function b(f,e){return f.write("active")
}function a(f,e){return f.write("critical")
}return d
})();
(function(){dust.register("user/components/pages/account/body",b);
function b(d,c){return d.write('<section class="user-page account clearfix"><header class="header grid_12 clearfix"><h1>My Account</h1><hr></header><div class="body"><div class="left-col">').helper("include",c,{},{path:"message"}).helper("include",c,{},{path:"profile"}).write("</div>").notexists(c.get("feature-nwg-soft-launch"),c,{block:a},null).write("</div></section>")
}function a(d,c){return d.write('<div class="right-col">').helper("include",c,{},{path:"subscription"}).helper("include",c,{},{path:"billing"}).write("</div>")
}return b
})();
(function(){dust.register("user/components/pages/change-password/body",d);
function d(f,e){return f.write('<section class="user-page ').reference(e.get("pageName"),e,"h").write('"><header class="header grid_12 clearfix"><h1 class="title">Change Password</h1><p>Enter the temporary password received in the "Reset Password" email, followed by a new password.</p><hr></header><div class="body"><form class="sub-form user-form" action="').reference(e.getPath(false,["links","user","changePassword"]),e,"h").write('" method="POST" data-validators="').reference(e.get("validator"),e,"h").write('"><div class="form-group clearfix"><div class="form-text"><div><input type="text" name="email" id="emailInput" placeholder="Email Address" value="').reference(e.get("email"),e,"h").write('" ></input></div></div></div><div class="form-group clearfix"><div class="form-text"><div><input class="').section(e.getPath(false,["error","login","error"]),e,{block:c},null).write('" type="password" name="tempPassword" id="tempPasswordInput" placeholder="Temporary Password" autocomplete="off" ></input></div></div></div>').partial("user/components/pages/account/form/password",e,{placeholder:"New Password"}).write('<div class="form-submit"><input type="submit" value="Save" class="submit"><span class="message ').section(e.getPath(false,["error","general"]),e,{block:b},null).write(' general-error">We&apos;re sorry, the system has encountered a problem. Please check your internet connection or try again later.</span><span class="message ').section(e.getPath(false,["error","login","error"]),e,{block:a},null).write('">The username or password was not found. Please try again.</span><div class="submit-loader"></div></div></form></div></section>')
}function c(f,e){return f.write("error")
}function b(f,e){return f.write("critical")
}function a(f,e){return f.write("critical")
}return d
})();
(function(){dust.register("user/components/pages/signin/body",c);
function c(e,d){return e.write('<section class="user-page"><header class="header grid_12 clearfix"><h1 class="title">Sign In</h1><p>Need an account? <a href="').reference(d.getPath(false,["links","user","signup"]),d,"h").write('">Sign up &gt;</a></p><hr /></header><div class="body"><form class="sub-form user-form" method="POST" action="').reference(d.getPath(false,["links","user","signin"]),d,"h").write('"><div class="form-group clearfix"><div class="form-text"><div><input type="text" name="email" id="emailInput" class="defaultEmail" placeholder="Email Address" value="').reference(d.get("email"),d,"h").write('" /></div></div></div><div class="form-group clearfix"><div class="form-text"><div><input type="password" name="password" id="passwordInput" placeholder="Password" autocomplete="off" /><p class="right"><a href="').reference(d.getPath(false,["links","user","resetPassword"]),d,"h").write('" >Forgot Password?</a></p></div></div></div><div class="form-group clearfix"><div class="form-text"></div><a href="javascript:void(0);" class="checkbox"><div class="form-checkbox"><span class="checked"></span><input type="hidden" name="rememberme" id="remembermeInput" value="no" /></div><label for="remembermeInput">Remember me</label></a></div><div class="form-submit"><input type="submit" value="Sign In" class="submit" /><span class="message ').section(d.getPath(false,["error","general"]),d,{block:b},null).write(' general-error">The login information you entered does not match an account in our records. Please try again or&nbsp;<a href="').reference(d.getPath(false,["links","user","resetPassword"]),d,"h").write('">reset your password.</a></span><div class="submit-loader"></div></div>').notexists(d.get("feature-nwg-soft-launch"),d,{block:a},null).write("</form></div></section>")
}function b(e,d){return e.write("critical")
}function a(e,d){return e.write('<div class="form-group clearfix"></div><div class="form-group clearfix newsweek-message inactive"><p class="info">Print Subscriber? <br/><a href="').reference(d.getPath(false,["links","user","findAccount"]),d,"h").write('" class="critical">Locate Your Subscription Via Account Number &gt;</a></p></div>')
}return c
})();
(function(){dust.register("user/components/pages/account/subscription",e);
function e(h,g){return h.write('<div class="subscriptions"><h2>Subscription Status</h2>').exists(g.get("subscriptions"),g,{block:d},null).section(g.get("subscriptions"),g,{"else":c,block:b},null).write("</div>")
}function d(h,g){return h.write("You are subscribed to:")
}function c(h,g){return h.write("<div>You have no active subscriptions</div>")
}function b(h,g){return h.write("<p><strong>").reference(g.get("description"),g,"h").write("</strong></p>").exists(g.get("autoRenew"),g,{"else":a,block:f},null)
}function a(h,g){return h.write("<p>Your subscription will expire on ").helper("formatDate",g,{},{date:g.get("expires"),format:"MM/DD/YYYY"}).write('. \nTo avoid interruption of service, click "turn on" below.</p><hr/><div class="form-section last"><div class="header clearfix"><label>Auto-renewal:</label> Off<a class="inline-form-trigger right" open-target="modifyAutoRenewalForm" href="#">turn on</a></div><div class="form-group clearfix inline-form" id="modifyAutoRenewalForm"><form class="sub-form user-form" action="').reference(g.getPath(false,["links","user","account"]),g,"h").write('" method="POST"><div class="form-group clearfix"><p>Please confirm that you wish to turn your subscription back on:</p><div class="form-submit"><input type="submit" value="Confirm" class="submit"><input type="button" value="Cancel" class="submit cancel"></div><p>By clicking confirm you agree to be charged $').reference(g.get("amount"),g,"h").write(" when your new \nsubscription term begins on ").helper("formatDate",g,{},{date:g.get("expires"),format:"MM/DD/YYYY"}).write('.</p></div><input type="hidden" name="command" value="updateAutoRenew" /><input type="hidden" name="autoRenew" value="true" /><input type="hidden" name="subscriptionId" value="').reference(g.get("serviceId"),g,"h").write('" /></form><hr/></div></div>')
}function f(h,g){return h.write("<p>You will be billed $").reference(g.get("amount"),g,"h").write(" on ").helper("formatDate",g,{},{date:g.get("expires"),format:"MM/DD/YYYY"}).write(', \nat the end of the current billing cycle</p><hr/><div class="form-section"><div class="header clearfix"><label>Auto-renewal:</label> On<a class="inline-form-trigger right" open-target="modifyAutoRenewalForm" href="#">turn off</a></div><div class="form-group clearfix inline-form" id="modifyAutoRenewalForm"><form class="sub-form user-form" action="').reference(g.getPath(false,["links","user","account"]),g,"h").write('" method="POST"><div class="form-group clearfix"><p>Please confirm that you wish to turn off your subscription:</p><div class="form-submit"><input type="submit" value="Turn Off" class="submit"><input type="button" value="Cancel" class="submit cancel"></div><p>Turning off auto-renewal will disable your access at the end of your term.\nTo cancel an annual subscription for a refund, contact customer service at \n1-800-631-1040. Monthly subscriptions are not eligible for refunds.</p></div><input type="hidden" name="command" value="updateAutoRenew" /><input type="hidden" name="autoRenew" value="false" /><input type="hidden" name="subscriptionId" value="').reference(g.get("serviceId"),g,"h").write('" /></form><hr/></div></div>')
}return e
})();
(function(){dust.register("user/components/pages/account/emailpreferences",a);
function a(c,b){return c.write("<div><h3>Email Preferences</h3></div>")
}return a
})();
(function(){dust.register("user/components/pages/account/profile",e);
function e(h,g){return h.write('<div class="profile"><h2>Profile</h2><div class="form-section"><div class="form-group clearfix"><div><label>Email:</label> ').reference(g.getPath(false,["user","email"]),g,"h").write('<a class="inline-form-trigger right" open-target="modifyEmailForm" href="#">edit</a></div></div><div class="form-group clearfix inline-form ').section(g.getPath(false,["error","email"]),g,{block:d},null).write('" id="modifyEmailForm"><form class="sub-form user-form" action="').reference(g.getPath(false,["links","user","account"]),g,"h").write('" method="POST" data-validators="').reference(g.get("validator"),g,"h").write('">').partial("user/components/pages/account/form/email",g,null).partial("user/components/pages/account/form/save-cancel-inline-button",g,null).write('</form></div></div><div class="form-section"><div class="form-group clearfix"><div><label>Password:</label> ********<a class="inline-form-trigger right" open-target="modifyPasswordForm" href="#">edit</a></div></div><div class="form-group clearfix inline-form ').section(g.getPath(false,["error","password"]),g,{block:c},null).write('" id="modifyPasswordForm"><form class="sub-form user-form" action="').reference(g.getPath(false,["links","user","account"]),g,"h").write('" method="POST" data-validators="').reference(g.get("validator"),g,"h").write('">').partial("user/components/pages/account/form/password",g,{placeholder:"New Password"}).partial("user/components/pages/account/form/save-cancel-inline-button",g,null).write('</form></div></div><div class="form-section"><div class="form-group clearfix"><div><label>Nickname:</label> ').reference(g.getPath(false,["user","username"]),g,"h").exists(g.getPath(false,["user","username"]),g,{"else":b,block:a},null).write('</div></div><div class="form-group clearfix inline-form ').section(g.getPath(false,["error","username"]),g,{block:f},null).write('" id="modifyUsernameForm"><form class="sub-form user-form" action="').reference(g.getPath(false,["links","user","account"]),g,"h").write('" method="POST" data-validators="').reference(g.get("validator"),g,"h").write('">').partial("user/components/pages/account/form/username",g,null).partial("user/components/pages/account/form/save-cancel-inline-button",g,null).write("</form></div></div></div>")
}function d(h,g){return h.write("active")
}function c(h,g){return h.write("active")
}function b(h,g){return h.write('<a class="inline-form-trigger right" open-target="modifyUsernameForm" href="#">add</a>')
}function a(h,g){return h.write('<a class="inline-form-trigger right" open-target="modifyUsernameForm" href="#">edit</a>')
}function f(h,g){return h.write("active")
}return e
})();
(function(){dust.register("user/components/pages/reset-password/body",d);
function d(f,e){return f.write('<section class="user-page"><header class="header grid_12 clearfix"><h1 class="title">Reset Password</h1><p>If you forgot your password, enter your registered email address and click submit to reset your password.</p><hr></header><div class="body"><form class="sub-form user-form" action="').reference(e.getPath(false,["links","user","resetPassword"]),e,"h").write('" method="POST" data-validators="').reference(e.get("validator"),e,"h").write('"><div class="form-group clearfix"><div class="form-text"><span class="message ').section(e.getPath(false,["error","email","invalid"]),e,{block:c},null).write(' email-invalid">Please enter a valid email address</span><div><input class="').section(e.getPath(false,["error","email","invalid"]),e,{block:b},null).write('" type="text"name="email" id="emailInput" placeholder="Email Address" value="').reference(e.get("email"),e,"h").write('"data-validator="email" data-validator-message="email-invalid"></input></div></div></div><div class="form-submit"><input type="submit" value="Submit" class="submit"><span class="message ').section(e.getPath(false,["error","general"]),e,{block:a},null).write(' general-error">Password could not be reset.  Make sure you enter a registered email address.</span><div class="submit-loader"></div></div></form></div></section>')
}function c(f,e){return f.write("critical")
}function b(f,e){return f.write("error")
}function a(f,e){return f.write("critical")
}return d
})();
(function(){dust.register("user/components/page/page",b);
function b(d,c){return d.write("<!DOCTYPE HTML><html>").helper("include",c,{},{path:"head"}).write('<body class="user-page-full ').reference(c.get("pageName"),c,"h").write(' not-returnable user-intercept">').helper("include",c,{},{path:"header"}).write('<div class="container_12 page">').helper("include",c,{},{path:"body"}).write("</div>").helper("include",c,{},{path:"footer"}).section(c.getPath(true,["links"]),c,{block:a},null).write("</body></html>")
}function a(d,c){return d.helper("include",c,{},{resourceType:"user/components/links"})
}return b
})();
(function(){dust.register("user/components/page/head",a);
function a(c,b){return c.write('<head><meta name="viewport" content="width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1"/><meta http-equiv="X-UA-Compatible" content="IE=10,IE=9,IE=8" /><title>').reference(b.get("pageTitle"),b,"h").write("</title><!-- stylesheets --><style type=\"text/css\">@font-face {font-family: 'nwdb-global-icon-font';src:url('").helper("versionable",b,{},{url:"/etc/clientlibs/user/fonts/nwdb-global-icon-font.eot"}).write("');src:url('").helper("versionable",b,{},{url:"/etc/clientlibs/user/fonts/nwdb-global-icon-font.eot"}).write("?#iefix') format('embedded-opentype'),url('").helper("versionable",b,{},{url:"/etc/clientlibs/user/fonts/nwdb-global-icon-font.woff"}).write("') format('woff'),url('").helper("versionable",b,{},{url:"/etc/clientlibs/user/fonts/nwdb-global-icon-font.ttf"}).write("') format('truetype'),url('").helper("versionable",b,{},{url:"/etc/clientlibs/user/fonts/nwdb-global-icon-font.svg"}).write("#nwdb-global-icon-font') format('svg');font-weight: normal;font-style: normal;}</style><link rel=\"stylesheet\" type=\"text/css\" href='").helper("versionable",b,{},{url:"/etc/clientlibs/user/styles.css"}).write("' /><!-- scripts --><script type=\"text/javascript\" src='").helper("versionable",b,{},{url:"/etc/clientlibs/user/main.js"}).write("'><\/script><!--[if lt IE 9]><script type=\"text/javascript\" src=\"//html5shiv.googlecode.com/svn/trunk/html5.js\"><\/script><![endif]--><script type=\"text/javascript\">$.ajaxSetup({cache: true});if (window.parent != window){$('<style type=\"text/css\">nav {display: none;}</style>').appendTo($('head'));$('<style type=\"text/css\">.user-page-full .mobile-header {display: none;}</style>').appendTo($('head'));$('<style type=\"text/css\">footer {display: none;}</style>').appendTo($('head'));}else{$('<style type=\"text/css\">html, body, .page { height: 100%; }</style>').appendTo($('head'));$('<style type=\"text/css\">body > .page { height: auto; min-height: 100%; }</style>').appendTo($('head'));}<\/script></head>")
}return a
})();
(function(){dust.register("user/components/page/body",a);
function a(c,b){return c
}return a
})();
(function(){dust.register("user/components/page/header",e);
function e(k,j){return k.write('<nav id="global-nav" class="clearfix hide-mobile" data-web-analytics-common=\'{"templateName":"').section(j.get("analytics"),j,{block:d},null).write('","publicationDate":"').section(j.get("issueHeader"),j,{block:c},null).write('"}\'><ul class="site-links"><li class=\'tdblogo ').helper("eq",j,{block:b},{key:j.get("site"),value:"dailybeast"}).write("'><a href=\"").reference(j.getPath(false,["links","nav","dailybeast"]),j,"h").write('" data-track="{\'title\':\'thedailybeast\'}"><span class="logo icon-tdb-logo-horz-lg" aria-hidden="true" data-title="The Daily Beast"></span></a></li><li class=\'nwlogo ').helper("eq",j,{block:a},{key:j.get("site"),value:"newsweek"}).write("'><a href=\"").reference(j.getPath(false,["links","nav","newsweek"]),j,"h").write('" data-track="{\'title\':\'newsweek\'}"><span class="logo icon-nw-logo-lg" aria-hidden="true" data-title="Newsweek"></span></a></li><li class=\'witwlogo ').helper("eq",j,{block:h},{key:j.get("site"),value:"witw"}).write("'><a href=\"").reference(j.getPath(false,["links","nav","witw"]),j,"h").write('" data-track="{\'title\':\'womenintheworld\'}"><span class="logo icon-witw-logo-lg" aria-hidden="true" data-title="Women in the World"></span></a></li></ul><ul class="account user-nav user-intercept" signin-href="').reference(j.getPath(false,["links","user","signin"]),j,"h").write('" account-href="').reference(j.getPath(false,["links","user","account"]),j,"h").write('">').exists(j.getPath(false,["featureToggle","navSubscribe"]),j,{block:g},null).exists(j.getPath(false,["featureToggle","navSignIn"]),j,{block:f},null).write('</ul><form id="global-nav-search" role="search" method="get" action="').reference(j.getPath(false,["links","nav","search"]),j,"h").write('"><fieldset><input type="text" placeholder="Search" name="q"><input type="submit" value="&#xe004;"></fieldset></form></nav><header class="mobile-header"><ul class="account mobile-nav"><li><a href="').reference(j.getPath(false,["links","nav","subscribe"]),j,"h").write('" class="subscribe" data-web-analytics=\'{"eventName":"signin-subscribe-click","eventProperties":["subscribe","').reference(j.get("shortTitle"),j,"h").write('","').reference(j.get("url"),j,"h").write('","').reference(j.get("tags"),j,"h").write('","$templateName$","$publicationDate$"]}\'>Subscribe <span class="hide-tablet hide-mobile">to Newsweek</span> <span class="icon-chevron-right-lg" aria-hiden="true"></span></a></li><li class="user-login" ><a class="user-login-action" data-web-analytics=\'{"eventName":"signin-subscribe-click","eventProperties":["signin","').reference(j.get("shortTitle"),j,"h").write('","').reference(j.get("url"),j,"h").write('","').reference(j.get("tags"),j,"h").write('","$templateName$","$publicationDate$"]}\'></a> <span class="icon-account-dropdown-lg"></span><div class="dropdown-area"><ul class="dropdown"><li></li></ul></div></li></ul></header>')
}function d(k,j){return k.reference(j.get("templateName"),j,"h")
}function c(k,j){return k.helper("formatDate",j,{},{date:j.get("publicationDate"),format:"YYYY/MM/DD"})
}function b(k,j){return k.write("on")
}function a(k,j){return k.write("on")
}function h(k,j){return k.write("on")
}function g(k,j){return k.write('<li><a href="').reference(j.getPath(false,["links","nav","subscribe"]),j,"h").write('" class="subscribe" data-web-analytics=\'{"eventName":"signin-subscribe-click","eventProperties":["subscribe","').reference(j.get("shortTitle"),j,"h").write('","').reference(j.get("url"),j,"h").write('","').reference(j.get("tags"),j,"h").write('","$templateName$","$publicationDate$"]}\'>Subscribe <span class="hide-tablet hide-mobile">to Newsweek</span> <span class="icon-chevron-right-lg" aria-hiden="true"></span></a></li>')
}function f(k,j){return k.write('<li class="user-login" ><a class="user-login-action" data-web-analytics=\'{"eventName":"signin-subscribe-click","eventProperties":["signin","').reference(j.get("shortTitle"),j,"h").write('","').reference(j.get("url"),j,"h").write('","').reference(j.get("tags"),j,"h").write('","$templateName$","$publicationDate$"]}\'></a> <span class="icon-account-dropdown-lg"></span><div class="dropdown-area"><ul class="dropdown"><li></li></ul></div></li>')
}return e
})();
(function(){dust.register("user/components/links/links",a);
function a(c,b){return c.write('<div id="user-and-nav-links" style="display:none" data-links="').reference(b.getPath(true,[]),b,"h",["js"]).write('"></div>')
}return a
})();
(function(){dust.register("user/components/page/footer",a);
function a(c,b){return c.write('<footer class="global-footer"><div class="links-bar"><ul class="site-links clearfix"><li class="tdblogo"><a href="').reference(b.getPath(false,["links","nav","dailybeast"]),b,"h").write('"><span class="logo icon-tdb-logo-horz-lg" aria-hidden="true" data-title="The Daily Beast"></span></a></li><li class="nwlogo on"><a href="').reference(b.getPath(false,["links","nav","newsweek"]),b,"h").write('"><span class="logo icon-nw-logo-lg" aria-hidden="true" data-title="Newsweek"></span></a></li><li class="witwlogo"><a href="').reference(b.getPath(false,["links","nav","witw"]),b,"h").write('"><span class="logo icon-witw-logo-lg" aria-hidden="true" data-title="Women in the World"></span></a></li></ul><div class="standard-links"><ul><li><a href="http://www.thedailybeast.com/company/about-us.html">About</a></li><li><a href="http://www.thedailybeast.com/company/press-room.html">Press</a></li><li><a href="http://www.thedailybeast.com/company/contact-us.html">Contact</a></li><li><a href="http://hire.jobvite.com/CompanyJobs/Careers.aspx?c=qUY9VfwG&cs=9ze9VfwB">Jobs</a></li><li><a href="http://mediakit.newsweekdailybeast.com/">Advertise</a></li><li><a href="http://www.thedailybeast.com/company/privacy-policy.html">Privacy</a></li><li><a href="http://www.thedailybeast.com/company/terms-of-use.html">Terms of Use</a></li><li><a href="http://www.thedailybeast.com/company/copyright-trademark.html">Trademark</a></li></ul><small>&copy;2013 The Newsweek / Daily Beast Company LLC</small></div></div><div class="final-bar clearfix hide-mobile"></div></footer>')
}return a
})();
(function(I,H,G){function v(d){var c={x:d.offsetLeft,y:d.offsetTop};
while(d=d.offsetParent){c.x+=d.offsetLeft,c.y+=d.offsetTop
}return c
}function w(e,c){for(var f in c){e[f]===G&&(e[f]=c[f])
}return e
}function x(e,d){for(var f in d){e.style[y(e,f)||f]=d[f]
}return e
}function y(d,c){var k=d.style,j,h;
if(k[c]!==G){return c
}c=c.charAt(0).toUpperCase()+c.slice(1);
for(h=0;
h<F.length;
h++){j=F[h]+c;
if(k[j]!==G){return j
}}}function z(K,J,q,p){var o=["opacity",J,~~(K*100),q,p].join("-"),n=0.01+q/p*100,m=Math.max(1-(1-K)/J*(100-n),K),f=D.substring(0,D.indexOf("Animation")).toLowerCase(),e=f&&"-"+f+"-"||"";
E[o]||(A.insertRule("@"+e+"keyframes "+o+"{0%{opacity:"+m+"}"+n+"%{opacity:"+K+"}"+(n+0.01)+"%{opacity:1}"+(n+J)%100+"%{opacity:"+K+"}100%{opacity:"+m+"}}",0),E[o]=1);
return o
}function B(e,d,f){f&&!f.parentNode&&B(e,f),e.insertBefore(d,f||null);
return e
}function C(b,h){var g=H.createElement(b||"div"),f;
for(f in h){g[f]=h[f]
}return g
}var F=["webkit","Moz","ms","O"],E={},D;
B(H.getElementsByTagName("head")[0],C("style"));
var A=H.styleSheets[H.styleSheets.length-1],u=function r(b){if(!this.spin){return new r(b)
}this.opts=w(b||{},{lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:0.25,fps:20})
},t=u.prototype={spin:function(P){this.stop();
var O=this,N=O.el=x(C(),{position:"relative"}),M,L;
P&&(L=v(B(P,N,P.firstChild)),M=v(N),x(N,{left:(P.offsetWidth>>1)-M.x+L.x+"px",top:(P.offsetHeight>>1)-M.y+L.y+"px"})),N.setAttribute("aria-role","progressbar"),O.lines(N,O.opts);
if(!D){var K=O.opts,J=0,n=K.fps,l=n/K.speed,h=(1-K.opacity)/(l*K.trail/100),g=l/K.lines;
(function f(){J++;
for(var b=K.lines;
b;
b--){var c=Math.max(1-(J+b*g)%l*h,K.opacity);
O.opacity(N,K.lines-b,c,K)
}O.timeout=O.el&&setTimeout(f,~~(1000/n))
})()
}return O
},stop:function(){var b=this.el;
b&&(clearTimeout(this.timeout),b.parentNode&&b.parentNode.removeChild(b),this.el=G);
return this
}};
t.lines=function(g,f){function h(b,c){return x(C(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.width>>1)+"px"})
}var k=0,j;
for(;
k<f.lines;
k++){j=x(C(),{position:"absolute",top:1+~(f.width/2)+"px",transform:"translate3d(0,0,0)",opacity:f.opacity,animation:D&&z(f.opacity,f.trail,k,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&B(j,x(h("#000","0 0 4px #000"),{top:"2px"})),B(g,B(j,h(f.color,"0 0 1px rgba(0,0,0,.1)")))
}return g
},t.opacity=function(e,d,f){d<e.childNodes.length&&(e.childNodes[d].style.opacity=f)
},function(){var d=x(C("group"),{behavior:"url(#default#VML)"}),c;
if(!y(d,"transform")&&d.adj){for(c=4;
c--;
){A.addRule(["group","roundrect","fill","stroke"][c],"behavior:url(#default#VML)")
}t.lines=function(J,q){function g(b,f,e){B(m,B(x(n(),{rotation:360/q.lines*b+"deg",left:~~f}),B(x(C("roundrect",{arcsize:1}),{width:p,height:q.width,left:q.radius,top:-q.width>>1,filter:e}),C("fill",{color:q.color,opacity:q.opacity}),C("stroke",{opacity:0}))))
}function n(){return x(C("group",{coordsize:o+" "+o,coordorigin:-p+" "+-p}),{width:o,height:o})
}var p=q.length+q.width,o=2*p,m=n(),l=~(q.length+q.radius+q.width)+"px",h;
if(q.shadow){for(h=1;
h<=q.lines;
h++){g(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")
}}for(h=1;
h<=q.lines;
h++){g(h)
}return B(x(J,{margin:l+" 0 0 "+l,zoom:1}),m)
},t.opacity=function(g,f,k,j){var h=g.firstChild;
j=j.shadow&&j.lines||0,h&&f+j<h.childNodes.length&&(h=h.childNodes[f+j],h=h&&h.firstChild,h=h&&h.firstChild,h&&(h.opacity=k))
}
}else{D=y(d,"animation")
}}(),I.Spinner=u
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
$.priorityQ.windowReady.add("Advertising",$.priorityQ.CRITICAL,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isUsingFrames){$(".adStory .heading a").bind("click",function(a){a.preventDefault();
window.open($(".adStory").find("div[data-advertising] a").attr("href"))
});
dailybeast.advertising.init();
dailybeast.advertising.display()
}});
var dailybeast=dailybeast||{};
dailybeast.advertising=dailybeast.advertising||{};
dailybeast.advertising.request=function(){var d={siteID:"5480.iac.thedailybeast",tile:1,size:"1x1",keyword:"",params:"",element:""};
function l(p){var q=_.deepClone(d);
_.extend(q,p);
if(!q.ord){q.ord=e()
}var n=h(q.zone);
var r=dailybeast.interstitial.extract_S_FromZone(n);
var t=dailybeast.interstitial.getShowtag();
var o="";
o+=("http://ad.doubleclick.net/adj/"+q.siteID+"/");
o+=n;
o+=";tile="+q.tile;
o+=";sz="+q.size;
o+=r;
o+=t;
o+=c(q.element);
o+=k(q.template);
o+=m();
o+=f();
o+=b(q.keyword,q.adParams);
o+=a(q.params);
o+=";ord="+q.ord+"?";
return o
}function e(){var n=Math.random().toString();
n=n.substring(2,n.length);
return n
}function j(r){r=r||"rsi_segs";
if($.cookie){var p=$.cookie(r);
var q="";
if(p){var n=p.split("|");
for(var o=0;
o<n.length;
o++){q+=";rs="+n[o].replace("J05531_","j")
}}return q
}else{return""
}}function g(n){var q="";
var o=dailybeast.metatags.getTags(n);
for(var p=0;
p<o.length;
p++){q+=";dir="+o[p]
}return q
}function b(n,r){var q="";
if(_.hasValue(n)){q=";kw="+n
}else{var o=dailybeast.metatags.getTags("ad");
for(var p=0;
p<o.length;
p++){q+=";kw="+o[p].replace("ad:","")
}}if(_.hasValue(r)&&_.hasValue(r.adKeyword)){q+=";kw="+r.adKeyword
}return q
}function a(o){var n="";
if(_.hasValue(o)){if(_.isArray(o)){n=";"+o.join(";")
}else{if(_.isString(o)){n=";"+o
}}}return n
}function m(){var o="";
var n=dailybeast.metatags.getTemplate();
if(n=="blogentry"||n=="blog"){var p=/[^A-Za-z.]/g;
var q=dailybeast.metatags.getSection().toLowerCase().replace(p,"-");
o=(q.length>0)?";blog="+q.toLowerCase():""
}return o
}function f(){var n="";
var o=dailybeast.metatags.getContentPath();
if(o.indexOf("/content/newsweek")===0){n=";section=newsweek"
}return n
}function c(n){var o="";
var q=[];
if(_.isArray(n)||_.isString(n)){if(_.hasValue($)){q=$(n).closest("div[data-section]")
}}else{if(_.isElement(n)){}}if(q.length>0){var p=$.parseJSON($(q).attr("data-section"));
o=";pos="+p.title
}return o
}function k(o){var n="";
if(_.hasValue(o)){n=";template="+o
}else{if(dailybeast.metatags.getTemplate()){n=";template="+dailybeast.metatags.getTemplate()
}}return n
}function h(o){var q="";
if(_.hasValue(o)){q=o
}else{var p=dailybeast.metatags.getTags("topic",true);
var n=dailybeast.metatags.getTags("package",true);
if(p.length>0){q+=p[0]
}if(q.length>0&&n.length>0){q+=n[0]
}}return q
}return{generateRequest:l,generateOrd:e,generateZone:h,generateTemplate:k,generatePosition:c,generateBlog:m,generateParams:a,generateKeyword:b,generateDir:g,generateAudienceScience:j}
}();
var BCMAPI=new function(){this.token="esQXrWiMb5SB4pVyTMQSECQNWKloZu9RZWd8o3OehAY.";
this.callback="BCMAPI.flush";
this.url="http://api.brightcove.com/services/library";
this.calls=[{command:"find_all_videos",def:false},{command:"find_video_by_id",def:"video_id"},{command:"find_video_by_id_unfiltered",def:"video_id"},{command:"find_videos_by_ids",def:"video_ids"},{command:"find_videos_by_ids_unfiltered",def:"video_ids"},{command:"find_video_by_reference_id",def:"reference_id"},{command:"find_video_by_reference_id_unfiltered",def:"reference_id"},{command:"find_videos_by_reference_ids",def:"reference_ids"},{command:"find_videos_by_reference_ids_unfiltered",def:"reference_ids"},{command:"find_videos_by_campaign_id",def:"campaign_id"},{command:"find_videos_by_tags",def:"or_tags"},{command:"find_videos_by_text",def:"text"},{command:"find_videos_by_user_id",def:"user_id"},{command:"find_modified_videos",def:"from_date"},{command:"find_related_videos",def:"video_id"},{command:"find_all_playlists",def:false},{command:"find_playlist_by_id",def:"playlist_id"},{command:"find_playlists_by_ids",def:"playlist_ids"},{command:"find_playlist_by_reference_id",def:"reference_id"},{command:"find_playlists_by_reference_ids",def:"reference_ids"},{command:"find_playlists_for_player_id",def:"player_id"},{command:"search_videos",def:"all"}];
this.inject=function(b){var a=document.createElement("script");
a.setAttribute("src",this.url+"?"+b);
a.setAttribute("type","text/javascript");
document.getElementsByTagName("head")[0].appendChild(a);
return true
};
this.find=function(f,e){f=f.toLowerCase().replace(/(find_)|(_)|(get_)/g,"");
e=e||null;
var c=null;
var a="";
for(var b in this.calls){if(typeof this.calls[b].command=="undefined"){continue
}if(f==this.calls[b].command.toLowerCase().replace(/(find_)|(_)|(get_)/g,"")){f=this.calls[b].command;
if(typeof this.calls[b].def!="undefined"){c=this.calls[b].def
}break
}}a="command="+f;
if((typeof e=="object")&&e){for(var d in e){if(d=="selector"){a+="&"+c+"="+encodeURIComponent(e[d])
}else{a+="&"+d+"="+encodeURIComponent(e[d])
}}if(typeof e.callback!="string"){a+="&callback="+this.callback
}if(typeof e.token!="string"){a+="&token="+this.token
}}else{if(e){a+="&"+c+"="+encodeURIComponent(e)+"&callback="+this.callback;
a+="&token="+this.token
}else{a+="&token="+this.token;
a+="&callback="+this.callback
}}this.inject(a);
return true
};
this.search=function(a){return this.find("search_videos",a)
};
this.flush=function(a){return true
}
}();
(function(d){var a=d.event.special,c="D"+(+new Date()),b="D"+(+new Date()+1);
a.scrollstart={setup:function(){var f,e=function(g){if(f){clearTimeout(f)
}else{g.type="scrollstart";
d(this).trigger(g.type,arguments)
}f=setTimeout(function(){f=null
},a.scrollstop.latency)
};
d(this).bind("scroll",e).data(c,e)
},teardown:function(){d(this).unbind("scroll",d(this).data(c))
}};
a.scrollstop={latency:350,setup:function(){var f,e=function(g){if(f){clearTimeout(f)
}f=setTimeout(function(){f=null;
g.type="scrollstop";
d(this).trigger(g.type,arguments)
},a.scrollstop.latency)
};
d(this).bind("scroll",e).data(b,e)
},teardown:function(){d(this).unbind("scroll",d(this).data(b))
}}
})(jQuery);
(function(b){var l={},a,m,c=document,j=window,h=c.documentElement,k=b.expando;
b.event.special.inview={add:function(d){l[d.guid+"-"+this[k]]={data:d,$element:b(this)}
},remove:function(d){try{delete l[d.guid+"-"+this[k]]
}catch(n){}}};
function g(){var o,d,n={height:j.innerHeight,width:j.innerWidth};
if(!n.height){o=c.compatMode;
if(o||!b.support.boxModel){d=o==="CSS1Compat"?h:c.body;
n={height:d.clientHeight,width:d.clientWidth}
}}return n
}function e(){return{top:j.pageYOffset||h.scrollTop||c.body.scrollTop,left:j.pageXOffset||h.scrollLeft||c.body.scrollLeft}
}function f(){var q=b(),p,n=0;
b.each(l,function(B,A){var y=A.data.selector,z=A.$element;
q=q.add(y?z.find(y):z)
});
p=q.length;
if(p){a=a||g();
m=m||e();
for(;
n<p;
n++){if(!b.contains(h,q[n])){continue
}var w=b(q[n]),x={height:w.height(),width:w.width()},d=w.offset(),r=w.data("inview"),u,t,v;
if(!m||!a){return
}var o=a.height+parseInt(w.attr("data-sensitivity")||"0");
if(d.top+x.height>m.top&&d.top<m.top+o&&d.left+x.width>m.left&&d.left<m.left+a.width){u=(m.left>d.left?"right":(m.left+a.width)<(d.left+x.width)?"left":"both");
t=(m.top>d.top?"bottom":(m.top+o.height)<(d.top+x.height)?"top":"both");
v=u+"-"+t;
if(!r||r!==v){w.data("inview",v).trigger("inview",[true,u,t])
}}else{if(r){w.data("inview",false).trigger("inview",[false])
}}}}}b(j).bind("scroll resize",function(){a=m=null
});
b(window).bind("scrollstop",f);
b(window).on("load",f);
setInterval(function(){if(!isUserScrolling){f()
}},3000)
})(jQuery);
$.widget("ui.pagination",{options:{activeClass:"active",disabledClass:"disabled",articleElement:"article",pageNumberText:"(Page {0} of {1})",pageNumberElement:"",minWordsForLastPage:0,wordsPerPage:250,disabled:false,paginationItemsElement:"",nextElement:"",showAllElement:"",firstPageElements:"",nextPageElements:""},_create:function(){if(!this.options.disabled){var a=this;
this._elements=$(this.options.articleElement).find(".text.section p").add(".section").not(".new, .text, .pagebreak");
this._totalWordCount=0;
$(this._elements).each(function(){a._totalWordCount+=$(this).text().split(" ").length
});
this._pageCount=0;
this._currentIndex=0;
this._pageMarkers=this._determinePageMarkers();
if(this._pageCount>1){this.element.show();
this._renderPagination();
this._bindElements();
this._show(0,true)
}else{this.element.hide()
}}},show:function(a){this._show(a)
},showAll:function(){this._showAll()
},hideAll:function(){this._hideAll()
},next:function(){this._next()
},destroy:function(){$.widget.prototype.apply(this,arguments)
},_bindElements:function(){var a=this;
$(this.options.nextElement).live("click",function(b){b.preventDefault();
a._next()
});
$(this.options.showAllElement).live("click",function(b){b.preventDefault();
a._showAll()
});
$(this.options.hideAllElement).live("click",function(b){b.preventDefault();
a._hideAll()
});
$(this.options.paginationItemsElement).find("a[data-page]").live("click",function(b){b.preventDefault();
var c=$(this).attr("data-page");
a._show(parseInt(c))
})
},_determinePageMarkers:function(){var e=this;
var d=0;
var f=this._totalWordCount;
var a=[0];
var c=0;
e._pageStarts=[];
if($(this.options.articleElement).find(".pagebreak").length>0){var b=0;
$(this.options.articleElement).find(".text.section p").add(".section").not(".new, .text").each(function(g,h){if(!$(this).hasClass("pagebreak")){b++
}if($(this).hasClass("pagebreak")){a.push(b);
e._pageStarts.push(e._elements[b]);
e._pageCount++
}if(g==e._elements.size()-1){e._pageCount++
}})
}else{$(this._elements).each(function(g,j){if(d<=e.options.wordsPerPage||d==0){var h=$(this).text().split(" ").length;
d+=h;
f-=h
}if(d>e.options.wordsPerPage&&f>e.options.minWordsForLastPage){a.push(g+1);
e._pageStarts.push(e._elements[g+1]);
d=0;
e._pageCount++
}if(g==e._elements.size()-1&&d!=0){e._pageCount++
}})
}return a
},_show:function(a,f){if(a<this._pageCount){this._currentIndex=a;
$(this.options.articleElement).find(":not(script)").not(".header-tooltip").show();
if(a>0){var e=$(this._pageStarts[a-1]);
e.prevAll().not(".quoteStart").hide();
e.closest(".section").prevAll("div, blockquote, figure").hide();
if(e.closest(".section").find("p:first").is(":visible")){var d=e.closest(".section").prevAll("div, blockquote, figure");
for(var c=0;
c<d.length;
c++){if($(d[c]).hasClass("inline-content")||$(d[c]).find(".inline-content").length>0){$(d[c]).show()
}else{if($(d[c]).hasClass("text")){break
}}}}}var b=$(this._pageStarts[a]);
b.hide();
b.nextAll().hide();
b.closest(".section").nextAll("div, blockquote, figure").hide();
$(".storyMeta").hide();
if($(b).index()==0||b.parent("blockquote, .brightcove").length>0){b.closest(".section").hide()
}var d=b.closest(".section").prevAll("div, figure");
if(!(d.length==1&&a==0)){for(var c=0;
c<d.length;
c++){if($(d[c]).hasClass("inline-content")||$(d[c]).find(".inline-content").length>0){$(d[c]).hide()
}else{break
}}}this._updateElements();
if(f===undefined||f!==true){this._updateAnalytics();
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
},_renderPagination:function(){var a="<ul>";
for(var b=0;
b<this._pageCount;
b++){a+="<li><a href='#' data-page='"+b+'\' data-track=\'{"title":"pagination"}\'>'+(b+1)+"</a></li>"
}a+="</ul>";
$(this.options.paginationItemsElement).append(a)
},_updateElements:function(){var c=this;
if(this._currentIndex==(this._pageCount-1)){$(this.options.nextElement).addClass(this.options.disabledClass)
}else{$(this.options.nextElement).removeClass(this.options.disabledClass)
}$(this.options.paginationItemsElement).find("a[data-page]").removeClass(this.options.activeClass);
var b=$(this.options.paginationItemsElement).find("a[data-page]:eq("+this._currentIndex+")");
b.addClass(this.options.activeClass);
var a=this.options.pageNumberText.replace("{0}",this._currentIndex+1).replace("{1}",this._pageCount);
$(this.options.pageNumberElement).text(a);
if(this._currentIndex==0){$(this.options.firstPageElements).show();
$(this.options.nextPageElements).hide()
}else{$(this.options.firstPageElements).hide();
$(this.options.nextPageElements).show()
}},_updateAnalytics:function(b){try{var a=b||this._currentIndex;
dailybeast.analytics.trackPageview({pageNum:a+1})
}catch(c){}}});
function replaceTemplate(b,c,a){renderTemplate(b,c,function(d){a.replaceWith(d)
})
}function renderTemplate(a,b,c){if(a&&a.indexOf("content/view/api/redirect")==0){window.location=b["content/view/api/redirect"]
}else{dust.render(a,b,function(e,d){if(e){$.log(e)
}else{c(d)
}})
}}var dailybeast=dailybeast||{};
dailybeast.videopage=function(){var a=true;
var j=null;
var l=0;
var q=null;
var n={};
var k={NOW_PLAYING:"Now Playing:",UP_NEXT:"Up Next"};
function p(){if($.cookie("video-continuous")!=null){a=$.cookie("video-continuous")=="true";
if(a){$("#continuous-play").attr("checked","checked")
}else{$("#continuous-play").removeAttr("checked")
}}dailybeast.video.addVideoEventListener(d);
g();
e();
f();
h();
m()
}function c(u){var y=u.videos;
var t="";
var w="";
for(var v=0;
v<y.length;
v++){var x=y[v];
x.nextVideo=(v+1<y.length)?y[v+1]:null;
x.previousVideo=(v>0)?y[v-1]:null;
n[x.id]=x;
var r="media chapter";
t+='<li data-id="'+x.id+'">';
t+='<a href="#">';
t+='<img width="167" height="112" alt="'+x.name+'" src="'+x.videoStillURL+'">';
t+='<div class="itemData">';
t+='<span class="chapter-number" href="#'+x.id+'">'+w+"</span>";
t+='<h3 class="heading">'+x.name+"</h3>";
t+="</div>";
t+="</a>";
t+="</li>"
}if(!n[q]){n[q]={};
n[q].nextVideo=y[0]
}$(".storyScroller-scrollable .items").append(t);
b(j)
}function e(){$("#continuous-play").live("change",function(r){o($(this))
})
}function g(){$(".storyScroller-scrollable").scrollable({next:".storyScroller-next",prev:".storyScroller-previous",size:5,api:true});
this.chapterAPI=$(".storyScroller-scrollable").data("scrollable");
var r=5;
$.each(this.chapterAPI.getItems(),function(t){if(t==1||t%r==1){var u=$("<a/>").attr("href","#"+(t-1));
u.click(function(v){v.preventDefault();
if("current"!=this.parentElement.className){$(".storyScroller-scrollable").data("scrollable").seekTo(t==1?0:t)
}});
$(".playlist .pagination").append(u)
}});
$(".playlist .pagination a").wrap("<li></li>");
if(this.chapterAPI.getItems().length<=(r+1)){$(chapterAPI.getConf().next).addClass("disabled")
}this.chapterAPI.onSeek(function(u,t){if(this.getIndex()>=this.getSize()-r){$(chapterAPI.getConf().next).addClass("disabled")
}var v=$('.playlist .pagination a[href="#'+(this.getIndex()==0?0:this.getIndex()-1)+'"]').parent();
if(v.length!=0){$(".playlist .pagination li").removeClass("current");
v.addClass("current")
}});
this.chapterAPI.onBeforeSeek(function(u,t){if(this.getIndex()==0&&t==5&&this.getSize()>5){$(".storyScroller-scrollable").data("scrollable").seekTo(6);
return false
}else{if(this.getIndex()==6&&t==1){$(".storyScroller-scrollable").data("scrollable").seekTo(0);
return false
}}if(this.getIndex()>=this.getSize()-r){if(t>this.getIndex()){return false
}}});
setTimeout(function(){f()
},250)
}function f(){var r=$(".storyScroller-scrollable").find(".current").index();
r=r-(r%5);
if(r!=l){this.chapterAPI.begin(0).seekTo(r);
l=r
}$('.playlist .pagination a[href="#'+r+'"]').parent().addClass("current")
}function d(r){if(r.type=="mediaComplete"||(dailybeast.video.ytAPIReady&&r.data==YT.PlayerState.ENDED)){var t=n[q];
if($(".current").next().length>0&&a){nextVideoTimeout=setTimeout(function(){var u=location.host;
var v=$(".current").next().find("a:eq(0)").attr("href");
window.location.href="http://"+u+v
},1000)
}}}function o(r){a=$(r).is(":checked");
$.cookie("video-continuous",a)
}function h(){if($(".playlist .items").children("li").length>3){var u=$(".playlist li.current");
var r=u.data("src")==$(".playlist li:last-child").data("src")?$(".playlist li:first-child"):u.next();
var t=u.data("src")==$(".playlist li:first-child").data("src")?$(".playlist li:last-child"):u.prev();
$(".video-image-next").css("background-image","url("+r.data("src")+")");
$(".video-image-previous").css("background-image","url("+t.data("src")+")");
$(".video-feature a.next").attr("href",r.find("a").attr("href"));
$(".video-feature a.previous").attr("href",t.find("a").attr("href"))
}}function b(t){var u=$(".storyScroller-scrollable .current");
u.removeClass("current");
u.find(".chapter-number").text("").hide();
u=$(".storyScroller-scrollable li[data-id="+t+"]");
u.addClass("current");
u.find(".chapter-number").text(k.NOW_PLAYING).show();
var r=u.next("div");
if(r.length>0){r.find(".chapter-number").text(k.UP_NEXT).show()
}q=t
}function m(){var t=$(".video-feature-background").width(),r=215,u=r/t*100;
newPosition=Math.round(u+50);
$(".video-image-next").css("left",newPosition+"%");
$(".video-image-previous").css("right",newPosition+"%")
}return{init:p,getPlaylistHandler:c,positionNextPreviousImage:m}
}();
var dailybeast=dailybeast||{};
dailybeast.story=function(){function a(){var h=$("#fontSizer");
var c=$("#sizeUp");
var d=$("#sizeDown");
var g=$(".article-body");
var e=0;
var f=["normal","big","bigger","biggest"];
var b=f.length-1;
$(c).bind("click",function(j){j.preventDefault();
e++;
if(e>b){e=b
}else{$(d).removeClass("disabled");
$(g).removeClass("big").removeClass("bigger").removeClass("biggest");
$(g).addClass(f[e]);
if(e==b){$(c).addClass("disabled")
}}});
$(d).bind("click",function(j){j.preventDefault();
e--;
if(e<0){e=0
}else{$(c).removeClass("disabled");
$(g).removeClass("big").removeClass("bigger").removeClass("biggest");
$(g).addClass(f[e]);
if(e==0){$(d).addClass("disabled")
}}})
}return{setupFontSizer:a}
}();
$.priorityQ.windowReady.add("Font Sizer",$.priorityQ.WHENEVER,function(){if($("body#article-page,body#blogentry-page").length>0){dailybeast.story.setupFontSizer()
}});
(function(c){var a={},b=0;
c.fn.once=function(g,e){if(typeof g!="string"){if(!(g in a)){a[g]=++b
}if(!e){e=g
}g="jquery-once-"+a[g]
}var d=g+"-processed",f=this.not("."+d).addClass(d);
return c.isFunction(e)?f.each(e):f
}
})(jQuery);
/*!
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
(function(f){f.tools=f.tools||{version:"v1.2.7"},f.tools.overlay={addEffect:function(j,c,k){h[j]=[c,k]
},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!f.browser.msie||f.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};
var e=[],h={};
f.tools.overlay.addEffect("default",function(a,l){var k=this.getConf(),j=f(window);
k.fixed||(a.top+=j.scrollTop(),a.left+=j.scrollLeft()),a.position=k.fixed?"fixed":"absolute",this.getOverlay().css(a).fadeIn(k.speed,l)
},function(b){this.getOverlay().fadeOut(this.getConf().closeSpeed,b)
});
function g(w,v){var u=this,t=w.add(u),r=f(window),q,p,o,c=f.tools.expose&&(v.mask||v.expose),b=Math.random().toString().slice(10);
c&&(typeof c=="string"&&(c={color:c}),c.closeOnClick=c.closeOnEsc=!1);
var a=v.target||w.attr("rel");
p=a?f(a):null||w;
if(!p.length){throw"Could not find Overlay: "+a
}w&&w.index(p)==-1&&w.click(function(d){u.load(d);
return d.preventDefault()
}),f.extend(u,{load:function(x){if(u.isOpened()){return u
}var j=h[v.effect];
if(!j){throw'Overlay: cannot find effect : "'+v.effect+'"'
}v.oneInstance&&f.each(e,function(){this.close(x)
}),x=x||f.Event(),x.type="onBeforeLoad",t.trigger(x);
if(x.isDefaultPrevented()){return u
}o=!0,c&&f(p).expose(c);
var y=v.top,m=v.left,l=p.outerWidth({margin:!0}),k=p.outerHeight({margin:!0});
typeof y=="string"&&(y=y=="center"?Math.max((r.height()-k)/2,0):parseInt(y,10)/100*r.height()),m=="center"&&(m=Math.max((r.width()-l)/2,0)),j[0].call(u,{top:y,left:m},function(){o&&(x.type="onLoad",t.trigger(x))
}),c&&v.closeOnClick&&f.mask.getMask().one("click",u.close),v.closeOnClick&&f(document).on("click."+b,function(d){f(d.target).parents(p).length||u.close(d)
}),v.closeOnEsc&&f(document).on("keydown."+b,function(d){d.keyCode==27&&u.close(d)
});
return u
},close:function(d){if(!u.isOpened()){return u
}d=d||f.Event(),d.type="onBeforeClose",t.trigger(d);
if(!d.isDefaultPrevented()){o=!1,h[v.effect][1].call(u,function(){d.type="onClose",t.trigger(d)
}),f(document).off("click."+b+" keydown."+b),c&&f.mask.close();
return u
}},getOverlay:function(){return p
},getTrigger:function(){return w
},getClosers:function(){return q
},isOpened:function(){return o
},getConf:function(){return v
}}),f.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(d,j){f.isFunction(v[j])&&f(u).on(j,v[j]),u[j]=function(k){k&&f(u).on(j,k);
return u
}
}),q=p.find(v.close||".close"),!q.length&&!v.close&&(q=f('<a class="close"></a>'),p.prepend(q)),q.click(function(d){u.close(d)
}),v.load&&u.load()
}f.fn.overlay=function(b){var a=this.data("overlay");
if(a){return a
}f.isFunction(b)&&(b={onBeforeLoad:b}),b=f.extend(!0,{},f.tools.overlay.conf,b),this.each(function(){a=new g(f(this),b),e.push(a),f(this).data("overlay",a)
});
return b.api?a:this
}
})(jQuery);
(function(g){g.tools=g.tools||{version:"v1.2.7"},g.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};
function f(l,e){var n=parseInt(l.css(e),10);
if(n){return n
}var m=l[0].currentStyle;
return m&&m.width&&parseInt(m.width,10)
}function k(a,l){var e=g(l);
return e.length<2?e:a.parent().find(l)
}var j;
function h(A,z){var y=this,x=A.add(y),w=A.children(),v=0,u=z.vertical;
j||(j=y),w.length>1&&(w=g(z.items,A)),z.size>1&&(z.circular=!1),g.extend(y,{getConf:function(){return z
},getIndex:function(){return v
},getSize:function(){return y.getItems().size()
},getNaviButtons:function(){return d.add(c)
},getRoot:function(){return A
},getItemWrap:function(){return w
},getItems:function(){return w.find(z.item).not("."+z.clonedClass)
},move:function(l,e){return y.seekTo(v+l,e)
},next:function(b){return y.move(z.size,b)
},prev:function(b){return y.move(-z.size,b)
},begin:function(b){return y.seekTo(0,b)
},end:function(b){return y.seekTo(y.getSize()-1,b)
},focus:function(){j=y;
return y
},addItem:function(e){e=g(e),z.circular?(w.children().last().before(e),w.children().first().replaceWith(e.clone().addClass(z.clonedClass))):(w.append(e),c.removeClass("disabled")),x.trigger("onAddItem",[e]);
return y
},seekTo:function(o,D,B){o.jquery||(o*=1);
if(z.circular&&o===0&&v==-1&&D!==0){return y
}if(!z.circular&&o<0||o>y.getSize()||o<-1){return y
}var p=o;
o.jquery?o=y.getItems().index(o):p=y.getItems().eq(o);
var e=g.Event("onBeforeSeek");
if(!B){x.trigger(e,[o,D]);
if(e.isDefaultPrevented()||!p.length){return y
}}var C=u?{top:-p.position().top}:{left:-p.position().left};
v=o,j=y,D===undefined&&(D=z.speed),w.animate(C,D,z.easing,B||function(){x.trigger("onSeek",[o])
});
return y
}}),g.each(["onBeforeSeek","onSeek","onAddItem"],function(e,l){g.isFunction(z[l])&&g(y).on(l,z[l]),y[l]=function(m){m&&g(y).on(l,m);
return y
}
});
if(z.circular){var t=y.getItems().slice(-1).clone().prependTo(w),r=y.getItems().eq(1).clone().appendTo(w);
t.add(r).addClass(z.clonedClass),y.onBeforeSeek(function(l,e,m){if(!l.isDefaultPrevented()){if(e==-1){y.seekTo(t,m,function(){y.end(0)
});
return l.preventDefault()
}e==y.getSize()&&y.seekTo(r,m,function(){y.begin(0)
})
}});
var q=A.parents().add(A).filter(function(){if(g(this).css("display")==="none"){return !0
}});
q.length?(q.show(),y.seekTo(0,0,function(){}),q.hide()):y.seekTo(0,0,function(){})
}var d=k(A,z.prev).click(function(b){b.stopPropagation(),y.prev()
}),c=k(A,z.next).click(function(b){b.stopPropagation(),y.next()
});
z.circular||(y.onBeforeSeek(function(l,e){setTimeout(function(){l.isDefaultPrevented()||(d.toggleClass(z.disabledClass,e<=0),c.toggleClass(z.disabledClass,e>=y.getSize()-1))
},1)
}),z.initialIndex||d.addClass(z.disabledClass)),y.getSize()<2&&d.add(c).addClass(z.disabledClass),z.mousewheel&&g.fn.mousewheel&&A.mousewheel(function(l,e){if(z.mousewheel){y.move(e<0?1:-1,z.wheelSpeed||50);
return !1
}});
if(z.touch){var a={};
w[0].ontouchstart=function(l){var e=l.touches[0];
a.x=e.clientX,a.y=e.clientY
},w[0].ontouchmove=function(l){if(l.touches.length==1&&!w.is(":animated")){var e=l.touches[0],n=a.x-e.clientX,m=a.y-e.clientY;
y[u&&m>0||!u&&n>0?"next":"prev"](),l.preventDefault()
}}
}z.keyboard&&g(document).on("keydown.scrollable",function(e){if(!(!z.keyboard||e.altKey||e.ctrlKey||e.metaKey||g(e.target).is(":input"))){if(z.keyboard!="static"&&j!=y){return
}var l=e.keyCode;
if(u&&(l==38||l==40)){y.move(l==38?-1:1);
return e.preventDefault()
}if(!u&&(l==37||l==39)){y.move(l==37?-1:1);
return e.preventDefault()
}}}),z.initialIndex&&y.seekTo(z.initialIndex,0,function(){})
}g.fn.scrollable=function(a){var d=this.data("scrollable");
if(d){return d
}a=g.extend({},g.tools.scrollable.conf,a),this.each(function(){d=new h(g(this),a),g(this).data("scrollable",d)
});
return a.api?d:this
}
})(jQuery);
(function(d){var c=d.tools.scrollable;
c.autoscroll={conf:{autoplay:!0,interval:3000,autopause:!0}},d.fn.autoscroll=function(f){typeof f=="number"&&(f={interval:f});
var b=d.extend({},c.autoscroll.conf,f),a;
this.each(function(){var e=d(this).data("scrollable"),m=e.getRoot(),l,k=!1;
function j(){l&&clearTimeout(l),l=setTimeout(function(){e.next()
},b.interval)
}e&&(a=e),e.play=function(){l||(k=!1,m.on("onSeek",j),j())
},e.pause=function(){l=clearTimeout(l),m.off("onSeek",j)
},e.resume=function(){k||e.play()
},e.stop=function(){k=!0,e.pause()
},b.autopause&&m.add(e.getNaviButtons()).hover(e.pause,e.resume),b.autoplay&&e.play()
});
return b.api?a:this
}
})(jQuery);
(function(e){var d=e.tools.scrollable;
d.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};
function f(a,h){var g=e(h);
return g.length<2?g:a.parent().find(h)
}e.fn.navigator=function(b){typeof b=="string"&&(b={navi:b}),b=e.extend({},d.navigator.conf,b);
var a;
this.each(function(){var v=e(this).data("scrollable"),u=b.navi.jquery?b.navi:f(v.getRoot(),b.navi),t=v.getNaviButtons(),r=b.activeClass,q=b.history&&history.pushState,p=v.getConf().size;
v&&(a=v),v.getNaviButtons=function(){return t.add(u)
},q&&(history.pushState({i:0},""),e(window).on("popstate",function(g){var h=g.originalEvent.state;
h&&v.seekTo(h.i)
}));
function o(g,j,h){v.seekTo(j),h.preventDefault(),q&&history.pushState({i:j},"")
}function n(){return u.find(b.naviItem||"> *")
}function c(g){var h=e("<"+(b.naviItem||"a")+"/>").click(function(j){o(e(this),g,j)
});
g===0&&h.addClass(r),b.indexed&&h.text(g+1),b.idPrefix&&h.attr("id",b.idPrefix+g);
return h.appendTo(u)
}n().length?n().each(function(g){e(this).click(function(h){o(e(this),g,h)
})
}):e.each(v.getItems(),function(g){g%p==0&&c(g)
}),v.onBeforeSeek(function(h,g){setTimeout(function(){if(!h.isDefaultPrevented()){var k=g/p,j=n().eq(k);
j.length&&n().removeClass(r).eq(k).addClass(r)
}},1)
}),v.onAddItem(function(g,j){var h=v.getItems().index(j);
h%p==0&&c(h)
})
});
return b.api?a:this
}
})(jQuery);
(function(r){r.tools=r.tools||{version:"v1.2.7"};
var q;
q=r.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};
function p(){if(r.browser.msie){var a=r(document).height(),d=r(window).height();
return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a-d<20?d:a]
}return[r(document).width(),r(document).height()]
}function o(a){if(a){return a.call(r.mask)
}}var n,m,l,k,j;
r.mask={load:function(c,b){if(l){return this
}typeof c=="string"&&(c={color:c}),c=c||k,k=c=r.extend(r.extend({},q.conf),c),n=r("#"+c.maskId),n.length||(n=r("<div/>").attr("id",c.maskId),r("body").append(n));
var a=p();
n.css({position:"absolute",top:0,left:0,width:a[0],height:a[1],display:"none",opacity:c.startOpacity,zIndex:c.zIndex}),c.color&&n.css("backgroundColor",c.color);
if(o(c.onBeforeLoad)===!1){return this
}c.closeOnEsc&&r(document).on("keydown.mask",function(d){d.keyCode==27&&r.mask.close(d)
}),c.closeOnClick&&n.on("click.mask",function(d){r.mask.close(d)
}),r(window).on("resize.mask",function(){r.mask.fit()
}),b&&b.length&&(j=b.eq(0).css("zIndex"),r.each(b,function(){var d=r(this);
/relative|absolute|fixed/i.test(d.css("position"))||d.css("position","relative")
}),m=b.css({zIndex:Math.max(c.zIndex+1,j=="auto"?0:j)})),n.css({display:"block"}).fadeTo(c.loadSpeed,c.opacity,function(){r.mask.fit(),o(c.onLoad),l="full"
}),l=!0;
return this
},close:function(){if(l){if(o(k.onBeforeClose)===!1){return this
}n.fadeOut(k.closeSpeed,function(){o(k.onClose),m&&m.css({zIndex:j}),l=!1
}),r(document).off("keydown.mask"),n.off("click.mask"),r(window).off("resize.mask")
}return this
},fit:function(){if(l){var b=p();
n.css({width:b[0],height:b[1]})
}},getMask:function(){return n
},isLoaded:function(b){return b?l=="full":l
},getConf:function(){return k
},getExposed:function(){return m
}},r.fn.mask=function(a){r.mask.load(a);
return this
},r.fn.expose=function(a){r.mask.load(a,this);
return this
}
})(jQuery);
(function(I,a){var k=a.document;
function D(Q){var ae=k.createElement("div");
k.body.insertBefore(ae,null);
I.replaceWith(ae,'<script type="text/javascript">'+Q+"<\/script>")
}I=I||(function(Q){return{ajax:Q.ajax,$:function(ae){return Q(ae)[0]
},replaceWith:function(ae,ai){var ah=Q(ae)[0];
if(!ah){return
}var ag=ah.nextSibling,af=ah.parentNode;
Q(ah).remove();
if(ag){Q(ag).before(ai)
}else{Q(af).append(ai)
}},onLoad:function(ae){Q(ae)
},copyAttrs:function(ak,ag){var ai=Q(ag),af=ak.attributes;
for(var ah=0,ae=af.length;
ah<ae;
ah++){if(af[ah]&&af[ah].value){try{ai.attr(af[ah].name,af[ah].value)
}catch(aj){}}}}}
})(a.jQuery);
I.copyAttrs=I.copyAttrs||function(){};
I.onLoad=I.onLoad||function(){throw"error: autoAsync cannot be used without jQuery or defining writeCaptureSupport.onLoad"
};
function U(ag,af){for(var ae=0,Q=ag.length;
ae<Q;
ae++){if(af(ag[ae])===false){return
}}}function x(Q){return Object.prototype.toString.call(Q)==="[object Function]"
}function q(Q){return Object.prototype.toString.call(Q)==="[object String]"
}function w(af,ae,Q){return Array.prototype.slice.call(af,ae||0,Q||af&&af.length)
}function H(ag,af){var Q=false;
U(ag,ae);
function ae(ah){return !(Q=af(ah))
}return Q
}function P(Q){this._queue=[];
this._children=[];
this._parent=Q;
if(Q){Q._addChild(this)
}}P.prototype={_addChild:function(Q){this._children.push(Q)
},push:function(Q){this._queue.push(Q);
this._bubble("_doRun")
},pause:function(){this._bubble("_doPause")
},resume:function(){this._bubble("_doResume")
},_bubble:function(ae){var Q=this;
while(!Q[ae]){Q=Q._parent
}return Q[ae]()
},_next:function(){if(H(this._children,Q)){return true
}function Q(af){return af._next()
}var ae=this._queue.shift();
if(ae){ae()
}return !!ae
}};
function j(Q){if(Q){return new P(Q)
}P.call(this);
this.paused=0
}j.prototype=(function(){function Q(){}Q.prototype=P.prototype;
return new Q()
})();
j.prototype._doRun=function(){if(!this.running){this.running=true;
try{while(this.paused<1&&this._next()){}}finally{this.running=false
}}};
j.prototype._doPause=function(){this.paused++
};
j.prototype._doResume=function(){this.paused--;
this._doRun()
};
function R(){}R.prototype={_html:"",open:function(){this._opened=true;
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
var e=(function(){var Q={f:k.getElementById};
try{Q.f.call(k,"abc");
return true
}catch(ae){return false
}})();
function M(Q){U(Q,function(ae){var af=k.getElementById(ae.id);
if(!af){m("<proxyGetElementById - finish>","no element in writen markup with id "+ae.id);
return
}U(ae.el.childNodes,function(ag){if(ag!==undefined){af.appendChild(ag)
}});
if(af.contentWindow){a.setTimeout(function(){ae.el.contentWindow.document.copyTo(af.contentWindow.document)
},1)
}I.copyAttrs(ae.el,af)
})
}function u(ae,Q){if(Q&&Q[ae]===false){return false
}return Q&&Q[ae]||p[ae]
}function A(ae,an){var aj=[],ai=u("proxyGetElementById",an),al=u("writeOnGetElementById",an),Q={write:k.write,writeln:k.writeln,finish:function(){},out:""};
ae.state=Q;
k.write=am;
k.writeln=af;
if(ai||al){Q.getEl=k.getElementById;
k.getElementById=ag;
if(al){findEl=ak
}else{findEl=ah;
Q.finish=function(){M(aj)
}
}}function am(ao){Q.out+=ao
}function af(ao){Q.out+=ao+"\n"
}function ah(ap){var ao=k.createElement("div");
aj.push({id:ap,el:ao});
ao.contentWindow={document:new R()};
return ao
}function ak(aq){var ao=I.$(ae.target);
var ap=k.createElement("div");
ao.parentNode.insertBefore(ap,ao);
I.replaceWith(ap,Q.out);
Q.out="";
return e?Q.getEl.call(k,aq):Q.getEl(aq)
}function ag(ap){var ao=e?Q.getEl.call(k,ap):Q.getEl(ap);
return ao||findEl(ap)
}return Q
}function Z(Q){k.write=Q.write;
k.writeln=Q.writeln;
if(Q.getEl){k.getElementById=Q.getEl
}return Q.out
}function S(Q){return Q&&Q.replace(/^\s*<!(\[CDATA\[|--)/,"").replace(/(\]\]|--)>\s*$/,"")
}function b(){}function d(ae,Q){console.error("Error",Q,"executing code:",ae)
}var m=x(a.console&&console.error)?d:b;
function W(af,ae,Q){var ag=A(ae,Q);
try{D(S(af))
}catch(ah){m(af,ah)
}finally{Z(ag)
}return ag
}function T(ae){var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(ae);
return Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)
}function X(Q){return new RegExp("[\\s\\r\\n]"+Q+"=(?:([\"'])([\\s\\S]*?)\\1|([^\\s>]+))","i")
}function l(Q){var ae=X(Q);
return function(af){var ag=ae.exec(af)||[];
return ag[2]||ag[3]
}
}var t=/(<script[^>]*>)([\s\S]*?)<\/script>/ig,F=/<script[^>]*\/>/ig,o=X("src"),ab=l("src"),r=l("type"),ac=l("language"),G="__document_write_ajax_callbacks__",E="__document_write_ajax_div-",g="window['"+G+"']['%d']();",n=a[G]={},z='<script type="text/javascript">'+g+"<\/script>",L=0;
function c(){return(++L).toString()
}function K(ae,af){var Q;
if(x(ae)){Q=ae;
ae=null
}ae=ae||{};
Q=Q||ae&&ae.done;
ae.done=af?function(){af(Q)
}:Q;
return ae
}var C=new j();
var B=[];
var f=window._debugWriteCapture?function(){}:function(Q,af,ae){B.push({type:Q,src:af,data:ae})
};
var O=window._debugWriteCapture?function(){}:function(){B.push(arguments)
};
function aa(Q){var ae=c();
n[ae]=function(){Q();
delete n[ae]
};
return ae
}function N(Q){return z.replace(/%d/,aa(Q))
}function V(ai,am,af,ak){var aj=af&&new j(af)||C;
am=K(am);
var ah=u("done",am);
var Q="";
var ae=u("fixUrls",am);
if(!x(ae)){ae=function(an){return an
}
}if(x(ah)){Q=N(function(){aj.push(ah)
})
}return ai.replace(t,al).replace(F,ag)+Q;
function ag(an){return al(an,an.substring(0,an.length-2)+">","")
}function al(ap,aB,ao){var au=ab(aB),at=r(aB)||"",aI=ac(aB)||"",aH=(!at&&!aI)||at.toLowerCase().indexOf("javascript")!==-1||aI.toLowerCase().indexOf("javascript")!==-1;
f("replace",au,ap);
if(!aH){return ap
}var aC=aa(aw),av=E+aC,aA,ar={target:"#"+av,parent:ak};
function aw(){aj.push(aA)
}if(au){au=ae(au);
aB=aB.replace(o,"");
if(T(au)){aA=aG
}else{if(u("asyncAll",am)){aA=aF()
}else{aA=az
}}}else{aA=aE
}function aE(){an(ao)
}function az(){I.ajax({cache:true,url:au,type:"GET",dataType:"text",async:false,success:function(aJ){an(aJ)
}})
}function aq(aL,aJ,aK){m("<XHR for "+au+">",aK);
aj.resume()
}function ax(){return N(function(){aj.resume()
})
}function aF(){var aL,aK;
function aJ(aN,aM){if(!aL){aK=aN;
return
}try{an(aN,ax())
}catch(aO){m(aN,aO)
}}I.ajax({cache:true,url:au,type:"GET",dataType:"text",async:true,success:aJ,error:aq});
return function(){aL=true;
if(aK){an(aK)
}else{aj.pause()
}}
}function aG(aJ){var aL=A(ar,am);
aj.pause();
f("pause",au);
I.ajax({cache:true,url:au,type:"GET",dataType:"script",success:aK,error:aq});
function aK(aO,aN,aM){f("out",au,aL.out);
ay(Z(aL),N(aL.finish)+ax());
f("resume",au)
}}function an(aK,aJ){var aL=W(aK,ar,am);
aJ=N(aL.finish)+(aJ||"");
ay(aL.out,aJ)
}function aD(aJ){var aL={};
for(var aK in aJ){if(aJ.hasOwnProperty(aK)){aL[aK]=aJ[aK]
}}delete aL.done;
return aL
}function ay(aK,aJ){I.replaceWith(ar.target,V(aK,aD(am),aj,ar)+(aJ||""))
}return'<div style="display: none" id="'+av+'"></div>'+aB+g.replace(/%d/,aC)+"<\/script>"
}}function J(ae,af){var Q=C;
U(ae,function(ag){Q.push(ah);
function ah(){ag.action(V(ag.html,ag.options,Q),ag)
}});
if(af){Q.push(af)
}}function Y(Q){var ae=Q;
while(ae&&ae.nodeType===1){Q=ae;
ae=ae.lastChild;
while(ae&&ae.nodeType!==1){ae=ae.previousSibling
}}return Q
}function h(Q){var af=k.write,ai=k.writeln,ae,ag=[];
k.writeln=function(aj){k.write(aj+"\n")
};
var ah;
k.write=function(ak){var aj=Y(k.body);
if(aj!==ae){ae=aj;
ag.push(ah={el:aj,out:[]})
}ah.out.push(ak)
};
I.onLoad(function(){var am,ap,ak,ao,an;
Q=K(Q);
an=Q.done;
Q.done=function(){k.write=af;
k.writeln=ai;
if(an){an()
}};
for(var al=0,aj=ag.length;
al<aj;
al++){am=ag[al].el;
ap=k.createElement("div");
am.parentNode.insertBefore(ap,am.nextSibling);
ak=ag[al].out.join("");
ao=aj-al===1?V(ak,Q):V(ak);
I.replaceWith(ap,ao)
}})
}function y(ai){var aj=document.getElementsByTagName("script"),ap,ae,an,Q,af,ah,ag=0,al=ai?N(function(){if(++ag>=ak.length){ai()
}}):"",ak=[];
for(var am=0,ao=aj.length;
am<ao;
am++){ap=aj[am];
af=ap.getAttribute("extsrc");
ah=ap.getAttribute("asyncsrc");
if(af||ah){ak.push({ext:af,async:ah,s:ap})
}}for(am=0,ao=ak.length;
am<ao;
am++){ae=ak[am];
if(ae.ext){an='<script type="text/javascript" src="'+ae.ext+'"> <\/script>';
I.replaceWith(ae.s,V(an)+al)
}else{if(ae.async){an='<script type="text/javascript" src="'+ae.async+'"> <\/script>';
I.replaceWith(ae.s,V(an,{asyncAll:true},new j())+al)
}}}}var v="writeCapture";
var p=a[v]={_original:a[v],fixUrls:function(Q){return Q.replace(/&amp;/g,"&")
},noConflict:function(){a[v]=this._original;
return this
},debug:B,proxyGetElementById:false,_forTest:{Q:j,GLOBAL_Q:C,$:I,matchAttr:l,slice:w,capture:A,uncapture:Z,captureWrite:W},replaceWith:function(Q,af,ae){I.replaceWith(Q,V(af,ae))
},html:function(Q,ag,ae){var af=I.$(Q);
af.innerHTML="<span/>";
I.replaceWith(af.firstChild,V(ag,ae))
},load:function(Q,af,ae){I.ajax({cache:true,url:af,dataType:"text",type:"GET",success:function(ag){p.html(Q,ag,ae)
}})
},extsrc:y,autoAsync:h,sanitize:V,sanitizeSerial:J}
})(this.writeCaptureSupport,this);
jQuery.fn.textPlaceholder=function(){return this.each(function(){var b=this;
if(b.placeholder&&"placeholder" in document.createElement(b.tagName)){return
}var c=b.getAttribute("placeholder");
var a=jQuery(b);
if(b.value===""||b.value==c){a.addClass("text-placeholder");
b.value=c
}a.focus(function(){if(a.hasClass("text-placeholder")){this.value="";
a.removeClass("text-placeholder")
}});
a.blur(function(){if(this.value===""){a.addClass("text-placeholder");
this.value=c
}else{a.removeClass("text-placeholder")
}});
b.form&&jQuery(b.form).submit(function(){if(a.hasClass("text-placeholder")){b.value=""
}})
})
};
(function(d){d.timeago=function(g){if(g instanceof Date){return a(g)
}else{if(typeof g==="string"){return a(d.timeago.parse(g))
}else{return a(d.timeago.datetime(g))
}}};
var f=d.timeago;
d.extend(d.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",numbers:[]}},inWords:function(m){var n=this.settings.strings;
var j=n.prefixAgo;
var r=n.suffixAgo;
if(this.settings.allowFuture){if(m<0){j=n.prefixFromNow;
r=n.suffixFromNow
}m=Math.abs(m)
}var p=m/1000;
var g=p/60;
var o=g/60;
var q=o/24;
var k=q/365;
function h(t,v){var u=d.isFunction(t)?t(v,m):t;
var w=(n.numbers&&n.numbers[v])||v;
return u.replace(/%d/i,w)
}var l=p<45&&h(n.seconds,Math.round(p))||p<90&&h(n.minute,1)||g<45&&h(n.minutes,Math.round(g))||g<90&&h(n.hour,1)||o<24&&h(n.hours,Math.round(o))||o<48&&h(n.day,1)||q<30&&h(n.days,Math.floor(q))||q<60&&h(n.month,1)||q<365&&h(n.months,Math.floor(q/30))||k<2&&h(n.year,1)||h(n.years,Math.floor(k));
return d.trim([j,l,r].join(" "))
},parse:function(h){var g=d.trim(h);
g=g.replace(/\.\d\d\d+/,"");
g=g.replace(/-/,"/").replace(/-/,"/");
g=g.replace(/T/," ").replace(/Z/," UTC");
g=g.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
return new Date(g)
},datetime:function(h){var j=d(h).get(0).tagName.toLowerCase()==="time";
var g=j?d(h).attr("datetime"):d(h).attr("title");
return f.parse(g)
}});
d.fn.timeago=function(){var h=this;
h.each(c);
var g=f.settings;
if(g.refreshMillis>0){setInterval(function(){h.each(c)
},g.refreshMillis)
}return h
};
function c(){var g=b(this);
if(!isNaN(g.datetime)){d(this).text(a(g.datetime))
}return this
}function b(g){g=d(g);
if(!g.data("timeago")){g.data("timeago",{datetime:f.datetime(g)});
var h=d.trim(g.text());
if(h.length>0){g.attr("title",h)
}}return g.data("timeago")
}function a(g){return f.inWords(e(g))
}function e(g){return(new Date().getTime()-g.getTime())
}document.createElement("abbr");
document.createElement("time")
}(jQuery));
(function(a){a.fn.lazyImage=function(){this.find("img[data-src]").each(function(){var b=a(this),d=b.data().src;
if(d){var c=new Image();
a(c).load(function(){b.attr("src",d).removeAttr("data-src")
});
c.src=d
}})
}
})(jQuery);
(function(f){var a={},g=false;
function e(){var h=document.documentElement;
return("requestFullscreen" in h)||("mozRequestFullScreen" in h&&document.mozFullScreenEnabled)||("webkitRequestFullScreen" in h)
}function d(h){var j=h.get(0);
if(j.requestFullscreen){j.requestFullscreen()
}else{if(j.mozRequestFullScreen){j.mozRequestFullScreen()
}else{if(j.webkitRequestFullScreen){j.webkitRequestFullScreen()
}else{if(a.fakeFullscreen){g=true;
f(j).addClass(a.fullscreenClass);
a.callback(g)
}}}}}function c(h){if(document.exitFullscreen){document.exitFullscreen()
}else{if(document.mozCancelFullScreen){document.mozCancelFullScreen()
}else{if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()
}else{if(a.fakeFullscreen){g=false;
h.removeClass(a.fullscreenClass);
a.callback(g)
}}}}}function b(h){f(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange",function(){g=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen;
h(g)
})
}f.support.fullscreen=e();
f.fn.fullScreen=function(j){var h=this;
if(g){c();
return h
}a=f.extend({callback:f.noop(),fullscreenClass:"fullScreen",fakeFullscreen:false},j);
if((!f.support.fullscreen&&!a.fakeFullscreen)||h.length!==1){return h
}h.addClass(a.fullscreenClass);
d(h);
b(function(k){if(!k){h.removeClass(a.fullscreenClass);
f(document).off("fullscreenchange mozfullscreenchange webkitfullscreenchange")
}a.callback(k)
});
return h
};
f.fn.cancelFullScreen=function(){c(this);
return this
}
}(jQuery));
/*!
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
(function(f){f.fn.qtip=function(C,v){var z,u,B,t,y,x,w,A;
if(typeof C=="string"){if(typeof f(this).data("qtip")!=="object"){f.fn.qtip.log.error.call(self,1,f.fn.qtip.constants.NO_TOOLTIP_PRESENT,false)
}if(C=="api"){return f(this).data("qtip").interfaces[f(this).data("qtip").current]
}else{if(C=="interfaces"){return f(this).data("qtip").interfaces
}}}else{if(!C){C={}
}if(typeof C.content!=="object"||(C.content.jquery&&C.content.length>0)){C.content={text:C.content}
}if(typeof C.content.title!=="object"){C.content.title={text:C.content.title}
}if(typeof C.position!=="object"){C.position={corner:C.position}
}if(typeof C.position.corner!=="object"){C.position.corner={target:C.position.corner,tooltip:C.position.corner}
}if(typeof C.show!=="object"){C.show={when:C.show}
}if(typeof C.show.when!=="object"){C.show.when={event:C.show.when}
}if(typeof C.show.effect!=="object"){C.show.effect={type:C.show.effect}
}if(typeof C.hide!=="object"){C.hide={when:C.hide}
}if(typeof C.hide.when!=="object"){C.hide.when={event:C.hide.when}
}if(typeof C.hide.effect!=="object"){C.hide.effect={type:C.hide.effect}
}if(typeof C.style!=="object"){C.style={name:C.style}
}C.style=c(C.style);
t=f.extend(true,{},f.fn.qtip.defaults,C);
t.style=a.call({options:t},t.style);
t.user=f.extend(true,{},C)
}return f(this).each(function(){if(typeof C=="string"){x=C.toLowerCase();
B=f(this).qtip("interfaces");
if(typeof B=="object"){if(v===true&&x=="destroy"){while(B.length>0){B[B.length-1].destroy()
}}else{if(v!==true){B=[f(this).qtip("api")]
}for(z=0;
z<B.length;
z++){if(x=="destroy"){B[z].destroy()
}else{if(B[z].status.rendered===true){if(x=="show"){B[z].show()
}else{if(x=="hide"){B[z].hide()
}else{if(x=="focus"){B[z].focus()
}else{if(x=="disable"){B[z].disable(true)
}else{if(x=="enable"){B[z].disable(false)
}}}}}}}}}}}else{w=f.extend(true,{},t);
w.hide.effect.length=t.hide.effect.length;
w.show.effect.length=t.show.effect.length;
if(w.position.container===false){w.position.container=f(document.body)
}if(w.position.target===false){w.position.target=f(this)
}if(w.show.when.target===false){w.show.when.target=f(this)
}if(w.hide.when.target===false){w.hide.when.target=f(this)
}u=f.fn.qtip.interfaces.length;
for(z=0;
z<u;
z++){if(typeof f.fn.qtip.interfaces[z]=="undefined"){u=z;
break
}}y=new d(f(this),w,u);
f.fn.qtip.interfaces[u]=y;
if(typeof f(this).data("qtip")=="object"){if(typeof f(this).attr("qtip")==="undefined"){f(this).data("qtip").current=f(this).data("qtip").interfaces.length
}f(this).data("qtip").interfaces.push(y)
}else{f(this).data("qtip",{current:0,interfaces:[y]})
}if(w.content.prerender===false&&w.show.when.event!==false&&w.show.ready!==true){w.show.when.target.bind(w.show.when.event+".qtip-"+u+"-create",{qtip:u},function(D){A=f.fn.qtip.interfaces[D.data.qtip];
A.options.show.when.target.unbind(A.options.show.when.event+".qtip-"+D.data.qtip+"-create");
A.cache.mouse={x:D.pageX,y:D.pageY};
p.call(A);
A.options.show.when.target.trigger(A.options.show.when.event)
})
}else{y.cache.mouse={x:w.show.when.target.offset().left,y:w.show.when.target.offset().top};
p.call(y)
}}})
};
function d(v,u,w){var t=this;
t.id=w;
t.options=u;
t.status={animated:false,rendered:false,disabled:false,focused:false};
t.elements={target:v.addClass(t.options.style.classes.target),tooltip:null,wrapper:null,content:null,contentWrapper:null,title:null,button:null,tip:null,bgiframe:null};
t.cache={mouse:{},position:{},toggle:0};
t.timers={};
f.extend(t,t.options.api,{show:function(z){var y,A;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"show")
}if(t.elements.tooltip.css("display")!=="none"){return t
}t.elements.tooltip.stop(true,false);
y=t.beforeShow.call(t,z);
if(y===false){return t
}function x(){if(t.options.position.type!=="static"){t.focus()
}t.onShow.call(t,z);
if(f.browser.msie){t.elements.tooltip.get(0).style.removeAttribute("filter")
}}t.cache.toggle=1;
if(t.options.position.type!=="static"){t.updatePosition(z,(t.options.show.effect.length>0))
}if(typeof t.options.show.solo=="object"){A=f(t.options.show.solo)
}else{if(t.options.show.solo===true){A=f("div.qtip").not(t.elements.tooltip)
}}if(A){A.each(function(){if(f(this).qtip("api").status.rendered===true){f(this).qtip("api").hide()
}})
}if(typeof t.options.show.effect.type=="function"){t.options.show.effect.type.call(t.elements.tooltip,t.options.show.effect.length);
t.elements.tooltip.queue(function(){x();
f(this).dequeue()
})
}else{switch(t.options.show.effect.type.toLowerCase()){case"fade":t.elements.tooltip.fadeIn(t.options.show.effect.length,x);
break;
case"slide":t.elements.tooltip.slideDown(t.options.show.effect.length,function(){x();
if(t.options.position.type!=="static"){t.updatePosition(z,true)
}});
break;
case"grow":t.elements.tooltip.show(t.options.show.effect.length,x);
break;
default:t.elements.tooltip.show(null,x);
break
}t.elements.tooltip.addClass(t.options.style.classes.active)
}return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_SHOWN,"show")
},hide:function(z){var y;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"hide")
}else{if(t.elements.tooltip.css("display")==="none"){return t
}}clearTimeout(t.timers.show);
t.elements.tooltip.stop(true,false);
y=t.beforeHide.call(t,z);
if(y===false){return t
}function x(){t.onHide.call(t,z)
}t.cache.toggle=0;
if(typeof t.options.hide.effect.type=="function"){t.options.hide.effect.type.call(t.elements.tooltip,t.options.hide.effect.length);
t.elements.tooltip.queue(function(){x();
f(this).dequeue()
})
}else{switch(t.options.hide.effect.type.toLowerCase()){case"fade":t.elements.tooltip.fadeOut(t.options.hide.effect.length,x);
break;
case"slide":t.elements.tooltip.slideUp(t.options.hide.effect.length,x);
break;
case"grow":t.elements.tooltip.hide(t.options.hide.effect.length,x);
break;
default:t.elements.tooltip.hide(null,x);
break
}t.elements.tooltip.removeClass(t.options.style.classes.active)
}return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_HIDDEN,"hide")
},updatePosition:function(x,y){var D,H,M,K,I,F,z,J,C,E,L,B,G,A;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updatePosition")
}else{if(t.options.position.type=="static"){return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.CANNOT_POSITION_STATIC,"updatePosition")
}}H={position:{left:0,top:0},dimensions:{height:0,width:0},corner:t.options.position.corner.target};
M={position:t.getPosition(),dimensions:t.getDimensions(),corner:t.options.position.corner.tooltip};
if(t.options.position.target!=="mouse"){if(t.options.position.target.get(0).nodeName.toLowerCase()=="area"){K=t.options.position.target.attr("coords").split(",");
for(D=0;
D<K.length;
D++){K[D]=parseInt(K[D])
}I=t.options.position.target.parent("map").attr("name");
F=f('img[usemap="#'+I+'"]:first').offset();
H.position={left:Math.floor(F.left+K[0]),top:Math.floor(F.top+K[1])};
switch(t.options.position.target.attr("shape").toLowerCase()){case"rect":H.dimensions={width:Math.ceil(Math.abs(K[2]-K[0])),height:Math.ceil(Math.abs(K[3]-K[1]))};
break;
case"circle":H.dimensions={width:K[2]+1,height:K[2]+1};
break;
case"poly":H.dimensions={width:K[0],height:K[1]};
for(D=0;
D<K.length;
D++){if(D%2==0){if(K[D]>H.dimensions.width){H.dimensions.width=K[D]
}if(K[D]<K[0]){H.position.left=Math.floor(F.left+K[D])
}}else{if(K[D]>H.dimensions.height){H.dimensions.height=K[D]
}if(K[D]<K[1]){H.position.top=Math.floor(F.top+K[D])
}}}H.dimensions.width=H.dimensions.width-(H.position.left-F.left);
H.dimensions.height=H.dimensions.height-(H.position.top-F.top);
break;
default:return f.fn.qtip.log.error.call(t,4,f.fn.qtip.constants.INVALID_AREA_SHAPE,"updatePosition");
break
}H.dimensions.width-=2;
H.dimensions.height-=2
}else{if(t.options.position.target.add(document.body).length===1){H.position={left:f(document).scrollLeft(),top:f(document).scrollTop()};
H.dimensions={height:f(window).height(),width:f(window).width()}
}else{if(typeof t.options.position.target.attr("qtip")!=="undefined"){H.position=t.options.position.target.qtip("api").cache.position
}else{H.position=t.options.position.target.offset()
}H.dimensions={height:t.options.position.target.outerHeight(),width:t.options.position.target.outerWidth()}
}}z=f.extend({},H.position);
if(H.corner.search(/right/i)!==-1){z.left+=H.dimensions.width
}if(H.corner.search(/bottom/i)!==-1){z.top+=H.dimensions.height
}if(H.corner.search(/((top|bottom)Middle)|center/)!==-1){z.left+=(H.dimensions.width/2)
}if(H.corner.search(/((left|right)Middle)|center/)!==-1){z.top+=(H.dimensions.height/2)
}}else{H.position=z={left:t.cache.mouse.x,top:t.cache.mouse.y};
H.dimensions={height:1,width:1}
}if(M.corner.search(/right/i)!==-1){z.left-=M.dimensions.width
}if(M.corner.search(/bottom/i)!==-1){z.top-=M.dimensions.height
}if(M.corner.search(/((top|bottom)Middle)|center/)!==-1){z.left-=(M.dimensions.width/2)
}if(M.corner.search(/((left|right)Middle)|center/)!==-1){z.top-=(M.dimensions.height/2)
}J=(f.browser.msie)?1:0;
C=(f.browser.msie&&parseInt(f.browser.version.charAt(0))===6)?1:0;
if(t.options.style.border.radius>0){if(M.corner.search(/Left/)!==-1){z.left-=t.options.style.border.radius
}else{if(M.corner.search(/Right/)!==-1){z.left+=t.options.style.border.radius
}}if(M.corner.search(/Top/)!==-1){z.top-=t.options.style.border.radius
}else{if(M.corner.search(/Bottom/)!==-1){z.top+=t.options.style.border.radius
}}}if(J){if(M.corner.search(/top/)!==-1){z.top-=J
}else{if(M.corner.search(/bottom/)!==-1){z.top+=J
}}if(M.corner.search(/left/)!==-1){z.left-=J
}else{if(M.corner.search(/right/)!==-1){z.left+=J
}}if(M.corner.search(/leftMiddle|rightMiddle/)!==-1){z.top-=1
}}if(t.options.position.adjust.screen===true){z=o.call(t,z,H,M)
}if(t.options.position.target==="mouse"&&t.options.position.adjust.mouse===true){if(t.options.position.adjust.screen===true&&t.elements.tip){L=t.elements.tip.attr("rel")
}else{L=t.options.position.corner.tooltip
}z.left+=(L.search(/right/i)!==-1)?-6:6;
z.top+=(L.search(/bottom/i)!==-1)?-6:6
}if(!t.elements.bgiframe&&f.browser.msie&&parseInt(f.browser.version.charAt(0))==6){f("select, object").each(function(){B=f(this).offset();
B.bottom=B.top+f(this).height();
B.right=B.left+f(this).width();
if(z.top+M.dimensions.height>=B.top&&z.left+M.dimensions.width>=B.left){k.call(t)
}})
}z.left+=t.options.position.adjust.x;
z.top+=t.options.position.adjust.y;
G=t.getPosition();
if(z.left!=G.left||z.top!=G.top){A=t.beforePositionUpdate.call(t,x);
if(A===false){return t
}t.cache.position=z;
if(y===true){t.status.animated=true;
t.elements.tooltip.animate(z,200,"swing",function(){t.status.animated=false
})
}else{t.elements.tooltip.css(z)
}t.onPositionUpdate.call(t,x);
if(typeof x!=="undefined"&&x.type&&x.type!=="mousemove"){f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_POSITION_UPDATED,"updatePosition")
}}return t
},updateWidth:function(x){var y;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateWidth")
}else{if(x&&typeof x!=="number"){return f.fn.qtip.log.error.call(t,2,"newWidth must be of type number","updateWidth")
}}y=t.elements.contentWrapper.siblings().add(t.elements.tip).add(t.elements.button);
if(!x){if(typeof t.options.style.width.value=="number"){x=t.options.style.width.value
}else{t.elements.tooltip.css({width:"auto"});
y.hide();
if(f.browser.msie){t.elements.wrapper.add(t.elements.contentWrapper.children()).css({zoom:"normal"})
}x=t.getDimensions().width+1;
if(!t.options.style.width.value){if(x>t.options.style.width.max){x=t.options.style.width.max
}if(x<t.options.style.width.min){x=t.options.style.width.min
}}}}if(x%2!==0){x-=1
}t.elements.tooltip.width(x);
y.show();
if(t.options.style.border.radius){t.elements.tooltip.find(".qtip-betweenCorners").each(function(z){f(this).width(x-(t.options.style.border.radius*2))
})
}if(f.browser.msie){t.elements.wrapper.add(t.elements.contentWrapper.children()).css({zoom:"1"});
t.elements.wrapper.width(x);
if(t.elements.bgiframe){t.elements.bgiframe.width(x).height(t.getDimensions.height)
}}return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_WIDTH_UPDATED,"updateWidth")
},updateStyle:function(x){var A,B,y,z,C;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateStyle")
}else{if(typeof x!=="string"||!f.fn.qtip.styles[x]){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.STYLE_NOT_DEFINED,"updateStyle")
}}t.options.style=a.call(t,f.fn.qtip.styles[x],t.options.user.style);
t.elements.content.css(q(t.options.style));
if(t.options.content.title.text!==false){t.elements.title.css(q(t.options.style.title,true))
}t.elements.contentWrapper.css({borderColor:t.options.style.border.color});
if(t.options.style.tip.corner!==false){if(f("<canvas>").get(0).getContext){A=t.elements.tooltip.find(".qtip-tip canvas:first");
y=A.get(0).getContext("2d");
y.clearRect(0,0,300,300);
z=A.parent("div[rel]:first").attr("rel");
C=b(z,t.options.style.tip.size.width,t.options.style.tip.size.height);
h.call(t,A,C,t.options.style.tip.color||t.options.style.border.color)
}else{if(f.browser.msie){A=t.elements.tooltip.find('.qtip-tip [nodeName="shape"]');
A.attr("fillcolor",t.options.style.tip.color||t.options.style.border.color)
}}}if(t.options.style.border.radius>0){t.elements.tooltip.find(".qtip-betweenCorners").css({backgroundColor:t.options.style.border.color});
if(f("<canvas>").get(0).getContext){B=g(t.options.style.border.radius);
t.elements.tooltip.find(".qtip-wrapper canvas").each(function(){y=f(this).get(0).getContext("2d");
y.clearRect(0,0,300,300);
z=f(this).parent("div[rel]:first").attr("rel");
r.call(t,f(this),B[z],t.options.style.border.radius,t.options.style.border.color)
})
}else{if(f.browser.msie){t.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function(){f(this).attr("fillcolor",t.options.style.border.color)
})
}}}return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_STYLE_UPDATED,"updateStyle")
},updateContent:function(B,z){var A,y,x;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateContent")
}else{if(!B){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateContent")
}}A=t.beforeContentUpdate.call(t,B);
if(typeof A=="string"){B=A
}else{if(A===false){return
}}if(f.browser.msie){t.elements.contentWrapper.children().css({zoom:"normal"})
}if(B.jquery&&B.length>0){B.clone(true).appendTo(t.elements.content).show()
}else{t.elements.content.html(B)
}y=t.elements.content.find("img[complete=false]");
if(y.length>0){x=0;
y.each(function(D){f('<img src="'+f(this).attr("src")+'" />').load(function(){if(++x==y.length){C()
}})
})
}else{C()
}function C(){t.updateWidth();
if(z!==false){if(t.options.position.type!=="static"){t.updatePosition(t.elements.tooltip.is(":visible"),true)
}if(t.options.style.tip.corner!==false){n.call(t)
}}}t.onContentUpdate.call(t);
return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_CONTENT_UPDATED,"loadContent")
},loadContent:function(x,A,B){var z;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"loadContent")
}z=t.beforeContentLoad.call(t);
if(z===false){return t
}if(B=="post"){f.post(x,A,y)
}else{f.get(x,A,y)
}function y(C){t.onContentLoad.call(t);
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_CONTENT_LOADED,"loadContent");
t.updateContent(C)
}return t
},updateTitle:function(x){if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateTitle")
}else{if(!x){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateTitle")
}}returned=t.beforeTitleUpdate.call(t);
if(returned===false){return t
}if(t.elements.button){t.elements.button=t.elements.button.clone(true)
}t.elements.title.html(x);
if(t.elements.button){t.elements.title.prepend(t.elements.button)
}t.onTitleUpdate.call(t);
return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_TITLE_UPDATED,"updateTitle")
},focus:function(B){var z,y,x,A;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"focus")
}else{if(t.options.position.type=="static"){return f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.CANNOT_FOCUS_STATIC,"focus")
}}z=parseInt(t.elements.tooltip.css("z-index"));
y=6000+f("div.qtip[qtip]").length-1;
if(!t.status.focused&&z!==y){A=t.beforeFocus.call(t,B);
if(A===false){return t
}f("div.qtip[qtip]").not(t.elements.tooltip).each(function(){if(f(this).qtip("api").status.rendered===true){x=parseInt(f(this).css("z-index"));
if(typeof x=="number"&&x>-1){f(this).css({zIndex:parseInt(f(this).css("z-index"))-1})
}f(this).qtip("api").status.focused=false
}});
t.elements.tooltip.css({zIndex:y});
t.status.focused=true;
t.onFocus.call(t,B);
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_FOCUSED,"focus")
}return t
},disable:function(x){if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"disable")
}if(x){if(!t.status.disabled){t.status.disabled=true;
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_DISABLED,"disable")
}else{f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED,"disable")
}}else{if(t.status.disabled){t.status.disabled=false;
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_ENABLED,"disable")
}else{f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED,"disable")
}}return t
},destroy:function(){var x,y,z;
y=t.beforeDestroy.call(t);
if(y===false){return t
}if(t.status.rendered){t.options.show.when.target.unbind("mousemove.qtip",t.updatePosition);
t.options.show.when.target.unbind("mouseout.qtip",t.hide);
t.options.show.when.target.unbind(t.options.show.when.event+".qtip");
t.options.hide.when.target.unbind(t.options.hide.when.event+".qtip");
t.elements.tooltip.unbind(t.options.hide.when.event+".qtip");
t.elements.tooltip.unbind("mouseover.qtip",t.focus);
t.elements.tooltip.remove()
}else{t.options.show.when.target.unbind(t.options.show.when.event+".qtip-create")
}if(typeof t.elements.target.data("qtip")=="object"){z=t.elements.target.data("qtip").interfaces;
if(typeof z=="object"&&z.length>0){for(x=0;
x<z.length-1;
x++){if(z[x].id==t.id){z.splice(x,1)
}}}}delete f.fn.qtip.interfaces[t.id];
if(typeof z=="object"&&z.length>0){t.elements.target.data("qtip").current=z.length-1
}else{t.elements.target.removeData("qtip")
}t.onDestroy.call(t);
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_DESTROYED,"destroy");
return t.elements.target
},getPosition:function(){var x,y;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getPosition")
}x=(t.elements.tooltip.css("display")!=="none")?false:true;
if(x){t.elements.tooltip.css({visiblity:"hidden"}).show()
}y=t.elements.tooltip.offset();
if(x){t.elements.tooltip.css({visiblity:"visible"}).hide()
}return y
},getDimensions:function(){var x,y;
if(!t.status.rendered){return f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getDimensions")
}x=(!t.elements.tooltip.is(":visible"))?true:false;
if(x){t.elements.tooltip.css({visiblity:"hidden"}).show()
}y={height:t.elements.tooltip.outerHeight(),width:t.elements.tooltip.outerWidth()};
if(x){t.elements.tooltip.css({visiblity:"visible"}).hide()
}return y
}})
}function p(){var t,x,v,u,w,z,y;
t=this;
t.beforeRender.call(t);
t.status.rendered=true;
t.elements.tooltip='<div qtip="'+t.id+'" class="qtip '+(t.options.style.classes.tooltip||t.options.style)+'"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:'+t.options.position.type+';">  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">    <div class="qtip-contentWrapper" style="overflow:hidden;">       <div class="qtip-content '+t.options.style.classes.content+'"></div></div></div></div>';
t.elements.tooltip=f(t.elements.tooltip);
t.elements.tooltip.appendTo(t.options.position.container);
t.elements.tooltip.data("qtip",{current:0,interfaces:[t]});
t.elements.wrapper=t.elements.tooltip.children("div:first");
t.elements.contentWrapper=t.elements.wrapper.children("div:first").css({background:t.options.style.background});
t.elements.content=t.elements.contentWrapper.children("div:first").css(q(t.options.style));
if(f.browser.msie){t.elements.wrapper.add(t.elements.content).css({zoom:1})
}if(t.options.hide.when.event=="unfocus"){t.elements.tooltip.attr("unfocus",true)
}if(typeof t.options.style.width.value=="number"){t.updateWidth()
}if(f("<canvas>").get(0).getContext||f.browser.msie){if(t.options.style.border.radius>0){m.call(t)
}else{t.elements.contentWrapper.css({border:t.options.style.border.width+"px solid "+t.options.style.border.color})
}if(t.options.style.tip.corner!==false){e.call(t)
}}else{t.elements.contentWrapper.css({border:t.options.style.border.width+"px solid "+t.options.style.border.color});
t.options.style.border.radius=0;
t.options.style.tip.corner=false;
f.fn.qtip.log.error.call(t,2,f.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED,"render")
}if((typeof t.options.content.text=="string"&&t.options.content.text.length>0)||(t.options.content.text.jquery&&t.options.content.text.length>0)){v=t.options.content.text
}else{if(typeof t.elements.target.attr("title")=="string"&&t.elements.target.attr("title").length>0){v=t.elements.target.attr("title").replace("\\n","<br />");
t.elements.target.attr("title","")
}else{if(typeof t.elements.target.attr("alt")=="string"&&t.elements.target.attr("alt").length>0){v=t.elements.target.attr("alt").replace("\\n","<br />");
t.elements.target.attr("alt","")
}else{v=" ";
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.NO_VALID_CONTENT,"render")
}}}if(t.options.content.title.text!==false){j.call(t)
}t.updateContent(v);
l.call(t);
if(t.options.show.ready===true){t.show()
}if(t.options.content.url!==false){u=t.options.content.url;
w=t.options.content.data;
z=t.options.content.method||"get";
t.loadContent(u,w,z)
}t.onRender.call(t);
f.fn.qtip.log.error.call(t,1,f.fn.qtip.constants.EVENT_RENDERED,"render")
}function m(){var G,A,u,C,y,F,v,H,E,z,x,D,B,t,w;
G=this;
G.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove();
u=G.options.style.border.width;
C=G.options.style.border.radius;
y=G.options.style.border.color||G.options.style.tip.color;
F=g(C);
v={};
for(A in F){v[A]='<div rel="'+A+'" style="'+((A.search(/Left/)!==-1)?"left":"right")+":0; position:absolute; height:"+C+"px; width:"+C+'px; overflow:hidden; line-height:0.1px; font-size:1px">';
if(f("<canvas>").get(0).getContext){v[A]+='<canvas height="'+C+'" width="'+C+'" style="vertical-align: top"></canvas>'
}else{if(f.browser.msie){H=C*2+3;
v[A]+='<v:arc stroked="false" fillcolor="'+y+'" startangle="'+F[A][0]+'" endangle="'+F[A][1]+'" style="width:'+H+"px; height:"+H+"px; margin-top:"+((A.search(/bottom/)!==-1)?-2:-1)+"px; margin-left:"+((A.search(/Right/)!==-1)?F[A][2]-3.5:-1)+'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'
}}v[A]+="</div>"
}E=G.getDimensions().width-(Math.max(u,C)*2);
z='<div class="qtip-betweenCorners" style="height:'+C+"px; width:"+E+"px; overflow:hidden; background-color:"+y+'; line-height:0.1px; font-size:1px;">';
x='<div class="qtip-borderTop" dir="ltr" style="height:'+C+"px; margin-left:"+C+'px; line-height:0.1px; font-size:1px; padding:0;">'+v.topLeft+v.topRight+z;
G.elements.wrapper.prepend(x);
D='<div class="qtip-borderBottom" dir="ltr" style="height:'+C+"px; margin-left:"+C+'px; line-height:0.1px; font-size:1px; padding:0;">'+v.bottomLeft+v.bottomRight+z;
G.elements.wrapper.append(D);
if(f("<canvas>").get(0).getContext){G.elements.wrapper.find("canvas").each(function(){B=F[f(this).parent("[rel]:first").attr("rel")];
r.call(G,f(this),B,C,y)
})
}else{if(f.browser.msie){G.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>')
}}t=Math.max(C,(C+(u-C)));
w=Math.max(u-C,0);
G.elements.contentWrapper.css({border:"0px solid "+y,borderWidth:w+"px "+t+"px"})
}function r(v,x,t,u){var w=v.get(0).getContext("2d");
w.fillStyle=u;
w.beginPath();
w.arc(x[0],x[1],t,0,Math.PI*2,false);
w.fill()
}function e(w){var u,t,y,v,x;
u=this;
if(u.elements.tip!==null){u.elements.tip.remove()
}t=u.options.style.tip.color||u.options.style.border.color;
if(u.options.style.tip.corner===false){return
}else{if(!w){w=u.options.style.tip.corner
}}y=b(w,u.options.style.tip.size.width,u.options.style.tip.size.height);
u.elements.tip='<div class="'+u.options.style.classes.tip+'" dir="ltr" rel="'+w+'" style="position:absolute; height:'+u.options.style.tip.size.height+"px; width:"+u.options.style.tip.size.width+'px; margin:0 auto; line-height:0.1px; font-size:1px;">';
if(f("<canvas>").get(0).getContext){u.elements.tip+='<canvas height="'+u.options.style.tip.size.height+'" width="'+u.options.style.tip.size.width+'"></canvas>'
}else{if(f.browser.msie){v=u.options.style.tip.size.width+","+u.options.style.tip.size.height;
x="m"+y[0][0]+","+y[0][1];
x+=" l"+y[1][0]+","+y[1][1];
x+=" "+y[2][0]+","+y[2][1];
x+=" xe";
u.elements.tip+='<v:shape fillcolor="'+t+'" stroked="false" filled="true" path="'+x+'" coordsize="'+v+'" style="width:'+u.options.style.tip.size.width+"px; height:"+u.options.style.tip.size.height+"px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:"+((w.search(/top/)!==-1)?"bottom":"top")+'"></v:shape>';
u.elements.tip+='<v:image style="behavior:url(#default#VML);"></v:image>';
u.elements.contentWrapper.css("position","relative")
}}u.elements.tooltip.prepend(u.elements.tip+"</div>");
u.elements.tip=u.elements.tooltip.find("."+u.options.style.classes.tip).eq(0);
if(f("<canvas>").get(0).getContext){h.call(u,u.elements.tip.find("canvas:first"),y,t)
}if(w.search(/top/)!==-1&&f.browser.msie&&parseInt(f.browser.version.charAt(0))===6){u.elements.tip.css({marginTop:-4})
}n.call(u,w)
}function h(u,w,t){var v=u.get(0).getContext("2d");
v.fillStyle=t;
v.beginPath();
v.moveTo(w[0][0],w[0][1]);
v.lineTo(w[1][0],w[1][1]);
v.lineTo(w[2][0],w[2][1]);
v.fill()
}function n(v){var u,x,t,y,w;
u=this;
if(u.options.style.tip.corner===false||!u.elements.tip){return
}if(!v){v=u.elements.tip.attr("rel")
}x=positionAdjust=(f.browser.msie)?1:0;
u.elements.tip.css(v.match(/left|right|top|bottom/)[0],0);
if(v.search(/top|bottom/)!==-1){if(f.browser.msie){if(parseInt(f.browser.version.charAt(0))===6){positionAdjust=(v.search(/top/)!==-1)?-3:1
}else{positionAdjust=(v.search(/top/)!==-1)?1:2
}}if(v.search(/Middle/)!==-1){u.elements.tip.css({left:"50%",marginLeft:-(u.options.style.tip.size.width/2)})
}else{if(v.search(/Left/)!==-1){u.elements.tip.css({left:u.options.style.border.radius-x})
}else{if(v.search(/Right/)!==-1){u.elements.tip.css({right:u.options.style.border.radius+x})
}}}if(v.search(/top/)!==-1){u.elements.tip.css({top:-positionAdjust})
}else{u.elements.tip.css({bottom:positionAdjust})
}}else{if(v.search(/left|right/)!==-1){if(f.browser.msie){positionAdjust=(parseInt(f.browser.version.charAt(0))===6)?1:((v.search(/left/)!==-1)?1:2)
}if(v.search(/Middle/)!==-1){u.elements.tip.css({top:"50%",marginTop:-(u.options.style.tip.size.height/2)})
}else{if(v.search(/Top/)!==-1){u.elements.tip.css({top:u.options.style.border.radius-x})
}else{if(v.search(/Bottom/)!==-1){u.elements.tip.css({bottom:u.options.style.border.radius+x})
}}}if(v.search(/left/)!==-1){u.elements.tip.css({left:-positionAdjust})
}else{u.elements.tip.css({right:positionAdjust})
}}}t="padding-"+v.match(/left|right|top|bottom/)[0];
y=u.options.style.tip.size[(t.search(/left|right/)!==-1)?"width":"height"];
u.elements.tooltip.css("padding",0);
u.elements.tooltip.css(t,y);
if(f.browser.msie&&parseInt(f.browser.version.charAt(0))==6){w=parseInt(u.elements.tip.css("margin-top"))||0;
w+=parseInt(u.elements.content.css("margin-top"))||0;
u.elements.tip.css({marginTop:w})
}}function j(){var t=this;
if(t.elements.title!==null){t.elements.title.remove()
}t.elements.title=f('<div class="'+t.options.style.classes.title+'">').css(q(t.options.style.title,true)).css({zoom:(f.browser.msie)?1:0}).prependTo(t.elements.contentWrapper);
if(t.options.content.title.text){t.updateTitle.call(t,t.options.content.title.text)
}if(t.options.content.title.button!==false&&typeof t.options.content.title.button=="string"){t.elements.button=f('<a class="'+t.options.style.classes.button+'" style="float:right; position: relative"></a>').css(q(t.options.style.button,true)).html(t.options.content.title.button).prependTo(t.elements.title).click(function(u){if(!t.status.disabled){t.hide(u)
}})
}}function l(){var u,w,v,t;
u=this;
w=u.options.show.when.target;
v=u.options.hide.when.target;
if(u.options.hide.fixed){v=v.add(u.elements.tooltip)
}if(u.options.hide.when.event=="inactive"){t=["click","dblclick","mousedown","mouseup","mousemove","mouseout","mouseenter","mouseleave","mouseover"];
function z(A){if(u.status.disabled===true){return
}clearTimeout(u.timers.inactive);
u.timers.inactive=setTimeout(function(){f(t).each(function(){v.unbind(this+".qtip-inactive");
u.elements.content.unbind(this+".qtip-inactive")
});
u.hide(A)
},u.options.hide.delay)
}}else{if(u.options.hide.fixed===true){u.elements.tooltip.bind("mouseover.qtip",function(){if(u.status.disabled===true){return
}clearTimeout(u.timers.hide)
})
}}function y(A){if(u.status.disabled===true){return
}if(u.options.hide.when.event=="inactive"){f(t).each(function(){v.bind(this+".qtip-inactive",z);
u.elements.content.bind(this+".qtip-inactive",z)
});
z()
}clearTimeout(u.timers.show);
clearTimeout(u.timers.hide);
u.timers.show=setTimeout(function(){u.show(A)
},u.options.show.delay)
}function x(A){if(u.status.disabled===true){return
}if(u.options.hide.fixed===true&&u.options.hide.when.event.search(/mouse(out|leave)/i)!==-1&&f(A.relatedTarget).parents("div.qtip[qtip]").length>0){A.stopPropagation();
A.preventDefault();
clearTimeout(u.timers.hide);
return false
}clearTimeout(u.timers.show);
clearTimeout(u.timers.hide);
u.elements.tooltip.stop(true,true);
u.timers.hide=setTimeout(function(){u.hide(A)
},u.options.hide.delay)
}if((u.options.show.when.target.add(u.options.hide.when.target).length===1&&u.options.show.when.event==u.options.hide.when.event&&u.options.hide.when.event!=="inactive")||u.options.hide.when.event=="unfocus"){u.cache.toggle=0;
w.bind(u.options.show.when.event+".qtip",function(A){if(u.cache.toggle==0){y(A)
}else{x(A)
}})
}else{w.bind(u.options.show.when.event+".qtip",y);
if(u.options.hide.when.event!=="inactive"){v.bind(u.options.hide.when.event+".qtip",x)
}}if(u.options.position.type.search(/(fixed|absolute)/)!==-1){u.elements.tooltip.bind("mouseover.qtip",u.focus)
}if(u.options.position.target==="mouse"&&u.options.position.type!=="static"){w.bind("mousemove.qtip",function(A){u.cache.mouse={x:A.pageX,y:A.pageY};
if(u.status.disabled===false&&u.options.position.adjust.mouse===true&&u.options.position.type!=="static"&&u.elements.tooltip.css("display")!=="none"){u.updatePosition(A)
}})
}}function o(v,w,B){var A,t,y,z,u,x;
A=this;
if(B.corner=="center"){return w.position
}t=f.extend({},v);
z={x:false,y:false};
u={left:(t.left<f.fn.qtip.cache.screen.scroll.left),right:(t.left+B.dimensions.width+2>=f.fn.qtip.cache.screen.width+f.fn.qtip.cache.screen.scroll.left),top:(t.top<f.fn.qtip.cache.screen.scroll.top),bottom:(t.top+B.dimensions.height+2>=f.fn.qtip.cache.screen.height+f.fn.qtip.cache.screen.scroll.top)};
y={left:(u.left&&(B.corner.search(/right/i)!=-1||(B.corner.search(/right/i)==-1&&!u.right))),right:(u.right&&(B.corner.search(/left/i)!=-1||(B.corner.search(/left/i)==-1&&!u.left))),top:(u.top&&B.corner.search(/top/i)==-1),bottom:(u.bottom&&B.corner.search(/bottom/i)==-1)};
if(y.left){if(A.options.position.target!=="mouse"){t.left=w.position.left+w.dimensions.width
}else{t.left=A.cache.mouse.x
}z.x="Left"
}else{if(y.right){if(A.options.position.target!=="mouse"){t.left=w.position.left-B.dimensions.width
}else{t.left=A.cache.mouse.x-B.dimensions.width
}z.x="Right"
}}if(y.top){if(A.options.position.target!=="mouse"){t.top=w.position.top+w.dimensions.height
}else{t.top=A.cache.mouse.y
}z.y="top"
}else{if(y.bottom){if(A.options.position.target!=="mouse"){t.top=w.position.top-B.dimensions.height
}else{t.top=A.cache.mouse.y-B.dimensions.height
}z.y="bottom"
}}if(t.left<0){t.left=v.left;
z.x=false
}if(t.top<0){t.top=v.top;
z.y=false
}if(A.options.style.tip.corner!==false){t.corner=new String(B.corner);
if(z.x!==false){t.corner=t.corner.replace(/Left|Right|Middle/,z.x)
}if(z.y!==false){t.corner=t.corner.replace(/top|bottom/,z.y)
}if(t.corner!==A.elements.tip.attr("rel")){e.call(A,t.corner)
}}return t
}function q(v,u){var w,t;
w=f.extend(true,{},v);
for(t in w){if(u===true&&t.search(/(tip|classes)/i)!==-1){delete w[t]
}else{if(!u&&t.search(/(width|border|tip|title|classes|user)/i)!==-1){delete w[t]
}}}return w
}function c(t){if(typeof t.tip!=="object"){t.tip={corner:t.tip}
}if(typeof t.tip.size!=="object"){t.tip.size={width:t.tip.size,height:t.tip.size}
}if(typeof t.border!=="object"){t.border={width:t.border}
}if(typeof t.width!=="object"){t.width={value:t.width}
}if(typeof t.width.max=="string"){t.width.max=parseInt(t.width.max.replace(/([0-9]+)/i,"$1"))
}if(typeof t.width.min=="string"){t.width.min=parseInt(t.width.min.replace(/([0-9]+)/i,"$1"))
}if(typeof t.tip.size.x=="number"){t.tip.size.width=t.tip.size.x;
delete t.tip.size.x
}if(typeof t.tip.size.y=="number"){t.tip.size.height=t.tip.size.y;
delete t.tip.size.y
}return t
}function a(){var t,u,v,y,w,x;
t=this;
v=[true,{}];
for(u=0;
u<arguments.length;
u++){v.push(arguments[u])
}y=[f.extend.apply(f,v)];
while(typeof y[0].name=="string"){y.unshift(c(f.fn.qtip.styles[y[0].name]))
}y.unshift(true,{classes:{tooltip:"qtip-"+(arguments[0].name||"defaults")}},f.fn.qtip.styles.defaults);
w=f.extend.apply(f,y);
x=(f.browser.msie)?1:0;
w.tip.size.width+=x;
w.tip.size.height+=x;
if(w.tip.size.width%2>0){w.tip.size.width+=1
}if(w.tip.size.height%2>0){w.tip.size.height+=1
}if(w.tip.corner===true){w.tip.corner=(t.options.position.corner.tooltip==="center")?false:t.options.position.corner.tooltip
}return w
}function b(w,v,u){var t={bottomRight:[[0,0],[v,u],[v,0]],bottomLeft:[[0,0],[v,0],[0,u]],topRight:[[0,u],[v,0],[v,u]],topLeft:[[0,0],[0,u],[v,u]],topMiddle:[[0,u],[v/2,0],[v,u]],bottomMiddle:[[0,0],[v,0],[v/2,u]],rightMiddle:[[0,0],[v,u/2],[0,u]],leftMiddle:[[v,0],[v,u],[0,u/2]]};
t.leftTop=t.bottomRight;
t.rightTop=t.bottomLeft;
t.leftBottom=t.topRight;
t.rightBottom=t.topLeft;
return t[w]
}function g(t){var u;
if(f("<canvas>").get(0).getContext){u={topLeft:[t,t],topRight:[0,t],bottomLeft:[t,0],bottomRight:[0,0]}
}else{if(f.browser.msie){u={topLeft:[-90,90,0],topRight:[-90,90,-t],bottomLeft:[90,270,0],bottomRight:[90,270,-t]}
}}return u
}function k(){var t,u,v;
t=this;
v=t.getDimensions();
u='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:'+v.height+"px; width:"+v.width+'px" />';
t.elements.bgiframe=t.elements.wrapper.prepend(u).children(".qtip-bgiframe:first")
}f(document).ready(function(){f.fn.qtip.cache={screen:{scroll:{left:f(window).scrollLeft(),top:f(window).scrollTop()},width:f(window).width(),height:f(window).height()}};
var t;
f(window).bind("resize scroll",function(u){clearTimeout(t);
t=setTimeout(function(){if(u.type==="scroll"){f.fn.qtip.cache.screen.scroll={left:f(window).scrollLeft(),top:f(window).scrollTop()}
}else{f.fn.qtip.cache.screen.width=f(window).width();
f.fn.qtip.cache.screen.height=f(window).height()
}for(i=0;
i<f.fn.qtip.interfaces.length;
i++){var v=f.fn.qtip.interfaces[i];
if(v.status.rendered===true&&(v.options.position.type!=="static"||v.options.position.adjust.scroll&&u.type==="scroll"||v.options.position.adjust.resize&&u.type==="resize")){v.updatePosition(u,true)
}}},100)
});
f(document).bind("mousedown.qtip",function(u){if(f(u.target).parents("div.qtip").length===0){f(".qtip[unfocus]").each(function(){var v=f(this).qtip("api");
if(f(this).is(":visible")&&!v.status.disabled&&f(u.target).add(v.elements.target).length>1){v.hide(u)
}})
}})
});
f.fn.qtip.interfaces=[];
f.fn.qtip.log={error:function(){return this
}};
f.fn.qtip.constants={};
f.fn.qtip.defaults={content:{prerender:false,text:false,url:false,data:null,title:{text:false,button:false}},position:{target:false,corner:{target:"bottomRight",tooltip:"topLeft"},adjust:{x:0,y:0,mouse:true,screen:false,scroll:true,resize:true},type:"absolute",container:false},show:{when:{target:false,event:"mouseover"},effect:{type:"fade",length:100},delay:140,solo:false,ready:false},hide:{when:{target:false,event:"mouseout"},effect:{type:"fade",length:100},delay:0,fixed:false},api:{beforeRender:function(){},onRender:function(){},beforePositionUpdate:function(){},onPositionUpdate:function(){},beforeShow:function(){},onShow:function(){},beforeHide:function(){},onHide:function(){},beforeContentUpdate:function(){},onContentUpdate:function(){},beforeContentLoad:function(){},onContentLoad:function(){},beforeTitleUpdate:function(){},onTitleUpdate:function(){},beforeDestroy:function(){},onDestroy:function(){},beforeFocus:function(){},onFocus:function(){}}};
f.fn.qtip.styles={defaults:{background:"white",color:"#111",overflow:"hidden",textAlign:"left",width:{min:0,max:250},padding:"5px 9px",border:{width:1,radius:0,color:"#d3d3d3"},tip:{corner:false,color:false,size:{width:13,height:13},opacity:1},title:{background:"#e1e1e1",fontWeight:"bold",padding:"7px 12px"},button:{cursor:"pointer"},classes:{target:"",tip:"qtip-tip",title:"qtip-title",button:"qtip-button",content:"qtip-content",active:"qtip-active"}},cream:{border:{width:3,radius:0,color:"#F9E98E"},title:{background:"#F0DE7D",color:"#A27D35"},background:"#FBF7AA",color:"#A27D35",classes:{tooltip:"qtip-cream"}},light:{border:{width:3,radius:0,color:"#E2E2E2"},title:{background:"#f1f1f1",color:"#454545"},background:"white",color:"#454545",classes:{tooltip:"qtip-light"}},dark:{border:{width:3,radius:0,color:"#303030"},title:{background:"#404040",color:"#f3f3f3"},background:"#505050",color:"#f3f3f3",classes:{tooltip:"qtip-dark"}},red:{border:{width:3,radius:0,color:"#CE6F6F"},title:{background:"#f28279",color:"#9C2F2F"},background:"#F79992",color:"#9C2F2F",classes:{tooltip:"qtip-red"}},green:{border:{width:3,radius:0,color:"#A9DB66"},title:{background:"#b9db8c",color:"#58792E"},background:"#CDE6AC",color:"#58792E",classes:{tooltip:"qtip-green"}},blue:{border:{width:3,radius:0,color:"#ADD9ED"},title:{background:"#D0E9F5",color:"#5E99BD"},background:"#E5F6FE",color:"#4D9FBF",classes:{tooltip:"qtip-blue"}}}
})(jQuery);
(function(a){a.fn.upprev=function(c){function b(){var e=0;
if(typeof(window.pageYOffset)=="number"){e=window.pageYOffset
}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){e=document.body.scrollTop
}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){e=document.documentElement.scrollTop
}}}return e
}var d={};
var c=a.extend(d,c);
return this.each(function(){var e=false;
var f=true;
a(window).scroll(function(){var g=b()+a(window).height()>=a(document).height()*55/100;
if(g&&!e){a("#upprev_box").stop().animate({right:"0px"});
f=false
}else{if(e&&b()==0){e=false
}else{if(!f){f=true;
a("#upprev_box").stop().animate({right:"-400px"})
}}}});
a("#upprev_close").click(function(){a("#upprev_box").stop().animate({right:"-400px"});
e=true;
f=true
})
})
}
})(jQuery);
(function(a){a.fn.playOverlay=function(c,e){function d(g,h){a(g).append('<iframe class="video-player" type="text/html" width="'+h.width+'" height="'+h.height+'" src="'+h.src+'&amp;wmode=opaque" frameborder="0"></iframe>')
}function b(g,h){a(g).append('<object id="myExperience'+h.src+'" name="myExperience'+h.src+'" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="'+h.width+'" /><param name="height" value="'+h.height+'" /><param name="playerID" value="1140772469001" /><param name="playerKey" value="AQ~~%2CAAAAAAEDRq0~%2CqRcfDOX2mNtWW87VePrJiaFRXUo43tGn" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="autoStart" value="'+c+'" /><param name="@videoPlayer" value="'+h.src+'" /><param name="wmode" value="opaque" /><param name="includeAPI" value="true"/> <!-- include the SMART player API --><param name="templateLoadHandler" value="dailybeast.video.onPlayerLoaded"/> <!-- onPlayerLoaded is the hook for the Javascript Omniture tracker  --></object>')
}function f(g,h){a(g).append('<object class="video-player" width="'+h.width+'" height="'+h.height+'"><param name="movie" value="'+h.src+'"/><param name="width" value="'+h.width+'" /><param name="allowFullScreen" value="true"/><embed src="'+h.src+'" type="application/x-shockwave-flash" width="'+h.width+'" height="'+h.height+'" allowFullScreen="true"></embed></object>')
}return this.each(function(){a(this).click(function(h){h.preventDefault();
if(a(this).find("object, iframe").length>0){return false
}var j=a.parseJSON(a(this).attr("data-video"));
if(j.ignore&&!e){return false
}if(j.type=="brightcove"){b(this,j);
brightcove.createExperiences()
}else{if(j.type=="youtube"){var k=j.src.split("v=")[1];
if(k==undefined){k=j.src.split("/v/")[1]
}var g=k.indexOf("&");
if(g!=-1){k=k.substring(0,g)
}j.src="http://www.youtube.com/embed/"+k+"?fs=1"+(c?"&autoplay=1":"");
d(this,j)
}else{if(j.type=="vimeo"){j.src="http://player.vimeo.com/video/"+j.src.replace("http://vimeo.com/","")+(c?"?autoplay=true":"");
d(this,j)
}else{if(j.type=="hulu"){f(this,j)
}}}}a(this).find(".video-details, img, a").hide()
})
})
}
})(jQuery);
(function(b){b.fn.slides=function(c){c=b.extend({},b.fn.slides.option,c);
return this.each(function(){b("."+c.container,b(this)).children().wrapAll('<div class="slides_control"/>');
var y=b(this),l=b(".slides_control",y),C=l.children().size(),t=l.children().outerWidth(),o=l.children().outerHeight(),e=c.start-1,n=c.effect.indexOf(",")<0?c.effect:c.effect.replace(" ","").split(",")[0],v=c.effect.indexOf(",")<0?n:c.effect.replace(" ","").split(",")[1],q=0,p=0,d=0,r=0,x,j,k,A,z,w,m,g;
function f(F,E,D){if(!j&&x){j=true;
c.animationStart(r+1);
switch(F){case"next":p=r;
q=r+1;
q=C===q?0:q;
A=t*2;
F=-t*2;
r=q;
break;
case"prev":p=r;
q=r-1;
q=q===-1?C-1:q;
A=0;
F=0;
r=q;
break;
case"pagination":q=parseInt(D,10);
p=b("."+c.paginationClass+" li."+c.currentClass+" a",y).attr("href").match("[^#/]+$");
if(q>p){A=t*2;
F=-t*2
}else{A=0;
F=0
}r=q;
break
}if(E==="fade"){if(c.crossfade){l.children(":eq("+q+")",y).css({zIndex:10}).fadeIn(c.fadeSpeed,c.fadeEasing,function(){if(c.autoHeight){l.animate({height:l.children(":eq("+q+")",y).outerHeight()},c.autoHeightSpeed,function(){l.children(":eq("+p+")",y).css({display:"none",zIndex:0});
l.children(":eq("+q+")",y).css({zIndex:0});
c.animationComplete(q+1);
j=false
})
}else{l.children(":eq("+p+")",y).css({display:"none",zIndex:0});
l.children(":eq("+q+")",y).css({zIndex:0});
c.animationComplete(q+1);
j=false
}})
}else{l.children(":eq("+p+")",y).fadeOut(c.fadeSpeed,c.fadeEasing,function(){if(c.autoHeight){l.animate({height:l.children(":eq("+q+")",y).outerHeight()},c.autoHeightSpeed,function(){l.children(":eq("+q+")",y).fadeIn(c.fadeSpeed,c.fadeEasing)
})
}else{l.children(":eq("+q+")",y).fadeIn(c.fadeSpeed,c.fadeEasing,function(){if(b.browser.msie){b(this).get(0).style.removeAttribute("filter")
}})
}c.animationComplete(q+1);
j=false
})
}}else{l.children(":eq("+q+")").css({left:A,display:"block"});
if(c.autoHeight){l.animate({left:F,height:l.children(":eq("+q+")").outerHeight()},c.slideSpeed,c.slideEasing,function(){l.css({left:-t});
l.children(":eq("+q+")").css({left:t,zIndex:5});
l.children(":eq("+p+")").css({left:t,display:"none",zIndex:0});
c.animationComplete(q+1);
j=false
})
}else{l.animate({left:F},c.slideSpeed,c.slideEasing,function(){l.css({left:-t});
l.children(":eq("+q+")").css({left:t,zIndex:5});
l.children(":eq("+p+")").css({left:t,display:"none",zIndex:0});
c.animationComplete(q+1);
j=false
})
}}if(c.pagination){b("."+c.paginationClass+" li."+c.currentClass,y).removeClass(c.currentClass);
b("."+c.paginationClass+" li:eq("+q+")",y).addClass(c.currentClass)
}}}function u(){clearInterval(y.data("interval"))
}function h(){if(c.pause){clearTimeout(y.data("pause"));
clearInterval(y.data("interval"));
m=setTimeout(function(){clearTimeout(y.data("pause"));
g=setInterval(function(){f("next",n)
},c.play);
y.data("interval",g)
},c.pause);
y.data("pause",m)
}else{u()
}}if(C<2){return
}if(e<0){e=0
}if(e>C){e=C-1
}if(c.start){r=e
}if(c.randomize){l.randomize()
}b("."+c.container,y).css({overflow:"hidden",position:"relative"});
l.children().css({position:"absolute",top:0,left:l.children().outerWidth(),zIndex:0,display:"none"});
l.css({position:"relative",width:(t*3),height:o,left:-t});
b("."+c.container,y).css({display:"block"});
if(c.autoHeight){l.children().css({height:"auto"});
l.animate({height:l.children(":eq("+e+")").outerHeight()},c.autoHeightSpeed)
}if(c.preload&&l.find("img:eq("+e+")").length){b("."+c.container,y).css({background:"url("+c.preloadImage+") no-repeat 50% 50%"});
var B=l.find("img:eq("+e+")").attr("src")+"?"+(new Date()).getTime();
if(b("img",y).parent().attr("class")!="slides_control"){w=l.children(":eq(0)")[0].tagName.toLowerCase()
}else{w=l.find("img:eq("+e+")")
}l.find("img:eq("+e+")").attr("src",B).load(function(){l.find(w+":eq("+e+")").fadeIn(c.fadeSpeed,c.fadeEasing,function(){b(this).css({zIndex:5});
b("."+c.container,y).css({background:""});
x=true;
c.slidesLoaded()
})
})
}else{l.children(":eq("+e+")").fadeIn(c.fadeSpeed,c.fadeEasing,function(){x=true;
c.slidesLoaded()
})
}if(c.bigTarget){l.children().css({cursor:"pointer"});
l.children().click(function(){f("next",n);
return false
})
}if(c.hoverPause&&c.play){l.bind("mouseover",function(){u()
});
l.bind("mouseleave",function(){h()
})
}if(c.generateNextPrev){b("."+c.container,y).after('<a href="#" class="'+c.prev+'">Prev</a>');
b("."+c.prev,y).after('<a href="#" class="'+c.next+'">Next</a>')
}b("."+c.next,y).click(function(D){D.preventDefault();
a();
if(c.play){h()
}f("next",n)
});
b("."+c.prev,y).click(function(D){D.preventDefault();
a();
if(c.play){h()
}f("prev",n)
});
if(c.generatePagination){if(c.prependPagination){y.prepend("<ul class="+c.paginationClass+"></ul>")
}else{y.append("<ul class="+c.paginationClass+"></ul>")
}l.children().each(function(){b("."+c.paginationClass,y).append('<li><a href="#'+d+'">'+(d+1)+"</a></li>");
d++
})
}else{b("."+c.paginationClass+" li a",y).each(function(){b(this).attr("href","#"+d);
d++
})
}b("."+c.paginationClass+" li:eq("+e+")",y).addClass(c.currentClass);
b("."+c.paginationClass+" li a",y).click(function(){a();
if(c.play){h()
}k=b(this).attr("href").match("[^#/]+$");
if(r!=k){f("pagination",v,k)
}return false
});
b("a.link",y).click(function(){a();
if(c.play){h()
}k=b(this).attr("href").match("[^#/]+$")-1;
if(r!=k){f("pagination",v,k)
}return false
});
if(c.play){g=setInterval(function(){f("next",n)
},c.play);
y.data("interval",g)
}})
};
function a(){var e=b("object[class='BrightcoveExperience']").attr("id");
if(e==undefined){return
}var c=brightcove.api.getExperience(e);
if(c==undefined){return
}var d=c.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
d.pause(true)
}b.fn.slides.option={preload:false,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:false,next:"next",prev:"prev",pagination:true,generatePagination:true,prependPagination:false,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:false,randomize:false,play:0,pause:0,hoverPause:false,autoHeight:true,autoHeightSpeed:350,bigTarget:false,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}};
b.fn.randomize=function(d){function c(){return(Math.round(Math.random())-0.5)
}return(b(this).each(function(){var g=b(this);
var f=g.children();
var e=f.length;
if(e>1){f.hide();
var h=[];
for(i=0;
i<e;
i++){h[h.length]=i
}h=h.sort(c);
b.each(h,function(m,l){var o=f.eq(l);
var n=o.clone(true);
n.show().appendTo(g);
if(d!==undefined){d(o,n)
}o.remove()
})
}}))
}
})(jQuery);
(function(a){a.fn.verticalAlign=function(b){var c={offset:0,position:"top",percentage:"50%"};
if(b){a.extend(c,b)
}return this.each(function(e){var f=a(this).height();
var g=a(this).outerHeight();
var d=(f+(g-f))/2;
a(this).css("margin-top",((c.position=="top")?"-":"")+(d+c.offset)+"px");
a(this).css("top",c.percentage);
a(this).css("position","absolute")
})
}
})(jQuery);
$.widget("ui.floattip",{options:{stage:{element:null,paddingX:15,paddingY:15},tip:{element:null,paddingX:20,paddingY:20}},destroy:function(){$.widget.prototype.apply(this,arguments)
},_create:function(){this.tip=$(this.element).find(this.options.tip.element);
this.bindHover()
},bindHover:function(){var b=this;
var a=$(this.element);
var c=this.tip;
a.bind("mousemove",function(e){var d=b.calculatePosition(e);
c.css(d);
c.show()
});
a.bind("mouseout",function(d){c.hide()
})
},calculatePosition:function(a){var k=$(this.element);
var h={};
var e=this.options.tip.paddingX;
var c=this.options.tip.paddingY;
var d=k.offset();
h.left=a.pageX-d.left+e;
h.top=a.pageY-d.top+c;
if(this.options.stage.element){var j=$(this.options.stage.element);
var g=this.tip;
var b=j.offset();
if((a.pageX-b.left)+g.width()+e+this.options.stage.paddingX>j.width()){h.left=h.left-(3*e)-g.width()
}if((a.pageY-b.top)+g.height()+c+this.options.stage.paddingY>j.height()){h.top=h.top-(2*c)-g.height()
}}for(var f in h){h[f]=h[f]+"px"
}return h
}});
(function(a){a.fn.spin=function(d,c){var b={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}};
if(Spinner){return this.each(function(){var f=a(this),e=f.data();
if(e.spinner){e.spinner.stop();
delete e.spinner
}if(d!==false){if(typeof d==="string"){if(d in b){d=b[d]
}else{d={}
}if(c){d.color=c
}}if(a.browser.msie&&(a.browser.version==7||a.browser.version==8)){e.spinner=null
}else{e.spinner=new Spinner(a.extend({color:f.css("color")},d)).spin(this)
}}})
}else{}}
})(jQuery);
var dailybeast=dailybeast||{};
dailybeast.wrapstream=function(){var a="";
function c(){a=$(".stream");
$(".timeago").timeago();
$("[data-video]").once("data-video",function(){$(this).playOverlay(true)
});
$("#wrap-page .overlay").once("overlay",function(){$(this).verticalAlign()
});
$(".stream-gallery").once("stream-gallery",function(){$(this).slides({play:0,slideSpeed:500,pause:2500,hoverPause:true,generatePagination:false});
$(this).find(".next").show();
$(this).find(".prev").show()
});
$("#wrap-page a.expand-collapse").click(function(){var d=$(this);
var e=d.siblings("a.more");
d.parent().siblings(".stream-read-more").slideToggle("slow",function(){b(d,e)
});
return false
});
$("#wrap-page a.arrowright").click(function(){var d=$(this).html();
trackReadMoreCollapseClick(d,$(this))
})
}function b(e,g){var f=e.html();
var d=e.data("expanded");
if(d||d===undefined){e.html("Collapse");
e.removeClass("arrowdown");
e.addClass("arrowup");
e.data("expanded",false);
g.show()
}else{e.html("Read More");
e.removeClass("arrowup");
e.addClass("arrowdown");
e.data("expanded",true);
g.hide()
}trackReadMoreCollapseClick(f,g)
}return{init:c}
}();
$.priorityQ.windowReady.add("Attaching Wrap Galleries",$.priorityQ.NORMAL,function(){dailybeast.wrapstream.init()
});
var isAppleDevice=navigator.userAgent.match(/(iPad|iPhone|iPod)/i)!=null;
var isMacWebKit=$.browser.webkit&&(navigator.userAgent.match(/Mac OS/i)!=null);
var isStreamOn=$("#home-page .videoBlock header").attr("stream")=="true";
if(!isAppleDevice&&isStreamOn){$("#home-page .video-container.video").hide();
$("#home-page .video-container.stream").show()
}$.priorityQ.domReady.add("Misc handlers",$.priorityQ.WHENEVER,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("article[data-slideshow]").each(function(){var F=$.parseJSON($(this).attr("data-slideshow"));
if(_.hasValue(F.interstitials)){F.interstitials=F.interstitials.split(",");
_.each(F.interstitials,function(I,H){try{F.interstitials[H]=parseInt(F.interstitials[H])
}catch(G){F.interstitials=[3]
}})
}$(this).gallery({url:F.url,enableAutoPlay:false,display:F.display||"standard",interstitials:F.interstitials,containers:{slide:$(this).find("div.gallery-slide"),viewAll:$("div.slide-view-all"),interstitial:$("div.slide-interstitial")},elements:{next:$(this).find("a.gallery-nav-button-next, img.gallery-slide-image"),previous:$(this).find("a.gallery-nav-button-previous"),index:$(this).find(".gallery-nav-index"),title:$(this).find("h2.gallery-slide-heading"),description:$(this).find(".gallery-slide-copy"),byline:$(this).find(".gallery-slide-photo-credit")},updated:function(G,H){dailybeast.analytics.trackPageview({pageNum:H.index});
dailybeast.advertising.refresh()
},interstitialed:function(G,H){dailybeast.advertising.refresh()
}})
})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("div[data-slider]").each(function(){var F=$.parseJSON($(this).attr("data-slider"));
var G=true;
$(this).featureslider({circular:true,autoplay:true,interval:7500,containers:{tooltip:".tooltip"},elements:{slider:".featureSlider-slider",items:".featureSlider-slides",next:".featureSlider-next",prev:".featureSlider-previous",pause:".featureSlider-pause",play:".featureSlider-play",navigator:".featureSlider-pagination",tipTitle:".tooltip h2 a",tipText:".tooltip p"}})
});
var j=$(".featureSlider-navigation");
var z=$(".toolTip");
$(".featureSlider-pagination a").live("mouseover mouseout",function(H){if((document.all&&!window.opera&&window.XMLHttpRequest)?true:false){$("#main > div[class=grid-4]").css("position","static")
}if(H.type=="mouseover"&&!$(H.target).closest("li").hasClass("active")){var G=$(this).closest("li");
var F=$("div[data-slider]").featureslider("getState").slides[G.index()];
z.find("h2").text(F.title);
z.find("p").text(F.text);
var J=G.position().left;
J+=G.parent().position().left;
var I=j.position().top-z.outerHeight();
z.css({left:J-(z.outerWidth()/2)+(G.outerWidth())+"px",top:I+"px",display:"block"})
}else{z.css({display:"none"})
}})
}var v=$("#storyFeature");
if(v.length==1){var b=$("ul li",v);
var d=$("#storyFeatureImage",v);
b.mouseenter(function(){b.removeClass("on");
$(this).addClass("on");
var G=$(".photo",this).clone();
var F=$(".photoCredit",this).clone();
d.empty().append(G).append(F)
})
}if($("#video-page").length>0){dailybeast.videopage.init();
$(window).resize(function(){dailybeast.videopage.positionNextPreviousImage()
})
}if($("#videos-page").length>0){dailybeast.videopage.positionNextPreviousImage();
$(window).resize(function(){dailybeast.videopage.positionNextPreviousImage()
})
}$("[placeholder]").textPlaceholder();
var g=$("[data-featureAd]");
if(g.length==1&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){var D=$.parseJSON(g.attr("data-featureAd"));
if(D.delay!==undefined){setTimeout(function(){g.hide();
g.next(".featureBlock").fadeIn("slow")
},D.delay*1000)
}}var l=function(){if(!($(".adMark").length)&&$(".center-col .ad").height()>16){$(".center-col").before('<div class="adMark">Advertisement</div>');
$(".center-col").css("background-color","#EFEFEF")
}};
if(!$.browser.msie||($.browser.msie&&$.browser.version=="9.0")){$(".center-col .ad").bind("DOMNodeInserted",function(F){l()
})
}else{setTimeout(function(){l()
},500)
}if($("body").attr("id")!="videos-page"){$("[data-video]").playOverlay(true)
}if(isAppleDevice){$("[data-video]").click()
}if((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive")){$(".gallery-item").bind("mousemove",function(){$(this).closest(".galleries").find(".gallery-item img").css("opacity",0.5);
$(this).find("img").css("opacity",1)
});
$(".galleries-logo").bind("mousemove",function(){$(this).closest(".galleries").find(".gallery-item img").css("opacity",1)
});
$(".galleries").bind("mouseenter",function(F){$(this).find("img").css("opacity",0.5)
});
$(".galleries").bind("mouseleave",function(){$(this).find("img").css("opacity",1)
});
$(".galleries img").each(function(){$(this).removeAttr("title")
});
$(".gallery-item").floattip({tip:{element:".float-tip",paddingX:20,paddingY:20},stage:{element:".galleries"}});
$(".gallery-item a").click(function(F){if($(this).attr("href")=="#"){F.preventDefault();
window.location.href="/404"
}})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive"))){$(".features").slides({play:0,pause:2500,hoverPause:true,generatePagination:false,container:"features-container",next:"features-next",prev:"features-previous"})
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&(dailybeast.metatags.getTemplate()=="home")){$("#home-page .contributors").slides({play:0,pause:2500,hoverPause:true,container:"contributors-container",paginationClass:"pagination",next:"pagination-next",prev:"pagination-previous",autoHeight:true});
$("#home-page .contributors").each(function(){$(this).find(".pagination").wrap('<span class="inner"></span>');
var F=$(this).find(".inner");
$(this).find(".pagination-previous").prependTo(F);
$(this).find(".pagination-next").appendTo(F);
F.wrap('<div class="wrapper"></div>')
});
$("#home-page .photoslider, #interactive-page .photoslider").slides({play:0,pause:2500,hoverPause:true,generatePagination:false,container:"photoslider-container",animationStart:function(){$("#home-page .heading-container").hide()
},animationComplete:function(){$("#home-page .heading-container").each(function(){$(this).verticalAlign($(this).data());
$(this).fadeIn()
})
},slidesLoaded:function(){}});
var r=false;
function q(){if(!r){$("#home-page .heading-container").each(function(){$(this).verticalAlign($(this).data());
$(this).fadeIn()
});
r=true
}}$(window).load(function(){q()
});
window.setTimeout(function(){q()
},15000);
var m=$("#home-page .contributors .inner");
var B=$("#home-page .contributors").width();
m.css("left",(B/2-m.width()/2)-10)
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&(dailybeast.metatags.getTemplate()=="wrap")){var C=$(".switcher .scrollable");
var w=$(".switcher .slide:not(.cloned)");
var f=$(".switcher .slide").width();
function t(F,G){F.find("[data-video]").playOverlay(true,true);
F.find(".heading-container, .title, .switcher-overlay").fadeIn();
F.find("img").not(".switcher-overlay").animate({opacity:1},100);
if(isAppleDevice){F.find("[data-video]").click();
F.mouseover(function(){if(F.find("iframe, object")){F.find(".title").hide()
}})
}F.find("[data-video]").click(function(){F.find(".title").hide()
});
F.find(".title").show()
}function u(F,I,G,H){F.find(".heading-container, .title, .switcher-overlay").fadeOut(100);
F.find("[data-video]").find("iframe, object").remove();
F.find("img").not(".switcher-overlay").animate({opacity:0.3},100).fadeIn();
F.find(".data-video-processed a").not(".switcher-overlay").fadeIn();
if(F.hasClass("ad")){h(F,I,G,H)
}}function h(F,I,G,H){if(F.hasClass("ad")&&F.width()>3){y=G;
F.animate({opacity:0})
}}var a;
var y=0;
C.scrollable({circular:true,onSeek:function(G,F){if(!a){a=$(this.getItems()[0])
}if(y<F){u(a,G,F,"toRight")
}else{u(a,G,F)
}a=$(this.getItems()[F]);
t(a,F);
y=F
},onBeforeSeek:function(H,G){var F=$(this.getItems()[G]);
if(F.hasClass("ad")){if(F.find("[data-advertising]").children().length>0){F.animate({opacity:1},400)
}else{H.preventDefault();
C.scrollable().seekTo(G+(y<G?1:-1))
}}if(y<G){h(F.prev(),H,G)
}else{h(F.next(),H,G)
}}});
if(w.size()>1){w.not(".ad").slice(1,2).clone().addClass("cloned").appendTo(".switcher .items");
w.not(".ad").slice(w.size()-2,w.size()-1).clone().addClass("cloned").prependTo(".switcher .items");
$(".switcher .items").css("left",(-$(w[0]).position().left));
if(!($.browser.msie&&$.browser.version=="7.0")){C.navigator()
}$(".switcher .browse-link").show()
}t($(w[0]));
if($.browser.msie&&$.browser.version=="7.0"){$(".switcher-wrapper .title").css("bottom","60px")
}var c=$(".switcher .navi");
c.css("left",c.parent().width()/2-c.width()/2-5);
$(".switcher-wrapper").css("visibility","visible")
}$("#home-page .featureSlider-next").attr("data-track","{'title':'topbox-next'}");
$("#home-page .featureSlider-previous").attr("data-track","{'title':'topbox-prev'}");
$("#home-page .featureSlider-pause").attr("data-track","{'title':'topbox-pause'}");
$("#home-page .bottom .image.section a").each(function(){$(this).attr("data-track","{'title':'"+$(this).find("img").attr("title")+"'}")
});
$(".subscriptionheader a").attr("data-track","{'title':'trial-issues'}");
$(".beast-tv").parent("a").attr("data-track","{'title':'beasttv-logo'}");
var o=(function(G){var F=$(".slides_control",$(".video-feature-container")).children(":eq("+G+")");
F.playOverlay(true);
if(isAppleDevice){F.click();
F.find("img").hide();
F.mouseover(function(){F.find(".video-details").hide()
})
}else{F.find(".overlay").verticalAlign({offset:(F.find(".video-details").height()/2)});
F.find(".overlay").fadeIn()
}F.find(".video-details, a").show()
});
var p=false;
$(".video-feature-container").slides({play:0,pause:2500,hoverPause:true,container:"slides",generatePagination:false,paginationClass:"slider-pagination",prev:"previous",next:"next",autoHeight:true,animationStart:function(){var F=$(".video-feature-container div[data-video]:visible");
F.find(".video-details, a").show();
F.find("img").show();
F.find("iframe, object").remove();
$(".video-image-next img").hide();
$(".video-image-previous img").hide();
$(".video-feature-container").find("img.overlay").hide()
},animationComplete:function(H){if(!p){var G=$(".slides_control",$(".video-feature-container"));
if(G.children().size()>=4){var F=$(".video-image-next");
var I=$(".video-image-previous");
F.css("background-image",G.children(":eq("+(G.children().size()===H?0:H)+")").find(".video-details").data("src"));
I.css("background-image",G.children(":eq("+(H==1?G.children().size()-1:H-2)+")").find(".video-details").data("src"));
F.fadeIn();
I.fadeIn()
}G.children(":eq("+(H-1)+")").find("img, .video-details").show()
}o((H-1))
},slidesLoaded:function(){$(".slider-pagination").show();
o(0)
}}).bind("adEnabled",function(){p=true
});
$("div.video-filter ul.filter li a").live("click",function(G){G.preventDefault();
$("div.video-filter a.selected").each(function(){$(this).attr("class","");
$(this).find("span").remove()
});
$(this).attr("class","selected");
$(this).append(" <span>&nbsp;&nbsp;</span>");
var F=$("#video-explorer-grid");
F.children().remove();
F.spin("large");
F.load($(this).data("search-src"));
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames){if($(this).data("hash").length>0){window.location.hash=$(this).attr("data-hash");
window.scrollTo(0,$("#video-explorer").offset().top)
}}});
$("#video-explorer-grid ul.pagination li a").live("click",function(G){G.preventDefault();
var F=$("#video-explorer-grid");
F.children().remove();
F.spin("large");
F.load($(this).data("search-src"));
$("#video-explorer-grid").load($(this).data("search-src"));
window.scrollTo(0,$("#video-explorer").offset().top)
});
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&!dailybeast.modes.isUsingFrames&&dailybeast.metatags.getTemplate()=="videos"&&window.location.hash.length>0){var x=function(H){var G=$('div.video-filter ul.filter li a[data-hash="'+H.replace("#","")+'"]');
if(G.length>0){G.attr("class","selected");
G.append(" <span>&nbsp;&nbsp;</span>");
var F=$("#video-explorer-grid");
if(F.length>0){F.spin("large");
F.load(G.data("search-src"));
F.load(G.data("search-src"));
$("body,html").animate({scrollTop:$("#video-explorer").offset().top},{duration:"slow",easing:"swing"});
$("#video-explorer").focus()
}}};
x(window.location.hash)
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$(".contributors-auto").slides({play:0,pause:2500,hoverPause:true,container:"slide-container",next:"pagination-next",prev:"pagination-previous",paginationClass:"pagination",generateNextPrev:true,slidesLoaded:function(){var F=0;
$(".contributors-auto .slide").each(function(){if($(this).find("a.active").length>0){$(".contributors-auto .pagination li:eq("+F+") a").delay(5000).click()
}F++
})
}});
$(".contributors-auto").find(".pagination").wrap('<div class="pagination-wrap clearfix"></div>');
$(".contributors-auto").find(".pagination-previous").prependTo(".pagination-wrap");
$(".contributors-auto").find(".pagination-next").appendTo(".pagination-wrap")
}var A;
function E(H){var G=$("#videoOverlay");
if(!G.length){G=$('<div id="videoOverlay"><div class="videoWrapper"></div></div>').appendTo("body");
$('<header><a class="overlayVideos" href="javascript: window.location.href = dailybeast.links.beastTv + \'.html\'"><div class="beast-tv"></div></a></header>').insertBefore(".videoWrapper")
}G.overlay({top:"center",speed:"fast",load:true,onClose:function(){F();
G.removeData("overlay");
G.find(".videoWrapper").html("")
},mask:{color:"#000",loadSpeed:0,closeSpeed:0,opacity:0.5}});
G.find(".videoWrapper").load(H.replace(".html",".videooverlay.html"),function(J,I){if(I=="error"){window.location.href="/404";
return
}$("#videoOverlay .videoOverlayList").jScrollPane({animateTo:true,animateStep:10,animateInterval:10});
A=$(".videoOverlayList li").first().addClass("current");
dailybeast.video.addVideoEventListener(k);
$(".videoOverlayList li").click(function(K){K.preventDefault();
F();
$(".videoOverlayList li").removeClass("current");
n(A=$(this).addClass("current"))
});
$("#videoOverlay .videoWrapper").css("background-image","none");
e()
});
window.onorientationchange=function(){var J=jQuery(window).height();
var I=$("#videoOverlay").height();
$("#videoOverlay").css("top",((J/2)-(I/2))-40)
};
function F(){var I=$('object[class="BrightcoveExperience"]');
if(I){var K=I.attr("id");
if(K){var J=dailybeast.video.getOmnitureTracker(K);
if(J){J.stopVideoTracker()
}}}}}function k(G){var F=G.type;
if(F=="mediaComplete"||(dailybeast.video.ytAPIReady&&G.data==YT.PlayerState.ENDED)){$(".videoOverlayList li").removeClass("current");
A=A.next().addClass("current");
if(A.length==0){$(".videoOverlayList li:first-child").click()
}else{n(A)
}setTimeout(function(){$(".videoOverlayList")[0].scrollTo($(".videoOverlayList .current").position().top)
},2000)
}}function n(F){var G=F.find("a").attr("href").replace(".html",".videooverlayplayer.html");
$("#videoOverlay .left").empty().load(G,e)
}function e(){dailybeast.advertising.init("#videoOverlay");
dailybeast.advertising.display("#videoOverlay");
dailybeast.loadSocialTools()
}if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$('#featureSlider a[href*="/videos/"],#home-page .video-container a[href*="/videos/"],#home-page .grid-7 a[href*="/videos/"],#home-page a.tout[href*="/videos/"],.video-container a[href*="/videos/"],.video-block-list a[href*="/videos/"],#layout2-page .hVideoList a[href*="/videos/"],#layout5-page .hVideoList a[href*="/videos/"],#layout3-page .secondaryRiver a[href*="/videos/"],#layout1-page .secondaryRiver a[href*="/videos/"],#layout1-page .mediaBoxout a[href*="/videos/"]').click(function(F){F.preventDefault();
E($(this).attr("href"))
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
$.priorityQ.domReady.add("Analtyics - Google Plus Button",$.priorityQ.IMPORTANT,function(){window.plusClick=function a(b){var c="GOOGLEPLUS";
if(b.state=="off"){c="GOOGLEMINUS"
}dailybeast.analytics.trackSharetoolClick(c,b.href)
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
if((dailybeast.metatags.getTemplate()=="home")||(dailybeast.metatags.getTemplate()=="interactive")){$.priorityQ.domReady.add("Home Page War Module",$.priorityQ.IMPORTANT,function(){dailybeast.warmodule=dailybeast.warmodule||function(){var a={};
dailybeast.warmodule_openHandler=dailybeast.warmodule_openHandler||function(){a.breakingVideo.show();
a.videoContainer.html(a.videoHTML);
if(a.videoContainer.data("playerType")=="brightcove"){brightcove.createExperiences()
}a.breakingVideoClosed.hide()
};
dailybeast.warmodule_closeHandler=dailybeast.warmodule_closeHandler||function(){a.breakingVideoClosed.show();
a.breakingVideo.hide();
a.videoContainer.html("")
};
a._openModule=function(){$.log("Opening war module");
$.cookie("breaking-video","open",{expires:1});
var b=dailybeast.warmodule_openHandler;
if(b){b()
}};
a._closeModule=function(){$.log("Closing war module");
$.cookie("breaking-video","closed",{expires:1});
var b=dailybeast.warmodule_closeHandler;
if(b){b()
}};
a.breakingVideo=$("#breaking-video");
a.breakingVideoClosed=$("#breaking-video-closed");
a.videoContainer=$("#video-container");
a.videoHTML=a.videoContainer.html();
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){a.videoContainer.html("");
$(".breaking-video-close").bind("click",function(b){b.preventDefault();
a._closeModule()
});
a.breakingVideoClosed.bind("click",function(b){b.preventDefault();
a._openModule()
})
}return a
}();
if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){if($.cookie("breaking-video")!="closed"){dailybeast.warmodule._openModule()
}}})
}var dailybeast=dailybeast||{};
dailybeast.newsletters=function(){function a(b,c){c=c||{};
var d=b.find("button");
function e(h,g){if(c.showMessage){c.showMessage(h,g)
}else{var f=b.find(".message").text(h).show("slow");
setTimeout(function(){f.hide("slow")
},5000)
}}b.submit(function(){if(c.validate){var f=c.validate(b);
if(f){e(f,true);
return false
}}var g={email:b.find("[name=email]").val(),subscriptions:[]};
b.find("[name=subscriptions]:checked").each(function(){g.subscriptions.push($(this).val())
});
if(c.submit){c.submit(b,d)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:g,dataType:"json",complete:function(){if(c.complete){c.complete(b,d)
}},success:function(h){if(h.msg!==undefined){e(h.msg,false)
}},error:function(j){var h=$.parseJSON(j.responseText);
if(h.msg!==undefined){e(h.msg,true)
}}});
return false
})
}return{bindNewsletterSignUp:a}
}();
$.priorityQ.domReady.add("Newsletter Forms",$.priorityQ.SOMETIME,function(){if($("#newsletters-page").length!=0){dailybeast.newsletters.bindNewsletterSignUp($(".newsletters form"),{validate:function(o){return !o.find("input[name=tos]").is(":checked")?"Please confirm that you have read and agree to the Terms of Service and Privacy Policy.":""
},submit:function(o,p){p.text("submitting...").attr("disabled",true)
},complete:function(o,p){p.text("submit").attr("disabled",false)
}})
}$(".signup").each(function(){var o=$(this);
var r=$(this).find(".message-dialog.confirm");
r.click(function(){r.hide()
});
var q=$(this).find(".message-dialog.error");
q.click(function(){q.hide()
});
var p=$(this).find(".loading-indicator");
dailybeast.newsletters.bindNewsletterSignUp($(this).find("form"),{showMessage:function(u,t){if(!t){if(u.toLowerCase().indexOf("invalid")>=0){t=true;
u="Sorry, that's not a valid email address. Please try again."
}else{u="Thanks! You're subscribed."
}}if(t){q.find(".text-cell").text(u);
q.show()
}else{r.find(".text-cell").text(u);
r.show()
}},validate:function(t){var u=t.find("input[name=email]").val();
u=$.trim(u);
return u.length==0?"Please enter your email address.":""
},submit:function(t,u){p.show()
},complete:function(t,u){p.hide()
}})
});
var b=false;
function g(p,r){r=r||{};
var t=p.find("button[name=validate]");
var v=p.find("[name=email]");
var q="";
function u(x,w){p.find("button[name=confirm]").attr("disabled",false);
p.find("button[name=cancel]").attr("disabled",false);
p.find("input[name=tos]").attr("disabled",false);
p.find("[name=subscriptions]").each(function(){$(this).attr("disabled",false)
});
b=false;
p.find("img").show();
p.find(".input-text").addClass("input-error");
p.find(".message").text(x);
setTimeout(function(){p.find(".message").text("");
p.find(".input-text").removeClass("input-error");
p.find("img").hide()
},5000)
}function o(){q=v.val();
v.blur();
v.attr("disabled",true);
var w={email:q!="Enter your email address"?q:""};
if(r.submit){r.submit(p,t)
}$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:w,dataType:"json",complete:function(){if(r.complete){r.complete(p,t)
}},success:function(x){if(x.msg!==undefined&&(x.msg.toLowerCase().indexOf("invalid")!=-1||x.msg.toLowerCase().indexOf("enter")!=-1)){u("Please provide a valid email address.",false);
v.attr("disabled",false);
if(r.cancel){r.cancel(p,t)
}}else{if(x.msg!==undefined&&x.msg.toLowerCase().indexOf("please select")==-1){u(x.msg,false);
v.attr("disabled",false)
}else{if(r.validateComplete){r.validateComplete(p)
}}}},error:function(y){var x=$.parseJSON(y.responseText);
if(x.msg!=undefined){u(x.msg,true)
}}})
}p.find("button[name=cancel]").click(function(){if(r.cancel){r.cancel(p,t)
}return false
});
v.keypress(function(w){if(w.which==13){w.preventDefault();
o()
}});
t.click(function(){o();
return false
});
p.submit(function(){if(b){return false
}else{b=true
}if(r.validate){var w=r.validate(p);
if(w){u(w,true);
return false
}}p.find("button[name=confirm]").attr("disabled",true);
p.find("button[name=cancel]").attr("disabled",true);
p.find("input[name=tos]").attr("disabled",true);
p.find("[name=subscriptions]").each(function(){$(this).attr("disabled",true)
});
var x={email:q,tos:p.find("input[name=tos]").is(":checked"),subscriptions:[]};
p.find("[name=subscriptions]:checked").each(function(){x.subscriptions.push($(this).val())
});
if(r.submit){r.submit(p,t)
}p.find("[name=subscriptions]:checked").each(function(){p.find("#thankList").append('<li class="clearfix">'+$(this).next("h2").text()+"</li>")
});
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"POST",data:x,dataType:"json",complete:function(){if(r.complete){r.complete(p,t)
}},success:function(y){if(y.msg!==undefined&&y.msg.toLowerCase().indexOf("successfully added")==-1){u(y.msg,false)
}else{if(r.success){r.success(p)
}}},error:function(z){var y=$.parseJSON(z.responseText);
if(y.msg!==undefined){u(y.msg,true)
}}});
return false
})
}if($("#cheatsheet-page").length!=0){var n=$(".submitform");
var l=n.find("#thankList");
var j=n.find("[name=email]");
var e=n.find("button[name=validate]");
var h=n.find("button[name=confirm]");
var c=n.find("input[name=tos]");
var d;
var a;
if($.browser.msie){d=n.find(".setup");
a=n.find(".confirmed")
}else{d=$(n.find(".setup")[1]);
a=$(n.find(".confirmed")[1])
}var m=[];
var f=0;
n.find("[name=subscriptions]").each(function(){m[f]=$(this).attr("checked");
$(this).attr("disabled",false);
f++
});
if(isMacWebKit||$.browser.msie){var k=j.attr("placeholder");
j.focus(function(){if(j.val()==""||j.val()==k){j.attr("placeholder","");
j.val("")
}}).blur(function(){if(j.val()==""||j.val()==j.attr("placeholder")){j.attr("placeholder",k);
j.val(k)
}}).blur()
}if($.browser.msie||$.browser.mozilla){j.val("");
j.blur();
c.attr("checked",false);
$.ajax({url:"/content/dailybeast/services/newsletters.json",type:"GET",dataType:"json",success:function(o){f=0;
n.find("[name=subscriptions]").each(function(){$(this).attr("checked",o[f].enabled);
m[f]=o[f].enabled?"checked":"";
f++
})
},error:function(p){var o=$.parseJSON(p.responseText);
if(o.msg!==undefined){showMessage(o.msg,true)
}}})
}j.attr("disabled",false);
e.attr("disabled",false);
h.attr("disabled",false);
c.attr("disabled",false);
g(n,{validate:function(o){return !c.is(":checked")?"Please agree to privacy policy.":""
},validateComplete:function(p){var o=j.outerWidth()+p.find("button[name=validate]").outerWidth()-31;
d.width(o);
a.width(o);
d.show("fast",function(){if($.browser.msie){$(d[0]).height($(d[1]).height())
}})
},cancel:function(o,p){c.attr("checked",false);
d.hide("fast",function(){var q=0;
o.find("[name=subscriptions]").each(function(){$(this).attr("checked",m[q]=="checked");
$(this).attr("disabled",false);
q++
});
c.attr("disabled",false)
});
p.attr("disabled",false);
j.val("");
j.blur();
j.attr("disabled",false);
h.attr("disabled",false);
b=false;
p.focus();
p.blur()
},submit:function(o,p){p.attr("disabled",true);
l.find(".clearfix").remove();
j.blur()
},complete:function(o,p){j.blur()
},success:function(o){d.hide("fast",function(){var p=0;
o.find("[name=subscriptions]").each(function(){$(this).attr("checked",m[p]=="checked");
$(this).attr("disabled",false);
p++
});
c.attr("disabled",false);
o.find("button[name=cancel]").attr("disabled",false)
});
a.show("fast",function(){if($.browser.msie){$(a[0]).height($(a[1]).height())
}})
}});
n.find("button[name=close]").click(function(){c.attr("checked",false);
n.find("button[name=validate]").attr("disabled",false);
j.val("");
j.blur();
j.attr("disabled",false);
h.attr("disabled",false);
b=false;
e.focus();
e.blur();
a.hide("fast");
return false
})
}});
var isUserScrolling=false;
$(window).bind("scrollstart",function(){isUserScrolling=true
});
$(window).bind("scrollstop",function(){isUserScrolling=false
});
dailybeast.lazyLoader=dailybeast.lazyLoader||function(){var a={};
a.loadInView=function(d){d=d||{};
var c=$(this);
var b=(d.sensitivity||"0");
if(window.location.hash.indexOf("suppressLoadInView")>=0){b=-10000
}else{if(window.location.hash.indexOf("loadInViewImmediate")>=0){b=10000
}}c.attr("data-sensitivity",b);
c.on("inview",function(f,g){var e=$(this);
if(g){e.attr("is-inview","true");
dailybeast.retry.start({name:d.name,minDelay:10,progressive:false,toRun:function(){if(typeof d.runIf=="undefined"||d.runIf()){$.log("Loading "+d.name);
return d.handler(e)
}return false
},cancelWhen:function(){return e.attr("is-inview")!="true"
},onSuccess:function(){e.unbind("inview")
}})
}else{e.attr("is-inview","false")
}})
};
jQuery.fn.loadInView=a.loadInView;
a.ifDataExists=function(c,b){if(c){return b
}else{return""
}};
a.lazyFacebook=function(){$(this).loadInView({name:"Facebook Like Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(b){if(typeof FB!="undefined"){var c=$(b);
c.html('<fb:like href="'+c.attr("data-href")+'" '+a.ifDataExists(c.attr("data-send"),'send="'+c.attr("data-send")+'" ')+a.ifDataExists(c.attr("data-layout"),'layout="'+c.attr("data-layout")+'" ')+a.ifDataExists(c.attr("data-page-name"),'pagename="'+c.attr("data-page-name")+'" ')+'width="90" height="21" '+a.ifDataExists(c.attr("data-show-faces"),'show_faces="'+c.attr("data-show_faces")+'" ')+a.ifDataExists(c.attr("data-action"),'action="'+c.attr("data-action")+'" ')+a.ifDataExists(c.attr("data-colorscheme"),'colorscheme="'+c.attr("data-colorscheme")+'" ')+a.ifDataExists(c.attr("data-ref"),'ref="'+c.attr("data-ref")+'"')+"></fb:like>");
FB.XFBML.parse(c.get(0));
return true
}else{$.warn("FB not loaded yet");
return false
}}})
};
jQuery.fn.lazyFacebook=a.lazyFacebook;
a.lazyFacebookShare=function(){$(this).loadInView({name:"Facebook Share Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(b){if(typeof FB!="undefined"){var c=$(b);
var d='SELECT share_count FROM link_stat WHERE url ="'+c.attr("data-link")+'"';
FB.api("/fql",{q:d},function(f){var e=0;
if(f.data){e=f.data[0].share_count
}c.html('<a class="fbshare-btn " onclick="postToFeed(this)" style="background-image: url('+c.attr("data-background-image")+');" ></a><span class="fbshare-count"><span class="fbnumber" id="fbnumber">'+formatShareNumber(e)+'</span><span class="countNub"><s></s><i></i></span></span>')
});
return true
}else{$.warn("FB not loaded yet");
return false
}}})
};
jQuery.fn.lazyFacebookShare=a.lazyFacebookShare;
a.lazyPlusOne=function(){$(this).loadInView({name:"Google Plus One",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(b){if(typeof gapi!="undefined"){var c=$(b);
var d="g-plusone"+Math.floor((Math.random()*1000000000)+1);
c.html('<div id="'+d+'" class="g-plusone"></div>');
gapi.plusone.render(d,{href:c.attr("data-href"),size:c.attr("data-size"),callback:c.attr("data-callback")?c.attr("data-callback"):"",count:c.attr("data-count")});
c.removeClass("lazy-placeholder");
return true
}else{$.warn("GAPI not loaded yet");
return false
}}})
};
jQuery.fn.lazyPlusOne=a.lazyPlusOne;
a.lazyTwitter=function(){$(this).loadInView({name:"Twitter Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(b){var c=$(b);
if(window.twttr&&window.twttr.widgets&&window.twttr.widgets.load){c.html('<a href="https://twitter.com/share" class="twitter-share-button" data-count="'+c.attr("data-count")+'" '+a.ifDataExists(c.attr("data-counturl"),'data-counturl="'+c.attr("data-counturl")+'" ')+'data-url="'+c.attr("data-url")+'" data-text="'+c.attr("data-text")+'" data-related="'+c.attr("data-related")+'" data-via="'+c.attr("data-via")+'" data-size="m" >Tweet</a>');
window.twttr.widgets.load();
if(c.attr("data-counturl")){try{$.getJSON("http://cdn.api.twitter.com/1/urls/count.json?callback=?&url="+c.attr("data-counturl"),function(f){var e=f.count;
if(e<10){c.find("iframe").css("width","78")
}else{if(e<100){c.find("iframe").css("width","81")
}else{if(e<1000){c.find("iframe").css("width","88")
}else{if(e<10000){c.find("iframe").css("width","97")
}}}}})
}catch(d){$.warn("Could not adjust the size of the twitter button",d)
}}return true
}else{return false
}}})
};
jQuery.fn.lazyTwitter=a.lazyTwitter;
a.lazyTwitterFollow=function(){$(this).loadInView({name:"Twitter Follow Button",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(b){var c=$(b);
c.html('<iframe allowtransparency="true" frameborder="0" scrolling="no"src="http://platform.twitter.com/widgets/follow_button.html?screen_name='+c.attr("data-screen-name")+"&show_count="+c.attr("data-show-count")+'&" style="width:'+c.attr("data-width")+';height:20px"></iframe>');
return true
}})
};
jQuery.fn.lazyTwitterFollow=a.lazyTwitterFollow;
a.lazyLinkedin=function(){$(this).loadInView({name:"Linked In",sensitivity:350,runIf:function(){return !isUserScrolling
},handler:function(d){$.log("Running for",d);
var b=$(d);
var c=function(){var e="linkedIn"+Math.floor((Math.random()*1000000000)+1);
b.html('<div id="'+e+'"><script type="IN/Share" data-url="'+getAbsolutePath()+'"><\/script></div>');
IN.parse(document.getElementById(e))
};
if(typeof IN=="undefined"){$.getScript("http://platform.linkedin.com/in.js",function(){c()
})
}else{c()
}return true
}})
};
jQuery.fn.lazyLinkedin=a.lazyLinkedin;
return a
}(jQuery);
function postToFeed(b){var c=$(b).parent(".lazy-fb-share");
var d={method:"feed",link:c.attr("data-link"),picture:c.attr("data-picture"),name:c.attr("data-name"),caption:"The Daily Beast",description:c.attr("data-description")};
function e(f){FB.XFBML.parse();
updateShareNumber()
}var a=FB.ui(d,e);
dailybeast.analytics.trackSharetoolClick("FBSHARE",c.attr("data-link"),c.attr("data-page-name"))
}function updateShareNumber(){$(".lazy-fb-share").each(function(a,c){var b=$(c);
if($(b).find("#fbnumber").length==0){$(b).lazyFacebookShare()
}else{var d='SELECT share_count FROM link_stat WHERE url ="'+b.attr("data-link")+'"';
FB.api("/fql",{q:d},function(f){var e=0;
if(f.data[0]){e=f.data[0].share_count
}$(b).find("#fbnumber").text(formatShareNumber(e))
})
}})
}function formatShareNumber(a){if(a<1000){return a
}if(a<100000){return(Math.floor(a/1000*10))/10+"k"
}if(a<1000000){return Math.floor(a/1000)+"k"
}if(a<100000000){return Math.floor(a/1000000*10)/10+"m"
}if(a>=100000000){return Math.floor(a/1000000)+"m"
}return a
}function getAbsolutePath(){return location.protocol+"//"+location.host+location.pathname
}$.priorityQ.domReady.add("Social Button Placeholders",$.priorityQ.NORMAL,function(){$(".social-placeholder").on("click",function(f){var c=$(this);
var d=c.attr("data-window")?$.parseJSON(c.attr("data-window")):{};
var e=c.attr("data-width")?c.attr("data-width"):500;
var a=c.attr("data-height")?c.attr("data-height"):400;
var g=getWindowPosition(window,e,a);
var b=window.open(c.attr("href"),"Share","status=0,scrollbars=0,menubar=0,location=0,toolbar=0,width="+g.width+",height="+g.height+",left="+g.left+",top="+g.top);
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
$.priorityQ.windowReady.add("Weather Widget",$.priorityQ.SOMETIME,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$.ajax({url:"http://api.wunderground.com/api/16398c7bfc8f3c8e/geolookup/conditions/q/autoip.json",dataType:"jsonp",success:function(b){if(b.current_observation){var a=b.current_observation["temp_f"];
var d=b.current_observation["icon"];
var c='<img class="icon" src="http://icons.wxug.com/i/c/g/'+d+'.gif" width="25" height="25">'+a+"&deg;";
$(".weather").html(c)
}}})
}});
$.priorityQ.windowReady.add("Stock ticker",$.priorityQ.SOMETIME,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){var c="INDU";
var b="COMPX";
$.getJSON("/content/dailybeast/services/stock-quote.json",{symbols:[c,b]},function(f){var g=f[c];
if(g){$(".stock .dowCountTitle").text("Dow ");
$(".stock .dowCount").text(d(g.last));
a($(".stock .dowRate"),g.change)
}var e=f[b];
if(g){$(".stock .nasdaqCountTitle").text(", Nasdaq ");
$(".stock .nasdaqCount").text(d(e.last));
a($(".stock .nasdaqRate"),e.change)
}$(".stock").show()
});
function a(f,g){var e=g>0;
f.text((e?"+":"")+d(g));
if(e){f.removeClass("down").addClass("up")
}else{f.removeClass("up").addClass("down")
}}function d(f){var e=(Math.round(f*10)/10).toFixed(1);
var j=e.split(".");
var h=j[0];
var g=/(\d+)(\d{3})/;
while(g.test(h)){h=h.replace(g,"$1,$2")
}return h+((j.length>0)?"."+j[1]:"")
}}});
$.priorityQ.domReady.add("Wrap Contributors",$.priorityQ.NORMAL,function(){if(!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode){$("#wrap-page .contributors, #article-page .contributors").slides({play:0,pause:2500,hoverPause:true,container:"contributors-container",paginationClass:"pagination",next:"pagination-next",prev:"pagination-previous",autoHeight:true});
$("#wrap-page .contributors, #article-page .contributors").each(function(){$(this).find(".pagination").wrap('<span class="inner"></span>');
var c=$(this).find(".inner");
$(this).find(".pagination-previous").prependTo(c);
$(this).find(".pagination-next").appendTo(c);
c.wrap('<div class="wrapper"></div>')
});
var b=$("#wrap-page .contributors .inner, #article-page .contributors .inner");
var a=$("#wrap-page .contributors, #article-page .contributors").width();
b.css("left",(a/2-b.width()/2)-10)
}});
$.priorityQ.domReady.add("Attach window placement to links",$.priorityQ.NORMAL,function(){dailybeast.popupwindow=dailybeast.popupwindow||function(){var a={};
a.pop=function(h){var e=$(h);
var f=e.attr("data-windowname")?e.attr("data-windowname"):"";
var g=e.attr("data-width")?e.attr("data-width"):500;
var c=e.attr("data-height")?e.attr("data-height"):400;
var j=function b(k,l,u){var t=typeof k.screenX!="undefined"?k.screenX:k.screenLeft;
var n=typeof k.screenY!="undefined"?k.screenY:k.screenTop;
var p=typeof k.outerWidth!="undefined"?k.outerWidth:document.documentElement.clientWidth;
var q=typeof k.outerHeight!="undefined"?k.outerHeight:(document.documentElement.clientHeight-22);
var o=(t<0)?k.screen.width+t:t;
var m=parseInt(o+((p-l)/2),10);
var r=parseInt(n+((q-u)/2.5),10);
return{width:parseInt(l),height:parseInt(u),left:m,top:r}
}(window,g,c);
var d=window.open(e.attr("href"),f,"status=0,scrollbars=0,menubar=0,location=0,toolbar=0,width="+j.width+",height="+j.height+",left="+j.left+",top="+j.top)
};
return a
}();
$(".window-position").on("click",function(a){a.preventDefault();
dailybeast.popupwindow.pop(this);
return false
})
});
var dailybeast=dailybeast||{};
dailybeast.slider={addSlides:function(c,d,b){if(dailybeast.modes.isEditMode){for(var a=0;
a<c;
a++){var e={};
e["./jcr:lastModified"]="";
e["./jcr:lastModifiedBy"]="";
e["./jcr:created"]="";
e["./jcr:createdBy"]="";
e["./sling:resourceType"]="dailybeast/components/slider/slide";
e[":nameHint"]="slide";
e[":order"]="";
e._charset_="utf-8";
CQ.utils.HTTP.post(d+"/",null,e,this)
}CQ.Util.reload()
}}};
(function(a){a.event.special.mousewheel={setup:function(){var b=a.event.special.mousewheel.handler;
if(a.browser.mozilla){a(this).bind("mousemove.mousewheel",function(c){a.data(this,"mwcursorposdata",{pageX:c.pageX,pageY:c.pageY,clientX:c.clientX,clientY:c.clientY})
})
}if(this.addEventListener){this.addEventListener((a.browser.mozilla?"DOMMouseScroll":"mousewheel"),b,false)
}else{this.onmousewheel=b
}},teardown:function(){var b=a.event.special.mousewheel.handler;
a(this).unbind("mousemove.mousewheel");
if(this.removeEventListener){this.removeEventListener((a.browser.mozilla?"DOMMouseScroll":"mousewheel"),b,false)
}else{this.onmousewheel=function(){}
}a.removeData(this,"mwcursorposdata")
},handler:function(d){var b=Array.prototype.slice.call(arguments,1);
var e=0,c=true;
if(d.wheelDelta){e=d.wheelDelta/120
}if(d.detail){e=-d.detail/3
}d=a.event.fix(d||window.event);
a.extend(d,a.data(this,"mwcursorposdata")||{});
if(d.wheelDelta){e=d.wheelDelta/120
}if(d.detail){e=-d.detail/3
}d.data=d.data||{};
d.type="mousewheel";
b.unshift(e);
b.unshift(d);
return a.event.handle.apply(this,b)
}};
a.fn.extend({mousewheel:function(b){return b?this.bind("mousewheel",b):this.trigger("mousewheel")
},unmousewheel:function(b){return this.unbind("mousewheel",b)
}})
})(jQuery);
(function(a){a.jScrollPane={active:[]};
a.fn.jScrollPane=function(c){c=a.extend({},a.fn.jScrollPane.defaults,c);
var b=function(){return false
};
return this.each(function(){var v=a(this);
var G=this;
var ar=0;
var N;
var at;
var t;
var ah=c.topCapHeight;
var k;
if(a(this).parent().is(".jScrollPaneContainer")){k=a(this).parent();
ar=c.maintainPosition?v.position().top:0;
var r=a(this).parent();
N=r.innerWidth();
at=r.outerHeight();
a(">.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown, >.jScrollCap",r).remove();
v.css({top:0})
}else{v.data("originalStyleTag",v.attr("style"));
v.css("overflow","hidden");
this.originalPadding=v.css("paddingTop")+" "+v.css("paddingRight")+" "+v.css("paddingBottom")+" "+v.css("paddingLeft");
this.originalSidePaddingTotal=(parseInt(v.css("paddingLeft"))||0)+(parseInt(v.css("paddingRight"))||0);
N=v.innerWidth();
at=v.innerHeight();
k=a("<div></div>").addClass("jScrollPaneContainer").css({height:at+"px",width:N+"px"});
if(c.enableKeyboardNavigation){k.attr("tabindex",c.tabIndex)
}v.wrap(k);
k=v.parent();
a(document).bind("emchange",function(au,av,p){v.jScrollPane(c)
})
}t=at;
if(c.reinitialiseOnImageLoad){var u=a.data(G,"jScrollPaneImagesToLoad")||a("img",v);
var j=[];
if(u.length){u.each(function(p,au){a(this).bind("load readystatechange",function(){if(a.inArray(p,j)==-1){j.push(au);
u=a.grep(u,function(ax,aw){return ax!=au
});
a.data(G,"jScrollPaneImagesToLoad",u);
var av=a.extend(c,{reinitialiseOnImageLoad:false});
v.jScrollPane(av)
}}).each(function(av,aw){if(this.complete||this.complete===undefined){this.src=this.src
}})
})
}}var aa=this.originalSidePaddingTotal;
var an=N-c.scrollbarWidth-c.scrollbarMargin-aa;
var W={height:"auto",width:an+"px"};
if(c.scrollbarOnLeft){W.paddingLeft=c.scrollbarMargin+c.scrollbarWidth+"px"
}else{W.paddingRight=c.scrollbarMargin+"px"
}v.css(W);
var Y=v.outerHeight();
var T=at/Y;
var X=T<0.99;
k[X?"addClass":"removeClass"]("jScrollPaneScrollable");
if(X){k.append(a("<div></div>").addClass("jScrollCap jScrollCapTop").css({height:c.topCapHeight}),a("<div></div>").addClass("jScrollPaneTrack").css({width:c.scrollbarWidth+"px"}).append(a("<div></div>").addClass("jScrollPaneDrag").css({width:c.scrollbarWidth+"px"}).append(a("<div></div>").addClass("jScrollPaneDragTop").css({width:c.scrollbarWidth+"px"}),a("<div></div>").addClass("jScrollPaneDragBottom").css({width:c.scrollbarWidth+"px"}))),a("<div></div>").addClass("jScrollCap jScrollCapBottom").css({height:c.bottomCapHeight}));
var ao=a(">.jScrollPaneTrack",k);
var w=a(">.jScrollPaneTrack .jScrollPaneDrag",k);
var aq;
var g=[];
var ae;
var U=function(){if(ae>4||ae%4==0){am(aj+aq*K)
}ae++
};
if(c.enableKeyboardNavigation){k.bind("keydown.jscrollpane",function(p){switch(p.keyCode){case 38:aq=-1;
ae=0;
U();
g[g.length]=setInterval(U,100);
return false;
case 40:aq=1;
ae=0;
U();
g[g.length]=setInterval(U,100);
return false;
case 33:case 34:return false;
default:}}).bind("keyup.jscrollpane",function(au){if(au.keyCode==38||au.keyCode==40){for(var p=0;
p<g.length;
p++){clearInterval(g[p])
}return false
}})
}if(c.showArrows){var R;
var A;
var q=function(p){a("html").unbind("mouseup",q);
R.removeClass("jScrollActiveArrowButton");
clearInterval(A)
};
var J=function(){a("html").bind("mouseup",q);
R.addClass("jScrollActiveArrowButton");
ae=0;
U();
A=setInterval(U,100)
};
k.append(a("<a></a>").attr({href:"javascript:;",tabindex:-1}).addClass("jScrollArrowUp").css({width:c.scrollbarWidth+"px",top:c.topCapHeight+"px"}).html("Scroll up").bind("mousedown",function(){R=a(this);
aq=-1;
J();
this.blur();
return false
}).bind("click",b),a("<a></a>").attr({href:"javascript:;",tabindex:-1}).addClass("jScrollArrowDown").css({width:c.scrollbarWidth+"px",bottom:c.bottomCapHeight+"px"}).html("Scroll down").bind("mousedown",function(){R=a(this);
aq=1;
J();
this.blur();
return false
}).bind("click",b));
var x=a(">.jScrollArrowUp",k);
var n=a(">.jScrollArrowDown",k)
}if(c.arrowSize){t=at-c.arrowSize-c.arrowSize;
ah+=c.arrowSize
}else{if(x){var af=x.height();
c.arrowSize=af;
t=at-af-n.height();
ah+=af
}}t-=c.topCapHeight+c.bottomCapHeight;
ao.css({height:t+"px",top:ah+"px"});
var ak=a(this).css({position:"absolute",overflow:"visible"});
var d;
var H;
var K;
var aj=0;
var E=T*at/2;
var I=function(au,aw){var av=aw=="X"?"Left":"Top";
return au["page"+aw]||(au["client"+aw]+(document.documentElement["scroll"+av]||document.body["scroll"+av]))||0
};
var Q=function(){return false
};
var ai=function(){Z();
d=w.offset();
d.top-=aj;
H=t-w[0].offsetHeight;
K=2*c.wheelSpeed*H/Y
};
var e=function(p){ai();
E=I(p,"Y")-aj-d.top;
a("html").bind("mouseup",B).bind("mousemove",S).bind("mouseleave",B);
if(a.browser.msie){a("html").bind("dragstart",Q).bind("selectstart",Q)
}return false
};
var B=function(){a("html").unbind("mouseup",B).unbind("mousemove",S);
E=T*at/2;
if(a.browser.msie){a("html").unbind("dragstart",Q).unbind("selectstart",Q)
}};
var am=function(au){k.scrollTop(0);
au=au<0?0:(au>H?H:au);
aj=au;
w.css({top:au+"px"});
var av=au/H;
v.data("jScrollPanePosition",(at-Y)*-av);
ak.css({top:((at-Y)*av)+"px"});
v.trigger("scroll");
if(c.showArrows){x[au==0?"addClass":"removeClass"]("disabled");
n[au==H?"addClass":"removeClass"]("disabled")
}};
var S=function(p){am(I(p,"Y")-d.top-E)
};
var ab=Math.max(Math.min(T*(at-c.arrowSize*2),c.dragMaxHeight),c.dragMinHeight);
w.css({height:ab+"px"}).bind("mousedown",e);
var V;
var y;
var m;
var ag=function(){if(y>8||y%4==0){am((aj-((aj-m)/2)))
}y++
};
var ap=function(){clearInterval(V);
a("html").unbind("mouseup",ap).unbind("mousemove",P)
};
var P=function(p){m=I(p,"Y")-d.top-E
};
var C=function(p){ai();
P(p);
y=0;
a("html").bind("mouseup",ap).bind("mousemove",P);
V=setInterval(ag,100);
ag();
return false
};
ao.bind("mousedown",C);
k.bind("mousewheel",function(au,aw){aw=aw||(au.wheelDelta?au.wheelDelta/120:(au.detail)?-au.detail/3:0);
ai();
Z();
var av=aj;
am(aj-aw*K);
var p=av!=aj;
return !p
});
var f;
var F;
function L(){var p=(f-aj)/c.animateStep;
if(p>1||p<-1){am(aj+p)
}else{am(f);
Z()
}}var Z=function(){if(F){clearInterval(F);
delete f
}};
var al=function(ax,p){if(typeof ax=="string"){try{$e=a(ax,v)
}catch(aw){return
}if(!$e.length){return
}ax=$e.offset().top-v.offset().top
}Z();
var av=Y-at;
ax=ax>av?av:ax;
v.data("jScrollPaneMaxScroll",av);
var au=ax/av*H;
if(p||!c.animateTo){am(au)
}else{k.scrollTop(0);
f=au;
F=setInterval(L,c.animateInterval)
}};
v[0].scrollTo=al;
v[0].scrollBy=function(au){var p=-parseInt(ak.css("top"))||0;
al(p+au)
};
ai();
al(-ar,true);
a("*",this).bind("focus",function(ay){var ax=a(this);
var aA=0;
var au=100;
while(ax[0]!=v[0]){aA+=ax.position().top;
ax=ax.offsetParent();
if(!au--){return
}}var p=-parseInt(ak.css("top"))||0;
var az=p+at;
var aw=aA>p&&aA<az;
if(!aw){var av=aA-c.scrollbarMargin;
if(aA>p){av+=a(this).height()+15+c.scrollbarMargin-at
}al(av)
}});
if(c.observeHash){if(location.hash&&location.hash.length>1){setTimeout(function(){al(location.hash)
},a.browser.safari?100:0)
}a(document).bind("click",function(au){$target=a(au.target);
if($target.is("a")){var p=$target.attr("href");
if(p&&p.substr(0,1)=="#"&&p.length>1){setTimeout(function(){al(p,!c.animateToInternalLinks)
},a.browser.safari?100:0)
}}})
}function D(p){a(document).bind("mousemove.jScrollPaneDragging",z);
a(document).bind("mouseup.jScrollPaneDragging",o)
}var O;
var h;
function M(){direction=O<0?-1:1;
v[0].scrollBy(O/2)
}function l(){if(h){clearInterval(h);
h=undefined
}}function z(av){var aw=v.parent().offset().top;
var p=aw+at;
var au=I(av,"Y");
O=au<aw?au-aw:(au>p?au-p:0);
if(O==0){l()
}else{if(!h){h=setInterval(M,100)
}}}function o(p){a(document).unbind("mousemove.jScrollPaneDragging").unbind("mouseup.jScrollPaneDragging");
l()
}k.bind("mousedown.jScrollPane",D);
a.jScrollPane.active.push(v[0])
}else{v.css({height:at+"px",width:N-this.originalSidePaddingTotal+"px",padding:this.originalPadding});
v[0].scrollTo=v[0].scrollBy=function(){};
v.parent().unbind("mousewheel").unbind("mousedown.jScrollPane").unbind("keydown.jscrollpane").unbind("keyup.jscrollpane")
}if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))||(navigator.userAgent.match(/Android/i))){var ac=1
}else{var ac=0
}k.bind("touchstart",function(au){var aw=aj;
if(ac){au=au.originalEvent.touches[0]
}var p=au.pageY;
var av=au.pageX;
k.bind("touchmove",function(ax){if(ac){ax.preventDefault();
ax=ax.originalEvent.touches[0]
}var ay=aw-(ax.pageY-p);
am(ay)
});
k.bind("touchend",function(ax){k.unbind("touchmove touchend")
})
})
})
};
a.fn.jScrollPaneRemove=function(){a(this).each(function(){$this=a(this);
var b=$this.parent();
if(b.is(".jScrollPaneContainer")){$this.css({top:"",height:"",width:"",padding:"",overflow:"",position:""});
$this.attr("style",$this.data("originalStyleTag"));
b.after($this).remove()
}})
};
a.fn.jScrollPane.defaults={scrollbarWidth:10,scrollbarMargin:5,wheelSpeed:18,showArrows:false,arrowSize:0,animateTo:false,dragMinHeight:1,dragMaxHeight:99999,animateInterval:100,animateStep:3,maintainPosition:true,scrollbarOnLeft:false,reinitialiseOnImageLoad:false,tabIndex:0,enableKeyboardNavigation:true,animateToInternalLinks:false,topCapHeight:0,bottomCapHeight:0,observeHash:true};
a(window).bind("unload",function(){var c=a.jScrollPane.active;
for(var b=0;
b<c.length;
b++){c[b].scrollTo=c[b].scrollBy=null
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
RecommendedLinksFlyoutStatic.getScrollPercentage=function(){var b=$(window).scrollTop();
var d=$(window).height();
var c=$(document).height();
var a=b/(c-d)*100;
return a
};
RecommendedLinksFlyoutStatic.getDefaultRecommendedLinks=function(){var b=dailybeast.cookie.UserCookies.defaultUserType;
var a=RecommendedLinksFlyoutStatic.recommendedLinksMap[b];
return a
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout=function(a){this.flyoutElement=a;
this.visible=false;
this.closed=false
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.show=function(){if(this.isShowable()){this.markVisible(true);
this.flyoutElement.stop();
this.flyoutElement.show();
var a=this.flyoutElement.width();
this.flyoutElement.css("right",-a);
this.flyoutElement.animate({right:0},500)
}else{$.log("Not showing the recommendation flyout")
}};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.hide=function(){if(this.isVisible()){this.markVisible(false);
this.flyoutElement.stop();
var a=this.flyoutElement.width();
this.flyoutElement.animate({right:-a},500,function(){$(this).hide()
})
}};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.close=function(){this.closed=true;
this.hide()
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.isShowable=function(){return !this.isVisible()&&!this.closed&&!window.flyoutLock
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.isVisible=function(){return this.visible
};
dailybeast.flyout.recommendation.RecommendedLinksFlyout.prototype.markVisible=function(a){this.visible=a;
window.flyoutLock=a
};
RecommendedLinksFlyoutStatic.initializeFlyout=function(b,h){var g=b.title;
var e=b.rubric;
var c=b.url;
var a=false;
$("#recommended-links-flyout a").html(g);
$("#recommended-links-flyout a").prop("href",c);
$("#recommended-links-flyout a").attr("data-track","'title':'recommended-links-"+h+"'");
$("#recommended-links-flyout .rubric-area").html(e);
RecommendedLinksFlyoutStatic.instance=new dailybeast.flyout.recommendation.RecommendedLinksFlyout($("#recommended-links-flyout"));
var f=$("#recommended-links-flyout .close-icon");
f.click(function(){RecommendedLinksFlyoutStatic.instance.close()
});
var d=$("#recommended-links-flyout a");
d.click(function(){trackFlyoutClick(c)
});
$(window).scroll(function(){var j=1500;
if($(".storymeta").length>0){j=$(".storymeta").offset().top
}else{if($(".storyFooter").length>0){j=$(".storyFooter").offset().top
}}var k=$(window).scrollTop();
var l=$(window).height();
if(k+l>j){if(!window.flyoutLock&&!RecommendedLinksFlyoutStatic.instance.isVisible()){RecommendedLinksFlyoutStatic.instance.show();
trackFlyoutVisible(c,a);
a=true
}}else{if(RecommendedLinksFlyoutStatic.instance.isVisible()){RecommendedLinksFlyoutStatic.instance.hide()
}}})
};
function trackFlyoutVisible(b,a){if(a){return
}s.linkTrackVars="prop50,eVar30,events";
s.linkTrackEvents="event30";
s.prop50=b;
s.eVar30=b;
s.events="event30";
s.tl(this,"o","Flyout Tracking")
}function trackFlyoutClick(a){s.linkTrackVars="prop50,eVar30,events";
s.linkTrackEvents="event31";
s.prop50=a;
s.eVar30=a;
s.events="event31";
s.tl(this,"o","Flyout Click Tracking")
}RecommendedLinksFlyoutStatic.getAvailableRecommendedLinks=function(){var d=[];
var e=dailybeast.cookie.UserCookies.getUserType();
var f=RecommendedLinksFlyoutStatic.recommendedLinksMap[e]||[];
var c=RecommendedLinksFlyoutStatic.getDefaultRecommendedLinks()||[];
var b=UserCookies.getVisitedUrls();
if(b==null){d=d.concat(f);
d=d.concat(c)
}else{for(i=0;
i<f.length;
i++){var a=f[i];
if(b.indexOf(a.urlHashCode)<0){d.push(a)
}}for(i=0;
i<c.length;
i++){a=c[i];
if(b.indexOf(a.urlHashCode)<0){d.push(a)
}}}return d
};
RecommendedLinksFlyoutStatic.chooseRecommendedLink=function(){var b=null;
var c=RecommendedLinksFlyoutStatic.getAvailableRecommendedLinks();
if(c.length>0){var a=Math.floor(Math.random()*c.length);
b=c[a]
}return b
};
dailybeast.flyout.recommendation.RecommendedLinksFlyoutStatic.instance;
$(function(){if(RecommendedLinksFlyoutStatic.isArticlePage()){if(!(typeof RecommendedLinksFlyoutStatic.recommendedLinksMap==="undefined")){var a=RecommendedLinksFlyoutStatic.chooseRecommendedLink();
if(a!=null){RecommendedLinksFlyoutStatic.initializeFlyout(a,userType)
}}}});
(function(b){function a(c){this.$overlay=null;
this.settings=b.extend({onClose:function(){}},c)
}a.prototype={listenForEscKey:function(){var c=this;
b(document).bind("keydown.FullScreenOverlay",function(d){if(d.keyCode===27&&b("#wbx-lb-cont-div").length===0){c.close()
}})
},enableScrolling:function(){b("html").css({overflow:"auto"});
b(window).scrollTop(this.scrollTop)
},disableScrolling:function(){this.scrollTop=b(window).scrollTop();
b("html").css({overflow:"hidden"})
},open:function(c){this.$overlay=b("#fullscreen-overlay");
this.disableScrolling();
if(this.$overlay.length<=0){this.$overlay=b('<div id="fullscreen-overlay"></div>').css({display:"none",position:"fixed",top:"0px",left:"0px"}).appendTo("body")
}this.$overlay.html(c);
if(!this.$overlay.is(":visible")){this.$overlay.fadeIn(50)
}this.listenForEscKey();
return this.$overlay
},close:function(){this.enableScrolling();
if(this.$overlay!==null){this.$overlay.fadeOut(50);
this.$overlay.html("")
}b(document).unbind(".FullScreenOverlay");
this.settings.onClose()
}};
window.FullScreenOverlay=a
})(jQuery);
var GalleryUrlUtil={isAGallery:function(a){return a&&(!a.match("/witw/galleries"))&&(a.match("/galleries/")||a.match("/photo/"))
}};
(function(c){var b=null,a=false,d=window.location.pathname,f=document.title,j=null;
function e(){j.hideLoading();
document.title=f;
if(Modernizr.history){history.pushState(null,"",d)
}a=false
}function h(k){if(b===null){b=new FullScreenOverlay({onClose:e})
}j=new GalleryView(b.open(),{onClose:function(){b.close()
}});
j.loadGallery(k,true);
a=true
}function g(){return Modernizr.history&&!dailybeast.modes.isEditMode&&!dailybeast.modes.isDesignMode&&c("#gallery2-page").length===0
}c(function(){if(g()){c("a[href]").each(function(){var k=c(this);
var l=k.attr("href");
if(GalleryUrlUtil.isAGallery(l)&&!isAppleDevice){k.click(function(){h(l);
return false
})
}});
c(window).bind("popstate",function(){c(".fb_dialog_close_icon").click();
c(".stclose").click();
if(location.pathname===d){if(b!==null){b.close();
a=false
}}else{if(!a){var k=window.location.pathname+window.location.hash;
if(GalleryUrlUtil.isAGallery(k)){h(k)
}}}})
}else{c.warn("Not attaching galleries as overlays.  HTML5 history not detected:"+Modernizr.history)
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
$.priorityQ.domReady.add("Livefyre Objects",$.priorityQ.IMPORTANT,function(){window.dailybeast=window.dailybeast||{};
window.dailybeast.livefyre=window.dailybeast.livefyre||function(){var d={};
d.ready=false;
d.$lfScripts=$("[data-lf-domain]");
d.network=d.$lfScripts.length>0?$(d.$lfScripts[0]).attr("data-lf-domain"):"";
d.$commentContainer=$("#livefyre");
d.config=d.$commentContainer.length>0?$.parseJSON(d.$commentContainer.attr("data-livefyre")):{};
d.streamType=$("#livefyre-chat").length<=0?"comments":"chat";
d.notifierEnabled=(d.$commentContainer.attr("data-notifier-enabled")=="true"||$.tdburl.hash.lfNotify=="true")&&d.streamType=="comments";
d.avatarsEnabled=(d.$commentContainer.attr("data-avatar-enabled")=="true"||$.tdburl.hash.avatarEnabled=="true");
d.$liveCountHeader=d.$commentContainer.find(".comment-count-header");
d.$liveCount=$('[data-lf-article-id="'+d.config.articleId+'"]');
d.defaultPattern="(%1)";
d.listeners={};
d.activeAuthHandler;
return d
}();
var a=dailybeast.livefyre;
var b=dailybeast.user.service;
var c=dailybeast.user.dispatcher;
if(typeof fyre!="undefined"){a.authDelegate=new fyre.conv.RemoteAuthDelegate();
a.authDelegate.login=function(d){c.startUsernameJourney();
a.activeAuthHandler=d;
d.failure()
};
a.authDelegate.logout=function(d){if(b.isUserSignedIn()){$.log("Log out initiated from LF widget");
c.startSignout()
}d.success()
};
a.authDelegate.viewProfile=function(d,e){d.success()
};
a.authDelegate.editProfile=function(d,e){if(b.isUserSignedIn()){c.navigate(b.config.links.user.account)
}d.success()
}
}a.getToken=function(){var d=b.userData.properties;
return d?d["livefyre.authToken"]:null
};
a.login=function(){$.log("Livefyre login");
if(b.isUserSignedIn()){if(typeof fyre!="undefined"&&typeof fyre.conv.login!="undefined"&&a.getToken()){fyre.conv.login(a.getToken());
a.$commentContainer.removeClass("needs-username");
if(a.activeAuthHandler){a.activeAuthHandler.success();
a.activeAuthHandler=null
}}else{a.$commentContainer.addClass("needs-username")
}}};
a.logout=function(){$.log("Livefyre logout");
if(a.ready==true&&typeof fyre!="undefined"&&fyre.conv.logout!="undefined"){fyre.conv.logout()
}a.$commentContainer.removeClass("needs-username")
};
a.expandPattern=function(f){var g=$(f).attr("data-pattern");
var d=g?g:a.defaultPattern;
for(var e=1;
e<arguments.length;
e++){d=d.replace("%"+e,arguments[e])
}return d
};
a.updateLiveCount=function(d){if(!$.isEmptyObject(a.$liveCount)){a.$liveCount.each(function(e,f){$(f).html(a.expandPattern(f,d))
})
}};
a.updateLiveCountHeader=function(d){if(!$.isEmptyObject(a.$liveCountHeader)){a.$liveCountHeader.each(function(e,f){d>=10?$(f).html(a.expandPattern(f,d)):$(f).html("")
})
}};
a.onCommentCountUpdated=function(d){$.log("Latest count from LF stream event:"+d);
if(d>=0){a.updateLiveCount(d);
a.updateLiveCountHeader(d)
}};
a.onUserLogin=function(){if(b.isUserSignedIn()){a.login();
a.initNotifier()
}};
a.isNotifierEnabled=function(){return($("#livefyre").length>0&&a.$commentContainer.attr("data-notifier-enabled")=="true"&&b.isUserSignedIn())||$.tdburl.hash.lfNotify=="true"
};
a.initNotifier=function(){if(a.isNotifierEnabled()){dailybeast.retry.start({name:"Livefyre Notifier",toRun:function(){if($(".fyre-notifier-container").length>0){$.log("Enabling the LF notifier",$(".fyre-notifier-container"));
$(".fyre-notifier-container").css("left","0px");
if($.tdburl.hash.lfNotify=="true"){$(".fyre-notifier-container").show()
}return true
}else{return false
}}})
}else{$.log("LF Notifier is not enabled.")
}};
a.addListener=function(d,e){if(a.listeners[d]==undefined){a.listeners[d]=[e]
}else{if(!$.inArray(e,a.listeners[d])){a.listeners[d].push(e)
}}};
a.lfready=function(g){try{$.log("Livefyre is ready, attaching custom handlers");
for(var f in a.listeners){for(var d=0;
d<a.listeners[f].length;
d++){g.on(f,a.listeners[f][d])
}}a.login();
g.on("commentCountUpdated",a.onCommentCountUpdated);
g.on("initialRenderComplete",a.initialRenderComplete);
if(!$.isEmptyObject(a.$liveCount)&&a.$liveCount.html()==""){a.updateLiveCount(0)
}a.initNotifier();
a.initLikesQTip();
a.$commentContainer.removeClass("spinner");
a.$commentContainer.find("#lf_comment_stream").show()
}catch(e){$.error("Livefyre failed to load",e.stack);
a.$commentContainer.hide()
}};
a.loadStream=function(){if($("#livefyre").length>0&&typeof a.authDelegate!="undefined"){try{var e={postButton:"Add Comment",postAsButton:"Add Comment",editProfile:"My Account"};
fyre.conv.load({network:a.network,strings:e,authDelegate:a.authDelegate,},[a.config],a.lfready)
}catch(d){$.error("Livefyre failed to load",d);
a.$commentContainer.hide()
}}};
a.loadCommentCounts=function(){if(typeof LF!="undefined"){$.log("Loading comment counts");
LF.CommentCount({replacer:function(d,f){var e=$(d).attr("data-lf-article-id");
if(e==a.config.articleId){$.log("Deferring to live count - as the article id has a stream on the page")
}else{$.log("LF CommentCount returned "+f+" for "+e);
if(f>=0){$(d).html(a.expandPattern(d,f))
}}}})
}};
a.initLikesQTip=function(){if(!a.avatarsEnabled){$("<style type='text/css'> #livefyre .fyre-comment-like-imgs .fyre-avatar {display: none;} </style>").appendTo("head");
a.initCombinedLikesQTip()
}else{a.initAvatarLikesQTip()
}};
a.initCombinedLikesQTip=function(){$("#livefyre").on("mouseover",".fyre-comment-like",function(){var d=$("a[title]",this).map(function(){return this.title
}).get().join(", ");
if(d.length>0){a.createQTip($(this),d,2)
}})
};
a.initAvatarLikesQTip=function(){$("#livefyre").on("click",".fyre-comment-like-imgs .fyre-avatar a",false);
$("#livefyre").on("mouseover",".fyre-comment-like-imgs .fyre-avatar",function(d){a.createQTip($(this),$(this).data("title"))
})
};
a.createQTip=function(e,f,d){d=(d===undefined)?0:d;
if(typeof e.data("qtip")==="undefined"){e.qtip({content:f,show:{ready:true,when:{event:"mouseover"}},hide:"mouseout",position:{corner:{tooltip:"topMiddle",target:"leftBottom"},adjust:{x:d}},style:{border:{width:5,radius:10},padding:10,textAlign:"center",tip:true,name:"light"}})
}};
a.init=function(){try{$.log("Initializing livefyre on the Beast",a.network);
b.events.signedIn.bind(a.onUserLogin);
b.events.signedOut.bind(a.logout);
a.loadCommentCounts();
if(typeof $.tdburl.hash.suppressCommentLoad=="undefined"){a.loadStream()
}a.ready=true
}catch(d){$.error("Could not init livefyre",d)
}}
});
$.priorityQ.windowReady.add("Livefyre Start-up",$.priorityQ.NORMAL,function(){if(window.dailybeast.livefyre){window.dailybeast.livefyre.init()
}});
var dailybeast=dailybeast||{};
dailybeast.commons=dailybeast.commons||{};
dailybeast.commons.NamespaceUtils={initNamespace:function(d){var e=d.split(".");
var a=window;
for(var c=0;
c<e.length;
c++){var b=e[c];
a[b]=a[b]||{};
a=a[b]
}return a
}};
dailybeast.commons.NamespaceUtils.initNamespace("dailybeast.commons");
dailybeast.commons.PlatformPreferenceUtils={cookieName:"X-UA-Device-force",setMobile:function(){$.log("setting platform preference cookie to mobile");
$.cookie(this.cookieName,"mobile",{path:"/",expires:10000})
},setDesktop:function(){$.log("setting platform preference cookie to desktop");
$.cookie(this.cookieName,"desktop",{path:"/",expires:10000})
}};