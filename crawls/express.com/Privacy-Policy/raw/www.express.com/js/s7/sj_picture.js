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

function SjPicture(inParent, inElementId,inWidth,inHeight,transparency) {
	if (arguments[0] == 'empty') {
		return;
	}
	this.SjElement = SjElement;
	this.SjElement(inParent, inElementId);
	if (this._parent && this._parent._elementId){
		sjCreateDiv(this._parent._elementId , this._elementId);
	}else{
		sjCreateDiv(null , this._elementId);
	}
	if (typeof tsj != 'undefined'){
		this.codePath		= tsj.path;
	}else if(typeof sj != 'undefined'){
		this.codePath		= sj.path;
	}else{
		this.codePath		= '/assets/';
	}

	this.transparency = transparency || false;
	this._imageWidth = 0;
	this._imageHeight = 0;
	this._stretch = false;
	this.scale = 1;
	this.loaded = false;
	this.img = new Image();
	this.img._uId = this._elementId + '_img';
    this.img.str = ' <img';
	this.img.str += ' id=' + this.img._uId;
	this.img.str += ' name=' + this.img._uId;
	this.img.str += ' border=' + 0;
	this.img.str += ' style="position:absolute;left:0;top:0;"';
	this.img.str += '> ';
    sjSetLayerHTML(this._elementId,this.img.str);
	this._content = sjGetElement(this._elementId);
	this.imageElm = sjGetElement(this.img._uId);
	this.imageElm._parent = this;
	this.useMap='';
	this.imageElm.useMap='';
	this.img._parent = this;	
}

SjPicture.prototype = new SjElement('empty');

SjPicture.prototype.load = function(inURL) {
	var nURL = new SjURL(inURL);//tempo
	var cURL = new SjURL(this.img.src);//tempo
	if (nURL.file == cURL.file) {//tempo
		if ((this.loaded == true)&&(this.img.complete==true)){//check for complete loading of image 
			this.img.onload = this.onLoad;
			this.img.style.width = this._imageWidth;
			this.img.style.height = this._imageHeight;
			this.img.onload();
		}
		return;
	}
	this.loaded = false;
	if (document.all) {
		sjGetElement(this.img._uId).outerHTML=this.img.str;
		this.imageElm = sjGetElement(this.img._uId);
		this.imageElm._parent = this;
		this.img._parent = this;
	}else{
		this.imageElm.style.width="";
		this.imageElm.style.height="";
	}	
	this.imageElm.onload=this.onLoad;
	this.imageElm.onerror=this.onError;
	this.imageElm.onabort=this.onAbort;
	this.imageElm.src = inURL;
	this.img.src = inURL;
	this.imageElm.useMap = this.useMap;
};

SjPicture.prototype.onLoad = function() {
	this._parent.loaded = true;
	this._parent._imageWidth = this.width;
	this._parent._imageHeight = this.height;
	this._parent.stretch(this._parent.stretch());
	//////IE png support
	var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
	var haveFilters = null;
	if ((version >= 5.5) && (version <= 8)){
			try {
				haveFilters = document.body.filters;
			}catch(e){
				//alert();
			}
	}
	if ((version >= 5.5) && (version <= 8) && (haveFilters != null)){
		var img = this;
		if (this._parent.transparency){
			var imgID = (img.id) ? "id='" + img.id + "' " : "";
			var imgName = (img.name) ? "name='" + img.name + "' " : "";
			var imgBorder = (img.border) ? "border='" + img.border + "' " : "";
			var imgStyle = "display:inline-block;" + img.style.cssText;
			var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
			var imgAlt = (img.alt) ? "alt='" + img.alt + "' " : "alt='" + img.alt + "' ";
			if (img.useMap){  
				strAddMap = "<img style=\"position:relative; left:-" + img.width + "px;"
				+ "height:" + img.height + "px;width:" + img.width +"\" "
				+ "src=\"" + this._parent.codePath+"images/spacer.gif" + "\" usemap=\"" + img.useMap 
				+ "\" border=\"" + img.border + "\">"
			 }
			 var strNewHTML = "<img " + imgID + imgName + imgTitle + imgAlt + imgBorder
							 + ' src='+this._parent.codePath+"images/spacer.gif"
							 + " style=\"" + imgStyle + ";"
							 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
							 + "(src=\'" + img.src + "\', sizingMethod='scale');"
							 + "\">";
			if (img.useMap){
				strNewHTML += strAddMap;
			}
			img.outerHTML = strNewHTML;
		 }
	}
	/////////
	this._parent.fireEvent('load');
};

SjPicture.prototype.onError = function() {
	this._parent.loaded = false;
	this._parent.fireEvent('error');
};

SjPicture.prototype.onAbort = function() {
	this._parent.loaded = false;
	this._parent.fireEvent('abort');
};

SjPicture.prototype.stretch = function(inStretch) {
	if (inStretch != null) {
		this._stretch = inStretch;
		var w = this.width();
		var h = this.height();
		if (this._stretch) {
			sjSetWidth(this.img._uId, this._width);
			sjSetHeight(this.img._uId, this._height);
		} else {
			sjSetWidth(this.img._uId, this._imageWidth);
			sjSetHeight(this.img._uId, this._imageHeight);
		}
			sjZoomMap (this.imageElm.useMap.substring(1), this.width()/w, this.height()/h);
	}
	return this._stretch;
};

SjPicture.prototype.super_width = SjPicture.prototype.width;
SjPicture.prototype.width = function(inWidth) {
	var w = this.super_width();
	var h = this.super_height();
	var ret = this.super_width(inWidth);
	if (inWidth != null) {
			if (this._stretch) {
				sjSetWidth(this.img._uId, this._width);
				sjSetHeight(this.img._uId, this._height);
			}
			sjZoomMap (this.imageElm.useMap.substring(1), this.width()/w, this.height()/h);
	}
	return ret;
};

SjPicture.prototype.super_height = SjPicture.prototype.height;
SjPicture.prototype.height = function(inHeight) {
	var w = this.super_width();
	var h = this.super_height();
	var ret = this.super_height(inHeight);
	if (inHeight != null) {
			if (this._stretch) {
				sjSetWidth(this.img._uId, this._width);
				sjSetHeight(this.img._uId, this._height);
			}
			sjZoomMap (this.imageElm.useMap.substring(1), this.width()/w, this.height()/h);
	}
	return ret;
};

SjPicture.prototype.map = function(inMap) {
	if (inMap!= null){
	  this.imageElm.useMap=this.useMap='#'+inMap;
	}else
	return this.imageElm.useMap;
};

SjPicture.prototype.clearMap = function() {
	  this.imageElm.useMap=this.useMap='';
};
