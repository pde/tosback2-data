/*
ADOBE CONFIDENTIAL
Copyright 2005 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/

/////////////////////////////////SjZoomNav
function SjZoomNav(inObj,inWidth,inHeight,inPosition,inNav,transparency){
	this.SjElement = SjElement;
///////
	if ((typeof inNav == 'undefined')) {
		inNav = 'izNav';
	}
    if (sjGetElement(inNav)){
		this.SjElement(sjGetElement(inNav), null);
		if (this._parent){
			sjCreateDiv(sjGetElement(inNav), this._elementId);
		}else{
			sjCreateDiv(null , this._elementId);
		}
		this.elem=sjGetElement(this._elementId);
		this.elem._elementId = this._elementId;
		this._content		= sjGetElement(this._elementId);
		
		this.setSize(sjGetElement(inNav).offsetWidth || 50,sjGetElement(inNav).offsetHeight || 50);
		sjSetWidth(inNav, this.width());
		sjSetHeight(inNav, this.height());
	    this.toXY(0,0);
	}else{
		this.SjElement(inObj, null);
		if (this._parent && this._parent._elementId){
			sjCreateDiv(this._parent._elementId , this._elementId);
		}else{
			sjCreateDiv(null , this._elementId);
		}
		this.elem=sjGetElement(this._elementId);
		this.elem._elementId = this._elementId;
		this._content		= sjGetElement(this._elementId);
		
		this.setSize(inWidth || 50,inHeight || 50);
	}
/////////

	this.transparency = transparency;
	this.navObj = null;

	this.navImage = new SjPicture(this.elem,null,null,null,this.transparency);
	this.navImage.visible(false);
	sjSetBorder(this._elementId,1,'solid',"#666666");
	this.navImage.setSize(inWidth || 50,inHeight || 50);
	this.navImage.stretch(true);
	this.navImage.zIndex(this.zIndex()+1);

	this.dblnavImage = new SjPicture(this.elem,null,null,null,this.transparency);
	this.dblnavImage.setSize(inWidth || 50,inHeight || 50);
	this.dblnavImage.stretch(true);
	this.dblnavImage.visible(false);

	this.dragImage = new SjLayer(this);
	this.dragImage.zIndex(100);
	this.dragImage.visible(false);
	this.dragImage.setSize(inWidth || 50,inHeight || 50);

	this.borderWidth  = 2;
	this.borderColor = '#ff0000';
	var str='<img id='+this.dragImage._elementId+'_img style="position:absolute;left:0px;top:0px;width:'+(this.dragImage.width()-this.borderWidth*2)+'px;height:'+(this.dragImage.height()-this.borderWidth*2)+'px;">';
	sjSetLayerHTML(this.dragImage._elementId,str);
	sjGetElementStyle(this.dragImage._elementId+'_img').border=''+this.borderColor+' '+this.borderWidth+'px solid'; 
	this.visible(false);
	this.position = inPosition || 'absolute';
	if (this.position == 'absolute'){
		sjGetElementStyle(this._elementId).position='absolute'; 
	}else{ 
		//sjGetElementStyle(this._elementId).position ='relative';//relative - not work!
	}
	this.initialLoading	= true;
	//for future this.changingImage	= false;
	this.scl = 1;//initial
	this.cX = this.dragImage.left();
	this.cY = this.dragImage.top();
	this.cW = this.dragImage.width();
	this.cH = this.dragImage.height();
}

SjZoomNav.prototype = new SjElement();

SjZoomNav.prototype.setViewer = function(inObj){
	this.navObj = inObj;
	if (this.navObj){
		this.navObj.navLayer = this;
		this.zIndex(this.navObj.zIndex()+20);
		sjGetElement(this.dragImage._elementId+'_img').src = this.navObj.codePath+"images/spacer.gif";
		this.initHandlers();
		if ((this.navObj.navloadURL) && (this.navObj.imgServerWidth) && (this.navObj.imgServerHeight)){
			this.navObj.navDefaultScl = Math.max(Math.max(this.navObj.imgServerWidth / (this.width()-5), this.navObj.imgServerHeight / (this.height()-5)), 1.0);
			this.navObj.navloadURL +='&scl='+(this.navObj.navDefaultScl)+this.navObj.idStr;
			this.dblnavImage.visible(false);
			this.dblnavImage.load(this.navObj.navloadURL);
		}
	}
}

SjZoomNav.prototype.update = function(x,y,w,h){
	if(this.navObj){
		this.scl = Math.max(w/this.navImage.width(),h/this.navImage.height());
		var fixedX = Math.max(-x/this.scl,0);
		var fixedY = Math.max(-y/this.scl,0);
		this.dragImage.toXY(fixedX+this.navImage.left(),fixedY+this.navImage.top());
		var fixedWidth = Math.min(this.navObj.width()/this.scl, (this.navImage.width()-fixedX)<0?0:(this.navImage.width()-fixedX));
		var fixedHeight = Math.min(this.navObj.height()/this.scl, (this.navImage.height()-fixedY)<0?0:(this.navImage.height()-fixedY));
		this.dragImage.setSize(fixedWidth,fixedHeight);
		sjGetElementStyle(this.dragImage._elementId+'_img').width = ((this.dragImage.width()-this.borderWidth*2)<1?1:(this.dragImage.width()-this.borderWidth*2))+"px";
		sjGetElementStyle(this.dragImage._elementId+'_img').height = ((this.dragImage.height()-this.borderWidth*2)<1?1:(this.dragImage.height()-this.borderWidth*2))+"px";
		this.cX = this.dragImage.left();
		this.cY = this.dragImage.top();
		this.cW = this.dragImage.width();
		this.cH = this.dragImage.height();
	}
}

SjZoomNav.prototype.moving=false;
SjZoomNav.prototype.startDrag=false;


SjZoomNav.prototype.updateNav = function(){
	this.dragImage.visible(false);
	this.navImage.visible(false);
	this.navImage.load(this.dblnavImage.img.src);
}

SjZoomNav.prototype.initHandlers = function(){
	var obj = this;
	var objNav = this.navObj;
	this.dblnavImage.addEventListener("load", 
		function (){
			obj.dblnavImage.setSize(obj.dblnavImage.img.width,obj.dblnavImage.img.height);
			obj.dblnavImage.toXY((obj.width() - obj.dblnavImage.width())/2,(obj.height() - obj.dblnavImage.height())/2);
			if (obj.navImage._fadeid) {
					clearTimeout(obj.dblnavImage._fadeid);
					obj.dblnavImage._fadeid = null;
			}
			if (obj.navImage._fadeid) {
					clearTimeout(obj.navImage._fadeid);
					obj.navImage._fadeid = null;
			}
			if (!obj.initialLoading){
				obj.navImage.fadeOut(obj.navObj.turnTime/2);
				setTimeout(obj+'.updateNav()',obj.navObj.turnTime/2);
			}else{
				obj.updateNav();
			}
				obj.dblnavImage.visible(true);
			return false;
		}
	);
	this.navImage.addEventListener("load", 
		function (){
			obj.navImage.setSize(obj.dblnavImage.img.width,obj.dblnavImage.img.height);
			obj.navImage.toXY((obj.width() - obj.navImage.width())/2,(obj.height() - obj.navImage.height())/2);
			if (obj.navImage._fadeid) {
					clearTimeout(obj.dblnavImage._fadeid);
					obj.dblnavImage._fadeid = null;
			}
			if (obj.navImage._fadeid) {
					clearTimeout(obj.navImage._fadeid);
					obj.navImage._fadeid = null;
			}
			if (!obj.initialLoading){
				obj.navImage.fadeIn(obj.navObj.turnTime/2);
			}else{
				obj.dblnavImage.visible(false);
			}
			obj.navImage.visible(true);
			obj.update(obj.navObj.currentX,obj.navObj.currentY,obj.navObj.backImage.width(),obj.navObj.backImage.height());
			obj.dragImage.visible(true);
			obj.initialLoading	= false;
			return false;
		}
	);

	this.dragImage.addEventHandler('mousedown',
//	this.navImage.addEventHandler('mousedown',
		function (o,evt){
			objNav.storeImagesXY();
			ex = evt.posx;
			ey = evt.posy;
			obj.startDrag=true;
			sjSetCursor('hand');
			return false;
		}
	);
	this.dragImage.addEventHandler('mousemove',
//	this.navImage.addEventHandler('mousemove',
		function (o,evt){
			if (obj.startDrag){
				obj.moving=true;
				var diffX = evt.posx - ex;
				var diffY = evt.posy - ey;
				if (objNav._animeid){
					clearTimeout(objNav._animeid);
					objNav._animeid = null;
				}
				objNav.setPosition(objNav.backImage,objNav.bx - diffX*obj.scl,objNav.by - diffY*obj.scl,objNav.currentScl);
				objNav.foreImage.left(objNav.currentX-objNav.bx+objNav.fx);
				objNav.foreImage.top(objNav.currentY-objNav.by+objNav.fy);
			}
			return false;
		}
	);
	this.dragImage.addEventHandler('mouseup',
//	this.navImage.addEventHandler('mouseup',
		function (o,evt){
			if(obj.moving){
				obj.moving=false;
				objNav.updateForeImage();
			}else{
				if (evt.ctrlKey){
				} else {
				}
			}
			obj.startDrag=false;
			sjSetCursor('default');
			return false;
		}
	);
//
	this.navImage.addEventHandler('mousedown',
		function (o,evt){
			objNav.storeImagesXY();
			ex = evt.posx;
			ey = evt.posy;
			obj.startDrag=true;
			sjSetCursor('hand');
			return false;
		}
	);
	this.navImage.addEventHandler('mousemove',
		function (o,evt){
			if (obj.startDrag){
				obj.moving=true;
				var diffX = evt.posx - ex;
				var diffY = evt.posy - ey;
				if (objNav._animeid){
					clearTimeout(objNav._animeid);
					objNav._animeid = null;
				}
				objNav.setPosition(objNav.backImage,objNav.bx - diffX*obj.scl,objNav.by - diffY*obj.scl,objNav.currentScl);
				objNav.foreImage.left(objNav.currentX-objNav.bx+objNav.fx);
				objNav.foreImage.top(objNav.currentY-objNav.by+objNav.fy);
			}
			return false;
		}
	);
	this.navImage.addEventHandler('mouseup',
		function (o,evt){
			if(obj.moving){
				obj.moving=false;
				objNav.updateForeImage();
			}else{
				if (evt.ctrlKey){
				} else {
				}
			}
			obj.startDrag=false;
			sjSetCursor('default');
			return false;
		}
	);

//
	this.addEventHandler('mouseout',
		function (o,evt){
			if(obj.moving){
				obj.moving=false;
				objNav.updateForeImage();
			}else{
				if (evt.ctrlKey){
				} else {
				}
			}
			obj.startDrag=false;
			sjSetCursor('default');
			return false;
		}
	);
}

SjZoomNav.prototype.setBorder = function(sz,inColor) {	
	if ((inColor.indexOf("#") == -1) && ((inColor.indexOf("0x") == -1))) {
		inColor = "#"+inColor;
	}else if (inColor.indexOf("0x") != -1) {
		inColor = inColor.replace("0x","#");
	}
	this.borderColor = inColor || "#ff0000";
	this.borderWidth = parseInt(sz) || 2;
	sjGetElementStyle(this.dragImage._elementId+'_img').border=""+this.borderColor+" "+parseInt(this.borderWidth)+"px solid"; 
	sjGetElementStyle(this.dragImage._elementId+'_img').width = ((this.dragImage.width()-this.borderWidth*2)<1?1:(this.dragImage.width()-this.borderWidth*2))+"px";
	sjGetElementStyle(this.dragImage._elementId+'_img').height = ((this.dragImage.height()-this.borderWidth*2)<1?1:(this.dragImage.height()-this.borderWidth*2))+"px";
}

/////////////////////////////////SjZoom

function SjZoom(inParent,inBaseImage,inWidth,inHeight,withNav,withMagnifier,inPosition,inTransparency){
	this.SjElement = SjElement;
	this.SjElement(inParent, null);
	if (this._parent && this._parent._elementId){
		sjCreateDiv(this._parent._elementId , this._elementId);
	}else{
		sjCreateDiv(null , this._elementId);
	}
	this._content		= sjGetElement(this._elementId);
	if (typeof tsj != 'undefined'){
		this.codePath		= tsj.path;
	}else if(typeof sj != 'undefined'){
		this.codePath		= sj.path;
	}else{
		this.codePath		= '/assets/';
	}
	this.mainURL		= inBaseImage || this.codePath+"images/spacer.gif";
	this.foreURL		= null;
	this.loadURL		= null;
	this.waitIconURL	= null;
	this.imgFolder		= this.codePath+"images/default/";
	// viewer arguments
	this.viewSize		= {width: inWidth || 200, height: inHeight || 200};
	this.currentX		= null;//x;
	this.currentY		= null;//y;
	this.initialScl		= 1;//s;
	this.defaultScl		= 1;//s;
	this.currentScl		= 1;//s;
	this.lastScl		= 1;//s;
	this.nextScl		= 1;//s;
	this.prevScl		= 1;//s;
	this.imgServerWidth	= null; //server image size
	this.imgServerHeight= null;
	this.prevImgServerWidth	= null; //previuos server image size
	this.prevImgServerHeight= null;
	this.initialLoading	= true;
	this.changingImage	= false;
	this.initRGNZone	= null;
	this.RGNtype		= "rgna";
	this.format			= "jpeg";			// jpeg
	this.cachingModel	= "on,off";	// server side caching off, client side caching on
	this.infotxt		= "";
	this.buttonSpace	= 0;
	this.buttonOffset	= 0;
	this.imgBorder		= 0;
	// tiled zoom viewer arguments
	this.tileSize		= {width:128,height:128};
	this.panStep		= 128;
	this.maxWait		= 15000;
	this.max_zoom		= 100;//5;//some trick's;))
	this.zoom_factor	= 2;
	this.transitionTime	= 500;//msec
	this.fadeTime		= 150;// msec
	this.magnifier		= {width:150,height:150,factor:2,st:true};
	this.navInfo		= {pos:1,x:5,y:5,width:75,height:75};
	this.spinnerCou=0;
	this.orig_max_zoom	= 5;
	this.totalzoom		= 1;
	this.zoom_factor_limit = 0.0;
	this.waitIconTimer	= {showDelay: 3000, hideDelay: 100};
	this.waitIconTimerId= null;
	this.panPercision	= 3;
	this.curZoomPower	= 0;
	//navigator
	this.navigatorScl;
	this.withNav		= withNav || false;
	this.withMagnifier	= withMagnifier || false;
//closebutton???????
	this.closebutton_w	= 20;
	this.closebutton_h	= 20;
	this.closebutton_x	= 5;
	this.closebutton_y	= 5;
	this.closebutton_pos = 0;
//resizing
	this.setSize(this.viewSize.width,this.viewSize.height);
	this.clip(0,0,this.viewSize.width+2,this.viewSize.height+2);
/////////////////
	this.transparency		= inTransparency || false;
	this.navLayer = null;
	this.foreImage = new SjPicture(this,'foreImage'+this._elementId,null,null,this.transparency);
	this.foreImage.visible(false);
	this.foreImage.setSize(this.viewSize.width,this.viewSize.height);
	this.foreImage.stretch(true);
	//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
	this.foreImage.afterFade = function() {
		this._parent.checkPendingChangeContext();
	};

	this.backImage = new SjPicture(this,'backImage'+this._elementId,null,null,this.transparency);
	this.backImage.visible(false);
	this.backImage.setSize(this.viewSize.width,this.viewSize.height);
	this.backImage.stretch(true);

	this.mapImage = new SjPicture(this,'mapImage'+this._elementId);
	this.mapImage.visible(false);
	this.mapImage.setSize(this.viewSize.width,this.viewSize.height);
	this.mapImage.stretch(true);
	this.mapImage.load(this.codePath+"images/spacer.gif");//????crazy!!!!
	this.waitIcon = new SjPicture(null,'waitIcon'+this._elementId);
	this.waitIcon.visible(false);
	this.waitIcon.setSize(10,10);
////////////////buttons
	this.closeButton = new SjPicture(this._parent,'closeButton'+this._elementId);
	this.plusButton = new SjPicture(this._parent,'plusButton'+this._elementId);
	this.minusButton = new SjPicture(this._parent,'minusButton'+this._elementId);
	this.resetButton = new SjPicture(this._parent,'resetButton'+this._elementId);
	this.infoButton = new SjPicture(this._parent,'infoButton'+this._elementId);
	this.closeButton.setSize(20,20);
	this.plusButton.setSize(20,20);
	this.minusButton.setSize(20,20);
	this.resetButton.setSize(20,20);
	this.infoButton.setSize(20,20);
	this.closeButton.visible(false);
	this.plusButton.visible(false);
	this.minusButton.visible(false);
	this.resetButton.visible(false);
	this.infoButton.visible(false);
	
	this.visible(true);
	this.stack = null;
	this.state = "create";
	this.oldImage = null;
	this.currentRGN = null;
	//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
	this.pendingChangeContext = null;
/////////////////
	this.currentCrop = {x:0,y:0};//??null;
	this.alignX = 0;
	this.alignY = 0;
	this.broshure = null;
	this.navloadURL	= null;
	this.navDefaultScl = 1;
/////////////////
	this.clickToZoom = true;
	this.zoomSclArray = new Array();
	this.zoomIdx = null; //reset state
	this.zoomScl = false;
	this.enableZoom = true;
/////////////////
	this.hotSpotEnable = false;
	this.oimgLabel = '';
	this.imgLabel = '';
/////////////////
	this.turnTime		= 150;// msec
	this.initFromPersistence	= false;
	this.backImage.zIndex(this.zIndex()+2);
	this.foreImage.zIndex(this.zIndex()+4);
	this.mapImage.zIndex(this.zIndex()+5);
	this.waitIcon.zIndex(this.zIndex()+6);
	this.closeButton.zIndex(this.foreImage.zIndex()+10);
	this.plusButton.zIndex(this.foreImage.zIndex()+10);
	this.minusButton.zIndex(this.foreImage.zIndex()+10);
	this.resetButton.zIndex(this.foreImage.zIndex()+10);
	this.infoButton.zIndex(this.foreImage.zIndex()+10);
}

SjZoom.prototype = new SjElement();

SjZoom.prototype.initialising = function (x,y,scale,defaultScl) {
	this.defaultScl = this.initialScl = Math.max(Math.max(this.imgServerWidth / this.viewSize.width, this.imgServerHeight / this.viewSize.height), 1.0);//ss
	 if (defaultScl != null){
		this.defaultScl = this.initialScl = defaultScl;
	  }
	 if (scale == null){
		this.currentScl = this.defaultScl;
	  } else {
		var resetScl = scl1 = Math.max(this.imgServerWidth / this.viewSize.width, 
										this.imgServerHeight / this.viewSize.height);
		var prevResetScl = scl0 = Math.max(this.prevImgServerWidth / this.viewSize.width, 
											this.prevImgServerHeight / this.viewSize.height);
		resetScl = Math.max(resetScl,1.0);
		prevResetScl = Math.max(prevResetScl,1.0);
		//minimum allowed scale value.
		scale = scale * resetScl / prevResetScl;
		if (this.zoom_factor_limit != 0) {
			scale = Math.max(scale, 1 / this.zoom_factor_limit);
		}
		this.currentScl = scale;
	 }

	//set position
	this.defaultX = (this.viewSize.width - this.imgServerWidth/this.defaultScl)/2;
	 if (x == null){
		this.currentX = (this.viewSize.width - this.imgServerWidth/this.currentScl)/2;
	  } else {
		this.currentX = x;
	 }
	this.defaultY = (this.viewSize.height - this.imgServerHeight/this.defaultScl)/2;
	 if (y == null){
		this.currentY = (this.viewSize.height - this.imgServerHeight/this.currentScl)/2;
	  } else {
		this.currentY = y;
	 }
	
	if (!this.zoomScl){
		this.zoomSclArray = new Array();
		for(var i=0;i<=this.max_zoom;i++){
			this.zoomSclArray.push(this.defaultScl/Math.pow(this.zoom_factor , i));
		}
	}
	//create url
		this.idStr="";
		if (this.imageVersion){
			this.idStr = '&id='+this.imageVersion;
		}
		this.loadURL = this.navloadURL = this.mainURL+sjPBreak(this.mainURL)+'rgn='+
							Math.round(0)+','+
							Math.round(0)+','+
							Math.round(this.imgServerWidth)+','+
							Math.round(this.imgServerHeight);
		this.loadURL +=	'&scl='+(this.defaultScl)+this.idStr;
	//load image
		this.backImage.visible(false);
		this.backImage.load(this.loadURL);
		if (this.navLayer){
			clearTimeout(this.navLayer.dblnavImage._fadeid);
			this.navLayer.dblnavImage._fadeid = null;
			this.navDefaultScl = Math.max(Math.max(this.imgServerWidth / (this.navLayer.width()-5), this.imgServerHeight / (this.navLayer.height()-5)), 1.0);
			this.navloadURL +=	'&scl='+(this.navDefaultScl)+this.idStr;
			this.navLayer.dragImage.visible(false);
			this.navLayer.dblnavImage.visible(false);
			this.navLayer.dblnavImage.load(this.navloadURL);
		}
}

SjZoom.prototype.changeContext = function (inURL,x,y,scale,defaultScl,imgWidth,imgHeight,imgVersion,pageId){
    if (this._animeid){
		clearTimeout(this._animeid);
		this._animeid = null;
	}
	this.oldImage = this.mainURL;
	this.currentHost = location.host;
	var tempURL=new SjURL(inURL);
	if (!this.initialLoading) {
		if (this.changingImage || (!this.foreImage.loaded) ||(this.foreImage._fadeid != null) || (this._animeid)){
			//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
			this.pendingChangeContext = {
				url : inURL,
				x : x,
				y : y,
				scale : scale,
				defaultScl:defaultScl,
				width : imgWidth,
				height : imgHeight,
				version : imgVersion,
				pageId : pageId
			};
			return;
		}else{
			//same image - no change.
			if (inURL == this.mainURL) {
				return;
			}
			tTime = (new Date()).getTime();
			this.changingImage = true;
		}
	}
	//if((imgWidth)&&(imgHeight)&&(imgVersion)){
	if((imgWidth)&&(imgHeight)){
		this.prevImgServerWidth	= this.imgServerWidth; //previuos server image size
		this.prevImgServerHeight = this.imgServerHeight;
		this.imgServerWidth=imgWidth;
		this.imgServerHeight=imgHeight;
		if (imgVersion){
			this.imageVersion=imgVersion;
		}else{
			this.imageVersion=null;
		}
		if (pageId){
			this.pageId=pageId;
		}else{
			this.pageId='page0';
		}
		this.mainURL=mainURL=inURL;
		this.initialising(x,y,scale,defaultScl);
		this.state = "changeContext";
		this.fireEvent('endZoom');
	}
	else{
		if (pageId){
			this.pageId=pageId;
		}else{
			this.pageId='page0';
		}
		var ltURL = inURL+sjPBreak(inURL)+ 'req=ctx,json';
		var lt = null;
			lt = new SjTextLoader();
			lt.parent = this;
			lt.onLoadText = function() {
				if (lt.clearText(lt.text) != null) {
					var imageRectStr = sjGetKeyValue(lt.text, 'image.rect');
					var rectTokenList = imageRectStr.split(',');
					var imageWidth = rectTokenList[2];
					var imageHeight = rectTokenList[3];
					var imageVersion = sjGetKeyValue(lt.text, 'image.version');
					var metaVersion = sjGetKeyValue(lt.text, 'metadata.version');
					this.parent.prevImgServerWidth	= this.parent.imgServerWidth; //previuos server image size
					this.parent.prevImgServerHeight = this.parent.imgServerHeight;
					this.parent.imgServerWidth=imageWidth;
					this.parent.imgServerHeight=imageHeight;
					if (imageVersion){
						this.parent.imageVersion=imageVersion;
					}else{
						this.parent.imageVersion=null;
					}
					if (metaVersion){
						this.parent.metaVersion=metaVersion;
					}else{
						this.parent.metaVersion=null;
					}
					this.parent.mainURL=mainURL=inURL;
					this.parent.initialising(x,y,scale,defaultScl);
					this.parent.state = "changeContext";
					this.parent.fireEvent('endZoom');
				}
				return false;
			}
		if (this.initialLoading){
			lt.load(ltURL,true);
		}else{
			lt.load(ltURL,false);
		}
	}
}

SjZoom.prototype.checkPosition = function (x,y,scale){
	var newx = x;
	var newy = y;
	var shiftX = this.imgServerWidth/scale/2;
	var shiftY = this.imgServerHeight/scale/2;
	if (newx < (this.viewSize.width-this.imgServerWidth/scale)) 
		newx = (this.viewSize.width-this.imgServerWidth/scale);
	if (newy < (this.viewSize.height-this.imgServerHeight/scale)) 
		newy = (this.viewSize.height-this.imgServerHeight/scale);
	if (this.viewSize.width > this.imgServerWidth/scale){ 
		newx = (this.viewSize.width - this.imgServerWidth/scale)/2+(this.alignX*shiftX);
		if (newx+this.imgServerWidth/scale > this.viewSize.width){
			newx = (this.viewSize.width - this.imgServerWidth/scale);
		}
		if (newx < 0){
			newx = 0;
		}
	} else if (newx > 0) 
		newx=0;
	if (this.viewSize.height > this.imgServerHeight/scale){ 
		newy = (this.viewSize.height - this.imgServerHeight/scale)/2+(this.alignY*shiftY);
		if (newy+this.imgServerHeight/scale > this.viewSize.height){
			newy = (this.viewSize.height - this.imgServerHeight/scale);
		}
		if (newy < 0){
			newy = 0;
		}
	} else if (newy > 0) 
		newy=0;
	return ({nx:Math.round(newx),ny:Math.round(newy)});
}

SjZoom.prototype.setPosition = function (img,x,y,scale){
	var oldx = img.left();
	var oldy = img.top();

	var newx = this.checkPosition(x,y,scale).nx;
	var newy = this.checkPosition(x,y,scale).ny;
	this.currentX = img.left(newx);
	this.currentY = img.top(newy);
	this.fireEvent('setPosition');
	
	//update navigator
	if (this.navLayer)
		this.navLayer.update(this.currentX,this.currentY,this.backImage.width(),this.backImage.height());

	//update map
	this.mapUpdate(this.backImage.left(),this.backImage.top(),
					this.backImage.width(),this.backImage.height(),
					1/this.currentScl);
	return ({ox:oldx,oy:oldy,nx:newx,ny:newy});
}

SjZoom.prototype._animeid=null;
SjZoom.prototype.animFix = function (img,inX,inY,inFinScale,inZoomTime,inAfterFn){
    if (this._animeid){
		clearTimeout(this._animeid);
		this._animeid = null;
	}
	var startScale	= this.currentScl;
	var startPosX	= Math.round(this.currentX);
	var startPosY	= Math.round(this.currentY);
	var finPosX		= inX;
	var finPosY		= inY;
	this.zoomStartTime	= new Date().getTime();
	if ((startPosX != finPosX) || (startPosY != finPosY) || (startScale != inFinScale)){
	    if (this.foreImage._fadeid) {
			clearTimeout(this.foreImage._fadeid);
			this.foreImage._fadeid = null;
			//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
			this.checkPendingChangeContext();
		}
		this.foreImage.visible(false);
		this.mapImage.visible(false);//??
		sjSetCursor('wait');
		this.requestShowWaitIcon();
		this.animFixTo(img,startPosX,startPosY,finPosX,finPosY,startScale,inFinScale,inZoomTime,inAfterFn);
	}else{
	    if (this.foreImage._fadeid) {
			clearTimeout(this.foreImage._fadeid);
			this.foreImage._fadeid = null;
			//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
			this.checkPendingChangeContext();
		}
		this.foreImage.visible(true);
		this.mapImage.visible(true);//??
		sjSetCursor('default');
		this.requestHideWaitIcon();
	}
}

SjZoom.prototype.animFixTo = function (img,startPosX,startPosY,finPosX,finPosY,startScale,finScale,inZoomTime,inAfterFn){
	var dt = new Date().getTime() - this.zoomStartTime;
	if (dt >= inZoomTime) {
		if (this._animeid){
			clearTimeout(this._animeid);
			this._animeid = null;
		}
		this.currentScl = finScale;
		img.setSize(this.imgServerWidth / this.currentScl,this.imgServerHeight / this.currentScl);
		this.setPosition(img,finPosX,finPosY,this.currentScl);
		this.fireEvent('endZoom');
		this.fireEvent('setPosition');
		if (typeof inAfterFn == 'function'){
			inAfterFn(arguments.callee);
		}
		sjSetCursor('default');
		this.requestHideWaitIcon();
		return;
	} else {
		var startZoom = 1 / startScale;
		var finZoom = 1 / finScale;
		var newZoom = startZoom + (finZoom - startZoom) * dt / inZoomTime;
		var newScl = 1 / newZoom;
		this.currentScl = newScl;
		var newx = (startPosX + (finPosX - startPosX) * dt / inZoomTime);
		var newy = (startPosY + (finPosY - startPosY) * dt / inZoomTime);
		this.currentX = newx;
		this.currentY = newy;
		img.setSize(this.imgServerWidth / newScl,this.imgServerHeight / newScl);			
		this.setPosition(img,newx,newy,this.currentScl);
		this.fireEvent('setPosition');
		var obj = this;
		this._animeid=setTimeout(function(){
			obj.animFixTo(img,startPosX,startPosY,finPosX,finPosY,startScale,finScale,inZoomTime,inAfterFn);
		},25);
		return;
	}
}

SjZoom.prototype.ZoomAt = function (img,x,y,factor) {
//this.max_zoom				: max number of zoom levels
//this.defaultScl			: server scale at reset state
//this.currentScl			: current server scale
//this.zoom_factor			: step of zooming (by default = 2)
//this.zoom_factor_limit	: by default = 0(without restrictions) if >0 ,value in % of max zooming
//							1.0 ->> 100%,2.2 ->> 220%, 0.47 ->> 47%
//zoom		scl		zoom_factor_limit	
//25%		4		0.25				
//33%		3		0.33				
//100%		1		1					
//200%		0.5		2.0					
/*
if "factor" >1 - zoomOut "factor" <1 - zoomIn "factor" == 1 - may be "panning" 
*/
	var nothing = false;

	if (!this.zoomScl){
		nothing = false;
	}else{
		if (factor > 1){
			if (this.zoomIdx == 0){//?? reseting
				nothing = false;
			}else{ 
					for (var i=this.zoomSclArray.length-1;i>=0;i--){
						if ((this.zoomSclArray[i] - this.currentScl)>0){
							factor = this.zoomSclArray[i] / this.currentScl;
							nothing = false;
							break;
						}else{
							nothing = true;
						}
					}
			}
		}else if (factor < 1){
				for (var i=0;i<this.zoomSclArray.length;i++){
					if ((this.zoomSclArray[i] - this.currentScl)<0){
						factor = this.zoomSclArray[i] / this.currentScl;
						nothing = false;
						break;
					}else{
						nothing = true;
					}
				}
		}; 
	}

	var newScl = this.currentScl*factor;
	if (this.zoom_factor_limit != 0) {
		newScl = Math.max(newScl, 1 / this.zoom_factor_limit);
	}
	newScl = Math.min(this.defaultScl,newScl);
	//maximum relative scale change, starting from 'reset' state.
	var maxScaleChange = Math.pow(this.zoom_factor , this.max_zoom);
	//minimum allowed scale value.
	var minScale = this.defaultScl / maxScaleChange;
	newScl = Math.max(newScl, minScale);
	//check for scale changing and panning
	var newx = this.viewSize.width/2-x/(newScl/this.currentScl);
	var newy = this.viewSize.height/2-y/(newScl/this.currentScl);
	var nx = this.checkPosition(newx,newy,newScl).nx;
	var ny = this.checkPosition(newx,newy,newScl).ny;
	if (!nothing){ 
			if ((newScl != this.currentScl) || (Math.round(nx) != Math.round(this.currentX)) || (Math.round(ny) != Math.round(this.currentY))){
				if (newScl < this.currentScl){
					if (this.zoomScl){
						if (this.zoomIdx < this.zoomSclArray.length){
							this.zoomIdx++;
						}
					}else{
						this.zoomIdx++;
					}
				}else if (newScl > this.currentScl){
					if (this.zoomIdx > 0){
						this.zoomIdx--;
					}
				}
				if ((factor != 1) && (newScl != this.currentScl)){
					if (newScl < this.currentScl){
						this.fireEvent('zoom','factor',1/newScl*100);
					}
				}else if ((Math.round(nx) != Math.round(this.currentX)) || (Math.round(ny) != Math.round(this.currentY))){
					this.fireEvent('zoomPan');
				}
				var obj = this;
				if (!this.initialLoading){
					this.animFix(img,nx,ny,newScl,this.transitionTime,function(){obj.updateForeImage();});
				}else{
					this.animFix(img,nx,ny,newScl,0,function(){obj.updateForeImage();});
				}
		}else{
			sjSetCursor('default');
		}
	}
}

