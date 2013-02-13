//<!--
//1@@m11

function EbayHTMLAnchor(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLAnchor";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.getElem=ebHTMLAnchorGetElem;this.enableBase=this.enable;this.enable=ebHTMLAnchorEnable;this.subscribeEvents("onclick");}
function ebHTMLAnchorGetElem(pName)
{var d=this.oDocument.doc,l=null,len=null;l=d.links[pName];if(l)return l;if(d.getElementById)
l=d.getElementById(pName);if(l)return l;if(d.all)
l=d.all[pName];if(l)return l;if(d.layers)
{var lyrs=d.layers;len=lyrs.length;for(var i=0;i<len;i++)
{l=this.getElem(lyrs[i].document,pName);if(l)
return l;}}
len=d.links.length;for(var j=0;j<len;j++)
{l=d.links[j];if(typeof(l.name)=="undefined")
{if(l.onclick)
{var oc=l.onclick.toString();if(oc.indexOf("{#"+pName+"#}")!=-1)
return l;}}
else
{if(l.name==pName)
return l;}
l=null;}
return l;}
function ebHTMLAnchorEnable(pEnable)
{var cur=(pEnable)?"hand":"default";var el=this.eElem;if(el&&el.style)
{el.style.cursor=cur;el.style.color=pEnable?"":"gray";}
this.enableBase(pEnable);}
function setEbayLink(pS)
{return true;}

//2@@m3

ebay.oDocument.oPage.initShowHide=function()
{var oC=this.parent.getConfig('showHideConfig');if(oC)
{with(this)
{var aDivs=oC.aDivs;this.oCustomControls=[];this.sShowText=oC.sShowText;this.sHideText=oC.sHideText;this.oLeastNodes=[];this.sExceptionDiv=oC.aExceptionalDiv;this.sEnableClass=oC.sEnableClass;this.sDisableClass=oC.sDisableClass;for(var i=0;i<aDivs.length;i++)
oCustomControls[i]=new EbayCustomControl(this,i,aDivs[i][0],aDivs[i][1],aDivs[i][2]);if(oC.aLeastNodes)
{this.sMouseOverClr=oC.sMouseOverClr;this.sMouseOutClr=oC.sMouseOutClr;for(var i=0;i<oC.aLeastNodes.length;i++)
{this.oLeastNodes[i]=new EbayHTMLLayer(this,oC.aLeastNodes[i]);this.oLeastNodes[i].bind();this.oLeastNodes[i].subscribeEvents("onmouseover");this.oLeastNodes[i].subscribeEvents("onmouseout");this.oLeastNodes[i].onmouseover=function()
{this.eElem.style.backgroundColor=this.parent.sMouseOverClr;}
this.oLeastNodes[i].onmouseout=function()
{this.eElem.style.backgroundColor=this.parent.sMouseOutClr;}}}}}
function EbayCustomControl(pParent,pName,pTitleLyr,pSubTierLyr,pImglyr)
{if(!this.objType)
this.objType="EbayCustomControl";this.base=EbayBaseControl;this.base(pParent,pName);this.oTitleDiv=new EbayHTMLLayer(this,pTitleLyr);this.oSubTierDiv=new EbayHTMLLayer(this,pSubTierLyr);this.oImgDiv=new EbayHTMLLayer(this,pImglyr);this.oTitleDiv.bind();this.oSubTierDiv.bind();this.oImgDiv.bind();var p=this.parent;if(p.sExceptionDiv!=this.oSubTierDiv.name)
{this.oSubTierDiv.show(false);this.oTitleDiv.setClass(p.sDisableClass);this.oImgDiv.eElem.src=p.sHideText;}
else
{this.oTitleDiv.setClass(p.sEnableClass);this.oImgDiv.eElem.src=p.sShowText;}
this.oTitleDiv.subscribeEvents("onclick");this.oTitleDiv.onclick=function()
{var p=this.parent,pp=p.parent;if(p.oSubTierDiv.eElem.style.display=="none")
{p.oSubTierDiv.show(true);p.oImgDiv.eElem.src=pp.sShowText;this.setClass(pp.sEnableClass);}
else
{p.oSubTierDiv.show(false);p.oImgDiv.eElem.src=pp.sHideText;this.setClass(pp.sDisableClass);}}}}
ebay.oDocument.oPage.initMoreItems=function()
{var oC=this.parent.getConfig('showMoreItems');if(oC)
{this.oMoreItemControls=[];var aDivs=oC.aMoreItemsDiv;for(var i=0;i<aDivs.length;i++)
this.oMoreItemControls[i]=new EbayMoreItemsControl(this,i,aDivs[i][0],aDivs[i][1],aDivs[i][2]);}
function EbayMoreItemsControl(pParent,pName,pItemLyr,pMoreTxtLyr,pAnchor)
{if(!this.objType)
this.objType="EbayMoreItemsControl";this.base=EbayBaseControl;this.base(pParent,pName);this.oMoreItemsDiv=new EbayHTMLLayer(this,pItemLyr);this.oMoreLinkDiv=new EbayHTMLAnchor(this,pMoreTxtLyr);this.oAnchorID=new EbayHTMLAnchor(this,pAnchor);this.oMoreLinkDiv.bind();this.oMoreItemsDiv.bind();this.oAnchorID.bind();this.oMoreLinkDiv.show(true);this.oMoreItemsDiv.show(false);this.oAnchorID.onclick=function()
{this.parent.oMoreItemsDiv.show(true);this.parent.oMoreLinkDiv.show(false);}}}
ebay.oDocument.oPage.initHelpToggle=function()
{var c=this.parent.getConfig("HelpToggle");if(c)
new EbayHelpToggle(this,'HelpToggle',c);}
function EbayHelpToggle(pParent,pName,pCfg)
{if(!this.objType)
this.objType="HelpToggle";this.base=EbayBaseControl;this.base(pParent,pName);this.oLyr=[];this.c=pCfg;this.oCls=pCfg.aClsNames;this.init=function(){with(this){for(var k in c.aLyr){oLyr[k]=new EbayHTMLLayer(this,k);oLyr[k].bind();oLyr[k].oDiv=new EbayHTMLLayer(this,c.aLyr[k]);oLyr[k].oDiv.bind();oLyr[k].subscribeEvents('onclick','onmouseover','onmouseout');if(k!=c.sOpenDiv){oLyr[k].setClass(oCls["close"]);oLyr[k].oDiv.show(false);}
oLyr[k].onclick=function(){var cls=this.getClass(),t=this,p=t.parent,bOpn=cls.has(p.oCls["open"])?false:true,sClass=bOpn?p.oCls["open"]:p.oCls["close"];cls=p.oCls["mouseOver"]+" "+sClass;t.oDiv.show(bOpn);t.setClass(cls);}
oLyr[k].onmouseover=function(){var cls=this.getClass(),t=this,p=t.parent,sClass=cls.has(p.oCls["open"])?p.oCls["open"]:p.oCls["close"];cls=p.oCls["mouseOver"]+" "+sClass;t.setClass(cls);}
oLyr[k].onmouseout=function(){var cls=this.getClass(),t=this,p=t.parent,sClass=cls.has(p.oCls["open"])?p.oCls["open"]:p.oCls["close"];cls=p.oCls["mouseOut"]+" "+sClass;t.setClass(cls);}}}}
this.init();}
// b=15774211 -->