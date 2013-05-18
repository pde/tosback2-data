/*
ADOBE SYSTEMS INCORPORATED
Copyright 2007 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the terms of the
Adobe license agreement accompanying it.  If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior written permission of Adobe.
*/

/* **** This is a compilation of all scene7.4.3 files ****
*
* Some functions edited by sshepard (as indicated) for greater flexibility, bug fixes and additional features.
* For simplicity, we assume the inclusion of jQuery.
* */

/***** sj_resource.js *****/
sj_resource = new Object();
sj_resource.getResource  = function(inString){
var res = inString;
	for (var key in this) {
		if (typeof key == 'string') {
			var old;
			do {
				old = res
				res = res.replace('%' + key + '%', this[key]);
			} while (old != res);
		}
	}

	return res;
}
sj_resource.NOT_FOUND = "Not found";
sj_resource.INVALID_PARAMETER = "Invalid parameter";
sj_resource.IMAGE_IS_NOT_SPECIFIED = "image is not specified";
sj_resource.CONTEXT_PROCESSING_FAILED = "context processing FAILED";
sj_resource.ERROR = "Error";
sj_resource.THERE_WAS_A_PROBLEM_RETRIEVING_DATA = "There was a problem retrieving data";
sj_resource.ERROR_LOADING_CONTEXT = "Error loading context";
sj_resource.PROBLEMS = "Problems";
sj_resource.HANDLER_COULD_NOT_BE_ATTACHED = "Handler could not be attached";
sj_resource.HANDLER_COULD_NOT_BE_REMOVED = "Handler could not be removed";
sj_resource.TO_PREVIOUS_PAGE = "To previous page";
sj_resource.TO_NEXT_PAGE = "To next page";
sj_resource.PLEASE_TRY_AGAIN_LATER = 'Please try again later...';
sj_resource.PAGE_XX_YY = 'Page %2*idx%-%2*idx+1%';


/***** sj_config.js *****/
function S7ConfigObject(inVersion,inViewerRoot,inRoot)
{
	this.isVersion		= inVersion || "2.8";
	this.isViewerRoot	= inViewerRoot || "/is-viewers";
	this.isRoot		= inRoot || "/is/image/";
}

var S7Config		= new S7ConfigObject();

var sjroot		= S7Config.isViewerRoot;
var sjimageServer	= S7Config.isRoot;



/***** sj_core.js *****/
if(Array.prototype.push && ([0].push(true)==true))
	Array.prototype.push = null;

if(!Array.prototype.push) {
	function array_push() {
		for(var i=0;i<arguments.length;i++){
			this[this.length]=arguments[i]
		};
		return this.length;
	}
	Array.prototype.push = array_push;
}

if(!Array.prototype.pop) {
	function array_pop(){
	    lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
	    return lastElement;
	}
	Array.prototype.pop = array_pop;
}


String.prototype.doubleNewlines = function() {
	return this.replace( /(\r?\n|\r){1,2}/g, '\n\n' );
}

function sjPBreak(str) {
	return( (str.indexOf("?")>=0?"&":"?") );
};

sjDelimList = [' ', '\n', '\r'];

function sjGetKeyValue(inS, inKey) {
	var keyIdx = inS.indexOf(inKey);
	if (keyIdx == -1) {
		return null;
	}
	var eqIdx = inS.indexOf('=', keyIdx + inKey.length);
	if (eqIdx == -1) {
		return null;
	}
	var valStartIdx = eqIdx + 1;
	while ((valEndIdx < inS.length) && (inS.charAt(valStartIdx) == ' ')) {
		valStartIdx ++;
	}
	if (valStartIdx >= inS.length - 1) {
		return null;
	}
	var valEndIdx = valStartIdx + 1;
	while ((valEndIdx < inS.length) && !sjIsLineDelim(inS.charAt(valEndIdx))) {
		valEndIdx ++;
	}
	return inS.substring(valStartIdx+1, valEndIdx);
};

function sjIsLineDelim(inChar) {
	for (var i = 0; i < sjDelimList.length; i ++) {
		if (inChar == sjDelimList[i]) {
			return true;
		}
	}
	return false;
};

function sjGetElement(name) {
   if(typeof(name)!='string') return name;
   if (document.getElementById)
	   return document.getElementById(name);
   else if (document.all)
	   return document.all[name];
   else name=null;
   return name;
}

function sjGetElementDoc(name) {
   if (document.getElementById)
	   return document.getElementById(name).ownerDocument;
   else if (document.all)
	   return document.all[name].document;
   else name=null;
   return name;
}

function sjGetElementStyle(name) {
   if (document.getElementById)
	   return document.getElementById(name).style;
   if (document.all)
	   return document.all[name].style;
}

function sjGetObj(name){
  if (document.getElementById){
  	this.obj = document.getElementById(name);
	this.style = document.getElementById(name).style;
  }else if (document.all){
	this.obj = document.all[name];
	this.style = document.all[name].style;
  }
}

function sjGetTextContent(inNode) {
	var s = '';
	var children = inNode.childNodes;
	for(var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeType == 3 /*Node.TEXT_NODE*/) s += child.data;
		else s += sjGetTextContent(child);
	}
	return s;
}

function sjCreateDiv(parentId,divId) {
	var parentElm = null;
      if (parentId != null)
	    parentElm = sjGetElement(parentId);
   if (document.all) {
      if (parentElm == null)
		  parentElm = document.body;
		 parentElm.insertAdjacentHTML('afterBegin',' <div unselectable="on" id="' + divId +
												'" style="position:absolute;text-align:left;overflow:hidden;">'+' '+'</div> ');
   }
   else if (document.getElementById) {
      if (parentElm == null)
		  parentElm = document.body;
      var tempLayer = document.createElement('div');
      tempLayer.setAttribute('id',divId);
      tempLayer.setAttribute('style','position:absolute;text-align:left;overflow:hidden;');
      parentElm.appendChild(tempLayer);
   }
}

function sjGetWidth(name) {
   if (document.getElementById)
	   return document.getElementById(name).style.width;
   if (document.all)
	   return document.all[name].offsetWidth;
}

function sjGetHeight(name) {
   if (document.getElementById)
	   return document.getElementById(name).style.height;
   if (document.all)
	   return document.all[name].offsetHeight;
}


function sjGetX(layer) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById)
	   return parseInt(layer.left);
   if (document.all)
	   return layer.pixelLeft;
}

function sjGetY(layer) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById)
	   return parseInt(layer.top);
   if (document.all)
	   return layer.pixelTop;
}

function sjSetClip(layer,x,y,t,r,b,l) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById) {
      layer.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)';
   } else if (document.all) {
      layer.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)';
      layer.pixelLeft=x;
      layer.pixelTop=y;
      layer.overflow='hidden';
   }
}

function sjSetWidth(layer,w) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById)
      layer.width=parseInt(w)+'px';
   else if (document.all)
      layer.posWidth=parseInt(w)+'px';
}

function sjSetHeight(layer,h) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById)
      layer.height=parseInt(h)+'px';
   else if (document.all)
      layer.posHeight=parseInt(h)+'px';
}

function sjZoomMap (inMapName, inXfactor, inYfactor) {
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
		  var coords = areas[a].getAttribute('coords').split(/\s*,\s*/);
		  if (areas[a].getAttribute('shape').toLowerCase() == 'rect' || areas[a].getAttribute('shape').toLowerCase() == 'poly') {
			for (var p = 0; p < coords.length; p += 2) {
			  coords[p] = Math.round(coords[p] * inXfactor);
			  coords[p + 1] = Math.round(coords[p + 1] * inYfactor);
			}
		  } else if (areas[a].getAttribute('shape').toLowerCase() == 'circle') {
			coords[0] = Math.round(coords[0] * inXfactor);
			coords[1] = Math.round(coords[1] * inYfactor);
			coords[2] = Math.round(coords[2] * (inXfactor < inYfactor ? inXfactor : inYfactor));
		  }
		  areas[a].setAttribute('coords',coords.join(', '));
		}
	  }
	}
}

function sjResetMap (inMapName) {
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
		  var coords = areas[a].getAttribute('origcoords').split(/\s*,\s*/);
		  areas[a].setAttribute('coords',coords.join(', '));
		}
	  }
	}
}

/* fixed to remove requirement of ID to identify inView element ('izView') sshepard@fry.com */
function sjSetLayerHTML(layer,html) {
	$(typeof layer === 'string' ? '#' + layer : layer).html(html);
}