SjZoom.prototype.ZoomIn = function (img){
	var newx = this.viewSize.width/2-this.currentX;
	var newy = this.viewSize.height/2-this.currentY;
	this.ZoomAt(img,newx,newy,1/this.zoom_factor);
	this.state = "zoomIn";
	this.fireEvent('zoomIn','image',img,'currentScl',this.currentScl,'factor',1/this.zoom_factor);
}

SjZoom.prototype.ZoomOut = function (img){
	var newx = this.viewSize.width/2-this.currentX;
	var newy = this.viewSize.height/2-this.currentY;
	this.ZoomAt(img,newx,newy,this.zoom_factor);
	this.state = "zoomOut";
	this.fireEvent('zoomOut','image',img,'currentScl',this.currentScl,'factor',this.zoom_factor);
}

SjZoom.prototype.pan = function (img,directionX,directionY,amount){
	this.panStep = Math.sqrt(this.viewSize.width * this.viewSize.width + this.viewSize.height * this.viewSize.height) / 2 
	var newx = this.viewSize.width/2-this.currentX+directionX*amount*this.panStep;
	var newy = this.viewSize.height/2-this.currentY+directionY*amount*this.panStep;
	this.ZoomAt(img,newx,newy,1);
	this.state = "zPan";
	this.fireEvent('zPan','image',img,'directionX',directionX,'directionY',directionY,'amount',amount);
}
SjZoom.prototype.PanLeft = function (img){
	this.pan(img,-1,0,1);
}
SjZoom.prototype.PanUp = function (img){
	this.pan(img,0,-1,1);
}
SjZoom.prototype.PanDown = function (img){
	this.pan(img,0,1,1);
}
SjZoom.prototype.PanRight = function (img){
	this.pan(img,1,0,1);
}
SjZoom.prototype.PanLeftUp = function (img){
	this.pan(img,-1,-1,1);
}
SjZoom.prototype.PanRightUp = function (img){
	this.pan(img,1,-1,1);
}
SjZoom.prototype.PanLeftDown = function (img){
	this.pan(img,-1,1,1);
}
SjZoom.prototype.PanRightDown = function (img){
	this.pan(img,1,1,1);
}

