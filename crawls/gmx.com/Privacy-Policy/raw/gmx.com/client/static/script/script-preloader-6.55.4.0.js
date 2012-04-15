
window.mailclient=window.mailclient||{};window.mailclient.ScriptPreloader={_scripts:null,_scriptPath:"",_stop:false,_scriptListFiles:{"webkit":"script-preloader-webkit-6.55.4.0.js","opera":"script-preloader-opera-6.55.4.0.js","gecko":"script-preloader-gecko-6.55.4.0.js","mshtml":"script-preloader-mshtml-6.55.4.0.js"},start:function(scriptPath)
{this._stop=false;if(scriptPath){this._scriptPath=scriptPath;}
if(!this._scripts){this.loadScript(scriptPath+this._getScriptListFileName(),this._onScriptListLoaded,this)}else{this._loadNextScript();}},_onScriptListLoaded:function(evt,status)
{if(status=="success")
{if($.browser.msie){window.execScript(evt.responseText)}else{eval(evt.responseText);}
this._loadNextScript();}},stop:function()
{this._stop=true;},loadScript:function(url,handler,scope)
{$.ajax({url:url,dataType:"text",complete:function(evt,status){handler.call(scope,evt,status);}});},_loadNextScript:function()
{if(this._scripts.length>0&&!this._stop){this.loadScript(this._scriptPath+this._scripts.shift(),this._loadNextScript,this);}},_getScriptListFileName:function()
{var browser="";var file="";if($.browser.msie){browser="mshtml";}else if($.browser.mozilla){browser="gecko";}else if($.browser.webkit){browser="webkit";}else if($.browser.opera){browser="opera";}
return this._scriptListFiles[browser];}};