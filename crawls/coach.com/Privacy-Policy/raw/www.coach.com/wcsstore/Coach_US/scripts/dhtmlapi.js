/*************************************************************************************
*                               DHTML API Wrapper v2.1                               *
*   Page Title:   DHTML Abstraction                                                  *
*   Page Version: 2.1                                                                *
*   Author:       Revised by Tyler Klein, based on some book... can't remember which *
*   Date:         6/18/2006                                                          *
*************************************************************************************/

// --- Include Functions ---//
var INC_DHTMLAPI = true;

// --- Object Functions: --- //
// getRawObject( obj )
// getObject( obj )

// --- Positioning Functions --- //
// getObjectHeight( obj ) 
// getObjectWidth( obj )

// shiftTo( obj, x, y )
// shiftBy( obj, dX, dY )
// setWidth( obj, w )
// setHeight( obj, h )

// center( obj )

// findPosX( obj )
// findPosY( obj )
// getObjectTop( obj )
// getObjectLeft( obj )

// --- Visibility Functions --- //
// show( obj )
// hide( obj )
// alpha( obj, a )
// getAlpha( obj )

// attribute( obj, id )

//Global variables for browser type testing
var isCSS, isW3C, isIE4, isNN4, isIE6CSS;
var ieVersion, ffVersion;

//Initialize document types
function initDHTML(){
	if(document.images){
		isCSS=(document.body && document.body.style)?true:false;
		isW3C=(isCSS && document.getElementById)?true:false;
		isIE4=(isCSS && document.all)?true:false;
		isNN4=(document.layers)?true:false;
		isIE6CSS=(document.compatMode && document.compatMode.indexOf("CSS1")>=0)?true:false;
	}
}
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) //test for MSIE x.x;
	ieVersion=new Number(RegExp.$1) // capture x.x portion and store as a number
if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
	ffVersion=new Number(RegExp.$1) // capture x.x portion and store as a number
	

//Returns an object reference from a string
function getRawObject(obj){
	if (typeof obj=="string"){
		if( isW3C )      return( document.getElementById(obj) );
		else if( isIE4 ) return( document.all(obj) );
		else if( isNN4 ) return( document.layers[obj] );
	}
	else return( obj );
}

//Returns a reference to the style property of an object from a string
function getObject(obj){
	var theObj=getRawObject(obj);
	if( theObj && isCSS ){
		theObj=theObj.style
	}
	return theObj;
}

//Returns object's height in pixels
/*
function getObjectHeight(obj){
	var o = getRawObject(obj);
	var r=0;
	if( o.offsetHeight )                      r=o.offsetHeight;
	else if( o.clip && o.clip.height )        r=o.clip.height;
	else if( o.style && o.style.pixelHeight ) r=o.style.pixelHeight;
	return parseInt(r);
}*/
function getObjectHeight(obj){
	var o=getRawObject(obj);
	var r=0;
	if (o.offsetHeight !== null){
		if( o.scrollHeight && (o.offSetHeight!=o.scrollHeight) ) r=o.scrollHeight;
		else r=o.offsetHeight;
	}
	else if( o.clip && o.clip.height ) r=o.clip.height;
	else if( o.style && o.style.pixelHeight ) r=o.style.pixelHeight;
	return parseInt(r);
}			

//Returns object's width in pixels
function getObjectWidth(obj){
	var o=getRawObject(obj);
	var r=0;
	if (o.offsetWidth !== null){
		if( o.scrollWidth && (o.offSetWidth!=o.scrollWidth) ) r=o.scrollWidth;
		else r=o.offsetWidth;
	}
	else if( o.clip && o.clip.width ) r=o.clip.width;
	else if( o.style && o.style.pixelWidth ) r=o.style.pixelWidth;
	return parseInt(r);
}			

function getObjectVisibleWidth(obj){
	var o=getRawObject(obj);
	var r=0;
	if (o.offsetWidth){
		r=o.offsetWidth;
	}
	else if( o.clip && o.clip.width ) r=o.clip.width;
	else if( o.style && o.style.pixelWidth ) r=o.style.pixelWidth;
	return parseInt(r);
}			