SjZoom.prototype.ResetView = function (img){
	this.state = "reset";
	if(this.initRGNZone){
		this.ZoomSet(this.initRGNZone,this.RGNtype);
	}else{
		this.zoomIdx = 0;
		this.ZoomAt(img,this.defaultX,this.defaultY,this.defaultScl/this.currentScl);
	}
	this.fireEvent('zoomReset','image',img);
}

SjZoom.prototype.xImageToScreen = function (imgX){
	return imgX/this.currentScl+this.currentX;
}
SjZoom.prototype.yImageToScreen = function (imgY){
	return imgY/this.currentScl+this.currentY;
}
SjZoom.prototype.widthImageToScreen = function (imgW){
	return this.xImageToScreen(imgW) - this.xImageToScreen(0);
}
SjZoom.prototype.heightImageToScreen = function (imgH){
	return this.yImageToScreen(imgH) - this.yImageToScreen(0);
}

SjZoom.prototype.xScreenToImage = function (scrX){
	return (scrX-this.currentX) * this.currentScl;
}
SjZoom.prototype.yScreenToImage = function (scrY){
	return (scrY-this.currentY) * this.currentScl;
}
SjZoom.prototype.widthScreenToImage = function (scrW){
	return this.xScreenToImage(scrW) - this.xScreenToImage(0);
}
SjZoom.prototype.heightScreenToImage = function (scrH){
	return this.yScreenToImage(scrH) - this.yScreenToImage(0);
}

