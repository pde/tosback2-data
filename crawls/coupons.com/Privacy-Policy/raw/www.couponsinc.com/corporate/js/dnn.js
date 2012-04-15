
var DNN_HIGHLIGHT_COLOR='#9999FF';var COL_DELIMITER=String.fromCharCode(18);var ROW_DELIMITER=String.fromCharCode(17);var QUOTE_REPLACEMENT=String.fromCharCode(19);var KEY_LEFT_ARROW=37;var KEY_UP_ARROW=38;var KEY_RIGHT_ARROW=39;var KEY_DOWN_ARROW=40;var KEY_RETURN=13;var KEY_ESCAPE=27;Type.registerNamespace('dnn');dnn.extend=function(dest,src)
{for(s in src)
dest[s]=src[s];return dest;}
dnn.extend(dnn,{apiversion:new Number('04.01'),pns:'',ns:'dnn',diagnostics:null,vars:null,dependencies:new Array(),isLoaded:false,delay:[],_delayedSet:null,getVars:function()
{if(this.vars==null)
{var ctl=dnn.dom.getById('__dnnVariable');if(ctl.value.indexOf('`')==0)
ctl.value=ctl.value.substring(1).replace(/`/g,'"');if(ctl.value.indexOf('__scdoff')!=-1)
{COL_DELIMITER='~|~';ROW_DELIMITER='~`~';QUOTE_REPLACEMENT='~!~';}
if(ctl!=null&&ctl.value.length>0)
this.vars=Sys.Serialization.JavaScriptSerializer.deserialize(ctl.value);else
this.vars=[];}
return this.vars;},getVar:function(key,def)
{if(this.getVars()[key]!=null)
{var re=eval('/'+QUOTE_REPLACEMENT+'/g');return this.getVars()[key].replace(re,'"');}
return def;},setVar:function(key,val)
{if(this.vars==null)
this.getVars();this.vars[key]=val;var ctl=dnn.dom.getById('__dnnVariable');if(ctl==null)
{ctl=dnn.dom.createElement('INPUT');ctl.type='hidden';ctl.id='__dnnVariable';dnn.dom.appendChild(dnn.dom.getByTagName("body")[0],ctl);}
if(dnn.isLoaded)
ctl.value=Sys.Serialization.JavaScriptSerializer.serialize(this.vars);else
dnn._delayedSet={key:key,val:val};return true;},callPostBack:function(action)
{var postBack=dnn.getVar('__dnn_postBack');var data='';if(postBack.length>0)
{data+=action;for(var i=1;i<arguments.length;i++)
{var aryParam=arguments[i].split('=');data+=COL_DELIMITER+aryParam[0]+COL_DELIMITER+aryParam[1];}
eval(postBack.replace('[DATA]',data));return true;}
return false;},createDelegate:function(oThis,ptr)
{return Function.createDelegate(oThis,ptr);},doDelay:function(key,time,ptr,ctx)
{if(this.delay[key]==null)
{this.delay[key]=new dnn.delayObject(ptr,ctx,key);this.delay[key].num=window.setTimeout(dnn.createDelegate(this.delay[key],this.delay[key].complete),time);}},cancelDelay:function(key)
{if(this.delay[key]!=null)
{window.clearTimeout(this.delay[key].num);this.delay[key]=null;}},decodeHTML:function(html)
{return html.toString().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"');},encode:function(arg,doubleEncode)
{var ret=arg;if(encodeURIComponent)
ret=encodeURIComponent(ret);else
ret=escape(ret);if(doubleEncode==false)
return ret;return ret.replace(/%/g,"%25");},encodeHTML:function(html)
{return html.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/\"/g,"&quot;");},encodeJSON:function(json)
{return json.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"\u0027").replace(/\"/g,"&quot;").replace(/\\/g,"\\\\");},evalJSON:function(data)
{return Sys.Serialization.JavaScriptSerializer.deserialize(data);},escapeForEval:function(s)
{return s.replace(/\\/g,'\\\\').replace(/\'/g,"\\'").replace(/\r/g,'').replace(/\n/g,'\\n').replace(/\./,'\\.');},getEnumByValue:function(enumType,val)
{for(var prop in enumType)
{if(typeof(enumType[prop])=='number'&&enumType[prop]==val)
return prop;}},_onload:function()
{dnn.isLoaded=true;if(dnn._delayedSet)
dnn.setVar(dnn._delayedSet.key,dnn._delayedSet.val);}});dnn.delayObject=function(ptr,ctx,type)
{this.num=null;this.pfunc=ptr;this.context=ctx;this.type=type;}
dnn.delayObject.prototype={complete:function()
{dnn.delay[this.type]=null;this.pfunc(this.context);}}
dnn.delayObject.registerClass('dnn.delayObject');dnn.ScriptRequest=function(src,text,fCallBack)
{this.ctl=null;this.xmlhttp=null;this.src=null;this.text=null;if(src!=null&&src.length>0)
{var file=dnn.dom.scriptFile(src);var embedSrc=dnn.getVar(file+'.resx','');if(embedSrc.length>0)
this.src=embedSrc;else
this.src=src;}
if(text!=null&&text.length>0)
this.text=text;this.callBack=fCallBack;this.status='init';this.timeOut=5000;this._xmlhttpStatusChangeDelegate=dnn.createDelegate(this,this.xmlhttpStatusChange);this._statusChangeDelegate=dnn.createDelegate(this,this.statusChange);this._completeDelegate=dnn.createDelegate(this,this.complete);this._reloadDelegate=dnn.createDelegate(this,this.reload);}
dnn.ScriptRequest.prototype={load:function()
{this.status='loading';this.ctl=document.createElement('script');this.ctl.type='text/javascript';if(this.src!=null)
{if(dnn.dom.browser.isType(dnn.dom.browser.Safari))
{this.xmlhttp=new XMLHttpRequest();this.xmlhttp.open('GET',this.src,true);this.xmlhttp.onreadystatechange=this._xmlhttpStatusChangeDelegate;this.xmlhttp.send(null);return;}
else
{if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer))
this.ctl.onreadystatechange=this._statusChangeDelegate;else if(dnn.dom.browser.isType(dnn.dom.browser.Opera)==false)
this.ctl.onload=this._completeDelegate;this.ctl.src=this.src;}
dnn.dom.scriptElements[this.src]=this.ctl;}
else
{if(dnn.dom.browser.isType(dnn.dom.browser.Safari))
this.ctl.innerHTML=dnn.encodeHTML(this.text);else
this.ctl.text=this.text;}
var oHeads=dnn.dom.getByTagName('HEAD');if(oHeads)
{if(dnn.dom.browser.isType(dnn.dom.browser.Opera)==false||this.src!=null)
oHeads[0].appendChild(this.ctl);}
else
alert('Cannot load dynamic script, no HEAD tag present.');if(this.src==null||dnn.dom.browser.isType(dnn.dom.browser.Opera))
this.complete();else if(this.timeOut)
dnn.doDelay('loadScript_'+this.src,this.timeOut,this._reloadDelegate,null);},xmlhttpStatusChange:function()
{if(this.xmlhttp.readyState!=4)
return;this.src=null;this.text=this.xmlhttp.responseText;this.load();},statusChange:function()
{if((this.ctl.readyState=='loaded'||this.ctl.readyState=='complete')&&this.status!='complete')
this.complete();},reload:function()
{if(dnn.dom.scriptStatus(this.src)=='complete')
{this.complete();}
else
{this.load();}},complete:function()
{dnn.cancelDelay('loadScript_'+this.src);this.status='complete';if(typeof(this.callBack)!='undefined')
this.callBack(this);this.dispose();},dispose:function()
{this.callBack=null;if(this.ctl)
{if(this.ctl.onreadystatechange)
this.ctl.onreadystatechange=new function(){};else if(this.ctl.onload)
this.ctl.onload=null;this.ctl=null;}
this.xmlhttp=null;this._xmlhttpStatusChangeDelegate=null;this._statusChangeDelegate=null;this._completeDelegate=null;this._reloadDelegate=null;}}
dnn.ScriptRequest.registerClass('dnn.ScriptRequest');Type.registerNamespace('dnn.dom');dnn.extend(dnn.dom,{pns:'dnn',ns:'dom',browser:null,__leakEvts:[],scripts:[],scriptElements:[],tweens:[],attachEvent:function(ctl,type,fHandler)
{if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)==false)
{var name=type.substring(2);ctl.addEventListener(name,function(evt){dnn.dom.event=new dnn.dom.eventObject(evt,evt.target);return fHandler();},false);}
else
ctl.attachEvent(type,function(){dnn.dom.event=new dnn.dom.eventObject(window.event,window.event.srcElement);return fHandler();});return true;},cursorPos:function(ctl)
{if(ctl.value.length==0)
return 0;var pos=-1;if(ctl.selectionStart)
pos=ctl.selectionStart;else if(ctl.createTextRange)
{var sel=window.document.selection.createRange();var range=ctl.createTextRange();if(range==null||sel==null||((sel.text!="")&&range.inRange(sel)==false))
return-1;if(sel.text=="")
{if(range.boundingLeft==sel.boundingLeft)
pos=0;else
{var tagName=ctl.tagName.toLowerCase();if(tagName=="input")
{var text=range.text;var i=1;while(i<text.length)
{range.findText(text.substring(i));if(range.boundingLeft==sel.boundingLeft)
break;i++;}}
else if(tagName=="textarea")
{var i=ctl.value.length+1;var oCaret=document.selection.createRange().duplicate();while(oCaret.parentElement()==ctl&&oCaret.move("character",1)==1)
--i;if(i==ctl.value.length+1)
i=-1;}
pos=i;}}
else
pos=range.text.indexOf(sel.text);}
return pos;},cancelCollapseElement:function(ctl)
{dnn.cancelDelay(ctl.id+'col');ctl.style.display='none';},collapseElement:function(ctl,num,pCallBack)
{if(num==null)
num=10;ctl.style.overflow='hidden';var ctx=new Object();ctx.num=num;ctx.ctl=ctl;ctx.pfunc=pCallBack;ctl.origHeight=ctl.offsetHeight;dnn.dom.__collapseElement(ctx);},__collapseElement:function(ctx)
{var num=ctx.num;var ctl=ctx.ctl;var step=ctl.origHeight/num;if(ctl.offsetHeight-(step*2)>0)
{ctl.style.height=(ctl.offsetHeight-step).toString()+'px';dnn.doDelay(ctl.id+'col',10,dnn.dom.__collapseElement,ctx);}
else
{ctl.style.display='none';if(ctx.pfunc!=null)
ctx.pfunc();}},cancelExpandElement:function(ctl)
{dnn.cancelDelay(ctl.id+'exp');ctl.style.overflow='';ctl.style.height='';},disableTextSelect:function(ctl)
{if(typeof ctl.onselectstart!="undefined")
ctl.onselectstart=function(){return false}
else if(typeof ctl.style.MozUserSelect!="undefined")
ctl.style.MozUserSelect="none"
else
ctl.onmousedown=function(){return false}},expandElement:function(ctl,num,pCallBack)
{if(num==null)
num=10;if(ctl.style.display=='none'&&ctl.origHeight==null)
{ctl.style.display='';ctl.style.overflow='';ctl.origHeight=ctl.offsetHeight;ctl.style.overflow='hidden';ctl.style.height='1px';}
ctl.style.display='';var ctx=new Object();ctx.num=num;ctx.ctl=ctl;ctx.pfunc=pCallBack;dnn.dom.__expandElement(ctx);},__expandElement:function(ctx)
{var num=ctx.num;var ctl=ctx.ctl;var step=ctl.origHeight/num;if(ctl.offsetHeight+step<ctl.origHeight)
{ctl.style.height=(ctl.offsetHeight+step).toString()+'px';dnn.doDelay(ctl.id+'exp',10,dnn.dom.__expandElement,ctx);}
else
{ctl.style.overflow='';ctl.style.height='';if(ctx.pfunc!=null)
ctx.pfunc();}},deleteCookie:function(name,path,domain)
{if(this.getCookie(name))
{this.setCookie(name,'',-1,path,domain);return true;}
return false;},getAttr:function(node,attr,def)
{if(node.getAttribute==null)
return def;var val=node.getAttribute(attr);if(val==null||val=='')
return def;else
return val;},getById:function(id,ctl)
{return $get(id,ctl);},getByTagName:function(tag,ctl)
{if(ctl==null)
ctl=document;if(ctl.getElementsByTagName)
return ctl.getElementsByTagName(tag);else if(ctl.all&&ctl.all.tags)
return ctl.all.tags(tag);else
return null;},getParentByTagName:function(ctl,tag)
{var parent=ctl.parentNode;tag=tag.toLowerCase();while(parent!=null)
{if(parent.tagName&&parent.tagName.toLowerCase()==tag)
return parent;parent=parent.parentNode;}
return null;},getCookie:function(name)
{var cookie=" "+document.cookie;var search=" "+name+"=";var ret=null;var offset=0;var end=0;if(cookie.length>0)
{offset=cookie.indexOf(search);if(offset!=-1)
{offset+=search.length;end=cookie.indexOf(";",offset)
if(end==-1)
end=cookie.length;ret=unescape(cookie.substring(offset,end));}}
return(ret);},getNonTextNode:function(node)
{if(this.isNonTextNode(node))
return node;while(node!=null&&this.isNonTextNode(node))
{node=this.getSibling(node,1);}
return node;},addSafeHandler:function(ctl,evt,obj,method)
{ctl[evt]=this.getObjMethRef(obj,method);if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer))
{if(this.__leakEvts.length==0)
dnn.dom.attachEvent(window,'onunload',dnn.dom.destroyHandlers);this.__leakEvts[this.__leakEvts.length]=new dnn.dom.leakEvt(evt,ctl,ctl[evt]);}},destroyHandlers:function()
{var iCount=dnn.dom.__leakEvts.length-1;for(var i=iCount;i>=0;i--)
{var oEvt=dnn.dom.__leakEvts[i];oEvt.ctl.detachEvent(oEvt.name,oEvt.ptr);oEvt.ctl[oEvt.name]=null;dnn.dom.__leakEvts.length=dnn.dom.__leakEvts.length-1;}},getObjMethRef:function(obj,methodName)
{return(function(e){e=e||window.event;return obj[methodName](e,this);});},getSibling:function(ctl,offset)
{if(ctl!=null&&ctl.parentNode!=null)
{for(var i=0;i<ctl.parentNode.childNodes.length;i++)
{if(ctl.parentNode.childNodes[i].id==ctl.id)
{if(ctl.parentNode.childNodes[i+offset]!=null)
return ctl.parentNode.childNodes[i+offset];}}}
return null;},isNonTextNode:function(node)
{return(node.nodeType!=3&&node.nodeType!=8);},getScript:function(src)
{if(this.scriptElements[src])
return this.scriptElements[src];var oScripts=dnn.dom.getByTagName('SCRIPT');for(var s=0;s<oScripts.length;s++)
{if(oScripts[s].src!=null&&oScripts[s].src.indexOf(src)>-1)
{this.scriptElements[src]=oScripts[s];return oScripts[s];}}},getScriptSrc:function(src)
{var resx=dnn.getVar(src+'.resx','');if(resx.length>0)
return resx;return src;},getScriptPath:function()
{var oThisScript=dnn.dom.getScript('dnn.js');if(oThisScript)
return oThisScript.src.replace('dnn.js','');var sSP=dnn.getVar('__sp');if(sSP)
return sSP;return'';},scriptFile:function(src)
{var ary=src.split('/');return ary[ary.length-1];},loadScript:function(src,text,callBack)
{var sFile;if(src!=null&&src.length>0)
{sFile=this.scriptFile(src);if(this.scripts[sFile]!=null)
return;}
var oSR=new dnn.ScriptRequest(src,text,callBack);if(sFile)
this.scripts[sFile]=oSR;oSR.load();return oSR;},loadScripts:function(aSrc,aText,callBack)
{if(dnn.scripts==null)
{var oRef=function(aSrc,aText,callBack)
{return(function(){dnn.dom.loadScripts(aSrc,aText,callBack);});};dnn.dom.loadScript(dnn.dom.getScriptPath()+'dnn.scripts.js',null,oRef(aSrc,aText,callBack));return;}
var oBatch=new dnn.scripts.ScriptBatchRequest(aSrc,aText,callBack);oBatch.load();},scriptStatus:function(src)
{var sFile=this.scriptFile(src);if(this.scripts[sFile])
return this.scripts[sFile].status;var oScript=this.getScript(src);if(oScript!=null)
return'complete';else
return'';},setScriptLoaded:function(src)
{var sFile=this.scriptFile(src);if(this.scripts[sFile]&&dnn.dom.scripts[sFile].status!='complete')
dnn.dom.scripts[sFile].complete();},navigate:function(sURL,sTarget)
{if(sTarget!=null&&sTarget.length>0)
{if(sTarget=='_blank')
window.open(sURL);else
document.frames[sTarget].location.href=sURL;}
else
{if(Sys.Browser.agent===Sys.Browser.InternetExplorer)
window.navigate(sURL);else
window.location.href=sURL;}
return false;},setCookie:function(name,val,days,path,domain,isSecure)
{var sExpires;if(days)
{sExpires=new Date();sExpires.setTime(sExpires.getTime()+(days*24*60*60*1000));}
document.cookie=name+"="+escape(val)+((sExpires)?"; expires="+sExpires.toGMTString():"")+
((path)?"; path="+path:"")+((domain)?"; domain="+domain:"")+((isSecure)?"; secure":"");if(document.cookie.length>0)
return true;},getCurrentStyle:function(node,prop)
{var style=Sys.UI.DomElement._getCurrentStyle(node);if(style)
return style[prop];return'';},getFormPostString:function(ctl)
{var sRet='';if(ctl!=null)
{if(ctl.tagName&&ctl.tagName.toLowerCase()=='form')
{for(var i=0;i<ctl.elements.length;i++)
sRet+=this.getElementPostString(ctl.elements[i]);}
else
{sRet=this.getElementPostString(ctl);for(var i=0;i<ctl.childNodes.length;i++)
sRet+=this.getFormPostString(ctl.childNodes[i]);}}
return sRet;},getElementPostString:function(ctl)
{var tagName;if(ctl.tagName)
tagName=ctl.tagName.toLowerCase();if(tagName=='input')
{var type=ctl.type.toLowerCase();if(type=='text'||type=='password'||type=='hidden'||((type=='checkbox'||type=='radio')&&ctl.checked))
return ctl.name+'='+dnn.encode(ctl.value,false)+'&';}
else if(tagName=='select')
{for(var i=0;i<ctl.options.length;i++)
{if(ctl.options[i].selected)
return ctl.name+'='+dnn.encode(ctl.options[i].value,false)+'&';}}
else if(tagName=='textarea')
return ctl.name+'='+dnn.encode(ctl.value,false)+'&';return'';},appendChild:function(oParent,oChild)
{return oParent.appendChild(oChild);},removeChild:function(oChild)
{return oChild.parentNode.removeChild(oChild);},createElement:function(tagName)
{return document.createElement(tagName.toLowerCase());}});dnn.dom.leakEvt=function(name,ctl,oPtr)
{this.name=name;this.ctl=ctl;this.ptr=oPtr;}
dnn.dom.leakEvt.registerClass('dnn.dom.leakEvt');dnn.dom.eventObject=function(e,srcElement)
{this.object=e;this.srcElement=srcElement;}
dnn.dom.eventObject.registerClass('dnn.dom.eventObject');dnn.dom.browserObject=function()
{this.InternetExplorer='ie';this.Netscape='ns';this.Mozilla='mo';this.Opera='op';this.Safari='safari';this.Konqueror='kq';this.MacIE='macie';var type;var agt=navigator.userAgent.toLowerCase();if(agt.indexOf('konqueror')!=-1)
type=this.Konqueror;else if(agt.indexOf('msie')!=-1&&agt.indexOf('mac')!=-1)
type=this.MacIE;else if(Sys.Browser.agent===Sys.Browser.InternetExplorer)
type=this.InternetExplorer;else if(Sys.Browser.agent===Sys.Browser.FireFox)
type=this.Mozilla;else if(Sys.Browser.agent===Sys.Browser.Safari)
type=this.Safari;else if(Sys.Browser.agent===Sys.Browser.Opera)
type=this.Opera;else
type=this.Mozilla;this.type=type;this.version=Sys.Browser.version;var sAgent=navigator.userAgent.toLowerCase();if(this.type==this.InternetExplorer)
{var temp=navigator.appVersion.split("MSIE");this.version=parseFloat(temp[1]);}
if(this.type==this.Netscape)
{var temp=sAgent.split("netscape");this.version=parseFloat(temp[1].split("/")[1]);}}
dnn.dom.browserObject.prototype={toString:function()
{return this.type+' '+this.version;},isType:function()
{for(var i=0;i<arguments.length;i++)
{if(dnn.dom.browser.type==arguments[i])
return true;}
return false;}}
dnn.dom.browserObject.registerClass('dnn.dom.browserObject');dnn.dom.browser=new dnn.dom.browserObject();if(typeof($)=='undefined')
{eval("function $() {var ary = new Array(); for (var i=0; i<arguments.length; i++) {var arg = arguments[i]; var ctl; if (typeof arg == 'string') ctl = dnn.dom.getById(arg); else ctl = arg; if (ctl != null && typeof(Element) != 'undefined' && typeof(Element.extend) != 'undefined') Element.extend(ctl); if (arguments.length == 1) return ctl; ary[ary.length] = ctl;} return ary;}");}
try{document.execCommand("BackgroundImageCache",false,true);}catch(err){}
Sys.Application.add_load(dnn._onload);
