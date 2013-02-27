//<!--
//1@@m6

function EbayHTMLButton(pParent,pElemName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLButton";this.base=EbayHTMLFormElem;this.base(pParent,pElemName,pDisabled,pCfg);this.getValue=ebHTMLButtonGetValue;this.setValue=ebHTMLButtonSetValue;this.enableBase=this.enable
this.enable=ebHTMLButtonEnable;this.subscribeEvents("onclick");}
function ebHTMLButtonGetValue()
{return this.eElem.value;}
function ebHTMLButtonSetValue(pValue)
{var e=this.eElem;if(e)
e.value=pValue;}
function ebHTMLButtonEnable(pEnable,pYukonize)
{if(typeof(pYukonize)!=='undefined'&&pYukonize)
{var e=this.eElem;e.style.opacity=!pEnable?".5":"";e.style.filter=!pEnable?"alpha(opacity=50)":"";this.bBtnDisabled=!pEnable;}
else
this.enableBase(pEnable);}

//2@@m6

function EbayHTMLLayer(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLLayer";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.aBindEvents=new Array;this.getElem=ebHTMLLayerGetElem;this.getValue=ebHTMLLayerGetValue;this.setValue=ebHTMLLayerSetValue;}
function ebHTMLLayerGetElem(pName)
{var s=pName,d=this.oDocument.doc;if(d.getElementById)
return d.getElementById(s);else if(d.all)
return d.all(s);this.throwWarning("Not supported","getElem");}
function ebHTMLLayerGetValue(pIsText)
{if(this.eElem)
{if(pIsText)
{if(this.oDocument.oGlobals.oClient.bFirefox)
return this.eElem.textContent;else
return this.eElem.innerText;}
else
return this.eElem.innerHTML;}
else
return"";}
function ebHTMLLayerSetValue(pVal,pIsText)
{if(this.eElem)
{if(pIsText)
{if(this.oDocument.oGlobals.oClient.bFirefox)
this.eElem.textContent=pVal;else
this.eElem.innerText=pVal;}
else
this.eElem.innerHTML=pVal;}}

//3@@m11

function EbayHTMLText(pParent,pName,pDisabled,pCfg,bHidden)
{if(!this.objType)
this.objType="EbayHTMLText";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.value=ebHTMLTextValue;this.getValue=ebHTMLTextGetValue;this.setValue=ebHTMLTextSetValue;this.select=ebHTMLTextSelect;this.enableBase=this.enable;this.enable=ebHTMLTextEnable;if(bHidden!=true)
this.subscribeEvents("onchange","onblur","onfocus","onkeydown","onkeyup");}
function ebHTMLTextValue(pVal)
{var e=this.eElem;if(e)
{if(typeof(pVal)=="undefined")
return e.value;else
e.value=pVal;}}
function ebHTMLTextGetValue()
{return this.value();}
function ebHTMLTextSetValue(pVal)
{return this.value(pVal);}
function ebHTMLTextSelect()
{var e=this.eElem;if(e)
e.select();}
function ebHTMLTextEnable(pEnable)
{this.enableBase(pEnable);this.setStyle('backgroundColor',!pEnable?'#ccc':'#fff');}

//4@@m16

function EbayHTMLBaseCheckboxRadio(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLBaseCheckboxRadio";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.bGroup=false;this.bindHTML=ebHTMLBaseCheckboxRadioBindHTML;this.bindEvents=ebHTMLBaseCheckboxRadioBindEvents;this.check=ebHTMLBaseCheckboxRadioCheck;this.selectByIndex=ebHTMLBaseCheckboxRadioSelectByIndex;this.selectByValue=ebHTMLBaseCheckboxRadioSelectByValue;this.isCheckedByValue=ebHTMLBaseCheckboxRadioIsCheckedByValue;this.getValueByIndex=ebHTMLBaseCheckboxRadioGetValueByIndex;this.getIndexByValue=ebHTMLBaseCheckboxRadioGetIndexByValue;this.getValue=null;this.enableBase=this.enable;this.enable=ebHTMLBaseCheckboxRadioEnable;this.setValue=this.selectByValue;this.onBeforeCheck=null;this.onAfterCheck=null;this.subscribeEvents("onclick");}
function ebHTMLBaseCheckboxRadioBindHTML()
{with(this)
{eElem=getElem(sElemName);if(eElem)
{if(eElem.length)
{bGroup=true;var len=eElem.length;for(var i=0;i<len;i++)
assignJSObject(eElem[i]);cleanupMemory=ebHTMLBaseCheckboxRadioCleanupMemory;}
else
{bGroup=false;assignJSObject(eElem);}}
if(bDisabled)
enable(false);}}
function ebHTMLBaseCheckboxRadioCleanupMemory()
{var e=this.eElem;if(e)
{var len=e.length;for(var j=0;j<len;j++)
{for(var i in e[j].jsObjs)
{e[j].jsObjs[i]=null;}
e[j].jsObjs=null;}
this.eElem=null;}}
function ebHTMLBaseCheckboxRadioBindEvents()
{with(this)
{if(!eElem)
return;var e=aBindEvents,len=e.length,fStr;for(var i in e)
{var len2=eElem.length;if(len2&&len2>0)
{for(var ii=0;ii<len2;ii++)
eval("eElem[ii]."+e[i]+" = function(){"+this.bindEventString(e[i],ii)+"}");}
else
{eval("eElem."+e[i]+" = new Function(this.bindEventString(e[i],0))");}}}}
function ebHTMLBaseCheckboxRadioCheck(pChecked,pIndex)
{if(pIndex<0)
return;with(this)
{if(eElem)
{if(bGroup&&typeof(pIndex)=='undefined')
{var len=eElem.length;for(var i=0;i<len;i++)
eElem[i].checked=pChecked;}
else if(bGroup&&eElem[pIndex])
eElem[pIndex].checked=pChecked;else if(!bGroup)
eElem.checked=pChecked;}}}
function ebHTMLBaseCheckboxRadioSelectByIndex(pIdx,pCheck)
{var chx=typeof pCheck!='undefined'?pCheck:true;with(this)
{if(onBeforeCheck)
onBeforeCheck();var e=bGroup?eElem[pIdx]:eElem;if(e)
{e.checked=chx;if(onAfterCheck)
onAfterCheck();}}}
function ebHTMLBaseCheckboxRadioSelectByValue(pVal,pCheck)
{var chx=typeof pCheck!='undefined'?pCheck:true;with(this)
{if(onBeforeCheck)
onBeforeCheck();var e=eElem;if(!e)
return;if(bGroup)
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].value==pVal)
{e[i].checked=chx;if(onAfterCheck)
onAfterCheck();}}}
else
{if(e.value==pVal)
{e.checked=chx;if(onAfterCheck)
onAfterCheck();}}}}
function ebHTMLBaseCheckboxRadioIsCheckedByValue(pValue)
{with(this)
{var e=eElem;if(e&&bGroup)
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].value==pValue)
return isChecked(i);}}}}
function ebHTMLBaseCheckboxRadioGetValueByIndex(pIndex)
{with(this)
{var e=eElem;if(e&&bGroup)
return e[pIndex].value;return null;}}
function ebHTMLBaseCheckboxRadioGetIndexByValue(pValue)
{with(this)
{var e=eElem;if(e&&bGroup)
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].value==pValue)
return i;}}
return-1;}}
function ebHTMLBaseCheckboxRadioEnable(pEnable)
{with(this)
{enableBase(pEnable);if(bGroup)
{var v=pEnable?"true":"false",e=eElem,len=e.length;if(e)
{for(var i=0;i<len;i++)
{e[i].onfocus=new Function("return "+v+";");e[i].disabled=!pEnable;}}}}}

