(function($,_1){
$.ui=$.ui||{};
if($.ui.version){
return;
}
$.extend($.ui,{version:"1.8.22",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
$.fn.extend({propAttr:$.fn.prop||$.fn.attr,_focus:$.fn.focus,focus:function(_2,fn){
return typeof _2==="number"?this.each(function(){
var _3=this;
setTimeout(function(){
$(_3).focus();
if(fn){
fn.call(_3);
}
},_2);
}):this._focus.apply(this,arguments);
},scrollParent:function(){
var _4;
if(($.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){
_4=this.parents().filter(function(){
return (/(relative|absolute|fixed)/).test($.curCSS(this,"position",1))&&(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1));
}).eq(0);
}else{
_4=this.parents().filter(function(){
return (/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1));
}).eq(0);
}
return (/fixed/).test(this.css("position"))||!_4.length?$(document):_4;
},zIndex:function(_5){
if(_5!==_1){
return this.css("zIndex",_5);
}
if(this.length){
var _6=$(this[0]),_7,_8;
while(_6.length&&_6[0]!==document){
_7=_6.css("position");
if(_7==="absolute"||_7==="relative"||_7==="fixed"){
_8=parseInt(_6.css("zIndex"),10);
if(!isNaN(_8)&&_8!==0){
return _8;
}
}
_6=_6.parent();
}
}
return 0;
},disableSelection:function(){
return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(_9){
_9.preventDefault();
});
},enableSelection:function(){
return this.unbind(".ui-disableSelection");
}});
if(!$("<a>").outerWidth(1).jquery){
$.each(["Width","Height"],function(i,_a){
var _b=_a==="Width"?["Left","Right"]:["Top","Bottom"],_c=_a.toLowerCase(),_d={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};
function _e(_f,_10,_11,_12){
$.each(_b,function(){
_10-=parseFloat($.curCSS(_f,"padding"+this,true))||0;
if(_11){
_10-=parseFloat($.curCSS(_f,"border"+this+"Width",true))||0;
}
if(_12){
_10-=parseFloat($.curCSS(_f,"margin"+this,true))||0;
}
});
return _10;
};
$.fn["inner"+_a]=function(_13){
if(_13===_1){
return _d["inner"+_a].call(this);
}
return this.each(function(){
$(this).css(_c,_e(this,_13)+"px");
});
};
$.fn["outer"+_a]=function(_14,_15){
if(typeof _14!=="number"){
return _d["outer"+_a].call(this,_14);
}
return this.each(function(){
$(this).css(_c,_e(this,_14,true,_15)+"px");
});
};
});
}
function _16(_17,_18){
var _19=_17.nodeName.toLowerCase();
if("area"===_19){
var map=_17.parentNode,_1a=map.name,img;
if(!_17.href||!_1a||map.nodeName.toLowerCase()!=="map"){
return false;
}
img=$("img[usemap=#"+_1a+"]")[0];
return !!img&&_1b(img);
}
return (/input|select|textarea|button|object/.test(_19)?!_17.disabled:"a"==_19?_17.href||_18:_18)&&_1b(_17);
};
function _1b(_1c){
return !$(_1c).parents().andSelf().filter(function(){
return $.curCSS(this,"visibility")==="hidden"||$.expr.filters.hidden(this);
}).length;
};
$.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(_1d){
return function(_1e){
return !!$.data(_1e,_1d);
};
}):function(_1f,i,_20){
return !!$.data(_1f,_20[3]);
},focusable:function(_21){
return _16(_21,!isNaN($.attr(_21,"tabindex")));
},tabbable:function(_22){
var _23=$.attr(_22,"tabindex"),_24=isNaN(_23);
return (_24||_23>=0)&&_16(_22,!_24);
}});
$(function(){
var _25=document.body,div=_25.appendChild(div=document.createElement("div"));
div.offsetHeight;
$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
$.support.minHeight=div.offsetHeight===100;
$.support.selectstart="onselectstart" in div;
_25.removeChild(div).style.display="none";
});
if(!$.curCSS){
$.curCSS=$.css;
}
$.extend($.ui,{plugin:{add:function(_26,_27,set){
var _28=$.ui[_26].prototype;
for(var i in set){
_28.plugins[i]=_28.plugins[i]||[];
_28.plugins[i].push([_27,set[i]]);
}
},call:function(_29,_2a,_2b){
var set=_29.plugins[_2a];
if(!set||!_29.element[0].parentNode){
return;
}
for(var i=0;i<set.length;i++){
if(_29.options[set[i][0]]){
set[i][1].apply(_29.element,_2b);
}
}
}},contains:function(a,b){
return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);
},hasScroll:function(el,a){
if($(el).css("overflow")==="hidden"){
return false;
}
var _2c=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;
if(el[_2c]>0){
return true;
}
el[_2c]=1;
has=(el[_2c]>0);
el[_2c]=0;
return has;
},isOverAxis:function(x,_2d,_2e){
return (x>_2d)&&(x<(_2d+_2e));
},isOver:function(y,x,top,_2f,_30,_31){
return $.ui.isOverAxis(y,top,_30)&&$.ui.isOverAxis(x,_2f,_31);
}});
})(jQuery);
(function($,_32){
if($.cleanData){
var _33=$.cleanData;
$.cleanData=function(_34){
for(var i=0,_35;(_35=_34[i])!=null;i++){
try{
$(_35).triggerHandler("remove");
}
catch(e){
}
}
_33(_34);
};
}else{
var _36=$.fn.remove;
$.fn.remove=function(_37,_38){
return this.each(function(){
if(!_38){
if(!_37||$.filter(_37,[this]).length){
$("*",this).add([this]).each(function(){
try{
$(this).triggerHandler("remove");
}
catch(e){
}
});
}
}
return _36.call($(this),_37,_38);
});
};
}
$.widget=function(_39,_3a,_3b){
var _3c=_39.split(".")[0],_3d;
_39=_39.split(".")[1];
_3d=_3c+"-"+_39;
if(!_3b){
_3b=_3a;
_3a=$.Widget;
}
$.expr[":"][_3d]=function(_3e){
return !!$.data(_3e,_39);
};
$[_3c]=$[_3c]||{};
$[_3c][_39]=function(_3f,_40){
if(arguments.length){
this._createWidget(_3f,_40);
}
};
var _41=new _3a();
_41.options=$.extend(true,{},_41.options);
$[_3c][_39].prototype=$.extend(true,_41,{namespace:_3c,widgetName:_39,widgetEventPrefix:$[_3c][_39].prototype.widgetEventPrefix||_39,widgetBaseClass:_3d},_3b);
$.widget.bridge(_39,$[_3c][_39]);
};
$.widget.bridge=function(_42,_43){
$.fn[_42]=function(_44){
var _45=typeof _44==="string",_46=Array.prototype.slice.call(arguments,1),_47=this;
_44=!_45&&_46.length?$.extend.apply(null,[true,_44].concat(_46)):_44;
if(_45&&_44.charAt(0)==="_"){
return _47;
}
if(_45){
this.each(function(){
var _48=$.data(this,_42),_49=_48&&$.isFunction(_48[_44])?_48[_44].apply(_48,_46):_48;
if(_49!==_48&&_49!==_32){
_47=_49;
return false;
}
});
}else{
this.each(function(){
var _4a=$.data(this,_42);
if(_4a){
_4a.option(_44||{})._init();
}else{
$.data(this,_42,new _43(_44,this));
}
});
}
return _47;
};
};
$.Widget=function(_4b,_4c){
if(arguments.length){
this._createWidget(_4b,_4c);
}
};
$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(_4d,_4e){
$.data(_4e,this.widgetName,this);
this.element=$(_4e);
this.options=$.extend(true,{},this.options,this._getCreateOptions(),_4d);
var _4f=this;
this.element.bind("remove."+this.widgetName,function(){
_4f.destroy();
});
this._create();
this._trigger("create");
this._init();
},_getCreateOptions:function(){
return $.metadata&&$.metadata.get(this.element[0])[this.widgetName];
},_create:function(){
},_init:function(){
},destroy:function(){
this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled");
},widget:function(){
return this.element;
},option:function(key,_50){
var _51=key;
if(arguments.length===0){
return $.extend({},this.options);
}
if(typeof key==="string"){
if(_50===_32){
return this.options[key];
}
_51={};
_51[key]=_50;
}
this._setOptions(_51);
return this;
},_setOptions:function(_52){
var _53=this;
$.each(_52,function(key,_54){
_53._setOption(key,_54);
});
return this;
},_setOption:function(key,_55){
this.options[key]=_55;
if(key==="disabled"){
this.widget()[_55?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",_55);
}
return this;
},enable:function(){
return this._setOption("disabled",false);
},disable:function(){
return this._setOption("disabled",true);
},_trigger:function(_56,_57,_58){
var _59,_5a,_5b=this.options[_56];
_58=_58||{};
_57=$.Event(_57);
_57.type=(_56===this.widgetEventPrefix?_56:this.widgetEventPrefix+_56).toLowerCase();
_57.target=this.element[0];
_5a=_57.originalEvent;
if(_5a){
for(_59 in _5a){
if(!(_59 in _57)){
_57[_59]=_5a[_59];
}
}
}
this.element.trigger(_57,_58);
return !($.isFunction(_5b)&&_5b.call(this.element[0],_57,_58)===false||_57.isDefaultPrevented());
}};
})(jQuery);
(function($,_5c){
var _5d=false;
$(document).mouseup(function(e){
_5d=false;
});
$.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){
var _5e=this;
this.element.bind("mousedown."+this.widgetName,function(_5f){
return _5e._mouseDown(_5f);
}).bind("click."+this.widgetName,function(_60){
if(true===$.data(_60.target,_5e.widgetName+".preventClickEvent")){
$.removeData(_60.target,_5e.widgetName+".preventClickEvent");
_60.stopImmediatePropagation();
return false;
}
});
this.started=false;
},_mouseDestroy:function(){
this.element.unbind("."+this.widgetName);
$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
},_mouseDown:function(_61){
if(_5d){
return;
}
(this._mouseStarted&&this._mouseUp(_61));
this._mouseDownEvent=_61;
var _62=this,_63=(_61.which==1),_64=(typeof this.options.cancel=="string"&&_61.target.nodeName?$(_61.target).closest(this.options.cancel).length:false);
if(!_63||_64||!this._mouseCapture(_61)){
return true;
}
this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){
this._mouseDelayTimer=setTimeout(function(){
_62.mouseDelayMet=true;
},this.options.delay);
}
if(this._mouseDistanceMet(_61)&&this._mouseDelayMet(_61)){
this._mouseStarted=(this._mouseStart(_61)!==false);
if(!this._mouseStarted){
_61.preventDefault();
return true;
}
}
if(true===$.data(_61.target,this.widgetName+".preventClickEvent")){
$.removeData(_61.target,this.widgetName+".preventClickEvent");
}
this._mouseMoveDelegate=function(_65){
return _62._mouseMove(_65);
};
this._mouseUpDelegate=function(_66){
return _62._mouseUp(_66);
};
$(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
_61.preventDefault();
_5d=true;
return true;
},_mouseMove:function(_67){
if($.browser.msie&&!(document.documentMode>=9)&&!_67.button){
return this._mouseUp(_67);
}
if(this._mouseStarted){
this._mouseDrag(_67);
return _67.preventDefault();
}
if(this._mouseDistanceMet(_67)&&this._mouseDelayMet(_67)){
this._mouseStarted=(this._mouseStart(this._mouseDownEvent,_67)!==false);
(this._mouseStarted?this._mouseDrag(_67):this._mouseUp(_67));
}
return !this._mouseStarted;
},_mouseUp:function(_68){
$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){
this._mouseStarted=false;
if(_68.target==this._mouseDownEvent.target){
$.data(_68.target,this.widgetName+".preventClickEvent",true);
}
this._mouseStop(_68);
}
return false;
},_mouseDistanceMet:function(_69){
return (Math.max(Math.abs(this._mouseDownEvent.pageX-_69.pageX),Math.abs(this._mouseDownEvent.pageY-_69.pageY))>=this.options.distance);
},_mouseDelayMet:function(_6a){
return this.mouseDelayMet;
},_mouseStart:function(_6b){
},_mouseDrag:function(_6c){
},_mouseStop:function(_6d){
},_mouseCapture:function(_6e){
return true;
}});
})(jQuery);
(function($,_6f){
$.widget("ui.sortable",$.ui.mouse,{widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){
var o=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?o.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit();
this.ready=true;
},destroy:function(){
$.Widget.prototype.destroy.call(this);
this.element.removeClass("ui-sortable ui-sortable-disabled");
this._mouseDestroy();
for(var i=this.items.length-1;i>=0;i--){
this.items[i].item.removeData(this.widgetName+"-item");
}
return this;
},_setOption:function(key,_70){
if(key==="disabled"){
this.options[key]=_70;
this.widget()[_70?"addClass":"removeClass"]("ui-sortable-disabled");
}else{
$.Widget.prototype._setOption.apply(this,arguments);
}
},_mouseCapture:function(_71,_72){
var _73=this;
if(this.reverting){
return false;
}
if(this.options.disabled||this.options.type=="static"){
return false;
}
this._refreshItems(_71);
var _74=null,_75=this,_76=$(_71.target).parents().each(function(){
if($.data(this,_73.widgetName+"-item")==_75){
_74=$(this);
return false;
}
});
if($.data(_71.target,_73.widgetName+"-item")==_75){
_74=$(_71.target);
}
if(!_74){
return false;
}
if(this.options.handle&&!_72){
var _77=false;
$(this.options.handle,_74).find("*").andSelf().each(function(){
if(this==_71.target){
_77=true;
}
});
if(!_77){
return false;
}
}
this.currentItem=_74;
this._removeCurrentsFromItems();
return true;
},_mouseStart:function(_78,_79,_7a){
var o=this.options,_7b=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(_78);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
$.extend(this.offset,{click:{left:_78.pageX-this.offset.left,top:_78.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
this.originalPosition=this._generatePosition(_78);
this.originalPageX=_78.pageX;
this.originalPageY=_78.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){
this.currentItem.hide();
}
this._createPlaceholder();
if(o.containment){
this._setContainment();
}
if(o.cursor){
if($("body").css("cursor")){
this._storedCursor=$("body").css("cursor");
}
$("body").css("cursor",o.cursor);
}
if(o.opacity){
if(this.helper.css("opacity")){
this._storedOpacity=this.helper.css("opacity");
}
this.helper.css("opacity",o.opacity);
}
if(o.zIndex){
if(this.helper.css("zIndex")){
this._storedZIndex=this.helper.css("zIndex");
}
this.helper.css("zIndex",o.zIndex);
}
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
this.overflowOffset=this.scrollParent.offset();
}
this._trigger("start",_78,this._uiHash());
if(!this._preserveHelperProportions){
this._cacheHelperProportions();
}
if(!_7a){
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("activate",_78,_7b._uiHash(this));
}
}
if($.ui.ddmanager){
$.ui.ddmanager.current=this;
}
if($.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_78);
}
this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(_78);
return true;
},_mouseDrag:function(_7c){
this.position=this._generatePosition(_7c);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){
this.lastPositionAbs=this.positionAbs;
}
if(this.options.scroll){
var o=this.options,_7d=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-_7c.pageY<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_7d=this.scrollParent[0].scrollTop+o.scrollSpeed;
}else{
if(_7c.pageY-this.overflowOffset.top<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_7d=this.scrollParent[0].scrollTop-o.scrollSpeed;
}
}
if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-_7c.pageX<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_7d=this.scrollParent[0].scrollLeft+o.scrollSpeed;
}else{
if(_7c.pageX-this.overflowOffset.left<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_7d=this.scrollParent[0].scrollLeft-o.scrollSpeed;
}
}
}else{
if(_7c.pageY-$(document).scrollTop()<o.scrollSensitivity){
_7d=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);
}else{
if($(window).height()-(_7c.pageY-$(document).scrollTop())<o.scrollSensitivity){
_7d=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);
}
}
if(_7c.pageX-$(document).scrollLeft()<o.scrollSensitivity){
_7d=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);
}else{
if($(window).width()-(_7c.pageX-$(document).scrollLeft())<o.scrollSensitivity){
_7d=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);
}
}
}
if(_7d!==false&&$.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_7c);
}
}
this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){
this.helper[0].style.left=this.position.left+"px";
}
if(!this.options.axis||this.options.axis!="x"){
this.helper[0].style.top=this.position.top+"px";
}
for(var i=this.items.length-1;i>=0;i--){
var _7e=this.items[i],_7f=_7e.item[0],_80=this._intersectsWithPointer(_7e);
if(!_80){
continue;
}
if(_7f!=this.currentItem[0]&&this.placeholder[_80==1?"next":"prev"]()[0]!=_7f&&!$.ui.contains(this.placeholder[0],_7f)&&(this.options.type=="semi-dynamic"?!$.ui.contains(this.element[0],_7f):true)){
this.direction=_80==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(_7e)){
this._rearrange(_7c,_7e);
}else{
break;
}
this._trigger("change",_7c,this._uiHash());
break;
}
}
this._contactContainers(_7c);
if($.ui.ddmanager){
$.ui.ddmanager.drag(this,_7c);
}
this._trigger("sort",_7c,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false;
},_mouseStop:function(_81,_82){
if(!_81){
return;
}
if($.ui.ddmanager&&!this.options.dropBehaviour){
$.ui.ddmanager.drop(this,_81);
}
if(this.options.revert){
var _83=this;
var cur=_83.placeholder.offset();
_83.reverting=true;
$(this.helper).animate({left:cur.left-this.offset.parent.left-_83.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:cur.top-this.offset.parent.top-_83.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){
_83._clear(_81);
});
}else{
this._clear(_81,_82);
}
return false;
},cancel:function(){
var _84=this;
if(this.dragging){
this._mouseUp({target:null});
if(this.options.helper=="original"){
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("deactivate",null,_84._uiHash(this));
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",null,_84._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(this.placeholder){
if(this.placeholder[0].parentNode){
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
}
if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){
this.helper.remove();
}
$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){
$(this.domPosition.prev).after(this.currentItem);
}else{
$(this.domPosition.parent).prepend(this.currentItem);
}
}
return this;
},serialize:function(o){
var _85=this._getItemsAsjQuery(o&&o.connected);
var str=[];
o=o||{};
$(_85).each(function(){
var res=($(o.item||this).attr(o.attribute||"id")||"").match(o.expression||(/(.+)[-=_](.+)/));
if(res){
str.push((o.key||res[1]+"[]")+"="+(o.key&&o.expression?res[1]:res[2]));
}
});
if(!str.length&&o.key){
str.push(o.key+"=");
}
return str.join("&");
},toArray:function(o){
var _86=this._getItemsAsjQuery(o&&o.connected);
var ret=[];
o=o||{};
_86.each(function(){
ret.push($(o.item||this).attr(o.attribute||"id")||"");
});
return ret;
},_intersectsWith:function(_87){
var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;
var l=_87.left,r=l+_87.width,t=_87.top,b=t+_87.height;
var _88=this.offset.click.top,_89=this.offset.click.left;
var _8a=(y1+_88)>t&&(y1+_88)<b&&(x1+_89)>l&&(x1+_89)<r;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>_87[this.floating?"width":"height"])){
return _8a;
}else{
return (l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b);
}
},_intersectsWithPointer:function(_8b){
var _8c=(this.options.axis==="x")||$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_8b.top,_8b.height),_8d=(this.options.axis==="y")||$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_8b.left,_8b.width),_8e=_8c&&_8d,_8f=this._getDragVerticalDirection(),_90=this._getDragHorizontalDirection();
if(!_8e){
return false;
}
return this.floating?(((_90&&_90=="right")||_8f=="down")?2:1):(_8f&&(_8f=="down"?2:1));
},_intersectsWithSides:function(_91){
var _92=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_91.top+(_91.height/2),_91.height),_93=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_91.left+(_91.width/2),_91.width),_94=this._getDragVerticalDirection(),_95=this._getDragHorizontalDirection();
if(this.floating&&_95){
return ((_95=="right"&&_93)||(_95=="left"&&!_93));
}else{
return _94&&((_94=="down"&&_92)||(_94=="up"&&!_92));
}
},_getDragVerticalDirection:function(){
var _96=this.positionAbs.top-this.lastPositionAbs.top;
return _96!=0&&(_96>0?"down":"up");
},_getDragHorizontalDirection:function(){
var _97=this.positionAbs.left-this.lastPositionAbs.left;
return _97!=0&&(_97>0?"right":"left");
},refresh:function(_98){
this._refreshItems(_98);
this.refreshPositions();
return this;
},_connectWith:function(){
var _99=this.options;
return _99.connectWith.constructor==String?[_99.connectWith]:_99.connectWith;
},_getItemsAsjQuery:function(_9a){
var _9b=this;
var _9c=[];
var _9d=[];
var _9e=this._connectWith();
if(_9e&&_9a){
for(var i=_9e.length-1;i>=0;i--){
var cur=$(_9e[i]);
for(var j=cur.length-1;j>=0;j--){
var _9f=$.data(cur[j],this.widgetName);
if(_9f&&_9f!=this&&!_9f.options.disabled){
_9d.push([$.isFunction(_9f.options.items)?_9f.options.items.call(_9f.element):$(_9f.options.items,_9f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),_9f]);
}
}
}
}
_9d.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var i=_9d.length-1;i>=0;i--){
_9d[i][0].each(function(){
_9c.push(this);
});
}
return $(_9c);
},_removeCurrentsFromItems:function(){
var _a0=this.currentItem.find(":data("+this.widgetName+"-item)");
for(var i=0;i<this.items.length;i++){
for(var j=0;j<_a0.length;j++){
if(_a0[j]==this.items[i].item[0]){
this.items.splice(i,1);
}
}
}
},_refreshItems:function(_a1){
this.items=[];
this.containers=[this];
var _a2=this.items;
var _a3=this;
var _a4=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],_a1,{item:this.currentItem}):$(this.options.items,this.element),this]];
var _a5=this._connectWith();
if(_a5&&this.ready){
for(var i=_a5.length-1;i>=0;i--){
var cur=$(_a5[i]);
for(var j=cur.length-1;j>=0;j--){
var _a6=$.data(cur[j],this.widgetName);
if(_a6&&_a6!=this&&!_a6.options.disabled){
_a4.push([$.isFunction(_a6.options.items)?_a6.options.items.call(_a6.element[0],_a1,{item:this.currentItem}):$(_a6.options.items,_a6.element),_a6]);
this.containers.push(_a6);
}
}
}
}
for(var i=_a4.length-1;i>=0;i--){
var _a7=_a4[i][1];
var _a8=_a4[i][0];
for(var j=0,_a9=_a8.length;j<_a9;j++){
var _aa=$(_a8[j]);
_aa.data(this.widgetName+"-item",_a7);
_a2.push({item:_aa,instance:_a7,width:0,height:0,left:0,top:0});
}
}
},refreshPositions:function(_ab){
if(this.offsetParent&&this.helper){
this.offset.parent=this._getParentOffset();
}
for(var i=this.items.length-1;i>=0;i--){
var _ac=this.items[i];
if(_ac.instance!=this.currentContainer&&this.currentContainer&&_ac.item[0]!=this.currentItem[0]){
continue;
}
var t=this.options.toleranceElement?$(this.options.toleranceElement,_ac.item):_ac.item;
if(!_ab){
_ac.width=t.outerWidth();
_ac.height=t.outerHeight();
}
var p=t.offset();
_ac.left=p.left;
_ac.top=p.top;
}
if(this.options.custom&&this.options.custom.refreshContainers){
this.options.custom.refreshContainers.call(this);
}else{
for(var i=this.containers.length-1;i>=0;i--){
var p=this.containers[i].element.offset();
this.containers[i].containerCache.left=p.left;
this.containers[i].containerCache.top=p.top;
this.containers[i].containerCache.width=this.containers[i].element.outerWidth();
this.containers[i].containerCache.height=this.containers[i].element.outerHeight();
}
}
return this;
},_createPlaceholder:function(_ad){
var _ae=_ad||this,o=_ae.options;
if(!o.placeholder||o.placeholder.constructor==String){
var _af=o.placeholder;
o.placeholder={element:function(){
var el=$(document.createElement(_ae.currentItem[0].nodeName)).addClass(_af||_ae.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!_af){
el.style.visibility="hidden";
}
return el;
},update:function(_b0,p){
if(_af&&!o.forcePlaceholderSize){
return;
}
if(!p.height()){
p.height(_ae.currentItem.innerHeight()-parseInt(_ae.currentItem.css("paddingTop")||0,10)-parseInt(_ae.currentItem.css("paddingBottom")||0,10));
}
if(!p.width()){
p.width(_ae.currentItem.innerWidth()-parseInt(_ae.currentItem.css("paddingLeft")||0,10)-parseInt(_ae.currentItem.css("paddingRight")||0,10));
}
}};
}
_ae.placeholder=$(o.placeholder.element.call(_ae.element,_ae.currentItem));
_ae.currentItem.after(_ae.placeholder);
o.placeholder.update(_ae,_ae.placeholder);
},_contactContainers:function(_b1){
var _b2=null,_b3=null;
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.currentItem[0],this.containers[i].element[0])){
continue;
}
if(this._intersectsWith(this.containers[i].containerCache)){
if(_b2&&$.ui.contains(this.containers[i].element[0],_b2.element[0])){
continue;
}
_b2=this.containers[i];
_b3=i;
}else{
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",_b1,this._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(!_b2){
return;
}
if(this.containers.length===1){
this.containers[_b3]._trigger("over",_b1,this._uiHash(this));
this.containers[_b3].containerCache.over=1;
}else{
if(this.currentContainer!=this.containers[_b3]){
var _b4=10000;
var _b5=null;
var _b6=this.positionAbs[this.containers[_b3].floating?"left":"top"];
for(var j=this.items.length-1;j>=0;j--){
if(!$.ui.contains(this.containers[_b3].element[0],this.items[j].item[0])){
continue;
}
var cur=this.containers[_b3].floating?this.items[j].item.offset().left:this.items[j].item.offset().top;
if(Math.abs(cur-_b6)<_b4){
_b4=Math.abs(cur-_b6);
_b5=this.items[j];
this.direction=(cur-_b6>0)?"down":"up";
}
}
if(!_b5&&!this.options.dropOnEmpty){
return;
}
this.currentContainer=this.containers[_b3];
_b5?this._rearrange(_b1,_b5,null,true):this._rearrange(_b1,null,this.containers[_b3].element,true);
this._trigger("change",_b1,this._uiHash());
this.containers[_b3]._trigger("change",_b1,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[_b3]._trigger("over",_b1,this._uiHash(this));
this.containers[_b3].containerCache.over=1;
}
}
},_createHelper:function(_b7){
var o=this.options;
var _b8=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[_b7,this.currentItem])):(o.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!_b8.parents("body").length){
$(o.appendTo!="parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(_b8[0]);
}
if(_b8[0]==this.currentItem[0]){
this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};
}
if(_b8[0].style.width==""||o.forceHelperSize){
_b8.width(this.currentItem.width());
}
if(_b8[0].style.height==""||o.forceHelperSize){
_b8.height(this.currentItem.height());
}
return _b8;
},_adjustOffsetFromHelper:function(obj){
if(typeof obj=="string"){
obj=obj.split(" ");
}
if($.isArray(obj)){
obj={left:+obj[0],top:+obj[1]||0};
}
if("left" in obj){
this.offset.click.left=obj.left+this.margins.left;
}
if("right" in obj){
this.offset.click.left=this.helperProportions.width-obj.right+this.margins.left;
}
if("top" in obj){
this.offset.click.top=obj.top+this.margins.top;
}
if("bottom" in obj){
this.offset.click.top=this.helperProportions.height-obj.bottom+this.margins.top;
}
},_getParentOffset:function(){
this.offsetParent=this.helper.offsetParent();
var po=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0])){
po.left+=this.scrollParent.scrollLeft();
po.top+=this.scrollParent.scrollTop();
}
if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&$.browser.msie)){
po={top:0,left:0};
}
return {top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};
},_getRelativeOffset:function(){
if(this.cssPosition=="relative"){
var p=this.currentItem.position();
return {top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};
}else{
return {top:0,left:0};
}
},_cacheMargins:function(){
this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)};
},_cacheHelperProportions:function(){
this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};
},_setContainment:function(){
var o=this.options;
if(o.containment=="parent"){
o.containment=this.helper[0].parentNode;
}
if(o.containment=="document"||o.containment=="window"){
this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,$(o.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,($(o.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
}
if(!(/^(document|window|parent)$/).test(o.containment)){
var ce=$(o.containment)[0];
var co=$(o.containment).offset();
var _b9=($(ce).css("overflow")!="hidden");
this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0)-this.margins.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0)-this.margins.top,co.left+(_b9?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,co.top+(_b9?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top];
}
},_convertPositionTo:function(d,pos){
if(!pos){
pos=this.position;
}
var mod=d=="absolute"?1:-1;
var o=this.options,_ba=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_bb=(/(html|body)/i).test(_ba[0].tagName);
return {top:(pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_bb?0:_ba.scrollTop()))*mod)),left:(pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_bb?0:_ba.scrollLeft())*mod))};
},_generatePosition:function(_bc){
var o=this.options,_bd=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_be=(/(html|body)/i).test(_bd[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){
this.offset.relative=this._getRelativeOffset();
}
var _bf=_bc.pageX;
var _c0=_bc.pageY;
if(this.originalPosition){
if(this.containment){
if(_bc.pageX-this.offset.click.left<this.containment[0]){
_bf=this.containment[0]+this.offset.click.left;
}
if(_bc.pageY-this.offset.click.top<this.containment[1]){
_c0=this.containment[1]+this.offset.click.top;
}
if(_bc.pageX-this.offset.click.left>this.containment[2]){
_bf=this.containment[2]+this.offset.click.left;
}
if(_bc.pageY-this.offset.click.top>this.containment[3]){
_c0=this.containment[3]+this.offset.click.top;
}
}
if(o.grid){
var top=this.originalPageY+Math.round((_c0-this.originalPageY)/o.grid[1])*o.grid[1];
_c0=this.containment?(!(top-this.offset.click.top<this.containment[1]||top-this.offset.click.top>this.containment[3])?top:(!(top-this.offset.click.top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;
var _c1=this.originalPageX+Math.round((_bf-this.originalPageX)/o.grid[0])*o.grid[0];
_bf=this.containment?(!(_c1-this.offset.click.left<this.containment[0]||_c1-this.offset.click.left>this.containment[2])?_c1:(!(_c1-this.offset.click.left<this.containment[0])?_c1-o.grid[0]:_c1+o.grid[0])):_c1;
}
}
return {top:(_c0-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_be?0:_bd.scrollTop())))),left:(_bf-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_be?0:_bd.scrollLeft())))};
},_rearrange:function(_c2,i,a,_c3){
a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?i.item[0]:i.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var _c4=this,_c5=this.counter;
window.setTimeout(function(){
if(_c5==_c4.counter){
_c4.refreshPositions(!_c3);
}
},0);
},_clear:function(_c6,_c7){
this.reverting=false;
var _c8=[],_c9=this;
if(!this._noFinalSort&&this.currentItem.parent().length){
this.placeholder.before(this.currentItem);
}
this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){
for(var i in this._storedCSS){
if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static"){
this._storedCSS[i]="";
}
}
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
if(this.fromOutside&&!_c7){
_c8.push(function(_ca){
this._trigger("receive",_ca,this._uiHash(this.fromOutside));
});
}
if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!_c7){
_c8.push(function(_cb){
this._trigger("update",_cb,this._uiHash());
});
}
if(!$.ui.contains(this.element[0],this.currentItem[0])){
if(!_c7){
_c8.push(function(_cc){
this._trigger("remove",_cc,this._uiHash());
});
}
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.containers[i].element[0],this.currentItem[0])&&!_c7){
_c8.push((function(c){
return function(_cd){
c._trigger("receive",_cd,this._uiHash(this));
};
}).call(this,this.containers[i]));
_c8.push((function(c){
return function(_ce){
c._trigger("update",_ce,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
}
}
for(var i=this.containers.length-1;i>=0;i--){
if(!_c7){
_c8.push((function(c){
return function(_cf){
c._trigger("deactivate",_cf,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
if(this.containers[i].containerCache.over){
_c8.push((function(c){
return function(_d0){
c._trigger("out",_d0,this._uiHash(this));
};
}).call(this,this.containers[i]));
this.containers[i].containerCache.over=0;
}
}
if(this._storedCursor){
$("body").css("cursor",this._storedCursor);
}
if(this._storedOpacity){
this.helper.css("opacity",this._storedOpacity);
}
if(this._storedZIndex){
this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);
}
this.dragging=false;
if(this.cancelHelperRemoval){
if(!_c7){
this._trigger("beforeStop",_c6,this._uiHash());
for(var i=0;i<_c8.length;i++){
_c8[i].call(this,_c6);
}
this._trigger("stop",_c6,this._uiHash());
}
this.fromOutside=false;
return false;
}
if(!_c7){
this._trigger("beforeStop",_c6,this._uiHash());
}
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){
this.helper.remove();
}
this.helper=null;
if(!_c7){
for(var i=0;i<_c8.length;i++){
_c8[i].call(this,_c6);
}
this._trigger("stop",_c6,this._uiHash());
}
this.fromOutside=false;
return true;
},_trigger:function(){
if($.Widget.prototype._trigger.apply(this,arguments)===false){
this.cancel();
}
},_uiHash:function(_d1){
var _d2=_d1||this;
return {helper:_d2.helper,placeholder:_d2.placeholder||$([]),position:_d2.position,originalPosition:_d2.originalPosition,offset:_d2.positionAbs,item:_d2.currentItem,sender:_d1?_d1.element:null};
}});
$.extend($.ui.sortable,{version:"1.8.22"});
})(jQuery);
(function($,_d3){
var _d4=5;
$.widget("ui.slider",$.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){
var _d5=this,o=this.options,_d6=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),_d7="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",_d8=(o.values&&o.values.length)||1,_d9=[];
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider"+" ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(o.disabled?" ui-slider-disabled ui-disabled":""));
this.range=$([]);
if(o.range){
if(o.range===true){
if(!o.values){
o.values=[this._valueMin(),this._valueMin()];
}
if(o.values.length&&o.values.length!==2){
o.values=[o.values[0],o.values[0]];
}
}
this.range=$("<div></div>").appendTo(this.element).addClass("ui-slider-range"+" ui-widget-header"+((o.range==="min"||o.range==="max")?" ui-slider-range-"+o.range:""));
}
for(var i=_d6.length;i<_d8;i+=1){
_d9.push(_d7);
}
this.handles=_d6.add($(_d9.join("")).appendTo(_d5.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(_da){
_da.preventDefault();
}).hover(function(){
if(!o.disabled){
$(this).addClass("ui-state-hover");
}
},function(){
$(this).removeClass("ui-state-hover");
}).focus(function(){
if(!o.disabled){
$(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
$(this).addClass("ui-state-focus");
}else{
$(this).blur();
}
}).blur(function(){
$(this).removeClass("ui-state-focus");
});
this.handles.each(function(i){
$(this).data("index.ui-slider-handle",i);
});
this.handles.keydown(function(_db){
var _dc=$(this).data("index.ui-slider-handle"),_dd,_de,_df,_e0;
if(_d5.options.disabled){
return;
}
switch(_db.keyCode){
case $.ui.keyCode.HOME:
case $.ui.keyCode.END:
case $.ui.keyCode.PAGE_UP:
case $.ui.keyCode.PAGE_DOWN:
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
_db.preventDefault();
if(!_d5._keySliding){
_d5._keySliding=true;
$(this).addClass("ui-state-active");
_dd=_d5._start(_db,_dc);
if(_dd===false){
return;
}
}
break;
}
_e0=_d5.options.step;
if(_d5.options.values&&_d5.options.values.length){
_de=_df=_d5.values(_dc);
}else{
_de=_df=_d5.value();
}
switch(_db.keyCode){
case $.ui.keyCode.HOME:
_df=_d5._valueMin();
break;
case $.ui.keyCode.END:
_df=_d5._valueMax();
break;
case $.ui.keyCode.PAGE_UP:
_df=_d5._trimAlignValue(_de+((_d5._valueMax()-_d5._valueMin())/_d4));
break;
case $.ui.keyCode.PAGE_DOWN:
_df=_d5._trimAlignValue(_de-((_d5._valueMax()-_d5._valueMin())/_d4));
break;
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
if(_de===_d5._valueMax()){
return;
}
_df=_d5._trimAlignValue(_de+_e0);
break;
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if(_de===_d5._valueMin()){
return;
}
_df=_d5._trimAlignValue(_de-_e0);
break;
}
_d5._slide(_db,_dc,_df);
}).keyup(function(_e1){
var _e2=$(this).data("index.ui-slider-handle");
if(_d5._keySliding){
_d5._keySliding=false;
_d5._stop(_e1,_e2);
_d5._change(_e1,_e2);
$(this).removeClass("ui-state-active");
}
});
this._refreshValue();
this._animateOff=false;
},destroy:function(){
this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider"+" ui-slider-horizontal"+" ui-slider-vertical"+" ui-slider-disabled"+" ui-widget"+" ui-widget-content"+" ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this;
},_mouseCapture:function(_e3){
var o=this.options,_e4,_e5,_e6,_e7,_e8,_e9,_ea,_eb,_ec;
if(o.disabled){
return false;
}
this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
_e4={x:_e3.pageX,y:_e3.pageY};
_e5=this._normValueFromMouse(_e4);
_e6=this._valueMax()-this._valueMin()+1;
_e8=this;
this.handles.each(function(i){
var _ed=Math.abs(_e5-_e8.values(i));
if(_e6>_ed){
_e6=_ed;
_e7=$(this);
_e9=i;
}
});
if(o.range===true&&this.values(1)===o.min){
_e9+=1;
_e7=$(this.handles[_e9]);
}
_ea=this._start(_e3,_e9);
if(_ea===false){
return false;
}
this._mouseSliding=true;
_e8._handleIndex=_e9;
_e7.addClass("ui-state-active").focus();
_eb=_e7.offset();
_ec=!$(_e3.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=_ec?{left:0,top:0}:{left:_e3.pageX-_eb.left-(_e7.width()/2),top:_e3.pageY-_eb.top-(_e7.height()/2)-(parseInt(_e7.css("borderTopWidth"),10)||0)-(parseInt(_e7.css("borderBottomWidth"),10)||0)+(parseInt(_e7.css("marginTop"),10)||0)};
if(!this.handles.hasClass("ui-state-hover")){
this._slide(_e3,_e9,_e5);
}
this._animateOff=true;
return true;
},_mouseStart:function(_ee){
return true;
},_mouseDrag:function(_ef){
var _f0={x:_ef.pageX,y:_ef.pageY},_f1=this._normValueFromMouse(_f0);
this._slide(_ef,this._handleIndex,_f1);
return false;
},_mouseStop:function(_f2){
this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(_f2,this._handleIndex);
this._change(_f2,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false;
},_detectOrientation:function(){
this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal";
},_normValueFromMouse:function(_f3){
var _f4,_f5,_f6,_f7,_f8;
if(this.orientation==="horizontal"){
_f4=this.elementSize.width;
_f5=_f3.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0);
}else{
_f4=this.elementSize.height;
_f5=_f3.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0);
}
_f6=(_f5/_f4);
if(_f6>1){
_f6=1;
}
if(_f6<0){
_f6=0;
}
if(this.orientation==="vertical"){
_f6=1-_f6;
}
_f7=this._valueMax()-this._valueMin();
_f8=this._valueMin()+_f6*_f7;
return this._trimAlignValue(_f8);
},_start:function(_f9,_fa){
var _fb={handle:this.handles[_fa],value:this.value()};
if(this.options.values&&this.options.values.length){
_fb.value=this.values(_fa);
_fb.values=this.values();
}
return this._trigger("start",_f9,_fb);
},_slide:function(_fc,_fd,_fe){
var _ff,_100,_101;
if(this.options.values&&this.options.values.length){
_ff=this.values(_fd?0:1);
if((this.options.values.length===2&&this.options.range===true)&&((_fd===0&&_fe>_ff)||(_fd===1&&_fe<_ff))){
_fe=_ff;
}
if(_fe!==this.values(_fd)){
_100=this.values();
_100[_fd]=_fe;
_101=this._trigger("slide",_fc,{handle:this.handles[_fd],value:_fe,values:_100});
_ff=this.values(_fd?0:1);
if(_101!==false){
this.values(_fd,_fe,true);
}
}
}else{
if(_fe!==this.value()){
_101=this._trigger("slide",_fc,{handle:this.handles[_fd],value:_fe});
if(_101!==false){
this.value(_fe);
}
}
}
},_stop:function(_102,_103){
var _104={handle:this.handles[_103],value:this.value()};
if(this.options.values&&this.options.values.length){
_104.value=this.values(_103);
_104.values=this.values();
}
this._trigger("stop",_102,_104);
},_change:function(_105,_106){
if(!this._keySliding&&!this._mouseSliding){
var _107={handle:this.handles[_106],value:this.value()};
if(this.options.values&&this.options.values.length){
_107.value=this.values(_106);
_107.values=this.values();
}
this._trigger("change",_105,_107);
}
},value:function(_108){
if(arguments.length){
this.options.value=this._trimAlignValue(_108);
this._refreshValue();
this._change(null,0);
return;
}
return this._value();
},values:function(_109,_10a){
var vals,_10b,i;
if(arguments.length>1){
this.options.values[_109]=this._trimAlignValue(_10a);
this._refreshValue();
this._change(null,_109);
return;
}
if(arguments.length){
if($.isArray(arguments[0])){
vals=this.options.values;
_10b=arguments[0];
for(i=0;i<vals.length;i+=1){
vals[i]=this._trimAlignValue(_10b[i]);
this._change(null,i);
}
this._refreshValue();
}else{
if(this.options.values&&this.options.values.length){
return this._values(_109);
}else{
return this.value();
}
}
}else{
return this._values();
}
},_setOption:function(key,_10c){
var i,_10d=0;
if($.isArray(this.options.values)){
_10d=this.options.values.length;
}
$.Widget.prototype._setOption.apply(this,arguments);
switch(key){
case "disabled":
if(_10c){
this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.propAttr("disabled",true);
this.element.addClass("ui-disabled");
}else{
this.handles.propAttr("disabled",false);
this.element.removeClass("ui-disabled");
}
break;
case "orientation":
this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case "value":
this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case "values":
this._animateOff=true;
this._refreshValue();
for(i=0;i<_10d;i+=1){
this._change(null,i);
}
this._animateOff=false;
break;
}
},_value:function(){
var val=this.options.value;
val=this._trimAlignValue(val);
return val;
},_values:function(_10e){
var val,vals,i;
if(arguments.length){
val=this.options.values[_10e];
val=this._trimAlignValue(val);
return val;
}else{
vals=this.options.values.slice();
for(i=0;i<vals.length;i+=1){
vals[i]=this._trimAlignValue(vals[i]);
}
return vals;
}
},_trimAlignValue:function(val){
if(val<=this._valueMin()){
return this._valueMin();
}
if(val>=this._valueMax()){
return this._valueMax();
}
var step=(this.options.step>0)?this.options.step:1,_10f=(val-this._valueMin())%step,_110=val-_10f;
if(Math.abs(_10f)*2>=step){
_110+=(_10f>0)?step:(-step);
}
return parseFloat(_110.toFixed(5));
},_valueMin:function(){
return this.options.min;
},_valueMax:function(){
return this.options.max;
},_refreshValue:function(){
var _111=this.options.range,o=this.options,self=this,_112=(!this._animateOff)?o.animate:false,_113,_114={},_115,_116,_117,_118;
if(this.options.values&&this.options.values.length){
this.handles.each(function(i,j){
_113=(self.values(i)-self._valueMin())/(self._valueMax()-self._valueMin())*100;
_114[self.orientation==="horizontal"?"left":"bottom"]=_113+"%";
$(this).stop(1,1)[_112?"animate":"css"](_114,o.animate);
if(self.options.range===true){
if(self.orientation==="horizontal"){
if(i===0){
self.range.stop(1,1)[_112?"animate":"css"]({left:_113+"%"},o.animate);
}
if(i===1){
self.range[_112?"animate":"css"]({width:(_113-_115)+"%"},{queue:false,duration:o.animate});
}
}else{
if(i===0){
self.range.stop(1,1)[_112?"animate":"css"]({bottom:(_113)+"%"},o.animate);
}
if(i===1){
self.range[_112?"animate":"css"]({height:(_113-_115)+"%"},{queue:false,duration:o.animate});
}
}
}
_115=_113;
});
}else{
_116=this.value();
_117=this._valueMin();
_118=this._valueMax();
_113=(_118!==_117)?(_116-_117)/(_118-_117)*100:0;
_114[self.orientation==="horizontal"?"left":"bottom"]=_113+"%";
this.handle.stop(1,1)[_112?"animate":"css"](_114,o.animate);
if(_111==="min"&&this.orientation==="horizontal"){
this.range.stop(1,1)[_112?"animate":"css"]({width:_113+"%"},o.animate);
}
if(_111==="max"&&this.orientation==="horizontal"){
this.range[_112?"animate":"css"]({width:(100-_113)+"%"},{queue:false,duration:o.animate});
}
if(_111==="min"&&this.orientation==="vertical"){
this.range.stop(1,1)[_112?"animate":"css"]({height:_113+"%"},o.animate);
}
if(_111==="max"&&this.orientation==="vertical"){
this.range[_112?"animate":"css"]({height:(100-_113)+"%"},{queue:false,duration:o.animate});
}
}
}});
$.extend($.ui.slider,{version:"1.8.22"});
}(jQuery));
jQuery.effects||(function($,_119){
$.effects={};
$.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(i,attr){
$.fx.step[attr]=function(fx){
if(!fx.colorInit){
fx.start=_11a(fx.elem,attr);
fx.end=_11b(fx.end);
fx.colorInit=true;
}
fx.elem.style[attr]="rgb("+Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2],10),255),0)+")";
};
});
function _11b(_11c){
var _11d;
if(_11c&&_11c.constructor==Array&&_11c.length==3){
return _11c;
}
if(_11d=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(_11c)){
return [parseInt(_11d[1],10),parseInt(_11d[2],10),parseInt(_11d[3],10)];
}
if(_11d=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(_11c)){
return [parseFloat(_11d[1])*2.55,parseFloat(_11d[2])*2.55,parseFloat(_11d[3])*2.55];
}
if(_11d=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(_11c)){
return [parseInt(_11d[1],16),parseInt(_11d[2],16),parseInt(_11d[3],16)];
}
if(_11d=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(_11c)){
return [parseInt(_11d[1]+_11d[1],16),parseInt(_11d[2]+_11d[2],16),parseInt(_11d[3]+_11d[3],16)];
}
if(_11d=/rgba\(0, 0, 0, 0\)/.exec(_11c)){
return _11e["transparent"];
}
return _11e[$.trim(_11c).toLowerCase()];
};
function _11a(elem,attr){
var _11f;
do{
_11f=($.curCSS||$.css)(elem,attr);
if(_11f!=""&&_11f!="transparent"||$.nodeName(elem,"body")){
break;
}
attr="backgroundColor";
}while(elem=elem.parentNode);
return _11b(_11f);
};
var _11e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var _120=["add","remove","toggle"],_121={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function _122(){
var _123=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,_124={},key,_125;
if(_123&&_123.length&&_123[0]&&_123[_123[0]]){
var len=_123.length;
while(len--){
key=_123[len];
if(typeof _123[key]=="string"){
_125=key.replace(/\-(\w)/g,function(all,_126){
return _126.toUpperCase();
});
_124[_125]=_123[key];
}
}
}else{
for(key in _123){
if(typeof _123[key]==="string"){
_124[key]=_123[key];
}
}
}
return _124;
};
function _127(_128){
var name,_129;
for(name in _128){
_129=_128[name];
if(_129==null||$.isFunction(_129)||name in _121||(/scrollbar/).test(name)||(!(/color/i).test(name)&&isNaN(parseFloat(_129)))){
delete _128[name];
}
}
return _128;
};
function _12a(_12b,_12c){
var diff={_:0},name;
for(name in _12c){
if(_12b[name]!=_12c[name]){
diff[name]=_12c[name];
}
}
return diff;
};
$.effects.animateClass=function(_12d,_12e,_12f,_130){
if($.isFunction(_12f)){
_130=_12f;
_12f=null;
}
return this.queue(function(){
var that=$(this),_131=that.attr("style")||" ",_132=_127(_122.call(this)),_133,_134=that.attr("class")||"";
$.each(_120,function(i,_135){
if(_12d[_135]){
that[_135+"Class"](_12d[_135]);
}
});
_133=_127(_122.call(this));
that.attr("class",_134);
that.animate(_12a(_132,_133),{queue:false,duration:_12e,easing:_12f,complete:function(){
$.each(_120,function(i,_136){
if(_12d[_136]){
that[_136+"Class"](_12d[_136]);
}
});
if(typeof that.attr("style")=="object"){
that.attr("style").cssText="";
that.attr("style").cssText=_131;
}else{
that.attr("style",_131);
}
if(_130){
_130.apply(this,arguments);
}
$.dequeue(this);
}});
});
};
$.fn.extend({_addClass:$.fn.addClass,addClass:function(_137,_138,_139,_13a){
return _138?$.effects.animateClass.apply(this,[{add:_137},_138,_139,_13a]):this._addClass(_137);
},_removeClass:$.fn.removeClass,removeClass:function(_13b,_13c,_13d,_13e){
return _13c?$.effects.animateClass.apply(this,[{remove:_13b},_13c,_13d,_13e]):this._removeClass(_13b);
},_toggleClass:$.fn.toggleClass,toggleClass:function(_13f,_140,_141,_142,_143){
if(typeof _140=="boolean"||_140===_119){
if(!_141){
return this._toggleClass(_13f,_140);
}else{
return $.effects.animateClass.apply(this,[(_140?{add:_13f}:{remove:_13f}),_141,_142,_143]);
}
}else{
return $.effects.animateClass.apply(this,[{toggle:_13f},_140,_141,_142]);
}
},switchClass:function(_144,add,_145,_146,_147){
return $.effects.animateClass.apply(this,[{add:add,remove:_144},_145,_146,_147]);
}});
$.extend($.effects,{version:"1.8.22",save:function(_148,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_148.data("ec.storage."+set[i],_148[0].style[set[i]]);
}
}
},restore:function(_149,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_149.css(set[i],_149.data("ec.storage."+set[i]));
}
}
},setMode:function(el,mode){
if(mode=="toggle"){
mode=el.is(":hidden")?"show":"hide";
}
return mode;
},getBaseline:function(_14a,_14b){
var y,x;
switch(_14a[0]){
case "top":
y=0;
break;
case "middle":
y=0.5;
break;
case "bottom":
y=1;
break;
default:
y=_14a[0]/_14b.height;
}
switch(_14a[1]){
case "left":
x=0;
break;
case "center":
x=0.5;
break;
case "right":
x=1;
break;
default:
x=_14a[1]/_14b.width;
}
return {x:x,y:y};
},createWrapper:function(_14c){
if(_14c.parent().is(".ui-effects-wrapper")){
return _14c.parent();
}
var _14d={width:_14c.outerWidth(true),height:_14c.outerHeight(true),"float":_14c.css("float")},_14e=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),_14f=document.activeElement;
try{
_14f.id;
}
catch(e){
_14f=document.body;
}
_14c.wrap(_14e);
if(_14c[0]===_14f||$.contains(_14c[0],_14f)){
$(_14f).focus();
}
_14e=_14c.parent();
if(_14c.css("position")=="static"){
_14e.css({position:"relative"});
_14c.css({position:"relative"});
}else{
$.extend(_14d,{position:_14c.css("position"),zIndex:_14c.css("z-index")});
$.each(["top","left","bottom","right"],function(i,pos){
_14d[pos]=_14c.css(pos);
if(isNaN(parseInt(_14d[pos],10))){
_14d[pos]="auto";
}
});
_14c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});
}
return _14e.css(_14d).show();
},removeWrapper:function(_150){
var _151,_152=document.activeElement;
if(_150.parent().is(".ui-effects-wrapper")){
_151=_150.parent().replaceWith(_150);
if(_150[0]===_152||$.contains(_150[0],_152)){
$(_152).focus();
}
return _151;
}
return _150;
},setTransition:function(_153,list,_154,_155){
_155=_155||{};
$.each(list,function(i,x){
var unit=_153.cssUnit(x);
if(unit[0]>0){
_155[x]=unit[0]*_154+unit[1];
}
});
return _155;
}});
function _156(_157,_158,_159,_15a){
if(typeof _157=="object"){
_15a=_158;
_159=null;
_158=_157;
_157=_158.effect;
}
if($.isFunction(_158)){
_15a=_158;
_159=null;
_158={};
}
if(typeof _158=="number"||$.fx.speeds[_158]){
_15a=_159;
_159=_158;
_158={};
}
if($.isFunction(_159)){
_15a=_159;
_159=null;
}
_158=_158||{};
_159=_159||_158.duration;
_159=$.fx.off?0:typeof _159=="number"?_159:_159 in $.fx.speeds?$.fx.speeds[_159]:$.fx.speeds._default;
_15a=_15a||_158.complete;
return [_157,_158,_159,_15a];
};
function _15b(_15c){
if(!_15c||typeof _15c==="number"||$.fx.speeds[_15c]){
return true;
}
if(typeof _15c==="string"&&!$.effects[_15c]){
return true;
}
return false;
};
$.fn.extend({effect:function(_15d,_15e,_15f,_160){
var args=_156.apply(this,arguments),_161={options:args[1],duration:args[2],callback:args[3]},mode=_161.options.mode,_162=$.effects[_15d];
if($.fx.off||!_162){
if(mode){
return this[mode](_161.duration,_161.callback);
}else{
return this.each(function(){
if(_161.callback){
_161.callback.call(this);
}
});
}
}
return _162.call(this,_161);
},_show:$.fn.show,show:function(_163){
if(_15b(_163)){
return this._show.apply(this,arguments);
}else{
var args=_156.apply(this,arguments);
args[1].mode="show";
return this.effect.apply(this,args);
}
},_hide:$.fn.hide,hide:function(_164){
if(_15b(_164)){
return this._hide.apply(this,arguments);
}else{
var args=_156.apply(this,arguments);
args[1].mode="hide";
return this.effect.apply(this,args);
}
},__toggle:$.fn.toggle,toggle:function(_165){
if(_15b(_165)||typeof _165==="boolean"||$.isFunction(_165)){
return this.__toggle.apply(this,arguments);
}else{
var args=_156.apply(this,arguments);
args[1].mode="toggle";
return this.effect.apply(this,args);
}
},cssUnit:function(key){
var _166=this.css(key),val=[];
$.each(["em","px","%","pt"],function(i,unit){
if(_166.indexOf(unit)>0){
val=[parseFloat(_166),unit];
}
});
return val;
}});
$.easing.jswing=$.easing.swing;
$.extend($.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){
return $.easing[$.easing.def](x,t,b,c,d);
},easeInQuad:function(x,t,b,c,d){
return c*(t/=d)*t+b;
},easeOutQuad:function(x,t,b,c,d){
return -c*(t/=d)*(t-2)+b;
},easeInOutQuad:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
},easeInCubic:function(x,t,b,c,d){
return c*(t/=d)*t*t+b;
},easeOutCubic:function(x,t,b,c,d){
return c*((t=t/d-1)*t*t+1)+b;
},easeInOutCubic:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t+b;
}
return c/2*((t-=2)*t*t+2)+b;
},easeInQuart:function(x,t,b,c,d){
return c*(t/=d)*t*t*t+b;
},easeOutQuart:function(x,t,b,c,d){
return -c*((t=t/d-1)*t*t*t-1)+b;
},easeInOutQuart:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t+b;
}
return -c/2*((t-=2)*t*t*t-2)+b;
},easeInQuint:function(x,t,b,c,d){
return c*(t/=d)*t*t*t*t+b;
},easeOutQuint:function(x,t,b,c,d){
return c*((t=t/d-1)*t*t*t*t+1)+b;
},easeInOutQuint:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t*t+b;
}
return c/2*((t-=2)*t*t*t*t+2)+b;
},easeInSine:function(x,t,b,c,d){
return -c*Math.cos(t/d*(Math.PI/2))+c+b;
},easeOutSine:function(x,t,b,c,d){
return c*Math.sin(t/d*(Math.PI/2))+b;
},easeInOutSine:function(x,t,b,c,d){
return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
},easeInExpo:function(x,t,b,c,d){
return (t==0)?b:c*Math.pow(2,10*(t/d-1))+b;
},easeOutExpo:function(x,t,b,c,d){
return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
},easeInOutExpo:function(x,t,b,c,d){
if(t==0){
return b;
}
if(t==d){
return b+c;
}
if((t/=d/2)<1){
return c/2*Math.pow(2,10*(t-1))+b;
}
return c/2*(-Math.pow(2,-10*--t)+2)+b;
},easeInCirc:function(x,t,b,c,d){
return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
},easeOutCirc:function(x,t,b,c,d){
return c*Math.sqrt(1-(t=t/d-1)*t)+b;
},easeInOutCirc:function(x,t,b,c,d){
if((t/=d/2)<1){
return -c/2*(Math.sqrt(1-t*t)-1)+b;
}
return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
},easeInElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
},easeOutElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
},easeInOutElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d/2)==2){
return b+c;
}
if(!p){
p=d*(0.3*1.5);
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
if(t<1){
return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
},easeInBack:function(x,t,b,c,d,s){
if(s==_119){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},easeOutBack:function(x,t,b,c,d,s){
if(s==_119){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},easeInOutBack:function(x,t,b,c,d,s){
if(s==_119){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
},easeInBounce:function(x,t,b,c,d){
return c-$.easing.easeOutBounce(x,d-t,0,c,d)+b;
},easeOutBounce:function(x,t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}else{
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
}
}
}
},easeInOutBounce:function(x,t,b,c,d){
if(t<d/2){
return $.easing.easeInBounce(x,t*2,0,c,d)*0.5+b;
}
return $.easing.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b;
}});
})(jQuery);
(function($,_167){
$.effects.blind=function(o){
return this.queue(function(){
var el=$(this),_168=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _169=o.options.direction||"vertical";
$.effects.save(el,_168);
el.show();
var _16a=$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_169=="vertical")?"height":"width";
var _16b=(_169=="vertical")?_16a.height():_16a.width();
if(mode=="show"){
_16a.css(ref,0);
}
var _16c={};
_16c[ref]=mode=="show"?_16b:0;
_16a.animate(_16c,o.duration,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_168);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_16d){
$.effects.bounce=function(o){
return this.queue(function(){
var el=$(this),_16e=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _16f=o.options.direction||"up";
var _170=o.options.distance||20;
var _171=o.options.times||5;
var _172=o.duration||250;
if(/show|hide/.test(mode)){
_16e.push("opacity");
}
$.effects.save(el,_16e);
el.show();
$.effects.createWrapper(el);
var ref=(_16f=="up"||_16f=="down")?"top":"left";
var _173=(_16f=="up"||_16f=="left")?"pos":"neg";
var _170=o.options.distance||(ref=="top"?el.outerHeight(true)/3:el.outerWidth(true)/3);
if(mode=="show"){
el.css("opacity",0).css(ref,_173=="pos"?-_170:_170);
}
if(mode=="hide"){
_170=_170/(_171*2);
}
if(mode!="hide"){
_171--;
}
if(mode=="show"){
var _174={opacity:1};
_174[ref]=(_173=="pos"?"+=":"-=")+_170;
el.animate(_174,_172/2,o.options.easing);
_170=_170/2;
_171--;
}
for(var i=0;i<_171;i++){
var _175={},_176={};
_175[ref]=(_173=="pos"?"-=":"+=")+_170;
_176[ref]=(_173=="pos"?"+=":"-=")+_170;
el.animate(_175,_172/2,o.options.easing).animate(_176,_172/2,o.options.easing);
_170=(mode=="hide")?_170*2:_170/2;
}
if(mode=="hide"){
var _174={opacity:0};
_174[ref]=(_173=="pos"?"-=":"+=")+_170;
el.animate(_174,_172/2,o.options.easing,function(){
el.hide();
$.effects.restore(el,_16e);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}else{
var _175={},_176={};
_175[ref]=(_173=="pos"?"-=":"+=")+_170;
_176[ref]=(_173=="pos"?"+=":"-=")+_170;
el.animate(_175,_172/2,o.options.easing).animate(_176,_172/2,o.options.easing,function(){
$.effects.restore(el,_16e);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}
el.queue("fx",function(){
el.dequeue();
});
el.dequeue();
});
};
})(jQuery);
(function($,_177){
$.effects.clip=function(o){
return this.queue(function(){
var el=$(this),_178=["position","top","bottom","left","right","height","width"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _179=o.options.direction||"vertical";
$.effects.save(el,_178);
el.show();
var _17a=$.effects.createWrapper(el).css({overflow:"hidden"});
var _17b=el[0].tagName=="IMG"?_17a:el;
var ref={size:(_179=="vertical")?"height":"width",position:(_179=="vertical")?"top":"left"};
var _17c=(_179=="vertical")?_17b.height():_17b.width();
if(mode=="show"){
_17b.css(ref.size,0);
_17b.css(ref.position,_17c/2);
}
var _17d={};
_17d[ref.size]=mode=="show"?_17c:0;
_17d[ref.position]=mode=="show"?0:_17c/2;
_17b.animate(_17d,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_178);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_17e){
$.effects.drop=function(o){
return this.queue(function(){
var el=$(this),_17f=["position","top","bottom","left","right","opacity"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _180=o.options.direction||"left";
$.effects.save(el,_17f);
el.show();
$.effects.createWrapper(el);
var ref=(_180=="up"||_180=="down")?"top":"left";
var _181=(_180=="up"||_180=="left")?"pos":"neg";
var _182=o.options.distance||(ref=="top"?el.outerHeight(true)/2:el.outerWidth(true)/2);
if(mode=="show"){
el.css("opacity",0).css(ref,_181=="pos"?-_182:_182);
}
var _183={opacity:mode=="show"?1:0};
_183[ref]=(mode=="show"?(_181=="pos"?"+=":"-="):(_181=="pos"?"-=":"+="))+_182;
el.animate(_183,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_17f);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_184){
$.effects.explode=function(o){
return this.queue(function(){
var rows=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
var _185=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
o.options.mode=o.options.mode=="toggle"?($(this).is(":visible")?"hide":"show"):o.options.mode;
var el=$(this).show().css("visibility","hidden");
var _186=el.offset();
_186.top-=parseInt(el.css("marginTop"),10)||0;
_186.left-=parseInt(el.css("marginLeft"),10)||0;
var _187=el.outerWidth(true);
var _188=el.outerHeight(true);
for(var i=0;i<rows;i++){
for(var j=0;j<_185;j++){
el.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(_187/_185),top:-i*(_188/rows)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_187/_185,height:_188/rows,left:_186.left+j*(_187/_185)+(o.options.mode=="show"?(j-Math.floor(_185/2))*(_187/_185):0),top:_186.top+i*(_188/rows)+(o.options.mode=="show"?(i-Math.floor(rows/2))*(_188/rows):0),opacity:o.options.mode=="show"?0:1}).animate({left:_186.left+j*(_187/_185)+(o.options.mode=="show"?0:(j-Math.floor(_185/2))*(_187/_185)),top:_186.top+i*(_188/rows)+(o.options.mode=="show"?0:(i-Math.floor(rows/2))*(_188/rows)),opacity:o.options.mode=="show"?1:0},o.duration||500);
}
}
setTimeout(function(){
o.options.mode=="show"?el.css({visibility:"visible"}):el.css({visibility:"visible"}).hide();
if(o.callback){
o.callback.apply(el[0]);
}
el.dequeue();
$("div.ui-effects-explode").remove();
},o.duration||500);
});
};
})(jQuery);
(function($,_189){
$.effects.fade=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide");
elem.animate({opacity:mode},{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_18a){
$.effects.fold=function(o){
return this.queue(function(){
var el=$(this),_18b=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var size=o.options.size||15;
var _18c=!(!o.options.horizFirst);
var _18d=o.duration?o.duration/2:$.fx.speeds._default/2;
$.effects.save(el,_18b);
el.show();
var _18e=$.effects.createWrapper(el).css({overflow:"hidden"});
var _18f=((mode=="show")!=_18c);
var ref=_18f?["width","height"]:["height","width"];
var _190=_18f?[_18e.width(),_18e.height()]:[_18e.height(),_18e.width()];
var _191=/([0-9]+)%/.exec(size);
if(_191){
size=parseInt(_191[1],10)/100*_190[mode=="hide"?0:1];
}
if(mode=="show"){
_18e.css(_18c?{height:0,width:size}:{height:size,width:0});
}
var _192={},_193={};
_192[ref[0]]=mode=="show"?_190[0]:size;
_193[ref[1]]=mode=="show"?_190[1]:0;
_18e.animate(_192,_18d,o.options.easing).animate(_193,_18d,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_18b);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_194){
$.effects.highlight=function(o){
return this.queue(function(){
var elem=$(this),_195=["backgroundImage","backgroundColor","opacity"],mode=$.effects.setMode(elem,o.options.mode||"show"),_196={backgroundColor:elem.css("backgroundColor")};
if(mode=="hide"){
_196.opacity=0;
}
$.effects.save(elem,_195);
elem.show().css({backgroundImage:"none",backgroundColor:o.options.color||"#ffff99"}).animate(_196,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(mode=="hide"&&elem.hide());
$.effects.restore(elem,_195);
(mode=="show"&&!$.support.opacity&&this.style.removeAttribute("filter"));
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_197){
$.effects.pulsate=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"show"),_198=((o.options.times||5)*2)-1,_199=o.duration?o.duration/2:$.fx.speeds._default/2,_19a=elem.is(":visible"),_19b=0;
if(!_19a){
elem.css("opacity",0).show();
_19b=1;
}
if((mode=="hide"&&_19a)||(mode=="show"&&!_19a)){
_198--;
}
for(var i=0;i<_198;i++){
elem.animate({opacity:_19b},_199,o.options.easing);
_19b=(_19b+1)%2;
}
elem.animate({opacity:_19b},_199,o.options.easing,function(){
if(_19b==0){
elem.hide();
}
(o.callback&&o.callback.apply(this,arguments));
});
elem.queue("fx",function(){
elem.dequeue();
}).dequeue();
});
};
})(jQuery);
(function($,_19c){
$.effects.puff=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide"),_19d=parseInt(o.options.percent,10)||150,_19e=_19d/100,_19f={height:elem.height(),width:elem.width()};
$.extend(o.options,{fade:true,mode:mode,percent:mode=="hide"?_19d:100,from:mode=="hide"?_19f:{height:_19f.height*_19e,width:_19f.width*_19e}});
elem.effect("scale",o.options,o.duration,o.callback);
elem.dequeue();
});
};
$.effects.scale=function(o){
return this.queue(function(){
var el=$(this);
var _1a0=$.extend(true,{},o.options);
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _1a1=parseInt(o.options.percent,10)||(parseInt(o.options.percent,10)==0?0:(mode=="hide"?0:100));
var _1a2=o.options.direction||"both";
var _1a3=o.options.origin;
if(mode!="effect"){
_1a0.origin=_1a3||["middle","center"];
_1a0.restore=true;
}
var _1a4={height:el.height(),width:el.width()};
el.from=o.options.from||(mode=="show"?{height:0,width:0}:_1a4);
var _1a5={y:_1a2!="horizontal"?(_1a1/100):1,x:_1a2!="vertical"?(_1a1/100):1};
el.to={height:_1a4.height*_1a5.y,width:_1a4.width*_1a5.x};
if(o.options.fade){
if(mode=="show"){
el.from.opacity=0;
el.to.opacity=1;
}
if(mode=="hide"){
el.from.opacity=1;
el.to.opacity=0;
}
}
_1a0.from=el.from;
_1a0.to=el.to;
_1a0.mode=mode;
el.effect("size",_1a0,o.duration,o.callback);
el.dequeue();
});
};
$.effects.size=function(o){
return this.queue(function(){
var el=$(this),_1a6=["position","top","bottom","left","right","width","height","overflow","opacity"];
var _1a7=["position","top","bottom","left","right","overflow","opacity"];
var _1a8=["width","height","overflow"];
var _1a9=["fontSize"];
var _1aa=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var _1ab=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _1ac=o.options.restore||false;
var _1ad=o.options.scale||"both";
var _1ae=o.options.origin;
var _1af={height:el.height(),width:el.width()};
el.from=o.options.from||_1af;
el.to=o.options.to||_1af;
if(_1ae){
var _1b0=$.effects.getBaseline(_1ae,_1af);
el.from.top=(_1af.height-el.from.height)*_1b0.y;
el.from.left=(_1af.width-el.from.width)*_1b0.x;
el.to.top=(_1af.height-el.to.height)*_1b0.y;
el.to.left=(_1af.width-el.to.width)*_1b0.x;
}
var _1b1={from:{y:el.from.height/_1af.height,x:el.from.width/_1af.width},to:{y:el.to.height/_1af.height,x:el.to.width/_1af.width}};
if(_1ad=="box"||_1ad=="both"){
if(_1b1.from.y!=_1b1.to.y){
_1a6=_1a6.concat(_1aa);
el.from=$.effects.setTransition(el,_1aa,_1b1.from.y,el.from);
el.to=$.effects.setTransition(el,_1aa,_1b1.to.y,el.to);
}
if(_1b1.from.x!=_1b1.to.x){
_1a6=_1a6.concat(_1ab);
el.from=$.effects.setTransition(el,_1ab,_1b1.from.x,el.from);
el.to=$.effects.setTransition(el,_1ab,_1b1.to.x,el.to);
}
}
if(_1ad=="content"||_1ad=="both"){
if(_1b1.from.y!=_1b1.to.y){
_1a6=_1a6.concat(_1a9);
el.from=$.effects.setTransition(el,_1a9,_1b1.from.y,el.from);
el.to=$.effects.setTransition(el,_1a9,_1b1.to.y,el.to);
}
}
$.effects.save(el,_1ac?_1a6:_1a7);
el.show();
$.effects.createWrapper(el);
el.css("overflow","hidden").css(el.from);
if(_1ad=="content"||_1ad=="both"){
_1aa=_1aa.concat(["marginTop","marginBottom"]).concat(_1a9);
_1ab=_1ab.concat(["marginLeft","marginRight"]);
_1a8=_1a6.concat(_1aa).concat(_1ab);
el.find("*[width]").each(function(){
var _1b2=$(this);
if(_1ac){
$.effects.save(_1b2,_1a8);
}
var _1b3={height:_1b2.height(),width:_1b2.width()};
_1b2.from={height:_1b3.height*_1b1.from.y,width:_1b3.width*_1b1.from.x};
_1b2.to={height:_1b3.height*_1b1.to.y,width:_1b3.width*_1b1.to.x};
if(_1b1.from.y!=_1b1.to.y){
_1b2.from=$.effects.setTransition(_1b2,_1aa,_1b1.from.y,_1b2.from);
_1b2.to=$.effects.setTransition(_1b2,_1aa,_1b1.to.y,_1b2.to);
}
if(_1b1.from.x!=_1b1.to.x){
_1b2.from=$.effects.setTransition(_1b2,_1ab,_1b1.from.x,_1b2.from);
_1b2.to=$.effects.setTransition(_1b2,_1ab,_1b1.to.x,_1b2.to);
}
_1b2.css(_1b2.from);
_1b2.animate(_1b2.to,o.duration,o.options.easing,function(){
if(_1ac){
$.effects.restore(_1b2,_1a8);
}
});
});
}
el.animate(el.to,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(el.to.opacity===0){
el.css("opacity",el.from.opacity);
}
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_1ac?_1a6:_1a7);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_1b4){
$.effects.shake=function(o){
return this.queue(function(){
var el=$(this),_1b5=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _1b6=o.options.direction||"left";
var _1b7=o.options.distance||20;
var _1b8=o.options.times||3;
var _1b9=o.duration||o.options.duration||140;
$.effects.save(el,_1b5);
el.show();
$.effects.createWrapper(el);
var ref=(_1b6=="up"||_1b6=="down")?"top":"left";
var _1ba=(_1b6=="up"||_1b6=="left")?"pos":"neg";
var _1bb={},_1bc={},_1bd={};
_1bb[ref]=(_1ba=="pos"?"-=":"+=")+_1b7;
_1bc[ref]=(_1ba=="pos"?"+=":"-=")+_1b7*2;
_1bd[ref]=(_1ba=="pos"?"-=":"+=")+_1b7*2;
el.animate(_1bb,_1b9,o.options.easing);
for(var i=1;i<_1b8;i++){
el.animate(_1bc,_1b9,o.options.easing).animate(_1bd,_1b9,o.options.easing);
}
el.animate(_1bc,_1b9,o.options.easing).animate(_1bb,_1b9/2,o.options.easing,function(){
$.effects.restore(el,_1b5);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
el.queue("fx",function(){
el.dequeue();
});
el.dequeue();
});
};
})(jQuery);
(function($,_1be){
$.effects.slide=function(o){
return this.queue(function(){
var el=$(this),_1bf=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"show");
var _1c0=o.options.direction||"left";
$.effects.save(el,_1bf);
el.show();
$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_1c0=="up"||_1c0=="down")?"top":"left";
var _1c1=(_1c0=="up"||_1c0=="left")?"pos":"neg";
var _1c2=o.options.distance||(ref=="top"?el.outerHeight(true):el.outerWidth(true));
if(mode=="show"){
el.css(ref,_1c1=="pos"?(isNaN(_1c2)?"-"+_1c2:-_1c2):_1c2);
}
var _1c3={};
_1c3[ref]=(mode=="show"?(_1c1=="pos"?"+=":"-="):(_1c1=="pos"?"-=":"+="))+_1c2;
el.animate(_1c3,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_1bf);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_1c4){
$.effects.transfer=function(o){
return this.queue(function(){
var elem=$(this),_1c5=$(o.options.to),_1c6=_1c5.offset(),_1c7={top:_1c6.top,left:_1c6.left,height:_1c5.innerHeight(),width:_1c5.innerWidth()},_1c8=elem.offset(),_1c9=$("<div class=\"ui-effects-transfer\"></div>").appendTo(document.body).addClass(o.options.className).css({top:_1c8.top,left:_1c8.left,height:elem.innerHeight(),width:elem.innerWidth(),position:"absolute"}).animate(_1c7,o.duration,o.options.easing,function(){
_1c9.remove();
(o.callback&&o.callback.apply(elem[0],arguments));
elem.dequeue();
});
});
};
})(jQuery);
function tip_init(){
jQuery(".hptip").each(function(){
var url=jQuery(this).attr("data-tip");
if(jQuery(this).hasClass("mouseoverable")){
jQuery(this).hover(function(){
jQuery(this).data("sticky",1);
tip_show(url,this.id,this.name,true);
},function(){
jQuery(this).data("sticky",0);
var id=this.id;
setTimeout(function(){
tip_remove(id);
},800);
}).click(function(){
return false;
});
jQuery("#HPT").live("mouseover",function(){
var _1ca=jQuery(this).data("linkId");
if(_1ca){
jQuery("#"+_1ca).data("sticky",1);
}
}).live("mouseout",function(_1cb){
var hpts=jQuery(_1cb.relatedTarget).closest("#HPT");
if(hpts.size()==0){
var _1cc=jQuery(this).data("linkId");
if(_1cc){
jQuery("#"+_1cc).data("sticky",0);
}
setTimeout(function(){
tip_remove(_1cc);
},800);
}
});
}else{
if(this.tagName=="INPUT"){
jQuery(this).hover(function(){
tip_show(url,this.id,false,false);
},function(){
jQuery("#HPT").remove();
});
}else{
jQuery(this).hover(function(){
tip_show(url,this.id,this.name,false);
},function(){
jQuery("#HPT").remove();
}).click(function(){
return false;
});
}
}
});
};
function tip_remove(_1cd){
var _1ce=jQuery("#HPT").data("linkId");
if(_1cd!=_1ce){
return;
}
var _1cf=jQuery("#"+_1cd).data("sticky");
if(!_1cf){
jQuery("#HPT").remove();
}
};
function tip_show(url,_1d0,_1d1,_1d2){
if(jQuery("#HPT").size()){
jQuery("#HPT").remove();
}
if(_1d1==false&&_1d2){
_1d1="&nbsp;";
}
var de=document.documentElement;
var w=self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
var _1d3=getElementWidth(_1d0);
var _1d4=w-getAbsoluteLeft(_1d0)-_1d3;
var _1d5=getAbsoluteLeft(_1d0);
var _1d6=getAbsoluteTop(_1d0)-3;
var _1d7=url.replace(/^[^\?]+\??/,"");
var _1d8=parseQuery(_1d7);
if(_1d8["width"]===undefined){
_1d8["width"]=250;
}
if(_1d8["link"]!==undefined){
jQuery("#"+_1d0).bind("click",function(){
window.location=_1d8["link"];
});
jQuery("#"+_1d0).css("cursor","pointer");
}
var _1d9=_1d2?" <a href='#' class='close' onclick='jQuery(\"#HPT\").remove(); return false;'>x</a>":"";
var _1da=_1d8["css"]?" class='"+_1d8["css"]+"'":"";
var _1db;
var _1dc=false;
if(_1d8["dir"]!==undefined){
_1db=_1d8["dir"];
}else{
if(_1d4>(_1d8["width"]*1+11)){
_1db="right";
}else{
if(_1d4+_1d3*0.3>(_1d8["width"]*1+11)){
_1db="right";
_1dc=true;
}else{
if(_1d5>(_1d8["width"]*1+11)){
_1db="left";
}else{
_1db="right";
_1dc=true;
}
}
}
}
var _1dd=_1db=="left"?"right":"left";
var _1de=_1d1?"<div id='HPT_close_"+_1dd+"'>"+_1d1+_1d9+"</div>":"";
var _1df=_1db=="left"?"style='left:"+((_1d8["width"]*1)+1)+"px"+"'":"";
jQuery("#container").append("<div id='HPT' style='width:"+_1d8["width"]*1+"px'"+_1da+"><div id='HPT_arrow_"+_1dd+"' "+_1df+"></div>"+_1de+"<div id='HPT_copy'><div class='HPT_loader'><div></div></div>");
if(_1db=="right"){
var _1df=_1d3+11;
if(_1dc){
var _1e0=getAbsoluteLeft(_1d0)+_1df-_1d3*0.3;
}else{
var _1e0=getAbsoluteLeft(_1d0)+_1df;
}
}else{
var _1e0=getAbsoluteLeft(_1d0)-((_1d8["width"]*1)+15);
}
var _1e1=jQuery("#container").offset();
_1e0-=_1e1.left;
_1d6-=_1e1.top;
jQuery("#HPT").css({left:_1e0+"px",top:_1d6+"px"});
jQuery("#HPT").data("linkId",_1d0);
jQuery("#HPT").show();
jQuery("#HPT_copy").load(url);
};
function getElementWidth(_1e2){
x=document.getElementById(_1e2);
return x.offsetWidth;
};
function getAbsoluteLeft(_1e3){
o=document.getElementById(_1e3);
oLeft=o.offsetLeft;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oLeft+=oParent.offsetLeft;
o=oParent;
}
return oLeft;
};
function getAbsoluteTop(_1e4){
o=document.getElementById(_1e4);
oTop=o.offsetTop;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oTop+=oParent.offsetTop;
o=oParent;
}
return oTop;
};
function parseQuery(_1e5){
var _1e6=new Object();
if(!_1e5){
return _1e6;
}
var _1e7=_1e5.split(/[;&]/);
for(var i=0;i<_1e7.length;i++){
var _1e8=_1e7[i].split("=");
if(!_1e8||_1e8.length!=2){
continue;
}
var key=unescape(_1e8[0]);
var val=unescape(_1e8[1]);
val=val.replace(/\+/g," ");
_1e6[key]=val;
}
return _1e6;
};
function blockEvents(evt){
if(evt.target){
evt.preventDefault();
}else{
evt.returnValue=false;
}
};
Object.extend(Hash.prototype,{remove:function(){
return this.unset(arguments);
}});
Form.Element.setValue=function(_1e9,_1ea){
element_id=_1e9;
_1e9=$(_1e9);
if(!_1e9){
_1e9=document.getElementsByName(element_id)[0];
}
if(!_1e9){
return false;
}
var _1eb=_1e9.tagName.toLowerCase();
var _1ec=Form.Element.SetSerializers[_1eb](_1e9,_1ea);
};
Form.Element.SetSerializers={input:function(_1ed,_1ee){
switch(_1ed.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.SetSerializers.textarea(_1ed,_1ee);
case "checkbox":
return Form.Element.SetSerializers.checkbox(_1ed,_1ee);
case "radio":
return Form.Element.SetSerializers.inputSelector(_1ed,_1ee);
}
return false;
},checkbox:function(_1ef,_1f0){
if(_1f0==0||_1f0==null||_1f0==""){
_1ef.checked=false;
}else{
_1ef.checked=true;
}
},inputSelector:function(_1f1,_1f2){
fields=document.getElementsByName(_1f1.name);
for(var i=0;i<fields.length;i++){
if(fields[i].value==_1f2){
fields[i].checked=true;
}
}
},textarea:function(_1f3,_1f4){
_1f3.value=_1f4;
},select:function(_1f5,_1f6){
var _1f7="",opt,_1f8=_1f5.selectedIndex;
for(var i=0;i<_1f5.options.length;i++){
if(_1f5.options[i].value==_1f6){
_1f5.selectedIndex=i;
return true;
}
}
}};
var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_1f9){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_1f9||{});
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
this.now=this.options.transition(Tpos)*(this.to-this.from)+this.from;
}
this.increase();
},custom:function(from,to){
if(this.timer!=null){
return;
}
this.from=from;
this.to=to;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},hide:function(){
this.now=0;
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
}};
fx.Layout=Class.create();
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1fa){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_1fa);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _1fb=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_1fb);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
fx.Width=Class.create();
Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.width=this.now+"px";
},toggle:function(){
if(this.el.offsetWidth>0){
this.custom(this.el.offsetWidth,0);
}else{
this.custom(0,this.iniWidth);
}
}});
fx.Opacity=Class.create();
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1fc){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_1fc);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_1fd){
if(_1fd==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_1fd*100+")";
}
this.el.style.opacity=_1fd;
},toggle:function(){
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
}});
fx.sinoidal=function(pos){
return ((-Math.cos(pos*Math.PI)/2)+0.5);
};
fx.linear=function(pos){
return pos;
};
fx.cubic=function(pos){
return Math.pow(pos,3);
};
fx.circ=function(pos){
return Math.sqrt(pos);
};
fx.Scroll=Class.create();
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_1fe){
this.setOptions(_1fe);
},scrollTo:function(el){
var dest=Position.cumulativeOffset($(el))[1]-20;
var _1ff=window.innerHeight||document.documentElement.clientHeight;
var full=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(dest+_1ff>full){
this.custom(top,dest-_1ff+(full-dest));
}else{
this.custom(top,dest);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_200){
this.el=$(el);
this.setOptions(_200);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_201){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_201||{});
},initialize:function(el,_202){
this.el=$(el);
this.setOptions(_202);
if(this.options.opacity){
this.o=new fx.Opacity(el,_202);
_202.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_202);
_202.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_202);
}
},toggle:function(){
this.checkExec("toggle");
},hide:function(){
this.checkExec("hide");
},clearTimer:function(){
this.checkExec("clearTimer");
},checkExec:function(func){
if(this.o){
this.o[func]();
}
if(this.h){
this.h[func]();
}
if(this.w){
this.w[func]();
}
},resizeTo:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);
this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);
}
},customSize:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,hto);
this.w.custom(this.el.offsetWidth,wto);
}
}};
fx.Accordion=Class.create();
fx.Accordion.prototype={setOptions:function(_203){
this.options={delay:100,opacity:false};
Object.extend(this.options,_203||{});
},initialize:function(_204,_205,_206){
this.elements=_205;
this.setOptions(_206);
var _206=_206||"";
_205.each(function(el,i){
_206.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_206);
el.fx.hide();
});
_204.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_205[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_207){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_207){
this.clearAndToggle(el);
}
}.bind(this));
if(_207.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_207);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_208){
this.el=$(el);
this.days=365;
this.options=_208;
this.effect();
var _209=this.readCookie();
if(_209){
this.fx.now=_209;
this.fx.increase();
}
},setCookie:function(_20a){
var date=new Date();
date.setTime(date.getTime()+(this.days*24*60*60*1000));
var _20b="; expires="+date.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_20a+_20b+"; path=/";
},readCookie:function(){
var _20c=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_20c)==0){
return c.substring(_20c.length,c.length);
}
}
return false;
},custom:function(from,to){
if(this.fx.now!=to){
this.setCookie(to);
this.fx.custom(from,to);
}
}};
fx.RememberHeight=Class.create();
fx.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Height(this.el,this.options);
this.prefix="height";
},toggle:function(){
if(this.el.offsetHeight==0){
this.setCookie(this.el.scrollHeight);
}else{
this.setCookie(0);
}
this.fx.toggle();
},resize:function(to){
this.setCookie(this.el.offsetHeight+to);
this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);
},hide:function(){
if(!this.readCookie()){
this.fx.hide();
}
}});
fx.RememberText=Class.create();
fx.RememberText.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Text(this.el,this.options);
this.prefix="text";
}});
fx.expoIn=function(pos){
return Math.pow(2,10*(pos-1));
};
fx.expoOut=function(pos){
return (-Math.pow(2,-10*pos)+1);
};
fx.quadIn=function(pos){
return Math.pow(pos,2);
};
fx.quadOut=function(pos){
return -(pos)*(pos-2);
};
fx.circOut=function(pos){
return Math.sqrt(1-Math.pow(pos-1,2));
};
fx.circIn=function(pos){
return -(Math.sqrt(1-Math.pow(pos,2))-1);
};
fx.backIn=function(pos){
return (pos)*pos*((2.7)*pos-1.7);
};
fx.backOut=function(pos){
return ((pos-1)*(pos-1)*((2.7)*(pos-1)+1.7)+1);
};
fx.sineOut=function(pos){
return Math.sin(pos*(Math.PI/2));
};
fx.sineIn=function(pos){
return -Math.cos(pos*(Math.PI/2))+1;
};
fx.sineInOut=function(pos){
return -(Math.cos(Math.PI*pos)-1)/2;
};
fx.Position=Class.create();
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_20d){
this.el=$(el);
this.setOptions(_20d);
this.now=[0,0];
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
var tmp=[];
tmp[0]=(this.options.transition(Tpos)*(this.to[0]-this.from[0])+this.from[0]);
tmp[1]=(this.options.transition(Tpos)*(this.to[1]-this.from[1])+this.from[1]);
this.now=tmp;
}
this.increase();
},increase:function(){
this.el.style["left"]=this.now[0]+"px";
this.el.style["top"]=this.now[1]+"px";
},move:function(from,to){
to=to?to:this.now;
this.custom(from,to);
}});
fx.Color=Class.create();
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_20e){
this.el=$(el);
this.setOptions(_20e);
this.now=0;
this.regex=new RegExp("#?(..?)(..?)(..?)");
if(!this.options.fromColor){
this.options.fromColor="#FFFFFF";
}
if(!this.options.toColor){
this.options.toColor="#FFFFFF";
}
if(!this.options.property){
this.props=new Array("backgroundColor");
}else{
this.props=this.options.property.split(",");
}
},increase:function(){
var hex="rgb("+(Math.round(this.cs[0]+(this.ce[0]-this.cs[0])*this.now))+","+(Math.round(this.cs[1]+(this.ce[1]-this.cs[1])*this.now))+","+(Math.round(this.cs[2]+(this.ce[2]-this.cs[2])*this.now))+")";
for(i=0;i<this.props.length;i++){
if(this.props[i]=="backgroundColor"){
this.el.style.backgroundColor=hex;
}else{
if(this.props[i]=="color"){
this.el.style.color=hex;
}else{
if(this.props[i]=="borderColor"){
this.el.style.borderColor=hex;
}
}
}
}
},toggle:function(){
this.cs=this.regex.exec(this.options.fromColor);
this.ce=this.regex.exec(this.options.toColor);
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
},cycle:function(){
this.toggle();
setTimeout(this.toggle.bind(this),this.options.duration+10);
},customColor:function(from,to){
this.cs=this.regex.exec(from);
this.ce=this.regex.exec(to);
for(i=1;i<this.cs.length;i++){
if(this.cs[i].length==1){
this.cs[i]+=this.cs[i];
}
if(this.ce[i].length==1){
this.ce[i]+=this.ce[i];
}
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
this.custom(0,1);
},customColorRGB:function(from,to){
this.rgb_regex=new RegExp("^rgb.([^,]*),s?([^,]*),s?([^)]*)");
this.cs=this.rgb_regex.exec(from);
this.ce=this.rgb_regex.exec(to);
if(!this.cs){
this.customColor(from,to);
return;
}
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i]);
this.ce[i-1]=parseInt(this.ce[i]);
}
this.custom(0,1);
}});
fx.Slide=Class.create();
Object.extend(Object.extend(fx.Slide.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
function toggleOverlay(id){
toggleOverlay.init(id);
toggleOverlay.toggleCurtain();
};
function overlayIsOpen(id){
toggleOverlay.init(id);
return toggleOverlay.curtain.style.display=="block";
};
toggleOverlay.init=function(id){
this.isIE6orBelow=false;
var _20f=navigator.userAgent.toLowerCase();
var _210=_20f.indexOf("msie")+1;
if(_210){
version=_20f.charAt(_210+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_20f.indexOf("mobile")>-1;
this.overlay=$(id);
this.wrapper=this.getWrapper();
this.curtain=this.getCurtain();
this.wrapper.appendChild(this.overlay);
if(this.isIE6orBelow){
this.iframe=this.getIframe();
}
if(navigator.userAgent.indexOf("Linux")!=-1){
tempObjects=document.body.getElementsByTagName("object");
this.elementsToHide=[];
for(var i=0;i<tempObjects.length;i++){
if(!$(tempObjects[i]).descendantOf(this.overlay)){
this.elementsToHide.push(tempObjects[i]);
}
}
}
if(this.isMobile){
scroll(0,0);
}
};
toggleOverlay.toggleCurtain=function(id){
this.overlay.toggle();
if(this.curtain.style.display!="block"){
this.showCurtain();
}else{
this.hideCurtain();
}
};
toggleOverlay.showCurtain=function(){
this.setElementVisibility("hidden");
this.wrapper.style.display="block";
this.curtain.style.display="block";
if(this.isIE6orBelow){
this.iframe.style.display="block";
}
this.stretchCurtain();
jq(this.overlay).trigger("visible",true);
Event.observe(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.hideCurtain=function(){
this.setElementVisibility("visible");
this.curtain.style.display="none";
this.wrapper.style.display="none";
if(this.isIE6orBelow){
this.iframe.style.display="none";
}
jq(this.overlay).trigger("visible",false);
Event.stopObserving(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.setElementVisibility=function(_211){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_211;
}
}
};
toggleOverlay.getWrapper=function(){
var id="toggleOverlayWrapper";
var div=$(id);
if(div){
return div;
}
div=document.createElement("div");
div.id=id;
document.body.appendChild(div);
div.style.zIndex="1000";
if(this.isIE6orBelow){
div.style.position="absolute";
div.style.top=Position.getViewportScrollY()+"px";
Event.observe(window,"scroll",function(){
div.style.top=Position.getViewportScrollY()+"px";
});
}else{
div.style.position="fixed";
}
return div;
};
toggleOverlay.getCurtain=function(){
var id="toggleOverlayCurtain";
var _212=$(id);
if(_212){
return _212;
}
_212=document.createElement("div");
_212.id=id;
this.wrapper.appendChild(_212);
return _212;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _213=$(id);
if(_213){
return _213;
}
_213=document.createElement("iframe");
_213.id=id;
_213.src="";
_213.frameBorder="no";
_213.scrolling="no";
document.body.appendChild(_213);
return _213;
};
toggleOverlay.stretchCurtain=function(){
height=jq(document).height();
toggleOverlay.wrapper.style.height=height+"px";
toggleOverlay.wrapper.style.width=document.body.scrollWidth+"px";
toggleOverlay.curtain.style.height=height+"px";
if(this.isIE6orBelow){
toggleOverlay.iframe.style.height=height+"px";
toggleOverlay.iframe.style.width=document.body.scrollWidth+"px";
}
if(this.isMobile||navigator.userAgent.indexOf("AppleWebKit/")>-1&&!document.evaluate){
wd=self["innerWidth"];
}else{
if(navigator.userAgent.indexOf("Opera")>-1&&parseFloat(window.opera.version())<9.5){
wd=document.body["clientWidth"];
}else{
wd=document.documentElement["clientWidth"];
}
}
left=wd/2-toggleOverlay.overlay.clientWidth/2+"px";
toggleOverlay.overlay.style.left=left;
};
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_214){
this.restore=_214;
this.mem=[];
this.pathMem=[];
return this.toJsonStringArray(arg).join("");
},toObject:function(x){
eval("this.myObj="+x);
if(!this.restoreCirculars||!alert){
return this.myObj;
}
this.restoreCode=[];
this.make(this.myObj,true);
var r=this.restoreCode.join(";")+";";
eval("r=r.replace(/\\W([0-9]{1,})(\\W)/g,\"[$1]$2\").replace(/\\.\\;/g,\";\")");
eval(r);
return this.myObj;
},toJsonStringArray:function(arg,out){
if(!out){
this.path=[];
}
out=out||[];
var u;
switch(typeof arg){
case "object":
this.lastObj=arg;
if(this.detectCirculars){
var m=this.mem;
var n=this.pathMem;
for(var i=0;i<m.length;i++){
if(arg===m[i]){
out.push("\"JSONcircRef:"+n[i]+"\"");
return out;
}
}
m.push(arg);
n.push(this.path.join("."));
}
if(arg){
if(arg.constructor==Array){
out.push("[");
for(var i=0;i<arg.length;++i){
this.path.push(i);
if(i>0){
out.push(",\n");
}
this.toJsonStringArray(arg[i],out);
this.path.pop();
}
out.push("]");
return out;
}else{
if(typeof arg.toString!="undefined"){
out.push("{");
var _215=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var curr=out.length;
if(!_215){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(curr,out.length-curr);
}else{
_215=false;
}
this.path.pop();
}
out.push("}");
return out;
}
}
return out;
}
out.push("null");
return out;
case "unknown":
case "undefined":
case "function":
out.push(this.includeFunctions?arg:u);
return out;
case "string":
if(this.restore&&arg.indexOf("JSONcircRef:")==0){
this.restoreCode.push("this.myObj."+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
}
out.push("\"");
var a=["\\","\\\\","\n","\\n","\r","\\r","\"","\\\""];
arg+="";
for(var i=0;i<8;i+=2){
arg=arg.split(a[i]).join(a[i+1]);
}
out.push(arg);
out.push("\"");
return out;
default:
out.push(String(arg));
return out;
}
}};
jq(document).ajaxError(function(e,_216,_217,_218){
if(_216.getAllResponseHeaders()){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
jq.post("/xml/reporterror.php",{status:_216.status,response:_216.responseText,url:_217.url});
}
});
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
var _219=req.getAllResponseHeaders();
jq.post("/xml/reporterror.php",{headers:_219,error:1});
};
var insideHubEditor=false;
var myGlobalHandlers={onCreate:function(){
this.flag(true);
},prototypeAvailable:function(){
return "undefined"!=typeof (Ajax)&&"undefined"!=typeof (Ajax.activeRequestCount);
},onComplete:function(){
if(0==jq.active&&(!this.prototypeAvailable()||0==Ajax.activeRequestCount)){
this.flag(false);
}
},flagUp:function(){
this.flag(true);
},flagDown:function(){
this.flag(false);
},flag:function(up){
if(up){
setTimeout(function(){
myGlobalHandlers.showIcon();
},2000);
}else{
var _21a=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_21a.hide();
}
},showIcon:function(id){
if(jq.active>0||(this.prototypeAvailable()&&Ajax.activeRequestCount>0)){
var _21b=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_21b.css("display","inline");
}
}};
jq(document).ajaxStart(function(){
myGlobalHandlers.onCreate();
});
jq(document).ajaxStop(function(){
myGlobalHandlers.onComplete();
});
var detect=navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
if(checkIt("konqueror")){
browser="Konqueror";
OS="Linux";
}else{
if(checkIt("safari")){
browser="Safari";
}else{
if(checkIt("opera")){
browser="Opera";
}else{
if(checkIt("msie")){
browser="IE";
}else{
if(!checkIt("compatible")){
browser="Netscape Navigator";
version=detect.charAt(8);
}else{
browser="An unknown browser";
}
}
}
}
}
if(!version){
version=detect.charAt(place+thestring.length);
}
if(!OS){
if(checkIt("linux")){
OS="Linux";
}else{
if(checkIt("x11")){
OS="Unix";
}else{
if(checkIt("mac")){
OS="Mac";
}else{
if(checkIt("win")){
OS="Windows";
}else{
OS="an unknown operating system";
}
}
}
}
}
function checkIt(_21c){
place=detect.indexOf(_21c)+1;
thestring=_21c;
return place;
};
function ssToId(id,_21d){
var _21d=_21d||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_21d);
return false;
};
function ssOnload(){
var _21e=location.hash.slice(1);
if(_21e=="comments"){
ssToId("comFirst");
}else{
if(_21e.substr(0,8)=="comment-"){
ssToId("comment"+_21e.substr(8));
}else{
if(_21e.substr(0,5)=="slide"){
var _21f=_21e.replace("slide","");
var _220=jQuery(".image_module_thumb[id*=\""+_21f+"\"]");
if(_220.length>0){
_220.click();
_220.parents(".moduleImage").find(".slide_display img:visible").click();
}else{
jQuery("#img_url_"+_21f+" img").click();
}
}else{
if(_21e!=null&&_21e){
ssToId(_21e);
}
}
}
}
};
function fetchRecaptcha(_221){
var _222="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _223=document.getElementsByTagName("head")[0];
var _224=document.createElement("script");
_224.type="text/javascript";
_224.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_224.onload=function(){
Recaptcha.create(_222,_221,{theme:"red"});
};
_224.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_222,_221,{theme:"red"});
}
};
_223.appendChild(_224);
}else{
Recaptcha.create(_222,_221,{theme:"red"});
}
};
function check_signed_in_ajax(_225,_226){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_227,_228){
_225(eval(_227.responseText),_226);
}});
};
function whenSignedIn(_229,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_229,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_22a,info){
if(_22a){
info.fn.apply(null,info.args);
}else{
var url;
if("undefined"!=typeof (info.options.utm_source)){
url="/xml/signinupform.php?utm_source="+info.options.utm_source;
}else{
url="/xml/signinupform.php";
}
showFancyAjaxOverlay(url,info.options,"",{width:380,height:300,innerColor:"#e4e7e0",onComplete:function(){
var _22b="undefined"==typeof (info.options.captchaId)?"captcha_div":info.options.captchaId;
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha(_22b);
}
jq("#signInOverlay").bind("success",function(){
hideFancyOverlay();
info.fn.apply(null,info.args);
jq(this).unbind("success");
});
}});
}
return false;
};
function insertVideo(type,key,css,_22c,_22d,_22e){
var _22f="<div class=\"video\">";
var mode="opaque";
if(_22d){
mode="transparent";
}
if(_22e=="bad"){
_22f="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_22f+="<embed style=\""+_22c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
_22f+="<embed style=\""+_22c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_22f+="<embed style=\""+_22c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_22f+="<embed style=\""+_22c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
_22f+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+mode+"\"></embed></object>";
}else{
if(type=="YahooSports"){
_22f+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_22f+="<embed style=\""+_22c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_22f+="<embed style=\""+_22c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_22f+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_22f+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_22f+="</div>";
if(_22d){
jq("#"+_22d).html(_22f);
}else{
if(type!="New"){
document.write(_22f);
}
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_230){
if(_230===undefined){
_230=false;
}
if(_230){
var _231=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_231){
return false;
}
}
jq.post("/xml/hubfeedshare.php",{url:url},function(rsp){
eval(rsp);
if(success){
jq("#share_with_followers").html("Hub shared!");
}else{
jq("#share_with_followers").html("Sorry, something went wrong!");
}
});
};
function praiseHub(id,val,_232){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,style:_232?_232:0},function(){
jq("#praise_feedback").html("Saved. Thanks!");
});
return false;
};
function recArt(id,val){
jq("#rec_"+id).load("/xml/feedback.php",{a:id,v:val});
return false;
};
function hubFeedback(id,val,done){
jq.post("/xml/feedback.php",{a:id,v:val},done);
return false;
};
function answerFeedback(_233,val,done){
jq.post("/xml/answervote.php",{id:_233,vote:val},done);
return false;
};
function toggleShareIt(id,flg,_234){
if(_234===undefined){
_234=false;
}
if(flg){
jq("#share_tgt").load("/xml/shareit.php",{art_id:id,show_warn:_234});
}else{
jq("#share_tgt").html("");
}
return false;
};
function extractParamFromUri(uri,_235){
if(!uri){
return;
}
var _236=new RegExp("[\\?&#]"+_235+"=([^&#]*)");
var _237=_236.exec(uri);
if(_237!=null){
return unescape(_237[1]);
}
return;
};
function displaySocialButtons(_238){
if("IE"==browser&&version<=7){
return false;
}
_238=_238||{};
var _239;
if(_238["pagepath"]){
_239=_238["pagepath"];
}
var _23a=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_238["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_23b){
FB.init({xfbml:true});
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_23c){
_gaq.push(["t2._trackSocial","facebook","like",_23c,_239]);
});
FB.Event.subscribe("edge.remove",function(_23d){
_gaq.push(["t2._trackSocial","facebook","unlike",_23d,_239]);
});
FB.Event.subscribe("message.send",function(_23e){
_gaq.push(["t2._trackSocial","facebook","send",_23e,_239]);
});
FB.Event.subscribe("xfbml.render",function(){
jq(".socialbuttons").show().trigger("display");
});
};
}else{
jq(window).bind("load",function(){
jq(".socialbuttons").show().trigger("display");
});
}
if(!_238["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_23f){
twttr.events.bind("tweet",function(_240){
if(_240){
var _241;
if(_240.target&&_240.target.nodeName=="IFRAME"){
_241=extractParamFromUri(_240.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_241,_239]);
}
});
});
}
if(!_238["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_238["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_23a;
};
function showLinkArticle(url,_242){
if(window.location.hash){
url+=window.location.hash;
}
var data={page_url:url,page_title:_242};
showFancyAjaxOverlay("/xml/linkarticle.php",data,"linkarticle");
return false;
};
function showFlag(id,from){
var url;
switch(from){
case "hub":
url="/xml/flaghub.php?a="+id;
break;
case "request":
url="/xml/flagrequest.php?r="+id;
break;
case "profile":
url="/xml/flagprofile.php?u="+id;
break;
}
jq("#flag_box_"+id+" .flag_button").toggleClass("open");
if(jq("#flag_box_"+id+" .flag_content").length>0){
jq("#flag_box_"+id+" .flag_content").toggle();
}else{
jq.get(url,function(data){
jq("#flag_box_"+id+".flag_button_box").append(data);
});
jq(document).mouseup(function(e){
if(jq("#flag_box_"+id+" .flag_button").hasClass("open")){
if(jq("#flag_box_"+id+".flag_button_box").has(e.target).length===0){
jq("#flag_box_"+id+" .flag_button").toggleClass("open");
jq("#flag_box_"+id+" .flag_content").toggle();
}
}
});
}
return false;
};
function showFlagHub(id){
showFlag(id,"hub");
return false;
};
function hideFlagHub(id){
jq(".flag_button").removeClass("open");
jq("#flag_box_"+id+".flag_button_box").html("<span class=\"flag_thanks\">Ok, we're on it. Thanks!</span>");
};
function showFancyAjaxOverlay(url,data,_243,_244){
if(!_244){
var _244={};
}
jq.post(url,data,function(html){
jq("#fancybox-wrap").attr("class","");
var _245=jq.extend({content:html,onComplete:function(){
if(_243){
jq("#fancybox-wrap").addClass(_243);
}
},autoDimensions:false,width:610,height:500,padding:0},_244);
jq.fancybox(_245);
});
};
function showFancyOverlay(html,_246){
if(!_246){
var _246={};
}
var _247=jq.extend({content:html},_246);
jq.fancybox(_247);
return false;
};
function hideFancyOverlay(){
jq.fancybox.close();
return false;
};
function follow(_248,_249,_24a,_24b,_24c){
var _24d=jq(this);
var data={typeId:_248,objectId:_249,isActive:_24a,printNumbers:_24b,overrides:_24c};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_248){
case 1:
url+=escape("follow answers to this question");
break;
case 2:
url+=escape("follow comments to this Hub");
break;
case 3:
url+=escape("follow users");
break;
case 4:
url+=escape("follow categories");
break;
case 5:
case 6:
url+=escape("follow posts in this forum thread");
break;
}
url+="&url=";
url+=encodeURI(document.URL);
document.location.href=url;
}else{
if(data=="same"){
alert("You may not follow yourself");
}else{
switch(_248){
case 1:
jQuery(".follow_question_"+_249).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_249).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data),_24e=jQuery(".follow_"+_249);
_24e.replaceWith(json.buttonText);
if(json.fanMail){
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400,onClosed:function(){
if(_24d.hasClass("close_after")){
jq(window).trigger("suggestion_followed",[jQuery("#follow_"+_249)]);
}
}});
}
break;
case 4:
jQuery(".follow_"+_249).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_249).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButtons(){
var _24f=jq("span[id^=follow_], span[class^=follow_]"),_250=jQuery.map(_24f,function(span,i){
if(jq(span).find("a").text().toUpperCase()=="LOADING..."){
var _251=jq(span),_252=parseInt(_251.data("typeId")),_253=_251.data("objectId"),_254=true,_255=_251.data("overrides");
return {typeId:_252,objectId:_253,overrides:_255,printNumbers:_254};
}else{
}
});
if(_250.length>0){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",dataType:"json",data:{itemsToPaint:_250},success:function(data){
jq.each(data,function(){
var item=this;
switch(item.typeId){
case 1:
jQuery("span.follow_question_"+item.objectId).replaceWith(item.content);
break;
case 2:
jQuery("span.follow_article_"+item.objectId).html(item.content);
break;
case 3:
var json=JSONstring.toObject(item.content);
jQuery("span#follow_"+item.objectId).replaceWith(json.buttonText);
break;
case 4:
jQuery("span.follow_"+item.objectId).replaceWith(item.content);
break;
case 5:
jQuery("span#follow_"+item.objectId).replaceWith(item.content);
break;
case 6:
jQuery("span#follow_"+item.objectId).replaceWith(item.content);
break;
}
});
}});
}
};
function updateFollowButton(_256,_257,_258,_259){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_256,objectId:_257,printNumbers:_258,overrides:_259},success:function(data){
switch(_256){
case 1:
jQuery(".follow_question_"+_257).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_257).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_257).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_257).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_257).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_257).replaceWith(data);
break;
}
}});
};
function expandComments(id,mm,flg){
if(flg){
jQuery("#comment_tgt").load("/xml/comments.php",{"mdc_id":id,"modMode":mm});
}else{
jQuery("#comment_tgt").html="";
}
return false;
};
function deleteComment(_25a,_25b){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_25b).serialize(),success:function(resp){
toggleCommentEdit(_25a,false);
jq("#ctext_"+_25a).html(resp);
jq("#cedit_"+_25a).remove();
}});
return false;
};
function toggleCommentEdit(_25c,_25d){
if(_25d){
jq("#cedit_"+_25c).hide();
jq("#cbox_"+_25c).show();
jq("#ctext_"+_25c).hide();
}else{
jq("#cedit_"+_25c).show();
jq("#cbox_"+_25c).hide();
jq("#ctext_"+_25c).show();
}
};
(function($){
$.fn.sampleDuration=function(_25e){
var _25f=new Date();
return $(this).bind("beforeunload",function(){
var _260=new Date();
$.post("/xml/duration",{art_id:_25e,dur:_260-_25f});
});
};
})(jQuery);
function setupNavMenu(){
jq(document).ready(function(){
var _261=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_261=="touchstart"){
jq("#header_explore").bind(_261+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_261+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_261+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_261+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_261+".nav",function(_262){
_262.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_263){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_264){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_265){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_266){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_267){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_268){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_269){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_26a){
nav_hide_all_menus();
});
jq("html").bind("click",function(_26b){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_26c){
_26c.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function showImageFromThumb(){
var id=jq(this).attr("id");
var _26d=id.replace("t_","slide_img_");
var _26e=jq("#"+_26d);
_26e.parent().parent().children(":visible").hide();
_26e.parent().show();
};
function initThumbnailImages(){
jq(".image_module_thumb").click(showImageFromThumb);
};
function initHub(){
initThumbnailImages();
relatedHubStats.trackedclass=".tracked_link";
relatedHubStats.initEventHandlers();
};
function initTurboHub(_26f,_270){
initTurboHubShare(_270);
initTurboVoting(_26f);
initCommentPlaceholderText();
};
function initCommentPlaceholderText(){
jq(".moduleComment textarea").data("placeholder","Add Your Comment...");
jq(".moduleComment .text_input").data("placeholder","Your Name").val("");
jq(".moduleComment textarea, .moduleComment .text_input").focus(function(){
var ph=jq(this).data("placeholder");
if(ph&&ph==jq(this).val()&&jq(this).hasClass("placeholder")){
jq(this).val("").removeClass("placeholder");
}
}).blur(function(){
var ph=jq(this).data("placeholder");
if(ph&&""==jq(this).val()){
jq(this).addClass("placeholder").val(ph);
}
}).blur();
};
function initQATurboVoting(_271){
jq("#answer_vote_"+_271+" .answer_vote_up").click(function(){
answerFeedback(_271,1,function(){
jq("#answer_vote_"+_271+" .answer_vote_up").addClass("answer_voted_up");
jq("#answer_vote_"+_271+" .answer_vote_down").addClass("answer_down_disabled");
jq("#answer_vote_"+_271+" .answer_vote_up").removeClass("answer_up_disabled");
jq("#answer_vote_"+_271+" .answer_vote_down").removeClass("answer_voted_down");
showQAVoteThanks(_271);
});
return false;
});
jq("#answer_vote_"+_271+" .answer_vote_down").click(function(){
answerFeedback(_271,0,function(){
jq("#answer_vote_"+_271+" .answer_vote_up").addClass("answer_up_disabled");
jq("#answer_vote_"+_271+" .answer_vote_down").addClass("answer_voted_down");
jq("#answer_vote_"+_271+" .answer_vote_up").removeClass("answer_voted_up");
jq("#answer_vote_"+_271+" .answer_vote_down").removeClass("answer_down_disabled");
showQAVoteThanks(_271);
});
return false;
});
jq("#answer_vote_"+_271).mouseenter(function(){
jq(this).data("active",true);
setTimeout(showQAVoteBubble(_271),1500);
}).mouseleave(function(){
jq(this).data("active",false);
setTimeout(hideQAVoteBubble(_271),500);
});
};
function showQAVoteThanks(_272){
jq("#vote_bubble_"+_272+" p").text("Thank you for ensuring top quality content on HubPages.");
};
function showQAVoteBubble(_273){
var av=jq("#answer_vote_"+_273);
if(av.data("active")){
jq("#vote_bubble_"+_273).fadeIn(600);
}
};
function hideQAVoteBubble(_274){
var vb=jq("#vote_bubble_"+_274);
var d=new Date();
var _275=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#answer_vote_"+_274).data("active")&&!_275){
vb.fadeOut(600);
}
};
function initTurboVoting(_276){
var _277=jq("#vote_bubble");
jq("#hub_vote .hub_vote_up").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_276,1,function(){
jq("#hub_vote .hub_vote_up").addClass("hub_voted_up");
jq("#hub_vote .hub_vote_down").addClass("hub_down_disabled");
showVoteThanks();
});
return false;
});
jq("#hub_vote .hub_vote_down").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_276,0,function(){
jq("#hub_vote .hub_vote_up").addClass("hub_up_disabled");
jq("#hub_vote .hub_vote_down").addClass("hub_voted_down");
showVoteThanks();
});
return false;
});
jq("#hub_vote").mouseenter(function(){
jq(this).data("active",true);
setTimeout(showVoteBubble,1500);
}).mouseleave(function(){
jq(this).data("active",false);
setTimeout(hideVoteBubble,500);
});
};
function showVoteThanks(){
jq("#vote_bubble p").text("Thank you for ensuring top quality content on HubPages.");
var d=new Date();
jq("#vote_bubble").data("thanks",d.getTime()).not(":visible").fadeIn(600);
setTimeout(hideVoteBubble,3500);
};
function showVoteBubble(){
var hv=jq("#hub_vote");
if(hv.data("active")){
jq("#vote_bubble").fadeIn(600);
}
};
function hideVoteBubble(){
var vb=jq("#vote_bubble");
var d=new Date();
var _278=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#hub_vote").data("active")&&!_278){
vb.fadeOut(600);
}
};
function initTurboHubShare(_279){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(socialWidgetUpdate).resize(socialWidgetUpdate);
}
jq(".socialbuttons").bind("display",function(){
socialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_hub_social").css("visibility","visible");
}else{
jq("#share_hub_social").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({pagepath:_279,nogplus:true});
}
},3000);
};
function socialWidgetUpdate(){
var _27a=20;
var pos=jq(this).scrollTop();
var _27b=jq("#share_hub");
var _27c=jq("#hub_container");
var _27d=0;
var _27e=jq(".moduleHostedVideo");
if(_27e.size()){
_27d=_27e.first().position().top+_27e.first().outerHeight();
}
var _27f=_27c.height()-_27b.outerHeight();
var _280=_27c.offset();
if(_280.top+_27d-pos<_27a){
if(pos>_280.top+_27f){
_27b.css({position:"absolute",top:_27f+"px",right:"-15px",left:"auto"});
}else{
_27b.css({position:"fixed",top:_27a+"px",left:(538+_280.left)+"px",right:"auto"});
}
}else{
_27b.css({position:"absolute",top:_27d+"px",right:"-15px",left:"auto"});
}
};
function initTurboQAShare(_281){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(qaSocialWidgetUpdate).resize(qaSocialWidgetUpdate);
}
jq(".socialbuttons").bind("display",function(){
qaSocialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_qa_social").css("visibility","visible");
}else{
jq("#share_qa_social").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({pagepath:_281,nogplus:true});
}
},3000);
};
function qaSocialWidgetUpdate(){
var _282=20;
var pos=jq(this).scrollTop();
var _283=jq("#share_qa");
var _284=jq("#answers");
var _285=0;
var _286=jq(".moduleHostedVideo");
if(_286.size()){
_285=_286.first().position().top+_286.first().outerHeight();
}
var _287=_284.height()-_283.outerHeight();
var _288=_284.offset();
if(_288.top+_285-pos<_282){
if(pos>_288.top+_287){
_283.css({position:"absolute",top:_287+"px",left:"auto"});
}else{
_283.css({position:"fixed",top:_282+"px",left:(520+_288.left)+"px",right:"auto"});
}
}else{
_283.css({position:"absolute",top:_285+"px",left:"auto"});
}
};
function google_ad_request_done(_289){
var s="";
var i;
if(_289.length==0){
return;
}
if(_289[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_289[0].image_width+"\" HEIGHT=\""+_289[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_289[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_289[0].image_url+"\" WIDTH=\""+_289[0].image_width+"\" HEIGHT=\""+_289[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_289[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_289[0].url+"\" target=\"_top\" title=\"go to "+_289[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_289[0].visible_url+"';return true\"><img border=\"0\" src=\""+_289[0].image_url+"\"width=\""+_289[0].image_width+"\"height=\""+_289[0].image_height+"\"></a>";
}else{
if(_289[0].type=="html"){
s+=_289[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a>";
for(i=0;i<_289.length;++i){
ad=_289[i];
s+="<div class=\"cjs_ad cjs_ad_"+i+"\">";
s+="<div class=\"cjs_titleurl\">";
s+="<a class=\"cjs_title\" href=\""+ad.url+"\">"+ad.line1+"</a> ";
s+="<a class=\"cjs_url\" href=\""+ad.url+"\">"+ad.visible_url+"</a>";
s+="</div>";
s+="<div class=\"cjs_desc\">"+ad.line2+" "+ad.line3+"</div>";
s+="</div>";
}
s+="</div>";
}
}
}
document.write(s);
return;
};
function hubAnchorUpdate(){
var _28a=jq.address.value().substr(1);
if(""==_28a){
return;
}
var _28b=false;
if(_28a.substr(0,8)=="comment-"){
_28b=true;
_28a="comment"+_28a.substr(8);
}
if("morecomments"==_28a||_28b){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_28a){
ssToId("comFirst");
}else{
if("morecomments"==_28a){
}else{
ssToId(_28a);
}
}
};
function loadRatingSystem(_28c,_28d,_28e,_28f){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_28c,params:{id:_28f},ratingClass:"rating"});
};
function initAutoComplete(_290,_291){
var _292="";
var _293="++none++";
var _294=false;
var _295=false;
var _296=false;
var _297="#the_auto_comp_box";
var _298="#search_form";
var _299="#search_input";
var _29a=".search_submit";
var _29b="search_form";
var _29c="/xml/getautocompletestrings.php";
var _29d="";
var _29e=0;
var _29f=null;
var _2a0=null;
var _2a1=null;
var _2a2=null;
var _2a3=null;
var _2a4=false;
if(_291){
_297=_291.boxid;
_298=_291.container;
_299=_291.input;
_29a=_291.submit;
if(_291.ajaxtarget!=undefined){
_29c=_291.ajaxtarget;
}
if(_291.querystring!=undefined){
_29d="&"+_291.querystring;
}
if(_291.filter!=undefined){
_29f=_291.filter;
}
if(_291.callback!=undefined){
_2a0=_291.callback;
}
if(_291.keyboardelem!=undefined){
_2a2=_291.keyboardelem;
}
if(_291.targoutput!=undefined){
_2a1=_291.targoutput;
}
if(_291.keyuptarget!=undefined){
_2a3=_291.keyuptarget;
}
if(_291.showprogress!=undefined){
_2a4=_291.showprogress;
}
}
if(!_2a2){
_2a2=_299;
}
if(!_2a1){
_2a1=_299;
}
if(!_2a3){
_2a3=_2a2;
}
jq(document).ready(function(){
if(!_294){
_294=true;
jq("<div id=\""+_297.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_2a2);
if(_2a4){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_297);
jq("#auto_comp_close").bind("click",function(){
jq(_297).hide();
jq("#auto_comp_close").hide();
});
}
jq(_297).hide();
if(!_2a4){
jq(_297).bind("focusin",function(){
_295=true;
});
jq(_297).bind("focusout",function(){
_295=false;
});
jq(_298).bind("focusin",function(){
_296=true;
});
jq(_298).bind("focusout",function(){
_296=false;
setTimeout(function(){
if(!_295&&!_296){
jq(_297).hide();
jq("#auto_comp_close").hide();
_29d=_29d.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_298).attr("autocomplete","off");
jq(_2a2).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_29e=0;
jq(_297+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_2a3).bind("keyup",function(){
var _2a5=jq(_299).attr("value");
if(_299!=_2a2){
if(_292!=_2a5){
_29d=_29d.replace(/start=[0123456789]+/,"");
_29d=_29d.replace(/&&/,"&");
}
_292="";
_293="++none++";
}
var _2a6;
if(_291){
_2a6="hubs";
}else{
_2a6=jq(".search_type option:selected").val();
if(_2a6==undefined){
_2a6="site";
}
}
if(jq.trim(_2a5).length==0){
jq(_297).hide();
jq("#auto_comp_close").hide();
}
if(jq.trim(_2a5).length>0&&_292!=_2a5){
_292=_2a5;
if(_2a5.indexOf(_293)==0){
jq(_297+" > .auto_comp_row").each(function(){
var _2a7=jq(this).text();
if(_29f){
_2a7=_29f(_2a7);
}
if(_2a7.indexOf(_2a5)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_293="++none++";
jq(_297+" > .auto_comp_row").remove();
var _2a8="?";
if(_2a4){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_297);
jq(_297).show();
_2a8="?s="+escape(_2a5)+"&";
}
var _2a9=jq(_298).serialize();
var _2aa=/(^|&)s=/;
if(!_2a9.match(_2aa)&&!_29d.match(_2aa)&&!_2a8.match(_2aa)){
_2a9+="&s="+_2a5;
}
jq.get(_29c+_2a8+"t="+escape(_2a6)+_29d,_2a9,function(data){
jq(_297+" div[id=auto_comp_error]").remove();
jq(_297+" div[id=auto_comp_progress]").remove();
_29d=_29d.replace(/start=[0123456789]+/,"");
_29d=_29d.replace(/&&/,"&");
var _2ab=jq(data).find("div").length;
var _2ac=false;
if(_2ab==0){
return true;
}
var _2ad=jq(_299).val();
if(_2ad!=_2a5){
return true;
}
if(_2ab<_290){
_293=_2a5;
}else{
_293="++none++";
}
jq(_297).show();
jq(_2a2).focus();
var _2ae=jq(_2a2).position();
var _2af=jq(_2a2).outerHeight(true);
jq(_297).position(_2ae.top+_2af,_2ae.left+5);
jq(data).find("div").appendTo(_297);
jq(_297+" > .auto_comp_row").bind("click",function(){
var _2b0=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_2b0=true;
var _2b1=href.substr(8);
_29d+="&start="+_2b1;
_29d=_29d.replace(/&&/,"&");
}
});
if(_2b0){
if(!_2ac){
setTimeout(function(){
jq(_2a3).trigger("keyup");
},200);
_295=false;
_2ac=true;
}
return (false);
}
var _2b2=jq(this).text();
if(_29f){
_2b2=_29f(_2b2);
}
jq(_2a1).attr("value",_2b2);
if(document.forms[_29b]){
document.forms[_29b].submit();
}else{
if(_29a){
jq(_29a).trigger("click");
}
}
return (false);
});
jq(_297+" > .auto_comp_row").bind("keypress",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 13:
jq(this).trigger("click");
return (false);
break;
}
return (true);
});
jq(_297+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_297+" > .auto_comp_row:visible:eq("+_29e+") > a").length){
return (false);
}
++_29e;
jq(_297+" > .auto_comp_row:visible:eq("+_29e+") > a").trigger("focus");
return (false);
break;
case 38:
--_29e;
if(_29e<0){
jq(_2a2).trigger("focus");
}else{
jq(_297+" > .auto_comp_row:visible:eq("+_29e+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_2a0){
_2a0();
}
},"html");
}
});
}
});
};
function updateNumCharCount(_2b3,_2b4,_2b5){
if(jq("#"+_2b4).hasClass("dimmed")){
jq("#"+_2b5).html(_2b3);
}else{
if(jq("#"+_2b4).val().length>_2b3){
jq("#"+_2b4).value=jq("#"+_2b4).val().substring(0,_2b3);
}
jq("#"+_2b5).html(_2b3-jq("#"+_2b4).val().length);
}
};
function checkCharCount(_2b6,_2b7,_2b8){
updateNumCharCount(_2b6,_2b7,_2b8);
jQuery("#"+_2b7).bind("click keyup keydown",function(){
updateNumCharCount(_2b6,_2b7,_2b8);
});
jQuery("#"+_2b7).bind("keypress",function(evt){
updateNumCharCount(_2b6,_2b7,_2b8);
var code=(evt.keyCode?evt.keyCode:evt.which);
if(code!=8&&code!=37&&code!=38&&code!=39&&code!=40&&(browser=="Opera"||code!=46)){
if(jQuery(this).val().length>=_2b6){
evt.stopPropagation();
return false;
}
}
return true;
});
};
function checkCommentCharCount(_2b9,_2ba,_2bb,_2bc){
jQuery("#"+_2ba).bind("click keypress keydown keyup",function(){
if(jQuery("#"+_2bc).text()<_2b9){
jQuery("#"+_2bb).show("fast");
}else{
jQuery("#"+_2bb).hide("fast");
}
});
};
function initCommentsCapsule(_2bd,_2be,_2bf){
if(_2bf.signInRequired){
jq("#comment_submit_"+_2bd).data("disabled",true);
jq("#comment_submit_"+_2bd+", .moduleComment .compose_comment textarea").click(function(){
whenSignedIn({explain:"to comment",showSignup:true,utm_source:"tocomment"},function(){
jq("#comText_"+_2bd).remove();
document.location=_2bf.url;
document.location.reload(true);
});
return false;
});
return;
}
checkCharCount(8192,"comText_"+_2bd,"comText_"+_2bd+"_chars");
checkCommentCharCount(1000,"comText_"+_2bd,"comCharDiv_"+_2bd,"comText_"+_2bd+"_chars");
var _2c0="function"==typeof (_2bf.success)?_2bf.success:function(resp){
jq("#mod_"+_2bd).html(resp);
jq("#spinner").hide();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
};
var _2c1;
if(_2be){
_2c1=function(form,btn){
whenSignedIn({explain:"to comment as "+_2be,utm_source:"tocomment"},function(){
jq(form).ajaxSubmit({type:"POST",success:_2c0});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
});
};
}else{
_2c1=function(form,btn){
jq(form).ajaxSubmit({type:"POST",success:_2c0});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
};
}
jq(document).delegate("#fancybox-close","click",function(){
jq("#spinner").hide();
return false;
});
jq("#comment_submit_"+_2bd).click(function(){
jq("#comment_"+_2bd).submit();
return false;
});
var _2c2={onkeyup:false,submitHandler:function(form){
var btn=jq("#comment_submit_"+_2bd);
if(btn.data("disabled")){
return;
}
jq("#spinner").show();
_2c1.apply(this,[form,btn]);
},rules:{name:{requiredNoPlaceholder:true,nohtml:true}},messages:{name:{requiredNoPlaceholder:"Please enter your name before posting."}},errorLabelContainer:"#formErrors_{$modId} ul",errorElement:"li",errorClass:"errorFld",onfocusout:false};
_2c2.rules["comText_"+_2bd]={requiredNoPlaceholder:true,minlength:4,nohtml:true};
_2c2.messages["comText_"+_2bd]={requiredNoPlaceholder:"Please enter a comment before posting.",minlength:"Your comment is rather short."};
jq("#comment_"+_2bd).validate(_2c2);
};
function forceOpenHiddenRequestComment(){
jq(document).ready(function(){
if(!jq(document.location.hash).is(":visible")){
jq(document.location.hash).parent().toggle();
jq(document.location.hash).parent().parent().find("a.see_all").toggle();
jq(document.location.hash).parent().parent().find("a.hide_extra").toggle();
}
});
};
function safeScriptEval(_2c3){
var _2c4=_2c3.innerHTML.strip();
if(_2c4.substring(0,4)=="<!--"){
_2c4=_2c4.substring(4,_2c4.length-3);
}
try{
eval(_2c4);
}
catch(e){
}
};
function selectTab(_2c5,_2c6,_2c7,_2c8){
var _2c9;
if(!_2c7){
_2c7=jq("#tab_"+_2c5+"_0").closest("ul").children().size();
}
var _2ca,_2cb;
for(var i=0;i<_2c7;i++){
_2ca=jq("#tab_"+_2c5+"_"+i);
_2cb=jq("#tabcontent_"+_2c5+"_"+i);
if(!_2ca.size()||!_2cb.size()){
alert("Cannot locate element: baseid="+_2c5+" index="+_2c6+" tabcount="+_2c7);
}
if(_2ca.hasClass("selected")){
_2c9=i;
}
if(i==_2c6){
_2ca.addClass("selected");
_2cb.addClass("selected");
}else{
_2ca.removeClass("selected");
_2cb.removeClass("selected");
}
}
var _2cc={};
if(_2c8&&_2cc.toString.call(_2c8)=="[object Function]"){
_2c8(_2c9,_2c6);
}
return false;
};
function categoryFanBulkJoin(id,_2cd,_2ce,_2cf,_2d0,_2d1){
var _2d2=jq(".jc");
var cids=Array();
var _2d3=Array();
var i=0;
var k=0;
jq(".jc").each(function(_2d4,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_2cf){
_2d3[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_2d3.join(",");
if(_2cf){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_2d0){
_2d0(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_2d1)!="undefined"){
data["searchTxt"]=_2d1;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_2cd){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_2ce){
setTimeout(categoryFanHighlight,500);
}
}
if(_2d0){
_2d0(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_2d5,_2d6,_2d7,cols,_2d8){
if(!_2d7){
var _2d7=8;
}
if(!cols){
var cols=2;
}
var _2d9=jq("#"+_2d6).val();
if(""==jq.trim(_2d9)){
return;
}
jq("#"+_2d5).load("/xml/categoryFanSearch.php",{search:_2d9,limit:_2d7,cols:cols},function(){
if(_2d8){
_2d8();
}
});
return false;
};
function facebookConnect(_2da){
if(typeof (_2da)=="undefined"){
_2da="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_2da}).toQueryString();
var ajax=new Ajax.Request("/xml/facebook_authurl.php",{method:"post",parameters:uri,onFailure:reportError,onComplete:function(req){
eval(req.responseText);
if(typeof (authorizationUrl)!="undefined"){
this.child.document.location=authorizationUrl;
}else{
this.child.close();
}
}});
return false;
};
function facebookPopup(_2db){
xyPos="";
if(window.screenX&&window.innerWidth){
xPos=window.screenX+((window.innerWidth-550)/2);
yPos=window.screenY+((window.innerHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}else{
if(window.screenLeft&&document.body.clientHeight){
xPos=window.screenLeft+((document.body.clientWidth-550)/2);
yPos=window.screenTop+((document.body.clientHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}
}
child=window.open(_2db,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_2dc,_2dd){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_2dc+"="+(_2dd?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function checkViolations(_2de){
if(_2de){
jq(".violations_span").html("");
var _2df={check_violation:1};
}else{
var _2df={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_2df,dataType:"json",success:function(_2e0){
if(_2e0.data){
jq(".violations_span").html(_2e0.data);
}
if(!_2e0.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showFlagRequest(id){
showFlag(id,"request");
};
function showFlagProfile(id){
showFlag(id,"profile");
};
function showEditProfileForm(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/profileform.php",uri,"editprofile");
return false;
};
function showAuthorHubOfTheDay(aid){
var uri=$H({user_id:aid}).toQueryString();
showAjaxOverlay("/xml/hotd_author.php",uri,"hotd");
return false;
};
function showTermsOfService(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/termsofservice.php",uri,"tos");
return false;
};
function showHubOverlay(url,_2e1,_2e2){
var uri=$H({url:url,addComment:_2e1,commentText:_2e2}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_2e3){
var uri=$H({modId:_2e3}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_2e4,_2e5){
var uri=$H({moduleId:_2e4,pollId:_2e5}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showEmailForm(purl,_2e6,_2e7){
var uri=$H({page_url:purl,page_type:_2e6,page_filter:_2e7}).toQueryString();
showAjaxOverlay("/xml/emailpage.php",uri,"emailhub");
return false;
};
function showAjaxOverlay(_2e8,_2e9,_2ea,_2eb){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_2ea){
$("overlay").addClassName(_2ea);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_2e8,{parameters:_2e9,onComplete:function(){
if(_2eb!=undefined){
_2eb.call($("overlay"));
}
if(!$("fixed_title")){
return;
}
var _2ec=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_2ec+"px"});
}
adjustOverlayHeight();
}.bind(this),onFailure:reportError,evalScripts:true});
};
function closeAjaxOverlay(){
toggleOverlay("overlay");
$("overlay").className="overlay";
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
return false;
};
function adjustOverlayHeight(){
var _2ed=browser=="IE"&&version<=6;
var _2ee=$("overlay");
var _2ef=Position.getViewportHeight();
if(_2ef>750){
var _2f0=_2ef-150;
}else{
var _2f0=_2ef-90;
}
var _2f1=_2ee.getStyle("paddingTop");
var _2f2=_2ee.getStyle("paddingBottom");
_2f0-=_2f1.substring(0,_2f1.length-2);
_2f0-=_2f2.substring(0,_2f2.length-2);
_2f0=Math.max(_2f0,100);
$("overlay").setStyle({height:_2f0+"px"});
if(_2ef>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_2ed){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_2ed){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _2f3=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_2f3+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_2f0-60)+"px",overflowY:"auto"});
}
};
function activity_why(id,_2f4,_2f5,_2f6){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_2f4,actionTargetId:_2f5,createDate:_2f6}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function ellipse(str,_2f7){
if(str.length>_2f7&&_2f7!=0){
str=str.substr(0,_2f7-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_2f7-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function addTagEntries(){
var _2f8=4;
var _2f9=document.createElement("div");
_2f9.id="moreEntryDiv";
var li=null;
var _2fa=4+1;
var _2fb=_2fa+_2f8;
for(var i=_2fa;i<_2fb;i++){
li=document.createElement("li");
_2f9.appendChild(li);
var _2fc=document.createElement("input");
_2fc.className="tagEntry";
_2fc.name="tag_"+i;
_2fc.type="text";
_2fc.size=40;
li.appendChild(_2fc);
}
$("tagEntries").appendChild(_2f9);
return true;
};
function hubtool_add_tag(_2fd){
var _2fe=(_2fd)?$(_2fd):$("add_tag_input");
if(!_2fe){
return;
}
var tag;
if(Field.present(_2fe)&&_2fe.type){
tag=$F(_2fe);
Field.clear(_2fe);
}else{
if(_2fe.innerHTML){
tag=_2fe.innerHTML;
Element.remove(Element.findElement(_2fe,"li"));
}
}
if(!tag){
return;
}
var _2ff=0;
var _300=/^tag_(\d+)$/i;
var _301=$$(".tagEntry");
_301.each(function(ele){
if(ele.id){
var ms=_300.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_2ff){
_2ff=id;
}
}
}
});
_2ff++;
var _302="tag_"+_2ff;
var _303=$("add_tag_input").parentNode;
var _304="<input class=\"tagEntry\" id=\""+_302+"\" name=\""+_302+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_302)){
var _305=$(_302).tabIndex;
Element.update($(_302).parentNode,_304);
$(_302).tabIndex=_305;
}else{
var _306=$("tag_1").tabIndex-1;
var _305=_306+_2ff;
var pole=new Insertion.Before(_303,"<li>"+_304+"</li>");
$(_302).tabIndex=_305;
_305=$("add_tag_input").tabIndex;
_305++;
$("add_tag_input").tabIndex=_305;
}
return false;
};
function add_tag(_307){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _308=tag.replace(/'/g,"\\'");
var _309=tag.replace(/ /g,"+");
var _30a="tagd_"+tag.replace(/ /g,"_");
_30a=_30a.toLowerCase();
if($(_30a)){
$(_30a).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _30b=$("nav_tags_edit");
var _30c="<a href=\"javascript:void delete_tag('"+_307+"','"+_308+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_30c+="<a id=\""+_30a+"\" href=\"/tag/"+_309+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_30c;
_30b.appendChild(item);
save_tag(_307,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_30d,tag){
if(!_30d||!tag){
return;
}
var _30e="tagd_"+tag.replace(/ /g,"_");
var _30f=$(_30e);
if(!_30f){
return;
}
var li=_30f.parentNode;
Element.remove(li);
save_tag(_30d,tag,true);
return false;
};
function save_tag(_310,tag,del){
var _311=(del)?1:0;
var req={a:_310,v:tag,d:_311};
var _312=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_312,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function fireOnReturn(_313,func){
Event.observe(_313,"keyup",function(_314){
_314=_314||window.event;
if(_314.which){
if(_314.which==Event.KEY_RETURN){
_314.preventDefault();
func();
}
}else{
if(_314.keyCode){
if(_314.keyCode==Event.KEY_RETURN){
Event.stop(_314);
func();
}
}
}
},false);
};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_315){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_315*100)+")";
}
ele.style.opacity=_315;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _316;
if(document.defaultView){
_316=document.defaultView.getComputedStyle(ele,"");
}else{
_316=ele.currentStyle;
}
return _316;
};
Element.cloneStyles=function(ele,_317,_318){
ele=$(ele);
_317=$(_317);
var _319=Element.getCurrentStyle(ele);
for(var name in _319){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _31a=_319[name];
if(_31a!==""&&!(_31a instanceof Object)&&name!="length"&&name!="parentRule"){
if(_318&&name.indexOf(_318)!==0){
continue;
}
_317.style[name]=_31a;
}
}
return _317;
};
Element.findElement=function(_31b,_31c){
_31b=$(_31b);
while(_31b.parentNode&&(!_31b.tagName||(_31b.tagName.toUpperCase()!=_31c.toUpperCase()))){
_31b=_31b.parentNode;
}
return _31b;
};
String.prototype.trim=function(){
var res=this;
while(res.substring(0,1)==" "){
res=res.substring(1,res.length);
}
while(res.substring(res.length-1,res.length)==" "){
res=res.substring(0,res.length-1);
}
return res;
};
String.prototype.startsWith=function(_31d){
var res=this;
return res.substring(0,_31d.length)==_31d;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _31e=p.innerHTML;
if(_31e.length>len){
_31e=_31e.substring(0,len);
_31e=_31e.replace(/\w+$/,"");
_31e+="...";
p.innerHTML=_31e;
}
}
};
Position.getViewportHeight=function(){
if(window.innerHeight!=window.undefined){
return window.innerHeight;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return window.undefined;
};
Position.getViewportWidth=function(){
if(window.innerWidth!=window.undefined){
return window.innerWidth;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientWidth;
}
if(document.body){
return document.body.clientWidth;
}
return window.undefined;
};
Position.getDocumentHeight=function(){
return document.documentElement.scrollHeight;
};
Position.getDocumentWidth=function(){
return document.documentElement.scrollWidth;
};
Position.getViewportScrollX=function(){
var _31f=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_31f=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_31f=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_31f=window.pageXOffset;
}else{
if(window.scrollX){
_31f=window.scrollX;
}
}
}
}
return _31f;
};
Position.getViewportScrollY=function(){
var _320=0;
if(document.documentElement&&document.documentElement.scrollTop){
_320=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_320=document.body.scrollTop;
}else{
if(window.pageYOffset){
_320=window.pageYOffset;
}else{
if(window.scrollY){
_320=window.scrollY;
}
}
}
}
return _320;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _321=jq(window).scrollTop();
var _322=_321+jq(window).height();
if(eleBot<_321){
return -1;
}
if(off.top>_322){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _323=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _324=[_323[0]+Position.getViewportWidth(),_323[1]+Position.getViewportHeight()];
return (_323[0]<off[0]&&off[0]<_324[0]&&_323[1]<off[1]&&off[1]<_324[1]);
};
Position.set=function(ele,_325){
if(ele&&_325){
ele.style.left=_325[0]+"px";
ele.style.top=_325[1]+"px";
}
};
function phone_verify_required(_326,_327,_328,_329){
if(typeof (_329)=="undefined"){
data={};
}else{
data={a:_329};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_326);
}else{
_327.apply(null,_328);
}
},"json");
};
function require_phone_verification(_32a,_32b){
url="/xml/verify/phone.php";
if(typeof (_32b)!="undefined"&&_32b){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_32a},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_32c,end){
for(var i=_32c;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_32c)+1;
}
update_plural(name);
};
function unselect_all(name,_32d,end){
for(var i=_32d;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=false;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=0;
}
update_plural(name);
};
function checkbox_onchange(name,num){
var disp=$(name+"_selected");
if(disp){
var ele=$(name+"_"+num);
if(ele.checked){
disp.innerHTML=parseInt(disp.innerHTML,10)+1;
update_plural(name);
}else{
disp.innerHTML=parseInt(disp.innerHTML,10)-1;
update_plural(name);
}
}
};
function update_plural(name){
var ele=document.getElementById(name+"_selected");
if(ele){
var disp=document.getElementById(name+"_plural");
if(disp){
if(parseInt(ele.innerHTML,10)==1){
disp.innerHTML=" is";
}else{
disp.innerHTML="s are";
}
}
}
};
function import_now(_32e,name,_32f,end){
var _330=self.opener.document.getElementById(_32e);
if(_330){
for(var i=_32f;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _331=$(name+"_email_"+i);
if(_330.value.length<2||_330.value.charAt(_330.value.length)==","||_330.value.charAt(_330.value.length-1)==","){
_330.value=_330.value+_331.innerHTML;
}else{
_330.value=_330.value+", "+_331.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_332,_333,max){
var _334=document.getElementById(_332);
var _335=document.getElementById(_333);
if(!_334){
alert("charCounter bad source: "+_332);
}
if(!_335){
alert("charCounter bad source: "+_333);
}
if(_334.value.length>max){
_334.value=_334.value.substring(0,max);
}
_335.value=max-_334.value.length;
};
function hideAnswers(){
$("hiddenAnswers").hide();
$("hideAnswers").hide();
$("showAnswers").show();
return false;
};
function showAnswers(){
$("hiddenAnswers").show();
$("hideAnswers").show();
$("showAnswers").hide();
return false;
};
function fetchAnswers(_336,_337,_338){
var _339=$H({answerIds:_336,enableVoting:_337,enableEditing:_338}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_339,onComplete:function(_33a){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_33b,v){
if(_33b===undefined){
_33b=true;
}
jq.post("/xml/answervote.php",{id:id,vote:v,timeIndicator:_33b});
return false;
};
function answerVoteDown(id,_33c){
return answerVote(id,_33c,-1);
};
function answerVoteUp(id,_33d){
return answerVote(id,_33d,1);
};
function getElementScreenTop(){
var _33e=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _33e;
};
function setElementScreenTop(top){
if(window.pageYOffset){
var x=window.pageXOffset;
window.scrollTo(x,top);
}else{
if(document.documentElement){
document.documentElement.scrollTop=top;
}else{
document.body.scrollTop=top;
}
}
};
function getElementTop(elem){
var top=0;
do{
top+=elem.offsetTop;
elem=elem.offsetParent;
}while(elem!=null);
return top;
};
function getElementLeft(elem){
var left=0;
do{
left+=elem.offsetLeft;
elem=elem.offsetParent;
}while(elem!=null);
return left;
};
var Timer=Class.create();
Timer.prototype={initialize:function(){
this.start();
},start:function(){
this.startTime=new Date();
},stop:function(){
this.stopTime=new Date();
this.length=(this.stopTime-this.startTime);
},inspect:function(){
if(!this.stopTime){
this.stop();
}
return "duration: "+this.length+"ms";
}};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_33f){
id=jQuery(_33f.target).attr("id");
id=id.replace("answer_delete_","");
jQuery.ajax({url:"/xml/delete_answer?id="+id,success:function(data){
jQuery("#"+id).html(data);
if(data=="Undelete Answer"){
jQuery("#answer"+id).css("opacity",0.4);
}else{
jQuery("#answer"+id).css("opacity",1);
}
jQuery("#answer"+id).effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function toggleRequestCommentEdit(id){
jq("#edit_rc_"+id).css("display","block");
};
function submitRequestCommentEdit(i){
var txt=jq("#edit_rc_"+i+" textarea").val();
if(txt==""){
var _340="#edit_rc_error_"+i;
jQuery(_340).html("You cannot submit an empty comment.");
}else{
jq.ajax({url:"/xml/request_comment_edit.php",type:"POST",data:{id:i,text:txt},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#edit_rc_error_"+i).html(data.msg);
jQuery("#edit_rc_error_"+i).show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jq("#rc_"+i).replaceWith(data.msg);
jq("#rc_"+i).effect("highlight",{color:"yellow"},1000);
}
}});
}
return false;
};
function supportRequestCommentDeletion(){
jQuery(".request_comment_delete").click(function(_341){
orig_id=jQuery(_341.target).attr("id");
id=orig_id.replace("rcd_","");
jQuery.ajax({url:"/xml/delete_request_comment?id="+id,success:function(data){
jQuery("#"+orig_id).html(data);
if(data=="Undelete Comment"){
jQuery("#"+orig_id).parent().css("opacity",0.4);
}else{
jQuery("#"+orig_id).parent().css("opacity",1);
}
jQuery("#"+orig_id).parent().effect("highlight",{color:"yellow"},1000);
}});
return false;
});
jQuery(".request_comment_notspam").click(function(_342){
orig_id=jQuery(_342.target).attr("id");
id=orig_id.replace("rcns_","");
jQuery.ajax({url:"/xml/request_comment_notspam?id="+id,success:function(data){
jQuery("#"+orig_id).html(data);
if(data=="Undelete Comment"){
jQuery("#"+orig_id).parent().css("opacity",0.4);
}else{
jQuery("#"+orig_id).parent().css("opacity",1);
}
jQuery("#"+orig_id).parent().effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function showAnswerCommentBox(id,_343){
if(jQuery(id).next().attr("id")=="answer_comment"&&jQuery("#answer_comment").css("display")=="block"){
jQuery("#answer_comment").css("display","none");
jQuery("input[name=\"commentSubmit\"]").unbind("click");
}else{
jQuery("#answer_comment").css("display","block");
jQuery("#answer_comment textarea").val("");
var form=jQuery("#answer_comment").detach();
jQuery(id).after(form);
var idx=id.substring(id.indexOf("_")+1);
jQuery("input[name=\"commentSubmit\"]").unbind("click");
jQuery("input[name=\"commentSubmit\"]").click(function(){
submitAnswerComment(idx);
return false;
});
}
jQuery("#rc_numcharsvalue").html(_343);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _344="#result_"+i;
var _345="#error_"+i;
var txt=jQuery("#answer_comment textarea").val();
if(txt==""){
jQuery("#rc_error").html("You cannot submit an empty comment");
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jQuery.ajax({url:"/xml/request_comment_submit.php",type:"POST",data:{id:i,text:txt},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#rc_error").html(data.msg);
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jQuery("#answer_comment").fadeOut("slow",function(){
jQuery("#answer_comment").prev().css("display","none");
jQuery(_344).append(data.msg);
var _346=jQuery(_344).children().last().attr("id");
jQuery(_344).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_346);
});
});
}
}});
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_347){
this.buffer.push(_347);
return this;
};
StringBuffer.prototype.toString=function toString(){
return this.buffer.join("");
};
function clickBestAnswer(rId,aId){
if(confirm("Are you sure that you want to select this as the best answer?  This cannot be undone.")){
jQuery.ajax({url:"/xml/select_best_answer.php",type:"POST",data:{request_id:rId,answer_id:aId},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#rc_error").html(data.msg);
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
var id="#answer"+aId;
jQuery(id).addClass("bestanswer");
jQuery(".bestanswerselector").hide();
}
}});
}
};
function hpFormHandler(_348){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_348);
this.errors=$H({});
this.method="post";
this.errorId="formErrors";
this.errorHeader="<strong>Please fix these errors before continuing:</strong><br/>";
this.useEffects=true;
this.individualerrors=false;
this.scrollToErrors=false;
this.ensureSignedInBeforeSave=false;
this.ensureSignedInOptions={};
this.ensureCheckedSecurity=false;
this.lastCheckedSecurity=new Date().getTime()-(1000*1000);
this.setValidators();
};
hpFormHandler.prototype.handleSubmitServerError=function(req){
};
hpFormHandler.prototype.validateHideDiv=function(id){
$(id).hide();
};
hpFormHandler.prototype.validateLengthMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(($F(ele).trim().length>max),ele,msg);
};
hpFormHandler.prototype.validateLengthMin=function(ele,min,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthMinTrim=function(ele,min,msg){
var val=$F(ele);
val=jQuery.trim(val);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthExactly=function(ele,len,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length!=len),ele,msg);
};
hpFormHandler.prototype.validateValueMin=function(ele,min,msg){
var val=$F(ele);
this.testForError(val<min,ele,msg);
};
hpFormHandler.prototype.validateValueMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(val>max,ele,msg);
};
hpFormHandler.prototype.validateMandatory=function(ele,msg){
var val=false;
if($F(ele)){
val=$F(ele).trim();
}
this.testForError((!val||val.length==0),ele,msg);
};
hpFormHandler.prototype.validateRadioChecked=function(ele,msg){
if(!ele.name){
return;
}
var _349=$$("input[name="+ele.name+"]");
var _34a=false;
_349.each(function(r){
if(r.checked==true){
_34a=true;
throw $break;
}
});
this.testForError(!_34a,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _34b=false;
if(val.length>=20){
var _34c=val.match(/\s+/g);
var _34d=_34c?_34c.length:0;
var _34e=_34d+1;
_34b=_34e/(val.length-_34d)<0.08;
}
this.testForError(_34b,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_34f,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_34f)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_350,msg){
var val=$F(ele);
this.testForError((val.search(_350)!=-1),ele,msg);
};
hpFormHandler.prototype.validateNoSpaces=function(ele,msg){
var val=$F(ele).trim();
this.testForError(val.search(/ /)!=-1,ele,msg);
};
hpFormHandler.prototype.validateNot=function(ele,not,msg){
this.testForError(($F(ele).trim()==not),ele,msg);
};
hpFormHandler.prototype.validateSameAs=function(ele,ele2,msg){
this.testForError(($F(ele)!=$F(ele2)),ele,msg);
};
hpFormHandler.prototype.validateNoWords=function(ele,_351,msg){
var val=$F(ele);
var _352=false;
for(i=0;i<_351.length&&!_352;i++){
var _353=new RegExp("[^a-zA-Z]"+_351[i]+"[^a-zA-Z]","i");
_352=(val.search(_353)>=0);
if(!_352){
_353=new RegExp("^"+_351[i]+"[^a-zA-Z]","i");
_352=(val.search(_353)>=0);
}
if(!_352){
_353=new RegExp("[^a-zA-Z]"+_351[i]+"$","i");
_352=(val.search(_353)>=0);
}
if(!_352){
_353=new RegExp("^"+_351[i]+"$","i");
_352=(val.search(_353)>=0);
}
}
this.testForError(_352,ele,msg);
};
hpFormHandler.prototype.validateServerCheck=function(ele,url,msg){
var val=$F(ele);
if(val.length==0){
return;
}
if(ele.lastGoodValue&&ele.lastGoodValue==val){
return;
}
val=encodeURIComponent(val);
var _354=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
eval(req.responseText);
if(!valid&&typeof msg=="object"){
if(typeof errorCode!="undefined"&&typeof msg[errorCode]!="undefined"){
msg=msg[errorCode];
}else{
msg=msg[0];
}
}
this.testForError(!valid,ele,msg);
if(valid){
ele.lastGoodValue=val;
}
this._showErrors();
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:reportError});
};
hpFormHandler.prototype.checkAnsweredSecurityQuestionBeforeSave=function(){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
this.lastCheckedSecurity=new Date().getTime();
this._showErrors();
}else{
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _355=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
return;
}
this.form.submit();
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function validateCheckedSecurityAndSubmit(form,fn,args){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
}else{
if(typeof (fn)=="function"){
fn.apply(form,args);
}else{
form.submit();
}
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function showAskSecurityQuestion(){
var aEl=jq("<a class=\"iframe\" href=\"/my/profile/security_ask_iframe.php\" style=\"display:none\">This goes to iframe</a>");
jq("#container").append(aEl);
jq(".iframe").fancybox({"hideOnContentClick":false,"hideOnOverlayClick":false,"enableEscapeButton":false,"showCloseButton":false,"width":750,"height":170,"scrolling":"no"});
jq(".iframe").click();
};
hpFormHandler.prototype.validateEmailList=function(ele){
var _356=800;
var _357=6;
this.validateLengthMin(ele,_357,"The address you entered is too short. Please use an address at least "+_357+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _358=200;
this.validateLengthMax(ele,_358,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _359=2;
var _35a=200;
this.validateLengthMin(ele,_359,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_35a,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _35b=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_35b=true;
}
this.testForError(!_35b,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _35c=40;
var _35d=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_35d,"Your password is too short.  Protect your account by choosing a password that is at least  "+_35d+" characters long.  Safety first!");
this.validateLengthMax(ele1,_35c,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _35e=60;
var _35f=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_35e,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_360){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_360.detect(function(name){
return ($F(ele)==name);
});
this.testForError(existingName,ele,"You already have a group with this name.  Please select it from the list, or enter a new name.");
};
hpFormHandler.prototype.observe=function(){
new Form.EventObserver(this.form,this._elemsChanged.bind(this));
};
hpFormHandler.prototype.focusFirst=function(){
Form.focusFirstElement(this.form);
};
hpFormHandler.prototype.tabOnEnter=function(){
hpFormHandler.tabOnEnter(this.form);
};
hpFormHandler.tabOnEnter=function(form){
if(!$(form)){
return;
}
var _361=$A($(form).getElementsByTagName("input"));
_361.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_362,_363,_364){
if($(_362)&&$(_363)){
var gw=new GhostWatcher(_362,_363,_364);
}
};
hpFormHandler.prototype.setValidators=function(_365,_366){
this.toValidate=$H(_365);
this.toValidateOnsubmit=$H(_366);
};
hpFormHandler.prototype.hasErrors=function(){
return (this.errors&&this.errors.keys()&&this.errors.keys().length>0);
};
hpFormHandler.prototype.cancel=function(){
this.reset();
};
hpFormHandler.prototype.reset=function(){
Form.reset(this.form);
if(this.cancelUri){
location.href=this.cancelUri;
}
};
hpFormHandler.prototype.valid=function(){
this._runValidators(true);
if(this.hasErrors()){
return false;
}
return true;
};
hpFormHandler.prototype.save=function(_367){
if(this.ensureSignedInBeforeSave&&!_367){
whenSignedIn(this.ensureSignedInOptions,this.save.bind(this,true));
return false;
}
this.form.descendants().each(function(elt){
if(elt&&elt.tagName&&elt.hasClassName&&(elt.tagName=="TEXTAREA"||elt.tagName=="INPUT")&&elt.hasClassName("dimmed")){
elt.value="";
}
});
this._runValidators(true);
if(this.hasErrors()){
if(this.scrollToErrors){
var _368=new fx.Scroll({duration:100});
_368.scrollTo(this.errorDiv);
}
return false;
}
if((this.ensureCheckedSecurity)&&(new Date().getTime()-this.lastCheckedSecurity>1000*15)){
this.checkAnsweredSecurityQuestionBeforeSave();
return false;
}
if(window.tinyMCE&&tinyMCE.triggerSave){
try{
tinyMCE.triggerSave(false,true);
}
catch(e){
}
}
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _369=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
}
return (this.submitMode);
};
hpFormHandler.prototype.handleResponse=function(req){
if(!this.skipValidationOfResponse){
eval(req.responseText);
}
if(this.skipValidationOfResponse||valid==1){
if(this.saveCallback){
this.saveCallback(req);
}
if(this.nextUri){
location.href=this.nextUri;
}
return true;
}else{
this.handleSubmitServerError(req);
return false;
}
};
hpFormHandler.prototype.testForError=function(_36a,ele,msg){
if(_36a){
this.errors.set(ele.id,msg);
}else{
if(this.errors.get(ele.id)){
if(typeof msg=="object"){
for(idx in msg){
if(this.errors.get(ele.id)==msg[idx]){
this.errors.unset(ele.id);
}
}
}else{
if(this.errors.get(ele.id)==msg){
this.errors.unset(ele.id);
}
}
}
}
};
hpFormHandler.prototype._elemsChanged=function(ele){
this._runValidators(false);
};
hpFormHandler.prototype._runValidators=function(_36b){
var _36c=Form.getElements(this.form);
var _36d=$A(_36c);
_36d.each(function(node){
if(_36b){
var _36e=this.toValidateOnsubmit.get(node.id);
if(!_36e){
_36e=this.toValidateOnsubmit.get(node.className);
}
if(_36e){
_36e(node);
}
}
var _36e=this.toValidate.get(node.id);
if(!_36e){
_36e=this.toValidate.get(node.className);
}
if(_36e){
_36e(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _36f="";
if(json.status=="error"){
var _370=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_36f+=" - "+json.errors[key][i]+"\n";
}
_370++;
}
}
if(_370>0){
var _371=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_371+=_36f+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_371);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _372=new fx.Scroll({duration:300});
_372.scrollTo("changesSaved");
$("changesSaved").show();
}else{
alert("An unknown error has occured.  Please try saving again.  If the problem persists, contact team@hubpages.com");
}
}
};
hpFormHandler.prototype._showErrors=function(){
if(this.individualerrors){
this._showErrorsPerField();
}else{
this._showErrorsOneDiv();
}
};
hpFormHandler.prototype._showErrorsOneDiv=function(){
if(!this.errorDiv&&!$(this.errorId)){
new Insertion.Top(this.form,"<div id=\""+this.errorId+"\"></div>");
}
if(!this.errorDiv){
this.errorDiv=$(this.errorId);
}
if(this.useEffects&&!this.errFade){
this.errFade=new fx.Opacity(this.errorDiv,{duration:500});
this.errFade.now=0;
}
if(!this.hasErrors()){
if(this.lit){
if(this.useEffects){
this.errFade.toggle();
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
if($("nextB")){
$("nextB").src="http://x.hubpages.com/x/next.gif";
}
this.lit=false;
}
return;
}
var _373=this.errorHeader;
_373+="<ul>";
this.errors.each(function(err){
_373+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_373+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_373;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _374=$(err.key);
var _375=err.key+"_error";
var _376=$(_375);
if(_376){
_376.innerHTML=err.value;
_376.className="alert";
_376.show();
}else{
new Insertion.Top(_374.parentNode,"<div id=\""+_375+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_374,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _377=typeof this.errors.get(targetId)=="undefined";
if(_377){
if($(targetId+"_error")){
$(targetId+"_error").hide();
}
hpFormHandler.lightEle(ele,false);
}
}.bind(this));
this.lit=true;
}else{
if(this.lit){
if(this.useEffects){
var eles=this.form.select(".alert");
eles.each(function(ele){
ele.hide();
});
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
this.lit=false;
}
}
};
function _handleInputKeypress(_378){
_378=_378||window.event;
if(_378.which){
if(_378.which==Event.KEY_RETURN){
var _379=document.createEvent("KeyboardEvent");
_379.initKeyEvent("keydown",true,true,document.defaultView,_378.ctrlKey,_378.altKey,_378.shiftKey,_378.metaKey,Event.KEY_TAB,0);
_378.preventDefault();
_378.target.dispatchEvent(_379);
}
}else{
if(_378.keyCode){
if(_378.keyCode==Event.KEY_RETURN){
_378.keyCode=Event.KEY_TAB;
}
}
}
return true;
};
hpFormHandler.lightEle=function(ele,on){
ele=$(ele);
if(!ele){
return;
}
if(on){
Element.addClassName(ele,"alertBorder");
}else{
Element.removeClassName(ele,"alertBorder");
}
};
var GhostWatcher=Class.create();
GhostWatcher.prototype={initialize:function(_37a,_37b,_37c){
this.fromEle=$(_37a);
this.toEle=$(_37b);
this.copyFunction=(_37c!=null)?_37c:this.copyValue;
if(this.fromEle&&this.toEle){
Event.observe(this.fromEle,"keyup",this.copyFunction.bind(this),false);
}
Event.observe(window,"focus",this.copyFunction.bind(this),false);
Event.observe(window,"load",this.copyFunction.bind(this),false);
},copyValue:function(evt){
var text=$F(this.fromEle);
this.toEle.innerHTML=text.stripTags();
},recopy:function(){
this.copyFunction();
}};
function growTextArea(elt,_37d,_37e,_37f){
var rows=Math.ceil($F(elt).length/_37d)+1;
var _380=rows*_37e;
_380=Math.max(_380,_37f);
elt.setStyle({height:_380+"px"});
};
function makeGrowable(id,_381,_382,_383){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_381,_382,_383);
});
};
function makeExpandable(id,_384,_385,_386,_387,_388){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_384);
var _388=(_388===undefined)?"expanded":_388;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_388)){
anc.addClass(_388);
if(typeof (_387)=="function"){
_387.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_385)=="function"){
_385.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_386){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_384);
});
};
function categorySearch(_389){
jq("#"+_389+"SearchResults").load("/xml/categorysearch.php",{uniqueId:_389,searchText:jq("#"+_389+"SearchText").val()});
};
(function($){
var _38a=function(){
this.children("select").change(function(_38b){
var _38c=jq(_38b.target);
_38c.parent().hpCategorySelector("chooseCategory",_38c.val());
});
};
var _38d={init:function(_38e){
var _38f=$.extend({userId:0,valueId:"#categoryId",data:{}},_38e);
this.data("settings",_38f);
_38a.apply(this);
return this;
},chooseCategory:function(_390){
return this.each(function(_391,elt){
var _392=jq(elt);
var _393=_392.data("settings");
var _394=_392.attr("id");
var _395=$.extend({categoryId:_390,id:_394},_393.data);
jq.post("/xml/categoryselector.php",_395,function(rsp){
var data=jq.parseJSON(rsp);
_392.html(data.render);
_38a.apply(_392);
_392.find("select").first().focus();
$(_393.valueId).val(_390);
_392.trigger("categoryChange.hpCategorySelector",data);
});
});
},refresh:function(){
return this.each(function(_396,elt){
var _397=jq(elt);
_397.hpCategorySelector("chooseCategory",_397.hpCategorySelector("getValue"));
});
},getValue:function(){
var _398=this.data("settings");
return $(_398.valueId).val();
},destroy:function(){
}};
$.fn.hpCategorySelector=function(_399){
if(_38d[_399]){
return _38d[_399].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _399==="object"||!_399){
return _38d.init.apply(this,arguments);
}else{
$.error("Method "+_399+" does not exist on jQuery.hpCategorySelector");
}
}
};
})(jQuery);
(function($){
var _39a=function(){
this.children("select").change(function(_39b){
var _39c=jq(_39b.target);
_39c.parent().hpForumSelector("chooseForum",_39c.val(),_39c.prevAll("select").size()>0);
});
};
var _39d={init:function(_39e){
var _39f=$.extend({userId:0,data:{},id:"admin"},_39e);
this.data("settings",_39f);
_39a.apply(this);
return this;
},chooseForum:function(_3a0,_3a1){
var _3a2=0,data={};
if(/fave/.test(_3a0)){
data["categoryId"]=_3a0.substring(5);
_3a2=data["categoryId"];
}else{
if(_3a1){
data["categoryId"]=_3a0;
}else{
data["forumId"]=_3a0;
}
}
return this.each(function(_3a3,elt){
var _3a4=jq(elt);
var _3a5=_3a4.data("settings");
var _3a6=_3a4.attr("id");
var _3a7=$.extend(data,_3a5.data);
_3a7["id"]=_3a5.id;
jq.post("/xml/forumselector.php",_3a7,function(rsp){
_3a4.html(rsp);
_39a.apply(_3a4);
$("#"+_3a5.id+"_category_id").val(_3a2);
});
});
},getValue:function(){
var _3a8=this.data("settings");
return $(_3a8.valueId).val();
},destroy:function(){
}};
$.fn.hpForumSelector=function(_3a9){
if(_39d[_3a9]){
return _39d[_3a9].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _3a9==="object"||!_3a9){
return _39d.init.apply(this,arguments);
}else{
$.error("Method "+_3a9+" does not exist on jQuery.hpForumSelector");
}
}
};
})(jQuery);
function addEvent(_3aa,type,_3ab){
if(!_3ab.$$guid){
_3ab.$$guid=addEvent.guid++;
}
if(!_3aa.events){
_3aa.events={};
}
var _3ac=_3aa.events[type];
if(!_3ac){
_3ac=_3aa.events[type]={};
if(_3aa["on"+type]){
_3ac[0]=_3aa["on"+type];
}
}
_3ac[_3ab.$$guid]=_3ab;
_3aa["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_3ad,type,_3ae){
if(_3ad.events&&_3ad.events[type]){
delete _3ad.events[type][_3ae.$$guid];
}
};
function handleEvent(_3af){
var _3b0=true;
_3af=_3af||fixEvent(window.event);
if(_3af==null){
return false;
}
if(this.events==null){
return false;
}
var _3b1=this.events[_3af.type];
for(var i in _3b1){
this.$$handleEvent=_3b1[i];
if(this.$$handleEvent(_3af)===false){
_3b0=false;
}
}
return _3b0;
};
function fixEvent(_3b2){
if(_3b2!=null){
_3b2.preventDefault=fixEvent.preventDefault;
_3b2.stopPropagation=fixEvent.stopPropagation;
}
return _3b2;
};
fixEvent.preventDefault=function(){
this.returnValue=false;
};
fixEvent.stopPropagation=function(){
this.cancelBubble=true;
};
function getEventTarget(e){
var targ;
if(!e){
e=window.event;
}
if(e.target){
targ=e.target;
}else{
if(e.srcElement){
targ=e.srcElement;
}
}
if(targ.nodeType==3){
targ=targ.parentNode;
}
return targ;
};
var css={getElementsByClass:function(node,_3b3,tag){
var _3b4=new Array();
var els=node.getElementsByTagName(tag);
var _3b5=els.length;
var _3b6=new RegExp("(^|\\s)"+_3b3+"(\\s|$)");
for(var i=0,j=0;i<_3b5;i++){
if(this.elementHasClass(els[i],_3b3)){
_3b4[j]=els[i];
j++;
}
}
return _3b4;
},elementHasClass:function(el,_3b7){
if(!el){
return false;
}
var _3b8=new RegExp("\\b"+_3b7+"\\b");
if(el.className.match(_3b8)){
return true;
}
return false;
}};
var standardistaTableSorting={that:false,sortColumnIndex:-1,lastAssignedId:0,newRows:-1,lastSortedTable:-1,init:function(){
if(!document.getElementsByTagName){
return;
}
this.that=this;
this.run();
},run:function(){
var _3b9=document.getElementsByTagName("table");
for(var i=0;i<_3b9.length;i++){
var _3ba=_3b9[i];
if(css.elementHasClass(_3ba,"sortable")){
this.makeSortable(_3ba);
}
}
},makeSortable:function(_3bb){
if(!_3bb.id){
_3bb.id="sortableTable"+this.lastAssignedId++;
}
if(!_3bb.tHead||!_3bb.tHead.rows||0==_3bb.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_3bb.tHead.rows.length;i++){
if(css.elementHasClass(_3bb.tHead.rows[i],"sort_control_buttons")){
row=_3bb.tHead.rows[i];
break;
}
}
if(row==null){
row=_3bb.tHead.rows[_3bb.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _3bc=row.cells[i].firstChild;
_3bc.onclick=this.headingClicked;
_3bc.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _3bd=getEventTarget(e);
var td=_3bd.parentNode;
var tr=td.parentNode;
var _3be=tr.parentNode;
var _3bf=_3be.parentNode;
if(!_3bf.tBodies||_3bf.tBodies[0].rows.length<=1){
return false;
}
var _3c0=_3bd.getAttribute("columnId")||td.cellIndex;
var _3c1=css.getElementsByClass(td,"tableSortArrow","span");
var _3c2="";
if(_3c1.length>0){
_3c2=_3c1[0].getAttribute("sortOrder");
}
var itm="";
var _3c3=0;
while(""==itm&&_3c3<_3bf.tBodies[0].rows.length){
var elm=_3bf.tBodies[0].rows[_3c3].cells[_3c0];
if(elm.childNodes.length==1){
itm=that.getInnerText(_3bf.tBodies[0].rows[_3c3].cells[_3c0]);
}else{
itm=that.getInnerText(_3bf.tBodies[0].rows[_3c3].cells[_3c0].firstChild);
}
_3c3++;
}
var _3c4=that.determineSortFunction(itm);
var _3c5;
if(_3bf.id==that.lastSortedTable&&_3c0==that.sortColumnIndex){
_3c5=that.newRows;
_3c5.reverse();
}else{
that.sortColumnIndex=_3c0;
_3c5=new Array();
for(var j=0;j<_3bf.tBodies[0].rows.length;j++){
_3c5[j]=_3bf.tBodies[0].rows[j];
}
_3c5.sort(_3c4);
}
that.moveRows(_3bf,_3c5);
that.newRows=_3c5;
that.lastSortedTable=_3bf.id;
var _3c1=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_3c1.length;j++){
if(j==_3c0){
if(null==_3c2||""==_3c2||"DESC"==_3c2){
_3c1[j].innerHTML="▼";
_3c1[j].setAttribute("sortOrder","ASC");
}else{
_3c1[j].innerHTML="▲";
_3c1[j].setAttribute("sortOrder","DESC");
}
}else{
_3c1[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_3bf.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_3bf.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_3bf.tBodies[0].rows.length;i++){
tr=_3bf.tBodies[0].rows[i];
if(i%2==0){
if(!Element.hasClassName(tr,"oddRow")){
Element.addClassName(tr,"oddRow");
}
if(Element.hasClassName(tr,"evenRow")){
Element.removeClassName(tr,"evenRow");
}
}else{
if(!Element.hasClassName(tr,"evenRow")){
Element.addClassName(tr,"evenRow");
}
if(Element.hasClassName(tr,"oddRow")){
Element.removeClassName(tr,"oddRow");
}
}
}
}
return false;
},headingClicked:function(e){
var that=standardistaTableSorting.that;
that.sortTheTable(e);
return false;
},getInnerText:function(el){
if("string"==typeof el||"undefined"==typeof el){
return el;
}
if(null==el){
return "";
}
if(el.innerText){
return el.innerText;
}
if(el.nodeType&&el.nodeType==3){
return jq(el).text();
}
var str=el.getAttribute("standardistaTableSortingInnerText");
if(null!=str&&""!=str){
return str;
}
str="";
var cs=el.childNodes;
var l=cs.length;
for(var i=0;i<l;i++){
if(1==cs[i].nodeType){
str+=this.getInnerText(cs[i]);
break;
}else{
if(3==cs[i].nodeType){
str+=cs[i].nodeValue;
break;
}
}
}
el.setAttribute("standardistaTableSortingInnerText",str);
return str;
},determineSortFunction:function(itm){
var _3c6=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_3c6=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_3c6=this.sortDate;
}
if(itm.match(/^[�$]/)){
_3c6=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_3c6=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_3c6=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_3c6=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_3c6=this.sortIP;
}
return _3c6;
},sortCaseInsensitive:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase();
var bb=that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase();
if(aa==bb){
return 0;
}else{
if(aa<bb){
return -1;
}else{
return 1;
}
}
},sortDate:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]);
var bb=that.getInnerText(b.cells[that.sortColumnIndex]);
var dt1,dt2,yr=-1;
if(aa.length==10){
dt1=aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
}else{
yr=aa.substr(6,2);
if(parseInt(yr)<50){
yr="20"+yr;
}else{
yr="19"+yr;
}
dt1=yr+aa.substr(3,2)+aa.substr(0,2);
}
if(bb.length==10){
dt2=bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
}else{
yr=bb.substr(6,2);
if(parseInt(yr)<50){
yr="20"+yr;
}else{
yr="19"+yr;
}
dt2=yr+bb.substr(3,2)+bb.substr(0,2);
}
if(dt1==dt2){
return 0;
}else{
if(dt1<dt2){
return -1;
}
}
return 1;
},sortCurrency:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]).replace(/[^0-9.]/g,"");
var bb=that.getInnerText(b.cells[that.sortColumnIndex]).replace(/[^0-9.]/g,"");
return parseFloat(aa)-parseFloat(bb);
},sortNumeric:function(a,b){
var that=standardistaTableSorting.that;
var _3c7=a.cells[that.sortColumnIndex];
if(_3c7.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _3c8=b.cells[that.sortColumnIndex];
if(_3c8.childNodes.length>1){
var bb=parseFloat(that.getInnerText(b.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
bb=parseFloat(that.getInnerText(b.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(bb)){
bb=0;
}
return aa-bb;
},makeStandardIPAddress:function(val){
var vals=val.split(".");
for(x in vals){
val=vals[x];
while(3>val.length){
val="0"+val;
}
vals[x]=val;
}
val=vals.join(".");
return val;
},sortIP:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.makeStandardIPAddress(that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase());
var bb=that.makeStandardIPAddress(that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase());
if(aa==bb){
return 0;
}else{
if(aa<bb){
return -1;
}else{
return 1;
}
}
},moveRows:function(_3c9,_3ca){
for(var i=0;i<_3ca.length;i++){
var _3cb=_3ca[i];
_3c9.tBodies[0].appendChild(_3cb);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_3cc,_3cd,_3ce){
this.modId=_3cc;
this.pollId=_3cd;
this.results_div_id=_3cc+"_poll_results";
this.vote_form_id=_3cc+"_vote_form";
this.vote_radio_name=_3cc+"_vote";
this.hubnugget=_3ce;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _3cf=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_3cf,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _3d0=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_3d1){
return _3d1.checked;
});
if(null==_3d0){
return;
}else{
vote=_3d0.value;
}
var _3d2=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_3d2,onFailure:reportError,onComplete:function(){
}});
}};
var PollManagerManager=Class.create();
PollManagerManager.prototype={initialize:function(){
this.pollManagers=[];
},add:function(id,pm){
this.pollManagers[id]=pm;
},getById:function(id){
return this.pollManagers[id];
}};
var pmm=new PollManagerManager();
var ContentRotator=Class.create();
ContentRotator.prototype={initialize:function(ids,_3d3,_3d4,_3d5,_3d6,_3d7,_3d8,_3d9,_3da,loop,_3db){
this.ids=ids;
this.prefix=_3d3;
this.interval=_3d4;
this.position=0;
this.paused=false;
this.transitionEffect=_3d5;
this.transitioning=false;
this.updateFunction=null;
if(_3db!==undefined&&jq(_3db).length>0){
this.navButtons=jq(_3db);
this.firstButton=this.navButtons.find("li").first();
this.firstButton.find("a").addClass("active");
this.renderNavButtons.bind(this);
this.renderNavButtons();
}
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_3d6){
this.playId=_3d6;
}
if(_3d7){
this.pauseId=_3d7;
}
if(_3d8){
this.positionIndicatorId=_3d8;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_3d9){
this.prevId=_3d9;
}
if(_3da){
this.nextId=_3da;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},renderNavButtons:function(){
var _3dc=this.firstButton,_3dd=_3dc.find("a"),self=this,_3de=this.position;
_3dd.data("position",_3de);
_3dd.click(function(e){
e.preventDefault();
self.seek(jq(this).data("position"));
});
for(var i=1,l=this.ids.length;i<l;i++){
var _3df=_3dc.clone(true),_3e0=++_3de,_3e1=_3df.find("a");
_3e1.attr("id","button_"+_3e0);
_3e1.removeClass("active");
_3e1.data("position",_3e0);
self.navButtons.append(_3df);
}
},update:function(_3e2){
if(this.paused||this.activeUpdateThreadId!=_3e2){
return;
}
this.next();
this.updateFunction=setTimeout(this.update.bind(this,_3e2),this.interval);
},pause:function(){
if($(this.pauseId)){
$(this.pauseId).hide();
}
if($(this.playId)){
$(this.playId).show();
}
this.paused=true;
},play:function(){
if($(this.pauseId)){
$(this.pauseId).show();
}
if($(this.playId)){
$(this.playId).hide();
}
this.paused=false;
this.activeUpdateThreadId++;
this.update(this.activeUpdateThreadId);
},endTransition:function(){
this.transitioning=false;
},seek:function(_3e3){
var next=this.position<_3e3,_3e4=_3e3%this.ids.length;
while(_3e4<0){
_3e4+=this.ids.length;
}
if(this.position==_3e4){
return;
}
if(this.positionIndicatorId){
$(this.positionIndicatorId+"_"+this.position).removeClassName("active");
}
if(this.transitionEffect>0){
if(this.transitioning){
if(next){
setTimeout(this.next.bind(this),400);
}else{
setTimeout(this.previous.bind(this),400);
}
return;
}
this.transitioning=true;
var _3e5=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_3e5.toggle();
this.position=_3e4;
if(this.fadeTransition){
var _3e6=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _3e6=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_3e6.options.onComplete=this.endTransition.bind(this);
_3e6.hide();
_3e6.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=_3e4;
$(this.prefix+this.ids[this.position]).show();
}
if(this.positionIndicatorId){
$(this.positionIndicatorId+"_"+this.position).addClassName("active");
}
if(!this.loop){
$(this.nextId).removeClassName("disabled");
$(this.prevId).removeClassName("disabled");
if(this.position==this.ids.length-1){
$(this.nextId).addClassName("disabled");
}
if(this.position==0){
$(this.prevId).addClassName("disabled");
}
}
this.selectCurrentButton(_3e3);
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
},selectCurrentButton:function(_3e7){
if(this.navButtons){
clearTimeout(this.updateFunction);
if(this.interval>0){
this.updateFunction=setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
this.navButtons.find("a[id^=button]").removeClass("active");
jq("#button_"+(_3e7%this.ids.length)).addClass("active");
}
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_3e8,_3e9,_3ea,_3eb,_3ec){
this.typeId=_3e8;
this.categoryId=_3e9;
this.userId=_3ec;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_3eb;
this.updateTime=_3ea;
this.originalUpdateTime=_3ea;
this.currentTime=parseInt(_3ea,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_3ed){
_3ed.preventDefault();
jq(this).closest(".options").prevAll(".feed_interact").show();
return false;
});
if(!this.standalone){
Event.observe(window,"load",function(){
if(browser=="IE"&&version<=6){
$("old_browser").show();
}
this.updateFeedTypeFilters();
$$("#sidebar .cat").each(function(elt){
if(elt.hasClassName("disabled")){
return;
}
elt.observe("mouseover",function(){
elt.addClassName("active_category");
elt.down(".delete_category").show();
});
elt.observe("mouseout",function(){
elt.removeClassName("active_category");
elt.down(".delete_category").hide();
});
});
this.newStoriesAvailable=0;
this.updaterFibonacciValue=60000;
this.updaterFibonacciValue2=60000;
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this));
}
setInterval(this.updateTimes.bind(this),60000);
},updateTimes:function(){
this.currentTime+=60;
$$(".timestamp").each(function(elt){
var _3ee=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_3ee=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_3ee);
}.bind(this));
},getTimeAgo:function(_3ef){
if(_3ef<=1){
return "1 second ago";
}
var _3f0=Math.round(_3ef/60);
var _3f1=Math.round(_3ef/3600);
var days=Math.round(_3ef/86400);
var _3f2=Math.round(_3ef/604800);
var _3f3=Math.round(_3ef/2592000);
var _3f4=Math.round(_3ef/31536000);
var ret="";
if(_3f4>=2){
ret=_3f4+" years ago";
}else{
if(_3f3>=2){
ret=_3f3+" months ago";
}else{
if(_3f2>=2){
ret=_3f2+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_3f1>=2){
ret=_3f1+" hours ago";
}else{
if(_3f0>=1){
ret=_3f0+" minute"+(_3f0==1?"":"s")+" ago";
}else{
ret=_3ef+" second"+(_3ef==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _3f5=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_3f5;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _3f6=parseInt(req.responseText,10);
if(_3f6>0){
this.newStoriesAvailable=_3f6;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _3f7=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_3f7+" "+is+" available (click to load)";
},loadNewStories:function(_3f8){
var nt=_3f8?_3f8:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _3f9=$(document.createElement("div"));
_3f9.addClassName("feed_item");
_3f9.innerHTML=data["render"];
var _3fa=$("feed_box").down(".feed_item",0);
_3fa.parentNode.insertBefore(_3f9,_3fa);
_3f9.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
eval(elt.innerHTML);
}
});
this.addItems(data["feedData"]);
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
this.updaterFibonacciValue=30000;
this.updaterFibonacciValue2=30000;
this.newStoriesAvailable=0;
this.updateStoriesAvailable();
$("loading_feed").hide();
}.bind(this)});
return false;
},userFanJoin:function(u){
$("loading_feed").show();
new Ajax.Request("/xml/fan.php",{parameters:"u="+u+"&action=add",onComplete:function(req){
var info=JSONstring.toObject(req.responseText);
$("loading_feed").hide();
var _3fb=$(document.createElement("div"));
_3fb.addClassName("feed_item");
_3fb.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _3fc=$("feed_box").down(".feed_item",0);
_3fc.parentNode.insertBefore(_3fb,_3fc);
var li=$("suggested_author_"+u);
var ul=li.up("ul");
li.remove();
if(ul.immediateDescendants().size()==0){
new Ajax.Updater("suggested_author_box","/xml/fan.php",{parameters:"action=suggest&c="+this.categoryId});
}
}.bind(this)});
return false;
},categoryFanJoin:function(){
categoryFanBulkJoin("feed_category_fans",false,false,true,this.categoryFanCallback.bind(this));
$("loading_feed").show();
$("category_fan_search").innerHTML="";
$("category_fan_search_text").value="";
return false;
},categoryFanCallback:function(rsp){
var info=JSONstring.toObject(rsp);
if(info.length>0){
if(this.categoryId||this.typeId){
$("loading_feed").hide();
$A(info).each(function(data){
var _3fd=$(document.createElement("div"));
_3fd.addClassName("feed_item");
_3fd.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _3fe=$("feed_box").down(".feed_item",0);
_3fe.parentNode.insertBefore(_3fd,_3fe);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _3ff=$(document.createElement("div"));
_3ff.addClassName("feed_item");
_3ff.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _400=$("feed_box").down(".feed_item",0);
_400.parentNode.insertBefore(_3ff,_400);
return;
}
var _401=$("category_filters");
if(!_401){
var _402=$(document.createElement("div"));
_402.addClassName("feed_setting_box");
_402.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_402);
var _401=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_401.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_403,type,id){
new Ajax.Updater(_403,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_404,_405,_406){
makeGrowable(id,_404,_405,_406);
},makeExpandable:function(id,_407,_408,_409,_40a){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_407,_408,_409,null,_40a);
return;
}
elt.addClass("expandable_text dimmed").val(_407).data("hasFocus",false);
function _40b(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_40c,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _40d(){
if(_40b()){
if(!_409){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_407);
}
};
elt.bind("focus",function(){
if(!anc.hasClass("expanded")){
anc.addClass("expanded");
updateFollowCheckbox.apply(this);
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_408)=="function"){
_408.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_40d();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_40d();
});
},addItems:function(feed){
feed.each(function(item){
var fi=new FeedItemManager(item["id"],item["fid"],item["date"],item["hidden"],this);
this.feedItems[item["id"]]=fi;
this.feedItemCollection.push(fi);
if(!item["temporary"]){
if(item["hidden"]){
this.hiddenCount++;
}else{
if(!this.standalone){
fi.hideMenuObserve();
}
}
}
}.bind(this));
if(!this.standalone){
this.updateHiddenLink();
}
},addHandler:function(name,h){
h.ensureSignedInBeforeSave=true;
this.handlers[name]=h;
},getHandler:function(name){
return this.handlers[name];
},saveForm:function(_40e){
this.getHandler(_40e).save();
return false;
},addStoryToTop:function(_40f,id,_410){
var _411=$(document.createElement("div"));
_411.innerHTML=_40f;
_411.addClassName("feed_item");
var _412=$("feed_box").down(".feed_item",0);
_412.parentNode.insertBefore(_411,_412);
_411.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _413=new fx.Color(_411,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_410?_410:function(){
})});
_413.toggle();
updateFollowButtons();
},shrinkStatus:function(){
photoGalleryInserter.instance().close();
var s=$("status");
s.value="What's on your mind?";
s.addClassName("dimmed");
$$("#status_update input[type=checkbox]")[0].checked=false;
$$("#status_update .photo_preview")[0].innerHTML="";
$$("#status_update input[name=imageId]")[0].value=0;
$("status_wrapper").removeClassName("expanded");
var _414=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_414.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _415=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
jq("#category").hpCategorySelector("chooseCategory",0);
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _416=$("question");
_416.value="What is your question?";
_416.setStyle({"color":"#777"});
$("q_numcharsvalue").innerHTML=100;
$("ad_numcharsvalue").innerHTML=600;
$("question_counter").hide();
$$(".feed #question_label")[0].hide();
$("requestSuggestions").hide();
$("confirmquestion").hide();
$("requestSuggestionsButton").show();
$("question_details").hide();
selectTab("categoryTabs",1,2);
subFlg=false;
$("question_wrapper").setStyle({height:"auto"});
$$("#question_details input[type=checkbox]")[0].checked=false;
$$("#question_details .photo_preview")[0].innerHTML="";
$$("#question_details input[name=imageId]")[0].value=0;
}});
_415.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _417=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _418=$("subject");
var _419=$("message");
_418.setStyle({"color":"#777"});
_418.value="What is the subject of your forum post?";
_419.value="";
jq("#feed_forum_selector").hpForumSelector("chooseForum",0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_417.toggle();
},forumCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
fm.addStoryToTop(data["render"],data["id"],this.forumShrink.bind(this));
}else{
if(data["msg"]){
$("forum_msg").innerHTML=data["msg"];
}
}
},statusCallback:function(req){
var data=JSONstring.toObject(req.responseText);
sId=data["id"].substring(7);
linkId="delete_status_"+sId;
removeHtml="<a href=\"#\" id=\""+linkId+"\" title=\"delete this status update\">[delete]</a>";
fm.addStoryToTop(data["render"]+removeHtml,data["id"],this.shrinkStatus.bind(this));
jq("#"+linkId).click(deleteStatus);
},questionCallback:function(req){
var data=JSONstring.toObject(req.responseText);
this.addStoryToTop(data["render"],data["id"],this.shrinkQuestion.bind(this,data));
},moreFeed:function(_41a){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_41a,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _41b=JSONstring.toObject(req.responseText);
var _41c=$("show_more");
_41c.style.display="none";
_41c.id="";
var _41d=$(document.createElement("div"));
$("feed_box").appendChild(_41d);
_41d.innerHTML=_41b["render"];
var _41e=$("feed_more_"+_41a);
$$("#feed_more_"+_41a+" script").each(function(_41f){
safeScriptEval(_41f);
});
this.addItems(_41b["feed"]);
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}.bind(this)});
return false;
},updateHiddenLink:function(){
if(this.hiddenCount==1){
$("show_hidden").innerHTML="show 1 hidden story";
}else{
if(this.hiddenCount>0){
$("show_hidden").innerHTML="show "+this.hiddenCount+" hidden stories";
}else{
$("show_hidden").innerHTML="";
}
}
},getById:function(id){
return this.feedItems[id];
},stopReporting:function(){
if(this.reportingFeedStoryId){
this.getById(this.reportingFeedStoryId).stopObservePostReporting();
this.reportingFeedStoryId=0;
}
},unhideAll:function(){
this.feedItemCollection.each(function(fi){
fi.unhide();
});
this.updateHiddenLink();
return false;
},unhideUser:function(_420){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_420,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_420).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _421=this.getById(fid);
if(_421){
_421.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_420);
if(hu){
if(hu.siblings().size()==0){
var _422=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_422.parentNode.insertBefore(p,_422);
}
_422.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_423){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_423,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_423).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _424=this.getById(fid);
if(_424){
_424.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_423);
if(hc){
if(hc.siblings().size()==0){
var _425=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_425.parentNode.insertBefore(p,_425);
}
_425.remove();
}else{
hc.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},toggleEditHidden:function(){
var val=$("edit_hidden").innerHTML;
if(val=="done editing"){
$("edit_hidden").innerHTML="edit";
$("hidden_list").hide();
}else{
$("edit_hidden").innerHTML="done editing";
if($("hidden_list").innerHTML==""){
this.updateHiddenList(true);
}else{
$("hidden_list").show();
}
}
return false;
},updateHiddenList:function(show){
new Ajax.Updater("hidden_list","/xml/feedhide.php",{parameters:"list=1",onComplete:function(){
if(show){
$("hidden_list").show();
}
}});
},closeOverlay:function(){
this.stopReporting();
toggleOverlay("overlay");
var _426=$("overlay");
_426.classNames().each(function(name){
if(name!="overlay"){
_426.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_427){
if(_427){
$("overlay").addClassName(_427);
}
adjustOverlayHeight();
toggleOverlay("overlay");
},showHelpOverlay:function(url){
this.openOverlay("help");
new Ajax.Updater("overlay_content","/xml/staticpage.php?url="+url);
return false;
},showQuestionOverlay:function(id){
this.openOverlay("hubpage");
new Ajax.Updater("overlay_content","/xml/answersrender.php?id="+id,{evalScripts:true,onComplete:function(){
var _428=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_428+"px"});
}
adjustOverlayHeight();
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:1,objectId:id,printNumbers:true},success:function(data){
jQuery("#follow_"+id).replaceWith(data);
}});
jQuery.ajax({url:"http://platform.twitter.com/widgets.js",dataType:"script",cache:true});
}.bind(this)});
return false;
},showImageOverlay:function(url){
jq.fancybox({type:"image",href:url});
return false;
},showHubOverlay:function(url){
this.openOverlay("hubpage");
new Ajax.Request("/xml/articlerender.php?url="+url,{onComplete:function(req){
var _429=0;
$("overlay_content").innerHTML=req.responseText;
var _42a=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_42a+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_42b){
var code=_42b.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_42c){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_42c,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_42d,_42e){
var sure=confirm("Are you sure that you want to stop following "+_42e+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_42d,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_42d).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _42f=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_42f.each(function(type){
var _430=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_431){
if(_431.checked){
_430=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_430){
li.removeClassName("inactive");
}else{
li.addClassName("inactive");
li.hide();
}
}
});
},showFeedSettings:function(){
jq("#feed_settings").show().effect("highlight",{color:"#fffdcc"},1000);
jq("#view_feed_settings").html("hide filters &laquo;");
var _432=jq("#edit_button");
if(_432.html()=="edit"){
this.toggleFeedPrefs();
}
var _433=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_433);
return false;
},toggleFeedPrefs:function(){
var _434=$("edit_button");
var _435=$("filter").value;
var _436="edit";
if(_434.innerHTML=="save"){
_436="save";
}
if(_436=="save"){
this.updateFeedTypeFilters();
var _437=0;
var _438=$$(".ht_box");
for(var j=0;j<_438.length;j++){
if(_438[j].checked){
_437+=Number(_438[j].name.substr(3));
}
}
var _439=$("current_prefs");
if(_437!=_439.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_437,filter:_435,feed:1}).toQueryString(),onComplete:function(){
Element.update(_434,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _43a=parseInt(pf.getStyle("height"));
var _43b=new fx.Height("preference_feedback",{duration:600});
_43b.hide();
_43b.custom(0,_43a);
}});
_439.value=_437;
}else{
Element.update(_434,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _43c=parseInt(pf.getStyle("height"));
var _43d=new fx.Height("preference_feedback",{duration:600});
_43d.hide();
_43d.custom(0,_43c);
}
}
var curs=$$(".ht_cur");
var _43e="";
for(var i=0;i<curs.length;i++){
_43e=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_436=="edit"){
if(_43e=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_43e){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_436=="edit"){
_434.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_43f,_440,_441){
this.id=id;
this.feedItemId=fid;
this.cdate=_43f;
this.hidden=_440;
this.manager=_441;
this.menuVisible=0;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.share_button_disabled=false;
this.mouseoverHandlers=new Array();
this.mouseoutHandlers=new Array();
this.clickHandlers=new Array();
this.prefix="story_";
this.htmlId=this.prefix+this.id;
this.triggerId="menu_trigger_"+this.id;
this.hideId="menu_"+this.id;
this.mainId="hide_menu_"+this.id;
this.messageId="message_"+this.id;
this.hideMessageId="hide_message_"+this.id;
this.likeId="feed_like_"+this.id;
},unhide:function(_442){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_442){
this.hidden=0;
this.hideMenuObserve();
}
},hideMenuObserve:function(){
if(!this.mobile){
Event.observe(this.htmlId,"mouseover",this.showHideMenu.bindAsEventListener(this));
Event.observe(this.htmlId,"mouseout",this.hideHideMenu.bindAsEventListener(this));
Event.observe(this.triggerId,"mouseover",function(){
$(this.hideId).show();
}.bind(this));
Event.observe(this.triggerId,"mouseout",function(){
$(this.hideId).hide();
}.bind(this));
Event.observe(this.triggerId,"click",function(_443){
if(Event.element(_443).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _444=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_444){
elt.observe("mouseover",function(_445){
_445.show();
}.bind(this,_444));
elt.observe("mouseout",function(_446){
_446.hide();
}.bind(this,_444));
}
});
$(this.hideId).descendants().each(function(elt){
elt=$(elt);
if(elt.tagName=="LI"){
elt.observe("mouseover",function(){
if(!elt.hasClassName("active")){
elt.addClassName("active");
}
});
elt.observe("mouseout",function(){
if(elt.hasClassName("active")){
elt.removeClassName("active");
}
});
}
});
},showHideMenu:function(e){
if(!this.hidden&&!this.menuVisible){
this.menuVisible=1;
$(this.mainId).show();
}
},hideHideMenu:function(e){
if(this.menuVisible){
this.menuVisible=0;
$(this.mainId).hide();
}
},share:function(_447){
if(_447===undefined){
_447=false;
}
if(_447){
var _448=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_448){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_449,_44a){
if(_449){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_44a){
toggleOverlay("feedSignUp");
}
setTimeout(function(){
this.share_button_disabled=false;
},4000);
}
}else{
suFH.onSuccess=this.doShare.bind(this,true,true);
siFH.onSuccess=this.doShare.bind(this,true,true);
fetchRecaptcha("feedCaptcha");
toggleOverlay("feedSignUp");
}
},hide:function(){
this.manager.hiddenCount++;
this.hidden=1;
$(this.htmlId).addClassName("hidden");
},hideStory:function(){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.feedItemId}).toQueryString(),onComplete:function(){
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _44b=$(this.htmlId);
_44b.parentNode.insertBefore(hmsg,_44b);
}
hmsg.innerHTML="Story hidden";
jq("#"+this.hideMessageId).delay(2500).fadeOut(1000);
this.hide();
this.manager.updateHiddenLink();
}.bind(this)});
return false;
},removeHideMessage:function(){
$(this.hideMessageId).remove();
return false;
},hideUser:function(_44c,_44d){
_44d=_44d?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_44c,force:_44d}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _44e=$(this.htmlId);
_44e.parentNode.insertBefore(hmsg,_44e);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_44c).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_44f,_450){
_450=_450?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_450,categoryId:_44f}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _451=$(this.htmlId);
_451.parentNode.insertBefore(hmsg,_451);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_44f).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
if(data["ids"]){
$A(data["ids"]).each(function(id){
if($("category_filter_"+id)){
$("category_filter_"+id).remove();
}
});
}
}.bind(this)});
return false;
},hidePreviousPosts:function(){
var _452=$("feed_posts_"+this.id).immediateDescendants();
var _453=_452.size();
_452.each(function(elt,_454){
if(_454==_453-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _455=$("feed_comments_"+this.id).immediateDescendants();
var _456=_455.size();
var _457=0;
_455.each(function(elt,_458){
if(elt.hasClassName("show_previous")){
_457=_458;
}
});
_455.each(function(elt,_459){
if(_459==_457){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_45a,num,_45b){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_45a,num:num,startpos:_45b}).toQueryString(),onComplete:function(req){
var _45c=$("feed_posts_"+this.id);
_45c.down("div").hide();
new Insertion.Top(_45c,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_45d){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_45d}).toQueryString(),onComplete:function(req){
var _45e=$("feed_comments_"+this.id);
_45e.down("div").hide();
new Insertion.Top(_45e,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_45f,num,_460){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_45f,num:num,startpos:_460}).toQueryString(),onComplete:function(req){
var _461=$("feed_comments_"+this.id);
_461.down("div").hide();
new Insertion.Top(_461,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _462=$("feed_comments_"+this.id);
_462.innerHTML+=data["render"];
jq("#comment_"+this.id).val("").blur();
},answerCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
$("server_error_"+this.id).innerHTML="";
$("answer_interact_"+this.id).innerHTML=data["msg"];
$("answers_"+this.id).innerHTML=data["c"]+" answer"+(data["c"]==1?"":"s");
}else{
$("server_error_"+this.id).innerHTML="<span class=\"alert\">"+data["msg"]+"</span>";
}
},postCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
$("server_error_"+this.id).innerHTML="";
$("new_posts_"+this.id).innerHTML+=data["render"];
jq("#post_"+this.id).val("").blur();
}else{
$("server_error_"+this.id).innerHTML="<span class=\"alert\">"+data["msg"]+"</span>";
}
},activatePost:function(elt){
elt.addClassName("feed_post_active");
},deactivatePost:function(elt){
elt.removeClassName("feed_post_active");
},observePostReporting:function(_463){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _464=$$("#story_"+this.id+" .feed_post");
if(_464.size()>1){
_464.each(function(elt){
var _465=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _466=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_465]=_466;
elt.observe("mouseover",_466);
var _467=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_465]=_467;
elt.observe("mouseout",_467);
var _468=this.manager.reportPost.bind(this.manager,_465);
this.clickHandlers[_465]=_468;
elt.observe("click",_468);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _469=$(document.createElement("a"));
_469.innerHTML="cancel report";
_469.href="#";
msg.appendChild(_469);
var _46a=$(this.messageId);
_46a.innerHTML="";
_46a.appendChild(msg);
_46a.addClassName("report_instructions");
var _46b=parseInt(_46a.getStyle("height"));
var _46c=new fx.Height(this.messageId,{duration:500});
_46c.hide();
_46c.custom(0,_46b);
_469.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_464.size()==1){
var post=_464.detect(function(elt){
return true;
});
var _46d=post.id;
this.manager.reportPost(this.postIdFromDivId(_46d));
}
}
return false;
},postIdFromDivId:function(_46e){
return _46e.substring(_46e.lastIndexOf("_")+1);
},stopObservePostReporting:function(_46f){
var _470=$$("#story_"+this.id+" .feed_post");
if(_470.size()>1){
_470.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _471=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_471]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_471]);
elt.stopObserving("click",this.clickHandlers[_471]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_46f){
Event.stop(_46f);
}
}};
function updateFollowCheckbox(){
var key=jq(this).attr("data-key");
if(key){
var id=jq(this).attr("data-id");
data={};
data[key]=id;
if(jq(this).next(".follow").size()==0){
jq(this).after("<span class=\"follow\"></span>");
}
jq(this).next(".follow").html("").css("height","0px").load("/xml/get_follow_checkbox.php",data,function(){
if(jq(this).html()!=""){
jq(this).css("height","auto");
}
});
}
};
function deleteStatus(_472){
link=jq(_472.target);
id=link.attr("id").substring(14);
jq.post("/xml/status.php",{del:id},function(){
link.prev("div").remove();
link.remove();
});
return false;
};
var mm;
function mapsManager(){
this.maps=[];
};
mapsManager.prototype.addMap=function(id,map){
this.maps[id]=map;
map.id=id;
};
mapsManager.prototype.getMapById=function(id){
return this.maps[id];
};
function markerMap(m,_473,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_473);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_474,_475){
this.markers.push(new infoMarker(this,_474,_475,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_476,_477,_478,_479){
this.markermap=_476;
this.marker=_477;
this.content=_478;
this.position=_479;
this.open=false;
google.maps.event.addListener(this.marker,"click",function(){
this.markermap.infowindow.setContent(this.content);
this.markermap.infowindow.open(this.markermap.map,this.marker);
this.open=true;
google.maps.event.addListenerOnce(this.markermap.infowindow,"closeclick",function(){
this.open=false;
unhighlightMarker(this);
}.bind(this));
highlightMarker(this);
}.bind(this));
google.maps.event.addListener(this.marker,"mouseover",function(){
highlightMarker(this);
}.bind(this));
google.maps.event.addListener(this.marker,"mouseout",function(){
if(!this.open){
unhighlightMarker(this);
}
}.bind(this));
};
markerMap.prototype.hideDirections=function(){
var i=0;
while(true){
var _47a=$(this.legend.id+"_"+i);
if(_47a){
_47a.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML="";
$(this.legend.id+"_warnings").innerHTML="";
this.polyline.setMap(null);
};
markerMap.prototype.renderDirections=function(){
if(this.directionsResult.routes[0].overview_path.length==0){
this.polyline.setMap(null);
}else{
if(!this.polyline.getMap()){
this.polyline.setMap(this.map);
}
this.polyline.setPath(this.directionsResult.routes[0].overview_path);
}
var _47b=this.directionsResult.routes[0];
var legs=_47b.legs;
for(var i=0;i<legs.length;i++){
var leg=legs[i];
var html="<div>"+leg.distance.text+" - about "+leg.duration.text+" of "+$F(this.travelModeId).toLowerCase()+"</div><table><tbody>";
if(leg.steps.length>100){
html+="<p>We're sorry, but the directions for this step are too long to display.</p>";
}else{
for(var j=0;j<leg.steps.length;j++){
var step=leg.steps[j];
html+="<tr><td>"+(j+1)+".</td><td>"+step.instructions+"</td><td>"+step.distance.text+"</td></tr>";
}
html+="</tbody></table>";
}
$(this.legend.id+"_"+i).innerHTML=html;
}
while(true){
var _47c=$(this.legend.id+"_"+i);
if(_47c){
_47c.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_47b.copyrights;
var _47d="";
for(var j=0;j<_47b.warnings.length;j++){
_47d+=_47b.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_47d;
};
markerMap.prototype.fetchDirections=function(){
var _47e=this.markers;
var l=_47e.length;
var _47f=new google.maps.LatLng(_47e[0].marker.getPosition().lat(),_47e[0].marker.getPosition().lng());
var _480=new google.maps.LatLng(_47e[l-1].marker.getPosition().lat(),_47e[l-1].marker.getPosition().lng());
var _481=[];
for(var i=1;i<l-1;i++){
_481.push({location:new google.maps.LatLng(_47e[i].marker.getPosition().lat(),_47e[i].marker.getPosition().lng()),stopover:true});
}
var _482={origin:_47f,destination:_480,waypoints:_481,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _483=new google.maps.DirectionsService();
_483.route(_482,function(_484,_485){
if(_485==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_484;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_486){
var _487="map_canvas_"+id;
var _488=mm.getMapById(id);
if(!_488){
var map=new google.maps.Map(document.getElementById(_487));
var _488=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_488);
sv=true;
}else{
var map=_488.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_488.removeAllMarkers();
var _489="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _48a=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_48a+".png";
var _48b="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _48c=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_488.addMarker(_48c,_48b);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_489+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_488.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_489+="<div id=\""+_488.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_489+="<div id=\""+_488.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_488.legend.innerHTML=_489;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_486||!_488.directionsResult){
_488.fetchDirections();
}else{
_488.renderDirections();
}
}else{
var _48d={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_488.directionsResult=_48d;
_488.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_48e){
var id=_48e.markermap.id;
if(!id){
return;
}
var _48f=mapLetterFromPosition(_48e.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_48f+".png";
_48e.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_48e.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_490){
var id=_490.markermap.id;
if(!id){
return;
}
var _491=mapLetterFromPosition(_490.position);
var icon="http://www.google.com/mapfiles/marker_green"+_491+".png";
_490.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_490.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_492,id,_493){
var _494=mm.getMapById(id);
if(_493<_494.markers.length){
highlightMarker(_494.markers[_493]);
}
};
function unhighlightMapMarker(_495,id,_496){
var _497=mm.getMapById(id);
if(_496<_497.markers.length){
unhighlightMarker(_497.markers[_496]);
}
};
var lastEditedMessageEle=null;
function attach_forum_topic_events(){
jQuery("div.posts a.reply").live("click",function(){
jQuery("#report_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
whenSignedIn({explain:"to reply to this post",btnText:"submit"},show_post_reply_box,post);
return false;
});
jQuery("div.posts a.delete").live("click",function(){
if(confirm("Are you sure you want to delete this post?")){
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
jQuery(this).closest("li.threaded").load("/xml/forum/delete_inline.php",{postId:post.attr("id").substring(4),isprivate:post.hasClass("private")?1:0},processDeleteResponse);
}
return false;
});
jQuery("div.posts a.undelete").live("click",function(){
if(confirm("Are you sure you want to undelete this post?")){
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
jQuery(this).closest("li.threaded").load("/xml/forum/undelete_inline.php",{postId:post.attr("id").substring(4),isprivate:post.hasClass("private")?1:0},processUndeleteResponse);
}
return false;
});
jQuery("div.posts a.edit").live("click",function(){
jQuery("#report_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
jQuery.ajax({type:"GET",url:"/xml/forum/edit_inline.php",data:{postId:post.attr("id").substring(4),isprivate:post.hasClass("private")?1:0},complete:processStartEditResponse});
return false;
});
jQuery("div.posts a.report").live("click",function(){
jQuery("#editor_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
whenSignedIn({explain:"to report this post",btnText:"submit"},show_report_box,post);
return false;
});
jQuery("#editor_box .inline_cancel").click(function(){
jq("#photo_insert_code").hide();
jQuery(".actionmenu a").removeClass("selected");
var _498=jQuery("#editor_box");
if(_498.hasClass("edit_box")){
jQuery(".message",_498.closest(".postright")).show();
}
_498.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_499,_49a){
var ta=jq("#editor_box textarea");
var _49b=ta.val();
if(_49b.length){
ta.val(_49b+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_499,_49a)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_499,_49a)+"[/img]\n\n");
}
ta.focus();
});
pgi.setOnClose(function(){
jq("#editor_box #photo_insert_add").show();
});
jq("#editor_box #photo_insert").show();
return false;
});
jQuery("#editor_box .inline_reply").click(function(){
jq("#photo_insert_code").hide();
jQuery("#editor_box form").submit();
jQuery("#editor_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
return false;
});
jQuery("#report_box input[value=Cancel]").click(function(){
jQuery(".actionmenu a").removeClass("selected");
var _49c=jQuery("#report_box");
_49c.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _49d=jQuery(this).closest("div.replies_box_wrapper");
var _49e=jQuery(this).closest("div.reply_collapser");
if(_49e.hasClass("show")){
_49e.addClass("hide").removeClass("show");
jQuery("a",_49e).html("<span></span>");
jQuery("> .replies_box",_49d).slideDown();
}else{
jQuery("> .replies_box",_49d).slideUp(500,function(){
_49e.addClass("show").removeClass("hide");
jQuery("a",_49e).html("<span></span>"+jQuery("li.threaded",_49d).length+" replies");
});
}
return false;
});
jQuery("a.toggle").live("click",function(){
if(jQuery(this).hasClass("expanded")){
jQuery(this).removeClass("expanded");
jQuery(this).html("more &rarr;");
}else{
jQuery(this).addClass("expanded");
jQuery(this).html("less &larr;");
}
jQuery("a.more",jQuery(this).closest(".actionmenu")).toggle();
return false;
});
jQuery("#reportTypeId").change(function(){
if(jQuery(this).val()=="5"){
jQuery("#new_category_wrapper").show();
}else{
jQuery("#new_category_wrapper").hide();
}
});
jQuery("li.threaded .in_reply_to a").live("click",function(){
var _49f=jQuery(this);
var _4a0=jQuery("#threaded_reply_to_box");
if(_49f.html()=="hide"){
_49f.html("this");
_4a0.hide();
return false;
}
var _4a1=_49f.attr("class").substr(7);
var _4a2=jQuery("#post"+_4a1+" .username").html();
var html="<p class=\"by\">By "+_4a2+"</p>"+jQuery("#message"+_4a1).html();
var _4a3=_49f.closest("li.threaded");
if(_4a0.length>0){
_4a3.append(_4a0);
}else{
jQuery(_4a3).append("<div id=\"threaded_reply_to_box\"></div>");
_4a0=jQuery("#threaded_reply_to_box");
}
_4a0.html(html);
var pos=_49f.position();
var _4a4=_49f.width();
_4a0.css({"left":(pos.left+_4a4)+"px","top":pos.top+"px"});
_4a0.show();
_49f.html("hide");
return false;
});
jQuery.each(jQuery("div.reply_collapser.show"),function(){
replies_wrapper=jQuery(this).closest("div.replies_box_wrapper");
jQuery("a",this).html(""+jQuery("li.threaded",replies_wrapper).length+" replies");
});
};
jQuery(function(){
jQuery("#tips_show").one("click",function(){
jQuery("#formatting_tips").find("img").each(function(){
var _4a5=jQuery(this);
_4a5.attr("src",_4a5.data("src"));
});
});
});
function show_post_reply_box(_4a6){
jQuery("li.threaded img.wait").remove();
_4a6.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _4a7=jQuery("#editor_box");
_4a7.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_4a7).text("submit");
jQuery("form",_4a7).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_4a7).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _4a8=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _4a9=_4a8?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_4a9+="<br/>";
jQuery("textarea",_4a7).after(_4a9);
}
if(jQuery("#follow_topic").length==0){
var _4aa="checked";
var _4ab=window.location.pathname;
var arr=_4ab.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _4a9="<p id=\"follow_topic\"></p>";
jQuery("textarea",_4a7).after(_4a9);
}
jQuery("#posterror ul",_4a7).html("");
jQuery("#posterror",_4a7).hide();
jQuery("textarea",_4a7).val("");
jQuery("#postId",_4a7).val(_4a6.attr("id").substring(4));
_4a7.append(jQuery("#formatting_tips"));
_4a7.show();
var x=_4a7.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_4ac){
jQuery("li.threaded img.wait").remove();
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _4ad=jQuery("#report_box");
jQuery("#reportPostId",_4ad).val(_4ac.attr("id").substring(4));
jQuery("form",_4ad).ajaxForm({type:"POST",success:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_4ac).append(_4ad);
jQuery(">.post_wrap > .actionmenu",_4ac).append(_4ad);
_4ad.show();
var x=_4ad.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyError(data,_4ae,_4af){
alert("There may have been an error posting your reply ("+_4ae+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_4b0,_4b1){
alert("There may have been an error updating your post ("+_4b0+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
};
function processReplyResponse(data){
jQuery("li.threaded img.wait").remove();
if(data.errors.length==0){
jQuery(".actionmenu a").removeClass("selected");
jQuery("#editor_box").hide();
var ol=jQuery("#replies_box_"+data.postId+" > ol");
if(ol.length==0){
jQuery("#replies_box_"+data.postId).append("<ol></ol>");
}
jQuery("#replies_box_"+data.postId+" > ol").append(data.replyHtml);
replies_wrapper=jQuery("#replies_box_"+data.postId).closest(".replies_box_wrapper");
replies_wrapper.show();
reply_collapser=jQuery("> .reply_collapser",replies_wrapper);
reply_collapser.addClass("hide").removeClass("show");
jQuery("a",reply_collapser).html("");
jQuery("> .replies_box",replies_wrapper).slideDown();
}else{
jQuery("#editor_box #posterror").show();
errors_html="<li>"+data.errors.join("</li><li>")+"</li>";
jQuery("#editor_box #posterror ul").html(errors_html);
}
};
function processStartEditResponse(_4b2,_4b3){
jQuery("li.threaded img.wait").remove();
if(_4b3=="error"){
alert(_4b2.responseText);
return;
}
data=eval("("+_4b2.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _4b4=jQuery("#editor_box");
_4b4.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_4b4).text("Save");
jQuery("form",_4b4).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_4b4).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _4b5=document.getElementById("admincenter");
replyOptionsHTML=_4b5?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_4b4).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_4b4).html("");
jQuery("#posterror",_4b4).hide();
jQuery("#postId",_4b4).val(data.postId);
jQuery("textarea",_4b4).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_4b4.append(jQuery("#formatting_tips"));
_4b4.show();
var x=_4b4.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processEditedResponse(data){
jQuery("li.threaded img.wait").remove();
if(data.errors.length==0){
jQuery(".actionmenu a").removeClass("selected");
jQuery("#editor_box").hide();
jQuery("#message"+data.postId).html(data.editedHtml);
jQuery("#message"+data.postId).show();
document.getElementById("postwrap"+data.postId).className=data.highlight?"post_highlight":"post_wrap";
}else{
jQuery("#editor_box #posterror").show();
errors_html="<li>"+data.errors.join("</li><li>")+"</li>";
jQuery("#editor_box #posterror ul").html(errors_html);
}
};
function processDeleteResponse(_4b6,_4b7,_4b8){
if(_4b7=="error"){
jQuery("li.threaded img.wait").remove();
alert(_4b6);
}
};
function processUndeleteResponse(_4b9,_4ba,_4bb){
if(_4ba=="error"){
jQuery("li.threaded img.wait").remove();
alert(_4b9);
}
};
function processReportResponse(_4bc){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _4bd=jQuery("#report_box");
_4bd.hide();
alert(_4bc);
};
(function($){
$.extend($.fn,{validate:function(_4be){
if(!this.length){
_4be&&_4be.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _4bf=$.data(this[0],"validator");
if(_4bf){
return _4bf;
}
_4bf=new $.validator(_4be,this[0]);
$.data(this[0],"validator",_4bf);
if(_4bf.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_4bf.cancelSubmit=true;
});
if(_4bf.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_4bf.submitButton=this;
});
}
this.submit(function(_4c0){
if(_4bf.settings.debug){
_4c0.preventDefault();
}
function _4c1(){
if(_4bf.settings.submitHandler){
if(_4bf.submitButton){
var _4c2=$("<input type='hidden'/>").attr("name",_4bf.submitButton.name).val(_4bf.submitButton.value).appendTo(_4bf.currentForm);
}
_4bf.settings.submitHandler.call(_4bf,_4bf.currentForm);
if(_4bf.submitButton){
_4c2.remove();
}
return false;
}
return true;
};
if(_4bf.cancelSubmit){
_4bf.cancelSubmit=false;
return _4c1();
}
if(_4bf.form()){
if(_4bf.pendingRequest){
_4bf.formSubmitted=true;
return false;
}
return _4c1();
}else{
_4bf.focusInvalid();
return false;
}
});
}
return _4bf;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _4c3=true;
var _4c4=$(this[0].form).validate();
this.each(function(){
_4c3&=_4c4.element(this);
});
return _4c3;
}
},removeAttrs:function(_4c5){
var _4c6={},_4c7=this;
$.each(_4c5.split(/\s/),function(_4c8,_4c9){
_4c6[_4c9]=_4c7.attr(_4c9);
_4c7.removeAttr(_4c9);
});
return _4c6;
},rules:function(_4ca,_4cb){
var _4cc=this[0];
if(_4ca){
var _4cd=$.data(_4cc.form,"validator").settings;
var _4ce=_4cd.rules;
var _4cf=$.validator.staticRules(_4cc);
switch(_4ca){
case "add":
$.extend(_4cf,$.validator.normalizeRule(_4cb));
_4ce[_4cc.name]=_4cf;
if(_4cb.messages){
_4cd.messages[_4cc.name]=$.extend(_4cd.messages[_4cc.name],_4cb.messages);
}
break;
case "remove":
if(!_4cb){
delete _4ce[_4cc.name];
return _4cf;
}
var _4d0={};
$.each(_4cb.split(/\s/),function(_4d1,_4d2){
_4d0[_4d2]=_4cf[_4d2];
delete _4cf[_4d2];
});
return _4d0;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_4cc),$.validator.classRules(_4cc),$.validator.attributeRules(_4cc),$.validator.staticRules(_4cc)),_4cc);
if(data.required){
var _4d3=data.required;
delete data.required;
data=$.extend({required:_4d3},data);
}
return data;
}});
$.extend($.expr[":"],{blank:function(a){
return !$.trim(""+a.value);
},filled:function(a){
return !!$.trim(""+a.value);
},unchecked:function(a){
return !a.checked;
}});
$.validator=function(_4d4,form){
this.settings=$.extend(true,{},$.validator.defaults,_4d4);
this.currentForm=form;
this.init();
};
$.validator.format=function(_4d5,_4d6){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_4d5);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_4d6.constructor!=Array){
_4d6=$.makeArray(arguments).slice(1);
}
if(_4d6.constructor!=Array){
_4d6=[_4d6];
}
$.each(_4d6,function(i,n){
_4d5=_4d5.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _4d5;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_4d7){
this.lastActive=_4d7;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_4d7,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_4d7)).hide();
}
},onfocusout:function(_4d8){
if(!this.checkable(_4d8)&&(_4d8.name in this.submitted||!this.optional(_4d8))){
this.element(_4d8);
}
},onkeyup:function(_4d9){
if(_4d9.name in this.submitted||_4d9==this.lastElement){
this.element(_4d9);
}
},onclick:function(_4da){
if(_4da.name in this.submitted){
this.element(_4da);
}else{
if(_4da.parentNode.name in this.submitted){
this.element(_4da.parentNode);
}
}
},highlight:function(_4db,_4dc,_4dd){
$(_4db).addClass(_4dc).removeClass(_4dd);
},unhighlight:function(_4de,_4df,_4e0){
$(_4de).removeClass(_4df).addClass(_4e0);
}},setDefaults:function(_4e1){
$.extend($.validator.defaults,_4e1);
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){
this.labelContainer=$(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);
this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted={};
this.valueCache={};
this.pendingRequest=0;
this.pending={};
this.invalid={};
this.reset();
var _4e2=(this.groups={});
$.each(this.settings.groups,function(key,_4e3){
$.each(_4e3.split(/\s/),function(_4e4,name){
_4e2[name]=key;
});
});
var _4e5=this.settings.rules;
$.each(_4e5,function(key,_4e6){
_4e5[key]=$.validator.normalizeRule(_4e6);
});
function _4e7(_4e8){
var _4e9=$.data(this[0].form,"validator"),_4ea="on"+_4e8.type.replace(/^validate/,"");
_4e9.settings[_4ea]&&_4e9.settings[_4ea].call(_4e9,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_4e7).validateDelegate(":radio, :checkbox, select, option","click",_4e7);
if(this.settings.invalidHandler){
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
}
},form:function(){
this.checkForm();
$.extend(this.submitted,this.errorMap);
this.invalid=$.extend({},this.errorMap);
if(!this.valid()){
$(this.currentForm).triggerHandler("invalid-form",[this]);
}
this.showErrors();
return this.valid();
},checkForm:function(){
this.prepareForm();
for(var i=0,_4eb=(this.currentElements=this.elements());_4eb[i];i++){
this.check(_4eb[i]);
}
return this.valid();
},element:function(_4ec){
_4ec=this.clean(_4ec);
this.lastElement=_4ec;
this.prepareElement(_4ec);
this.currentElements=$(_4ec);
var _4ed=this.check(_4ec);
if(_4ed){
delete this.invalid[_4ec.name];
}else{
this.invalid[_4ec.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _4ed;
},showErrors:function(_4ee){
if(_4ee){
$.extend(this.errorMap,_4ee);
this.errorList=[];
for(var name in _4ee){
this.errorList.push({message:_4ee[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_4ef){
return !(_4ef.name in _4ee);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},resetForm:function(){
if($.fn.resetForm){
$(this.currentForm).resetForm();
}
this.submitted={};
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass);
},numberOfInvalids:function(){
return this.objectLength(this.invalid);
},objectLength:function(obj){
var _4f0=0;
for(var i in obj){
_4f0++;
}
return _4f0;
},hideErrors:function(){
this.addWrapper(this.toHide).hide();
},valid:function(){
return this.size()==0;
},size:function(){
return this.errorList.length;
},focusInvalid:function(){
if(this.settings.focusInvalid){
try{
$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}
catch(e){
}
}
},findLastActive:function(){
var _4f1=this.lastActive;
return _4f1&&$.grep(this.errorList,function(n){
return n.element.name==_4f1.name;
}).length==1&&_4f1;
},elements:function(){
var _4f2=this,_4f3={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_4f2.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _4f3||!_4f2.objectLength($(this).rules())){
return false;
}
_4f3[this.name]=true;
return true;
});
},clean:function(_4f4){
return $(_4f4)[0];
},errors:function(){
return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);
},reset:function(){
this.successList=[];
this.errorList=[];
this.errorMap={};
this.toShow=$([]);
this.toHide=$([]);
this.currentElements=$([]);
},prepareForm:function(){
this.reset();
this.toHide=this.errors().add(this.containers);
},prepareElement:function(_4f5){
this.reset();
this.toHide=this.errorsFor(_4f5);
},check:function(_4f6){
_4f6=this.clean(_4f6);
if(this.checkable(_4f6)){
_4f6=this.findByName(_4f6.name).not(this.settings.ignore)[0];
}
var _4f7=$(_4f6).rules();
var _4f8=false;
for(var _4f9 in _4f7){
var rule={method:_4f9,parameters:_4f7[_4f9]};
try{
var _4fa=$.validator.methods[_4f9].call(this,_4f6.value.replace(/\r/g,""),_4f6,rule.parameters);
if(_4fa=="dependency-mismatch"){
_4f8=true;
continue;
}
_4f8=false;
if(_4fa=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_4f6));
return;
}
if(!_4fa){
this.formatAndAdd(_4f6,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_4f6.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_4f8){
return;
}
if(this.objectLength(_4f7)){
this.successList.push(_4f6);
}
return true;
},customMetaMessage:function(_4fb,_4fc){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_4fb).metadata()[this.settings.meta]:$(_4fb).metadata();
return meta&&meta.messages&&meta.messages[_4fc];
},customMessage:function(name,_4fd){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_4fd]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_4fe,_4ff){
return this.findDefined(this.customMessage(_4fe.name,_4ff),this.customMetaMessage(_4fe,_4ff),!this.settings.ignoreTitle&&_4fe.title||undefined,$.validator.messages[_4ff],"<strong>Warning: No message defined for "+_4fe.name+"</strong>");
},formatAndAdd:function(_500,rule){
var _501=this.defaultMessage(_500,rule.method),_502=/\$?\{(\d+)\}/g;
if(typeof _501=="function"){
_501=_501.call(this,rule.parameters,_500);
}else{
if(_502.test(_501)){
_501=jQuery.format(_501.replace(_502,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_501,element:_500});
this.errorMap[_500.name]=_501;
this.submitted[_500.name]=_501;
},addWrapper:function(_503){
if(this.settings.wrapper){
_503=_503.add(_503.parent(this.settings.wrapper));
}
return _503;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _504=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_504.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_504.element,_504.message);
}
if(this.errorList.length){
this.toShow=this.toShow.add(this.containers);
}
if(this.settings.success){
for(var i=0;this.successList[i];i++){
this.showLabel(this.successList[i]);
}
}
if(this.settings.unhighlight){
for(var i=0,_505=this.validElements();_505[i];i++){
this.settings.unhighlight.call(this,_505[i],this.settings.errorClass,this.settings.validClass);
}
}
this.toHide=this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show();
},validElements:function(){
return this.currentElements.not(this.invalidElements());
},invalidElements:function(){
return $(this.errorList).map(function(){
return this.element;
});
},showLabel:function(_506,_507){
var _508=this.errorsFor(_506);
if(_508.length){
_508.removeClass().addClass(this.settings.errorClass);
_508.attr("generated")&&_508.html(_507);
}else{
_508=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_506),generated:true}).addClass(this.settings.errorClass).html(_507||"");
if(this.settings.wrapper){
_508=_508.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_508).length){
this.settings.errorPlacement?this.settings.errorPlacement(_508,$(_506)):_508.insertAfter(_506);
}
}
if(!_507&&this.settings.success){
_508.text("");
typeof this.settings.success=="string"?_508.addClass(this.settings.success):this.settings.success(_508);
}
this.toShow=this.toShow.add(_508);
},errorsFor:function(_509){
var name=this.idOrName(_509);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_50a){
return this.groups[_50a.name]||(this.checkable(_50a)?_50a.name:_50a.id||_50a.name);
},checkable:function(_50b){
return /radio|checkbox/i.test(_50b.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_50c,_50d){
return _50d.form==form&&_50d.name==name&&_50d||null;
});
},getLength:function(_50e,_50f){
switch(_50f.nodeName.toLowerCase()){
case "select":
return $("option:selected",_50f).length;
case "input":
if(this.checkable(_50f)){
return this.findByName(_50f.name).filter(":checked").length;
}
}
return _50e.length;
},depend:function(_510,_511){
return this.dependTypes[typeof _510]?this.dependTypes[typeof _510](_510,_511):true;
},dependTypes:{"boolean":function(_512,_513){
return _512;
},"string":function(_514,_515){
return !!$(_514,_515.form).length;
},"function":function(_516,_517){
return _516(_517);
}},optional:function(_518){
return !$.validator.methods.required.call(this,$.trim(_518.value),_518)&&"dependency-mismatch";
},startRequest:function(_519){
if(!this.pending[_519.name]){
this.pendingRequest++;
this.pending[_519.name]=true;
}
},stopRequest:function(_51a,_51b){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_51a.name];
if(_51b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_51b&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_51c){
return $.data(_51c,"previousValue")||$.data(_51c,"previousValue",{old:null,valid:true,message:this.defaultMessage(_51c,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_51d,_51e){
_51d.constructor==String?this.classRuleSettings[_51d]=_51e:$.extend(this.classRuleSettings,_51d);
},classRules:function(_51f){
var _520={};
var _521=$(_51f).attr("class");
_521&&$.each(_521.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_520,$.validator.classRuleSettings[this]);
}
});
return _520;
},attributeRules:function(_522){
var _523={};
var _524=$(_522);
for(var _525 in $.validator.methods){
var _526=_524.attr(_525);
if(_526){
_523[_525]=_526;
}
}
if(_523.maxlength&&/-1|2147483647|524288/.test(_523.maxlength)){
delete _523.maxlength;
}
return _523;
},metadataRules:function(_527){
if(!$.metadata){
return {};
}
var meta=$.data(_527.form,"validator").settings.meta;
return meta?$(_527).metadata()[meta]:$(_527).metadata();
},staticRules:function(_528){
var _529={};
var _52a=$.data(_528.form,"validator");
if(_52a.settings.rules){
_529=$.validator.normalizeRule(_52a.settings.rules[_528.name])||{};
}
return _529;
},normalizeRules:function(_52b,_52c){
$.each(_52b,function(prop,val){
if(val===false){
delete _52b[prop];
return;
}
if(val.param||val.depends){
var _52d=true;
switch(typeof val.depends){
case "string":
_52d=!!$(val.depends,_52c.form).length;
break;
case "function":
_52d=val.depends.call(_52c,_52c);
break;
}
if(_52d){
_52b[prop]=val.param!==undefined?val.param:true;
}else{
delete _52b[prop];
}
}
});
$.each(_52b,function(rule,_52e){
_52b[rule]=$.isFunction(_52e)?_52e(_52c):_52e;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_52b[this]){
_52b[this]=Number(_52b[this]);
}
});
$.each(["rangelength","range"],function(){
if(_52b[this]){
_52b[this]=[Number(_52b[this][0]),Number(_52b[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_52b.min&&_52b.max){
_52b.range=[_52b.min,_52b.max];
delete _52b.min;
delete _52b.max;
}
if(_52b.minlength&&_52b.maxlength){
_52b.rangelength=[_52b.minlength,_52b.maxlength];
delete _52b.minlength;
delete _52b.maxlength;
}
}
if(_52b.messages){
delete _52b.messages;
}
return _52b;
},normalizeRule:function(data){
if(typeof data=="string"){
var _52f={};
$.each(data.split(/\s/),function(){
_52f[this]=true;
});
data=_52f;
}
return data;
},addMethod:function(name,_530,_531){
$.validator.methods[name]=_530;
$.validator.messages[name]=_531!=undefined?_531:$.validator.messages[name];
if(_530.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_532,_533,_534){
if(!this.depend(_534,_533)){
return "dependency-mismatch";
}
switch(_533.nodeName.toLowerCase()){
case "select":
var val=$(_533).val();
return val&&val.length>0;
case "input":
if(this.checkable(_533)){
return this.getLength(_532,_533)>0;
}
default:
return $.trim(_532).length>0;
}
},remote:function(_535,_536,_537){
if(this.optional(_536)){
return "dependency-mismatch";
}
var _538=this.previousValue(_536);
if(!this.settings.messages[_536.name]){
this.settings.messages[_536.name]={};
}
_538.originalMessage=this.settings.messages[_536.name].remote;
this.settings.messages[_536.name].remote=_538.message;
_537=typeof _537=="string"&&{url:_537}||_537;
if(this.pending[_536.name]){
return "pending";
}
if(_538.old===_535){
return _538.valid;
}
_538.old=_535;
var _539=this;
this.startRequest(_536);
var data={};
data[_536.name]=_535;
$.ajax($.extend(true,{url:_537,mode:"abort",port:"validate"+_536.name,dataType:"json",data:data,success:function(_53a){
_539.settings.messages[_536.name].remote=_538.originalMessage;
var _53b=_53a===true;
if(_53b){
var _53c=_539.formSubmitted;
_539.prepareElement(_536);
_539.formSubmitted=_53c;
_539.successList.push(_536);
_539.showErrors();
}else{
var _53d={};
var _53e=_53a||_539.defaultMessage(_536,"remote");
_53d[_536.name]=_538.message=$.isFunction(_53e)?_53e(_535):_53e;
_539.showErrors(_53d);
}
_538.valid=_53b;
_539.stopRequest(_536,_53b);
}},_537));
return "pending";
},minlength:function(_53f,_540,_541){
return this.optional(_540)||this.getLength($.trim(_53f),_540)>=_541;
},maxlength:function(_542,_543,_544){
return this.optional(_543)||this.getLength($.trim(_542),_543)<=_544;
},rangelength:function(_545,_546,_547){
var _548=this.getLength($.trim(_545),_546);
return this.optional(_546)||(_548>=_547[0]&&_548<=_547[1]);
},min:function(_549,_54a,_54b){
return this.optional(_54a)||_549>=_54b;
},max:function(_54c,_54d,_54e){
return this.optional(_54d)||_54c<=_54e;
},range:function(_54f,_550,_551){
return this.optional(_550)||(_54f>=_551[0]&&_54f<=_551[1]);
},email:function(_552,_553){
return this.optional(_553)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_552);
},url:function(_554,_555){
return this.optional(_555)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_554);
},date:function(_556,_557){
return this.optional(_557)||!/Invalid|NaN/.test(new Date(_556));
},dateISO:function(_558,_559){
return this.optional(_559)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_558);
},number:function(_55a,_55b){
return this.optional(_55b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_55a);
},digits:function(_55c,_55d){
return this.optional(_55d)||/^\d+$/.test(_55c);
},creditcard:function(_55e,_55f){
if(this.optional(_55f)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_55e)){
return false;
}
var _560=0,_561=0,_562=false;
_55e=_55e.replace(/\D/g,"");
for(var n=_55e.length-1;n>=0;n--){
var _563=_55e.charAt(n);
var _561=parseInt(_563,10);
if(_562){
if((_561*=2)>9){
_561-=9;
}
}
_560+=_561;
_562=!_562;
}
return (_560%10)==0;
},accept:function(_564,_565,_566){
_566=typeof _566=="string"?_566.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_565)||_564.match(new RegExp(".("+_566+")$","i"));
},equalTo:function(_567,_568,_569){
var _56a=$(_569).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_568).valid();
});
return $.trim(_567)==$.trim(_56a.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _56b={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_56c,_56d,xhr){
var port=_56c.port;
if(_56c.mode=="abort"){
if(_56b[port]){
_56b[port].abort();
}
_56b[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_56e){
var mode=("mode" in _56e?_56e:$.ajaxSettings).mode,port=("port" in _56e?_56e:$.ajaxSettings).port;
if(mode=="abort"){
if(_56b[port]){
_56b[port].abort();
}
return (_56b[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_56f,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_56f,_570,true);
},teardown:function(){
this.removeEventListener(_56f,_570,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _570(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_571,type,_572){
return this.bind(type,function(_573){
var _574=$(_573.target);
if(_574.is(_571)){
return _572.apply(_574,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_575,_576,_577){
return this.optional(_576)||this.getLength(jq.trim(_575),_576)==_577;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_578,_579,_57a){
if(!this.depend(_57a,_579)){
return "dependency-mismatch";
}
switch(_579.nodeName.toLowerCase()){
case "select":
var val=jq(_579).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_579)){
return this.getLength(_578,_579)==0;
}
default:
return jq.trim(_578).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_57b,_57c){
if(!this.depend(_57c,_57b)){
return "dependency-mismatch";
}
var _57d=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_57d=true;
}else{
var _57e=ssn.split("-");
if(_57e[0]=="000"||_57e[1]=="00"||_57e[2]=="0000"){
_57d=true;
}
if(_57e[0]=="666"){
_57d=true;
}
var _57f=parseInt(_57e[0],10);
if(_57f>=900){
if(_57e[1][0]!=7&&_57e[1][0]!=8){
_57d=true;
}
}
}
return !_57d;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_580,_581,_582){
if(!this.depend(_582,_581)){
return "dependency-mismatch";
}
return _580.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_583,_584){
if(!this.depend(_584,_583)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_585,_586,_587){
var _585=jq.trim(_585);
if(_585.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _588=_585.split("-");
var m=1*_588[0]-1;
var d=1*_588[1];
var y=1*_588[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_589,_58a,_58b){
return jq.trim(_589).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
jQuery.validator.addMethod("requiredNoPlaceholder",function(_58c,_58d,_58e){
if(!this.depend(_58e,_58d)){
return "dependency-mismatch";
}
if(jq(_58d).hasClass("placeholder")){
return false;
}
switch(_58d.nodeName.toLowerCase()){
case "select":
var val=jq(_58d).val();
return val&&val.length>0;
case "input":
if(this.checkable(_58d)){
return this.getLength(_58c,_58d)>0;
}
default:
return jq.trim(_58c).length>0;
}
},"This field is required.");
(function(_58f,$,_590){
"use strict";
var _591=$.event,_592;
_591.special.smartresize={setup:function(){
$(this).bind("resize",_591.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_591.special.smartresize.handler);
},handler:function(_593,_594){
var _595=this,args=arguments;
_593.type="smartresize";
if(_592){
clearTimeout(_592);
}
_592=setTimeout(function(){
jQuery.event.handle.apply(_595,args);
},_594==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_596,_597){
this.element=$(_597);
this._create(_596);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_598){
var _599=this.options.itemSelector;
return !_599?_598:_598.filter(_599).add(_598.find(_599));
},_getBricks:function(_59a){
var _59b=this._filterFindBricks(_59a).css({position:"absolute"}).addClass("masonry-brick");
return _59b;
},_create:function(_59c){
this.options=$.extend(true,{},$.Mason.settings,_59c);
this.styleQueue=[];
var _59d=this.element[0].style;
this.originalStyle={height:_59d.height||""};
var _59e=this.options.containerStyle;
for(var prop in _59e){
this.originalStyle[prop]=_59d[prop]||"";
}
this.element.css(_59e);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _59f=this;
setTimeout(function(){
_59f.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_58f).bind("smartresize.masonry",function(){
_59f.resize();
});
}
this.reloadItems();
},_init:function(_5a0){
this._getColumns();
this._reLayout(_5a0);
},option:function(key,_5a1){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_5a2,_5a3){
for(var i=0,len=_5a2.length;i<len;i++){
this._placeBrick(_5a2[i]);
}
var _5a4={};
_5a4.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _5a5=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_5a5++;
}
_5a4.width=(this.cols-_5a5)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_5a4});
var _5a6=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_5a7=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_5a6](obj.style,_5a7);
}
this.styleQueue=[];
if(_5a3){
_5a3.call(_5a2);
}
this.isLaidOut=true;
},_getColumns:function(){
var _5a8=this.options.isFitWidth?this.element.parent():this.element,_5a9=_5a8.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_5a9):this.options.columnWidth||this.$bricks.outerWidth(true)||_5a9;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_5a9+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_5aa){
var _5ab=$(_5aa),_5ac,_5ad,_5ae,_5af,j;
_5ac=Math.ceil(_5ab.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_5ac=Math.min(_5ac,this.cols);
if(_5ac===1){
_5ae=this.colYs;
}else{
_5ad=this.cols+1-_5ac;
_5ae=[];
for(j=0;j<_5ad;j++){
_5af=this.colYs.slice(j,j+_5ac);
_5ae[j]=Math.max.apply(Math,_5af);
}
}
var _5b0=Math.min.apply(Math,_5ae),_5b1=0;
for(var i=0,len=_5ae.length;i<len;i++){
if(_5ae[i]===_5b0){
_5b1=i;
break;
}
}
var _5b2={top:_5b0+this.offset.y};
_5b2[this.horizontalDirection]=this.columnWidth*_5b1+this.offset.x;
this.styleQueue.push({$el:_5ab,style:_5b2});
var _5b3=_5b0+_5ab.outerHeight(true),_5b4=this.cols+1-len;
for(i=0;i<_5b4;i++){
this.colYs[_5b1+i]=_5b3;
}
},resize:function(){
var _5b5=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_5b5){
this._reLayout();
}
},_reLayout:function(_5b6){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_5b6);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_5b7){
this.reloadItems();
this._init(_5b7);
},appended:function(_5b8,_5b9,_5ba){
if(_5b9){
this._filterFindBricks(_5b8).css({top:this.element.height()});
var _5bb=this;
setTimeout(function(){
_5bb._appended(_5b8,_5ba);
},1);
}else{
this._appended(_5b8,_5ba);
}
},_appended:function(_5bc,_5bd){
var _5be=this._getBricks(_5bc);
this.$bricks=this.$bricks.add(_5be);
this.layout(_5be,_5bd);
},remove:function(_5bf){
this.$bricks=this.$bricks.not(_5bf);
_5bf.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _5c0=this.element[0].style;
for(var prop in this.originalStyle){
_5c0[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_58f).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_5c1){
var _5c2=this,_5c3=_5c2.find("img").add(_5c2.filter("img")),len=_5c3.length,_5c4="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_5c5=[];
function _5c6(){
_5c1.call(_5c2,_5c3);
};
function _5c7(_5c8){
var img=_5c8.target;
if(img.src!==_5c4&&$.inArray(img,_5c5)===-1){
_5c5.push(img);
if(--len<=0){
setTimeout(_5c6);
_5c3.unbind(".imagesLoaded",_5c7);
}
}
};
if(!len){
_5c6();
}
_5c3.bind("load.imagesLoaded error.imagesLoaded",_5c7).each(function(){
var src=this.src;
this.src=_5c4;
this.src=src;
});
return _5c2;
};
var _5c9=function(_5ca){
if(_58f.console){
_58f.console.error(_5ca);
}
};
$.fn.masonry=function(_5cb){
if(typeof _5cb==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _5cc=$.data(this,"masonry");
if(!_5cc){
_5c9("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_5cb+"'");
return;
}
if(!$.isFunction(_5cc[_5cb])||_5cb.charAt(0)==="_"){
_5c9("no such method '"+_5cb+"' for masonry instance");
return;
}
_5cc[_5cb].apply(_5cc,args);
});
}else{
this.each(function(){
var _5cd=$.data(this,"masonry");
if(_5cd){
_5cd.option(_5cb||{});
_5cd._init();
}else{
$.data(this,"masonry",new $.Mason(_5cb,this));
}
});
}
return this;
};
})(window,jQuery);
(function($){
$.expander={version:"1.4.3",defaults:{slicePoint:100,preserveWords:true,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:false,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:true,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null}};
$.fn.expander=function(_5ce){
var meth="init";
if(typeof _5ce=="string"){
meth=_5ce;
_5ce={};
}
var opts=$.extend({},$.expander.defaults,_5ce),_5cf=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,_5d0=opts.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,_5d1=/<\/?(\w+)[^>]*>/g,_5d2=/<(\w+)[^>]*>/g,_5d3=/<\/(\w+)>/g,_5d4=/(<\/[^>]+>)\s*$/,_5d5=/^<[^>]+>.?/,_5d6;
var _5d7={init:function(){
this.each(function(){
var i,l,tmp,_5d8,_5d9,_5da,_5db,_5dc,_5dd,_5de,_5df,_5e0,_5e1=[],_5e2=[],_5e3={},_5e4=this,_5e5=$(this),_5e6=$([]),o=$.extend({},opts,_5e5.data("expander")||$.meta&&_5e5.data()||{}),_5e7=!!_5e5.find("."+o.detailClass).length,_5e8=!!_5e5.find("*").filter(function(){
var _5e9=$(this).css("display");
return (/^block|table|list/).test(_5e9);
}).length,el=_5e8?"div":"span",_5ea=el+"."+o.detailClass,_5eb="span."+o.moreClass,_5ec=o.expandSpeed||0,_5ed=$.trim(_5e5.html()),_5ee=$.trim(_5e5.text()),_5ef=_5ed.slice(0,o.slicePoint);
if($.data(this,"expanderInit")){
return;
}
$.data(this,"expanderInit",true);
$.each(["onSlice","beforeExpand","afterExpand","onCollapse"],function(_5f0,val){
_5e3[val]=$.isFunction(o[val]);
});
_5ef=_600(_5ef);
_5d9=_5ef.replace(_5d1,"").length;
while(_5d9<o.slicePoint){
_5d8=_5ed.charAt(_5ef.length);
if(_5d8=="<"){
_5d8=_5ed.slice(_5ef.length).match(_5d5)[0];
}
_5ef+=_5d8;
_5d9++;
}
_5ef=_600(_5ef,o.preserveWords);
_5da=_5ef.match(_5d2)||[];
_5db=_5ef.match(_5d3)||[];
tmp=[];
$.each(_5da,function(_5f1,val){
if(!_5cf.test(val)){
tmp.push(val);
}
});
_5da=tmp;
l=_5db.length;
for(i=0;i<l;i++){
_5db[i]=_5db[i].replace(_5d3,"$1");
}
$.each(_5da,function(_5f2,val){
var _5f3=val.replace(_5d2,"$1");
var _5f4=$.inArray(_5f3,_5db);
if(_5f4===-1){
_5e1.push(val);
_5e2.push("</"+_5f3+">");
}else{
_5db.splice(_5f4,1);
}
});
_5e2.reverse();
if(!_5e7){
_5dd=_5ed.slice(_5ef.length);
_5de=$.trim(_5dd.replace(_5d1,""));
if(_5de===""||_5de.split(/\s+/).length<o.widow){
return;
}
_5dc=_5e2.pop()||"";
_5ef+=_5e2.join("");
_5dd=_5e1.join("")+_5dd;
}else{
_5dd=_5e5.find(_5ea).remove().html();
_5ef=_5e5.html();
_5ed=_5ef+_5dd;
_5dc="";
}
o.moreLabel=_5e5.find(_5eb).length?"":_5ff(o);
if(_5e8){
_5dd=_5ed;
}
_5ef+=_5dc;
o.summary=_5ef;
o.details=_5dd;
o.lastCloseTag=_5dc;
if(_5e3.onSlice){
tmp=o.onSlice.call(_5e4,o);
o=tmp&&tmp.details?tmp:o;
}
var html=_5fc(o,_5e8);
_5e5.html(html);
_5df=_5e5.find(_5ea);
_5e0=_5e5.find(_5eb);
_5df[o.collapseEffect](0);
_5e0.find("a").unbind("click.expander").bind("click.expander",_5f5);
_5e6=_5e5.find("div."+o.summaryClass);
if(o.userCollapse&&!_5e5.find("span."+o.lessClass).length){
_5e5.find(_5ea).append("<span class=\""+o.lessClass+"\">"+o.userCollapsePrefix+"<a href=\"#\">"+o.userCollapseText+"</a></span>");
}
_5e5.find("span."+o.lessClass+" a").unbind("click.expander").bind("click.expander",function(_5f6){
_5f6.preventDefault();
clearTimeout(_5d6);
var _5f7=$(this).closest(_5ea);
_602(o,_5f7);
if(_5e3.onCollapse){
o.onCollapse.call(_5e4,true);
}
});
function _5f5(_5f8){
_5f8.preventDefault();
_5e0.hide();
_5e6.hide();
if(_5e3.beforeExpand){
o.beforeExpand.call(_5e4);
}
_5df.stop(false,true)[o.expandEffect](_5ec,function(){
_5df.css({zoom:""});
if(_5e3.afterExpand){
o.afterExpand.call(_5e4);
}
_5f9(o,_5df,_5e4);
});
};
});
},destroy:function(){
if(!this.data("expander")){
return;
}
this.removeData("expander");
this.each(function(){
var _5fa=$(this),o=$.meta?$.extend({},opts,_5fa.data()):opts,_5fb=_5fa.find("."+o.detailClass).contents();
_5fa.find("."+o.moreClass).remove();
_5fa.find("."+o.summaryClass).remove();
_5fa.find("."+o.detailClass).after(_5fb).remove();
_5fa.find("."+o.lessClass).remove();
});
}};
if(_5d7[meth]){
_5d7[meth].call(this);
}
function _5fc(o,_5fd){
var el="span",_5fe=o.summary;
if(_5fd){
el="div";
if(_5d4.test(_5fe)&&!o.expandAfterSummary){
_5fe=_5fe.replace(_5d4,o.moreLabel+"$1");
}else{
_5fe+=o.moreLabel;
}
_5fe="<div class=\""+o.summaryClass+"\">"+_5fe+"</div>";
}else{
_5fe+=o.moreLabel;
}
return [_5fe,"<",el+" class=\""+o.detailClass+"\"",">",o.details,"</"+el+">"].join("");
};
function _5ff(o){
var ret="<span class=\""+o.moreClass+"\">"+o.expandPrefix;
ret+="<a href=\"#\">"+o.expandText+"</a></span>";
return ret;
};
function _600(txt,_601){
if(txt.lastIndexOf("<")>txt.lastIndexOf(">")){
txt=txt.slice(0,txt.lastIndexOf("<"));
}
if(_601){
txt=txt.replace(_5d0,"");
}
return $.trim(txt);
};
function _602(o,el){
el.stop(true,true)[o.collapseEffect](o.collapseSpeed,function(){
var _603=el.prev("span."+o.moreClass).show();
if(!_603.length){
el.parent().children("div."+o.summaryClass).show().find("span."+o.moreClass).show();
}
});
};
function _5f9(_604,_605,_606){
if(_604.collapseTimer){
_5d6=setTimeout(function(){
_602(_604,_605);
if($.isFunction(_604.onCollapse)){
_604.onCollapse.call(_606,false);
}
},_604.collapseTimer);
}
};
return this;
};
$.fn.expander.defaults=$.expander.defaults;
})(jQuery);
(function($){
$.fn.checkLikeRadio=function(){
var that=this;
this.each(function(){
$(this).click(function(){
if($(this).attr("checked")){
var _607=$(this);
$(that).each(function(){
if($(this)[0]!==_607[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_608){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _608=="function"){
_608={success:_608};
}
var _609=this.attr("action");
var url=(typeof _609==="string")?$.trim(_609):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_608=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_608);
var veto={};
this.trigger("form-pre-serialize",[this,_608,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_608.beforeSerialize&&_608.beforeSerialize(this,_608)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_608.semantic);
if(_608.data){
_608.extraData=_608.data;
for(n in _608.data){
if(_608.data[n] instanceof Array){
for(var k in _608.data[n]){
a.push({name:n,value:_608.data[n][k]});
}
}else{
v=_608.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_608.beforeSubmit&&_608.beforeSubmit(a,this,_608)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_608,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_608.type.toUpperCase()=="GET"){
_608.url+=(_608.url.indexOf("?")>=0?"&":"?")+q;
_608.data=null;
}else{
_608.data=q;
}
var _60a=this,_60b=[];
if(_608.resetForm){
_60b.push(function(){
_60a.resetForm();
});
}
if(_608.clearForm){
_60b.push(function(){
_60a.clearForm();
});
}
if(!_608.dataType&&_608.target){
var _60c=_608.success||function(){
};
_60b.push(function(data){
var fn=_608.replaceTarget?"replaceWith":"html";
$(_608.target)[fn](data).each(_60c,arguments);
});
}else{
if(_608.success){
_60b.push(_608.success);
}
}
_608.success=function(data,_60d,xhr){
var _60e=_608.context||_608;
for(var i=0,max=_60b.length;i<max;i++){
_60b[i].apply(_60e,[data,_60d,xhr||_60a,_60a]);
}
};
var _60f=$("input:file",this).length>0;
var mp="multipart/form-data";
var _610=(_60a.attr("enctype")==mp||_60a.attr("encoding")==mp);
if(_608.iframe!==false&&(_60f||_608.iframe||_610)){
if(_608.closeKeepAlive){
$.get(_608.closeKeepAlive,_611);
}else{
_611();
}
}else{
$.ajax(_608);
}
this.trigger("form-submit-notify",[this,_608]);
return this;
function _611(){
var form=_60a[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_608);
s.context=s.context||s;
var id="jqFormIO"+(new Date().getTime()),fn="_"+id;
var $io=$("<iframe id=\""+id+"\" name=\""+id+"\" src=\""+s.iframeSrc+"\" />");
var io=$io[0];
$io.css({position:"absolute",top:"-1000px",left:"-1000px"});
var xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){
},getResponseHeader:function(){
},setRequestHeader:function(){
},abort:function(){
log("aborting upload...");
var e="aborted";
this.aborted=1;
$io.attr("src",s.iframeSrc);
xhr.error=e;
s.error&&s.error.call(s.context,xhr,"error",e);
g&&$.event.trigger("ajaxError",[xhr,s,e]);
s.complete&&s.complete.call(s.context,xhr,"error");
}};
var g=s.global;
if(g&&!$.active++){
$.event.trigger("ajaxStart");
}
if(g){
$.event.trigger("ajaxSend",[xhr,s]);
}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){
if(s.global){
$.active--;
}
return;
}
if(xhr.aborted){
return;
}
var _612=0;
var sub=form.clk;
if(sub){
var n=sub.name;
if(n&&!sub.disabled){
s.extraData=s.extraData||{};
s.extraData[n]=sub.value;
if(sub.type=="image"){
s.extraData[n+".x"]=form.clk_x;
s.extraData[n+".y"]=form.clk_y;
}
}
}
function _613(){
var t=_60a.attr("target"),a=_60a.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_60a.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_612=true;
cb();
},s.timeout);
}
var _614=[];
try{
if(s.extraData){
for(var n in s.extraData){
_614.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
}
}
$io.appendTo("body");
io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,false);
form.submit();
}
finally{
form.setAttribute("action",a);
if(t){
form.setAttribute("target",t);
}else{
_60a.removeAttr("target");
}
$(_614).remove();
}
};
if(s.forceSync){
_613();
}else{
setTimeout(_613,10);
}
var data,doc,_615=50;
function cb(){
if(xhr.aborted){
return;
}
var doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;
if(!doc||doc.location.href==s.iframeSrc){
return;
}
io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,false);
var ok=true;
try{
if(_612){
throw "timeout";
}
var _616=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_616);
if(!_616&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_615){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_617){
var _618={"content-type":s.dataType};
return _618[_617];
};
var scr=/(json|script)/.test(s.dataType);
if(scr||s.textarea){
var ta=doc.getElementsByTagName("textarea")[0];
if(ta){
xhr.responseText=ta.value;
}else{
if(scr){
var pre=doc.getElementsByTagName("pre")[0];
var b=doc.getElementsByTagName("body")[0];
if(pre){
xhr.responseText=pre.textContent;
}else{
if(b){
xhr.responseText=b.innerHTML;
}
}
}
}
}else{
if(s.dataType=="xml"&&!xhr.responseXML&&xhr.responseText!=null){
xhr.responseXML=_619(xhr.responseText);
}
}
data=_61b(xhr,s.dataType,s);
}
catch(e){
log("error caught:",e);
ok=false;
xhr.error=e;
s.error&&s.error.call(s.context,xhr,"error",e);
g&&$.event.trigger("ajaxError",[xhr,s,e]);
}
if(xhr.aborted){
log("upload aborted");
ok=false;
}
if(ok){
s.success&&s.success.call(s.context,data,"success",xhr);
g&&$.event.trigger("ajaxSuccess",[xhr,s]);
}
g&&$.event.trigger("ajaxComplete",[xhr,s]);
if(g&&!--$.active){
$.event.trigger("ajaxStop");
}
s.complete&&s.complete.call(s.context,xhr,ok?"success":"error");
setTimeout(function(){
$io.removeData("form-plugin-onload");
$io.remove();
xhr.responseXML=null;
},100);
};
var _619=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _61a=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _61b=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_61a(data);
}else{
if(type==="script"||!type&&ct.indexOf("javascript")>=0){
$.globalEval(data);
}
}
}
return data;
};
};
};
$.fn.ajaxForm=function(_61c){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_61c);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_61c);
}
}).bind("click.form-plugin",function(e){
var _61d=e.target;
var $el=$(_61d);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_61d=t[0];
}
var form=this;
form.clk=_61d;
if(_61d.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _61e=$el.offset();
form.clk_x=e.pageX-_61e.left;
form.clk_y=e.pageY-_61e.top;
}else{
form.clk_x=e.pageX-_61d.offsetLeft;
form.clk_y=e.pageY-_61d.offsetTop;
}
}
}
setTimeout(function(){
form.clk=form.clk_x=form.clk_y=null;
},100);
});
};
$.fn.ajaxFormUnbind=function(){
return this.unbind("submit.form-plugin click.form-plugin");
};
$.fn.formToArray=function(_61f){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_61f?form.getElementsByTagName("*"):form.elements;
if(!els){
return a;
}
var i,j,n,v,el,max,jmax;
for(i=0,max=els.length;i<max;i++){
el=els[i];
n=el.name;
if(!n){
continue;
}
if(_61f&&form.clk&&el.type=="image"){
if(!el.disabled&&form.clk==el){
a.push({name:n,value:$(el).val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
continue;
}
v=$.fieldValue(el,true);
if(v&&v.constructor==Array){
for(j=0,jmax=v.length;j<jmax;j++){
a.push({name:n,value:v[j]});
}
}else{
if(v!==null&&typeof v!="undefined"){
a.push({name:n,value:v});
}
}
}
if(!_61f&&form.clk){
var _620=$(form.clk),_621=_620[0];
n=_621.name;
if(n&&!_621.disabled&&_621.type=="image"){
a.push({name:n,value:_620.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_622){
return $.param(this.formToArray(_622));
};
$.fn.fieldSerialize=function(_623){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_623);
if(v&&v.constructor==Array){
for(var i=0,max=v.length;i<max;i++){
a.push({name:n,value:v[i]});
}
}else{
if(v!==null&&typeof v!="undefined"){
a.push({name:this.name,value:v});
}
}
});
return $.param(a);
};
$.fn.fieldValue=function(_624){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_624);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_625){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_625===undefined){
_625=true;
}
if(_625&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _626=el.selectedIndex;
if(_626<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_626+1:ops.length);
for(var i=(one?_626:0);i<max;i++){
var op=ops[i];
if(op.selected){
var v=op.value;
if(!v){
v=(op.attributes&&op.attributes["value"]&&!(op.attributes["value"].specified))?op.text:op.value;
}
if(one){
return v;
}
a.push(v);
}
}
return a;
}
return $(el).val();
};
$.fn.clearForm=function(){
return this.each(function(){
$("input,select,textarea",this).clearFields();
});
};
$.fn.clearFields=$.fn.clearInputs=function(){
return this.each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
});
};
$.fn.resetForm=function(){
return this.each(function(){
if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){
this.reset();
}
});
};
$.fn.enable=function(b){
if(b===undefined){
b=true;
}
return this.each(function(){
this.disabled=!b;
});
};
$.fn.selected=function(_627){
if(_627===undefined){
_627=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_627;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_627&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_627;
}
}
});
};
function log(){
if($.fn.ajaxSubmit.debug){
var msg="[jquery.form] "+Array.prototype.join.call(arguments,"");
if(window.console&&window.console.log){
window.console.log(msg);
}else{
if(window.opera&&window.opera.postError){
window.opera.postError(msg);
}
}
}
};
})(jQuery);
(function($){
$.ui=$.ui||{};
$.fn.extend({accordion:function(_628,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _628=="string"){
var _629=$.data(this,"ui-accordion");
_629[_628].apply(_629,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_628));
}
}
});
},activate:function(_62a){
return this.accordion("activate",_62a);
}});
$.ui.accordion=function(_62b,_62c){
this.options=_62c=$.extend({},$.ui.accordion.defaults,_62c);
this.element=_62b;
$(_62b).addClass("ui-accordion");
if(_62c.navigation){
var _62d=$(_62b).find("a").filter(_62c.navigationFilter);
if(_62d.length){
if(_62d.filter(_62c.header).length){
_62c.active=_62d;
}else{
_62c.active=_62d.parent().parent().prev();
_62d.addClass("current");
}
}
}
_62c.headers=$(_62b).find(_62c.header);
_62c.active=_62e(_62c.headers,_62c.active);
if(_62c.fillSpace){
var _62f=$(_62b).parent().height();
_62c.headers.each(function(){
_62f-=$(this).outerHeight();
});
var _630=0;
_62c.headers.next().each(function(){
_630=Math.max(_630,$(this).innerHeight()-$(this).height());
}).height(_62f-_630);
}else{
if(_62c.autoheight){
var _62f=0;
_62c.headers.next().each(function(){
_62f=Math.max(_62f,$(this).outerHeight());
}).height(_62f);
}
}
_62c.headers.not(_62c.active||"").next().hide();
_62c.active.parent().andSelf().addClass(_62c.selectedClass);
if(_62c.event){
$(_62b).bind((_62c.event)+".ui-accordion",_631);
}
};
$.ui.accordion.prototype={activate:function(_632){
_631.call(this.element,{target:_62e(this.options.headers,_632)[0]});
},enable:function(){
this.options.disabled=false;
},disable:function(){
this.options.disabled=true;
},destroy:function(){
this.options.headers.next().css("display","");
if(this.options.fillSpace||this.options.autoheight){
this.options.headers.next().css("height","");
}
$.removeData(this.element,"ui-accordion");
$(this.element).removeClass("ui-accordion").unbind(".ui-accordion");
}};
function _633(_634,_635){
return function(){
return _634.apply(_635,arguments);
};
};
function _636(_637){
if(!$.data(this,"ui-accordion")){
return;
}
var _638=$.data(this,"ui-accordion");
var _639=_638.options;
_639.running=_637?0:--_639.running;
if(_639.running){
return;
}
if(_639.clearStyle){
_639.toShow.add(_639.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_639.data],_639.change);
};
function _63a(_63b,_63c,data,_63d,down){
var _63e=$.data(this,"ui-accordion").options;
_63e.toShow=_63b;
_63e.toHide=_63c;
_63e.data=data;
var _63f=_633(_636,this);
_63e.running=_63c.size()==0?_63b.size():_63c.size();
if(_63e.animated){
if(!_63e.alwaysOpen&&_63d){
$.ui.accordion.animations[_63e.animated]({toShow:jQuery([]),toHide:_63c,complete:_63f,down:down,autoheight:_63e.autoheight});
}else{
$.ui.accordion.animations[_63e.animated]({toShow:_63b,toHide:_63c,complete:_63f,down:down,autoheight:_63e.autoheight});
}
}else{
if(!_63e.alwaysOpen&&_63d){
_63b.toggle();
}else{
_63c.hide();
_63b.show();
}
_63f(true);
}
};
function _631(_640){
var _641=$.data(this,"ui-accordion").options;
if(_641.disabled){
return false;
}
if(!_640.target&&!_641.alwaysOpen){
_641.active.parent().andSelf().toggleClass(_641.selectedClass);
var _642=_641.active.next(),data={instance:this,options:_641,newHeader:jQuery([]),oldHeader:_641.active,newContent:jQuery([]),oldContent:_642},_643=_641.active=$([]);
_63a.call(this,_643,_642,data);
return false;
}
var _644=$(_640.target);
if(_644.parents(_641.header).length){
while(!_644.is(_641.header)){
_644=_644.parent();
}
}
var _645=_644[0]==_641.active[0];
if(_641.running||(_641.alwaysOpen&&_645)){
return false;
}
if(!_644.is(_641.header)){
return;
}
_641.active.parent().andSelf().toggleClass(_641.selectedClass);
if(!_645){
_644.parent().andSelf().addClass(_641.selectedClass);
}
var _643=_644.next(),_642=_641.active.next(),data={instance:this,options:_641,newHeader:_644,oldHeader:_641.active,newContent:_643,oldContent:_642},down=_641.headers.index(_641.active[0])>_641.headers.index(_644[0]);
_641.active=_645?$([]):_644;
_63a.call(this,_643,_642,data,_645,down);
return false;
};
function _62e(_646,_647){
return _647!=undefined?typeof _647=="number"?_646.filter(":eq("+_647+")"):_646.not(_646.not(_647)):_647===false?$([]):_646.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_648,_649){
_648=$.extend({easing:"swing",duration:300},_648,_649);
if(!_648.toHide.size()){
_648.toShow.animate({height:"show"},_648);
return;
}
var _64a=_648.toHide.height(),_64b=_648.toShow.height(),_64c=_64b/_64a;
_648.toShow.css({height:0,overflow:"hidden"}).show();
_648.toHide.filter(":hidden").each(_648.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _64d=(_64a-now)*_64c;
if($.browser.msie||$.browser.opera){
_64d=Math.ceil(_64d);
}
_648.toShow.height(_64d);
},duration:_648.duration,easing:_648.easing,complete:function(){
if(!_648.autoheight){
_648.toShow.css("height","auto");
}
_648.complete();
}});
},bounceslide:function(_64e){
this.slide(_64e,{easing:_64e.down?"bounceout":"swing",duration:_64e.down?1000:200});
},easeslide:function(_64f){
this.slide(_64f,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_650,_651,wrap,_652,_653,_654,_655,_656,_657=0,_658={},_659=[],_65a=0,_65b={},_65c=[],_65d=null,_65e=new Image(),_65f=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_660=/[^\.]\.(swf)\s*$/i,_661,_662=1,_663,_664,busy=false,_665=20,fx=$.extend($("<div/>")[0],{prop:0}),_666=0,_667=!$.support.opacity&&!window.XMLHttpRequest,_668=function(){
_650.hide();
_65e.onerror=_65e.onload=null;
if(_65d){
_65d.abort();
}
tmp.empty();
},_669=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_66a=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_66b=function(){
var view=_66a(),to={},_66c=_65b.margin,_66d=_65b.autoScale,_66e=(_665+_66c)*2,_66f=(_665+_66c)*2,_670=(_65b.padding*2),_671;
if(_65b.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_65b.width))/100)-(_665*2);
_66d=false;
}else{
to.width=_65b.width+_670;
}
if(_65b.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_65b.height))/100)-(_665*2);
_66d=false;
}else{
to.height=_65b.height+_670;
}
if(_66d&&(to.width>(view[0]-_66e)||to.height>(view[1]-_66f))){
if(_658.type=="image"||_658.type=="swf"){
_66e+=_670;
_66f+=_670;
_671=Math.min(Math.min(view[0]-_66e,_65b.width)/_65b.width,Math.min(view[1]-_66f,_65b.height)/_65b.height);
to.width=Math.round(_671*(to.width-_670))+_670;
to.height=Math.round(_671*(to.height-_670))+_670;
}else{
to.width=Math.min(to.width,(view[0]-_66e));
to.height=Math.min(to.height,(view[1]-_66f));
}
}
to.top=view[3]+((view[1]-(to.height+(_665*2)))*0.5);
if(_65b.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_665*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_65b.minWidth)+(_665*2)))*0.5);
}
if(_65b.autoScale===false){
to.top=Math.max(view[3]+_66c,to.top);
to.left=Math.max(view[2]+_66c,to.left);
}
return to;
},_672=function(_673){
if(_673&&_673.length){
switch(_65b.titlePosition){
case "inside":
return _673;
case "over":
return "<span id=\"fancybox-title-over\">"+_673+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_673+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_674=function(){
var _675=_65b.title,_676=_664.width-(_65b.padding*2),_677="fancybox-title-"+_65b.titlePosition;
$("#fancybox-title").remove();
_666=0;
if(_65b.titleShow===false){
return;
}
_675=$.isFunction(_65b.titleFormat)?_65b.titleFormat(_675,_65c,_65a,_65b):_672(_675);
if(!_675||_675===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_677+"\" />").css({"width":_676,"paddingLeft":_65b.padding,"paddingRight":_65b.padding}).html(_675).appendTo("body");
switch(_65b.titlePosition){
case "inside":
_666=$("#fancybox-title").outerHeight(true)-_65b.padding;
_664.height+=_666;
break;
case "over":
$("#fancybox-title").css("bottom",_65b.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_652).hide();
},_678=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_65b.enableEscapeButton){
e.preventDefault();
$.fancybox.close();
}else{
if(e.keyCode==37){
e.preventDefault();
$.fancybox.prev();
}else{
if(e.keyCode==39){
e.preventDefault();
$.fancybox.next();
}
}
}
});
if($.fn.mousewheel){
wrap.unbind("mousewheel.fb");
if(_65c.length>1){
wrap.bind("mousewheel.fb",function(e,_679){
e.preventDefault();
if(busy||_679===0){
return;
}
if(_679>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_65b.showNavArrows){
return;
}
if((_65b.cyclic&&_65c.length>1)||_65a!==0){
_655.show();
}
if((_65b.cyclic&&_65c.length>1)||_65a!=(_65c.length-1)){
_656.show();
}
},_67a=function(){
var href,_67b;
if((_65c.length-1)>_65a){
href=_65c[_65a+1].href;
if(typeof href!=="undefined"&&href.match(_65f)){
_67b=new Image();
_67b.src=href;
}
}
if(_65a>0){
href=_65c[_65a-1].href;
if(typeof href!=="undefined"&&href.match(_65f)){
_67b=new Image();
_67b.src=href;
}
}
},_67c=function(){
_653.css("overflow",(_65b.scrolling=="auto"?(_65b.type=="image"||_65b.type=="iframe"||_65b.type=="swf"?"hidden":"auto"):(_65b.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_653.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_65b.hideOnContentClick){
_653.one("click",$.fancybox.close);
}
if(_65b.hideOnOverlayClick){
_651.one("click",$.fancybox.close);
}
if(_65b.showCloseButton){
_654.show();
}
_678();
$(window).bind("resize.fb",$.fancybox.center);
if(_65b.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_65b.onComplete)){
_65b.onComplete(_65c,_65a,_65b);
}
busy=false;
_67a();
},_67d=function(pos){
var _67e=Math.round(_663.width+(_664.width-_663.width)*pos),_67f=Math.round(_663.height+(_664.height-_663.height)*pos),top=Math.round(_663.top+(_664.top-_663.top)*pos),left=Math.round(_663.left+(_664.left-_663.left)*pos);
wrap.css({"width":_67e+"px","height":_67f+"px","top":top+"px","left":left+"px"});
_67e=Math.max(_67e-_65b.padding*2,0);
_67f=Math.max(_67f-(_65b.padding*2+(_666*pos)),0);
_653.css({"width":_67e+"px","height":_67f+"px"});
if(typeof _664.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_680=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_681=function(){
var orig=_658.orig?$(_658.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_680(orig);
from={width:(pos.width+(_65b.padding*2)),height:(pos.height+(_65b.padding*2)),top:(pos.top-_65b.padding-_665),left:(pos.left-_65b.padding-_665)};
}else{
view=_66a();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_682=function(){
_650.hide();
if(wrap.is(":visible")&&$.isFunction(_65b.onCleanup)){
if(_65b.onCleanup(_65c,_65a,_65b)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_65c=_659;
_65a=_657;
_65b=_658;
_653.get(0).scrollTop=0;
_653.get(0).scrollLeft=0;
if(_65b.overlayShow){
if(_667){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_651.css({"background-color":_65b.overlayColor,"opacity":_65b.overlayOpacity}).unbind().show();
}
_653.css("background-color",_65b.innerColor);
_664=_66b();
_674();
if(wrap.is(":visible")){
$(_654.add(_655).add(_656)).hide();
var pos=wrap.position(),_683;
_663={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_683=(_663.width==_664.width&&_663.height==_664.height);
_653.fadeOut(_65b.changeFade,function(){
var _684=function(){
_653.html(tmp.contents()).fadeIn(_65b.changeFade,_67c);
};
$.event.trigger("fancybox-change");
_653.empty().css("overflow","hidden");
if(_683){
_653.css({top:_65b.padding,left:_65b.padding,width:Math.max(_664.width-(_65b.padding*2),1),height:Math.max(_664.height-(_65b.padding*2)-_666,1)});
_684();
}else{
_653.css({top:_65b.padding,left:_65b.padding,width:Math.max(_663.width-(_65b.padding*2),1),height:Math.max(_663.height-(_65b.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_65b.changeSpeed,easing:_65b.easingChange,step:_67d,complete:_684});
}
});
return;
}
wrap.css("opacity",1);
if(_65b.transitionIn=="elastic"){
_663=_681();
_653.css({top:_65b.padding,left:_65b.padding,width:Math.max(_663.width-(_65b.padding*2),1),height:Math.max(_663.height-(_65b.padding*2),1)}).html(tmp.contents());
wrap.css(_663).show();
if(_65b.opacity){
_664.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_65b.speedIn,easing:_65b.easingIn,step:_67d,complete:_67c});
}else{
_653.css({top:_65b.padding,left:_65b.padding,width:Math.max(_664.width-(_65b.padding*2),1),height:Math.max(_664.height-(_65b.padding*2)-_666,1)}).html(tmp.contents());
wrap.css(_664).fadeIn(_65b.transitionIn=="none"?0:_65b.speedIn,_67c);
}
},_685=function(){
tmp.width(_658.width);
tmp.height(_658.height);
if(_658.width=="auto"){
_658.width=tmp.width();
}
if(_658.height=="auto"){
_658.height=tmp.height();
}
_682();
},_686=function(){
busy=true;
_658.width=_65e.width;
_658.height=_65e.height;
$("<img />").attr({"id":"fancybox-img","src":_65e.src,"alt":_658.title}).appendTo(tmp);
_682();
},_687=function(){
_668();
var obj=_659[_657],href,type,_688,str,emb,_689,data;
_658=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_658:$(obj).data("fancybox")));
_688=obj.title||$(obj).title||_658.title||"";
if(obj.nodeName&&!_658.orig){
_658.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_688===""&&_658.orig){
_688=_658.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_658.href||jq(obj).attr("href")||null;
}else{
href=_658.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_658.type){
type=_658.type;
if(!href){
href=_658.content;
}
}else{
if(_658.content){
type="html";
}else{
if(href){
if(href.match(_65f)){
type="image";
}else{
if(href.match(_660)){
type="swf";
}else{
if($(obj).hasClass("iframe")){
type="iframe";
}else{
if(href.match(/#/)){
obj=href.substr(href.indexOf("#"));
type=$(obj).length>0?"inline":"ajax";
}else{
type="ajax";
}
}
}
}
}else{
type="inline";
}
}
}
_658.type=type;
_658.href=href;
_658.title=_688;
if(_658.autoDimensions&&_658.type!=="iframe"&&_658.type!=="swf"){
_658.width="auto";
_658.height="auto";
}
if(_658.modal){
_658.overlayShow=true;
_658.hideOnOverlayClick=false;
_658.hideOnContentClick=false;
_658.enableEscapeButton=false;
_658.showCloseButton=false;
}
if($.isFunction(_658.onStart)){
if(_658.onStart(_659,_657,_658)===false){
busy=false;
return;
}
}
tmp.css("padding",(_665+_658.padding+_658.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_653.children());
});
switch(type){
case "html":
tmp.html(_658.content);
_685();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_653.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_685();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_65e=new Image();
_65e.onerror=function(){
_669();
};
_65e.onload=function(){
_65e.onerror=null;
_65e.onload=null;
_686();
};
_65e.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_658.width+"\" height=\""+_658.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_658.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_658.width+"\" height=\""+_658.height+"\""+emb+"></embed></object>";
tmp.html(str);
_685();
break;
case "ajax":
_689=href.split("#",2);
data=_658.ajax.data||{};
if(_689.length>1){
href=_689[0];
if(typeof data=="string"){
data+="&selector="+_689[1];
}else{
data.selector=_689[1];
}
}
busy=false;
$.fancybox.showActivity();
_65d=$.ajax($.extend(_658.ajax,{url:href,data:data,error:_669,success:function(data,_68a,_68b){
if(_65d.status==200){
tmp.html(data);
_685();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_658.scrolling+"\" src=\""+_658.href+"\"></iframe>").appendTo(tmp);
_682();
break;
}
},_68c=function(){
if(!_650.is(":visible")){
clearInterval(_661);
return;
}
$("div",_650).css("top",(_662*-40)+"px");
_662=(_662+1)%12;
},_68d=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_650=$("<div id=\"fancybox-loading\"><div></div></div>"),_651=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_650.addClass("fancybox-ie");
}
_652=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_652.append(_653=$("<div id=\"fancybox-inner\"></div>"),_654=$("<a id=\"fancybox-close\"></a>"),_655=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_656=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_654.click($.fancybox.close);
_650.click($.fancybox.cancel);
_655.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_656.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_667){
_651.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_650.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_652.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_68e){
$(this).data("fancybox",$.extend({},_68e,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_659=[];
_657=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_659.push(this);
}else{
_659=$("a[rel="+rel+"], area[rel="+rel+"]");
_657=_659.index(this);
}
_687();
return false;
});
return this;
};
$.fancybox=function(obj){
if(busy){
return;
}
busy=true;
var opts=typeof arguments[1]!=="undefined"?arguments[1]:{};
_659=[];
_657=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_659=jQuery.merge(_659,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_659.push(obj);
}
if(_657>_659.length||_657<0){
_657=0;
}
_687();
};
$.fancybox.showActivity=function(){
clearInterval(_661);
_650.show();
_661=setInterval(_68c,66);
};
$.fancybox.update=function(rel){
_659=$("a[rel="+rel+"], area[rel="+rel+"]");
};
$.fancybox.hideActivity=function(){
_650.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_65a+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_65a-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_65c.length>pos){
_657=pos;
_687();
}
if(_65b.cyclic&&_65c.length>1&&pos<0){
_657=_65c.length-1;
_687();
}
if(_65b.cyclic&&_65c.length>1&&pos>=_65c.length){
_657=0;
_687();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_668();
if(_658&&$.isFunction(_658.onCancel)){
_658.onCancel(_659,_657,_658);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_65b&&$.isFunction(_65b.onCleanup)){
if(_65b.onCleanup(_65c,_65a,_65b)===false){
busy=false;
return;
}
}
_668();
$(_654.add(_655).add(_656)).hide();
$("#fancybox-title").remove();
wrap.add(_653).add(_651).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _68f(){
_651.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_653.empty();
if($.isFunction(_65b.onClosed)){
_65b.onClosed(_65c,_65a,_65b);
}
_65c=_658=[];
_65a=_657=0;
_65b=_658={};
busy=false;
};
_653.css("overflow","hidden");
if(_65b.transitionOut=="elastic"){
_663=_681();
var pos=wrap.position();
_664={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_65b.opacity){
_664.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_65b.speedOut,easing:_65b.easingOut,step:_67d,complete:_68f});
}else{
wrap.fadeOut(_65b.transitionOut=="none"?0:_65b.speedOut,_68f);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_653.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_65b.padding*2)+_666});
_653.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_66a(),_690=_65b.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_666)+(_665*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_665*2)))*0.5);
to.top=Math.max(view[3]+_690,to.top);
to.left=Math.max(view[2]+_690,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",innerColor:"inherited",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_68d();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_691){
this._container=jQuery(_691);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_692){
};
HubPages.Lightbox.f$=function(_693){
return jQuery(_693,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_694){
return jQuery(_694,this._container);
};
HubPages.Lightbox.MyPhotos=function(_695){
this._container=jQuery(_695);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_696,_697,_698){
if(_696!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_697.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_697.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_697);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_698<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_696,_697,_698+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_699){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_699);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_69a,_69b,_69c){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_69a[_69b]).attr("href");
var _69d=href.lastIndexOf("/");
var _69e=_69d==-1?0:href.slice(_69d+1,-4);
this._currentImageId=_69e;
jQuery.post("/xml/photos/locations/",{id:_69e},jQuery.proxy(function(_69f){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_69e,_69f,0);
},this));
};
HubPages.Lightbox.MyPhotos.prototype.isLoadComplete=function(){
return this._ready;
};
HubPages.Lightbox.MyPhotos.prototype.loadStarted=function(){
this._ready=false;
};
HubPages.Lightbox.MyPhotos.prototype.loadCompleted=function(){
this._ready=true;
};
HubPages.Lightbox.Slideshow=function(_6a0){
this._id=_6a0.id;
this._title=_6a0.title;
this._url=_6a0.url;
this._type=_6a0.type;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_6a0.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_6a1){
var id=_6a1.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_6a1);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_6a1.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(_6a2,_6a3){
var self=this;
if(this._type=="Hub"){
self._start=0;
jQuery.ajax({async:false,data:{id:this._id},dataType:"json",error:function(jxhr,_6a4,_6a5){
alert("Something went wrong. Please, reload the page.");
},success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
}else{
if(_6a2===undefined){
self._start=0;
self._limit=10;
}else{
self._start=_6a2;
self._limit=_6a3;
}
jQuery.ajax({async:false,data:{userId:this._id,start:self._start,limit:self._limit},dataType:"json",error:function(jxhr,_6a6,_6a7){
alert("Something went wrong. Please, reload the page.");
},success:function(data){
if(self._container.size()!==0){
HubPages.Lightbox.Slideshow.loadImages.call(self,data.images);
self._photoData.images=self._photoData.images.concat(data.images);
}else{
self._buildGui.call(self,data);
}
},timeout:6000,type:"GET",url:"/slideshow/"});
}
};
HubPages.Lightbox.Slideshow.prototype._buildGui=function(data){
this._container=jQuery("<div />").attr("id","slideshow_"+this._id);
this._container.addClass("slideshow").hide().appendTo("body");
this._photoData=data;
this._lastIndex=-1;
jQuery("body").delegate("#fancybox-wrap, #fancybox-inner, #fancybox-inner .content","mouseenter",function(){
if(!jq(this).hasClass("slide_image")){
return;
}
jQuery("#fancybox-right-ico").show();
jQuery("#fancybox-left-ico").show();
});
jQuery("body").delegate("#fancybox-wrap","mouseleave",function(){
if(!jq(this).hasClass("slide_image")){
return;
}
jQuery("#fancybox-right-ico").hide();
jQuery("#fancybox-left-ico").hide();
});
HubPages.Lightbox.Slideshow.loadImages.call(this,data.images);
if(data.related!==undefined){
var _6a8=jQuery("<a />").attr("href","#related_slideshows_"+this._id);
_6a8.addClass("lightbox").attr("rel","slideshow_"+this._id);
_6a8.appendTo(this._container);
var _6a9=jQuery("<div />").attr("id","related_slideshows_"+this._id);
_6a9.addClass("related_slideshows");
if(data.related.length){
_6a9.append("<h2>View These Related Slideshows</h2>");
}else{
_6a9.append("<h2>This Hub has no related slideshows</h2>");
}
_6a9.appendTo(this._container);
var list=jQuery("<ul />");
_6a9.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_6a9);
}
var _6aa=jQuery("<li />");
_6aa.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _6ab=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),type:"Hub",auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _6ac=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_6ac);
_6aa.append(linkDiv);
_6aa.append("<br />");
var _6ad=jQuery("<img />").attr("src",item.thumb);
_6ad.appendTo(_6ab);
_6ab.appendTo(_6aa);
_6ab.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
}
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _6ae=jQuery("<div />").addClass("pinit_wrap");
_6ae.appendTo(this._socialBar);
var _6af=jQuery("<div />").addClass("twitter_wrap");
_6af.appendTo(this._socialBar);
var _6b0=jQuery("<div />").addClass("fb_share_wrap");
_6b0.appendTo(this._socialBar);
if(this._type=="Hub"){
_6af.html(data.social.twitter);
_6b0.html(data.social.fb_share);
}
this._container.append(this._socialBar.show());
jQuery.address.strict(false);
jQuery.address.externalChange(function(e){
var hash=e.value;
if(hash.substr(0,5)=="slide"){
imgId=hash.replace("slide","");
jQuery("#slideshow_img_"+imgId).click();
}else{
if(hash==""){
jQuery.fancybox.close();
}
}
});
this.c$("a.lightbox").fancybox(this.options);
jq(document).trigger("slideshow_loaded");
};
HubPages.Lightbox.Slideshow.loadImages=function(_6b1){
var _6b2=this._start;
jQuery.each(_6b1,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({id:"slideshow_img_"+item.id,href:"#"+this._id+"_"+_6b2,rel:"slideshow_"+this._id,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._id+"_"+_6b2}).addClass("content");
div.appendTo(this._container);
var _6b3=jQuery("<div />");
_6b3.appendTo(div);
var _6b4=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_6b4.data("source",item.source);
_6b4.appendTo(_6b3);
_6b2++;
},this));
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_6b5,_6b6,_6b7,_6b8,_6b9){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
if(_6b9===undefined){
_6b9="Normal";
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_6b5;
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("20%");
jQuery("body").delegate(_6b8,"click",function(e){
var _6ba=HubPages.Lightbox.Slideshow.defaultHubId,_6bb="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
jq("#fancybox-wrap").addClass("slide_image");
if(!HubPages.Lightbox.Slideshow._slides[_6ba]){
HubPages.Lightbox.Slideshow.create({id:_6ba,title:_6b6,url:_6b7,type:_6b9});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
if(_6b9=="Hub"){
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1"),link=jQuery(_6bb+":has(img[src*=\""+id+"\"])"),_6bc=jQuery(_6bb).index(link);
HubPages.Lightbox.Slideshow._slides[_6ba].init();
if(_6bc>=0){
jQuery(".slideshow:first > a").eq(_6bc).click();
}
}else{
jQuery(".slideshow:first > a").eq(0).click();
}
});
jQuery(window).resize(function(){
if(typeof (_6bd)!="undefined"){
clearTimeout(_6bd);
}
var _6bd=setTimeout(function(){
var _6be=jQuery("#fancybox-inner > div:visible").attr("id");
if(_6be){
jQuery(".slideshow a[href=#"+_6be+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._id);
var _6bf=this._container.size()==0;
if(_6bf){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_6c0,_6c1){
if(!jQuery("#fancybox-outer-title").length){
var _6c2=jQuery("<div />").attr("id","fancybox-outer-title");
var _6c3=jQuery("#fancybox-inner");
_6c3.before(_6c2);
}
var _6c4=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_6c4);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_6c5,_6c6){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
var _6c7=jq(window).scrollTop();
jQuery.address.value("");
jQuery(window).scrollTop(_6c7);
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_6c8,_6c9){
var _6ca=jQuery(".overlay_image").removeClass("overlay_image").css("visibility","hidden");
_6ca.siblings("div").remove();
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_6cb,_6cc){
jQuery.fancybox.hideActivity();
var _6cd=_6cc+1;
if(this._type!="Hub"){
if(_6cd===1){
jQuery("#fancybox-left").hide();
}else{
if(_6cd>1){
jQuery("#fancybox-left").show();
}
}
if(_6cd==(_6cb.length-1)&&_6cb.length<this._photoData.total_images){
this.load(_6cb.length,10);
jQuery.fancybox.update("slideshow_"+this._id);
}
}
if(this._type=="Hub"){
if(_6cd>=_6cb.length){
return;
}
}
var _6ce=HubPages.Lightbox.f$("#fancybox-inner");
_6ce.height(_6ce.height()-70).css("overflow","visible");
var _6cf=_6ce.find("> .content img");
var _6d0=this._photoData.images[_6cc];
if(this._type!="Hub"){
jQuery("#fancybox-outer-title > a").replaceWith(_6d0.url_title);
}
jq.address.value("slide"+_6d0.id);
_6cf.css({width:"auto",height:"auto",maxWidth:(_6ce.innerWidth()-60)+"px",maxHeight:(_6ce.innerHeight()-100)+"px"});
if(_6ce.innerHeight()>0&&_6cf.height()>0){
var _6d1=(_6ce.innerHeight()-_6cf.height())/2;
_6cf.parent().css({width:_6cf.width(),height:_6cf.height(),margin:"0px auto",paddingTop:"10px"});
_6cf.parent().css("margin-top",_6d1+"px");
_6cf.css("visibility","visible").addClass("overlay_image");
this.loadGoogleAds();
}else{
_6cf.load(function(){
var _6d2=HubPages.Lightbox.f$("#fancybox-inner");
var _6d3=_6d2.find("> .content img");
var _6d4=(_6d2.innerHeight()-_6d3.height())/2;
_6d3.parent().css({width:_6d3.width(),height:_6d3.height(),margin:"0px auto",paddingTop:"10px"});
_6d3.parent().css("margin-top",_6d4+"px");
_6d3.css("visibility","visible").addClass("overlay_image");
this.loadGoogleAds();
}.bind(this));
}
var _6d5=jQuery(_6cb[_6cc]).attr("rel");
var _6d6=jQuery("#"+_6d5).find(".content img");
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_6d0.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _6d7="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_6d7+="&labels="+escape(this._photoData.quantcastLabel);
}
var _6d8=new Image();
_6d8.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_6d7;
}
if(this._photoData.ctracking){
var _6d9=new Image();
_6d9.src=this._photoData.ctracking+"&"+(new Date()).getTime();
}
var _6da=HubPages.Lightbox.f$("#fancybox-title");
if(_6d0.sourceUrl||_6d0.sourceName){
if(_6d0.sourceUrl){
var _6db="<a href=\""+_6d0.sourceUrl+"\" target=\"_blank\">"+(_6d0.sourceName?_6d0.sourceName:_6d0.sourceUrl)+"</a>";
}else{
var _6db="<b>"+_6d0.sourceName+"</b>";
}
_6da.html(_6da.text()+"<br />Source: "+_6db);
}
_6da.find("div.slideshow-counter").remove();
_6da.append(jQuery("<div />").html("Photo "+_6cd+" of "+this._photoData.total_images).addClass("slideshow-counter"));
if(this._lastIndex!=_6cc&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_6d0.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_6d0.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_6d0.social.pinit){
this._socialBar.find(".pinit_wrap").html(_6d0.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_6cc;
_6cf.parent("div").after(this._socialBar.show());
};
HubPages.Lightbox.Slideshow.prototype.loadGoogleAds=function(){
if(this._photoData.googleAdId&&Math.random()<0.05){
var _6dc=this._photoData.googleAdId;
jQuery.ajax({url:"http://s0.2mdn.net/instream/html5/ima.js",dataType:"script",cache:true,complete:function(){
google.ima.SdkLoader.setCallbacks(function(){
google.ima.afi.AfiAdsLoader.requestAds("http://googleads.g.doubleclick.net/pagead/ads?ad_type=text&client="+_6dc+"&description_url="+location.href,"overlay_image");
},function(){
console.log("Error loading AFI");
});
google.ima.SdkLoader.load("3");
}});
}
};
(function(_6dd,_6de){
var _6df=_6dd.document;
(function(){
var _6e0=false,_6e1=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _6e2=this.prototype;
_6e0=true;
var _6e3=new this();
_6e0=false;
for(var name in prop){
_6e3[name]=typeof prop[name]=="function"&&typeof _6e2[name]=="function"&&_6e1.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_6e2[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _6e4(){
if(!_6e0&&this.init){
this.init.apply(this,arguments);
}
};
_6e4.prototype=_6e3;
_6e4.constructor=_6e4;
_6e4.extend=arguments.callee;
return _6e4;
};
})();
var _6e5=JRClass.extend({init:function(_6e6,_6e7){
if(typeof _6e6=="string"){
this.video=_6df.getElementById(_6e6);
}else{
this.video=_6e6;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _6e5.options=="object"){
_V_.merge(this.options,_6e5.options);
}
if(typeof _6e7=="object"){
_V_.merge(this.options,_6e7);
}
if(this.getPreloadAttribute()!==_6de){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_6de){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_6de){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_6e8){
if(this[_6e8+"Supported"]()){
this[_6e8+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_6e9,_6ea){
this.behaviors[name]=_6e9;
this.extend(_6ea);
},activateElement:function(_6eb,_6ec){
if(typeof _6eb=="string"){
_6eb=_6df.getElementById(_6eb);
}
this.behaviors[_6ec].call(this,_6eb);
},errors:[],warnings:[],warning:function(_6ed){
this.warnings.push(_6ed);
this.log(_6ed);
},history:[],log:function(_6ee){
if(!_6ee){
return;
}
if(typeof _6ee=="string"){
_6ee={type:_6ee};
}
if(_6ee.type){
this.history.push(_6ee.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_6ee.type);
}
catch(e){
try{
opera.postError(_6ee.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_6ef){
if(!localStorage){
return;
}
try{
localStorage[key]=_6ef;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_6e5.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _6f0=this.video.getAttribute("preload");
if(_6f0===""||_6f0==="true"){
return "auto";
}
if(_6f0==="false"){
return "none";
}
return _6f0;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _6f1=this.video.getAttribute("autoplay");
if(_6f1==="false"){
return false;
}
return true;
}
},bufferedPercent:function(){
return (this.duration())?this.buffered()[1]/this.duration():0;
},each:function(arr,fn){
if(!arr||arr.length===0){
return;
}
for(var i=0,j=arr.length;i<j;i++){
if(fn.call(this,arr[i],i)){
break;
}
}
},extend:function(obj){
for(var _6f2 in obj){
if(obj.hasOwnProperty(_6f2)){
this[_6f2]=obj[_6f2];
}
}
}});
_6e5.player=_6e5.prototype;
_6e5.player.extend({flashSupported:function(){
if(!this.flashElement){
this.flashElement=this.getFlashElement();
}
if(this.flashElement&&this.flashPlayerVersionSupported()){
return true;
}else{
return false;
}
},flashInit:function(){
this.replaceWithFlash();
this.element=this.flashElement;
this.video.src="";
var _6f3=_6e5.flashPlayers[this.options.flashPlayer];
this.extend(_6e5.flashPlayers[this.options.flashPlayer].api);
(_6f3.init.context(this))();
},getFlashElement:function(){
var _6f4=this.video.children;
for(var i=0,j=_6f4.length;i<j;i++){
if(_6f4[i].className=="vjs-flash-fallback"){
return _6f4[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _6f5=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_6e5.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _6e5.getFlashVersion()>=_6f5;
}});
_6e5.flashPlayers={};
_6e5.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_6f6){
if(_6f6!==_6de){
this.element.width=_6f6;
this.box.style.width=_6f6+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_6f7){
if(_6f7!==_6de){
this.element.height=_6f7;
this.box.style.height=_6f7+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_6e5.player.extend({linksSupported:function(){
return true;
},linksInit:function(){
this.showLinksFallback();
this.element=this.video;
},getLinksFallback:function(){
return this.box.getElementsByTagName("P")[0];
},hideLinksFallback:function(){
if(this.linksFallback){
this.linksFallback.style.display="none";
}
},showLinksFallback:function(){
if(this.linksFallback){
this.linksFallback.style.display="block";
}
}});
_6e5.merge=function(obj1,obj2,safe){
for(var _6f8 in obj2){
if(obj2.hasOwnProperty(_6f8)&&(!safe||!obj1.hasOwnProperty(_6f8))){
obj1[_6f8]=obj2[_6f8];
}
}
return obj1;
};
_6e5.extend=function(obj){
this.merge(this,obj,true);
};
_6e5.extend({setupAllWhenReady:function(_6f9){
_6e5.options=_6f9;
_6e5.DOMReady(_6e5.setup);
},DOMReady:function(fn){
_6e5.addToDOMReady(fn);
},setup:function(_6fa,_6fb){
var _6fc=false,_6fd=[],_6fe;
if(!_6fa||_6fa=="All"){
_6fa=_6e5.getVideoJSTags();
}else{
if(typeof _6fa!="object"||_6fa.nodeType==1){
_6fa=[_6fa];
_6fc=true;
}
}
for(var i=0;i<_6fa.length;i++){
if(typeof _6fa[i]=="string"){
_6fe=_6df.getElementById(_6fa[i]);
}else{
_6fe=_6fa[i];
}
_6fd.push(new _6e5(_6fe,_6fb));
}
return (_6fc)?_6fd[0]:_6fd;
},getVideoJSTags:function(){
var _6ff=_6df.getElementsByTagName("video"),_700=[],_701;
for(var i=0,j=_6ff.length;i<j;i++){
_701=_6ff[i];
if(_701.className.indexOf("video-js")!=-1){
_700.push(_701);
}
}
return _700;
},browserSupportsVideo:function(){
if(typeof _6e5.videoSupport!="undefined"){
return _6e5.videoSupport;
}
_6e5.videoSupport=!!_6df.createElement("video").canPlayType;
return _6e5.videoSupport;
},getFlashVersion:function(){
if(typeof _6e5.flashVersion!="undefined"){
return _6e5.flashVersion;
}
var _702=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_702=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _6dd.ActiveXObject!="undefined"){
try{
var _703=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_703){
_702=parseInt(_703.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_6e5.flashVersion=_702;
return _6e5.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _6e5.isIPhone()||_6e5.isIPad();
},iOSVersion:function(){
var _704=navigator.userAgent.match(/OS (\d+)_/i);
if(_704&&_704[1]){
return _704[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _705=navigator.userAgent.match(/Android (\d+)\./i);
if(_705&&_705[1]){
return _705[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_6e5.isIE()){
_6df.createElement("video");
}
_6dd.VideoJS=_6dd._V_=_6e5;
_6e5.player.extend({html5Supported:function(){
if(_6e5.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_6e5.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_6e5.isAndroid()){
this.options.useBuiltInControls=true;
this.androidInterface();
}
}
if(!this.options.useBuiltInControls){
this.video.controls=false;
if(this.options.controlsBelow){
_V_.addClass(this.box,"vjs-controls-below");
}
this.activateElement(this.video,"playToggle");
this.buildStylesCheckDiv();
this.buildAndActivatePoster();
this.buildBigPlayButton();
this.buildAndActivateSpinner();
this.buildAndActivateControlBar();
this.loadInterface();
this.getSubtitles();
this.fixAutoplay();
}
},canPlaySource:function(){
if(this.canPlaySourceResult){
return this.canPlaySourceResult;
}
var _706=this.video.children;
for(var i=0,j=_706.length;i<j;i++){
if(_706[i].tagName.toUpperCase()=="SOURCE"){
var _707=this.video.canPlayType(_706[i].type)||this.canPlayExt(_706[i].src);
if(_707=="probably"||_707=="maybe"){
this.firstPlayableSource=_706[i];
this.canPlaySourceResult=true;
return true;
}
}
}
this.canPlaySourceResult=false;
return false;
},canPlayExt:function(src){
if(!src){
return "";
}
var _708=src.match(/\.([^\.]+)$/);
if(_708&&_708[1]){
var ext=_708[1].toLowerCase();
if(_6e5.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_6e5.isIOS()){
if(ext=="m3u8"){
return "maybe";
}
}
}
}
return "";
},forceTheSource:function(){
this.video.src=this.firstPlayableSource.src;
this.video.load();
},fixPreloading:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")&&this.video.preload!="none"){
this.video.autobuffer=true;
}else{
this.video.autobuffer=false;
this.video.preload="none";
}
},supportProgressEvents:function(e){
_V_.addListener(this.video,"progress",this.playerOnVideoProgress.context(this));
},playerOnVideoProgress:function(_709){
this.setBufferedFromProgress(_709);
},setBufferedFromProgress:function(_70a){
if(_70a.total>0){
var _70b=(_70a.loaded/_70a.total)*this.duration();
if(_70b>this.values.bufferEnd){
this.values.bufferEnd=_70b;
}
}
},iOSInterface:function(){
if(_6e5.iOSVersion()<4){
this.forceTheSource();
}
if(_6e5.isIPad()){
this.buildAndActivateSpinner();
}
},androidInterface:function(){
this.forceTheSource();
_V_.addListener(this.video,"click",function(){
this.play();
});
this.buildBigPlayButton();
_V_.addListener(this.bigPlayButton,"click",function(){
this.play();
}.context(this));
this.positionBox();
this.showBigPlayButtons();
},loadInterface:function(){
if(!this.stylesHaveLoaded()){
if(!this.positionRetries){
this.positionRetries=1;
}
if(this.positionRetries++<100){
setTimeout(this.loadInterface.context(this),10);
return;
}
}
this.hideStylesCheckDiv();
if(this.video.paused){
this.showPoster();
}else{
this.hidePoster();
}
if(this.video.paused!==false){
this.showBigPlayButtons();
}
if(this.options.controlsAtStart){
this.showControlBars();
}
this.positionAll();
},buildAndActivateControlBar:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.controls.appendChild(this.progressControl);
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.controls.appendChild(this.timeControl);
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.volumeControl);
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.fullscreenControl);
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildAndActivatePoster:function(){
this.updatePosterSource();
if(this.video.poster){
this.poster=_6df.createElement("img");
this.box.appendChild(this.poster);
this.poster.src=this.video.poster;
this.poster.className="vjs-poster";
this.activateElement(this.poster,"poster");
}else{
this.poster=false;
}
},buildBigPlayButton:function(){
this.bigPlayButton=_V_.createElement("div",{className:"vjs-big-play-button",innerHTML:"<span></span>"});
this.box.appendChild(this.bigPlayButton);
this.activateElement(this.bigPlayButton,"bigPlayButton");
},buildAndActivateSpinner:function(){
this.spinner=_V_.createElement("div",{className:"vjs-spinner",innerHTML:"<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>"});
this.box.appendChild(this.spinner);
this.activateElement(this.spinner,"spinner");
},buildStylesCheckDiv:function(){
this.stylesCheckDiv=_V_.createElement("div",{className:"vjs-styles-check"});
this.stylesCheckDiv.style.position="absolute";
this.box.appendChild(this.stylesCheckDiv);
},hideStylesCheckDiv:function(){
this.stylesCheckDiv.style.display="none";
},stylesHaveLoaded:function(){
if(this.stylesCheckDiv.offsetHeight!=5){
return false;
}else{
return true;
}
},positionAll:function(){
this.positionBox();
this.positionControlBars();
this.positionPoster();
},positionBox:function(){
if(this.videoIsFullScreen){
this.box.style.width="";
this.element.style.height="";
if(this.options.controlsBelow){
this.box.style.height="";
this.element.style.height=(this.box.offsetHeight-this.controls.offsetHeight)+"px";
}
}else{
this.box.style.width=this.width()+"px";
this.element.style.height=this.height()+"px";
if(this.options.controlsBelow){
this.element.style.height="";
}
}
},getSubtitles:function(){
var _70c=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_70c.length;i<j;i++){
if(_70c[i].getAttribute("kind")=="subtitles"&&_70c[i].getAttribute("src")){
this.subtitlesSource=_70c[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_70d){
var _70e=_70d.split("\n"),line="",_70f,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_70e.length;i++){
line=_V_.trim(_70e[i]);
if(line){
_70f={id:line,index:this.subtitles.length};
line=_V_.trim(_70e[++i]);
time=line.split(" --> ");
_70f.start=this.parseSubtitleTime(time[0]);
_70f.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_70e.length;j++){
line=_V_.trim(_70e[++i]);
if(!line){
break;
}
text.push(line);
}
_70f.text=text.join("<br/>");
this.subtitles.push(_70f);
}
}
},parseSubtitleTime:function(_710){
var _711=_710.split(":"),time=0;
time+=parseFloat(_711[0])*60*60;
time+=parseFloat(_711[1])*60;
var _712=_711[2].split(/\.|,/);
time+=parseFloat(_712[0]);
ms=parseFloat(_712[1]);
if(ms){
time+=ms/1000;
}
return time;
},buildSubtitles:function(){
this.subtitlesDisplay=_V_.createElement("div",{className:"vjs-subtitles"});
this.box.appendChild(this.subtitlesDisplay);
this.activateElement(this.subtitlesDisplay,"subtitlesDisplay");
},addVideoListener:function(type,fn){
_V_.addListener(this.video,type,fn.rEvtContext(this));
},play:function(){
this.video.play();
return this;
},onPlay:function(fn){
this.addVideoListener("play",fn);
return this;
},pause:function(){
this.video.pause();
return this;
},onPause:function(fn){
this.addVideoListener("pause",fn);
return this;
},paused:function(){
return this.video.paused;
},currentTime:function(_713){
if(_713!==_6de){
try{
this.video.currentTime=_713;
}
catch(e){
this.warning(_6e5.warnings.videoNotReady);
}
this.values.currentTime=_713;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_6de){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _714=this.video.buffered.end(0);
if(_714>this.values.bufferEnd){
this.values.bufferEnd=_714;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_715){
if(_715!==_6de){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_715)));
this.video.volume=this.values.volume;
this.setLocalStorage("volume",this.values.volume);
return this;
}
if(this.values.volume){
return this.values.volume;
}
return this.video.volume;
},onVolumeChange:function(fn){
_V_.addListener(this.video,"volumechange",fn.rEvtContext(this));
},width:function(_716){
if(_716!==_6de){
this.video.width=_716;
this.box.style.width=_716+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_717){
if(_717!==_6de){
this.video.height=_717;
this.box.style.height=_717+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetHeight;
},supportsFullScreen:function(){
if(typeof this.video.webkitEnterFullScreen=="function"){
if(!navigator.userAgent.match("Chrome")&&!navigator.userAgent.match("Mac OS X 10.5")){
return true;
}
}
return false;
},html5EnterNativeFullScreen:function(){
try{
this.video.webkitEnterFullScreen();
}
catch(e){
if(e.code==11){
this.warning(_6e5.warnings.videoNotReady);
}
}
return this;
},enterFullScreen:function(){
if(this.supportsFullScreen()){
this.html5EnterNativeFullScreen();
}else{
this.enterFullWindow();
}
},exitFullScreen:function(){
if(this.supportsFullScreen()){
}else{
this.exitFullWindow();
}
},enterFullWindow:function(){
this.videoIsFullScreen=true;
this.docOrigOverflow=_6df.documentElement.style.overflow;
_V_.addListener(_6df,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_6dd,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_6df.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_6df.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_6dd.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_6df.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_6e5.player.newBehavior("player",function(_718){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_719){
this.log(_719);
this.log(this.video.error);
},playerOnVideoPlay:function(_71a){
this.hasPlayed=true;
},playerOnVideoPause:function(_71b){
},playerOnVideoEnded:function(_71c){
this.currentTime(0);
this.pause();
},trackBuffered:function(){
this.bufferedInterval=setInterval(this.triggerBufferedListeners.context(this),500);
},stopTrackingBuffered:function(){
clearInterval(this.bufferedInterval);
},bufferedListeners:[],onBufferedUpdate:function(fn){
this.bufferedListeners.push(fn);
},triggerBufferedListeners:function(){
this.isBufferFull();
this.each(this.bufferedListeners,function(_71d){
(_71d.context(this))();
});
},isBufferFull:function(){
if(this.bufferedPercent()==1){
this.stopTrackingBuffered();
}
},trackCurrentTime:function(){
if(this.currentTimeInterval){
clearInterval(this.currentTimeInterval);
}
this.currentTimeInterval=setInterval(this.triggerCurrentTimeListeners.context(this),100);
this.trackingCurrentTime=true;
},stopTrackingCurrentTime:function(){
clearInterval(this.currentTimeInterval);
this.trackingCurrentTime=false;
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_71e){
this.each(this.currentTimeListeners,function(_71f){
(_71f.context(this))(_71e||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_720){
(_720.context(this))();
});
}});
_6e5.player.newBehavior("mouseOverVideoReporter",function(_721){
_V_.addListener(_721,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_721,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_722){
var _723=_722.relatedTarget;
while(_723&&_723!==this.box){
_723=_723.parentNode;
}
if(_723!==this.box){
this.hideControlBars();
}
}});
_6e5.player.newBehavior("box",function(_724){
this.positionBox();
_V_.addClass(_724,"vjs-paused");
this.activateElement(_724,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_6e5.player.newBehavior("poster",function(_725){
this.activateElement(_725,"mouseOverVideoReporter");
this.activateElement(_725,"playButton");
this.onPlay(this.hidePoster);
this.onEnded(this.showPoster);
this.onResize(this.positionPoster);
},{showPoster:function(){
if(!this.poster){
return;
}
this.poster.style.display="block";
this.positionPoster();
},positionPoster:function(){
if(!this.poster||this.poster.style.display=="none"){
return;
}
this.poster.style.height=this.height()+"px";
this.poster.style.width=this.width()+"px";
},hidePoster:function(){
if(!this.poster){
return;
}
this.poster.style.display="none";
},updatePosterSource:function(){
if(!this.video.poster){
var _726=this.video.getElementsByTagName("img");
if(_726.length>0){
this.video.poster=_726[0].src;
}
}
}});
_6e5.player.newBehavior("controlBar",function(_727){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_727);
_V_.addListener(_727,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_727,"mouseout",this.onControlBarsMouseOut.context(this));
},{showControlBars:function(){
if(!this.options.controlsAtStart&&!this.hasPlayed){
return;
}
this.each(this.controlBars,function(bar){
bar.style.display="block";
});
},positionControlBars:function(){
this.updatePlayProgressBars();
this.updateLoadProgressBars();
},hideControlBars:function(){
if(this.options.controlsHiding&&!this.mouseIsOverControls){
this.each(this.controlBars,function(bar){
bar.style.display="none";
});
}
},onControlBarsMouseMove:function(){
this.mouseIsOverControls=true;
},onControlBarsMouseOut:function(_728){
this.mouseIsOverControls=false;
}});
_6e5.player.newBehavior("playToggle",function(_729){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_729);
_V_.addListener(_729,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_72a){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_72b){
this.each(this.elements.playToggles,function(_72c){
_V_.removeClass(_72c,"vjs-paused");
_V_.addClass(_72c,"vjs-playing");
});
},playTogglesOnPause:function(_72d){
this.each(this.elements.playToggles,function(_72e){
_V_.removeClass(_72e,"vjs-playing");
_V_.addClass(_72e,"vjs-paused");
});
}});
_6e5.player.newBehavior("playButton",function(_72f){
_V_.addListener(_72f,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_730){
this.play();
}});
_6e5.player.newBehavior("pauseButton",function(_731){
_V_.addListener(_731,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_732){
this.pause();
}});
_6e5.player.newBehavior("playProgressBar",function(_733){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_733);
},{updatePlayProgressBars:function(_734){
var _735=(_734!==_6de)?_734/this.duration():this.currentTime()/this.duration();
if(isNaN(_735)){
_735=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_735*100,2)+"%";
}
});
}});
_6e5.player.newBehavior("loadProgressBar",function(_736){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_736);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_6e5.player.newBehavior("currentTimeDisplay",function(_737){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_737);
},{updateCurrentTimeDisplays:function(_738){
if(!this.currentTimeDisplays){
return;
}
var time=(_738)?_738:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_6e5.player.newBehavior("durationDisplay",function(_739){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_739);
},{updateDurationDisplays:function(){
if(!this.durationDisplays){
return;
}
this.each(this.durationDisplays,function(dis){
if(this.duration()){
dis.innerHTML=_V_.formatTime(this.duration());
}
});
}});
_6e5.player.newBehavior("currentTimeScrubber",function(_73a){
_V_.addListener(_73a,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_73b,_73c){
_73b.preventDefault();
this.currentScrubber=_73c;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_73b);
_V_.addListener(_6df,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_6df,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_73d){
this.setCurrentTimeWithScrubber(_73d);
},onCurrentTimeScrubberMouseUp:function(_73e){
_V_.unblockTextSelection();
_6df.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_6df.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_73f){
var _740=_V_.getRelativePosition(_73f.pageX,this.currentScrubber);
var _741=_740*this.duration();
this.triggerCurrentTimeListeners(0,_741);
if(_741==this.duration()){
_741=_741-0.1;
}
this.currentTime(_741);
}});
_6e5.player.newBehavior("volumeDisplay",function(_742){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_742);
this.updateVolumeDisplay(_742);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_743){
var _744=Math.ceil(this.volume()*6);
this.each(_743.children,function(_745,num){
if(num<_744){
_V_.addClass(_745,"vjs-volume-level-on");
}else{
_V_.removeClass(_745,"vjs-volume-level-on");
}
});
}});
_6e5.player.newBehavior("volumeScrubber",function(_746){
_V_.addListener(_746,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_747,_748){
_V_.blockTextSelection();
this.currentScrubber=_748;
this.setVolumeWithScrubber(_747);
_V_.addListener(_6df,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_6df,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_749){
this.setVolumeWithScrubber(_749);
},onVolumeScrubberMouseUp:function(_74a){
this.setVolumeWithScrubber(_74a);
_V_.unblockTextSelection();
_6df.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_6df.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_74b){
var _74c=_V_.getRelativePosition(_74b.pageX,this.currentScrubber);
this.volume(_74c);
}});
_6e5.player.newBehavior("fullscreenToggle",function(_74d){
_V_.addListener(_74d,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_74e){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_74f){
this.positionControlBars();
},fullscreenOnEscKey:function(_750){
if(_750.keyCode==27){
this.exitFullScreen();
}
}});
_6e5.player.newBehavior("bigPlayButton",function(_751){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_751);
this.activateElement(_751,"playButton");
},{bigPlayButtonsOnPlay:function(_752){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_753){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_754){
_754.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_755){
_755.style.display="none";
});
}});
_6e5.player.newBehavior("spinner",function(_756){
if(!this.spinners){
this.spinners=[];
_V_.addListener(this.video,"loadeddata",this.spinnersOnVideoLoadedData.context(this));
_V_.addListener(this.video,"seeking",this.spinnersOnVideoSeeking.context(this));
_V_.addListener(this.video,"seeked",this.spinnersOnVideoSeeked.context(this));
_V_.addListener(this.video,"canplay",this.spinnersOnVideoCanPlay.context(this));
_V_.addListener(this.video,"canplaythrough",this.spinnersOnVideoCanPlayThrough.context(this));
_V_.addListener(this.video,"waiting",this.spinnersOnVideoWaiting.context(this));
_V_.addListener(this.video,"stalled",this.spinnersOnVideoStalled.context(this));
_V_.addListener(this.video,"suspend",this.spinnersOnVideoSuspend.context(this));
_V_.addListener(this.video,"playing",this.spinnersOnVideoPlaying.context(this));
_V_.addListener(this.video,"timeupdate",this.spinnersOnVideoTimeUpdate.context(this));
}
this.spinners.push(_756);
},{showSpinners:function(){
this.each(this.spinners,function(_757){
_757.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_758){
_758.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_759){
_759.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_759.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_75a){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_75b){
this.showSpinners();
},spinnersOnVideoSeeking:function(_75c){
},spinnersOnVideoSeeked:function(_75d){
},spinnersOnVideoCanPlay:function(_75e){
},spinnersOnVideoCanPlayThrough:function(_75f){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_760){
this.showSpinners();
},spinnersOnVideoStalled:function(_761){
},spinnersOnVideoSuspend:function(_762){
},spinnersOnVideoPlaying:function(_763){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_764){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_6e5.player.newBehavior("subtitlesDisplay",function(_765){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_765);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _766=false,_767=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_767)?1:0;
while(true){
if(_767){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_766=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_766=i;
break;
}
i++;
}
}
if(_766!==false){
this.currentSubtitle=this.subtitles[_766];
this.lastSubtitleIndex=_766;
this.updateSubtitleDisplays(this.currentSubtitle.text);
}else{
if(this.currentSubtitle){
this.currentSubtitle=false;
this.updateSubtitleDisplays("");
}
}
}
}
},updateSubtitleDisplays:function(val){
this.each(this.subtitleDisplays,function(disp){
disp.innerHTML=val;
});
}});
_6e5.extend({addClass:function(_768,_769){
if((" "+_768.className+" ").indexOf(" "+_769+" ")==-1){
_768.className=_768.className===""?_769:_768.className+" "+_769;
}
},removeClass:function(_76a,_76b){
if(_76a.className.indexOf(_76b)==-1){
return;
}
var _76c=_76a.className.split(/\s+/);
_76c.splice(_76c.lastIndexOf(_76b),1);
_76a.className=_76c.join(" ");
},createElement:function(_76d,_76e){
return this.merge(_6df.createElement(_76d),_76e);
},blockTextSelection:function(){
_6df.body.focus();
_6df.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_6df.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _76f=Math.round(secs);
var _770=Math.floor(_76f/60);
_770=(_770>=10)?_770:"0"+_770;
_76f=Math.floor(_76f%60);
_76f=(_76f>=10)?_76f:"0"+_76f;
return _770+":"+_76f;
},getRelativePosition:function(x,_771){
return Math.max(0,Math.min(1,(x-this.findPosX(_771))/_771.offsetWidth));
},findPosX:function(obj){
var _772=obj.offsetLeft;
while(obj=obj.offsetParent){
_772+=obj.offsetLeft;
}
return _772;
},getComputedStyleValue:function(_773,_774){
return _6dd.getComputedStyle(_773,null).getPropertyValue(_774);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_775,type,_776){
if(_775.addEventListener){
_775.addEventListener(type,_776,false);
}else{
if(_775.attachEvent){
_775.attachEvent("on"+type,_776);
}
}
},removeListener:function(_777,type,_778){
if(_777.removeEventListener){
_777.removeEventListener(type,_778,false);
}else{
if(_777.attachEvent){
_777.detachEvent("on"+type,_778);
}
}
},get:function(url,_779){
if(typeof XMLHttpRequest=="undefined"){
XMLHttpRequest=function(){
try{
return new ActiveXObject("Msxml2.XMLHTTP.6.0");
}
catch(e){
}
try{
return new ActiveXObject("Msxml2.XMLHTTP.3.0");
}
catch(f){
}
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(g){
}
throw new Error("This browser does not support XMLHttpRequest.");
};
}
var _77a=new XMLHttpRequest();
_77a.open("GET",url);
_77a.onreadystatechange=function(){
if(_77a.readyState==4&&_77a.status==200){
_779(_77a.responseText);
}
}.context(this);
_77a.send();
},trim:function(_77b){
return _77b.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_6df.readyState==="complete"){
return _6e5.onDOMReady();
}
if(_6df.addEventListener){
_6df.addEventListener("DOMContentLoaded",_6e5.DOMContentLoaded,false);
_6dd.addEventListener("load",_6e5.onDOMReady,false);
}else{
if(_6df.attachEvent){
_6df.attachEvent("onreadystatechange",_6e5.DOMContentLoaded);
_6dd.attachEvent("onload",_6e5.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_6df.addEventListener){
_6df.removeEventListener("DOMContentLoaded",_6e5.DOMContentLoaded,false);
_6e5.onDOMReady();
}else{
if(_6df.attachEvent){
if(_6df.readyState==="complete"){
_6df.detachEvent("onreadystatechange",_6e5.DOMContentLoaded);
_6e5.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_6e5.DOMIsReady){
fn.call(_6df);
}else{
_6e5.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_6e5.DOMIsReady){
return;
}
if(!_6df.body){
return setTimeout(_6e5.onDOMReady,13);
}
_6e5.DOMIsReady=true;
if(_6e5.DOMReadyList){
for(var i=0;i<_6e5.DOMReadyList.length;i++){
_6e5.DOMReadyList[i].call(_6df);
}
_6e5.DOMReadyList=null;
}
}});
_6e5.bindDOMReady();
Function.prototype.context=function(obj){
var _77c=this,temp=function(){
return _77c.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _77d=this,temp=function(){
var _77e=this;
return _77d.call(obj,arguments[0],_77e);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_77f){
if(this.hasContext===true){
return this;
}
if(!_77f){
_77f=obj;
}
for(var _780 in _77f){
if(_77f[_780]==this){
_77f[_780]=this.evtContext(obj);
_77f[_780].hasContext=true;
return _77f[_780];
}
}
return this.evtContext(obj);
};
if(_6dd.jQuery){
(function($){
$.fn.VideoJS=function(_781){
this.each(function(){
_6e5.setup(this,_781);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_6dd.VideoJS=_6dd._V_=_6e5;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_782){
var _783=((_782/15)|0)*15;
if(this.lastLoggedOffset!=_783&&!this.paused()){
var _784=this.video.id.replace("hp_video_","");
var _785=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_783,videoId:_784,rf:rf,isEmbed:_785}});
this.lastLoggedOffset=_783;
}
},buildAndActivateControlBar:function(){
this.onCurrentTimeUpdate(this.trackUsage);
if(this.getSize()=="big"){
this.buildBigController();
}else{
if(this.getSize()=="small"){
this.buildSmallController();
}else{
alert("unknown size for video controls");
}
}
},buildSmallController:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildBigController:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.controls.appendChild(this.progressControl);
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.controls.appendChild(this.timeControl);
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.volumeControl);
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.fullscreenControl);
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildBigPlayButton:function(){
this.bigPlayButton=_V_.createElement("div",{className:"vjs-"+this.getSize()+"-play-button",innerHTML:"<span></span>"});
this.box.appendChild(this.bigPlayButton);
this.activateElement(this.bigPlayButton,"bigPlayButton");
},getAutostartAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autostart")){
var _786=this.video.getAttribute("autostart");
if(_786==="false"){
return false;
}
return true;
}
},fixAutoplay:function(){
if(this.options.autoplay&&this.paused){
this.play();
}
}});
function expandHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
var v=jq(".video-js-box");
sidebox=jq("#sidebar > :first");
sbBottom=sidebox.offset()["top"]+sidebox.outerHeight()+15;
videoTopAdjustment=sbBottom-v.offset()["top"];
if(videoTopAdjustment>0){
var _787=document.createElement("div");
_787.style.height=videoTopAdjustment+"px";
_787.style.background="transparent";
_787.id="video_spacer";
v.before(_787);
}
var _788=v.offset()["top"]+v.outerHeight();
var _789=_788-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_789>0){
var _78a=document.createElement("div");
_78a.style.height=_789+"px";
_78a.style.background="transparent";
_78a.id="sidebar_spacer";
_78a.className="sidebar_box";
sidebox.after(_78a);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_78b,_78c,_78d,exts){
jQuery(document).ready(function(){
var _78e=0;
var _78f={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_78b},size_limit:_78d,queue_limit:_78c,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_790){
if(file.size==_790){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_791){
try{
var data=JSONstring.toObject(_791);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_791);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_78e+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_792){
if(!_78e&&_792){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_78e=0;
},loaded_callback:function(_793){
if(_793){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _794=new imageUploader(_78f);
});
};
function getHPVideoPlayer(){
var _795="talkiesplayer";
return $(_795);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _796=true;
if(data.percent){
var _797=data.percent;
jq("#progress_video_"+vId).width(_797+"%");
if(_797>90){
_796=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_796){
setTimeout(function(){
updateVideoProcessingBar(vId,mId);
},5000);
}
}});
};
var relatedHubStats={ifired:false,ifiredtarget:null,relatedhubstrackingenabled:false,relatedhubs:[],articleid:-1,trackedclass:null,initEventHandlers:function(){
jq(""+this.trackedclass).click(function(_798){
return (relatedHubStats.recordRelatedHubClick(_798));
});
},recordRelatedHubClick:function(_799){
if(!this.relatedhubstrackingenabled){
return (true);
}
if(this.ifired){
window.location.href=jq(this.ifiredtarget).attr("href");
return (true);
}
var _79a=_799.target;
if(jq(_79a).attr("href")==undefined){
return (true);
}
var rel=jq(_79a).attr("rel");
var pos1=rel.indexOf("_");
var pos2=rel.lastIndexOf("_");
var raid=rel.substring(pos2+1);
var rank=rel.substring(pos1+1,pos2);
var aid=this.articleid;
jq.get("/xml/stats/relatedhubevents.php?aid="+aid+"&type="+rank+"&raid="+raid,"",function(data){
jq(_79a).trigger("click");
});
this.ifired=true;
this.ifiredtarget=_79a;
return (false);
},commitImpressions:function(){
if(!this.relatedhubstrackingenabled){
return (false);
}
var json=JSONstring.make(this.relatedhubs,false);
var aid=this.articleid;
jq(document).ready(function(){
setTimeout(function(){
jq.get("/xml/stats/relatedhubevents.php?aid="+aid+"&json="+escape(json),"",function(){
});
},3000);
});
},recordImpression:function(aid,rank,raid){
if(!this.relatedhubstrackingenabled){
return (false);
}
rank+=1000;
this.relatedhubs[this.relatedhubs.length]={aid:aid,rank:rank,raid:raid};
return (true);
},armRelatedHubEvents:function(_79b,aid){
if(aid==2169847||Math.random()>_79b){
this.relatedhubstrackingenabled=true;
this.articleid=aid;
}
}};
if(window.jQuery){
(function($){
if($.browser.msie){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
$.fn.rating=function(_79c){
if(this.length==0){
return this;
}
if(typeof arguments[0]=="string"){
if(this.length>1){
var args=arguments;
return this.each(function(){
$.fn.rating.apply($(this),args);
});
}
$.fn.rating[arguments[0]].apply(this,$.makeArray(arguments).slice(1)||[]);
return this;
}
var _79c=$.extend({},$.fn.rating.options,_79c||{});
$.fn.rating.calls++;
this.not(".star-rating-applied").addClass("star-rating-applied").each(function(){
var _79d,_79e=$(this);
var eid=(this.name||"unnamed-rating").replace(/\[|\]/g,"_").replace(/^\_+|\_+$/g,"");
var _79f=$(this.form||document.body);
var _7a0=_79f.data("rating");
if(!_7a0||_7a0.call!=$.fn.rating.calls){
_7a0={count:0,call:$.fn.rating.calls};
}
var _7a1=_7a0[eid];
if(_7a1){
_79d=_7a1.data("rating");
}
if(_7a1&&_79d){
_79d.count++;
}else{
_79d=$.extend({},_79c||{},($.metadata?_79e.metadata():($.meta?_79e.data():null))||{},{count:0,stars:[],inputs:[]});
_79d.serial=_7a0.count++;
_7a1=$("<span class=\"star-rating-control\"/>");
_79e.before(_7a1);
_7a1.addClass("rating-to-be-drawn");
if(_79e.attr("disabled")||_79e.hasClass("disabled")){
_79d.readOnly=true;
}
if(_79e.hasClass("required")){
_79d.required=true;
}
_7a1.append(_79d.cancel=$("<div class=\"rating-cancel\"><a title=\""+_79d.cancel+"\">"+_79d.cancelValue+"</a></div>").mouseover(function(){
$(this).rating("drain");
$(this).addClass("star-rating-hover");
}).mouseout(function(){
$(this).rating("draw");
$(this).removeClass("star-rating-hover");
}).click(function(){
$(this).rating("select");
}).data("rating",_79d));
}
var star=$("<div class=\"star-rating rater-"+_79d.serial+"\"><a title=\""+(this.title||this.value)+"\">"+this.value+"</a></div>");
_7a1.append(star);
if(this.id){
star.attr("id",this.id);
}
if(this.className){
star.addClass(this.className);
}
if(_79d.half){
_79d.split=2;
}
if(typeof _79d.split=="number"&&_79d.split>0){
var stw=($.fn.width?star.width():0)||_79d.starWidth;
var spi=(_79d.count%_79d.split),spw=Math.floor(stw/_79d.split);
star.width(spw).find("a").css({"margin-left":"-"+(spi*spw)+"px"});
}
if(_79d.readOnly){
star.addClass("star-rating-readonly");
}else{
star.addClass("star-rating-live").mouseover(function(){
$(this).rating("fill");
$(this).rating("focus");
}).mouseout(function(){
$(this).rating("draw");
$(this).rating("blur");
}).click(function(){
$(this).rating("select");
});
}
if(this.checked){
_79d.current=star;
}
if(this.nodeName=="A"){
if($(this).hasClass("selected")){
_79d.current=star;
}
}
_79e.hide();
_79e.change(function(){
$(this).rating("select");
});
star.data("rating.input",_79e.data("rating.star",star));
_79d.stars[_79d.stars.length]=star[0];
_79d.inputs[_79d.inputs.length]=_79e[0];
_79d.rater=_7a0[eid]=_7a1;
_79d.context=_79f;
_79e.data("rating",_79d);
_7a1.data("rating",_79d);
star.data("rating",_79d);
_79f.data("rating",_7a0);
});
$(".rating-to-be-drawn").rating("draw").removeClass("rating-to-be-drawn");
return this;
};
$.extend($.fn.rating,{calls:0,focus:function(){
var _7a2=this.data("rating");
if(!_7a2){
return this;
}
if(!_7a2.focus){
return this;
}
var _7a3=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_7a2.focus){
_7a2.focus.apply(_7a3[0],[_7a3.val(),$("a",_7a3.data("rating.star"))[0]]);
}
},blur:function(){
var _7a4=this.data("rating");
if(!_7a4){
return this;
}
if(!_7a4.blur){
return this;
}
var _7a5=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_7a4.blur){
_7a4.blur.apply(_7a5[0],[_7a5.val(),$("a",_7a5.data("rating.star"))[0]]);
}
},fill:function(){
var _7a6=this.data("rating");
if(!_7a6){
return this;
}
if(_7a6.readOnly){
return;
}
this.rating("drain");
this.prevAll().andSelf().filter(".rater-"+_7a6.serial).addClass("star-rating-hover");
},drain:function(){
var _7a7=this.data("rating");
if(!_7a7){
return this;
}
if(_7a7.readOnly){
return;
}
_7a7.rater.children().filter(".rater-"+_7a7.serial).removeClass("star-rating-on").removeClass("star-rating-hover");
},draw:function(){
var _7a8=this.data("rating");
if(!_7a8){
return this;
}
this.rating("drain");
if(_7a8.current){
_7a8.current.data("rating.input").attr("checked","checked");
_7a8.current.prevAll().andSelf().filter(".rater-"+_7a8.serial).addClass("star-rating-on");
}else{
$(_7a8.inputs).removeAttr("checked");
}
_7a8.cancel[_7a8.readOnly||_7a8.required?"hide":"show"]();
this.siblings()[_7a8.readOnly?"addClass":"removeClass"]("star-rating-readonly");
},select:function(_7a9,_7aa){
var _7ab=this.data("rating");
if(!_7ab){
return this;
}
if(_7ab.readOnly){
return;
}
_7ab.current=null;
if(typeof _7a9!="undefined"){
if(typeof _7a9=="number"){
return $(_7ab.stars[_7a9]).rating("select",undefined,_7aa);
}
if(typeof _7a9=="string"){
$.each(_7ab.stars,function(){
if($(this).data("rating.input").val()==_7a9){
$(this).rating("select",undefined,_7aa);
}
});
}
}else{
_7ab.current=this[0].tagName=="INPUT"?this.data("rating.star"):(this.is(".rater-"+_7ab.serial)?this:null);
}
this.data("rating",_7ab);
this.rating("draw");
var _7ac=$(_7ab.current?_7ab.current.data("rating.input"):null);
if((_7aa||_7aa==undefined)&&_7ab.callback){
_7ab.callback.apply(_7ac[0],[_7ac.val(),$("a",_7ab.current)[0]]);
}
},readOnly:function(_7ad,_7ae){
var _7af=this.data("rating");
if(!_7af){
return this;
}
_7af.readOnly=_7ad||_7ad==undefined?true:false;
if(_7ae){
$(_7af.inputs).attr("disabled","disabled");
}else{
$(_7af.inputs).removeAttr("disabled");
}
this.data("rating",_7af);
this.rating("draw");
},disable:function(){
this.rating("readOnly",true,true);
},enable:function(){
this.rating("readOnly",false,false);
}});
$.fn.rating.options={cancel:"Cancel Rating",cancelValue:"",split:0,starWidth:16};
$(function(){
$("input[type=radio].star").rating();
});
})(jQuery);
}
eval(function(p,a,c,k,e,d){
e=function(c){
return (c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36));
};
if(!"".replace(/^/,String)){
while(c--){
d[e(c)]=k[c]||e(c);
}
k=[function(e){
return d[e];
}];
e=function(){
return "\\w+";
};
c=1;
}
while(c--){
if(k[c]){
p=p.replace(new RegExp("\\b"+e(c)+"\\b","g"),k[c]);
}
}
return p;
}("K M;I(M)1R 2K(\"2d't 4g M 5f 2g 3m 5e 5d\");(6(){6 r(e,f){I(!M.1S(e))1R 3n(\"3f 16 5c\");K a=e.1r;e=M(e.1n,t(e)+(f||\"\"));I(a)e.1r={1n:a.1n,1d:a.1d?a.1d.1c(0):N};H e}6 t(e){H(e.1I?\"g\":\"\")+(e.5g?\"i\":\"\")+(e.5h?\"m\":\"\")+(e.5l?\"x\":\"\")+(e.3l?\"y\":\"\")}6 B(e,f,a,b){K c=u.L,d,h,g;v=R;5k{O(;c--;){g=u[c];I(a&g.3o&&(!g.2N||g.2N.W(b))){g.2x.11=f;I((h=g.2x.X(e))&&h.P===f){d={3E:g.2f.W(b,h,a),1E:h};1P}}}}5j(i){1R i}5i{v=13}H d}6 p(e,f,a){I(3c.Y.1j)H e.1j(f,a);O(a=a||0;a<e.L;a++)I(e[a]===f)H a;H-1}M=6(e,f){K a=[],b=M.1G,c=0,d,h;I(M.1S(e)){I(f!==1b)1R 3n(\"2d't 5b 5a 53 52 51 16 4Y 4Z\");H r(e)}I(v)1R 2K(\"2d't W 3m M 55 59 58 57 56\");f=f||\"\";O(d={2I:13,1d:[],2z:6(g){H f.1j(g)>-1},3a:6(g){f+=g}};c<e.L;)I(h=B(e,c,b,d)){a.U(h.3E);c+=h.1E[0].L||1}Z I(h=n.X.W(z[b],e.1c(c))){a.U(h[0]);c+=h[0].L}Z{h=e.3b(c);I(h===\"[\")b=M.2k;Z I(h===\"]\")b=M.1G;a.U(h);c++}a=16(a.1L(\"\"),n.Q.W(f,w,\"\"));a.1r={1n:e,1d:d.2I?d.1d:N};H a};M.3v=\"1.5.0\";M.2k=1;M.1G=2;K C=/\\$(?:(\\d\\d?|[$&`'])|{([$\\w]+)})/g,w=/[^5m]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=13,u=[],n={X:16.Y.X,1t:16.Y.1t,1E:1z.Y.1E,Q:1z.Y.Q,1f:1z.Y.1f},x=n.X.W(/()??/,\"\")[1]===1b,D=6(){K e=/^/g;n.1t.W(e,\"\");H!e.11}(),y=6(){K e=/x/g;n.Q.W(\"x\",e,\"\");H!e.11}(),E=16.Y.3l!==1b,z={};z[M.2k]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\26-2a-f]{2}|u[\\26-2a-f]{4}|c[A-3k-z]|[\\s\\S]))/;z[M.1G]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\26-2a-f]{2}|u[\\26-2a-f]{4}|c[A-3k-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1i=6(e,f,a,b){u.U({2x:r(e,\"g\"+(E?\"y\":\"\")),2f:f,3o:a||M.1G,2N:b||N})};M.2B=6(e,f){K a=e+\"/\"+(f||\"\");H M.2B[a]||(M.2B[a]=M(e,f))};M.3i=6(e){H r(e,\"g\")};M.5B=6(e){H e.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,\"\\\\$&\")};M.5F=6(e,f,a,b){f=r(f,\"g\"+(b&&E?\"y\":\"\"));f.11=a=a||0;e=f.X(e);H b?e&&e.P===a?e:N:e};M.3r=6(){M.1i=6(){1R 2K(\"2d't 5J 1i 5I 3r\")}};M.1S=6(e){H 5H.Y.1x.W(e)===\"[2F 16]\"};M.3q=6(e,f,a,b){O(K c=r(f,\"g\"),d=-1,h;h=c.X(e);){a.W(b,h,++d,e,c);c.11===h.P&&c.11++}I(f.1I)f.11=0};M.5A=6(e,f){H 6 a(b,c){K d=f[c].1K?f[c]:{1K:f[c]},h=r(d.1K,\"g\"),g=[],i;O(i=0;i<b.L;i++)M.3q(b[i],h,6(k){g.U(d.3p?k[d.3p]||\"\":k[0])});H c===f.L-1||!g.L?g:a(g,c+1)}([e],0)};16.Y.1B=6(e,f){H J.X(f[0])};16.Y.W=6(e,f){H J.X(f)};16.Y.X=6(e){I(e!=N)e+=\"\";K f=n.X.1B(J,15),a;I(f){I(!x&&f.L>1&&p(f,\"\")>-1){a=16(J.1n,n.Q.W(t(J),\"g\",\"\"));n.Q.W(e.1c(f.P),a,6(){O(K c=1;c<15.L-2;c++)I(15[c]===1b)f[c]=1b})}I(J.1r&&J.1r.1d)O(K b=1;b<f.L;b++)I(a=J.1r.1d[b-1])f[a]=f[b];!D&&J.1I&&!f[0].L&&J.11>f.P&&J.11--}H f};I(!D)16.Y.1t=6(e){(e=n.X.W(J,e))&&J.1I&&!e[0].L&&J.11>e.P&&J.11--;H!!e};1z.Y.1E=6(e){M.1S(e)||(e=16(e));I(e.1I){K f=n.1E.1B(J,15);e.11=0;H f}H e.X(J)};1z.Y.Q=6(e,f){K a=M.1S(e),b,c;I(a&&1g f.5z()===\"3g\"&&f.1j(\"${\")===-1&&y)H n.Q.1B(J,15);I(a){I(e.1r)b=e.1r.1d}Z e+=\"\";I(1g f===\"6\")c=n.Q.W(J,e,6(){I(b){15[0]=1k 1z(15[0]);O(K d=0;d<b.L;d++)I(b[d])15[0][b[d]]=15[d+1]}I(a&&e.1I)e.11=15[15.L-2]+15[0].L;H f.1B(N,15)});Z{c=J+\"\";c=n.Q.W(c,e,6(){K d=15;H n.Q.W(f,C,6(h,g,i){I(g)5r(g){2i\"$\":H\"$\";2i\"&\":H d[0];2i\"`\":H d[d.L-1].1c(0,d[d.L-2]);2i\"'\":H d[d.L-1].1c(d[d.L-2]+d[0].L);5q:i=\"\";g=+g;I(!g)H h;O(;g>d.L-3;){i=1z.Y.1c.W(g,-1)+i;g=1M.3j(g/10)}H(g?d[g]||\"\":\"$\")+i}Z{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&e.1I)e.11=0;H c};1z.Y.1f=6(e,f){I(!M.1S(e))H n.1f.1B(J,15);K a=J+\"\",b=[],c=0,d,h;I(f===1b||+f<0)f=5o;Z{f=1M.3j(+f);I(!f)H[]}O(e=M.3i(e);d=e.X(a);){I(e.11>c){b.U(a.1c(c,d.P));d.L>1&&d.P<a.L&&3c.Y.U.1B(b,d.1c(1));h=d[0].L;c=e.11;I(b.L>=f)1P}e.11===d.P&&e.11++}I(c===a.L){I(!n.1t.W(e,\"\")||h)b.U(\"\")}Z b.U(a.1c(c));H b.L>f?b.1c(0,f):b};M.1i(/\\(\\?#[^)]*\\)/,6(e){H n.1t.W(A,e.2J.1c(e.P+e[0].L))?\"\":\"(?:)\"});M.1i(/\\((?!\\?)/,6(){J.1d.U(N);H\"(\"});M.1i(/\\(\\?<([$\\w]+)>/,6(e){J.1d.U(e[1]);J.2I=R;H\"(\"});M.1i(/\\\\k<([\\w$]+)>/,6(e){K f=p(J.1d,e[1]);H f>-1?\"\\\\\"+(f+1)+(45(e.2J.3b(e.P+e[0].L))?\"\":\"(?:)\"):e[0]});M.1i(/\\[\\^?]/,6(e){H e[0]===\"[]\"?\"\\\\b\\\\B\":\"[\\\\s\\\\S]\"});M.1i(/^\\(\\?([5u]+)\\)/,6(e){J.3a(e[1]);H\"\"});M.1i(/(?:\\s+|#.*)+/,6(e){H n.1t.W(A,e.2J.1c(e.P+e[0].L))?\"\":\"(?:)\"},M.1G,6(){H J.2z(\"x\")});M.1i(/\\./,6(){H\"[\\\\s\\\\S]\"},M.1G,6(){H J.2z(\"s\")})})();1g 24!=\"1b\"&&(24.M=M);I(1g 1q==\"1b\")K 1q=6(){6 r(a,b){a.1l.1j(b)!=-1||(a.1l+=\" \"+b)}6 t(a){H a.1j(\"3d\")==0?a:\"3d\"+a}6 B(a){H f.1X.2M[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3t:[a.2L],h={\"#\":\"1h\",\".\":\"1l\"}[b.1p(0,1)]||\"3e\",g,i;g=h!=\"3e\"?b.1p(1):b.5v();I((a[h]||\"\").1j(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1Q.5L;I(!g.1J){g.1J=g.4u;g.3N=6(){J.4w=13}}c.W(d||1Q,g)}a.3h?a.3h(\"4z\"+b,h):a.4y(b,h,13)}6 A(a,b){K c=f.1X.2t,d=N;I(c==N){c={};O(K h 2g f.1T){K g=f.1T[h];d=g.4A;I(d!=N){g.1Y=h.4p();O(g=0;g<d.L;g++)c[d[g]]=h}}f.1X.2t=c}d=f.1T[c[a]];d==N&&b!=13&&1Q.1U(f.14.1w.1U+(f.14.1w.39+a));H d}6 v(a,b){O(K c=a.1f(\"\\n\"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1L(\"\\n\")}6 u(a,b){I(a==N||a.L==0||a==\"\\n\")H a;a=a.Q(/</g,\"&1A;\");a=a.Q(/ {2,}/g,6(c){O(K d=\"\",h=0;h<c.L-1;h++)d+=f.14.1Z;H d+\" \"});I(b!=N)a=v(a,6(c){I(c.L==0)H\"\";K d=\"\";c=c.Q(/^(&2r;| )+/,6(h){d=h;H\"\"});I(c.L==0)H d;H d+'<17 1e=\"'+b+'\">'+c+\"</17>\"});H a}6 n(a,b){a.1f(\"\\n\");O(K c=\"\",d=0;d<50;d++)c+=\"                    \";H a=v(a,6(h){I(h.1j(\"\\t\")==-1)H h;O(K g=0;(g=h.1j(\"\\t\"))!=-1;)h=h.1p(0,g)+c.1p(0,b-g%b)+h.1p(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,\"\")}6 D(a,b){I(a.P<b.P)H-1;Z I(a.P>b.P)H 1;Z I(a.L<b.L)H-1;Z I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2C?b.2C:c;(d=b.1K.X(a))!=N;){K i=g(d,b);I(1g i==\"3g\")i=[1k f.2G(i,d.P,b.22)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1D;|&1A;).*)/;H a.Q(f.3A.3M,6(c){K d=\"\",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H'<a 27=\"'+c+'\">'+c+\"</a>\"+d})}6 z(){O(K a=1C.30(\"1m\"),b=[],c=0;c<a.L;c++)a[c].3f==\"21\"&&b.U(a[c]);H b}6 e(a){a=a.1J;K b=p(a,\".21\",R);a=p(a,\".48\",R);K c=1C.3V(\"3s\");I(!(!a||!b||p(a,\"3s\"))){B(b.1h);r(b,\"1n\");O(K d=a.3t,h=[],g=0;g<d.L;g++)h.U(d[g].4B||d[g].4P);h=h.1L(\"\\r\");c.3G(1C.4N(h));a.3G(c);c.2H();c.4R();w(c,\"4S\",6(){c.2L.4V(c);b.1l=b.1l.Q(\"1n\",\"\")})}}I(1g 3F!=\"1b\"&&1g M==\"1b\")M=3F(\"M\").M;K f={2O:{\"1e-29\":\"\",\"2h-1s\":1,\"2m-1s-2p\":13,2b:N,1u:N,\"4i-4k\":R,\"4j-1W\":4,1v:R,18:R,\"3T-17\":R,2n:13,\"44-43\":R,2R:13,\"1y-1m\":13},14:{1Z:\"&2r;\",2q:R,4h:13,4d:13,36:\"4T\",1w:{23:\"4M 1n\",2S:\"?\",1U:\"1q\\n\\n\",39:\"4F't 4D 1F O: \",4f:\"4C 4G't 4H O 1y-1m 4K: \",31:'<!4J 1y 4Q \"-//4I//3H 4E 1.0 4L//4O\" \"20://2w.3L.3K/4W/3I/3H/3I-4m.4q\"><1y 4o=\"20://2w.3L.3K/4x/4r\"><3J><5M 20-4s=\"4t-5p\" 5Y=\"2D/1y; 71=75-8\" /><1u>6V 1q</1u></3J><3B 1N=\"28-6T:74,6G,6S,6A-6H;6J-2e:#6K;2e:#6L;28-1W:6M;2D-3D:3C;\"><T 1N=\"2D-3D:3C;3w-37:1.6N;\"><T 1N=\"28-1W:6Q-6P;\">1q</T><T 1N=\"28-1W:.6I;3w-6B:6z;\"><T>3v 3.0.6C (6D 12 3x)</T><T><a 27=\"20://3u.2l/1q\" 1J=\"38\" 1N=\"2e:#3y\">20://3u.2l/1q</a></T><T>6E 17 6R 72.</T><T>73 6Z-3x 6Y 6U.</T></T><T>70 6X 6W J 1m, 76 <a 27=\"6x://2w.62.2l/61-60/5Z?63=64-68&67=66\" 1N=\"2e:#3y\">6y</a> 5X <2Q/>5Q 5P 5O!</T></T></3B></1y>'}},1X:{2t:N,2M:{}},1T:{},3A:{5R:/\\/\\*[\\s\\S]*?\\*\\//2j,5S:/\\/\\/.*$/2j,5W:/#.*$/2j,5V:/\"([^\\\\\"\\n]|\\\\.)*\"/g,5U:/'([^\\\\'\\n]|\\\\.)*'/g,5T:1k M('\"([^\\\\\\\\\"]|\\\\\\\\.)*\"',\"3z\"),69:1k M(\"'([^\\\\\\\\']|\\\\\\\\.)*'\",\"3z\"),6q:/(&1A;|<)!--[\\s\\S]*?--(&1D;|>)/2j,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6n:{19:/(&1A;|<)\\?=?/g,1a:/\\?(&1D;|>)/g},6r:{19:/(&1A;|<)%=?/g,1a:/%(&1D;|>)/g},6s:{19:/(&1A;|<)\\s*1m.*?(&1D;|>)/2U,1a:/(&1A;|<)\\/\\s*1m\\s*(&1D;|>)/2U}},18:{1H:6(a){6 b(i,k){H f.18.2v(i,k,f.14.1w[k])}O(K c='<T 1e=\"18\">',d=f.18.2o,h=d.33,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+=\"</T>\";H c},2v:6(a,b,c){H'<2W><a 27=\"#\" 1e=\"6w 6v'+b+\" \"+b+'\">'+c+\"</a></2W>\"},2f:6(a){K b=a.1J,c=b.1l||\"\";b=B(p(b,\".21\",R).1h);K d=6(h){H(h=16(h+\"6u(\\\\w+)\").X(c))?h[1]:N}(\"6t\");b&&d&&f.18.2o[d].2P(b);a.3N()},2o:{33:[\"23\",\"2S\"],23:{1H:6(a){I(a.V(\"2n\")!=R)H\"\";K b=a.V(\"1u\");H f.18.2v(a,\"23\",b?b:f.14.1w.23)},2P:6(a){a=1C.6l(t(a.1h));a.1l=a.1l.Q(\"3W\",\"\")}},2S:{2P:6(){K a=\"6e=0\";a+=\", 19=\"+(35.32-2X)/2+\", 37=\"+(35.2Z-34)/2+\", 32=2X, 2Z=34\";a=a.Q(/^,/,\"\");a=1Q.6b(\"\",\"38\",a);a.2H();K b=a.1C;b.6f(f.14.1w.31);b.6g();a.2H()}}}},2Y:6(a,b){K c;I(b)c=[b];Z{c=1C.30(f.14.36);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(f.14.2q)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3U 0,l={},m=1k M(\"^\\\\[(?<2V>(.*?))\\\\]$\"),s=1k M(\"(?<29>[\\\\w-]+)\\\\s*:\\\\s*(?<1V>[\\\\w-%#]+|\\\\[.*?\\\\]|\\\".*?\\\"|'.*?')\\\\s*;?\",\"g\");(j=s.X(k))!=N;){K o=j.1V.Q(/^['\"]|['\"]$/g,\"\");I(o!=N&&m.1t(o)){o=m.X(o);o=o.2V.L>0?o.2V.1f(/\\s*,\\s*/):[]}l[j.29]=o}g={1J:g,1o:C(i,l)};g.1o.1F!=N&&d.U(g)}H d},2b:6(a,b){K c=J.2Y(a,b),d=N,h=f.14;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1J,k=b.1o,j=k.1F,l;I(j!=N){I(k[\"1y-1m\"]==\"R\"||f.2O[\"1y-1m\"]==R){d=1k f.4l(j);j=\"4v\"}Z I(d=A(j))d=1k d;Z 6h;l=i.3O;I(h.2q){l=l;K m=x(l),s=13;I(m.1j(\"<![6i[\")==0){m=m.4e(9);s=R}K o=m.L;I(m.1j(\"]]\\>\")==o-3){m=m.4e(0,o-3);s=R}l=s?m:l}I((i.1u||\"\")!=\"\")k.1u=i.1u;k.1F=j;d.2y(k);b=d.2T(l);I((i.1h||\"\")!=\"\")b.1h=i.1h;i.2L.6j(b,i)}}},6k:6(a){w(1Q,\"4g\",6(){f.2b(a)})}};f.2G=6(a,b,c){J.1V=a;J.P=b;J.L=a.L;J.22=c;J.1Y=N};f.2G.Y.1x=6(){H J.1V};f.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1k f.1T.6c,g=J,i=\"2T 1H 2y\".1f(\" \");I(c!=N){d=1k c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1B(h,15)}})();d.2c==N?1Q.1U(f.14.1w.1U+(f.14.1w.4f+a)):h.2A.U({1K:d.2c.17,2C:6(j){O(K l=j.17,m=[],s=d.2A,o=j.P+j.19.L,F=d.2c,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.19!=N&&j.19!=N){q=y(j.19,F.19);b(q,j.P);m=m.1O(q)}I(F.1a!=N&&j.1a!=N){q=y(j.1a,F.1a);b(q,j.P+j[0].6d(j.1a));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1Y=c.1Y;H m}})}};f.4b=6(){};f.4b.Y={V:6(a,b){K c=J.1o[a];c=c==N?b:c;K d={\"R\":R,\"13\":13}[c];H d==N?c:d},3R:6(a){H 1C.3V(a)},3Q:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1g a[d]==\"2F\")c=c.1O(y(b,a[d]));H J.3X(c.6m(D))},3X:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1P;Z I(g.P==c.P&&g.L>c.L)a[b]=N;Z I(g.P>=c.P&&g.P<d)a[h]=N}H a},3P:6(a){K b=[],c=2u(J.V(\"2h-1s\"));v(a,6(d,h){b.U(h+c)});H b},40:6(a){K b=J.V(\"2b\",[]);I(1g b!=\"2F\"&&b.U==N)b=[b];a:{a=a.1x();K c=3U 0;O(c=c=1M.6o(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1P a}b=-1}H b!=-1},2s:6(a,b,c){a=[\"1s\",\"6p\"+b,\"P\"+a,\"6a\"+(b%2==0?1:2).1x()];J.40(b)&&a.U(\"5N\");b==0&&a.U(\"1P\");H'<T 1e=\"'+a.1L(\" \")+'\">'+c+\"</T>\"},49:6(a,b){K c=\"\",d=a.1f(\"\\n\").L,h=2u(J.V(\"2h-1s\")),g=J.V(\"2m-1s-2p\");I(g==R)g=(h+d-1).1x().L;Z I(45(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=f.14.1Z;Z{j=g;O(K l=k.1x();l.L<j;)l=\"0\"+l;j=l}a=j;c+=J.2s(i,k,a)}H c},41:6(a,b){a=x(a);K c=a.1f(\"\\n\");J.V(\"2m-1s-2p\");K d=2u(J.V(\"2h-1s\"));a=\"\";O(K h=J.V(\"1F\"),g=0;g<c.L;g++){K i=c[g],k=/^(&2r;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1x();i=i.1p(j.L);j=j.Q(\" \",f.14.1Z)}i=x(i);I(i.L==0)i=f.14.1Z;a+=J.2s(g,l,(j!=N?'<17 1e=\"'+h+' 65\">'+j+\"</17>\":\"\")+i)}H a},4a:6(a){H a?\"<3Y>\"+a+\"</3Y>\":\"\"},46:6(a,b){6 c(l){H(l=l?l.1Y||g:g)?l+\" \":\"\"}O(K d=0,h=\"\",g=J.V(\"1F\",\"\"),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1p(d,k.P-d),j+\"4c\")+u(k.1V,j+k.22);d=k.P+k.L+(k.6F||0)}}h+=u(a.1p(d),c()+\"4c\");H h},1H:6(a){K b=\"\",c=[\"21\"],d;I(J.V(\"2R\")==R)J.1o.18=J.1o.1v=13;1l=\"21\";J.V(\"2n\")==R&&c.U(\"3W\");I((1v=J.V(\"1v\"))==13)c.U(\"6O\");c.U(J.V(\"1e-29\"));c.U(J.V(\"1F\"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,\"\").Q(/\\r/g,\" \");b=J.V(\"4j-1W\");I(J.V(\"4i-4k\")==R)a=n(a,b);Z{O(K h=\"\",g=0;g<b;g++)h+=\" \";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2Q\\s*\\/?>|&1A;2Q\\s*\\/?&1D;/2U;I(f.14.4h==R)b=b.Q(h,\"\\n\");I(f.14.4d==R)b=b.Q(h,\"\");b=b.1f(\"\\n\");h=/^\\s*/;g=4n;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1P a}g=1M.4U(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1p(g);a=b.1L(\"\\n\")}I(1v)d=J.3P(a);b=J.3Q(J.2A,a);b=J.46(a,b);b=J.41(b,d);I(J.V(\"44-43\"))b=E(b);1g 2E!=\"1b\"&&2E.42&&2E.42.1E(/5w/)&&c.U(\"5x\");H b='<T 1h=\"'+t(J.1h)+'\" 1e=\"'+c.1L(\" \")+'\">'+(J.V(\"18\")?f.18.1H(J):\"\")+'<3S 5y=\"0\" 5t=\"0\" 4X=\"0\">'+J.4a(J.V(\"1u\"))+\"<3Z><47>\"+(1v?'<25 1e=\"1v\">'+J.49(a)+\"</25>\":\"\")+'<25 1e=\"17\"><T 1e=\"48\">'+b+\"</T></25></47></3Z></3S></T>\"},2T:6(a){I(a===N)a=\"\";J.17=a;K b=J.3R(\"T\");b.3O=J.1H(a);J.V(\"18\")&&w(p(b,\".18\"),\"5s\",f.18.2f);J.V(\"3T-17\")&&w(p(b,\".17\"),\"5K\",e);H b},2y:6(a){J.1h=\"\"+1M.5G(1M.5C()*5D).1x();f.1X.2M[t(J.1h)]=J;J.1o=C(f.2O,a||{});I(J.V(\"2R\")==R)J.1o.18=J.1o.1v=13},5E:6(a){a=a.Q(/^\\s+|\\s+$/g,\"\").Q(/\\s+/g,\"|\");H\"\\\\b(?:\"+a+\")\\\\b\"},5n:6(a){J.2c={19:{1K:a.19,22:\"1m\"},1a:{1K:a.1a,22:\"1m\"},17:1k M(\"(?<19>\"+a.19.1n+\")(?<17>.*?)(?<1a>\"+a.1a.1n+\")\",\"54\")}}};H f}();1g 24!=\"1b\"&&(24.1q=1q);",62,441,"||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|prototype|else||lastIndex||false|config|arguments|RegExp|code|toolbar|left|right|undefined|slice|captureNames|class|split|typeof|id|addToken|indexOf|new|className|script|source|params|substr|SyntaxHighlighter|_xregexp|line|test|title|gutter|strings|toString|html|String|lt|apply|document|gt|match|brush|OUTSIDE_CLASS|getHtml|global|target|regex|join|Math|style|concat|break|window|throw|isRegExp|brushes|alert|value|size|vars|brushName|space|http|syntaxhighlighter|css|expandSource|exports|td|dA|href|font|name|Fa|highlight|htmlScript|can|color|handler|in|first|case|gm|INSIDE_CLASS|com|pad|collapse|items|numbers|useScriptTags|nbsp|getLineHtml|discoveredBrushes|parseInt|getButtonHtml|www|pattern|init|hasFlag|regexList|cache|func|text|navigator|object|Match|focus|hasNamedCapture|input|Error|parentNode|highlighters|trigger|defaults|execute|br|light|help|getDiv|gi|values|span|500|findElements|height|getElementsByTagName|aboutDialog|width|list|250|screen|tagName|top|_blank|noBrush|setFlag|charAt|Array|highlighter_|nodeName|type|string|attachEvent|copyAsGlobal|floor|Za|sticky|the|TypeError|scope|backref|iterate|freezeTokens|textarea|childNodes|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|output|require|appendChild|DTD|xhtml1|head|org|w3|url|preventDefault|innerHTML|figureOutLineNumbers|findMatches|create|table|quick|void|createElement|collapsed|removeNestedMatches|caption|tbody|isLineHighlighted|getCodeLinesHtml|userAgent|links|auto|isNaN|getMatchesHtml|tr|container|getLineNumbersHtml|getTitleHtml|Highlighter|plain|stripBrs|substring|brushNotHtmlScript|load|bloggerMode|smart|tab|tabs|HtmlScript|transitional|1E3|xmlns|toLowerCase|dtd|xhtml|equiv|Content|srcElement|htmlscript|returnValue|1999|addEventListener|on|aliases|innerText|Brush|find|XHTML|Can|wasn|configured|W3C|DOCTYPE|option|Transitional|expand|createTextNode|EN|textContent|PUBLIC|select|blur|pre|min|removeChild|TR|cellspacing|from|another||one|constructing|when|sgi|constructor|functions|definition|token|within|flags|supply|expected|frame|same|twice|ignoreCase|multiline|finally|catch|try|extended|gimy|forHtmlScript|Infinity|Type|default|switch|click|cellpadding|imsx|toUpperCase|MSIE|ie|border|valueOf|matchChain|escape|random|1E6|getKeywords|execAt|round|Object|after|run|dblclick|event|meta|highlighted|active|development|keep|multiLineCComments|singleLineCComments|multiLineDoubleQuotedString|singleQuotedString|doubleQuotedString|singleLinePerlComments|to|content|webscr|bin|cgi|paypal|cmd|_s|spaces|2930402|hosted_button_id|xclick|multiLineSingleQuotedString|alt|open|Xml|lastIndexOf|scrollbars|write|close|continue|CDATA|replaceChild|all|getElementById|sort|phpScriptTags|max|number|xmlComments|aspScriptTags|scriptScriptTags|command|_|command_|toolbar_item|https|donate|3em|sans|bottom|87|November|JavaScript|offset|Arial|serif|75em|background|fff|000|1em|5em|nogutter|large|xx|syntax|Helvetica|family|Gorbatchev|About|like|you|Alex|2004|If|charset|highlighter|Copyright|Geneva|utf|please".split("|"),0,{}));
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7b0(){
var _7b1="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _7b2="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _7b3="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7b1),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_7b3),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_7b2),"gm"),css:"keyword bold"}];
};
_7b0.prototype=new SyntaxHighlighter.Highlighter();
_7b0.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_7b0;
typeof (exports)!="undefined"?exports.Brush=_7b0:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7b4(){
var _7b5="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _7b6(_7b7,_7b8){
var css=(_7b7[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_7b7[0],_7b7.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_7b6},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7b5),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7b4.prototype=new SyntaxHighlighter.Highlighter();
_7b4.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_7b4;
typeof (exports)!="undefined"?exports.Brush=_7b4:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7b9(){
function _7ba(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _7bb(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _7bc="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _7bd="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _7be="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_7ba(_7bc),"gm"),css:"keyword"},{regex:new RegExp(_7bb(_7bd),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_7be),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_7b9.prototype=new SyntaxHighlighter.Highlighter();
_7b9.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_7b9;
typeof (exports)!="undefined"?exports.Brush=_7b9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7bf(){
var _7c0="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_7c0),"gmi"),css:"keyword"}];
};
_7bf.prototype=new SyntaxHighlighter.Highlighter();
_7bf.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_7bf;
typeof (exports)!="undefined"?exports.Brush=_7bf:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7c1(){
function _7c2(_7c3,_7c4){
var _7c5=SyntaxHighlighter.Match,code=_7c3[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_7c6=[];
if(_7c3.attributes!=null){
var _7c7,_7c8=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_7c7=_7c8.exec(code))!=null){
_7c6.push(new _7c5(_7c7.name,_7c3.index+_7c7.index,"color1"));
_7c6.push(new _7c5(_7c7.value,_7c3.index+_7c7.index+_7c7[0].indexOf(_7c7.value),"string"));
}
}
if(tag!=null){
_7c6.push(new _7c5(tag.name,_7c3.index+tag[0].indexOf(tag.name),"keyword"));
}
return _7c6;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_7c2}];
};
_7c1.prototype=new SyntaxHighlighter.Highlighter();
_7c1.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_7c1;
typeof (exports)!="undefined"?exports.Brush=_7c1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7c9(){
var _7ca="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_7ca),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_7c9.prototype=new SyntaxHighlighter.Highlighter();
_7c9.aliases=["java"];
SyntaxHighlighter.brushes.Java=_7c9;
typeof (exports)!="undefined"?exports.Brush=_7c9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7cb(){
var _7cc="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7cc),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_7cb.prototype=new SyntaxHighlighter.Highlighter();
_7cb.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_7cb;
typeof (exports)!="undefined"?exports.Brush=_7cb:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7cd(){
var _7ce="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _7cf="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _7d0="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_7ce),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_7d0),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_7cf),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_7cd.prototype=new SyntaxHighlighter.Highlighter();
_7cd.aliases=["php"];
SyntaxHighlighter.brushes.Php=_7cd;
typeof (exports)!="undefined"?exports.Brush=_7cd:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7d1(){
var _7d2="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _7d3="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _7d4="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_7d3),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_7d2),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_7d4),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7d1.prototype=new SyntaxHighlighter.Highlighter();
_7d1.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_7d1;
typeof (exports)!="undefined"?exports.Brush=_7d1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7d5(){
var _7d6="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _7d7="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_7d6),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_7d7),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7d5.prototype=new SyntaxHighlighter.Highlighter();
_7d5.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_7d5;
typeof (exports)!="undefined"?exports.Brush=_7d5:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7d8(){
var _7d9="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _7da="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _7db="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_7d9),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_7db),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_7da),"gmi"),css:"keyword"}];
};
_7d8.prototype=new SyntaxHighlighter.Highlighter();
_7d8.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_7d8;
typeof (exports)!="undefined"?exports.Brush=_7d8:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7dc(){
var _7dd="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7dd),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7dc.prototype=new SyntaxHighlighter.Highlighter();
_7dc.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_7dc;
typeof (exports)!="undefined"?exports.Brush=_7dc:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7de(){
function _7df(_7e0,_7e1){
var _7e2=SyntaxHighlighter.Match,code=_7e0[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_7e3=[];
if(_7e0.attributes!=null){
var _7e4,_7e5=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_7e4=_7e5.exec(code))!=null){
_7e3.push(new _7e2(_7e4.name,_7e0.index+_7e4.index,"color1"));
_7e3.push(new _7e2(_7e4.value,_7e0.index+_7e4.index+_7e4[0].indexOf(_7e4.value),"string"));
}
}
if(tag!=null){
_7e3.push(new _7e2(tag.name,_7e0.index+tag[0].indexOf(tag.name),"keyword"));
}
return _7e3;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_7df}];
};
_7de.prototype=new SyntaxHighlighter.Highlighter();
_7de.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_7de;
typeof (exports)!="undefined"?exports.Brush=_7de:null;
})();
function ClojureRegExp(_7e6){
_7e6=_7e6+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_7e6,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _7e7,_7e8;
while(_7e7=this.regex.exec(str)){
_7e8=str.substring(0,_7e7.index);
if(this.lookBehind.test(_7e8)){
return _7e7;
}else{
this.regex.lastIndex=_7e7.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _7e9=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_7ea="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_7eb){
_7eb=_7eb.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_7eb=_7eb.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_7eb+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_7e9)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_7ea)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7ec(){
var _7ed="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _7ee="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_7ed),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_7ee),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_7ec.prototype=new SyntaxHighlighter.Highlighter();
_7ec.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_7ec;
typeof (exports)!="undefined"?exports.Brush=_7ec:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7ef(){
var _7f0="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _7f1="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_7f0),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_7f1),"gm"),css:"functions"}];
};
_7ef.prototype=new SyntaxHighlighter.Highlighter();
_7ef.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_7ef;
typeof (exports)!="undefined"?exports.Brush=_7ef:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f2(){
var _7f3="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_7f3),"gm"),css:"keyword"}];
};
_7f2.prototype=new SyntaxHighlighter.Highlighter();
_7f2.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_7f2;
typeof (exports)!="undefined"?exports.Brush=_7f2:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f4(){
var _7f5="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _7f6="void boolean byte char short int long float double";
var _7f7="null";
var _7f8="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_7f5),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_7f6),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_7f7),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_7f8),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7f4.prototype=new SyntaxHighlighter.Highlighter();
_7f4.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_7f4;
typeof (exports)!="undefined"?exports.Brush=_7f4:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f9(){
var _7fa="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _7fb="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_7fa),"gm"),css:"keyword"},{regex:new RegExp(_7fb,"gm"),css:"keyword"}];
};
_7f9.prototype=new SyntaxHighlighter.Highlighter();
_7f9.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_7f9;
typeof (exports)!="undefined"?exports.Brush=_7f9:null;
})();
(function($){
$.fn.starrating=function(_7fc){
var _7fc=$.extend({},$.fn.starrating.options,_7fc||{});
return this.each(function(){
var o=$.meta?$.extend({},_7fc,$this.data()):_7fc;
var url=this.action,_7fd,_7fe,_7ff;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _800=div.find("div.star");
var _801=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_800.mouseover(_802).focus(_802).mouseout(_803).blur(_803).click(_804);
_801.mouseover(_805).focus(_805).mouseout(_806).blur(_806).click(_804);
}else{
_807(div);
}
_808();
function init(elem){
_7fd=$(elem).attr("title").split(/:\s*/)[1],_7fe=_7fd.split(".")[0],_7ff=_7fd.split(".")[1];
};
function _802(){
_809();
fill(this);
};
function _803(){
_809();
_808();
};
function _806(){
_808();
$(this).removeClass("on");
};
function _805(){
_809();
$(this).addClass("on");
};
function _807(elem){
_800.unbind();
_801.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _80a=$(this).attr("title");
var _80b="Average Rating: "+_7fd;
$(this).attr("title",_80a.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_80b).replace("Cancel Rating",_80b));
$(this).css("cursor","default");
$(this).hover(function(){
if($(this).parent().hasClass("on")){
$(this).css("background-position",o.position);
}else{
$(this).css("background-position","inherit");
}
});
$(this).click(function(e){
e.preventDefault();
});
});
};
function _804(){
if(_800.index(this)==-1&&!o.cancelSubmit){
return false;
}
_7fe=_800.index(this)+1;
_7ff=0;
if(_7fe==0){
_809();
}
var _80c=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_80c},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _80d=$("div."+o.ratingClass);
init(_80d);
_803();
if(o.disableOnSubmit){
_807(_80d);
}
}});
}else{
o.success(_80c);
}
return false;
};
function fill(elem){
_800.find("a").css("width","100%");
$(_800[_800.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _809(){
_800.removeClass("on hover");
};
function _808(){
$(_800[_7fe-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _80e=_7ff?_7ff*10:0;
if(_80e>0){
$(_800[_7fe]).addClass("on").children("a").css("width",_80e+"%");
}
};
}).remove();
};
if($.browser.msie){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
$.fn.starrating.options={cancelSubmit:true,disabled:false,position:"-87px -91px",success:function(data){
alert("Success!");
},disableOnSubmit:false,isStatic:false,ratingClass:"rating",params:{id:1}};
})(jQuery);
jq(document).ready(function(){
var _80f="<span class=\"read_more\">+ More</span>";
function _810(){
jq(this).find("span.details").css({display:"inline"});
};
jq("body.newprofile #profile_header div.bio_container").expander({slicePoint:450,widow:8,expandText:_80f,userCollapseText:"",expandSpeed:0,afterExpand:_810});
jq(".content_listing.text_content > li").each(function(i,el){
el=jq(el);
var tb=el.find("a.title").first();
jq(el.find("a.article img").first()).load(function(){
var w=jq(this).width();
if(tb.height()>60){
el.addClass("smaller");
}
});
});
try{
_gaq.push(["t2._trackEvent","Related User","View","User Profile",0,true]);
jq(".similar_users_box .x_icon").live("click",function(ev){
_gaq.push(["t2._trackEvent","Related User","Dismiss","User Profile"]);
});
jq(".similar_users_box .f_button").live("click",function(ev){
_gaq.push(["t2._trackEvent","Related User","Follow","User Profile"]);
});
jq(".similar_users_box .similar_user_photo a, .similar_users_box .link_profile a").live("click",function(ev){
ev.preventDefault();
_gaq.push(["t2._trackEvent","Related User","Visit","User Profile"]);
window.location.href=jq(this).attr("href");
});
}
catch(e){
console.log("_gaq is undefined");
}
});
var ProfileManager=function(_811,_812,_813,_814,_815){
this.userId=_811;
this.userName=_812;
this.loggedInUserId=_813;
this.currentSection="mycontent";
this.defaultTab="hubs_items";
this.containerSectionDiv=jq("#profile_content_container");
this.profileContainer=_814;
this.loadMoreBtn=this.profileContainer.find("#load_more_btn");
this.spinnerDiv=_815;
this.allowedSections=["mycontent","activity","followers","following","fanmail","email","bio"];
this.moreRequest=this.profileContainer.data("moreRequest");
this.moreTopic=this.profileContainer.data("moreTopic");
this.moreArticle=this.profileContainer.data("moreArticle");
this.bindEvents();
HubPages.Lightbox.Slideshow.init(this.userId,"","","ul.profile_links > li.recent_images");
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
jq("#pagination").hide();
var _816=window.location.href,hash=window.location.hash;
if(window.location.href.match(/filter=|page=/)){
if(hash){
parent.location.href=_816.match(/^.*new/)[0]+hash;
}else{
parent.location.href=_816.match(/^.*new/)[0];
}
}
if(hash){
this.loadSectionByHashTag(hash);
}else{
var _817=this.activateAvailableTag(this.defaultTab);
("undefined"!=typeof content_items)?content_items.activate(_817):false;
this.showLoadMoreButton();
ProfileManager.prototype.applyMasonry(jq("#content_"+this.defaultTab+">.content_listing"));
}
jq("div.categoryTeaser").each(function(){
var _818=jq(this).find("img"),_819=_818.height(),_81a=_818.width(),_81b=300,_81c=240,_81d=_819/_81a,_81e=_81c/_81b,_81f=_81b,_820=_81c;
if(_81d<_81e){
_81f=_81a/_819*_81c;
}else{
if(_81d>_81e){
_820=_819/_81a*_81b;
}
}
_818.css({"position":"relative","height":_820+"px","width":_81f+"px"});
var _821=((_818.height()-_81c)*0.4)*-1,_822=((_818.width()-_81b)/2)*-1;
_818.css({"top":_821+"px","left":_822+"px"});
});
};
ProfileManager.prototype.activateAvailableTag=function(_823){
if(jq("#"+_823+"_item").length>0){
return _823;
}else{
var _824=jq("#section_mycontent > div.content_items > ul.content_list:parent");
if(_824.length>0){
return _824.parent().attr("id").replace(/content_/,"");
}
}
};
ProfileManager.prototype.destroyMasonry=function(dest){
dest.masonry("destroy");
};
ProfileManager.prototype.applyMasonry=function(dest){
dest.imagesLoaded(function(){
if(!dest.hasClass("masonry")){
dest.masonry({itemSelector:"li",columnWidth:295,gutterWidth:10});
}else{
}
});
};
ProfileManager.prototype.showLoadMoreButton=function(){
var _825=this.containerSectionDiv.find("> div:visible");
switch(this.currentSection){
case "mycontent":
var _826=jq(".content_nav ul#tabs li.active");
if(_826.length>0){
var _827=_826.attr("id").replace(/_items_item/,"");
if(this.moreContent(_827)){
if(!_825.find("div.content_items:visible").first().data("no_content")){
this.containerSectionDiv.find("> div:visible").append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}else{
this.loadMoreBtn.hide();
}
}
break;
case "following":
if(!_825.find("#following_people").data("no_content")||!_825.find("#following_topics").data("no_content")){
_825.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
break;
default:
if(this.currentSection!="activity"){
var _828=this.getDivSection(this.currentSection);
if(!_828.data("no_content")){
_825.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}
}
};
ProfileManager.prototype.loadSectionByHashTag=function(_829){
if(_829){
var _82a=_829.replace("#",""),_82b=this.defaultTab,_82c="";
if(_82a.match(/^slide/)){
jq("ul.profile_links > li.recent_images").trigger("click");
}else{
if(_82a.match(/^mycontent_.*_hubs$/)||_82a.match(/^mycontent_.*_forums$/)||_82a.match(/^mycontent_.*_answers$/)){
var _82d=_82a.replace(/^mycontent_|_[a-z]+$/g,""),tab=_82a.match(/[a-z]+$/),_82e=jq("#"+tab+"_topic_menu li");
for(var i=0,l=_82e.length;i<l;i++){
if(jq(_82e[i]).attr("data-hash")==_82d){
_82b=tab+"_items";
_82c=this.activateAvailableTag(_82b);
("undefined"!=typeof content_items)?content_items.activate(_82c):false;
jq(_82e[i]).trigger("click");
break;
}
}
}else{
if(this.isValidSection(_82a)){
jq("a[href=#"+this.currentSection+"]").parent().removeClass("active");
this.currentSection=_82a;
if(this.currentSection=="email"){
this.currentSection="fanmail";
}
if(this.currentSection=="bio"){
if(jq("#read_bio").length>0){
jq("#read_bio").trigger("click");
}
}else{
this.loadSection(this.currentSection,function(){
if(_82a=="email"){
if(this.profileContainer.data("send_email")=="1"){
this.openFancyBox("#email_to_user");
}
}
});
}
}
}
}
_82c=this.activateAvailableTag(_82b);
("undefined"!=typeof content_items)?content_items.activate(_82c):false;
this.showLoadMoreButton();
}
};
ProfileManager.prototype.isValidSection=function(_82f){
var _830=false;
for(i in this.allowedSections){
if(this.allowedSections[i]==_82f){
_830=true;
break;
}
}
return _830;
};
ProfileManager.prototype.loadContentOnScroll=function(){
var _831=jq(window),_832=jq("#footer_wrap"),pos=_831.scrollTop(),_833=jq("#profile_header"),_834=_833.offset().top,_835=jq(window).scrollTop()>=(jq(document).height()-jq(window).height()-30),_836=jq("#profile_content_container > div:visible"),_837=(_836.length>0)?_836.attr("id").replace(/section_/,""):"",_838=[],_839=jq(".content_nav ul#tabs li.active"),_83a="";
if(_837=="mycontent"){
if(_839.length==0){
return;
}
_83a=_839.attr("id").replace(/_items_item/,"");
}
if(_837=="following"){
_838.push(jq("#following_people"));
_838.push(jq("#following_topics"));
}else{
if(this.getDivSection(_837)){
_838.push(this.getDivSection(_837));
}
}
_838.each(jq.proxy(function(_83b){
if(!this.moreContent(_83a)){
return;
}
if(!_83b.data("no_content")){
if(_83b.data("loading")){
return;
}
if((_831.scrollTop()+_831.height())>=(jq(document).height()-1)){
setTimeout(jQuery.proxy(function(){
this.loadContent(_83b,_837,_83a);
},this),300);
}
}
},this));
};
ProfileManager.prototype.moreContent=function(_83c){
if((_83c=="answers"&&this.moreRequest==="1")||(_83c=="hubs"&&this.moreArticle==="1")||(_83c=="topic"&&this.moreTopic==="1")){
return true;
}else{
if((_83c=="answers"&&this.moreRequest==="0")||(_83c=="hubs"&&this.moreArticle==="0")||(_83c=="topic"&&this.moreTopic==="0")){
return false;
}
}
};
ProfileManager.prototype.loadContent=function(_83d,_83e,_83f){
var _840=jq(".newprofile #show_only").data("categoryId")||"all";
var page=_83d.data("next")||2;
this.loadMoreBtn.hide();
if(jq("#spinner_loading").length>0){
_841=jq("#spinner_loading");
}else{
var _842=jq("#footer_wrap").height();
var _841=jq("<div/>",{"id":"spinner_loading",}).html(jq(this.spinnerDiv));
}
_841.show();
_83d.parent().append(_841);
_83d.parent().find("#spinner_loading > img.spinner").show();
if(_83e=="following"){
_83e=_83d.attr("id");
}
_83d.data("loading",true);
jq.get(this.profileContainer.data("loadMoreUrl"),{section:_83e,userId:this.userId,activeTab:_83f,categoryId:_840,page:page,ajax:1},jq.proxy(function(data,_843,xhr){
_841.hide();
if(_83e=="fanmail"){
var _844=jq(data.render);
jq.each(_844,function(){
if(jq("#"+jq(this).attr("id")).length===0){
_83d.append(this);
}
});
}else{
var _845=false;
jq.each(data.render,function(id,val){
if(_83d.find("#"+id).length===0){
if(_83e=="mycontent"){
var ul=_83d.find("ul");
if(ul.hasClass("masonry")){
var elem=jq(val);
ul.append(elem).masonry("appended",elem);
}else{
_845=true;
ul.append(val);
}
}else{
_83d.append(val);
}
}
});
if(_845){
ProfileManager.prototype.applyMasonry(ul);
}
}
if(data.more){
jq(document).data("no_content_all",false);
_83d.data("next",page+1);
this.loadMoreBtn.show();
}else{
jq(document).data("no_content_all",true);
_83d.data("no_content",true);
}
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
_83d.data("loading",false);
},this),"json");
};
ProfileManager.prototype.dismissSimilarUser=function(self){
var _846=jq(this).parent(),_847=_846.attr("id").replace(/similar_user_/,""),_848=jq("div.similar_users_box"),_849=_848.find(".last_similar_user");
if(_849.length===0){
firstUserId=_848.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
}else{
firstUserId=_849.attr("id").replace(/similar_user_/,"");
}
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:self.userId,userId:_847,firstUserId:firstUserId,action:"dismiss"},success:jq.proxy(function(data){
_846.fadeOut("slow",function(){
if(_846.parent().find(".similar_user:visible").length==0){
_846.parent().parent().fadeOut("slow",function(){
jq(this).remove();
});
}
if(data.render!=""){
_848.find(".last_similar_user").each(function(){
jq(this).removeClass("last_similar_user");
});
_846.replaceWith(data.render);
jq("#"+jq(data.render).attr("id")).addClass("last_similar_user");
_848.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_848.find(".similar_user").length<3){
self.loadSingleSimilarUser();
}
}
jq(this).remove();
});
},this)});
};
ProfileManager.prototype.loadSingleSimilarUser=function(){
var _84a=jq("div.similar_users_box"),_84b=_84a.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:this.userId,firstUserId:_84b},success:jq.proxy(function(data){
if(data.render!=""){
_84a.find("div.content_box_i").append(data.render);
_84a.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}
if(_84a.find(".similar_user").length<3){
this.loadSingleSimilarUser();
}
},this)});
};
ProfileManager.prototype.loadSimilarUsers=function(num){
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{userId:this.userId,num:num,action:"load"},success:jq.proxy(function(data){
var _84c=jq("div.similar_users_box"),_84d=_84c.find(".similar_user").length;
if(data.render!=""){
_84c.find("div.content_box_i").append(data.render);
_84c.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_84c.find(".similar_user").length<3&&data.more){
this.loadSingleSimilarUser();
}
}else{
if(data.more){
this.loadSingleSimilarUser();
}
}
},this)});
};
ProfileManager.prototype.bindEvents=function(){
var self=this;
jq(document).bind("slideshow_loaded",function(){
var _84e=new RegExp(window.location.hash.replace(/slide|#/g,""),"i");
jq.each(jq(".slideshow img"),function(){
if(_84e.test(jq(this).attr("src"))){
var href=jq(this).parents(".content").attr("id");
jq("a[href=#"+href+"]").trigger("click");
}
});
});
self.loadMoreBtn.live("click",function(){
var _84f=jq("#profile_content_container > div:visible"),_850=(_84f.length>0)?_84f.attr("id").replace(/section_/,""):"",_851=[],_852=jq(".content_nav ul#tabs li.active"),_853="";
if(_850=="mycontent"){
if(_852.length==0){
return;
}
_853=_852.attr("id").replace(/_items_item/,"");
_851.push(_84f.find("div.content_items:visible").first());
}else{
if(_850=="followers"){
_851.push(_84f.find("div").first());
}else{
if(_850=="following"){
_851.push(jq("#following_people"));
_851.push(jq("#following_topics"));
}else{
if(_850=="fanmail"){
_851.push(_84f.find("#fanmail_content"));
}
}
}
}
_851.each(function(_854){
if(!_854.data("no_content")){
if(_854.data("loading")){
return;
}
self.loadContent(_854,_850,_853);
}else{
self.loadMoreBtn.hide();
}
});
});
jq("#read_bio").live("click",function(e){
var _855=jq(this).closest("div");
e.preventDefault();
_855.html(jq("img.spinner").first());
_855.hide();
jq("#biography").show();
});
jq("span.x_icon").live("click",function(){
self.dismissSimilarUser.call(this,self);
});
this.loadSimilarUsers(3);
jq(window).bind("suggestion_followed",function(e,a){
self.dismissSimilarUser.call(a.closest(".similar_user_stats"),self);
});
jq(window).scroll(function(){
self.loadContentOnScroll.call(self);
});
jq(".profile_links li:not(.recent_images, .no_images)").click(function(e){
e.preventDefault();
window.location.hash=jq(this).find("a").attr("href");
var _856=jq(this).find("a").text();
jq.each(jq(this).parent().find("li"),function(){
jq(this).removeClass("active");
});
self.loadSection(_856);
});
var _857=jq(".newprofile div.content_nav ul.filter_by_topic"),_858=jq(".newprofile #show_only"),_859="#section_mycontent .content_items:visible",_85a=jq("ul.filter_by_topic li"),_85b=false;
_858.click(function(){
if(!_85b){
var _85c=jq(".content_nav #tabs .active").attr("id").replace(/_items_item/,"");
ulFilters=jq("#"+_85c+"_topic_menu");
ulFilters.attr("tabindex",-1);
setTimeout(function(){
ulFilters.focus();
},0);
if(ulFilters.is(":visible")){
ulFilters.hide();
_858.find("span").removeClass("active");
}else{
ulFilters.show();
_858.find("span").addClass("active");
}
var _85d=ulFilters.offset().left,_85e=_858.offset().left,_85f=(_85d-_85e)+11;
ulFilters.css("right",parseFloat(ulFilters.css("right"))+_85f+"px");
_85b=false;
}
});
_857.bind("blur",function(e){
_85b=true;
jq(this).hide();
_858.find("span").removeClass("active");
setTimeout(function(){
_85b=false;
},500);
});
_85a.click(function(){
var _860=jq(this).attr("data-id"),_861=jq(".content_nav ul#tabs li.active");
if(_861.length>0){
var _862=jq(".content_nav ul#tabs li.active").attr("id").replace(/_items_item/,""),_863=jq(this).text();
_861.data("categoryId",_860);
jq(_859).find("ul").html(jq(self.spinnerDiv));
jq(_859).data("loading",true);
loadCategoryContent("mycontent",_860,_862,function(res){
var _864=jq(_859).find("ul");
_864.find("img.spinner").hide();
ProfileManager.prototype.destroyMasonry(_864);
jq.each(res.render,function(id,val){
if(_864.find("#"+id).length===0){
_864.append(val);
}
});
ProfileManager.prototype.applyMasonry(_864);
jq(_859).removeData("next");
if(res.more){
jq(_859).data("no_content",false);
jq(document).data("no_content_all",false);
}else{
jq(document).data("no_content_all",true);
jq(_859).data("no_content",true);
}
_858.data("categoryId",_860);
_858.data(getUrlHashTagVersion(_863),_860);
_858.html("<span></span><strong>Show</strong>: "+_863);
jq(_859).data("loading",false);
loadHashTag(_862);
self.showLoadMoreButton();
});
_858.attr("tabindex",-1);
_858.focus();
_857.hide();
_858.find("span").removeClass("active");
}
});
};
ProfileManager.prototype.openFancyBox=function(_865,_866){
var el=jq(_865);
jq.fancybox({"href":_865,onStart:function(){
el.show();
},onClosed:function(){
el.hide();
el.find("#success_message_email").hide();
el.find("#email").show();
el.find("h3").show();
},onComplete:function(){
el.css("overflow-x","hidden");
}});
};
ProfileManager.prototype.getDivSection=function(_867){
var _868,_869=jq("#section_"+_867);
if(_867=="mycontent"){
_868=_869.find("div.content_items:visible").first();
}else{
if(_867=="followers"){
_868=_869.find("div").first();
}else{
if(_867=="fanmail"){
_868=_869.find("#fanmail_content");
}
}
}
return _868;
};
ProfileManager.prototype.loadSection=function(_86a,_86b){
this.currentSection=_86a.replace(/\s/,"").toLowerCase();
if(this.currentSection=="myactivity"){
this.currentSection="activity";
}
var _86c="section_"+this.currentSection,isCr=typeof cr,_86d=jq("#profile_content_container"),_86e=_86d.offset().top,_86f=jq(this.spinnerDiv);
var _870=jq("a[href=#"+this.currentSection+"]");
if(_870.length>0){
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
}
if(_86c!="section_mycontent"&&jq("#teaser").length>0&&isCr!="undefined"){
cr.pause();
}
jq("div[id^=section_]").hide();
if(jq("#"+_86c).length>0){
jq("#"+_86c).show();
this.showLoadMoreButton();
}else{
var _871=_86d.find("img.spinner");
if(_871.length==0){
_86d.append(_86f);
}
_871.show();
jq.post("/xml/profile/profile_section.php",{section:this.currentSection,userId:this.userId},jq.proxy(function(res){
var data=jQuery.parseJSON(res),_872;
_86d.find(".spinner").hide();
if(data.render){
_873.call(this,data);
}else{
jq.each(data,jQuery.proxy(function(i,el){
_873.call(this,el);
},this));
}
function _873(el){
if(jq("#"+_86c).length===0){
_872=jq("<div/>",{id:_86c,"class":"psection"});
}else{
_872=jq("#"+_86c);
}
_872.append(el.render).appendTo("#profile_content_container");
if(!el.more&&this.currentSection!="activity"){
if(this.currentSection==="following"){
_872.find("#"+el.section).data("no_content",true);
}else{
this.getDivSection(this.currentSection).data("no_content",true);
}
}
};
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_86c=="section_fanmail"){
var _874=jq("#email_to_user");
if(_874.length>0){
jq(".lightbox").fancybox({onStart:function(){
window.location.hash="#email";
_874.show();
},onClosed:function(){
_874.hide();
_874.find("#success_message_email").hide();
_874.find("#email").show();
_874.find("h3").show();
},onComplete:function(e){
_874.css("overflow-x","hidden");
}});
window.prof=new hpFormHandler("email");
prof.submitMode=false;
prof.submitUri="/xml/sendmail.php";
prof.errorId="emailFormErrors";
prof.scrollToErrors=true;
prof.handleResponse=function(req){
try{
eval(req.responseText);
}
catch(e){
}
if(valid==1){
jq("#emailFormErrors").html("");
var _875=jq("#success_message_email");
_875.html(messaging);
_875.siblings("#email").fadeOut("slow",function(){
jq("#email_to_user h3").hide();
_875.show();
});
jq("#yourname").val("");
jq("#subject").val("");
jq("#message").val("");
Recaptcha.reload();
}else{
jq("#emailFormErrors").html(errorStr);
jq("#emailFormErrors").show();
if(hipFailure){
Recaptcha.reload();
}
}
return false;
};
fetchRecaptcha("email_article_captcha");
prof.useEffects=false;
prof.setValidators({toemail:prof.validateEmailList.bind(prof),youremail:prof.validateEmail.bind(prof),yourname:prof.validateEmailName.bind(prof)},{toemail:function(ele){
prof.validateMandatory(ele,"Please enter at least one email recipient.");
},youremail:function(ele){
prof.validateMandatory(ele,"Please enter your email address.");
},yourname:function(ele){
prof.validateMandatory(ele,"Please enter your name.");
},message:function(ele){
prof.testForError($F(ele).replace(/\s+/g,"").length<30,prof,"The content of your message is too short.");
}});
prof.observe();
}
if(jq("#new_fanmail").length>0){
var com=new hpFormHandler("new_fanmail");
com.handleResponse=function(req){
var _876=$("fanmailadd");
Element.update(_876,req.responseText);
};
com.setValidators({},{comText_fanmail:function(ele){
com.validateNot(ele,"Enter some praise","Please enter your endorsement.");
}});
com.errorHeader="";
com.submitUri="/xml/comment.php";
com.nextUri=null;
eval("com_"+this.loggedInUserId+"=com");
com.observe();
makeExpandable("comText_fanmail","Tell the world why you like "+this.userName+".");
makeGrowable("comText_fanmail",58,16,100);
}
}
this.showLoadMoreButton();
(_86b!=undefined)?_86b.call(this):false;
},this));
}
};

