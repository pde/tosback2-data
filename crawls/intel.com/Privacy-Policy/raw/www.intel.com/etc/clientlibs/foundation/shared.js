window._g=window._g||{};
_g.shared={};
if(window.console===undefined){window.console={log:function(A){}}
}_g.shared.HTTP=new function(){var createResponse=function(){var response=new Object();
response.headers=new Object();
response.body=new Object();
return response
};
var getResponseFromXhr=function(request){if(!request){return null
}var response=createResponse();
response.body=request.responseText;
response.headers[_g.HTTP.HEADER_STATUS]=request.status;
response.responseText=request.responseText;
response.status=request.status;
return response
};
var contextPath=null;
var SCRIPT_URL_REGEXP=/\/etc\/clientlibs\/.*\/shared.*\.js$/;
var ENCODE_PATH_REGEXP=/[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/;
var LOGIN_TRIGGERED=false;
return{EXTENSION_HTML:".html",EXTENSION_JSON:".json",EXTENSION_RES:".res",HEADER_STATUS:"Status",HEADER_MESSAGE:"Message",HEADER_LOCATION:"Location",HEADER_PATH:"Path",PARAM_NO_CACHE:"cq_ck",get:function(url,callback,scope,suppressForbiddenCheck){url=_g.HTTP.getXhrHookedURL(_g.HTTP.externalize(url,true));
if(callback!=undefined){return _g.$.ajax({type:"GET",url:url,complete:function(request,textStatus){var response=getResponseFromXhr(request);
if(!suppressForbiddenCheck){_g.HTTP.handleForbidden(response)
}callback.call(scope||this,this,textStatus=="success",response)
}})
}else{try{var request=_g.$.ajax({type:"GET",url:url,async:false});
var response=getResponseFromXhr(request);
if(!suppressForbiddenCheck){_g.HTTP.handleForbidden(response)
}return response
}catch(e){return null
}}},post:function(url,callback,params,scope,suppressErrorMsg,suppressForbiddenCheck){url=_g.HTTP.externalize(url,true);
var hook=_g.HTTP.getXhrHook(url,"POST",params);
if(hook){url=hook.url;
params=hook.params
}if(callback!=undefined){return _g.$.ajax({type:"POST",url:url,data:params,complete:function(request,textStatus){var response=_g.HTTP.buildPostResponseFromHTML(request.responseText);
if(!suppressForbiddenCheck){_g.HTTP.handleForbidden(request)
}callback.call(scope||this,this,textStatus=="success",response)
}})
}else{try{var request=_g.$.ajax({type:"POST",url:url,data:params,async:false});
var response=_g.HTTP.buildPostResponseFromHTML(request.responseText);
if(!suppressForbiddenCheck){_g.HTTP.handleForbidden(request)
}return response
}catch(e){return null
}}},getParameter:function(url,name){var params=_g.HTTP.getParameters(url,name);
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
i++){url=_g.HTTP.addParameter(url,name,value[i])
}return url
}var separator=url.indexOf("?")==-1?"?":"&";
var hashIdx=url.indexOf("#");
if(hashIdx<0){return url+separator+encodeURIComponent(name)+"="+encodeURIComponent(value)
}else{var hash=url.substring(hashIdx);
url=url.substring(0,hashIdx);
return url+separator+encodeURIComponent(name)+"="+encodeURIComponent(value)+hash
}},setParameter:function(url,name,value){url=_g.HTTP.removeParameter(url,name);
return _g.HTTP.addParameter(url,name,value)
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
if(end.indexOf("&")==0){end=end.replace("&","?")
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
}var selectors=_g.HTTP.getSelectors(url);
var ext=url.substring(url.lastIndexOf("."));
url=url.substring(0,url.lastIndexOf("."));
var fragment=(selectors.length>0)?url.replace("."+selectors.join("."),""):url;
if(selectors.length>0){for(var i=0;
i<selectors.length;
i++){if(index==i){fragment+="."+selector
}else{fragment+="."+selectors[i]
}}}else{fragment+="."+selector
}return fragment+ext+post
},addSelectors:function(url,selectors){var res=url;
if(url&&selectors&&selectors.length){for(var i=0;
i<selectors.length;
i++){res=_g.HTTP.addSelector(res,selectors[i],i)
}}return res
},getAnchor:function(url){if(url.indexOf("#")!=-1){return url.substring(url.indexOf("#")+1)
}return""
},setAnchor:function(url,anchor){return _g.HTTP.removeAnchor(url)+"#"+anchor
},removeAnchor:function(url){if(url.indexOf("#")!=-1){return url.substring(0,url.indexOf("#"))
}return url
},noCaching:function(url){return _g.HTTP.setParameter(url,_g.HTTP.PARAM_NO_CACHE,new Date().valueOf())
},buildPostResponseFromNode:function(node,response){if(!node){return null
}if(response==undefined){response=createResponse()
}for(var i=0;
i<node.childNodes.length;
i++){var child=node.childNodes[i];
if(child.tagName){if(child.id){if(child.href){response.headers[child.id]=child.href
}else{response.headers[child.id]=child.innerHTML
}}response=_g.HTTP.buildPostResponseFromNode(child,response)
}}return response
},buildPostResponseFromHTML:function(html){var response=createResponse();
try{if(html.responseText!=undefined){html=html.responseText
}else{if(typeof html!="string"){html=html.toString()
}}var div=document.createElement("div");
div.innerHTML=html;
response=_g.HTTP.buildPostResponseFromNode(div,response);
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
}else{date=new Date(0)
}document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; "+(days!=0?"expires="+date.toGMTString()+"; ":"")+(domain?"domain="+domain+"; ":"")+(path?"path="+path:"")+(secure?"; secure":"");
return value
},clearCookie:function(name,path,domain,secure){_g.HTTP.setCookie(name,"null",path||"",-1,domain||"",secure||"")
},getSchemeAndAuthority:function(url){try{if(url.indexOf("://")==-1){return""
}var end=url.indexOf("/",url.indexOf("://")+3);
if(end==-1){return url
}return url.substring(0,end)
}catch(e){return""
}},getContextPath:function(){return contextPath
},detectContextPath:function(){try{if(CQURLInfo){contextPath=CQURLInfo.contextPath||""
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
}}}}catch(e){}},externalize:function(url,encode){if(encode){url=_g.HTTP.encodePathOfURI(url)
}try{if(url.indexOf("/")==0&&contextPath&&url.indexOf(contextPath+"/")!=0){url=contextPath+url
}}catch(e){}return url
},internalize:function(url,doc){if(!doc){doc=document
}var docHost=_g.HTTP.getSchemeAndAuthority(doc.location.href);
var urlHost=_g.HTTP.getSchemeAndAuthority(url);
if(docHost==urlHost){return url.substring(urlHost.length+contextPath.length)
}else{return url
}},getPath:function(url){if(!url){if(CQURLInfo.requestPath){return CQURLInfo.requestPath
}}url=url||window.location.href;
url=_g.HTTP.internalize(url);
url=_g.HTTP.removeParameters(url);
url=_g.HTTP.removeAnchor(url);
var i=url.indexOf(".",url.lastIndexOf("/"));
if(i!=-1){url=url.substring(0,url.indexOf(".",url.lastIndexOf("/")))
}return url
},getSuffix:function(){if(CQURLInfo.suffix){return CQURLInfo.suffix
}return null
},getSelectors:function(url){if(!url){if(CQURLInfo.selectors){return CQURLInfo.selectors
}}var selectors=[];
url=url||window.location.href;
url=_g.HTTP.removeParameters(url);
url=_g.HTTP.removeAnchor(url);
var fragment=url.substring(url.lastIndexOf("/"));
if(fragment){var split=fragment.split(".");
if(split.length>2){for(var i=0;
i<split.length;
i++){if(i>0&&i<split.length-1){selectors.push(split[i])
}}}}return selectors
},getExtension:function(url){if(!url){if(CQURLInfo.extension){return CQURLInfo.extension
}}url=_g.HTTP.removeParameters(url);
url=_g.HTTP.removeAnchor(url);
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
}}if(ENCODE_PATH_REGEXP.test(parts[0])){parts[0]=_g.HTTP.encodePath(parts[0])
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
},eval:function(response){if(typeof response!="object"){response=_g.HTTP.get(response)
}try{return eval("("+(response.body?response.body:response.responseText)+")")
}catch(e){}return null
},isOkStatus:function(status){try{return(new String(status).indexOf("2")==0)
}catch(e){return false
}},isOk:function(response){try{return _g.HTTP.isOkStatus(response.headers[_g.HTTP.HEADER_STATUS])
}catch(e){return false
}},handleForbidden:function(response,suppressLogin){try{if(response[_g.HTTP.HEADER_STATUS.toLowerCase()]==403){if(!suppressLogin&&!LOGIN_TRIGGERED){LOGIN_TRIGGERED=true;
alert(_g.I18n.get("Your request could not be completed because you have been signed out."));
var l=_g.Util.getTopWindow().document.location;
l.href=_g.HTTP.externalize(_g.Sling.LOGIN_URL)+"?resource="+l.pathname+encodeURIComponent(l.search)+l.hash
}return true
}return false
}catch(e){return false
}},getXhrHook:function(url,method,params){method=method||"GET";
if(typeof G_XHR_HOOK!="undefined"&&_g.$.isFunction(G_XHR_HOOK)){var p={url:url,method:method};
if(params){p.params=params
}return G_XHR_HOOK(p)
}return null
},getXhrHookedURL:function(url,method,params){var hook=_g.HTTP.getXhrHook(url,method,params);
if(hook){return hook.url
}return url
},reloadHook:function(url){if(typeof G_RELOAD_HOOK!="undefined"&&_g.$.isFunction(G_RELOAD_HOOK)){if(CQURLInfo.selectorString!=""){url=_g.HTTP.addSelector(url,CQURLInfo.selectorString)
}url=G_RELOAD_HOOK(url)||url
}return url
}}
};
_g.HTTP=_g.shared.HTTP;
_g.shared.Util=new function(){return{reload:function(win,url,preventHistory){if(!win){win=window
}if(!url){url=_g.HTTP.noCaching(win.location.href)
}url=_g.HTTP.reloadHook(url);
if(preventHistory){win.location.replace(url)
}else{win.location.href=url
}},load:function(url,preventHistory){_g.Util.reload(window,url,preventHistory)
},open:function(url,win,name,options){if(!win){win=window
}if(!url){return 
}url=_g.HTTP.reloadHook(url);
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
},patchText:function(text,snippets){if(snippets){if(!_g.$.isArray(snippets)){text=text.replace("{0}",snippets)
}else{for(var i=0;
i<snippets.length;
i++){text=text.replace(("{"+i+"}"),snippets[i])
}}}return text
},eval:function(response){return _g.HTTP.eval(response)
},getTopWindow:function(){var win=window;
try{while(win.parent&&win!==win.parent&&win.parent.location.href){win=win.parent
}}catch(error){}return win
}}
};
_g.Util=_g.shared.Util;
_g.shared.Sling=function(){return{SELECTOR_INFINITY:".infinity",CHARSET:"_charset_",STATUS:":status",STATUS_BROWSER:"browser",OPERATION:":operation",OPERATION_DELETE:"delete",OPERATION_MOVE:"move",DELETE_SUFFIX:"@Delete",TYPEHINT_SUFFIX:"@TypeHint",COPY_SUFFIX:"@CopyFrom",MOVE_SUFFIX:"@MoveFrom",ORDER:":order",REPLACE:":replace",DESTINATION:":dest",SAVE_PARAM_PREFIX:":saveParamPrefix",IGNORE_PARAM:":ignore",REQUEST_LOGIN_PARAM:"sling:authRequestLogin",LOGIN_URL:"/system/sling/login.html",LOGOUT_URL:"/system/sling/logout.html",processBinaryData:function(A){if(A&&A[":jcr:data"]!=undefined){var B=new Object();
B.size=A[":jcr:data"];
B.type=A["jcr:mimeType"];
B.date=A["jcr:lastModified"];
A=B
}return A
},getContentPath:function(C,A,B){var D=A;
if(D.lastIndexOf(".")>D.lastIndexOf("/")){D=D.substr(0,D.indexOf(".",D.lastIndexOf("/")))
}if(C){if(C.indexOf("/")==0){D=C
}else{if(B){while(C.indexOf("../")==0){C=C.substring(3);
D=D.substring(0,D.lastIndexOf("/"))
}}C=C.replace("./","");
D=D+"/"+C
}}return D
}}
}();
_g.Sling=_g.shared.Sling;
_g.shared.XSS=new function(){return{getXSSPropertyName:function(A){if(!A){return""
}if(_g.XSS.KEY_REGEXP.test(A)){return A
}return A+=_g.XSS.KEY_SUFFIX
},getXSSRecordPropertyValue:function(E,C,A){var D="";
if(E&&C){var B=E.get(this.getXSSPropertyName(C));
if(B){D=B
}else{D=E.get(C)
}if(A&&!isNaN(A)){D=_g.Util.ellipsis(D,A,true)
}}return D
},getXSSTablePropertyValue:function(D,C,A){var E="";
if(D&&C){var B=D[this.getXSSPropertyName(C)];
if(B){E=B
}else{E=D[C]
}if(A&&!isNaN(A)){E=_g.Util.ellipsis(E,A,true)
}}return E
},getXSSValue:function(A){if(A){return _g.Util.htmlEncode(A)
}else{return""
}},updatePropertyName:function(A,B){if(!A||!B||!A[B]){return 
}if(A.xssProtect&&!A.xssKeepPropName){A[B]=this.getXSSPropertyName(A[B])
}},xssPropertyRenderer:function(D,B,C,A){if(A&&A.dataIndex&&C&&C.data&&C.data[this.getXSSPropertyName(A.dataIndex)]){D=C.data[this.getXSSPropertyName(A.dataIndex)];
if(A.ellipsisLimit&&!isNaN(A.ellipsisLimit)){D=_g.Util.ellipsis(D,A.ellipsisLimit,true)
}return D
}else{if(D){return D
}else{return""
}}}}
};
_g.XSS=_g.shared.XSS;
_g.XSS.KEY_SUFFIX="_xss";
_g.XSS.KEY_REGEXP=new RegExp(_g.XSS.KEY_SUFFIX+"$");
_g.shared.I18n=function(){var dicts=new Object();
var initialized=false;
var urlPrefix="/libs/cq/i18n/dict.";
var urlSuffix=".json";
var currentLocale=null;
var languages=null;
return{LOCALE_DEFAULT:"en",init:function(config){if(!config){config=new Object()
}if(config.locale){_g.I18n.setLocale(config.locale)
}if(config.urlPrefix){_g.I18n.setUrlPrefix(config.urlPrefix)
}if(config.urlSuffix){_g.I18n.setUrlSuffix(config.urlSuffix)
}initialized=true
},getLocale:function(){return currentLocale?currentLocale:_g.I18n.LOCALE_DEFAULT
},setLocale:function(locale){currentLocale=locale
},setUrlPrefix:function(prefix){urlPrefix=prefix
},setUrlSuffix:function(suffix){urlSuffix=suffix
},getDictionary:function(locale){if(!locale){locale=_g.I18n.getLocale()
}if(!dicts[locale]){var url=urlPrefix+locale+urlSuffix;
try{var response=_g.HTTP.get(url);
if(_g.HTTP.isOk(response)){dicts[locale]=_g.Util.eval(response)
}}catch(e){}if(!dicts[locale]){dicts[locale]={}
}}return dicts[locale]
},getMessage:function(text,snippets,note){return this.get(text,snippets,note)
},getVarMessage:function(text,note){return this.getVar(text,note)
},get:function(text,snippets,note){var dict,newText,lookupText;
lookupText=note?text+" (("+note+"))":text;
if(initialized){dict=_g.I18n.getDictionary()
}if(dict){newText=dict[lookupText]
}if(!newText){newText=text
}return _g.Util.patchText(newText,snippets)
},getVar:function(text,note){if(!text){return null
}return this.get(text,null,note)
},getLanguages:function(){if(!languages){try{var json=_g.HTTP.eval("/libs/wcm/core/resources/languages.overlay.infinity.json");
_g.$.each(json,function(name,lang){lang.title=_g.I18n.getVar(lang.language);
if(lang.title&&lang.country&&lang.country!="*"){lang.title+=" ("+_g.I18n.getVar(lang.country)+")"
}});
languages=json
}catch(e){languages={}
}}return languages
},parseLocale:function(langCode){if(!langCode){return null
}var pos=langCode.indexOf("_");
if(pos<0){pos=langCode.indexOf("-")
}var language,country;
if(pos<0){language=langCode;
country=null
}else{language=langCode.substring(0,pos);
country=langCode.substring(pos+1)
}return{code:langCode,language:language,country:country}
}}
}();
_g.I18n=_g.shared.I18n;
_g.shared.String=new function(){return{startsWith:function(D,B){if(D==null||B==null){return D==null&&B==null
}if(B.length>D.length){return false
}var A=D.toString();
var C=B.toString();
return(A.indexOf(C)==0)
},endsWith:function(B,A){if(B==null||A==null){return B==null&&A==null
}if(A.length>B.length){return false
}B=B.toString();
A=A.toString();
return(B.lastIndexOf(A)==(B.length-A.length))
},contains:function(B,A){if(B==null||A==null){return false
}B=B.toString();
A=A.toString();
return(B.indexOf(A)>=0)
}}
};
_g.String=_g.shared.String;
_g.HTTP.detectContextPath();
_g.I18n.init();
window.CQ=window.CQ||{};
CQ.shared=_g.shared;
CQ.Sling=CQ.shared.Sling;
CQ.I18n=CQ.shared.I18n;
G_XHR_HOOK=typeof CQ_XHR_HOOK!="undefined"?CQ_XHR_HOOK:undefined;
G_XHR_RELOAD=typeof CQ_RELOAD_HOOK!="undefined"?CQ_RELOAD_HOOK:undefined;
G_CONTENT_PATH=typeof CQ_CONTENT_PATH!="undefined"?CQ_CONTENT_PATH:undefined;
CQ.shared.Form=function(){var E=function(){var I=new Object();
var J=document.getElementsByTagName("label");
for(var H=0;
H<J.length;
H++){var G=J[H].htmlFor;
if(G){I[G]=J[H]
}}return I
};
var F=function(H){var I="";
var G=function(K){if(K.nodeType==3){I+=K.nodeValue
}if(K.nodeName.toLowerCase()=="select"||K.nodeName.toLowerCase()=="input"||K.nodeName.toLowerCase()=="textarea"||K.nodeName.toLowerCase()=="button"){return 
}for(var J=0;
K.childNodes&&J<K.childNodes.length;
J++){G(K.childNodes[J])
}};
G(H);
return I
};
var C=function(G){return G.replace(/-\d+$/,"")
};
var B=function(H,G){if(!G){G=E()
}if(G[H]){return F(G[H])
}return null
};
var A=function(I){var H;
var J=I.nodeName.toLowerCase();
var G=D(I,"type")?I.getAttribute("type"):undefined;
if(J=="input"){if(G=="radio"||G=="checkbox"){if(D(I,"checked")){H=I.getAttribute("value")
}}else{if(I.type=="text"){H=I.defaultValue
}else{H=I.value
}}}else{if(J=="textarea"){H=I.value
}else{if(J=="option"&&D(I,"selected")){H=I.getAttribute("value")
}}}return H
};
var D=function(H,G){if(H==null){return false
}return(H.getAttribute(G)!=null)
};
return{searchArray:function(H,G,J){for(var I=0;
I<H.length;
I++){if(H[I][G]&&H[I][G]==J){return H[I]
}}return null
},getLabelForField:function(G,I){if(!I){I=E()
}var J=G.getAttribute("id");
if(J&&I[J]){return F(I[J])
}var H=G.parentNode;
while(H){if(H.nodeName.toLowerCase()=="label"){return F(H)
}H=H.parentNode
}return G.getAttribute("name")
},getFields:function(){var J=E();
var G=[];
var H=function(N,O){var M=N.getAttribute("name");
var P=N.nodeName.toLowerCase();
var R;
if(P=="input"||P=="textarea"){var L=D(N,"type")?N.getAttribute("type").toLowerCase():"text";
if(L=="button"||L=="submit"||L=="reset"){return 
}R=CQ.shared.Form.searchArray(G,"value",M);
if(!R){G.push({text:CQ.shared.Form.getLabelForField(N,J),value:M,name:M,enumeration:undefined,local:O,type:P,defaultValue:A(N),node:N});
R=G[G.length-1]
}if(L=="radio"||(R.local&&L=="checkbox")){if(!R.enumeration){var S=N.getAttribute("id");
if(S){var U=C(S);
var T=B(U,J);
R.text=(T?T:M)
}else{R.text=M
}R.enumeration=[]
}R.enumeration.push({text:CQ.shared.Form.getLabelForField(N,J),value:N.getAttribute("value"),defaultValue:A(N),node:N})
}}else{if(P=="select"){G.push({text:CQ.shared.Form.getLabelForField(N,J),value:M,name:M,enumeration:[],local:O,type:P,defaultValue:undefined,node:N});
R=G[G.length-1];
var K=N.getElementsByTagName("option");
for(var Q=0;
Q<K.length;
Q++){R.enumeration.push({text:K[Q].innerHTML,value:K[Q].getAttribute("value"),defaultValue:A(K[Q]),node:K[Q]})
}}}};
var I=function(M,L){if(M.nodeName.toLowerCase()=="div"&&$CQ(M).hasClass("section")){L=true
}if(M.getAttribute&&M.getAttribute("name")){H(M,L)
}for(var K=0;
M.childNodes&&K<M.childNodes.length;
K++){var N=M.childNodes[K];
if(N.nodeType==1){I(N,L)
}}};
I(document,false);
return G
}}
}();
CQ.shared.User=function(infoData){return{data:null,language:null,userPropsPath:null,getUserPropsUrl:function(){if(!this.userPropsPath){this.userPropsPath=CQ.shared.User.PROXY_URI
}return this.userPropsPath
},init:function(infoData){if(infoData){this.data=infoData
}else{var url=this.getUserPropsUrl();
var response=CQ.shared.HTTP.get(url);
if(CQ.shared.HTTP.isOk(response)){this.data=CQ.shared.Util.eval(response)
}}return this.data
},getLanguage:function(){this.language=this.data&&this.data.preferences&&this.data.preferences["language"]?this.data.preferences["language"]:"en";
return this.language
}}
}();
CQ.shared.User.PROXY_URI=CQ.shared.HTTP.externalize("/libs/cq/security/userinfo"+CQ.shared.HTTP.EXTENSION_JSON);
CQ.shared.User.init();
CQ.shared.I18n.init({locale:CQ.shared.User.getLanguage(),urlPrefix:"/libs/cq/i18n/dict."});