//5@@m8

function EbayHTMLRadio(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLRadio";this.base=EbayHTMLBaseCheckboxRadio;this.base(pParent,pName,pDisabled,pCfg);this.getElem=ebHTMLRadioGetElem;this.getValue=ebHTMLRadioGetValue;this.getSelectedIndex=ebHTMLRadioGetSelectedIndex;}
function ebHTMLRadioGetElem(pName)
{return this.oDocument.getFormElem(pName,"radio");}
function ebHTMLRadioGetValue()
{var e=this.eElem;if(!e){return"";}
if(this.bGroup)
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].checked)
return e[i].value;}}
else
{if(e.checked)
return e.value;}
return"";}
function ebHTMLRadioGetSelectedIndex()
{var e=this.eElem;if(!this.bGroup)
return 0;else
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].checked)
return i;}}
return-1;}

//6@@m10

ebay.oDocument.oPage.onBeforeLoad=function()
{var cfg=this.parent.getConfig("feedbackConfig");this.oFormLayer=new EbayHTMLLayer(this,cfg.sFormLayerID);this.oTrueFormLayer=new EbayHTMLLayer(this,cfg.sTrueFormLayerID);this.oFalseFormLayer=new EbayHTMLLayer(this,cfg.sFalseFormLayerID);var sRefUrlID=(typeof(cfg.sReferringUrlID)!="undefined")?cfg.sReferringUrlID:"referring_url";this.oReferringUrl=new EbayHTMLText(this,sRefUrlID,false,cfg,true);var txtURL=new EbayHTMLText(this,cfg.sHiddenURLID);var r=new EbayHTMLRadio(this,cfg.sRadioID,false);var btn=new EbayHTMLButton(this,cfg.sButtonID,true);var txt=new EbayHTMLText(this,cfg.sTextAreaID,true);txt.subscribeEvents("onclick");var evt=r._registerEvent("onclick","onRadioClick");var evtText=txt._registerEvent("onkeyup","onTextChanged");var evtTextClicked=txt._registerEvent("onblur","onTextChanged");var evtTextClicked=txt._registerEvent("onclick","onTextClicked");var evtTextFocused=txt._registerEvent("onfocus","onTextFocus");var feedbackCharLyr=new EbayHTMLLayer(this,cfg.sFeedBackMessageID);var txtAreaDefault=new EbayHTMLText(this,cfg.sTextAreaDefaultID,true);var defaultlength=cfg.iCharacterLimit;r.onRadioClick=function(){btn.disabled=!btn.disabled;txt.disabled=!txt.disabled;if(txt.disabled){txt.enable(txt.disabled);btn.enable(btn.disabled);var ids=cfg.aCls;if(ids){for(var i in ids){var oId=new EbayHTMLLayer(this,i);oId.bind();oId.setClass(ids[i]);}}}
return true;}
txt.onTextChanged=function(){var len=this.getValue().length,cLim=cfg.iCharacterLimit;if(len>cLim)
{feedbackCharLyr.setValue(cfg.sDefaultMessage);this.setValue(this.getValue().substr(0,cLim));}
else if(!cfg.sLocale.isAny("zh-TW","zh-CN")){var updatedMessage=feedbackCharLyr.getValue().replace(defaultlength,(cLim-len));defaultlength=cLim-len;feedbackCharLyr.setValue(updatedMessage);}
return true;}
txt.onTextClicked=function(){var txt_defaultvalue=txtAreaDefault.getValue();if(txt.getValue()==txt_defaultvalue)
{txt.setValue("");}
return true;}
txt.onTextFocus=function(){var txt_defaultvalue=txtAreaDefault.getValue();if(txt.getValue()==txt_defaultvalue)
{txt.setValue("");}
return true;}}
ebay.oDocument.oPage.onAfterLoad=function()
{var oDoc=this.oDocument;if(oDoc.getQueryValue("fb")=="true")
this.oTrueFormLayer.show(true);else if(oDoc.getQueryValue("fb")=="false")
this.oFalseFormLayer.show(true);else
this.oFormLayer.show(true);if(this.oReferringUrl)
{this.oReferringUrl.setValue(oDoc.doc.referrer);}
var d=oDoc.doc,aAnchs=d.links,sPagePath=d.location.href,len=aAnchs.length;history.iAnchClickCounts=0;for(var i=0;i<len;i++)
{var oAnch=aAnchs[i];if((!oAnch.onclick)&&!oAnch.pathname.is("")&&sPagePath.has(oAnch.pathname))
oAnch.onclick=function()
{history.iAnchClickCounts=history.iAnchClickCounts-1;return true;}}}
// b=15810772 -->