/* fixed to remove requirement of ID to identify inView element ('izView') sshepard@fry.com */
function sjGetLayerHTML(layer) {
	$(typeof layer === 'string' ? '#' + layer : layer).html();
}

function sjSetXY(layer,x,y) {
   layer=sjGetElementStyle(layer)
   if (document.getElementById) {
      layer.left=parseInt(x)+'px';
      layer.top=parseInt(y)+'px';
   } else if (document.all) {
      layer.pixelLeft=parseInt(x)+'px';
      layer.pixelTop=parseInt(y)+'px';
   }
}

function sjSetCursor(curtype) {
   var ua = navigator.userAgent.toLowerCase();
   var isIE = (ua.indexOf('msie') != -1);
   var isMAC = (ua.indexOf('mac') != -1);
	document.body.style.cursor = ((!isIE || isMAC) && curtype == 'hand')? 'pointer' : curtype;
	//if (document.all) document.body.style.cursor=curtype;
}

// value must be "visible", "hidden", or "inherit".
function sjSetVisibility (layer, value){
   layer=sjGetElementStyle(layer);
	if (layer)
	  layer.visibility = value;
}

// return values as strings "visible", "hidden", or "inherit".
function sjGetVisibility (layer){
   layer=sjGetElementStyle(layer);
	if (layer)
	 return layer.visibility;
}

function sjGetZIndex (layer){
   layer=sjGetElementStyle(layer);
	if (layer)
	  return (layer.zIndex);
	else return -1;
}

function sjSetZIndex (layer, z){
   layer=sjGetElementStyle(layer);
	if (layer)
		layer.zIndex = z;
}

function sjSetBackColor (layer, color){
	if (color.toLowerCase() == "transparent"){
		color = "";
	}
   layer=sjGetElementStyle(layer);
	if(layer.background)
		layer.background = color;
	else if(document.all || document.getElementById)
		layer.backgroundColor = color;
}

sjSetBackImage = function (layer, imageURL) {
   layer=sjGetElementStyle(layer);
	if(layer.background)
		layer.background.src = imageURL == 'none' ? null : imageURL;
	else if (document.all || document.getElementById)
		layer.backgroundImage = imageURL == 'none' ? 'none' : 'url(' + imageURL + ')';
}

function sjSetBorder (layer, width,style,color){
   stl=sjGetElementStyle(layer);
	stl.borderWidth = width + "px" || 0;
	stl.borderStyle = style || 'solid';
	stl.borderColor = color || 'black';
}

function sjOpacity (layer,inOpacity) {
	if (inOpacity != null) {
		stl=sjGetElementStyle(layer);
	    if(inOpacity < 0) inOpacity = 0;
		if(inOpacity > 99) inOpacity = 99.999999;
		stl.opacity = (inOpacity / 100);
		stl.MozOpacity = (inOpacity / 100);
		stl.KhtmlOpacity = (inOpacity / 100);
		stl.filter = "alpha(opacity=" + inOpacity + ")";
		return stl.opacity;
	}
}

function sjGetMouseXY(e){
  var mousePos = {x: 0, y: 0};
	if (document.all) {
		mousePos.x = event.clientX + document.body.scrollLeft;
	    mousePos.y = event.clientY + document.body.scrollTop;
	} else {
        mousePos.x = e.pageX;
   	    mousePos.y = e.pageY;
	}
  return mousePos;
}

function sjGetPageCoords (element) {
  var coords = {x: 0, y: 0};
  while (element) {
    coords.x += element.offsetLeft;
    coords.y += element.offsetTop;
    element = element.offsetParent;
  }
  return coords;
}

function sjGetOffsets (evt) {
 if(evt){
  if (typeof evt.offsetX != 'undefined')
    return { x: evt.offsetX, y: evt.offsetY }
  else if (evt.target) {
    if (window.opera)
      var element = evt.target;
    else
      var element = evt.target.nodeType == 1 ? evt.target : evt.target.parentNode;
    var eventCoords = {
      x: evt.clientX + window.pageXOffset,
      y: evt.clientY + window.pageYOffset
    };
    var elCoords = sjGetPageCoords(element);
    return {x: eventCoords.x - elCoords.x, y: eventCoords.y - elCoords.y};
  }
 }
}


/***** sj_hashtable.js *****/
//String key, Object value
function SjHashtable(){
    this.hashtable = new Array();
}

SjHashtable.prototype.clear = function (){
    this.hashtable = new Array();
	for (var key in this.hashtable){
		this.remove(key);
	}
}

SjHashtable.prototype.containsKey = function(key){
    var exists = false;
    for (var i in this.hashtable) {
        if (i == key && this.hashtable[i] != null) {
            exists = true;
            break;
        }
    }
    return exists;
}

SjHashtable.prototype.indexOfKey = function(key){
	var result = -1;
    var exists = false;
    for (var i in this.hashtable) {
		result++;
		if (i == key){
			if( this.hashtable[i] != null) {
				exists = true;
				break;
			}
        }
    }
    return exists ? result:-1;
};

SjHashtable.prototype.containsValue = function(value){
    var contains = false;
    if (value != null) {
        for (var i in this.hashtable) {
            if (this.hashtable[i] == value) {
                contains = true;
                break;
            }
        }
    }
    return contains;
}

SjHashtable.prototype.indexOfValue = function(value){
	var result = -1;
	var contains = false;
    if (value != null) {
        for (var i in this.hashtable) {
			result++;
            if (this.hashtable[i] == value) {
                contains = true;
                break;
            }
        }
    }
    return contains ? result : -1;
};

SjHashtable.prototype.get = function(key){
    return this.hashtable[key];
}

SjHashtable.prototype.isEmpty = function(){
    return (this.size == 0) ? true : false;
}

SjHashtable.prototype.keys = function(){
    var keys = new Array();
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null)
            keys.push(i);
    }
    return keys;
}

SjHashtable.prototype.put = function(key, value){
    if (key == null || value == null) {
        throw "NullPointerException {" + key + "},{" + value + "}";
    }else{
        this.hashtable[key] = value;
    }
}

SjHashtable.prototype.remove = function(key){
    var rtn = this.hashtable[key];
    this.hashtable[key] = null;
    return rtn;
}

SjHashtable.prototype.size = function(){
    var size = 0;
    for (var i in this.hashtable){
        if (this.hashtable[i] != null)
            size ++;
    }
    return size;
}

SjHashtable.prototype.toString = function(){
    var result = "";
    for (var i in this.hashtable){
        if (this.hashtable[i] != null)
            result += "{" + i + "},{" + this.hashtable[i] + "}\n";
    }
    return result;
}

SjHashtable.prototype.values = function(){
    var values = new Array();
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null)
            values.push(this.hashtable[i]);
    }
    return values;
}


