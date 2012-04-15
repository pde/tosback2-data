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

function SjElement(inParent, inElementId) {
	if (arguments[0] == 'empty') {
		return;
	}
    this._parent = inParent || self;
    this.window = (inParent && inParent.window) || self;
    this.document = (inParent && inParent.document) || self.document;
	this.name=this._elementId = inElementId || 'SjElement'+parseInt(SjElement.Count++);
    this.tag = null;
	this._x = 0;
	this._y = 0;
	this._z = 0;
	this._width = 0;
	this._height = 0;
	this._visible = false;
	this._opacity = 100;
	this._fadeTime = 2000;
	this._color = '';
	this._backColor = '';
	this._backImage = '';
	this._fadeid = null;
	this._content = sjGetElement(this._elementId);
	if (this._content){
		this._content._draggable = false;
	}
	SjElement.all[this._elementId] = this;
}

SjElement.prototype.getParent = function() {
	return this._parent;
};

SjElement.prototype.getElementId = function() {
	return this._elementId;
};

SjElement.prototype.getElement = function() {
	return sjGetElement(this._elementId);
};

SjElement.prototype.toString = function () {
	return 	'SjElement.all["'+this._elementId+'"]';
};

SjElement.prototype.visible = function(inVisible) {
	var the_element = sjGetElementStyle(this._elementId);
	if (inVisible != null && the_element) {
		this._visible = inVisible;
		if (inVisible) {
			//the_element.visibility = 'visible';
			the_element.visibility = 'inherit';
		} else {
			the_element.visibility = 'hidden';
		}
	}
	return this._visible;
}

SjElement.prototype.pageXY = function() {
		return sjGetPageCoords (sjGetElement(this._elementId));
};

SjElement.prototype.left = function(inX) {
	if (inX == null) {
		return this._x;
	} else {
   if (document.getElementById) {
      this._content.style.left=parseInt(inX)+'px';
   } else if (document.all) {
      this._content.style.pixelLeft=parseInt(inX)+'px';
   }
		this._x = parseInt(inX);
		this.fireEvent('setXY');
		return this._x;
	}
};

SjElement.prototype.top = function (inY) {
	if (inY == null) {
		return this._y;
	} else {
   if (document.getElementById) {
      this._content.style.top=parseInt(inY)+'px';
   } else if (document.all) {
      this._content.style.pixelTop=parseInt(inY)+'px';
   } 
		this._y = parseInt(inY);
		this.fireEvent('setXY');
		return this._y;
	}
};

SjElement.prototype.toXY = function(inX,inY) {
	var xy={x:this.left(inX),y:this.top(inY)};
	this.fireEvent('setXY');
	return xy;
}

SjElement.prototype.width = function (inWidth) {
	if (inWidth == null) {
		return this._width;
	} else {
	   if (document.getElementById)
		  this._content.style.width=inWidth+'px';
	   else if (document.all)
		  this._content.style.posWidth=inWidth+'px';
		this._width = inWidth;
		this.fireEvent('setSize');
		return this._width;
	}
};

SjElement.prototype.height = function (inHeight) {
	if (inHeight == null) {
		return this._height;
	} else {
	   if (document.getElementById)
		  this._content.style.height=inHeight+'px';
	   else if (document.all)
		  this._content.style.posHeight=inHeight+'px';
		this._height = inHeight;
		this.fireEvent('setSize');
		return this._height;
	}
};

SjElement.prototype.setSize = function (inWidth,inHeight) {
	var size={w:this.width(inWidth),h:this.height(inHeight)};
	this.fireEvent('setSize');
	return size;
};

SjElement.prototype.clip = function (inLeft,inTop,inRight,inBottom) {
		var the_element = sjGetElementStyle(this._elementId);
		var bw=parseInt(the_element.borderWidth);
		if (bw){
			sjSetClip(this._elementId,this._x,this._y,inTop,inRight+2*bw,inBottom+2*bw,inLeft);
		}else{
			sjSetClip(this._elementId,this._x,this._y,inTop,inRight,inBottom,inLeft);
		}
};

SjElement.prototype.setBorder = function (width,style,color){ 
   stl=sjGetElementStyle(this._elementId);
	stl.borderWidth = width + "px" || 0;  
	stl.borderStyle = style || 'solid';
	stl.borderColor = color || '#000000';
}

SjElement.prototype.getBorder = function (){ 
   stl=sjGetElementStyle(this._elementId);
	return parseInt(stl.borderWidth);  
}

SjElement.prototype.opacity = function (inOpacity) {
	if (inOpacity != null) {
		var e = sjGetElement(this._elementId);
	    if(inOpacity < 0) inOpacity = 0; 
		if(inOpacity > 99) inOpacity = 99;
		e.style.opacity = (inOpacity / 100);
		e.style.MozOpacity = (inOpacity / 100);
		e.style.KhtmlOpacity = (inOpacity / 100);
		e.style.filter = "alpha(opacity=" + inOpacity + ")";
		this._opacity = inOpacity;
	}
	return this._opacity;  
}

SjElement.prototype.zIndex = function (inZ) {
	if (inZ == null) {
		return this._z;
	} else {
		sjSetZIndex(this._elementId,inZ);
		this._z = inZ;
		return sjGetZIndex(this._elementId);
	}
};

SjElement.prototype.setFadeTime = function(inFadeTime) {
	this._fadeTime = inFadeTime;
};

SjElement.prototype.fadeIn = function(inFadeTime){
    if (this._fadeid) {
		clearTimeout(this._fadeid);
		this._fadeid = null;
	}
	this._opacity=0;
	this.fadeStartTime = new Date().getTime();
	this.fadeStartOpacity = this._opacity;
	this.fadeTo(99,inFadeTime);
};

