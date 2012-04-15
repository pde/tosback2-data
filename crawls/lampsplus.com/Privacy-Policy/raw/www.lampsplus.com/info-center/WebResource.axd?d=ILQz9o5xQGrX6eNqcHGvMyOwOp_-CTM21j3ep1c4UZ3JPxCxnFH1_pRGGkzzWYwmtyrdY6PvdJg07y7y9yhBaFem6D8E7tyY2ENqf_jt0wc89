
Telligent_Modal=new Object();Telligent_Modal._variableName='Telligent_Modal';Telligent_Modal.LoadingHtmlUrl=null;Telligent_Modal.WindowCssClasses=new Array();Telligent_Modal.WindowTitleCssClasses=new Array();Telligent_Modal.WindowCloseCssClasses=new Array();Telligent_Modal.WindowContentCssClasses=new Array();Telligent_Modal.WindowMaskCssClasses=new Array();Telligent_Modal.WindowFooterCssClasses=new Array();Telligent_Modal.WindowResizeCssClasses=new Array();Telligent_Modal.ZIndex=100;Telligent_Modal._modals=new Array();Telligent_Modal.EnableAutoResizing=true;Telligent_Modal.OpenInParentModal=true;Telligent_Modal.Configure=function(loadingHtmlUrl,windowCssClasses,windowTitleCssClasses,windowCloseCssClasses,windowContentCssClasses,windowFooterCssClasses,windowResizeCssClasses,windowMaskCssClasses,zIndex,enableAnimation,enableAutoResizing,openInParentModal)
{this.LoadingHtmlUrl=loadingHtmlUrl;this.WindowCssClasses=windowCssClasses;this.WindowTitleCssClasses=windowTitleCssClasses;this.WindowCloseCssClasses=windowCloseCssClasses;this.WindowContentCssClasses=windowContentCssClasses;this.WindowMaskCssClasses=windowMaskCssClasses;this.WindowFooterCssClasses=windowFooterCssClasses;this.WindowResizeCssClasses=windowResizeCssClasses;this.ZIndex=zIndex;this.EnableAnimation=enableAnimation;this.EnableAutoResizing=enableAutoResizing;this.OpenInParentModal=openInParentModal;}
Telligent_Modal._getParentWindow=function(openerWindow)
{if(this.OpenInParentModal)
{try
{if(window.parent&&window.parent!=window&&window.parent.Telligent_Modal)
return window.parent;}
catch(e){}}
return null;}
Telligent_Modal.GetWindowOpener=function(modalWindow,openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
return w.Telligent_Modal.GetWindowOpener(modalWindow,openerWindow);for(var i=0;i<this._modals.length;i++)
{try
{if(this._modals[i].IsShown()&&this._modals[i]._modalIframe.contentWindow==modalWindow)
return this._modals[i]._openerWindow;}
catch(e){}}
return null;}
Telligent_Modal._getModalWindow=function(openerWindow)
{for(var i=0;i<this._modals.length;i++)
{if(this._modals[i].IsShown()&&this._modals[i]._openerWindow==openerWindow)
return this._modals[i];}
return null;}
Telligent_Modal.IsShown=function(openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
return w.Telligent_Modal.IsShown(openerWindow);var mw=this._getModalWindow(openerWindow);if(mw)
return mw.IsShown();else
return false;}
Telligent_Modal.Resize=function(width,height,preventAutomaticResizing,openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
{w.Telligent_Modal.Resize(width,height,preventAutomaticResizing,openerWindow);return;}
var mw=this._getModalWindow(openerWindow);if(mw)
mw.Resize(width,height,preventAutomaticResizing);}
Telligent_Modal.MoveTo=function(x,y,openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
{w.Telligent_Modal.MoveTo(x,y,openerWindow);return;}
var mw=this._getModalWindow(openerWindow);if(mw)
mw.MoveTo(x,y);}
Telligent_Modal.Open=function(url,width,height,onCloseFunction,x,y,ignoreCloseAndAnimation,isManuallyResized,openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
{w.Telligent_Modal.Open(url,width,height,onCloseFunction,x,y,ignoreCloseAndAnimation,isManuallyResized,openerWindow);return;}
var mw=null;for(var i=this._modals.length-1;i>=0;i--)
{if(!this._modals[i].IsShown())
{mw=this._modals[i];break;}}
if(!mw)
{this._modals[this._modals.length]=new Telligent_Modal_Window(this._variableName+'._modals['+this._modals.length+']');mw=this._modals[this._modals.length-1];}
mw.Open(url,width,height,onCloseFunction,x,y,ignoreCloseAndAnimation,isManuallyResized,openerWindow);}
Telligent_Modal.Close=function(returnValue,openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
{w.Telligent_Modal.Close(returnValue,openerWindow);return;}
var mw=this._getModalWindow(openerWindow);if(mw)
mw.Close(returnValue);}
Telligent_Modal.Refresh=function(openerWindow)
{if(!openerWindow)
openerWindow=window;var w=this._getParentWindow(openerWindow);if(w)
{w.Telligent_Modal.Refresh(openerWindow);return;}
for(var i=0;i<this._modals.length;i++)
{this._modals[i].Refresh();}}
function Telligent_Modal_Window(variableName)
{this._variableName=variableName;this._isShown=false;this._initialized=false;this._modal=null;this._modalTitle=null;this._modalClose=null;this._modalAnimationMask=null;this._modalMask=null;this._modalIframe=null;this._modalResize=null;this._modalFooter=null;this._modalContent=null;this._animationHandle=null;this._isOpening=false;this._checkForScrollResizeHandle=null;this._lastModalInfo=null;this._lastWindowInfo=null;this._isDragging=false;this._moveModalInfo=null;this._resizeModalInfo=null;this._isResizing=false;}
Telligent_Modal_Window.prototype._animate=function(targetValue,nextValue,step,acceleration)
{if(this._animationHandle)
window.clearTimeout(this._animationHandle);if(!this._isOpening)
return;var currValue=parseInt(this._modal.style.top,10);if((step<0&&currValue<targetValue)||(step>0&&currValue>targetValue)||Math.abs(step)<1)
{this._modal.style.top=targetValue+'px';this._modal.style.position='static';this._modalAnimationMask.style.overflow='visible';this._animationHandle=null;if(!this._isResizing&&!this._isDragging)
this._modalIframe.style.display='block';this._isOpening=false;this._lastWindowInfo=Telligent_Common.GetWindowInfo();this._checkForScrollResizeHandle=window.setTimeout(new Function('window.'+this._variableName+'._checkForScrollResize();'),249);}
else
{this._modal.style.top=nextValue+'px';nextValue=nextValue+step;if(step>0&&nextValue>targetValue)
nextValue=targetValue;else if(step<0&&nextValue<targetValue)
nextValue=targetValue;step=step*acceleration;this._animationHandle=window.setTimeout(new Function(this._variableName+'._animate('+targetValue+','+nextValue+','+step+','+acceleration+');'),19);}}
Telligent_Modal_Window.prototype._startDrag=function(event)
{if(!this._initialized)
this._initialize();if(!event)
event=window.event;this._moveModalInfo=new Object();this._moveModalInfo.StartMouseX=event.pageX?event.pageX:event.screenX;this._moveModalInfo.StartMouseY=event.pageY?event.pageY:event.screenY;this._moveModalInfo.StartModalX=this._lastModalInfo.X;this._moveModalInfo.StartModalY=this._lastModalInfo.Y;this._moveModalInfo.Button=event.button;document.onmouseup=new Function('event','window.'+this._variableName+'._endDrag(event); return false;');document.onmousemove=new Function('event','window.'+this._variableName+'._drag(event); return false;');this._isDragging=true;this._modalIframe.style.display='none';}
Telligent_Modal_Window.prototype._endDrag=function(event)
{if(!this._initialized)
this._initialize();document.onmouseup=null;document.onmousemove=null;this._modalIframe.style.display='block';this._isDragging=false;this._moveModalInfo=null;}
Telligent_Modal_Window.prototype._drag=function(event)
{if(!this._initialized)
this._initialize();if(!event)
event=window.event;if(event.button!=this._moveModalInfo.Button)
{this._endDrag(event);return;}
var eventX=typeof(event.pageX)!='undefined'?event.pageX:event.screenX;var eventY=typeof(event.pageY)!='undefined'?event.pageY:event.screenY;var xChange=eventX-this._moveModalInfo.StartMouseX;var yChange=eventY-this._moveModalInfo.StartMouseY;this.MoveTo(this._moveModalInfo.StartModalX+xChange,this._moveModalInfo.StartModalY+yChange);}
Telligent_Modal_Window.prototype._startResize=function(event)
{if(!this._initialized)
this._initialize();if(!event)
event=window.event;this._resizeModalInfo=new Object();this._resizeModalInfo.StartMouseX=event.pageX?event.pageX:event.screenX;this._resizeModalInfo.StartMouseY=event.pageY?event.pageY:event.screenY;this._resizeModalInfo.StartModalWidth=this._lastModalInfo.Width;this._resizeModalInfo.StartModalHeight=this._lastModalInfo.Height;this._resizeModalInfo.Button=event.button;document.onmouseup=new Function('event','window.'+this._variableName+'._endResize(event); return false;');document.onmousemove=new Function('event','window.'+this._variableName+'._resize(event); return false;');this._modalIframe.style.display='none';this._isResizing=true;}
Telligent_Modal_Window.prototype._endResize=function(event)
{if(!this._initialized)
this._initialize();this._isResizing=false;this._resizeModalInfo=null;document.onmouseup=null;document.onmousemove=null;this._modalIframe.style.display='block';}
Telligent_Modal_Window.prototype._resize=function(event)
{if(!this._initialized)
this._initialize();if(!event)
event=window.event;if(event.button!=this._resizeModalInfo.Button)
{this._endResize(event);return;}
var eventX=typeof(event.pageX)!='undefined'?event.pageX:event.screenX;var eventY=typeof(event.pageY)!='undefined'?event.pageY:event.screenY;var xChange=eventX-this._resizeModalInfo.StartMouseX;var yChange=eventY-this._resizeModalInfo.StartMouseY;this.Resize(this._resizeModalInfo.StartModalWidth+xChange,this._resizeModalInfo.StartModalHeight+yChange,true);}
Telligent_Modal_Window.prototype._checkForScrollResize=function()
{if(this._checkForScrollResizeHandle)
window.clearTimeout(this._checkForScrollResizeHandle);if(this._isShown&&!this._isOpening&&this._lastWindowInfo)
{try
{if(document.all)
this._modalTitle.childNodes[1].innerText=this._modalIframe.contentWindow.document.title;else
this._modalTitle.childNodes[1].textContent=this._modalIframe.contentWindow.document.title;}
catch(err)
{}
var windowInfo=Telligent_Common.GetWindowInfo();if(windowInfo.ScrollX!=this._lastWindowInfo.ScrollX||windowInfo.ScrollY!=this._lastWindowInfo.ScrollY||windowInfo.Width!=this._lastWindowInfo.Width||windowInfo.Height!=this._lastWindowInfo.Height)
{this.Resize(this._lastModalInfo.Width,this._lastModalInfo.Height,false);return;}
if(Telligent_Modal.EnableAutoResizing&&!this._isDragging&&!this._isResizing)
{try
{var iFrameDocument=this._modalIframe.contentWindow.document;if(!iFrameDocument.readyState||iFrameDocument.readyState=='complete')
{var currentHeight=this._lastModalInfo.Height;var currentWidth=this._lastModalInfo.Width;currentWidth=iFrameDocument.documentElement.scrollWidth;if(Telligent_Common.IsIE())
currentHeight=iFrameDocument.body.scrollHeight+32;else if(Telligent_Common.IsSafari())
currentHeight=iFrameDocument.body.offsetHeight+32;else
{currentHeight=iFrameDocument.documentElement.offsetHeight;currentWidth=iFrameDocument.documentElement.scrollWidth;}
window.status=currentWidth;var modalContentOffset=Telligent_Common.GetStyleOffset(this._modalContent);var heightOffset=(this._modal.offsetHeight-this._modalContent.offsetHeight)-modalContentOffset.Height;var widthOffset=(this._modal.offsetWidth-this._modalContent.offsetWidth)-modalContentOffset.Width;if(currentHeight>windowInfo.Height-heightOffset)
currentHeight=windowInfo.Height-heightOffset;if(currentWidth>windowInfo.Width-widthOffset)
currentWidth=windowInfo.Width-widthOffset;var changeHeight=(currentHeight!=this._lastModalInfo.Height&&(currentHeight>this._lastModalInfo.Height||(this._lastModalInfo.Height-currentHeight>64&&currentHeight>32))&&(!this._lastModalInfo.IsManuallyResized||currentHeight>this._lastModalInfo.Height));var changeWidth=(currentWidth!=this._lastModalInfo.Width&&(currentWidth>this._lastModalInfo.Width||(this._lastModalInfo.Width-currentWidth>64&&currentWidth>32))&&(!this._lastModalInfo.IsManuallyResized||currentWidth>this._lastModalInfo.Width));if(changeHeight||changeWidth)
{this.Resize(changeWidth?currentWidth:this._lastModalInfo.Width,changeHeight?currentHeight:this._lastModalInfo.Height,false);return;}}}
catch(e){}}
this._checkForScrollResizeHandle=window.setTimeout(new Function('window.'+this._variableName+'._checkForScrollResize();'),249);}}
Telligent_Modal_Window.prototype._initialize=function()
{this._modalMask=document.createElement('div');this._modalMask.style.width='auto';this._modalMask.style.height='auto';this._modalMask.style.position='absolute';this._modalMask.style.display='none';this._modalMask.dispose=new Function('Telligent_Modal.Dispose();');var mm=this._modalMask;if(Telligent_Modal.WindowMaskCssClasses.length>0)
{mm.className=Telligent_Modal.WindowMaskCssClasses[0];for(var i=1;i<Telligent_Modal.WindowMaskCssClasses.length;i++)
{mm.appendChild(document.createElement('div'));mm=mm.childNodes[0];mm.className=Telligent_Modal.WindowMaskCssClasses[i];mm.style.width='auto';mm.style.height='auto';}}
document.body.appendChild(this._modalMask);this._modalAnimationMask=document.createElement('div');this._modalAnimationMask.style.position='absolute';this._modalAnimationMask.style.display='none';this._modalAnimationMask.style.overflow='hidden';this._modal=document.createElement('div');this._modal.style.width='auto';this._modal.style.height='auto';this._modal.style.position='absolute';this._modal.style.display='none';var m=this._modal;if(Telligent_Modal.WindowCssClasses.length>0)
{m.className=Telligent_Modal.WindowCssClasses[0];for(var i=1;i<Telligent_Modal.WindowCssClasses.length;i++)
{m.appendChild(document.createElement('div'));m=m.childNodes[0];m.className=Telligent_Modal.WindowCssClasses[i];m.style.width='auto';m.style.height='auto';}}
this._modalTitle=document.createElement('div');m.appendChild(this._modalTitle);if(Telligent_Modal.WindowTitleCssClasses.length>0)
{this._modalTitle.className=Telligent_Modal.WindowTitleCssClasses[0];for(var i=1;i<Telligent_Modal.WindowTitleCssClasses.length;i++)
{this._modalTitle.appendChild(document.createElement('div'));this._modalTitle=this._modalTitle.childNodes[0];this._modalTitle.className=Telligent_Modal.WindowTitleCssClasses[i];}}
this._modalTitle.onmousedown=new Function('event','window.'+this._variableName+'._startDrag(event); return false;');this._modalClose=document.createElement('div');this._modalTitle.appendChild(this._modalClose);var mc=this._modalClose;if(Telligent_Modal.WindowCloseCssClasses.length>0)
{mc.className=Telligent_Modal.WindowCloseCssClasses[0];for(var i=1;i<Telligent_Modal.WindowCloseCssClasses.length;i++)
{mc.appendChild(document.createElement('div'));mc=mc.childNodes[0];mc.className=Telligent_Modal.WindowCloseCssClasses[i];}}
this._modalClose.onclick=new Function('window.'+this._variableName+'.Close(); return false;');this._modalTitle.appendChild(document.createElement('span'));var e=document.createElement('div');e.style.clear='both';this._modalTitle.appendChild(e);this._modalContent=document.createElement('div');m.appendChild(this._modalContent);if(Telligent_Modal.WindowContentCssClasses.length>0)
{this._modalContent.className=Telligent_Modal.WindowContentCssClasses[0];for(var i=1;i<Telligent_Modal.WindowContentCssClasses.length;i++)
{this._modalContent.appendChild(document.createElement('div'));this._modalContent=this._modalContent.childNodes[0];this._modalContent.className=Telligent_Modal.WindowContentCssClasses[i];}}
this._modalIframe=document.createElement('iframe');this._modalIframe.src=Telligent_Modal.LoadingHtmlUrl;this._modalIframe.width='100%';this._modalIframe.border='0';this._modalIframe.frameBorder='0';this._modalIframe.style.borderLeftWidth='0px';this._modalIframe.style.borderRightWidth='0px';this._modalIframe.style.borderTopWidth='0px';this._modalIframe.style.borderBottomWidth='0px';this._modalContent.appendChild(this._modalIframe);this._modalFooter=document.createElement('div');m.appendChild(this._modalFooter);var mf=this._modalFooter;if(Telligent_Modal.WindowFooterCssClasses.length>0)
{mf.className=Telligent_Modal.WindowFooterCssClasses[0];for(var i=1;i<Telligent_Modal.WindowFooterCssClasses.length;i++)
{mf.appendChild(document.createElement('div'));mf=mf.childNodes[0];mf.className=Telligent_Modal.WindowFooterCssClasses[i];}}
this._modalResize=document.createElement('div');mf.appendChild(this._modalResize);var e=document.createElement('div');e.style.clear='both';mf.appendChild(e);var mr=this._modalResize;if(Telligent_Modal.WindowResizeCssClasses.length>0)
{mr.className=Telligent_Modal.WindowResizeCssClasses[0];for(var i=1;i<Telligent_Modal.WindowResizeCssClasses.length;i++)
{mr.appendChild(document.createElement('div'));mr=mr.childNodes[0];mr.className=Telligent_Modal.WindowResizeCssClasses[i];}}
this._modalResize.onmousedown=new Function('event','window.'+this._variableName+'._startResize(event); return false;');this._modalAnimationMask.appendChild(this._modal);document.body.appendChild(this._modalAnimationMask);this._initialized=true;}
Telligent_Modal_Window.prototype.IsShown=function()
{return this._isShown;}
Telligent_Modal_Window.prototype.Resize=function(width,height,preventAutomaticResizing)
{if(this._isShown&&!this._isOpening&&this._lastModalInfo)
this.Open(null,width,height,this._lastModalInfo.OnCloseFunction,this._lastModalInfo.X,this._lastModalInfo.Y,true,preventAutomaticResizing?true:this._lastModalInfo.IsManuallyResized);}
Telligent_Modal_Window.prototype.MoveTo=function(x,y)
{if(this._isShown&&!this._isOpening&&this._lastModalInfo)
this.Open(null,this._lastModalInfo.Width,this._lastModalInfo.Height,this._lastModalInfo.OnCloseFunction,x,y,true,this._lastModalInfo.IsManuallyResized);}
Telligent_Modal_Window.prototype.Open=function(url,width,height,onCloseFunction,x,y,ignoreCloseAndAnimation,isManuallyResized,openerWindow)
{if(openerWindow)
this._openerWindow=openerWindow;if(!ignoreCloseAndAnimation&&this._isShown)
this.Close();else
Telligent_Common.ShowSelectBoxes(this._modalAnimationMask)
if(!this._initialized)
this._initialize();try
{if(document.all)
this._modalTitle.childNodes[1].innerText=this._modalIframe.contentWindow.document.title;else
this._modalTitle.childNodes[1].textContent=this._modalIframe.contentWindow.document.title;}
catch(err)
{}
if(!ignoreCloseAndAnimation)
this._modalIframe.src=url;try
{this._modalIframe.contentWindow.opener=window;}
catch(err)
{}
this._modalAnimationMask.style.display='none';this._modalMask.style.display='none';this._lastWindowInfo=Telligent_Common.GetWindowInfo();this._modalAnimationMask.style.display='block';this._modalAnimationMask.style.position='absolute';this._modalAnimationMask.style.zIndex=Telligent_Modal.ZIndex;this._modalAnimationMask.style.display='block';this._modalAnimationMask.style.visibility='hidden';this._modalAnimationMask.style.overflow='hidden';this._modal.style.position='absolute';this._modal.style.display='block';this._modal.style.visibility='hidden';this._modal.style.left='0px';this._modal.style.top='0px';this._modalMask.style.position='absolute';this._modalMask.style.display='block';this._modalMask.style.zIndex=Telligent_Modal.ZIndex;this._modalMask.style.visibility='visible';var modalContentOffset=Telligent_Common.GetStyleOffset(this._modalContent);var widthOffset=(this._modal.offsetWidth-this._modalContent.offsetWidth)-modalContentOffset.Width;var heightOffset=(this._modal.offsetHeight-this._modalContent.offsetHeight)-modalContentOffset.Height;if(width+widthOffset>this._lastWindowInfo.Width)
width=this._lastWindowInfo.Width-widthOffset;this._modalAnimationMask.style.width=width+'px';this._modalContent.style.width=width+'px';if(height+heightOffset>this._lastWindowInfo.Height)
height=this._lastWindowInfo.Height-heightOffset;if(width<this._modalResize.offsetWidth*2)
width=this._modalResize.offsetWidth*2;if(width<this._modalClose.offsetWidth*2)
width=this._modalClose.offsetWidth*2;if(height<this._modalTitle.offsetHeight+this._modalFooter.offsetHeight)
height=this._modalTitle.offsetHeight+this._modalFooter.offsetHeight-heightOffset;this._modalIframe.style.height=height+'px';this._modalIframe.style.width=width+'px';this._modalContent.style.height=height+'px';this._modalContent.style.width=width+'px';this._modalAnimationMask.style.width=this._modal.offsetWidth+'px';this._modalAnimationMask.style.height=this._modal.offsetHeight+'px';this._modalMask.style.left='0px';this._modalMask.style.top='0px';this._modalMask.style.width=this._lastWindowInfo.ContentWidth+'px';this._modalMask.style.height=this._lastWindowInfo.ContentHeight+'px';this._lastWindowInfo=Telligent_Common.GetWindowInfo();var panelWidth=this._modal.offsetWidth;var panelHeight=this._modal.offsetHeight;var animatePropertyName,animateTargetValue,animateNextValue;if(typeof(x)=='undefined'||isNaN(parseInt(x,10)))
x=((this._lastWindowInfo.Width-panelWidth)/2)+this._lastWindowInfo.ScrollX;if(x+panelWidth>this._lastWindowInfo.Width+this._lastWindowInfo.ScrollX)
x=this._lastWindowInfo.Width+this._lastWindowInfo.ScrollX-panelWidth;if(x<this._lastWindowInfo.ScrollX)
x=this._lastWindowInfo.ScrollX;if(typeof(y)=='undefined'||isNaN(parseInt(y,10)))
y=((this._lastWindowInfo.Height-panelHeight)/2)+this._lastWindowInfo.ScrollY;if(y+panelHeight>this._lastWindowInfo.Height+this._lastWindowInfo.ScrollY)
y=this._lastWindowInfo.Height+this._lastWindowInfo.ScrollY-panelHeight;if(y<this._lastWindowInfo.ScrollY)
y=this._lastWindowInfo.ScrollY;this._modalAnimationMask.style.left=x+'px';this._modalAnimationMask.style.top=y+'px';animateTargetValue=0;animateNextValue=-panelHeight;this._modal.style.visibility='visible';this._modalAnimationMask.style.visibility='visible';this._modalAnimationMask.style.overflow='hidden';Telligent_Common.HideSelectBoxes(this._modalAnimationMask,true);this._modalIframe.style.visibility='visible';this._isOpening=true;if(!this.EnableAnimation||ignoreCloseAndAnimation)
this._animationHandle=window.setTimeout(new Function(this._variableName+'._animate(0,0,0,0);'),9);else
{this._modalIframe.style.display='none';this._animate(0,-panelHeight,panelHeight/3,.67);}
this._lastModalInfo={Url:this._modalIframe.src,OnCloseFunction:onCloseFunction,X:x,Y:y,Width:parseInt(width,10),Height:parseInt(height,10),IsManuallyResized:isManuallyResized};this._isShown=true;}
Telligent_Modal_Window.prototype.Close=function(returnValue)
{if(this._isShown)
{if(!this._initialized)
this._initialize();this._modal.style.position='absolute';this._modal.style.display='none';this._modalAnimationMask.style.position='absolute';this._modalAnimationMask.style.display='none';this._modalMask.style.position='absolute';this._modalMask.style.display='none';this._modalIframe.src=Telligent_Modal.LoadingHtmlUrl;var onCloseFunction=this._lastModalInfo.OnCloseFunction;this._isShown=false;this._lastModalInfo=null;this._windowInfo=null;Telligent_Common.ShowSelectBoxes(this._modalAnimationMask)
if(onCloseFunction)
onCloseFunction(returnValue);this.Dispose();}}
Telligent_Modal_Window.prototype.Refresh=function()
{if(this._animationHandle)
window.clearTimeout(this._animationHandle);this.Dispose();if(this._isShown&&this._lastModalInfo)
this.Resize(this._lastModalInfo.Width,this._lastModalInfo.Height,false);}
Telligent_Modal_Window.prototype.Dispose=function()
{if(this._initialized)
{if(this._animationHandle)
window.clearTimeout(this._animationHandle);this._isShown=false;this._isOpening=false;if(document&&document.body)
{document.body.removeChild(this._modalAnimationMask);document.body.removeChild(this._modalMask);this._modalClose.onclick=null;this._modalTitle.onmousedown=null;this._modalResize.onmousedown=null;this._modal=null;this._modalTitle=null;this._modalClose=null;this._modalAnimationMask=null;this._modalMask=null;this._modalIframe=null;this._modalResize=null;this._modalFooter=null;this._modalContent=null;}
this._initialized=false;}};