function getObjectVisibleHeight(obj){
	var o=getRawObject(obj);
	var r=0;
	if (o.offsetHeight){
		r=o.offsetHeight;
	}
	else if( o.clip && o.clip.height ) r=o.clip.height;
	else if( o.style && o.style.pixelHeight ) r=o.style.pixelHeight;
	return parseInt(r);
}

//Position obj at x, y
function shiftTo(obj,x,y){
	var o = getObject(obj);
	if( !o ) return;
	if( isCSS ){
		var u = (typeof o.left=="string")?"px":0;
		o.left=x+u;
		o.top=y+u;
	}
	else if( isNN4 ) obj.moveTo(x,y);
}

//Position obj at x, y
function shiftX(obj,x){
	var o = getObject(obj);
	if( !o ) return;
	if( isCSS ){
		var u = (typeof o.left=="string")?"px":0;
		o.left=x+u;
	}
	else if( isNN4 ) obj.moveTo(x,y);
}

//Position obj at x, y
function shiftY(obj,y){
	var o = getObject(obj);
	if( !o ) return;
	if( isCSS ){
		var u = (typeof o.left=="string")?"px":0;
		o.top=y+u;
	}
	else if( isNN4 ) obj.moveTo(x,y);
}

//Move obj by dX, dY
function shiftBy(obj,dX,dY){
	var o=getObject(obj);
	if( !o ) return;
	if( isCSS ){
		var u=(typeof o.left=="string")?"px":0;
		o.left=getObjectLeft(obj)+dX+u;
		o.top=getObjectTop(obj)+dY+u;
	}else if(isNN4) obj.moveBy(dX,dY);
}

//Centers object on screen
var fudgeFactor={top:-1,left:-1}; //Correction for IE/MAC

function center(layerName){
	var obj=getRawObject(layerName);
	
	//set fudgeFactor values first time through
	if (fudgeFactor.top==-1){
		if((typeof obj.offsetTop=="number")&&obj.offsetTop>0){
			fudgeFactor.top=obj.offsetTop;
			fudgeFactor.left=obj.offsetLeft;
		}else{
			fudgeFactor.top=0;
			fudgeFactor.left=0;
		}
		if (obj.offsetWidth && obj.scrollWidth){
			if (obj.offsetWidth!=obj.scrollWidth){
				obj.style.width=obj.scrollWidth;
			}
		}
	}
	
	var x=Math.round((getInsideWindowWidth()/2)-(getObjectWidth(obj)/2));
	var y=Math.round((getInsideWindowHeight()/2)-(getObjectHeight(obj)/2));
	shiftTo(obj,x-fudgeFactor.left,y-fudgeFactor.top);
	show(obj);
}

//NN4 Redraw bug
function handleResize(){
	if( isNN4 ) location.reload();
	else centerIt("banner");
}

//D.1 Window Width
function getInsideWindowWidth(){
	if( document.documentElement.clientWidth ) return( document.documentElement.clientWidth);
	else if( window.innerWidth ) return window.innerWidth;
	else if ( document.body&&document.body.clientWidth ) return document.body.clientWidth;
	return 0;
}

//D.2 Window Height
function getInsideWindowHeight(){
	if( window.innerHeight ) return window.innerHeight;
	else if( document.documentElement.clientHeight ) return( document.documentElement.clientHeight);
	else if ( document.body&&document.body.clientHeight ) return document.body.clientHeight;
	return 0;
}

// Return x position of object
function findPosX( obj ){
	var o = getRawObject( obj );
	if( o.x ) return o.x;
	//if( isIE4 ) return o.offsetLeft;
	if (o.offsetParent) {
		if( o.style.position!='relative' ) return (o.offsetLeft + findPosX(o.offsetParent));
		else return (findPosX(o.offsetParent));
	} else 
		return (o.offsetLeft );
}

// Return y position of object
function findPosY( obj ){
	var o = getRawObject( obj );
	if( o.y ) return o.y;
	if( o.offsetParent ) return( o.offsetTop + findPosY( o.offsetParent ) );
	else return( o.offsetTop );
}

function setPos(obj, x, y){
	try{
		var o = getRawObject( obj );
		//echo( "offsetParent: " + o.offsetParent ? true : false );
		if( o.offsetParent ){
			shiftTo( o, x-findPosX( o.offsetParent ), y-findPosY( o.offsetParent ) );
		} else {
			shiftTo( o, x, y );
		}
	} catch(e){ echoError(e) };
}

