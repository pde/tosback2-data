//<!--
//1@@m8

function EBayClient()
{var agt=navigator.userAgent.toLowerCase();this.major=parseInt(navigator.appVersion);this.webTV=this.opera=this.nav=this.ie=this.safari=false;var vInd=0;if(agt.indexOf("webtv")!=-1)
{this.webTV=true;vInd=agt.indexOf("webtv/")+6;}
else if(agt.indexOf("safari")!=-1)
{this.safari=true;vInd=agt.lastIndexOf("safari")+7;}
else if(agt.indexOf("opera")!=-1)
{this.opera=true;vInd=agt.lastIndexOf("opera")+6;}
else if(agt.indexOf("firefox")!=-1)
{this.firefox=true;vInd=agt.indexOf("firefox")+7;}
else if(navigator.appName.toLowerCase()=="netscape")
{this.nav=true;vInd=agt.lastIndexOf("/")+1;var tmp=parseInt(agt.substring(vInd));if(isNaN(tmp))
vInd=agt.lastIndexOf("netscape")+9;}
else if(agt.indexOf("msie")!=-1)
{this.ie=true;vInd=agt.indexOf("msie")+4;}
this.version=parseInt(agt.substring(vInd));this.win=(agt.indexOf("win")!=-1);this.mac=(agt.indexOf("mac")!=-1);this.macppc=(this.mac&&((agt.indexOf("ppc")!=-1)||(agt.indexOf("powerpc")!=-1)));this.isAXLoaded=EbayDetectActX;this.isAXSupported=EbaySupportActX;this.msnTv=(agt.indexOf("msntv")!=-1);this.xpSp2=(agt.indexOf("sv1")!=-1&&!this.msnTv);this.xp=(this.win&&agt.indexOf("windows nt 5.1")!=-1&&!this.msnTv);}
if(typeof(client)=="undefined")
var client=new EBayClient();if(typeof(is)=="undefined")
var is=new EBayClient();function EbaySupportActX()
{return this.isAXLoaded("Scripting.Dictionary");}
function EbayDetectActX(pActXName)
{if(!client.ie)
return false;var h='<scr'+'ipt language="JavaScript" type="text/JavaScript">';h+='var aX;';h+='</scr'+'ipt>';document.writeln(h+'<scr'+'ipt language="vbscript" type="text/vbscript">');document.writeln('on error resume next');document.writeln('aX = IsObject(CreateObject("'+pActXName+'"))');document.writeln('</scr'+'ipt>');if(typeof(aX)=="undefined"||!aX)
return false;else
return true;}

//2@@m30

