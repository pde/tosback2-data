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
(function($,_1ca,_1cb){
var _1cc=/\+/g;
function raw(s){
return s;
};
function _1cd(s){
return decodeURIComponent(s.replace(_1cc," "));
};
var _1ce=$.cookie=function(key,_1cf,_1d0){
if(_1cf!==_1cb){
_1d0=$.extend({},_1ce.defaults,_1d0);
if(_1cf===null){
_1d0.expires=-1;
}
if(typeof _1d0.expires==="number"){
var days=_1d0.expires,t=_1d0.expires=new Date();
t.setDate(t.getDate()+days);
}
_1cf=_1ce.json?JSON.stringify(_1cf):String(_1cf);
return (_1ca.cookie=[encodeURIComponent(key),"=",_1ce.raw?_1cf:encodeURIComponent(_1cf),_1d0.expires?"; expires="+_1d0.expires.toUTCString():"",_1d0.path?"; path="+_1d0.path:"",_1d0.domain?"; domain="+_1d0.domain:"",_1d0.secure?"; secure":""].join(""));
}
var _1d1=_1ce.raw?raw:_1cd;
var _1d2=_1ca.cookie.split("; ");
for(var i=0,_1d3;(_1d3=_1d2[i]&&_1d2[i].split("="));i++){
if(_1d1(_1d3.shift())===key){
var _1d4=_1d1(_1d3.join("="));
return _1ce.json?JSON.parse(_1d4):_1d4;
}
}
return null;
};
_1ce.defaults={};
$.removeCookie=function(key,_1d5){
if($.cookie(key)!==null){
$.cookie(key,null,_1d5);
return true;
}
return false;
};
})(jQuery,document);
(function($){
$.address=(function(){
var _1d6=function(name){
$($.address).trigger($.extend($.Event(name),(function(){
var _1d7={},_1d8=$.address.parameterNames();
for(var i=0,l=_1d8.length;i<l;i++){
_1d7[_1d8[i]]=$.address.parameter(_1d8[i]);
}
return {value:$.address.value(),path:$.address.path(),pathNames:$.address.pathNames(),parameterNames:_1d8,parameters:_1d7,queryString:$.address.queryString()};
}).call($.address)));
},_1d9=function(_1da,data,fn){
$($.address).bind(_1da,data,fn);
return $.address;
},_1db=function(){
return (_1dc.pushState&&_1dd.state!==_1de);
},_1df=function(){
return ("/"+_1e0.pathname.replace(new RegExp(_1dd.state),"")+_1e0.search+(_1e1()?"#"+_1e1():"")).replace(_1e2,"/");
},_1e1=function(){
var _1e3=_1e0.href.indexOf("#");
return _1e3!=-1?_1e4(_1e0.href.substr(_1e3+1),_1e5):"";
},_1e6=function(){
return _1db()?_1df():_1e1();
},_1e7=function(){
try{
return top.document!==_1de?top:window;
}
catch(e){
return window;
}
},_1e8=function(){
return "javascript";
},_1e9=function(_1ea){
_1ea=_1ea.toString();
return (_1dd.strict&&_1ea.substr(0,1)!="/"?"/":"")+_1ea;
},_1e4=function(_1eb,_1ec){
if(_1dd.crawlable&&_1ec){
return (_1eb!==""?"!":"")+_1eb;
}
return _1eb.replace(/^\!/,"");
},_1ed=function(el,_1ee){
return parseInt(el.css(_1ee),10);
},_1ef=function(el){
var url,s;
for(var i=0,l=el.childNodes.length;i<l;i++){
try{
if(el.childNodes[i].src){
url=String(el.childNodes[i].src);
}
}
catch(e){
}
s=_1ef(el.childNodes[i]);
if(s){
url=s;
}
}
return url;
},_1f0=function(){
if(!_1f1){
var hash=_1e6(),diff=_1f2!=hash;
if(diff){
if(_1f3&&_1f4<7){
_1e0.reload();
}else{
if(_1f3&&_1f4<8&&_1dd.history){
_1f5(_1f6,50);
}
_1f2=hash;
_1f7(_1e5);
}
}
}
},_1f7=function(_1f8){
_1d6(_1f9);
_1d6(_1f8?_1fa:_1fb);
_1f5(_1fc,10);
},_1fc=function(){
if(_1dd.tracker!=="null"&&_1dd.tracker!==null){
var fn=$.isFunction(_1dd.tracker)?_1dd.tracker:_1fd[_1dd.tracker],_1fe=(_1e0.pathname+_1e0.search+($.address&&!_1db()?$.address.value():"")).replace(/\/\//,"/").replace(/^\/$/,"");
if($.isFunction(fn)){
fn(_1fe);
}else{
if($.isFunction(_1fd.urchinTracker)){
_1fd.urchinTracker(_1fe);
}else{
if(_1fd.pageTracker!==_1de&&$.isFunction(_1fd.pageTracker._trackPageview)){
_1fd.pageTracker._trackPageview(_1fe);
}else{
if(_1fd._gaq!==_1de&&$.isFunction(_1fd._gaq.push)){
_1fd._gaq.push(["_trackPageview",decodeURI(_1fe)]);
}
}
}
}
}
},_1f6=function(){
var src=_1e8()+":"+_1e5+";document.open();document.writeln('<html><head><title>"+_1ff.title.replace("'","\\'")+"</title><script>var "+ID+" = \""+encodeURIComponent(_1e6())+(_1ff.domain!=_1e0.hostname?"\";document.domain=\""+_1ff.domain:"")+"\";</"+"script></head></html>');document.close();";
if(_1f4<7){
_200.src=src;
}else{
_200.contentWindow.location.replace(src);
}
},_201=function(){
if(_202&&_203!=-1){
var _204,_205=_202.substr(_203+1).split("&");
for(i=0;i<_205.length;i++){
_204=_205[i].split("=");
if(/^(autoUpdate|crawlable|history|strict|wrap)$/.test(_204[0])){
_1dd[_204[0]]=(isNaN(_204[1])?/^(true|yes)$/i.test(_204[1]):(parseInt(_204[1],10)!==0));
}
if(/^(state|tracker)$/.test(_204[0])){
_1dd[_204[0]]=_204[1];
}
}
_202=null;
}
_1f2=_1e6();
},_206=function(){
if(!_207){
_207=TRUE;
_201();
var _208=function(){
_20c.call(this);
_213.call(this);
},body=$("body").ajaxComplete(_208);
_208();
if(_1dd.wrap){
var wrap=$("body > *").wrapAll("<div style=\"padding:"+(_1ed(body,"marginTop")+_1ed(body,"paddingTop"))+"px "+(_1ed(body,"marginRight")+_1ed(body,"paddingRight"))+"px "+(_1ed(body,"marginBottom")+_1ed(body,"paddingBottom"))+"px "+(_1ed(body,"marginLeft")+_1ed(body,"paddingLeft"))+"px;\" />").parent().wrap("<div id=\""+ID+"\" style=\"height:100%;overflow:auto;position:relative;"+(_219&&!window.statusbar.visible?"resize:both;":"")+"\" />");
$("html, body").css({height:"100%",margin:0,padding:0,overflow:"hidden"});
if(_219){
$("<style type=\"text/css\" />").appendTo("head").text("#"+ID+"::-webkit-resizer { background-color: #fff; }");
}
}
if(_1f3&&_1f4<8){
var _209=_1ff.getElementsByTagName("frameset")[0];
_200=_1ff.createElement((_209?"":"i")+"frame");
if(_209){
_209.insertAdjacentElement("beforeEnd",_200);
_209[_209.cols?"cols":"rows"]+=",0";
_200.noResize=TRUE;
_200.frameBorder=_200.frameSpacing=0;
}else{
_200.style.display="none";
_200.style.width=_200.style.height=0;
_200.tabIndex=-1;
_1ff.body.insertAdjacentElement("afterBegin",_200);
}
_1f5(function(){
$(_200).bind("load",function(){
var win=_200.contentWindow;
_1f2=win[ID]!==_1de?decodeURIComponent(win[ID]):"";
if(_1f2!=_1e6()){
_1f7(_1e5);
_1e0.hash=_1e4(_1f2,TRUE);
}
});
if(_200.contentWindow[ID]===_1de){
_1f6();
}
},50);
}
_1f5(function(){
_1d6("init");
_1f7(_1e5);
},1);
if(!_1db()){
if((_1f3&&_1f4>7)||(!_1f3&&("on"+_20a) in _1fd)){
if(_1fd.addEventListener){
_1fd.addEventListener(_20a,_1f0,_1e5);
}else{
if(_1fd.attachEvent){
_1fd.attachEvent("on"+_20a,_1f0);
}
}
}else{
_20b(_1f0,50);
}
}
}
},_20c=function(){
var el,_20d=$("a"),_20e=_20d.size(),_20f=1,_210=-1;
_1f5(function(){
if(++_210!=_20e){
el=$(_20d.get(_210));
if(el.is("[rel*=\"address:\"]")){
el.address();
}
_1f5(arguments.callee,_20f);
}
},_20f);
},_211=function(){
if(_1f2!=_1e6()){
_1f2=_1e6();
_1f7(_1e5);
}
},_212=function(){
if(_1fd.removeEventListener){
_1fd.removeEventListener(_20a,_1f0,_1e5);
}else{
if(_1fd.detachEvent){
_1fd.detachEvent("on"+_20a,_1f0);
}
}
},_213=function(){
if(_1dd.crawlable){
var base=_1e0.pathname.replace(/\/$/,""),_214="_escaped_fragment_";
if($("body").html().indexOf(_214)!=-1){
$("a[href]:not([href^=http]), a[href*=\""+document.domain+"\"]").each(function(){
var href=$(this).attr("href").replace(/^http:/,"").replace(new RegExp(base+"/?$"),"");
if(href===""||href.indexOf(_214)!=-1){
$(this).attr("href","#"+href.replace(new RegExp("/(.*)\\?"+_214+"=(.*)$"),"!$2"));
}
});
}
}
},_1de,ID="jQueryAddress",_215="string",_20a="hashchange",INIT="init",_1f9="change",_1fa="internalChange",_1fb="externalChange",TRUE=true,_1e5=false,_1dd={autoUpdate:TRUE,crawlable:_1e5,history:TRUE,strict:TRUE,wrap:_1e5},_216=$.browser,_1f4=parseFloat($.browser.version),_217=_216.mozilla,_1f3=_216.msie,_218=_216.opera,_219=_216.webkit||_216.safari,_21a=_1e5,_1fd=_1e7(),_1ff=_1fd.document,_1dc=_1fd.history,_1e0=_1fd.location,_20b=setInterval,_1f5=setTimeout,_1e2=/\/{2,9}/g,_21b=navigator.userAgent,_200,_21c,_202=_1ef(document),_203=_202?_202.indexOf("?"):-1,_21d=_1ff.title,_1f1=_1e5,_207=_1e5,_21e=TRUE,_21f=TRUE,_220=_1e5,_221={},_1f2=_1e6();
if(_1f3){
_1f4=parseFloat(_21b.substr(_21b.indexOf("MSIE")+4));
if(_1ff.documentMode&&_1ff.documentMode!=_1f4){
_1f4=_1ff.documentMode!=8?7:8;
}
$(document).bind("propertychange",function(){
if(_1ff.title!=_21d&&_1ff.title.indexOf("#"+_1e6())!=-1){
_1ff.title=_21d;
}
});
}
_21a=(_217&&_1f4>=1)||(_1f3&&_1f4>=6)||(_218&&_1f4>=9.5)||(_219&&_1f4>=523);
if(_21a){
if(_218){
history.navigationMode="compatible";
}
if(document.readyState=="complete"){
var _222=setInterval(function(){
if($.address){
_206();
clearInterval(_222);
}
},50);
}else{
_201();
$(_206);
}
var _223=_1df();
if(_1dd.state!==_1de){
if(_1dc.pushState){
if(_223.substr(0,3)=="/#/"){
_1e0.replace(_1dd.state.replace(/^\/$/,"")+_223.substr(2));
}
}else{
if(_223!="/"&&_223.replace(/^\/#/,"")!=_1e1()){
_1e0.replace(_1dd.state.replace(/^\/$/,"")+"/#"+_223);
}
}
}
$(window).bind({"popstate":_211,"unload":_212});
}else{
if(!_21a&&_1e1()!==""){
_1e0.replace(_1e0.href.substr(0,_1e0.href.indexOf("#")));
}else{
_1fc();
}
}
return {bind:function(type,data,fn){
return _1d9(type,data,fn);
},init:function(fn){
return _1d9(INIT,fn);
},change:function(fn){
return _1d9(_1f9,fn);
},internalChange:function(fn){
return _1d9(_1fa,fn);
},externalChange:function(fn){
return _1d9(_1fb,fn);
},baseURL:function(){
var url=_1e0.href;
if(url.indexOf("#")!=-1){
url=url.substr(0,url.indexOf("#"));
}
if(/\/$/.test(url)){
url=url.substr(0,url.length-1);
}
return url;
},autoUpdate:function(_224){
if(_224!==_1de){
_1dd.autoUpdate=_224;
return this;
}
return _1dd.autoUpdate;
},crawlable:function(_225){
if(_225!==_1de){
_1dd.crawlable=_225;
return this;
}
return _1dd.crawlable;
},history:function(_226){
if(_226!==_1de){
_1dd.history=_226;
return this;
}
return _1dd.history;
},state:function(_227){
if(_227!==_1de){
_1dd.state=_227;
return this;
}
return _1dd.state;
},strict:function(_228){
if(_228!==_1de){
_1dd.strict=_228;
return this;
}
return _1dd.strict;
},tracker:function(_229){
if(_229!==_1de){
_1dd.tracker=_229;
return this;
}
return _1dd.tracker;
},wrap:function(_22a){
if(_22a!==_1de){
_1dd.wrap=_22a;
return this;
}
return _1dd.wrap;
},update:function(){
_220=TRUE;
this.value(_1f2);
_220=_1e5;
return this;
},title:function(_22b){
if(_22b!==_1de){
_1f5(function(){
_21d=_1ff.title=_22b;
if(_21f&&_200&&_200.contentWindow&&_200.contentWindow.document){
_200.contentWindow.document.title=_22b;
_21f=_1e5;
}
if(!_21e&&_217){
_1e0.replace(_1e0.href.indexOf("#")!=-1?_1e0.href:_1e0.href+"#");
}
_21e=_1e5;
},50);
return this;
}
return _1ff.title;
},value:function(_22c){
if(_22c!==_1de){
_22c=_1e9(_22c);
if(_22c=="/"){
_22c="";
}
if(_1f2==_22c&&!_220){
return;
}
_21e=TRUE;
_1f2=_22c;
if(_1dd.autoUpdate||_220){
_1f7(TRUE);
if(_1db()){
_1dc[_1dd.history?"pushState":"replaceState"]({},"",_1dd.state.replace(/\/$/,"")+(_1f2===""?"/":_1f2));
}else{
_1f1=TRUE;
if(_219){
if(_1dd.history){
_1e0.hash="#"+_1e4(_1f2,TRUE);
}else{
_1e0.replace("#"+_1e4(_1f2,TRUE));
}
}else{
if(_1f2!=_1e6()){
if(_1dd.history){
_1e0.hash="#"+_1e4(_1f2,TRUE);
}else{
_1e0.replace("#"+_1e4(_1f2,TRUE));
}
}
}
if((_1f3&&_1f4<8)&&_1dd.history){
_1f5(_1f6,50);
}
if(_219){
_1f5(function(){
_1f1=_1e5;
},1);
}else{
_1f1=_1e5;
}
}
}
return this;
}
if(!_21a){
return null;
}
return _1e9(_1f2);
},path:function(_22d){
if(_22d!==_1de){
var qs=this.queryString(),hash=this.hash();
this.value(_22d+(qs?"?"+qs:"")+(hash?"#"+hash:""));
return this;
}
return _1e9(_1f2).split("#")[0].split("?")[0];
},pathNames:function(){
var path=this.path(),_22e=path.replace(_1e2,"/").split("/");
if(path.substr(0,1)=="/"||path.length===0){
_22e.splice(0,1);
}
if(path.substr(path.length-1,1)=="/"){
_22e.splice(_22e.length-1,1);
}
return _22e;
},queryString:function(_22f){
if(_22f!==_1de){
var hash=this.hash();
this.value(this.path()+(_22f?"?"+_22f:"")+(hash?"#"+hash:""));
return this;
}
var arr=_1f2.split("?");
return arr.slice(1,arr.length).join("?").split("#")[0];
},parameter:function(name,_230,_231){
var i,_232;
if(_230!==_1de){
var _233=this.parameterNames();
_232=[];
_230=_230?_230.toString():"";
for(i=0;i<_233.length;i++){
var n=_233[i],v=this.parameter(n);
if(typeof v==_215){
v=[v];
}
if(n==name){
v=(_230===null||_230==="")?[]:(_231?v.concat([_230]):[_230]);
}
for(var j=0;j<v.length;j++){
_232.push(n+"="+v[j]);
}
}
if($.inArray(name,_233)==-1&&_230!==null&&_230!==""){
_232.push(name+"="+_230);
}
this.queryString(_232.join("&"));
return this;
}
_230=this.queryString();
if(_230){
var r=[];
_232=_230.split("&");
for(i=0;i<_232.length;i++){
var p=_232[i].split("=");
if(p[0]==name){
r.push(p.slice(1).join("="));
}
}
if(r.length!==0){
return r.length!=1?r:r[0];
}
}
},parameterNames:function(){
var qs=this.queryString(),_234=[];
if(qs&&qs.indexOf("=")!=-1){
var _235=qs.split("&");
for(var i=0;i<_235.length;i++){
var name=_235[i].split("=")[0];
if($.inArray(name,_234)==-1){
_234.push(name);
}
}
}
return _234;
},hash:function(_236){
if(_236!==_1de){
this.value(_1f2.split("#")[0]+(_236?"#"+_236:""));
return this;
}
var arr=_1f2.split("#");
return arr.slice(1,arr.length).join("#");
}};
})();
$.fn.address=function(fn){
if(!$(this).attr("address")){
var f=function(e){
if(e.shiftKey||e.ctrlKey||e.metaKey){
return true;
}
if($(this).is("a")){
var _237=fn?fn.call(this):/address:/.test($(this).attr("rel"))?$(this).attr("rel").split("address:")[1].split(" ")[0]:$.address.state()!==undefined&&$.address.state()!="/"?$(this).attr("href").replace(new RegExp("^(.*"+$.address.state()+"|\\.)"),""):$(this).attr("href").replace(/^(#\!?|\.)/,"");
$.address.value(_237);
e.preventDefault();
}
};
$(this).click(f).live("click",f).live("submit",function(e){
if($(this).is("form")){
var _238=$(this).attr("action"),_239=fn?fn.call(this):(_238.indexOf("?")!=-1?_238.replace(/&$/,""):_238+"?")+$(this).serialize();
$.address.value(_239);
e.preventDefault();
}
}).attr("address",true);
}
return this;
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
var _23a=jQuery(this).data("linkId");
if(_23a){
jQuery("#"+_23a).data("sticky",1);
}
}).live("mouseout",function(_23b){
var hpts=jQuery(_23b.relatedTarget).closest("#HPT");
if(hpts.size()==0){
var _23c=jQuery(this).data("linkId");
if(_23c){
jQuery("#"+_23c).data("sticky",0);
}
setTimeout(function(){
tip_remove(_23c);
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
function tip_remove(_23d){
var _23e=jQuery("#HPT").data("linkId");
if(_23d!=_23e){
return;
}
var _23f=jQuery("#"+_23d).data("sticky");
if(!_23f){
jQuery("#HPT").remove();
}
};
function tip_show(url,_240,_241,_242){
if(jQuery("#HPT").size()){
jQuery("#HPT").remove();
}
if(_241==false&&_242){
_241="&nbsp;";
}
var de=document.documentElement;
var w=self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
var _243=getElementWidth(_240);
var _244=w-getAbsoluteLeft(_240)-_243;
var _245=getAbsoluteLeft(_240);
var _246=getAbsoluteTop(_240)-3;
var _247=url.replace(/^[^\?]+\??/,"");
var _248=parseQuery(_247);
if(_248["width"]===undefined){
_248["width"]=250;
}
if(_248["link"]!==undefined){
jQuery("#"+_240).bind("click",function(){
window.location=_248["link"];
});
jQuery("#"+_240).css("cursor","pointer");
}
var _249=_242?" <a href='#' class='close' onclick='jQuery(\"#HPT\").remove(); return false;'>x</a>":"";
var _24a=_248["css"]?" class='"+_248["css"]+"'":"";
var _24b;
var _24c=false;
if(_248["dir"]!==undefined){
_24b=_248["dir"];
}else{
if(_244>(_248["width"]*1+11)){
_24b="right";
}else{
if(_244+_243*0.3>(_248["width"]*1+11)){
_24b="right";
_24c=true;
}else{
if(_245>(_248["width"]*1+11)){
_24b="left";
}else{
_24b="right";
_24c=true;
}
}
}
}
var _24d=_24b=="left"?"right":"left";
var _24e=_241?"<div id='HPT_close_"+_24d+"'>"+_241+_249+"</div>":"";
var _24f=_24b=="left"?"style='left:"+((_248["width"]*1)+1)+"px"+"'":"";
jQuery("#container").append("<div id='HPT' style='width:"+_248["width"]*1+"px'"+_24a+"><div id='HPT_arrow_"+_24d+"' "+_24f+"></div>"+_24e+"<div id='HPT_copy'><div class='HPT_loader'><div></div></div>");
if(_24b=="right"){
var _24f=_243+11;
if(_24c){
var _250=getAbsoluteLeft(_240)+_24f-_243*0.3;
}else{
var _250=getAbsoluteLeft(_240)+_24f;
}
}else{
var _250=getAbsoluteLeft(_240)-((_248["width"]*1)+15);
}
var _251=jQuery("#container").offset();
_250-=_251.left;
_246-=_251.top;
jQuery("#HPT").css({left:_250+"px",top:_246+"px"});
jQuery("#HPT").data("linkId",_240);
jQuery("#HPT").show();
jQuery("#HPT_copy").load(url);
};
function getElementWidth(_252){
x=document.getElementById(_252);
return x.offsetWidth;
};
function getAbsoluteLeft(_253){
o=document.getElementById(_253);
oLeft=o.offsetLeft;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oLeft+=oParent.offsetLeft;
o=oParent;
}
return oLeft;
};
function getAbsoluteTop(_254){
o=document.getElementById(_254);
oTop=o.offsetTop;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oTop+=oParent.offsetTop;
o=oParent;
}
return oTop;
};
function parseQuery(_255){
var _256=new Object();
if(!_255){
return _256;
}
var _257=_255.split(/[;&]/);
for(var i=0;i<_257.length;i++){
var _258=_257[i].split("=");
if(!_258||_258.length!=2){
continue;
}
var key=unescape(_258[0]);
var val=unescape(_258[1]);
val=val.replace(/\+/g," ");
_256[key]=val;
}
return _256;
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
Form.Element.setValue=function(_259,_25a){
element_id=_259;
_259=$(_259);
if(!_259){
_259=document.getElementsByName(element_id)[0];
}
if(!_259){
return false;
}
var _25b=_259.tagName.toLowerCase();
var _25c=Form.Element.SetSerializers[_25b](_259,_25a);
};
Form.Element.SetSerializers={input:function(_25d,_25e){
switch(_25d.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.SetSerializers.textarea(_25d,_25e);
case "checkbox":
return Form.Element.SetSerializers.checkbox(_25d,_25e);
case "radio":
return Form.Element.SetSerializers.inputSelector(_25d,_25e);
}
return false;
},checkbox:function(_25f,_260){
if(_260==0||_260==null||_260==""){
_25f.checked=false;
}else{
_25f.checked=true;
}
},inputSelector:function(_261,_262){
fields=document.getElementsByName(_261.name);
for(var i=0;i<fields.length;i++){
if(fields[i].value==_262){
fields[i].checked=true;
}
}
},textarea:function(_263,_264){
_263.value=_264;
},select:function(_265,_266){
var _267="",opt,_268=_265.selectedIndex;
for(var i=0;i<_265.options.length;i++){
if(_265.options[i].value==_266){
_265.selectedIndex=i;
return true;
}
}
}};
var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_269){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_269||{});
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
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_26a){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_26a);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _26b=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_26b);
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
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_26c){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_26c);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_26d){
if(_26d==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_26d*100+")";
}
this.el.style.opacity=_26d;
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
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_26e){
this.setOptions(_26e);
},scrollTo:function(el){
var dest=Position.cumulativeOffset($(el))[1]-20;
var _26f=window.innerHeight||document.documentElement.clientHeight;
var full=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(dest+_26f>full){
this.custom(top,dest-_26f+(full-dest));
}else{
this.custom(top,dest);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_270){
this.el=$(el);
this.setOptions(_270);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_271){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_271||{});
},initialize:function(el,_272){
this.el=$(el);
this.setOptions(_272);
if(this.options.opacity){
this.o=new fx.Opacity(el,_272);
_272.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_272);
_272.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_272);
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
fx.Accordion.prototype={setOptions:function(_273){
this.options={delay:100,opacity:false};
Object.extend(this.options,_273||{});
},initialize:function(_274,_275,_276){
this.elements=_275;
this.setOptions(_276);
var _276=_276||"";
_275.each(function(el,i){
_276.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_276);
el.fx.hide();
});
_274.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_275[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_277){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_277){
this.clearAndToggle(el);
}
}.bind(this));
if(_277.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_277);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_278){
this.el=$(el);
this.days=365;
this.options=_278;
this.effect();
var _279=this.readCookie();
if(_279){
this.fx.now=_279;
this.fx.increase();
}
},setCookie:function(_27a){
var date=new Date();
date.setTime(date.getTime()+(this.days*24*60*60*1000));
var _27b="; expires="+date.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_27a+_27b+"; path=/";
},readCookie:function(){
var _27c=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_27c)==0){
return c.substring(_27c.length,c.length);
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
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_27d){
this.el=$(el);
this.setOptions(_27d);
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
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_27e){
this.el=$(el);
this.setOptions(_27e);
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
var _27f=navigator.userAgent.toLowerCase();
var _280=_27f.indexOf("msie")+1;
if(_280){
version=_27f.charAt(_280+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_27f.indexOf("mobile")>-1;
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
toggleOverlay.setElementVisibility=function(_281){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_281;
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
var _282=$(id);
if(_282){
return _282;
}
_282=document.createElement("div");
_282.id=id;
this.wrapper.appendChild(_282);
return _282;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _283=$(id);
if(_283){
return _283;
}
_283=document.createElement("iframe");
_283.id=id;
_283.src="";
_283.frameBorder="no";
_283.scrolling="no";
document.body.appendChild(_283);
return _283;
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
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_284){
this.restore=_284;
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
var _285=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var curr=out.length;
if(!_285){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(curr,out.length-curr);
}else{
_285=false;
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
if(!window.console){
window.console={};
}
if(!window.console.log){
window.console.log=function(){
};
}
jq(document).ajaxError(function(e,_286,_287,_288){
if(_286.getAllResponseHeaders()){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
jq.post("/xml/reporterror.php",{status:_286.status,response:_286.responseText,url:_287.url});
}
});
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
var _289=req.getAllResponseHeaders();
jq.post("/xml/reporterror.php",{headers:_289,error:1});
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
var _28a=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_28a.hide();
}
},showIcon:function(id){
if(jq.active>0||(this.prototypeAvailable()&&Ajax.activeRequestCount>0)){
var _28b=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_28b.css("display","inline");
}
},onReady:function(){
jq(document).ready(function(){
var _28c=jq("body").get(0);
var _28d=(typeof (_28c.contentEditable)!="undefined");
var _28e=(window.screen.width>1000||window.screen.height>1000);
if(_28d&&_28e){
var _28f=new Date();
_28f.setDate(_28f.getDate()+30);
var sep=(document.cookie.length>0)?";":"";
document.cookie="istablet=likely; expires="+_28f.toUTCString()+"; path=/";
}
});
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
var idx=place+thestring.length;
version="";
do{
var c=detect.charAt(idx);
if(c!=" "&&c!="."){
version=version+c;
}
}while(idx++<detect.length&&c!=" "&&c!=".");
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
function checkIt(_290){
place=detect.indexOf(_290)+1;
thestring=_290;
return place;
};
function ssToId(id,_291){
var _291=_291||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_291);
return false;
};
function ssOnload(){
var _292=location.hash.slice(1);
if(_292=="comments"){
ssToId("comFirst");
}else{
if(_292.substr(0,8)=="comment-"){
ssToId("comment"+_292.substr(8));
}else{
if(_292.substr(0,5)=="slide"){
openSlideshowOnLoad();
}else{
if("rate"==_292){
}else{
if(_292!=null&&_292){
ssToId(_292);
}
}
}
}
}
};
function fetchRecaptcha(_293){
var _294="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _295=document.getElementsByTagName("head")[0];
var _296=document.createElement("script");
_296.type="text/javascript";
_296.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_296.onload=function(){
Recaptcha.create(_294,_293,{theme:"red"});
};
_296.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_294,_293,{theme:"red"});
}
};
_295.appendChild(_296);
}else{
Recaptcha.create(_294,_293,{theme:"red"});
}
};
function check_signed_in_ajax(_297,_298){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_299,_29a){
_297(eval(_299.responseText),_298);
}});
};
function whenSignedIn(_29b,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_29b,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_29c,info){
if(_29c){
info.fn.apply(null,info.args);
}else{
var url;
if("undefined"!=typeof (info.options.utm_source)){
url="/xml/signinupform.php?utm_source="+info.options.utm_source;
}else{
url="/xml/signinupform.php";
}
showFancyAjaxOverlay(url,info.options,"",{width:380,height:300,innerColor:"#e4e7e0",onComplete:function(){
var _29d="undefined"==typeof (info.options.captchaId)?"captcha_div":info.options.captchaId;
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha(_29d);
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
function insertVideo(type,key,css,_29e,_29f,_2a0){
var _2a1="<div class=\"video\">";
var mode="opaque";
if(_29f){
mode="transparent";
}
if(_2a0=="bad"){
_2a1="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_2a1+="<embed style=\""+_29e+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
var _2a2="http://";
if(document.location.protocol=="https:"){
_2a2="https://";
}
_2a1+="<embed style=\""+_29e+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\""+_2a2+"www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_2a1+="<embed style=\""+_29e+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_2a1+="<embed style=\""+_29e+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
_2a1+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+mode+"\"></embed></object>";
}else{
if(type=="YahooSports"){
_2a1+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_2a1+="<embed style=\""+_29e+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_2a1+="<embed style=\""+_29e+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_2a1+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_2a1+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_2a1+="</div>";
if(_29f){
jq("#"+_29f).html(_2a1);
}else{
if(type!="New"){
document.write(_2a1);
}
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_2a3){
if(_2a3===undefined){
_2a3=false;
}
if(_2a3){
var _2a4=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_2a4){
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
function praiseHub(id,val,_2a5){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,style:_2a5?_2a5:0},function(){
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
function answerFeedback(_2a6,val,done){
jq.post("/xml/answervote.php",{id:_2a6,vote:val},done);
return false;
};
function toggleShareIt(id,flg,_2a7){
if(_2a7===undefined){
_2a7=false;
}
if(flg){
jq("#share_tgt").load("/xml/shareit.php",{art_id:id,show_warn:_2a7});
}else{
jq("#share_tgt").html("");
}
return false;
};
function extractParamFromUri(uri,_2a8){
if(!uri){
return;
}
var _2a9=new RegExp("[\\?&#]"+_2a8+"=([^&#]*)");
var _2aa=_2a9.exec(uri);
if(_2aa!=null){
return unescape(_2aa[1]);
}
return;
};
function displaySocialButtons(_2ab){
if("IE"==browser&&version<=7){
return false;
}
_2ab=_2ab||{};
var _2ac=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_2ab["nofacebook"]){
fb_appId=jQuery("meta[property='fb:app_id']").attr("content");
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_2ad){
FB.init({appId:fb_appId,xfbml:true});
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_2ae){
_gaq.push(["t2._trackSocial","facebook","like",_2ae]);
});
FB.Event.subscribe("edge.remove",function(_2af){
_gaq.push(["t2._trackSocial","facebook","unlike",_2af]);
});
FB.Event.subscribe("message.send",function(_2b0){
_gaq.push(["t2._trackSocial","facebook","send",_2b0]);
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
if(!_2ab["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_2b1){
twttr.events.bind("tweet",function(_2b2){
if(_2b2){
var _2b3;
if(_2b2.target&&_2b2.target.nodeName=="IFRAME"){
_2b3=extractParamFromUri(_2b2.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_2b3]);
}
});
});
}
if(!_2ab["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_2ab["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_2ac;
};
function showLinkArticle(url,_2b4){
if(window.location.hash){
url+=window.location.hash;
}
var data={page_url:url,page_title:_2b4};
showFancyAjaxOverlay("/xml/linkarticle.php",data,"linkarticle");
return false;
};
function showFlag(id,from){
var url;
var _2b5="";
if("hub"==from){
var _2b6=window.location.search.match(/[\?&]workerId=\w+/i);
if(_2b6){
_2b5="&tw="+_2b6[0].substring(10);
}
}
switch(from){
case "hub":
url="/xml/flaghub.php?a="+id+_2b5;
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
function showFancyAjaxOverlay(url,data,_2b7,_2b8){
if(!_2b8){
var _2b8={};
}
jq.post(url,data,function(html){
jq("#fancybox-wrap").attr("class","");
var _2b9=jq.extend({content:html,onComplete:function(){
if(_2b7){
jq("#fancybox-wrap").addClass(_2b7);
}
},autoDimensions:false,width:610,height:500,padding:0},_2b8);
jq.fancybox(_2b9);
});
};
function showFancyOverlay(html,_2ba){
if(!_2ba){
var _2ba={};
}
var _2bb=jq.extend({content:html},_2ba);
jq.fancybox(_2bb);
return false;
};
function hideFancyOverlay(){
jq.fancybox.close();
return false;
};
function follow(_2bc,_2bd,_2be,_2bf,_2c0){
var _2c1=jq(this);
var data={typeId:_2bc,objectId:_2bd,isActive:_2be,printNumbers:_2bf,overrides:_2c0};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_2bc){
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
switch(_2bc){
case 1:
jQuery(".follow_question_"+_2bd).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_2bd).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data),_2c2=jQuery(".follow_"+_2bd);
_2c2.replaceWith(json.buttonText);
if(json.fanMail){
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400,onClosed:function(){
if(_2c1.hasClass("close_after")){
jq(window).trigger("suggestion_followed",[jQuery("#follow_"+_2bd)]);
}
}});
}
break;
case 4:
jQuery(".follow_"+_2bd).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_2bd).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButtons(){
var _2c3=jq("span[id^=follow_], span[class^=follow_]"),_2c4=jQuery.map(_2c3,function(span,i){
if(jq(span).find("a").text().toUpperCase()=="LOADING..."){
var _2c5=jq(span),_2c6=parseInt(_2c5.data("typeId")),_2c7=_2c5.data("objectId"),_2c8=true,_2c9=_2c5.data("overrides");
return {typeId:_2c6,objectId:_2c7,overrides:_2c9,printNumbers:_2c8};
}else{
}
});
if(_2c4.length>0){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",dataType:"json",data:{itemsToPaint:_2c4},success:function(data){
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
function updateFollowButton(_2ca,_2cb,_2cc,_2cd){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_2ca,objectId:_2cb,printNumbers:_2cc,overrides:_2cd},success:function(data){
switch(_2ca){
case 1:
jQuery(".follow_question_"+_2cb).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_2cb).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_2cb).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_2cb).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_2cb).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_2cb).replaceWith(data);
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
function deleteComment(_2ce,_2cf){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_2cf).serialize(),success:function(resp){
toggleCommentEdit(_2ce,false);
jq("#ctext_"+_2ce).html(resp);
jq("#cedit_"+_2ce).remove();
}});
return false;
};
function toggleCommentEdit(_2d0,_2d1){
if(_2d1){
jq("#cedit_"+_2d0).hide();
jq("#cbox_"+_2d0).show();
jq("#ctext_"+_2d0).hide();
}else{
jq("#cedit_"+_2d0).show();
jq("#cbox_"+_2d0).hide();
jq("#ctext_"+_2d0).show();
}
};
(function($){
$.fn.sampleDuration=function(_2d2){
var _2d3=new Date();
return $(this).bind("beforeunload",function(){
var _2d4=new Date();
$.post("/xml/duration",{art_id:_2d2,dur:_2d4-_2d3});
});
};
})(jQuery);
(function($){
$.fn.sampleDurationNew=function(_2d5,freq){
var rand=Math.floor(Math.random()*freq);
if(rand==0){
var _2d6=new Date();
return $(this).bind("beforeunload",function(){
var _2d7=new Date();
$.post("/xml/duration",{art_id:_2d5,dur:_2d7-_2d6});
});
}
};
})(jQuery);
function setupNavMenu(){
jq(document).ready(function(){
var _2d8=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_2d8=="touchstart"){
jq("#header_explore").bind(_2d8+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_2d8+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_2d8+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("#header_wrap").bind(_2d8+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_2d8+".nav",function(_2d9){
_2d9.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_2da){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_2db){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_2dc){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_2dd){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_2de){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_2df){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_2e0){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_2e1){
nav_hide_all_menus();
});
jq("html").bind("click",function(_2e2){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_2e3){
_2e3.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function showImageFromThumb(){
var id=jq(this).attr("id");
var _2e4=id.replace("t_","slide_img_");
var _2e5=jq("#"+_2e4);
_2e5.parent().parent().children(":visible").hide();
_2e5.parent().show();
};
function initThumbnailImages(){
jq(".image_module_thumb").click(showImageFromThumb);
};
function initHub(_2e6){
initThumbnailImages();
relatedHubStats.trackedclass=".tracked_link";
relatedHubStats.initEventHandlers();
initTurboHubShare();
initTurboVoting(_2e6);
initCommentPlaceholderText();
};
function collectRating(_2e7,_2e8,_2e9,freq,_2ea){
var _2eb=location.hash.slice(1);
var _2ec="rate"==_2eb;
if(!_2ec&&jq.cookie("rating")){
return false;
}
if(_2ec||Math.random()<freq){
var _2ed=new Date();
var _2ee=_2ed.getTime();
var ref=document.referrer;
if(isSearchReferrer(ref)||_2ec){
jq.cookie("rating","1",{expires:30,path:"/",domain:_2e9});
jq("#rate_hub").hubrating({toggleExplanations:false,onsubmit:function(_2ef){
var _2f0=new Date();
var _2f1=_2f0.getTime()-_2ee;
jq.post("/xml/feedback.php",{a:_2e7,s:_2ef.substance,o:_2ef.organization,m:_2ef.mechanics,q:_2ef.quality,version:_2ea,rf:ref,d:_2f1},function(){
jq("#rating_submission, #hop_explain").remove();
jq("#rate_hub .head_one").text("Thanks for your help!").after("<p>Your opinion will help us to improve HubPages.</p>");
setTimeout(function(){
jq("#close_hub_rating").click();
},3000);
});
},detailedExplanations:false,showExplanations:0==_2ea,singleSlider:_2ea>0,ratingMissingMessage:_2ea>0?"Please rate this article. Thanks!":"Please rate this article on all three scales. Thanks!"});
setTimeout(function(){
jq("#rate_hub").slideDown(1000);
},_2e8);
}
}
};
function isSearchReferrer(ref){
if(!ref){
return false;
}
var _2f2=/^https?:\/\/(www\.google\.[a-z]{2,3}|www\.google\.com?\.[a-z]{2,3}|blogsearch\.google\.com\.[a-z]{2,3}|blogsearch\.google\.[a-z]{2,3}|encrypted\.google\.com)\//i;
var _2f3=/^https?:\/\/(www\.bing\.com|search\.yahoo\.com|search\.aol\.com|www\.ask\.com)\//i;
return _2f2.test(ref)||_2f3.test(ref);
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
function initQATurboVoting(_2f4){
jq("#answer_vote_"+_2f4+" .answer_vote_up").click(function(){
answerFeedback(_2f4,1,function(){
jq("#answer_vote_"+_2f4+" .answer_vote_up").addClass("answer_voted_up");
jq("#answer_vote_"+_2f4+" .answer_vote_down").addClass("answer_down_disabled");
jq("#answer_vote_"+_2f4+" .answer_vote_up").removeClass("answer_up_disabled");
jq("#answer_vote_"+_2f4+" .answer_vote_down").removeClass("answer_voted_down");
showQAVoteThanks(_2f4);
});
return false;
});
jq("#answer_vote_"+_2f4+" .answer_vote_down").click(function(){
answerFeedback(_2f4,0,function(){
jq("#answer_vote_"+_2f4+" .answer_vote_up").addClass("answer_up_disabled");
jq("#answer_vote_"+_2f4+" .answer_vote_down").addClass("answer_voted_down");
jq("#answer_vote_"+_2f4+" .answer_vote_up").removeClass("answer_voted_up");
jq("#answer_vote_"+_2f4+" .answer_vote_down").removeClass("answer_down_disabled");
showQAVoteThanks(_2f4);
});
return false;
});
jq("#answer_vote_"+_2f4).mouseenter(function(){
jq(this).data("active",true);
setTimeout(showQAVoteBubble(_2f4),1500);
}).mouseleave(function(){
jq(this).data("active",false);
setTimeout(hideQAVoteBubble(_2f4),500);
});
};
function showQAVoteThanks(_2f5){
jq("#vote_bubble_"+_2f5+" p").text("Thank you for ensuring top quality content on HubPages.");
};
function showQAVoteBubble(_2f6){
var av=jq("#answer_vote_"+_2f6);
if(av.data("active")){
jq("#vote_bubble_"+_2f6).fadeIn(600);
}
};
function hideQAVoteBubble(_2f7){
var vb=jq("#vote_bubble_"+_2f7);
var d=new Date();
var _2f8=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#answer_vote_"+_2f7).data("active")&&!_2f8){
vb.fadeOut(600);
}
};
function initTurboVoting(_2f9){
var _2fa=jq("#vote_bubble");
jq("#hub_vote .hub_vote_up").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_2f9,1,function(){
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
hubFeedback(_2f9,0,function(){
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
var _2fb=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#hub_vote").data("active")&&!_2fb){
vb.fadeOut(600);
}
};
function initTurboHubShare(){
jq(".socialbuttons").bind("display",function(){
setTimeout(function(){
socialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_hub_social").css("visibility","visible");
}else{
jq("#share_hub_social").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
if(!jq("#share_hub_social .fb_share_wrap span").width()){
jq("#share_hub_social .fb_share_wrap span, #share_hub_social .fb_share_wrap iframe:first").css({width:"100px",height:"23px"});
}
},2000);
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
},3000);
};
function socialWidgetUpdate(){
var _2fc=20;
var pos=jq(this).scrollTop();
var _2fd=jq("#share_hub");
var _2fe=jq("#hub_container");
var _2ff=0;
var _300=jq(".moduleHostedVideo");
if(_300.size()){
_2ff=_300.first().position().top+_300.first().outerHeight();
}
var _301=_2fe.height()-_2fd.outerHeight();
var _302=_2fe.offset();
if(_302.top+_2ff-pos<_2fc){
if(pos>_302.top+_301){
_2fd.css({position:"absolute",top:_301+"px",right:"-15px",left:"auto"});
}else{
}
}else{
_2fd.css({position:"absolute",top:_2ff+"px",right:"-15px",left:"auto"});
}
};
function initTurboQAShare(){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(qaSocialWidgetUpdate).resize(qaSocialWidgetUpdate);
}
jq(".socialbuttons").bind("display",function(){
setTimeout(function(){
qaSocialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_qa_social").css("visibility","visible");
}else{
jq("#share_qa_social").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
if(!jq("#share_qa_social .fb_share_wrap span").width()){
jq("#share_qa_social .fb_share_wrap span, #share_qa_social .fb_share_wrap iframe:first").css({width:"100px",height:"23px"});
}
},2000);
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
},3000);
};
function qaSocialWidgetUpdate(){
var _303=20;
var pos=jq(this).scrollTop();
var _304=jq("#share_qa");
var _305=jq("#answers");
var _306=0;
var _307=jq(".moduleHostedVideo");
if(_307.size()){
_306=_307.first().position().top+_307.first().outerHeight();
}
var _308=_305.height()-_304.outerHeight();
var _309=_305.offset();
if(_309.top+_306-pos<_303){
if(pos>_309.top+_308){
_304.css({position:"absolute",top:_308+"px",left:"auto"});
}else{
_304.css({position:"fixed",top:_303+"px",left:(520+_309.left)+"px",right:"auto"});
}
}else{
_304.css({position:"absolute",top:_306+"px",left:"auto"});
}
};
function google_ad_request_done(_30a){
var s="";
var i;
if(_30a.length==0){
return;
}
if(_30a[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_30a[0].image_width+"\" HEIGHT=\""+_30a[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_30a[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_30a[0].image_url+"\" WIDTH=\""+_30a[0].image_width+"\" HEIGHT=\""+_30a[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_30a[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_30a[0].url+"\" target=\"_top\" title=\"go to "+_30a[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_30a[0].visible_url+"';return true\"><img border=\"0\" src=\""+_30a[0].image_url+"\"width=\""+_30a[0].image_width+"\"height=\""+_30a[0].image_height+"\"></a>";
}else{
if(_30a[0].type=="html"){
s+=_30a[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a>";
for(i=0;i<_30a.length;++i){
ad=_30a[i];
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
var _30b=jq.address.value().substr(1);
if(""==_30b){
return;
}
var _30c=false;
if(_30b.substr(0,8)=="comment-"){
_30c=true;
_30b="comment"+_30b.substr(8);
}
if("morecomments"==_30b||_30c){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_30b){
ssToId("comFirst");
}else{
if("morecomments"==_30b){
}else{
if("rate"==_30b){
}else{
ssToId(_30b);
}
}
}
};
function loadRatingSystem(_30d,_30e,_30f,_310){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_30d,params:{id:_310},ratingClass:"rating"});
};
function initAutoComplete(_311,_312){
var _313="";
var _314="++none++";
var _315=false;
var _316=false;
var _317=false;
var _318="#the_auto_comp_box";
var _319="#search_form";
var _31a="#search_input";
var _31b=".search_submit";
var _31c="search_form";
var _31d="/xml/getautocompletestrings.php";
var _31e="";
var _31f=0;
var _320=null;
var _321=null;
var _322=null;
var _323=null;
var _324=null;
var _325=false;
if(_312){
_318=_312.boxid;
_319=_312.container;
_31a=_312.input;
_31b=_312.submit;
if(_312.ajaxtarget!=undefined){
_31d=_312.ajaxtarget;
}
if(_312.querystring!=undefined){
_31e="&"+_312.querystring;
}
if(_312.filter!=undefined){
_320=_312.filter;
}
if(_312.callback!=undefined){
_321=_312.callback;
}
if(_312.keyboardelem!=undefined){
_323=_312.keyboardelem;
}
if(_312.targoutput!=undefined){
_322=_312.targoutput;
}
if(_312.keyuptarget!=undefined){
_324=_312.keyuptarget;
}
if(_312.showprogress!=undefined){
_325=_312.showprogress;
}
}
if(!_323){
_323=_31a;
}
if(!_322){
_322=_31a;
}
if(!_324){
_324=_323;
}
jq(document).ready(function(){
if(!_315){
_315=true;
jq("<div id=\""+_318.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_323);
if(_325){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_318);
jq("#auto_comp_close").bind("click",function(){
jq(_318).hide();
jq("#auto_comp_close").hide();
});
}
jq(_318).hide();
if(!_325){
jq(_318).bind("focusin",function(){
_316=true;
});
jq(_318).bind("focusout",function(){
_316=false;
});
jq(_319).bind("focusin",function(){
_317=true;
});
jq(_319).bind("focusout",function(){
_317=false;
setTimeout(function(){
if(!_316&&!_317){
jq(_318).hide();
jq("#auto_comp_close").hide();
_31e=_31e.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_319).attr("autocomplete","off");
jq(_323).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_31f=0;
jq(_318+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_324).bind("keyup",function(){
var _326=jq(_31a).attr("value");
if(_31a!=_323){
if(_313!=_326){
_31e=_31e.replace(/start=[0123456789]+/,"");
_31e=_31e.replace(/&&/,"&");
}
_313="";
_314="++none++";
}
var _327;
if(_312){
_327="hubs";
}else{
_327=jq(".search_type option:selected").val();
if(_327==undefined){
_327="site";
}
}
if(jq.trim(_326).length==0){
jq(_318).hide();
jq("#auto_comp_close").hide();
}
if(jq.trim(_326).length>0&&_313!=_326){
_313=_326;
if(_326.indexOf(_314)==0){
jq(_318+" > .auto_comp_row").each(function(){
var _328=jq(this).text();
if(_320){
_328=_320(_328);
}
if(_328.indexOf(_326)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_314="++none++";
jq(_318+" > .auto_comp_row").remove();
var _329="?";
if(_325){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_318);
jq(_318).show();
_329="?s="+escape(_326)+"&";
}
var _32a=jq(_319).serialize();
var _32b=/(^|&)s=/;
if(!_32a.match(_32b)&&!_31e.match(_32b)&&!_329.match(_32b)){
_32a+="&s="+_326;
}
jq.get(_31d+_329+"t="+escape(_327)+_31e,_32a,function(data){
jq(_318+" div[id=auto_comp_error]").remove();
jq(_318+" div[id=auto_comp_progress]").remove();
_31e=_31e.replace(/start=[0123456789]+/,"");
_31e=_31e.replace(/&&/,"&");
var _32c=jq(data).find("div").length;
var _32d=false;
if(_32c==0){
return true;
}
var _32e=jq(_31a).val();
if(_32e!=_326){
return true;
}
if(_32c<_311){
_314=_326;
}else{
_314="++none++";
}
jq(_318).show();
jq(_323).focus();
var _32f=jq(_323).position();
var _330=jq(_323).outerHeight(true);
jq(_318).position(_32f.top+_330,_32f.left+5);
jq(data).find("div").appendTo(_318);
jq(_318+" > .auto_comp_row").bind("click",function(){
var _331=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_331=true;
var _332=href.substr(8);
_31e+="&start="+_332;
_31e=_31e.replace(/&&/,"&");
}
});
if(_331){
if(!_32d){
setTimeout(function(){
jq(_324).trigger("keyup");
},200);
_316=false;
_32d=true;
}
return (false);
}
var _333=jq(this).text();
if(_320){
_333=_320(_333);
}
jq(_322).attr("value",_333);
if(document.forms[_31c]){
document.forms[_31c].submit();
}else{
if(_31b){
jq(_31b).trigger("click");
}
}
return (false);
});
jq(_318+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_318+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_318+" > .auto_comp_row:visible:eq("+_31f+") > a").length){
return (false);
}
++_31f;
jq(_318+" > .auto_comp_row:visible:eq("+_31f+") > a").trigger("focus");
return (false);
break;
case 38:
--_31f;
if(_31f<0){
jq(_323).trigger("focus");
}else{
jq(_318+" > .auto_comp_row:visible:eq("+_31f+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_321){
_321();
}
},"html");
}
});
}
});
};
function updateNumCharCount(_334,_335,_336){
if(jq("#"+_335).hasClass("dimmed")){
jq("#"+_336).html(_334);
}else{
if(jq("#"+_335).val().length>_334){
jq("#"+_335).value=jq("#"+_335).val().substring(0,_334);
}
jq("#"+_336).html(_334-jq("#"+_335).val().length);
}
};
function checkCharCount(_337,_338,_339){
updateNumCharCount(_337,_338,_339);
jQuery("#"+_338).bind("click keyup keydown",function(){
updateNumCharCount(_337,_338,_339);
});
jQuery("#"+_338).bind("keypress",function(evt){
updateNumCharCount(_337,_338,_339);
var code=(evt.keyCode?evt.keyCode:evt.which);
if(code!=8&&code!=37&&code!=38&&code!=39&&code!=40&&(browser=="Opera"||code!=46)){
if(jQuery(this).val().length>=_337){
evt.stopPropagation();
return false;
}
}
return true;
});
};
function checkCommentCharCount(_33a,_33b,_33c,_33d){
jQuery("#"+_33b).bind("click keypress keydown keyup",function(){
if(jQuery("#"+_33d).text()<_33a){
jQuery("#"+_33c).show("fast");
}else{
jQuery("#"+_33c).hide("fast");
}
});
};
function initCommentsCapsule(_33e,_33f,_340){
if(_340.signInRequired){
jq("#comment_submit_"+_33e).data("disabled",true);
jq("#comment_submit_"+_33e+", .moduleComment .compose_comment textarea").click(function(){
whenSignedIn({explain:"to comment",showSignup:true,utm_source:"tocomment"},function(){
jq("#comText_"+_33e).remove();
document.location=_340.url;
document.location.reload(true);
});
return false;
});
return;
}
checkCharCount(8192,"comText_"+_33e,"comText_"+_33e+"_chars");
checkCommentCharCount(1000,"comText_"+_33e,"comCharDiv_"+_33e,"comText_"+_33e+"_chars");
var _341="function"==typeof (_340.success)?_340.success:function(resp){
jq("#mod_"+_33e).html(resp);
jq("#spinner").hide();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
};
var _342;
if(_33f){
_342=function(form,btn){
whenSignedIn({explain:"to comment as "+_33f,utm_source:"tocomment"},function(){
jq(form).ajaxSubmit({type:"POST",success:_341});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
});
};
}else{
_342=function(form,btn){
jq(form).ajaxSubmit({type:"POST",success:_341});
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
jq("#comment_submit_"+_33e).click(function(){
jq("#comment_"+_33e).submit();
return false;
});
var _343={onkeyup:false,submitHandler:function(form){
var btn=jq("#comment_submit_"+_33e);
if(btn.data("disabled")){
return;
}
jq("#spinner").show();
_342.apply(this,[form,btn]);
},rules:{name:{requiredNoPlaceholder:true,nohtml:true}},messages:{name:{requiredNoPlaceholder:"Please enter your name before posting."}},errorLabelContainer:"#formErrors_{$modId} ul",errorElement:"li",errorClass:"errorFld",onfocusout:false};
_343.rules["comText_"+_33e]={requiredNoPlaceholder:true,minlength:4,nohtml:true};
_343.messages["comText_"+_33e]={requiredNoPlaceholder:"Please enter a comment before posting.",minlength:"Your comment is rather short."};
jq("#comment_"+_33e).validate(_343);
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
function openSlideshowOnLoad(){
var _344=location.hash.slice(1);
if(_344.substr(0,5)=="slide"){
var _345=_344.replace("slide","");
var _346=jQuery(".image_module_thumb[id*=\""+_345+"\"]");
if(_346.length>0){
_346.click();
_346.parents(".moduleImage").find(".slide_display img:visible").click();
}else{
jQuery("#img_url_"+_345+" img").click();
}
}
};
function safeScriptEval(_347){
var _348=_347.innerHTML.strip();
if(_348.substring(0,4)=="<!--"){
_348=_348.substring(4,_348.length-3);
}
try{
eval(_348);
}
catch(e){
}
};
function selectTab(_349,_34a,_34b,_34c){
var _34d;
if(!_34b){
_34b=jq("#tab_"+_349+"_0").closest("ul").children().size();
}
var _34e,_34f;
for(var i=0;i<_34b;i++){
_34e=jq("#tab_"+_349+"_"+i);
_34f=jq("#tabcontent_"+_349+"_"+i);
if(!_34e.size()||!_34f.size()){
alert("Cannot locate element: baseid="+_349+" index="+_34a+" tabcount="+_34b);
}
if(_34e.hasClass("selected")){
_34d=i;
}
if(i==_34a){
_34e.addClass("selected");
_34f.addClass("selected");
}else{
_34e.removeClass("selected");
_34f.removeClass("selected");
}
}
var _350={};
if(_34c&&_350.toString.call(_34c)=="[object Function]"){
_34c(_34d,_34a);
}
return false;
};
function categoryFanBulkJoin(id,_351,_352,_353,_354,_355){
var _356=jq(".jc");
var cids=Array();
var _357=Array();
var i=0;
var k=0;
jq(".jc").each(function(_358,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_353){
_357[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_357.join(",");
if(_353){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_354){
_354(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_355)!="undefined"){
data["searchTxt"]=_355;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_351){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_352){
setTimeout(categoryFanHighlight,500);
}
}
if(_354){
_354(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_359,_35a,_35b,cols,_35c){
if(!_35b){
var _35b=8;
}
if(!cols){
var cols=2;
}
var _35d=jq("#"+_35a).val();
if(""==jq.trim(_35d)){
return;
}
jq("#"+_359).load("/xml/categoryFanSearch.php",{search:_35d,limit:_35b,cols:cols},function(){
if(_35c){
_35c();
}
});
return false;
};
function facebookConnect(_35e){
if(typeof (_35e)=="undefined"){
_35e="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_35e}).toQueryString();
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
function facebookPopup(_35f){
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
child=window.open(_35f,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_360,_361){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_360+"="+(_361?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function checkViolations(_362){
if(_362){
jq(".violations_span").html("");
var _363={check_violation:1};
}else{
var _363={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_363,dataType:"json",success:function(_364){
if(_364.data){
jq(".violations_span").html(_364.data);
}
if(!_364.complete){
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
function showHubOverlay(url,_365,_366){
var uri=$H({url:url,addComment:_365,commentText:_366}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_367){
var uri=$H({modId:_367}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_368,_369){
var uri=$H({moduleId:_368,pollId:_369}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_36a,_36b,_36c,_36d){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_36c){
$("overlay").addClassName(_36c);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_36a,{parameters:_36b,onComplete:function(){
if(_36d!=undefined){
_36d.call($("overlay"));
}
if(!$("fixed_title")){
return;
}
var _36e=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_36e+"px"});
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
var _36f=browser=="IE"&&version<=6;
var _370=$("overlay");
var _371=Position.getViewportHeight();
if(_371>750){
var _372=_371-150;
}else{
var _372=_371-90;
}
var _373=_370.getStyle("paddingTop");
var _374=_370.getStyle("paddingBottom");
_372-=_373.substring(0,_373.length-2);
_372-=_374.substring(0,_374.length-2);
_372=Math.max(_372,100);
$("overlay").setStyle({height:_372+"px"});
if(_371>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_36f){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_36f){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _375=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_375+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_372-60)+"px",overflowY:"auto"});
}
};
function activity_why(id,_376,_377,_378){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_376,actionTargetId:_377,createDate:_378}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function ellipse(str,_379){
if(str.length>_379&&_379!=0){
str=str.substr(0,_379-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_379-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function addTagEntries(){
var _37a=4;
var _37b=document.createElement("div");
_37b.id="moreEntryDiv";
var li=null;
var _37c=4+1;
var _37d=_37c+_37a;
for(var i=_37c;i<_37d;i++){
li=document.createElement("li");
_37b.appendChild(li);
var _37e=document.createElement("input");
_37e.className="tagEntry";
_37e.name="tag_"+i;
_37e.type="text";
_37e.size=40;
li.appendChild(_37e);
}
$("tagEntries").appendChild(_37b);
return true;
};
function hubtool_add_tag(_37f){
var _380=(_37f)?$(_37f):$("add_tag_input");
if(!_380){
return;
}
var tag;
if(Field.present(_380)&&_380.type){
tag=$F(_380);
Field.clear(_380);
}else{
if(_380.innerHTML){
tag=_380.innerHTML;
Element.remove(Element.findElement(_380,"li"));
}
}
if(!tag){
return;
}
var _381=0;
var _382=/^tag_(\d+)$/i;
var _383=$$(".tagEntry");
_383.each(function(ele){
if(ele.id){
var ms=_382.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_381){
_381=id;
}
}
}
});
_381++;
var _384="tag_"+_381;
var _385=$("add_tag_input").parentNode;
var _386="<input class=\"tagEntry\" id=\""+_384+"\" name=\""+_384+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_384)){
var _387=$(_384).tabIndex;
Element.update($(_384).parentNode,_386);
$(_384).tabIndex=_387;
}else{
var _388=$("tag_1").tabIndex-1;
var _387=_388+_381;
var pole=new Insertion.Before(_385,"<li>"+_386+"</li>");
$(_384).tabIndex=_387;
_387=$("add_tag_input").tabIndex;
_387++;
$("add_tag_input").tabIndex=_387;
}
return false;
};
function add_tag(_389){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _38a=tag.replace(/'/g,"\\'");
var _38b=tag.replace(/ /g,"+");
var _38c="tagd_"+tag.replace(/ /g,"_");
_38c=_38c.toLowerCase();
if($(_38c)){
$(_38c).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _38d=$("nav_tags_edit");
var _38e="<a href=\"javascript:void delete_tag('"+_389+"','"+_38a+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_38e+="<a id=\""+_38c+"\" href=\"/tag/"+_38b+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_38e;
_38d.appendChild(item);
save_tag(_389,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_38f,tag){
if(!_38f||!tag){
return;
}
var _390="tagd_"+tag.replace(/ /g,"_");
var _391=$(_390);
if(!_391){
return;
}
var li=_391.parentNode;
Element.remove(li);
save_tag(_38f,tag,true);
return false;
};
function save_tag(_392,tag,del){
var _393=(del)?1:0;
var req={a:_392,v:tag,d:_393};
var _394=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_394,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function fireOnReturn(_395,func){
Event.observe(_395,"keyup",function(_396){
_396=_396||window.event;
if(_396.which){
if(_396.which==Event.KEY_RETURN){
_396.preventDefault();
func();
}
}else{
if(_396.keyCode){
if(_396.keyCode==Event.KEY_RETURN){
Event.stop(_396);
func();
}
}
}
},false);
};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_397){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_397*100)+")";
}
ele.style.opacity=_397;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _398;
if(document.defaultView){
_398=document.defaultView.getComputedStyle(ele,"");
}else{
_398=ele.currentStyle;
}
return _398;
};
Element.cloneStyles=function(ele,_399,_39a){
ele=$(ele);
_399=$(_399);
var _39b=Element.getCurrentStyle(ele);
for(var name in _39b){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _39c=_39b[name];
if(_39c!==""&&!(_39c instanceof Object)&&name!="length"&&name!="parentRule"){
if(_39a&&name.indexOf(_39a)!==0){
continue;
}
_399.style[name]=_39c;
}
}
return _399;
};
Element.findElement=function(_39d,_39e){
_39d=$(_39d);
while(_39d.parentNode&&(!_39d.tagName||(_39d.tagName.toUpperCase()!=_39e.toUpperCase()))){
_39d=_39d.parentNode;
}
return _39d;
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
String.prototype.startsWith=function(_39f){
var res=this;
return res.substring(0,_39f.length)==_39f;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _3a0=p.innerHTML;
if(_3a0.length>len){
_3a0=_3a0.substring(0,len);
_3a0=_3a0.replace(/\w+$/,"");
_3a0+="...";
p.innerHTML=_3a0;
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
var _3a1=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_3a1=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_3a1=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_3a1=window.pageXOffset;
}else{
if(window.scrollX){
_3a1=window.scrollX;
}
}
}
}
return _3a1;
};
Position.getViewportScrollY=function(){
var _3a2=0;
if(document.documentElement&&document.documentElement.scrollTop){
_3a2=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_3a2=document.body.scrollTop;
}else{
if(window.pageYOffset){
_3a2=window.pageYOffset;
}else{
if(window.scrollY){
_3a2=window.scrollY;
}
}
}
}
return _3a2;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _3a3=jq(window).scrollTop();
var _3a4=_3a3+jq(window).height();
if(eleBot<_3a3){
return -1;
}
if(off.top>_3a4){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _3a5=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _3a6=[_3a5[0]+Position.getViewportWidth(),_3a5[1]+Position.getViewportHeight()];
return (_3a5[0]<off[0]&&off[0]<_3a6[0]&&_3a5[1]<off[1]&&off[1]<_3a6[1]);
};
Position.set=function(ele,_3a7){
if(ele&&_3a7){
ele.style.left=_3a7[0]+"px";
ele.style.top=_3a7[1]+"px";
}
};
function phone_verify_required(_3a8,_3a9,_3aa,_3ab){
if(typeof (_3ab)=="undefined"){
data={};
}else{
data={a:_3ab};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_3a8);
}else{
_3a9.apply(null,_3aa);
}
},"json");
};
function require_phone_verification(_3ac,_3ad){
url="/xml/verify/phone.php";
if(typeof (_3ad)!="undefined"&&_3ad){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_3ac},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_3ae,end){
for(var i=_3ae;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_3ae)+1;
}
update_plural(name);
};
function unselect_all(name,_3af,end){
for(var i=_3af;i<=end;i++){
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
function import_now(_3b0,name,_3b1,end){
var _3b2=self.opener.document.getElementById(_3b0);
if(_3b2){
for(var i=_3b1;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _3b3=$(name+"_email_"+i);
if(_3b2.value.length<2||_3b2.value.charAt(_3b2.value.length)==","||_3b2.value.charAt(_3b2.value.length-1)==","){
_3b2.value=_3b2.value+_3b3.innerHTML;
}else{
_3b2.value=_3b2.value+", "+_3b3.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_3b4,_3b5,max){
var _3b6=document.getElementById(_3b4);
var _3b7=document.getElementById(_3b5);
if(!_3b6){
alert("charCounter bad source: "+_3b4);
}
if(!_3b7){
alert("charCounter bad source: "+_3b5);
}
if(_3b6.value.length>max){
_3b6.value=_3b6.value.substring(0,max);
}
_3b7.value=max-_3b6.value.length;
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
function fetchAnswers(_3b8,_3b9,_3ba){
var _3bb=$H({answerIds:_3b8,enableVoting:_3b9,enableEditing:_3ba}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_3bb,onComplete:function(_3bc){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_3bd,v){
if(_3bd===undefined){
_3bd=true;
}
jq.post("/xml/answervote.php",{id:id,vote:v,timeIndicator:_3bd});
return false;
};
function answerVoteDown(id,_3be){
return answerVote(id,_3be,-1);
};
function answerVoteUp(id,_3bf){
return answerVote(id,_3bf,1);
};
function getElementScreenTop(){
var _3c0=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _3c0;
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
jQuery(".answer_delete").click(function(_3c1){
id=jQuery(_3c1.target).attr("id");
id=id.replace("answer_delete_","");
jQuery.ajax({url:"/xml/delete_answer",data:{id:id},type:"POST",success:function(data){
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
var _3c2="#edit_rc_error_"+i;
jQuery(_3c2).html("You cannot submit an empty comment.");
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
jQuery(".request_comment_delete").click(function(_3c3){
orig_id=jQuery(_3c3.target).attr("id");
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
jQuery(".request_comment_notspam").click(function(_3c4){
orig_id=jQuery(_3c4.target).attr("id");
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
function showAnswerCommentBox(id,_3c5){
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
jQuery("#rc_numcharsvalue").html(_3c5);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _3c6="#result_"+i;
var _3c7="#error_"+i;
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
jQuery(_3c6).append(data.msg);
var _3c8=jQuery(_3c6).children().last().attr("id");
jQuery(_3c6).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_3c8);
});
});
}
}});
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_3c9){
this.buffer.push(_3c9);
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
function hpFormHandler(_3ca){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_3ca);
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
var _3cb=$$("input[name="+ele.name+"]");
var _3cc=false;
_3cb.each(function(r){
if(r.checked==true){
_3cc=true;
throw $break;
}
});
this.testForError(!_3cc,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _3cd=false;
if(val.length>=20){
var _3ce=val.match(/\s+/g);
var _3cf=_3ce?_3ce.length:0;
var _3d0=_3cf+1;
_3cd=_3d0/(val.length-_3cf)<0.08;
}
this.testForError(_3cd,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_3d1,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_3d1)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_3d2,msg){
var val=$F(ele);
this.testForError((val.search(_3d2)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_3d3,msg){
var val=$F(ele);
var _3d4=false;
for(i=0;i<_3d3.length&&!_3d4;i++){
var _3d5=new RegExp("[^a-zA-Z]"+_3d3[i]+"[^a-zA-Z]","i");
_3d4=(val.search(_3d5)>=0);
if(!_3d4){
_3d5=new RegExp("^"+_3d3[i]+"[^a-zA-Z]","i");
_3d4=(val.search(_3d5)>=0);
}
if(!_3d4){
_3d5=new RegExp("[^a-zA-Z]"+_3d3[i]+"$","i");
_3d4=(val.search(_3d5)>=0);
}
if(!_3d4){
_3d5=new RegExp("^"+_3d3[i]+"$","i");
_3d4=(val.search(_3d5)>=0);
}
}
this.testForError(_3d4,ele,msg);
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
var _3d6=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _3d7=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _3d8=800;
var _3d9=6;
this.validateLengthMin(ele,_3d9,"The address you entered is too short. Please use an address at least "+_3d9+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _3da=200;
this.validateLengthMax(ele,_3da,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _3db=2;
var _3dc=200;
this.validateLengthMin(ele,_3db,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_3dc,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _3dd=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_3dd=true;
}
this.testForError(!_3dd,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _3de=40;
var _3df=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_3df,"Your password is too short.  Protect your account by choosing a password that is at least  "+_3df+" characters long.  Safety first!");
this.validateLengthMax(ele1,_3de,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _3e0=60;
var _3e1=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_3e0,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_3e2){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_3e2.detect(function(name){
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
var _3e3=$A($(form).getElementsByTagName("input"));
_3e3.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_3e4,_3e5,_3e6){
if($(_3e4)&&$(_3e5)){
var gw=new GhostWatcher(_3e4,_3e5,_3e6);
}
};
hpFormHandler.prototype.setValidators=function(_3e7,_3e8){
this.toValidate=$H(_3e7);
this.toValidateOnsubmit=$H(_3e8);
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
hpFormHandler.prototype.save=function(_3e9){
if(this.ensureSignedInBeforeSave&&!_3e9){
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
var _3ea=new fx.Scroll({duration:100});
_3ea.scrollTo(this.errorDiv);
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
var _3eb=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_3ec,ele,msg){
if(_3ec){
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
hpFormHandler.prototype._runValidators=function(_3ed){
var _3ee=Form.getElements(this.form);
var _3ef=$A(_3ee);
_3ef.each(function(node){
if(_3ed){
var _3f0=this.toValidateOnsubmit.get(node.id);
if(!_3f0){
_3f0=this.toValidateOnsubmit.get(node.className);
}
if(_3f0){
_3f0(node);
}
}
var _3f0=this.toValidate.get(node.id);
if(!_3f0){
_3f0=this.toValidate.get(node.className);
}
if(_3f0){
_3f0(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _3f1="";
if(json.status=="error"){
var _3f2=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_3f1+=" - "+json.errors[key][i]+"\n";
}
_3f2++;
}
}
if(_3f2>0){
var _3f3=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_3f3+=_3f1+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_3f3);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _3f4=new fx.Scroll({duration:300});
_3f4.scrollTo("changesSaved");
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
var _3f5=this.errorHeader;
_3f5+="<ul>";
this.errors.each(function(err){
_3f5+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_3f5+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_3f5;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _3f6=$(err.key);
var _3f7=err.key+"_error";
var _3f8=$(_3f7);
if(_3f8){
_3f8.innerHTML=err.value;
_3f8.className="alert";
_3f8.show();
}else{
new Insertion.Top(_3f6.parentNode,"<div id=\""+_3f7+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_3f6,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _3f9=typeof this.errors.get(targetId)=="undefined";
if(_3f9){
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
function _handleInputKeypress(_3fa){
_3fa=_3fa||window.event;
if(_3fa.which){
if(_3fa.which==Event.KEY_RETURN){
var _3fb=document.createEvent("KeyboardEvent");
_3fb.initKeyEvent("keydown",true,true,document.defaultView,_3fa.ctrlKey,_3fa.altKey,_3fa.shiftKey,_3fa.metaKey,Event.KEY_TAB,0);
_3fa.preventDefault();
_3fa.target.dispatchEvent(_3fb);
}
}else{
if(_3fa.keyCode){
if(_3fa.keyCode==Event.KEY_RETURN){
_3fa.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_3fc,_3fd,_3fe){
this.fromEle=$(_3fc);
this.toEle=$(_3fd);
this.copyFunction=(_3fe!=null)?_3fe:this.copyValue;
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
function growTextArea(elt,_3ff,_400,_401){
var rows=Math.ceil($F(elt).length/_3ff)+1;
var _402=rows*_400;
_402=Math.max(_402,_401);
elt.setStyle({height:_402+"px"});
};
function makeGrowable(id,_403,_404,_405){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_403,_404,_405);
});
};
function makeExpandable(id,_406,_407,_408,_409,_40a){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_406);
var _40a=(_40a===undefined)?"expanded":_40a;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_40a)){
anc.addClass(_40a);
if(typeof (_409)=="function"){
_409.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_407)=="function"){
_407.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_408){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_406);
});
};
function hpajaxpostformdata(_40b,_40c){
var data=new Object();
jq(_40c).find("input").each(function(){
if(jq(this).attr("type")=="checkbox"){
if(jq(this).is(":checked")){
data[jq(this).attr("name")]=0;
}
}else{
data[jq(this).attr("name")]=jq(this).attr("value");
}
});
jq.get(_40b,data,function(){
});
};
function categorySearch(_40d){
jq("#"+_40d+"SearchResults").load("/xml/categorysearch.php",{uniqueId:_40d,searchText:jq("#"+_40d+"SearchText").val()});
};
(function($){
var _40e=function(){
this.children("select").change(function(_40f){
var _410=jq(_40f.target);
_410.parent().hpCategorySelector("chooseCategory",_410.val());
});
};
var _411={init:function(_412){
var _413=$.extend({userId:0,valueId:"#categoryId",data:{}},_412);
this.data("settings",_413);
_40e.apply(this);
return this;
},chooseCategory:function(_414){
return this.each(function(_415,elt){
var _416=jq(elt);
var _417=_416.data("settings");
var _418=_416.attr("id");
var _419=$.extend({categoryId:_414,id:_418},_417.data);
jq.post("/xml/categoryselector.php",_419,function(rsp){
var data=jq.parseJSON(rsp);
_416.html(data.render);
_40e.apply(_416);
_416.find("select").first().focus();
$(_417.valueId).val(_414);
_416.trigger("categoryChange.hpCategorySelector",data);
});
});
},refresh:function(){
return this.each(function(_41a,elt){
var _41b=jq(elt);
_41b.hpCategorySelector("chooseCategory",_41b.hpCategorySelector("getValue"));
});
},getValue:function(){
var _41c=this.data("settings");
return $(_41c.valueId).val();
},destroy:function(){
}};
$.fn.hpCategorySelector=function(_41d){
if(_411[_41d]){
return _411[_41d].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _41d==="object"||!_41d){
return _411.init.apply(this,arguments);
}else{
$.error("Method "+_41d+" does not exist on jQuery.hpCategorySelector");
}
}
};
})(jQuery);
(function($){
var _41e=function(){
this.children("select").change(function(_41f){
var _420=jq(_41f.target);
_420.parent().hpForumSelector("chooseForum",_420.val(),_420.prevAll("select").size()>0);
});
};
var _421={init:function(_422){
var _423=$.extend({userId:0,data:{},id:"admin"},_422);
this.data("settings",_423);
_41e.apply(this);
return this;
},chooseForum:function(_424,_425){
var _426=0,data={};
if(/fave/.test(_424)){
data["categoryId"]=_424.substring(5);
_426=data["categoryId"];
}else{
if(_425){
data["categoryId"]=_424;
}else{
data["forumId"]=_424;
}
}
return this.each(function(_427,elt){
var _428=jq(elt);
var _429=_428.data("settings");
var _42a=_428.attr("id");
var _42b=$.extend(data,_429.data);
_42b["id"]=_429.id;
jq.post("/xml/forumselector.php",_42b,function(rsp){
_428.html(rsp);
_41e.apply(_428);
$("#"+_429.id+"_category_id").val(_426);
});
});
},getValue:function(){
var _42c=this.data("settings");
return $(_42c.valueId).val();
},destroy:function(){
}};
$.fn.hpForumSelector=function(_42d){
if(_421[_42d]){
return _421[_42d].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _42d==="object"||!_42d){
return _421.init.apply(this,arguments);
}else{
$.error("Method "+_42d+" does not exist on jQuery.hpForumSelector");
}
}
};
})(jQuery);
function addEvent(_42e,type,_42f){
if(!_42f.$$guid){
_42f.$$guid=addEvent.guid++;
}
if(!_42e.events){
_42e.events={};
}
var _430=_42e.events[type];
if(!_430){
_430=_42e.events[type]={};
if(_42e["on"+type]){
_430[0]=_42e["on"+type];
}
}
_430[_42f.$$guid]=_42f;
_42e["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_431,type,_432){
if(_431.events&&_431.events[type]){
delete _431.events[type][_432.$$guid];
}
};
function handleEvent(_433){
var _434=true;
_433=_433||fixEvent(window.event);
if(_433==null){
return false;
}
if(this.events==null){
return false;
}
var _435=this.events[_433.type];
for(var i in _435){
this.$$handleEvent=_435[i];
if(this.$$handleEvent(_433)===false){
_434=false;
}
}
return _434;
};
function fixEvent(_436){
if(_436!=null){
_436.preventDefault=fixEvent.preventDefault;
_436.stopPropagation=fixEvent.stopPropagation;
}
return _436;
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
var css={getElementsByClass:function(node,_437,tag){
var _438=new Array();
var els=node.getElementsByTagName(tag);
var _439=els.length;
var _43a=new RegExp("(^|\\s)"+_437+"(\\s|$)");
for(var i=0,j=0;i<_439;i++){
if(this.elementHasClass(els[i],_437)){
_438[j]=els[i];
j++;
}
}
return _438;
},elementHasClass:function(el,_43b){
if(!el){
return false;
}
var _43c=new RegExp("\\b"+_43b+"\\b");
if(el.className.match(_43c)){
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
var _43d=document.getElementsByTagName("table");
for(var i=0;i<_43d.length;i++){
var _43e=_43d[i];
if(css.elementHasClass(_43e,"sortable")){
this.makeSortable(_43e);
}
}
},makeSortable:function(_43f){
if(!_43f.id){
_43f.id="sortableTable"+this.lastAssignedId++;
}
if(!_43f.tHead||!_43f.tHead.rows||0==_43f.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_43f.tHead.rows.length;i++){
if(css.elementHasClass(_43f.tHead.rows[i],"sort_control_buttons")){
row=_43f.tHead.rows[i];
break;
}
}
if(row==null){
row=_43f.tHead.rows[_43f.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _440=row.cells[i].firstChild;
_440.onclick=this.headingClicked;
_440.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _441=getEventTarget(e);
var td=_441.parentNode;
var tr=td.parentNode;
var _442=tr.parentNode;
var _443=_442.parentNode;
if(!_443.tBodies||_443.tBodies[0].rows.length<=1){
return false;
}
var _444=_441.getAttribute("columnId")||td.cellIndex;
var _445=css.getElementsByClass(td,"tableSortArrow","span");
var _446="";
if(_445.length>0){
_446=_445[0].getAttribute("sortOrder");
}
var itm="";
var _447=0;
while(""==itm&&_447<_443.tBodies[0].rows.length){
var elm=_443.tBodies[0].rows[_447].cells[_444];
if(elm.childNodes.length==1){
itm=that.getInnerText(_443.tBodies[0].rows[_447].cells[_444]);
}else{
itm=that.getInnerText(_443.tBodies[0].rows[_447].cells[_444].firstChild);
}
_447++;
}
var _448=that.determineSortFunction(itm);
var _449;
if(_443.id==that.lastSortedTable&&_444==that.sortColumnIndex){
_449=that.newRows;
_449.reverse();
}else{
that.sortColumnIndex=_444;
_449=new Array();
for(var j=0;j<_443.tBodies[0].rows.length;j++){
_449[j]=_443.tBodies[0].rows[j];
}
_449.sort(_448);
}
that.moveRows(_443,_449);
that.newRows=_449;
that.lastSortedTable=_443.id;
var _445=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_445.length;j++){
if(j==_444){
if(null==_446||""==_446||"DESC"==_446){
_445[j].innerHTML="▼";
_445[j].setAttribute("sortOrder","ASC");
}else{
_445[j].innerHTML="▲";
_445[j].setAttribute("sortOrder","DESC");
}
}else{
_445[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_443.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_443.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_443.tBodies[0].rows.length;i++){
tr=_443.tBodies[0].rows[i];
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
var _44a=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_44a=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_44a=this.sortDate;
}
if(itm.match(/^[�$]/)){
_44a=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_44a=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_44a=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_44a=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_44a=this.sortIP;
}
return _44a;
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
var _44b=a.cells[that.sortColumnIndex];
if(_44b.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _44c=b.cells[that.sortColumnIndex];
if(_44c.childNodes.length>1){
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
},moveRows:function(_44d,_44e){
for(var i=0;i<_44e.length;i++){
var _44f=_44e[i];
_44d.tBodies[0].appendChild(_44f);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
function PollManager(_450,_451,_452){
this.modId=_450;
this.pollId=_451;
this.results_div_id=_450+"_poll_results";
this.vote_form_id=_450+"_vote_form";
this.vote_radio_name=_450+"_vote";
this.hubnugget=_452;
};
PollManager.prototype={seePollVotes:function(){
this.question_HTML=jq("#"+this.results_div_id).html();
var _453=jQuery.param({id:this.pollId});
jQuery.ajax({url:"/xml/pollvote.php",data:_453,type:"POST",success:(function(data){
jQuery("#"+this.results_div_id).html(data);
}).bind(this),error:function(){
reportError();
}});
},goBackAndVote:function(){
jq("#"+this.results_div_id).html(this.question_HTML);
},risingStarVote:function(_454){
if(!jQuery(".voting_candidates").hasClass("voted")){
var _455=jQuery.param({id:this.pollId,vote:_454,hn:1});
jQuery.ajax({url:"/xml/pollvote.php",data:_455,type:"POST",success:function(data){
jQuery(".voting_candidates").addClass("voted");
jQuery(".voting_candidates .main.voting_header > div").html(data);
jQuery(".voting_candidates .main li a.button").removeClass("green_bg").addClass("disabled").html("Thanks for voting");
}});
}
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _456=jQuery("input[name="+this.vote_radio_name+"]:checked");
if(_456.length==0){
return;
}else{
vote=_456.val();
}
var _457=jQuery.param({id:this.pollId,vote:vote,hn:hn});
jQuery.ajax({url:"/xml/pollvote.php",data:_457,type:"POST",success:(function(data){
jQuery("#"+this.results_div_id).html(data);
}).bind(this),error:function(){
reportError();
}});
}};
function PollManagerManager(){
this.pollManagers=[];
};
PollManagerManager.prototype={add:function(id,pm){
this.pollManagers[id]=pm;
},getById:function(id){
return this.pollManagers[id];
}};
var pmm=new PollManagerManager();
var ContentRotator=Class.create();
ContentRotator.prototype={initialize:function(ids,_458,_459,_45a,_45b,_45c,_45d,_45e,_45f,loop,_460){
this.ids=ids;
this.prefix=_458;
this.interval=_459;
this.position=0;
this.paused=false;
this.transitionEffect=_45a;
this.transitioning=false;
this.updateFunction=null;
if(_460!==undefined&&jq(_460).length>0){
this.navButtons=jq(_460);
this.firstButton=this.navButtons.find("li").first();
this.firstButton.find("a").addClass("active");
this.renderNavButtons.bind(this);
this.renderNavButtons();
}
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_45b){
this.playId=_45b;
}
if(_45c){
this.pauseId=_45c;
}
if(_45d){
this.positionIndicatorId=_45d;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_45e){
this.prevId=_45e;
}
if(_45f){
this.nextId=_45f;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},renderNavButtons:function(){
var _461=this.firstButton,_462=_461.find("a"),self=this,_463=this.position;
_462.data("position",_463);
_462.click(function(e){
e.preventDefault();
self.seek(jq(this).data("position"));
});
for(var i=1,l=this.ids.length;i<l;i++){
var _464=_461.clone(true),_465=++_463,_466=_464.find("a");
_466.attr("id","button_"+_465);
_466.removeClass("active");
_466.data("position",_465);
self.navButtons.append(_464);
}
},update:function(_467){
if(this.paused||this.activeUpdateThreadId!=_467){
return;
}
this.next();
this.updateFunction=setTimeout(this.update.bind(this,_467),this.interval);
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
},seek:function(_468){
var next=this.position<_468,_469=_468%this.ids.length;
while(_469<0){
_469+=this.ids.length;
}
if(this.position==_469){
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
var _46a=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_46a.toggle();
this.position=_469;
if(this.fadeTransition){
var _46b=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _46b=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(browser=="IE"&&version<=8){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
jq("#"+this.prefix+this.ids[this.position]).css({display:"inline",visibility:"visible",opacity:1});
}
_46b.options.onComplete=this.endTransition.bind(this);
_46b.hide();
_46b.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=_469;
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
this.selectCurrentButton(_468);
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
},selectCurrentButton:function(_46c){
if(this.navButtons){
clearTimeout(this.updateFunction);
if(this.interval>0){
this.updateFunction=setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
this.navButtons.find("a[id^=button]").removeClass("active");
jq("#button_"+(_46c%this.ids.length)).addClass("active");
}
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_46d,_46e,_46f,_470,_471){
this.typeId=_46d;
this.categoryId=_46e;
this.userId=_471;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_470;
this.updateTime=_46f;
this.originalUpdateTime=_46f;
this.currentTime=parseInt(_46f,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_472){
_472.preventDefault();
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
var _473=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_473=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_473);
}.bind(this));
},getTimeAgo:function(_474){
if(_474<=1){
return "1 second ago";
}
var _475=Math.round(_474/60);
var _476=Math.round(_474/3600);
var days=Math.round(_474/86400);
var _477=Math.round(_474/604800);
var _478=Math.round(_474/2592000);
var _479=Math.round(_474/31536000);
var ret="";
if(_479>=2){
ret=_479+" years ago";
}else{
if(_478>=2){
ret=_478+" months ago";
}else{
if(_477>=2){
ret=_477+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_476>=2){
ret=_476+" hours ago";
}else{
if(_475>=1){
ret=_475+" minute"+(_475==1?"":"s")+" ago";
}else{
ret=_474+" second"+(_474==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _47a=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_47a;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _47b=parseInt(req.responseText,10);
if(_47b>0){
this.newStoriesAvailable=_47b;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _47c=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_47c+" "+is+" available (click to load)";
},loadNewStories:function(_47d){
var nt=_47d?_47d:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _47e=$(document.createElement("div"));
_47e.addClassName("feed_item");
_47e.innerHTML=data["render"];
var _47f=$("feed_box").down(".feed_item",0);
_47f.parentNode.insertBefore(_47e,_47f);
_47e.descendants().each(function(elt){
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
var _480=$(document.createElement("div"));
_480.addClassName("feed_item");
_480.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _481=$("feed_box").down(".feed_item",0);
_481.parentNode.insertBefore(_480,_481);
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
var _482=$(document.createElement("div"));
_482.addClassName("feed_item");
_482.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _483=$("feed_box").down(".feed_item",0);
_483.parentNode.insertBefore(_482,_483);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _484=$(document.createElement("div"));
_484.addClassName("feed_item");
_484.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _485=$("feed_box").down(".feed_item",0);
_485.parentNode.insertBefore(_484,_485);
return;
}
var _486=$("category_filters");
if(!_486){
var _487=$(document.createElement("div"));
_487.addClassName("feed_setting_box");
_487.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_487);
var _486=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_486.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_488,type,id){
new Ajax.Updater(_488,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_489,_48a,_48b){
makeGrowable(id,_489,_48a,_48b);
},makeExpandable:function(id,_48c,_48d,_48e,_48f){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_48c,_48d,_48e,null,_48f);
return;
}
elt.addClass("expandable_text dimmed").val(_48c).data("hasFocus",false);
function _490(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_491,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _492(){
if(_490()){
if(!_48e){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_48c);
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
if(typeof (_48d)=="function"){
_48d.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_492();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_492();
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
},saveForm:function(_493){
this.getHandler(_493).save();
return false;
},addStoryToTop:function(_494,id,_495){
var _496=$(document.createElement("div"));
_496.innerHTML=_494;
_496.addClassName("feed_item");
var _497=$("feed_box").down(".feed_item",0);
_497.parentNode.insertBefore(_496,_497);
_496.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _498=new fx.Color(_496,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_495?_495:function(){
})});
_498.toggle();
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
var _499=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_499.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _49a=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
jq("#category").hpCategorySelector("chooseCategory",0);
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _49b=$("question");
_49b.value="What is your question?";
_49b.setStyle({"color":"#777"});
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
_49a.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _49c=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _49d=$("subject");
var _49e=$("message");
_49d.setStyle({"color":"#777"});
_49d.value="What is the subject of your forum post?";
_49e.value="";
jq("#feed_forum_selector").hpForumSelector("chooseForum",0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_49c.toggle();
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
},moreFeed:function(_49f){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_49f,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _4a0=JSONstring.toObject(req.responseText);
var _4a1=$("show_more");
_4a1.style.display="none";
_4a1.id="";
var _4a2=$(document.createElement("div"));
$("feed_box").appendChild(_4a2);
_4a2.innerHTML=_4a0["render"];
var _4a3=$("feed_more_"+_49f);
$$("#feed_more_"+_49f+" script").each(function(_4a4){
safeScriptEval(_4a4);
});
this.addItems(_4a0["feed"]);
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
},unhideUser:function(_4a5){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_4a5,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_4a5).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _4a6=this.getById(fid);
if(_4a6){
_4a6.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_4a5);
if(hu){
if(hu.siblings().size()==0){
var _4a7=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_4a7.parentNode.insertBefore(p,_4a7);
}
_4a7.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_4a8){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_4a8,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_4a8).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _4a9=this.getById(fid);
if(_4a9){
_4a9.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_4a8);
if(hc){
if(hc.siblings().size()==0){
var _4aa=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_4aa.parentNode.insertBefore(p,_4aa);
}
_4aa.remove();
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
var _4ab=$("overlay");
_4ab.classNames().each(function(name){
if(name!="overlay"){
_4ab.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_4ac){
if(_4ac){
$("overlay").addClassName(_4ac);
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
var _4ad=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_4ad+"px"});
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
var _4ae=0;
$("overlay_content").innerHTML=req.responseText;
var _4af=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_4af+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_4b0){
var code=_4b0.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_4b1){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_4b1,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_4b2,_4b3){
var sure=confirm("Are you sure that you want to stop following "+_4b3+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_4b2,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_4b2).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _4b4=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_4b4.each(function(type){
var _4b5=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_4b6){
if(_4b6.checked){
_4b5=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_4b5){
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
var _4b7=jq("#edit_button");
if(_4b7.html()=="edit"){
this.toggleFeedPrefs();
}
var _4b8=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_4b8);
return false;
},toggleFeedPrefs:function(){
var _4b9=$("edit_button");
var _4ba=$("filter").value;
var _4bb="edit";
if(_4b9.innerHTML=="save"){
_4bb="save";
}
if(_4bb=="save"){
this.updateFeedTypeFilters();
var _4bc=0;
var _4bd=$$(".ht_box");
for(var j=0;j<_4bd.length;j++){
if(_4bd[j].checked){
_4bc+=Number(_4bd[j].name.substr(3));
}
}
var _4be=$("current_prefs");
if(_4bc!=_4be.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_4bc,filter:_4ba,feed:1}).toQueryString(),onComplete:function(){
Element.update(_4b9,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _4bf=parseInt(pf.getStyle("height"));
var _4c0=new fx.Height("preference_feedback",{duration:600});
_4c0.hide();
_4c0.custom(0,_4bf);
}});
_4be.value=_4bc;
}else{
Element.update(_4b9,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _4c1=parseInt(pf.getStyle("height"));
var _4c2=new fx.Height("preference_feedback",{duration:600});
_4c2.hide();
_4c2.custom(0,_4c1);
}
}
var curs=$$(".ht_cur");
var _4c3="";
for(var i=0;i<curs.length;i++){
_4c3=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_4bb=="edit"){
if(_4c3=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_4c3){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_4bb=="edit"){
_4b9.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_4c4,_4c5,_4c6){
this.id=id;
this.feedItemId=fid;
this.cdate=_4c4;
this.hidden=_4c5;
this.manager=_4c6;
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
},unhide:function(_4c7){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_4c7){
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
Event.observe(this.triggerId,"click",function(_4c8){
if(Event.element(_4c8).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _4c9=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_4c9){
elt.observe("mouseover",function(_4ca){
_4ca.show();
}.bind(this,_4c9));
elt.observe("mouseout",function(_4cb){
_4cb.hide();
}.bind(this,_4c9));
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
},share:function(_4cc){
if(_4cc===undefined){
_4cc=false;
}
if(_4cc){
var _4cd=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_4cd){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_4ce,_4cf){
if(_4ce){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_4cf){
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
var _4d0=$(this.htmlId);
_4d0.parentNode.insertBefore(hmsg,_4d0);
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
},hideUser:function(_4d1,_4d2){
_4d2=_4d2?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_4d1,force:_4d2}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _4d3=$(this.htmlId);
_4d3.parentNode.insertBefore(hmsg,_4d3);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_4d1).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_4d4,_4d5){
_4d5=_4d5?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_4d5,categoryId:_4d4}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _4d6=$(this.htmlId);
_4d6.parentNode.insertBefore(hmsg,_4d6);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_4d4).each(function(elt){
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
var _4d7=$("feed_posts_"+this.id).immediateDescendants();
var _4d8=_4d7.size();
_4d7.each(function(elt,_4d9){
if(_4d9==_4d8-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _4da=$("feed_comments_"+this.id).immediateDescendants();
var _4db=_4da.size();
var _4dc=0;
_4da.each(function(elt,_4dd){
if(elt.hasClassName("show_previous")){
_4dc=_4dd;
}
});
_4da.each(function(elt,_4de){
if(_4de==_4dc){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_4df,num,_4e0){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_4df,num:num,startpos:_4e0}).toQueryString(),onComplete:function(req){
var _4e1=$("feed_posts_"+this.id);
_4e1.down("div").hide();
new Insertion.Top(_4e1,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_4e2){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_4e2}).toQueryString(),onComplete:function(req){
var _4e3=$("feed_comments_"+this.id);
_4e3.down("div").hide();
new Insertion.Top(_4e3,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_4e4,num,_4e5){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_4e4,num:num,startpos:_4e5}).toQueryString(),onComplete:function(req){
var _4e6=$("feed_comments_"+this.id);
_4e6.down("div").hide();
new Insertion.Top(_4e6,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _4e7=$("feed_comments_"+this.id);
_4e7.innerHTML+=data["render"];
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
},observePostReporting:function(_4e8){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _4e9=$$("#story_"+this.id+" .feed_post");
if(_4e9.size()>1){
_4e9.each(function(elt){
var _4ea=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _4eb=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_4ea]=_4eb;
elt.observe("mouseover",_4eb);
var _4ec=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_4ea]=_4ec;
elt.observe("mouseout",_4ec);
var _4ed=this.manager.reportPost.bind(this.manager,_4ea);
this.clickHandlers[_4ea]=_4ed;
elt.observe("click",_4ed);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _4ee=$(document.createElement("a"));
_4ee.innerHTML="cancel report";
_4ee.href="#";
msg.appendChild(_4ee);
var _4ef=$(this.messageId);
_4ef.innerHTML="";
_4ef.appendChild(msg);
_4ef.addClassName("report_instructions");
var _4f0=parseInt(_4ef.getStyle("height"));
var _4f1=new fx.Height(this.messageId,{duration:500});
_4f1.hide();
_4f1.custom(0,_4f0);
_4ee.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_4e9.size()==1){
var post=_4e9.detect(function(elt){
return true;
});
var _4f2=post.id;
this.manager.reportPost(this.postIdFromDivId(_4f2));
}
}
return false;
},postIdFromDivId:function(_4f3){
return _4f3.substring(_4f3.lastIndexOf("_")+1);
},stopObservePostReporting:function(_4f4){
var _4f5=$$("#story_"+this.id+" .feed_post");
if(_4f5.size()>1){
_4f5.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _4f6=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_4f6]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_4f6]);
elt.stopObserving("click",this.clickHandlers[_4f6]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_4f4){
Event.stop(_4f4);
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
function deleteStatus(_4f7){
link=jq(_4f7.target);
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
function markerMap(m,_4f8,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_4f8);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_4f9,_4fa){
this.markers.push(new infoMarker(this,_4f9,_4fa,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_4fb,_4fc,_4fd,_4fe){
this.markermap=_4fb;
this.marker=_4fc;
this.content=_4fd;
this.position=_4fe;
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
var _4ff=$(this.legend.id+"_"+i);
if(_4ff){
_4ff.innerHTML="";
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
var _500=this.directionsResult.routes[0];
var legs=_500.legs;
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
var _501=$(this.legend.id+"_"+i);
if(_501){
_501.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_500.copyrights;
var _502="";
for(var j=0;j<_500.warnings.length;j++){
_502+=_500.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_502;
};
markerMap.prototype.fetchDirections=function(){
var _503=this.markers;
var l=_503.length;
var _504=new google.maps.LatLng(_503[0].marker.getPosition().lat(),_503[0].marker.getPosition().lng());
var _505=new google.maps.LatLng(_503[l-1].marker.getPosition().lat(),_503[l-1].marker.getPosition().lng());
var _506=[];
for(var i=1;i<l-1;i++){
_506.push({location:new google.maps.LatLng(_503[i].marker.getPosition().lat(),_503[i].marker.getPosition().lng()),stopover:true});
}
var _507={origin:_504,destination:_505,waypoints:_506,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _508=new google.maps.DirectionsService();
_508.route(_507,function(_509,_50a){
if(_50a==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_509;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_50b){
var _50c="map_canvas_"+id;
var _50d=mm.getMapById(id);
if(!_50d){
var map=new google.maps.Map(document.getElementById(_50c));
var _50d=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_50d);
sv=true;
}else{
var map=_50d.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_50d.removeAllMarkers();
var _50e="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _50f=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_50f+".png";
var _510="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _511=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_50d.addMarker(_511,_510);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_50e+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_50d.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_50e+="<div id=\""+_50d.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_50e+="<div id=\""+_50d.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_50d.legend.innerHTML=_50e;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_50b||!_50d.directionsResult){
_50d.fetchDirections();
}else{
_50d.renderDirections();
}
}else{
var _512={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_50d.directionsResult=_512;
_50d.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_513){
var id=_513.markermap.id;
if(!id){
return;
}
var _514=mapLetterFromPosition(_513.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_514+".png";
_513.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_513.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_515){
var id=_515.markermap.id;
if(!id){
return;
}
var _516=mapLetterFromPosition(_515.position);
var icon="http://www.google.com/mapfiles/marker_green"+_516+".png";
_515.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_515.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_517,id,_518){
var _519=mm.getMapById(id);
if(_518<_519.markers.length){
highlightMarker(_519.markers[_518]);
}
};
function unhighlightMapMarker(_51a,id,_51b){
var _51c=mm.getMapById(id);
if(_51b<_51c.markers.length){
unhighlightMarker(_51c.markers[_51b]);
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
var _51d=jQuery("#editor_box");
if(_51d.hasClass("edit_box")){
jQuery(".message",_51d.closest(".postright")).show();
}
_51d.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_51e,_51f){
var ta=jq("#editor_box textarea");
var _520=ta.val();
if(_520.length){
ta.val(_520+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_51e,_51f)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_51e,_51f)+"[/img]\n\n");
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
var _521=jQuery("#report_box");
_521.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _522=jQuery(this).closest("div.replies_box_wrapper");
var _523=jQuery(this).closest("div.reply_collapser");
if(_523.hasClass("show")){
_523.addClass("hide").removeClass("show");
jQuery("a",_523).html("<span></span>");
jQuery("> .replies_box",_522).slideDown();
}else{
jQuery("> .replies_box",_522).slideUp(500,function(){
_523.addClass("show").removeClass("hide");
jQuery("a",_523).html("<span></span>"+jQuery("li.threaded",_522).length+" replies");
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
var _524=jQuery(this);
var _525=jQuery("#threaded_reply_to_box");
if(_524.html()=="hide"){
_524.html("this");
_525.hide();
return false;
}
var _526=_524.attr("class").substr(7);
var _527=jQuery("#post"+_526+" .username").html();
var html="<p class=\"by\">By "+_527+"</p>"+jQuery("#message"+_526).html();
var _528=_524.closest("li.threaded");
if(_525.length>0){
_528.append(_525);
}else{
jQuery(_528).append("<div id=\"threaded_reply_to_box\"></div>");
_525=jQuery("#threaded_reply_to_box");
}
_525.html(html);
var pos=_524.position();
var _529=_524.width();
_525.css({"left":(pos.left+_529)+"px","top":pos.top+"px"});
_525.show();
_524.html("hide");
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
var _52a=jQuery(this);
_52a.attr("src",_52a.data("src"));
});
});
});
function show_post_reply_box(_52b){
jQuery("li.threaded img.wait").remove();
_52b.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _52c=jQuery("#editor_box");
_52c.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_52c).text("submit");
jQuery("form",_52c).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_52c).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _52d=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _52e=_52d?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_52e+="<br/>";
jQuery("textarea",_52c).after(_52e);
}
if(jQuery("#follow_topic").length==0){
var _52f="checked";
var _530=window.location.pathname;
var arr=_530.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _52e="<p id=\"follow_topic\"></p>";
jQuery("textarea",_52c).after(_52e);
}
jQuery("#posterror ul",_52c).html("");
jQuery("#posterror",_52c).hide();
jQuery("textarea",_52c).val("");
jQuery("#postId",_52c).val(_52b.attr("id").substring(4));
_52c.append(jQuery("#formatting_tips"));
_52c.show();
var x=_52c.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_531){
jQuery("li.threaded img.wait").remove();
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _532=jQuery("#report_box");
jQuery("#reportPostId",_532).val(_531.attr("id").substring(4));
jQuery("form",_532).ajaxForm({type:"POST",success:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_531).append(_532);
jQuery(">.post_wrap > .actionmenu",_531).append(_532);
_532.show();
var x=_532.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyError(data,_533,_534){
alert("There may have been an error posting your reply ("+_533+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_535,_536){
alert("There may have been an error updating your post ("+_535+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_537,_538){
jQuery("li.threaded img.wait").remove();
if(_538=="error"){
alert(_537.responseText);
return;
}
data=eval("("+_537.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _539=jQuery("#editor_box");
_539.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_539).text("Save");
jQuery("form",_539).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_539).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _53a=document.getElementById("admincenter");
replyOptionsHTML=_53a?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_539).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_539).html("");
jQuery("#posterror",_539).hide();
jQuery("#postId",_539).val(data.postId);
jQuery("textarea",_539).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_539.append(jQuery("#formatting_tips"));
_539.show();
var x=_539.offset().top-300;
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
function processDeleteResponse(_53b,_53c,_53d){
if(_53c=="error"){
jQuery("li.threaded img.wait").remove();
alert(_53b);
}
};
function processUndeleteResponse(_53e,_53f,_540){
if(_53f=="error"){
jQuery("li.threaded img.wait").remove();
alert(_53e);
}
};
function processReportResponse(_541){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _542=jQuery("#report_box");
_542.hide();
alert(_541);
};
(function($){
$.extend($.fn,{validate:function(_543){
if(!this.length){
_543&&_543.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _544=$.data(this[0],"validator");
if(_544){
return _544;
}
_544=new $.validator(_543,this[0]);
$.data(this[0],"validator",_544);
if(_544.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_544.cancelSubmit=true;
});
if(_544.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_544.submitButton=this;
});
}
this.submit(function(_545){
if(_544.settings.debug){
_545.preventDefault();
}
function _546(){
if(_544.settings.submitHandler){
if(_544.submitButton){
var _547=$("<input type='hidden'/>").attr("name",_544.submitButton.name).val(_544.submitButton.value).appendTo(_544.currentForm);
}
_544.settings.submitHandler.call(_544,_544.currentForm);
if(_544.submitButton){
_547.remove();
}
return false;
}
return true;
};
if(_544.cancelSubmit){
_544.cancelSubmit=false;
return _546();
}
if(_544.form()){
if(_544.pendingRequest){
_544.formSubmitted=true;
return false;
}
return _546();
}else{
_544.focusInvalid();
return false;
}
});
}
return _544;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _548=true;
var _549=$(this[0].form).validate();
this.each(function(){
_548&=_549.element(this);
});
return _548;
}
},removeAttrs:function(_54a){
var _54b={},_54c=this;
$.each(_54a.split(/\s/),function(_54d,_54e){
_54b[_54e]=_54c.attr(_54e);
_54c.removeAttr(_54e);
});
return _54b;
},rules:function(_54f,_550){
var _551=this[0];
if(_54f){
var _552=$.data(_551.form,"validator").settings;
var _553=_552.rules;
var _554=$.validator.staticRules(_551);
switch(_54f){
case "add":
$.extend(_554,$.validator.normalizeRule(_550));
_553[_551.name]=_554;
if(_550.messages){
_552.messages[_551.name]=$.extend(_552.messages[_551.name],_550.messages);
}
break;
case "remove":
if(!_550){
delete _553[_551.name];
return _554;
}
var _555={};
$.each(_550.split(/\s/),function(_556,_557){
_555[_557]=_554[_557];
delete _554[_557];
});
return _555;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_551),$.validator.classRules(_551),$.validator.attributeRules(_551),$.validator.staticRules(_551)),_551);
if(data.required){
var _558=data.required;
delete data.required;
data=$.extend({required:_558},data);
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
$.validator=function(_559,form){
this.settings=$.extend(true,{},$.validator.defaults,_559);
this.currentForm=form;
this.init();
};
$.validator.format=function(_55a,_55b){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_55a);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_55b.constructor!=Array){
_55b=$.makeArray(arguments).slice(1);
}
if(_55b.constructor!=Array){
_55b=[_55b];
}
$.each(_55b,function(i,n){
_55a=_55a.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _55a;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_55c){
this.lastActive=_55c;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_55c,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_55c)).hide();
}
},onfocusout:function(_55d){
if(!this.checkable(_55d)&&(_55d.name in this.submitted||!this.optional(_55d))){
this.element(_55d);
}
},onkeyup:function(_55e){
if(_55e.name in this.submitted||_55e==this.lastElement){
this.element(_55e);
}
},onclick:function(_55f){
if(_55f.name in this.submitted){
this.element(_55f);
}else{
if(_55f.parentNode.name in this.submitted){
this.element(_55f.parentNode);
}
}
},highlight:function(_560,_561,_562){
$(_560).addClass(_561).removeClass(_562);
},unhighlight:function(_563,_564,_565){
$(_563).removeClass(_564).addClass(_565);
}},setDefaults:function(_566){
$.extend($.validator.defaults,_566);
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
var _567=(this.groups={});
$.each(this.settings.groups,function(key,_568){
$.each(_568.split(/\s/),function(_569,name){
_567[name]=key;
});
});
var _56a=this.settings.rules;
$.each(_56a,function(key,_56b){
_56a[key]=$.validator.normalizeRule(_56b);
});
function _56c(_56d){
var _56e=$.data(this[0].form,"validator"),_56f="on"+_56d.type.replace(/^validate/,"");
_56e.settings[_56f]&&_56e.settings[_56f].call(_56e,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_56c).validateDelegate(":radio, :checkbox, select, option","click",_56c);
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
for(var i=0,_570=(this.currentElements=this.elements());_570[i];i++){
this.check(_570[i]);
}
return this.valid();
},element:function(_571){
_571=this.clean(_571);
this.lastElement=_571;
this.prepareElement(_571);
this.currentElements=$(_571);
var _572=this.check(_571);
if(_572){
delete this.invalid[_571.name];
}else{
this.invalid[_571.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _572;
},showErrors:function(_573){
if(_573){
$.extend(this.errorMap,_573);
this.errorList=[];
for(var name in _573){
this.errorList.push({message:_573[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_574){
return !(_574.name in _573);
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
var _575=0;
for(var i in obj){
_575++;
}
return _575;
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
var _576=this.lastActive;
return _576&&$.grep(this.errorList,function(n){
return n.element.name==_576.name;
}).length==1&&_576;
},elements:function(){
var _577=this,_578={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_577.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _578||!_577.objectLength($(this).rules())){
return false;
}
_578[this.name]=true;
return true;
});
},clean:function(_579){
return $(_579)[0];
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
},prepareElement:function(_57a){
this.reset();
this.toHide=this.errorsFor(_57a);
},check:function(_57b){
_57b=this.clean(_57b);
if(this.checkable(_57b)){
_57b=this.findByName(_57b.name).not(this.settings.ignore)[0];
}
var _57c=$(_57b).rules();
var _57d=false;
for(var _57e in _57c){
var rule={method:_57e,parameters:_57c[_57e]};
try{
var _57f=$.validator.methods[_57e].call(this,_57b.value.replace(/\r/g,""),_57b,rule.parameters);
if(_57f=="dependency-mismatch"){
_57d=true;
continue;
}
_57d=false;
if(_57f=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_57b));
return;
}
if(!_57f){
this.formatAndAdd(_57b,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_57b.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_57d){
return;
}
if(this.objectLength(_57c)){
this.successList.push(_57b);
}
return true;
},customMetaMessage:function(_580,_581){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_580).metadata()[this.settings.meta]:$(_580).metadata();
return meta&&meta.messages&&meta.messages[_581];
},customMessage:function(name,_582){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_582]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_583,_584){
return this.findDefined(this.customMessage(_583.name,_584),this.customMetaMessage(_583,_584),!this.settings.ignoreTitle&&_583.title||undefined,$.validator.messages[_584],"<strong>Warning: No message defined for "+_583.name+"</strong>");
},formatAndAdd:function(_585,rule){
var _586=this.defaultMessage(_585,rule.method),_587=/\$?\{(\d+)\}/g;
if(typeof _586=="function"){
_586=_586.call(this,rule.parameters,_585);
}else{
if(_587.test(_586)){
_586=jQuery.format(_586.replace(_587,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_586,element:_585});
this.errorMap[_585.name]=_586;
this.submitted[_585.name]=_586;
},addWrapper:function(_588){
if(this.settings.wrapper){
_588=_588.add(_588.parent(this.settings.wrapper));
}
return _588;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _589=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_589.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_589.element,_589.message);
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
for(var i=0,_58a=this.validElements();_58a[i];i++){
this.settings.unhighlight.call(this,_58a[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_58b,_58c){
var _58d=this.errorsFor(_58b);
if(_58d.length){
_58d.removeClass().addClass(this.settings.errorClass);
_58d.attr("generated")&&_58d.html(_58c);
}else{
_58d=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_58b),generated:true}).addClass(this.settings.errorClass).html(_58c||"");
if(this.settings.wrapper){
_58d=_58d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_58d).length){
this.settings.errorPlacement?this.settings.errorPlacement(_58d,$(_58b)):_58d.insertAfter(_58b);
}
}
if(!_58c&&this.settings.success){
_58d.text("");
typeof this.settings.success=="string"?_58d.addClass(this.settings.success):this.settings.success(_58d);
}
this.toShow=this.toShow.add(_58d);
},errorsFor:function(_58e){
var name=this.idOrName(_58e);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_58f){
return this.groups[_58f.name]||(this.checkable(_58f)?_58f.name:_58f.id||_58f.name);
},checkable:function(_590){
return /radio|checkbox/i.test(_590.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_591,_592){
return _592.form==form&&_592.name==name&&_592||null;
});
},getLength:function(_593,_594){
switch(_594.nodeName.toLowerCase()){
case "select":
return $("option:selected",_594).length;
case "input":
if(this.checkable(_594)){
return this.findByName(_594.name).filter(":checked").length;
}
}
return _593.length;
},depend:function(_595,_596){
return this.dependTypes[typeof _595]?this.dependTypes[typeof _595](_595,_596):true;
},dependTypes:{"boolean":function(_597,_598){
return _597;
},"string":function(_599,_59a){
return !!$(_599,_59a.form).length;
},"function":function(_59b,_59c){
return _59b(_59c);
}},optional:function(_59d){
return !$.validator.methods.required.call(this,$.trim(_59d.value),_59d)&&"dependency-mismatch";
},startRequest:function(_59e){
if(!this.pending[_59e.name]){
this.pendingRequest++;
this.pending[_59e.name]=true;
}
},stopRequest:function(_59f,_5a0){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_59f.name];
if(_5a0&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_5a0&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_5a1){
return $.data(_5a1,"previousValue")||$.data(_5a1,"previousValue",{old:null,valid:true,message:this.defaultMessage(_5a1,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_5a2,_5a3){
_5a2.constructor==String?this.classRuleSettings[_5a2]=_5a3:$.extend(this.classRuleSettings,_5a2);
},classRules:function(_5a4){
var _5a5={};
var _5a6=$(_5a4).attr("class");
_5a6&&$.each(_5a6.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_5a5,$.validator.classRuleSettings[this]);
}
});
return _5a5;
},attributeRules:function(_5a7){
var _5a8={};
var _5a9=$(_5a7);
for(var _5aa in $.validator.methods){
var _5ab=_5a9.attr(_5aa);
if(_5ab){
_5a8[_5aa]=_5ab;
}
}
if(_5a8.maxlength&&/-1|2147483647|524288/.test(_5a8.maxlength)){
delete _5a8.maxlength;
}
return _5a8;
},metadataRules:function(_5ac){
if(!$.metadata){
return {};
}
var meta=$.data(_5ac.form,"validator").settings.meta;
return meta?$(_5ac).metadata()[meta]:$(_5ac).metadata();
},staticRules:function(_5ad){
var _5ae={};
var _5af=$.data(_5ad.form,"validator");
if(_5af.settings.rules){
_5ae=$.validator.normalizeRule(_5af.settings.rules[_5ad.name])||{};
}
return _5ae;
},normalizeRules:function(_5b0,_5b1){
$.each(_5b0,function(prop,val){
if(val===false){
delete _5b0[prop];
return;
}
if(val.param||val.depends){
var _5b2=true;
switch(typeof val.depends){
case "string":
_5b2=!!$(val.depends,_5b1.form).length;
break;
case "function":
_5b2=val.depends.call(_5b1,_5b1);
break;
}
if(_5b2){
_5b0[prop]=val.param!==undefined?val.param:true;
}else{
delete _5b0[prop];
}
}
});
$.each(_5b0,function(rule,_5b3){
_5b0[rule]=$.isFunction(_5b3)?_5b3(_5b1):_5b3;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_5b0[this]){
_5b0[this]=Number(_5b0[this]);
}
});
$.each(["rangelength","range"],function(){
if(_5b0[this]){
_5b0[this]=[Number(_5b0[this][0]),Number(_5b0[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_5b0.min&&_5b0.max){
_5b0.range=[_5b0.min,_5b0.max];
delete _5b0.min;
delete _5b0.max;
}
if(_5b0.minlength&&_5b0.maxlength){
_5b0.rangelength=[_5b0.minlength,_5b0.maxlength];
delete _5b0.minlength;
delete _5b0.maxlength;
}
}
if(_5b0.messages){
delete _5b0.messages;
}
return _5b0;
},normalizeRule:function(data){
if(typeof data=="string"){
var _5b4={};
$.each(data.split(/\s/),function(){
_5b4[this]=true;
});
data=_5b4;
}
return data;
},addMethod:function(name,_5b5,_5b6){
$.validator.methods[name]=_5b5;
$.validator.messages[name]=_5b6!=undefined?_5b6:$.validator.messages[name];
if(_5b5.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_5b7,_5b8,_5b9){
if(!this.depend(_5b9,_5b8)){
return "dependency-mismatch";
}
switch(_5b8.nodeName.toLowerCase()){
case "select":
var val=$(_5b8).val();
return val&&val.length>0;
case "input":
if(this.checkable(_5b8)){
return this.getLength(_5b7,_5b8)>0;
}
default:
return $.trim(_5b7).length>0;
}
},remote:function(_5ba,_5bb,_5bc){
if(this.optional(_5bb)){
return "dependency-mismatch";
}
var _5bd=this.previousValue(_5bb);
if(!this.settings.messages[_5bb.name]){
this.settings.messages[_5bb.name]={};
}
_5bd.originalMessage=this.settings.messages[_5bb.name].remote;
this.settings.messages[_5bb.name].remote=_5bd.message;
_5bc=typeof _5bc=="string"&&{url:_5bc}||_5bc;
if(this.pending[_5bb.name]){
return "pending";
}
if(_5bd.old===_5ba){
return _5bd.valid;
}
_5bd.old=_5ba;
var _5be=this;
this.startRequest(_5bb);
var data={};
data[_5bb.name]=_5ba;
$.ajax($.extend(true,{url:_5bc,mode:"abort",port:"validate"+_5bb.name,dataType:"json",data:data,success:function(_5bf){
_5be.settings.messages[_5bb.name].remote=_5bd.originalMessage;
var _5c0=_5bf===true;
if(_5c0){
var _5c1=_5be.formSubmitted;
_5be.prepareElement(_5bb);
_5be.formSubmitted=_5c1;
_5be.successList.push(_5bb);
_5be.showErrors();
}else{
var _5c2={};
var _5c3=_5bf||_5be.defaultMessage(_5bb,"remote");
_5c2[_5bb.name]=_5bd.message=$.isFunction(_5c3)?_5c3(_5ba):_5c3;
_5be.showErrors(_5c2);
}
_5bd.valid=_5c0;
_5be.stopRequest(_5bb,_5c0);
}},_5bc));
return "pending";
},minlength:function(_5c4,_5c5,_5c6){
return this.optional(_5c5)||this.getLength($.trim(_5c4),_5c5)>=_5c6;
},maxlength:function(_5c7,_5c8,_5c9){
return this.optional(_5c8)||this.getLength($.trim(_5c7),_5c8)<=_5c9;
},rangelength:function(_5ca,_5cb,_5cc){
var _5cd=this.getLength($.trim(_5ca),_5cb);
return this.optional(_5cb)||(_5cd>=_5cc[0]&&_5cd<=_5cc[1]);
},min:function(_5ce,_5cf,_5d0){
return this.optional(_5cf)||_5ce>=_5d0;
},max:function(_5d1,_5d2,_5d3){
return this.optional(_5d2)||_5d1<=_5d3;
},range:function(_5d4,_5d5,_5d6){
return this.optional(_5d5)||(_5d4>=_5d6[0]&&_5d4<=_5d6[1]);
},email:function(_5d7,_5d8){
return this.optional(_5d8)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_5d7);
},url:function(_5d9,_5da){
return this.optional(_5da)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_5d9);
},date:function(_5db,_5dc){
return this.optional(_5dc)||!/Invalid|NaN/.test(new Date(_5db));
},dateISO:function(_5dd,_5de){
return this.optional(_5de)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_5dd);
},number:function(_5df,_5e0){
return this.optional(_5e0)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_5df);
},digits:function(_5e1,_5e2){
return this.optional(_5e2)||/^\d+$/.test(_5e1);
},creditcard:function(_5e3,_5e4){
if(this.optional(_5e4)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_5e3)){
return false;
}
var _5e5=0,_5e6=0,_5e7=false;
_5e3=_5e3.replace(/\D/g,"");
for(var n=_5e3.length-1;n>=0;n--){
var _5e8=_5e3.charAt(n);
var _5e6=parseInt(_5e8,10);
if(_5e7){
if((_5e6*=2)>9){
_5e6-=9;
}
}
_5e5+=_5e6;
_5e7=!_5e7;
}
return (_5e5%10)==0;
},accept:function(_5e9,_5ea,_5eb){
_5eb=typeof _5eb=="string"?_5eb.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_5ea)||_5e9.match(new RegExp(".("+_5eb+")$","i"));
},equalTo:function(_5ec,_5ed,_5ee){
var _5ef=$(_5ee).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_5ed).valid();
});
return $.trim(_5ec)==$.trim(_5ef.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _5f0={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_5f1,_5f2,xhr){
var port=_5f1.port;
if(_5f1.mode=="abort"){
if(_5f0[port]){
_5f0[port].abort();
}
_5f0[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_5f3){
var mode=("mode" in _5f3?_5f3:$.ajaxSettings).mode,port=("port" in _5f3?_5f3:$.ajaxSettings).port;
if(mode=="abort"){
if(_5f0[port]){
_5f0[port].abort();
}
return (_5f0[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_5f4,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_5f4,_5f5,true);
},teardown:function(){
this.removeEventListener(_5f4,_5f5,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _5f5(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_5f6,type,_5f7){
return this.bind(type,function(_5f8){
var _5f9=$(_5f8.target);
if(_5f9.is(_5f6)){
return _5f7.apply(_5f9,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_5fa,_5fb,_5fc){
return this.optional(_5fb)||this.getLength(jq.trim(_5fa),_5fb)==_5fc;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_5fd,_5fe,_5ff){
if(!this.depend(_5ff,_5fe)){
return "dependency-mismatch";
}
switch(_5fe.nodeName.toLowerCase()){
case "select":
var val=jq(_5fe).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_5fe)){
return this.getLength(_5fd,_5fe)==0;
}
default:
return jq.trim(_5fd).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_600,_601){
if(!this.depend(_601,_600)){
return "dependency-mismatch";
}
var _602=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_602=true;
}else{
var _603=ssn.split("-");
if(_603[0]=="000"||_603[1]=="00"||_603[2]=="0000"){
_602=true;
}
if(_603[0]=="666"){
_602=true;
}
var _604=parseInt(_603[0],10);
if(_604>=900){
if(_603[1][0]!=7&&_603[1][0]!=8){
_602=true;
}
}
}
return !_602;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_605,_606,_607){
if(!this.depend(_607,_606)){
return "dependency-mismatch";
}
return _605.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_608,_609){
if(!this.depend(_609,_608)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_60a,_60b,_60c){
var _60a=jq.trim(_60a);
if(_60a.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _60d=_60a.split("-");
var m=1*_60d[0]-1;
var d=1*_60d[1];
var y=1*_60d[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_60e,_60f,_610){
return jq.trim(_60e).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
jQuery.validator.addMethod("requiredNoPlaceholder",function(_611,_612,_613){
if(!this.depend(_613,_612)){
return "dependency-mismatch";
}
if(jq(_612).hasClass("placeholder")){
return false;
}
switch(_612.nodeName.toLowerCase()){
case "select":
var val=jq(_612).val();
return val&&val.length>0;
case "input":
if(this.checkable(_612)){
return this.getLength(_611,_612)>0;
}
default:
return jq.trim(_611).length>0;
}
},"This field is required.");
(function(_614,$,_615){
"use strict";
var _616=$.event,_617;
_616.special.smartresize={setup:function(){
$(this).bind("resize",_616.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_616.special.smartresize.handler);
},handler:function(_618,_619){
var _61a=this,args=arguments;
_618.type="smartresize";
if(_617){
clearTimeout(_617);
}
_617=setTimeout(function(){
jQuery.event.handle.apply(_61a,args);
},_619==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_61b,_61c){
this.element=$(_61c);
this._create(_61b);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_61d){
var _61e=this.options.itemSelector;
return !_61e?_61d:_61d.filter(_61e).add(_61d.find(_61e));
},_getBricks:function(_61f){
var _620=this._filterFindBricks(_61f).css({position:"absolute"}).addClass("masonry-brick");
return _620;
},_create:function(_621){
this.options=$.extend(true,{},$.Mason.settings,_621);
this.styleQueue=[];
var _622=this.element[0].style;
this.originalStyle={height:_622.height||""};
var _623=this.options.containerStyle;
for(var prop in _623){
this.originalStyle[prop]=_622[prop]||"";
}
this.element.css(_623);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _624=this;
setTimeout(function(){
_624.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_614).bind("smartresize.masonry",function(){
_624.resize();
});
}
this.reloadItems();
},_init:function(_625){
this._getColumns();
this._reLayout(_625);
},option:function(key,_626){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_627,_628){
for(var i=0,len=_627.length;i<len;i++){
this._placeBrick(_627[i]);
}
var _629={};
_629.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _62a=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_62a++;
}
_629.width=(this.cols-_62a)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_629});
var _62b=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_62c=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_62b](obj.style,_62c);
}
this.styleQueue=[];
if(_628){
_628.call(_627);
}
this.isLaidOut=true;
},_getColumns:function(){
var _62d=this.options.isFitWidth?this.element.parent():this.element,_62e=_62d.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_62e):this.options.columnWidth||this.$bricks.outerWidth(true)||_62e;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_62e+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_62f){
var _630=$(_62f),_631,_632,_633,_634,j;
_631=Math.ceil(_630.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_631=Math.min(_631,this.cols);
if(_631===1){
_633=this.colYs;
}else{
_632=this.cols+1-_631;
_633=[];
for(j=0;j<_632;j++){
_634=this.colYs.slice(j,j+_631);
_633[j]=Math.max.apply(Math,_634);
}
}
var _635=Math.min.apply(Math,_633),_636=0;
for(var i=0,len=_633.length;i<len;i++){
if(_633[i]===_635){
_636=i;
break;
}
}
var _637={top:_635+this.offset.y};
_637[this.horizontalDirection]=this.columnWidth*_636+this.offset.x;
this.styleQueue.push({$el:_630,style:_637});
var _638=_635+_630.outerHeight(true),_639=this.cols+1-len;
for(i=0;i<_639;i++){
this.colYs[_636+i]=_638;
}
},resize:function(){
var _63a=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_63a){
this._reLayout();
}
},_reLayout:function(_63b){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_63b);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_63c){
this.reloadItems();
this._init(_63c);
},appended:function(_63d,_63e,_63f){
if(_63e){
this._filterFindBricks(_63d).css({top:this.element.height()});
var _640=this;
setTimeout(function(){
_640._appended(_63d,_63f);
},1);
}else{
this._appended(_63d,_63f);
}
},_appended:function(_641,_642){
var _643=this._getBricks(_641);
this.$bricks=this.$bricks.add(_643);
this.layout(_643,_642);
},remove:function(_644){
this.$bricks=this.$bricks.not(_644);
_644.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _645=this.element[0].style;
for(var prop in this.originalStyle){
_645[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_614).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_646){
var _647=this,_648=_647.find("img").add(_647.filter("img")),len=_648.length,_649="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_64a=[];
function _64b(){
_646.call(_647,_648);
};
function _64c(_64d){
var img=_64d.target;
if(img.src!==_649&&$.inArray(img,_64a)===-1){
_64a.push(img);
if(--len<=0){
setTimeout(_64b);
_648.unbind(".imagesLoaded",_64c);
}
}
};
if(!len){
_64b();
}
_648.bind("load.imagesLoaded error.imagesLoaded",_64c).each(function(){
var src=this.src;
this.src=_649;
this.src=src;
});
return _647;
};
var _64e=function(_64f){
if(_614.console){
_614.console.error(_64f);
}
};
$.fn.masonry=function(_650){
if(typeof _650==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _651=$.data(this,"masonry");
if(!_651){
_64e("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_650+"'");
return;
}
if(!$.isFunction(_651[_650])||_650.charAt(0)==="_"){
_64e("no such method '"+_650+"' for masonry instance");
return;
}
_651[_650].apply(_651,args);
});
}else{
this.each(function(){
var _652=$.data(this,"masonry");
if(_652){
_652.option(_650||{});
_652._init();
}else{
$.data(this,"masonry",new $.Mason(_650,this));
}
});
}
return this;
};
})(window,jQuery);
(function($){
$.expander={version:"1.4.3",defaults:{slicePoint:100,preserveWords:true,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:false,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:true,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null}};
$.fn.expander=function(_653){
var meth="init";
if(typeof _653=="string"){
meth=_653;
_653={};
}
var opts=$.extend({},$.expander.defaults,_653),_654=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,_655=opts.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,_656=/<\/?(\w+)[^>]*>/g,_657=/<(\w+)[^>]*>/g,_658=/<\/(\w+)>/g,_659=/(<\/[^>]+>)\s*$/,_65a=/^<[^>]+>.?/,_65b;
var _65c={init:function(){
this.each(function(){
var i,l,tmp,_65d,_65e,_65f,_660,_661,_662,_663,_664,_665,_666=[],_667=[],_668={},_669=this,_66a=$(this),_66b=$([]),o=$.extend({},opts,_66a.data("expander")||$.meta&&_66a.data()||{}),_66c=!!_66a.find("."+o.detailClass).length,_66d=!!_66a.find("*").filter(function(){
var _66e=$(this).css("display");
return (/^block|table|list/).test(_66e);
}).length,el=_66d?"div":"span",_66f=el+"."+o.detailClass,_670="span."+o.moreClass,_671=o.expandSpeed||0,_672=$.trim(_66a.html()),_673=$.trim(_66a.text()),_674=_672.slice(0,o.slicePoint);
if($.data(this,"expanderInit")){
return;
}
$.data(this,"expanderInit",true);
$.each(["onSlice","beforeExpand","afterExpand","onCollapse"],function(_675,val){
_668[val]=$.isFunction(o[val]);
});
_674=_685(_674);
_65e=_674.replace(_656,"").length;
while(_65e<o.slicePoint){
_65d=_672.charAt(_674.length);
if(_65d=="<"){
_65d=_672.slice(_674.length).match(_65a)[0];
}
_674+=_65d;
_65e++;
}
_674=_685(_674,o.preserveWords);
_65f=_674.match(_657)||[];
_660=_674.match(_658)||[];
tmp=[];
$.each(_65f,function(_676,val){
if(!_654.test(val)){
tmp.push(val);
}
});
_65f=tmp;
l=_660.length;
for(i=0;i<l;i++){
_660[i]=_660[i].replace(_658,"$1");
}
$.each(_65f,function(_677,val){
var _678=val.replace(_657,"$1");
var _679=$.inArray(_678,_660);
if(_679===-1){
_666.push(val);
_667.push("</"+_678+">");
}else{
_660.splice(_679,1);
}
});
_667.reverse();
if(!_66c){
_662=_672.slice(_674.length);
_663=$.trim(_662.replace(_656,""));
if(_663===""||_663.split(/\s+/).length<o.widow){
return;
}
_661=_667.pop()||"";
_674+=_667.join("");
_662=_666.join("")+_662;
}else{
_662=_66a.find(_66f).remove().html();
_674=_66a.html();
_672=_674+_662;
_661="";
}
o.moreLabel=_66a.find(_670).length?"":_684(o);
if(_66d){
_662=_672;
}
_674+=_661;
o.summary=_674;
o.details=_662;
o.lastCloseTag=_661;
if(_668.onSlice){
tmp=o.onSlice.call(_669,o);
o=tmp&&tmp.details?tmp:o;
}
var html=_681(o,_66d);
_66a.html(html);
_664=_66a.find(_66f);
_665=_66a.find(_670);
_664[o.collapseEffect](0);
_665.find("a").unbind("click.expander").bind("click.expander",_67a);
_66b=_66a.find("div."+o.summaryClass);
if(o.userCollapse&&!_66a.find("span."+o.lessClass).length){
_66a.find(_66f).append("<span class=\""+o.lessClass+"\">"+o.userCollapsePrefix+"<a href=\"#\">"+o.userCollapseText+"</a></span>");
}
_66a.find("span."+o.lessClass+" a").unbind("click.expander").bind("click.expander",function(_67b){
_67b.preventDefault();
clearTimeout(_65b);
var _67c=$(this).closest(_66f);
_687(o,_67c);
if(_668.onCollapse){
o.onCollapse.call(_669,true);
}
});
function _67a(_67d){
_67d.preventDefault();
_665.hide();
_66b.hide();
if(_668.beforeExpand){
o.beforeExpand.call(_669);
}
_664.stop(false,true)[o.expandEffect](_671,function(){
_664.css({zoom:""});
if(_668.afterExpand){
o.afterExpand.call(_669);
}
_67e(o,_664,_669);
});
};
});
},destroy:function(){
if(!this.data("expander")){
return;
}
this.removeData("expander");
this.each(function(){
var _67f=$(this),o=$.meta?$.extend({},opts,_67f.data()):opts,_680=_67f.find("."+o.detailClass).contents();
_67f.find("."+o.moreClass).remove();
_67f.find("."+o.summaryClass).remove();
_67f.find("."+o.detailClass).after(_680).remove();
_67f.find("."+o.lessClass).remove();
});
}};
if(_65c[meth]){
_65c[meth].call(this);
}
function _681(o,_682){
var el="span",_683=o.summary;
if(_682){
el="div";
if(_659.test(_683)&&!o.expandAfterSummary){
_683=_683.replace(_659,o.moreLabel+"$1");
}else{
_683+=o.moreLabel;
}
_683="<div class=\""+o.summaryClass+"\">"+_683+"</div>";
}else{
_683+=o.moreLabel;
}
return [_683,"<",el+" class=\""+o.detailClass+"\"",">",o.details,"</"+el+">"].join("");
};
function _684(o){
var ret="<span class=\""+o.moreClass+"\">"+o.expandPrefix;
ret+="<a href=\"#\">"+o.expandText+"</a></span>";
return ret;
};
function _685(txt,_686){
if(txt.lastIndexOf("<")>txt.lastIndexOf(">")){
txt=txt.slice(0,txt.lastIndexOf("<"));
}
if(_686){
txt=txt.replace(_655,"");
}
return $.trim(txt);
};
function _687(o,el){
el.stop(true,true)[o.collapseEffect](o.collapseSpeed,function(){
var _688=el.prev("span."+o.moreClass).show();
if(!_688.length){
el.parent().children("div."+o.summaryClass).show().find("span."+o.moreClass).show();
}
});
};
function _67e(_689,_68a,_68b){
if(_689.collapseTimer){
_65b=setTimeout(function(){
_687(_689,_68a);
if($.isFunction(_689.onCollapse)){
_689.onCollapse.call(_68b,false);
}
},_689.collapseTimer);
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
var _68c=$(this);
$(that).each(function(){
if($(this)[0]!==_68c[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_68d){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _68d=="function"){
_68d={success:_68d};
}
var _68e=this.attr("action");
var url=(typeof _68e==="string")?$.trim(_68e):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_68d=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_68d);
var veto={};
this.trigger("form-pre-serialize",[this,_68d,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_68d.beforeSerialize&&_68d.beforeSerialize(this,_68d)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_68d.semantic);
if(_68d.data){
_68d.extraData=_68d.data;
for(n in _68d.data){
if(_68d.data[n] instanceof Array){
for(var k in _68d.data[n]){
a.push({name:n,value:_68d.data[n][k]});
}
}else{
v=_68d.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_68d.beforeSubmit&&_68d.beforeSubmit(a,this,_68d)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_68d,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_68d.type.toUpperCase()=="GET"){
_68d.url+=(_68d.url.indexOf("?")>=0?"&":"?")+q;
_68d.data=null;
}else{
_68d.data=q;
}
var _68f=this,_690=[];
if(_68d.resetForm){
_690.push(function(){
_68f.resetForm();
});
}
if(_68d.clearForm){
_690.push(function(){
_68f.clearForm();
});
}
if(!_68d.dataType&&_68d.target){
var _691=_68d.success||function(){
};
_690.push(function(data){
var fn=_68d.replaceTarget?"replaceWith":"html";
$(_68d.target)[fn](data).each(_691,arguments);
});
}else{
if(_68d.success){
_690.push(_68d.success);
}
}
_68d.success=function(data,_692,xhr){
var _693=_68d.context||_68d;
for(var i=0,max=_690.length;i<max;i++){
_690[i].apply(_693,[data,_692,xhr||_68f,_68f]);
}
};
var _694=$("input:file",this).length>0;
var mp="multipart/form-data";
var _695=(_68f.attr("enctype")==mp||_68f.attr("encoding")==mp);
if(_68d.iframe!==false&&(_694||_68d.iframe||_695)){
if(_68d.closeKeepAlive){
$.get(_68d.closeKeepAlive,_696);
}else{
_696();
}
}else{
$.ajax(_68d);
}
this.trigger("form-submit-notify",[this,_68d]);
return this;
function _696(){
var form=_68f[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_68d);
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
var _697=0;
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
function _698(){
var t=_68f.attr("target"),a=_68f.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_68f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_697=true;
cb();
},s.timeout);
}
var _699=[];
try{
if(s.extraData){
for(var n in s.extraData){
_699.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_68f.removeAttr("target");
}
$(_699).remove();
}
};
if(s.forceSync){
_698();
}else{
setTimeout(_698,10);
}
var data,doc,_69a=50;
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
if(_697){
throw "timeout";
}
var _69b=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_69b);
if(!_69b&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_69a){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_69c){
var _69d={"content-type":s.dataType};
return _69d[_69c];
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
xhr.responseXML=_69e(xhr.responseText);
}
}
data=_6a0(xhr,s.dataType,s);
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
var _69e=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _69f=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _6a0=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_69f(data);
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
$.fn.ajaxForm=function(_6a1){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_6a1);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_6a1);
}
}).bind("click.form-plugin",function(e){
var _6a2=e.target;
var $el=$(_6a2);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_6a2=t[0];
}
var form=this;
form.clk=_6a2;
if(_6a2.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _6a3=$el.offset();
form.clk_x=e.pageX-_6a3.left;
form.clk_y=e.pageY-_6a3.top;
}else{
form.clk_x=e.pageX-_6a2.offsetLeft;
form.clk_y=e.pageY-_6a2.offsetTop;
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
$.fn.formToArray=function(_6a4){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_6a4?form.getElementsByTagName("*"):form.elements;
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
if(_6a4&&form.clk&&el.type=="image"){
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
if(!_6a4&&form.clk){
var _6a5=$(form.clk),_6a6=_6a5[0];
n=_6a6.name;
if(n&&!_6a6.disabled&&_6a6.type=="image"){
a.push({name:n,value:_6a5.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_6a7){
return $.param(this.formToArray(_6a7));
};
$.fn.fieldSerialize=function(_6a8){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_6a8);
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
$.fn.fieldValue=function(_6a9){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_6a9);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_6aa){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_6aa===undefined){
_6aa=true;
}
if(_6aa&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _6ab=el.selectedIndex;
if(_6ab<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_6ab+1:ops.length);
for(var i=(one?_6ab:0);i<max;i++){
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
$.fn.selected=function(_6ac){
if(_6ac===undefined){
_6ac=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_6ac;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_6ac&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_6ac;
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
$.fn.extend({accordion:function(_6ad,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _6ad=="string"){
var _6ae=$.data(this,"ui-accordion");
_6ae[_6ad].apply(_6ae,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_6ad));
}
}
});
},activate:function(_6af){
return this.accordion("activate",_6af);
}});
$.ui.accordion=function(_6b0,_6b1){
this.options=_6b1=$.extend({},$.ui.accordion.defaults,_6b1);
this.element=_6b0;
$(_6b0).addClass("ui-accordion");
if(_6b1.navigation){
var _6b2=$(_6b0).find("a").filter(_6b1.navigationFilter);
if(_6b2.length){
if(_6b2.filter(_6b1.header).length){
_6b1.active=_6b2;
}else{
_6b1.active=_6b2.parent().parent().prev();
_6b2.addClass("current");
}
}
}
_6b1.headers=$(_6b0).find(_6b1.header);
_6b1.active=_6b3(_6b1.headers,_6b1.active);
if(_6b1.fillSpace){
var _6b4=$(_6b0).parent().height();
_6b1.headers.each(function(){
_6b4-=$(this).outerHeight();
});
var _6b5=0;
_6b1.headers.next().each(function(){
_6b5=Math.max(_6b5,$(this).innerHeight()-$(this).height());
}).height(_6b4-_6b5);
}else{
if(_6b1.autoheight){
var _6b4=0;
_6b1.headers.next().each(function(){
_6b4=Math.max(_6b4,$(this).outerHeight());
}).height(_6b4);
}
}
_6b1.headers.not(_6b1.active||"").next().hide();
_6b1.active.parent().andSelf().addClass(_6b1.selectedClass);
if(_6b1.event){
$(_6b0).bind((_6b1.event)+".ui-accordion",_6b6);
}
};
$.ui.accordion.prototype={activate:function(_6b7){
_6b6.call(this.element,{target:_6b3(this.options.headers,_6b7)[0]});
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
function _6b8(_6b9,_6ba){
return function(){
return _6b9.apply(_6ba,arguments);
};
};
function _6bb(_6bc){
if(!$.data(this,"ui-accordion")){
return;
}
var _6bd=$.data(this,"ui-accordion");
var _6be=_6bd.options;
_6be.running=_6bc?0:--_6be.running;
if(_6be.running){
return;
}
if(_6be.clearStyle){
_6be.toShow.add(_6be.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_6be.data],_6be.change);
};
function _6bf(_6c0,_6c1,data,_6c2,down){
var _6c3=$.data(this,"ui-accordion").options;
_6c3.toShow=_6c0;
_6c3.toHide=_6c1;
_6c3.data=data;
var _6c4=_6b8(_6bb,this);
_6c3.running=_6c1.size()==0?_6c0.size():_6c1.size();
if(_6c3.animated){
if(!_6c3.alwaysOpen&&_6c2){
$.ui.accordion.animations[_6c3.animated]({toShow:jQuery([]),toHide:_6c1,complete:_6c4,down:down,autoheight:_6c3.autoheight});
}else{
$.ui.accordion.animations[_6c3.animated]({toShow:_6c0,toHide:_6c1,complete:_6c4,down:down,autoheight:_6c3.autoheight});
}
}else{
if(!_6c3.alwaysOpen&&_6c2){
_6c0.toggle();
}else{
_6c1.hide();
_6c0.show();
}
_6c4(true);
}
};
function _6b6(_6c5){
var _6c6=$.data(this,"ui-accordion").options;
if(_6c6.disabled){
return false;
}
if(!_6c5.target&&!_6c6.alwaysOpen){
_6c6.active.parent().andSelf().toggleClass(_6c6.selectedClass);
var _6c7=_6c6.active.next(),data={instance:this,options:_6c6,newHeader:jQuery([]),oldHeader:_6c6.active,newContent:jQuery([]),oldContent:_6c7},_6c8=_6c6.active=$([]);
_6bf.call(this,_6c8,_6c7,data);
return false;
}
var _6c9=$(_6c5.target);
if(_6c9.parents(_6c6.header).length){
while(!_6c9.is(_6c6.header)){
_6c9=_6c9.parent();
}
}
var _6ca=_6c9[0]==_6c6.active[0];
if(_6c6.running||(_6c6.alwaysOpen&&_6ca)){
return false;
}
if(!_6c9.is(_6c6.header)){
return;
}
_6c6.active.parent().andSelf().toggleClass(_6c6.selectedClass);
if(!_6ca){
_6c9.parent().andSelf().addClass(_6c6.selectedClass);
}
var _6c8=_6c9.next(),_6c7=_6c6.active.next(),data={instance:this,options:_6c6,newHeader:_6c9,oldHeader:_6c6.active,newContent:_6c8,oldContent:_6c7},down=_6c6.headers.index(_6c6.active[0])>_6c6.headers.index(_6c9[0]);
_6c6.active=_6ca?$([]):_6c9;
_6bf.call(this,_6c8,_6c7,data,_6ca,down);
return false;
};
function _6b3(_6cb,_6cc){
return _6cc!=undefined?typeof _6cc=="number"?_6cb.filter(":eq("+_6cc+")"):_6cb.not(_6cb.not(_6cc)):_6cc===false?$([]):_6cb.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_6cd,_6ce){
_6cd=$.extend({easing:"swing",duration:300},_6cd,_6ce);
if(!_6cd.toHide.size()){
_6cd.toShow.animate({height:"show"},_6cd);
return;
}
var _6cf=_6cd.toHide.height(),_6d0=_6cd.toShow.height(),_6d1=_6d0/_6cf;
_6cd.toShow.css({height:0,overflow:"hidden"}).show();
_6cd.toHide.filter(":hidden").each(_6cd.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _6d2=(_6cf-now)*_6d1;
if($.browser.msie||$.browser.opera){
_6d2=Math.ceil(_6d2);
}
_6cd.toShow.height(_6d2);
},duration:_6cd.duration,easing:_6cd.easing,complete:function(){
if(!_6cd.autoheight){
_6cd.toShow.css("height","auto");
}
_6cd.complete();
}});
},bounceslide:function(_6d3){
this.slide(_6d3,{easing:_6d3.down?"bounceout":"swing",duration:_6d3.down?1000:200});
},easeslide:function(_6d4){
this.slide(_6d4,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_6d5,_6d6,wrap,_6d7,_6d8,_6d9,_6da,_6db,_6dc=0,_6dd={},_6de=[],_6df=0,_6e0={},_6e1=[],_6e2=null,_6e3=new Image(),_6e4=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_6e5=/[^\.]\.(swf)\s*$/i,_6e6,_6e7=1,_6e8,_6e9,busy=false,_6ea=20,fx=$.extend($("<div/>")[0],{prop:0}),_6eb=0,_6ec=!$.support.opacity&&!window.XMLHttpRequest,_6ed=function(){
_6d5.hide();
_6e3.onerror=_6e3.onload=null;
if(_6e2){
_6e2.abort();
}
tmp.empty();
},_6ee=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_6ef=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_6f0=function(){
var view=_6ef(),to={},_6f1=_6e0.margin,_6f2=_6e0.autoScale,_6f3=(_6ea+_6f1)*2,_6f4=(_6ea+_6f1)*2,_6f5=(_6e0.padding*2),_6f6;
if(_6e0.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_6e0.width))/100)-(_6ea*2);
_6f2=false;
}else{
to.width=_6e0.width+_6f5;
}
if(_6e0.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_6e0.height))/100)-(_6ea*2);
_6f2=false;
}else{
to.height=_6e0.height+_6f5;
}
if(_6f2&&(to.width>(view[0]-_6f3)||to.height>(view[1]-_6f4))){
if(_6dd.type=="image"||_6dd.type=="swf"){
_6f3+=_6f5;
_6f4+=_6f5;
_6f6=Math.min(Math.min(view[0]-_6f3,_6e0.width)/_6e0.width,Math.min(view[1]-_6f4,_6e0.height)/_6e0.height);
to.width=Math.round(_6f6*(to.width-_6f5))+_6f5;
to.height=Math.round(_6f6*(to.height-_6f5))+_6f5;
}else{
to.width=Math.min(to.width,(view[0]-_6f3));
to.height=Math.min(to.height,(view[1]-_6f4));
}
}
to.top=view[3]+((view[1]-(to.height+(_6ea*2)))*0.5);
if(_6e0.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_6ea*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_6e0.minWidth)+(_6ea*2)))*0.5);
}
if(_6e0.autoScale===false){
to.top=Math.max(view[3]+_6f1,to.top);
to.left=Math.max(view[2]+_6f1,to.left);
}
return to;
},_6f7=function(_6f8){
if(_6f8&&_6f8.length){
switch(_6e0.titlePosition){
case "inside":
return _6f8;
case "over":
return "<span id=\"fancybox-title-over\">"+_6f8+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_6f8+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_6f9=function(){
var _6fa=_6e0.title,_6fb=_6e9.width-(_6e0.padding*2),_6fc="fancybox-title-"+_6e0.titlePosition;
$("#fancybox-title").remove();
_6eb=0;
if(_6e0.titleShow===false){
return;
}
_6fa=$.isFunction(_6e0.titleFormat)?_6e0.titleFormat(_6fa,_6e1,_6df,_6e0):_6f7(_6fa);
if(!_6fa||_6fa===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_6fc+"\" />").css({"width":_6fb,"paddingLeft":_6e0.padding,"paddingRight":_6e0.padding}).html(_6fa).appendTo("body");
switch(_6e0.titlePosition){
case "inside":
_6eb=$("#fancybox-title").outerHeight(true)-_6e0.padding;
_6e9.height+=_6eb;
break;
case "over":
$("#fancybox-title").css("bottom",_6e0.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_6d7).hide();
},_6fd=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_6e0.enableEscapeButton){
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
if(_6e1.length>1){
wrap.bind("mousewheel.fb",function(e,_6fe){
e.preventDefault();
if(busy||_6fe===0){
return;
}
if(_6fe>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_6e0.showNavArrows){
return;
}
if((_6e0.cyclic&&_6e1.length>1)||_6df!==0){
_6da.show();
}
if((_6e0.cyclic&&_6e1.length>1)||_6df!=(_6e1.length-1)){
_6db.show();
}
},_6ff=function(){
var href,_700;
if((_6e1.length-1)>_6df){
href=_6e1[_6df+1].href;
if(typeof href!=="undefined"&&href.match(_6e4)){
_700=new Image();
_700.src=href;
}
}
if(_6df>0){
href=_6e1[_6df-1].href;
if(typeof href!=="undefined"&&href.match(_6e4)){
_700=new Image();
_700.src=href;
}
}
},_701=function(){
_6d8.css("overflow",(_6e0.scrolling=="auto"?(_6e0.type=="image"||_6e0.type=="iframe"||_6e0.type=="swf"?"hidden":"auto"):(_6e0.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_6d8.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_6e0.hideOnContentClick){
_6d8.one("click",$.fancybox.close);
}
if(_6e0.hideOnOverlayClick){
_6d6.one("click",$.fancybox.close);
}
if(_6e0.showCloseButton){
_6d9.show();
}
_6fd();
$(window).bind("resize.fb",$.fancybox.center);
if(_6e0.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_6e0.onComplete)){
_6e0.onComplete(_6e1,_6df,_6e0);
}
busy=false;
_6ff();
},_702=function(pos){
var _703=Math.round(_6e8.width+(_6e9.width-_6e8.width)*pos),_704=Math.round(_6e8.height+(_6e9.height-_6e8.height)*pos),top=Math.round(_6e8.top+(_6e9.top-_6e8.top)*pos),left=Math.round(_6e8.left+(_6e9.left-_6e8.left)*pos);
wrap.css({"width":_703+"px","height":_704+"px","top":top+"px","left":left+"px"});
_703=Math.max(_703-_6e0.padding*2,0);
_704=Math.max(_704-(_6e0.padding*2+(_6eb*pos)),0);
_6d8.css({"width":_703+"px","height":_704+"px"});
if(typeof _6e9.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_705=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_706=function(){
var orig=_6dd.orig?$(_6dd.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_705(orig);
from={width:(pos.width+(_6e0.padding*2)),height:(pos.height+(_6e0.padding*2)),top:(pos.top-_6e0.padding-_6ea),left:(pos.left-_6e0.padding-_6ea)};
}else{
view=_6ef();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_707=function(){
_6d5.hide();
if(wrap.is(":visible")&&$.isFunction(_6e0.onCleanup)){
if(_6e0.onCleanup(_6e1,_6df,_6e0)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_6e1=_6de;
_6df=_6dc;
_6e0=_6dd;
_6d8.get(0).scrollTop=0;
_6d8.get(0).scrollLeft=0;
if(_6e0.overlayShow){
if(_6ec){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_6d6.css({"background-color":_6e0.overlayColor,"opacity":_6e0.overlayOpacity}).unbind().show();
}
_6d8.css("background-color",_6e0.innerColor);
_6e9=_6f0();
_6f9();
if(wrap.is(":visible")){
$(_6d9.add(_6da).add(_6db)).hide();
var pos=wrap.position(),_708;
_6e8={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_708=(_6e8.width==_6e9.width&&_6e8.height==_6e9.height);
_6d8.fadeOut(_6e0.changeFade,function(){
var _709=function(){
_6d8.html(tmp.contents()).fadeIn(_6e0.changeFade,_701);
};
$.event.trigger("fancybox-change");
_6d8.empty().css("overflow","hidden");
if(_708){
_6d8.css({top:_6e0.padding,left:_6e0.padding,width:Math.max(_6e9.width-(_6e0.padding*2),1),height:Math.max(_6e9.height-(_6e0.padding*2)-_6eb,1)});
_709();
}else{
_6d8.css({top:_6e0.padding,left:_6e0.padding,width:Math.max(_6e8.width-(_6e0.padding*2),1),height:Math.max(_6e8.height-(_6e0.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_6e0.changeSpeed,easing:_6e0.easingChange,step:_702,complete:_709});
}
});
return;
}
wrap.css("opacity",1);
if(_6e0.transitionIn=="elastic"){
_6e8=_706();
_6d8.css({top:_6e0.padding,left:_6e0.padding,width:Math.max(_6e8.width-(_6e0.padding*2),1),height:Math.max(_6e8.height-(_6e0.padding*2),1)}).html(tmp.contents());
wrap.css(_6e8).show();
if(_6e0.opacity){
_6e9.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_6e0.speedIn,easing:_6e0.easingIn,step:_702,complete:_701});
}else{
_6d8.css({top:_6e0.padding,left:_6e0.padding,width:Math.max(_6e9.width-(_6e0.padding*2),1),height:Math.max(_6e9.height-(_6e0.padding*2)-_6eb,1)}).html(tmp.contents());
wrap.css(_6e9).fadeIn(_6e0.transitionIn=="none"?0:_6e0.speedIn,_701);
}
},_70a=function(){
tmp.width(_6dd.width);
tmp.height(_6dd.height);
if(_6dd.width=="auto"){
_6dd.width=tmp.width();
}
if(_6dd.height=="auto"){
_6dd.height=tmp.height();
}
_707();
},_70b=function(){
busy=true;
_6dd.width=_6e3.width;
_6dd.height=_6e3.height;
$("<img />").attr({"id":"fancybox-img","src":_6e3.src,"alt":_6dd.title}).appendTo(tmp);
_707();
},_70c=function(){
_6ed();
var obj=_6de[_6dc],href,type,_70d,str,emb,_70e,data;
_6dd=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_6dd:$(obj).data("fancybox")));
_70d=obj.title||$(obj).title||_6dd.title||"";
if(obj.nodeName&&!_6dd.orig){
_6dd.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_70d===""&&_6dd.orig){
_70d=_6dd.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_6dd.href||jq(obj).attr("href")||null;
}else{
href=_6dd.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_6dd.type){
type=_6dd.type;
if(!href){
href=_6dd.content;
}
}else{
if(_6dd.content){
type="html";
}else{
if(href){
if(href.match(_6e4)){
type="image";
}else{
if(href.match(_6e5)){
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
_6dd.type=type;
_6dd.href=href;
_6dd.title=_70d;
if(_6dd.autoDimensions&&_6dd.type!=="iframe"&&_6dd.type!=="swf"){
_6dd.width="auto";
_6dd.height="auto";
}
if(_6dd.modal){
_6dd.overlayShow=true;
_6dd.hideOnOverlayClick=false;
_6dd.hideOnContentClick=false;
_6dd.enableEscapeButton=false;
_6dd.showCloseButton=false;
}
if($.isFunction(_6dd.onStart)){
if(_6dd.onStart(_6de,_6dc,_6dd)===false){
busy=false;
return;
}
}
tmp.css("padding",(_6ea+_6dd.padding+_6dd.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_6d8.children());
});
switch(type){
case "html":
tmp.html(_6dd.content);
_70a();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_6d8.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_70a();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_6e3=new Image();
_6e3.onerror=function(){
_6ee();
};
_6e3.onload=function(){
_6e3.onerror=null;
_6e3.onload=null;
_70b();
};
_6e3.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_6dd.width+"\" height=\""+_6dd.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_6dd.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_6dd.width+"\" height=\""+_6dd.height+"\""+emb+"></embed></object>";
tmp.html(str);
_70a();
break;
case "ajax":
_70e=href.split("#",2);
data=_6dd.ajax.data||{};
if(_70e.length>1){
href=_70e[0];
if(typeof data=="string"){
data+="&selector="+_70e[1];
}else{
data.selector=_70e[1];
}
}
busy=false;
$.fancybox.showActivity();
_6e2=$.ajax($.extend(_6dd.ajax,{url:href,data:data,error:_6ee,success:function(data,_70f,_710){
if(_6e2.status==200){
tmp.html(data);
_70a();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_6dd.scrolling+"\" src=\""+_6dd.href+"\"></iframe>").appendTo(tmp);
_707();
break;
}
},_711=function(){
if(!_6d5.is(":visible")){
clearInterval(_6e6);
return;
}
$("div",_6d5).css("top",(_6e7*-40)+"px");
_6e7=(_6e7+1)%12;
},_712=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_6d5=$("<div id=\"fancybox-loading\"><div></div></div>"),_6d6=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_6d5.addClass("fancybox-ie");
}
_6d7=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_6d7.append(_6d8=$("<div id=\"fancybox-inner\"></div>"),_6d9=$("<a id=\"fancybox-close\"></a>"),_6da=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_6db=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_6d9.click($.fancybox.close);
_6d5.click($.fancybox.cancel);
_6da.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_6db.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_6ec){
_6d6.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_6d5.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_6d7.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_713){
$(this).data("fancybox",$.extend({},_713,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_6de=[];
_6dc=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_6de.push(this);
}else{
_6de=$("a[rel="+rel+"], area[rel="+rel+"]");
_6dc=_6de.index(this);
}
_70c();
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
_6de=[];
_6dc=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_6de=jQuery.merge(_6de,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_6de.push(obj);
}
if(_6dc>_6de.length||_6dc<0){
_6dc=0;
}
_70c();
};
$.fancybox.showActivity=function(){
clearInterval(_6e6);
_6d5.show();
_6e6=setInterval(_711,66);
};
$.fancybox.update=function(rel){
_6de=$("a[rel="+rel+"], area[rel="+rel+"]");
};
$.fancybox.hideActivity=function(){
_6d5.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_6df+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_6df-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_6e1.length>pos){
_6dc=pos;
_70c();
}
if(_6e0.cyclic&&_6e1.length>1&&pos<0){
_6dc=_6e1.length-1;
_70c();
}
if(_6e0.cyclic&&_6e1.length>1&&pos>=_6e1.length){
_6dc=0;
_70c();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_6ed();
if(_6dd&&$.isFunction(_6dd.onCancel)){
_6dd.onCancel(_6de,_6dc,_6dd);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_6e0&&$.isFunction(_6e0.onCleanup)){
if(_6e0.onCleanup(_6e1,_6df,_6e0)===false){
busy=false;
return;
}
}
_6ed();
$(_6d9.add(_6da).add(_6db)).hide();
$("#fancybox-title").remove();
wrap.add(_6d8).add(_6d6).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _714(){
_6d6.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_6d8.empty();
if($.isFunction(_6e0.onClosed)){
_6e0.onClosed(_6e1,_6df,_6e0);
}
_6e1=_6dd=[];
_6df=_6dc=0;
_6e0=_6dd={};
busy=false;
};
_6d8.css("overflow","hidden");
if(_6e0.transitionOut=="elastic"){
_6e8=_706();
var pos=wrap.position();
_6e9={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_6e0.opacity){
_6e9.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_6e0.speedOut,easing:_6e0.easingOut,step:_702,complete:_714});
}else{
wrap.fadeOut(_6e0.transitionOut=="none"?0:_6e0.speedOut,_714);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_6d8.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_6e0.padding*2)+_6eb});
_6d8.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_6ef(),_715=_6e0.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_6eb)+(_6ea*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_6ea*2)))*0.5);
to.top=Math.max(view[3]+_715,to.top);
to.left=Math.max(view[2]+_715,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",innerColor:"inherited",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_712();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_716){
this._container=jQuery(_716);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_717){
};
HubPages.Lightbox.f$=function(_718){
return jQuery(_718,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_719){
return jQuery(_719,this._container);
};
HubPages.Lightbox.MyPhotos=function(_71a){
this._container=jQuery(_71a);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_71b,_71c,_71d){
if(_71b!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_71c.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_71c.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_71c);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_71d<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_71b,_71c,_71d+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_71e){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_71e);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_71f,_720,_721){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_71f[_720]).attr("href");
var _722=href.lastIndexOf("/");
var _723=_722==-1?0:href.slice(_722+1,-4);
this._currentImageId=_723;
jQuery.post("/xml/photos/locations/",{id:_723},jQuery.proxy(function(_724){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_723,_724,0);
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
HubPages.Lightbox.Slideshow=function(_725){
this._id=_725.id;
this._title=_725.title;
this._url=_725.url;
this._type=_725.type;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_725.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_726){
var id=_726.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_726);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_726.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(_727,_728){
var self=this;
if(this._type=="Hub"){
self._start=0;
jQuery.ajax({async:false,data:{id:this._id},dataType:"json",success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
}else{
if(_727===undefined){
self._start=0;
self._limit=10;
}else{
self._start=_727;
self._limit=_728;
}
jQuery.ajax({async:false,data:{userId:this._id,start:self._start,limit:self._limit},dataType:"json",success:function(data){
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
this._fireTracking=true;
this._counter=0;
this._startTime=(new Date()).getTime()/1000;
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
var _729=jQuery("<a />").attr("href","#related_slideshows_"+this._id);
_729.addClass("lightbox").attr("rel","slideshow_"+this._id);
_729.appendTo(this._container);
var _72a=jQuery("<div />").attr("id","related_slideshows_"+this._id);
_72a.addClass("related_slideshows");
if(data.related.length){
_72a.append("<h2>View These Related Slideshows</h2>");
}else{
_72a.append("<h2>This Hub has no related slideshows</h2>");
}
_72a.appendTo(this._container);
var list=jQuery("<ul />");
_72a.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_72a);
}
var _72b=jQuery("<li />");
_72b.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _72c=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),type:"Hub",auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _72d=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_72d);
_72b.append(linkDiv);
_72b.append("<br />");
var _72e=jQuery("<img />").attr("src",item.thumb);
_72e.appendTo(_72c);
_72c.appendTo(_72b);
_72c.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
}
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _72f=jQuery("<div />").addClass("pinit_wrap");
_72f.appendTo(this._socialBar);
var _730=jQuery("<div />").addClass("twitter_wrap");
_730.appendTo(this._socialBar);
var _731=jQuery("<div />").addClass("fb_share_wrap");
_731.appendTo(this._socialBar);
if(this._type=="Hub"){
_730.html(data.social.twitter);
_731.html(data.social.fb_share);
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
HubPages.Lightbox.Slideshow.loadImages=function(_732){
var _733=this._start;
jQuery.each(_732,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({id:"slideshow_img_"+item.id,href:"#"+this._id+"_"+_733,rel:"slideshow_"+this._id,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._id+"_"+_733}).addClass("content");
div.appendTo(this._container);
var _734=jQuery("<div />");
_734.appendTo(div);
var _735=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_735.data("source",item.source);
_735.appendTo(_734);
_733++;
},this));
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_736,_737,_738,_739,_73a){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
if(_73a===undefined){
_73a="Normal";
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_736;
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("20%");
jQuery("body").delegate(_739,"click",function(e){
var _73b=HubPages.Lightbox.Slideshow.defaultHubId,_73c="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
jq("#fancybox-wrap").addClass("slide_image");
if(!HubPages.Lightbox.Slideshow._slides[_73b]){
HubPages.Lightbox.Slideshow.create({id:_73b,title:_737,url:_738,type:_73a});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
if(_73a=="Hub"){
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1"),link=jQuery(_73c+":has(img[src*=\""+id+"\"])"),_73d=jQuery(_73c).index(link);
HubPages.Lightbox.Slideshow._slides[_73b].init();
if(_73d>=0){
jQuery(".slideshow:first > a").eq(_73d).click();
}
}else{
jQuery(".slideshow:first > a").eq(0).click();
}
});
jQuery(window).resize(function(){
if(typeof (_73e)!="undefined"){
clearTimeout(_73e);
}
var _73e=setTimeout(function(){
var _73f=jQuery("#fancybox-inner > div:visible").attr("id");
if(_73f){
jQuery(".slideshow a[href=#"+_73f+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._id);
var _740=this._container.size()==0;
if(_740){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_741,_742){
if(!jQuery("#fancybox-outer-title").length){
var _743=jQuery("<div />").attr("id","fancybox-outer-title");
var _744=jQuery("#fancybox-inner");
_744.before(_743);
}
var _745=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_745);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_746,_747){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
var _748=jq(window).scrollTop();
jQuery.address.value("");
jQuery(window).scrollTop(_748);
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_749,_74a){
var _74b=jQuery(".overlay_image").removeClass("overlay_image").css("visibility","hidden");
_74b.siblings("div").remove();
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_74c,_74d){
jQuery.fancybox.hideActivity();
var _74e=_74d+1;
if(this._type!="Hub"){
if(_74e===1){
jQuery("#fancybox-left").hide();
}else{
if(_74e>1){
jQuery("#fancybox-left").show();
}
}
if(_74e==(_74c.length-1)&&_74c.length<this._photoData.total_images){
this.load(_74c.length,10);
jQuery.fancybox.update("slideshow_"+this._id);
}
}
if(this._type=="Hub"){
if(_74e>=_74c.length){
return;
}
}
var _74f=HubPages.Lightbox.f$("#fancybox-inner");
_74f.height(_74f.height()-70).css("overflow","visible");
var _750=_74f.find("> .content img");
var _751=this._photoData.images[_74d];
if(this._type!="Hub"){
jQuery("#fancybox-outer-title > a").replaceWith(_751.url_title);
}
jq.address.value("slide"+_751.id);
_750.css({width:"auto",height:"auto",maxWidth:(_74f.innerWidth()-60)+"px",maxHeight:(_74f.innerHeight()-100)+"px"});
if(_74f.innerHeight()>0&&_750.height()>0){
var _752=(_74f.innerHeight()-_750.height())/2;
_750.parent().css({width:_750.width(),height:_750.height(),margin:"0px auto",paddingTop:"10px"});
_750.parent().css("margin-top",_752+"px");
_750.css("visibility","visible").addClass("overlay_image");
if(_750.width()>250){
this.loadGoogleAds();
}
}else{
_750.load(function(){
var _753=HubPages.Lightbox.f$("#fancybox-inner");
var _754=_753.find("> .content img");
var _755=(_753.innerHeight()-_754.height())/2;
_754.parent().css({width:_754.width(),height:_754.height(),margin:"0px auto",paddingTop:"10px"});
_754.parent().css("margin-top",_755+"px");
_754.css("visibility","visible").addClass("overlay_image");
if(_754.width()>250){
this.loadGoogleAds();
}
}.bind(this));
}
var _756=jQuery(_74c[_74d]).attr("rel");
var _757=jQuery("#"+_756).find(".content img");
var _758=(new Date()).getTime()/1000;
var _759=_758-this._startTime;
var _75a=this._counter/_759;
if(this._fireTracking&&_759>10&&_75a>1){
this._fireTracking=false;
jQuery.ajax({url:"/xml/reporterror.php",type:"POST",data:{error:"Too many slideshow views! Loaded "+this._counter+" slideshow images in "+_759+" seconds (ratio: "+_75a+")"}});
}
if(this._fireTracking){
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_751.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _75b="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_75b+="&labels="+escape(this._photoData.quantcastLabel);
}
var _75c=new Image();
_75c.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_75b;
}
if(this._photoData.ctracking){
var _75d=new Image();
_75d.src=this._photoData.ctracking+"&"+(new Date()).getTime();
}
this._counter++;
}
var _75e=HubPages.Lightbox.f$("#fancybox-title");
if(_751.sourceUrl||_751.sourceName){
if(_751.sourceUrl){
var _75f="<a href=\""+_751.sourceUrl+"\" target=\"_blank\">"+(_751.sourceName?_751.sourceName:_751.sourceUrl)+"</a>";
}else{
var _75f="<b>"+_751.sourceName+"</b>";
}
_75e.html(_75e.text()+"<br />Source: "+_75f);
}
_75e.find("div.slideshow-counter").remove();
_75e.append(jQuery("<div />").html("Photo "+_74e+" of "+this._photoData.total_images).addClass("slideshow-counter"));
if(this._lastIndex!=_74d&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_751.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_751.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_751.social.pinit){
this._socialBar.find(".pinit_wrap").html(_751.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_74d;
_750.parent("div").after(this._socialBar.show());
};
HubPages.Lightbox.Slideshow.prototype.loadGoogleAds=function(){
};
(function(_760,_761){
var _762=_760.document;
(function(){
var _763=false,_764=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _765=this.prototype;
_763=true;
var _766=new this();
_763=false;
for(var name in prop){
_766[name]=typeof prop[name]=="function"&&typeof _765[name]=="function"&&_764.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_765[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _767(){
if(!_763&&this.init){
this.init.apply(this,arguments);
}
};
_767.prototype=_766;
_767.constructor=_767;
_767.extend=arguments.callee;
return _767;
};
})();
var _768=JRClass.extend({init:function(_769,_76a){
if(typeof _769=="string"){
this.video=_762.getElementById(_769);
}else{
this.video=_769;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _768.options=="object"){
_V_.merge(this.options,_768.options);
}
if(typeof _76a=="object"){
_V_.merge(this.options,_76a);
}
if(this.getPreloadAttribute()!==_761){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_761){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_761){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_76b){
if(this[_76b+"Supported"]()){
this[_76b+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_76c,_76d){
this.behaviors[name]=_76c;
this.extend(_76d);
},activateElement:function(_76e,_76f){
if(typeof _76e=="string"){
_76e=_762.getElementById(_76e);
}
this.behaviors[_76f].call(this,_76e);
},errors:[],warnings:[],warning:function(_770){
this.warnings.push(_770);
this.log(_770);
},history:[],log:function(_771){
if(!_771){
return;
}
if(typeof _771=="string"){
_771={type:_771};
}
if(_771.type){
this.history.push(_771.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_771.type);
}
catch(e){
try{
opera.postError(_771.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_772){
if(!localStorage){
return;
}
try{
localStorage[key]=_772;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_768.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _773=this.video.getAttribute("preload");
if(_773===""||_773==="true"){
return "auto";
}
if(_773==="false"){
return "none";
}
return _773;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _774=this.video.getAttribute("autoplay");
if(_774==="false"){
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
for(var _775 in obj){
if(obj.hasOwnProperty(_775)){
this[_775]=obj[_775];
}
}
}});
_768.player=_768.prototype;
_768.player.extend({flashSupported:function(){
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
var _776=_768.flashPlayers[this.options.flashPlayer];
this.extend(_768.flashPlayers[this.options.flashPlayer].api);
(_776.init.context(this))();
},getFlashElement:function(){
var _777=this.video.children;
for(var i=0,j=_777.length;i<j;i++){
if(_777[i].className=="vjs-flash-fallback"){
return _777[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _778=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_768.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _768.getFlashVersion()>=_778;
}});
_768.flashPlayers={};
_768.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_779){
if(_779!==_761){
this.element.width=_779;
this.box.style.width=_779+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_77a){
if(_77a!==_761){
this.element.height=_77a;
this.box.style.height=_77a+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_768.player.extend({linksSupported:function(){
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
_768.merge=function(obj1,obj2,safe){
for(var _77b in obj2){
if(obj2.hasOwnProperty(_77b)&&(!safe||!obj1.hasOwnProperty(_77b))){
obj1[_77b]=obj2[_77b];
}
}
return obj1;
};
_768.extend=function(obj){
this.merge(this,obj,true);
};
_768.extend({setupAllWhenReady:function(_77c){
_768.options=_77c;
_768.DOMReady(_768.setup);
},DOMReady:function(fn){
_768.addToDOMReady(fn);
},setup:function(_77d,_77e){
var _77f=false,_780=[],_781;
if(!_77d||_77d=="All"){
_77d=_768.getVideoJSTags();
}else{
if(typeof _77d!="object"||_77d.nodeType==1){
_77d=[_77d];
_77f=true;
}
}
for(var i=0;i<_77d.length;i++){
if(typeof _77d[i]=="string"){
_781=_762.getElementById(_77d[i]);
}else{
_781=_77d[i];
}
_780.push(new _768(_781,_77e));
}
return (_77f)?_780[0]:_780;
},getVideoJSTags:function(){
var _782=_762.getElementsByTagName("video"),_783=[],_784;
for(var i=0,j=_782.length;i<j;i++){
_784=_782[i];
if(_784.className.indexOf("video-js")!=-1){
_783.push(_784);
}
}
return _783;
},browserSupportsVideo:function(){
if(typeof _768.videoSupport!="undefined"){
return _768.videoSupport;
}
_768.videoSupport=!!_762.createElement("video").canPlayType;
return _768.videoSupport;
},getFlashVersion:function(){
if(typeof _768.flashVersion!="undefined"){
return _768.flashVersion;
}
var _785=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_785=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _760.ActiveXObject!="undefined"){
try{
var _786=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_786){
_785=parseInt(_786.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_768.flashVersion=_785;
return _768.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _768.isIPhone()||_768.isIPad();
},iOSVersion:function(){
var _787=navigator.userAgent.match(/OS (\d+)_/i);
if(_787&&_787[1]){
return _787[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _788=navigator.userAgent.match(/Android (\d+)\./i);
if(_788&&_788[1]){
return _788[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_768.isIE()){
_762.createElement("video");
}
_760.VideoJS=_760._V_=_768;
_768.player.extend({html5Supported:function(){
if(_768.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_768.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_768.isAndroid()){
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
var _789=this.video.children;
for(var i=0,j=_789.length;i<j;i++){
if(_789[i].tagName.toUpperCase()=="SOURCE"){
var _78a=this.video.canPlayType(_789[i].type)||this.canPlayExt(_789[i].src);
if(_78a=="probably"||_78a=="maybe"){
this.firstPlayableSource=_789[i];
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
var _78b=src.match(/\.([^\.]+)$/);
if(_78b&&_78b[1]){
var ext=_78b[1].toLowerCase();
if(_768.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_768.isIOS()){
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
},playerOnVideoProgress:function(_78c){
this.setBufferedFromProgress(_78c);
},setBufferedFromProgress:function(_78d){
if(_78d.total>0){
var _78e=(_78d.loaded/_78d.total)*this.duration();
if(_78e>this.values.bufferEnd){
this.values.bufferEnd=_78e;
}
}
},iOSInterface:function(){
if(_768.iOSVersion()<4){
this.forceTheSource();
}
if(_768.isIPad()){
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
this.poster=_762.createElement("img");
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
var _78f=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_78f.length;i<j;i++){
if(_78f[i].getAttribute("kind")=="subtitles"&&_78f[i].getAttribute("src")){
this.subtitlesSource=_78f[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_790){
var _791=_790.split("\n"),line="",_792,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_791.length;i++){
line=_V_.trim(_791[i]);
if(line){
_792={id:line,index:this.subtitles.length};
line=_V_.trim(_791[++i]);
time=line.split(" --> ");
_792.start=this.parseSubtitleTime(time[0]);
_792.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_791.length;j++){
line=_V_.trim(_791[++i]);
if(!line){
break;
}
text.push(line);
}
_792.text=text.join("<br/>");
this.subtitles.push(_792);
}
}
},parseSubtitleTime:function(_793){
var _794=_793.split(":"),time=0;
time+=parseFloat(_794[0])*60*60;
time+=parseFloat(_794[1])*60;
var _795=_794[2].split(/\.|,/);
time+=parseFloat(_795[0]);
ms=parseFloat(_795[1]);
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
},currentTime:function(_796){
if(_796!==_761){
try{
this.video.currentTime=_796;
}
catch(e){
this.warning(_768.warnings.videoNotReady);
}
this.values.currentTime=_796;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_761){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _797=this.video.buffered.end(0);
if(_797>this.values.bufferEnd){
this.values.bufferEnd=_797;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_798){
if(_798!==_761){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_798)));
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
},width:function(_799){
if(_799!==_761){
this.video.width=_799;
this.box.style.width=_799+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_79a){
if(_79a!==_761){
this.video.height=_79a;
this.box.style.height=_79a+"px";
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
this.warning(_768.warnings.videoNotReady);
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
this.docOrigOverflow=_762.documentElement.style.overflow;
_V_.addListener(_762,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_760,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_762.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_762.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_760.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_762.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_768.player.newBehavior("player",function(_79b){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_79c){
this.log(_79c);
this.log(this.video.error);
},playerOnVideoPlay:function(_79d){
this.hasPlayed=true;
},playerOnVideoPause:function(_79e){
},playerOnVideoEnded:function(_79f){
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
this.each(this.bufferedListeners,function(_7a0){
(_7a0.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_7a1){
this.each(this.currentTimeListeners,function(_7a2){
(_7a2.context(this))(_7a1||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_7a3){
(_7a3.context(this))();
});
}});
_768.player.newBehavior("mouseOverVideoReporter",function(_7a4){
_V_.addListener(_7a4,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_7a4,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_7a5){
var _7a6=_7a5.relatedTarget;
while(_7a6&&_7a6!==this.box){
_7a6=_7a6.parentNode;
}
if(_7a6!==this.box){
this.hideControlBars();
}
}});
_768.player.newBehavior("box",function(_7a7){
this.positionBox();
_V_.addClass(_7a7,"vjs-paused");
this.activateElement(_7a7,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_768.player.newBehavior("poster",function(_7a8){
this.activateElement(_7a8,"mouseOverVideoReporter");
this.activateElement(_7a8,"playButton");
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
var _7a9=this.video.getElementsByTagName("img");
if(_7a9.length>0){
this.video.poster=_7a9[0].src;
}
}
}});
_768.player.newBehavior("controlBar",function(_7aa){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_7aa);
_V_.addListener(_7aa,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_7aa,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_7ab){
this.mouseIsOverControls=false;
}});
_768.player.newBehavior("playToggle",function(_7ac){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_7ac);
_V_.addListener(_7ac,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_7ad){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_7ae){
this.each(this.elements.playToggles,function(_7af){
_V_.removeClass(_7af,"vjs-paused");
_V_.addClass(_7af,"vjs-playing");
});
},playTogglesOnPause:function(_7b0){
this.each(this.elements.playToggles,function(_7b1){
_V_.removeClass(_7b1,"vjs-playing");
_V_.addClass(_7b1,"vjs-paused");
});
}});
_768.player.newBehavior("playButton",function(_7b2){
_V_.addListener(_7b2,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_7b3){
this.play();
}});
_768.player.newBehavior("pauseButton",function(_7b4){
_V_.addListener(_7b4,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_7b5){
this.pause();
}});
_768.player.newBehavior("playProgressBar",function(_7b6){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_7b6);
},{updatePlayProgressBars:function(_7b7){
var _7b8=(_7b7!==_761)?_7b7/this.duration():this.currentTime()/this.duration();
if(isNaN(_7b8)){
_7b8=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_7b8*100,2)+"%";
}
});
}});
_768.player.newBehavior("loadProgressBar",function(_7b9){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_7b9);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_768.player.newBehavior("currentTimeDisplay",function(_7ba){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_7ba);
},{updateCurrentTimeDisplays:function(_7bb){
if(!this.currentTimeDisplays){
return;
}
var time=(_7bb)?_7bb:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_768.player.newBehavior("durationDisplay",function(_7bc){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_7bc);
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
_768.player.newBehavior("currentTimeScrubber",function(_7bd){
_V_.addListener(_7bd,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_7be,_7bf){
_7be.preventDefault();
this.currentScrubber=_7bf;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_7be);
_V_.addListener(_762,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_762,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_7c0){
this.setCurrentTimeWithScrubber(_7c0);
},onCurrentTimeScrubberMouseUp:function(_7c1){
_V_.unblockTextSelection();
_762.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_762.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_7c2){
var _7c3=_V_.getRelativePosition(_7c2.pageX,this.currentScrubber);
var _7c4=_7c3*this.duration();
this.triggerCurrentTimeListeners(0,_7c4);
if(_7c4==this.duration()){
_7c4=_7c4-0.1;
}
this.currentTime(_7c4);
}});
_768.player.newBehavior("volumeDisplay",function(_7c5){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_7c5);
this.updateVolumeDisplay(_7c5);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_7c6){
var _7c7=Math.ceil(this.volume()*6);
this.each(_7c6.children,function(_7c8,num){
if(num<_7c7){
_V_.addClass(_7c8,"vjs-volume-level-on");
}else{
_V_.removeClass(_7c8,"vjs-volume-level-on");
}
});
}});
_768.player.newBehavior("volumeScrubber",function(_7c9){
_V_.addListener(_7c9,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_7ca,_7cb){
_V_.blockTextSelection();
this.currentScrubber=_7cb;
this.setVolumeWithScrubber(_7ca);
_V_.addListener(_762,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_762,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_7cc){
this.setVolumeWithScrubber(_7cc);
},onVolumeScrubberMouseUp:function(_7cd){
this.setVolumeWithScrubber(_7cd);
_V_.unblockTextSelection();
_762.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_762.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_7ce){
var _7cf=_V_.getRelativePosition(_7ce.pageX,this.currentScrubber);
this.volume(_7cf);
}});
_768.player.newBehavior("fullscreenToggle",function(_7d0){
_V_.addListener(_7d0,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_7d1){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_7d2){
this.positionControlBars();
},fullscreenOnEscKey:function(_7d3){
if(_7d3.keyCode==27){
this.exitFullScreen();
}
}});
_768.player.newBehavior("bigPlayButton",function(_7d4){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_7d4);
this.activateElement(_7d4,"playButton");
},{bigPlayButtonsOnPlay:function(_7d5){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_7d6){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_7d7){
_7d7.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_7d8){
_7d8.style.display="none";
});
}});
_768.player.newBehavior("spinner",function(_7d9){
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
this.spinners.push(_7d9);
},{showSpinners:function(){
this.each(this.spinners,function(_7da){
_7da.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_7db){
_7db.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_7dc){
_7dc.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_7dc.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_7dd){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_7de){
this.showSpinners();
},spinnersOnVideoSeeking:function(_7df){
},spinnersOnVideoSeeked:function(_7e0){
},spinnersOnVideoCanPlay:function(_7e1){
},spinnersOnVideoCanPlayThrough:function(_7e2){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_7e3){
this.showSpinners();
},spinnersOnVideoStalled:function(_7e4){
},spinnersOnVideoSuspend:function(_7e5){
},spinnersOnVideoPlaying:function(_7e6){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_7e7){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_768.player.newBehavior("subtitlesDisplay",function(_7e8){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_7e8);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _7e9=false,_7ea=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_7ea)?1:0;
while(true){
if(_7ea){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_7e9=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_7e9=i;
break;
}
i++;
}
}
if(_7e9!==false){
this.currentSubtitle=this.subtitles[_7e9];
this.lastSubtitleIndex=_7e9;
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
_768.extend({addClass:function(_7eb,_7ec){
if((" "+_7eb.className+" ").indexOf(" "+_7ec+" ")==-1){
_7eb.className=_7eb.className===""?_7ec:_7eb.className+" "+_7ec;
}
},removeClass:function(_7ed,_7ee){
if(_7ed.className.indexOf(_7ee)==-1){
return;
}
var _7ef=_7ed.className.split(/\s+/);
_7ef.splice(_7ef.lastIndexOf(_7ee),1);
_7ed.className=_7ef.join(" ");
},createElement:function(_7f0,_7f1){
return this.merge(_762.createElement(_7f0),_7f1);
},blockTextSelection:function(){
_762.body.focus();
_762.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_762.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _7f2=Math.round(secs);
var _7f3=Math.floor(_7f2/60);
_7f3=(_7f3>=10)?_7f3:"0"+_7f3;
_7f2=Math.floor(_7f2%60);
_7f2=(_7f2>=10)?_7f2:"0"+_7f2;
return _7f3+":"+_7f2;
},getRelativePosition:function(x,_7f4){
return Math.max(0,Math.min(1,(x-this.findPosX(_7f4))/_7f4.offsetWidth));
},findPosX:function(obj){
var _7f5=obj.offsetLeft;
while(obj=obj.offsetParent){
_7f5+=obj.offsetLeft;
}
return _7f5;
},getComputedStyleValue:function(_7f6,_7f7){
return _760.getComputedStyle(_7f6,null).getPropertyValue(_7f7);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_7f8,type,_7f9){
if(_7f8.addEventListener){
_7f8.addEventListener(type,_7f9,false);
}else{
if(_7f8.attachEvent){
_7f8.attachEvent("on"+type,_7f9);
}
}
},removeListener:function(_7fa,type,_7fb){
if(_7fa.removeEventListener){
_7fa.removeEventListener(type,_7fb,false);
}else{
if(_7fa.attachEvent){
_7fa.detachEvent("on"+type,_7fb);
}
}
},get:function(url,_7fc){
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
var _7fd=new XMLHttpRequest();
_7fd.open("GET",url);
_7fd.onreadystatechange=function(){
if(_7fd.readyState==4&&_7fd.status==200){
_7fc(_7fd.responseText);
}
}.context(this);
_7fd.send();
},trim:function(_7fe){
return _7fe.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_762.readyState==="complete"){
return _768.onDOMReady();
}
if(_762.addEventListener){
_762.addEventListener("DOMContentLoaded",_768.DOMContentLoaded,false);
_760.addEventListener("load",_768.onDOMReady,false);
}else{
if(_762.attachEvent){
_762.attachEvent("onreadystatechange",_768.DOMContentLoaded);
_760.attachEvent("onload",_768.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_762.addEventListener){
_762.removeEventListener("DOMContentLoaded",_768.DOMContentLoaded,false);
_768.onDOMReady();
}else{
if(_762.attachEvent){
if(_762.readyState==="complete"){
_762.detachEvent("onreadystatechange",_768.DOMContentLoaded);
_768.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_768.DOMIsReady){
fn.call(_762);
}else{
_768.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_768.DOMIsReady){
return;
}
if(!_762.body){
return setTimeout(_768.onDOMReady,13);
}
_768.DOMIsReady=true;
if(_768.DOMReadyList){
for(var i=0;i<_768.DOMReadyList.length;i++){
_768.DOMReadyList[i].call(_762);
}
_768.DOMReadyList=null;
}
}});
_768.bindDOMReady();
Function.prototype.context=function(obj){
var _7ff=this,temp=function(){
return _7ff.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _800=this,temp=function(){
var _801=this;
return _800.call(obj,arguments[0],_801);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_802){
if(this.hasContext===true){
return this;
}
if(!_802){
_802=obj;
}
for(var _803 in _802){
if(_802[_803]==this){
_802[_803]=this.evtContext(obj);
_802[_803].hasContext=true;
return _802[_803];
}
}
return this.evtContext(obj);
};
if(_760.jQuery){
(function($){
$.fn.VideoJS=function(_804){
this.each(function(){
_768.setup(this,_804);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_760.VideoJS=_760._V_=_768;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_805){
var _806=((_805/15)|0)*15;
if(this.lastLoggedOffset!=_806&&!this.paused()){
var _807=this.video.id.replace("hp_video_","");
var _808=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_806,videoId:_807,rf:rf,isEmbed:_808}});
this.lastLoggedOffset=_806;
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
var _809=this.video.getAttribute("autostart");
if(_809==="false"){
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
var _80a=document.createElement("div");
_80a.style.height=videoTopAdjustment+"px";
_80a.style.background="transparent";
_80a.id="video_spacer";
v.before(_80a);
}
var _80b=v.offset()["top"]+v.outerHeight();
var _80c=_80b-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_80c>0){
var _80d=document.createElement("div");
_80d.style.height=_80c+"px";
_80d.style.background="transparent";
_80d.id="sidebar_spacer";
_80d.className="sidebar_box";
sidebox.after(_80d);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_80e,_80f,_810,exts){
jQuery(document).ready(function(){
var _811=0;
var _812={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_80e},size_limit:_810,queue_limit:_80f,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_813){
if(file.size==_813){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_814){
try{
var data=JSONstring.toObject(_814);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_814);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_811+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_815){
if(!_811&&_815){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_811=0;
},loaded_callback:function(_816){
if(_816){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _817=new imageUploader(_812);
});
};
function getHPVideoPlayer(){
var _818="talkiesplayer";
return $(_818);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _819=true;
if(data.percent){
var _81a=data.percent;
jq("#progress_video_"+vId).width(_81a+"%");
if(_81a>90){
_819=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_819){
setTimeout(function(){
updateVideoProcessingBar(vId,mId);
},5000);
}
}});
};
if(window.jQuery){
(function($){
if($.browser.msie){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
$.fn.rating=function(_81b){
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
var _81b=$.extend({},$.fn.rating.options,_81b||{});
$.fn.rating.calls++;
this.not(".star-rating-applied").addClass("star-rating-applied").each(function(){
var _81c,_81d=$(this);
var eid=(this.name||"unnamed-rating").replace(/\[|\]/g,"_").replace(/^\_+|\_+$/g,"");
var _81e=$(this.form||document.body);
var _81f=_81e.data("rating");
if(!_81f||_81f.call!=$.fn.rating.calls){
_81f={count:0,call:$.fn.rating.calls};
}
var _820=_81f[eid];
if(_820){
_81c=_820.data("rating");
}
if(_820&&_81c){
_81c.count++;
}else{
_81c=$.extend({},_81b||{},($.metadata?_81d.metadata():($.meta?_81d.data():null))||{},{count:0,stars:[],inputs:[]});
_81c.serial=_81f.count++;
_820=$("<span class=\"star-rating-control\"/>");
_81d.before(_820);
_820.addClass("rating-to-be-drawn");
if(_81d.attr("disabled")||_81d.hasClass("disabled")){
_81c.readOnly=true;
}
if(_81d.hasClass("required")){
_81c.required=true;
}
_820.append(_81c.cancel=$("<div class=\"rating-cancel\"><a title=\""+_81c.cancel+"\">"+_81c.cancelValue+"</a></div>").mouseover(function(){
$(this).rating("drain");
$(this).addClass("star-rating-hover");
}).mouseout(function(){
$(this).rating("draw");
$(this).removeClass("star-rating-hover");
}).click(function(){
$(this).rating("select");
}).data("rating",_81c));
}
var star=$("<div class=\"star-rating rater-"+_81c.serial+"\"><a title=\""+(this.title||this.value)+"\">"+this.value+"</a></div>");
_820.append(star);
if(this.id){
star.attr("id",this.id);
}
if(this.className){
star.addClass(this.className);
}
if(_81c.half){
_81c.split=2;
}
if(typeof _81c.split=="number"&&_81c.split>0){
var stw=($.fn.width?star.width():0)||_81c.starWidth;
var spi=(_81c.count%_81c.split),spw=Math.floor(stw/_81c.split);
star.width(spw).find("a").css({"margin-left":"-"+(spi*spw)+"px"});
}
if(_81c.readOnly){
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
_81c.current=star;
}
if(this.nodeName=="A"){
if($(this).hasClass("selected")){
_81c.current=star;
}
}
_81d.hide();
_81d.change(function(){
$(this).rating("select");
});
star.data("rating.input",_81d.data("rating.star",star));
_81c.stars[_81c.stars.length]=star[0];
_81c.inputs[_81c.inputs.length]=_81d[0];
_81c.rater=_81f[eid]=_820;
_81c.context=_81e;
_81d.data("rating",_81c);
_820.data("rating",_81c);
star.data("rating",_81c);
_81e.data("rating",_81f);
});
$(".rating-to-be-drawn").rating("draw").removeClass("rating-to-be-drawn");
return this;
};
$.extend($.fn.rating,{calls:0,focus:function(){
var _821=this.data("rating");
if(!_821){
return this;
}
if(!_821.focus){
return this;
}
var _822=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_821.focus){
_821.focus.apply(_822[0],[_822.val(),$("a",_822.data("rating.star"))[0]]);
}
},blur:function(){
var _823=this.data("rating");
if(!_823){
return this;
}
if(!_823.blur){
return this;
}
var _824=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_823.blur){
_823.blur.apply(_824[0],[_824.val(),$("a",_824.data("rating.star"))[0]]);
}
},fill:function(){
var _825=this.data("rating");
if(!_825){
return this;
}
if(_825.readOnly){
return;
}
this.rating("drain");
this.prevAll().andSelf().filter(".rater-"+_825.serial).addClass("star-rating-hover");
},drain:function(){
var _826=this.data("rating");
if(!_826){
return this;
}
if(_826.readOnly){
return;
}
_826.rater.children().filter(".rater-"+_826.serial).removeClass("star-rating-on").removeClass("star-rating-hover");
},draw:function(){
var _827=this.data("rating");
if(!_827){
return this;
}
this.rating("drain");
if(_827.current){
_827.current.data("rating.input").attr("checked","checked");
_827.current.prevAll().andSelf().filter(".rater-"+_827.serial).addClass("star-rating-on");
}else{
$(_827.inputs).removeAttr("checked");
}
_827.cancel[_827.readOnly||_827.required?"hide":"show"]();
this.siblings()[_827.readOnly?"addClass":"removeClass"]("star-rating-readonly");
},select:function(_828,_829){
var _82a=this.data("rating");
if(!_82a){
return this;
}
if(_82a.readOnly){
return;
}
_82a.current=null;
if(typeof _828!="undefined"){
if(typeof _828=="number"){
return $(_82a.stars[_828]).rating("select",undefined,_829);
}
if(typeof _828=="string"){
$.each(_82a.stars,function(){
if($(this).data("rating.input").val()==_828){
$(this).rating("select",undefined,_829);
}
});
}
}else{
_82a.current=this[0].tagName=="INPUT"?this.data("rating.star"):(this.is(".rater-"+_82a.serial)?this:null);
}
this.data("rating",_82a);
this.rating("draw");
var _82b=$(_82a.current?_82a.current.data("rating.input"):null);
if((_829||_829==undefined)&&_82a.callback){
_82a.callback.apply(_82b[0],[_82b.val(),$("a",_82a.current)[0]]);
}
},readOnly:function(_82c,_82d){
var _82e=this.data("rating");
if(!_82e){
return this;
}
_82e.readOnly=_82c||_82c==undefined?true:false;
if(_82d){
$(_82e.inputs).attr("disabled","disabled");
}else{
$(_82e.inputs).removeAttr("disabled");
}
this.data("rating",_82e);
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
(function($){
var _82f,_830;
function _831(elt,_832){
var _833=jq("#creative").is(":checked")?"cw_":"";
var _834=_833+jq(elt).attr("id")+"_"+_832;
var _835=jq("#"+_834);
if(0==_835.size()){
var expl;
if(0==_832){
expl="Please choose a rating.";
}else{
if(_832%2==0){
expl="Explanation coming soon.";
}else{
if(1==_832){
expl="Does not even deserve a 2.";
}else{
var _836=_832-1;
var _837=_832+1;
var _838=_836==8?"an":"a";
var _839=_837==8?"an":"a";
expl="Exhibits characteristics between "+_838+" "+_836+" and "+_839+" "+_837+".";
}
}
}
var _83a="explain_"+jq(elt).attr("id");
_835=jq("<div id=\""+_834+"\" class=\"rate_explain "+_83a+"\"><p>"+expl+"</p></div>").insertAfter("#default_explain");
}
jq(".rate_explain").hide();
_835.show();
};
var _83b={init:function(_83c){
_830=this;
_82f=$.extend({reason:false,showExplanations:true,toggleExplanations:true,detailedExplanations:true,onsubmit:false,singleSlider:false},_83c);
if(_82f.reason){
jq("#rating_submit").parent().before("<div id=\"rating_reason\">"+"<label for=\"reason\">Reasons for ratings:</label>"+"<textarea id=\"reason\"></textarea>"+"</div>");
}
if(_82f.toggleExplanations){
jq("#hop_explain").after("<div id=\"hideshow\">"+"<a id=\"hide_explanation\" href=\"#\">hide explanations</a>"+"<a id=\"show_explanation\" style=\"display: none;\" href=\"#\">show explanations</a>"+"</div>");
jq("#hide_explanation").click(function(){
jq("#hop_explain").hide();
jq("#show_explanation").show();
jq("#hide_explanation").hide();
return false;
});
jq("#show_explanation").click(function(){
jq("#hop_explain").show();
jq("#show_explanation").hide();
jq("#hide_explanation").show();
return false;
});
}
jq("#creative").click(function(){
jq(".hub_rating_slider").slider("value",0);
jq(".rate_explain").hide();
jq("#default_explain").show();
if(jq("#creative").is(":checked")){
jq("#substance").prev().children("span").text("Style and Voice");
}else{
jq("#substance").prev().children("span").text("Substance");
}
});
jq("#close_hub_rating").click(function(){
jq(_830).slideUp(800,function(){
if(!jq(_830).data("rated")){
jq("#open_hub_rating").fadeIn();
}
});
return false;
});
jq("#open_hub_rating").click(function(){
jq(_830).find(".rate_explain").hide();
jq("#default_explain").show();
jq(this).hide();
jq(_830).slideDown(1000);
return false;
});
jq(".hub_rating_slider").slider({min:0,max:10,step:1,value:0,range:"min",slide:function(_83d,ui){
var _83e=ui.value==0?"?":ui.value;
jq(_83d.target).prev(".head_two").children("strong").text(_83e);
if(_82f.showExplanations){
_831(_83d.target,_82f.detailedExplanations?ui.value:0);
}
},change:function(_83f,ui){
var _840=ui.value==0?"?":ui.value;
jq(_83f.target).prev(".head_two").children("strong").text(_840);
}}).mouseenter(function(_841){
if(_82f.showExplanations){
_831(_841.currentTarget,_82f.detailedExplanations?jq(_841.currentTarget).slider("value"):0);
}
});
if(_82f.showExplanations&&!_82f.detailedExplanations){
jq(".hub_rating_slider").mouseleave(function(_842){
jq(".rate_explain").hide();
jq("#default_explain").show();
});
}
jq("#rating_submit").click(function(){
var d=new Date();
if(!jq(this).data("lock")||jq(this).data("lock")<d.getTime()-4000){
jq(this).data("lock",d.getTime());
var _843={isCreative:jq("#creative").is(":checked")?1:0,substance:jq("#substance").size()?jq("#substance").slider("value"):0,organization:jq("#organization").size()?jq("#organization").slider("value"):0,mechanics:jq("#mechanics").size()?jq("#mechanics").slider("value"):0,quality:jq("#quality").size()?jq("#quality").slider("value"):0,reason:jq.trim(jq("#reason").val())};
if(!_82f.singleSlider&&(0==_843.substance||0==_843.organization||0==_843.mechanics)){
alert(_843.isCreative?_82f.creativeRatingMissingMessage:_82f.ratingMissingMessage);
return false;
}else{
if(_82f.singleSlider&&0==_843.quality){
alert(_82f.ratingMissingMessage);
return false;
}else{
if(_82f.reason&&!_843.reason){
alert(_82f.reasonMissingMessage);
return false;
}
}
}
jq(_830).data("rated",true);
if(typeof _82f.onsubmit=="function"){
_82f.onsubmit.apply(_830,[_843]);
}
}else{
}
return false;
});
return this;
},clear:function(){
jq("#creative").attr("checked",false);
jq("#substance").prev().children("span").text("Substance");
jq(".hub_rating_slider").slider("value",0);
jq(".rate_explain").hide();
jq("#default_explain").show();
jq("#reason").val("");
jq(".slider_set, #rating_reason, #rate_hub").show();
return this;
}};
$.fn.hubrating=function(_844){
if(_83b[_844]){
return _83b[_844].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _844==="object"||!_844){
return _83b.init.apply(this,arguments);
}else{
$.error("Method "+_844+" does not exist on jQuery.hubrating");
}
}
};
})(jQuery);
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
function _845(){
var _846="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _847="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _848="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_846),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_848),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_847),"gm"),css:"keyword bold"}];
};
_845.prototype=new SyntaxHighlighter.Highlighter();
_845.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_845;
typeof (exports)!="undefined"?exports.Brush=_845:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _849(){
var _84a="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _84b(_84c,_84d){
var css=(_84c[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_84c[0],_84c.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_84b},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_84a),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_849.prototype=new SyntaxHighlighter.Highlighter();
_849.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_849;
typeof (exports)!="undefined"?exports.Brush=_849:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _84e(){
function _84f(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _850(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _851="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _852="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _853="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_84f(_851),"gm"),css:"keyword"},{regex:new RegExp(_850(_852),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_853),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_84e.prototype=new SyntaxHighlighter.Highlighter();
_84e.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_84e;
typeof (exports)!="undefined"?exports.Brush=_84e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _854(){
var _855="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_855),"gmi"),css:"keyword"}];
};
_854.prototype=new SyntaxHighlighter.Highlighter();
_854.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_854;
typeof (exports)!="undefined"?exports.Brush=_854:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _856(){
function _857(_858,_859){
var _85a=SyntaxHighlighter.Match,code=_858[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_85b=[];
if(_858.attributes!=null){
var _85c,_85d=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_85c=_85d.exec(code))!=null){
_85b.push(new _85a(_85c.name,_858.index+_85c.index,"color1"));
_85b.push(new _85a(_85c.value,_858.index+_85c.index+_85c[0].indexOf(_85c.value),"string"));
}
}
if(tag!=null){
_85b.push(new _85a(tag.name,_858.index+tag[0].indexOf(tag.name),"keyword"));
}
return _85b;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_857}];
};
_856.prototype=new SyntaxHighlighter.Highlighter();
_856.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_856;
typeof (exports)!="undefined"?exports.Brush=_856:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _85e(){
var _85f="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_85f),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_85e.prototype=new SyntaxHighlighter.Highlighter();
_85e.aliases=["java"];
SyntaxHighlighter.brushes.Java=_85e;
typeof (exports)!="undefined"?exports.Brush=_85e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _860(){
var _861="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_861),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_860.prototype=new SyntaxHighlighter.Highlighter();
_860.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_860;
typeof (exports)!="undefined"?exports.Brush=_860:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _862(){
var _863="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _864="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _865="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_863),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_865),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_864),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_862.prototype=new SyntaxHighlighter.Highlighter();
_862.aliases=["php"];
SyntaxHighlighter.brushes.Php=_862;
typeof (exports)!="undefined"?exports.Brush=_862:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _866(){
var _867="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _868="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _869="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_868),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_867),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_869),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_866.prototype=new SyntaxHighlighter.Highlighter();
_866.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_866;
typeof (exports)!="undefined"?exports.Brush=_866:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _86a(){
var _86b="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _86c="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_86b),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_86c),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_86a.prototype=new SyntaxHighlighter.Highlighter();
_86a.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_86a;
typeof (exports)!="undefined"?exports.Brush=_86a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _86d(){
var _86e="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _86f="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _870="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_86e),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_870),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_86f),"gmi"),css:"keyword"}];
};
_86d.prototype=new SyntaxHighlighter.Highlighter();
_86d.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_86d;
typeof (exports)!="undefined"?exports.Brush=_86d:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _871(){
var _872="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_872),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_871.prototype=new SyntaxHighlighter.Highlighter();
_871.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_871;
typeof (exports)!="undefined"?exports.Brush=_871:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _873(){
function _874(_875,_876){
var _877=SyntaxHighlighter.Match,code=_875[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_878=[];
if(_875.attributes!=null){
var _879,_87a=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_879=_87a.exec(code))!=null){
_878.push(new _877(_879.name,_875.index+_879.index,"color1"));
_878.push(new _877(_879.value,_875.index+_879.index+_879[0].indexOf(_879.value),"string"));
}
}
if(tag!=null){
_878.push(new _877(tag.name,_875.index+tag[0].indexOf(tag.name),"keyword"));
}
return _878;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_874}];
};
_873.prototype=new SyntaxHighlighter.Highlighter();
_873.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_873;
typeof (exports)!="undefined"?exports.Brush=_873:null;
})();
function ClojureRegExp(_87b){
_87b=_87b+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_87b,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _87c,_87d;
while(_87c=this.regex.exec(str)){
_87d=str.substring(0,_87c.index);
if(this.lookBehind.test(_87d)){
return _87c;
}else{
this.regex.lastIndex=_87c.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _87e=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_87f="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_880){
_880=_880.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_880=_880.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_880+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_87e)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_87f)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _881(){
var _882="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _883="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_882),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_883),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_881.prototype=new SyntaxHighlighter.Highlighter();
_881.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_881;
typeof (exports)!="undefined"?exports.Brush=_881:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _884(){
var _885="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _886="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_885),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_886),"gm"),css:"functions"}];
};
_884.prototype=new SyntaxHighlighter.Highlighter();
_884.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_884;
typeof (exports)!="undefined"?exports.Brush=_884:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _887(){
var _888="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_888),"gm"),css:"keyword"}];
};
_887.prototype=new SyntaxHighlighter.Highlighter();
_887.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_887;
typeof (exports)!="undefined"?exports.Brush=_887:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _889(){
var _88a="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _88b="void boolean byte char short int long float double";
var _88c="null";
var _88d="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_88a),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_88b),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_88c),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_88d),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_889.prototype=new SyntaxHighlighter.Highlighter();
_889.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_889;
typeof (exports)!="undefined"?exports.Brush=_889:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _88e(){
var _88f="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _890="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_88f),"gm"),css:"keyword"},{regex:new RegExp(_890,"gm"),css:"keyword"}];
};
_88e.prototype=new SyntaxHighlighter.Highlighter();
_88e.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_88e;
typeof (exports)!="undefined"?exports.Brush=_88e:null;
})();
(function($){
$.fn.starrating=function(_891){
var _891=$.extend({},$.fn.starrating.options,_891||{});
return this.each(function(){
var o=$.meta?$.extend({},_891,$this.data()):_891;
var url=this.action,_892,_893,_894;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _895=div.find("div.star");
var _896=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_895.mouseover(_897).focus(_897).mouseout(_898).blur(_898).click(_899);
_896.mouseover(_89a).focus(_89a).mouseout(_89b).blur(_89b).click(_899);
}else{
_89c(div);
}
_89d();
function init(elem){
_892=$(elem).attr("title").split(/:\s*/)[1],_893=_892.split(".")[0],_894=_892.split(".")[1];
};
function _897(){
_89e();
fill(this);
};
function _898(){
_89e();
_89d();
};
function _89b(){
_89d();
$(this).removeClass("on");
};
function _89a(){
_89e();
$(this).addClass("on");
};
function _89c(elem){
_895.unbind();
_896.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _89f=$(this).attr("title");
var _8a0="Average Rating: "+_892;
$(this).attr("title",_89f.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_8a0).replace("Cancel Rating",_8a0));
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
function _899(){
if(_895.index(this)==-1&&!o.cancelSubmit){
return false;
}
_893=_895.index(this)+1;
_894=0;
if(_893==0){
_89e();
}
var _8a1=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_8a1},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _8a2=$("div."+o.ratingClass);
init(_8a2);
_898();
if(o.disableOnSubmit){
_89c(_8a2);
}
}});
}else{
o.success(_8a1);
}
return false;
};
function fill(elem){
_895.find("a").css("width","100%");
$(_895[_895.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _89e(){
_895.removeClass("on hover");
};
function _89d(){
$(_895[_893-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _8a3=_894?_894*10:0;
if(_8a3>0){
$(_895[_893]).addClass("on").children("a").css("width",_8a3+"%");
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
function initializeProfilePage(){
var _8a4="<span class=\"read_more\">+ More</span>";
function _8a5(){
jq(this).find("span.details").css({display:"inline"});
};
jq("body.newprofile #profile_header div.bio_container").expander({slicePoint:450,widow:8,expandText:_8a4,userCollapseText:"",expandSpeed:0,afterExpand:_8a5});
jq(".contentitem_listing.text_content > li").each(function(i,el){
el=jq(el);
var _8a6=el.find("h3").first();
if(_8a6.height()>100){
el.addClass("smaller");
}
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
}
};
var ProfileManager=function(_8a7,_8a8,_8a9,_8aa,_8ab){
this.userId=_8a7;
this.userName=_8a8;
this.loggedInUserId=_8a9;
this.currentSection="mycontent";
this.defaultTab="hubs_items";
this.containerSectionDiv=jq("#profile_content_container");
this.profileContainer=_8aa;
this.loadMoreBtn=this.profileContainer.find("#load_more_btn");
this.spinnerDiv=_8ab;
this.allowedSections=["mycontent","activity","followers","following","fanmail","email","bio"];
this.moreRequest=this.profileContainer.data("moreRequest");
this.moreTopic=this.profileContainer.data("moreTopic");
this.moreArticle=this.profileContainer.data("moreArticle");
this.bindEvents();
HubPages.Lightbox.Slideshow.init(this.userId,"","","ul.profile_links > li.recent_images");
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
jq("#pagination").hide();
var _8ac=window.location.href,hash=window.location.hash;
if(window.location.href.match(/filter=|page=/)){
if(hash){
parent.location.href=_8ac.match(/^.*new/)[0]+hash;
}else{
parent.location.href=_8ac.match(/^.*new/)[0];
}
}
if(hash){
this.loadSectionByHashTag(hash);
}else{
var _8ad=this.activateAvailableTag(this.defaultTab);
("undefined"!=typeof content_items)?content_items.activate(_8ad):false;
this.showLoadMoreButton();
ProfileManager.prototype.applyMasonry(jq("#content_"+this.defaultTab+">.contentitem_listing"));
}
jq("div.categoryTeaser").each(function(){
var _8ae=jq(this).find("img"),_8af=_8ae.height(),_8b0=_8ae.width(),_8b1=300,_8b2=240,_8b3=_8af/_8b0,_8b4=_8b2/_8b1,_8b5=_8b1,_8b6=_8b2;
if(_8b3<_8b4){
_8b5=_8b0/_8af*_8b2;
}else{
if(_8b3>_8b4){
_8b6=_8af/_8b0*_8b1;
}
}
_8ae.css({"position":"relative","height":_8b6+"px","width":_8b5+"px"});
var _8b7=((_8ae.height()-_8b2)*0.4)*-1,_8b8=((_8ae.width()-_8b1)/2)*-1;
_8ae.css({"top":_8b7+"px","left":_8b8+"px"});
});
};
ProfileManager.prototype.activateAvailableTag=function(_8b9){
if(jq("#"+_8b9+"_item").length>0){
return _8b9;
}else{
var _8ba=jq("#section_mycontent > div.content_items > ul.content_list:parent");
if(_8ba.length>0){
return _8ba.parent().attr("id").replace(/content_/,"");
}
}
};
ProfileManager.prototype.destroyMasonry=function(dest){
dest.masonry("destroy");
};
ProfileManager.prototype.applyMasonry=function(dest){
if(dest.hasClass("masonry")){
}else{
if(!dest.is(":visible")){
}else{
dest.masonry({itemSelector:"li",columnWidth:300,gutterWidth:10});
}
}
};
ProfileManager.prototype.showLoadMoreButton=function(){
var _8bb=this.containerSectionDiv.find("> div:visible");
switch(this.currentSection){
case "mycontent":
var _8bc=jq(".content_nav ul#tabs li.active");
if(_8bc.length>0){
var _8bd=_8bc.attr("id").replace(/_items_item/,"");
if(this.moreContent(_8bd)){
if(!_8bb.find("div.content_items:visible").first().data("no_content")){
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
if(!_8bb.find("#following_people").data("no_content")||!_8bb.find("#following_topics").data("no_content")){
_8bb.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
break;
default:
if(this.currentSection!="activity"){
var _8be=this.getDivSection(this.currentSection);
if(!_8be.data("no_content")){
_8bb.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}
}
};
ProfileManager.prototype.loadSectionByHashTag=function(_8bf){
if(_8bf){
var _8c0=_8bf.replace("#",""),_8c1=this.defaultTab,_8c2="";
if(_8c0.match(/^slide/)){
jq("ul.profile_links > li.recent_images").trigger("click");
}else{
if(_8c0.match(/^mycontent_.*_hubs$/)||_8c0.match(/^mycontent_.*_forums$/)||_8c0.match(/^mycontent_.*_answers$/)){
var _8c3=_8c0.replace(/^mycontent_|_[a-z]+$/g,""),tab=_8c0.match(/[a-z]+$/),_8c4=jq("#"+tab+"_topic_menu li");
for(var i=0,l=_8c4.length;i<l;i++){
if(jq(_8c4[i]).attr("data-hash")==_8c3){
_8c1=tab+"_items";
_8c2=this.activateAvailableTag(_8c1);
("undefined"!=typeof content_items)?content_items.activate(_8c2):false;
jq(_8c4[i]).trigger("click");
break;
}
}
}else{
if(this.isValidSection(_8c0)){
jq("a[href=#"+this.currentSection+"]").parent().removeClass("active");
this.currentSection=_8c0;
if(this.currentSection=="email"){
this.currentSection="fanmail";
}
if(this.currentSection=="bio"){
if(jq("#read_bio").length>0){
jq("#read_bio").trigger("click");
}
}else{
this.loadSection(this.currentSection,function(){
if(_8c0=="email"){
if(this.profileContainer.data("send_email")=="1"){
this.openFancyBox("#email_to_user");
}
}
});
}
}
}
}
_8c2=this.activateAvailableTag(_8c1);
("undefined"!=typeof content_items)?content_items.activate(_8c2):false;
this.showLoadMoreButton();
}
};
ProfileManager.prototype.isValidSection=function(_8c5){
var _8c6=false;
for(i in this.allowedSections){
if(this.allowedSections[i]==_8c5){
_8c6=true;
break;
}
}
return _8c6;
};
ProfileManager.prototype.loadContentOnScroll=function(){
var _8c7=jq(window),_8c8=jq("#footer_wrap"),pos=_8c7.scrollTop(),_8c9=jq("#profile_header"),_8ca=_8c9.offset().top,_8cb=jq(window).scrollTop()>=(jq(document).height()-jq(window).height()-30),_8cc=jq("#profile_content_container > div:visible"),_8cd=(_8cc.length>0)?_8cc.attr("id").replace(/section_/,""):"",_8ce=[],_8cf=jq(".content_nav ul#tabs li.active"),_8d0="";
if(_8cd=="mycontent"){
if(_8cf.length==0){
return;
}
_8d0=_8cf.attr("id").replace(/_items_item/,"");
}
if(_8cd=="following"){
_8ce.push(jq("#following_people"));
_8ce.push(jq("#following_topics"));
}else{
if(this.getDivSection(_8cd)){
_8ce.push(this.getDivSection(_8cd));
}
}
_8ce.each(jq.proxy(function(_8d1){
if(!this.moreContent(_8d0)){
return;
}
if(!_8d1.data("no_content")){
if(_8d1.data("loading")){
return;
}
if((_8c7.scrollTop()+_8c7.height())>=(jq(document).height()-1)){
setTimeout(jQuery.proxy(function(){
this.loadContent(_8d1,_8cd,_8d0);
},this),300);
}
}
},this));
};
ProfileManager.prototype.moreContent=function(_8d2){
if((_8d2=="answers"&&this.moreRequest==="1")||(_8d2=="hubs"&&this.moreArticle==="1")||(_8d2=="forums"&&this.moreTopic==="1")){
return true;
}else{
if((_8d2=="answers"&&this.moreRequest==="0")||(_8d2=="hubs"&&this.moreArticle==="0")||(_8d2=="forums"&&this.moreTopic==="0")){
return false;
}
}
};
ProfileManager.prototype.loadContent=function(_8d3,_8d4,_8d5){
var _8d6=jq(".newprofile #show_only").data("categoryId")||"all";
var page;
if(_8d3.data("next")){
page=_8d3.data("next");
}else{
page=(0==_8d3.children("ul").first().children().size())?1:2;
}
this.loadMoreBtn.hide();
if(jq("#spinner_loading").length>0){
_8d7=jq("#spinner_loading");
}else{
var _8d8=jq("#footer_wrap").height();
var _8d7=jq("<div/>",{"id":"spinner_loading",}).html(jq(this.spinnerDiv));
}
_8d7.show();
_8d3.parent().append(_8d7);
_8d3.parent().find("#spinner_loading > img.spinner").show();
if(_8d4=="following"){
_8d4=_8d3.attr("id");
}
var _8d9={section:_8d4,userId:this.userId,activeTab:_8d5,categoryId:_8d6,ajax:1};
if(page>1){
_8d9.page=page;
}
_8d3.data("loading",true);
jq.get(this.profileContainer.data("loadMoreUrl"),_8d9,jq.proxy(function(data,_8da,xhr){
_8d7.hide();
if(_8d4=="fanmail"){
var _8db=jq(data.render);
jq.each(_8db,function(){
if(jq("#"+jq(this).attr("id")).length===0){
_8d3.append(this);
}
});
}else{
var _8dc="";
jq.each(data.render,function(id,val){
if(_8d3.find("#"+id).length===0){
_8dc+=val;
}
});
var _8dd=false;
if(_8d4=="mycontent"){
var ul=_8d3.find("ul");
if(ul.hasClass("masonry")){
var _8de=jq(_8dc);
ul.append(_8de).masonry("appended",_8de);
}else{
_8dd=true;
ul.append(_8dc);
}
}else{
_8d3.append(_8dc);
}
if(_8dd){
ProfileManager.prototype.applyMasonry(ul);
}
}
if(data.more){
jq(document).data("no_content_all",false);
_8d3.data("next",page+1);
this.loadMoreBtn.show();
}else{
jq(document).data("no_content_all",true);
_8d3.data("no_content",true);
}
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
_8d3.data("loading",false);
},this),"json");
};
ProfileManager.prototype.dismissSimilarUser=function(self){
var _8df=jq(this).parent(),_8e0=_8df.attr("id").replace(/similar_user_/,""),_8e1=jq("div.similar_users_box"),_8e2=_8e1.find(".last_similar_user");
if(_8e2.length===0){
firstUserId=_8e1.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
}else{
firstUserId=_8e2.attr("id").replace(/similar_user_/,"");
}
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:self.userId,userId:_8e0,firstUserId:firstUserId,action:"dismiss"},success:jq.proxy(function(data){
_8df.fadeOut("slow",function(){
if(_8df.parent().find(".similar_user:visible").length==0){
_8df.parent().parent().fadeOut("slow",function(){
jq(this).remove();
});
}
if(data.render!=""){
_8e1.find(".last_similar_user").each(function(){
jq(this).removeClass("last_similar_user");
});
_8df.replaceWith(data.render);
jq("#"+jq(data.render).attr("id")).addClass("last_similar_user");
_8e1.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_8e1.find(".similar_user").length<3){
self.loadSingleSimilarUser();
}
}
jq(this).remove();
});
},this)});
};
ProfileManager.prototype.loadSingleSimilarUser=function(){
var _8e3=jq("div.similar_users_box"),_8e4=_8e3.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:this.userId,firstUserId:_8e4},success:jq.proxy(function(data){
if(data.render!=""){
_8e3.find("div.content_box_i").append(data.render);
_8e3.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}
if(_8e3.find(".similar_user").length<3){
this.loadSingleSimilarUser();
}
},this)});
};
ProfileManager.prototype.loadSimilarUsers=function(num){
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{userId:this.userId,num:num,action:"load"},success:jq.proxy(function(data){
var _8e5=jq("div.similar_users_box"),_8e6=_8e5.find(".similar_user").length;
if(data.render!=""){
_8e5.find("div.content_box_i").append(data.render);
_8e5.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_8e5.find(".similar_user").length<3&&data.more){
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
var _8e7=new RegExp(window.location.hash.replace(/slide|#/g,""),"i");
jq.each(jq(".slideshow img"),function(){
if(_8e7.test(jq(this).attr("src"))){
var href=jq(this).parents(".content").attr("id");
jq("a[href=#"+href+"]").trigger("click");
}
});
});
self.loadMoreBtn.live("click",function(){
var _8e8=jq("#profile_content_container > div:visible"),_8e9=(_8e8.length>0)?_8e8.attr("id").replace(/section_/,""):"",_8ea=[],_8eb=jq(".content_nav ul#tabs li.active"),_8ec="";
if(_8e9=="mycontent"){
if(_8eb.length==0){
return;
}
_8ec=_8eb.attr("id").replace(/_items_item/,"");
_8ea.push(_8e8.find("div.content_items:visible").first());
}else{
if(_8e9=="followers"){
_8ea.push(_8e8.find("div").first());
}else{
if(_8e9=="following"){
_8ea.push(jq("#following_people"));
_8ea.push(jq("#following_topics"));
}else{
if(_8e9=="fanmail"){
_8ea.push(_8e8.find("#fanmail_content"));
}
}
}
}
_8ea.each(function(_8ed){
if(!_8ed.data("no_content")){
if(_8ed.data("loading")){
return;
}
self.loadContent(_8ed,_8e9,_8ec);
}else{
self.loadMoreBtn.hide();
}
});
});
jq("#read_bio").live("click",function(e){
var _8ee=jq(this).closest("div");
e.preventDefault();
_8ee.html(jq("img.spinner").first());
_8ee.hide();
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
var _8ef=jq(this).find("a").text();
jq.each(jq(this).parent().find("li"),function(){
jq(this).removeClass("active");
});
self.loadSection(_8ef);
});
var _8f0=jq(".newprofile div.content_nav ul.filter_by_topic"),_8f1=jq(".newprofile #show_only"),_8f2="#section_mycontent .content_items:visible",_8f3=jq("ul.filter_by_topic li"),_8f4=false;
_8f1.click(function(){
if(!_8f4){
var _8f5=jq(".content_nav #tabs .active").attr("id").replace(/_items_item/,"");
ulFilters=jq("#"+_8f5+"_topic_menu");
ulFilters.attr("tabindex",-1);
setTimeout(function(){
ulFilters.focus();
},0);
if(ulFilters.is(":visible")){
ulFilters.hide();
_8f1.find("span").removeClass("active");
}else{
ulFilters.show();
_8f1.find("span").addClass("active");
}
var _8f6=ulFilters.offset().left,_8f7=_8f1.offset().left,_8f8=(_8f6-_8f7)+11;
ulFilters.css("right",parseFloat(ulFilters.css("right"))+_8f8+"px");
_8f4=false;
}
});
_8f0.bind("blur",function(e){
_8f4=true;
jq(this).hide();
_8f1.find("span").removeClass("active");
setTimeout(function(){
_8f4=false;
},500);
});
_8f3.click(function(){
var _8f9=jq(this).attr("data-id"),_8fa=jq(".content_nav ul#tabs li.active");
if(_8fa.length>0){
var _8fb=jq(".content_nav ul#tabs li.active").attr("id").replace(/_items_item/,""),_8fc=jq(this).text();
_8fa.data("categoryId",_8f9);
jq(_8f2).find("ul").html(jq(self.spinnerDiv));
jq(_8f2).data("loading",true);
loadCategoryContent("mycontent",_8f9,_8fb,function(res){
var _8fd=jq(_8f2).find("ul");
_8fd.find("img.spinner").hide();
ProfileManager.prototype.destroyMasonry(_8fd);
jq.each(res.render,function(id,val){
if(_8fd.find("#"+id).length===0){
_8fd.append(val);
}
});
ProfileManager.prototype.applyMasonry(_8fd);
jq(_8f2).removeData("next");
if(res.more){
jq(_8f2).data("no_content",false);
jq(document).data("no_content_all",false);
}else{
jq(document).data("no_content_all",true);
jq(_8f2).data("no_content",true);
}
_8f1.data("categoryId",_8f9);
_8f1.data(getUrlHashTagVersion(_8fc),_8f9);
_8f1.html("<span></span><strong>Show</strong>: "+_8fc);
jq(_8f2).data("loading",false);
loadHashTag(_8fb);
self.showLoadMoreButton();
});
_8f1.attr("tabindex",-1);
_8f1.focus();
_8f0.hide();
_8f1.find("span").removeClass("active");
}
});
};
ProfileManager.prototype.openFancyBox=function(_8fe,_8ff){
var el=jq(_8fe);
jq.fancybox({"href":_8fe,onStart:function(){
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
ProfileManager.prototype.getDivSection=function(_900){
var _901,_902=jq("#section_"+_900);
if(_900=="mycontent"){
_901=_902.find("div.content_items:visible").first();
}else{
if(_900=="followers"){
_901=_902.find("div").first();
}else{
if(_900=="fanmail"){
_901=_902.find("#fanmail_content");
}
}
}
return _901;
};
ProfileManager.prototype.loadSection=function(_903,_904){
this.currentSection=_903.replace(/\s/,"").toLowerCase();
if(this.currentSection=="myactivity"){
this.currentSection="activity";
}
var _905="section_"+this.currentSection,isCr=typeof cr,_906=jq("#profile_content_container"),_907=_906.offset().top,_908=jq(this.spinnerDiv);
var _909=jq("a[href=#"+this.currentSection+"]");
if(_909.length>0){
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
}
if(_905!="section_mycontent"&&jq("#teaser").length>0&&isCr!="undefined"){
cr.pause();
}
jq("div[id^=section_]").hide();
if(jq("#"+_905).length>0){
jq("#"+_905).show();
if(_905=="section_mycontent"){
ProfileManager.prototype.applyMasonry(jq("#content_hubs_items > .contentitem_listing"));
}
this.showLoadMoreButton();
}else{
var _90a=_906.find("img.spinner");
if(_90a.length==0){
_906.append(_908);
}
_90a.show();
jq.post("/xml/profile/profile_section.php",{section:this.currentSection,userId:this.userId},jq.proxy(function(res){
var data=jQuery.parseJSON(res),_90b;
_906.find(".spinner").hide();
if(data.render){
_90c.call(this,data);
}else{
jq.each(data,jQuery.proxy(function(i,el){
_90c.call(this,el);
},this));
}
function _90c(el){
if(jq("#"+_905).length===0){
_90b=jq("<div/>",{id:_905,"class":"psection"});
}else{
_90b=jq("#"+_905);
}
_90b.append(el.render).appendTo("#profile_content_container");
if(!el.more&&this.currentSection!="activity"){
if(this.currentSection==="following"){
_90b.find("#"+el.section).data("no_content",true);
}else{
this.getDivSection(this.currentSection).data("no_content",true);
}
}
};
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_905=="section_fanmail"){
var _90d=jq("#email_to_user");
if(_90d.length>0){
jq(".lightbox").fancybox({onStart:function(){
window.location.hash="#email";
_90d.show();
},onClosed:function(){
_90d.hide();
_90d.find("#success_message_email").hide();
_90d.find("#email").show();
_90d.find("h3").show();
},onComplete:function(e){
_90d.css("overflow-x","hidden");
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
var _90e=jq("#success_message_email");
_90e.html(messaging);
_90e.siblings("#email").fadeOut("slow",function(){
jq("#email_to_user h3").hide();
_90e.show();
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
var _90f=$("fanmailadd");
Element.update(_90f,req.responseText);
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
(_904!=undefined)?_904.call(this):false;
},this));
}
};