function setWidth( obj, w ){
	var o = getObject( obj );
	if( w < 1 ) hide( obj );
	else {
		o.width = w + "px"
		show( obj );
	}
}

function setHeight( obj, h ){
	var o = getObject( obj );
	if( h < 1 ) hide( obj );
	else {
		o.height = h + "px"
		show( obj );
	}
}

function stripPX( str ){
	if( (typeof( str) == 'string') && (str.substring( -2 ) == "px") )
		return( parseInt(str.substring( 0, -2 )) );
	else
		return( parseInt(str) );
}

//get left coordinate
function getObjectLeft(obj){
	var o=getRawObject(obj);
	var r=0;
	if( document.defaultView ){
		var style=document.defaultView;
		var cssDec1=style.getComputedStyle(o,"");
		r=cssDec1.getPropertyValue("left");
	}
	else if( o.currentStyle ) r=o.currentStyle.left;
	else if( elem.style )     r=o.style.left;
	else if( isNN4 )          r=o.left;
	return parseInt(r);
}

//get top coordinate
function getObjectTop(obj){
	var o=getRawObject(obj);
	var r=0;
	if( document.defaultView ){
		var style=document.defaultView;
		var cssDec1=style.getComputedStyle(o,"");
		r=cssDec1.getPropertyValue("top");
	}
	else if( o.currentStyle ) r=o.currentStyle.top;
	else if(o.style)          r=o.style.top;
	else if(isNN4)            r=o.top;
	return parseInt(r);
}

//Show object
function show(obj/*, hideBlock*/){
	var o=getObject(obj);
	if( o ){
	//	if( arguments.length > 1 ) o.display = "block";
	//	else 
		o.visibility = "visible";
	}
}

//Hide Object
function hide(obj/*, hideBlock*/){
	var o=getObject(obj);
	if( o ){
		//if( arguments.length > 1 )
		//	o.display = "none";
		//else
			o.visibility="hidden";
	}
}

function overflowVisible( o ){ o.style.overflow = 'visible'; }
function overflowHidden( o ){  o.style.overflow = 'hidden'; }

function turnOff(obj){
	var o=getObject(obj);
	if( o ) o.display = "none";
}
function turnOn(obj){
	var o=getObject(obj);
	if( o ) o.display = "block";
}

//Show/Hide Object
function showhide(obj){
	var o=getObject(obj);
	if( o.visibility == "hidden" ) show( o );
	else hide( o );
}

//Return x scroll of window
function scrollX(){
	return (document.all)?document.body.scrollLeft:window.pageXOffset; 
}

//Return y scroll of window
function scrollY(){
	return (document.all)?document.body.scrollTop:window.pageYOffset; 
}

//Return y scroll of window
function setScrollY( top ){
	if( document.all ){
		document.body.scrollTop = top;
	} else {
		window.scrollTo(0,top);
	}
}

//set alpha of an object
function alpha( obj, a ){
	var o=getObject( obj );
    o.opacity = (a / 100);
    o.MozOpacity = (a / 100);
    o.KhtmlOpacity = (a / 100);
    o.filter = "alpha(opacity="+a+")";
}

//get the alpha of an object
function getAlpha( obj ){
	var o = getObject( obj );
	if( o.opacity ) return( o.opacity * 100 );
	if( o.MozOpacity ) return( o.MozOpacity * 100 );
	if( o.KhtmlOpacity ) return( o.KhtmlOpacity * 100 );
	return( 100 );
}

//Gets the keyboard modifiers
function getKeyModifiers( evt ){
	if ( evt ) {
		var shft = evt.shiftKey;
		var ctrl = evt.ctrlKey;
		var alt  = evt.altKey;
	} else {
		var shft = event.shiftKey;
		var ctrl = event.ctrlKey;
		var alt  = event.altKey;
	}	
	return( {shift:shft, ctrl:ctrl, alt:alt} );
}

function getKey( evt ){
	evt = evt ? evt : window.event;
	if( evt.keyCode )
		return( evt.keyCode );
	else
		return( evt.which );
}

//Gets an event's target
function getEvtTarget( evt ){
	if( evt ) 
		return( evt.target );
	else
		return(window.event.srcElement);
}

