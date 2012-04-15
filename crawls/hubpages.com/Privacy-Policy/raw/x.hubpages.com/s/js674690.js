(function($,_1){
$.ui=$.ui||{};
if($.ui.version){
return;
}
$.extend($.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
$.fn.extend({_focus:$.fn.focus,focus:function(_2,fn){
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
$.extend($.expr[":"],{data:function(_1d,i,_1e){
return !!$.data(_1d,_1e[3]);
},focusable:function(_1f){
return _16(_1f,!isNaN($.attr(_1f,"tabindex")));
},tabbable:function(_20){
var _21=$.attr(_20,"tabindex"),_22=isNaN(_21);
return (_22||_21>=0)&&_16(_20,!_22);
}});
$(function(){
var _23=document.body,div=_23.appendChild(div=document.createElement("div"));
$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
$.support.minHeight=div.offsetHeight===100;
$.support.selectstart="onselectstart" in div;
_23.removeChild(div).style.display="none";
});
$.extend($.ui,{plugin:{add:function(_24,_25,set){
var _26=$.ui[_24].prototype;
for(var i in set){
_26.plugins[i]=_26.plugins[i]||[];
_26.plugins[i].push([_25,set[i]]);
}
},call:function(_27,_28,_29){
var set=_27.plugins[_28];
if(!set||!_27.element[0].parentNode){
return;
}
for(var i=0;i<set.length;i++){
if(_27.options[set[i][0]]){
set[i][1].apply(_27.element,_29);
}
}
}},contains:function(a,b){
return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);
},hasScroll:function(el,a){
if($(el).css("overflow")==="hidden"){
return false;
}
var _2a=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;
if(el[_2a]>0){
return true;
}
el[_2a]=1;
has=(el[_2a]>0);
el[_2a]=0;
return has;
},isOverAxis:function(x,_2b,_2c){
return (x>_2b)&&(x<(_2b+_2c));
},isOver:function(y,x,top,_2d,_2e,_2f){
return $.ui.isOverAxis(y,top,_2e)&&$.ui.isOverAxis(x,_2d,_2f);
}});
})(jQuery);
(function($,_30){
if($.cleanData){
var _31=$.cleanData;
$.cleanData=function(_32){
for(var i=0,_33;(_33=_32[i])!=null;i++){
$(_33).triggerHandler("remove");
}
_31(_32);
};
}else{
var _34=$.fn.remove;
$.fn.remove=function(_35,_36){
return this.each(function(){
if(!_36){
if(!_35||$.filter(_35,[this]).length){
$("*",this).add([this]).each(function(){
$(this).triggerHandler("remove");
});
}
}
return _34.call($(this),_35,_36);
});
};
}
$.widget=function(_37,_38,_39){
var _3a=_37.split(".")[0],_3b;
_37=_37.split(".")[1];
_3b=_3a+"-"+_37;
if(!_39){
_39=_38;
_38=$.Widget;
}
$.expr[":"][_3b]=function(_3c){
return !!$.data(_3c,_37);
};
$[_3a]=$[_3a]||{};
$[_3a][_37]=function(_3d,_3e){
if(arguments.length){
this._createWidget(_3d,_3e);
}
};
var _3f=new _38();
_3f.options=$.extend(true,{},_3f.options);
$[_3a][_37].prototype=$.extend(true,_3f,{namespace:_3a,widgetName:_37,widgetEventPrefix:$[_3a][_37].prototype.widgetEventPrefix||_37,widgetBaseClass:_3b},_39);
$.widget.bridge(_37,$[_3a][_37]);
};
$.widget.bridge=function(_40,_41){
$.fn[_40]=function(_42){
var _43=typeof _42==="string",_44=Array.prototype.slice.call(arguments,1),_45=this;
_42=!_43&&_44.length?$.extend.apply(null,[true,_42].concat(_44)):_42;
if(_43&&_42.charAt(0)==="_"){
return _45;
}
if(_43){
this.each(function(){
var _46=$.data(this,_40),_47=_46&&$.isFunction(_46[_42])?_46[_42].apply(_46,_44):_46;
if(_47!==_46&&_47!==_30){
_45=_47;
return false;
}
});
}else{
this.each(function(){
var _48=$.data(this,_40);
if(_48){
_48.option(_42||{})._init();
}else{
$.data(this,_40,new _41(_42,this));
}
});
}
return _45;
};
};
$.Widget=function(_49,_4a){
if(arguments.length){
this._createWidget(_49,_4a);
}
};
$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(_4b,_4c){
$.data(_4c,this.widgetName,this);
this.element=$(_4c);
this.options=$.extend(true,{},this.options,this._getCreateOptions(),_4b);
var _4d=this;
this.element.bind("remove."+this.widgetName,function(){
_4d.destroy();
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
},option:function(key,_4e){
var _4f=key;
if(arguments.length===0){
return $.extend({},this.options);
}
if(typeof key==="string"){
if(_4e===_30){
return this.options[key];
}
_4f={};
_4f[key]=_4e;
}
this._setOptions(_4f);
return this;
},_setOptions:function(_50){
var _51=this;
$.each(_50,function(key,_52){
_51._setOption(key,_52);
});
return this;
},_setOption:function(key,_53){
this.options[key]=_53;
if(key==="disabled"){
this.widget()[_53?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",_53);
}
return this;
},enable:function(){
return this._setOption("disabled",false);
},disable:function(){
return this._setOption("disabled",true);
},_trigger:function(_54,_55,_56){
var _57=this.options[_54];
_55=$.Event(_55);
_55.type=(_54===this.widgetEventPrefix?_54:this.widgetEventPrefix+_54).toLowerCase();
_56=_56||{};
if(_55.originalEvent){
for(var i=$.event.props.length,_58;i;){
_58=$.event.props[--i];
_55[_58]=_55.originalEvent[_58];
}
}
this.element.trigger(_55,_56);
return !($.isFunction(_57)&&_57.call(this.element[0],_55,_56)===false||_55.isDefaultPrevented());
}};
})(jQuery);
(function($,_59){
var _5a=false;
$(document).mousedown(function(e){
_5a=false;
});
$.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){
var _5b=this;
this.element.bind("mousedown."+this.widgetName,function(_5c){
return _5b._mouseDown(_5c);
}).bind("click."+this.widgetName,function(_5d){
if(true===$.data(_5d.target,_5b.widgetName+".preventClickEvent")){
$.removeData(_5d.target,_5b.widgetName+".preventClickEvent");
_5d.stopImmediatePropagation();
return false;
}
});
this.started=false;
},_mouseDestroy:function(){
this.element.unbind("."+this.widgetName);
},_mouseDown:function(_5e){
if(_5a){
return;
}
(this._mouseStarted&&this._mouseUp(_5e));
this._mouseDownEvent=_5e;
var _5f=this,_60=(_5e.which==1),_61=(typeof this.options.cancel=="string"?$(_5e.target).parents().add(_5e.target).filter(this.options.cancel).length:false);
if(!_60||_61||!this._mouseCapture(_5e)){
return true;
}
this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){
this._mouseDelayTimer=setTimeout(function(){
_5f.mouseDelayMet=true;
},this.options.delay);
}
if(this._mouseDistanceMet(_5e)&&this._mouseDelayMet(_5e)){
this._mouseStarted=(this._mouseStart(_5e)!==false);
if(!this._mouseStarted){
_5e.preventDefault();
return true;
}
}
if(true===$.data(_5e.target,this.widgetName+".preventClickEvent")){
$.removeData(_5e.target,this.widgetName+".preventClickEvent");
}
this._mouseMoveDelegate=function(_62){
return _5f._mouseMove(_62);
};
this._mouseUpDelegate=function(_63){
return _5f._mouseUp(_63);
};
$(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
_5e.preventDefault();
_5a=true;
return true;
},_mouseMove:function(_64){
if($.browser.msie&&!(document.documentMode>=9)&&!_64.button){
return this._mouseUp(_64);
}
if(this._mouseStarted){
this._mouseDrag(_64);
return _64.preventDefault();
}
if(this._mouseDistanceMet(_64)&&this._mouseDelayMet(_64)){
this._mouseStarted=(this._mouseStart(this._mouseDownEvent,_64)!==false);
(this._mouseStarted?this._mouseDrag(_64):this._mouseUp(_64));
}
return !this._mouseStarted;
},_mouseUp:function(_65){
$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){
this._mouseStarted=false;
if(_65.target==this._mouseDownEvent.target){
$.data(_65.target,this.widgetName+".preventClickEvent",true);
}
this._mouseStop(_65);
}
return false;
},_mouseDistanceMet:function(_66){
return (Math.max(Math.abs(this._mouseDownEvent.pageX-_66.pageX),Math.abs(this._mouseDownEvent.pageY-_66.pageY))>=this.options.distance);
},_mouseDelayMet:function(_67){
return this.mouseDelayMet;
},_mouseStart:function(_68){
},_mouseDrag:function(_69){
},_mouseStop:function(_6a){
},_mouseCapture:function(_6b){
return true;
}});
})(jQuery);
(function($,_6c){
$.widget("ui.sortable",$.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){
var o=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?o.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit();
},destroy:function(){
this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var i=this.items.length-1;i>=0;i--){
this.items[i].item.removeData("sortable-item");
}
return this;
},_setOption:function(key,_6d){
if(key==="disabled"){
this.options[key]=_6d;
this.widget()[_6d?"addClass":"removeClass"]("ui-sortable-disabled");
}else{
$.Widget.prototype._setOption.apply(this,arguments);
}
},_mouseCapture:function(_6e,_6f){
if(this.reverting){
return false;
}
if(this.options.disabled||this.options.type=="static"){
return false;
}
this._refreshItems(_6e);
var _70=null,_71=this,_72=$(_6e.target).parents().each(function(){
if($.data(this,"sortable-item")==_71){
_70=$(this);
return false;
}
});
if($.data(_6e.target,"sortable-item")==_71){
_70=$(_6e.target);
}
if(!_70){
return false;
}
if(this.options.handle&&!_6f){
var _73=false;
$(this.options.handle,_70).find("*").andSelf().each(function(){
if(this==_6e.target){
_73=true;
}
});
if(!_73){
return false;
}
}
this.currentItem=_70;
this._removeCurrentsFromItems();
return true;
},_mouseStart:function(_74,_75,_76){
var o=this.options,_77=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(_74);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
$.extend(this.offset,{click:{left:_74.pageX-this.offset.left,top:_74.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(_74);
this.originalPageX=_74.pageX;
this.originalPageY=_74.pageY;
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
this._trigger("start",_74,this._uiHash());
if(!this._preserveHelperProportions){
this._cacheHelperProportions();
}
if(!_76){
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("activate",_74,_77._uiHash(this));
}
}
if($.ui.ddmanager){
$.ui.ddmanager.current=this;
}
if($.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_74);
}
this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(_74);
return true;
},_mouseDrag:function(_78){
this.position=this._generatePosition(_78);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){
this.lastPositionAbs=this.positionAbs;
}
if(this.options.scroll){
var o=this.options,_79=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-_78.pageY<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_79=this.scrollParent[0].scrollTop+o.scrollSpeed;
}else{
if(_78.pageY-this.overflowOffset.top<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_79=this.scrollParent[0].scrollTop-o.scrollSpeed;
}
}
if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-_78.pageX<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_79=this.scrollParent[0].scrollLeft+o.scrollSpeed;
}else{
if(_78.pageX-this.overflowOffset.left<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_79=this.scrollParent[0].scrollLeft-o.scrollSpeed;
}
}
}else{
if(_78.pageY-$(document).scrollTop()<o.scrollSensitivity){
_79=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);
}else{
if($(window).height()-(_78.pageY-$(document).scrollTop())<o.scrollSensitivity){
_79=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);
}
}
if(_78.pageX-$(document).scrollLeft()<o.scrollSensitivity){
_79=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);
}else{
if($(window).width()-(_78.pageX-$(document).scrollLeft())<o.scrollSensitivity){
_79=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);
}
}
}
if(_79!==false&&$.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_78);
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
var _7a=this.items[i],_7b=_7a.item[0],_7c=this._intersectsWithPointer(_7a);
if(!_7c){
continue;
}
if(_7b!=this.currentItem[0]&&this.placeholder[_7c==1?"next":"prev"]()[0]!=_7b&&!$.ui.contains(this.placeholder[0],_7b)&&(this.options.type=="semi-dynamic"?!$.ui.contains(this.element[0],_7b):true)){
this.direction=_7c==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(_7a)){
this._rearrange(_78,_7a);
}else{
break;
}
this._trigger("change",_78,this._uiHash());
break;
}
}
this._contactContainers(_78);
if($.ui.ddmanager){
$.ui.ddmanager.drag(this,_78);
}
this._trigger("sort",_78,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false;
},_mouseStop:function(_7d,_7e){
if(!_7d){
return;
}
if($.ui.ddmanager&&!this.options.dropBehaviour){
$.ui.ddmanager.drop(this,_7d);
}
if(this.options.revert){
var _7f=this;
var cur=_7f.placeholder.offset();
_7f.reverting=true;
$(this.helper).animate({left:cur.left-this.offset.parent.left-_7f.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:cur.top-this.offset.parent.top-_7f.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){
_7f._clear(_7d);
});
}else{
this._clear(_7d,_7e);
}
return false;
},cancel:function(){
var _80=this;
if(this.dragging){
this._mouseUp({target:null});
if(this.options.helper=="original"){
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("deactivate",null,_80._uiHash(this));
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",null,_80._uiHash(this));
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
var _81=this._getItemsAsjQuery(o&&o.connected);
var str=[];
o=o||{};
$(_81).each(function(){
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
var _82=this._getItemsAsjQuery(o&&o.connected);
var ret=[];
o=o||{};
_82.each(function(){
ret.push($(o.item||this).attr(o.attribute||"id")||"");
});
return ret;
},_intersectsWith:function(_83){
var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;
var l=_83.left,r=l+_83.width,t=_83.top,b=t+_83.height;
var _84=this.offset.click.top,_85=this.offset.click.left;
var _86=(y1+_84)>t&&(y1+_84)<b&&(x1+_85)>l&&(x1+_85)<r;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>_83[this.floating?"width":"height"])){
return _86;
}else{
return (l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b);
}
},_intersectsWithPointer:function(_87){
var _88=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_87.top,_87.height),_89=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_87.left,_87.width),_8a=_88&&_89,_8b=this._getDragVerticalDirection(),_8c=this._getDragHorizontalDirection();
if(!_8a){
return false;
}
return this.floating?(((_8c&&_8c=="right")||_8b=="down")?2:1):(_8b&&(_8b=="down"?2:1));
},_intersectsWithSides:function(_8d){
var _8e=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_8d.top+(_8d.height/2),_8d.height),_8f=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_8d.left+(_8d.width/2),_8d.width),_90=this._getDragVerticalDirection(),_91=this._getDragHorizontalDirection();
if(this.floating&&_91){
return ((_91=="right"&&_8f)||(_91=="left"&&!_8f));
}else{
return _90&&((_90=="down"&&_8e)||(_90=="up"&&!_8e));
}
},_getDragVerticalDirection:function(){
var _92=this.positionAbs.top-this.lastPositionAbs.top;
return _92!=0&&(_92>0?"down":"up");
},_getDragHorizontalDirection:function(){
var _93=this.positionAbs.left-this.lastPositionAbs.left;
return _93!=0&&(_93>0?"right":"left");
},refresh:function(_94){
this._refreshItems(_94);
this.refreshPositions();
return this;
},_connectWith:function(){
var _95=this.options;
return _95.connectWith.constructor==String?[_95.connectWith]:_95.connectWith;
},_getItemsAsjQuery:function(_96){
var _97=this;
var _98=[];
var _99=[];
var _9a=this._connectWith();
if(_9a&&_96){
for(var i=_9a.length-1;i>=0;i--){
var cur=$(_9a[i]);
for(var j=cur.length-1;j>=0;j--){
var _9b=$.data(cur[j],"sortable");
if(_9b&&_9b!=this&&!_9b.options.disabled){
_99.push([$.isFunction(_9b.options.items)?_9b.options.items.call(_9b.element):$(_9b.options.items,_9b.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),_9b]);
}
}
}
}
_99.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var i=_99.length-1;i>=0;i--){
_99[i][0].each(function(){
_98.push(this);
});
}
return $(_98);
},_removeCurrentsFromItems:function(){
var _9c=this.currentItem.find(":data(sortable-item)");
for(var i=0;i<this.items.length;i++){
for(var j=0;j<_9c.length;j++){
if(_9c[j]==this.items[i].item[0]){
this.items.splice(i,1);
}
}
}
},_refreshItems:function(_9d){
this.items=[];
this.containers=[this];
var _9e=this.items;
var _9f=this;
var _a0=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],_9d,{item:this.currentItem}):$(this.options.items,this.element),this]];
var _a1=this._connectWith();
if(_a1){
for(var i=_a1.length-1;i>=0;i--){
var cur=$(_a1[i]);
for(var j=cur.length-1;j>=0;j--){
var _a2=$.data(cur[j],"sortable");
if(_a2&&_a2!=this&&!_a2.options.disabled){
_a0.push([$.isFunction(_a2.options.items)?_a2.options.items.call(_a2.element[0],_9d,{item:this.currentItem}):$(_a2.options.items,_a2.element),_a2]);
this.containers.push(_a2);
}
}
}
}
for(var i=_a0.length-1;i>=0;i--){
var _a3=_a0[i][1];
var _a4=_a0[i][0];
for(var j=0,_a5=_a4.length;j<_a5;j++){
var _a6=$(_a4[j]);
_a6.data("sortable-item",_a3);
_9e.push({item:_a6,instance:_a3,width:0,height:0,left:0,top:0});
}
}
},refreshPositions:function(_a7){
if(this.offsetParent&&this.helper){
this.offset.parent=this._getParentOffset();
}
for(var i=this.items.length-1;i>=0;i--){
var _a8=this.items[i];
if(_a8.instance!=this.currentContainer&&this.currentContainer&&_a8.item[0]!=this.currentItem[0]){
continue;
}
var t=this.options.toleranceElement?$(this.options.toleranceElement,_a8.item):_a8.item;
if(!_a7){
_a8.width=t.outerWidth();
_a8.height=t.outerHeight();
}
var p=t.offset();
_a8.left=p.left;
_a8.top=p.top;
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
},_createPlaceholder:function(_a9){
var _aa=_a9||this,o=_aa.options;
if(!o.placeholder||o.placeholder.constructor==String){
var _ab=o.placeholder;
o.placeholder={element:function(){
var el=$(document.createElement(_aa.currentItem[0].nodeName)).addClass(_ab||_aa.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!_ab){
el.style.visibility="hidden";
}
return el;
},update:function(_ac,p){
if(_ab&&!o.forcePlaceholderSize){
return;
}
if(!p.height()){
p.height(_aa.currentItem.innerHeight()-parseInt(_aa.currentItem.css("paddingTop")||0,10)-parseInt(_aa.currentItem.css("paddingBottom")||0,10));
}
if(!p.width()){
p.width(_aa.currentItem.innerWidth()-parseInt(_aa.currentItem.css("paddingLeft")||0,10)-parseInt(_aa.currentItem.css("paddingRight")||0,10));
}
}};
}
_aa.placeholder=$(o.placeholder.element.call(_aa.element,_aa.currentItem));
_aa.currentItem.after(_aa.placeholder);
o.placeholder.update(_aa,_aa.placeholder);
},_contactContainers:function(_ad){
var _ae=null,_af=null;
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.currentItem[0],this.containers[i].element[0])){
continue;
}
if(this._intersectsWith(this.containers[i].containerCache)){
if(_ae&&$.ui.contains(this.containers[i].element[0],_ae.element[0])){
continue;
}
_ae=this.containers[i];
_af=i;
}else{
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",_ad,this._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(!_ae){
return;
}
if(this.containers.length===1){
this.containers[_af]._trigger("over",_ad,this._uiHash(this));
this.containers[_af].containerCache.over=1;
}else{
if(this.currentContainer!=this.containers[_af]){
var _b0=10000;
var _b1=null;
var _b2=this.positionAbs[this.containers[_af].floating?"left":"top"];
for(var j=this.items.length-1;j>=0;j--){
if(!$.ui.contains(this.containers[_af].element[0],this.items[j].item[0])){
continue;
}
var cur=this.items[j][this.containers[_af].floating?"left":"top"];
if(Math.abs(cur-_b2)<_b0){
_b0=Math.abs(cur-_b2);
_b1=this.items[j];
}
}
if(!_b1&&!this.options.dropOnEmpty){
return;
}
this.currentContainer=this.containers[_af];
_b1?this._rearrange(_ad,_b1,null,true):this._rearrange(_ad,null,this.containers[_af].element,true);
this._trigger("change",_ad,this._uiHash());
this.containers[_af]._trigger("change",_ad,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[_af]._trigger("over",_ad,this._uiHash(this));
this.containers[_af].containerCache.over=1;
}
}
},_createHelper:function(_b3){
var o=this.options;
var _b4=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[_b3,this.currentItem])):(o.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!_b4.parents("body").length){
$(o.appendTo!="parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(_b4[0]);
}
if(_b4[0]==this.currentItem[0]){
this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};
}
if(_b4[0].style.width==""||o.forceHelperSize){
_b4.width(this.currentItem.width());
}
if(_b4[0].style.height==""||o.forceHelperSize){
_b4.height(this.currentItem.height());
}
return _b4;
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
var _b5=($(ce).css("overflow")!="hidden");
this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0)-this.margins.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0)-this.margins.top,co.left+(_b5?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,co.top+(_b5?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top];
}
},_convertPositionTo:function(d,pos){
if(!pos){
pos=this.position;
}
var mod=d=="absolute"?1:-1;
var o=this.options,_b6=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_b7=(/(html|body)/i).test(_b6[0].tagName);
return {top:(pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_b7?0:_b6.scrollTop()))*mod)),left:(pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_b7?0:_b6.scrollLeft())*mod))};
},_generatePosition:function(_b8){
var o=this.options,_b9=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_ba=(/(html|body)/i).test(_b9[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){
this.offset.relative=this._getRelativeOffset();
}
var _bb=_b8.pageX;
var _bc=_b8.pageY;
if(this.originalPosition){
if(this.containment){
if(_b8.pageX-this.offset.click.left<this.containment[0]){
_bb=this.containment[0]+this.offset.click.left;
}
if(_b8.pageY-this.offset.click.top<this.containment[1]){
_bc=this.containment[1]+this.offset.click.top;
}
if(_b8.pageX-this.offset.click.left>this.containment[2]){
_bb=this.containment[2]+this.offset.click.left;
}
if(_b8.pageY-this.offset.click.top>this.containment[3]){
_bc=this.containment[3]+this.offset.click.top;
}
}
if(o.grid){
var top=this.originalPageY+Math.round((_bc-this.originalPageY)/o.grid[1])*o.grid[1];
_bc=this.containment?(!(top-this.offset.click.top<this.containment[1]||top-this.offset.click.top>this.containment[3])?top:(!(top-this.offset.click.top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;
var _bd=this.originalPageX+Math.round((_bb-this.originalPageX)/o.grid[0])*o.grid[0];
_bb=this.containment?(!(_bd-this.offset.click.left<this.containment[0]||_bd-this.offset.click.left>this.containment[2])?_bd:(!(_bd-this.offset.click.left<this.containment[0])?_bd-o.grid[0]:_bd+o.grid[0])):_bd;
}
}
return {top:(_bc-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_ba?0:_b9.scrollTop())))),left:(_bb-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_ba?0:_b9.scrollLeft())))};
},_rearrange:function(_be,i,a,_bf){
a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?i.item[0]:i.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var _c0=this,_c1=this.counter;
window.setTimeout(function(){
if(_c1==_c0.counter){
_c0.refreshPositions(!_bf);
}
},0);
},_clear:function(_c2,_c3){
this.reverting=false;
var _c4=[],_c5=this;
if(!this._noFinalSort&&this.currentItem[0].parentNode){
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
if(this.fromOutside&&!_c3){
_c4.push(function(_c6){
this._trigger("receive",_c6,this._uiHash(this.fromOutside));
});
}
if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!_c3){
_c4.push(function(_c7){
this._trigger("update",_c7,this._uiHash());
});
}
if(!$.ui.contains(this.element[0],this.currentItem[0])){
if(!_c3){
_c4.push(function(_c8){
this._trigger("remove",_c8,this._uiHash());
});
}
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.containers[i].element[0],this.currentItem[0])&&!_c3){
_c4.push((function(c){
return function(_c9){
c._trigger("receive",_c9,this._uiHash(this));
};
}).call(this,this.containers[i]));
_c4.push((function(c){
return function(_ca){
c._trigger("update",_ca,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
}
}
for(var i=this.containers.length-1;i>=0;i--){
if(!_c3){
_c4.push((function(c){
return function(_cb){
c._trigger("deactivate",_cb,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
if(this.containers[i].containerCache.over){
_c4.push((function(c){
return function(_cc){
c._trigger("out",_cc,this._uiHash(this));
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
if(!_c3){
this._trigger("beforeStop",_c2,this._uiHash());
for(var i=0;i<_c4.length;i++){
_c4[i].call(this,_c2);
}
this._trigger("stop",_c2,this._uiHash());
}
return false;
}
if(!_c3){
this._trigger("beforeStop",_c2,this._uiHash());
}
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){
this.helper.remove();
}
this.helper=null;
if(!_c3){
for(var i=0;i<_c4.length;i++){
_c4[i].call(this,_c2);
}
this._trigger("stop",_c2,this._uiHash());
}
this.fromOutside=false;
return true;
},_trigger:function(){
if($.Widget.prototype._trigger.apply(this,arguments)===false){
this.cancel();
}
},_uiHash:function(_cd){
var _ce=_cd||this;
return {helper:_ce.helper,placeholder:_ce.placeholder||$([]),position:_ce.position,originalPosition:_ce.originalPosition,offset:_ce.positionAbs,item:_ce.currentItem,sender:_cd?_cd.element:null};
}});
$.extend($.ui.sortable,{version:"1.8.13"});
})(jQuery);
jQuery.effects||(function($,_cf){
$.effects={};
$.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(i,_d0){
$.fx.step[_d0]=function(fx){
if(!fx.colorInit){
fx.start=_d1(fx.elem,_d0);
fx.end=_d2(fx.end);
fx.colorInit=true;
}
fx.elem.style[_d0]="rgb("+Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2],10),255),0)+")";
};
});
function _d2(_d3){
var _d4;
if(_d3&&_d3.constructor==Array&&_d3.length==3){
return _d3;
}
if(_d4=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(_d3)){
return [parseInt(_d4[1],10),parseInt(_d4[2],10),parseInt(_d4[3],10)];
}
if(_d4=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(_d3)){
return [parseFloat(_d4[1])*2.55,parseFloat(_d4[2])*2.55,parseFloat(_d4[3])*2.55];
}
if(_d4=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(_d3)){
return [parseInt(_d4[1],16),parseInt(_d4[2],16),parseInt(_d4[3],16)];
}
if(_d4=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(_d3)){
return [parseInt(_d4[1]+_d4[1],16),parseInt(_d4[2]+_d4[2],16),parseInt(_d4[3]+_d4[3],16)];
}
if(_d4=/rgba\(0, 0, 0, 0\)/.exec(_d3)){
return _d5["transparent"];
}
return _d5[$.trim(_d3).toLowerCase()];
};
function _d1(_d6,_d7){
var _d8;
do{
_d8=$.curCSS(_d6,_d7);
if(_d8!=""&&_d8!="transparent"||$.nodeName(_d6,"body")){
break;
}
_d7="backgroundColor";
}while(_d6=_d6.parentNode);
return _d2(_d8);
};
var _d5={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var _d9=["add","remove","toggle"],_da={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function _db(){
var _dc=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,_dd={},key,_de;
if(_dc&&_dc.length&&_dc[0]&&_dc[_dc[0]]){
var len=_dc.length;
while(len--){
key=_dc[len];
if(typeof _dc[key]=="string"){
_de=key.replace(/\-(\w)/g,function(all,_df){
return _df.toUpperCase();
});
_dd[_de]=_dc[key];
}
}
}else{
for(key in _dc){
if(typeof _dc[key]==="string"){
_dd[key]=_dc[key];
}
}
}
return _dd;
};
function _e0(_e1){
var _e2,_e3;
for(_e2 in _e1){
_e3=_e1[_e2];
if(_e3==null||$.isFunction(_e3)||_e2 in _da||(/scrollbar/).test(_e2)||(!(/color/i).test(_e2)&&isNaN(parseFloat(_e3)))){
delete _e1[_e2];
}
}
return _e1;
};
function _e4(_e5,_e6){
var _e7={_:0},_e8;
for(_e8 in _e6){
if(_e5[_e8]!=_e6[_e8]){
_e7[_e8]=_e6[_e8];
}
}
return _e7;
};
$.effects.animateClass=function(_e9,_ea,_eb,_ec){
if($.isFunction(_eb)){
_ec=_eb;
_eb=null;
}
return this.queue(function(){
var _ed=$(this),_ee=_ed.attr("style")||" ",_ef=_e0(_db.call(this)),_f0,_f1=_ed.attr("class");
$.each(_d9,function(i,_f2){
if(_e9[_f2]){
_ed[_f2+"Class"](_e9[_f2]);
}
});
_f0=_e0(_db.call(this));
_ed.attr("class",_f1);
_ed.animate(_e4(_ef,_f0),{queue:false,duration:_ea,easding:_eb,complete:function(){
$.each(_d9,function(i,_f3){
if(_e9[_f3]){
_ed[_f3+"Class"](_e9[_f3]);
}
});
if(typeof _ed.attr("style")=="object"){
_ed.attr("style").cssText="";
_ed.attr("style").cssText=_ee;
}else{
_ed.attr("style",_ee);
}
if(_ec){
_ec.apply(this,arguments);
}
$.dequeue(this);
}});
});
};
$.fn.extend({_addClass:$.fn.addClass,addClass:function(_f4,_f5,_f6,_f7){
return _f5?$.effects.animateClass.apply(this,[{add:_f4},_f5,_f6,_f7]):this._addClass(_f4);
},_removeClass:$.fn.removeClass,removeClass:function(_f8,_f9,_fa,_fb){
return _f9?$.effects.animateClass.apply(this,[{remove:_f8},_f9,_fa,_fb]):this._removeClass(_f8);
},_toggleClass:$.fn.toggleClass,toggleClass:function(_fc,_fd,_fe,_ff,_100){
if(typeof _fd=="boolean"||_fd===_cf){
if(!_fe){
return this._toggleClass(_fc,_fd);
}else{
return $.effects.animateClass.apply(this,[(_fd?{add:_fc}:{remove:_fc}),_fe,_ff,_100]);
}
}else{
return $.effects.animateClass.apply(this,[{toggle:_fc},_fd,_fe,_ff]);
}
},switchClass:function(_101,add,_102,_103,_104){
return $.effects.animateClass.apply(this,[{add:add,remove:_101},_102,_103,_104]);
}});
$.extend($.effects,{version:"1.8.13",save:function(_105,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_105.data("ec.storage."+set[i],_105[0].style[set[i]]);
}
}
},restore:function(_106,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_106.css(set[i],_106.data("ec.storage."+set[i]));
}
}
},setMode:function(el,mode){
if(mode=="toggle"){
mode=el.is(":hidden")?"show":"hide";
}
return mode;
},getBaseline:function(_107,_108){
var y,x;
switch(_107[0]){
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
y=_107[0]/_108.height;
}
switch(_107[1]){
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
x=_107[1]/_108.width;
}
return {x:x,y:y};
},createWrapper:function(_109){
if(_109.parent().is(".ui-effects-wrapper")){
return _109.parent();
}
var _10a={width:_109.outerWidth(true),height:_109.outerHeight(true),"float":_109.css("float")},_10b=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
_109.wrap(_10b);
_10b=_109.parent();
if(_109.css("position")=="static"){
_10b.css({position:"relative"});
_109.css({position:"relative"});
}else{
$.extend(_10a,{position:_109.css("position"),zIndex:_109.css("z-index")});
$.each(["top","left","bottom","right"],function(i,pos){
_10a[pos]=_109.css(pos);
if(isNaN(parseInt(_10a[pos],10))){
_10a[pos]="auto";
}
});
_109.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});
}
return _10b.css(_10a).show();
},removeWrapper:function(_10c){
if(_10c.parent().is(".ui-effects-wrapper")){
return _10c.parent().replaceWith(_10c);
}
return _10c;
},setTransition:function(_10d,list,_10e,_10f){
_10f=_10f||{};
$.each(list,function(i,x){
unit=_10d.cssUnit(x);
if(unit[0]>0){
_10f[x]=unit[0]*_10e+unit[1];
}
});
return _10f;
}});
function _110(_111,_112,_113,_114){
if(typeof _111=="object"){
_114=_112;
_113=null;
_112=_111;
_111=_112.effect;
}
if($.isFunction(_112)){
_114=_112;
_113=null;
_112={};
}
if(typeof _112=="number"||$.fx.speeds[_112]){
_114=_113;
_113=_112;
_112={};
}
if($.isFunction(_113)){
_114=_113;
_113=null;
}
_112=_112||{};
_113=_113||_112.duration;
_113=$.fx.off?0:typeof _113=="number"?_113:_113 in $.fx.speeds?$.fx.speeds[_113]:$.fx.speeds._default;
_114=_114||_112.complete;
return [_111,_112,_113,_114];
};
function _115(_116){
if(!_116||typeof _116==="number"||$.fx.speeds[_116]){
return true;
}
if(typeof _116==="string"&&!$.effects[_116]){
return true;
}
return false;
};
$.fn.extend({effect:function(_117,_118,_119,_11a){
var args=_110.apply(this,arguments),_11b={options:args[1],duration:args[2],callback:args[3]},mode=_11b.options.mode,_11c=$.effects[_117];
if($.fx.off||!_11c){
if(mode){
return this[mode](_11b.duration,_11b.callback);
}else{
return this.each(function(){
if(_11b.callback){
_11b.callback.call(this);
}
});
}
}
return _11c.call(this,_11b);
},_show:$.fn.show,show:function(_11d){
if(_115(_11d)){
return this._show.apply(this,arguments);
}else{
var args=_110.apply(this,arguments);
args[1].mode="show";
return this.effect.apply(this,args);
}
},_hide:$.fn.hide,hide:function(_11e){
if(_115(_11e)){
return this._hide.apply(this,arguments);
}else{
var args=_110.apply(this,arguments);
args[1].mode="hide";
return this.effect.apply(this,args);
}
},__toggle:$.fn.toggle,toggle:function(_11f){
if(_115(_11f)||typeof _11f==="boolean"||$.isFunction(_11f)){
return this.__toggle.apply(this,arguments);
}else{
var args=_110.apply(this,arguments);
args[1].mode="toggle";
return this.effect.apply(this,args);
}
},cssUnit:function(key){
var _120=this.css(key),val=[];
$.each(["em","px","%","pt"],function(i,unit){
if(_120.indexOf(unit)>0){
val=[parseFloat(_120),unit];
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
if(s==_cf){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},easeOutBack:function(x,t,b,c,d,s){
if(s==_cf){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},easeInOutBack:function(x,t,b,c,d,s){
if(s==_cf){
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
(function($,_121){
$.effects.blind=function(o){
return this.queue(function(){
var el=$(this),_122=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _123=o.options.direction||"vertical";
$.effects.save(el,_122);
el.show();
var _124=$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_123=="vertical")?"height":"width";
var _125=(_123=="vertical")?_124.height():_124.width();
if(mode=="show"){
_124.css(ref,0);
}
var _126={};
_126[ref]=mode=="show"?_125:0;
_124.animate(_126,o.duration,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_122);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_127){
$.effects.bounce=function(o){
return this.queue(function(){
var el=$(this),_128=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _129=o.options.direction||"up";
var _12a=o.options.distance||20;
var _12b=o.options.times||5;
var _12c=o.duration||250;
if(/show|hide/.test(mode)){
_128.push("opacity");
}
$.effects.save(el,_128);
el.show();
$.effects.createWrapper(el);
var ref=(_129=="up"||_129=="down")?"top":"left";
var _12d=(_129=="up"||_129=="left")?"pos":"neg";
var _12a=o.options.distance||(ref=="top"?el.outerHeight({margin:true})/3:el.outerWidth({margin:true})/3);
if(mode=="show"){
el.css("opacity",0).css(ref,_12d=="pos"?-_12a:_12a);
}
if(mode=="hide"){
_12a=_12a/(_12b*2);
}
if(mode!="hide"){
_12b--;
}
if(mode=="show"){
var _12e={opacity:1};
_12e[ref]=(_12d=="pos"?"+=":"-=")+_12a;
el.animate(_12e,_12c/2,o.options.easing);
_12a=_12a/2;
_12b--;
}
for(var i=0;i<_12b;i++){
var _12f={},_130={};
_12f[ref]=(_12d=="pos"?"-=":"+=")+_12a;
_130[ref]=(_12d=="pos"?"+=":"-=")+_12a;
el.animate(_12f,_12c/2,o.options.easing).animate(_130,_12c/2,o.options.easing);
_12a=(mode=="hide")?_12a*2:_12a/2;
}
if(mode=="hide"){
var _12e={opacity:0};
_12e[ref]=(_12d=="pos"?"-=":"+=")+_12a;
el.animate(_12e,_12c/2,o.options.easing,function(){
el.hide();
$.effects.restore(el,_128);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}else{
var _12f={},_130={};
_12f[ref]=(_12d=="pos"?"-=":"+=")+_12a;
_130[ref]=(_12d=="pos"?"+=":"-=")+_12a;
el.animate(_12f,_12c/2,o.options.easing).animate(_130,_12c/2,o.options.easing,function(){
$.effects.restore(el,_128);
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
(function($,_131){
$.effects.clip=function(o){
return this.queue(function(){
var el=$(this),_132=["position","top","bottom","left","right","height","width"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _133=o.options.direction||"vertical";
$.effects.save(el,_132);
el.show();
var _134=$.effects.createWrapper(el).css({overflow:"hidden"});
var _135=el[0].tagName=="IMG"?_134:el;
var ref={size:(_133=="vertical")?"height":"width",position:(_133=="vertical")?"top":"left"};
var _136=(_133=="vertical")?_135.height():_135.width();
if(mode=="show"){
_135.css(ref.size,0);
_135.css(ref.position,_136/2);
}
var _137={};
_137[ref.size]=mode=="show"?_136:0;
_137[ref.position]=mode=="show"?0:_136/2;
_135.animate(_137,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_132);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_138){
$.effects.drop=function(o){
return this.queue(function(){
var el=$(this),_139=["position","top","bottom","left","right","opacity"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _13a=o.options.direction||"left";
$.effects.save(el,_139);
el.show();
$.effects.createWrapper(el);
var ref=(_13a=="up"||_13a=="down")?"top":"left";
var _13b=(_13a=="up"||_13a=="left")?"pos":"neg";
var _13c=o.options.distance||(ref=="top"?el.outerHeight({margin:true})/2:el.outerWidth({margin:true})/2);
if(mode=="show"){
el.css("opacity",0).css(ref,_13b=="pos"?-_13c:_13c);
}
var _13d={opacity:mode=="show"?1:0};
_13d[ref]=(mode=="show"?(_13b=="pos"?"+=":"-="):(_13b=="pos"?"-=":"+="))+_13c;
el.animate(_13d,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_139);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_13e){
$.effects.explode=function(o){
return this.queue(function(){
var rows=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
var _13f=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
o.options.mode=o.options.mode=="toggle"?($(this).is(":visible")?"hide":"show"):o.options.mode;
var el=$(this).show().css("visibility","hidden");
var _140=el.offset();
_140.top-=parseInt(el.css("marginTop"),10)||0;
_140.left-=parseInt(el.css("marginLeft"),10)||0;
var _141=el.outerWidth(true);
var _142=el.outerHeight(true);
for(var i=0;i<rows;i++){
for(var j=0;j<_13f;j++){
el.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(_141/_13f),top:-i*(_142/rows)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_141/_13f,height:_142/rows,left:_140.left+j*(_141/_13f)+(o.options.mode=="show"?(j-Math.floor(_13f/2))*(_141/_13f):0),top:_140.top+i*(_142/rows)+(o.options.mode=="show"?(i-Math.floor(rows/2))*(_142/rows):0),opacity:o.options.mode=="show"?0:1}).animate({left:_140.left+j*(_141/_13f)+(o.options.mode=="show"?0:(j-Math.floor(_13f/2))*(_141/_13f)),top:_140.top+i*(_142/rows)+(o.options.mode=="show"?0:(i-Math.floor(rows/2))*(_142/rows)),opacity:o.options.mode=="show"?1:0},o.duration||500);
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
(function($,_143){
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
(function($,_144){
$.effects.fold=function(o){
return this.queue(function(){
var el=$(this),_145=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var size=o.options.size||15;
var _146=!(!o.options.horizFirst);
var _147=o.duration?o.duration/2:$.fx.speeds._default/2;
$.effects.save(el,_145);
el.show();
var _148=$.effects.createWrapper(el).css({overflow:"hidden"});
var _149=((mode=="show")!=_146);
var ref=_149?["width","height"]:["height","width"];
var _14a=_149?[_148.width(),_148.height()]:[_148.height(),_148.width()];
var _14b=/([0-9]+)%/.exec(size);
if(_14b){
size=parseInt(_14b[1],10)/100*_14a[mode=="hide"?0:1];
}
if(mode=="show"){
_148.css(_146?{height:0,width:size}:{height:size,width:0});
}
var _14c={},_14d={};
_14c[ref[0]]=mode=="show"?_14a[0]:size;
_14d[ref[1]]=mode=="show"?_14a[1]:0;
_148.animate(_14c,_147,o.options.easing).animate(_14d,_147,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_145);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_14e){
$.effects.highlight=function(o){
return this.queue(function(){
var elem=$(this),_14f=["backgroundImage","backgroundColor","opacity"],mode=$.effects.setMode(elem,o.options.mode||"show"),_150={backgroundColor:elem.css("backgroundColor")};
if(mode=="hide"){
_150.opacity=0;
}
$.effects.save(elem,_14f);
elem.show().css({backgroundImage:"none",backgroundColor:o.options.color||"#ffff99"}).animate(_150,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(mode=="hide"&&elem.hide());
$.effects.restore(elem,_14f);
(mode=="show"&&!$.support.opacity&&this.style.removeAttribute("filter"));
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_151){
$.effects.pulsate=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"show");
times=((o.options.times||5)*2)-1;
duration=o.duration?o.duration/2:$.fx.speeds._default/2,isVisible=elem.is(":visible"),animateTo=0;
if(!isVisible){
elem.css("opacity",0).show();
animateTo=1;
}
if((mode=="hide"&&isVisible)||(mode=="show"&&!isVisible)){
times--;
}
for(var i=0;i<times;i++){
elem.animate({opacity:animateTo},duration,o.options.easing);
animateTo=(animateTo+1)%2;
}
elem.animate({opacity:animateTo},duration,o.options.easing,function(){
if(animateTo==0){
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
(function($,_152){
$.effects.puff=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide"),_153=parseInt(o.options.percent,10)||150,_154=_153/100,_155={height:elem.height(),width:elem.width()};
$.extend(o.options,{fade:true,mode:mode,percent:mode=="hide"?_153:100,from:mode=="hide"?_155:{height:_155.height*_154,width:_155.width*_154}});
elem.effect("scale",o.options,o.duration,o.callback);
elem.dequeue();
});
};
$.effects.scale=function(o){
return this.queue(function(){
var el=$(this);
var _156=$.extend(true,{},o.options);
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _157=parseInt(o.options.percent,10)||(parseInt(o.options.percent,10)==0?0:(mode=="hide"?0:100));
var _158=o.options.direction||"both";
var _159=o.options.origin;
if(mode!="effect"){
_156.origin=_159||["middle","center"];
_156.restore=true;
}
var _15a={height:el.height(),width:el.width()};
el.from=o.options.from||(mode=="show"?{height:0,width:0}:_15a);
var _15b={y:_158!="horizontal"?(_157/100):1,x:_158!="vertical"?(_157/100):1};
el.to={height:_15a.height*_15b.y,width:_15a.width*_15b.x};
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
_156.from=el.from;
_156.to=el.to;
_156.mode=mode;
el.effect("size",_156,o.duration,o.callback);
el.dequeue();
});
};
$.effects.size=function(o){
return this.queue(function(){
var el=$(this),_15c=["position","top","bottom","left","right","width","height","overflow","opacity"];
var _15d=["position","top","bottom","left","right","overflow","opacity"];
var _15e=["width","height","overflow"];
var _15f=["fontSize"];
var _160=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var _161=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _162=o.options.restore||false;
var _163=o.options.scale||"both";
var _164=o.options.origin;
var _165={height:el.height(),width:el.width()};
el.from=o.options.from||_165;
el.to=o.options.to||_165;
if(_164){
var _166=$.effects.getBaseline(_164,_165);
el.from.top=(_165.height-el.from.height)*_166.y;
el.from.left=(_165.width-el.from.width)*_166.x;
el.to.top=(_165.height-el.to.height)*_166.y;
el.to.left=(_165.width-el.to.width)*_166.x;
}
var _167={from:{y:el.from.height/_165.height,x:el.from.width/_165.width},to:{y:el.to.height/_165.height,x:el.to.width/_165.width}};
if(_163=="box"||_163=="both"){
if(_167.from.y!=_167.to.y){
_15c=_15c.concat(_160);
el.from=$.effects.setTransition(el,_160,_167.from.y,el.from);
el.to=$.effects.setTransition(el,_160,_167.to.y,el.to);
}
if(_167.from.x!=_167.to.x){
_15c=_15c.concat(_161);
el.from=$.effects.setTransition(el,_161,_167.from.x,el.from);
el.to=$.effects.setTransition(el,_161,_167.to.x,el.to);
}
}
if(_163=="content"||_163=="both"){
if(_167.from.y!=_167.to.y){
_15c=_15c.concat(_15f);
el.from=$.effects.setTransition(el,_15f,_167.from.y,el.from);
el.to=$.effects.setTransition(el,_15f,_167.to.y,el.to);
}
}
$.effects.save(el,_162?_15c:_15d);
el.show();
$.effects.createWrapper(el);
el.css("overflow","hidden").css(el.from);
if(_163=="content"||_163=="both"){
_160=_160.concat(["marginTop","marginBottom"]).concat(_15f);
_161=_161.concat(["marginLeft","marginRight"]);
_15e=_15c.concat(_160).concat(_161);
el.find("*[width]").each(function(){
child=$(this);
if(_162){
$.effects.save(child,_15e);
}
var _168={height:child.height(),width:child.width()};
child.from={height:_168.height*_167.from.y,width:_168.width*_167.from.x};
child.to={height:_168.height*_167.to.y,width:_168.width*_167.to.x};
if(_167.from.y!=_167.to.y){
child.from=$.effects.setTransition(child,_160,_167.from.y,child.from);
child.to=$.effects.setTransition(child,_160,_167.to.y,child.to);
}
if(_167.from.x!=_167.to.x){
child.from=$.effects.setTransition(child,_161,_167.from.x,child.from);
child.to=$.effects.setTransition(child,_161,_167.to.x,child.to);
}
child.css(child.from);
child.animate(child.to,o.duration,o.options.easing,function(){
if(_162){
$.effects.restore(child,_15e);
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
$.effects.restore(el,_162?_15c:_15d);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_169){
$.effects.shake=function(o){
return this.queue(function(){
var el=$(this),_16a=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _16b=o.options.direction||"left";
var _16c=o.options.distance||20;
var _16d=o.options.times||3;
var _16e=o.duration||o.options.duration||140;
$.effects.save(el,_16a);
el.show();
$.effects.createWrapper(el);
var ref=(_16b=="up"||_16b=="down")?"top":"left";
var _16f=(_16b=="up"||_16b=="left")?"pos":"neg";
var _170={},_171={},_172={};
_170[ref]=(_16f=="pos"?"-=":"+=")+_16c;
_171[ref]=(_16f=="pos"?"+=":"-=")+_16c*2;
_172[ref]=(_16f=="pos"?"-=":"+=")+_16c*2;
el.animate(_170,_16e,o.options.easing);
for(var i=1;i<_16d;i++){
el.animate(_171,_16e,o.options.easing).animate(_172,_16e,o.options.easing);
}
el.animate(_171,_16e,o.options.easing).animate(_170,_16e/2,o.options.easing,function(){
$.effects.restore(el,_16a);
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
(function($,_173){
$.effects.slide=function(o){
return this.queue(function(){
var el=$(this),_174=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"show");
var _175=o.options.direction||"left";
$.effects.save(el,_174);
el.show();
$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_175=="up"||_175=="down")?"top":"left";
var _176=(_175=="up"||_175=="left")?"pos":"neg";
var _177=o.options.distance||(ref=="top"?el.outerHeight({margin:true}):el.outerWidth({margin:true}));
if(mode=="show"){
el.css(ref,_176=="pos"?(isNaN(_177)?"-"+_177:-_177):_177);
}
var _178={};
_178[ref]=(mode=="show"?(_176=="pos"?"+=":"-="):(_176=="pos"?"-=":"+="))+_177;
el.animate(_178,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_174);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_179){
$.effects.transfer=function(o){
return this.queue(function(){
var elem=$(this),_17a=$(o.options.to),_17b=_17a.offset(),_17c={top:_17b.top,left:_17b.left,height:_17a.innerHeight(),width:_17a.innerWidth()},_17d=elem.offset(),_17e=$("<div class=\"ui-effects-transfer\"></div>").appendTo(document.body).addClass(o.options.className).css({top:_17d.top,left:_17d.left,height:elem.innerHeight(),width:elem.innerWidth(),position:"absolute"}).animate(_17c,o.duration,o.options.easing,function(){
_17e.remove();
(o.callback&&o.callback.apply(elem[0],arguments));
elem.dequeue();
});
});
};
})(jQuery);
function tip_init(){
jQuery("a.hptip").each(function(){
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
var _17f=jQuery(this).data("linkId");
if(_17f){
jQuery("#"+_17f).data("sticky",1);
}
}).live("mouseout",function(_180){
var hpts=jQuery(_180.relatedTarget).closest("#HPT");
if(hpts.size()==0){
var _181=jQuery(this).data("linkId");
if(_181){
jQuery("#"+_181).data("sticky",0);
}
setTimeout(function(){
tip_remove(_181);
},800);
}
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
});
};
function tip_remove(_182){
var _183=jQuery("#HPT").data("linkId");
if(_182!=_183){
return;
}
var _184=jQuery("#"+_182).data("sticky");
if(!_184){
jQuery("#HPT").remove();
}
};
function tip_show(url,_185,_186,_187){
if(jQuery("#HPT").size()){
jQuery("#HPT").remove();
}
if(_186==false&&_187){
_186="&nbsp;";
}
var de=document.documentElement;
var w=self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
var _188=getElementWidth(_185);
var _189=w-getAbsoluteLeft(_185)-_188;
var _18a=getAbsoluteLeft(_185);
var _18b=getAbsoluteTop(_185)-3;
var _18c=url.replace(/^[^\?]+\??/,"");
var _18d=parseQuery(_18c);
if(_18d["width"]===undefined){
_18d["width"]=250;
}
if(_18d["link"]!==undefined){
jQuery("#"+_185).bind("click",function(){
window.location=_18d["link"];
});
jQuery("#"+_185).css("cursor","pointer");
}
var _18e=_187?" <a href='#' class='close' onclick='jQuery(\"#HPT\").remove(); return false;'>x</a>":"";
var _18f=_18d["css"]?" class='"+_18d["css"]+"'":"";
var _190;
var _191=false;
if(_18d["dir"]!==undefined){
_190=_18d["dir"];
}else{
if(_189>(_18d["width"]*1+11)){
_190="right";
}else{
if(_189+_188*0.3>(_18d["width"]*1+11)){
_190="right";
_191=true;
}else{
if(_18a>(_18d["width"]*1+11)){
_190="left";
}else{
_190="right";
_191=true;
}
}
}
}
var _192=_190=="left"?"right":"left";
var _193=_186?"<div id='HPT_close_"+_192+"'>"+_186+_18e+"</div>":"";
var _194=_190=="left"?"style='left:"+((_18d["width"]*1)+1)+"px"+"'":"";
jQuery("#container").append("<div id='HPT' style='width:"+_18d["width"]*1+"px'"+_18f+"><div id='HPT_arrow_"+_192+"' "+_194+"></div>"+_193+"<div id='HPT_copy'><div class='HPT_loader'><div></div></div>");
if(_190=="right"){
var _194=_188+11;
if(_191){
var _195=getAbsoluteLeft(_185)+_194-_188*0.3;
}else{
var _195=getAbsoluteLeft(_185)+_194;
}
}else{
var _195=getAbsoluteLeft(_185)-((_18d["width"]*1)+15);
}
var _196=jQuery("#container").offset();
_195-=_196.left;
_18b-=_196.top;
jQuery("#HPT").css({left:_195+"px",top:_18b+"px"});
jQuery("#HPT").data("linkId",_185);
jQuery("#HPT").show();
jQuery("#HPT_copy").load(url);
};
function getElementWidth(_197){
x=document.getElementById(_197);
return x.offsetWidth;
};
function getAbsoluteLeft(_198){
o=document.getElementById(_198);
oLeft=o.offsetLeft;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oLeft+=oParent.offsetLeft;
o=oParent;
}
return oLeft;
};
function getAbsoluteTop(_199){
o=document.getElementById(_199);
oTop=o.offsetTop;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oTop+=oParent.offsetTop;
o=oParent;
}
return oTop;
};
function parseQuery(_19a){
var _19b=new Object();
if(!_19a){
return _19b;
}
var _19c=_19a.split(/[;&]/);
for(var i=0;i<_19c.length;i++){
var _19d=_19c[i].split("=");
if(!_19d||_19d.length!=2){
continue;
}
var key=unescape(_19d[0]);
var val=unescape(_19d[1]);
val=val.replace(/\+/g," ");
_19b[key]=val;
}
return _19b;
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
Form.Element.setValue=function(_19e,_19f){
element_id=_19e;
_19e=$(_19e);
if(!_19e){
_19e=document.getElementsByName(element_id)[0];
}
if(!_19e){
return false;
}
var _1a0=_19e.tagName.toLowerCase();
var _1a1=Form.Element.SetSerializers[_1a0](_19e,_19f);
};
Form.Element.SetSerializers={input:function(_1a2,_1a3){
switch(_1a2.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.SetSerializers.textarea(_1a2,_1a3);
case "checkbox":
return Form.Element.SetSerializers.checkbox(_1a2,_1a3);
case "radio":
return Form.Element.SetSerializers.inputSelector(_1a2,_1a3);
}
return false;
},checkbox:function(_1a4,_1a5){
if(_1a5==0||_1a5==null||_1a5==""){
_1a4.checked=false;
}else{
_1a4.checked=true;
}
},inputSelector:function(_1a6,_1a7){
fields=document.getElementsByName(_1a6.name);
for(var i=0;i<fields.length;i++){
if(fields[i].value==_1a7){
fields[i].checked=true;
}
}
},textarea:function(_1a8,_1a9){
_1a8.value=_1a9;
},select:function(_1aa,_1ab){
var _1ac="",opt,_1ad=_1aa.selectedIndex;
for(var i=0;i<_1aa.options.length;i++){
if(_1aa.options[i].value==_1ab){
_1aa.selectedIndex=i;
return true;
}
}
}};
var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_1ae){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_1ae||{});
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
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1af){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_1af);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _1b0=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_1b0);
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
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1b1){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_1b1);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_1b2){
if(_1b2==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_1b2*100+")";
}
this.el.style.opacity=_1b2;
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
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_1b3){
this.setOptions(_1b3);
},scrollTo:function(el){
var dest=Position.cumulativeOffset($(el))[1]-20;
var _1b4=window.innerHeight||document.documentElement.clientHeight;
var full=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(dest+_1b4>full){
this.custom(top,dest-_1b4+(full-dest));
}else{
this.custom(top,dest);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1b5){
this.el=$(el);
this.setOptions(_1b5);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_1b6){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_1b6||{});
},initialize:function(el,_1b7){
this.el=$(el);
this.setOptions(_1b7);
if(this.options.opacity){
this.o=new fx.Opacity(el,_1b7);
_1b7.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_1b7);
_1b7.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_1b7);
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
fx.Accordion.prototype={setOptions:function(_1b8){
this.options={delay:100,opacity:false};
Object.extend(this.options,_1b8||{});
},initialize:function(_1b9,_1ba,_1bb){
this.elements=_1ba;
this.setOptions(_1bb);
var _1bb=_1bb||"";
_1ba.each(function(el,i){
_1bb.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_1bb);
el.fx.hide();
});
_1b9.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_1ba[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_1bc){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_1bc){
this.clearAndToggle(el);
}
}.bind(this));
if(_1bc.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_1bc);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_1bd){
this.el=$(el);
this.days=365;
this.options=_1bd;
this.effect();
var _1be=this.readCookie();
if(_1be){
this.fx.now=_1be;
this.fx.increase();
}
},setCookie:function(_1bf){
var date=new Date();
date.setTime(date.getTime()+(this.days*24*60*60*1000));
var _1c0="; expires="+date.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_1bf+_1c0+"; path=/";
},readCookie:function(){
var _1c1=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_1c1)==0){
return c.substring(_1c1.length,c.length);
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
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1c2){
this.el=$(el);
this.setOptions(_1c2);
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
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1c3){
this.el=$(el);
this.setOptions(_1c3);
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
var _1c4=navigator.userAgent.toLowerCase();
var _1c5=_1c4.indexOf("msie")+1;
if(_1c5){
version=_1c4.charAt(_1c5+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_1c4.indexOf("mobile")>-1;
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
toggleOverlay.setElementVisibility=function(_1c6){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_1c6;
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
var _1c7=$(id);
if(_1c7){
return _1c7;
}
_1c7=document.createElement("div");
_1c7.id=id;
this.wrapper.appendChild(_1c7);
return _1c7;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _1c8=$(id);
if(_1c8){
return _1c8;
}
_1c8=document.createElement("iframe");
_1c8.id=id;
_1c8.src="";
_1c8.frameBorder="no";
_1c8.scrolling="no";
document.body.appendChild(_1c8);
return _1c8;
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
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_1c9){
this.restore=_1c9;
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
var _1ca=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var curr=out.length;
if(!_1ca){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(curr,out.length-curr);
}else{
_1ca=false;
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
var insideHubEditor=false;
function checkIt(_1cb){
place=detect.indexOf(_1cb)+1;
thestring=_1cb;
return place;
};
function ssToId(id,_1cc){
var _1cc=_1cc||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_1cc);
return false;
};
function ssOnload(){
var _1cd=location.hash.slice(1);
if(_1cd=="comments"){
ssToId("comFirst");
}else{
if(_1cd.substr(0,8)=="comment-"){
ssToId("comment"+_1cd.substr(8));
}else{
if(_1cd!=null&&_1cd){
ssToId(_1cd);
}
}
}
};
function insertVideo(type,key,css,_1ce,_1cf,_1d0){
var _1d1="<div class=\"video\">";
var mode="opaque";
if(_1cf){
mode="transparent";
}
if(_1d0=="bad"){
_1d1="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_1d1+="<embed style=\""+_1ce+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
_1d1+="<embed style=\""+_1ce+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_1d1+="<embed style=\""+_1ce+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_1d1+="<embed style=\""+_1ce+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
_1d1+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+mode+"\"></embed></object>";
}else{
if(type=="YahooSports"){
_1d1+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_1d1+="<embed style=\""+_1ce+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_1d1+="<embed style=\""+_1ce+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_1d1+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_1d1+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_1d1+="</div>";
if(_1cf){
jq("#"+_1cf).html(_1d1);
}else{
if(type!="New"){
document.write(_1d1);
}
}
};
function safeScriptEval(_1d2){
var _1d3=_1d2.innerHTML.strip();
if(_1d3.substring(0,4)=="<!--"){
_1d3=_1d3.substring(4,_1d3.length-3);
}
try{
eval(_1d3);
}
catch(e){
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_1d4){
if(_1d4===undefined){
_1d4=false;
}
if(_1d4){
var _1d5=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_1d5){
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
function praiseHub(id,val,_1d6){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,newdesign:(_1d6?1:0)},function(){
jq("#praise_feedback").html("Saved. Thanks!");
});
return false;
};
function recArt(id,val){
jq("#rec_"+id).load("/xml/feedback.php",{a:id,v:val});
return false;
};
function selectTab(_1d7,_1d8,_1d9,_1da){
var _1db;
var _1dc,_1dd;
for(var i=0;i<_1d9;i++){
_1dc=jq("#tab_"+_1d7+"_"+i);
_1dd=jq("#tabcontent_"+_1d7+"_"+i);
if(!_1dc.size()||!_1dd.size()){
alert("Cannot locate element: baseid="+_1d7+" index="+_1d8+" tabcount="+_1d9);
}
if(_1dc.hasClass("selected")){
_1db=i;
}
if(i==_1d8){
_1dc.addClass("selected");
_1dd.addClass("selected");
}else{
_1dc.removeClass("selected");
_1dd.removeClass("selected");
}
}
var _1de={};
if(_1da&&_1de.toString.call(_1da)=="[object Function]"){
_1da(_1db,_1d8);
}
return false;
};
function categoryFanBulkJoin(id,_1df,_1e0,_1e1,_1e2,_1e3){
var _1e4=jq(".jc");
var cids=Array();
var _1e5=Array();
var i=0;
var k=0;
jq(".jc").each(function(_1e6,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_1e1){
_1e5[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_1e5.join(",");
if(_1e1){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_1e2){
_1e2(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_1e3)!="undefined"){
data["searchTxt"]=_1e3;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_1df){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_1e0){
setTimeout(categoryFanHighlight,500);
}
}
if(_1e2){
_1e2(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_1e7,_1e8,_1e9,cols,_1ea){
if(!_1e9){
var _1e9=8;
}
if(!cols){
var cols=2;
}
var _1eb=jq("#"+_1e8).val();
if(""==jq.trim(_1eb)){
return;
}
jq("#"+_1e7).load("/xml/categoryFanSearch.php",{search:_1eb,limit:_1e9,cols:cols},function(){
if(_1ea){
_1ea();
}
});
return false;
};
function facebookConnect(_1ec){
if(typeof (_1ec)=="undefined"){
_1ec="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_1ec}).toQueryString();
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
function facebookPopup(_1ed){
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
child=window.open(_1ed,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_1ee,_1ef){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_1ee+"="+(_1ef?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function toggleShareIt(id,flg,_1f0){
if(_1f0===undefined){
_1f0=false;
}
if(flg){
var uri=$H({art_id:id,show_warn:_1f0}).toQueryString();
var ajax=new Ajax.Updater({success:"share_tgt"},"/xml/shareit.php",{parameters:uri,onFailure:reportError});
}else{
$("share_tgt").innerHTML="";
}
return false;
};
function displaySocialButtons(_1f1){
_1f1=_1f1||{};
var _1f2=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_1f1["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_1f3){
FB.init({xfbml:true});
if(_1f1["newdesign"]){
setTimeout(fetchRelatedHubSocialButtons,6000);
}
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_1f4){
_gaq.push(["t2._trackSocial","facebook","like",_1f4]);
});
FB.Event.subscribe("edge.remove",function(_1f5){
_gaq.push(["t2._trackSocial","facebook","unlike",_1f5]);
});
FB.Event.subscribe("message.send",function(_1f6){
_gaq.push(["t2._trackSocial","facebook","send",_1f6]);
});
FB.Event.subscribe("xfbml.render",function(){
jq(".socialbuttons").show();
if(_1f1["newdesign"]){
updateSocialButtonSetup();
}
});
};
}else{
jq(window).bind("load",function(){
jq(".socialbuttons").show();
if(_1f1["newdesign"]){
updateSocialButtonSetup();
}
});
}
if(!_1f1["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_1f7){
twttr.events.bind("tweet",function(_1f8){
if(_1f8){
_gaq.push(["t2._trackSocial","twitter","tweet"]);
}
});
});
}
if(!_1f1["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_1f1["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_1f2;
};
function checkViolations(_1f9){
if(_1f9){
jq(".violations_span").html("");
var _1fa={check_violation:1};
}else{
var _1fa={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_1fa,dataType:"json",success:function(_1fb){
if(_1fb.data){
jq(".violations_span").html(_1fb.data);
}
if(!_1fb.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showAskSignup(_1fc){
var uri=$H({btn_text:"ask!",explain:_1fc,show_signup:1}).toQueryString();
showAjaxOverlay("/xml/showsignup.php",uri,"linkarticle");
return false;
};
function showLinkArticle(url,_1fd){
var uri=$H({page_url:url,page_title:_1fd}).toQueryString();
showAjaxOverlay("/xml/linkarticle.php",uri,"linkarticle");
return false;
};
function showFlagHub(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flaghub.php?a="+id,uri,"flaghub");
return false;
};
function showFlagRequest(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagrequest.php?r="+id,uri,"flagrequest");
return false;
};
function showFlagProfile(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagprofile.php?u="+id,uri,"flagrequest");
return false;
};
function showEmailForm(purl,_1fe,_1ff){
var uri=$H({page_url:purl,page_type:_1fe,page_filter:_1ff}).toQueryString();
showAjaxOverlay("/xml/emailpage.php",uri,"emailhub");
return false;
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
function showHubOverlay(url,_200,_201){
var uri=$H({url:url,addComment:_200,commentText:_201}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_202){
var uri=$H({modId:_202}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_203,_204){
var uri=$H({moduleId:_203,pollId:_204}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_205,_206,_207){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_207){
$("overlay").addClassName(_207);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_205,{parameters:_206,onComplete:function(){
if(!$("fixed_title")){
return;
}
var _208=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_208+"px"});
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
var _209=browser=="IE"&&version<=6;
var _20a=$("overlay");
var _20b=Position.getViewportHeight();
if(_20b>750){
var _20c=_20b-150;
}else{
var _20c=_20b-90;
}
var _20d=_20a.getStyle("paddingTop");
var _20e=_20a.getStyle("paddingBottom");
_20c-=_20d.substring(0,_20d.length-2);
_20c-=_20e.substring(0,_20e.length-2);
_20c=Math.max(_20c,100);
$("overlay").setStyle({height:_20c+"px"});
if(_20b>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_209){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_209){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _20f=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_20f+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_20c-60)+"px",overflowY:"auto"});
}
};
function follow(_210,_211,_212,_213,_214){
var data={typeId:_210,objectId:_211,isActive:_212,printNumbers:_213,overrides:_214};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_210){
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
switch(_210){
case 1:
jQuery(".follow_question_"+_211).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_211).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_211).replaceWith(json.buttonText);
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400});
break;
case 4:
jQuery(".follow_"+_211).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_211).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButton(_215,_216,_217,_218){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_215,objectId:_216,printNumbers:_217,overrides:_218},success:function(data){
switch(_215){
case 1:
jQuery(".follow_question_"+_216).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_216).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_216).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_216).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_216).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_216).replaceWith(data);
break;
}
}});
};
function expandComments(id,mm,flg){
if(flg){
var _219=$H({mdc_id:id,modMode:mm}).toQueryString();
var ajax=new Ajax.Updater({success:"comment_tgt"},"/xml/comments.php",{parameters:_219,onFailure:reportError});
}else{
$("comment_tgt").innerHTML="";
}
return false;
};
function expandRequests(id,_21a){
var _21b=$H({article_id:id,num_pages:_21a}).toQueryString();
var ajax=new Ajax.Updater({success:"request_list_tgt"},"/xml/questions.php",{parameters:_21b,onFailure:reportError});
return false;
};
function activity_why(id,_21c,_21d,_21e){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_21c,actionTargetId:_21d,createDate:_21e}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function article_flag(id,flag){
var ajax=new Ajax.Updater({success:"flaglink_"+id+"_"+flag},"/xml/flaghub.php",{parameters:$H({aID:id,reason:flag}).toQueryString(),onFailure:reportError});
};
function ellipse(str,_21f){
if(str.length>_21f&&_21f!=0){
str=str.substr(0,_21f-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_21f-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function loadRandomArt(_220,_221){
var ajax=new Ajax.Request("/xml/random.php",{method:"post",parameters:"score="+_221,onFailure:reportError,onComplete:function(req){
_220.location.href=req.responseText;
}});
};
function deleteComment(_222,_223){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_223).serialize(),success:function(resp){
toggleCommentEdit(_222,false);
jq("#ctext_"+_222).html(resp);
jq("#cedit_"+_222).remove();
}});
return false;
};
function toggleCommentEdit(_224,_225){
if(_225){
$("cedit_"+_224).style.display="none";
$("cbox_"+_224).style.display="";
$("ctext_"+_224).style.display="none";
}else{
if($("cedit_"+_224)){
$("cedit_"+_224).style.display="";
}
$("cbox_"+_224).style.display="none";
$("ctext_"+_224).style.display="";
}
};
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
var _226=req.getAllResponseHeaders();
var ajax=new Ajax.Request("/xml/reporterror.php",{parameters:_226+"&error=1"});
};
function addTagEntries(){
var _227=4;
var _228=document.createElement("div");
_228.id="moreEntryDiv";
var li=null;
var _229=4+1;
var _22a=_229+_227;
for(var i=_229;i<_22a;i++){
li=document.createElement("li");
_228.appendChild(li);
var _22b=document.createElement("input");
_22b.className="tagEntry";
_22b.name="tag_"+i;
_22b.type="text";
_22b.size=40;
li.appendChild(_22b);
}
$("tagEntries").appendChild(_228);
return true;
};
function hubtool_add_tag(_22c){
var _22d=(_22c)?$(_22c):$("add_tag_input");
if(!_22d){
return;
}
var tag;
if(Field.present(_22d)&&_22d.type){
tag=$F(_22d);
Field.clear(_22d);
}else{
if(_22d.innerHTML){
tag=_22d.innerHTML;
Element.remove(Element.findElement(_22d,"li"));
}
}
if(!tag){
return;
}
var _22e=0;
var _22f=/^tag_(\d+)$/i;
var _230=$$(".tagEntry");
_230.each(function(ele){
if(ele.id){
var ms=_22f.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_22e){
_22e=id;
}
}
}
});
_22e++;
var _231="tag_"+_22e;
var _232=$("add_tag_input").parentNode;
var _233="<input class=\"tagEntry\" id=\""+_231+"\" name=\""+_231+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_231)){
var _234=$(_231).tabIndex;
Element.update($(_231).parentNode,_233);
$(_231).tabIndex=_234;
}else{
var _235=$("tag_1").tabIndex-1;
var _234=_235+_22e;
var pole=new Insertion.Before(_232,"<li>"+_233+"</li>");
$(_231).tabIndex=_234;
_234=$("add_tag_input").tabIndex;
_234++;
$("add_tag_input").tabIndex=_234;
}
return false;
};
function add_calculated_tag(_236,tag,_237){
var _238=tag.replace(/'/g,"\\'");
var _239=tag.replace(/ /g,"+");
var _23a="tagd_"+tag.replace(/ /g,"_");
_23a=_23a.toLowerCase();
if($(_23a)){
$(_23a).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _23b=$("nav_tags_edit");
var _23c="<a href=\"javascript:void delete_tag('"+_236+"','"+_238+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_23c+="<a id=\""+_23a+"\" href=\"/tag/"+_239+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_23c;
_23b.appendChild(item);
save_tag(_236,tag,false);
}
}
var _23d=$(_237);
Element.remove(Element.findElement(_23d,"li"));
return false;
};
function add_tag(_23e){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _23f=tag.replace(/'/g,"\\'");
var _240=tag.replace(/ /g,"+");
var _241="tagd_"+tag.replace(/ /g,"_");
_241=_241.toLowerCase();
if($(_241)){
$(_241).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _242=$("nav_tags_edit");
var _243="<a href=\"javascript:void delete_tag('"+_23e+"','"+_23f+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_243+="<a id=\""+_241+"\" href=\"/tag/"+_240+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_243;
_242.appendChild(item);
save_tag(_23e,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_244,tag){
if(!_244||!tag){
return;
}
var _245="tagd_"+tag.replace(/ /g,"_");
var _246=$(_245);
if(!_246){
return;
}
var li=_246.parentNode;
Element.remove(li);
save_tag(_244,tag,true);
return false;
};
function save_tag(_247,tag,del){
var _248=(del)?1:0;
var req={a:_247,v:tag,d:_248};
var _249=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_249,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function handleReturnKeyPress(_24a,func){
_24a=_24a||window.event;
if(_24a.keyCode==Event.KEY_RETURN){
Event.stop(_24a);
func();
return false;
}else{
return true;
}
};
function fireOnReturn(_24b,func){
Event.observe(_24b,"keyup",function(_24c){
_24c=_24c||window.event;
if(_24c.which){
if(_24c.which==Event.KEY_RETURN){
_24c.preventDefault();
func();
}
}else{
if(_24c.keyCode){
if(_24c.keyCode==Event.KEY_RETURN){
Event.stop(_24c);
func();
}
}
}
},false);
};
function InlineEdit(){
};
InlineEdit._registered=[];
InlineEdit._onedit=[];
InlineEdit._ondone=[];
InlineEdit._editting=[];
InlineEdit._setonclick=false;
InlineEdit.register=function(ele,_24d){
var obj=$(ele);
obj.title="Click to edit";
obj.style.backgroundColor="#ffe";
obj.empty_text="";
InlineEdit._registered[obj.id]=_24d;
obj.highlight=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.style.backgroundColor="#ffffd3";
if(this.empty_text&&(this.innerHTML=="&nbsp;"||this.innerHTML==" "||this.innerHTML.charCodeAt(0)==160)){
this.innerHTML=this.empty_text;
}
};
obj.onmouseover=obj.highlight;
obj.onmouseout=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.hide_timer=setTimeout("var el=$('"+this.id+"');if (el) {el.unhighlight();}",1000);
};
obj.unhighlight=function(){
this.style.backgroundColor="#ffe";
if(this.empty_text&&this.innerHTML==this.empty_text){
this.innerHTML="&nbsp;";
}
};
if(!InlineEdit._setonclick){
document.onclick=InlineEdit._handleDocClick;
InlineEdit._setonclick=true;
}
};
InlineEdit.unregister=function(ele){
var obj=$(ele);
obj.title="";
if(obj.hide_timer){
clearTimeout(obj.hide_timer);
}
obj.onmouseover=function(){
};
obj.onmouseout=function(){
};
obj.style.backgroundColor="";
delete InlineEdit._registered[obj.id];
};
InlineEdit.registerCallbacks=function(ele,_24e,_24f){
var obj=$(ele);
InlineEdit._onedit[obj.id]=_24e;
InlineEdit._ondone[obj.id]=_24f;
};
InlineEdit._handleDocClick=function(e){
if(!document.getElementById||!document.createElement){
return;
}
var obj;
if(!e){
obj=window.event.srcElement;
}else{
obj=e.target;
}
while(obj.nodeType!=1){
obj=obj.parentNode;
}
if(obj.tagName=="TEXTAREA"||obj.tagName=="A"){
return;
}
while(!InlineEdit._registered[obj.id]&&obj.nodeName!="HTML"){
obj=obj.parentNode;
}
if(obj.nodeName=="HTML"){
return;
}
InlineEdit.edit(obj);
};
InlineEdit.edit=function(ele){
ele=$(ele);
if(!InlineEdit._registered[ele.id]){
return false;
}
if(InlineEdit._onedit[ele.id]){
var _250=InlineEdit._onedit[ele.id];
_250(ele);
}
var text=ele.innerHTML;
if(ele.empty_text&&ele.empty_text==text){
text=" ";
}
var _251=document.createElement("INPUT");
_251.type="text";
Element.cloneStyles(ele,_251);
ele.parentNode.insertBefore(_251,ele);
InlineEdit._insertEditSpanBefore(ele);
_251.id=ele.id+"_edit_inplace";
InlineEdit._editting[_251.id]=ele;
Element.remove(ele);
_251.value=text;
_251.focus();
_251.select();
return false;
};
InlineEdit._onButtonClick=function(_252){
_252=_252||window.event;
var _253=_252.target||_252.srcElement;
var _254=(_253.innerHTML.search(/CANCEL/)==-1)?true:false;
var _255=_253.parentNode;
var _256=_255;
while(_256&&!InlineEdit._editting[_256.id]){
_256=_256.previousSibling;
}
var _257=InlineEdit._editting[_256.id];
_256.hasFocus=false;
var z=_256.parentNode;
z.insertBefore(_257,_256);
z.removeChild(_256);
z.removeChild(document.getElementsByClassName("buttonSpan",z)[0]);
delete InlineEdit._editting[_256.id];
if(InlineEdit._ondone[_257.id]){
var _258=InlineEdit._ondone[_257.id];
_258(_257);
}
if(_254){
_257.innerHTML=(_256.value.length>0)?_256.value:"&nbsp;";
var _259=InlineEdit._registered[_257.id];
_259(_256.value);
}
};
InlineEdit._insertEditSpanBefore=function(obj){
if(document.getElementById&&document.createElement){
var _25a=document.createElement("span");
_25a.className="buttonSpan";
var butt=document.createElement("button");
var _25b=document.createTextNode("OK");
butt.appendChild(_25b);
_25a.appendChild(butt);
var _25c=document.createElement("button");
var _25d=document.createTextNode("CANCEL");
_25c.appendChild(_25d);
_25a.appendChild(_25c);
obj.parentNode.insertBefore(_25a,obj);
butt.onclick=InlineEdit._onButtonClick;
_25c.onclick=InlineEdit._onButtonClick;
}
};
var SampleDuration=Class.create();
SampleDuration.prototype={initialize:function(_25e){
this.art_id=_25e;
this.t=new Timer();
this.onleaveListener=this.onleave.bindAsEventListener(this);
Event.observe(window,"beforeunload",this.onleaveListener,false);
},onleave:function(e){
e=e||window.event;
this.t.stop();
var _25f=$H({art_id:this.art_id,dur:this.t.length});
var ajax=new Ajax.Request("/xml/duration",{parameters:_25f.toQueryString()});
}};
var myGlobalHandlers={onCreate:function(){
this.flag(true);
},onComplete:function(){
if(Ajax.activeRequestCount==0){
this.flag(false);
this.shouldShowIcon=false;
}
},onScroll:function(){
var div=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(div){
var _260=insideHubEditor?200:0;
div.style.top=(Position.getViewportScrollY()+_260)+"px";
}
},flagUp:function(){
this.flag(true);
},flagDown:function(){
this.flag(false);
},flag:function(up){
if(up){
this.shouldShowIcon=true;
setTimeout(this.showIcon.bind(this),2000);
}else{
if(!this.iconVisible){
return;
}
var _261=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(_261){
this.shouldShowIcon=false;
_261.style.display="none";
Event.stopObserving(window,"scroll",this.scrollListener,false);
this.scrollListener=null;
this.iconVisible=false;
}
}
},showIcon:function(id){
if(this.shouldShowIcon&&!this.iconVisible&&Ajax.activeRequestCount>0){
this.iconVisible=true;
var _262=insideHubEditor?$("ajaxing_big"):$("ajaxing");
_262.style.display="inline";
this.onScroll();
this.scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.scrollListener,false);
}
}};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_263){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_263*100)+")";
}
ele.style.opacity=_263;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _264;
if(document.defaultView){
_264=document.defaultView.getComputedStyle(ele,"");
}else{
_264=ele.currentStyle;
}
return _264;
};
Element.cloneStyles=function(ele,_265,_266){
ele=$(ele);
_265=$(_265);
var _267=Element.getCurrentStyle(ele);
for(var name in _267){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _268=_267[name];
if(_268!==""&&!(_268 instanceof Object)&&name!="length"&&name!="parentRule"){
if(_266&&name.indexOf(_266)!==0){
continue;
}
_265.style[name]=_268;
}
}
return _265;
};
Element.findElement=function(_269,_26a){
_269=$(_269);
while(_269.parentNode&&(!_269.tagName||(_269.tagName.toUpperCase()!=_26a.toUpperCase()))){
_269=_269.parentNode;
}
return _269;
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
String.prototype.startsWith=function(_26b){
var res=this;
return res.substring(0,_26b.length)==_26b;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _26c=p.innerHTML;
if(_26c.length>len){
_26c=_26c.substring(0,len);
_26c=_26c.replace(/\w+$/,"");
_26c+="...";
p.innerHTML=_26c;
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
var _26d=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_26d=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_26d=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_26d=window.pageXOffset;
}else{
if(window.scrollX){
_26d=window.scrollX;
}
}
}
}
return _26d;
};
Position.getViewportScrollY=function(){
var _26e=0;
if(document.documentElement&&document.documentElement.scrollTop){
_26e=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_26e=document.body.scrollTop;
}else{
if(window.pageYOffset){
_26e=window.pageYOffset;
}else{
if(window.scrollY){
_26e=window.scrollY;
}
}
}
}
return _26e;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _26f=jq(window).scrollTop();
var _270=_26f+jq(window).height();
if(eleBot<_26f){
return -1;
}
if(off.top>_270){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _271=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _272=[_271[0]+Position.getViewportWidth(),_271[1]+Position.getViewportHeight()];
return (_271[0]<off[0]&&off[0]<_272[0]&&_271[1]<off[1]&&off[1]<_272[1]);
};
Position.set=function(ele,_273){
if(ele&&_273){
ele.style.left=_273[0]+"px";
ele.style.top=_273[1]+"px";
}
};
function check_signed_in_ajax(_274,_275){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_276,_277){
_274(eval(_276.responseText),_275);
}});
};
function phone_verify_required(_278,_279,_27a,_27b){
if(typeof (_27b)=="undefined"){
data={};
}else{
data={a:_27b};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_278);
}else{
_279.apply(null,_27a);
}
},"json");
};
function require_phone_verification(_27c,_27d){
url="/xml/verify/phone.php";
if(typeof (_27d)!="undefined"&&_27d){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_27c},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_27e,end){
for(var i=_27e;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_27e)+1;
}
update_plural(name);
};
function unselect_all(name,_27f,end){
for(var i=_27f;i<=end;i++){
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
function import_now(_280,name,_281,end){
var _282=self.opener.document.getElementById(_280);
if(_282){
for(var i=_281;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _283=$(name+"_email_"+i);
if(_282.value.length<2||_282.value.charAt(_282.value.length)==","||_282.value.charAt(_282.value.length-1)==","){
_282.value=_282.value+_283.innerHTML;
}else{
_282.value=_282.value+", "+_283.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_284,_285,max){
var _286=document.getElementById(_284);
var _287=document.getElementById(_285);
if(!_286){
alert("charCounter bad source: "+_284);
}
if(!_287){
alert("charCounter bad source: "+_285);
}
if(_286.value.length>max){
_286.value=_286.value.substring(0,max);
}
_287.value=max-_286.value.length;
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
function fetchAnswers(_288,_289,_28a){
var _28b=$H({answerIds:_288,enableVoting:_289,enableEditing:_28a}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_28b,onComplete:function(_28c){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_28d,v){
if(_28d===undefined){
_28d=true;
}
jq.ajax({url:"/xml/answervote.php",type:"POST",data:{id:id,vote:v,timeIndicator:_28d},dataType:"html",success:function(html){
jq(".voting_"+id).html(html);
}});
return false;
};
function answerVoteDown(id,_28e){
return answerVote(id,_28e,-1);
};
function answerVoteUp(id,_28f){
return answerVote(id,_28f,1);
};
function fetchRecaptcha(_290){
var _291="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _292=document.getElementsByTagName("head")[0];
var _293=document.createElement("script");
_293.type="text/javascript";
_293.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_293.onload=function(){
Recaptcha.create(_291,_290,{theme:"red"});
};
_293.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_291,_290,{theme:"red"});
}
};
_292.appendChild(_293);
}else{
Recaptcha.create(_291,_290,{theme:"red"});
}
};
function whenSignedIn(_294,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_294,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_295,info){
if(_295){
info.fn.apply(null,info.args);
}else{
if(jQuery("#signInOverlay").size()==0){
var html="<div id=\"signInOverlay\" class=\"overlay\" style=\"display: none;\">";
html+="<a class=\"close\" href=\"#\" onclick=\"toggleOverlay('signInOverlay'); return false;\">close</a>";
html+="<div id=\"signInOverlayContent\"></div>";
html+="</div>";
jQuery("body").append(html);
}
jQuery.get("/xml/signinupform.php",info.options,function(data){
jQuery("#signInOverlayContent").html(data);
suFH.onSuccess=afterSignedIn.bind(null,info);
siFH.onSuccess=afterSignedIn.bind(null,info);
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha("captcha_div");
}
toggleOverlay("signInOverlay");
});
}
return false;
};
function afterSignedIn(info){
toggleOverlay("signInOverlay");
info.fn.apply(null,info.args);
};
function getElementScreenTop(){
var _296=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _296;
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
function getElementRight(elem){
return getElementLeft(elem)+elem.getWidth();
};
function getElementBottom(elem){
return getElementTop(elem)+elem.getHeight();
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_297){
this.buffer.push(_297);
return this;
};
StringBuffer.prototype.toString=function toString(){
return this.buffer.join("");
};
function search_escape(str){
newstr=encodeURI(str);
newstr=newstr.replace(/\%20/g,"+");
return newstr;
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
function setupNavMenu(){
jq(document).ready(function(){
var _298=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_298=="touchstart"){
jq("#header_explore").bind(_298+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_298+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_298+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_298+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_298+".nav",function(_299){
_299.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_29a){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_29b){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_29c){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_29d){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_29e){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_29f){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_2a0){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_2a1){
nav_hide_all_menus();
});
jq("html").bind("click",function(_2a2){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_2a3){
_2a3.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function initHubJS(_2a4,_2a5,_2a6){
if(_2a5){
setupSocialButtons();
}
var iPad=navigator.userAgent.match(/iPad/i);
var _2a7=iPad&&navigator.userAgent.match(/OS [1-4]_\d/i);
pinboardPageLimit=_2a7?2:9999;
initPinBoard(_2a4,_2a6,pinboardPageLimit);
if(!_2a7){
initFixedFooter();
}
};
function initFixedFooter(){
var _2a8=jq("#pinboard");
var _2a9=_2a8.offset().top+_2a8.height();
jq(window).scroll(function(){
checkForFooterChange(_2a9);
}).resize(function(){
checkForFooterChange(_2a9);
});
};
function checkForFooterChange(_2aa){
var pos=jq(this).scrollTop()+jq(this).height();
var _2ab=jq("#footer_wrap");
if(pos<_2aa-100){
if("fixed"==_2ab.css("position")&&!_2ab.is(":animated")){
_2ab.fadeOut(700,function(){
jq(this).css({position:"static",zIndex:0,display:"block"});
});
}
}else{
if(pos>_2aa){
if("fixed"!=_2ab.css("position")&&!_2ab.is(":animated")){
_2ab.css({position:"fixed",bottom:0,zIndex:10,display:"none"}).fadeIn(700);
}
}
}
};
function initPinBoard(_2ac,_2ad,_2ae){
var _2af=jq("#pinboard");
related_ids=[];
jq(".related_hub").each(function(j,_2b0){
jq(jq(_2b0).attr("class").split(" ")).each(function(i,clss){
if("rh"==clss.substr(0,2)){
related_ids.push(clss.substr(2));
return false;
}
});
});
existing_related_selector=".pn"+_2ac;
if(related_ids.length){
existing_related_selector+=",.pn"+related_ids.join(",.pn");
}
_2af.masonry({itemSelector:".pinboard_box",columnWidth:306,gutterWidth:27}).infinitescroll({navSelector:"div.infinite_nav",nextSelector:"div.infinite_nav a:first",itemSelector:"#pinboard div.pinbox",loading:{img:"/x/spinner.gif",msgText:"<em>Loading...</em>"},bufferPx:800,pageLimit:_2ae},function(_2b1){
var _2b2=jq(_2b1).remove(existing_related_selector);
if(!_2ad){
_2b2.find(".share_related_placeholder").css("height",0);
}
_2af.masonry("appended",_2b2);
if(_2ad){
fetchRelatedHubSocialButtons();
}
});
};
function fetchRelatedHubSocialButtons(){
if(!(browser!="IE"||version>7||document.documentMode)){
return false;
}
ids=[];
jq(".share_related:hidden").each(function(_2b3,elt){
jq(jq(elt).attr("class").split(" ")).each(function(i,clss){
if("sb"==clss.substr(0,2)){
ids.push(clss.substr(2));
return false;
}
});
});
if(0==ids.length){
return;
}
jq.post("/xml/article/sharebuttons.php",{ids:ids},function(_2b4){
jq.each(_2b4,function(id,code){
jq(".sb"+id).html(code).show().children(".socialbuttons").show();
});
if("undefined"!=typeof (FB)){
FB.XFBML.parse();
}
if("undefined"!=typeof (twttr)){
twttr.widgets.load();
}
dynamicPinterestLoad();
},"json");
};
function dynamicPinterestLoad(){
jq(".pin-it-button").each(function(_2b5,elt){
var _2b6=jq(elt);
var _2b7=_2b6.attr("href");
var _2b8=_2b6.attr("count-layout");
var qpos=_2b7.indexOf("?");
var src="//d3io1k5o0zdpqr.cloudfront.net/pinit.html"+_2b7.substr(qpos)+"&layout="+encodeURIComponent(_2b8);
var _2b9=jq("<iframe scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>").css({border:"medium none",width:"90px",height:"20px"}).attr("src",src);
_2b6.replaceWith(_2b9);
});
};
function setupSocialButtons(){
if(navigator.userAgent.match(/iPad/i)){
}else{
jq("#sidebar, #pinboard").delegate(".related_social_wrap",{mouseenter:function(_2ba){
var _2bb=jq(this).find(".share_related");
if("inline"==_2bb.find(".socialbuttons").css("display")){
_2bb.css("visibility","visible");
}
},mouseleave:function(_2bc){
jq(this).find(".share_related").css("visibility","hidden");
}});
}
};
function updateSocialButtonSetup(){
if(navigator.userAgent.match(/iPad/i)){
jq(".share_related_has_image").css("visibility","visible");
}else{
}
};
function google_ad_request_done(_2bd){
var s="";
var i;
if(_2bd.length==0){
return;
}
if(_2bd[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_2bd[0].image_width+"\" HEIGHT=\""+_2bd[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_2bd[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_2bd[0].image_url+"\" WIDTH=\""+_2bd[0].image_width+"\" HEIGHT=\""+_2bd[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_2bd[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_2bd[0].url+"\" target=\"_top\" title=\"go to "+_2bd[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_2bd[0].visible_url+"';return true\"><img border=\"0\" src=\""+_2bd[0].image_url+"\"width=\""+_2bd[0].image_width+"\"height=\""+_2bd[0].image_height+"\"></a>";
}else{
if(_2bd[0].type=="html"){
s+=_2bd[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>";
for(i=0;i<_2bd.length;++i){
ad=_2bd[i];
s+="<div class=\"cjs_titleurl\">";
s+="<a class=\"cjs_title\" href=\""+ad.url+"\">"+ad.line1+"</a> ";
s+="<a class=\"cjs_url\" href=\""+ad.url+"\">"+ad.visible_url+"</a>";
s+="</div>";
s+="<div class=\"cjs_desc\">"+ad.line2+" "+ad.line3+"</div>";
}
s+="</div>";
}
}
}
document.write(s);
return;
};
function hubAnchorUpdate(){
var _2be=jq.address.value().substr(1);
if(""==_2be){
return;
}
var _2bf=false;
if(_2be.substr(0,8)=="comment-"){
_2bf=true;
_2be="comment"+_2be.substr(8);
}
if("morecomments"==_2be||_2bf){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_2be){
ssToId("comFirst");
}else{
if("morecomments"==_2be){
}else{
ssToId(_2be);
}
}
};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_2c0){
id=jQuery(_2c0.target).attr("id");
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
function loadRatingSystem(_2c1,_2c2,_2c3,_2c4){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_2c1,params:{id:_2c4},ratingClass:"rating"});
};
function hpFormHandler(_2c5){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_2c5);
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
var _2c6=$$("input[name="+ele.name+"]");
var _2c7=false;
_2c6.each(function(r){
if(r.checked==true){
_2c7=true;
throw $break;
}
});
this.testForError(!_2c7,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _2c8=false;
if(val.length>=20){
var _2c9=val.match(/\s+/g);
var _2ca=_2c9?_2c9.length:0;
var _2cb=_2ca+1;
_2c8=_2cb/(val.length-_2ca)<0.08;
}
this.testForError(_2c8,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_2cc,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_2cc)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_2cd,msg){
var val=$F(ele);
this.testForError((val.search(_2cd)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_2ce,msg){
var val=$F(ele);
var _2cf=false;
for(i=0;i<_2ce.length&&!_2cf;i++){
var _2d0=new RegExp("[^a-zA-Z]"+_2ce[i]+"[^a-zA-Z]","i");
_2cf=(val.search(_2d0)>=0);
if(!_2cf){
_2d0=new RegExp("^"+_2ce[i]+"[^a-zA-Z]","i");
_2cf=(val.search(_2d0)>=0);
}
if(!_2cf){
_2d0=new RegExp("[^a-zA-Z]"+_2ce[i]+"$","i");
_2cf=(val.search(_2d0)>=0);
}
if(!_2cf){
_2d0=new RegExp("^"+_2ce[i]+"$","i");
_2cf=(val.search(_2d0)>=0);
}
}
this.testForError(_2cf,ele,msg);
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
var _2d1=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _2d2=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _2d3=800;
var _2d4=6;
this.validateLengthMin(ele,_2d4,"The address you entered is too short. Please use an address at least "+_2d4+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _2d5=200;
this.validateLengthMax(ele,_2d5,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _2d6=2;
var _2d7=200;
this.validateLengthMin(ele,_2d6,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_2d7,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _2d8=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_2d8=true;
}
this.testForError(!_2d8,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _2d9=40;
var _2da=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_2da,"Your password is too short.  Protect your account by choosing a password that is at least  "+_2da+" characters long.  Safety first!");
this.validateLengthMax(ele1,_2d9,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _2db=60;
var _2dc=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_2db,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_2dd){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_2dd.detect(function(name){
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
var _2de=$A($(form).getElementsByTagName("input"));
_2de.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_2df,_2e0,_2e1){
if($(_2df)&&$(_2e0)){
var gw=new GhostWatcher(_2df,_2e0,_2e1);
}
};
hpFormHandler.prototype.setValidators=function(_2e2,_2e3){
this.toValidate=$H(_2e2);
this.toValidateOnsubmit=$H(_2e3);
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
hpFormHandler.prototype.save=function(_2e4){
if(this.ensureSignedInBeforeSave&&!_2e4){
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
var _2e5=new fx.Scroll({duration:100});
_2e5.scrollTo(this.errorDiv);
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
var _2e6=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_2e7,ele,msg){
if(_2e7){
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
hpFormHandler.prototype._runValidators=function(_2e8){
var _2e9=Form.getElements(this.form);
var _2ea=$A(_2e9);
_2ea.each(function(node){
if(_2e8){
var _2eb=this.toValidateOnsubmit.get(node.id);
if(!_2eb){
_2eb=this.toValidateOnsubmit.get(node.className);
}
if(_2eb){
_2eb(node);
}
}
var _2eb=this.toValidate.get(node.id);
if(!_2eb){
_2eb=this.toValidate.get(node.className);
}
if(_2eb){
_2eb(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _2ec="";
if(json.status=="error"){
var _2ed=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_2ec+=" - "+json.errors[key][i]+"\n";
}
_2ed++;
}
}
if(_2ed>0){
var _2ee=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_2ee+=_2ec+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_2ee);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _2ef=new fx.Scroll({duration:300});
_2ef.scrollTo("changesSaved");
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
var _2f0=this.errorHeader;
_2f0+="<ul>";
this.errors.each(function(err){
_2f0+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_2f0+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_2f0;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _2f1=$(err.key);
var _2f2=err.key+"_error";
var _2f3=$(_2f2);
if(_2f3){
_2f3.innerHTML=err.value;
_2f3.className="alert";
_2f3.show();
}else{
new Insertion.Top(_2f1.parentNode,"<div id=\""+_2f2+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_2f1,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _2f4=typeof this.errors.get(targetId)=="undefined";
if(_2f4){
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
function _handleInputKeypress(_2f5){
_2f5=_2f5||window.event;
if(_2f5.which){
if(_2f5.which==Event.KEY_RETURN){
var _2f6=document.createEvent("KeyboardEvent");
_2f6.initKeyEvent("keydown",true,true,document.defaultView,_2f5.ctrlKey,_2f5.altKey,_2f5.shiftKey,_2f5.metaKey,Event.KEY_TAB,0);
_2f5.preventDefault();
_2f5.target.dispatchEvent(_2f6);
}
}else{
if(_2f5.keyCode){
if(_2f5.keyCode==Event.KEY_RETURN){
_2f5.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_2f7,_2f8,_2f9){
this.fromEle=$(_2f7);
this.toEle=$(_2f8);
this.copyFunction=(_2f9!=null)?_2f9:this.copyValue;
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
function growTextArea(elt,_2fa,_2fb,_2fc){
var rows=Math.ceil($F(elt).length/_2fa)+1;
var _2fd=rows*_2fb;
_2fd=Math.max(_2fd,_2fc);
elt.setStyle({height:_2fd+"px"});
};
function makeGrowable(id,_2fe,_2ff,_300){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_2fe,_2ff,_300);
});
};
function makeExpandable(id,_301,_302,_303,_304,_305){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_301);
var _305=(_305===undefined)?"expanded":_305;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_305)){
anc.addClass(_305);
if(typeof (_304)=="function"){
_304.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_302)=="function"){
_302.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_303){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_301);
});
};
function initAutoComplete(_306,_307){
var _308="";
var _309="++none++";
var _30a=false;
var _30b=false;
var _30c=false;
var _30d="#the_auto_comp_box";
var _30e="#search_form";
var _30f="#search_input";
var _310=".search_submit";
var _311="search_form";
var _312="/xml/getautocompletestrings.php";
var _313="";
var _314=0;
var _315=null;
var _316=null;
var _317=null;
var _318=null;
var _319=null;
var _31a=false;
if(_307){
_30d=_307.boxid;
_30e=_307.container;
_30f=_307.input;
_310=_307.submit;
if(_307.ajaxtarget!=undefined){
_312=_307.ajaxtarget;
}
if(_307.querystring!=undefined){
_313="&"+_307.querystring;
}
if(_307.filter!=undefined){
_315=_307.filter;
}
if(_307.callback!=undefined){
_316=_307.callback;
}
if(_307.keyboardelem!=undefined){
_318=_307.keyboardelem;
}
if(_307.targoutput!=undefined){
_317=_307.targoutput;
}
if(_307.keyuptarget!=undefined){
_319=_307.keyuptarget;
}
if(_307.showprogress!=undefined){
_31a=_307.showprogress;
}
}
if(!_318){
_318=_30f;
}
if(!_317){
_317=_30f;
}
if(!_319){
_319=_318;
}
jq(document).ready(function(){
if(!_30a){
_30a=true;
jq("<div id=\""+_30d.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_318);
if(_31a){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_30d);
jq("#auto_comp_close").bind("click",function(){
jq(_30d).hide();
jq("#auto_comp_close").hide();
});
}
jq(_30d).hide();
if(!_31a){
jq(_30d).bind("focusin",function(){
_30b=true;
});
jq(_30d).bind("focusout",function(){
_30b=false;
});
jq(_30e).bind("focusin",function(){
_30c=true;
});
jq(_30e).bind("focusout",function(){
_30c=false;
setTimeout(function(){
if(!_30b&&!_30c){
jq(_30d).hide();
jq("#auto_comp_close").hide();
_313=_313.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_30e).attr("autocomplete","off");
jq(_318).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_314=0;
jq(_30d+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_319).bind("keyup",function(){
var _31b=jq(_30f).attr("value");
if(_30f!=_318){
if(_308!=_31b){
_313=_313.replace(/start=[0123456789]+/,"");
_313=_313.replace(/&&/,"&");
}
_308="";
_309="++none++";
}
var _31c;
if(_307){
_31c="hubs";
}else{
_31c=jq(".search_type option:selected").val();
if(_31c==undefined){
_31c="site";
}
}
if(_31b.strip().length==0){
jq(_30d).hide();
jq("#auto_comp_close").hide();
}
if(_31b.strip().length>0&&_308!=_31b){
_308=_31b;
if(_31b.indexOf(_309)==0){
jq(_30d+" > .auto_comp_row").each(function(){
var _31d=jq(this).text();
if(_315){
_31d=_315(_31d);
}
if(_31d.indexOf(_31b)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_309="++none++";
jq(_30d+" > .auto_comp_row").remove();
var _31e="?";
if(_31a){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_30d);
jq(_30d).show();
_31e="?s="+escape(_31b)+"&";
}
var _31f=jq(_30e).serialize();
var _320=/(^|&)s=/;
if(!_31f.match(_320)&&!_313.match(_320)&&!_31e.match(_320)){
_31f+="&s="+_31b;
}
jq.get(_312+_31e+"t="+escape(_31c)+_313,_31f,function(data){
jq(_30d+" div[id=auto_comp_error]").remove();
jq(_30d+" div[id=auto_comp_progress]").remove();
_313=_313.replace(/start=[0123456789]+/,"");
_313=_313.replace(/&&/,"&");
var _321=jq(data).find("div").length;
var _322=false;
if(_321==0){
return true;
}
var _323=jq(_30f).val();
if(_323!=_31b){
return true;
}
if(_321<_306){
_309=_31b;
}else{
_309="++none++";
}
jq(_30d).show();
jq(_318).focus();
var _324=jq(_318).position();
var _325=jq(_318).outerHeight(true);
jq(_30d).position(_324.top+_325,_324.left+5);
jq(data).find("div").appendTo(_30d);
jq(_30d+" > .auto_comp_row").bind("click",function(){
var _326=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_326=true;
var _327=href.substr(8);
_313+="&start="+_327;
_313=_313.replace(/&&/,"&");
}
});
if(_326){
if(!_322){
setTimeout(function(){
jq(_319).trigger("keyup");
},200);
_30b=false;
_322=true;
}
return (false);
}
var _328=jq(this).text();
if(_315){
_328=_315(_328);
}
jq(_317).attr("value",_328);
if(document.forms[_311]){
document.forms[_311].submit();
}else{
if(_310){
jq(_310).trigger("click");
}
}
return (false);
});
jq(_30d+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_30d+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_30d+" > .auto_comp_row:visible:eq("+_314+") > a").length){
return (false);
}
++_314;
jq(_30d+" > .auto_comp_row:visible:eq("+_314+") > a").trigger("focus");
return (false);
break;
case 38:
--_314;
if(_314<0){
jq(_318).trigger("focus");
}else{
jq(_30d+" > .auto_comp_row:visible:eq("+_314+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_316){
_316();
}
},"html");
}
});
}
});
};
var ImageViewerControl=Class.create();
ImageViewerControl.prototype={initialize:function(_329,_32a,_32b,_32c){
this.modId=_329;
this.floatStatus=_32a;
this.displayStatus=_32b;
this.popupFlg=_32c;
this.photoData=new Object();
this.photoOrder=new Array();
this.viewer_id=null;
this.timer=null;
this.slide_idx=-1;
this.displaySlideshowLinks=false;
this.excludeImageIdsFromSlideshow=$A(new Array());
this.resources={ht_viewer_sect:"image_viewer_"+this.modId,ht_inline_sect:"image_inline_"+this.modId,ht_slideshow_sect:"image_slideshow_"+this.modId,ht_thumbnail_sect:"image_thumbnail_"+this.modId,inline_images:"imgs_"+this.modId,viewer_display:"slide_display_"+this.modId,viewer_photo:"slide_img_"+this.modId,viewer_caption:"slide_desc_"+this.modId,thumb_tn_section:"slide_tn_section_"+this.modId};
},setMaxHeight:function(_32d){
this.firstTimeLoadingImage=true;
this.maxHeight=_32d;
},addPhoto:function(rec){
this.photoData[rec.id]=rec;
this.photoOrder.push(rec.id);
},clear:function(){
delete this.photoData;
this.photoData=new Object();
this.photoOrder.clear();
},render:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
this.renderInlineImages();
break;
case "Thumbnail":
this.renderThumbnails();
break;
}
},toggleViewer:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
Element.hide(this.resources.ht_viewer_sect);
Element.show(this.resources.ht_inline_sect);
Element.hide(this.resources.ht_thumbnail_sect);
break;
case "Thumbnail":
Element.show(this.resources.ht_viewer_sect);
Element.hide(this.resources.ht_inline_sect);
Element.show(this.resources.ht_thumbnail_sect);
break;
}
},loadSlide:function(id){
if(!this.firstTimeLoadingImage&&this.maxHeight){
$(this.resources.viewer_display).style.height=this.maxHeight+"px";
}
this.viewer_id=id;
rec=this.photoData[id];
$(this.resources.viewer_photo).innerHTML=this._getDisplayUrl();
$(this.resources.viewer_caption).innerHTML=this._getCaptionAndSource(rec);
if(this.popupFlg){
this._addpopup(id,$(this.resources.viewer_photo).firstChild);
}
this.firstTimeLoadingImage=false;
},getMaxDisplayHeight:function(){
var top=0;
this.photoOrder.each(function(id){
var hgt=this._getDisplayHeight(id);
top=hgt>top?hgt:top;
}.bind(this));
return top;
},setDisplaySlideshowLinks:function(_32e){
this.displaySlideshowLinks=_32e;
},setExcludeImagesFromSlideshow:function(){
this.excludeImageIdsFromSlideshow=$A(arguments);
},_getDisplayUrl:function(){
rec=this.photoData[this.viewer_id];
var _32f=rec.origWidth>=200&&rec.origHeight>=150;
if(rec.maxSize==2&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlQuarter,"quarter_frame",rec.esc_cap)+(_32f&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if(rec.maxSize==2){
return this._createImageTag(rec.urlQuarter,"quarter",rec.esc_cap)+(_32f&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlHalfPad,"half_frame",rec.esc_cap)+(_32f&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return this._createImageTag(rec.urlHalf,"half",rec.esc_cap)+(_32f&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlFullPad,"full_frame",rec.esc_cap)+(_32f&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"){
return this._createImageTag(rec.urlFull,"full",rec.esc_cap)+(_32f&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}
}
}
}
}
}
},_createImageTag:function(url,_330,_331){
if(undefined==_331){
_331="";
}
return "<img class='"+_330+"' title='"+_331+"' alt='"+_331+"' src='"+url+"' />";
},_getDisplayHeight:function(_332){
rec=this.photoData[_332];
if(rec.maxSize==2){
return rec.ratio*120;
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return rec.ratio*248;
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return rec.ratio*260;
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return rec.ratio*496;
}else{
if(this.floatStatus=="none"){
return rec.ratio*520;
}
}
}
}
}
},_getCaptionAndSource:function(rec){
var _333=rec.nofollow?" rel=\"nofollow\"":"";
var _334="";
if(rec.sourceUrl==""){
_334=rec.sourceName;
}else{
if(rec.sourceName==""){
_334="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_333+">"+rec.sourceUrl.truncate(50)+"</a>";
}else{
_334="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_333+">"+rec.sourceName+"</a>";
}
}
if(_334!=""){
_334="<div>Source: "+_334+"</div>";
}
return rec.caption+_334;
},_addInlineImage:function(id){
this.viewer_id=id;
var rec=this.photoData[id];
var _335=document.createElement("div");
var _336=this._getDisplayUrl();
if(this.floatStatus=="none"){
var _337="caption_full";
}else{
var _337="caption_half";
}
_335.id="img_"+rec.id;
_335.innerHTML="<div id='img_url_"+rec.id+"'>"+_336+"</div>"+"<div class='"+_337+"' id='img_desc_"+rec.id+"'>"+this._getCaptionAndSource(rec)+"</div>";
$(this.resources.inline_images).appendChild(_335);
if(this.popupFlg){
this._addpopup(rec.id,$("img_url_"+rec.id).firstChild);
}
},renderInlineImages:function(){
$(this.resources.inline_images).innerHTML="";
this.photoOrder.each(function(id){
this._addInlineImage(id);
}.bind(this));
},_addThumbnail:function(id){
var rec=this.photoData[id];
var _338=document.createElement("img");
_338.id="slide_tn_"+rec.id;
_338.src=rec.urlThumb;
_338.alt=rec.caption;
_338.title=rec.caption;
_338.onclick=function(){
this.loadSlide(rec.id);
}.bind(this);
$(this.resources.thumb_tn_section).appendChild(_338);
},renderThumbnails:function(){
$(this.resources.thumb_tn_section).innerHTML="";
this.photoOrder.each(function(id){
this._addThumbnail(id);
}.bind(this));
if(this.photoOrder.length>0){
$("slide_tn_"+this.photoOrder[0]).onclick();
}
},_addpopup:function(id,img){
img.title="Click to see full-size image.";
var link=jq("<a href=\"#\"></a>");
link.attr("data-lightbox",this.photoData[id].lightboxUrl).addClass("imglightbox");
jq(img).after(link).detach();
link.append(img);
link.fancybox({overlayOpacity:0.8,overlayColor:"#000",titleShow:false});
}};
var ForumSelector=Class.create();
ForumSelector.prototype={initialize:function(id,_339){
this.id=id;
this.userId=_339;
this.observeChanges();
},observeChanges:function(){
$(this.id+"_forum_id").observe("change",this.changeForum.bindAsEventListener(this));
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
},changeForum:function(_33a){
var elt=Event.findElement(_33a,"select");
this.chooseForum($F(elt));
},changeCategory:function(_33b){
var elt=Event.findElement(_33b,"select");
this.chooseCategory($F(elt));
},chooseForum:function(_33c){
if(/fave/.test(_33c)){
var _33d=_33c.substring(5);
this.chooseCategory(_33d);
return;
}
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({forumId:_33c,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
},chooseCategory:function(_33e){
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({categoryId:_33e,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
}};
var CategorySelector=Class.create();
CategorySelector.prototype={initialize:function(id,_33f,_340,_341){
this.id=id;
this.onchange=_33f;
this.onselect=_340;
this.userId=_341?_341:0;
this.observeChanges();
},observeChanges:function(){
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
$("startOver"+this.id).observe("click",this.startOver.bind(this));
},changeCategory:function(_342){
var elt=Event.findElement(_342,"select");
this.chooseCategory($F(elt));
},chooseCategory:function(_343,_344,_345){
new Ajax.Request("/xml/categoryselector.php",{parameters:$H({categoryId:_343,userId:this.userId,id:this.id}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
$(this.id+"Wrapper").innerHTML=data["render"];
this.observeChanges();
if($(this.uniqueId+"SearchText")){
$(this.uniqueId+"SearchText").value="";
}
if($(this.uniqueId+"SearchResults")){
$(this.uniqueId+"SearchResults").innerHTML="";
}
this.onchange(data);
if(!_344&&_345){
this.onselect(_345);
}
}.bind(this)});
},getValue:function(){
return $F(this.id+"Id");
},startOver:function(_346){
this.chooseCategory(0);
},refresh:function(){
this.chooseCategory(this.getValue());
},search:function(_347,_348,_349){
new Ajax.Updater(_348,"/xml/categorysearch.php",{parameters:$H({uniqueId:this.id,searchText:_347,numTabs:_349}),onFailure:function(){
}});
return false;
}};
function addEvent(_34a,type,_34b){
if(!_34b.$$guid){
_34b.$$guid=addEvent.guid++;
}
if(!_34a.events){
_34a.events={};
}
var _34c=_34a.events[type];
if(!_34c){
_34c=_34a.events[type]={};
if(_34a["on"+type]){
_34c[0]=_34a["on"+type];
}
}
_34c[_34b.$$guid]=_34b;
_34a["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_34d,type,_34e){
if(_34d.events&&_34d.events[type]){
delete _34d.events[type][_34e.$$guid];
}
};
function handleEvent(_34f){
var _350=true;
_34f=_34f||fixEvent(window.event);
if(_34f==null){
return false;
}
if(this.events==null){
return false;
}
var _351=this.events[_34f.type];
for(var i in _351){
this.$$handleEvent=_351[i];
if(this.$$handleEvent(_34f)===false){
_350=false;
}
}
return _350;
};
function fixEvent(_352){
if(_352!=null){
_352.preventDefault=fixEvent.preventDefault;
_352.stopPropagation=fixEvent.stopPropagation;
}
return _352;
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
var css={getElementsByClass:function(node,_353,tag){
var _354=new Array();
var els=node.getElementsByTagName(tag);
var _355=els.length;
var _356=new RegExp("(^|\\s)"+_353+"(\\s|$)");
for(var i=0,j=0;i<_355;i++){
if(this.elementHasClass(els[i],_353)){
_354[j]=els[i];
j++;
}
}
return _354;
},elementHasClass:function(el,_357){
if(!el){
return false;
}
var _358=new RegExp("\\b"+_357+"\\b");
if(el.className.match(_358)){
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
var _359=document.getElementsByTagName("table");
for(var i=0;i<_359.length;i++){
var _35a=_359[i];
if(css.elementHasClass(_35a,"sortable")){
this.makeSortable(_35a);
}
}
},makeSortable:function(_35b){
if(!_35b.id){
_35b.id="sortableTable"+this.lastAssignedId++;
}
if(!_35b.tHead||!_35b.tHead.rows||0==_35b.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_35b.tHead.rows.length;i++){
if(css.elementHasClass(_35b.tHead.rows[i],"sort_control_buttons")){
row=_35b.tHead.rows[i];
break;
}
}
if(row==null){
row=_35b.tHead.rows[_35b.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _35c=row.cells[i].firstChild;
_35c.onclick=this.headingClicked;
_35c.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _35d=getEventTarget(e);
var td=_35d.parentNode;
var tr=td.parentNode;
var _35e=tr.parentNode;
var _35f=_35e.parentNode;
if(!_35f.tBodies||_35f.tBodies[0].rows.length<=1){
return false;
}
var _360=_35d.getAttribute("columnId")||td.cellIndex;
var _361=css.getElementsByClass(td,"tableSortArrow","span");
var _362="";
if(_361.length>0){
_362=_361[0].getAttribute("sortOrder");
}
var itm="";
var _363=0;
while(""==itm&&_363<_35f.tBodies[0].rows.length){
var elm=_35f.tBodies[0].rows[_363].cells[_360];
if(elm.childNodes.length==1){
itm=that.getInnerText(_35f.tBodies[0].rows[_363].cells[_360]);
}else{
itm=that.getInnerText(_35f.tBodies[0].rows[_363].cells[_360].firstChild);
}
_363++;
}
var _364=that.determineSortFunction(itm);
var _365;
if(_35f.id==that.lastSortedTable&&_360==that.sortColumnIndex){
_365=that.newRows;
_365.reverse();
}else{
that.sortColumnIndex=_360;
_365=new Array();
for(var j=0;j<_35f.tBodies[0].rows.length;j++){
_365[j]=_35f.tBodies[0].rows[j];
}
_365.sort(_364);
}
that.moveRows(_35f,_365);
that.newRows=_365;
that.lastSortedTable=_35f.id;
var _361=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_361.length;j++){
if(j==_360){
if(null==_362||""==_362||"DESC"==_362){
_361[j].innerHTML="▼";
_361[j].setAttribute("sortOrder","ASC");
}else{
_361[j].innerHTML="▲";
_361[j].setAttribute("sortOrder","DESC");
}
}else{
_361[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_35f.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_35f.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_35f.tBodies[0].rows.length;i++){
tr=_35f.tBodies[0].rows[i];
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
var _366=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_366=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_366=this.sortDate;
}
if(itm.match(/^[�$]/)){
_366=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_366=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_366=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_366=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_366=this.sortIP;
}
return _366;
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
var _367=a.cells[that.sortColumnIndex];
if(_367.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _368=b.cells[that.sortColumnIndex];
if(_368.childNodes.length>1){
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
},moveRows:function(_369,_36a){
for(var i=0;i<_36a.length;i++){
var _36b=_36a[i];
_369.tBodies[0].appendChild(_36b);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_36c,_36d,_36e){
this.modId=_36c;
this.pollId=_36d;
this.results_div_id=_36c+"_poll_results";
this.vote_form_id=_36c+"_vote_form";
this.vote_radio_name=_36c+"_vote";
this.hubnugget=_36e;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _36f=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_36f,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _370=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_371){
return _371.checked;
});
if(null==_370){
return;
}else{
vote=_370.value;
}
var _372=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_372,onFailure:reportError,onComplete:function(){
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
ContentRotator.prototype={initialize:function(ids,_373,_374,_375,_376,_377,_378,_379,_37a,loop){
this.ids=ids;
this.prefix=_373;
this.interval=_374;
this.position=0;
this.paused=false;
this.transitionEffect=_375;
this.transitioning=false;
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_376){
this.playId=_376;
}
if(_377){
this.pauseId=_377;
}
if(_378){
this.positionIndicatorId=_378;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_379){
this.prevId=_379;
}
if(_37a){
this.nextId=_37a;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},update:function(_37b){
if(this.paused||this.activeUpdateThreadId!=_37b){
return;
}
this.next();
setTimeout(this.update.bind(this,_37b),this.interval);
},pause:function(){
$(this.pauseId).hide();
$(this.playId).show();
this.paused=true;
},play:function(){
$(this.playId).hide();
$(this.pauseId).show();
this.paused=false;
this.activeUpdateThreadId++;
this.update(this.activeUpdateThreadId);
},endTransition:function(){
this.transitioning=false;
},seek:function(_37c){
var next=this.position<_37c;
newPosition=_37c%this.ids.length;
while(newPosition<0){
newPosition+=this.ids.length;
}
if(this.position==newPosition){
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
var _37d=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_37d.toggle();
this.position=newPosition;
if(this.fadeTransition){
var _37e=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _37e=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_37e.options.onComplete=this.endTransition.bind(this);
_37e.hide();
_37e.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=newPosition;
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
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_37f,_380,_381,_382,_383){
this.typeId=_37f;
this.categoryId=_380;
this.userId=_383;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_382;
this.updateTime=_381;
this.originalUpdateTime=_381;
this.currentTime=parseInt(_381,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_384){
_384.preventDefault();
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
var _385=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_385=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_385);
}.bind(this));
},getTimeAgo:function(_386){
if(_386<=1){
return "1 second ago";
}
var _387=Math.round(_386/60);
var _388=Math.round(_386/3600);
var days=Math.round(_386/86400);
var _389=Math.round(_386/604800);
var _38a=Math.round(_386/2592000);
var _38b=Math.round(_386/31536000);
var ret="";
if(_38b>=2){
ret=_38b+" years ago";
}else{
if(_38a>=2){
ret=_38a+" months ago";
}else{
if(_389>=2){
ret=_389+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_388>=2){
ret=_388+" hours ago";
}else{
if(_387>=1){
ret=_387+" minute"+(_387==1?"":"s")+" ago";
}else{
ret=_386+" second"+(_386==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _38c=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_38c;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _38d=parseInt(req.responseText,10);
if(_38d>0){
this.newStoriesAvailable=_38d;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _38e=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_38e+" "+is+" available (click to load)";
},loadNewStories:function(_38f){
var nt=_38f?_38f:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _390=$(document.createElement("div"));
_390.addClassName("feed_item");
_390.innerHTML=data["render"];
var _391=$("feed_box").down(".feed_item",0);
_391.parentNode.insertBefore(_390,_391);
_390.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
eval(elt.innerHTML);
}
});
this.addItems(data["feedData"]);
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
var _392=$(document.createElement("div"));
_392.addClassName("feed_item");
_392.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _393=$("feed_box").down(".feed_item",0);
_393.parentNode.insertBefore(_392,_393);
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
var _394=$(document.createElement("div"));
_394.addClassName("feed_item");
_394.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _395=$("feed_box").down(".feed_item",0);
_395.parentNode.insertBefore(_394,_395);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _396=$(document.createElement("div"));
_396.addClassName("feed_item");
_396.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _397=$("feed_box").down(".feed_item",0);
_397.parentNode.insertBefore(_396,_397);
return;
}
var _398=$("category_filters");
if(!_398){
var _399=$(document.createElement("div"));
_399.addClassName("feed_setting_box");
_399.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_399);
var _398=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_398.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_39a,type,id){
new Ajax.Updater(_39a,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_39b,_39c,_39d){
makeGrowable(id,_39b,_39c,_39d);
},makeExpandable:function(id,_39e,_39f,_3a0,_3a1){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_39e,_39f,_3a0,null,_3a1);
return;
}
elt.addClass("expandable_text dimmed").val(_39e).data("hasFocus",false);
function _3a2(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_3a3,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _3a4(){
if(_3a2()){
if(!_3a0){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_39e);
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
if(typeof (_39f)=="function"){
_39f.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_3a4();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_3a4();
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
},saveForm:function(_3a5){
this.getHandler(_3a5).save();
return false;
},addStoryToTop:function(_3a6,id,_3a7){
var _3a8=$(document.createElement("div"));
_3a8.innerHTML=_3a6;
_3a8.addClassName("feed_item");
var _3a9=$("feed_box").down(".feed_item",0);
_3a9.parentNode.insertBefore(_3a8,_3a9);
_3a8.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _3aa=new fx.Color(_3a8,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_3a7?_3a7:function(){
})});
_3aa.toggle();
},shrinkStatus:function(){
photoGalleryInserter.instance().close();
var s=$("status");
s.value="What's on your mind?";
s.addClassName("dimmed");
$$("#status_update input[type=checkbox]")[0].checked=false;
$$("#status_update .photo_preview")[0].innerHTML="";
$$("#status_update input[name=imageId]")[0].value=0;
$("status_wrapper").removeClassName("expanded");
var _3ab=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_3ab.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _3ac=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
category.startOver();
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _3ad=$("question");
_3ad.value="What is your question?";
_3ad.setStyle({"color":"#777"});
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
_3ac.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _3ae=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _3af=$("subject");
var _3b0=$("message");
_3af.setStyle({"color":"#777"});
_3af.value="What is the subject of your forum post?";
_3b0.value="";
feed_forum_selector.chooseForum(0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_3ae.toggle();
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
},moreFeed:function(_3b1){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_3b1,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _3b2=JSONstring.toObject(req.responseText);
var _3b3=$("show_more");
_3b3.style.display="none";
_3b3.id="";
var _3b4=$(document.createElement("div"));
$("feed_box").appendChild(_3b4);
_3b4.innerHTML=_3b2["render"];
var _3b5=$("feed_more_"+_3b1);
$$("#feed_more_"+_3b1+" script").each(function(_3b6){
safeScriptEval(_3b6);
});
this.addItems(_3b2["feed"]);
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
},unhideUser:function(_3b7){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_3b7,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_3b7).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3b8=this.getById(fid);
if(_3b8){
_3b8.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_3b7);
if(hu){
if(hu.siblings().size()==0){
var _3b9=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3b9.parentNode.insertBefore(p,_3b9);
}
_3b9.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_3ba){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_3ba,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_3ba).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3bb=this.getById(fid);
if(_3bb){
_3bb.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_3ba);
if(hc){
if(hc.siblings().size()==0){
var _3bc=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3bc.parentNode.insertBefore(p,_3bc);
}
_3bc.remove();
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
var _3bd=$("overlay");
_3bd.classNames().each(function(name){
if(name!="overlay"){
_3bd.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_3be){
if(_3be){
$("overlay").addClassName(_3be);
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
var _3bf=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3bf+"px"});
}
adjustOverlayHeight();
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:1,objectId:id,printNumbers:true},success:function(data){
jQuery("#follow_"+id).replaceWith(data);
}});
jQuery.ajax({url:"http://platform.twitter.com/widgets.js",dataType:"script",cache:true});
}.bind(this)});
return false;
},showFlagRequestOverlay:function(id){
this.openOverlay("flagrequest");
new Ajax.Updater("overlay_content","/xml/flagrequest.php?r="+id,{evalScripts:true,onComplete:function(){
var _3c0=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3c0+"px"});
}
adjustOverlayHeight();
}.bind(this)});
return false;
},showImageOverlay:function(url){
jq.fancybox({type:"image",href:url});
return false;
},showFlagHubOverlay:function(id){
this.openOverlay("flaghub");
new Ajax.Updater("overlay_content","/xml/flaghub.php?a="+id,{evalScripts:true,onComplete:function(req){
var _3c1=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3c1+"px"});
}
adjustOverlayHeight();
}.bind(this)});
return false;
},showHubOverlay:function(url){
this.openOverlay("hubpage");
new Ajax.Request("/xml/articlerender.php?url="+url,{onComplete:function(req){
var _3c2=0;
$("overlay_content").innerHTML=req.responseText;
var _3c3=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3c3+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_3c4){
var code=_3c4.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_3c5){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_3c5,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_3c6,_3c7){
var sure=confirm("Are you sure that you want to stop following "+_3c7+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_3c6,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_3c6).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _3c8=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_3c8.each(function(type){
var _3c9=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_3ca){
if(_3ca.checked){
_3c9=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_3c9){
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
var _3cb=jq("#edit_button");
if(_3cb.html()=="edit"){
this.toggleFeedPrefs();
}
var _3cc=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_3cc);
return false;
},toggleFeedPrefs:function(){
var _3cd=$("edit_button");
var _3ce=$("filter").value;
var _3cf="edit";
if(_3cd.innerHTML=="save"){
_3cf="save";
}
if(_3cf=="save"){
this.updateFeedTypeFilters();
var _3d0=0;
var _3d1=$$(".ht_box");
for(var j=0;j<_3d1.length;j++){
if(_3d1[j].checked){
_3d0+=Number(_3d1[j].name.substr(3));
}
}
var _3d2=$("current_prefs");
if(_3d0!=_3d2.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_3d0,filter:_3ce,feed:1}).toQueryString(),onComplete:function(){
Element.update(_3cd,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3d3=parseInt(pf.getStyle("height"));
var _3d4=new fx.Height("preference_feedback",{duration:600});
_3d4.hide();
_3d4.custom(0,_3d3);
}});
_3d2.value=_3d0;
}else{
Element.update(_3cd,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3d5=parseInt(pf.getStyle("height"));
var _3d6=new fx.Height("preference_feedback",{duration:600});
_3d6.hide();
_3d6.custom(0,_3d5);
}
}
var curs=$$(".ht_cur");
var _3d7="";
for(var i=0;i<curs.length;i++){
_3d7=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_3cf=="edit"){
if(_3d7=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_3d7){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_3cf=="edit"){
_3cd.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_3d8,_3d9,_3da){
this.id=id;
this.feedItemId=fid;
this.cdate=_3d8;
this.hidden=_3d9;
this.manager=_3da;
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
},unhide:function(_3db){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_3db){
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
Event.observe(this.triggerId,"click",function(_3dc){
if(Event.element(_3dc).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _3dd=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_3dd){
elt.observe("mouseover",function(_3de){
_3de.show();
}.bind(this,_3dd));
elt.observe("mouseout",function(_3df){
_3df.hide();
}.bind(this,_3dd));
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
},share:function(_3e0){
if(_3e0===undefined){
_3e0=false;
}
if(_3e0){
var _3e1=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_3e1){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_3e2,_3e3){
if(_3e2){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_3e3){
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
var _3e4=$(this.htmlId);
_3e4.parentNode.insertBefore(hmsg,_3e4);
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
},hideUser:function(_3e5,_3e6){
_3e6=_3e6?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_3e5,force:_3e6}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3e7=$(this.htmlId);
_3e7.parentNode.insertBefore(hmsg,_3e7);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_3e5).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_3e8,_3e9){
_3e9=_3e9?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_3e9,categoryId:_3e8}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3ea=$(this.htmlId);
_3ea.parentNode.insertBefore(hmsg,_3ea);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_3e8).each(function(elt){
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
var _3eb=$("feed_posts_"+this.id).immediateDescendants();
var _3ec=_3eb.size();
_3eb.each(function(elt,_3ed){
if(_3ed==_3ec-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _3ee=$("feed_comments_"+this.id).immediateDescendants();
var _3ef=_3ee.size();
var _3f0=0;
_3ee.each(function(elt,_3f1){
if(elt.hasClassName("show_previous")){
_3f0=_3f1;
}
});
_3ee.each(function(elt,_3f2){
if(_3f2==_3f0){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_3f3,num,_3f4){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_3f3,num:num,startpos:_3f4}).toQueryString(),onComplete:function(req){
var _3f5=$("feed_posts_"+this.id);
_3f5.down("div").hide();
new Insertion.Top(_3f5,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_3f6){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_3f6}).toQueryString(),onComplete:function(req){
var _3f7=$("feed_comments_"+this.id);
_3f7.down("div").hide();
new Insertion.Top(_3f7,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_3f8,num,_3f9){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_3f8,num:num,startpos:_3f9}).toQueryString(),onComplete:function(req){
var _3fa=$("feed_comments_"+this.id);
_3fa.down("div").hide();
new Insertion.Top(_3fa,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _3fb=$("feed_comments_"+this.id);
_3fb.innerHTML+=data["render"];
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
},observePostReporting:function(_3fc){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _3fd=$$("#story_"+this.id+" .feed_post");
if(_3fd.size()>1){
_3fd.each(function(elt){
var _3fe=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _3ff=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_3fe]=_3ff;
elt.observe("mouseover",_3ff);
var _400=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_3fe]=_400;
elt.observe("mouseout",_400);
var _401=this.manager.reportPost.bind(this.manager,_3fe);
this.clickHandlers[_3fe]=_401;
elt.observe("click",_401);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _402=$(document.createElement("a"));
_402.innerHTML="cancel report";
_402.href="#";
msg.appendChild(_402);
var _403=$(this.messageId);
_403.innerHTML="";
_403.appendChild(msg);
_403.addClassName("report_instructions");
var _404=parseInt(_403.getStyle("height"));
var _405=new fx.Height(this.messageId,{duration:500});
_405.hide();
_405.custom(0,_404);
_402.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_3fd.size()==1){
var post=_3fd.detect(function(elt){
return true;
});
var _406=post.id;
this.manager.reportPost(this.postIdFromDivId(_406));
}
}
return false;
},postIdFromDivId:function(_407){
return _407.substring(_407.lastIndexOf("_")+1);
},stopObservePostReporting:function(_408){
var _409=$$("#story_"+this.id+" .feed_post");
if(_409.size()>1){
_409.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _40a=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_40a]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_40a]);
elt.stopObserving("click",this.clickHandlers[_40a]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_408){
Event.stop(_408);
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
function deleteStatus(_40b){
link=jq(_40b.target);
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
function markerMap(m,_40c,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_40c);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_40d,_40e){
this.markers.push(new infoMarker(this,_40d,_40e,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_40f,_410,_411,_412){
this.markermap=_40f;
this.marker=_410;
this.content=_411;
this.position=_412;
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
var _413=$(this.legend.id+"_"+i);
if(_413){
_413.innerHTML="";
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
var _414=this.directionsResult.routes[0];
var legs=_414.legs;
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
var _415=$(this.legend.id+"_"+i);
if(_415){
_415.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_414.copyrights;
var _416="";
for(var j=0;j<_414.warnings.length;j++){
_416+=_414.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_416;
};
markerMap.prototype.fetchDirections=function(){
var _417=this.markers;
var l=_417.length;
var _418=new google.maps.LatLng(_417[0].marker.getPosition().lat(),_417[0].marker.getPosition().lng());
var _419=new google.maps.LatLng(_417[l-1].marker.getPosition().lat(),_417[l-1].marker.getPosition().lng());
var _41a=[];
for(var i=1;i<l-1;i++){
_41a.push({location:new google.maps.LatLng(_417[i].marker.getPosition().lat(),_417[i].marker.getPosition().lng()),stopover:true});
}
var _41b={origin:_418,destination:_419,waypoints:_41a,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _41c=new google.maps.DirectionsService();
_41c.route(_41b,function(_41d,_41e){
if(_41e==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_41d;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_41f){
var _420="map_canvas_"+id;
var _421=mm.getMapById(id);
if(!_421){
var map=new google.maps.Map(document.getElementById(_420));
var _421=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_421);
sv=true;
}else{
var map=_421.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_421.removeAllMarkers();
var _422="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _423=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_423+".png";
var _424="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _425=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_421.addMarker(_425,_424);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_422+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_421.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_422+="<div id=\""+_421.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_422+="<div id=\""+_421.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_421.legend.innerHTML=_422;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_41f||!_421.directionsResult){
_421.fetchDirections();
}else{
_421.renderDirections();
}
}else{
var _426={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_421.directionsResult=_426;
_421.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_427){
var id=_427.markermap.id;
if(!id){
return;
}
var _428=mapLetterFromPosition(_427.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_428+".png";
_427.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_427.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_429){
var id=_429.markermap.id;
if(!id){
return;
}
var _42a=mapLetterFromPosition(_429.position);
var icon="http://www.google.com/mapfiles/marker_green"+_42a+".png";
_429.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_429.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_42b,id,_42c){
var _42d=mm.getMapById(id);
if(_42c<_42d.markers.length){
highlightMarker(_42d.markers[_42c]);
}
};
function unhighlightMapMarker(_42e,id,_42f){
var _430=mm.getMapById(id);
if(_42f<_430.markers.length){
unhighlightMarker(_430.markers[_42f]);
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
check_signed_in_ajax(processReplyStart,{"ele":this});
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
check_signed_in_ajax(processReportStart,{"ele":this});
return false;
});
jQuery("#editor_box .inline_cancel").click(function(){
jq("#photo_insert_code").hide();
jQuery(".actionmenu a").removeClass("selected");
var _431=jQuery("#editor_box");
if(_431.hasClass("edit_box")){
jQuery(".message",_431.closest(".postright")).show();
}
_431.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_432,_433){
var ta=jq("#editor_box textarea");
var _434=ta.val();
if(_434.length){
ta.val(_434+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_432,_433)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_432,_433)+"[/img]\n\n");
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
var _435=jQuery("#report_box");
_435.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _436=jQuery(this).closest("div.replies_box_wrapper");
var _437=jQuery(this).closest("div.reply_collapser");
if(_437.hasClass("show")){
_437.addClass("hide").removeClass("show");
jQuery("a",_437).html("");
jQuery("> .replies_box",_436).slideDown();
}else{
jQuery("> .replies_box",_436).slideUp(500,function(){
_437.addClass("show").removeClass("hide");
jQuery("a",_437).html(""+jQuery("li.threaded",_436).length+" replies");
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
var _438=jQuery(this);
var _439=jQuery("#threaded_reply_to_box");
if(_438.html()=="hide"){
_438.html("this");
_439.hide();
return false;
}
var _43a=_438.attr("class").substr(7);
var _43b=jQuery("#post"+_43a+" .username").html();
var html="<p class=\"by\">By "+_43b+"</p>"+jQuery("#message"+_43a).html();
var _43c=_438.closest("li.threaded");
if(_439.length>0){
_43c.append(_439);
}else{
jQuery(_43c).append("<div id=\"threaded_reply_to_box\"></div>");
_439=jQuery("#threaded_reply_to_box");
}
_439.html(html);
var pos=_438.position();
var _43d=_438.width();
_439.css({"left":(pos.left+_43d)+"px","top":pos.top+"px"});
_439.show();
_438.html("hide");
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
var _43e=jQuery(this);
_43e.attr("src",_43e.data("src"));
});
});
});
function show_post_reply_box(_43f){
_43f.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _440=jQuery("#editor_box");
_440.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_440).text("submit");
jQuery("form",_440).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_440).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _441=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _442=_441?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_442+="<br/>";
jQuery("textarea",_440).after(_442);
}
if(jQuery("#follow_topic").length==0){
var _443="checked";
var _444=window.location.pathname;
var arr=_444.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _442="<p id=\"follow_topic\"></p>";
jQuery("textarea",_440).after(_442);
}
jQuery("#posterror ul",_440).html("");
jQuery("#posterror",_440).hide();
jQuery("textarea",_440).val("");
jQuery("#postId",_440).val(_43f.attr("id").substring(4));
_440.append(jQuery("#formatting_tips"));
_440.show();
var x=_440.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_445){
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _446=jQuery("#report_box");
jQuery("#reportPostId",_446).val(_445.attr("id").substring(4));
jQuery("form",_446).ajaxForm({type:"POST",dataType:"json",complete:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_445).append(_446);
jQuery(">.post_wrap > .actionmenu",_445).append(_446);
_446.show();
var x=_446.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyStart(_447,_448){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_448["ele"]).closest("li.threaded");
if(!_447){
suFH.nextUri="?reply="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_post_reply_box(post);
}
};
function processReplyError(data,_449,_44a){
alert("There may have been an error posting your reply ("+_449+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_44b,_44c){
alert("There may have been an error updating your post ("+_44b+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_44d,_44e){
jQuery("li.threaded img.wait").remove();
if(_44e=="error"){
alert(_44d.responseText);
return;
}
data=eval("("+_44d.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _44f=jQuery("#editor_box");
_44f.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_44f).text("Save");
jQuery("form",_44f).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_44f).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _450=document.getElementById("admincenter");
replyOptionsHTML=_450?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_44f).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_44f).html("");
jQuery("#posterror",_44f).hide();
jQuery("#postId",_44f).val(data.postId);
jQuery("textarea",_44f).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_44f.append(jQuery("#formatting_tips"));
_44f.show();
var x=_44f.offset().top-300;
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
function processDeleteResponse(_451,_452,_453){
if(_452=="error"){
jQuery("li.threaded img.wait").remove();
alert(_451);
}
};
function processUndeleteResponse(_454,_455,_456){
if(_455=="error"){
jQuery("li.threaded img.wait").remove();
alert(_454);
}
};
function processReportStart(_457,_458){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_458["ele"]).closest("li.threaded");
if(!_457){
suFH.nextUri="?report="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_report_box(post);
}
};
function processReportResponse(_459,_45a){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _45b=jQuery("#report_box");
_45b.hide();
alert(_459.responseText);
};
(function($){
$.extend($.fn,{validate:function(_45c){
if(!this.length){
_45c&&_45c.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _45d=$.data(this[0],"validator");
if(_45d){
return _45d;
}
_45d=new $.validator(_45c,this[0]);
$.data(this[0],"validator",_45d);
if(_45d.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_45d.cancelSubmit=true;
});
if(_45d.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_45d.submitButton=this;
});
}
this.submit(function(_45e){
if(_45d.settings.debug){
_45e.preventDefault();
}
function _45f(){
if(_45d.settings.submitHandler){
if(_45d.submitButton){
var _460=$("<input type='hidden'/>").attr("name",_45d.submitButton.name).val(_45d.submitButton.value).appendTo(_45d.currentForm);
}
_45d.settings.submitHandler.call(_45d,_45d.currentForm);
if(_45d.submitButton){
_460.remove();
}
return false;
}
return true;
};
if(_45d.cancelSubmit){
_45d.cancelSubmit=false;
return _45f();
}
if(_45d.form()){
if(_45d.pendingRequest){
_45d.formSubmitted=true;
return false;
}
return _45f();
}else{
_45d.focusInvalid();
return false;
}
});
}
return _45d;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _461=true;
var _462=$(this[0].form).validate();
this.each(function(){
_461&=_462.element(this);
});
return _461;
}
},removeAttrs:function(_463){
var _464={},_465=this;
$.each(_463.split(/\s/),function(_466,_467){
_464[_467]=_465.attr(_467);
_465.removeAttr(_467);
});
return _464;
},rules:function(_468,_469){
var _46a=this[0];
if(_468){
var _46b=$.data(_46a.form,"validator").settings;
var _46c=_46b.rules;
var _46d=$.validator.staticRules(_46a);
switch(_468){
case "add":
$.extend(_46d,$.validator.normalizeRule(_469));
_46c[_46a.name]=_46d;
if(_469.messages){
_46b.messages[_46a.name]=$.extend(_46b.messages[_46a.name],_469.messages);
}
break;
case "remove":
if(!_469){
delete _46c[_46a.name];
return _46d;
}
var _46e={};
$.each(_469.split(/\s/),function(_46f,_470){
_46e[_470]=_46d[_470];
delete _46d[_470];
});
return _46e;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_46a),$.validator.classRules(_46a),$.validator.attributeRules(_46a),$.validator.staticRules(_46a)),_46a);
if(data.required){
var _471=data.required;
delete data.required;
data=$.extend({required:_471},data);
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
$.validator=function(_472,form){
this.settings=$.extend(true,{},$.validator.defaults,_472);
this.currentForm=form;
this.init();
};
$.validator.format=function(_473,_474){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_473);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_474.constructor!=Array){
_474=$.makeArray(arguments).slice(1);
}
if(_474.constructor!=Array){
_474=[_474];
}
$.each(_474,function(i,n){
_473=_473.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _473;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_475){
this.lastActive=_475;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_475,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_475)).hide();
}
},onfocusout:function(_476){
if(!this.checkable(_476)&&(_476.name in this.submitted||!this.optional(_476))){
this.element(_476);
}
},onkeyup:function(_477){
if(_477.name in this.submitted||_477==this.lastElement){
this.element(_477);
}
},onclick:function(_478){
if(_478.name in this.submitted){
this.element(_478);
}else{
if(_478.parentNode.name in this.submitted){
this.element(_478.parentNode);
}
}
},highlight:function(_479,_47a,_47b){
$(_479).addClass(_47a).removeClass(_47b);
},unhighlight:function(_47c,_47d,_47e){
$(_47c).removeClass(_47d).addClass(_47e);
}},setDefaults:function(_47f){
$.extend($.validator.defaults,_47f);
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
var _480=(this.groups={});
$.each(this.settings.groups,function(key,_481){
$.each(_481.split(/\s/),function(_482,name){
_480[name]=key;
});
});
var _483=this.settings.rules;
$.each(_483,function(key,_484){
_483[key]=$.validator.normalizeRule(_484);
});
function _485(_486){
var _487=$.data(this[0].form,"validator"),_488="on"+_486.type.replace(/^validate/,"");
_487.settings[_488]&&_487.settings[_488].call(_487,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_485).validateDelegate(":radio, :checkbox, select, option","click",_485);
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
for(var i=0,_489=(this.currentElements=this.elements());_489[i];i++){
this.check(_489[i]);
}
return this.valid();
},element:function(_48a){
_48a=this.clean(_48a);
this.lastElement=_48a;
this.prepareElement(_48a);
this.currentElements=$(_48a);
var _48b=this.check(_48a);
if(_48b){
delete this.invalid[_48a.name];
}else{
this.invalid[_48a.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _48b;
},showErrors:function(_48c){
if(_48c){
$.extend(this.errorMap,_48c);
this.errorList=[];
for(var name in _48c){
this.errorList.push({message:_48c[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_48d){
return !(_48d.name in _48c);
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
var _48e=0;
for(var i in obj){
_48e++;
}
return _48e;
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
var _48f=this.lastActive;
return _48f&&$.grep(this.errorList,function(n){
return n.element.name==_48f.name;
}).length==1&&_48f;
},elements:function(){
var _490=this,_491={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_490.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _491||!_490.objectLength($(this).rules())){
return false;
}
_491[this.name]=true;
return true;
});
},clean:function(_492){
return $(_492)[0];
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
},prepareElement:function(_493){
this.reset();
this.toHide=this.errorsFor(_493);
},check:function(_494){
_494=this.clean(_494);
if(this.checkable(_494)){
_494=this.findByName(_494.name).not(this.settings.ignore)[0];
}
var _495=$(_494).rules();
var _496=false;
for(var _497 in _495){
var rule={method:_497,parameters:_495[_497]};
try{
var _498=$.validator.methods[_497].call(this,_494.value.replace(/\r/g,""),_494,rule.parameters);
if(_498=="dependency-mismatch"){
_496=true;
continue;
}
_496=false;
if(_498=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_494));
return;
}
if(!_498){
this.formatAndAdd(_494,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_494.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_496){
return;
}
if(this.objectLength(_495)){
this.successList.push(_494);
}
return true;
},customMetaMessage:function(_499,_49a){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_499).metadata()[this.settings.meta]:$(_499).metadata();
return meta&&meta.messages&&meta.messages[_49a];
},customMessage:function(name,_49b){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_49b]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_49c,_49d){
return this.findDefined(this.customMessage(_49c.name,_49d),this.customMetaMessage(_49c,_49d),!this.settings.ignoreTitle&&_49c.title||undefined,$.validator.messages[_49d],"<strong>Warning: No message defined for "+_49c.name+"</strong>");
},formatAndAdd:function(_49e,rule){
var _49f=this.defaultMessage(_49e,rule.method),_4a0=/\$?\{(\d+)\}/g;
if(typeof _49f=="function"){
_49f=_49f.call(this,rule.parameters,_49e);
}else{
if(_4a0.test(_49f)){
_49f=jQuery.format(_49f.replace(_4a0,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_49f,element:_49e});
this.errorMap[_49e.name]=_49f;
this.submitted[_49e.name]=_49f;
},addWrapper:function(_4a1){
if(this.settings.wrapper){
_4a1=_4a1.add(_4a1.parent(this.settings.wrapper));
}
return _4a1;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _4a2=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_4a2.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_4a2.element,_4a2.message);
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
for(var i=0,_4a3=this.validElements();_4a3[i];i++){
this.settings.unhighlight.call(this,_4a3[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_4a4,_4a5){
var _4a6=this.errorsFor(_4a4);
if(_4a6.length){
_4a6.removeClass().addClass(this.settings.errorClass);
_4a6.attr("generated")&&_4a6.html(_4a5);
}else{
_4a6=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_4a4),generated:true}).addClass(this.settings.errorClass).html(_4a5||"");
if(this.settings.wrapper){
_4a6=_4a6.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_4a6).length){
this.settings.errorPlacement?this.settings.errorPlacement(_4a6,$(_4a4)):_4a6.insertAfter(_4a4);
}
}
if(!_4a5&&this.settings.success){
_4a6.text("");
typeof this.settings.success=="string"?_4a6.addClass(this.settings.success):this.settings.success(_4a6);
}
this.toShow=this.toShow.add(_4a6);
},errorsFor:function(_4a7){
var name=this.idOrName(_4a7);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_4a8){
return this.groups[_4a8.name]||(this.checkable(_4a8)?_4a8.name:_4a8.id||_4a8.name);
},checkable:function(_4a9){
return /radio|checkbox/i.test(_4a9.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_4aa,_4ab){
return _4ab.form==form&&_4ab.name==name&&_4ab||null;
});
},getLength:function(_4ac,_4ad){
switch(_4ad.nodeName.toLowerCase()){
case "select":
return $("option:selected",_4ad).length;
case "input":
if(this.checkable(_4ad)){
return this.findByName(_4ad.name).filter(":checked").length;
}
}
return _4ac.length;
},depend:function(_4ae,_4af){
return this.dependTypes[typeof _4ae]?this.dependTypes[typeof _4ae](_4ae,_4af):true;
},dependTypes:{"boolean":function(_4b0,_4b1){
return _4b0;
},"string":function(_4b2,_4b3){
return !!$(_4b2,_4b3.form).length;
},"function":function(_4b4,_4b5){
return _4b4(_4b5);
}},optional:function(_4b6){
return !$.validator.methods.required.call(this,$.trim(_4b6.value),_4b6)&&"dependency-mismatch";
},startRequest:function(_4b7){
if(!this.pending[_4b7.name]){
this.pendingRequest++;
this.pending[_4b7.name]=true;
}
},stopRequest:function(_4b8,_4b9){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_4b8.name];
if(_4b9&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_4b9&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_4ba){
return $.data(_4ba,"previousValue")||$.data(_4ba,"previousValue",{old:null,valid:true,message:this.defaultMessage(_4ba,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_4bb,_4bc){
_4bb.constructor==String?this.classRuleSettings[_4bb]=_4bc:$.extend(this.classRuleSettings,_4bb);
},classRules:function(_4bd){
var _4be={};
var _4bf=$(_4bd).attr("class");
_4bf&&$.each(_4bf.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_4be,$.validator.classRuleSettings[this]);
}
});
return _4be;
},attributeRules:function(_4c0){
var _4c1={};
var _4c2=$(_4c0);
for(var _4c3 in $.validator.methods){
var _4c4=_4c2.attr(_4c3);
if(_4c4){
_4c1[_4c3]=_4c4;
}
}
if(_4c1.maxlength&&/-1|2147483647|524288/.test(_4c1.maxlength)){
delete _4c1.maxlength;
}
return _4c1;
},metadataRules:function(_4c5){
if(!$.metadata){
return {};
}
var meta=$.data(_4c5.form,"validator").settings.meta;
return meta?$(_4c5).metadata()[meta]:$(_4c5).metadata();
},staticRules:function(_4c6){
var _4c7={};
var _4c8=$.data(_4c6.form,"validator");
if(_4c8.settings.rules){
_4c7=$.validator.normalizeRule(_4c8.settings.rules[_4c6.name])||{};
}
return _4c7;
},normalizeRules:function(_4c9,_4ca){
$.each(_4c9,function(prop,val){
if(val===false){
delete _4c9[prop];
return;
}
if(val.param||val.depends){
var _4cb=true;
switch(typeof val.depends){
case "string":
_4cb=!!$(val.depends,_4ca.form).length;
break;
case "function":
_4cb=val.depends.call(_4ca,_4ca);
break;
}
if(_4cb){
_4c9[prop]=val.param!==undefined?val.param:true;
}else{
delete _4c9[prop];
}
}
});
$.each(_4c9,function(rule,_4cc){
_4c9[rule]=$.isFunction(_4cc)?_4cc(_4ca):_4cc;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_4c9[this]){
_4c9[this]=Number(_4c9[this]);
}
});
$.each(["rangelength","range"],function(){
if(_4c9[this]){
_4c9[this]=[Number(_4c9[this][0]),Number(_4c9[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_4c9.min&&_4c9.max){
_4c9.range=[_4c9.min,_4c9.max];
delete _4c9.min;
delete _4c9.max;
}
if(_4c9.minlength&&_4c9.maxlength){
_4c9.rangelength=[_4c9.minlength,_4c9.maxlength];
delete _4c9.minlength;
delete _4c9.maxlength;
}
}
if(_4c9.messages){
delete _4c9.messages;
}
return _4c9;
},normalizeRule:function(data){
if(typeof data=="string"){
var _4cd={};
$.each(data.split(/\s/),function(){
_4cd[this]=true;
});
data=_4cd;
}
return data;
},addMethod:function(name,_4ce,_4cf){
$.validator.methods[name]=_4ce;
$.validator.messages[name]=_4cf!=undefined?_4cf:$.validator.messages[name];
if(_4ce.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_4d0,_4d1,_4d2){
if(!this.depend(_4d2,_4d1)){
return "dependency-mismatch";
}
switch(_4d1.nodeName.toLowerCase()){
case "select":
var val=$(_4d1).val();
return val&&val.length>0;
case "input":
if(this.checkable(_4d1)){
return this.getLength(_4d0,_4d1)>0;
}
default:
return $.trim(_4d0).length>0;
}
},remote:function(_4d3,_4d4,_4d5){
if(this.optional(_4d4)){
return "dependency-mismatch";
}
var _4d6=this.previousValue(_4d4);
if(!this.settings.messages[_4d4.name]){
this.settings.messages[_4d4.name]={};
}
_4d6.originalMessage=this.settings.messages[_4d4.name].remote;
this.settings.messages[_4d4.name].remote=_4d6.message;
_4d5=typeof _4d5=="string"&&{url:_4d5}||_4d5;
if(this.pending[_4d4.name]){
return "pending";
}
if(_4d6.old===_4d3){
return _4d6.valid;
}
_4d6.old=_4d3;
var _4d7=this;
this.startRequest(_4d4);
var data={};
data[_4d4.name]=_4d3;
$.ajax($.extend(true,{url:_4d5,mode:"abort",port:"validate"+_4d4.name,dataType:"json",data:data,success:function(_4d8){
_4d7.settings.messages[_4d4.name].remote=_4d6.originalMessage;
var _4d9=_4d8===true;
if(_4d9){
var _4da=_4d7.formSubmitted;
_4d7.prepareElement(_4d4);
_4d7.formSubmitted=_4da;
_4d7.successList.push(_4d4);
_4d7.showErrors();
}else{
var _4db={};
var _4dc=_4d8||_4d7.defaultMessage(_4d4,"remote");
_4db[_4d4.name]=_4d6.message=$.isFunction(_4dc)?_4dc(_4d3):_4dc;
_4d7.showErrors(_4db);
}
_4d6.valid=_4d9;
_4d7.stopRequest(_4d4,_4d9);
}},_4d5));
return "pending";
},minlength:function(_4dd,_4de,_4df){
return this.optional(_4de)||this.getLength($.trim(_4dd),_4de)>=_4df;
},maxlength:function(_4e0,_4e1,_4e2){
return this.optional(_4e1)||this.getLength($.trim(_4e0),_4e1)<=_4e2;
},rangelength:function(_4e3,_4e4,_4e5){
var _4e6=this.getLength($.trim(_4e3),_4e4);
return this.optional(_4e4)||(_4e6>=_4e5[0]&&_4e6<=_4e5[1]);
},min:function(_4e7,_4e8,_4e9){
return this.optional(_4e8)||_4e7>=_4e9;
},max:function(_4ea,_4eb,_4ec){
return this.optional(_4eb)||_4ea<=_4ec;
},range:function(_4ed,_4ee,_4ef){
return this.optional(_4ee)||(_4ed>=_4ef[0]&&_4ed<=_4ef[1]);
},email:function(_4f0,_4f1){
return this.optional(_4f1)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_4f0);
},url:function(_4f2,_4f3){
return this.optional(_4f3)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_4f2);
},date:function(_4f4,_4f5){
return this.optional(_4f5)||!/Invalid|NaN/.test(new Date(_4f4));
},dateISO:function(_4f6,_4f7){
return this.optional(_4f7)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_4f6);
},number:function(_4f8,_4f9){
return this.optional(_4f9)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_4f8);
},digits:function(_4fa,_4fb){
return this.optional(_4fb)||/^\d+$/.test(_4fa);
},creditcard:function(_4fc,_4fd){
if(this.optional(_4fd)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_4fc)){
return false;
}
var _4fe=0,_4ff=0,_500=false;
_4fc=_4fc.replace(/\D/g,"");
for(var n=_4fc.length-1;n>=0;n--){
var _501=_4fc.charAt(n);
var _4ff=parseInt(_501,10);
if(_500){
if((_4ff*=2)>9){
_4ff-=9;
}
}
_4fe+=_4ff;
_500=!_500;
}
return (_4fe%10)==0;
},accept:function(_502,_503,_504){
_504=typeof _504=="string"?_504.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_503)||_502.match(new RegExp(".("+_504+")$","i"));
},equalTo:function(_505,_506,_507){
var _508=$(_507).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_506).valid();
});
return $.trim(_505)==$.trim(_508.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _509={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_50a,_50b,xhr){
var port=_50a.port;
if(_50a.mode=="abort"){
if(_509[port]){
_509[port].abort();
}
_509[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_50c){
var mode=("mode" in _50c?_50c:$.ajaxSettings).mode,port=("port" in _50c?_50c:$.ajaxSettings).port;
if(mode=="abort"){
if(_509[port]){
_509[port].abort();
}
return (_509[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_50d,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_50d,_50e,true);
},teardown:function(){
this.removeEventListener(_50d,_50e,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _50e(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_50f,type,_510){
return this.bind(type,function(_511){
var _512=$(_511.target);
if(_512.is(_50f)){
return _510.apply(_512,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_513,_514,_515){
return this.optional(_514)||this.getLength(jq.trim(_513),_514)==_515;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_516,_517,_518){
if(!this.depend(_518,_517)){
return "dependency-mismatch";
}
switch(_517.nodeName.toLowerCase()){
case "select":
var val=jq(_517).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_517)){
return this.getLength(_516,_517)==0;
}
default:
return jq.trim(_516).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_519,_51a){
if(!this.depend(_51a,_519)){
return "dependency-mismatch";
}
var _51b=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_51b=true;
}else{
var _51c=ssn.split("-");
if(_51c[0]=="000"||_51c[1]=="00"||_51c[2]=="0000"){
_51b=true;
}
if(_51c[0]=="666"){
_51b=true;
}
var _51d=parseInt(_51c[0],10);
if(_51d>=900){
if(_51c[1][0]!=7&&_51c[1][0]!=8){
_51b=true;
}
}
}
return !_51b;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_51e,_51f,_520){
if(!this.depend(_520,_51f)){
return "dependency-mismatch";
}
return _51e.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_521,_522){
if(!this.depend(_522,_521)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_523,_524,_525){
var _523=jq.trim(_523);
if(_523.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _526=_523.split("-");
var m=1*_526[0]-1;
var d=1*_526[1];
var y=1*_526[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_527,_528,_529){
return jq.trim(_527).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
(function(_52a,$,_52b){
"use strict";
var _52c=$.event,_52d;
_52c.special.smartresize={setup:function(){
$(this).bind("resize",_52c.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_52c.special.smartresize.handler);
},handler:function(_52e,_52f){
var _530=this,args=arguments;
_52e.type="smartresize";
if(_52d){
clearTimeout(_52d);
}
_52d=setTimeout(function(){
jQuery.event.handle.apply(_530,args);
},_52f==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_531,_532){
this.element=$(_532);
this._create(_531);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_533){
var _534=this.options.itemSelector;
return !_534?_533:_533.filter(_534).add(_533.find(_534));
},_getBricks:function(_535){
var _536=this._filterFindBricks(_535).css({position:"absolute"}).addClass("masonry-brick");
return _536;
},_create:function(_537){
this.options=$.extend(true,{},$.Mason.settings,_537);
this.styleQueue=[];
var _538=this.element[0].style;
this.originalStyle={height:_538.height||""};
var _539=this.options.containerStyle;
for(var prop in _539){
this.originalStyle[prop]=_538[prop]||"";
}
this.element.css(_539);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _53a=this;
setTimeout(function(){
_53a.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_52a).bind("smartresize.masonry",function(){
_53a.resize();
});
}
this.reloadItems();
},_init:function(_53b){
this._getColumns();
this._reLayout(_53b);
},option:function(key,_53c){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_53d,_53e){
for(var i=0,len=_53d.length;i<len;i++){
this._placeBrick(_53d[i]);
}
var _53f={};
_53f.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _540=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_540++;
}
_53f.width=(this.cols-_540)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_53f});
var _541=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_542=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_541](obj.style,_542);
}
this.styleQueue=[];
if(_53e){
_53e.call(_53d);
}
this.isLaidOut=true;
},_getColumns:function(){
var _543=this.options.isFitWidth?this.element.parent():this.element,_544=_543.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_544):this.options.columnWidth||this.$bricks.outerWidth(true)||_544;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_544+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_545){
var _546=$(_545),_547,_548,_549,_54a,j;
_547=Math.ceil(_546.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_547=Math.min(_547,this.cols);
if(_547===1){
_549=this.colYs;
}else{
_548=this.cols+1-_547;
_549=[];
for(j=0;j<_548;j++){
_54a=this.colYs.slice(j,j+_547);
_549[j]=Math.max.apply(Math,_54a);
}
}
var _54b=Math.min.apply(Math,_549),_54c=0;
for(var i=0,len=_549.length;i<len;i++){
if(_549[i]===_54b){
_54c=i;
break;
}
}
var _54d={top:_54b+this.offset.y};
_54d[this.horizontalDirection]=this.columnWidth*_54c+this.offset.x;
this.styleQueue.push({$el:_546,style:_54d});
var _54e=_54b+_546.outerHeight(true),_54f=this.cols+1-len;
for(i=0;i<_54f;i++){
this.colYs[_54c+i]=_54e;
}
},resize:function(){
var _550=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_550){
this._reLayout();
}
},_reLayout:function(_551){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_551);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_552){
this.reloadItems();
this._init(_552);
},appended:function(_553,_554,_555){
if(_554){
this._filterFindBricks(_553).css({top:this.element.height()});
var _556=this;
setTimeout(function(){
_556._appended(_553,_555);
},1);
}else{
this._appended(_553,_555);
}
},_appended:function(_557,_558){
var _559=this._getBricks(_557);
this.$bricks=this.$bricks.add(_559);
this.layout(_559,_558);
},remove:function(_55a){
this.$bricks=this.$bricks.not(_55a);
_55a.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _55b=this.element[0].style;
for(var prop in this.originalStyle){
_55b[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_52a).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_55c){
var _55d=this,_55e=_55d.find("img").add(_55d.filter("img")),len=_55e.length,_55f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_560=[];
function _561(){
_55c.call(_55d,_55e);
};
function _562(_563){
var img=_563.target;
if(img.src!==_55f&&$.inArray(img,_560)===-1){
_560.push(img);
if(--len<=0){
setTimeout(_561);
_55e.unbind(".imagesLoaded",_562);
}
}
};
if(!len){
_561();
}
_55e.bind("load.imagesLoaded error.imagesLoaded",_562).each(function(){
var src=this.src;
this.src=_55f;
this.src=src;
});
return _55d;
};
var _564=function(_565){
if(_52a.console){
_52a.console.error(_565);
}
};
$.fn.masonry=function(_566){
if(typeof _566==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _567=$.data(this,"masonry");
if(!_567){
_564("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_566+"'");
return;
}
if(!$.isFunction(_567[_566])||_566.charAt(0)==="_"){
_564("no such method '"+_566+"' for masonry instance");
return;
}
_567[_566].apply(_567,args);
});
}else{
this.each(function(){
var _568=$.data(this,"masonry");
if(_568){
_568.option(_566||{});
_568._init();
}else{
$.data(this,"masonry",new $.Mason(_566,this));
}
});
}
return this;
};
})(window,jQuery);
(function(_569,$,_56a){
$.infinitescroll=function infscr(_56b,_56c,_56d){
this.element=$(_56d);
if(!this._create(_56b,_56c)){
this.failed=true;
}
};
$.infinitescroll.defaults={loading:{finished:_56a,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"http://www.infinite-scroll.com/loading.gif",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:"fast",start:_56a},state:{isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,currPage:1},callback:_56a,debug:false,behavior:_56a,binder:$(_569),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:_56a,dataType:"html",appendCallback:true,bufferPx:40,errorCallback:function(){
},infid:0,pixelsFromNavToBottom:_56a,path:_56a,pageLimit:false};
$.infinitescroll.prototype={_binding:function infscr_binding(_56e){
var _56f=this,opts=_56f.options;
opts.v="2.0b2.111027";
if(!!opts.behavior&&this["_binding_"+opts.behavior]!==_56a){
this["_binding_"+opts.behavior].call(this);
return;
}
if(_56e!=="bind"&&_56e!=="unbind"){
this._debug("Binding value  "+_56e+" not valid");
return false;
}
if(_56e=="unbind"){
(this.options.binder).unbind("smartscroll.infscr."+_56f.options.infid);
}else{
(this.options.binder)[_56e]("smartscroll.infscr."+_56f.options.infid,function(){
_56f.scroll();
});
}
this._debug("Binding",_56e);
},_create:function infscr_create(_570,_571){
var opts=$.extend(true,{},$.infinitescroll.defaults,_570);
if(!this._validate(_570)){
return false;
}
this.options=opts;
var path=$(opts.nextSelector).attr("href");
if(!path){
this._debug("Navigation selector not found");
return false;
}
opts.path=this._determinepath(path);
opts.contentSelector=opts.contentSelector||this.element;
opts.loading.selector=opts.loading.selector||opts.contentSelector;
opts.loading.msg=$("<div id=\"infscr-loading\"><img alt=\"Loading...\" src=\""+opts.loading.img+"\" /><div>"+opts.loading.msgText+"</div></div>");
(new Image()).src=opts.loading.img;
opts.pixelsFromNavToBottom=$(document).height()-$(opts.navSelector).offset().top;
opts.loading.start=opts.loading.start||function(){
$(opts.navSelector).hide();
opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed,function(){
beginAjax(opts);
});
};
opts.loading.finished=opts.loading.finished||function(){
opts.loading.msg.fadeOut("normal");
};
opts.callback=function(_572,data){
if(!!opts.behavior&&_572["_callback_"+opts.behavior]!==_56a){
_572["_callback_"+opts.behavior].call($(opts.contentSelector)[0],data);
}
if(_571){
_571.call($(opts.contentSelector)[0],data,opts);
}
};
this._setup();
return true;
},_debug:function infscr_debug(){
if(this.options&&this.options.debug){
return _569.console&&console.log.call(console,arguments);
}
},_determinepath:function infscr_determinepath(path){
var opts=this.options;
if(!!opts.behavior&&this["_determinepath_"+opts.behavior]!==_56a){
this["_determinepath_"+opts.behavior].call(this,path);
return;
}
if(!!opts.pathParse){
this._debug("pathParse manual");
return opts.pathParse(path,this.options.state.currPage+1);
}else{
if(path.match(/^(.*?)\b2\b(.*?$)/)){
path=path.match(/^(.*?)\b2\b(.*?$)/).slice(1);
}else{
if(path.match(/^(.*?)2(.*?$)/)){
if(path.match(/^(.*?page=)2(\/.*|$)/)){
path=path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
return path;
}
path=path.match(/^(.*?)2(.*?$)/).slice(1);
}else{
if(path.match(/^(.*?page=)1(\/.*|$)/)){
path=path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
return path;
}else{
this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
opts.state.isInvalidPage=true;
}
}
}
}
this._debug("determinePath",path);
return path;
},_error:function infscr_error(xhr){
var opts=this.options;
if(!!opts.behavior&&this["_error_"+opts.behavior]!==_56a){
this["_error_"+opts.behavior].call(this,xhr);
return;
}
if(xhr!=="destroy"&&xhr!=="end"){
xhr="unknown";
}
this._debug("Error",xhr);
if(xhr=="end"){
this._showdonemsg();
}
opts.state.isDone=true;
opts.state.currPage=1;
opts.state.isPaused=false;
this._binding("unbind");
},_loadcallback:function infscr_loadcallback(box,data){
var opts=this.options,_573=this.options.callback,_574=(opts.state.isDone)?"done":(!opts.appendCallback)?"no-append":"append",frag;
if(!!opts.behavior&&this["_loadcallback_"+opts.behavior]!==_56a){
this["_loadcallback_"+opts.behavior].call(this,box,data);
return;
}
switch(_574){
case "done":
this._showdonemsg();
return false;
break;
case "no-append":
if(opts.dataType=="html"){
data="<div>"+data+"</div>";
data=$(data).find(opts.itemSelector);
}
break;
case "append":
var _575=box.children();
if(_575.length==0){
return this._error("end");
}
frag=document.createDocumentFragment();
while(box[0].firstChild){
frag.appendChild(box[0].firstChild);
}
this._debug("contentSelector",$(opts.contentSelector)[0]);
$(opts.contentSelector)[0].appendChild(frag);
data=_575.get();
break;
}
opts.loading.finished.call($(opts.contentSelector)[0],opts);
if(opts.animate){
var _576=$(_569).scrollTop()+$("#infscr-loading").height()+opts.extraScrollPx+"px";
$("html,body").animate({scrollTop:_576},800,function(){
opts.state.isDuringAjax=false;
});
}
if(!opts.animate){
opts.state.isDuringAjax=false;
}
_573(this,data);
},_nearbottom:function infscr_nearbottom(){
var opts=this.options,_577=0+$(document).height()-(opts.binder.scrollTop())-$(_569).height();
if(!!opts.behavior&&this["_nearbottom_"+opts.behavior]!==_56a){
return this["_nearbottom_"+opts.behavior].call(this);
}
this._debug("math:",_577,opts.pixelsFromNavToBottom);
return (_577-opts.bufferPx<opts.pixelsFromNavToBottom);
},_pausing:function infscr_pausing(_578){
var opts=this.options;
if(!!opts.behavior&&this["_pausing_"+opts.behavior]!==_56a){
this["_pausing_"+opts.behavior].call(this,_578);
return;
}
if(_578!=="pause"&&_578!=="resume"&&_578!==null){
this._debug("Invalid argument. Toggling pause value instead");
}
_578=(_578&&(_578=="pause"||_578=="resume"))?_578:"toggle";
switch(_578){
case "pause":
opts.state.isPaused=true;
break;
case "resume":
opts.state.isPaused=false;
break;
case "toggle":
opts.state.isPaused=!opts.state.isPaused;
break;
}
this._debug("Paused",opts.state.isPaused);
return false;
},_setup:function infscr_setup(){
var opts=this.options;
if(!!opts.behavior&&this["_setup_"+opts.behavior]!==_56a){
this["_setup_"+opts.behavior].call(this);
return;
}
this._binding("bind");
return false;
},_showdonemsg:function infscr_showdonemsg(){
var opts=this.options;
if(!!opts.behavior&&this["_showdonemsg_"+opts.behavior]!==_56a){
this["_showdonemsg_"+opts.behavior].call(this);
return;
}
opts.loading.msg.find("img").hide().parent().find("div").html(opts.loading.finishedMsg).animate({opacity:1},2000,function(){
$(this).parent().fadeOut("normal");
});
opts.errorCallback.call($(opts.contentSelector)[0],"done");
},_validate:function infscr_validate(opts){
for(var key in opts){
if(key.indexOf&&key.indexOf("Selector")>-1&&$(opts[key]).length===0){
this._debug("Your "+key+" found no elements.");
return false;
}
}
return true;
},bind:function infscr_bind(){
this._binding("bind");
},destroy:function infscr_destroy(){
this.options.state.isDestroyed=true;
return this._error("destroy");
},pause:function infscr_pause(){
this._pausing("pause");
},resume:function infscr_resume(){
this._pausing("resume");
},retrieve:function infscr_retrieve(_579){
var _57a=this,opts=_57a.options,path=opts.path,box,frag,_57b,_57c,_57d,_579=_579||null,_57e=(!!_579)?_579:opts.state.currPage;
beginAjax=function infscr_ajax(opts){
opts.state.currPage++;
_57a._debug("heading into ajax",path);
box=$(opts.contentSelector).is("table")?$("<tbody/>"):$("<div/>");
_57b=path.join(opts.state.currPage);
_57c=(opts.dataType=="html"||opts.dataType=="json")?opts.dataType:"html+callback";
if(opts.appendCallback&&opts.dataType=="html"){
_57c+="+callback";
}
switch(_57c){
case "html+callback":
_57a._debug("Using HTML via .load() method");
box.load(_57b+" "+opts.itemSelector,null,function infscr_ajax_callback(_57f){
_57a._loadcallback(box,_57f);
});
break;
case "html":
case "json":
_57a._debug("Using "+(_57c.toUpperCase())+" via $.ajax() method");
$.ajax({url:_57b,dataType:opts.dataType,complete:function infscr_ajax_callback(_580,_581){
_57d=(typeof (_580.isResolved)!=="undefined")?(_580.isResolved()):(_581==="success"||_581==="notmodified");
(_57d)?_57a._loadcallback(box,_580.responseText):_57a._error("end");
}});
break;
}
};
if(!!opts.behavior&&this["retrieve_"+opts.behavior]!==_56a){
this["retrieve_"+opts.behavior].call(this,_579);
return;
}
if(opts.state.isDestroyed){
this._debug("Instance is destroyed");
return false;
}
opts.state.isDuringAjax=true;
opts.loading.start.call($(opts.contentSelector)[0],opts);
},scroll:function infscr_scroll(){
var opts=this.options,_582=opts.state;
if(!!opts.behavior&&this["scroll_"+opts.behavior]!==_56a){
this["scroll_"+opts.behavior].call(this);
return;
}
if(_582.isDuringAjax||_582.isInvalidPage||_582.isDone||_582.isDestroyed||_582.isPaused||(opts.pageLimit&&_582.currPage>=opts.pageLimit)){
return;
}
if(!this._nearbottom()){
return;
}
this.retrieve();
},toggle:function infscr_toggle(){
this._pausing();
},unbind:function infscr_unbind(){
this._binding("unbind");
},update:function infscr_options(key){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
}};
$.fn.infinitescroll=function infscr_init(_583,_584){
var _585=typeof _583;
switch(_585){
case "string":
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _586=$.data(this,"infinitescroll");
if(!_586){
return false;
}
if(!$.isFunction(_586[_583])||_583.charAt(0)==="_"){
return false;
}
_586[_583].apply(_586,args);
});
break;
case "object":
this.each(function(){
var _587=$.data(this,"infinitescroll");
if(_587){
_587.update(_583);
}else{
_587=new $.infinitescroll(_583,_584,this);
if(!_587.failed){
$.data(this,"infinitescroll",_587);
}
}
});
break;
}
return this;
};
var _588=$.event,_589;
_588.special.smartscroll={setup:function(){
$(this).bind("scroll",_588.special.smartscroll.handler);
},teardown:function(){
$(this).unbind("scroll",_588.special.smartscroll.handler);
},handler:function(_58a,_58b){
var _58c=this,args=arguments;
_58a.type="smartscroll";
if(_589){
clearTimeout(_589);
}
_589=setTimeout(function(){
$.event.handle.apply(_58c,args);
},_58b==="execAsap"?0:100);
}};
$.fn.smartscroll=function(fn){
return fn?this.bind("smartscroll",fn):this.trigger("smartscroll",["execAsap"]);
};
})(window,jQuery);
(function($){
$.fn.checkLikeRadio=function(){
var that=this;
this.each(function(){
$(this).click(function(){
if($(this).attr("checked")){
var _58d=$(this);
$(that).each(function(){
if($(this)[0]!==_58d[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_58e){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _58e=="function"){
_58e={success:_58e};
}
var _58f=this.attr("action");
var url=(typeof _58f==="string")?$.trim(_58f):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_58e=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_58e);
var veto={};
this.trigger("form-pre-serialize",[this,_58e,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_58e.beforeSerialize&&_58e.beforeSerialize(this,_58e)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_58e.semantic);
if(_58e.data){
_58e.extraData=_58e.data;
for(n in _58e.data){
if(_58e.data[n] instanceof Array){
for(var k in _58e.data[n]){
a.push({name:n,value:_58e.data[n][k]});
}
}else{
v=_58e.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_58e.beforeSubmit&&_58e.beforeSubmit(a,this,_58e)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_58e,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_58e.type.toUpperCase()=="GET"){
_58e.url+=(_58e.url.indexOf("?")>=0?"&":"?")+q;
_58e.data=null;
}else{
_58e.data=q;
}
var _590=this,_591=[];
if(_58e.resetForm){
_591.push(function(){
_590.resetForm();
});
}
if(_58e.clearForm){
_591.push(function(){
_590.clearForm();
});
}
if(!_58e.dataType&&_58e.target){
var _592=_58e.success||function(){
};
_591.push(function(data){
var fn=_58e.replaceTarget?"replaceWith":"html";
$(_58e.target)[fn](data).each(_592,arguments);
});
}else{
if(_58e.success){
_591.push(_58e.success);
}
}
_58e.success=function(data,_593,xhr){
var _594=_58e.context||_58e;
for(var i=0,max=_591.length;i<max;i++){
_591[i].apply(_594,[data,_593,xhr||_590,_590]);
}
};
var _595=$("input:file",this).length>0;
var mp="multipart/form-data";
var _596=(_590.attr("enctype")==mp||_590.attr("encoding")==mp);
if(_58e.iframe!==false&&(_595||_58e.iframe||_596)){
if(_58e.closeKeepAlive){
$.get(_58e.closeKeepAlive,_597);
}else{
_597();
}
}else{
$.ajax(_58e);
}
this.trigger("form-submit-notify",[this,_58e]);
return this;
function _597(){
var form=_590[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_58e);
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
var _598=0;
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
function _599(){
var t=_590.attr("target"),a=_590.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_590.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_598=true;
cb();
},s.timeout);
}
var _59a=[];
try{
if(s.extraData){
for(var n in s.extraData){
_59a.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_590.removeAttr("target");
}
$(_59a).remove();
}
};
if(s.forceSync){
_599();
}else{
setTimeout(_599,10);
}
var data,doc,_59b=50;
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
if(_598){
throw "timeout";
}
var _59c=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_59c);
if(!_59c&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_59b){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_59d){
var _59e={"content-type":s.dataType};
return _59e[_59d];
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
xhr.responseXML=_59f(xhr.responseText);
}
}
data=_5a1(xhr,s.dataType,s);
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
var _59f=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _5a0=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _5a1=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_5a0(data);
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
$.fn.ajaxForm=function(_5a2){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_5a2);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_5a2);
}
}).bind("click.form-plugin",function(e){
var _5a3=e.target;
var $el=$(_5a3);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_5a3=t[0];
}
var form=this;
form.clk=_5a3;
if(_5a3.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _5a4=$el.offset();
form.clk_x=e.pageX-_5a4.left;
form.clk_y=e.pageY-_5a4.top;
}else{
form.clk_x=e.pageX-_5a3.offsetLeft;
form.clk_y=e.pageY-_5a3.offsetTop;
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
$.fn.formToArray=function(_5a5){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_5a5?form.getElementsByTagName("*"):form.elements;
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
if(_5a5&&form.clk&&el.type=="image"){
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
if(!_5a5&&form.clk){
var _5a6=$(form.clk),_5a7=_5a6[0];
n=_5a7.name;
if(n&&!_5a7.disabled&&_5a7.type=="image"){
a.push({name:n,value:_5a6.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_5a8){
return $.param(this.formToArray(_5a8));
};
$.fn.fieldSerialize=function(_5a9){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_5a9);
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
$.fn.fieldValue=function(_5aa){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_5aa);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_5ab){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_5ab===undefined){
_5ab=true;
}
if(_5ab&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _5ac=el.selectedIndex;
if(_5ac<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_5ac+1:ops.length);
for(var i=(one?_5ac:0);i<max;i++){
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
$.fn.selected=function(_5ad){
if(_5ad===undefined){
_5ad=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_5ad;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_5ad&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_5ad;
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
$.fn.extend({accordion:function(_5ae,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _5ae=="string"){
var _5af=$.data(this,"ui-accordion");
_5af[_5ae].apply(_5af,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_5ae));
}
}
});
},activate:function(_5b0){
return this.accordion("activate",_5b0);
}});
$.ui.accordion=function(_5b1,_5b2){
this.options=_5b2=$.extend({},$.ui.accordion.defaults,_5b2);
this.element=_5b1;
$(_5b1).addClass("ui-accordion");
if(_5b2.navigation){
var _5b3=$(_5b1).find("a").filter(_5b2.navigationFilter);
if(_5b3.length){
if(_5b3.filter(_5b2.header).length){
_5b2.active=_5b3;
}else{
_5b2.active=_5b3.parent().parent().prev();
_5b3.addClass("current");
}
}
}
_5b2.headers=$(_5b1).find(_5b2.header);
_5b2.active=_5b4(_5b2.headers,_5b2.active);
if(_5b2.fillSpace){
var _5b5=$(_5b1).parent().height();
_5b2.headers.each(function(){
_5b5-=$(this).outerHeight();
});
var _5b6=0;
_5b2.headers.next().each(function(){
_5b6=Math.max(_5b6,$(this).innerHeight()-$(this).height());
}).height(_5b5-_5b6);
}else{
if(_5b2.autoheight){
var _5b5=0;
_5b2.headers.next().each(function(){
_5b5=Math.max(_5b5,$(this).outerHeight());
}).height(_5b5);
}
}
_5b2.headers.not(_5b2.active||"").next().hide();
_5b2.active.parent().andSelf().addClass(_5b2.selectedClass);
if(_5b2.event){
$(_5b1).bind((_5b2.event)+".ui-accordion",_5b7);
}
};
$.ui.accordion.prototype={activate:function(_5b8){
_5b7.call(this.element,{target:_5b4(this.options.headers,_5b8)[0]});
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
function _5b9(_5ba,_5bb){
return function(){
return _5ba.apply(_5bb,arguments);
};
};
function _5bc(_5bd){
if(!$.data(this,"ui-accordion")){
return;
}
var _5be=$.data(this,"ui-accordion");
var _5bf=_5be.options;
_5bf.running=_5bd?0:--_5bf.running;
if(_5bf.running){
return;
}
if(_5bf.clearStyle){
_5bf.toShow.add(_5bf.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_5bf.data],_5bf.change);
};
function _5c0(_5c1,_5c2,data,_5c3,down){
var _5c4=$.data(this,"ui-accordion").options;
_5c4.toShow=_5c1;
_5c4.toHide=_5c2;
_5c4.data=data;
var _5c5=_5b9(_5bc,this);
_5c4.running=_5c2.size()==0?_5c1.size():_5c2.size();
if(_5c4.animated){
if(!_5c4.alwaysOpen&&_5c3){
$.ui.accordion.animations[_5c4.animated]({toShow:jQuery([]),toHide:_5c2,complete:_5c5,down:down,autoheight:_5c4.autoheight});
}else{
$.ui.accordion.animations[_5c4.animated]({toShow:_5c1,toHide:_5c2,complete:_5c5,down:down,autoheight:_5c4.autoheight});
}
}else{
if(!_5c4.alwaysOpen&&_5c3){
_5c1.toggle();
}else{
_5c2.hide();
_5c1.show();
}
_5c5(true);
}
};
function _5b7(_5c6){
var _5c7=$.data(this,"ui-accordion").options;
if(_5c7.disabled){
return false;
}
if(!_5c6.target&&!_5c7.alwaysOpen){
_5c7.active.parent().andSelf().toggleClass(_5c7.selectedClass);
var _5c8=_5c7.active.next(),data={instance:this,options:_5c7,newHeader:jQuery([]),oldHeader:_5c7.active,newContent:jQuery([]),oldContent:_5c8},_5c9=_5c7.active=$([]);
_5c0.call(this,_5c9,_5c8,data);
return false;
}
var _5ca=$(_5c6.target);
if(_5ca.parents(_5c7.header).length){
while(!_5ca.is(_5c7.header)){
_5ca=_5ca.parent();
}
}
var _5cb=_5ca[0]==_5c7.active[0];
if(_5c7.running||(_5c7.alwaysOpen&&_5cb)){
return false;
}
if(!_5ca.is(_5c7.header)){
return;
}
_5c7.active.parent().andSelf().toggleClass(_5c7.selectedClass);
if(!_5cb){
_5ca.parent().andSelf().addClass(_5c7.selectedClass);
}
var _5c9=_5ca.next(),_5c8=_5c7.active.next(),data={instance:this,options:_5c7,newHeader:_5ca,oldHeader:_5c7.active,newContent:_5c9,oldContent:_5c8},down=_5c7.headers.index(_5c7.active[0])>_5c7.headers.index(_5ca[0]);
_5c7.active=_5cb?$([]):_5ca;
_5c0.call(this,_5c9,_5c8,data,_5cb,down);
return false;
};
function _5b4(_5cc,_5cd){
return _5cd!=undefined?typeof _5cd=="number"?_5cc.filter(":eq("+_5cd+")"):_5cc.not(_5cc.not(_5cd)):_5cd===false?$([]):_5cc.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_5ce,_5cf){
_5ce=$.extend({easing:"swing",duration:300},_5ce,_5cf);
if(!_5ce.toHide.size()){
_5ce.toShow.animate({height:"show"},_5ce);
return;
}
var _5d0=_5ce.toHide.height(),_5d1=_5ce.toShow.height(),_5d2=_5d1/_5d0;
_5ce.toShow.css({height:0,overflow:"hidden"}).show();
_5ce.toHide.filter(":hidden").each(_5ce.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _5d3=(_5d0-now)*_5d2;
if($.browser.msie||$.browser.opera){
_5d3=Math.ceil(_5d3);
}
_5ce.toShow.height(_5d3);
},duration:_5ce.duration,easing:_5ce.easing,complete:function(){
if(!_5ce.autoheight){
_5ce.toShow.css("height","auto");
}
_5ce.complete();
}});
},bounceslide:function(_5d4){
this.slide(_5d4,{easing:_5d4.down?"bounceout":"swing",duration:_5d4.down?1000:200});
},easeslide:function(_5d5){
this.slide(_5d5,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_5d6,_5d7,wrap,_5d8,_5d9,_5da,_5db,_5dc,_5dd=0,_5de={},_5df=[],_5e0=0,_5e1={},_5e2=[],_5e3=null,_5e4=new Image(),_5e5=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_5e6=/[^\.]\.(swf)\s*$/i,_5e7,_5e8=1,_5e9,_5ea,busy=false,_5eb=20,fx=$.extend($("<div/>")[0],{prop:0}),_5ec=0,_5ed=!$.support.opacity&&!window.XMLHttpRequest,_5ee=function(){
_5d6.hide();
_5e4.onerror=_5e4.onload=null;
if(_5e3){
_5e3.abort();
}
tmp.empty();
},_5ef=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_5f0=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_5f1=function(){
var view=_5f0(),to={},_5f2=_5e1.margin,_5f3=_5e1.autoScale,_5f4=(_5eb+_5f2)*2,_5f5=(_5eb+_5f2)*2,_5f6=(_5e1.padding*2),_5f7;
if(_5e1.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_5e1.width))/100)-(_5eb*2);
_5f3=false;
}else{
to.width=_5e1.width+_5f6;
}
if(_5e1.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_5e1.height))/100)-(_5eb*2);
_5f3=false;
}else{
to.height=_5e1.height+_5f6;
}
if(_5f3&&(to.width>(view[0]-_5f4)||to.height>(view[1]-_5f5))){
if(_5de.type=="image"||_5de.type=="swf"){
_5f4+=_5f6;
_5f5+=_5f6;
_5f7=Math.min(Math.min(view[0]-_5f4,_5e1.width)/_5e1.width,Math.min(view[1]-_5f5,_5e1.height)/_5e1.height);
to.width=Math.round(_5f7*(to.width-_5f6))+_5f6;
to.height=Math.round(_5f7*(to.height-_5f6))+_5f6;
}else{
to.width=Math.min(to.width,(view[0]-_5f4));
to.height=Math.min(to.height,(view[1]-_5f5));
}
}
to.top=view[3]+((view[1]-(to.height+(_5eb*2)))*0.5);
if(_5e1.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_5eb*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_5e1.minWidth)+(_5eb*2)))*0.5);
}
if(_5e1.autoScale===false){
to.top=Math.max(view[3]+_5f2,to.top);
to.left=Math.max(view[2]+_5f2,to.left);
}
return to;
},_5f8=function(_5f9){
if(_5f9&&_5f9.length){
switch(_5e1.titlePosition){
case "inside":
return _5f9;
case "over":
return "<span id=\"fancybox-title-over\">"+_5f9+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_5f9+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_5fa=function(){
var _5fb=_5e1.title,_5fc=_5ea.width-(_5e1.padding*2),_5fd="fancybox-title-"+_5e1.titlePosition;
$("#fancybox-title").remove();
_5ec=0;
if(_5e1.titleShow===false){
return;
}
_5fb=$.isFunction(_5e1.titleFormat)?_5e1.titleFormat(_5fb,_5e2,_5e0,_5e1):_5f8(_5fb);
if(!_5fb||_5fb===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_5fd+"\" />").css({"width":_5fc,"paddingLeft":_5e1.padding,"paddingRight":_5e1.padding}).html(_5fb).appendTo("body");
switch(_5e1.titlePosition){
case "inside":
_5ec=$("#fancybox-title").outerHeight(true)-_5e1.padding;
_5ea.height+=_5ec;
break;
case "over":
$("#fancybox-title").css("bottom",_5e1.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_5d8).hide();
},_5fe=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_5e1.enableEscapeButton){
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
if(_5e2.length>1){
wrap.bind("mousewheel.fb",function(e,_5ff){
e.preventDefault();
if(busy||_5ff===0){
return;
}
if(_5ff>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_5e1.showNavArrows){
return;
}
if((_5e1.cyclic&&_5e2.length>1)||_5e0!==0){
_5db.show();
}
if((_5e1.cyclic&&_5e2.length>1)||_5e0!=(_5e2.length-1)){
_5dc.show();
}
},_600=function(){
var href,_601;
if((_5e2.length-1)>_5e0){
href=_5e2[_5e0+1].href;
if(typeof href!=="undefined"&&href.match(_5e5)){
_601=new Image();
_601.src=href;
}
}
if(_5e0>0){
href=_5e2[_5e0-1].href;
if(typeof href!=="undefined"&&href.match(_5e5)){
_601=new Image();
_601.src=href;
}
}
},_602=function(){
_5d9.css("overflow",(_5e1.scrolling=="auto"?(_5e1.type=="image"||_5e1.type=="iframe"||_5e1.type=="swf"?"hidden":"auto"):(_5e1.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_5d9.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_5e1.hideOnContentClick){
_5d9.one("click",$.fancybox.close);
}
if(_5e1.hideOnOverlayClick){
_5d7.one("click",$.fancybox.close);
}
if(_5e1.showCloseButton){
_5da.show();
}
_5fe();
$(window).bind("resize.fb",$.fancybox.center);
if(_5e1.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_5e1.onComplete)){
_5e1.onComplete(_5e2,_5e0,_5e1);
}
busy=false;
_600();
},_603=function(pos){
var _604=Math.round(_5e9.width+(_5ea.width-_5e9.width)*pos),_605=Math.round(_5e9.height+(_5ea.height-_5e9.height)*pos),top=Math.round(_5e9.top+(_5ea.top-_5e9.top)*pos),left=Math.round(_5e9.left+(_5ea.left-_5e9.left)*pos);
wrap.css({"width":_604+"px","height":_605+"px","top":top+"px","left":left+"px"});
_604=Math.max(_604-_5e1.padding*2,0);
_605=Math.max(_605-(_5e1.padding*2+(_5ec*pos)),0);
_5d9.css({"width":_604+"px","height":_605+"px"});
if(typeof _5ea.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_606=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_607=function(){
var orig=_5de.orig?$(_5de.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_606(orig);
from={width:(pos.width+(_5e1.padding*2)),height:(pos.height+(_5e1.padding*2)),top:(pos.top-_5e1.padding-_5eb),left:(pos.left-_5e1.padding-_5eb)};
}else{
view=_5f0();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_608=function(){
_5d6.hide();
if(wrap.is(":visible")&&$.isFunction(_5e1.onCleanup)){
if(_5e1.onCleanup(_5e2,_5e0,_5e1)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_5e2=_5df;
_5e0=_5dd;
_5e1=_5de;
_5d9.get(0).scrollTop=0;
_5d9.get(0).scrollLeft=0;
if(_5e1.overlayShow){
if(_5ed){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_5d7.css({"background-color":_5e1.overlayColor,"opacity":_5e1.overlayOpacity}).unbind().show();
}
_5ea=_5f1();
_5fa();
if(wrap.is(":visible")){
$(_5da.add(_5db).add(_5dc)).hide();
var pos=wrap.position(),_609;
_5e9={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_609=(_5e9.width==_5ea.width&&_5e9.height==_5ea.height);
_5d9.fadeOut(_5e1.changeFade,function(){
var _60a=function(){
_5d9.html(tmp.contents()).fadeIn(_5e1.changeFade,_602);
};
$.event.trigger("fancybox-change");
_5d9.empty().css("overflow","hidden");
if(_609){
_5d9.css({top:_5e1.padding,left:_5e1.padding,width:Math.max(_5ea.width-(_5e1.padding*2),1),height:Math.max(_5ea.height-(_5e1.padding*2)-_5ec,1)});
_60a();
}else{
_5d9.css({top:_5e1.padding,left:_5e1.padding,width:Math.max(_5e9.width-(_5e1.padding*2),1),height:Math.max(_5e9.height-(_5e1.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_5e1.changeSpeed,easing:_5e1.easingChange,step:_603,complete:_60a});
}
});
return;
}
wrap.css("opacity",1);
if(_5e1.transitionIn=="elastic"){
_5e9=_607();
_5d9.css({top:_5e1.padding,left:_5e1.padding,width:Math.max(_5e9.width-(_5e1.padding*2),1),height:Math.max(_5e9.height-(_5e1.padding*2),1)}).html(tmp.contents());
wrap.css(_5e9).show();
if(_5e1.opacity){
_5ea.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_5e1.speedIn,easing:_5e1.easingIn,step:_603,complete:_602});
}else{
_5d9.css({top:_5e1.padding,left:_5e1.padding,width:Math.max(_5ea.width-(_5e1.padding*2),1),height:Math.max(_5ea.height-(_5e1.padding*2)-_5ec,1)}).html(tmp.contents());
wrap.css(_5ea).fadeIn(_5e1.transitionIn=="none"?0:_5e1.speedIn,_602);
}
},_60b=function(){
tmp.width(_5de.width);
tmp.height(_5de.height);
if(_5de.width=="auto"){
_5de.width=tmp.width();
}
if(_5de.height=="auto"){
_5de.height=tmp.height();
}
_608();
},_60c=function(){
busy=true;
_5de.width=_5e4.width;
_5de.height=_5e4.height;
$("<img />").attr({"id":"fancybox-img","src":_5e4.src,"alt":_5de.title}).appendTo(tmp);
_608();
},_60d=function(){
_5ee();
var obj=_5df[_5dd],href,type,_60e,str,emb,_60f,data;
_5de=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_5de:$(obj).data("fancybox")));
_60e=obj.title||$(obj).title||_5de.title||"";
if(obj.nodeName&&!_5de.orig){
_5de.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_60e===""&&_5de.orig){
_60e=_5de.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_5de.href||null;
}else{
href=_5de.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_5de.type){
type=_5de.type;
if(!href){
href=_5de.content;
}
}else{
if(_5de.content){
type="html";
}else{
if(href){
if(href.match(_5e5)){
type="image";
}else{
if(href.match(_5e6)){
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
_5de.type=type;
_5de.href=href;
_5de.title=_60e;
if(_5de.autoDimensions&&_5de.type!=="iframe"&&_5de.type!=="swf"){
_5de.width="auto";
_5de.height="auto";
}
if(_5de.modal){
_5de.overlayShow=true;
_5de.hideOnOverlayClick=false;
_5de.hideOnContentClick=false;
_5de.enableEscapeButton=false;
_5de.showCloseButton=false;
}
if($.isFunction(_5de.onStart)){
if(_5de.onStart(_5df,_5dd,_5de)===false){
busy=false;
return;
}
}
tmp.css("padding",(_5eb+_5de.padding+_5de.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_5d9.children());
});
switch(type){
case "html":
tmp.html(_5de.content);
_60b();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_5d9.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_60b();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_5e4=new Image();
_5e4.onerror=function(){
_5ef();
};
_5e4.onload=function(){
_5e4.onerror=null;
_5e4.onload=null;
_60c();
};
_5e4.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_5de.width+"\" height=\""+_5de.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_5de.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_5de.width+"\" height=\""+_5de.height+"\""+emb+"></embed></object>";
tmp.html(str);
_60b();
break;
case "ajax":
_60f=href.split("#",2);
data=_5de.ajax.data||{};
if(_60f.length>1){
href=_60f[0];
if(typeof data=="string"){
data+="&selector="+_60f[1];
}else{
data.selector=_60f[1];
}
}
busy=false;
$.fancybox.showActivity();
_5e3=$.ajax($.extend(_5de.ajax,{url:href,data:data,error:_5ef,success:function(data,_610,_611){
if(_5e3.status==200){
tmp.html(data);
_60b();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_5de.scrolling+"\" src=\""+_5de.href+"\"></iframe>").appendTo(tmp);
_608();
break;
}
},_612=function(){
if(!_5d6.is(":visible")){
clearInterval(_5e7);
return;
}
$("div",_5d6).css("top",(_5e8*-40)+"px");
_5e8=(_5e8+1)%12;
},_613=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_5d6=$("<div id=\"fancybox-loading\"><div></div></div>"),_5d7=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_5d6.addClass("fancybox-ie");
}
_5d8=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_5d8.append(_5d9=$("<div id=\"fancybox-inner\"></div>"),_5da=$("<a id=\"fancybox-close\"></a>"),_5db=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_5dc=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_5da.click($.fancybox.close);
_5d6.click($.fancybox.cancel);
_5db.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_5dc.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_5ed){
_5d7.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_5d6.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_5d8.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_614){
$(this).data("fancybox",$.extend({},_614,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_5df=[];
_5dd=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_5df.push(this);
}else{
_5df=$("a[rel="+rel+"], area[rel="+rel+"]");
_5dd=_5df.index(this);
}
_60d();
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
_5df=[];
_5dd=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_5df=jQuery.merge(_5df,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_5df.push(obj);
}
if(_5dd>_5df.length||_5dd<0){
_5dd=0;
}
_60d();
};
$.fancybox.showActivity=function(){
clearInterval(_5e7);
_5d6.show();
_5e7=setInterval(_612,66);
};
$.fancybox.hideActivity=function(){
_5d6.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_5e0+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_5e0-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_5e2.length>pos){
_5dd=pos;
_60d();
}
if(_5e1.cyclic&&_5e2.length>1&&pos<0){
_5dd=_5e2.length-1;
_60d();
}
if(_5e1.cyclic&&_5e2.length>1&&pos>=_5e2.length){
_5dd=0;
_60d();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_5ee();
if(_5de&&$.isFunction(_5de.onCancel)){
_5de.onCancel(_5df,_5dd,_5de);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_5e1&&$.isFunction(_5e1.onCleanup)){
if(_5e1.onCleanup(_5e2,_5e0,_5e1)===false){
busy=false;
return;
}
}
_5ee();
$(_5da.add(_5db).add(_5dc)).hide();
$("#fancybox-title").remove();
wrap.add(_5d9).add(_5d7).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _615(){
_5d7.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_5d9.empty();
if($.isFunction(_5e1.onClosed)){
_5e1.onClosed(_5e2,_5e0,_5e1);
}
_5e2=_5de=[];
_5e0=_5dd=0;
_5e1=_5de={};
busy=false;
};
_5d9.css("overflow","hidden");
if(_5e1.transitionOut=="elastic"){
_5e9=_607();
var pos=wrap.position();
_5ea={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_5e1.opacity){
_5ea.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_5e1.speedOut,easing:_5e1.easingOut,step:_603,complete:_615});
}else{
wrap.fadeOut(_5e1.transitionOut=="none"?0:_5e1.speedOut,_615);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_5d9.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_5e1.padding*2)+_5ec});
_5d9.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_5f0(),_616=_5e1.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_5ec)+(_5eb*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_5eb*2)))*0.5);
to.top=Math.max(view[3]+_616,to.top);
to.left=Math.max(view[2]+_616,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_613();
});
})(jQuery);
(function(_617,_618){
var _619=_617.document;
(function(){
var _61a=false,_61b=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _61c=this.prototype;
_61a=true;
var _61d=new this();
_61a=false;
for(var name in prop){
_61d[name]=typeof prop[name]=="function"&&typeof _61c[name]=="function"&&_61b.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_61c[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _61e(){
if(!_61a&&this.init){
this.init.apply(this,arguments);
}
};
_61e.prototype=_61d;
_61e.constructor=_61e;
_61e.extend=arguments.callee;
return _61e;
};
})();
var _61f=JRClass.extend({init:function(_620,_621){
if(typeof _620=="string"){
this.video=_619.getElementById(_620);
}else{
this.video=_620;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _61f.options=="object"){
_V_.merge(this.options,_61f.options);
}
if(typeof _621=="object"){
_V_.merge(this.options,_621);
}
if(this.getPreloadAttribute()!==_618){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_618){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_618){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_622){
if(this[_622+"Supported"]()){
this[_622+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_623,_624){
this.behaviors[name]=_623;
this.extend(_624);
},activateElement:function(_625,_626){
if(typeof _625=="string"){
_625=_619.getElementById(_625);
}
this.behaviors[_626].call(this,_625);
},errors:[],warnings:[],warning:function(_627){
this.warnings.push(_627);
this.log(_627);
},history:[],log:function(_628){
if(!_628){
return;
}
if(typeof _628=="string"){
_628={type:_628};
}
if(_628.type){
this.history.push(_628.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_628.type);
}
catch(e){
try{
opera.postError(_628.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_629){
if(!localStorage){
return;
}
try{
localStorage[key]=_629;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_61f.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _62a=this.video.getAttribute("preload");
if(_62a===""||_62a==="true"){
return "auto";
}
if(_62a==="false"){
return "none";
}
return _62a;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _62b=this.video.getAttribute("autoplay");
if(_62b==="false"){
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
for(var _62c in obj){
if(obj.hasOwnProperty(_62c)){
this[_62c]=obj[_62c];
}
}
}});
_61f.player=_61f.prototype;
_61f.player.extend({flashSupported:function(){
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
var _62d=_61f.flashPlayers[this.options.flashPlayer];
this.extend(_61f.flashPlayers[this.options.flashPlayer].api);
(_62d.init.context(this))();
},getFlashElement:function(){
var _62e=this.video.children;
for(var i=0,j=_62e.length;i<j;i++){
if(_62e[i].className=="vjs-flash-fallback"){
return _62e[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _62f=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_61f.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _61f.getFlashVersion()>=_62f;
}});
_61f.flashPlayers={};
_61f.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_630){
if(_630!==_618){
this.element.width=_630;
this.box.style.width=_630+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_631){
if(_631!==_618){
this.element.height=_631;
this.box.style.height=_631+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_61f.player.extend({linksSupported:function(){
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
_61f.merge=function(obj1,obj2,safe){
for(var _632 in obj2){
if(obj2.hasOwnProperty(_632)&&(!safe||!obj1.hasOwnProperty(_632))){
obj1[_632]=obj2[_632];
}
}
return obj1;
};
_61f.extend=function(obj){
this.merge(this,obj,true);
};
_61f.extend({setupAllWhenReady:function(_633){
_61f.options=_633;
_61f.DOMReady(_61f.setup);
},DOMReady:function(fn){
_61f.addToDOMReady(fn);
},setup:function(_634,_635){
var _636=false,_637=[],_638;
if(!_634||_634=="All"){
_634=_61f.getVideoJSTags();
}else{
if(typeof _634!="object"||_634.nodeType==1){
_634=[_634];
_636=true;
}
}
for(var i=0;i<_634.length;i++){
if(typeof _634[i]=="string"){
_638=_619.getElementById(_634[i]);
}else{
_638=_634[i];
}
_637.push(new _61f(_638,_635));
}
return (_636)?_637[0]:_637;
},getVideoJSTags:function(){
var _639=_619.getElementsByTagName("video"),_63a=[],_63b;
for(var i=0,j=_639.length;i<j;i++){
_63b=_639[i];
if(_63b.className.indexOf("video-js")!=-1){
_63a.push(_63b);
}
}
return _63a;
},browserSupportsVideo:function(){
if(typeof _61f.videoSupport!="undefined"){
return _61f.videoSupport;
}
_61f.videoSupport=!!_619.createElement("video").canPlayType;
return _61f.videoSupport;
},getFlashVersion:function(){
if(typeof _61f.flashVersion!="undefined"){
return _61f.flashVersion;
}
var _63c=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_63c=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _617.ActiveXObject!="undefined"){
try{
var _63d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_63d){
_63c=parseInt(_63d.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_61f.flashVersion=_63c;
return _61f.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _61f.isIPhone()||_61f.isIPad();
},iOSVersion:function(){
var _63e=navigator.userAgent.match(/OS (\d+)_/i);
if(_63e&&_63e[1]){
return _63e[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _63f=navigator.userAgent.match(/Android (\d+)\./i);
if(_63f&&_63f[1]){
return _63f[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_61f.isIE()){
_619.createElement("video");
}
_617.VideoJS=_617._V_=_61f;
_61f.player.extend({html5Supported:function(){
if(_61f.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_61f.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_61f.isAndroid()){
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
var _640=this.video.children;
for(var i=0,j=_640.length;i<j;i++){
if(_640[i].tagName.toUpperCase()=="SOURCE"){
var _641=this.video.canPlayType(_640[i].type)||this.canPlayExt(_640[i].src);
if(_641=="probably"||_641=="maybe"){
this.firstPlayableSource=_640[i];
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
var _642=src.match(/\.([^\.]+)$/);
if(_642&&_642[1]){
var ext=_642[1].toLowerCase();
if(_61f.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_61f.isIOS()){
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
},playerOnVideoProgress:function(_643){
this.setBufferedFromProgress(_643);
},setBufferedFromProgress:function(_644){
if(_644.total>0){
var _645=(_644.loaded/_644.total)*this.duration();
if(_645>this.values.bufferEnd){
this.values.bufferEnd=_645;
}
}
},iOSInterface:function(){
if(_61f.iOSVersion()<4){
this.forceTheSource();
}
if(_61f.isIPad()){
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
this.poster=_619.createElement("img");
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
var _646=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_646.length;i<j;i++){
if(_646[i].getAttribute("kind")=="subtitles"&&_646[i].getAttribute("src")){
this.subtitlesSource=_646[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_647){
var _648=_647.split("\n"),line="",_649,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_648.length;i++){
line=_V_.trim(_648[i]);
if(line){
_649={id:line,index:this.subtitles.length};
line=_V_.trim(_648[++i]);
time=line.split(" --> ");
_649.start=this.parseSubtitleTime(time[0]);
_649.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_648.length;j++){
line=_V_.trim(_648[++i]);
if(!line){
break;
}
text.push(line);
}
_649.text=text.join("<br/>");
this.subtitles.push(_649);
}
}
},parseSubtitleTime:function(_64a){
var _64b=_64a.split(":"),time=0;
time+=parseFloat(_64b[0])*60*60;
time+=parseFloat(_64b[1])*60;
var _64c=_64b[2].split(/\.|,/);
time+=parseFloat(_64c[0]);
ms=parseFloat(_64c[1]);
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
},currentTime:function(_64d){
if(_64d!==_618){
try{
this.video.currentTime=_64d;
}
catch(e){
this.warning(_61f.warnings.videoNotReady);
}
this.values.currentTime=_64d;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_618){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _64e=this.video.buffered.end(0);
if(_64e>this.values.bufferEnd){
this.values.bufferEnd=_64e;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_64f){
if(_64f!==_618){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_64f)));
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
},width:function(_650){
if(_650!==_618){
this.video.width=_650;
this.box.style.width=_650+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_651){
if(_651!==_618){
this.video.height=_651;
this.box.style.height=_651+"px";
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
this.warning(_61f.warnings.videoNotReady);
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
this.docOrigOverflow=_619.documentElement.style.overflow;
_V_.addListener(_619,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_617,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_619.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_619.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_617.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_619.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_61f.player.newBehavior("player",function(_652){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_653){
this.log(_653);
this.log(this.video.error);
},playerOnVideoPlay:function(_654){
this.hasPlayed=true;
},playerOnVideoPause:function(_655){
},playerOnVideoEnded:function(_656){
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
this.each(this.bufferedListeners,function(_657){
(_657.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_658){
this.each(this.currentTimeListeners,function(_659){
(_659.context(this))(_658||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_65a){
(_65a.context(this))();
});
}});
_61f.player.newBehavior("mouseOverVideoReporter",function(_65b){
_V_.addListener(_65b,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_65b,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_65c){
var _65d=_65c.relatedTarget;
while(_65d&&_65d!==this.box){
_65d=_65d.parentNode;
}
if(_65d!==this.box){
this.hideControlBars();
}
}});
_61f.player.newBehavior("box",function(_65e){
this.positionBox();
_V_.addClass(_65e,"vjs-paused");
this.activateElement(_65e,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_61f.player.newBehavior("poster",function(_65f){
this.activateElement(_65f,"mouseOverVideoReporter");
this.activateElement(_65f,"playButton");
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
var _660=this.video.getElementsByTagName("img");
if(_660.length>0){
this.video.poster=_660[0].src;
}
}
}});
_61f.player.newBehavior("controlBar",function(_661){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_661);
_V_.addListener(_661,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_661,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_662){
this.mouseIsOverControls=false;
}});
_61f.player.newBehavior("playToggle",function(_663){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_663);
_V_.addListener(_663,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_664){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_665){
this.each(this.elements.playToggles,function(_666){
_V_.removeClass(_666,"vjs-paused");
_V_.addClass(_666,"vjs-playing");
});
},playTogglesOnPause:function(_667){
this.each(this.elements.playToggles,function(_668){
_V_.removeClass(_668,"vjs-playing");
_V_.addClass(_668,"vjs-paused");
});
}});
_61f.player.newBehavior("playButton",function(_669){
_V_.addListener(_669,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_66a){
this.play();
}});
_61f.player.newBehavior("pauseButton",function(_66b){
_V_.addListener(_66b,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_66c){
this.pause();
}});
_61f.player.newBehavior("playProgressBar",function(_66d){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_66d);
},{updatePlayProgressBars:function(_66e){
var _66f=(_66e!==_618)?_66e/this.duration():this.currentTime()/this.duration();
if(isNaN(_66f)){
_66f=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_66f*100,2)+"%";
}
});
}});
_61f.player.newBehavior("loadProgressBar",function(_670){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_670);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_61f.player.newBehavior("currentTimeDisplay",function(_671){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_671);
},{updateCurrentTimeDisplays:function(_672){
if(!this.currentTimeDisplays){
return;
}
var time=(_672)?_672:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_61f.player.newBehavior("durationDisplay",function(_673){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_673);
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
_61f.player.newBehavior("currentTimeScrubber",function(_674){
_V_.addListener(_674,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_675,_676){
_675.preventDefault();
this.currentScrubber=_676;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_675);
_V_.addListener(_619,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_619,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_677){
this.setCurrentTimeWithScrubber(_677);
},onCurrentTimeScrubberMouseUp:function(_678){
_V_.unblockTextSelection();
_619.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_619.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_679){
var _67a=_V_.getRelativePosition(_679.pageX,this.currentScrubber);
var _67b=_67a*this.duration();
this.triggerCurrentTimeListeners(0,_67b);
if(_67b==this.duration()){
_67b=_67b-0.1;
}
this.currentTime(_67b);
}});
_61f.player.newBehavior("volumeDisplay",function(_67c){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_67c);
this.updateVolumeDisplay(_67c);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_67d){
var _67e=Math.ceil(this.volume()*6);
this.each(_67d.children,function(_67f,num){
if(num<_67e){
_V_.addClass(_67f,"vjs-volume-level-on");
}else{
_V_.removeClass(_67f,"vjs-volume-level-on");
}
});
}});
_61f.player.newBehavior("volumeScrubber",function(_680){
_V_.addListener(_680,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_681,_682){
_V_.blockTextSelection();
this.currentScrubber=_682;
this.setVolumeWithScrubber(_681);
_V_.addListener(_619,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_619,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_683){
this.setVolumeWithScrubber(_683);
},onVolumeScrubberMouseUp:function(_684){
this.setVolumeWithScrubber(_684);
_V_.unblockTextSelection();
_619.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_619.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_685){
var _686=_V_.getRelativePosition(_685.pageX,this.currentScrubber);
this.volume(_686);
}});
_61f.player.newBehavior("fullscreenToggle",function(_687){
_V_.addListener(_687,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_688){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_689){
this.positionControlBars();
},fullscreenOnEscKey:function(_68a){
if(_68a.keyCode==27){
this.exitFullScreen();
}
}});
_61f.player.newBehavior("bigPlayButton",function(_68b){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_68b);
this.activateElement(_68b,"playButton");
},{bigPlayButtonsOnPlay:function(_68c){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_68d){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_68e){
_68e.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_68f){
_68f.style.display="none";
});
}});
_61f.player.newBehavior("spinner",function(_690){
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
this.spinners.push(_690);
},{showSpinners:function(){
this.each(this.spinners,function(_691){
_691.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_692){
_692.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_693){
_693.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_693.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_694){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_695){
this.showSpinners();
},spinnersOnVideoSeeking:function(_696){
},spinnersOnVideoSeeked:function(_697){
},spinnersOnVideoCanPlay:function(_698){
},spinnersOnVideoCanPlayThrough:function(_699){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_69a){
this.showSpinners();
},spinnersOnVideoStalled:function(_69b){
},spinnersOnVideoSuspend:function(_69c){
},spinnersOnVideoPlaying:function(_69d){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_69e){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_61f.player.newBehavior("subtitlesDisplay",function(_69f){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_69f);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _6a0=false,_6a1=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_6a1)?1:0;
while(true){
if(_6a1){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_6a0=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_6a0=i;
break;
}
i++;
}
}
if(_6a0!==false){
this.currentSubtitle=this.subtitles[_6a0];
this.lastSubtitleIndex=_6a0;
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
_61f.extend({addClass:function(_6a2,_6a3){
if((" "+_6a2.className+" ").indexOf(" "+_6a3+" ")==-1){
_6a2.className=_6a2.className===""?_6a3:_6a2.className+" "+_6a3;
}
},removeClass:function(_6a4,_6a5){
if(_6a4.className.indexOf(_6a5)==-1){
return;
}
var _6a6=_6a4.className.split(/\s+/);
_6a6.splice(_6a6.lastIndexOf(_6a5),1);
_6a4.className=_6a6.join(" ");
},createElement:function(_6a7,_6a8){
return this.merge(_619.createElement(_6a7),_6a8);
},blockTextSelection:function(){
_619.body.focus();
_619.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_619.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _6a9=Math.round(secs);
var _6aa=Math.floor(_6a9/60);
_6aa=(_6aa>=10)?_6aa:"0"+_6aa;
_6a9=Math.floor(_6a9%60);
_6a9=(_6a9>=10)?_6a9:"0"+_6a9;
return _6aa+":"+_6a9;
},getRelativePosition:function(x,_6ab){
return Math.max(0,Math.min(1,(x-this.findPosX(_6ab))/_6ab.offsetWidth));
},findPosX:function(obj){
var _6ac=obj.offsetLeft;
while(obj=obj.offsetParent){
_6ac+=obj.offsetLeft;
}
return _6ac;
},getComputedStyleValue:function(_6ad,_6ae){
return _617.getComputedStyle(_6ad,null).getPropertyValue(_6ae);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_6af,type,_6b0){
if(_6af.addEventListener){
_6af.addEventListener(type,_6b0,false);
}else{
if(_6af.attachEvent){
_6af.attachEvent("on"+type,_6b0);
}
}
},removeListener:function(_6b1,type,_6b2){
if(_6b1.removeEventListener){
_6b1.removeEventListener(type,_6b2,false);
}else{
if(_6b1.attachEvent){
_6b1.detachEvent("on"+type,_6b2);
}
}
},get:function(url,_6b3){
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
var _6b4=new XMLHttpRequest();
_6b4.open("GET",url);
_6b4.onreadystatechange=function(){
if(_6b4.readyState==4&&_6b4.status==200){
_6b3(_6b4.responseText);
}
}.context(this);
_6b4.send();
},trim:function(_6b5){
return _6b5.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_619.readyState==="complete"){
return _61f.onDOMReady();
}
if(_619.addEventListener){
_619.addEventListener("DOMContentLoaded",_61f.DOMContentLoaded,false);
_617.addEventListener("load",_61f.onDOMReady,false);
}else{
if(_619.attachEvent){
_619.attachEvent("onreadystatechange",_61f.DOMContentLoaded);
_617.attachEvent("onload",_61f.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_619.addEventListener){
_619.removeEventListener("DOMContentLoaded",_61f.DOMContentLoaded,false);
_61f.onDOMReady();
}else{
if(_619.attachEvent){
if(_619.readyState==="complete"){
_619.detachEvent("onreadystatechange",_61f.DOMContentLoaded);
_61f.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_61f.DOMIsReady){
fn.call(_619);
}else{
_61f.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_61f.DOMIsReady){
return;
}
if(!_619.body){
return setTimeout(_61f.onDOMReady,13);
}
_61f.DOMIsReady=true;
if(_61f.DOMReadyList){
for(var i=0;i<_61f.DOMReadyList.length;i++){
_61f.DOMReadyList[i].call(_619);
}
_61f.DOMReadyList=null;
}
}});
_61f.bindDOMReady();
Function.prototype.context=function(obj){
var _6b6=this,temp=function(){
return _6b6.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _6b7=this,temp=function(){
var _6b8=this;
return _6b7.call(obj,arguments[0],_6b8);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_6b9){
if(this.hasContext===true){
return this;
}
if(!_6b9){
_6b9=obj;
}
for(var _6ba in _6b9){
if(_6b9[_6ba]==this){
_6b9[_6ba]=this.evtContext(obj);
_6b9[_6ba].hasContext=true;
return _6b9[_6ba];
}
}
return this.evtContext(obj);
};
if(_617.jQuery){
(function($){
$.fn.VideoJS=function(_6bb){
this.each(function(){
_61f.setup(this,_6bb);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_617.VideoJS=_617._V_=_61f;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_6bc){
var _6bd=((_6bc/15)|0)*15;
if(this.lastLoggedOffset!=_6bd&&!this.paused()){
var _6be=this.video.id.replace("hp_video_","");
var _6bf=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_6bd,videoId:_6be,rf:rf,isEmbed:_6bf}});
this.lastLoggedOffset=_6bd;
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
var _6c0=this.video.getAttribute("autostart");
if(_6c0==="false"){
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
var _6c1=document.createElement("div");
_6c1.style.height=videoTopAdjustment+"px";
_6c1.style.background="transparent";
_6c1.id="video_spacer";
v.before(_6c1);
}
var _6c2=v.offset()["top"]+v.outerHeight();
var _6c3=_6c2-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_6c3>0){
var _6c4=document.createElement("div");
_6c4.style.height=_6c3+"px";
_6c4.style.background="transparent";
_6c4.id="sidebar_spacer";
_6c4.className="sidebar_box";
sidebox.after(_6c4);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_6c5,_6c6,_6c7,exts){
jQuery(document).ready(function(){
var _6c8=0;
var _6c9={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_6c5},size_limit:_6c7,queue_limit:_6c6,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_6ca){
if(file.size==_6ca){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_6cb){
try{
var data=JSONstring.toObject(_6cb);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_6cb);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_6c8+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_6cc){
if(!_6c8&&_6cc){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_6c8=0;
},loaded_callback:function(_6cd){
if(_6cd){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _6ce=new imageUploader(_6c9);
});
};
function getHPVideoPlayer(){
var _6cf="talkiesplayer";
return $(_6cf);
};
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
}("K M;I(M)1S 2U(\"2a't 4k M 4K 2g 3l 4G 4H\");(6(){6 r(f,e){I(!M.1R(f))1S 3m(\"3s 15 4R\");K a=f.1w;f=M(f.1m,t(f)+(e||\"\"));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?\"g\":\"\")+(f.4s?\"i\":\"\")+(f.4p?\"m\":\"\")+(f.4v?\"x\":\"\")+(f.3n?\"y\":\"\")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m(\"2a't 5r 5I 5F 5B 5C 15 5E 5p\");H r(f)}I(v)1S 2U(\"2a't W 3l M 59 5m 5g 5x 5i\");e=e||\"\";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h===\"[\")b=M.2I;Y I(h===\"]\")b=M.1B;a.U(h);c++}a=15(a.1K(\"\"),n.Q.W(e,w,\"\"));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v=\"1.5.0\";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,\"\")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,\"\");H!f.12}(),y=6(){K f=/x/g;n.Q.W(\"x\",f,\"\");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,\"g\"+(E?\"y\":\"\")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+\"/\"+(e||\"\");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,\"g\")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,\"\\\\$&\")};M.5e=6(f,e,a,b){e=r(e,\"g\"+(b&&E?\"y\":\"\"));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U(\"2a't 55 1h 54 3q\")}};M.1R=6(f){H 53.Z.1q.W(f)===\"[2m 15]\"};M.3p=6(f,e,a,b){O(K c=r(e,\"g\"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,\"g\"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||\"\":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,\"\")>-1){a=15(J.1m,n.Q.W(t(J),\"g\",\"\"));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()===\"3f\"&&e.1i(\"${\")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+=\"\";I(1j e===\"6\")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+\"\";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24\"$\":H\"$\";24\"&\":H d[0];24\"`\":H d[d.L-1].1a(0,d[d.L-2]);24\"'\":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i=\"\";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||\"\":\"$\")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+\"\",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,\"\")||h)b.U(\"\")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?\"\":\"(?:)\"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H\"(\"});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H\"(\"});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?\"\\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?\"\":\"(?:)\"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]===\"[]\"?\"\\\\b\\\\B\":\"[\\\\s\\\\S]\"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H\"\"});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?\"\":\"(?:)\"},M.1B,6(){H J.2K(\"x\")});M.1h(/\\./,6(){H\"[\\\\s\\\\S]\"},M.1B,6(){H J.2K(\"s\")})})();1j 2e!=\"1d\"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=\" \"+b)}6 t(a){H a.1i(\"3e\")==0?a:\"3e\"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={\"#\":\"1c\",\".\":\"1l\"}[b.1o(0,1)]||\"3h\",g,i;g=h!=\"3h\"?b.1o(1):b.5u();I((a[h]||\"\").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g(\"4U\"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e(\"\\n\"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K(\"\\n\")}6 u(a,b){I(a==N||a.L==0||a==\"\\n\")H a;a=a.Q(/</g,\"&1y;\");a=a.Q(/ {2,}/g,6(c){O(K d=\"\",h=0;h<c.L-1;h++)d+=e.13.1W;H d+\" \"});I(b!=N)a=v(a,6(c){I(c.L==0)H\"\";K d=\"\";c=c.Q(/^(&2s;| )+/,6(h){d=h;H\"\"});I(c.L==0)H d;H d+'<17 1g=\"'+b+'\">'+c+\"</17>\"});H a}6 n(a,b){a.1e(\"\\n\");O(K c=\"\",d=0;d<50;d++)c+=\"                    \";H a=v(a,6(h){I(h.1i(\"\\t\")==-1)H h;O(K g=0;(g=h.1i(\"\\t\"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,\"\")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i==\"3f\")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d=\"\",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H'<a 2h=\"'+c+'\">'+c+\"</a>\"+d})}6 z(){O(K a=1E.36(\"1k\"),b=[],c=0;c<a.L;c++)a[c].3s==\"20\"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,\".20\",R);a=p(a,\".3O\",R);K c=1E.4i(\"3t\");I(!(!a||!b||p(a,\"3t\"))){B(b.1c);r(b,\"1m\");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K(\"\\r\");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,\"4u\",6(){c.2G.4E(c);b.1l=b.1l.Q(\"1m\",\"\")})}}I(1j 3F!=\"1d\"&&1j M==\"1d\")M=3F(\"M\").M;K e={2v:{\"1g-27\":\"\",\"2i-1s\":1,\"2z-1s-2t\":11,1M:N,1t:N,\"42-45\":R,\"43-22\":4,1u:R,16:R,\"3V-17\":R,2l:11,\"41-40\":R,2k:11,\"1z-1k\":11},13:{1W:\"&2s;\",2M:R,46:11,44:11,34:\"4n\",1x:{21:\"4o 1m\",2P:\"?\",1X:\"1v\\n\\n\",3E:\"4r't 4t 1D O: \",4g:\"4m 4B't 51 O 1z-1k 4F: \",37:'<!4T 1z 4S \"-//4V//3H 4W 1.0 4Z//4Y\" \"1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J\"><1z 4I=\"1Z://2y.3L.3K/4L/5L\"><3J><4N 1Z-4M=\"5G-5M\" 6K=\"2O/1z; 6J=6I-8\" /><1t>6L 1v</1t></3J><3B 1L=\"25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;\"><T 1L=\"2O-3D:3C;3w-32:1.6z;\"><T 1L=\"25-22:6A-6E;\">1v</T><T 1L=\"25-22:.6C;3w-6B:6R;\"><T>3v 3.0.76 (72 73 3x)</T><T><a 2h=\"1Z://3u.2w/1v\" 1F=\"38\" 1L=\"2f:#3y\">1Z://3u.2w/1v</a></T><T>70 17 6U 71.</T><T>6T 6X-3x 6Y 6D.</T></T><T>6t 61 60 J 1k, 5Z <a 2h=\"6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O\" 1L=\"2f:#3y\">5R</a> 5V <2R/>5U 5T 5S!</T></T></3B></1z>'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/\"([^\\\\\"\\n]|\\\\.)*\"/g,6o:/'([^\\\\'\\n]|\\\\.)*'/g,6p:1f M('\"([^\\\\\\\\\"]|\\\\\\\\.)*\"',\"3z\"),6s:1f M(\"'([^\\\\\\\\']|\\\\\\\\.)*'\",\"3z\"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c='<T 1g=\"16\">',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+=\"</T>\";H c},2o:6(a,b,c){H'<2W><a 2h=\"#\" 1g=\"6e 6h'+b+\" \"+b+'\">'+c+\"</a></2W>\"},2b:6(a){K b=a.1F,c=b.1l||\"\";b=B(p(b,\".20\",R).1c);K d=6(h){H(h=15(h+\"6f(\\\\w+)\").X(c))?h[1]:N}(\"6g\");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:[\"21\",\"2P\"],21:{1H:6(a){I(a.V(\"2l\")!=R)H\"\";K b=a.V(\"1t\");H e.16.2o(a,\"21\",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q(\"47\",\"\")}},2P:{2B:6(){K a=\"68=0\";a+=\", 18=\"+(31.30-33)/2+\", 32=\"+(31.2Z-2Y)/2+\", 30=33, 2Z=2Y\";a=a.Q(/^,/,\"\");a=1P.6Z(\"\",\"38\",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M(\"^\\\\[(?<2V>(.*?))\\\\]$\"),s=1f M(\"(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\\".*?\\\"|'.*?')\\\\s*;?\",\"g\");(j=s.X(k))!=N;){K o=j.1T.Q(/^['\"]|['\"]$/g,\"\");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k[\"1z-1k\"]==\"R\"||e.2v[\"1z-1k\"]==R){d=1f e.4l(j);j=\"4O\"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i(\"<![6G[\")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i(\"]]\\>\")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||\"\")!=\"\")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||\"\")!=\"\")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,\"4k\",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i=\"2F 1H 2Q\".1e(\" \");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={\"R\":R,\"11\":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]==\"2m\")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V(\"2i-1s\"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V(\"1M\",[]);I(1j b!=\"2m\"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=[\"1s\",\"6i\"+b,\"P\"+a,\"6r\"+(b%2==0?1:2).1q()];J.3U(b)&&a.U(\"67\");b==0&&a.U(\"1N\");H'<T 1g=\"'+a.1K(\" \")+'\">'+c+\"</T>\"},3Q:6(a,b){K c=\"\",d=a.1e(\"\\n\").L,h=2u(J.V(\"2i-1s\")),g=J.V(\"2z-1s-2t\");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l=\"0\"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e(\"\\n\");J.V(\"2z-1s-2t\");K d=2u(J.V(\"2i-1s\"));a=\"\";O(K h=J.V(\"1D\"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(\" \",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?'<17 1g=\"'+h+' 5N\">'+j+\"</17>\":\"\")+i)}H a},4f:6(a){H a?\"<4a>\"+a+\"</4a>\":\"\"},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+\" \":\"\"}O(K d=0,h=\"\",g=J.V(\"1D\",\"\"),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+\"48\")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+\"48\");H h},1H:6(a){K b=\"\",c=[\"20\"],d;I(J.V(\"2k\")==R)J.1n.16=J.1n.1u=11;1l=\"20\";J.V(\"2l\")==R&&c.U(\"47\");I((1u=J.V(\"1u\"))==11)c.U(\"6S\");c.U(J.V(\"1g-27\"));c.U(J.V(\"1D\"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,\"\").Q(/\\r/g,\" \");b=J.V(\"43-22\");I(J.V(\"42-45\")==R)a=n(a,b);Y{O(K h=\"\",g=0;g<b;g++)h+=\" \";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,\"\\n\");I(e.13.44==R)b=b.Q(h,\"\");b=b.1e(\"\\n\");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K(\"\\n\")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V(\"41-40\"))b=E(b);1j 2H!=\"1d\"&&2H.3S&&2H.3S.1C(/5s/)&&c.U(\"5t\");H b='<T 1c=\"'+t(J.1c)+'\" 1g=\"'+c.1K(\" \")+'\">'+(J.V(\"16\")?e.16.1H(J):\"\")+'<3Z 5z=\"0\" 5H=\"0\" 5J=\"0\">'+J.4f(J.V(\"1t\"))+\"<3T><3P>\"+(1u?'<2d 1g=\"1u\">'+J.3Q(a)+\"</2d>\":\"\")+'<2d 1g=\"17\"><T 1g=\"3O\">'+b+\"</T></2d></3P></3T></3Z></T>\"},2F:6(a){I(a===N)a=\"\";J.17=a;K b=J.3Y(\"T\");b.3X=J.1H(a);J.V(\"16\")&&w(p(b,\".16\"),\"5c\",e.16.2b);J.V(\"3V-17\")&&w(p(b,\".17\"),\"56\",f);H b},2Q:6(a){J.1c=\"\"+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V(\"2k\")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,\"\").Q(/\\s+/g,\"|\");H\"\\\\b(?:\"+a+\")\\\\b\"},5f:6(a){J.28={18:{1I:a.18,23:\"1k\"},1b:{1I:a.1b,23:\"1k\"},17:1f M(\"(?<18>\"+a.18.1m+\")(?<17>.*?)(?<1b>\"+a.1b.1m+\")\",\"5o\")}}};H e}();1j 2e!=\"1d\"&&(2e.1v=1v);",62,441,"||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|alert|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83".split("|"),0,{}));
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d0(){
var _6d1="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _6d2="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _6d3="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6d1),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_6d3),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_6d2),"gm"),css:"keyword bold"}];
};
_6d0.prototype=new SyntaxHighlighter.Highlighter();
_6d0.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_6d0;
typeof (exports)!="undefined"?exports.Brush=_6d0:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d4(){
var _6d5="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _6d6(_6d7,_6d8){
var css=(_6d7[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_6d7[0],_6d7.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_6d6},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6d5),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6d4.prototype=new SyntaxHighlighter.Highlighter();
_6d4.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_6d4;
typeof (exports)!="undefined"?exports.Brush=_6d4:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d9(){
function _6da(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _6db(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _6dc="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _6dd="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _6de="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_6da(_6dc),"gm"),css:"keyword"},{regex:new RegExp(_6db(_6dd),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_6de),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_6d9.prototype=new SyntaxHighlighter.Highlighter();
_6d9.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_6d9;
typeof (exports)!="undefined"?exports.Brush=_6d9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6df(){
var _6e0="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_6e0),"gmi"),css:"keyword"}];
};
_6df.prototype=new SyntaxHighlighter.Highlighter();
_6df.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_6df;
typeof (exports)!="undefined"?exports.Brush=_6df:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e1(){
function _6e2(_6e3,_6e4){
var _6e5=SyntaxHighlighter.Match,code=_6e3[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_6e6=[];
if(_6e3.attributes!=null){
var _6e7,_6e8=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_6e7=_6e8.exec(code))!=null){
_6e6.push(new _6e5(_6e7.name,_6e3.index+_6e7.index,"color1"));
_6e6.push(new _6e5(_6e7.value,_6e3.index+_6e7.index+_6e7[0].indexOf(_6e7.value),"string"));
}
}
if(tag!=null){
_6e6.push(new _6e5(tag.name,_6e3.index+tag[0].indexOf(tag.name),"keyword"));
}
return _6e6;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_6e2}];
};
_6e1.prototype=new SyntaxHighlighter.Highlighter();
_6e1.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_6e1;
typeof (exports)!="undefined"?exports.Brush=_6e1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e9(){
var _6ea="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_6ea),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_6e9.prototype=new SyntaxHighlighter.Highlighter();
_6e9.aliases=["java"];
SyntaxHighlighter.brushes.Java=_6e9;
typeof (exports)!="undefined"?exports.Brush=_6e9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6eb(){
var _6ec="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6ec),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_6eb.prototype=new SyntaxHighlighter.Highlighter();
_6eb.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_6eb;
typeof (exports)!="undefined"?exports.Brush=_6eb:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6ed(){
var _6ee="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _6ef="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _6f0="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_6ee),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_6f0),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_6ef),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_6ed.prototype=new SyntaxHighlighter.Highlighter();
_6ed.aliases=["php"];
SyntaxHighlighter.brushes.Php=_6ed;
typeof (exports)!="undefined"?exports.Brush=_6ed:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f1(){
var _6f2="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _6f3="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _6f4="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_6f3),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_6f2),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_6f4),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6f1.prototype=new SyntaxHighlighter.Highlighter();
_6f1.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_6f1;
typeof (exports)!="undefined"?exports.Brush=_6f1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f5(){
var _6f6="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _6f7="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_6f6),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_6f7),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6f5.prototype=new SyntaxHighlighter.Highlighter();
_6f5.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_6f5;
typeof (exports)!="undefined"?exports.Brush=_6f5:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f8(){
var _6f9="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _6fa="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _6fb="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_6f9),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_6fb),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_6fa),"gmi"),css:"keyword"}];
};
_6f8.prototype=new SyntaxHighlighter.Highlighter();
_6f8.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_6f8;
typeof (exports)!="undefined"?exports.Brush=_6f8:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6fc(){
var _6fd="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6fd),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6fc.prototype=new SyntaxHighlighter.Highlighter();
_6fc.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_6fc;
typeof (exports)!="undefined"?exports.Brush=_6fc:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6fe(){
function _6ff(_700,_701){
var _702=SyntaxHighlighter.Match,code=_700[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_703=[];
if(_700.attributes!=null){
var _704,_705=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_704=_705.exec(code))!=null){
_703.push(new _702(_704.name,_700.index+_704.index,"color1"));
_703.push(new _702(_704.value,_700.index+_704.index+_704[0].indexOf(_704.value),"string"));
}
}
if(tag!=null){
_703.push(new _702(tag.name,_700.index+tag[0].indexOf(tag.name),"keyword"));
}
return _703;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_6ff}];
};
_6fe.prototype=new SyntaxHighlighter.Highlighter();
_6fe.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_6fe;
typeof (exports)!="undefined"?exports.Brush=_6fe:null;
})();
function ClojureRegExp(_706){
_706=_706+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_706,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _707,_708;
while(_707=this.regex.exec(str)){
_708=str.substring(0,_707.index);
if(this.lookBehind.test(_708)){
return _707;
}else{
this.regex.lastIndex=_707.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _709=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_70a="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_70b){
_70b=_70b.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_70b=_70b.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_70b+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_709)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_70a)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _70c(){
var _70d="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _70e="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_70d),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_70e),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_70c.prototype=new SyntaxHighlighter.Highlighter();
_70c.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_70c;
typeof (exports)!="undefined"?exports.Brush=_70c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _70f(){
var _710="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _711="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_710),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_711),"gm"),css:"functions"}];
};
_70f.prototype=new SyntaxHighlighter.Highlighter();
_70f.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_70f;
typeof (exports)!="undefined"?exports.Brush=_70f:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _712(){
var _713="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_713),"gm"),css:"keyword"}];
};
_712.prototype=new SyntaxHighlighter.Highlighter();
_712.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_712;
typeof (exports)!="undefined"?exports.Brush=_712:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _714(){
var _715="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _716="void boolean byte char short int long float double";
var _717="null";
var _718="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_715),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_716),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_717),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_718),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_714.prototype=new SyntaxHighlighter.Highlighter();
_714.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_714;
typeof (exports)!="undefined"?exports.Brush=_714:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _719(){
var _71a="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _71b="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_71a),"gm"),css:"keyword"},{regex:new RegExp(_71b,"gm"),css:"keyword"}];
};
_719.prototype=new SyntaxHighlighter.Highlighter();
_719.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_719;
typeof (exports)!="undefined"?exports.Brush=_719:null;
})();
(function($){
$.fn.starrating=function(_71c){
var _71c=$.extend({},$.fn.starrating.options,_71c||{});
return this.each(function(){
var o=$.meta?$.extend({},_71c,$this.data()):_71c;
var url=this.action,_71d,_71e,_71f;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _720=div.find("div.star");
var _721=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_720.mouseover(_722).focus(_722).mouseout(_723).blur(_723).click(_724);
_721.mouseover(_725).focus(_725).mouseout(_726).blur(_726).click(_724);
}else{
_727(div);
}
_728();
function init(elem){
_71d=$(elem).attr("title").split(/:\s*/)[1],_71e=_71d.split(".")[0],_71f=_71d.split(".")[1];
};
function _722(){
_729();
fill(this);
};
function _723(){
_729();
_728();
};
function _726(){
_728();
$(this).removeClass("on");
};
function _725(){
_729();
$(this).addClass("on");
};
function _727(elem){
_720.unbind();
_721.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _72a=$(this).attr("title");
var _72b="Average Rating: "+_71d;
$(this).attr("title",_72a.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_72b).replace("Cancel Rating",_72b));
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
function _724(){
if(_720.index(this)==-1&&!o.cancelSubmit){
return false;
}
_71e=_720.index(this)+1;
_71f=0;
if(_71e==0){
_729();
}
var _72c=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_72c},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _72d=$("div."+o.ratingClass);
init(_72d);
_723();
if(o.disableOnSubmit){
_727(_72d);
}
}});
}else{
o.success(_72c);
}
return false;
};
function fill(elem){
_720.find("a").css("width","100%");
$(_720[_720.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _729(){
_720.removeClass("on hover");
};
function _728(){
$(_720[_71e-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _72e=_71f?_71f*10:0;
if(_72e>0){
$(_720[_71e]).addClass("on").children("a").css("width",_72e+"%");
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
$.fn.starrating.options={cancelSubmit:true,disabled:false,position:"-16px -16px",success:function(data){
alert("Success!");
},disableOnSubmit:false,isStatic:false,ratingClass:"rating",params:{id:1}};
})(jQuery);

