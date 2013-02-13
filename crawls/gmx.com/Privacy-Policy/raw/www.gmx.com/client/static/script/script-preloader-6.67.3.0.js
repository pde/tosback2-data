
window.mailclient=window.mailclient||{};window.mailclient.ScriptPreloader={_scripts:null,_scriptPath:"",_stop:false,_scriptListFiles:{"webkit":"script-preloader-webkit-6.67.3.0.js","opera":"script-preloader-opera-6.67.3.0.js","gecko":"script-preloader-gecko-6.67.3.0.js","mshtml":"script-preloader-mshtml-6.67.3.0.js"},_akamaiScriptBase:{http:"http://s.uicdn.com/www.gmx.com/client/static/script/",https:"https://sec-s.uicdn.com/www.gmx.com/client/static/script/"},start:function(scriptPath,avoidAkamaiUrls)
{this._stop=false;avoidAkamaiUrls=avoidAkamaiUrls||window.location.host.indexOf("-qs")!=-1;if(avoidAkamaiUrls&&scriptPath)
{this._scriptPath=scriptPath;}
else
{var isSSL=window.location.protocol.indexOf("https")!=-1;this._scriptPath=isSSL?this._akamaiScriptBase.https:this._akamaiScriptBase.http;}
if(!this._scripts){this.loadScriptList(this._scriptPath+this._getScriptListFileName(),this._onScriptListLoaded,this);}else{this._loadNextScript();}},_onScriptListLoaded:function(status)
{if(status=="success")
{this._loadNextScript();}},stop:function()
{this._stop=true;},loadScriptList:function(url,handler,scope)
{$.ajax({url:url,cache:true,dataType:"script",complete:function(evt,status){handler.call(scope,status);}});},loadScript:function(url,handler,scope){var script=new Image();script.onload=function(){window.setTimeout(function(){handler.call(scope);},0);};script.onerror=function(){window.setTimeout(function(){handler.call(scope);},0);};script.src=url;},_loadNextScript:function()
{if(this._scripts.length>0&&!this._stop){this.loadScript(this._scriptPath+this._scripts.shift(),this._loadNextScript,this);}},_getScriptListFileName:function()
{var browser="";var file="";if($.browser.msie){browser="mshtml";}else if($.browser.mozilla){browser="gecko";}else if($.browser.webkit){browser="webkit";}else if($.browser.opera){browser="opera";}
return this._scriptListFiles[browser];}};