SjElement.prototype.fadeOut = function(inFadeTime){
    if (this._fadeid) {
		clearTimeout(this._fadeid);
		this._fadeid = null;
	}
	this._opacity=99;
	this.fadeStartTime = new Date().getTime();
	this.fadeStartOpacity = this._opacity;
	this.fadeTo(0,inFadeTime);
};

SjElement.prototype.fadeTo = function(inOpacity,inFadeTime){
	if(this._opacity==null) return;
	
	var dt = new Date().getTime() - this.fadeStartTime;
	if (dt >= inFadeTime) {
	    this.opacity(inOpacity);
	    this.visible((this._opacity > 0)? true:false);
		clearTimeout(this._fadeid);
		this._fadeid = null;
		if (typeof this.afterFade == 'function'){
			this.afterFade(arguments.callee);
		}
		return;
	} else {
		var newOpacity = Math.round(this.fadeStartOpacity + (inOpacity - this.fadeStartOpacity) * dt / inFadeTime);
	    this.opacity(newOpacity);
	    this.visible((this._opacity > 0)? true:false);
		this._fadeid=setTimeout(this+'.fadeTo('+inOpacity+','+inFadeTime+')',5);
	}
};

SjElement.prototype.color = function (inColor) {
	if (inColor == null) {
		return this._color;
	} else {
		sjSetBackColor(this._elementId,inColor);
		this._color=inColor;
		return this._color;
	}
};

SjElement.prototype.background = function (inBackColor,inBackImage) {
    if (inBackColor)
		this._backColor = inBackColor;
    if (inBackImage)
		this._backImage = inBackImage;
};

//System Event
//event{type,x,y,button,keyCode,shiftKey,ctrlKey,altKey} 
SjElement.prototype.addEventHandler = function(eventName, handler){
	var obj = this;
	var x = 0;
	var y = 0;
	this._content = sjGetElement(this._elementId);
	this._content["on"+eventName.toLowerCase()] = function(event){ 
		if (!event) var event = window.event;
		var target = null;
		if (event.target) {
			target = (event.target.nodeType == 3) ? event.target.parentNode : event.target;
	    } else {
		    target = event.srcElement;
		}

		if (event.modifiers){
			event.shiftKey = ((event.modifiers & Event.SHIFT_MASK) != 0);
			event.altKey = ((event.modifiers & Event.ALT_MASK) != 0);
			event.ctrlKey = ((event.modifiers & Event.CONTROL_MASK) != 0);
			event.button	= event.which;
			event.keyCode	= event.which;
		}
		if (event.pageX || event.pageY){
			event.posx = event.pageX;
			event.posy = event.pageY;
		} else if (event.clientX || event.clientY){
			event.posx = event.clientX + document.body.scrollLeft;
			event.posy = event.clientY + document.body.scrollTop;
		}

            return handler(obj, event , target);
	}
}

SjElement.prototype.removeEventHandler = function(eventName, handler){
	this._content["on"+eventName.toLowerCase()] = null;
}

//Event
SjElement.prototype.makeEventObject = function(inAarguments){
	var eventobject = new Object();
	eventobject["type"] = inAarguments[0];
	eventobject["target"] = this;
	for (i = 1; i < inAarguments.length; i+=2){
		eventobject[inAarguments[i]] = inAarguments[i+1];
	}
	return eventobject;
};

SjElement.prototype.addEventListener = function(inType, inHandler){
	inType = inType.toLowerCase();
	if (!this.hashtable_eventlisteners){
		this.hashtable_eventlisteners = new SjHashtable();
	}
	var arrListeners = this.hashtable_eventlisteners.get(inType);
	if (!arrListeners){
		arrListeners = new Array();
		this.hashtable_eventlisteners.put(inType, arrListeners);
	}
	var index = this.indexOfEventListener(inType, inHandler);
	if (index == -1){
		arrListeners.push(inHandler);
	}
};

SjElement.prototype.removeEventListener = function(inType, inHandler){
	inType = inType.toLowerCase();
	if (this.hashtable_eventlisteners){
		var arrListeners = this.hashtable_eventlisteners.get(inType);
		if (arrListeners){
			var index = this.indexOfEventListener(inType, inHandler);
			if (index != -1){
				var arrListeners_temp = new Array();
				for (var i = 0; i < arrListeners.length; i++){
					if (arrListeners[i] != inHandler){
						arrListeners_temp.push(arrListeners[i]);
					}
				}
				this.hashtable_eventlisteners.put(inType, arrListeners_temp);
			}
		}
	}
};

SjElement.prototype.fireEventObject = function(inEvent){
	if (this.hashtable_eventlisteners && this.hashtable_eventlisteners.size() > 0){
		var arrListeners = this.hashtable_eventlisteners.get(inEvent.type.toLowerCase());
		if (arrListeners){
			var index;
			for (index = 0; index < arrListeners.length; index++){
				arrListeners[index](inEvent);
			}
		}
	}
};


SjElement.prototype.fireEvent = function(){
	var eventobject = this.makeEventObject(arguments);
	this.fireEventObject(eventobject);
};

SjElement.prototype.indexOfEventListener = function(inType, inHandler){
	var result = -1;
	inType = inType.toLowerCase();
	var index;
	if (this.hashtable_eventlisteners){
		var arrListeners = this.hashtable_eventlisteners.get(inType);
		if (arrListeners){
			for (index = 0; index < arrListeners.length; index++){
				if (arrListeners[index] == inHandler){
					result = index;
					break;
				}
			}
		}
	}
	return result;
};
////

SjElement.Count = 0;
SjElement.all = [];
