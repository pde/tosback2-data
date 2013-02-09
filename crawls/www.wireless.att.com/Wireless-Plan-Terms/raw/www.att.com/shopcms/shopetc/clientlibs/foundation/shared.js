window.CQ=window.CQ||{};
CQ.shared={};
if(window.console===undefined){window.console={log:function(A){}}
}CQ.shared.HTTP=new function(){var createResponse=function(){var response=new Object();
response.headers=new Object();
response.body=new Object();
return response
};
var getResponseFromXhr=function(request){if(!request){return null
}var response=createResponse();
response.body=request.responseText;
response.headers[CQ.shared.HTTP.HEADER_STATUS]=request.status;
response.responseText=request.responseText;
response.status=request.status;
return response
};
var contextPath=null;
var SCRIPT_URL_REGEXP=/\/etc\/clientlibs\/foundation\/shared.*\.js$/;
var ENCODE_PATH_REGEXP=/[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/;
return{EXTENSION_HTML:".html",EXTENSION_JSON:".json",EXTENSION_RES:".res",HEADER_STATUS:"Status",HEADER_MESSAGE:"Message",HEADER_LOCATION:"Location",HEADER_PATH:"Path",PARAM_NO_CACHE:"cq_ck",get:function(url,callback,scope){url=CQ.shared.HTTP.getXhrHookedURL(CQ.shared.HTTP.externalize(url,true));
if(callback!=undefined){return $CQ.ajax({type:"GET",url:url,complete:function(request,textStatus){var response=getResponseFromXhr(request);
callback.call(scope||this,this,textStatus=="success",response)
}})
}else{try{var request=$CQ.ajax({type:"GET",url:url,async:false});
return getResponseFromXhr(request)
}catch(e){return null
}}},post:function(url,callback,params,scope){url=CQ.shared.HTTP.externalize(url,true);
var hook=CQ.shared.HTTP.getXhrHook(url,"POST",params);
if(hook){url=hook.url;
params=hook.params
}if(callback!=undefined){return $CQ.ajax({type:"POST",url:url,data:params,complete:function(request,textStatus){var response=CQ.shared.HTTP.buildPostResponseFromHTML(request.responseText);
callback.call(scope||this,this,textStatus=="success",response)
}})
}else{try{var request=$CQ.ajax({type:"POST",url:url,data:params,async:false});
return CQ.shared.HTTP.buildPostResponseFromHTML(request.responseText)
}catch(e){return null
}}},getParameter:function(url,name){var params=CQ.shared.HTTP.getParameters(url,name);
return params!=null?params[0]:null
},getParameters:function(url,name){var values=[];
if(!name){return null
}name=encodeURIComponent(name);
if(url.indexOf("?")==-1){return null
}var query=url.substring(url.indexOf("?")+1);
if(query.indexOf(name)==-1){return null
}var queryPts=query.split("&");
for(var i=0;
i<queryPts.length;
i++){var paramPts=queryPts[i].split("=");
if(paramPts[0]==name){values.push(paramPts.length>1?decodeURIComponent(paramPts[1]):"")
}}return values.length>0?values:null
},addParameter:function(url,name,value){if(value&&value instanceof Array){for(var i=0;
i<value.length;
i++){url=CQ.shared.HTTP.addParameter(url,name,value[i])
}return url
}var separator=url.indexOf("?")==-1?"?":"&";
var hashIdx=url.indexOf("#");
if(hashIdx<0){return url+separator+encodeURIComponent(name)+"="+encodeURIComponent(value)
}else{var hash=url.substring(hashIdx);
url=url.substring(0,hashIdx);
return url+separator+encodeURIComponent(name)+"="+encodeURIComponent(value)+hash
}},setParameter:function(url,name,value){url=CQ.shared.HTTP.removeParameter(url,name);
return CQ.shared.HTTP.addParameter(url,name,value)
},removeParameter:function(url,name){var pattern0="?"+encodeURIComponent(name)+"=";
var pattern1="&"+encodeURIComponent(name)+"=";
var pattern;
if(url.indexOf(pattern0)!=-1){pattern=pattern0
}else{if(url.indexOf(pattern1)!=-1){pattern=pattern1
}else{return url
}}var indexCutStart=url.indexOf(pattern);
var begin=url.substring(0,indexCutStart);
var indexCutEnd=url.indexOf("&",indexCutStart+1);
var end="";
if(indexCutEnd!=-1){end=url.substring(indexCutEnd);
if(end.indexOf("&")==0){end.replace("&","?")
}}return begin+end
},removeParameters:function(url){if(url.indexOf("?")!=-1){return url.substring(0,url.indexOf("?"))
}return url
},addSelector:function(url,selector,index){if(!index){index=0
}var post="";
var pIndex=url.indexOf("?");
if(pIndex==-1){pIndex=url.indexOf("#")
}if(pIndex!=-1){post=url.substring(pIndex);
url=url.substring(0,pIndex)
}var sIndex=url.lastIndexOf("/");
var main=url.substring(sIndex);
if(main.indexOf("."+selector+".")==-1){var path=url.substring(0,sIndex);
var obj=main.split(".");
var newMain="";
var delim="";
if(index>obj.length-2||index==-1){index=obj.length-2
}for(var i=0;
i<obj.length;
i++){newMain+=delim+obj[i];
delim=".";
if(index==i){newMain+=delim+selector
}}return path+newMain+post
}else{return url
}},setSelector:function(url,selector,index){var post="";
var pIndex=url.indexOf("?");
if(pIndex==-1){pIndex=url.indexOf("#")
}if(pIndex!=-1){post=url.substring(pIndex);
url=url.substring(0,pIndex)
}var selectors=CQ.shared.HTTP.getSelectors(url);
var ext=url.substring(url.lastIndexOf("."));
url=url.substring(0,url.lastIndexOf("."));
var fragment=(selectors.length>0)?url.replace("."+selectors.join("."),""):url;
if(selectors.length>0){for(var i=0;
i<selectors.length;
i++){if(index==i){fragment+="."+selector
}else{fragment+="."+selectors[i]
}}}else{fragment+="."+selector
}return fragment+ext+post
},getAnchor:function(url){if(url.indexOf("#")!=-1){return url.substring(url.indexOf("#")+1)
}return""
},setAnchor:function(url,anchor){return CQ.shared.HTTP.removeAnchor(url)+"#"+anchor
},removeAnchor:function(url){if(url.indexOf("#")!=-1){return url.substring(0,url.indexOf("#"))
}return url
},noCaching:function(url){return CQ.shared.HTTP.setParameter(url,CQ.shared.HTTP.PARAM_NO_CACHE,new Date().valueOf())
},buildPostResponseFromNode:function(node,response){if(!node){return null
}if(response==undefined){response=createResponse()
}for(var i=0;
i<node.childNodes.length;
i++){var child=node.childNodes[i];
if(child.tagName){if(child.id){if(child.href){response.headers[child.id]=child.href
}else{response.headers[child.id]=child.innerHTML
}}response=CQ.shared.HTTP.buildPostResponseFromNode(child,response)
}}return response
},buildPostResponseFromHTML:function(html){var response=createResponse();
try{if(html.responseText!=undefined){html=html.responseText
}else{if(typeof html!="string"){html=html.toString()
}}var div=document.createElement("div");
div.innerHTML=html;
response=CQ.shared.HTTP.buildPostResponseFromNode(div,response);
div=null
}catch(e){}return response
},getCookie:function(name){var cname=encodeURIComponent(name)+"=";
var dc=document.cookie;
if(dc.length>0){var begin=dc.indexOf(cname);
if(begin!=-1){begin+=cname.length;
var end=dc.indexOf(";",begin);
if(end==-1){end=dc.length
}return decodeURIComponent(dc.substring(begin,end))
}}return null
},setCookie:function(name,value,path,days,domain,secure){if(typeof (days)!="number"){days=7
}var date;
if(days>0){date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000))
}else{date=new Date(1970,0,1)
}document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; "+(days!=0?"expires="+date.toGMTString()+"; ":"")+(domain?"domain="+domain+"; ":"")+(path?"path="+path:"")+(secure?"; secure":"");
return value
},clearCookie:function(name,path,domain,secure){CQ.shared.HTTP.setCookie(name,"null",path||"",-1,domain||"",secure||"")
},getSchemeAndAuthority:function(url){try{if(url.indexOf("://")==-1){return""
}var end=url.indexOf("/",url.indexOf("://")+3);
if(end==-1){return url
}return url.substring(0,end)
}catch(e){return""
}},getContextPath:function(){return contextPath
},detectContextPath:function(){try{if(CQURLInfo.contextPath){contextPath=CQURLInfo.contextPath
}else{if(typeof CQ.CONTEXT_PATH!="undefined"){contextPath=CQ.CONTEXT_PATH
}else{if(typeof CQ_CONTEXT_PATH!="undefined"){contextPath=CQ_CONTEXT_PATH
}else{var scripts=document.getElementsByTagName("script");
for(var i=0;
i<scripts.length;
i++){var path=scripts[i].src;
if(path.indexOf("?")>=0){path=path.substring(0,path.indexOf("?"))
}if(SCRIPT_URL_REGEXP.test(path)){path=path.replace(/.*\:[\/][\/]/,"");
path=path.substring(path.indexOf("/"));
path=path.replace(SCRIPT_URL_REGEXP,"");
contextPath=path;
break
}}}}}}catch(e){}},externalize:function(url,encode){if(encode){url=CQ.shared.HTTP.encodePathOfURI(url)
}try{if(url.indexOf("/")==0&&contextPath&&url.indexOf(contextPath+"/")!=0){url=contextPath+url
}}catch(e){}return url
},internalize:function(url,doc){if(!doc){doc=document
}var docHost=CQ.shared.HTTP.getSchemeAndAuthority(doc.location.href);
var urlHost=CQ.shared.HTTP.getSchemeAndAuthority(url);
if(docHost==urlHost){return url.substring(urlHost.length+(contextPath?contextPath.length:0))
}else{return url
}},getPath:function(url){if(!url){if(CQURLInfo.requestPath){return CQURLInfo.requestPath
}}url=url||window.location.href;
url=CQ.shared.HTTP.internalize(url);
url=CQ.shared.HTTP.removeParameters(url);
url=CQ.shared.HTTP.removeAnchor(url);
var i=url.indexOf(".",url.lastIndexOf("/"));
if(i!=-1){url=url.substring(0,url.indexOf(".",url.lastIndexOf("/")))
}return url
},getSuffix:function(){if(CQURLInfo.suffix){return CQURLInfo.suffix
}return null
},getSelectors:function(url){if(!url){if(CQURLInfo.selectors){return CQURLInfo.selectors
}}var selectors=[];
url=url||window.location.href;
url=CQ.shared.HTTP.removeParameters(url);
url=CQ.shared.HTTP.removeAnchor(url);
var fragment=url.substring(url.lastIndexOf("/"));
if(fragment){var split=fragment.split(".");
if(split.length>2){for(var i=0;
i<split.length;
i++){if(i>0&&i<split.length-1){selectors.push(split[i])
}}}}return selectors
},getExtension:function(url){if(!url){if(CQURLInfo.extension){return CQURLInfo.extension
}}url=CQ.shared.HTTP.removeParameters(url);
url=CQ.shaerd.HTTP.removeAnchor(url);
var pos=url.lastIndexOf(".");
if(pos<0){return""
}url=url.substring(pos+1);
pos=url.indexOf("/");
if(pos<0){return url
}return url.substring(0,pos)
},encodePathOfURI:function(url){var parts,delim;
if(url.indexOf("?")!=-1){parts=url.split("?");
delim="?"
}else{if(url.indexOf("#")!=-1){parts=url.split("#");
delim="#"
}else{parts=[url]
}}if(ENCODE_PATH_REGEXP.test(parts[0])){parts[0]=CQ.shared.HTTP.encodePath(parts[0])
}return parts.join(delim)
},encodePath:function(path){path=encodeURI(path).replace(/%5B/g,"[").replace(/%5D/g,"]");
path=path.replace(/\+/g,"%2B");
path=path.replace(/\?/g,"%3F");
path=path.replace(/;/g,"%3B");
path=path.replace(/#/g,"%23");
path=path.replace(/=/g,"%3D");
path=path.replace(/\$/g,"%24");
path=path.replace(/,/g,"%2C");
path=path.replace(/'/g,"%27");
path=path.replace(/"/g,"%22");
return path
},eval:function(response){if(typeof response!="object"){response=CQ.shared.HTTP.get(response)
}try{return eval("("+(response.body?response.body:response.responseText)+")")
}catch(e){}return null
},isOkStatus:function(status){try{return(new String(status).indexOf("2")==0)
}catch(e){return false
}},isOk:function(response){try{return CQ.shared.HTTP.isOkStatus(response.headers[CQ.shared.HTTP.HEADER_STATUS])
}catch(e){return false
}},getXhrHook:function(url,method,params){method=method||"GET";
if(typeof CQ_XHR_HOOK!="undefined"&&$CQ.isFunction(CQ_XHR_HOOK)){var p={url:url,method:method};
if(params){p.params=params
}return CQ_XHR_HOOK(p)
}return null
},getXhrHookedURL:function(url,method,params){var hook=CQ.shared.HTTP.getXhrHook(url,method,params);
if(hook){return hook.url
}return url
},reloadHook:function(url){if(typeof CQ_RELOAD_HOOK!="undefined"&&$CQ.isFunction(CQ_RELOAD_HOOK)){if(CQURLInfo.selectorString!=""){url=CQ.shared.HTTP.addSelector(url,CQURLInfo.selectorString)
}url=CQ_RELOAD_HOOK(url)||url
}return url
}}
};
CQ.shared.Util=new function(){return{reload:function(win,url,preventHistory){if(!win){win=window
}if(!url){url=CQ.shared.HTTP.noCaching(win.location.href)
}url=CQ.shared.HTTP.reloadHook(url);
if(preventHistory){win.location.replace(url)
}else{win.location.href=url
}},load:function(url,preventHistory){CQ.shared.Util.reload(window,url,preventHistory)
},open:function(url,win,name,options){if(!win){win=window
}if(!url){return 
}url=CQ.shared.HTTP.reloadHook(url);
if(!name){name=""
}if(!options){options=""
}return win.open(url,name,options)
},htmlEncode:function(value){return !value?value:String(value).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
},htmlDecode:function(value){return !value?value:String(value).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&")
},ellipsis:function(value,length,word){if(value&&value.length>length){if(word){var vs=value.substr(0,length-2);
var index=Math.max(vs.lastIndexOf(" "),vs.lastIndexOf("."),vs.lastIndexOf("!"),vs.lastIndexOf("?"),vs.lastIndexOf(";"));
if(index==-1||index<(length-15)){return value.substr(0,length-3)+"..."
}else{return vs.substr(0,index)+"..."
}}else{return value.substr(0,length-3)+"..."
}}return value
},patchText:function(text,snippets){if(snippets){if(!$CQ.isArray(snippets)){text=text.replace("{0}",snippets)
}else{for(var i=0;
i<snippets.length;
i++){text=text.replace(("{"+i+"}"),snippets[i])
}}}return text
},eval:function(response){return CQ.shared.HTTP.eval(response)
},getTopWindow:function(){var win=window;
try{while(win.parent&&win!==win.parent&&win.parent.location.href){win=win.parent
}}catch(error){}return win
}}
};
CQ.shared.Sling=function(){return{SELECTOR_INFINITY:".infinity",CHARSET:"_charset_",STATUS:":status",STATUS_BROWSER:"browser",OPERATION:":operation",OPERATION_DELETE:"delete",OPERATION_MOVE:"move",DELETE_SUFFIX:"@Delete",TYPEHINT_SUFFIX:"@TypeHint",COPY_SUFFIX:"@CopyFrom",MOVE_SUFFIX:"@MoveFrom",ORDER:":order",REPLACE:":replace",DESTINATION:":dest",SAVE_PARAM_PREFIX:":saveParamPrefix",IGNORE_PARAM:":ignore",REQUEST_LOGIN_PARAM:"sling:authRequestLogin",processBinaryData:function(A){if(A&&A[":jcr:data"]!=undefined){var B=new Object();
B.size=A[":jcr:data"];
B.type=A["jcr:mimeType"];
B.date=A["jcr:lastModified"];
A=B
}return A
},getContentPath:function(B,A){var C=A;
if(C.lastIndexOf(".")>C.lastIndexOf("/")){C=C.substr(0,C.indexOf(".",C.lastIndexOf("/")))
}if(B){if(B.indexOf("/")==0){C=B
}else{B=B.replace("./","");
C=C+"/"+B
}}return C
}}
}();
CQ.Sling=CQ.shared.Sling;
CQ.shared.XSS=new function(){return{getXSSPropertyName:function(A){if(!A){return""
}if(CQ.shared.XSS.KEY_REGEXP.test(A)){return A
}return A+=CQ.shared.XSS.KEY_SUFFIX
},getXSSRecordPropertyValue:function(E,C,A){var D="";
if(E&&C){var B=E.get(this.getXSSPropertyName(C));
if(B){D=B
}else{D=E.get(C)
}if(A&&!isNaN(A)){D=CQ.shared.Util.ellipsis(D,A,true)
}}return D
},getXSSTablePropertyValue:function(D,C,A){var E="";
if(D&&C){var B=D[this.getXSSPropertyName(C)];
if(B){E=B
}else{E=D[C]
}if(A&&!isNaN(A)){E=CQ.shared.Util.ellipsis(E,A,true)
}}return E
},getXSSValue:function(A){if(A){return CQ.shared.Util.htmlEncode(A)
}else{return""
}},updatePropertyName:function(A,B){if(!A||!B||!A[B]){return 
}if(A.xssProtect&&!A.xssKeepPropName){A[B]=this.getXSSPropertyName(A[B])
}},xssPropertyRenderer:function(D,B,C,A){if(A&&A.dataIndex&&C&&C.data&&C.data[this.getXSSPropertyName(A.dataIndex)]){D=C.data[this.getXSSPropertyName(A.dataIndex)];
if(A.ellipsisLimit&&!isNaN(A.ellipsisLimit)){D=CQ.shared.Util.ellipsis(D,A.ellipsisLimit,true)
}return D
}else{if(D){return D
}else{return""
}}}}
};
CQ.shared.XSS.KEY_SUFFIX="_xss";
CQ.shared.XSS.KEY_REGEXP=new RegExp(CQ.shared.XSS.KEY_SUFFIX+"$");
CQ.shared.ClientSidePersistence=function(A){var B={PERSISTENCE_NAME:"ClientSidePersistence",config:{},cache:null,decodeRecursively:function(E,F){var D=E;
F=F||1;
for(var C=0;
(C<F)&&E;
C++){E=decodeURIComponent(E);
if(E.length>=D.length){break
}D=E
}return E
},getMode:function(){return this.config.mode
},getWindow:function(){return this.config.window||_g.shared.Util.getTopWindow()
},debug:function(){if(console){var C=this.getMap();
var E="[ClientSidePersistence -> mode="+this.getMode().name+", container="+(this.config.container||"")+"]\n";
var D=0;
var F=new RegExp("^"+this.config.container+"/");
for(var H=0,K=Object.keys(C).sort(),I=null;
H<K.length;
H++){var J=K[H];
if(this.config.container&&(typeof (J)=="string")&&!J.match(F)){continue
}var G=C[J];
E+="-["+ ++D+"]-> '"+J.replace(F,"")+"' = '"+this.decodeRecursively(G,5)+"'\n"
}if(!D){E+="(container is empty)"
}console.log(E)
}},keyName:function(C){return(this.config.container?(this.config.container+"/"):"")+C
},get:function(C){var D=this.getMap()[this.keyName(C)];
return this.decodeRecursively(D)
},set:function(D,G){D=(typeof D==="string")?D.replace(/:=/g,""):"";
var F={key:D};
D=this.keyName(D);
if(!D.length){return 
}var C=[];
var H=this.getMap();
F.action=H[D]?"update":"set";
if(G){H[D]=encodeURIComponent(G)
}else{F.action="remove";
delete H[D]
}for(var E in H){C.push(E+":="+H[E])
}this.cache=H;
this.write(C.join("|"));
$CQ.extend(F,{value:G,mode:this.getMode().name,container:this.config.container});
$CQ(CQ.shared.ClientSidePersistence).trigger(CQ.shared.ClientSidePersistence.EVENT_NAME,F)
},getMap:function(){if(!this.cache||!this.config.useCache){var F=this.read().split("|");
var D={};
for(var C=0;
C<F.length;
C++){var G=F[C].split(":=");
var E=G[0];
if(E&&E.length){D[E]=G[1]||""
}}this.cache=D
}return this.cache
},remove:function(C){this.set(C)
},clearMap:function(){this.write()
},read:function(){return this.config.mode.read(this)||""
},write:function(C){this.config.mode.write(this,C||"")
}};
$CQ.extend(B.config,CQ.shared.ClientSidePersistence.defaultConfig,A);
if(B.config.useContainer===false){B.config.container=null
}if((B.config.mode===CQ.shared.ClientSidePersistence.MODE_SESSION)&&(!window.sessionStorage||!window.sessionStorage.getItem||!window.sessionStorage.setItem)){B.config.mode=CQ.shared.ClientSidePersistence.MODE_LOCAL
}if((B.config.mode===CQ.shared.ClientSidePersistence.MODE_LOCAL)&&(!window.localStorage||!window.localStorage.getItem||!window.localStorage.setItem)){B.config.mode=CQ.shared.ClientSidePersistence.MODE_WINDOW
}return B
};
CQ.shared.ClientSidePersistence.EVENT_NAME="ClientSidePersistence";
CQ.shared.ClientSidePersistence.MODE_SESSION={name:"session",read:function(A){return A.getWindow().sessionStorage.getItem(A.PERSISTENCE_NAME)
},write:function(A,B){A.getWindow().sessionStorage.setItem(A.PERSISTENCE_NAME,B)
}};
CQ.shared.ClientSidePersistence.MODE_LOCAL={name:"local",read:function(A){return A.getWindow().localStorage.getItem(A.PERSISTENCE_NAME)
},write:function(A,B){A.getWindow().localStorage.setItem(A.PERSISTENCE_NAME,B)
}};
CQ.shared.ClientSidePersistence.MODE_WINDOW={name:"window",read:function(A){return A.getWindow().name
},write:function(A,B){A.getWindow().name=B
}};
CQ.shared.ClientSidePersistence.MODE_COOKIE={COOKIE_NAME:"SessionPersistence",name:"cookie",read:function(A){return A.decodeRecursively(CQ.shared.ClientSidePersistence.CookieHelper.read(this.COOKIE_NAME))
},write:function(A,B){if(!B){CQ.shared.ClientSidePersistence.CookieHelper.erase(this.COOKIE_NAME)
}else{B=A.decodeRecursively(B,2);
CQ.shared.ClientSidePersistence.CookieHelper.set(this.COOKIE_NAME,encodeURIComponent(B),365)
}}};
CQ.shared.ClientSidePersistence.defaultConfig={window:CQ.shared.Util.getTopWindow(),useCache:false,container:null,mode:CQ.shared.ClientSidePersistence.MODE_LOCAL};
CQ.shared.ClientSidePersistence.CookieHelper={set:function(C,D,E){var A="";
if(E){var B=new Date();
B.setTime(B.getTime()+(E*24*60*60*1000));
A="; expires="+B.toGMTString()
}document.cookie=C+"="+D+A+"; path=/"
},read:function(B){var D=B+"=";
var A=document.cookie.split(";");
for(var C=0;
C<A.length;
C++){var E=A[C];
while(E.charAt(0)==" "){E=E.substring(1,E.length)
}if(E.indexOf(D)==0){return E.substring(D.length,E.length)
}}return null
},erase:function(A){CQ.shared.ClientSidePersistence.CookieHelper.set(A,"",-1)
}};
CQ.shared.HTTP.detectContextPath();