SjZoom.prototype.ZoomSet = function (rgn,type) {
	if (!this.changingImage){
     var rgnArray = rgn.split(",");
     if( rgnArray.length == 4 ) {
        var aspect = this.imgServerWidth/this.imgServerHeight;
        if( type=="rgnn" ) {
			rgnArray[0] = rgnArray[0] * this.imgServerWidth;
			rgnArray[1] = rgnArray[1] * this.imgServerHeight;
			rgnArray[2] = rgnArray[2] * this.imgServerWidth;
			rgnArray[3] = rgnArray[3] * this.imgServerHeight;
		}else if( type=="rgn" ){
			rgnArray[0] = rgnArray[0]/aspect*this.imgServerWidth;
			rgnArray[1] = rgnArray[1]*this.imgServerHeight;
			rgnArray[2] = rgnArray[2]/aspect*this.imgServerWidth;
			rgnArray[3] = rgnArray[3]*this.imgServerHeight;
		}
			var newx=this.xImageToScreen(rgnArray[0]);
			var newy=this.yImageToScreen(rgnArray[1]);
			var neww=this.widthImageToScreen(rgnArray[2]);
			var newh=this.heightImageToScreen(rgnArray[3]);
			var scl = Math.max(neww / this.viewSize.width, newh / this.viewSize.height);
		    if (this.foreImage._fadeid) {
				clearTimeout(this.foreImage._fadeid);
				this.foreImage._fadeid = null;
				//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
				this.checkPendingChangeContext();
			}
			var nx = newx+neww/2-this.currentX;
			var ny = newy+newh/2-this.currentY;
			this.currentRGN = rgnArray;
			this.state = "setRGN";
			this.ZoomAt(this.backImage,nx,ny,scl);
     };
	}else{
		this.state = "setRGN";
		var stack ={name:"ZoomSet",args:arguments};
		this.stack = stack;
	}
};

