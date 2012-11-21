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
var _1d6=jQuery(this).data("linkId");
if(_1d6){
jQuery("#"+_1d6).data("sticky",1);
}
}).live("mouseout",function(_1d7){
var hpts=jQuery(_1d7.relatedTarget).closest("#HPT");
if(hpts.size()==0){
var _1d8=jQuery(this).data("linkId");
if(_1d8){
jQuery("#"+_1d8).data("sticky",0);
}
setTimeout(function(){
tip_remove(_1d8);
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
function tip_remove(_1d9){
var _1da=jQuery("#HPT").data("linkId");
if(_1d9!=_1da){
return;
}
var _1db=jQuery("#"+_1d9).data("sticky");
if(!_1db){
jQuery("#HPT").remove();
}
};
function tip_show(url,_1dc,_1dd,_1de){
if(jQuery("#HPT").size()){
jQuery("#HPT").remove();
}
if(_1dd==false&&_1de){
_1dd="&nbsp;";
}
var de=document.documentElement;
var w=self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
var _1df=getElementWidth(_1dc);
var _1e0=w-getAbsoluteLeft(_1dc)-_1df;
var _1e1=getAbsoluteLeft(_1dc);
var _1e2=getAbsoluteTop(_1dc)-3;
var _1e3=url.replace(/^[^\?]+\??/,"");
var _1e4=parseQuery(_1e3);
if(_1e4["width"]===undefined){
_1e4["width"]=250;
}
if(_1e4["link"]!==undefined){
jQuery("#"+_1dc).bind("click",function(){
window.location=_1e4["link"];
});
jQuery("#"+_1dc).css("cursor","pointer");
}
var _1e5=_1de?" <a href='#' class='close' onclick='jQuery(\"#HPT\").remove(); return false;'>x</a>":"";
var _1e6=_1e4["css"]?" class='"+_1e4["css"]+"'":"";
var _1e7;
var _1e8=false;
if(_1e4["dir"]!==undefined){
_1e7=_1e4["dir"];
}else{
if(_1e0>(_1e4["width"]*1+11)){
_1e7="right";
}else{
if(_1e0+_1df*0.3>(_1e4["width"]*1+11)){
_1e7="right";
_1e8=true;
}else{
if(_1e1>(_1e4["width"]*1+11)){
_1e7="left";
}else{
_1e7="right";
_1e8=true;
}
}
}
}
var _1e9=_1e7=="left"?"right":"left";
var _1ea=_1dd?"<div id='HPT_close_"+_1e9+"'>"+_1dd+_1e5+"</div>":"";
var _1eb=_1e7=="left"?"style='left:"+((_1e4["width"]*1)+1)+"px"+"'":"";
jQuery("#container").append("<div id='HPT' style='width:"+_1e4["width"]*1+"px'"+_1e6+"><div id='HPT_arrow_"+_1e9+"' "+_1eb+"></div>"+_1ea+"<div id='HPT_copy'><div class='HPT_loader'><div></div></div>");
if(_1e7=="right"){
var _1eb=_1df+11;
if(_1e8){
var _1ec=getAbsoluteLeft(_1dc)+_1eb-_1df*0.3;
}else{
var _1ec=getAbsoluteLeft(_1dc)+_1eb;
}
}else{
var _1ec=getAbsoluteLeft(_1dc)-((_1e4["width"]*1)+15);
}
var _1ed=jQuery("#container").offset();
_1ec-=_1ed.left;
_1e2-=_1ed.top;
jQuery("#HPT").css({left:_1ec+"px",top:_1e2+"px"});
jQuery("#HPT").data("linkId",_1dc);
jQuery("#HPT").show();
jQuery("#HPT_copy").load(url);
};
function getElementWidth(_1ee){
x=document.getElementById(_1ee);
return x.offsetWidth;
};
function getAbsoluteLeft(_1ef){
o=document.getElementById(_1ef);
oLeft=o.offsetLeft;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oLeft+=oParent.offsetLeft;
o=oParent;
}
return oLeft;
};
function getAbsoluteTop(_1f0){
o=document.getElementById(_1f0);
oTop=o.offsetTop;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oTop+=oParent.offsetTop;
o=oParent;
}
return oTop;
};
function parseQuery(_1f1){
var _1f2=new Object();
if(!_1f1){
return _1f2;
}
var _1f3=_1f1.split(/[;&]/);
for(var i=0;i<_1f3.length;i++){
var _1f4=_1f3[i].split("=");
if(!_1f4||_1f4.length!=2){
continue;
}
var key=unescape(_1f4[0]);
var val=unescape(_1f4[1]);
val=val.replace(/\+/g," ");
_1f2[key]=val;
}
return _1f2;
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
Form.Element.setValue=function(_1f5,_1f6){
element_id=_1f5;
_1f5=$(_1f5);
if(!_1f5){
_1f5=document.getElementsByName(element_id)[0];
}
if(!_1f5){
return false;
}
var _1f7=_1f5.tagName.toLowerCase();
var _1f8=Form.Element.SetSerializers[_1f7](_1f5,_1f6);
};
Form.Element.SetSerializers={input:function(_1f9,_1fa){
switch(_1f9.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.SetSerializers.textarea(_1f9,_1fa);
case "checkbox":
return Form.Element.SetSerializers.checkbox(_1f9,_1fa);
case "radio":
return Form.Element.SetSerializers.inputSelector(_1f9,_1fa);
}
return false;
},checkbox:function(_1fb,_1fc){
if(_1fc==0||_1fc==null||_1fc==""){
_1fb.checked=false;
}else{
_1fb.checked=true;
}
},inputSelector:function(_1fd,_1fe){
fields=document.getElementsByName(_1fd.name);
for(var i=0;i<fields.length;i++){
if(fields[i].value==_1fe){
fields[i].checked=true;
}
}
},textarea:function(_1ff,_200){
_1ff.value=_200;
},select:function(_201,_202){
var _203="",opt,_204=_201.selectedIndex;
for(var i=0;i<_201.options.length;i++){
if(_201.options[i].value==_202){
_201.selectedIndex=i;
return true;
}
}
}};
var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_205){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_205||{});
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
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_206){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_206);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _207=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_207);
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
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_208){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_208);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_209){
if(_209==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_209*100+")";
}
this.el.style.opacity=_209;
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
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_20a){
this.setOptions(_20a);
},scrollTo:function(el){
var dest=Position.cumulativeOffset($(el))[1]-20;
var _20b=window.innerHeight||document.documentElement.clientHeight;
var full=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(dest+_20b>full){
this.custom(top,dest-_20b+(full-dest));
}else{
this.custom(top,dest);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_20c){
this.el=$(el);
this.setOptions(_20c);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_20d){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_20d||{});
},initialize:function(el,_20e){
this.el=$(el);
this.setOptions(_20e);
if(this.options.opacity){
this.o=new fx.Opacity(el,_20e);
_20e.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_20e);
_20e.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_20e);
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
fx.Accordion.prototype={setOptions:function(_20f){
this.options={delay:100,opacity:false};
Object.extend(this.options,_20f||{});
},initialize:function(_210,_211,_212){
this.elements=_211;
this.setOptions(_212);
var _212=_212||"";
_211.each(function(el,i){
_212.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_212);
el.fx.hide();
});
_210.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_211[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_213){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_213){
this.clearAndToggle(el);
}
}.bind(this));
if(_213.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_213);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_214){
this.el=$(el);
this.days=365;
this.options=_214;
this.effect();
var _215=this.readCookie();
if(_215){
this.fx.now=_215;
this.fx.increase();
}
},setCookie:function(_216){
var date=new Date();
date.setTime(date.getTime()+(this.days*24*60*60*1000));
var _217="; expires="+date.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_216+_217+"; path=/";
},readCookie:function(){
var _218=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_218)==0){
return c.substring(_218.length,c.length);
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
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_219){
this.el=$(el);
this.setOptions(_219);
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
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_21a){
this.el=$(el);
this.setOptions(_21a);
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
var _21b=navigator.userAgent.toLowerCase();
var _21c=_21b.indexOf("msie")+1;
if(_21c){
version=_21b.charAt(_21c+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_21b.indexOf("mobile")>-1;
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
toggleOverlay.setElementVisibility=function(_21d){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_21d;
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
var _21e=$(id);
if(_21e){
return _21e;
}
_21e=document.createElement("div");
_21e.id=id;
this.wrapper.appendChild(_21e);
return _21e;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _21f=$(id);
if(_21f){
return _21f;
}
_21f=document.createElement("iframe");
_21f.id=id;
_21f.src="";
_21f.frameBorder="no";
_21f.scrolling="no";
document.body.appendChild(_21f);
return _21f;
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
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_220){
this.restore=_220;
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
var _221=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var curr=out.length;
if(!_221){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(curr,out.length-curr);
}else{
_221=false;
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
jq(document).ajaxError(function(e,_222,_223,_224){
if(_222.getAllResponseHeaders()){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
jq.post("/xml/reporterror.php",{status:_222.status,response:_222.responseText,url:_223.url});
}
});
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
var _225=req.getAllResponseHeaders();
jq.post("/xml/reporterror.php",{headers:_225,error:1});
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
var _226=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_226.hide();
}
},showIcon:function(id){
if(jq.active>0||(this.prototypeAvailable()&&Ajax.activeRequestCount>0)){
var _227=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_227.css("display","inline");
}
},onReady:function(){
jq(document).ready(function(){
var _228=jq("body").get(0);
var _229=(typeof (_228.contentEditable)!="undefined");
var _22a=(window.screen.width>1000||window.screen.height>1000);
if(_229&&_22a){
var _22b=new Date();
_22b.setDate(_22b.getDate()+30);
var sep=(document.cookie.length>0)?";":"";
document.cookie="istablet=likely; expires="+_22b.toUTCString()+"; path=/";
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
function checkIt(_22c){
place=detect.indexOf(_22c)+1;
thestring=_22c;
return place;
};
function ssToId(id,_22d){
var _22d=_22d||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_22d);
return false;
};
function ssOnload(){
var _22e=location.hash.slice(1);
if(_22e=="comments"){
ssToId("comFirst");
}else{
if(_22e.substr(0,8)=="comment-"){
ssToId("comment"+_22e.substr(8));
}else{
if(_22e.substr(0,5)=="slide"){
openSlideshowOnLoad();
}else{
if("rate"==_22e){
}else{
if(_22e!=null&&_22e){
ssToId(_22e);
}
}
}
}
}
};
function fetchRecaptcha(_22f){
var _230="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _231=document.getElementsByTagName("head")[0];
var _232=document.createElement("script");
_232.type="text/javascript";
_232.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_232.onload=function(){
Recaptcha.create(_230,_22f,{theme:"red"});
};
_232.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_230,_22f,{theme:"red"});
}
};
_231.appendChild(_232);
}else{
Recaptcha.create(_230,_22f,{theme:"red"});
}
};
function check_signed_in_ajax(_233,_234){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_235,_236){
_233(eval(_235.responseText),_234);
}});
};
function whenSignedIn(_237,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_237,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_238,info){
if(_238){
info.fn.apply(null,info.args);
}else{
var url;
if("undefined"!=typeof (info.options.utm_source)){
url="/xml/signinupform.php?utm_source="+info.options.utm_source;
}else{
url="/xml/signinupform.php";
}
showFancyAjaxOverlay(url,info.options,"",{width:380,height:300,innerColor:"#e4e7e0",onComplete:function(){
var _239="undefined"==typeof (info.options.captchaId)?"captcha_div":info.options.captchaId;
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha(_239);
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
function insertVideo(type,key,css,_23a,_23b,_23c){
var _23d="<div class=\"video\">";
var mode="opaque";
if(_23b){
mode="transparent";
}
if(_23c=="bad"){
_23d="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_23d+="<embed style=\""+_23a+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
var _23e="http://";
if(document.location.protocol=="https:"){
_23e="https://";
}
_23d+="<embed style=\""+_23a+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\""+_23e+"www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_23d+="<embed style=\""+_23a+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_23d+="<embed style=\""+_23a+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
_23d+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+mode+"\"></embed></object>";
}else{
if(type=="YahooSports"){
_23d+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_23d+="<embed style=\""+_23a+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_23d+="<embed style=\""+_23a+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_23d+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_23d+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_23d+="</div>";
if(_23b){
jq("#"+_23b).html(_23d);
}else{
if(type!="New"){
document.write(_23d);
}
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_23f){
if(_23f===undefined){
_23f=false;
}
if(_23f){
var _240=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_240){
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
function praiseHub(id,val,_241){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,style:_241?_241:0},function(){
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
function answerFeedback(_242,val,done){
jq.post("/xml/answervote.php",{id:_242,vote:val},done);
return false;
};
function toggleShareIt(id,flg,_243){
if(_243===undefined){
_243=false;
}
if(flg){
jq("#share_tgt").load("/xml/shareit.php",{art_id:id,show_warn:_243});
}else{
jq("#share_tgt").html("");
}
return false;
};
function extractParamFromUri(uri,_244){
if(!uri){
return;
}
var _245=new RegExp("[\\?&#]"+_244+"=([^&#]*)");
var _246=_245.exec(uri);
if(_246!=null){
return unescape(_246[1]);
}
return;
};
function displaySocialButtons(_247){
if("IE"==browser&&version<=7){
return false;
}
_247=_247||{};
var _248=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_247["nofacebook"]){
fb_appId=jQuery("meta[property='fb:app_id']").attr("content");
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_249){
FB.init({appId:fb_appId,xfbml:true});
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_24a){
_gaq.push(["t2._trackSocial","facebook","like",_24a]);
});
FB.Event.subscribe("edge.remove",function(_24b){
_gaq.push(["t2._trackSocial","facebook","unlike",_24b]);
});
FB.Event.subscribe("message.send",function(_24c){
_gaq.push(["t2._trackSocial","facebook","send",_24c]);
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
if(!_247["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_24d){
twttr.events.bind("tweet",function(_24e){
if(_24e){
var _24f;
if(_24e.target&&_24e.target.nodeName=="IFRAME"){
_24f=extractParamFromUri(_24e.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_24f]);
}
});
});
}
if(!_247["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_247["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_248;
};
function showLinkArticle(url,_250){
if(window.location.hash){
url+=window.location.hash;
}
var data={page_url:url,page_title:_250};
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
function showFancyAjaxOverlay(url,data,_251,_252){
if(!_252){
var _252={};
}
jq.post(url,data,function(html){
jq("#fancybox-wrap").attr("class","");
var _253=jq.extend({content:html,onComplete:function(){
if(_251){
jq("#fancybox-wrap").addClass(_251);
}
},autoDimensions:false,width:610,height:500,padding:0},_252);
jq.fancybox(_253);
});
};
function showFancyOverlay(html,_254){
if(!_254){
var _254={};
}
var _255=jq.extend({content:html},_254);
jq.fancybox(_255);
return false;
};
function hideFancyOverlay(){
jq.fancybox.close();
return false;
};
function follow(_256,_257,_258,_259,_25a){
var _25b=jq(this);
var data={typeId:_256,objectId:_257,isActive:_258,printNumbers:_259,overrides:_25a};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_256){
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
switch(_256){
case 1:
jQuery(".follow_question_"+_257).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_257).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data),_25c=jQuery(".follow_"+_257);
_25c.replaceWith(json.buttonText);
if(json.fanMail){
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400,onClosed:function(){
if(_25b.hasClass("close_after")){
jq(window).trigger("suggestion_followed",[jQuery("#follow_"+_257)]);
}
}});
}
break;
case 4:
jQuery(".follow_"+_257).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_257).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButtons(){
var _25d=jq("span[id^=follow_], span[class^=follow_]"),_25e=jQuery.map(_25d,function(span,i){
if(jq(span).find("a").text().toUpperCase()=="LOADING..."){
var _25f=jq(span),_260=parseInt(_25f.data("typeId")),_261=_25f.data("objectId"),_262=true,_263=_25f.data("overrides");
return {typeId:_260,objectId:_261,overrides:_263,printNumbers:_262};
}else{
}
});
if(_25e.length>0){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",dataType:"json",data:{itemsToPaint:_25e},success:function(data){
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
function updateFollowButton(_264,_265,_266,_267){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_264,objectId:_265,printNumbers:_266,overrides:_267},success:function(data){
switch(_264){
case 1:
jQuery(".follow_question_"+_265).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_265).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_265).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_265).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_265).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_265).replaceWith(data);
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
function deleteComment(_268,_269){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_269).serialize(),success:function(resp){
toggleCommentEdit(_268,false);
jq("#ctext_"+_268).html(resp);
jq("#cedit_"+_268).remove();
}});
return false;
};
function toggleCommentEdit(_26a,_26b){
if(_26b){
jq("#cedit_"+_26a).hide();
jq("#cbox_"+_26a).show();
jq("#ctext_"+_26a).hide();
}else{
jq("#cedit_"+_26a).show();
jq("#cbox_"+_26a).hide();
jq("#ctext_"+_26a).show();
}
};
(function($){
$.fn.sampleDuration=function(_26c){
var _26d=new Date();
return $(this).bind("beforeunload",function(){
var _26e=new Date();
$.post("/xml/duration",{art_id:_26c,dur:_26e-_26d});
});
};
})(jQuery);
(function($){
$.fn.sampleDurationNew=function(_26f,freq){
var rand=Math.floor(Math.random()*freq);
if(rand==0){
var _270=new Date();
return $(this).bind("beforeunload",function(){
var _271=new Date();
$.post("/xml/duration",{art_id:_26f,dur:_271-_270});
});
}
};
})(jQuery);
function setupNavMenu(){
jq(document).ready(function(){
var _272=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_272=="touchstart"){
jq("#header_explore").bind(_272+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_272+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_272+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("#header_wrap").bind(_272+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_272+".nav",function(_273){
_273.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_274){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_275){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_276){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_277){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_278){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_279){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_27a){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_27b){
nav_hide_all_menus();
});
jq("html").bind("click",function(_27c){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_27d){
_27d.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function showImageFromThumb(){
var id=jq(this).attr("id");
var _27e=id.replace("t_","slide_img_");
var _27f=jq("#"+_27e);
_27f.parent().parent().children(":visible").hide();
_27f.parent().show();
};
function initThumbnailImages(){
jq(".image_module_thumb").click(showImageFromThumb);
};
function initHub(_280){
initThumbnailImages();
relatedHubStats.trackedclass=".tracked_link";
relatedHubStats.initEventHandlers();
initTurboHubShare();
initTurboVoting(_280);
initCommentPlaceholderText();
};
function collectRating(_281,_282,_283,freq,_284){
var _285=location.hash.slice(1);
var _286="rate"==_285;
if(!_286&&jq.cookie("rating")){
return false;
}
if(_286||Math.random()<freq){
var _287=new Date();
var _288=_287.getTime();
var ref=document.referrer;
if(isSearchReferrer(ref)||_286){
jq.cookie("rating","1",{expires:30,path:"/",domain:_283});
jq("#rate_hub").hubrating({toggleExplanations:false,onsubmit:function(_289){
var _28a=new Date();
var _28b=_28a.getTime()-_288;
jq.post("/xml/feedback.php",{a:_281,s:_289.substance,o:_289.organization,m:_289.mechanics,q:_289.quality,version:_284,rf:ref,d:_28b},function(){
jq("#rating_submission, #hop_explain").remove();
jq("#rate_hub .head_one").text("Thanks for your help!").after("<p>Your opinion will help us to improve HubPages.</p>");
setTimeout(function(){
jq("#close_hub_rating").click();
},3000);
});
},detailedExplanations:false,showExplanations:0==_284,singleSlider:_284>0,ratingMissingMessage:_284>0?"Please rate this article. Thanks!":"Please rate this article on all three scales. Thanks!"});
setTimeout(function(){
jq("#rate_hub").slideDown(1000);
},_282);
}
}
};
function isSearchReferrer(ref){
if(!ref){
return false;
}
var _28c=/^https?:\/\/(www\.google\.[a-z]{2,3}|www\.google\.com?\.[a-z]{2,3}|blogsearch\.google\.com\.[a-z]{2,3}|blogsearch\.google\.[a-z]{2,3}|encrypted\.google\.com)\//i;
var _28d=/^https?:\/\/(www\.bing\.com|search\.yahoo\.com|search\.aol\.com|www\.ask\.com)\//i;
return _28c.test(ref)||_28d.test(ref);
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
function initQATurboVoting(_28e){
jq("#answer_vote_"+_28e+" .answer_vote_up").click(function(){
answerFeedback(_28e,1,function(){
jq("#answer_vote_"+_28e+" .answer_vote_up").addClass("answer_voted_up");
jq("#answer_vote_"+_28e+" .answer_vote_down").addClass("answer_down_disabled");
jq("#answer_vote_"+_28e+" .answer_vote_up").removeClass("answer_up_disabled");
jq("#answer_vote_"+_28e+" .answer_vote_down").removeClass("answer_voted_down");
showQAVoteThanks(_28e);
});
return false;
});
jq("#answer_vote_"+_28e+" .answer_vote_down").click(function(){
answerFeedback(_28e,0,function(){
jq("#answer_vote_"+_28e+" .answer_vote_up").addClass("answer_up_disabled");
jq("#answer_vote_"+_28e+" .answer_vote_down").addClass("answer_voted_down");
jq("#answer_vote_"+_28e+" .answer_vote_up").removeClass("answer_voted_up");
jq("#answer_vote_"+_28e+" .answer_vote_down").removeClass("answer_down_disabled");
showQAVoteThanks(_28e);
});
return false;
});
jq("#answer_vote_"+_28e).mouseenter(function(){
jq(this).data("active",true);
setTimeout(showQAVoteBubble(_28e),1500);
}).mouseleave(function(){
jq(this).data("active",false);
setTimeout(hideQAVoteBubble(_28e),500);
});
};
function showQAVoteThanks(_28f){
jq("#vote_bubble_"+_28f+" p").text("Thank you for ensuring top quality content on HubPages.");
};
function showQAVoteBubble(_290){
var av=jq("#answer_vote_"+_290);
if(av.data("active")){
jq("#vote_bubble_"+_290).fadeIn(600);
}
};
function hideQAVoteBubble(_291){
var vb=jq("#vote_bubble_"+_291);
var d=new Date();
var _292=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#answer_vote_"+_291).data("active")&&!_292){
vb.fadeOut(600);
}
};
function initTurboVoting(_293){
var _294=jq("#vote_bubble");
jq("#hub_vote .hub_vote_up").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_293,1,function(){
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
hubFeedback(_293,0,function(){
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
var _295=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#hub_vote").data("active")&&!_295){
vb.fadeOut(600);
}
};
function initTurboHubShare(){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(socialWidgetUpdate).resize(socialWidgetUpdate);
}
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
var _296=20;
var pos=jq(this).scrollTop();
var _297=jq("#share_hub");
var _298=jq("#hub_container");
var _299=0;
var _29a=jq(".moduleHostedVideo");
if(_29a.size()){
_299=_29a.first().position().top+_29a.first().outerHeight();
}
var _29b=_298.height()-_297.outerHeight();
var _29c=_298.offset();
if(_29c.top+_299-pos<_296){
if(pos>_29c.top+_29b){
_297.css({position:"absolute",top:_29b+"px",right:"-15px",left:"auto"});
}else{
}
}else{
_297.css({position:"absolute",top:_299+"px",right:"-15px",left:"auto"});
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
var _29d=20;
var pos=jq(this).scrollTop();
var _29e=jq("#share_qa");
var _29f=jq("#answers");
var _2a0=0;
var _2a1=jq(".moduleHostedVideo");
if(_2a1.size()){
_2a0=_2a1.first().position().top+_2a1.first().outerHeight();
}
var _2a2=_29f.height()-_29e.outerHeight();
var _2a3=_29f.offset();
if(_2a3.top+_2a0-pos<_29d){
if(pos>_2a3.top+_2a2){
_29e.css({position:"absolute",top:_2a2+"px",left:"auto"});
}else{
_29e.css({position:"fixed",top:_29d+"px",left:(520+_2a3.left)+"px",right:"auto"});
}
}else{
_29e.css({position:"absolute",top:_2a0+"px",left:"auto"});
}
};
function google_ad_request_done(_2a4){
var s="";
var i;
if(_2a4.length==0){
return;
}
if(_2a4[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_2a4[0].image_width+"\" HEIGHT=\""+_2a4[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_2a4[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_2a4[0].image_url+"\" WIDTH=\""+_2a4[0].image_width+"\" HEIGHT=\""+_2a4[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_2a4[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_2a4[0].url+"\" target=\"_top\" title=\"go to "+_2a4[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_2a4[0].visible_url+"';return true\"><img border=\"0\" src=\""+_2a4[0].image_url+"\"width=\""+_2a4[0].image_width+"\"height=\""+_2a4[0].image_height+"\"></a>";
}else{
if(_2a4[0].type=="html"){
s+=_2a4[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a>";
for(i=0;i<_2a4.length;++i){
ad=_2a4[i];
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
var _2a5=jq.address.value().substr(1);
if(""==_2a5){
return;
}
var _2a6=false;
if(_2a5.substr(0,8)=="comment-"){
_2a6=true;
_2a5="comment"+_2a5.substr(8);
}
if("morecomments"==_2a5||_2a6){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_2a5){
ssToId("comFirst");
}else{
if("morecomments"==_2a5){
}else{
if("rate"==_2a5){
}else{
ssToId(_2a5);
}
}
}
};
function loadRatingSystem(_2a7,_2a8,_2a9,_2aa){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_2a7,params:{id:_2aa},ratingClass:"rating"});
};
function initAutoComplete(_2ab,_2ac){
var _2ad="";
var _2ae="++none++";
var _2af=false;
var _2b0=false;
var _2b1=false;
var _2b2="#the_auto_comp_box";
var _2b3="#search_form";
var _2b4="#search_input";
var _2b5=".search_submit";
var _2b6="search_form";
var _2b7="/xml/getautocompletestrings.php";
var _2b8="";
var _2b9=0;
var _2ba=null;
var _2bb=null;
var _2bc=null;
var _2bd=null;
var _2be=null;
var _2bf=false;
if(_2ac){
_2b2=_2ac.boxid;
_2b3=_2ac.container;
_2b4=_2ac.input;
_2b5=_2ac.submit;
if(_2ac.ajaxtarget!=undefined){
_2b7=_2ac.ajaxtarget;
}
if(_2ac.querystring!=undefined){
_2b8="&"+_2ac.querystring;
}
if(_2ac.filter!=undefined){
_2ba=_2ac.filter;
}
if(_2ac.callback!=undefined){
_2bb=_2ac.callback;
}
if(_2ac.keyboardelem!=undefined){
_2bd=_2ac.keyboardelem;
}
if(_2ac.targoutput!=undefined){
_2bc=_2ac.targoutput;
}
if(_2ac.keyuptarget!=undefined){
_2be=_2ac.keyuptarget;
}
if(_2ac.showprogress!=undefined){
_2bf=_2ac.showprogress;
}
}
if(!_2bd){
_2bd=_2b4;
}
if(!_2bc){
_2bc=_2b4;
}
if(!_2be){
_2be=_2bd;
}
jq(document).ready(function(){
if(!_2af){
_2af=true;
jq("<div id=\""+_2b2.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_2bd);
if(_2bf){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_2b2);
jq("#auto_comp_close").bind("click",function(){
jq(_2b2).hide();
jq("#auto_comp_close").hide();
});
}
jq(_2b2).hide();
if(!_2bf){
jq(_2b2).bind("focusin",function(){
_2b0=true;
});
jq(_2b2).bind("focusout",function(){
_2b0=false;
});
jq(_2b3).bind("focusin",function(){
_2b1=true;
});
jq(_2b3).bind("focusout",function(){
_2b1=false;
setTimeout(function(){
if(!_2b0&&!_2b1){
jq(_2b2).hide();
jq("#auto_comp_close").hide();
_2b8=_2b8.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_2b3).attr("autocomplete","off");
jq(_2bd).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_2b9=0;
jq(_2b2+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_2be).bind("keyup",function(){
var _2c0=jq(_2b4).attr("value");
if(_2b4!=_2bd){
if(_2ad!=_2c0){
_2b8=_2b8.replace(/start=[0123456789]+/,"");
_2b8=_2b8.replace(/&&/,"&");
}
_2ad="";
_2ae="++none++";
}
var _2c1;
if(_2ac){
_2c1="hubs";
}else{
_2c1=jq(".search_type option:selected").val();
if(_2c1==undefined){
_2c1="site";
}
}
if(jq.trim(_2c0).length==0){
jq(_2b2).hide();
jq("#auto_comp_close").hide();
}
if(jq.trim(_2c0).length>0&&_2ad!=_2c0){
_2ad=_2c0;
if(_2c0.indexOf(_2ae)==0){
jq(_2b2+" > .auto_comp_row").each(function(){
var _2c2=jq(this).text();
if(_2ba){
_2c2=_2ba(_2c2);
}
if(_2c2.indexOf(_2c0)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_2ae="++none++";
jq(_2b2+" > .auto_comp_row").remove();
var _2c3="?";
if(_2bf){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_2b2);
jq(_2b2).show();
_2c3="?s="+escape(_2c0)+"&";
}
var _2c4=jq(_2b3).serialize();
var _2c5=/(^|&)s=/;
if(!_2c4.match(_2c5)&&!_2b8.match(_2c5)&&!_2c3.match(_2c5)){
_2c4+="&s="+_2c0;
}
jq.get(_2b7+_2c3+"t="+escape(_2c1)+_2b8,_2c4,function(data){
jq(_2b2+" div[id=auto_comp_error]").remove();
jq(_2b2+" div[id=auto_comp_progress]").remove();
_2b8=_2b8.replace(/start=[0123456789]+/,"");
_2b8=_2b8.replace(/&&/,"&");
var _2c6=jq(data).find("div").length;
var _2c7=false;
if(_2c6==0){
return true;
}
var _2c8=jq(_2b4).val();
if(_2c8!=_2c0){
return true;
}
if(_2c6<_2ab){
_2ae=_2c0;
}else{
_2ae="++none++";
}
jq(_2b2).show();
jq(_2bd).focus();
var _2c9=jq(_2bd).position();
var _2ca=jq(_2bd).outerHeight(true);
jq(_2b2).position(_2c9.top+_2ca,_2c9.left+5);
jq(data).find("div").appendTo(_2b2);
jq(_2b2+" > .auto_comp_row").bind("click",function(){
var _2cb=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_2cb=true;
var _2cc=href.substr(8);
_2b8+="&start="+_2cc;
_2b8=_2b8.replace(/&&/,"&");
}
});
if(_2cb){
if(!_2c7){
setTimeout(function(){
jq(_2be).trigger("keyup");
},200);
_2b0=false;
_2c7=true;
}
return (false);
}
var _2cd=jq(this).text();
if(_2ba){
_2cd=_2ba(_2cd);
}
jq(_2bc).attr("value",_2cd);
if(document.forms[_2b6]){
document.forms[_2b6].submit();
}else{
if(_2b5){
jq(_2b5).trigger("click");
}
}
return (false);
});
jq(_2b2+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_2b2+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_2b2+" > .auto_comp_row:visible:eq("+_2b9+") > a").length){
return (false);
}
++_2b9;
jq(_2b2+" > .auto_comp_row:visible:eq("+_2b9+") > a").trigger("focus");
return (false);
break;
case 38:
--_2b9;
if(_2b9<0){
jq(_2bd).trigger("focus");
}else{
jq(_2b2+" > .auto_comp_row:visible:eq("+_2b9+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_2bb){
_2bb();
}
},"html");
}
});
}
});
};
function updateNumCharCount(_2ce,_2cf,_2d0){
if(jq("#"+_2cf).hasClass("dimmed")){
jq("#"+_2d0).html(_2ce);
}else{
if(jq("#"+_2cf).val().length>_2ce){
jq("#"+_2cf).value=jq("#"+_2cf).val().substring(0,_2ce);
}
jq("#"+_2d0).html(_2ce-jq("#"+_2cf).val().length);
}
};
function checkCharCount(_2d1,_2d2,_2d3){
updateNumCharCount(_2d1,_2d2,_2d3);
jQuery("#"+_2d2).bind("click keyup keydown",function(){
updateNumCharCount(_2d1,_2d2,_2d3);
});
jQuery("#"+_2d2).bind("keypress",function(evt){
updateNumCharCount(_2d1,_2d2,_2d3);
var code=(evt.keyCode?evt.keyCode:evt.which);
if(code!=8&&code!=37&&code!=38&&code!=39&&code!=40&&(browser=="Opera"||code!=46)){
if(jQuery(this).val().length>=_2d1){
evt.stopPropagation();
return false;
}
}
return true;
});
};
function checkCommentCharCount(_2d4,_2d5,_2d6,_2d7){
jQuery("#"+_2d5).bind("click keypress keydown keyup",function(){
if(jQuery("#"+_2d7).text()<_2d4){
jQuery("#"+_2d6).show("fast");
}else{
jQuery("#"+_2d6).hide("fast");
}
});
};
function initCommentsCapsule(_2d8,_2d9,_2da){
if(_2da.signInRequired){
jq("#comment_submit_"+_2d8).data("disabled",true);
jq("#comment_submit_"+_2d8+", .moduleComment .compose_comment textarea").click(function(){
whenSignedIn({explain:"to comment",showSignup:true,utm_source:"tocomment"},function(){
jq("#comText_"+_2d8).remove();
document.location=_2da.url;
document.location.reload(true);
});
return false;
});
return;
}
checkCharCount(8192,"comText_"+_2d8,"comText_"+_2d8+"_chars");
checkCommentCharCount(1000,"comText_"+_2d8,"comCharDiv_"+_2d8,"comText_"+_2d8+"_chars");
var _2db="function"==typeof (_2da.success)?_2da.success:function(resp){
jq("#mod_"+_2d8).html(resp);
jq("#spinner").hide();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
};
var _2dc;
if(_2d9){
_2dc=function(form,btn){
whenSignedIn({explain:"to comment as "+_2d9,utm_source:"tocomment"},function(){
jq(form).ajaxSubmit({type:"POST",success:_2db});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
});
};
}else{
_2dc=function(form,btn){
jq(form).ajaxSubmit({type:"POST",success:_2db});
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
jq("#comment_submit_"+_2d8).click(function(){
jq("#comment_"+_2d8).submit();
return false;
});
var _2dd={onkeyup:false,submitHandler:function(form){
var btn=jq("#comment_submit_"+_2d8);
if(btn.data("disabled")){
return;
}
jq("#spinner").show();
_2dc.apply(this,[form,btn]);
},rules:{name:{requiredNoPlaceholder:true,nohtml:true}},messages:{name:{requiredNoPlaceholder:"Please enter your name before posting."}},errorLabelContainer:"#formErrors_{$modId} ul",errorElement:"li",errorClass:"errorFld",onfocusout:false};
_2dd.rules["comText_"+_2d8]={requiredNoPlaceholder:true,minlength:4,nohtml:true};
_2dd.messages["comText_"+_2d8]={requiredNoPlaceholder:"Please enter a comment before posting.",minlength:"Your comment is rather short."};
jq("#comment_"+_2d8).validate(_2dd);
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
var _2de=location.hash.slice(1);
if(_2de.substr(0,5)=="slide"){
var _2df=_2de.replace("slide","");
var _2e0=jQuery(".image_module_thumb[id*=\""+_2df+"\"]");
if(_2e0.length>0){
_2e0.click();
_2e0.parents(".moduleImage").find(".slide_display img:visible").click();
}else{
jQuery("#img_url_"+_2df+" img").click();
}
}
};
function safeScriptEval(_2e1){
var _2e2=_2e1.innerHTML.strip();
if(_2e2.substring(0,4)=="<!--"){
_2e2=_2e2.substring(4,_2e2.length-3);
}
try{
eval(_2e2);
}
catch(e){
}
};
function selectTab(_2e3,_2e4,_2e5,_2e6){
var _2e7;
if(!_2e5){
_2e5=jq("#tab_"+_2e3+"_0").closest("ul").children().size();
}
var _2e8,_2e9;
for(var i=0;i<_2e5;i++){
_2e8=jq("#tab_"+_2e3+"_"+i);
_2e9=jq("#tabcontent_"+_2e3+"_"+i);
if(!_2e8.size()||!_2e9.size()){
alert("Cannot locate element: baseid="+_2e3+" index="+_2e4+" tabcount="+_2e5);
}
if(_2e8.hasClass("selected")){
_2e7=i;
}
if(i==_2e4){
_2e8.addClass("selected");
_2e9.addClass("selected");
}else{
_2e8.removeClass("selected");
_2e9.removeClass("selected");
}
}
var _2ea={};
if(_2e6&&_2ea.toString.call(_2e6)=="[object Function]"){
_2e6(_2e7,_2e4);
}
return false;
};
function categoryFanBulkJoin(id,_2eb,_2ec,_2ed,_2ee,_2ef){
var _2f0=jq(".jc");
var cids=Array();
var _2f1=Array();
var i=0;
var k=0;
jq(".jc").each(function(_2f2,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_2ed){
_2f1[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_2f1.join(",");
if(_2ed){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_2ee){
_2ee(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_2ef)!="undefined"){
data["searchTxt"]=_2ef;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_2eb){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_2ec){
setTimeout(categoryFanHighlight,500);
}
}
if(_2ee){
_2ee(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_2f3,_2f4,_2f5,cols,_2f6){
if(!_2f5){
var _2f5=8;
}
if(!cols){
var cols=2;
}
var _2f7=jq("#"+_2f4).val();
if(""==jq.trim(_2f7)){
return;
}
jq("#"+_2f3).load("/xml/categoryFanSearch.php",{search:_2f7,limit:_2f5,cols:cols},function(){
if(_2f6){
_2f6();
}
});
return false;
};
function facebookConnect(_2f8){
if(typeof (_2f8)=="undefined"){
_2f8="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_2f8}).toQueryString();
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
function facebookPopup(_2f9){
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
child=window.open(_2f9,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_2fa,_2fb){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_2fa+"="+(_2fb?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function checkViolations(_2fc){
if(_2fc){
jq(".violations_span").html("");
var _2fd={check_violation:1};
}else{
var _2fd={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_2fd,dataType:"json",success:function(_2fe){
if(_2fe.data){
jq(".violations_span").html(_2fe.data);
}
if(!_2fe.complete){
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
function showHubOverlay(url,_2ff,_300){
var uri=$H({url:url,addComment:_2ff,commentText:_300}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_301){
var uri=$H({modId:_301}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_302,_303){
var uri=$H({moduleId:_302,pollId:_303}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_304,_305,_306,_307){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_306){
$("overlay").addClassName(_306);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_304,{parameters:_305,onComplete:function(){
if(_307!=undefined){
_307.call($("overlay"));
}
if(!$("fixed_title")){
return;
}
var _308=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_308+"px"});
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
var _309=browser=="IE"&&version<=6;
var _30a=$("overlay");
var _30b=Position.getViewportHeight();
if(_30b>750){
var _30c=_30b-150;
}else{
var _30c=_30b-90;
}
var _30d=_30a.getStyle("paddingTop");
var _30e=_30a.getStyle("paddingBottom");
_30c-=_30d.substring(0,_30d.length-2);
_30c-=_30e.substring(0,_30e.length-2);
_30c=Math.max(_30c,100);
$("overlay").setStyle({height:_30c+"px"});
if(_30b>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_309){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_309){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _30f=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_30f+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_30c-60)+"px",overflowY:"auto"});
}
};
function activity_why(id,_310,_311,_312){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_310,actionTargetId:_311,createDate:_312}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function ellipse(str,_313){
if(str.length>_313&&_313!=0){
str=str.substr(0,_313-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_313-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function addTagEntries(){
var _314=4;
var _315=document.createElement("div");
_315.id="moreEntryDiv";
var li=null;
var _316=4+1;
var _317=_316+_314;
for(var i=_316;i<_317;i++){
li=document.createElement("li");
_315.appendChild(li);
var _318=document.createElement("input");
_318.className="tagEntry";
_318.name="tag_"+i;
_318.type="text";
_318.size=40;
li.appendChild(_318);
}
$("tagEntries").appendChild(_315);
return true;
};
function hubtool_add_tag(_319){
var _31a=(_319)?$(_319):$("add_tag_input");
if(!_31a){
return;
}
var tag;
if(Field.present(_31a)&&_31a.type){
tag=$F(_31a);
Field.clear(_31a);
}else{
if(_31a.innerHTML){
tag=_31a.innerHTML;
Element.remove(Element.findElement(_31a,"li"));
}
}
if(!tag){
return;
}
var _31b=0;
var _31c=/^tag_(\d+)$/i;
var _31d=$$(".tagEntry");
_31d.each(function(ele){
if(ele.id){
var ms=_31c.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_31b){
_31b=id;
}
}
}
});
_31b++;
var _31e="tag_"+_31b;
var _31f=$("add_tag_input").parentNode;
var _320="<input class=\"tagEntry\" id=\""+_31e+"\" name=\""+_31e+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_31e)){
var _321=$(_31e).tabIndex;
Element.update($(_31e).parentNode,_320);
$(_31e).tabIndex=_321;
}else{
var _322=$("tag_1").tabIndex-1;
var _321=_322+_31b;
var pole=new Insertion.Before(_31f,"<li>"+_320+"</li>");
$(_31e).tabIndex=_321;
_321=$("add_tag_input").tabIndex;
_321++;
$("add_tag_input").tabIndex=_321;
}
return false;
};
function add_tag(_323){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _324=tag.replace(/'/g,"\\'");
var _325=tag.replace(/ /g,"+");
var _326="tagd_"+tag.replace(/ /g,"_");
_326=_326.toLowerCase();
if($(_326)){
$(_326).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _327=$("nav_tags_edit");
var _328="<a href=\"javascript:void delete_tag('"+_323+"','"+_324+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_328+="<a id=\""+_326+"\" href=\"/tag/"+_325+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_328;
_327.appendChild(item);
save_tag(_323,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_329,tag){
if(!_329||!tag){
return;
}
var _32a="tagd_"+tag.replace(/ /g,"_");
var _32b=$(_32a);
if(!_32b){
return;
}
var li=_32b.parentNode;
Element.remove(li);
save_tag(_329,tag,true);
return false;
};
function save_tag(_32c,tag,del){
var _32d=(del)?1:0;
var req={a:_32c,v:tag,d:_32d};
var _32e=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_32e,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function fireOnReturn(_32f,func){
Event.observe(_32f,"keyup",function(_330){
_330=_330||window.event;
if(_330.which){
if(_330.which==Event.KEY_RETURN){
_330.preventDefault();
func();
}
}else{
if(_330.keyCode){
if(_330.keyCode==Event.KEY_RETURN){
Event.stop(_330);
func();
}
}
}
},false);
};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_331){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_331*100)+")";
}
ele.style.opacity=_331;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _332;
if(document.defaultView){
_332=document.defaultView.getComputedStyle(ele,"");
}else{
_332=ele.currentStyle;
}
return _332;
};
Element.cloneStyles=function(ele,_333,_334){
ele=$(ele);
_333=$(_333);
var _335=Element.getCurrentStyle(ele);
for(var name in _335){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _336=_335[name];
if(_336!==""&&!(_336 instanceof Object)&&name!="length"&&name!="parentRule"){
if(_334&&name.indexOf(_334)!==0){
continue;
}
_333.style[name]=_336;
}
}
return _333;
};
Element.findElement=function(_337,_338){
_337=$(_337);
while(_337.parentNode&&(!_337.tagName||(_337.tagName.toUpperCase()!=_338.toUpperCase()))){
_337=_337.parentNode;
}
return _337;
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
String.prototype.startsWith=function(_339){
var res=this;
return res.substring(0,_339.length)==_339;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _33a=p.innerHTML;
if(_33a.length>len){
_33a=_33a.substring(0,len);
_33a=_33a.replace(/\w+$/,"");
_33a+="...";
p.innerHTML=_33a;
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
var _33b=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_33b=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_33b=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_33b=window.pageXOffset;
}else{
if(window.scrollX){
_33b=window.scrollX;
}
}
}
}
return _33b;
};
Position.getViewportScrollY=function(){
var _33c=0;
if(document.documentElement&&document.documentElement.scrollTop){
_33c=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_33c=document.body.scrollTop;
}else{
if(window.pageYOffset){
_33c=window.pageYOffset;
}else{
if(window.scrollY){
_33c=window.scrollY;
}
}
}
}
return _33c;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _33d=jq(window).scrollTop();
var _33e=_33d+jq(window).height();
if(eleBot<_33d){
return -1;
}
if(off.top>_33e){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _33f=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _340=[_33f[0]+Position.getViewportWidth(),_33f[1]+Position.getViewportHeight()];
return (_33f[0]<off[0]&&off[0]<_340[0]&&_33f[1]<off[1]&&off[1]<_340[1]);
};
Position.set=function(ele,_341){
if(ele&&_341){
ele.style.left=_341[0]+"px";
ele.style.top=_341[1]+"px";
}
};
function phone_verify_required(_342,_343,_344,_345){
if(typeof (_345)=="undefined"){
data={};
}else{
data={a:_345};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_342);
}else{
_343.apply(null,_344);
}
},"json");
};
function require_phone_verification(_346,_347){
url="/xml/verify/phone.php";
if(typeof (_347)!="undefined"&&_347){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_346},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_348,end){
for(var i=_348;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_348)+1;
}
update_plural(name);
};
function unselect_all(name,_349,end){
for(var i=_349;i<=end;i++){
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
function import_now(_34a,name,_34b,end){
var _34c=self.opener.document.getElementById(_34a);
if(_34c){
for(var i=_34b;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _34d=$(name+"_email_"+i);
if(_34c.value.length<2||_34c.value.charAt(_34c.value.length)==","||_34c.value.charAt(_34c.value.length-1)==","){
_34c.value=_34c.value+_34d.innerHTML;
}else{
_34c.value=_34c.value+", "+_34d.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_34e,_34f,max){
var _350=document.getElementById(_34e);
var _351=document.getElementById(_34f);
if(!_350){
alert("charCounter bad source: "+_34e);
}
if(!_351){
alert("charCounter bad source: "+_34f);
}
if(_350.value.length>max){
_350.value=_350.value.substring(0,max);
}
_351.value=max-_350.value.length;
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
function fetchAnswers(_352,_353,_354){
var _355=$H({answerIds:_352,enableVoting:_353,enableEditing:_354}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_355,onComplete:function(_356){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_357,v){
if(_357===undefined){
_357=true;
}
jq.post("/xml/answervote.php",{id:id,vote:v,timeIndicator:_357});
return false;
};
function answerVoteDown(id,_358){
return answerVote(id,_358,-1);
};
function answerVoteUp(id,_359){
return answerVote(id,_359,1);
};
function getElementScreenTop(){
var _35a=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _35a;
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
jQuery(".answer_delete").click(function(_35b){
id=jQuery(_35b.target).attr("id");
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
var _35c="#edit_rc_error_"+i;
jQuery(_35c).html("You cannot submit an empty comment.");
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
jQuery(".request_comment_delete").click(function(_35d){
orig_id=jQuery(_35d.target).attr("id");
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
jQuery(".request_comment_notspam").click(function(_35e){
orig_id=jQuery(_35e.target).attr("id");
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
function showAnswerCommentBox(id,_35f){
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
jQuery("#rc_numcharsvalue").html(_35f);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _360="#result_"+i;
var _361="#error_"+i;
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
jQuery(_360).append(data.msg);
var _362=jQuery(_360).children().last().attr("id");
jQuery(_360).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_362);
});
});
}
}});
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_363){
this.buffer.push(_363);
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
function hpFormHandler(_364){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_364);
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
var _365=$$("input[name="+ele.name+"]");
var _366=false;
_365.each(function(r){
if(r.checked==true){
_366=true;
throw $break;
}
});
this.testForError(!_366,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _367=false;
if(val.length>=20){
var _368=val.match(/\s+/g);
var _369=_368?_368.length:0;
var _36a=_369+1;
_367=_36a/(val.length-_369)<0.08;
}
this.testForError(_367,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_36b,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_36b)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_36c,msg){
var val=$F(ele);
this.testForError((val.search(_36c)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_36d,msg){
var val=$F(ele);
var _36e=false;
for(i=0;i<_36d.length&&!_36e;i++){
var _36f=new RegExp("[^a-zA-Z]"+_36d[i]+"[^a-zA-Z]","i");
_36e=(val.search(_36f)>=0);
if(!_36e){
_36f=new RegExp("^"+_36d[i]+"[^a-zA-Z]","i");
_36e=(val.search(_36f)>=0);
}
if(!_36e){
_36f=new RegExp("[^a-zA-Z]"+_36d[i]+"$","i");
_36e=(val.search(_36f)>=0);
}
if(!_36e){
_36f=new RegExp("^"+_36d[i]+"$","i");
_36e=(val.search(_36f)>=0);
}
}
this.testForError(_36e,ele,msg);
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
var _370=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _371=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _372=800;
var _373=6;
this.validateLengthMin(ele,_373,"The address you entered is too short. Please use an address at least "+_373+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _374=200;
this.validateLengthMax(ele,_374,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _375=2;
var _376=200;
this.validateLengthMin(ele,_375,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_376,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _377=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_377=true;
}
this.testForError(!_377,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _378=40;
var _379=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_379,"Your password is too short.  Protect your account by choosing a password that is at least  "+_379+" characters long.  Safety first!");
this.validateLengthMax(ele1,_378,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _37a=60;
var _37b=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_37a,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_37c){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_37c.detect(function(name){
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
var _37d=$A($(form).getElementsByTagName("input"));
_37d.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_37e,_37f,_380){
if($(_37e)&&$(_37f)){
var gw=new GhostWatcher(_37e,_37f,_380);
}
};
hpFormHandler.prototype.setValidators=function(_381,_382){
this.toValidate=$H(_381);
this.toValidateOnsubmit=$H(_382);
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
hpFormHandler.prototype.save=function(_383){
if(this.ensureSignedInBeforeSave&&!_383){
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
var _384=new fx.Scroll({duration:100});
_384.scrollTo(this.errorDiv);
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
var _385=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_386,ele,msg){
if(_386){
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
hpFormHandler.prototype._runValidators=function(_387){
var _388=Form.getElements(this.form);
var _389=$A(_388);
_389.each(function(node){
if(_387){
var _38a=this.toValidateOnsubmit.get(node.id);
if(!_38a){
_38a=this.toValidateOnsubmit.get(node.className);
}
if(_38a){
_38a(node);
}
}
var _38a=this.toValidate.get(node.id);
if(!_38a){
_38a=this.toValidate.get(node.className);
}
if(_38a){
_38a(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _38b="";
if(json.status=="error"){
var _38c=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_38b+=" - "+json.errors[key][i]+"\n";
}
_38c++;
}
}
if(_38c>0){
var _38d=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_38d+=_38b+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_38d);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _38e=new fx.Scroll({duration:300});
_38e.scrollTo("changesSaved");
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
var _38f=this.errorHeader;
_38f+="<ul>";
this.errors.each(function(err){
_38f+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_38f+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_38f;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _390=$(err.key);
var _391=err.key+"_error";
var _392=$(_391);
if(_392){
_392.innerHTML=err.value;
_392.className="alert";
_392.show();
}else{
new Insertion.Top(_390.parentNode,"<div id=\""+_391+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_390,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _393=typeof this.errors.get(targetId)=="undefined";
if(_393){
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
function _handleInputKeypress(_394){
_394=_394||window.event;
if(_394.which){
if(_394.which==Event.KEY_RETURN){
var _395=document.createEvent("KeyboardEvent");
_395.initKeyEvent("keydown",true,true,document.defaultView,_394.ctrlKey,_394.altKey,_394.shiftKey,_394.metaKey,Event.KEY_TAB,0);
_394.preventDefault();
_394.target.dispatchEvent(_395);
}
}else{
if(_394.keyCode){
if(_394.keyCode==Event.KEY_RETURN){
_394.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_396,_397,_398){
this.fromEle=$(_396);
this.toEle=$(_397);
this.copyFunction=(_398!=null)?_398:this.copyValue;
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
function growTextArea(elt,_399,_39a,_39b){
var rows=Math.ceil($F(elt).length/_399)+1;
var _39c=rows*_39a;
_39c=Math.max(_39c,_39b);
elt.setStyle({height:_39c+"px"});
};
function makeGrowable(id,_39d,_39e,_39f){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_39d,_39e,_39f);
});
};
function makeExpandable(id,_3a0,_3a1,_3a2,_3a3,_3a4){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_3a0);
var _3a4=(_3a4===undefined)?"expanded":_3a4;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_3a4)){
anc.addClass(_3a4);
if(typeof (_3a3)=="function"){
_3a3.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_3a1)=="function"){
_3a1.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_3a2){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_3a0);
});
};
function hpajaxpostformdata(_3a5,_3a6){
var data=new Object();
jq(_3a6).find("input").each(function(){
if(jq(this).attr("type")=="checkbox"){
if(jq(this).is(":checked")){
data[jq(this).attr("name")]=0;
}
}else{
data[jq(this).attr("name")]=jq(this).attr("value");
}
});
jq.get(_3a5,data,function(){
});
};
function categorySearch(_3a7){
jq("#"+_3a7+"SearchResults").load("/xml/categorysearch.php",{uniqueId:_3a7,searchText:jq("#"+_3a7+"SearchText").val()});
};
(function($){
var _3a8=function(){
this.children("select").change(function(_3a9){
var _3aa=jq(_3a9.target);
_3aa.parent().hpCategorySelector("chooseCategory",_3aa.val());
});
};
var _3ab={init:function(_3ac){
var _3ad=$.extend({userId:0,valueId:"#categoryId",data:{}},_3ac);
this.data("settings",_3ad);
_3a8.apply(this);
return this;
},chooseCategory:function(_3ae){
return this.each(function(_3af,elt){
var _3b0=jq(elt);
var _3b1=_3b0.data("settings");
var _3b2=_3b0.attr("id");
var _3b3=$.extend({categoryId:_3ae,id:_3b2},_3b1.data);
jq.post("/xml/categoryselector.php",_3b3,function(rsp){
var data=jq.parseJSON(rsp);
_3b0.html(data.render);
_3a8.apply(_3b0);
_3b0.find("select").first().focus();
$(_3b1.valueId).val(_3ae);
_3b0.trigger("categoryChange.hpCategorySelector",data);
});
});
},refresh:function(){
return this.each(function(_3b4,elt){
var _3b5=jq(elt);
_3b5.hpCategorySelector("chooseCategory",_3b5.hpCategorySelector("getValue"));
});
},getValue:function(){
var _3b6=this.data("settings");
return $(_3b6.valueId).val();
},destroy:function(){
}};
$.fn.hpCategorySelector=function(_3b7){
if(_3ab[_3b7]){
return _3ab[_3b7].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _3b7==="object"||!_3b7){
return _3ab.init.apply(this,arguments);
}else{
$.error("Method "+_3b7+" does not exist on jQuery.hpCategorySelector");
}
}
};
})(jQuery);
(function($){
var _3b8=function(){
this.children("select").change(function(_3b9){
var _3ba=jq(_3b9.target);
_3ba.parent().hpForumSelector("chooseForum",_3ba.val(),_3ba.prevAll("select").size()>0);
});
};
var _3bb={init:function(_3bc){
var _3bd=$.extend({userId:0,data:{},id:"admin"},_3bc);
this.data("settings",_3bd);
_3b8.apply(this);
return this;
},chooseForum:function(_3be,_3bf){
var _3c0=0,data={};
if(/fave/.test(_3be)){
data["categoryId"]=_3be.substring(5);
_3c0=data["categoryId"];
}else{
if(_3bf){
data["categoryId"]=_3be;
}else{
data["forumId"]=_3be;
}
}
return this.each(function(_3c1,elt){
var _3c2=jq(elt);
var _3c3=_3c2.data("settings");
var _3c4=_3c2.attr("id");
var _3c5=$.extend(data,_3c3.data);
_3c5["id"]=_3c3.id;
jq.post("/xml/forumselector.php",_3c5,function(rsp){
_3c2.html(rsp);
_3b8.apply(_3c2);
$("#"+_3c3.id+"_category_id").val(_3c0);
});
});
},getValue:function(){
var _3c6=this.data("settings");
return $(_3c6.valueId).val();
},destroy:function(){
}};
$.fn.hpForumSelector=function(_3c7){
if(_3bb[_3c7]){
return _3bb[_3c7].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _3c7==="object"||!_3c7){
return _3bb.init.apply(this,arguments);
}else{
$.error("Method "+_3c7+" does not exist on jQuery.hpForumSelector");
}
}
};
})(jQuery);
function addEvent(_3c8,type,_3c9){
if(!_3c9.$$guid){
_3c9.$$guid=addEvent.guid++;
}
if(!_3c8.events){
_3c8.events={};
}
var _3ca=_3c8.events[type];
if(!_3ca){
_3ca=_3c8.events[type]={};
if(_3c8["on"+type]){
_3ca[0]=_3c8["on"+type];
}
}
_3ca[_3c9.$$guid]=_3c9;
_3c8["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_3cb,type,_3cc){
if(_3cb.events&&_3cb.events[type]){
delete _3cb.events[type][_3cc.$$guid];
}
};
function handleEvent(_3cd){
var _3ce=true;
_3cd=_3cd||fixEvent(window.event);
if(_3cd==null){
return false;
}
if(this.events==null){
return false;
}
var _3cf=this.events[_3cd.type];
for(var i in _3cf){
this.$$handleEvent=_3cf[i];
if(this.$$handleEvent(_3cd)===false){
_3ce=false;
}
}
return _3ce;
};
function fixEvent(_3d0){
if(_3d0!=null){
_3d0.preventDefault=fixEvent.preventDefault;
_3d0.stopPropagation=fixEvent.stopPropagation;
}
return _3d0;
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
var css={getElementsByClass:function(node,_3d1,tag){
var _3d2=new Array();
var els=node.getElementsByTagName(tag);
var _3d3=els.length;
var _3d4=new RegExp("(^|\\s)"+_3d1+"(\\s|$)");
for(var i=0,j=0;i<_3d3;i++){
if(this.elementHasClass(els[i],_3d1)){
_3d2[j]=els[i];
j++;
}
}
return _3d2;
},elementHasClass:function(el,_3d5){
if(!el){
return false;
}
var _3d6=new RegExp("\\b"+_3d5+"\\b");
if(el.className.match(_3d6)){
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
var _3d7=document.getElementsByTagName("table");
for(var i=0;i<_3d7.length;i++){
var _3d8=_3d7[i];
if(css.elementHasClass(_3d8,"sortable")){
this.makeSortable(_3d8);
}
}
},makeSortable:function(_3d9){
if(!_3d9.id){
_3d9.id="sortableTable"+this.lastAssignedId++;
}
if(!_3d9.tHead||!_3d9.tHead.rows||0==_3d9.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_3d9.tHead.rows.length;i++){
if(css.elementHasClass(_3d9.tHead.rows[i],"sort_control_buttons")){
row=_3d9.tHead.rows[i];
break;
}
}
if(row==null){
row=_3d9.tHead.rows[_3d9.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _3da=row.cells[i].firstChild;
_3da.onclick=this.headingClicked;
_3da.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _3db=getEventTarget(e);
var td=_3db.parentNode;
var tr=td.parentNode;
var _3dc=tr.parentNode;
var _3dd=_3dc.parentNode;
if(!_3dd.tBodies||_3dd.tBodies[0].rows.length<=1){
return false;
}
var _3de=_3db.getAttribute("columnId")||td.cellIndex;
var _3df=css.getElementsByClass(td,"tableSortArrow","span");
var _3e0="";
if(_3df.length>0){
_3e0=_3df[0].getAttribute("sortOrder");
}
var itm="";
var _3e1=0;
while(""==itm&&_3e1<_3dd.tBodies[0].rows.length){
var elm=_3dd.tBodies[0].rows[_3e1].cells[_3de];
if(elm.childNodes.length==1){
itm=that.getInnerText(_3dd.tBodies[0].rows[_3e1].cells[_3de]);
}else{
itm=that.getInnerText(_3dd.tBodies[0].rows[_3e1].cells[_3de].firstChild);
}
_3e1++;
}
var _3e2=that.determineSortFunction(itm);
var _3e3;
if(_3dd.id==that.lastSortedTable&&_3de==that.sortColumnIndex){
_3e3=that.newRows;
_3e3.reverse();
}else{
that.sortColumnIndex=_3de;
_3e3=new Array();
for(var j=0;j<_3dd.tBodies[0].rows.length;j++){
_3e3[j]=_3dd.tBodies[0].rows[j];
}
_3e3.sort(_3e2);
}
that.moveRows(_3dd,_3e3);
that.newRows=_3e3;
that.lastSortedTable=_3dd.id;
var _3df=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_3df.length;j++){
if(j==_3de){
if(null==_3e0||""==_3e0||"DESC"==_3e0){
_3df[j].innerHTML="▼";
_3df[j].setAttribute("sortOrder","ASC");
}else{
_3df[j].innerHTML="▲";
_3df[j].setAttribute("sortOrder","DESC");
}
}else{
_3df[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_3dd.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_3dd.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_3dd.tBodies[0].rows.length;i++){
tr=_3dd.tBodies[0].rows[i];
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
var _3e4=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_3e4=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_3e4=this.sortDate;
}
if(itm.match(/^[�$]/)){
_3e4=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_3e4=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_3e4=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_3e4=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_3e4=this.sortIP;
}
return _3e4;
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
var _3e5=a.cells[that.sortColumnIndex];
if(_3e5.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _3e6=b.cells[that.sortColumnIndex];
if(_3e6.childNodes.length>1){
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
},moveRows:function(_3e7,_3e8){
for(var i=0;i<_3e8.length;i++){
var _3e9=_3e8[i];
_3e7.tBodies[0].appendChild(_3e9);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_3ea,_3eb,_3ec){
this.modId=_3ea;
this.pollId=_3eb;
this.results_div_id=_3ea+"_poll_results";
this.vote_form_id=_3ea+"_vote_form";
this.vote_radio_name=_3ea+"_vote";
this.hubnugget=_3ec;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _3ed=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_3ed,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},risingStarVote:function(_3ee){
if(!jQuery(".voting_candidates").hasClass("voted")){
var _3ef=$H({id:this.pollId,vote:_3ee,hn:1}).toQueryString();
jQuery.ajax({url:"/xml/pollvote.php",data:_3ef,type:"POST",success:function(data){
jQuery(".voting_candidates").addClass("voted");
jQuery(".voting_candidates .main.voting_header > div").html(data);
jQuery(".voting_candidates .main li a.button").removeClass("green_bg").addClass("disabled").html("Thanks for voting");
}});
}
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _3f0=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_3f1){
return _3f1.checked;
});
if(null==_3f0){
return;
}else{
vote=_3f0.value;
}
var _3f2=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_3f2,onFailure:reportError,onComplete:function(){
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
ContentRotator.prototype={initialize:function(ids,_3f3,_3f4,_3f5,_3f6,_3f7,_3f8,_3f9,_3fa,loop,_3fb){
this.ids=ids;
this.prefix=_3f3;
this.interval=_3f4;
this.position=0;
this.paused=false;
this.transitionEffect=_3f5;
this.transitioning=false;
this.updateFunction=null;
if(_3fb!==undefined&&jq(_3fb).length>0){
this.navButtons=jq(_3fb);
this.firstButton=this.navButtons.find("li").first();
this.firstButton.find("a").addClass("active");
this.renderNavButtons.bind(this);
this.renderNavButtons();
}
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_3f6){
this.playId=_3f6;
}
if(_3f7){
this.pauseId=_3f7;
}
if(_3f8){
this.positionIndicatorId=_3f8;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_3f9){
this.prevId=_3f9;
}
if(_3fa){
this.nextId=_3fa;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},renderNavButtons:function(){
var _3fc=this.firstButton,_3fd=_3fc.find("a"),self=this,_3fe=this.position;
_3fd.data("position",_3fe);
_3fd.click(function(e){
e.preventDefault();
self.seek(jq(this).data("position"));
});
for(var i=1,l=this.ids.length;i<l;i++){
var _3ff=_3fc.clone(true),_400=++_3fe,_401=_3ff.find("a");
_401.attr("id","button_"+_400);
_401.removeClass("active");
_401.data("position",_400);
self.navButtons.append(_3ff);
}
},update:function(_402){
if(this.paused||this.activeUpdateThreadId!=_402){
return;
}
this.next();
this.updateFunction=setTimeout(this.update.bind(this,_402),this.interval);
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
},seek:function(_403){
var next=this.position<_403,_404=_403%this.ids.length;
while(_404<0){
_404+=this.ids.length;
}
if(this.position==_404){
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
var _405=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_405.toggle();
this.position=_404;
if(this.fadeTransition){
var _406=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _406=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(browser=="IE"&&version<=8){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
jq("#"+this.prefix+this.ids[this.position]).css({display:"inline",visibility:"visible",opacity:1});
}
_406.options.onComplete=this.endTransition.bind(this);
_406.hide();
_406.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=_404;
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
this.selectCurrentButton(_403);
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
},selectCurrentButton:function(_407){
if(this.navButtons){
clearTimeout(this.updateFunction);
if(this.interval>0){
this.updateFunction=setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
this.navButtons.find("a[id^=button]").removeClass("active");
jq("#button_"+(_407%this.ids.length)).addClass("active");
}
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_408,_409,_40a,_40b,_40c){
this.typeId=_408;
this.categoryId=_409;
this.userId=_40c;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_40b;
this.updateTime=_40a;
this.originalUpdateTime=_40a;
this.currentTime=parseInt(_40a,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_40d){
_40d.preventDefault();
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
var _40e=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_40e=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_40e);
}.bind(this));
},getTimeAgo:function(_40f){
if(_40f<=1){
return "1 second ago";
}
var _410=Math.round(_40f/60);
var _411=Math.round(_40f/3600);
var days=Math.round(_40f/86400);
var _412=Math.round(_40f/604800);
var _413=Math.round(_40f/2592000);
var _414=Math.round(_40f/31536000);
var ret="";
if(_414>=2){
ret=_414+" years ago";
}else{
if(_413>=2){
ret=_413+" months ago";
}else{
if(_412>=2){
ret=_412+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_411>=2){
ret=_411+" hours ago";
}else{
if(_410>=1){
ret=_410+" minute"+(_410==1?"":"s")+" ago";
}else{
ret=_40f+" second"+(_40f==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _415=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_415;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _416=parseInt(req.responseText,10);
if(_416>0){
this.newStoriesAvailable=_416;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _417=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_417+" "+is+" available (click to load)";
},loadNewStories:function(_418){
var nt=_418?_418:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _419=$(document.createElement("div"));
_419.addClassName("feed_item");
_419.innerHTML=data["render"];
var _41a=$("feed_box").down(".feed_item",0);
_41a.parentNode.insertBefore(_419,_41a);
_419.descendants().each(function(elt){
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
var _41b=$(document.createElement("div"));
_41b.addClassName("feed_item");
_41b.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _41c=$("feed_box").down(".feed_item",0);
_41c.parentNode.insertBefore(_41b,_41c);
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
var _41d=$(document.createElement("div"));
_41d.addClassName("feed_item");
_41d.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _41e=$("feed_box").down(".feed_item",0);
_41e.parentNode.insertBefore(_41d,_41e);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _41f=$(document.createElement("div"));
_41f.addClassName("feed_item");
_41f.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _420=$("feed_box").down(".feed_item",0);
_420.parentNode.insertBefore(_41f,_420);
return;
}
var _421=$("category_filters");
if(!_421){
var _422=$(document.createElement("div"));
_422.addClassName("feed_setting_box");
_422.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_422);
var _421=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_421.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_423,type,id){
new Ajax.Updater(_423,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_424,_425,_426){
makeGrowable(id,_424,_425,_426);
},makeExpandable:function(id,_427,_428,_429,_42a){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_427,_428,_429,null,_42a);
return;
}
elt.addClass("expandable_text dimmed").val(_427).data("hasFocus",false);
function _42b(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_42c,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _42d(){
if(_42b()){
if(!_429){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_427);
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
if(typeof (_428)=="function"){
_428.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_42d();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_42d();
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
},saveForm:function(_42e){
this.getHandler(_42e).save();
return false;
},addStoryToTop:function(_42f,id,_430){
var _431=$(document.createElement("div"));
_431.innerHTML=_42f;
_431.addClassName("feed_item");
var _432=$("feed_box").down(".feed_item",0);
_432.parentNode.insertBefore(_431,_432);
_431.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _433=new fx.Color(_431,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_430?_430:function(){
})});
_433.toggle();
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
var _434=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_434.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _435=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
jq("#category").hpCategorySelector("chooseCategory",0);
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _436=$("question");
_436.value="What is your question?";
_436.setStyle({"color":"#777"});
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
_435.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _437=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _438=$("subject");
var _439=$("message");
_438.setStyle({"color":"#777"});
_438.value="What is the subject of your forum post?";
_439.value="";
jq("#feed_forum_selector").hpForumSelector("chooseForum",0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_437.toggle();
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
},moreFeed:function(_43a){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_43a,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _43b=JSONstring.toObject(req.responseText);
var _43c=$("show_more");
_43c.style.display="none";
_43c.id="";
var _43d=$(document.createElement("div"));
$("feed_box").appendChild(_43d);
_43d.innerHTML=_43b["render"];
var _43e=$("feed_more_"+_43a);
$$("#feed_more_"+_43a+" script").each(function(_43f){
safeScriptEval(_43f);
});
this.addItems(_43b["feed"]);
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
},unhideUser:function(_440){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_440,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_440).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _441=this.getById(fid);
if(_441){
_441.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_440);
if(hu){
if(hu.siblings().size()==0){
var _442=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_442.parentNode.insertBefore(p,_442);
}
_442.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_443){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_443,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_443).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _444=this.getById(fid);
if(_444){
_444.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_443);
if(hc){
if(hc.siblings().size()==0){
var _445=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_445.parentNode.insertBefore(p,_445);
}
_445.remove();
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
var _446=$("overlay");
_446.classNames().each(function(name){
if(name!="overlay"){
_446.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_447){
if(_447){
$("overlay").addClassName(_447);
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
var _448=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_448+"px"});
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
var _449=0;
$("overlay_content").innerHTML=req.responseText;
var _44a=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_44a+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_44b){
var code=_44b.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_44c){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_44c,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_44d,_44e){
var sure=confirm("Are you sure that you want to stop following "+_44e+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_44d,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_44d).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _44f=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_44f.each(function(type){
var _450=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_451){
if(_451.checked){
_450=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_450){
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
var _452=jq("#edit_button");
if(_452.html()=="edit"){
this.toggleFeedPrefs();
}
var _453=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_453);
return false;
},toggleFeedPrefs:function(){
var _454=$("edit_button");
var _455=$("filter").value;
var _456="edit";
if(_454.innerHTML=="save"){
_456="save";
}
if(_456=="save"){
this.updateFeedTypeFilters();
var _457=0;
var _458=$$(".ht_box");
for(var j=0;j<_458.length;j++){
if(_458[j].checked){
_457+=Number(_458[j].name.substr(3));
}
}
var _459=$("current_prefs");
if(_457!=_459.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_457,filter:_455,feed:1}).toQueryString(),onComplete:function(){
Element.update(_454,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _45a=parseInt(pf.getStyle("height"));
var _45b=new fx.Height("preference_feedback",{duration:600});
_45b.hide();
_45b.custom(0,_45a);
}});
_459.value=_457;
}else{
Element.update(_454,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _45c=parseInt(pf.getStyle("height"));
var _45d=new fx.Height("preference_feedback",{duration:600});
_45d.hide();
_45d.custom(0,_45c);
}
}
var curs=$$(".ht_cur");
var _45e="";
for(var i=0;i<curs.length;i++){
_45e=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_456=="edit"){
if(_45e=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_45e){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_456=="edit"){
_454.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_45f,_460,_461){
this.id=id;
this.feedItemId=fid;
this.cdate=_45f;
this.hidden=_460;
this.manager=_461;
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
},unhide:function(_462){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_462){
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
Event.observe(this.triggerId,"click",function(_463){
if(Event.element(_463).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _464=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_464){
elt.observe("mouseover",function(_465){
_465.show();
}.bind(this,_464));
elt.observe("mouseout",function(_466){
_466.hide();
}.bind(this,_464));
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
},share:function(_467){
if(_467===undefined){
_467=false;
}
if(_467){
var _468=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_468){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_469,_46a){
if(_469){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_46a){
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
var _46b=$(this.htmlId);
_46b.parentNode.insertBefore(hmsg,_46b);
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
},hideUser:function(_46c,_46d){
_46d=_46d?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_46c,force:_46d}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _46e=$(this.htmlId);
_46e.parentNode.insertBefore(hmsg,_46e);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_46c).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_46f,_470){
_470=_470?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_470,categoryId:_46f}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _471=$(this.htmlId);
_471.parentNode.insertBefore(hmsg,_471);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_46f).each(function(elt){
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
var _472=$("feed_posts_"+this.id).immediateDescendants();
var _473=_472.size();
_472.each(function(elt,_474){
if(_474==_473-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _475=$("feed_comments_"+this.id).immediateDescendants();
var _476=_475.size();
var _477=0;
_475.each(function(elt,_478){
if(elt.hasClassName("show_previous")){
_477=_478;
}
});
_475.each(function(elt,_479){
if(_479==_477){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_47a,num,_47b){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_47a,num:num,startpos:_47b}).toQueryString(),onComplete:function(req){
var _47c=$("feed_posts_"+this.id);
_47c.down("div").hide();
new Insertion.Top(_47c,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_47d){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_47d}).toQueryString(),onComplete:function(req){
var _47e=$("feed_comments_"+this.id);
_47e.down("div").hide();
new Insertion.Top(_47e,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_47f,num,_480){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_47f,num:num,startpos:_480}).toQueryString(),onComplete:function(req){
var _481=$("feed_comments_"+this.id);
_481.down("div").hide();
new Insertion.Top(_481,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _482=$("feed_comments_"+this.id);
_482.innerHTML+=data["render"];
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
},observePostReporting:function(_483){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _484=$$("#story_"+this.id+" .feed_post");
if(_484.size()>1){
_484.each(function(elt){
var _485=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _486=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_485]=_486;
elt.observe("mouseover",_486);
var _487=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_485]=_487;
elt.observe("mouseout",_487);
var _488=this.manager.reportPost.bind(this.manager,_485);
this.clickHandlers[_485]=_488;
elt.observe("click",_488);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _489=$(document.createElement("a"));
_489.innerHTML="cancel report";
_489.href="#";
msg.appendChild(_489);
var _48a=$(this.messageId);
_48a.innerHTML="";
_48a.appendChild(msg);
_48a.addClassName("report_instructions");
var _48b=parseInt(_48a.getStyle("height"));
var _48c=new fx.Height(this.messageId,{duration:500});
_48c.hide();
_48c.custom(0,_48b);
_489.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_484.size()==1){
var post=_484.detect(function(elt){
return true;
});
var _48d=post.id;
this.manager.reportPost(this.postIdFromDivId(_48d));
}
}
return false;
},postIdFromDivId:function(_48e){
return _48e.substring(_48e.lastIndexOf("_")+1);
},stopObservePostReporting:function(_48f){
var _490=$$("#story_"+this.id+" .feed_post");
if(_490.size()>1){
_490.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _491=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_491]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_491]);
elt.stopObserving("click",this.clickHandlers[_491]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_48f){
Event.stop(_48f);
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
function deleteStatus(_492){
link=jq(_492.target);
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
function markerMap(m,_493,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_493);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_494,_495){
this.markers.push(new infoMarker(this,_494,_495,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_496,_497,_498,_499){
this.markermap=_496;
this.marker=_497;
this.content=_498;
this.position=_499;
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
var _49a=$(this.legend.id+"_"+i);
if(_49a){
_49a.innerHTML="";
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
var _49b=this.directionsResult.routes[0];
var legs=_49b.legs;
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
var _49c=$(this.legend.id+"_"+i);
if(_49c){
_49c.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_49b.copyrights;
var _49d="";
for(var j=0;j<_49b.warnings.length;j++){
_49d+=_49b.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_49d;
};
markerMap.prototype.fetchDirections=function(){
var _49e=this.markers;
var l=_49e.length;
var _49f=new google.maps.LatLng(_49e[0].marker.getPosition().lat(),_49e[0].marker.getPosition().lng());
var _4a0=new google.maps.LatLng(_49e[l-1].marker.getPosition().lat(),_49e[l-1].marker.getPosition().lng());
var _4a1=[];
for(var i=1;i<l-1;i++){
_4a1.push({location:new google.maps.LatLng(_49e[i].marker.getPosition().lat(),_49e[i].marker.getPosition().lng()),stopover:true});
}
var _4a2={origin:_49f,destination:_4a0,waypoints:_4a1,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _4a3=new google.maps.DirectionsService();
_4a3.route(_4a2,function(_4a4,_4a5){
if(_4a5==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_4a4;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_4a6){
var _4a7="map_canvas_"+id;
var _4a8=mm.getMapById(id);
if(!_4a8){
var map=new google.maps.Map(document.getElementById(_4a7));
var _4a8=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_4a8);
sv=true;
}else{
var map=_4a8.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_4a8.removeAllMarkers();
var _4a9="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _4aa=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_4aa+".png";
var _4ab="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _4ac=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_4a8.addMarker(_4ac,_4ab);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_4a9+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_4a8.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_4a9+="<div id=\""+_4a8.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_4a9+="<div id=\""+_4a8.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_4a8.legend.innerHTML=_4a9;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_4a6||!_4a8.directionsResult){
_4a8.fetchDirections();
}else{
_4a8.renderDirections();
}
}else{
var _4ad={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_4a8.directionsResult=_4ad;
_4a8.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_4ae){
var id=_4ae.markermap.id;
if(!id){
return;
}
var _4af=mapLetterFromPosition(_4ae.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_4af+".png";
_4ae.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_4ae.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_4b0){
var id=_4b0.markermap.id;
if(!id){
return;
}
var _4b1=mapLetterFromPosition(_4b0.position);
var icon="http://www.google.com/mapfiles/marker_green"+_4b1+".png";
_4b0.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_4b0.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_4b2,id,_4b3){
var _4b4=mm.getMapById(id);
if(_4b3<_4b4.markers.length){
highlightMarker(_4b4.markers[_4b3]);
}
};
function unhighlightMapMarker(_4b5,id,_4b6){
var _4b7=mm.getMapById(id);
if(_4b6<_4b7.markers.length){
unhighlightMarker(_4b7.markers[_4b6]);
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
var _4b8=jQuery("#editor_box");
if(_4b8.hasClass("edit_box")){
jQuery(".message",_4b8.closest(".postright")).show();
}
_4b8.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_4b9,_4ba){
var ta=jq("#editor_box textarea");
var _4bb=ta.val();
if(_4bb.length){
ta.val(_4bb+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_4b9,_4ba)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_4b9,_4ba)+"[/img]\n\n");
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
var _4bc=jQuery("#report_box");
_4bc.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _4bd=jQuery(this).closest("div.replies_box_wrapper");
var _4be=jQuery(this).closest("div.reply_collapser");
if(_4be.hasClass("show")){
_4be.addClass("hide").removeClass("show");
jQuery("a",_4be).html("<span></span>");
jQuery("> .replies_box",_4bd).slideDown();
}else{
jQuery("> .replies_box",_4bd).slideUp(500,function(){
_4be.addClass("show").removeClass("hide");
jQuery("a",_4be).html("<span></span>"+jQuery("li.threaded",_4bd).length+" replies");
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
var _4bf=jQuery(this);
var _4c0=jQuery("#threaded_reply_to_box");
if(_4bf.html()=="hide"){
_4bf.html("this");
_4c0.hide();
return false;
}
var _4c1=_4bf.attr("class").substr(7);
var _4c2=jQuery("#post"+_4c1+" .username").html();
var html="<p class=\"by\">By "+_4c2+"</p>"+jQuery("#message"+_4c1).html();
var _4c3=_4bf.closest("li.threaded");
if(_4c0.length>0){
_4c3.append(_4c0);
}else{
jQuery(_4c3).append("<div id=\"threaded_reply_to_box\"></div>");
_4c0=jQuery("#threaded_reply_to_box");
}
_4c0.html(html);
var pos=_4bf.position();
var _4c4=_4bf.width();
_4c0.css({"left":(pos.left+_4c4)+"px","top":pos.top+"px"});
_4c0.show();
_4bf.html("hide");
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
var _4c5=jQuery(this);
_4c5.attr("src",_4c5.data("src"));
});
});
});
function show_post_reply_box(_4c6){
jQuery("li.threaded img.wait").remove();
_4c6.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _4c7=jQuery("#editor_box");
_4c7.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_4c7).text("submit");
jQuery("form",_4c7).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_4c7).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _4c8=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _4c9=_4c8?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_4c9+="<br/>";
jQuery("textarea",_4c7).after(_4c9);
}
if(jQuery("#follow_topic").length==0){
var _4ca="checked";
var _4cb=window.location.pathname;
var arr=_4cb.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _4c9="<p id=\"follow_topic\"></p>";
jQuery("textarea",_4c7).after(_4c9);
}
jQuery("#posterror ul",_4c7).html("");
jQuery("#posterror",_4c7).hide();
jQuery("textarea",_4c7).val("");
jQuery("#postId",_4c7).val(_4c6.attr("id").substring(4));
_4c7.append(jQuery("#formatting_tips"));
_4c7.show();
var x=_4c7.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_4cc){
jQuery("li.threaded img.wait").remove();
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _4cd=jQuery("#report_box");
jQuery("#reportPostId",_4cd).val(_4cc.attr("id").substring(4));
jQuery("form",_4cd).ajaxForm({type:"POST",success:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_4cc).append(_4cd);
jQuery(">.post_wrap > .actionmenu",_4cc).append(_4cd);
_4cd.show();
var x=_4cd.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyError(data,_4ce,_4cf){
alert("There may have been an error posting your reply ("+_4ce+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_4d0,_4d1){
alert("There may have been an error updating your post ("+_4d0+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_4d2,_4d3){
jQuery("li.threaded img.wait").remove();
if(_4d3=="error"){
alert(_4d2.responseText);
return;
}
data=eval("("+_4d2.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _4d4=jQuery("#editor_box");
_4d4.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_4d4).text("Save");
jQuery("form",_4d4).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_4d4).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _4d5=document.getElementById("admincenter");
replyOptionsHTML=_4d5?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_4d4).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_4d4).html("");
jQuery("#posterror",_4d4).hide();
jQuery("#postId",_4d4).val(data.postId);
jQuery("textarea",_4d4).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_4d4.append(jQuery("#formatting_tips"));
_4d4.show();
var x=_4d4.offset().top-300;
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
function processDeleteResponse(_4d6,_4d7,_4d8){
if(_4d7=="error"){
jQuery("li.threaded img.wait").remove();
alert(_4d6);
}
};
function processUndeleteResponse(_4d9,_4da,_4db){
if(_4da=="error"){
jQuery("li.threaded img.wait").remove();
alert(_4d9);
}
};
function processReportResponse(_4dc){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _4dd=jQuery("#report_box");
_4dd.hide();
alert(_4dc);
};
(function($){
$.extend($.fn,{validate:function(_4de){
if(!this.length){
_4de&&_4de.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _4df=$.data(this[0],"validator");
if(_4df){
return _4df;
}
_4df=new $.validator(_4de,this[0]);
$.data(this[0],"validator",_4df);
if(_4df.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_4df.cancelSubmit=true;
});
if(_4df.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_4df.submitButton=this;
});
}
this.submit(function(_4e0){
if(_4df.settings.debug){
_4e0.preventDefault();
}
function _4e1(){
if(_4df.settings.submitHandler){
if(_4df.submitButton){
var _4e2=$("<input type='hidden'/>").attr("name",_4df.submitButton.name).val(_4df.submitButton.value).appendTo(_4df.currentForm);
}
_4df.settings.submitHandler.call(_4df,_4df.currentForm);
if(_4df.submitButton){
_4e2.remove();
}
return false;
}
return true;
};
if(_4df.cancelSubmit){
_4df.cancelSubmit=false;
return _4e1();
}
if(_4df.form()){
if(_4df.pendingRequest){
_4df.formSubmitted=true;
return false;
}
return _4e1();
}else{
_4df.focusInvalid();
return false;
}
});
}
return _4df;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _4e3=true;
var _4e4=$(this[0].form).validate();
this.each(function(){
_4e3&=_4e4.element(this);
});
return _4e3;
}
},removeAttrs:function(_4e5){
var _4e6={},_4e7=this;
$.each(_4e5.split(/\s/),function(_4e8,_4e9){
_4e6[_4e9]=_4e7.attr(_4e9);
_4e7.removeAttr(_4e9);
});
return _4e6;
},rules:function(_4ea,_4eb){
var _4ec=this[0];
if(_4ea){
var _4ed=$.data(_4ec.form,"validator").settings;
var _4ee=_4ed.rules;
var _4ef=$.validator.staticRules(_4ec);
switch(_4ea){
case "add":
$.extend(_4ef,$.validator.normalizeRule(_4eb));
_4ee[_4ec.name]=_4ef;
if(_4eb.messages){
_4ed.messages[_4ec.name]=$.extend(_4ed.messages[_4ec.name],_4eb.messages);
}
break;
case "remove":
if(!_4eb){
delete _4ee[_4ec.name];
return _4ef;
}
var _4f0={};
$.each(_4eb.split(/\s/),function(_4f1,_4f2){
_4f0[_4f2]=_4ef[_4f2];
delete _4ef[_4f2];
});
return _4f0;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_4ec),$.validator.classRules(_4ec),$.validator.attributeRules(_4ec),$.validator.staticRules(_4ec)),_4ec);
if(data.required){
var _4f3=data.required;
delete data.required;
data=$.extend({required:_4f3},data);
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
$.validator=function(_4f4,form){
this.settings=$.extend(true,{},$.validator.defaults,_4f4);
this.currentForm=form;
this.init();
};
$.validator.format=function(_4f5,_4f6){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_4f5);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_4f6.constructor!=Array){
_4f6=$.makeArray(arguments).slice(1);
}
if(_4f6.constructor!=Array){
_4f6=[_4f6];
}
$.each(_4f6,function(i,n){
_4f5=_4f5.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _4f5;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_4f7){
this.lastActive=_4f7;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_4f7,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_4f7)).hide();
}
},onfocusout:function(_4f8){
if(!this.checkable(_4f8)&&(_4f8.name in this.submitted||!this.optional(_4f8))){
this.element(_4f8);
}
},onkeyup:function(_4f9){
if(_4f9.name in this.submitted||_4f9==this.lastElement){
this.element(_4f9);
}
},onclick:function(_4fa){
if(_4fa.name in this.submitted){
this.element(_4fa);
}else{
if(_4fa.parentNode.name in this.submitted){
this.element(_4fa.parentNode);
}
}
},highlight:function(_4fb,_4fc,_4fd){
$(_4fb).addClass(_4fc).removeClass(_4fd);
},unhighlight:function(_4fe,_4ff,_500){
$(_4fe).removeClass(_4ff).addClass(_500);
}},setDefaults:function(_501){
$.extend($.validator.defaults,_501);
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
var _502=(this.groups={});
$.each(this.settings.groups,function(key,_503){
$.each(_503.split(/\s/),function(_504,name){
_502[name]=key;
});
});
var _505=this.settings.rules;
$.each(_505,function(key,_506){
_505[key]=$.validator.normalizeRule(_506);
});
function _507(_508){
var _509=$.data(this[0].form,"validator"),_50a="on"+_508.type.replace(/^validate/,"");
_509.settings[_50a]&&_509.settings[_50a].call(_509,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_507).validateDelegate(":radio, :checkbox, select, option","click",_507);
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
for(var i=0,_50b=(this.currentElements=this.elements());_50b[i];i++){
this.check(_50b[i]);
}
return this.valid();
},element:function(_50c){
_50c=this.clean(_50c);
this.lastElement=_50c;
this.prepareElement(_50c);
this.currentElements=$(_50c);
var _50d=this.check(_50c);
if(_50d){
delete this.invalid[_50c.name];
}else{
this.invalid[_50c.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _50d;
},showErrors:function(_50e){
if(_50e){
$.extend(this.errorMap,_50e);
this.errorList=[];
for(var name in _50e){
this.errorList.push({message:_50e[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_50f){
return !(_50f.name in _50e);
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
var _510=0;
for(var i in obj){
_510++;
}
return _510;
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
var _511=this.lastActive;
return _511&&$.grep(this.errorList,function(n){
return n.element.name==_511.name;
}).length==1&&_511;
},elements:function(){
var _512=this,_513={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_512.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _513||!_512.objectLength($(this).rules())){
return false;
}
_513[this.name]=true;
return true;
});
},clean:function(_514){
return $(_514)[0];
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
},prepareElement:function(_515){
this.reset();
this.toHide=this.errorsFor(_515);
},check:function(_516){
_516=this.clean(_516);
if(this.checkable(_516)){
_516=this.findByName(_516.name).not(this.settings.ignore)[0];
}
var _517=$(_516).rules();
var _518=false;
for(var _519 in _517){
var rule={method:_519,parameters:_517[_519]};
try{
var _51a=$.validator.methods[_519].call(this,_516.value.replace(/\r/g,""),_516,rule.parameters);
if(_51a=="dependency-mismatch"){
_518=true;
continue;
}
_518=false;
if(_51a=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_516));
return;
}
if(!_51a){
this.formatAndAdd(_516,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_516.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_518){
return;
}
if(this.objectLength(_517)){
this.successList.push(_516);
}
return true;
},customMetaMessage:function(_51b,_51c){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_51b).metadata()[this.settings.meta]:$(_51b).metadata();
return meta&&meta.messages&&meta.messages[_51c];
},customMessage:function(name,_51d){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_51d]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_51e,_51f){
return this.findDefined(this.customMessage(_51e.name,_51f),this.customMetaMessage(_51e,_51f),!this.settings.ignoreTitle&&_51e.title||undefined,$.validator.messages[_51f],"<strong>Warning: No message defined for "+_51e.name+"</strong>");
},formatAndAdd:function(_520,rule){
var _521=this.defaultMessage(_520,rule.method),_522=/\$?\{(\d+)\}/g;
if(typeof _521=="function"){
_521=_521.call(this,rule.parameters,_520);
}else{
if(_522.test(_521)){
_521=jQuery.format(_521.replace(_522,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_521,element:_520});
this.errorMap[_520.name]=_521;
this.submitted[_520.name]=_521;
},addWrapper:function(_523){
if(this.settings.wrapper){
_523=_523.add(_523.parent(this.settings.wrapper));
}
return _523;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _524=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_524.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_524.element,_524.message);
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
for(var i=0,_525=this.validElements();_525[i];i++){
this.settings.unhighlight.call(this,_525[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_526,_527){
var _528=this.errorsFor(_526);
if(_528.length){
_528.removeClass().addClass(this.settings.errorClass);
_528.attr("generated")&&_528.html(_527);
}else{
_528=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_526),generated:true}).addClass(this.settings.errorClass).html(_527||"");
if(this.settings.wrapper){
_528=_528.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_528).length){
this.settings.errorPlacement?this.settings.errorPlacement(_528,$(_526)):_528.insertAfter(_526);
}
}
if(!_527&&this.settings.success){
_528.text("");
typeof this.settings.success=="string"?_528.addClass(this.settings.success):this.settings.success(_528);
}
this.toShow=this.toShow.add(_528);
},errorsFor:function(_529){
var name=this.idOrName(_529);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_52a){
return this.groups[_52a.name]||(this.checkable(_52a)?_52a.name:_52a.id||_52a.name);
},checkable:function(_52b){
return /radio|checkbox/i.test(_52b.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_52c,_52d){
return _52d.form==form&&_52d.name==name&&_52d||null;
});
},getLength:function(_52e,_52f){
switch(_52f.nodeName.toLowerCase()){
case "select":
return $("option:selected",_52f).length;
case "input":
if(this.checkable(_52f)){
return this.findByName(_52f.name).filter(":checked").length;
}
}
return _52e.length;
},depend:function(_530,_531){
return this.dependTypes[typeof _530]?this.dependTypes[typeof _530](_530,_531):true;
},dependTypes:{"boolean":function(_532,_533){
return _532;
},"string":function(_534,_535){
return !!$(_534,_535.form).length;
},"function":function(_536,_537){
return _536(_537);
}},optional:function(_538){
return !$.validator.methods.required.call(this,$.trim(_538.value),_538)&&"dependency-mismatch";
},startRequest:function(_539){
if(!this.pending[_539.name]){
this.pendingRequest++;
this.pending[_539.name]=true;
}
},stopRequest:function(_53a,_53b){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_53a.name];
if(_53b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_53b&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_53c){
return $.data(_53c,"previousValue")||$.data(_53c,"previousValue",{old:null,valid:true,message:this.defaultMessage(_53c,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_53d,_53e){
_53d.constructor==String?this.classRuleSettings[_53d]=_53e:$.extend(this.classRuleSettings,_53d);
},classRules:function(_53f){
var _540={};
var _541=$(_53f).attr("class");
_541&&$.each(_541.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_540,$.validator.classRuleSettings[this]);
}
});
return _540;
},attributeRules:function(_542){
var _543={};
var _544=$(_542);
for(var _545 in $.validator.methods){
var _546=_544.attr(_545);
if(_546){
_543[_545]=_546;
}
}
if(_543.maxlength&&/-1|2147483647|524288/.test(_543.maxlength)){
delete _543.maxlength;
}
return _543;
},metadataRules:function(_547){
if(!$.metadata){
return {};
}
var meta=$.data(_547.form,"validator").settings.meta;
return meta?$(_547).metadata()[meta]:$(_547).metadata();
},staticRules:function(_548){
var _549={};
var _54a=$.data(_548.form,"validator");
if(_54a.settings.rules){
_549=$.validator.normalizeRule(_54a.settings.rules[_548.name])||{};
}
return _549;
},normalizeRules:function(_54b,_54c){
$.each(_54b,function(prop,val){
if(val===false){
delete _54b[prop];
return;
}
if(val.param||val.depends){
var _54d=true;
switch(typeof val.depends){
case "string":
_54d=!!$(val.depends,_54c.form).length;
break;
case "function":
_54d=val.depends.call(_54c,_54c);
break;
}
if(_54d){
_54b[prop]=val.param!==undefined?val.param:true;
}else{
delete _54b[prop];
}
}
});
$.each(_54b,function(rule,_54e){
_54b[rule]=$.isFunction(_54e)?_54e(_54c):_54e;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_54b[this]){
_54b[this]=Number(_54b[this]);
}
});
$.each(["rangelength","range"],function(){
if(_54b[this]){
_54b[this]=[Number(_54b[this][0]),Number(_54b[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_54b.min&&_54b.max){
_54b.range=[_54b.min,_54b.max];
delete _54b.min;
delete _54b.max;
}
if(_54b.minlength&&_54b.maxlength){
_54b.rangelength=[_54b.minlength,_54b.maxlength];
delete _54b.minlength;
delete _54b.maxlength;
}
}
if(_54b.messages){
delete _54b.messages;
}
return _54b;
},normalizeRule:function(data){
if(typeof data=="string"){
var _54f={};
$.each(data.split(/\s/),function(){
_54f[this]=true;
});
data=_54f;
}
return data;
},addMethod:function(name,_550,_551){
$.validator.methods[name]=_550;
$.validator.messages[name]=_551!=undefined?_551:$.validator.messages[name];
if(_550.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_552,_553,_554){
if(!this.depend(_554,_553)){
return "dependency-mismatch";
}
switch(_553.nodeName.toLowerCase()){
case "select":
var val=$(_553).val();
return val&&val.length>0;
case "input":
if(this.checkable(_553)){
return this.getLength(_552,_553)>0;
}
default:
return $.trim(_552).length>0;
}
},remote:function(_555,_556,_557){
if(this.optional(_556)){
return "dependency-mismatch";
}
var _558=this.previousValue(_556);
if(!this.settings.messages[_556.name]){
this.settings.messages[_556.name]={};
}
_558.originalMessage=this.settings.messages[_556.name].remote;
this.settings.messages[_556.name].remote=_558.message;
_557=typeof _557=="string"&&{url:_557}||_557;
if(this.pending[_556.name]){
return "pending";
}
if(_558.old===_555){
return _558.valid;
}
_558.old=_555;
var _559=this;
this.startRequest(_556);
var data={};
data[_556.name]=_555;
$.ajax($.extend(true,{url:_557,mode:"abort",port:"validate"+_556.name,dataType:"json",data:data,success:function(_55a){
_559.settings.messages[_556.name].remote=_558.originalMessage;
var _55b=_55a===true;
if(_55b){
var _55c=_559.formSubmitted;
_559.prepareElement(_556);
_559.formSubmitted=_55c;
_559.successList.push(_556);
_559.showErrors();
}else{
var _55d={};
var _55e=_55a||_559.defaultMessage(_556,"remote");
_55d[_556.name]=_558.message=$.isFunction(_55e)?_55e(_555):_55e;
_559.showErrors(_55d);
}
_558.valid=_55b;
_559.stopRequest(_556,_55b);
}},_557));
return "pending";
},minlength:function(_55f,_560,_561){
return this.optional(_560)||this.getLength($.trim(_55f),_560)>=_561;
},maxlength:function(_562,_563,_564){
return this.optional(_563)||this.getLength($.trim(_562),_563)<=_564;
},rangelength:function(_565,_566,_567){
var _568=this.getLength($.trim(_565),_566);
return this.optional(_566)||(_568>=_567[0]&&_568<=_567[1]);
},min:function(_569,_56a,_56b){
return this.optional(_56a)||_569>=_56b;
},max:function(_56c,_56d,_56e){
return this.optional(_56d)||_56c<=_56e;
},range:function(_56f,_570,_571){
return this.optional(_570)||(_56f>=_571[0]&&_56f<=_571[1]);
},email:function(_572,_573){
return this.optional(_573)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_572);
},url:function(_574,_575){
return this.optional(_575)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_574);
},date:function(_576,_577){
return this.optional(_577)||!/Invalid|NaN/.test(new Date(_576));
},dateISO:function(_578,_579){
return this.optional(_579)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_578);
},number:function(_57a,_57b){
return this.optional(_57b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_57a);
},digits:function(_57c,_57d){
return this.optional(_57d)||/^\d+$/.test(_57c);
},creditcard:function(_57e,_57f){
if(this.optional(_57f)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_57e)){
return false;
}
var _580=0,_581=0,_582=false;
_57e=_57e.replace(/\D/g,"");
for(var n=_57e.length-1;n>=0;n--){
var _583=_57e.charAt(n);
var _581=parseInt(_583,10);
if(_582){
if((_581*=2)>9){
_581-=9;
}
}
_580+=_581;
_582=!_582;
}
return (_580%10)==0;
},accept:function(_584,_585,_586){
_586=typeof _586=="string"?_586.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_585)||_584.match(new RegExp(".("+_586+")$","i"));
},equalTo:function(_587,_588,_589){
var _58a=$(_589).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_588).valid();
});
return $.trim(_587)==$.trim(_58a.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _58b={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_58c,_58d,xhr){
var port=_58c.port;
if(_58c.mode=="abort"){
if(_58b[port]){
_58b[port].abort();
}
_58b[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_58e){
var mode=("mode" in _58e?_58e:$.ajaxSettings).mode,port=("port" in _58e?_58e:$.ajaxSettings).port;
if(mode=="abort"){
if(_58b[port]){
_58b[port].abort();
}
return (_58b[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_58f,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_58f,_590,true);
},teardown:function(){
this.removeEventListener(_58f,_590,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _590(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_591,type,_592){
return this.bind(type,function(_593){
var _594=$(_593.target);
if(_594.is(_591)){
return _592.apply(_594,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_595,_596,_597){
return this.optional(_596)||this.getLength(jq.trim(_595),_596)==_597;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_598,_599,_59a){
if(!this.depend(_59a,_599)){
return "dependency-mismatch";
}
switch(_599.nodeName.toLowerCase()){
case "select":
var val=jq(_599).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_599)){
return this.getLength(_598,_599)==0;
}
default:
return jq.trim(_598).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_59b,_59c){
if(!this.depend(_59c,_59b)){
return "dependency-mismatch";
}
var _59d=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_59d=true;
}else{
var _59e=ssn.split("-");
if(_59e[0]=="000"||_59e[1]=="00"||_59e[2]=="0000"){
_59d=true;
}
if(_59e[0]=="666"){
_59d=true;
}
var _59f=parseInt(_59e[0],10);
if(_59f>=900){
if(_59e[1][0]!=7&&_59e[1][0]!=8){
_59d=true;
}
}
}
return !_59d;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_5a0,_5a1,_5a2){
if(!this.depend(_5a2,_5a1)){
return "dependency-mismatch";
}
return _5a0.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_5a3,_5a4){
if(!this.depend(_5a4,_5a3)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_5a5,_5a6,_5a7){
var _5a5=jq.trim(_5a5);
if(_5a5.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _5a8=_5a5.split("-");
var m=1*_5a8[0]-1;
var d=1*_5a8[1];
var y=1*_5a8[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_5a9,_5aa,_5ab){
return jq.trim(_5a9).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
jQuery.validator.addMethod("requiredNoPlaceholder",function(_5ac,_5ad,_5ae){
if(!this.depend(_5ae,_5ad)){
return "dependency-mismatch";
}
if(jq(_5ad).hasClass("placeholder")){
return false;
}
switch(_5ad.nodeName.toLowerCase()){
case "select":
var val=jq(_5ad).val();
return val&&val.length>0;
case "input":
if(this.checkable(_5ad)){
return this.getLength(_5ac,_5ad)>0;
}
default:
return jq.trim(_5ac).length>0;
}
},"This field is required.");
(function(_5af,$,_5b0){
"use strict";
var _5b1=$.event,_5b2;
_5b1.special.smartresize={setup:function(){
$(this).bind("resize",_5b1.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_5b1.special.smartresize.handler);
},handler:function(_5b3,_5b4){
var _5b5=this,args=arguments;
_5b3.type="smartresize";
if(_5b2){
clearTimeout(_5b2);
}
_5b2=setTimeout(function(){
jQuery.event.handle.apply(_5b5,args);
},_5b4==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_5b6,_5b7){
this.element=$(_5b7);
this._create(_5b6);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_5b8){
var _5b9=this.options.itemSelector;
return !_5b9?_5b8:_5b8.filter(_5b9).add(_5b8.find(_5b9));
},_getBricks:function(_5ba){
var _5bb=this._filterFindBricks(_5ba).css({position:"absolute"}).addClass("masonry-brick");
return _5bb;
},_create:function(_5bc){
this.options=$.extend(true,{},$.Mason.settings,_5bc);
this.styleQueue=[];
var _5bd=this.element[0].style;
this.originalStyle={height:_5bd.height||""};
var _5be=this.options.containerStyle;
for(var prop in _5be){
this.originalStyle[prop]=_5bd[prop]||"";
}
this.element.css(_5be);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _5bf=this;
setTimeout(function(){
_5bf.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_5af).bind("smartresize.masonry",function(){
_5bf.resize();
});
}
this.reloadItems();
},_init:function(_5c0){
this._getColumns();
this._reLayout(_5c0);
},option:function(key,_5c1){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_5c2,_5c3){
for(var i=0,len=_5c2.length;i<len;i++){
this._placeBrick(_5c2[i]);
}
var _5c4={};
_5c4.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _5c5=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_5c5++;
}
_5c4.width=(this.cols-_5c5)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_5c4});
var _5c6=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_5c7=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_5c6](obj.style,_5c7);
}
this.styleQueue=[];
if(_5c3){
_5c3.call(_5c2);
}
this.isLaidOut=true;
},_getColumns:function(){
var _5c8=this.options.isFitWidth?this.element.parent():this.element,_5c9=_5c8.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_5c9):this.options.columnWidth||this.$bricks.outerWidth(true)||_5c9;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_5c9+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_5ca){
var _5cb=$(_5ca),_5cc,_5cd,_5ce,_5cf,j;
_5cc=Math.ceil(_5cb.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_5cc=Math.min(_5cc,this.cols);
if(_5cc===1){
_5ce=this.colYs;
}else{
_5cd=this.cols+1-_5cc;
_5ce=[];
for(j=0;j<_5cd;j++){
_5cf=this.colYs.slice(j,j+_5cc);
_5ce[j]=Math.max.apply(Math,_5cf);
}
}
var _5d0=Math.min.apply(Math,_5ce),_5d1=0;
for(var i=0,len=_5ce.length;i<len;i++){
if(_5ce[i]===_5d0){
_5d1=i;
break;
}
}
var _5d2={top:_5d0+this.offset.y};
_5d2[this.horizontalDirection]=this.columnWidth*_5d1+this.offset.x;
this.styleQueue.push({$el:_5cb,style:_5d2});
var _5d3=_5d0+_5cb.outerHeight(true),_5d4=this.cols+1-len;
for(i=0;i<_5d4;i++){
this.colYs[_5d1+i]=_5d3;
}
},resize:function(){
var _5d5=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_5d5){
this._reLayout();
}
},_reLayout:function(_5d6){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_5d6);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_5d7){
this.reloadItems();
this._init(_5d7);
},appended:function(_5d8,_5d9,_5da){
if(_5d9){
this._filterFindBricks(_5d8).css({top:this.element.height()});
var _5db=this;
setTimeout(function(){
_5db._appended(_5d8,_5da);
},1);
}else{
this._appended(_5d8,_5da);
}
},_appended:function(_5dc,_5dd){
var _5de=this._getBricks(_5dc);
this.$bricks=this.$bricks.add(_5de);
this.layout(_5de,_5dd);
},remove:function(_5df){
this.$bricks=this.$bricks.not(_5df);
_5df.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _5e0=this.element[0].style;
for(var prop in this.originalStyle){
_5e0[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_5af).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_5e1){
var _5e2=this,_5e3=_5e2.find("img").add(_5e2.filter("img")),len=_5e3.length,_5e4="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_5e5=[];
function _5e6(){
_5e1.call(_5e2,_5e3);
};
function _5e7(_5e8){
var img=_5e8.target;
if(img.src!==_5e4&&$.inArray(img,_5e5)===-1){
_5e5.push(img);
if(--len<=0){
setTimeout(_5e6);
_5e3.unbind(".imagesLoaded",_5e7);
}
}
};
if(!len){
_5e6();
}
_5e3.bind("load.imagesLoaded error.imagesLoaded",_5e7).each(function(){
var src=this.src;
this.src=_5e4;
this.src=src;
});
return _5e2;
};
var _5e9=function(_5ea){
if(_5af.console){
_5af.console.error(_5ea);
}
};
$.fn.masonry=function(_5eb){
if(typeof _5eb==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _5ec=$.data(this,"masonry");
if(!_5ec){
_5e9("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_5eb+"'");
return;
}
if(!$.isFunction(_5ec[_5eb])||_5eb.charAt(0)==="_"){
_5e9("no such method '"+_5eb+"' for masonry instance");
return;
}
_5ec[_5eb].apply(_5ec,args);
});
}else{
this.each(function(){
var _5ed=$.data(this,"masonry");
if(_5ed){
_5ed.option(_5eb||{});
_5ed._init();
}else{
$.data(this,"masonry",new $.Mason(_5eb,this));
}
});
}
return this;
};
})(window,jQuery);
(function($){
$.expander={version:"1.4.3",defaults:{slicePoint:100,preserveWords:true,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:false,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:true,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null}};
$.fn.expander=function(_5ee){
var meth="init";
if(typeof _5ee=="string"){
meth=_5ee;
_5ee={};
}
var opts=$.extend({},$.expander.defaults,_5ee),_5ef=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,_5f0=opts.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,_5f1=/<\/?(\w+)[^>]*>/g,_5f2=/<(\w+)[^>]*>/g,_5f3=/<\/(\w+)>/g,_5f4=/(<\/[^>]+>)\s*$/,_5f5=/^<[^>]+>.?/,_5f6;
var _5f7={init:function(){
this.each(function(){
var i,l,tmp,_5f8,_5f9,_5fa,_5fb,_5fc,_5fd,_5fe,_5ff,_600,_601=[],_602=[],_603={},_604=this,_605=$(this),_606=$([]),o=$.extend({},opts,_605.data("expander")||$.meta&&_605.data()||{}),_607=!!_605.find("."+o.detailClass).length,_608=!!_605.find("*").filter(function(){
var _609=$(this).css("display");
return (/^block|table|list/).test(_609);
}).length,el=_608?"div":"span",_60a=el+"."+o.detailClass,_60b="span."+o.moreClass,_60c=o.expandSpeed||0,_60d=$.trim(_605.html()),_60e=$.trim(_605.text()),_60f=_60d.slice(0,o.slicePoint);
if($.data(this,"expanderInit")){
return;
}
$.data(this,"expanderInit",true);
$.each(["onSlice","beforeExpand","afterExpand","onCollapse"],function(_610,val){
_603[val]=$.isFunction(o[val]);
});
_60f=_620(_60f);
_5f9=_60f.replace(_5f1,"").length;
while(_5f9<o.slicePoint){
_5f8=_60d.charAt(_60f.length);
if(_5f8=="<"){
_5f8=_60d.slice(_60f.length).match(_5f5)[0];
}
_60f+=_5f8;
_5f9++;
}
_60f=_620(_60f,o.preserveWords);
_5fa=_60f.match(_5f2)||[];
_5fb=_60f.match(_5f3)||[];
tmp=[];
$.each(_5fa,function(_611,val){
if(!_5ef.test(val)){
tmp.push(val);
}
});
_5fa=tmp;
l=_5fb.length;
for(i=0;i<l;i++){
_5fb[i]=_5fb[i].replace(_5f3,"$1");
}
$.each(_5fa,function(_612,val){
var _613=val.replace(_5f2,"$1");
var _614=$.inArray(_613,_5fb);
if(_614===-1){
_601.push(val);
_602.push("</"+_613+">");
}else{
_5fb.splice(_614,1);
}
});
_602.reverse();
if(!_607){
_5fd=_60d.slice(_60f.length);
_5fe=$.trim(_5fd.replace(_5f1,""));
if(_5fe===""||_5fe.split(/\s+/).length<o.widow){
return;
}
_5fc=_602.pop()||"";
_60f+=_602.join("");
_5fd=_601.join("")+_5fd;
}else{
_5fd=_605.find(_60a).remove().html();
_60f=_605.html();
_60d=_60f+_5fd;
_5fc="";
}
o.moreLabel=_605.find(_60b).length?"":_61f(o);
if(_608){
_5fd=_60d;
}
_60f+=_5fc;
o.summary=_60f;
o.details=_5fd;
o.lastCloseTag=_5fc;
if(_603.onSlice){
tmp=o.onSlice.call(_604,o);
o=tmp&&tmp.details?tmp:o;
}
var html=_61c(o,_608);
_605.html(html);
_5ff=_605.find(_60a);
_600=_605.find(_60b);
_5ff[o.collapseEffect](0);
_600.find("a").unbind("click.expander").bind("click.expander",_615);
_606=_605.find("div."+o.summaryClass);
if(o.userCollapse&&!_605.find("span."+o.lessClass).length){
_605.find(_60a).append("<span class=\""+o.lessClass+"\">"+o.userCollapsePrefix+"<a href=\"#\">"+o.userCollapseText+"</a></span>");
}
_605.find("span."+o.lessClass+" a").unbind("click.expander").bind("click.expander",function(_616){
_616.preventDefault();
clearTimeout(_5f6);
var _617=$(this).closest(_60a);
_622(o,_617);
if(_603.onCollapse){
o.onCollapse.call(_604,true);
}
});
function _615(_618){
_618.preventDefault();
_600.hide();
_606.hide();
if(_603.beforeExpand){
o.beforeExpand.call(_604);
}
_5ff.stop(false,true)[o.expandEffect](_60c,function(){
_5ff.css({zoom:""});
if(_603.afterExpand){
o.afterExpand.call(_604);
}
_619(o,_5ff,_604);
});
};
});
},destroy:function(){
if(!this.data("expander")){
return;
}
this.removeData("expander");
this.each(function(){
var _61a=$(this),o=$.meta?$.extend({},opts,_61a.data()):opts,_61b=_61a.find("."+o.detailClass).contents();
_61a.find("."+o.moreClass).remove();
_61a.find("."+o.summaryClass).remove();
_61a.find("."+o.detailClass).after(_61b).remove();
_61a.find("."+o.lessClass).remove();
});
}};
if(_5f7[meth]){
_5f7[meth].call(this);
}
function _61c(o,_61d){
var el="span",_61e=o.summary;
if(_61d){
el="div";
if(_5f4.test(_61e)&&!o.expandAfterSummary){
_61e=_61e.replace(_5f4,o.moreLabel+"$1");
}else{
_61e+=o.moreLabel;
}
_61e="<div class=\""+o.summaryClass+"\">"+_61e+"</div>";
}else{
_61e+=o.moreLabel;
}
return [_61e,"<",el+" class=\""+o.detailClass+"\"",">",o.details,"</"+el+">"].join("");
};
function _61f(o){
var ret="<span class=\""+o.moreClass+"\">"+o.expandPrefix;
ret+="<a href=\"#\">"+o.expandText+"</a></span>";
return ret;
};
function _620(txt,_621){
if(txt.lastIndexOf("<")>txt.lastIndexOf(">")){
txt=txt.slice(0,txt.lastIndexOf("<"));
}
if(_621){
txt=txt.replace(_5f0,"");
}
return $.trim(txt);
};
function _622(o,el){
el.stop(true,true)[o.collapseEffect](o.collapseSpeed,function(){
var _623=el.prev("span."+o.moreClass).show();
if(!_623.length){
el.parent().children("div."+o.summaryClass).show().find("span."+o.moreClass).show();
}
});
};
function _619(_624,_625,_626){
if(_624.collapseTimer){
_5f6=setTimeout(function(){
_622(_624,_625);
if($.isFunction(_624.onCollapse)){
_624.onCollapse.call(_626,false);
}
},_624.collapseTimer);
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
var _627=$(this);
$(that).each(function(){
if($(this)[0]!==_627[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_628){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _628=="function"){
_628={success:_628};
}
var _629=this.attr("action");
var url=(typeof _629==="string")?$.trim(_629):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_628=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_628);
var veto={};
this.trigger("form-pre-serialize",[this,_628,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_628.beforeSerialize&&_628.beforeSerialize(this,_628)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_628.semantic);
if(_628.data){
_628.extraData=_628.data;
for(n in _628.data){
if(_628.data[n] instanceof Array){
for(var k in _628.data[n]){
a.push({name:n,value:_628.data[n][k]});
}
}else{
v=_628.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_628.beforeSubmit&&_628.beforeSubmit(a,this,_628)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_628,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_628.type.toUpperCase()=="GET"){
_628.url+=(_628.url.indexOf("?")>=0?"&":"?")+q;
_628.data=null;
}else{
_628.data=q;
}
var _62a=this,_62b=[];
if(_628.resetForm){
_62b.push(function(){
_62a.resetForm();
});
}
if(_628.clearForm){
_62b.push(function(){
_62a.clearForm();
});
}
if(!_628.dataType&&_628.target){
var _62c=_628.success||function(){
};
_62b.push(function(data){
var fn=_628.replaceTarget?"replaceWith":"html";
$(_628.target)[fn](data).each(_62c,arguments);
});
}else{
if(_628.success){
_62b.push(_628.success);
}
}
_628.success=function(data,_62d,xhr){
var _62e=_628.context||_628;
for(var i=0,max=_62b.length;i<max;i++){
_62b[i].apply(_62e,[data,_62d,xhr||_62a,_62a]);
}
};
var _62f=$("input:file",this).length>0;
var mp="multipart/form-data";
var _630=(_62a.attr("enctype")==mp||_62a.attr("encoding")==mp);
if(_628.iframe!==false&&(_62f||_628.iframe||_630)){
if(_628.closeKeepAlive){
$.get(_628.closeKeepAlive,_631);
}else{
_631();
}
}else{
$.ajax(_628);
}
this.trigger("form-submit-notify",[this,_628]);
return this;
function _631(){
var form=_62a[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_628);
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
var _632=0;
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
function _633(){
var t=_62a.attr("target"),a=_62a.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_62a.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_632=true;
cb();
},s.timeout);
}
var _634=[];
try{
if(s.extraData){
for(var n in s.extraData){
_634.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_62a.removeAttr("target");
}
$(_634).remove();
}
};
if(s.forceSync){
_633();
}else{
setTimeout(_633,10);
}
var data,doc,_635=50;
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
if(_632){
throw "timeout";
}
var _636=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_636);
if(!_636&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_635){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_637){
var _638={"content-type":s.dataType};
return _638[_637];
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
xhr.responseXML=_639(xhr.responseText);
}
}
data=_63b(xhr,s.dataType,s);
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
var _639=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _63a=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _63b=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_63a(data);
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
$.fn.ajaxForm=function(_63c){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_63c);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_63c);
}
}).bind("click.form-plugin",function(e){
var _63d=e.target;
var $el=$(_63d);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_63d=t[0];
}
var form=this;
form.clk=_63d;
if(_63d.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _63e=$el.offset();
form.clk_x=e.pageX-_63e.left;
form.clk_y=e.pageY-_63e.top;
}else{
form.clk_x=e.pageX-_63d.offsetLeft;
form.clk_y=e.pageY-_63d.offsetTop;
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
$.fn.formToArray=function(_63f){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_63f?form.getElementsByTagName("*"):form.elements;
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
if(_63f&&form.clk&&el.type=="image"){
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
if(!_63f&&form.clk){
var _640=$(form.clk),_641=_640[0];
n=_641.name;
if(n&&!_641.disabled&&_641.type=="image"){
a.push({name:n,value:_640.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_642){
return $.param(this.formToArray(_642));
};
$.fn.fieldSerialize=function(_643){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_643);
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
$.fn.fieldValue=function(_644){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_644);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_645){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_645===undefined){
_645=true;
}
if(_645&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _646=el.selectedIndex;
if(_646<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_646+1:ops.length);
for(var i=(one?_646:0);i<max;i++){
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
$.fn.selected=function(_647){
if(_647===undefined){
_647=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_647;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_647&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_647;
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
$.fn.extend({accordion:function(_648,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _648=="string"){
var _649=$.data(this,"ui-accordion");
_649[_648].apply(_649,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_648));
}
}
});
},activate:function(_64a){
return this.accordion("activate",_64a);
}});
$.ui.accordion=function(_64b,_64c){
this.options=_64c=$.extend({},$.ui.accordion.defaults,_64c);
this.element=_64b;
$(_64b).addClass("ui-accordion");
if(_64c.navigation){
var _64d=$(_64b).find("a").filter(_64c.navigationFilter);
if(_64d.length){
if(_64d.filter(_64c.header).length){
_64c.active=_64d;
}else{
_64c.active=_64d.parent().parent().prev();
_64d.addClass("current");
}
}
}
_64c.headers=$(_64b).find(_64c.header);
_64c.active=_64e(_64c.headers,_64c.active);
if(_64c.fillSpace){
var _64f=$(_64b).parent().height();
_64c.headers.each(function(){
_64f-=$(this).outerHeight();
});
var _650=0;
_64c.headers.next().each(function(){
_650=Math.max(_650,$(this).innerHeight()-$(this).height());
}).height(_64f-_650);
}else{
if(_64c.autoheight){
var _64f=0;
_64c.headers.next().each(function(){
_64f=Math.max(_64f,$(this).outerHeight());
}).height(_64f);
}
}
_64c.headers.not(_64c.active||"").next().hide();
_64c.active.parent().andSelf().addClass(_64c.selectedClass);
if(_64c.event){
$(_64b).bind((_64c.event)+".ui-accordion",_651);
}
};
$.ui.accordion.prototype={activate:function(_652){
_651.call(this.element,{target:_64e(this.options.headers,_652)[0]});
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
function _653(_654,_655){
return function(){
return _654.apply(_655,arguments);
};
};
function _656(_657){
if(!$.data(this,"ui-accordion")){
return;
}
var _658=$.data(this,"ui-accordion");
var _659=_658.options;
_659.running=_657?0:--_659.running;
if(_659.running){
return;
}
if(_659.clearStyle){
_659.toShow.add(_659.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_659.data],_659.change);
};
function _65a(_65b,_65c,data,_65d,down){
var _65e=$.data(this,"ui-accordion").options;
_65e.toShow=_65b;
_65e.toHide=_65c;
_65e.data=data;
var _65f=_653(_656,this);
_65e.running=_65c.size()==0?_65b.size():_65c.size();
if(_65e.animated){
if(!_65e.alwaysOpen&&_65d){
$.ui.accordion.animations[_65e.animated]({toShow:jQuery([]),toHide:_65c,complete:_65f,down:down,autoheight:_65e.autoheight});
}else{
$.ui.accordion.animations[_65e.animated]({toShow:_65b,toHide:_65c,complete:_65f,down:down,autoheight:_65e.autoheight});
}
}else{
if(!_65e.alwaysOpen&&_65d){
_65b.toggle();
}else{
_65c.hide();
_65b.show();
}
_65f(true);
}
};
function _651(_660){
var _661=$.data(this,"ui-accordion").options;
if(_661.disabled){
return false;
}
if(!_660.target&&!_661.alwaysOpen){
_661.active.parent().andSelf().toggleClass(_661.selectedClass);
var _662=_661.active.next(),data={instance:this,options:_661,newHeader:jQuery([]),oldHeader:_661.active,newContent:jQuery([]),oldContent:_662},_663=_661.active=$([]);
_65a.call(this,_663,_662,data);
return false;
}
var _664=$(_660.target);
if(_664.parents(_661.header).length){
while(!_664.is(_661.header)){
_664=_664.parent();
}
}
var _665=_664[0]==_661.active[0];
if(_661.running||(_661.alwaysOpen&&_665)){
return false;
}
if(!_664.is(_661.header)){
return;
}
_661.active.parent().andSelf().toggleClass(_661.selectedClass);
if(!_665){
_664.parent().andSelf().addClass(_661.selectedClass);
}
var _663=_664.next(),_662=_661.active.next(),data={instance:this,options:_661,newHeader:_664,oldHeader:_661.active,newContent:_663,oldContent:_662},down=_661.headers.index(_661.active[0])>_661.headers.index(_664[0]);
_661.active=_665?$([]):_664;
_65a.call(this,_663,_662,data,_665,down);
return false;
};
function _64e(_666,_667){
return _667!=undefined?typeof _667=="number"?_666.filter(":eq("+_667+")"):_666.not(_666.not(_667)):_667===false?$([]):_666.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_668,_669){
_668=$.extend({easing:"swing",duration:300},_668,_669);
if(!_668.toHide.size()){
_668.toShow.animate({height:"show"},_668);
return;
}
var _66a=_668.toHide.height(),_66b=_668.toShow.height(),_66c=_66b/_66a;
_668.toShow.css({height:0,overflow:"hidden"}).show();
_668.toHide.filter(":hidden").each(_668.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _66d=(_66a-now)*_66c;
if($.browser.msie||$.browser.opera){
_66d=Math.ceil(_66d);
}
_668.toShow.height(_66d);
},duration:_668.duration,easing:_668.easing,complete:function(){
if(!_668.autoheight){
_668.toShow.css("height","auto");
}
_668.complete();
}});
},bounceslide:function(_66e){
this.slide(_66e,{easing:_66e.down?"bounceout":"swing",duration:_66e.down?1000:200});
},easeslide:function(_66f){
this.slide(_66f,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_670,_671,wrap,_672,_673,_674,_675,_676,_677=0,_678={},_679=[],_67a=0,_67b={},_67c=[],_67d=null,_67e=new Image(),_67f=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_680=/[^\.]\.(swf)\s*$/i,_681,_682=1,_683,_684,busy=false,_685=20,fx=$.extend($("<div/>")[0],{prop:0}),_686=0,_687=!$.support.opacity&&!window.XMLHttpRequest,_688=function(){
_670.hide();
_67e.onerror=_67e.onload=null;
if(_67d){
_67d.abort();
}
tmp.empty();
},_689=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_68a=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_68b=function(){
var view=_68a(),to={},_68c=_67b.margin,_68d=_67b.autoScale,_68e=(_685+_68c)*2,_68f=(_685+_68c)*2,_690=(_67b.padding*2),_691;
if(_67b.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_67b.width))/100)-(_685*2);
_68d=false;
}else{
to.width=_67b.width+_690;
}
if(_67b.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_67b.height))/100)-(_685*2);
_68d=false;
}else{
to.height=_67b.height+_690;
}
if(_68d&&(to.width>(view[0]-_68e)||to.height>(view[1]-_68f))){
if(_678.type=="image"||_678.type=="swf"){
_68e+=_690;
_68f+=_690;
_691=Math.min(Math.min(view[0]-_68e,_67b.width)/_67b.width,Math.min(view[1]-_68f,_67b.height)/_67b.height);
to.width=Math.round(_691*(to.width-_690))+_690;
to.height=Math.round(_691*(to.height-_690))+_690;
}else{
to.width=Math.min(to.width,(view[0]-_68e));
to.height=Math.min(to.height,(view[1]-_68f));
}
}
to.top=view[3]+((view[1]-(to.height+(_685*2)))*0.5);
if(_67b.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_685*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_67b.minWidth)+(_685*2)))*0.5);
}
if(_67b.autoScale===false){
to.top=Math.max(view[3]+_68c,to.top);
to.left=Math.max(view[2]+_68c,to.left);
}
return to;
},_692=function(_693){
if(_693&&_693.length){
switch(_67b.titlePosition){
case "inside":
return _693;
case "over":
return "<span id=\"fancybox-title-over\">"+_693+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_693+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_694=function(){
var _695=_67b.title,_696=_684.width-(_67b.padding*2),_697="fancybox-title-"+_67b.titlePosition;
$("#fancybox-title").remove();
_686=0;
if(_67b.titleShow===false){
return;
}
_695=$.isFunction(_67b.titleFormat)?_67b.titleFormat(_695,_67c,_67a,_67b):_692(_695);
if(!_695||_695===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_697+"\" />").css({"width":_696,"paddingLeft":_67b.padding,"paddingRight":_67b.padding}).html(_695).appendTo("body");
switch(_67b.titlePosition){
case "inside":
_686=$("#fancybox-title").outerHeight(true)-_67b.padding;
_684.height+=_686;
break;
case "over":
$("#fancybox-title").css("bottom",_67b.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_672).hide();
},_698=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_67b.enableEscapeButton){
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
if(_67c.length>1){
wrap.bind("mousewheel.fb",function(e,_699){
e.preventDefault();
if(busy||_699===0){
return;
}
if(_699>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_67b.showNavArrows){
return;
}
if((_67b.cyclic&&_67c.length>1)||_67a!==0){
_675.show();
}
if((_67b.cyclic&&_67c.length>1)||_67a!=(_67c.length-1)){
_676.show();
}
},_69a=function(){
var href,_69b;
if((_67c.length-1)>_67a){
href=_67c[_67a+1].href;
if(typeof href!=="undefined"&&href.match(_67f)){
_69b=new Image();
_69b.src=href;
}
}
if(_67a>0){
href=_67c[_67a-1].href;
if(typeof href!=="undefined"&&href.match(_67f)){
_69b=new Image();
_69b.src=href;
}
}
},_69c=function(){
_673.css("overflow",(_67b.scrolling=="auto"?(_67b.type=="image"||_67b.type=="iframe"||_67b.type=="swf"?"hidden":"auto"):(_67b.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_673.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_67b.hideOnContentClick){
_673.one("click",$.fancybox.close);
}
if(_67b.hideOnOverlayClick){
_671.one("click",$.fancybox.close);
}
if(_67b.showCloseButton){
_674.show();
}
_698();
$(window).bind("resize.fb",$.fancybox.center);
if(_67b.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_67b.onComplete)){
_67b.onComplete(_67c,_67a,_67b);
}
busy=false;
_69a();
},_69d=function(pos){
var _69e=Math.round(_683.width+(_684.width-_683.width)*pos),_69f=Math.round(_683.height+(_684.height-_683.height)*pos),top=Math.round(_683.top+(_684.top-_683.top)*pos),left=Math.round(_683.left+(_684.left-_683.left)*pos);
wrap.css({"width":_69e+"px","height":_69f+"px","top":top+"px","left":left+"px"});
_69e=Math.max(_69e-_67b.padding*2,0);
_69f=Math.max(_69f-(_67b.padding*2+(_686*pos)),0);
_673.css({"width":_69e+"px","height":_69f+"px"});
if(typeof _684.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_6a0=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_6a1=function(){
var orig=_678.orig?$(_678.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_6a0(orig);
from={width:(pos.width+(_67b.padding*2)),height:(pos.height+(_67b.padding*2)),top:(pos.top-_67b.padding-_685),left:(pos.left-_67b.padding-_685)};
}else{
view=_68a();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_6a2=function(){
_670.hide();
if(wrap.is(":visible")&&$.isFunction(_67b.onCleanup)){
if(_67b.onCleanup(_67c,_67a,_67b)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_67c=_679;
_67a=_677;
_67b=_678;
_673.get(0).scrollTop=0;
_673.get(0).scrollLeft=0;
if(_67b.overlayShow){
if(_687){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_671.css({"background-color":_67b.overlayColor,"opacity":_67b.overlayOpacity}).unbind().show();
}
_673.css("background-color",_67b.innerColor);
_684=_68b();
_694();
if(wrap.is(":visible")){
$(_674.add(_675).add(_676)).hide();
var pos=wrap.position(),_6a3;
_683={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_6a3=(_683.width==_684.width&&_683.height==_684.height);
_673.fadeOut(_67b.changeFade,function(){
var _6a4=function(){
_673.html(tmp.contents()).fadeIn(_67b.changeFade,_69c);
};
$.event.trigger("fancybox-change");
_673.empty().css("overflow","hidden");
if(_6a3){
_673.css({top:_67b.padding,left:_67b.padding,width:Math.max(_684.width-(_67b.padding*2),1),height:Math.max(_684.height-(_67b.padding*2)-_686,1)});
_6a4();
}else{
_673.css({top:_67b.padding,left:_67b.padding,width:Math.max(_683.width-(_67b.padding*2),1),height:Math.max(_683.height-(_67b.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_67b.changeSpeed,easing:_67b.easingChange,step:_69d,complete:_6a4});
}
});
return;
}
wrap.css("opacity",1);
if(_67b.transitionIn=="elastic"){
_683=_6a1();
_673.css({top:_67b.padding,left:_67b.padding,width:Math.max(_683.width-(_67b.padding*2),1),height:Math.max(_683.height-(_67b.padding*2),1)}).html(tmp.contents());
wrap.css(_683).show();
if(_67b.opacity){
_684.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_67b.speedIn,easing:_67b.easingIn,step:_69d,complete:_69c});
}else{
_673.css({top:_67b.padding,left:_67b.padding,width:Math.max(_684.width-(_67b.padding*2),1),height:Math.max(_684.height-(_67b.padding*2)-_686,1)}).html(tmp.contents());
wrap.css(_684).fadeIn(_67b.transitionIn=="none"?0:_67b.speedIn,_69c);
}
},_6a5=function(){
tmp.width(_678.width);
tmp.height(_678.height);
if(_678.width=="auto"){
_678.width=tmp.width();
}
if(_678.height=="auto"){
_678.height=tmp.height();
}
_6a2();
},_6a6=function(){
busy=true;
_678.width=_67e.width;
_678.height=_67e.height;
$("<img />").attr({"id":"fancybox-img","src":_67e.src,"alt":_678.title}).appendTo(tmp);
_6a2();
},_6a7=function(){
_688();
var obj=_679[_677],href,type,_6a8,str,emb,_6a9,data;
_678=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_678:$(obj).data("fancybox")));
_6a8=obj.title||$(obj).title||_678.title||"";
if(obj.nodeName&&!_678.orig){
_678.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_6a8===""&&_678.orig){
_6a8=_678.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_678.href||jq(obj).attr("href")||null;
}else{
href=_678.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_678.type){
type=_678.type;
if(!href){
href=_678.content;
}
}else{
if(_678.content){
type="html";
}else{
if(href){
if(href.match(_67f)){
type="image";
}else{
if(href.match(_680)){
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
_678.type=type;
_678.href=href;
_678.title=_6a8;
if(_678.autoDimensions&&_678.type!=="iframe"&&_678.type!=="swf"){
_678.width="auto";
_678.height="auto";
}
if(_678.modal){
_678.overlayShow=true;
_678.hideOnOverlayClick=false;
_678.hideOnContentClick=false;
_678.enableEscapeButton=false;
_678.showCloseButton=false;
}
if($.isFunction(_678.onStart)){
if(_678.onStart(_679,_677,_678)===false){
busy=false;
return;
}
}
tmp.css("padding",(_685+_678.padding+_678.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_673.children());
});
switch(type){
case "html":
tmp.html(_678.content);
_6a5();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_673.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_6a5();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_67e=new Image();
_67e.onerror=function(){
_689();
};
_67e.onload=function(){
_67e.onerror=null;
_67e.onload=null;
_6a6();
};
_67e.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_678.width+"\" height=\""+_678.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_678.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_678.width+"\" height=\""+_678.height+"\""+emb+"></embed></object>";
tmp.html(str);
_6a5();
break;
case "ajax":
_6a9=href.split("#",2);
data=_678.ajax.data||{};
if(_6a9.length>1){
href=_6a9[0];
if(typeof data=="string"){
data+="&selector="+_6a9[1];
}else{
data.selector=_6a9[1];
}
}
busy=false;
$.fancybox.showActivity();
_67d=$.ajax($.extend(_678.ajax,{url:href,data:data,error:_689,success:function(data,_6aa,_6ab){
if(_67d.status==200){
tmp.html(data);
_6a5();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_678.scrolling+"\" src=\""+_678.href+"\"></iframe>").appendTo(tmp);
_6a2();
break;
}
},_6ac=function(){
if(!_670.is(":visible")){
clearInterval(_681);
return;
}
$("div",_670).css("top",(_682*-40)+"px");
_682=(_682+1)%12;
},_6ad=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_670=$("<div id=\"fancybox-loading\"><div></div></div>"),_671=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_670.addClass("fancybox-ie");
}
_672=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_672.append(_673=$("<div id=\"fancybox-inner\"></div>"),_674=$("<a id=\"fancybox-close\"></a>"),_675=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_676=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_674.click($.fancybox.close);
_670.click($.fancybox.cancel);
_675.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_676.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_687){
_671.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_670.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_672.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_6ae){
$(this).data("fancybox",$.extend({},_6ae,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_679=[];
_677=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_679.push(this);
}else{
_679=$("a[rel="+rel+"], area[rel="+rel+"]");
_677=_679.index(this);
}
_6a7();
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
_679=[];
_677=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_679=jQuery.merge(_679,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_679.push(obj);
}
if(_677>_679.length||_677<0){
_677=0;
}
_6a7();
};
$.fancybox.showActivity=function(){
clearInterval(_681);
_670.show();
_681=setInterval(_6ac,66);
};
$.fancybox.update=function(rel){
_679=$("a[rel="+rel+"], area[rel="+rel+"]");
};
$.fancybox.hideActivity=function(){
_670.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_67a+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_67a-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_67c.length>pos){
_677=pos;
_6a7();
}
if(_67b.cyclic&&_67c.length>1&&pos<0){
_677=_67c.length-1;
_6a7();
}
if(_67b.cyclic&&_67c.length>1&&pos>=_67c.length){
_677=0;
_6a7();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_688();
if(_678&&$.isFunction(_678.onCancel)){
_678.onCancel(_679,_677,_678);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_67b&&$.isFunction(_67b.onCleanup)){
if(_67b.onCleanup(_67c,_67a,_67b)===false){
busy=false;
return;
}
}
_688();
$(_674.add(_675).add(_676)).hide();
$("#fancybox-title").remove();
wrap.add(_673).add(_671).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _6af(){
_671.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_673.empty();
if($.isFunction(_67b.onClosed)){
_67b.onClosed(_67c,_67a,_67b);
}
_67c=_678=[];
_67a=_677=0;
_67b=_678={};
busy=false;
};
_673.css("overflow","hidden");
if(_67b.transitionOut=="elastic"){
_683=_6a1();
var pos=wrap.position();
_684={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_67b.opacity){
_684.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_67b.speedOut,easing:_67b.easingOut,step:_69d,complete:_6af});
}else{
wrap.fadeOut(_67b.transitionOut=="none"?0:_67b.speedOut,_6af);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_673.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_67b.padding*2)+_686});
_673.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_68a(),_6b0=_67b.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_686)+(_685*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_685*2)))*0.5);
to.top=Math.max(view[3]+_6b0,to.top);
to.left=Math.max(view[2]+_6b0,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",innerColor:"inherited",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_6ad();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_6b1){
this._container=jQuery(_6b1);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_6b2){
};
HubPages.Lightbox.f$=function(_6b3){
return jQuery(_6b3,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_6b4){
return jQuery(_6b4,this._container);
};
HubPages.Lightbox.MyPhotos=function(_6b5){
this._container=jQuery(_6b5);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_6b6,_6b7,_6b8){
if(_6b6!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_6b7.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_6b7.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_6b7);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_6b8<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_6b6,_6b7,_6b8+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_6b9){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_6b9);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_6ba,_6bb,_6bc){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_6ba[_6bb]).attr("href");
var _6bd=href.lastIndexOf("/");
var _6be=_6bd==-1?0:href.slice(_6bd+1,-4);
this._currentImageId=_6be;
jQuery.post("/xml/photos/locations/",{id:_6be},jQuery.proxy(function(_6bf){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_6be,_6bf,0);
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
HubPages.Lightbox.Slideshow=function(_6c0){
this._id=_6c0.id;
this._title=_6c0.title;
this._url=_6c0.url;
this._type=_6c0.type;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_6c0.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_6c1){
var id=_6c1.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_6c1);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_6c1.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(_6c2,_6c3){
var self=this;
if(this._type=="Hub"){
self._start=0;
jQuery.ajax({async:false,data:{id:this._id},dataType:"json",success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
}else{
if(_6c2===undefined){
self._start=0;
self._limit=10;
}else{
self._start=_6c2;
self._limit=_6c3;
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
var _6c4=jQuery("<a />").attr("href","#related_slideshows_"+this._id);
_6c4.addClass("lightbox").attr("rel","slideshow_"+this._id);
_6c4.appendTo(this._container);
var _6c5=jQuery("<div />").attr("id","related_slideshows_"+this._id);
_6c5.addClass("related_slideshows");
if(data.related.length){
_6c5.append("<h2>View These Related Slideshows</h2>");
}else{
_6c5.append("<h2>This Hub has no related slideshows</h2>");
}
_6c5.appendTo(this._container);
var list=jQuery("<ul />");
_6c5.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_6c5);
}
var _6c6=jQuery("<li />");
_6c6.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _6c7=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),type:"Hub",auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _6c8=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_6c8);
_6c6.append(linkDiv);
_6c6.append("<br />");
var _6c9=jQuery("<img />").attr("src",item.thumb);
_6c9.appendTo(_6c7);
_6c7.appendTo(_6c6);
_6c7.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
}
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _6ca=jQuery("<div />").addClass("pinit_wrap");
_6ca.appendTo(this._socialBar);
var _6cb=jQuery("<div />").addClass("twitter_wrap");
_6cb.appendTo(this._socialBar);
var _6cc=jQuery("<div />").addClass("fb_share_wrap");
_6cc.appendTo(this._socialBar);
if(this._type=="Hub"){
_6cb.html(data.social.twitter);
_6cc.html(data.social.fb_share);
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
HubPages.Lightbox.Slideshow.loadImages=function(_6cd){
var _6ce=this._start;
jQuery.each(_6cd,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({id:"slideshow_img_"+item.id,href:"#"+this._id+"_"+_6ce,rel:"slideshow_"+this._id,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._id+"_"+_6ce}).addClass("content");
div.appendTo(this._container);
var _6cf=jQuery("<div />");
_6cf.appendTo(div);
var _6d0=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_6d0.data("source",item.source);
_6d0.appendTo(_6cf);
_6ce++;
},this));
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_6d1,_6d2,_6d3,_6d4,_6d5){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
if(_6d5===undefined){
_6d5="Normal";
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_6d1;
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("20%");
jQuery("body").delegate(_6d4,"click",function(e){
var _6d6=HubPages.Lightbox.Slideshow.defaultHubId,_6d7="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
jq("#fancybox-wrap").addClass("slide_image");
if(!HubPages.Lightbox.Slideshow._slides[_6d6]){
HubPages.Lightbox.Slideshow.create({id:_6d6,title:_6d2,url:_6d3,type:_6d5});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
if(_6d5=="Hub"){
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1"),link=jQuery(_6d7+":has(img[src*=\""+id+"\"])"),_6d8=jQuery(_6d7).index(link);
HubPages.Lightbox.Slideshow._slides[_6d6].init();
if(_6d8>=0){
jQuery(".slideshow:first > a").eq(_6d8).click();
}
}else{
jQuery(".slideshow:first > a").eq(0).click();
}
});
jQuery(window).resize(function(){
if(typeof (_6d9)!="undefined"){
clearTimeout(_6d9);
}
var _6d9=setTimeout(function(){
var _6da=jQuery("#fancybox-inner > div:visible").attr("id");
if(_6da){
jQuery(".slideshow a[href=#"+_6da+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._id);
var _6db=this._container.size()==0;
if(_6db){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_6dc,_6dd){
if(!jQuery("#fancybox-outer-title").length){
var _6de=jQuery("<div />").attr("id","fancybox-outer-title");
var _6df=jQuery("#fancybox-inner");
_6df.before(_6de);
}
var _6e0=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_6e0);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_6e1,_6e2){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
var _6e3=jq(window).scrollTop();
jQuery.address.value("");
jQuery(window).scrollTop(_6e3);
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_6e4,_6e5){
var _6e6=jQuery(".overlay_image").removeClass("overlay_image").css("visibility","hidden");
_6e6.siblings("div").remove();
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_6e7,_6e8){
jQuery.fancybox.hideActivity();
var _6e9=_6e8+1;
if(this._type!="Hub"){
if(_6e9===1){
jQuery("#fancybox-left").hide();
}else{
if(_6e9>1){
jQuery("#fancybox-left").show();
}
}
if(_6e9==(_6e7.length-1)&&_6e7.length<this._photoData.total_images){
this.load(_6e7.length,10);
jQuery.fancybox.update("slideshow_"+this._id);
}
}
if(this._type=="Hub"){
if(_6e9>=_6e7.length){
return;
}
}
var _6ea=HubPages.Lightbox.f$("#fancybox-inner");
_6ea.height(_6ea.height()-70).css("overflow","visible");
var _6eb=_6ea.find("> .content img");
var _6ec=this._photoData.images[_6e8];
if(this._type!="Hub"){
jQuery("#fancybox-outer-title > a").replaceWith(_6ec.url_title);
}
jq.address.value("slide"+_6ec.id);
_6eb.css({width:"auto",height:"auto",maxWidth:(_6ea.innerWidth()-60)+"px",maxHeight:(_6ea.innerHeight()-100)+"px"});
if(_6ea.innerHeight()>0&&_6eb.height()>0){
var _6ed=(_6ea.innerHeight()-_6eb.height())/2;
_6eb.parent().css({width:_6eb.width(),height:_6eb.height(),margin:"0px auto",paddingTop:"10px"});
_6eb.parent().css("margin-top",_6ed+"px");
_6eb.css("visibility","visible").addClass("overlay_image");
if(_6eb.width()>250){
this.loadGoogleAds();
}
}else{
_6eb.load(function(){
var _6ee=HubPages.Lightbox.f$("#fancybox-inner");
var _6ef=_6ee.find("> .content img");
var _6f0=(_6ee.innerHeight()-_6ef.height())/2;
_6ef.parent().css({width:_6ef.width(),height:_6ef.height(),margin:"0px auto",paddingTop:"10px"});
_6ef.parent().css("margin-top",_6f0+"px");
_6ef.css("visibility","visible").addClass("overlay_image");
if(_6ef.width()>250){
this.loadGoogleAds();
}
}.bind(this));
}
var _6f1=jQuery(_6e7[_6e8]).attr("rel");
var _6f2=jQuery("#"+_6f1).find(".content img");
var _6f3=(new Date()).getTime()/1000;
var _6f4=_6f3-this._startTime;
var _6f5=this._counter/_6f4;
if(this._fireTracking&&_6f4>10&&_6f5>1){
this._fireTracking=false;
jQuery.ajax({url:"/xml/reporterror.php",type:"POST",data:{error:"Too many slideshow views! Loaded "+this._counter+" slideshow images in "+_6f4+" seconds (ratio: "+_6f5+")"}});
}
if(this._fireTracking){
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_6ec.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _6f6="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_6f6+="&labels="+escape(this._photoData.quantcastLabel);
}
var _6f7=new Image();
_6f7.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_6f6;
}
if(this._photoData.ctracking){
var _6f8=new Image();
_6f8.src=this._photoData.ctracking+"&"+(new Date()).getTime();
}
this._counter++;
}
var _6f9=HubPages.Lightbox.f$("#fancybox-title");
if(_6ec.sourceUrl||_6ec.sourceName){
if(_6ec.sourceUrl){
var _6fa="<a href=\""+_6ec.sourceUrl+"\" target=\"_blank\">"+(_6ec.sourceName?_6ec.sourceName:_6ec.sourceUrl)+"</a>";
}else{
var _6fa="<b>"+_6ec.sourceName+"</b>";
}
_6f9.html(_6f9.text()+"<br />Source: "+_6fa);
}
_6f9.find("div.slideshow-counter").remove();
_6f9.append(jQuery("<div />").html("Photo "+_6e9+" of "+this._photoData.total_images).addClass("slideshow-counter"));
if(this._lastIndex!=_6e8&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_6ec.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_6ec.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_6ec.social.pinit){
this._socialBar.find(".pinit_wrap").html(_6ec.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_6e8;
_6eb.parent("div").after(this._socialBar.show());
};
HubPages.Lightbox.Slideshow.prototype.loadGoogleAds=function(){
};
(function(_6fb,_6fc){
var _6fd=_6fb.document;
(function(){
var _6fe=false,_6ff=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _700=this.prototype;
_6fe=true;
var _701=new this();
_6fe=false;
for(var name in prop){
_701[name]=typeof prop[name]=="function"&&typeof _700[name]=="function"&&_6ff.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_700[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _702(){
if(!_6fe&&this.init){
this.init.apply(this,arguments);
}
};
_702.prototype=_701;
_702.constructor=_702;
_702.extend=arguments.callee;
return _702;
};
})();
var _703=JRClass.extend({init:function(_704,_705){
if(typeof _704=="string"){
this.video=_6fd.getElementById(_704);
}else{
this.video=_704;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _703.options=="object"){
_V_.merge(this.options,_703.options);
}
if(typeof _705=="object"){
_V_.merge(this.options,_705);
}
if(this.getPreloadAttribute()!==_6fc){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_6fc){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_6fc){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_706){
if(this[_706+"Supported"]()){
this[_706+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_707,_708){
this.behaviors[name]=_707;
this.extend(_708);
},activateElement:function(_709,_70a){
if(typeof _709=="string"){
_709=_6fd.getElementById(_709);
}
this.behaviors[_70a].call(this,_709);
},errors:[],warnings:[],warning:function(_70b){
this.warnings.push(_70b);
this.log(_70b);
},history:[],log:function(_70c){
if(!_70c){
return;
}
if(typeof _70c=="string"){
_70c={type:_70c};
}
if(_70c.type){
this.history.push(_70c.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_70c.type);
}
catch(e){
try{
opera.postError(_70c.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_70d){
if(!localStorage){
return;
}
try{
localStorage[key]=_70d;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_703.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _70e=this.video.getAttribute("preload");
if(_70e===""||_70e==="true"){
return "auto";
}
if(_70e==="false"){
return "none";
}
return _70e;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _70f=this.video.getAttribute("autoplay");
if(_70f==="false"){
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
for(var _710 in obj){
if(obj.hasOwnProperty(_710)){
this[_710]=obj[_710];
}
}
}});
_703.player=_703.prototype;
_703.player.extend({flashSupported:function(){
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
var _711=_703.flashPlayers[this.options.flashPlayer];
this.extend(_703.flashPlayers[this.options.flashPlayer].api);
(_711.init.context(this))();
},getFlashElement:function(){
var _712=this.video.children;
for(var i=0,j=_712.length;i<j;i++){
if(_712[i].className=="vjs-flash-fallback"){
return _712[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _713=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_703.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _703.getFlashVersion()>=_713;
}});
_703.flashPlayers={};
_703.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_714){
if(_714!==_6fc){
this.element.width=_714;
this.box.style.width=_714+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_715){
if(_715!==_6fc){
this.element.height=_715;
this.box.style.height=_715+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_703.player.extend({linksSupported:function(){
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
_703.merge=function(obj1,obj2,safe){
for(var _716 in obj2){
if(obj2.hasOwnProperty(_716)&&(!safe||!obj1.hasOwnProperty(_716))){
obj1[_716]=obj2[_716];
}
}
return obj1;
};
_703.extend=function(obj){
this.merge(this,obj,true);
};
_703.extend({setupAllWhenReady:function(_717){
_703.options=_717;
_703.DOMReady(_703.setup);
},DOMReady:function(fn){
_703.addToDOMReady(fn);
},setup:function(_718,_719){
var _71a=false,_71b=[],_71c;
if(!_718||_718=="All"){
_718=_703.getVideoJSTags();
}else{
if(typeof _718!="object"||_718.nodeType==1){
_718=[_718];
_71a=true;
}
}
for(var i=0;i<_718.length;i++){
if(typeof _718[i]=="string"){
_71c=_6fd.getElementById(_718[i]);
}else{
_71c=_718[i];
}
_71b.push(new _703(_71c,_719));
}
return (_71a)?_71b[0]:_71b;
},getVideoJSTags:function(){
var _71d=_6fd.getElementsByTagName("video"),_71e=[],_71f;
for(var i=0,j=_71d.length;i<j;i++){
_71f=_71d[i];
if(_71f.className.indexOf("video-js")!=-1){
_71e.push(_71f);
}
}
return _71e;
},browserSupportsVideo:function(){
if(typeof _703.videoSupport!="undefined"){
return _703.videoSupport;
}
_703.videoSupport=!!_6fd.createElement("video").canPlayType;
return _703.videoSupport;
},getFlashVersion:function(){
if(typeof _703.flashVersion!="undefined"){
return _703.flashVersion;
}
var _720=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_720=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _6fb.ActiveXObject!="undefined"){
try{
var _721=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_721){
_720=parseInt(_721.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_703.flashVersion=_720;
return _703.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _703.isIPhone()||_703.isIPad();
},iOSVersion:function(){
var _722=navigator.userAgent.match(/OS (\d+)_/i);
if(_722&&_722[1]){
return _722[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _723=navigator.userAgent.match(/Android (\d+)\./i);
if(_723&&_723[1]){
return _723[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_703.isIE()){
_6fd.createElement("video");
}
_6fb.VideoJS=_6fb._V_=_703;
_703.player.extend({html5Supported:function(){
if(_703.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_703.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_703.isAndroid()){
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
var _724=this.video.children;
for(var i=0,j=_724.length;i<j;i++){
if(_724[i].tagName.toUpperCase()=="SOURCE"){
var _725=this.video.canPlayType(_724[i].type)||this.canPlayExt(_724[i].src);
if(_725=="probably"||_725=="maybe"){
this.firstPlayableSource=_724[i];
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
var _726=src.match(/\.([^\.]+)$/);
if(_726&&_726[1]){
var ext=_726[1].toLowerCase();
if(_703.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_703.isIOS()){
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
},playerOnVideoProgress:function(_727){
this.setBufferedFromProgress(_727);
},setBufferedFromProgress:function(_728){
if(_728.total>0){
var _729=(_728.loaded/_728.total)*this.duration();
if(_729>this.values.bufferEnd){
this.values.bufferEnd=_729;
}
}
},iOSInterface:function(){
if(_703.iOSVersion()<4){
this.forceTheSource();
}
if(_703.isIPad()){
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
this.poster=_6fd.createElement("img");
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
var _72a=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_72a.length;i<j;i++){
if(_72a[i].getAttribute("kind")=="subtitles"&&_72a[i].getAttribute("src")){
this.subtitlesSource=_72a[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_72b){
var _72c=_72b.split("\n"),line="",_72d,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_72c.length;i++){
line=_V_.trim(_72c[i]);
if(line){
_72d={id:line,index:this.subtitles.length};
line=_V_.trim(_72c[++i]);
time=line.split(" --> ");
_72d.start=this.parseSubtitleTime(time[0]);
_72d.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_72c.length;j++){
line=_V_.trim(_72c[++i]);
if(!line){
break;
}
text.push(line);
}
_72d.text=text.join("<br/>");
this.subtitles.push(_72d);
}
}
},parseSubtitleTime:function(_72e){
var _72f=_72e.split(":"),time=0;
time+=parseFloat(_72f[0])*60*60;
time+=parseFloat(_72f[1])*60;
var _730=_72f[2].split(/\.|,/);
time+=parseFloat(_730[0]);
ms=parseFloat(_730[1]);
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
},currentTime:function(_731){
if(_731!==_6fc){
try{
this.video.currentTime=_731;
}
catch(e){
this.warning(_703.warnings.videoNotReady);
}
this.values.currentTime=_731;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_6fc){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _732=this.video.buffered.end(0);
if(_732>this.values.bufferEnd){
this.values.bufferEnd=_732;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_733){
if(_733!==_6fc){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_733)));
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
},width:function(_734){
if(_734!==_6fc){
this.video.width=_734;
this.box.style.width=_734+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_735){
if(_735!==_6fc){
this.video.height=_735;
this.box.style.height=_735+"px";
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
this.warning(_703.warnings.videoNotReady);
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
this.docOrigOverflow=_6fd.documentElement.style.overflow;
_V_.addListener(_6fd,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_6fb,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_6fd.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_6fd.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_6fb.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_6fd.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_703.player.newBehavior("player",function(_736){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_737){
this.log(_737);
this.log(this.video.error);
},playerOnVideoPlay:function(_738){
this.hasPlayed=true;
},playerOnVideoPause:function(_739){
},playerOnVideoEnded:function(_73a){
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
this.each(this.bufferedListeners,function(_73b){
(_73b.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_73c){
this.each(this.currentTimeListeners,function(_73d){
(_73d.context(this))(_73c||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_73e){
(_73e.context(this))();
});
}});
_703.player.newBehavior("mouseOverVideoReporter",function(_73f){
_V_.addListener(_73f,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_73f,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_740){
var _741=_740.relatedTarget;
while(_741&&_741!==this.box){
_741=_741.parentNode;
}
if(_741!==this.box){
this.hideControlBars();
}
}});
_703.player.newBehavior("box",function(_742){
this.positionBox();
_V_.addClass(_742,"vjs-paused");
this.activateElement(_742,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_703.player.newBehavior("poster",function(_743){
this.activateElement(_743,"mouseOverVideoReporter");
this.activateElement(_743,"playButton");
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
var _744=this.video.getElementsByTagName("img");
if(_744.length>0){
this.video.poster=_744[0].src;
}
}
}});
_703.player.newBehavior("controlBar",function(_745){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_745);
_V_.addListener(_745,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_745,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_746){
this.mouseIsOverControls=false;
}});
_703.player.newBehavior("playToggle",function(_747){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_747);
_V_.addListener(_747,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_748){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_749){
this.each(this.elements.playToggles,function(_74a){
_V_.removeClass(_74a,"vjs-paused");
_V_.addClass(_74a,"vjs-playing");
});
},playTogglesOnPause:function(_74b){
this.each(this.elements.playToggles,function(_74c){
_V_.removeClass(_74c,"vjs-playing");
_V_.addClass(_74c,"vjs-paused");
});
}});
_703.player.newBehavior("playButton",function(_74d){
_V_.addListener(_74d,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_74e){
this.play();
}});
_703.player.newBehavior("pauseButton",function(_74f){
_V_.addListener(_74f,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_750){
this.pause();
}});
_703.player.newBehavior("playProgressBar",function(_751){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_751);
},{updatePlayProgressBars:function(_752){
var _753=(_752!==_6fc)?_752/this.duration():this.currentTime()/this.duration();
if(isNaN(_753)){
_753=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_753*100,2)+"%";
}
});
}});
_703.player.newBehavior("loadProgressBar",function(_754){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_754);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_703.player.newBehavior("currentTimeDisplay",function(_755){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_755);
},{updateCurrentTimeDisplays:function(_756){
if(!this.currentTimeDisplays){
return;
}
var time=(_756)?_756:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_703.player.newBehavior("durationDisplay",function(_757){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_757);
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
_703.player.newBehavior("currentTimeScrubber",function(_758){
_V_.addListener(_758,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_759,_75a){
_759.preventDefault();
this.currentScrubber=_75a;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_759);
_V_.addListener(_6fd,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_6fd,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_75b){
this.setCurrentTimeWithScrubber(_75b);
},onCurrentTimeScrubberMouseUp:function(_75c){
_V_.unblockTextSelection();
_6fd.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_6fd.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_75d){
var _75e=_V_.getRelativePosition(_75d.pageX,this.currentScrubber);
var _75f=_75e*this.duration();
this.triggerCurrentTimeListeners(0,_75f);
if(_75f==this.duration()){
_75f=_75f-0.1;
}
this.currentTime(_75f);
}});
_703.player.newBehavior("volumeDisplay",function(_760){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_760);
this.updateVolumeDisplay(_760);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_761){
var _762=Math.ceil(this.volume()*6);
this.each(_761.children,function(_763,num){
if(num<_762){
_V_.addClass(_763,"vjs-volume-level-on");
}else{
_V_.removeClass(_763,"vjs-volume-level-on");
}
});
}});
_703.player.newBehavior("volumeScrubber",function(_764){
_V_.addListener(_764,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_765,_766){
_V_.blockTextSelection();
this.currentScrubber=_766;
this.setVolumeWithScrubber(_765);
_V_.addListener(_6fd,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_6fd,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_767){
this.setVolumeWithScrubber(_767);
},onVolumeScrubberMouseUp:function(_768){
this.setVolumeWithScrubber(_768);
_V_.unblockTextSelection();
_6fd.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_6fd.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_769){
var _76a=_V_.getRelativePosition(_769.pageX,this.currentScrubber);
this.volume(_76a);
}});
_703.player.newBehavior("fullscreenToggle",function(_76b){
_V_.addListener(_76b,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_76c){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_76d){
this.positionControlBars();
},fullscreenOnEscKey:function(_76e){
if(_76e.keyCode==27){
this.exitFullScreen();
}
}});
_703.player.newBehavior("bigPlayButton",function(_76f){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_76f);
this.activateElement(_76f,"playButton");
},{bigPlayButtonsOnPlay:function(_770){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_771){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_772){
_772.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_773){
_773.style.display="none";
});
}});
_703.player.newBehavior("spinner",function(_774){
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
this.spinners.push(_774);
},{showSpinners:function(){
this.each(this.spinners,function(_775){
_775.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_776){
_776.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_777){
_777.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_777.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_778){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_779){
this.showSpinners();
},spinnersOnVideoSeeking:function(_77a){
},spinnersOnVideoSeeked:function(_77b){
},spinnersOnVideoCanPlay:function(_77c){
},spinnersOnVideoCanPlayThrough:function(_77d){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_77e){
this.showSpinners();
},spinnersOnVideoStalled:function(_77f){
},spinnersOnVideoSuspend:function(_780){
},spinnersOnVideoPlaying:function(_781){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_782){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_703.player.newBehavior("subtitlesDisplay",function(_783){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_783);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _784=false,_785=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_785)?1:0;
while(true){
if(_785){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_784=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_784=i;
break;
}
i++;
}
}
if(_784!==false){
this.currentSubtitle=this.subtitles[_784];
this.lastSubtitleIndex=_784;
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
_703.extend({addClass:function(_786,_787){
if((" "+_786.className+" ").indexOf(" "+_787+" ")==-1){
_786.className=_786.className===""?_787:_786.className+" "+_787;
}
},removeClass:function(_788,_789){
if(_788.className.indexOf(_789)==-1){
return;
}
var _78a=_788.className.split(/\s+/);
_78a.splice(_78a.lastIndexOf(_789),1);
_788.className=_78a.join(" ");
},createElement:function(_78b,_78c){
return this.merge(_6fd.createElement(_78b),_78c);
},blockTextSelection:function(){
_6fd.body.focus();
_6fd.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_6fd.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _78d=Math.round(secs);
var _78e=Math.floor(_78d/60);
_78e=(_78e>=10)?_78e:"0"+_78e;
_78d=Math.floor(_78d%60);
_78d=(_78d>=10)?_78d:"0"+_78d;
return _78e+":"+_78d;
},getRelativePosition:function(x,_78f){
return Math.max(0,Math.min(1,(x-this.findPosX(_78f))/_78f.offsetWidth));
},findPosX:function(obj){
var _790=obj.offsetLeft;
while(obj=obj.offsetParent){
_790+=obj.offsetLeft;
}
return _790;
},getComputedStyleValue:function(_791,_792){
return _6fb.getComputedStyle(_791,null).getPropertyValue(_792);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_793,type,_794){
if(_793.addEventListener){
_793.addEventListener(type,_794,false);
}else{
if(_793.attachEvent){
_793.attachEvent("on"+type,_794);
}
}
},removeListener:function(_795,type,_796){
if(_795.removeEventListener){
_795.removeEventListener(type,_796,false);
}else{
if(_795.attachEvent){
_795.detachEvent("on"+type,_796);
}
}
},get:function(url,_797){
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
var _798=new XMLHttpRequest();
_798.open("GET",url);
_798.onreadystatechange=function(){
if(_798.readyState==4&&_798.status==200){
_797(_798.responseText);
}
}.context(this);
_798.send();
},trim:function(_799){
return _799.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_6fd.readyState==="complete"){
return _703.onDOMReady();
}
if(_6fd.addEventListener){
_6fd.addEventListener("DOMContentLoaded",_703.DOMContentLoaded,false);
_6fb.addEventListener("load",_703.onDOMReady,false);
}else{
if(_6fd.attachEvent){
_6fd.attachEvent("onreadystatechange",_703.DOMContentLoaded);
_6fb.attachEvent("onload",_703.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_6fd.addEventListener){
_6fd.removeEventListener("DOMContentLoaded",_703.DOMContentLoaded,false);
_703.onDOMReady();
}else{
if(_6fd.attachEvent){
if(_6fd.readyState==="complete"){
_6fd.detachEvent("onreadystatechange",_703.DOMContentLoaded);
_703.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_703.DOMIsReady){
fn.call(_6fd);
}else{
_703.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_703.DOMIsReady){
return;
}
if(!_6fd.body){
return setTimeout(_703.onDOMReady,13);
}
_703.DOMIsReady=true;
if(_703.DOMReadyList){
for(var i=0;i<_703.DOMReadyList.length;i++){
_703.DOMReadyList[i].call(_6fd);
}
_703.DOMReadyList=null;
}
}});
_703.bindDOMReady();
Function.prototype.context=function(obj){
var _79a=this,temp=function(){
return _79a.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _79b=this,temp=function(){
var _79c=this;
return _79b.call(obj,arguments[0],_79c);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_79d){
if(this.hasContext===true){
return this;
}
if(!_79d){
_79d=obj;
}
for(var _79e in _79d){
if(_79d[_79e]==this){
_79d[_79e]=this.evtContext(obj);
_79d[_79e].hasContext=true;
return _79d[_79e];
}
}
return this.evtContext(obj);
};
if(_6fb.jQuery){
(function($){
$.fn.VideoJS=function(_79f){
this.each(function(){
_703.setup(this,_79f);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_6fb.VideoJS=_6fb._V_=_703;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_7a0){
var _7a1=((_7a0/15)|0)*15;
if(this.lastLoggedOffset!=_7a1&&!this.paused()){
var _7a2=this.video.id.replace("hp_video_","");
var _7a3=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_7a1,videoId:_7a2,rf:rf,isEmbed:_7a3}});
this.lastLoggedOffset=_7a1;
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
var _7a4=this.video.getAttribute("autostart");
if(_7a4==="false"){
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
var _7a5=document.createElement("div");
_7a5.style.height=videoTopAdjustment+"px";
_7a5.style.background="transparent";
_7a5.id="video_spacer";
v.before(_7a5);
}
var _7a6=v.offset()["top"]+v.outerHeight();
var _7a7=_7a6-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_7a7>0){
var _7a8=document.createElement("div");
_7a8.style.height=_7a7+"px";
_7a8.style.background="transparent";
_7a8.id="sidebar_spacer";
_7a8.className="sidebar_box";
sidebox.after(_7a8);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_7a9,_7aa,_7ab,exts){
jQuery(document).ready(function(){
var _7ac=0;
var _7ad={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_7a9},size_limit:_7ab,queue_limit:_7aa,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_7ae){
if(file.size==_7ae){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_7af){
try{
var data=JSONstring.toObject(_7af);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_7af);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_7ac+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_7b0){
if(!_7ac&&_7b0){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_7ac=0;
},loaded_callback:function(_7b1){
if(_7b1){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _7b2=new imageUploader(_7ad);
});
};
function getHPVideoPlayer(){
var _7b3="talkiesplayer";
return $(_7b3);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _7b4=true;
if(data.percent){
var _7b5=data.percent;
jq("#progress_video_"+vId).width(_7b5+"%");
if(_7b5>90){
_7b4=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_7b4){
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
$.fn.rating=function(_7b6){
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
var _7b6=$.extend({},$.fn.rating.options,_7b6||{});
$.fn.rating.calls++;
this.not(".star-rating-applied").addClass("star-rating-applied").each(function(){
var _7b7,_7b8=$(this);
var eid=(this.name||"unnamed-rating").replace(/\[|\]/g,"_").replace(/^\_+|\_+$/g,"");
var _7b9=$(this.form||document.body);
var _7ba=_7b9.data("rating");
if(!_7ba||_7ba.call!=$.fn.rating.calls){
_7ba={count:0,call:$.fn.rating.calls};
}
var _7bb=_7ba[eid];
if(_7bb){
_7b7=_7bb.data("rating");
}
if(_7bb&&_7b7){
_7b7.count++;
}else{
_7b7=$.extend({},_7b6||{},($.metadata?_7b8.metadata():($.meta?_7b8.data():null))||{},{count:0,stars:[],inputs:[]});
_7b7.serial=_7ba.count++;
_7bb=$("<span class=\"star-rating-control\"/>");
_7b8.before(_7bb);
_7bb.addClass("rating-to-be-drawn");
if(_7b8.attr("disabled")||_7b8.hasClass("disabled")){
_7b7.readOnly=true;
}
if(_7b8.hasClass("required")){
_7b7.required=true;
}
_7bb.append(_7b7.cancel=$("<div class=\"rating-cancel\"><a title=\""+_7b7.cancel+"\">"+_7b7.cancelValue+"</a></div>").mouseover(function(){
$(this).rating("drain");
$(this).addClass("star-rating-hover");
}).mouseout(function(){
$(this).rating("draw");
$(this).removeClass("star-rating-hover");
}).click(function(){
$(this).rating("select");
}).data("rating",_7b7));
}
var star=$("<div class=\"star-rating rater-"+_7b7.serial+"\"><a title=\""+(this.title||this.value)+"\">"+this.value+"</a></div>");
_7bb.append(star);
if(this.id){
star.attr("id",this.id);
}
if(this.className){
star.addClass(this.className);
}
if(_7b7.half){
_7b7.split=2;
}
if(typeof _7b7.split=="number"&&_7b7.split>0){
var stw=($.fn.width?star.width():0)||_7b7.starWidth;
var spi=(_7b7.count%_7b7.split),spw=Math.floor(stw/_7b7.split);
star.width(spw).find("a").css({"margin-left":"-"+(spi*spw)+"px"});
}
if(_7b7.readOnly){
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
_7b7.current=star;
}
if(this.nodeName=="A"){
if($(this).hasClass("selected")){
_7b7.current=star;
}
}
_7b8.hide();
_7b8.change(function(){
$(this).rating("select");
});
star.data("rating.input",_7b8.data("rating.star",star));
_7b7.stars[_7b7.stars.length]=star[0];
_7b7.inputs[_7b7.inputs.length]=_7b8[0];
_7b7.rater=_7ba[eid]=_7bb;
_7b7.context=_7b9;
_7b8.data("rating",_7b7);
_7bb.data("rating",_7b7);
star.data("rating",_7b7);
_7b9.data("rating",_7ba);
});
$(".rating-to-be-drawn").rating("draw").removeClass("rating-to-be-drawn");
return this;
};
$.extend($.fn.rating,{calls:0,focus:function(){
var _7bc=this.data("rating");
if(!_7bc){
return this;
}
if(!_7bc.focus){
return this;
}
var _7bd=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_7bc.focus){
_7bc.focus.apply(_7bd[0],[_7bd.val(),$("a",_7bd.data("rating.star"))[0]]);
}
},blur:function(){
var _7be=this.data("rating");
if(!_7be){
return this;
}
if(!_7be.blur){
return this;
}
var _7bf=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_7be.blur){
_7be.blur.apply(_7bf[0],[_7bf.val(),$("a",_7bf.data("rating.star"))[0]]);
}
},fill:function(){
var _7c0=this.data("rating");
if(!_7c0){
return this;
}
if(_7c0.readOnly){
return;
}
this.rating("drain");
this.prevAll().andSelf().filter(".rater-"+_7c0.serial).addClass("star-rating-hover");
},drain:function(){
var _7c1=this.data("rating");
if(!_7c1){
return this;
}
if(_7c1.readOnly){
return;
}
_7c1.rater.children().filter(".rater-"+_7c1.serial).removeClass("star-rating-on").removeClass("star-rating-hover");
},draw:function(){
var _7c2=this.data("rating");
if(!_7c2){
return this;
}
this.rating("drain");
if(_7c2.current){
_7c2.current.data("rating.input").attr("checked","checked");
_7c2.current.prevAll().andSelf().filter(".rater-"+_7c2.serial).addClass("star-rating-on");
}else{
$(_7c2.inputs).removeAttr("checked");
}
_7c2.cancel[_7c2.readOnly||_7c2.required?"hide":"show"]();
this.siblings()[_7c2.readOnly?"addClass":"removeClass"]("star-rating-readonly");
},select:function(_7c3,_7c4){
var _7c5=this.data("rating");
if(!_7c5){
return this;
}
if(_7c5.readOnly){
return;
}
_7c5.current=null;
if(typeof _7c3!="undefined"){
if(typeof _7c3=="number"){
return $(_7c5.stars[_7c3]).rating("select",undefined,_7c4);
}
if(typeof _7c3=="string"){
$.each(_7c5.stars,function(){
if($(this).data("rating.input").val()==_7c3){
$(this).rating("select",undefined,_7c4);
}
});
}
}else{
_7c5.current=this[0].tagName=="INPUT"?this.data("rating.star"):(this.is(".rater-"+_7c5.serial)?this:null);
}
this.data("rating",_7c5);
this.rating("draw");
var _7c6=$(_7c5.current?_7c5.current.data("rating.input"):null);
if((_7c4||_7c4==undefined)&&_7c5.callback){
_7c5.callback.apply(_7c6[0],[_7c6.val(),$("a",_7c5.current)[0]]);
}
},readOnly:function(_7c7,_7c8){
var _7c9=this.data("rating");
if(!_7c9){
return this;
}
_7c9.readOnly=_7c7||_7c7==undefined?true:false;
if(_7c8){
$(_7c9.inputs).attr("disabled","disabled");
}else{
$(_7c9.inputs).removeAttr("disabled");
}
this.data("rating",_7c9);
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
var _7ca,_7cb;
function _7cc(elt,_7cd){
var _7ce=jq("#creative").is(":checked")?"cw_":"";
var _7cf=_7ce+jq(elt).attr("id")+"_"+_7cd;
var _7d0=jq("#"+_7cf);
if(0==_7d0.size()){
var expl;
if(0==_7cd){
expl="Please choose a rating.";
}else{
if(_7cd%2==0){
expl="Explanation coming soon.";
}else{
if(1==_7cd){
expl="Does not even deserve a 2.";
}else{
var _7d1=_7cd-1;
var _7d2=_7cd+1;
var _7d3=_7d1==8?"an":"a";
var _7d4=_7d2==8?"an":"a";
expl="Exhibits characteristics between "+_7d3+" "+_7d1+" and "+_7d4+" "+_7d2+".";
}
}
}
var _7d5="explain_"+jq(elt).attr("id");
_7d0=jq("<div id=\""+_7cf+"\" class=\"rate_explain "+_7d5+"\"><p>"+expl+"</p></div>").insertAfter("#default_explain");
}
jq(".rate_explain").hide();
_7d0.show();
};
var _7d6={init:function(_7d7){
_7cb=this;
_7ca=$.extend({reason:false,showExplanations:true,toggleExplanations:true,detailedExplanations:true,onsubmit:false,singleSlider:false},_7d7);
if(_7ca.reason){
jq("#rating_submit").parent().before("<div id=\"rating_reason\">"+"<label for=\"reason\">Reasons for ratings:</label>"+"<textarea id=\"reason\"></textarea>"+"</div>");
}
if(_7ca.toggleExplanations){
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
jq(_7cb).slideUp(800,function(){
if(!jq(_7cb).data("rated")){
jq("#open_hub_rating").fadeIn();
}
});
return false;
});
jq("#open_hub_rating").click(function(){
jq(_7cb).find(".rate_explain").hide();
jq("#default_explain").show();
jq(this).hide();
jq(_7cb).slideDown(1000);
return false;
});
jq(".hub_rating_slider").slider({min:0,max:10,step:1,value:0,range:"min",slide:function(_7d8,ui){
var _7d9=ui.value==0?"?":ui.value;
jq(_7d8.target).prev(".head_two").children("strong").text(_7d9);
if(_7ca.showExplanations){
_7cc(_7d8.target,_7ca.detailedExplanations?ui.value:0);
}
},change:function(_7da,ui){
var _7db=ui.value==0?"?":ui.value;
jq(_7da.target).prev(".head_two").children("strong").text(_7db);
}}).mouseenter(function(_7dc){
if(_7ca.showExplanations){
_7cc(_7dc.currentTarget,_7ca.detailedExplanations?jq(_7dc.currentTarget).slider("value"):0);
}
});
if(_7ca.showExplanations&&!_7ca.detailedExplanations){
jq(".hub_rating_slider").mouseleave(function(_7dd){
jq(".rate_explain").hide();
jq("#default_explain").show();
});
}
jq("#rating_submit").click(function(){
var d=new Date();
if(!jq(this).data("lock")||jq(this).data("lock")<d.getTime()-4000){
jq(this).data("lock",d.getTime());
var _7de={isCreative:jq("#creative").is(":checked")?1:0,substance:jq("#substance").size()?jq("#substance").slider("value"):0,organization:jq("#organization").size()?jq("#organization").slider("value"):0,mechanics:jq("#mechanics").size()?jq("#mechanics").slider("value"):0,quality:jq("#quality").size()?jq("#quality").slider("value"):0,reason:jq.trim(jq("#reason").val())};
if(!_7ca.singleSlider&&(0==_7de.substance||0==_7de.organization||0==_7de.mechanics)){
alert(_7de.isCreative?_7ca.creativeRatingMissingMessage:_7ca.ratingMissingMessage);
return false;
}else{
if(_7ca.singleSlider&&0==_7de.quality){
alert(_7ca.ratingMissingMessage);
return false;
}else{
if(_7ca.reason&&!_7de.reason){
alert(_7ca.reasonMissingMessage);
return false;
}
}
}
jq(_7cb).data("rated",true);
if(typeof _7ca.onsubmit=="function"){
_7ca.onsubmit.apply(_7cb,[_7de]);
}
}else{
}
return false;
});
return this;
},clear:function(){
jq("#creative").attr("checked",false);
jq(".hub_rating_slider").slider("value",0);
jq(".rate_explain").hide();
jq("#default_explain").show();
jq("#reason").val("");
jq(".slider_set, #rating_reason, #rate_hub").show();
return this;
}};
$.fn.hubrating=function(_7df){
if(_7d6[_7df]){
return _7d6[_7df].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _7df==="object"||!_7df){
return _7d6.init.apply(this,arguments);
}else{
$.error("Method "+_7df+" does not exist on jQuery.hubrating");
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
function _7e0(){
var _7e1="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _7e2="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _7e3="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7e1),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_7e3),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_7e2),"gm"),css:"keyword bold"}];
};
_7e0.prototype=new SyntaxHighlighter.Highlighter();
_7e0.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_7e0;
typeof (exports)!="undefined"?exports.Brush=_7e0:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7e4(){
var _7e5="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _7e6(_7e7,_7e8){
var css=(_7e7[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_7e7[0],_7e7.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_7e6},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7e5),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7e4.prototype=new SyntaxHighlighter.Highlighter();
_7e4.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_7e4;
typeof (exports)!="undefined"?exports.Brush=_7e4:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7e9(){
function _7ea(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _7eb(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _7ec="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _7ed="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _7ee="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_7ea(_7ec),"gm"),css:"keyword"},{regex:new RegExp(_7eb(_7ed),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_7ee),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_7e9.prototype=new SyntaxHighlighter.Highlighter();
_7e9.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_7e9;
typeof (exports)!="undefined"?exports.Brush=_7e9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7ef(){
var _7f0="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_7f0),"gmi"),css:"keyword"}];
};
_7ef.prototype=new SyntaxHighlighter.Highlighter();
_7ef.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_7ef;
typeof (exports)!="undefined"?exports.Brush=_7ef:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f1(){
function _7f2(_7f3,_7f4){
var _7f5=SyntaxHighlighter.Match,code=_7f3[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_7f6=[];
if(_7f3.attributes!=null){
var _7f7,_7f8=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_7f7=_7f8.exec(code))!=null){
_7f6.push(new _7f5(_7f7.name,_7f3.index+_7f7.index,"color1"));
_7f6.push(new _7f5(_7f7.value,_7f3.index+_7f7.index+_7f7[0].indexOf(_7f7.value),"string"));
}
}
if(tag!=null){
_7f6.push(new _7f5(tag.name,_7f3.index+tag[0].indexOf(tag.name),"keyword"));
}
return _7f6;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_7f2}];
};
_7f1.prototype=new SyntaxHighlighter.Highlighter();
_7f1.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_7f1;
typeof (exports)!="undefined"?exports.Brush=_7f1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f9(){
var _7fa="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_7fa),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_7f9.prototype=new SyntaxHighlighter.Highlighter();
_7f9.aliases=["java"];
SyntaxHighlighter.brushes.Java=_7f9;
typeof (exports)!="undefined"?exports.Brush=_7f9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7fb(){
var _7fc="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7fc),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_7fb.prototype=new SyntaxHighlighter.Highlighter();
_7fb.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_7fb;
typeof (exports)!="undefined"?exports.Brush=_7fb:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7fd(){
var _7fe="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _7ff="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _800="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_7fe),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_800),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_7ff),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_7fd.prototype=new SyntaxHighlighter.Highlighter();
_7fd.aliases=["php"];
SyntaxHighlighter.brushes.Php=_7fd;
typeof (exports)!="undefined"?exports.Brush=_7fd:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _801(){
var _802="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _803="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _804="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_803),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_802),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_804),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_801.prototype=new SyntaxHighlighter.Highlighter();
_801.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_801;
typeof (exports)!="undefined"?exports.Brush=_801:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _805(){
var _806="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _807="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_806),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_807),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_805.prototype=new SyntaxHighlighter.Highlighter();
_805.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_805;
typeof (exports)!="undefined"?exports.Brush=_805:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _808(){
var _809="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _80a="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _80b="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_809),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_80b),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_80a),"gmi"),css:"keyword"}];
};
_808.prototype=new SyntaxHighlighter.Highlighter();
_808.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_808;
typeof (exports)!="undefined"?exports.Brush=_808:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _80c(){
var _80d="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_80d),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_80c.prototype=new SyntaxHighlighter.Highlighter();
_80c.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_80c;
typeof (exports)!="undefined"?exports.Brush=_80c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _80e(){
function _80f(_810,_811){
var _812=SyntaxHighlighter.Match,code=_810[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_813=[];
if(_810.attributes!=null){
var _814,_815=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_814=_815.exec(code))!=null){
_813.push(new _812(_814.name,_810.index+_814.index,"color1"));
_813.push(new _812(_814.value,_810.index+_814.index+_814[0].indexOf(_814.value),"string"));
}
}
if(tag!=null){
_813.push(new _812(tag.name,_810.index+tag[0].indexOf(tag.name),"keyword"));
}
return _813;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_80f}];
};
_80e.prototype=new SyntaxHighlighter.Highlighter();
_80e.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_80e;
typeof (exports)!="undefined"?exports.Brush=_80e:null;
})();
function ClojureRegExp(_816){
_816=_816+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_816,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _817,_818;
while(_817=this.regex.exec(str)){
_818=str.substring(0,_817.index);
if(this.lookBehind.test(_818)){
return _817;
}else{
this.regex.lastIndex=_817.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _819=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_81a="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_81b){
_81b=_81b.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_81b=_81b.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_81b+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_819)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_81a)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _81c(){
var _81d="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _81e="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_81d),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_81e),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_81c.prototype=new SyntaxHighlighter.Highlighter();
_81c.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_81c;
typeof (exports)!="undefined"?exports.Brush=_81c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _81f(){
var _820="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _821="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_820),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_821),"gm"),css:"functions"}];
};
_81f.prototype=new SyntaxHighlighter.Highlighter();
_81f.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_81f;
typeof (exports)!="undefined"?exports.Brush=_81f:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _822(){
var _823="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_823),"gm"),css:"keyword"}];
};
_822.prototype=new SyntaxHighlighter.Highlighter();
_822.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_822;
typeof (exports)!="undefined"?exports.Brush=_822:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _824(){
var _825="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _826="void boolean byte char short int long float double";
var _827="null";
var _828="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_825),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_826),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_827),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_828),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_824.prototype=new SyntaxHighlighter.Highlighter();
_824.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_824;
typeof (exports)!="undefined"?exports.Brush=_824:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _829(){
var _82a="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _82b="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_82a),"gm"),css:"keyword"},{regex:new RegExp(_82b,"gm"),css:"keyword"}];
};
_829.prototype=new SyntaxHighlighter.Highlighter();
_829.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_829;
typeof (exports)!="undefined"?exports.Brush=_829:null;
})();
(function($){
$.fn.starrating=function(_82c){
var _82c=$.extend({},$.fn.starrating.options,_82c||{});
return this.each(function(){
var o=$.meta?$.extend({},_82c,$this.data()):_82c;
var url=this.action,_82d,_82e,_82f;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _830=div.find("div.star");
var _831=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_830.mouseover(_832).focus(_832).mouseout(_833).blur(_833).click(_834);
_831.mouseover(_835).focus(_835).mouseout(_836).blur(_836).click(_834);
}else{
_837(div);
}
_838();
function init(elem){
_82d=$(elem).attr("title").split(/:\s*/)[1],_82e=_82d.split(".")[0],_82f=_82d.split(".")[1];
};
function _832(){
_839();
fill(this);
};
function _833(){
_839();
_838();
};
function _836(){
_838();
$(this).removeClass("on");
};
function _835(){
_839();
$(this).addClass("on");
};
function _837(elem){
_830.unbind();
_831.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _83a=$(this).attr("title");
var _83b="Average Rating: "+_82d;
$(this).attr("title",_83a.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_83b).replace("Cancel Rating",_83b));
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
function _834(){
if(_830.index(this)==-1&&!o.cancelSubmit){
return false;
}
_82e=_830.index(this)+1;
_82f=0;
if(_82e==0){
_839();
}
var _83c=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_83c},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _83d=$("div."+o.ratingClass);
init(_83d);
_833();
if(o.disableOnSubmit){
_837(_83d);
}
}});
}else{
o.success(_83c);
}
return false;
};
function fill(elem){
_830.find("a").css("width","100%");
$(_830[_830.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _839(){
_830.removeClass("on hover");
};
function _838(){
$(_830[_82e-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _83e=_82f?_82f*10:0;
if(_83e>0){
$(_830[_82e]).addClass("on").children("a").css("width",_83e+"%");
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
var _83f="<span class=\"read_more\">+ More</span>";
function _840(){
jq(this).find("span.details").css({display:"inline"});
};
jq("body.newprofile #profile_header div.bio_container").expander({slicePoint:450,widow:8,expandText:_83f,userCollapseText:"",expandSpeed:0,afterExpand:_840});
jq(".contentitem_listing.text_content > li").each(function(i,el){
el=jq(el);
var _841=el.find("h3").first();
if(_841.height()>100){
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
var ProfileManager=function(_842,_843,_844,_845,_846){
this.userId=_842;
this.userName=_843;
this.loggedInUserId=_844;
this.currentSection="mycontent";
this.defaultTab="hubs_items";
this.containerSectionDiv=jq("#profile_content_container");
this.profileContainer=_845;
this.loadMoreBtn=this.profileContainer.find("#load_more_btn");
this.spinnerDiv=_846;
this.allowedSections=["mycontent","activity","followers","following","fanmail","email","bio"];
this.moreRequest=this.profileContainer.data("moreRequest");
this.moreTopic=this.profileContainer.data("moreTopic");
this.moreArticle=this.profileContainer.data("moreArticle");
this.bindEvents();
HubPages.Lightbox.Slideshow.init(this.userId,"","","ul.profile_links > li.recent_images");
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
jq("#pagination").hide();
var _847=window.location.href,hash=window.location.hash;
if(window.location.href.match(/filter=|page=/)){
if(hash){
parent.location.href=_847.match(/^.*new/)[0]+hash;
}else{
parent.location.href=_847.match(/^.*new/)[0];
}
}
if(hash){
this.loadSectionByHashTag(hash);
}else{
var _848=this.activateAvailableTag(this.defaultTab);
("undefined"!=typeof content_items)?content_items.activate(_848):false;
this.showLoadMoreButton();
ProfileManager.prototype.applyMasonry(jq("#content_"+this.defaultTab+">.contentitem_listing"));
}
jq("div.categoryTeaser").each(function(){
var _849=jq(this).find("img"),_84a=_849.height(),_84b=_849.width(),_84c=300,_84d=240,_84e=_84a/_84b,_84f=_84d/_84c,_850=_84c,_851=_84d;
if(_84e<_84f){
_850=_84b/_84a*_84d;
}else{
if(_84e>_84f){
_851=_84a/_84b*_84c;
}
}
_849.css({"position":"relative","height":_851+"px","width":_850+"px"});
var _852=((_849.height()-_84d)*0.4)*-1,_853=((_849.width()-_84c)/2)*-1;
_849.css({"top":_852+"px","left":_853+"px"});
});
};
ProfileManager.prototype.activateAvailableTag=function(_854){
if(jq("#"+_854+"_item").length>0){
return _854;
}else{
var _855=jq("#section_mycontent > div.content_items > ul.content_list:parent");
if(_855.length>0){
return _855.parent().attr("id").replace(/content_/,"");
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
var _856=this.containerSectionDiv.find("> div:visible");
switch(this.currentSection){
case "mycontent":
var _857=jq(".content_nav ul#tabs li.active");
if(_857.length>0){
var _858=_857.attr("id").replace(/_items_item/,"");
if(this.moreContent(_858)){
if(!_856.find("div.content_items:visible").first().data("no_content")){
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
if(!_856.find("#following_people").data("no_content")||!_856.find("#following_topics").data("no_content")){
_856.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
break;
default:
if(this.currentSection!="activity"){
var _859=this.getDivSection(this.currentSection);
if(!_859.data("no_content")){
_856.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}
}
};
ProfileManager.prototype.loadSectionByHashTag=function(_85a){
if(_85a){
var _85b=_85a.replace("#",""),_85c=this.defaultTab,_85d="";
if(_85b.match(/^slide/)){
jq("ul.profile_links > li.recent_images").trigger("click");
}else{
if(_85b.match(/^mycontent_.*_hubs$/)||_85b.match(/^mycontent_.*_forums$/)||_85b.match(/^mycontent_.*_answers$/)){
var _85e=_85b.replace(/^mycontent_|_[a-z]+$/g,""),tab=_85b.match(/[a-z]+$/),_85f=jq("#"+tab+"_topic_menu li");
for(var i=0,l=_85f.length;i<l;i++){
if(jq(_85f[i]).attr("data-hash")==_85e){
_85c=tab+"_items";
_85d=this.activateAvailableTag(_85c);
("undefined"!=typeof content_items)?content_items.activate(_85d):false;
jq(_85f[i]).trigger("click");
break;
}
}
}else{
if(this.isValidSection(_85b)){
jq("a[href=#"+this.currentSection+"]").parent().removeClass("active");
this.currentSection=_85b;
if(this.currentSection=="email"){
this.currentSection="fanmail";
}
if(this.currentSection=="bio"){
if(jq("#read_bio").length>0){
jq("#read_bio").trigger("click");
}
}else{
this.loadSection(this.currentSection,function(){
if(_85b=="email"){
if(this.profileContainer.data("send_email")=="1"){
this.openFancyBox("#email_to_user");
}
}
});
}
}
}
}
_85d=this.activateAvailableTag(_85c);
("undefined"!=typeof content_items)?content_items.activate(_85d):false;
this.showLoadMoreButton();
}
};
ProfileManager.prototype.isValidSection=function(_860){
var _861=false;
for(i in this.allowedSections){
if(this.allowedSections[i]==_860){
_861=true;
break;
}
}
return _861;
};
ProfileManager.prototype.loadContentOnScroll=function(){
var _862=jq(window),_863=jq("#footer_wrap"),pos=_862.scrollTop(),_864=jq("#profile_header"),_865=_864.offset().top,_866=jq(window).scrollTop()>=(jq(document).height()-jq(window).height()-30),_867=jq("#profile_content_container > div:visible"),_868=(_867.length>0)?_867.attr("id").replace(/section_/,""):"",_869=[],_86a=jq(".content_nav ul#tabs li.active"),_86b="";
if(_868=="mycontent"){
if(_86a.length==0){
return;
}
_86b=_86a.attr("id").replace(/_items_item/,"");
}
if(_868=="following"){
_869.push(jq("#following_people"));
_869.push(jq("#following_topics"));
}else{
if(this.getDivSection(_868)){
_869.push(this.getDivSection(_868));
}
}
_869.each(jq.proxy(function(_86c){
if(!this.moreContent(_86b)){
return;
}
if(!_86c.data("no_content")){
if(_86c.data("loading")){
return;
}
if((_862.scrollTop()+_862.height())>=(jq(document).height()-1)){
setTimeout(jQuery.proxy(function(){
this.loadContent(_86c,_868,_86b);
},this),300);
}
}
},this));
};
ProfileManager.prototype.moreContent=function(_86d){
if((_86d=="answers"&&this.moreRequest==="1")||(_86d=="hubs"&&this.moreArticle==="1")||(_86d=="forums"&&this.moreTopic==="1")){
return true;
}else{
if((_86d=="answers"&&this.moreRequest==="0")||(_86d=="hubs"&&this.moreArticle==="0")||(_86d=="forums"&&this.moreTopic==="0")){
return false;
}
}
};
ProfileManager.prototype.loadContent=function(_86e,_86f,_870){
var _871=jq(".newprofile #show_only").data("categoryId")||"all";
var page;
if(_86e.data("next")){
page=_86e.data("next");
}else{
page=(0==_86e.children("ul").first().children().size())?1:2;
}
this.loadMoreBtn.hide();
if(jq("#spinner_loading").length>0){
_872=jq("#spinner_loading");
}else{
var _873=jq("#footer_wrap").height();
var _872=jq("<div/>",{"id":"spinner_loading",}).html(jq(this.spinnerDiv));
}
_872.show();
_86e.parent().append(_872);
_86e.parent().find("#spinner_loading > img.spinner").show();
if(_86f=="following"){
_86f=_86e.attr("id");
}
var _874={section:_86f,userId:this.userId,activeTab:_870,categoryId:_871,ajax:1};
if(page>1){
_874.page=page;
}
_86e.data("loading",true);
jq.get(this.profileContainer.data("loadMoreUrl"),_874,jq.proxy(function(data,_875,xhr){
_872.hide();
if(_86f=="fanmail"){
var _876=jq(data.render);
jq.each(_876,function(){
if(jq("#"+jq(this).attr("id")).length===0){
_86e.append(this);
}
});
}else{
var _877="";
jq.each(data.render,function(id,val){
if(_86e.find("#"+id).length===0){
_877+=val;
}
});
var _878=false;
if(_86f=="mycontent"){
var ul=_86e.find("ul");
if(ul.hasClass("masonry")){
var _879=jq(_877);
ul.append(_879).masonry("appended",_879);
}else{
_878=true;
ul.append(_877);
}
}else{
_86e.append(_877);
}
if(_878){
ProfileManager.prototype.applyMasonry(ul);
}
}
if(data.more){
jq(document).data("no_content_all",false);
_86e.data("next",page+1);
this.loadMoreBtn.show();
}else{
jq(document).data("no_content_all",true);
_86e.data("no_content",true);
}
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
_86e.data("loading",false);
},this),"json");
};
ProfileManager.prototype.dismissSimilarUser=function(self){
var _87a=jq(this).parent(),_87b=_87a.attr("id").replace(/similar_user_/,""),_87c=jq("div.similar_users_box"),_87d=_87c.find(".last_similar_user");
if(_87d.length===0){
firstUserId=_87c.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
}else{
firstUserId=_87d.attr("id").replace(/similar_user_/,"");
}
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:self.userId,userId:_87b,firstUserId:firstUserId,action:"dismiss"},success:jq.proxy(function(data){
_87a.fadeOut("slow",function(){
if(_87a.parent().find(".similar_user:visible").length==0){
_87a.parent().parent().fadeOut("slow",function(){
jq(this).remove();
});
}
if(data.render!=""){
_87c.find(".last_similar_user").each(function(){
jq(this).removeClass("last_similar_user");
});
_87a.replaceWith(data.render);
jq("#"+jq(data.render).attr("id")).addClass("last_similar_user");
_87c.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_87c.find(".similar_user").length<3){
self.loadSingleSimilarUser();
}
}
jq(this).remove();
});
},this)});
};
ProfileManager.prototype.loadSingleSimilarUser=function(){
var _87e=jq("div.similar_users_box"),_87f=_87e.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:this.userId,firstUserId:_87f},success:jq.proxy(function(data){
if(data.render!=""){
_87e.find("div.content_box_i").append(data.render);
_87e.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}
if(_87e.find(".similar_user").length<3){
this.loadSingleSimilarUser();
}
},this)});
};
ProfileManager.prototype.loadSimilarUsers=function(num){
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{userId:this.userId,num:num,action:"load"},success:jq.proxy(function(data){
var _880=jq("div.similar_users_box"),_881=_880.find(".similar_user").length;
if(data.render!=""){
_880.find("div.content_box_i").append(data.render);
_880.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_880.find(".similar_user").length<3&&data.more){
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
var _882=new RegExp(window.location.hash.replace(/slide|#/g,""),"i");
jq.each(jq(".slideshow img"),function(){
if(_882.test(jq(this).attr("src"))){
var href=jq(this).parents(".content").attr("id");
jq("a[href=#"+href+"]").trigger("click");
}
});
});
self.loadMoreBtn.live("click",function(){
var _883=jq("#profile_content_container > div:visible"),_884=(_883.length>0)?_883.attr("id").replace(/section_/,""):"",_885=[],_886=jq(".content_nav ul#tabs li.active"),_887="";
if(_884=="mycontent"){
if(_886.length==0){
return;
}
_887=_886.attr("id").replace(/_items_item/,"");
_885.push(_883.find("div.content_items:visible").first());
}else{
if(_884=="followers"){
_885.push(_883.find("div").first());
}else{
if(_884=="following"){
_885.push(jq("#following_people"));
_885.push(jq("#following_topics"));
}else{
if(_884=="fanmail"){
_885.push(_883.find("#fanmail_content"));
}
}
}
}
_885.each(function(_888){
if(!_888.data("no_content")){
if(_888.data("loading")){
return;
}
self.loadContent(_888,_884,_887);
}else{
self.loadMoreBtn.hide();
}
});
});
jq("#read_bio").live("click",function(e){
var _889=jq(this).closest("div");
e.preventDefault();
_889.html(jq("img.spinner").first());
_889.hide();
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
var _88a=jq(this).find("a").text();
jq.each(jq(this).parent().find("li"),function(){
jq(this).removeClass("active");
});
self.loadSection(_88a);
});
var _88b=jq(".newprofile div.content_nav ul.filter_by_topic"),_88c=jq(".newprofile #show_only"),_88d="#section_mycontent .content_items:visible",_88e=jq("ul.filter_by_topic li"),_88f=false;
_88c.click(function(){
if(!_88f){
var _890=jq(".content_nav #tabs .active").attr("id").replace(/_items_item/,"");
ulFilters=jq("#"+_890+"_topic_menu");
ulFilters.attr("tabindex",-1);
setTimeout(function(){
ulFilters.focus();
},0);
if(ulFilters.is(":visible")){
ulFilters.hide();
_88c.find("span").removeClass("active");
}else{
ulFilters.show();
_88c.find("span").addClass("active");
}
var _891=ulFilters.offset().left,_892=_88c.offset().left,_893=(_891-_892)+11;
ulFilters.css("right",parseFloat(ulFilters.css("right"))+_893+"px");
_88f=false;
}
});
_88b.bind("blur",function(e){
_88f=true;
jq(this).hide();
_88c.find("span").removeClass("active");
setTimeout(function(){
_88f=false;
},500);
});
_88e.click(function(){
var _894=jq(this).attr("data-id"),_895=jq(".content_nav ul#tabs li.active");
if(_895.length>0){
var _896=jq(".content_nav ul#tabs li.active").attr("id").replace(/_items_item/,""),_897=jq(this).text();
_895.data("categoryId",_894);
jq(_88d).find("ul").html(jq(self.spinnerDiv));
jq(_88d).data("loading",true);
loadCategoryContent("mycontent",_894,_896,function(res){
var _898=jq(_88d).find("ul");
_898.find("img.spinner").hide();
ProfileManager.prototype.destroyMasonry(_898);
jq.each(res.render,function(id,val){
if(_898.find("#"+id).length===0){
_898.append(val);
}
});
ProfileManager.prototype.applyMasonry(_898);
jq(_88d).removeData("next");
if(res.more){
jq(_88d).data("no_content",false);
jq(document).data("no_content_all",false);
}else{
jq(document).data("no_content_all",true);
jq(_88d).data("no_content",true);
}
_88c.data("categoryId",_894);
_88c.data(getUrlHashTagVersion(_897),_894);
_88c.html("<span></span><strong>Show</strong>: "+_897);
jq(_88d).data("loading",false);
loadHashTag(_896);
self.showLoadMoreButton();
});
_88c.attr("tabindex",-1);
_88c.focus();
_88b.hide();
_88c.find("span").removeClass("active");
}
});
};
ProfileManager.prototype.openFancyBox=function(_899,_89a){
var el=jq(_899);
jq.fancybox({"href":_899,onStart:function(){
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
ProfileManager.prototype.getDivSection=function(_89b){
var _89c,_89d=jq("#section_"+_89b);
if(_89b=="mycontent"){
_89c=_89d.find("div.content_items:visible").first();
}else{
if(_89b=="followers"){
_89c=_89d.find("div").first();
}else{
if(_89b=="fanmail"){
_89c=_89d.find("#fanmail_content");
}
}
}
return _89c;
};
ProfileManager.prototype.loadSection=function(_89e,_89f){
this.currentSection=_89e.replace(/\s/,"").toLowerCase();
if(this.currentSection=="myactivity"){
this.currentSection="activity";
}
var _8a0="section_"+this.currentSection,isCr=typeof cr,_8a1=jq("#profile_content_container"),_8a2=_8a1.offset().top,_8a3=jq(this.spinnerDiv);
var _8a4=jq("a[href=#"+this.currentSection+"]");
if(_8a4.length>0){
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
}
if(_8a0!="section_mycontent"&&jq("#teaser").length>0&&isCr!="undefined"){
cr.pause();
}
jq("div[id^=section_]").hide();
if(jq("#"+_8a0).length>0){
jq("#"+_8a0).show();
if(_8a0=="section_mycontent"){
ProfileManager.prototype.applyMasonry(jq("#content_hubs_items > .contentitem_listing"));
}
this.showLoadMoreButton();
}else{
var _8a5=_8a1.find("img.spinner");
if(_8a5.length==0){
_8a1.append(_8a3);
}
_8a5.show();
jq.post("/xml/profile/profile_section.php",{section:this.currentSection,userId:this.userId},jq.proxy(function(res){
var data=jQuery.parseJSON(res),_8a6;
_8a1.find(".spinner").hide();
if(data.render){
_8a7.call(this,data);
}else{
jq.each(data,jQuery.proxy(function(i,el){
_8a7.call(this,el);
},this));
}
function _8a7(el){
if(jq("#"+_8a0).length===0){
_8a6=jq("<div/>",{id:_8a0,"class":"psection"});
}else{
_8a6=jq("#"+_8a0);
}
_8a6.append(el.render).appendTo("#profile_content_container");
if(!el.more&&this.currentSection!="activity"){
if(this.currentSection==="following"){
_8a6.find("#"+el.section).data("no_content",true);
}else{
this.getDivSection(this.currentSection).data("no_content",true);
}
}
};
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_8a0=="section_fanmail"){
var _8a8=jq("#email_to_user");
if(_8a8.length>0){
jq(".lightbox").fancybox({onStart:function(){
window.location.hash="#email";
_8a8.show();
},onClosed:function(){
_8a8.hide();
_8a8.find("#success_message_email").hide();
_8a8.find("#email").show();
_8a8.find("h3").show();
},onComplete:function(e){
_8a8.css("overflow-x","hidden");
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
var _8a9=jq("#success_message_email");
_8a9.html(messaging);
_8a9.siblings("#email").fadeOut("slow",function(){
jq("#email_to_user h3").hide();
_8a9.show();
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
var _8aa=$("fanmailadd");
Element.update(_8aa,req.responseText);
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
(_89f!=undefined)?_89f.call(this):false;
},this));
}
};

