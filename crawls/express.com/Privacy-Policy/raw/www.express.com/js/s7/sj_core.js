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

function sjSetLayerHTML(layer,html) {  
   if (navigator.userAgent.indexOf('MSIE 5.0') && navigator.userAgent.indexOf('Mac') != -1) html += '\n';
   if (document.getElementById){
      document.getElementById(layer).innerHTML=html;
   } else if (document.all) {
      layer=eval(layer);
      layer.innerHTML=html;
   } 	
}

function sjGetLayerHTML(layer) {
   if (document.getElementById){
      return document.getElementById(layer).innerHTML;
   } else if (document.all) {
      layer=eval(layer);
      return layer.innerHTML;
   }
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
		if(inOpacity > 99) inOpacity = 99;
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