/***** sj_element.js *****/
function SjElement(inParent, inElementId) {
    this._parent = inParent || self;
	this.name = this.id = this._elementId = inElementId || 'SjElement'+parseInt(SjElement.Count++);
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
	if (typeof tsj != 'undefined'){
		this.codePath		= tsj.path;
	}else if(typeof sj != 'undefined'){
		this.codePath		= sj.path;
	}else{
		this.codePath		= '../dhtml/';
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
		this.fireEvent('setX');
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
		this.fireEvent('setY');
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
		this.fireEvent('setWidth');
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
		this.fireEvent('setHeight');
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
		if(inOpacity > 99) inOpacity = 99.999999;
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
	this.fadeTo(99.999999,inFadeTime);
};

SjElement.prototype.fadeOut = function(inFadeTime){
    if (this._fadeid) {
		clearTimeout(this._fadeid);
		this._fadeid = null;
	}
	this._opacity=99.999999;
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
		if (event.changedTouches) { 	// iPhone
			event.posx = event.changedTouches[0].clientX;
			event.posy = event.changedTouches[0].clientY;
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
					}else{
						arrListeners[i] = null;
					}
				}
				this.hashtable_eventlisteners.remove(inType);
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
				if (arrListeners[index].Update){
					arrListeners[index].Update(inEvent);
				}else if(arrListeners[index] instanceof Function){
					arrListeners[index](inEvent);
				}
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


/***** sj_layer.js *****/
function SjLayer(inParent, inElementId) {
	if (arguments[0] == 'empty') {
		return;
	}
	if (inParent){
		if (typeof sjGetElement(inParent)._elementId == "undefined"){
			sjGetElement(inParent)._elementId = inParent;
		}
	}
	this.SjElement = SjElement;
	this.SjElement(inParent, inElementId);
	if (this._parent && this._parent._elementId){
		sjCreateDiv(this._parent._elementId , this._elementId);
	}else{
		sjCreateDiv(null , this._elementId);
	}
	this._content = sjGetElement(this._elementId);
};

SjLayer.prototype = new SjElement('empty');


/***** sj_picture.js *****/
function SjPicture(inParent, inElementId,inWidth,inHeight,transparency) {
	if (arguments[0] == 'empty') {
		return;
	}
	this.SjLayer = SjLayer;
	this.SjLayer(inParent, inElementId);

	this.transparency = transparency || false;
	this._imageWidth = 0;
	this._imageHeight = 0;
	this._stretch = false;
	this.loaded = false;
	this.imgId = this._elementId + '_img';
    this.imgStr = ' <img';
	this.imgStr += ' id=' + this.imgId;
	this.imgStr += ' name=' + this.imgId;
	this.imgStr += ' border=' + 0;
	this.imgStr += ' style="position:absolute;left:0;top:0;"';
	this.imgStr += '> ';
    sjSetLayerHTML(this._elementId,this.imgStr);
	this.imageElm = sjGetElement(this.imgId);
	this.imageElm._parent = this;
	this.useMap='';
	this.imageElm.useMap='';
	this.setSize(inWidth,inHeight);
}

SjPicture.prototype = new SjLayer('empty');

SjPicture.prototype.load = function(inURL) {
	var nURL = new SjURL(inURL);//tempo
	var cURL = new SjURL(this.imageElm.src);//tempo
	if (nURL.file == cURL.file) {//tempo
		if ((this.loaded == true)&&(this.imageElm.complete==true)){//check for complete loading of image
			this.imageElm.onload();
		}
		return;
	}
	this.loaded = false;
	if (document.all) {
		sjGetElement(this.imgId).outerHTML=this.imgStr;
		this.imageElm = sjGetElement(this.imgId);
		this.imageElm._parent = this;
	}else{
		this.imageElm.style.width="";
		this.imageElm.style.height="";
	}
	this.imageElm.onload=this.onLoad;
	this.imageElm.onerror=this.onError;
	this.imageElm.onabort=this.onAbort;
    this.imageElm.src = inURL;
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
			sjSetWidth(this.imageElm.id, this._width);
			sjSetHeight(this.imageElm.id, this._height);
		} else {
			sjSetWidth(this.imageElm.id, this._imageWidth);
			sjSetHeight(this.imageElm.id, this._imageHeight);
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
				sjSetWidth(this.imageElm.id, this._width);
				sjSetHeight(this.imageElm.id, this._height);
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
				sjSetWidth(this.imageElm.id, this._width);
				sjSetHeight(this.imageElm.id, this._height);
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



/***** sj_textloader.js *****/
function SjTextLoader() {
	this._id = SjTextLoader._cnt ++;
	this.req = null;
	this.tid=null;
	this.text=null;
	this.IFrameDoc=null;
	this.first = false;
	this.json = false;
	this.counter = 0;
	SjTextLoader.all[this._id] = this;
	if( document.childNodes && document.createElement ) {
		sjCreateDiv(null,"datadiv"+this._id);
		var dname="datadiv"+this._id;
		var lname="loader"+this._id;
		var str=' <div id='+dname+' style="position:absolute;visibility:hidden"><iframe src="about:blank" id='+lname+' name='+lname+' onload=""></iframe> </div> ';
		sjSetLayerHTML("datadiv"+this._id,str);
	}
}

SjTextLoader.prototype.load = function(inURL,firstLoading) {
	if (inURL.indexOf("json") >= 0){
		this.json = true;
		tljson = this;
		//inURL = inURL.substring(inURL.indexOf(S7Config.isRoot)+S7Config.isRoot.length,inURL.indexOf("?"));
		sjLoadCtx(tljson,inURL);
		this.counter = 0;
		clearInterval(this.tid);
	}else{
		this.json = false;
		if (!firstLoading){
			if (window.XMLHttpRequest) {//native XMLHttpRequest object
				this.req = new XMLHttpRequest();
				eval('this.req.onreadystatechange = function() { SjTextLoader.all[' + this._id + ']._onLoadText(); }');
				this.req.open("GET", inURL, true);
				this.req.send(null);
			}else {
				var elm=sjGetElement("loader" + this._id);
				if (elm){
					if (typeof elm.src != 'undefined')
						elm.src = inURL;
					else if (typeof elm.location != 'undefined')
						elm.location = inURL;
					this.tid=setInterval(this+'.checkLoad()', 100);
				}
			}
		}else{
			image = new Object;
			metadata = new Object;//for future
			protocol = new Object;//for future
			context = new Object;//for future
			this.first = true;
			document.write("<script type='text/javascript' src='" + inURL+  ",javascript'></" + "script>");
			this.tid=setInterval(this+'.checkLoad()', 100);
		}
	}
};

SjTextLoader.prototype._onLoadText = function() {
	if (this.req.readyState == 4) {//"loaded";0 = uninitialized 1 = loading 2 = loaded 3 = interactive 4 = complete
		if (this.req.status == 200) {//"OK" Numeric code returned by server, such as 404 for "Not Found" or 200 for "OK"
			this.text = this.req.responseText;
			if (this.onLoadText){
				this.onLoadText();
			}
        } else {
            //alert("There was a problem retrieving data:\n" + this.req.statusText);
            alert(sj_resource.getResource("%THERE_WAS_A_PROBLEM_RETRIEVING_DATA%:\n") + this.req.statusText);
        }
    }
};

function dumpProps(obj,obj_name) {
	var str = "", i ="";
	for (i in obj)
	str += obj_name +"."+ i +" = "+ obj[i] +"\n";
	return str;
}

SjTextLoader.prototype.checkLoad = function() {
	if (this.first == true){
		if (image.rect) {
			this.text = dumpProps(image,"image");
			if (metadata){
				this.text += dumpProps(metadata,"metadata");
			}
			if (protocol){
				this.text += dumpProps(protocol,"protocol");
			}
			if (context){
				this.text += dumpProps(context,"context");
			}
			if (this.onLoadText){
				this.onLoadText();
			}
			this.counter = 0;
			clearInterval(this.tid);
		}else{
			if (this.counter < 100){
				this.counter++;
			}else{
				alert(sj_resource.getResource('%ERROR_LOADING_CONTEXT%!'));
				this.counter = 0;
				clearInterval(this.tid);
			}
		}
	}else{
		var elm=sjGetElement("loader" + this._id);
		if (elm != null)
		if(document.frames){
		 if(document.frames[elm.name]) { this.IFrameDoc=document.frames[elm.name].document } // For IE5
		}else if (elm.contentDocument) { this.IFrameDoc=elm.contentDocument } //For NS6
		 else if (elm.contentWindow) { this.IFrameDoc=elm.contentWindow.document } //For IE5.5
		else{
			alert(sj_resource.getResource('%PROBLEMS%.....'));
			clearInterval(this.tid);
			return true;
		}
		var inf = sjGetTextContent(this.IFrameDoc);
		if (inf){
			this.text = inf;
			if (this.onLoadText){
				this.onLoadText();
			}
			clearInterval(this.tid);
		}
	}
}

SjTextLoader.prototype.clearText = function(txt) {
	var testText = txt;
	if ((testText != null) && (testText != '')) {
	    var result = testText;
	    var teg=testText.substring(testText.indexOf("<"),testText.indexOf(">")+1);
		var idx = testText.indexOf(teg);
		while (idx != -1) {
			result = result.substring(0, idx) + '' + result.substring(idx + teg.length);
			testText=result;
		    idx=-1;
			teg=testText.substring(testText.indexOf("<"),testText.indexOf(">")+1);
			if (teg!=''){
		     idx = testText.indexOf(teg);
			 result=testText;
			}
		}

		testText=testText.replace("&lt;","<");
		testText=testText.replace("&gt;",">");
		this.text = testText;
	}
	return this.text;
}

SjTextLoader.prototype.toString = function() {
	return 'SjTextLoader.all[' + this._id + ']';
};

SjTextLoader.all = [];
SjTextLoader._cnt = 0;

//private functions and variables
var sjCallbacks=new Object();//!global variable MUST be created !
var sjErrCallbacks=new Object();//!global variable MUST be created !

function sjGetResponse(inReq, inImg, inCallback, inErrCallback) {
	var urljson = "";
	var tempi = inImg.indexOf("?");
	if(tempi >= 0){
		urljson = inImg + '&' + inReq;
	}else{
		urljson = inImg + '?' + inReq;
	}
	var id = sjHashCode(urljson);
	urljson += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks[id] = inCallback;
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks[id] = inErrCallback;
	}
    var oScript = document.getElementById('sjScript_'+id);
    if (oScript) {
		document.getElementsByTagName("head")[0].removeChild(oScript);
		oScript = null;
	}
    oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.id= 'sjScript_'+id;
    oScript.src= urljson;
	if (typeof oScript!="undefined"){
		document.getElementsByTagName("head")[0].appendChild(oScript);
	}
}

function s7jsonResponse(inArg, inId) {
	sjCallbacks[inId](inArg);
}

function s7jsonError(inArg, inId) {
	if (typeof sjErrCallbacks[inId] != 'undefined'){
		sjErrCallbacks[inId](inArg);
	}else{
		alert(inArg.message);
	}
}

function sjDebug(inPsResponse, inJsonResponse, inPsResponseParserName, inPsRequest) {
}

function sjHashCode(d) {//unix style
	if (!d || d=="") return 1;
	var h=0,g=0;
	for (var i=d.length-1;i>=0;i--) {
		var c=parseInt(d.charCodeAt(i));
		h=((h << 6) & 0xfffffff) + c + (c << 14);
		if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
	}
	return h;
}

function sjLoadCtx(tl,inURL) {
	sjGetResponse(
		'req=ctx,json&scl=1',
		inURL.replace(/req=ctx,json/gi, ""),//check doubling req
		function(inArg) {
			tl.text = dumpProps(inArg,"");
			if (tl.onLoadText){
				tl.onLoadText();
			}
		},
		function(inArg) {
			alert('failed loading ctx for image [' + inURL + ']: ' + inArg.message);
		}
	);
}

function sjAddAreaToMap(inMap,inArg) {
    var oMap = document.getElementById(inMap);
	if (typeof oMap != "undefined"){
		var oArea = document.createElement('area');
		oArea.shape = inArg.shape || null;
		oArea.coords = inArg.coords || null;
		oArea.href = inArg.href || null;
		oArea.target = inArg.target || null;
		oArea.alt = inArg.alt || null;
		oArea.title = inArg.alt || null;
		oArea.setAttribute("origcoords",oArea.coords  || null);
		oArea.setAttribute("rollover_key",inArg.rollover_key || null);
		if (typeof oArea != "undefined"){
			oMap.appendChild(oArea);
		}
	}
}

function sjLoadMap(inImage,inMeta,inSclX,inSclY,inId,inCallback) {
	sjGetResponse(
		'req=map,json&scl=1'+inMeta,
		inImage,
		function(inArg) {
			var oMap = document.getElementById("s7map_"+inId);
			if (inArg != null) {
					if ((typeof oMap != "undefined")&&(oMap != null)){
						for (var k = oMap.childNodes.length-1; k >= 0 ; k--) {
							oMap.removeChild(oMap.childNodes[k])
						}
						for (var i = 0; i < inArg.length; i ++) {
							sjAddAreaToMap("s7map_"+inId,inArg[i]);
						}
						sjResetMap("s7map_"+inId);
						sjZoomMap ("s7map_"+inId,inSclX,inSclY);
						inCallback();
					}
				} else {
					if (typeof oMap != "undefined"){
						for (var k = oMap.childNodes.length-1; k >= 0 ; k--) {
							oMap.removeChild(oMap.childNodes[k])
						}
					}
				}
		},
		function(inArg) {
			alert('failed loading map for image [' + inImage + ']: ' + inArg.message);
		}
	);
}



/***** sj_zoom.js *****/
/////////////////////////////////SjZoomNav
function SjZoomNav(inObj,inWidth,inHeight,inPosition,inNav,transparency){
	this.SjLayer = SjLayer;
///////
	if ((typeof inNav == 'undefined')) {
		inNav = 'izNav';
	}
    if (sjGetElement(inNav)){
		this.SjLayer(sjGetElement(inNav), null);
		this.setSize(sjGetElement(inNav).offsetWidth || 50,sjGetElement(inNav).offsetHeight || 50);
		sjSetWidth(inNav, this.width());
		sjSetHeight(inNav, this.height());
	    this.toXY(0,0);
	}else{
		this.SjLayer(inObj, null);
		this.setSize(inWidth || 50,inHeight || 50);
	}
/////////

	this.transparency = transparency;
	this.navObj = null;

	this.navImage = new SjPicture(this,null,null,null,this.transparency);
	this.navImage.visible(false);
	sjSetBorder(this._elementId,1,'solid',"#666666");
	this.navImage.setSize(inWidth || 50,inHeight || 50);
	this.navImage.stretch(true);
	this.navImage.zIndex(this.zIndex()+1);

	this.dblnavImage = new SjPicture(this,null,null,null,this.transparency);
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
	this.initialLoading	= true;
	//for future this.changingImage	= false;
	this.scl = 1;//initial
	this.cX = this.dragImage.left();
	this.cY = this.dragImage.top();
	this.cW = this.dragImage.width();
	this.cH = this.dragImage.height();
}

SjZoomNav.prototype = new SjLayer("empty");

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
		with (sjGetElementStyle(this.dragImage._elementId+'_img')){
			width = ((this.dragImage.width()-this.borderWidth*2)<1?1:(this.dragImage.width()-this.borderWidth*2))+"px";
			height = ((this.dragImage.height()-this.borderWidth*2)<1?1:(this.dragImage.height()-this.borderWidth*2))+"px";
		}
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
	this.navImage.load(this.dblnavImage.imageElm.src);//img
}

