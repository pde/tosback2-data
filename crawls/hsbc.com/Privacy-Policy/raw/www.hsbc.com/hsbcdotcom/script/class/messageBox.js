function MessageBox(msg,width,height,opt)
{
	this.settings = jQuery.extend({ 
						"content" : "",
						"width" : "",
						"height" : "",
						"top" : "auto",
						"left" : "auto",
						"minTop" : "15px",
						"minLeft" : "15px",
						"context" : document.body,
						"overlayClass" : "messagebox_overlay",
						"overlayInlineCss" : "position:absolute;overflow:hidden;display:none;z-index:50;",
						"contentClass" : "messagebox_content",
						"contentInlineCss" : "position:absolute;display:none;z-index:52;",
						"loaderClass" : "loader",
						"failureClass" : "failure",
						"zIndex" : 50,
						"onFail" : this.onFail,
						"callback" : function() { },
						"onShow" : function() { },
						"onHide" : function() { },
						"dataType" : "html",
						"postData" : "",
						"async" : false,
						"failureMsg" : "Message box loading failed",
						"animate" : true,
						"animateTime" : 500,
						"enableTemplates" : false,
						"template" : 	"<div class='msgBoxTopLeft'></div>"+
										"<div class='msgBoxTopMiddle'></div>"+
										"<div class='msgBoxTopRight'>"+
											"<a href='#' id='closeButton'>&nbsp;</a>"+
										"</div>"+
										"<div class='msgBoxMiddleLeft'></div>"+
										"<div class='msgBoxMiddleMiddle'>"+
											"<div class='bg_map'></div>"+
											"<!--content-->"+
										"</div>"+
										"<div class='msgBoxMiddleRight'></div>"+
										"<div class='msgBoxBottomLeft'></div>"+
										"<div class='msgBoxBottomMiddle'></div>"+
										"<div class='msgBoxBottomRight'></div>"
					 },opt);
	
	this.context = jQuery(this.settings.context);
	this.content = this.context.find("."+this.settings.contentClass);
	this.overlay = this.context.find("."+this.settings.overlayClass);
	this.focusElement = null;
	this.lastFocused = null;
	
	this.settings.height = (height!="" && height!=null) ? height : this.settings.height;
	this.settings.width  = (width!="" && width!=null) ? width : this.settings.width;
	
	if(msg!="" && msg!=null)
	{
		this.settings.content = msg;
		this.init();
		this.show();
	}

}