SjZoom.prototype.checkRect = function (x,y,w,h){
	var res={x:0,y:0,w:0,h:0,scl:null,url:null};
	var scl=this.currentScl;
		if (scl <= 1){
			scl=1;
		}
	res.x = Math.max(0,-x);
	res.w = Math.min(this.viewSize.width, w);
	res.y = Math.max(0,-y);
	res.h = Math.min(this.viewSize.height, h);
	if ((res.h <= 0) || (res.w <= 0)) {
		return null;
	} else {
	//fix tile coordinates so that it will always be align to tileSize.width.
	var tsize = this.tileSize.width*Math.ceil(Math.round(this.tileSize.width * this.currentScl)/this.tileSize.width);
	var img_x_old = res.x*this.currentScl;
	var img_y_old = res.y*this.currentScl;
	var img_w_old = res.w*this.currentScl;
	var img_h_old = res.h*this.currentScl;
	img_x = tsize * Math.floor(img_x_old / tsize);
	img_w = tsize * Math.ceil((img_x_old + img_w_old) / tsize) - img_x;
	img_y = tsize * Math.floor(img_y_old/ tsize);
	img_h = tsize * Math.ceil((img_y_old + img_h_old) / tsize) - img_y;
	//fix out of image bounds.
	img_x = Math.max(img_x, 0);
	img_y = Math.max(img_y, 0);

	if ((img_x + img_w) > this.imgServerWidth) {
		img_w = this.imgServerWidth - img_x;
	}
	if ((img_y + img_h) > this.imgServerHeight) {
		img_h = this.imgServerHeight - img_y;
	}

	//find shift screen position of the image.
		var c1x=img_x+img_w/2;
		var c1y=img_y+img_h/2;
		var c2x=img_x_old+img_w_old/2;
		var c2y=img_y_old+img_h_old/2;
		this.shiftX = (c2x - c1x);
		this.shiftY = (c2y - c1y);
		this.lastScl = scl;//s;
		res.url = this.mainURL;
		res.scl = scl;
		res.x =	Math.round(img_x);
		res.y =	Math.round(img_y);
		res.w =	Math.round(img_w);
		res.h =	Math.round(img_h);
		this.currentCrop = res;
		return res;
	}
}


SjZoom.prototype.mapUpdate = function (x,y,w,h,scale){
	this.mapImage.toXY(x,y);
	this.mapImage.setSize(w,h);
	sjResetMap("s7map_"+this._elementId);//map
	sjZoomMap ("s7map_"+this._elementId, scale, scale);
}