SjZoomNav.prototype.initHandlers = function(){
	var obj = this;
	var objNav = this.navObj;
	this.dblnavImage.addEventListener("load",
		function (){
			obj.dblnavImage.setSize(obj.dblnavImage._imageWidth,obj.dblnavImage._imageHeight);//img
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
			obj.navImage.setSize(obj.dblnavImage._imageWidth,obj.dblnavImage._imageHeight);//img
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
//iPhone
	this.dragImage.addEventHandler('touchstart',
		function (o,evt){
			if(evt.touches.length == 1) {
				evt.preventDefault();
				objNav.storeImagesXY();
				ex = evt.posx;
				ey = evt.posy;
				obj.startDrag=true;
				//sjSetCursor('hand');
			}
			return false;
		}
	);
	this.dragImage.addEventHandler('touchmove',
		function (o,evt){
			if(evt.touches.length == 1) {
				evt.preventDefault();
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
			}
			return false;
		}
	);
	this.dragImage.addEventHandler('touchend',
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
			//sjSetCursor('default');
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
	with (sjGetElementStyle(this.dragImage._elementId+'_img')){
		border=""+this.borderColor+" "+parseInt(this.borderWidth)+"px solid";
		width = ((this.dragImage.width()-this.borderWidth*2)<1?1:(this.dragImage.width()-this.borderWidth*2))+"px";
		height = ((this.dragImage.height()-this.borderWidth*2)<1?1:(this.dragImage.height()-this.borderWidth*2))+"px";
	}
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
//	if (typeof tsj != 'undefined'){
//		this.codePath		= tsj.path;
//	}else if(typeof sj != 'undefined'){
//		this.codePath		= sj.path;
//	}else{
//		this.codePath		= '../dhtml/';
//	}
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
			scale = Math.min(Math.max(scale, 1 / this.zoom_factor_limit),this.defaultScl);
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
    if (this.foreImage._fadeid) {//14.06.2010 (turntime is leading)
		clearTimeout(this.foreImage._fadeid);
		this.foreImage._fadeid = null;
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
//	this.mapUpdate(this.backImage.left(),this.backImage.top(),
//					this.backImage.width(),this.backImage.height(),
//					1/this.currentScl);
	//??this.mapImage.visible(false);
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
		//??this.mapImage.visible(false);//??
		if (!window.Touch) sjSetCursor('wait');
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
		if (!window.Touch) sjSetCursor('default');
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
		if (!window.Touch) sjSetCursor('default');
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
					if ((newScl < this.currentScl) && (this._animeid == null)){//?? open issue ??
						this.fireEvent('zoom','factor',1/newScl*100);
					}
				}else if ((Math.round(nx) != Math.round(this.currentX)) || (Math.round(ny) != Math.round(this.currentY))){
					this.fireEvent('zoomPan');//?? open issue ??
				}
				var obj = this;
				if (!this.initialLoading){
					this.animFix(img,nx,ny,newScl,this.transitionTime,function(){obj.updateForeImage();});
				}else{
					this.animFix(img,nx,ny,newScl,0,function(){obj.updateForeImage();});
				}
		}else{
			if (!window.Touch) sjSetCursor('default');
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
	if (res == null) return;
	if (res.url == null) return;
	if (res.scl == null) return;
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
		timageURL = this.foreImage.imageElm.src.substr(this.foreImage.imageElm.src.indexOf(sjimageServer)+sjimageServer.length);//img
		tinURL = inURL.substr(inURL.indexOf(sjimageServer)+sjimageServer.length);
		if (timageURL != tinURL){
			requered = true;
			recURL = inURL;
		}
	}else{
		tinURL = tempURL.substr(tempURL.indexOf(sjimageServer)+sjimageServer.length);
		timageURL= this.foreImage.imageElm.src.substr(this.foreImage.imageElm.src.indexOf(sjimageServer)+sjimageServer.length);//img
		if ((timageURL != tinURL) || (!this.foreImage.loaded)){
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
		//??this.mapImage.visible(false);
		if (!window.Touch) sjSetCursor('wait');
		this.requestShowWaitIcon();
		this.foreImage.load(recURL);
	}else{
		this.foreImage.notChanged = true;
//		if (this.foreImage.imageElm.onload instanceof Function){//img
//			this.foreImage.imageElm.onload();//img
//		}
		var scl=this.currentScl;
		if (scl < 1){
			scl/=this.lastScl;
			this.foreImage.setSize(this.foreImage._imageWidth/scl,this.foreImage._imageHeight/scl);
		}else{
			this.foreImage.setSize(this.foreImage._imageWidth,this.foreImage._imageHeight);
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
	if (event.changedTouches) { 	// iPhone
		event.posx = event.changedTouches[0].clientX;
		event.posy = event.changedTouches[0].clientY;
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
/////////////iPhone
	document.ontouchmove=null;
	document.ontouchend=null;
/////////////
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
/////////////iPhone
		document.ontouchmove = function(event){
			if(event.touches.length == 1) {
				moveMouse(o,sjCrossEvent(event));
			}
			return false;
		};
		document.ontouchend = function(event){
			finishMouse(o,sjCrossEvent(event));
			return false;
		};
/////////////
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
	  }
	  return false;
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
/////////////iPhone
	this.mapImage.addEventHandler('touchstart',initMouse);
	this.mapImage.addEventHandler('touchmove',moveMouse);
	this.mapImage.addEventHandler('touchend',finishMouse);
////////////////backImage
	this.backImage.addEventListener("load",
		function (){
			if ((obj.initialLoading) || (obj.initFromPersistence)){
				obj.fireEvent('initialising');
				obj.fireEvent('load');
			}else{
				obj.fireEvent('page','pageId',obj.pageId.substring(4),'label',obj.imgLabel);
			}
			obj.backImage.setSize(obj.imgServerWidth / obj.currentScl,obj.imgServerHeight / obj.currentScl);
			obj.setPosition(obj.backImage,obj.currentX,obj.currentY,obj.currentScl);
			obj.backImage.visible(true);
			//??obj.mapImage.visible(false);
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
				metaStr = '&.mv='+obj.metaVersion;
			}
			if (obj.hotSpotEnable){
				obj.mapImage.visible(false);
				sjLoadMap(obj.mainURL,metaStr,1/obj.currentScl, 1/obj.currentScl,obj._elementId,
						function (){
							obj.setMapper("s7map_"+obj._elementId,
									function (){//over
										obj.enableZoom = false;
										obj.fireEvent('item','href',this.href,'alt',this.alt,'rolloverKey',this.rollover_key);
										return false;//may be delete?
									},
									function (){//out
										obj.enableZoom = true;
										return false;//may be delete?
									},
									function (){//down
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
			if (!window.Touch) sjSetCursor('default');
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
//////iphone
	this.foreImage.addEventHandler('touchstart',initMouse);
	this.foreImage.addEventHandler('touchend',finishMouse);
/////
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
		var zoom_nav = null;
		if( position >= 1 && position <= 4 ) {
			zoom_nav = new SjZoomNav(this._parent,null,null,'absolute',null,this.transparency);
		}else if( position > 4 ) {
			zoom_nav = new SjZoomNav(this._parent,inWidth || null,inHeight || null,'absolute',null,this.transparency);
		}
		zoom_nav.setViewer(this);
		if (this.navloadURL){
			zoom_nav.dblnavImage.load(this.navloadURL);
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
	this.infotxt = "alert('"+str+"')";
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

function compareNumbers(a, b) {//ascending order
    return a - b;
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
		  areas[a].id = a;
		  areas[a].onmouseover=null;
		  areas[a].onmouseout=null;
		  areas[a].onmousedown=null;
		  areas[a].onmouseover=inOver;
		  areas[a].onmouseout=inOut;
		  areas[a].onmousedown=inDown;
		}
	  }
	}
}



/***** sj_zoomviewer.js *****/
//function SjZViewer(baseServer,baseImage,width,height,newWidth, newHeight,transparency,inLegacyLoadEventData,imgVersion,inView,pageId,inParams){
var SjZViewer = function(settings){
	var baseServer = this.baseServerUrl = settings.baseServer;
	var baseImage = this.baseImage = settings.baseImage;
	var width = settings.viewWidth;
	var height = settings.viewHeight;
	var newWidth = settings.imageWidth;
	var newHeight = settings.imageHeight;
	var transparency = settings.transparency;
	var imgVersion = settings.imgVersion;
	var inView = settings.inView;
	var pageId = settings.pageId;
	var inParams = settings.inParams;
	var inLegacyLoadEventData = settings.inLegacyLoadEventData;

	this.viewerType = 10;//default value DHTML API
	this.eventMask = 0;//default value
	this.imageList = baseImage;//default value
	this.locale = null;
	this.legacyLoadEventData = (inLegacyLoadEventData == true)?inLegacyLoadEventData:false;
	this.onEvent = new Object();
	this.SjElement = SjElement;
	this.SjElement();

	if ((typeof inView == 'undefined') || (inView == null)) {
		inView = 'izView';
	}
    if (sjGetElement(inView)){
		width = parseInt(sjGetElement(inView).offsetWidth);
		height = parseInt(sjGetElement(inView).offsetHeight);
		var str="";
		str+=' <div id='+this._elementId+'_base';
		str+=' STYLE="position:relative;width:' + width + 'px;height:' + height + 'px;">';
		str+='<table id='+this._elementId+'_tbl_base'+' STYLE="width:' + width + 'px;height:' + height + 'px;border:0px solid #ffffff;"  cellspacing=0 cellpadding=0 >';
		str+=' <tr style="HEIGHT:'+height+'px;"><td>';
		str +='<img id='+this._elementId+'_img';
		str +=' src='+this.codePath+"images/spacer.gif"
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + 0 + 'px;"';
		str +=' border="0"';
		str +=' >';
		str+=' <div  id='+this._elementId;
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + height + 'px;">';
		str+=' </div> ';
		str+=' </td></tr>';
		str+=' </table> ';
		str+=' </div> ';
		sjSetLayerHTML(inView,str);
		this.elem=sjGetElement(this._elementId);
		this.elem._elementId = this._elementId;
		this.elem_base=sjGetElement(this._elementId+'_base');
		this.elem_base._elementId = this._elementId+'_base';
		this.x = 0;
		this.y = 0;
	}else{
		var str="";
		str+=' <div id='+this._elementId+'_base';
		str+=' STYLE="position:relative;width:' + width + 'px;height:' + height + 'px;">';
		str+='<table id='+this._elementId+'_tbl_base'+' STYLE="width:' + width + 'px;height:' + height + 'px;border:0px solid #ffffff;"  cellspacing=0 cellpadding=0 >';
		str+=' <tr style="HEIGHT:'+height+'px;"><td>';
		str +='<img id='+this._elementId+'_img';
		str +=' src='+this.codePath+"images/spacer.gif"
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + 0 + 'px;"';
		str +=' border="0"';
		str +=' >';
		str+=' <div  id='+this._elementId;
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + height + 'px;">';
		str+=' </div> ';
		str+=' </td></tr>';
		str+=' </table> ';
		str+=' </div> ';
			document.write(str);

		this.elem=sjGetElement(this._elementId);
		this.elem._elementId = this._elementId;
		this.elem_base=sjGetElement(this._elementId+'_base');
		this.elem_base._elementId = this._elementId+'_base';
		this.x = 0;
		this.y = 0;
	}

	this.transparency = transparency;

    if (inParams){
		this.params = inParams;
		if ( typeof this.params.persistence  != 'undefined') {
			this.cookieExpiration = getExpDate(0, 0, this.params.persistence);//by default 30min
		}
		var st = sjIS.getCookie(escape(baseImage+".state"));
		this.state = st.split(';');
		if ( typeof this.params.locale  != 'undefined') {
			if ((this.params.locale  != null) && (this.params.locale  != 'null')) {
				this.locale = this.params.locale;
			}
		}
	}
	var locBaseImage = baseServer+baseImage;
	if (this.locale != null){
		var nQ = locBaseImage.indexOf("?");
		if (nQ > -1){
			locBaseImage = locBaseImage.substr(0,nQ)+"?locale="+this.locale+locBaseImage.substr(nQ);
		}else{
			locBaseImage = locBaseImage +"?locale="+this.locale;
		}
	}
	this.zviewer = new SjZoom(this.elem,locBaseImage,width,height,true,true,true,this.transparency);
	var oMap = document.getElementById('s7map_'+this.zviewer._elementId);
	if (oMap){
		document.body.removeChild(oMap);
		oMap = null;
	}
    oMap = document.createElement('map');
	oMap.id= 's7map_'+this.zviewer._elementId;
	oMap.name= 's7map_'+this.zviewer._elementId;
	if (typeof oMap!="undefined"){
	   if (document.all) {
			document.body.insertAdjacentHTML('afterBegin',' <map id="' + oMap.id +'" name="'+oMap.name+'"></map> ');
	   } else if (document.getElementById) {
			document.body.appendChild(oMap);
	   }
  	}
    this.zviewer.toXY(0,0);
	var sjZoomViewer = this;
	this.zviewer.addEventListener('endZoom',
		function (o){
				switch(o.target.state){
					case "zoomIn":
					//o.target.fireEvent('zoom','factor',1/o.target.currentScl*100);
					if (sjZoomViewer.onEvent.onImageZoomedIn){
						sjZoomViewer.onEvent.onImageZoomedIn(1+Math.log(o.target.defaultScl/o.target.currentScl)/Math.log(o.target.zoom_factor));
					}
					break;
					case "zoomOut":
					if (sjZoomViewer.onEvent.onImageZoomedOut){
						sjZoomViewer.onEvent.onImageZoomedOut(1+Math.log(o.target.defaultScl/o.target.currentScl)/Math.log(o.target.zoom_factor));
					}
						break;
					case "reset":
					if (sjZoomViewer.onEvent.onImageResetted){
						sjZoomViewer.onEvent.onImageResetted(1+Math.log(o.target.defaultScl/o.target.currentScl)/Math.log(o.target.zoom_factor));
					}
						break;
					case "changeContext":
					if (sjZoomViewer.onEvent.onImageChanged){
						sjZoomViewer.onEvent.onImageChanged(o.target.oldImage,o.target.mainURL);
					}
						break;
					case "setRGN":
					if (o.target.currentTarget){//o.target.currentTarget == null
						//o.target.fireEvent('targ','number',o.target.currentTarget.target.targetNumber,'label',o.target.currentTarget.target.label,'userData',o.target.currentTarget.target.userData+"setRGN");
						o.target.fireEvent('targ','number',o.target.currentTarget.target.targetNumber,'label',o.target.currentTarget.target.label,'userData',o.target.currentTarget.target.userData);
					}
 					if (sjZoomViewer.onEvent.onRegionSet){
						sjZoomViewer.onEvent.onRegionSet(o.target.currentRGN);
					}
						break;
				}
			return false;
		}
	);
////////////

//	this.eventLogger = new SJEventlogger(this.baseServerUrl,template,this.baseImage);
//	this.eventLogger = new SJEventlogger(this.baseServerUrl,null,this.baseImage);
	var tempPath = this.imageList;
	if (this.imageList.indexOf("/") != -1){
		tempPath = this.imageList.substr(0,this.imageList.indexOf("/"));
	}
	this.eventLogger = new SJEventlogger(this.baseServerUrl,null,tempPath);
	this.zviewer.addEventListener('zoomPan',
		function (o){return;//?? open issue ??
					var logAr = sjZoomViewer.eventLogger.evtPAN();
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
					return false;
				}
	);
	this.zviewer.addEventListener('zoom',
		function (o){
					var logAr = sjZoomViewer.eventLogger.evtZOOM(o.factor);
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
					return false;
				}
	);
	this.zviewer.addEventListener('item',
		function (o){
					var logAr = sjZoomViewer.eventLogger.evtITEM(o.href,o.alt,o.rolloverKey);
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
					return false;
				}
	);
	this.zviewer.addEventListener('href',
		function (o){
					var logAr = sjZoomViewer.eventLogger.evtHREF(o.href);
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
					return false;
				}
	);
	this.zviewer.addEventListener('targ',
		function (o){
					var logAr = sjZoomViewer.eventLogger.evtTARG(o.number,o.label,o.userData);
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
					return false;
				}
	);
	this.zviewer.addEventListener('page',
		function (o){
					var logAr = sjZoomViewer.eventLogger.evtPAGE(o.pageId,o.label);
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
					return false;
				}
	);
	this.zviewer.addEventListener('load',
		function (o){
					var url = "";
					var res = locBaseImage.replace(/%2f|%2F/g, "/").match(new RegExp('(http[s]?://[^/]+)?[/]+([^/]+[/]+[^/]+)[/]+([^/]+)[/]+([^\\?]+)[\\?]?', 'i'));
					if (res == null) return false;
					var serverURL = (res[1] || "") + '/' + res[2];
					if (typeof res[1] != "undefined"){
						serverURL = res[1] + '/' + res[2];
					}else{
						serverURL = '/' + res[2];
					}
/////////////////////////////
					var logAr = null;
					if (sjZoomViewer.legacyLoadEventData == true){
						logAr = sjZoomViewer.eventLogger.evtLOAD(sjZoomViewer.viewerType,sj.version,sjZoomViewer.eventMask,sjZoomViewer.imageList);
					}else{
						//logAr = sjZoomViewer.eventLogger.evtLOAD(sjZoomViewer.viewerType,sj.version,sjZoomViewer.eventMask,res[3]+"/"+res[4]);
						logAr = sjZoomViewer.eventLogger.evtLOAD(sjZoomViewer.viewerType,sj.version,sjZoomViewer.eventMask,sjZoomViewer.image);
					}
					if (typeof sjZoomViewer.onEvent.onLogEvent != 'undefined'){
						sjZoomViewer.onEvent.onLogEvent(logAr.message,logAr.timeStamp,logAr.sessionId,logAr.path);
					}
/////////////////////////////
					url = serverURL+"/"+escape(res[3])+"?req=message&message="+logAr.sessionId+","+logAr.timeStamp+",LOAD,"+sjZoomViewer.viewerType+","+sj.version+",0,-1,-1,-1,"+res[3]+"/"+res[4];
					var oImg = document.getElementById('sjMsgImg_'+logAr.sessionId);
					if (oImg) {
						document.body.removeChild(oImg);
						oImg = null;
					}
					oImg = document.createElement('img');
					oImg.id= 'sjMsgImg_'+logAr.sessionId;
					oImg.style.visibility = 'hidden';
					oImg.src= url;
					if (typeof oImg !="undefined"){
						document.body.appendChild(oImg);
					}
/////////////////////////////
					return false;
				}
	);

	this.zviewer.initHandlers();

	if (((baseServer) && (baseImage)) && ((newWidth)&&(newHeight))){
		this.zviewer.changeContext(locBaseImage,null,null,null,null,newWidth, newHeight, imgVersion,pageId);
	}else if ((baseServer) && (baseImage)){
		this.zviewer.changeContext(locBaseImage,null,null,null,null,null,null,pageId);
	}

}

SjZViewer.prototype = new SjElement();

SjZViewer.prototype.addToPage = function(absolutePos) {
	//empty
};

SjZViewer.prototype.enableNav = function(position,inX,inY,inWidth,inHeight) {
	if( position >= 1 && position <= 4 ) {
		return (this.zviewer.enableNav(position,null,null,50,50));
	}else if( position > 4 ) {
		return (this.zviewer.enableNav(position,inX,inY,inWidth || 50,inHeight || 50));
	};
};

SjZViewer.prototype.setBorderNav = function(sz,inColor) {
	if (this.zviewer.navLayer){
		this.zviewer.navLayer.setBorder(sz,inColor);
	}
};

SjZViewer.prototype.setBackground = function(bgColor) {
	if (bgColor.toLowerCase() == "transparent"){
		bgColor = "";
	}
	if( ""+bgColor != "undefined" && ""+bgColor.length > 6 ) {
		this.zviewer.color("#"+bgColor.substr(bgColor.length-6));
		if (this.zviewer.navLayer){
			this.zviewer.navLayer.color("#"+bgColor.substr(bgColor.length-6));
		}
	} else {
		this.zviewer.color(bgColor);
		if (this.zviewer.navLayer){
			this.zviewer.navLayer.color(bgColor.substr(bgColor.length-6));
		}
	};
};

SjZViewer.prototype.setImage = function(img, reset, newWidth, newHeight, imgVersion,pageId) {
	var locImg = img;
	if (this.locale != null){
		var nQ = locImg.indexOf("?");
		if (nQ > -1){
			locImg = locImg.substr(0,nQ)+"?locale="+this.locale+locImg.substr(nQ);
		}else{
			locImg = locImg +"?locale="+this.locale;
		}
	}
	if (reset || (this.zviewer.initialScl == this.zviewer.currentScl)){
		this.zviewer.changeContext(locImg,null,null,null,null,newWidth, newHeight, imgVersion,pageId);
	}else{
		this.zviewer.changeContext(locImg,this.zviewer.currentX,this.zviewer.currentY,this.zviewer.currentScl,null,newWidth, newHeight, imgVersion,pageId);
	}
};

SjZViewer.prototype.setBrochureImage = function(img, reset, defaultScl, newWidth, newHeight, imgVersion,pageId) {
	var locImg = img;
	if (this.locale != null){
		var nQ = locImg.indexOf("?");
		if (nQ > -1){
			locImg = locImg.substr(0,nQ)+"?locale="+this.locale+locImg.substr(nQ);
		}else{
			locImg = locImg +"?locale="+this.locale;
		}
	}
	if (reset || (this.zviewer.initialScl == this.zviewer.currentScl)){
		this.zviewer.changeContext(locImg,null,null,null,defaultScl,newWidth, newHeight, imgVersion,pageId);
	}else{
		this.zviewer.changeContext(locImg,this.zviewer.currentX,this.zviewer.currentY,this.zviewer.currentScl,defaultScl,newWidth, newHeight, imgVersion,pageId);
	}
};

SjZViewer.prototype.setFadeTime = function(inFadeTime) {
	this.zviewer.fadeTime = inFadeTime*1000;
};

SjZViewer.prototype.setTurnTime = function(inTurnTime) {
	this.zviewer.turnTime = inTurnTime*1000;
};

SjZViewer.prototype.setTransitionTime = function(inTransitionTime) {
	this.zviewer.transitionTime = inTransitionTime*1000;
};

SjZViewer.prototype.setWaitIconTimer = function(inTimerStr){
	var tempStr = inTimerStr.split(",");
	this.zviewer.waitIconTimer.showDelay = (tempStr[0]-0)*1000;
	this.zviewer.waitIconTimer.hideDelay = (tempStr[1]-0)*1000;
}

SjZViewer.prototype.setWaitIconURL = function(inURL){
	if (this.zviewer.waitIcon){
		this.zviewer.waitIconURL = inURL || null;
		if((this.zviewer.waitIconURL != null) && (this.zviewer.waitIconURL != "")){
			this.zviewer.waitIcon.load(this.zviewer.waitIconURL);
		}
	}
}

SjZViewer.prototype.setMaxZoom = function(limit) {
	this.zviewer.setMaxZoom(this.zviewer.max_zoom,this.zviewer.zoom_factor,limit/100);
};

SjZViewer.prototype.setZoomStep = function(amount) {
	if (amount == 0){
		var d = this.zviewer.defaultScl/Math.pow(this.zviewer.zoom_factor , 0);
		this.zviewer.setMaxZoom(1,d);
	}else{
		this.zviewer.setMaxZoom(this.zviewer.max_zoom, Math.pow(2,1/amount),this.zviewer.zoom_factor_limit);
	}
};

SjZViewer.prototype.zoomOut = function() {
	this.zviewer.ZoomOut(this.zviewer.backImage);
};

SjZViewer.prototype.zoomIn = function() {
	this.zviewer.ZoomIn(this.zviewer.backImage);
};

SjZViewer.prototype.pan = function(direction,amount) {
	var directionX=0;
	var directionY=0;
	switch(direction){
		case 'leftup':
			directionX=-1;directionY=-1;
			break;
		case 'up':
			directionX=0;directionY=-1;
			break;
		case 'rightup':
			directionX=1;directionY=-1;
			break;
		case 'left':
			directionX=-1;directionY=0;
			break;
		case 'right':
			directionX=1;directionY=0;
			break;
		case 'leftdown':
			directionX=-1;directionY=1;
			break;
		case 'down':
			directionX=0;directionY=1;
			break;
		case 'rightdown':
			directionX=1;directionY=1;
			break;
	}
	this.zviewer.pan(this.zviewer.backImage,directionX,directionY,amount);
};

SjZViewer.prototype.reset = function() {
	this.zviewer.ResetView(this.zviewer.backImage);
};

SjZViewer.prototype.initialRGN = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgn");
};

SjZViewer.prototype.initialRGNN = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgnn");
};

SjZViewer.prototype.initialRGNA = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgna");
};

SjZViewer.prototype.setRGN = function(rgn) {
	this.zviewer.ZoomSet(rgn,"rgn");
};

SjZViewer.prototype.setRGNN = function(rgn) {
	this.zviewer.ZoomSet(rgn,"rgnn");
};

SjZViewer.prototype.setRGNA = function(rgn) {
	this.zviewer.ZoomSet(rgn,"rgna");
};

SjZViewer.prototype.setBorder = function(sz,bgColor) {
	var w =	parseInt(sjGetWidth(this.elem_base._elementId));
	var h =	parseInt(sjGetHeight(this.elem_base._elementId));
	var bgColor = bgColor || "#666666";
	var sz = sz || 0;
		if( ""+bgColor != "undefined" && ""+bgColor.length > 6 ) {
			sjSetBackColor(this._elementId+'_img',"#"+bgColor.substr(bgColor.length-6));
			sjSetBorder(this._elementId+'_tbl_base',sz,'solid',"#"+bgColor.substr(bgColor.length-6));
			if (this.zviewer.navLayer)
				sjSetBorder(this.zviewer.navLayer._elementId,1,'solid',"#"+bgColor.substr(bgColor.length-6));
		} else {
			sjSetBackColor(this._elementId+'_img',bgColor);
			sjSetBorder(this._elementId+'_tbl_base',sz,'solid',bgColor);
			if (this.zviewer.navLayer)
				sjSetBorder(this.zviewer.navLayer._elementId,1,'solid',bgColor);
		};
			sjSetWidth(this.elem_base._elementId, w+2*sz);
			sjSetHeight(this.elem_base._elementId, h+2*sz);
			sjSetWidth(this._elementId+'_tbl_base', w+2*sz);
			sjSetHeight(this._elementId+'_tbl_base', h+2*sz);
			sjSetXY(this.elem._elementId, sz,sz);
			this.zviewer.imgBorder = sz;
};

SjZViewer.prototype.setFormat = function(str) {
	this.zviewer.setFormat(str);
};

SjZViewer.prototype.setCachingModel = function(str) {
	this.zviewer.setCachingModel(str);
};

SjZViewer.prototype.addInformation = function(str) {
	this.zviewer.addInformation(str);
};

SjZViewer.prototype.setHelpPage = function(str,w,h) {
	this.zviewer.setHelpPage(str,w,h);
};

SjZViewer.prototype.initialRGN = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgn");
};

SjZViewer.prototype.initialRGNN = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgnn");
};

SjZViewer.prototype.initialRGNA = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgna");
};

SjZViewer.prototype.advanced = function( zoomAmount,tiles,percision,transitionLoops,buf_size ) {
	this.zviewer.advanced( zoomAmount,tiles,percision,transitionLoops,buf_size );
};


SjZViewer.prototype.enableUI = function(imgFolder,offset,spacing) {
		sjSetHeight(this.elem_base._elementId,parseInt(sjGetHeight(this._elementId+'_tbl_base'))+20-Math.min(20,offset)+1);
		sjSetHeight(this._elementId+'_img',20-Math.min(20,offset)+1);
		sjSetWidth(this._elementId+'_img',parseInt(sjGetWidth(this._elementId+'_tbl_base')));
		sjSetXY(this._elementId+'_img',0,parseInt(sjGetHeight(this._elementId+'_tbl_base')));
		this.zviewer.enableUI(imgFolder,offset,spacing);
};

SjZViewer.prototype.enableCloseButton = function(position) {
	this.zviewer.enableCloseButton(position);
};

SjZViewer.prototype.showInformation = function() {
	this.zviewer.showInformation();
}

////////
SjZViewer.prototype.setClickToZoom = function(inState){
	return (this.zviewer.clickToZoom = inState);
}

///////
SjZViewer.prototype.setAltText = function(inTooltip){
	if (this.zviewer.mapImage){
		sjGetElement(this.zviewer.mapImage.imgId).alt = inTooltip;
		sjGetElement(this.zviewer.mapImage.imgId).title = inTooltip;
	}else if(this.zviewer.foreImage){
		sjGetElement(this.zviewer.foreImage.imgId).alt = inTooltip;
		sjGetElement(this.zviewer.foreImage.imgId).title = inTooltip;
	}
}

///////
SjZViewer.prototype.getViewerState = function() {
    var i = -1;
	var idx = 0;
	for (i = 0; i < this.zviewer.pageId.length; i++) {
        if (this.zviewer.pageId.charAt(i).charCodeAt(0) >= 48 && this.zviewer.pageId.charAt(i).charCodeAt(0) <= 57) {
            break;
        }
    }
	if (i < this.zviewer.pageId.length){
		idx = parseInt(this.zviewer.pageId.substring(i));
	}
	var stateForXML = "";
	stateForXML += '<state version="1">';
	stateForXML += '<ilc>';
	stateForXML += '<currentImageIdx>'+idx+'</currentImageIdx>';
	stateForXML += '</ilc>';
	stateForXML += '<zpc>';
	stateForXML += '<scale>'+this.zviewer.currentScl+'</scale>';
	stateForXML += '<center>';
	stateForXML += '<x>'+Math.round(this.zviewer.currentScl*(-this.zviewer.currentX+this.zviewer.viewSize.width/2))+'</x>';
	stateForXML += '<y>'+Math.round(this.zviewer.currentScl*(-this.zviewer.currentY+this.zviewer.viewSize.height/2))+'</y>';
	stateForXML += '</center>';
	stateForXML += '</zpc>';
	stateForXML += '</state>';
	return stateForXML;
}

///////
SjZViewer.prototype.makeParamObject = function(inParams){
	var paramObject = null;
	if ((typeof inParams != 'undefined') && (inParams!= null)){
		var paramObject = new Object();
		for (var i = 0; i < inParams.length; i+=2){
			paramObject[inParams[i]] = inParams[i+1];
		}
	}
	return paramObject;
}
///////
SjZViewer.prototype.setHotSpotEnable = function(inState){
	return (this.zviewer.hotSpotEnable = inState);
}
///////
SjZViewer.prototype.imageLabel = function(inLabel){
	if (typeof inLabel != 'undefined'){
		this.zviewer.oimgLabel = this.zviewer.imgLabel;
		this.zviewer.imgLabel = inLabel;
	}
	return this.zviewer.imgLabel;
}
///////
SjZViewer.prototype.setViewerType = function(inType){
		this.viewerType = inType;
}
///////
///////
SjZViewer.prototype.setViewerEventMask = function(inEventMask){
		this.eventMask = inEventMask;
}
///////
SjZViewer.prototype.startLogg = function(){
	var res={message:null,timeStamp:null,sessionId:null,path:null};
	if (typeof this.onEvent.onLogEvent != 'undefined'){
		for (var i = 0; i < this.eventLogger.eventQueue.length; i ++) {
			res.sessionId = this.eventLogger.eventQueue[i].sessionId;
			res.path = this.baseImage;
			res.timeStamp = Math.floor(this.eventLogger.eventQueue[i].timestamp / 1000);
			res.message = this.eventLogger.eventQueue[i].eventId;
			var argList = this.eventLogger.eventQueue[i].argList;
			if (argList != null) {
				for (var j = 0; j < argList.length; j ++) {
					res.message += ',' + escape(argList[j]);
				}
			}
			if (res.message.indexOf('LOAD') == 0) this.onEvent.onLogEvent(res.message,res.timeStamp,res.sessionId,res.path);
		}
	}
}
///////
function SJEventlogger(imageServer,template,catalogPath) {
	var today = new Date();
	var seed = today.getTime();
	function rnd(){
		seed = (seed*9301+49297) % 233280;
		return seed/(233280.0);
	};

	function rand(number){
		return Math.ceil(rnd()*number);
	};

	this.imageServer = imageServer;
	this.template = template;
	this.catalogPath = catalogPath;
	var power = 64;
	this.sessionId = '';//generates session id string (16 hex digits).
	for (var i = 0; i < power / 16; i ++) {
		//var id = Math.round(Math.pow(2, 16) * Math.random());//Math.random()- crash Safari!?!?!?!?
		var id = Math.round(Math.pow(2, 16) * rnd());
		var num = new Number(id);
		var strTmp = num.toString(16);
		while (strTmp.length < 4) {
			strTmp = '0' + strTmp;
		}
		this.sessionId += strTmp;
	}
	this.sessionStartTime = (new Date()).getTime();
	this.lastLogEvent = null;
	this.eventQueue = new Array();
};

SJEventlogger.prototype.evtLOAD = function(inViewerType, inViewerVersion, inEventMask,inImagePath) {
	var argList = [inViewerType, inViewerVersion, inEventMask,-1,-1,-1,inImagePath];
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'LOAD', argList:argList});
};

SJEventlogger.prototype.evtPAGE = function(inPageNumber, inPageLabel) {
	var argList = [inPageNumber, inPageLabel];
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'PAGE', argList:argList});
};