MessageBox.prototype.exception=null;MessageBox.prototype.init=function(){try{this.context=jQuery(this.settings.context);var e=this.context.find("."+this.settings.overlayClass).length>0;var t=this.context.find("."+this.settings.contentClass).length>0;var n="";var r=this.settings.content;if(t==false){n="<div class='"+this.settings.contentClass+"' style='"+this.settings.contentInlineCss+"'></div>";this.context.append(n);this.content=this.context.find("."+this.settings.contentClass)}if(e==false){n="<div class='"+this.settings.overlayClass+"' style='"+this.settings.overlayInlineCss+"'></div>";this.context.append(n)}if(jQuery(r).is("div")==true||jQuery(r).is("span")==true||jQuery(r).is("article")==true||jQuery(r).is("li")==true||jQuery(r).is("aside")==true){this.settings.content=jQuery(r).html()}else{if(jQuery(r).length>0){this.settings.content=r}else{try{var i=this;i.load(r)}catch(s){this.exception=this.settings.failureMsg+" : setMsg : "+s}}}if(this.settings.enableTemplates){this.settings.content=this.settings.template.replace("<!--content-->",this.settings.content)}this.content.html(this.settings.content);this.focusElement=this.content.find("a,input,select,checkbox,radio,textarea").eq(0);this.overlay=this.context.find("."+this.settings.overlayClass);this.setDimentions();this.overlay.bind("click",{obj:this},this.hide);this.context.bind("keyup",{obj:this},function(e){if(e.keyCode==27){var t=e.data.obj;t.hide()}});this.settings.callback();this.exception=null}catch(o){this.exception=this.settings.failureMsg+" : init : "+o;this.settings.onFail(this.settings.failureMsg+" : init : "+o)}};MessageBox.prototype.load=function(e){try{var t=this;var n=t.settings.postData==""?"get":"post";t.content.addClass(t.settings.loaderClass);var r=jQuery.ajax({url:e,dataType:t.settings.dataType,type:n,data:t.settings.postData,async:t.settings.async});r.done(function(e,n,r){t.content.html(t.settings.template.replace("<!--content-->",e));t.content.removeClass(t.settings.loaderClass);t.settings.callback()});r.fail(function(n,r){t.settings.content=e;t.content.removeClass(t.settings.loaderClass);return false});this.exception=null}catch(i){this.exception=this.settings.failureMsg+" : setMsg : "+i}};MessageBox.prototype.setDimentions=function(e){e=e===undefined||e==null||e==""?this:e;e.content.removeAttr("style");var t=0;var n=0;if(e.settings.width=="auto"||e.settings.height=="auto"){if(e.settings.width=="auto")e.content.css({width:"auto"});if(e.settings.height=="auto")e.content.css({height:"auto"});t=e.content.width();n=e.content.height()}else{if(e.settings.width==""){if(e.content.css("width")<=0)e.content.css({width:"auto"});t=e.content.width()}else{t=parseInt(e.settings.width)}if(e.settings.height==""){if(e.content.css("height")<=0)e.content.css({height:"auto"});n=e.content.height()}else{n=parseInt(e.settings.height)}}if(t==0||n==0){setTimeout(e.setDimentions,100,e)}else{var r=parseInt(e.settings.minTop);var i=parseInt(e.settings.minLeft);var s=jQuery(document).scrollTop();var o=jQuery(window).height()/2-n/2;o=o<r?r:o;var u=jQuery(document).width()/2-t/2;u=u<i?i:u;var a=e.settings.top=="auto"?o+s:parseInt(e.settings.top)+s;var f=e.settings.left=="auto"?u:parseInt(e.settings.left);e.content.css({width:t,height:n,top:a,left:f})}e.overlay.css({width:jQuery(document).width(),height:jQuery(document).height(),top:0,left:0})};MessageBox.prototype.show=function(e){var t=e?e.data.obj:this;t.setDimentions(t);t.overlay.css("display","block");if(t.settings.animate){t.content.fadeIn(t.settings.animateTime)}else{t.content.css("display","block")}this.lastFocused=jQuery(document.activeElement);if(this.focusElement!=null)this.focusElement.focus();t.settings.onShow()};MessageBox.prototype.hide=function(e){var t=e?e.data.obj:this;if(t.settings.animate){t.content.fadeOut(t.settings.animateTime);var n=t.overlay;setTimeout(function(){n.css("display","none")},t.settings.animateTime,t.overlay)}else{t.content.css("display","none");t.overlay.css("display","none")}if(this.lastFocused!=null)this.lastFocused.focus();t.settings.onHide()};MessageBox.prototype.onFail=function(e,t){alert(e+" : "+t)};MessageBox.prototype.destroy=function(){this.overlay.unbind();jQuery("."+this.settings.contentClass,this.context).remove();jQuery("."+this.settings.overlayClass,this.context).remove()};MessageBox.prototype.setContent=function(e){this.settings.content=e};MessageBox.prototype.getMsg=function(){return this.settings.content};MessageBox.prototype.setWidth=function(e){this.settings.width=e};MessageBox.prototype.getWidth=function(){return this.settings.width};MessageBox.prototype.setHeight=function(e){this.settings.height=e};MessageBox.prototype.getHeight=function(){return this.settings.height};MessageBox.prototype.setTop=function(e){this.settings.top=e};MessageBox.prototype.getTop=function(){return this.settings.top};MessageBox.prototype.setLeft=function(e){this.settings.left=e};MessageBox.prototype.getLeft=function(){return this.settings.left};MessageBox.prototype.setMinTop=function(e){this.settings.minTop=e};MessageBox.prototype.setMinLeft=function(e){this.settings.minLeft=e};MessageBox.prototype.setContext=function(e){this.settings.context=e};MessageBox.prototype.getContext=function(){return this.settings.context};MessageBox.prototype.setOverlayClass=function(e){this.settings.overlayClass=e};MessageBox.prototype.getOverlayClass=function(){return this.settings.overlayClass};MessageBox.prototype.setOverlayInlineCss=function(e){this.settings.overlayInlineCss=e};MessageBox.prototype.getOverlayInlineCss=function(){return this.settings.overlayInlineCss};MessageBox.prototype.setContentClass=function(e){this.settings.contentClass=e};MessageBox.prototype.getContentClass=function(){return this.settings.contentClass};MessageBox.prototype.setContentInlineCss=function(e){this.settings.contentInlineCss=e};MessageBox.prototype.getContentInlineCss=function(){return this.settings.contentInlineCss};MessageBox.prototype.setLoaderClass=function(e){this.settings.loaderClass=e};MessageBox.prototype.getLoaderClass=function(){return this.settings.loaderClass};MessageBox.prototype.setFailureClass=function(e){this.settings.failureClass=e};MessageBox.prototype.getFailureClass=function(){return this.settings.failureClass};MessageBox.prototype.setZIndex=function(e){this.settings.zIndex=e};MessageBox.prototype.getZIndex=function(){return this.settings.zIndex};MessageBox.prototype.setOnFail=function(e){this.settings.onFail=e};MessageBox.prototype.getOnFail=function(){return this.settings.onFail};MessageBox.prototype.setCallback=function(e){this.settings.callback=e};MessageBox.prototype.getCallback=function(){return this.settings.callback};MessageBox.prototype.setOnShow=function(e){this.settings.onShow=e};MessageBox.prototype.getOnShow=function(){return this.settings.onShow};MessageBox.prototype.setOnHide=function(e){this.settings.onHide=e};MessageBox.prototype.getOnHide=function(){return this.settings.onHide};MessageBox.prototype.setDataType=function(e){this.settings.dataType=e};MessageBox.prototype.getDataType=function(){return this.settings.dataType};MessageBox.prototype.setFailureMsg=function(e){this.settings.failureMsg=e};MessageBox.prototype.getFailureMsg=function(){return this.settings.failureMsg};MessageBox.prototype.setAnimate=function(e){this.settings.animate=e};MessageBox.prototype.getAnimate=function(){return this.settings.animate};MessageBox.prototype.setAnimateTime=function(e){this.settings.animateTime=e};MessageBox.prototype.getAnimateTime=function(){return this.settings.animateTime};MessageBox.prototype.setEnableTemplates=function(e){this.settings.enableTemplates=e};MessageBox.prototype.getEnableTemplates=function(){return this.settings.enableTemplates};MessageBox.prototype.setTemplate=function(e){this.settings.template=e};MessageBox.prototype.getTemplate=function(){return this.settings.template};MessageBox.prototype.setPostData=function(e){this.settings.postData=e};MessageBox.prototype.setAsync=function(e){this.settings.async=e}