SjZoom.prototype.updateForeImage = function (inURL){
	var res={x:0,y:0,w:0,h:0,scl:null,url:null};
	res=this.checkRect(this.backImage.left(),this.backImage.top(),this.backImage.width(),this.backImage.height());
	var offsetX = this.currentCrop.x/this.currentScl;
	var offsetY = this.currentCrop.y/this.currentScl;
	this.mapUpdate(this.backImage.left(),this.backImage.top(),
					this.backImage.width(),this.backImage.height(),
					1/this.currentScl);
	this.foreImage.toXY(this.backImage.left()+offsetX,this.backImage.top()+offsetY);
	this.idStr="";
	if (this.imageVersion){
		this.idStr = '&id='+this.imageVersion;
	}
	var tempURL = res.url + sjPBreak(res.url)+'rgn='+(res.x)+','+(res.y)+','+(res.w)+','+(res.h)+
							'&scl='+(res.scl)+this.idStr;
	var timageURL = "";
	var tinURL = "";
	var recURL = "";
	var	requered = false;
	if (typeof inURL != "undefined"){
		timageURL = this.foreImage.img.src.substr(this.foreImage.img.src.indexOf(sjimageServer)+sjimageServer.length);
		tinURL = inURL.substr(inURL.indexOf(sjimageServer)+sjimageServer.length);
		if (timageURL != tinURL){
			requered = true;
			recURL = inURL;
		}
	}else{
		tinURL = tempURL.substr(tempURL.indexOf(sjimageServer)+sjimageServer.length);
		timageURL= this.foreImage.img.src.substr(this.foreImage.img.src.indexOf(sjimageServer)+sjimageServer.length);
		if (timageURL != tinURL){
			requered = true;
			recURL = tempURL;
		}
	}
	if (requered){
		this.foreImage.notChanged = false;
		if (this.foreImage._fadeid) {
			clearTimeout(this.foreImage._fadeid);
			this.foreImage._fadeid = null;
			//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
			this.checkPendingChangeContext();
		}
		this.foreImage.visible(false);
		this.mapImage.visible(false);
		sjSetCursor('wait');
		this.requestShowWaitIcon();
		this.foreImage.load(recURL);
	}else{
		this.foreImage.notChanged = true;
		if (this.foreImage.img.onload){
			this.foreImage.img.onload();
		}
		this.foreImage.fadeIn(this.fadeTime);
		this.mapImage.visible(true);
	}
}

SjZoom.prototype.bx = 0;
SjZoom.prototype.by = 0;
SjZoom.prototype.fx = 0;
SjZoom.prototype.fy = 0;
SjZoom.prototype.ex = 0;
SjZoom.prototype.ey = 0;
SjZoom.prototype.moving=false;
SjZoom.prototype.startDrag=false;

SjZoom.prototype.storeImagesXY = function(){
	this.bx = this.backImage.left();
	this.by = this.backImage.top();
	this.fx = this.foreImage.left();
	this.fy = this.foreImage.top();
}

function sjCrossEvent(event){
	if (!event) var event = window.event;
	if (event.pageX || event.pageY){
		event.posx = event.pageX;
		event.posy = event.pageY;
	} else if (event.clientX || event.clientY){
		event.posx = event.clientX + document.body.scrollLeft;
		event.posy = event.clientY + document.body.scrollTop;
	}
   	event.returnValue = false;
	event.stopPropagation = function() {this.propagate = false};
	event.preventBubble = function() {this.bubble = false};
	event.preventDefault = function() {this.defaultValue = false};
	event.preventDefault();
	event.preventBubble();
	event.stopPropagation();
	return event;
}

SjZoom.prototype.initHandlers = function(){
	var obj = this;

function toStandardMouse(){
	document.onmousemove=null; 
	document.onmouseup=null;
}

function initMouse(o,evt){
	obj.storeImagesXY();
	obj.ex = evt.posx;
	obj.ey = evt.posy;
	obj.startDrag=true;
	sjSetCursor('hand');
		document.onmousemove = function(event){
			moveMouse(o,sjCrossEvent(event));
			return false;
		}; 
		document.onmouseup = function(event){
			finishMouse(o,sjCrossEvent(event));
			return false;
		}; 
		//document.onmouseout = function(event){
		//	finishMouse(o,sjCrossEvent(event));
		//	return false;
		//}; 
	  if (document.all) {
		var map = document.all[obj.pageId];
		if (map){
			var areas = map.all.tags('AREA');
		}
	  } else if (document.getElementsByName) {
		var map = document.getElementsByName(obj.pageId)[0];
		if (map){
			var areas = map.getElementsByTagName('AREA');
		}
	  }
	  if (areas) {
		for (var a = 0; a < areas.length; a++) {
		  areas[a].onmousedown=function(event){
								obj.storeImagesXY();
								obj.ex = sjCrossEvent(event).posx;
								obj.ey = sjCrossEvent(event).posy;
								obj.startDrag=true;
								return false;
							  };
		  areas[a].onmouseup=document.onmouseup;
/*		  areas[a].onmouseup=function(event){
								finishMouse(o,sjCrossEvent(event));
								return false;
							  };*/
		  areas[a].onmousemove=document.onmousemove;
/*		  areas[a].onmousemove=function(event){
			moveMouse(o,sjCrossEvent(event));
			window.status="x:"+sjCrossEvent(event).posx+" y:"+sjCrossEvent(event).posy;
								return false;
							  };
*/	
		
		}
	  }	return false;
}

function moveMouse(o,evt){
	if (obj.startDrag){
		if (obj._animeid){
			clearTimeout(obj._animeid);
			obj._animeid = null;
		}
		obj.moving=true;
		var diffX = evt.posx - obj.ex;
		var diffY = evt.posy - obj.ey;
		obj.setPosition(obj.backImage,obj.bx + diffX,obj.by + diffY,obj.currentScl);
		var x=obj.currentX-obj.bx+obj.fx;
		var y=obj.currentY-obj.by+obj.fy;
		obj.foreImage.toXY(x,y);
	}
	return false;
}

function finishMouse(o,evt){
	if(obj.moving){
		obj.moving=false;
		obj.state = "endPan";
		obj.fireEvent('endZoom');
		obj.fireEvent('zoomPan');
		obj.updateForeImage();
	}else if (obj.startDrag){
		var x =sjGetPageCoords (sjGetElement(obj._elementId)).x;
		var y =sjGetPageCoords (sjGetElement(obj._elementId)).y;
		var newx=evt.posx-obj.currentX-x;
		var newy=evt.posy-obj.currentY-y;
		if ((obj.clickToZoom) && (obj.enableZoom)){
			if (evt.ctrlKey){
				obj.state = "zoomOut";
				obj.ZoomAt(obj.backImage,newx,newy,obj.zoom_factor)
			} else if (!evt.altKey){
				var minScale = Math.max(1 / obj.zoom_factor_limit, obj.defaultScl / Math.pow(obj.zoom_factor , obj.max_zoom));
				if (Math.abs(minScale - obj.currentScl) > 0.000001) {
					obj.state = "zoomIn";
					obj.ZoomAt(obj.backImage,newx,newy,1/obj.zoom_factor)
				}
			} else if (evt.altKey){
				obj.ResetView(obj.backImage);
			}
		}
	}
	obj.startDrag=false;
	sjSetCursor('default');
	toStandardMouse();
	return false;
}
	////////////////waitIcon
	this.waitIcon.addEventListener("load", 
		function (){
			obj.waitIcon.setSize(obj.waitIcon._imageWidth,obj.waitIcon._imageHeight);
			var newx = (obj.viewSize.width - obj.waitIcon.width())/2;
			var newy =(obj.viewSize.height - obj.waitIcon.height())/2;
			var x =sjGetPageCoords (sjGetElement(obj._elementId)).x;
			var y =sjGetPageCoords (sjGetElement(obj._elementId)).y;
			obj.waitIcon.toXY(x+newx,y+newy);
			return false;
		}
	);
	this.waitIcon.addEventHandler('mousedown',initMouse);
	//this.waitIcon.addEventHandler('mousemove',moveMouse);
	this.waitIcon.addEventHandler('mouseup',finishMouse);
	////////////////mapImage
	this.mapImage.addEventListener("load", 
		function (){
			obj.mapImage.visible(true);
			return false;
		}
	);
	this.mapImage.addEventHandler('mousedown',initMouse);
	this.mapImage.addEventHandler('mousemove',moveMouse);
	this.mapImage.addEventHandler('mouseup',finishMouse);
	////////////////backImage
	this.backImage.addEventListener("load", 
		function (){
			if ((obj.initialLoading) || (obj.initFromPersistence)){
				obj.fireEvent('load');
			}else{
				obj.fireEvent('page','pageId',obj.pageId,'label',obj.imgLabel);
			}
			obj.backImage.setSize(obj.imgServerWidth / obj.currentScl,obj.imgServerHeight / obj.currentScl);
			obj.setPosition(obj.backImage,obj.currentX,obj.currentY,obj.currentScl);
			obj.backImage.visible(true);
			obj.mapImage.visible(false);
			if(obj.initRGNZone){
				obj.changingImage=false;
				//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
				obj.checkPendingChangeContext();
				obj.ZoomSet(obj.initRGNZone,obj.RGNtype);
				if (obj.initFromPersistence) {
					obj.initRGNZone = null;
				}
				if (!obj.initialLoading){
					obj.foreImage.fadeOut(obj.turnTime/2);
				}else{
					obj.updateForeImage();
				}
			}else{
				if (!obj.initialLoading){
					obj.foreImage.fadeOut(obj.turnTime/2);
					setTimeout(obj+'.updateForeImage()',obj.turnTime/2);
				}else{
					obj.updateForeImage();
				}
			}
			var metaStr = "";
			if (obj.metaVersion){
				metaStr = '&id='+obj.metaVersion;
			}
			if (obj.hotSpotEnable){
				obj.mapImage.visible(false);
				sjLoadMap(obj.mainURL+metaStr,1/obj.currentScl, 1/obj.currentScl,obj._elementId,
						function (){
							obj.setMapper("s7map_"+obj._elementId,
									function (){
										obj.enableZoom = false;
										obj.fireEvent('item','href',this.href,'alt',this.alt,'rolloverKey',this.rollover_key);
										return false;//may be delete?
									},
									function (){
										obj.enableZoom = true;
										return false;//may be delete?
									},
									function (){
										obj.fireEvent('href','href',this.href);
										return false;//may be delete?
									}
								)
							obj.mapImage.map("s7map_"+obj._elementId);
							obj.mapImage.visible(true);
							return false;//may be delete?
						}
					);
			}
			obj.initialLoading	= false;
			obj.initFromPersistence = false;
			return false;
		}
	);

	////////////////foreImage
	this.foreImage.addEventListener("load", 
		function (){
			var scl=obj.currentScl;
			if (scl < 1){
				scl/=obj.lastScl; 
				obj.foreImage.setSize(obj.foreImage._imageWidth/scl,obj.foreImage._imageHeight/scl);
			}else{
				obj.foreImage.setSize(obj.foreImage._imageWidth,obj.foreImage._imageHeight);
			}
			var fadeTime;
			if (obj.changingImage){
				fadeTime = obj.turnTime/2;
				//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
				setTimeout(obj+'.changingImage=false;'+obj+'.checkPendingChangeContext();'+obj+'.callStack();',fadeTime);
			}else{
				fadeTime = obj.fadeTime;
			}
			if ((!obj._animeid)&&(!obj.foreImage.notChanged)){
				obj.foreImage.fadeIn(fadeTime);
				obj.mapImage.visible(true);//??
			}
			obj.foreImage.visible(true);
			sjSetCursor('default');
			obj.requestHideWaitIcon();
			obj.state = "zoomForeImageLoad";
			//obj.fireEvent('zoomForeImageLoad','viewer',obj);
			obj.fireEvent('endZoom');
			//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
			obj.checkPendingChangeContext();
			return false;
		}
	);
	this.foreImage.addEventHandler('mousedown',initMouse);
	//this.foreImage.addEventHandler('mousemove',moveMouse);
	this.foreImage.addEventHandler('mouseup',finishMouse);
	////////////////buttons
	this.closeButton.addEventHandler('click',
		function (o,evt){
			//window.open( '../dhtml/window_closer.html','DHTMLZoomCloser','width=300,height=300');
		   var reply = confirm("The Web page you are viewing is trying to close the window" +
				"\n \nDo you want to close this DHTMLZoomViewer window?");
			if (reply) {
				top.close();
			}
			return false;
		}
	);
	this.plusButton.addEventHandler('click',
		function (o,evt){
			obj.ZoomIn(obj.backImage);	
			return false;
		}
	);
	this.minusButton.addEventHandler('click',
		function (o,evt){
			obj.ZoomOut(obj.backImage);	
			return false;
		}
	);
	this.resetButton.addEventHandler('click',
		function (o,evt){
			obj.ResetView(obj.backImage);
			return false;
		}
	);
	this.infoButton.addEventHandler('click',
		function (o,evt){
			obj.showInformation();
			return false;
		}
	);
}

