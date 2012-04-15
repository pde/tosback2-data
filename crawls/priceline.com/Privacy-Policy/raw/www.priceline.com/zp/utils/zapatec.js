/*
 *
 * Copyright (c) 2004-2005 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 *
 *
 */


if(typeof Zapatec=='undefined'){Zapatec=function(){};}
Zapatec.version='07-01';if(typeof Zapatec.zapatecPath=='undefined'){Zapatec.zapatecPath=function(){if(document.documentElement){var aTokens=document.documentElement.innerHTML.match(/<script[^>]+src="([^"]*zapatec(-core|-src)?.js[^"]*)"/i);if(aTokens&&aTokens.length>=2){aTokens=aTokens[1].split('?');aTokens=aTokens[0].split('/');if(Array.prototype.pop){aTokens.pop();}else{aTokens.length-=1;}
return aTokens.length?aTokens.join('/')+'/':'';}}
return'';}();}
if(typeof Zapatec=='undefined'){Zapatec=function(){};}
Zapatec.Utils={};Zapatec.Utils.getAbsolutePos=function(el,scrollOff){var SL=0,ST=0;if(!scrollOff){var is_div=/^div$/i.test(el.tagName);if(is_div&&el.scrollLeft)
SL=el.scrollLeft;if(is_div&&el.scrollTop)
ST=el.scrollTop;}
var r={x:el.offsetLeft-SL,y:el.offsetTop-ST};if(el.offsetParent){var tmp=this.getAbsolutePos(el.offsetParent);r.x+=tmp.x;r.y+=tmp.y;}
return r;};Zapatec.Utils.getElementOffset=function(oEl){var iLeft=iTop=iWidth=iHeight=0;var sTag;if(oEl.getBoundingClientRect){var oRect=oEl.getBoundingClientRect();iLeft=oRect.left;iTop=oRect.top;iWidth=oRect.right-iLeft;iHeight=oRect.bottom-iTop;iLeft+=Zapatec.Utils.getPageScrollX()-2;iTop+=Zapatec.Utils.getPageScrollY()-2;}else{iWidth=oEl.offsetWidth;iHeight=oEl.offsetHeight;var sPos=Zapatec.Utils.getStyleProperty(oEl,'position');if(sPos=='fixed'){iLeft=oEl.offsetLeft+Zapatec.Utils.getPageScrollX();iTop=oEl.offsetTop+Zapatec.Utils.getPageScrollY();}else if(sPos=='absolute'){while(oEl){sTag=oEl.tagName;if(sTag){sTag=sTag.toLowerCase();if(sTag!='body'&&sTag!='html'){iLeft+=parseInt(oEl.offsetLeft,10)||0;iTop+=parseInt(oEl.offsetTop,10)||0;}}
oEl=oEl.offsetParent;sTag=oEl?oEl.tagName:null;if(sTag){sTag=sTag.toLowerCase();if(sTag!='body'&&sTag!='html'){iLeft-=oEl.scrollLeft;iTop-=oEl.scrollTop;}}}}else{var bMoz=(Zapatec.is_gecko&&!Zapatec.is_khtml);var fStyle=Zapatec.Utils.getStyleProperty;var oP=oEl;while(oP){if(bMoz){sTag=oP.tagName;if(sTag){sTag=sTag.toLowerCase();if(sTag=='body'&&!(fStyle(oP,'-moz-box-sizing')=='border-box')){iLeft+=parseInt(fStyle(oP,'border-left-width'));iTop+=parseInt(fStyle(oP,'border-top-width'));}}}
iLeft+=parseInt(oP.offsetLeft,10)||0;iTop+=parseInt(oP.offsetTop,10)||0;oP=oP.offsetParent;}
oP=oEl;while(oP.parentNode){oP=oP.parentNode;sTag=oP.tagName;if(sTag){sTag=sTag.toLowerCase();if(sTag!='body'&&sTag!='html'&&sTag!='tr'){iLeft-=oP.scrollLeft;iTop-=oP.scrollTop;}}}}}
return{left:iLeft,top:iTop,x:iLeft,y:iTop,width:iWidth,height:iHeight};};Zapatec.Utils.getElementOffsetScrollable=function(oEl){var oPos=Zapatec.Utils.getElementOffset(oEl);if(oEl.scrollLeft){oPos.left-=oEl.scrollLeft;oPos.x=oPos.left;}
if(oEl.scrollTop){oPos.top-=oEl.scrollTop;oPos.y=oPos.top;}
return oPos;};Zapatec.Utils.fixBoxPosition=function(box,leave){var screenX=Zapatec.Utils.getPageScrollX();var screenY=Zapatec.Utils.getPageScrollY();var sizes=Zapatec.Utils.getWindowSize();leave=parseInt(leave,10)||0;if(box.x<screenX){box.x=screenX+leave;}
if(box.y<screenY){box.y=screenY+leave;}
if(box.x+box.width>screenX+sizes.width){box.x=screenX+sizes.width-box.width-leave;}
if(box.y+box.height>screenY+sizes.height){box.y=screenY+sizes.height-box.height-leave;}};Zapatec.Utils.isRelated=function(el,evt){evt||(evt=window.event);var related=evt.relatedTarget;if(!related){var type=evt.type;if(type=="mouseover"){related=evt.fromElement;}else if(type=="mouseout"){related=evt.toElement;}}
try{while(related){if(related==el){return true;}
related=related.parentNode;}}catch(e){};return false;};Zapatec.Utils.removeClass=function(el,className){if(!(el&&el.className)){return;}
var cls=el.className.split(" ");var ar=[];for(var i=cls.length;i>0;){if(cls[--i]!=className){ar[ar.length]=cls[i];}}
el.className=ar.join(" ");};Zapatec.Utils.addClass=function(el,className){Zapatec.Utils.removeClass(el,className);el.className+=" "+className;};Zapatec.Utils.replaceClass=function(el,className,withClassName){if(!Zapatec.isHtmlElement(el)||!className){return false;}
el.className.replace(className,withClassName);};Zapatec.Utils.getElement=function(ev){if(Zapatec.is_ie){return window.event.srcElement;}else{return ev.currentTarget;}};Zapatec.Utils.getTargetElement=function(ev){if(Zapatec.is_ie){return window.event.srcElement;}else{return ev.target;}};Zapatec.Utils.getMousePos=function(oEv){oEv||(oEv=window.event);var oPos={pageX:0,pageY:0,clientX:0,clientY:0};if(oEv){var bIsPageX=(typeof oEv.pageX!='undefined');var bIsClientX=(typeof oEv.clientX!='undefined');if(bIsPageX||bIsClientX){if(bIsPageX){oPos.pageX=oEv.pageX;oPos.pageY=oEv.pageY;}else{oPos.pageX=oEv.clientX+Zapatec.Utils.getPageScrollX();oPos.pageY=oEv.clientY+Zapatec.Utils.getPageScrollY();}
if(bIsClientX){oPos.clientX=oEv.clientX;oPos.clientY=oEv.clientY;}else{oPos.clientX=oEv.pageX-Zapatec.Utils.getPageScrollX();oPos.clientY=oEv.pageY-Zapatec.Utils.getPageScrollY();}}}
return oPos;};Zapatec.Utils.stopEvent=function(ev){ev||(ev=window.event);if(ev){if(Zapatec.is_ie){ev.cancelBubble=true;ev.returnValue=false;}else{ev.preventDefault();ev.stopPropagation();}}
return false;};Zapatec.Utils.removeOnUnload=[];Zapatec.Utils.addEvent=function(oElement,sEvent,fListener,bUseCapture){if(oElement.addEventListener){if(!bUseCapture){bUseCapture=false;}
oElement.addEventListener(sEvent,fListener,bUseCapture);}else if(oElement.attachEvent){oElement.detachEvent('on'+sEvent,fListener);oElement.attachEvent('on'+sEvent,fListener);if(bUseCapture){oElement.setCapture(false);}}
Zapatec.Utils.removeOnUnload.push({'element':oElement,'event':sEvent,'listener':fListener,'capture':bUseCapture});};Zapatec.Utils.removeEvent=function(oElement,sEvent,fListener,bUseCapture){if(oElement.removeEventListener){oElement.removeEventListener(sEvent,fListener,bUseCapture);}else if(oElement.detachEvent){oElement.detachEvent('on'+sEvent,fListener);}
for(var iLis=Zapatec.Utils.removeOnUnload.length-1;iLis>=0;iLis--){var oParams=Zapatec.Utils.removeOnUnload[iLis];if(!oParams){continue;}
if(oElement==oParams['element']&&sEvent==oParams['event']&&fListener==oParams['listener']&&bUseCapture==oParams['capture']){Zapatec.Utils.removeOnUnload[iLis]=null;Zapatec.Utils.removeEvent(oParams['element'],oParams['event'],oParams['listener'],oParams['capture']);}}};Zapatec.Utils.createElement=function(type,parent,selectable){var el=null;if(document.createElementNS)
el=document.createElementNS("http://www.w3.org/1999/xhtml",type);else
el=document.createElement(type);if(typeof parent!="undefined"&&parent!=null)
parent.appendChild(el);if(!selectable){if(Zapatec.is_ie)
el.setAttribute("unselectable",true);if(Zapatec.is_gecko)
el.style.setProperty("-moz-user-select","none","");}
return el;};Zapatec.Utils.writeCookie=function(name,value,domain,path,exp_days){value=escape(value);var ck=name+"="+value,exp;if(domain)
ck+=";domain="+domain;if(path)
ck+=";path="+path;if(exp_days){exp=new Date();exp.setTime(exp_days*86400000+exp.getTime());ck+=";expires="+exp.toGMTString();}
document.cookie=ck;};Zapatec.Utils.getCookie=function(name){var pattern=name+"=";var tokenPos=0;while(tokenPos<document.cookie.length){var valuePos=tokenPos+pattern.length;if(document.cookie.substring(tokenPos,valuePos)==pattern){var endValuePos=document.cookie.indexOf(";",valuePos);if(endValuePos==-1){endValuePos=document.cookie.length;}
return unescape(document.cookie.substring(valuePos,endValuePos));}
tokenPos=document.cookie.indexOf(" ",tokenPos)+1;if(tokenPos==0){break;}}
return null;};Zapatec.Utils.makePref=function(obj){function stringify(val){if(typeof val=="object"&&!val)
return"null";else if(typeof val=="number"||typeof val=="boolean")
return val;else if(typeof val=="string")
return'"'+val.replace(/\x22/,"\\22")+'"';else return null;};var txt="",i;for(i in obj)
txt+=(txt?",'":"'")+i+"':"+stringify(obj[i]);return txt;};Zapatec.Utils.loadPref=function(txt){var obj=null;try{eval("obj={"+txt+"}");}catch(e){}
return obj;};Zapatec.Utils.mergeObjects=function(dest,src){for(var i in src)
dest[i]=src[i];};Zapatec.Utils.__wch_id=0;Zapatec.Utils.createWCH=function(oEl){if(!Zapatec.is_ie||Zapatec.is_ie5||Zapatec.is_ie7){return null;}
var sId='WCH'+(++Zapatec.Utils.__wch_id);var sIframe=['<iframe id="',sId,'" scrolling="no" frameborder="0" style="z-index:0;position:absolute;visibility:hidden;filter:progid:DXImageTransform.Microsoft.alpha(style=0,opacity=0);border:0;top:0;left:0;width:0;height:0" src="javascript:false"></iframe>'].join('')
if(!oEl){oEl=document.body;}
if(Zapatec.windowLoaded){oEl.insertAdjacentHTML('beforeEnd',sIframe);}else{Zapatec.Utils.addEvent(window,'load',function(){oEl.insertAdjacentHTML('beforeEnd',sIframe);oEl=null;});}
return document.getElementById(sId);};Zapatec.Utils.setupWCH_el=function(f,el,el2){if(f){var pos=Zapatec.Utils.getAbsolutePos(el),X1=pos.x,Y1=pos.y,X2=X1+el.offsetWidth,Y2=Y1+el.offsetHeight;if(el2){var p2=Zapatec.Utils.getAbsolutePos(el2),XX1=p2.x,YY1=p2.y,XX2=XX1+el2.offsetWidth,YY2=YY1+el2.offsetHeight;if(X1>XX1)
X1=XX1;if(Y1>YY1)
Y1=YY1;if(X2<XX2)
X2=XX2;if(Y2<YY2)
Y2=YY2;}
Zapatec.Utils.setupWCH(f,X1,Y1,X2-X1,Y2-Y1);}};Zapatec.Utils.setupWCH=function(f,x,y,w,h){if(f){var s=f.style;(typeof x!="undefined")&&(s.left=x+"px");(typeof y!="undefined")&&(s.top=y+"px");(typeof w!="undefined")&&(s.width=w+"px");(typeof h!="undefined")&&(s.height=h+"px");s.visibility="inherit";}};Zapatec.Utils.hideWCH=function(f){if(f)
f.style.visibility="hidden";};Zapatec.Utils.getPageScrollY=function(){if(window.pageYOffset){return window.pageYOffset;}else if(document.body&&document.body.scrollTop){return document.body.scrollTop;}else if(document.documentElement&&document.documentElement.scrollTop){return document.documentElement.scrollTop;}
return 0;};Zapatec.Utils.getPageScrollX=function(){if(window.pageXOffset){return window.pageXOffset;}else if(document.body&&document.body.scrollLeft){return document.body.scrollLeft;}else if(document.documentElement&&document.documentElement.scrollLeft){return document.documentElement.scrollLeft;}
return 0;};Zapatec.ScrollWithWindow={};Zapatec.ScrollWithWindow.list=[];Zapatec.ScrollWithWindow.stickiness=0.25;Zapatec.ScrollWithWindow.register=function(oElement){var iTop=oElement.offsetTop||0;var iLeft=oElement.offsetLeft||0;Zapatec.ScrollWithWindow.list.push({node:oElement,origTop:iTop,origLeft:iLeft});if(!Zapatec.ScrollWithWindow.interval){Zapatec.ScrollWithWindow.on();}};Zapatec.ScrollWithWindow.unregister=function(oElement){for(var iItem=0;iItem<Zapatec.ScrollWithWindow.list.length;iItem++){var oItem=Zapatec.ScrollWithWindow.list[iItem];if(oElement==oItem.node){Zapatec.ScrollWithWindow.list.splice(iItem,1);if(!Zapatec.ScrollWithWindow.list.length){Zapatec.ScrollWithWindow.off();}
return;}}};Zapatec.ScrollWithWindow.moveTop=function(iTop){Zapatec.ScrollWithWindow.top+=(iTop-Zapatec.ScrollWithWindow.top)*Zapatec.ScrollWithWindow.stickiness;if(Math.abs(Zapatec.ScrollWithWindow.top-iTop)<=1){Zapatec.ScrollWithWindow.top=iTop;}
for(var iItem=0;iItem<Zapatec.ScrollWithWindow.list.length;iItem++){var oItem=Zapatec.ScrollWithWindow.list[iItem];var oElement=oItem.node;oElement.style.position='absolute';if(!oItem.origTop&&oItem.origTop!==0){oItem.origTop=parseInt(oElement.style.top)||0;}
oElement.style.top=oItem.origTop+
parseInt(Zapatec.ScrollWithWindow.top)+'px';}};Zapatec.ScrollWithWindow.moveLeft=function(iLeft){Zapatec.ScrollWithWindow.left+=(iLeft-Zapatec.ScrollWithWindow.left)*Zapatec.ScrollWithWindow.stickiness;if(Math.abs(Zapatec.ScrollWithWindow.left-iLeft)<=1){Zapatec.ScrollWithWindow.left=iLeft;}
for(var iItem=0;iItem<Zapatec.ScrollWithWindow.list.length;iItem++){var oItem=Zapatec.ScrollWithWindow.list[iItem];var oElement=oItem.node;oElement.style.position='absolute';if(!oItem.origLeft&&oItem.origLeft!==0){oItem.origLeft=parseInt(oElement.style.left)||0;}
oElement.style.left=oItem.origLeft+
parseInt(Zapatec.ScrollWithWindow.left)+'px';}};Zapatec.ScrollWithWindow.cycle=function(){var iTop=Zapatec.Utils.getPageScrollY();var iLeft=Zapatec.Utils.getPageScrollX();if(iTop!=Zapatec.ScrollWithWindow.top){Zapatec.ScrollWithWindow.moveTop(iTop);}
if(iLeft!=Zapatec.ScrollWithWindow.left){Zapatec.ScrollWithWindow.moveLeft(iLeft);}};Zapatec.ScrollWithWindow.on=function(){if(Zapatec.ScrollWithWindow.interval){return;}
Zapatec.ScrollWithWindow.top=Zapatec.Utils.getPageScrollY();Zapatec.ScrollWithWindow.left=Zapatec.Utils.getPageScrollX();Zapatec.ScrollWithWindow.interval=setInterval(Zapatec.ScrollWithWindow.cycle,50);};Zapatec.ScrollWithWindow.off=function(){if(!Zapatec.ScrollWithWindow.interval){return;}
clearInterval(Zapatec.ScrollWithWindow.interval);Zapatec.ScrollWithWindow.interval=null;};Zapatec.FixateOnScreen={};Zapatec.FixateOnScreen.getExpression=function(coord,direction){return"Zapatec.Utils.getPageScroll"+direction.toUpperCase()+"() + "+coord;};Zapatec.FixateOnScreen.parseCoordinates=function(element){if(!this.isRegistered(element)){return false;}
var x=0;var y=0;var style=element.style;if(Zapatec.is_ie&&!Zapatec.is_ie7){x=style.getExpression("left").split(" ");x=parseInt(x[x.length-1],10);y=style.getExpression("top").split(" ");y=parseInt(y[y.length-1],10);}else{x=parseInt(style.left,10);y=parseInt(style.top,10);}
x+=Zapatec.Utils.getPageScrollX();y+=Zapatec.Utils.getPageScrollY();return{x:x,y:y};};Zapatec.FixateOnScreen.correctCoordinates=function(x,y){position={x:x,y:y};if(position.x||position.x===0){position.x-=Zapatec.Utils.getPageScrollX();if(Zapatec.is_ie&&!Zapatec.is_ie7){position.x=this.getExpression(position.x,"X");;}else{position.x+="px";}}
if(position.y||position.y===0){position.y-=Zapatec.Utils.getPageScrollY();if(Zapatec.is_ie&&!Zapatec.is_ie7){position.y=this.getExpression(position.y,"Y");;}else{position.y+="px";}}
return position;};Zapatec.FixateOnScreen.register=function(element){if(!Zapatec.isHtmlElement(element)){return false;}
if(this.isRegistered(element)){return true;}
var pos=Zapatec.Utils.getElementOffset(element);pos={x:parseInt(element.style.left,10)||pos.x,y:parseInt(element.style.top,10)||pos.y}
pos=this.correctCoordinates(pos.x,pos.y);if(!Zapatec.is_ie||Zapatec.is_ie7){var restorer=element.restorer;if(!restorer||!restorer.getObject||restorer.getObject()!=element){restorer=element.restorer=new Zapatec.SRProp(element);}
restorer.saveProp("style.position");element.style.position="fixed";element.style.left=pos.x;element.style.top=pos.y;}else{element.style.setExpression("left",pos.x);element.style.setExpression("top",pos.y);}
element.zpFixed=true;return true;};Zapatec.FixateOnScreen.unregister=function(element){if(!Zapatec.isHtmlElement(element)){return false;}
var pos=this.parseCoordinates(element);if(pos===false){return true;}
if(Zapatec.is_ie&&!Zapatec.is_ie7){element.style.removeExpression("left");element.style.removeExpression("top");}
element.style.left=pos.x+"px";element.style.top=pos.y+"px";if(!Zapatec.is_ie||Zapatec.is_ie7){element.restorer.restoreProp("style.position",true);}
element.zpFixed=false;return true;};Zapatec.FixateOnScreen.isRegistered=function(element){if(element.zpFixed){return true;}
return false;};Zapatec.Utils.destroy=function(el){if(el&&el.parentNode)
el.parentNode.removeChild(el);};Zapatec.Utils.newCenteredWindow=function(url,windowName,width,height,scrollbars){var leftPosition=0;var topPosition=0;if(screen.width)
leftPosition=(screen.width-width)/2;if(screen.height)
topPosition=(screen.height-height)/2;var winArgs='height='+height+',width='+width+',top='+topPosition+',left='+leftPosition+',scrollbars='+scrollbars+',resizable';var win=window.open(url,windowName,winArgs);return win;};Zapatec.Utils.getWindowSize=function(){var iWidth=0;var iHeight=0;if(Zapatec.is_opera){iWidth=document.body.clientWidth||0;iHeight=document.body.clientHeight||0;}else if(Zapatec.is_khtml){iWidth=window.innerWidth||0;iHeight=window.innerHeight||0;}else if(document.compatMode&&document.compatMode=='CSS1Compat'){iWidth=document.documentElement.clientWidth||0;iHeight=document.documentElement.clientHeight||0;}else{iWidth=document.body.clientWidth||0;iHeight=document.body.clientHeight||0;}
return{width:iWidth,height:iHeight};};Zapatec.Utils.selectOption=function(sel,val,call_default){var a=sel.options,i,o;for(i=a.length;--i>=0;){o=a[i];o.selected=(o.value==val);}
sel.value=val;if(call_default){if(typeof sel.onchange=="function")
sel.onchange();else if(typeof sel.onchange=="string")
eval(sel.onchange);}};Zapatec.Utils.getNextSibling=function(el,tag,alternateTag){el=el.nextSibling;if(!tag){return el;}
tag=tag.toLowerCase();if(alternateTag)alternateTag=alternateTag.toLowerCase();while(el){if(el.nodeType==1&&(el.tagName.toLowerCase()==tag||(alternateTag&&el.tagName.toLowerCase()==alternateTag))){return el;}
el=el.nextSibling;}
return el;};Zapatec.Utils.getPreviousSibling=function(el,tag,alternateTag){el=el.previousSibling;if(!tag){return el;}
tag=tag.toLowerCase();if(alternateTag)alternateTag=alternateTag.toLowerCase();while(el){if(el.nodeType==1&&(el.tagName.toLowerCase()==tag||(alternateTag&&el.tagName.toLowerCase()==alternateTag))){return el;}
el=el.previousSibling;}
return el;};Zapatec.Utils.getFirstChild=function(el,tag,alternateTag){if(!el){return null;}
el=el.firstChild;if(!el){return null;}
if(!tag){return el;}
tag=tag.toLowerCase();if(el.nodeType==1){if(el.tagName.toLowerCase()==tag){return el;}else if(alternateTag){alternateTag=alternateTag.toLowerCase();if(el.tagName.toLowerCase()==alternateTag){return el;}}}
return Zapatec.Utils.getNextSibling(el,tag,alternateTag);};Zapatec.Utils.getLastChild=function(el,tag,alternateTag){if(!el){return null;}
el=el.lastChild;if(!el){return null;}
if(!tag){return el;}
tag=tag.toLowerCase();if(el.nodeType==1){if(el.tagName.toLowerCase()==tag){return el;}else if(alternateTag){alternateTag=alternateTag.toLowerCase();if(el.tagName.toLowerCase()==alternateTag){return el;}}}
return Zapatec.Utils.getPreviousSibling(el,tag,alternateTag);};Zapatec.Utils.getChildText=function(objNode){if(objNode==null){return'';}
var arrText=[];var objChild=objNode.firstChild;while(objChild!=null){if(objChild.nodeType==3){arrText.push(objChild.data);}
objChild=objChild.nextSibling;}
return arrText.join(' ');};Zapatec.Utils.insertAfter=function(oldNode,newNode){if(oldNode.nextSibling){oldNode.parentNode.insertBefore(newNode,oldNode.nextSibling);}else{oldNode.parentNode.appendChild(newNode);}}
Zapatec.Utils._ids={};Zapatec.Utils.generateID=function(code,id){if(typeof id=="undefined"){if(typeof this._ids[code]=="undefined")
this._ids[code]=0;id=++this._ids[code];}
return"zapatec-"+code+"-"+id;};Zapatec.Utils.addTooltip=function(target,tooltip){return new Zapatec.Tooltip({target:target,tooltip:tooltip});};Zapatec.isLite=false;Zapatec.Utils.checkLinks=function(){var anchors=document.getElementsByTagName('A');for(var ii=0;ii<anchors.length;ii++){if(Zapatec.Utils.checkLink(anchors[ii])){return true;}}
return false;}
Zapatec.Utils.checkLink=function(lnk){if(!lnk){return false;}
if(!/^https?:\/\/((dev|www)\.)?zapatec\.com/i.test(lnk.href)){return false;}
var textContent=""
for(var ii=0;ii<lnk.childNodes.length;ii++){if(lnk.childNodes[ii].nodeType==3){textContent+=lnk.childNodes[ii].nodeValue;}}
if(textContent.length<4){return false;}
var parent=lnk;while(parent&&parent.nodeName.toLowerCase()!="html"){if(Zapatec.Utils.getStyleProperty(parent,"display")=="none"||Zapatec.Utils.getStyleProperty(parent,"visibility")=="hidden"||Zapatec.Utils.getStyleProperty(parent,"opacity")=="0"||Zapatec.Utils.getStyleProperty(parent,"-moz-opacity")=="0"||/alpha\(opacity=0\)/i.test(Zapatec.Utils.getStyleProperty(parent,"filter"))){return false;}
parent=parent.parentNode;}
var coords=Zapatec.Utils.getElementOffset(lnk);if(coords.left<0||coords.top<0){return false;}
return true;}
Zapatec.Utils.checkActivation=function(){if(!Zapatec.isLite)return true;var arrProducts=[]
add_product=function(script,webdir_in,name_in)
{arrProducts[script]={webdir:webdir_in,name:name_in,bActive:false}}
add_product('calendar.js','prod1','Calendar')
add_product('zpmenu.js','menu','Menu')
add_product('tree.js','prod3','Tree')
add_product('form.js','forms','Forms')
add_product('effects.js','effects','Effects')
add_product('hoverer.js','effects','Effects - Hoverer')
add_product('slideshow.js','effects','Effects - Slideshow')
add_product('zpgrid.js','grid','Grid')
add_product('slider.js','slider','Slider')
add_product('zptabs.js','tabs','Tabs')
add_product('zptime.js','time','Time')
add_product('window.js','windows','Window')
var strName,arrName,i
var bProduct=false
var scripts=document.getElementsByTagName('script');for(i=0;i<scripts.length;i++)
{if(/wizard.js/i.test(scripts[i].src))
return true
arrName=scripts[i].src.split('/')
if(arrName.length==0)
strName=scripts[i]
else
strName=arrName[arrName.length-1]
strName=strName.toLowerCase()
if(typeof arrProducts[strName]!='undefined')
{bProduct=true
arrProducts[strName].bActive=true}}
if(!bProduct||Zapatec.Utils.checkLinks()){return true;}
var strMsg='You are using the Free version of the Zapatec Software.\n'+'While using the Free version, a link to www.zapatec.com in this page is required.'
for(i in arrProducts)
if(arrProducts[i].bActive==true)
strMsg+='\nTo purchase the Zapatec '+arrProducts[i].name+' visit www.zapatec.com/website/main/products/'+arrProducts[i].webdir+'/'
alert(strMsg)
return false;}
Zapatec.Utils.clone=function(oSrc){if(typeof oSrc=='object'&&oSrc){var oClone=new oSrc.constructor();var fClone=Zapatec.Utils.clone;for(var sProp in oSrc){oClone[sProp]=fClone(oSrc[sProp]);}
return oClone;}
return oSrc;};Zapatec.is_opera=/opera/i.test(navigator.userAgent);Zapatec.is_ie=(/msie/i.test(navigator.userAgent)&&!Zapatec.is_opera);Zapatec.is_ie5=(Zapatec.is_ie&&/msie 5\.0/i.test(navigator.userAgent));Zapatec.is_ie7=(Zapatec.is_ie&&/msie 7\.0/i.test(navigator.userAgent));Zapatec.is_mac_ie=(/msie.*mac/i.test(navigator.userAgent)&&!Zapatec.is_opera);Zapatec.is_khtml=/Konqueror|Safari|KHTML/i.test(navigator.userAgent);Zapatec.is_konqueror=/Konqueror/i.test(navigator.userAgent);Zapatec.is_gecko=/Gecko/i.test(navigator.userAgent);Zapatec.is_webkit=/WebKit/i.test(navigator.userAgent);Zapatec.webkitVersion=Zapatec.is_webkit?parseInt(navigator.userAgent.replace(/.+WebKit\/([0-9]+)\..+/,"$1")):-1;if(!Object.prototype.hasOwnProperty){Object.prototype.hasOwnProperty=function(strProperty){try{var objPrototype=this.constructor.prototype;while(objPrototype){if(objPrototype[strProperty]==this[strProperty]){return false;}
objPrototype=objPrototype.prototype;}}catch(objException){}
return true;};}
if(!Function.prototype.call){Function.prototype.call=function(){var objThis=arguments[0];objThis._this_func=this;var arrArgs=[];for(var iArg=1;iArg<arguments.length;iArg++){arrArgs[arrArgs.length]='arguments['+iArg+']';}
var ret=eval('objThis._this_func('+arrArgs.join(',')+')');objThis._this_func=null;return ret;};}
if(!Function.prototype.apply){Function.prototype.apply=function(){var objThis=arguments[0];var objArgs=arguments[1];objThis._this_func=this;var arrArgs=[];if(objArgs){for(var iArg=0;iArg<objArgs.length;iArg++){arrArgs[arrArgs.length]='objArgs['+iArg+']';}}
var ret=eval('objThis._this_func('+arrArgs.join(',')+')');objThis._this_func=null;return ret;};}
if(!Array.prototype.pop){Array.prototype.pop=function(){var last;if(this.length){last=this[this.length-1];this.length-=1;}
return last;};}
if(!Array.prototype.push){Array.prototype.push=function(){for(var i=0;i<arguments.length;i++){this[this.length]=arguments[i];}
return this.length;};}
if(!Array.prototype.shift){Array.prototype.shift=function(){var first;if(this.length){first=this[0];for(var i=0;i<this.length-1;i++){this[i]=this[i+1];}
this.length-=1;}
return first;};}
if(!Array.prototype.unshift){Array.prototype.unshift=function(){if(arguments.length){var i,len=arguments.length;for(i=this.length+len-1;i>=len;i--){this[i]=this[i-len];}
for(i=0;i<len;i++){this[i]=arguments[i];}}
return this.length;};}
if(!Array.prototype.splice){Array.prototype.splice=function(index,howMany){var elements=[],removed=[],i;for(i=2;i<arguments.length;i++){elements.push(arguments[i]);}
for(i=index;(i<index+howMany)&&(i<this.length);i++){removed.push(this[i]);}
for(i=index+howMany;i<this.length;i++){this[i-howMany]=this[i];}
this.length-=removed.length;for(i=this.length+elements.length-1;i>=index+elements.length;i--){this[i]=this[i-elements.length];}
for(i=0;i<elements.length;i++){this[index+i]=elements[i];}
return removed;};}
Zapatec.Utils.arrIndexOf=function(aArr,vSearchEl,iFromInd){if(!(aArr instanceof Array)){return-1;}
if(Array.prototype.indexOf){return aArr.indexOf(vSearchEl,iFromInd);}
if(!iFromInd){iFromInd=0;}
var iEls=aArr.length;for(var iEl=iFromInd;iEl<iEls;iEl++){if(aArr[iEl]==vSearchEl){return iEl;}}
return-1;};Zapatec.Log=function(objArgs){if(!objArgs){return;}
var strMessage=objArgs.description;if(objArgs.severity){strMessage=objArgs.severity+':\n'+strMessage;}
if(objArgs.type!="warning"){alert(strMessage);}};Zapatec.Utils.Array={};Zapatec.Utils.Array.insertBefore=function(arr,el,key,nextKey){var tmp=new Array();for(var i in arr){if(i==nextKey){if(key){tmp[key]=el;}else{tmp.push(el);}}
tmp[i]=arr[i];}
return tmp;}
Zapatec.inherit=function(oSubClass,oSuperClass,oArg){var Inheritance=function(){};Inheritance.prototype=oSuperClass.prototype;oSubClass.prototype=new Inheritance();oSubClass.prototype.constructor=oSubClass;oSubClass.SUPERconstructor=oSuperClass;oSubClass.SUPERclass=oSuperClass.prototype;if(typeof oSuperClass.path!='undefined'){if(oArg&&oArg.keepPath){oSubClass.path=oSuperClass.path;}else{oSubClass.path=Zapatec.getPath(oSubClass.id);}}};Zapatec.getPath=function(sId){var sSrc;if(typeof sId=='string'){var oScript=document.getElementById(sId);if(oScript){sSrc=oScript.getAttribute('src');}}
if(!sSrc){if(typeof Zapatec.lastLoadedModule=='string'){return Zapatec.lastLoadedModule;}
if(document.documentElement){var sHtml=document.documentElement.innerHTML;var aMatch=sHtml.match(/<script[^>]+src=[^>]+>/gi);if(aMatch&&aMatch.length){sHtml=aMatch[aMatch.length-1];aMatch=sHtml.match(/src="([^"]+)/i);if(aMatch&&aMatch.length==2){sSrc=aMatch[1];}}}
if(!sSrc){return'';}}
sSrc=sSrc.replace(/\\/g,'/');var aTokens=sSrc.split('?');aTokens=aTokens[0].split('/');aTokens=aTokens.slice(0,-1);if(!aTokens.length){return'';}
return aTokens.join('/')+'/';};Zapatec.Utils.setWindowEvent=function(oEvent){if(oEvent){window.event=oEvent;}};Zapatec.Utils.emulateWindowEvent=function(aEvents){if(document.addEventListener){var iEvents=aEvents.length;var oUtils=Zapatec.Utils;var iEvent;for(iEvent=0;iEvent<iEvents;iEvent++){document.addEventListener(aEvents[iEvent],oUtils.setWindowEvent,true);}}};Zapatec.windowLoaded=typeof(document.readyState)!='undefined'?(document.readyState=='loaded'||document.readyState=='complete'):document.getElementsByTagName!=null&&typeof(document.getElementsByTagName('body')[0])!='undefined';Zapatec.Utils.addEvent(window,"load",function(){Zapatec.windowLoaded=true;});Zapatec.Utils.warnUnload=function(msg,win){Zapatec.Utils.warnUnloadFlag=true;if(typeof(msg)!="string"){msg="All your changes will be lost.";}
if(typeof(win)=='undefined'){win=window;}
Zapatec.Utils.addEvent(win,'beforeunload',function(ev){if(Zapatec.Utils.warnUnloadFlag!=true){return true;}
if(typeof(ev)=='undefined'){ev=window.event;}
ev.returnValue=msg;return false;});}
Zapatec.Utils.unwarnUnload=function(msg,win){Zapatec.Utils.warnUnloadFlag=false;}
Zapatec.Utils.warnUnloadFlag=false;Zapatec.Utils.getMaxZindex=function(){if(window.opera||Zapatec.is_khtml){return 2147483583;}else if(Zapatec.is_ie){return 2147483647;}else{return 10737418239;}};Zapatec.Utils.correctCssLength=function(val){if(typeof val=='undefined'||(typeof val=='object'&&!val)){return'auto';}
val+='';if(!val.length){return'auto';}
if(/\d$/.test(val)){val+='px';}
return val;};Zapatec.Utils.destroyOnUnload=[];Zapatec.Utils.addDestroyOnUnload=function(objElement,strProperty){Zapatec.Utils.destroyOnUnload.push([objElement,strProperty]);};Zapatec.Utils.createProperty=function(objElement,strProperty,val){objElement[strProperty]=val;Zapatec.Utils.addDestroyOnUnload(objElement,strProperty);};Zapatec.Utils.addEvent(window,'unload',function(){for(var iObj=Zapatec.Utils.destroyOnUnload.length-1;iObj>=0;iObj--){var objDestroy=Zapatec.Utils.destroyOnUnload[iObj];objDestroy[0][objDestroy[1]]=null;objDestroy[0]=null;}
for(var iLis=Zapatec.Utils.removeOnUnload.length-1;iLis>=0;iLis--){var oParams=Zapatec.Utils.removeOnUnload[iLis];if(!oParams){continue;}
Zapatec.Utils.removeOnUnload[iLis]=null;Zapatec.Utils.removeEvent(oParams['element'],oParams['event'],oParams['listener'],oParams['capture']);}});Zapatec.Utils.htmlEncode=function(str){str=str.replace(/&/ig,"&amp;");str=str.replace(/</ig,"&lt;");str=str.replace(/>/ig,"&gt;");str=str.replace(/\x22/ig,"&quot;");return str;};Zapatec.Utils.applyStyle=function(elRef,style){if(typeof(elRef)=='string'){elRef=document.getElementById(elRef);}
if(elRef==null||style==null||elRef.style==null){return null;}
if(Zapatec.is_opera){var pairs=style.split(";");for(var ii=0;ii<pairs.length;ii++){var kv=pairs[ii].split(":");if(!kv[1]){continue;}
var value=kv[1].replace(/^\s*/,'').replace(/\s*$/,'');var key="";for(var jj=0;jj<kv[0].length;jj++){if(kv[0].charAt(jj)=="-"){jj++;if(jj<kv[0].length){key+=kv[0].charAt(jj).toUpperCase();}
continue;}
key+=kv[0].charAt(jj);}
switch(key){case"float":key="cssFloat";break;}
try{elRef.style[key]=value;}catch(e){}}}else{elRef.style.cssText=style;}
return true;}
Zapatec.Utils.getStyleProperty=function(oEl,sPr){var oDV=document.defaultView;if(oDV&&oDV.getComputedStyle){var oCS=oDV.getComputedStyle(oEl,'');if(oCS){sPr=sPr.replace(/([A-Z])/g,'-$1').toLowerCase();return oCS.getPropertyValue(sPr);}}else if(oEl.currentStyle){return oEl.currentStyle[sPr];}
return oEl.style[sPr];};Zapatec.Utils.getPrecision=function(dFloat){return(dFloat+'').replace(/^-?\d*\.*/,'').length;};Zapatec.Utils.setPrecision=function(dFloat,iPrecision){dFloat*=1;if(dFloat.toFixed){return dFloat.toFixed(iPrecision)*1;}
var iPow=Math.pow(10,iPrecision);return parseInt(dFloat*iPow,10)/iPow;};Zapatec.Utils.setPrecisionString=function(dFloat,iPrecision){var sFloat=Zapatec.Utils.setPrecision(dFloat,iPrecision)+'';var iOldPrecision=Zapatec.Utils.getPrecision(sFloat);var iZeros=iPrecision-iOldPrecision;if(iZeros){if(!iOldPrecision){sFloat+='.';}
for(var iZero=0;iZero<iZeros;iZero++){sFloat+='0';}}
return sFloat;};Zapatec.Utils.createNestedHash=function(parent,keys,value){if(parent==null||keys==null){return null;}
var tmp=parent;for(var ii=0;ii<keys.length;ii++){if(typeof(tmp[keys[ii]])=='undefined'){tmp[keys[ii]]={};}
if(ii==keys.length-1&&typeof(value)!='undefined'){tmp[keys[ii]]=value;}
tmp=tmp[keys[ii]];}}
Zapatec.implement=function(classOrObject,interfaceStr){if(typeof interfaceStr!="string"){return false;}
if(typeof classOrObject=="function"){classOrObject=classOrObject.prototype;}
if(!classOrObject||typeof classOrObject!="object"){return false;}
var interfaceObj=window;var objs=interfaceStr.split(".");try{for(var i=0;i<objs.length;++i){interfaceObj=interfaceObj[objs[i]];}}catch(e){return false;}
if(typeof classOrObject.interfaces!="object"){classOrObject.interfaces={};classOrObject.interfaces[interfaceStr]=true;}else if(classOrObject.interfaces[interfaceStr]!==true){classOrObject.interfaces=Zapatec.Utils.clone(classOrObject.interfaces);classOrObject.interfaces[interfaceStr]=true;}else{return true;}
for(var iProp in interfaceObj){classOrObject[iProp]=interfaceObj[iProp];}
classOrObject.hasInterface=function(interfaceStr){if(this.interfaces[interfaceStr]===true){return true;}
return false;};classOrObject.requireInterface=function(interfaceStr){if(!this.hasInterface(interfaceStr)){Zapatec.Log({description:"The object with ID '"+this.id+"' has no "+interfaceStr+" interface!"});return false;}
return true;};interfaceObj.setNamedProperty=classOrObject.setNamedProperty=function(name,val){this[name]=val;};interfaceObj.getNamedProperty=classOrObject.getNamedProperty=function(name){return this[name];};return true;};Zapatec.Utils.getCharFromEvent=function(evt){if(!evt){evt=window.event;}
var response={};if(Zapatec.is_gecko&&!Zapatec.is_khtml&&evt.type!="keydown"&&evt.type!="keyup"){if(evt.charCode){response.chr=String.fromCharCode(evt.charCode);}else{response.charCode=evt.keyCode;}}else{response.charCode=evt.keyCode||evt.which;response.chr=String.fromCharCode(response.charCode);}
if(Zapatec.is_opera&&response.charCode==0){response.charCode=null;response.chr=null;}
if(Zapatec.is_khtml&&response.charCode==63272){response.charCode=46;response.chr=null;}
return response;}
Zapatec.Utils.convertHTML2DOM=function(txt){var el=document.createElement("div");el.innerHTML=txt;var currEl=el.firstChild;while(!currEl.nodeType||currEl.nodeType!=1){currEl=currEl.nextSibling;}
Zapatec.Utils.destroy(currEl);return currEl;};Zapatec.Utils.escapeRegExp=function(s){return s.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');};if(typeof Zapatec=='undefined'){Zapatec=function(){};}
Zapatec.EventDriven=function(){};Zapatec.EventDriven.prototype.init=function(){this.events={};};Zapatec.EventDriven.prototype.addEventListener=function(sEv,fLsnr){if(typeof fLsnr!="function"){return false;}
var oE=this.events;if(!oE[sEv]){oE[sEv]={listeners:[]};}else{this.removeEventListener(sEv,fLsnr);}
oE[sEv].listeners.push(fLsnr);};Zapatec.EventDriven.prototype.unshiftEventListener=function(sEv,fLsnr){if(typeof fLsnr!="function"){return false;}
var oE=this.events;if(!oE[sEv]){oE[sEv]={listeners:[]};}else{this.removeEventListener(sEv,fLsnr);}
oE[sEv].listeners.unshift(fLsnr);};Zapatec.EventDriven.prototype.removeEventListener=function(sEv,fLsnr){var oE=this.events;if(!oE[sEv]){return 0;}
var aL=oE[sEv].listeners;var iRemoved=0;for(var iL=aL.length-1;iL>=0;iL--){if(aL[iL]==fLsnr){aL.splice(iL,1);iRemoved++;}}
return iRemoved;};Zapatec.EventDriven.prototype.getEventListeners=function(sEv){var oE=this.events;if(!oE[sEv]){return[];}
return oE[sEv].listeners;};Zapatec.EventDriven.prototype.isEventListener=function(sEv,fLsnr){var oE=this.events;if(!oE[sEv]){return false;}
var aL=oE[sEv].listeners;for(var iL=aL.length-1;iL>=0;iL--){if(aL[iL]==fLsnr){return true;}}
return false;};Zapatec.EventDriven.prototype.isEvent=function(sEv){if(this.events[sEv]){return true;}
return false;};Zapatec.EventDriven.prototype.removeEvent=function(sEv){var oE=this.events;if(oE[sEv]){var undef;oE[sEv]=undef;}};Zapatec.EventDriven.prototype.fireEvent=function(sEv){var oE=this.events;if(!oE[sEv]){return;}
var aL=oE[sEv].listeners.slice();var iLs=aL.length;var aArgs;for(var iL=0;iLs--;iL++){aArgs=[].slice.call(arguments,1);aL[iL].apply(this,aArgs);}};Zapatec.EventDriven.events={};Zapatec.EventDriven.addEventListener=function(sEv,fLsnr){if(typeof fLsnr!="function"){return false;}
var oED=Zapatec.EventDriven;var oE=oED.events;if(!oE[sEv]){oE[sEv]={listeners:[]};}else{oED.removeEventListener(sEv,fLsnr);}
oE[sEv].listeners.push(fLsnr);};Zapatec.EventDriven.unshiftEventListener=function(sEv,fLsnr){if(typeof fLsnr!="function"){return false;}
var oED=Zapatec.EventDriven;var oE=oED.events;if(!oE[sEv]){oE[sEv]={listeners:[]};}else{oED.removeEventListener(sEv,fLsnr);}
oE[sEv].listeners.unshift(fLsnr);};Zapatec.EventDriven.removeEventListener=function(sEv,fLsnr){var oE=Zapatec.EventDriven.events;if(!oE[sEv]){return 0;}
var aL=oE[sEv].listeners;var iRemoved=0;for(var iL=aL.length-1;iL>=0;iL--){if(aL[iL]==fLsnr){aL.splice(iL,1);iRemoved++;}}
return iRemoved;};Zapatec.EventDriven.getEventListeners=function(sEv){var oE=Zapatec.EventDriven.events;if(!oE[sEv]){return[];}
return oE[sEv].listeners;};Zapatec.EventDriven.isEventListener=function(sEv,fLsnr){var oE=Zapatec.EventDriven.events;if(!oE[sEv]){return false;}
var aL=oE[sEv].listeners;for(var iL=aL.length-1;iL>=0;iL--){if(aL[iL]==fLsnr){return true;}}
return false;};Zapatec.EventDriven.isEvent=function(sEv){if(Zapatec.EventDriven.events[sEv]){return true;}
return false;};Zapatec.EventDriven.removeEvent=function(sEv){var oE=Zapatec.EventDriven.events;if(oE[sEv]){var undef;oE[sEv]=undef;}};Zapatec.EventDriven.fireEvent=function(sEv){var oE=Zapatec.EventDriven.events;if(!oE[sEv]){return;}
var aL=oE[sEv].listeners.slice();var iLs=aL.length;var aArgs;for(var iL=0;iLs--;iL++){aArgs=[].slice.call(arguments,1);aL[iL].apply(aL[iL],aArgs);}};Zapatec.ImagePreloader=function(objArgs){this.job=null;this.image=null;if(arguments.length>0)this.init(objArgs);};Zapatec.ImagePreloader.prototype.init=function(objArgs){if(!objArgs||!objArgs.job){return;}
this.job=objArgs.job;this.image=new Image();this.job.images.push(this.image);var objPreloader=this;this.image.onload=function(){objPreloader.job.loadedUrls.push(objArgs.url);setTimeout(function(){objPreloader.onLoad();},0);};this.image.onerror=function(){objPreloader.job.invalidUrls.push(objArgs.url);objPreloader.onLoad();};this.image.onabort=function(){objPreloader.job.abortedUrls.push(objArgs.url);objPreloader.onLoad();};this.image.src=objArgs.url;if(typeof objArgs.timeout=='number'){setTimeout(function(){if(objPreloader.job){if(objPreloader.image.complete){objPreloader.job.loadedUrls.push(objArgs.url);}else{objPreloader.job.abortedUrls.push(objArgs.url);}
objPreloader.onLoad();}},objArgs.timeout);}};Zapatec.ImagePreloader.prototype.onLoad=function(){if(!this.job){return;}
this.image.onload=null;this.image.onerror=null;this.image.onabort=null;var objJob=this.job;this.job=null;objJob.leftToLoad--;if(objJob.leftToLoad==0&&typeof objJob.onLoad=='function'){var funcOnLoad=objJob.onLoad;objJob.onLoad=null;funcOnLoad(objJob);}};Zapatec.PreloadImages=function(objArgs){this.images=[];this.leftToLoad=0;this.loadedUrls=[];this.invalidUrls=[];this.abortedUrls=[];this.onLoad=null;if(arguments.length>0)this.init(objArgs);};Zapatec.PreloadImages.prototype.init=function(objArgs){if(!objArgs){return;}
if(!objArgs.urls||!objArgs.urls.length){if(typeof objArgs.onLoad=='function'){objArgs.onLoad(this);}
return;}
this.images=[];this.leftToLoad=objArgs.urls.length;this.loadedUrls=[];this.invalidUrls=[];this.abortedUrls=[];this.onLoad=objArgs.onLoad;for(var iUrl=0;iUrl<objArgs.urls.length;iUrl++){new Zapatec.ImagePreloader({job:this,url:objArgs.urls[iUrl],timeout:objArgs.timeout});}};if(typeof Zapatec=='undefined'){Zapatec=function(){};}
Zapatec.StyleSheet=function(bUseLast){if(bUseLast){if(document.createStyleSheet){if(document.styleSheets.length){this.styleSheet=document.styleSheets[document.styleSheets.length-1];}}else{var aStyleSheets=document.getElementsByTagName('style');if(aStyleSheets.length){this.styleSheet=aStyleSheets[aStyleSheets.length-1];}}}
if(!this.styleSheet){if(document.createStyleSheet){try{this.styleSheet=document.createStyleSheet();}catch(oException){this.styleSheet=document.styleSheets[document.styleSheets.length-1];};}else{this.styleSheet=document.createElement('style');this.styleSheet.type='text/css';var oHead=document.getElementsByTagName('head')[0];if(!oHead){oHead=document.documentElement;}
if(oHead){oHead.appendChild(this.styleSheet);}}}};Zapatec.StyleSheet.prototype.addRule=function(strSelector,strDeclarations){if(!this.styleSheet){return;}
if(document.createStyleSheet){this.styleSheet.cssText+=strSelector+' { '+strDeclarations+' }';}else{this.styleSheet.appendChild(document.createTextNode(strSelector+' { '+strDeclarations+' }'));}};Zapatec.StyleSheet.prototype.removeRules=function(){if(!this.styleSheet){return;}
if(document.createStyleSheet){var iRules=this.styleSheet.rules.length;for(var iRule=0;iRule<iRules;iRule++){this.styleSheet.removeRule();}}else{while(this.styleSheet.firstChild){this.styleSheet.removeChild(this.styleSheet.firstChild);}}};Zapatec.StyleSheet.prototype.addParse=function(strStyleSheet){var arrClean=[];var arrTokens=strStyleSheet.split('/*');for(var iTok=0;iTok<arrTokens.length;iTok++){var arrTails=arrTokens[iTok].split('*/');arrClean.push(arrTails[arrTails.length-1]);}
strStyleSheet=arrClean.join('');strStyleSheet=strStyleSheet.replace(/@[^{]*;/g,'');var arrStyles=strStyleSheet.split('}');for(var iStl=0;iStl<arrStyles.length;iStl++){var arrRules=arrStyles[iStl].split('{');if(arrRules[0]&&arrRules[1]){var arrSelectors=arrRules[0].split(',');for(var iSel=0;iSel<arrSelectors.length;iSel++){this.addRule(arrSelectors[iSel],arrRules[1]);}}}};if(typeof Zapatec=='undefined'){Zapatec=function(){};}
Zapatec.Transport=function(){};if(typeof ActiveXObject!='undefined'){Zapatec.Transport.XMLDOM=null;Zapatec.Transport.XMLHTTP=null;Zapatec.Transport.pickActiveXVersion=function(aVersions){for(var iVn=0;iVn<aVersions.length;iVn++){try{var oDoc=new ActiveXObject(aVersions[iVn]);if(oDoc){return aVersions[iVn];}}catch(oExpn){};}
return null;};Zapatec.Transport.XMLDOM=Zapatec.Transport.pickActiveXVersion(['Msxml2.DOMDocument.4.0','Msxml2.DOMDocument.3.0','MSXML2.DOMDocument','MSXML.DOMDocument','Microsoft.XMLDOM']);Zapatec.Transport.XMLHTTP=Zapatec.Transport.pickActiveXVersion(['Msxml2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP']);Zapatec.Transport.pickActiveXVersion=null;}
Zapatec.Transport.createXmlHttpRequest=function(){if(typeof ActiveXObject!='undefined'){try{return new ActiveXObject(Zapatec.Transport.XMLHTTP);}catch(oExpn){};}
if(typeof XMLHttpRequest!='undefined'){return new XMLHttpRequest();}
return null;};Zapatec.Transport.isBusy=function(oArg){var oContr=oArg.busyContainer;if(typeof oContr=='string'){oContr=document.getElementById(oContr);}
if(!oContr){return;}
var sImage=oArg.busyImage;if(typeof sImage!='string'){sImage='';}
sImage=sImage.split('/').pop();if(!sImage.length){sImage='zpbusy.gif';}
var oFC=oContr.firstChild;if(oFC){oFC=oFC.firstChild;if(oFC){oFC=oFC.firstChild;if(oFC&&oFC.tagName&&oFC.tagName.toLowerCase()=='img'){var sSrc=oFC.getAttribute('src');if(typeof sSrc=='string'&&sSrc.length){sSrc=sSrc.split('/').pop();if(sSrc==sImage){return true;}}}}}
return false;};Zapatec.Transport.showBusy=function(oArg){if(Zapatec.Transport.isBusy(oArg)){return;}
var oContr=oArg.busyContainer;if(typeof oContr=='string'){oContr=document.getElementById(oContr);}
if(!oContr){return;}
var sImage=oArg.busyImage;var sImageWidth=oArg.busyImageWidth;var sImageHeight=oArg.busyImageHeight;if(typeof sImage!='string'||!sImage.length){sImage='zpbusy.gif';}else{if(typeof sImageWidth=='number'||(typeof sImageWidth=='string'&&/\d$/.test(sImageWidth))){sImageWidth+='px';}
if(typeof sImageHeight=='number'||(typeof sImageHeight=='string'&&/\d$/.test(sImageHeight))){sImageHeight+='px';}}
if(!sImageWidth){sImageWidth='65px';}
if(!sImageHeight){sImageHeight='35px';}
var sPath='';if(sImage.indexOf('/')<0){if(Zapatec.zapatecPath){sPath=Zapatec.zapatecPath;}else{sPath=Zapatec.Transport.getPath('transport.js');}}
var aImg=[];aImg.push('<img src="');aImg.push(sPath);aImg.push(sImage);aImg.push('"');if(sImageWidth||sImageHeight){aImg.push(' style="');if(sImageWidth){aImg.push('width:');aImg.push(sImageWidth);aImg.push(';');}
if(sImageHeight){aImg.push('height:');aImg.push(sImageHeight);}
aImg.push('"');}
aImg.push(' />');var iContainerWidth=oContr.offsetWidth;var iContainerHeight=oContr.offsetHeight;var oBusyContr=Zapatec.Utils.createElement('div');oBusyContr.style.position='relative';oBusyContr.style.zIndex=2147483583;var oBusy=Zapatec.Utils.createElement('div',oBusyContr);oBusy.style.position='absolute';oBusy.innerHTML=aImg.join('');oContr.insertBefore(oBusyContr,oContr.firstChild);var iBusyWidth=oBusy.offsetWidth;var iBusyHeight=oBusy.offsetHeight;if(iContainerWidth>iBusyWidth){oBusy.style.left=oContr.scrollLeft+
(iContainerWidth-iBusyWidth)/2+'px';}
if(iContainerHeight>iBusyHeight){oBusy.style.top=oContr.scrollTop+
(iContainerHeight-iBusyHeight)/2+'px';}};Zapatec.Transport.removeBusy=function(oArg){var oContr=oArg.busyContainer;if(typeof oContr=='string'){oContr=document.getElementById(oContr);}
if(!oContr){return;}
if(Zapatec.Transport.isBusy(oArg)){oContr.removeChild(oContr.firstChild);}};Zapatec.Transport.fetch=function(oArg){if(oArg==null||typeof oArg!='object'){return null;}
if(!oArg.url){return null;}
if(!oArg.method){oArg.method='GET';}
if(typeof oArg.async=='undefined'){oArg.async=true;}
if(!oArg.contentType&&oArg.method.toUpperCase()=='POST'){oArg.contentType='application/x-www-form-urlencoded';}
if(!oArg.content){oArg.content=null;}
if(!oArg.onLoad){oArg.onLoad=null;}
if(!oArg.onError){oArg.onError=null;}
var oRequest=Zapatec.Transport.createXmlHttpRequest();if(oRequest==null){return null;}
Zapatec.Transport.showBusy(oArg);var bErrorDisplayed=false;var funcOnReady=function(){Zapatec.Transport.removeBusy(oArg);try{if(oRequest.status==200||oRequest.status==304||(location.protocol=='file:'&&!oRequest.status)){if(typeof oArg.onLoad=='function'){oArg.onLoad(oRequest);}}else if(!bErrorDisplayed){bErrorDisplayed=true;Zapatec.Transport.displayError(oRequest.status,"Error: Can't fetch "+oArg.url+'.\n'+
(oRequest.statusText||''),oArg.onError);}}catch(oExpn){if(!bErrorDisplayed){bErrorDisplayed=true;if(oExpn.name&&oExpn.name=='NS_ERROR_NOT_AVAILABLE'){Zapatec.Transport.displayError(0,"Error: Can't fetch "+oArg.url+'.\nFile not found.',oArg.onError);}else{Zapatec.Transport.displayError(0,"Error: Can't fetch "+oArg.url+'.\n'+
(oExpn.message||''),oArg.onError);}}};};try{if(typeof oArg.username!='undefined'&&typeof oArg.password!='undefined'){oRequest.open(oArg.method,oArg.url,oArg.async,oArg.username,oArg.password);}else{oRequest.open(oArg.method,oArg.url,oArg.async);}
if(oArg.async){oRequest.onreadystatechange=function(){if(oRequest.readyState==4){funcOnReady();oRequest.onreadystatechange={};}};}
if(oArg.contentType){oRequest.setRequestHeader('Content-Type',oArg.contentType);}
oRequest.send(oArg.content);if(!oArg.async){funcOnReady();return oRequest;}}catch(oExpn){Zapatec.Transport.removeBusy(oArg);if(!bErrorDisplayed){bErrorDisplayed=true;if(oExpn.name&&oExpn.name=='NS_ERROR_FILE_NOT_FOUND'){Zapatec.Transport.displayError(0,"Error: Can't fetch "+oArg.url+'.\nFile not found.',oArg.onError);}else{Zapatec.Transport.displayError(0,"Error: Can't fetch "+oArg.url+'.\n'+
(oExpn.message||''),oArg.onError);}}};return null;};Zapatec.Transport.parseHtml=function(sHtml){sHtml+='';sHtml=sHtml.replace(/^\s+/g,'');var oTmpContr;if(document.createElementNS){oTmpContr=document.createElementNS('http://www.w3.org/1999/xhtml','div');}else{oTmpContr=document.createElement('div');}
oTmpContr.innerHTML=sHtml;return oTmpContr;};Zapatec.Transport.evalGlobalScope=function(sScript){if(typeof sScript!='string'||!sScript.match(/\S/)){return;}
if(window.execScript){window.execScript(sScript,'javascript');}else if(window.eval){window.eval(sScript);}};Zapatec.Transport.setInnerHtml=function(oArg){if(!oArg||typeof oArg.html!='string'){return;}
var sHtml=oArg.html;var oContr=null;if(typeof oArg.container=='string'){oContr=document.getElementById(oArg.container);}else if(typeof oArg.container=='object'){oContr=oArg.container;}
var aScripts=[];if(sHtml.match(/<\s*\/\s*script\s*>/i)){var aTokens=sHtml.split(/<\s*\/\s*script\s*>/i);var aHtml=[];for(var iToken=aTokens.length-1;iToken>=0;iToken--){var sToken=aTokens[iToken];if(sToken.match(/\S/)){var aMatch=sToken.match(/<\s*script([^>]*)>/i);if(aMatch){var aCouple=sToken.split(/<\s*script[^>]*>/i);while(aCouple.length<2){if(sToken.match(/^<\s*script[^>]*>/i)){aCouple.unshift('');}else{aCouple.push('');}}
aHtml.unshift(aCouple[0]);var sAttrs=aMatch[1];var srtScript=aCouple[1];if(sAttrs.match(/\s+src\s*=/i)){srtScript='';}else{srtScript=srtScript.replace(/function\s+([^(]+)/g,'$1=function');}
aScripts.push([sAttrs,srtScript]);}else if(iToken<aTokens.length-1){aTokens[iToken-1]+='</script>'+sToken;}else{aHtml.unshift(sToken);}}else{aHtml.unshift(sToken);}}
sHtml=aHtml.join('');}
if(oContr){if(window.opera){oContr.innerHTML='<form></form>';}
oContr.innerHTML=sHtml;}
for(var iScript=0;iScript<aScripts.length;iScript++){if(aScripts[iScript][1].length){Zapatec.Transport.evalGlobalScope(aScripts[iScript][1]);}
var sAttrs=aScripts[iScript][0];sAttrs=sAttrs.replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'').replace(/ = /g,'=');if(sAttrs.indexOf('src=')>=0){var oContr=document.body;if(!oContr){oContr=document.getElementsByTagName('head')[0];if(!oContr){oContr=document;}}
var aAttrs=sAttrs.split(' ');var oScript=Zapatec.Utils.createElement('script');for(var iAttr=0;iAttr<aAttrs.length;iAttr++){var aAttr=aAttrs[iAttr].split('=');if(aAttr.length>1){oScript.setAttribute(aAttr[0],aAttr[1].match(/^[\s|"|']*([\s|\S]*[^'|"])[\s|"|']*$/)[1]);}else{oScript.setAttribute(aAttr[0],aAttr[0]);}}
oContr.appendChild(oScript);}}};Zapatec.Transport.fetchXmlDoc=function(oArg){if(oArg==null||typeof oArg!='object'){return null;}
if(!oArg.url){return null;}
if(typeof oArg.async=='undefined'){oArg.async=true;}
if(!oArg.onLoad){oArg.onLoad=null;}
if(!oArg.onError){oArg.onError=null;}
if(!oArg.method&&typeof oArg.username=='undefined'&&typeof oArg.password=='undefined'){if(document.implementation&&document.implementation.createDocument){var oDoc=null;if(!oArg.reliable){oArg.reliable=false;}
var oFetchArg={};for(var sKey in oArg){oFetchArg[sKey]=oArg[sKey];}
if(oArg.async){oFetchArg.onLoad=function(oRequest){oFetchArg.onLoad=null;var parser=new DOMParser();oDoc=parser.parseFromString(oRequest.responseText,"text/xml");Zapatec.Transport.removeBusy(oArg);Zapatec.Transport.onXmlDocLoad(oDoc,oArg.onLoad,oArg.onError);};}else{oFetchArg.onLoad=null;}
var oRequest=Zapatec.Transport.fetch(oFetchArg);if(!oArg.async&&oRequest){var parser=new DOMParser();oDoc=parser.parseFromString(oRequest.responseText,"text/xml");Zapatec.Transport.removeBusy(oArg);Zapatec.Transport.onXmlDocLoad(oDoc,oArg.onLoad,oArg.onError);return oDoc;}
return null;}
if(typeof ActiveXObject!='undefined'){Zapatec.Transport.showBusy(oArg);try{var oDoc=new ActiveXObject(Zapatec.Transport.XMLDOM);oDoc.async=oArg.async;if(oArg.async){oDoc.onreadystatechange=function(){if(oDoc.readyState==4){Zapatec.Transport.removeBusy(oArg);Zapatec.Transport.onXmlDocLoad(oDoc,oArg.onLoad,oArg.onError);oDoc.onreadystatechange={};}};}
oDoc.load(oArg.url);if(!oArg.async){Zapatec.Transport.removeBusy(oArg);Zapatec.Transport.onXmlDocLoad(oDoc,oArg.onLoad,oArg.onError);return oDoc;}
return null;}catch(oExpn){Zapatec.Transport.removeBusy(oArg);};}}
var oFetchArg={};for(var sKey in oArg){oFetchArg[sKey]=oArg[sKey];}
if(oArg.async){oFetchArg.onLoad=function(oRequest){Zapatec.Transport.parseXml({strXml:oRequest.responseText,onLoad:oArg.onLoad,onError:oArg.onError});};}else{oFetchArg.onLoad=null;}
var oRequest=Zapatec.Transport.fetch(oFetchArg);if(!oArg.async&&oRequest){return Zapatec.Transport.parseXml({strXml:oRequest.responseText,onLoad:oArg.onLoad,onError:oArg.onError});}
return null;};Zapatec.Transport.parseXml=function(oArg){if(oArg==null||typeof oArg!='object'){return null;}
if(!oArg.strXml){return null;}
if(!oArg.onLoad){oArg.onLoad=null;}
if(!oArg.onError){oArg.onError=null;}
if(window.DOMParser){try{var oDoc=(new DOMParser()).parseFromString(oArg.strXml,'text/xml');Zapatec.Transport.onXmlDocLoad(oDoc,oArg.onLoad,oArg.onError);return oDoc;}catch(oExpn){Zapatec.Transport.displayError(0,"Error: Can't parse.\n"+'String does not appear to be a valid XML fragment.',oArg.onError);};return null;}
if(typeof ActiveXObject!='undefined'){try{var oDoc=new ActiveXObject(Zapatec.Transport.XMLDOM);oDoc.loadXML(oArg.strXml);Zapatec.Transport.onXmlDocLoad(oDoc,oArg.onLoad,oArg.onError);return oDoc;}catch(oExpn){};}
return null;};Zapatec.Transport.onXmlDocLoad=function(oDoc,onLoad,onError){var sError=null;if(oDoc.parseError){sError=oDoc.parseError.reason;if(oDoc.parseError.srcText){sError+='Location: '+oDoc.parseError.url+'\nLine number '+oDoc.parseError.line+', column '+
oDoc.parseError.linepos+':\n'+
oDoc.parseError.srcText+'\n';}}else if(oDoc.documentElement&&oDoc.documentElement.tagName=='parsererror'){sError=oDoc.documentElement.firstChild.data+'\n'+
oDoc.documentElement.firstChild.nextSibling.firstChild.data;}else if(!oDoc.documentElement){sError='String does not appear to be a valid XML fragment.';}
if(sError){Zapatec.Transport.displayError(0,"Error: Can't parse.\n"+sError,onError);}else{if(typeof onLoad=='function'){onLoad(oDoc);}}};Zapatec.Transport.serializeXmlDoc=function(oDoc){if(window.XMLSerializer){return(new XMLSerializer).serializeToString(oDoc);}
if(oDoc.xml){return oDoc.xml;}};Zapatec.Transport.fetchJsonObj=function(oArg){if(oArg==null||typeof oArg!='object'){return null;}
if(!oArg.url){return null;}
if(typeof oArg.async=='undefined'){oArg.async=true;}
if(!oArg.reliable){oArg.reliable=false;}
var oFetchArg={};for(var sKey in oArg){oFetchArg[sKey]=oArg[sKey];}
if(oArg.async){oFetchArg.onLoad=function(oRequest){Zapatec.Transport.parseJson({strJson:oRequest.responseText,reliable:oArg.reliable,onLoad:oArg.onLoad,onError:oArg.onError});};}else{oFetchArg.onLoad=null;}
var oRequest=Zapatec.Transport.fetch(oFetchArg);if(!oArg.async&&oRequest){return Zapatec.Transport.parseJson({strJson:oRequest.responseText,reliable:oArg.reliable,onLoad:oArg.onLoad,onError:oArg.onError});}
return null;};Zapatec.Transport.parseJson=function(oArg){if(oArg==null||typeof oArg!='object'){return null;}
if(!oArg.reliable){oArg.reliable=false;}
if(!oArg.onLoad){oArg.onLoad=null;}
if(!oArg.onError){oArg.onError=null;}
var oJson=null;try{if(oArg.reliable){if(oArg.strJson){oJson=eval('('+oArg.strJson+')');}}else{oJson=Zapatec.Transport.parseJsonStr(oArg.strJson);}}catch(oExpn){var sError="Error: Can't parse.\nString doesn't appear to be a valid JSON fragment: ";sError+=oExpn.message;if(typeof oExpn.text!='undefined'&&oExpn.text.length){sError+='\n'+oExpn.text;}
sError+='\n'+oArg.strJson;Zapatec.Transport.displayError(0,sError,oArg.onError);return null;};if(typeof oArg.onLoad=='function'){oArg.onLoad(oJson);}
return oJson;};Zapatec.Transport.parseJsonStr=function(text){var p=/^\s*(([,:{}\[\]])|"(\\.|[^\x00-\x1f"\\])*"|-?\d+(\.\d*)?([eE][+-]?\d+)?|true|false|null)\s*/,token,operator;function error(m,t){throw{name:'JSONError',message:m,text:t||operator||token};}
function next(b){if(b&&b!=operator){error("Expected '"+b+"'");}
if(text){var t=p.exec(text);if(t){if(t[2]){token=null;operator=t[2];}else{operator=null;try{token=eval(t[1]);}catch(e){error("Bad token",t[1]);}}
text=text.substring(t[0].length);}else{error("Unrecognized token",text);}}else{token=operator=null;}}
function val(){var k,o;switch(operator){case'{':next('{');o={};if(operator!='}'){for(;;){if(operator||typeof token!='string'){error("Missing key");}
k=token;next();next(':');o[k]=val();if(operator!=','){break;}
next(',');}}
next('}');return o;case'[':next('[');o=[];if(operator!=']'){for(;;){o.push(val());if(operator!=','){break;}
next(',');}}
next(']');return o;default:if(operator!==null){error("Missing value");}
k=token;next();return k;}}
next();return val();};Zapatec.Transport.serializeJsonObj=function(v){var a=[];function e(s){a[a.length]=s;}
function g(x){var c,i,l,v;switch(typeof x){case'object':if(x){if(x instanceof Array){e('[');l=a.length;for(i=0;i<x.length;i+=1){v=x[i];if(typeof v!='undefined'&&typeof v!='function'){if(l<a.length){e(',');}
g(v);}}
e(']');return;}else if(typeof x.toString!='undefined'){e('{');l=a.length;for(i in x){v=x[i];if(x.hasOwnProperty(i)&&typeof v!='undefined'&&typeof v!='function'){if(l<a.length){e(',');}
g(i);e(':');g(v);}}
return e('}');}}
e('null');return;case'number':e(isFinite(x)?+x:'null');return;case'string':l=x.length;e('"');for(i=0;i<l;i+=1){c=x.charAt(i);if(c>=' '){if(c=='\\'||c=='"'){e('\\');}
e(c);}else{switch(c){case'\b':e('\\b');break;case'\f':e('\\f');break;case'\n':e('\\n');break;case'\r':e('\\r');break;case'\t':e('\\t');break;default:c=c.charCodeAt();e('\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16));}}}
e('"');return;case'boolean':e(String(x));return;default:e('null');return;}}
g(v);return a.join('');};Zapatec.Transport.displayError=function(iErrCode,sError,onError){if(typeof onError=='function'){onError({errorCode:iErrCode,errorDescription:sError});}else{alert(sError);}};Zapatec.Transport.translateUrl=function(oArg){if(!oArg||!oArg.url){return null;}
var aFullUrl=oArg.url.split('?',2);var sUrl=aFullUrl[0];if(sUrl.indexOf(':')>=0){return oArg.url;}
var oLocation=document.location;var sPort=oLocation.port;if(sPort){sPort=':'+sPort;}
if(sUrl[0]=='/'){return[oLocation.protocol,'//',oLocation.hostname,sPort,sUrl].join('');}
var sLocation;if(sPort){sLocation=[oLocation.protocol,'//',oLocation.hostname,sPort,oLocation.pathname].join('');}else{sLocation=oLocation.toString();}
var sRelativeTo;if(typeof oArg.relativeTo!='string'){sRelativeTo=sLocation.split('?',2)[0];}else{sRelativeTo=oArg.relativeTo.split('?',2)[0];if(sRelativeTo.indexOf('/')<0){sRelativeTo=sLocation.split('?',2)[0];}else if(sRelativeTo.charAt(0)!='/'&&sRelativeTo.indexOf(':')<0){sRelativeTo=Zapatec.Transport.translateUrl({url:sRelativeTo});}}
sRelativeTo=sRelativeTo.split('#')[0];var aUrl=sUrl.split('/');var aRelativeTo=sRelativeTo.split('/');aRelativeTo.pop();for(var iToken=0;iToken<aUrl.length;iToken++){var sToken=aUrl[iToken];if(sToken=='..'){aRelativeTo.pop();}else if(sToken!='.'){aRelativeTo.push(sToken);}}
aFullUrl[0]=aRelativeTo.join('/');return aFullUrl.join('?');};Zapatec.Transport.loading={};Zapatec.Transport.setupEvents=function(oArg){if(!oArg){return{};}
if(oArg.force||!Zapatec.EventDriven||!oArg.url){return{onLoad:oArg.onLoad,onError:oArg.onError};}
var sUrl=oArg.url;if(typeof oArg.onLoad=='function'){Zapatec.EventDriven.addEventListener('zpTransportOnLoad'+sUrl,oArg.onLoad);}
if(typeof oArg.onError=='function'){Zapatec.EventDriven.addEventListener('zpTransportOnError'+sUrl,oArg.onError);}
if(Zapatec.Transport.loading[sUrl]){return{loading:true};}else{Zapatec.Transport.loading[sUrl]=true;return{onLoad:new Function("Zapatec.EventDriven.fireEvent('zpTransportOnLoad"+
sUrl+"');Zapatec.EventDriven.removeEvent('zpTransportOnLoad"+
sUrl+"');Zapatec.EventDriven.removeEvent('zpTransportOnError"+
sUrl+"');Zapatec.Transport.loading['"+sUrl+"'] = false;"),onError:new Function('oError',"Zapatec.EventDriven.fireEvent('zpTransportOnError"+
sUrl+"',oError);Zapatec.EventDriven.removeEvent('zpTransportOnLoad"+
sUrl+"');Zapatec.EventDriven.removeEvent('zpTransportOnError"+
sUrl+"');Zapatec.Transport.loading['"+sUrl+"'] = false;")};}};Zapatec.Transport.loadedJS={};Zapatec.Transport.isLoadedJS=function(sUrl,sAbsUrl){if(typeof sAbsUrl=='undefined'){sAbsUrl=Zapatec.Transport.translateUrl({url:sUrl});}
if(Zapatec.Transport.loadedJS[sAbsUrl]){return true;}
var aScripts=document.getElementsByTagName('script');for(var iScript=0;iScript<aScripts.length;iScript++){var sSrc=aScripts[iScript].getAttribute('src')||'';if(sSrc==sUrl){Zapatec.Transport.loadedJS[sAbsUrl]=true;return true;}}
return false;};Zapatec.Transport.getPath=function(sScriptFileName){var aScripts=document.getElementsByTagName('script');for(var iScript=aScripts.length-1;iScript>=0;iScript--){var sSrc=aScripts[iScript].getAttribute('src')||'';var aTokens=sSrc.split('/');var sLastToken=aTokens.pop();if(sLastToken==sScriptFileName){return aTokens.length?aTokens.join('/')+'/':'';}}
for(var sSrc in Zapatec.Transport.loadedJS){var aTokens=sSrc.split('/');var sLastToken=aTokens.pop();if(sLastToken==sScriptFileName){return aTokens.length?aTokens.join('/')+'/':'';}}
return'';};Zapatec.Transport.include=function(sSrc,sId,bForce){if(Zapatec.doNotInclude){return;}
var sAbsUrl=Zapatec.Transport.translateUrl({url:sSrc});if(!bForce&&Zapatec.Transport.isLoadedJS(sSrc,sAbsUrl)){return;}
document.write('<script type="text/javascript" src="'+sSrc+
(typeof sId=='string'?'" id="'+sId:'')+'"></script>');Zapatec.Transport.loadedJS[sAbsUrl]=true;};Zapatec.include=Zapatec.Transport.include;Zapatec.Transport.includeJS=function(sSrc,sId){setTimeout(function(){var oContr=document.body;if(!oContr){oContr=document.getElementsByTagName('head')[0];if(!oContr){oContr=document;}}
var oScript=document.createElement('script');oScript.type='text/javascript';oScript.src=sSrc;if(typeof sId=='string'){oScript.id=sId;}
oContr.appendChild(oScript);},0);};Zapatec.Transport.loadJS=function(oArg){if(!(oArg instanceof Object)){return;}
if(typeof oArg.async=='undefined'){oArg.async=true;}
var sUrl=null;if(oArg.url){sUrl=oArg.url;}else if(oArg.module){var sPath='';if(typeof oArg.path!='undefined'){sPath=oArg.path;}else if(typeof Zapatec.zapatecPath!='undefined'){sPath=Zapatec.zapatecPath;}
sUrl=sPath+oArg.module+'.js';}else{return;}
var sAbsUrl=Zapatec.Transport.translateUrl({url:sUrl});if(!oArg.onLoad){oArg.onLoad=null;}
if(!oArg.onError){oArg.onError=null;}
if(Zapatec.doNotInclude||(!oArg.force&&Zapatec.Transport.isLoadedJS(sUrl,sAbsUrl))){if(typeof oArg.onLoad=='function'){oArg.onLoad();}
return;}
var oHandlers=Zapatec.Transport.setupEvents({url:sAbsUrl,force:oArg.force,onLoad:oArg.onLoad,onError:oArg.onError});if(oHandlers.loading){return;}
Zapatec.Transport.fetch({url:sUrl,async:oArg.async,onLoad:function(oRequest){if(oArg.force||!Zapatec.Transport.loadedJS[sAbsUrl]){var aTokens=sUrl.split('/');var sLastToken=aTokens.pop();Zapatec.lastLoadedModule=aTokens.join('/')+'/';Zapatec.Transport.evalGlobalScope(oRequest.responseText);Zapatec.lastLoadedModule=null;Zapatec.Transport.loadedJS[sAbsUrl]=true;}
if(typeof oHandlers.onLoad=='function'){oHandlers.onLoad();}},onError:oHandlers.onError});};Zapatec.Transport.includeCSS=function(sHref){var oContr=document.getElementsByTagName('head')[0];if(!oContr){return;}
var oLink=document.createElement('link');oLink.setAttribute('rel','stylesheet');oLink.setAttribute('type','text/css');oLink.setAttribute('href',sHref);oContr.appendChild(oLink);};Zapatec.Transport.loadedCss={};Zapatec.Transport.loadCss=function(oArg){if(!(oArg instanceof Object)){return;}
if(!oArg.url){return;}
if(typeof oArg.async=='undefined'){oArg.async=true;}
var sAbsUrl=Zapatec.Transport.translateUrl({url:oArg.url});if(!oArg.force){if(Zapatec.Transport.loadedCss[sAbsUrl]){if(typeof oArg.onLoad=='function'){oArg.onLoad();}
return;}
var aLinks=document.getElementsByTagName('link');for(var iLnk=0;iLnk<aLinks.length;iLnk++){var sHref=aLinks[iLnk].getAttribute('href')||'';sHref=Zapatec.Transport.translateUrl({url:sHref});if(sHref==sAbsUrl){Zapatec.Transport.loadedCss[sAbsUrl]=true;if(typeof oArg.onLoad=='function'){oArg.onLoad();}
return;}}}
var oHandlers=Zapatec.Transport.setupEvents({url:sAbsUrl,force:oArg.force,onLoad:oArg.onLoad,onError:oArg.onError});if(oHandlers.loading){return;}
Zapatec.Transport.fetch({url:oArg.url,async:oArg.async,onLoad:function(oRequest){var sCss=oRequest.responseText;var aResultCss=[];var aImgUrls=[];var aCssUrls=[];var iPos=0;var iNextPos=sCss.indexOf('url(',iPos);while(iNextPos>=0){iNextPos+=4;var sToken=sCss.substring(iPos,iNextPos);var bIsImport=/@import\s+url\($/.test(sToken);aResultCss.push(sToken);iPos=iNextPos;iNextPos=sCss.indexOf(')',iPos);if(iNextPos>=0){var sImgUrl=sCss.substring(iPos,iNextPos);sImgUrl=sImgUrl.replace(/['"]/g,'');sImgUrl=Zapatec.Transport.translateUrl({url:sImgUrl,relativeTo:oArg.url});sImgUrl=Zapatec.Transport.translateUrl({url:sImgUrl});aResultCss.push(sImgUrl);if(bIsImport){aCssUrls.push(sImgUrl);}else{aImgUrls.push(sImgUrl);}
iPos=iNextPos;iNextPos=sCss.indexOf('url(',iPos);}}
aResultCss.push(sCss.substr(iPos));sCss=aResultCss.join('');Zapatec.Transport.loadCssList({urls:aCssUrls,async:oArg.async,onLoad:function(){(new Zapatec.StyleSheet()).addParse(sCss);if(typeof oHandlers.onLoad=='function'){oHandlers.onLoad();}}});Zapatec.Transport.loadedCss[sAbsUrl]=true;Zapatec.Transport.preloadImages({urls:aImgUrls,timeout:60000});},onError:oHandlers.onError});};Zapatec.Transport.loadCssList=function(oArg){if(!(oArg instanceof Object)){return;}
if(typeof oArg.async=='undefined'){oArg.async=true;}
if(!oArg.onLoad){oArg.onLoad=null;}
if(!oArg.onError){oArg.onError=null;}
if(!oArg.urls||!oArg.urls.length){if(typeof oArg.onLoad=='function'){oArg.onLoad();}
return;}
var sUrl=oArg.urls.shift();var funcOnLoad=function(){Zapatec.Transport.loadCssList({urls:oArg.urls,async:oArg.async,force:oArg.force,onLoad:oArg.onLoad,onError:oArg.onError});};Zapatec.Transport.loadCss({url:sUrl,async:oArg.async,force:oArg.force,onLoad:funcOnLoad,onError:function(oError){Zapatec.Transport.displayError(oError.errorCode,oError.errorDescription,oArg.onError);funcOnLoad();}});};Zapatec.Transport.imagePreloads=[];Zapatec.Transport.preloadImages=function(oArg){Zapatec.Transport.imagePreloads.push(new Zapatec.PreloadImages(oArg));};Zapatec.Drag={};Zapatec.Utils.emulateWindowEvent(['mousedown','mousemove','mouseup']);Zapatec.Drag.currentId=null;Zapatec.Drag.start=function(oEv,sId,oArg){var oDrag=Zapatec.Drag;var oUtils=Zapatec.Utils;if(oDrag.currentId){return true;}
var oEl=Zapatec.Widget.getElementById(sId);if(!oEl||oEl.zpDrag){return true;}
if(!oArg){oArg={};}
var oPos=oUtils.getMousePos(oEv||window.event);Zapatec.EventDriven.fireEvent('dragStart',{el:oEl,event:oEv});oEl.zpDrag=true;if(oArg.resize){oEl.zpDragResize=true;}
oEl.zpDragPageX=oPos.pageX;oEl.zpDragPageY=oPos.pageY;oEl.zpDragWidth=oEl.clientWidth;oEl.zpDragHeight=oEl.clientHeight;var sTag;var oOffsetParent=oEl.offsetParent;if(oOffsetParent){sTag=oOffsetParent.tagName.toLowerCase();}
if(sTag&&sTag!='body'&&sTag!='html'){oPos=oUtils.getElementOffset(oEl);var oPosParent=oUtils.getElementOffset(oOffsetParent);oEl.zpDragLeft=oPos.left-oPosParent.left;oEl.zpDragTop=oPos.top-oPosParent.top;}else{oEl.zpDragLeft=oEl.offsetLeft;oEl.zpDragTop=oEl.offsetTop;}
oEl.zpDragRight=oEl.zpDragLeft+oEl.zpDragWidth;oEl.zpDragBottom=oEl.zpDragTop+oEl.zpDragHeight;oEl.zpDragPrevLeft=oEl.zpDragPrevRealLeft=oEl.zpDragLeft;oEl.zpDragPrevTop=oEl.zpDragPrevRealTop=oEl.zpDragTop;oEl.zpDragV=oArg.vertical;oEl.zpDragH=oArg.horizontal;oEl.zpDragLimTop=typeof oArg.limitTop=='number'?oArg.limitTop:-Infinity;oEl.zpDragLimBot=typeof oArg.limitBottom=='number'?oArg.limitBottom:Infinity;oEl.zpDragLimLft=typeof oArg.limitLeft=='number'?oArg.limitLeft:-Infinity;oEl.zpDragLimRgh=typeof oArg.limitRight=='number'?oArg.limitRight:Infinity;if(typeof oArg.step=='number'){oEl.zpDragStepV=oEl.zpDragStepH=oArg.step;}
if(typeof oArg.stepVertical=='number'){oEl.zpDragStepV=oArg.stepVertical;}
if(typeof oArg.stepHorizontal=='number'){oEl.zpDragStepH=oArg.stepHorizontal;}
oDrag.currentId=sId;oUtils.addEvent(document,'mousemove',oDrag.move);oUtils.addEvent(document,'mouseup',oDrag.end);return true;};Zapatec.Drag.move=function(oEv){var oDrag=Zapatec.Drag;var oUtils=Zapatec.Utils;oEv||(oEv=window.event);if(!oDrag.currentId){return oUtils.stopEvent(oEv);}
var oEl=document.getElementById(oDrag.currentId);if(!(oEl&&oEl.zpDrag)){return oUtils.stopEvent(oEv);}
var oSt=oEl.style;var oPos=oUtils.getMousePos(oEv);var oParam={el:oEl,startLeft:oEl.zpDragLeft,startTop:oEl.zpDragTop,prevLeft:oEl.zpDragPrevLeft,prevTop:oEl.zpDragPrevTop,left:oEl.zpDragLeft,top:oEl.zpDragTop,realLeft:oEl.zpDragLeft,realTop:oEl.zpDragTop,event:oEv};var iOffset,iPos,iStep,iSize;iOffset=oPos.pageX-oEl.zpDragPageX;iStep=oEl.zpDragStepH;if(iStep){iPos=oEl.zpDragLeft+Math.floor(iOffset/iStep)*iStep;oParam.realLeft=oEl.zpDragPrevRealLeft=oEl.zpDragLeft+iOffset;}else{oParam.realLeft=oEl.zpDragPrevRealLeft=iPos=oEl.zpDragLeft+iOffset;}
if(!oEl.zpDragV){if(oEl.zpDragLimLft<=iPos&&oEl.zpDragLimRgh>=iPos){if(oSt.right){oSt.right='';}
if(oEl.zpDragResize){if(iOffset>0){iSize=oEl.zpDragWidth+iOffset;if(iStep){iSize=Math.floor(iSize/iStep)*iStep;}
oSt.left=oEl.zpDragLeft+'px';}else{iSize=oEl.zpDragWidth-iOffset;if(iStep){iSize=Math.ceil(iSize/iStep)*iStep;}
oSt.left=oEl.zpDragLeft-iSize+'px';}
oSt.width=iSize+'px';}else{oSt.left=iPos+'px';}
oParam.left=iPos;oEl.zpDragPrevLeft=iPos;}else{oParam.left=oParam.prevLeft;}}
iOffset=oPos.pageY-oEl.zpDragPageY;iStep=oEl.zpDragStepV;if(iStep){iPos=oEl.zpDragTop+Math.floor(iOffset/iStep)*iStep;oParam.realTop=oEl.zpDragPrevRealTop=oEl.zpDragTop+iOffset;}else{iPos=oParam.realTop=oEl.zpDragPrevRealTop=oEl.zpDragTop+iOffset;}
if(!oEl.zpDragH){if(oEl.zpDragLimTop<=iPos&&oEl.zpDragLimBot>=iPos){if(oSt.bottom){oSt.bottom='';}
if(oEl.zpDragResize){if(iOffset>0){iSize=oEl.zpDragHeight+iOffset;if(iStep){iSize=Math.floor(iSize/iStep)*iStep;}
oSt.top=oEl.zpDragTop+'px';}else{iSize=oEl.zpDragHeight-iOffset;if(iStep){iSize=Math.ceil(iSize/iStep)*iStep;}
oSt.top=oEl.zpDragBottom-iSize+'px';}
oSt.height=iSize+'px';}else{oSt.top=iPos+'px';}
oParam.top=iPos;oEl.zpDragPrevTop=iPos;}else{oParam.top=oParam.prevTop;}}
Zapatec.EventDriven.fireEvent('dragMove',oParam);return oUtils.stopEvent(oEv);};Zapatec.Drag.end=function(oEv){var oDrag=Zapatec.Drag;var oUtils=Zapatec.Utils;oEv||(oEv=window.event);if(!oDrag.currentId){return oUtils.stopEvent(oEv);}
var oEl=document.getElementById(oDrag.currentId);if(!(oEl&&oEl.zpDrag)){return oUtils.stopEvent(oEv);}
oUtils.removeEvent(document,'mousemove',oDrag.move);oUtils.removeEvent(document,'mouseup',oDrag.end);var oParam={el:oEl,startLeft:oEl.zpDragLeft,startTop:oEl.zpDragTop,left:oEl.zpDragPrevLeft,top:oEl.zpDragPrevTop,realLeft:oEl.zpDragPrevRealLeft,realTop:oEl.zpDragPrevRealTop,event:oEv};oDrag.currentId=null;oEl.zpDrag=null;oEl.zpDragPageY=null;oEl.zpDragPageX=null;oEl.zpDragTop=null;oEl.zpDragLeft=null;oEl.zpDragPrevTop=null;oEl.zpDragPrevLeft=null;oEl.zpDragPrevRealTop=null;oEl.zpDragPrevRealLeft=null;oEl.zpDragV=null;oEl.zpDragH=null;oEl.zpDragLimTop=null;oEl.zpDragLimBot=null;oEl.zpDragLimLft=null;oEl.zpDragLimRgh=null;oEl.zpDragStepV=null;oEl.zpDragStepH=null;Zapatec.EventDriven.fireEvent('dragEnd',oParam);return oUtils.stopEvent(oEv);};if(typeof Zapatec=='undefined'){Zapatec=function(){};}
Zapatec.Widget=function(oArg){this.config={};Zapatec.Widget.SUPERconstructor.call(this);this.init(oArg);};Zapatec.inherit(Zapatec.Widget,Zapatec.EventDriven);Zapatec.Widget.path=Zapatec.getPath('Zapatec.Widget');Zapatec.Widget.prototype.init=function(oArg){Zapatec.Widget.SUPERclass.init.call(this);if(typeof this.id=='undefined'){var iId=0;while(Zapatec.Widget.all[iId]){iId++;}
this.id=iId;Zapatec.Widget.all[iId]=this;}
this.configure(oArg);this.addUserEventListeners();this.addStandardEventListeners();this.initLang();this.loadTheme();};Zapatec.Widget.prototype.reconfigure=function(oArg){this.configure(oArg);this.loadTheme();if(oArg.lang||oArg.langCountryCode||oArg.langEncoding){this.langStr=this.config.lang;if(this.config.langCountryCode&&this.config.langCountryCode.length>0){this.langStr+="_"+this.config.langCountryCode;}
if(this.config.langEncoding&&this.config.langEncoding.length>0){this.langStr+="-"+this.config.langEncoding;}}
if(this.config.lang&&this.config.lang.length>0&&!(Zapatec.Langs[this.config.langId]&&Zapatec.Langs[this.config.langId][this.langStr])){Zapatec.Log({description:this.config.lang+(this.config.langCountryCode?" and country code "+this.config.langCountryCode:"")+(this.config.langEncoding?" and encoding "+this.config.langEncoding:"")});this.config.lang=null;this.config.langEncoding=null;this.langStr=null;}};Zapatec.Widget.prototype.configure=function(oArg){this.defineConfigOption('theme','default');var sPath=this.constructor.path;if(typeof sPath!='undefined'){this.defineConfigOption('themePath',sPath+'../themes/');}else{this.defineConfigOption('themePath','../themes/');}
this.defineConfigOption('asyncTheme',false);this.defineConfigOption('source');this.defineConfigOption('sourceType');this.defineConfigOption('callbackSource');this.defineConfigOption('asyncSource',true);this.defineConfigOption('reliableSource',true);this.defineConfigOption('callbackConvertSource');this.defineConfigOption('eventListeners',{});this.defineConfigOption('langId');this.defineConfigOption('lang');this.defineConfigOption('langCountryCode');this.defineConfigOption('langEncoding');if(oArg){var oConfig=this.config;for(var sOption in oArg){if(typeof oConfig[sOption]!='undefined'){oConfig[sOption]=oArg[sOption];}else{Zapatec.Log({description:"Unknown config option: "+sOption});}}}};Zapatec.Widget.prototype.getConfiguration=function(){return this.config;};Zapatec.Widget.all=[];Zapatec.Widget.getWidgetById=function(iId){return Zapatec.Widget.all[iId];};Zapatec.Widget.prototype.addCircularRef=function(oElement,sProperty){if(!this.widgetCircularRefs){this.widgetCircularRefs=[];}
this.widgetCircularRefs.push([oElement,sProperty]);};Zapatec.Widget.prototype.createProperty=function(oElement,sProperty,val){oElement[sProperty]=val;this.addCircularRef(oElement,sProperty);};Zapatec.Widget.prototype.removeCircularRefs=function(){if(!this.widgetCircularRefs){return;}
for(var iRef=this.widgetCircularRefs.length-1;iRef>=0;iRef--){var oRef=this.widgetCircularRefs[iRef];oRef[0][oRef[1]]=null;oRef[0]=null;}};Zapatec.Widget.prototype.discard=function(){Zapatec.Widget.all[this.id]=null;this.removeCircularRefs();};Zapatec.Widget.removeCircularRefs=function(){for(var iWidget=Zapatec.Widget.all.length-1;iWidget>=0;iWidget--){var oWidget=Zapatec.Widget.all[iWidget];if(oWidget&&oWidget.removeCircularRefs){oWidget.removeCircularRefs();}}};Zapatec.Utils.addEvent(window,'unload',Zapatec.Widget.removeCircularRefs);Zapatec.Widget.prototype.defineConfigOption=function(sOption,val){if(typeof this.config[sOption]=='undefined'){if(typeof val=='undefined'){this.config[sOption]=null;}else{this.config[sOption]=val;}}};Zapatec.Widget.prototype.addUserEventListeners=function(){var oListeners=this.config.eventListeners;var fListener,iListeners,iListener;for(var sEvent in oListeners){if(oListeners.hasOwnProperty(sEvent)){vListener=oListeners[sEvent];if(vListener instanceof Array){iListeners=vListener.length;for(iListener=0;iListener<iListeners;iListener++){this.addEventListener(sEvent,vListener[iListener]);}}else{this.addEventListener(sEvent,vListener);}}}};Zapatec.Widget.prototype.addStandardEventListeners=function(){this.addEventListener('loadThemeError',Zapatec.Widget.loadThemeError);};Zapatec.Widget.loadThemeError=function(oError){var sDescription="Can't load theme.";if(oError&&oError.errorDescription){sDescription+=' '+oError.errorDescription;}
Zapatec.Log({description:sDescription});};Zapatec.Widget.prototype.loadTheme=function(){var oConfig=this.config;if(typeof oConfig.theme=='string'&&oConfig.theme.length){var iPos=oConfig.theme.lastIndexOf('/');if(iPos>=0){iPos++;oConfig.themePath=oConfig.theme.substring(0,iPos);oConfig.theme=oConfig.theme.substring(iPos);}
iPos=oConfig.theme.lastIndexOf('.');if(iPos>=0){oConfig.theme=oConfig.theme.substring(0,iPos);}
oConfig.theme=oConfig.theme.toLowerCase();if(oConfig.theme=='auto'){var sUserAgent=navigator.userAgent;if(sUserAgent.indexOf('Windows NT 6')!=-1){oConfig.theme='winvista';}else if(sUserAgent.indexOf('Windows NT 5')!=-1){oConfig.theme='winxp';}else if(sUserAgent.indexOf('Win')!=-1){oConfig.theme='win2k';}else if(sUserAgent.indexOf('Mac')!=-1){oConfig.theme='macosx';}else{oConfig.theme='default';}}}else{oConfig.theme='';}
if(oConfig.theme){this.fireEvent('loadThemeStart');this.themeLoaded=false;var oWidget=this;var sUrl=oConfig.themePath+oConfig.theme+'.css';Zapatec.Transport.loadCss({url:sUrl,async:oConfig.asyncTheme,onLoad:function(){oWidget.fireEvent('loadThemeEnd');oWidget.themeLoaded=true;},onError:function(oError){oWidget.fireEvent('loadThemeEnd');oWidget.fireEvent('loadThemeError',oError);oWidget.themeLoaded=true;}});}}
Zapatec.Widget.prototype.getClassName=function(oArg){var aClassName=[];if(oArg&&oArg.prefix){aClassName.push(oArg.prefix);}
var sTheme=this.config.theme;if(sTheme!=''){aClassName.push(sTheme.charAt(0).toUpperCase());aClassName.push(sTheme.substr(1));}
if(oArg&&oArg.suffix){aClassName.push(oArg.suffix);}
return aClassName.join('');};Zapatec.Widget.prototype.formElementId=function(oArg){var aId=[];if(oArg&&oArg.prefix){aId.push(oArg.prefix);}else{aId.push('zpWidget');}
aId.push(this.id);if(oArg&&oArg.suffix){aId.push(oArg.suffix);}else{aId.push('-');}
if(typeof this.widgetUniqueIdCounter=='undefined'){this.widgetUniqueIdCounter=0;}else{this.widgetUniqueIdCounter++;}
aId.push(this.widgetUniqueIdCounter);return aId.join('');};Zapatec.Widget.prototype.showContainer=function(effects,animSpeed,onFinish){return this.showHideContainer(effects,animSpeed,onFinish,true);}
Zapatec.Widget.prototype.hideContainer=function(effects,animSpeed,onFinish){return this.showHideContainer(effects,animSpeed,onFinish,false);}
Zapatec.Widget.prototype.showHideContainer=function(effects,animSpeed,onFinish,show){if(this.container==null){return null;}
if(effects&&effects.length>0&&typeof(Zapatec.Effects)=='undefined'){var self=this;Zapatec.Transport.loadJS({url:Zapatec.zapatecPath+'../zpeffects/src/effects.js',onLoad:function(){self.showHideContainer(effects,animSpeed,onFinish,show);}});return false;}
if(animSpeed==null&&isNaN(parseInt(animSpeed))){animSpeed=5;}
if(!effects||effects.length==0){if(show){this.container.style.display=this.originalContainerDisplay;this.originalContainerDisplay=null;}else{this.originalContainerDisplay=this.container.style.display;this.container.style.display='none';}
if(onFinish){onFinish();}}else{if(show){Zapatec.Effects.show(this.container,animSpeed,effects,onFinish);}else{Zapatec.Effects.hide(this.container,animSpeed,effects,onFinish);}}
return true;}
Zapatec.Widget.prototype.loadData=function(oArg){var oConfig=this.config;if(typeof oConfig.callbackSource=='function'){var oSource=oConfig.callbackSource(oArg);if(oSource){if(typeof oSource.source!='undefined'){oConfig.source=oSource.source;}
if(typeof oSource.sourceType!='undefined'){oConfig.sourceType=oSource.sourceType;}}}
var vSource=oConfig.source;if(typeof oConfig.callbackConvertSource=='function'){vSource=oConfig.callbackConvertSource(vSource);}
var sSourceType=oConfig.sourceType;if(vSource!=null&&sSourceType!=null){sSourceType=sSourceType.toLowerCase();if(sSourceType=='html'){this.fireEvent('loadDataStart');this.loadDataHtml(Zapatec.Widget.getElementById(vSource));this.fireEvent('loadDataEnd');}else if(sSourceType=='html/text'){this.fireEvent('loadDataStart');this.loadDataHtmlText(vSource);this.fireEvent('loadDataEnd');}else if(sSourceType=='html/url'){this.fireEvent('fetchSourceStart');var oWidget=this;Zapatec.Transport.fetch({url:vSource,async:oConfig.asyncSource,onLoad:function(oRequest){oWidget.fireEvent('fetchSourceEnd');oWidget.fireEvent('loadDataStart');oWidget.loadDataHtmlText(oRequest.responseText);oWidget.fireEvent('loadDataEnd');},onError:function(oError){oWidget.fireEvent('fetchSourceError',oError);oWidget.fireEvent('fetchSourceEnd');oWidget.fireEvent('loadDataEnd');}});}else if(sSourceType=='json'){this.fireEvent('loadDataStart');if(typeof vSource=='object'){this.loadDataJson(vSource);}else if(oConfig.reliableSource){this.loadDataJson(eval(['(',vSource,')'].join('')));}else{this.loadDataJson(Zapatec.Transport.parseJson({strJson:vSource}));}
this.fireEvent('loadDataEnd');}else if(sSourceType=='json/url'){this.fireEvent('fetchSourceStart');var oWidget=this;Zapatec.Transport.fetchJsonObj({url:vSource,async:oConfig.asyncSource,reliable:oConfig.reliableSource,onLoad:function(oResult){oWidget.fireEvent('fetchSourceEnd');oWidget.fireEvent('loadDataStart');oWidget.loadDataJson(oResult);oWidget.fireEvent('loadDataEnd');},onError:function(oError){oWidget.fireEvent('fetchSourceError',oError);oWidget.fireEvent('fetchSourceEnd');oWidget.fireEvent('loadDataEnd');}});}else if(sSourceType=='xml'){this.fireEvent('loadDataStart');if(typeof vSource=='object'){this.loadDataXml(vSource);}else{this.loadDataXml(Zapatec.Transport.parseXml({strXml:vSource}));}
this.fireEvent('loadDataEnd');}else if(sSourceType=='xml/url'){this.fireEvent('fetchSourceStart');var oWidget=this;Zapatec.Transport.fetchXmlDoc({url:vSource,async:oConfig.asyncSource,onLoad:function(oResult){oWidget.fireEvent('fetchSourceEnd');oWidget.fireEvent('loadDataStart');oWidget.loadDataXml(oResult);oWidget.fireEvent('loadDataEnd');},onError:function(oError){oWidget.fireEvent('fetchSourceError',oError);oWidget.fireEvent('fetchSourceEnd');oWidget.fireEvent('loadDataEnd');}});}}else{this.fireEvent('loadDataStart');this.loadDataHtml(Zapatec.Widget.getElementById(vSource));this.fireEvent('loadDataEnd');}};Zapatec.Widget.prototype.loadDataHtml=function(oSource){};Zapatec.Widget.prototype.loadDataHtmlText=function(sSource){var oTempContainer=Zapatec.Transport.parseHtml(sSource);this.loadDataHtml(oTempContainer.firstChild);};Zapatec.Widget.prototype.loadDataJson=function(oSource){};Zapatec.Widget.prototype.loadDataXml=function(oSource){};Zapatec.Widget.prototype.receiveData=function(oArg){if(!oArg){oArg={};}
this.dataSender=oArg.widget;this.fireEvent('receiveData',oArg);};Zapatec.Widget.prototype.replyData=function(){return null;};Zapatec.Widget.prototype.replyDataCancel=function(){this.fireEvent('replyDataCancel');if(typeof this.hide=='function'){this.hide();}
this.dataSender=null;};Zapatec.Widget.prototype.replyDataReturn=function(oArg){if(!oArg){oArg={};}
this.fireEvent('replyDataReturn',oArg);var oWidget=oArg.widget;if(!oWidget){oWidget=this.dataSender;}
if(!oWidget||typeof oWidget.acceptData!='function'){return;}
oWidget.acceptData({widget:this,data:this.replyData()});this.replyDataCancel();};Zapatec.Widget.prototype.acceptData=function(oArg){this.fireEvent('acceptData',oArg);};Zapatec.Widget.prototype.initLang=function(){this.langStr=this.config.lang;if(this.config.langCountryCode&&this.config.langCountryCode.length>0){this.langStr+="_"+this.config.langCountryCode;}
if(this.config.langEncoding&&this.config.langEncoding.length>0){this.langStr+="-"+this.config.langEncoding;}
if(this.config.lang&&this.config.lang.length>0&&!(Zapatec.Langs[this.config.langId]&&Zapatec.Langs[this.config.langId][this.langStr])){Zapatec.Log({description:"No language data found for language "+
this.config.lang+(this.config.langCountryCode?" and country code "+this.config.langCountryCode:"")+(this.config.langEncoding?" and encoding "+this.config.langEncoding:"")});this.config.lang=null;this.config.langCountryCode=null;this.config.langEncoding=null;this.langStr=null;}};Zapatec.Widget.prototype.getMessage=function(key){if(arguments.length==0){return null;}
if(!Zapatec.Langs[this.config.langId]||!Zapatec.Langs[this.config.langId][this.langStr]||!Zapatec.Langs[this.config.langId][this.langStr][key]){return key;}
var res=Zapatec.Langs[this.config.langId][this.langStr][key];if(arguments.length>1&&typeof(res)=="string"){for(var ii=1;ii<arguments.length;ii++){var re=new RegExp("(^|([^\\\\]))\%"+ii);res=res.replace(re,"$2"+arguments[ii]);}}
return res;};Zapatec.Widget.callMethod=function(iWidgetId,sMethod){var oWidget=Zapatec.Widget.getWidgetById(iWidgetId);if(oWidget&&typeof oWidget[sMethod]=='function'){var aArgs=[].slice.call(arguments,2);return oWidget[sMethod].apply(oWidget,aArgs);}};Zapatec.Widget.getElementById=function(element){if(typeof element=='string'){return document.getElementById(element);}
return element;};Zapatec.Widget.getStyle=function(element){var style=element.getAttribute('style')||'';if(typeof style=='string'){return style;}
return style.cssText;};