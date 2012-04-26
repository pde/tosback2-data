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
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,design:_1d6?_1d6:"default"},function(){
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
function extractParamFromUri(uri,_1f1){
if(!uri){
return;
}
var _1f2=new RegExp("[\\?&#]"+_1f1+"=([^&#]*)");
var _1f3=_1f2.exec(uri);
if(_1f3!=null){
return unescape(_1f3[1]);
}
return;
};
function displaySocialButtons(_1f4){
_1f4=_1f4||{};
var _1f5;
if(_1f4["pagepath"]){
_1f5=_1f4["pagepath"];
}
var _1f6=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_1f4["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_1f7){
FB.init({xfbml:true});
if(_1f4["newdesign"]){
setTimeout(fetchRelatedHubSocialButtons,6000);
}
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_1f8){
_gaq.push(["t2._trackSocial","facebook","like",_1f8,_1f5]);
});
FB.Event.subscribe("edge.remove",function(_1f9){
_gaq.push(["t2._trackSocial","facebook","unlike",_1f9,_1f5]);
});
FB.Event.subscribe("message.send",function(_1fa){
_gaq.push(["t2._trackSocial","facebook","send",_1fa,_1f5]);
});
FB.Event.subscribe("xfbml.render",function(){
jq(".socialbuttons").show();
if(_1f4["newdesign"]){
updateSocialButtonSetup();
}
});
};
}else{
jq(window).bind("load",function(){
jq(".socialbuttons").show();
if(_1f4["newdesign"]){
updateSocialButtonSetup();
}
});
}
if(!_1f4["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_1fb){
twttr.events.bind("tweet",function(_1fc){
if(_1fc){
var _1fd;
if(_1fc.target&&_1fc.target.nodeName=="IFRAME"){
_1fd=extractParamFromUri(_1fc.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_1fd,_1f5]);
}
});
});
}
if(!_1f4["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_1f4["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_1f6;
};
function checkViolations(_1fe){
if(_1fe){
jq(".violations_span").html("");
var _1ff={check_violation:1};
}else{
var _1ff={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_1ff,dataType:"json",success:function(_200){
if(_200.data){
jq(".violations_span").html(_200.data);
}
if(!_200.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showAskSignup(_201){
var uri=$H({btn_text:"ask!",explain:_201,show_signup:1}).toQueryString();
showAjaxOverlay("/xml/showsignup.php",uri,"linkarticle");
return false;
};
function showLinkArticle(url,_202){
var uri=$H({page_url:url,page_title:_202}).toQueryString();
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
function showEmailForm(purl,_203,_204){
var uri=$H({page_url:purl,page_type:_203,page_filter:_204}).toQueryString();
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
function showHubOverlay(url,_205,_206){
var uri=$H({url:url,addComment:_205,commentText:_206}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_207){
var uri=$H({modId:_207}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_208,_209){
var uri=$H({moduleId:_208,pollId:_209}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_20a,_20b,_20c){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_20c){
$("overlay").addClassName(_20c);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_20a,{parameters:_20b,onComplete:function(){
if(!$("fixed_title")){
return;
}
var _20d=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_20d+"px"});
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
var _20e=browser=="IE"&&version<=6;
var _20f=$("overlay");
var _210=Position.getViewportHeight();
if(_210>750){
var _211=_210-150;
}else{
var _211=_210-90;
}
var _212=_20f.getStyle("paddingTop");
var _213=_20f.getStyle("paddingBottom");
_211-=_212.substring(0,_212.length-2);
_211-=_213.substring(0,_213.length-2);
_211=Math.max(_211,100);
$("overlay").setStyle({height:_211+"px"});
if(_210>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_20e){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_20e){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _214=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_214+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_211-60)+"px",overflowY:"auto"});
}
};
function follow(_215,_216,_217,_218,_219){
var data={typeId:_215,objectId:_216,isActive:_217,printNumbers:_218,overrides:_219};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_215){
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
switch(_215){
case 1:
jQuery(".follow_question_"+_216).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_216).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_216).replaceWith(json.buttonText);
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400});
break;
case 4:
jQuery(".follow_"+_216).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_216).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButton(_21a,_21b,_21c,_21d){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_21a,objectId:_21b,printNumbers:_21c,overrides:_21d},success:function(data){
switch(_21a){
case 1:
jQuery(".follow_question_"+_21b).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_21b).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_21b).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_21b).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_21b).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_21b).replaceWith(data);
break;
}
}});
};
function expandComments(id,mm,flg,_21e){
if(flg){
var _21f=$H({mdc_id:id,modMode:mm,design:_21e}).toQueryString();
var ajax=new Ajax.Updater({success:"comment_tgt"},"/xml/comments.php",{parameters:_21f,onFailure:reportError});
}else{
$("comment_tgt").innerHTML="";
}
return false;
};
function expandRequests(id,_220){
var _221=$H({article_id:id,num_pages:_220}).toQueryString();
var ajax=new Ajax.Updater({success:"request_list_tgt"},"/xml/questions.php",{parameters:_221,onFailure:reportError});
return false;
};
function activity_why(id,_222,_223,_224){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_222,actionTargetId:_223,createDate:_224}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function article_flag(id,flag){
var ajax=new Ajax.Updater({success:"flaglink_"+id+"_"+flag},"/xml/flaghub.php",{parameters:$H({aID:id,reason:flag}).toQueryString(),onFailure:reportError});
};
function ellipse(str,_225){
if(str.length>_225&&_225!=0){
str=str.substr(0,_225-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_225-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function loadRandomArt(_226,_227){
var ajax=new Ajax.Request("/xml/random.php",{method:"post",parameters:"score="+_227,onFailure:reportError,onComplete:function(req){
_226.location.href=req.responseText;
}});
};
function deleteComment(_228,_229){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_229).serialize(),success:function(resp){
toggleCommentEdit(_228,false);
jq("#ctext_"+_228).html(resp);
jq("#cedit_"+_228).remove();
}});
return false;
};
function toggleCommentEdit(_22a,_22b){
if(_22b){
$("cedit_"+_22a).style.display="none";
$("cbox_"+_22a).style.display="";
$("ctext_"+_22a).style.display="none";
}else{
if($("cedit_"+_22a)){
$("cedit_"+_22a).style.display="";
}
$("cbox_"+_22a).style.display="none";
$("ctext_"+_22a).style.display="";
}
};
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
var _22c=req.getAllResponseHeaders();
var ajax=new Ajax.Request("/xml/reporterror.php",{parameters:_22c+"&error=1"});
};
function addTagEntries(){
var _22d=4;
var _22e=document.createElement("div");
_22e.id="moreEntryDiv";
var li=null;
var _22f=4+1;
var _230=_22f+_22d;
for(var i=_22f;i<_230;i++){
li=document.createElement("li");
_22e.appendChild(li);
var _231=document.createElement("input");
_231.className="tagEntry";
_231.name="tag_"+i;
_231.type="text";
_231.size=40;
li.appendChild(_231);
}
$("tagEntries").appendChild(_22e);
return true;
};
function hubtool_add_tag(_232){
var _233=(_232)?$(_232):$("add_tag_input");
if(!_233){
return;
}
var tag;
if(Field.present(_233)&&_233.type){
tag=$F(_233);
Field.clear(_233);
}else{
if(_233.innerHTML){
tag=_233.innerHTML;
Element.remove(Element.findElement(_233,"li"));
}
}
if(!tag){
return;
}
var _234=0;
var _235=/^tag_(\d+)$/i;
var _236=$$(".tagEntry");
_236.each(function(ele){
if(ele.id){
var ms=_235.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_234){
_234=id;
}
}
}
});
_234++;
var _237="tag_"+_234;
var _238=$("add_tag_input").parentNode;
var _239="<input class=\"tagEntry\" id=\""+_237+"\" name=\""+_237+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_237)){
var _23a=$(_237).tabIndex;
Element.update($(_237).parentNode,_239);
$(_237).tabIndex=_23a;
}else{
var _23b=$("tag_1").tabIndex-1;
var _23a=_23b+_234;
var pole=new Insertion.Before(_238,"<li>"+_239+"</li>");
$(_237).tabIndex=_23a;
_23a=$("add_tag_input").tabIndex;
_23a++;
$("add_tag_input").tabIndex=_23a;
}
return false;
};
function add_calculated_tag(_23c,tag,_23d){
var _23e=tag.replace(/'/g,"\\'");
var _23f=tag.replace(/ /g,"+");
var _240="tagd_"+tag.replace(/ /g,"_");
_240=_240.toLowerCase();
if($(_240)){
$(_240).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _241=$("nav_tags_edit");
var _242="<a href=\"javascript:void delete_tag('"+_23c+"','"+_23e+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_242+="<a id=\""+_240+"\" href=\"/tag/"+_23f+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_242;
_241.appendChild(item);
save_tag(_23c,tag,false);
}
}
var _243=$(_23d);
Element.remove(Element.findElement(_243,"li"));
return false;
};
function add_tag(_244){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _245=tag.replace(/'/g,"\\'");
var _246=tag.replace(/ /g,"+");
var _247="tagd_"+tag.replace(/ /g,"_");
_247=_247.toLowerCase();
if($(_247)){
$(_247).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _248=$("nav_tags_edit");
var _249="<a href=\"javascript:void delete_tag('"+_244+"','"+_245+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_249+="<a id=\""+_247+"\" href=\"/tag/"+_246+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_249;
_248.appendChild(item);
save_tag(_244,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_24a,tag){
if(!_24a||!tag){
return;
}
var _24b="tagd_"+tag.replace(/ /g,"_");
var _24c=$(_24b);
if(!_24c){
return;
}
var li=_24c.parentNode;
Element.remove(li);
save_tag(_24a,tag,true);
return false;
};
function save_tag(_24d,tag,del){
var _24e=(del)?1:0;
var req={a:_24d,v:tag,d:_24e};
var _24f=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_24f,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function handleReturnKeyPress(_250,func){
_250=_250||window.event;
if(_250.keyCode==Event.KEY_RETURN){
Event.stop(_250);
func();
return false;
}else{
return true;
}
};
function fireOnReturn(_251,func){
Event.observe(_251,"keyup",function(_252){
_252=_252||window.event;
if(_252.which){
if(_252.which==Event.KEY_RETURN){
_252.preventDefault();
func();
}
}else{
if(_252.keyCode){
if(_252.keyCode==Event.KEY_RETURN){
Event.stop(_252);
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
InlineEdit.register=function(ele,_253){
var obj=$(ele);
obj.title="Click to edit";
obj.style.backgroundColor="#ffe";
obj.empty_text="";
InlineEdit._registered[obj.id]=_253;
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
InlineEdit.registerCallbacks=function(ele,_254,_255){
var obj=$(ele);
InlineEdit._onedit[obj.id]=_254;
InlineEdit._ondone[obj.id]=_255;
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
var _256=InlineEdit._onedit[ele.id];
_256(ele);
}
var text=ele.innerHTML;
if(ele.empty_text&&ele.empty_text==text){
text=" ";
}
var _257=document.createElement("INPUT");
_257.type="text";
Element.cloneStyles(ele,_257);
ele.parentNode.insertBefore(_257,ele);
InlineEdit._insertEditSpanBefore(ele);
_257.id=ele.id+"_edit_inplace";
InlineEdit._editting[_257.id]=ele;
Element.remove(ele);
_257.value=text;
_257.focus();
_257.select();
return false;
};
InlineEdit._onButtonClick=function(_258){
_258=_258||window.event;
var _259=_258.target||_258.srcElement;
var _25a=(_259.innerHTML.search(/CANCEL/)==-1)?true:false;
var _25b=_259.parentNode;
var _25c=_25b;
while(_25c&&!InlineEdit._editting[_25c.id]){
_25c=_25c.previousSibling;
}
var _25d=InlineEdit._editting[_25c.id];
_25c.hasFocus=false;
var z=_25c.parentNode;
z.insertBefore(_25d,_25c);
z.removeChild(_25c);
z.removeChild(document.getElementsByClassName("buttonSpan",z)[0]);
delete InlineEdit._editting[_25c.id];
if(InlineEdit._ondone[_25d.id]){
var _25e=InlineEdit._ondone[_25d.id];
_25e(_25d);
}
if(_25a){
_25d.innerHTML=(_25c.value.length>0)?_25c.value:"&nbsp;";
var _25f=InlineEdit._registered[_25d.id];
_25f(_25c.value);
}
};
InlineEdit._insertEditSpanBefore=function(obj){
if(document.getElementById&&document.createElement){
var _260=document.createElement("span");
_260.className="buttonSpan";
var butt=document.createElement("button");
var _261=document.createTextNode("OK");
butt.appendChild(_261);
_260.appendChild(butt);
var _262=document.createElement("button");
var _263=document.createTextNode("CANCEL");
_262.appendChild(_263);
_260.appendChild(_262);
obj.parentNode.insertBefore(_260,obj);
butt.onclick=InlineEdit._onButtonClick;
_262.onclick=InlineEdit._onButtonClick;
}
};
var SampleDuration=Class.create();
SampleDuration.prototype={initialize:function(_264){
this.art_id=_264;
this.t=new Timer();
this.onleaveListener=this.onleave.bindAsEventListener(this);
Event.observe(window,"beforeunload",this.onleaveListener,false);
},onleave:function(e){
e=e||window.event;
this.t.stop();
var _265=$H({art_id:this.art_id,dur:this.t.length});
var ajax=new Ajax.Request("/xml/duration",{parameters:_265.toQueryString()});
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
var _266=insideHubEditor?200:0;
div.style.top=(Position.getViewportScrollY()+_266)+"px";
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
var _267=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(_267){
this.shouldShowIcon=false;
_267.style.display="none";
Event.stopObserving(window,"scroll",this.scrollListener,false);
this.scrollListener=null;
this.iconVisible=false;
}
}
},showIcon:function(id){
if(this.shouldShowIcon&&!this.iconVisible&&Ajax.activeRequestCount>0){
this.iconVisible=true;
var _268=insideHubEditor?$("ajaxing_big"):$("ajaxing");
_268.style.display="inline";
this.onScroll();
this.scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.scrollListener,false);
}
}};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_269){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_269*100)+")";
}
ele.style.opacity=_269;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _26a;
if(document.defaultView){
_26a=document.defaultView.getComputedStyle(ele,"");
}else{
_26a=ele.currentStyle;
}
return _26a;
};
Element.cloneStyles=function(ele,_26b,_26c){
ele=$(ele);
_26b=$(_26b);
var _26d=Element.getCurrentStyle(ele);
for(var name in _26d){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _26e=_26d[name];
if(_26e!==""&&!(_26e instanceof Object)&&name!="length"&&name!="parentRule"){
if(_26c&&name.indexOf(_26c)!==0){
continue;
}
_26b.style[name]=_26e;
}
}
return _26b;
};
Element.findElement=function(_26f,_270){
_26f=$(_26f);
while(_26f.parentNode&&(!_26f.tagName||(_26f.tagName.toUpperCase()!=_270.toUpperCase()))){
_26f=_26f.parentNode;
}
return _26f;
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
String.prototype.startsWith=function(_271){
var res=this;
return res.substring(0,_271.length)==_271;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _272=p.innerHTML;
if(_272.length>len){
_272=_272.substring(0,len);
_272=_272.replace(/\w+$/,"");
_272+="...";
p.innerHTML=_272;
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
var _273=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_273=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_273=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_273=window.pageXOffset;
}else{
if(window.scrollX){
_273=window.scrollX;
}
}
}
}
return _273;
};
Position.getViewportScrollY=function(){
var _274=0;
if(document.documentElement&&document.documentElement.scrollTop){
_274=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_274=document.body.scrollTop;
}else{
if(window.pageYOffset){
_274=window.pageYOffset;
}else{
if(window.scrollY){
_274=window.scrollY;
}
}
}
}
return _274;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _275=jq(window).scrollTop();
var _276=_275+jq(window).height();
if(eleBot<_275){
return -1;
}
if(off.top>_276){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _277=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _278=[_277[0]+Position.getViewportWidth(),_277[1]+Position.getViewportHeight()];
return (_277[0]<off[0]&&off[0]<_278[0]&&_277[1]<off[1]&&off[1]<_278[1]);
};
Position.set=function(ele,_279){
if(ele&&_279){
ele.style.left=_279[0]+"px";
ele.style.top=_279[1]+"px";
}
};
function check_signed_in_ajax(_27a,_27b){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_27c,_27d){
_27a(eval(_27c.responseText),_27b);
}});
};
function phone_verify_required(_27e,_27f,_280,_281){
if(typeof (_281)=="undefined"){
data={};
}else{
data={a:_281};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_27e);
}else{
_27f.apply(null,_280);
}
},"json");
};
function require_phone_verification(_282,_283){
url="/xml/verify/phone.php";
if(typeof (_283)!="undefined"&&_283){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_282},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_284,end){
for(var i=_284;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_284)+1;
}
update_plural(name);
};
function unselect_all(name,_285,end){
for(var i=_285;i<=end;i++){
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
function import_now(_286,name,_287,end){
var _288=self.opener.document.getElementById(_286);
if(_288){
for(var i=_287;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _289=$(name+"_email_"+i);
if(_288.value.length<2||_288.value.charAt(_288.value.length)==","||_288.value.charAt(_288.value.length-1)==","){
_288.value=_288.value+_289.innerHTML;
}else{
_288.value=_288.value+", "+_289.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_28a,_28b,max){
var _28c=document.getElementById(_28a);
var _28d=document.getElementById(_28b);
if(!_28c){
alert("charCounter bad source: "+_28a);
}
if(!_28d){
alert("charCounter bad source: "+_28b);
}
if(_28c.value.length>max){
_28c.value=_28c.value.substring(0,max);
}
_28d.value=max-_28c.value.length;
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
function fetchAnswers(_28e,_28f,_290){
var _291=$H({answerIds:_28e,enableVoting:_28f,enableEditing:_290}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_291,onComplete:function(_292){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_293,v){
if(_293===undefined){
_293=true;
}
jq.ajax({url:"/xml/answervote.php",type:"POST",data:{id:id,vote:v,timeIndicator:_293},dataType:"html",success:function(html){
jq(".voting_"+id).html(html);
}});
return false;
};
function answerVoteDown(id,_294){
return answerVote(id,_294,-1);
};
function answerVoteUp(id,_295){
return answerVote(id,_295,1);
};
function fetchRecaptcha(_296){
var _297="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _298=document.getElementsByTagName("head")[0];
var _299=document.createElement("script");
_299.type="text/javascript";
_299.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_299.onload=function(){
Recaptcha.create(_297,_296,{theme:"red"});
};
_299.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_297,_296,{theme:"red"});
}
};
_298.appendChild(_299);
}else{
Recaptcha.create(_297,_296,{theme:"red"});
}
};
function whenSignedIn(_29a,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_29a,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_29b,info){
if(_29b){
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
var _29c=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _29c;
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
StringBuffer.prototype.append=function(_29d){
this.buffer.push(_29d);
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
var _29e=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_29e=="touchstart"){
jq("#header_explore").bind(_29e+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_29e+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_29e+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_29e+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_29e+".nav",function(_29f){
_29f.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_2a0){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_2a1){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_2a2){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_2a3){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_2a4){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_2a5){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_2a6){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_2a7){
nav_hide_all_menus();
});
jq("html").bind("click",function(_2a8){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_2a9){
_2a9.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function initHubJS(_2aa,_2ab,_2ac){
var iPad=navigator.userAgent.match(/iPad/i);
var _2ad=iPad&&navigator.userAgent.match(/OS [1-4]_\d/i);
if(_2ab){
setupSocialButtons();
}
if(!_2ad){
initSocialWidget(100);
}
pinboardPageLimit=_2ad?2:9999;
initPinBoard(_2aa,_2ac,pinboardPageLimit);
if(!_2ad){
initFixedFooter();
}
};
function initSocialWidget(_2ae){
jq(window).scroll(function(){
socialWidgetUpdate(_2ae,false);
}).resize(function(){
socialWidgetUpdate(_2ae,true);
});
};
function socialWidgetUpdate(_2af,_2b0){
var pos=jq(this).scrollTop();
var _2b1=jq("#sidebar");
var _2b2=jq("#content");
var sh=jq("#share_hub");
var _2b3=_2b1.outerHeight();
var _2b4=sh.outerHeight();
var _2b5=_2b2.outerHeight();
var _2b6=_2b3+_2b1.offset().top-_2af;
var _2b7=_2b5+_2b2.offset().top-_2af-_2b4;
if("fixed"==sh.css("position")&&pos<_2b6){
sh.css({position:"absolute",top:(_2b1.position().top+_2b3)+"px",left:"662px"});
}else{
if("fixed"==sh.css("position")&&pos>_2b7){
sh.css({position:"absolute",top:(_2b2.position().top+_2b5-_2b4)+"px",left:"662px"});
}else{
if(pos>=_2b6&&pos<=_2b7){
if("fixed"==sh.css("position")&&_2b0){
sh.css({left:(_2b2.offset().left+_2b2.outerWidth()+10)+"px"});
}else{
if("fixed"!=sh.css("position")){
sh.css({position:"fixed",top:_2af+"px",left:(_2b2.offset().left+_2b2.outerWidth()+10)+"px"});
}
}
}
}
}
};
function initFixedFooter(){
var _2b8=jq("#pinboard");
var _2b9=_2b8.offset().top+_2b8.height();
jq(window).scroll(function(){
checkForFooterChange(_2b9);
}).resize(function(){
checkForFooterChange(_2b9);
});
};
function checkForFooterChange(_2ba){
var pos=jq(this).scrollTop()+jq(this).height();
var _2bb=jq("#footer_wrap");
if(pos<_2ba-100){
if("fixed"==_2bb.css("position")&&!_2bb.is(":animated")){
_2bb.fadeOut(700,function(){
jq(this).css({position:"static",zIndex:0,display:"block"});
});
}
}else{
if(pos>_2ba){
if("fixed"!=_2bb.css("position")&&!_2bb.is(":animated")){
_2bb.css({position:"fixed",bottom:0,zIndex:10,display:"none"}).fadeIn(700);
}
}
}
};
function initPinBoard(_2bc,_2bd,_2be){
var _2bf=jq("#pinboard");
related_ids=[];
jq(".related_hub").each(function(j,_2c0){
jq(jq(_2c0).attr("class").split(" ")).each(function(i,clss){
if("rh"==clss.substr(0,2)){
related_ids.push(clss.substr(2));
return false;
}
});
});
existing_related_selector=".pn"+_2bc;
if(related_ids.length){
existing_related_selector+=",.pn"+related_ids.join(",.pn");
}
_2bf.masonry({itemSelector:".pinboard_box",columnWidth:306,gutterWidth:27}).infinitescroll({navSelector:"div.infinite_nav",nextSelector:"div.infinite_nav a:first",itemSelector:"#pinboard div.pinbox",loading:{img:"/x/spinner.gif",msgText:"<em>Loading...</em>"},bufferPx:800,pageLimit:_2be},function(_2c1){
var _2c2=jq(_2c1).remove(existing_related_selector);
if(!_2bd){
_2c2.find(".share_related_placeholder").css("height",0);
}
_2bf.masonry("appended",_2c2);
if(_2bd){
fetchRelatedHubSocialButtons();
}
});
};
function fetchRelatedHubSocialButtons(){
if(!(browser!="IE"||version>7||document.documentMode)){
return false;
}
ids=[];
jq(".share_related:hidden").each(function(_2c3,elt){
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
jq.post("/xml/article/sharebuttons.php",{ids:ids},function(_2c4){
jq.each(_2c4,function(id,code){
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
jq(".pin-it-button").each(function(_2c5,elt){
var _2c6=jq(elt);
var _2c7=_2c6.attr("href");
var _2c8=_2c6.attr("count-layout");
var qpos=_2c7.indexOf("?");
var src="//d3io1k5o0zdpqr.cloudfront.net/pinit.html"+_2c7.substr(qpos)+"&layout="+encodeURIComponent(_2c8);
var _2c9=jq("<iframe scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>").css({border:"medium none",width:"90px",height:"20px"}).attr("src",src);
_2c6.replaceWith(_2c9);
});
};
function setupSocialButtons(){
if(navigator.userAgent.match(/iPad/i)){
}else{
jq("#sidebar, #pinboard").delegate(".related_social_wrap",{mouseenter:function(_2ca){
var _2cb=jq(this).find(".share_related");
if("inline"==_2cb.find(".socialbuttons").css("display")){
_2cb.css("visibility","visible");
}
},mouseleave:function(_2cc){
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
function google_ad_request_done(_2cd){
var s="";
var i;
if(_2cd.length==0){
return;
}
if(_2cd[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_2cd[0].image_width+"\" HEIGHT=\""+_2cd[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_2cd[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_2cd[0].image_url+"\" WIDTH=\""+_2cd[0].image_width+"\" HEIGHT=\""+_2cd[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_2cd[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_2cd[0].url+"\" target=\"_top\" title=\"go to "+_2cd[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_2cd[0].visible_url+"';return true\"><img border=\"0\" src=\""+_2cd[0].image_url+"\"width=\""+_2cd[0].image_width+"\"height=\""+_2cd[0].image_height+"\"></a>";
}else{
if(_2cd[0].type=="html"){
s+=_2cd[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>";
for(i=0;i<_2cd.length;++i){
ad=_2cd[i];
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
var _2ce=jq.address.value().substr(1);
if(""==_2ce){
return;
}
var _2cf=false;
if(_2ce.substr(0,8)=="comment-"){
_2cf=true;
_2ce="comment"+_2ce.substr(8);
}
if("morecomments"==_2ce||_2cf){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_2ce){
ssToId("comFirst");
}else{
if("morecomments"==_2ce){
}else{
ssToId(_2ce);
}
}
};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_2d0){
id=jQuery(_2d0.target).attr("id");
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
var _2d1="#edit_rc_error_"+i;
jQuery(_2d1).html("You cannot submit an empty comment.");
}else{
jq.ajax({url:"/xml/request_comment_edit.php",type:"POST",data:{id:i,text:txt},success:function(data){
jq("#rc_"+i).replaceWith(data);
jq("#rc_"+i).effect("highlight",{color:"yellow"},1000);
}});
}
return false;
};
function supportRequestCommentDeletion(){
jQuery(".request_comment_delete").click(function(_2d2){
orig_id=jQuery(_2d2.target).attr("id");
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
};
function showAnswerCommentBox(id,_2d3){
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
jQuery("#rc_numcharsvalue").html(_2d3);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _2d4="#result_"+i;
var _2d5="#error_"+i;
var txt=jQuery("#answer_comment textarea").val();
if(txt==""){
jQuery(_2d5).html("You cannot submit an empty comment.");
}else{
jQuery.ajax({url:"/xml/request_comment_submit.php",type:"POST",data:{id:i,text:txt},success:function(data){
jQuery("#answer_comment").fadeOut("slow",function(){
jQuery("#answer_comment").prev().css("display","none");
jQuery(_2d4).append(data);
var _2d6=jQuery(_2d4).children().last().attr("id");
jQuery(_2d4).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_2d6);
});
});
}});
}
};
function loadRatingSystem(_2d7,_2d8,_2d9,_2da){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_2d7,params:{id:_2da},ratingClass:"rating"});
};
function smBackfillLoaded(_2db){
if(_2db==null){
}else{
if(_2db.firstChild==null){
}else{
_2db.firstChild.style.height="250px";
}
}
};
function hpFormHandler(_2dc){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_2dc);
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
var _2dd=$$("input[name="+ele.name+"]");
var _2de=false;
_2dd.each(function(r){
if(r.checked==true){
_2de=true;
throw $break;
}
});
this.testForError(!_2de,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _2df=false;
if(val.length>=20){
var _2e0=val.match(/\s+/g);
var _2e1=_2e0?_2e0.length:0;
var _2e2=_2e1+1;
_2df=_2e2/(val.length-_2e1)<0.08;
}
this.testForError(_2df,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_2e3,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_2e3)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_2e4,msg){
var val=$F(ele);
this.testForError((val.search(_2e4)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_2e5,msg){
var val=$F(ele);
var _2e6=false;
for(i=0;i<_2e5.length&&!_2e6;i++){
var _2e7=new RegExp("[^a-zA-Z]"+_2e5[i]+"[^a-zA-Z]","i");
_2e6=(val.search(_2e7)>=0);
if(!_2e6){
_2e7=new RegExp("^"+_2e5[i]+"[^a-zA-Z]","i");
_2e6=(val.search(_2e7)>=0);
}
if(!_2e6){
_2e7=new RegExp("[^a-zA-Z]"+_2e5[i]+"$","i");
_2e6=(val.search(_2e7)>=0);
}
if(!_2e6){
_2e7=new RegExp("^"+_2e5[i]+"$","i");
_2e6=(val.search(_2e7)>=0);
}
}
this.testForError(_2e6,ele,msg);
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
var _2e8=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _2e9=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _2ea=800;
var _2eb=6;
this.validateLengthMin(ele,_2eb,"The address you entered is too short. Please use an address at least "+_2eb+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _2ec=200;
this.validateLengthMax(ele,_2ec,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _2ed=2;
var _2ee=200;
this.validateLengthMin(ele,_2ed,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_2ee,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _2ef=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_2ef=true;
}
this.testForError(!_2ef,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _2f0=40;
var _2f1=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_2f1,"Your password is too short.  Protect your account by choosing a password that is at least  "+_2f1+" characters long.  Safety first!");
this.validateLengthMax(ele1,_2f0,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _2f2=60;
var _2f3=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_2f2,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_2f4){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_2f4.detect(function(name){
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
var _2f5=$A($(form).getElementsByTagName("input"));
_2f5.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_2f6,_2f7,_2f8){
if($(_2f6)&&$(_2f7)){
var gw=new GhostWatcher(_2f6,_2f7,_2f8);
}
};
hpFormHandler.prototype.setValidators=function(_2f9,_2fa){
this.toValidate=$H(_2f9);
this.toValidateOnsubmit=$H(_2fa);
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
hpFormHandler.prototype.save=function(_2fb){
if(this.ensureSignedInBeforeSave&&!_2fb){
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
var _2fc=new fx.Scroll({duration:100});
_2fc.scrollTo(this.errorDiv);
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
var _2fd=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_2fe,ele,msg){
if(_2fe){
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
hpFormHandler.prototype._runValidators=function(_2ff){
var _300=Form.getElements(this.form);
var _301=$A(_300);
_301.each(function(node){
if(_2ff){
var _302=this.toValidateOnsubmit.get(node.id);
if(!_302){
_302=this.toValidateOnsubmit.get(node.className);
}
if(_302){
_302(node);
}
}
var _302=this.toValidate.get(node.id);
if(!_302){
_302=this.toValidate.get(node.className);
}
if(_302){
_302(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _303="";
if(json.status=="error"){
var _304=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_303+=" - "+json.errors[key][i]+"\n";
}
_304++;
}
}
if(_304>0){
var _305=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_305+=_303+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_305);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _306=new fx.Scroll({duration:300});
_306.scrollTo("changesSaved");
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
var _307=this.errorHeader;
_307+="<ul>";
this.errors.each(function(err){
_307+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_307+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_307;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _308=$(err.key);
var _309=err.key+"_error";
var _30a=$(_309);
if(_30a){
_30a.innerHTML=err.value;
_30a.className="alert";
_30a.show();
}else{
new Insertion.Top(_308.parentNode,"<div id=\""+_309+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_308,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _30b=typeof this.errors.get(targetId)=="undefined";
if(_30b){
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
function _handleInputKeypress(_30c){
_30c=_30c||window.event;
if(_30c.which){
if(_30c.which==Event.KEY_RETURN){
var _30d=document.createEvent("KeyboardEvent");
_30d.initKeyEvent("keydown",true,true,document.defaultView,_30c.ctrlKey,_30c.altKey,_30c.shiftKey,_30c.metaKey,Event.KEY_TAB,0);
_30c.preventDefault();
_30c.target.dispatchEvent(_30d);
}
}else{
if(_30c.keyCode){
if(_30c.keyCode==Event.KEY_RETURN){
_30c.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_30e,_30f,_310){
this.fromEle=$(_30e);
this.toEle=$(_30f);
this.copyFunction=(_310!=null)?_310:this.copyValue;
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
function growTextArea(elt,_311,_312,_313){
var rows=Math.ceil($F(elt).length/_311)+1;
var _314=rows*_312;
_314=Math.max(_314,_313);
elt.setStyle({height:_314+"px"});
};
function makeGrowable(id,_315,_316,_317){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_315,_316,_317);
});
};
function makeExpandable(id,_318,_319,_31a,_31b,_31c){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_318);
var _31c=(_31c===undefined)?"expanded":_31c;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_31c)){
anc.addClass(_31c);
if(typeof (_31b)=="function"){
_31b.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_319)=="function"){
_319.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_31a){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_318);
});
};
function initAutoComplete(_31d,_31e){
var _31f="";
var _320="++none++";
var _321=false;
var _322=false;
var _323=false;
var _324="#the_auto_comp_box";
var _325="#search_form";
var _326="#search_input";
var _327=".search_submit";
var _328="search_form";
var _329="/xml/getautocompletestrings.php";
var _32a="";
var _32b=0;
var _32c=null;
var _32d=null;
var _32e=null;
var _32f=null;
var _330=null;
var _331=false;
if(_31e){
_324=_31e.boxid;
_325=_31e.container;
_326=_31e.input;
_327=_31e.submit;
if(_31e.ajaxtarget!=undefined){
_329=_31e.ajaxtarget;
}
if(_31e.querystring!=undefined){
_32a="&"+_31e.querystring;
}
if(_31e.filter!=undefined){
_32c=_31e.filter;
}
if(_31e.callback!=undefined){
_32d=_31e.callback;
}
if(_31e.keyboardelem!=undefined){
_32f=_31e.keyboardelem;
}
if(_31e.targoutput!=undefined){
_32e=_31e.targoutput;
}
if(_31e.keyuptarget!=undefined){
_330=_31e.keyuptarget;
}
if(_31e.showprogress!=undefined){
_331=_31e.showprogress;
}
}
if(!_32f){
_32f=_326;
}
if(!_32e){
_32e=_326;
}
if(!_330){
_330=_32f;
}
jq(document).ready(function(){
if(!_321){
_321=true;
jq("<div id=\""+_324.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_32f);
if(_331){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_324);
jq("#auto_comp_close").bind("click",function(){
jq(_324).hide();
jq("#auto_comp_close").hide();
});
}
jq(_324).hide();
if(!_331){
jq(_324).bind("focusin",function(){
_322=true;
});
jq(_324).bind("focusout",function(){
_322=false;
});
jq(_325).bind("focusin",function(){
_323=true;
});
jq(_325).bind("focusout",function(){
_323=false;
setTimeout(function(){
if(!_322&&!_323){
jq(_324).hide();
jq("#auto_comp_close").hide();
_32a=_32a.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_325).attr("autocomplete","off");
jq(_32f).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_32b=0;
jq(_324+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_330).bind("keyup",function(){
var _332=jq(_326).attr("value");
if(_326!=_32f){
if(_31f!=_332){
_32a=_32a.replace(/start=[0123456789]+/,"");
_32a=_32a.replace(/&&/,"&");
}
_31f="";
_320="++none++";
}
var _333;
if(_31e){
_333="hubs";
}else{
_333=jq(".search_type option:selected").val();
if(_333==undefined){
_333="site";
}
}
if(_332.strip().length==0){
jq(_324).hide();
jq("#auto_comp_close").hide();
}
if(_332.strip().length>0&&_31f!=_332){
_31f=_332;
if(_332.indexOf(_320)==0){
jq(_324+" > .auto_comp_row").each(function(){
var _334=jq(this).text();
if(_32c){
_334=_32c(_334);
}
if(_334.indexOf(_332)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_320="++none++";
jq(_324+" > .auto_comp_row").remove();
var _335="?";
if(_331){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_324);
jq(_324).show();
_335="?s="+escape(_332)+"&";
}
var _336=jq(_325).serialize();
var _337=/(^|&)s=/;
if(!_336.match(_337)&&!_32a.match(_337)&&!_335.match(_337)){
_336+="&s="+_332;
}
jq.get(_329+_335+"t="+escape(_333)+_32a,_336,function(data){
jq(_324+" div[id=auto_comp_error]").remove();
jq(_324+" div[id=auto_comp_progress]").remove();
_32a=_32a.replace(/start=[0123456789]+/,"");
_32a=_32a.replace(/&&/,"&");
var _338=jq(data).find("div").length;
var _339=false;
if(_338==0){
return true;
}
var _33a=jq(_326).val();
if(_33a!=_332){
return true;
}
if(_338<_31d){
_320=_332;
}else{
_320="++none++";
}
jq(_324).show();
jq(_32f).focus();
var _33b=jq(_32f).position();
var _33c=jq(_32f).outerHeight(true);
jq(_324).position(_33b.top+_33c,_33b.left+5);
jq(data).find("div").appendTo(_324);
jq(_324+" > .auto_comp_row").bind("click",function(){
var _33d=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_33d=true;
var _33e=href.substr(8);
_32a+="&start="+_33e;
_32a=_32a.replace(/&&/,"&");
}
});
if(_33d){
if(!_339){
setTimeout(function(){
jq(_330).trigger("keyup");
},200);
_322=false;
_339=true;
}
return (false);
}
var _33f=jq(this).text();
if(_32c){
_33f=_32c(_33f);
}
jq(_32e).attr("value",_33f);
if(document.forms[_328]){
document.forms[_328].submit();
}else{
if(_327){
jq(_327).trigger("click");
}
}
return (false);
});
jq(_324+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_324+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_324+" > .auto_comp_row:visible:eq("+_32b+") > a").length){
return (false);
}
++_32b;
jq(_324+" > .auto_comp_row:visible:eq("+_32b+") > a").trigger("focus");
return (false);
break;
case 38:
--_32b;
if(_32b<0){
jq(_32f).trigger("focus");
}else{
jq(_324+" > .auto_comp_row:visible:eq("+_32b+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_32d){
_32d();
}
},"html");
}
});
}
});
};
var ImageViewerControl=Class.create();
ImageViewerControl.prototype={initialize:function(_340,_341,_342){
this.modId=_340;
this.floatStatus=_341;
this.displayStatus=_342;
this.photoData=new Object();
this.photoOrder=new Array();
this.viewer_id=null;
this.timer=null;
this.slide_idx=-1;
this.displaySlideshowLinks=false;
this.resources={ht_viewer_sect:"image_viewer_"+this.modId,ht_inline_sect:"image_inline_"+this.modId,ht_slideshow_sect:"image_slideshow_"+this.modId,ht_thumbnail_sect:"image_thumbnail_"+this.modId,inline_images:"imgs_"+this.modId,viewer_display:"slide_display_"+this.modId,viewer_photo:"slide_img_"+this.modId,viewer_caption:"slide_desc_"+this.modId,thumb_tn_section:"slide_tn_section_"+this.modId};
},setMaxHeight:function(_343){
this.firstTimeLoadingImage=true;
this.maxHeight=_343;
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
this.firstTimeLoadingImage=false;
},getMaxDisplayHeight:function(){
var top=0;
this.photoOrder.each(function(id){
var hgt=this._getDisplayHeight(id);
top=hgt>top?hgt:top;
}.bind(this));
return top;
},setDisplaySlideshowLinks:function(_344){
this.displaySlideshowLinks=_344;
},_getDisplayUrl:function(){
rec=this.photoData[this.viewer_id];
var _345=rec.origWidth>=200&&rec.origHeight>=150;
if(rec.maxSize==2&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlQuarter,"quarter_frame",rec.esc_cap)+(_345&&this.displaySlideshowLinks?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if(rec.maxSize==2){
return this._createImageTag(rec.urlQuarter,"quarter",rec.esc_cap)+(_345&&this.displaySlideshowLinks?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlHalfPad,"half_frame",rec.esc_cap)+(_345&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return this._createImageTag(rec.urlHalf,"half",rec.esc_cap)+(_345&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlFullPad,"full_frame",rec.esc_cap)+(_345&&this.displaySlideshowLinks?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"){
return this._createImageTag(rec.urlFull,"full",rec.esc_cap)+(_345&&this.displaySlideshowLinks?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}
}
}
}
}
}
},_createImageTag:function(url,_346,_347){
if(undefined==_347){
_347="";
}
return "<img class='"+_346+"' title='"+_347+"' alt='"+_347+"' src='"+url+"' />";
},_getDisplayHeight:function(_348){
rec=this.photoData[_348];
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
var _349=rec.nofollow?" rel=\"nofollow\"":"";
var _34a="";
if(rec.sourceUrl==""){
_34a=rec.sourceName;
}else{
if(rec.sourceName==""){
_34a="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_349+">"+rec.sourceUrl.truncate(50)+"</a>";
}else{
_34a="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_349+">"+rec.sourceName+"</a>";
}
}
if(_34a!=""){
_34a="<div>Source: "+_34a+"</div>";
}
return rec.caption+_34a;
},_addInlineImage:function(id){
this.viewer_id=id;
var rec=this.photoData[id];
var _34b=document.createElement("div");
var _34c=this._getDisplayUrl();
if(this.floatStatus=="none"){
var _34d="caption_full";
}else{
var _34d="caption_half";
}
_34b.id="img_"+rec.id;
_34b.innerHTML="<div id='img_url_"+rec.id+"'>"+_34c+"</div>"+"<div class='"+_34d+"' id='img_desc_"+rec.id+"'>"+this._getCaptionAndSource(rec)+"</div>";
$(this.resources.inline_images).appendChild(_34b);
},renderInlineImages:function(){
$(this.resources.inline_images).innerHTML="";
this.photoOrder.each(function(id){
this._addInlineImage(id);
}.bind(this));
},_addThumbnail:function(id){
var rec=this.photoData[id];
var _34e=document.createElement("img");
_34e.id="slide_tn_"+rec.id;
_34e.src=rec.urlThumb;
_34e.alt=rec.caption;
_34e.title=rec.caption;
_34e.onclick=function(){
this.loadSlide(rec.id);
}.bind(this);
$(this.resources.thumb_tn_section).appendChild(_34e);
},renderThumbnails:function(){
$(this.resources.thumb_tn_section).innerHTML="";
this.photoOrder.each(function(id){
this._addThumbnail(id);
}.bind(this));
if(this.photoOrder.length>0){
$("slide_tn_"+this.photoOrder[0]).onclick();
}
}};
var ForumSelector=Class.create();
ForumSelector.prototype={initialize:function(id,_34f){
this.id=id;
this.userId=_34f;
this.observeChanges();
},observeChanges:function(){
$(this.id+"_forum_id").observe("change",this.changeForum.bindAsEventListener(this));
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
},changeForum:function(_350){
var elt=Event.findElement(_350,"select");
this.chooseForum($F(elt));
},changeCategory:function(_351){
var elt=Event.findElement(_351,"select");
this.chooseCategory($F(elt));
},chooseForum:function(_352){
if(/fave/.test(_352)){
var _353=_352.substring(5);
this.chooseCategory(_353);
return;
}
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({forumId:_352,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
},chooseCategory:function(_354){
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({categoryId:_354,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
}};
var CategorySelector=Class.create();
CategorySelector.prototype={initialize:function(id,_355,_356,_357){
this.id=id;
this.onchange=_355;
this.onselect=_356;
this.userId=_357?_357:0;
this.observeChanges();
},observeChanges:function(){
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
$("startOver"+this.id).observe("click",this.startOver.bind(this));
},changeCategory:function(_358){
var elt=Event.findElement(_358,"select");
this.chooseCategory($F(elt));
},chooseCategory:function(_359,_35a,_35b){
new Ajax.Request("/xml/categoryselector.php",{parameters:$H({categoryId:_359,userId:this.userId,id:this.id}).toQueryString(),onComplete:function(req){
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
if(!_35a&&_35b){
this.onselect(_35b);
}
}.bind(this)});
},getValue:function(){
return $F(this.id+"Id");
},startOver:function(_35c){
this.chooseCategory(0);
},refresh:function(){
this.chooseCategory(this.getValue());
},search:function(_35d,_35e,_35f){
new Ajax.Updater(_35e,"/xml/categorysearch.php",{parameters:$H({uniqueId:this.id,searchText:_35d,numTabs:_35f}),onFailure:function(){
}});
return false;
}};
function addEvent(_360,type,_361){
if(!_361.$$guid){
_361.$$guid=addEvent.guid++;
}
if(!_360.events){
_360.events={};
}
var _362=_360.events[type];
if(!_362){
_362=_360.events[type]={};
if(_360["on"+type]){
_362[0]=_360["on"+type];
}
}
_362[_361.$$guid]=_361;
_360["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_363,type,_364){
if(_363.events&&_363.events[type]){
delete _363.events[type][_364.$$guid];
}
};
function handleEvent(_365){
var _366=true;
_365=_365||fixEvent(window.event);
if(_365==null){
return false;
}
if(this.events==null){
return false;
}
var _367=this.events[_365.type];
for(var i in _367){
this.$$handleEvent=_367[i];
if(this.$$handleEvent(_365)===false){
_366=false;
}
}
return _366;
};
function fixEvent(_368){
if(_368!=null){
_368.preventDefault=fixEvent.preventDefault;
_368.stopPropagation=fixEvent.stopPropagation;
}
return _368;
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
var css={getElementsByClass:function(node,_369,tag){
var _36a=new Array();
var els=node.getElementsByTagName(tag);
var _36b=els.length;
var _36c=new RegExp("(^|\\s)"+_369+"(\\s|$)");
for(var i=0,j=0;i<_36b;i++){
if(this.elementHasClass(els[i],_369)){
_36a[j]=els[i];
j++;
}
}
return _36a;
},elementHasClass:function(el,_36d){
if(!el){
return false;
}
var _36e=new RegExp("\\b"+_36d+"\\b");
if(el.className.match(_36e)){
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
var _36f=document.getElementsByTagName("table");
for(var i=0;i<_36f.length;i++){
var _370=_36f[i];
if(css.elementHasClass(_370,"sortable")){
this.makeSortable(_370);
}
}
},makeSortable:function(_371){
if(!_371.id){
_371.id="sortableTable"+this.lastAssignedId++;
}
if(!_371.tHead||!_371.tHead.rows||0==_371.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_371.tHead.rows.length;i++){
if(css.elementHasClass(_371.tHead.rows[i],"sort_control_buttons")){
row=_371.tHead.rows[i];
break;
}
}
if(row==null){
row=_371.tHead.rows[_371.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _372=row.cells[i].firstChild;
_372.onclick=this.headingClicked;
_372.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _373=getEventTarget(e);
var td=_373.parentNode;
var tr=td.parentNode;
var _374=tr.parentNode;
var _375=_374.parentNode;
if(!_375.tBodies||_375.tBodies[0].rows.length<=1){
return false;
}
var _376=_373.getAttribute("columnId")||td.cellIndex;
var _377=css.getElementsByClass(td,"tableSortArrow","span");
var _378="";
if(_377.length>0){
_378=_377[0].getAttribute("sortOrder");
}
var itm="";
var _379=0;
while(""==itm&&_379<_375.tBodies[0].rows.length){
var elm=_375.tBodies[0].rows[_379].cells[_376];
if(elm.childNodes.length==1){
itm=that.getInnerText(_375.tBodies[0].rows[_379].cells[_376]);
}else{
itm=that.getInnerText(_375.tBodies[0].rows[_379].cells[_376].firstChild);
}
_379++;
}
var _37a=that.determineSortFunction(itm);
var _37b;
if(_375.id==that.lastSortedTable&&_376==that.sortColumnIndex){
_37b=that.newRows;
_37b.reverse();
}else{
that.sortColumnIndex=_376;
_37b=new Array();
for(var j=0;j<_375.tBodies[0].rows.length;j++){
_37b[j]=_375.tBodies[0].rows[j];
}
_37b.sort(_37a);
}
that.moveRows(_375,_37b);
that.newRows=_37b;
that.lastSortedTable=_375.id;
var _377=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_377.length;j++){
if(j==_376){
if(null==_378||""==_378||"DESC"==_378){
_377[j].innerHTML="▼";
_377[j].setAttribute("sortOrder","ASC");
}else{
_377[j].innerHTML="▲";
_377[j].setAttribute("sortOrder","DESC");
}
}else{
_377[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_375.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_375.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_375.tBodies[0].rows.length;i++){
tr=_375.tBodies[0].rows[i];
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
var _37c=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_37c=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_37c=this.sortDate;
}
if(itm.match(/^[�$]/)){
_37c=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_37c=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_37c=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_37c=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_37c=this.sortIP;
}
return _37c;
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
var _37d=a.cells[that.sortColumnIndex];
if(_37d.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _37e=b.cells[that.sortColumnIndex];
if(_37e.childNodes.length>1){
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
},moveRows:function(_37f,_380){
for(var i=0;i<_380.length;i++){
var _381=_380[i];
_37f.tBodies[0].appendChild(_381);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_382,_383,_384){
this.modId=_382;
this.pollId=_383;
this.results_div_id=_382+"_poll_results";
this.vote_form_id=_382+"_vote_form";
this.vote_radio_name=_382+"_vote";
this.hubnugget=_384;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _385=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_385,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _386=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_387){
return _387.checked;
});
if(null==_386){
return;
}else{
vote=_386.value;
}
var _388=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_388,onFailure:reportError,onComplete:function(){
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
ContentRotator.prototype={initialize:function(ids,_389,_38a,_38b,_38c,_38d,_38e,_38f,_390,loop){
this.ids=ids;
this.prefix=_389;
this.interval=_38a;
this.position=0;
this.paused=false;
this.transitionEffect=_38b;
this.transitioning=false;
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_38c){
this.playId=_38c;
}
if(_38d){
this.pauseId=_38d;
}
if(_38e){
this.positionIndicatorId=_38e;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_38f){
this.prevId=_38f;
}
if(_390){
this.nextId=_390;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},update:function(_391){
if(this.paused||this.activeUpdateThreadId!=_391){
return;
}
this.next();
setTimeout(this.update.bind(this,_391),this.interval);
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
},seek:function(_392){
var next=this.position<_392;
newPosition=_392%this.ids.length;
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
var _393=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_393.toggle();
this.position=newPosition;
if(this.fadeTransition){
var _394=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _394=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_394.options.onComplete=this.endTransition.bind(this);
_394.hide();
_394.toggle();
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
FeedManager.prototype={initialize:function(_395,_396,_397,_398,_399){
this.typeId=_395;
this.categoryId=_396;
this.userId=_399;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_398;
this.updateTime=_397;
this.originalUpdateTime=_397;
this.currentTime=parseInt(_397,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_39a){
_39a.preventDefault();
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
var _39b=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_39b=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_39b);
}.bind(this));
},getTimeAgo:function(_39c){
if(_39c<=1){
return "1 second ago";
}
var _39d=Math.round(_39c/60);
var _39e=Math.round(_39c/3600);
var days=Math.round(_39c/86400);
var _39f=Math.round(_39c/604800);
var _3a0=Math.round(_39c/2592000);
var _3a1=Math.round(_39c/31536000);
var ret="";
if(_3a1>=2){
ret=_3a1+" years ago";
}else{
if(_3a0>=2){
ret=_3a0+" months ago";
}else{
if(_39f>=2){
ret=_39f+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_39e>=2){
ret=_39e+" hours ago";
}else{
if(_39d>=1){
ret=_39d+" minute"+(_39d==1?"":"s")+" ago";
}else{
ret=_39c+" second"+(_39c==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _3a2=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_3a2;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _3a3=parseInt(req.responseText,10);
if(_3a3>0){
this.newStoriesAvailable=_3a3;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _3a4=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_3a4+" "+is+" available (click to load)";
},loadNewStories:function(_3a5){
var nt=_3a5?_3a5:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _3a6=$(document.createElement("div"));
_3a6.addClassName("feed_item");
_3a6.innerHTML=data["render"];
var _3a7=$("feed_box").down(".feed_item",0);
_3a7.parentNode.insertBefore(_3a6,_3a7);
_3a6.descendants().each(function(elt){
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
var _3a8=$(document.createElement("div"));
_3a8.addClassName("feed_item");
_3a8.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _3a9=$("feed_box").down(".feed_item",0);
_3a9.parentNode.insertBefore(_3a8,_3a9);
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
var _3aa=$(document.createElement("div"));
_3aa.addClassName("feed_item");
_3aa.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _3ab=$("feed_box").down(".feed_item",0);
_3ab.parentNode.insertBefore(_3aa,_3ab);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _3ac=$(document.createElement("div"));
_3ac.addClassName("feed_item");
_3ac.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _3ad=$("feed_box").down(".feed_item",0);
_3ad.parentNode.insertBefore(_3ac,_3ad);
return;
}
var _3ae=$("category_filters");
if(!_3ae){
var _3af=$(document.createElement("div"));
_3af.addClassName("feed_setting_box");
_3af.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_3af);
var _3ae=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_3ae.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_3b0,type,id){
new Ajax.Updater(_3b0,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_3b1,_3b2,_3b3){
makeGrowable(id,_3b1,_3b2,_3b3);
},makeExpandable:function(id,_3b4,_3b5,_3b6,_3b7){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_3b4,_3b5,_3b6,null,_3b7);
return;
}
elt.addClass("expandable_text dimmed").val(_3b4).data("hasFocus",false);
function _3b8(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_3b9,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _3ba(){
if(_3b8()){
if(!_3b6){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_3b4);
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
if(typeof (_3b5)=="function"){
_3b5.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_3ba();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_3ba();
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
},saveForm:function(_3bb){
this.getHandler(_3bb).save();
return false;
},addStoryToTop:function(_3bc,id,_3bd){
var _3be=$(document.createElement("div"));
_3be.innerHTML=_3bc;
_3be.addClassName("feed_item");
var _3bf=$("feed_box").down(".feed_item",0);
_3bf.parentNode.insertBefore(_3be,_3bf);
_3be.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _3c0=new fx.Color(_3be,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_3bd?_3bd:function(){
})});
_3c0.toggle();
},shrinkStatus:function(){
photoGalleryInserter.instance().close();
var s=$("status");
s.value="What's on your mind?";
s.addClassName("dimmed");
$$("#status_update input[type=checkbox]")[0].checked=false;
$$("#status_update .photo_preview")[0].innerHTML="";
$$("#status_update input[name=imageId]")[0].value=0;
$("status_wrapper").removeClassName("expanded");
var _3c1=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_3c1.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _3c2=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
category.startOver();
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _3c3=$("question");
_3c3.value="What is your question?";
_3c3.setStyle({"color":"#777"});
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
_3c2.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _3c4=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _3c5=$("subject");
var _3c6=$("message");
_3c5.setStyle({"color":"#777"});
_3c5.value="What is the subject of your forum post?";
_3c6.value="";
feed_forum_selector.chooseForum(0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_3c4.toggle();
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
},moreFeed:function(_3c7){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_3c7,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _3c8=JSONstring.toObject(req.responseText);
var _3c9=$("show_more");
_3c9.style.display="none";
_3c9.id="";
var _3ca=$(document.createElement("div"));
$("feed_box").appendChild(_3ca);
_3ca.innerHTML=_3c8["render"];
var _3cb=$("feed_more_"+_3c7);
$$("#feed_more_"+_3c7+" script").each(function(_3cc){
safeScriptEval(_3cc);
});
this.addItems(_3c8["feed"]);
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
},unhideUser:function(_3cd){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_3cd,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_3cd).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3ce=this.getById(fid);
if(_3ce){
_3ce.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_3cd);
if(hu){
if(hu.siblings().size()==0){
var _3cf=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3cf.parentNode.insertBefore(p,_3cf);
}
_3cf.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_3d0){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_3d0,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_3d0).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3d1=this.getById(fid);
if(_3d1){
_3d1.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_3d0);
if(hc){
if(hc.siblings().size()==0){
var _3d2=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3d2.parentNode.insertBefore(p,_3d2);
}
_3d2.remove();
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
var _3d3=$("overlay");
_3d3.classNames().each(function(name){
if(name!="overlay"){
_3d3.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_3d4){
if(_3d4){
$("overlay").addClassName(_3d4);
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
var _3d5=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d5+"px"});
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
var _3d6=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d6+"px"});
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
var _3d7=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d7+"px"});
}
adjustOverlayHeight();
}.bind(this)});
return false;
},showHubOverlay:function(url){
this.openOverlay("hubpage");
new Ajax.Request("/xml/articlerender.php?url="+url,{onComplete:function(req){
var _3d8=0;
$("overlay_content").innerHTML=req.responseText;
var _3d9=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d9+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_3da){
var code=_3da.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_3db){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_3db,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_3dc,_3dd){
var sure=confirm("Are you sure that you want to stop following "+_3dd+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_3dc,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_3dc).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _3de=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_3de.each(function(type){
var _3df=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_3e0){
if(_3e0.checked){
_3df=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_3df){
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
var _3e1=jq("#edit_button");
if(_3e1.html()=="edit"){
this.toggleFeedPrefs();
}
var _3e2=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_3e2);
return false;
},toggleFeedPrefs:function(){
var _3e3=$("edit_button");
var _3e4=$("filter").value;
var _3e5="edit";
if(_3e3.innerHTML=="save"){
_3e5="save";
}
if(_3e5=="save"){
this.updateFeedTypeFilters();
var _3e6=0;
var _3e7=$$(".ht_box");
for(var j=0;j<_3e7.length;j++){
if(_3e7[j].checked){
_3e6+=Number(_3e7[j].name.substr(3));
}
}
var _3e8=$("current_prefs");
if(_3e6!=_3e8.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_3e6,filter:_3e4,feed:1}).toQueryString(),onComplete:function(){
Element.update(_3e3,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3e9=parseInt(pf.getStyle("height"));
var _3ea=new fx.Height("preference_feedback",{duration:600});
_3ea.hide();
_3ea.custom(0,_3e9);
}});
_3e8.value=_3e6;
}else{
Element.update(_3e3,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3eb=parseInt(pf.getStyle("height"));
var _3ec=new fx.Height("preference_feedback",{duration:600});
_3ec.hide();
_3ec.custom(0,_3eb);
}
}
var curs=$$(".ht_cur");
var _3ed="";
for(var i=0;i<curs.length;i++){
_3ed=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_3e5=="edit"){
if(_3ed=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_3ed){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_3e5=="edit"){
_3e3.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_3ee,_3ef,_3f0){
this.id=id;
this.feedItemId=fid;
this.cdate=_3ee;
this.hidden=_3ef;
this.manager=_3f0;
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
},unhide:function(_3f1){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_3f1){
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
Event.observe(this.triggerId,"click",function(_3f2){
if(Event.element(_3f2).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _3f3=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_3f3){
elt.observe("mouseover",function(_3f4){
_3f4.show();
}.bind(this,_3f3));
elt.observe("mouseout",function(_3f5){
_3f5.hide();
}.bind(this,_3f3));
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
},share:function(_3f6){
if(_3f6===undefined){
_3f6=false;
}
if(_3f6){
var _3f7=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_3f7){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_3f8,_3f9){
if(_3f8){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_3f9){
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
var _3fa=$(this.htmlId);
_3fa.parentNode.insertBefore(hmsg,_3fa);
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
},hideUser:function(_3fb,_3fc){
_3fc=_3fc?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_3fb,force:_3fc}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3fd=$(this.htmlId);
_3fd.parentNode.insertBefore(hmsg,_3fd);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_3fb).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_3fe,_3ff){
_3ff=_3ff?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_3ff,categoryId:_3fe}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _400=$(this.htmlId);
_400.parentNode.insertBefore(hmsg,_400);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_3fe).each(function(elt){
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
var _401=$("feed_posts_"+this.id).immediateDescendants();
var _402=_401.size();
_401.each(function(elt,_403){
if(_403==_402-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _404=$("feed_comments_"+this.id).immediateDescendants();
var _405=_404.size();
var _406=0;
_404.each(function(elt,_407){
if(elt.hasClassName("show_previous")){
_406=_407;
}
});
_404.each(function(elt,_408){
if(_408==_406){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_409,num,_40a){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_409,num:num,startpos:_40a}).toQueryString(),onComplete:function(req){
var _40b=$("feed_posts_"+this.id);
_40b.down("div").hide();
new Insertion.Top(_40b,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_40c){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_40c}).toQueryString(),onComplete:function(req){
var _40d=$("feed_comments_"+this.id);
_40d.down("div").hide();
new Insertion.Top(_40d,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_40e,num,_40f){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_40e,num:num,startpos:_40f}).toQueryString(),onComplete:function(req){
var _410=$("feed_comments_"+this.id);
_410.down("div").hide();
new Insertion.Top(_410,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _411=$("feed_comments_"+this.id);
_411.innerHTML+=data["render"];
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
},observePostReporting:function(_412){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _413=$$("#story_"+this.id+" .feed_post");
if(_413.size()>1){
_413.each(function(elt){
var _414=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _415=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_414]=_415;
elt.observe("mouseover",_415);
var _416=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_414]=_416;
elt.observe("mouseout",_416);
var _417=this.manager.reportPost.bind(this.manager,_414);
this.clickHandlers[_414]=_417;
elt.observe("click",_417);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _418=$(document.createElement("a"));
_418.innerHTML="cancel report";
_418.href="#";
msg.appendChild(_418);
var _419=$(this.messageId);
_419.innerHTML="";
_419.appendChild(msg);
_419.addClassName("report_instructions");
var _41a=parseInt(_419.getStyle("height"));
var _41b=new fx.Height(this.messageId,{duration:500});
_41b.hide();
_41b.custom(0,_41a);
_418.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_413.size()==1){
var post=_413.detect(function(elt){
return true;
});
var _41c=post.id;
this.manager.reportPost(this.postIdFromDivId(_41c));
}
}
return false;
},postIdFromDivId:function(_41d){
return _41d.substring(_41d.lastIndexOf("_")+1);
},stopObservePostReporting:function(_41e){
var _41f=$$("#story_"+this.id+" .feed_post");
if(_41f.size()>1){
_41f.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _420=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_420]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_420]);
elt.stopObserving("click",this.clickHandlers[_420]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_41e){
Event.stop(_41e);
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
function deleteStatus(_421){
link=jq(_421.target);
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
function markerMap(m,_422,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_422);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_423,_424){
this.markers.push(new infoMarker(this,_423,_424,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_425,_426,_427,_428){
this.markermap=_425;
this.marker=_426;
this.content=_427;
this.position=_428;
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
var _429=$(this.legend.id+"_"+i);
if(_429){
_429.innerHTML="";
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
var _42a=this.directionsResult.routes[0];
var legs=_42a.legs;
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
var _42b=$(this.legend.id+"_"+i);
if(_42b){
_42b.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_42a.copyrights;
var _42c="";
for(var j=0;j<_42a.warnings.length;j++){
_42c+=_42a.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_42c;
};
markerMap.prototype.fetchDirections=function(){
var _42d=this.markers;
var l=_42d.length;
var _42e=new google.maps.LatLng(_42d[0].marker.getPosition().lat(),_42d[0].marker.getPosition().lng());
var _42f=new google.maps.LatLng(_42d[l-1].marker.getPosition().lat(),_42d[l-1].marker.getPosition().lng());
var _430=[];
for(var i=1;i<l-1;i++){
_430.push({location:new google.maps.LatLng(_42d[i].marker.getPosition().lat(),_42d[i].marker.getPosition().lng()),stopover:true});
}
var _431={origin:_42e,destination:_42f,waypoints:_430,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _432=new google.maps.DirectionsService();
_432.route(_431,function(_433,_434){
if(_434==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_433;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_435){
var _436="map_canvas_"+id;
var _437=mm.getMapById(id);
if(!_437){
var map=new google.maps.Map(document.getElementById(_436));
var _437=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_437);
sv=true;
}else{
var map=_437.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_437.removeAllMarkers();
var _438="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _439=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_439+".png";
var _43a="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _43b=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_437.addMarker(_43b,_43a);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_438+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_437.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_438+="<div id=\""+_437.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_438+="<div id=\""+_437.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_437.legend.innerHTML=_438;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_435||!_437.directionsResult){
_437.fetchDirections();
}else{
_437.renderDirections();
}
}else{
var _43c={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_437.directionsResult=_43c;
_437.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_43d){
var id=_43d.markermap.id;
if(!id){
return;
}
var _43e=mapLetterFromPosition(_43d.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_43e+".png";
_43d.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_43d.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_43f){
var id=_43f.markermap.id;
if(!id){
return;
}
var _440=mapLetterFromPosition(_43f.position);
var icon="http://www.google.com/mapfiles/marker_green"+_440+".png";
_43f.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_43f.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_441,id,_442){
var _443=mm.getMapById(id);
if(_442<_443.markers.length){
highlightMarker(_443.markers[_442]);
}
};
function unhighlightMapMarker(_444,id,_445){
var _446=mm.getMapById(id);
if(_445<_446.markers.length){
unhighlightMarker(_446.markers[_445]);
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
var _447=jQuery("#editor_box");
if(_447.hasClass("edit_box")){
jQuery(".message",_447.closest(".postright")).show();
}
_447.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_448,_449){
var ta=jq("#editor_box textarea");
var _44a=ta.val();
if(_44a.length){
ta.val(_44a+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_448,_449)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_448,_449)+"[/img]\n\n");
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
var _44b=jQuery("#report_box");
_44b.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _44c=jQuery(this).closest("div.replies_box_wrapper");
var _44d=jQuery(this).closest("div.reply_collapser");
if(_44d.hasClass("show")){
_44d.addClass("hide").removeClass("show");
jQuery("a",_44d).html("");
jQuery("> .replies_box",_44c).slideDown();
}else{
jQuery("> .replies_box",_44c).slideUp(500,function(){
_44d.addClass("show").removeClass("hide");
jQuery("a",_44d).html(""+jQuery("li.threaded",_44c).length+" replies");
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
var _44e=jQuery(this);
var _44f=jQuery("#threaded_reply_to_box");
if(_44e.html()=="hide"){
_44e.html("this");
_44f.hide();
return false;
}
var _450=_44e.attr("class").substr(7);
var _451=jQuery("#post"+_450+" .username").html();
var html="<p class=\"by\">By "+_451+"</p>"+jQuery("#message"+_450).html();
var _452=_44e.closest("li.threaded");
if(_44f.length>0){
_452.append(_44f);
}else{
jQuery(_452).append("<div id=\"threaded_reply_to_box\"></div>");
_44f=jQuery("#threaded_reply_to_box");
}
_44f.html(html);
var pos=_44e.position();
var _453=_44e.width();
_44f.css({"left":(pos.left+_453)+"px","top":pos.top+"px"});
_44f.show();
_44e.html("hide");
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
var _454=jQuery(this);
_454.attr("src",_454.data("src"));
});
});
});
function show_post_reply_box(_455){
_455.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _456=jQuery("#editor_box");
_456.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_456).text("submit");
jQuery("form",_456).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_456).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _457=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _458=_457?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_458+="<br/>";
jQuery("textarea",_456).after(_458);
}
if(jQuery("#follow_topic").length==0){
var _459="checked";
var _45a=window.location.pathname;
var arr=_45a.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _458="<p id=\"follow_topic\"></p>";
jQuery("textarea",_456).after(_458);
}
jQuery("#posterror ul",_456).html("");
jQuery("#posterror",_456).hide();
jQuery("textarea",_456).val("");
jQuery("#postId",_456).val(_455.attr("id").substring(4));
_456.append(jQuery("#formatting_tips"));
_456.show();
var x=_456.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_45b){
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _45c=jQuery("#report_box");
jQuery("#reportPostId",_45c).val(_45b.attr("id").substring(4));
jQuery("form",_45c).ajaxForm({type:"POST",dataType:"json",complete:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_45b).append(_45c);
jQuery(">.post_wrap > .actionmenu",_45b).append(_45c);
_45c.show();
var x=_45c.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyStart(_45d,_45e){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_45e["ele"]).closest("li.threaded");
if(!_45d){
suFH.nextUri="?reply="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_post_reply_box(post);
}
};
function processReplyError(data,_45f,_460){
alert("There may have been an error posting your reply ("+_45f+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_461,_462){
alert("There may have been an error updating your post ("+_461+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_463,_464){
jQuery("li.threaded img.wait").remove();
if(_464=="error"){
alert(_463.responseText);
return;
}
data=eval("("+_463.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _465=jQuery("#editor_box");
_465.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_465).text("Save");
jQuery("form",_465).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_465).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _466=document.getElementById("admincenter");
replyOptionsHTML=_466?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_465).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_465).html("");
jQuery("#posterror",_465).hide();
jQuery("#postId",_465).val(data.postId);
jQuery("textarea",_465).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_465.append(jQuery("#formatting_tips"));
_465.show();
var x=_465.offset().top-300;
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
function processDeleteResponse(_467,_468,_469){
if(_468=="error"){
jQuery("li.threaded img.wait").remove();
alert(_467);
}
};
function processUndeleteResponse(_46a,_46b,_46c){
if(_46b=="error"){
jQuery("li.threaded img.wait").remove();
alert(_46a);
}
};
function processReportStart(_46d,_46e){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_46e["ele"]).closest("li.threaded");
if(!_46d){
suFH.nextUri="?report="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_report_box(post);
}
};
function processReportResponse(_46f,_470){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _471=jQuery("#report_box");
_471.hide();
alert(_46f.responseText);
};
(function($){
$.extend($.fn,{validate:function(_472){
if(!this.length){
_472&&_472.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _473=$.data(this[0],"validator");
if(_473){
return _473;
}
_473=new $.validator(_472,this[0]);
$.data(this[0],"validator",_473);
if(_473.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_473.cancelSubmit=true;
});
if(_473.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_473.submitButton=this;
});
}
this.submit(function(_474){
if(_473.settings.debug){
_474.preventDefault();
}
function _475(){
if(_473.settings.submitHandler){
if(_473.submitButton){
var _476=$("<input type='hidden'/>").attr("name",_473.submitButton.name).val(_473.submitButton.value).appendTo(_473.currentForm);
}
_473.settings.submitHandler.call(_473,_473.currentForm);
if(_473.submitButton){
_476.remove();
}
return false;
}
return true;
};
if(_473.cancelSubmit){
_473.cancelSubmit=false;
return _475();
}
if(_473.form()){
if(_473.pendingRequest){
_473.formSubmitted=true;
return false;
}
return _475();
}else{
_473.focusInvalid();
return false;
}
});
}
return _473;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _477=true;
var _478=$(this[0].form).validate();
this.each(function(){
_477&=_478.element(this);
});
return _477;
}
},removeAttrs:function(_479){
var _47a={},_47b=this;
$.each(_479.split(/\s/),function(_47c,_47d){
_47a[_47d]=_47b.attr(_47d);
_47b.removeAttr(_47d);
});
return _47a;
},rules:function(_47e,_47f){
var _480=this[0];
if(_47e){
var _481=$.data(_480.form,"validator").settings;
var _482=_481.rules;
var _483=$.validator.staticRules(_480);
switch(_47e){
case "add":
$.extend(_483,$.validator.normalizeRule(_47f));
_482[_480.name]=_483;
if(_47f.messages){
_481.messages[_480.name]=$.extend(_481.messages[_480.name],_47f.messages);
}
break;
case "remove":
if(!_47f){
delete _482[_480.name];
return _483;
}
var _484={};
$.each(_47f.split(/\s/),function(_485,_486){
_484[_486]=_483[_486];
delete _483[_486];
});
return _484;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_480),$.validator.classRules(_480),$.validator.attributeRules(_480),$.validator.staticRules(_480)),_480);
if(data.required){
var _487=data.required;
delete data.required;
data=$.extend({required:_487},data);
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
$.validator=function(_488,form){
this.settings=$.extend(true,{},$.validator.defaults,_488);
this.currentForm=form;
this.init();
};
$.validator.format=function(_489,_48a){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_489);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_48a.constructor!=Array){
_48a=$.makeArray(arguments).slice(1);
}
if(_48a.constructor!=Array){
_48a=[_48a];
}
$.each(_48a,function(i,n){
_489=_489.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _489;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_48b){
this.lastActive=_48b;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_48b,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_48b)).hide();
}
},onfocusout:function(_48c){
if(!this.checkable(_48c)&&(_48c.name in this.submitted||!this.optional(_48c))){
this.element(_48c);
}
},onkeyup:function(_48d){
if(_48d.name in this.submitted||_48d==this.lastElement){
this.element(_48d);
}
},onclick:function(_48e){
if(_48e.name in this.submitted){
this.element(_48e);
}else{
if(_48e.parentNode.name in this.submitted){
this.element(_48e.parentNode);
}
}
},highlight:function(_48f,_490,_491){
$(_48f).addClass(_490).removeClass(_491);
},unhighlight:function(_492,_493,_494){
$(_492).removeClass(_493).addClass(_494);
}},setDefaults:function(_495){
$.extend($.validator.defaults,_495);
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
var _496=(this.groups={});
$.each(this.settings.groups,function(key,_497){
$.each(_497.split(/\s/),function(_498,name){
_496[name]=key;
});
});
var _499=this.settings.rules;
$.each(_499,function(key,_49a){
_499[key]=$.validator.normalizeRule(_49a);
});
function _49b(_49c){
var _49d=$.data(this[0].form,"validator"),_49e="on"+_49c.type.replace(/^validate/,"");
_49d.settings[_49e]&&_49d.settings[_49e].call(_49d,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_49b).validateDelegate(":radio, :checkbox, select, option","click",_49b);
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
for(var i=0,_49f=(this.currentElements=this.elements());_49f[i];i++){
this.check(_49f[i]);
}
return this.valid();
},element:function(_4a0){
_4a0=this.clean(_4a0);
this.lastElement=_4a0;
this.prepareElement(_4a0);
this.currentElements=$(_4a0);
var _4a1=this.check(_4a0);
if(_4a1){
delete this.invalid[_4a0.name];
}else{
this.invalid[_4a0.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _4a1;
},showErrors:function(_4a2){
if(_4a2){
$.extend(this.errorMap,_4a2);
this.errorList=[];
for(var name in _4a2){
this.errorList.push({message:_4a2[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_4a3){
return !(_4a3.name in _4a2);
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
var _4a4=0;
for(var i in obj){
_4a4++;
}
return _4a4;
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
var _4a5=this.lastActive;
return _4a5&&$.grep(this.errorList,function(n){
return n.element.name==_4a5.name;
}).length==1&&_4a5;
},elements:function(){
var _4a6=this,_4a7={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_4a6.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _4a7||!_4a6.objectLength($(this).rules())){
return false;
}
_4a7[this.name]=true;
return true;
});
},clean:function(_4a8){
return $(_4a8)[0];
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
},prepareElement:function(_4a9){
this.reset();
this.toHide=this.errorsFor(_4a9);
},check:function(_4aa){
_4aa=this.clean(_4aa);
if(this.checkable(_4aa)){
_4aa=this.findByName(_4aa.name).not(this.settings.ignore)[0];
}
var _4ab=$(_4aa).rules();
var _4ac=false;
for(var _4ad in _4ab){
var rule={method:_4ad,parameters:_4ab[_4ad]};
try{
var _4ae=$.validator.methods[_4ad].call(this,_4aa.value.replace(/\r/g,""),_4aa,rule.parameters);
if(_4ae=="dependency-mismatch"){
_4ac=true;
continue;
}
_4ac=false;
if(_4ae=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_4aa));
return;
}
if(!_4ae){
this.formatAndAdd(_4aa,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_4aa.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_4ac){
return;
}
if(this.objectLength(_4ab)){
this.successList.push(_4aa);
}
return true;
},customMetaMessage:function(_4af,_4b0){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_4af).metadata()[this.settings.meta]:$(_4af).metadata();
return meta&&meta.messages&&meta.messages[_4b0];
},customMessage:function(name,_4b1){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_4b1]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_4b2,_4b3){
return this.findDefined(this.customMessage(_4b2.name,_4b3),this.customMetaMessage(_4b2,_4b3),!this.settings.ignoreTitle&&_4b2.title||undefined,$.validator.messages[_4b3],"<strong>Warning: No message defined for "+_4b2.name+"</strong>");
},formatAndAdd:function(_4b4,rule){
var _4b5=this.defaultMessage(_4b4,rule.method),_4b6=/\$?\{(\d+)\}/g;
if(typeof _4b5=="function"){
_4b5=_4b5.call(this,rule.parameters,_4b4);
}else{
if(_4b6.test(_4b5)){
_4b5=jQuery.format(_4b5.replace(_4b6,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_4b5,element:_4b4});
this.errorMap[_4b4.name]=_4b5;
this.submitted[_4b4.name]=_4b5;
},addWrapper:function(_4b7){
if(this.settings.wrapper){
_4b7=_4b7.add(_4b7.parent(this.settings.wrapper));
}
return _4b7;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _4b8=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_4b8.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_4b8.element,_4b8.message);
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
for(var i=0,_4b9=this.validElements();_4b9[i];i++){
this.settings.unhighlight.call(this,_4b9[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_4ba,_4bb){
var _4bc=this.errorsFor(_4ba);
if(_4bc.length){
_4bc.removeClass().addClass(this.settings.errorClass);
_4bc.attr("generated")&&_4bc.html(_4bb);
}else{
_4bc=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_4ba),generated:true}).addClass(this.settings.errorClass).html(_4bb||"");
if(this.settings.wrapper){
_4bc=_4bc.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_4bc).length){
this.settings.errorPlacement?this.settings.errorPlacement(_4bc,$(_4ba)):_4bc.insertAfter(_4ba);
}
}
if(!_4bb&&this.settings.success){
_4bc.text("");
typeof this.settings.success=="string"?_4bc.addClass(this.settings.success):this.settings.success(_4bc);
}
this.toShow=this.toShow.add(_4bc);
},errorsFor:function(_4bd){
var name=this.idOrName(_4bd);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_4be){
return this.groups[_4be.name]||(this.checkable(_4be)?_4be.name:_4be.id||_4be.name);
},checkable:function(_4bf){
return /radio|checkbox/i.test(_4bf.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_4c0,_4c1){
return _4c1.form==form&&_4c1.name==name&&_4c1||null;
});
},getLength:function(_4c2,_4c3){
switch(_4c3.nodeName.toLowerCase()){
case "select":
return $("option:selected",_4c3).length;
case "input":
if(this.checkable(_4c3)){
return this.findByName(_4c3.name).filter(":checked").length;
}
}
return _4c2.length;
},depend:function(_4c4,_4c5){
return this.dependTypes[typeof _4c4]?this.dependTypes[typeof _4c4](_4c4,_4c5):true;
},dependTypes:{"boolean":function(_4c6,_4c7){
return _4c6;
},"string":function(_4c8,_4c9){
return !!$(_4c8,_4c9.form).length;
},"function":function(_4ca,_4cb){
return _4ca(_4cb);
}},optional:function(_4cc){
return !$.validator.methods.required.call(this,$.trim(_4cc.value),_4cc)&&"dependency-mismatch";
},startRequest:function(_4cd){
if(!this.pending[_4cd.name]){
this.pendingRequest++;
this.pending[_4cd.name]=true;
}
},stopRequest:function(_4ce,_4cf){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_4ce.name];
if(_4cf&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_4cf&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_4d0){
return $.data(_4d0,"previousValue")||$.data(_4d0,"previousValue",{old:null,valid:true,message:this.defaultMessage(_4d0,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_4d1,_4d2){
_4d1.constructor==String?this.classRuleSettings[_4d1]=_4d2:$.extend(this.classRuleSettings,_4d1);
},classRules:function(_4d3){
var _4d4={};
var _4d5=$(_4d3).attr("class");
_4d5&&$.each(_4d5.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_4d4,$.validator.classRuleSettings[this]);
}
});
return _4d4;
},attributeRules:function(_4d6){
var _4d7={};
var _4d8=$(_4d6);
for(var _4d9 in $.validator.methods){
var _4da=_4d8.attr(_4d9);
if(_4da){
_4d7[_4d9]=_4da;
}
}
if(_4d7.maxlength&&/-1|2147483647|524288/.test(_4d7.maxlength)){
delete _4d7.maxlength;
}
return _4d7;
},metadataRules:function(_4db){
if(!$.metadata){
return {};
}
var meta=$.data(_4db.form,"validator").settings.meta;
return meta?$(_4db).metadata()[meta]:$(_4db).metadata();
},staticRules:function(_4dc){
var _4dd={};
var _4de=$.data(_4dc.form,"validator");
if(_4de.settings.rules){
_4dd=$.validator.normalizeRule(_4de.settings.rules[_4dc.name])||{};
}
return _4dd;
},normalizeRules:function(_4df,_4e0){
$.each(_4df,function(prop,val){
if(val===false){
delete _4df[prop];
return;
}
if(val.param||val.depends){
var _4e1=true;
switch(typeof val.depends){
case "string":
_4e1=!!$(val.depends,_4e0.form).length;
break;
case "function":
_4e1=val.depends.call(_4e0,_4e0);
break;
}
if(_4e1){
_4df[prop]=val.param!==undefined?val.param:true;
}else{
delete _4df[prop];
}
}
});
$.each(_4df,function(rule,_4e2){
_4df[rule]=$.isFunction(_4e2)?_4e2(_4e0):_4e2;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_4df[this]){
_4df[this]=Number(_4df[this]);
}
});
$.each(["rangelength","range"],function(){
if(_4df[this]){
_4df[this]=[Number(_4df[this][0]),Number(_4df[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_4df.min&&_4df.max){
_4df.range=[_4df.min,_4df.max];
delete _4df.min;
delete _4df.max;
}
if(_4df.minlength&&_4df.maxlength){
_4df.rangelength=[_4df.minlength,_4df.maxlength];
delete _4df.minlength;
delete _4df.maxlength;
}
}
if(_4df.messages){
delete _4df.messages;
}
return _4df;
},normalizeRule:function(data){
if(typeof data=="string"){
var _4e3={};
$.each(data.split(/\s/),function(){
_4e3[this]=true;
});
data=_4e3;
}
return data;
},addMethod:function(name,_4e4,_4e5){
$.validator.methods[name]=_4e4;
$.validator.messages[name]=_4e5!=undefined?_4e5:$.validator.messages[name];
if(_4e4.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_4e6,_4e7,_4e8){
if(!this.depend(_4e8,_4e7)){
return "dependency-mismatch";
}
switch(_4e7.nodeName.toLowerCase()){
case "select":
var val=$(_4e7).val();
return val&&val.length>0;
case "input":
if(this.checkable(_4e7)){
return this.getLength(_4e6,_4e7)>0;
}
default:
return $.trim(_4e6).length>0;
}
},remote:function(_4e9,_4ea,_4eb){
if(this.optional(_4ea)){
return "dependency-mismatch";
}
var _4ec=this.previousValue(_4ea);
if(!this.settings.messages[_4ea.name]){
this.settings.messages[_4ea.name]={};
}
_4ec.originalMessage=this.settings.messages[_4ea.name].remote;
this.settings.messages[_4ea.name].remote=_4ec.message;
_4eb=typeof _4eb=="string"&&{url:_4eb}||_4eb;
if(this.pending[_4ea.name]){
return "pending";
}
if(_4ec.old===_4e9){
return _4ec.valid;
}
_4ec.old=_4e9;
var _4ed=this;
this.startRequest(_4ea);
var data={};
data[_4ea.name]=_4e9;
$.ajax($.extend(true,{url:_4eb,mode:"abort",port:"validate"+_4ea.name,dataType:"json",data:data,success:function(_4ee){
_4ed.settings.messages[_4ea.name].remote=_4ec.originalMessage;
var _4ef=_4ee===true;
if(_4ef){
var _4f0=_4ed.formSubmitted;
_4ed.prepareElement(_4ea);
_4ed.formSubmitted=_4f0;
_4ed.successList.push(_4ea);
_4ed.showErrors();
}else{
var _4f1={};
var _4f2=_4ee||_4ed.defaultMessage(_4ea,"remote");
_4f1[_4ea.name]=_4ec.message=$.isFunction(_4f2)?_4f2(_4e9):_4f2;
_4ed.showErrors(_4f1);
}
_4ec.valid=_4ef;
_4ed.stopRequest(_4ea,_4ef);
}},_4eb));
return "pending";
},minlength:function(_4f3,_4f4,_4f5){
return this.optional(_4f4)||this.getLength($.trim(_4f3),_4f4)>=_4f5;
},maxlength:function(_4f6,_4f7,_4f8){
return this.optional(_4f7)||this.getLength($.trim(_4f6),_4f7)<=_4f8;
},rangelength:function(_4f9,_4fa,_4fb){
var _4fc=this.getLength($.trim(_4f9),_4fa);
return this.optional(_4fa)||(_4fc>=_4fb[0]&&_4fc<=_4fb[1]);
},min:function(_4fd,_4fe,_4ff){
return this.optional(_4fe)||_4fd>=_4ff;
},max:function(_500,_501,_502){
return this.optional(_501)||_500<=_502;
},range:function(_503,_504,_505){
return this.optional(_504)||(_503>=_505[0]&&_503<=_505[1]);
},email:function(_506,_507){
return this.optional(_507)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_506);
},url:function(_508,_509){
return this.optional(_509)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_508);
},date:function(_50a,_50b){
return this.optional(_50b)||!/Invalid|NaN/.test(new Date(_50a));
},dateISO:function(_50c,_50d){
return this.optional(_50d)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_50c);
},number:function(_50e,_50f){
return this.optional(_50f)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_50e);
},digits:function(_510,_511){
return this.optional(_511)||/^\d+$/.test(_510);
},creditcard:function(_512,_513){
if(this.optional(_513)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_512)){
return false;
}
var _514=0,_515=0,_516=false;
_512=_512.replace(/\D/g,"");
for(var n=_512.length-1;n>=0;n--){
var _517=_512.charAt(n);
var _515=parseInt(_517,10);
if(_516){
if((_515*=2)>9){
_515-=9;
}
}
_514+=_515;
_516=!_516;
}
return (_514%10)==0;
},accept:function(_518,_519,_51a){
_51a=typeof _51a=="string"?_51a.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_519)||_518.match(new RegExp(".("+_51a+")$","i"));
},equalTo:function(_51b,_51c,_51d){
var _51e=$(_51d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_51c).valid();
});
return $.trim(_51b)==$.trim(_51e.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _51f={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_520,_521,xhr){
var port=_520.port;
if(_520.mode=="abort"){
if(_51f[port]){
_51f[port].abort();
}
_51f[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_522){
var mode=("mode" in _522?_522:$.ajaxSettings).mode,port=("port" in _522?_522:$.ajaxSettings).port;
if(mode=="abort"){
if(_51f[port]){
_51f[port].abort();
}
return (_51f[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_523,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_523,_524,true);
},teardown:function(){
this.removeEventListener(_523,_524,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _524(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_525,type,_526){
return this.bind(type,function(_527){
var _528=$(_527.target);
if(_528.is(_525)){
return _526.apply(_528,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_529,_52a,_52b){
return this.optional(_52a)||this.getLength(jq.trim(_529),_52a)==_52b;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_52c,_52d,_52e){
if(!this.depend(_52e,_52d)){
return "dependency-mismatch";
}
switch(_52d.nodeName.toLowerCase()){
case "select":
var val=jq(_52d).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_52d)){
return this.getLength(_52c,_52d)==0;
}
default:
return jq.trim(_52c).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_52f,_530){
if(!this.depend(_530,_52f)){
return "dependency-mismatch";
}
var _531=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_531=true;
}else{
var _532=ssn.split("-");
if(_532[0]=="000"||_532[1]=="00"||_532[2]=="0000"){
_531=true;
}
if(_532[0]=="666"){
_531=true;
}
var _533=parseInt(_532[0],10);
if(_533>=900){
if(_532[1][0]!=7&&_532[1][0]!=8){
_531=true;
}
}
}
return !_531;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_534,_535,_536){
if(!this.depend(_536,_535)){
return "dependency-mismatch";
}
return _534.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_537,_538){
if(!this.depend(_538,_537)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_539,_53a,_53b){
var _539=jq.trim(_539);
if(_539.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _53c=_539.split("-");
var m=1*_53c[0]-1;
var d=1*_53c[1];
var y=1*_53c[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_53d,_53e,_53f){
return jq.trim(_53d).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
(function(_540,$,_541){
"use strict";
var _542=$.event,_543;
_542.special.smartresize={setup:function(){
$(this).bind("resize",_542.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_542.special.smartresize.handler);
},handler:function(_544,_545){
var _546=this,args=arguments;
_544.type="smartresize";
if(_543){
clearTimeout(_543);
}
_543=setTimeout(function(){
jQuery.event.handle.apply(_546,args);
},_545==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_547,_548){
this.element=$(_548);
this._create(_547);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_549){
var _54a=this.options.itemSelector;
return !_54a?_549:_549.filter(_54a).add(_549.find(_54a));
},_getBricks:function(_54b){
var _54c=this._filterFindBricks(_54b).css({position:"absolute"}).addClass("masonry-brick");
return _54c;
},_create:function(_54d){
this.options=$.extend(true,{},$.Mason.settings,_54d);
this.styleQueue=[];
var _54e=this.element[0].style;
this.originalStyle={height:_54e.height||""};
var _54f=this.options.containerStyle;
for(var prop in _54f){
this.originalStyle[prop]=_54e[prop]||"";
}
this.element.css(_54f);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _550=this;
setTimeout(function(){
_550.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_540).bind("smartresize.masonry",function(){
_550.resize();
});
}
this.reloadItems();
},_init:function(_551){
this._getColumns();
this._reLayout(_551);
},option:function(key,_552){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_553,_554){
for(var i=0,len=_553.length;i<len;i++){
this._placeBrick(_553[i]);
}
var _555={};
_555.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _556=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_556++;
}
_555.width=(this.cols-_556)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_555});
var _557=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_558=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_557](obj.style,_558);
}
this.styleQueue=[];
if(_554){
_554.call(_553);
}
this.isLaidOut=true;
},_getColumns:function(){
var _559=this.options.isFitWidth?this.element.parent():this.element,_55a=_559.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_55a):this.options.columnWidth||this.$bricks.outerWidth(true)||_55a;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_55a+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_55b){
var _55c=$(_55b),_55d,_55e,_55f,_560,j;
_55d=Math.ceil(_55c.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_55d=Math.min(_55d,this.cols);
if(_55d===1){
_55f=this.colYs;
}else{
_55e=this.cols+1-_55d;
_55f=[];
for(j=0;j<_55e;j++){
_560=this.colYs.slice(j,j+_55d);
_55f[j]=Math.max.apply(Math,_560);
}
}
var _561=Math.min.apply(Math,_55f),_562=0;
for(var i=0,len=_55f.length;i<len;i++){
if(_55f[i]===_561){
_562=i;
break;
}
}
var _563={top:_561+this.offset.y};
_563[this.horizontalDirection]=this.columnWidth*_562+this.offset.x;
this.styleQueue.push({$el:_55c,style:_563});
var _564=_561+_55c.outerHeight(true),_565=this.cols+1-len;
for(i=0;i<_565;i++){
this.colYs[_562+i]=_564;
}
},resize:function(){
var _566=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_566){
this._reLayout();
}
},_reLayout:function(_567){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_567);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_568){
this.reloadItems();
this._init(_568);
},appended:function(_569,_56a,_56b){
if(_56a){
this._filterFindBricks(_569).css({top:this.element.height()});
var _56c=this;
setTimeout(function(){
_56c._appended(_569,_56b);
},1);
}else{
this._appended(_569,_56b);
}
},_appended:function(_56d,_56e){
var _56f=this._getBricks(_56d);
this.$bricks=this.$bricks.add(_56f);
this.layout(_56f,_56e);
},remove:function(_570){
this.$bricks=this.$bricks.not(_570);
_570.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _571=this.element[0].style;
for(var prop in this.originalStyle){
_571[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_540).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_572){
var _573=this,_574=_573.find("img").add(_573.filter("img")),len=_574.length,_575="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_576=[];
function _577(){
_572.call(_573,_574);
};
function _578(_579){
var img=_579.target;
if(img.src!==_575&&$.inArray(img,_576)===-1){
_576.push(img);
if(--len<=0){
setTimeout(_577);
_574.unbind(".imagesLoaded",_578);
}
}
};
if(!len){
_577();
}
_574.bind("load.imagesLoaded error.imagesLoaded",_578).each(function(){
var src=this.src;
this.src=_575;
this.src=src;
});
return _573;
};
var _57a=function(_57b){
if(_540.console){
_540.console.error(_57b);
}
};
$.fn.masonry=function(_57c){
if(typeof _57c==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _57d=$.data(this,"masonry");
if(!_57d){
_57a("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_57c+"'");
return;
}
if(!$.isFunction(_57d[_57c])||_57c.charAt(0)==="_"){
_57a("no such method '"+_57c+"' for masonry instance");
return;
}
_57d[_57c].apply(_57d,args);
});
}else{
this.each(function(){
var _57e=$.data(this,"masonry");
if(_57e){
_57e.option(_57c||{});
_57e._init();
}else{
$.data(this,"masonry",new $.Mason(_57c,this));
}
});
}
return this;
};
})(window,jQuery);
(function(_57f,$,_580){
$.infinitescroll=function infscr(_581,_582,_583){
this.element=$(_583);
if(!this._create(_581,_582)){
this.failed=true;
}
};
$.infinitescroll.defaults={loading:{finished:_580,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"http://www.infinite-scroll.com/loading.gif",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:"fast",start:_580},state:{isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,currPage:1},callback:_580,debug:false,behavior:_580,binder:$(_57f),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:_580,dataType:"html",appendCallback:true,bufferPx:40,errorCallback:function(){
},infid:0,pixelsFromNavToBottom:_580,path:_580,pageLimit:false};
$.infinitescroll.prototype={_binding:function infscr_binding(_584){
var _585=this,opts=_585.options;
opts.v="2.0b2.111027";
if(!!opts.behavior&&this["_binding_"+opts.behavior]!==_580){
this["_binding_"+opts.behavior].call(this);
return;
}
if(_584!=="bind"&&_584!=="unbind"){
this._debug("Binding value  "+_584+" not valid");
return false;
}
if(_584=="unbind"){
(this.options.binder).unbind("smartscroll.infscr."+_585.options.infid);
}else{
(this.options.binder)[_584]("smartscroll.infscr."+_585.options.infid,function(){
_585.scroll();
});
}
this._debug("Binding",_584);
},_create:function infscr_create(_586,_587){
var opts=$.extend(true,{},$.infinitescroll.defaults,_586);
if(!this._validate(_586)){
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
opts.callback=function(_588,data){
if(!!opts.behavior&&_588["_callback_"+opts.behavior]!==_580){
_588["_callback_"+opts.behavior].call($(opts.contentSelector)[0],data);
}
if(_587){
_587.call($(opts.contentSelector)[0],data,opts);
}
};
this._setup();
return true;
},_debug:function infscr_debug(){
if(this.options&&this.options.debug){
return _57f.console&&console.log.call(console,arguments);
}
},_determinepath:function infscr_determinepath(path){
var opts=this.options;
if(!!opts.behavior&&this["_determinepath_"+opts.behavior]!==_580){
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
if(!!opts.behavior&&this["_error_"+opts.behavior]!==_580){
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
var opts=this.options,_589=this.options.callback,_58a=(opts.state.isDone)?"done":(!opts.appendCallback)?"no-append":"append",frag;
if(!!opts.behavior&&this["_loadcallback_"+opts.behavior]!==_580){
this["_loadcallback_"+opts.behavior].call(this,box,data);
return;
}
switch(_58a){
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
var _58b=box.children();
if(_58b.length==0){
return this._error("end");
}
frag=document.createDocumentFragment();
while(box[0].firstChild){
frag.appendChild(box[0].firstChild);
}
this._debug("contentSelector",$(opts.contentSelector)[0]);
$(opts.contentSelector)[0].appendChild(frag);
data=_58b.get();
break;
}
opts.loading.finished.call($(opts.contentSelector)[0],opts);
if(opts.animate){
var _58c=$(_57f).scrollTop()+$("#infscr-loading").height()+opts.extraScrollPx+"px";
$("html,body").animate({scrollTop:_58c},800,function(){
opts.state.isDuringAjax=false;
});
}
if(!opts.animate){
opts.state.isDuringAjax=false;
}
_589(this,data);
},_nearbottom:function infscr_nearbottom(){
var opts=this.options,_58d=0+$(document).height()-(opts.binder.scrollTop())-$(_57f).height();
if(!!opts.behavior&&this["_nearbottom_"+opts.behavior]!==_580){
return this["_nearbottom_"+opts.behavior].call(this);
}
this._debug("math:",_58d,opts.pixelsFromNavToBottom);
return (_58d-opts.bufferPx<opts.pixelsFromNavToBottom);
},_pausing:function infscr_pausing(_58e){
var opts=this.options;
if(!!opts.behavior&&this["_pausing_"+opts.behavior]!==_580){
this["_pausing_"+opts.behavior].call(this,_58e);
return;
}
if(_58e!=="pause"&&_58e!=="resume"&&_58e!==null){
this._debug("Invalid argument. Toggling pause value instead");
}
_58e=(_58e&&(_58e=="pause"||_58e=="resume"))?_58e:"toggle";
switch(_58e){
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
if(!!opts.behavior&&this["_setup_"+opts.behavior]!==_580){
this["_setup_"+opts.behavior].call(this);
return;
}
this._binding("bind");
return false;
},_showdonemsg:function infscr_showdonemsg(){
var opts=this.options;
if(!!opts.behavior&&this["_showdonemsg_"+opts.behavior]!==_580){
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
},retrieve:function infscr_retrieve(_58f){
var _590=this,opts=_590.options,path=opts.path,box,frag,_591,_592,_593,_58f=_58f||null,_594=(!!_58f)?_58f:opts.state.currPage;
beginAjax=function infscr_ajax(opts){
opts.state.currPage++;
_590._debug("heading into ajax",path);
box=$(opts.contentSelector).is("table")?$("<tbody/>"):$("<div/>");
_591=path.join(opts.state.currPage);
_592=(opts.dataType=="html"||opts.dataType=="json")?opts.dataType:"html+callback";
if(opts.appendCallback&&opts.dataType=="html"){
_592+="+callback";
}
switch(_592){
case "html+callback":
_590._debug("Using HTML via .load() method");
box.load(_591+" "+opts.itemSelector,null,function infscr_ajax_callback(_595){
_590._loadcallback(box,_595);
});
break;
case "html":
case "json":
_590._debug("Using "+(_592.toUpperCase())+" via $.ajax() method");
$.ajax({url:_591,dataType:opts.dataType,complete:function infscr_ajax_callback(_596,_597){
_593=(typeof (_596.isResolved)!=="undefined")?(_596.isResolved()):(_597==="success"||_597==="notmodified");
(_593)?_590._loadcallback(box,_596.responseText):_590._error("end");
}});
break;
}
};
if(!!opts.behavior&&this["retrieve_"+opts.behavior]!==_580){
this["retrieve_"+opts.behavior].call(this,_58f);
return;
}
if(opts.state.isDestroyed){
this._debug("Instance is destroyed");
return false;
}
opts.state.isDuringAjax=true;
opts.loading.start.call($(opts.contentSelector)[0],opts);
},scroll:function infscr_scroll(){
var opts=this.options,_598=opts.state;
if(!!opts.behavior&&this["scroll_"+opts.behavior]!==_580){
this["scroll_"+opts.behavior].call(this);
return;
}
if(_598.isDuringAjax||_598.isInvalidPage||_598.isDone||_598.isDestroyed||_598.isPaused||(opts.pageLimit&&_598.currPage>=opts.pageLimit)){
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
$.fn.infinitescroll=function infscr_init(_599,_59a){
var _59b=typeof _599;
switch(_59b){
case "string":
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _59c=$.data(this,"infinitescroll");
if(!_59c){
return false;
}
if(!$.isFunction(_59c[_599])||_599.charAt(0)==="_"){
return false;
}
_59c[_599].apply(_59c,args);
});
break;
case "object":
this.each(function(){
var _59d=$.data(this,"infinitescroll");
if(_59d){
_59d.update(_599);
}else{
_59d=new $.infinitescroll(_599,_59a,this);
if(!_59d.failed){
$.data(this,"infinitescroll",_59d);
}
}
});
break;
}
return this;
};
var _59e=$.event,_59f;
_59e.special.smartscroll={setup:function(){
$(this).bind("scroll",_59e.special.smartscroll.handler);
},teardown:function(){
$(this).unbind("scroll",_59e.special.smartscroll.handler);
},handler:function(_5a0,_5a1){
var _5a2=this,args=arguments;
_5a0.type="smartscroll";
if(_59f){
clearTimeout(_59f);
}
_59f=setTimeout(function(){
$.event.handle.apply(_5a2,args);
},_5a1==="execAsap"?0:100);
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
var _5a3=$(this);
$(that).each(function(){
if($(this)[0]!==_5a3[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_5a4){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _5a4=="function"){
_5a4={success:_5a4};
}
var _5a5=this.attr("action");
var url=(typeof _5a5==="string")?$.trim(_5a5):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_5a4=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_5a4);
var veto={};
this.trigger("form-pre-serialize",[this,_5a4,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_5a4.beforeSerialize&&_5a4.beforeSerialize(this,_5a4)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_5a4.semantic);
if(_5a4.data){
_5a4.extraData=_5a4.data;
for(n in _5a4.data){
if(_5a4.data[n] instanceof Array){
for(var k in _5a4.data[n]){
a.push({name:n,value:_5a4.data[n][k]});
}
}else{
v=_5a4.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_5a4.beforeSubmit&&_5a4.beforeSubmit(a,this,_5a4)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_5a4,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_5a4.type.toUpperCase()=="GET"){
_5a4.url+=(_5a4.url.indexOf("?")>=0?"&":"?")+q;
_5a4.data=null;
}else{
_5a4.data=q;
}
var _5a6=this,_5a7=[];
if(_5a4.resetForm){
_5a7.push(function(){
_5a6.resetForm();
});
}
if(_5a4.clearForm){
_5a7.push(function(){
_5a6.clearForm();
});
}
if(!_5a4.dataType&&_5a4.target){
var _5a8=_5a4.success||function(){
};
_5a7.push(function(data){
var fn=_5a4.replaceTarget?"replaceWith":"html";
$(_5a4.target)[fn](data).each(_5a8,arguments);
});
}else{
if(_5a4.success){
_5a7.push(_5a4.success);
}
}
_5a4.success=function(data,_5a9,xhr){
var _5aa=_5a4.context||_5a4;
for(var i=0,max=_5a7.length;i<max;i++){
_5a7[i].apply(_5aa,[data,_5a9,xhr||_5a6,_5a6]);
}
};
var _5ab=$("input:file",this).length>0;
var mp="multipart/form-data";
var _5ac=(_5a6.attr("enctype")==mp||_5a6.attr("encoding")==mp);
if(_5a4.iframe!==false&&(_5ab||_5a4.iframe||_5ac)){
if(_5a4.closeKeepAlive){
$.get(_5a4.closeKeepAlive,_5ad);
}else{
_5ad();
}
}else{
$.ajax(_5a4);
}
this.trigger("form-submit-notify",[this,_5a4]);
return this;
function _5ad(){
var form=_5a6[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_5a4);
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
var _5ae=0;
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
function _5af(){
var t=_5a6.attr("target"),a=_5a6.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_5a6.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_5ae=true;
cb();
},s.timeout);
}
var _5b0=[];
try{
if(s.extraData){
for(var n in s.extraData){
_5b0.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_5a6.removeAttr("target");
}
$(_5b0).remove();
}
};
if(s.forceSync){
_5af();
}else{
setTimeout(_5af,10);
}
var data,doc,_5b1=50;
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
if(_5ae){
throw "timeout";
}
var _5b2=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_5b2);
if(!_5b2&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_5b1){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_5b3){
var _5b4={"content-type":s.dataType};
return _5b4[_5b3];
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
xhr.responseXML=_5b5(xhr.responseText);
}
}
data=_5b7(xhr,s.dataType,s);
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
var _5b5=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _5b6=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _5b7=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_5b6(data);
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
$.fn.ajaxForm=function(_5b8){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_5b8);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_5b8);
}
}).bind("click.form-plugin",function(e){
var _5b9=e.target;
var $el=$(_5b9);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_5b9=t[0];
}
var form=this;
form.clk=_5b9;
if(_5b9.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _5ba=$el.offset();
form.clk_x=e.pageX-_5ba.left;
form.clk_y=e.pageY-_5ba.top;
}else{
form.clk_x=e.pageX-_5b9.offsetLeft;
form.clk_y=e.pageY-_5b9.offsetTop;
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
$.fn.formToArray=function(_5bb){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_5bb?form.getElementsByTagName("*"):form.elements;
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
if(_5bb&&form.clk&&el.type=="image"){
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
if(!_5bb&&form.clk){
var _5bc=$(form.clk),_5bd=_5bc[0];
n=_5bd.name;
if(n&&!_5bd.disabled&&_5bd.type=="image"){
a.push({name:n,value:_5bc.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_5be){
return $.param(this.formToArray(_5be));
};
$.fn.fieldSerialize=function(_5bf){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_5bf);
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
$.fn.fieldValue=function(_5c0){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_5c0);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_5c1){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_5c1===undefined){
_5c1=true;
}
if(_5c1&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _5c2=el.selectedIndex;
if(_5c2<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_5c2+1:ops.length);
for(var i=(one?_5c2:0);i<max;i++){
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
$.fn.selected=function(_5c3){
if(_5c3===undefined){
_5c3=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_5c3;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_5c3&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_5c3;
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
$.fn.extend({accordion:function(_5c4,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _5c4=="string"){
var _5c5=$.data(this,"ui-accordion");
_5c5[_5c4].apply(_5c5,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_5c4));
}
}
});
},activate:function(_5c6){
return this.accordion("activate",_5c6);
}});
$.ui.accordion=function(_5c7,_5c8){
this.options=_5c8=$.extend({},$.ui.accordion.defaults,_5c8);
this.element=_5c7;
$(_5c7).addClass("ui-accordion");
if(_5c8.navigation){
var _5c9=$(_5c7).find("a").filter(_5c8.navigationFilter);
if(_5c9.length){
if(_5c9.filter(_5c8.header).length){
_5c8.active=_5c9;
}else{
_5c8.active=_5c9.parent().parent().prev();
_5c9.addClass("current");
}
}
}
_5c8.headers=$(_5c7).find(_5c8.header);
_5c8.active=_5ca(_5c8.headers,_5c8.active);
if(_5c8.fillSpace){
var _5cb=$(_5c7).parent().height();
_5c8.headers.each(function(){
_5cb-=$(this).outerHeight();
});
var _5cc=0;
_5c8.headers.next().each(function(){
_5cc=Math.max(_5cc,$(this).innerHeight()-$(this).height());
}).height(_5cb-_5cc);
}else{
if(_5c8.autoheight){
var _5cb=0;
_5c8.headers.next().each(function(){
_5cb=Math.max(_5cb,$(this).outerHeight());
}).height(_5cb);
}
}
_5c8.headers.not(_5c8.active||"").next().hide();
_5c8.active.parent().andSelf().addClass(_5c8.selectedClass);
if(_5c8.event){
$(_5c7).bind((_5c8.event)+".ui-accordion",_5cd);
}
};
$.ui.accordion.prototype={activate:function(_5ce){
_5cd.call(this.element,{target:_5ca(this.options.headers,_5ce)[0]});
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
function _5cf(_5d0,_5d1){
return function(){
return _5d0.apply(_5d1,arguments);
};
};
function _5d2(_5d3){
if(!$.data(this,"ui-accordion")){
return;
}
var _5d4=$.data(this,"ui-accordion");
var _5d5=_5d4.options;
_5d5.running=_5d3?0:--_5d5.running;
if(_5d5.running){
return;
}
if(_5d5.clearStyle){
_5d5.toShow.add(_5d5.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_5d5.data],_5d5.change);
};
function _5d6(_5d7,_5d8,data,_5d9,down){
var _5da=$.data(this,"ui-accordion").options;
_5da.toShow=_5d7;
_5da.toHide=_5d8;
_5da.data=data;
var _5db=_5cf(_5d2,this);
_5da.running=_5d8.size()==0?_5d7.size():_5d8.size();
if(_5da.animated){
if(!_5da.alwaysOpen&&_5d9){
$.ui.accordion.animations[_5da.animated]({toShow:jQuery([]),toHide:_5d8,complete:_5db,down:down,autoheight:_5da.autoheight});
}else{
$.ui.accordion.animations[_5da.animated]({toShow:_5d7,toHide:_5d8,complete:_5db,down:down,autoheight:_5da.autoheight});
}
}else{
if(!_5da.alwaysOpen&&_5d9){
_5d7.toggle();
}else{
_5d8.hide();
_5d7.show();
}
_5db(true);
}
};
function _5cd(_5dc){
var _5dd=$.data(this,"ui-accordion").options;
if(_5dd.disabled){
return false;
}
if(!_5dc.target&&!_5dd.alwaysOpen){
_5dd.active.parent().andSelf().toggleClass(_5dd.selectedClass);
var _5de=_5dd.active.next(),data={instance:this,options:_5dd,newHeader:jQuery([]),oldHeader:_5dd.active,newContent:jQuery([]),oldContent:_5de},_5df=_5dd.active=$([]);
_5d6.call(this,_5df,_5de,data);
return false;
}
var _5e0=$(_5dc.target);
if(_5e0.parents(_5dd.header).length){
while(!_5e0.is(_5dd.header)){
_5e0=_5e0.parent();
}
}
var _5e1=_5e0[0]==_5dd.active[0];
if(_5dd.running||(_5dd.alwaysOpen&&_5e1)){
return false;
}
if(!_5e0.is(_5dd.header)){
return;
}
_5dd.active.parent().andSelf().toggleClass(_5dd.selectedClass);
if(!_5e1){
_5e0.parent().andSelf().addClass(_5dd.selectedClass);
}
var _5df=_5e0.next(),_5de=_5dd.active.next(),data={instance:this,options:_5dd,newHeader:_5e0,oldHeader:_5dd.active,newContent:_5df,oldContent:_5de},down=_5dd.headers.index(_5dd.active[0])>_5dd.headers.index(_5e0[0]);
_5dd.active=_5e1?$([]):_5e0;
_5d6.call(this,_5df,_5de,data,_5e1,down);
return false;
};
function _5ca(_5e2,_5e3){
return _5e3!=undefined?typeof _5e3=="number"?_5e2.filter(":eq("+_5e3+")"):_5e2.not(_5e2.not(_5e3)):_5e3===false?$([]):_5e2.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_5e4,_5e5){
_5e4=$.extend({easing:"swing",duration:300},_5e4,_5e5);
if(!_5e4.toHide.size()){
_5e4.toShow.animate({height:"show"},_5e4);
return;
}
var _5e6=_5e4.toHide.height(),_5e7=_5e4.toShow.height(),_5e8=_5e7/_5e6;
_5e4.toShow.css({height:0,overflow:"hidden"}).show();
_5e4.toHide.filter(":hidden").each(_5e4.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _5e9=(_5e6-now)*_5e8;
if($.browser.msie||$.browser.opera){
_5e9=Math.ceil(_5e9);
}
_5e4.toShow.height(_5e9);
},duration:_5e4.duration,easing:_5e4.easing,complete:function(){
if(!_5e4.autoheight){
_5e4.toShow.css("height","auto");
}
_5e4.complete();
}});
},bounceslide:function(_5ea){
this.slide(_5ea,{easing:_5ea.down?"bounceout":"swing",duration:_5ea.down?1000:200});
},easeslide:function(_5eb){
this.slide(_5eb,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_5ec,_5ed,wrap,_5ee,_5ef,_5f0,_5f1,_5f2,_5f3=0,_5f4={},_5f5=[],_5f6=0,_5f7={},_5f8=[],_5f9=null,_5fa=new Image(),_5fb=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_5fc=/[^\.]\.(swf)\s*$/i,_5fd,_5fe=1,_5ff,_600,busy=false,_601=20,fx=$.extend($("<div/>")[0],{prop:0}),_602=0,_603=!$.support.opacity&&!window.XMLHttpRequest,_604=function(){
_5ec.hide();
_5fa.onerror=_5fa.onload=null;
if(_5f9){
_5f9.abort();
}
tmp.empty();
},_605=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_606=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_607=function(){
var view=_606(),to={},_608=_5f7.margin,_609=_5f7.autoScale,_60a=(_601+_608)*2,_60b=(_601+_608)*2,_60c=(_5f7.padding*2),_60d;
if(_5f7.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_5f7.width))/100)-(_601*2);
_609=false;
}else{
to.width=_5f7.width+_60c;
}
if(_5f7.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_5f7.height))/100)-(_601*2);
_609=false;
}else{
to.height=_5f7.height+_60c;
}
if(_609&&(to.width>(view[0]-_60a)||to.height>(view[1]-_60b))){
if(_5f4.type=="image"||_5f4.type=="swf"){
_60a+=_60c;
_60b+=_60c;
_60d=Math.min(Math.min(view[0]-_60a,_5f7.width)/_5f7.width,Math.min(view[1]-_60b,_5f7.height)/_5f7.height);
to.width=Math.round(_60d*(to.width-_60c))+_60c;
to.height=Math.round(_60d*(to.height-_60c))+_60c;
}else{
to.width=Math.min(to.width,(view[0]-_60a));
to.height=Math.min(to.height,(view[1]-_60b));
}
}
to.top=view[3]+((view[1]-(to.height+(_601*2)))*0.5);
if(_5f7.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_601*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_5f7.minWidth)+(_601*2)))*0.5);
}
if(_5f7.autoScale===false){
to.top=Math.max(view[3]+_608,to.top);
to.left=Math.max(view[2]+_608,to.left);
}
return to;
},_60e=function(_60f){
if(_60f&&_60f.length){
switch(_5f7.titlePosition){
case "inside":
return _60f;
case "over":
return "<span id=\"fancybox-title-over\">"+_60f+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_60f+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_610=function(){
var _611=_5f7.title,_612=_600.width-(_5f7.padding*2),_613="fancybox-title-"+_5f7.titlePosition;
$("#fancybox-title").remove();
_602=0;
if(_5f7.titleShow===false){
return;
}
_611=$.isFunction(_5f7.titleFormat)?_5f7.titleFormat(_611,_5f8,_5f6,_5f7):_60e(_611);
if(!_611||_611===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_613+"\" />").css({"width":_612,"paddingLeft":_5f7.padding,"paddingRight":_5f7.padding}).html(_611).appendTo("body");
switch(_5f7.titlePosition){
case "inside":
_602=$("#fancybox-title").outerHeight(true)-_5f7.padding;
_600.height+=_602;
break;
case "over":
$("#fancybox-title").css("bottom",_5f7.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_5ee).hide();
},_614=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_5f7.enableEscapeButton){
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
if(_5f8.length>1){
wrap.bind("mousewheel.fb",function(e,_615){
e.preventDefault();
if(busy||_615===0){
return;
}
if(_615>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_5f7.showNavArrows){
return;
}
if((_5f7.cyclic&&_5f8.length>1)||_5f6!==0){
_5f1.show();
}
if((_5f7.cyclic&&_5f8.length>1)||_5f6!=(_5f8.length-1)){
_5f2.show();
}
},_616=function(){
var href,_617;
if((_5f8.length-1)>_5f6){
href=_5f8[_5f6+1].href;
if(typeof href!=="undefined"&&href.match(_5fb)){
_617=new Image();
_617.src=href;
}
}
if(_5f6>0){
href=_5f8[_5f6-1].href;
if(typeof href!=="undefined"&&href.match(_5fb)){
_617=new Image();
_617.src=href;
}
}
},_618=function(){
_5ef.css("overflow",(_5f7.scrolling=="auto"?(_5f7.type=="image"||_5f7.type=="iframe"||_5f7.type=="swf"?"hidden":"auto"):(_5f7.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_5ef.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_5f7.hideOnContentClick){
_5ef.one("click",$.fancybox.close);
}
if(_5f7.hideOnOverlayClick){
_5ed.one("click",$.fancybox.close);
}
if(_5f7.showCloseButton){
_5f0.show();
}
_614();
$(window).bind("resize.fb",$.fancybox.center);
if(_5f7.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_5f7.onComplete)){
_5f7.onComplete(_5f8,_5f6,_5f7);
}
busy=false;
_616();
},_619=function(pos){
var _61a=Math.round(_5ff.width+(_600.width-_5ff.width)*pos),_61b=Math.round(_5ff.height+(_600.height-_5ff.height)*pos),top=Math.round(_5ff.top+(_600.top-_5ff.top)*pos),left=Math.round(_5ff.left+(_600.left-_5ff.left)*pos);
wrap.css({"width":_61a+"px","height":_61b+"px","top":top+"px","left":left+"px"});
_61a=Math.max(_61a-_5f7.padding*2,0);
_61b=Math.max(_61b-(_5f7.padding*2+(_602*pos)),0);
_5ef.css({"width":_61a+"px","height":_61b+"px"});
if(typeof _600.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_61c=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_61d=function(){
var orig=_5f4.orig?$(_5f4.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_61c(orig);
from={width:(pos.width+(_5f7.padding*2)),height:(pos.height+(_5f7.padding*2)),top:(pos.top-_5f7.padding-_601),left:(pos.left-_5f7.padding-_601)};
}else{
view=_606();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_61e=function(){
_5ec.hide();
if(wrap.is(":visible")&&$.isFunction(_5f7.onCleanup)){
if(_5f7.onCleanup(_5f8,_5f6,_5f7)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_5f8=_5f5;
_5f6=_5f3;
_5f7=_5f4;
_5ef.get(0).scrollTop=0;
_5ef.get(0).scrollLeft=0;
if(_5f7.overlayShow){
if(_603){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_5ed.css({"background-color":_5f7.overlayColor,"opacity":_5f7.overlayOpacity}).unbind().show();
}
_600=_607();
_610();
if(wrap.is(":visible")){
$(_5f0.add(_5f1).add(_5f2)).hide();
var pos=wrap.position(),_61f;
_5ff={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_61f=(_5ff.width==_600.width&&_5ff.height==_600.height);
_5ef.fadeOut(_5f7.changeFade,function(){
var _620=function(){
_5ef.html(tmp.contents()).fadeIn(_5f7.changeFade,_618);
};
$.event.trigger("fancybox-change");
_5ef.empty().css("overflow","hidden");
if(_61f){
_5ef.css({top:_5f7.padding,left:_5f7.padding,width:Math.max(_600.width-(_5f7.padding*2),1),height:Math.max(_600.height-(_5f7.padding*2)-_602,1)});
_620();
}else{
_5ef.css({top:_5f7.padding,left:_5f7.padding,width:Math.max(_5ff.width-(_5f7.padding*2),1),height:Math.max(_5ff.height-(_5f7.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_5f7.changeSpeed,easing:_5f7.easingChange,step:_619,complete:_620});
}
});
return;
}
wrap.css("opacity",1);
if(_5f7.transitionIn=="elastic"){
_5ff=_61d();
_5ef.css({top:_5f7.padding,left:_5f7.padding,width:Math.max(_5ff.width-(_5f7.padding*2),1),height:Math.max(_5ff.height-(_5f7.padding*2),1)}).html(tmp.contents());
wrap.css(_5ff).show();
if(_5f7.opacity){
_600.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_5f7.speedIn,easing:_5f7.easingIn,step:_619,complete:_618});
}else{
_5ef.css({top:_5f7.padding,left:_5f7.padding,width:Math.max(_600.width-(_5f7.padding*2),1),height:Math.max(_600.height-(_5f7.padding*2)-_602,1)}).html(tmp.contents());
wrap.css(_600).fadeIn(_5f7.transitionIn=="none"?0:_5f7.speedIn,_618);
}
},_621=function(){
tmp.width(_5f4.width);
tmp.height(_5f4.height);
if(_5f4.width=="auto"){
_5f4.width=tmp.width();
}
if(_5f4.height=="auto"){
_5f4.height=tmp.height();
}
_61e();
},_622=function(){
busy=true;
_5f4.width=_5fa.width;
_5f4.height=_5fa.height;
$("<img />").attr({"id":"fancybox-img","src":_5fa.src,"alt":_5f4.title}).appendTo(tmp);
_61e();
},_623=function(){
_604();
var obj=_5f5[_5f3],href,type,_624,str,emb,_625,data;
_5f4=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_5f4:$(obj).data("fancybox")));
_624=obj.title||$(obj).title||_5f4.title||"";
if(obj.nodeName&&!_5f4.orig){
_5f4.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_624===""&&_5f4.orig){
_624=_5f4.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_5f4.href||jq(obj).attr("href")||null;
}else{
href=_5f4.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_5f4.type){
type=_5f4.type;
if(!href){
href=_5f4.content;
}
}else{
if(_5f4.content){
type="html";
}else{
if(href){
if(href.match(_5fb)){
type="image";
}else{
if(href.match(_5fc)){
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
_5f4.type=type;
_5f4.href=href;
_5f4.title=_624;
if(_5f4.autoDimensions&&_5f4.type!=="iframe"&&_5f4.type!=="swf"){
_5f4.width="auto";
_5f4.height="auto";
}
if(_5f4.modal){
_5f4.overlayShow=true;
_5f4.hideOnOverlayClick=false;
_5f4.hideOnContentClick=false;
_5f4.enableEscapeButton=false;
_5f4.showCloseButton=false;
}
if($.isFunction(_5f4.onStart)){
if(_5f4.onStart(_5f5,_5f3,_5f4)===false){
busy=false;
return;
}
}
tmp.css("padding",(_601+_5f4.padding+_5f4.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_5ef.children());
});
switch(type){
case "html":
tmp.html(_5f4.content);
_621();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_5ef.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_621();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_5fa=new Image();
_5fa.onerror=function(){
_605();
};
_5fa.onload=function(){
_5fa.onerror=null;
_5fa.onload=null;
_622();
};
_5fa.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_5f4.width+"\" height=\""+_5f4.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_5f4.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_5f4.width+"\" height=\""+_5f4.height+"\""+emb+"></embed></object>";
tmp.html(str);
_621();
break;
case "ajax":
_625=href.split("#",2);
data=_5f4.ajax.data||{};
if(_625.length>1){
href=_625[0];
if(typeof data=="string"){
data+="&selector="+_625[1];
}else{
data.selector=_625[1];
}
}
busy=false;
$.fancybox.showActivity();
_5f9=$.ajax($.extend(_5f4.ajax,{url:href,data:data,error:_605,success:function(data,_626,_627){
if(_5f9.status==200){
tmp.html(data);
_621();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_5f4.scrolling+"\" src=\""+_5f4.href+"\"></iframe>").appendTo(tmp);
_61e();
break;
}
},_628=function(){
if(!_5ec.is(":visible")){
clearInterval(_5fd);
return;
}
$("div",_5ec).css("top",(_5fe*-40)+"px");
_5fe=(_5fe+1)%12;
},_629=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_5ec=$("<div id=\"fancybox-loading\"><div></div></div>"),_5ed=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_5ec.addClass("fancybox-ie");
}
_5ee=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_5ee.append(_5ef=$("<div id=\"fancybox-inner\"></div>"),_5f0=$("<a id=\"fancybox-close\"></a>"),_5f1=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_5f2=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_5f0.click($.fancybox.close);
_5ec.click($.fancybox.cancel);
_5f1.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_5f2.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_603){
_5ed.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_5ec.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_5ee.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_62a){
$(this).data("fancybox",$.extend({},_62a,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_5f5=[];
_5f3=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_5f5.push(this);
}else{
_5f5=$("a[rel="+rel+"], area[rel="+rel+"]");
_5f3=_5f5.index(this);
}
_623();
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
_5f5=[];
_5f3=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_5f5=jQuery.merge(_5f5,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_5f5.push(obj);
}
if(_5f3>_5f5.length||_5f3<0){
_5f3=0;
}
_623();
};
$.fancybox.showActivity=function(){
clearInterval(_5fd);
_5ec.show();
_5fd=setInterval(_628,66);
};
$.fancybox.hideActivity=function(){
_5ec.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_5f6+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_5f6-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_5f8.length>pos){
_5f3=pos;
_623();
}
if(_5f7.cyclic&&_5f8.length>1&&pos<0){
_5f3=_5f8.length-1;
_623();
}
if(_5f7.cyclic&&_5f8.length>1&&pos>=_5f8.length){
_5f3=0;
_623();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_604();
if(_5f4&&$.isFunction(_5f4.onCancel)){
_5f4.onCancel(_5f5,_5f3,_5f4);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_5f7&&$.isFunction(_5f7.onCleanup)){
if(_5f7.onCleanup(_5f8,_5f6,_5f7)===false){
busy=false;
return;
}
}
_604();
$(_5f0.add(_5f1).add(_5f2)).hide();
$("#fancybox-title").remove();
wrap.add(_5ef).add(_5ed).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _62b(){
_5ed.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_5ef.empty();
if($.isFunction(_5f7.onClosed)){
_5f7.onClosed(_5f8,_5f6,_5f7);
}
_5f8=_5f4=[];
_5f6=_5f3=0;
_5f7=_5f4={};
busy=false;
};
_5ef.css("overflow","hidden");
if(_5f7.transitionOut=="elastic"){
_5ff=_61d();
var pos=wrap.position();
_600={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_5f7.opacity){
_600.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_5f7.speedOut,easing:_5f7.easingOut,step:_619,complete:_62b});
}else{
wrap.fadeOut(_5f7.transitionOut=="none"?0:_5f7.speedOut,_62b);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_5ef.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_5f7.padding*2)+_602});
_5ef.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_606(),_62c=_5f7.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_602)+(_601*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_601*2)))*0.5);
to.top=Math.max(view[3]+_62c,to.top);
to.left=Math.max(view[2]+_62c,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_629();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_62d){
this._container=jQuery(_62d);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_62e){
};
HubPages.Lightbox.f$=function(_62f){
return jQuery(_62f,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_630){
return jQuery(_630,this._container);
};
HubPages.Lightbox.MyPhotos=function(_631){
this._container=jQuery(_631);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_632,_633,_634){
if(_632!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_633.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_633.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_633);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_634<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_632,_633,_634+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_635){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_635);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_636,_637,_638){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_636[_637]).attr("href");
var _639=href.lastIndexOf("/");
var _63a=_639==-1?0:href.slice(_639+1,-4);
this._currentImageId=_63a;
jQuery.post("/xml/photos/locations/",{id:_63a},jQuery.proxy(function(_63b){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_63a,_63b,0);
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
HubPages.Lightbox.Slideshow=function(_63c){
this._articleId=_63c.id;
this._title=_63c.title;
this._url=_63c.url;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:_63c.auto==true,centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),showNavArrows:true,titlePosition:"inside",width:"80%"});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_63d){
var id=_63d.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_63d);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=_63d.auto==true;
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(){
jQuery.ajax({async:false,data:{id:this._articleId},dataType:"json",error:function(jxhr,_63e,_63f){
alert("Something went wrong. Please, reload the page.");
},success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
};
HubPages.Lightbox.Slideshow.prototype._buildGui=function(data){
this._container=jQuery("<div />").attr("id","slideshow_"+this._articleId);
this._container.addClass("slideshow").hide().appendTo("body");
this._photoData=data;
jQuery("body").delegate("#fancybox-wrap","mouseenter",function(){
jQuery("#fancybox-right-ico").show();
jQuery("#fancybox-left-ico").show();
});
jQuery("body").delegate("#fancybox-wrap","mouseleave",function(){
jQuery("#fancybox-right-ico").hide();
jQuery("#fancybox-left-ico").hide();
});
jQuery.each(data.images,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({href:"#"+this._articleId+"_"+i,rel:"slideshow_"+this._articleId,alt:item.title||"&nbsp;"}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._articleId+"_"+i}).addClass("content");
div.appendTo(this._container);
var _640=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_640.data("source",item.source);
_640.appendTo(div);
},this));
var _641=jQuery("<a />").attr("href","#related_slideshows_"+this._articleId);
_641.addClass("lightbox").attr("rel","slideshow_"+this._articleId);
_641.appendTo(this._container);
var _642=jQuery("<div />").attr("id","related_slideshows_"+this._articleId);
_642.addClass("related_slideshows");
if(data.related.length){
_642.append("<h2>View These Related Slideshows</h2>");
}else{
_642.append("<h2>This Hub has no related slideshows</h2>");
}
_642.appendTo(this._container);
var list=jQuery("<ul />");
_642.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_642);
}
var _643=jQuery("<li />");
_643.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _644=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _645=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_645);
_643.append(linkDiv);
_643.append("<br />");
var _646=jQuery("<img />").attr("src",item.thumb);
_646.appendTo(_644);
_644.appendTo(_643);
_644.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _647=jQuery("<div />").addClass("pinit_wrap");
_647.appendTo(this._socialBar);
var _648=jQuery("<div />").addClass("twitter_wrap").html(data.social.twitter);
_648.appendTo(this._socialBar);
var _649=jQuery("<div />").addClass("fb_share_wrap").html(data.social.fb_share);
_649.appendTo(this._socialBar);
this._container.append(this._socialBar.show());
this.c$("a.lightbox").fancybox(this.options);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
if(typeof FB!="undefined"){
FB.XFBML.parse(this._container.get(0));
}
};
HubPages.Lightbox.Slideshow.init=function(_64a,_64b,_64c){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_64a;
var _64d=jQuery("#fancybox-wrap");
var _64e=jQuery("#fancybox-inner");
var _64f=jQuery("<div />").attr("id","fancybox-outer-title");
_64e.before(_64f);
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("30%");
jQuery("body").delegate(".moduleImage div:not(.thumbnails) img","click",function(e){
var _650=HubPages.Lightbox.Slideshow.defaultHubId;
if(!HubPages.Lightbox.Slideshow._slides[_650]){
HubPages.Lightbox.Slideshow.create({id:_650,title:_64b,url:_64c});
if(typeof (slideshowCreation)!=="undefined"){
clearTimeout(slideshowCreation);
}
}
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1");
var _651="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
var link=jQuery(_651+":has(img[src*=\""+id+"\"])");
var _652=jQuery(_651).index(link);
HubPages.Lightbox.Slideshow._slides[_650].init();
if(_652>=0){
jQuery(".slideshow:first > a").eq(_652).click();
}
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._articleId);
var _653=this._container.size()==0;
if(_653){
this.load();
}
var _654=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_654);
var n=this.c$(".content:has(> img)").size();
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_655,_656){
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_657,_658){
jQuery.fancybox.hideActivity();
var _659=_658+1;
if(_659>=_657.length){
return;
}
var _65a=HubPages.Lightbox.f$("#fancybox-inner");
_65a.height(_65a.height()-70).css("overflow","visible");
var _65b=_65a.find("> .content > img");
var _65c=this._photoData.images[_658];
_65b.css({maxWidth:(_65a.innerWidth()-60)+"px",maxHeight:(_65a.innerHeight()-100)+"px"});
if(_65a.innerHeight()>0&&_65b.height()>0){
var _65d=(_65a.innerHeight()-_65b.height())/2;
_65b.css("margin-top",_65d+"px");
}
_65b.css("visibility","visible");
var _65e=jQuery(_657[_658]).attr("rel");
var _65f=jQuery("#"+_65e).find(".content img");
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",_65c.slideshowUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_65c.slideshowUrl]);
}
}
var _660=new Image();
_660.src=this._photoData.ctracking+"&"+(new Date()).getTime();
var _661=HubPages.Lightbox.f$("#fancybox-title");
if(_65c.source){
_661.html(_661.text()+"<br />Source: "+_65c.source);
}
_661.append(jQuery("<div />").html("Photo "+_659+" of "+this._photoData.images.length).addClass("slideshow-caption"));
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
pinit_href=_65c.social.pinit;
this._socialBar.find(".pinit_wrap").html(pinit_href);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
_65b.after(this._socialBar.show());
};
(function(_662,_663){
var _664=_662.document;
(function(){
var _665=false,_666=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _667=this.prototype;
_665=true;
var _668=new this();
_665=false;
for(var name in prop){
_668[name]=typeof prop[name]=="function"&&typeof _667[name]=="function"&&_666.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_667[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _669(){
if(!_665&&this.init){
this.init.apply(this,arguments);
}
};
_669.prototype=_668;
_669.constructor=_669;
_669.extend=arguments.callee;
return _669;
};
})();
var _66a=JRClass.extend({init:function(_66b,_66c){
if(typeof _66b=="string"){
this.video=_664.getElementById(_66b);
}else{
this.video=_66b;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _66a.options=="object"){
_V_.merge(this.options,_66a.options);
}
if(typeof _66c=="object"){
_V_.merge(this.options,_66c);
}
if(this.getPreloadAttribute()!==_663){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_663){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_663){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_66d){
if(this[_66d+"Supported"]()){
this[_66d+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_66e,_66f){
this.behaviors[name]=_66e;
this.extend(_66f);
},activateElement:function(_670,_671){
if(typeof _670=="string"){
_670=_664.getElementById(_670);
}
this.behaviors[_671].call(this,_670);
},errors:[],warnings:[],warning:function(_672){
this.warnings.push(_672);
this.log(_672);
},history:[],log:function(_673){
if(!_673){
return;
}
if(typeof _673=="string"){
_673={type:_673};
}
if(_673.type){
this.history.push(_673.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_673.type);
}
catch(e){
try{
opera.postError(_673.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_674){
if(!localStorage){
return;
}
try{
localStorage[key]=_674;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_66a.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _675=this.video.getAttribute("preload");
if(_675===""||_675==="true"){
return "auto";
}
if(_675==="false"){
return "none";
}
return _675;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _676=this.video.getAttribute("autoplay");
if(_676==="false"){
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
for(var _677 in obj){
if(obj.hasOwnProperty(_677)){
this[_677]=obj[_677];
}
}
}});
_66a.player=_66a.prototype;
_66a.player.extend({flashSupported:function(){
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
var _678=_66a.flashPlayers[this.options.flashPlayer];
this.extend(_66a.flashPlayers[this.options.flashPlayer].api);
(_678.init.context(this))();
},getFlashElement:function(){
var _679=this.video.children;
for(var i=0,j=_679.length;i<j;i++){
if(_679[i].className=="vjs-flash-fallback"){
return _679[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _67a=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_66a.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _66a.getFlashVersion()>=_67a;
}});
_66a.flashPlayers={};
_66a.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_67b){
if(_67b!==_663){
this.element.width=_67b;
this.box.style.width=_67b+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_67c){
if(_67c!==_663){
this.element.height=_67c;
this.box.style.height=_67c+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_66a.player.extend({linksSupported:function(){
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
_66a.merge=function(obj1,obj2,safe){
for(var _67d in obj2){
if(obj2.hasOwnProperty(_67d)&&(!safe||!obj1.hasOwnProperty(_67d))){
obj1[_67d]=obj2[_67d];
}
}
return obj1;
};
_66a.extend=function(obj){
this.merge(this,obj,true);
};
_66a.extend({setupAllWhenReady:function(_67e){
_66a.options=_67e;
_66a.DOMReady(_66a.setup);
},DOMReady:function(fn){
_66a.addToDOMReady(fn);
},setup:function(_67f,_680){
var _681=false,_682=[],_683;
if(!_67f||_67f=="All"){
_67f=_66a.getVideoJSTags();
}else{
if(typeof _67f!="object"||_67f.nodeType==1){
_67f=[_67f];
_681=true;
}
}
for(var i=0;i<_67f.length;i++){
if(typeof _67f[i]=="string"){
_683=_664.getElementById(_67f[i]);
}else{
_683=_67f[i];
}
_682.push(new _66a(_683,_680));
}
return (_681)?_682[0]:_682;
},getVideoJSTags:function(){
var _684=_664.getElementsByTagName("video"),_685=[],_686;
for(var i=0,j=_684.length;i<j;i++){
_686=_684[i];
if(_686.className.indexOf("video-js")!=-1){
_685.push(_686);
}
}
return _685;
},browserSupportsVideo:function(){
if(typeof _66a.videoSupport!="undefined"){
return _66a.videoSupport;
}
_66a.videoSupport=!!_664.createElement("video").canPlayType;
return _66a.videoSupport;
},getFlashVersion:function(){
if(typeof _66a.flashVersion!="undefined"){
return _66a.flashVersion;
}
var _687=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_687=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _662.ActiveXObject!="undefined"){
try{
var _688=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_688){
_687=parseInt(_688.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_66a.flashVersion=_687;
return _66a.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _66a.isIPhone()||_66a.isIPad();
},iOSVersion:function(){
var _689=navigator.userAgent.match(/OS (\d+)_/i);
if(_689&&_689[1]){
return _689[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _68a=navigator.userAgent.match(/Android (\d+)\./i);
if(_68a&&_68a[1]){
return _68a[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_66a.isIE()){
_664.createElement("video");
}
_662.VideoJS=_662._V_=_66a;
_66a.player.extend({html5Supported:function(){
if(_66a.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_66a.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_66a.isAndroid()){
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
var _68b=this.video.children;
for(var i=0,j=_68b.length;i<j;i++){
if(_68b[i].tagName.toUpperCase()=="SOURCE"){
var _68c=this.video.canPlayType(_68b[i].type)||this.canPlayExt(_68b[i].src);
if(_68c=="probably"||_68c=="maybe"){
this.firstPlayableSource=_68b[i];
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
var _68d=src.match(/\.([^\.]+)$/);
if(_68d&&_68d[1]){
var ext=_68d[1].toLowerCase();
if(_66a.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_66a.isIOS()){
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
},playerOnVideoProgress:function(_68e){
this.setBufferedFromProgress(_68e);
},setBufferedFromProgress:function(_68f){
if(_68f.total>0){
var _690=(_68f.loaded/_68f.total)*this.duration();
if(_690>this.values.bufferEnd){
this.values.bufferEnd=_690;
}
}
},iOSInterface:function(){
if(_66a.iOSVersion()<4){
this.forceTheSource();
}
if(_66a.isIPad()){
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
this.poster=_664.createElement("img");
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
var _691=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_691.length;i<j;i++){
if(_691[i].getAttribute("kind")=="subtitles"&&_691[i].getAttribute("src")){
this.subtitlesSource=_691[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_692){
var _693=_692.split("\n"),line="",_694,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_693.length;i++){
line=_V_.trim(_693[i]);
if(line){
_694={id:line,index:this.subtitles.length};
line=_V_.trim(_693[++i]);
time=line.split(" --> ");
_694.start=this.parseSubtitleTime(time[0]);
_694.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_693.length;j++){
line=_V_.trim(_693[++i]);
if(!line){
break;
}
text.push(line);
}
_694.text=text.join("<br/>");
this.subtitles.push(_694);
}
}
},parseSubtitleTime:function(_695){
var _696=_695.split(":"),time=0;
time+=parseFloat(_696[0])*60*60;
time+=parseFloat(_696[1])*60;
var _697=_696[2].split(/\.|,/);
time+=parseFloat(_697[0]);
ms=parseFloat(_697[1]);
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
},currentTime:function(_698){
if(_698!==_663){
try{
this.video.currentTime=_698;
}
catch(e){
this.warning(_66a.warnings.videoNotReady);
}
this.values.currentTime=_698;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_663){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _699=this.video.buffered.end(0);
if(_699>this.values.bufferEnd){
this.values.bufferEnd=_699;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_69a){
if(_69a!==_663){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_69a)));
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
},width:function(_69b){
if(_69b!==_663){
this.video.width=_69b;
this.box.style.width=_69b+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_69c){
if(_69c!==_663){
this.video.height=_69c;
this.box.style.height=_69c+"px";
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
this.warning(_66a.warnings.videoNotReady);
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
this.docOrigOverflow=_664.documentElement.style.overflow;
_V_.addListener(_664,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_662,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_664.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_664.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_662.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_664.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_66a.player.newBehavior("player",function(_69d){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_69e){
this.log(_69e);
this.log(this.video.error);
},playerOnVideoPlay:function(_69f){
this.hasPlayed=true;
},playerOnVideoPause:function(_6a0){
},playerOnVideoEnded:function(_6a1){
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
this.each(this.bufferedListeners,function(_6a2){
(_6a2.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_6a3){
this.each(this.currentTimeListeners,function(_6a4){
(_6a4.context(this))(_6a3||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_6a5){
(_6a5.context(this))();
});
}});
_66a.player.newBehavior("mouseOverVideoReporter",function(_6a6){
_V_.addListener(_6a6,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_6a6,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_6a7){
var _6a8=_6a7.relatedTarget;
while(_6a8&&_6a8!==this.box){
_6a8=_6a8.parentNode;
}
if(_6a8!==this.box){
this.hideControlBars();
}
}});
_66a.player.newBehavior("box",function(_6a9){
this.positionBox();
_V_.addClass(_6a9,"vjs-paused");
this.activateElement(_6a9,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_66a.player.newBehavior("poster",function(_6aa){
this.activateElement(_6aa,"mouseOverVideoReporter");
this.activateElement(_6aa,"playButton");
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
var _6ab=this.video.getElementsByTagName("img");
if(_6ab.length>0){
this.video.poster=_6ab[0].src;
}
}
}});
_66a.player.newBehavior("controlBar",function(_6ac){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_6ac);
_V_.addListener(_6ac,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_6ac,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_6ad){
this.mouseIsOverControls=false;
}});
_66a.player.newBehavior("playToggle",function(_6ae){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_6ae);
_V_.addListener(_6ae,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_6af){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_6b0){
this.each(this.elements.playToggles,function(_6b1){
_V_.removeClass(_6b1,"vjs-paused");
_V_.addClass(_6b1,"vjs-playing");
});
},playTogglesOnPause:function(_6b2){
this.each(this.elements.playToggles,function(_6b3){
_V_.removeClass(_6b3,"vjs-playing");
_V_.addClass(_6b3,"vjs-paused");
});
}});
_66a.player.newBehavior("playButton",function(_6b4){
_V_.addListener(_6b4,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_6b5){
this.play();
}});
_66a.player.newBehavior("pauseButton",function(_6b6){
_V_.addListener(_6b6,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_6b7){
this.pause();
}});
_66a.player.newBehavior("playProgressBar",function(_6b8){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_6b8);
},{updatePlayProgressBars:function(_6b9){
var _6ba=(_6b9!==_663)?_6b9/this.duration():this.currentTime()/this.duration();
if(isNaN(_6ba)){
_6ba=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_6ba*100,2)+"%";
}
});
}});
_66a.player.newBehavior("loadProgressBar",function(_6bb){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_6bb);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_66a.player.newBehavior("currentTimeDisplay",function(_6bc){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_6bc);
},{updateCurrentTimeDisplays:function(_6bd){
if(!this.currentTimeDisplays){
return;
}
var time=(_6bd)?_6bd:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_66a.player.newBehavior("durationDisplay",function(_6be){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_6be);
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
_66a.player.newBehavior("currentTimeScrubber",function(_6bf){
_V_.addListener(_6bf,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_6c0,_6c1){
_6c0.preventDefault();
this.currentScrubber=_6c1;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_6c0);
_V_.addListener(_664,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_664,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_6c2){
this.setCurrentTimeWithScrubber(_6c2);
},onCurrentTimeScrubberMouseUp:function(_6c3){
_V_.unblockTextSelection();
_664.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_664.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_6c4){
var _6c5=_V_.getRelativePosition(_6c4.pageX,this.currentScrubber);
var _6c6=_6c5*this.duration();
this.triggerCurrentTimeListeners(0,_6c6);
if(_6c6==this.duration()){
_6c6=_6c6-0.1;
}
this.currentTime(_6c6);
}});
_66a.player.newBehavior("volumeDisplay",function(_6c7){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_6c7);
this.updateVolumeDisplay(_6c7);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_6c8){
var _6c9=Math.ceil(this.volume()*6);
this.each(_6c8.children,function(_6ca,num){
if(num<_6c9){
_V_.addClass(_6ca,"vjs-volume-level-on");
}else{
_V_.removeClass(_6ca,"vjs-volume-level-on");
}
});
}});
_66a.player.newBehavior("volumeScrubber",function(_6cb){
_V_.addListener(_6cb,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_6cc,_6cd){
_V_.blockTextSelection();
this.currentScrubber=_6cd;
this.setVolumeWithScrubber(_6cc);
_V_.addListener(_664,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_664,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_6ce){
this.setVolumeWithScrubber(_6ce);
},onVolumeScrubberMouseUp:function(_6cf){
this.setVolumeWithScrubber(_6cf);
_V_.unblockTextSelection();
_664.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_664.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_6d0){
var _6d1=_V_.getRelativePosition(_6d0.pageX,this.currentScrubber);
this.volume(_6d1);
}});
_66a.player.newBehavior("fullscreenToggle",function(_6d2){
_V_.addListener(_6d2,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_6d3){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_6d4){
this.positionControlBars();
},fullscreenOnEscKey:function(_6d5){
if(_6d5.keyCode==27){
this.exitFullScreen();
}
}});
_66a.player.newBehavior("bigPlayButton",function(_6d6){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_6d6);
this.activateElement(_6d6,"playButton");
},{bigPlayButtonsOnPlay:function(_6d7){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_6d8){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_6d9){
_6d9.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_6da){
_6da.style.display="none";
});
}});
_66a.player.newBehavior("spinner",function(_6db){
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
this.spinners.push(_6db);
},{showSpinners:function(){
this.each(this.spinners,function(_6dc){
_6dc.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_6dd){
_6dd.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_6de){
_6de.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_6de.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_6df){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_6e0){
this.showSpinners();
},spinnersOnVideoSeeking:function(_6e1){
},spinnersOnVideoSeeked:function(_6e2){
},spinnersOnVideoCanPlay:function(_6e3){
},spinnersOnVideoCanPlayThrough:function(_6e4){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_6e5){
this.showSpinners();
},spinnersOnVideoStalled:function(_6e6){
},spinnersOnVideoSuspend:function(_6e7){
},spinnersOnVideoPlaying:function(_6e8){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_6e9){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_66a.player.newBehavior("subtitlesDisplay",function(_6ea){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_6ea);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _6eb=false,_6ec=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_6ec)?1:0;
while(true){
if(_6ec){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_6eb=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_6eb=i;
break;
}
i++;
}
}
if(_6eb!==false){
this.currentSubtitle=this.subtitles[_6eb];
this.lastSubtitleIndex=_6eb;
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
_66a.extend({addClass:function(_6ed,_6ee){
if((" "+_6ed.className+" ").indexOf(" "+_6ee+" ")==-1){
_6ed.className=_6ed.className===""?_6ee:_6ed.className+" "+_6ee;
}
},removeClass:function(_6ef,_6f0){
if(_6ef.className.indexOf(_6f0)==-1){
return;
}
var _6f1=_6ef.className.split(/\s+/);
_6f1.splice(_6f1.lastIndexOf(_6f0),1);
_6ef.className=_6f1.join(" ");
},createElement:function(_6f2,_6f3){
return this.merge(_664.createElement(_6f2),_6f3);
},blockTextSelection:function(){
_664.body.focus();
_664.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_664.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _6f4=Math.round(secs);
var _6f5=Math.floor(_6f4/60);
_6f5=(_6f5>=10)?_6f5:"0"+_6f5;
_6f4=Math.floor(_6f4%60);
_6f4=(_6f4>=10)?_6f4:"0"+_6f4;
return _6f5+":"+_6f4;
},getRelativePosition:function(x,_6f6){
return Math.max(0,Math.min(1,(x-this.findPosX(_6f6))/_6f6.offsetWidth));
},findPosX:function(obj){
var _6f7=obj.offsetLeft;
while(obj=obj.offsetParent){
_6f7+=obj.offsetLeft;
}
return _6f7;
},getComputedStyleValue:function(_6f8,_6f9){
return _662.getComputedStyle(_6f8,null).getPropertyValue(_6f9);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_6fa,type,_6fb){
if(_6fa.addEventListener){
_6fa.addEventListener(type,_6fb,false);
}else{
if(_6fa.attachEvent){
_6fa.attachEvent("on"+type,_6fb);
}
}
},removeListener:function(_6fc,type,_6fd){
if(_6fc.removeEventListener){
_6fc.removeEventListener(type,_6fd,false);
}else{
if(_6fc.attachEvent){
_6fc.detachEvent("on"+type,_6fd);
}
}
},get:function(url,_6fe){
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
var _6ff=new XMLHttpRequest();
_6ff.open("GET",url);
_6ff.onreadystatechange=function(){
if(_6ff.readyState==4&&_6ff.status==200){
_6fe(_6ff.responseText);
}
}.context(this);
_6ff.send();
},trim:function(_700){
return _700.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_664.readyState==="complete"){
return _66a.onDOMReady();
}
if(_664.addEventListener){
_664.addEventListener("DOMContentLoaded",_66a.DOMContentLoaded,false);
_662.addEventListener("load",_66a.onDOMReady,false);
}else{
if(_664.attachEvent){
_664.attachEvent("onreadystatechange",_66a.DOMContentLoaded);
_662.attachEvent("onload",_66a.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_664.addEventListener){
_664.removeEventListener("DOMContentLoaded",_66a.DOMContentLoaded,false);
_66a.onDOMReady();
}else{
if(_664.attachEvent){
if(_664.readyState==="complete"){
_664.detachEvent("onreadystatechange",_66a.DOMContentLoaded);
_66a.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_66a.DOMIsReady){
fn.call(_664);
}else{
_66a.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_66a.DOMIsReady){
return;
}
if(!_664.body){
return setTimeout(_66a.onDOMReady,13);
}
_66a.DOMIsReady=true;
if(_66a.DOMReadyList){
for(var i=0;i<_66a.DOMReadyList.length;i++){
_66a.DOMReadyList[i].call(_664);
}
_66a.DOMReadyList=null;
}
}});
_66a.bindDOMReady();
Function.prototype.context=function(obj){
var _701=this,temp=function(){
return _701.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _702=this,temp=function(){
var _703=this;
return _702.call(obj,arguments[0],_703);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_704){
if(this.hasContext===true){
return this;
}
if(!_704){
_704=obj;
}
for(var _705 in _704){
if(_704[_705]==this){
_704[_705]=this.evtContext(obj);
_704[_705].hasContext=true;
return _704[_705];
}
}
return this.evtContext(obj);
};
if(_662.jQuery){
(function($){
$.fn.VideoJS=function(_706){
this.each(function(){
_66a.setup(this,_706);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_662.VideoJS=_662._V_=_66a;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_707){
var _708=((_707/15)|0)*15;
if(this.lastLoggedOffset!=_708&&!this.paused()){
var _709=this.video.id.replace("hp_video_","");
var _70a=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_708,videoId:_709,rf:rf,isEmbed:_70a}});
this.lastLoggedOffset=_708;
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
var _70b=this.video.getAttribute("autostart");
if(_70b==="false"){
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
var _70c=document.createElement("div");
_70c.style.height=videoTopAdjustment+"px";
_70c.style.background="transparent";
_70c.id="video_spacer";
v.before(_70c);
}
var _70d=v.offset()["top"]+v.outerHeight();
var _70e=_70d-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_70e>0){
var _70f=document.createElement("div");
_70f.style.height=_70e+"px";
_70f.style.background="transparent";
_70f.id="sidebar_spacer";
_70f.className="sidebar_box";
sidebox.after(_70f);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_710,_711,_712,exts){
jQuery(document).ready(function(){
var _713=0;
var _714={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_710},size_limit:_712,queue_limit:_711,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_715){
if(file.size==_715){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_716){
try{
var data=JSONstring.toObject(_716);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_716);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_713+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_717){
if(!_713&&_717){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_713=0;
},loaded_callback:function(_718){
if(_718){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _719=new imageUploader(_714);
});
};
function getHPVideoPlayer(){
var _71a="talkiesplayer";
return $(_71a);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _71b=true;
if(data.percent){
var _71c=data.percent;
jq("#progress_video_"+vId).width(_71c+"%");
if(_71c>90){
_71b=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_71b){
setTimeout(function(){
updateVideoProcessingBar(vId,mId);
},5000);
}
}});
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
function _71d(){
var _71e="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _71f="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _720="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_71e),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_720),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_71f),"gm"),css:"keyword bold"}];
};
_71d.prototype=new SyntaxHighlighter.Highlighter();
_71d.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_71d;
typeof (exports)!="undefined"?exports.Brush=_71d:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _721(){
var _722="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _723(_724,_725){
var css=(_724[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_724[0],_724.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_723},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_722),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_721.prototype=new SyntaxHighlighter.Highlighter();
_721.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_721;
typeof (exports)!="undefined"?exports.Brush=_721:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _726(){
function _727(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _728(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _729="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _72a="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _72b="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_727(_729),"gm"),css:"keyword"},{regex:new RegExp(_728(_72a),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_72b),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_726.prototype=new SyntaxHighlighter.Highlighter();
_726.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_726;
typeof (exports)!="undefined"?exports.Brush=_726:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _72c(){
var _72d="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_72d),"gmi"),css:"keyword"}];
};
_72c.prototype=new SyntaxHighlighter.Highlighter();
_72c.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_72c;
typeof (exports)!="undefined"?exports.Brush=_72c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _72e(){
function _72f(_730,_731){
var _732=SyntaxHighlighter.Match,code=_730[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_733=[];
if(_730.attributes!=null){
var _734,_735=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_734=_735.exec(code))!=null){
_733.push(new _732(_734.name,_730.index+_734.index,"color1"));
_733.push(new _732(_734.value,_730.index+_734.index+_734[0].indexOf(_734.value),"string"));
}
}
if(tag!=null){
_733.push(new _732(tag.name,_730.index+tag[0].indexOf(tag.name),"keyword"));
}
return _733;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_72f}];
};
_72e.prototype=new SyntaxHighlighter.Highlighter();
_72e.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_72e;
typeof (exports)!="undefined"?exports.Brush=_72e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _736(){
var _737="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_737),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_736.prototype=new SyntaxHighlighter.Highlighter();
_736.aliases=["java"];
SyntaxHighlighter.brushes.Java=_736;
typeof (exports)!="undefined"?exports.Brush=_736:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _738(){
var _739="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_739),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_738.prototype=new SyntaxHighlighter.Highlighter();
_738.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_738;
typeof (exports)!="undefined"?exports.Brush=_738:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _73a(){
var _73b="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _73c="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _73d="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_73b),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_73d),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_73c),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_73a.prototype=new SyntaxHighlighter.Highlighter();
_73a.aliases=["php"];
SyntaxHighlighter.brushes.Php=_73a;
typeof (exports)!="undefined"?exports.Brush=_73a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _73e(){
var _73f="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _740="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _741="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_740),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_73f),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_741),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_73e.prototype=new SyntaxHighlighter.Highlighter();
_73e.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_73e;
typeof (exports)!="undefined"?exports.Brush=_73e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _742(){
var _743="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _744="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_743),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_744),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_742.prototype=new SyntaxHighlighter.Highlighter();
_742.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_742;
typeof (exports)!="undefined"?exports.Brush=_742:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _745(){
var _746="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _747="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _748="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_746),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_748),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_747),"gmi"),css:"keyword"}];
};
_745.prototype=new SyntaxHighlighter.Highlighter();
_745.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_745;
typeof (exports)!="undefined"?exports.Brush=_745:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _749(){
var _74a="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_74a),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_749.prototype=new SyntaxHighlighter.Highlighter();
_749.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_749;
typeof (exports)!="undefined"?exports.Brush=_749:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _74b(){
function _74c(_74d,_74e){
var _74f=SyntaxHighlighter.Match,code=_74d[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_750=[];
if(_74d.attributes!=null){
var _751,_752=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_751=_752.exec(code))!=null){
_750.push(new _74f(_751.name,_74d.index+_751.index,"color1"));
_750.push(new _74f(_751.value,_74d.index+_751.index+_751[0].indexOf(_751.value),"string"));
}
}
if(tag!=null){
_750.push(new _74f(tag.name,_74d.index+tag[0].indexOf(tag.name),"keyword"));
}
return _750;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_74c}];
};
_74b.prototype=new SyntaxHighlighter.Highlighter();
_74b.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_74b;
typeof (exports)!="undefined"?exports.Brush=_74b:null;
})();
function ClojureRegExp(_753){
_753=_753+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_753,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _754,_755;
while(_754=this.regex.exec(str)){
_755=str.substring(0,_754.index);
if(this.lookBehind.test(_755)){
return _754;
}else{
this.regex.lastIndex=_754.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _756=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_757="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_758){
_758=_758.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_758=_758.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_758+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_756)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_757)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _759(){
var _75a="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _75b="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_75a),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_75b),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_759.prototype=new SyntaxHighlighter.Highlighter();
_759.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_759;
typeof (exports)!="undefined"?exports.Brush=_759:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _75c(){
var _75d="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _75e="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_75d),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_75e),"gm"),css:"functions"}];
};
_75c.prototype=new SyntaxHighlighter.Highlighter();
_75c.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_75c;
typeof (exports)!="undefined"?exports.Brush=_75c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _75f(){
var _760="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_760),"gm"),css:"keyword"}];
};
_75f.prototype=new SyntaxHighlighter.Highlighter();
_75f.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_75f;
typeof (exports)!="undefined"?exports.Brush=_75f:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _761(){
var _762="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _763="void boolean byte char short int long float double";
var _764="null";
var _765="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_762),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_763),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_764),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_765),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_761.prototype=new SyntaxHighlighter.Highlighter();
_761.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_761;
typeof (exports)!="undefined"?exports.Brush=_761:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _766(){
var _767="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _768="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_767),"gm"),css:"keyword"},{regex:new RegExp(_768,"gm"),css:"keyword"}];
};
_766.prototype=new SyntaxHighlighter.Highlighter();
_766.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_766;
typeof (exports)!="undefined"?exports.Brush=_766:null;
})();
(function($){
$.fn.starrating=function(_769){
var _769=$.extend({},$.fn.starrating.options,_769||{});
return this.each(function(){
var o=$.meta?$.extend({},_769,$this.data()):_769;
var url=this.action,_76a,_76b,_76c;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _76d=div.find("div.star");
var _76e=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_76d.mouseover(_76f).focus(_76f).mouseout(_770).blur(_770).click(_771);
_76e.mouseover(_772).focus(_772).mouseout(_773).blur(_773).click(_771);
}else{
_774(div);
}
_775();
function init(elem){
_76a=$(elem).attr("title").split(/:\s*/)[1],_76b=_76a.split(".")[0],_76c=_76a.split(".")[1];
};
function _76f(){
_776();
fill(this);
};
function _770(){
_776();
_775();
};
function _773(){
_775();
$(this).removeClass("on");
};
function _772(){
_776();
$(this).addClass("on");
};
function _774(elem){
_76d.unbind();
_76e.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _777=$(this).attr("title");
var _778="Average Rating: "+_76a;
$(this).attr("title",_777.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_778).replace("Cancel Rating",_778));
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
function _771(){
if(_76d.index(this)==-1&&!o.cancelSubmit){
return false;
}
_76b=_76d.index(this)+1;
_76c=0;
if(_76b==0){
_776();
}
var _779=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_779},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _77a=$("div."+o.ratingClass);
init(_77a);
_770();
if(o.disableOnSubmit){
_774(_77a);
}
}});
}else{
o.success(_779);
}
return false;
};
function fill(elem){
_76d.find("a").css("width","100%");
$(_76d[_76d.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _776(){
_76d.removeClass("on hover");
};
function _775(){
$(_76d[_76b-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _77b=_76c?_76c*10:0;
if(_77b>0){
$(_76d[_76b]).addClass("on").children("a").css("width",_77b+"%");
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