//////////////////////////////////
SjZoom.prototype.ZoomInit = function(rgn,type) {
	if(( type=="rgnn" ) || (type == 'rgna') || (type == 'rgn')){ 
		if( type == "rgnn" ){	
			this.RGNtype = "rgnn";
		}else if( type == "rgn" ){
			this.RGNtype = "rgn";
		}else  if( type == "rgna" ){
			this.RGNtype = "rgna";
		}
		this.initRGNZone = rgn;
	}
};

SjZoom.prototype.setMaxZoom = function(numZoomLevels, amount,limit) {
	if( ""+amount == "undefined" || amount==null ) amount=2;
	if( amount <= 1 ) amount = 1.1;
//	if( amount > 3 ) amount = 3;
	this.zoom_factor = amount;
	this.max_zoom = numZoomLevels;
	this.orig_max_zoom = numZoomLevels;
	this.zoom_factor_limit = limit || 0.0;
};

SjZoom.prototype.advanced = function( zoomAmount,tiles,percision, transitionLoops, buf_size ) {
	this.zoom_factor = Math.max(1.1,zoomAmount);
	this.panPercision = Math.max(1,parseInt(percision));
	if( buf_size || buf_size == 0 ) this.tileSize.width = Math.max(0,buf_size);
};

SjZoom.prototype.enableNav = function(position,inX,inY,inWidth,inHeight) {
   if (this.navLayer == null){
		var tszoom_nav = null;
		if( position >= 1 && position <= 4 ) {
			tszoom_nav = new SjZoomNav(this._parent,null,null,'absolute',null,this.transparency);
		}else if( position > 4 ) {
			tszoom_nav = new SjZoomNav(this._parent,inWidth || null,inHeight || null,'absolute',null,this.transparency);
		}
		tszoom_nav.setViewer(this);
		//??tszoom_nav.initHandlers();
		//??tszoom_nav.navImage.load(this.navloadURL);
		if (this.navloadURL){
			tszoom_nav.dblnavImage.load(this.navloadURL);
		}
   }
	var x =this.left();
	var y =this.top();
	this.navInfo.width = inWidth || this.navInfo.width;
	this.navInfo.height = inHeight || this.navInfo.height;
	if( position >= 1 && position <= 4 ) {
		this.navInfo.pos = position;
		switch(position){
			case 1:	this.navInfo.x = x + 5; 
					this.navInfo.y = y  + 5; 
					break;
			case 2:	this.navInfo.x = x + this.width() - this.navLayer.width() - 5; 
					this.navInfo.y = y  + 5; 
					break;
			case 3:	this.navInfo.x = x + this.width() - this.navLayer.width() - 5; 
					this.navInfo.y = y  + this.height() - this.navLayer.height() - 5;
					break;
			case 4:	this.navInfo.x = x + 5; 
					this.navInfo.y = y  + this.height() - this.navLayer.height() - 5;
					break;
		}
	}else if( position > 4 ) {
		this.navInfo.x = x+inX || 0;
		this.navInfo.y = y+inY || 0;
	};

	if (this.navLayer){
		this.navLayer.setSize(this.navInfo.width,this.navInfo.height);
		this.navLayer.toXY(this.navInfo.x,this.navInfo.y);
		this.navLayer.visible(true);
		this.navLayer.zIndex(this.foreImage.zIndex()+10);
	}
	return (this.navLayer);
}
    
SjZoom.prototype.NavigBox = function(){
	if (this.navLayer)
		this.navLayer.visible(!this.navLayer.visible());
}

SjZoom.prototype.setFormat = function(str) {
	this.format = str; 
};

SjZoom.prototype.setCachingModel = function(str) {	
	this.cachingModel = str; 
};

SjZoom.prototype.addInformation = function(str) {
	//this.infotxt = "alert('"+str+"')";
};

SjZoom.prototype.showInformation = function() {
	if( this.infotxt.length != 0 )	{ 
		eval(this.infotxt); 
	}  
	else{
		window.open( '../dhtml/helppage.html','DHTMLZoomInfo','width=300,height=400' );
	};  
};

SjZoom.prototype.setHelpPage = function(str,w,h) {
	if( ""+str == "undefined" )  	
		this.infotxt = "window.open('../dhtml/helppage.html','DHTMLZoomInfo','width="+w+",height="+h+"')";
	else
		this.infotxt = "window.open('"+str+"','DHTMLZoomInfo','width="+w+",height="+h+"')";
};