SJEventlogger.prototype.evtZOOM = function(inNewZoomFactor) {
	var argList = [inNewZoomFactor];
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'ZOOM', argList:argList});
};

SJEventlogger.prototype.evtPAN = function() {
	var argList = null;
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'PAN', argList:argList});
};

SJEventlogger.prototype.evtITEM = function(inRolloverKey, inHref, inAlt) {
	var argList = null;
	if (inRolloverKey != null) {
		argList = ['rollover_key=' + inRolloverKey];
	} else if (inHref != null) {
		argList = ['href=' + inHref];
	} else if (inAlt != null) {
		argList = ['alt=' + inAlt];
	}
	if (argList == null) {
		return;
	}
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'ITEM', argList:argList});
};

SJEventlogger.prototype.evtHREF = function(inRolloverKey, inHref) {
	var argList = null;
	if (inRolloverKey != null) {
		argList = ['rolloverKey=' + inRolloverKey];
	} else if (inHref != null) {
		argList = ['href=' + inHref];
	}
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'HREF', argList:argList});
};

SJEventlogger.prototype.evtTARG = function(inZoomTargetNumber, inLabel, inUserData) {
	var argList = [inZoomTargetNumber, inLabel];
	if (inUserData != null) {
		argList.push(inUserData);
	}
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'TARG', argList:argList});
};

SJEventlogger.prototype.evtERR = function(inErrorMessage) {
	var argList = [inErrorMessage];
	return this.logEvent({sessionId:this.sessionId, timestamp:this.getTimestamp(), eventId:'ERR', argList:argList});
};

SJEventlogger.prototype.getTimestamp = function() {
	var d = new Date();
	return (d.getTime() - this.sessionStartTime);
};

SJEventlogger.prototype.logEvent = function(inEvent) {
	var res={message:null,timeStamp:null,sessionId:null,path:null};
	this.lastLogEvent = inEvent;
	this.eventQueue.push(inEvent);
	var logEvent = this.lastLogEvent;
	res.sessionId = logEvent.sessionId;
	res.path = this.catalogPath;
	res.timeStamp = Math.floor(logEvent.timestamp / 1000);
	res.message = logEvent.eventId;
	var argList = logEvent.argList;
	if (argList != null) {
		for (var i = 0; i < argList.length; i ++) {
			res.message += ',' + escape(argList[i]);
		}
	}
	return res;
};

