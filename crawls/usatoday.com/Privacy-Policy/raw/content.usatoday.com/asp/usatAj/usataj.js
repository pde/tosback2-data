try{if(document.domain!='usatoday.com'){document.domain='usatoday.com'}}catch(ignore){status='not in usatoday.com'
setTimeout(function(){status=''},4000)}
function usatAj(baseHref,proxyPrefix){var loc=document.location
if(!baseHref)baseHref=loc.pathname.replace(/[^/]*$/,'')
if(!baseHref.match(/\/$/)) baseHref+= '/'
if(!baseHref.match(/^[a-z]+\:\/\//))
baseHref=loc.protocol+'//'+loc.host+(baseHref.match(/^\//)?baseHref:loc.pathname.replace(/[^/]*$/,''))
this.urlPrefix=baseHref
var h=baseHref.split('/')
this.hostPrefix=[h[0],'',h[2]].join('/')
var defaultProxyPrefix=self.usatAjDefaultProxyPrefix?usatAjDefaultProxyPrefix:this.autoDefaultProxyPrefix()
this.proxyPrefix=this.qualifyUrl(proxyPrefix?proxyPrefix.replace(/[^/]*$/,''):defaultProxyPrefix)
this.proxyHost=this.urlHost(this.proxyPrefix)}

usatAj.prototype={autoDefaultProxyPrefix:function(){var us=document.getElementsByTagName('SCRIPT')
for(var j=us.length-1;j>=0;j--){var me=us[j].src
if(me.match(/usataj\.js/))
return me.replace(/[^/]*$/,'')}
return'http://content.usatoday.com/asp/usataj/'},
_debugBuffer:[],
showDebug:function(){if(!this.Debug)return
var debugDiv=document.getElementById('debugDiv')
if(!debugDiv)return
function pad(n){return('0'+n).substring(n>9?1:0)}
var now=new Date()
var h=pad(now.getHours())
var m=pad(now.getMinutes())
var s=pad(now.getSeconds())
var t=h+':'+m+':'+s+' '
for(var j=0;j<arguments.length;j++)
t+=arguments[j]
t+='\n'
var txt=t
.replace(/[&]/g,'&amp;')
.replace(/[<]/g,'&lt;')
.replace(/[ ]/g,'&nbsp;')
.replace(/[\n]/g,'<br />\n')
this._debugBuffer.push(txt)
var This=this
setTimeout(function(){var buf=This._debugBuffer
if(buf.length){buf.push('<hr size="1px" />\n')
debugDiv.innerHTML+=buf.join('')
This._debugBuffer=[]}},1)},
showAjDebug:function(level){if(!this.Debug||level>this.Debug)return
var args=['usatAj ',location.host,'  ']
for(var j=1;j<arguments.length;j++)args.push(arguments[j])
this.showDebug.apply(this,args)},
Debug:0,

transitionImage:'<span class="transImg"><img src="http://i.usatoday.net/_common/_images/squaresAnimated.gif" /></span>',

TodoList:function(temporary){var This=this
This._todo=[]
This.Todo=function(fn){if(This._todo)
This._todo.push(fn)
else if(temporary)
throw temporary
else
fn.apply(This,This._args)}
This.Unfinished=function(){return This._todo?true:false}
This.Finish=function(){var queue=This._todo
if(!queue)throw'redundant finish'
This._todo=null
This._args=arguments
for(var j=0;j<queue.length;j++)
queue[j].apply(This,arguments)}},

urlHost:function(url){return url.split('/')[2]},

qualifyUrl:function(path){if(path.match(/^[a-z]+:\/\//))return path
if(path.match(/^\//))
return this.hostPrefix+path
else
return this.urlPrefix+path},

ajax:function(u_rl,rH,errH,timeout){try{this.showAjDebug(2,'ajax u_rl: ',u_rl)
var url=this.qualifyUrl(u_rl)
this.showAjDebug(2,'ajax url: ',url,' urlHost is ',this.urlHost(url))
if(url.length<2000&&location.host==this.urlHost(url)){this.showAjDebug(2,'requesting GET')
this.doRequest('GET',url,{},'',rH,errH,timeout)}else{this.showAjDebug(2,'delegating to fallback')
this.showAjDebug(3,'fallback is ',usatAj.ajaxFallback,' fallback proxy prefix is ',usatAj.proxyPrefix)
try{usatAj.ajaxFallback(url,rH,errH,timeout)}catch(ex){this.showError(ex,'trying to run ajaxFallback')}}}catch(ex){this.showError(ex,'can not run ajax',u_rl)}},

postHeader:{'Content-Type':'application/x-www-form-urlencoded'},

ajaxFallback:function(url,rH,errH,timeout){this.showAjDebug(1,'ajaxFallback url: ',url)
var purl=this.proxyPrefix+'post.ashx'
var body=this.ToQueryString({method:'GET',lrl:url})
this.doRequest('POST',purl,this.postHeader,body,rH,errH,timeout)},

pajax:function(u_rl,body,rH,errH,timeout){try{this.showAjDebug(2,'pajax ',u_rl,' -- ',body)
var url=this.qualifyUrl(u_rl)
if(location.host==this.urlHost(url))
this.doRequest('POST',url,this.postHeader,body,rH,errH,timeout)
else try{usatAj.pajaxFallback(url,body,rH,errH,timeout)}catch(ex){this.showError(ex,'trying to run pajaxFallback',u_rl)}}catch(ex){this.showError(ex,'can not run pajax',u_rl)}
try{this.addNode(document.getElementsByTagName('head')[0], 'img', '', {src: 'http://content.usatoday.com/asp/usataj/post.gif?'+body})}catch(ex){}
},
pajaxFallback:function(url,bod,rH,errH,timeout){this.showAjDebug(1,'pajaxFallback ',url,' -- ',bod)
var purl=this.proxyPrefix+'post.ashx'
var body=this.ToQueryString({method:'POST',
lrl:url,
body:bod,
contenttype:this.postHeader['Content-Type']})
if(!errH)errH=function(){}
this.doRequest('POST',purl,this.postHeader,body,rH,errH,timeout)},

request:function(){return new XMLHttpRequest()},

safeReq:function(req,prop){try{return req[prop]}catch(ignore){return{status:567,responseText:null}[prop]}},

doRequest:function(method,url,headers,body,rH,errH,timeout){this.showAjDebug(1,'doRequest ',method,' ',url,' ',body)
var req=this.request()
var This=this
var timeoutHack=true
if(!timeout)timeout=60000
var abortTimer=setTimeout(function(){if(timeoutHack){req.abort()
if(errH)
errH({req:req,results:null,rH:rH,status:'timeout',url:url,timeout:timeout})}},timeout)
req.open(method,url,true)
req.onreadystatechange=function(){This.showAjDebug(2,'ajax state change ',req.readyState,' for ',url)
if(req.readyState!=4)return
try{timeoutHack=false
clearTimeout(abortTimer)}catch(ex){This.showError(ex,'error trying clearTimeout for ',url)}
var reqStatus=This.safeReq(req,'status')
This.showAjDebug(1,reqStatus,' - ',url)
var ok=200<=reqStatus&&304>=reqStatus||null==reqStatus
var results=This.safeReq(req,'responseText')
if(ok){This.showAjDebug(2,'RESULTS FOR ',url,':\n',results)
rH(results)}else{This.showAjDebug(1,'NOT OK, RESULTS FOR ',url,':\n',results)
try{if(errH){This.showAjDebug(1,'running error handler ',errH)
var context={req:req,
results:results,
rH:rH,
status:status,
url:url}
errH(context)}}catch(e){This.showAjDebug(1,'could not run error handler ',errH,':')
This.showError(e,'running error handler for '+url)}}}
for(var h in headers)
req.setRequestHeader(h,headers[h])
req.setRequestHeader('Referer',document.location.href)
req.send(body)},

_onUnloads:{},
ahah:function(tagOrId,innerHTML,url,optionalErrorHtml){try{var tag=('string'==typeof tagOrId)?$(tagOrId):tagOrId
var id=tag.id
if(id&&usatAj._onUnloads[id])usatAj._onUnloads[id].Finish()
var This=this
var oldHTML=tag.innerHTML
tag.innerHTML=innerHTML?innerHTML:this.transitionImage
var rH=function(results){tag.innerHTML=results
This.execJS(tag)}
var errH=function(req){if(optionalErrorHtml){tag.innerHTML=optionalErrorHtml
This.execJS(tag)}else{tag.innerHTML=oldHTML}}
this.ajax(url,rH,errH)}catch(ex){this.showError(ex,'can not run ahah',url)}},

addNode:function(parent,name,text,attr,temporarily){this.showAjDebug(2,'addNode ',name,' ',text)
var el=document.createElement(name)
if(text)el.text=text
for(var p in attr){this.showAjDebug(2,'addNode attribute ',p,': ',attr[p])
el.setAttribute(p,attr[p])}
parent.appendChild(el)
if(temporarily)parent.removeChild(el)},

jsNext:[],jsPending:0,
pjs:function(url,body,rH,errh){this.js(url+'?'+body,rH,errH)},
js:function(url,rH,errH){this.showAjDebug(1,'js: ',url)
if(usatAj.jsPending){usatAj.jsNext.push({url:url,
rH:rH,
This:this})}else{usatAj.jsPending=1
var This=this
document.continueUsatJs=function(httpStatus,contentType,body){This.showAjDebug(2,'continueUsatJs: ',httpStatus,', "',contentType,'" -- ',body)
document.continueUsatJs=null
usatAj.jsPending=0
if(0<usatAj.jsNext.length){var next=usatAj.jsNext.shift()
next.This.js(next.url,next.rH)}
if(200==httpStatus){This.showAjDebug(2,body)
try{rH(body)}catch(e){This.showAjDebug(1,"JS response exception: ",e.message)}}else if(errH){var context={'this':This,
url:u,
rH:rH,
errH:errH,
req:{status:httpStatus,
contentType:contentType,
responseText:body}}
errH(context)}}
var u=this.qualifyUrl(url)
var parent=document.getElementsByTagName('head')[0]
this.addNode(parent,'script','',{type:'text/javascript',
src:this.proxyPrefix+'js.ashx?fn=document.continueUsatJs&typ=js&lrl='+escape(u)+'&cacheDefeat='+new Date().getTime()})}},

bSaf:(navigator.userAgent.indexOf('Safari')!=-1),
bOpera:(navigator.userAgent.indexOf('Opera')!=-1),
bMoz:(navigator.appName=='Netscape'),
scriptBody:function(node){return node.text},
scriptNodes:function(node,needArray){this.showAjDebug(3,'scriptNodes ',node.id)
var r=node.getElementsByTagName('SCRIPT')
if(!needArray)return r
var a=new Array(r.length)
for(var j=0;j<r.length;j++)a[j]=r[j]
return a},
discardElement:function(el){var bin=$('IELeakGarbageBin')
if(!bin){bin=document.createElement('DIV')
bin.id='IELeakGarbageBin'
bin.style.display='none'
document.body.appendChild(bin)}
bin.appendChild(el)
bin.innerHTML=''},
_garbage:0,
moveTo:function(target,what){this.showAjDebug(1,'moveTo ',target,' <- ',what)
if(!target||!what)return
if(what.parentNode){var oldID=what.id
var oldHTML=what.innerHTML
what=what.parentNode.removeChild(what)
if(oldID){var trash=$(oldID)
if(trash&&trash.innerHTML!=oldHTML){trash.id='usatGarbage'+usatAj._garbage++
this.discardElement(trash)}
what.id=oldID}}else
this.showAjDebug(1,what,' (',what.id,') has no parentNode')
this.showDebug(2,'moving ',target.id,' <- ',what.id)
if(this.Debug>2){this.showAjDebug(3,target.id,': ',target.innerHTML)
this.showAjDebug(3,what.id,': ',what.innerHTML)}
target.appendChild(what)
return what},
_marker:0,
markPosition:function(what){this.showAjDebug(1,'markPosition ',what,' ',usatAj._marker)
var mark=document.createElement('span')
mark.id='usatAjMarker'+usatAj._marker++
what.parentNode.insertBefore(mark,what)
return mark.id},
execScript:function(node,text,attr){this.showAjDebug(1,'execScript: ',node.id,'\n',text)
attr=attr||{type:'text/javascript'}
this.addNode(node,'script',text,attr,true)},
execJS:function(node,whenDone,context,text){this.showAjDebug(3,'execJS ',(text?'re':''),'entry')

var This=this
if(!context){this.showAjDebug(1,'execJS for node ',node.id)
context={docText:'',
ev:true,
loadQueue:[],
onLoad:null,
script:null,
todo:this.scriptNodes(node,true),
write:document.write,
writeln:document.writeln}
if(node.id)context.onUnloads=usatAj._onUnloads[node.id]=new this.TodoList()
if(self.addEventListener){context.eventMethod='addEventListener'
context.loadEvent='load'
context.unloadEvent='unload'
context.preserveHandler=self.addEventListener
context.queueEvent=function(a,f){a.push(f)}}else if(self.attachEvent){context.eventMethod='attachEvent'
context.loadEvent='onload'
context.unloadEvent='onunload'
context.preserveHandler=self.attachEvent
context.queueEvent=function(a,f){a.unshift(f)}}else{context.ev=false}}
var execDone=function(){This.showAjDebug(1,'execDone for ',node.id,' ',context.onLoad,' -- ',context.loadQueue)
try{if(context.onLoad)
usatAj.documentOnLoad.Todo(context.onLoad)}catch(ignore){}
context.onLoad=null
var fn=null
try{for(var j=0;j<context.loadQueue.length;j++){fn=context.loadQueue[j]
fn({type:'load'})}}catch(blah){This.showError(blah,'execDone: '+fn)}
context.loadQueue=[]
if(whenDone)whenDone()}
while(context.todo.length||context.script||context.docText){this.showAjDebug(3,'execJS need to process ',context.todo.length,' nodes')
if(context.todo.length&&!context.script){this.showAjDebug(3,'execJS building next script tag')
context.script={}
var tag=context.todo.shift()
for(var p in{archive:1,charset:1,event:1,'for':1,language:1,type:1}){this.showAjDebug(3,'execJS considering attribute ',p)
if(tag.attributes[p]&&tag.attributes[p].value){this.showAjDebug(3,'execJS adding attribute ',p,' value: ',tag.attributes[p].value)
context.script[p]=tag.attributes[p].value}}
if(tag.attributes.src&&tag.attributes.src.value){this.showAjDebug(1,'will execute ',tag.attributes.src.value)
var Continue=function(txt){This.execJS(node,whenDone,context,txt)}
var Abort=function(){Continue('')}
this.ajax(tag.attributes.src.value,Continue,Abort)
return}else{this.showAjDebug(3,'getting script to execute from content of tag')
text=this.scriptBody(tag)}}
var docText=''
if(context.script){var oldScriptCount=this.scriptNodes(node).length
var onLoad=self.onload
if(context.ev&&!usatAj.documentOnLoad.Unfinished()){self[context.eventMethod]=function(typ,fn){if(context.loadEvent==typ)
context.queueEvent(context.loadQueue,fn)
else if(context.unloadEvent==typ&&context.onUnloads)
context.onUnloads.Todo(fn)
else
context.preserveHandler.apply(self,arguments)}}
try{self.onload=context.onLoad
document.write=function(txt){docText+=txt}
document.writeln=function(txt){docText+=txt+'\n'}
if(self.usat&&usat.page)usat.page.writeString=document.write
this.execScript(node,text,context.script)
context.onLoad=self.onload}catch(ex){this.showError(ex,text)}
self[context.eventMethod]=context.preserveHandler
self.onload=onLoad
context.script=null}
docText+=context.docText
context.docText=''
if(docText){var normalizedText=docText.toLowerCase()
var endx=normalizedText.indexOf('</script')
if(endx>-1)endx=docText.indexOf('>',endx)
if(endx>-1&&-1<normalizedText.indexOf('</script',endx)){context.docText=docText.substring(endx+1)
docText=docText.substring(0,endx+1)}
this.showAjDebug(1,'with ',context.todo.length,' additional script tags pending, emulating document.write of:\n',docText)
var o,objs=[],marks=[]
while((o=node.getElementsByTagName('OBJECT')).length){marks.push(this.markPosition(o[0]))
objs.push(this.moveTo(node.parentNode,o[0]))}
node.innerHTML+=docText
for(var j=0;j<objs.length;j++){var mark=$(marks[j])
mark.parentNode.replaceChild(objs[j],mark)}
var sNodes=this.scriptNodes(node)
var deferred=[]
for(var j=sNodes.length-1;j>=oldScriptCount;j--){this.showAjDebug(3,'bringing in raw script node at index position ',j)
var newNode=sNodes[j]
if(newNode.attributes.defer&&newNode.attributes.defer.value){this.showAjDebug(3,'deferring script node ',newNode.outerHTML)
deferred.unshift(newNode)}else{this.showAjDebug(3,'queueing script node ',newNode.outerHTML)
context.todo.unshift(newNode)}}
for(var j=0;j<deferred.length;j++)context.todo.push(deferred[j])
if(sNodes.length>oldScriptCount)this.showAjDebug(1,'now ',context.todo.length,' script tags pending')}
if(!context.todo.length)this.showAjDebug(1,'Executing javascript...done')}
if(execDone)execDone()
document.write=context.write
document.writeln=context.writeln
if(self.usat&&usat.page)usat.page.writeString=document.write},
_exceptionLogURL:'http://content.usatoday.com/asp/ExceptionLogger/logger.ashx',
showError:function(ex,where,det){var det=det||'_'
try{var url=this._exceptionLogURL+'?loc='+escape(where)+' '+(ex&&ex.message&&' ~ '+ex.message||'')+'&det='+escape(det)
this.addNode(document.body,'img','',{src:url,
height:1,
width:1})}catch(ignore){}
this.showAjDebug(1,'ERROR: ',(ex.message?ex.message:'what? '),(ex.location?' at '+ex.location:''))
this.showAjDebug(1,where)
if('_'!=det)this.showAjDebug(1,det)},

GetCookieValue:function(name){var c=(' '+document.cookie).match(new RegExp(' '+name+'=[^;]*','g'))||[]
var r=''
for(var j=0;j<c.length;j++){var v=c[j]
if(v.length>r.length)r=v}
return unescape(r.substring(2+name.length))},
ParseValue:function(val){var o={}
var namval=val.split('&')
for(var j=0;j<namval.length;j++){var pair=namval[j].split('=')
if(2==pair.length){o[pair[0]]=unescape(pair[1])}}
return o},
GetCookieObject:function(name){return this.ParseValue(this.GetCookieValue(name))},
GetQueryObject:function(){return this.ParseValue(document.location.search.substring(1))},
ToQueryString:function(val){var v=val
var start=0
if('string'!=typeof val){var start=1
v=''
for(var p in val){v+='&'+p+'='+escape(val[p])}}
return v.substring(start)},
SetCookie:function(name,val,days){var v=this.ToQueryString(val)
var expires=''
if(days){var exp=new Date()
exp.setTime(exp.getTime()+days*24*60*60*1000)
expires='; expires='+exp.toGMTString()}
document.cookie=name+'='+escape(v)+'; domain=.usatoday.com; path=/'+expires},
DeleteCookie:function(name){this.SetCookie(name,'',-1)},
end:{}}
{var p=usatAj.prototype
if(p.bSaf){usatAj.prototype.scriptBody=function(node){return node.innerHTML}
usatAj.prototype.execScript=function(node,text,attr){this.showAjDebug(1,'execScript (safari):\n',text)
eval(text)}}else if(!p.bOpera&&p.bMoz){usatAj.prototype.scriptBody=function(node){return node.textContent}}
try{if(!self.XMLHttpRequest){if(self.ActiveXObject){usatAj.prototype.request=function(){return new ActiveXObject('Microsoft.XMLHTTP')}}else{usatAj.prototype.ajax=p.js}}}catch(bleah){usatAj.prototype.ajax=p.js}

var tmp=new usatAj()
for(var p in tmp)
usatAj[p]=tmp[p]

usatAj.documentOnLoad=new usatAj.TodoList()
var cb=function(){try{usatAj.documentOnLoad.Finish()}catch(ignore){}}
if(self.addEventListener){self.addEventListener('load',cb,false)}else if(self.attachEvent){self.attachEvent('onload',cb)}else if(self.onload){var wOnLoad=self.onload
self.onload=function(){try{wOnLoad()}catch(ignore){}
cb()}}else{self.onload=cb}

if(usatAj.proxyHost!=location.host){usatAj.showAjDebug(1,'proxyHost: ',usatAj.proxyHost,' != location.host: ',location.host)
var proxyTodo=new usatAj.TodoList()
usatAj.HostProxyReady=proxyTodo.Finish
proxyTodo.Todo(function(proxy){usatAj.showAjDebug(1,'Received proxy instance')
proxy.showDebug=function(){usatAj.showDebug.apply(usatAj,arguments)}})
var delegateFallback=function(deferredMethod,fallbackHandler){usatAj.showAjDebug(1,'Delegating fallback calls for ',deferredMethod)

var fallback=deferredMethod+'Fallback'
usatAj[fallback]=function(){usatAj.showAjDebug(1,'proxy not ready, using js as ',fallback)
var methArgs=arguments
fallbackHandler.apply(usatAj,arguments)}
proxyTodo.Todo(function(proxy){usatAj[fallback]=function(){proxy[deferredMethod].apply(proxy,arguments)}})}
delegateFallback('ajax',usatAj.js)
delegateFallback('pajax',usatAj.pjs)

document.write('<iframe id="usatajifhost" style="width:0px; height:0px; border:0px" src="')
document.write(usatAj.proxyPrefix)
document.write('usatajhost.htm"></iframe>\n')}

usatAj.scriptNotBroken=-1
usatAj.execScript(document.getElementsByTagName('head')[0],'usatAj.scriptNotBroken*=-1')
usatAj.scriptNotBroken=Math.max(usatAj.scriptNotBroken,0)}

function $(){var elements=[]
for(var i=0;i<arguments.length;i++){var element=arguments[i]
if(typeof element=='string')element=document.getElementById(element)
if(arguments.length==1)return element
elements.push(element)}
return elements}