SjZoom.prototype.enableUI = function(imgFolder,offset,spacing) {
	if( ""+this.imgFolder == "undefined" ) this.imgFolder= null;
	this.imgFolder	= imgFolder || "../dhtml/images/default/";
	if( this.imgFolder.substring(this.imgFolder.length-1,this.imgFolder.length) != "/" ) this.imgFolder+="/";
	if( ""+offset == "undefined" ) offset=0;
	if( ""+spacing == "undefined" ) spacing=0;

	this.buttonOffset = 0 || offset;
	this.buttonSpace = 0 || spacing;

		if( this.imgFolder != null ) {
			var infoShift = (this.infotxt!=""?1:0);
			var buttonSize = new Array(20,20);

			this.plusButton.toXY(this.viewSize.width-1-(3+infoShift)*(buttonSize[0]+this.buttonSpace),
								 this.viewSize.height-this.buttonOffset);
			this.minusButton.toXY( this.viewSize.width-1-(2+infoShift)*(buttonSize[0]+this.buttonSpace),
								this.viewSize.height-this.buttonOffset);
		 
			this.resetButton.toXY( this.viewSize.width-1-(1+infoShift)*(buttonSize[0]+this.buttonSpace),
								this.viewSize.height-this.buttonOffset);

			if( this.infotxt != "" ) {
				this.infoButton.toXY( this.viewSize.width-1-infoShift*(buttonSize[0]+this.buttonSpace),
									this.viewSize.height-this.buttonOffset);
			};
			
			//this.closeButton.load(this.imgFolder+'close.gif');
			this.plusButton.load(this.imgFolder+'zoomin.gif');
			this.minusButton.load(this.imgFolder+'zoomout.gif');
			this.resetButton.load(this.imgFolder+'reset.gif');
			this.infoButton.load(this.imgFolder+'info.gif');
			//this.closeButton.visible(false);
			this.plusButton.visible(true);
			this.minusButton.visible(true);
			this.resetButton.visible(true);
			if( this.infotxt != "" ) {
				this.infoButton.visible(true);
			}
		};
};

SjZoom.prototype.setWaitIconURL = function(inURL){
	if (this.waitIcon){
		this.waitIconURL = inURL || null;
		if((this.waitIconURL != null) && (this.waitIconURL != "")){		
			this.waitIcon.load(this.waitIconURL);
		}
	}
}

SjZoom.prototype.setWaitIconTimer = function(inShowDelay, inHideDelay){
		this.waitIconTimer.showDelay = inShowDelay || 500;
		this.waitIconTimer.hideDelay = inHideDelay || 100;
}

SjZoom.prototype.requestHideWaitIcon = function(){
	if (this.waitIconTimerId){
		clearTimeout(this.waitIconTimerId);
		this.waitIconTimerId = null;
	}
	if (this.waitIconURL)
		this.waitIconTimerId = setTimeout(this+".waitIcon.visible(false)", this.waitIconTimer.hideDelay);
}

SjZoom.prototype.requestShowWaitIcon = function(){
		if (this.waitIconTimerId){
			clearTimeout(this.waitIconTimerId);
			this.waitIconTimerId = null;
		}
	if (this.waitIconURL)
	    this.waitIconTimerId = setTimeout(this+".waitIcon.visible(true)", this.waitIconTimer.showDelay);
}

SjZoom.prototype.enableCloseButton = function(position){
	this.closebutton_pos = position;
		if( this.closebutton_pos >= 1 && this.closebutton_pos <= 4 ) {
			this.closeButton.load(this.imgFolder+'close.gif');
			this.closebutton_x = 5; this.closebutton_y = 5;
			if( this.closebutton_pos == 2 || this.closebutton_pos == 3 ) this.closebutton_x = this.viewSize.width-this.closebutton_w-5; 
			if( this.closebutton_pos == 3 || this.closebutton_pos == 4 ) this.closebutton_y = this.viewSize.height-this.closebutton_h-5;
			this.closeButton.toXY(this.closebutton_x,this.closebutton_y);
			this.closeButton.visible(true);
		};
}

SjZoom.prototype.callStack = function(){
	if (this.stack){
		var str="";
		for (var i=0;i<this.stack.args.length;i++){
			if (i>0){
				str += ","+this+".stack.args["+i+"]";
			}else{
				str += this+".stack.args["+i+"]";
			}
		}
		eval(this+"."+this.stack.name+"("+str+")");
		this.stack = null;
	}
}

//XXX01 avu 22.09.2005: fixed issue #4696 - DHTML generic zoom - clicking swatch sometimes doesn't update main image.
SjZoom.prototype.checkPendingChangeContext = function(){
	if (this.pendingChangeContext != null) {
		var url = this.pendingChangeContext.url;
		var x = this.pendingChangeContext.x;
		var y = this.pendingChangeContext.y;
		var scale = this.pendingChangeContext.scale;
		var defaultScl = this.pendingChangeContext.defaultScl;
		var width = this.pendingChangeContext.width;
		var height = this.pendingChangeContext.height;
		var version = this.pendingChangeContext.version;
		var pageId = this.pendingChangeContext.pageId;
		this.pendingChangeContext = null;
		this.changeContext(url, x, y, scale,defaultScl,width,height,version,pageId);
	}
};

///////////////
//range -1 .. 1
SjZoom.prototype.setAlign = function (inX,inY){
	this.alignX = inX || 0;
	this.alignY = inY || 0;
}

function SjEvent(inViewer){
	this.viewer = inViewer;
}

SjEvent.prototype.onEvent = function(inType,inHandler){
	this.viewer.addEventListener(inType,inHandler); 
}

SjEvent.prototype.onZoom = function(inType){
	this.viewer.addEventListener(inType,inHandler); 
}

///////////////
function SjURL(inURL){
	if(inURL.length==0) return null;
	this.url=inURL;
	this.port='';
	this.protocol='';
	this.host='';
	var protocolIdx=this.url.indexOf('://');
	if(protocolIdx>=0){
		this.protocol=this.url.substring(0,protocolIdx).toLowerCase();
		this.host=this.url.substring(protocolIdx+3);
		if(this.host.indexOf('/')>=0) this.host=this.host.substring(0,this.host.indexOf('/'));
		var atIdx=this.host.indexOf('@');
		if(atIdx>=0){
			var credentials=this.host.substring(0,atIdx);
			var colonIndex=credentials.indexOf(':');
			if(colonIndex>=0){
				this.username=credentials.substring(0,colonIndex);
				this.password=credentials.substring(colonIndex);
			}else{
				this.username=credentials;
			}
			this.host=this.host.substring(atIdx+1);
		}
		var portIdx=this.host.indexOf(':');
		if(portIdx>=0){
			this.port=this.host.substring(portIdx);
			this.host=this.host.substring(0,portIdx);
		}
		this.file=this.url.substring(protocolIdx+3);
		this.file=this.file.substring(this.file.indexOf('/'));
	}else{
		this.file=this.url;
	}
}

SjZoom.prototype.getImageWidth = function(){
	return (this.imgServerWidth); 
}

SjZoom.prototype.getImageHeight = function(){
	return (this.imgServerHeight);
}

////////
SjZoom.prototype.setClickToZoom = function(inState){
	return (this.clickToZoom = inState);
}

function compareNumbers(a, b) {
    return b - a;
}
function compareNumbersDesc(a, b) {//descending order
    return b - a;
}

SjZoom.prototype.setZoomScl = function(inArray){
	if (typeof inArray != 'undefined'){
		this.zoomSclArray = new Array();
		if (inArray[0] == 0){
			this.zoomScl = false;
		}else{
			this.zoomScl = true;
			this.zoomSclArray[0]=this.defaultScl/Math.pow(this.zoom_factor , 0);
			for (var i=0;i<inArray.length;i++){
				this.zoomSclArray.push(inArray[i]);
			}
		}
		this.zoomSclArray.sort(compareNumbersDesc);
	}else{
		this.zoomScl = false;
	}
}

SjZoom.prototype.setMapper = function(inMapName,inOver,inOut,inDown){
	if(inMapName){
	  if (document.all) {
		var map = document.all[inMapName];
		if (map){
			var areas = map.all.tags('AREA');
		}
	  } else if (document.getElementsByName) {
		var map = document.getElementsByName(inMapName)[0];
		if (map){
			var areas = map.getElementsByTagName('AREA');
		}
	  }
	  if (areas) {
		for (var a = 0; a < areas.length; a++) {
		  areas[a].onmouseover=inOver;
		  areas[a].onmouseout=inOut;
		  areas[a].onmousedown=inDown;
		}
	  }
	}
}
