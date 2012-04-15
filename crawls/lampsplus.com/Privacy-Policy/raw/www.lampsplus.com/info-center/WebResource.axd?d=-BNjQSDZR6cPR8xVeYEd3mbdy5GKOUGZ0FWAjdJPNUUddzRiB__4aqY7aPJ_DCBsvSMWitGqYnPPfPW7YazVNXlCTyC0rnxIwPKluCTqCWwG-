
function Telligent_CallbackManager(variableName,postbackName,formID)
{this._variableName=variableName;this._postbackName=postbackName;this._form=document.getElementById(formID);}
Telligent_CallbackManager.prototype._responseCallback=function(xmlHttpRequest,clientCallback,context,clientErrorCallback)
{if(xmlHttpRequest.readyState!=4)
return;var result=xmlHttpRequest.responseText;if(result.length>0&&result.substr(0,1)=="s")
{var result=eval('('+result.substr(1)+')');if(clientCallback)
{try
{clientCallback(result.response,context);}
catch(e)
{alert(e.message);}}
var scriptLoader=new Telligent_ScriptLoader();if(result.includeScriptUrls&&result.includeScriptUrls.length>0)
{for(var i=0;i<result.includeScriptUrls.length;i++)
{scriptLoader.AddScriptToLoad(new Telligent_ScriptToLoad(true,result.includeScriptUrls[i]));}}
if(result.startupScripts&&result.startupScripts.length>0)
{for(var i=0;i<result.startupScripts.length;i++)
{scriptLoader.AddScriptToLoad(new Telligent_ScriptToLoad(false,result.startupScripts[i]));}}
scriptLoader.LoadAll();try
{__theFormPostData='';__theFormPostCollection=new Array();WebForm_InitCallback();}
catch(e){}}
else if(result.substr(0,1)=="e")
{if(clientErrorCallback)
clientErrorCallback(result.substr(1),context);else
alert(result.substr(1));}
else
{if(clientErrorCallback)
clientErrorCallback(null,context);}}
Telligent_CallbackManager.prototype._doCallback=function(argument,clientCallback,context,clientErrorCallback)
{var x=this._getXmlHttpRequest();if(x==null)
return;var url;if(this._form!=null&&this._form.action)
url=this._form.action;else
{url=window.location.href;url=url.replace(/\#.*$/,'');}
x.open("POST",url,true);x.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");var currentObject=eval(this._variableName);x.onreadystatechange=function(){currentObject._responseCallback(x,clientCallback,context,clientErrorCallback);};var postData=this._postbackName+'=';if(argument!=null)
postData+=encodeURIComponent(argument);if(this._form!=null)
{for(var i=0;i<this._form.length;i++)
{var element=this._form.elements[i];if(element.name)
{var elementValue=null;if(element.nodeName=='INPUT')
{var elementType=element.type.toLowerCase();if(elementType=='text'||elementType=='password'||elementType=='hidden')
elementValue=element.value;else if((elementType=='checkbox'||elementType=='radio')&&element.checked)
elementValue=element.value;}
else if(element.nodeName=='SELECT'||element.nodeName=='TEXTAREA')
elementValue=element.value;if(elementValue&&element.name!=this._postbackName)
postData+='&'+element.name+'='+encodeURIComponent(elementValue);}}}
x.send(postData);delete x;}
Telligent_CallbackManager.prototype._getXmlHttpRequest=function()
{var x=null;if(typeof XMLHttpRequest!="undefined")
{x=new XMLHttpRequest();}
else
{try
{x=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e)
{try
{x=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e)
{}}}
return x;}
function Telligent_ScriptLoader()
{this._scriptsToLoad=new Array();this._currentScript=0;this.AddScriptToLoad=function(scriptToLoad)
{this._scriptsToLoad[this._scriptsToLoad.length]=scriptToLoad;}
this.LoadAll=function()
{if(this._scriptsToLoad.length>0&&this._currentScript<this._scriptsToLoad.length)
this._scriptsToLoad[this._currentScript].Load(Telligent_Common.CreateSafeFunction(this,this._loadSuccessful),Telligent_Common.CreateSafeFunction(this,this._loadFailed));}
this._loadSuccessful=function()
{this._currentScript++;this.LoadAll();}
this._loadFailed=function(e)
{if(e)
alert(e.message);else if(window.error)
alert(window.error.message);else
alert('An unknown error occured while loading scripts associated to the latest callback');}}
function Telligent_ScriptToLoad(isInclude,content)
{this._isInclude=isInclude;this._content=content;this._element=null;this._completeCallback=null;this._errorCallback=null;this._errorTimeout=null;this.Load=function(completeCallback,errorCallback)
{if(this._isInclude)
{if(this._isScriptIncludeRegistered(this._content))
{if(completeCallback)
completeCallback();return;}
this._element=document.createElement('script');this._element.src=this._content;this._completeCallback=completeCallback;this._errorCallback=errorCallback;if(Telligent_Common.IsSafari())
{try
{document.getElementsByTagName("HEAD")[0].appendChild(this._element);}
catch(e)
{if(errorCallback)
errorCallback(e);return;}
setTimeout(Telligent_Common.CreateSafeFunction(this,this._completeCallback),999);}
else
{if(Telligent_Common.IsIE())
{this._element.onreadystatechange=Telligent_Common.CreateSafeFunction(this,this._readyStateChanged);}
else
{this._element.readyState='loaded';this._element.onload=Telligent_Common.CreateSafeFunction(this,this._readyStateChanged);}
document.getElementsByTagName("HEAD")[0].appendChild(this._element);this._errorTimeout=setTimeout(Telligent_Common.CreateSafeFunction(this,this._errorOccured),29999);}}
else
{var element=document.createElement('script');element.type='text/javascript';element.text=this._content;try
{document.getElementsByTagName("HEAD")[0].appendChild(element);if(!Telligent_Common.IsSafari())
document.getElementsByTagName("HEAD")[0].removeChild(element);}
catch(e)
{if(errorCallback)
errorCallback(e);return;}
if(completeCallback)
completeCallback();}}
this._isScriptIncludeRegistered=function(scriptUrl)
{var scripts=document.getElementsByTagName("SCRIPT");for(var i=0;i<scripts.length;i++)
{if(scripts[i].src==scriptUrl||scripts[i].src.indexOf(scriptUrl)+scriptUrl.length==scripts[i].src.length)
return true;}
return false;}
this._readyStateChanged=function()
{if(this._element&&(this._element.readyState=='loaded'||this._element.readyState=='complete'))
{clearTimeout(this._errorTimeout);this._element.onreadystatechange=null;this._element.onload=null;this._element.onerror=null;if(this._completeCallback)
this._completeCallback();}}
this._errorOccured=function()
{if(this._element)
{this._element.onreadystatechange=null;this._element.onload=null;this._element.onerror=null;}
if(this._errorCallback)
this._errorCallback({'message':'A script was not able to be loaded within the allowed time.  The callback has failed'});}};