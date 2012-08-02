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
(function(a,b){
function c(b,c){
var e=b.nodeName.toLowerCase();
if("area"===e){
var f=b.parentNode,g=f.name,h;
return !b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h));
}
return (/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b);
};
function d(b){
return !a(b).parents().andSelf().filter(function(){
return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this);
}).length;
};
a.ui=a.ui||{};
if(a.ui.version){
return;
}
a.extend(a.ui,{version:"1.8.19",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){
return typeof b=="number"?this.each(function(){
var d=this;
setTimeout(function(){
a(d).focus(),c&&c.call(d);
},b);
}):this._focus.apply(this,arguments);
},scrollParent:function(){
var b;
return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){
return /(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1));
}).eq(0):b=this.parents().filter(function(){
return /(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1));
}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b;
},zIndex:function(c){
if(c!==b){
return this.css("zIndex",c);
}
if(this.length){
var d=a(this[0]),e,f;
while(d.length&&d[0]!==document){
e=d.css("position");
if(e==="absolute"||e==="relative"||e==="fixed"){
f=parseInt(d.css("zIndex"),10);
if(!isNaN(f)&&f!==0){
return f;
}
}
d=d.parent();
}
}
return 0;
},disableSelection:function(){
return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){
a.preventDefault();
});
},enableSelection:function(){
return this.unbind(".ui-disableSelection");
}}),a.each(["Width","Height"],function(c,d){
function h(b,c,d,f){
return a.each(e,function(){
c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0);
}),c;
};
var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};
a.fn["inner"+d]=function(c){
return c===b?g["inner"+d].call(this):this.each(function(){
a(this).css(f,h(this,c)+"px");
});
},a.fn["outer"+d]=function(b,c){
return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){
a(this).css(f,h(this,b,!0,c)+"px");
});
};
}),a.extend(a.expr[":"],{data:function(b,c,d){
return !!a.data(b,d[3]);
},focusable:function(b){
return c(b,!isNaN(a.attr(b,"tabindex")));
},tabbable:function(b){
var d=a.attr(b,"tabindex"),e=isNaN(d);
return (e||d>=0)&&c(b,!e);
}}),a(function(){
var b=document.body,c=b.appendChild(c=document.createElement("div"));
c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart" in c,b.removeChild(c).style.display="none";
}),a.extend(a.ui,{plugin:{add:function(b,c,d){
var e=a.ui[b].prototype;
for(var f in d){
e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]]);
}
},call:function(a,b,c){
var d=a.plugins[b];
if(!d||!a.element[0].parentNode){
return;
}
for(var e=0;e<d.length;e++){
a.options[d[e][0]]&&d[e][1].apply(a.element,c);
}
}},contains:function(a,b){
return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);
},hasScroll:function(b,c){
if(a(b).css("overflow")==="hidden"){
return !1;
}
var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;
return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e);
},isOverAxis:function(a,b,c){
return a>b&&a<b+c;
},isOver:function(b,c,d,e,f,g){
return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g);
}});
})(jQuery);
(function(a,b){
if(a.cleanData){
var c=a.cleanData;
a.cleanData=function(b){
for(var d=0,e;(e=b[d])!=null;d++){
try{
a(e).triggerHandler("remove");
}
catch(f){
}
}
c(b);
};
}else{
var d=a.fn.remove;
a.fn.remove=function(b,c){
return this.each(function(){
return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){
try{
a(this).triggerHandler("remove");
}
catch(b){
}
}),d.call(a(this),b,c);
});
};
}
a.widget=function(b,c,d){
var e=b.split(".")[0],f;
b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){
return !!a.data(c,b);
},a[e]=a[e]||{},a[e][b]=function(a,b){
arguments.length&&this._createWidget(a,b);
};
var g=new c;
g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b]);
},a.widget.bridge=function(c,d){
a.fn[c]=function(e){
var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;
return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){
var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;
if(f!==d&&f!==b){
return h=f,!1;
}
}):this.each(function(){
var b=a.data(this,c);
b?b.option(e||{})._init():a.data(this,c,new d(e,this));
}),h);
};
},a.Widget=function(a,b){
arguments.length&&this._createWidget(a,b);
},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){
a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);
var d=this;
this.element.bind("remove."+this.widgetName,function(){
d.destroy();
}),this._create(),this._trigger("create"),this._init();
},_getCreateOptions:function(){
return a.metadata&&a.metadata.get(this.element[0])[this.widgetName];
},_create:function(){
},_init:function(){
},destroy:function(){
this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled");
},widget:function(){
return this.element;
},option:function(c,d){
var e=c;
if(arguments.length===0){
return a.extend({},this.options);
}
if(typeof c=="string"){
if(d===b){
return this.options[c];
}
e={},e[c]=d;
}
return this._setOptions(e),this;
},_setOptions:function(b){
var c=this;
return a.each(b,function(a,b){
c._setOption(a,b);
}),this;
},_setOption:function(a,b){
return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this;
},enable:function(){
return this._setOption("disabled",!1);
},disable:function(){
return this._setOption("disabled",!0);
},_trigger:function(b,c,d){
var e,f,g=this.options[b];
d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;
if(f){
for(e in f){
e in c||(c[e]=f[e]);
}
}
return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented());
}};
})(jQuery);
(function(a,b){
var c=!1;
a(document).mouseup(function(a){
c=!1;
}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){
var b=this;
this.element.bind("mousedown."+this.widgetName,function(a){
return b._mouseDown(a);
}).bind("click."+this.widgetName,function(c){
if(!0===a.data(c.target,b.widgetName+".preventClickEvent")){
return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1;
}
}),this.started=!1;
},_mouseDestroy:function(){
this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
},_mouseDown:function(b){
if(c){
return;
}
this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;
var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;
if(!e||f||!this._mouseCapture(b)){
return !0;
}
this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){
d.mouseDelayMet=!0;
},this.options.delay));
if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){
this._mouseStarted=this._mouseStart(b)!==!1;
if(!this._mouseStarted){
return b.preventDefault(),!0;
}
}
return !0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){
return d._mouseMove(a);
},this._mouseUpDelegate=function(a){
return d._mouseUp(a);
},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0;
},_mouseMove:function(b){
return !a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b);
},_mouseUp:function(b){
return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1;
},_mouseDistanceMet:function(a){
return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance;
},_mouseDelayMet:function(a){
return this.mouseDelayMet;
},_mouseStart:function(a){
},_mouseDrag:function(a){
},_mouseStop:function(a){
},_mouseCapture:function(a){
return !0;
}});
})(jQuery);
(function(a,b){
a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){
this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit();
},destroy:function(){
if(!this.element.data("draggable")){
return;
}
return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this;
},_mouseCapture:function(b){
var c=this.options;
return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){
a("<div class=\"ui-draggable-iframeFix\" style=\"background: #fff;\"></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body");
}),!0):!1);
},_mouseStart:function(b){
var c=this.options;
return this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0);
},_mouseDrag:function(b,c){
this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");
if(!c){
var d=this._uiHash();
if(this._trigger("drag",b,d)===!1){
return this._mouseUp({}),!1;
}
this.position=d.position;
}
if(!this.options.axis||this.options.axis!="y"){
this.helper[0].style.left=this.position.left+"px";
}
if(!this.options.axis||this.options.axis!="x"){
this.helper[0].style.top=this.position.top+"px";
}
return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1;
},_mouseStop:function(b){
var c=!1;
a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);
if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original"){
return !1;
}
if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){
var d=this;
a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){
d._trigger("stop",b)!==!1&&d._clear();
});
}else{
this._trigger("stop",b)!==!1&&this._clear();
}
return !1;
},_mouseUp:function(b){
return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){
this.parentNode.removeChild(this);
}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b);
},cancel:function(){
return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this;
},_getHandle:function(b){
var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;
return a(this.options.handle,this.element).find("*").andSelf().each(function(){
this==b.target&&(c=!0);
}),c;
},_createHelper:function(b){
var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;
return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d;
},_adjustOffsetFromHelper:function(b){
typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left" in b&&(this.offset.click.left=b.left+this.margins.left),"right" in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top" in b&&(this.offset.click.top=b.top+this.margins.top),"bottom" in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top);
},_getParentOffset:function(){
this.offsetParent=this.helper.offsetParent();
var b=this.offsetParent.offset();
this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());
if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie){
b={top:0,left:0};
}
return {top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};
},_getRelativeOffset:function(){
if(this.cssPosition=="relative"){
var a=this.element.position();
return {top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};
}
return {top:0,left:0};
},_cacheMargins:function(){
this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0};
},_cacheHelperProportions:function(){
this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};
},_setContainment:function(){
var b=this.options;
b.containment=="parent"&&(b.containment=this.helper[0].parentNode);
if(b.containment=="document"||b.containment=="window"){
this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
}
if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){
var c=a(b.containment),d=c[0];
if(!d){
return;
}
var e=c.offset(),f=a(d).css("overflow")!="hidden";
this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c;
}else{
b.containment.constructor==Array&&(this.containment=b.containment);
}
},_convertPositionTo:function(b,c){
c||(c=this.position);
var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);
return {top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)};
},_generatePosition:function(b){
var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;
if(this.originalPosition){
var h;
if(this.containment){
if(this.relative_container){
var i=this.relative_container.offset();
h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top];
}else{
h=this.containment;
}
b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top);
}
if(c.grid){
var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;
g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;
var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;
f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k;
}
}
return {top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())};
},_clear:function(){
this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1;
},_trigger:function(b,c,d){
return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d);
},plugins:{},_uiHash:function(a){
return {helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs};
}}),a.extend(a.ui.draggable,{version:"1.8.19"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){
var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});
d.sortables=[],a(e.connectToSortable).each(function(){
var c=a.data(this,"sortable");
c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f));
});
},stop:function(b,c){
var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});
a.each(d.sortables,function(){
this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e));
});
},drag:function(b,c){
var d=a(this).data("draggable"),e=this,f=function(b){
var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;
return a.ui.isOver(e+c,f+d,i,j,g,h);
};
a.each(d.sortables,function(f){
this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){
return c.helper[0];
},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1);
});
}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){
var d=a("body"),e=a(this).data("draggable").options;
d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor);
},stop:function(b,c){
var d=a(this).data("draggable").options;
d._cursor&&a("body").css("cursor",d._cursor);
}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){
var d=a(c.helper),e=a(this).data("draggable").options;
d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity);
},stop:function(b,c){
var d=a(this).data("draggable").options;
d._opacity&&a(c.helper).css("opacity",d._opacity);
}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){
var d=a(this).data("draggable");
d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset());
},drag:function(b,c){
var d=a(this).data("draggable"),e=d.options,f=!1;
if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){
if(!e.axis||e.axis!="x"){
d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);
}
if(!e.axis||e.axis!="y"){
d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed);
}
}else{
if(!e.axis||e.axis!="x"){
b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));
}
if(!e.axis||e.axis!="y"){
b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed));
}
}
f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b);
}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){
var d=a(this).data("draggable"),e=d.options;
d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){
var b=a(this),c=b.offset();
this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left});
});
},drag:function(b,c){
var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;
for(var k=d.snapElements.length-1;k>=0;k--){
var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;
if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){
d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;
continue;
}
if(e.snapMode!="inner"){
var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;
p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left);
}
var t=p||q||r||s;
if(e.snapMode!="outer"){
var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;
p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left);
}
!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t;
}
}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){
var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){
return (parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0);
});
if(!e.length){
return;
}
var f=parseInt(e[0].style.zIndex)||0;
a(e).each(function(a){
this.style.zIndex=f+a;
}),this[0].style.zIndex=f+e.length;
}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){
var d=a(c.helper),e=a(this).data("draggable").options;
d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex);
},stop:function(b,c){
var d=a(this).data("draggable").options;
d._zIndex&&a(c.helper).css("zIndex",d._zIndex);
}});
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
jq(document).ajaxError(function(e,_1cb,_1cc,_1cd){
if(_1cb.getAllResponseHeaders()){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
jq.post("/xml/reporterror.php",{status:_1cb.status,response:_1cb.responseText,url:_1cc.url});
}
});
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
var _1ce=req.getAllResponseHeaders();
jq.post("/xml/reporterror.php",{headers:_1ce,error:1});
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
var _1cf=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_1cf.hide();
}
},showIcon:function(id){
if(jq.active>0||(this.prototypeAvailable()&&Ajax.activeRequestCount>0)){
var _1d0=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_1d0.css("display","inline");
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
function checkIt(_1d1){
place=detect.indexOf(_1d1)+1;
thestring=_1d1;
return place;
};
function ssToId(id,_1d2){
var _1d2=_1d2||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_1d2);
return false;
};
function ssOnload(){
var _1d3=location.hash.slice(1);
if(_1d3=="comments"){
ssToId("comFirst");
}else{
if(_1d3.substr(0,8)=="comment-"){
ssToId("comment"+_1d3.substr(8));
}else{
if(_1d3.substr(0,5)=="slide"){
var _1d4=_1d3.replace("slide","");
var _1d5=jQuery(".image_module_thumb[id*=\""+_1d4+"\"]");
if(_1d5.length>0){
_1d5.click();
_1d5.parents(".moduleImage").find(".slide_display img:visible").click();
}else{
jQuery("#img_url_"+_1d4+" img").click();
}
}else{
if(_1d3!=null&&_1d3){
ssToId(_1d3);
}
}
}
}
};
function fetchRecaptcha(_1d6){
var _1d7="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _1d8=document.getElementsByTagName("head")[0];
var _1d9=document.createElement("script");
_1d9.type="text/javascript";
_1d9.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_1d9.onload=function(){
Recaptcha.create(_1d7,_1d6,{theme:"red"});
};
_1d9.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_1d7,_1d6,{theme:"red"});
}
};
_1d8.appendChild(_1d9);
}else{
Recaptcha.create(_1d7,_1d6,{theme:"red"});
}
};
function check_signed_in_ajax(_1da,_1db){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_1dc,_1dd){
_1da(eval(_1dc.responseText),_1db);
}});
};
function whenSignedIn(_1de,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_1de,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_1df,info){
if(_1df){
info.fn.apply(null,info.args);
}else{
var url;
if("undefined"!=typeof (info.options.utm_source)){
url="/xml/signinupform.php?utm_source="+info.options.utm_source;
}else{
url="/xml/signinupform.php";
}
showFancyAjaxOverlay(url,info.options,"",{width:380,height:300,innerColor:"#e4e7e0",onComplete:function(){
var _1e0="undefined"==typeof (info.options.captchaId)?"captcha_div":info.options.captchaId;
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha(_1e0);
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
function insertVideo(type,key,css,_1e1,_1e2,_1e3){
var _1e4="<div class=\"video\">";
var mode="opaque";
if(_1e2){
mode="transparent";
}
if(_1e3=="bad"){
_1e4="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_1e4+="<embed style=\""+_1e1+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
_1e4+="<embed style=\""+_1e1+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_1e4+="<embed style=\""+_1e1+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_1e4+="<embed style=\""+_1e1+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
_1e4+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+mode+"\"></embed></object>";
}else{
if(type=="YahooSports"){
_1e4+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_1e4+="<embed style=\""+_1e1+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_1e4+="<embed style=\""+_1e1+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_1e4+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_1e4+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_1e4+="</div>";
if(_1e2){
jq("#"+_1e2).html(_1e4);
}else{
if(type!="New"){
document.write(_1e4);
}
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_1e5){
if(_1e5===undefined){
_1e5=false;
}
if(_1e5){
var _1e6=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_1e6){
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
function praiseHub(id,val,_1e7){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,style:_1e7?_1e7:0},function(){
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
function toggleShareIt(id,flg,_1e8){
if(_1e8===undefined){
_1e8=false;
}
if(flg){
jq("#share_tgt").load("/xml/shareit.php",{art_id:id,show_warn:_1e8});
}else{
jq("#share_tgt").html("");
}
return false;
};
function extractParamFromUri(uri,_1e9){
if(!uri){
return;
}
var _1ea=new RegExp("[\\?&#]"+_1e9+"=([^&#]*)");
var _1eb=_1ea.exec(uri);
if(_1eb!=null){
return unescape(_1eb[1]);
}
return;
};
function displaySocialButtons(_1ec){
if("IE"==browser&&version<=7){
return false;
}
_1ec=_1ec||{};
var _1ed;
if(_1ec["pagepath"]){
_1ed=_1ec["pagepath"];
}
var _1ee=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_1ec["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_1ef){
FB.init({xfbml:true});
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_1f0){
_gaq.push(["t2._trackSocial","facebook","like",_1f0,_1ed]);
});
FB.Event.subscribe("edge.remove",function(_1f1){
_gaq.push(["t2._trackSocial","facebook","unlike",_1f1,_1ed]);
});
FB.Event.subscribe("message.send",function(_1f2){
_gaq.push(["t2._trackSocial","facebook","send",_1f2,_1ed]);
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
if(!_1ec["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_1f3){
twttr.events.bind("tweet",function(_1f4){
if(_1f4){
var _1f5;
if(_1f4.target&&_1f4.target.nodeName=="IFRAME"){
_1f5=extractParamFromUri(_1f4.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_1f5,_1ed]);
}
});
});
}
if(!_1ec["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_1ec["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_1ee;
};
function showLinkArticle(url,_1f6){
if(window.location.hash){
url+=window.location.hash;
}
var data={page_url:url,page_title:_1f6};
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
function showFancyAjaxOverlay(url,data,_1f7,_1f8){
if(!_1f8){
var _1f8={};
}
jq.post(url,data,function(html){
jq("#fancybox-wrap").attr("class","");
var _1f9=jq.extend({content:html,onComplete:function(){
if(_1f7){
jq("#fancybox-wrap").addClass(_1f7);
}
},autoDimensions:false,width:610,height:500,padding:0},_1f8);
jq.fancybox(_1f9);
});
};
function showFancyOverlay(html,_1fa){
if(!_1fa){
var _1fa={};
}
var _1fb=jq.extend({content:html},_1fa);
jq.fancybox(_1fb);
return false;
};
function hideFancyOverlay(){
jq.fancybox.close();
return false;
};
function follow(_1fc,_1fd,_1fe,_1ff,_200){
var _201=jq(this);
var data={typeId:_1fc,objectId:_1fd,isActive:_1fe,printNumbers:_1ff,overrides:_200};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_1fc){
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
switch(_1fc){
case 1:
jQuery(".follow_question_"+_1fd).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_1fd).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data),_202=jQuery(".follow_"+_1fd);
_202.replaceWith(json.buttonText);
if(json.fanMail){
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400,onClosed:function(){
if(_201.hasClass("close_after")){
jq(window).trigger("suggestion_followed",[jQuery("#follow_"+_1fd)]);
}
}});
}
break;
case 4:
jQuery(".follow_"+_1fd).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_1fd).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButtons(){
var _203=jq("span[id^=follow_], span[class^=follow_]"),_204=jQuery.map(_203,function(span,i){
if(jq(span).find("a").text().toUpperCase()=="LOADING..."){
var _205=jq(span),_206=parseInt(_205.data("typeId")),_207=_205.data("objectId"),_208=true,_209=_205.data("overrides");
return {typeId:_206,objectId:_207,overrides:_209,printNumbers:_208};
}else{
}
});
if(_204.length>0){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",dataType:"json",data:{itemsToPaint:_204},success:function(data){
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
function updateFollowButton(_20a,_20b,_20c,_20d){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_20a,objectId:_20b,printNumbers:_20c,overrides:_20d},success:function(data){
switch(_20a){
case 1:
jQuery(".follow_question_"+_20b).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_20b).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_20b).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_20b).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_20b).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_20b).replaceWith(data);
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
function deleteComment(_20e,_20f){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_20f).serialize(),success:function(resp){
toggleCommentEdit(_20e,false);
jq("#ctext_"+_20e).html(resp);
jq("#cedit_"+_20e).remove();
}});
return false;
};
function toggleCommentEdit(_210,_211){
if(_211){
jq("#cedit_"+_210).hide();
jq("#cbox_"+_210).show();
jq("#ctext_"+_210).hide();
}else{
jq("#cedit_"+_210).show();
jq("#cbox_"+_210).hide();
jq("#ctext_"+_210).show();
}
};
(function($){
$.fn.sampleDuration=function(_212){
var _213=new Date();
return $(this).bind("beforeunload",function(){
var _214=new Date();
$.post("/xml/duration",{art_id:_212,dur:_214-_213});
});
};
})(jQuery);
function setupNavMenu(){
jq(document).ready(function(){
var _215=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_215=="touchstart"){
jq("#header_explore").bind(_215+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_215+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_215+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_215+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_215+".nav",function(_216){
_216.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_217){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_218){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_219){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_21a){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_21b){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_21c){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_21d){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_21e){
nav_hide_all_menus();
});
jq("html").bind("click",function(_21f){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_220){
_220.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function showImageFromThumb(){
var id=jq(this).attr("id");
var _221=id.replace("t_","slide_img_");
var _222=jq("#"+_221);
_222.parent().parent().children(":visible").hide();
_222.parent().show();
};
function initThumbnailImages(){
jq(".image_module_thumb").click(showImageFromThumb);
};
function initHub(){
initThumbnailImages();
};
function initTurboHub(_223,_224){
initTurboHubShare(_224);
initTurboVoting(_223);
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
function initTurboVoting(_225){
var _226=jq("#vote_bubble");
jq("#hub_vote .hub_vote_up").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_225,1,function(){
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
hubFeedback(_225,0,function(){
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
var _227=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#hub_vote").data("active")&&!_227){
vb.fadeOut(600);
}
};
function initTurboHubShare(_228){
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
displaySocialButtons({pagepath:_228,nogplus:true});
}
},3000);
};
function socialWidgetUpdate(){
var _229=20;
var pos=jq(this).scrollTop();
var _22a=jq("#share_hub");
var _22b=jq("#hub_container");
var _22c=0;
var _22d=jq(".moduleHostedVideo");
if(_22d.size()){
_22c=_22d.first().position().top+_22d.first().outerHeight();
}
var _22e=_22b.height()-_22a.outerHeight();
var _22f=_22b.offset();
if(_22f.top+_22c-pos<_229){
if(pos>_22f.top+_22e){
_22a.css({position:"absolute",top:_22e+"px",right:"-15px",left:"auto"});
}else{
_22a.css({position:"fixed",top:_229+"px",left:(538+_22f.left)+"px",right:"auto"});
}
}else{
_22a.css({position:"absolute",top:_22c+"px",right:"-15px",left:"auto"});
}
};
function google_ad_request_done(_230){
var s="";
var i;
if(_230.length==0){
return;
}
if(_230[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_230[0].image_width+"\" HEIGHT=\""+_230[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_230[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_230[0].image_url+"\" WIDTH=\""+_230[0].image_width+"\" HEIGHT=\""+_230[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_230[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_230[0].url+"\" target=\"_top\" title=\"go to "+_230[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_230[0].visible_url+"';return true\"><img border=\"0\" src=\""+_230[0].image_url+"\"width=\""+_230[0].image_width+"\"height=\""+_230[0].image_height+"\"></a>";
}else{
if(_230[0].type=="html"){
s+=_230[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a>";
for(i=0;i<_230.length;++i){
ad=_230[i];
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
var _231=jq.address.value().substr(1);
if(""==_231){
return;
}
var _232=false;
if(_231.substr(0,8)=="comment-"){
_232=true;
_231="comment"+_231.substr(8);
}
if("morecomments"==_231||_232){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_231){
ssToId("comFirst");
}else{
if("morecomments"==_231){
}else{
ssToId(_231);
}
}
};
function loadRatingSystem(_233,_234,_235,_236){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_233,params:{id:_236},ratingClass:"rating"});
};
function initAutoComplete(_237,_238){
var _239="";
var _23a="++none++";
var _23b=false;
var _23c=false;
var _23d=false;
var _23e="#the_auto_comp_box";
var _23f="#search_form";
var _240="#search_input";
var _241=".search_submit";
var _242="search_form";
var _243="/xml/getautocompletestrings.php";
var _244="";
var _245=0;
var _246=null;
var _247=null;
var _248=null;
var _249=null;
var _24a=null;
var _24b=false;
if(_238){
_23e=_238.boxid;
_23f=_238.container;
_240=_238.input;
_241=_238.submit;
if(_238.ajaxtarget!=undefined){
_243=_238.ajaxtarget;
}
if(_238.querystring!=undefined){
_244="&"+_238.querystring;
}
if(_238.filter!=undefined){
_246=_238.filter;
}
if(_238.callback!=undefined){
_247=_238.callback;
}
if(_238.keyboardelem!=undefined){
_249=_238.keyboardelem;
}
if(_238.targoutput!=undefined){
_248=_238.targoutput;
}
if(_238.keyuptarget!=undefined){
_24a=_238.keyuptarget;
}
if(_238.showprogress!=undefined){
_24b=_238.showprogress;
}
}
if(!_249){
_249=_240;
}
if(!_248){
_248=_240;
}
if(!_24a){
_24a=_249;
}
jq(document).ready(function(){
if(!_23b){
_23b=true;
jq("<div id=\""+_23e.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_249);
if(_24b){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_23e);
jq("#auto_comp_close").bind("click",function(){
jq(_23e).hide();
jq("#auto_comp_close").hide();
});
}
jq(_23e).hide();
if(!_24b){
jq(_23e).bind("focusin",function(){
_23c=true;
});
jq(_23e).bind("focusout",function(){
_23c=false;
});
jq(_23f).bind("focusin",function(){
_23d=true;
});
jq(_23f).bind("focusout",function(){
_23d=false;
setTimeout(function(){
if(!_23c&&!_23d){
jq(_23e).hide();
jq("#auto_comp_close").hide();
_244=_244.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_23f).attr("autocomplete","off");
jq(_249).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_245=0;
jq(_23e+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_24a).bind("keyup",function(){
var _24c=jq(_240).attr("value");
if(_240!=_249){
if(_239!=_24c){
_244=_244.replace(/start=[0123456789]+/,"");
_244=_244.replace(/&&/,"&");
}
_239="";
_23a="++none++";
}
var _24d;
if(_238){
_24d="hubs";
}else{
_24d=jq(".search_type option:selected").val();
if(_24d==undefined){
_24d="site";
}
}
if(jq.trim(_24c).length==0){
jq(_23e).hide();
jq("#auto_comp_close").hide();
}
if(jq.trim(_24c).length>0&&_239!=_24c){
_239=_24c;
if(_24c.indexOf(_23a)==0){
jq(_23e+" > .auto_comp_row").each(function(){
var _24e=jq(this).text();
if(_246){
_24e=_246(_24e);
}
if(_24e.indexOf(_24c)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_23a="++none++";
jq(_23e+" > .auto_comp_row").remove();
var _24f="?";
if(_24b){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_23e);
jq(_23e).show();
_24f="?s="+escape(_24c)+"&";
}
var _250=jq(_23f).serialize();
var _251=/(^|&)s=/;
if(!_250.match(_251)&&!_244.match(_251)&&!_24f.match(_251)){
_250+="&s="+_24c;
}
jq.get(_243+_24f+"t="+escape(_24d)+_244,_250,function(data){
jq(_23e+" div[id=auto_comp_error]").remove();
jq(_23e+" div[id=auto_comp_progress]").remove();
_244=_244.replace(/start=[0123456789]+/,"");
_244=_244.replace(/&&/,"&");
var _252=jq(data).find("div").length;
var _253=false;
if(_252==0){
return true;
}
var _254=jq(_240).val();
if(_254!=_24c){
return true;
}
if(_252<_237){
_23a=_24c;
}else{
_23a="++none++";
}
jq(_23e).show();
jq(_249).focus();
var _255=jq(_249).position();
var _256=jq(_249).outerHeight(true);
jq(_23e).position(_255.top+_256,_255.left+5);
jq(data).find("div").appendTo(_23e);
jq(_23e+" > .auto_comp_row").bind("click",function(){
var _257=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_257=true;
var _258=href.substr(8);
_244+="&start="+_258;
_244=_244.replace(/&&/,"&");
}
});
if(_257){
if(!_253){
setTimeout(function(){
jq(_24a).trigger("keyup");
},200);
_23c=false;
_253=true;
}
return (false);
}
var _259=jq(this).text();
if(_246){
_259=_246(_259);
}
jq(_248).attr("value",_259);
if(document.forms[_242]){
document.forms[_242].submit();
}else{
if(_241){
jq(_241).trigger("click");
}
}
return (false);
});
jq(_23e+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_23e+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_23e+" > .auto_comp_row:visible:eq("+_245+") > a").length){
return (false);
}
++_245;
jq(_23e+" > .auto_comp_row:visible:eq("+_245+") > a").trigger("focus");
return (false);
break;
case 38:
--_245;
if(_245<0){
jq(_249).trigger("focus");
}else{
jq(_23e+" > .auto_comp_row:visible:eq("+_245+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_247){
_247();
}
},"html");
}
});
}
});
};
function updateNumCharCount(_25a,_25b,_25c){
if(jq("#"+_25b).hasClass("dimmed")){
jq("#"+_25c).html(_25a);
}else{
if(jq("#"+_25b).val().length>_25a){
jq("#"+_25b).value=jq("#"+_25b).val().substring(0,_25a);
}
jq("#"+_25c).html(_25a-jq("#"+_25b).val().length);
}
};
function checkCharCount(_25d,_25e,_25f){
updateNumCharCount(_25d,_25e,_25f);
jQuery("#"+_25e).bind("click keyup keydown",function(){
updateNumCharCount(_25d,_25e,_25f);
});
jQuery("#"+_25e).bind("keypress",function(evt){
updateNumCharCount(_25d,_25e,_25f);
var code=(evt.keyCode?evt.keyCode:evt.which);
if(code!=8&&code!=37&&code!=38&&code!=39&&code!=40&&(browser=="Opera"||code!=46)){
if(jQuery(this).val().length>=_25d){
evt.stopPropagation();
return false;
}
}
return true;
});
};
function checkCommentCharCount(_260,_261,_262,_263){
jQuery("#"+_261).bind("click keypress keydown keyup",function(){
if(jQuery("#"+_263).text()<_260){
jQuery("#"+_262).show("fast");
}else{
jQuery("#"+_262).hide("fast");
}
});
};
function initCommentsCapsule(_264,_265,_266){
if(_266.signInRequired){
jq("#comment_submit_"+_264).data("disabled",true);
jq("#comment_submit_"+_264+", .moduleComment .compose_comment textarea").click(function(){
whenSignedIn({explain:"to comment",showSignup:true,utm_source:"tocomment"},function(){
jq("#comText_"+_264).remove();
document.location=_266.url;
document.location.reload(true);
});
return false;
});
return;
}
checkCharCount(8192,"comText_"+_264,"comText_"+_264+"_chars");
checkCommentCharCount(1000,"comText_"+_264,"comCharDiv_"+_264,"comText_"+_264+"_chars");
var _267="function"==typeof (_266.success)?_266.success:function(resp){
jq("#mod_"+_264).html(resp);
jq("#spinner").hide();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
};
var _268;
if(_265){
_268=function(form,btn){
whenSignedIn({explain:"to comment as "+_265,utm_source:"tocomment"},function(){
jq(form).ajaxSubmit({type:"POST",success:_267});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
});
};
}else{
_268=function(form,btn){
jq(form).ajaxSubmit({type:"POST",success:_267});
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
jq("#comment_submit_"+_264).click(function(){
jq("#comment_"+_264).submit();
return false;
});
var _269={onkeyup:false,submitHandler:function(form){
var btn=jq("#comment_submit_"+_264);
if(btn.data("disabled")){
return;
}
jq("#spinner").show();
_268.apply(this,[form,btn]);
},rules:{name:{requiredNoPlaceholder:true,nohtml:true}},messages:{name:{requiredNoPlaceholder:"Please enter your name before posting."}},errorLabelContainer:"#formErrors_{$modId} ul",errorElement:"li",errorClass:"errorFld",onfocusout:false};
_269.rules["comText_"+_264]={requiredNoPlaceholder:true,minlength:4,nohtml:true};
_269.messages["comText_"+_264]={requiredNoPlaceholder:"Please enter a comment before posting.",minlength:"Your comment is rather short."};
jq("#comment_"+_264).validate(_269);
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
function safeScriptEval(_26a){
var _26b=_26a.innerHTML.strip();
if(_26b.substring(0,4)=="<!--"){
_26b=_26b.substring(4,_26b.length-3);
}
try{
eval(_26b);
}
catch(e){
}
};
function selectTab(_26c,_26d,_26e,_26f){
var _270;
if(!_26e){
_26e=jq("#tab_"+_26c+"_0").closest("ul").children().size();
}
var _271,_272;
for(var i=0;i<_26e;i++){
_271=jq("#tab_"+_26c+"_"+i);
_272=jq("#tabcontent_"+_26c+"_"+i);
if(!_271.size()||!_272.size()){
alert("Cannot locate element: baseid="+_26c+" index="+_26d+" tabcount="+_26e);
}
if(_271.hasClass("selected")){
_270=i;
}
if(i==_26d){
_271.addClass("selected");
_272.addClass("selected");
}else{
_271.removeClass("selected");
_272.removeClass("selected");
}
}
var _273={};
if(_26f&&_273.toString.call(_26f)=="[object Function]"){
_26f(_270,_26d);
}
return false;
};
function categoryFanBulkJoin(id,_274,_275,_276,_277,_278){
var _279=jq(".jc");
var cids=Array();
var _27a=Array();
var i=0;
var k=0;
jq(".jc").each(function(_27b,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_276){
_27a[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_27a.join(",");
if(_276){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_277){
_277(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_278)!="undefined"){
data["searchTxt"]=_278;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_274){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_275){
setTimeout(categoryFanHighlight,500);
}
}
if(_277){
_277(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_27c,_27d,_27e,cols,_27f){
if(!_27e){
var _27e=8;
}
if(!cols){
var cols=2;
}
var _280=jq("#"+_27d).val();
if(""==jq.trim(_280)){
return;
}
jq("#"+_27c).load("/xml/categoryFanSearch.php",{search:_280,limit:_27e,cols:cols},function(){
if(_27f){
_27f();
}
});
return false;
};
function facebookConnect(_281){
if(typeof (_281)=="undefined"){
_281="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_281}).toQueryString();
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
function facebookPopup(_282){
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
child=window.open(_282,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_283,_284){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_283+"="+(_284?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function checkViolations(_285){
if(_285){
jq(".violations_span").html("");
var _286={check_violation:1};
}else{
var _286={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_286,dataType:"json",success:function(_287){
if(_287.data){
jq(".violations_span").html(_287.data);
}
if(!_287.complete){
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
function showHubOverlay(url,_288,_289){
var uri=$H({url:url,addComment:_288,commentText:_289}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_28a){
var uri=$H({modId:_28a}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_28b,_28c){
var uri=$H({moduleId:_28b,pollId:_28c}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showEmailForm(purl,_28d,_28e){
var uri=$H({page_url:purl,page_type:_28d,page_filter:_28e}).toQueryString();
showAjaxOverlay("/xml/emailpage.php",uri,"emailhub");
return false;
};
function showAjaxOverlay(_28f,_290,_291,_292){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_291){
$("overlay").addClassName(_291);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_28f,{parameters:_290,onComplete:function(){
if(_292!=undefined){
_292.call($("overlay"));
}
if(!$("fixed_title")){
return;
}
var _293=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_293+"px"});
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
var _294=browser=="IE"&&version<=6;
var _295=$("overlay");
var _296=Position.getViewportHeight();
if(_296>750){
var _297=_296-150;
}else{
var _297=_296-90;
}
var _298=_295.getStyle("paddingTop");
var _299=_295.getStyle("paddingBottom");
_297-=_298.substring(0,_298.length-2);
_297-=_299.substring(0,_299.length-2);
_297=Math.max(_297,100);
$("overlay").setStyle({height:_297+"px"});
if(_296>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_294){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_294){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _29a=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_29a+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_297-60)+"px",overflowY:"auto"});
}
};
function activity_why(id,_29b,_29c,_29d){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_29b,actionTargetId:_29c,createDate:_29d}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function ellipse(str,_29e){
if(str.length>_29e&&_29e!=0){
str=str.substr(0,_29e-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_29e-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function addTagEntries(){
var _29f=4;
var _2a0=document.createElement("div");
_2a0.id="moreEntryDiv";
var li=null;
var _2a1=4+1;
var _2a2=_2a1+_29f;
for(var i=_2a1;i<_2a2;i++){
li=document.createElement("li");
_2a0.appendChild(li);
var _2a3=document.createElement("input");
_2a3.className="tagEntry";
_2a3.name="tag_"+i;
_2a3.type="text";
_2a3.size=40;
li.appendChild(_2a3);
}
$("tagEntries").appendChild(_2a0);
return true;
};
function hubtool_add_tag(_2a4){
var _2a5=(_2a4)?$(_2a4):$("add_tag_input");
if(!_2a5){
return;
}
var tag;
if(Field.present(_2a5)&&_2a5.type){
tag=$F(_2a5);
Field.clear(_2a5);
}else{
if(_2a5.innerHTML){
tag=_2a5.innerHTML;
Element.remove(Element.findElement(_2a5,"li"));
}
}
if(!tag){
return;
}
var _2a6=0;
var _2a7=/^tag_(\d+)$/i;
var _2a8=$$(".tagEntry");
_2a8.each(function(ele){
if(ele.id){
var ms=_2a7.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_2a6){
_2a6=id;
}
}
}
});
_2a6++;
var _2a9="tag_"+_2a6;
var _2aa=$("add_tag_input").parentNode;
var _2ab="<input class=\"tagEntry\" id=\""+_2a9+"\" name=\""+_2a9+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_2a9)){
var _2ac=$(_2a9).tabIndex;
Element.update($(_2a9).parentNode,_2ab);
$(_2a9).tabIndex=_2ac;
}else{
var _2ad=$("tag_1").tabIndex-1;
var _2ac=_2ad+_2a6;
var pole=new Insertion.Before(_2aa,"<li>"+_2ab+"</li>");
$(_2a9).tabIndex=_2ac;
_2ac=$("add_tag_input").tabIndex;
_2ac++;
$("add_tag_input").tabIndex=_2ac;
}
return false;
};
function add_tag(_2ae){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _2af=tag.replace(/'/g,"\\'");
var _2b0=tag.replace(/ /g,"+");
var _2b1="tagd_"+tag.replace(/ /g,"_");
_2b1=_2b1.toLowerCase();
if($(_2b1)){
$(_2b1).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _2b2=$("nav_tags_edit");
var _2b3="<a href=\"javascript:void delete_tag('"+_2ae+"','"+_2af+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_2b3+="<a id=\""+_2b1+"\" href=\"/tag/"+_2b0+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_2b3;
_2b2.appendChild(item);
save_tag(_2ae,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_2b4,tag){
if(!_2b4||!tag){
return;
}
var _2b5="tagd_"+tag.replace(/ /g,"_");
var _2b6=$(_2b5);
if(!_2b6){
return;
}
var li=_2b6.parentNode;
Element.remove(li);
save_tag(_2b4,tag,true);
return false;
};
function save_tag(_2b7,tag,del){
var _2b8=(del)?1:0;
var req={a:_2b7,v:tag,d:_2b8};
var _2b9=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_2b9,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function fireOnReturn(_2ba,func){
Event.observe(_2ba,"keyup",function(_2bb){
_2bb=_2bb||window.event;
if(_2bb.which){
if(_2bb.which==Event.KEY_RETURN){
_2bb.preventDefault();
func();
}
}else{
if(_2bb.keyCode){
if(_2bb.keyCode==Event.KEY_RETURN){
Event.stop(_2bb);
func();
}
}
}
},false);
};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_2bc){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_2bc*100)+")";
}
ele.style.opacity=_2bc;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _2bd;
if(document.defaultView){
_2bd=document.defaultView.getComputedStyle(ele,"");
}else{
_2bd=ele.currentStyle;
}
return _2bd;
};
Element.cloneStyles=function(ele,_2be,_2bf){
ele=$(ele);
_2be=$(_2be);
var _2c0=Element.getCurrentStyle(ele);
for(var name in _2c0){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _2c1=_2c0[name];
if(_2c1!==""&&!(_2c1 instanceof Object)&&name!="length"&&name!="parentRule"){
if(_2bf&&name.indexOf(_2bf)!==0){
continue;
}
_2be.style[name]=_2c1;
}
}
return _2be;
};
Element.findElement=function(_2c2,_2c3){
_2c2=$(_2c2);
while(_2c2.parentNode&&(!_2c2.tagName||(_2c2.tagName.toUpperCase()!=_2c3.toUpperCase()))){
_2c2=_2c2.parentNode;
}
return _2c2;
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
String.prototype.startsWith=function(_2c4){
var res=this;
return res.substring(0,_2c4.length)==_2c4;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _2c5=p.innerHTML;
if(_2c5.length>len){
_2c5=_2c5.substring(0,len);
_2c5=_2c5.replace(/\w+$/,"");
_2c5+="...";
p.innerHTML=_2c5;
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
var _2c6=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_2c6=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_2c6=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_2c6=window.pageXOffset;
}else{
if(window.scrollX){
_2c6=window.scrollX;
}
}
}
}
return _2c6;
};
Position.getViewportScrollY=function(){
var _2c7=0;
if(document.documentElement&&document.documentElement.scrollTop){
_2c7=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_2c7=document.body.scrollTop;
}else{
if(window.pageYOffset){
_2c7=window.pageYOffset;
}else{
if(window.scrollY){
_2c7=window.scrollY;
}
}
}
}
return _2c7;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _2c8=jq(window).scrollTop();
var _2c9=_2c8+jq(window).height();
if(eleBot<_2c8){
return -1;
}
if(off.top>_2c9){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _2ca=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _2cb=[_2ca[0]+Position.getViewportWidth(),_2ca[1]+Position.getViewportHeight()];
return (_2ca[0]<off[0]&&off[0]<_2cb[0]&&_2ca[1]<off[1]&&off[1]<_2cb[1]);
};
Position.set=function(ele,_2cc){
if(ele&&_2cc){
ele.style.left=_2cc[0]+"px";
ele.style.top=_2cc[1]+"px";
}
};
function phone_verify_required(_2cd,_2ce,_2cf,_2d0){
if(typeof (_2d0)=="undefined"){
data={};
}else{
data={a:_2d0};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_2cd);
}else{
_2ce.apply(null,_2cf);
}
},"json");
};
function require_phone_verification(_2d1,_2d2){
url="/xml/verify/phone.php";
if(typeof (_2d2)!="undefined"&&_2d2){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_2d1},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_2d3,end){
for(var i=_2d3;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_2d3)+1;
}
update_plural(name);
};
function unselect_all(name,_2d4,end){
for(var i=_2d4;i<=end;i++){
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
function import_now(_2d5,name,_2d6,end){
var _2d7=self.opener.document.getElementById(_2d5);
if(_2d7){
for(var i=_2d6;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _2d8=$(name+"_email_"+i);
if(_2d7.value.length<2||_2d7.value.charAt(_2d7.value.length)==","||_2d7.value.charAt(_2d7.value.length-1)==","){
_2d7.value=_2d7.value+_2d8.innerHTML;
}else{
_2d7.value=_2d7.value+", "+_2d8.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_2d9,_2da,max){
var _2db=document.getElementById(_2d9);
var _2dc=document.getElementById(_2da);
if(!_2db){
alert("charCounter bad source: "+_2d9);
}
if(!_2dc){
alert("charCounter bad source: "+_2da);
}
if(_2db.value.length>max){
_2db.value=_2db.value.substring(0,max);
}
_2dc.value=max-_2db.value.length;
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
function fetchAnswers(_2dd,_2de,_2df){
var _2e0=$H({answerIds:_2dd,enableVoting:_2de,enableEditing:_2df}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_2e0,onComplete:function(_2e1){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_2e2,v){
if(_2e2===undefined){
_2e2=true;
}
jq.ajax({url:"/xml/answervote.php",type:"POST",data:{id:id,vote:v,timeIndicator:_2e2},dataType:"html",success:function(html){
jq(".voting_"+id).html(html);
}});
return false;
};
function answerVoteDown(id,_2e3){
return answerVote(id,_2e3,-1);
};
function answerVoteUp(id,_2e4){
return answerVote(id,_2e4,1);
};
function getElementScreenTop(){
var _2e5=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _2e5;
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
jQuery(".answer_delete").click(function(_2e6){
id=jQuery(_2e6.target).attr("id");
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
var _2e7="#edit_rc_error_"+i;
jQuery(_2e7).html("You cannot submit an empty comment.");
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
jQuery(".request_comment_delete").click(function(_2e8){
orig_id=jQuery(_2e8.target).attr("id");
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
jQuery(".request_comment_notspam").click(function(_2e9){
orig_id=jQuery(_2e9.target).attr("id");
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
function showAnswerCommentBox(id,_2ea){
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
jQuery("#rc_numcharsvalue").html(_2ea);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _2eb="#result_"+i;
var _2ec="#error_"+i;
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
jQuery(_2eb).append(data.msg);
var _2ed=jQuery(_2eb).children().last().attr("id");
jQuery(_2eb).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_2ed);
});
});
}
}});
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_2ee){
this.buffer.push(_2ee);
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
function hpFormHandler(_2ef){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_2ef);
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
var _2f0=$$("input[name="+ele.name+"]");
var _2f1=false;
_2f0.each(function(r){
if(r.checked==true){
_2f1=true;
throw $break;
}
});
this.testForError(!_2f1,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _2f2=false;
if(val.length>=20){
var _2f3=val.match(/\s+/g);
var _2f4=_2f3?_2f3.length:0;
var _2f5=_2f4+1;
_2f2=_2f5/(val.length-_2f4)<0.08;
}
this.testForError(_2f2,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_2f6,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_2f6)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_2f7,msg){
var val=$F(ele);
this.testForError((val.search(_2f7)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_2f8,msg){
var val=$F(ele);
var _2f9=false;
for(i=0;i<_2f8.length&&!_2f9;i++){
var _2fa=new RegExp("[^a-zA-Z]"+_2f8[i]+"[^a-zA-Z]","i");
_2f9=(val.search(_2fa)>=0);
if(!_2f9){
_2fa=new RegExp("^"+_2f8[i]+"[^a-zA-Z]","i");
_2f9=(val.search(_2fa)>=0);
}
if(!_2f9){
_2fa=new RegExp("[^a-zA-Z]"+_2f8[i]+"$","i");
_2f9=(val.search(_2fa)>=0);
}
if(!_2f9){
_2fa=new RegExp("^"+_2f8[i]+"$","i");
_2f9=(val.search(_2fa)>=0);
}
}
this.testForError(_2f9,ele,msg);
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
var _2fb=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _2fc=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _2fd=800;
var _2fe=6;
this.validateLengthMin(ele,_2fe,"The address you entered is too short. Please use an address at least "+_2fe+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _2ff=200;
this.validateLengthMax(ele,_2ff,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _300=2;
var _301=200;
this.validateLengthMin(ele,_300,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_301,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _302=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_302=true;
}
this.testForError(!_302,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _303=40;
var _304=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_304,"Your password is too short.  Protect your account by choosing a password that is at least  "+_304+" characters long.  Safety first!");
this.validateLengthMax(ele1,_303,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _305=60;
var _306=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_305,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_307){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_307.detect(function(name){
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
var _308=$A($(form).getElementsByTagName("input"));
_308.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_309,_30a,_30b){
if($(_309)&&$(_30a)){
var gw=new GhostWatcher(_309,_30a,_30b);
}
};
hpFormHandler.prototype.setValidators=function(_30c,_30d){
this.toValidate=$H(_30c);
this.toValidateOnsubmit=$H(_30d);
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
hpFormHandler.prototype.save=function(_30e){
if(this.ensureSignedInBeforeSave&&!_30e){
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
var _30f=new fx.Scroll({duration:100});
_30f.scrollTo(this.errorDiv);
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
var _310=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_311,ele,msg){
if(_311){
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
hpFormHandler.prototype._runValidators=function(_312){
var _313=Form.getElements(this.form);
var _314=$A(_313);
_314.each(function(node){
if(_312){
var _315=this.toValidateOnsubmit.get(node.id);
if(!_315){
_315=this.toValidateOnsubmit.get(node.className);
}
if(_315){
_315(node);
}
}
var _315=this.toValidate.get(node.id);
if(!_315){
_315=this.toValidate.get(node.className);
}
if(_315){
_315(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _316="";
if(json.status=="error"){
var _317=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_316+=" - "+json.errors[key][i]+"\n";
}
_317++;
}
}
if(_317>0){
var _318=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_318+=_316+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_318);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _319=new fx.Scroll({duration:300});
_319.scrollTo("changesSaved");
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
var _31a=this.errorHeader;
_31a+="<ul>";
this.errors.each(function(err){
_31a+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_31a+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_31a;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _31b=$(err.key);
var _31c=err.key+"_error";
var _31d=$(_31c);
if(_31d){
_31d.innerHTML=err.value;
_31d.className="alert";
_31d.show();
}else{
new Insertion.Top(_31b.parentNode,"<div id=\""+_31c+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_31b,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _31e=typeof this.errors.get(targetId)=="undefined";
if(_31e){
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
function _handleInputKeypress(_31f){
_31f=_31f||window.event;
if(_31f.which){
if(_31f.which==Event.KEY_RETURN){
var _320=document.createEvent("KeyboardEvent");
_320.initKeyEvent("keydown",true,true,document.defaultView,_31f.ctrlKey,_31f.altKey,_31f.shiftKey,_31f.metaKey,Event.KEY_TAB,0);
_31f.preventDefault();
_31f.target.dispatchEvent(_320);
}
}else{
if(_31f.keyCode){
if(_31f.keyCode==Event.KEY_RETURN){
_31f.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_321,_322,_323){
this.fromEle=$(_321);
this.toEle=$(_322);
this.copyFunction=(_323!=null)?_323:this.copyValue;
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
function growTextArea(elt,_324,_325,_326){
var rows=Math.ceil($F(elt).length/_324)+1;
var _327=rows*_325;
_327=Math.max(_327,_326);
elt.setStyle({height:_327+"px"});
};
function makeGrowable(id,_328,_329,_32a){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_328,_329,_32a);
});
};
function makeExpandable(id,_32b,_32c,_32d,_32e,_32f){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_32b);
var _32f=(_32f===undefined)?"expanded":_32f;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_32f)){
anc.addClass(_32f);
if(typeof (_32e)=="function"){
_32e.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_32c)=="function"){
_32c.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_32d){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_32b);
});
};
function categorySearch(_330){
jq("#"+_330+"SearchResults").load("/xml/categorysearch.php",{uniqueId:_330,searchText:jq("#"+_330+"SearchText").val()});
};
(function($){
var _331=function(){
this.children("select").change(function(_332){
var _333=jq(_332.target);
_333.parent().hpCategorySelector("chooseCategory",_333.val());
});
};
var _334={init:function(_335){
var _336=$.extend({userId:0,valueId:"#categoryId",data:{}},_335);
this.data("settings",_336);
_331.apply(this);
return this;
},chooseCategory:function(_337){
return this.each(function(_338,elt){
var _339=jq(elt);
var _33a=_339.data("settings");
var _33b=_339.attr("id");
var _33c=$.extend({categoryId:_337,id:_33b},_33a.data);
jq.post("/xml/categoryselector.php",_33c,function(rsp){
var data=jq.parseJSON(rsp);
_339.html(data.render);
_331.apply(_339);
_339.find("select").first().focus();
$(_33a.valueId).val(_337);
_339.trigger("categoryChange.hpCategorySelector",data);
});
});
},refresh:function(){
return this.each(function(_33d,elt){
var _33e=jq(elt);
_33e.hpCategorySelector("chooseCategory",_33e.hpCategorySelector("getValue"));
});
},getValue:function(){
var _33f=this.data("settings");
return $(_33f.valueId).val();
},destroy:function(){
}};
$.fn.hpCategorySelector=function(_340){
if(_334[_340]){
return _334[_340].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _340==="object"||!_340){
return _334.init.apply(this,arguments);
}else{
$.error("Method "+_340+" does not exist on jQuery.hpCategorySelector");
}
}
};
})(jQuery);
(function($){
var _341=function(){
this.children("select").change(function(_342){
var _343=jq(_342.target);
_343.parent().hpForumSelector("chooseForum",_343.val(),_343.prevAll("select").size()>0);
});
};
var _344={init:function(_345){
var _346=$.extend({userId:0,data:{},id:"admin"},_345);
this.data("settings",_346);
_341.apply(this);
return this;
},chooseForum:function(_347,_348){
var _349=0,data={};
if(/fave/.test(_347)){
data["categoryId"]=_347.substring(5);
_349=data["categoryId"];
}else{
if(_348){
data["categoryId"]=_347;
}else{
data["forumId"]=_347;
}
}
return this.each(function(_34a,elt){
var _34b=jq(elt);
var _34c=_34b.data("settings");
var _34d=_34b.attr("id");
var _34e=$.extend(data,_34c.data);
_34e["id"]=_34c.id;
jq.post("/xml/forumselector.php",_34e,function(rsp){
_34b.html(rsp);
_341.apply(_34b);
$("#"+_34c.id+"_category_id").val(_349);
});
});
},getValue:function(){
var _34f=this.data("settings");
return $(_34f.valueId).val();
},destroy:function(){
}};
$.fn.hpForumSelector=function(_350){
if(_344[_350]){
return _344[_350].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _350==="object"||!_350){
return _344.init.apply(this,arguments);
}else{
$.error("Method "+_350+" does not exist on jQuery.hpForumSelector");
}
}
};
})(jQuery);
function addEvent(_351,type,_352){
if(!_352.$$guid){
_352.$$guid=addEvent.guid++;
}
if(!_351.events){
_351.events={};
}
var _353=_351.events[type];
if(!_353){
_353=_351.events[type]={};
if(_351["on"+type]){
_353[0]=_351["on"+type];
}
}
_353[_352.$$guid]=_352;
_351["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_354,type,_355){
if(_354.events&&_354.events[type]){
delete _354.events[type][_355.$$guid];
}
};
function handleEvent(_356){
var _357=true;
_356=_356||fixEvent(window.event);
if(_356==null){
return false;
}
if(this.events==null){
return false;
}
var _358=this.events[_356.type];
for(var i in _358){
this.$$handleEvent=_358[i];
if(this.$$handleEvent(_356)===false){
_357=false;
}
}
return _357;
};
function fixEvent(_359){
if(_359!=null){
_359.preventDefault=fixEvent.preventDefault;
_359.stopPropagation=fixEvent.stopPropagation;
}
return _359;
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
var css={getElementsByClass:function(node,_35a,tag){
var _35b=new Array();
var els=node.getElementsByTagName(tag);
var _35c=els.length;
var _35d=new RegExp("(^|\\s)"+_35a+"(\\s|$)");
for(var i=0,j=0;i<_35c;i++){
if(this.elementHasClass(els[i],_35a)){
_35b[j]=els[i];
j++;
}
}
return _35b;
},elementHasClass:function(el,_35e){
if(!el){
return false;
}
var _35f=new RegExp("\\b"+_35e+"\\b");
if(el.className.match(_35f)){
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
var _360=document.getElementsByTagName("table");
for(var i=0;i<_360.length;i++){
var _361=_360[i];
if(css.elementHasClass(_361,"sortable")){
this.makeSortable(_361);
}
}
},makeSortable:function(_362){
if(!_362.id){
_362.id="sortableTable"+this.lastAssignedId++;
}
if(!_362.tHead||!_362.tHead.rows||0==_362.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_362.tHead.rows.length;i++){
if(css.elementHasClass(_362.tHead.rows[i],"sort_control_buttons")){
row=_362.tHead.rows[i];
break;
}
}
if(row==null){
row=_362.tHead.rows[_362.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _363=row.cells[i].firstChild;
_363.onclick=this.headingClicked;
_363.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _364=getEventTarget(e);
var td=_364.parentNode;
var tr=td.parentNode;
var _365=tr.parentNode;
var _366=_365.parentNode;
if(!_366.tBodies||_366.tBodies[0].rows.length<=1){
return false;
}
var _367=_364.getAttribute("columnId")||td.cellIndex;
var _368=css.getElementsByClass(td,"tableSortArrow","span");
var _369="";
if(_368.length>0){
_369=_368[0].getAttribute("sortOrder");
}
var itm="";
var _36a=0;
while(""==itm&&_36a<_366.tBodies[0].rows.length){
var elm=_366.tBodies[0].rows[_36a].cells[_367];
if(elm.childNodes.length==1){
itm=that.getInnerText(_366.tBodies[0].rows[_36a].cells[_367]);
}else{
itm=that.getInnerText(_366.tBodies[0].rows[_36a].cells[_367].firstChild);
}
_36a++;
}
var _36b=that.determineSortFunction(itm);
var _36c;
if(_366.id==that.lastSortedTable&&_367==that.sortColumnIndex){
_36c=that.newRows;
_36c.reverse();
}else{
that.sortColumnIndex=_367;
_36c=new Array();
for(var j=0;j<_366.tBodies[0].rows.length;j++){
_36c[j]=_366.tBodies[0].rows[j];
}
_36c.sort(_36b);
}
that.moveRows(_366,_36c);
that.newRows=_36c;
that.lastSortedTable=_366.id;
var _368=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_368.length;j++){
if(j==_367){
if(null==_369||""==_369||"DESC"==_369){
_368[j].innerHTML="▼";
_368[j].setAttribute("sortOrder","ASC");
}else{
_368[j].innerHTML="▲";
_368[j].setAttribute("sortOrder","DESC");
}
}else{
_368[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_366.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_366.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_366.tBodies[0].rows.length;i++){
tr=_366.tBodies[0].rows[i];
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
var _36d=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_36d=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_36d=this.sortDate;
}
if(itm.match(/^[�$]/)){
_36d=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_36d=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_36d=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_36d=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_36d=this.sortIP;
}
return _36d;
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
var _36e=a.cells[that.sortColumnIndex];
if(_36e.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _36f=b.cells[that.sortColumnIndex];
if(_36f.childNodes.length>1){
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
},moveRows:function(_370,_371){
for(var i=0;i<_371.length;i++){
var _372=_371[i];
_370.tBodies[0].appendChild(_372);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_373,_374,_375){
this.modId=_373;
this.pollId=_374;
this.results_div_id=_373+"_poll_results";
this.vote_form_id=_373+"_vote_form";
this.vote_radio_name=_373+"_vote";
this.hubnugget=_375;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _376=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_376,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _377=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_378){
return _378.checked;
});
if(null==_377){
return;
}else{
vote=_377.value;
}
var _379=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_379,onFailure:reportError,onComplete:function(){
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
ContentRotator.prototype={initialize:function(ids,_37a,_37b,_37c,_37d,_37e,_37f,_380,_381,loop,_382){
this.ids=ids;
this.prefix=_37a;
this.interval=_37b;
this.position=0;
this.paused=false;
this.transitionEffect=_37c;
this.transitioning=false;
this.updateFunction=null;
if(_382!==undefined&&jq(_382).length>0){
this.navButtons=jq(_382);
this.firstButton=this.navButtons.find("li").first();
this.firstButton.find("a").addClass("active");
this.renderNavButtons.bind(this);
this.renderNavButtons();
}
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_37d){
this.playId=_37d;
}
if(_37e){
this.pauseId=_37e;
}
if(_37f){
this.positionIndicatorId=_37f;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_380){
this.prevId=_380;
}
if(_381){
this.nextId=_381;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},renderNavButtons:function(){
var _383=this.firstButton,_384=_383.find("a"),self=this,_385=this.position;
_384.data("position",_385);
_384.click(function(e){
e.preventDefault();
self.seek(jq(this).data("position"));
});
for(var i=1,l=this.ids.length;i<l;i++){
var _386=_383.clone(true),_387=++_385,_388=_386.find("a");
_388.attr("id","button_"+_387);
_388.removeClass("active");
_388.data("position",_387);
self.navButtons.append(_386);
}
},update:function(_389){
if(this.paused||this.activeUpdateThreadId!=_389){
return;
}
this.next();
this.updateFunction=setTimeout(this.update.bind(this,_389),this.interval);
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
},seek:function(_38a){
var next=this.position<_38a,_38b=_38a%this.ids.length;
while(_38b<0){
_38b+=this.ids.length;
}
if(this.position==_38b){
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
var _38c=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_38c.toggle();
this.position=_38b;
if(this.fadeTransition){
var _38d=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _38d=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_38d.options.onComplete=this.endTransition.bind(this);
_38d.hide();
_38d.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=_38b;
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
this.selectCurrentButton(_38a);
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
},selectCurrentButton:function(_38e){
if(this.navButtons){
clearTimeout(this.updateFunction);
if(this.interval>0){
this.updateFunction=setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
this.navButtons.find("a[id^=button]").removeClass("active");
jq("#button_"+(_38e%this.ids.length)).addClass("active");
}
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_38f,_390,_391,_392,_393){
this.typeId=_38f;
this.categoryId=_390;
this.userId=_393;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_392;
this.updateTime=_391;
this.originalUpdateTime=_391;
this.currentTime=parseInt(_391,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_394){
_394.preventDefault();
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
var _395=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_395=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_395);
}.bind(this));
},getTimeAgo:function(_396){
if(_396<=1){
return "1 second ago";
}
var _397=Math.round(_396/60);
var _398=Math.round(_396/3600);
var days=Math.round(_396/86400);
var _399=Math.round(_396/604800);
var _39a=Math.round(_396/2592000);
var _39b=Math.round(_396/31536000);
var ret="";
if(_39b>=2){
ret=_39b+" years ago";
}else{
if(_39a>=2){
ret=_39a+" months ago";
}else{
if(_399>=2){
ret=_399+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_398>=2){
ret=_398+" hours ago";
}else{
if(_397>=1){
ret=_397+" minute"+(_397==1?"":"s")+" ago";
}else{
ret=_396+" second"+(_396==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _39c=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_39c;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _39d=parseInt(req.responseText,10);
if(_39d>0){
this.newStoriesAvailable=_39d;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _39e=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_39e+" "+is+" available (click to load)";
},loadNewStories:function(_39f){
var nt=_39f?_39f:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _3a0=$(document.createElement("div"));
_3a0.addClassName("feed_item");
_3a0.innerHTML=data["render"];
var _3a1=$("feed_box").down(".feed_item",0);
_3a1.parentNode.insertBefore(_3a0,_3a1);
_3a0.descendants().each(function(elt){
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
var _3a2=$(document.createElement("div"));
_3a2.addClassName("feed_item");
_3a2.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _3a3=$("feed_box").down(".feed_item",0);
_3a3.parentNode.insertBefore(_3a2,_3a3);
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
var _3a4=$(document.createElement("div"));
_3a4.addClassName("feed_item");
_3a4.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _3a5=$("feed_box").down(".feed_item",0);
_3a5.parentNode.insertBefore(_3a4,_3a5);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _3a6=$(document.createElement("div"));
_3a6.addClassName("feed_item");
_3a6.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _3a7=$("feed_box").down(".feed_item",0);
_3a7.parentNode.insertBefore(_3a6,_3a7);
return;
}
var _3a8=$("category_filters");
if(!_3a8){
var _3a9=$(document.createElement("div"));
_3a9.addClassName("feed_setting_box");
_3a9.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_3a9);
var _3a8=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_3a8.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_3aa,type,id){
new Ajax.Updater(_3aa,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_3ab,_3ac,_3ad){
makeGrowable(id,_3ab,_3ac,_3ad);
},makeExpandable:function(id,_3ae,_3af,_3b0,_3b1){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_3ae,_3af,_3b0,null,_3b1);
return;
}
elt.addClass("expandable_text dimmed").val(_3ae).data("hasFocus",false);
function _3b2(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_3b3,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _3b4(){
if(_3b2()){
if(!_3b0){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_3ae);
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
if(typeof (_3af)=="function"){
_3af.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_3b4();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_3b4();
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
},saveForm:function(_3b5){
this.getHandler(_3b5).save();
return false;
},addStoryToTop:function(_3b6,id,_3b7){
var _3b8=$(document.createElement("div"));
_3b8.innerHTML=_3b6;
_3b8.addClassName("feed_item");
var _3b9=$("feed_box").down(".feed_item",0);
_3b9.parentNode.insertBefore(_3b8,_3b9);
_3b8.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _3ba=new fx.Color(_3b8,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_3b7?_3b7:function(){
})});
_3ba.toggle();
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
var _3bb=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_3bb.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _3bc=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
jq("#category").hpCategorySelector("chooseCategory",0);
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _3bd=$("question");
_3bd.value="What is your question?";
_3bd.setStyle({"color":"#777"});
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
_3bc.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _3be=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _3bf=$("subject");
var _3c0=$("message");
_3bf.setStyle({"color":"#777"});
_3bf.value="What is the subject of your forum post?";
_3c0.value="";
jq("#feed_forum_selector").hpForumSelector("chooseForum",0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_3be.toggle();
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
},moreFeed:function(_3c1){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_3c1,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _3c2=JSONstring.toObject(req.responseText);
var _3c3=$("show_more");
_3c3.style.display="none";
_3c3.id="";
var _3c4=$(document.createElement("div"));
$("feed_box").appendChild(_3c4);
_3c4.innerHTML=_3c2["render"];
var _3c5=$("feed_more_"+_3c1);
$$("#feed_more_"+_3c1+" script").each(function(_3c6){
safeScriptEval(_3c6);
});
this.addItems(_3c2["feed"]);
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
},unhideUser:function(_3c7){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_3c7,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_3c7).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3c8=this.getById(fid);
if(_3c8){
_3c8.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_3c7);
if(hu){
if(hu.siblings().size()==0){
var _3c9=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3c9.parentNode.insertBefore(p,_3c9);
}
_3c9.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_3ca){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_3ca,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_3ca).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3cb=this.getById(fid);
if(_3cb){
_3cb.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_3ca);
if(hc){
if(hc.siblings().size()==0){
var _3cc=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3cc.parentNode.insertBefore(p,_3cc);
}
_3cc.remove();
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
var _3cd=$("overlay");
_3cd.classNames().each(function(name){
if(name!="overlay"){
_3cd.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_3ce){
if(_3ce){
$("overlay").addClassName(_3ce);
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
var _3cf=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3cf+"px"});
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
var _3d0=0;
$("overlay_content").innerHTML=req.responseText;
var _3d1=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d1+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_3d2){
var code=_3d2.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_3d3){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_3d3,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_3d4,_3d5){
var sure=confirm("Are you sure that you want to stop following "+_3d5+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_3d4,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_3d4).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _3d6=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_3d6.each(function(type){
var _3d7=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_3d8){
if(_3d8.checked){
_3d7=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_3d7){
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
var _3d9=jq("#edit_button");
if(_3d9.html()=="edit"){
this.toggleFeedPrefs();
}
var _3da=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_3da);
return false;
},toggleFeedPrefs:function(){
var _3db=$("edit_button");
var _3dc=$("filter").value;
var _3dd="edit";
if(_3db.innerHTML=="save"){
_3dd="save";
}
if(_3dd=="save"){
this.updateFeedTypeFilters();
var _3de=0;
var _3df=$$(".ht_box");
for(var j=0;j<_3df.length;j++){
if(_3df[j].checked){
_3de+=Number(_3df[j].name.substr(3));
}
}
var _3e0=$("current_prefs");
if(_3de!=_3e0.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_3de,filter:_3dc,feed:1}).toQueryString(),onComplete:function(){
Element.update(_3db,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3e1=parseInt(pf.getStyle("height"));
var _3e2=new fx.Height("preference_feedback",{duration:600});
_3e2.hide();
_3e2.custom(0,_3e1);
}});
_3e0.value=_3de;
}else{
Element.update(_3db,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3e3=parseInt(pf.getStyle("height"));
var _3e4=new fx.Height("preference_feedback",{duration:600});
_3e4.hide();
_3e4.custom(0,_3e3);
}
}
var curs=$$(".ht_cur");
var _3e5="";
for(var i=0;i<curs.length;i++){
_3e5=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_3dd=="edit"){
if(_3e5=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_3e5){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_3dd=="edit"){
_3db.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_3e6,_3e7,_3e8){
this.id=id;
this.feedItemId=fid;
this.cdate=_3e6;
this.hidden=_3e7;
this.manager=_3e8;
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
},unhide:function(_3e9){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_3e9){
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
Event.observe(this.triggerId,"click",function(_3ea){
if(Event.element(_3ea).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _3eb=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_3eb){
elt.observe("mouseover",function(_3ec){
_3ec.show();
}.bind(this,_3eb));
elt.observe("mouseout",function(_3ed){
_3ed.hide();
}.bind(this,_3eb));
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
},share:function(_3ee){
if(_3ee===undefined){
_3ee=false;
}
if(_3ee){
var _3ef=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_3ef){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_3f0,_3f1){
if(_3f0){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_3f1){
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
var _3f2=$(this.htmlId);
_3f2.parentNode.insertBefore(hmsg,_3f2);
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
},hideUser:function(_3f3,_3f4){
_3f4=_3f4?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_3f3,force:_3f4}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3f5=$(this.htmlId);
_3f5.parentNode.insertBefore(hmsg,_3f5);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_3f3).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_3f6,_3f7){
_3f7=_3f7?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_3f7,categoryId:_3f6}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3f8=$(this.htmlId);
_3f8.parentNode.insertBefore(hmsg,_3f8);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_3f6).each(function(elt){
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
var _3f9=$("feed_posts_"+this.id).immediateDescendants();
var _3fa=_3f9.size();
_3f9.each(function(elt,_3fb){
if(_3fb==_3fa-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _3fc=$("feed_comments_"+this.id).immediateDescendants();
var _3fd=_3fc.size();
var _3fe=0;
_3fc.each(function(elt,_3ff){
if(elt.hasClassName("show_previous")){
_3fe=_3ff;
}
});
_3fc.each(function(elt,_400){
if(_400==_3fe){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_401,num,_402){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_401,num:num,startpos:_402}).toQueryString(),onComplete:function(req){
var _403=$("feed_posts_"+this.id);
_403.down("div").hide();
new Insertion.Top(_403,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_404){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_404}).toQueryString(),onComplete:function(req){
var _405=$("feed_comments_"+this.id);
_405.down("div").hide();
new Insertion.Top(_405,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_406,num,_407){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_406,num:num,startpos:_407}).toQueryString(),onComplete:function(req){
var _408=$("feed_comments_"+this.id);
_408.down("div").hide();
new Insertion.Top(_408,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _409=$("feed_comments_"+this.id);
_409.innerHTML+=data["render"];
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
},observePostReporting:function(_40a){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _40b=$$("#story_"+this.id+" .feed_post");
if(_40b.size()>1){
_40b.each(function(elt){
var _40c=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _40d=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_40c]=_40d;
elt.observe("mouseover",_40d);
var _40e=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_40c]=_40e;
elt.observe("mouseout",_40e);
var _40f=this.manager.reportPost.bind(this.manager,_40c);
this.clickHandlers[_40c]=_40f;
elt.observe("click",_40f);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _410=$(document.createElement("a"));
_410.innerHTML="cancel report";
_410.href="#";
msg.appendChild(_410);
var _411=$(this.messageId);
_411.innerHTML="";
_411.appendChild(msg);
_411.addClassName("report_instructions");
var _412=parseInt(_411.getStyle("height"));
var _413=new fx.Height(this.messageId,{duration:500});
_413.hide();
_413.custom(0,_412);
_410.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_40b.size()==1){
var post=_40b.detect(function(elt){
return true;
});
var _414=post.id;
this.manager.reportPost(this.postIdFromDivId(_414));
}
}
return false;
},postIdFromDivId:function(_415){
return _415.substring(_415.lastIndexOf("_")+1);
},stopObservePostReporting:function(_416){
var _417=$$("#story_"+this.id+" .feed_post");
if(_417.size()>1){
_417.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _418=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_418]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_418]);
elt.stopObserving("click",this.clickHandlers[_418]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_416){
Event.stop(_416);
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
function deleteStatus(_419){
link=jq(_419.target);
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
function markerMap(m,_41a,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_41a);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_41b,_41c){
this.markers.push(new infoMarker(this,_41b,_41c,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_41d,_41e,_41f,_420){
this.markermap=_41d;
this.marker=_41e;
this.content=_41f;
this.position=_420;
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
var _421=$(this.legend.id+"_"+i);
if(_421){
_421.innerHTML="";
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
var _422=this.directionsResult.routes[0];
var legs=_422.legs;
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
var _423=$(this.legend.id+"_"+i);
if(_423){
_423.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_422.copyrights;
var _424="";
for(var j=0;j<_422.warnings.length;j++){
_424+=_422.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_424;
};
markerMap.prototype.fetchDirections=function(){
var _425=this.markers;
var l=_425.length;
var _426=new google.maps.LatLng(_425[0].marker.getPosition().lat(),_425[0].marker.getPosition().lng());
var _427=new google.maps.LatLng(_425[l-1].marker.getPosition().lat(),_425[l-1].marker.getPosition().lng());
var _428=[];
for(var i=1;i<l-1;i++){
_428.push({location:new google.maps.LatLng(_425[i].marker.getPosition().lat(),_425[i].marker.getPosition().lng()),stopover:true});
}
var _429={origin:_426,destination:_427,waypoints:_428,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _42a=new google.maps.DirectionsService();
_42a.route(_429,function(_42b,_42c){
if(_42c==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_42b;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_42d){
var _42e="map_canvas_"+id;
var _42f=mm.getMapById(id);
if(!_42f){
var map=new google.maps.Map(document.getElementById(_42e));
var _42f=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_42f);
sv=true;
}else{
var map=_42f.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_42f.removeAllMarkers();
var _430="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _431=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_431+".png";
var _432="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _433=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_42f.addMarker(_433,_432);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_430+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_42f.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_430+="<div id=\""+_42f.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_430+="<div id=\""+_42f.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_42f.legend.innerHTML=_430;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_42d||!_42f.directionsResult){
_42f.fetchDirections();
}else{
_42f.renderDirections();
}
}else{
var _434={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_42f.directionsResult=_434;
_42f.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_435){
var id=_435.markermap.id;
if(!id){
return;
}
var _436=mapLetterFromPosition(_435.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_436+".png";
_435.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_435.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_437){
var id=_437.markermap.id;
if(!id){
return;
}
var _438=mapLetterFromPosition(_437.position);
var icon="http://www.google.com/mapfiles/marker_green"+_438+".png";
_437.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_437.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_439,id,_43a){
var _43b=mm.getMapById(id);
if(_43a<_43b.markers.length){
highlightMarker(_43b.markers[_43a]);
}
};
function unhighlightMapMarker(_43c,id,_43d){
var _43e=mm.getMapById(id);
if(_43d<_43e.markers.length){
unhighlightMarker(_43e.markers[_43d]);
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
var _43f=jQuery("#editor_box");
if(_43f.hasClass("edit_box")){
jQuery(".message",_43f.closest(".postright")).show();
}
_43f.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_440,_441){
var ta=jq("#editor_box textarea");
var _442=ta.val();
if(_442.length){
ta.val(_442+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_440,_441)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_440,_441)+"[/img]\n\n");
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
var _443=jQuery("#report_box");
_443.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _444=jQuery(this).closest("div.replies_box_wrapper");
var _445=jQuery(this).closest("div.reply_collapser");
if(_445.hasClass("show")){
_445.addClass("hide").removeClass("show");
jQuery("a",_445).html("<span></span>");
jQuery("> .replies_box",_444).slideDown();
}else{
jQuery("> .replies_box",_444).slideUp(500,function(){
_445.addClass("show").removeClass("hide");
jQuery("a",_445).html("<span></span>"+jQuery("li.threaded",_444).length+" replies");
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
var _446=jQuery(this);
var _447=jQuery("#threaded_reply_to_box");
if(_446.html()=="hide"){
_446.html("this");
_447.hide();
return false;
}
var _448=_446.attr("class").substr(7);
var _449=jQuery("#post"+_448+" .username").html();
var html="<p class=\"by\">By "+_449+"</p>"+jQuery("#message"+_448).html();
var _44a=_446.closest("li.threaded");
if(_447.length>0){
_44a.append(_447);
}else{
jQuery(_44a).append("<div id=\"threaded_reply_to_box\"></div>");
_447=jQuery("#threaded_reply_to_box");
}
_447.html(html);
var pos=_446.position();
var _44b=_446.width();
_447.css({"left":(pos.left+_44b)+"px","top":pos.top+"px"});
_447.show();
_446.html("hide");
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
var _44c=jQuery(this);
_44c.attr("src",_44c.data("src"));
});
});
});
function show_post_reply_box(_44d){
jQuery("li.threaded img.wait").remove();
_44d.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _44e=jQuery("#editor_box");
_44e.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_44e).text("submit");
jQuery("form",_44e).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_44e).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _44f=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _450=_44f?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_450+="<br/>";
jQuery("textarea",_44e).after(_450);
}
if(jQuery("#follow_topic").length==0){
var _451="checked";
var _452=window.location.pathname;
var arr=_452.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _450="<p id=\"follow_topic\"></p>";
jQuery("textarea",_44e).after(_450);
}
jQuery("#posterror ul",_44e).html("");
jQuery("#posterror",_44e).hide();
jQuery("textarea",_44e).val("");
jQuery("#postId",_44e).val(_44d.attr("id").substring(4));
_44e.append(jQuery("#formatting_tips"));
_44e.show();
var x=_44e.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_453){
jQuery("li.threaded img.wait").remove();
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _454=jQuery("#report_box");
jQuery("#reportPostId",_454).val(_453.attr("id").substring(4));
jQuery("form",_454).ajaxForm({type:"POST",success:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_453).append(_454);
jQuery(">.post_wrap > .actionmenu",_453).append(_454);
_454.show();
var x=_454.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyError(data,_455,_456){
alert("There may have been an error posting your reply ("+_455+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_457,_458){
alert("There may have been an error updating your post ("+_457+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_459,_45a){
jQuery("li.threaded img.wait").remove();
if(_45a=="error"){
alert(_459.responseText);
return;
}
data=eval("("+_459.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _45b=jQuery("#editor_box");
_45b.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_45b).text("Save");
jQuery("form",_45b).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_45b).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _45c=document.getElementById("admincenter");
replyOptionsHTML=_45c?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_45b).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_45b).html("");
jQuery("#posterror",_45b).hide();
jQuery("#postId",_45b).val(data.postId);
jQuery("textarea",_45b).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_45b.append(jQuery("#formatting_tips"));
_45b.show();
var x=_45b.offset().top-300;
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
function processDeleteResponse(_45d,_45e,_45f){
if(_45e=="error"){
jQuery("li.threaded img.wait").remove();
alert(_45d);
}
};
function processUndeleteResponse(_460,_461,_462){
if(_461=="error"){
jQuery("li.threaded img.wait").remove();
alert(_460);
}
};
function processReportResponse(_463){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _464=jQuery("#report_box");
_464.hide();
alert(_463);
};
(function($){
$.extend($.fn,{validate:function(_465){
if(!this.length){
_465&&_465.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _466=$.data(this[0],"validator");
if(_466){
return _466;
}
_466=new $.validator(_465,this[0]);
$.data(this[0],"validator",_466);
if(_466.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_466.cancelSubmit=true;
});
if(_466.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_466.submitButton=this;
});
}
this.submit(function(_467){
if(_466.settings.debug){
_467.preventDefault();
}
function _468(){
if(_466.settings.submitHandler){
if(_466.submitButton){
var _469=$("<input type='hidden'/>").attr("name",_466.submitButton.name).val(_466.submitButton.value).appendTo(_466.currentForm);
}
_466.settings.submitHandler.call(_466,_466.currentForm);
if(_466.submitButton){
_469.remove();
}
return false;
}
return true;
};
if(_466.cancelSubmit){
_466.cancelSubmit=false;
return _468();
}
if(_466.form()){
if(_466.pendingRequest){
_466.formSubmitted=true;
return false;
}
return _468();
}else{
_466.focusInvalid();
return false;
}
});
}
return _466;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _46a=true;
var _46b=$(this[0].form).validate();
this.each(function(){
_46a&=_46b.element(this);
});
return _46a;
}
},removeAttrs:function(_46c){
var _46d={},_46e=this;
$.each(_46c.split(/\s/),function(_46f,_470){
_46d[_470]=_46e.attr(_470);
_46e.removeAttr(_470);
});
return _46d;
},rules:function(_471,_472){
var _473=this[0];
if(_471){
var _474=$.data(_473.form,"validator").settings;
var _475=_474.rules;
var _476=$.validator.staticRules(_473);
switch(_471){
case "add":
$.extend(_476,$.validator.normalizeRule(_472));
_475[_473.name]=_476;
if(_472.messages){
_474.messages[_473.name]=$.extend(_474.messages[_473.name],_472.messages);
}
break;
case "remove":
if(!_472){
delete _475[_473.name];
return _476;
}
var _477={};
$.each(_472.split(/\s/),function(_478,_479){
_477[_479]=_476[_479];
delete _476[_479];
});
return _477;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_473),$.validator.classRules(_473),$.validator.attributeRules(_473),$.validator.staticRules(_473)),_473);
if(data.required){
var _47a=data.required;
delete data.required;
data=$.extend({required:_47a},data);
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
$.validator=function(_47b,form){
this.settings=$.extend(true,{},$.validator.defaults,_47b);
this.currentForm=form;
this.init();
};
$.validator.format=function(_47c,_47d){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_47c);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_47d.constructor!=Array){
_47d=$.makeArray(arguments).slice(1);
}
if(_47d.constructor!=Array){
_47d=[_47d];
}
$.each(_47d,function(i,n){
_47c=_47c.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _47c;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_47e){
this.lastActive=_47e;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_47e,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_47e)).hide();
}
},onfocusout:function(_47f){
if(!this.checkable(_47f)&&(_47f.name in this.submitted||!this.optional(_47f))){
this.element(_47f);
}
},onkeyup:function(_480){
if(_480.name in this.submitted||_480==this.lastElement){
this.element(_480);
}
},onclick:function(_481){
if(_481.name in this.submitted){
this.element(_481);
}else{
if(_481.parentNode.name in this.submitted){
this.element(_481.parentNode);
}
}
},highlight:function(_482,_483,_484){
$(_482).addClass(_483).removeClass(_484);
},unhighlight:function(_485,_486,_487){
$(_485).removeClass(_486).addClass(_487);
}},setDefaults:function(_488){
$.extend($.validator.defaults,_488);
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
var _489=(this.groups={});
$.each(this.settings.groups,function(key,_48a){
$.each(_48a.split(/\s/),function(_48b,name){
_489[name]=key;
});
});
var _48c=this.settings.rules;
$.each(_48c,function(key,_48d){
_48c[key]=$.validator.normalizeRule(_48d);
});
function _48e(_48f){
var _490=$.data(this[0].form,"validator"),_491="on"+_48f.type.replace(/^validate/,"");
_490.settings[_491]&&_490.settings[_491].call(_490,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_48e).validateDelegate(":radio, :checkbox, select, option","click",_48e);
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
for(var i=0,_492=(this.currentElements=this.elements());_492[i];i++){
this.check(_492[i]);
}
return this.valid();
},element:function(_493){
_493=this.clean(_493);
this.lastElement=_493;
this.prepareElement(_493);
this.currentElements=$(_493);
var _494=this.check(_493);
if(_494){
delete this.invalid[_493.name];
}else{
this.invalid[_493.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _494;
},showErrors:function(_495){
if(_495){
$.extend(this.errorMap,_495);
this.errorList=[];
for(var name in _495){
this.errorList.push({message:_495[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_496){
return !(_496.name in _495);
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
var _497=0;
for(var i in obj){
_497++;
}
return _497;
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
var _498=this.lastActive;
return _498&&$.grep(this.errorList,function(n){
return n.element.name==_498.name;
}).length==1&&_498;
},elements:function(){
var _499=this,_49a={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_499.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _49a||!_499.objectLength($(this).rules())){
return false;
}
_49a[this.name]=true;
return true;
});
},clean:function(_49b){
return $(_49b)[0];
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
},prepareElement:function(_49c){
this.reset();
this.toHide=this.errorsFor(_49c);
},check:function(_49d){
_49d=this.clean(_49d);
if(this.checkable(_49d)){
_49d=this.findByName(_49d.name).not(this.settings.ignore)[0];
}
var _49e=$(_49d).rules();
var _49f=false;
for(var _4a0 in _49e){
var rule={method:_4a0,parameters:_49e[_4a0]};
try{
var _4a1=$.validator.methods[_4a0].call(this,_49d.value.replace(/\r/g,""),_49d,rule.parameters);
if(_4a1=="dependency-mismatch"){
_49f=true;
continue;
}
_49f=false;
if(_4a1=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_49d));
return;
}
if(!_4a1){
this.formatAndAdd(_49d,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_49d.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_49f){
return;
}
if(this.objectLength(_49e)){
this.successList.push(_49d);
}
return true;
},customMetaMessage:function(_4a2,_4a3){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_4a2).metadata()[this.settings.meta]:$(_4a2).metadata();
return meta&&meta.messages&&meta.messages[_4a3];
},customMessage:function(name,_4a4){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_4a4]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_4a5,_4a6){
return this.findDefined(this.customMessage(_4a5.name,_4a6),this.customMetaMessage(_4a5,_4a6),!this.settings.ignoreTitle&&_4a5.title||undefined,$.validator.messages[_4a6],"<strong>Warning: No message defined for "+_4a5.name+"</strong>");
},formatAndAdd:function(_4a7,rule){
var _4a8=this.defaultMessage(_4a7,rule.method),_4a9=/\$?\{(\d+)\}/g;
if(typeof _4a8=="function"){
_4a8=_4a8.call(this,rule.parameters,_4a7);
}else{
if(_4a9.test(_4a8)){
_4a8=jQuery.format(_4a8.replace(_4a9,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_4a8,element:_4a7});
this.errorMap[_4a7.name]=_4a8;
this.submitted[_4a7.name]=_4a8;
},addWrapper:function(_4aa){
if(this.settings.wrapper){
_4aa=_4aa.add(_4aa.parent(this.settings.wrapper));
}
return _4aa;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _4ab=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_4ab.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_4ab.element,_4ab.message);
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
for(var i=0,_4ac=this.validElements();_4ac[i];i++){
this.settings.unhighlight.call(this,_4ac[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_4ad,_4ae){
var _4af=this.errorsFor(_4ad);
if(_4af.length){
_4af.removeClass().addClass(this.settings.errorClass);
_4af.attr("generated")&&_4af.html(_4ae);
}else{
_4af=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_4ad),generated:true}).addClass(this.settings.errorClass).html(_4ae||"");
if(this.settings.wrapper){
_4af=_4af.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_4af).length){
this.settings.errorPlacement?this.settings.errorPlacement(_4af,$(_4ad)):_4af.insertAfter(_4ad);
}
}
if(!_4ae&&this.settings.success){
_4af.text("");
typeof this.settings.success=="string"?_4af.addClass(this.settings.success):this.settings.success(_4af);
}
this.toShow=this.toShow.add(_4af);
},errorsFor:function(_4b0){
var name=this.idOrName(_4b0);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_4b1){
return this.groups[_4b1.name]||(this.checkable(_4b1)?_4b1.name:_4b1.id||_4b1.name);
},checkable:function(_4b2){
return /radio|checkbox/i.test(_4b2.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_4b3,_4b4){
return _4b4.form==form&&_4b4.name==name&&_4b4||null;
});
},getLength:function(_4b5,_4b6){
switch(_4b6.nodeName.toLowerCase()){
case "select":
return $("option:selected",_4b6).length;
case "input":
if(this.checkable(_4b6)){
return this.findByName(_4b6.name).filter(":checked").length;
}
}
return _4b5.length;
},depend:function(_4b7,_4b8){
return this.dependTypes[typeof _4b7]?this.dependTypes[typeof _4b7](_4b7,_4b8):true;
},dependTypes:{"boolean":function(_4b9,_4ba){
return _4b9;
},"string":function(_4bb,_4bc){
return !!$(_4bb,_4bc.form).length;
},"function":function(_4bd,_4be){
return _4bd(_4be);
}},optional:function(_4bf){
return !$.validator.methods.required.call(this,$.trim(_4bf.value),_4bf)&&"dependency-mismatch";
},startRequest:function(_4c0){
if(!this.pending[_4c0.name]){
this.pendingRequest++;
this.pending[_4c0.name]=true;
}
},stopRequest:function(_4c1,_4c2){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_4c1.name];
if(_4c2&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_4c2&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_4c3){
return $.data(_4c3,"previousValue")||$.data(_4c3,"previousValue",{old:null,valid:true,message:this.defaultMessage(_4c3,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_4c4,_4c5){
_4c4.constructor==String?this.classRuleSettings[_4c4]=_4c5:$.extend(this.classRuleSettings,_4c4);
},classRules:function(_4c6){
var _4c7={};
var _4c8=$(_4c6).attr("class");
_4c8&&$.each(_4c8.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_4c7,$.validator.classRuleSettings[this]);
}
});
return _4c7;
},attributeRules:function(_4c9){
var _4ca={};
var _4cb=$(_4c9);
for(var _4cc in $.validator.methods){
var _4cd=_4cb.attr(_4cc);
if(_4cd){
_4ca[_4cc]=_4cd;
}
}
if(_4ca.maxlength&&/-1|2147483647|524288/.test(_4ca.maxlength)){
delete _4ca.maxlength;
}
return _4ca;
},metadataRules:function(_4ce){
if(!$.metadata){
return {};
}
var meta=$.data(_4ce.form,"validator").settings.meta;
return meta?$(_4ce).metadata()[meta]:$(_4ce).metadata();
},staticRules:function(_4cf){
var _4d0={};
var _4d1=$.data(_4cf.form,"validator");
if(_4d1.settings.rules){
_4d0=$.validator.normalizeRule(_4d1.settings.rules[_4cf.name])||{};
}
return _4d0;
},normalizeRules:function(_4d2,_4d3){
$.each(_4d2,function(prop,val){
if(val===false){
delete _4d2[prop];
return;
}
if(val.param||val.depends){
var _4d4=true;
switch(typeof val.depends){
case "string":
_4d4=!!$(val.depends,_4d3.form).length;
break;
case "function":
_4d4=val.depends.call(_4d3,_4d3);
break;
}
if(_4d4){
_4d2[prop]=val.param!==undefined?val.param:true;
}else{
delete _4d2[prop];
}
}
});
$.each(_4d2,function(rule,_4d5){
_4d2[rule]=$.isFunction(_4d5)?_4d5(_4d3):_4d5;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_4d2[this]){
_4d2[this]=Number(_4d2[this]);
}
});
$.each(["rangelength","range"],function(){
if(_4d2[this]){
_4d2[this]=[Number(_4d2[this][0]),Number(_4d2[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_4d2.min&&_4d2.max){
_4d2.range=[_4d2.min,_4d2.max];
delete _4d2.min;
delete _4d2.max;
}
if(_4d2.minlength&&_4d2.maxlength){
_4d2.rangelength=[_4d2.minlength,_4d2.maxlength];
delete _4d2.minlength;
delete _4d2.maxlength;
}
}
if(_4d2.messages){
delete _4d2.messages;
}
return _4d2;
},normalizeRule:function(data){
if(typeof data=="string"){
var _4d6={};
$.each(data.split(/\s/),function(){
_4d6[this]=true;
});
data=_4d6;
}
return data;
},addMethod:function(name,_4d7,_4d8){
$.validator.methods[name]=_4d7;
$.validator.messages[name]=_4d8!=undefined?_4d8:$.validator.messages[name];
if(_4d7.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_4d9,_4da,_4db){
if(!this.depend(_4db,_4da)){
return "dependency-mismatch";
}
switch(_4da.nodeName.toLowerCase()){
case "select":
var val=$(_4da).val();
return val&&val.length>0;
case "input":
if(this.checkable(_4da)){
return this.getLength(_4d9,_4da)>0;
}
default:
return $.trim(_4d9).length>0;
}
},remote:function(_4dc,_4dd,_4de){
if(this.optional(_4dd)){
return "dependency-mismatch";
}
var _4df=this.previousValue(_4dd);
if(!this.settings.messages[_4dd.name]){
this.settings.messages[_4dd.name]={};
}
_4df.originalMessage=this.settings.messages[_4dd.name].remote;
this.settings.messages[_4dd.name].remote=_4df.message;
_4de=typeof _4de=="string"&&{url:_4de}||_4de;
if(this.pending[_4dd.name]){
return "pending";
}
if(_4df.old===_4dc){
return _4df.valid;
}
_4df.old=_4dc;
var _4e0=this;
this.startRequest(_4dd);
var data={};
data[_4dd.name]=_4dc;
$.ajax($.extend(true,{url:_4de,mode:"abort",port:"validate"+_4dd.name,dataType:"json",data:data,success:function(_4e1){
_4e0.settings.messages[_4dd.name].remote=_4df.originalMessage;
var _4e2=_4e1===true;
if(_4e2){
var _4e3=_4e0.formSubmitted;
_4e0.prepareElement(_4dd);
_4e0.formSubmitted=_4e3;
_4e0.successList.push(_4dd);
_4e0.showErrors();
}else{
var _4e4={};
var _4e5=_4e1||_4e0.defaultMessage(_4dd,"remote");
_4e4[_4dd.name]=_4df.message=$.isFunction(_4e5)?_4e5(_4dc):_4e5;
_4e0.showErrors(_4e4);
}
_4df.valid=_4e2;
_4e0.stopRequest(_4dd,_4e2);
}},_4de));
return "pending";
},minlength:function(_4e6,_4e7,_4e8){
return this.optional(_4e7)||this.getLength($.trim(_4e6),_4e7)>=_4e8;
},maxlength:function(_4e9,_4ea,_4eb){
return this.optional(_4ea)||this.getLength($.trim(_4e9),_4ea)<=_4eb;
},rangelength:function(_4ec,_4ed,_4ee){
var _4ef=this.getLength($.trim(_4ec),_4ed);
return this.optional(_4ed)||(_4ef>=_4ee[0]&&_4ef<=_4ee[1]);
},min:function(_4f0,_4f1,_4f2){
return this.optional(_4f1)||_4f0>=_4f2;
},max:function(_4f3,_4f4,_4f5){
return this.optional(_4f4)||_4f3<=_4f5;
},range:function(_4f6,_4f7,_4f8){
return this.optional(_4f7)||(_4f6>=_4f8[0]&&_4f6<=_4f8[1]);
},email:function(_4f9,_4fa){
return this.optional(_4fa)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_4f9);
},url:function(_4fb,_4fc){
return this.optional(_4fc)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_4fb);
},date:function(_4fd,_4fe){
return this.optional(_4fe)||!/Invalid|NaN/.test(new Date(_4fd));
},dateISO:function(_4ff,_500){
return this.optional(_500)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_4ff);
},number:function(_501,_502){
return this.optional(_502)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_501);
},digits:function(_503,_504){
return this.optional(_504)||/^\d+$/.test(_503);
},creditcard:function(_505,_506){
if(this.optional(_506)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_505)){
return false;
}
var _507=0,_508=0,_509=false;
_505=_505.replace(/\D/g,"");
for(var n=_505.length-1;n>=0;n--){
var _50a=_505.charAt(n);
var _508=parseInt(_50a,10);
if(_509){
if((_508*=2)>9){
_508-=9;
}
}
_507+=_508;
_509=!_509;
}
return (_507%10)==0;
},accept:function(_50b,_50c,_50d){
_50d=typeof _50d=="string"?_50d.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_50c)||_50b.match(new RegExp(".("+_50d+")$","i"));
},equalTo:function(_50e,_50f,_510){
var _511=$(_510).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_50f).valid();
});
return $.trim(_50e)==$.trim(_511.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _512={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_513,_514,xhr){
var port=_513.port;
if(_513.mode=="abort"){
if(_512[port]){
_512[port].abort();
}
_512[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_515){
var mode=("mode" in _515?_515:$.ajaxSettings).mode,port=("port" in _515?_515:$.ajaxSettings).port;
if(mode=="abort"){
if(_512[port]){
_512[port].abort();
}
return (_512[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_516,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_516,_517,true);
},teardown:function(){
this.removeEventListener(_516,_517,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _517(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_518,type,_519){
return this.bind(type,function(_51a){
var _51b=$(_51a.target);
if(_51b.is(_518)){
return _519.apply(_51b,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_51c,_51d,_51e){
return this.optional(_51d)||this.getLength(jq.trim(_51c),_51d)==_51e;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_51f,_520,_521){
if(!this.depend(_521,_520)){
return "dependency-mismatch";
}
switch(_520.nodeName.toLowerCase()){
case "select":
var val=jq(_520).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_520)){
return this.getLength(_51f,_520)==0;
}
default:
return jq.trim(_51f).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_522,_523){
if(!this.depend(_523,_522)){
return "dependency-mismatch";
}
var _524=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_524=true;
}else{
var _525=ssn.split("-");
if(_525[0]=="000"||_525[1]=="00"||_525[2]=="0000"){
_524=true;
}
if(_525[0]=="666"){
_524=true;
}
var _526=parseInt(_525[0],10);
if(_526>=900){
if(_525[1][0]!=7&&_525[1][0]!=8){
_524=true;
}
}
}
return !_524;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_527,_528,_529){
if(!this.depend(_529,_528)){
return "dependency-mismatch";
}
return _527.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_52a,_52b){
if(!this.depend(_52b,_52a)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_52c,_52d,_52e){
var _52c=jq.trim(_52c);
if(_52c.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _52f=_52c.split("-");
var m=1*_52f[0]-1;
var d=1*_52f[1];
var y=1*_52f[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_530,_531,_532){
return jq.trim(_530).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
jQuery.validator.addMethod("requiredNoPlaceholder",function(_533,_534,_535){
if(!this.depend(_535,_534)){
return "dependency-mismatch";
}
if(jq(_534).hasClass("placeholder")){
return false;
}
switch(_534.nodeName.toLowerCase()){
case "select":
var val=jq(_534).val();
return val&&val.length>0;
case "input":
if(this.checkable(_534)){
return this.getLength(_533,_534)>0;
}
default:
return jq.trim(_533).length>0;
}
},"This field is required.");
(function($){
$.fn.checkLikeRadio=function(){
var that=this;
this.each(function(){
$(this).click(function(){
if($(this).attr("checked")){
var _536=$(this);
$(that).each(function(){
if($(this)[0]!==_536[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_537){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _537=="function"){
_537={success:_537};
}
var _538=this.attr("action");
var url=(typeof _538==="string")?$.trim(_538):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_537=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_537);
var veto={};
this.trigger("form-pre-serialize",[this,_537,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_537.beforeSerialize&&_537.beforeSerialize(this,_537)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_537.semantic);
if(_537.data){
_537.extraData=_537.data;
for(n in _537.data){
if(_537.data[n] instanceof Array){
for(var k in _537.data[n]){
a.push({name:n,value:_537.data[n][k]});
}
}else{
v=_537.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_537.beforeSubmit&&_537.beforeSubmit(a,this,_537)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_537,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_537.type.toUpperCase()=="GET"){
_537.url+=(_537.url.indexOf("?")>=0?"&":"?")+q;
_537.data=null;
}else{
_537.data=q;
}
var _539=this,_53a=[];
if(_537.resetForm){
_53a.push(function(){
_539.resetForm();
});
}
if(_537.clearForm){
_53a.push(function(){
_539.clearForm();
});
}
if(!_537.dataType&&_537.target){
var _53b=_537.success||function(){
};
_53a.push(function(data){
var fn=_537.replaceTarget?"replaceWith":"html";
$(_537.target)[fn](data).each(_53b,arguments);
});
}else{
if(_537.success){
_53a.push(_537.success);
}
}
_537.success=function(data,_53c,xhr){
var _53d=_537.context||_537;
for(var i=0,max=_53a.length;i<max;i++){
_53a[i].apply(_53d,[data,_53c,xhr||_539,_539]);
}
};
var _53e=$("input:file",this).length>0;
var mp="multipart/form-data";
var _53f=(_539.attr("enctype")==mp||_539.attr("encoding")==mp);
if(_537.iframe!==false&&(_53e||_537.iframe||_53f)){
if(_537.closeKeepAlive){
$.get(_537.closeKeepAlive,_540);
}else{
_540();
}
}else{
$.ajax(_537);
}
this.trigger("form-submit-notify",[this,_537]);
return this;
function _540(){
var form=_539[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_537);
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
var _541=0;
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
function _542(){
var t=_539.attr("target"),a=_539.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_539.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_541=true;
cb();
},s.timeout);
}
var _543=[];
try{
if(s.extraData){
for(var n in s.extraData){
_543.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_539.removeAttr("target");
}
$(_543).remove();
}
};
if(s.forceSync){
_542();
}else{
setTimeout(_542,10);
}
var data,doc,_544=50;
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
if(_541){
throw "timeout";
}
var _545=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_545);
if(!_545&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_544){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_546){
var _547={"content-type":s.dataType};
return _547[_546];
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
xhr.responseXML=_548(xhr.responseText);
}
}
data=_54a(xhr,s.dataType,s);
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
var _548=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _549=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _54a=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_549(data);
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
$.fn.ajaxForm=function(_54b){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_54b);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_54b);
}
}).bind("click.form-plugin",function(e){
var _54c=e.target;
var $el=$(_54c);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_54c=t[0];
}
var form=this;
form.clk=_54c;
if(_54c.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _54d=$el.offset();
form.clk_x=e.pageX-_54d.left;
form.clk_y=e.pageY-_54d.top;
}else{
form.clk_x=e.pageX-_54c.offsetLeft;
form.clk_y=e.pageY-_54c.offsetTop;
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
$.fn.formToArray=function(_54e){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_54e?form.getElementsByTagName("*"):form.elements;
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
if(_54e&&form.clk&&el.type=="image"){
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
if(!_54e&&form.clk){
var _54f=$(form.clk),_550=_54f[0];
n=_550.name;
if(n&&!_550.disabled&&_550.type=="image"){
a.push({name:n,value:_54f.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_551){
return $.param(this.formToArray(_551));
};
$.fn.fieldSerialize=function(_552){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_552);
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
$.fn.fieldValue=function(_553){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_553);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_554){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_554===undefined){
_554=true;
}
if(_554&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _555=el.selectedIndex;
if(_555<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_555+1:ops.length);
for(var i=(one?_555:0);i<max;i++){
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
$.fn.selected=function(_556){
if(_556===undefined){
_556=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_556;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_556&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_556;
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
$.fn.extend({accordion:function(_557,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _557=="string"){
var _558=$.data(this,"ui-accordion");
_558[_557].apply(_558,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_557));
}
}
});
},activate:function(_559){
return this.accordion("activate",_559);
}});
$.ui.accordion=function(_55a,_55b){
this.options=_55b=$.extend({},$.ui.accordion.defaults,_55b);
this.element=_55a;
$(_55a).addClass("ui-accordion");
if(_55b.navigation){
var _55c=$(_55a).find("a").filter(_55b.navigationFilter);
if(_55c.length){
if(_55c.filter(_55b.header).length){
_55b.active=_55c;
}else{
_55b.active=_55c.parent().parent().prev();
_55c.addClass("current");
}
}
}
_55b.headers=$(_55a).find(_55b.header);
_55b.active=_55d(_55b.headers,_55b.active);
if(_55b.fillSpace){
var _55e=$(_55a).parent().height();
_55b.headers.each(function(){
_55e-=$(this).outerHeight();
});
var _55f=0;
_55b.headers.next().each(function(){
_55f=Math.max(_55f,$(this).innerHeight()-$(this).height());
}).height(_55e-_55f);
}else{
if(_55b.autoheight){
var _55e=0;
_55b.headers.next().each(function(){
_55e=Math.max(_55e,$(this).outerHeight());
}).height(_55e);
}
}
_55b.headers.not(_55b.active||"").next().hide();
_55b.active.parent().andSelf().addClass(_55b.selectedClass);
if(_55b.event){
$(_55a).bind((_55b.event)+".ui-accordion",_560);
}
};
$.ui.accordion.prototype={activate:function(_561){
_560.call(this.element,{target:_55d(this.options.headers,_561)[0]});
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
function _562(_563,_564){
return function(){
return _563.apply(_564,arguments);
};
};
function _565(_566){
if(!$.data(this,"ui-accordion")){
return;
}
var _567=$.data(this,"ui-accordion");
var _568=_567.options;
_568.running=_566?0:--_568.running;
if(_568.running){
return;
}
if(_568.clearStyle){
_568.toShow.add(_568.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_568.data],_568.change);
};
function _569(_56a,_56b,data,_56c,down){
var _56d=$.data(this,"ui-accordion").options;
_56d.toShow=_56a;
_56d.toHide=_56b;
_56d.data=data;
var _56e=_562(_565,this);
_56d.running=_56b.size()==0?_56a.size():_56b.size();
if(_56d.animated){
if(!_56d.alwaysOpen&&_56c){
$.ui.accordion.animations[_56d.animated]({toShow:jQuery([]),toHide:_56b,complete:_56e,down:down,autoheight:_56d.autoheight});
}else{
$.ui.accordion.animations[_56d.animated]({toShow:_56a,toHide:_56b,complete:_56e,down:down,autoheight:_56d.autoheight});
}
}else{
if(!_56d.alwaysOpen&&_56c){
_56a.toggle();
}else{
_56b.hide();
_56a.show();
}
_56e(true);
}
};
function _560(_56f){
var _570=$.data(this,"ui-accordion").options;
if(_570.disabled){
return false;
}
if(!_56f.target&&!_570.alwaysOpen){
_570.active.parent().andSelf().toggleClass(_570.selectedClass);
var _571=_570.active.next(),data={instance:this,options:_570,newHeader:jQuery([]),oldHeader:_570.active,newContent:jQuery([]),oldContent:_571},_572=_570.active=$([]);
_569.call(this,_572,_571,data);
return false;
}
var _573=$(_56f.target);
if(_573.parents(_570.header).length){
while(!_573.is(_570.header)){
_573=_573.parent();
}
}
var _574=_573[0]==_570.active[0];
if(_570.running||(_570.alwaysOpen&&_574)){
return false;
}
if(!_573.is(_570.header)){
return;
}
_570.active.parent().andSelf().toggleClass(_570.selectedClass);
if(!_574){
_573.parent().andSelf().addClass(_570.selectedClass);
}
var _572=_573.next(),_571=_570.active.next(),data={instance:this,options:_570,newHeader:_573,oldHeader:_570.active,newContent:_572,oldContent:_571},down=_570.headers.index(_570.active[0])>_570.headers.index(_573[0]);
_570.active=_574?$([]):_573;
_569.call(this,_572,_571,data,_574,down);
return false;
};
function _55d(_575,_576){
return _576!=undefined?typeof _576=="number"?_575.filter(":eq("+_576+")"):_575.not(_575.not(_576)):_576===false?$([]):_575.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_577,_578){
_577=$.extend({easing:"swing",duration:300},_577,_578);
if(!_577.toHide.size()){
_577.toShow.animate({height:"show"},_577);
return;
}
var _579=_577.toHide.height(),_57a=_577.toShow.height(),_57b=_57a/_579;
_577.toShow.css({height:0,overflow:"hidden"}).show();
_577.toHide.filter(":hidden").each(_577.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _57c=(_579-now)*_57b;
if($.browser.msie||$.browser.opera){
_57c=Math.ceil(_57c);
}
_577.toShow.height(_57c);
},duration:_577.duration,easing:_577.easing,complete:function(){
if(!_577.autoheight){
_577.toShow.css("height","auto");
}
_577.complete();
}});
},bounceslide:function(_57d){
this.slide(_57d,{easing:_57d.down?"bounceout":"swing",duration:_57d.down?1000:200});
},easeslide:function(_57e){
this.slide(_57e,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_57f,_580,wrap,_581,_582,_583,_584,_585,_586=0,_587={},_588=[],_589=0,_58a={},_58b=[],_58c=null,_58d=new Image(),_58e=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_58f=/[^\.]\.(swf)\s*$/i,_590,_591=1,_592,_593,busy=false,_594=20,fx=$.extend($("<div/>")[0],{prop:0}),_595=0,_596=!$.support.opacity&&!window.XMLHttpRequest,_597=function(){
_57f.hide();
_58d.onerror=_58d.onload=null;
if(_58c){
_58c.abort();
}
tmp.empty();
},_598=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_599=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_59a=function(){
var view=_599(),to={},_59b=_58a.margin,_59c=_58a.autoScale,_59d=(_594+_59b)*2,_59e=(_594+_59b)*2,_59f=(_58a.padding*2),_5a0;
if(_58a.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_58a.width))/100)-(_594*2);
_59c=false;
}else{
to.width=_58a.width+_59f;
}
if(_58a.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_58a.height))/100)-(_594*2);
_59c=false;
}else{
to.height=_58a.height+_59f;
}
if(_59c&&(to.width>(view[0]-_59d)||to.height>(view[1]-_59e))){
if(_587.type=="image"||_587.type=="swf"){
_59d+=_59f;
_59e+=_59f;
_5a0=Math.min(Math.min(view[0]-_59d,_58a.width)/_58a.width,Math.min(view[1]-_59e,_58a.height)/_58a.height);
to.width=Math.round(_5a0*(to.width-_59f))+_59f;
to.height=Math.round(_5a0*(to.height-_59f))+_59f;
}else{
to.width=Math.min(to.width,(view[0]-_59d));
to.height=Math.min(to.height,(view[1]-_59e));
}
}
to.top=view[3]+((view[1]-(to.height+(_594*2)))*0.5);
if(_58a.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_594*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_58a.minWidth)+(_594*2)))*0.5);
}
if(_58a.autoScale===false){
to.top=Math.max(view[3]+_59b,to.top);
to.left=Math.max(view[2]+_59b,to.left);
}
return to;
},_5a1=function(_5a2){
if(_5a2&&_5a2.length){
switch(_58a.titlePosition){
case "inside":
return _5a2;
case "over":
return "<span id=\"fancybox-title-over\">"+_5a2+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_5a2+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_5a3=function(){
var _5a4=_58a.title,_5a5=_593.width-(_58a.padding*2),_5a6="fancybox-title-"+_58a.titlePosition;
$("#fancybox-title").remove();
_595=0;
if(_58a.titleShow===false){
return;
}
_5a4=$.isFunction(_58a.titleFormat)?_58a.titleFormat(_5a4,_58b,_589,_58a):_5a1(_5a4);
if(!_5a4||_5a4===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_5a6+"\" />").css({"width":_5a5,"paddingLeft":_58a.padding,"paddingRight":_58a.padding}).html(_5a4).appendTo("body");
switch(_58a.titlePosition){
case "inside":
_595=$("#fancybox-title").outerHeight(true)-_58a.padding;
_593.height+=_595;
break;
case "over":
$("#fancybox-title").css("bottom",_58a.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_581).hide();
},_5a7=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_58a.enableEscapeButton){
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
if(_58b.length>1){
wrap.bind("mousewheel.fb",function(e,_5a8){
e.preventDefault();
if(busy||_5a8===0){
return;
}
if(_5a8>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_58a.showNavArrows){
return;
}
if((_58a.cyclic&&_58b.length>1)||_589!==0){
_584.show();
}
if((_58a.cyclic&&_58b.length>1)||_589!=(_58b.length-1)){
_585.show();
}
},_5a9=function(){
var href,_5aa;
if((_58b.length-1)>_589){
href=_58b[_589+1].href;
if(typeof href!=="undefined"&&href.match(_58e)){
_5aa=new Image();
_5aa.src=href;
}
}
if(_589>0){
href=_58b[_589-1].href;
if(typeof href!=="undefined"&&href.match(_58e)){
_5aa=new Image();
_5aa.src=href;
}
}
},_5ab=function(){
_582.css("overflow",(_58a.scrolling=="auto"?(_58a.type=="image"||_58a.type=="iframe"||_58a.type=="swf"?"hidden":"auto"):(_58a.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_582.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_58a.hideOnContentClick){
_582.one("click",$.fancybox.close);
}
if(_58a.hideOnOverlayClick){
_580.one("click",$.fancybox.close);
}
if(_58a.showCloseButton){
_583.show();
}
_5a7();
$(window).bind("resize.fb",$.fancybox.center);
if(_58a.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_58a.onComplete)){
_58a.onComplete(_58b,_589,_58a);
}
busy=false;
_5a9();
},_5ac=function(pos){
var _5ad=Math.round(_592.width+(_593.width-_592.width)*pos),_5ae=Math.round(_592.height+(_593.height-_592.height)*pos),top=Math.round(_592.top+(_593.top-_592.top)*pos),left=Math.round(_592.left+(_593.left-_592.left)*pos);
wrap.css({"width":_5ad+"px","height":_5ae+"px","top":top+"px","left":left+"px"});
_5ad=Math.max(_5ad-_58a.padding*2,0);
_5ae=Math.max(_5ae-(_58a.padding*2+(_595*pos)),0);
_582.css({"width":_5ad+"px","height":_5ae+"px"});
if(typeof _593.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_5af=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_5b0=function(){
var orig=_587.orig?$(_587.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_5af(orig);
from={width:(pos.width+(_58a.padding*2)),height:(pos.height+(_58a.padding*2)),top:(pos.top-_58a.padding-_594),left:(pos.left-_58a.padding-_594)};
}else{
view=_599();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_5b1=function(){
_57f.hide();
if(wrap.is(":visible")&&$.isFunction(_58a.onCleanup)){
if(_58a.onCleanup(_58b,_589,_58a)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_58b=_588;
_589=_586;
_58a=_587;
_582.get(0).scrollTop=0;
_582.get(0).scrollLeft=0;
if(_58a.overlayShow){
if(_596){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_580.css({"background-color":_58a.overlayColor,"opacity":_58a.overlayOpacity}).unbind().show();
}
_582.css("background-color",_58a.innerColor);
_593=_59a();
_5a3();
if(wrap.is(":visible")){
$(_583.add(_584).add(_585)).hide();
var pos=wrap.position(),_5b2;
_592={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_5b2=(_592.width==_593.width&&_592.height==_593.height);
_582.fadeOut(_58a.changeFade,function(){
var _5b3=function(){
_582.html(tmp.contents()).fadeIn(_58a.changeFade,_5ab);
};
$.event.trigger("fancybox-change");
_582.empty().css("overflow","hidden");
if(_5b2){
_582.css({top:_58a.padding,left:_58a.padding,width:Math.max(_593.width-(_58a.padding*2),1),height:Math.max(_593.height-(_58a.padding*2)-_595,1)});
_5b3();
}else{
_582.css({top:_58a.padding,left:_58a.padding,width:Math.max(_592.width-(_58a.padding*2),1),height:Math.max(_592.height-(_58a.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_58a.changeSpeed,easing:_58a.easingChange,step:_5ac,complete:_5b3});
}
});
return;
}
wrap.css("opacity",1);
if(_58a.transitionIn=="elastic"){
_592=_5b0();
_582.css({top:_58a.padding,left:_58a.padding,width:Math.max(_592.width-(_58a.padding*2),1),height:Math.max(_592.height-(_58a.padding*2),1)}).html(tmp.contents());
wrap.css(_592).show();
if(_58a.opacity){
_593.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_58a.speedIn,easing:_58a.easingIn,step:_5ac,complete:_5ab});
}else{
_582.css({top:_58a.padding,left:_58a.padding,width:Math.max(_593.width-(_58a.padding*2),1),height:Math.max(_593.height-(_58a.padding*2)-_595,1)}).html(tmp.contents());
wrap.css(_593).fadeIn(_58a.transitionIn=="none"?0:_58a.speedIn,_5ab);
}
},_5b4=function(){
tmp.width(_587.width);
tmp.height(_587.height);
if(_587.width=="auto"){
_587.width=tmp.width();
}
if(_587.height=="auto"){
_587.height=tmp.height();
}
_5b1();
},_5b5=function(){
busy=true;
_587.width=_58d.width;
_587.height=_58d.height;
$("<img />").attr({"id":"fancybox-img","src":_58d.src,"alt":_587.title}).appendTo(tmp);
_5b1();
},_5b6=function(){
_597();
var obj=_588[_586],href,type,_5b7,str,emb,_5b8,data;
_587=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_587:$(obj).data("fancybox")));
_5b7=obj.title||$(obj).title||_587.title||"";
if(obj.nodeName&&!_587.orig){
_587.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_5b7===""&&_587.orig){
_5b7=_587.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_587.href||jq(obj).attr("href")||null;
}else{
href=_587.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_587.type){
type=_587.type;
if(!href){
href=_587.content;
}
}else{
if(_587.content){
type="html";
}else{
if(href){
if(href.match(_58e)){
type="image";
}else{
if(href.match(_58f)){
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
_587.type=type;
_587.href=href;
_587.title=_5b7;
if(_587.autoDimensions&&_587.type!=="iframe"&&_587.type!=="swf"){
_587.width="auto";
_587.height="auto";
}
if(_587.modal){
_587.overlayShow=true;
_587.hideOnOverlayClick=false;
_587.hideOnContentClick=false;
_587.enableEscapeButton=false;
_587.showCloseButton=false;
}
if($.isFunction(_587.onStart)){
if(_587.onStart(_588,_586,_587)===false){
busy=false;
return;
}
}
tmp.css("padding",(_594+_587.padding+_587.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_582.children());
});
switch(type){
case "html":
tmp.html(_587.content);
_5b4();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_582.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_5b4();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_58d=new Image();
_58d.onerror=function(){
_598();
};
_58d.onload=function(){
_58d.onerror=null;
_58d.onload=null;
_5b5();
};
_58d.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_587.width+"\" height=\""+_587.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_587.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_587.width+"\" height=\""+_587.height+"\""+emb+"></embed></object>";
tmp.html(str);
_5b4();
break;
case "ajax":
_5b8=href.split("#",2);
data=_587.ajax.data||{};
if(_5b8.length>1){
href=_5b8[0];
if(typeof data=="string"){
data+="&selector="+_5b8[1];
}else{
data.selector=_5b8[1];
}
}
busy=false;
$.fancybox.showActivity();
_58c=$.ajax($.extend(_587.ajax,{url:href,data:data,error:_598,success:function(data,_5b9,_5ba){
if(_58c.status==200){
tmp.html(data);
_5b4();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_587.scrolling+"\" src=\""+_587.href+"\"></iframe>").appendTo(tmp);
_5b1();
break;
}
},_5bb=function(){
if(!_57f.is(":visible")){
clearInterval(_590);
return;
}
$("div",_57f).css("top",(_591*-40)+"px");
_591=(_591+1)%12;
},_5bc=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_57f=$("<div id=\"fancybox-loading\"><div></div></div>"),_580=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_57f.addClass("fancybox-ie");
}
_581=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_581.append(_582=$("<div id=\"fancybox-inner\"></div>"),_583=$("<a id=\"fancybox-close\"></a>"),_584=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_585=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_583.click($.fancybox.close);
_57f.click($.fancybox.cancel);
_584.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_585.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_596){
_580.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_57f.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_581.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_5bd){
$(this).data("fancybox",$.extend({},_5bd,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_588=[];
_586=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_588.push(this);
}else{
_588=$("a[rel="+rel+"], area[rel="+rel+"]");
_586=_588.index(this);
}
_5b6();
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
_588=[];
_586=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_588=jQuery.merge(_588,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_588.push(obj);
}
if(_586>_588.length||_586<0){
_586=0;
}
_5b6();
};
$.fancybox.showActivity=function(){
clearInterval(_590);
_57f.show();
_590=setInterval(_5bb,66);
};
$.fancybox.update=function(rel){
_588=$("a[rel="+rel+"], area[rel="+rel+"]");
};
$.fancybox.hideActivity=function(){
_57f.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_589+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_589-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_58b.length>pos){
_586=pos;
_5b6();
}
if(_58a.cyclic&&_58b.length>1&&pos<0){
_586=_58b.length-1;
_5b6();
}
if(_58a.cyclic&&_58b.length>1&&pos>=_58b.length){
_586=0;
_5b6();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_597();
if(_587&&$.isFunction(_587.onCancel)){
_587.onCancel(_588,_586,_587);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_58a&&$.isFunction(_58a.onCleanup)){
if(_58a.onCleanup(_58b,_589,_58a)===false){
busy=false;
return;
}
}
_597();
$(_583.add(_584).add(_585)).hide();
$("#fancybox-title").remove();
wrap.add(_582).add(_580).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _5be(){
_580.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_582.empty();
if($.isFunction(_58a.onClosed)){
_58a.onClosed(_58b,_589,_58a);
}
_58b=_587=[];
_589=_586=0;
_58a=_587={};
busy=false;
};
_582.css("overflow","hidden");
if(_58a.transitionOut=="elastic"){
_592=_5b0();
var pos=wrap.position();
_593={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_58a.opacity){
_593.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_58a.speedOut,easing:_58a.easingOut,step:_5ac,complete:_5be});
}else{
wrap.fadeOut(_58a.transitionOut=="none"?0:_58a.speedOut,_5be);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_582.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_58a.padding*2)+_595});
_582.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_599(),_5bf=_58a.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_595)+(_594*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_594*2)))*0.5);
to.top=Math.max(view[3]+_5bf,to.top);
to.left=Math.max(view[2]+_5bf,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",innerColor:"inherited",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_5bc();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_5c0){
this._container=jQuery(_5c0);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_5c1){
};
HubPages.Lightbox.f$=function(_5c2){
return jQuery(_5c2,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_5c3){
return jQuery(_5c3,this._container);
};
HubPages.Lightbox.MyPhotos=function(_5c4){
this._container=jQuery(_5c4);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_5c5,_5c6,_5c7){
if(_5c5!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_5c6.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_5c6.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_5c6);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_5c7<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_5c5,_5c6,_5c7+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_5c8){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_5c8);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_5c9,_5ca,_5cb){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_5c9[_5ca]).attr("href");
var _5cc=href.lastIndexOf("/");
var _5cd=_5cc==-1?0:href.slice(_5cc+1,-4);
this._currentImageId=_5cd;
jQuery.post("/xml/photos/locations/",{id:_5cd},jQuery.proxy(function(_5ce){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_5cd,_5ce,0);
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
HubPages.Lightbox.Slideshow=function(_5cf){
this._id=_5cf.id;
this._title=_5cf.title;
this._url=_5cf.url;
this._type=_5cf.type;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_5cf.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_5d0){
var id=_5d0.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_5d0);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_5d0.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(_5d1,_5d2){
var self=this;
if(this._type=="Hub"){
self._start=0;
jQuery.ajax({async:false,data:{id:this._id},dataType:"json",error:function(jxhr,_5d3,_5d4){
alert("Something went wrong. Please, reload the page.");
},success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
}else{
if(_5d1===undefined){
self._start=0;
self._limit=10;
}else{
self._start=_5d1;
self._limit=_5d2;
}
jQuery.ajax({async:false,data:{userId:this._id,start:self._start,limit:self._limit},dataType:"json",error:function(jxhr,_5d5,_5d6){
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
jQuery("body").delegate("#fancybox-wrap","mouseenter",function(){
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
var _5d7=jQuery("<a />").attr("href","#related_slideshows_"+this._id);
_5d7.addClass("lightbox").attr("rel","slideshow_"+this._id);
_5d7.appendTo(this._container);
var _5d8=jQuery("<div />").attr("id","related_slideshows_"+this._id);
_5d8.addClass("related_slideshows");
if(data.related.length){
_5d8.append("<h2>View These Related Slideshows</h2>");
}else{
_5d8.append("<h2>This Hub has no related slideshows</h2>");
}
_5d8.appendTo(this._container);
var list=jQuery("<ul />");
_5d8.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_5d8);
}
var _5d9=jQuery("<li />");
_5d9.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _5da=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),type:"Hub",auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _5db=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_5db);
_5d9.append(linkDiv);
_5d9.append("<br />");
var _5dc=jQuery("<img />").attr("src",item.thumb);
_5dc.appendTo(_5da);
_5da.appendTo(_5d9);
_5da.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
}
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _5dd=jQuery("<div />").addClass("pinit_wrap");
_5dd.appendTo(this._socialBar);
var _5de=jQuery("<div />").addClass("twitter_wrap");
_5de.appendTo(this._socialBar);
var _5df=jQuery("<div />").addClass("fb_share_wrap");
_5df.appendTo(this._socialBar);
if(this._type=="Hub"){
_5de.html(data.social.twitter);
_5df.html(data.social.fb_share);
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
HubPages.Lightbox.Slideshow.loadImages=function(_5e0){
var _5e1=this._start;
jQuery.each(_5e0,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({id:"slideshow_img_"+item.id,href:"#"+this._id+"_"+_5e1,rel:"slideshow_"+this._id,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._id+"_"+_5e1}).addClass("content");
div.appendTo(this._container);
var _5e2=jQuery("<div />");
_5e2.appendTo(div);
var _5e3=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_5e3.data("source",item.source);
_5e3.appendTo(_5e2);
_5e1++;
},this));
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_5e4,_5e5,_5e6,_5e7,_5e8){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
if(_5e8===undefined){
_5e8="Normal";
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_5e4;
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("30%");
jQuery("body").delegate(_5e7,"click",function(e){
var _5e9=HubPages.Lightbox.Slideshow.defaultHubId,_5ea="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
jq("#fancybox-wrap").addClass("slide_image");
if(!HubPages.Lightbox.Slideshow._slides[_5e9]){
HubPages.Lightbox.Slideshow.create({id:_5e9,title:_5e5,url:_5e6,type:_5e8});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
if(_5e8=="Hub"){
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1"),link=jQuery(_5ea+":has(img[src*=\""+id+"\"])"),_5eb=jQuery(_5ea).index(link);
HubPages.Lightbox.Slideshow._slides[_5e9].init();
if(_5eb>=0){
jQuery(".slideshow:first > a").eq(_5eb).click();
}
}else{
jQuery(".slideshow:first > a").eq(0).click();
}
});
jQuery(window).resize(function(){
if(typeof (_5ec)!="undefined"){
clearTimeout(_5ec);
}
var _5ec=setTimeout(function(){
var _5ed=jQuery("#fancybox-inner > div:visible").attr("id");
if(_5ed){
jQuery(".slideshow a[href=#"+_5ed+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._id);
var _5ee=this._container.size()==0;
if(_5ee){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_5ef,_5f0){
if(!jQuery("#fancybox-outer-title").length){
var _5f1=jQuery("<div />").attr("id","fancybox-outer-title");
var _5f2=jQuery("#fancybox-inner");
_5f2.before(_5f1);
}
var _5f3=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_5f3);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_5f4,_5f5){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
var _5f6=jq(window).scrollTop();
jQuery.address.value("");
jQuery(window).scrollTop(_5f6);
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_5f7,_5f8){
jQuery("#"+this._slideShowId+"_"+_5f8+" img").css("visibility","hidden");
jQuery(".overlay_image").removeClass("overlay_image");
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_5f9,_5fa){
jQuery.fancybox.hideActivity();
var _5fb=_5fa+1;
if(this._type!="Hub"){
if(_5fb===1){
jQuery("#fancybox-left").hide();
}else{
if(_5fb>1){
jQuery("#fancybox-left").show();
}
}
if(_5fb==(_5f9.length-1)&&_5f9.length<this._photoData.total_images){
this.load(_5f9.length,10);
jQuery.fancybox.update("slideshow_"+this._id);
}
}
if(this._type=="Hub"){
if(_5fb>=_5f9.length){
return;
}
}
var _5fc=HubPages.Lightbox.f$("#fancybox-inner");
_5fc.height(_5fc.height()-70).css("overflow","visible");
var _5fd=_5fc.find("> .content img");
var _5fe=this._photoData.images[_5fa];
if(this._type!="Hub"){
jQuery("#fancybox-outer-title > a").replaceWith(_5fe.url_title);
}
jq.address.value("slide"+_5fe.id);
_5fd.css({width:"auto",height:"auto",maxWidth:(_5fc.innerWidth()-60)+"px",maxHeight:(_5fc.innerHeight()-100)+"px"});
if(_5fc.innerHeight()>0&&_5fd.height()>0){
var _5ff=(_5fc.innerHeight()-_5fd.height())/2;
_5fd.css("margin-top",_5ff+"px");
_5fd.css("visibility","visible").addClass("overlay_image");
}else{
_5fd.load(function(){
var _600=HubPages.Lightbox.f$("#fancybox-inner");
var _601=_600.find("> .content img");
var _602=(_600.innerHeight()-_601.height())/2;
_601.css("margin-top",_602+"px");
_601.css("visibility","visible").addClass("overlay_image");
});
}
var _603=jQuery(_5f9[_5fa]).attr("rel");
var _604=jQuery("#"+_603).find(".content img");
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_5fe.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _605="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_605+="&labels="+escape(this._photoData.quantcastLabel);
}
var _606=new Image();
_606.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_605;
}
if(this._photoData.ctracking){
var _607=new Image();
_607.src=this._photoData.ctracking+"&"+(new Date()).getTime();
}
var _608=HubPages.Lightbox.f$("#fancybox-title");
if(_5fe.sourceUrl||_5fe.sourceName){
if(_5fe.sourceUrl){
var _609="<a href=\""+_5fe.sourceUrl+"\" target=\"_blank\">"+(_5fe.sourceName?_5fe.sourceName:_5fe.sourceUrl)+"</a>";
}else{
var _609="<b>"+_5fe.sourceName+"</b>";
}
_608.html(_608.text()+"<br />Source: "+_609);
}
_608.find("div.slideshow-counter").remove();
_608.append(jQuery("<div />").html("Photo "+_5fb+" of "+this._photoData.total_images).addClass("slideshow-counter"));
if(this._lastIndex!=_5fa&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_5fe.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_5fe.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_5fe.social.pinit){
this._socialBar.find(".pinit_wrap").html(_5fe.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_5fa;
_5fd.parent("div").after(this._socialBar.show());
if(window.location.href.search("Tips-and-Tricks-iPhone")>0&&jQuery(".overlay_image").siblings("div").length==0){
jQuery.ajax({url:"http://s0.2mdn.net/instream/html5/ima.js",dataType:"script",cache:true,complete:function(){
google.ima.SdkLoader.setCallbacks(function(){
google.ima.afi.AfiAdsLoader.requestAds("http://googleads.g.doubleclick.net/pagead/ads?ad_type=text&client=ca-pub-6958755572607374&description_url="+location.href,"overlay_image");
},function(){
console.log("Error loading AFI");
});
google.ima.SdkLoader.load("3");
}});
}
};
(function(_60a,_60b){
var _60c=_60a.document;
(function(){
var _60d=false,_60e=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _60f=this.prototype;
_60d=true;
var _610=new this();
_60d=false;
for(var name in prop){
_610[name]=typeof prop[name]=="function"&&typeof _60f[name]=="function"&&_60e.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_60f[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _611(){
if(!_60d&&this.init){
this.init.apply(this,arguments);
}
};
_611.prototype=_610;
_611.constructor=_611;
_611.extend=arguments.callee;
return _611;
};
})();
var _612=JRClass.extend({init:function(_613,_614){
if(typeof _613=="string"){
this.video=_60c.getElementById(_613);
}else{
this.video=_613;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _612.options=="object"){
_V_.merge(this.options,_612.options);
}
if(typeof _614=="object"){
_V_.merge(this.options,_614);
}
if(this.getPreloadAttribute()!==_60b){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_60b){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_60b){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_615){
if(this[_615+"Supported"]()){
this[_615+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_616,_617){
this.behaviors[name]=_616;
this.extend(_617);
},activateElement:function(_618,_619){
if(typeof _618=="string"){
_618=_60c.getElementById(_618);
}
this.behaviors[_619].call(this,_618);
},errors:[],warnings:[],warning:function(_61a){
this.warnings.push(_61a);
this.log(_61a);
},history:[],log:function(_61b){
if(!_61b){
return;
}
if(typeof _61b=="string"){
_61b={type:_61b};
}
if(_61b.type){
this.history.push(_61b.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_61b.type);
}
catch(e){
try{
opera.postError(_61b.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_61c){
if(!localStorage){
return;
}
try{
localStorage[key]=_61c;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_612.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _61d=this.video.getAttribute("preload");
if(_61d===""||_61d==="true"){
return "auto";
}
if(_61d==="false"){
return "none";
}
return _61d;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _61e=this.video.getAttribute("autoplay");
if(_61e==="false"){
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
for(var _61f in obj){
if(obj.hasOwnProperty(_61f)){
this[_61f]=obj[_61f];
}
}
}});
_612.player=_612.prototype;
_612.player.extend({flashSupported:function(){
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
var _620=_612.flashPlayers[this.options.flashPlayer];
this.extend(_612.flashPlayers[this.options.flashPlayer].api);
(_620.init.context(this))();
},getFlashElement:function(){
var _621=this.video.children;
for(var i=0,j=_621.length;i<j;i++){
if(_621[i].className=="vjs-flash-fallback"){
return _621[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _622=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_612.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _612.getFlashVersion()>=_622;
}});
_612.flashPlayers={};
_612.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_623){
if(_623!==_60b){
this.element.width=_623;
this.box.style.width=_623+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_624){
if(_624!==_60b){
this.element.height=_624;
this.box.style.height=_624+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_612.player.extend({linksSupported:function(){
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
_612.merge=function(obj1,obj2,safe){
for(var _625 in obj2){
if(obj2.hasOwnProperty(_625)&&(!safe||!obj1.hasOwnProperty(_625))){
obj1[_625]=obj2[_625];
}
}
return obj1;
};
_612.extend=function(obj){
this.merge(this,obj,true);
};
_612.extend({setupAllWhenReady:function(_626){
_612.options=_626;
_612.DOMReady(_612.setup);
},DOMReady:function(fn){
_612.addToDOMReady(fn);
},setup:function(_627,_628){
var _629=false,_62a=[],_62b;
if(!_627||_627=="All"){
_627=_612.getVideoJSTags();
}else{
if(typeof _627!="object"||_627.nodeType==1){
_627=[_627];
_629=true;
}
}
for(var i=0;i<_627.length;i++){
if(typeof _627[i]=="string"){
_62b=_60c.getElementById(_627[i]);
}else{
_62b=_627[i];
}
_62a.push(new _612(_62b,_628));
}
return (_629)?_62a[0]:_62a;
},getVideoJSTags:function(){
var _62c=_60c.getElementsByTagName("video"),_62d=[],_62e;
for(var i=0,j=_62c.length;i<j;i++){
_62e=_62c[i];
if(_62e.className.indexOf("video-js")!=-1){
_62d.push(_62e);
}
}
return _62d;
},browserSupportsVideo:function(){
if(typeof _612.videoSupport!="undefined"){
return _612.videoSupport;
}
_612.videoSupport=!!_60c.createElement("video").canPlayType;
return _612.videoSupport;
},getFlashVersion:function(){
if(typeof _612.flashVersion!="undefined"){
return _612.flashVersion;
}
var _62f=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_62f=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _60a.ActiveXObject!="undefined"){
try{
var _630=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_630){
_62f=parseInt(_630.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_612.flashVersion=_62f;
return _612.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _612.isIPhone()||_612.isIPad();
},iOSVersion:function(){
var _631=navigator.userAgent.match(/OS (\d+)_/i);
if(_631&&_631[1]){
return _631[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _632=navigator.userAgent.match(/Android (\d+)\./i);
if(_632&&_632[1]){
return _632[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_612.isIE()){
_60c.createElement("video");
}
_60a.VideoJS=_60a._V_=_612;
_612.player.extend({html5Supported:function(){
if(_612.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_612.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_612.isAndroid()){
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
var _633=this.video.children;
for(var i=0,j=_633.length;i<j;i++){
if(_633[i].tagName.toUpperCase()=="SOURCE"){
var _634=this.video.canPlayType(_633[i].type)||this.canPlayExt(_633[i].src);
if(_634=="probably"||_634=="maybe"){
this.firstPlayableSource=_633[i];
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
var _635=src.match(/\.([^\.]+)$/);
if(_635&&_635[1]){
var ext=_635[1].toLowerCase();
if(_612.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_612.isIOS()){
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
},playerOnVideoProgress:function(_636){
this.setBufferedFromProgress(_636);
},setBufferedFromProgress:function(_637){
if(_637.total>0){
var _638=(_637.loaded/_637.total)*this.duration();
if(_638>this.values.bufferEnd){
this.values.bufferEnd=_638;
}
}
},iOSInterface:function(){
if(_612.iOSVersion()<4){
this.forceTheSource();
}
if(_612.isIPad()){
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
this.poster=_60c.createElement("img");
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
var _639=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_639.length;i<j;i++){
if(_639[i].getAttribute("kind")=="subtitles"&&_639[i].getAttribute("src")){
this.subtitlesSource=_639[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_63a){
var _63b=_63a.split("\n"),line="",_63c,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_63b.length;i++){
line=_V_.trim(_63b[i]);
if(line){
_63c={id:line,index:this.subtitles.length};
line=_V_.trim(_63b[++i]);
time=line.split(" --> ");
_63c.start=this.parseSubtitleTime(time[0]);
_63c.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_63b.length;j++){
line=_V_.trim(_63b[++i]);
if(!line){
break;
}
text.push(line);
}
_63c.text=text.join("<br/>");
this.subtitles.push(_63c);
}
}
},parseSubtitleTime:function(_63d){
var _63e=_63d.split(":"),time=0;
time+=parseFloat(_63e[0])*60*60;
time+=parseFloat(_63e[1])*60;
var _63f=_63e[2].split(/\.|,/);
time+=parseFloat(_63f[0]);
ms=parseFloat(_63f[1]);
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
},currentTime:function(_640){
if(_640!==_60b){
try{
this.video.currentTime=_640;
}
catch(e){
this.warning(_612.warnings.videoNotReady);
}
this.values.currentTime=_640;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_60b){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _641=this.video.buffered.end(0);
if(_641>this.values.bufferEnd){
this.values.bufferEnd=_641;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_642){
if(_642!==_60b){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_642)));
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
},width:function(_643){
if(_643!==_60b){
this.video.width=_643;
this.box.style.width=_643+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_644){
if(_644!==_60b){
this.video.height=_644;
this.box.style.height=_644+"px";
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
this.warning(_612.warnings.videoNotReady);
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
this.docOrigOverflow=_60c.documentElement.style.overflow;
_V_.addListener(_60c,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_60a,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_60c.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_60c.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_60a.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_60c.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_612.player.newBehavior("player",function(_645){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_646){
this.log(_646);
this.log(this.video.error);
},playerOnVideoPlay:function(_647){
this.hasPlayed=true;
},playerOnVideoPause:function(_648){
},playerOnVideoEnded:function(_649){
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
this.each(this.bufferedListeners,function(_64a){
(_64a.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_64b){
this.each(this.currentTimeListeners,function(_64c){
(_64c.context(this))(_64b||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_64d){
(_64d.context(this))();
});
}});
_612.player.newBehavior("mouseOverVideoReporter",function(_64e){
_V_.addListener(_64e,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_64e,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_64f){
var _650=_64f.relatedTarget;
while(_650&&_650!==this.box){
_650=_650.parentNode;
}
if(_650!==this.box){
this.hideControlBars();
}
}});
_612.player.newBehavior("box",function(_651){
this.positionBox();
_V_.addClass(_651,"vjs-paused");
this.activateElement(_651,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_612.player.newBehavior("poster",function(_652){
this.activateElement(_652,"mouseOverVideoReporter");
this.activateElement(_652,"playButton");
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
var _653=this.video.getElementsByTagName("img");
if(_653.length>0){
this.video.poster=_653[0].src;
}
}
}});
_612.player.newBehavior("controlBar",function(_654){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_654);
_V_.addListener(_654,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_654,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_655){
this.mouseIsOverControls=false;
}});
_612.player.newBehavior("playToggle",function(_656){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_656);
_V_.addListener(_656,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_657){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_658){
this.each(this.elements.playToggles,function(_659){
_V_.removeClass(_659,"vjs-paused");
_V_.addClass(_659,"vjs-playing");
});
},playTogglesOnPause:function(_65a){
this.each(this.elements.playToggles,function(_65b){
_V_.removeClass(_65b,"vjs-playing");
_V_.addClass(_65b,"vjs-paused");
});
}});
_612.player.newBehavior("playButton",function(_65c){
_V_.addListener(_65c,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_65d){
this.play();
}});
_612.player.newBehavior("pauseButton",function(_65e){
_V_.addListener(_65e,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_65f){
this.pause();
}});
_612.player.newBehavior("playProgressBar",function(_660){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_660);
},{updatePlayProgressBars:function(_661){
var _662=(_661!==_60b)?_661/this.duration():this.currentTime()/this.duration();
if(isNaN(_662)){
_662=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_662*100,2)+"%";
}
});
}});
_612.player.newBehavior("loadProgressBar",function(_663){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_663);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_612.player.newBehavior("currentTimeDisplay",function(_664){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_664);
},{updateCurrentTimeDisplays:function(_665){
if(!this.currentTimeDisplays){
return;
}
var time=(_665)?_665:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_612.player.newBehavior("durationDisplay",function(_666){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_666);
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
_612.player.newBehavior("currentTimeScrubber",function(_667){
_V_.addListener(_667,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_668,_669){
_668.preventDefault();
this.currentScrubber=_669;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_668);
_V_.addListener(_60c,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_60c,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_66a){
this.setCurrentTimeWithScrubber(_66a);
},onCurrentTimeScrubberMouseUp:function(_66b){
_V_.unblockTextSelection();
_60c.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_60c.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_66c){
var _66d=_V_.getRelativePosition(_66c.pageX,this.currentScrubber);
var _66e=_66d*this.duration();
this.triggerCurrentTimeListeners(0,_66e);
if(_66e==this.duration()){
_66e=_66e-0.1;
}
this.currentTime(_66e);
}});
_612.player.newBehavior("volumeDisplay",function(_66f){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_66f);
this.updateVolumeDisplay(_66f);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_670){
var _671=Math.ceil(this.volume()*6);
this.each(_670.children,function(_672,num){
if(num<_671){
_V_.addClass(_672,"vjs-volume-level-on");
}else{
_V_.removeClass(_672,"vjs-volume-level-on");
}
});
}});
_612.player.newBehavior("volumeScrubber",function(_673){
_V_.addListener(_673,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_674,_675){
_V_.blockTextSelection();
this.currentScrubber=_675;
this.setVolumeWithScrubber(_674);
_V_.addListener(_60c,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_60c,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_676){
this.setVolumeWithScrubber(_676);
},onVolumeScrubberMouseUp:function(_677){
this.setVolumeWithScrubber(_677);
_V_.unblockTextSelection();
_60c.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_60c.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_678){
var _679=_V_.getRelativePosition(_678.pageX,this.currentScrubber);
this.volume(_679);
}});
_612.player.newBehavior("fullscreenToggle",function(_67a){
_V_.addListener(_67a,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_67b){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_67c){
this.positionControlBars();
},fullscreenOnEscKey:function(_67d){
if(_67d.keyCode==27){
this.exitFullScreen();
}
}});
_612.player.newBehavior("bigPlayButton",function(_67e){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_67e);
this.activateElement(_67e,"playButton");
},{bigPlayButtonsOnPlay:function(_67f){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_680){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_681){
_681.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_682){
_682.style.display="none";
});
}});
_612.player.newBehavior("spinner",function(_683){
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
this.spinners.push(_683);
},{showSpinners:function(){
this.each(this.spinners,function(_684){
_684.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_685){
_685.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_686){
_686.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_686.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_687){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_688){
this.showSpinners();
},spinnersOnVideoSeeking:function(_689){
},spinnersOnVideoSeeked:function(_68a){
},spinnersOnVideoCanPlay:function(_68b){
},spinnersOnVideoCanPlayThrough:function(_68c){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_68d){
this.showSpinners();
},spinnersOnVideoStalled:function(_68e){
},spinnersOnVideoSuspend:function(_68f){
},spinnersOnVideoPlaying:function(_690){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_691){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_612.player.newBehavior("subtitlesDisplay",function(_692){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_692);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _693=false,_694=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_694)?1:0;
while(true){
if(_694){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_693=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_693=i;
break;
}
i++;
}
}
if(_693!==false){
this.currentSubtitle=this.subtitles[_693];
this.lastSubtitleIndex=_693;
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
_612.extend({addClass:function(_695,_696){
if((" "+_695.className+" ").indexOf(" "+_696+" ")==-1){
_695.className=_695.className===""?_696:_695.className+" "+_696;
}
},removeClass:function(_697,_698){
if(_697.className.indexOf(_698)==-1){
return;
}
var _699=_697.className.split(/\s+/);
_699.splice(_699.lastIndexOf(_698),1);
_697.className=_699.join(" ");
},createElement:function(_69a,_69b){
return this.merge(_60c.createElement(_69a),_69b);
},blockTextSelection:function(){
_60c.body.focus();
_60c.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_60c.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _69c=Math.round(secs);
var _69d=Math.floor(_69c/60);
_69d=(_69d>=10)?_69d:"0"+_69d;
_69c=Math.floor(_69c%60);
_69c=(_69c>=10)?_69c:"0"+_69c;
return _69d+":"+_69c;
},getRelativePosition:function(x,_69e){
return Math.max(0,Math.min(1,(x-this.findPosX(_69e))/_69e.offsetWidth));
},findPosX:function(obj){
var _69f=obj.offsetLeft;
while(obj=obj.offsetParent){
_69f+=obj.offsetLeft;
}
return _69f;
},getComputedStyleValue:function(_6a0,_6a1){
return _60a.getComputedStyle(_6a0,null).getPropertyValue(_6a1);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_6a2,type,_6a3){
if(_6a2.addEventListener){
_6a2.addEventListener(type,_6a3,false);
}else{
if(_6a2.attachEvent){
_6a2.attachEvent("on"+type,_6a3);
}
}
},removeListener:function(_6a4,type,_6a5){
if(_6a4.removeEventListener){
_6a4.removeEventListener(type,_6a5,false);
}else{
if(_6a4.attachEvent){
_6a4.detachEvent("on"+type,_6a5);
}
}
},get:function(url,_6a6){
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
var _6a7=new XMLHttpRequest();
_6a7.open("GET",url);
_6a7.onreadystatechange=function(){
if(_6a7.readyState==4&&_6a7.status==200){
_6a6(_6a7.responseText);
}
}.context(this);
_6a7.send();
},trim:function(_6a8){
return _6a8.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_60c.readyState==="complete"){
return _612.onDOMReady();
}
if(_60c.addEventListener){
_60c.addEventListener("DOMContentLoaded",_612.DOMContentLoaded,false);
_60a.addEventListener("load",_612.onDOMReady,false);
}else{
if(_60c.attachEvent){
_60c.attachEvent("onreadystatechange",_612.DOMContentLoaded);
_60a.attachEvent("onload",_612.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_60c.addEventListener){
_60c.removeEventListener("DOMContentLoaded",_612.DOMContentLoaded,false);
_612.onDOMReady();
}else{
if(_60c.attachEvent){
if(_60c.readyState==="complete"){
_60c.detachEvent("onreadystatechange",_612.DOMContentLoaded);
_612.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_612.DOMIsReady){
fn.call(_60c);
}else{
_612.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_612.DOMIsReady){
return;
}
if(!_60c.body){
return setTimeout(_612.onDOMReady,13);
}
_612.DOMIsReady=true;
if(_612.DOMReadyList){
for(var i=0;i<_612.DOMReadyList.length;i++){
_612.DOMReadyList[i].call(_60c);
}
_612.DOMReadyList=null;
}
}});
_612.bindDOMReady();
Function.prototype.context=function(obj){
var _6a9=this,temp=function(){
return _6a9.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _6aa=this,temp=function(){
var _6ab=this;
return _6aa.call(obj,arguments[0],_6ab);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_6ac){
if(this.hasContext===true){
return this;
}
if(!_6ac){
_6ac=obj;
}
for(var _6ad in _6ac){
if(_6ac[_6ad]==this){
_6ac[_6ad]=this.evtContext(obj);
_6ac[_6ad].hasContext=true;
return _6ac[_6ad];
}
}
return this.evtContext(obj);
};
if(_60a.jQuery){
(function($){
$.fn.VideoJS=function(_6ae){
this.each(function(){
_612.setup(this,_6ae);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_60a.VideoJS=_60a._V_=_612;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_6af){
var _6b0=((_6af/15)|0)*15;
if(this.lastLoggedOffset!=_6b0&&!this.paused()){
var _6b1=this.video.id.replace("hp_video_","");
var _6b2=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_6b0,videoId:_6b1,rf:rf,isEmbed:_6b2}});
this.lastLoggedOffset=_6b0;
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
var _6b3=this.video.getAttribute("autostart");
if(_6b3==="false"){
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
var _6b4=document.createElement("div");
_6b4.style.height=videoTopAdjustment+"px";
_6b4.style.background="transparent";
_6b4.id="video_spacer";
v.before(_6b4);
}
var _6b5=v.offset()["top"]+v.outerHeight();
var _6b6=_6b5-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_6b6>0){
var _6b7=document.createElement("div");
_6b7.style.height=_6b6+"px";
_6b7.style.background="transparent";
_6b7.id="sidebar_spacer";
_6b7.className="sidebar_box";
sidebox.after(_6b7);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_6b8,_6b9,_6ba,exts){
jQuery(document).ready(function(){
var _6bb=0;
var _6bc={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_6b8},size_limit:_6ba,queue_limit:_6b9,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_6bd){
if(file.size==_6bd){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_6be){
try{
var data=JSONstring.toObject(_6be);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_6be);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_6bb+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_6bf){
if(!_6bb&&_6bf){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_6bb=0;
},loaded_callback:function(_6c0){
if(_6c0){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _6c1=new imageUploader(_6bc);
});
};
function getHPVideoPlayer(){
var _6c2="talkiesplayer";
return $(_6c2);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _6c3=true;
if(data.percent){
var _6c4=data.percent;
jq("#progress_video_"+vId).width(_6c4+"%");
if(_6c4>90){
_6c3=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_6c3){
setTimeout(function(){
updateVideoProcessingBar(vId,mId);
},5000);
}
}});
};
var relatedHubStats={ifired:false,ifiredtarget:null,relatedhubstrackingenabled:false,relatedhubs:[],articleid:-1,recordRelatedHubClick:function(_6c5){
if(!this.relatedhubstrackingenabled){
return (true);
}
if(this.ifired){
window.location.href=jq(this.ifiredtarget).attr("href");
return (true);
}
var _6c6=_6c5.target;
if(jq(_6c6).attr("href")==undefined){
return (true);
}
var rel=jq(_6c6).attr("rel");
var pos1=rel.indexOf("_");
var pos2=rel.lastIndexOf("_");
var raid=rel.substring(pos2+1);
var rank=rel.substring(pos1+1,pos2);
var aid=this.articleid;
jq.get("/xml/stats/relatedhubevents.php?aid="+aid+"&type="+rank+"&raid="+raid,"",function(data){
jq(_6c6).trigger("click");
});
this.ifired=true;
this.ifiredtarget=_6c6;
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
},armRelatedHubEvents:function(_6c7,aid){
if(aid==2169847||Math.random()>_6c7){
this.relatedhubstrackingenabled=true;
this.articleid=aid;
}
}};
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
function _6c8(){
var _6c9="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _6ca="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _6cb="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6c9),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_6cb),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_6ca),"gm"),css:"keyword bold"}];
};
_6c8.prototype=new SyntaxHighlighter.Highlighter();
_6c8.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_6c8;
typeof (exports)!="undefined"?exports.Brush=_6c8:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6cc(){
var _6cd="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _6ce(_6cf,_6d0){
var css=(_6cf[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_6cf[0],_6cf.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_6ce},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6cd),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6cc.prototype=new SyntaxHighlighter.Highlighter();
_6cc.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_6cc;
typeof (exports)!="undefined"?exports.Brush=_6cc:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d1(){
function _6d2(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _6d3(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _6d4="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _6d5="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _6d6="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_6d2(_6d4),"gm"),css:"keyword"},{regex:new RegExp(_6d3(_6d5),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_6d6),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_6d1.prototype=new SyntaxHighlighter.Highlighter();
_6d1.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_6d1;
typeof (exports)!="undefined"?exports.Brush=_6d1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d7(){
var _6d8="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_6d8),"gmi"),css:"keyword"}];
};
_6d7.prototype=new SyntaxHighlighter.Highlighter();
_6d7.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_6d7;
typeof (exports)!="undefined"?exports.Brush=_6d7:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d9(){
function _6da(_6db,_6dc){
var _6dd=SyntaxHighlighter.Match,code=_6db[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_6de=[];
if(_6db.attributes!=null){
var _6df,_6e0=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_6df=_6e0.exec(code))!=null){
_6de.push(new _6dd(_6df.name,_6db.index+_6df.index,"color1"));
_6de.push(new _6dd(_6df.value,_6db.index+_6df.index+_6df[0].indexOf(_6df.value),"string"));
}
}
if(tag!=null){
_6de.push(new _6dd(tag.name,_6db.index+tag[0].indexOf(tag.name),"keyword"));
}
return _6de;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_6da}];
};
_6d9.prototype=new SyntaxHighlighter.Highlighter();
_6d9.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_6d9;
typeof (exports)!="undefined"?exports.Brush=_6d9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e1(){
var _6e2="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_6e2),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_6e1.prototype=new SyntaxHighlighter.Highlighter();
_6e1.aliases=["java"];
SyntaxHighlighter.brushes.Java=_6e1;
typeof (exports)!="undefined"?exports.Brush=_6e1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e3(){
var _6e4="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6e4),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_6e3.prototype=new SyntaxHighlighter.Highlighter();
_6e3.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_6e3;
typeof (exports)!="undefined"?exports.Brush=_6e3:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e5(){
var _6e6="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _6e7="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _6e8="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_6e6),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_6e8),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_6e7),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_6e5.prototype=new SyntaxHighlighter.Highlighter();
_6e5.aliases=["php"];
SyntaxHighlighter.brushes.Php=_6e5;
typeof (exports)!="undefined"?exports.Brush=_6e5:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e9(){
var _6ea="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _6eb="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _6ec="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_6eb),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_6ea),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_6ec),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6e9.prototype=new SyntaxHighlighter.Highlighter();
_6e9.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_6e9;
typeof (exports)!="undefined"?exports.Brush=_6e9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6ed(){
var _6ee="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _6ef="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_6ee),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_6ef),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6ed.prototype=new SyntaxHighlighter.Highlighter();
_6ed.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_6ed;
typeof (exports)!="undefined"?exports.Brush=_6ed:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f0(){
var _6f1="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _6f2="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _6f3="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_6f1),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_6f3),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_6f2),"gmi"),css:"keyword"}];
};
_6f0.prototype=new SyntaxHighlighter.Highlighter();
_6f0.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_6f0;
typeof (exports)!="undefined"?exports.Brush=_6f0:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f4(){
var _6f5="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6f5),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6f4.prototype=new SyntaxHighlighter.Highlighter();
_6f4.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_6f4;
typeof (exports)!="undefined"?exports.Brush=_6f4:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f6(){
function _6f7(_6f8,_6f9){
var _6fa=SyntaxHighlighter.Match,code=_6f8[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_6fb=[];
if(_6f8.attributes!=null){
var _6fc,_6fd=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_6fc=_6fd.exec(code))!=null){
_6fb.push(new _6fa(_6fc.name,_6f8.index+_6fc.index,"color1"));
_6fb.push(new _6fa(_6fc.value,_6f8.index+_6fc.index+_6fc[0].indexOf(_6fc.value),"string"));
}
}
if(tag!=null){
_6fb.push(new _6fa(tag.name,_6f8.index+tag[0].indexOf(tag.name),"keyword"));
}
return _6fb;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_6f7}];
};
_6f6.prototype=new SyntaxHighlighter.Highlighter();
_6f6.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_6f6;
typeof (exports)!="undefined"?exports.Brush=_6f6:null;
})();
function ClojureRegExp(_6fe){
_6fe=_6fe+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_6fe,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _6ff,_700;
while(_6ff=this.regex.exec(str)){
_700=str.substring(0,_6ff.index);
if(this.lookBehind.test(_700)){
return _6ff;
}else{
this.regex.lastIndex=_6ff.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _701=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_702="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_703){
_703=_703.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_703=_703.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_703+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_701)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_702)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _704(){
var _705="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _706="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_705),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_706),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_704.prototype=new SyntaxHighlighter.Highlighter();
_704.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_704;
typeof (exports)!="undefined"?exports.Brush=_704:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _707(){
var _708="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _709="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_708),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_709),"gm"),css:"functions"}];
};
_707.prototype=new SyntaxHighlighter.Highlighter();
_707.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_707;
typeof (exports)!="undefined"?exports.Brush=_707:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _70a(){
var _70b="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_70b),"gm"),css:"keyword"}];
};
_70a.prototype=new SyntaxHighlighter.Highlighter();
_70a.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_70a;
typeof (exports)!="undefined"?exports.Brush=_70a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _70c(){
var _70d="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _70e="void boolean byte char short int long float double";
var _70f="null";
var _710="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_70d),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_70e),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_70f),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_710),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_70c.prototype=new SyntaxHighlighter.Highlighter();
_70c.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_70c;
typeof (exports)!="undefined"?exports.Brush=_70c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _711(){
var _712="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _713="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_712),"gm"),css:"keyword"},{regex:new RegExp(_713,"gm"),css:"keyword"}];
};
_711.prototype=new SyntaxHighlighter.Highlighter();
_711.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_711;
typeof (exports)!="undefined"?exports.Brush=_711:null;
})();
(function($){
$.fn.starrating=function(_714){
var _714=$.extend({},$.fn.starrating.options,_714||{});
return this.each(function(){
var o=$.meta?$.extend({},_714,$this.data()):_714;
var url=this.action,_715,_716,_717;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _718=div.find("div.star");
var _719=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_718.mouseover(_71a).focus(_71a).mouseout(_71b).blur(_71b).click(_71c);
_719.mouseover(_71d).focus(_71d).mouseout(_71e).blur(_71e).click(_71c);
}else{
_71f(div);
}
_720();
function init(elem){
_715=$(elem).attr("title").split(/:\s*/)[1],_716=_715.split(".")[0],_717=_715.split(".")[1];
};
function _71a(){
_721();
fill(this);
};
function _71b(){
_721();
_720();
};
function _71e(){
_720();
$(this).removeClass("on");
};
function _71d(){
_721();
$(this).addClass("on");
};
function _71f(elem){
_718.unbind();
_719.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _722=$(this).attr("title");
var _723="Average Rating: "+_715;
$(this).attr("title",_722.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_723).replace("Cancel Rating",_723));
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
function _71c(){
if(_718.index(this)==-1&&!o.cancelSubmit){
return false;
}
_716=_718.index(this)+1;
_717=0;
if(_716==0){
_721();
}
var _724=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_724},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _725=$("div."+o.ratingClass);
init(_725);
_71b();
if(o.disableOnSubmit){
_71f(_725);
}
}});
}else{
o.success(_724);
}
return false;
};
function fill(elem){
_718.find("a").css("width","100%");
$(_718[_718.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _721(){
_718.removeClass("on hover");
};
function _720(){
$(_718[_716-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _726=_717?_717*10:0;
if(_726>0){
$(_718[_716]).addClass("on").children("a").css("width",_726+"%");
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
var ProfileManager=function(_727,_728,_729,_72a,_72b){
this.userId=_727;
this.userName=_728;
this.loggedInUserId=_729;
this.currentSection="mycontent";
this.defaultTab="hubs_items";
this.containerSectionDiv=jq("#profile_content_container");
this.profileContainer=_72a;
this.loadMoreBtn=this.profileContainer.find("#load_more_btn");
this.spinnerDiv=_72b;
this.allowedSections=["mycontent","activity","followers","following","fanmail","email","bio"];
this.moreRequest=this.profileContainer.data("moreRequest");
this.moreTopic=this.profileContainer.data("moreTopic");
this.moreArticle=this.profileContainer.data("moreArticle");
this.bindEvents();
HubPages.Lightbox.Slideshow.init(this.userId,"","","ul.profile_links > li.recent_images");
jq("#biography_prev").append(this.profileContainer.data("bio"));
jq("#biography").hide();
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
jq("#pagination").hide();
var _72c=window.location.href,hash=window.location.hash;
if(window.location.href.match(/filter=|page=/)){
if(hash){
parent.location.href=_72c.match(/^.*new/)[0]+hash;
}else{
parent.location.href=_72c.match(/^.*new/)[0];
}
}
if(hash){
this.loadSectionByHashTag(hash);
}else{
var _72d=this.activateAvailableTag(this.defaultTab);
("undefined"!=typeof content_items)?content_items.activate(_72d):false;
this.showLoadMoreButton();
}
jq("div.categoryTeaser").each(function(){
var _72e=jq(this).find("img"),_72f=_72e.height(),_730=_72e.width(),_731=300,_732=240,_733=_72f/_730,_734=_732/_731,_735=_731,_736=_732;
if(_733<_734){
_735=_730/_72f*_732;
}else{
if(_733>_734){
_736=_72f/_730*_731;
}
}
_72e.css({"position":"relative","height":_736+"px","width":_735+"px"});
var _737=((_72e.height()-_732)*0.4)*-1,_738=((_72e.width()-_731)/2)*-1;
_72e.css({"top":_737+"px","left":_738+"px"});
});
};
ProfileManager.prototype.activateAvailableTag=function(_739){
if(jq("#"+_739+"_item").length>0){
return _739;
}else{
var _73a=jq("#section_mycontent > div.content_items > ul.content_list:parent");
if(_73a.length>0){
return _73a.parent().attr("id").replace(/content_/,"");
}
}
};
ProfileManager.prototype.showLoadMoreButton=function(){
var _73b=this.containerSectionDiv.find("> div:visible");
switch(this.currentSection){
case "mycontent":
var _73c=jq(".content_nav ul#tabs li.active");
if(_73c.length>0){
var _73d=_73c.attr("id").replace(/_items_item/,"");
if(this.moreContent(_73d)){
if(!_73b.find("div.content_items:visible").first().data("no_content")){
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
if(!_73b.find("#following_people").data("no_content")||!_73b.find("#following_topics").data("no_content")){
_73b.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
break;
default:
if(this.currentSection!="activity"){
var _73e=this.getDivSection(this.currentSection);
if(!_73e.data("no_content")){
_73b.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}
}
};
ProfileManager.prototype.loadSectionByHashTag=function(_73f){
if(_73f){
var _740=_73f.replace("#",""),_741=this.defaultTab,_742="";
if(_740.match(/^slide/)){
jq("ul.profile_links > li.recent_images").trigger("click");
}else{
if(_740.match(/^mycontent_.*_hubs$/)||_740.match(/^mycontent_.*_forums$/)||_740.match(/^mycontent_.*_answers$/)){
var _743=_740.replace(/^mycontent_|_[a-z]+$/g,""),tab=_740.match(/[a-z]+$/),_744=jq("#"+tab+"_topic_menu li");
for(var i=0,l=_744.length;i<l;i++){
if(jq(_744[i]).attr("data-hash")==_743){
_741=tab+"_items";
_742=this.activateAvailableTag(_741);
("undefined"!=typeof content_items)?content_items.activate(_742):false;
jq(_744[i]).trigger("click");
break;
}
}
}else{
if(this.isValidSection(_740)){
jq("a[href=#"+this.currentSection+"]").parent().removeClass("active");
this.currentSection=_740;
if(this.currentSection=="email"){
this.currentSection="fanmail";
}
if(this.currentSection=="bio"){
if(jq("#read_bio").length>0){
jq("#read_bio").trigger("click");
}
}else{
this.loadSection(this.currentSection,function(){
if(_740=="email"){
if(this.profileContainer.data("send_email")=="1"){
this.openFancyBox("#email_to_user");
}
}
});
}
}
}
}
_742=this.activateAvailableTag(_741);
("undefined"!=typeof content_items)?content_items.activate(_742):false;
this.showLoadMoreButton();
}
};
ProfileManager.prototype.isValidSection=function(_745){
var _746=false;
for(i in this.allowedSections){
if(this.allowedSections[i]==_745){
_746=true;
break;
}
}
return _746;
};
ProfileManager.prototype.loadContentOnScroll=function(){
var _747=jq(window),_748=jq("#footer_wrap"),pos=_747.scrollTop(),_749=jq("#profile_header"),_74a=_749.offset().top,_74b=jq(window).scrollTop()>=(jq(document).height()-jq(window).height()-30),_74c=jq("#profile_content_container > div:visible"),_74d=(_74c.length>0)?_74c.attr("id").replace(/section_/,""):"",_74e=[],_74f=jq(".content_nav ul#tabs li.active"),_750="";
if(_74d=="mycontent"){
if(_74f.length==0){
return;
}
_750=_74f.attr("id").replace(/_items_item/,"");
}
if(_74d=="following"){
_74e.push(jq("#following_people"));
_74e.push(jq("#following_topics"));
}else{
if(this.getDivSection(_74d)){
_74e.push(this.getDivSection(_74d));
}
}
_74e.each(jq.proxy(function(_751){
if(!this.moreContent(_750)){
return;
}
if(!_751.data("no_content")){
if(_751.data("loading")){
return;
}
if((_747.scrollTop()+_747.height())>=(jq(document).height()-1)){
setTimeout(jQuery.proxy(function(){
this.loadContent(_751,_74d,_750);
},this),300);
}
}
},this));
};
ProfileManager.prototype.moreContent=function(_752){
if((_752=="answers"&&this.moreRequest==="1")||(_752=="hubs"&&this.moreArticle==="1")||(_752=="topic"&&this.moreTopic==="1")){
return true;
}else{
if((_752=="answers"&&this.moreRequest==="0")||(_752=="hubs"&&this.moreArticle==="0")||(_752=="topic"&&this.moreTopic==="0")){
return false;
}
}
};
ProfileManager.prototype.loadContent=function(_753,_754,_755){
var _756=jq(".newprofile #show_only").data("categoryId")||"all";
var page=_753.data("next")||2;
this.loadMoreBtn.hide();
if(jq("#spinner_loading").length>0){
_757=jq("#spinner_loading");
}else{
var _758=jq("#footer_wrap").height();
var _757=jq("<div/>",{"id":"spinner_loading",}).html(jq(this.spinnerDiv));
}
_757.show();
_753.parent().append(_757);
_753.parent().find("#spinner_loading > img.spinner").show();
if(_754=="following"){
_754=_753.attr("id");
}
_753.data("loading",true);
jq.get(this.profileContainer.data("loadMoreUrl"),{section:_754,userId:this.userId,activeTab:_755,categoryId:_756,page:page,ajax:1},jq.proxy(function(data,_759,xhr){
_757.hide();
if(_754=="fanmail"){
var _75a=jq(data.render);
jq.each(_75a,function(){
if(jq("#"+jq(this).attr("id")).length===0){
_753.append(this);
}
});
}else{
jq.each(data.render,function(id,val){
if(_753.find("#"+id).length===0){
if(_754=="mycontent"){
_753.find("ul").append(val);
}else{
_753.append(val);
}
}
});
}
if(data.more){
jq(document).data("no_content_all",false);
_753.data("next",page+1);
this.loadMoreBtn.show();
}else{
jq(document).data("no_content_all",true);
_753.data("no_content",true);
}
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
_753.data("loading",false);
},this),"json");
};
ProfileManager.prototype.dismissSimilarUser=function(self){
var _75b=jq(this).parent(),_75c=_75b.attr("id").replace(/similar_user_/,""),_75d=jq("div.similar_users_box"),_75e=_75d.find(".last_similar_user");
if(_75e.length===0){
firstUserId=_75d.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
}else{
firstUserId=_75e.attr("id").replace(/similar_user_/,"");
}
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:self.userId,userId:_75c,firstUserId:firstUserId,action:"dismiss"},success:jq.proxy(function(data){
_75b.fadeOut("slow",function(){
if(_75b.parent().find(".similar_user:visible").length==0){
_75b.parent().parent().fadeOut("slow",function(){
jq(this).remove();
});
}
if(data.render!=""){
_75d.find(".last_similar_user").each(function(){
jq(this).removeClass("last_similar_user");
});
_75b.replaceWith(data.render);
jq("#"+jq(data.render).attr("id")).addClass("last_similar_user");
_75d.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_75d.find(".similar_user").length<3){
self.loadSingleSimilarUser();
}
}
jq(this).remove();
});
},this)});
};
ProfileManager.prototype.loadSingleSimilarUser=function(){
var _75f=jq("div.similar_users_box"),_760=_75f.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:this.userId,firstUserId:_760},success:jq.proxy(function(data){
if(data.render!=""){
_75f.find("div.content_box_i").append(data.render);
_75f.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}
if(_75f.find(".similar_user").length<3){
this.loadSingleSimilarUser();
}
},this)});
};
ProfileManager.prototype.loadSimilarUsers=function(num){
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{userId:this.userId,num:num,action:"load"},success:jq.proxy(function(data){
var _761=jq("div.similar_users_box"),_762=_761.find(".similar_user").length;
if(data.render!=""){
_761.find("div.content_box_i").append(data.render);
_761.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_761.find(".similar_user").length<3&&data.more){
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
var _763=new RegExp(window.location.hash.replace(/slide|#/g,""),"i");
jq.each(jq(".slideshow img"),function(){
if(_763.test(jq(this).attr("src"))){
var href=jq(this).parents(".content").attr("id");
jq("a[href=#"+href+"]").trigger("click");
}
});
});
self.loadMoreBtn.live("click",function(){
var _764=jq("#profile_content_container > div:visible"),_765=(_764.length>0)?_764.attr("id").replace(/section_/,""):"",_766=[],_767=jq(".content_nav ul#tabs li.active"),_768="";
if(_765=="mycontent"){
if(_767.length==0){
return;
}
_768=_767.attr("id").replace(/_items_item/,"");
_766.push(_764.find("div.content_items:visible").first());
}else{
if(_765=="followers"){
_766.push(_764.find("div").first());
}else{
if(_765=="following"){
_766.push(jq("#following_people"));
_766.push(jq("#following_topics"));
}else{
if(_765=="fanmail"){
_766.push(_764.find("#fanmail_content"));
}
}
}
}
_766.each(function(_769){
if(!_769.data("no_content")){
if(_769.data("loading")){
return;
}
self.loadContent(_769,_765,_768);
}else{
self.loadMoreBtn.hide();
}
});
});
jq("#read_bio").live("click",function(e){
var _76a=jq(this).closest("div");
e.preventDefault();
_76a.html(jq("img.spinner").first());
_76a.hide();
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
var _76b=jq(this).find("a").text();
jq.each(jq(this).parent().find("li"),function(){
jq(this).removeClass("active");
});
self.loadSection(_76b);
});
var _76c=jq(".newprofile div.content_nav ul.filter_by_topic"),_76d=jq(".newprofile #show_only"),_76e="#section_mycontent .content_items:visible",_76f=jq("ul.filter_by_topic li"),_770=false;
_76d.click(function(){
if(!_770){
var _771=jq(".content_nav #tabs .active").attr("id").replace(/_items_item/,"");
ulFilters=jq("#"+_771+"_topic_menu");
ulFilters.attr("tabindex",-1);
setTimeout(function(){
ulFilters.focus();
},0);
if(ulFilters.is(":visible")){
ulFilters.hide();
_76d.find("span").removeClass("active");
}else{
ulFilters.show();
_76d.find("span").addClass("active");
}
var _772=ulFilters.offset().left,_773=_76d.offset().left,_774=(_772-_773)+11;
ulFilters.css("right",parseFloat(ulFilters.css("right"))+_774+"px");
_770=false;
}
});
_76c.bind("blur",function(e){
_770=true;
jq(this).hide();
_76d.find("span").removeClass("active");
setTimeout(function(){
_770=false;
},500);
});
_76f.click(function(){
var _775=jq(this).attr("data-id"),_776=jq(".content_nav ul#tabs li.active");
if(_776.length>0){
var _777=jq(".content_nav ul#tabs li.active").attr("id").replace(/_items_item/,""),_778=jq(this).text();
_776.data("categoryId",_775);
jq(_76e).find("ul").html(jq(self.spinnerDiv));
jq(_76e).data("loading",true);
loadCategoryContent("mycontent",_775,_777,function(res){
var _779=jq(_76e).find("ul");
_779.find("img.spinner").hide();
jq.each(res.render,function(id,val){
if(_779.find("#"+id).length===0){
_779.append(val);
}
});
jq(_76e).removeData("next");
if(res.more){
jq(_76e).data("no_content",false);
jq(document).data("no_content_all",false);
}else{
jq(document).data("no_content_all",true);
jq(_76e).data("no_content",true);
}
_76d.data("categoryId",_775);
_76d.data(getUrlHashTagVersion(_778),_775);
_76d.html("<span></span><strong>Show</strong>: "+_778);
jq(_76e).data("loading",false);
loadHashTag(_777);
self.showLoadMoreButton();
});
_76d.attr("tabindex",-1);
_76d.focus();
_76c.hide();
_76d.find("span").removeClass("active");
}
});
};
ProfileManager.prototype.openFancyBox=function(_77a,_77b){
var el=jq(_77a);
jq.fancybox({"href":_77a,onStart:function(){
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
ProfileManager.prototype.getDivSection=function(_77c){
var _77d,_77e=jq("#section_"+_77c);
if(_77c=="mycontent"){
_77d=_77e.find("div.content_items:visible").first();
}else{
if(_77c=="followers"){
_77d=_77e.find("div").first();
}else{
if(_77c=="fanmail"){
_77d=_77e.find("#fanmail_content");
}
}
}
return _77d;
};
ProfileManager.prototype.loadSection=function(_77f,_780){
this.currentSection=_77f.replace(/\s/,"").toLowerCase();
if(this.currentSection=="hubpagesactivity"){
this.currentSection="activity";
}
var _781="section_"+this.currentSection,isCr=typeof cr,_782=jq("#profile_content_container"),_783=_782.offset().top,_784=jq(this.spinnerDiv);
var _785=jq("a[href=#"+this.currentSection+"]");
if(_785.length>0){
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
}
if(_781!="section_mycontent"&&jq("#teaser").length>0&&isCr!="undefined"){
cr.pause();
}
jq("div[id^=section_]").hide();
if(jq("#"+_781).length>0){
jq("#"+_781).show();
this.showLoadMoreButton();
}else{
var _786=_782.find("img.spinner");
if(_786.length==0){
_782.append(_784);
}
_786.show();
jq.post("/xml/profile/profile_section.php",{section:this.currentSection,userId:this.userId},jq.proxy(function(res){
var data=jQuery.parseJSON(res),_787;
_782.find(".spinner").hide();
if(data.render){
_788.call(this,data);
}else{
jq.each(data,jQuery.proxy(function(i,el){
_788.call(this,el);
},this));
}
function _788(el){
if(jq("#"+_781).length===0){
_787=jq("<div/>",{id:_781,"class":"psection"});
}else{
_787=jq("#"+_781);
}
_787.append(el.render).appendTo("#profile_content_container");
if(!el.more&&this.currentSection!="activity"){
if(this.currentSection==="following"){
_787.find("#"+el.section).data("no_content",true);
}else{
this.getDivSection(this.currentSection).data("no_content",true);
}
}
};
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_781=="section_fanmail"){
var _789=jq("#email_to_user");
if(_789.length>0){
jq(".lightbox").fancybox({onStart:function(){
window.location.hash="#email";
_789.show();
},onClosed:function(){
_789.hide();
_789.find("#success_message_email").hide();
_789.find("#email").show();
_789.find("h3").show();
},onComplete:function(e){
_789.css("overflow-x","hidden");
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
var _78a=jq("#success_message_email");
_78a.html(messaging);
_78a.siblings("#email").fadeOut("slow",function(){
jq("#email_to_user h3").hide();
_78a.show();
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
var _78b=$("fanmailadd");
Element.update(_78b,req.responseText);
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
(_780!=undefined)?_780.call(this):false;
},this));
}
};