//Gets a mouseover's from target
function mouseFrom( evt ){
	if (!evt) var evt = window.event;
	return( evt.relatedTarget || evt.fromElement );
}

//Gets a mouseout's to target
function mouseTo( evt ){
	if (!evt) var evt = window.event;
	return( evt.relatedTarget || evt.toElement );
}

//Gets an event's click location
function getEvtClick( evt ){
	if( isIE4 )
		return( {x:window.event.clientX, y:window.event.clientY} );
	else
		return( {x:evt.pageX, y:evt.pageY} );
}

function getCSS(obj, property){
	var o = getRawObject( o );
	if (o.currentStyle)
		var p = o.currentStyle[property];
	else if (window.getComputedStyle)
		var p = document.defaultView.getComputedStyle(o,null).getPropertyValue(property);
	return p;
}

function moveToFront( o ){
	var th = o.style.zIndex;
	if( !th ){
		for( i=0; i < o.parentNode.childNodes.length; i++ )
			if( o.parentNode.childNodes[i].style ) 
				o.parentNode.childNodes[i].style.zIndex = i;
		th = o.style.zIndex;
	}
	for( i=0; i < o.parentNode.childNodes.length - 1; i++ )
		if( o.parentNode.childNodes[i].style )
			if( o.parentNode.childNodes[i].style.zIndex > th )
				o.parentNode.childNodes[i].style.zIndex--;
	o.style.zIndex = i + 1;
}

function attribute( obj, id /*, default*/ ){
	var jsVal = eval( "obj." + id );
	var v = obj.getAttribute ? obj.getAttribute( id ) : null;
	v = v ? v : jsVal ? jsVal : (arguments.length > 2) ? arguments[2] : null;
	return( v );
}

function gotoURL(url){
	if( window.navigate ) window.navigate( url);
	else window.location = url;
}

var addEvent;
if (document.addEventListener) {
	addEvent = function(element, type, handler){ 
		element.addEventListener(type, handler, false);
	};
} else if (document.attachEvent) {
	addEvent = function(element, type, handler){ 
		element.attachEvent("on" + type, handler); 
	};
} else {
	addEvent = new Function; // not supported
}

var killEvent;
if (document.removeEventListener) {
	killEvent = function(element, type, handler){
		element.removeEventListener(type, handler, false); 
	};
} else if (document.detachEvent) { 
	killEvent = function(element, type, handler) { 
		element.detachEvent("on" + type, handler); 
	};
} else {
	killEvent = new Function; // not supported
}

function killBubble( evt ){
	if (!evt) var evt = window.event;
	evt.cancelBubble = true;
	if (evt.stopPropagation) evt.stopPropagation();
}

function killTextSelection( obj ){
	obj.onselectstart = function(){return( false );}
	obj.onmousedown   = function(){return( false );}
}

function getThis( o ){
	return( (o==window) ? o.event.srcElement : o );
}

var addIFrameShim;
if(ieVersion == 6 ){ addIFrameShim = function( obj ){
	obj.shim = document.createElement("iframe");
	obj.shim.setAttribute('frameborder','0');
	obj.shim.setAttribute('scrolling','no');
	obj.shim.setAttribute('src','javascript:"<html></html>";');
	obj.shim.style.zIndex='1';
	obj.shim.style.filter="alpha(opacity=0); ";
	obj.shim.style.position='absolute';
	setWidth( obj.shim, getObjectWidth(obj) );
	setHeight( obj.shim, getObjectHeight(obj) );
	shiftTo( obj.shim, getObjectTop(obj), getObjectLeft(obj) );
	document.documentElement.lastChild.appendChild( obj.shim );
}} else addIFrameShim = new Function;

var updateIFrameShim;
if(ieVersion == 6 ){ updateIFrameShim = function( obj ){
	setWidth( obj.shim, getObjectWidth(obj) );
	setHeight( obj.shim, getObjectHeight(obj) );
	shiftTo( obj.shim, getObjectLeft(obj), getObjectTop(obj) );	
}} else updateIFrameShim = new Function;

var killIFrameShim;
if(ieVersion == 6 ){ killIFrameShim = function( obj ){
	if( !obj || !obj.shim || obj.shim.nodeName != 'IFRAME') return;
	document.documentElement.lastChild.removeChild( obj.shim );
}} else killIFrameShim = new Function;
