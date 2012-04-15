/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(!dojo._hasResource["dojo.date.stamp"]){
dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(_1,_2){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _3=dojo.date.stamp._isoRegExp.exec(_1);
var _4=null;
if(_3){
_3.shift();
if(_3[1]){
_3[1]--;
}
if(_3[6]){
_3[6]*=1000;
}
if(_2){
_2=new Date(_2);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(_5){
return _2["get"+_5]();
}).forEach(function(_6,_7){
if(_3[_7]===undefined){
_3[_7]=_6;
}
});
}
_4=new Date(_3[0]||1970,_3[1]||0,_3[2]||1,_3[3]||0,_3[4]||0,_3[5]||0,_3[6]||0);
var _8=0;
var _9=_3[7]&&_3[7].charAt(0);
if(_9!="Z"){
_8=((_3[8]||0)*60)+(Number(_3[9])||0);
if(_9!="-"){
_8*=-1;
}
}
if(_9){
_8-=_4.getTimezoneOffset();
}
if(_8){
_4.setTime(_4.getTime()+_8*60000);
}
}
return _4;
};
dojo.date.stamp.toISOString=function(_a,_b){
var _=function(n){
return (n<10)?"0"+n:n;
};
_b=_b||{};
var _e=[];
var _f=_b.zulu?"getUTC":"get";
var _10="";
if(_b.selector!="time"){
var _11=_a[_f+"FullYear"]();
_10=["0000".substr((_11+"").length)+_11,_(_a[_f+"Month"]()+1),_(_a[_f+"Date"]())].join("-");
}
_e.push(_10);
if(_b.selector!="date"){
var _12=[_(_a[_f+"Hours"]()),_(_a[_f+"Minutes"]()),_(_a[_f+"Seconds"]())].join(":");
var _13=_a[_f+"Milliseconds"]();
if(_b.milliseconds){
_12+="."+(_13<100?"0":"")+_(_13);
}
if(_b.zulu){
_12+="Z";
}else{
if(_b.selector!="time"){
var _14=_a.getTimezoneOffset();
var _15=Math.abs(_14);
_12+=(_14>0?"-":"+")+_(Math.floor(_15/60))+":"+_(_15%60);
}
}
_e.push(_12);
}
return _e.join("T");
};
}
if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){
var d=dojo;
var _17=d._scopeName+"Type";
var qry="["+_17+"]";
var _19=0,_1a={};
var _1b=function(_1c,_1d){
var nso=_1d||_1a;
if(dojo.isIE){
var cn=_1c["__dojoNameCache"];
if(cn&&nso[cn]===_1c){
return cn;
}
}
var _20;
do{
_20="__"+_19++;
}while(_20 in nso);
nso[_20]=_1c;
return _20;
};
function _21(_22){
if(d.isString(_22)){
return "string";
}
if(typeof _22=="number"){
return "number";
}
if(typeof _22=="boolean"){
return "boolean";
}
if(d.isFunction(_22)){
return "function";
}
if(d.isArray(_22)){
return "array";
}
if(_22 instanceof Date){
return "date";
}
if(_22 instanceof d._Url){
return "url";
}
return "object";
};
function _23(_24,_25){
switch(_25){
case "string":
return _24;
case "number":
return _24.length?Number(_24):NaN;
case "boolean":
return typeof _24=="boolean"?_24:!(_24.toLowerCase()=="false");
case "function":
if(d.isFunction(_24)){
_24=_24.toString();
_24=d.trim(_24.substring(_24.indexOf("{")+1,_24.length-1));
}
try{
if(_24.search(/[^\w\.]+/i)!=-1){
_24=_1b(new Function(_24),this);
}
return d.getObject(_24,false);
}
catch(e){
return new Function();
}
case "array":
return _24?_24.split(/\s*,\s*/):[];
case "date":
switch(_24){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_24);
}
case "url":
return d.baseUrl+_24;
default:
return d.fromJson(_24);
}
};
var _26={};
function _27(_28){
if(!_26[_28]){
var cls=d.getObject(_28);
if(!d.isFunction(cls)){
throw new Error("Could not load class '"+_28+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
}
var _2a=cls.prototype;
var _2b={},_2c={};
for(var _2d in _2a){
if(_2d.charAt(0)=="_"){
continue;
}
if(_2d in _2c){
continue;
}
var _2e=_2a[_2d];
_2b[_2d]=_21(_2e);
}
_26[_28]={cls:cls,params:_2b};
}
return _26[_28];
};
this._functionFromScript=function(_2f){
var _30="";
var _31="";
var _32=_2f.getAttribute("args");
if(_32){
d.forEach(_32.split(/\s*,\s*/),function(_33,idx){
_30+="var "+_33+" = arguments["+idx+"]; ";
});
}
var _35=_2f.getAttribute("with");
if(_35&&_35.length){
d.forEach(_35.split(/\s*,\s*/),function(_36){
_30+="with("+_36+"){";
_31+="}";
});
}
return new Function(_30+_2f.innerHTML+_31);
};
this.instantiate=function(_37,_38){
var _39=[];
_38=_38||{};
d.forEach(_37,function(_3a){
if(!_3a){
return;
}
var _3b=_17 in _38?_38[_17]:_3a.getAttribute(_17);
if(!_3b||!_3b.length){
return;
}
var _3c=_27(_3b),_3d=_3c.cls,ps=_3d._noScript||_3d.prototype._noScript;
var _3f={},_40=_3a.attributes;
for(var _41 in _3c.params){
var _42=_41 in _38?{value:_38[_41],specified:true}:_40.getNamedItem(_41);
if(!_42||(!_42.specified&&(!dojo.isIE||_41.toLowerCase()!="value"))){
continue;
}
var _43=_42.value;
switch(_41){
case "class":
_43="className" in _38?_38.className:_3a.className;
break;
case "style":
_43="style" in _38?_38.style:(_3a.style&&_3a.style.cssText);
}
var _44=_3c.params[_41];
if(typeof _43=="string"){
_3f[_41]=_23(_43,_44);
}else{
_3f[_41]=_43;
}
}
if(!ps){
var _45=[],_46=[];
d.query("> script[type^='dojo/']",_3a).orphan().forEach(function(_47){
var _48=_47.getAttribute("event"),_3b=_47.getAttribute("type"),nf=d.parser._functionFromScript(_47);
if(_48){
if(_3b=="dojo/connect"){
_45.push({event:_48,func:nf});
}else{
_3f[_48]=nf;
}
}else{
_46.push(nf);
}
});
}
var _4a=_3d["markupFactory"];
if(!_4a&&_3d["prototype"]){
_4a=_3d.prototype["markupFactory"];
}
var _4b=_4a?_4a(_3f,_3a,_3d):new _3d(_3f,_3a);
_39.push(_4b);
var _4c=_3a.getAttribute("jsId");
if(_4c){
d.setObject(_4c,_4b);
}
if(!ps){
d.forEach(_45,function(_4d){
d.connect(_4b,_4d.event,null,_4d.func);
});
d.forEach(_46,function(_4e){
_4e.call(_4b);
});
}
});
d.forEach(_39,function(_4f){
if(_4f&&_4f.startup&&!_4f._started&&(!_4f.getParent||!_4f.getParent())){
_4f.startup();
}
});
return _39;
};
this.parse=function(_50){
var _51=d.query(qry,_50);
var _52=this.instantiate(_51);
return _52;
};
}();
(function(){
var _53=function(){
if(dojo.config["parseOnLoad"]==true){
dojo.parser.parse();
}
};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){
dojo._loaders.splice(1,0,_53);
}else{
dojo._loaders.unshift(_53);
}
})();
}
if(!dojo._hasResource["dojo.dnd.common"]){
dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._isMac=navigator.appVersion.indexOf("Macintosh")>=0;
dojo.dnd._copyKey=dojo.dnd._isMac?"metaKey":"ctrlKey";
dojo.dnd.getCopyKeyState=function(e){
return e[dojo.dnd._copyKey];
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
dojo.dnd._lmb=dojo.isIE?1:0;
dojo.dnd._isLmbPressed=dojo.isIE?function(e){
return e.button&1;
}:function(e){
return e.button===0;
};
}
if(!dojo._hasResource["dojo.dnd.autoscroll"]){
dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){
var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){
return {w:dd.clientWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&w.innerWidth){
return {w:w.innerWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&dd&&dd.clientWidth){
return {w:dd.clientWidth,h:dd.clientHeight};
}else{
if(b.clientWidth){
return {w:b.clientWidth,h:b.clientHeight};
}
}
}
}
return null;
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.dnd.getViewport(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo._abs(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft,ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _6d=n.scrollLeft,_6e=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_6d!=n.scrollLeft||_6e!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
}
if(!dojo._hasResource["dojo.dnd.Mover"]){
dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(_6f,e,_71){
this.node=dojo.byId(_6f);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=this.host=_71,d=_6f.ownerDocument,_74=dojo.connect(d,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent),_74];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY});
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.dnd._isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left));
t=Math.round(parseFloat(s.top));
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this);
}
dojo.disconnect(this.events.pop());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
}
if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(_82,_83){
this.node=dojo.byId(_82);
if(!_83){
_83={};
}
this.handle=_83.handle?dojo.byId(_83.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_83.delay>0?_83.delay:0;
this.skip=_83.skip;
this.mover=_83.mover?_83.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_84,_85){
return new dojo.dnd.Moveable(_85,_84);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_8c){
dojo.publish("/dnd/move/start",[_8c]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_8d){
dojo.publish("/dnd/move/stop",[_8d]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_8e){
},onMove:function(_8f,_90){
this.onMoving(_8f,_90);
var s=_8f.node.style;
s.left=_90.l+"px";
s.top=_90.t+"px";
this.onMoved(_8f,_90);
},onMoving:function(_92,_93){
},onMoved:function(_94,_95){
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_96,_97){
return new dojo.dnd.move.constrainedMoveable(_97,_96);
},constructor:function(_98,_99){
if(!_99){
_99={};
}
this.constraints=_99.constraints;
this.within=_99.within;
},onFirstMove:function(_9a){
var c=this.constraintBox=this.constraints.call(this,_9a);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo.marginBox(_9a.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_9d,_9e){
var c=this.constraintBox,s=_9d.node.style;
s.left=(_9e.l<c.l?c.l:c.r<_9e.l?c.r:_9e.l)+"px";
s.top=(_9e.t<c.t?c.t:c.b<_9e.t?c.b:_9e.t)+"px";
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_a1,_a2){
return new dojo.dnd.move.boxConstrainedMoveable(_a2,_a1);
},constructor:function(_a3,_a4){
var box=_a4&&_a4.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_a6,_a7){
return new dojo.dnd.move.parentConstrainedMoveable(_a7,_a6);
},constructor:function(_a8,_a9){
var _aa=_a9&&_a9.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_aa=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_aa=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_aa=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.move.constrainedMover=function(fun,_b0){
dojo.deprecated("dojo.dnd.move.constrainedMover, use dojo.dnd.move.constrainedMoveable instead");
var _b1=function(_b2,e,_b4){
dojo.dnd.Mover.call(this,_b2,e,_b4);
};
dojo.extend(_b1,dojo.dnd.Mover.prototype);
dojo.extend(_b1,{onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t});
},onFirstMove:function(){
dojo.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(_b0){
var mb=dojo.marginBox(this.node);
c.r-=mb.w;
c.b-=mb.h;
}
}});
return _b1;
};
dojo.dnd.move.boxConstrainedMover=function(box,_bd){
dojo.deprecated("dojo.dnd.move.boxConstrainedMover, use dojo.dnd.move.boxConstrainedMoveable instead");
return dojo.dnd.move.constrainedMover(function(){
return box;
},_bd);
};
dojo.dnd.move.parentConstrainedMover=function(_be,_bf){
dojo.deprecated("dojo.dnd.move.parentConstrainedMover, use dojo.dnd.move.parentConstrainedMoveable instead");
var fun=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_be=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_be=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_be=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
return dojo.dnd.move.constrainedMover(fun,_bf);
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}
if(!dojo._hasResource["dojo.dnd.TimedMoveable"]){
dojo._hasResource["dojo.dnd.TimedMoveable"]=true;
dojo.provide("dojo.dnd.TimedMoveable");
(function(){
var _c5=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(_c6,_c7){
if(!_c7){
_c7={};
}
if(_c7.timeout&&typeof _c7.timeout=="number"&&_c7.timeout>=0){
this.timeout=_c7.timeout;
}
},markupFactory:function(_c8,_c9){
return new dojo.dnd.TimedMoveable(_c9,_c8);
},onMoveStop:function(_ca){
if(_ca._timer){
clearTimeout(_ca._timer);
_c5.call(this,_ca,_ca._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_cb,_cc){
_cb._leftTop=_cc;
if(!_cb._timer){
var _t=this;
_cb._timer=setTimeout(function(){
_cb._timer=null;
_c5.call(_t,_cb,_cb._leftTop);
},this.timeout);
}
}});
})();
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{constructor:function(_ce){
var _t=this;
dojo.mixin(_t,_ce);
_t.node=_ce.node;
_t._showArgs=dojo.mixin({},_ce);
_t._showArgs.node=_t.node;
_t._showArgs.duration=_t.showDuration;
_t.showAnim=_t.showFunc(_t._showArgs);
_t._hideArgs=dojo.mixin({},_ce);
_t._hideArgs.node=_t.node;
_t._hideArgs.duration=_t.hideDuration;
_t.hideAnim=_t.hideFunc(_t._hideArgs);
dojo.connect(_t.showAnim,"beforeBegin",dojo.hitch(_t.hideAnim,"stop",true));
dojo.connect(_t.hideAnim,"beforeBegin",dojo.hitch(_t.showAnim,"stop",true));
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(_d0){
return this.showAnim.play(_d0||0);
},hide:function(_d1){
return this.hideAnim.play(_d1||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_d3={_fire:function(evt,_d5){
if(this[evt]){
this[evt].apply(this,_d5||[]);
}
return this;
}};
var _d6=function(_d7){
this._index=-1;
this._animations=_d7||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_d6,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_d9,_da){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_da&&this._current.status()=="playing"){
return this;
}
var _db=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_dc=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_de=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_db);
d.disconnect(_dc);
d.disconnect(_de);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_e2,_e3){
this.pause();
var _e4=this.duration*_e2;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_e4){
this._current=a;
return true;
}
_e4-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_e4/this._current.duration,_e3);
}
return this;
},stop:function(_e6){
if(this._current){
if(_e6){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_d6,_d3);
dojo.fx.chain=function(_e9){
return new _d6(_e9);
};
var _ea=function(_eb){
this._animations=_eb||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_eb,function(a){
var _ed=a.duration;
if(a.delay){
_ed+=a.delay;
}
if(this.duration<_ed){
this.duration=_ed;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d._Animation({curve:[0,1],duration:this.duration});
var _ee=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop"],function(evt){
_ee._connects.push(d.connect(_ee._pseudoAnimation,evt,function(){
_ee._fire(evt,arguments);
}));
});
};
d.extend(_ea,{_doAction:function(_f0,_f1){
d.forEach(this._animations,function(a){
a[_f0].apply(a,_f1);
});
return this;
},_onEnd:function(){
if(++this._finished==this._animations.length){
this._fire("onEnd");
}
},_call:function(_f3,_f4){
var t=this._pseudoAnimation;
t[_f3].apply(t,_f4);
},play:function(_f6,_f7){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_f8,_f9){
var ms=this.duration*_f8;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_f9);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_fc){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_ea,_d3);
dojo.fx.combine=function(_fd){
return new _ea(_fd);
};
dojo.fx.wipeIn=function(_fe){
_fe.node=d.byId(_fe.node);
var _ff=_fe.node,s=_ff.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _103=d.style(_ff,"height");
return Math.max(_103,1);
}
},end:function(){
return _ff.scrollHeight;
}}}},_fe));
d.connect(anim,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return anim;
};
dojo.fx.wipeOut=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));
d.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(anim,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return anim;
};
dojo.fx.slideTo=function(args){
var node=args.node=d.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));
d.connect(anim,"beforeBegin",anim,init);
return anim;
};
})();
}
if(!dojo._hasResource["dijit._base.focus"]){
dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
var _113=dojo.doc;
if(_113.selection){
var s=_113.selection;
if(s.type=="Text"){
return !s.createRange().htmlText.length;
}else{
return !s.createRange().length;
}
}else{
var _115=dojo.global;
var _116=_115.getSelection();
if(dojo.isString(_116)){
return !_116;
}else{
return !_116||_116.isCollapsed||!_116.toString();
}
}
},getBookmark:function(){
var _117,_118=dojo.doc.selection;
if(_118){
var _119=_118.createRange();
if(_118.type.toUpperCase()=="CONTROL"){
if(_119.length){
_117=[];
var i=0,len=_119.length;
while(i<len){
_117.push(_119.item(i++));
}
}else{
_117=null;
}
}else{
_117=_119.getBookmark();
}
}else{
if(window.getSelection){
_118=dojo.global.getSelection();
if(_118){
_119=_118.getRangeAt(0);
_117=_119.cloneRange();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return _117;
},moveToBookmark:function(_11c){
var _11d=dojo.doc;
if(_11d.selection){
var _11e;
if(dojo.isArray(_11c)){
_11e=_11d.body.createControlRange();
dojo.forEach(_11c,function(n){
_11e.addElement(n);
});
}else{
_11e=_11d.selection.createRange();
_11e.moveToBookmark(_11c);
}
_11e.select();
}else{
var _120=dojo.global.getSelection&&dojo.global.getSelection();
if(_120&&_120.removeAllRanges){
_120.removeAllRanges();
_120.addRange(_11c);
}else{
console.warn("No idea how to restore selection for this browser!");
}
}
},getFocus:function(menu,_122){
return {node:menu&&dojo.isDescendant(dijit._curFocus,menu.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(_122||dojo.global,dijit.isCollapsed)?dojo.withGlobal(_122||dojo.global,dijit.getBookmark):null,openedForWindow:_122};
},focus:function(_123){
if(!_123){
return;
}
var node="node" in _123?_123.node:_123,_125=_123.bookmark,_126=_123.openedForWindow;
if(node){
var _127=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_127&&_127.focus){
try{
_127.focus();
}
catch(e){
}
}
dijit._onFocusNode(node);
}
if(_125&&dojo.withGlobal(_126||dojo.global,dijit.isCollapsed)){
if(_126){
_126.focus();
}
try{
dojo.withGlobal(_126||dojo.global,dijit.moveToBookmark,null,[_125]);
}
catch(e){
}
}
},_activeStack:[],registerIframe:function(_128){
dijit.registerWin(_128.contentWindow,_128);
},registerWin:function(_129,_12a){
dojo.connect(_129.document,"onmousedown",function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
dijit._onTouchNode(_12a||evt.target||evt.srcElement);
});
var doc=_129.document;
if(doc){
if(dojo.isIE){
doc.attachEvent("onactivate",function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"){
dijit._onFocusNode(_12a||evt.srcElement);
}
});
doc.attachEvent("ondeactivate",function(evt){
dijit._onBlurNode(_12a||evt.srcElement);
});
}else{
doc.addEventListener("focus",function(evt){
dijit._onFocusNode(_12a||evt.target);
},true);
doc.addEventListener("blur",function(evt){
dijit._onBlurNode(_12a||evt.target);
},true);
}
}
doc=null;
},_onBlurNode:function(node){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(node){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _133=[];
try{
while(node){
if(node.dijitPopupParent){
node=dijit.byId(node.dijitPopupParent).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===dojo.body()){
break;
}
node=dijit.getDocumentWindow(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
_133.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_133);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
dijit._onTouchNode(node);
if(node==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
},_setStack:function(_136){
var _137=dijit._activeStack;
dijit._activeStack=_136;
for(var _138=0;_138<Math.min(_137.length,_136.length);_138++){
if(_137[_138]!=_136[_138]){
break;
}
}
for(var i=_137.length-1;i>=_138;i--){
var _13a=dijit.byId(_137[i]);
if(_13a){
_13a._focused=false;
_13a._hasBeenBlurred=true;
if(_13a._onBlur){
_13a._onBlur();
}
if(_13a._setStateClass){
_13a._setStateClass();
}
dojo.publish("widgetBlur",[_13a]);
}
}
for(i=_138;i<_136.length;i++){
_13a=dijit.byId(_136[i]);
if(_13a){
_13a._focused=true;
if(_13a._onFocus){
_13a._onFocus();
}
if(_13a._setStateClass){
_13a._setStateClass();
}
dojo.publish("widgetFocus",[_13a]);
}
}
}});
dojo.addOnLoad(function(){
dijit.registerWin(window);
});
}
if(!dojo._hasResource["dijit._base.manager"]){
dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
},add:function(_13b){
if(this._hash[_13b.id]){
throw new Error("Tried to register widget with id=="+_13b.id+" but that id is already registered");
}
this._hash[_13b.id]=_13b;
},remove:function(id){
delete this._hash[id];
},forEach:function(func){
for(var id in this._hash){
func(this._hash[id]);
}
},filter:function(_13f){
var res=new dijit.WidgetSet();
this.forEach(function(_141){
if(_13f(_141)){
res.add(_141);
}
});
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
return this.filter(function(_144){
return _144.declaredClass==cls;
});
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(_145){
var id;
do{
id=_145+"_"+(_145 in dijit._widgetTypeCtr?++dijit._widgetTypeCtr[_145]:dijit._widgetTypeCtr[_145]=0);
}while(dijit.byId(id));
return id;
};
dijit.findWidgets=function(root){
var _148=[];
function _149(root){
var list=dojo.isIE?root.children:root.childNodes,i=0,node;
while(node=list[i++]){
if(node.nodeType!=1){
continue;
}
var _14e=node.getAttribute("widgetId");
if(_14e){
var _14f=dijit.byId(_14e);
_148.push(_14f);
}else{
_149(node);
}
}
};
_149(root);
return _148;
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dojo.forEach(dijit.findWidgets(dojo.body()),function(_150){
if(_150.destroyRecursive){
_150.destroyRecursive();
}else{
if(_150.destroy){
_150.destroy();
}
}
});
});
}
dijit.byId=function(id){
return (dojo.isString(id))?dijit.registry.byId(id):id;
};
dijit.byNode=function(node){
return dijit.registry.byId(node.getAttribute("widgetId"));
};
dijit.getEnclosingWidget=function(node){
while(node){
if(node.getAttribute&&node.getAttribute("widgetId")){
return dijit.registry.byId(node.getAttribute("widgetId"));
}
node=node.parentNode;
}
return null;
};
dijit._tabElements={area:true,button:true,input:true,object:true,select:true,textarea:true};
dijit._isElementShown=function(elem){
var _155=dojo.style(elem);
return (_155.visibility!="hidden")&&(_155.visibility!="collapsed")&&(_155.display!="none")&&(dojo.attr(elem,"type")!="hidden");
};
dijit.isTabNavigable=function(elem){
if(dojo.hasAttr(elem,"disabled")){
return false;
}
var _157=dojo.hasAttr(elem,"tabindex");
var _158=dojo.attr(elem,"tabindex");
if(_157&&_158>=0){
return true;
}
var name=elem.nodeName.toLowerCase();
if(((name=="a"&&dojo.hasAttr(elem,"href"))||dijit._tabElements[name])&&(!_157||_158>=0)){
return true;
}
return false;
};
dijit._getTabNavigable=function(root){
var _15b,last,_15d,_15e,_15f,_160;
var _161=function(_162){
dojo.query("> *",_162).forEach(function(_163){
var _164=dijit._isElementShown(_163);
if(_164&&dijit.isTabNavigable(_163)){
var _165=dojo.attr(_163,"tabindex");
if(!dojo.hasAttr(_163,"tabindex")||_165==0){
if(!_15b){
_15b=_163;
}
last=_163;
}else{
if(_165>0){
if(!_15d||_165<_15e){
_15e=_165;
_15d=_163;
}
if(!_15f||_165>=_160){
_160=_165;
_15f=_163;
}
}
}
}
if(_164&&_163.nodeName.toUpperCase()!="SELECT"){
_161(_163);
}
});
};
if(dijit._isElementShown(root)){
_161(root);
}
return {first:_15b,last:last,lowest:_15d,highest:_15f};
};
dijit.getFirstInTabbingOrder=function(root){
var _167=dijit._getTabNavigable(dojo.byId(root));
return _167.lowest?_167.lowest:_167.first;
};
dijit.getLastInTabbingOrder=function(root){
var _169=dijit._getTabNavigable(dojo.byId(root));
return _169.last?_169.last:_169.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
}
if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_16a){
this.pairs=[];
this.returnWrappers=_16a||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(name,_16c,wrap,_16e,_16f){
this.pairs[((_16f)?"unshift":"push")]([name,_16c,wrap,_16e]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}
if(!dojo._hasResource["dijit._base.place"]){
dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){
var _175=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _176=dojo._docScroll();
return {w:_175.clientWidth,h:_175.clientHeight,l:_176.x,t:_176.y};
};
dijit.placeOnScreen=function(node,pos,_179,_17a){
var _17b=dojo.map(_179,function(_17c){
var c={corner:_17c,pos:{x:pos.x,y:pos.y}};
if(_17a){
c.pos.x+=_17c.charAt(1)=="L"?_17a.x:-_17a.x;
c.pos.y+=_17c.charAt(0)=="T"?_17a.y:-_17a.y;
}
return c;
});
return dijit._place(node,_17b);
};
dijit._place=function(node,_17f,_180){
var view=dijit.getViewport();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(node);
}
var best=null;
dojo.some(_17f,function(_183){
var _184=_183.corner;
var pos=_183.pos;
if(_180){
_180(node,_183.aroundCorner,_184);
}
var _186=node.style;
var _187=_186.display;
var _188=_186.visibility;
_186.visibility="hidden";
_186.display="";
var mb=dojo.marginBox(node);
_186.display=_187;
_186.visibility=_188;
var _18a=(_184.charAt(1)=="L"?pos.x:Math.max(view.l,pos.x-mb.w)),_18b=(_184.charAt(0)=="T"?pos.y:Math.max(view.t,pos.y-mb.h)),endX=(_184.charAt(1)=="L"?Math.min(view.l+view.w,_18a+mb.w):pos.x),endY=(_184.charAt(0)=="T"?Math.min(view.t+view.h,_18b+mb.h):pos.y),_18e=endX-_18a,_18f=endY-_18b,_190=(mb.w-_18e)+(mb.h-_18f);
if(best==null||_190<best.overflow){
best={corner:_184,aroundCorner:_183.aroundCorner,x:_18a,y:_18b,w:_18e,h:_18f,overflow:_190};
}
return !_190;
});
node.style.left=best.x+"px";
node.style.top=best.y+"px";
if(best.overflow&&_180){
_180(node,best.aroundCorner,best.corner);
}
return best;
};
dijit.placeOnScreenAroundNode=function(node,_192,_193,_194){
_192=dojo.byId(_192);
var _195=_192.style.display;
_192.style.display="";
var _196=_192.offsetWidth;
var _197=_192.offsetHeight;
var _198=dojo.coords(_192,true);
_192.style.display=_195;
return dijit._placeOnScreenAroundRect(node,_198.x,_198.y,_196,_197,_193,_194);
};
dijit.placeOnScreenAroundRectangle=function(node,_19a,_19b,_19c){
return dijit._placeOnScreenAroundRect(node,_19a.x,_19a.y,_19a.width,_19a.height,_19b,_19c);
};
dijit._placeOnScreenAroundRect=function(node,x,y,_1a0,_1a1,_1a2,_1a3){
var _1a4=[];
for(var _1a5 in _1a2){
_1a4.push({aroundCorner:_1a5,corner:_1a2[_1a5],pos:{x:x+(_1a5.charAt(1)=="L"?0:_1a0),y:y+(_1a5.charAt(0)=="T"?0:_1a1)}});
}
return dijit._place(node,_1a4,_1a3);
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(node,_1ab,_1ac,_1ad){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
}
if(!dojo._hasResource["dijit._base.window"]){
dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){
if(dojo.isIE&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
}
if(!dojo._hasResource["dijit._base.popup"]){
dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){
var _1b0=[],_1b1=1000,_1b2=1;
this.prepare=function(node){
var s=node.style;
s.visibility="hidden";
s.position="absolute";
s.top="-9999px";
if(s.display=="none"){
s.display="";
}
dojo.body().appendChild(node);
};
this.open=function(args){
var _1b6=args.popup,_1b7=args.orient||{"BL":"TL","TL":"BL"},_1b8=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+_1b2++);
var _1ba=dojo.create("div",{id:id,"class":"dijitPopup",style:{zIndex:_1b1+_1b0.length,visibility:"hidden"}},dojo.body());
dijit.setWaiRole(_1ba,"presentation");
_1ba.style.left=_1ba.style.top="0px";
if(args.parent){
_1ba.dijitPopupParent=args.parent.id;
}
var s=_1b6.domNode.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_1ba.appendChild(_1b6.domNode);
var _1bc=new dijit.BackgroundIframe(_1ba);
var best=_1b8?dijit.placeOnScreenAroundElement(_1ba,_1b8,_1b7,_1b6.orient?dojo.hitch(_1b6,"orient"):null):dijit.placeOnScreen(_1ba,args,_1b7=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_1ba.style.visibility="visible";
var _1be=[];
var _1bf=function(){
for(var pi=_1b0.length-1;pi>0&&_1b0[pi].parent===_1b0[pi-1].widget;pi--){
}
return _1b0[pi];
};
_1be.push(dojo.connect(_1ba,"onkeypress",this,function(evt){
if(evt.charOrCode==dojo.keys.ESCAPE&&args.onCancel){
dojo.stopEvent(evt);
args.onCancel();
}else{
if(evt.charOrCode===dojo.keys.TAB){
dojo.stopEvent(evt);
var _1c2=_1bf();
if(_1c2&&_1c2.onCancel){
_1c2.onCancel();
}
}
}
}));
if(_1b6.onCancel){
_1be.push(dojo.connect(_1b6,"onCancel",null,args.onCancel));
}
_1be.push(dojo.connect(_1b6,_1b6.onExecute?"onExecute":"onChange",null,function(){
var _1c3=_1bf();
if(_1c3&&_1c3.onExecute){
_1c3.onExecute();
}
}));
_1b0.push({wrapper:_1ba,iframe:_1bc,widget:_1b6,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_1be});
if(_1b6.onOpen){
_1b6.onOpen(best);
}
return best;
};
this.close=function(_1c4){
while(dojo.some(_1b0,function(elem){
return elem.widget==_1c4;
})){
var top=_1b0.pop(),_1c7=top.wrapper,_1c8=top.iframe,_1c9=top.widget,_1ca=top.onClose;
if(_1c9.onClose){
_1c9.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(!_1c9||!_1c9.domNode){
return;
}
this.prepare(_1c9.domNode);
_1c8.destroy();
dojo.destroy(_1c7);
if(_1ca){
_1ca();
}
}
};
}();
dijit._frames=new function(){
var _1cb=[];
this.pop=function(){
var _1cc;
if(_1cb.length){
_1cc=_1cb.pop();
_1cc.style.display="";
}else{
if(dojo.isIE){
var burl=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+burl+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_1cc=dojo.doc.createElement(html);
}else{
_1cc=dojo.create("iframe");
_1cc.src="javascript:\"\"";
_1cc.className="dijitBackgroundIframe";
}
_1cc.tabIndex=-1;
dojo.body().appendChild(_1cc);
}
return _1cc;
};
this.push=function(_1cf){
_1cf.style.display="none";
if(dojo.isIE){
_1cf.style.removeExpression("width");
_1cf.style.removeExpression("height");
}
_1cb.push(_1cf);
};
}();
dijit.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(dojo.isIE<7||(dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){
var _1d1=dijit._frames.pop();
node.appendChild(_1d1);
if(dojo.isIE){
_1d1.style.setExpression("width",dojo._scopeName+".doc.getElementById('"+node.id+"').offsetWidth");
_1d1.style.setExpression("height",dojo._scopeName+".doc.getElementById('"+node.id+"').offsetHeight");
}
this.iframe=_1d1;
}
};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
}
if(!dojo._hasResource["dijit._base.scroll"]){
dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node){
try{
node=dojo.byId(node);
var doc=dojo.doc;
var body=dojo.body();
var html=body.parentNode;
if((!(dojo.isFF>=3||dojo.isIE||dojo.isWebKit)||node==body||node==html)&&(typeof node.scrollIntoView=="function")){
node.scrollIntoView(false);
return;
}
var ltr=dojo._isBodyLtr();
var _1d7=dojo.isIE>=8&&!_1d8;
var rtl=!ltr&&!_1d7;
var _1da=body;
var _1d8=doc.compatMode=="BackCompat";
if(_1d8){
html._offsetWidth=html._clientWidth=body._offsetWidth=body.clientWidth;
html._offsetHeight=html._clientHeight=body._offsetHeight=body.clientHeight;
}else{
if(dojo.isWebKit){
body._offsetWidth=body._clientWidth=html.clientWidth;
body._offsetHeight=body._clientHeight=html.clientHeight;
}else{
_1da=html;
}
html._offsetHeight=html.clientHeight;
html._offsetWidth=html.clientWidth;
}
function _1db(_1dc){
var ie=dojo.isIE;
return ((ie<=6||(ie>=7&&_1d8))?false:(dojo.style(_1dc,"position").toLowerCase()=="fixed"));
};
function _1de(_1df){
var _1e0=_1df.parentNode;
var _1e1=_1df.offsetParent;
if(_1e1==null||_1db(_1df)){
_1e1=html;
_1e0=(_1df==body)?html:null;
}
_1df._offsetParent=_1e1;
_1df._parent=_1e0;
var bp=dojo._getBorderExtents(_1df);
_1df._borderStart={H:(_1d7&&!ltr)?(bp.w-bp.l):bp.l,V:bp.t};
_1df._borderSize={H:bp.w,V:bp.h};
_1df._scrolledAmount={H:_1df.scrollLeft,V:_1df.scrollTop};
_1df._offsetSize={H:_1df._offsetWidth||_1df.offsetWidth,V:_1df._offsetHeight||_1df.offsetHeight};
_1df._offsetStart={H:(_1d7&&!ltr)?_1e1.clientWidth-_1df.offsetLeft-_1df._offsetSize.H:_1df.offsetLeft,V:_1df.offsetTop};
_1df._clientSize={H:_1df._clientWidth||_1df.clientWidth,V:_1df._clientHeight||_1df.clientHeight};
if(_1df!=body&&_1df!=html&&_1df!=node){
for(var dir in _1df._offsetSize){
var _1e4=_1df._offsetSize[dir]-_1df._clientSize[dir]-_1df._borderSize[dir];
var _1e5=_1df._clientSize[dir]>0&&_1e4>0;
if(_1e5){
_1df._offsetSize[dir]-=_1e4;
if(dojo.isIE&&rtl&&dir=="H"){
_1df._offsetStart[dir]+=_1e4;
}
}
}
}
};
var _1e6=node;
while(_1e6!=null){
if(_1db(_1e6)){
node.scrollIntoView(false);
return;
}
_1de(_1e6);
_1e6=_1e6._parent;
}
if(dojo.isIE&&node._parent){
var _1e7=node._offsetParent;
node._offsetStart.H+=_1e7._borderStart.H;
node._offsetStart.V+=_1e7._borderStart.V;
}
if(dojo.isIE>=7&&_1da==html&&rtl&&body._offsetStart&&body._offsetStart.H==0){
var _1e8=html.scrollWidth-html._offsetSize.H;
if(_1e8>0){
body._offsetStart.H=-_1e8;
}
}
if(dojo.isIE<=6&&!_1d8){
html._offsetSize.H+=html._borderSize.H;
html._offsetSize.V+=html._borderSize.V;
}
if(rtl&&body._offsetStart&&_1da==html&&html._scrolledAmount){
var ofs=body._offsetStart.H;
if(ofs<0){
html._scrolledAmount.H+=ofs;
body._offsetStart.H=0;
}
}
_1e6=node;
while(_1e6){
var _1ea=_1e6._parent;
if(!_1ea){
break;
}
if(_1ea.tagName=="TD"){
var _1eb=_1ea._parent._parent._parent;
if(_1ea!=_1e6._offsetParent&&_1ea._offsetParent!=_1e6._offsetParent){
_1ea=_1eb;
}
}
var _1ec=_1e6._offsetParent==_1ea;
for(var dir in _1e6._offsetStart){
var _1ee=dir=="H"?"V":"H";
if(rtl&&dir=="H"&&(_1ea!=html)&&(_1ea!=body)&&(dojo.isIE||dojo.isWebKit)&&_1ea._clientSize.H>0&&_1ea.scrollWidth>_1ea._clientSize.H){
var _1ef=_1ea.scrollWidth-_1ea._clientSize.H;
if(_1ef>0){
_1ea._scrolledAmount.H-=_1ef;
}
}
if(_1ea._offsetParent.tagName=="TABLE"){
if(dojo.isIE){
_1ea._offsetStart[dir]-=_1ea._offsetParent._borderStart[dir];
_1ea._borderStart[dir]=_1ea._borderSize[dir]=0;
}else{
_1ea._offsetStart[dir]+=_1ea._offsetParent._borderStart[dir];
}
}
if(dojo.isIE){
_1ea._offsetStart[dir]+=_1ea._offsetParent._borderStart[dir];
}
var _1f0=_1e6._offsetStart[dir]-_1ea._scrolledAmount[dir]-(_1ec?0:_1ea._offsetStart[dir])-_1ea._borderStart[dir];
var _1f1=_1f0+_1e6._offsetSize[dir]-_1ea._offsetSize[dir]+_1ea._borderSize[dir];
var _1f2=(dir=="H")?"scrollLeft":"scrollTop";
var _1f3=dir=="H"&&rtl;
var _1f4=_1f3?-_1f1:_1f0;
var _1f5=_1f3?-_1f0:_1f1;
var _1f6=(_1f4*_1f5<=0)?0:Math[(_1f4<0)?"max":"min"](_1f4,_1f5);
if(_1f6!=0){
var _1f7=_1ea[_1f2];
_1ea[_1f2]+=(_1f3)?-_1f6:_1f6;
var _1f8=_1ea[_1f2]-_1f7;
}
if(_1ec){
_1e6._offsetStart[dir]+=_1ea._offsetStart[dir];
}
_1e6._offsetStart[dir]-=_1ea[_1f2];
}
_1e6._parent=_1ea._parent;
_1e6._offsetParent=_1ea._offsetParent;
}
_1ea=node;
var next;
while(_1ea&&_1ea.removeAttribute){
next=_1ea.parentNode;
_1ea.removeAttribute("_offsetParent");
_1ea.removeAttribute("_parent");
_1ea=next;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
}
if(!dojo._hasResource["dijit._base.sniff"]){
dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){
var d=dojo,html=d.doc.documentElement,ie=d.isIE,_1fd=d.isOpera,maj=Math.floor,ff=d.isFF,_200=d.boxModel.replace(/-/,""),_201={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_iequirks:ie&&d.isQuirks,dj_opera:_1fd,dj_opera8:maj(_1fd)==8,dj_opera9:maj(_1fd)==9,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_gecko:d.isMozilla,dj_ff2:maj(ff)==2,dj_ff3:maj(ff)==3};
_201["dj_"+_200]=true;
for(var p in _201){
if(_201[p]){
if(html.className){
html.className+=" "+p;
}else{
html.className=p;
}
}
}
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
html.className+=" dijitRtl";
for(var p in _201){
if(_201[p]){
html.className+=" "+p+"-rtl";
}
}
}
});
})();
}
if(!dojo._hasResource["dijit._base.typematic"]){
dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_205,node,_207,obj,_209,_20a){
if(obj!=this._obj){
this.stop();
this._initialDelay=_20a||500;
this._subsequentDelay=_209||0.9;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_205,_207);
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_20c,_20d,_20e,_20f,_210){
if(_20c.keyCode){
_20c.charOrCode=_20c.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_20c.charCode){
_20c.charOrCode=String.fromCharCode(_20c.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_20c.charOrCode&&(_20c.ctrlKey===undefined||_20c.ctrlKey==evt.ctrlKey)&&(_20c.altKey===undefined||_20c.altKey==evt.ctrlKey)&&(_20c.shiftKey===undefined||_20c.shiftKey==evt.ctrlKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(_20c,_20d,node,_20e,_20c,_20f,_210);
}else{
if(dijit.typematic._obj==_20c){
dijit.typematic.stop();
}
}
}),dojo.connect(node,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_20c){
dijit.typematic.stop();
}
})];
},addMouseListener:function(node,_214,_215,_216,_217){
var dc=dojo.connect;
return [dc(node,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_214,node,_215,node,_216,_217);
}),dc(node,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
dojo.stopEvent(evt);
}),dc(node,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_214,node,_215,node,_216,_217);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_21e,_21f,_220,_221,_222,_223,_224){
return this.addKeyListener(_21f,_220,_221,_222,_223,_224).concat(this.addMouseListener(_21e,_221,_222,_223,_224));
}};
}
if(!dojo._hasResource["dijit._base.wai"]){
dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var div=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(div);
if(cs){
var _227=cs.backgroundImage;
var _228=(cs.borderTopColor==cs.borderRightColor)||(_227!=null&&(_227=="none"||_227=="url(invalid-url:)"));
dojo[_228?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
div.outerHTML="";
}else{
dojo.body().removeChild(div);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{_XhtmlRoles:/banner|contentinfo|definition|main|navigation|search|note|secondary|seealso/,hasWaiRole:function(elem,role){
var _22b=this.getWaiRole(elem);
return role?(_22b.indexOf(role)>-1):(_22b.length>0);
},getWaiRole:function(elem){
return dojo.trim((dojo.attr(elem,"role")||"").replace(this._XhtmlRoles,"").replace("wairole:",""));
},setWaiRole:function(elem,role){
var _22f=dojo.attr(elem,"role")||"";
if(dojo.isFF<3||!this._XhtmlRoles.test(_22f)){
dojo.attr(elem,"role",dojo.isFF<3?"wairole:"+role:role);
}else{
if((" "+_22f+" ").indexOf(" "+role+" ")<0){
var _230=dojo.trim(_22f.replace(this._XhtmlRoles,""));
var _231=dojo.trim(_22f.replace(_230,""));
dojo.attr(elem,"role",_231+(_231?" ":"")+role);
}
}
},removeWaiRole:function(elem,role){
var _234=dojo.attr(elem,"role");
if(!_234){
return;
}
if(role){
var _235=dojo.isFF<3?"wairole:"+role:role;
var t=dojo.trim((" "+_234+" ").replace(" "+_235+" "," "));
dojo.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_238){
if(dojo.isFF<3){
return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa",_238);
}
return elem.hasAttribute?elem.hasAttribute("aria-"+_238):!!elem.getAttribute("aria-"+_238);
},getWaiState:function(elem,_23a){
if(dojo.isFF<3){
return elem.getAttributeNS("http://www.w3.org/2005/07/aaa",_23a);
}
return elem.getAttribute("aria-"+_23a)||"";
},setWaiState:function(elem,_23c,_23d){
if(dojo.isFF<3){
elem.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+_23c,_23d);
}else{
elem.setAttribute("aria-"+_23c,_23d);
}
},removeWaiState:function(elem,_23f){
if(dojo.isFF<3){
elem.removeAttributeNS("http://www.w3.org/2005/07/aaa",_23f);
}else{
elem.removeAttribute("aria-"+_23f);
}
}});
}
if(!dojo._hasResource["dijit._base"]){
dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base");
}
if(!dojo._hasResource["dijit._Widget"]){
dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.require("dijit._base");
dojo.connect(dojo,"connect",function(_240,_241){
if(_240&&dojo.isFunction(_240._onConnect)){
_240._onConnect(_241);
}
});
dijit._connectOnUseEventHandler=function(_242){
};
(function(){
var _243={};
var _244=function(dc){
if(!_243[dc]){
var r=[];
var _247;
var _248=dojo.getObject(dc).prototype;
for(var _249 in _248){
if(dojo.isFunction(_248[_249])&&(_247=_249.match(/^_set([a-zA-Z]*)Attr$/))&&_247[1]){
r.push(_247[1].charAt(0).toLowerCase()+_247[1].substr(1));
}
}
_243[dc]=r;
}
return _243[dc]||[];
};
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")),postscript:function(_24a,_24b){
this.create(_24a,_24b);
},create:function(_24c,_24d){
this.srcNodeRef=dojo.byId(_24d);
this._connects=[];
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_24c){
this.params=_24c;
dojo.mixin(this,_24c);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _24f=this.srcNodeRef;
if(_24f&&_24f.parentNode){
_24f.parentNode.replaceChild(this.domNode,_24f);
}
for(attr in this.params){
this._onConnect(attr);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _250=function(attr,_252){
if((_252.params&&attr in _252.params)||_252[attr]){
_252.attr(attr,_252[attr]);
}
};
for(var attr in this.attributeMap){
_250(attr,this);
}
dojo.forEach(_244(this.declaredClass),function(a){
if(!(a in this.attributeMap)){
_250(a,this);
}
},this);
},postMixInProperties:function(){
},buildRendering:function(){
this.domNode=this.srcNodeRef||dojo.create("div");
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_255){
this.destroyDescendants(_255);
this.destroy(_255);
},destroy:function(_256){
this.uninitialize();
dojo.forEach(this._connects,function(_257){
dojo.forEach(_257,dojo.disconnect);
});
dojo.forEach(this._supportingWidgets||[],function(w){
if(w.destroy){
w.destroy();
}
});
this.destroyRendering(_256);
dijit.registry.remove(this.id);
},destroyRendering:function(_259){
if(this.bgIframe){
this.bgIframe.destroy(_259);
delete this.bgIframe;
}
if(this.domNode){
if(_259){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_259){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_25a){
dojo.forEach(this.getChildren(),function(_25b){
if(_25b.destroyRecursive){
_25b.destroyRecursive(_25a);
}
});
},uninitialize:function(){
return false;
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},_onConnect:function(_25d){
if(_25d in this._deferredConnects){
var _25e=this[this._deferredConnects[_25d]||"domNode"];
this.connect(_25e,_25d.toLowerCase(),_25d);
delete this._deferredConnects[_25d];
}
},_setClassAttr:function(_25f){
var _260=this[this.attributeMap["class"]||"domNode"];
dojo.removeClass(_260,this["class"]);
this["class"]=_25f;
dojo.addClass(_260,_25f);
},_setStyleAttr:function(_261){
var _262=this[this.attributeMap["style"]||"domNode"];
if(dojo.isObject(_261)){
dojo.style(_262,_261);
}else{
if(_262.style.cssText){
_262.style.cssText+="; "+_261;
}else{
_262.style.cssText=_261;
}
}
this["style"]=_261;
},setAttribute:function(attr,_264){
dojo.deprecated(this.declaredClass+"::setAttribute() is deprecated. Use attr() instead.","","2.0");
this.attr(attr,_264);
},_attrToDom:function(attr,_266){
var _267=this.attributeMap[attr];
dojo.forEach(dojo.isArray(_267)?_267:[_267],function(_268){
var _269=this[_268.node||_268||"domNode"];
var type=_268.type||"attribute";
switch(type){
case "attribute":
if(dojo.isFunction(_266)){
_266=dojo.hitch(this,_266);
}
if(/^on[A-Z][a-zA-Z]*$/.test(attr)){
attr=attr.toLowerCase();
}
dojo.attr(_269,attr,_266);
break;
case "innerHTML":
_269.innerHTML=_266;
break;
case "class":
dojo.removeClass(_269,this[attr]);
dojo.addClass(_269,_266);
break;
}
},this);
this[attr]=_266;
},attr:function(name,_26c){
var args=arguments.length;
if(args==1&&!dojo.isString(name)){
for(var x in name){
this.attr(x,name[x]);
}
return this;
}
var _26f=this._getAttrNames(name);
if(args==2){
if(this[_26f.s]){
return this[_26f.s](_26c)||this;
}else{
if(name in this.attributeMap){
this._attrToDom(name,_26c);
}
this[name]=_26c;
}
return this;
}else{
if(this[_26f.g]){
return this[_26f.g]();
}else{
return this[name];
}
}
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"};
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
if(this.containerNode){
var list=dojo.query("[widgetId]",this.containerNode);
return list.map(dijit.byNode);
}else{
return [];
}
},getChildren:function(){
if(this.containerNode){
return dijit.findWidgets(this.containerNode);
}else{
return [];
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_275,_276){
var d=dojo;
var dc=dojo.connect;
var _279=[];
if(_275=="ondijitclick"){
if(!this.nodesWithKeyClick[obj.nodeName]){
var m=d.hitch(this,_276);
_279.push(dc(obj,"onkeydown",this,function(e){
if(!d.isFF&&e.keyCode==d.keys.ENTER&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}else{
if(e.keyCode==d.keys.SPACE){
d.stopEvent(e);
}
}
}),dc(obj,"onkeyup",this,function(e){
if(e.keyCode==d.keys.SPACE&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}
}));
if(d.isFF){
_279.push(dc(obj,"onkeypress",this,function(e){
if(e.keyCode==d.keys.ENTER&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}
}));
}
}
_275="onclick";
}
_279.push(dc(obj,_275,this,_276));
this._connects.push(_279);
return _279;
},disconnect:function(_27e){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_27e){
dojo.forEach(_27e,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return dojo._isBodyLtr();
},isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},placeAt:function(_280,_281){
if(_280["declaredClass"]&&_280["addChild"]){
_280.addChild(this,_281);
}else{
dojo.place(this.domNode,_280,_281);
}
return this;
}});
})();
}
if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_28b,map,_28d,_28e){
_28e=_28e||dojo.global;
_28d=(!_28d)?function(v){
return v;
}:dojo.hitch(_28e,_28d);
return _28b.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_290,key,_292){
var _293=dojo.getObject(key,false,map);
if(_292){
_293=dojo.getObject(_292,false,_28e).call(_28e,_293,key);
}
return _28d(_293,key).toString();
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
if(!dojo._hasResource["dijit._Templated"]){
dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_stringRepl:function(tmpl){
var _297=this.declaredClass,_298=this;
return dojo.string.substitute(tmpl,this,function(_299,key){
if(key.charAt(0)=="!"){
_299=dojo.getObject(key.substr(1),false,_298);
}
if(typeof _299=="undefined"){
throw new Error(_297+" template:"+key);
}
if(_299==null){
return "";
}
return key.charAt(0)=="!"?_299:_299.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _29b=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(_29b)){
node=dojo._toDom(this._stringRepl(_29b));
}else{
node=_29b.cloneNode(true);
}
this.domNode=node;
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._supportingWidgets=dojo.parser.parse(node));
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_2a0){
var dest=this.containerNode;
if(_2a0&&dest){
while(_2a0.hasChildNodes()){
dest.appendChild(_2a0.firstChild);
}
}
},_attachTemplateNodes:function(_2a2,_2a3){
_2a3=_2a3||function(n,p){
return n.getAttribute(p);
};
var _2a6=dojo.isArray(_2a2)?_2a2:(_2a2.all||_2a2.getElementsByTagName("*"));
var x=dojo.isArray(_2a2)?0:-1;
for(;x<_2a6.length;x++){
var _2a8=(x==-1)?_2a2:_2a6[x];
if(this.widgetsInTemplate&&_2a3(_2a8,"dojoType")){
continue;
}
var _2a9=_2a3(_2a8,"dojoAttachPoint");
if(_2a9){
var _2aa,_2ab=_2a9.split(/\s*,\s*/);
while((_2aa=_2ab.shift())){
if(dojo.isArray(this[_2aa])){
this[_2aa].push(_2a8);
}else{
this[_2aa]=_2a8;
}
}
}
var _2ac=_2a3(_2a8,"dojoAttachEvent");
if(_2ac){
var _2ad,_2ae=_2ac.split(/\s*,\s*/);
var trim=dojo.trim;
while((_2ad=_2ae.shift())){
if(_2ad){
var _2b0=null;
if(_2ad.indexOf(":")!=-1){
var _2b1=_2ad.split(":");
_2ad=trim(_2b1[0]);
_2b0=trim(_2b1[1]);
}else{
_2ad=trim(_2ad);
}
if(!_2b0){
_2b0=_2ad;
}
this.connect(_2a8,_2ad,_2b0);
}
}
}
var role=_2a3(_2a8,"waiRole");
if(role){
dijit.setWaiRole(_2a8,role);
}
var _2b3=_2a3(_2a8,"waiState");
if(_2b3){
dojo.forEach(_2b3.split(/\s*,\s*/),function(_2b4){
if(_2b4.indexOf("-")!=-1){
var pair=_2b4.split("-");
dijit.setWaiState(_2a8,pair[0],pair[1]);
}
});
}
}
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_2b6,_2b7,_2b8){
var _2b9=dijit._Templated._templateCache;
var key=_2b7||_2b6;
var _2bb=_2b9[key];
if(_2bb){
if(!_2bb.ownerDocument||_2bb.ownerDocument==dojo.doc){
return _2bb;
}
dojo.destroy(_2bb);
}
if(!_2b7){
_2b7=dijit._Templated._sanitizeTemplateString(dojo.trim(dojo._getText(_2b6)));
}
_2b7=dojo.string.trim(_2b7);
if(_2b8||_2b7.match(/\$\{([^\}]+)\}/g)){
return (_2b9[key]=_2b7);
}else{
return (_2b9[key]=dojo._toDom(_2b7));
}
};
dijit._Templated._sanitizeTemplateString=function(_2bc){
if(_2bc){
_2bc=_2bc.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _2bd=_2bc.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_2bd){
_2bc=_2bd[1];
}
}else{
_2bc="";
}
return _2bc;
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _2be=dijit._Templated._templateCache;
for(var key in _2be){
var _2c0=_2be[key];
if(!isNaN(_2c0.nodeType)){
dojo.destroy(_2c0);
}
delete _2be[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}
if(!dojo._hasResource["dijit.form._FormMixin"]){
dojo._hasResource["dijit.form._FormMixin"]=true;
dojo.provide("dijit.form._FormMixin");
dojo.declare("dijit.form._FormMixin",null,{reset:function(){
dojo.forEach(this.getDescendants(),function(_2c1){
if(_2c1.reset){
_2c1.reset();
}
});
},validate:function(){
var _2c2=false;
return dojo.every(dojo.map(this.getDescendants(),function(_2c3){
_2c3._hasBeenBlurred=true;
var _2c4=_2c3.disabled||!_2c3.validate||_2c3.validate();
if(!_2c4&&!_2c2){
dijit.scrollIntoView(_2c3.containerNode||_2c3.domNode);
_2c3.focus();
_2c2=true;
}
return _2c4;
}),function(item){
return item;
});
},setValues:function(val){
dojo.deprecated(this.declaredClass+"::setValues() is deprecated. Use attr('value', val) instead.","","2.0");
return this.attr("value",val);
},_setValueAttr:function(obj){
var map={};
dojo.forEach(this.getDescendants(),function(_2c9){
if(!_2c9.name){
return;
}
var _2ca=map[_2c9.name]||(map[_2c9.name]=[]);
_2ca.push(_2c9);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _2cc=map[name],_2cd=dojo.getObject(name,false,obj);
if(_2cd===undefined){
continue;
}
if(!dojo.isArray(_2cd)){
_2cd=[_2cd];
}
if(typeof _2cc[0].checked=="boolean"){
dojo.forEach(_2cc,function(w,i){
w.attr("value",dojo.indexOf(_2cd,w.value)!=-1);
});
}else{
if(_2cc[0]._multiValue){
_2cc[0].attr("value",_2cd);
}else{
dojo.forEach(_2cc,function(w,i){
w.attr("value",_2cd[i]);
});
}
}
}
},getValues:function(){
dojo.deprecated(this.declaredClass+"::getValues() is deprecated. Use attr('value') instead.","","2.0");
return this.attr("value");
},_getValueAttr:function(){
var obj={};
dojo.forEach(this.getDescendants(),function(_2d3){
var name=_2d3.name;
if(!name||_2d3.disabled){
return;
}
var _2d5=_2d3.attr("value");
if(typeof _2d3.checked=="boolean"){
if(/Radio/.test(_2d3.declaredClass)){
if(_2d5!==false){
dojo.setObject(name,_2d5,obj);
}else{
_2d5=dojo.getObject(name,false,obj);
if(_2d5===undefined){
dojo.setObject(name,null,obj);
}
}
}else{
var ary=dojo.getObject(name,false,obj);
if(!ary){
ary=[];
dojo.setObject(name,ary,obj);
}
if(_2d5!==false){
ary.push(_2d5);
}
}
}else{
dojo.setObject(name,_2d5,obj);
}
});
return obj;
},isValid:function(){
this._invalidWidgets=dojo.filter(this.getDescendants(),function(_2d7){
return !_2d7.disabled&&_2d7.isValid&&!_2d7.isValid();
});
return !this._invalidWidgets.length;
},onValidStateChange:function(_2d8){
},_widgetChange:function(_2d9){
var _2da=this._lastValidState;
if(!_2d9||this._lastValidState===undefined){
_2da=this.isValid();
if(this._lastValidState===undefined){
this._lastValidState=_2da;
}
}else{
if(_2d9.isValid){
this._invalidWidgets=dojo.filter(this._invalidWidgets||[],function(w){
return (w!=_2d9);
},this);
if(!_2d9.isValid()&&!_2d9.attr("disabled")){
this._invalidWidgets.push(_2d9);
}
_2da=(this._invalidWidgets.length===0);
}
}
if(_2da!==this._lastValidState){
this._lastValidState=_2da;
this.onValidStateChange(_2da);
}
},connectChildren:function(){
dojo.forEach(this._changeConnections,dojo.hitch(this,"disconnect"));
var _2dc=this;
var _2dd=this._changeConnections=[];
dojo.forEach(dojo.filter(this.getDescendants(),function(item){
return item.validate;
}),function(_2df){
_2dd.push(_2dc.connect(_2df,"validate",dojo.hitch(_2dc,"_widgetChange",_2df)));
_2dd.push(_2dc.connect(_2df,"_setDisabledAttr",dojo.hitch(_2dc,"_widgetChange",_2df)));
});
this._widgetChange(null);
},startup:function(){
this.inherited(arguments);
this._changeConnections=[];
this.connectChildren();
}});
}
if(!dojo._hasResource["dijit._DialogMixin"]){
dojo._hasResource["dijit._DialogMixin"]=true;
dojo.provide("dijit._DialogMixin");
dojo.declare("dijit._DialogMixin",null,{attributeMap:dijit._Widget.prototype.attributeMap,execute:function(_2e0){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.attr("value"));
},_getFocusItems:function(_2e1){
var _2e2=dijit._getTabNavigable(dojo.byId(_2e1));
this._firstFocusItem=_2e2.lowest||_2e2.first||_2e1;
this._lastFocusItem=_2e2.last||_2e2.highest||this._firstFocusItem;
if(dojo.isMoz&&this._firstFocusItem.tagName.toLowerCase()=="input"&&dojo.attr(this._firstFocusItem,"type").toLowerCase()=="file"){
dojo.attr(_2e1,"tabindex","0");
this._firstFocusItem=_2e1;
}
}});
}
if(!dojo._hasResource["dijit.DialogUnderlay"]){
dojo._hasResource["dijit.DialogUnderlay"]=true;
dojo.provide("dijit.DialogUnderlay");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' dojoAttachPoint='node'></div></div>",dialogId:"","class":"",attributeMap:{id:"domNode"},_setDialogIdAttr:function(id){
dojo.attr(this.node,"id",id+"_underlay");
},_setClassAttr:function(_2e4){
this.node.className="dijitDialogUnderlay "+_2e4;
},postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _2e7=dijit.getViewport();
os.top=_2e7.t+"px";
os.left=_2e7.l+"px";
is.width=_2e7.w+"px";
is.height=_2e7.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},hide:function(){
this.domNode.style.display="none";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
},uninitialize:function(){
if(this.bgIframe){
this.bgIframe.destroy();
}
}});
}
if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
for(var p=this.domNode.parentNode;p;p=p.parentNode){
var id=p.getAttribute&&p.getAttribute("widgetId");
if(id){
var _2ea=dijit.byId(id);
return _2ea.isContainer?_2ea:null;
}
}
return null;
},_getSibling:function(_2eb){
var node=this.domNode;
do{
node=node[_2eb+"Sibling"];
}while(node&&node.nodeType!=1);
if(!node){
return null;
}
var id=node.getAttribute("widgetId");
return dijit.byId(id);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_2ef,_2f0){
var _2f1=this.containerNode;
if(_2f0&&typeof _2f0=="number"){
var _2f2=this.getChildren();
if(_2f2&&_2f2.length>=_2f0){
_2f1=_2f2[_2f0-1].domNode;
_2f0="after";
}
}
dojo.place(_2ef.domNode,_2f1,_2f0);
if(this._started&&!_2ef._started){
_2ef.startup();
}
},removeChild:function(_2f3){
if(typeof _2f3=="number"&&_2f3>0){
_2f3=this.getChildren()[_2f3];
}
if(!_2f3||!_2f3.domNode){
return;
}
var node=_2f3.domNode;
node.parentNode.removeChild(node);
},_nextElement:function(node){
do{
node=node.nextSibling;
}while(node&&node.nodeType!=1);
return node;
},_firstElement:function(node){
node=node.firstChild;
if(node&&node.nodeType!=1){
node=this._nextElement(node);
}
return node;
},getChildren:function(){
return dojo.query("> [widgetId]",this.containerNode).map(dijit.byNode);
},hasChildren:function(){
return !!this._firstElement(this.containerNode);
},destroyDescendants:function(_2f7){
dojo.forEach(this.getChildren(),function(_2f8){
_2f8.destroyRecursive(_2f7);
});
},_getSiblingOfChild:function(_2f9,dir){
var node=_2f9.domNode;
var _2fc=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_2fc];
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node?dijit.byNode(node):null;
},getIndexOfChild:function(_2fd){
var _2fe=this.getChildren();
for(var i=0,c;c=_2fe[i];i++){
if(c==_2fd){
return i;
}
}
return -1;
}});
}
if(!dojo._hasResource["dijit.layout._LayoutWidget"]){
dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,postCreate:function(){
dojo.addClass(this.domNode,"dijitContainer");
dojo.addClass(this.domNode,this.baseClass);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_301){
_301.startup();
});
if(!this.getParent||!this.getParent()){
this.resize();
this._viewport=dijit.getViewport();
this.connect(dojo.global,"onresize",function(){
var _302=dijit.getViewport();
if(_302.w!=this._viewport.w||_302.h!=this._viewport.h){
this._viewport=_302;
this.resize();
}
});
}
this.inherited(arguments);
},resize:function(_303,_304){
var node=this.domNode;
if(_303){
dojo.marginBox(node,_303);
if(_303.t){
node.style.top=_303.t+"px";
}
if(_303.l){
node.style.left=_303.l+"px";
}
}
var mb=_304||{};
dojo.mixin(mb,_303||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(node),mb);
}
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var be=dojo._getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=dojo._getPadExtents(node,cs);
this._contentBox={l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_30c){
dojo.addClass(_30c.domNode,this.baseClass+"-child");
if(_30c.baseClass){
dojo.addClass(_30c.domNode,this.baseClass+"-"+_30c.baseClass);
}
},addChild:function(_30d,_30e){
this.inherited(arguments);
if(this._started){
this._setupChild(_30d);
}
},removeChild:function(_30f){
dojo.removeClass(_30f.domNode,this.baseClass+"-child");
if(_30f.baseClass){
dojo.removeClass(_30f.domNode,this.baseClass+"-"+_30f.baseClass);
}
this.inherited(arguments);
}});
dijit.layout.marginBox2contentBox=function(node,mb){
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var pb=dojo._getPadBorderExtents(node,cs);
return {l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _315=function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
var size=function(_318,dim){
_318.resize?_318.resize(dim):dojo.marginBox(_318.domNode,dim);
dojo.mixin(_318,dojo.marginBox(_318.domNode));
dojo.mixin(_318,dim);
};
dijit.layout.layoutChildren=function(_31a,dim,_31c){
dim=dojo.mixin({},dim);
dojo.addClass(_31a,"dijitLayoutContainer");
_31c=dojo.filter(_31c,function(item){
return item.layoutAlign!="client";
}).concat(dojo.filter(_31c,function(item){
return item.layoutAlign=="client";
}));
dojo.forEach(_31c,function(_31f){
var elm=_31f.domNode,pos=_31f.layoutAlign;
var _322=elm.style;
_322.left=dim.l+"px";
_322.top=dim.t+"px";
_322.bottom=_322.right="auto";
dojo.addClass(elm,"dijitAlign"+_315(pos));
if(pos=="top"||pos=="bottom"){
size(_31f,{w:dim.w});
dim.h-=_31f.h;
if(pos=="top"){
dim.t+=_31f.h;
}else{
_322.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
size(_31f,{h:dim.h});
dim.w-=_31f.w;
if(pos=="left"){
dim.l+=_31f.w;
}else{
_322.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"){
size(_31f,dim);
}
}
}
});
};
})();
}
if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
(function(){
var _323=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(node,cont,_327){
if(_327){
dojo.html._emptyNode(node);
}
if(typeof cont=="string"){
var pre="",post="",walk=0,name=node.nodeName.toLowerCase();
switch(name){
case "tr":
pre="<tr>";
post="</tr>";
walk+=1;
case "tbody":
case "thead":
pre="<tbody>"+pre;
post+="</tbody>";
walk+=1;
case "table":
pre="<table>"+pre;
post+="</table>";
walk+=1;
break;
}
if(walk){
var n=node.ownerDocument.createElement("div");
n.innerHTML=pre+cont+post;
do{
n=n.firstChild;
}while(--walk);
dojo.forEach(n.childNodes,function(n){
node.appendChild(n.cloneNode(true));
});
}else{
node.innerHTML=cont;
}
}else{
if(cont.nodeType){
node.appendChild(cont);
}else{
dojo.forEach(cont,function(n){
node.appendChild(n.cloneNode(true));
});
}
}
return node;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,constructor:function(_32f,node){
dojo.mixin(this,_32f||{});
node=this.node=dojo.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_323++].join("_");
}
if(!(this.node||node)){
new Error(this.declaredClass+": no node provided to "+this.id);
}
},set:function(cont,_332){
if(undefined!==cont){
this.content=cont;
}
if(_332){
this._mixin(_332);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
console.error("setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _334=this.onContentError(e);
try{
node.innerHTML=_334;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(dojo.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _337=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_337){
cont=_337[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_339){
var _33a={},key;
for(key in _339){
if(key in _33a){
continue;
}
this[key]=_339[key];
}
},_parse:function(){
var _33c=this.node;
try{
this.parseResults=dojo.parser.parse(_33c,true);
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_33f){
var _340=this["on"+type+"Error"].call(this,err);
if(_33f){
console.error(_33f,err);
}else{
if(_340){
dojo.html._setNodeContent(this.node,_340,true);
}
}
}});
dojo.html.set=function(node,cont,_343){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_343){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_343,{content:cont,node:node}));
return op.set();
}
};
})();
}
if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(_345,_346,_347){
_347=dojo.i18n.normalizeLocale(_347);
var _348=_347.split("-");
var _349=[_345,"nls",_346].join(".");
var _34a=dojo._loadedModules[_349];
if(_34a){
var _34b;
for(var i=_348.length;i>0;i--){
var loc=_348.slice(0,i).join("_");
if(_34a[loc]){
_34b=_34a[loc];
break;
}
}
if(!_34b){
_34b=_34a.ROOT;
}
if(_34b){
var _34e=function(){
};
_34e.prototype=_34b;
return new _34e();
}
}
throw new Error("Bundle not found: "+_346+" in "+_345+" , locale="+_347);
};
dojo.i18n.normalizeLocale=function(_34f){
var _350=_34f?_34f.toLowerCase():dojo.locale;
if(_350=="root"){
_350="ROOT";
}
return _350;
};
dojo.i18n._requireLocalization=function(_351,_352,_353,_354){
var _355=dojo.i18n.normalizeLocale(_353);
var _356=[_351,"nls",_352].join(".");
var _357="";
if(_354){
var _358=_354.split(",");
for(var i=0;i<_358.length;i++){
if(_355["indexOf"](_358[i])==0){
if(_358[i].length>_357.length){
_357=_358[i];
}
}
}
if(!_357){
_357="ROOT";
}
}
var _35a=_354?_357:_355;
var _35b=dojo._loadedModules[_356];
var _35c=null;
if(_35b){
if(dojo.config.localizationComplete&&_35b._built){
return;
}
var _35d=_35a.replace(/-/g,"_");
var _35e=_356+"."+_35d;
_35c=dojo._loadedModules[_35e];
}
if(!_35c){
_35b=dojo["provide"](_356);
var syms=dojo._getModuleSymbols(_351);
var _360=syms.concat("nls").join("/");
var _361;
dojo.i18n._searchLocalePath(_35a,_354,function(loc){
var _363=loc.replace(/-/g,"_");
var _364=_356+"."+_363;
var _365=false;
if(!dojo._loadedModules[_364]){
dojo["provide"](_364);
var _366=[_360];
if(loc!="ROOT"){
_366.push(loc);
}
_366.push(_352);
var _367=_366.join("/")+".js";
_365=dojo._loadPath(_367,null,function(hash){
var _369=function(){
};
_369.prototype=_361;
_35b[_363]=new _369();
for(var j in hash){
_35b[_363][j]=hash[j];
}
});
}else{
_365=true;
}
if(_365&&_35b[_363]){
_361=_35b[_363];
}else{
_35b[_363]=_361;
}
if(_354){
return true;
}
});
}
if(_354&&_355!=_357){
_35b[_355.replace(/-/g,"_")]=_35b[_357.replace(/-/g,"_")];
}
};
(function(){
var _36b=dojo.config.extraLocale;
if(_36b){
if(!_36b instanceof Array){
_36b=[_36b];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_36f,_370){
req(m,b,_36f,_370);
if(_36f){
return;
}
for(var i=0;i<_36b.length;i++){
req(m,b,_36b[i],_370);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_372,down,_374){
_372=dojo.i18n.normalizeLocale(_372);
var _375=_372.split("-");
var _376=[];
for(var i=_375.length;i>0;i--){
_376.push(_375.slice(0,i).join("-"));
}
_376.push(false);
if(down){
_376.reverse();
}
for(var j=_376.length-1;j>=0;j--){
var loc=_376[j]||"ROOT";
var stop=_374(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_37b,_37c){
function _37d(_37e){
_37e=dojo.i18n.normalizeLocale(_37e);
dojo.i18n._searchLocalePath(_37e,true,function(loc){
for(var i=0;i<_37c.length;i++){
if(_37c[i]==loc){
dojo["require"](_37b+"_"+loc);
return true;
}
}
return false;
});
};
_37d();
var _381=dojo.config.extraLocale||[];
for(var i=0;i<_381.length;i++){
_37d(_381[i]);
}
};
}
if(!dojo._hasResource["dijit.layout.ContentPane"]){
dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",doLayout:true,ioArgs:{},isContainer:true,postMixInProperties:function(){
this.inherited(arguments);
var _383=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_383);
this.errorMessage=dojo.string.substitute(this.errorMessage,_383);
if(!this.href&&this.srcNodeRef&&this.srcNodeRef.innerHTML){
this.isLoaded=true;
}
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},postCreate:function(){
this.domNode.title="";
if(!dojo.attr(this.domNode,"role")){
dijit.setWaiRole(this.domNode,"group");
}
dojo.addClass(this.domNode,this.baseClass);
},startup:function(){
if(this._started){
return;
}
if(this.isLoaded){
dojo.forEach(this.getChildren(),function(_384){
_384.startup();
});
if(this.doLayout){
this._checkIfSingleChild();
}
if(!this._singleChild||!dijit._Contained.prototype.getParent.call(this)){
this._scheduleLayout();
}
}
this._loadCheck();
this.inherited(arguments);
},_checkIfSingleChild:function(){
var _385=dojo.query(">",this.containerNode),_386=_385.filter(function(node){
return dojo.hasAttr(node,"dojoType")||dojo.hasAttr(node,"widgetId");
}),_388=dojo.filter(_386.map(dijit.byNode),function(_389){
return _389&&_389.domNode&&_389.resize;
});
if(_385.length==_386.length&&_388.length==1){
this._singleChild=_388[0];
}else{
delete this._singleChild;
}
},setHref:function(href){
dojo.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use attr('href', ...) instead.","","2.0");
return this.attr("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.href=href;
if(this._created&&(this.preload||this._isShown())){
return this.refresh();
}else{
this._hrefChanged=true;
}
},setContent:function(data){
dojo.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use attr('content', ...) instead.","","2.0");
this.attr("content",data);
},_setContentAttr:function(data){
this.href="";
this.cancel();
this._setContent(data||"");
this._isDownloaded=false;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
},destroyRecursive:function(_38e){
if(this._beingDestroyed){
return;
}
this._beingDestroyed=true;
this.inherited(arguments);
},resize:function(size){
dojo.marginBox(this.domNode,size);
var node=this.containerNode,mb=dojo.mixin(dojo.marginBox(node),size||{});
var cb=(this._contentBox=dijit.layout.marginBox2contentBox(node,mb));
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize({w:cb.w,h:cb.h});
}
},_isShown:function(){
if("open" in this){
return this.open;
}else{
var node=this.domNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!dojo.hasClass(node,"dijitHidden");
}
},_onShow:function(){
if(this._needLayout){
this._layoutChildren();
}
this._loadCheck();
if(this.onShow){
this.onShow();
}
},_loadCheck:function(){
if((this.href&&!this._xhrDfd)&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)&&(this.preload||this._isShown())){
delete this._hrefChanged;
this.refresh();
}
},refresh:function(){
this.cancel();
this._setContent(this.onDownloadStart(),true);
var self=this;
var _395={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){
dojo.mixin(_395,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||dojo.xhrGet)(_395));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
},_onLoadHandler:function(data){
this.isLoaded=true;
try{
this.onLoad(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this.isLoaded=false;
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(){
if(this.isLoaded){
this._onUnloadHandler();
}
var _39a=this._contentSetter;
dojo.forEach(this.getChildren(),function(_39b){
if(_39b.destroyRecursive){
_39b.destroyRecursive();
}
});
if(_39a){
dojo.forEach(_39a.parseResults,function(_39c){
if(_39c.destroyRecursive&&_39c.domNode&&_39c.domNode.parentNode==dojo.body()){
_39c.destroyRecursive();
}
});
delete _39a.parseResults;
}
dojo.html._emptyNode(this.containerNode);
},_setContent:function(cont,_39e){
this.destroyDescendants();
delete this._singleChild;
var _39f=this._contentSetter;
if(!(_39f&&_39f instanceof dojo.html._ContentSetter)){
_39f=this._contentSetter=new dojo.html._ContentSetter({node:this.containerNode,_onError:dojo.hitch(this,this._onError),onContentError:dojo.hitch(this,function(e){
var _3a1=this.onContentError(e);
try{
this.containerNode.innerHTML=_3a1;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _3a2=dojo.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad},this._contentSetterParams||{});
dojo.mixin(_39f,_3a2);
_39f.set((dojo.isObject(cont)&&cont.domNode)?cont.domNode:cont);
delete this._contentSetterParams;
if(!_39e){
dojo.forEach(this.getChildren(),function(_3a3){
_3a3.startup();
});
if(this.doLayout){
this._checkIfSingleChild();
}
this._scheduleLayout();
this._onLoadHandler(cont);
}
},_onError:function(type,err,_3a6){
var _3a7=this["on"+type+"Error"].call(this,err);
if(_3a6){
console.error(_3a6,err);
}else{
if(_3a7){
this._setContent(_3a7,true);
}
}
},_scheduleLayout:function(){
if(this._isShown()){
this._layoutChildren();
}else{
this._needLayout=true;
}
},_layoutChildren:function(){
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||dojo.contentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
dojo.forEach(this.getChildren(),function(_3a9){
if(_3a9.resize){
_3a9.resize();
}
});
}
delete this._needLayout;
},onLoad:function(data){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(_3ab){
},onDownloadError:function(_3ac){
return this.errorMessage;
},onDownloadEnd:function(){
}});
}
if(!dojo._hasResource["dijit.TooltipDialog"]){
dojo._hasResource["dijit.TooltipDialog"]=true;
dojo.provide("dijit.TooltipDialog");
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:null,templateString:"<div waiRole=\"presentation\">\n\t<div class=\"dijitTooltipContainer\" waiRole=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" tabindex=\"-1\" waiRole=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" waiRole=\"presentation\"></div>\n</div>\n",postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
this.containerNode.title=this.title;
},orient:function(node,_3ae,_3af){
var c=this._currentOrientClass;
if(c){
dojo.removeClass(this.domNode,c);
}
c="dijitTooltipAB"+(_3af.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_3af.charAt(0)=="T"?"Below":"Above");
dojo.addClass(this.domNode,c);
this._currentOrientClass=c;
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
if(this.autofocus){
this._getFocusItems(this.containerNode);
dijit.focus(this._firstFocusItem);
}
},_onKey:function(evt){
var node=evt.target;
var dk=dojo.keys;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.containerNode);
}
var _3b5=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==dk.ESCAPE){
this.onCancel();
dojo.stopEvent(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_3b5){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_3b5){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
if(evt.charOrCode===dk.TAB){
evt.stopPropagation();
}
}
}
}
}});
}
if(!dojo._hasResource["dijit.Dialog"]){
dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{templateString:null,templateString:"<div class=\"dijitDialog\" tabindex=\"-1\" waiRole=\"dialog\" waiState=\"labelledby-${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"onclick: onCancel, onmouseenter: _onCloseEnter, onmouseleave: _onCloseLeave\" title=\"${buttonCancel}\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">close</span>\n\t</span>\n\t</div>\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n",attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}]}),open:false,duration:dijit.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_fixSizes:true,postMixInProperties:function(){
var _3b6=dojo.i18n.getLocalization("dijit","common");
dojo.mixin(this,_3b6);
this.inherited(arguments);
},postCreate:function(){
dojo.style(this.domNode,{visibility:"hidden",position:"absolute",display:"",top:"-9999px"});
dojo.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
this.inherited(arguments);
},_endDrag:function(e){
if(e&&e.node&&e.node===this.domNode){
var vp=dijit.getViewport();
var p=e._leftTop||dojo.coords(e.node,true);
this._relativePosition={t:p.t-vp.t,l:p.l-vp.l};
}
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=(dojo.isIE==6)?new dojo.dnd.TimedMoveable(node,{handle:this.titleBar}):new dojo.dnd.Moveable(node,{handle:this.titleBar,timeout:0});
dojo.subscribe("/dnd/move/stop",this,"_endDrag");
}else{
dojo.addClass(node,"dijitDialogFixed");
}
var _3bb={dialogId:this.id,"class":dojo.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" ")};
var _3bd=dijit._underlay;
if(!_3bd){
_3bd=dijit._underlay=new dijit.DialogUnderlay(_3bb);
}
this._fadeIn=dojo.fadeIn({node:node,duration:this.duration,beforeBegin:function(){
_3bd.attr(_3bb);
_3bd.show();
},onEnd:dojo.hitch(this,function(){
if(this.autofocus){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
})});
this._fadeOut=dojo.fadeOut({node:node,duration:this.duration,onEnd:function(){
node.style.visibility="hidden";
node.style.top="-9999px";
dijit._underlay.hide();
}});
},uninitialize:function(){
var _3be=false;
if(this._fadeIn&&this._fadeIn.status()=="playing"){
_3be=true;
this._fadeIn.stop();
}
if(this._fadeOut&&this._fadeOut.status()=="playing"){
_3be=true;
this._fadeOut.stop();
}
if(this.open||_3be){
dijit._underlay.hide();
}
if(this._moveable){
this._moveable.destroy();
}
},_size:function(){
var mb=dojo.marginBox(this.domNode);
var _3c0=dijit.getViewport();
if(mb.w>=_3c0.w||mb.h>=_3c0.h){
dojo.style(this.containerNode,{width:Math.min(mb.w,Math.floor(_3c0.w*0.75))+"px",height:Math.min(mb.h,Math.floor(_3c0.h*0.75))+"px",overflow:"auto",position:"relative"});
}
},_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var node=this.domNode;
var _3c2=dijit.getViewport();
var p=this._relativePosition;
var mb=p?null:dojo.marginBox(node);
dojo.style(node,{left:Math.floor(_3c2.l+(p?p.l:(_3c2.w-mb.w)/2))+"px",top:Math.floor(_3c2.t+(p?p.t:(_3c2.h-mb.h)/2))+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var dk=dojo.keys;
var node=evt.target;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.domNode);
}
var _3c8=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_3c8){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_3c8){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
while(node){
if(node==this.domNode){
if(evt.charOrCode==dk.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==dk.TAB){
dojo.stopEvent(evt);
}else{
if(!dojo.isOpera){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOut.status()=="playing"){
this._fadeOut.stop();
}
this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(window,"onresize",this,function(){
var _3c9=dijit.getViewport();
if(!this._oldViewport||_3c9.h!=this._oldViewport.h||_3c9.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_3c9;
}
}));
this._modalconnects.push(dojo.connect(dojo.doc.documentElement,"onkeypress",this,"_onKey"));
dojo.style(this.domNode,{opacity:0,visibility:""});
if(this._fixSizes){
dojo.style(this.containerNode,{width:"auto",height:"auto"});
}
this.open=true;
this._onShow();
this._size();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeIn.status()=="playing"){
this._fadeIn.stop();
}
this._fadeOut.play();
if(this._scrollConnected){
this._scrollConnected=false;
}
dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
if(this.refocus){
this.connect(this._fadeOut,"onEnd",dojo.hitch(dijit,"focus",this._savedFocus));
}
if(this._relativePosition){
delete this._relativePosition;
}
this.open=false;
},layout:function(){
if(this.domNode.style.visibility!="hidden"){
dijit._underlay.layout();
this._position();
}
},destroy:function(){
dojo.forEach(this._modalconnects,dojo.disconnect);
if(this.refocus&&this.open){
setTimeout(dojo.hitch(dijit,"focus",this._savedFocus),25);
}
this.inherited(arguments);
},_onCloseEnter:function(){
dojo.addClass(this.closeButtonNode,"dijitDialogCloseIcon-hover");
},_onCloseLeave:function(){
dojo.removeClass(this.closeButtonNode,"dijitDialogCloseIcon-hover");
}});
}
if(!dojo._hasResource["dojox.xml.parser"]){
dojo._hasResource["dojox.xml.parser"]=true;
dojo.provide("dojox.xml.parser");
dojox.xml.parser.parse=function(str,_3cb){
var _3cc=dojo.doc;
var doc;
_3cb=_3cb||"text/xml";
if(str&&dojo.trim(str)&&"DOMParser" in dojo.global){
var _3ce=new DOMParser();
doc=_3ce.parseFromString(str,_3cb);
var de=doc.documentElement;
var _3d0="http://www.mozilla.org/newlayout/xml/parsererror.xml";
if(de.nodeName=="parsererror"&&de.namespaceURI==_3d0){
var _3d1=de.getElementsByTagNameNS(_3d0,"sourcetext")[0];
if(!_3d1){
_3d1=_3d1.firstChild.data;
}
throw new Error("Error parsing text "+nativeDoc.documentElement.firstChild.data+" \n"+_3d1);
}
return doc;
}else{
if("ActiveXObject" in dojo.global){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
dojo.some(dp,function(p){
try{
doc=new ActiveXObject(p);
}
catch(e){
return false;
}
return true;
});
if(str&&doc){
doc.async=false;
doc.loadXML(str);
var pe=doc.parseError;
if(pe.errorCode!==0){
throw new Error("Line: "+pe.line+"\n"+"Col: "+pe.linepos+"\n"+"Reason: "+pe.reason+"\n"+"Error Code: "+pe.errorCode+"\n"+"Source: "+pe.srcText);
}
}
if(doc){
return doc;
}
}else{
if(_3cc.implementation&&_3cc.implementation.createDocument){
if(str&&dojo.trim(str)&&_3cc.createElement){
var tmp=_3cc.createElement("xml");
tmp.innerHTML=str;
var _3d8=_3cc.implementation.createDocument("foo","",null);
dojo.forEach(tmp.childNodes,function(_3d9){
_3d8.importNode(_3d9,true);
});
return _3d8;
}else{
return _3cc.implementation.createDocument("","",null);
}
}
}
}
return null;
};
dojox.xml.parser.textContent=function(node,text){
if(arguments.length>1){
var _3dc=node.ownerDocument||dojo.doc;
dojox.xml.parser.replaceChildren(node,_3dc.createTextNode(text));
return text;
}else{
if(node.textContent!==undefined){
return node.textContent;
}
var _3dd="";
if(node){
dojo.forEach(node.childNodes,function(_3de){
switch(_3de.nodeType){
case 1:
case 5:
_3dd+=dojox.xml.parser.textContent(_3de);
break;
case 3:
case 2:
case 4:
_3dd+=_3de.nodeValue;
}
});
}
return _3dd;
}
};
dojox.xml.parser.replaceChildren=function(node,_3e0){
var _3e1=[];
if(dojo.isIE){
dojo.forEach(node.childNodes,function(_3e2){
_3e1.push(_3e2);
});
}
dojox.xml.parser.removeChildren(node);
dojo.forEach(_3e1,dojo.destroy);
if(!dojo.isArray(_3e0)){
node.appendChild(_3e0);
}else{
dojo.forEach(_3e0,function(_3e3){
node.appendChild(_3e3);
});
}
};
dojox.xml.parser.removeChildren=function(node){
var _3e5=node.childNodes.length;
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
return _3e5;
};
dojox.xml.parser.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
return null;
};
}
if(!dojo._hasResource["dojox.data.dom"]){
dojo._hasResource["dojox.data.dom"]=true;
dojo.provide("dojox.data.dom");
dojo.deprecated("dojox.data.dom","Use dojox.xml.parser instead.","2.0");
dojox.data.dom.createDocument=function(str,_3e8){
dojo.deprecated("dojox.data.dom.createDocument()","Use dojox.xml.parser.parse() instead.","2.0");
try{
return dojox.xml.parser.parse(str,_3e8);
}
catch(e){
return null;
}
};
dojox.data.dom.textContent=function(node,text){
dojo.deprecated("dojox.data.dom.textContent()","Use dojox.xml.parser.textContent() instead.","2.0");
if(arguments.length>1){
return dojox.xml.parser.textContent(node,text);
}else{
return dojox.xml.parser.textContent(node);
}
};
dojox.data.dom.replaceChildren=function(node,_3ec){
dojo.deprecated("dojox.data.dom.replaceChildren()","Use dojox.xml.parser.replaceChildren() instead.","2.0");
dojox.xml.parser.replaceChildren(node,_3ec);
};
dojox.data.dom.removeChildren=function(node){
dojo.deprecated("dojox.data.dom.removeChildren()","Use dojox.xml.parser.removeChildren() instead.","2.0");
return dojox.xml.parser.removeChildren(node);
};
dojox.data.dom.innerXML=function(node){
dojo.deprecated("dojox.data.dom.innerXML()","Use dojox.xml.parser.innerXML() instead.","2.0");
return dojox.xml.parser.innerXML(node);
};
}
if(!dojo._hasResource["dojo.data.util.sorter"]){
dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
dojo.data.util.sorter.createSortFunction=function(_3f2,_3f3){
var _3f4=[];
function _3f5(attr,dir){
return function(_3f8,_3f9){
var a=_3f3.getValue(_3f8,attr);
var b=_3f3.getValue(_3f9,attr);
var _3fc=null;
if(_3f3.comparatorMap){
if(typeof attr!=="string"){
attr=_3f3.getIdentity(attr);
}
_3fc=_3f3.comparatorMap[attr]||dojo.data.util.sorter.basicComparator;
}
_3fc=_3fc||dojo.data.util.sorter.basicComparator;
return dir*_3fc(a,b);
};
};
var _3fd;
for(var i=0;i<_3f2.length;i++){
_3fd=_3f2[i];
if(_3fd.attribute){
var _3ff=(_3fd.descending)?-1:1;
_3f4.push(_3f5(_3fd.attribute,_3ff));
}
}
return function(rowA,rowB){
var i=0;
while(i<_3f4.length){
var ret=_3f4[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
}
if(!dojo._hasResource["dojox.data.QueryReadStore"]){
dojo._hasResource["dojox.data.QueryReadStore"]=true;
dojo.provide("dojox.data.QueryReadStore");
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,_numRows:-1,lastRequestHash:null,doClientPaging:false,doClientSorting:false,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},_labelAttr:"label",constructor:function(_404){
dojo.mixin(this,_404);
},getValue:function(item,_406,_407){
this._assertIsItem(item);
if(!dojo.isString(_406)){
throw new Error(this._className+".getValue(): Invalid attribute, string expected!");
}
if(!this.hasAttribute(item,_406)){
if(_407){
return _407;
}
console.log(this._className+".getValue(): Item does not have the attribute '"+_406+"'.");
}
return item.i[_406];
},getValues:function(item,_409){
this._assertIsItem(item);
var ret=[];
if(this.hasAttribute(item,_409)){
ret.push(item.i[_409]);
}
return ret;
},getAttributes:function(item){
this._assertIsItem(item);
var ret=[];
for(var i in item.i){
ret.push(i);
}
return ret;
},hasAttribute:function(item,_40f){
return this.isItem(item)&&typeof item.i[_40f]!="undefined";
},containsValue:function(item,_411,_412){
var _413=this.getValues(item,_411);
var len=_413.length;
for(var i=0;i<len;i++){
if(_413[i]==_412){
return true;
}
}
return false;
},isItem:function(_416){
if(_416){
return typeof _416.r!="undefined"&&_416.r==this;
}
return false;
},isItemLoaded:function(_417){
return this.isItem(_417);
},loadItem:function(args){
if(this.isItemLoaded(args.item)){
return;
}
},fetch:function(_419){
_419=_419||{};
if(!_419.store){
_419.store=this;
}
var self=this;
var _41b=function(_41c,_41d){
if(_41d.onError){
var _41e=_41d.scope||dojo.global;
_41d.onError.call(_41e,_41c,_41d);
}
};
var _41f=function(_420,_421,_422){
var _423=_421.abort||null;
var _424=false;
var _425=_421.start?_421.start:0;
if(self.doClientPaging==false){
_425=0;
}
var _426=_421.count?(_425+_421.count):_420.length;
_421.abort=function(){
_424=true;
if(_423){
_423.call(_421);
}
};
var _427=_421.scope||dojo.global;
if(!_421.store){
_421.store=self;
}
if(_421.onBegin){
_421.onBegin.call(_427,_422,_421);
}
if(_421.sort&&self.doClientSorting){
_420.sort(dojo.data.util.sorter.createSortFunction(_421.sort,self));
}
if(_421.onItem){
for(var i=_425;(i<_420.length)&&(i<_426);++i){
var item=_420[i];
if(!_424){
_421.onItem.call(_427,item,_421);
}
}
}
if(_421.onComplete&&!_424){
var _42a=null;
if(!_421.onItem){
_42a=_420.slice(_425,_426);
}
_421.onComplete.call(_427,_42a,_421);
}
};
this._fetchItems(_419,_41f,_41b);
return _419;
},getFeatures:function(){
return this._features;
},close:function(_42b){
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_xhrFetchHandler:function(data,_42f,_430,_431){
data=this._filterResponse(data);
if(data.label){
this._labelAttr=data.label;
}
var _432=data.numRows||-1;
this._items=[];
dojo.forEach(data.items,function(e){
this._items.push({i:e,r:this});
},this);
var _434=data.identifier;
this._itemsByIdentity={};
if(_434){
this._identifier=_434;
var i;
for(i=0;i<this._items.length;++i){
var item=this._items[i].i;
var _437=item[_434];
if(!this._itemsByIdentity[_437]){
this._itemsByIdentity[_437]=item;
}else{
throw new Error(this._className+":  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+_434+"].  Value collided: ["+_437+"]");
}
}
}else{
this._identifier=Number;
for(i=0;i<this._items.length;++i){
this._items[i].n=i;
}
}
_432=this._numRows=(_432===-1)?this._items.length:_432;
_430(this._items,_42f,_432);
this._numRows=_432;
},_fetchItems:function(_438,_439,_43a){
var _43b=_438.serverQuery||_438.query||{};
if(!this.doClientPaging){
_43b.start=_438.start||0;
if(_438.count){
_43b.count=_438.count;
}
}
if(!this.doClientSorting){
if(_438.sort){
var sort=_438.sort[0];
if(sort&&sort.attribute){
var _43d=sort.attribute;
if(sort.descending){
_43d="-"+_43d;
}
_43b.sort=_43d;
}
}
}
if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(_43b)==dojo.toJson(this._lastServerQuery)){
this._numRows=(this._numRows===-1)?this._items.length:this._numRows;
_439(this._items,_438,this._numRows);
}else{
var _43e=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var _43f=_43e({url:this.url,handleAs:"json-comment-optional",content:_43b});
_43f.addCallback(dojo.hitch(this,function(data){
this._xhrFetchHandler(data,_438,_439,_43a);
}));
_43f.addErrback(function(_441){
_43a(_441,_438);
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},_43b);
}
},_filterResponse:function(data){
return data;
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error(this._className+": Invalid item argument.");
}
},_assertIsAttribute:function(_444){
if(typeof _444!=="string"){
throw new Error(this._className+": Invalid attribute argument ('"+_444+"').");
}
},fetchItemByIdentity:function(_445){
if(this._itemsByIdentity){
var item=this._itemsByIdentity[_445.identity];
if(!(item===undefined)){
if(_445.onItem){
var _447=_445.scope?_445.scope:dojo.global;
_445.onItem.call(_447,{i:item,r:this});
}
return;
}
}
var _448=function(_449,_44a){
var _44b=_445.scope?_445.scope:dojo.global;
if(_445.onError){
_445.onError.call(_44b,_449);
}
};
var _44c=function(_44d,_44e){
var _44f=_445.scope?_445.scope:dojo.global;
try{
var item=null;
if(_44d&&_44d.length==1){
item=_44d[0];
}
if(_445.onItem){
_445.onItem.call(_44f,item);
}
}
catch(error){
if(_445.onError){
_445.onError.call(_44f,error);
}
}
};
var _451={serverQuery:{id:_445.identity}};
this._fetchItems(_451,_44c,_448);
},getIdentity:function(item){
var _453=null;
if(this._identifier===Number){
_453=item.n;
}else{
_453=item.i[this._identifier];
}
return _453;
},getIdentityAttributes:function(item){
return [this._identifier];
}});
}
function getCMTargetUrl(_455){
_455=_455||"";
var idx=_455.indexOf(location.hostname);
if(idx>0){
idx+=location.hostname.length;
return _455.substring(idx);
}else{
return _455;
}
};
var cmCreateLinkTag;
function createMenuItem(_457,_458,_459){
var _45a="<li>"+"<a id=\""+_457+"_Anchor"+_458+"\" href=\""+_459.absoluteLink+"\" "+"onClick=\"return cmCreateManualLinkClickTag("+"'"+getCMTargetUrl(_459.absoluteLink)+"', '"+(_459.formatedCMLinkName||"")+"', '"+location.pathname+"');"+"\" "+"target='"+(_459.external?"_blank":(_459.target||""))+"' "+"name='"+(_459.name||"")+"' "+"style='"+(_459.style||"")+"' "+"title='"+(_459.title||"")+"' ";
if(_459.noFollow){
_45a+="rel='nofollow' ";
}
_45a+=">"+_459.altText+"</a></li>";
return _45a;
};
function createFooterToolbar(_45b,_45c,_45d,_45e){
var _45f=document.getElementById(_45d);
var _460=new Boolean(true);
var _461="";
_461="<h6>"+_45e.menuName+"</h6><ul>";
if(_45d=="footerTB6"){
return;
}
for(var i=0;i<_45c.length;i++){
var _463=_45c[i];
_463.pageId=_45e.pageId;
_463.community=_45e.community;
var menu=createMenuItem("footer_menu",i,_463);
_461+=menu;
}
_461+="</ul>";
var logo="";
if(_45b){
logo="<IMG id=\"customerCorporateLogo\" src=\""+_45b+"\" alt=\"Customer Corporate logo\"/>";
}
_45f.innerHTML=logo+_461;
};
function createFooterMenu(_466){
var _467=_466.logoImage||0;
var _468=_466.menuList;
for(var i=0;i<_468.length;i++){
var _46a=_468[i];
var _46b=_46a.menuItems;
_467=(i==0)?_467:0;
createFooterToolbar(_467,_46b,"footerTB"+(i+1),_46a);
}
};
var sessionResetCount=0;
function handleTimeout(){
if(!is_ie||(is_ie&&isAjaxSupported())){
sessionResetCount++;
if(sessionResetCount==5){
setTimeout("firePageViewTag(\"\", \"sessionTimeout.js\", \"\", false)",4800000);
}else{
setTimeout("firePageViewTag(\"\", \"sessionTimeout.js\", \"\", false);handleTimeout()",3300000);
}
}
};
handleTimeout();
function detectIE(_46c,name){
try{
var yObj=new ActiveXObject(_46c);
if(yObj==null){
return "";
}else{
return name+",";
}
}
catch(e){
return "";
}
};
function detectNS(_46f,name){
n="";
if(nse.indexOf(_46f)!=-1){
if(navigator.mimeTypes[_46f].enabledPlugin!=null){
n=name+",";
}
}
return n;
};
function detectAdobe(_471){
var _472=false;
if(is_ie&&is_win&&!is_opera){
if(_471){
pluginlist=detectIE("AcroPDF.PDF.1","Acrobat Reader");
}else{
pluginlist=detectIE("Adobe.SVGCtl","SVG Viewer")+detectIE("AcroPDF.PDF.1","Acrobat Reader")+detectIE("PDF.PdfCtrl.6","Acrobat Reader")+detectIE("PDF.PdfCtrl.5","Acrobat Reader")+detectIE("PDF.PdfCtrl.1","Acrobat Reader");
}
}
if(!_471&&(is_nav||!is_win||is_opera||(dojo.isChrome>0))){
nse="";
for(var i=0;i<navigator.mimeTypes.length;i++){
nse+=navigator.mimeTypes[i].type.toLowerCase();
}
pluginlist=detectNS("image/svg-xml","SVG Viewer")+detectNS("application/pdf","Acrobat Reader");
}
if(pluginlist.length>0){
pluginlist=pluginlist.substring(0,pluginlist.length-1);
}
if(_471){
if((pluginlist.indexOf("Acrobat Reader")!=-1)){
_472=true;
}
}else{
if((pluginlist.indexOf("Acrobat Reader")!=-1)||(pluginlist.indexOf("SVG Viewer")!=-1)){
_472=true;
}
}
return _472;
};
function createWaitMessage(){
var _474="<div class=\"pleaseWaitSpinner\">"+"<br/><br/><br/><img id=\"waitSpinnerImg\" src=\"/images/spinner-anim.gif\" alt=\"Please wait\" /><br/><br/>"+"Please wait while we process your request.</div>";
var _475=new dijit.Dialog({title:"",content:_474,id:"waitingMessage"});
dojo.body().appendChild(_475.domNode);
_475.startup();
return (_475);
};
function setWaitStatus(_476){
var _477=dijit.byId("waitingMessage");
if(_477==null){
_477=createWaitMessage();
}
cansubmit=true;
if(_476){
dojo.extend(dijit.Dialog,{_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var node=this.domNode;
var _479=dijit.getViewport();
var p=this._relativePosition;
var mb=p?null:dojo.marginBox(node);
dojo.style(node,{left:Math.floor(_479.l+(p?p.l:(_479.w-mb.w)/2))+"px",top:Math.floor(_479.t+(p?p.t:(_479.h-mb.h)/3))+"px"});
}
}});
setTimeout("document.images[\"waitSpinnerImg\"].src = \"images/spinner-anim.gif\"",200);
_477.show();
}else{
_477.hide();
}
};
function showWaitingMessage(){
setWaitStatus(true);
};
window.onpageshow=function(evt){
if(evt.persisted){
setWaitStatus(false);
}
};
var productMenuHeightSet=false;
function setProductMenuHeight(){
if(!productMenuHeightSet){
var _47d=Math.max(dojo.byId("productsLeft").offsetHeight,dojo.byId("productsMiddle").offsetHeight,dojo.byId("productsRight").offsetHeight);
if(dojo.isIE>0){
_47d=_47d+2;
}
dojo.byId("productsLeft").style.height=_47d;
dojo.byId("productsMiddle").style.height=_47d;
dojo.byId("productsRight").style.height=_47d;
dojo.byId("productsSeparator1").style.height=_47d;
dojo.byId("productsSeparator2").style.height=_47d;
if(dojo.isIE>0){
dojo.byId("separatorImage1").style.height=_47d-24;
dojo.byId("separatorImage2").style.height=_47d-24;
}else{
dojo.byId("separatorImage1").style.height=_47d-14;
dojo.byId("separatorImage2").style.height=_47d-14;
}
productMenuHeightSet=true;
}
if(dojo.isIE==6){
var _47e=dojo.byId("productsMiddle");
hideShowSelectBox(findGlobalPosX(_47e),findGlobalPosY(_47e),_47e.offsetWidth,_47e.offsetHeight);
}
};
function setNavigation(){
var _47f="";
var node="";
var _481="";
var _482=0;
var _483=0;
var _484="";
var _485=0;
var _486;
if(document.getElementById("globalMenu")){
_47f=document.getElementById("globalMenu");
for(i=0;i<_47f.childNodes.length;i++){
node=_47f.childNodes[i];
if(node.nodeName=="LI"){
_484=this.className;
if(navigator.appName=="Microsoft Internet Explorer"){
node.onmouseenter=function(){
_484=this.className;
if((_484.indexOf("over")==-1)&&(_484.indexOf("noborder")==-1)){
for(j=0;j<this.childNodes.length;j++){
_481=this.childNodes[j];
if(_481.nodeName=="UL"){
this.className="over";
_482=0;
_483=0;
hideShowSelectBox(findGlobalPosX(_481),findGlobalPosY(_481),_481.offsetWidth,_481.offsetHeight);
var _487=document.getElementById("pdfBodyId");
if(_487!=null){
if(_481.offsetHeight>173){
var _488=_481.offsetHeight-173;
_487.style.marginTop=_488;
}
}
}else{
this.className="single";
if(this.id=="ProductsMenu"){
setTimeout("setProductMenuHeight()",100);
}
}
}
}
};
node.onmouseleave=function(){
this.className=_484;
showAllSelectBoxes();
_485=setTimeout("showAllEmbeds();",100);
var _489=document.getElementById("pdfBodyId");
if(_489!=null){
_489.style.marginTop=0;
}
};
}else{
node.onmouseover=function(){
_484=this.className;
if((_484.indexOf("over")==-1)&&(_484.indexOf("noborder")==-1)){
for(j=0;j<this.childNodes.length;j++){
_481=this.childNodes[j];
if(_481.nodeName=="UL"){
this.className="over";
_482=0;
_483=0;
if(document.getElementsByTagName("iframe").length>0){
clearTimeout(_485);
var _48a=document.getElementById("pdfBodyId");
if(_48a!=null){
if(_481.offsetHeight>173){
var _48b=_481.offsetHeight-173;
_48a.style.marginTop=_48b;
}
}
}
}else{
this.className="single";
if(this.id=="ProductsMenu"&&this.children.length>1){
setTimeout("setProductMenuHeight()",100);
}
}
}
}
};
node.onmouseout=function(){
this.className=_484;
_485=setTimeout("showAllEmbeds();",100);
};
}
}
}
}
};
function findGlobalPosX(obj){
var _48d=0;
if(obj.offsetParent){
while(obj.offsetParent){
_48d+=obj.offsetLeft;
obj=obj.offsetParent;
}
}else{
if(obj.x){
_48d+=obj.x;
}
}
return _48d;
};
function findGlobalPosY(obj){
var _48f=0;
if(obj.offsetParent){
while(obj.offsetParent){
_48f+=obj.offsetTop;
obj=obj.offsetParent;
}
_48f+=1;
}else{
if(obj.y){
_48f+=obj.y;
}
}
return _48f;
};
function hideShowSelectBox(_490,_491,_492,_493){
for(slectLoop2=0;slectLoop2<document.getElementsByTagName("select").length;slectLoop2++){
var _494=findGlobalPosY(document.getElementsByTagName("select")[slectLoop2]);
var _495=findGlobalPosX(document.getElementsByTagName("select")[slectLoop2]);
var _496=document.getElementsByTagName("select")[slectLoop2].offsetWidth;
var _497=document.getElementsByTagName("select")[slectLoop2].offsetHeight;
if((_494<=_491+_493&&_494+_497>=_491)&&((_495<=_490&&_490<=(_496+_495))||((_490<=_495)&&(_490+_492>_495)))){
document.getElementsByTagName("select")[slectLoop2].style.visibility="hidden";
}else{
document.getElementsByTagName("select")[slectLoop2].style.visibility="visible";
}
}
};
function showAllSelectBoxes(){
for(j=0;j<document.getElementsByTagName("select").length;j++){
document.getElementsByTagName("select")[j].style.visibility="visible";
}
};
function hideShowEmbedObj(_498,_499,_49a,_49b){
for(embedLoop=0;embedLoop<document.getElementsByTagName("iframe").length;embedLoop++){
var _49c=findGlobalPosY(document.getElementsByTagName("iframe")[embedLoop]);
var _49d=findGlobalPosX(document.getElementsByTagName("iframe")[embedLoop]);
var _49e=document.getElementsByTagName("iframe")[embedLoop].offsetWidth;
var _49f=document.getElementsByTagName("iframe")[embedLoop].offsetHeight;
var _4a0=document.getElementById("shimmer");
if(_4a0!=null){
if((_49c<=_499+_49b&&_49c+_49f>=_499)&&((_49d<=_498&&_498<=(_49e+_49d))||((_498<=_49d)&&(_498+_49a>_49d)))){
_4a0.style.width=_49a;
_4a0.style.height=_49b;
_4a0.style.top=_499;
_4a0.style.left=_498;
_4a0.style.display="block";
}
}
}
};
function showAllEmbeds(){
var _4a1=document.getElementById("pdfBodyId");
if(_4a1!=null){
_4a1.style.marginTop=0;
}
};
if(!dojo._hasResource["dijit.form._FormWidget"]){
dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,readOnly:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",disabled:"focusNode",readOnly:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},_setDisabledAttr:function(_4a2){
this.disabled=_4a2;
dojo.attr(this.focusNode,"disabled",_4a2);
dijit.setWaiState(this.focusNode,"disabled",_4a2);
if(_4a2){
this._hovering=false;
this._active=false;
this.focusNode.removeAttribute("tabIndex");
}else{
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
this._setStateClass();
},setDisabled:function(_4a3){
dojo.deprecated("setDisabled("+_4a3+") is deprecated. Use attr('disabled',"+_4a3+") instead.","","2.0");
this.attr("disabled",_4a3);
},_onFocus:function(e){
if(this.scrollOnFocus){
dijit.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},_onMouse:function(_4a5){
var _4a6=_4a5.currentTarget;
if(_4a6&&_4a6.getAttribute){
this.stateModifier=_4a6.getAttribute("stateModifier")||"";
}
if(!this.disabled){
switch(_4a5.type){
case "mouseenter":
case "mouseover":
this._hovering=true;
this._active=this._mouseDown;
break;
case "mouseout":
case "mouseleave":
this._hovering=false;
this._active=false;
break;
case "mousedown":
this._active=true;
this._mouseDown=true;
var _4a7=this.connect(dojo.body(),"onmouseup",function(){
if(this._mouseDown&&this.isFocusable()){
this.focus();
}
this._active=false;
this._mouseDown=false;
this._setStateClass();
this.disconnect(_4a7);
});
break;
}
this._setStateClass();
}
},isFocusable:function(){
return !this.disabled&&!this.readOnly&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
dijit.focus(this.focusNode);
},_setStateClass:function(){
var _4a8=this.baseClass.split(" ");
function _4a9(_4aa){
_4a8=_4a8.concat(dojo.map(_4a8,function(c){
return c+_4aa;
}),"dijit"+_4aa);
};
if(this.checked){
_4a9("Checked");
}
if(this.state){
_4a9(this.state);
}
if(this.selected){
_4a9("Selected");
}
if(this.disabled){
_4a9("Disabled");
}else{
if(this.readOnly){
_4a9("ReadOnly");
}else{
if(this._active){
_4a9(this.stateModifier+"Active");
}else{
if(this._focused){
_4a9("Focused");
}
if(this._hovering){
_4a9(this.stateModifier+"Hover");
}
}
}
}
var tn=this.stateNode||this.domNode,_4ad={};
dojo.forEach(tn.className.split(" "),function(c){
_4ad[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _4ad[c];
});
}
dojo.forEach(_4a8,function(c){
_4ad[c]=true;
});
var _4b1=[];
for(var c in _4ad){
_4b1.push(c);
}
tn.className=_4b1.join(" ");
this._stateClasses=_4a8;
},compare:function(val1,val2){
if((typeof val1=="number")&&(typeof val2=="number")){
return (isNaN(val1)&&isNaN(val2))?0:(val1-val2);
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_4b5){
},_onChangeActive:false,_handleOnChange:function(_4b6,_4b7){
this._lastValue=_4b6;
if(this._lastValueReported==undefined&&(_4b7===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_4b6;
}
if((this.intermediateChanges||_4b7||_4b7===undefined)&&((typeof _4b6!=typeof this._lastValueReported)||this.compare(_4b6,this._lastValueReported)!=0)){
this._lastValueReported=_4b6;
if(this._onChangeActive){
this.onChange(_4b6);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
this._setStateClass();
},destroy:function(){
if(this._layoutHackHandle){
clearTimeout(this._layoutHackHandle);
}
this.inherited(arguments);
},setValue:function(_4b8){
dojo.deprecated("dijit.form._FormWidget:setValue("+_4b8+") is deprecated.  Use attr('value',"+_4b8+") instead.","","2.0");
this.attr("value",_4b8);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use attr('value') instead.","","2.0");
return this.attr("value");
},_layoutHack:function(){
if(dojo.isFF==2&&!this._layoutHackHandle){
var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
this._layoutHackHandle=setTimeout(dojo.hitch(this,function(){
this._layoutHackHandle=null;
node.style.opacity=old;
}),0);
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:""}),postCreate:function(){
if(dojo.isIE||dojo.isWebKit){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._resetValue=this.value;
}
},_setValueAttr:function(_4bb,_4bc){
this.value=_4bb;
this._handleOnChange(_4bb,_4bc);
},_getValueAttr:function(_4bd){
return this._lastValue;
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!e.ctrlKey&&!e.altKey){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}else{
if(dojo.isWebKit){
te=document.createEvent("Events");
te.initEvent("keypress",true,true);
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.target.dispatchEvent(te);
}
}
}
}});
}
if(!dojo._hasResource["dijit.form.TextBox"]){
dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormValueWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:"<input class=\"dijit dijitReset dijitLeft\" dojoAttachPoint='textbox,focusNode'\n\tdojoAttachEvent='onmouseenter:_onMouse,onmouseleave:_onMouse'\n\tautocomplete=\"off\" type=\"${type}\" ${nameAttrSetting}\n\t/>\n",baseClass:"dijitTextBox",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{maxLength:"focusNode"}),_getValueAttr:function(){
return this.parse(this.attr("displayedValue"),this.constraints);
},_setValueAttr:function(_4c0,_4c1,_4c2){
var _4c3;
if(_4c0!==undefined){
_4c3=this.filter(_4c0);
if(typeof _4c2!="string"){
if(_4c3!==null&&((typeof _4c3!="number")||!isNaN(_4c3))){
_4c2=this.filter(this.format(_4c3,this.constraints));
}else{
_4c2="";
}
}
}
if(_4c2!=null&&_4c2!=undefined&&((typeof _4c2)!="number"||!isNaN(_4c2))&&this.textbox.value!=_4c2){
this.textbox.value=_4c2;
}
this.inherited(arguments,[_4c3,_4c1]);
},displayedValue:"",getDisplayedValue:function(){
dojo.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use attr('displayedValue') instead.","","2.0");
return this.attr("displayedValue");
},_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},setDisplayedValue:function(_4c4){
dojo.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use attr('displayedValue', ...) instead.","","2.0");
this.attr("displayedValue",_4c4);
},_setDisplayedValueAttr:function(_4c5){
if(_4c5===null||_4c5===undefined){
_4c5="";
}else{
if(typeof _4c5!="string"){
_4c5=String(_4c5);
}
}
this.textbox.value=_4c5;
this._setValueAttr(this.attr("value"),undefined,_4c5);
},format:function(_4c6,_4c7){
return ((_4c6==null||_4c6==undefined)?"":(_4c6.toString?_4c6.toString():_4c6));
},parse:function(_4c8,_4c9){
return _4c8;
},_refreshState:function(){
},_onInput:function(e){
if(e&&e.type&&/key/i.test(e.type)&&e.keyCode){
switch(e.keyCode){
case dojo.keys.SHIFT:
case dojo.keys.ALT:
case dojo.keys.CTRL:
case dojo.keys.TAB:
return;
}
}
if(this.intermediateChanges){
var _4cb=this;
setTimeout(function(){
_4cb._handleOnChange(_4cb.attr("value"),false);
},0);
}
this._refreshState();
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
if(dojo.isMoz||dojo.isOpera){
this.connect(this.textbox,"oninput",this._onInput);
}else{
this.connect(this.textbox,"onkeydown",this._onInput);
this.connect(this.textbox,"onkeyup",this._onInput);
this.connect(this.textbox,"onpaste",this._onInput);
this.connect(this.textbox,"oncut",this._onInput);
}
this._layoutHack();
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=dojo.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.attr("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
},_onFocus:function(e){
if(this.disabled){
return;
}
this._refreshState();
this.inherited(arguments);
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
dijit.selectInputText=function(_4d0,_4d1,stop){
var _4d3=dojo.global;
var _4d4=dojo.doc;
_4d0=dojo.byId(_4d0);
if(isNaN(_4d1)){
_4d1=0;
}
if(isNaN(stop)){
stop=_4d0.value?_4d0.value.length:0;
}
_4d0.focus();
if(_4d4["selection"]&&dojo.body()["createTextRange"]){
if(_4d0.createTextRange){
var _4d5=_4d0.createTextRange();
with(_4d5){
collapse(true);
moveStart("character",_4d1);
moveEnd("character",stop);
select();
}
}
}else{
if(_4d3["getSelection"]){
var _4d6=_4d3.getSelection();
if(_4d0.setSelectionRange){
_4d0.setSelectionRange(_4d1,stop);
}
}
}
};
}
if(!dojo._hasResource["dijit.Tooltip"]){
dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:dijit.defaultDuration,templateString:"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\">\n\t<div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" waiRole='alert'></div>\n\t<div class=\"dijitTooltipConnector\"></div>\n</div>\n",postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")});
},show:function(_4d7,_4d8,_4d9){
if(this.aroundNode&&this.aroundNode===_4d8){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_4d7;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var _4da={};
var ltr=this.isLeftToRight();
dojo.forEach((_4d9&&_4d9.length)?_4d9:dijit.Tooltip.defaultPosition,function(pos){
switch(pos){
case "after":
_4da[ltr?"BR":"BL"]=ltr?"BL":"BR";
break;
case "before":
_4da[ltr?"BL":"BR"]=ltr?"BR":"BL";
break;
case "below":
_4da[ltr?"BL":"BR"]=ltr?"TL":"TR";
_4da[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above":
default:
_4da[ltr?"TL":"TR"]=ltr?"BL":"BR";
_4da[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
var pos=dijit.placeOnScreenAroundElement(this.domNode,_4d8,_4da,dojo.hitch(this,"orient"));
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_4d8;
},orient:function(node,_4df,_4e0){
node.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_4df+"-"+_4e0];
},_onShow:function(){
if(dojo.isIE){
this.domNode.style.filter="";
}
},hide:function(_4e1){
if(this._onDeck&&this._onDeck[1]==_4e1){
this._onDeck=null;
}else{
if(this.aroundNode===_4e1){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
dijit.showTooltip=function(_4e2,_4e3,_4e4){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.show(_4e2,_4e3,_4e4);
};
dijit.hideTooltip=function(_4e5){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.hide(_4e5);
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(ids){
this._connectNodes=[];
this.connectId=dojo.isArrayLike(ids)?ids:[ids];
dojo.forEach(this.connectId,function(id){
var node=dojo.byId(id);
if(node){
this._connectNodes.push(node);
dojo.forEach(["onMouseEnter","onMouseLeave","onFocus","onBlur"],function(_4e9){
this.connect(node,_4e9.toLowerCase(),"_"+_4e9);
},this);
if(dojo.isIE){
node.style.zoom=1;
}
}
},this);
},postCreate:function(){
dojo.addClass(this.domNode,"dijitTooltipData");
},_onMouseEnter:function(e){
this._onHover(e);
},_onMouseLeave:function(e){
this._onUnHover(e);
},_onFocus:function(e){
this._focus=true;
this._onHover(e);
this.inherited(arguments);
},_onBlur:function(e){
this._focus=false;
this._onUnHover(e);
this.inherited(arguments);
},_onHover:function(e){
if(!this._showTimer){
var _4ef=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_4ef);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_4f1){
_4f1=_4f1||this._connectNodes[0];
if(!_4f1){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
dijit.showTooltip(this.label||this.domNode.innerHTML,_4f1,this.position);
this._connectNode=_4f1;
},close:function(){
if(this._connectNode){
dijit.hideTooltip(this._connectNode);
delete this._connectNode;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},uninitialize:function(){
this.close();
}});
dijit.Tooltip.defaultPosition=["after","before"];
}
if(!dojo._hasResource["dijit.form.ValidationTextBox"]){
dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:"<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\" waiRole=\"presentation\"\n\t><div style=\"overflow:hidden;\"\n\t\t><div class=\"dijitReset dijitValidationIcon\"><br></div\n\t\t><div class=\"dijitReset dijitValidationIconText\">&Chi;</div\n\t\t><div class=\"dijitReset dijitInputField\"\n\t\t\t><input class=\"dijitReset\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${nameAttrSetting} type='${type}'\n\t\t/></div\n\t></div\n></div>\n",baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(_4f2){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this._focused);
},validator:function(_4f3,_4f4){
return (new RegExp("^(?:"+this.regExpGen(_4f4)+")"+(this.required?"":"?")+"$")).test(_4f3)&&(!this.required||!this._isEmpty(_4f3))&&(this._isEmpty(_4f3)||this.parse(_4f3,_4f4)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(_4f5){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_4f6){
return /^\s*$/.test(_4f6);
},getErrorMessage:function(_4f7){
return this.invalidMessage;
},getPromptMessage:function(_4f8){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_4f9){
var _4fa="";
var _4fb=this.disabled||this.isValid(_4f9);
if(_4fb){
this._maskValidSubsetError=true;
}
var _4fc=!_4fb&&_4f9&&this._isValidSubset();
var _4fd=this._isEmpty(this.textbox.value);
this.state=(_4fb||(!this._hasBeenBlurred&&_4fd)||_4fc)?"":"Error";
if(this.state=="Error"){
this._maskValidSubsetError=false;
}
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",_4fb?"false":"true");
if(_4f9){
if(_4fd){
_4fa=this.getPromptMessage(true);
}
if(!_4fa&&(this.state=="Error"||(_4fc&&!this._maskValidSubsetError))){
_4fa=this.getErrorMessage(true);
}
}
this.displayMessage(_4fa);
return _4fb;
},_message:"",displayMessage:function(_4fe){
if(this._message==_4fe){
return;
}
this._message=_4fe;
dijit.hideTooltip(this.domNode);
if(_4fe){
dijit.showTooltip(_4fe,this.domNode,this.tooltipPosition);
}
},_refreshState:function(){
this.validate(this._focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _500="";
if(p!=".*"){
this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_500+=re;
break;
case ")":
_500+="|$)";
break;
default:
_500+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_500);
}
catch(e){
_500=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_500+")$";
},_setDisabledAttr:function(_502){
this.inherited(arguments);
if(this.valueNode){
this.valueNode.disabled=_502;
}
this._refreshState();
},_setRequiredAttr:function(_503){
this.required=_503;
dijit.setWaiState(this.focusNode,"required",_503);
this._refreshState();
},postCreate:function(){
if(dojo.isIE){
var s=dojo.getComputedStyle(this.focusNode);
if(s){
var ff=s.fontFamily;
if(ff){
this.focusNode.style.fontFamily=ff;
}
}
}
this.inherited(arguments);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},serialize:function(val,_507){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.attr("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=dojo.create("input",{style:{display:"none"},type:this.type,name:this.name},this.textbox,"after");
},_setDisabledAttr:function(_509){
this.inherited(arguments);
dojo.attr(this.valueNode,"disabled",_509);
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",rangeCheck:function(_50a,_50b){
var _50c="min" in _50b;
var _50d="max" in _50b;
if(_50c||_50d){
return (!_50c||this.compare(_50a,_50b.min)>=0)&&(!_50d||this.compare(_50a,_50b.max)<=0);
}
return true;
},isInRange:function(_50e){
return this.rangeCheck(this.attr("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.attr("value");
var _510=false;
var _511=false;
if("min" in this.constraints){
var min=this.constraints.min;
val=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min);
_510=(typeof val=="number")&&val<0;
}
if("max" in this.constraints){
var max=this.constraints.max;
val=this.compare(val,((typeof max!="number")||max>0)?max:0);
_511=(typeof val=="number")&&val>0;
}
return _510||_511;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_514){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_514));
},getErrorMessage:function(_515){
if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(_515)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},postCreate:function(){
this.inherited(arguments);
if(this.constraints.min!==undefined){
dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min);
}
if(this.constraints.max!==undefined){
dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max);
}
},_setValueAttr:function(_516,_517){
dijit.setWaiState(this.focusNode,"valuenow",_516);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dojo.data.util.simpleFetch"]){
dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(_518){
_518=_518||{};
if(!_518.store){
_518.store=this;
}
var self=this;
var _51a=function(_51b,_51c){
if(_51c.onError){
var _51d=_51c.scope||dojo.global;
_51c.onError.call(_51d,_51b,_51c);
}
};
var _51e=function(_51f,_520){
var _521=_520.abort||null;
var _522=false;
var _523=_520.start?_520.start:0;
var _524=(_520.count&&(_520.count!==Infinity))?(_523+_520.count):_51f.length;
_520.abort=function(){
_522=true;
if(_521){
_521.call(_520);
}
};
var _525=_520.scope||dojo.global;
if(!_520.store){
_520.store=self;
}
if(_520.onBegin){
_520.onBegin.call(_525,_51f.length,_520);
}
if(_520.sort){
_51f.sort(dojo.data.util.sorter.createSortFunction(_520.sort,self));
}
if(_520.onItem){
for(var i=_523;(i<_51f.length)&&(i<_524);++i){
var item=_51f[i];
if(!_522){
_520.onItem.call(_525,item,_520);
}
}
}
if(_520.onComplete&&!_522){
var _528=null;
if(!_520.onItem){
_528=_51f.slice(_523,_524);
}
_520.onComplete.call(_525,_528,_520);
}
};
this._fetchItems(_518,_51e,_51a);
return _518;
};
}
if(!dojo._hasResource["dojo.data.util.filter"]){
dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(_529,_52a){
var rxp="^";
var c=null;
for(var i=0;i<_529.length;i++){
c=_529.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_529.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_52a){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
}
if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(str,_52f){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_52f&&_52f.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_533){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_533);
};
dojo.regexp.group=function(_536,_537){
return "("+(_537?"?:":"")+_536+")";
};
}
if(!dojo._hasResource["dijit.form.ComboBox"]){
dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,hasDownArrow:true,templateString:"<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\" dojoAttachPoint=\"comboNode\" waiRole=\"textbox\" tabIndex=\"-1\"\n\t><div style=\"overflow:hidden;\"\n\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton'\n\t\t\tdojoAttachPoint=\"downArrowNode\" waiRole=\"presentation\"\n\t\t\tdojoAttachEvent=\"onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse\"\n\t\t\t><div class=\"dijitArrowButtonInner\">&thinsp;</div\n\t\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div\n\t\t></div\n\t\t><div class=\"dijitReset dijitValidationIcon\"><br></div\n\t\t><div class=\"dijitReset dijitValidationIconText\">&Chi;</div\n\t\t><div class=\"dijitReset dijitInputField\" \n\t\t\t><input ${nameAttrSetting} type=\"text\" autocomplete=\"off\" class='dijitReset'\n\t\t\tdojoAttachEvent=\"onkeypress:_onKeyPress,compositionend\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" waiRole=\"textbox\" waiState=\"haspopup-true,autocomplete-list\"\n\t\t/></div\n\t></div\n></div>\n",baseClass:"dijitComboBox",_getCaretPos:function(_538){
var pos=0;
if(typeof (_538.selectionStart)=="number"){
pos=_538.selectionStart;
}else{
if(dojo.isIE){
var tr=dojo.doc.selection.createRange().duplicate();
var ntr=_538.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_53c,_53d){
_53d=parseInt(_53d);
dijit.selectInputText(_53c,_53d,_53d);
},_setDisabledAttr:function(_53e){
this.inherited(arguments);
dijit.setWaiState(this.comboNode,"disabled",_53e);
},_onKeyPress:function(evt){
var key=evt.charOrCode;
if(evt.altKey||(evt.ctrlKey&&(key!="x"&&key!="v"))||evt.key==dojo.keys.SHIFT){
return;
}
var _541=false;
var pw=this._popupWidget;
var dk=dojo.keys;
var _544=null;
if(this._isShowingNow){
pw.handleKey(key);
_544=pw.getHighlightedOption();
}
switch(key){
case dk.PAGE_DOWN:
case dk.DOWN_ARROW:
if(!this._isShowingNow||this._prev_key_esc){
this._arrowPressed();
_541=true;
}else{
if(_544){
this._announceOption(_544);
}
}
dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dk.PAGE_UP:
case dk.UP_ARROW:
if(this._isShowingNow){
this._announceOption(_544);
}
dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dk.ENTER:
if(_544){
if(_544==pw.nextButton){
this._nextSearch(1);
dojo.stopEvent(evt);
break;
}else{
if(_544==pw.previousButton){
this._nextSearch(-1);
dojo.stopEvent(evt);
break;
}
}
}else{
this._setDisplayedValueAttr(this.attr("displayedValue"),true);
}
evt.preventDefault();
case dk.TAB:
var _545=this.attr("displayedValue");
if(pw&&(_545==pw._messages["previousMessage"]||_545==pw._messages["nextMessage"])){
break;
}
if(this._isShowingNow){
this._prev_key_backspace=false;
this._prev_key_esc=false;
if(_544){
pw.attr("value",{target:_544});
}
this._lastQuery=null;
this._hideResultList();
}
break;
case " ":
this._prev_key_backspace=false;
this._prev_key_esc=false;
if(_544){
dojo.stopEvent(evt);
this._selectOption();
this._hideResultList();
}else{
_541=true;
}
break;
case dk.ESCAPE:
this._prev_key_backspace=false;
this._prev_key_esc=true;
if(this._isShowingNow){
dojo.stopEvent(evt);
this._hideResultList();
}
break;
case dk.DELETE:
case dk.BACKSPACE:
this._prev_key_esc=false;
this._prev_key_backspace=true;
_541=true;
break;
case dk.RIGHT_ARROW:
case dk.LEFT_ARROW:
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:
this._prev_key_backspace=false;
this._prev_key_esc=false;
_541=typeof key=="string";
}
if(this.searchTimer){
clearTimeout(this.searchTimer);
}
if(_541){
setTimeout(dojo.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
dijit.selectInputText(fn,fn.value.length);
var _548=this.ignoreCase?"toLowerCase":"substr";
if(text[_548](0).indexOf(this.focusNode.value[_548](0))==0){
var cpos=this._getCaretPos(fn);
if((cpos+1)>fn.value.length){
fn.value=text;
dijit.selectInputText(fn,cpos);
}
}else{
fn.value=text;
dijit.selectInputText(fn);
}
},_openResultList:function(_54a,_54b){
if(this.disabled||this.readOnly||(_54b.query[this.searchAttr]!=this._lastQuery)){
return;
}
this._popupWidget.clearResultList();
if(!_54a.length){
this._hideResultList();
return;
}
this.item=null;
var _54c=new String(this.store.getValue(_54a[0],this.searchAttr));
if(_54c&&this.autoComplete&&!this._prev_key_backspace&&(_54b.query[this.searchAttr]!="*")){
this.item=_54a[0];
this._autoCompleteText(_54c);
}
_54b._maxOptions=this._maxOptions;
this._popupWidget.createOptions(_54a,_54b,dojo.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_54b.direction){
if(1==_54b.direction){
this._popupWidget.highlightFirstOption();
}else{
if(-1==_54b.direction){
this._popupWidget.highlightLastOption();
}
}
this._announceOption(this._popupWidget.getHighlightedOption());
}
},_showResultList:function(){
this._hideResultList();
var _54d=this._popupWidget.getItems(),_54e=Math.min(_54d.length,this.maxListLength);
this._arrowPressed();
this.displayMessage("");
dojo.style(this._popupWidget.domNode,{width:"",height:""});
var best=this.open();
var _550=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==_550.h)&&(best.w==_550.w))?"hidden":"auto";
var _551=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){
_551+=16;
}
dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(_551,this.domNode.offsetWidth)});
dijit.setWaiState(this.comboNode,"expanded","true");
},_hideResultList:function(){
if(this._isShowingNow){
dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false;
dijit.setWaiState(this.comboNode,"expanded","false");
dijit.removeWaiState(this.focusNode,"activedescendant");
}
},_setBlurValue:function(){
var _552=this.attr("displayedValue");
var pw=this._popupWidget;
if(pw&&(_552==pw._messages["previousMessage"]||_552==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
this.attr("displayedValue",_552);
}
},_onBlur:function(){
this._hideResultList();
this._arrowIdle();
this.inherited(arguments);
},_announceOption:function(node){
if(node==null){
return;
}
var _555;
if(node==this._popupWidget.nextButton||node==this._popupWidget.previousButton){
_555=node.innerHTML;
}else{
_555=this.store.getValue(node.item,this.searchAttr);
}
this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
dijit.setWaiState(this.focusNode,"activedescendant",dojo.attr(node,"id"));
this._autoCompleteText(_555);
},_selectOption:function(evt){
var tgt=null;
if(!evt){
evt={target:this._popupWidget.getHighlightedOption()};
}
if(!evt.target){
this.attr("displayedValue",this.attr("displayedValue"));
return;
}else{
tgt=evt.target;
}
if(!evt.noHide){
this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(tgt.item,this.searchAttr).length);
}
this._doSelect(tgt);
},_doSelect:function(tgt){
this.item=tgt.item;
this.attr("value",this.store.getValue(tgt.item,this.searchAttr));
},_onArrowMouseDown:function(evt){
if(this.disabled||this.readOnly){
return;
}
dojo.stopEvent(evt);
this.focus();
if(this._isShowingNow){
this._hideResultList();
}else{
this._startSearch("");
}
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return dojo.string.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this._popupWidget){
var _55c=this.id+"_popup";
this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption),id:_55c});
dijit.removeWaiState(this.focusNode,"activedescendant");
dijit.setWaiState(this.textbox,"owns",_55c);
}
this.item=null;
var _55d=dojo.clone(this.query);
this._lastInput=key;
this._lastQuery=_55d[this.searchAttr]=this._getQueryString(key);
this.searchTimer=setTimeout(dojo.hitch(this,function(_55e,_55f){
var _560={queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:_55e,onBegin:dojo.hitch(this,"_setMaxOptions"),onComplete:dojo.hitch(this,"_openResultList"),onError:function(_561){
console.error("dijit.form.ComboBox: "+_561);
dojo.hitch(_55f,"_hideResultList")();
},start:0,count:this.pageSize};
dojo.mixin(_560,_55f.fetchProperties);
var _562=_55f.store.fetch(_560);
var _563=function(_564,_565){
_564.start+=_564.count*_565;
_564.direction=_565;
this.store.fetch(_564);
};
this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,_563,_562);
},_55d,this),this.searchDelay);
},_setMaxOptions:function(size,_567){
this._maxOptions=size;
},_getValueField:function(){
return this.searchAttr;
},_arrowPressed:function(){
if(!this.disabled&&!this.readOnly&&this.hasDownArrow){
dojo.addClass(this.downArrowNode,"dijitArrowButtonActive");
}
},_arrowIdle:function(){
if(!this.disabled&&!this.readOnly&&this.hasDownArrow){
dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed");
}
},compositionend:function(evt){
this._onKeyPress({charCode:-1});
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.hasDownArrow){
this.baseClass="dijitTextBox";
}
if(!this.store){
var _569=this.srcNodeRef;
this.store=new dijit.form._ComboBoxDataStore(_569);
if(!this.value||((typeof _569.selectedIndex=="number")&&_569.selectedIndex.toString()===this.value)){
var item=this.store.fetchSelectedItem();
if(item){
this.value=this.store.getValue(item,this._getValueField());
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _56b=dojo.query("label[for=\""+this.id+"\"]");
if(_56b.length){
_56b[0].id=(this.id+"_label");
var cn=this.comboNode;
dijit.setWaiState(cn,"labelledby",_56b[0].id);
}
this.inherited(arguments);
},uninitialize:function(){
if(this._popupWidget){
this._hideResultList();
this._popupWidget.destroy();
}
},_getMenuLabelFromItem:function(item){
var _56e=this.store.getValue(item,this.labelAttr||this.searchAttr);
var _56f=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_56e=this.doHighlight(_56e,this._escapeHtml(this._lastInput));
_56f="html";
}
return {html:_56f=="html",label:_56e};
},doHighlight:function(_570,find){
var _572="i"+(this.highlightMatch=="all"?"g":"");
var _573=this._escapeHtml(_570);
find=dojo.regexp.escapeString(find);
var ret=_573.replace(new RegExp("(^|\\s)("+find+")",_572),"$1<span class=\"dijitComboBoxHighlightMatch\">$2</span>");
return ret;
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},open:function(){
this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this});
},reset:function(){
this.item=null;
this.inherited(arguments);
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<ul class='dijitReset dijitMenu' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' tabIndex='-1' style='overflow: \"auto\"; overflow-x: \"hidden\";'>"+"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton' waiRole='option'></li>"+"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton' waiRole='option'></li>"+"</ul>",_messages:null,postMixInProperties:function(){
this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited(arguments);
},_setValueAttr:function(_576){
this.value=_576;
this.onChange(_576);
},onChange:function(_577){
},onPage:function(_578){
},postCreate:function(){
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
this.inherited(arguments);
},onClose:function(){
this._blurOptionNode();
},_createOption:function(item,_57a){
var _57b=_57a(item);
var _57c=dojo.doc.createElement("li");
dijit.setWaiRole(_57c,"option");
if(_57b.html){
_57c.innerHTML=_57b.label;
}else{
_57c.appendChild(dojo.doc.createTextNode(_57b.label));
}
if(_57c.innerHTML==""){
_57c.innerHTML="&nbsp;";
}
_57c.item=item;
return _57c;
},createOptions:function(_57d,_57e,_57f){
this.previousButton.style.display=(_57e.start==0)?"none":"";
dojo.attr(this.previousButton,"id",this.id+"_prev");
dojo.forEach(_57d,function(item,i){
var _582=this._createOption(item,_57f);
_582.className="dijitReset dijitMenuItem";
dojo.attr(_582,"id",this.id+i);
this.domNode.insertBefore(_582,this.nextButton);
},this);
var _583=false;
if(_57e._maxOptions&&_57e._maxOptions!=-1){
if((_57e.start+_57e.count)<_57e._maxOptions){
_583=true;
}else{
if((_57e.start+_57e.count)>(_57e._maxOptions-1)){
if(_57e.count==_57d.length){
_583=true;
}
}
}
}else{
if(_57e.count==_57d.length){
_583=true;
}
}
this.nextButton.style.display=_583?"":"none";
dojo.attr(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
while(this.domNode.childNodes.length>2){
this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2]);
}
},getItems:function(){
return this.domNode.childNodes;
},getListLength:function(){
return this.domNode.childNodes.length-2;
},_onMouseDown:function(evt){
dojo.stopEvent(evt);
},_onMouseUp:function(evt){
if(evt.target===this.domNode){
return;
}else{
if(evt.target==this.previousButton){
this.onPage(-1);
}else{
if(evt.target==this.nextButton){
this.onPage(1);
}else{
var tgt=evt.target;
while(!tgt.item){
tgt=tgt.parentNode;
}
this._setValueAttr({target:tgt},true);
}
}
}
},_onMouseOver:function(evt){
if(evt.target===this.domNode){
return;
}
var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){
while(!tgt.item){
tgt=tgt.parentNode;
}
}
this._focusOptionNode(tgt);
},_onMouseOut:function(evt){
if(evt.target===this.domNode){
return;
}
this._blurOptionNode();
},_focusOptionNode:function(node){
if(this._highlighted_option!=node){
this._blurOptionNode();
this._highlighted_option=node;
dojo.addClass(this._highlighted_option,"dijitMenuItemSelected");
}
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.removeClass(this._highlighted_option,"dijitMenuItemSelected");
this._highlighted_option=null;
}
},_highlightNextOption:function(){
var fc=this.domNode.firstChild;
if(!this.getHighlightedOption()){
this._focusOptionNode(fc.style.display=="none"?fc.nextSibling:fc);
}else{
var ns=this._highlighted_option.nextSibling;
if(ns&&ns.style.display!="none"){
this._focusOptionNode(ns);
}
}
dijit.scrollIntoView(this._highlighted_option);
},highlightFirstOption:function(){
this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option);
},highlightLastOption:function(){
this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option);
},_highlightPrevOption:function(){
var lc=this.domNode.lastChild;
if(!this.getHighlightedOption()){
this._focusOptionNode(lc.style.display=="none"?lc.previousSibling:lc);
}else{
var ps=this._highlighted_option.previousSibling;
if(ps&&ps.style.display!="none"){
this._focusOptionNode(ps);
}
}
dijit.scrollIntoView(this._highlighted_option);
},_page:function(up){
var _590=0;
var _591=this.domNode.scrollTop;
var _592=dojo.style(this.domNode,"height");
if(!this.getHighlightedOption()){
this._highlightNextOption();
}
while(_590<_592){
if(up){
if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){
break;
}
this._highlightPrevOption();
}else{
if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){
break;
}
this._highlightNextOption();
}
var _593=this.domNode.scrollTop;
_590+=(_593-_591)*(up?-1:1);
_591=_593;
}
},pageUp:function(){
this._page(true);
},pageDown:function(){
this._page(false);
},getHighlightedOption:function(){
var ho=this._highlighted_option;
return (ho&&ho.parentNode)?ho:null;
},handleKey:function(key){
switch(key){
case dojo.keys.DOWN_ARROW:
this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:
this.pageDown();
break;
case dojo.keys.UP_ARROW:
this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:
this.pageUp();
break;
}
}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{_setValueAttr:function(_596,_597){
if(!_596){
_596="";
}
dijit.form.ValidationTextBox.prototype._setValueAttr.call(this,_596,_597);
}});
dojo.declare("dijit.form._ComboBoxDataStore",null,{constructor:function(root){
this.root=root;
dojo.query("> option",root).forEach(function(node){
node.innerHTML=dojo.trim(node.innerHTML);
});
},getValue:function(item,_59b,_59c){
return (_59b=="value")?item.value:(item.innerText||item.textContent||"");
},isItemLoaded:function(_59d){
return true;
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},_fetchItems:function(args,_59f,_5a0){
if(!args.query){
args.query={};
}
if(!args.query.name){
args.query.name="";
}
if(!args.queryOptions){
args.queryOptions={};
}
var _5a1=dojo.data.util.filter.patternToRegExp(args.query.name,args.queryOptions.ignoreCase),_5a2=dojo.query("> option",this.root).filter(function(_5a3){
return (_5a3.innerText||_5a3.textContent||"").match(_5a1);
});
if(args.sort){
_5a2.sort(dojo.data.util.sorter.createSortFunction(args.sort,this));
}
_59f(_5a2,args);
},close:function(_5a4){
return;
},getLabel:function(item){
return item.innerHTML;
},getIdentity:function(item){
return dojo.attr(item,"value");
},fetchItemByIdentity:function(args){
var item=dojo.query("option[value='"+args.identity+"']",this.root)[0];
args.onItem(item);
},fetchSelectedItem:function(){
var root=this.root,si=root.selectedIndex;
return dojo.query("> option:nth-child("+(si!=-1?si+1:1)+")",root)[0];
}});
dojo.extend(dijit.form._ComboBoxDataStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["dojox.string.Builder"]){
dojo._hasResource["dojox.string.Builder"]=true;
dojo.provide("dojox.string.Builder");
dojox.string.Builder=function(str){
var b="";
this.length=0;
this.append=function(s){
if(arguments.length>1){
var tmp="",l=arguments.length;
switch(l){
case 9:
tmp=""+arguments[8]+tmp;
case 8:
tmp=""+arguments[7]+tmp;
case 7:
tmp=""+arguments[6]+tmp;
case 6:
tmp=""+arguments[5]+tmp;
case 5:
tmp=""+arguments[4]+tmp;
case 4:
tmp=""+arguments[3]+tmp;
case 3:
tmp=""+arguments[2]+tmp;
case 2:
b+=""+arguments[0]+arguments[1]+tmp;
break;
default:
var i=0;
while(i<arguments.length){
tmp+=arguments[i++];
}
b+=tmp;
}
}else{
b+=s;
}
this.length=b.length;
return this;
};
this.concat=function(s){
return this.append.apply(this,arguments);
};
this.appendArray=function(_5b2){
return this.append.apply(this,_5b2);
};
this.clear=function(){
b="";
this.length=0;
return this;
};
this.replace=function(_5b3,_5b4){
b=b.replace(_5b3,_5b4);
this.length=b.length;
return this;
};
this.remove=function(_5b5,len){
if(len===undefined){
len=b.length;
}
if(len==0){
return this;
}
b=b.substr(0,_5b5)+b.substr(_5b5+len);
this.length=b.length;
return this;
};
this.insert=function(_5b7,str){
if(_5b7==0){
b=str+b;
}else{
b=b.slice(0,_5b7)+str+b.slice(_5b7);
}
this.length=b.length;
return this;
};
this.toString=function(){
return b;
};
if(str){
this.append(str);
}
};
}
if(!dojo._hasResource["dojox.string.tokenize"]){
dojo._hasResource["dojox.string.tokenize"]=true;
dojo.provide("dojox.string.tokenize");
dojox.string.tokenize=function(str,re,_5bb,_5bc){
var _5bd=[];
var _5be,_5bf,_5c0=0;
while(_5be=re.exec(str)){
_5bf=str.slice(_5c0,re.lastIndex-_5be[0].length);
if(_5bf.length){
_5bd.push(_5bf);
}
if(_5bb){
if(dojo.isOpera){
var copy=_5be.slice(0);
while(copy.length<_5be.length){
copy.push(null);
}
_5be=copy;
}
var _5c2=_5bb.apply(_5bc,_5be.slice(1).concat(_5bd.length));
if(typeof _5c2!="undefined"){
_5bd.push(_5c2);
}
}
_5c0=re.lastIndex;
}
_5bf=str.slice(_5c0);
if(_5bf.length){
_5bd.push(_5bf);
}
return _5bd;
};
}
if(!dojo._hasResource["dojox.dtl._base"]){
dojo._hasResource["dojox.dtl._base"]=true;
dojo.provide("dojox.dtl._base");
dojo.experimental("dojox.dtl");
(function(){
var dd=dojox.dtl;
dd.TOKEN_BLOCK=-1;
dd.TOKEN_VAR=-2;
dd.TOKEN_COMMENT=-3;
dd.TOKEN_TEXT=3;
dd._Context=dojo.extend(function(dict){
dojo._mixin(this,dict||{});
this._dicts=[];
},{push:function(){
var last=this;
var _5c6=dojo.delegate(this);
_5c6.pop=function(){
return last;
};
return _5c6;
},pop:function(){
throw new Error("pop() called on empty Context");
},get:function(key,_5c8){
if(typeof this[key]!="undefined"){
return this._normalize(this[key]);
}
for(var i=0,dict;dict=this._dicts[i];i++){
if(typeof dict[key]!="undefined"){
return this._normalize(dict[key]);
}
}
return _5c8;
},_normalize:function(_5cb){
if(_5cb instanceof Date){
_5cb.year=_5cb.getFullYear();
_5cb.month=_5cb.getMonth()+1;
_5cb.day=_5cb.getDate();
_5cb.date=_5cb.year+"-"+("0"+_5cb.month).slice(-2)+"-"+("0"+_5cb.day).slice(-2);
_5cb.hour=_5cb.getHours();
_5cb.minute=_5cb.getMinutes();
_5cb.second=_5cb.getSeconds();
_5cb.microsecond=_5cb.getMilliseconds();
}
return _5cb;
},update:function(dict){
var _5cd=this.push();
if(dict){
dojo._mixin(this,dict);
}
return _5cd;
}});
var _5ce=/("(?:[^"\\]*(?:\\.[^"\\]*)*)"|'(?:[^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+)/g;
var _5cf=/\s+/g;
var _5d0=function(_5d1,_5d2){
_5d1=_5d1||_5cf;
if(!(_5d1 instanceof RegExp)){
_5d1=new RegExp(_5d1,"g");
}
if(!_5d1.global){
throw new Error("You must use a globally flagged RegExp with split "+_5d1);
}
_5d1.exec("");
var part,_5d4=[],_5d5=0,i=0;
while(part=_5d1.exec(this)){
_5d4.push(this.slice(_5d5,_5d1.lastIndex-part[0].length));
_5d5=_5d1.lastIndex;
if(_5d2&&(++i>_5d2-1)){
break;
}
}
_5d4.push(this.slice(_5d5));
return _5d4;
};
dd.Token=function(_5d7,_5d8){
this.token_type=_5d7;
this.contents=new String(dojo.trim(_5d8));
this.contents.split=_5d0;
this.split=function(){
return String.prototype.split.apply(this.contents,arguments);
};
};
dd.Token.prototype.split_contents=function(_5d9){
var bit,bits=[],i=0;
_5d9=_5d9||999;
while(i++<_5d9&&(bit=_5ce.exec(this.contents))){
bit=bit[0];
if(bit.charAt(0)=="\""&&bit.slice(-1)=="\""){
bits.push("\""+bit.slice(1,-1).replace("\\\"","\"").replace("\\\\","\\")+"\"");
}else{
if(bit.charAt(0)=="'"&&bit.slice(-1)=="'"){
bits.push("'"+bit.slice(1,-1).replace("\\'","'").replace("\\\\","\\")+"'");
}else{
bits.push(bit);
}
}
}
return bits;
};
var ddt=dd.text={_get:function(_5de,name,_5e0){
var _5e1=dd.register.get(_5de,name.toLowerCase(),_5e0);
if(!_5e1){
if(!_5e0){
throw new Error("No tag found for "+name);
}
return null;
}
var fn=_5e1[1];
var _5e3=_5e1[2];
var _5e4;
if(fn.indexOf(":")!=-1){
_5e4=fn.split(":");
fn=_5e4.pop();
}
dojo["require"](_5e3);
var _5e5=dojo.getObject(_5e3);
return _5e5[fn||name]||_5e5[name+"_"]||_5e5[fn+"_"];
},getTag:function(name,_5e7){
return ddt._get("tag",name,_5e7);
},getFilter:function(name,_5e9){
return ddt._get("filter",name,_5e9);
},getTemplate:function(file){
return new dd.Template(ddt.getTemplateString(file));
},getTemplateString:function(file){
return dojo._getText(file.toString())||"";
},_resolveLazy:function(_5ec,sync,json){
if(sync){
if(json){
return dojo.fromJson(dojo._getText(_5ec))||{};
}else{
return dd.text.getTemplateString(_5ec);
}
}else{
return dojo.xhrGet({handleAs:(json)?"json":"text",url:_5ec});
}
},_resolveTemplateArg:function(arg,sync){
if(ddt._isTemplate(arg)){
if(!sync){
var d=new dojo.Deferred();
d.callback(arg);
return d;
}
return arg;
}
return ddt._resolveLazy(arg,sync);
},_isTemplate:function(arg){
return (typeof arg=="undefined")||(typeof arg=="string"&&(arg.match(/^\s*[<{]/)||arg.indexOf(" ")!=-1));
},_resolveContextArg:function(arg,sync){
if(arg.constructor==Object){
if(!sync){
var d=new dojo.Deferred;
d.callback(arg);
return d;
}
return arg;
}
return ddt._resolveLazy(arg,sync,true);
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(load\s*)?(.+?)\s*%\})/g,tokenize:function(str){
return dojox.string.tokenize(str,ddt._re,ddt._parseDelims);
},_parseDelims:function(varr,load,tag){
if(varr){
return [dd.TOKEN_VAR,varr];
}else{
if(load){
var _5fa=dojo.trim(tag).split(/\s+/g);
for(var i=0,part;part=_5fa[i];i++){
dojo["require"](part);
}
}else{
return [dd.TOKEN_BLOCK,tag];
}
}
}};
dd.Template=dojo.extend(function(_5fd,_5fe){
var str=_5fe?_5fd:ddt._resolveTemplateArg(_5fd,true)||"";
var _600=ddt.tokenize(str);
var _601=new dd._Parser(_600);
this.nodelist=_601.parse();
},{update:function(node,_603){
return ddt._resolveContextArg(_603).addCallback(this,function(_604){
var _605=this.render(new dd._Context(_604));
if(node.forEach){
node.forEach(function(item){
item.innerHTML=_605;
});
}else{
dojo.byId(node).innerHTML=_605;
}
return this;
});
},render:function(_607,_608){
_608=_608||this.getBuffer();
_607=_607||new dd._Context({});
return this.nodelist.render(_607,_608)+"";
},getBuffer:function(){
return new dojox.string.Builder();
}});
var qfRe=/\{\{\s*(.+?)\s*\}\}/g;
dd.quickFilter=function(str){
if(!str){
return new dd._NodeList();
}
if(str.indexOf("{%")==-1){
return new dd._QuickNodeList(dojox.string.tokenize(str,qfRe,function(_60b){
return new dd._Filter(_60b);
}));
}
};
dd._QuickNodeList=dojo.extend(function(_60c){
this.contents=_60c;
},{render:function(_60d,_60e){
for(var i=0,l=this.contents.length;i<l;i++){
if(this.contents[i].resolve){
_60e=_60e.concat(this.contents[i].resolve(_60d));
}else{
_60e=_60e.concat(this.contents[i]);
}
}
return _60e;
},dummyRender:function(_611){
return this.render(_611,dd.Template.prototype.getBuffer()).toString();
},clone:function(_612){
return this;
}});
dd._Filter=dojo.extend(function(_613){
if(!_613){
throw new Error("Filter must be called with variable name");
}
this.contents=_613;
var _614=this._cache[_613];
if(_614){
this.key=_614[0];
this.filters=_614[1];
}else{
this.filters=[];
dojox.string.tokenize(_613,this._re,this._tokenize,this);
this._cache[_613]=[this.key,this.filters];
}
},{_cache:{},_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_values:{0:"\"",1:"\"",2:"",8:"\""},_args:{4:"\"",5:"\"",6:"",7:"'"},_tokenize:function(){
var pos,arg;
for(var i=0,has=[];i<arguments.length;i++){
has[i]=(typeof arguments[i]!="undefined"&&typeof arguments[i]=="string"&&arguments[i]);
}
if(!this.key){
for(pos in this._values){
if(has[pos]){
this.key=this._values[pos]+arguments[pos]+this._values[pos];
break;
}
}
}else{
for(pos in this._args){
if(has[pos]){
var _619=arguments[pos];
if(this._args[pos]=="'"){
_619=_619.replace(/\\'/g,"'");
}else{
if(this._args[pos]=="\""){
_619=_619.replace(/\\"/g,"\"");
}
}
arg=[!this._args[pos],_619];
break;
}
}
var fn=ddt.getFilter(arguments[3]);
if(!dojo.isFunction(fn)){
throw new Error(arguments[3]+" is not registered as a filter");
}
this.filters.push([fn,arg]);
}
},getExpression:function(){
return this.contents;
},resolve:function(_61b){
if(typeof this.key=="undefined"){
return "";
}
var str=this.resolvePath(this.key,_61b);
for(var i=0,_61e;_61e=this.filters[i];i++){
if(_61e[1]){
if(_61e[1][0]){
str=_61e[0](str,this.resolvePath(_61e[1][1],_61b));
}else{
str=_61e[0](str,_61e[1][1]);
}
}else{
str=_61e[0](str);
}
}
return str;
},resolvePath:function(path,_620){
var _621,_622;
var _623=path.charAt(0);
var last=path.slice(-1);
if(!isNaN(parseInt(_623))){
_621=(path.indexOf(".")==-1)?parseInt(path):parseFloat(path);
}else{
if(_623=="\""&&_623==last){
_621=path.slice(1,-1);
}else{
if(path=="true"){
return true;
}
if(path=="false"){
return false;
}
if(path=="null"||path=="None"){
return null;
}
_622=path.split(".");
_621=_620.get(_622[0]);
if(dojo.isFunction(_621)){
var self=_620.getThis&&_620.getThis();
if(_621.alters_data){
_621="";
}else{
if(self){
_621=_621.call(self);
}else{
_621="";
}
}
}
for(var i=1;i<_622.length;i++){
var part=_622[i];
if(_621){
var base=_621;
if(dojo.isObject(_621)&&part=="items"&&typeof _621[part]=="undefined"){
var _629=[];
for(var key in _621){
_629.push([key,_621[key]]);
}
_621=_629;
continue;
}
if(_621.get&&dojo.isFunction(_621.get)&&_621.get.safe){
_621=_621.get(part);
}else{
if(typeof _621[part]=="undefined"){
_621=_621[part];
break;
}else{
_621=_621[part];
}
}
if(dojo.isFunction(_621)){
if(_621.alters_data){
_621="";
}else{
_621=_621.call(base);
}
}else{
if(_621 instanceof Date){
_621=dd._Context.prototype._normalize(_621);
}
}
}else{
return "";
}
}
}
}
return _621;
}});
dd._TextNode=dd._Node=dojo.extend(function(obj){
this.contents=obj;
},{set:function(data){
this.contents=data;
return this;
},render:function(_62d,_62e){
return _62e.concat(this.contents);
},isEmpty:function(){
return !dojo.trim(this.contents);
},clone:function(){
return this;
}});
dd._NodeList=dojo.extend(function(_62f){
this.contents=_62f||[];
this.last="";
},{push:function(node){
this.contents.push(node);
return this;
},concat:function(_631){
this.contents=this.contents.concat(_631);
return this;
},render:function(_632,_633){
for(var i=0;i<this.contents.length;i++){
_633=this.contents[i].render(_632,_633);
if(!_633){
throw new Error("Template must return buffer");
}
}
return _633;
},dummyRender:function(_635){
return this.render(_635,dd.Template.prototype.getBuffer()).toString();
},unrender:function(){
return arguments[1];
},clone:function(){
return this;
},rtrim:function(){
while(1){
i=this.contents.length-1;
if(this.contents[i] instanceof dd._TextNode&&this.contents[i].isEmpty()){
this.contents.pop();
}else{
break;
}
}
return this;
}});
dd._VarNode=dojo.extend(function(str){
this.contents=new dd._Filter(str);
},{render:function(_637,_638){
var str=this.contents.resolve(_637);
if(!str.safe){
str=dd._base.escape(""+str);
}
return _638.concat(str);
}});
dd._noOpNode=new function(){
this.render=this.unrender=function(){
return arguments[1];
};
this.clone=function(){
return this;
};
};
dd._Parser=dojo.extend(function(_63a){
this.contents=_63a;
},{i:0,parse:function(_63b){
var _63c={};
_63b=_63b||[];
for(var i=0;i<_63b.length;i++){
_63c[_63b[i]]=true;
}
var _63e=new dd._NodeList();
while(this.i<this.contents.length){
token=this.contents[this.i++];
if(typeof token=="string"){
_63e.push(new dd._TextNode(token));
}else{
var type=token[0];
var text=token[1];
if(type==dd.TOKEN_VAR){
_63e.push(new dd._VarNode(text));
}else{
if(type==dd.TOKEN_BLOCK){
if(_63c[text]){
--this.i;
return _63e;
}
var cmd=text.split(/\s+/g);
if(cmd.length){
cmd=cmd[0];
var fn=ddt.getTag(cmd);
if(fn){
_63e.push(fn(this,new dd.Token(type,text)));
}
}
}
}
}
}
if(_63b.length){
throw new Error("Could not find closing tag(s): "+_63b.toString());
}
this.contents.length=0;
return _63e;
},next_token:function(){
var _643=this.contents[this.i++];
return new dd.Token(_643[0],_643[1]);
},delete_first_token:function(){
this.i++;
},skip_past:function(_644){
while(this.i<this.contents.length){
var _645=this.contents[this.i++];
if(_645[0]==dd.TOKEN_BLOCK&&_645[1]==_644){
return;
}
}
throw new Error("Unclosed tag found when looking for "+_644);
},create_variable_node:function(expr){
return new dd._VarNode(expr);
},create_text_node:function(expr){
return new dd._TextNode(expr||"");
},getTemplate:function(file){
return new dd.Template(file);
}});
dd.register={_registry:{attributes:[],tags:[],filters:[]},get:function(_649,name){
var _64b=dd.register._registry[_649+"s"];
for(var i=0,_64d;_64d=_64b[i];i++){
if(typeof _64d[0]=="string"){
if(_64d[0]==name){
return _64d;
}
}else{
if(name.match(_64d[0])){
return _64d;
}
}
}
},getAttributeTags:function(){
var tags=[];
var _64f=dd.register._registry.attributes;
for(var i=0,_651;_651=_64f[i];i++){
if(_651.length==3){
tags.push(_651);
}else{
var fn=dojo.getObject(_651[1]);
if(fn&&dojo.isFunction(fn)){
_651.push(fn);
tags.push(_651);
}
}
}
return tags;
},_any:function(type,base,_655){
for(var path in _655){
for(var i=0,fn;fn=_655[path][i];i++){
var key=fn;
if(dojo.isArray(fn)){
key=fn[0];
fn=fn[1];
}
if(typeof key=="string"){
if(key.substr(0,5)=="attr:"){
var attr=fn;
if(attr.substr(0,5)=="attr:"){
attr=attr.slice(5);
}
dd.register._registry.attributes.push([attr.toLowerCase(),base+"."+path+"."+attr]);
}
key=key.toLowerCase();
}
dd.register._registry[type].push([key,fn,base+"."+path]);
}
}
},tags:function(base,_65c){
dd.register._any("tags",base,_65c);
},filters:function(base,_65e){
dd.register._any("filters",base,_65e);
}};
var _65f=/&/g;
var _660=/</g;
var _661=/>/g;
var _662=/'/g;
var _663=/"/g;
dd._base.escape=function(_664){
return dd.mark_safe(_664.replace(_65f,"&amp;").replace(_660,"&lt;").replace(_661,"&gt;").replace(_663,"&quot;").replace(_662,"&#39;"));
};
dd._base.safe=function(_665){
if(typeof _665=="string"){
_665=new String(_665);
}
if(typeof _665=="object"){
_665.safe=true;
}
return _665;
};
dd.mark_safe=dd._base.safe;
dd.register.tags("dojox.dtl.tag",{"date":["now"],"logic":["if","for","ifequal","ifnotequal"],"loader":["extends","block","include","load","ssi"],"misc":["comment","debug","filter","firstof","spaceless","templatetag","widthratio","with"],"loop":["cycle","ifchanged","regroup"]});
dd.register.filters("dojox.dtl.filter",{"dates":["date","time","timesince","timeuntil"],"htmlstrings":["linebreaks","linebreaksbr","removetags","striptags"],"integers":["add","get_digit"],"lists":["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"],"logic":["default","default_if_none","divisibleby","yesno"],"misc":["filesizeformat","pluralize","phone2numeric","pprint"],"strings":["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"]});
dd.register.filters("dojox.dtl",{"_base":["escape","safe"]});
})();
}
if(!dojo._hasResource["dojox.dtl.Context"]){
dojo._hasResource["dojox.dtl.Context"]=true;
dojo.provide("dojox.dtl.Context");
dojox.dtl.Context=dojo.extend(function(dict){
this._this={};
dojox.dtl._Context.call(this,dict);
},dojox.dtl._Context.prototype,{getKeys:function(){
var keys=[];
for(var key in this){
if(this.hasOwnProperty(key)&&key!="_dicts"&&key!="_this"){
keys.push(key);
}
}
return keys;
},extend:function(obj){
return dojo.delegate(this,obj);
},filter:function(_66a){
var _66b=new dojox.dtl.Context();
var keys=[];
var i,arg;
if(_66a instanceof dojox.dtl.Context){
keys=_66a.getKeys();
}else{
if(typeof _66a=="object"){
for(var key in _66a){
keys.push(key);
}
}else{
for(i=0;arg=arguments[i];i++){
if(typeof arg=="string"){
keys.push(arg);
}
}
}
}
for(i=0,key;key=keys[i];i++){
_66b[key]=this[key];
}
return _66b;
},setThis:function(_670){
this._this=_670;
},getThis:function(){
return this._this;
},hasKey:function(key){
if(typeof this[key]!="undefined"){
return true;
}
for(var i=0,dict;dict=this._dicts[i];i++){
if(typeof dict[key]!="undefined"){
return true;
}
}
return false;
}});
}
if(!dojo._hasResource["dojox.dtl.dom"]){
dojo._hasResource["dojox.dtl.dom"]=true;
dojo.provide("dojox.dtl.dom");
(function(){
var dd=dojox.dtl;
dd.BOOLS={checked:1,disabled:1,readonly:1};
dd.TOKEN_CHANGE=-11;
dd.TOKEN_ATTR=-12;
dd.TOKEN_CUSTOM=-13;
dd.TOKEN_NODE=1;
var ddt=dd.text;
var ddh=dd.dom={_attributes:{},_uppers:{},_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_reTrim:/(?:^[\n\s]*(\{%)?\s*|\s*(%\})?[\n\s]*$)/g,_reSplit:/\s*%\}[\n\s]*\{%\s*/g,getTemplate:function(text){
if(typeof this._commentable=="undefined"){
this._commentable=false;
var div=document.createElement("div");
div.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(div.childNodes.length&&div.childNodes[0].nodeType==8&&div.childNodes[0].data=="comment"){
this._commentable=true;
}
}
if(!this._commentable){
text=text.replace(/<!--({({|%).*?(%|})})-->/g,"$1");
}
if(dojo.isIE){
text=text.replace(/\b(checked|disabled|readonly|style)="/g,"t$1=\"");
}
text=text.replace(/\bstyle="/g,"tstyle=\"");
var _679;
var _67a=dojo.isWebKit;
var _67b=[[true,"select","option"],[_67a,"tr","td|th"],[_67a,"thead","tr","th"],[_67a,"tbody","tr","td"],[_67a,"table","tbody|thead|tr","tr","td"],];
var _67c=[];
for(var i=0,pair;pair=_67b[i];i++){
if(!pair[0]){
continue;
}
if(text.indexOf("<"+pair[1])!=-1){
var _67f=new RegExp("<"+pair[1]+"(?:.|\n)*?>((?:.|\n)+?)</"+pair[1]+">","ig");
tagLoop:
while(_679=_67f.exec(text)){
var _680=pair[2].split("|");
var _681=[];
for(var j=0,_683;_683=_680[j];j++){
_681.push("<"+_683+"(?:.|\n)*?>(?:.|\n)*?</"+_683+">");
}
var tags=[];
var _685=dojox.string.tokenize(_679[1],new RegExp("("+_681.join("|")+")","ig"),function(data){
var tag=/<(\w+)/.exec(data)[1];
if(!tags[tag]){
tags[tag]=true;
tags.push(tag);
}
return {data:data};
});
if(tags.length){
var tag=(tags.length==1)?tags[0]:pair[2].split("|")[0];
var _689=[];
for(var j=0,jl=_685.length;j<jl;j++){
var _68b=_685[j];
if(dojo.isObject(_68b)){
_689.push(_68b.data);
}else{
var _68c=_68b.replace(this._reTrim,"");
if(!_68c){
continue;
}
_68b=_68c.split(this._reSplit);
for(var k=0,kl=_68b.length;k<kl;k++){
var _68f="";
for(var p=2,pl=pair.length;p<pl;p++){
if(p==2){
_68f+="<"+tag+" dtlinstruction=\"{% "+_68b[k].replace("\"","\\\"")+" %}\">";
}else{
if(tag==pair[p]){
continue;
}else{
_68f+="<"+pair[p]+">";
}
}
}
_68f+="DTL";
for(var p=pair.length-1;p>1;p--){
if(p==2){
_68f+="</"+tag+">";
}else{
if(tag==pair[p]){
continue;
}else{
_68f+="</"+pair[p]+">";
}
}
}
_689.push("ÿ"+_67c.length);
_67c.push(_68f);
}
}
}
text=text.replace(_679[1],_689.join(""));
}
}
}
}
for(var i=_67c.length;i--;){
text=text.replace("ÿ"+i,_67c[i]);
}
var re=/\b([a-zA-Z_:][a-zA-Z0-9_\-\.:]*)=['"]/g;
while(_679=re.exec(text)){
var _693=_679[1].toLowerCase();
if(_693=="dtlinstruction"){
continue;
}
if(_693!=_679[1]){
this._uppers[_693]=_679[1];
}
this._attributes[_693]=true;
}
var div=document.createElement("div");
div.innerHTML=text;
var _694={nodes:[]};
while(div.childNodes.length){
_694.nodes.push(div.removeChild(div.childNodes[0]));
}
return _694;
},tokenize:function(_695){
var _696=[];
for(var i=0,node;node=_695[i++];){
if(node.nodeType!=1){
this.__tokenize(node,_696);
}else{
this._tokenize(node,_696);
}
}
return _696;
},_swallowed:[],_tokenize:function(node,_69a){
var _69b=false;
var _69c=this._swallowed;
var i,j,tag,_6a0;
if(!_69a.first){
_69b=_69a.first=true;
var tags=dd.register.getAttributeTags();
for(i=0;tag=tags[i];i++){
try{
(tag[2])({swallowNode:function(){
throw 1;
}},new dd.Token(dd.TOKEN_ATTR,""));
}
catch(e){
_69c.push(tag);
}
}
}
for(i=0;tag=_69c[i];i++){
var text=node.getAttribute(tag[0]);
if(text){
var _69c=false;
var _6a3=(tag[2])({swallowNode:function(){
_69c=true;
return node;
}},new dd.Token(dd.TOKEN_ATTR,tag[0]+" "+text));
if(_69c){
if(node.parentNode&&node.parentNode.removeChild){
node.parentNode.removeChild(node);
}
_69a.push([dd.TOKEN_CUSTOM,_6a3]);
return;
}
}
}
var _6a4=[];
if(dojo.isIE&&node.tagName=="SCRIPT"){
_6a4.push({nodeType:3,data:node.text});
node.text="";
}else{
for(i=0;_6a0=node.childNodes[i];i++){
_6a4.push(_6a0);
}
}
_69a.push([dd.TOKEN_NODE,node]);
var _6a5=false;
if(_6a4.length){
_69a.push([dd.TOKEN_CHANGE,node]);
_6a5=true;
}
for(var key in this._attributes){
var _6a7=false;
var _6a8="";
if(key=="class"){
_6a8=node.className||_6a8;
}else{
if(key=="for"){
_6a8=node.htmlFor||_6a8;
}else{
if(key=="value"&&node.value==node.innerHTML){
continue;
}else{
if(node.getAttribute){
_6a8=node.getAttribute(key,2)||_6a8;
if(key=="href"||key=="src"){
if(dojo.isIE){
var hash=location.href.lastIndexOf(location.hash);
var href=location.href.substring(0,hash).split("/");
href.pop();
href=href.join("/")+"/";
if(_6a8.indexOf(href)==0){
_6a8=_6a8.replace(href,"");
}
_6a8=decodeURIComponent(_6a8);
}
}else{
if(key=="tstyle"){
_6a7=key;
key="style";
}else{
if(dd.BOOLS[key.slice(1)]&&dojo.trim(_6a8)){
key=key.slice(1);
}else{
if(this._uppers[key]&&dojo.trim(_6a8)){
_6a7=this._uppers[key];
}
}
}
}
}
}
}
}
if(_6a7){
node.setAttribute(_6a7,"");
node.removeAttribute(_6a7);
}
if(typeof _6a8=="function"){
_6a8=_6a8.toString().replace(this._re4,"$1");
}
if(!_6a5){
_69a.push([dd.TOKEN_CHANGE,node]);
_6a5=true;
}
_69a.push([dd.TOKEN_ATTR,node,key,_6a8]);
}
for(i=0,_6a0;_6a0=_6a4[i];i++){
if(_6a0.nodeType==1){
var _6ab=_6a0.getAttribute("dtlinstruction");
if(_6ab){
_6a0.parentNode.removeChild(_6a0);
_6a0={nodeType:8,data:_6ab};
}
}
this.__tokenize(_6a0,_69a);
}
if(!_69b&&node.parentNode&&node.parentNode.tagName){
if(_6a5){
_69a.push([dd.TOKEN_CHANGE,node,true]);
}
_69a.push([dd.TOKEN_CHANGE,node.parentNode]);
node.parentNode.removeChild(node);
}else{
_69a.push([dd.TOKEN_CHANGE,node,true,true]);
}
},__tokenize:function(_6ac,_6ad){
var data=_6ac.data;
switch(_6ac.nodeType){
case 1:
this._tokenize(_6ac,_6ad);
return;
case 3:
if(data.match(/[^\s\n]/)&&(data.indexOf("{{")!=-1||data.indexOf("{%")!=-1)){
var _6af=ddt.tokenize(data);
for(var j=0,text;text=_6af[j];j++){
if(typeof text=="string"){
_6ad.push([dd.TOKEN_TEXT,text]);
}else{
_6ad.push(text);
}
}
}else{
_6ad.push([_6ac.nodeType,_6ac]);
}
if(_6ac.parentNode){
_6ac.parentNode.removeChild(_6ac);
}
return;
case 8:
if(data.indexOf("{%")==0){
var text=dojo.trim(data.slice(2,-2));
if(text.substr(0,5)=="load "){
var _6b2=dojo.trim(text).split(/\s+/g);
for(var i=1,part;part=_6b2[i];i++){
dojo["require"](part);
}
}
_6ad.push([dd.TOKEN_BLOCK,text]);
}
if(data.indexOf("{{")==0){
_6ad.push([dd.TOKEN_VAR,dojo.trim(data.slice(2,-2))]);
}
if(_6ac.parentNode){
_6ac.parentNode.removeChild(_6ac);
}
return;
}
}};
dd.DomTemplate=dojo.extend(function(obj){
if(!obj.nodes){
var node=dojo.byId(obj);
if(node&&node.nodeType==1){
dojo.forEach(["class","src","href","name","value"],function(item){
ddh._attributes[item]=true;
});
obj={nodes:[node]};
}else{
if(typeof obj=="object"){
obj=ddt.getTemplateString(obj);
}
obj=ddh.getTemplate(obj);
}
}
var _6b8=ddh.tokenize(obj.nodes);
if(dd.tests){
this.tokens=_6b8.slice(0);
}
var _6b9=new dd._DomParser(_6b8);
this.nodelist=_6b9.parse();
},{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(str){
this.getRootNode().className=str;
},getRootNode:function(){
return this.buffer.rootNode;
},getBuffer:function(){
return new dd.DomBuffer();
},render:function(_6bb,_6bc){
_6bc=this.buffer=_6bc||this.getBuffer();
this.rootNode=null;
var _6bd=this.nodelist.render(_6bb||new dd.Context({}),_6bc);
for(var i=0,node;node=_6bc._cache[i];i++){
if(node._cache){
node._cache.length=0;
}
}
return _6bd;
},unrender:function(_6c0,_6c1){
return this.nodelist.unrender(_6c0,_6c1);
}});
dd.DomBuffer=dojo.extend(function(_6c2){
this._parent=_6c2;
this._cache=[];
},{concat:function(node){
var _6c4=this._parent;
if(_6c4&&node.parentNode&&node.parentNode===_6c4&&!_6c4._dirty){
return this;
}
if(node.nodeType==1&&!this.rootNode){
this.rootNode=node||true;
return this;
}
if(!_6c4){
if(node.nodeType==3&&dojo.trim(node.data)){
throw new Error("Text should not exist outside of the root node in template");
}
return this;
}
if(this._closed){
if(node.nodeType==3&&!dojo.trim(node.data)){
return this;
}else{
throw new Error("Content should not exist outside of the root node in template");
}
}
if(_6c4._dirty){
if(node._drawn&&node.parentNode==_6c4){
var _6c5=_6c4._cache;
if(_6c5){
for(var i=0,_6c7;_6c7=_6c5[i];i++){
this.onAddNode&&this.onAddNode(_6c7);
_6c4.insertBefore(_6c7,node);
this.onAddNodeComplete&&this.onAddNodeComplete(_6c7);
}
_6c5.length=0;
}
}
_6c4._dirty=false;
}
if(!_6c4._cache){
_6c4._cache=[];
this._cache.push(_6c4);
}
_6c4._dirty=true;
_6c4._cache.push(node);
return this;
},remove:function(obj){
if(typeof obj=="string"){
if(this._parent){
this._parent.removeAttribute(obj);
}
}else{
if(obj.nodeType==1&&!this.getRootNode()&&!this._removed){
this._removed=true;
return this;
}
if(obj.parentNode){
this.onRemoveNode&&this.onRemoveNode(obj);
if(obj.parentNode){
obj.parentNode.removeChild(obj);
}
}
}
return this;
},setAttribute:function(key,_6ca){
var old=dojo.attr(this._parent,key);
if(this.onChangeAttribute&&old!=_6ca){
this.onChangeAttribute(this._parent,key,old,_6ca);
}
if(key=="style"){
this._parent.style.cssText=_6ca;
}else{
dojo.attr(this._parent,key,_6ca);
}
return this;
},addEvent:function(_6cc,type,fn,args){
if(!_6cc.getThis()){
throw new Error("You must use Context.setObject(instance)");
}
this.onAddEvent&&this.onAddEvent(this.getParent(),type,fn);
var _6d0=fn;
if(dojo.isArray(args)){
_6d0=function(e){
this[fn].apply(this,[e].concat(args));
};
}
return dojo.connect(this.getParent(),type,_6cc.getThis(),_6d0);
},setParent:function(node,up,root){
if(!this._parent){
this._parent=this._first=node;
}
if(up&&root&&node===this._first){
this._closed=true;
}
if(up){
var _6d5=this._parent;
var _6d6="";
var ie=dojo.isIE&&_6d5.tagName=="SCRIPT";
if(ie){
_6d5.text="";
}
if(_6d5._dirty){
var _6d8=_6d5._cache;
var _6d9=(_6d5.tagName=="SELECT"&&!_6d5.options.length);
for(var i=0,_6db;_6db=_6d8[i];i++){
if(_6db!==_6d5){
this.onAddNode&&this.onAddNode(_6db);
if(ie){
_6d6+=_6db.data;
}else{
_6d5.appendChild(_6db);
if(_6d9&&_6db.defaultSelected&&i){
_6d9=i;
}
}
this.onAddNodeComplete&&this.onAddNodeComplete(_6db);
}
}
if(_6d9){
_6d5.options.selectedIndex=(typeof _6d9=="number")?_6d9:0;
}
_6d8.length=0;
_6d5._dirty=false;
}
if(ie){
_6d5.text=_6d6;
}
}
this._parent=node;
this.onSetParent&&this.onSetParent(node,up,root);
return this;
},getParent:function(){
return this._parent;
},getRootNode:function(){
return this.rootNode;
}});
dd._DomNode=dojo.extend(function(node){
this.contents=node;
},{render:function(_6dd,_6de){
this._rendered=true;
return _6de.concat(this.contents);
},unrender:function(_6df,_6e0){
if(!this._rendered){
return _6e0;
}
this._rendered=false;
return _6e0.remove(this.contents);
},clone:function(_6e1){
return new this.constructor(this.contents);
}});
dd._DomNodeList=dojo.extend(function(_6e2){
this.contents=_6e2||[];
},{push:function(node){
this.contents.push(node);
},unshift:function(node){
this.contents.unshift(node);
},render:function(_6e5,_6e6,_6e7){
_6e6=_6e6||dd.DomTemplate.prototype.getBuffer();
if(_6e7){
var _6e8=_6e6.getParent();
}
for(var i=0;i<this.contents.length;i++){
_6e6=this.contents[i].render(_6e5,_6e6);
if(!_6e6){
throw new Error("Template node render functions must return their buffer");
}
}
if(_6e8){
_6e6.setParent(_6e8);
}
return _6e6;
},dummyRender:function(_6ea,_6eb,_6ec){
var div=document.createElement("div");
var _6ee=_6eb.getParent();
var old=_6ee._clone;
_6ee._clone=div;
var _6f0=this.clone(_6eb,div);
if(old){
_6ee._clone=old;
}else{
_6ee._clone=null;
}
_6eb=dd.DomTemplate.prototype.getBuffer();
_6f0.unshift(new dd.ChangeNode(div));
_6f0.unshift(new dd._DomNode(div));
_6f0.push(new dd.ChangeNode(div,true));
_6f0.render(_6ea,_6eb);
if(_6ec){
return _6eb.getRootNode();
}
var html=div.innerHTML;
return (dojo.isIE)?html.replace(/\s*_(dirty|clone)="[^"]*"/g,""):html;
},unrender:function(_6f2,_6f3,_6f4){
if(_6f4){
var _6f5=_6f3.getParent();
}
for(var i=0;i<this.contents.length;i++){
_6f3=this.contents[i].unrender(_6f2,_6f3);
if(!_6f3){
throw new Error("Template node render functions must return their buffer");
}
}
if(_6f5){
_6f3.setParent(_6f5);
}
return _6f3;
},clone:function(_6f7){
var _6f8=_6f7.getParent();
var _6f9=this.contents;
var _6fa=new dd._DomNodeList();
var _6fb=[];
for(var i=0;i<_6f9.length;i++){
var _6fd=_6f9[i].clone(_6f7);
if(_6fd instanceof dd.ChangeNode||_6fd instanceof dd._DomNode){
var item=_6fd.contents._clone;
if(item){
_6fd.contents=item;
}else{
if(_6f8!=_6fd.contents&&_6fd instanceof dd._DomNode){
var node=_6fd.contents;
_6fd.contents=_6fd.contents.cloneNode(false);
_6f7.onClone&&_6f7.onClone(node,_6fd.contents);
_6fb.push(node);
node._clone=_6fd.contents;
}
}
}
_6fa.push(_6fd);
}
for(var i=0,_6fd;_6fd=_6fb[i];i++){
_6fd._clone=null;
}
return _6fa;
},rtrim:function(){
while(1){
var i=this.contents.length-1;
if(this.contents[i] instanceof dd._DomTextNode&&this.contents[i].isEmpty()){
this.contents.pop();
}else{
break;
}
}
return this;
}});
dd._DomVarNode=dojo.extend(function(str){
this.contents=new dd._Filter(str);
},{render:function(_702,_703){
var str=this.contents.resolve(_702);
var type="text";
if(str){
if(str.render&&str.getRootNode){
type="injection";
}else{
if(str.safe){
if(str.nodeType){
type="node";
}else{
if(str.toString){
str=str.toString();
type="html";
}
}
}
}
}
if(this._type&&type!=this._type){
this.unrender(_702,_703);
}
this._type=type;
switch(type){
case "text":
this._rendered=true;
this._txt=this._txt||document.createTextNode(str);
if(this._txt.data!=str){
var old=this._txt.data;
this._txt.data=str;
_703.onChangeData&&_703.onChangeData(this._txt,old,this._txt.data);
}
return _703.concat(this._txt);
case "injection":
var root=str.getRootNode();
if(this._rendered&&root!=this._root){
_703=this.unrender(_702,_703);
}
this._root=root;
var _708=this._injected=new dd._DomNodeList();
_708.push(new dd.ChangeNode(_703.getParent()));
_708.push(new dd._DomNode(root));
_708.push(str);
_708.push(new dd.ChangeNode(_703.getParent()));
this._rendered=true;
return _708.render(_702,_703);
case "node":
this._rendered=true;
if(this._node&&this._node!=str&&this._node.parentNode&&this._node.parentNode===_703.getParent()){
this._node.parentNode.removeChild(this._node);
}
this._node=str;
return _703.concat(str);
case "html":
if(this._rendered&&this._src!=str){
_703=this.unrender(_702,_703);
}
this._src=str;
if(!this._rendered){
this._rendered=true;
this._html=this._html||[];
var div=(this._div=this._div||document.createElement("div"));
div.innerHTML=str;
var _70a=div.childNodes;
while(_70a.length){
var _70b=div.removeChild(_70a[0]);
this._html.push(_70b);
_703=_703.concat(_70b);
}
}
return _703;
default:
return _703;
}
},unrender:function(_70c,_70d){
if(!this._rendered){
return _70d;
}
this._rendered=false;
switch(this._type){
case "text":
return _70d.remove(this._txt);
case "injection":
return this._injection.unrender(_70c,_70d);
case "node":
if(this._node.parentNode===_70d.getParent()){
return _70d.remove(this._node);
}
return _70d;
case "html":
for(var i=0,l=this._html.length;i<l;i++){
_70d=_70d.remove(this._html[i]);
}
return _70d;
default:
return _70d;
}
},clone:function(){
return new this.constructor(this.contents.getExpression());
}});
dd.ChangeNode=dojo.extend(function(node,up,root){
this.contents=node;
this.up=up;
this.root=root;
},{render:function(_713,_714){
return _714.setParent(this.contents,this.up,this.root);
},unrender:function(_715,_716){
if(!_716.getParent()){
return _716;
}
return _716.setParent(this.contents);
},clone:function(){
return new this.constructor(this.contents,this.up,this.root);
}});
dd.AttributeNode=dojo.extend(function(key,_718){
this.key=key;
this.value=_718;
this.contents=_718;
if(this._pool[_718]){
this.nodelist=this._pool[_718];
}else{
if(!(this.nodelist=dd.quickFilter(_718))){
this.nodelist=(new dd.Template(_718,true)).nodelist;
}
this._pool[_718]=this.nodelist;
}
this.contents="";
},{_pool:{},render:function(_719,_71a){
var key=this.key;
var _71c=this.nodelist.dummyRender(_719);
if(dd.BOOLS[key]){
_71c=!(_71c=="false"||_71c=="undefined"||!_71c);
}
if(_71c!==this.contents){
this.contents=_71c;
return _71a.setAttribute(key,_71c);
}
return _71a;
},unrender:function(_71d,_71e){
this.contents="";
return _71e.remove(this.key);
},clone:function(_71f){
return new this.constructor(this.key,this.value);
}});
dd._DomTextNode=dojo.extend(function(str){
this.contents=document.createTextNode(str);
this.upcoming=str;
},{set:function(data){
this.upcoming=data;
return this;
},render:function(_722,_723){
if(this.contents.data!=this.upcoming){
var old=this.contents.data;
this.contents.data=this.upcoming;
_723.onChangeData&&_723.onChangeData(this.contents,old,this.upcoming);
}
return _723.concat(this.contents);
},unrender:function(_725,_726){
return _726.remove(this.contents);
},isEmpty:function(){
return !dojo.trim(this.contents.data);
},clone:function(){
return new this.constructor(this.contents.data);
}});
dd._DomParser=dojo.extend(function(_727){
this.contents=_727;
},{i:0,parse:function(_728){
var _729={};
var _72a=this.contents;
if(!_728){
_728=[];
}
for(var i=0;i<_728.length;i++){
_729[_728[i]]=true;
}
var _72c=new dd._DomNodeList();
while(this.i<_72a.length){
var _72d=_72a[this.i++];
var type=_72d[0];
var _72f=_72d[1];
if(type==dd.TOKEN_CUSTOM){
_72c.push(_72f);
}else{
if(type==dd.TOKEN_CHANGE){
var _730=new dd.ChangeNode(_72f,_72d[2],_72d[3]);
_72f[_730.attr]=_730;
_72c.push(_730);
}else{
if(type==dd.TOKEN_ATTR){
var fn=ddt.getTag("attr:"+_72d[2],true);
if(fn&&_72d[3]){
if(_72d[3].indexOf("{%")!=-1||_72d[3].indexOf("{{")!=-1){
_72f.setAttribute(_72d[2],"");
}
_72c.push(fn(null,new dd.Token(type,_72d[2]+" "+_72d[3])));
}else{
if(dojo.isString(_72d[3])){
if(_72d[2]=="style"||_72d[3].indexOf("{%")!=-1||_72d[3].indexOf("{{")!=-1){
_72c.push(new dd.AttributeNode(_72d[2],_72d[3]));
}else{
if(dojo.trim(_72d[3])){
try{
dojo.attr(_72f,_72d[2],_72d[3]);
}
catch(e){
}
}
}
}
}
}else{
if(type==dd.TOKEN_NODE){
var fn=ddt.getTag("node:"+_72f.tagName.toLowerCase(),true);
if(fn){
_72c.push(fn(null,new dd.Token(type,_72f),_72f.tagName.toLowerCase()));
}
_72c.push(new dd._DomNode(_72f));
}else{
if(type==dd.TOKEN_VAR){
_72c.push(new dd._DomVarNode(_72f));
}else{
if(type==dd.TOKEN_TEXT){
_72c.push(new dd._DomTextNode(_72f.data||_72f));
}else{
if(type==dd.TOKEN_BLOCK){
if(_729[_72f]){
--this.i;
return _72c;
}
var cmd=_72f.split(/\s+/g);
if(cmd.length){
cmd=cmd[0];
var fn=ddt.getTag(cmd);
if(typeof fn!="function"){
throw new Error("Function not found for "+cmd);
}
var tpl=fn(this,new dd.Token(type,_72f));
if(tpl){
_72c.push(tpl);
}
}
}
}
}
}
}
}
}
}
if(_728.length){
throw new Error("Could not find closing tag(s): "+_728.toString());
}
return _72c;
},next_token:function(){
var _734=this.contents[this.i++];
return new dd.Token(_734[0],_734[1]);
},delete_first_token:function(){
this.i++;
},skip_past:function(_735){
return dd._Parser.prototype.skip_past.call(this,_735);
},create_variable_node:function(expr){
return new dd._DomVarNode(expr);
},create_text_node:function(expr){
return new dd._DomTextNode(expr||"");
},getTemplate:function(loc){
return new dd.DomTemplate(ddh.getTemplate(loc));
}});
})();
}
if(!dojo._hasResource["dojox.dtl.render.dom"]){
dojo._hasResource["dojox.dtl.render.dom"]=true;
dojo.provide("dojox.dtl.render.dom");
dojox.dtl.render.dom.Render=function(_739,tpl){
this._tpl=tpl;
this.domNode=dojo.byId(_739);
};
dojo.extend(dojox.dtl.render.dom.Render,{setAttachPoint:function(node){
this.domNode=node;
},render:function(_73c,tpl,_73e){
if(!this.domNode){
throw new Error("You cannot use the Render object without specifying where you want to render it");
}
this._tpl=tpl=tpl||this._tpl;
_73e=_73e||tpl.getBuffer();
_73c=_73c||new dojox.dtl.Context();
var frag=tpl.render(_73c,_73e).getParent();
if(!frag){
throw new Error("Rendered template does not have a root node");
}
if(this.domNode!==frag){
this.domNode.parentNode.replaceChild(frag,this.domNode);
this.domNode=frag;
}
}});
}
if(!dojo._hasResource["dojox.dtl.contrib.dijit"]){
dojo._hasResource["dojox.dtl.contrib.dijit"]=true;
dojo.provide("dojox.dtl.contrib.dijit");
(function(){
var dd=dojox.dtl;
var ddcd=dd.contrib.dijit;
ddcd.AttachNode=dojo.extend(function(keys,_743){
this._keys=keys;
this._object=_743;
},{render:function(_744,_745){
if(!this._rendered){
this._rendered=true;
for(var i=0,key;key=this._keys[i];i++){
_744.getThis()[key]=this._object||_745.getParent();
}
}
return _745;
},unrender:function(_748,_749){
if(this._rendered){
this._rendered=false;
for(var i=0,key;key=this._keys[i];i++){
if(_748.getThis()[key]===(this._object||_749.getParent())){
delete _748.getThis()[key];
}
}
}
return _749;
},clone:function(_74c){
return new this.constructor(this._keys,this._object);
}});
ddcd.EventNode=dojo.extend(function(_74d,obj){
this._command=_74d;
var type,_750=_74d.split(/\s*,\s*/);
var trim=dojo.trim;
var _752=[];
var fns=[];
while(type=_750.pop()){
if(type){
var fn=null;
if(type.indexOf(":")!=-1){
var _755=type.split(":");
type=trim(_755[0]);
fn=trim(_755.slice(1).join(":"));
}else{
type=trim(type);
}
if(!fn){
fn=type;
}
_752.push(type);
fns.push(fn);
}
}
this._types=_752;
this._fns=fns;
this._object=obj;
this._rendered=[];
},{_clear:false,render:function(_756,_757){
for(var i=0,type;type=this._types[i];i++){
if(!this._clear&&!this._object){
_757.getParent()[type]=null;
}
var fn=this._fns[i];
var args;
if(fn.indexOf(" ")!=-1){
if(this._rendered[i]){
dojo.disconnect(this._rendered[i]);
this._rendered[i]=false;
}
args=dojo.map(fn.split(" ").slice(1),function(item){
return new dd._Filter(item).resolve(_756);
});
fn=fn.split(" ",2)[0];
}
if(!this._rendered[i]){
if(!this._object){
this._rendered[i]=_757.addEvent(_756,type,fn,args);
}else{
this._rendered[i]=dojo.connect(this._object,type,_756.getThis(),fn);
}
}
}
this._clear=true;
return _757;
},unrender:function(_75d,_75e){
while(this._rendered.length){
dojo.disconnect(this._rendered.pop());
}
return _75e;
},clone:function(){
return new this.constructor(this._command,this._object);
}});
function _75f(n1){
var n2=n1.cloneNode(true);
if(dojo.isIE){
dojo.query("script",n2).forEach("item.text = this[index].text;",dojo.query("script",n1));
}
return n2;
};
ddcd.DojoTypeNode=dojo.extend(function(node,_763){
this._node=node;
this._parsed=_763;
var _764=node.getAttribute("dojoAttachEvent");
if(_764){
this._events=new ddcd.EventNode(dojo.trim(_764));
}
var _765=node.getAttribute("dojoAttachPoint");
if(_765){
this._attach=new ddcd.AttachNode(dojo.trim(_765).split(/\s*,\s*/));
}
if(!_763){
this._dijit=dojo.parser.instantiate([_75f(node)])[0];
}else{
node=_75f(node);
var old=ddcd.widgetsInTemplate;
ddcd.widgetsInTemplate=false;
this._template=new dd.DomTemplate(node);
ddcd.widgetsInTemplate=old;
}
},{render:function(_767,_768){
if(this._parsed){
var _769=new dd.DomBuffer();
this._template.render(_767,_769);
var root=_75f(_769.getRootNode());
var div=document.createElement("div");
div.appendChild(root);
var _76c=div.innerHTML;
div.removeChild(root);
if(_76c!=this._rendered){
this._rendered=_76c;
if(this._dijit){
this._dijit.destroyRecursive();
}
this._dijit=dojo.parser.instantiate([root])[0];
}
}
var node=this._dijit.domNode;
if(this._events){
this._events._object=this._dijit;
this._events.render(_767,_768);
}
if(this._attach){
this._attach._object=this._dijit;
this._attach.render(_767,_768);
}
return _768.concat(node);
},unrender:function(_76e,_76f){
return _76f.remove(this._dijit.domNode);
},clone:function(){
return new this.constructor(this._node,this._parsed);
}});
dojo.mixin(ddcd,{widgetsInTemplate:true,dojoAttachPoint:function(_770,_771){
return new ddcd.AttachNode(_771.contents.slice(16).split(/\s*,\s*/));
},dojoAttachEvent:function(_772,_773){
return new ddcd.EventNode(_773.contents.slice(16));
},dojoType:function(_774,_775){
var _776=false;
if(_775.contents.slice(-7)==" parsed"){
_776=true;
}
var _777=_775.contents.slice(9);
var _778=_776?_777.slice(0,-7):_777.toString();
if(ddcd.widgetsInTemplate){
var node=_774.swallowNode();
node.setAttribute("dojoType",_778);
return new ddcd.DojoTypeNode(node,_776);
}
return new dd.AttributeNode("dojoType",_778);
},on:function(_77a,_77b){
var _77c=_77b.contents.split();
return new ddcd.EventNode(_77c[0]+":"+_77c.slice(1).join(" "));
}});
dd.register.tags("dojox.dtl.contrib",{"dijit":["attr:dojoType","attr:dojoAttachPoint",["attr:attach","dojoAttachPoint"],"attr:dojoAttachEvent",[/(attr:)?on(click|key(up))/i,"on"]]});
})();
}
if(!dojo._hasResource["dojox.dtl._DomTemplated"]){
dojo._hasResource["dojox.dtl._DomTemplated"]=true;
dojo.provide("dojox.dtl._DomTemplated");
dojox.dtl._DomTemplated={prototype:{_dijitTemplateCompat:false,buildRendering:function(){
this.domNode=this.srcNodeRef;
if(!this._render){
var ddcd=dojox.dtl.contrib.dijit;
var old=ddcd.widgetsInTemplate;
ddcd.widgetsInTemplate=this.widgetsInTemplate;
this.template=this.template||this._getCachedTemplate(this.templatePath,this.templateString);
this._render=new dojox.dtl.render.dom.Render(this.domNode,this.template);
ddcd.widgetsInTemplate=old;
}
this.render();
this.domNode=this.template.getRootNode();
if(this.srcNodeRef&&this.srcNodeRef.parentNode){
dojo.destroy(this.srcNodeRef);
delete this.srcNodeRef;
}
},setTemplate:function(_77f,_780){
if(dojox.dtl.text._isTemplate(_77f)){
this.template=this._getCachedTemplate(null,_77f);
}else{
this.template=this._getCachedTemplate(_77f);
}
this.render(_780);
},render:function(_781,tpl){
if(tpl){
this.template=tpl;
}
this._render.render(this._getContext(_781),this.template);
},_getContext:function(_783){
if(!(_783 instanceof dojox.dtl.Context)){
_783=false;
}
_783=_783||new dojox.dtl.Context(this);
_783.setThis(this);
return _783;
},_getCachedTemplate:function(_784,_785){
if(!this._templates){
this._templates={};
}
var key=_785||_784.toString();
var _787=this._templates;
if(_787[key]){
return _787[key];
}
return (_787[key]=new dojox.dtl.DomTemplate(dijit._Templated.getCachedTemplate(_784,_785,true)));
}}};
}
if(!dojo._hasResource["g_widgets.form.Typeahead"]){
dojo._hasResource["g_widgets.form.Typeahead"]=true;
dojo.provide("g_widgets.form.Typeahead");
dojo.declare("g_widgets.form.Typeahead",[dijit.form.ComboBox],{searchAttr:"selectedText",urlRoot:"",formId:"",matchMode:"none",matchStyle:"",clickableStyle:"",nonClickableStyle:"",groupLabelStyle:"",menuLabelTemplate:"{% if className %}<span class=\"{{ className }}\">{% endif %}{{ menuText|filter_menuText }}{% if className %}</span>{% endif %}",minInputLength:2,maxPopupHeight:null,position:"left",templateString:"<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\" dojoAttachPoint=\"comboNode\" waiRole=\"textbox\" tabIndex=\"-1\"\n\t><div style=\"overflow:hidden;\"\n\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton'\n\t\t\tdojoAttachPoint=\"downArrowNode\" waiRole=\"presentation\"\n\t\t\tdojoAttachEvent=\"onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse\"\n\t\t\t><div class=\"dijitArrowButtonInner\">&thinsp;</div\n\t\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div\n\t\t></div\n\t\t><div class=\"dijitReset dijitValidationIcon\"><br></div\n\t\t><div class=\"dijitReset dijitValidationIconText\">&Chi;</div\n\t\t><div class=\"dijitReset dijitInputField\" \n\t\t\t><input ${nameAttrSetting} type=\"text\" autocomplete=\"off\" class='dijitReset'\n\t\t\tdojoAttachEvent=\"onkeypress:_onKeyPress,compositionend\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" waiRole=\"textbox\" waiState=\"haspopup-true,autocomplete-list\" title=\"Search\"\n\t\t/></div\n\t></div\n></div>\n",postMixInProperties:function(){
this.inherited(arguments);
var _788=this;
dojo.mixin(g_widgets.form.Typeahead,{filter_menuText:function(_789){
return (_788.filter_menuText(_789));
}});
dojox.dtl.register.filters("g_widgets.form",{"Typeahead":["filter_menuText"]});
},_startSearch:function(key){
key=dojo.trim(key);
if(key==this._lastInput){
return;
}
if(key.length<this.minInputLength){
this._hideResultList();
this._lastInput="";
return;
}
this._createPopupWidget();
this.inherited(arguments,[key]);
},_createPopupWidget:function(){
if(!this._popupWidget){
var _78b=this.id+"_popup";
this._popupWidget=new g_widgets.form.TypeaheadMenuItem({onChange:dojo.hitch(this,this._selectOption),id:_78b,groupLabelStyle:this.groupLabelStyle});
dijit.removeWaiState(this.focusNode,"activedescendant");
dijit.setWaiState(this.textbox,"owns",_78b);
}
},_showResultList:function(){
this._hideResultList();
this._arrowPressed();
this.displayMessage("");
dojo.style(this._popupWidget.domNode,{width:"",height:""});
dijit.popup.prepare(this._popupWidget.domNode);
var size=dojo.coords(this._popupWidget.domNode,true);
var _78d=size.h;
var _78e=size.w+1;
if(null!=this.maxPopupHeight&&_78d>this.maxPopupHeight){
_78d=this.maxPopupHeight;
}
var _78f=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((_78d==_78f.h)&&(_78e==_78f.w+1))?"hidden":"auto";
if(_78d<this._popupWidget.domNode.scrollHeight){
_78e+=16;
}
dojo.marginBox(this._popupWidget.domNode,{h:_78d,w:Math.max(_78e,this.domNode.offsetWidth)});
dijit.setWaiState(this.comboNode,"expanded","true");
this.open();
},open:function(){
this._isShowingNow=true;
var pos={BL:"TL",TL:"BL"};
if(this.position=="right"){
pos={"BR":"TR","BL":"TL"};
}
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,orient:pos,parent:this});
},_getMenuLabelFromItem:function(item){
var _792=this.store.getValue(item,"clickable");
var _793=(_792?this.clickableStyle:this.nonClickableStyle);
var _794=(this.nonClickableStyle.length>0||this.clickableStyle.length>0);
if(!this.menuLabelDTL){
this.menuLabelDTL=new dojox.dtl.Template(this.menuLabelTemplate);
}
var _795=new dojox.dtl.Context({className:_793,menuText:{text:this.getDisplayText(item),clickable:_792}});
return ({html:_794,label:this.menuLabelDTL.render(_795)});
},getDisplayText:function(item){
var text=this.store.getValue(item,"displayText");
if(typeof text=="undefined"||text.length==0){
text=this.store.getValue(item,this.searchAttr);
}
return (text);
},filter_menuText:function(_798){
var str=new String(_798.text);
if(_798.clickable){
str=new String(this.applyMatchStyle(_798.text));
str.safe=true;
}
return (str);
},applyMatchStyle:function(_79a){
if(this.matchStyle.length>0&&(this.matchMode=="phrase"||this.matchMode=="token")){
if(this.matchMode=="phrase"){
_79a=this.styleTextMatch(_79a,this._lastInput);
}else{
if(!this.tokenParser||this.tokenParser.lastInput!=this._lastInput){
var _79b=this._lastInput.split(" ");
var _79c="";
dojo.forEach(_79b,function(_79d){
if(_79d.length!=0){
_79c+=(_79c.length>0?"|":"")+_79d;
}
});
this.tokenParser={lastInput:this._lastInput,pattern:_79c};
}
_79a=this.styleTextMatch(_79a,this.tokenParser.pattern);
}
}
return (_79a);
},styleTextMatch:function(_79e,_79f){
var _7a0=new RegExp("("+_79f+")","gi");
return (_79e.replace(_7a0,"<span class=\""+this.matchStyle+"\">$1</span>"));
},_announceOption:function(node){
if(node==null){
return;
}
var _7a2=this.store.getValue(node.item,"selectedText");
if(!this.store.getValue(node.item,"clickable")){
_7a2=this._lastInput;
}else{
if(node==this._popupWidget.nextButton||node==this._popupWidget.previousButton){
_7a2=node.innerHTML;
}
}
_7a2=this.decodeHTML(_7a2);
this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
dijit.setWaiState(this.focusNode,"activedescendant",dojo.attr(node,"id"));
this._autoCompleteText(_7a2);
},decodeHTML:function(str){
str=str.replace(/&#(\d+);/g,function(){
return String.fromCharCode(arguments[1]);
});
return (str);
},_doSelect:function(tgt){
this.item=tgt.item;
if(!this.store.getValue(tgt.item,"clickable")){
return;
}
var _7a5=this.decodeHTML(this.store.getValue(tgt.item,this.searchAttr));
this.setValue(_7a5,true);
document.location.href=this.urlRoot+this.store.getValue(this.item,"linkURL")+((getQueryParam("sst")=="")?"":("&sst="+getQueryParam("sst")));
},_onBlur:function(){
this._hideResultList();
this._arrowIdle();
},onChange:function(){
if(this.item==null){
if(null!=this.formId&&this.formId.length>0){
this._hideResultList();
this._arrowIdle();
var _7a6=dojo.byId(this.formId);
_7a6.onsubmit();
}else{
console.error("dijit.form.Typeahead: formId is not set on widget");
}
}
}});
dojo.declare("g_widgets.form.TypeaheadMenuItem",[dijit.form._ComboBoxMenu],{_createOption:function(item,_7a8){
var _7a9=this.inherited(arguments);
if(!item.i.clickable){
dojo.attr(_7a9,"type","groupLabel");
}
return (_7a9);
},createOptions:function(_7aa,_7ab,_7ac){
this.inherited(arguments);
dojo.query("[type=groupLabel]",this.domNode).addClass(this.groupLabelStyle);
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.gcb_all",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nl","nl-nl","no","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
