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
function hubFeedback(id,val){
jq.post("/xml/feedback.php",{a:id,v:val});
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
jQuery("#comment_tgt").load("/xml/comments.php",{"mdc_id":id,"modMode":mm,"design":_21e});
}else{
jQuery("#comment_tgt").html="";
}
return false;
};
function expandRequests(id,_21f){
var _220=$H({article_id:id,num_pages:_21f}).toQueryString();
var ajax=new Ajax.Updater({success:"request_list_tgt"},"/xml/questions.php",{parameters:_220,onFailure:reportError});
return false;
};
function activity_why(id,_221,_222,_223){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_221,actionTargetId:_222,createDate:_223}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function article_flag(id,flag){
var ajax=new Ajax.Updater({success:"flaglink_"+id+"_"+flag},"/xml/flaghub.php",{parameters:$H({aID:id,reason:flag}).toQueryString(),onFailure:reportError});
};
function ellipse(str,_224){
if(str.length>_224&&_224!=0){
str=str.substr(0,_224-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_224-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function loadRandomArt(_225,_226){
var ajax=new Ajax.Request("/xml/random.php",{method:"post",parameters:"score="+_226,onFailure:reportError,onComplete:function(req){
_225.location.href=req.responseText;
}});
};
function deleteComment(_227,_228){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_228).serialize(),success:function(resp){
toggleCommentEdit(_227,false);
jq("#ctext_"+_227).html(resp);
jq("#cedit_"+_227).remove();
}});
return false;
};
function toggleCommentEdit(_229,_22a){
if(_22a){
$("cedit_"+_229).style.display="none";
$("cbox_"+_229).style.display="";
$("ctext_"+_229).style.display="none";
}else{
if($("cedit_"+_229)){
$("cedit_"+_229).style.display="";
}
$("cbox_"+_229).style.display="none";
$("ctext_"+_229).style.display="";
}
};
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
var _22b=req.getAllResponseHeaders();
var ajax=new Ajax.Request("/xml/reporterror.php",{parameters:_22b+"&error=1"});
};
function addTagEntries(){
var _22c=4;
var _22d=document.createElement("div");
_22d.id="moreEntryDiv";
var li=null;
var _22e=4+1;
var _22f=_22e+_22c;
for(var i=_22e;i<_22f;i++){
li=document.createElement("li");
_22d.appendChild(li);
var _230=document.createElement("input");
_230.className="tagEntry";
_230.name="tag_"+i;
_230.type="text";
_230.size=40;
li.appendChild(_230);
}
$("tagEntries").appendChild(_22d);
return true;
};
function hubtool_add_tag(_231){
var _232=(_231)?$(_231):$("add_tag_input");
if(!_232){
return;
}
var tag;
if(Field.present(_232)&&_232.type){
tag=$F(_232);
Field.clear(_232);
}else{
if(_232.innerHTML){
tag=_232.innerHTML;
Element.remove(Element.findElement(_232,"li"));
}
}
if(!tag){
return;
}
var _233=0;
var _234=/^tag_(\d+)$/i;
var _235=$$(".tagEntry");
_235.each(function(ele){
if(ele.id){
var ms=_234.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_233){
_233=id;
}
}
}
});
_233++;
var _236="tag_"+_233;
var _237=$("add_tag_input").parentNode;
var _238="<input class=\"tagEntry\" id=\""+_236+"\" name=\""+_236+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_236)){
var _239=$(_236).tabIndex;
Element.update($(_236).parentNode,_238);
$(_236).tabIndex=_239;
}else{
var _23a=$("tag_1").tabIndex-1;
var _239=_23a+_233;
var pole=new Insertion.Before(_237,"<li>"+_238+"</li>");
$(_236).tabIndex=_239;
_239=$("add_tag_input").tabIndex;
_239++;
$("add_tag_input").tabIndex=_239;
}
return false;
};
function add_calculated_tag(_23b,tag,_23c){
var _23d=tag.replace(/'/g,"\\'");
var _23e=tag.replace(/ /g,"+");
var _23f="tagd_"+tag.replace(/ /g,"_");
_23f=_23f.toLowerCase();
if($(_23f)){
$(_23f).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _240=$("nav_tags_edit");
var _241="<a href=\"javascript:void delete_tag('"+_23b+"','"+_23d+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_241+="<a id=\""+_23f+"\" href=\"/tag/"+_23e+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_241;
_240.appendChild(item);
save_tag(_23b,tag,false);
}
}
var _242=$(_23c);
Element.remove(Element.findElement(_242,"li"));
return false;
};
function add_tag(_243){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _244=tag.replace(/'/g,"\\'");
var _245=tag.replace(/ /g,"+");
var _246="tagd_"+tag.replace(/ /g,"_");
_246=_246.toLowerCase();
if($(_246)){
$(_246).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _247=$("nav_tags_edit");
var _248="<a href=\"javascript:void delete_tag('"+_243+"','"+_244+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_248+="<a id=\""+_246+"\" href=\"/tag/"+_245+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_248;
_247.appendChild(item);
save_tag(_243,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_249,tag){
if(!_249||!tag){
return;
}
var _24a="tagd_"+tag.replace(/ /g,"_");
var _24b=$(_24a);
if(!_24b){
return;
}
var li=_24b.parentNode;
Element.remove(li);
save_tag(_249,tag,true);
return false;
};
function save_tag(_24c,tag,del){
var _24d=(del)?1:0;
var req={a:_24c,v:tag,d:_24d};
var _24e=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_24e,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function handleReturnKeyPress(_24f,func){
_24f=_24f||window.event;
if(_24f.keyCode==Event.KEY_RETURN){
Event.stop(_24f);
func();
return false;
}else{
return true;
}
};
function fireOnReturn(_250,func){
Event.observe(_250,"keyup",function(_251){
_251=_251||window.event;
if(_251.which){
if(_251.which==Event.KEY_RETURN){
_251.preventDefault();
func();
}
}else{
if(_251.keyCode){
if(_251.keyCode==Event.KEY_RETURN){
Event.stop(_251);
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
InlineEdit.register=function(ele,_252){
var obj=$(ele);
obj.title="Click to edit";
obj.style.backgroundColor="#ffe";
obj.empty_text="";
InlineEdit._registered[obj.id]=_252;
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
InlineEdit.registerCallbacks=function(ele,_253,_254){
var obj=$(ele);
InlineEdit._onedit[obj.id]=_253;
InlineEdit._ondone[obj.id]=_254;
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
var _255=InlineEdit._onedit[ele.id];
_255(ele);
}
var text=ele.innerHTML;
if(ele.empty_text&&ele.empty_text==text){
text=" ";
}
var _256=document.createElement("INPUT");
_256.type="text";
Element.cloneStyles(ele,_256);
ele.parentNode.insertBefore(_256,ele);
InlineEdit._insertEditSpanBefore(ele);
_256.id=ele.id+"_edit_inplace";
InlineEdit._editting[_256.id]=ele;
Element.remove(ele);
_256.value=text;
_256.focus();
_256.select();
return false;
};
InlineEdit._onButtonClick=function(_257){
_257=_257||window.event;
var _258=_257.target||_257.srcElement;
var _259=(_258.innerHTML.search(/CANCEL/)==-1)?true:false;
var _25a=_258.parentNode;
var _25b=_25a;
while(_25b&&!InlineEdit._editting[_25b.id]){
_25b=_25b.previousSibling;
}
var _25c=InlineEdit._editting[_25b.id];
_25b.hasFocus=false;
var z=_25b.parentNode;
z.insertBefore(_25c,_25b);
z.removeChild(_25b);
z.removeChild(document.getElementsByClassName("buttonSpan",z)[0]);
delete InlineEdit._editting[_25b.id];
if(InlineEdit._ondone[_25c.id]){
var _25d=InlineEdit._ondone[_25c.id];
_25d(_25c);
}
if(_259){
_25c.innerHTML=(_25b.value.length>0)?_25b.value:"&nbsp;";
var _25e=InlineEdit._registered[_25c.id];
_25e(_25b.value);
}
};
InlineEdit._insertEditSpanBefore=function(obj){
if(document.getElementById&&document.createElement){
var _25f=document.createElement("span");
_25f.className="buttonSpan";
var butt=document.createElement("button");
var _260=document.createTextNode("OK");
butt.appendChild(_260);
_25f.appendChild(butt);
var _261=document.createElement("button");
var _262=document.createTextNode("CANCEL");
_261.appendChild(_262);
_25f.appendChild(_261);
obj.parentNode.insertBefore(_25f,obj);
butt.onclick=InlineEdit._onButtonClick;
_261.onclick=InlineEdit._onButtonClick;
}
};
var SampleDuration=Class.create();
SampleDuration.prototype={initialize:function(_263){
this.art_id=_263;
this.t=new Timer();
this.onleaveListener=this.onleave.bindAsEventListener(this);
Event.observe(window,"beforeunload",this.onleaveListener,false);
},onleave:function(e){
e=e||window.event;
this.t.stop();
var _264=$H({art_id:this.art_id,dur:this.t.length});
var ajax=new Ajax.Request("/xml/duration",{parameters:_264.toQueryString()});
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
var _265=insideHubEditor?200:0;
div.style.top=(Position.getViewportScrollY()+_265)+"px";
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
var _266=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(_266){
this.shouldShowIcon=false;
_266.style.display="none";
Event.stopObserving(window,"scroll",this.scrollListener,false);
this.scrollListener=null;
this.iconVisible=false;
}
}
},showIcon:function(id){
if(this.shouldShowIcon&&!this.iconVisible&&Ajax.activeRequestCount>0){
this.iconVisible=true;
var _267=insideHubEditor?$("ajaxing_big"):$("ajaxing");
_267.style.display="inline";
this.onScroll();
this.scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.scrollListener,false);
}
}};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_268){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_268*100)+")";
}
ele.style.opacity=_268;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _269;
if(document.defaultView){
_269=document.defaultView.getComputedStyle(ele,"");
}else{
_269=ele.currentStyle;
}
return _269;
};
Element.cloneStyles=function(ele,_26a,_26b){
ele=$(ele);
_26a=$(_26a);
var _26c=Element.getCurrentStyle(ele);
for(var name in _26c){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _26d=_26c[name];
if(_26d!==""&&!(_26d instanceof Object)&&name!="length"&&name!="parentRule"){
if(_26b&&name.indexOf(_26b)!==0){
continue;
}
_26a.style[name]=_26d;
}
}
return _26a;
};
Element.findElement=function(_26e,_26f){
_26e=$(_26e);
while(_26e.parentNode&&(!_26e.tagName||(_26e.tagName.toUpperCase()!=_26f.toUpperCase()))){
_26e=_26e.parentNode;
}
return _26e;
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
String.prototype.startsWith=function(_270){
var res=this;
return res.substring(0,_270.length)==_270;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _271=p.innerHTML;
if(_271.length>len){
_271=_271.substring(0,len);
_271=_271.replace(/\w+$/,"");
_271+="...";
p.innerHTML=_271;
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
var _272=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_272=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_272=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_272=window.pageXOffset;
}else{
if(window.scrollX){
_272=window.scrollX;
}
}
}
}
return _272;
};
Position.getViewportScrollY=function(){
var _273=0;
if(document.documentElement&&document.documentElement.scrollTop){
_273=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_273=document.body.scrollTop;
}else{
if(window.pageYOffset){
_273=window.pageYOffset;
}else{
if(window.scrollY){
_273=window.scrollY;
}
}
}
}
return _273;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _274=jq(window).scrollTop();
var _275=_274+jq(window).height();
if(eleBot<_274){
return -1;
}
if(off.top>_275){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _276=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _277=[_276[0]+Position.getViewportWidth(),_276[1]+Position.getViewportHeight()];
return (_276[0]<off[0]&&off[0]<_277[0]&&_276[1]<off[1]&&off[1]<_277[1]);
};
Position.set=function(ele,_278){
if(ele&&_278){
ele.style.left=_278[0]+"px";
ele.style.top=_278[1]+"px";
}
};
function check_signed_in_ajax(_279,_27a){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_27b,_27c){
_279(eval(_27b.responseText),_27a);
}});
};
function phone_verify_required(_27d,_27e,_27f,_280){
if(typeof (_280)=="undefined"){
data={};
}else{
data={a:_280};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_27d);
}else{
_27e.apply(null,_27f);
}
},"json");
};
function require_phone_verification(_281,_282){
url="/xml/verify/phone.php";
if(typeof (_282)!="undefined"&&_282){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_281},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_283,end){
for(var i=_283;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_283)+1;
}
update_plural(name);
};
function unselect_all(name,_284,end){
for(var i=_284;i<=end;i++){
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
function import_now(_285,name,_286,end){
var _287=self.opener.document.getElementById(_285);
if(_287){
for(var i=_286;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _288=$(name+"_email_"+i);
if(_287.value.length<2||_287.value.charAt(_287.value.length)==","||_287.value.charAt(_287.value.length-1)==","){
_287.value=_287.value+_288.innerHTML;
}else{
_287.value=_287.value+", "+_288.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_289,_28a,max){
var _28b=document.getElementById(_289);
var _28c=document.getElementById(_28a);
if(!_28b){
alert("charCounter bad source: "+_289);
}
if(!_28c){
alert("charCounter bad source: "+_28a);
}
if(_28b.value.length>max){
_28b.value=_28b.value.substring(0,max);
}
_28c.value=max-_28b.value.length;
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
function fetchAnswers(_28d,_28e,_28f){
var _290=$H({answerIds:_28d,enableVoting:_28e,enableEditing:_28f}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_290,onComplete:function(_291){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_292,v){
if(_292===undefined){
_292=true;
}
jq.ajax({url:"/xml/answervote.php",type:"POST",data:{id:id,vote:v,timeIndicator:_292},dataType:"html",success:function(html){
jq(".voting_"+id).html(html);
}});
return false;
};
function answerVoteDown(id,_293){
return answerVote(id,_293,-1);
};
function answerVoteUp(id,_294){
return answerVote(id,_294,1);
};
function fetchRecaptcha(_295){
var _296="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _297=document.getElementsByTagName("head")[0];
var _298=document.createElement("script");
_298.type="text/javascript";
_298.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_298.onload=function(){
Recaptcha.create(_296,_295,{theme:"red"});
};
_298.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_296,_295,{theme:"red"});
}
};
_297.appendChild(_298);
}else{
Recaptcha.create(_296,_295,{theme:"red"});
}
};
function whenSignedIn(_299,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_299,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_29a,info){
if(_29a){
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
var _29b=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _29b;
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
StringBuffer.prototype.append=function(_29c){
this.buffer.push(_29c);
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
var _29d=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_29d=="touchstart"){
jq("#header_explore").bind(_29d+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_29d+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_29d+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_29d+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_29d+".nav",function(_29e){
_29e.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_29f){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_2a0){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_2a1){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_2a2){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_2a3){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_2a4){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_2a5){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_2a6){
nav_hide_all_menus();
});
jq("html").bind("click",function(_2a7){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_2a8){
_2a8.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function initTurboHub(_2a9){
initTurboHubShare(_2a9);
};
function initTurboHubShare(_2aa){
var _2ab=jq("#turbotitle").offset().top;
var _2ac=Math.max(80,_2ab-jq(window).scrollTop());
jq("#share_hub").data("rolledup",true).css({top:_2ac+"px",visibility:"visible"});
var _2ad=8;
var _2ae=jq("#share_hub_box").outerWidth();
jq("#share_hub_tab a").click(function(){
var _2af=jq("#share_hub");
if(!_2af.data("buttons_loaded")){
_2af.data("buttons_loaded",true);
displaySocialButtons({"pagepath":_2aa,"nogplus":true});
}
unrollTurboShare(true,_2ab,_2ae,_2ad);
return false;
});
jq(window).scroll(function(){
turboShareOnChange(_2ab,_2ae,_2ad,_2aa);
}).resize(function(){
turboShareOnChange(_2ab,_2ae,_2ad,_2aa);
});
};
function rollUpTurboShare(_2b0){
var _2b1=jq("#share_hub");
if(_2b1.is(":animated")){
return;
}
var _2b2=jq("#share_hub_box").outerWidth();
if(_2b0){
jq("#share_hub_tab").fadeIn();
_2b1.animate({left:"-"+_2b2+"px"},1000,function(){
_2b1.data("rolledup",true);
});
}else{
_2b1.css({left:"-"+_2b2+"px"});
jq("#share_hub_tab").show();
_2b1.data("rolledup",true);
}
};
function unrollTurboShare(_2b3,_2b4,_2b5,_2b6,_2b7){
var _2b8=jq("#share_hub");
if(_2b8.is(":animated")){
return;
}
if(!_2b8.data("buttons_loaded")){
_2b8.data("buttons_loaded",true);
displaySocialButtons({"pagepath":_2b7,"nogplus":true});
}
var _2b9=jq("#content").offset();
var _2ba=_2b9.left;
var _2bb=Math.max(0,_2ba-_2b5-_2b6);
if(_2b3){
_2b8.animate({left:_2bb+"px"},1200,function(){
horizAnimateTurboShareRecursive(_2b4,_2b5,_2b6,0);
});
}else{
_2b8.css({left:_2bb+"px"});
jq("#share_hub_tab").hide();
_2b8.data("rolledup",false);
}
};
function horizAnimateTurboShareRecursive(_2bc,_2bd,_2be,_2bf){
var _2c0=jq("#share_hub");
var _2c1=jq("#content").offset();
var _2c2=_2c0.css("left").slice(0,-2);
var _2c3=Math.max(0,_2c1.left-_2bd-_2be);
if(Math.abs(_2c2-_2c3)>=1&&_2c3>=_2bd){
_2c0.animate({left:_2c3+"px"},200,function(){
if(_2bf<100){
horizAnimateTurboShareRecursive(_2bc,_2bd,_2be,_2bf++);
}
});
}else{
setTimeout(function(){
turboShareOnChange(_2bc,_2bd,_2be);
},500);
jq("#share_hub_tab").fadeOut(800,function(){
_2c0.data("rolledup",false);
});
}
};
function turboShareOnChange(_2c4,_2c5,_2c6,_2c7){
var _2c8=jq("#share_hub");
if(_2c8.is(":animated")){
return;
}
var _2c9=80;
var y=jq(window).scrollTop();
if(_2c4-y>_2c9){
_2c8.css("top",(_2c4-y)+"px");
}else{
_2c8.css("top",_2c9+"px");
}
var _2ca=jq("#content").offset();
var _2cb=_2ca.left;
if(!_2c8.data("rolledup")&&"0px"!=_2c8.css("left")){
_2c8.css("left",(_2cb-_2c5-_2c6)+"px");
}
var _2cb=jq("#content").offset().left;
if(_2cb>=_2c5+_2c6&&_2c8.data("rolledup")){
unrollTurboShare(true,_2c4,_2c5,_2c6,_2c7);
}else{
if(_2cb<_2c5+_2c6&&!_2c8.data("rolledup")){
rollUpTurboShare(true);
}
}
};
function google_ad_request_done(_2cc){
var s="";
var i;
if(_2cc.length==0){
return;
}
if(_2cc[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_2cc[0].image_width+"\" HEIGHT=\""+_2cc[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_2cc[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_2cc[0].image_url+"\" WIDTH=\""+_2cc[0].image_width+"\" HEIGHT=\""+_2cc[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_2cc[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_2cc[0].url+"\" target=\"_top\" title=\"go to "+_2cc[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_2cc[0].visible_url+"';return true\"><img border=\"0\" src=\""+_2cc[0].image_url+"\"width=\""+_2cc[0].image_width+"\"height=\""+_2cc[0].image_height+"\"></a>";
}else{
if(_2cc[0].type=="html"){
s+=_2cc[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>";
for(i=0;i<_2cc.length;++i){
ad=_2cc[i];
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
var _2cd=jq.address.value().substr(1);
if(""==_2cd){
return;
}
var _2ce=false;
if(_2cd.substr(0,8)=="comment-"){
_2ce=true;
_2cd="comment"+_2cd.substr(8);
}
if("morecomments"==_2cd||_2ce){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_2cd){
ssToId("comFirst");
}else{
if("morecomments"==_2cd){
}else{
ssToId(_2cd);
}
}
};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_2cf){
id=jQuery(_2cf.target).attr("id");
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
var _2d0="#edit_rc_error_"+i;
jQuery(_2d0).html("You cannot submit an empty comment.");
}else{
jq.ajax({url:"/xml/request_comment_edit.php",type:"POST",data:{id:i,text:txt},success:function(data){
jq("#rc_"+i).replaceWith(data);
jq("#rc_"+i).effect("highlight",{color:"yellow"},1000);
}});
}
return false;
};
function supportRequestCommentDeletion(){
jQuery(".request_comment_delete").click(function(_2d1){
orig_id=jQuery(_2d1.target).attr("id");
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
function showAnswerCommentBox(id,_2d2){
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
jQuery("#rc_numcharsvalue").html(_2d2);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _2d3="#result_"+i;
var _2d4="#error_"+i;
var txt=jQuery("#answer_comment textarea").val();
if(txt==""){
jQuery(_2d4).html("You cannot submit an empty comment.");
}else{
var f=jQuery("#answer_comment input[name=\"follow\"]").attr("checked");
jQuery.ajax({url:"/xml/request_comment_submit.php",type:"POST",data:{id:i,text:txt,follow:f},success:function(data){
jQuery("#answer_comment").fadeOut("slow",function(){
jQuery("#answer_comment").prev().css("display","none");
jQuery(_2d3).append(data);
var _2d5=jQuery(_2d3).children().last().attr("id");
jQuery(_2d3).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_2d5);
});
});
}});
}
};
function loadRatingSystem(_2d6,_2d7,_2d8,_2d9){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_2d6,params:{id:_2d9},ratingClass:"rating"});
};
function smBackfillLoaded(_2da){
if(_2da==null){
}else{
if(_2da.firstChild==null){
}else{
_2da.firstChild.style.height="250px";
}
}
};
function hpFormHandler(_2db){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_2db);
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
var _2dc=$$("input[name="+ele.name+"]");
var _2dd=false;
_2dc.each(function(r){
if(r.checked==true){
_2dd=true;
throw $break;
}
});
this.testForError(!_2dd,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _2de=false;
if(val.length>=20){
var _2df=val.match(/\s+/g);
var _2e0=_2df?_2df.length:0;
var _2e1=_2e0+1;
_2de=_2e1/(val.length-_2e0)<0.08;
}
this.testForError(_2de,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_2e2,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_2e2)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_2e3,msg){
var val=$F(ele);
this.testForError((val.search(_2e3)!=-1),ele,msg);
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
hpFormHandler.prototype.validateNoWords=function(ele,_2e4,msg){
var val=$F(ele);
var _2e5=false;
for(i=0;i<_2e4.length&&!_2e5;i++){
var _2e6=new RegExp("[^a-zA-Z]"+_2e4[i]+"[^a-zA-Z]","i");
_2e5=(val.search(_2e6)>=0);
if(!_2e5){
_2e6=new RegExp("^"+_2e4[i]+"[^a-zA-Z]","i");
_2e5=(val.search(_2e6)>=0);
}
if(!_2e5){
_2e6=new RegExp("[^a-zA-Z]"+_2e4[i]+"$","i");
_2e5=(val.search(_2e6)>=0);
}
if(!_2e5){
_2e6=new RegExp("^"+_2e4[i]+"$","i");
_2e5=(val.search(_2e6)>=0);
}
}
this.testForError(_2e5,ele,msg);
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
var _2e7=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
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
var _2e8=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
var _2e9=800;
var _2ea=6;
this.validateLengthMin(ele,_2ea,"The address you entered is too short. Please use an address at least "+_2ea+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _2eb=200;
this.validateLengthMax(ele,_2eb,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _2ec=2;
var _2ed=200;
this.validateLengthMin(ele,_2ec,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_2ed,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _2ee=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_2ee=true;
}
this.testForError(!_2ee,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _2ef=40;
var _2f0=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_2f0,"Your password is too short.  Protect your account by choosing a password that is at least  "+_2f0+" characters long.  Safety first!");
this.validateLengthMax(ele1,_2ef,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _2f1=60;
var _2f2=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_2f1,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_2f3){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_2f3.detect(function(name){
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
var _2f4=$A($(form).getElementsByTagName("input"));
_2f4.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_2f5,_2f6,_2f7){
if($(_2f5)&&$(_2f6)){
var gw=new GhostWatcher(_2f5,_2f6,_2f7);
}
};
hpFormHandler.prototype.setValidators=function(_2f8,_2f9){
this.toValidate=$H(_2f8);
this.toValidateOnsubmit=$H(_2f9);
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
hpFormHandler.prototype.save=function(_2fa){
if(this.ensureSignedInBeforeSave&&!_2fa){
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
var _2fb=new fx.Scroll({duration:100});
_2fb.scrollTo(this.errorDiv);
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
var _2fc=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
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
hpFormHandler.prototype.testForError=function(_2fd,ele,msg){
if(_2fd){
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
hpFormHandler.prototype._runValidators=function(_2fe){
var _2ff=Form.getElements(this.form);
var _300=$A(_2ff);
_300.each(function(node){
if(_2fe){
var _301=this.toValidateOnsubmit.get(node.id);
if(!_301){
_301=this.toValidateOnsubmit.get(node.className);
}
if(_301){
_301(node);
}
}
var _301=this.toValidate.get(node.id);
if(!_301){
_301=this.toValidate.get(node.className);
}
if(_301){
_301(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _302="";
if(json.status=="error"){
var _303=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_302+=" - "+json.errors[key][i]+"\n";
}
_303++;
}
}
if(_303>0){
var _304=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_304+=_302+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_304);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _305=new fx.Scroll({duration:300});
_305.scrollTo("changesSaved");
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
var _306=this.errorHeader;
_306+="<ul>";
this.errors.each(function(err){
_306+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_306+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_306;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _307=$(err.key);
var _308=err.key+"_error";
var _309=$(_308);
if(_309){
_309.innerHTML=err.value;
_309.className="alert";
_309.show();
}else{
new Insertion.Top(_307.parentNode,"<div id=\""+_308+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_307,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _30a=typeof this.errors.get(targetId)=="undefined";
if(_30a){
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
function _handleInputKeypress(_30b){
_30b=_30b||window.event;
if(_30b.which){
if(_30b.which==Event.KEY_RETURN){
var _30c=document.createEvent("KeyboardEvent");
_30c.initKeyEvent("keydown",true,true,document.defaultView,_30b.ctrlKey,_30b.altKey,_30b.shiftKey,_30b.metaKey,Event.KEY_TAB,0);
_30b.preventDefault();
_30b.target.dispatchEvent(_30c);
}
}else{
if(_30b.keyCode){
if(_30b.keyCode==Event.KEY_RETURN){
_30b.keyCode=Event.KEY_TAB;
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
GhostWatcher.prototype={initialize:function(_30d,_30e,_30f){
this.fromEle=$(_30d);
this.toEle=$(_30e);
this.copyFunction=(_30f!=null)?_30f:this.copyValue;
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
function growTextArea(elt,_310,_311,_312){
var rows=Math.ceil($F(elt).length/_310)+1;
var _313=rows*_311;
_313=Math.max(_313,_312);
elt.setStyle({height:_313+"px"});
};
function makeGrowable(id,_314,_315,_316){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_314,_315,_316);
});
};
function makeExpandable(id,_317,_318,_319,_31a,_31b){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_317);
var _31b=(_31b===undefined)?"expanded":_31b;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_31b)){
anc.addClass(_31b);
if(typeof (_31a)=="function"){
_31a.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_318)=="function"){
_318.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_319){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_317);
});
};
function initAutoComplete(_31c,_31d){
var _31e="";
var _31f="++none++";
var _320=false;
var _321=false;
var _322=false;
var _323="#the_auto_comp_box";
var _324="#search_form";
var _325="#search_input";
var _326=".search_submit";
var _327="search_form";
var _328="/xml/getautocompletestrings.php";
var _329="";
var _32a=0;
var _32b=null;
var _32c=null;
var _32d=null;
var _32e=null;
var _32f=null;
var _330=false;
if(_31d){
_323=_31d.boxid;
_324=_31d.container;
_325=_31d.input;
_326=_31d.submit;
if(_31d.ajaxtarget!=undefined){
_328=_31d.ajaxtarget;
}
if(_31d.querystring!=undefined){
_329="&"+_31d.querystring;
}
if(_31d.filter!=undefined){
_32b=_31d.filter;
}
if(_31d.callback!=undefined){
_32c=_31d.callback;
}
if(_31d.keyboardelem!=undefined){
_32e=_31d.keyboardelem;
}
if(_31d.targoutput!=undefined){
_32d=_31d.targoutput;
}
if(_31d.keyuptarget!=undefined){
_32f=_31d.keyuptarget;
}
if(_31d.showprogress!=undefined){
_330=_31d.showprogress;
}
}
if(!_32e){
_32e=_325;
}
if(!_32d){
_32d=_325;
}
if(!_32f){
_32f=_32e;
}
jq(document).ready(function(){
if(!_320){
_320=true;
jq("<div id=\""+_323.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_32e);
if(_330){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_323);
jq("#auto_comp_close").bind("click",function(){
jq(_323).hide();
jq("#auto_comp_close").hide();
});
}
jq(_323).hide();
if(!_330){
jq(_323).bind("focusin",function(){
_321=true;
});
jq(_323).bind("focusout",function(){
_321=false;
});
jq(_324).bind("focusin",function(){
_322=true;
});
jq(_324).bind("focusout",function(){
_322=false;
setTimeout(function(){
if(!_321&&!_322){
jq(_323).hide();
jq("#auto_comp_close").hide();
_329=_329.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_324).attr("autocomplete","off");
jq(_32e).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_32a=0;
jq(_323+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_32f).bind("keyup",function(){
var _331=jq(_325).attr("value");
if(_325!=_32e){
if(_31e!=_331){
_329=_329.replace(/start=[0123456789]+/,"");
_329=_329.replace(/&&/,"&");
}
_31e="";
_31f="++none++";
}
var _332;
if(_31d){
_332="hubs";
}else{
_332=jq(".search_type option:selected").val();
if(_332==undefined){
_332="site";
}
}
if(_331.strip().length==0){
jq(_323).hide();
jq("#auto_comp_close").hide();
}
if(_331.strip().length>0&&_31e!=_331){
_31e=_331;
if(_331.indexOf(_31f)==0){
jq(_323+" > .auto_comp_row").each(function(){
var _333=jq(this).text();
if(_32b){
_333=_32b(_333);
}
if(_333.indexOf(_331)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_31f="++none++";
jq(_323+" > .auto_comp_row").remove();
var _334="?";
if(_330){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_323);
jq(_323).show();
_334="?s="+escape(_331)+"&";
}
var _335=jq(_324).serialize();
var _336=/(^|&)s=/;
if(!_335.match(_336)&&!_329.match(_336)&&!_334.match(_336)){
_335+="&s="+_331;
}
jq.get(_328+_334+"t="+escape(_332)+_329,_335,function(data){
jq(_323+" div[id=auto_comp_error]").remove();
jq(_323+" div[id=auto_comp_progress]").remove();
_329=_329.replace(/start=[0123456789]+/,"");
_329=_329.replace(/&&/,"&");
var _337=jq(data).find("div").length;
var _338=false;
if(_337==0){
return true;
}
var _339=jq(_325).val();
if(_339!=_331){
return true;
}
if(_337<_31c){
_31f=_331;
}else{
_31f="++none++";
}
jq(_323).show();
jq(_32e).focus();
var _33a=jq(_32e).position();
var _33b=jq(_32e).outerHeight(true);
jq(_323).position(_33a.top+_33b,_33a.left+5);
jq(data).find("div").appendTo(_323);
jq(_323+" > .auto_comp_row").bind("click",function(){
var _33c=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_33c=true;
var _33d=href.substr(8);
_329+="&start="+_33d;
_329=_329.replace(/&&/,"&");
}
});
if(_33c){
if(!_338){
setTimeout(function(){
jq(_32f).trigger("keyup");
},200);
_321=false;
_338=true;
}
return (false);
}
var _33e=jq(this).text();
if(_32b){
_33e=_32b(_33e);
}
jq(_32d).attr("value",_33e);
if(document.forms[_327]){
document.forms[_327].submit();
}else{
if(_326){
jq(_326).trigger("click");
}
}
return (false);
});
jq(_323+" > .auto_comp_row").bind("keypress",function(e){
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
jq(_323+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_323+" > .auto_comp_row:visible:eq("+_32a+") > a").length){
return (false);
}
++_32a;
jq(_323+" > .auto_comp_row:visible:eq("+_32a+") > a").trigger("focus");
return (false);
break;
case 38:
--_32a;
if(_32a<0){
jq(_32e).trigger("focus");
}else{
jq(_323+" > .auto_comp_row:visible:eq("+_32a+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_32c){
_32c();
}
},"html");
}
});
}
});
};
var ImageViewerControl=Class.create();
ImageViewerControl.prototype={initialize:function(_33f,_340,_341){
this.modId=_33f;
this.floatStatus=_340;
this.displayStatus=_341;
this.photoData=new Object();
this.photoOrder=new Array();
this.viewer_id=null;
this.timer=null;
this.slide_idx=-1;
this.displaySlideshowLinks=false;
this.resources={ht_viewer_sect:"image_viewer_"+this.modId,ht_inline_sect:"image_inline_"+this.modId,ht_slideshow_sect:"image_slideshow_"+this.modId,ht_thumbnail_sect:"image_thumbnail_"+this.modId,inline_images:"imgs_"+this.modId,viewer_display:"slide_display_"+this.modId,viewer_photo:"slide_img_"+this.modId,viewer_caption:"slide_desc_"+this.modId,thumb_tn_section:"slide_tn_section_"+this.modId};
},setMaxHeight:function(_342){
this.firstTimeLoadingImage=true;
this.maxHeight=_342;
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
},setDisplaySlideshowLinks:function(_343){
this.displaySlideshowLinks=_343;
},_getDisplayUrl:function(){
rec=this.photoData[this.viewer_id];
var _344=rec.origWidth>=200&&rec.origHeight>=150;
if(rec.maxSize==2&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlQuarter,"quarter_frame",rec.esc_cap)+(_344&&this.displaySlideshowLinks?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if(rec.maxSize==2){
return this._createImageTag(rec.urlQuarter,"quarter",rec.esc_cap)+(_344&&this.displaySlideshowLinks?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlHalfPad,"half_frame",rec.esc_cap)+(_344&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return this._createImageTag(rec.urlHalf,"half",rec.esc_cap)+(_344&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlFullPad,"full_frame",rec.esc_cap)+(_344&&this.displaySlideshowLinks?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"){
return this._createImageTag(rec.urlFull,"full",rec.esc_cap)+(_344&&this.displaySlideshowLinks?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}
}
}
}
}
}
},_createImageTag:function(url,_345,_346){
if(undefined==_346){
_346="";
}
return "<img class='"+_345+"' title='"+_346+"' alt='"+_346+"' src='"+url+"' />";
},_getDisplayHeight:function(_347){
rec=this.photoData[_347];
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
var _348=rec.nofollow?" rel=\"nofollow\"":"";
var _349="";
if(rec.sourceUrl==""){
_349=rec.sourceName;
}else{
if(rec.sourceName==""){
_349="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_348+">"+rec.sourceUrl.truncate(50)+"</a>";
}else{
_349="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_348+">"+rec.sourceName+"</a>";
}
}
if(_349!=""){
_349="<div>Source: "+_349+"</div>";
}
return rec.caption+_349;
},_addInlineImage:function(id){
this.viewer_id=id;
var rec=this.photoData[id];
var _34a=document.createElement("div");
var _34b=this._getDisplayUrl();
if(this.floatStatus=="none"){
var _34c="caption_full";
}else{
var _34c="caption_half";
}
_34a.id="img_"+rec.id;
_34a.innerHTML="<div id='img_url_"+rec.id+"'>"+_34b+"</div>"+"<div class='"+_34c+"' id='img_desc_"+rec.id+"'>"+this._getCaptionAndSource(rec)+"</div>";
$(this.resources.inline_images).appendChild(_34a);
},renderInlineImages:function(){
$(this.resources.inline_images).innerHTML="";
this.photoOrder.each(function(id){
this._addInlineImage(id);
}.bind(this));
},_addThumbnail:function(id){
var rec=this.photoData[id];
var _34d=document.createElement("img");
_34d.id="slide_tn_"+rec.id;
_34d.src=rec.urlThumb;
_34d.alt=rec.caption;
_34d.title=rec.caption;
_34d.onclick=function(){
this.loadSlide(rec.id);
}.bind(this);
$(this.resources.thumb_tn_section).appendChild(_34d);
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
ForumSelector.prototype={initialize:function(id,_34e){
this.id=id;
this.userId=_34e;
this.observeChanges();
},observeChanges:function(){
$(this.id+"_forum_id").observe("change",this.changeForum.bindAsEventListener(this));
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
},changeForum:function(_34f){
var elt=Event.findElement(_34f,"select");
this.chooseForum($F(elt));
},changeCategory:function(_350){
var elt=Event.findElement(_350,"select");
this.chooseCategory($F(elt));
},chooseForum:function(_351){
if(/fave/.test(_351)){
var _352=_351.substring(5);
this.chooseCategory(_352);
return;
}
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({forumId:_351,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
},chooseCategory:function(_353){
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({categoryId:_353,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
}};
var CategorySelector=Class.create();
CategorySelector.prototype={initialize:function(id,_354,_355,_356){
this.id=id;
this.onchange=_354;
this.onselect=_355;
this.userId=_356?_356:0;
this.observeChanges();
},observeChanges:function(){
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
$("startOver"+this.id).observe("click",this.startOver.bind(this));
},changeCategory:function(_357){
var elt=Event.findElement(_357,"select");
this.chooseCategory($F(elt));
},chooseCategory:function(_358,_359,_35a){
new Ajax.Request("/xml/categoryselector.php",{parameters:$H({categoryId:_358,userId:this.userId,id:this.id}).toQueryString(),onComplete:function(req){
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
if(!_359&&_35a){
this.onselect(_35a);
}
}.bind(this)});
},getValue:function(){
return $F(this.id+"Id");
},startOver:function(_35b){
this.chooseCategory(0);
},refresh:function(){
this.chooseCategory(this.getValue());
},search:function(_35c,_35d,_35e){
new Ajax.Updater(_35d,"/xml/categorysearch.php",{parameters:$H({uniqueId:this.id,searchText:_35c,numTabs:_35e}),onFailure:function(){
}});
return false;
}};
function addEvent(_35f,type,_360){
if(!_360.$$guid){
_360.$$guid=addEvent.guid++;
}
if(!_35f.events){
_35f.events={};
}
var _361=_35f.events[type];
if(!_361){
_361=_35f.events[type]={};
if(_35f["on"+type]){
_361[0]=_35f["on"+type];
}
}
_361[_360.$$guid]=_360;
_35f["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_362,type,_363){
if(_362.events&&_362.events[type]){
delete _362.events[type][_363.$$guid];
}
};
function handleEvent(_364){
var _365=true;
_364=_364||fixEvent(window.event);
if(_364==null){
return false;
}
if(this.events==null){
return false;
}
var _366=this.events[_364.type];
for(var i in _366){
this.$$handleEvent=_366[i];
if(this.$$handleEvent(_364)===false){
_365=false;
}
}
return _365;
};
function fixEvent(_367){
if(_367!=null){
_367.preventDefault=fixEvent.preventDefault;
_367.stopPropagation=fixEvent.stopPropagation;
}
return _367;
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
var css={getElementsByClass:function(node,_368,tag){
var _369=new Array();
var els=node.getElementsByTagName(tag);
var _36a=els.length;
var _36b=new RegExp("(^|\\s)"+_368+"(\\s|$)");
for(var i=0,j=0;i<_36a;i++){
if(this.elementHasClass(els[i],_368)){
_369[j]=els[i];
j++;
}
}
return _369;
},elementHasClass:function(el,_36c){
if(!el){
return false;
}
var _36d=new RegExp("\\b"+_36c+"\\b");
if(el.className.match(_36d)){
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
var _36e=document.getElementsByTagName("table");
for(var i=0;i<_36e.length;i++){
var _36f=_36e[i];
if(css.elementHasClass(_36f,"sortable")){
this.makeSortable(_36f);
}
}
},makeSortable:function(_370){
if(!_370.id){
_370.id="sortableTable"+this.lastAssignedId++;
}
if(!_370.tHead||!_370.tHead.rows||0==_370.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_370.tHead.rows.length;i++){
if(css.elementHasClass(_370.tHead.rows[i],"sort_control_buttons")){
row=_370.tHead.rows[i];
break;
}
}
if(row==null){
row=_370.tHead.rows[_370.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _371=row.cells[i].firstChild;
_371.onclick=this.headingClicked;
_371.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _372=getEventTarget(e);
var td=_372.parentNode;
var tr=td.parentNode;
var _373=tr.parentNode;
var _374=_373.parentNode;
if(!_374.tBodies||_374.tBodies[0].rows.length<=1){
return false;
}
var _375=_372.getAttribute("columnId")||td.cellIndex;
var _376=css.getElementsByClass(td,"tableSortArrow","span");
var _377="";
if(_376.length>0){
_377=_376[0].getAttribute("sortOrder");
}
var itm="";
var _378=0;
while(""==itm&&_378<_374.tBodies[0].rows.length){
var elm=_374.tBodies[0].rows[_378].cells[_375];
if(elm.childNodes.length==1){
itm=that.getInnerText(_374.tBodies[0].rows[_378].cells[_375]);
}else{
itm=that.getInnerText(_374.tBodies[0].rows[_378].cells[_375].firstChild);
}
_378++;
}
var _379=that.determineSortFunction(itm);
var _37a;
if(_374.id==that.lastSortedTable&&_375==that.sortColumnIndex){
_37a=that.newRows;
_37a.reverse();
}else{
that.sortColumnIndex=_375;
_37a=new Array();
for(var j=0;j<_374.tBodies[0].rows.length;j++){
_37a[j]=_374.tBodies[0].rows[j];
}
_37a.sort(_379);
}
that.moveRows(_374,_37a);
that.newRows=_37a;
that.lastSortedTable=_374.id;
var _376=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_376.length;j++){
if(j==_375){
if(null==_377||""==_377||"DESC"==_377){
_376[j].innerHTML="▼";
_376[j].setAttribute("sortOrder","ASC");
}else{
_376[j].innerHTML="▲";
_376[j].setAttribute("sortOrder","DESC");
}
}else{
_376[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_374.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_374.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_374.tBodies[0].rows.length;i++){
tr=_374.tBodies[0].rows[i];
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
var _37b=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_37b=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_37b=this.sortDate;
}
if(itm.match(/^[�$]/)){
_37b=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_37b=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_37b=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_37b=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_37b=this.sortIP;
}
return _37b;
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
var _37c=a.cells[that.sortColumnIndex];
if(_37c.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _37d=b.cells[that.sortColumnIndex];
if(_37d.childNodes.length>1){
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
},moveRows:function(_37e,_37f){
for(var i=0;i<_37f.length;i++){
var _380=_37f[i];
_37e.tBodies[0].appendChild(_380);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_381,_382,_383){
this.modId=_381;
this.pollId=_382;
this.results_div_id=_381+"_poll_results";
this.vote_form_id=_381+"_vote_form";
this.vote_radio_name=_381+"_vote";
this.hubnugget=_383;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _384=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_384,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _385=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_386){
return _386.checked;
});
if(null==_385){
return;
}else{
vote=_385.value;
}
var _387=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_387,onFailure:reportError,onComplete:function(){
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
ContentRotator.prototype={initialize:function(ids,_388,_389,_38a,_38b,_38c,_38d,_38e,_38f,loop){
this.ids=ids;
this.prefix=_388;
this.interval=_389;
this.position=0;
this.paused=false;
this.transitionEffect=_38a;
this.transitioning=false;
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_38b){
this.playId=_38b;
}
if(_38c){
this.pauseId=_38c;
}
if(_38d){
this.positionIndicatorId=_38d;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_38e){
this.prevId=_38e;
}
if(_38f){
this.nextId=_38f;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},update:function(_390){
if(this.paused||this.activeUpdateThreadId!=_390){
return;
}
this.next();
setTimeout(this.update.bind(this,_390),this.interval);
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
},seek:function(_391){
var next=this.position<_391;
newPosition=_391%this.ids.length;
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
var _392=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_392.toggle();
this.position=newPosition;
if(this.fadeTransition){
var _393=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _393=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_393.options.onComplete=this.endTransition.bind(this);
_393.hide();
_393.toggle();
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
FeedManager.prototype={initialize:function(_394,_395,_396,_397,_398){
this.typeId=_394;
this.categoryId=_395;
this.userId=_398;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_397;
this.updateTime=_396;
this.originalUpdateTime=_396;
this.currentTime=parseInt(_396,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_399){
_399.preventDefault();
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
var _39a=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_39a=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_39a);
}.bind(this));
},getTimeAgo:function(_39b){
if(_39b<=1){
return "1 second ago";
}
var _39c=Math.round(_39b/60);
var _39d=Math.round(_39b/3600);
var days=Math.round(_39b/86400);
var _39e=Math.round(_39b/604800);
var _39f=Math.round(_39b/2592000);
var _3a0=Math.round(_39b/31536000);
var ret="";
if(_3a0>=2){
ret=_3a0+" years ago";
}else{
if(_39f>=2){
ret=_39f+" months ago";
}else{
if(_39e>=2){
ret=_39e+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_39d>=2){
ret=_39d+" hours ago";
}else{
if(_39c>=1){
ret=_39c+" minute"+(_39c==1?"":"s")+" ago";
}else{
ret=_39b+" second"+(_39b==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _3a1=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_3a1;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _3a2=parseInt(req.responseText,10);
if(_3a2>0){
this.newStoriesAvailable=_3a2;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _3a3=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_3a3+" "+is+" available (click to load)";
},loadNewStories:function(_3a4){
var nt=_3a4?_3a4:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _3a5=$(document.createElement("div"));
_3a5.addClassName("feed_item");
_3a5.innerHTML=data["render"];
var _3a6=$("feed_box").down(".feed_item",0);
_3a6.parentNode.insertBefore(_3a5,_3a6);
_3a5.descendants().each(function(elt){
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
var _3a7=$(document.createElement("div"));
_3a7.addClassName("feed_item");
_3a7.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _3a8=$("feed_box").down(".feed_item",0);
_3a8.parentNode.insertBefore(_3a7,_3a8);
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
var _3a9=$(document.createElement("div"));
_3a9.addClassName("feed_item");
_3a9.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _3aa=$("feed_box").down(".feed_item",0);
_3aa.parentNode.insertBefore(_3a9,_3aa);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _3ab=$(document.createElement("div"));
_3ab.addClassName("feed_item");
_3ab.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _3ac=$("feed_box").down(".feed_item",0);
_3ac.parentNode.insertBefore(_3ab,_3ac);
return;
}
var _3ad=$("category_filters");
if(!_3ad){
var _3ae=$(document.createElement("div"));
_3ae.addClassName("feed_setting_box");
_3ae.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_3ae);
var _3ad=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_3ad.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_3af,type,id){
new Ajax.Updater(_3af,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_3b0,_3b1,_3b2){
makeGrowable(id,_3b0,_3b1,_3b2);
},makeExpandable:function(id,_3b3,_3b4,_3b5,_3b6){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_3b3,_3b4,_3b5,null,_3b6);
return;
}
elt.addClass("expandable_text dimmed").val(_3b3).data("hasFocus",false);
function _3b7(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_3b8,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _3b9(){
if(_3b7()){
if(!_3b5){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_3b3);
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
if(typeof (_3b4)=="function"){
_3b4.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_3b9();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_3b9();
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
},saveForm:function(_3ba){
this.getHandler(_3ba).save();
return false;
},addStoryToTop:function(_3bb,id,_3bc){
var _3bd=$(document.createElement("div"));
_3bd.innerHTML=_3bb;
_3bd.addClassName("feed_item");
var _3be=$("feed_box").down(".feed_item",0);
_3be.parentNode.insertBefore(_3bd,_3be);
_3bd.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _3bf=new fx.Color(_3bd,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_3bc?_3bc:function(){
})});
_3bf.toggle();
},shrinkStatus:function(){
photoGalleryInserter.instance().close();
var s=$("status");
s.value="What's on your mind?";
s.addClassName("dimmed");
$$("#status_update input[type=checkbox]")[0].checked=false;
$$("#status_update .photo_preview")[0].innerHTML="";
$$("#status_update input[name=imageId]")[0].value=0;
$("status_wrapper").removeClassName("expanded");
var _3c0=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_3c0.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _3c1=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
category.startOver();
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _3c2=$("question");
_3c2.value="What is your question?";
_3c2.setStyle({"color":"#777"});
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
_3c1.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _3c3=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _3c4=$("subject");
var _3c5=$("message");
_3c4.setStyle({"color":"#777"});
_3c4.value="What is the subject of your forum post?";
_3c5.value="";
feed_forum_selector.chooseForum(0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_3c3.toggle();
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
},moreFeed:function(_3c6){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_3c6,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _3c7=JSONstring.toObject(req.responseText);
var _3c8=$("show_more");
_3c8.style.display="none";
_3c8.id="";
var _3c9=$(document.createElement("div"));
$("feed_box").appendChild(_3c9);
_3c9.innerHTML=_3c7["render"];
var _3ca=$("feed_more_"+_3c6);
$$("#feed_more_"+_3c6+" script").each(function(_3cb){
safeScriptEval(_3cb);
});
this.addItems(_3c7["feed"]);
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
},unhideUser:function(_3cc){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_3cc,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_3cc).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3cd=this.getById(fid);
if(_3cd){
_3cd.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_3cc);
if(hu){
if(hu.siblings().size()==0){
var _3ce=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3ce.parentNode.insertBefore(p,_3ce);
}
_3ce.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_3cf){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_3cf,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_3cf).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _3d0=this.getById(fid);
if(_3d0){
_3d0.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_3cf);
if(hc){
if(hc.siblings().size()==0){
var _3d1=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_3d1.parentNode.insertBefore(p,_3d1);
}
_3d1.remove();
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
var _3d2=$("overlay");
_3d2.classNames().each(function(name){
if(name!="overlay"){
_3d2.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_3d3){
if(_3d3){
$("overlay").addClassName(_3d3);
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
var _3d4=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d4+"px"});
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
var _3d5=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d5+"px"});
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
var _3d6=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d6+"px"});
}
adjustOverlayHeight();
}.bind(this)});
return false;
},showHubOverlay:function(url){
this.openOverlay("hubpage");
new Ajax.Request("/xml/articlerender.php?url="+url,{onComplete:function(req){
var _3d7=0;
$("overlay_content").innerHTML=req.responseText;
var _3d8=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_3d8+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_3d9){
var code=_3d9.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_3da){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_3da,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_3db,_3dc){
var sure=confirm("Are you sure that you want to stop following "+_3dc+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_3db,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_3db).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _3dd=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_3dd.each(function(type){
var _3de=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_3df){
if(_3df.checked){
_3de=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_3de){
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
var _3e0=jq("#edit_button");
if(_3e0.html()=="edit"){
this.toggleFeedPrefs();
}
var _3e1=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_3e1);
return false;
},toggleFeedPrefs:function(){
var _3e2=$("edit_button");
var _3e3=$("filter").value;
var _3e4="edit";
if(_3e2.innerHTML=="save"){
_3e4="save";
}
if(_3e4=="save"){
this.updateFeedTypeFilters();
var _3e5=0;
var _3e6=$$(".ht_box");
for(var j=0;j<_3e6.length;j++){
if(_3e6[j].checked){
_3e5+=Number(_3e6[j].name.substr(3));
}
}
var _3e7=$("current_prefs");
if(_3e5!=_3e7.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_3e5,filter:_3e3,feed:1}).toQueryString(),onComplete:function(){
Element.update(_3e2,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3e8=parseInt(pf.getStyle("height"));
var _3e9=new fx.Height("preference_feedback",{duration:600});
_3e9.hide();
_3e9.custom(0,_3e8);
}});
_3e7.value=_3e5;
}else{
Element.update(_3e2,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _3ea=parseInt(pf.getStyle("height"));
var _3eb=new fx.Height("preference_feedback",{duration:600});
_3eb.hide();
_3eb.custom(0,_3ea);
}
}
var curs=$$(".ht_cur");
var _3ec="";
for(var i=0;i<curs.length;i++){
_3ec=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_3e4=="edit"){
if(_3ec=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_3ec){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_3e4=="edit"){
_3e2.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_3ed,_3ee,_3ef){
this.id=id;
this.feedItemId=fid;
this.cdate=_3ed;
this.hidden=_3ee;
this.manager=_3ef;
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
},unhide:function(_3f0){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_3f0){
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
Event.observe(this.triggerId,"click",function(_3f1){
if(Event.element(_3f1).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _3f2=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_3f2){
elt.observe("mouseover",function(_3f3){
_3f3.show();
}.bind(this,_3f2));
elt.observe("mouseout",function(_3f4){
_3f4.hide();
}.bind(this,_3f2));
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
},share:function(_3f5){
if(_3f5===undefined){
_3f5=false;
}
if(_3f5){
var _3f6=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_3f6){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_3f7,_3f8){
if(_3f7){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_3f8){
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
var _3f9=$(this.htmlId);
_3f9.parentNode.insertBefore(hmsg,_3f9);
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
},hideUser:function(_3fa,_3fb){
_3fb=_3fb?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_3fa,force:_3fb}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3fc=$(this.htmlId);
_3fc.parentNode.insertBefore(hmsg,_3fc);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_3fa).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_3fd,_3fe){
_3fe=_3fe?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_3fe,categoryId:_3fd}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3ff=$(this.htmlId);
_3ff.parentNode.insertBefore(hmsg,_3ff);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_3fd).each(function(elt){
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
var _400=$("feed_posts_"+this.id).immediateDescendants();
var _401=_400.size();
_400.each(function(elt,_402){
if(_402==_401-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _403=$("feed_comments_"+this.id).immediateDescendants();
var _404=_403.size();
var _405=0;
_403.each(function(elt,_406){
if(elt.hasClassName("show_previous")){
_405=_406;
}
});
_403.each(function(elt,_407){
if(_407==_405){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_408,num,_409){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_408,num:num,startpos:_409}).toQueryString(),onComplete:function(req){
var _40a=$("feed_posts_"+this.id);
_40a.down("div").hide();
new Insertion.Top(_40a,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_40b){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_40b}).toQueryString(),onComplete:function(req){
var _40c=$("feed_comments_"+this.id);
_40c.down("div").hide();
new Insertion.Top(_40c,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_40d,num,_40e){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_40d,num:num,startpos:_40e}).toQueryString(),onComplete:function(req){
var _40f=$("feed_comments_"+this.id);
_40f.down("div").hide();
new Insertion.Top(_40f,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _410=$("feed_comments_"+this.id);
_410.innerHTML+=data["render"];
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
},observePostReporting:function(_411){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _412=$$("#story_"+this.id+" .feed_post");
if(_412.size()>1){
_412.each(function(elt){
var _413=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _414=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_413]=_414;
elt.observe("mouseover",_414);
var _415=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_413]=_415;
elt.observe("mouseout",_415);
var _416=this.manager.reportPost.bind(this.manager,_413);
this.clickHandlers[_413]=_416;
elt.observe("click",_416);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _417=$(document.createElement("a"));
_417.innerHTML="cancel report";
_417.href="#";
msg.appendChild(_417);
var _418=$(this.messageId);
_418.innerHTML="";
_418.appendChild(msg);
_418.addClassName("report_instructions");
var _419=parseInt(_418.getStyle("height"));
var _41a=new fx.Height(this.messageId,{duration:500});
_41a.hide();
_41a.custom(0,_419);
_417.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_412.size()==1){
var post=_412.detect(function(elt){
return true;
});
var _41b=post.id;
this.manager.reportPost(this.postIdFromDivId(_41b));
}
}
return false;
},postIdFromDivId:function(_41c){
return _41c.substring(_41c.lastIndexOf("_")+1);
},stopObservePostReporting:function(_41d){
var _41e=$$("#story_"+this.id+" .feed_post");
if(_41e.size()>1){
_41e.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _41f=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_41f]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_41f]);
elt.stopObserving("click",this.clickHandlers[_41f]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_41d){
Event.stop(_41d);
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
function deleteStatus(_420){
link=jq(_420.target);
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
function markerMap(m,_421,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_421);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_422,_423){
this.markers.push(new infoMarker(this,_422,_423,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_424,_425,_426,_427){
this.markermap=_424;
this.marker=_425;
this.content=_426;
this.position=_427;
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
var _428=$(this.legend.id+"_"+i);
if(_428){
_428.innerHTML="";
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
var _429=this.directionsResult.routes[0];
var legs=_429.legs;
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
var _42a=$(this.legend.id+"_"+i);
if(_42a){
_42a.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_429.copyrights;
var _42b="";
for(var j=0;j<_429.warnings.length;j++){
_42b+=_429.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_42b;
};
markerMap.prototype.fetchDirections=function(){
var _42c=this.markers;
var l=_42c.length;
var _42d=new google.maps.LatLng(_42c[0].marker.getPosition().lat(),_42c[0].marker.getPosition().lng());
var _42e=new google.maps.LatLng(_42c[l-1].marker.getPosition().lat(),_42c[l-1].marker.getPosition().lng());
var _42f=[];
for(var i=1;i<l-1;i++){
_42f.push({location:new google.maps.LatLng(_42c[i].marker.getPosition().lat(),_42c[i].marker.getPosition().lng()),stopover:true});
}
var _430={origin:_42d,destination:_42e,waypoints:_42f,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _431=new google.maps.DirectionsService();
_431.route(_430,function(_432,_433){
if(_433==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_432;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_434){
var _435="map_canvas_"+id;
var _436=mm.getMapById(id);
if(!_436){
var map=new google.maps.Map(document.getElementById(_435));
var _436=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_436);
sv=true;
}else{
var map=_436.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_436.removeAllMarkers();
var _437="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _438=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_438+".png";
var _439="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _43a=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_436.addMarker(_43a,_439);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_437+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_436.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_437+="<div id=\""+_436.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_437+="<div id=\""+_436.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_436.legend.innerHTML=_437;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_434||!_436.directionsResult){
_436.fetchDirections();
}else{
_436.renderDirections();
}
}else{
var _43b={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_436.directionsResult=_43b;
_436.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_43c){
var id=_43c.markermap.id;
if(!id){
return;
}
var _43d=mapLetterFromPosition(_43c.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_43d+".png";
_43c.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_43c.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_43e){
var id=_43e.markermap.id;
if(!id){
return;
}
var _43f=mapLetterFromPosition(_43e.position);
var icon="http://www.google.com/mapfiles/marker_green"+_43f+".png";
_43e.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_43e.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_440,id,_441){
var _442=mm.getMapById(id);
if(_441<_442.markers.length){
highlightMarker(_442.markers[_441]);
}
};
function unhighlightMapMarker(_443,id,_444){
var _445=mm.getMapById(id);
if(_444<_445.markers.length){
unhighlightMarker(_445.markers[_444]);
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
var _446=jQuery("#editor_box");
if(_446.hasClass("edit_box")){
jQuery(".message",_446.closest(".postright")).show();
}
_446.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_447,_448){
var ta=jq("#editor_box textarea");
var _449=ta.val();
if(_449.length){
ta.val(_449+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_447,_448)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_447,_448)+"[/img]\n\n");
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
var _44a=jQuery("#report_box");
_44a.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _44b=jQuery(this).closest("div.replies_box_wrapper");
var _44c=jQuery(this).closest("div.reply_collapser");
if(_44c.hasClass("show")){
_44c.addClass("hide").removeClass("show");
jQuery("a",_44c).html("");
jQuery("> .replies_box",_44b).slideDown();
}else{
jQuery("> .replies_box",_44b).slideUp(500,function(){
_44c.addClass("show").removeClass("hide");
jQuery("a",_44c).html(""+jQuery("li.threaded",_44b).length+" replies");
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
var _44d=jQuery(this);
var _44e=jQuery("#threaded_reply_to_box");
if(_44d.html()=="hide"){
_44d.html("this");
_44e.hide();
return false;
}
var _44f=_44d.attr("class").substr(7);
var _450=jQuery("#post"+_44f+" .username").html();
var html="<p class=\"by\">By "+_450+"</p>"+jQuery("#message"+_44f).html();
var _451=_44d.closest("li.threaded");
if(_44e.length>0){
_451.append(_44e);
}else{
jQuery(_451).append("<div id=\"threaded_reply_to_box\"></div>");
_44e=jQuery("#threaded_reply_to_box");
}
_44e.html(html);
var pos=_44d.position();
var _452=_44d.width();
_44e.css({"left":(pos.left+_452)+"px","top":pos.top+"px"});
_44e.show();
_44d.html("hide");
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
var _453=jQuery(this);
_453.attr("src",_453.data("src"));
});
});
});
function show_post_reply_box(_454){
_454.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _455=jQuery("#editor_box");
_455.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_455).text("submit");
jQuery("form",_455).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_455).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _456=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _457=_456?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_457+="<br/>";
jQuery("textarea",_455).after(_457);
}
if(jQuery("#follow_topic").length==0){
var _458="checked";
var _459=window.location.pathname;
var arr=_459.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _457="<p id=\"follow_topic\"></p>";
jQuery("textarea",_455).after(_457);
}
jQuery("#posterror ul",_455).html("");
jQuery("#posterror",_455).hide();
jQuery("textarea",_455).val("");
jQuery("#postId",_455).val(_454.attr("id").substring(4));
_455.append(jQuery("#formatting_tips"));
_455.show();
var x=_455.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_45a){
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _45b=jQuery("#report_box");
jQuery("#reportPostId",_45b).val(_45a.attr("id").substring(4));
jQuery("form",_45b).ajaxForm({type:"POST",dataType:"json",complete:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_45a).append(_45b);
jQuery(">.post_wrap > .actionmenu",_45a).append(_45b);
_45b.show();
var x=_45b.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyStart(_45c,_45d){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_45d["ele"]).closest("li.threaded");
if(!_45c){
suFH.nextUri="?reply="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_post_reply_box(post);
}
};
function processReplyError(data,_45e,_45f){
alert("There may have been an error posting your reply ("+_45e+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_460,_461){
alert("There may have been an error updating your post ("+_460+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
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
function processStartEditResponse(_462,_463){
jQuery("li.threaded img.wait").remove();
if(_463=="error"){
alert(_462.responseText);
return;
}
data=eval("("+_462.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _464=jQuery("#editor_box");
_464.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_464).text("Save");
jQuery("form",_464).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_464).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _465=document.getElementById("admincenter");
replyOptionsHTML=_465?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_464).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_464).html("");
jQuery("#posterror",_464).hide();
jQuery("#postId",_464).val(data.postId);
jQuery("textarea",_464).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_464.append(jQuery("#formatting_tips"));
_464.show();
var x=_464.offset().top-300;
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
function processDeleteResponse(_466,_467,_468){
if(_467=="error"){
jQuery("li.threaded img.wait").remove();
alert(_466);
}
};
function processUndeleteResponse(_469,_46a,_46b){
if(_46a=="error"){
jQuery("li.threaded img.wait").remove();
alert(_469);
}
};
function processReportStart(_46c,_46d){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_46d["ele"]).closest("li.threaded");
if(!_46c){
suFH.nextUri="?report="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_report_box(post);
}
};
function processReportResponse(_46e,_46f){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _470=jQuery("#report_box");
_470.hide();
alert(_46e.responseText);
};
(function($){
$.extend($.fn,{validate:function(_471){
if(!this.length){
_471&&_471.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _472=$.data(this[0],"validator");
if(_472){
return _472;
}
_472=new $.validator(_471,this[0]);
$.data(this[0],"validator",_472);
if(_472.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_472.cancelSubmit=true;
});
if(_472.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_472.submitButton=this;
});
}
this.submit(function(_473){
if(_472.settings.debug){
_473.preventDefault();
}
function _474(){
if(_472.settings.submitHandler){
if(_472.submitButton){
var _475=$("<input type='hidden'/>").attr("name",_472.submitButton.name).val(_472.submitButton.value).appendTo(_472.currentForm);
}
_472.settings.submitHandler.call(_472,_472.currentForm);
if(_472.submitButton){
_475.remove();
}
return false;
}
return true;
};
if(_472.cancelSubmit){
_472.cancelSubmit=false;
return _474();
}
if(_472.form()){
if(_472.pendingRequest){
_472.formSubmitted=true;
return false;
}
return _474();
}else{
_472.focusInvalid();
return false;
}
});
}
return _472;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _476=true;
var _477=$(this[0].form).validate();
this.each(function(){
_476&=_477.element(this);
});
return _476;
}
},removeAttrs:function(_478){
var _479={},_47a=this;
$.each(_478.split(/\s/),function(_47b,_47c){
_479[_47c]=_47a.attr(_47c);
_47a.removeAttr(_47c);
});
return _479;
},rules:function(_47d,_47e){
var _47f=this[0];
if(_47d){
var _480=$.data(_47f.form,"validator").settings;
var _481=_480.rules;
var _482=$.validator.staticRules(_47f);
switch(_47d){
case "add":
$.extend(_482,$.validator.normalizeRule(_47e));
_481[_47f.name]=_482;
if(_47e.messages){
_480.messages[_47f.name]=$.extend(_480.messages[_47f.name],_47e.messages);
}
break;
case "remove":
if(!_47e){
delete _481[_47f.name];
return _482;
}
var _483={};
$.each(_47e.split(/\s/),function(_484,_485){
_483[_485]=_482[_485];
delete _482[_485];
});
return _483;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_47f),$.validator.classRules(_47f),$.validator.attributeRules(_47f),$.validator.staticRules(_47f)),_47f);
if(data.required){
var _486=data.required;
delete data.required;
data=$.extend({required:_486},data);
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
$.validator=function(_487,form){
this.settings=$.extend(true,{},$.validator.defaults,_487);
this.currentForm=form;
this.init();
};
$.validator.format=function(_488,_489){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_488);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_489.constructor!=Array){
_489=$.makeArray(arguments).slice(1);
}
if(_489.constructor!=Array){
_489=[_489];
}
$.each(_489,function(i,n){
_488=_488.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _488;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_48a){
this.lastActive=_48a;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_48a,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_48a)).hide();
}
},onfocusout:function(_48b){
if(!this.checkable(_48b)&&(_48b.name in this.submitted||!this.optional(_48b))){
this.element(_48b);
}
},onkeyup:function(_48c){
if(_48c.name in this.submitted||_48c==this.lastElement){
this.element(_48c);
}
},onclick:function(_48d){
if(_48d.name in this.submitted){
this.element(_48d);
}else{
if(_48d.parentNode.name in this.submitted){
this.element(_48d.parentNode);
}
}
},highlight:function(_48e,_48f,_490){
$(_48e).addClass(_48f).removeClass(_490);
},unhighlight:function(_491,_492,_493){
$(_491).removeClass(_492).addClass(_493);
}},setDefaults:function(_494){
$.extend($.validator.defaults,_494);
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
var _495=(this.groups={});
$.each(this.settings.groups,function(key,_496){
$.each(_496.split(/\s/),function(_497,name){
_495[name]=key;
});
});
var _498=this.settings.rules;
$.each(_498,function(key,_499){
_498[key]=$.validator.normalizeRule(_499);
});
function _49a(_49b){
var _49c=$.data(this[0].form,"validator"),_49d="on"+_49b.type.replace(/^validate/,"");
_49c.settings[_49d]&&_49c.settings[_49d].call(_49c,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_49a).validateDelegate(":radio, :checkbox, select, option","click",_49a);
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
for(var i=0,_49e=(this.currentElements=this.elements());_49e[i];i++){
this.check(_49e[i]);
}
return this.valid();
},element:function(_49f){
_49f=this.clean(_49f);
this.lastElement=_49f;
this.prepareElement(_49f);
this.currentElements=$(_49f);
var _4a0=this.check(_49f);
if(_4a0){
delete this.invalid[_49f.name];
}else{
this.invalid[_49f.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _4a0;
},showErrors:function(_4a1){
if(_4a1){
$.extend(this.errorMap,_4a1);
this.errorList=[];
for(var name in _4a1){
this.errorList.push({message:_4a1[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_4a2){
return !(_4a2.name in _4a1);
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
var _4a3=0;
for(var i in obj){
_4a3++;
}
return _4a3;
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
var _4a4=this.lastActive;
return _4a4&&$.grep(this.errorList,function(n){
return n.element.name==_4a4.name;
}).length==1&&_4a4;
},elements:function(){
var _4a5=this,_4a6={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_4a5.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _4a6||!_4a5.objectLength($(this).rules())){
return false;
}
_4a6[this.name]=true;
return true;
});
},clean:function(_4a7){
return $(_4a7)[0];
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
},prepareElement:function(_4a8){
this.reset();
this.toHide=this.errorsFor(_4a8);
},check:function(_4a9){
_4a9=this.clean(_4a9);
if(this.checkable(_4a9)){
_4a9=this.findByName(_4a9.name).not(this.settings.ignore)[0];
}
var _4aa=$(_4a9).rules();
var _4ab=false;
for(var _4ac in _4aa){
var rule={method:_4ac,parameters:_4aa[_4ac]};
try{
var _4ad=$.validator.methods[_4ac].call(this,_4a9.value.replace(/\r/g,""),_4a9,rule.parameters);
if(_4ad=="dependency-mismatch"){
_4ab=true;
continue;
}
_4ab=false;
if(_4ad=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_4a9));
return;
}
if(!_4ad){
this.formatAndAdd(_4a9,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_4a9.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_4ab){
return;
}
if(this.objectLength(_4aa)){
this.successList.push(_4a9);
}
return true;
},customMetaMessage:function(_4ae,_4af){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_4ae).metadata()[this.settings.meta]:$(_4ae).metadata();
return meta&&meta.messages&&meta.messages[_4af];
},customMessage:function(name,_4b0){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_4b0]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_4b1,_4b2){
return this.findDefined(this.customMessage(_4b1.name,_4b2),this.customMetaMessage(_4b1,_4b2),!this.settings.ignoreTitle&&_4b1.title||undefined,$.validator.messages[_4b2],"<strong>Warning: No message defined for "+_4b1.name+"</strong>");
},formatAndAdd:function(_4b3,rule){
var _4b4=this.defaultMessage(_4b3,rule.method),_4b5=/\$?\{(\d+)\}/g;
if(typeof _4b4=="function"){
_4b4=_4b4.call(this,rule.parameters,_4b3);
}else{
if(_4b5.test(_4b4)){
_4b4=jQuery.format(_4b4.replace(_4b5,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_4b4,element:_4b3});
this.errorMap[_4b3.name]=_4b4;
this.submitted[_4b3.name]=_4b4;
},addWrapper:function(_4b6){
if(this.settings.wrapper){
_4b6=_4b6.add(_4b6.parent(this.settings.wrapper));
}
return _4b6;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _4b7=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_4b7.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_4b7.element,_4b7.message);
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
for(var i=0,_4b8=this.validElements();_4b8[i];i++){
this.settings.unhighlight.call(this,_4b8[i],this.settings.errorClass,this.settings.validClass);
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
},showLabel:function(_4b9,_4ba){
var _4bb=this.errorsFor(_4b9);
if(_4bb.length){
_4bb.removeClass().addClass(this.settings.errorClass);
_4bb.attr("generated")&&_4bb.html(_4ba);
}else{
_4bb=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_4b9),generated:true}).addClass(this.settings.errorClass).html(_4ba||"");
if(this.settings.wrapper){
_4bb=_4bb.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_4bb).length){
this.settings.errorPlacement?this.settings.errorPlacement(_4bb,$(_4b9)):_4bb.insertAfter(_4b9);
}
}
if(!_4ba&&this.settings.success){
_4bb.text("");
typeof this.settings.success=="string"?_4bb.addClass(this.settings.success):this.settings.success(_4bb);
}
this.toShow=this.toShow.add(_4bb);
},errorsFor:function(_4bc){
var name=this.idOrName(_4bc);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_4bd){
return this.groups[_4bd.name]||(this.checkable(_4bd)?_4bd.name:_4bd.id||_4bd.name);
},checkable:function(_4be){
return /radio|checkbox/i.test(_4be.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_4bf,_4c0){
return _4c0.form==form&&_4c0.name==name&&_4c0||null;
});
},getLength:function(_4c1,_4c2){
switch(_4c2.nodeName.toLowerCase()){
case "select":
return $("option:selected",_4c2).length;
case "input":
if(this.checkable(_4c2)){
return this.findByName(_4c2.name).filter(":checked").length;
}
}
return _4c1.length;
},depend:function(_4c3,_4c4){
return this.dependTypes[typeof _4c3]?this.dependTypes[typeof _4c3](_4c3,_4c4):true;
},dependTypes:{"boolean":function(_4c5,_4c6){
return _4c5;
},"string":function(_4c7,_4c8){
return !!$(_4c7,_4c8.form).length;
},"function":function(_4c9,_4ca){
return _4c9(_4ca);
}},optional:function(_4cb){
return !$.validator.methods.required.call(this,$.trim(_4cb.value),_4cb)&&"dependency-mismatch";
},startRequest:function(_4cc){
if(!this.pending[_4cc.name]){
this.pendingRequest++;
this.pending[_4cc.name]=true;
}
},stopRequest:function(_4cd,_4ce){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_4cd.name];
if(_4ce&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_4ce&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_4cf){
return $.data(_4cf,"previousValue")||$.data(_4cf,"previousValue",{old:null,valid:true,message:this.defaultMessage(_4cf,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_4d0,_4d1){
_4d0.constructor==String?this.classRuleSettings[_4d0]=_4d1:$.extend(this.classRuleSettings,_4d0);
},classRules:function(_4d2){
var _4d3={};
var _4d4=$(_4d2).attr("class");
_4d4&&$.each(_4d4.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_4d3,$.validator.classRuleSettings[this]);
}
});
return _4d3;
},attributeRules:function(_4d5){
var _4d6={};
var _4d7=$(_4d5);
for(var _4d8 in $.validator.methods){
var _4d9=_4d7.attr(_4d8);
if(_4d9){
_4d6[_4d8]=_4d9;
}
}
if(_4d6.maxlength&&/-1|2147483647|524288/.test(_4d6.maxlength)){
delete _4d6.maxlength;
}
return _4d6;
},metadataRules:function(_4da){
if(!$.metadata){
return {};
}
var meta=$.data(_4da.form,"validator").settings.meta;
return meta?$(_4da).metadata()[meta]:$(_4da).metadata();
},staticRules:function(_4db){
var _4dc={};
var _4dd=$.data(_4db.form,"validator");
if(_4dd.settings.rules){
_4dc=$.validator.normalizeRule(_4dd.settings.rules[_4db.name])||{};
}
return _4dc;
},normalizeRules:function(_4de,_4df){
$.each(_4de,function(prop,val){
if(val===false){
delete _4de[prop];
return;
}
if(val.param||val.depends){
var _4e0=true;
switch(typeof val.depends){
case "string":
_4e0=!!$(val.depends,_4df.form).length;
break;
case "function":
_4e0=val.depends.call(_4df,_4df);
break;
}
if(_4e0){
_4de[prop]=val.param!==undefined?val.param:true;
}else{
delete _4de[prop];
}
}
});
$.each(_4de,function(rule,_4e1){
_4de[rule]=$.isFunction(_4e1)?_4e1(_4df):_4e1;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_4de[this]){
_4de[this]=Number(_4de[this]);
}
});
$.each(["rangelength","range"],function(){
if(_4de[this]){
_4de[this]=[Number(_4de[this][0]),Number(_4de[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_4de.min&&_4de.max){
_4de.range=[_4de.min,_4de.max];
delete _4de.min;
delete _4de.max;
}
if(_4de.minlength&&_4de.maxlength){
_4de.rangelength=[_4de.minlength,_4de.maxlength];
delete _4de.minlength;
delete _4de.maxlength;
}
}
if(_4de.messages){
delete _4de.messages;
}
return _4de;
},normalizeRule:function(data){
if(typeof data=="string"){
var _4e2={};
$.each(data.split(/\s/),function(){
_4e2[this]=true;
});
data=_4e2;
}
return data;
},addMethod:function(name,_4e3,_4e4){
$.validator.methods[name]=_4e3;
$.validator.messages[name]=_4e4!=undefined?_4e4:$.validator.messages[name];
if(_4e3.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_4e5,_4e6,_4e7){
if(!this.depend(_4e7,_4e6)){
return "dependency-mismatch";
}
switch(_4e6.nodeName.toLowerCase()){
case "select":
var val=$(_4e6).val();
return val&&val.length>0;
case "input":
if(this.checkable(_4e6)){
return this.getLength(_4e5,_4e6)>0;
}
default:
return $.trim(_4e5).length>0;
}
},remote:function(_4e8,_4e9,_4ea){
if(this.optional(_4e9)){
return "dependency-mismatch";
}
var _4eb=this.previousValue(_4e9);
if(!this.settings.messages[_4e9.name]){
this.settings.messages[_4e9.name]={};
}
_4eb.originalMessage=this.settings.messages[_4e9.name].remote;
this.settings.messages[_4e9.name].remote=_4eb.message;
_4ea=typeof _4ea=="string"&&{url:_4ea}||_4ea;
if(this.pending[_4e9.name]){
return "pending";
}
if(_4eb.old===_4e8){
return _4eb.valid;
}
_4eb.old=_4e8;
var _4ec=this;
this.startRequest(_4e9);
var data={};
data[_4e9.name]=_4e8;
$.ajax($.extend(true,{url:_4ea,mode:"abort",port:"validate"+_4e9.name,dataType:"json",data:data,success:function(_4ed){
_4ec.settings.messages[_4e9.name].remote=_4eb.originalMessage;
var _4ee=_4ed===true;
if(_4ee){
var _4ef=_4ec.formSubmitted;
_4ec.prepareElement(_4e9);
_4ec.formSubmitted=_4ef;
_4ec.successList.push(_4e9);
_4ec.showErrors();
}else{
var _4f0={};
var _4f1=_4ed||_4ec.defaultMessage(_4e9,"remote");
_4f0[_4e9.name]=_4eb.message=$.isFunction(_4f1)?_4f1(_4e8):_4f1;
_4ec.showErrors(_4f0);
}
_4eb.valid=_4ee;
_4ec.stopRequest(_4e9,_4ee);
}},_4ea));
return "pending";
},minlength:function(_4f2,_4f3,_4f4){
return this.optional(_4f3)||this.getLength($.trim(_4f2),_4f3)>=_4f4;
},maxlength:function(_4f5,_4f6,_4f7){
return this.optional(_4f6)||this.getLength($.trim(_4f5),_4f6)<=_4f7;
},rangelength:function(_4f8,_4f9,_4fa){
var _4fb=this.getLength($.trim(_4f8),_4f9);
return this.optional(_4f9)||(_4fb>=_4fa[0]&&_4fb<=_4fa[1]);
},min:function(_4fc,_4fd,_4fe){
return this.optional(_4fd)||_4fc>=_4fe;
},max:function(_4ff,_500,_501){
return this.optional(_500)||_4ff<=_501;
},range:function(_502,_503,_504){
return this.optional(_503)||(_502>=_504[0]&&_502<=_504[1]);
},email:function(_505,_506){
return this.optional(_506)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_505);
},url:function(_507,_508){
return this.optional(_508)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_507);
},date:function(_509,_50a){
return this.optional(_50a)||!/Invalid|NaN/.test(new Date(_509));
},dateISO:function(_50b,_50c){
return this.optional(_50c)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_50b);
},number:function(_50d,_50e){
return this.optional(_50e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_50d);
},digits:function(_50f,_510){
return this.optional(_510)||/^\d+$/.test(_50f);
},creditcard:function(_511,_512){
if(this.optional(_512)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_511)){
return false;
}
var _513=0,_514=0,_515=false;
_511=_511.replace(/\D/g,"");
for(var n=_511.length-1;n>=0;n--){
var _516=_511.charAt(n);
var _514=parseInt(_516,10);
if(_515){
if((_514*=2)>9){
_514-=9;
}
}
_513+=_514;
_515=!_515;
}
return (_513%10)==0;
},accept:function(_517,_518,_519){
_519=typeof _519=="string"?_519.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_518)||_517.match(new RegExp(".("+_519+")$","i"));
},equalTo:function(_51a,_51b,_51c){
var _51d=$(_51c).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_51b).valid();
});
return $.trim(_51a)==$.trim(_51d.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _51e={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_51f,_520,xhr){
var port=_51f.port;
if(_51f.mode=="abort"){
if(_51e[port]){
_51e[port].abort();
}
_51e[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_521){
var mode=("mode" in _521?_521:$.ajaxSettings).mode,port=("port" in _521?_521:$.ajaxSettings).port;
if(mode=="abort"){
if(_51e[port]){
_51e[port].abort();
}
return (_51e[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_522,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_522,_523,true);
},teardown:function(){
this.removeEventListener(_522,_523,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _523(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_524,type,_525){
return this.bind(type,function(_526){
var _527=$(_526.target);
if(_527.is(_524)){
return _525.apply(_527,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_528,_529,_52a){
return this.optional(_529)||this.getLength(jq.trim(_528),_529)==_52a;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_52b,_52c,_52d){
if(!this.depend(_52d,_52c)){
return "dependency-mismatch";
}
switch(_52c.nodeName.toLowerCase()){
case "select":
var val=jq(_52c).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_52c)){
return this.getLength(_52b,_52c)==0;
}
default:
return jq.trim(_52b).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_52e,_52f){
if(!this.depend(_52f,_52e)){
return "dependency-mismatch";
}
var _530=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_530=true;
}else{
var _531=ssn.split("-");
if(_531[0]=="000"||_531[1]=="00"||_531[2]=="0000"){
_530=true;
}
if(_531[0]=="666"){
_530=true;
}
var _532=parseInt(_531[0],10);
if(_532>=900){
if(_531[1][0]!=7&&_531[1][0]!=8){
_530=true;
}
}
}
return !_530;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_533,_534,_535){
if(!this.depend(_535,_534)){
return "dependency-mismatch";
}
return _533.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_536,_537){
if(!this.depend(_537,_536)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_538,_539,_53a){
var _538=jq.trim(_538);
if(_538.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _53b=_538.split("-");
var m=1*_53b[0]-1;
var d=1*_53b[1];
var y=1*_53b[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_53c,_53d,_53e){
return jq.trim(_53c).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
(function($){
$.fn.checkLikeRadio=function(){
var that=this;
this.each(function(){
$(this).click(function(){
if($(this).attr("checked")){
var _53f=$(this);
$(that).each(function(){
if($(this)[0]!==_53f[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_540){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _540=="function"){
_540={success:_540};
}
var _541=this.attr("action");
var url=(typeof _541==="string")?$.trim(_541):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_540=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_540);
var veto={};
this.trigger("form-pre-serialize",[this,_540,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_540.beforeSerialize&&_540.beforeSerialize(this,_540)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_540.semantic);
if(_540.data){
_540.extraData=_540.data;
for(n in _540.data){
if(_540.data[n] instanceof Array){
for(var k in _540.data[n]){
a.push({name:n,value:_540.data[n][k]});
}
}else{
v=_540.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_540.beforeSubmit&&_540.beforeSubmit(a,this,_540)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_540,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_540.type.toUpperCase()=="GET"){
_540.url+=(_540.url.indexOf("?")>=0?"&":"?")+q;
_540.data=null;
}else{
_540.data=q;
}
var _542=this,_543=[];
if(_540.resetForm){
_543.push(function(){
_542.resetForm();
});
}
if(_540.clearForm){
_543.push(function(){
_542.clearForm();
});
}
if(!_540.dataType&&_540.target){
var _544=_540.success||function(){
};
_543.push(function(data){
var fn=_540.replaceTarget?"replaceWith":"html";
$(_540.target)[fn](data).each(_544,arguments);
});
}else{
if(_540.success){
_543.push(_540.success);
}
}
_540.success=function(data,_545,xhr){
var _546=_540.context||_540;
for(var i=0,max=_543.length;i<max;i++){
_543[i].apply(_546,[data,_545,xhr||_542,_542]);
}
};
var _547=$("input:file",this).length>0;
var mp="multipart/form-data";
var _548=(_542.attr("enctype")==mp||_542.attr("encoding")==mp);
if(_540.iframe!==false&&(_547||_540.iframe||_548)){
if(_540.closeKeepAlive){
$.get(_540.closeKeepAlive,_549);
}else{
_549();
}
}else{
$.ajax(_540);
}
this.trigger("form-submit-notify",[this,_540]);
return this;
function _549(){
var form=_542[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_540);
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
var _54a=0;
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
function _54b(){
var t=_542.attr("target"),a=_542.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_542.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_54a=true;
cb();
},s.timeout);
}
var _54c=[];
try{
if(s.extraData){
for(var n in s.extraData){
_54c.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
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
_542.removeAttr("target");
}
$(_54c).remove();
}
};
if(s.forceSync){
_54b();
}else{
setTimeout(_54b,10);
}
var data,doc,_54d=50;
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
if(_54a){
throw "timeout";
}
var _54e=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_54e);
if(!_54e&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_54d){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_54f){
var _550={"content-type":s.dataType};
return _550[_54f];
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
xhr.responseXML=_551(xhr.responseText);
}
}
data=_553(xhr,s.dataType,s);
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
var _551=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _552=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _553=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_552(data);
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
$.fn.ajaxForm=function(_554){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_554);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_554);
}
}).bind("click.form-plugin",function(e){
var _555=e.target;
var $el=$(_555);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_555=t[0];
}
var form=this;
form.clk=_555;
if(_555.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _556=$el.offset();
form.clk_x=e.pageX-_556.left;
form.clk_y=e.pageY-_556.top;
}else{
form.clk_x=e.pageX-_555.offsetLeft;
form.clk_y=e.pageY-_555.offsetTop;
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
$.fn.formToArray=function(_557){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_557?form.getElementsByTagName("*"):form.elements;
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
if(_557&&form.clk&&el.type=="image"){
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
if(!_557&&form.clk){
var _558=$(form.clk),_559=_558[0];
n=_559.name;
if(n&&!_559.disabled&&_559.type=="image"){
a.push({name:n,value:_558.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_55a){
return $.param(this.formToArray(_55a));
};
$.fn.fieldSerialize=function(_55b){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_55b);
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
$.fn.fieldValue=function(_55c){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_55c);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_55d){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_55d===undefined){
_55d=true;
}
if(_55d&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _55e=el.selectedIndex;
if(_55e<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_55e+1:ops.length);
for(var i=(one?_55e:0);i<max;i++){
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
$.fn.selected=function(_55f){
if(_55f===undefined){
_55f=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_55f;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_55f&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_55f;
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
$.fn.extend({accordion:function(_560,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _560=="string"){
var _561=$.data(this,"ui-accordion");
_561[_560].apply(_561,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_560));
}
}
});
},activate:function(_562){
return this.accordion("activate",_562);
}});
$.ui.accordion=function(_563,_564){
this.options=_564=$.extend({},$.ui.accordion.defaults,_564);
this.element=_563;
$(_563).addClass("ui-accordion");
if(_564.navigation){
var _565=$(_563).find("a").filter(_564.navigationFilter);
if(_565.length){
if(_565.filter(_564.header).length){
_564.active=_565;
}else{
_564.active=_565.parent().parent().prev();
_565.addClass("current");
}
}
}
_564.headers=$(_563).find(_564.header);
_564.active=_566(_564.headers,_564.active);
if(_564.fillSpace){
var _567=$(_563).parent().height();
_564.headers.each(function(){
_567-=$(this).outerHeight();
});
var _568=0;
_564.headers.next().each(function(){
_568=Math.max(_568,$(this).innerHeight()-$(this).height());
}).height(_567-_568);
}else{
if(_564.autoheight){
var _567=0;
_564.headers.next().each(function(){
_567=Math.max(_567,$(this).outerHeight());
}).height(_567);
}
}
_564.headers.not(_564.active||"").next().hide();
_564.active.parent().andSelf().addClass(_564.selectedClass);
if(_564.event){
$(_563).bind((_564.event)+".ui-accordion",_569);
}
};
$.ui.accordion.prototype={activate:function(_56a){
_569.call(this.element,{target:_566(this.options.headers,_56a)[0]});
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
function _56b(_56c,_56d){
return function(){
return _56c.apply(_56d,arguments);
};
};
function _56e(_56f){
if(!$.data(this,"ui-accordion")){
return;
}
var _570=$.data(this,"ui-accordion");
var _571=_570.options;
_571.running=_56f?0:--_571.running;
if(_571.running){
return;
}
if(_571.clearStyle){
_571.toShow.add(_571.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_571.data],_571.change);
};
function _572(_573,_574,data,_575,down){
var _576=$.data(this,"ui-accordion").options;
_576.toShow=_573;
_576.toHide=_574;
_576.data=data;
var _577=_56b(_56e,this);
_576.running=_574.size()==0?_573.size():_574.size();
if(_576.animated){
if(!_576.alwaysOpen&&_575){
$.ui.accordion.animations[_576.animated]({toShow:jQuery([]),toHide:_574,complete:_577,down:down,autoheight:_576.autoheight});
}else{
$.ui.accordion.animations[_576.animated]({toShow:_573,toHide:_574,complete:_577,down:down,autoheight:_576.autoheight});
}
}else{
if(!_576.alwaysOpen&&_575){
_573.toggle();
}else{
_574.hide();
_573.show();
}
_577(true);
}
};
function _569(_578){
var _579=$.data(this,"ui-accordion").options;
if(_579.disabled){
return false;
}
if(!_578.target&&!_579.alwaysOpen){
_579.active.parent().andSelf().toggleClass(_579.selectedClass);
var _57a=_579.active.next(),data={instance:this,options:_579,newHeader:jQuery([]),oldHeader:_579.active,newContent:jQuery([]),oldContent:_57a},_57b=_579.active=$([]);
_572.call(this,_57b,_57a,data);
return false;
}
var _57c=$(_578.target);
if(_57c.parents(_579.header).length){
while(!_57c.is(_579.header)){
_57c=_57c.parent();
}
}
var _57d=_57c[0]==_579.active[0];
if(_579.running||(_579.alwaysOpen&&_57d)){
return false;
}
if(!_57c.is(_579.header)){
return;
}
_579.active.parent().andSelf().toggleClass(_579.selectedClass);
if(!_57d){
_57c.parent().andSelf().addClass(_579.selectedClass);
}
var _57b=_57c.next(),_57a=_579.active.next(),data={instance:this,options:_579,newHeader:_57c,oldHeader:_579.active,newContent:_57b,oldContent:_57a},down=_579.headers.index(_579.active[0])>_579.headers.index(_57c[0]);
_579.active=_57d?$([]):_57c;
_572.call(this,_57b,_57a,data,_57d,down);
return false;
};
function _566(_57e,_57f){
return _57f!=undefined?typeof _57f=="number"?_57e.filter(":eq("+_57f+")"):_57e.not(_57e.not(_57f)):_57f===false?$([]):_57e.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_580,_581){
_580=$.extend({easing:"swing",duration:300},_580,_581);
if(!_580.toHide.size()){
_580.toShow.animate({height:"show"},_580);
return;
}
var _582=_580.toHide.height(),_583=_580.toShow.height(),_584=_583/_582;
_580.toShow.css({height:0,overflow:"hidden"}).show();
_580.toHide.filter(":hidden").each(_580.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _585=(_582-now)*_584;
if($.browser.msie||$.browser.opera){
_585=Math.ceil(_585);
}
_580.toShow.height(_585);
},duration:_580.duration,easing:_580.easing,complete:function(){
if(!_580.autoheight){
_580.toShow.css("height","auto");
}
_580.complete();
}});
},bounceslide:function(_586){
this.slide(_586,{easing:_586.down?"bounceout":"swing",duration:_586.down?1000:200});
},easeslide:function(_587){
this.slide(_587,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_588,_589,wrap,_58a,_58b,_58c,_58d,_58e,_58f=0,_590={},_591=[],_592=0,_593={},_594=[],_595=null,_596=new Image(),_597=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_598=/[^\.]\.(swf)\s*$/i,_599,_59a=1,_59b,_59c,busy=false,_59d=20,fx=$.extend($("<div/>")[0],{prop:0}),_59e=0,_59f=!$.support.opacity&&!window.XMLHttpRequest,_5a0=function(){
_588.hide();
_596.onerror=_596.onload=null;
if(_595){
_595.abort();
}
tmp.empty();
},_5a1=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_5a2=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_5a3=function(){
var view=_5a2(),to={},_5a4=_593.margin,_5a5=_593.autoScale,_5a6=(_59d+_5a4)*2,_5a7=(_59d+_5a4)*2,_5a8=(_593.padding*2),_5a9;
if(_593.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_593.width))/100)-(_59d*2);
_5a5=false;
}else{
to.width=_593.width+_5a8;
}
if(_593.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_593.height))/100)-(_59d*2);
_5a5=false;
}else{
to.height=_593.height+_5a8;
}
if(_5a5&&(to.width>(view[0]-_5a6)||to.height>(view[1]-_5a7))){
if(_590.type=="image"||_590.type=="swf"){
_5a6+=_5a8;
_5a7+=_5a8;
_5a9=Math.min(Math.min(view[0]-_5a6,_593.width)/_593.width,Math.min(view[1]-_5a7,_593.height)/_593.height);
to.width=Math.round(_5a9*(to.width-_5a8))+_5a8;
to.height=Math.round(_5a9*(to.height-_5a8))+_5a8;
}else{
to.width=Math.min(to.width,(view[0]-_5a6));
to.height=Math.min(to.height,(view[1]-_5a7));
}
}
to.top=view[3]+((view[1]-(to.height+(_59d*2)))*0.5);
if(_593.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_59d*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_593.minWidth)+(_59d*2)))*0.5);
}
if(_593.autoScale===false){
to.top=Math.max(view[3]+_5a4,to.top);
to.left=Math.max(view[2]+_5a4,to.left);
}
return to;
},_5aa=function(_5ab){
if(_5ab&&_5ab.length){
switch(_593.titlePosition){
case "inside":
return _5ab;
case "over":
return "<span id=\"fancybox-title-over\">"+_5ab+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_5ab+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_5ac=function(){
var _5ad=_593.title,_5ae=_59c.width-(_593.padding*2),_5af="fancybox-title-"+_593.titlePosition;
$("#fancybox-title").remove();
_59e=0;
if(_593.titleShow===false){
return;
}
_5ad=$.isFunction(_593.titleFormat)?_593.titleFormat(_5ad,_594,_592,_593):_5aa(_5ad);
if(!_5ad||_5ad===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_5af+"\" />").css({"width":_5ae,"paddingLeft":_593.padding,"paddingRight":_593.padding}).html(_5ad).appendTo("body");
switch(_593.titlePosition){
case "inside":
_59e=$("#fancybox-title").outerHeight(true)-_593.padding;
_59c.height+=_59e;
break;
case "over":
$("#fancybox-title").css("bottom",_593.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_58a).hide();
},_5b0=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_593.enableEscapeButton){
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
if(_594.length>1){
wrap.bind("mousewheel.fb",function(e,_5b1){
e.preventDefault();
if(busy||_5b1===0){
return;
}
if(_5b1>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_593.showNavArrows){
return;
}
if((_593.cyclic&&_594.length>1)||_592!==0){
_58d.show();
}
if((_593.cyclic&&_594.length>1)||_592!=(_594.length-1)){
_58e.show();
}
},_5b2=function(){
var href,_5b3;
if((_594.length-1)>_592){
href=_594[_592+1].href;
if(typeof href!=="undefined"&&href.match(_597)){
_5b3=new Image();
_5b3.src=href;
}
}
if(_592>0){
href=_594[_592-1].href;
if(typeof href!=="undefined"&&href.match(_597)){
_5b3=new Image();
_5b3.src=href;
}
}
},_5b4=function(){
_58b.css("overflow",(_593.scrolling=="auto"?(_593.type=="image"||_593.type=="iframe"||_593.type=="swf"?"hidden":"auto"):(_593.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_58b.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_593.hideOnContentClick){
_58b.one("click",$.fancybox.close);
}
if(_593.hideOnOverlayClick){
_589.one("click",$.fancybox.close);
}
if(_593.showCloseButton){
_58c.show();
}
_5b0();
$(window).bind("resize.fb",$.fancybox.center);
if(_593.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_593.onComplete)){
_593.onComplete(_594,_592,_593);
}
busy=false;
_5b2();
},_5b5=function(pos){
var _5b6=Math.round(_59b.width+(_59c.width-_59b.width)*pos),_5b7=Math.round(_59b.height+(_59c.height-_59b.height)*pos),top=Math.round(_59b.top+(_59c.top-_59b.top)*pos),left=Math.round(_59b.left+(_59c.left-_59b.left)*pos);
wrap.css({"width":_5b6+"px","height":_5b7+"px","top":top+"px","left":left+"px"});
_5b6=Math.max(_5b6-_593.padding*2,0);
_5b7=Math.max(_5b7-(_593.padding*2+(_59e*pos)),0);
_58b.css({"width":_5b6+"px","height":_5b7+"px"});
if(typeof _59c.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_5b8=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_5b9=function(){
var orig=_590.orig?$(_590.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_5b8(orig);
from={width:(pos.width+(_593.padding*2)),height:(pos.height+(_593.padding*2)),top:(pos.top-_593.padding-_59d),left:(pos.left-_593.padding-_59d)};
}else{
view=_5a2();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_5ba=function(){
_588.hide();
if(wrap.is(":visible")&&$.isFunction(_593.onCleanup)){
if(_593.onCleanup(_594,_592,_593)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_594=_591;
_592=_58f;
_593=_590;
_58b.get(0).scrollTop=0;
_58b.get(0).scrollLeft=0;
if(_593.overlayShow){
if(_59f){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_589.css({"background-color":_593.overlayColor,"opacity":_593.overlayOpacity}).unbind().show();
}
_59c=_5a3();
_5ac();
if(wrap.is(":visible")){
$(_58c.add(_58d).add(_58e)).hide();
var pos=wrap.position(),_5bb;
_59b={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_5bb=(_59b.width==_59c.width&&_59b.height==_59c.height);
_58b.fadeOut(_593.changeFade,function(){
var _5bc=function(){
_58b.html(tmp.contents()).fadeIn(_593.changeFade,_5b4);
};
$.event.trigger("fancybox-change");
_58b.empty().css("overflow","hidden");
if(_5bb){
_58b.css({top:_593.padding,left:_593.padding,width:Math.max(_59c.width-(_593.padding*2),1),height:Math.max(_59c.height-(_593.padding*2)-_59e,1)});
_5bc();
}else{
_58b.css({top:_593.padding,left:_593.padding,width:Math.max(_59b.width-(_593.padding*2),1),height:Math.max(_59b.height-(_593.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_593.changeSpeed,easing:_593.easingChange,step:_5b5,complete:_5bc});
}
});
return;
}
wrap.css("opacity",1);
if(_593.transitionIn=="elastic"){
_59b=_5b9();
_58b.css({top:_593.padding,left:_593.padding,width:Math.max(_59b.width-(_593.padding*2),1),height:Math.max(_59b.height-(_593.padding*2),1)}).html(tmp.contents());
wrap.css(_59b).show();
if(_593.opacity){
_59c.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_593.speedIn,easing:_593.easingIn,step:_5b5,complete:_5b4});
}else{
_58b.css({top:_593.padding,left:_593.padding,width:Math.max(_59c.width-(_593.padding*2),1),height:Math.max(_59c.height-(_593.padding*2)-_59e,1)}).html(tmp.contents());
wrap.css(_59c).fadeIn(_593.transitionIn=="none"?0:_593.speedIn,_5b4);
}
},_5bd=function(){
tmp.width(_590.width);
tmp.height(_590.height);
if(_590.width=="auto"){
_590.width=tmp.width();
}
if(_590.height=="auto"){
_590.height=tmp.height();
}
_5ba();
},_5be=function(){
busy=true;
_590.width=_596.width;
_590.height=_596.height;
$("<img />").attr({"id":"fancybox-img","src":_596.src,"alt":_590.title}).appendTo(tmp);
_5ba();
},_5bf=function(){
_5a0();
var obj=_591[_58f],href,type,_5c0,str,emb,_5c1,data;
_590=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_590:$(obj).data("fancybox")));
_5c0=obj.title||$(obj).title||_590.title||"";
if(obj.nodeName&&!_590.orig){
_590.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_5c0===""&&_590.orig){
_5c0=_590.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_590.href||jq(obj).attr("href")||null;
}else{
href=_590.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_590.type){
type=_590.type;
if(!href){
href=_590.content;
}
}else{
if(_590.content){
type="html";
}else{
if(href){
if(href.match(_597)){
type="image";
}else{
if(href.match(_598)){
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
_590.type=type;
_590.href=href;
_590.title=_5c0;
if(_590.autoDimensions&&_590.type!=="iframe"&&_590.type!=="swf"){
_590.width="auto";
_590.height="auto";
}
if(_590.modal){
_590.overlayShow=true;
_590.hideOnOverlayClick=false;
_590.hideOnContentClick=false;
_590.enableEscapeButton=false;
_590.showCloseButton=false;
}
if($.isFunction(_590.onStart)){
if(_590.onStart(_591,_58f,_590)===false){
busy=false;
return;
}
}
tmp.css("padding",(_59d+_590.padding+_590.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_58b.children());
});
switch(type){
case "html":
tmp.html(_590.content);
_5bd();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_58b.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_5bd();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_596=new Image();
_596.onerror=function(){
_5a1();
};
_596.onload=function(){
_596.onerror=null;
_596.onload=null;
_5be();
};
_596.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_590.width+"\" height=\""+_590.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_590.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_590.width+"\" height=\""+_590.height+"\""+emb+"></embed></object>";
tmp.html(str);
_5bd();
break;
case "ajax":
_5c1=href.split("#",2);
data=_590.ajax.data||{};
if(_5c1.length>1){
href=_5c1[0];
if(typeof data=="string"){
data+="&selector="+_5c1[1];
}else{
data.selector=_5c1[1];
}
}
busy=false;
$.fancybox.showActivity();
_595=$.ajax($.extend(_590.ajax,{url:href,data:data,error:_5a1,success:function(data,_5c2,_5c3){
if(_595.status==200){
tmp.html(data);
_5bd();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_590.scrolling+"\" src=\""+_590.href+"\"></iframe>").appendTo(tmp);
_5ba();
break;
}
},_5c4=function(){
if(!_588.is(":visible")){
clearInterval(_599);
return;
}
$("div",_588).css("top",(_59a*-40)+"px");
_59a=(_59a+1)%12;
},_5c5=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_588=$("<div id=\"fancybox-loading\"><div></div></div>"),_589=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_588.addClass("fancybox-ie");
}
_58a=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_58a.append(_58b=$("<div id=\"fancybox-inner\"></div>"),_58c=$("<a id=\"fancybox-close\"></a>"),_58d=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_58e=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_58c.click($.fancybox.close);
_588.click($.fancybox.cancel);
_58d.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_58e.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_59f){
_589.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_588.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_58a.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_5c6){
$(this).data("fancybox",$.extend({},_5c6,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_591=[];
_58f=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_591.push(this);
}else{
_591=$("a[rel="+rel+"], area[rel="+rel+"]");
_58f=_591.index(this);
}
_5bf();
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
_591=[];
_58f=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_591=jQuery.merge(_591,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_591.push(obj);
}
if(_58f>_591.length||_58f<0){
_58f=0;
}
_5bf();
};
$.fancybox.showActivity=function(){
clearInterval(_599);
_588.show();
_599=setInterval(_5c4,66);
};
$.fancybox.hideActivity=function(){
_588.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_592+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_592-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_594.length>pos){
_58f=pos;
_5bf();
}
if(_593.cyclic&&_594.length>1&&pos<0){
_58f=_594.length-1;
_5bf();
}
if(_593.cyclic&&_594.length>1&&pos>=_594.length){
_58f=0;
_5bf();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_5a0();
if(_590&&$.isFunction(_590.onCancel)){
_590.onCancel(_591,_58f,_590);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_593&&$.isFunction(_593.onCleanup)){
if(_593.onCleanup(_594,_592,_593)===false){
busy=false;
return;
}
}
_5a0();
$(_58c.add(_58d).add(_58e)).hide();
$("#fancybox-title").remove();
wrap.add(_58b).add(_589).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _5c7(){
_589.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_58b.empty();
if($.isFunction(_593.onClosed)){
_593.onClosed(_594,_592,_593);
}
_594=_590=[];
_592=_58f=0;
_593=_590={};
busy=false;
};
_58b.css("overflow","hidden");
if(_593.transitionOut=="elastic"){
_59b=_5b9();
var pos=wrap.position();
_59c={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_593.opacity){
_59c.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_593.speedOut,easing:_593.easingOut,step:_5b5,complete:_5c7});
}else{
wrap.fadeOut(_593.transitionOut=="none"?0:_593.speedOut,_5c7);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_58b.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_593.padding*2)+_59e});
_58b.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_5a2(),_5c8=_593.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_59e)+(_59d*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_59d*2)))*0.5);
to.top=Math.max(view[3]+_5c8,to.top);
to.left=Math.max(view[2]+_5c8,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_5c5();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_5c9){
this._container=jQuery(_5c9);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_5ca){
};
HubPages.Lightbox.f$=function(_5cb){
return jQuery(_5cb,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_5cc){
return jQuery(_5cc,this._container);
};
HubPages.Lightbox.MyPhotos=function(_5cd){
this._container=jQuery(_5cd);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_5ce,_5cf,_5d0){
if(_5ce!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_5cf.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_5cf.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_5cf);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_5d0<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_5ce,_5cf,_5d0+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_5d1){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_5d1);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_5d2,_5d3,_5d4){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_5d2[_5d3]).attr("href");
var _5d5=href.lastIndexOf("/");
var _5d6=_5d5==-1?0:href.slice(_5d5+1,-4);
this._currentImageId=_5d6;
jQuery.post("/xml/photos/locations/",{id:_5d6},jQuery.proxy(function(_5d7){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_5d6,_5d7,0);
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
HubPages.Lightbox.Slideshow=function(_5d8){
this._articleId=_5d8.id;
this._title=_5d8.title;
this._url=_5d8.url;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_5d8.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_5d9){
var id=_5d9.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_5d9);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_5d9.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(){
jQuery.ajax({async:false,data:{id:this._articleId},dataType:"json",error:function(jxhr,_5da,_5db){
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
jQuery("#fancybox-wrap").addClass("slide_image");
jQuery.each(data.images,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({href:"#"+this._articleId+"_"+i,rel:"slideshow_"+this._articleId,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._articleId+"_"+i}).addClass("content");
div.appendTo(this._container);
var _5dc=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_5dc.appendTo(div);
},this));
var _5dd=jQuery("<a />").attr("href","#related_slideshows_"+this._articleId);
_5dd.addClass("lightbox").attr("rel","slideshow_"+this._articleId);
_5dd.appendTo(this._container);
var _5de=jQuery("<div />").attr("id","related_slideshows_"+this._articleId);
_5de.addClass("related_slideshows");
if(data.related.length){
_5de.append("<h2>View These Related Slideshows</h2>");
}else{
_5de.append("<h2>This Hub has no related slideshows</h2>");
}
_5de.appendTo(this._container);
var list=jQuery("<ul />");
_5de.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_5de);
}
var _5df=jQuery("<li />");
_5df.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _5e0=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _5e1=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_5e1);
_5df.append(linkDiv);
_5df.append("<br />");
var _5e2=jQuery("<img />").attr("src",item.thumb);
_5e2.appendTo(_5e0);
_5e0.appendTo(_5df);
_5e0.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _5e3=jQuery("<div />").addClass("pinit_wrap");
_5e3.appendTo(this._socialBar);
var _5e4=jQuery("<div />").addClass("twitter_wrap").html(data.social.twitter);
_5e4.appendTo(this._socialBar);
var _5e5=jQuery("<div />").addClass("fb_share_wrap").html(data.social.fb_share);
_5e5.appendTo(this._socialBar);
this._container.append(this._socialBar.show());
this.c$("a.lightbox").fancybox(this.options);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
if(typeof FB!="undefined"){
FB.XFBML.parse(this._container.get(0));
}
};
HubPages.Lightbox.Slideshow.init=function(_5e6,_5e7,_5e8){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_5e6;
var _5e9=jQuery("#fancybox-wrap");
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("30%");
jQuery("body").delegate(".moduleImage div:not(.thumbnails) img","click",function(e){
var _5ea=HubPages.Lightbox.Slideshow.defaultHubId;
if(!HubPages.Lightbox.Slideshow._slides[_5ea]){
HubPages.Lightbox.Slideshow.create({id:_5ea,title:_5e7,url:_5e8});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1");
var _5eb="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
var link=jQuery(_5eb+":has(img[src*=\""+id+"\"])");
var _5ec=jQuery(_5eb).index(link);
HubPages.Lightbox.Slideshow._slides[_5ea].init();
if(_5ec>=0){
jQuery(".slideshow:first > a").eq(_5ec).click();
}
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._articleId);
var _5ed=this._container.size()==0;
if(_5ed){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_5ee,_5ef){
if(!jQuery("#fancybox-outer-title").length){
var _5f0=jQuery("<div />").attr("id","fancybox-outer-title");
var _5f1=jQuery("#fancybox-inner");
_5f1.before(_5f0);
}
var _5f2=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_5f2);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_5f3,_5f4){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_5f5,_5f6){
jQuery("#"+this._articleId+"_"+_5f6+" > img").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_5f7,_5f8){
jQuery.fancybox.hideActivity();
var _5f9=_5f8+1;
if(_5f9>=_5f7.length){
return;
}
var _5fa=HubPages.Lightbox.f$("#fancybox-inner");
_5fa.height(_5fa.height()-70).css("overflow","visible");
var _5fb=_5fa.find("> .content > img");
var _5fc=this._photoData.images[_5f8];
_5fb.css({maxWidth:(_5fa.innerWidth()-60)+"px",maxHeight:(_5fa.innerHeight()-100)+"px"});
if(_5fa.innerHeight()>0&&_5fb.height()>0){
var _5fd=(_5fa.innerHeight()-_5fb.height())/2;
_5fb.css("margin-top",_5fd+"px");
_5fb.css("visibility","visible");
}else{
_5fb.load(function(){
var _5fe=HubPages.Lightbox.f$("#fancybox-inner");
var _5ff=_5fe.find("> .content > img");
var _600=(_5fe.innerHeight()-_5ff.height())/2;
_5ff.css("margin-top",_600+"px");
_5ff.css("visibility","visible");
});
}
var _601=jQuery(_5f7[_5f8]).attr("rel");
var _602=jQuery("#"+_601).find(".content img");
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_5fc.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _603="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_603+="&labels="+escape(this._photoData.quantcastLabel);
}
var _604=new Image();
_604.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_603;
}
var _605=new Image();
_605.src=this._photoData.ctracking+"&"+(new Date()).getTime();
var _606=HubPages.Lightbox.f$("#fancybox-title");
if(_5fc.sourceUrl||_5fc.sourceName){
if(_5fc.sourceUrl){
var _607="<a href=\""+_5fc.sourceUrl+"\" target=\"_blank\">"+(_5fc.sourceName?_5fc.sourceName:_5fc.sourceUrl)+"</a>";
}else{
var _607="<b>"+_5fc.sourceName+"</b>";
}
_606.html(_606.text()+"<br />Source: "+_607);
}
_606.append(jQuery("<div />").html("Photo "+_5f9+" of "+this._photoData.images.length).addClass("slideshow-caption"));
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
if(_5fc.social.pinit){
this._socialBar.find(".pinit_wrap").html(_5fc.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
_5fb.after(this._socialBar.show());
};
(function(_608,_609){
var _60a=_608.document;
(function(){
var _60b=false,_60c=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _60d=this.prototype;
_60b=true;
var _60e=new this();
_60b=false;
for(var name in prop){
_60e[name]=typeof prop[name]=="function"&&typeof _60d[name]=="function"&&_60c.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_60d[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _60f(){
if(!_60b&&this.init){
this.init.apply(this,arguments);
}
};
_60f.prototype=_60e;
_60f.constructor=_60f;
_60f.extend=arguments.callee;
return _60f;
};
})();
var _610=JRClass.extend({init:function(_611,_612){
if(typeof _611=="string"){
this.video=_60a.getElementById(_611);
}else{
this.video=_611;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _610.options=="object"){
_V_.merge(this.options,_610.options);
}
if(typeof _612=="object"){
_V_.merge(this.options,_612);
}
if(this.getPreloadAttribute()!==_609){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_609){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_609){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_613){
if(this[_613+"Supported"]()){
this[_613+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_614,_615){
this.behaviors[name]=_614;
this.extend(_615);
},activateElement:function(_616,_617){
if(typeof _616=="string"){
_616=_60a.getElementById(_616);
}
this.behaviors[_617].call(this,_616);
},errors:[],warnings:[],warning:function(_618){
this.warnings.push(_618);
this.log(_618);
},history:[],log:function(_619){
if(!_619){
return;
}
if(typeof _619=="string"){
_619={type:_619};
}
if(_619.type){
this.history.push(_619.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_619.type);
}
catch(e){
try{
opera.postError(_619.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_61a){
if(!localStorage){
return;
}
try{
localStorage[key]=_61a;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_610.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _61b=this.video.getAttribute("preload");
if(_61b===""||_61b==="true"){
return "auto";
}
if(_61b==="false"){
return "none";
}
return _61b;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _61c=this.video.getAttribute("autoplay");
if(_61c==="false"){
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
for(var _61d in obj){
if(obj.hasOwnProperty(_61d)){
this[_61d]=obj[_61d];
}
}
}});
_610.player=_610.prototype;
_610.player.extend({flashSupported:function(){
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
var _61e=_610.flashPlayers[this.options.flashPlayer];
this.extend(_610.flashPlayers[this.options.flashPlayer].api);
(_61e.init.context(this))();
},getFlashElement:function(){
var _61f=this.video.children;
for(var i=0,j=_61f.length;i<j;i++){
if(_61f[i].className=="vjs-flash-fallback"){
return _61f[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _620=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_610.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _610.getFlashVersion()>=_620;
}});
_610.flashPlayers={};
_610.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_621){
if(_621!==_609){
this.element.width=_621;
this.box.style.width=_621+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_622){
if(_622!==_609){
this.element.height=_622;
this.box.style.height=_622+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_610.player.extend({linksSupported:function(){
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
_610.merge=function(obj1,obj2,safe){
for(var _623 in obj2){
if(obj2.hasOwnProperty(_623)&&(!safe||!obj1.hasOwnProperty(_623))){
obj1[_623]=obj2[_623];
}
}
return obj1;
};
_610.extend=function(obj){
this.merge(this,obj,true);
};
_610.extend({setupAllWhenReady:function(_624){
_610.options=_624;
_610.DOMReady(_610.setup);
},DOMReady:function(fn){
_610.addToDOMReady(fn);
},setup:function(_625,_626){
var _627=false,_628=[],_629;
if(!_625||_625=="All"){
_625=_610.getVideoJSTags();
}else{
if(typeof _625!="object"||_625.nodeType==1){
_625=[_625];
_627=true;
}
}
for(var i=0;i<_625.length;i++){
if(typeof _625[i]=="string"){
_629=_60a.getElementById(_625[i]);
}else{
_629=_625[i];
}
_628.push(new _610(_629,_626));
}
return (_627)?_628[0]:_628;
},getVideoJSTags:function(){
var _62a=_60a.getElementsByTagName("video"),_62b=[],_62c;
for(var i=0,j=_62a.length;i<j;i++){
_62c=_62a[i];
if(_62c.className.indexOf("video-js")!=-1){
_62b.push(_62c);
}
}
return _62b;
},browserSupportsVideo:function(){
if(typeof _610.videoSupport!="undefined"){
return _610.videoSupport;
}
_610.videoSupport=!!_60a.createElement("video").canPlayType;
return _610.videoSupport;
},getFlashVersion:function(){
if(typeof _610.flashVersion!="undefined"){
return _610.flashVersion;
}
var _62d=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_62d=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _608.ActiveXObject!="undefined"){
try{
var _62e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_62e){
_62d=parseInt(_62e.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_610.flashVersion=_62d;
return _610.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _610.isIPhone()||_610.isIPad();
},iOSVersion:function(){
var _62f=navigator.userAgent.match(/OS (\d+)_/i);
if(_62f&&_62f[1]){
return _62f[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _630=navigator.userAgent.match(/Android (\d+)\./i);
if(_630&&_630[1]){
return _630[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_610.isIE()){
_60a.createElement("video");
}
_608.VideoJS=_608._V_=_610;
_610.player.extend({html5Supported:function(){
if(_610.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_610.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_610.isAndroid()){
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
var _631=this.video.children;
for(var i=0,j=_631.length;i<j;i++){
if(_631[i].tagName.toUpperCase()=="SOURCE"){
var _632=this.video.canPlayType(_631[i].type)||this.canPlayExt(_631[i].src);
if(_632=="probably"||_632=="maybe"){
this.firstPlayableSource=_631[i];
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
var _633=src.match(/\.([^\.]+)$/);
if(_633&&_633[1]){
var ext=_633[1].toLowerCase();
if(_610.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_610.isIOS()){
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
},playerOnVideoProgress:function(_634){
this.setBufferedFromProgress(_634);
},setBufferedFromProgress:function(_635){
if(_635.total>0){
var _636=(_635.loaded/_635.total)*this.duration();
if(_636>this.values.bufferEnd){
this.values.bufferEnd=_636;
}
}
},iOSInterface:function(){
if(_610.iOSVersion()<4){
this.forceTheSource();
}
if(_610.isIPad()){
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
this.poster=_60a.createElement("img");
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
var _637=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_637.length;i<j;i++){
if(_637[i].getAttribute("kind")=="subtitles"&&_637[i].getAttribute("src")){
this.subtitlesSource=_637[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_638){
var _639=_638.split("\n"),line="",_63a,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_639.length;i++){
line=_V_.trim(_639[i]);
if(line){
_63a={id:line,index:this.subtitles.length};
line=_V_.trim(_639[++i]);
time=line.split(" --> ");
_63a.start=this.parseSubtitleTime(time[0]);
_63a.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_639.length;j++){
line=_V_.trim(_639[++i]);
if(!line){
break;
}
text.push(line);
}
_63a.text=text.join("<br/>");
this.subtitles.push(_63a);
}
}
},parseSubtitleTime:function(_63b){
var _63c=_63b.split(":"),time=0;
time+=parseFloat(_63c[0])*60*60;
time+=parseFloat(_63c[1])*60;
var _63d=_63c[2].split(/\.|,/);
time+=parseFloat(_63d[0]);
ms=parseFloat(_63d[1]);
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
},currentTime:function(_63e){
if(_63e!==_609){
try{
this.video.currentTime=_63e;
}
catch(e){
this.warning(_610.warnings.videoNotReady);
}
this.values.currentTime=_63e;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_609){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _63f=this.video.buffered.end(0);
if(_63f>this.values.bufferEnd){
this.values.bufferEnd=_63f;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_640){
if(_640!==_609){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_640)));
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
},width:function(_641){
if(_641!==_609){
this.video.width=_641;
this.box.style.width=_641+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_642){
if(_642!==_609){
this.video.height=_642;
this.box.style.height=_642+"px";
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
this.warning(_610.warnings.videoNotReady);
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
this.docOrigOverflow=_60a.documentElement.style.overflow;
_V_.addListener(_60a,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_608,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_60a.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_60a.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_608.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_60a.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_610.player.newBehavior("player",function(_643){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_644){
this.log(_644);
this.log(this.video.error);
},playerOnVideoPlay:function(_645){
this.hasPlayed=true;
},playerOnVideoPause:function(_646){
},playerOnVideoEnded:function(_647){
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
this.each(this.bufferedListeners,function(_648){
(_648.context(this))();
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
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_649){
this.each(this.currentTimeListeners,function(_64a){
(_64a.context(this))(_649||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_64b){
(_64b.context(this))();
});
}});
_610.player.newBehavior("mouseOverVideoReporter",function(_64c){
_V_.addListener(_64c,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_64c,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_64d){
var _64e=_64d.relatedTarget;
while(_64e&&_64e!==this.box){
_64e=_64e.parentNode;
}
if(_64e!==this.box){
this.hideControlBars();
}
}});
_610.player.newBehavior("box",function(_64f){
this.positionBox();
_V_.addClass(_64f,"vjs-paused");
this.activateElement(_64f,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_610.player.newBehavior("poster",function(_650){
this.activateElement(_650,"mouseOverVideoReporter");
this.activateElement(_650,"playButton");
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
var _651=this.video.getElementsByTagName("img");
if(_651.length>0){
this.video.poster=_651[0].src;
}
}
}});
_610.player.newBehavior("controlBar",function(_652){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_652);
_V_.addListener(_652,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_652,"mouseout",this.onControlBarsMouseOut.context(this));
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
},onControlBarsMouseOut:function(_653){
this.mouseIsOverControls=false;
}});
_610.player.newBehavior("playToggle",function(_654){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_654);
_V_.addListener(_654,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_655){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_656){
this.each(this.elements.playToggles,function(_657){
_V_.removeClass(_657,"vjs-paused");
_V_.addClass(_657,"vjs-playing");
});
},playTogglesOnPause:function(_658){
this.each(this.elements.playToggles,function(_659){
_V_.removeClass(_659,"vjs-playing");
_V_.addClass(_659,"vjs-paused");
});
}});
_610.player.newBehavior("playButton",function(_65a){
_V_.addListener(_65a,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_65b){
this.play();
}});
_610.player.newBehavior("pauseButton",function(_65c){
_V_.addListener(_65c,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_65d){
this.pause();
}});
_610.player.newBehavior("playProgressBar",function(_65e){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_65e);
},{updatePlayProgressBars:function(_65f){
var _660=(_65f!==_609)?_65f/this.duration():this.currentTime()/this.duration();
if(isNaN(_660)){
_660=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_660*100,2)+"%";
}
});
}});
_610.player.newBehavior("loadProgressBar",function(_661){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_661);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_610.player.newBehavior("currentTimeDisplay",function(_662){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_662);
},{updateCurrentTimeDisplays:function(_663){
if(!this.currentTimeDisplays){
return;
}
var time=(_663)?_663:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_610.player.newBehavior("durationDisplay",function(_664){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_664);
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
_610.player.newBehavior("currentTimeScrubber",function(_665){
_V_.addListener(_665,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_666,_667){
_666.preventDefault();
this.currentScrubber=_667;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_666);
_V_.addListener(_60a,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_60a,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_668){
this.setCurrentTimeWithScrubber(_668);
},onCurrentTimeScrubberMouseUp:function(_669){
_V_.unblockTextSelection();
_60a.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_60a.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_66a){
var _66b=_V_.getRelativePosition(_66a.pageX,this.currentScrubber);
var _66c=_66b*this.duration();
this.triggerCurrentTimeListeners(0,_66c);
if(_66c==this.duration()){
_66c=_66c-0.1;
}
this.currentTime(_66c);
}});
_610.player.newBehavior("volumeDisplay",function(_66d){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_66d);
this.updateVolumeDisplay(_66d);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_66e){
var _66f=Math.ceil(this.volume()*6);
this.each(_66e.children,function(_670,num){
if(num<_66f){
_V_.addClass(_670,"vjs-volume-level-on");
}else{
_V_.removeClass(_670,"vjs-volume-level-on");
}
});
}});
_610.player.newBehavior("volumeScrubber",function(_671){
_V_.addListener(_671,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_672,_673){
_V_.blockTextSelection();
this.currentScrubber=_673;
this.setVolumeWithScrubber(_672);
_V_.addListener(_60a,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_60a,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_674){
this.setVolumeWithScrubber(_674);
},onVolumeScrubberMouseUp:function(_675){
this.setVolumeWithScrubber(_675);
_V_.unblockTextSelection();
_60a.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_60a.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_676){
var _677=_V_.getRelativePosition(_676.pageX,this.currentScrubber);
this.volume(_677);
}});
_610.player.newBehavior("fullscreenToggle",function(_678){
_V_.addListener(_678,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_679){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_67a){
this.positionControlBars();
},fullscreenOnEscKey:function(_67b){
if(_67b.keyCode==27){
this.exitFullScreen();
}
}});
_610.player.newBehavior("bigPlayButton",function(_67c){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_67c);
this.activateElement(_67c,"playButton");
},{bigPlayButtonsOnPlay:function(_67d){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_67e){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_67f){
_67f.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_680){
_680.style.display="none";
});
}});
_610.player.newBehavior("spinner",function(_681){
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
this.spinners.push(_681);
},{showSpinners:function(){
this.each(this.spinners,function(_682){
_682.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_683){
_683.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_684){
_684.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_684.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_685){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_686){
this.showSpinners();
},spinnersOnVideoSeeking:function(_687){
},spinnersOnVideoSeeked:function(_688){
},spinnersOnVideoCanPlay:function(_689){
},spinnersOnVideoCanPlayThrough:function(_68a){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_68b){
this.showSpinners();
},spinnersOnVideoStalled:function(_68c){
},spinnersOnVideoSuspend:function(_68d){
},spinnersOnVideoPlaying:function(_68e){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_68f){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_610.player.newBehavior("subtitlesDisplay",function(_690){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_690);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _691=false,_692=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_692)?1:0;
while(true){
if(_692){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_691=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_691=i;
break;
}
i++;
}
}
if(_691!==false){
this.currentSubtitle=this.subtitles[_691];
this.lastSubtitleIndex=_691;
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
_610.extend({addClass:function(_693,_694){
if((" "+_693.className+" ").indexOf(" "+_694+" ")==-1){
_693.className=_693.className===""?_694:_693.className+" "+_694;
}
},removeClass:function(_695,_696){
if(_695.className.indexOf(_696)==-1){
return;
}
var _697=_695.className.split(/\s+/);
_697.splice(_697.lastIndexOf(_696),1);
_695.className=_697.join(" ");
},createElement:function(_698,_699){
return this.merge(_60a.createElement(_698),_699);
},blockTextSelection:function(){
_60a.body.focus();
_60a.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_60a.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _69a=Math.round(secs);
var _69b=Math.floor(_69a/60);
_69b=(_69b>=10)?_69b:"0"+_69b;
_69a=Math.floor(_69a%60);
_69a=(_69a>=10)?_69a:"0"+_69a;
return _69b+":"+_69a;
},getRelativePosition:function(x,_69c){
return Math.max(0,Math.min(1,(x-this.findPosX(_69c))/_69c.offsetWidth));
},findPosX:function(obj){
var _69d=obj.offsetLeft;
while(obj=obj.offsetParent){
_69d+=obj.offsetLeft;
}
return _69d;
},getComputedStyleValue:function(_69e,_69f){
return _608.getComputedStyle(_69e,null).getPropertyValue(_69f);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_6a0,type,_6a1){
if(_6a0.addEventListener){
_6a0.addEventListener(type,_6a1,false);
}else{
if(_6a0.attachEvent){
_6a0.attachEvent("on"+type,_6a1);
}
}
},removeListener:function(_6a2,type,_6a3){
if(_6a2.removeEventListener){
_6a2.removeEventListener(type,_6a3,false);
}else{
if(_6a2.attachEvent){
_6a2.detachEvent("on"+type,_6a3);
}
}
},get:function(url,_6a4){
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
var _6a5=new XMLHttpRequest();
_6a5.open("GET",url);
_6a5.onreadystatechange=function(){
if(_6a5.readyState==4&&_6a5.status==200){
_6a4(_6a5.responseText);
}
}.context(this);
_6a5.send();
},trim:function(_6a6){
return _6a6.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_60a.readyState==="complete"){
return _610.onDOMReady();
}
if(_60a.addEventListener){
_60a.addEventListener("DOMContentLoaded",_610.DOMContentLoaded,false);
_608.addEventListener("load",_610.onDOMReady,false);
}else{
if(_60a.attachEvent){
_60a.attachEvent("onreadystatechange",_610.DOMContentLoaded);
_608.attachEvent("onload",_610.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_60a.addEventListener){
_60a.removeEventListener("DOMContentLoaded",_610.DOMContentLoaded,false);
_610.onDOMReady();
}else{
if(_60a.attachEvent){
if(_60a.readyState==="complete"){
_60a.detachEvent("onreadystatechange",_610.DOMContentLoaded);
_610.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_610.DOMIsReady){
fn.call(_60a);
}else{
_610.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_610.DOMIsReady){
return;
}
if(!_60a.body){
return setTimeout(_610.onDOMReady,13);
}
_610.DOMIsReady=true;
if(_610.DOMReadyList){
for(var i=0;i<_610.DOMReadyList.length;i++){
_610.DOMReadyList[i].call(_60a);
}
_610.DOMReadyList=null;
}
}});
_610.bindDOMReady();
Function.prototype.context=function(obj){
var _6a7=this,temp=function(){
return _6a7.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _6a8=this,temp=function(){
var _6a9=this;
return _6a8.call(obj,arguments[0],_6a9);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_6aa){
if(this.hasContext===true){
return this;
}
if(!_6aa){
_6aa=obj;
}
for(var _6ab in _6aa){
if(_6aa[_6ab]==this){
_6aa[_6ab]=this.evtContext(obj);
_6aa[_6ab].hasContext=true;
return _6aa[_6ab];
}
}
return this.evtContext(obj);
};
if(_608.jQuery){
(function($){
$.fn.VideoJS=function(_6ac){
this.each(function(){
_610.setup(this,_6ac);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_608.VideoJS=_608._V_=_610;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_6ad){
var _6ae=((_6ad/15)|0)*15;
if(this.lastLoggedOffset!=_6ae&&!this.paused()){
var _6af=this.video.id.replace("hp_video_","");
var _6b0=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_6ae,videoId:_6af,rf:rf,isEmbed:_6b0}});
this.lastLoggedOffset=_6ae;
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
var _6b1=this.video.getAttribute("autostart");
if(_6b1==="false"){
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
var _6b2=document.createElement("div");
_6b2.style.height=videoTopAdjustment+"px";
_6b2.style.background="transparent";
_6b2.id="video_spacer";
v.before(_6b2);
}
var _6b3=v.offset()["top"]+v.outerHeight();
var _6b4=_6b3-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_6b4>0){
var _6b5=document.createElement("div");
_6b5.style.height=_6b4+"px";
_6b5.style.background="transparent";
_6b5.id="sidebar_spacer";
_6b5.className="sidebar_box";
sidebox.after(_6b5);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_6b6,_6b7,_6b8,exts){
jQuery(document).ready(function(){
var _6b9=0;
var _6ba={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_6b6},size_limit:_6b8,queue_limit:_6b7,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_6bb){
if(file.size==_6bb){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_6bc){
try{
var data=JSONstring.toObject(_6bc);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_6bc);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_6b9+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_6bd){
if(!_6b9&&_6bd){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_6b9=0;
},loaded_callback:function(_6be){
if(_6be){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _6bf=new imageUploader(_6ba);
});
};
function getHPVideoPlayer(){
var _6c0="talkiesplayer";
return $(_6c0);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _6c1=true;
if(data.percent){
var _6c2=data.percent;
jq("#progress_video_"+vId).width(_6c2+"%");
if(_6c2>90){
_6c1=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_6c1){
setTimeout(function(){
updateVideoProcessingBar(vId,mId);
},5000);
}
}});
};
var relatedHubStats={ifired:false,ifiredtarget:null,relatedhubstrackingenabled:false,relatedhubs:[],articleid:-1,recordRelatedHubClick:function(_6c3){
if(!this.relatedhubstrackingenabled){
return (true);
}
if(this.ifired){
window.location.href=jq(this.ifiredtarget).attr("href");
return (true);
}
var _6c4=_6c3.target;
if(jq(_6c4).attr("href")==undefined){
return (true);
}
var rel=jq(_6c4).attr("rel");
var pos1=rel.indexOf("_");
var pos2=rel.lastIndexOf("_");
var raid=rel.substring(pos2+1);
var rank=rel.substring(pos1+1,pos2);
var aid=this.articleid;
jq.get("/xml/stats/relatedhubevents.php?aid="+aid+"&type="+rank+"&raid="+raid,"",function(data){
jq(_6c4).trigger("click");
});
this.ifired=true;
this.ifiredtarget=_6c4;
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
},armRelatedHubEvents:function(_6c5,aid){
if(aid==2169847||Math.random()>_6c5){
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
function _6c6(){
var _6c7="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _6c8="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _6c9="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6c7),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_6c9),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_6c8),"gm"),css:"keyword bold"}];
};
_6c6.prototype=new SyntaxHighlighter.Highlighter();
_6c6.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_6c6;
typeof (exports)!="undefined"?exports.Brush=_6c6:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6ca(){
var _6cb="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _6cc(_6cd,_6ce){
var css=(_6cd[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_6cd[0],_6cd.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_6cc},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6cb),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6ca.prototype=new SyntaxHighlighter.Highlighter();
_6ca.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_6ca;
typeof (exports)!="undefined"?exports.Brush=_6ca:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6cf(){
function _6d0(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _6d1(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _6d2="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _6d3="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _6d4="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_6d0(_6d2),"gm"),css:"keyword"},{regex:new RegExp(_6d1(_6d3),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_6d4),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_6cf.prototype=new SyntaxHighlighter.Highlighter();
_6cf.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_6cf;
typeof (exports)!="undefined"?exports.Brush=_6cf:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d5(){
var _6d6="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_6d6),"gmi"),css:"keyword"}];
};
_6d5.prototype=new SyntaxHighlighter.Highlighter();
_6d5.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_6d5;
typeof (exports)!="undefined"?exports.Brush=_6d5:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6d7(){
function _6d8(_6d9,_6da){
var _6db=SyntaxHighlighter.Match,code=_6d9[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_6dc=[];
if(_6d9.attributes!=null){
var _6dd,_6de=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_6dd=_6de.exec(code))!=null){
_6dc.push(new _6db(_6dd.name,_6d9.index+_6dd.index,"color1"));
_6dc.push(new _6db(_6dd.value,_6d9.index+_6dd.index+_6dd[0].indexOf(_6dd.value),"string"));
}
}
if(tag!=null){
_6dc.push(new _6db(tag.name,_6d9.index+tag[0].indexOf(tag.name),"keyword"));
}
return _6dc;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_6d8}];
};
_6d7.prototype=new SyntaxHighlighter.Highlighter();
_6d7.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_6d7;
typeof (exports)!="undefined"?exports.Brush=_6d7:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6df(){
var _6e0="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_6e0),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_6df.prototype=new SyntaxHighlighter.Highlighter();
_6df.aliases=["java"];
SyntaxHighlighter.brushes.Java=_6df;
typeof (exports)!="undefined"?exports.Brush=_6df:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e1(){
var _6e2="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6e2),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_6e1.prototype=new SyntaxHighlighter.Highlighter();
_6e1.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_6e1;
typeof (exports)!="undefined"?exports.Brush=_6e1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e3(){
var _6e4="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _6e5="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _6e6="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_6e4),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_6e6),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_6e5),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_6e3.prototype=new SyntaxHighlighter.Highlighter();
_6e3.aliases=["php"];
SyntaxHighlighter.brushes.Php=_6e3;
typeof (exports)!="undefined"?exports.Brush=_6e3:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6e7(){
var _6e8="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _6e9="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _6ea="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_6e9),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_6e8),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_6ea),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6e7.prototype=new SyntaxHighlighter.Highlighter();
_6e7.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_6e7;
typeof (exports)!="undefined"?exports.Brush=_6e7:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6eb(){
var _6ec="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _6ed="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_6ec),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_6ed),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6eb.prototype=new SyntaxHighlighter.Highlighter();
_6eb.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_6eb;
typeof (exports)!="undefined"?exports.Brush=_6eb:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6ee(){
var _6ef="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _6f0="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _6f1="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_6ef),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_6f1),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_6f0),"gmi"),css:"keyword"}];
};
_6ee.prototype=new SyntaxHighlighter.Highlighter();
_6ee.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_6ee;
typeof (exports)!="undefined"?exports.Brush=_6ee:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f2(){
var _6f3="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_6f3),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_6f2.prototype=new SyntaxHighlighter.Highlighter();
_6f2.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_6f2;
typeof (exports)!="undefined"?exports.Brush=_6f2:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _6f4(){
function _6f5(_6f6,_6f7){
var _6f8=SyntaxHighlighter.Match,code=_6f6[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_6f9=[];
if(_6f6.attributes!=null){
var _6fa,_6fb=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_6fa=_6fb.exec(code))!=null){
_6f9.push(new _6f8(_6fa.name,_6f6.index+_6fa.index,"color1"));
_6f9.push(new _6f8(_6fa.value,_6f6.index+_6fa.index+_6fa[0].indexOf(_6fa.value),"string"));
}
}
if(tag!=null){
_6f9.push(new _6f8(tag.name,_6f6.index+tag[0].indexOf(tag.name),"keyword"));
}
return _6f9;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_6f5}];
};
_6f4.prototype=new SyntaxHighlighter.Highlighter();
_6f4.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_6f4;
typeof (exports)!="undefined"?exports.Brush=_6f4:null;
})();
function ClojureRegExp(_6fc){
_6fc=_6fc+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_6fc,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _6fd,_6fe;
while(_6fd=this.regex.exec(str)){
_6fe=str.substring(0,_6fd.index);
if(this.lookBehind.test(_6fe)){
return _6fd;
}else{
this.regex.lastIndex=_6fd.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _6ff=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_700="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_701){
_701=_701.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_701=_701.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_701+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_6ff)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_700)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _702(){
var _703="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _704="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_703),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_704),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_702.prototype=new SyntaxHighlighter.Highlighter();
_702.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_702;
typeof (exports)!="undefined"?exports.Brush=_702:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _705(){
var _706="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _707="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_706),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_707),"gm"),css:"functions"}];
};
_705.prototype=new SyntaxHighlighter.Highlighter();
_705.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_705;
typeof (exports)!="undefined"?exports.Brush=_705:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _708(){
var _709="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_709),"gm"),css:"keyword"}];
};
_708.prototype=new SyntaxHighlighter.Highlighter();
_708.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_708;
typeof (exports)!="undefined"?exports.Brush=_708:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _70a(){
var _70b="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _70c="void boolean byte char short int long float double";
var _70d="null";
var _70e="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_70b),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_70c),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_70d),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_70e),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_70a.prototype=new SyntaxHighlighter.Highlighter();
_70a.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_70a;
typeof (exports)!="undefined"?exports.Brush=_70a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _70f(){
var _710="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _711="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_710),"gm"),css:"keyword"},{regex:new RegExp(_711,"gm"),css:"keyword"}];
};
_70f.prototype=new SyntaxHighlighter.Highlighter();
_70f.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_70f;
typeof (exports)!="undefined"?exports.Brush=_70f:null;
})();
(function($){
$.fn.starrating=function(_712){
var _712=$.extend({},$.fn.starrating.options,_712||{});
return this.each(function(){
var o=$.meta?$.extend({},_712,$this.data()):_712;
var url=this.action,_713,_714,_715;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _716=div.find("div.star");
var _717=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_716.mouseover(_718).focus(_718).mouseout(_719).blur(_719).click(_71a);
_717.mouseover(_71b).focus(_71b).mouseout(_71c).blur(_71c).click(_71a);
}else{
_71d(div);
}
_71e();
function init(elem){
_713=$(elem).attr("title").split(/:\s*/)[1],_714=_713.split(".")[0],_715=_713.split(".")[1];
};
function _718(){
_71f();
fill(this);
};
function _719(){
_71f();
_71e();
};
function _71c(){
_71e();
$(this).removeClass("on");
};
function _71b(){
_71f();
$(this).addClass("on");
};
function _71d(elem){
_716.unbind();
_717.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _720=$(this).attr("title");
var _721="Average Rating: "+_713;
$(this).attr("title",_720.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_721).replace("Cancel Rating",_721));
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
function _71a(){
if(_716.index(this)==-1&&!o.cancelSubmit){
return false;
}
_714=_716.index(this)+1;
_715=0;
if(_714==0){
_71f();
}
var _722=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_722},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _723=$("div."+o.ratingClass);
init(_723);
_719();
if(o.disableOnSubmit){
_71d(_723);
}
}});
}else{
o.success(_722);
}
return false;
};
function fill(elem){
_716.find("a").css("width","100%");
$(_716[_716.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _71f(){
_716.removeClass("on hover");
};
function _71e(){
$(_716[_714-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _724=_715?_715*10:0;
if(_724>0){
$(_716[_714]).addClass("on").children("a").css("width",_724+"%");
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