function EbayDocument(pWin,pName)
{this.htmlWin=pWin||null;this.htmlDoc=pWin?pWin.document:null;this.name=pName||null;this.status=null;this.controls=new Array;this.events=new Array;this.bindHTML=EbayDocumentBindHTML;this.bindEvents=EbayDocumentBindEvents;this.addControl=EbayAddControl;this.getFormElem=EbayGetFormElem;this.onLoad=EbayDocumentOnLoad;this.onUnload=EbayDocumentOnUnLoad;}
window.EbayDocument=EbayDocument;function EbayGetFormElem(pName,pType)
{if(!this.htmlDoc)
return null;var frms=this.htmlDoc.forms;var ln=frms.length;for(var i=0;i<ln;i++)
{var elems=frms[i].elements,len=elems.length;for(var j=0;j<len;j++)
{if(elems[j].name==pName)
{if(pType)
{if(elems[j].type==pType)
return elems[pName];}
else
return elems[j];}}}}
function EBayPreviewDocument(pWin,pName)
{this.baseObject=EbayDocument;this.baseObject(pWin,pName);this.isPreviewMode=true;this.skipElems=new Array;this.skipLinks=new Array;this.onLoad=EbayDisableDoc;}
function EbayDisableDoc()
{if(!this.isPreviewMode)
return;var doc=this.htmlDoc,len=doc.forms.length;for(var j=0;j<len;j++)
{var frms=doc.forms;var iElems=frms[j].elements.length;frms[j].onsubmit=EbayDisableOnSubmit;for(var i=0;i<iElems;i++)
{var elem=frms[j].elements[i];if(elem.id!="")
document.getElementById(elem.id);var skEs=this.skipElems;var skip=false,len2=skEs.length;if(len2>0)
{for(var k=0;k<len2;k++)
{if(elem.name==skEs[k])
{skip=true;break;}}}
if(!skip)
EbayDisableFormElement(elem);}}
var iLinks=doc.links.length;for(var i=0;i<iLinks;i++)
{var lnk=doc.links[i];var skLnks=this.skipLinks;var skip=false;if(lnk.href)
{var len3=skLnks.length;for(var k=0;k<len3;++k)
{if(lnk.href.indexOf(skLnks[k])!=-1)
{skip=true;break;}}}
if(!skip)
{lnk.href="#";lnk.onclick=EbayDisableLink;}}}
function EbayDisableLink()
{return false;}
function EbayDisableFormElement(pElem)
{if(pElem.type)
{switch(pElem.type.toLowerCase())
{case"hidden":break;case"text":pElem.disabled=true;break;case"button","submit":pElem.onclick=null;break;default:pElem.onclick=null;break;}}}
function EbayDisableText()
{if(typeof(this.disabled)!="undefined")
this.htmlElement.disabled=this.disabled=true;}
function EbayEnableText()
{if(typeof(this.disabled)!="undefined")
this.htmlElement.disabled=this.disabled=false;}
function EbayDisableOnSubmit()
{return false;}
function EbayControl(pEbayDoc,pParent,pHTMLDoc,pElementName)
{this.htmlElement=null;this.htmlElementName=pElementName||null;this.name=pElementName||null;this.parent=pParent||null;this.ebayDoc=pEbayDoc||null;this.htmlDoc=pHTMLDoc||null;this.controls=new Array;this.listeners=new Array;this.bindHTML=null;this.bindEvents=null;this.registerListener=EbayControlRegisterListener;this.allowUpdateOnload=false;this.onBeforeLoad=null;this.onAfterLoad=null;this.onBeforeUnload=null;this.onAfterUnload=null;this.onUpdate=EbayControlOnUpdate;if(this.parent&&this.parent.addControl)this.parent.addControl(this);}
window.EbayControl=EbayControl;function EbayControlRegisterListener(pControl)
{this.listeners[this.listeners.length]=pControl;}
function EbayControlOnUpdate(pParent)
{var parent=pParent?pParent:this.ebayControl,len=parent.listeners.length;for(var i=0;i<len;i++)
{if(parent.listeners[i].onUpdate)parent.listeners[i].onUpdate(parent);}}
function EbayText(pebayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="ebayText";this.baseObject=EbayControl;this.baseObject(pebayDoc,pParent,pHTMLDoc,pElementName);this.disabled=false;this.bindHTML=EbayBindHTMLText;this.bindEvents=tbd;this.disable=EbayDisableText;this.enable=EbayEnableText;}
window.EbayText=EbayText;function EbayHyperLink(pEbayDoc,pParent,pHTMLDoc,pElementName,pLink)
{if(!this.objType)
this.objType="EbayHyperLink";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.link=pLink||null;this.mouseOverText="";this.urlPath=null;this.eventBound=false;this.bindHTML=EbayBindHTMLHyperLink;this.bindEvents=EbayBindEventsHyperLink;this.getLink=EbayGetLink;this.onClick=null;this.onMouseOver=tbd;this.onMouseOut=tbd;}
window.EbayHyperLink=EbayHyperLink;function EbayBindHTMLText()
{this.htmlElement=this.ebayDoc.getFormElem(this.htmlElementName,"text");if(this.htmlElement)
{this.htmlElement.ebayControl=this;if(this.disabled)
this.disable();else
this.enable();}}
function EbayMoveLayer(pLayer,x,y)
{if(document.getElementById)
{pLayer.style.left=x+'px';pLayer.style.top=y+'px';}
else if(document.all)
{pLayer.style.left=x;pLayer.style.top=y;}
else if(document.layers)
{pLayer.pageX=x;pLayer.pageY=y;}}
function EbayDocumentBindHTML()
{this.htmlDoc.ebayDoc=this;EbayBindAllControls(this,false);}
function EbayDocumentBindEvents()
{EbayBindAllControls(this,true);}
function EbayBindAllControls(pThis,pIsEvents)
{var cctrl,ctrls=pThis.controls,len=ctrls.length;for(var i=0;i<len;i++)
{cctrl=ctrls[i];if(pIsEvents)
{if(cctrl&&cctrl.bindEvents&&cctrl.objType!="EbayHyperLink")
cctrl.bindEvents();}
else
{if(cctrl&&cctrl.bindHTML)
cctrl.bindHTML();}}}
function EbayAddControl(pControl)
{var isSet=false;if(pControl.htmlElementName)
{var ctrls=this.controls,len=ctrls.length;for(var i=0;i<len;i++)
{if(ctrls[i].htmlElementName==pControl.htmlElementName)
{this.controls[i]=pControl;return;}}}
this.controls[this.controls.length]=pControl;}
function EbayDocumentOnLoad()
{this.bindHTML();this.bindEvents();}
function EbayDocumentOnUnLoad()
{}
function EbayBindHTMLHyperLink()
{this.htmlElement=this.getLink(this.htmlDoc,this.htmlElementName);if(this.htmlElement)
{this.link=this.htmlElement.href;this.htmlElement.ebayControl=this;}
this.bindEvents();}
function EbayGetLink(pDoc,pLinkName)
{var lnk=null;if(pDoc&&pLinkName&&!this.ebayDoc.htmlWin.closed)
{if(pDoc.all)
lnk=pDoc.all[pLinkName];if(lnk)return lnk;if(pDoc.getElementById)
lnk=pDoc.getElementById(pLinkName);if(lnk)return lnk;var len=pDoc.links.length;for(var j=0;j<len;j++)
{lnk=pDoc.links[j];if(typeof(lnk.name)!="undefined")
{if(lnk.name==pLinkName)
return lnk;}
else
{if(lnk.onclick)
{var oc=lnk.onclick.toString();if(oc.indexOf("{#"+pLinkName+"#}")!=-1)
return lnk;}}}
lnk=null;if(pDoc.layers)
{var lyrs=pDoc.layers;var len=lyrs.length;for(var i=0;i<len;i++)
{if(this.ebayDoc.htmlDoc==null)
return;else
{lnk=this.getLink(lyrs[i].document,pLinkName);if(lnk)
return lnk;}}}}
return lnk;}
function setEbayLink(pS)
{return true;}
function EbayBindEventsHyperLink()
{if(!this.htmlElement)
return;this.htmlElement.onclick=this.onClick;}
function EbayImage(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbayImage";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.image=pElementName||null;this.mouseOverText="";this.bindHTML=EbayBindHTMLImage;this.bindEvents=tbd;this.getImage=EbayGetImage;}
window.EbayImage=EbayImage;function EbayBindHTMLImage()
{this.htmlElement=this.getImage(this.htmlDoc,this.htmlElementName);if(this.htmlElement)
this.htmlElement.ebayControl=this;}
function EbayGetImage(pDoc,pImageName)
{var image=null;if(pDoc&&pImageName&&!this.ebayDoc.htmlWin.closed)
{var len=pDoc.images.length;for(var i=0;i<len;i++)
{if(!this.ebayDoc.htmlDoc)
return;else if(pDoc.images[i].name==pImageName)
return pDoc.images[i];}
if(pDoc.layers)
{var lyrs=pDoc.layers;var len=lyrs.length;for(var i=0;i<len;i++)
{if(this.ebayDoc.htmlDoc==null)
return;else
{image=this.getImage(lyrs[i].document,pImageName);if(image)
return image;}}}}
return image;}
function EbaySelect(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbaySelect";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.bindHTML=EbayBindHTMLSelect;this.bindEvents=EbayBindEventsSelect;this.clearOptions=EbaySelectClearOptions;this.getSelect=EbayGetSelect;this.onAfterLoad=null;this.onChange=tbd;}
window.EbaySelect=EbaySelect;function EbayBindHTMLSelect()
{this.htmlElement=this.getSelect(this.htmlDoc,this.htmlElementName);if(this.htmlElement)
this.htmlElement.ebayControl=this;if(this.allowUpdateOnload&&this.update)
this.update();}
function EbayBindEventsSelect()
{if(this.htmlElement)
{this.htmlElement.onchange=this.onChange;if(this.onAfterLoad)this.onAfterLoad();}}
function EbaySelectClearOptions()
{if(this.htmlElement)
{var len=this.htmlElement.options.length;for(var i=0;i<len;i++)
{this.htmlElement.options[0]=null;}}}
function EbayGetLayer(pDoc,pLayerName)
{var layer=null;if(pDoc&&pLayerName&&!this.ebayDoc.htmlWin.closed)
{if(pDoc.getElementById)
{layer=pDoc.getElementById(pLayerName);}
else if(pDoc.all)
{layer=pDoc.all[pLayerName];}
else if(pDoc.layers)
{var lyrs=pDoc.layers;var len=lyrs.length;layer=lyrs[pLayerName];if(!layer){for(var i=0;i<len;i++)
{if(lyrs[i].name==pLayerName||lyrs[i].id==pLayerName)
{layer=lyrs[i];}
else
{layer=this.getLayer(lyrs[i].document,pLayerName);}
if(layer)break;}}}}
return layer;}
function EbayGetSelect(pHtmlDoc,pName)
{if(!pHtmlDoc)
return null;var elem;var frms=pHtmlDoc.forms;var ln=frms.length;for(var i=0;i<ln;i++)
{var elems=frms[i].elements;elem=elems[pName];if(elem)
return elem;}
return null;}
function EbayGetRadio(pHtmlDoc,pName)
{if(!pHtmlDoc)
return null;var elem;var frms=pHtmlDoc.forms;var ln=frms.length;for(var i=0;i<ln;i++)
{var elems=frms[i].elements;elem=elems[pName];if(elem)
return elem;}
return null;}
function EbayRadio(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbayRadio";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.bindHTML=EbayBindHTMLRadio;this.bindEvents=EbayBindEventsRadio;this.getRadio=EbayGetRadio;this.onClick=null;this.onAfterLoad=null;}
window.EbayRadio=EbayRadio;function EbayBindHTMLRadio()
{this.htmlElement=this.getRadio(this.htmlDoc,this.htmlElementName);if(this.htmlElement)
{var len=this.htmlElement.length;if(len&&len>0)
{for(var i=0;i<len;i++)
{if(this.htmlElement[i])
this.htmlElement[i].ebayControl=this;}}
else
this.htmlElement.ebayControl=this;}}
function EbayBindEventsRadio()
{if(this.htmlElement&&this.onClick)
{var len=this.htmlElement.length;if(len&&len>0)
{for(var i=0;i<len;i++)
this.htmlElement[i].onclick=this.onClick;}
else
this.htmlElement.onclick=this.onClick;}
if(this.onAfterLoad)this.onAfterLoad();}
function EbayGetCheckBox(pHtmlDoc,pName)
{return this.ebayDoc.getFormElem(pName);}
function EbayCheckBox(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbayCheckBox";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.bindHTML=EbayBindHTMLCheckBox;this.bindEvents=EbayBindEventsCheckBox;this.getCheckBox=EbayGetCheckBox;this.onClick=null;this.onAfterLoad=null;}
window.EbayCheckBox=EbayCheckBox;function EbayBindHTMLCheckBox()
{this.htmlElement=this.getCheckBox(this.htmlDoc,this.htmlElementName);if(this.htmlElement)this.htmlElement.ebayControl=this;}
function EbayBindEventsCheckBox()
{if(this.onClick&&typeof(this.htmlElement)!='undefined')
this.htmlElement.onclick=this.onClick;if(this.onAfterLoad)this.onAfterLoad();}
function EbayGetInput(pHtmlDoc,pName)
{return this.ebayDoc.getFormElem(pName);}
function EbayInput(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbayInput";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.bindHTML=EbayBindHTMLInput;this.bindEvents=EbayBindEventsInput;this.getInput=EbayGetInput;this.onClick=null;this.onAfterLoad=null;}
window.EbayInput=EbayInput;function EbayBindHTMLInput()
{this.htmlElement=this.getInput(this.htmlDoc,this.htmlElementName);if(this.htmlElement)this.htmlElement.ebayControl=this;}
function EbayBindEventsInput()
{if(this.onClick)this.htmlElement.onclick=this.onClick;if(this.onAfterLoad)this.onAfterLoad();}
function EbayGetObject(pDoc,pObjName)
{return pDoc.getElementById(pObjName);}
function EBayConfig(pName)
{if(!this.objType)
this.objType="EBayConfig";this.name=pName;this.set=ebConfigSetVar;this.get=ebConfigGetString;this.copy=ebConfigObjectCopy;}
window.EBayConfig=EBayConfig;function ebConfigSetVar(pName,pVal)
{eval("this."+pName+" = '"+pVal+"';");}
function ebConfigGetString(pName,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10)
{var s=eval("this."+pName);var r="";if(!s)
return r;var len=s.length;for(var i=0;i<len;i++)
{if(s.substring(i,i+2)=="##")
{r+=new String(eval('p'+s.charAt(i+2)));i+=2;}
else
r+=s.charAt(i);}
return r;}
function ebConfigObjectCopy(pObj)
{if(pObj)
{for(var i in pObj)
{var prop=eval("pObj."+i),ti="this."+i;if(prop&&(typeof(eval("prop.copy"))=="function")&&prop.objType&&(i!="parent"))
{eval(ti+"=new "+prop.objType+"();");eval(ti).copy(prop);}
if(prop&&typeof prop=="function")continue;if(prop&&typeof prop=="object"&&prop.toString().indexOf("function")==0)continue;eval(ti+"=prop;");}}}
function EbayGetForm(pDoc,pFormName)
{if(!pDoc)
return null;var frms=pDoc.forms;var ln=frms.length;for(var i=0;i<ln;i++)
{if(frms[i].name==pFormName)
return frms[i];}}
function EbayLabel(pEbayDoc,pParent,pHTMLDoc,pElementName,pLabel,pCssClass,pCssInline)
{if(!this.objType)
this.objType="EbayLabel";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.label=pLabel;this.getLayer=EbayGetLayer;this.bindHTML=EbayLabelBindHTML;this.onUpdate=null;this.setLabel=EbaySetLabel;this.getLabel=EbayGetLabel;this.cssInline=pCssInline;this.cssClass=pCssClass;this.hide=EbayHideLabel;this.show=EbayShowLabel;this.moveLyr=EbayMoveLayer;this.moveTo=EbayLabelMoveTo;}
function EbayLabelBindHTML()
{if(this.ebayDoc.htmlDoc&&this.htmlElementName)
{this.htmlElement=this.getLayer(this.ebayDoc.htmlDoc,this.htmlElementName);this.htmlElement.ebayControl=this;if(document.layers)
{var lyr=this.htmlElement;var peer=null;if(!lyr.peerLayer)
{peer=lyr.peerLayer=new Layer(lyr.clip.width,lyr.parentLayer);peer.clip.height=lyr.clip.height;peer.moveTo(lyr.pageX,lyr.pageY);lyr.visibility='hide';peer.visibility='show';}}
if(this.label)
{this.setLabel(this.label);}}}
function EbaySetLabel(text)
{var str='<span ';if(this.cssClass)
{str+='class="'+this.cssClass+'" ';}
if(this.cssInline)
{str+='style="'+this.cssInline+'" ';}
str+='>'+text+'</span>';if(document.all||document.getElementById)
{this.htmlElement.innerHTML=str;}
else if(document.layers)
{with(this.htmlElement.peerLayer.document)
{open();write(str);close();}}
this.label=text;}
function EbayGetLabel()
{return this.label;}
function EbayHideLabel()
{if(document.getElementById||document.all)
{this.htmlElement.style.visibility='hidden';}
else if(document.layers)
{this.htmlElement.visibility='hide';this.setLabel('');}}
function EbayShowLabel()
{if(document.getElementById||document.all)
{this.htmlElement.style.visibility='visible';}
else if(document.layers)
{this.htmlElement.visibility='show';}}
function EbayLabelMoveTo(x,y)
{if(document.getElementById||document.all)
{this.moveLyr(this.htmlElement,x,y);}
else if(document.layers)
{this.moveLyr(this.htmlElement.peerLayer,x,y);}}
function tbd()
{}

//3@@m20

function EbayMinMax(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbayMinMax";this.baseObject=EbayControl;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.isMax=true;this.isSaveData=true;this.isWriteData=true;this.maxHTML=this.minHTML="";this.data=new Array;this.elems=new Array;this.init=false;this.bindHTML=EbayBindHTMLMinMax;this.bindEvents=EbayBindEventsMinMax;this.addControl=EbayAddControl;this.getLayer=EbayGetLayer;this.storeData=EbayMinMaxStoreData;this.restoreData=EbayMinMaxRestoreData;this.getHiddenData=EbayMinMaxGetHiddenData;this.addElement=EbayMinMaxAddElem;this.onBeforeMinimize=null;this.onBeforeMaximize=null;this.onAfterMinimize=null;this.onAfterMaximize=null;this.onChange=EbayMinMaxOnChange;this.minimize=EbayMinMaxMinimize;this.maximize=EbayMinMaxMaximize;}
window.EbayMinMax=EbayMinMax;function EbayBindHTMLMinMax()
{if(!this.init)
{this.htmlElement=this.getLayer(this.htmlDoc,this.htmlElementName);if(this.htmlElement)
{this.htmlElement.ebayControl=this;this.maxHTML=this.htmlElement.innerHTML;}
this.init=true;if(!this.isMax)
{this.isMax=true;this.onChange();}}
var cctrl,ctrls=this.controls,len=ctrls.length;for(var i=0;i<len;i++)
{cctrl=ctrls[i];if(cctrl&&cctrl.bindHTML)
{if(this.isMax||cctrl.objType=="EbayMinMaxLinkControl")
cctrl.bindHTML();if(cctrl.objType=="EbayMinMaxLinkControl"&&cctrl.htmlElement)
cctrl.updateState(this.isMax);}}}
function EbayBindEventsMinMax()
{var cctrl,ctrls=this.controls,len=ctrls.length;for(var i=0;i<len;i++)
{cctrl=ctrls[i];if(cctrl&&cctrl.bindEvents)
{if(this.isMax)
cctrl.bindEvents();if(cctrl.objType=="EbayMinMaxLinkControl"&&cctrl.htmlElement)
cctrl.htmlElement.onclick=EbayMinMaxLinkOnclick;}}}
function EbayMinMaxAddElem(pName,pDisplayTitle,pDisplayValue)
{if(pName&&pName.length>0)
this.elems[pName]=new EbayMinMaxPersistentElement(pName,pDisplayTitle,pDisplayValue);}
function EbayMinMaxOnChange()
{var mM=(this.ebayControl?(this.ebayControl.parent?this.ebayControl.parent:this):this),len;if(mM.isMax)
{mM.storeData(mM.htmlElement);if(mM.onBeforeMinimize)
mM.onBeforeMinimize();}
else
{if(mM.onBeforeMaximize)
mM.onBeforeMaximize();}
var mM_hElem=mM.htmlElement;if(mM.isMax)
{if(mM_hElem)
mM_hElem.innerHTML=mM.minHTML+mM.getHiddenData(mM.htmlElement);mM.isMax=false;var ctrls=mM.controls;len=ctrls.length;for(var i=0;i<len;i++)
{if(ctrls[i].objType=="EbayMinMaxLinkControl")
ctrls[i].bindHTML();else if(ctrls[i].objType=="EbayMinMax")
ctrls[i].init=false;else
ctrls[i].htmlElement=null;}}
else
{if(mM_hElem)
mM.htmlElement.innerHTML=mM.maxHTML;mM.restoreData();mM.isMax=true;mM.data=new Array;EbayBindAllControls(mM,false);EbayBindAllControls(mM,true);}
var cctrl;var ctrls=mM.controls;len=ctrls.length;for(var i=0;i<len;i++)
{cctrl=ctrls[i];if(cctrl.objType=="EbayMinMaxLinkControl"&&cctrl.htmlElement)
{cctrl.updateState(mM.isMax);cctrl.htmlElement.onclick=EbayMinMaxLinkOnclick;}}
if(mM.isMax)
{if(mM.onAfterMaximize)
mM.onAfterMaximize();}
else
{if(mM.onAfterMinimize)
mM.onAfterMinimize();}
return false;}
function EbayMinMaxLinkOnclick()
{var mM=null;if(this.ebayControl)
{var eC=this.ebayControl;mM=eC.parent;if(eC.onBeforeClick)
eC.onBeforeClick();mM.onChange();}
return false;}
function EbayMinMaxLinkControl(pEbayDoc,pParent,pHTMLDoc,pElementName)
{if(!this.objType)
this.objType="EbayMinMaxLinkControl";this.baseObject=EbayHyperLink;this.baseObject(pEbayDoc,pParent,pHTMLDoc,pElementName);this.minText,this.maxText="";this.bindHTML=EbayBindHTMLMinMaxLinkControl;this.bindEvents=EbayBindEventsMinMaxLinkControl;this.getLink=EbayGetLink;this.updateState=EbayMinMaxLinkControlUpdateState;this.onBeforeClick=null;}
window.EbayMinMaxLinkControl=EbayMinMaxLinkControl;function EbayBindHTMLMinMaxLinkControl()
{this.htmlElement=this.getLink(this.htmlDoc,this.htmlElementName);if(this.htmlElement)
{this.htmlElement.ebayControl=this;}}
function EbayBindEventsMinMaxLinkControl()
{}
function EbayMinMaxLinkControlUpdateState(pParentState)
{if(this.htmlElement)
this.htmlElement.innerHTML=(pParentState?this.maxText:this.minText);}
function EbayMinMaxDataObject(pName,pValue,pText,pPElem)
{this.name=pName;this.value=pValue||"";this.text=pText||"";this.persist=pPElem?true:false;this.htmlObject=null;this.elem=pPElem;}
function EbayMinMaxPersistentElement(pName,pDisplayTitle,pDisplayValue)
{this.name=pName;this.title=pDisplayTitle||"";this.group="";this.value=pDisplayValue||"";this.type="";}
function EbayMinMaxStoreData(pHTMLElem)
{if(pHTMLElem&&pHTMLElem.children)
{var node,len=pHTMLElem.children.length;for(var j=0;j<len;j++)
{node=pHTMLElem.children[j];if(node.children.length>0)
this.storeData(node);var nType=node.type;var nName=node.name;if(nType&&nName)
{var titleElem;var value="";var text="";nType=nType.toLowerCase();switch(nType)
{case"select-one":{if(!this.elems[nName]&&typeof(this.elems[nName])!="undefined")
{titleElem=this.htmlDoc.getElementById(nName+"_title");var title=titleElem?titleElem.innerText:null;this.elems[nName]=new EbayMinMaxPersistentElement(nName,title,node.options[node.selectedIndex].text);}
if(this.isSaveData)
{value=node.value;if(node.selectedIndex!=-1)
text=node.options[node.selectedIndex].text;}
this.data[nName]=new EbayMinMaxDataObject(nName,value,text,this.elems[nName]);break;}
case"text":case"textarea":{if(!this.elems[nName])
{titleElem=this.htmlDoc.getElementById(nName+"_title");var title=titleElem?titleElem.innerText:null;this.elems[nName]=new EbayMinMaxPersistentElement(nName,title,node.value);}
if(this.isSaveData)
{value=node.value;text=node.text;}
this.data[nName]=new EbayMinMaxDataObject(nName,value,text,this.elems[nName]);break;}
case"select-multiple":{var len2=node.options.length;for(var i=0;i<len2;i++)
{if(!this.elems[nName])
{titleElem=this.htmlDoc.getElementById(nName+"_title");var title=titleElem?titleElem.innerText:null;this.elems[nName]=new EbayMinMaxPersistentElement(nName,title);}
if(!this.data[nName])
this.data[nName]=new EbayMinMaxDataObject(nName,"","",this.elems[nName]);if(this.isSaveData)
{if(this.data[nName].value.length>0)
this.data[nName].value+=",,";if(this.data[nName].text.length>0)
this.data[nName].text+=",,";this.data[nName].value+=node.options[i].value;this.data[nName].text+=node.options[i].text;}}
break;}
case"checkbox":{if(!this.elems[nName])
{var parentElem=node.parentElement;var parentId="";var found=false;while(!found&&parentElem)
{parentId=parentElem.id;if(parentId&&parentId.lastIndexOf("_")==0)
{found=true;}
parentElem=parentElem.parentElement;}
var group=(parentId?parentId.substring(1):"");titleElem=this.htmlDoc.getElementById(group?group:nName+"_title");var title=titleElem?titleElem.innerText:null;var captionElem=this.htmlDoc.getElementById((group?group+"_":"")+nName+"_caption");var caption=captionElem?captionElem.innerText:null;this.elems[nName]=new EbayMinMaxPersistentElement(nName,title,caption);this.elems[nName].group=group;this.elems[nName].htmlObject=captionElem;}
var actualValue=node.value;var eText="";if(this.isSaveData)
{if(node.checked)
eText=(typeof(this.data[nName])=="undefined"||this.data[nName].text=="")?node.value:this.data[nName].text+";"+node.value;else
eText=(typeof(this.data[nName])=="undefined")?"":this.data[nName].text;}
if(this.isSaveData)
value=node.checked;this.data[nName]=new EbayMinMaxDataObject(nName,value,eText,this.elems[nName]);break;}
case"radio":{var rNodeName=nName+"_"+node.value;if(!this.elems[rNodeName])
{titleElem=this.htmlDoc.getElementById(nName+"_title");var title=titleElem?titleElem.innerText:null;var captionElem=this.htmlDoc.getElementById(nName+"_"+node.value+"_caption");var caption=captionElem?captionElem.innerText:null;this.elems[rNodeName]=new EbayMinMaxPersistentElement(nName,title,caption);this.elems[rNodeName].htmlObject=captionElem;}
if(this.isSaveData&&node.checked)
{value=node.value;if(!this.data[nName])
this.data[nName]=new EbayMinMaxDataObject(nName,value,"",this.elems[rNodeName]);}
break;}
case"hidden":{if(this.isSaveData)
{value=node.value;text=node.text;}
this.data[nName]=new EbayMinMaxDataObject(nName,value,text,this.elems[nName]);break;}}
if(this.data[nName])
this.data[nName].type=nType;}
else
{if(node.tagName=="IMG"&&nName)
{if(this.isSaveData)
{value=node.src;}
this.data[nName]=new EbayMinMaxDataObject(nName,value);this.data[nName].type="image";}}}}}
function EbayMinMaxRestoreData()
{var data=this.data
for(var dt in data)
{var eVal=data[dt].value;var nType=data[dt].type;var node=this.ebayDoc.getFormElem(dt,nType),len,len2;switch(nType)
{case"select-one":{var ops=node.options;if(ops)
{len=ops.length;for(var i=0;i<len;i++)
{if(ops[i].value.length>0)
{if(ops[i].value==data[dt].value)
{node.selectedIndex=i;break;}}
else
{if(ops[i].text&&ops[i].text==data[dt].text)
{node.selectedIndex=i;break;}}}}
break;}
case"textarea":case"text":{node.value=data[dt].value;break;}
case"select-multiple":{var values=data[dt].value.split(",,");len=node.options.length;for(var i=0;i<len;i++)
{len2=values.length;for(var k=0;k<len2;k++)
{if(node.options[i].value==values[k])
{node.options[i].selected=true;break;}
else
{node.options[i].selected=false;}}}
break;}
case"checkbox":{if(this.isSaveData)
{len=node.length;if(len)
{for(var j=0;j<len;j++)
node[j].checked=false;var values=data[dt].text.split(";");len2=values.length;for(var i=0;i<len2;i++)
{for(var j=0;j<len;j++)
{if(values[i]==node[j].value)node[j].checked=true;}}}
else
node.checked=data[dt].value;}
break;}
case"radio":{var cnt=node.length;var e;for(var i=0;i<cnt;i++)
{e=node[i];if(e.value==eVal)
e.checked=true;}
break;}
case"image":{node=this.htmlDoc.getElementById(dt);node.src=eVal;}}}}
function EbayMinMaxGetHiddenInput(pName,pValue)
{return"<input type=\"hidden\" name=\""+pName+"\" value=\""+pValue+"\">"}
function EbayMinMaxGetHiddenData()
{if(!this.isWriteData)
return"";var hidVals="",len;for(var dt in this.data)
{var nName=this.data[dt].name;var nValue=this.data[dt].value;var nType=this.data[dt].type;switch(nType)
{case"select-one":case"textarea":case"text":case"hidden":case"radio":{hidVals+=EbayMinMaxGetHiddenInput(nName,nValue);break;}
case"select-multiple":{var value="";len=dt.options.length;for(var i=0;i<len;i++)
{if(dt.options[i].selected)
{if(value.length>0)value+=",";value+=dt.options[i].value;}}
if(value!="")
hidVals+=EbayMinMaxGetHiddenInput(nName,nValue);break;}
case"checkbox":{var cbElem=this.ebayDoc.getFormElem(nName,nType);if(cbElem)
{if(typeof(cbElem.length)!='undefined'&&cbElem.length>1)
{len=cbElem.length;for(c=0;c<len;c++)
{if(cbElem[c].checked)
hidVals+=EbayMinMaxGetHiddenInput(nName,cbElem[c].value);}}else
hidVals+=EbayMinMaxGetHiddenInput(nName,(nValue?"on":nValue));break;}}}}
return hidVals;}
function EbayMinMaxMinimize()
{if(this.isMax)
{this.isMax=true;this.onChange();return true;}
return false;}
function EbayMinMaxMaximize()
{if(!this.isMax)
{this.isMax=false;this.onChange();return true;}
return false;}

//4@@m5

var ebayDoc;function helpFeeLoad()
{ebayDoc=new EbayDocument(window,"HelpFee");createHelpMinMaxes();ebayDoc.onLoad();_hfMinMaxes=new Array;document.onclick=saveMMState;}
if(typeof window.addEventListener!="undefined"){window.addEventListener("load",helpFeeLoad,false);}else if(typeof window.attachEvent!="undefined"){window.attachEvent("onload",helpFeeLoad);}
else{window.onload=helpFeeLoad;}
window.toolboxLoad=helpFeeLoad;function createHelpMinMaxes()
{var mM,mL;var sStates="";if(document.forms["InlineSelfHelpWebform"]&&document.forms["InlineSelfHelpWebform"].elements["feeState"])
sStates=document.forms["InlineSelfHelpWebform"].elements["feeState"].value;var aStates=new Array;if(sStates.length>0)
aStates=sStates.split(";");var aArgs=new Array,aArgStates=new Array,tmpArgs="";if(document.location.search.length>1)
{aArgs=document.location.search.split('?')[1].split('&');for(var m=0;m<aArgs.length;m++)
{if(aArgs[m].indexOf("feeState")==0)
{tmpArgs=aArgs[m].split('=')[1].replace(/:/g,"=");aArgStates=tmpArgs.split(';');break;}}}
for(var i=0;i<_hfMinMaxes.length;i++)
{mM=new EbayMinMax(ebayDoc,ebayDoc,document,_hfMinMaxes[i].layerName);mM.isSaveData=false;mM.isMax=false;for(var j=0;j<aStates.length;j++)
{if(aStates[j].toLowerCase()==mM.name.toLowerCase()+"=true")
{mM.isMax=true;break;}}
for(var k=0;k<aArgStates.length;k++)
{if(aArgStates[j].toLowerCase()==mM.name.toLowerCase()+"=true")
{mM.isMax=true;break;}}
mL=new EbayMinMaxLinkControl(ebayDoc,mM,document,_hfMinMaxes[i].linkName);mL.minText=_hfMinMaxes[i].showText;mL.maxText=_hfMinMaxes[i].hideText;}}
var _hfMinMaxes=new Array;function HelpFeeMinmax(pLayerName,pLinkName,pShowText,pHideText)
{this.layerName=pLayerName;this.linkName=pLinkName;this.showText=pShowText;this.hideText=pHideText;if(!document.layers)
_hfMinMaxes[_hfMinMaxes.length]=this;}
function saveMMState()
{var iCs=ebayDoc.controls;var st="";for(var i=0;i<iCs.length;i++)
{if(iCs[i].objType=='EbayMinMax')
st+=iCs[i].name+"="+iCs[i].isMax+";";}
if(document.forms["InlineSelfHelpWebform"]&&document.forms["InlineSelfHelpWebform"].elements["feeState"])
document.forms["InlineSelfHelpWebform"].elements["feeState"].value=st;}
// b=16083318 -->