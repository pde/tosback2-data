
adobe={version:"1.0",release:"dotcom",msgs:{TYPERR:"argument is not of type "},vrbls:{},vrbl:function(name,value){if(name===undefined){return adobe.vrbls;}
if(value===undefined){return adobe.vrbls[String(name)];}
return adobe.vrbls[String(name)]=value;}};adobe.dom={};adobe.fn={};adobe.http={};adobe.reflow={dispatchers:{},createDispatcher:function(name,documentElement){return(adobe.reflow.dispatchers[name]=new adobe.reflow.Dispatcher(documentElement||document));},getDispatcherByName:function(name){return adobe.reflow.dispatchers[name];}};adobe.ui={};
var swfobject=function(){var UNDEF="undefined",OBJECT="object",SHOCKWAVE_FLASH="Shockwave Flash",SHOCKWAVE_FLASH_AX="ShockwaveFlash.ShockwaveFlash",FLASH_MIME_TYPE="application/x-shockwave-flash",EXPRESS_INSTALL_ID="SWFObjectExprInst",ON_READY_STATE_CHANGE="onreadystatechange",win=window,doc=document,nav=navigator,plugin=false,domLoadFnArr=[main],regObjArr=[],objIdArr=[],listenersArr=[],storedAltContent,storedAltContentId,storedCallbackFn,storedCallbackObj,isDomLoaded=false,isExpressInstallActive=false,dynamicStylesheet,dynamicStylesheetMedia,autoHideShow=true,ua=function(){var w3cdom=typeof doc.getElementById!=UNDEF&&typeof doc.getElementsByTagName!=UNDEF&&typeof doc.createElement!=UNDEF,u=nav.userAgent.toLowerCase(),p=nav.platform.toLowerCase(),windows=p?/win/.test(p):/win/.test(u),mac=p?/mac/.test(p):/mac/.test(u),webkit=/webkit/.test(u)?parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,ie=eval("/*@cc_on!@*/false"),playerVersion=[0,0,0],d=null;if(typeof nav.plugins!=UNDEF&&typeof nav.plugins[SHOCKWAVE_FLASH]==OBJECT){d=nav.plugins[SHOCKWAVE_FLASH].description;if(d&&!(typeof nav.mimeTypes!=UNDEF&&nav.mimeTypes[FLASH_MIME_TYPE]&&!nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){plugin=true;ie=false;d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");playerVersion[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);playerVersion[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);playerVersion[2]=/[a-zA-Z]/.test(d)?parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;}}
else if(typeof win.ActiveXObject!=UNDEF){try{var a=new ActiveXObject(SHOCKWAVE_FLASH_AX);if(a){d=a.GetVariable("$version");if(d){ie=true;d=d.split(" ")[1].split(",");playerVersion=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];}}}
catch(e){}}
return{w3:w3cdom,pv:playerVersion,wk:webkit,ie:ie,win:windows,mac:mac};}(),onDomLoad=function(){if(!ua.w3){return;}
if((typeof doc.readyState!=UNDEF&&doc.readyState=="complete")||(typeof doc.readyState==UNDEF&&(doc.getElementsByTagName("body")[0]||doc.body))){callDomLoadFunctions();}
if(!isDomLoaded){if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("DOMContentLoaded",callDomLoadFunctions,false);}
if(ua.ie&&ua.win){doc.attachEvent(ON_READY_STATE_CHANGE,function(){if(doc.readyState=="complete"){doc.detachEvent(ON_READY_STATE_CHANGE,arguments.callee);callDomLoadFunctions();}});if(win==top){(function(){if(isDomLoaded){return;}
try{doc.documentElement.doScroll("left");}
catch(e){setTimeout(arguments.callee,0);return;}
callDomLoadFunctions();})();}}
if(ua.wk){(function(){if(isDomLoaded){return;}
if(!/loaded|complete/.test(doc.readyState)){setTimeout(arguments.callee,0);return;}
callDomLoadFunctions();})();}
addLoadEvent(callDomLoadFunctions);}}();function callDomLoadFunctions(){if(isDomLoaded){return;}
try{var t=doc.getElementsByTagName("body")[0].appendChild(createElement("span"));t.parentNode.removeChild(t);}
catch(e){return;}
isDomLoaded=true;var dl=domLoadFnArr.length;for(var i=0;i<dl;i++){domLoadFnArr[i]();}}
function addDomLoadEvent(fn){if(isDomLoaded){fn();}
else{domLoadFnArr[domLoadFnArr.length]=fn;}}
function addLoadEvent(fn){if(typeof win.addEventListener!=UNDEF){win.addEventListener("load",fn,false);}
else if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("load",fn,false);}
else if(typeof win.attachEvent!=UNDEF){addListener(win,"onload",fn);}
else if(typeof win.onload=="function"){var fnOld=win.onload;win.onload=function(){fnOld();fn();};}
else{win.onload=fn;}}
function main(){if(plugin){testPlayerVersion();}
else{matchVersions();}}
function testPlayerVersion(){var b=doc.getElementsByTagName("body")[0];var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);var t=b.appendChild(o);if(t){var counter=0;(function(){if(typeof t.GetVariable!=UNDEF){var d=t.GetVariable("$version");if(d){d=d.split(" ")[1].split(",");ua.pv=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];}}
else if(counter<10){counter++;setTimeout(arguments.callee,10);return;}
b.removeChild(o);t=null;matchVersions();})();}
else{matchVersions();}}
function matchVersions(){var rl=regObjArr.length;if(rl>0){for(var i=0;i<rl;i++){var id=regObjArr[i].id;var cb=regObjArr[i].callbackFn;var cbObj={success:false,id:id};if(ua.pv[0]>0){var obj=getElementById(id);if(obj){if(hasPlayerVersion(regObjArr[i].swfVersion)&&!(ua.wk&&ua.wk<312)){setVisibility(id,true);if(cb){cbObj.success=true;cbObj.ref=getObjectById(id);cb(cbObj);}}
else if(regObjArr[i].expressInstall&&canExpressInstall()){var att={};att.data=regObjArr[i].expressInstall;att.width=obj.getAttribute("width")||"0";att.height=obj.getAttribute("height")||"0";if(obj.getAttribute("class")){att.styleclass=obj.getAttribute("class");}
if(obj.getAttribute("align")){att.align=obj.getAttribute("align");}
var par={};var p=obj.getElementsByTagName("param");var pl=p.length;for(var j=0;j<pl;j++){if(p[j].getAttribute("name").toLowerCase()!="movie"){par[p[j].getAttribute("name")]=p[j].getAttribute("value");}}
showExpressInstall(att,par,id,cb);}
else{displayAltContent(obj);if(cb){cb(cbObj);}}}}
else{setVisibility(id,true);if(cb){var o=getObjectById(id);if(o&&typeof o.SetVariable!=UNDEF){cbObj.success=true;cbObj.ref=o;}
cb(cbObj);}}}}}
function getObjectById(objectIdStr){var r=null;var o=getElementById(objectIdStr);if(o&&o.nodeName=="OBJECT"){if(typeof o.SetVariable!=UNDEF){r=o;}
else{var n=o.getElementsByTagName(OBJECT)[0];if(n){r=n;}}}
return r;}
function canExpressInstall(){return!isExpressInstallActive&&hasPlayerVersion("6.0.65")&&(ua.win||ua.mac)&&!(ua.wk&&ua.wk<312);}
function showExpressInstall(att,par,replaceElemIdStr,callbackFn){isExpressInstallActive=true;storedCallbackFn=callbackFn||null;storedCallbackObj={success:false,id:replaceElemIdStr};var obj=getElementById(replaceElemIdStr);if(obj){if(obj.nodeName=="OBJECT"){storedAltContent=abstractAltContent(obj);storedAltContentId=null;}
else{storedAltContent=obj;storedAltContentId=replaceElemIdStr;}
att.id=EXPRESS_INSTALL_ID;if(typeof att.width==UNDEF||(!/%$/.test(att.width)&&parseInt(att.width,10)<310)){att.width="310";}
if(typeof att.height==UNDEF||(!/%$/.test(att.height)&&parseInt(att.height,10)<137)){att.height="137";}
doc.title=doc.title.slice(0,47)+" - Flash Player Installation";var pt=ua.ie&&ua.win?"ActiveX":"PlugIn",fv="MMredirectURL="+win.location.toString().replace(/&/g,"%26")+"&MMplayerType="+pt+"&MMdoctitle="+doc.title;if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+fv;}
else{par.flashvars=fv;}
if(ua.ie&&ua.win&&obj.readyState!=4){var newObj=createElement("div");replaceElemIdStr+="SWFObjectNew";newObj.setAttribute("id",replaceElemIdStr);obj.parentNode.insertBefore(newObj,obj);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj);}
else{setTimeout(arguments.callee,10);}})();}
createSWF(att,par,replaceElemIdStr);}}
function displayAltContent(obj){if(ua.ie&&ua.win&&obj.readyState!=4){var el=createElement("div");obj.parentNode.insertBefore(el,obj);el.parentNode.replaceChild(abstractAltContent(obj),el);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj);}
else{setTimeout(arguments.callee,10);}})();}
else{obj.parentNode.replaceChild(abstractAltContent(obj),obj);}}
function abstractAltContent(obj){var ac=createElement("div");if(ua.win&&ua.ie){ac.innerHTML=obj.innerHTML;}
else{var nestedObj=obj.getElementsByTagName(OBJECT)[0];if(nestedObj){var c=nestedObj.childNodes;if(c){var cl=c.length;for(var i=0;i<cl;i++){if(!(c[i].nodeType==1&&c[i].nodeName=="PARAM")&&!(c[i].nodeType==8)){ac.appendChild(c[i].cloneNode(true));}}}}}
return ac;}
function createSWF(attObj,parObj,id){var r,el=getElementById(id);if(ua.wk&&ua.wk<312){return r;}
if(el){if(typeof attObj.id==UNDEF){attObj.id=id;}
if(ua.ie&&ua.win){var att="";for(var i in attObj){if(attObj[i]!=Object.prototype[i]){if(i.toLowerCase()=="data"){parObj.movie=attObj[i];}
else if(i.toLowerCase()=="styleclass"){att+=' class="'+attObj[i]+'"';}
else if(i.toLowerCase()!="classid"){att+=' '+i+'="'+attObj[i]+'"';}}}
var par="";for(var j in parObj){if(parObj[j]!=Object.prototype[j]){par+='<param name="'+j+'" value="'+parObj[j]+'" />';}}
el.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+att+'>'+par+'</object>';objIdArr[objIdArr.length]=attObj.id;r=getElementById(attObj.id);}
else{var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);for(var m in attObj){if(attObj[m]!=Object.prototype[m]){if(m.toLowerCase()=="styleclass"){o.setAttribute("class",attObj[m]);}
else if(m.toLowerCase()!="classid"){o.setAttribute(m,attObj[m]);}}}
for(var n in parObj){if(parObj[n]!=Object.prototype[n]&&n.toLowerCase()!="movie"){createObjParam(o,n,parObj[n]);}}
el.parentNode.replaceChild(o,el);r=o;}}
return r;}
function createObjParam(el,pName,pValue){var p=createElement("param");p.setAttribute("name",pName);p.setAttribute("value",pValue);el.appendChild(p);}
function removeSWF(id){var obj=getElementById(id);if(obj&&obj.nodeName=="OBJECT"){if(ua.ie&&ua.win){obj.style.display="none";(function(){if(obj.readyState==4){removeObjectInIE(id);}
else{setTimeout(arguments.callee,10);}})();}
else{obj.parentNode.removeChild(obj);}}}
function removeObjectInIE(id){var obj=getElementById(id);if(obj){for(var i in obj){if(typeof obj[i]=="function"){obj[i]=null;}}
obj.parentNode.removeChild(obj);}}
function getElementById(id){var el=null;try{el=doc.getElementById(id);}
catch(e){}
return el;}
function createElement(el){return doc.createElement(el);}
function addListener(target,eventType,fn){target.attachEvent(eventType,fn);listenersArr[listenersArr.length]=[target,eventType,fn];}
function hasPlayerVersion(rv){var pv=ua.pv,v=rv.split(".");v[0]=parseInt(v[0],10);v[1]=parseInt(v[1],10)||0;v[2]=parseInt(v[2],10)||0;return(pv[0]>v[0]||(pv[0]==v[0]&&pv[1]>v[1])||(pv[0]==v[0]&&pv[1]==v[1]&&pv[2]>=v[2]))?true:false;}
function createCSS(sel,decl,media,newStyle){if(ua.ie&&ua.mac){return;}
var h=doc.getElementsByTagName("head")[0];if(!h){return;}
var m=(media&&typeof media=="string")?media:"screen";if(newStyle){dynamicStylesheet=null;dynamicStylesheetMedia=null;}
if(!dynamicStylesheet||dynamicStylesheetMedia!=m){var s=createElement("style");s.setAttribute("type","text/css");s.setAttribute("media",m);dynamicStylesheet=h.appendChild(s);if(ua.ie&&ua.win&&typeof doc.styleSheets!=UNDEF&&doc.styleSheets.length>0){dynamicStylesheet=doc.styleSheets[doc.styleSheets.length-1];}
dynamicStylesheetMedia=m;}
if(ua.ie&&ua.win){if(dynamicStylesheet&&typeof dynamicStylesheet.addRule==OBJECT){dynamicStylesheet.addRule(sel,decl);}}
else{if(dynamicStylesheet&&typeof doc.createTextNode!=UNDEF){dynamicStylesheet.appendChild(doc.createTextNode(sel+" {"+decl+"}"));}}}
function setVisibility(id,isVisible){if(!autoHideShow){return;}
var v=isVisible?"visible":"hidden";if(isDomLoaded&&getElementById(id)){getElementById(id).style.visibility=v;}
else{createCSS("#"+id,"visibility:"+v);}}
function urlEncodeIfNecessary(s){var regex=/[\\\"<>\.;]/;var hasBadChars=regex.exec(s)!=null;return hasBadChars&&typeof encodeURIComponent!=UNDEF?encodeURIComponent(s):s;}
var cleanup=function(){if(ua.ie&&ua.win){window.attachEvent("onunload",function(){var ll=listenersArr.length;for(var i=0;i<ll;i++){listenersArr[i][0].detachEvent(listenersArr[i][1],listenersArr[i][2]);}
var il=objIdArr.length;for(var j=0;j<il;j++){removeSWF(objIdArr[j]);}
for(var k in ua){ua[k]=null;}
ua=null;for(var l in swfobject){swfobject[l]=null;}
swfobject=null;});}}();return{registerObject:function(objectIdStr,swfVersionStr,xiSwfUrlStr,callbackFn){if(ua.w3&&objectIdStr&&swfVersionStr){var regObj={};regObj.id=objectIdStr;regObj.swfVersion=swfVersionStr;regObj.expressInstall=xiSwfUrlStr;regObj.callbackFn=callbackFn;regObjArr[regObjArr.length]=regObj;setVisibility(objectIdStr,false);}
else if(callbackFn){callbackFn({success:false,id:objectIdStr});}},getObjectById:function(objectIdStr){if(ua.w3){return getObjectById(objectIdStr);}},embedSWF:function(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj,callbackFn){var callbackObj={success:false,id:replaceElemIdStr};if(ua.w3&&!(ua.wk&&ua.wk<312)&&swfUrlStr&&replaceElemIdStr&&widthStr&&heightStr&&swfVersionStr){setVisibility(replaceElemIdStr,false);addDomLoadEvent(function(){widthStr+="";heightStr+="";var att={};if(attObj&&typeof attObj===OBJECT){for(var i in attObj){att[i]=attObj[i];}}
att.data=swfUrlStr;att.width=widthStr;att.height=heightStr;var par={};if(parObj&&typeof parObj===OBJECT){for(var j in parObj){par[j]=parObj[j];}}
if(flashvarsObj&&typeof flashvarsObj===OBJECT){for(var k in flashvarsObj){if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+k+"="+flashvarsObj[k];}
else{par.flashvars=k+"="+flashvarsObj[k];}}}
if(hasPlayerVersion(swfVersionStr)){var obj=createSWF(att,par,replaceElemIdStr);if(att.id==replaceElemIdStr){setVisibility(replaceElemIdStr,true);}
callbackObj.success=true;callbackObj.ref=obj;}
else if(xiSwfUrlStr&&canExpressInstall()){att.data=xiSwfUrlStr;showExpressInstall(att,par,replaceElemIdStr,callbackFn);return;}
else{setVisibility(replaceElemIdStr,true);}
if(callbackFn){callbackFn(callbackObj);}});}
else if(callbackFn){callbackFn(callbackObj);}},switchOffAutoHideShow:function(){autoHideShow=false;},ua:ua,getFlashPlayerVersion:function(){return{major:ua.pv[0],minor:ua.pv[1],release:ua.pv[2]};},hasFlashPlayerVersion:hasPlayerVersion,createSWF:function(attObj,parObj,replaceElemIdStr){if(ua.w3){return createSWF(attObj,parObj,replaceElemIdStr);}
else{return undefined;}},showExpressInstall:function(att,par,replaceElemIdStr,callbackFn){if(ua.w3&&canExpressInstall()){showExpressInstall(att,par,replaceElemIdStr,callbackFn);}},removeSWF:function(objElemIdStr){if(ua.w3){removeSWF(objElemIdStr);}},createCSS:function(selStr,declStr,mediaStr,newStyleBoolean){if(ua.w3){createCSS(selStr,declStr,mediaStr,newStyleBoolean);}},addDomLoadEvent:addDomLoadEvent,addLoadEvent:addLoadEvent,getQueryParamValue:function(param){var q=doc.location.search||doc.location.hash;if(q){if(/\?/.test(q)){q=q.split("?")[1];}
if(param==null){return urlEncodeIfNecessary(q);}
var pairs=q.split("&");for(var i=0;i<pairs.length;i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=")+1)));}}}
return"";},expressInstallCallback:function(){if(isExpressInstallActive){var obj=getElementById(EXPRESS_INSTALL_ID);if(obj&&storedAltContent){obj.parentNode.replaceChild(storedAltContent,obj);if(storedAltContentId){setVisibility(storedAltContentId,true);if(ua.ie&&ua.win){storedAltContent.style.display="block";}}
if(storedCallbackFn){storedCallbackFn(storedCallbackObj);}}
isExpressInstallActive=false;}}};}();
swfobject.replaceSWF=function(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj,callbackFn){var el=document.getElementById(replaceElemIdStr);if(el.nodeName=="OBJECT"||el.nodeName=="EMBED"){var parent=el.parentNode;swfobject.removeSWF(replaceElemIdStr);parent.appendChild(document.createElement("div")).setAttribute("id",replaceElemIdStr);}
swfobject.embedSWF(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj,callbackFn);};
function setSWFDimensions(objID,width,height){if(objID&&width&&height){var fObj=document.getElementById(objID);var fEmb=document.getElementById(objID+'-embed');if(fObj&&fObj.style){fObj.style.width=width+'px';fObj.style.height=height+'px';}
if(fEmb!=null){fEmb.width=width;fEmb.height=height;if(fEmb.style){fEmb.style.width=width+'px';fEmb.style.height=height+'px';}}}};
adobe.dom.createStyleSheet=function(htmlheadelement,href){if(htmlheadelement===undefined||htmlheadelement.nodeType!=1){throw(new TypeError("argument is not an element"));}
if(htmlheadelement.nodeName!="HEAD"){throw(new TypeError("element argument must be a <head> tag"));}
if(href===undefined){throw(new TypeError("argument is undefined"));}
var sheet=null;if(document.createStyleSheet){document.createStyleSheet(href);sheet=document.styleSheets[document.styleSheets.length-1];}else if(document.createElement){sheet=document.createElement("link");sheet.setAttribute("rel","stylesheet");sheet.setAttribute("href",href);htmlheadelement.appendChild(sheet);}
return sheet;};adobe.dom.getStyleSheetsByProperty=function(prop){var sheets=[];for(var i=0,l=window.document.styleSheets.length;i<l;i++){if(window.document.styleSheets[i].hasOwnProperty(prop)){sheets.push(window.document.styleSheets[i]);}}
return sheets;};adobe.dom.disableStyleSheet=function(sheet){if(sheet===undefined||sheet===null){return sheet;}
sheet.disabled=true;return sheet;};adobe.dom.enableStyleSheet=function(sheet){if(sheet===undefined||sheet===null){return sheet;}
sheet.disabled=false;if(sheet.removeAttribute){sheet.removeAttribute("disabled");}
return sheet;};adobe.dom.CSSStyleSheet=function(href){this.setHref(href);this.disabled=false;this.element=null;};adobe.dom.CSSStyleSheet.prototype={setHref:function(href){this.href=href.toString();},enable:function(htmlheadelement){if(this.element==null){this.element=adobe.dom.createStyleSheet(htmlheadelement,this.href);}else{adobe.dom.enableStyleSheet(this.element);}
this.disabled=false;},disable:function(){adobe.dom.disableStyleSheet(this.element);this.disabled=true;},toString:function(){return"[Object adobe.dom.StyleSheet]"}};
adobe.dom.FaaS=function(target)
{$.ajaxSetup({async:false});this.target=target;this.targetID='#'+this.target;this.targetObj=$('#'+this.target);this.countryChange=false;this.industryChange=false;this.q_Obj=new Object();this.wsFaaSServerUrl=new Object();this.wsformTemplateTag=new Object();this.wsFaaSSourceSystem=new Object();this.wsSourceSystemQuestionId=new Object();this.wsFormTypeQuestionId=new Object();this.wsFormSubtypeQuestionId=new Object();this.wsProductInterestSKUQuestionId=new Object();this.wsInternalCampaignIdQuestionId=new Object();this.wsQuestionTypeHidden=new Object();this.wsQuestionTypeHiddenList=new Object();this.selectedFormTemplate=new Object();this.wsParameters=new Object();this.formDetailData=new Object();this.templateOptions=new Array();this.formSubtypeString=new Object();return this;};adobe.dom.FaaS.prototype={faasCountryChange:function()
{window.countryChange=$.proxy(this.countryChange,this);$(this.targetID+' div.14 select').each(function()
{if($(this).length>0&&typeof _faas_country_onChange_state=='function')
{$(this).selectBox().unbind('change');$(this).selectBox().change(function()
{_faas_country_onChange_state();if(typeof _faas_country_onChange_state_required=='function'){_faas_country_onChange_state_required();}
if(typeof _faas_country_onChange_zipcode_required=='function'){_faas_country_onChange_zipcode_required();}
if(typeof _faas_country_onChange_southKoreaPermission1=='function'){_faas_country_onChange_southKoreaPermission1();}
if(typeof _faas_country_onChange_southKoreaPermission2=='function'){_faas_country_onChange_southKoreaPermission2();}
if(typeof _faas_country_onChange_southKoreaPermission3=='function'){_faas_country_onChange_southKoreaPermission3();}
if(typeof _faas_country_onChange_southKoreaPermission4=='function'){_faas_country_onChange_southKoreaPermission4();}
if(typeof _faas_country_onChange_southKoreaPermission1_required=='function'){_faas_country_onChange_southKoreaPermission1_required();}
if(typeof _faas_country_onChange_southKoreaPermission2_required=='function'){_faas_country_onChange_southKoreaPermission2_required();}
if(typeof _faas_country_onChange_southKoreaPermission4_required=='function'){_faas_country_onChange_southKoreaPermission4_required();}
if(typeof _faas_country_onChange_salutation=='function'){_faas_country_onChange_salutation();}
if(typeof _faas_country_onChange_disclaimer=='function'){_faas_country_onChange_disclaimer();}
window.countryChange=true;});}});},countryChangeCallback:function()
{if(window.countryChange)
{window.faasSelectBox=$.proxy(this.faasSelectBox,this);window.targetID=this.targetID;$(window.targetID+' div.15 select').selectBox('destroy');window.faasSelectBox(window.targetID+' div.15 select',true);}},faasIndustryChange:function()
{window.industryChange=$.proxy(this.industryChange,this);$(this.targetID+' div.18 select').each(function()
{if($(this).length>0&&typeof _faas_industry_onChange_numUnits=='function')
{$(this).selectBox().unbind('change');$(this).selectBox().change(function()
{_faas_industry_onChange_numUnits();window.industryChange=true;});}});},industryChangeCallback:function()
{if(window.industryChange)
{window.faasSelectBox=$.proxy(this.faasSelectBox,this);window.targetID=this.targetID;$(window.targetID+' div.23 select').selectBox('destroy');window.faasSelectBox(window.targetID+' div.23 select',false,true);}},faasSelectBox:function(target,country,industry)
{var tar=(target!=null)?target:this.targetID+' div.row select';window.faasCountryChange=$.proxy(this.faasCountryChange,this);window.faasIndustryChange=$.proxy(this.faasIndustryChange,this);$(tar).each(function()
{var selectWidth=$(this).parent().width();$(this).addClass('selectBox-Blue').css('width',selectWidth);adobe.ui.selectBox($(this));if(country)
{window.faasCountryChange();_faas_country_onChange_state_required();}
if(industry)
{window.faasIndustryChange();}});},formReflow:function()
{var dispatcher=adobe.vrbl("reflowDispatcher");if(dispatcher)
{if(dispatcher.hasLayoutEvent("phone")&&dispatcher.getLayoutEvent("phone").active)
{$(this.targetID+' LayoutSlimGrid-1 input, '+this.targetID+' LayoutSlimGrid-1-2 input').each(function()
{$(this).css('maxWidth','349px');});}
else
{$(this.targetID+' LayoutSlimGrid-1 input, '+this.targetID+' LayoutSlimGrid-1-2 input').each(function()
{$(this).css('maxWidth','');});}}},formStyle:function()
{$(this.targetID).css('width','100%');$(this.targetID+' div.row').each(function()
{$(this).addClass('LayoutRow LayoutBreakAfter');});$(this.targetID+' p.note').each(function()
{$(this).addClass('LayoutRow LayoutBreakAfter LayoutCellSides');});$(this.targetID+' div.dropdownlist label, '+this.targetID+' div.textfield label, '+this.targetID+' div.textarea label').each(function()
{$(this).wrap('<div class="LayoutGrid-1 LayoutSlimGrid-1-2"><div class="LayoutCellLeft LayoutSmallRow"></div></div>');});$(this.targetID+' div.dropdownlist input[type=text], '+this.targetID+' div.dropdownlist select, '+this.targetID+' div.dropdownlist textarea, '+this.targetID+' div.textfield input[type=text], '+this.targetID+' div.textfield select, '+this.targetID+' div.textfield textarea, '+this.targetID+' div.textarea textarea').each(function()
{$(this).wrap('<div class="LayoutGrid-2-3 LayoutSlimGrid-1-2" />');});$(this.targetID+' div.checkbox label, '+this.targetID+' div.checkboxlist label').each(function()
{$(this).wrap('<div class="LayoutGrid-2-3 LayoutSlimGrid-2"><div class="LayoutCellRight LayoutSmallRow"></div></div>');});$(this.targetID+' div.row input[type=text], '+this.targetID+' div.row textarea').each(function()
{$(this).addClass('FormInputFull LayoutSmallRow');});$(this.targetID+' div.row input[type=checkbox]').each(function()
{$(this).addClass('LayoutGutter').wrap('<div class="LayoutGrid-1 LayoutSlimGrid-1"><div class="LayoutBreakAfter"><div class="LayoutRight LayoutSmallRow"></div></div></div>');});$(this.targetID+' div.legal h1').each(function()
{$(this).addClass('LayoutCellSides');});$(this.targetID+' div.row input[type=submit]').each(function()
{$(this).addClass('Button ButtonYellow').wrap('<div class="LayoutGrid-1-3 LayoutSlimGrid-1-2 LayoutH"><div class="LayoutHItemRight"></div></div>');});$(this.targetID+' div.errorSummary').wrap('<div class="LayoutHidden LayoutZero" />');$(this.targetID+' .errorMessage, '+this.targetID+' span.required').each(function()
{$(this).addClass('FormError');});$(this.targetID+' .errorMessage').each(function()
{$(this).addClass('LayoutSmallRow TextSmall LayoutCellSides').parent().addClass('LayoutGrid-4 LayoutSlimGrid-1-2');});this.faasSelectBox();this.faasCountryChange();this.faasIndustryChange();this.formReflow();$(this.targetID+' .legalnotice').each(function()
{$(this).addClass('LayoutRow LayoutCellSides').wrap('<div class="LayoutGrid-1-4 LayoutSlimGrid-1-2" />');});$(this.targetID+' .clear-both').each(function()
{$(this).remove();});window.formReflow=$.proxy(this.formReflow,this);$(document).bind("adobe.reflow.LayoutChange",function()
{window.formReflow();});},formQuestions:function(question,value)
{var tempObj=new Object();tempObj[question]=value;this.q_Obj=$.extend(this.q_Obj,tempObj);},formInit:function(id,l,d)
{l=(l!=null)?l:"en_us";d=(d!=null)?d:"http://www.adobe.com";var faasScript=this.wsFaaSServerUrl+"faas/service/jquery.faas-3.0.0.js",hostProtocol=(document.location.protocol=='https:'?'https':'http'),pi=faasScript.indexOf('://');if(pi>=0)
{faasScript=hostProtocol+faasScript.substring(pi);}
else
{faasScript=hostProtocol+'://'+faasScript;}
obj=this.targetObj;var pi=d.indexOf('http');if(pi<0)
{d=document.location.protocol+'//'+window.location.host+d;if(!$.string(d).endsWith('.html')||!$.string(d).endsWith('.htm'))
{d+='.html';}}
window.formStyle=$.proxy(this.formStyle,this);window.countryChangeCallback=$.proxy(this.countryChangeCallback,this);window.industryChangeCallback=$.proxy(this.industryChangeCallback,this);window.getFormSubtypeName=$.proxy(this.getFormSubtypeName,this);window.formQuestions=this.q_Obj;adobe.http.getScript(faasScript).done(function()
{obj.faas({id:id,l:l,d:d,ar:true,test:false,q:{},pc:{1:'js',2:'faas_submission',3:'sfdc',4:'demandbase'},p:{js:window.formQuestions,faas_submission:{},sfdc:{},demandbase:{}},as:false,o:{},e:{formRenderedCallback:function(data,ajax)
{window.formStyle();},afterSubmitCallback:function(data)
{if(data.data.destination.indexOf("?")==-1)
{data.data.destination+="?form_subtype="+window.getFormSubtypeName();}
else
{data.data.destination+="&form_subtype="+window.getFormSubtypeName();}},afterEventFinishedCallback:function()
{window.countryChangeCallback();window.industryChangeCallback();}}});});},setFaaSServerUrl:function(url)
{var newUrl;if(!$.string(url).endsWith('/')){var str1=url;newUrl=str1.concat("/");}else{newUrl=url;}
this.wsFaaSServerUrl=newUrl;},setFormTemplateTag:function(tag)
{this.wsformTemplateTag=tag;},setFormTypeQuestionId:function(qId)
{this.wsFormTypeQuestionId=qId;},setFormSubtypeQuestionId:function(qId)
{this.wsFormSubtypeQuestionId=qId;},setSourceSystemQuestionId:function(qId)
{this.wsSourceSystemQuestionId=qId;},setProductInterestSKUQuestionId:function(qId)
{this.wsProductInterestSKUQuestionId=qId;},setInternalCampaignIdQuestionId:function(qId)
{this.wsInternalCampaignIdQuestionId=qId;},setQuestionTypeHidden:function(q)
{this.wsQuestionTypeHidden=q;},setQuestionTypeHiddenList:function(q)
{this.wsQuestionTypeHiddenList=q;},setSelectedFormTemplate:function(t)
{this.selectedFormTemplate=t;},setWSParameters:function(p)
{this.wsParameters=p;},setFormDetailData:function(d)
{this.formDetailData=d;},setSourceSystem:function(s)
{this.wsFaaSSourceSystem=s;},setFormSubtypeString:function(s){this.formSubtypeString=s;},preloadFormTemplates:function()
{var wsUrl=this.wsFaaSServerUrl+'faas/api/form/?'+this.wsParameters,hostProtocol=(document.location.protocol=='https:'?'https':'http'),pi=wsUrl.indexOf('://');if(pi>=0)
{wsUrl=hostProtocol+wsUrl.substring(pi);}
else
{wsUrl=hostProtocol+'://'+wsUrl;}
window.templateOpt=this.templateOptions;$.getJSON(wsUrl,{tags:this.wsformTemplateTag,active:1},function(data)
{for(var i=0;i<data.length;i++)
{window.templateOpt.push({"value":data[i].id,"text":data[i].name});}}).complete(function()
{});},populateFormData:function(src)
{window.selectedFormTemplate=this.selectedFormTemplate;if(window.selectedFormTemplate>0)
{window.populateFormType=$.proxy(this.populateFormType,this);window.populateFormSubtype=$.proxy(this.populateFormSubtype,this);window.populateProductInterestSKU=$.proxy(this.populateProductInterestSKU,this);window.populateInternalCampaignId=$.proxy(this.populateInternalCampaignId,this);window.populateFormType(src);window.populateFormSubtype(src);window.populateProductInterestSKU(src);window.populateInternalCampaignId(src);}},retrieveFormData:function(formId,src)
{if(formId<=0||formId=='SELECT')
{return;}
window.populateFormData=$.proxy(this.populateFormData,this);window.setSelectedFormTemplate=$.proxy(this.setSelectedFormTemplate,this);window.setFormDetailData=$.proxy(this.setFormDetailData,this);window.setSelectedFormTemplate(formId);var wsformUrl=this.wsFaaSServerUrl,wsUrl=wsformUrl+'faas/api/form/'+formId+'?'+this.wsParameters,hostProtocol=(document.location.protocol=='https:'?'https':'http'),pi=wsUrl.indexOf('://');if(pi>=0)
{wsUrl=hostProtocol+wsUrl.substring(pi);}
else
{wsUrl=hostProtocol+'://'+wsUrl;}
$.getJSON(wsUrl,{tags:this.wsformTemplateTag,active:1},function(data)
{window.setFormDetailData(data);if(src)
{window.populateFormData(src);}}).complete(function()
{}).success(function()
{});},getFormSubtypeId:function(){if(!this.formSubtypeString)
return;var i=(this.formSubtypeString).indexOf('/');if(i>0){return(this.formSubtypeString).substring(0,i);}},getFormSubtypeName:function(){if(!this.formSubtypeString)
return;var i=(this.formSubtypeString).indexOf('/');if(i>0){return(this.formSubtypeString).substring(i+1);}},populateFormType:function(field)
{var options=new Array();var showFormType=false;for(var i=0;i<this.formDetailData.formQuestions.length;i++)
{var curQuestionId=this.formDetailData.formQuestions[i].question.id,curQuestion=this.formDetailData.formQuestions[i].question;if(curQuestionId==this.wsFormTypeQuestionId&&curQuestion.question_type_id==this.wsQuestionTypeHiddenList)
{var questionCollection=curQuestion.collection;for(var j=0;j<questionCollection.collectionValues.length;j++)
{showFormType=true;options.push({"value":questionCollection.collectionValues[j].id,"text":questionCollection.collectionValues[j].displayText.phrase});}}}
var panel=field.findParentByType('tabpanel'),formType=panel.find('name','./formType')[0];if(showFormType)
{formType.setValue();formType.show();formType.setOptions(options);formType.doLayout();}
else
{options.push({"value":"NA","text":"NA"});formType.setOptions(options);formType.setValue(["NA"]);}},populateFormSubtype:function(field)
{var options=new Array(),showFormSubtype=false;for(var i=0;i<this.formDetailData.formQuestions.length;i++)
{var curQuestionId=this.formDetailData.formQuestions[i].question.id,curQuestion=this.formDetailData.formQuestions[i].question;if(curQuestionId==this.wsFormSubtypeQuestionId&&curQuestion.question_type_id==this.wsQuestionTypeHiddenList)
{var questionCollection=curQuestion.collection;for(var j=0;j<questionCollection.collectionValues.length;j++)
{showFormSubtype=true;options.push({"value":questionCollection.collectionValues[j].id+'/'+questionCollection.collectionValues[j].displayText.phrase,"text":questionCollection.collectionValues[j].displayText.phrase});}}}
var panel=field.findParentByType('tabpanel'),formSubtype=panel.find('name','./formSubtype')[0];if(showFormSubtype)
{formSubtype.setValue();formSubtype.show();formSubtype.setOptions(options);formSubtype.doLayout();}
else
{options.push({"value":"NA","text":"NA"});formSubtype.setOptions(options);formSubtype.setValue(["NA"]);}},populateProductInterestSKU:function(field)
{var options=new Array(),showProductInterestSKU=false;for(var i=0;i<this.formDetailData.formQuestions.length;i++)
{var curQuestionId=this.formDetailData.formQuestions[i].question.id,curQuestion=this.formDetailData.formQuestions[i].question;if(curQuestionId==this.wsProductInterestSKUQuestionId&&curQuestion.question_type_id==this.wsQuestionTypeHiddenList)
{var questionCollection=curQuestion.collection;for(var j=0;j<questionCollection.collectionValues.length;j++)
{showProductInterestSKU=true;options.push({"value":questionCollection.collectionValues[j].id,"text":questionCollection.collectionValues[j].displayText.phrase});}}}
var panel=field.findParentByType('tabpanel'),productInterestSKU=panel.find('name','./sku')[0];if(showProductInterestSKU)
{productInterestSKU.setValue();productInterestSKU.show();productInterestSKU.setOptions(options);productInterestSKU.doLayout();}
else
{options.push({"value":"NA","text":"NA"});productInterestSKU.setOptions(options);productInterestSKU.setValue(["NA"]);}},populateInternalCampaignId:function(field)
{var options=new Array(),showInternalCampaignId=false;for(var i=0;i<this.formDetailData.formQuestions.length;i++)
{var curQuestionId=this.formDetailData.formQuestions[i].question.id,curQuestion=this.formDetailData.formQuestions[i].question;if(curQuestionId==this.wsInternalCampaignIdQuestionId&&curQuestion.question_type_id==this.wsQuestionTypeHidden)
{showInternalCampaignId=true;}}
var panel=field.findParentByType('tabpanel'),internalCampaignId=panel.find('name','./intCampaignId')[0];if(showInternalCampaignId)
{internalCampaignId.setValue();internalCampaignId.show();}
else
{internalCampaignId.setValue("999999999999999999");}},getTemplateOptions:function()
{return this.templateOptions;},execute:function()
{}};
adobe.dom.param=function(param)
{var query=window.location.search,sep="&",hash='';if(query.indexOf(param)!=-1)
{$('a').each(function()
{var link=$(this).attr('href');if(link!=undefined)
{if(link.indexOf("?")==-1)
{sep="?";}
if(link.indexOf("#")!=-1)
{hash=link.split("#");link=hash[0];hash="#"+hash[1];}
$(this).attr('href',link+sep+param+hash);}});}};
adobe.fn.ApexPageFilter=function(e)
{var menuBarID="#"+e,menuBar=$(menuBarID),menuControlID="MenuControl",menuControl=$('#'+menuControlID);if(menuControl[0]==null)
{$('<div/>',{id:menuControlID}).appendTo('body');menuControl=$('#'+menuControlID);}
var menuDropWidth=$(menuBarID+' .MenuDrop').width();var menuPanelWidth=$(menuBarID+' .MenuDropPanel').width();var menuWidth;if(menuDropWidth>menuPanelWidth)
{menuWidth=menuDropWidth+1+"px";}
else
{menuWidth=menuPanelWidth+1+"px";}
$(menuBarID+' .MenuDrop').css('width','230px');$(menuBarID+' .MenuDropPanel').css('width','230px');var menuCheckHover=function(target)
{if(menuControl.hasClass('MenuClose'))
{target.find("div[class*='MenuDrop']").removeClass("MenuDropHover").unbind('mouseenter mouseleave');target.find("div[class='MenuDrop']").addClass("MenuDropOpen");}
else
{target.find("div[class*='MenuDrop']").removeClass("MenuDropOpen");target.find("div[class='MenuDrop']").hover(function()
{$(this).addClass("MenuDropHover");},function()
{$(this).removeClass("MenuDropHover");});}};menuCheckHover(menuBar);menuBar.find("div[class*='MenuDropName']").bind('click',function()
{var menuPanel=menuBar.find("div[class*='MenuDropPanel']");if(menuControl.hasClass('MenuClose'))
{$('.MenuDropPanel').fadeOut('fast').removeClass('MenuShow');menuControl.removeClass('MenuClose');}
if(menuPanel.hasClass('MenuShow'))
{menuPanel.fadeOut('fast').removeClass('MenuShow');menuControl.removeClass('MenuClose');menuCheckHover(menuBar);}
else
{menuPanel.show(000).addClass('MenuShow');menuControl.addClass('MenuClose');menuCheckHover(menuBar);menuControl.unbind('click');menuControl.bind('click',function()
{$(menuBarID+' .MenuDropPanel').fadeOut('fast').removeClass('MenuShow');menuControl.removeClass('MenuClose');menuCheckHover(menuBar);});$('body').unbind('keyup');$('body').bind('keyup',function(event)
{if(event.keyCode=='27')
{event.preventDefault();$(menuBarID+' .MenuDropPanel').fadeOut('fast').removeClass('MenuShow');menuControl.removeClass('MenuClose');menuCheckHover(menuBar);}});}
return false;});var menuDropItem=new Array();$(menuBarID+' .MenuDropItem').each(function(i)
{$(this).attr('id',e+'MenuDropItem'+[i]);menuDropItem[i]='#'+$(this).attr('id');if($(menuBarID+' .MenuDropItemSelected').size()==0)
{$(menuDropItem[0]).addClass('MenuDropItemSelected');}
$(menuDropItem[i]).bind('click',function()
{$(menuBarID+' .MenuDropItem').removeClass('MenuDropItemSelected');$(this).addClass('MenuDropItemSelected');});});};
adobe.fn.buildTreeList=function(selectorStr){if(selectorStr.length<1){return;}
var myElement=$(selectorStr);if(myElement.length<1){return;}
myElement.treeList();};
adobe.fn.changeRegionFooter=function(regioncode){if($.string(regioncode).startsWith('be_')){$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion','be',{domain:'adobe.com',hoursToLive:8760});}
else if($.string(regioncode).startsWith('ca')){$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion','ca',{domain:'adobe.com',hoursToLive:8760});}
else if($.string(regioncode).startsWith('eeur')){$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion','eu',{domain:'adobe.com',hoursToLive:8760});}
else if($.string(regioncode).startsWith('hk_')){$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion','cn',{domain:'adobe.com',hoursToLive:8760});}
else if($.string(regioncode).startsWith('lu_')){$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion','lu',{domain:'adobe.com',hoursToLive:8760});}
else if($.string(regioncode).startsWith('uk')){$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion','gb',{domain:'adobe.com',hoursToLive:8760});}
else{$.cookies.set('international',regioncode,{domain:'adobe.com',hoursToLive:8760});$.cookies.set('storeregion',regioncode,{domain:'adobe.com',hoursToLive:8760});}
var currURL=window.location.pathname+window.location.search;var geoArray=["africa","ap","at","au","be_en","be_fr","be_nl","bg","br","ca","ca_fr","ch_de","ch_fr","ch_it","cn","cz","de","dk","eeurope","ee","es","fi","fr","hk_en","hk_zh","hr","hu","ie","il_en","il_he","in","it","jp","kr","la","lt","lu_de","lu_en","lu_fr","lv","mena_ar","mena_en","mena_fr","mx","nl","no","nz","pl","pt","ro","ru","si","se","sea","sk","tr","tw","ua","uk"];$.each(geoArray,function(){if($.string(currURL).startsWith('/'+this+'/')){currURL=currURL.replace('/'+this+'/','/');return false;}});if(($.string(currURL).startsWith('/cfusion'))&&(regioncode=='us')){newURL="/";homeURL="/";}
else if(($.string(currURL).startsWith('/cfusion'))&&(regioncode!='us')){newURL="/"+regioncode+"/";homeURL="/"+regioncode+"/";}
else if(regioncode!='us'){newURL="/"+regioncode+currURL;homeURL="/"+regioncode+"/";}
else{newURL=currURL;homeURL="/";}
$.ajax({url:newURL,type:'HEAD',error:function(){window.location=homeURL;},success:function(){window.location=newURL;}});};
adobe.fn.colorBox=function(target)
{target=$(target);var cdnPrefix=adobe.http.cdnprefix();if($(window).width()>640)
{$.getScript(cdnPrefix+'/include/script/jquery/plugins/OnDemand/jquery.colorbox.js',function(data,textStatus)
{if(textStatus=="success")
{target.colorbox();}});}
else
{target.click(function()
{return true;});}};
adobe.fn.cookies=function(target,method,cookie,cookieValue,domain,path,expire,secure)
{cookieValue=cookieValue||'';var status=null,traditionalCookie=null,targetDiv=$('#'+target),body=$('body'),special=target+'SpecialCookie',specialObj=$('#'+special),debug=false;if(specialObj.length==0)
{$('<div id="'+special+'" class="LayoutHidden LayoutZero">').appendTo(body);specialObj=$('#'+special);if(debug){console.log("'special' object not found, creating it: "+special+": "+specialObj);}}
if(method==null||method==''||cookie==null||cookie=='')
{if(debug){console.log("'method' or 'cookie' was empty. "+method+" "+cookie);}
return;}
switch(method)
{case'get':if(debug){console.log("method = get");}
adobeGetCookie();break;case'set':if(debug){console.log("method = set");}
adobeSetCookie();break;case'delete':if(debug){console.log("method = delete");}
adobeDelCookie();break;}
function setExpire()
{if(debug){console.log("running setExpire()");}
var today=new Date(),year=today.getFullYear()+30,month=today.getMonth(),date=today.getDate();return new Date(year,month,date);}
function showButtons(status)
{if(status===true||status==null||traditionalCookie==null)
{targetDiv.find('.CookieValid').hide();targetDiv.find('.CookieInvalid').show();targetDiv.find('.CookieOptIn').hide();targetDiv.find('.CookieOptOut').show();targetDiv.find('.CookieValue').html('');}
else
{targetDiv.find('.CookieValid').show();targetDiv.find('.CookieInvalid').hide();targetDiv.find('.CookieOptIn').show();targetDiv.find('.CookieOptOut').hide();targetDiv.find('.CookieValue').html(status);}}
function cookieType(thisCookie)
{var type,imageRegex=/([^\s]+(?=\.(jpg|jpeg|gif|png))\.\2)/gm;if(thisCookie.match(imageRegex)!=null)
{type="image";}
else if(thisCookie.match("^http")!=null)
{type="address";}
else
{type="cookie";}
if(debug){console.log("cookieType found type = "+type);}
return type;}
function adobeGetCookie(cookieItem)
{cookieItem=(cookieItem!=null)?[cookieItem]:cookie;if(debug){console.log("adobeGetCookie running with item(s) = "+cookieItem);}
$.each(cookieItem,function(index,value)
{if(debug){console.log("each cookie value = "+value);}
var findCookieType=cookieType(value);if(findCookieType=="cookie")
{status=$.cookies.get(value);traditionalCookie=1;showButtons(status);}});if(traditionalCookie==null)
{if(debug){console.log("No traditional cookies found, hiding buttons");}
showButtons(status);}
if(debug){console.log("running showButtons(status). status = "+status);}}
function adobeTestCookie(cookieItem)
{if($.cookies.test())
{if(debug){console.log("$.cookies.test() passed "+$.cookies.test());}
var cookieOptions={domain:(domain!=null&&domain!='')?domain:document.domain,path:(path!=null&&path!='')?path:'/',expiresAt:(expire!=null&&expire!='')?new Date(expire):setExpire(),secure:(secure&&secure!='')?true:false};if(debug){console.log("setting the cookie: "+cookieItem);}
$.cookies.set(cookieItem,cookieValue,cookieOptions);adobeGetCookie(cookieItem);}
else
{var noCookies=$('#'+target+'NoCookies');status="There was a problem testing cookies. Either you've disabled this ability, or your browser doesn't seem to support cookies. Please enable cookies and refresh your browser, or update your browser.";if(noCookies.length==0)
{$('<div id="'+noCookies+'" class="LayoutRow LayoutHItem TextWarning">').appendTo(targetDiv).html(status);}}}
function adobeSetCookie()
{if(debug){console.log("cookie(s) being SET = "+cookie);}
$.each(cookie,function(index,value)
{if(debug){console.log("cookie value = "+value);}
var findCookieType=cookieType(value);if(findCookieType!='cookie')
{if(findCookieType=="image")
{if(debug){console.log("Found an 'image' = "+value);}
window.open(value,'_blank');}
else if(findCookieType=="address")
{if(debug){console.log("Found an 'address', using $.get() to grab it = "+value);}
window.open(value,'_blank');}
if(traditionalCookie==null)
{$('#'+target+'-CookiesSet').show();}}
else
{if(debug){console.log("Found a traditional 'cookie', running adobeTestCookie");}
adobeTestCookie(value);}});}
function adobeDelCookie()
{var cookieOptions={domain:(domain!=null&&domain!='')?domain:document.domain,path:(path!=null&&path!='')?path:'/'};$.each(cookie,function(index,value)
{if(debug){console.log("cookie value = "+value);}
var findCookieType=cookieType(value);if(findCookieType=="image")
{specialObj.empty();if(debug){console.log(value+" looked like an 'image' type. Removing it from the DOM. Checking 'specialObj's html: "+specialObj.html());}}
else if(findCookieType=="address")
{if(debug){console.log("Cookie is a URL. Not much we can do here except hope this URL is an actual API to delete the cookie.");}}
else
{$.cookies.del(value,cookieOptions);if(debug){console.log("cookie being DELETED = "+value);}
adobeGetCookie(value);}});}};
var hash=location.hash;var deepLinkMap=new Object();if(hash!=null&&hash!=''){$(document).ready(function(){var deepLink=deepLinkMap[hash];if(deepLink!=undefined&&deepLink!=''){$('#'+deepLinkMap[hash]+' a[name='+deepLinkMap[hash]+']').click();}});};
adobe.fn.embedMediaPlayer=(function($){var defaults={defaultType:"flash"};function getDefaults(){if(typeof defaults.autoPlay=="undefined"){defaults.autoPlay=swfobject.getQueryParamValue('autoPlay')||"";}
if(typeof defaults.allowFullScreen=="undefined"){defaults.allowFullScreen=swfobject.getQueryParamValue('allowFullScreen')||"";}
return defaults;}
function getDeepLink(id){var hash=location.hash;var chapterIdDeepLink='';var out={};if(hash!=null&&hash!=''){var hashArray=hash.split("_split_");if(hashArray!=null&&hashArray.length>=2){if(hashArray[0]=='#'+id){chapterIdDeepLink=hashArray[hashArray.length-1];out.chapterID=chapterIdDeepLink;}}}
return out;}
var supportsTouch=Boolean("ontouchstart"in window),expressInstall="/include/flash/expressInstall.swf",flashVersion="10.1";return(function(id,options){if(!id){return;}
options=$.extend({},getDefaults(),options);if(!supportsTouch&&options.defaultType=="flash"){if(options.flash){swfobject.embedSWF(options.flash,id,options.width,options.height,flashVersion,expressInstall,$.extend(options.flashVars,getDeepLink(id)),options.flashParams,options.flashAttrs);}}else{$("#"+id).find(".FlashAltCanvas").remove();var bach_opts={width:"100%"};if(options.height){bach_opts.height=String(options.height);}
if('msgSrcError'in options){bach_opts.msgSrcError=String(options.msgSrcError);}
if('msgUIError'in options){bach_opts.msgUIError=String(options.msgUIError);}
$(options.playlistThis).removeClass("LayoutHidden").bach_player(bach_opts);}});})(jQuery);
adobe.fn.embedVideo=function(srcs,id,attrs){function setAttr(video,user_attrs,config_attr){if(user_attrs[config_attr.attr]===undefined){return;}
var user_attr_value=user_attrs[config_attr.attr];if(user_attr_value===undefined){return;}
if(config_attr.setEvent===undefined){video.setAttribute(String(config_attr.attr),user_attr_value);return;}
if(user_attr_value==config_attr.value||config_attr.value=="*"){if(config_attr.value=="*"){config_attr.setValue=user_attr_value;}else{video.setAttribute(String(config_attr.attr),config_attr.value);}
var set_func=function(event){var video=event.target;if(config_attr.setValue!==undefined){this[config_attr.setAttr]=config_attr.setValue;}
if(typeof config_attr.setFunction=="function"){config_attr.setFunction(video);}
jQuery(video).unbind(config_attr.setEvent,set_func);};jQuery(video).bind(config_attr.setEvent,set_func);}}
function replaceNode(replacement,current){replacement.style.visibility="visible";return current.parentNode.replaceChild(replacement,current);}
function replaceNodeHandler(event){jQuery(this).unbind("error adobe.event.media.nosource",replaceNodeHandler);replaceNode(event.data.replacement,this);}
function attachSources(video,srcs){var srcEl;for(var i=0;i<srcs.length;i++){var src=srcs[i];if(src.src!==undefined){srcEl=window.document.createElement("source");srcEl.setAttribute("src",String(src.src));if(src.type!==undefined){srcEl.setAttribute("type",String(src.type));}
video.appendChild(srcEl);}}
if(srcEl){jQuery(srcEl).bind("error",{video:video},function(event){jQuery(event.data.video).triggerHandler("adobe.event.media.nosource");});}}
if(!srcs||srcs.length<1||!id){return null;}
var altElement=window.document.getElementById(String(id));if(altElement==null||altElement.parentNode==null){return null;}
var video=window.document.createElement('video'),canPlay=Boolean(video.canPlayType);if(!canPlay){return null;}
var allowed_attrs=[{attr:"id"},{attr:"audio",value:"muted",setEvent:"loadstart",setAttr:"muted",setValue:true},{attr:"autoplay",value:"autoplay",setEvent:"canplay",setFunction:function(video){video.play();}},{attr:"controls"},{attr:"height"},{attr:"loop"},{attr:"poster"},{attr:"preload"},{attr:"src"},{attr:"volume",value:"*",setEvent:"loadstart",setAttr:"volume"},{attr:"width"}];attrs=attrs||{};for(var i=0;i<allowed_attrs.length;i++){setAttr(video,attrs,allowed_attrs[i]);}
jQuery(video).bind("error adobe.event.media.nosource",{current:video,replacement:altElement},replaceNodeHandler);attachSources(video,srcs);altElement=replaceNode(video,altElement);return video;};
adobe.fn.evidon=function(trigger)
{var evidonID=$('#'+trigger),d=document,pixel,page_id,URL_SCHEME=(d.location.protocol=='https:'?'https':'http'),CDN_URL=(URL_SCHEME=='https'?'https://info.evidon.com/c/betrad/pub/':'http://cdn.betrad.com/pub/');if((evidonID!=null)&&(hideEvidon!=true)&&isDesktop())
{evidonID.show();if((URLParser.host=="www.adobe.com")||(URLParser.host=="adobe.com")||(URLParser.host=="get.adobe.com"||(URLParser.host=="get2.adobe.com")||(URLParser.host=="get3.adobe.com"))||(URLParser.host=="kb2.adobe.com")||(URLParser.host=="community.adobe.com")||(URLParser.host=="helpx.adobe.com")||(URLParser.host=="store1.adobe.com")||(URLParser.host=="store2.adobe.com")||(URLParser.host=="store3.adobe.com"))
{if(URLParser.locale=="de")
{page_id="322";}
else if(URLParser.locale=="fr")
{page_id="324";}
else if(URLParser.locale=="uk")
{page_id="323";}
else
{page_id="86";}}
else
{if(URLParser.locale=="de")
{page_id="327";}
else if(URLParser.locale=="fr")
{page_id="326";}
else if(URLParser.locale=="uk")
{page_id="328";}
else
{page_id="126";}}
evidonID.bind('click',function(e)
{e.preventDefault();var link=this;function appendScript(url,callback)
{var head=d.getElementsByTagName('head')[0]||d.documentElement,loaded=false,script=d.createElement('script');function onload(){script.onload=script.onreadystatechange=null;head.removeChild(script);callback();}
script.src=url;script.onreadystatechange=function(){if(!loaded&&(this.readyState=='loaded'||this.readyState=='complete')){loaded=true;onload();}};script.onload=onload;head.insertBefore(script,head.firstChild);}
appendScript(URL_SCHEME+'://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js',function(){appendScript(CDN_URL+'pub1.js',function(){BAPW.i(link,{pid:page_id,ocid:414},false);});});});pixel=d.createElement('img');pixel.src=URL_SCHEME+'://l.betrad.com/pub/p.gif?pid='+page_id+'&ocid='+'414'+'&ii=1&r='+Math.random();pixel.height='1';pixel.width='1';pixel.className='SiteFooterEvidonPixel';d.body.appendChild(pixel);}};
adobe.fn.focusHashElement=function(){var hashId=window.location.hash;if(hashId.length<=1){return;}
var node=document.getElementById(hashId);if(node==null){return;}
if(node.nodeType!=1){return;}
var hasIndex=node.getAttribute("tabindex")!=null;var hasRef=node.getAttribute("href")!=null;if(!hasRef&&!hasIndex){if(node.hasAttribute("tabindex")){node.setAttribute("tabindex","0");}else{var target=$(node).find("a");if(target.length<1){target=$(node).find("area");if(target.length<1){target=$(node).find("*[tabindex]");}}
if(target.length>0){node=target.first();}else{node.setAttribute("tabindex","0");}}}
$(node).focus();};
adobe.fn.formcentralIframeResize=function(target,height,width)
{var iframeObj=$('#'+target);var buffer=20;var maxIframeWidth="709px";function pageY(elem){return elem.offsetParent?(elem.offsetTop+pageY(elem.offsetParent)):elem.offsetTop;}
if(height==""||height=="undefined"){height=document.documentElement.clientHeight;height-=pageY(document.getElementById(target))+buffer;height=(height<0)?0:height;height=height+50+'px';}else{height=height+'px';}
if(width==""||width=="undefined"){width='100%';}else{width=width+'px';}
iframeObj.css('width',width).css('maxWidth',maxIframeWidth);iframeObj.css('height',height);};
adobe.fn.handleCartButton=function(event){if(!cart){return;}
var distMethod=event.data.distmethod;var storeType=event.data.storetype;var categoryPath=event.data.categorypath;var productName=event.data.productname;var promoID=event.data.promoid;event.preventDefault();cart.setCategoryPath(categoryPath);cart.setProductName(productName);cart.setDistributionMethod(distMethod);cart.setStoreType(storeType);cart.setEmailTrackingId(promoID);cart.openCartOverlay();};
adobe.fn.handleHashChangeForTreeList=function(){var hashId=window.location.hash;var myTree;if(hashId.length>1){myTree=$(window.document.getElementById(hashId)).closest(".ui-treeList");}else{myTree=$(".ui-treeList").first();}
if(myTree.length==0){return;}
var myNode=$(hashId).closest(".ui-treeList-item");if(myNode.length==0){myNode=myTree.find(".ui-treeList-item");}
myTree.treeList('openNode',myNode);};
adobe.fn.handleModalButton=function(event){if(event.data===undefined){return;}
if(jQuery(window).width()>(parseInt(event.data.width)||0)){event.preventDefault();var dispatcher=adobe.vrbl("reflowDispatcher");if(dispatcher)
{if(dispatcher.hasLayoutEvent("phone")&&dispatcher.getLayoutEvent("phone").active)
{window.location=event.data.href;}
else
{adobe.fn.openModal(event.data);}}
else
{adobe.fn.openModal(event.data);}}};
$.getURLParameter=function(name){return decodeURIComponent((location.search.match(RegExp("[?&]"+name+"=([^&]*)"))||[,""])[1]);}
adobe.fn.initGeorouting=function(){if(($('#Georouting').length)&&!($.cookies.get('georouting_presented'))&&($(window).width()>750)){if((URLParser.siteLevel=="solutions")||(URLParser.siteLevel=="products")||(URLParser.siteLevel=="solutions.html")||(URLParser.siteLevel=="index.html")||(URLParser.siteLevel=="")){adobe.fn.georoutingModalSearch();}}}
adobe.fn.georoutingModalSearch=function(){var referrerURL=$(document)[0].referrer;if(referrerURL!=""){var referrerDomain=referrerURL.split('/')[2];if($.string(referrerDomain).endsWith('adobe.com')){adobe.fn.georoutingModalIP();}
else{if($.string(referrerDomain).startsWith('www.')){referrerDomain=referrerDomain.replace(/www\./,'');}
var pageName=referrerDomain.replace(/\./g,'_');var fileName="/etc/pagetables/georouting_search/"+pageName+".modal.html";$.ajax({url:fileName,type:'HEAD',success:function(){$.cookies.set('georouting_presented','true',{domain:'adobe.com',hoursToLive:720});(function($){adobe.fn.openModal({width:"auto",height:"auto",target:"georouting_modal-ui",href:fileName,title:""});})(jQuery);},error:function(){adobe.fn.georoutingModalIP();}});}}
else{adobe.fn.georoutingModalIP();}}
adobe.fn.georoutingModalIP=function(){var testCountry=$.getURLParameter("testCountry");if(testCountry!=""){tntGeocountry=testCountry;}
if(typeof tntGeocountry!=='undefined'){if(tntGeocountry!=""){var newGeocountry=tntGeocountry.replace(/[^A-Za-z]+/g,'');var fileName="/etc/pagetables/georouting_ip/us_"+newGeocountry+".modal.html";$.ajax({url:fileName,type:'HEAD',success:function(){$.cookies.set('georouting_presented','true',{domain:'adobe.com',hoursToLive:720});(function($){adobe.fn.openModal({width:"auto",height:"auto",target:"georouting_modal-ui",href:fileName,title:""});})(jQuery);}});}}};
adobe.fn.initGlobalFooter=function(){var countryCode=$.cookies.get('international');if(countryCode){$('#sfRegionSet').show();$('#sfRegion').hide();}
else{$('#sfRegionSet').hide();$('#sfRegion').show();}
if(isDesktop()){$('#RegionPanel').bind("clickoutside focusout",function(){$('#RegionPanel').hide();});$('#sfRegion, #sfRegionChange, #sfRegionClose').bind("click",function(){$('#RegionPanel').toggle();if($('#SiteHeader')!=null){$('#WelcomePanel').hide();$('#WelcomePanelShadow').hide();}
return false;});}};
adobe.fn.initGlobalNav=function(){if(!$('#SiteHeader').length){return;}
var screenName=$('#screenName');IMS_SCOPE="AdobeID,openid,sao.creative_cloud";IMS_AUTH_ENDPOINT=null;IMS_LOGOUT_ENDPOINT=null;IMS_AUTH_CHECK_ENDPOINT=null;IMS_CLIENT_ID=null;if(screenName){WCDServerPresent=$.cookies.get('WCDServer'),RengaRMTPresent=$.cookies.get('RengaRMT'),RmPresent=$.cookies.get('rm'),hostIMSValue=$.cookies.get("gnavHostIMS"),hostIDPValue=$.cookies.get("gnavHostIDP"),clientIDValue=$.cookies.get("gnavClientID");if((hostIMSValue)&&(hostIDPValue)&&(clientIDValue)){IMS_AUTH_ENDPOINT="https://"+hostIMSValue+"/authorize";IMS_LOGOUT_ENDPOINT="https://"+hostIDPValue+"/ims/logout/v1/token";IMS_AUTH_CHECK_ENDPOINT="https://"+hostIDPValue+"/ims/check/v1/token";IMS_CLIENT_ID=clientIDValue;}
if((WCDServerPresent)||(RengaRMTPresent)||(RmPresent)){if((IMS_AUTH_CHECK_ENDPOINT)&&(IMS_CLIENT_ID)){adobe.fn.gnavGetUserName();}
else{adobe.fn.gnavGetIMSInfo();}}
else{adobe.fn.gnavGetSecureCookies();}}
$('#search-input').autofill();$('#globalnav-search').bind('submit',function(){var searchText=$('#search-input').val();if(searchText==""||searchText==null){$('#search-input').blur();return false;}});var signInHREF=$('#shSignIn').attr('href');if($.string(signInHREF).include('?')){signInHREF=signInHREF+"&returnURL="+window.location;}else{signInHREF=signInHREF+"?returnURL="+window.location;}
$('#shSignIn').attr('href',signInHREF);$('#shSignOut, #shSignOutMobile').bind('click',function(){if((IMS_LOGOUT_ENDPOINT)&&(IMS_CLIENT_ID)&&(IMS_SCOPE)){$.ajax({url:IMS_LOGOUT_ENDPOINT,data:{client_id:IMS_CLIENT_ID,scope:IMS_SCOPE},dataType:'jsonp'}).done(function(){if(typeof CQ_Analytics!='undefined'){if(typeof CQ_Analytics.ClientContext!='undefined'){CQ_Analytics.ClientContext.clear();}}
$('#shWelcome').hide();$('#shSignInBlock').show();$('#shSignOutMobile').hide();$('#shSignInMobile').show();$.cookies.del('AUID',{domain:'adobe.com'});$.cookies.del('SCREENNAME',{domain:'adobe.com'});var checkURL=window.location.pathname;var geoArray=["africa","ap","at","au","be_en","be_fr","be_nl","bg","br","ca","ca_fr","ch_de","ch_fr","ch_it","cn","cz","de","dk","eeurope","ee","es","fi","fr","hk_en","hk_zh","hr","hu","ie","il_en","il_he","in","it","jp","kr","la","lt","lu_de","lu_en","lu_fr","lv","mena_ar","mena_en","mena_fr","mx","nl","no","nz","pl","pt","ro","ru","si","se","sea","sk","tr","tw","ua","uk"];$.each(geoArray,function(){if($.string(checkURL).startsWith('/'+this+'/')){checkURL=checkURL.replace('/'+this+'/','/');return false;}});if($.string(checkURL).startsWith('/account')){window.location.reload();}});return false;}});if(isDesktop()){var onDiv=false;var onLink=false;var bubbleExists=false;var timeoutID;function addBubbleMouseover(){$("#MyCartLinkContainer").hover(function(event){if(onDiv||onLink){return false;}
onLink=true;showBubble.call(this,event);},function(event){onLink=false;timeoutID=setTimeout(hideBubble,1000);});}
function hideBubble(){clearTimeout(timeoutID);if(bubbleExists&&!onDiv){$("#CartPanelShadow").fadeOut();bubbleExists=false;$("#MyCartLinkContainer").removeClass("MouseOverHoverCart");enableBodyClick();}}
function showBubble(event){if(bubbleExists){hideBubble();}
var cart=Adobe.Cart.Models.Cart;var itemCount=cart.getInstance().itemCount;if(itemCount>0){if(!cart.modelInSync()){cart.getCart({});}
var ipWidth=485;var ipCartLinkWidth=$('.SiteHeaderCart').width();var cartlinkpos=$('.SiteHeaderCart').position().left;var cartposdiff=ipWidth-ipCartLinkWidth;var cartpos=cartlinkpos-cartposdiff+50;$('#CartPanelShadow').css('left',cartpos+'px').show();if($('#SiteFooter')!=null){$('#RegionPanel').hide();}
enableCartPanel();}
$('#CartPanel').hover(function keepBubbleOpen(){onDiv=true;},function letBubbleClose(event){onDiv=false;hideBubble();});bubbleExists=true;$("#MyCartLinkContainer").addClass("MouseOverHoverCart");}
function keepBubbleOpen(){onDiv=true;}
function letBubbleClose(event){onDiv=false;hideBubble();}
function enableBodyClick(){$('body').click(function(){$('#CartPanelShadow').hide();});}
function enableCartPanel(){$('#CartPanel').click(function(event){event.stopPropagation();});}
addBubbleMouseover();function equalizeHeights(divsToSize){tallestDivHeight=0;divsToSize.each(function(){divHeight=$(this).height();if(divHeight>tallestDivHeight){tallestDivHeight=divHeight;}});divsToSize.height(tallestDivHeight);}
equalizeHeights($("div.SiteHeaderShadowLeft"));}
$('#shProductsLink, #shProducts').bind("touchstart touchend",function(){$('#ProductsPanel').hide();window.location=$('a#shProductsLink').attr("href");return false;});$('#shBusinessSolutionsLink, #shBusinessSolutions').bind("touchstart touchend",function(){$('#BusinessSolutionsPanel').hide();window.location=$('a#shBusinessSolutionsLink').attr("href");return false;});$('#shSupportLearningLink, #shSupportLearning').bind("touchstart touchend",function(){$('#SupportLearningPanel').hide();window.location=$('a#shSupportLearningLink').attr("href");return false;});$('#shDownloadLink, #shDownload').bind("touchstart touchend",function(){$('#DownloadPanel').hide();window.location=$('a#shDownloadLink').attr("href");return false;});$('#shCompanyLink, #shCompany').bind("touchstart touchend",function(){$('#CompanyPanel').hide();window.location=$('a#shCompanyLink').attr("href");return false;});$('#shBuyLink, #shBuy').bind("touchstart touchend",function(){$('#BuyPanel').hide();window.location=$('a#shBuyLink').attr("href");return false;});var dispatcher=adobe.vrbl("reflowDispatcher");if(dispatcher){if(dispatcher.hasLayoutEvent("phone")&&dispatcher.getLayoutEvent("phone").active){setupSiteHeaderMobile();}else{var isSetForMobile=false;$(document).bind("adobe.reflow.LayoutChange",function(event,layoutEvent){if(layoutEvent.name=="phone"&&layoutEvent.active&&!isSetForMobile){isSetForMobile=true;setupSiteHeaderMobile();$(document).unbind("adobe.reflow.LayoutChange",setupSiteHeaderMobile);}});}}else{setupSiteHeaderMobile();}
function setupSiteHeaderMobile(){$('#search-input-mobile').autofill();var gnWidth=$('#SiteHeaderMobile').width();$('#shBarExtend').width(gnWidth-39);$('#search-input-mobile').width(gnWidth-79);$('#shProductsMobileSpan, #shProductsMobile').bind("click",function(){window.location=$('a#shProductsMobile').attr("href");return false;});$('#shSectionsSolutionsMobile').bind("click",function(){window.location=$('a#shSectionsSolutionsMobile').attr("href");return false;});$('#shSectionsCompanyMobile').bind("click",function(){window.location=$('a#shSectionsCompanyMobile').attr("href");return false;});$('#shSectionsHelpMobile').bind("click",function(){window.location=$('a#shSectionsHelpMobile').attr("href");return false;});$('#shSectionsLearningMobile').bind("click",function(){window.location=$('a#shSectionsLearningMobile').attr("href");return false;});$('#shSectionsMobile, #shSectionsMobileSpan').bind("click",function(){if($('#shBarExtendSections').css("display")=='none'){$('#shBarExtendSections').show();$('#shBarExtendSearch').hide();$('#shBarExtend').addClass('SiteHeaderBarMobileExtendBottomBorder');$('#shSectionsMobileSpan').addClass('SiteHeaderBarItemMobileActive');$('#shSearchMobileSpan').removeClass('SiteHeaderBarItemMobileActive');}else{$('#shBarExtendSections').hide();$('#shBarExtend').removeClass('SiteHeaderBarMobileExtendBottomBorder');$('#shSectionsMobileSpan').removeClass('SiteHeaderBarItemMobileActive');}
return false;});$('#shSearchMobile, #shSearchMobileSpan').bind("click",function(){if($('#shBarExtendSearch').css("display")=='none'){$('#shBarExtendSearch').show();$('#shBarExtendSections').hide();$('#shBarExtend').addClass('SiteHeaderBarMobileExtendBottomBorder');$('#shSearchMobileSpan').addClass('SiteHeaderBarItemMobileActive');$('#shSectionsMobileSpan').removeClass('SiteHeaderBarItemMobileActive');$('#search-input-mobile').autofill();}else{$('#shBarExtendSearch').hide();$('#shBarExtend').removeClass('SiteHeaderBarMobileExtendBottomBorder');$('#shSearchMobileSpan').removeClass('SiteHeaderBarItemMobileActive');}
return false;});$('#shSectionsMobileSpan').bind("clickoutside",function(el){if($('#shBarExtendSearch').css("display")=='none'){if((el.target.id!="shBarExtendSections")&&(el.target.id!="shBarExtendSections1")&&(el.target.id!="shBarExtendSections2")&&(el.target.id!="shBarExtend")){$('#shSectionsMobileSpan').removeClass('SiteHeaderBarItemMobileActive');$('#shBarExtend').removeClass('SiteHeaderBarMobileExtendBottomBorder');$('#shBarExtendSections').hide();}}});$('#shSearchMobileSpan').bind("clickoutside",function(el){if($('#shBarExtendSections').css("display")=='none'){if((el.target.id!="search-input-mobile")&&(el.target.id!="shBarExtendSearch")&&(el.target.id!="shBarExtend")){$('#shSearchMobileSpan').removeClass('SiteHeaderBarItemMobileActive');$('#shBarExtend').removeClass('SiteHeaderBarMobileExtendBottomBorder');$('#shBarExtendSearch').hide();}}});$('#globalnav-search-mobile').bind('submit',function(){var searchText=$('#search-input-mobile').val();if(searchText==""||searchText==null){$('#search-input-mobile').blur();return false;}});}};adobe.fn.gnavGetSecureCookies=function(){$.ajax({url:'https://verify.adobe.com/ssocheck/',dataType:'jsonp',jsonp:false,jsonpCallback:"parseSSOData"}).done(function(response){if("hasSSOCookie"in response){hasSSOCookieValue=response.hasSSOCookie;if(hasSSOCookieValue==true){if((IMS_AUTH_CHECK_ENDPOINT)&&(IMS_CLIENT_ID)){adobe.fn.gnavGetUserName();}
else{adobe.fn.gnavGetIMSInfo();}}}});}
adobe.fn.gnavGetIMSInfo=function(){var adobe_host=window.location.hostname,confURL="https://www.adobe.com/svcs/configurations/clients/adobedotcomIMS/client_aliases/adobedotcom?landscape="+adobe_host;if(($.string(adobe_host).include('stage'))||($.string(adobe_host).include('dev'))||($.string(adobe_host).include('qa'))){var confURL="/svcs/configurations/clients/adobedotcomIMS/client_aliases/adobedotcom?landscape="+adobe_host;}
$.ajax({url:confURL,dataType:'jsonp'}).done(function(response){if(response.configurations.clients[0].client_aliases.properties){var properties={},result={},propertiesRoot=response.configurations.clients[0].client_aliases.properties;for(var i=0;i<propertiesRoot.length;i++){properties[propertiesRoot[i].key]=propertiesRoot[i].value;}
result.attributes=properties;if((result.attributes.imsHost)&&(result.attributes.idpHost)&&(result.attributes.actualClient)){$.cookies.set('gnavHostIMS',result.attributes.imsHost,{domain:'adobe.com',hoursToLive:0});$.cookies.set('gnavHostIDP',result.attributes.idpHost,{domain:'adobe.com',hoursToLive:0});$.cookies.set('gnavClientID',result.attributes.actualClient,{domain:'adobe.com',hoursToLive:0});IMS_AUTH_ENDPOINT="https://"+result.attributes.imsHost+"/authorize";IMS_LOGOUT_ENDPOINT="https://"+result.attributes.idpHost+"/ims/logout/v1/token";IMS_AUTH_CHECK_ENDPOINT="https://"+result.attributes.idpHost+"/ims/check/v1/token";IMS_CLIENT_ID=result.attributes.actualClient;adobe.fn.gnavGetUserName();}}});}
adobe.fn.gnavGetUserName=function(){$.ajax({url:IMS_AUTH_CHECK_ENDPOINT,data:{client_id:IMS_CLIENT_ID,scope:IMS_SCOPE},dataType:'jsonp'}).done(function(response){if("displayName"in response){if(typeof CQ_Analytics!='undefined'){var yodaStore=CQ_Analytics.ClientContext.get("yoda");if(yodaStore){var serviceData={};if("serviceAccounts"in response){if(typeof response.serviceAccounts[0]!="undefined"){var servicesResponse=response.serviceAccounts[0];if("serviceCode"in servicesResponse){yodaStore.setProperty("serviceCode",servicesResponse.serviceCode);}
if("serviceStatus"in servicesResponse){yodaStore.setProperty("serviceStatus",servicesResponse.serviceStatus);}
if("serviceLevel"in servicesResponse){yodaStore.setProperty("serviceLevel",servicesResponse.serviceLevel);}}
else{yodaStore.setProperty("serviceCode","creative_cloud");yodaStore.setProperty("serviceStatus","NOTACTIVE");yodaStore.setProperty("serviceLevel","NONE");}}
else{yodaStore.setProperty("serviceCode","creative_cloud");yodaStore.setProperty("serviceStatus","NOTACTIVE");yodaStore.setProperty("serviceLevel","NONE");}}}
gnavUserDisplayName=response.displayName;$('#screenName').text(gnavUserDisplayName);$('#screenName').trigger("screenNameChange")
$('#shWelcome').show();$('#shSignInBlock').hide();$('#shSignOutMobile').show();$('#shSignInMobile').hide();}
else{$('#shWelcome').hide();$('#shSignInBlock').show();$('#shSignOutMobile').hide();$('#shSignInMobile').show();}});}
adobe.fn.initGlobalNavAccessibility=function()
{var timeoutInt,focusTimeoutInt,hoverTimeoutInt,tooltipTimeout,flagMouseOver=false,flagEscKey=false,siteHeaderBar,siteHeaderBarDivs,siteHeaderBarItems,siteHeaderDropdownLinks,siteHeaderDropPanels,siteHeaderRows,siteHeaderPanelLinks,siteHeaderLinks,tooltipStringExpandMenu,tooltipStringOpenLink,searchDiv,searchInput,searchInputMobile,shInfo,infoPanel,infoPanelShadow,shSignOutLink,shWelcome,welcomePanel,welcomePanelShadow,welcomeTimeoutId,mirror,keyCodeMap={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"},init=function()
{mirror=hasClass(document.body,"Mirror");siteHeader=document.getElementById("SiteHeader");siteHeaderBar=document.getElementById("shBar");siteHeaderBarDivs=siteHeaderBar.getElementsByTagName("DIV");siteHeaderBarItems=getElementsByClassName(siteHeaderBar,"SiteHeaderBarItem");siteHeaderDropdownLinks=getElementsByClassName(siteHeaderBar,"SiteHeaderDropdownLink");siteHeaderDropPanels=getElementsByClassName(siteHeaderBar,"SiteHeaderDropPanel");siteHeaderRows=getElementsByClassName(siteHeaderBar,"SiteHeaderRow");searchDiv=document.getElementById("site-search");searchInput=document.getElementById("search-input");searchDivMobile=document.getElementById("shBarExtendSearch");searchInputMobile=document.getElementById("search-input-mobile");siteHeaderLinks=siteHeaderBar.getElementsByTagName("A");shInfo=document.getElementById("shInfo");infoPanel=document.getElementById("InfoPanel");infoPanelShadow=document.getElementById("InfoPanelShadow");shSignOutLink=document.getElementById("shSignOutLink");shWelcome=document.getElementById("shWelcome");welcomePanel=document.getElementById("WelcomePanel");welcomePanelShadow=document.getElementById("WelcomePanelShadow");if(welcomePanel)welcomePanelLinks=welcomePanel.getElementsByTagName("A");tooltipStringExpandMenu=document.getElementById("tooltipStringExpandMenu");if(tooltipStringExpandMenu)tooltipStringExpandMenu=tooltipStringExpandMenu.innerHTML;tooltipStringOpenLink=document.getElementById("tooltipStringOpenLink");if(tooltipStringOpenLink)tooltipStringOpenLink=tooltipStringOpenLink.innerHTML;var obj,i;if(navigator.platform.indexOf("Win")!=-1)addClass(siteHeaderBar,"os-windows");siteHeader.setAttribute('role','navigation');for(i=0;i<siteHeaderBarDivs.length;i++)
{obj=siteHeaderBarDivs[i];obj.setAttribute('role','presentation');}
for(i=0;i<siteHeaderBarItems.length;i++)
{obj=siteHeaderBarItems[i];obj['data-index']=i;}
for(i=0;i<siteHeaderDropdownLinks.length;i++)
{obj=siteHeaderDropdownLinks[i];obj['data-index']=i;}
for(i=0;i<siteHeaderDropPanels.length;i++)
{obj=siteHeaderDropPanels[i];obj.setAttribute('aria-hidden','true');addClass(obj,'SiteHeaderDropPanelHidden');obj['data-index']=i;addEvent(obj,'mouseover',mouseOverHandler);addEvent(obj,'mouseout',mouseOutHandler);setLinkTabIndexes(obj,"-1");}
for(i=0;i<siteHeaderLinks.length;i++)
{obj=siteHeaderLinks[i];obj['data-index']=i;if(obj.tabIndex===null)
{obj.tabIndex=(hasClass(obj.parentNode,'SiteHeaderPanelHeader')||hasClass(obj.parentNode,'SiteHeaderPanelRow')||hasClass(obj.parentNode,'SiteHeaderPanelLink'))?'-1':'0';obj.setAttribute('tabindex',obj.tabIndex);}
if(hasClass(obj.parentNode,'SiteHeaderDropdownLink'))
{obj.setAttribute('aria-haspopup','true');obj.setAttribute('aria-expanded','false');obj.setAttribute('aria-owns',siteHeaderDropPanels[obj.parentNode['data-index']].id);obj.setAttribute('aria-controls',siteHeaderDropPanels[obj.parentNode['data-index']].id);}
addEvent(obj,'focus',focusHandler);addEvent(obj,'blur',blurHandler);addEvent(obj,'mouseover',mouseOverHandler);addEvent(obj,'mouseout',mouseOutHandler);addEvent(obj,'keydown',keyDownHandler);addEvent(obj,'click',clickHandler);}
if(shInfo&&infoPanel)
{shInfo.setAttribute('href','#InfoPanel');shInfo.setAttribute('aria-describedby','InfoPanel');infoPanel.setAttribute('role','tooltip');infoPanel.style.display="none";infoPanel.setAttribute('aria-hidden','true');infoPanel.tabIndex='-1';if(infoPanelShadow)infoPanelShadow.style.display="none";addEvent(shInfo,"mouseover",shInfo_mouseOverHandler);addEvent(shInfo,"mouseout",shInfo_mouseOutHandler);addEvent(shInfo,"focus",shInfo_focusHandler);addEvent(shInfo,"blur",shInfo_blurHandler);addEvent(shInfo,"click",shInfo_clickHandler);}
if(shWelcome&&welcomePanel)
{shWelcome.setAttribute('aria-haspopup','true');shWelcome.setAttribute('aria-owns','WelcomePanel');welcomePanel.setAttribute('role','menu');welcomePanel.style.display="none";welcomePanelShadow.style.display="none";addEvent(shWelcome,'focus',shWelcome_focusHandler);addEvent(shWelcome,'blur',shWelcome_blurHandler);addEvent(shWelcome,'mouseover',shWelcome_mouseOverHandler);addEvent(shWelcome,'mouseout',shWelcome_mouseOutHandler);addEvent(shWelcome,'keydown',shWelcome_keyDownHandler);addEvent(shWelcome,'click',shWelcome_clickHandler);addEvent(shWelcome,'contextmenu',shWelcome_contextMenuHandler);addEvent(welcomePanel,'mouseover',shWelcome_mouseOverHandler);addEvent(welcomePanel,'mouseout',shWelcome_mouseOutHandler);addEvent(shSignOutLink,'click',shWelcome_hidePanel);for(i=0;i<welcomePanelLinks.length;i++)
{obj=welcomePanelLinks[i];obj.setAttribute('role','menuitem');obj['data-index']=i;obj.tabIndex='-1';addEvent(obj,'focus',shWelcome_focusHandler);addEvent(obj,'blur',shWelcome_blurHandler);addEvent(obj,'mouseover',shWelcome_mouseOverHandler);addEvent(obj,'mouseout',shWelcome_mouseOutHandler);addEvent(obj,'keydown',shWelcome_keyDownHandler);addEvent(obj,'contextmenu',shWelcome_contextMenuHandler);}}
if(searchDiv&&searchInput)
{searchDiv.setAttribute('role','search');searchInput.setAttribute('aria-label','Search');}
if(searchDivMobile&&searchInputMobile)
{searchDivMobile.setAttribute('role','search');searchInputMobile.setAttribute('aria-label','Search');}},shWelcome_contextMenuHandler=function(event)
{event.preventDefault();event.stopPropagation();return false;},shWelcome_mouseOverHandler=function(event)
{clearTimeout(welcomeTimeoutId);clearToolTip();hideAndShowSubmenus(this||event.target,'closeall');shWelcome_showPanel();},shWelcome_mouseOutHandler=function(event)
{clearTimeout(welcomeTimeoutId);if(document.activeElement!=shWelcome)
{var welcomePanelLink,i;for(i=0;i<welcomePanelLinks.length;i++)
{if(document.activeElement==welcomePanelLinks[i])
return true;}
welcomeTimeoutId=setTimeout(shWelcome_hidePanel,450);}},shWelcome_focusHandler=function(event)
{clearTimeout(welcomeTimeoutId);clearToolTip();hideAndShowSubmenus(this||event.target,'closeall');shWelcome_showPanel();},shWelcome_blurHandler=function(event)
{clearTimeout(welcomeTimeoutId);if(document.activeElement!=shWelcome)
{var welcomePanelLink,i;for(i=0;i<welcomePanelLinks.length;i++)
{if(document.activeElement==welcomePanelLinks[i])
return true;}
welcomeTimeoutId=setTimeout(shWelcome_hidePanel,450);}},shWelcome_keyDownHandler=function(event)
{var node,links,start,j,a,label,candidate,found=false,beforeLink=true;switch(event.keyCode)
{case 38:{event.preventDefault();if(this==shWelcome)
{shWelcome_hidePanel();}else{node=nextTabbableElement(this,true,true);if(node){node.focus();if(node==shWelcome)
{shWelcome_hidePanel();}}}
break;}
case 40:{event.preventDefault();shWelcome_showPanel();node=nextTabbableElement(this,false,true);if(node)
{if(node.parentNode.parentNode!=welcomePanel)
{welcomePanelLinks[0].focus();}else
{node.focus();}}
break;}
case 32:{event.preventDefault();event.stopPropagation();if(event.ctrlKey)
{shWelcome_showPanel();if(this==shWelcome)
{welcomePanelLinks[0].focus();}
return false;}else{shWelcome_hidePanel();window.open(this.href,(this.target||"_self"));return false;}
break;}
case 121:{if(event.ctrlKey)
{event.preventDefault();shWelcome_showPanel();if(this==shWelcome)
welcomePanelLinks[0].focus();return false;}
break;}
default:{links=welcomePanelLinks;var start=0;for(j=0;j<links.length;j++){a=links[j];if(a==this){start=j;break;}}
for(j=start+1;j<links.length;j++){a=links[j];label=a.innerText||a.textContent;if(label.substring(0,1).toLowerCase()==keyCodeMap[event.keyCode]){a.focus();found=true;break;}}
if(!found){for(j=0;j<start;j++){a=links[j];label=a.innerText||a.textContent;if(label.substring(0,1).toLowerCase()==keyCodeMap[event.keyCode]){a.focus();break;}}}
break;}}},shWelcome_clickHandler=function(event)
{event.preventDefault();event.stopPropagation();clearToolTip();hideAndShowSubmenus(this||event.target,'closeall');shWelcome_showPanel();welcomePanelLinks[0].focus();return false;},shWelcome_hidePanel=function()
{clearTimeout(welcomeTimeoutId);welcomePanel.style.display='none';welcomePanel.setAttribute('aria-hidden','true');welcomePanelShadow.style.display='none';removeEvent(document,'keydown',shWelcome_escapeKeyHandler);},shWelcome_showPanel=function()
{clearTimeout(welcomeTimeoutId);welcomePanel.style.display='block';welcomePanel.setAttribute('aria-hidden','false');welcomePanelShadow.style.width=(welcomePanel.clientWidth)+'px';welcomePanelShadow.style.height=(welcomePanel.clientHeight)+'px';welcomePanelShadow.style.display='block';addEvent(document,'keydown',shWelcome_escapeKeyHandler);},shWelcome_escapeKeyHandler=function(event){if(event.keyCode==27)
{if(document.activeElement!=shWelcome)
{var welcomePanelLink,i;for(i=0;i<welcomePanelLinks.length;i++)
{if(document.activeElement==welcomePanelLinks[i])
{shWelcome.focus();break;}}}
shWelcome_hidePanel();}},shInfo_mouseOverHandler=function(event)
{clearToolTip();hideAndShowSubmenus(this||event.target,'closeall');shInfo_showPanel();},shInfo_mouseOutHandler=function(event)
{shInfo_hidePanel();},shInfo_focusHandler=function(event)
{clearToolTip();hideAndShowSubmenus(this||event.target,'closeall');shInfo_showPanel();},shInfo_blurHandler=function(event)
{shInfo_hidePanel();},shInfo_clickHandler=function(event)
{clearToolTip();hideAndShowSubmenus(this||event.target,'closeall');shInfo_showPanel();event.preventDefault();return false;},shInfo_hidePanel=function()
{infoPanel.style.display='none';infoPanel.setAttribute('aria-hidden','true');infoPanelShadow.style.display='none';removeEvent(document,'keydown',shInfo_escapeKeyHandler);},shInfo_showPanel=function()
{infoPanel.style.display='block';infoPanel.setAttribute('aria-hidden','false');infoPanelShadow.style.height=(infoPanel.clientHeight)+'px';infoPanelShadow.style.display='block';addEvent(document,'keydown',shInfo_escapeKeyHandler);},shInfo_escapeKeyHandler=function(event){if(event.keyCode==27)
shInfo_hidePanel();},hideAndShowSubmenus=function(eventTarget,eventType)
{var siteHeaderDropdownLink=getClosestSiteHeaderDropdownLink(eventTarget),current,currentDropPanel,i,ariaHidden;if(eventType=='mouseover'&&hasClass(eventTarget,'SiteHeaderBarLink')&&hasClass(siteHeaderBar,'SiteHeaderBarFocus'))
{flagMouseOver=true;flagEscKey=false;addClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen');siteHeaderDropdownLink.getElementsByTagName('A')[0].setAttribute('aria-expanded','true');eventTarget.focus();eventTarget.removeAttribute("title");return;}else if(eventType=='mouseout')
{flagMouseOver=false;}
for(i=0;i<siteHeaderDropdownLinks.length;i++)
{current=siteHeaderDropdownLinks[i];currentDropPanel=siteHeaderDropPanels[i];if(current!=siteHeaderDropdownLink||eventType=='blur')
{removeClass(current,'SiteHeaderBarItemHover');if(current.getElementsByTagName('A')[0]!=document.activeElement)
{removeClass(current,'SiteHeaderBarItemFocus');}
currentDropPanel.setAttribute('aria-hidden','true');current.getElementsByTagName('A')[0].setAttribute('aria-expanded','false');if(eventType=='focus'||eventType=='closeall')
{addClass(currentDropPanel,'SiteHeaderDropPanelHidden');removeClass(current,'SiteHeaderBarItemOpen');setLinkTabIndexes(currentDropPanel,"-1");}}else if(eventType=='mouseout')
{ariaHidden=(siteHeaderDropdownLink&&document.activeElement&&siteHeaderDropdownLink==getClosestSiteHeaderDropdownLink(document.activeElement)&&!hasClass(currentDropPanel,'SiteHeaderDropPanelHidden'))?'false':'true';currentDropPanel.setAttribute('aria-hidden',ariaHidden);current.getElementsByTagName('A')[0].setAttribute('aria-expanded',!ariaHidden);if(ariaHidden=='true')
{removeClass(current,'SiteHeaderBarItemFocus');removeClass(current,'SiteHeaderBarItemHover');removeClass(current,'SiteHeaderBarItemOpen');addClass(currentDropPanel,'SiteHeaderDropPanelHidden');setLinkTabIndexes(currentDropPanel,"-1");}}else
{addClass(current,'SiteHeaderBarItemHover');addClass(current,'SiteHeaderBarItemFocus');if(!hasClass(eventTarget,'SiteHeaderBarLink'))
{addClass(current,'SiteHeaderBarItemOpen');}
if(!flagEscKey&&(eventType==='focus'&&current===siteHeaderDropdownLink&&hasClass(current,'SiteHeaderBarItemOpen'))||eventType==='mouseover')
{currentDropPanel.setAttribute('aria-hidden','false');removeClass(currentDropPanel,'SiteHeaderDropPanelHidden');addClass(current,'SiteHeaderBarItemOpen');setLinkTabIndexes(current,"0");current.getElementsByTagName('A')[0].setAttribute('aria-expanded','true');}}}
if(eventType=='focus')
{addClass(siteHeaderBar,'SiteHeaderBarFocus');if(hasClass(eventTarget,'SiteHeaderBarLink'))
{if(hasClass(eventTarget,'SiteHeaderBarItem'))
{addClass(eventTarget,'SiteHeaderBarItemFocus');}}
flagKeyboardNavigation(true);flagEscKey=false;}else if(eventType=='blur')
{removeClass(siteHeaderBar,'SiteHeaderBarFocus');if(hasClass(eventTarget,'SiteHeaderBarItem')&&hasClass(eventTarget,'SiteHeaderBarLink'))
{removeClass(eventTarget,'SiteHeaderBarItemFocus');}}},focusHandler=function(event)
{clearTimeout(focusTimeoutInt);clearToolTip();var scope=this,siteHeaderDropdownLink=getClosestSiteHeaderDropdownLink(this),eventType=event.type||'focus';if(siteHeaderDropdownLink===scope.parentNode&&siteHeaderDropdownLink===siteHeaderDropdownLinks[0])
{if(!hasClass(siteHeaderDropdownLink,"SiteHeaderBarItemOpen")&&tooltipStringExpandMenu)
{scope.setAttribute("title",tooltipStringExpandMenu);}else if(tooltipStringOpenLink)
{scope.setAttribute("title",tooltipStringOpenLink);}else
{scope.removeAttribute("title");}}
if(this.getAttribute("title")&&!flagMouseOver)
{tooltipTimeout=setTimeout(function(){addToolTip(scope);},450);}
if(hasClass(scope.parentNode,"SiteHeaderDropdownLink"))
{if(hasClass(siteHeaderBar,"SiteHeaderBarKeyboardNavigation"))
{hideAndShowSubmenus(scope,eventType);return;}
focusTimeoutInt=setTimeout(function(){clearTimeout(focusTimeoutInt);hideAndShowSubmenus(scope,eventType);},100);return;}
if(hasClass(scope.parentNode,"SiteHeaderPanelLink"))
{addClass(scope.parentNode,"SiteHeaderPanelLinkHover");}else if(hasClass(scope.parentNode.parentNode,"SiteHeaderPanelLink"))
{addClass(scope.parentNode.parentNode,"SiteHeaderPanelLinkHover");}
hideAndShowSubmenus(scope,eventType);},blurHandler=function(event)
{clearTimeout(focusTimeoutInt);var scope=this,eventType=event.type||'blur';if(hasClass(scope.parentNode,"SiteHeaderDropdownLink"))
{focusTimeoutInt=setTimeout(function(){clearTimeout(focusTimeoutInt);clearToolTip();scope.removeAttribute("title");removeClass(scope.parentNode,"SiteHeaderBarItemOpen");hideAndShowSubmenus(scope,eventType);},99);return;}
clearToolTip();if(hasClass(scope.parentNode,"SiteHeaderPanelLink"))
{removeClass(scope.parentNode,"SiteHeaderPanelLinkHover");}else if(hasClass(scope.parentNode.parentNode,"SiteHeaderPanelLink"))
{removeClass(scope.parentNode.parentNode,"SiteHeaderPanelLinkHover");}
hideAndShowSubmenus(scope,eventType);},mouseOverHandler=function(event)
{clearTimeout(hoverTimeoutInt);clearToolTip();var scope=this,eventType=event.type||'mouseover';if(hasClass(scope.parentNode,"SiteHeaderDropdownLink"))
{scope.removeAttribute("title");}
hideAndShowSubmenus(scope,eventType);if(hasClass(scope.parentNode.parentNode,"SiteHeaderPanelLink"))
{addClass(scope.parentNode.parentNode,"SiteHeaderPanelLinkHover");}},mouseOutHandler=function(event)
{clearTimeout(hoverTimeoutInt);clearToolTip();var scope=this,eventType=event.type||'mouseout';if(hasClass(scope.parentNode.parentNode,"SiteHeaderPanelLink")&&document.activeElement!=scope)
{removeClass(scope.parentNode.parentNode,"SiteHeaderPanelLinkHover");}
hoverTimeoutInt=setTimeout(function(){clearTimeout(hoverTimeoutInt);hideAndShowSubmenus(scope,eventType);},500);},keyDownHandler=function(event)
{var siteHeaderDropdownLink=getClosestSiteHeaderDropdownLink(this),node,nodeHeaderDropdownLink,links,i;flagEscKey=false;switch(event.keyCode)
{case 9:{flagKeyboardNavigation(true);if(hasClass(siteHeaderDropdownLink,"SiteHeaderBarItemOpen"))
{node=nextTabbableElement(this,event.shiftKey,true);if(node)
{nodeHeaderDropdownLink=getClosestSiteHeaderDropdownLink(node);if(siteHeaderDropdownLink&&nodeHeaderDropdownLink!==siteHeaderDropdownLink)
{event.preventDefault();removeClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen');setLinkTabIndexes(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],"-1");if(nodeHeaderDropdownLink)
{addClass(nodeHeaderDropdownLink,'SiteHeaderBarItemOpen');}
node.focus();return false;}}}
break;}
case 37:case 39:{event.preventDefault();if((event.keyCode==37&&!mirror)||(event.keyCode==39&&mirror))
{flagKeyboardNavigation(true);if(hasClass(this.parentNode.parentNode.parentNode,"SiteHeaderColumn-2"))
{var nextHeaderColumn=(mirror)?nextElementSibling(this.parentNode.parentNode.parentNode):previousElementSibling(this.parentNode.parentNode.parentNode);if(nextHeaderColumn)
{nextHeaderColumn.getElementsByTagName("A")[0].focus();}
return;}
var nextSiteHeaderRow=getNextSiteHeaderRow(this,true);if(nextSiteHeaderRow){nextSiteHeaderRow.getElementsByTagName("A")[0].focus();return;}
if(siteHeaderDropdownLink&&siteHeaderDropdownLink!=this.parentNode)
{node=previousElementSibling(siteHeaderDropdownLink);if(node&&hasClass(node,'SiteHeaderDropdownLink'))
{if(hasClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen'))
{addClass(node,'SiteHeaderBarItemOpen')}
node.getElementsByTagName("A")[0].focus();}else
{siteHeaderDropdownLink.getElementsByTagName("A")[0].focus();}}
else
{node=previousElementSibling(this.parentNode===siteHeaderDropdownLink?this.parentNode:this);if(node)
{if(node.nodeName.toLowerCase()=="a")
{node.focus();}
else if(hasClass(node,'SiteHeaderDropdownLink')&&focusable(firstElementChild(node)))
{if(hasClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen'))
{addClass(node,'SiteHeaderBarItemOpen')}
firstElementChild(node).focus();}}else
{i=siteHeaderBarItems.length;while(i>0)
{i--;node=siteHeaderBarItems[i];if(node.nodeName.toLowerCase()=='a'&&focusable(node))
{node.focus();break;}else if(hasClass(node,'SiteHeaderDropdownLink')&&focusable(firstElementChild(node)))
{if(hasClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen'))
{addClass(node,'SiteHeaderBarItemOpen')}
firstElementChild(node).focus();break;};}}}}
else if((event.keyCode==39&&!mirror)||(event.keyCode==37&&mirror))
{flagKeyboardNavigation(true);if(hasClass(this.parentNode.parentNode.parentNode,"SiteHeaderColumn-1"))
{var nextHeaderColumn=(!mirror)?nextElementSibling(this.parentNode.parentNode.parentNode):previousElementSibling(this.parentNode.parentNode.parentNode);if(nextHeaderColumn)
{nextHeaderColumn.getElementsByTagName("A")[0].focus();}
return;}
var nextSiteHeaderRow=getNextSiteHeaderRow(this);if(nextSiteHeaderRow){nextSiteHeaderRow.getElementsByTagName("A")[0].focus();return;}
node=nextElementSibling(siteHeaderDropdownLink||this);if(node)
{if(node.nodeName.toLowerCase()=='a'&&focusable(node))
{node.focus();}
else if(hasClass(node,'SiteHeaderDropdownLink')&&focusable(firstElementChild(node)))
{if(hasClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen'))
{addClass(node,'SiteHeaderBarItemOpen')}
firstElementChild(node).focus();}
else
{i=0;while(i<siteHeaderBarItems.length)
{node=siteHeaderBarItems[i];if(node.nodeName.toLowerCase()=='a'&&focusable(node))
{node.focus();break;}else if(hasClass(node,'SiteHeaderDropdownLink')&&focusable(firstElementChild(node)))
{if(hasClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen'))
{addClass(node,'SiteHeaderBarItemOpen')}
firstElementChild(node).focus();break;}
i++;}}}}
break;}
case 38:{event.preventDefault();clearToolTip();flagKeyboardNavigation(true);if(event.altKey&&siteHeaderDropdownLink)
{hideDropPanelAndFocusSiteHeaderDropdownLink(siteHeaderDropdownLink,false);return;}
node=nextTabbableElement(this,true,true);if(node)
{nodeHeaderDropdownLink=getClosestSiteHeaderDropdownLink(node);if(siteHeaderDropdownLink&&nodeHeaderDropdownLink!==siteHeaderDropdownLink)
{removeClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen');setLinkTabIndexes(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],"-1");if(nodeHeaderDropdownLink)
{addClass(nodeHeaderDropdownLink,'SiteHeaderBarItemOpen');}}
node.focus();}
break;}
case 40:{event.preventDefault();clearToolTip();flagKeyboardNavigation(true);node=nextTabbableElement(this,false,true);if(node)
{nodeHeaderDropdownLink=getClosestSiteHeaderDropdownLink(node);if(siteHeaderDropdownLink&&nodeHeaderDropdownLink!==siteHeaderDropdownLink)
{removeClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen');setLinkTabIndexes(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],"-1");if(nodeHeaderDropdownLink)
{addClass(nodeHeaderDropdownLink,'SiteHeaderBarItemOpen');}}
node.focus();}
break;}
case 27:{event.preventDefault();clearToolTip();hideAndShowSubmenus(this,'focus');flagKeyboardNavigation(false);flagEscKey=true;if(siteHeaderDropdownLink)
{hideDropPanelAndFocusSiteHeaderDropdownLink(siteHeaderDropdownLink,flagEscKey);}
else
{hideAndShowSubmenus(this,'closeall');}
break;}
case 32:case 13:{event.preventDefault();clearToolTip();flagKeyboardNavigation(false);if(siteHeaderDropdownLink)
{if(hasClass(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],'SiteHeaderDropPanelHidden'))
{addClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen');removeClass(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],'SiteHeaderDropPanelHidden');siteHeaderDropPanels[siteHeaderDropdownLink['data-index']].setAttribute('aria-hidden','false');setLinkTabIndexes(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],"0");node=siteHeaderDropdownLink.getElementsByTagName("A")[0];node.setAttribute('aria-expanded','true');if(siteHeaderDropdownLink===siteHeaderDropdownLinks[0])
{if(tooltipStringOpenLink)
{node.setAttribute("title",tooltipStringOpenLink);tooltipTimeout=setTimeout(function(){addToolTip(node);},450);}else
{node.removeAttribute("title");}}}else
{hideDropPanelAndFocusSiteHeaderDropdownLink(siteHeaderDropdownLink,false);window.open(this.href,(this.target||"_self"));}}
break;}
default:{var start,j,a,label,candidate,found=false,beforeLink=true;if(!siteHeaderDropdownLink)return;links=siteHeaderDropdownLink.getElementsByTagName('A');var start=0;for(j=0;j<links.length;j++){a=links[j];if(a==this){start=j;break;}}
for(j=start+1;j<links.length;j++){a=links[j];label=a.innerText||a.textContent;if(label.substring(0,1).toLowerCase()==keyCodeMap[event.keyCode]){a.focus();flagKeyboardNavigation(true);found=true;break;}}
if(!found){for(j=0;j<start;j++){a=links[j];label=a.innerText||a.textContent;if(label.substring(0,1).toLowerCase()==keyCodeMap[event.keyCode]){a.focus();flagKeyboardNavigation(true);break;}}}
break;}}},hideDropPanelAndFocusSiteHeaderDropdownLink=function(siteHeaderDropdownLink,escKey)
{var node;flagEscKey=escKey;removeClass(siteHeaderDropdownLink,'SiteHeaderBarItemOpen');addClass(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],'SiteHeaderDropPanelHidden');siteHeaderDropPanels[siteHeaderDropdownLink['data-index']].setAttribute('aria-hidden','true');setLinkTabIndexes(siteHeaderDropPanels[siteHeaderDropdownLink['data-index']],"-1");node=siteHeaderDropdownLink.getElementsByTagName("A")[0];if(siteHeaderDropdownLink===siteHeaderDropdownLinks[0])
{if(tooltipStringExpandMenu)
{node.setAttribute("title",tooltipStringExpandMenu);tooltipTimeout=setTimeout(function(){addToolTip(node);},450);}else
{node.removeAttribute("title");}}
node.setAttribute('aria-expanded','false');node.focus();flagEscKey=false;},clickHandler=function(event)
{event.stopPropagation();event.preventDefault();event=event||window.event;var scope=event.target;if(scope&&scope.parentNode&&hasClass(scope.parentNode,'SiteHeaderDropdownLink')&&hasClass(siteHeaderDropPanels[scope.parentNode['data-index']],'SiteHeaderDropPanelHidden'))
{clearToolTip();if(scope.parentNode===siteHeaderDropdownLinks[0])
{if(tooltipStringOpenLink)
{scope.setAttribute("title",tooltipStringOpenLink);tooltipTimeout=setTimeout(function(){addToolTip(scope);},450);}else
{scope.removeAttribute("title");}}
scope.setAttribute('aria-expanded','true');addClass(scope.parentNode,'SiteHeaderBarItemOpen');removeClass(siteHeaderDropPanels[scope.parentNode['data-index']],'SiteHeaderDropPanelHidden');siteHeaderDropPanels[scope.parentNode['data-index']].setAttribute('aria-hidden','false');setLinkTabIndexes(siteHeaderDropPanels[scope.parentNode['data-index']],"0");flagKeyboardNavigation(true);}else{var siteHeaderDropdownLink=getClosestSiteHeaderDropdownLink(this);if(siteHeaderDropdownLink)
{hideDropPanelAndFocusSiteHeaderDropdownLink(siteHeaderDropdownLink,false);}
if(event.target){if(hasClass(scope,'SiteHeaderIconNewWindowNoWrap')){window.open(event.target.parentNode.href,(event.target.parentNode.target||"_self"));}
else if(hasClass(scope,'SiteHeaderIconNewWindow')){window.open(event.target.parentNode.parentNode.href,(event.target.parentNode.parentNode.target||"_self"));}
else{window.open(event.target.href,(event.target.target||"_self"));}}
else{if(hasClass(event.srcElement,'SiteHeaderIconNewWindowNoWrap')){window.open(event.srcElement.parentNode.href,(event.srcElement.parentNode.target||"_self"));}
else if(hasClass(event.srcElement,'SiteHeaderIconNewWindow')){window.open(event.srcElement.parentNode.parentNode.href,(event.srcElement.parentNode.parentNode.target||"_self"));}
else{window.open(event.srcElement.href,(event.srcElement.target||"_self"));}}}},mouseMoveHandler=function(event)
{flagKeyboardNavigation(false);},flagKeyboardNavigation=function(bool)
{if(bool)
{addClass(siteHeaderBar,'SiteHeaderBarKeyboardNavigation');addEvent(siteHeaderBar,'mousemove',mouseMoveHandler);addEvent(document.body,"mousedown",bodyClickHandler);}else{removeClass(siteHeaderBar,'SiteHeaderBarKeyboardNavigation');removeEvent(siteHeaderBar,'mousemove',mouseMoveHandler);removeEvent(document.body,"mousedown",bodyClickHandler);}},bodyClickHandler=function(event)
{flagKeyboardNavigation(false);hideAndShowSubmenus(siteHeaderDropdownLinks[0],'closeall');},getClosestSiteHeaderDropdownLink=function(element)
{var siteHeaderBar=document.body,p=element.parentNode;while(p&&p!=siteHeaderBar)
{if(hasClass(p,'SiteHeaderDropdownLink'))
return p;p=p.parentNode;}
return null;},getClosestSiteHeaderRow=function(element)
{var siteHeaderBar=document.body,p=element;while(p&&p!=siteHeaderBar)
{if(hasClass(p,'SiteHeaderRow'))
return p;p=p.parentNode;}
return null;},getNextSiteHeaderRow=function(element,shiftKey)
{var closestSiteHeaderRow=getClosestSiteHeaderRow(element),i,next;if(!closestSiteHeaderRow)return null;for(i=0;i<=siteHeaderRows.length;i++)
{if(closestSiteHeaderRow===siteHeaderRows[i])
break;}
next=(shiftKey)?i-1:i+1;if(next<0||next>siteHeaderRows.length-1)return null;if(getClosestSiteHeaderDropdownLink(siteHeaderRows[next])!=getClosestSiteHeaderDropdownLink(closestSiteHeaderRow))return null;return siteHeaderRows[next];},setLinkTabIndexes=function(element,value)
{var i,ele,elements=element.getElementsByTagName("A");for(i=0;i<elements.length;i++)
{ele=elements[i];if(ele.tabIndex!==null&&ele.tabIndex!=="")
{ele.tabIndex=value;ele.setAttribute('tabindex',value);}}},hasClass=function(element,className)
{var regExp=new RegExp(new RegExp('(\\s*|^)'+className+'(\\s*|$)'));return element.className&&regExp.test(element.className);},addClass=function(element,className)
{if(!hasClass(element,className))element.className+=' '+className;},removeClass=function(element,className)
{if(hasClass(element,className))
{var regExp=new RegExp('^'+className+'(\\s*|$)|\\s*'+className);element.className=element.className.replace(regExp,'');}},getElementsByClassName=function(element,className)
{var a=[],i,ele,elements=element.getElementsByTagName('*');for(i=0;i<elements.length;i++)
{if(hasClass(elements[i],className))a.push(elements[i]);}
return a;},visible=function(element)
{while(element)
{if(element.style&&(element.style.visibility==='hidden'||element.style.display==='none'))
{return false;}
element=element.parentNode;}
return true;},focusable=function(element,isTabIndexNotNaN)
{var nodeName=element.nodeName.toLowerCase(),map,mapName,images,img,i;if('area'===nodeName){map=element.parentNode;mapName=map.name;if(!element.href||!mapName||map.nodeName.toLowerCase()!=='map'){return false;}
images=document.getElementsByTagName('IMG');for(i=0;i<images.length;i++)
{img=images[i];if(img.getAttribute('usemap')==='#'+mapName&&visible(img))
return true;}
return false;}
return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:'a'==nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element);},tabbable=function(element)
{var tabIndex=element.getAttribute('tabindex')?parseInt(element.getAttribute('tabindex')):NaN,isTabIndexNaN=isNaN(tabIndex);return(isTabIndexNaN||tabIndex>=0)&&focusable(element,!isTabIndexNaN);},nextTabbableElement=function(element,shiftKey,includeFocusable)
{var i,allElements=document.body.getElementsByTagName('*'),afterElement=false,candidate,current;for(i=0;i<allElements.length;i++)
{current=allElements.item(i);if(current==element)
{afterElement=true;if(candidate&&shiftKey)return candidate;}
else if((includeFocusable&&focusable(current))||tabbable(current))
{candidate=current;if(afterElement)
{return candidate;}}}},addToolTip=function(element,message)
{clearTimeout(tooltipTimeout);var title=message||element.getAttribute('title');if(title)
{element.removeAttribute('title');var tooltip=document.createElement('div'),tooltipId='tooltip_'+element.getAttribute('id'),tooltipSpan=document.createElement('span'),tooltipText=document.createTextNode(title);tooltip.setAttribute('id',tooltipId);tooltip.setAttribute('role','tooltip');addClass(tooltip,'SiteHeaderBarTooltip');tooltipSpan.appendChild(tooltipText);tooltip.appendChild(tooltipSpan);addEvent(tooltip,'focus',tooltip_focusHandler);element.setAttribute('aria-describedby',tooltipId);element.parentNode.insertBefore(tooltip,element.nextSibling);}},tooltip_focusHandler=function(event)
{var node=nextTabbableElement(event.target,false,true);if(node)node.focus();},clearToolTip=function()
{clearTimeout(tooltipTimeout);var tooltips=getElementsByClassName(document,'SiteHeaderBarTooltip'),j;for(j=0;j<tooltips.length;j++)
{var tooltip=tooltips[j],tooltipId=tooltip.getAttribute('id');element=document.getElementById(tooltipId.substring(8));if(element)
{element.setAttribute('title',tooltip.firstChild.firstChild.nodeValue);element.removeAttribute('aria-describedby');}
removeEvent(tooltip,'focus',tooltip_focusHandler);tooltip.parentNode.removeChild(tooltip);}},isAllWhitespace=function(node)
{return!(/[^\t\n\r ]/.test(node.data));},isIgnorable=function(node)
{return(node.nodeType==8)||((node.nodeType==3)&&isAllWhitespace(node));},previousElementSibling=function(sibling)
{while(sibling=sibling.previousSibling)
{if(!isIgnorable(sibling))return sibling;}
return null;},nextElementSibling=function(sibling)
{while(sibling=sibling.nextSibling)
{if(!isIgnorable(sibling))return sibling;}
return null;},lastElementChild=function(parentNode)
{var node=parentNode.lastChild;while(node){if(!isIgnorable(node))return node;node=node.previousSibling;}
return null;},firstElementChild=function(parentNode)
{var node=parentNode.firstChild;while(node){if(!isIgnorable(node))return node;node=node.nextSibling;}
return null;},dataOf=function(textNode)
{var data=textNode.data;data=data.replace(/[\t\n\r ]+/g,' ');if(data.charAt(0)==' ')
data=data.substring(1,data.length);if(data.charAt(data.length-1)==' ')
data=data.substring(0,data.length-1);return data;},addEvent=function(element,type,handler)
{if(element.addEventListener)
{element.addEventListener(type,handler,false);}else
{if(!handler['data-guid'])handler['data-guid']=addEvent.guid++;if(!element['data-events'])element['data-events']={};var handlers=element['data-events'][type];if(!handlers)
{handlers=element['data-events'][type]={};if(element['on'+type])handlers[0]=element['on'+type];element['on'+type]=handleEvent;}
handlers[handler['data-guid']]=handler;}},removeEvent=function(element,type,handler)
{if(element.removeEventListener)
{element.removeEventListener(type,handler,false);}else if(element['data-events']&&element['data-events'][type]&&handler['data-guid'])
delete element['data-events'][type][handler['data-guid']];},handleEvent=function(event)
{event=event||fixEvent(window.event);var returnValue=true;var handlers=this['data-events'][event.type];for(var i in handlers)
{if(!Object.prototype[i])
{this['data-handler']=handlers[i];if(this['data-handler'](event)===false)returnValue=false;}}
if(this['data-handler'])this['data-handler']=null;return returnValue;},fixEvent=function(event)
{event.preventDefault=fixEvent.preventDefault;event.stopPropagation=fixEvent.stopPropagation;return event;};fixEvent.preventDefault=function()
{this.returnValue=false;}
fixEvent.stopPropagation=function()
{this.cancelBubble=true;}
addEvent.guid=1;addEvent(window,'load',init);};$(document).ready(function(){if(document.getElementById("SiteHeader")){adobe.fn.initGlobalNavAccessibility();}});
adobe.fn.initReflowComponent=function(dispatcher,headElement,layoutName,cssFile){var css;var dispatcher=dispatcher,head=headElement,layoutName=layoutName,cssFile=cssFile;handleLayoutEvent(null,dispatcher.getLayoutEvent(layoutName));function handleLayoutEvent(event,layoutEvent){if(layoutEvent.name==layoutName){if(!css){css=new adobe.dom.CSSStyleSheet(cssFile);}
css[layoutEvent.active?'enable':'disable'](head);}}
jQuery(document).bind("adobe.reflow.LayoutChange",handleLayoutEvent);};
adobe.fn.initRssFeed=function(id,feedURL)
{function cuttext($text,$max)
{if($text.length>$max)
{$text=$text.substr(0,$max);$text=$text+" [...]";}
return $text;}
if($('#'+id+'feedTitle').length!=0)
{$.getFeed({url:feedURL,success:function(feed)
{$('#'+id+'feedTitle').html(feed.title);$('#'+id+'feedLink .RouterHeadingLink').attr('href',feed.link);var arr=feed.items;var max=140;var textToInsert=[];var i=0;var length=5;for(var a=0;a<length;a+=1)
{var item=arr[a];var date=new Date(item.updated);date=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();textToInsert[i++]='<tr>';textToInsert[i++]='<th class="TableCell TableNumber">'+date+'</th>';textToInsert[i++]='<td>';textToInsert[i++]='<a target="_blank" href="'+item.link+'">'+cuttext(item.title,max)+'</a>';textToInsert[i++]='</td>';textToInsert[i++]='</tr>';}
$('#'+id+'feedItems').append(textToInsert.join(''));}});}};
adobe.fn.slider=function(e)
{var scrollPane=$("#"+e+" .ui-slider-pane"),scrollContent=$("#"+e+" .ui-slider-content"),scrollContentItems=$("#"+e+" .ui-slider-content .ui-slider-item"),scrollContentImages=$("#"+e+" .ui-slider-content .ui-slider-item img");var scrollItemsWidth=20;scrollContentItems.each(function()
{scrollItemsWidth+=$(this).innerWidth();});scrollContent.css('width',scrollItemsWidth);var scrollbar=$("#"+e+" .ui-slider-bar").slider({slide:function(event,ui)
{if(scrollContent.width()>scrollPane.width())
{scrollContent.css("margin-left",Math.round(ui.value/100*(scrollPane.width()-scrollContent.width()))+"px");}
else
{scrollContent.css("margin-left",0);}}});scrollbar.width("99%");scrollPane.css("overflow","hidden");var handleHelper=scrollbar.find(".ui-slider-handle").append("<span class='ui-icon ui-icon-grip-dotted-vertical ui-icon-small'></span>").wrap("<div class='ui-handle-helper-parent'></div>").parent();scrollContentImages.each(function()
{$(this).addClass('LayoutHAlignMiddle');});function sizeScrollbar()
{var remainder=scrollContent.width()-scrollPane.width();var proportion=remainder/scrollContent.width();var handleSize=scrollPane.width()-(proportion*scrollPane.width());scrollbar.find(".ui-slider-handle").css({width:handleSize,"margin-left":-handleSize/2});handleHelper.width("").width(scrollbar.width()-handleSize);}
function resetValue()
{var remainder=scrollPane.width()-scrollContent.width();var leftVal=scrollContent.css("margin-left")==="auto"?0:parseInt(scrollContent.css("margin-left"));var percentage=Math.round(leftVal/remainder*100);scrollbar.slider("value",percentage);}
function reflowContent()
{var showing=scrollContent.width()+parseInt(scrollContent.css("margin-left"),10);var gap=scrollPane.width()-showing;if(gap>0)
{scrollContent.css("margin-left",parseInt(scrollContent.css("margin-left"),10)+gap);}}
$(window).resize(function()
{resetValue();sizeScrollbar();reflowContent();});setTimeout(sizeScrollbar,10);};
adobe.fn.openModal=function(config)
{var $=jQuery;function handleWindowResize(event)
{var dimension=event.data.dimension;if(!dimension){return;}
var newsize=$(window)[dimension]();if(newsize==currentWindowSize[dimension])
{return;}
currentWindowSize[dimension]=newsize;var handler=event.data.handler;if(!handler){return;}
event.data.handler();}
var currentWindowSize={width:0,height:0};function createActiveLayoutHandler(element,dimensionKey,position,failSafePosition,dimensionBuffer)
{var dimensionValue=element.dialog("option",dimensionKey);var isAuto=dimensionValue=="auto";var handler=function()
{var viewSize=$(window)[dimensionKey]();if(isAuto)
{element.dialog("option",dimensionKey,dimensionValue);}
var tooBig=element.dialog("widget")[dimensionKey]()>viewSize;if(isAuto&&tooBig)
{element.dialog("option",dimensionKey,viewSize-dimensionBuffer);}
if(tooBig)
{element.dialog("option","position",failSafePosition);var v=parseInt(element.dialog("widget").css(failSafePosition));}
else
{element.dialog("option","position",position);}};if(dimensionValue=="auto")
{handler();element.resize(handler);}
return handler;}
function getValidDimension(dim,buffer)
{var out=parseInt(dim),finalDim='';if($.browser.msie&&parseFloat($.browser.version)>=7.0&&parseFloat($.browser.version)<8.0)
{finalDim="auto";}
else
{if(isNaN(out))
{finalDim="auto";}
else
{finalDim=(out+parseInt(buffer));}}
return finalDim;}
function createOpenModalHandler(config)
{var modal=$("#"+config.target),marginWidth=40,marginHeight=62;modal.dialog({modal:true,title:config.title||"",height:getValidDimension(config.height,marginHeight),width:getValidDimension(config.width,marginWidth),autoOpen:false,resizable:false,draggable:false,closeOnClick:true,open:function()
{if(config.external=="true"){embedSWF();}
if($.browser.msie&&parseFloat($.browser.version)>=8.0&&isNaN(config.height))
{modal.dialog('option','width',(modal.innerWidth()-20));modalRelocate();}
if($.browser.msie&&parseFloat($.browser.version)>=7.0&&parseFloat($.browser.version)<8.0)
{$('.ui-dialog-titlebar').css('width',(modal.innerWidth()-marginWidth));}
if($.browser.msie&&parseFloat($.browser.version)<=7.0)
{}
else
{$(window).bind("scroll",modalRelocate);}
$(window).bind("resize",{dimension:"height",handler:createActiveLayoutHandler(modal,'height','center','center',marginHeight)},handleWindowResize);$(window).bind("resize",{dimension:"width",handler:createActiveLayoutHandler(modal,'width','center','center',marginWidth)},handleWindowResize);if(modal.dialog("option","closeOnClick"))
{$(".ui-widget-overlay").bind('click',function()
{modal.dialog('close');});}},close:function()
{$(window).unbind("resize",handleWindowResize);if($.browser.msie&&parseFloat($.browser.version)<=7.0)
{}
else
{$(window).unbind("scroll",modalRelocate);}
if($.browser.msie&&parseFloat($.browser.version)>=7.0&&parseFloat($.browser.version)<8.0)
{$('.ui-dialog-titlebar').css('width','');}
if(modal.dialog("option","closeOnClick"))
{$(".ui-widget-overlay").unbind('click');}
modal.remove();}});function modalRelocate()
{modal.dialog('option','position',['center','center']);}
function modalLaunch(combinedXObjects,combinedYObjects)
{var modalX=null;var modalY=null;if(combinedXObjects!=null)
{modalX=($(window).width()-combinedXObjects)/2;modal.dialog('option','width',combinedXObjects);}
if(combinedYObjects!=null)
{modalY=($(window).height()-combinedYObjects)/2;modal.dialog('option','height',combinedYObjects);}
if(modalY!=null&&modalX!=null)
{modal.dialog('option','position',[modalX,modalY]);}
modal.dialog('open');}
function embedSWF(){var hrefValue=config.href;var hrefValues=new Array();hrefValues=hrefValue.split('/');var flashvars={fileID:hrefValues[5],context:hrefValues[4],embeded:"true",autoPlay:"true"};var params={menu:"false",wmode:"transparent",allowfullscreen:"true"};var id={'class':'ui-dialog-content ui-widget-content','name':'ui-dialog-content ui-widget-content'};swfobject.embedSWF("http://images.tv.adobe.com/cdn/swf/player.swf",config.target,config.width,config.height,"9.0.0","expressInstall.swf",flashvars,params,id);}
function openModal()
{modal.load(config.href,function(response,status)
{var external=config.external;if(status=="error"&&external=="undefined")
{return true;}
else
{if($.browser.msie&&parseFloat($.browser.version)<=6.9)
{if($("#"+config.target+" img").length!=0)
{var newImg=new Image();newImg.src=modal.find("img").attr('src');var combinedXObjects=(newImg.width+marginWidth)-20;var combinedYObjects=newImg.height+marginHeight+11;modal.dialog('option','width',combinedXObjects);modal.dialog('option','height',combinedYObjects);modal.dialog('open');}
else if($("#"+config.target+" object").length!=0)
{combinedXObjects=(parseInt($("#"+config.target+" object").attr('width'))+marginWidth)-20;combinedYObjects=parseInt($("#"+config.target+" object").attr('height'))+marginHeight+8;modalLaunch(combinedXObjects,combinedYObjects);}
else
{var modalWidth=710;if(config.width>0)
{modalWidth=config.width;}
var modalHeight="auto";modal.dialog('option','width',width);modal.dialog('option','height',height);modal.dialog('open');}}
else
{modal.dialog('open');}}});return false;}
openModal();}
if(config===undefined)
{return;}
currentWindowSize.width=$(window).width();if(currentWindowSize.width>(parseInt(config.width)||0))
{var mid=config.target,e=$("#"+mid);if(e[0]==null)
{$('<div/>',{id:mid}).appendTo('body');}
createOpenModalHandler(config);}};
adobe.fn.pageFilter=function(e)
{adobe.fn.pageFilter={};var menuBarID="#"+e,menuBar=$(menuBarID),menuControlID="MenuControl",menuControl=$('#'+menuControlID),menuShow=$(menuBarID+" .MenuShow"),menuButton=$(menuBarID+' .MenuDropButton'),menuPanel=menuBar.find("div[class*='MenuDropPanel']"),menuOpen=false;if(menuControl[0]==null)
{$('<div/>',{id:menuControlID}).appendTo('body');menuControl=$('#'+menuControlID);}
var menuDropWidth=$(menuBarID+' .MenuDrop').width(),menuPanelWidth=$(menuBarID+' .MenuDropPanel').width(),menuModifier=1,menuWidth;if($.browser.msie&&parseFloat($.browser.version)<=8.0)
{menuModifier=menuModifier+22;}
if(menuDropWidth>menuPanelWidth)
{menuWidth=menuDropWidth+menuModifier+"px";}
else
{menuWidth=menuPanelWidth+menuModifier+"px";}
$(menuBarID+' .MenuDrop').css('width',menuWidth);$(menuBarID+' .MenuDropPanel').css('width',menuWidth);menuShow.each(function()
{var targetShow=$(this).attr('rel'),moreLink=$(this).attr('href');$(this).bind('click',function(event)
{event.preventDefault();var menuToggle=$('.MenuToggle');menuToggle.each(function()
{if($(this).attr('id')!='#'+targetShow)
{menuToggle.addClass('UIHide');}});$('#'+targetShow).removeClass('UIHide');var menuSelected=$(menuBarID+' .MenuDropItemSelected').html();menuBar.parents('td').siblings('.MenuMultiPanel').find('a.RouterLink').attr('href',moreLink);menuBar.find('.MenuButton a').html(menuSelected);$('.MenuDropPanel').slideUp('fast').removeClass('MenuShow');menuButton.removeClass('LayoutFlipV');menuControl.removeClass('MenuClose');});});adobe.fn.pageFilter.toggleMenuOn=function()
{menuPanel.slideDown('fast').addClass('MenuShow');menuControl.addClass('MenuClose');menuButton.addClass('LayoutFlipV');menuControl.unbind('click');menuControl.bind('click',function()
{$(menuBarID+' .MenuDropPanel').slideUp('fast').removeClass('MenuShow');menuButton.removeClass('LayoutFlipV');menuControl.removeClass('MenuClose');});$('body').unbind('keyup');$('body').bind('keyup',function(event)
{if(event.keyCode=='27')
{event.preventDefault();$(menuBarID+' .MenuDropPanel').slideUp('fast').removeClass('MenuShow');menuButton.removeClass('LayoutFlipV');menuControl.removeClass('MenuClose');}});};adobe.fn.pageFilter.toggleMenuOff=function()
{$('.MenuDropPanel').slideUp('fast').removeClass('MenuShow');menuControl.removeClass('MenuClose');menuButton.removeClass('LayoutFlipV');menuPanel.slideUp('fast').removeClass('MenuShow');menuControl.removeClass('MenuClose');menuButton.removeClass('LayoutFlipV');};menuBar.find("div[class*='MenuDropName']").bind('click',function()
{if(menuControl.hasClass('MenuClose')&&menuPanel.hasClass('MenuShow'))
{adobe.fn.pageFilter.toggleMenuOff();menuOpen=false;}
else if(!menuOpen)
{adobe.fn.pageFilter.toggleMenuOn();menuOpen=true;}
else
{adobe.fn.pageFilter.toggleMenuOn();}
return false;});var menuDropItem=new Array();$(menuBarID+' .MenuDropItem').each(function(i)
{$(this).attr('id',e+'MenuDropItem'+[i]);menuDropItem[i]='#'+$(this).attr('id');if($(menuBarID+' .MenuDropItemSelected').size()==0)
{$(menuDropItem[0]).addClass('MenuDropItemSelected');}
$(menuDropItem[i]).bind('click',function()
{$(menuBarID+' .MenuDropItem').removeClass('MenuDropItemSelected');$(this).addClass('MenuDropItemSelected');});});};
adobe.fn.ratings=function(target,xml)
{var body=$('body'),rating,num,cdnPrefix=adobe.http.cdnprefix(),xmlInProgress=body.data('XmlDataInProgress'),xmlDataDone=body.data('XmlDataDone');if(xmlDataDone==null)
{if(xmlInProgress==null)
{body.data('XmlDataInProgress','true');var head=$("head")[0],ratingsCss=new adobe.dom.CSSStyleSheet(cdnPrefix+"/include/style/ratings.css");ratingsCss.enable(head);body.bind('XmlDataChange',function(e,id,rating)
{$('#'+id).addClass('StarRatings-'+rating);});$.get(xml,function(dataObject)
{$(dataObject).find("Product").each(function()
{rating=$(this).find('ReviewStatistics').find('AverageOverallRating').text(),num=new Number(rating);rating=num.toFixed(1);rating=rating.replace('.','_');body.data($(this).attr('id'),{productRating:rating});body.data('XmlDataDone','true');body.trigger('XmlDataChange',[$(this).attr('id'),rating]);});});}}
else
{$('#'+target).addClass('StarRatings-'+body.data(target).productRating);}};
adobe.fn.resizeObjectElement=function(objectId,width,height){function setAtt(name,value){if(isNaN(value)){return;}
if(e.hasAttribute(name)){e[name]=value;}
if(e.hasAttribute("style")){e.style[name]=value+"px";}}
var h=parseInt(height),w=parseInt(width),e=window.document.getElementById(objectId.toString());if(e==null){return;}
setAtt("height",h);setAtt("width",w);};
adobe.fn.stockQuote=function(target)
{var stockPod=$('#'+target);if(stockPod!=null&&stockPod!="undefined"){stockPod.find('div.miniQuoteWrapper div.change').each(function(){if(parseFloat($(this).text())>=0){$(this).addClass('StockQuotePositive').html("&#9650;"+$(this).text());}else{$(this).addClass('StockQuoteNegetive').html("&#9660;"+$(this).text());}});stockPod.find('div.miniQuoteWrapper div.symbol').each(function(){if($(this).text().replace(/ /g,'')=="$NASX"){$(this).text("NASDAQ");}});}};adobe.fn.stockQuoteDate=function(d,target){var stockDatePod=$('#'+target);var s=function(a,b){return(1e15+a+"").slice(-b)};if(typeof d==='undefined'){d=new Date();};var dt=s(d.getMonth()+1,2)+'/'+
s(d.getDate(),2)+'/'+
d.getFullYear()+' '+
s(d.getHours(),2)+':'+
s(d.getMinutes(),2)+':'+
s(d.getSeconds(),2);if(stockDatePod!=null&&stockDatePod!="undefined"){stockDatePod.find('div.StockQuoteDate').each(function(){var t=$(this).html()+' '+dt;$(this).html(t);});}};
adobe.fn.toggle=function(click,toggle,toggle2,slide)
{var toggleId=$("#"+toggle),clickId=$("#"+click);toggleId.attr('aria-hidden','true');if(toggle2!=undefined&&toggle2!='')
{var toggleId2=$("#"+toggle2);toggleId2.attr('aria-hidden','true');}
clickId.bind('click',function(e)
{e.preventDefault();(toggleId.attr('aria-hidden')=='true')?toggleId.attr('aria-hidden','false'):toggleId.attr('aria-hidden','true');(slide!=undefined&&slide!='')?toggleId.slideToggle(slide):toggleId.toggle();if(toggle2!=undefined&&toggle2!='')
{(toggleId2.attr('aria-hidden')=='true')?toggleId2.attr('aria-hidden','false'):toggleId2.attr('aria-hidden','true');(slide!=undefined&&slide!='')?toggleId2.slideToggle(slide):toggleId2.toggle();}});};
adobe.http.cdnprefix=function(environment)
{var cdnPrefix,envObj=[],hostProtocol=(document.location.protocol=='https:'?'https':'http'),host=URLParser.host;var cdnAddy=(hostProtocol=='https')?hostProtocol+'://wwwimages2':hostProtocol+'://wwwimages';if(host.match(/qa/g)!=null)
{host='qa';}
switch(host)
{case"www.adobe.com":cdnPrefix=cdnAddy+".adobe.com/www.adobe.com";envObj["entAppsCdnPrefix"]=hostProtocol+"://apps.enterprise.adobe.com";break;case"adobe.com":cdnPrefix=cdnAddy+".adobe.com/www.adobe.com";envObj["entAppsCdnPrefix"]=hostProtocol+"://apps.enterprise.adobe.com";break;case"www.stage.adobe.com":cdnPrefix=cdnAddy+".stage.adobe.com/www.stage.adobe.com";envObj["entAppsCdnPrefix"]=hostProtocol+"://staging.apps.enterprise.adobe.com";break;case"qa":cdnPrefix="";envObj["entAppsCdnPrefix"]=hostProtocol+"://staging.apps.enterprise.adobe.com";break;default:cdnPrefix="";envObj["entAppsCdnPrefix"]=hostProtocol+"://dev.apps.enterprise.adobe.com";break;}
return(environment!=null)?envObj[environment]:cdnPrefix;};
adobe.http.getCookies=function(cookie){function trim(s){return((s===undefined)?"":String(s).replace(/^\s*/,"").replace(/\s*$/,""));}
var o={};if(typeof cookie=='string'){var cookies=cookie.split(";");for(var i=0,l=cookies.length;i<l;i++){var pieces=cookies[i].split("=");var name=trim(pieces[0]),content=trim(pieces[1]);o[name]=new adobe.http.Cookie(name,content);}}
return o;};adobe.http.Cookie=function(name,content){this.setName(name);this.setContent(content);return this;};adobe.http.Cookie.prototype={setName:function(name){this.name=String(name);return this;},setContent:function(content){this.content=(typeof content=='string')?content:"";return this;},setExpires:function(milliseconds){this.expires=isNaN(milliseconds)?0:milliseconds;return this;},setSecure:function(secure){this.secure=Boolean(secure);return this;},setDomain:function(domain){this.domain=encodeURI(String(domain));return this;},setPath:function(path){this.path=encodeURI(String(path));return this;},destroy:function(){this.content="";this.setExpires(-86400000);return this;},toString:function(){var cookie=this.name+"="+this.content;if(!isNaN(this.expires)){var date=new Date();date.setTime(date.getTime()+this.expires);cookie+=";expires="+date.toGMTString();}
if(this.path){cookie+=";path="+this.path;}
if(this.domain){cookie+=";domain="+this.domain;}
if(this.secure){cookie+=";secure";}
return cookie;}};adobe.http.Cookie.is=function(func){return func!==undefined&&adobe.http.Cookie.prototype.isPrototypeOf(func);};
adobe.http.getScript=function(url,options)
{options=$.extend(options||{},{dataType:"script",cache:true,url:url});return jQuery.ajax(options);};
adobe.ui.CartFacade=function(overlay_id,flash_id){this.overlayElement=null;this.distributionMethod="";this.distributionMethodDisplayed="";this.storeTypeDisplayed="";this.categoryPath="";this.categoryPathDisplayed="";this.contextPath="";this._domain="";this.defaultStore="";this.defaultCountry="";this.requiredFlashVersion="0.0.0";this.detectedFlashVersion="";this.storeRegion="";this.storeRegionCookie=new adobe.http.Cookie("storeregion").setPath('/').setExpires(86400002*365);this.productName="";this.emailTrackingId="";this.storeType="";this.o_id=overlay_id;this.f_id=flash_id;this.flashObject=null;};adobe.ui.CartFacade.prototype={closeCartOverlay:function(){if(!this.overlayElement){return;}
this.overlayElement.dialog('close');},getDetectedFlashVersion:function(){if(!this.detectedFlashVersion){var plVersion=swfobject.getFlashPlayerVersion();this.detectedFlashVersion=plVersion.major+"."+plVersion.minor+"."+plVersion.release;}
return this.detectedFlashVersion;},getStoreRegion:function(){if(this.storeRegion){return this.storeRegion;}else{var cookie=adobe.http.getCookies(window.document.cookie).storeregion;if(cookie){return cookie.content;}}
return"";},isOverlaySupported:function(){var supported=this.isFlashVersionSupported();supported=supported&&!(window.opera&&(/^Win/.test(window.navigator.platform)));return supported;},isFlashVersionSupported:function(){var playerVersion=this.itemizeFlashVersion(this.getDetectedFlashVersion());var requiredVersion=this.itemizeFlashVersion(this.requiredFlashVersion);for(var i=0;i<playerVersion.length;i++){var current=playerVersion[i]||0,required=requiredVersion[i]||0;if(current>required){break;}else if(current==required){continue;}else{return false;}}
return true;},itemizeFlashVersion:function(version){var v=String(version).split("."),r=[];for(var i=0,l=v.length;i<l;i++){r.push(parseFloat(v[i]));}
return r;},openCartOverlay:function(){if((this.overlayElement==null)||(this.distributionMethod!=this.distributionMethodDisplayed)||(this.storeType!=this.storeTypeDisplayed||this.categoryPath!=this.categoryPathDisplayed)){var vars={categorypath:this.categoryPath,contextpath:this.contextPath,defaultstore:this.defaultStore,defaultcountry:this.defaultCountry,distmethod:this.distributionMethod,flashversion:this.getDetectedFlashVersion(),omnitureproductname:this.productName,promoid:this.emailTrackingId,storeregion:this.getStoreRegion(),storetype:this.storeType},params={allowScriptAccess:"sameDomain",id:this.f_id},attrs={id:this.f_id,name:this.f_id,allowScriptAccess:"sameDomain"},_this=this;var overlayElement=document.getElementById(this.o_id);if(!overlayElement){var body=document.getElementsByTagName("body")[0];var div=document.createElement("div");div.setAttribute("id",this.o_id);overlayElement=body.appendChild(div);}
this.overlayElement=$("#"+this.o_id);var flashObject=document.getElementById(this.f_id);if(!flashObject){flashObject=overlayElement.appendChild(document.createElement("div"));flashObject.setAttribute("id",this.f_id);}
this.overlayElement.dialog({modal:true,autoOpen:false,dialogClass:"CartDialog",resizable:false,draggable:false,width:850,height:535,closeOnClick:false,open:function(){swfobject.replaceSWF(_this.contextPath+"/swf/store/flex/StatelessStore.swf",_this.f_id,"850","535",_this.requiredFlashVersion,"",vars,params,attrs,function(event){if(event.success){_this.flashObject=document.getElementById(_this.f_id);}});}});this.distributionMethodDisplayed=this.distributionMethod;this.storeTypeDisplayed=this.storeType;this.categoryPathDisplayed=this.categoryPath;}
this.overlayElement.dialog('open');},resizeCartOverlay:function(width,height){if(!this.overlayElement){return;}
if(this.flashObject){this.flashObject.height=height;this.flashObject.width=width;this.flashObject.sizeChanged(1);}
this.overlayElement.dialog("option",{height:height,width:width,position:"center"});},setCategoryPath:function(catpath){this.categoryPath=String(catpath);},setContextPath:function(path){this.contextPath=String(path);},setDefaultCountry:function(countryid){this.defaultCountry=String(countryid);},setDefaultStore:function(storeid){this.defaultStore=String(storeid);},setDistributionMethod:function(distmethod){this.distributionMethod=String(distmethod);},setDomain:function(domain){this._domain=String(domain);this.storeRegionCookie.setDomain(this._domain);},setEmailTrackingId:function(prmid){this.emailTrackingId=String(prmid);},setProductName:function(productname){this.productName=String(productname);},setRequiredFlashVersion:function(version){this.requiredFlashVersion=String(version);},setStoreRegion:function(region){this.storeRegion=String(region);window.document.cookie=this.storeRegionCookie.setContent(this.storeRegion).toString();},setStoreType:function(typestr){this.storeType=String(typestr);}};
var SearchBuddy=(function(){_SearchBuddyInstance=function(){_SearchBuddy={};_SearchBuddy.IDS={gnavForm:"#globalnav-search",siteSearch:"#site-search",searchInput:"#search-input",searchBuddySubmit:"search-buddy-submit",searchLocField:"#searchbuddy-loc",resultsContainer:"sb-results",resultsBody:"sb-results-body",resultsList:"sb-result-list"};_SearchBuddy.CSS={activated:"activated",highlight:"highlight",noResult:"no-result",searchResult:"search-result",pulloutItem:"pullout-item",pulloutContent:"pullout-content",linkList:"link-list",searchSuggestion:"search-suggestion",searchAll:"txtright search-all"};this.initialize();};_SearchBuddyInstance.prototype={initialize:function(URLS,STRINGS){if($(_SearchBuddy.IDS.gnavForm)==null)return;if(!$(_SearchBuddy.IDS.gnavForm).hasClass("searchbuddy"))return;this.URLS=$.extend({searchBuddy:"/cfusion/search/buddy/searchbuddy.cfm",searchResults:"/cfusion/search/index.cfm"},URLS);this.gnavForm=$(_SearchBuddy.IDS.gnavForm);this.siteSearch=$(_SearchBuddy.IDS.siteSearch);this.input=$(_SearchBuddy.IDS.searchInput);if($(_SearchBuddy.IDS.searchLocField).val()==null){this.loc="en_us";}else{this.loc=$(_SearchBuddy.IDS.searchLocField).val();}
this.locJSON=this.loc;this.input.attr("autocomplete","off");this.term=this.input.val();if(this.loc=="en_us"){this.STRINGS=$.extend({searchForElipsis:"Search for...",searchFor:"Search for",seeAllResults:"See all search results &#8250;",delay:0.015},STRINGS);}
else if(this.loc=="de"){this.locJSON="de_de";this.STRINGS=$.extend({searchForElipsis:"Suchen...",searchFor:"Suchen",seeAllResults:"Alle Suchergebnisse anzeigen &#8250;",delay:0.015},STRINGS);}
else if(this.loc=="es_es"){this.STRINGS=$.extend({searchForElipsis:"Buscar...",searchFor:"Buscar",seeAllResults:"Ver todos los resultados de búsqueda &#8250;",delay:0.015},STRINGS);}
else if(this.loc=="fr_fr"){this.STRINGS=$.extend({searchForElipsis:"Rechercher...",searchFor:"Rechercher",seeAllResults:"Voir les résultats de la recherche &#8250;",delay:0.015},STRINGS);}
else if(this.loc=="ja_jp"){this.STRINGS=$.extend({searchForElipsis:"検索...",searchFor:"検索",seeAllResults:"すべての検索結果を見る &#8250;",delay:0.015},STRINGS);}
this.input.keyup($.proxy(this,"handleKeyCheck"));this.gnavForm.bind("submit",$.proxy(this,"handleFormSubmit"));this.goURL="";this.setupForResults();},setupForResults:function(){this.resultsContainer=$('<div />',{"id":_SearchBuddy.IDS.resultsContainer});this.resultsBody=$('<div />',{"id":_SearchBuddy.IDS.resultsBody});this.resultsContainer.appendTo(this.siteSearch);this.resultsBody.appendTo(this.resultsContainer);this.siteSection=URLParser.siteLevel;this.siteSection=(this.siteSection=="")?"home":this.siteSection;this.siteSection=(URLParser.subdomain=="get")?("get:"+this.siteSection):this.siteSection;this.siteSection=(URLParser.subdomain=="kb")?("kb:"+this.siteSection):this.siteSection;this.siteSection+=(URLParser.siteSection==null||URLParser.siteSection=="")?"":":"+URLParser.siteSection;var siteSection_input=$("<input>",{"name":"siteSection","type":"hidden","value":this.siteSection});siteSection_input.appendTo(this.gnavForm);},handleFormSubmit:function(event){var keyCode=event.keyCode||event.which;this.gnavForm.attr('action','/go/gnav_search');if(this.goURL!=""||this.input.val()==""||this.input.val()==this.input.attr("title")){return false;}
if(event.type=="click"||keyCode=="13"||keyCode=="0"){if(this.input.val()==this.input.attr("title"))this.input.val("");this.gnavForm.trigger("submit");}},handleKeyCheck:function(e){var keyEvent=e.keyCode||e.which;this.keyMap={SHIFT:e.shiftKey,ALT:e.altKey,CTRL:e.ctrlKey,ESC:keyEvent==27,RETURN:keyEvent==13,TAB:keyEvent==9,DELETE:keyEvent==8||keyEvent==46,DOWN:keyEvent==40,UP:keyEvent==38,ALPHANUMERIC:((keyEvent>=48&&keyEvent<=57)||(keyEvent>=65&&keyEvent<=90))};if(this.keyMap.ALPHANUMERIC||this.keyMap.DELETE||this.keyMap.BACKSPACE){this.setTerm();}else{this.handleMenuNavigation(e);}},handleMenuNavigation:function(e){if(!this.json){e.preventDefault();return;}
if(this.keyMap.RETURN){e.preventDefault();if(this.input.val()==""||this.input.val()==this.input.attr("title")){return false;}else if(this.goURL==""){this.gnavForm.submit();return false;}else{window.location.href=this.goURL;return;}}
if(this.keyMap.ESC){this.deactivateMenu();this.goURL="";this.input.value="";}
if(this.keyMap.TAB){if(this.goURL.empty()){this.deactivateMenu();}}
if(this.keyMap.DELETE){this.handleResultsMenu();}
var resultLinks=$('#'+_SearchBuddy.IDS.resultsBody+' a');if(this.keyMap.DOWN){e.preventDefault();if(this.selectedIndex<resultLinks.length){if($(resultLinks[this.selectedIndex]).has("img").length)this.selectedIndex++;var currentLink=$(resultLinks[this.selectedIndex]);if(this.selectedIndex>1){var lastLink=resultLinks[this.selectedIndex-1];if($(resultLinks[this.selectedIndex]).has("img").length)lastLink=resultLinks[this.selectedIndex-2];$(lastLink).removeClass(_SearchBuddy.CSS.highlight);}
currentLink.addClass(_SearchBuddy.CSS.highlight);this.selectedIndex++;var linkString=(currentLink.attr("href"))?currentLink.attr("href").toString():false;window.status=(linkString)?linkString:"";this.goURL=(linkString)?linkString:"";}else if(resultLinks.length==1){$(resultLinks[0]).addClass(_SearchBuddy.CSS.highlight);}}
if(this.keyMap.UP){e.preventDefault();this.selectedIndex--;if(this.selectedIndex==1)this.selectedIndex=2;if(this.selectedIndex>1&&this.selectedIndex<resultLinks.length){if($(resultLinks[this.selectedIndex-1]).has("img").length){$(resultLinks[this.selectedIndex]).removeClass(_SearchBuddy.CSS.highlight);this.selectedIndex--;$(resultLinks[this.selectedIndex-1]).addClass(_SearchBuddy.CSS.highlight);}else{$(resultLinks[this.selectedIndex]).removeClass(_SearchBuddy.CSS.highlight);$(resultLinks[this.selectedIndex-1]).addClass(_SearchBuddy.CSS.highlight);}
var linkString=($(resultLinks[this.selectedIndex-1]).attr("href"))?$(resultLinks[this.selectedIndex-1]).attr("href"):"";window.status=linkString;this.goURL=linkString;}}},setTerm:function(){this.term=this.input.val();this.term=this.term.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');if(this.term==""){this.deactivateMenu();}else{_search=this.search(this.term);setTimeout('_search',this.STRINGS.delay);}},search:function(){this.baseURL=this.URLS.searchBuddy;var sURL=this.baseURL+"?pre="+this.term+"&s="+this.siteSection+"&loc="+this.locJSON;$.getJSON(sURL,$.proxy(this,"loadJSON"));this.selectedIndex=1;this.goURL="";},loadJSON:function(originalRequest){this.json=originalRequest;if($('#'+_SearchBuddy.IDS.resultsList)!=null){$('#'+_SearchBuddy.IDS.resultsList).remove();}
if(this.json.HUBLETS.length==0&&this.json.SUGGESTIONS.length==0){this.renderNoResults();}else{this.renderResults();}},activateMenu:function(){$(_SearchBuddy.IDS.siteSearch).addClass(_SearchBuddy.CSS.activated);},deactivateMenu:function(){this.gnavForm.trigger("searchbuddy:closed");if($("#"+_SearchBuddy.IDS.resultsList)!=null){$("#"+_SearchBuddy.IDS.resultsList).remove();this.siteSearch.removeClass(_SearchBuddy.CSS.activated);this.ignoreMouseHover();}},renderNoResults:function(){this.deactivateMenu();this.activateMenu();var dl=$('<dl/>',{"id":_SearchBuddy.IDS.resultsList});var ddLink=this.URLS.searchResults+"?loc="+this.loc+"&term="+this.term;var ddText=this.STRINGS.searchFor+' "'+this.term+'" &#8250;';var dd=$('<dd/>',{'class':_SearchBuddy.CSS.noResult}).html($('<a/>',{'href':ddLink}).html(ddText));this.resultsBody.append(dl);dl.append(dd);this.goURL="";this.watchDocumentClicks();},renderResults:function(json){this.activateMenu();var hublets=this.json.HUBLETS;var suggestions=this.json.SUGGESTIONS;var dl=$('<dl/>',{id:_SearchBuddy.IDS.resultsList});dl.appendTo(this.resultsBody);$.each(hublets,function(index,hub){var sbrIndex="sbr-"+index;var imgURL="http://wwwimages.adobe.com/www.adobe.com/"+hub.ICONURL;var dd=$('<dd/>',{'id':sbrIndex,'class':_SearchBuddy.CSS.searchResult});var image=$('<div/>',{'class':_SearchBuddy.CSS.pulloutItem}).html($('<a/>',{'href':hub.HOMEPAGEURL}).html($('<img>',{'src':imgURL})));var content=$('<div/>',{'class':_SearchBuddy.CSS.pulloutContent});var h4=$('<h4/>',{'href':hub.HOMEPAGEURL}).html($('<a/>',{'href':hub.HOMEPAGEURL}).html(hub.TITLE));var linklist=$('<ul/>',{'class':_SearchBuddy.CSS.linkList});$.each(hub.LINKS,function(index,link){var li=$('<li/>').html($('<a/>',{'href':link.URL}).html(link.TITLE));linklist.append(li);});dl.append(dd);dd.append(image);dd.append(content);content.append(h4).append(linklist);});$.each(suggestions,function(index,suggest){var dd=$('<dd/>',{'id':"sbs-"+index,'class':_SearchBuddy.CSS.searchSuggestion});var link=$('<h4/>').html($('<a/>',{'href':suggest.DESTINATIONURL}).html(suggest.TITLE));var p=$('<p/>').html(suggest.BLURB);dl.append(dd);dd.append(link);dd.append(p);});var searchAllDD=$('<dd/>',{"class":_SearchBuddy.CSS.searchAll});var searchAllLink=$('<a/>',{'id':_SearchBuddy.IDS.searchBuddySubmit}).html(this.STRINGS.seeAllResults).bind({'click':$.proxy(this,"handleFormSubmit"),'keydown':$.proxy(this,"handleFormSubmit")});searchAllDD.append(searchAllLink);dl.append(searchAllDD);this.watchDocumentClicks();this.watchMouseHover();},handleOutsideClicks:function(event){var inResultsContainer=$(event.target).parents('#'+_SearchBuddy.IDS.resultsContainer).length>0;var isInputField=$(event.target).is("#search-input");if(!inResultsContainer&&!isInputField){this.deactivateMenu();this.ignoreDocumentClicks();}},watchDocumentClicks:function(){$(document).bind('click',$.proxy(this,"handleOutsideClicks"));},ignoreDocumentClicks:function(){$(document).unbind('click',$.proxy(this,"handleOutsideClicks"));},handleMouseHover:function(event){$('#'+_SearchBuddy.IDS.resultsList+" a."+_SearchBuddy.CSS.highlight).removeClass(_SearchBuddy.CSS.highlight);this.selectedIndex=1;},watchMouseHover:function(){this.resultsBody.bind('mouseover',$.proxy(this,"handleMouseHover"));},ignoreMouseHover:function(){this.resultsBody.unbind('mouseover',$.proxy(this,"handleMouseHover"));}};return _SearchBuddyInstance;})();$(document).ready(function(){new SearchBuddy();});
adobe.ui.formClearInput=function(id,input)
{var target=$("#"+id);if(input==undefined)
{target.find(':input').each(function()
{$(this).bind('click',function()
{switch(this.type)
{case'password':case'text':case'textarea':$(this).val('');break;}});});}
else
{input=$("#"+input);input.bind('click',function()
{switch(this.type)
{case'password':case'text':case'textarea':$(this).val('');break;}});}};
adobe.ui.formDestroy=function(target)
{target=$('#'+target);if(target.html()!='')
{var targetDestroy=target.find('select').attr('id');$('#'+targetDestroy).selectBox('destroy');}};
adobe.ui.formLoad=function(formID,target,dir,ext)
{target='#'+target;if(dir===undefined)
{dir="";}
if(ext===undefined)
{ext=".html";}
$(target).empty();if(target=="#MarketSegment-target")
{$('#MemberType-target').empty();}
var formIDValue=$("#"+formID+" option:selected").val();if(formIDValue!==undefined&&formIDValue!='')
{$.get(dir+formIDValue+ext,function(data)
{$(target).html(data);});}};
adobe.ui.selectSwitch=function(e,toggle)
{var target='';$("#"+e).change(function()
{$("#"+e+" option:selected").each(function()
{if(target!='')
{$('#'+target).addClass("LayoutMinV LayoutMask").removeClass("selectDisabled");$('#'+target+' select').selectBox('value',"");$('#'+target+" .selectDisabled").removeClass("LayoutMinV LayoutMask");}
target=$(this).val();if(target!='')
{$('#'+target).removeClass("LayoutMinV LayoutMask").addClass("selectDisabled");$('#'+target+' select').selectBox('value',"");$('#'+target+" .selectDisabled").addClass("LayoutMinV LayoutMask");}});if(toggle!==undefined&&toggle!='')
{if($("#"+toggle).attr('disabled')&&!$('#'+target).hasClass("selectDisabled"))
{$('#'+toggle).selectBox('enable');}
else
{$('#'+toggle).selectBox('disable');}}});};
adobe.ui.formSubmit=function(formID,click)
{var id=$("#"+formID);if(click!=undefined)
{$(click).bind('click',function()
{if(id)
{id.submit();}});}
else
{if(id)
{id.submit();}}};
adobe.ui.formValidate=function(target,thanks,meta,attr)
{meta=(meta==null)?true:meta;var targetForm=$('#'+target),thanksDiv=$('#'+thanks),cdnPrefix=adobe.http.cdnprefix();if(target!==undefined)
{targetForm.attr('novalidate','novalidate');$.getScript(cdnPrefix+'/include/script/jquery/plugins/OnDemand/jquery.form.js');targetForm.find(':submit').before('<div id="SubmitStatus" />');var SubmitStatus=$('#SubmitStatus');var validateOptions={wrapper:"div class='LayoutRow'",errorClass:"FormError",errorPlacement:function(error,element)
{var validator=$.data(targetForm[0],'validator'),elementIdOrName=validator.idOrName(element[0]),elementLabel=$('label[for="'+elementIdOrName+'"]').eq(0),isMacOriOS=navigator.userAgent.match(/Mac|iPhone|iPad/i)!=null;if(elementLabel&&!elementLabel.attr('id'))
{elementLabel.attr('id',elementIdOrName+'Label');}
element.data('aria-labelledby',(!elementLabel||isMacOriOS)?elementIdOrName+this.errorClass:elementLabel.attr('id')+' '+elementIdOrName+this.errorClass);error.insertAfter(element.attr({'aria-invalid':'true','aria-labelledby':element.data('aria-labelledby')})).find(this.errorElement).attr({'id':elementIdOrName+this.errorClass});},showErrors:function(errorMap,errorList)
{for(var i=0;errorList[i];i++)
{var error=errorList[i],element=$(error.element);element.attr({'aria-invalid':'true','aria-labelledby':element.data('aria-labelledby')});}
this.defaultShowErrors();},unhighlight:function(element,errorClass,validClass)
{if(element.type==='radio')
{this.findByName(element.name).removeClass(errorClass).addClass(validClass).removeAttrs("aria-invalid aria-labelledby");}else
{$(element).removeClass(errorClass).addClass(validClass).removeAttrs("aria-invalid aria-labelledby");}}};$.getScript(cdnPrefix+'/include/script/jquery/plugins/OnDemand/jquery.validate.js').done(function()
{if(meta)
{$.getScript(cdnPrefix+'/include/script/jquery/plugins/OnDemand/jquery.metadata.js').done(function()
{attr=(attr==null)?'data-validate':attr;$.metadata.setType("attr",attr);targetForm.find('['+attr+']').each(function()
{if($(this).metadata().required)
{$(this).attr({'aria-required':'true','required':'required'});}});targetForm.validate(validateOptions);});}
else
{targetForm.find('[required]').attr({'aria-required':'true'});targetForm.validate(validateOptions);}});}};
adobe.ui.selectBox=function(target,change,settings)
{var targetID=$(target),defaultSettings={'menuTransition':'slide','menuSpeed':'fast','autoSize':true},allSettings=$.extend(defaultSettings,settings);targetID.selectBox();targetID.selectBox('settings',allSettings);if(change!=''&&!!change)
{if(change=='toggle')
{var targetOptions=[];targetID.find('option').each(function()
{targetOptions.push($(this).attr('data-toggle'));});targetID.selectBox().change(function()
{var targetShow=$(target+' option:selected').attr('data-toggle'),targetHide=$(this).val();for(i=0;i<targetOptions.length;i++)
{if(targetOptions[i]!=targetShow)
{$('#'+targetOptions[i]).hide();}
else
{$('#'+targetShow).show();}}
targetID.parents('td').siblings('.MenuMultiPanel').find('a.RouterLink').attr('href',targetHide);});}
else
{targetID.selectBox().change(function()
{location.href=$(this).val();});}}};
adobe.ui.tabs=function(target,defaultTab)
{var targetID=$("#"+target),dispatcher=adobe.vrbl("reflowDispatcher"),vertTabs=targetID.find('.ui-tabpanel-vertical'),tabsWidth=targetID.width();if(URLParser.hash!=null&&targetID.find(URLParser.hash)!==undefined)
{if(targetID.find(URLParser.hash).length>0)
{defaultTab=parseInt(URLParser.hash.match(/(\d+)$/)[0],10)-1;}}
else
{defaultTab=(defaultTab!=null)?defaultTab:0;}
function createTabs()
{targetID.find('.TabsMobile').hide();targetID.tabs({selected:defaultTab});if(vertTabs.length==0)
{var tabsLI=targetID.find('li.ui-state-default'),tabsCount=tabsLI.length,tabsMaxWidth=tabsWidth/tabsCount,allTabs=0,pxPerChar;if($.browser.msie||$.browser.opera||typeof CQClientLibraryManager!="undefined")
{pxPerChar=10;}
else
{pxPerChar=9;}
tabsLI.each(function()
{allTabs=$(this).width()+allTabs;});if(allTabs>tabsWidth)
{tabsLI.each(function()
{$(this).css('maxWidth',tabsMaxWidth);var str=$(this).find('a').text(),strCount=str.length,tabsWholeMaxWidth=Math.floor((tabsMaxWidth-22))/pxPerChar;if(strCount>tabsWholeMaxWidth)
{str=str.slice(0,tabsWholeMaxWidth-2);$(this).find('a').text(str+'..');}});}}
else
{var vertTabsGrid=targetID.find('.ui-tabpanel-vertical .LayoutGrid-4');if(vertTabsGrid.length>0)
{vertTabsGrid.css('width',vertTabsGrid.innerWidth()+11);}
vertTabsGrid=targetID.find('.ui-tabpanel-vertical .LayoutGrid-2');if(targetID.find('.ui-tabpanel-vertical .LayoutGrid-2').length>0)
{vertTabsGrid.css('width',vertTabsGrid.innerWidth()+11);}
vertTabs.css({minHeight:$('.ui-tabs-vertical').innerHeight()});vertTabs.parents('.LayoutFlushLeft').css('width',vertTabs.innerWidth()+11);}}
function reflowTabs()
{targetID.tabs("destroy");var tabLink='',tabText='';function mobileTabify(me)
{if(targetID.prev('a[name="'+target+'"]').length==0)
{targetID.prepend('<a name="'+target+'"></a>');}
tabLink=$(me).attr('href');tabText=($(me).attr('title')!='')?$(me).attr('title'):$(me).text();if($(tabLink).length>0)
{if($(tabLink).find('.TabsMobile').length!=0)
{$(tabLink).find('.TabsMobile').show();}
else
{$(tabLink).prepend('<a name="'+tabLink+'"></a>'+'<div class="LayoutBreakAfter TabsMobile">'+'<h2 class="LayoutRow TextH3 LayoutHItem">'+tabText+'</h2>'+'<div class="LayoutHItemRight LayoutRow">'+'<a href="#'+target+'">To the top<span class="LayoutSmallGutterLeft Icon IconSmallerTop"></span></a>'+'</div>'+'</div>')}}}
if(vertTabs.length==0)
{targetID.find('li.LayoutHItem a').each(function()
{mobileTabify($(this));});}
else
{targetID.find('.ui-tabpanel-vertical .LayoutGrid-4').css('width','');vertTabs.parents('.LayoutFlushLeft').css('width','');targetID.find('ul.ui-tabs-vertical li a').each(function()
{mobileTabify($(this));});targetID.find('.TabsMobile').addClass('LayoutCellSides');}}
if(dispatcher)
{if(dispatcher.hasLayoutEvent("phone")&&dispatcher.getLayoutEvent("phone").active)
{reflowTabs();}
else
{createTabs();}}
else
{createTabs();}
$(document).bind("adobe.reflow.LayoutChange",function(event,layoutEvent)
{if(layoutEvent.name=="phone")
{if(layoutEvent.active)
{reflowTabs();}
else
{createTabs();}}});};
adobe.reflow.Dispatcher=function(domElement){this.layoutEvents={};this.domElement=domElement;};adobe.reflow.Dispatcher.prototype={addLayoutEvent:function(layoutEvent){if(adobe.reflow.LayoutEvent.is(layoutEvent)){this.layoutEvents[layoutEvent.name]=layoutEvent;}
return this;},getLayoutEvent:function(name){if(this.hasLayoutEvent(name)){return this.layoutEvents[name];}
return new adobe.reflow.LayoutEvent(name);},hasLayoutEvent:function(name){return adobe.reflow.LayoutEvent.is(this.layoutEvents[name]);},removeLayoutEvent:function(name){if(this.hasLayoutEvent(name)){delete this.layoutEvents[name];}
return this;},updateLayout:function(integer){for(prop in this.layoutEvents){var layoutEvent=this.layoutEvents[prop],active=layoutEvent.isActive(),inRange=layoutEvent.isWithinRange(integer);if(active!=inRange){layoutEvent.setActive(inRange);this.fireLayoutChange(layoutEvent);}}
return this;},fireLayoutChange:function(layoutEvent){$(this.domElement).trigger("adobe.reflow.LayoutChange",layoutEvent);}};
adobe.reflow.LayoutEvent=function(name,minRange,maxRange){this.setName(name);this.setMinRange(minRange);this.setMaxRange(maxRange);this.setActive(false);};adobe.reflow.LayoutEvent.prototype={setName:function(name){this.name=String(name);},setMinRange:function(integer){this.minRange=parseInt(integer);},setMaxRange:function(integer){var value=parseInt(integer);if(isNaN(value)){value=Infinity;}
this.maxRange=value;},isActive:function(){return this.active;},setActive:function(yes){this.active=Boolean(yes);},isWithinRange:function(integer){var i=parseInt(integer);return i>=this.minRange&&i<=this.maxRange;}};adobe.reflow.LayoutEvent.is=function(func){return func!==undefined&&adobe.reflow.LayoutEvent.prototype.isPrototypeOf(func);};
$(document).ready(function()
{var dispatcher=adobe.vrbl("reflowDispatcher");if(dispatcher)
{if(dispatcher.hasLayoutEvent("desktopWide")&&dispatcher.getLayoutEvent("desktopWide").active)
{$("html").addClass('Wide');}
else if(dispatcher.hasLayoutEvent("phone")&&dispatcher.getLayoutEvent("phone").active)
{$("html").addClass('Slim');}
$(document).bind("adobe.reflow.LayoutChange",function(event,layoutEvent)
{if(layoutEvent.name=="desktopWide")
{if(layoutEvent.active)
{$("html").addClass('Wide');}
else
{$("html").removeClass('Wide');}}
else if(layoutEvent.name=="phone")
{if(layoutEvent.active)
{$("html").addClass('Slim');}
else
{$("html").removeClass('Slim');}}});}});