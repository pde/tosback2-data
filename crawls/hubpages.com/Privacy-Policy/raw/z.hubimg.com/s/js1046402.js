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
function loadRatingSystem(_30b,_30c,_30d,_30e){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_30b,params:{id:_30e},ratingClass:"rating"});
};
function initAutoComplete(_30f,_310){
var _311="";
var _312="++none++";
var _313=false;
var _314=false;
var _315=false;
var _316="#the_auto_comp_box";
var _317="#search_form";
var _318="#search_input";
var _319=".search_submit";
var _31a="search_form";
var _31b="/xml/getautocompletestrings.php";
var _31c="";
var _31d=0;
var _31e=null;
var _31f=null;
var _320=null;
var _321=null;
var _322=null;
var _323=false;
if(_310){
_316=_310.boxid;
_317=_310.container;
_318=_310.input;
_319=_310.submit;
if(_310.ajaxtarget!=undefined){
_31b=_310.ajaxtarget;
}
if(_310.querystring!=undefined){
_31c="&"+_310.querystring;
}
if(_310.filter!=undefined){
_31e=_310.filter;
}
if(_310.callback!=undefined){
_31f=_310.callback;
}
if(_310.keyboardelem!=undefined){
_321=_310.keyboardelem;
}
if(_310.targoutput!=undefined){
_320=_310.targoutput;
}
if(_310.keyuptarget!=undefined){
_322=_310.keyuptarget;
}
if(_310.showprogress!=undefined){
_323=_310.showprogress;
}
}
if(!_321){
_321=_318;
}
if(!_320){
_320=_318;
}
if(!_322){
_322=_321;
}
jq(document).ready(function(){
if(!_313){
_313=true;
jq("<div id=\""+_316.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_321);
if(_323){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_316);
jq("#auto_comp_close").bind("click",function(){
jq(_316).hide();
jq("#auto_comp_close").hide();
});
}
jq(_316).hide();
if(!_323){
jq(_316).bind("focusin",function(){
_314=true;
});
jq(_316).bind("focusout",function(){
_314=false;
});
jq(_317).bind("focusin",function(){
_315=true;
});
jq(_317).bind("focusout",function(){
_315=false;
setTimeout(function(){
if(!_314&&!_315){
jq(_316).hide();
jq("#auto_comp_close").hide();
_31c=_31c.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_317).attr("autocomplete","off");
jq(_321).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_31d=0;
jq(_316+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_322).bind("keyup",function(){
var _324=jq(_318).attr("value");
if(_318!=_321){
if(_311!=_324){
_31c=_31c.replace(/start=[0123456789]+/,"");
_31c=_31c.replace(/&&/,"&");
}
_311="";
_312="++none++";
}
var _325;
if(_310){
_325="hubs";
}else{
_325=jq(".search_type option:selected").val();
if(_325==undefined){
_325="site";
}
}
if(jq.trim(_324).length==0){
jq(_316).hide();
jq("#auto_comp_close").hide();
}
if(jq.trim(_324).length>0&&_311!=_324){
_311=_324;
if(_324.indexOf(_312)==0){
jq(_316+" > .auto_comp_row").each(function(){
var _326=jq(this).text();
if(_31e){
_326=_31e(_326);
}
if(_326.indexOf(_324)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_312="++none++";
jq(_316+" > .auto_comp_row").remove();
var _327="?";
if(_323){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_316);
jq(_316).show();
_327="?s="+escape(_324)+"&";
}
var _328=jq(_317).serialize();
var _329=/(^|&)s=/;
if(!_328.match(_329)&&!_31c.match(_329)&&!_327.match(_329)){
_328+="&s="+_324;
}
jq.get(_31b+_327+"t="+escape(_325)+_31c,_328,function(data){
jq(_316+" div[id=auto_comp_error]").remove();
jq(_316+" div[id=auto_comp_progress]").remove();
_31c=_31c.replace(/start=[0123456789]+/,"");
_31c=_31c.replace(/&&/,"&");
var _32a=jq(data).find("div").length;
var _32b=false;
if(_32a==0){
return true;
}
var _32c=jq(_318).val();
if(_32c!=_324){
return true;
}
if(_32a<_30f){
_312=_324;
}else{
_312="++none++";
}
jq(_316).show();
jq(_321).focus();
var _32d=jq(_321).position();
var _32e=jq(_321).outerHeight(true);
jq(_316).position(_32d.top+_32e,_32d.left+5);
jq(data).find("div").appendTo(_316);
jq(_316+" > .auto_comp_row").bind("click",function(){
var _32f=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_32f=true;
var _330=href.substr(8);
_31c+="&start="+_330;
_31c=_31c.replace(/&&/,"&");
}
});
if(_32f){
if(!_32b){
setTimeout(function(){
jq(_322).trigger("keyup");
},200);
_314=false;
_32b=true;
}
return (false);
}
var _331=jq(this).text();
if(_31e){
_331=_31e(_331);
}
jq(_320).attr("value",_331);
if(document.forms[_31a]){
document.forms[_31a].submit();
}else{
if(_319){
jq(_319).trigger("click");
}
}
return (false);
});
jq(_316+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_316+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_316+" > .auto_comp_row:visible:eq("+_31d+") > a").length){
return (false);
}
++_31d;
jq(_316+" > .auto_comp_row:visible:eq("+_31d+") > a").trigger("focus");
return (false);
break;
case 38:
--_31d;
if(_31d<0){
jq(_321).trigger("focus");
}else{
jq(_316+" > .auto_comp_row:visible:eq("+_31d+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_31f){
_31f();
}
},"html");
}
});
}
});
};
function updateNumCharCount(_332,_333,_334){
if(jq("#"+_333).hasClass("dimmed")){
jq("#"+_334).html(_332);
}else{
if(jq("#"+_333).val().length>_332){
jq("#"+_333).value=jq("#"+_333).val().substring(0,_332);
}
jq("#"+_334).html(_332-jq("#"+_333).val().length);
}
};
function checkCharCount(_335,_336,_337){
updateNumCharCount(_335,_336,_337);
jQuery("#"+_336).bind("click keyup keydown",function(){
updateNumCharCount(_335,_336,_337);
});
jQuery("#"+_336).bind("keypress",function(evt){
updateNumCharCount(_335,_336,_337);
var code=(evt.keyCode?evt.keyCode:evt.which);
if(code!=8&&code!=37&&code!=38&&code!=39&&code!=40&&(browser=="Opera"||code!=46)){
if(jQuery(this).val().length>=_335){
evt.stopPropagation();
return false;
}
}
return true;
});
};
function checkCommentCharCount(_338,_339,_33a,_33b){
jQuery("#"+_339).bind("click keypress keydown keyup",function(){
if(jQuery("#"+_33b).text()<_338){
jQuery("#"+_33a).show("fast");
}else{
jQuery("#"+_33a).hide("fast");
}
});
};
function initCommentsCapsule(_33c,_33d,_33e){
if(_33e.signInRequired){
jq("#comment_submit_"+_33c).data("disabled",true);
jq("#comment_submit_"+_33c+", .moduleComment .compose_comment textarea").click(function(){
whenSignedIn({explain:"to comment",showSignup:true,utm_source:"tocomment"},function(){
jq("#comText_"+_33c).remove();
document.location=_33e.url;
document.location.reload(true);
});
return false;
});
return;
}
checkCharCount(8192,"comText_"+_33c,"comText_"+_33c+"_chars");
checkCommentCharCount(1000,"comText_"+_33c,"comCharDiv_"+_33c,"comText_"+_33c+"_chars");
var _33f="function"==typeof (_33e.success)?_33e.success:function(resp){
jq("#mod_"+_33c).html(resp);
jq("#spinner").hide();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
};
var _340;
if(_33d){
_340=function(form,btn){
whenSignedIn({explain:"to comment as "+_33d,utm_source:"tocomment"},function(){
jq(form).ajaxSubmit({type:"POST",success:_33f});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
});
};
}else{
_340=function(form,btn){
jq(form).ajaxSubmit({type:"POST",success:_33f});
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
jq("#comment_submit_"+_33c).click(function(){
jq("#comment_"+_33c).submit();
return false;
});
var _341={onkeyup:false,submitHandler:function(form){
var btn=jq("#comment_submit_"+_33c);
if(btn.data("disabled")){
return;
}
jq("#spinner").show();
_340.apply(this,[form,btn]);
},rules:{name:{requiredNoPlaceholder:true,nohtml:true}},messages:{name:{requiredNoPlaceholder:"Please enter your name before posting."}},errorLabelContainer:"#formErrors_{$modId} ul",errorElement:"li",errorClass:"errorFld",onfocusout:false};
_341.rules["comText_"+_33c]={requiredNoPlaceholder:true,minlength:4,nohtml:true};
_341.messages["comText_"+_33c]={requiredNoPlaceholder:"Please enter a comment before posting.",minlength:"Your comment is rather short."};
jq("#comment_"+_33c).validate(_341);
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
var _342=location.hash.slice(1);
if(_342!="slide-related"&&_342.substr(0,5)=="slide"){
var _343=_342.replace("slide","");
var _344=jQuery(".image_module_thumb[id*=\""+_343+"\"]");
if(_344.length>0){
_344.click();
_344.parents(".moduleImage").find(".slide_display img:visible").click();
}else{
jQuery("#img_url_"+_343+" img").click();
}
}
};
function safeScriptEval(_345){
var _346=_345.innerHTML.strip();
if(_346.substring(0,4)=="<!--"){
_346=_346.substring(4,_346.length-3);
}
try{
eval(_346);
}
catch(e){
}
};
function selectTab(_347,_348,_349,_34a){
var _34b;
if(!_349){
_349=jq("#tab_"+_347+"_0").closest("ul").children().size();
}
var _34c,_34d;
for(var i=0;i<_349;i++){
_34c=jq("#tab_"+_347+"_"+i);
_34d=jq("#tabcontent_"+_347+"_"+i);
if(!_34c.size()||!_34d.size()){
alert("Cannot locate element: baseid="+_347+" index="+_348+" tabcount="+_349);
}
if(_34c.hasClass("selected")){
_34b=i;
}
if(i==_348){
_34c.addClass("selected");
_34d.addClass("selected");
}else{
_34c.removeClass("selected");
_34d.removeClass("selected");
}
}
var _34e={};
if(_34a&&_34e.toString.call(_34a)=="[object Function]"){
_34a(_34b,_348);
}
return false;
};
function categoryFanBulkJoin(id,_34f,_350,_351,_352,_353){
var _354=jq(".jc");
var cids=Array();
var _355=Array();
var i=0;
var k=0;
jq(".jc").each(function(_356,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_351){
_355[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_355.join(",");
if(_351){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_352){
_352(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_353)!="undefined"){
data["searchTxt"]=_353;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_34f){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_350){
setTimeout(categoryFanHighlight,500);
}
}
if(_352){
_352(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_357,_358,_359,cols,_35a){
if(!_359){
var _359=8;
}
if(!cols){
var cols=2;
}
var _35b=jq("#"+_358).val();
if(""==jq.trim(_35b)){
return;
}
jq("#"+_357).load("/xml/categoryFanSearch.php",{search:_35b,limit:_359,cols:cols},function(){
if(_35a){
_35a();
}
});
return false;
};
function facebookConnect(_35c){
if(typeof (_35c)=="undefined"){
_35c="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_35c}).toQueryString();
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
function facebookPopup(_35d){
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
child=window.open(_35d,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_35e,_35f){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_35e+"="+(_35f?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function checkViolations(_360){
if(_360){
jq(".violations_span").html("");
var _361={check_violation:1};
}else{
var _361={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_361,dataType:"json",success:function(_362){
if(_362.data){
jq(".violations_span").html(_362.data);
}
if(!_362.complete){
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
function showHubOverlay(url,_363,_364){
var uri=$H({url:url,addComment:_363,commentText:_364}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_365){
var uri=$H({modId:_365}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_366,_367){
var uri=$H({moduleId:_366,pollId:_367}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_368,_369,_36a,_36b){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_36a){
$("overlay").addClassName(_36a);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_368,{parameters:_369,onComplete:function(){
if(_36b!=undefined){
_36b.call($("overlay"));
}
if(!$("fixed_title")){
return;
}
var _36c=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_36c+"px"});
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
var _36d=browser=="IE"&&version<=6;
var _36e=$("overlay");
var _36f=Position.getViewportHeight();
if(_36f>750){
var _370=_36f-150;
}else{
var _370=_36f-90;
}
var _371=_36e.getStyle("paddingTop");
var _372=_36e.getStyle("paddingBottom");
_370-=_371.substring(0,_371.length-2);
_370-=_372.substring(0,_372.length-2);
_370=Math.max(_370,100);
$("overlay").setStyle({height:_370+"px"});
if(_36f>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_36d){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_36d){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _373=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_373+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_370-60)+"px",overflowY:"auto"});
}
};
function activity_why(id,_374,_375,_376){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_374,actionTargetId:_375,createDate:_376}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function ellipse(str,_377){
if(str.length>_377&&_377!=0){
str=str.substr(0,_377-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_377-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function fireOnReturn(_378,func){
Event.observe(_378,"keyup",function(_379){
_379=_379||window.event;
if(_379.which){
if(_379.which==Event.KEY_RETURN){
_379.preventDefault();
func();
}
}else{
if(_379.keyCode){
if(_379.keyCode==Event.KEY_RETURN){
Event.stop(_379);
func();
}
}
}
},false);
};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_37a){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_37a*100)+")";
}
ele.style.opacity=_37a;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _37b;
if(document.defaultView){
_37b=document.defaultView.getComputedStyle(ele,"");
}else{
_37b=ele.currentStyle;
}
return _37b;
};
Element.cloneStyles=function(ele,_37c,_37d){
ele=$(ele);
_37c=$(_37c);
var _37e=Element.getCurrentStyle(ele);
for(var name in _37e){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _37f=_37e[name];
if(_37f!==""&&!(_37f instanceof Object)&&name!="length"&&name!="parentRule"){
if(_37d&&name.indexOf(_37d)!==0){
continue;
}
_37c.style[name]=_37f;
}
}
return _37c;
};
Element.findElement=function(_380,_381){
_380=$(_380);
while(_380.parentNode&&(!_380.tagName||(_380.tagName.toUpperCase()!=_381.toUpperCase()))){
_380=_380.parentNode;
}
return _380;
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
String.prototype.startsWith=function(_382){
var res=this;
return res.substring(0,_382.length)==_382;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _383=p.innerHTML;
if(_383.length>len){
_383=_383.substring(0,len);
_383=_383.replace(/\w+$/,"");
_383+="...";
p.innerHTML=_383;
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
var _384=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_384=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_384=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_384=window.pageXOffset;
}else{
if(window.scrollX){
_384=window.scrollX;
}
}
}
}
return _384;
};
Position.getViewportScrollY=function(){
var _385=0;
if(document.documentElement&&document.documentElement.scrollTop){
_385=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_385=document.body.scrollTop;
}else{
if(window.pageYOffset){
_385=window.pageYOffset;
}else{
if(window.scrollY){
_385=window.scrollY;
}
}
}
}
return _385;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _386=jq(window).scrollTop();
var _387=_386+jq(window).height();
if(eleBot<_386){
return -1;
}
if(off.top>_387){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _388=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _389=[_388[0]+Position.getViewportWidth(),_388[1]+Position.getViewportHeight()];
return (_388[0]<off[0]&&off[0]<_389[0]&&_388[1]<off[1]&&off[1]<_389[1]);
};
Position.set=function(ele,_38a){
if(ele&&_38a){
ele.style.left=_38a[0]+"px";
ele.style.top=_38a[1]+"px";
}
};
function phone_verify_required(_38b,_38c,_38d,_38e){
if(typeof (_38e)=="undefined"){
data={};
}else{
data={a:_38e};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_38b);
}else{
_38c.apply(null,_38d);
}
},"json");
};
function require_phone_verification(_38f,_390){
url="/xml/verify/phone.php";
if(typeof (_390)!="undefined"&&_390){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_38f},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_391,end){
for(var i=_391;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_391)+1;
}
update_plural(name);
};
function unselect_all(name,_392,end){
for(var i=_392;i<=end;i++){
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
function import_now(_393,name,_394,end){
var _395=self.opener.document.getElementById(_393);
if(_395){
for(var i=_394;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _396=$(name+"_email_"+i);
if(_395.value.length<2||_395.value.charAt(_395.value.length)==","||_395.value.charAt(_395.value.length-1)==","){
_395.value=_395.value+_396.innerHTML;
}else{
_395.value=_395.value+", "+_396.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_397,_398,max){
var _399=document.getElementById(_397);
var _39a=document.getElementById(_398);
if(!_399){
alert("charCounter bad source: "+_397);
}
if(!_39a){
alert("charCounter bad source: "+_398);
}
if(_399.value.length>max){
_399.value=_399.value.substring(0,max);
}
_39a.value=max-_399.value.length;
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
function fetchAnswers(_39b,_39c,_39d){
var _39e=$H({answerIds:_39b,enableVoting:_39c,enableEditing:_39d}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_39e,onComplete:function(_39f){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_3a0,v){
if(_3a0===undefined){
_3a0=true;
}
jq.post("/xml/answervote.php",{id:id,vote:v,timeIndicator:_3a0});
return false;
};
function showAnswerComments(id){
var _3a1=jq("#rc_hide_"+id);
_3a1.toggle(500);
jq("#"+id+"_see_all_comments .see_all").toggle();
jq("#"+id+"_see_all_comments .hide_extra").toggle();
return false;
};
function answerVoteDown(id,_3a2){
return answerVote(id,_3a2,-1);
};
function answerVoteUp(id,_3a3){
return answerVote(id,_3a3,1);
};
function getElementScreenTop(){
var _3a4=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _3a4;
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
jQuery(".answer_delete").click(function(_3a5){
id=jQuery(_3a5.target).attr("id");
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
var _3a6="#edit_rc_error_"+i;
jQuery(_3a6).html("You cannot submit an empty comment.");
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
jQuery(".request_comment_delete").click(function(_3a7){
orig_id=jQuery(_3a7.target).attr("id");
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
jQuery(".request_comment_notspam").click(function(_3a8){
orig_id=jQuery(_3a8.target).attr("id");
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
function showAnswerCommentBox(id,_3a9){
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
jQuery("#rc_numcharsvalue").html(_3a9);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _3aa="#result_"+i;
var _3ab="#error_"+i;
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
jQuery(_3aa).append(data.msg);
var _3ac=jQuery(_3aa).children().last().attr("id");
jQuery(_3aa).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_3ac);
});
});
}
}});
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_3ad){
this.buffer.push(_3ad);
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
function hpFormHandler(_3ae){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_3ae);
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
var _3af=$$("input[name="+ele.name+"]");
var _3b0=false;
_3af.each(function(r){
if(r.checked==true){
_3b0=true;
throw $break;
}
});
this.testForError(!_3b0,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _3b1=false;
if(val.length>=20){
var _3b2=val.match(/\s+/g);
var _3b3=_3b2?_3b2.length:0;
var _3b4=_3b3+1;
_3b1=_3b4/(val.length-_3b3)<0.08;
}
this.testForError(_3b1,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_3b5,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_3b5)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_3b6,msg){
var val=$F(ele);
this.testForError((val.search(_3b6)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_3b7,msg){
var val=$F(ele);
var _3b8=false;
for(i=0;i<_3b7.length&&!_3b8;i++){
var _3b9=new RegExp("[^a-zA-Z]"+_3b7[i]+"[^a-zA-Z]","i");
_3b8=(val.search(_3b9)>=0);
if(!_3b8){
_3b9=new RegExp("^"+_3b7[i]+"[^a-zA-Z]","i");
_3b8=(val.search(_3b9)>=0);
}
if(!_3b8){
_3b9=new RegExp("[^a-zA-Z]"+_3b7[i]+"$","i");
_3b8=(val.search(_3b9)>=0);
}
if(!_3b8){
_3b9=new RegExp("^"+_3b7[i]+"$","i");
_3b8=(val.search(_3b9)>=0);
}
}
this.testForError(_3b8,ele,msg);
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
var _3ba=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _3bb=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _3bc=800;
var _3bd=6;
this.validateLengthMin(ele,_3bd,"The address you entered is too short. Please use an address at least "+_3bd+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _3be=200;
this.validateLengthMax(ele,_3be,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _3bf=2;
var _3c0=200;
this.validateLengthMin(ele,_3bf,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_3c0,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _3c1=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_3c1=true;
}
this.testForError(!_3c1,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _3c2=40;
var _3c3=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_3c3,"Your password is too short.  Protect your account by choosing a password that is at least  "+_3c3+" characters long.  Safety first!");
this.validateLengthMax(ele1,_3c2,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _3c4=60;
var _3c5=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_3c4,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_3c6){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_3c6.detect(function(name){
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
var _3c7=$A($(form).getElementsByTagName("input"));
_3c7.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_3c8,_3c9,_3ca){
if($(_3c8)&&$(_3c9)){
var gw=new GhostWatcher(_3c8,_3c9,_3ca);
}
};
hpFormHandler.prototype.setValidators=function(_3cb,_3cc){
this.toValidate=$H(_3cb);
this.toValidateOnsubmit=$H(_3cc);
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
hpFormHandler.prototype.save=function(_3cd){
if(this.ensureSignedInBeforeSave&&!_3cd){
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
var _3ce=new fx.Scroll({duration:100});
_3ce.scrollTo(this.errorDiv);
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
var _3cf=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_3d0,ele,msg){
if(_3d0){
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
hpFormHandler.prototype._runValidators=function(_3d1){
var _3d2=Form.getElements(this.form);
var _3d3=$A(_3d2);
_3d3.each(function(node){
if(_3d1){
var _3d4=this.toValidateOnsubmit.get(node.id);
if(!_3d4){
_3d4=this.toValidateOnsubmit.get(node.className);
}
if(_3d4){
_3d4(node);
}
}
var _3d4=this.toValidate.get(node.id);
if(!_3d4){
_3d4=this.toValidate.get(node.className);
}
if(_3d4){
_3d4(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _3d5="";
if(json.status=="error"){
var _3d6=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_3d5+=" - "+json.errors[key][i]+"\n";
}
_3d6++;
}
}
if(_3d6>0){
var _3d7=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_3d7+=_3d5+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_3d7);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _3d8=new fx.Scroll({duration:300});
_3d8.scrollTo("changesSaved");
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
var _3d9=this.errorHeader;
_3d9+="<ul>";
this.errors.each(function(err){
_3d9+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_3d9+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_3d9;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _3da=$(err.key);
var _3db=err.key+"_error";
var _3dc=$(_3db);
if(_3dc){
_3dc.innerHTML=err.value;
_3dc.className="alert";
_3dc.show();
}else{
new Insertion.Top(_3da.parentNode,"<div id=\""+_3db+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_3da,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _3dd=typeof this.errors.get(targetId)=="undefined";
if(_3dd){
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
function _handleInputKeypress(_3de){
_3de=_3de||window.event;
if(_3de.which){
if(_3de.which==Event.KEY_RETURN){
var _3df=document.createEvent("KeyboardEvent");
_3df.initKeyEvent("keydown",true,true,document.defaultView,_3de.ctrlKey,_3de.altKey,_3de.shiftKey,_3de.metaKey,Event.KEY_TAB,0);
_3de.preventDefault();
_3de.target.dispatchEvent(_3df);
}
}else{
if(_3de.keyCode){
if(_3de.keyCode==Event.KEY_RETURN){
_3de.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_3e0,_3e1,_3e2){
this.fromEle=$(_3e0);
this.toEle=$(_3e1);
this.copyFunction=(_3e2!=null)?_3e2:this.copyValue;
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
function growTextArea(elt,_3e3,_3e4,_3e5){
var rows=Math.ceil($F(elt).length/_3e3)+1;
var _3e6=rows*_3e4;
_3e6=Math.max(_3e6,_3e5);
elt.setStyle({height:_3e6+"px"});
};
function makeGrowable(id,_3e7,_3e8,_3e9){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_3e7,_3e8,_3e9);
});
};
function makeExpandable(id,_3ea,_3eb,_3ec,_3ed,_3ee){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_3ea);
var _3ee=(_3ee===undefined)?"expanded":_3ee;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_3ee)){
anc.addClass(_3ee);
if(typeof (_3ed)=="function"){
_3ed.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_3eb)=="function"){
_3eb.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_3ec){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_3ea);
});
};
function hpajaxpostformdata(_3ef,_3f0){
var data=new Object();
jq(_3f0).find("input").each(function(){
if(jq(this).attr("type")=="checkbox"){
if(jq(this).is(":checked")){
data[jq(this).attr("name")]=0;
}
}else{
data[jq(this).attr("name")]=jq(this).attr("value");
}
});
jq.get(_3ef,data,function(){
});
};
function categorySearch(_3f1){
jq("#"+_3f1+"SearchResults").load("/xml/categorysearch.php",{uniqueId:_3f1,searchText:jq("#"+_3f1+"SearchText").val()});
};
(function($){
var _3f2=function(){
this.children("select").change(function(_3f3){
var _3f4=jq(_3f3.target);
_3f4.parent().hpCategorySelector("chooseCategory",_3f4.val());
});
};
var _3f5={init:function(_3f6){
var _3f7=$.extend({userId:0,valueId:"#categoryId",data:{}},_3f6);
this.data("settings",_3f7);
_3f2.apply(this);
return this;
},chooseCategory:function(_3f8){
return this.each(function(_3f9,elt){
var _3fa=jq(elt);
var _3fb=_3fa.data("settings");
var _3fc=_3fa.attr("id");
var _3fd=$.extend({categoryId:_3f8,id:_3fc},_3fb.data);
jq.post("/xml/categoryselector.php",_3fd,function(rsp){
var data=jq.parseJSON(rsp);
_3fa.html(data.render);
_3f2.apply(_3fa);
_3fa.find("select").first().focus();
$(_3fb.valueId).val(_3f8);
_3fa.trigger("categoryChange.hpCategorySelector",data);
});
});
},refresh:function(){
return this.each(function(_3fe,elt){
var _3ff=jq(elt);
_3ff.hpCategorySelector("chooseCategory",_3ff.hpCategorySelector("getValue"));
});
},getValue:function(){
var _400=this.data("settings");
return $(_400.valueId).val();
},destroy:function(){
}};
$.fn.hpCategorySelector=function(_401){
if(_3f5[_401]){
return _3f5[_401].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _401==="object"||!_401){
return _3f5.init.apply(this,arguments);
}else{
$.error("Method "+_401+" does not exist on jQuery.hpCategorySelector");
}
}
};
})(jQuery);
(function($){
var _402=function(){
this.children("select").change(function(_403){
var _404=jq(_403.target);
_404.parent().hpForumSelector("chooseForum",_404.val(),_404.prevAll("select").size()>0);
});
};
var _405={init:function(_406){
var _407=$.extend({userId:0,data:{},id:"admin"},_406);
this.data("settings",_407);
_402.apply(this);
return this;
},chooseForum:function(_408,_409){
var _40a=0,data={};
if(/fave/.test(_408)){
data["categoryId"]=_408.substring(5);
_40a=data["categoryId"];
}else{
if(_409){
data["categoryId"]=_408;
}else{
data["forumId"]=_408;
}
}
return this.each(function(_40b,elt){
var _40c=jq(elt);
var _40d=_40c.data("settings");
var _40e=_40c.attr("id");
var _40f=$.extend(data,_40d.data);
_40f["id"]=_40d.id;
jq.post("/xml/forumselector.php",_40f,function(rsp){
_40c.html(rsp);
_402.apply(_40c);
$("#"+_40d.id+"_category_id").val(_40a);
});
});
},getValue:function(){
var _410=this.data("settings");
return $(_410.valueId).val();
},destroy:function(){
}};
$.fn.hpForumSelector=function(_411){
if(_405[_411]){
return _405[_411].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _411==="object"||!_411){
return _405.init.apply(this,arguments);
}else{
$.error("Method "+_411+" does not exist on jQuery.hpForumSelector");
}
}
};
})(jQuery);
function addEvent(_412,type,_413){
if(!_413.$$guid){
_413.$$guid=addEvent.guid++;
}
if(!_412.events){
_412.events={};
}
var _414=_412.events[type];
if(!_414){
_414=_412.events[type]={};
if(_412["on"+type]){
_414[0]=_412["on"+type];
}
}
_414[_413.$$guid]=_413;
_412["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_415,type,_416){
if(_415.events&&_415.events[type]){
delete _415.events[type][_416.$$guid];
}
};
function handleEvent(_417){
var _418=true;
_417=_417||fixEvent(window.event);
if(_417==null){
return false;
}
if(this.events==null){
return false;
}
var _419=this.events[_417.type];
for(var i in _419){
this.$$handleEvent=_419[i];
if(this.$$handleEvent(_417)===false){
_418=false;
}
}
return _418;
};
function fixEvent(_41a){
if(_41a!=null){
_41a.preventDefault=fixEvent.preventDefault;
_41a.stopPropagation=fixEvent.stopPropagation;
}
return _41a;
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
var css={getElementsByClass:function(node,_41b,tag){
var _41c=new Array();
var els=node.getElementsByTagName(tag);
var _41d=els.length;
var _41e=new RegExp("(^|\\s)"+_41b+"(\\s|$)");
for(var i=0,j=0;i<_41d;i++){
if(this.elementHasClass(els[i],_41b)){
_41c[j]=els[i];
j++;
}
}
return _41c;
},elementHasClass:function(el,_41f){
if(!el){
return false;
}
var _420=new RegExp("\\b"+_41f+"\\b");
if(el.className.match(_420)){
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
var _421=document.getElementsByTagName("table");
for(var i=0;i<_421.length;i++){
var _422=_421[i];
if(css.elementHasClass(_422,"sortable")){
this.makeSortable(_422);
}
}
},makeSortable:function(_423){
if(!_423.id){
_423.id="sortableTable"+this.lastAssignedId++;
}
if(!_423.tHead||!_423.tHead.rows||0==_423.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_423.tHead.rows.length;i++){
if(css.elementHasClass(_423.tHead.rows[i],"sort_control_buttons")){
row=_423.tHead.rows[i];
break;
}
}
if(row==null){
row=_423.tHead.rows[_423.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _424=row.cells[i].firstChild;
_424.onclick=this.headingClicked;
_424.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _425=getEventTarget(e);
var td=_425.parentNode;
var tr=td.parentNode;
var _426=tr.parentNode;
var _427=_426.parentNode;
if(!_427.tBodies||_427.tBodies[0].rows.length<=1){
return false;
}
var _428=_425.getAttribute("columnId")||td.cellIndex;
var _429=css.getElementsByClass(td,"tableSortArrow","span");
var _42a="";
if(_429.length>0){
_42a=_429[0].getAttribute("sortOrder");
}
var itm="";
var _42b=0;
while(""==itm&&_42b<_427.tBodies[0].rows.length){
var elm=_427.tBodies[0].rows[_42b].cells[_428];
if(elm.childNodes.length==1){
itm=that.getInnerText(_427.tBodies[0].rows[_42b].cells[_428]);
}else{
itm=that.getInnerText(_427.tBodies[0].rows[_42b].cells[_428].firstChild);
}
_42b++;
}
var _42c=that.determineSortFunction(itm);
var _42d;
if(_427.id==that.lastSortedTable&&_428==that.sortColumnIndex){
_42d=that.newRows;
_42d.reverse();
}else{
that.sortColumnIndex=_428;
_42d=new Array();
for(var j=0;j<_427.tBodies[0].rows.length;j++){
_42d[j]=_427.tBodies[0].rows[j];
}
_42d.sort(_42c);
}
that.moveRows(_427,_42d);
that.newRows=_42d;
that.lastSortedTable=_427.id;
var _429=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_429.length;j++){
if(j==_428){
if(null==_42a||""==_42a||"DESC"==_42a){
_429[j].innerHTML="▼";
_429[j].setAttribute("sortOrder","ASC");
}else{
_429[j].innerHTML="▲";
_429[j].setAttribute("sortOrder","DESC");
}
}else{
_429[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_427.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_427.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_427.tBodies[0].rows.length;i++){
tr=_427.tBodies[0].rows[i];
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
var _42e=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_42e=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_42e=this.sortDate;
}
if(itm.match(/^[�$]/)){
_42e=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_42e=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_42e=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_42e=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_42e=this.sortIP;
}
return _42e;
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
var _42f=a.cells[that.sortColumnIndex];
if(_42f.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _430=b.cells[that.sortColumnIndex];
if(_430.childNodes.length>1){
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
},moveRows:function(_431,_432){
for(var i=0;i<_432.length;i++){
var _433=_432[i];
_431.tBodies[0].appendChild(_433);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
function PollManager(_434,_435,_436){
this.modId=_434;
this.pollId=_435;
this.results_div_id=_434+"_poll_results";
this.vote_form_id=_434+"_vote_form";
this.vote_radio_name=_434+"_vote";
this.hubnugget=_436;
};
PollManager.prototype={seePollVotes:function(){
this.question_HTML=jq("#"+this.results_div_id).html();
var _437=jQuery.param({id:this.pollId});
jQuery.ajax({url:"/xml/pollvote.php",data:_437,type:"POST",success:(function(data){
jQuery("#"+this.results_div_id).html(data);
}).bind(this),error:function(){
reportError();
}});
},goBackAndVote:function(){
jq("#"+this.results_div_id).html(this.question_HTML);
},risingStarVote:function(_438){
if(!jQuery(".voting_candidates").hasClass("voted")){
var _439=jQuery.param({id:this.pollId,vote:_438,hn:1});
jQuery.ajax({url:"/xml/pollvote.php",data:_439,type:"POST",success:function(data){
jQuery(".voting_candidates").addClass("voted");
jQuery(".voting_candidates .main.voting_header > div").html(data);
jQuery(".voting_candidates .main li a.button").removeClass("green_bg").addClass("disabled").html("Thanks for voting");
}});
}
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _43a=jQuery("input[name="+this.vote_radio_name+"]:checked");
if(_43a.length==0){
return;
}else{
vote=_43a.val();
}
var _43b=jQuery.param({id:this.pollId,vote:vote,hn:hn});
jQuery.ajax({url:"/xml/pollvote.php",data:_43b,type:"POST",success:(function(data){
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
ContentRotator.prototype={initialize:function(ids,_43c,_43d,_43e,_43f,_440,_441,_442,_443,loop,_444){
this.ids=ids;
this.prefix=_43c;
this.interval=_43d;
this.position=0;
this.paused=false;
this.transitionEffect=_43e;
this.transitioning=false;
this.updateFunction=null;
if(_444!==undefined&&jq(_444).length>0){
this.navButtons=jq(_444);
this.firstButton=this.navButtons.find("li").first();
this.firstButton.find("a").addClass("active");
this.renderNavButtons.bind(this);
this.renderNavButtons();
}
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_43f){
this.playId=_43f;
}
if(_440){
this.pauseId=_440;
}
if(_441){
this.positionIndicatorId=_441;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_442){
this.prevId=_442;
}
if(_443){
this.nextId=_443;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},renderNavButtons:function(){
var _445=this.firstButton,_446=_445.find("a"),self=this,_447=this.position;
_446.data("position",_447);
_446.click(function(e){
e.preventDefault();
self.seek(jq(this).data("position"));
});
for(var i=1,l=this.ids.length;i<l;i++){
var _448=_445.clone(true),_449=++_447,_44a=_448.find("a");
_44a.attr("id","button_"+_449);
_44a.removeClass("active");
_44a.data("position",_449);
self.navButtons.append(_448);
}
},update:function(_44b){
if(this.paused||this.activeUpdateThreadId!=_44b){
return;
}
this.next();
this.updateFunction=setTimeout(this.update.bind(this,_44b),this.interval);
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
},seek:function(_44c){
var next=this.position<_44c,_44d=_44c%this.ids.length;
while(_44d<0){
_44d+=this.ids.length;
}
if(this.position==_44d){
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
var _44e=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_44e.toggle();
this.position=_44d;
if(this.fadeTransition){
var _44f=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _44f=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(browser=="IE"&&version<=8){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
jq("#"+this.prefix+this.ids[this.position]).css({display:"inline",visibility:"visible",opacity:1});
}
_44f.options.onComplete=this.endTransition.bind(this);
_44f.hide();
_44f.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=_44d;
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
this.selectCurrentButton(_44c);
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
},selectCurrentButton:function(_450){
if(this.navButtons){
clearTimeout(this.updateFunction);
if(this.interval>0){
this.updateFunction=setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
this.navButtons.find("a[id^=button]").removeClass("active");
jq("#button_"+(_450%this.ids.length)).addClass("active");
}
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_451,_452,_453,_454,_455){
this.typeId=_451;
this.categoryId=_452;
this.userId=_455;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_454;
this.updateTime=_453;
this.originalUpdateTime=_453;
this.currentTime=parseInt(_453,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_456){
_456.preventDefault();
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
var _457=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_457=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_457);
}.bind(this));
},getTimeAgo:function(_458){
if(_458<=1){
return "1 second ago";
}
var _459=Math.round(_458/60);
var _45a=Math.round(_458/3600);
var days=Math.round(_458/86400);
var _45b=Math.round(_458/604800);
var _45c=Math.round(_458/2592000);
var _45d=Math.round(_458/31536000);
var ret="";
if(_45d>=2){
ret=_45d+" years ago";
}else{
if(_45c>=2){
ret=_45c+" months ago";
}else{
if(_45b>=2){
ret=_45b+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_45a>=2){
ret=_45a+" hours ago";
}else{
if(_459>=1){
ret=_459+" minute"+(_459==1?"":"s")+" ago";
}else{
ret=_458+" second"+(_458==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _45e=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_45e;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _45f=parseInt(req.responseText,10);
if(_45f>0){
this.newStoriesAvailable=_45f;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _460=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_460+" "+is+" available (click to load)";
},loadNewStories:function(_461){
var nt=_461?_461:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _462=$(document.createElement("div"));
_462.addClassName("feed_item");
_462.innerHTML=data["render"];
var _463=$("feed_box").down(".feed_item",0);
_463.parentNode.insertBefore(_462,_463);
_462.descendants().each(function(elt){
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
var _464=$(document.createElement("div"));
_464.addClassName("feed_item");
_464.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _465=$("feed_box").down(".feed_item",0);
_465.parentNode.insertBefore(_464,_465);
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
var _466=$(document.createElement("div"));
_466.addClassName("feed_item");
_466.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _467=$("feed_box").down(".feed_item",0);
_467.parentNode.insertBefore(_466,_467);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _468=$(document.createElement("div"));
_468.addClassName("feed_item");
_468.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _469=$("feed_box").down(".feed_item",0);
_469.parentNode.insertBefore(_468,_469);
return;
}
var _46a=$("category_filters");
if(!_46a){
var _46b=$(document.createElement("div"));
_46b.addClassName("feed_setting_box");
_46b.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_46b);
var _46a=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_46a.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_46c,type,id){
new Ajax.Updater(_46c,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_46d,_46e,_46f){
makeGrowable(id,_46d,_46e,_46f);
},makeExpandable:function(id,_470,_471,_472,_473){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_470,_471,_472,null,_473);
return;
}
elt.addClass("expandable_text dimmed").val(_470).data("hasFocus",false);
function _474(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_475,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _476(){
if(_474()){
if(!_472){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_470);
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
if(typeof (_471)=="function"){
_471.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_476();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_476();
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
},saveForm:function(_477){
this.getHandler(_477).save();
return false;
},addStoryToTop:function(_478,id,_479){
var _47a=$(document.createElement("div"));
_47a.innerHTML=_478;
_47a.addClassName("feed_item");
var _47b=$("feed_box").down(".feed_item",0);
_47b.parentNode.insertBefore(_47a,_47b);
_47a.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _47c=new fx.Color(_47a,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_479?_479:function(){
})});
_47c.toggle();
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
var _47d=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_47d.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _47e=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
jq("#category").hpCategorySelector("chooseCategory",0);
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _47f=$("question");
_47f.value="What is your question?";
_47f.setStyle({"color":"#777"});
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
_47e.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _480=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _481=$("subject");
var _482=$("message");
_481.setStyle({"color":"#777"});
_481.value="What is the subject of your forum post?";
_482.value="";
jq("#feed_forum_selector").hpForumSelector("chooseForum",0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_480.toggle();
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
},moreFeed:function(_483){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_483,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _484=JSONstring.toObject(req.responseText);
var _485=$("show_more");
_485.style.display="none";
_485.id="";
var _486=$(document.createElement("div"));
$("feed_box").appendChild(_486);
_486.innerHTML=_484["render"];
var _487=$("feed_more_"+_483);
$$("#feed_more_"+_483+" script").each(function(_488){
safeScriptEval(_488);
});
this.addItems(_484["feed"]);
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
},unhideUser:function(_489){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_489,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_489).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _48a=this.getById(fid);
if(_48a){
_48a.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_489);
if(hu){
if(hu.siblings().size()==0){
var _48b=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_48b.parentNode.insertBefore(p,_48b);
}
_48b.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_48c){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_48c,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_48c).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _48d=this.getById(fid);
if(_48d){
_48d.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_48c);
if(hc){
if(hc.siblings().size()==0){
var _48e=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_48e.parentNode.insertBefore(p,_48e);
}
_48e.remove();
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
var _48f=$("overlay");
_48f.classNames().each(function(name){
if(name!="overlay"){
_48f.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_490){
if(_490){
$("overlay").addClassName(_490);
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
var _491=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_491+"px"});
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
var _492=0;
$("overlay_content").innerHTML=req.responseText;
var _493=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_493+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_494){
var code=_494.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_495){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_495,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_496,_497){
var sure=confirm("Are you sure that you want to stop following "+_497+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_496,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_496).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _498=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_498.each(function(type){
var _499=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_49a){
if(_49a.checked){
_499=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_499){
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
var _49b=jq("#edit_button");
if(_49b.html()=="edit"){
this.toggleFeedPrefs();
}
var _49c=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_49c);
return false;
},toggleFeedPrefs:function(){
var _49d=$("edit_button");
var _49e=$("filter").value;
var _49f="edit";
if(_49d.innerHTML=="save"){
_49f="save";
}
if(_49f=="save"){
this.updateFeedTypeFilters();
var _4a0=0;
var _4a1=$$(".ht_box");
for(var j=0;j<_4a1.length;j++){
if(_4a1[j].checked){
_4a0+=Number(_4a1[j].name.substr(3));
}
}
var _4a2=$("current_prefs");
if(_4a0!=_4a2.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_4a0,filter:_49e,feed:1}).toQueryString(),onComplete:function(){
Element.update(_49d,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _4a3=parseInt(pf.getStyle("height"));
var _4a4=new fx.Height("preference_feedback",{duration:600});
_4a4.hide();
_4a4.custom(0,_4a3);
}});
_4a2.value=_4a0;
}else{
Element.update(_49d,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _4a5=parseInt(pf.getStyle("height"));
var _4a6=new fx.Height("preference_feedback",{duration:600});
_4a6.hide();
_4a6.custom(0,_4a5);
}
}
var curs=$$(".ht_cur");
var _4a7="";
for(var i=0;i<curs.length;i++){
_4a7=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_49f=="edit"){
if(_4a7=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_4a7){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_49f=="edit"){
_49d.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_4a8,_4a9,_4aa){
this.id=id;
this.feedItemId=fid;
this.cdate=_4a8;
this.hidden=_4a9;
this.manager=_4aa;
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
},unhide:function(_4ab){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_4ab){
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
Event.observe(this.triggerId,"click",function(_4ac){
if(Event.element(_4ac).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _4ad=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_4ad){
elt.observe("mouseover",function(_4ae){
_4ae.show();
}.bind(this,_4ad));
elt.observe("mouseout",function(_4af){
_4af.hide();
}.bind(this,_4ad));
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
},share:function(_4b0){
if(_4b0===undefined){
_4b0=false;
}
if(_4b0){
var _4b1=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_4b1){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_4b2,_4b3){
if(_4b2){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_4b3){
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
var _4b4=$(this.htmlId);
_4b4.parentNode.insertBefore(hmsg,_4b4);
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
},hideUser:function(_4b5,_4b6){
_4b6=_4b6?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_4b5,force:_4b6}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _4b7=$(this.htmlId);
_4b7.parentNode.insertBefore(hmsg,_4b7);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_4b5).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_4b8,_4b9){
_4b9=_4b9?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_4b9,categoryId:_4b8}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _4ba=$(this.htmlId);
_4ba.parentNode.insertBefore(hmsg,_4ba);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_4b8).each(function(elt){
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
var _4bb=$("feed_posts_"+this.id).immediateDescendants();
var _4bc=_4bb.size();
_4bb.each(function(elt,_4bd){
if(_4bd==_4bc-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _4be=$("feed_comments_"+this.id).immediateDescendants();
var _4bf=_4be.size();
var _4c0=0;
_4be.each(function(elt,_4c1){
if(elt.hasClassName("show_previous")){
_4c0=_4c1;
}
});
_4be.each(function(elt,_4c2){
if(_4c2==_4c0){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_4c3,num,_4c4){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_4c3,num:num,startpos:_4c4}).toQueryString(),onComplete:function(req){
var _4c5=$("feed_posts_"+this.id);
_4c5.down("div").hide();
new Insertion.Top(_4c5,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_4c6){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_4c6}).toQueryString(),onComplete:function(req){
var _4c7=$("feed_comments_"+this.id);
_4c7.down("div").hide();
new Insertion.Top(_4c7,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_4c8,num,_4c9){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_4c8,num:num,startpos:_4c9}).toQueryString(),onComplete:function(req){
var _4ca=$("feed_comments_"+this.id);
_4ca.down("div").hide();
new Insertion.Top(_4ca,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _4cb=$("feed_comments_"+this.id);
_4cb.innerHTML+=data["render"];
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
},observePostReporting:function(_4cc){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _4cd=$$("#story_"+this.id+" .feed_post");
if(_4cd.size()>1){
_4cd.each(function(elt){
var _4ce=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _4cf=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_4ce]=_4cf;
elt.observe("mouseover",_4cf);
var _4d0=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_4ce]=_4d0;
elt.observe("mouseout",_4d0);
var _4d1=this.manager.reportPost.bind(this.manager,_4ce);
this.clickHandlers[_4ce]=_4d1;
elt.observe("click",_4d1);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _4d2=$(document.createElement("a"));
_4d2.innerHTML="cancel report";
_4d2.href="#";
msg.appendChild(_4d2);
var _4d3=$(this.messageId);
_4d3.innerHTML="";
_4d3.appendChild(msg);
_4d3.addClassName("report_instructions");
var _4d4=parseInt(_4d3.getStyle("height"));
var _4d5=new fx.Height(this.messageId,{duration:500});
_4d5.hide();
_4d5.custom(0,_4d4);
_4d2.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_4cd.size()==1){
var post=_4cd.detect(function(elt){
return true;
});
var _4d6=post.id;
this.manager.reportPost(this.postIdFromDivId(_4d6));
}
}
return false;
},postIdFromDivId:function(_4d7){
return _4d7.substring(_4d7.lastIndexOf("_")+1);
},stopObservePostReporting:function(_4d8){
var _4d9=$$("#story_"+this.id+" .feed_post");
if(_4d9.size()>1){
_4d9.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _4da=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_4da]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_4da]);
elt.stopObserving("click",this.clickHandlers[_4da]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_4d8){
Event.stop(_4d8);
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
function deleteStatus(_4db){
link=jq(_4db.target);
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
function markerMap(m,_4dc,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_4dc);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_4dd,_4de){
this.markers.push(new infoMarker(this,_4dd,_4de,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_4df,_4e0,_4e1,_4e2){
this.markermap=_4df;
this.marker=_4e0;
this.content=_4e1;
this.position=_4e2;
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
var _4e3=$(this.legend.id+"_"+i);
if(_4e3){
_4e3.innerHTML="";
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
var _4e4=this.directionsResult.routes[0];
var legs=_4e4.legs;
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
var _4e5=$(this.legend.id+"_"+i);
if(_4e5){
_4e5.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_4e4.copyrights;
var _4e6="";
for(var j=0;j<_4e4.warnings.length;j++){
_4e6+=_4e4.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_4e6;
};
markerMap.prototype.fetchDirections=function(){
var _4e7=this.markers;
var l=_4e7.length;
var _4e8=new google.maps.LatLng(_4e7[0].marker.getPosition().lat(),_4e7[0].marker.getPosition().lng());
var _4e9=new google.maps.LatLng(_4e7[l-1].marker.getPosition().lat(),_4e7[l-1].marker.getPosition().lng());
var _4ea=[];
for(var i=1;i<l-1;i++){
_4ea.push({location:new google.maps.LatLng(_4e7[i].marker.getPosition().lat(),_4e7[i].marker.getPosition().lng()),stopover:true});
}
var _4eb={origin:_4e8,destination:_4e9,waypoints:_4ea,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _4ec=new google.maps.DirectionsService();
_4ec.route(_4eb,function(_4ed,_4ee){
if(_4ee==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_4ed;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_4ef){
var _4f0="map_canvas_"+id;
var _4f1=mm.getMapById(id);
if(!_4f1){
var map=new google.maps.Map(document.getElementById(_4f0));
var _4f1=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_4f1);
sv=true;
}else{
var map=_4f1.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_4f1.removeAllMarkers();
var _4f2="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _4f3=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_4f3+".png";
var _4f4="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _4f5=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_4f1.addMarker(_4f5,_4f4);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_4f2+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_4f1.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_4f2+="<div id=\""+_4f1.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_4f2+="<div id=\""+_4f1.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_4f1.legend.innerHTML=_4f2;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_4ef||!_4f1.directionsResult){
_4f1.fetchDirections();
}else{
_4f1.renderDirections();
}
}else{
var _4f6={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_4f1.directionsResult=_4f6;
_4f1.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_4f7){
var id=_4f7.markermap.id;
if(!id){
return;
}
var _4f8=mapLetterFromPosition(_4f7.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_4f8+".png";
_4f7.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_4f7.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_4f9){
var id=_4f9.markermap.id;
if(!id){
return;
}
var _4fa=mapLetterFromPosition(_4f9.position);
var icon="http://www.google.com/mapfiles/marker_green"+_4fa+".png";
_4f9.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_4f9.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_4fb,id,_4fc){
var _4fd=mm.getMapById(id);
if(_4fc<_4fd.markers.length){
highlightMarker(_4fd.markers[_4fc]);
}
};
function unhighlightMapMarker(_4fe,id,_4ff){
var _500=mm.getMapById(id);
if(_4ff<_500.markers.length){
unhighlightMarker(_500.markers[_4ff]);
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
var _501=jQuery("#editor_box");
if(_501.hasClass("edit_box")){
jQuery(".message",_501.closest(".postright")).show();
}
_501.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_502,_503){
var ta=jq("#editor_box textarea");
var _504=ta.val();
if(_504.length){
ta.val(_504+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_502,_503)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_502,_503)+"[/img]\n\n");
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
var _505=jQuery("#report_box");
_505.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _506=jQuery(this).closest("div.replies_box_wrapper");
var _507=jQuery(this).closest("div.reply_collapser");
if(_507.hasClass("show")){
_507.addClass("hide").removeClass("show");
jQuery("a",_507).html("<span></span>");
jQuery("> .replies_box",_506).slideDown();
}else{
jQuery("> .replies_box",_506).slideUp(500,function(){
_507.addClass("show").removeClass("hide");
jQuery("a",_507).html("<span></span>"+jQuery("li.threaded",_506).length+" replies");
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
var _508=jQuery(this);
var _509=jQuery("#threaded_reply_to_box");
if(_508.html()=="hide"){
_508.html("this");
_509.hide();
return false;
}
var _50a=_508.attr("class").substr(7);
var _50b=jQuery("#post"+_50a+" .username").html();
var html="<p class=\"by\">By "+_50b+"</p>"+jQuery("#message"+_50a).html();
var _50c=_508.closest("li.threaded");
if(_509.length>0){
_50c.append(_509);
}else{
jQuery(_50c).append("<div id=\"threaded_reply_to_box\"></div>");
_509=jQuery("#threaded_reply_to_box");
}
_509.html(html);
var pos=_508.position();
var _50d=_508.width();
_509.css({"left":(pos.left+_50d)+"px","top":pos.top+"px"});
_509.show();
_508.html("hide");
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
var _50e=jQuery(this);
_50e.attr("src",_50e.data("src"));
});
});
});
function show_post_reply_box(_50f){
jQuery("li.threaded img.wait").remove();
_50f.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _510=jQuery("#editor_box");
_510.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_510).text("submit");
jQuery("form",_510).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_510).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _511=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _512=_511?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_512+="<br/>";
jQuery("textarea",_510).after(_512);
}
if(jQuery("#follow_topic").length==0){
var _513="checked";
var _514=window.location.pathname;
var arr=_514.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _512="<p id=\"follow_topic\"></p>";
jQuery("textarea",_510).after(_512);
}
jQuery("#posterror ul",_510).html("");
jQuery("#posterror",_510).hide();
jQuery("textarea",_510).val("");
jQuery("#postId",_510).val(_50f.attr("id").substring(4));
_510.append(jQuery("#formatting_tips"));
_510.show();
var x=_510.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_515){
jQuery("li.threaded img.wait").remove();
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _516=jQuery("#report_box");
jQuery("#reportPostId",_516).val(_515.attr("id").substring(4));
jQuery("form",_516).ajaxForm({type:"POST",success:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_515).append(_516);
jQuery(">.post_wrap > .actionmenu",_515).append(_516);
_516.show();
var x=_516.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyError(data,_517,_518){
alert("There may have been an error posting your reply ("+_517+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_519,_51a){
alert("There may have been an error updating your post ("+_519+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_51b,_51c){
jQuery("li.threaded img.wait").remove();
if(_51c=="error"){
alert(_51b.responseText);
return;
}
data=eval("("+_51b.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _51d=jQuery("#editor_box");
_51d.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_51d).text("Save");
jQuery("form",_51d).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_51d).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _51e=document.getElementById("admincenter");
replyOptionsHTML=_51e?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_51d).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_51d).html("");
jQuery("#posterror",_51d).hide();
jQuery("#postId",_51d).val(data.postId);
jQuery("textarea",_51d).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_51d.append(jQuery("#formatting_tips"));
_51d.show();
var x=_51d.offset().top-300;
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
function processDeleteResponse(_51f,_520,_521){
if(_520=="error"){
jQuery("li.threaded img.wait").remove();
alert(_51f);
}
};
function processUndeleteResponse(_522,_523,_524){
if(_523=="error"){
jQuery("li.threaded img.wait").remove();
alert(_522);
}
};
function processReportResponse(_525){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _526=jQuery("#report_box");
_526.hide();
alert(_525);
};
(function($){
$.extend($.fn,{validate:function(_527){
if(!this.length){
_527&&_527.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _528=$.data(this[0],"validator");
if(_528){
return _528;
}
_528=new $.validator(_527,this[0]);
$.data(this[0],"validator",_528);
if(_528.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_528.cancelSubmit=true;
});
if(_528.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_528.submitButton=this;
});
}
this.submit(function(_529){
if(_528.settings.debug){
_529.preventDefault();
}
function _52a(){
if(_528.settings.submitHandler){
if(_528.submitButton){
var _52b=$("<input type='hidden'/>").attr("name",_528.submitButton.name).val(_528.submitButton.value).appendTo(_528.currentForm);
}
_528.settings.submitHandler.call(_528,_528.currentForm);
if(_528.submitButton){
_52b.remove();
}
return false;
}
return true;
};
if(_528.cancelSubmit){
_528.cancelSubmit=false;
return _52a();
}
if(_528.form()){
if(_528.pendingRequest){
_528.formSubmitted=true;
return false;
}
return _52a();
}else{
_528.focusInvalid();
return false;
}
});
}
return _528;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _52c=true;
var _52d=$(this[0].form).validate();
this.each(function(){
_52c&=_52d.element(this);
});
return _52c;
}
},removeAttrs:function(_52e){
var _52f={},_530=this;
$.each(_52e.split(/\s/),function(_531,_532){
_52f[_532]=_530.attr(_532);
_530.removeAttr(_532);
});
return _52f;
},rules:function(_533,_534){
var _535=this[0];
if(_533){
var _536=$.data(_535.form,"validator").settings;
var _537=_536.rules;
var _538=$.validator.staticRules(_535);
switch(_533){
case "add":
$.extend(_538,$.validator.normalizeRule(_534));
_537[_535.name]=_538;
if(_534.messages){
_536.messages[_535.name]=$.extend(_536.messages[_535.name],_534.messages);
}
break;
case "remove":
if(!_534){
delete _537[_535.name];
return _538;
}
var _539={};
$.each(_534.split(/\s/),function(_53a,_53b){
_539[_53b]=_538[_53b];
delete _538[_53b];
});
return _539;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_535),$.validator.classRules(_535),$.validator.attributeRules(_535),$.validator.staticRules(_535)),_535);
if(data.required){
var _53c=data.required;
delete data.required;
data=$.extend({required:_53c},data);
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
$.validator=function(_53d,form){
this.settings=$.extend(true,{},$.validator.defaults,_53d);
this.currentForm=form;
this.init();
};
$.validator.format=function(_53e,_53f){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_53e);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_53f.constructor!=Array){
_53f=$.makeArray(arguments).slice(1);
}
if(_53f.constructor!=Array){
_53f=[_53f];
}
$.each(_53f,function(i,n){
_53e=_53e.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _53e;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_540){
this.lastActive=_540;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_540,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_540)).hide();
}
},onfocusout:function(_541){
if(!this.checkable(_541)&&(_541.name in this.submitted||!this.optional(_541))){
this.element(_541);
}
},onkeyup:function(_542){
if(_542.name in this.submitted||_542==this.lastElement){
this.element(_542);
}
},onclick:function(_543){
if(_543.name in this.submitted){
this.element(_543);
}else{
if(_543.parentNode.name in this.submitted){
this.element(_543.parentNode);
}
}
},highlight:function(_544,_545,_546){
$(_544).addClass(_545).removeClass(_546);
},unhighlight:function(_547,_548,_549){
$(_547).removeClass(_548).addClass(_549);
}},setDefaults:function(_54a){
$.extend($.validator.defaults,_54a);
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
var _54b=(this.groups={});
$.each(this.settings.groups,function(key,_54c){
$.each(_54c.split(/\s/),function(_54d,name){
_54b[name]=key;
});
});
var _54e=this.settings.rules;
$.each(_54e,function(key,_54f){
_54e[key]=$.validator.normalizeRule(_54f);
});
function _550(_551){
var _552=$.data(this[0].form,"validator"),_553="on"+_551.type.replace(/^validate/,"");
_552.settings[_553]&&_552.settings[_553].call(_552,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_550).validateDelegate(":radio, :checkbox, select, option","click",_550);
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
for(var i=0,_554=(this.currentElements=this.elements());_554[i];i++){
this.check(_554[i]);
}
return this.valid();
},element:function(_555){
_555=this.clean(_555);
this.lastElement=_555;
this.prepareElement(_555);
this.currentElements=$(_555);
var _556=this.check(_555);
if(_556){
delete this.invalid[_555.name];
}else{
this.invalid[_555.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _556;
},showErrors:function(_557){
if(_557){
$.extend(this.errorMap,_557);
this.errorList=[];
for(var name in _557){
this.errorList.push({message:_557[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_558){
return !(_558.name in _557);
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
var _559=0;
for(var i in obj){
_559++;
}
return _559;
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
var _55a=this.lastActive;
return _55a&&$.grep(this.errorList,function(n){
return n.element.name==_55a.name;
}).length==1&&_55a;
},elements:function(){
var _55b=this,_55c={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_55b.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _55c||!_55b.objectLength($(this).rules())){
return false;
}
_55c[this.name]=true;
return true;
});
},clean:function(_55d){
return $(_55d)[0];
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
},prepareElement:function(_55e){
this.reset();
this.toHide=this.errorsFor(_55e);
},check:function(_55f){
_55f=this.clean(_55f);
if(this.checkable(_55f)){
_55f=this.findByName(_55f.name).not(this.settings.ignore)[0];
}
var _560=$(_55f).rules();
var _561=false;
for(var _562 in _560){
var rule={method:_562,parameters:_560[_562]};
try{
var _563=$.validator.methods[_562].call(this,_55f.value.replace(/\r/g,""),_55f,rule.parameters);
if(_563=="dependency-mismatch"){
_561=true;
continue;
}
_561=false;
if(_563=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_55f));
return;
}
if(!_563){
this.formatAndAdd(_55f,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_55f.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_561){
return;
}
if(this.objectLength(_560)){
this.successList.push(_55f);
}
return true;
},customMetaMessage:function(_564,_565){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_564).metadata()[this.settings.meta]:$(_564).metadata();
return meta&&meta.messages&&meta.messages[_565];
},customMessage:function(name,_566){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_566]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_567,_568){
return this.findDefined(this.customMessage(_567.name,_568),this.customMetaMessage(_567,_568),!this.settings.ignoreTitle&&_567.title||undefined,$.validator.messages[_568],"<strong>Warning: No message defined for "+_567.name+"</strong>");
},formatAndAdd:function(_569,rule){
var _56a=this.defaultMessage(_569,rule.method),_56b=/\$?\{(\d+)\}/g;
if(typeof _56a=="function"){
_56a=_56a.call(this,rule.parameters,_569);
}else{
if(_56b.test(_56a)){
_56a=jQuery.format(_56a.replace(_56b,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_56a,element:_569});
this.errorMap[_569.name]=_56a;
this.submitted[_569.name]=_56a;
},addWrapper:function(_56c){
if(this.settings.wrapper){
_56c=_56c.add(_56c.parent(this.settings.wrapper));
}
return _56c;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _56d=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_56d.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_56d.element,_56d.message);
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
for(var i=0,_56e=this.validElements();_56e[i];i++){
this.settings.unhighlight.call(this,_56e[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_56f,_570){
var _571=this.errorsFor(_56f);
if(_571.length){
_571.removeClass().addClass(this.settings.errorClass);
_571.attr("generated")&&_571.html(_570);
}else{
_571=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_56f),generated:true}).addClass(this.settings.errorClass).html(_570||"");
if(this.settings.wrapper){
_571=_571.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_571).length){
this.settings.errorPlacement?this.settings.errorPlacement(_571,$(_56f)):_571.insertAfter(_56f);
}
}
if(!_570&&this.settings.success){
_571.text("");
typeof this.settings.success=="string"?_571.addClass(this.settings.success):this.settings.success(_571);
}
this.toShow=this.toShow.add(_571);
},errorsFor:function(_572){
var name=this.idOrName(_572);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_573){
return this.groups[_573.name]||(this.checkable(_573)?_573.name:_573.id||_573.name);
},checkable:function(_574){
return /radio|checkbox/i.test(_574.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_575,_576){
return _576.form==form&&_576.name==name&&_576||null;
});
},getLength:function(_577,_578){
switch(_578.nodeName.toLowerCase()){
case "select":
return $("option:selected",_578).length;
case "input":
if(this.checkable(_578)){
return this.findByName(_578.name).filter(":checked").length;
}
}
return _577.length;
},depend:function(_579,_57a){
return this.dependTypes[typeof _579]?this.dependTypes[typeof _579](_579,_57a):true;
},dependTypes:{"boolean":function(_57b,_57c){
return _57b;
},"string":function(_57d,_57e){
return !!$(_57d,_57e.form).length;
},"function":function(_57f,_580){
return _57f(_580);
}},optional:function(_581){
return !$.validator.methods.required.call(this,$.trim(_581.value),_581)&&"dependency-mismatch";
},startRequest:function(_582){
if(!this.pending[_582.name]){
this.pendingRequest++;
this.pending[_582.name]=true;
}
},stopRequest:function(_583,_584){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_583.name];
if(_584&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_584&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_585){
return $.data(_585,"previousValue")||$.data(_585,"previousValue",{old:null,valid:true,message:this.defaultMessage(_585,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_586,_587){
_586.constructor==String?this.classRuleSettings[_586]=_587:$.extend(this.classRuleSettings,_586);
},classRules:function(_588){
var _589={};
var _58a=$(_588).attr("class");
_58a&&$.each(_58a.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_589,$.validator.classRuleSettings[this]);
}
});
return _589;
},attributeRules:function(_58b){
var _58c={};
var _58d=$(_58b);
for(var _58e in $.validator.methods){
var _58f=_58d.attr(_58e);
if(_58f){
_58c[_58e]=_58f;
}
}
if(_58c.maxlength&&/-1|2147483647|524288/.test(_58c.maxlength)){
delete _58c.maxlength;
}
return _58c;
},metadataRules:function(_590){
if(!$.metadata){
return {};
}
var meta=$.data(_590.form,"validator").settings.meta;
return meta?$(_590).metadata()[meta]:$(_590).metadata();
},staticRules:function(_591){
var _592={};
var _593=$.data(_591.form,"validator");
if(_593.settings.rules){
_592=$.validator.normalizeRule(_593.settings.rules[_591.name])||{};
}
return _592;
},normalizeRules:function(_594,_595){
$.each(_594,function(prop,val){
if(val===false){
delete _594[prop];
return;
}
if(val.param||val.depends){
var _596=true;
switch(typeof val.depends){
case "string":
_596=!!$(val.depends,_595.form).length;
break;
case "function":
_596=val.depends.call(_595,_595);
break;
}
if(_596){
_594[prop]=val.param!==undefined?val.param:true;
}else{
delete _594[prop];
}
}
});
$.each(_594,function(rule,_597){
_594[rule]=$.isFunction(_597)?_597(_595):_597;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_594[this]){
_594[this]=Number(_594[this]);
}
});
$.each(["rangelength","range"],function(){
if(_594[this]){
_594[this]=[Number(_594[this][0]),Number(_594[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_594.min&&_594.max){
_594.range=[_594.min,_594.max];
delete _594.min;
delete _594.max;
}
if(_594.minlength&&_594.maxlength){
_594.rangelength=[_594.minlength,_594.maxlength];
delete _594.minlength;
delete _594.maxlength;
}
}
if(_594.messages){
delete _594.messages;
}
return _594;
},normalizeRule:function(data){
if(typeof data=="string"){
var _598={};
$.each(data.split(/\s/),function(){
_598[this]=true;
});
data=_598;
}
return data;
},addMethod:function(name,_599,_59a){
$.validator.methods[name]=_599;
$.validator.messages[name]=_59a!=undefined?_59a:$.validator.messages[name];
if(_599.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_59b,_59c,_59d){
if(!this.depend(_59d,_59c)){
return "dependency-mismatch";
}
switch(_59c.nodeName.toLowerCase()){
case "select":
var val=$(_59c).val();
return val&&val.length>0;
case "input":
if(this.checkable(_59c)){
return this.getLength(_59b,_59c)>0;
}
default:
return $.trim(_59b).length>0;
}
},remote:function(_59e,_59f,_5a0){
if(this.optional(_59f)){
return "dependency-mismatch";
}
var _5a1=this.previousValue(_59f);
if(!this.settings.messages[_59f.name]){
this.settings.messages[_59f.name]={};
}
_5a1.originalMessage=this.settings.messages[_59f.name].remote;
this.settings.messages[_59f.name].remote=_5a1.message;
_5a0=typeof _5a0=="string"&&{url:_5a0}||_5a0;
if(this.pending[_59f.name]){
return "pending";
}
if(_5a1.old===_59e){
return _5a1.valid;
}
_5a1.old=_59e;
var _5a2=this;
this.startRequest(_59f);
var data={};
data[_59f.name]=_59e;
$.ajax($.extend(true,{url:_5a0,mode:"abort",port:"validate"+_59f.name,dataType:"json",data:data,success:function(_5a3){
_5a2.settings.messages[_59f.name].remote=_5a1.originalMessage;
var _5a4=_5a3===true;
if(_5a4){
var _5a5=_5a2.formSubmitted;
_5a2.prepareElement(_59f);
_5a2.formSubmitted=_5a5;
_5a2.successList.push(_59f);
_5a2.showErrors();
}else{
var _5a6={};
var _5a7=_5a3||_5a2.defaultMessage(_59f,"remote");
_5a6[_59f.name]=_5a1.message=$.isFunction(_5a7)?_5a7(_59e):_5a7;
_5a2.showErrors(_5a6);
}
_5a1.valid=_5a4;
_5a2.stopRequest(_59f,_5a4);
}},_5a0));
return "pending";
},minlength:function(_5a8,_5a9,_5aa){
return this.optional(_5a9)||this.getLength($.trim(_5a8),_5a9)>=_5aa;
},maxlength:function(_5ab,_5ac,_5ad){
return this.optional(_5ac)||this.getLength($.trim(_5ab),_5ac)<=_5ad;
},rangelength:function(_5ae,_5af,_5b0){
var _5b1=this.getLength($.trim(_5ae),_5af);
return this.optional(_5af)||(_5b1>=_5b0[0]&&_5b1<=_5b0[1]);
},min:function(_5b2,_5b3,_5b4){
return this.optional(_5b3)||_5b2>=_5b4;
},max:function(_5b5,_5b6,_5b7){
return this.optional(_5b6)||_5b5<=_5b7;
},range:function(_5b8,_5b9,_5ba){
return this.optional(_5b9)||(_5b8>=_5ba[0]&&_5b8<=_5ba[1]);
},email:function(_5bb,_5bc){
return this.optional(_5bc)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_5bb);
},url:function(_5bd,_5be){
return this.optional(_5be)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_5bd);
},date:function(_5bf,_5c0){
return this.optional(_5c0)||!/Invalid|NaN/.test(new Date(_5bf));
},dateISO:function(_5c1,_5c2){
return this.optional(_5c2)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_5c1);
},number:function(_5c3,_5c4){
return this.optional(_5c4)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_5c3);
},digits:function(_5c5,_5c6){
return this.optional(_5c6)||/^\d+$/.test(_5c5);
},creditcard:function(_5c7,_5c8){
if(this.optional(_5c8)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_5c7)){
return false;
}
var _5c9=0,_5ca=0,_5cb=false;
_5c7=_5c7.replace(/\D/g,"");
for(var n=_5c7.length-1;n>=0;n--){
var _5cc=_5c7.charAt(n);
var _5ca=parseInt(_5cc,10);
if(_5cb){
if((_5ca*=2)>9){
_5ca-=9;
}
}
_5c9+=_5ca;
_5cb=!_5cb;
}
return (_5c9%10)==0;
},accept:function(_5cd,_5ce,_5cf){
_5cf=typeof _5cf=="string"?_5cf.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_5ce)||_5cd.match(new RegExp(".("+_5cf+")$","i"));
},equalTo:function(_5d0,_5d1,_5d2){
var _5d3=$(_5d2).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_5d1).valid();
});
return $.trim(_5d0)==$.trim(_5d3.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _5d4={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_5d5,_5d6,xhr){
var port=_5d5.port;
if(_5d5.mode=="abort"){
if(_5d4[port]){
_5d4[port].abort();
}
_5d4[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_5d7){
var mode=("mode" in _5d7?_5d7:$.ajaxSettings).mode,port=("port" in _5d7?_5d7:$.ajaxSettings).port;
if(mode=="abort"){
if(_5d4[port]){
_5d4[port].abort();
}
return (_5d4[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_5d8,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_5d8,_5d9,true);
},teardown:function(){
this.removeEventListener(_5d8,_5d9,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _5d9(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_5da,type,_5db){
return this.bind(type,function(_5dc){
var _5dd=$(_5dc.target);
if(_5dd.is(_5da)){
return _5db.apply(_5dd,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_5de,_5df,_5e0){
return this.optional(_5df)||this.getLength(jq.trim(_5de),_5df)==_5e0;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_5e1,_5e2,_5e3){
if(!this.depend(_5e3,_5e2)){
return "dependency-mismatch";
}
switch(_5e2.nodeName.toLowerCase()){
case "select":
var val=jq(_5e2).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_5e2)){
return this.getLength(_5e1,_5e2)==0;
}
default:
return jq.trim(_5e1).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_5e4,_5e5){
if(!this.depend(_5e5,_5e4)){
return "dependency-mismatch";
}
var _5e6=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_5e6=true;
}else{
var _5e7=ssn.split("-");
if(_5e7[0]=="000"||_5e7[1]=="00"||_5e7[2]=="0000"){
_5e6=true;
}
if(_5e7[0]=="666"){
_5e6=true;
}
var _5e8=parseInt(_5e7[0],10);
if(_5e8>=900){
if(_5e7[1][0]!=7&&_5e7[1][0]!=8){
_5e6=true;
}
}
}
return !_5e6;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_5e9,_5ea,_5eb){
if(!this.depend(_5eb,_5ea)){
return "dependency-mismatch";
}
return _5e9.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_5ec,_5ed){
if(!this.depend(_5ed,_5ec)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_5ee,_5ef,_5f0){
var _5ee=jq.trim(_5ee);
if(_5ee.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _5f1=_5ee.split("-");
var m=1*_5f1[0]-1;
var d=1*_5f1[1];
var y=1*_5f1[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_5f2,_5f3,_5f4){
return jq.trim(_5f2).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
jQuery.validator.addMethod("requiredNoPlaceholder",function(_5f5,_5f6,_5f7){
if(!this.depend(_5f7,_5f6)){
return "dependency-mismatch";
}
if(jq(_5f6).hasClass("placeholder")){
return false;
}
switch(_5f6.nodeName.toLowerCase()){
case "select":
var val=jq(_5f6).val();
return val&&val.length>0;
case "input":
if(this.checkable(_5f6)){
return this.getLength(_5f5,_5f6)>0;
}
default:
return jq.trim(_5f5).length>0;
}
},"This field is required.");
(function(_5f8,$,_5f9){
"use strict";
var _5fa=$.event,_5fb;
_5fa.special.smartresize={setup:function(){
$(this).bind("resize",_5fa.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_5fa.special.smartresize.handler);
},handler:function(_5fc,_5fd){
var _5fe=this,args=arguments;
_5fc.type="smartresize";
if(_5fb){
clearTimeout(_5fb);
}
_5fb=setTimeout(function(){
jQuery.event.handle.apply(_5fe,args);
},_5fd==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_5ff,_600){
this.element=$(_600);
this._create(_5ff);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_601){
var _602=this.options.itemSelector;
return !_602?_601:_601.filter(_602).add(_601.find(_602));
},_getBricks:function(_603){
var _604=this._filterFindBricks(_603).css({position:"absolute"}).addClass("masonry-brick");
return _604;
},_create:function(_605){
this.options=$.extend(true,{},$.Mason.settings,_605);
this.styleQueue=[];
var _606=this.element[0].style;
this.originalStyle={height:_606.height||""};
var _607=this.options.containerStyle;
for(var prop in _607){
this.originalStyle[prop]=_606[prop]||"";
}
this.element.css(_607);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _608=this;
setTimeout(function(){
_608.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_5f8).bind("smartresize.masonry",function(){
_608.resize();
});
}
this.reloadItems();
},_init:function(_609){
this._getColumns();
this._reLayout(_609);
},option:function(key,_60a){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_60b,_60c){
for(var i=0,len=_60b.length;i<len;i++){
this._placeBrick(_60b[i]);
}
var _60d={};
_60d.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _60e=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_60e++;
}
_60d.width=(this.cols-_60e)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_60d});
var _60f=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_610=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_60f](obj.style,_610);
}
this.styleQueue=[];
if(_60c){
_60c.call(_60b);
}
this.isLaidOut=true;
},_getColumns:function(){
var _611=this.options.isFitWidth?this.element.parent():this.element,_612=_611.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_612):this.options.columnWidth||this.$bricks.outerWidth(true)||_612;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_612+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_613){
var _614=$(_613),_615,_616,_617,_618,j;
_615=Math.ceil(_614.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_615=Math.min(_615,this.cols);
if(_615===1){
_617=this.colYs;
}else{
_616=this.cols+1-_615;
_617=[];
for(j=0;j<_616;j++){
_618=this.colYs.slice(j,j+_615);
_617[j]=Math.max.apply(Math,_618);
}
}
var _619=Math.min.apply(Math,_617),_61a=0;
for(var i=0,len=_617.length;i<len;i++){
if(_617[i]===_619){
_61a=i;
break;
}
}
var _61b={top:_619+this.offset.y};
_61b[this.horizontalDirection]=this.columnWidth*_61a+this.offset.x;
this.styleQueue.push({$el:_614,style:_61b});
var _61c=_619+_614.outerHeight(true),_61d=this.cols+1-len;
for(i=0;i<_61d;i++){
this.colYs[_61a+i]=_61c;
}
},resize:function(){
var _61e=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_61e){
this._reLayout();
}
},_reLayout:function(_61f){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_61f);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_620){
this.reloadItems();
this._init(_620);
},appended:function(_621,_622,_623){
if(_622){
this._filterFindBricks(_621).css({top:this.element.height()});
var _624=this;
setTimeout(function(){
_624._appended(_621,_623);
},1);
}else{
this._appended(_621,_623);
}
},_appended:function(_625,_626){
var _627=this._getBricks(_625);
this.$bricks=this.$bricks.add(_627);
this.layout(_627,_626);
},remove:function(_628){
this.$bricks=this.$bricks.not(_628);
_628.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _629=this.element[0].style;
for(var prop in this.originalStyle){
_629[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_5f8).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_62a){
var _62b=this,_62c=_62b.find("img").add(_62b.filter("img")),len=_62c.length,_62d="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_62e=[];
function _62f(){
_62a.call(_62b,_62c);
};
function _630(_631){
var img=_631.target;
if(img.src!==_62d&&$.inArray(img,_62e)===-1){
_62e.push(img);
if(--len<=0){
setTimeout(_62f);
_62c.unbind(".imagesLoaded",_630);
}
}
};
if(!len){
_62f();
}
_62c.bind("load.imagesLoaded error.imagesLoaded",_630).each(function(){
var src=this.src;
this.src=_62d;
this.src=src;
});
return _62b;
};
var _632=function(_633){
if(_5f8.console){
_5f8.console.error(_633);
}
};
$.fn.masonry=function(_634){
if(typeof _634==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _635=$.data(this,"masonry");
if(!_635){
_632("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_634+"'");
return;
}
if(!$.isFunction(_635[_634])||_634.charAt(0)==="_"){
_632("no such method '"+_634+"' for masonry instance");
return;
}
_635[_634].apply(_635,args);
});
}else{
this.each(function(){
var _636=$.data(this,"masonry");
if(_636){
_636.option(_634||{});
_636._init();
}else{
$.data(this,"masonry",new $.Mason(_634,this));
}
});
}
return this;
};
})(window,jQuery);
(function($){
$.expander={version:"1.4.3",defaults:{slicePoint:100,preserveWords:true,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:false,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:true,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null}};
$.fn.expander=function(_637){
var meth="init";
if(typeof _637=="string"){
meth=_637;
_637={};
}
var opts=$.extend({},$.expander.defaults,_637),_638=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,_639=opts.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,_63a=/<\/?(\w+)[^>]*>/g,_63b=/<(\w+)[^>]*>/g,_63c=/<\/(\w+)>/g,_63d=/(<\/[^>]+>)\s*$/,_63e=/^<[^>]+>.?/,_63f;
var _640={init:function(){
this.each(function(){
var i,l,tmp,_641,_642,_643,_644,_645,_646,_647,_648,_649,_64a=[],_64b=[],_64c={},_64d=this,_64e=$(this),_64f=$([]),o=$.extend({},opts,_64e.data("expander")||$.meta&&_64e.data()||{}),_650=!!_64e.find("."+o.detailClass).length,_651=!!_64e.find("*").filter(function(){
var _652=$(this).css("display");
return (/^block|table|list/).test(_652);
}).length,el=_651?"div":"span",_653=el+"."+o.detailClass,_654="span."+o.moreClass,_655=o.expandSpeed||0,_656=$.trim(_64e.html()),_657=$.trim(_64e.text()),_658=_656.slice(0,o.slicePoint);
if($.data(this,"expanderInit")){
return;
}
$.data(this,"expanderInit",true);
$.each(["onSlice","beforeExpand","afterExpand","onCollapse"],function(_659,val){
_64c[val]=$.isFunction(o[val]);
});
_658=_669(_658);
_642=_658.replace(_63a,"").length;
while(_642<o.slicePoint){
_641=_656.charAt(_658.length);
if(_641=="<"){
_641=_656.slice(_658.length).match(_63e)[0];
}
_658+=_641;
_642++;
}
_658=_669(_658,o.preserveWords);
_643=_658.match(_63b)||[];
_644=_658.match(_63c)||[];
tmp=[];
$.each(_643,function(_65a,val){
if(!_638.test(val)){
tmp.push(val);
}
});
_643=tmp;
l=_644.length;
for(i=0;i<l;i++){
_644[i]=_644[i].replace(_63c,"$1");
}
$.each(_643,function(_65b,val){
var _65c=val.replace(_63b,"$1");
var _65d=$.inArray(_65c,_644);
if(_65d===-1){
_64a.push(val);
_64b.push("</"+_65c+">");
}else{
_644.splice(_65d,1);
}
});
_64b.reverse();
if(!_650){
_646=_656.slice(_658.length);
_647=$.trim(_646.replace(_63a,""));
if(_647===""||_647.split(/\s+/).length<o.widow){
return;
}
_645=_64b.pop()||"";
_658+=_64b.join("");
_646=_64a.join("")+_646;
}else{
_646=_64e.find(_653).remove().html();
_658=_64e.html();
_656=_658+_646;
_645="";
}
o.moreLabel=_64e.find(_654).length?"":_668(o);
if(_651){
_646=_656;
}
_658+=_645;
o.summary=_658;
o.details=_646;
o.lastCloseTag=_645;
if(_64c.onSlice){
tmp=o.onSlice.call(_64d,o);
o=tmp&&tmp.details?tmp:o;
}
var html=_665(o,_651);
_64e.html(html);
_648=_64e.find(_653);
_649=_64e.find(_654);
_648[o.collapseEffect](0);
_649.find("a").unbind("click.expander").bind("click.expander",_65e);
_64f=_64e.find("div."+o.summaryClass);
if(o.userCollapse&&!_64e.find("span."+o.lessClass).length){
_64e.find(_653).append("<span class=\""+o.lessClass+"\">"+o.userCollapsePrefix+"<a href=\"#\">"+o.userCollapseText+"</a></span>");
}
_64e.find("span."+o.lessClass+" a").unbind("click.expander").bind("click.expander",function(_65f){
_65f.preventDefault();
clearTimeout(_63f);
var _660=$(this).closest(_653);
_66b(o,_660);
if(_64c.onCollapse){
o.onCollapse.call(_64d,true);
}
});
function _65e(_661){
_661.preventDefault();
_649.hide();
_64f.hide();
if(_64c.beforeExpand){
o.beforeExpand.call(_64d);
}
_648.stop(false,true)[o.expandEffect](_655,function(){
_648.css({zoom:""});
if(_64c.afterExpand){
o.afterExpand.call(_64d);
}
_662(o,_648,_64d);
});
};
});
},destroy:function(){
if(!this.data("expander")){
return;
}
this.removeData("expander");
this.each(function(){
var _663=$(this),o=$.meta?$.extend({},opts,_663.data()):opts,_664=_663.find("."+o.detailClass).contents();
_663.find("."+o.moreClass).remove();
_663.find("."+o.summaryClass).remove();
_663.find("."+o.detailClass).after(_664).remove();
_663.find("."+o.lessClass).remove();
});
}};
if(_640[meth]){
_640[meth].call(this);
}
function _665(o,_666){
var el="span",_667=o.summary;
if(_666){
el="div";
if(_63d.test(_667)&&!o.expandAfterSummary){
_667=_667.replace(_63d,o.moreLabel+"$1");
}else{
_667+=o.moreLabel;
}
_667="<div class=\""+o.summaryClass+"\">"+_667+"</div>";
}else{
_667+=o.moreLabel;
}
return [_667,"<",el+" class=\""+o.detailClass+"\"",">",o.details,"</"+el+">"].join("");
};
function _668(o){
var ret="<span class=\""+o.moreClass+"\">"+o.expandPrefix;
ret+="<a href=\"#\">"+o.expandText+"</a></span>";
return ret;
};
function _669(txt,_66a){
if(txt.lastIndexOf("<")>txt.lastIndexOf(">")){
txt=txt.slice(0,txt.lastIndexOf("<"));
}
if(_66a){
txt=txt.replace(_639,"");
}
return $.trim(txt);
};
function _66b(o,el){
el.stop(true,true)[o.collapseEffect](o.collapseSpeed,function(){
var _66c=el.prev("span."+o.moreClass).show();
if(!_66c.length){
el.parent().children("div."+o.summaryClass).show().find("span."+o.moreClass).show();
}
});
};
function _662(_66d,_66e,_66f){
if(_66d.collapseTimer){
_63f=setTimeout(function(){
_66b(_66d,_66e);
if($.isFunction(_66d.onCollapse)){
_66d.onCollapse.call(_66f,false);
}
},_66d.collapseTimer);
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
var _670=$(this);
$(that).each(function(){
if($(this)[0]!==_670[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_671){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _671=="function"){
_671={success:_671};
}
var _672=this.attr("action");
var url=(typeof _672==="string")?$.trim(_672):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_671=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_671);
var veto={};
this.trigger("form-pre-serialize",[this,_671,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_671.beforeSerialize&&_671.beforeSerialize(this,_671)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_671.semantic);
if(_671.data){
_671.extraData=_671.data;
for(n in _671.data){
if(_671.data[n] instanceof Array){
for(var k in _671.data[n]){
a.push({name:n,value:_671.data[n][k]});
}
}else{
v=_671.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_671.beforeSubmit&&_671.beforeSubmit(a,this,_671)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_671,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_671.type.toUpperCase()=="GET"){
_671.url+=(_671.url.indexOf("?")>=0?"&":"?")+q;
_671.data=null;
}else{
_671.data=q;
}
var _673=this,_674=[];
if(_671.resetForm){
_674.push(function(){
_673.resetForm();
});
}
if(_671.clearForm){
_674.push(function(){
_673.clearForm();
});
}
if(!_671.dataType&&_671.target){
var _675=_671.success||function(){
};
_674.push(function(data){
var fn=_671.replaceTarget?"replaceWith":"html";
$(_671.target)[fn](data).each(_675,arguments);
});
}else{
if(_671.success){
_674.push(_671.success);
}
}
_671.success=function(data,_676,xhr){
var _677=_671.context||_671;
for(var i=0,max=_674.length;i<max;i++){
_674[i].apply(_677,[data,_676,xhr||_673,_673]);
}
};
var _678=$("input:file",this).length>0;
var mp="multipart/form-data";
var _679=(_673.attr("enctype")==mp||_673.attr("encoding")==mp);
if(_671.iframe!==false&&(_678||_671.iframe||_679)){
if(_671.closeKeepAlive){
$.get(_671.closeKeepAlive,_67a);
}else{
_67a();
}
}else{
$.ajax(_671);
}
this.trigger("form-submit-notify",[this,_671]);
return this;
function _67a(){
var form=_673[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_671);
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
var _67b=0;
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
function _67c(){
var t=_673.attr("target"),a=_673.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_673.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_67b=true;
cb();
},s.timeout);
}
var _67d=[];
try{
if(s.extraData){
for(var n in s.extraData){
_67d.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_673.removeAttr("target");
}
$(_67d).remove();
}
};
if(s.forceSync){
_67c();
}else{
setTimeout(_67c,10);
}
var data,doc,_67e=50;
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
if(_67b){
throw "timeout";
}
var _67f=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_67f);
if(!_67f&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_67e){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_680){
var _681={"content-type":s.dataType};
return _681[_680];
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
xhr.responseXML=_682(xhr.responseText);
}
}
data=_684(xhr,s.dataType,s);
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
var _682=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _683=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _684=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_683(data);
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
$.fn.ajaxForm=function(_685){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_685);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_685);
}
}).bind("click.form-plugin",function(e){
var _686=e.target;
var $el=$(_686);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_686=t[0];
}
var form=this;
form.clk=_686;
if(_686.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _687=$el.offset();
form.clk_x=e.pageX-_687.left;
form.clk_y=e.pageY-_687.top;
}else{
form.clk_x=e.pageX-_686.offsetLeft;
form.clk_y=e.pageY-_686.offsetTop;
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
$.fn.formToArray=function(_688){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_688?form.getElementsByTagName("*"):form.elements;
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
if(_688&&form.clk&&el.type=="image"){
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
if(!_688&&form.clk){
var _689=$(form.clk),_68a=_689[0];
n=_68a.name;
if(n&&!_68a.disabled&&_68a.type=="image"){
a.push({name:n,value:_689.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_68b){
return $.param(this.formToArray(_68b));
};
$.fn.fieldSerialize=function(_68c){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_68c);
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
$.fn.fieldValue=function(_68d){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_68d);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_68e){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_68e===undefined){
_68e=true;
}
if(_68e&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _68f=el.selectedIndex;
if(_68f<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_68f+1:ops.length);
for(var i=(one?_68f:0);i<max;i++){
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
$.fn.selected=function(_690){
if(_690===undefined){
_690=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_690;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_690&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_690;
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
$.fn.extend({accordion:function(_691,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _691=="string"){
var _692=$.data(this,"ui-accordion");
_692[_691].apply(_692,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_691));
}
}
});
},activate:function(_693){
return this.accordion("activate",_693);
}});
$.ui.accordion=function(_694,_695){
this.options=_695=$.extend({},$.ui.accordion.defaults,_695);
this.element=_694;
$(_694).addClass("ui-accordion");
if(_695.navigation){
var _696=$(_694).find("a").filter(_695.navigationFilter);
if(_696.length){
if(_696.filter(_695.header).length){
_695.active=_696;
}else{
_695.active=_696.parent().parent().prev();
_696.addClass("current");
}
}
}
_695.headers=$(_694).find(_695.header);
_695.active=_697(_695.headers,_695.active);
if(_695.fillSpace){
var _698=$(_694).parent().height();
_695.headers.each(function(){
_698-=$(this).outerHeight();
});
var _699=0;
_695.headers.next().each(function(){
_699=Math.max(_699,$(this).innerHeight()-$(this).height());
}).height(_698-_699);
}else{
if(_695.autoheight){
var _698=0;
_695.headers.next().each(function(){
_698=Math.max(_698,$(this).outerHeight());
}).height(_698);
}
}
_695.headers.not(_695.active||"").next().hide();
_695.active.parent().andSelf().addClass(_695.selectedClass);
if(_695.event){
$(_694).bind((_695.event)+".ui-accordion",_69a);
}
};
$.ui.accordion.prototype={activate:function(_69b){
_69a.call(this.element,{target:_697(this.options.headers,_69b)[0]});
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
function _69c(_69d,_69e){
return function(){
return _69d.apply(_69e,arguments);
};
};
function _69f(_6a0){
if(!$.data(this,"ui-accordion")){
return;
}
var _6a1=$.data(this,"ui-accordion");
var _6a2=_6a1.options;
_6a2.running=_6a0?0:--_6a2.running;
if(_6a2.running){
return;
}
if(_6a2.clearStyle){
_6a2.toShow.add(_6a2.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_6a2.data],_6a2.change);
};
function _6a3(_6a4,_6a5,data,_6a6,down){
var _6a7=$.data(this,"ui-accordion").options;
_6a7.toShow=_6a4;
_6a7.toHide=_6a5;
_6a7.data=data;
var _6a8=_69c(_69f,this);
_6a7.running=_6a5.size()==0?_6a4.size():_6a5.size();
if(_6a7.animated){
if(!_6a7.alwaysOpen&&_6a6){
$.ui.accordion.animations[_6a7.animated]({toShow:jQuery([]),toHide:_6a5,complete:_6a8,down:down,autoheight:_6a7.autoheight});
}else{
$.ui.accordion.animations[_6a7.animated]({toShow:_6a4,toHide:_6a5,complete:_6a8,down:down,autoheight:_6a7.autoheight});
}
}else{
if(!_6a7.alwaysOpen&&_6a6){
_6a4.toggle();
}else{
_6a5.hide();
_6a4.show();
}
_6a8(true);
}
};
function _69a(_6a9){
var _6aa=$.data(this,"ui-accordion").options;
if(_6aa.disabled){
return false;
}
if(!_6a9.target&&!_6aa.alwaysOpen){
_6aa.active.parent().andSelf().toggleClass(_6aa.selectedClass);
var _6ab=_6aa.active.next(),data={instance:this,options:_6aa,newHeader:jQuery([]),oldHeader:_6aa.active,newContent:jQuery([]),oldContent:_6ab},_6ac=_6aa.active=$([]);
_6a3.call(this,_6ac,_6ab,data);
return false;
}
var _6ad=$(_6a9.target);
if(_6ad.parents(_6aa.header).length){
while(!_6ad.is(_6aa.header)){
_6ad=_6ad.parent();
}
}
var _6ae=_6ad[0]==_6aa.active[0];
if(_6aa.running||(_6aa.alwaysOpen&&_6ae)){
return false;
}
if(!_6ad.is(_6aa.header)){
return;
}
_6aa.active.parent().andSelf().toggleClass(_6aa.selectedClass);
if(!_6ae){
_6ad.parent().andSelf().addClass(_6aa.selectedClass);
}
var _6ac=_6ad.next(),_6ab=_6aa.active.next(),data={instance:this,options:_6aa,newHeader:_6ad,oldHeader:_6aa.active,newContent:_6ac,oldContent:_6ab},down=_6aa.headers.index(_6aa.active[0])>_6aa.headers.index(_6ad[0]);
_6aa.active=_6ae?$([]):_6ad;
_6a3.call(this,_6ac,_6ab,data,_6ae,down);
return false;
};
function _697(_6af,_6b0){
return _6b0!=undefined?typeof _6b0=="number"?_6af.filter(":eq("+_6b0+")"):_6af.not(_6af.not(_6b0)):_6b0===false?$([]):_6af.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_6b1,_6b2){
_6b1=$.extend({easing:"swing",duration:300},_6b1,_6b2);
if(!_6b1.toHide.size()){
_6b1.toShow.animate({height:"show"},_6b1);
return;
}
var _6b3=_6b1.toHide.height(),_6b4=_6b1.toShow.height(),_6b5=_6b4/_6b3;
_6b1.toShow.css({height:0,overflow:"hidden"}).show();
_6b1.toHide.filter(":hidden").each(_6b1.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _6b6=(_6b3-now)*_6b5;
if($.browser.msie||$.browser.opera){
_6b6=Math.ceil(_6b6);
}
_6b1.toShow.height(_6b6);
},duration:_6b1.duration,easing:_6b1.easing,complete:function(){
if(!_6b1.autoheight){
_6b1.toShow.css("height","auto");
}
_6b1.complete();
}});
},bounceslide:function(_6b7){
this.slide(_6b7,{easing:_6b7.down?"bounceout":"swing",duration:_6b7.down?1000:200});
},easeslide:function(_6b8){
this.slide(_6b8,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_6b9,_6ba,wrap,_6bb,_6bc,_6bd,_6be,_6bf,_6c0=0,_6c1={},_6c2=[],_6c3=0,_6c4={},_6c5=[],_6c6=null,_6c7=new Image(),_6c8=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_6c9=/[^\.]\.(swf)\s*$/i,_6ca,_6cb=1,_6cc,_6cd,busy=false,_6ce=20,fx=$.extend($("<div/>")[0],{prop:0}),_6cf=0,_6d0=!$.support.opacity&&!window.XMLHttpRequest,_6d1=function(){
_6b9.hide();
_6c7.onerror=_6c7.onload=null;
if(_6c6){
_6c6.abort();
}
tmp.empty();
},_6d2=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_6d3=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_6d4=function(){
var view=_6d3(),to={},_6d5=_6c4.margin,_6d6=_6c4.autoScale,_6d7=(_6ce+_6d5)*2,_6d8=(_6ce+_6d5)*2,_6d9=(_6c4.padding*2),_6da;
if(_6c4.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_6c4.width))/100)-(_6ce*2);
_6d6=false;
}else{
to.width=_6c4.width+_6d9;
}
if(_6c4.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_6c4.height))/100)-(_6ce*2);
_6d6=false;
}else{
to.height=_6c4.height+_6d9;
}
if(_6d6&&(to.width>(view[0]-_6d7)||to.height>(view[1]-_6d8))){
if(_6c1.type=="image"||_6c1.type=="swf"){
_6d7+=_6d9;
_6d8+=_6d9;
_6da=Math.min(Math.min(view[0]-_6d7,_6c4.width)/_6c4.width,Math.min(view[1]-_6d8,_6c4.height)/_6c4.height);
to.width=Math.round(_6da*(to.width-_6d9))+_6d9;
to.height=Math.round(_6da*(to.height-_6d9))+_6d9;
}else{
to.width=Math.min(to.width,(view[0]-_6d7));
to.height=Math.min(to.height,(view[1]-_6d8));
}
}
to.top=view[3]+((view[1]-(to.height+(_6ce*2)))*0.5);
if(_6c4.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_6ce*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_6c4.minWidth)+(_6ce*2)))*0.5);
}
if(_6c4.autoScale===false){
to.top=Math.max(view[3]+_6d5,to.top);
to.left=Math.max(view[2]+_6d5,to.left);
}
return to;
},_6db=function(_6dc){
if(_6dc&&_6dc.length){
switch(_6c4.titlePosition){
case "inside":
return _6dc;
case "over":
return "<span id=\"fancybox-title-over\">"+_6dc+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_6dc+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_6dd=function(){
var _6de=_6c4.title,_6df=_6cd.width-(_6c4.padding*2),_6e0="fancybox-title-"+_6c4.titlePosition;
$("#fancybox-title").remove();
_6cf=0;
if(_6c4.titleShow===false){
return;
}
_6de=$.isFunction(_6c4.titleFormat)?_6c4.titleFormat(_6de,_6c5,_6c3,_6c4):_6db(_6de);
if(!_6de||_6de===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_6e0+"\" />").css({"width":_6df,"paddingLeft":_6c4.padding,"paddingRight":_6c4.padding}).html(_6de).appendTo("body");
switch(_6c4.titlePosition){
case "inside":
_6cf=$("#fancybox-title").outerHeight(true)-_6c4.padding;
_6cd.height+=_6cf;
break;
case "over":
$("#fancybox-title").css("bottom",_6c4.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_6bb).hide();
},_6e1=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_6c4.enableEscapeButton){
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
if(_6c5.length>1){
wrap.bind("mousewheel.fb",function(e,_6e2){
e.preventDefault();
if(busy||_6e2===0){
return;
}
if(_6e2>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_6c4.showNavArrows){
return;
}
if((_6c4.cyclic&&_6c5.length>1)||_6c3!==0){
_6be.show();
}
if((_6c4.cyclic&&_6c5.length>1)||_6c3!=(_6c5.length-1)){
_6bf.show();
}
},_6e3=function(){
var href,_6e4;
if((_6c5.length-1)>_6c3){
href=_6c5[_6c3+1].href;
if(typeof href!=="undefined"&&href.match(_6c8)){
_6e4=new Image();
_6e4.src=href;
}
}
if(_6c3>0){
href=_6c5[_6c3-1].href;
if(typeof href!=="undefined"&&href.match(_6c8)){
_6e4=new Image();
_6e4.src=href;
}
}
},_6e5=function(){
_6bc.css("overflow",(_6c4.scrolling=="auto"?(_6c4.type=="image"||_6c4.type=="iframe"||_6c4.type=="swf"?"hidden":"auto"):(_6c4.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_6bc.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_6c4.hideOnContentClick){
_6bc.one("click",$.fancybox.close);
}
if(_6c4.hideOnOverlayClick){
_6ba.one("click",$.fancybox.close);
}
if(_6c4.showCloseButton){
_6bd.show();
}
_6e1();
$(window).bind("resize.fb",$.fancybox.center);
if(_6c4.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_6c4.onComplete)){
_6c4.onComplete(_6c5,_6c3,_6c4);
}
busy=false;
_6e3();
},_6e6=function(pos){
var _6e7=Math.round(_6cc.width+(_6cd.width-_6cc.width)*pos),_6e8=Math.round(_6cc.height+(_6cd.height-_6cc.height)*pos),top=Math.round(_6cc.top+(_6cd.top-_6cc.top)*pos),left=Math.round(_6cc.left+(_6cd.left-_6cc.left)*pos);
wrap.css({"width":_6e7+"px","height":_6e8+"px","top":top+"px","left":left+"px"});
_6e7=Math.max(_6e7-_6c4.padding*2,0);
_6e8=Math.max(_6e8-(_6c4.padding*2+(_6cf*pos)),0);
_6bc.css({"width":_6e7+"px","height":_6e8+"px"});
if(typeof _6cd.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_6e9=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_6ea=function(){
var orig=_6c1.orig?$(_6c1.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_6e9(orig);
from={width:(pos.width+(_6c4.padding*2)),height:(pos.height+(_6c4.padding*2)),top:(pos.top-_6c4.padding-_6ce),left:(pos.left-_6c4.padding-_6ce)};
}else{
view=_6d3();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_6eb=function(){
_6b9.hide();
if(wrap.is(":visible")&&$.isFunction(_6c4.onCleanup)){
if(_6c4.onCleanup(_6c5,_6c3,_6c4)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_6c5=_6c2;
_6c3=_6c0;
_6c4=_6c1;
_6bc.get(0).scrollTop=0;
_6bc.get(0).scrollLeft=0;
if(_6c4.overlayShow){
if(_6d0){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_6ba.css({"background-color":_6c4.overlayColor,"opacity":_6c4.overlayOpacity}).unbind().show();
}
_6bc.css("background-color",_6c4.innerColor);
_6cd=_6d4();
_6dd();
if(wrap.is(":visible")){
$(_6bd.add(_6be).add(_6bf)).hide();
var pos=wrap.position(),_6ec;
_6cc={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_6ec=(_6cc.width==_6cd.width&&_6cc.height==_6cd.height);
_6bc.fadeOut(_6c4.changeFade,function(){
var _6ed=function(){
_6bc.html(tmp.contents()).fadeIn(_6c4.changeFade,_6e5);
};
$.event.trigger("fancybox-change");
_6bc.empty().css("overflow","hidden");
if(_6ec){
_6bc.css({top:_6c4.padding,left:_6c4.padding,width:Math.max(_6cd.width-(_6c4.padding*2),1),height:Math.max(_6cd.height-(_6c4.padding*2)-_6cf,1)});
_6ed();
}else{
_6bc.css({top:_6c4.padding,left:_6c4.padding,width:Math.max(_6cc.width-(_6c4.padding*2),1),height:Math.max(_6cc.height-(_6c4.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_6c4.changeSpeed,easing:_6c4.easingChange,step:_6e6,complete:_6ed});
}
});
return;
}
wrap.css("opacity",1);
if(_6c4.transitionIn=="elastic"){
_6cc=_6ea();
_6bc.css({top:_6c4.padding,left:_6c4.padding,width:Math.max(_6cc.width-(_6c4.padding*2),1),height:Math.max(_6cc.height-(_6c4.padding*2),1)}).html(tmp.contents());
wrap.css(_6cc).show();
if(_6c4.opacity){
_6cd.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_6c4.speedIn,easing:_6c4.easingIn,step:_6e6,complete:_6e5});
}else{
_6bc.css({top:_6c4.padding,left:_6c4.padding,width:Math.max(_6cd.width-(_6c4.padding*2),1),height:Math.max(_6cd.height-(_6c4.padding*2)-_6cf,1)}).html(tmp.contents());
wrap.css(_6cd).fadeIn(_6c4.transitionIn=="none"?0:_6c4.speedIn,_6e5);
}
},_6ee=function(){
tmp.width(_6c1.width);
tmp.height(_6c1.height);
if(_6c1.width=="auto"){
_6c1.width=tmp.width();
}
if(_6c1.height=="auto"){
_6c1.height=tmp.height();
}
_6eb();
},_6ef=function(){
busy=true;
_6c1.width=_6c7.width;
_6c1.height=_6c7.height;
$("<img />").attr({"id":"fancybox-img","src":_6c7.src,"alt":_6c1.title}).appendTo(tmp);
_6eb();
},_6f0=function(){
_6d1();
var obj=_6c2[_6c0],href,type,_6f1,str,emb,_6f2,data;
_6c1=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_6c1:$(obj).data("fancybox")));
_6f1=obj.title||$(obj).title||_6c1.title||"";
if(obj.nodeName&&!_6c1.orig){
_6c1.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_6f1===""&&_6c1.orig){
_6f1=_6c1.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_6c1.href||jq(obj).attr("href")||null;
}else{
href=_6c1.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_6c1.type){
type=_6c1.type;
if(!href){
href=_6c1.content;
}
}else{
if(_6c1.content){
type="html";
}else{
if(href){
if(href.match(_6c8)){
type="image";
}else{
if(href.match(_6c9)){
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
_6c1.type=type;
_6c1.href=href;
_6c1.title=_6f1;
if(_6c1.autoDimensions&&_6c1.type!=="iframe"&&_6c1.type!=="swf"){
_6c1.width="auto";
_6c1.height="auto";
}
if(_6c1.modal){
_6c1.overlayShow=true;
_6c1.hideOnOverlayClick=false;
_6c1.hideOnContentClick=false;
_6c1.enableEscapeButton=false;
_6c1.showCloseButton=false;
}
if($.isFunction(_6c1.onStart)){
if(_6c1.onStart(_6c2,_6c0,_6c1)===false){
busy=false;
return;
}
}
tmp.css("padding",(_6ce+_6c1.padding+_6c1.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_6bc.children());
});
switch(type){
case "html":
tmp.html(_6c1.content);
_6ee();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_6bc.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_6ee();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_6c7=new Image();
_6c7.onerror=function(){
_6d2();
};
_6c7.onload=function(){
_6c7.onerror=null;
_6c7.onload=null;
_6ef();
};
_6c7.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_6c1.width+"\" height=\""+_6c1.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_6c1.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_6c1.width+"\" height=\""+_6c1.height+"\""+emb+"></embed></object>";
tmp.html(str);
_6ee();
break;
case "ajax":
_6f2=href.split("#",2);
data=_6c1.ajax.data||{};
if(_6f2.length>1){
href=_6f2[0];
if(typeof data=="string"){
data+="&selector="+_6f2[1];
}else{
data.selector=_6f2[1];
}
}
busy=false;
$.fancybox.showActivity();
_6c6=$.ajax($.extend(_6c1.ajax,{url:href,data:data,error:_6d2,success:function(data,_6f3,_6f4){
if(_6c6.status==200){
tmp.html(data);
_6ee();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_6c1.scrolling+"\" src=\""+_6c1.href+"\"></iframe>").appendTo(tmp);
_6eb();
break;
}
},_6f5=function(){
if(!_6b9.is(":visible")){
clearInterval(_6ca);
return;
}
$("div",_6b9).css("top",(_6cb*-40)+"px");
_6cb=(_6cb+1)%12;
},_6f6=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_6b9=$("<div id=\"fancybox-loading\"><div></div></div>"),_6ba=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_6b9.addClass("fancybox-ie");
}
_6bb=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_6bb.append(_6bc=$("<div id=\"fancybox-inner\"></div>"),_6bd=$("<a id=\"fancybox-close\"></a>"),_6be=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_6bf=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_6bd.click($.fancybox.close);
_6b9.click($.fancybox.cancel);
_6be.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_6bf.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_6d0){
_6ba.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_6b9.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_6bb.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_6f7){
$(this).data("fancybox",$.extend({},_6f7,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_6c2=[];
_6c0=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_6c2.push(this);
}else{
_6c2=$("a[rel="+rel+"], area[rel="+rel+"]");
_6c0=_6c2.index(this);
}
_6f0();
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
_6c2=[];
_6c0=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_6c2=jQuery.merge(_6c2,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_6c2.push(obj);
}
if(_6c0>_6c2.length||_6c0<0){
_6c0=0;
}
_6f0();
};
$.fancybox.showActivity=function(){
clearInterval(_6ca);
_6b9.show();
_6ca=setInterval(_6f5,66);
};
$.fancybox.update=function(rel){
_6c2=$("a[rel="+rel+"], area[rel="+rel+"]");
};
$.fancybox.hideActivity=function(){
_6b9.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_6c3+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_6c3-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_6c5.length>pos){
_6c0=pos;
_6f0();
}
if(_6c4.cyclic&&_6c5.length>1&&pos<0){
_6c0=_6c5.length-1;
_6f0();
}
if(_6c4.cyclic&&_6c5.length>1&&pos>=_6c5.length){
_6c0=0;
_6f0();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_6d1();
if(_6c1&&$.isFunction(_6c1.onCancel)){
_6c1.onCancel(_6c2,_6c0,_6c1);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_6c4&&$.isFunction(_6c4.onCleanup)){
if(_6c4.onCleanup(_6c5,_6c3,_6c4)===false){
busy=false;
return;
}
}
_6d1();
$(_6bd.add(_6be).add(_6bf)).hide();
$("#fancybox-title").remove();
wrap.add(_6bc).add(_6ba).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _6f8(){
_6ba.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_6bc.empty();
if($.isFunction(_6c4.onClosed)){
_6c4.onClosed(_6c5,_6c3,_6c4);
}
_6c5=_6c1=[];
_6c3=_6c0=0;
_6c4=_6c1={};
busy=false;
};
_6bc.css("overflow","hidden");
if(_6c4.transitionOut=="elastic"){
_6cc=_6ea();
var pos=wrap.position();
_6cd={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_6c4.opacity){
_6cd.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_6c4.speedOut,easing:_6c4.easingOut,step:_6e6,complete:_6f8});
}else{
wrap.fadeOut(_6c4.transitionOut=="none"?0:_6c4.speedOut,_6f8);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_6bc.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_6c4.padding*2)+_6cf});
_6bc.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_6d3(),_6f9=_6c4.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_6cf)+(_6ce*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_6ce*2)))*0.5);
to.top=Math.max(view[3]+_6f9,to.top);
to.left=Math.max(view[2]+_6f9,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",innerColor:"inherited",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_6f6();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_6fa){
this._container=jQuery(_6fa);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_6fb){
};
HubPages.Lightbox.f$=function(_6fc){
return jQuery(_6fc,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_6fd){
return jQuery(_6fd,this._container);
};
HubPages.Lightbox.MyPhotos=function(_6fe){
this._container=jQuery(_6fe);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_6ff,_700,_701){
if(_6ff!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_700.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_700.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_700);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_701<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_6ff,_700,_701+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_702){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_702);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_703,_704,_705){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_703[_704]).attr("href");
var _706=href.lastIndexOf("/");
var _707=_706==-1?0:href.slice(_706+1,-4);
this._currentImageId=_707;
jQuery.post("/xml/photos/locations/",{id:_707},jQuery.proxy(function(_708){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_707,_708,0);
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
HubPages.Lightbox.Slideshow=function(_709){
this._id=_709.id;
this._title=_709.title;
this._url=_709.url;
this._type=_709.type;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_709.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_70a){
var id=_70a.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_70a);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_70a.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(_70b,_70c){
var self=this;
if(this._type=="Hub"){
self._start=0;
jQuery.ajax({async:false,data:{id:this._id},dataType:"json",success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
}else{
if(_70b===undefined){
self._start=0;
self._limit=10;
}else{
self._start=_70b;
self._limit=_70c;
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
this._hashHandlerActive=false;
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
jQuery("body").delegate("#fancybox-right, #fancybox-left","click",function(){
this._hashHandlerActive=false;
}.bind(this));
HubPages.Lightbox.Slideshow.loadImages.call(this,data.images);
if(data.related!==undefined){
var _70d=jQuery("<a />").attr("href","#related_slideshows_"+this._id);
_70d.addClass("lightbox").attr("rel","slideshow_"+this._id);
_70d.appendTo(this._container);
var _70e=jQuery("<div />").attr("id","related_slideshows_"+this._id);
_70e.addClass("related_slideshows");
if(data.related.length){
_70e.append("<h2>View These Related Slideshows</h2>");
}else{
_70e.append("<h2>This Hub has no related slideshows</h2>");
}
_70e.appendTo(this._container);
var list=jQuery("<ul />");
_70e.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_70e);
}
var _70f=jQuery("<li />");
_70f.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _710=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),type:"Hub",auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _711=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_711);
_70f.append(linkDiv);
_70f.append("<br />");
var _712=jQuery("<img />").attr("src",item.thumb);
_712.appendTo(_710);
_710.appendTo(_70f);
_710.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
}
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _713=jQuery("<div />").addClass("pinit_wrap");
_713.appendTo(this._socialBar);
var _714=jQuery("<div />").addClass("twitter_wrap");
_714.appendTo(this._socialBar);
var _715=jQuery("<div />").addClass("fb_share_wrap");
_715.appendTo(this._socialBar);
if(this._type=="Hub"){
_714.html(data.social.twitter);
_715.html(data.social.fb_share);
}
this._container.append(this._socialBar.show());
window.onhashchange=function(_716){
if(!this._hashHandlerActive){
this._hashHandlerActive=true;
return false;
}
var hash=window.location.hash.substr(1);
if(hash=="slide-related"){
jQuery(".slideshow a[href*=related_slideshows]").click();
}else{
if(hash.substr(0,5)=="slide"){
imgId=hash.replace("slide","");
jQuery("#slideshow_img_"+imgId).click();
}else{
if(hash==""){
jQuery.fancybox.close();
this._hashHandlerActive=false;
}
}
}
}.bind(this);
this.c$("a.lightbox").fancybox(this.options);
jq(document).trigger("slideshow_loaded");
};
HubPages.Lightbox.Slideshow.loadImages=function(_717){
var _718=this._start;
jQuery.each(_717,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({id:"slideshow_img_"+item.id,href:"#"+this._id+"_"+_718,rel:"slideshow_"+this._id,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._id+"_"+_718}).addClass("content");
div.appendTo(this._container);
var _719=jQuery("<div />");
_719.appendTo(div);
var _71a=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_71a.data("source",item.source);
_71a.appendTo(_719);
_718++;
},this));
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_71b,_71c,_71d,_71e,_71f){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
if(_71f===undefined){
_71f="Normal";
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_71b;
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("20%");
jQuery("body").delegate(_71e,"click",function(e){
var _720=HubPages.Lightbox.Slideshow.defaultHubId,_721="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
jq("#fancybox-wrap").addClass("slide_image");
if(!HubPages.Lightbox.Slideshow._slides[_720]){
HubPages.Lightbox.Slideshow.create({id:_720,title:_71c,url:_71d,type:_71f});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
if(_71f=="Hub"){
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1"),link=jQuery(_721+":has(img[src*=\""+id+"\"])"),_722=jQuery(_721).index(link);
HubPages.Lightbox.Slideshow._slides[_720].init();
if(_722>=0){
jQuery(".slideshow:first > a").eq(_722).click();
}
}else{
jQuery(".slideshow:first > a").eq(0).click();
}
});
jQuery(window).resize(function(){
if(typeof (_723)!="undefined"){
clearTimeout(_723);
}
var _723=setTimeout(function(){
var _724=jQuery("#fancybox-inner > div:visible").attr("id");
if(_724){
jQuery(".slideshow a[href=#"+_724+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._id);
var _725=this._container.size()==0;
if(_725){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_726,_727){
if(!jQuery("#fancybox-outer-title").length){
var _728=jQuery("<div />").attr("id","fancybox-outer-title");
var _729=jQuery("#fancybox-inner");
_729.before(_728);
}
var _72a=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_72a);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_72b,_72c){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
var _72d=jq(window).scrollTop();
window.location.hash="";
jQuery(window).scrollTop(_72d);
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_72e,_72f){
var _730=jQuery(".overlay_image").removeClass("overlay_image").css("visibility","hidden");
_730.siblings("div").remove();
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_731,_732){
jQuery.fancybox.hideActivity();
var _733=_732+1;
if(this._type!="Hub"){
if(_733===1){
jQuery("#fancybox-left").hide();
}else{
if(_733>1){
jQuery("#fancybox-left").show();
}
}
if(_733==(_731.length-1)&&_731.length<this._photoData.total_images){
this.load(_731.length,10);
jQuery.fancybox.update("slideshow_"+this._id);
}
}
if(this._type=="Hub"){
if(_733>=_731.length){
window.location.hash="slide-related";
return;
}
}
var _734=HubPages.Lightbox.f$("#fancybox-inner");
_734.height(_734.height()-70).css("overflow","visible");
var _735=_734.find("> .content img");
var _736=this._photoData.images[_732];
if(this._type!="Hub"){
jQuery("#fancybox-outer-title > a").replaceWith(_736.url_title);
}
window.location.hash="slide"+_736.id;
_735.css({width:"auto",height:"auto",maxWidth:(_734.innerWidth()-60)+"px",maxHeight:(_734.innerHeight()-100)+"px"});
if(_734.innerHeight()>0&&_735.height()>0){
var _737=(_734.innerHeight()-_735.height())/2;
_735.parent().css({width:_735.width(),height:_735.height(),margin:"0px auto",paddingTop:"10px"});
_735.parent().css("margin-top",_737+"px");
_735.css("visibility","visible").addClass("overlay_image");
if(_735.width()>250){
this.loadGoogleAds();
}
}else{
_735.load(function(){
var _738=HubPages.Lightbox.f$("#fancybox-inner");
var _739=_738.find("> .content img");
var _73a=(_738.innerHeight()-_739.height())/2;
_739.parent().css({width:_739.width(),height:_739.height(),margin:"0px auto",paddingTop:"10px"});
_739.parent().css("margin-top",_73a+"px");
_739.css("visibility","visible").addClass("overlay_image");
if(_739.width()>250){
this.loadGoogleAds();
}
}.bind(this));
}
var _73b=jQuery(_731[_732]).attr("rel");
var _73c=jQuery("#"+_73b).find(".content img");
var _73d=(new Date()).getTime()/1000;
var _73e=_73d-this._startTime;
var _73f=this._counter/_73e;
if(this._fireTracking&&_73e>10&&_73f>1){
this._fireTracking=false;
jQuery.ajax({url:"/xml/reporterror.php",type:"POST",data:{error:"Too many slideshow views! Loaded "+this._counter+" slideshow images in "+_73e+" seconds (ratio: "+_73f+")"}});
}
if(this._fireTracking){
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_736.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _740="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_740+="&labels="+escape(this._photoData.quantcastLabel);
}
var _741=new Image();
_741.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_740;
}
if(this._photoData.ctracking){
var _742=new Image();
_742.src=this._photoData.ctracking+"&"+(new Date()).getTime();
}
this._counter++;
}
var _743=HubPages.Lightbox.f$("#fancybox-title");
if(_736.sourceUrl||_736.sourceName){
if(_736.sourceUrl){
var _744="<a href=\""+_736.sourceUrl+"\" target=\"_blank\">"+(_736.sourceName?_736.sourceName:_736.sourceUrl)+"</a>";
}else{
var _744="<b>"+_736.sourceName+"</b>";
}
_743.html(_743.text()+"<br />Source: "+_744);
}
_743.find("div.slideshow-counter").remove();
_743.append(jQuery("<div />").html("Photo "+_733+" of "+this._photoData.total_images).addClass("slideshow-counter"));
if(this._lastIndex!=_732&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_736.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_736.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_736.social.pinit){
this._socialBar.find(".pinit_wrap").html(_736.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_732;
_735.parent("div").after(this._socialBar.show());
};
HubPages.Lightbox.Slideshow.prototype.loadGoogleAds=function(){
};
(function(_745,_746){
var _747=_745.document;
(function(){
var _748=false,_749=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _74a=this.prototype;
_748=true;
var _74b=new this();
_748=false;
for(var name in prop){
_74b[name]=typeof prop[name]=="function"&&typeof _74a[name]=="function"&&_749.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_74a[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _74c(){
if(!_748&&this.init){
this.init.apply(this,arguments);
}
};
_74c.prototype=_74b;
_74c.constructor=_74c;
_74c.extend=arguments.callee;
return _74c;
};
})();
var _74d=JRClass.extend({init:function(_74e,_74f){
if(typeof _74e=="string"){
this.video=_747.getElementById(_74e);
}else{
this.video=_74e;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _74d.options=="object"){
_V_.merge(this.options,_74d.options);
}
if(typeof _74f=="object"){
_V_.merge(this.options,_74f);
}
if(this.getPreloadAttribute()!==_746){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_746){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_746){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_750){
if(this[_750+"Supported"]()){
this[_750+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_751,_752){
this.behaviors[name]=_751;
this.extend(_752);
},activateElement:function(_753,_754){
if(typeof _753=="string"){
_753=_747.getElementById(_753);
}
this.behaviors[_754].call(this,_753);
},errors:[],warnings:[],warning:function(_755){
this.warnings.push(_755);
this.log(_755);
},history:[],log:function(_756){
if(!_756){
return;
}
if(typeof _756=="string"){
_756={type:_756};
}
if(_756.type){
this.history.push(_756.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_756.type);
}
catch(e){
try{
opera.postError(_756.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_757){
if(!localStorage){
return;
}
try{
localStorage[key]=_757;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_74d.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _758=this.video.getAttribute("preload");
if(_758===""||_758==="true"){
return "auto";
}
if(_758==="false"){
return "none";
}
return _758;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _759=this.video.getAttribute("autoplay");
if(_759==="false"){
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
for(var _75a in obj){
if(obj.hasOwnProperty(_75a)){
this[_75a]=obj[_75a];
}
}
}});
_74d.player=_74d.prototype;
_74d.player.extend({flashSupported:function(){
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
var _75b=_74d.flashPlayers[this.options.flashPlayer];
this.extend(_74d.flashPlayers[this.options.flashPlayer].api);
(_75b.init.context(this))();
},getFlashElement:function(){
var _75c=this.video.children;
for(var i=0,j=_75c.length;i<j;i++){
if(_75c[i].className=="vjs-flash-fallback"){
return _75c[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _75d=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_74d.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _74d.getFlashVersion()>=_75d;
}});
_74d.flashPlayers={};
_74d.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_75e){
if(_75e!==_746){
this.element.width=_75e;
this.box.style.width=_75e+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_75f){
if(_75f!==_746){
this.element.height=_75f;
this.box.style.height=_75f+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_74d.player.extend({linksSupported:function(){
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
_74d.merge=function(obj1,obj2,safe){
for(var _760 in obj2){
if(obj2.hasOwnProperty(_760)&&(!safe||!obj1.hasOwnProperty(_760))){
obj1[_760]=obj2[_760];
}
}
return obj1;
};
_74d.extend=function(obj){
this.merge(this,obj,true);
};
_74d.extend({setupAllWhenReady:function(_761){
_74d.options=_761;
_74d.DOMReady(_74d.setup);
},DOMReady:function(fn){
_74d.addToDOMReady(fn);
},setup:function(_762,_763){
var _764=false,_765=[],_766;
if(!_762||_762=="All"){
_762=_74d.getVideoJSTags();
}else{
if(typeof _762!="object"||_762.nodeType==1){
_762=[_762];
_764=true;
}
}
for(var i=0;i<_762.length;i++){
if(typeof _762[i]=="string"){
_766=_747.getElementById(_762[i]);
}else{
_766=_762[i];
}
_765.push(new _74d(_766,_763));
}
return (_764)?_765[0]:_765;
},getVideoJSTags:function(){
var _767=_747.getElementsByTagName("video"),_768=[],_769;
for(var i=0,j=_767.length;i<j;i++){
_769=_767[i];
if(_769.className.indexOf("video-js")!=-1){
_768.push(_769);
}
}
return _768;
},browserSupportsVideo:function(){
if(typeof _74d.videoSupport!="undefined"){
return _74d.videoSupport;
}
_74d.videoSupport=!!_747.createElement("video").canPlayType;
return _74d.videoSupport;
},getFlashVersion:function(){
if(typeof _74d.flashVersion!="undefined"){
return _74d.flashVersion;
}
var _76a=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_76a=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _745.ActiveXObject!="undefined"){
try{
var _76b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_76b){
_76a=parseInt(_76b.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_74d.flashVersion=_76a;
return _74d.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _74d.isIPhone()||_74d.isIPad();
},iOSVersion:function(){
var _76c=navigator.userAgent.match(/OS (\d+)_/i);
if(_76c&&_76c[1]){
return _76c[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _76d=navigator.userAgent.match(/Android (\d+)\./i);
if(_76d&&_76d[1]){
return _76d[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_74d.isIE()){
_747.createElement("video");
}
_745.VideoJS=_745._V_=_74d;
_74d.player.extend({html5Supported:function(){
if(_74d.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_74d.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_74d.isAndroid()){
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
var _76e=this.video.children;
for(var i=0,j=_76e.length;i<j;i++){
if(_76e[i].tagName.toUpperCase()=="SOURCE"){
var _76f=this.video.canPlayType(_76e[i].type)||this.canPlayExt(_76e[i].src);
if(_76f=="probably"||_76f=="maybe"){
this.firstPlayableSource=_76e[i];
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
var _770=src.match(/\.([^\.]+)$/);
if(_770&&_770[1]){
var ext=_770[1].toLowerCase();
if(_74d.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_74d.isIOS()){
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
},playerOnVideoProgress:function(_771){
this.setBufferedFromProgress(_771);
},setBufferedFromProgress:function(_772){
if(_772.total>0){
var _773=(_772.loaded/_772.total)*this.duration();
if(_773>this.values.bufferEnd){
this.values.bufferEnd=_773;
}
}
},iOSInterface:function(){
if(_74d.iOSVersion()<4){
this.forceTheSource();
}
if(_74d.isIPad()){
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
this.poster=_747.createElement("img");
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
var _774=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_774.length;i<j;i++){
if(_774[i].getAttribute("kind")=="subtitles"&&_774[i].getAttribute("src")){
this.subtitlesSource=_774[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_775){
var _776=_775.split("\n"),line="",_777,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_776.length;i++){
line=_V_.trim(_776[i]);
if(line){
_777={id:line,index:this.subtitles.length};
line=_V_.trim(_776[++i]);
time=line.split(" --> ");
_777.start=this.parseSubtitleTime(time[0]);
_777.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_776.length;j++){
line=_V_.trim(_776[++i]);
if(!line){
break;
}
text.push(line);
}
_777.text=text.join("<br/>");
this.subtitles.push(_777);
}
}
},parseSubtitleTime:function(_778){
var _779=_778.split(":"),time=0;
time+=parseFloat(_779[0])*60*60;
time+=parseFloat(_779[1])*60;
var _77a=_779[2].split(/\.|,/);
time+=parseFloat(_77a[0]);
ms=parseFloat(_77a[1]);
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
},currentTime:function(_77b){
if(_77b!==_746){
try{
this.video.currentTime=_77b;
}
catch(e){
this.warning(_74d.warnings.videoNotReady);
}
this.values.currentTime=_77b;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_746){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _77c=this.video.buffered.end(0);
if(_77c>this.values.bufferEnd){
this.values.bufferEnd=_77c;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_77d){
if(_77d!==_746){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_77d)));
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
},width:function(_77e){
if(_77e!==_746){
this.video.width=_77e;
this.box.style.width=_77e+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_77f){
if(_77f!==_746){
this.video.height=_77f;
this.box.style.height=_77f+"px";
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
this.warning(_74d.warnings.videoNotReady);
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
this.docOrigOverflow=_747.documentElement.style.overflow;
_V_.addListener(_747,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_745,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_747.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_747.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_745.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_747.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_74d.player.newBehavior("player",function(_780){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_781){
this.log(_781);
this.log(this.video.error);
},playerOnVideoPlay:function(_782){
this.hasPlayed=true;
},playerOnVideoPause:function(_783){
},playerOnVideoEnded:function(_784){
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
this.each(this.bufferedListeners,function(_785){
(_785.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_786){
this.each(this.currentTimeListeners,function(_787){
(_787.context(this))(_786||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_788){
(_788.context(this))();
});
}});
_74d.player.newBehavior("mouseOverVideoReporter",function(_789){
_V_.addListener(_789,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_789,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_78a){
var _78b=_78a.relatedTarget;
while(_78b&&_78b!==this.box){
_78b=_78b.parentNode;
}
if(_78b!==this.box){
this.hideControlBars();
}
}});
_74d.player.newBehavior("box",function(_78c){
this.positionBox();
_V_.addClass(_78c,"vjs-paused");
this.activateElement(_78c,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_74d.player.newBehavior("poster",function(_78d){
this.activateElement(_78d,"mouseOverVideoReporter");
this.activateElement(_78d,"playButton");
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
var _78e=this.video.getElementsByTagName("img");
if(_78e.length>0){
this.video.poster=_78e[0].src;
}
}
}});
_74d.player.newBehavior("controlBar",function(_78f){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_78f);
_V_.addListener(_78f,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_78f,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_790){
this.mouseIsOverControls=false;
}});
_74d.player.newBehavior("playToggle",function(_791){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_791);
_V_.addListener(_791,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_792){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_793){
this.each(this.elements.playToggles,function(_794){
_V_.removeClass(_794,"vjs-paused");
_V_.addClass(_794,"vjs-playing");
});
},playTogglesOnPause:function(_795){
this.each(this.elements.playToggles,function(_796){
_V_.removeClass(_796,"vjs-playing");
_V_.addClass(_796,"vjs-paused");
});
}});
_74d.player.newBehavior("playButton",function(_797){
_V_.addListener(_797,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_798){
this.play();
}});
_74d.player.newBehavior("pauseButton",function(_799){
_V_.addListener(_799,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_79a){
this.pause();
}});
_74d.player.newBehavior("playProgressBar",function(_79b){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_79b);
},{updatePlayProgressBars:function(_79c){
var _79d=(_79c!==_746)?_79c/this.duration():this.currentTime()/this.duration();
if(isNaN(_79d)){
_79d=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_79d*100,2)+"%";
}
});
}});
_74d.player.newBehavior("loadProgressBar",function(_79e){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_79e);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_74d.player.newBehavior("currentTimeDisplay",function(_79f){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_79f);
},{updateCurrentTimeDisplays:function(_7a0){
if(!this.currentTimeDisplays){
return;
}
var time=(_7a0)?_7a0:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_74d.player.newBehavior("durationDisplay",function(_7a1){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_7a1);
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
_74d.player.newBehavior("currentTimeScrubber",function(_7a2){
_V_.addListener(_7a2,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_7a3,_7a4){
_7a3.preventDefault();
this.currentScrubber=_7a4;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_7a3);
_V_.addListener(_747,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_747,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_7a5){
this.setCurrentTimeWithScrubber(_7a5);
},onCurrentTimeScrubberMouseUp:function(_7a6){
_V_.unblockTextSelection();
_747.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_747.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_7a7){
var _7a8=_V_.getRelativePosition(_7a7.pageX,this.currentScrubber);
var _7a9=_7a8*this.duration();
this.triggerCurrentTimeListeners(0,_7a9);
if(_7a9==this.duration()){
_7a9=_7a9-0.1;
}
this.currentTime(_7a9);
}});
_74d.player.newBehavior("volumeDisplay",function(_7aa){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_7aa);
this.updateVolumeDisplay(_7aa);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_7ab){
var _7ac=Math.ceil(this.volume()*6);
this.each(_7ab.children,function(_7ad,num){
if(num<_7ac){
_V_.addClass(_7ad,"vjs-volume-level-on");
}else{
_V_.removeClass(_7ad,"vjs-volume-level-on");
}
});
}});
_74d.player.newBehavior("volumeScrubber",function(_7ae){
_V_.addListener(_7ae,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_7af,_7b0){
_V_.blockTextSelection();
this.currentScrubber=_7b0;
this.setVolumeWithScrubber(_7af);
_V_.addListener(_747,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_747,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_7b1){
this.setVolumeWithScrubber(_7b1);
},onVolumeScrubberMouseUp:function(_7b2){
this.setVolumeWithScrubber(_7b2);
_V_.unblockTextSelection();
_747.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_747.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_7b3){
var _7b4=_V_.getRelativePosition(_7b3.pageX,this.currentScrubber);
this.volume(_7b4);
}});
_74d.player.newBehavior("fullscreenToggle",function(_7b5){
_V_.addListener(_7b5,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_7b6){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_7b7){
this.positionControlBars();
},fullscreenOnEscKey:function(_7b8){
if(_7b8.keyCode==27){
this.exitFullScreen();
}
}});
_74d.player.newBehavior("bigPlayButton",function(_7b9){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_7b9);
this.activateElement(_7b9,"playButton");
},{bigPlayButtonsOnPlay:function(_7ba){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_7bb){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_7bc){
_7bc.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_7bd){
_7bd.style.display="none";
});
}});
_74d.player.newBehavior("spinner",function(_7be){
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
this.spinners.push(_7be);
},{showSpinners:function(){
this.each(this.spinners,function(_7bf){
_7bf.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_7c0){
_7c0.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_7c1){
_7c1.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_7c1.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_7c2){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_7c3){
this.showSpinners();
},spinnersOnVideoSeeking:function(_7c4){
},spinnersOnVideoSeeked:function(_7c5){
},spinnersOnVideoCanPlay:function(_7c6){
},spinnersOnVideoCanPlayThrough:function(_7c7){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_7c8){
this.showSpinners();
},spinnersOnVideoStalled:function(_7c9){
},spinnersOnVideoSuspend:function(_7ca){
},spinnersOnVideoPlaying:function(_7cb){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_7cc){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_74d.player.newBehavior("subtitlesDisplay",function(_7cd){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_7cd);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _7ce=false,_7cf=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_7cf)?1:0;
while(true){
if(_7cf){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_7ce=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_7ce=i;
break;
}
i++;
}
}
if(_7ce!==false){
this.currentSubtitle=this.subtitles[_7ce];
this.lastSubtitleIndex=_7ce;
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
_74d.extend({addClass:function(_7d0,_7d1){
if((" "+_7d0.className+" ").indexOf(" "+_7d1+" ")==-1){
_7d0.className=_7d0.className===""?_7d1:_7d0.className+" "+_7d1;
}
},removeClass:function(_7d2,_7d3){
if(_7d2.className.indexOf(_7d3)==-1){
return;
}
var _7d4=_7d2.className.split(/\s+/);
_7d4.splice(_7d4.lastIndexOf(_7d3),1);
_7d2.className=_7d4.join(" ");
},createElement:function(_7d5,_7d6){
return this.merge(_747.createElement(_7d5),_7d6);
},blockTextSelection:function(){
_747.body.focus();
_747.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_747.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _7d7=Math.round(secs);
var _7d8=Math.floor(_7d7/60);
_7d8=(_7d8>=10)?_7d8:"0"+_7d8;
_7d7=Math.floor(_7d7%60);
_7d7=(_7d7>=10)?_7d7:"0"+_7d7;
return _7d8+":"+_7d7;
},getRelativePosition:function(x,_7d9){
return Math.max(0,Math.min(1,(x-this.findPosX(_7d9))/_7d9.offsetWidth));
},findPosX:function(obj){
var _7da=obj.offsetLeft;
while(obj=obj.offsetParent){
_7da+=obj.offsetLeft;
}
return _7da;
},getComputedStyleValue:function(_7db,_7dc){
return _745.getComputedStyle(_7db,null).getPropertyValue(_7dc);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_7dd,type,_7de){
if(_7dd.addEventListener){
_7dd.addEventListener(type,_7de,false);
}else{
if(_7dd.attachEvent){
_7dd.attachEvent("on"+type,_7de);
}
}
},removeListener:function(_7df,type,_7e0){
if(_7df.removeEventListener){
_7df.removeEventListener(type,_7e0,false);
}else{
if(_7df.attachEvent){
_7df.detachEvent("on"+type,_7e0);
}
}
},get:function(url,_7e1){
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
var _7e2=new XMLHttpRequest();
_7e2.open("GET",url);
_7e2.onreadystatechange=function(){
if(_7e2.readyState==4&&_7e2.status==200){
_7e1(_7e2.responseText);
}
}.context(this);
_7e2.send();
},trim:function(_7e3){
return _7e3.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_747.readyState==="complete"){
return _74d.onDOMReady();
}
if(_747.addEventListener){
_747.addEventListener("DOMContentLoaded",_74d.DOMContentLoaded,false);
_745.addEventListener("load",_74d.onDOMReady,false);
}else{
if(_747.attachEvent){
_747.attachEvent("onreadystatechange",_74d.DOMContentLoaded);
_745.attachEvent("onload",_74d.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_747.addEventListener){
_747.removeEventListener("DOMContentLoaded",_74d.DOMContentLoaded,false);
_74d.onDOMReady();
}else{
if(_747.attachEvent){
if(_747.readyState==="complete"){
_747.detachEvent("onreadystatechange",_74d.DOMContentLoaded);
_74d.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_74d.DOMIsReady){
fn.call(_747);
}else{
_74d.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_74d.DOMIsReady){
return;
}
if(!_747.body){
return setTimeout(_74d.onDOMReady,13);
}
_74d.DOMIsReady=true;
if(_74d.DOMReadyList){
for(var i=0;i<_74d.DOMReadyList.length;i++){
_74d.DOMReadyList[i].call(_747);
}
_74d.DOMReadyList=null;
}
}});
_74d.bindDOMReady();
Function.prototype.context=function(obj){
var _7e4=this,temp=function(){
return _7e4.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _7e5=this,temp=function(){
var _7e6=this;
return _7e5.call(obj,arguments[0],_7e6);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_7e7){
if(this.hasContext===true){
return this;
}
if(!_7e7){
_7e7=obj;
}
for(var _7e8 in _7e7){
if(_7e7[_7e8]==this){
_7e7[_7e8]=this.evtContext(obj);
_7e7[_7e8].hasContext=true;
return _7e7[_7e8];
}
}
return this.evtContext(obj);
};
if(_745.jQuery){
(function($){
$.fn.VideoJS=function(_7e9){
this.each(function(){
_74d.setup(this,_7e9);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_745.VideoJS=_745._V_=_74d;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_7ea){
var _7eb=((_7ea/15)|0)*15;
if(this.lastLoggedOffset!=_7eb&&!this.paused()){
var _7ec=this.video.id.replace("hp_video_","");
var _7ed=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_7eb,videoId:_7ec,rf:rf,isEmbed:_7ed}});
this.lastLoggedOffset=_7eb;
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
var _7ee=this.video.getAttribute("autostart");
if(_7ee==="false"){
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
var _7ef=document.createElement("div");
_7ef.style.height=videoTopAdjustment+"px";
_7ef.style.background="transparent";
_7ef.id="video_spacer";
v.before(_7ef);
}
var _7f0=v.offset()["top"]+v.outerHeight();
var _7f1=_7f0-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_7f1>0){
var _7f2=document.createElement("div");
_7f2.style.height=_7f1+"px";
_7f2.style.background="transparent";
_7f2.id="sidebar_spacer";
_7f2.className="sidebar_box";
sidebox.after(_7f2);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_7f3,_7f4,_7f5,exts){
jQuery(document).ready(function(){
var _7f6=0;
var _7f7={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_7f3},size_limit:_7f5,queue_limit:_7f4,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_7f8){
if(file.size==_7f8){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_7f9){
try{
var data=JSONstring.toObject(_7f9);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_7f9);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_7f6+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_7fa){
if(!_7f6&&_7fa){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_7f6=0;
},loaded_callback:function(_7fb){
if(_7fb){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _7fc=new imageUploader(_7f7);
});
};
function getHPVideoPlayer(){
var _7fd="talkiesplayer";
return $(_7fd);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _7fe=true;
if(data.percent){
var _7ff=data.percent;
jq("#progress_video_"+vId).width(_7ff+"%");
if(_7ff>90){
_7fe=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_7fe){
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
$.fn.rating=function(_800){
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
var _800=$.extend({},$.fn.rating.options,_800||{});
$.fn.rating.calls++;
this.not(".star-rating-applied").addClass("star-rating-applied").each(function(){
var _801,_802=$(this);
var eid=(this.name||"unnamed-rating").replace(/\[|\]/g,"_").replace(/^\_+|\_+$/g,"");
var _803=$(this.form||document.body);
var _804=_803.data("rating");
if(!_804||_804.call!=$.fn.rating.calls){
_804={count:0,call:$.fn.rating.calls};
}
var _805=_804[eid];
if(_805){
_801=_805.data("rating");
}
if(_805&&_801){
_801.count++;
}else{
_801=$.extend({},_800||{},($.metadata?_802.metadata():($.meta?_802.data():null))||{},{count:0,stars:[],inputs:[]});
_801.serial=_804.count++;
_805=$("<span class=\"star-rating-control\"/>");
_802.before(_805);
_805.addClass("rating-to-be-drawn");
if(_802.attr("disabled")||_802.hasClass("disabled")){
_801.readOnly=true;
}
if(_802.hasClass("required")){
_801.required=true;
}
_805.append(_801.cancel=$("<div class=\"rating-cancel\"><a title=\""+_801.cancel+"\">"+_801.cancelValue+"</a></div>").mouseover(function(){
$(this).rating("drain");
$(this).addClass("star-rating-hover");
}).mouseout(function(){
$(this).rating("draw");
$(this).removeClass("star-rating-hover");
}).click(function(){
$(this).rating("select");
}).data("rating",_801));
}
var star=$("<div class=\"star-rating rater-"+_801.serial+"\"><a title=\""+(this.title||this.value)+"\">"+this.value+"</a></div>");
_805.append(star);
if(this.id){
star.attr("id",this.id);
}
if(this.className){
star.addClass(this.className);
}
if(_801.half){
_801.split=2;
}
if(typeof _801.split=="number"&&_801.split>0){
var stw=($.fn.width?star.width():0)||_801.starWidth;
var spi=(_801.count%_801.split),spw=Math.floor(stw/_801.split);
star.width(spw).find("a").css({"margin-left":"-"+(spi*spw)+"px"});
}
if(_801.readOnly){
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
_801.current=star;
}
if(this.nodeName=="A"){
if($(this).hasClass("selected")){
_801.current=star;
}
}
_802.hide();
_802.change(function(){
$(this).rating("select");
});
star.data("rating.input",_802.data("rating.star",star));
_801.stars[_801.stars.length]=star[0];
_801.inputs[_801.inputs.length]=_802[0];
_801.rater=_804[eid]=_805;
_801.context=_803;
_802.data("rating",_801);
_805.data("rating",_801);
star.data("rating",_801);
_803.data("rating",_804);
});
$(".rating-to-be-drawn").rating("draw").removeClass("rating-to-be-drawn");
return this;
};
$.extend($.fn.rating,{calls:0,focus:function(){
var _806=this.data("rating");
if(!_806){
return this;
}
if(!_806.focus){
return this;
}
var _807=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_806.focus){
_806.focus.apply(_807[0],[_807.val(),$("a",_807.data("rating.star"))[0]]);
}
},blur:function(){
var _808=this.data("rating");
if(!_808){
return this;
}
if(!_808.blur){
return this;
}
var _809=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_808.blur){
_808.blur.apply(_809[0],[_809.val(),$("a",_809.data("rating.star"))[0]]);
}
},fill:function(){
var _80a=this.data("rating");
if(!_80a){
return this;
}
if(_80a.readOnly){
return;
}
this.rating("drain");
this.prevAll().andSelf().filter(".rater-"+_80a.serial).addClass("star-rating-hover");
},drain:function(){
var _80b=this.data("rating");
if(!_80b){
return this;
}
if(_80b.readOnly){
return;
}
_80b.rater.children().filter(".rater-"+_80b.serial).removeClass("star-rating-on").removeClass("star-rating-hover");
},draw:function(){
var _80c=this.data("rating");
if(!_80c){
return this;
}
this.rating("drain");
if(_80c.current){
_80c.current.data("rating.input").attr("checked","checked");
_80c.current.prevAll().andSelf().filter(".rater-"+_80c.serial).addClass("star-rating-on");
}else{
$(_80c.inputs).removeAttr("checked");
}
_80c.cancel[_80c.readOnly||_80c.required?"hide":"show"]();
this.siblings()[_80c.readOnly?"addClass":"removeClass"]("star-rating-readonly");
},select:function(_80d,_80e){
var _80f=this.data("rating");
if(!_80f){
return this;
}
if(_80f.readOnly){
return;
}
_80f.current=null;
if(typeof _80d!="undefined"){
if(typeof _80d=="number"){
return $(_80f.stars[_80d]).rating("select",undefined,_80e);
}
if(typeof _80d=="string"){
$.each(_80f.stars,function(){
if($(this).data("rating.input").val()==_80d){
$(this).rating("select",undefined,_80e);
}
});
}
}else{
_80f.current=this[0].tagName=="INPUT"?this.data("rating.star"):(this.is(".rater-"+_80f.serial)?this:null);
}
this.data("rating",_80f);
this.rating("draw");
var _810=$(_80f.current?_80f.current.data("rating.input"):null);
if((_80e||_80e==undefined)&&_80f.callback){
_80f.callback.apply(_810[0],[_810.val(),$("a",_80f.current)[0]]);
}
},readOnly:function(_811,_812){
var _813=this.data("rating");
if(!_813){
return this;
}
_813.readOnly=_811||_811==undefined?true:false;
if(_812){
$(_813.inputs).attr("disabled","disabled");
}else{
$(_813.inputs).removeAttr("disabled");
}
this.data("rating",_813);
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
var _814,_815;
function _816(elt,_817){
var _818=jq("#creative").is(":checked")?"cw_":"";
var _819=_818+jq(elt).attr("id")+"_"+_817;
var _81a=jq("#"+_819);
if(0==_81a.size()){
var expl;
if(0==_817){
expl="Please choose a rating.";
}else{
if(_817%2==0){
expl="Explanation coming soon.";
}else{
if(1==_817){
expl="Does not even deserve a 2.";
}else{
var _81b=_817-1;
var _81c=_817+1;
var _81d=_81b==8?"an":"a";
var _81e=_81c==8?"an":"a";
expl="Exhibits characteristics between "+_81d+" "+_81b+" and "+_81e+" "+_81c+".";
}
}
}
var _81f="explain_"+jq(elt).attr("id");
_81a=jq("<div id=\""+_819+"\" class=\"rate_explain "+_81f+"\"><p>"+expl+"</p></div>").insertAfter("#default_explain");
}
jq(".rate_explain").hide();
_81a.show();
};
var _820={init:function(_821){
_815=this;
_814=$.extend({reason:false,showExplanations:true,toggleExplanations:true,detailedExplanations:true,onsubmit:false,singleSlider:false},_821);
if(_814.reason){
jq("#rating_submit").parent().before("<div id=\"rating_reason\">"+"<label for=\"reason\">Reasons for ratings:</label>"+"<textarea id=\"reason\"></textarea>"+"</div>");
}
if(_814.toggleExplanations){
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
jq(_815).slideUp(800,function(){
if(!jq(_815).data("rated")){
jq("#open_hub_rating").fadeIn();
}
});
return false;
});
jq("#open_hub_rating").click(function(){
jq(_815).find(".rate_explain").hide();
jq("#default_explain").show();
jq(this).hide();
jq(_815).slideDown(1000);
return false;
});
jq(".hub_rating_slider").slider({min:0,max:10,step:1,value:0,range:"min",slide:function(_822,ui){
var _823=ui.value==0?"?":ui.value;
jq(_822.target).prev(".head_two").children("strong").text(_823);
if(_814.showExplanations){
_816(_822.target,_814.detailedExplanations?ui.value:0);
}
},change:function(_824,ui){
var _825=ui.value==0?"?":ui.value;
jq(_824.target).prev(".head_two").children("strong").text(_825);
}}).mouseenter(function(_826){
if(_814.showExplanations){
_816(_826.currentTarget,_814.detailedExplanations?jq(_826.currentTarget).slider("value"):0);
}
});
if(_814.showExplanations&&!_814.detailedExplanations){
jq(".hub_rating_slider").mouseleave(function(_827){
jq(".rate_explain").hide();
jq("#default_explain").show();
});
}
jq("#rating_submit").click(function(){
var d=new Date();
if(!jq(this).data("lock")||jq(this).data("lock")<d.getTime()-4000){
jq(this).data("lock",d.getTime());
var _828={isCreative:jq("#creative").is(":checked")?1:0,substance:jq("#substance").size()?jq("#substance").slider("value"):0,organization:jq("#organization").size()?jq("#organization").slider("value"):0,mechanics:jq("#mechanics").size()?jq("#mechanics").slider("value"):0,quality:jq("#quality").size()?jq("#quality").slider("value"):0,reason:jq.trim(jq("#reason").val())};
if(!_814.singleSlider&&(0==_828.substance||0==_828.organization||0==_828.mechanics)){
alert(_828.isCreative?_814.creativeRatingMissingMessage:_814.ratingMissingMessage);
return false;
}else{
if(_814.singleSlider&&0==_828.quality){
alert(_814.ratingMissingMessage);
return false;
}else{
if(_814.reason&&!_828.reason){
alert(_814.reasonMissingMessage);
return false;
}
}
}
jq(_815).data("rated",true);
if(typeof _814.onsubmit=="function"){
_814.onsubmit.apply(_815,[_828]);
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
$.fn.hubrating=function(_829){
if(_820[_829]){
return _820[_829].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _829==="object"||!_829){
return _820.init.apply(this,arguments);
}else{
$.error("Method "+_829+" does not exist on jQuery.hubrating");
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
function _82a(){
var _82b="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _82c="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _82d="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_82b),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_82d),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_82c),"gm"),css:"keyword bold"}];
};
_82a.prototype=new SyntaxHighlighter.Highlighter();
_82a.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_82a;
typeof (exports)!="undefined"?exports.Brush=_82a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _82e(){
var _82f="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _830(_831,_832){
var css=(_831[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_831[0],_831.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_830},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_82f),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_82e.prototype=new SyntaxHighlighter.Highlighter();
_82e.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_82e;
typeof (exports)!="undefined"?exports.Brush=_82e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _833(){
function _834(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _835(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _836="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _837="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _838="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_834(_836),"gm"),css:"keyword"},{regex:new RegExp(_835(_837),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_838),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_833.prototype=new SyntaxHighlighter.Highlighter();
_833.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_833;
typeof (exports)!="undefined"?exports.Brush=_833:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _839(){
var _83a="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_83a),"gmi"),css:"keyword"}];
};
_839.prototype=new SyntaxHighlighter.Highlighter();
_839.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_839;
typeof (exports)!="undefined"?exports.Brush=_839:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _83b(){
function _83c(_83d,_83e){
var _83f=SyntaxHighlighter.Match,code=_83d[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_840=[];
if(_83d.attributes!=null){
var _841,_842=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_841=_842.exec(code))!=null){
_840.push(new _83f(_841.name,_83d.index+_841.index,"color1"));
_840.push(new _83f(_841.value,_83d.index+_841.index+_841[0].indexOf(_841.value),"string"));
}
}
if(tag!=null){
_840.push(new _83f(tag.name,_83d.index+tag[0].indexOf(tag.name),"keyword"));
}
return _840;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_83c}];
};
_83b.prototype=new SyntaxHighlighter.Highlighter();
_83b.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_83b;
typeof (exports)!="undefined"?exports.Brush=_83b:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _843(){
var _844="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_844),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_843.prototype=new SyntaxHighlighter.Highlighter();
_843.aliases=["java"];
SyntaxHighlighter.brushes.Java=_843;
typeof (exports)!="undefined"?exports.Brush=_843:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _845(){
var _846="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_846),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_845.prototype=new SyntaxHighlighter.Highlighter();
_845.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_845;
typeof (exports)!="undefined"?exports.Brush=_845:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _847(){
var _848="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _849="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _84a="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_848),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_84a),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_849),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_847.prototype=new SyntaxHighlighter.Highlighter();
_847.aliases=["php"];
SyntaxHighlighter.brushes.Php=_847;
typeof (exports)!="undefined"?exports.Brush=_847:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _84b(){
var _84c="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _84d="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _84e="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_84d),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_84c),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_84e),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_84b.prototype=new SyntaxHighlighter.Highlighter();
_84b.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_84b;
typeof (exports)!="undefined"?exports.Brush=_84b:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _84f(){
var _850="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _851="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_850),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_851),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_84f.prototype=new SyntaxHighlighter.Highlighter();
_84f.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_84f;
typeof (exports)!="undefined"?exports.Brush=_84f:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _852(){
var _853="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _854="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _855="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_853),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_855),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_854),"gmi"),css:"keyword"}];
};
_852.prototype=new SyntaxHighlighter.Highlighter();
_852.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_852;
typeof (exports)!="undefined"?exports.Brush=_852:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _856(){
var _857="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_857),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_856.prototype=new SyntaxHighlighter.Highlighter();
_856.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_856;
typeof (exports)!="undefined"?exports.Brush=_856:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _858(){
function _859(_85a,_85b){
var _85c=SyntaxHighlighter.Match,code=_85a[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_85d=[];
if(_85a.attributes!=null){
var _85e,_85f=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_85e=_85f.exec(code))!=null){
_85d.push(new _85c(_85e.name,_85a.index+_85e.index,"color1"));
_85d.push(new _85c(_85e.value,_85a.index+_85e.index+_85e[0].indexOf(_85e.value),"string"));
}
}
if(tag!=null){
_85d.push(new _85c(tag.name,_85a.index+tag[0].indexOf(tag.name),"keyword"));
}
return _85d;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_859}];
};
_858.prototype=new SyntaxHighlighter.Highlighter();
_858.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_858;
typeof (exports)!="undefined"?exports.Brush=_858:null;
})();
function ClojureRegExp(_860){
_860=_860+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_860,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _861,_862;
while(_861=this.regex.exec(str)){
_862=str.substring(0,_861.index);
if(this.lookBehind.test(_862)){
return _861;
}else{
this.regex.lastIndex=_861.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _863=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_864="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_865){
_865=_865.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_865=_865.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_865+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_863)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_864)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _866(){
var _867="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _868="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_867),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_868),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_866.prototype=new SyntaxHighlighter.Highlighter();
_866.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_866;
typeof (exports)!="undefined"?exports.Brush=_866:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _869(){
var _86a="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _86b="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_86a),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_86b),"gm"),css:"functions"}];
};
_869.prototype=new SyntaxHighlighter.Highlighter();
_869.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_869;
typeof (exports)!="undefined"?exports.Brush=_869:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _86c(){
var _86d="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_86d),"gm"),css:"keyword"}];
};
_86c.prototype=new SyntaxHighlighter.Highlighter();
_86c.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_86c;
typeof (exports)!="undefined"?exports.Brush=_86c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _86e(){
var _86f="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _870="void boolean byte char short int long float double";
var _871="null";
var _872="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_86f),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_870),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_871),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_872),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_86e.prototype=new SyntaxHighlighter.Highlighter();
_86e.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_86e;
typeof (exports)!="undefined"?exports.Brush=_86e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _873(){
var _874="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _875="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_874),"gm"),css:"keyword"},{regex:new RegExp(_875,"gm"),css:"keyword"}];
};
_873.prototype=new SyntaxHighlighter.Highlighter();
_873.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_873;
typeof (exports)!="undefined"?exports.Brush=_873:null;
})();
(function($){
$.fn.starrating=function(_876){
var _876=$.extend({},$.fn.starrating.options,_876||{});
return this.each(function(){
var o=$.meta?$.extend({},_876,$this.data()):_876;
var url=this.action,_877,_878,_879;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _87a=div.find("div.star");
var _87b=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_87a.mouseover(_87c).focus(_87c).mouseout(_87d).blur(_87d).click(_87e);
_87b.mouseover(_87f).focus(_87f).mouseout(_880).blur(_880).click(_87e);
}else{
_881(div);
}
_882();
function init(elem){
_877=$(elem).attr("title").split(/:\s*/)[1],_878=_877.split(".")[0],_879=_877.split(".")[1];
};
function _87c(){
_883();
fill(this);
};
function _87d(){
_883();
_882();
};
function _880(){
_882();
$(this).removeClass("on");
};
function _87f(){
_883();
$(this).addClass("on");
};
function _881(elem){
_87a.unbind();
_87b.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _884=$(this).attr("title");
var _885="Average Rating: "+_877;
$(this).attr("title",_884.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_885).replace("Cancel Rating",_885));
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
function _87e(){
if(_87a.index(this)==-1&&!o.cancelSubmit){
return false;
}
_878=_87a.index(this)+1;
_879=0;
if(_878==0){
_883();
}
var _886=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_886},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _887=$("div."+o.ratingClass);
init(_887);
_87d();
if(o.disableOnSubmit){
_881(_887);
}
}});
}else{
o.success(_886);
}
return false;
};
function fill(elem){
_87a.find("a").css("width","100%");
$(_87a[_87a.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _883(){
_87a.removeClass("on hover");
};
function _882(){
$(_87a[_878-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _888=_879?_879*10:0;
if(_888>0){
$(_87a[_878]).addClass("on").children("a").css("width",_888+"%");
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
var _889="<span class=\"read_more\">+ More</span>";
function _88a(){
jq(this).find("span.details").css({display:"inline"});
};
jq("body.newprofile #profile_header div.bio_container").expander({slicePoint:450,widow:8,expandText:_889,userCollapseText:"",expandSpeed:0,afterExpand:_88a});
jq(".contentitem_listing.text_content > li").each(function(i,el){
el=jq(el);
var _88b=el.find("h3").first();
if(_88b.height()>100){
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
var ProfileManager=function(_88c,_88d,_88e,_88f,_890){
this.userId=_88c;
this.userName=_88d;
this.loggedInUserId=_88e;
this.currentSection="mycontent";
this.defaultTab="hubs_items";
this.containerSectionDiv=jq("#profile_content_container");
this.profileContainer=_88f;
this.loadMoreBtn=this.profileContainer.find("#load_more_btn");
this.spinnerDiv=_890;
this.allowedSections=["mycontent","activity","followers","following","fanmail","email","bio"];
this.moreRequest=this.profileContainer.data("moreRequest");
this.moreTopic=this.profileContainer.data("moreTopic");
this.moreArticle=this.profileContainer.data("moreArticle");
this.bindEvents();
HubPages.Lightbox.Slideshow.init(this.userId,"","","ul.profile_links > li.recent_images");
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
jq("#pagination").hide();
var _891=window.location.href,hash=window.location.hash;
if(window.location.href.match(/filter=|page=/)){
if(hash){
parent.location.href=_891.match(/^.*new/)[0]+hash;
}else{
parent.location.href=_891.match(/^.*new/)[0];
}
}
if(hash){
this.loadSectionByHashTag(hash);
}else{
var _892=this.activateAvailableTag(this.defaultTab);
("undefined"!=typeof content_items)?content_items.activate(_892):false;
this.showLoadMoreButton();
ProfileManager.prototype.applyMasonry(jq("#content_"+this.defaultTab+">.contentitem_listing"));
}
jq("div.categoryTeaser").each(function(){
var _893=jq(this).find("img"),_894=_893.height(),_895=_893.width(),_896=300,_897=240,_898=_894/_895,_899=_897/_896,_89a=_896,_89b=_897;
if(_898<_899){
_89a=_895/_894*_897;
}else{
if(_898>_899){
_89b=_894/_895*_896;
}
}
_893.css({"position":"relative","height":_89b+"px","width":_89a+"px"});
var _89c=((_893.height()-_897)*0.4)*-1,_89d=((_893.width()-_896)/2)*-1;
_893.css({"top":_89c+"px","left":_89d+"px"});
});
};
ProfileManager.prototype.activateAvailableTag=function(_89e){
if(jq("#"+_89e+"_item").length>0){
return _89e;
}else{
var _89f=jq("#section_mycontent > div.content_items > ul.content_list:parent");
if(_89f.length>0){
return _89f.parent().attr("id").replace(/content_/,"");
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
var _8a0=this.containerSectionDiv.find("> div:visible");
switch(this.currentSection){
case "mycontent":
var _8a1=jq(".content_nav ul#tabs li.active");
if(_8a1.length>0){
var _8a2=_8a1.attr("id").replace(/_items_item/,"");
if(this.moreContent(_8a2)){
if(!_8a0.find("div.content_items:visible").first().data("no_content")){
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
if(!_8a0.find("#following_people").data("no_content")||!_8a0.find("#following_topics").data("no_content")){
_8a0.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
break;
default:
if(this.currentSection!="activity"){
var _8a3=this.getDivSection(this.currentSection);
if(!_8a3.data("no_content")){
_8a0.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}
}
};
ProfileManager.prototype.loadSectionByHashTag=function(_8a4){
if(_8a4){
var _8a5=_8a4.replace("#",""),_8a6=this.defaultTab,_8a7="";
if(_8a5.match(/^slide/)){
jq("ul.profile_links > li.recent_images").trigger("click");
}else{
if(_8a5.match(/^mycontent_.*_hubs$/)||_8a5.match(/^mycontent_.*_forums$/)||_8a5.match(/^mycontent_.*_answers$/)){
var _8a8=_8a5.replace(/^mycontent_|_[a-z]+$/g,""),tab=_8a5.match(/[a-z]+$/),_8a9=jq("#"+tab+"_topic_menu li");
for(var i=0,l=_8a9.length;i<l;i++){
if(jq(_8a9[i]).attr("data-hash")==_8a8){
_8a6=tab+"_items";
_8a7=this.activateAvailableTag(_8a6);
("undefined"!=typeof content_items)?content_items.activate(_8a7):false;
jq(_8a9[i]).trigger("click");
break;
}
}
}else{
if(this.isValidSection(_8a5)){
jq("a[href=#"+this.currentSection+"]").parent().removeClass("active");
this.currentSection=_8a5;
if(this.currentSection=="email"){
this.currentSection="fanmail";
}
if(this.currentSection=="bio"){
if(jq("#read_bio").length>0){
jq("#read_bio").trigger("click");
}
}else{
this.loadSection(this.currentSection,function(){
if(_8a5=="email"){
if(this.profileContainer.data("send_email")=="1"){
this.openFancyBox("#email_to_user");
}
}
});
}
}
}
}
_8a7=this.activateAvailableTag(_8a6);
("undefined"!=typeof content_items)?content_items.activate(_8a7):false;
this.showLoadMoreButton();
}
};
ProfileManager.prototype.isValidSection=function(_8aa){
var _8ab=false;
for(i in this.allowedSections){
if(this.allowedSections[i]==_8aa){
_8ab=true;
break;
}
}
return _8ab;
};
ProfileManager.prototype.loadContentOnScroll=function(){
var _8ac=jq(window),_8ad=jq("#footer_wrap"),pos=_8ac.scrollTop(),_8ae=jq("#profile_header"),_8af=_8ae.offset().top,_8b0=jq(window).scrollTop()>=(jq(document).height()-jq(window).height()-30),_8b1=jq("#profile_content_container > div:visible"),_8b2=(_8b1.length>0)?_8b1.attr("id").replace(/section_/,""):"",_8b3=[],_8b4=jq(".content_nav ul#tabs li.active"),_8b5="";
if(_8b2=="mycontent"){
if(_8b4.length==0){
return;
}
_8b5=_8b4.attr("id").replace(/_items_item/,"");
}
if(_8b2=="following"){
_8b3.push(jq("#following_people"));
_8b3.push(jq("#following_topics"));
}else{
if(this.getDivSection(_8b2)){
_8b3.push(this.getDivSection(_8b2));
}
}
_8b3.each(jq.proxy(function(_8b6){
if(!this.moreContent(_8b5)){
return;
}
if(!_8b6.data("no_content")){
if(_8b6.data("loading")){
return;
}
if((_8ac.scrollTop()+_8ac.height())>=(jq(document).height()-1)){
setTimeout(jQuery.proxy(function(){
this.loadContent(_8b6,_8b2,_8b5);
},this),300);
}
}
},this));
};
ProfileManager.prototype.moreContent=function(_8b7){
if((_8b7=="answers"&&this.moreRequest==="1")||(_8b7=="hubs"&&this.moreArticle==="1")||(_8b7=="forums"&&this.moreTopic==="1")){
return true;
}else{
if((_8b7=="answers"&&this.moreRequest==="0")||(_8b7=="hubs"&&this.moreArticle==="0")||(_8b7=="forums"&&this.moreTopic==="0")){
return false;
}
}
};
ProfileManager.prototype.loadContent=function(_8b8,_8b9,_8ba){
var _8bb=jq(".newprofile #show_only").data("categoryId")||"all";
var page;
if(_8b8.data("next")){
page=_8b8.data("next");
}else{
page=(0==_8b8.children("ul").first().children().size())?1:2;
}
this.loadMoreBtn.hide();
if(jq("#spinner_loading").length>0){
_8bc=jq("#spinner_loading");
}else{
var _8bd=jq("#footer_wrap").height();
var _8bc=jq("<div/>",{"id":"spinner_loading",}).html(jq(this.spinnerDiv));
}
_8bc.show();
_8b8.parent().append(_8bc);
_8b8.parent().find("#spinner_loading > img.spinner").show();
if(_8b9=="following"){
_8b9=_8b8.attr("id");
}
var _8be={section:_8b9,userId:this.userId,activeTab:_8ba,categoryId:_8bb,ajax:1};
if(page>1){
_8be.page=page;
}
_8b8.data("loading",true);
jq.get(this.profileContainer.data("loadMoreUrl"),_8be,jq.proxy(function(data,_8bf,xhr){
_8bc.hide();
if(_8b9=="fanmail"){
var _8c0=jq(data.render);
jq.each(_8c0,function(){
if(jq("#"+jq(this).attr("id")).length===0){
_8b8.append(this);
}
});
}else{
var _8c1="";
jq.each(data.render,function(id,val){
if(_8b8.find("#"+id).length===0){
_8c1+=val;
}
});
var _8c2=false;
if(_8b9=="mycontent"){
var ul=_8b8.find("ul");
if(ul.hasClass("masonry")){
var _8c3=jq(_8c1);
ul.append(_8c3).masonry("appended",_8c3);
}else{
_8c2=true;
ul.append(_8c1);
}
}else{
_8b8.append(_8c1);
}
if(_8c2){
ProfileManager.prototype.applyMasonry(ul);
}
}
if(data.more){
jq(document).data("no_content_all",false);
_8b8.data("next",page+1);
this.loadMoreBtn.show();
}else{
jq(document).data("no_content_all",true);
_8b8.data("no_content",true);
}
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
_8b8.data("loading",false);
},this),"json");
};
ProfileManager.prototype.dismissSimilarUser=function(self){
var _8c4=jq(this).parent(),_8c5=_8c4.attr("id").replace(/similar_user_/,""),_8c6=jq("div.similar_users_box"),_8c7=_8c6.find(".last_similar_user");
if(_8c7.length===0){
firstUserId=_8c6.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
}else{
firstUserId=_8c7.attr("id").replace(/similar_user_/,"");
}
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:self.userId,userId:_8c5,firstUserId:firstUserId,action:"dismiss"},success:jq.proxy(function(data){
_8c4.fadeOut("slow",function(){
if(_8c4.parent().find(".similar_user:visible").length==0){
_8c4.parent().parent().fadeOut("slow",function(){
jq(this).remove();
});
}
if(data.render!=""){
_8c6.find(".last_similar_user").each(function(){
jq(this).removeClass("last_similar_user");
});
_8c4.replaceWith(data.render);
jq("#"+jq(data.render).attr("id")).addClass("last_similar_user");
_8c6.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_8c6.find(".similar_user").length<3){
self.loadSingleSimilarUser();
}
}
jq(this).remove();
});
},this)});
};
ProfileManager.prototype.loadSingleSimilarUser=function(){
var _8c8=jq("div.similar_users_box"),_8c9=_8c8.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:this.userId,firstUserId:_8c9},success:jq.proxy(function(data){
if(data.render!=""){
_8c8.find("div.content_box_i").append(data.render);
_8c8.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}
if(_8c8.find(".similar_user").length<3){
this.loadSingleSimilarUser();
}
},this)});
};
ProfileManager.prototype.loadSimilarUsers=function(num){
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{userId:this.userId,num:num,action:"load"},success:jq.proxy(function(data){
var _8ca=jq("div.similar_users_box"),_8cb=_8ca.find(".similar_user").length;
if(data.render!=""){
_8ca.find("div.content_box_i").append(data.render);
_8ca.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_8ca.find(".similar_user").length<3&&data.more){
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
var _8cc=new RegExp(window.location.hash.replace(/slide|#/g,""),"i");
jq.each(jq(".slideshow img"),function(){
if(_8cc.test(jq(this).attr("src"))){
var href=jq(this).parents(".content").attr("id");
jq("a[href=#"+href+"]").trigger("click");
}
});
});
self.loadMoreBtn.live("click",function(){
var _8cd=jq("#profile_content_container > div:visible"),_8ce=(_8cd.length>0)?_8cd.attr("id").replace(/section_/,""):"",_8cf=[],_8d0=jq(".content_nav ul#tabs li.active"),_8d1="";
if(_8ce=="mycontent"){
if(_8d0.length==0){
return;
}
_8d1=_8d0.attr("id").replace(/_items_item/,"");
_8cf.push(_8cd.find("div.content_items:visible").first());
}else{
if(_8ce=="followers"){
_8cf.push(_8cd.find("div").first());
}else{
if(_8ce=="following"){
_8cf.push(jq("#following_people"));
_8cf.push(jq("#following_topics"));
}else{
if(_8ce=="fanmail"){
_8cf.push(_8cd.find("#fanmail_content"));
}
}
}
}
_8cf.each(function(_8d2){
if(!_8d2.data("no_content")){
if(_8d2.data("loading")){
return;
}
self.loadContent(_8d2,_8ce,_8d1);
}else{
self.loadMoreBtn.hide();
}
});
});
jq("#read_bio").live("click",function(e){
var _8d3=jq(this).closest("div");
e.preventDefault();
_8d3.html(jq("img.spinner").first());
_8d3.hide();
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
var _8d4=jq(this).find("a").text();
jq.each(jq(this).parent().find("li"),function(){
jq(this).removeClass("active");
});
self.loadSection(_8d4);
});
var _8d5=jq(".newprofile div.content_nav ul.filter_by_topic"),_8d6=jq(".newprofile #show_only"),_8d7="#section_mycontent .content_items:visible",_8d8=jq("ul.filter_by_topic li"),_8d9=false;
_8d6.click(function(){
if(!_8d9){
var _8da=jq(".content_nav #tabs .active").attr("id").replace(/_items_item/,"");
ulFilters=jq("#"+_8da+"_topic_menu");
ulFilters.attr("tabindex",-1);
setTimeout(function(){
ulFilters.focus();
},0);
if(ulFilters.is(":visible")){
ulFilters.hide();
_8d6.find("span").removeClass("active");
}else{
ulFilters.show();
_8d6.find("span").addClass("active");
}
var _8db=ulFilters.offset().left,_8dc=_8d6.offset().left,_8dd=(_8db-_8dc)+11;
ulFilters.css("right",parseFloat(ulFilters.css("right"))+_8dd+"px");
_8d9=false;
}
});
_8d5.bind("blur",function(e){
_8d9=true;
jq(this).hide();
_8d6.find("span").removeClass("active");
setTimeout(function(){
_8d9=false;
},500);
});
_8d8.click(function(){
var _8de=jq(this).attr("data-id"),_8df=jq(".content_nav ul#tabs li.active");
if(_8df.length>0){
var _8e0=jq(".content_nav ul#tabs li.active").attr("id").replace(/_items_item/,""),_8e1=jq(this).text();
_8df.data("categoryId",_8de);
jq(_8d7).find("ul").html(jq(self.spinnerDiv));
jq(_8d7).data("loading",true);
loadCategoryContent("mycontent",_8de,_8e0,function(res){
var _8e2=jq(_8d7).find("ul");
_8e2.find("img.spinner").hide();
ProfileManager.prototype.destroyMasonry(_8e2);
jq.each(res.render,function(id,val){
if(_8e2.find("#"+id).length===0){
_8e2.append(val);
}
});
ProfileManager.prototype.applyMasonry(_8e2);
jq(_8d7).removeData("next");
if(res.more){
jq(_8d7).data("no_content",false);
jq(document).data("no_content_all",false);
}else{
jq(document).data("no_content_all",true);
jq(_8d7).data("no_content",true);
}
_8d6.data("categoryId",_8de);
_8d6.data(getUrlHashTagVersion(_8e1),_8de);
_8d6.html("<span></span><strong>Show</strong>: "+_8e1);
jq(_8d7).data("loading",false);
loadHashTag(_8e0);
self.showLoadMoreButton();
});
_8d6.attr("tabindex",-1);
_8d6.focus();
_8d5.hide();
_8d6.find("span").removeClass("active");
}
});
};
ProfileManager.prototype.openFancyBox=function(_8e3,_8e4){
var el=jq(_8e3);
jq.fancybox({"href":_8e3,onStart:function(){
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
ProfileManager.prototype.getDivSection=function(_8e5){
var _8e6,_8e7=jq("#section_"+_8e5);
if(_8e5=="mycontent"){
_8e6=_8e7.find("div.content_items:visible").first();
}else{
if(_8e5=="followers"){
_8e6=_8e7.find("div").first();
}else{
if(_8e5=="fanmail"){
_8e6=_8e7.find("#fanmail_content");
}
}
}
return _8e6;
};
ProfileManager.prototype.loadSection=function(_8e8,_8e9){
this.currentSection=_8e8.replace(/\s/,"").toLowerCase();
if(this.currentSection=="myactivity"){
this.currentSection="activity";
}
var _8ea="section_"+this.currentSection,isCr=typeof cr,_8eb=jq("#profile_content_container"),_8ec=_8eb.offset().top,_8ed=jq(this.spinnerDiv);
var _8ee=jq("a[href=#"+this.currentSection+"]");
if(_8ee.length>0){
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
}
if(_8ea!="section_mycontent"&&jq("#teaser").length>0&&isCr!="undefined"){
cr.pause();
}
jq("div[id^=section_]").hide();
if(jq("#"+_8ea).length>0){
jq("#"+_8ea).show();
if(_8ea=="section_mycontent"){
ProfileManager.prototype.applyMasonry(jq("#content_hubs_items > .contentitem_listing"));
}
this.showLoadMoreButton();
}else{
var _8ef=_8eb.find("img.spinner");
if(_8ef.length==0){
_8eb.append(_8ed);
}
_8ef.show();
jq.post("/xml/profile/profile_section.php",{section:this.currentSection,userId:this.userId},jq.proxy(function(res){
var data=jQuery.parseJSON(res),_8f0;
_8eb.find(".spinner").hide();
if(data.render){
_8f1.call(this,data);
}else{
jq.each(data,jQuery.proxy(function(i,el){
_8f1.call(this,el);
},this));
}
function _8f1(el){
if(jq("#"+_8ea).length===0){
_8f0=jq("<div/>",{id:_8ea,"class":"psection"});
}else{
_8f0=jq("#"+_8ea);
}
_8f0.append(el.render).appendTo("#profile_content_container");
if(!el.more&&this.currentSection!="activity"){
if(this.currentSection==="following"){
_8f0.find("#"+el.section).data("no_content",true);
}else{
this.getDivSection(this.currentSection).data("no_content",true);
}
}
};
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_8ea=="section_fanmail"){
var _8f2=jq("#email_to_user");
if(_8f2.length>0){
jq(".lightbox").fancybox({onStart:function(){
window.location.hash="#email";
_8f2.show();
},onClosed:function(){
_8f2.hide();
_8f2.find("#success_message_email").hide();
_8f2.find("#email").show();
_8f2.find("h3").show();
},onComplete:function(e){
_8f2.css("overflow-x","hidden");
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
var _8f3=jq("#success_message_email");
_8f3.html(messaging);
_8f3.siblings("#email").fadeOut("slow",function(){
jq("#email_to_user h3").hide();
_8f3.show();
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
var _8f4=$("fanmailadd");
Element.update(_8f4,req.responseText);
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
(_8e9!=undefined)?_8e9.call(this):false;
},this));
}
};

