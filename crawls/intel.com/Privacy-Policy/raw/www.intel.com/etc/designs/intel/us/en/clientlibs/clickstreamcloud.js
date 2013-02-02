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
/*
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(jQuery,$){(function($,undefined){$.ui=$.ui||{};
if($.ui.version){return 
}$.extend($.ui,{version:"1.8.16",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
$.fn.extend({propAttr:$.fn.prop||$.fn.attr,_focus:$.fn.focus,focus:function(delay,fn){return typeof delay==="number"?this.each(function(){var elem=this;
setTimeout(function(){$(elem).focus();
if(fn){fn.call(elem)
}},delay)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var scrollParent;
if(($.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){scrollParent=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test($.curCSS(this,"position",1))&&(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1))
}).eq(0)
}else{scrollParent=this.parents().filter(function(){return(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!scrollParent.length?$(document):scrollParent
},zIndex:function(zIndex){if(zIndex!==undefined){return this.css("zIndex",zIndex)
}if(this.length){var elem=$(this[0]),position,value;
while(elem.length&&elem[0]!==document){position=elem.css("position");
if(position==="absolute"||position==="relative"||position==="fixed"){value=parseInt(elem.css("zIndex"),10);
if(!isNaN(value)&&value!==0){return value
}}elem=elem.parent()
}}return 0
},disableSelection:function(){return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(event){event.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
$.each(["Width","Height"],function(i,name){var side=name==="Width"?["Left","Right"]:["Top","Bottom"],type=name.toLowerCase(),orig={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};
function reduce(elem,size,border,margin){$.each(side,function(){size-=parseFloat($.curCSS(elem,"padding"+this,true))||0;
if(border){size-=parseFloat($.curCSS(elem,"border"+this+"Width",true))||0
}if(margin){size-=parseFloat($.curCSS(elem,"margin"+this,true))||0
}});
return size
}$.fn["inner"+name]=function(size){if(size===undefined){return orig["inner"+name].call(this)
}return this.each(function(){$(this).css(type,reduce(this,size)+"px")
})
};
$.fn["outer"+name]=function(size,margin){if(typeof size!=="number"){return orig["outer"+name].call(this,size)
}return this.each(function(){$(this).css(type,reduce(this,size,true,margin)+"px")
})
}
});
function focusable(element,isTabIndexNotNaN){var nodeName=element.nodeName.toLowerCase();
if("area"===nodeName){var map=element.parentNode,mapName=map.name,img;
if(!element.href||!mapName||map.nodeName.toLowerCase()!=="map"){return false
}img=$("img[usemap=#"+mapName+"]")[0];
return !!img&&visible(img)
}return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"==nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element)
}function visible(element){return !$(element).parents().andSelf().filter(function(){return $.curCSS(this,"visibility")==="hidden"||$.expr.filters.hidden(this)
}).length
}$.extend($.expr[":"],{data:function(elem,i,match){return !!$.data(elem,match[3])
},focusable:function(element){return focusable(element,!isNaN($.attr(element,"tabindex")))
},tabbable:function(element){var tabIndex=$.attr(element,"tabindex"),isTabIndexNaN=isNaN(tabIndex);
return(isTabIndexNaN||tabIndex>=0)&&focusable(element,!isTabIndexNaN)
}});
$(function(){var body=document.body,div=body.appendChild(div=document.createElement("div"));
$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
$.support.minHeight=div.offsetHeight===100;
$.support.selectstart="onselectstart" in div;
body.removeChild(div).style.display="none"
});
$.extend($.ui,{plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;
for(var i in set){proto.plugins[i]=proto.plugins[i]||[];
proto.plugins[i].push([option,set[i]])
}},call:function(instance,name,args){var set=instance.plugins[name];
if(!set||!instance.element[0].parentNode){return 
}for(var i=0;
i<set.length;
i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args)
}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)
},hasScroll:function(el,a){if($(el).css("overflow")==="hidden"){return false
}var scroll=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;
if(el[scroll]>0){return true
}el[scroll]=1;
has=(el[scroll]>0);
el[scroll]=0;
return has
},isOverAxis:function(x,reference,size){return(x>reference)&&(x<(reference+size))
},isOver:function(y,x,top,left,height,width){return $.ui.isOverAxis(y,top,height)&&$.ui.isOverAxis(x,left,width)
}})
})(jQuery);
/*
 * jQuery UI Widget 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function($,undefined){if($.cleanData){var _cleanData=$.cleanData;
$.cleanData=function(elems){for(var i=0,elem;
(elem=elems[i])!=null;
i++){try{$(elem).triggerHandler("remove")
}catch(e){}}_cleanData(elems)
}
}else{var _remove=$.fn.remove;
$.fn.remove=function(selector,keepData){return this.each(function(){if(!keepData){if(!selector||$.filter(selector,[this]).length){$("*",this).add([this]).each(function(){try{$(this).triggerHandler("remove")
}catch(e){}})
}}return _remove.call($(this),selector,keepData)
})
}
}$.widget=function(name,base,prototype){var namespace=name.split(".")[0],fullName;
name=name.split(".")[1];
fullName=namespace+"-"+name;
if(!prototype){prototype=base;
base=$.Widget
}$.expr[":"][fullName]=function(elem){return !!$.data(elem,name)
};
$[namespace]=$[namespace]||{};
$[namespace][name]=function(options,element){if(arguments.length){this._createWidget(options,element)
}};
var basePrototype=new base();
basePrototype.options=$.extend(true,{},basePrototype.options);
$[namespace][name].prototype=$.extend(true,basePrototype,{namespace:namespace,widgetName:name,widgetEventPrefix:$[namespace][name].prototype.widgetEventPrefix||name,widgetBaseClass:fullName},prototype);
$.widget.bridge(name,$[namespace][name])
};
$.widget.bridge=function(name,object){$.fn[name]=function(options){var isMethodCall=typeof options==="string",args=Array.prototype.slice.call(arguments,1),returnValue=this;
options=!isMethodCall&&args.length?$.extend.apply(null,[true,options].concat(args)):options;
if(isMethodCall&&options.charAt(0)==="_"){return returnValue
}if(isMethodCall){this.each(function(){var instance=$.data(this,name),methodValue=instance&&$.isFunction(instance[options])?instance[options].apply(instance,args):instance;
if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue;
return false
}})
}else{this.each(function(){var instance=$.data(this,name);
if(instance){instance.option(options||{})._init()
}else{$.data(this,name,new object(options,this))
}})
}return returnValue
}
};
$.Widget=function(options,element){if(arguments.length){this._createWidget(options,element)
}};
$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(options,element){$.data(element,this.widgetName,this);
this.element=$(element);
this.options=$.extend(true,{},this.options,this._getCreateOptions(),options);
var self=this;
this.element.bind("remove."+this.widgetName,function(){self.destroy()
});
this._create();
this._trigger("create");
this._init()
},_getCreateOptions:function(){return $.metadata&&$.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(key,value){var options=key;
if(arguments.length===0){return $.extend({},this.options)
}if(typeof key==="string"){if(value===undefined){return this.options[key]
}options={};
options[key]=value
}this._setOptions(options);
return this
},_setOptions:function(options){var self=this;
$.each(options,function(key,value){self._setOption(key,value)
});
return this
},_setOption:function(key,value){this.options[key]=value;
if(key==="disabled"){this.widget()[value?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",value)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(type,event,data){var callback=this.options[type];
event=$.Event(event);
event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();
data=data||{};
if(event.originalEvent){for(var i=$.event.props.length,prop;
i;
){prop=$.event.props[--i];
event[prop]=event.originalEvent[prop]
}}this.element.trigger(event,data);
return !($.isFunction(callback)&&callback.call(this.element[0],event,data)===false||event.isDefaultPrevented())
}}
})(jQuery);
/*
 * jQuery UI Mouse 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function($,undefined){var mouseHandled=false;
$(document).mouseup(function(e){mouseHandled=false
});
$.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var self=this;
this.element.bind("mousedown."+this.widgetName,function(event){return self._mouseDown(event)
}).bind("click."+this.widgetName,function(event){if(true===$.data(event.target,self.widgetName+".preventClickEvent")){$.removeData(event.target,self.widgetName+".preventClickEvent");
event.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(event){if(mouseHandled){return 
}(this._mouseStarted&&this._mouseUp(event));
this._mouseDownEvent=event;
var self=this,btnIsLeft=(event.which==1),elIsCancel=(typeof this.options.cancel=="string"&&event.target.nodeName?$(event.target).closest(this.options.cancel).length:false);
if(!btnIsLeft||elIsCancel||!this._mouseCapture(event)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){self.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(event)!==false);
if(!this._mouseStarted){event.preventDefault();
return true
}}if(true===$.data(event.target,this.widgetName+".preventClickEvent")){$.removeData(event.target,this.widgetName+".preventClickEvent")
}this._mouseMoveDelegate=function(event){return self._mouseMove(event)
};
this._mouseUpDelegate=function(event){return self._mouseUp(event)
};
$(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
event.preventDefault();
mouseHandled=true;
return true
},_mouseMove:function(event){if($.browser.msie&&!(document.documentMode>=9)&&!event.button){return this._mouseUp(event)
}if(this._mouseStarted){this._mouseDrag(event);
return event.preventDefault()
}if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,event)!==false);
(this._mouseStarted?this._mouseDrag(event):this._mouseUp(event))
}return !this._mouseStarted
},_mouseUp:function(event){$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
if(event.target==this._mouseDownEvent.target){$.data(event.target,this.widgetName+".preventClickEvent",true)
}this._mouseStop(event)
}return false
},_mouseDistanceMet:function(event){return(Math.max(Math.abs(this._mouseDownEvent.pageX-event.pageX),Math.abs(this._mouseDownEvent.pageY-event.pageY))>=this.options.distance)
},_mouseDelayMet:function(event){return this.mouseDelayMet
},_mouseStart:function(event){},_mouseDrag:function(event){},_mouseStop:function(event){},_mouseCapture:function(event){return true
}})
})(jQuery);
(function($,undefined){$.ui=$.ui||{};
var horizontalPositions=/left|center|right/,verticalPositions=/top|center|bottom/,center="center",_position=$.fn.position,_offset=$.fn.offset;
$.fn.position=function(options){if(!options||!options.of){return _position.apply(this,arguments)
}options=$.extend({},options);
var target=$(options.of),targetElem=target[0],collision=(options.collision||"flip").split(" "),offset=options.offset?options.offset.split(" "):[0,0],targetWidth,targetHeight,basePosition;
if(targetElem.nodeType===9){targetWidth=target.width();
targetHeight=target.height();
basePosition={top:0,left:0}
}else{if(targetElem.setTimeout){targetWidth=target.width();
targetHeight=target.height();
basePosition={top:target.scrollTop(),left:target.scrollLeft()}
}else{if(targetElem.preventDefault){options.at="left top";
targetWidth=targetHeight=0;
basePosition={top:options.of.pageY,left:options.of.pageX}
}else{targetWidth=target.outerWidth();
targetHeight=target.outerHeight();
basePosition=target.offset()
}}}$.each(["my","at"],function(){var pos=(options[this]||"").split(" ");
if(pos.length===1){pos=horizontalPositions.test(pos[0])?pos.concat([center]):verticalPositions.test(pos[0])?[center].concat(pos):[center,center]
}pos[0]=horizontalPositions.test(pos[0])?pos[0]:center;
pos[1]=verticalPositions.test(pos[1])?pos[1]:center;
options[this]=pos
});
if(collision.length===1){collision[1]=collision[0]
}offset[0]=parseInt(offset[0],10)||0;
if(offset.length===1){offset[1]=offset[0]
}offset[1]=parseInt(offset[1],10)||0;
if(options.at[0]==="right"){basePosition.left+=targetWidth
}else{if(options.at[0]===center){basePosition.left+=targetWidth/2
}}if(options.at[1]==="bottom"){basePosition.top+=targetHeight
}else{if(options.at[1]===center){basePosition.top+=targetHeight/2
}}basePosition.left+=offset[0];
basePosition.top+=offset[1];
return this.each(function(){var elem=$(this),elemWidth=elem.outerWidth(),elemHeight=elem.outerHeight(),marginLeft=parseInt($.curCSS(this,"marginLeft",true))||0,marginTop=parseInt($.curCSS(this,"marginTop",true))||0,collisionWidth=elemWidth+marginLeft+(parseInt($.curCSS(this,"marginRight",true))||0),collisionHeight=elemHeight+marginTop+(parseInt($.curCSS(this,"marginBottom",true))||0),position=$.extend({},basePosition),collisionPosition;
if(options.my[0]==="right"){position.left-=elemWidth
}else{if(options.my[0]===center){position.left-=elemWidth/2
}}if(options.my[1]==="bottom"){position.top-=elemHeight
}else{if(options.my[1]===center){position.top-=elemHeight/2
}}position.left=Math.round(position.left);
position.top=Math.round(position.top);
collisionPosition={left:position.left-marginLeft,top:position.top-marginTop};
$.each(["left","top"],function(i,dir){if($.ui.position[collision[i]]){$.ui.position[collision[i]][dir](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:offset,my:options.my,at:options.at})
}});
if($.fn.bgiframe){elem.bgiframe()
}elem.offset($.extend(position,{using:options.using}))
})
};
$.ui.position={fit:{left:function(position,data){var win=$(window),over=data.collisionPosition.left+data.collisionWidth-win.width()-win.scrollLeft();
position.left=over>0?position.left-over:Math.max(position.left-data.collisionPosition.left,position.left)
},top:function(position,data){var win=$(window),over=data.collisionPosition.top+data.collisionHeight-win.height()-win.scrollTop();
position.top=over>0?position.top-over:Math.max(position.top-data.collisionPosition.top,position.top)
}},flip:{left:function(position,data){if(data.at[0]===center){return 
}var win=$(window),over=data.collisionPosition.left+data.collisionWidth-win.width()-win.scrollLeft(),myOffset=data.my[0]==="left"?-data.elemWidth:data.my[0]==="right"?data.elemWidth:0,atOffset=data.at[0]==="left"?data.targetWidth:-data.targetWidth,offset=-2*data.offset[0];
position.left+=data.collisionPosition.left<0?myOffset+atOffset+offset:over>0?myOffset+atOffset+offset:0
},top:function(position,data){if(data.at[1]===center){return 
}var win=$(window),over=data.collisionPosition.top+data.collisionHeight-win.height()-win.scrollTop(),myOffset=data.my[1]==="top"?-data.elemHeight:data.my[1]==="bottom"?data.elemHeight:0,atOffset=data.at[1]==="top"?data.targetHeight:-data.targetHeight,offset=-2*data.offset[1];
position.top+=data.collisionPosition.top<0?myOffset+atOffset+offset:over>0?myOffset+atOffset+offset:0
}}};
if(!$.offset.setOffset){$.offset.setOffset=function(elem,options){if(/static/.test($.curCSS(elem,"position"))){elem.style.position="relative"
}var curElem=$(elem),curOffset=curElem.offset(),curTop=parseInt($.curCSS(elem,"top",true),10)||0,curLeft=parseInt($.curCSS(elem,"left",true),10)||0,props={top:(options.top-curOffset.top)+curTop,left:(options.left-curOffset.left)+curLeft};
if("using" in options){options.using.call(elem,props)
}else{curElem.css(props)
}};
$.fn.offset=function(options){var elem=this[0];
if(!elem||!elem.ownerDocument){return null
}if(options){return this.each(function(){$.offset.setOffset(this,options)
})
}return _offset.call(this)
}
}}(jQuery));
(function($,undefined){$.widget("ui.draggable",$.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return 
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
},_mouseCapture:function(event){var o=this.options;
if(this.helper||o.disabled||$(event.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(event);
if(!this.handle){return false
}if(o.iframeFix){$(o.iframeFix===true?"iframe":o.iframeFix).each(function(){$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css($(this).offset()).appendTo("body")
})
}return true
},_mouseStart:function(event){var o=this.options;
this.helper=this._createHelper(event);
this._cacheHelperProportions();
if($.ui.ddmanager){$.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
$.extend(this.offset,{click:{left:event.pageX-this.offset.left,top:event.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(event);
this.originalPageX=event.pageX;
this.originalPageY=event.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
if(o.containment){this._setContainment()
}if(this._trigger("start",event)===false){this._clear();
return false
}this._cacheHelperProportions();
if($.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,event)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(event,true);
if($.ui.ddmanager){$.ui.ddmanager.dragStart(this,event)
}return true
},_mouseDrag:function(event,noPropagation){this.position=this._generatePosition(event);
this.positionAbs=this._convertPositionTo("absolute");
if(!noPropagation){var ui=this._uiHash();
if(this._trigger("drag",event,ui)===false){this._mouseUp({});
return false
}this.position=ui.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if($.ui.ddmanager){$.ui.ddmanager.drag(this,event)
}return false
},_mouseStop:function(event){var dropped=false;
if($.ui.ddmanager&&!this.options.dropBehaviour){dropped=$.ui.ddmanager.drop(this,event)
}if(this.dropped){dropped=this.dropped;
this.dropped=false
}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original"){return false
}if((this.options.revert=="invalid"&&!dropped)||(this.options.revert=="valid"&&dropped)||this.options.revert===true||($.isFunction(this.options.revert)&&this.options.revert.call(this.element,dropped))){var self=this;
$(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(self._trigger("stop",event)!==false){self._clear()
}})
}else{if(this._trigger("stop",event)!==false){this._clear()
}}return false
},_mouseUp:function(event){if(this.options.iframeFix===true){$("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}if($.ui.ddmanager){$.ui.ddmanager.dragStop(this,event)
}return $.ui.mouse.prototype._mouseUp.call(this,event)
},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({})
}else{this._clear()
}return this
},_getHandle:function(event){var handle=!this.options.handle||!$(this.options.handle,this.element).length?true:false;
$(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==event.target){handle=true
}});
return handle
},_createHelper:function(event){var o=this.options;
var helper=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[event])):(o.helper=="clone"?this.element.clone().removeAttr("id"):this.element);
if(!helper.parents("body").length){helper.appendTo((o.appendTo=="parent"?this.element[0].parentNode:o.appendTo))
}if(helper[0]!=this.element[0]&&!(/(fixed|absolute)/).test(helper.css("position"))){helper.css("position","absolute")
}return helper
},_adjustOffsetFromHelper:function(obj){if(typeof obj=="string"){obj=obj.split(" ")
}if($.isArray(obj)){obj={left:+obj[0],top:+obj[1]||0}
}if("left" in obj){this.offset.click.left=obj.left+this.margins.left
}if("right" in obj){this.offset.click.left=this.helperProportions.width-obj.right+this.margins.left
}if("top" in obj){this.offset.click.top=obj.top+this.margins.top
}if("bottom" in obj){this.offset.click.top=this.helperProportions.height-obj.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var po=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0])){po.left+=this.scrollParent.scrollLeft();
po.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&$.browser.msie)){po={top:0,left:0}
}return{top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var p=this.element.position();
return{top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0),right:(parseInt(this.element.css("marginRight"),10)||0),bottom:(parseInt(this.element.css("marginBottom"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var o=this.options;
if(o.containment=="parent"){o.containment=this.helper[0].parentNode
}if(o.containment=="document"||o.containment=="window"){this.containment=[o.containment=="document"?0:$(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,o.containment=="document"?0:$(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(o.containment=="document"?0:$(window).scrollLeft())+$(o.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(o.containment=="document"?0:$(window).scrollTop())+($(o.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(o.containment)&&o.containment.constructor!=Array){var c=$(o.containment);
var ce=c[0];
if(!ce){return 
}var co=c.offset();
var over=($(ce).css("overflow")!="hidden");
this.containment=[(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0),(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0),(over?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(over?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];
this.relative_container=c
}else{if(o.containment.constructor==Array){this.containment=o.containment
}}},_convertPositionTo:function(d,pos){if(!pos){pos=this.position
}var mod=d=="absolute"?1:-1;
var o=this.options,scroll=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,scrollIsRootNode=(/(html|body)/i).test(scroll[0].tagName);
return{top:(pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-($.browser.safari&&$.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(scrollIsRootNode?0:scroll.scrollTop()))*mod)),left:(pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-($.browser.safari&&$.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())*mod))}
},_generatePosition:function(event){var o=this.options,scroll=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,scrollIsRootNode=(/(html|body)/i).test(scroll[0].tagName);
var pageX=event.pageX;
var pageY=event.pageY;
if(this.originalPosition){var containment;
if(this.containment){if(this.relative_container){var co=this.relative_container.offset();
containment=[this.containment[0]+co.left,this.containment[1]+co.top,this.containment[2]+co.left,this.containment[3]+co.top]
}else{containment=this.containment
}if(event.pageX-this.offset.click.left<containment[0]){pageX=containment[0]+this.offset.click.left
}if(event.pageY-this.offset.click.top<containment[1]){pageY=containment[1]+this.offset.click.top
}if(event.pageX-this.offset.click.left>containment[2]){pageX=containment[2]+this.offset.click.left
}if(event.pageY-this.offset.click.top>containment[3]){pageY=containment[3]+this.offset.click.top
}}if(o.grid){var top=o.grid[1]?this.originalPageY+Math.round((pageY-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY;
pageY=containment?(!(top-this.offset.click.top<containment[1]||top-this.offset.click.top>containment[3])?top:(!(top-this.offset.click.top<containment[1])?top-o.grid[1]:top+o.grid[1])):top;
var left=o.grid[0]?this.originalPageX+Math.round((pageX-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX;
pageX=containment?(!(left-this.offset.click.left<containment[0]||left-this.offset.click.left>containment[2])?left:(!(left-this.offset.click.left<containment[0])?left-o.grid[0]:left+o.grid[0])):left
}}return{top:(pageY-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+($.browser.safari&&$.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(scrollIsRootNode?0:scroll.scrollTop())))),left:(pageX-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+($.browser.safari&&$.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(type,event,ui){ui=ui||this._uiHash();
$.ui.plugin.call(this,type,[event,ui]);
if(type=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return $.Widget.prototype._trigger.call(this,type,event,ui)
},plugins:{},_uiHash:function(event){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
$.extend($.ui.draggable,{version:"1.8.16"});
$.ui.plugin.add("draggable","connectToSortable",{start:function(event,ui){var inst=$(this).data("draggable"),o=inst.options,uiSortable=$.extend({},ui,{item:inst.element});
inst.sortables=[];
$(o.connectToSortable).each(function(){var sortable=$.data(this,"sortable");
if(sortable&&!sortable.options.disabled){inst.sortables.push({instance:sortable,shouldRevert:sortable.options.revert});
sortable.refreshPositions();
sortable._trigger("activate",event,uiSortable)
}})
},stop:function(event,ui){var inst=$(this).data("draggable"),uiSortable=$.extend({},ui,{item:inst.element});
$.each(inst.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
inst.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(event);
this.instance.options.helper=this.instance.options._helper;
if(inst.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",event,uiSortable)
}})
},drag:function(event,ui){var inst=$(this).data("draggable"),self=this;
var checkPos=function(o){var dyClick=this.offset.click.top,dxClick=this.offset.click.left;
var helperTop=this.positionAbs.top,helperLeft=this.positionAbs.left;
var itemHeight=o.height,itemWidth=o.width;
var itemTop=o.top,itemLeft=o.left;
return $.ui.isOver(helperTop+dyClick,helperLeft+dxClick,itemTop,itemLeft,itemHeight,itemWidth)
};
$.each(inst.sortables,function(i){this.instance.positionAbs=inst.positionAbs;
this.instance.helperProportions=inst.helperProportions;
this.instance.offset.click=inst.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=$(self).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return ui.helper[0]
};
event.target=this.instance.currentItem[0];
this.instance._mouseCapture(event,true);
this.instance._mouseStart(event,true,true);
this.instance.offset.click.top=inst.offset.click.top;
this.instance.offset.click.left=inst.offset.click.left;
this.instance.offset.parent.left-=inst.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=inst.offset.parent.top-this.instance.offset.parent.top;
inst._trigger("toSortable",event);
inst.dropped=this.instance.element;
inst.currentItem=inst.element;
this.instance.fromOutside=inst
}if(this.instance.currentItem){this.instance._mouseDrag(event)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",event,this.instance._uiHash(this.instance));
this.instance._mouseStop(event,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}inst._trigger("fromSortable",event);
inst.dropped=false
}}})
}});
$.ui.plugin.add("draggable","cursor",{start:function(event,ui){var t=$("body"),o=$(this).data("draggable").options;
if(t.css("cursor")){o._cursor=t.css("cursor")
}t.css("cursor",o.cursor)
},stop:function(event,ui){var o=$(this).data("draggable").options;
if(o._cursor){$("body").css("cursor",o._cursor)
}}});
$.ui.plugin.add("draggable","opacity",{start:function(event,ui){var t=$(ui.helper),o=$(this).data("draggable").options;
if(t.css("opacity")){o._opacity=t.css("opacity")
}t.css("opacity",o.opacity)
},stop:function(event,ui){var o=$(this).data("draggable").options;
if(o._opacity){$(ui.helper).css("opacity",o._opacity)
}}});
$.ui.plugin.add("draggable","scroll",{start:function(event,ui){var i=$(this).data("draggable");
if(i.scrollParent[0]!=document&&i.scrollParent[0].tagName!="HTML"){i.overflowOffset=i.scrollParent.offset()
}},drag:function(event,ui){var i=$(this).data("draggable"),o=i.options,scrolled=false;
if(i.scrollParent[0]!=document&&i.scrollParent[0].tagName!="HTML"){if(!o.axis||o.axis!="x"){if((i.overflowOffset.top+i.scrollParent[0].offsetHeight)-event.pageY<o.scrollSensitivity){i.scrollParent[0].scrollTop=scrolled=i.scrollParent[0].scrollTop+o.scrollSpeed
}else{if(event.pageY-i.overflowOffset.top<o.scrollSensitivity){i.scrollParent[0].scrollTop=scrolled=i.scrollParent[0].scrollTop-o.scrollSpeed
}}}if(!o.axis||o.axis!="y"){if((i.overflowOffset.left+i.scrollParent[0].offsetWidth)-event.pageX<o.scrollSensitivity){i.scrollParent[0].scrollLeft=scrolled=i.scrollParent[0].scrollLeft+o.scrollSpeed
}else{if(event.pageX-i.overflowOffset.left<o.scrollSensitivity){i.scrollParent[0].scrollLeft=scrolled=i.scrollParent[0].scrollLeft-o.scrollSpeed
}}}}else{if(!o.axis||o.axis!="x"){if(event.pageY-$(document).scrollTop()<o.scrollSensitivity){scrolled=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed)
}else{if($(window).height()-(event.pageY-$(document).scrollTop())<o.scrollSensitivity){scrolled=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed)
}}}if(!o.axis||o.axis!="y"){if(event.pageX-$(document).scrollLeft()<o.scrollSensitivity){scrolled=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed)
}else{if($(window).width()-(event.pageX-$(document).scrollLeft())<o.scrollSensitivity){scrolled=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed)
}}}}if(scrolled!==false&&$.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(i,event)
}}});
$.ui.plugin.add("draggable","snap",{start:function(event,ui){var i=$(this).data("draggable"),o=i.options;
i.snapElements=[];
$(o.snap.constructor!=String?(o.snap.items||":data(draggable)"):o.snap).each(function(){var $t=$(this);
var $o=$t.offset();
if(this!=i.element[0]){i.snapElements.push({item:this,width:$t.outerWidth(),height:$t.outerHeight(),top:$o.top,left:$o.left})
}})
},drag:function(event,ui){var inst=$(this).data("draggable"),o=inst.options;
var d=o.snapTolerance;
var x1=ui.offset.left,x2=x1+inst.helperProportions.width,y1=ui.offset.top,y2=y1+inst.helperProportions.height;
for(var i=inst.snapElements.length-1;
i>=0;
i--){var l=inst.snapElements[i].left,r=l+inst.snapElements[i].width,t=inst.snapElements[i].top,b=t+inst.snapElements[i].height;
if(!((l-d<x1&&x1<r+d&&t-d<y1&&y1<b+d)||(l-d<x1&&x1<r+d&&t-d<y2&&y2<b+d)||(l-d<x2&&x2<r+d&&t-d<y1&&y1<b+d)||(l-d<x2&&x2<r+d&&t-d<y2&&y2<b+d))){if(inst.snapElements[i].snapping){(inst.options.snap.release&&inst.options.snap.release.call(inst.element,event,$.extend(inst._uiHash(),{snapItem:inst.snapElements[i].item})))
}inst.snapElements[i].snapping=false;
continue
}if(o.snapMode!="inner"){var ts=Math.abs(t-y2)<=d;
var bs=Math.abs(b-y1)<=d;
var ls=Math.abs(l-x2)<=d;
var rs=Math.abs(r-x1)<=d;
if(ts){ui.position.top=inst._convertPositionTo("relative",{top:t-inst.helperProportions.height,left:0}).top-inst.margins.top
}if(bs){ui.position.top=inst._convertPositionTo("relative",{top:b,left:0}).top-inst.margins.top
}if(ls){ui.position.left=inst._convertPositionTo("relative",{top:0,left:l-inst.helperProportions.width}).left-inst.margins.left
}if(rs){ui.position.left=inst._convertPositionTo("relative",{top:0,left:r}).left-inst.margins.left
}}var first=(ts||bs||ls||rs);
if(o.snapMode!="outer"){var ts=Math.abs(t-y1)<=d;
var bs=Math.abs(b-y2)<=d;
var ls=Math.abs(l-x1)<=d;
var rs=Math.abs(r-x2)<=d;
if(ts){ui.position.top=inst._convertPositionTo("relative",{top:t,left:0}).top-inst.margins.top
}if(bs){ui.position.top=inst._convertPositionTo("relative",{top:b-inst.helperProportions.height,left:0}).top-inst.margins.top
}if(ls){ui.position.left=inst._convertPositionTo("relative",{top:0,left:l}).left-inst.margins.left
}if(rs){ui.position.left=inst._convertPositionTo("relative",{top:0,left:r-inst.helperProportions.width}).left-inst.margins.left
}}if(!inst.snapElements[i].snapping&&(ts||bs||ls||rs||first)){(inst.options.snap.snap&&inst.options.snap.snap.call(inst.element,event,$.extend(inst._uiHash(),{snapItem:inst.snapElements[i].item})))
}inst.snapElements[i].snapping=(ts||bs||ls||rs||first)
}}});
$.ui.plugin.add("draggable","stack",{start:function(event,ui){var o=$(this).data("draggable").options;
var group=$.makeArray($(o.stack)).sort(function(a,b){return(parseInt($(a).css("zIndex"),10)||0)-(parseInt($(b).css("zIndex"),10)||0)
});
if(!group.length){return 
}var min=parseInt(group[0].style.zIndex)||0;
$(group).each(function(i){this.style.zIndex=min+i
});
this[0].style.zIndex=min+group.length
}});
$.ui.plugin.add("draggable","zIndex",{start:function(event,ui){var t=$(ui.helper),o=$(this).data("draggable").options;
if(t.css("zIndex")){o._zIndex=t.css("zIndex")
}t.css("zIndex",o.zIndex)
},stop:function(event,ui){var o=$(this).data("draggable").options;
if(o._zIndex){$(ui.helper).css("zIndex",o._zIndex)
}}})
})(jQuery);
(function($,undefined){$.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var o=this.options,accept=o.accept;
this.isover=0;
this.isout=1;
this.accept=$.isFunction(accept)?accept:function(d){return d.is(accept)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
$.ui.ddmanager.droppables[o.scope]=$.ui.ddmanager.droppables[o.scope]||[];
$.ui.ddmanager.droppables[o.scope].push(this);
(o.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var drop=$.ui.ddmanager.droppables[this.options.scope];
for(var i=0;
i<drop.length;
i++){if(drop[i]==this){drop.splice(i,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
return this
},_setOption:function(key,value){if(key=="accept"){this.accept=$.isFunction(value)?value:function(d){return d.is(value)
}
}$.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(event){var draggable=$.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}(draggable&&this._trigger("activate",event,this.ui(draggable)))
},_deactivate:function(event){var draggable=$.ui.ddmanager.current;
if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(draggable&&this._trigger("deactivate",event,this.ui(draggable)))
},_over:function(event){var draggable=$.ui.ddmanager.current;
if(!draggable||(draggable.currentItem||draggable.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(draggable.currentItem||draggable.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",event,this.ui(draggable))
}},_out:function(event){var draggable=$.ui.ddmanager.current;
if(!draggable||(draggable.currentItem||draggable.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(draggable.currentItem||draggable.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",event,this.ui(draggable))
}},_drop:function(event,custom){var draggable=custom||$.ui.ddmanager.current;
if(!draggable||(draggable.currentItem||draggable.element)[0]==this.element[0]){return false
}var childrenIntersection=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var inst=$.data(this,"droppable");
if(inst.options.greedy&&!inst.options.disabled&&inst.options.scope==draggable.options.scope&&inst.accept.call(inst.element[0],(draggable.currentItem||draggable.element))&&$.ui.intersect(draggable,$.extend(inst,{offset:inst.element.offset()}),inst.options.tolerance)){childrenIntersection=true;
return false
}});
if(childrenIntersection){return false
}if(this.accept.call(this.element[0],(draggable.currentItem||draggable.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("drop",event,this.ui(draggable));
return this.element
}return false
},ui:function(c){return{draggable:(c.currentItem||c.element),helper:c.helper,position:c.position,offset:c.positionAbs}
}});
$.extend($.ui.droppable,{version:"1.8.16"});
$.ui.intersect=function(draggable,droppable,toleranceMode){if(!droppable.offset){return false
}var x1=(draggable.positionAbs||draggable.position.absolute).left,x2=x1+draggable.helperProportions.width,y1=(draggable.positionAbs||draggable.position.absolute).top,y2=y1+draggable.helperProportions.height;
var l=droppable.offset.left,r=l+droppable.proportions.width,t=droppable.offset.top,b=t+droppable.proportions.height;
switch(toleranceMode){case"fit":return(l<=x1&&x2<=r&&t<=y1&&y2<=b);
break;
case"intersect":return(l<x1+(draggable.helperProportions.width/2)&&x2-(draggable.helperProportions.width/2)<r&&t<y1+(draggable.helperProportions.height/2)&&y2-(draggable.helperProportions.height/2)<b);
break;
case"pointer":var draggableLeft=((draggable.positionAbs||draggable.position.absolute).left+(draggable.clickOffset||draggable.offset.click).left),draggableTop=((draggable.positionAbs||draggable.position.absolute).top+(draggable.clickOffset||draggable.offset.click).top),isOver=$.ui.isOver(draggableTop,draggableLeft,t,l,droppable.proportions.height,droppable.proportions.width);
return isOver;
break;
case"touch":return((y1>=t&&y1<=b)||(y2>=t&&y2<=b)||(y1<t&&y2>b))&&((x1>=l&&x1<=r)||(x2>=l&&x2<=r)||(x1<l&&x2>r));
break;
default:return false;
break
}};
$.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,event){var m=$.ui.ddmanager.droppables[t.options.scope]||[];
var type=event?event.type:null;
var list=(t.currentItem||t.element).find(":data(droppable)").andSelf();
droppablesLoop:for(var i=0;
i<m.length;
i++){if(m[i].options.disabled||(t&&!m[i].accept.call(m[i].element[0],(t.currentItem||t.element)))){continue
}for(var j=0;
j<list.length;
j++){if(list[j]==m[i].element[0]){m[i].proportions.height=0;
continue droppablesLoop
}}m[i].visible=m[i].element.css("display")!="none";
if(!m[i].visible){continue
}if(type=="mousedown"){m[i]._activate.call(m[i],event)
}m[i].offset=m[i].element.offset();
m[i].proportions={width:m[i].element[0].offsetWidth,height:m[i].element[0].offsetHeight}
}},drop:function(draggable,event){var dropped=false;
$.each($.ui.ddmanager.droppables[draggable.options.scope]||[],function(){if(!this.options){return 
}if(!this.options.disabled&&this.visible&&$.ui.intersect(draggable,this,this.options.tolerance)){dropped=dropped||this._drop.call(this,event)
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(draggable.currentItem||draggable.element))){this.isout=1;
this.isover=0;
this._deactivate.call(this,event)
}});
return dropped
},dragStart:function(draggable,event){draggable.element.parents(":not(body,html)").bind("scroll.droppable",function(){if(!draggable.options.refreshPositions){$.ui.ddmanager.prepareOffsets(draggable,event)
}})
},drag:function(draggable,event){if(draggable.options.refreshPositions){$.ui.ddmanager.prepareOffsets(draggable,event)
}$.each($.ui.ddmanager.droppables[draggable.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return 
}var intersects=$.ui.intersect(draggable,this,this.options.tolerance);
var c=!intersects&&this.isover==1?"isout":(intersects&&this.isover==0?"isover":null);
if(!c){return 
}var parentInstance;
if(this.options.greedy){var parent=this.element.parents(":data(droppable):eq(0)");
if(parent.length){parentInstance=$.data(parent[0],"droppable");
parentInstance.greedyChild=(c=="isover"?1:0)
}}if(parentInstance&&c=="isover"){parentInstance.isover=0;
parentInstance.isout=1;
parentInstance._out.call(parentInstance,event)
}this[c]=1;
this[c=="isout"?"isover":"isout"]=0;
this[c=="isover"?"_over":"_out"].call(this,event);
if(parentInstance&&c=="isout"){parentInstance.isout=0;
parentInstance.isover=1;
parentInstance._over.call(parentInstance,event)
}})
},dragStop:function(draggable,event){draggable.element.parents(":not(body,html)").unbind("scroll.droppable");
if(!draggable.options.refreshPositions){$.ui.ddmanager.prepareOffsets(draggable,event)
}}}
})(jQuery);
(function($,undefined){$.widget("ui.resizable",$.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var self=this,o=this.options;
this.element.addClass("ui-resizable");
$.extend(this,{_aspectRatio:!!(o.aspectRatio),aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper||o.ghost||o.animate?o.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&$.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})
}this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=o.handles||(!$(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var n=this.handles.split(",");
this.handles={};
for(var i=0;
i<n.length;
i++){var handle=$.trim(n[i]),hname="ui-resizable-"+handle;
var axis=$('<div class="ui-resizable-handle '+hname+'"></div>');
if(/sw|se|ne|nw/.test(handle)){axis.css({zIndex:++o.zIndex})
}if("se"==handle){axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
}this.handles[handle]=".ui-resizable-"+handle;
this.element.append(axis)
}}this._renderAxis=function(target){target=target||this.element;
for(var i in this.handles){if(this.handles[i].constructor==String){this.handles[i]=$(this.handles[i],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var axis=$(this.handles[i],this.element),padWrapper=0;
padWrapper=/sw|ne|nw|se|n|s/.test(i)?axis.outerHeight():axis.outerWidth();
var padPos=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");
target.css(padPos,padWrapper);
this._proportionallyResize()
}if(!$(this.handles[i]).length){continue
}}};
this._renderAxis(this.element);
this._handles=$(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!self.resizing){if(this.className){var axis=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}self.axis=axis&&axis[1]?axis[1]:"se"
}});
if(o.autoHide){this._handles.hide();
$(this.element).addClass("ui-resizable-autohide").hover(function(){if(o.disabled){return 
}$(this).removeClass("ui-resizable-autohide");
self._handles.show()
},function(){if(o.disabled){return 
}if(!self.resizing){$(this).addClass("ui-resizable-autohide");
self._handles.hide()
}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var _destroy=function(exp){$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){_destroy(this.element);
var wrapper=this.element;
wrapper.after(this.originalElement.css({position:wrapper.css("position"),width:wrapper.outerWidth(),height:wrapper.outerHeight(),top:wrapper.css("top"),left:wrapper.css("left")})).remove()
}this.originalElement.css("resize",this.originalResizeStyle);
_destroy(this.originalElement);
return this
},_mouseCapture:function(event){var handle=false;
for(var i in this.handles){if($(this.handles[i])[0]==event.target){handle=true
}}return !this.options.disabled&&handle
},_mouseStart:function(event){var o=this.options,iniPos=this.element.position(),el=this.element;
this.resizing=true;
this.documentScroll={top:$(document).scrollTop(),left:$(document).scrollLeft()};
if(el.is(".ui-draggable")||(/absolute/).test(el.css("position"))){el.css({position:"absolute",top:iniPos.top,left:iniPos.left})
}if($.browser.opera&&(/relative/).test(el.css("position"))){el.css({position:"relative",top:"auto",left:"auto"})
}this._renderProxy();
var curleft=num(this.helper.css("left")),curtop=num(this.helper.css("top"));
if(o.containment){curleft+=$(o.containment).scrollLeft()||0;
curtop+=$(o.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:curleft,top:curtop};
this.size=this._helper?{width:el.outerWidth(),height:el.outerHeight()}:{width:el.width(),height:el.height()};
this.originalSize=this._helper?{width:el.outerWidth(),height:el.outerHeight()}:{width:el.width(),height:el.height()};
this.originalPosition={left:curleft,top:curtop};
this.sizeDiff={width:el.outerWidth()-el.width(),height:el.outerHeight()-el.height()};
this.originalMousePosition={left:event.pageX,top:event.pageY};
this.aspectRatio=(typeof o.aspectRatio=="number")?o.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
var cursor=$(".ui-resizable-"+this.axis).css("cursor");
$("body").css("cursor",cursor=="auto"?this.axis+"-resize":cursor);
el.addClass("ui-resizable-resizing");
this._propagate("start",event);
return true
},_mouseDrag:function(event){var el=this.helper,o=this.options,props={},self=this,smp=this.originalMousePosition,a=this.axis;
var dx=(event.pageX-smp.left)||0,dy=(event.pageY-smp.top)||0;
var trigger=this._change[a];
if(!trigger){return false
}var data=trigger.apply(this,[event,dx,dy]),ie6=$.browser.msie&&$.browser.version<7,csdif=this.sizeDiff;
this._updateVirtualBoundaries(event.shiftKey);
if(this._aspectRatio||event.shiftKey){data=this._updateRatio(data,event)
}data=this._respectSize(data,event);
this._propagate("resize",event);
el.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()
}this._updateCache(data);
this._trigger("resize",event,this.ui());
return false
},_mouseStop:function(event){this.resizing=false;
var o=this.options,self=this;
if(this._helper){var pr=this._proportionallyResizeElements,ista=pr.length&&(/textarea/i).test(pr[0].nodeName),soffseth=ista&&$.ui.hasScroll(pr[0],"left")?0:self.sizeDiff.height,soffsetw=ista?0:self.sizeDiff.width;
var s={width:(self.helper.width()-soffsetw),height:(self.helper.height()-soffseth)},left=(parseInt(self.element.css("left"),10)+(self.position.left-self.originalPosition.left))||null,top=(parseInt(self.element.css("top"),10)+(self.position.top-self.originalPosition.top))||null;
if(!o.animate){this.element.css($.extend(s,{top:top,left:left}))
}self.helper.height(self.size.height);
self.helper.width(self.size.width);
if(this._helper&&!o.animate){this._proportionallyResize()
}}$("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",event);
if(this._helper){this.helper.remove()
}return false
},_updateVirtualBoundaries:function(forceAspectRatio){var o=this.options,pMinWidth,pMaxWidth,pMinHeight,pMaxHeight,b;
b={minWidth:isNumber(o.minWidth)?o.minWidth:0,maxWidth:isNumber(o.maxWidth)?o.maxWidth:Infinity,minHeight:isNumber(o.minHeight)?o.minHeight:0,maxHeight:isNumber(o.maxHeight)?o.maxHeight:Infinity};
if(this._aspectRatio||forceAspectRatio){pMinWidth=b.minHeight*this.aspectRatio;
pMinHeight=b.minWidth/this.aspectRatio;
pMaxWidth=b.maxHeight*this.aspectRatio;
pMaxHeight=b.maxWidth/this.aspectRatio;
if(pMinWidth>b.minWidth){b.minWidth=pMinWidth
}if(pMinHeight>b.minHeight){b.minHeight=pMinHeight
}if(pMaxWidth<b.maxWidth){b.maxWidth=pMaxWidth
}if(pMaxHeight<b.maxHeight){b.maxHeight=pMaxHeight
}}this._vBoundaries=b
},_updateCache:function(data){var o=this.options;
this.offset=this.helper.offset();
if(isNumber(data.left)){this.position.left=data.left
}if(isNumber(data.top)){this.position.top=data.top
}if(isNumber(data.height)){this.size.height=data.height
}if(isNumber(data.width)){this.size.width=data.width
}},_updateRatio:function(data,event){var o=this.options,cpos=this.position,csize=this.size,a=this.axis;
if(isNumber(data.height)){data.width=(data.height*this.aspectRatio)
}else{if(isNumber(data.width)){data.height=(data.width/this.aspectRatio)
}}if(a=="sw"){data.left=cpos.left+(csize.width-data.width);
data.top=null
}if(a=="nw"){data.top=cpos.top+(csize.height-data.height);
data.left=cpos.left+(csize.width-data.width)
}return data
},_respectSize:function(data,event){var el=this.helper,o=this._vBoundaries,pRatio=this._aspectRatio||event.shiftKey,a=this.axis,ismaxw=isNumber(data.width)&&o.maxWidth&&(o.maxWidth<data.width),ismaxh=isNumber(data.height)&&o.maxHeight&&(o.maxHeight<data.height),isminw=isNumber(data.width)&&o.minWidth&&(o.minWidth>data.width),isminh=isNumber(data.height)&&o.minHeight&&(o.minHeight>data.height);
if(isminw){data.width=o.minWidth
}if(isminh){data.height=o.minHeight
}if(ismaxw){data.width=o.maxWidth
}if(ismaxh){data.height=o.maxHeight
}var dw=this.originalPosition.left+this.originalSize.width,dh=this.position.top+this.size.height;
var cw=/sw|nw|w/.test(a),ch=/nw|ne|n/.test(a);
if(isminw&&cw){data.left=dw-o.minWidth
}if(ismaxw&&cw){data.left=dw-o.maxWidth
}if(isminh&&ch){data.top=dh-o.minHeight
}if(ismaxh&&ch){data.top=dh-o.maxHeight
}var isNotwh=!data.width&&!data.height;
if(isNotwh&&!data.left&&data.top){data.top=null
}else{if(isNotwh&&!data.top&&data.left){data.left=null
}}return data
},_proportionallyResize:function(){var o=this.options;
if(!this._proportionallyResizeElements.length){return 
}var element=this.helper||this.element;
for(var i=0;
i<this._proportionallyResizeElements.length;
i++){var prel=this._proportionallyResizeElements[i];
if(!this.borderDif){var b=[prel.css("borderTopWidth"),prel.css("borderRightWidth"),prel.css("borderBottomWidth"),prel.css("borderLeftWidth")],p=[prel.css("paddingTop"),prel.css("paddingRight"),prel.css("paddingBottom"),prel.css("paddingLeft")];
this.borderDif=$.map(b,function(v,i){var border=parseInt(v,10)||0,padding=parseInt(p[i],10)||0;
return border+padding
})
}if($.browser.msie&&!(!($(element).is(":hidden")||$(element).parents(":hidden").length))){continue
}prel.css({height:(element.height()-this.borderDif[0]-this.borderDif[2])||0,width:(element.width()-this.borderDif[1]-this.borderDif[3])||0})
}},_renderProxy:function(){var el=this.element,o=this.options;
this.elementOffset=el.offset();
if(this._helper){this.helper=this.helper||$('<div style="overflow:hidden;"></div>');
var ie6=$.browser.msie&&$.browser.version<7,ie6offset=(ie6?1:0),pxyoffset=(ie6?2:-1);
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+pxyoffset,height:this.element.outerHeight()+pxyoffset,position:"absolute",left:this.elementOffset.left-ie6offset+"px",top:this.elementOffset.top-ie6offset+"px",zIndex:++o.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(event,dx,dy){return{width:this.originalSize.width+dx}
},w:function(event,dx,dy){var o=this.options,cs=this.originalSize,sp=this.originalPosition;
return{left:sp.left+dx,width:cs.width-dx}
},n:function(event,dx,dy){var o=this.options,cs=this.originalSize,sp=this.originalPosition;
return{top:sp.top+dy,height:cs.height-dy}
},s:function(event,dx,dy){return{height:this.originalSize.height+dy}
},se:function(event,dx,dy){return $.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[event,dx,dy]))
},sw:function(event,dx,dy){return $.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[event,dx,dy]))
},ne:function(event,dx,dy){return $.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[event,dx,dy]))
},nw:function(event,dx,dy){return $.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[event,dx,dy]))
}},_propagate:function(n,event){$.ui.plugin.call(this,n,[event,this.ui()]);
(n!="resize"&&this._trigger(n,event,this.ui()))
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}});
$.extend($.ui.resizable,{version:"1.8.16"});
$.ui.plugin.add("resizable","alsoResize",{start:function(event,ui){var self=$(this).data("resizable"),o=self.options;
var _store=function(exp){$(exp).each(function(){var el=$(this);
el.data("resizable-alsoresize",{width:parseInt(el.width(),10),height:parseInt(el.height(),10),left:parseInt(el.css("left"),10),top:parseInt(el.css("top"),10),position:el.css("position")})
})
};
if(typeof (o.alsoResize)=="object"&&!o.alsoResize.parentNode){if(o.alsoResize.length){o.alsoResize=o.alsoResize[0];
_store(o.alsoResize)
}else{$.each(o.alsoResize,function(exp){_store(exp)
})
}}else{_store(o.alsoResize)
}},resize:function(event,ui){var self=$(this).data("resizable"),o=self.options,os=self.originalSize,op=self.originalPosition;
var delta={height:(self.size.height-os.height)||0,width:(self.size.width-os.width)||0,top:(self.position.top-op.top)||0,left:(self.position.left-op.left)||0},_alsoResize=function(exp,c){$(exp).each(function(){var el=$(this),start=$(this).data("resizable-alsoresize"),style={},css=c&&c.length?c:el.parents(ui.originalElement[0]).length?["width","height"]:["width","height","top","left"];
$.each(css,function(i,prop){var sum=(start[prop]||0)+(delta[prop]||0);
if(sum&&sum>=0){style[prop]=sum||null
}});
if($.browser.opera&&/relative/.test(el.css("position"))){self._revertToRelativePosition=true;
el.css({position:"absolute",top:"auto",left:"auto"})
}el.css(style)
})
};
if(typeof (o.alsoResize)=="object"&&!o.alsoResize.nodeType){$.each(o.alsoResize,function(exp,c){_alsoResize(exp,c)
})
}else{_alsoResize(o.alsoResize)
}},stop:function(event,ui){var self=$(this).data("resizable"),o=self.options;
var _reset=function(exp){$(exp).each(function(){var el=$(this);
el.css({position:el.data("resizable-alsoresize").position})
})
};
if(self._revertToRelativePosition){self._revertToRelativePosition=false;
if(typeof (o.alsoResize)=="object"&&!o.alsoResize.nodeType){$.each(o.alsoResize,function(exp){_reset(exp)
})
}else{_reset(o.alsoResize)
}}$(this).removeData("resizable-alsoresize")
}});
$.ui.plugin.add("resizable","animate",{stop:function(event,ui){var self=$(this).data("resizable"),o=self.options;
var pr=self._proportionallyResizeElements,ista=pr.length&&(/textarea/i).test(pr[0].nodeName),soffseth=ista&&$.ui.hasScroll(pr[0],"left")?0:self.sizeDiff.height,soffsetw=ista?0:self.sizeDiff.width;
var style={width:(self.size.width-soffsetw),height:(self.size.height-soffseth)},left=(parseInt(self.element.css("left"),10)+(self.position.left-self.originalPosition.left))||null,top=(parseInt(self.element.css("top"),10)+(self.position.top-self.originalPosition.top))||null;
self.element.animate($.extend(style,top&&left?{top:top,left:left}:{}),{duration:o.animateDuration,easing:o.animateEasing,step:function(){var data={width:parseInt(self.element.css("width"),10),height:parseInt(self.element.css("height"),10),top:parseInt(self.element.css("top"),10),left:parseInt(self.element.css("left"),10)};
if(pr&&pr.length){$(pr[0]).css({width:data.width,height:data.height})
}self._updateCache(data);
self._propagate("resize",event)
}})
}});
$.ui.plugin.add("resizable","containment",{start:function(event,ui){var self=$(this).data("resizable"),o=self.options,el=self.element;
var oc=o.containment,ce=(oc instanceof $)?oc.get(0):(/parent/.test(oc))?el.parent().get(0):oc;
if(!ce){return 
}self.containerElement=$(ce);
if(/document/.test(oc)||oc==document){self.containerOffset={left:0,top:0};
self.containerPosition={left:0,top:0};
self.parentData={element:$(document),left:0,top:0,width:$(document).width(),height:$(document).height()||document.body.parentNode.scrollHeight}
}else{var element=$(ce),p=[];
$(["Top","Right","Left","Bottom"]).each(function(i,name){p[i]=num(element.css("padding"+name))
});
self.containerOffset=element.offset();
self.containerPosition=element.position();
self.containerSize={height:(element.innerHeight()-p[3]),width:(element.innerWidth()-p[1])};
var co=self.containerOffset,ch=self.containerSize.height,cw=self.containerSize.width,width=($.ui.hasScroll(ce,"left")?ce.scrollWidth:cw),height=($.ui.hasScroll(ce)?ce.scrollHeight:ch);
self.parentData={element:ce,left:co.left,top:co.top,width:width,height:height}
}},resize:function(event,ui){var self=$(this).data("resizable"),o=self.options,ps=self.containerSize,co=self.containerOffset,cs=self.size,cp=self.position,pRatio=self._aspectRatio||event.shiftKey,cop={top:0,left:0},ce=self.containerElement;
if(ce[0]!=document&&(/static/).test(ce.css("position"))){cop=co
}if(cp.left<(self._helper?co.left:0)){self.size.width=self.size.width+(self._helper?(self.position.left-co.left):(self.position.left-cop.left));
if(pRatio){self.size.height=self.size.width/o.aspectRatio
}self.position.left=o.helper?co.left:0
}if(cp.top<(self._helper?co.top:0)){self.size.height=self.size.height+(self._helper?(self.position.top-co.top):self.position.top);
if(pRatio){self.size.width=self.size.height*o.aspectRatio
}self.position.top=self._helper?co.top:0
}self.offset.left=self.parentData.left+self.position.left;
self.offset.top=self.parentData.top+self.position.top;
var woset=Math.abs((self._helper?self.offset.left-cop.left:(self.offset.left-cop.left))+self.sizeDiff.width),hoset=Math.abs((self._helper?self.offset.top-cop.top:(self.offset.top-co.top))+self.sizeDiff.height);
var isParent=self.containerElement.get(0)==self.element.parent().get(0),isOffsetRelative=/relative|absolute/.test(self.containerElement.css("position"));
if(isParent&&isOffsetRelative){woset-=self.parentData.left
}if(woset+self.size.width>=self.parentData.width){self.size.width=self.parentData.width-woset;
if(pRatio){self.size.height=self.size.width/self.aspectRatio
}}if(hoset+self.size.height>=self.parentData.height){self.size.height=self.parentData.height-hoset;
if(pRatio){self.size.width=self.size.height*self.aspectRatio
}}},stop:function(event,ui){var self=$(this).data("resizable"),o=self.options,cp=self.position,co=self.containerOffset,cop=self.containerPosition,ce=self.containerElement;
var helper=$(self.helper),ho=helper.offset(),w=helper.outerWidth()-self.sizeDiff.width,h=helper.outerHeight()-self.sizeDiff.height;
if(self._helper&&!o.animate&&(/relative/).test(ce.css("position"))){$(this).css({left:ho.left-cop.left-co.left,width:w,height:h})
}if(self._helper&&!o.animate&&(/static/).test(ce.css("position"))){$(this).css({left:ho.left-cop.left-co.left,width:w,height:h})
}}});
$.ui.plugin.add("resizable","ghost",{start:function(event,ui){var self=$(this).data("resizable"),o=self.options,cs=self.size;
self.ghost=self.originalElement.clone();
self.ghost.css({opacity:0.25,display:"block",position:"relative",height:cs.height,width:cs.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof o.ghost=="string"?o.ghost:"");
self.ghost.appendTo(self.helper)
},resize:function(event,ui){var self=$(this).data("resizable"),o=self.options;
if(self.ghost){self.ghost.css({position:"relative",height:self.size.height,width:self.size.width})
}},stop:function(event,ui){var self=$(this).data("resizable"),o=self.options;
if(self.ghost&&self.helper){self.helper.get(0).removeChild(self.ghost.get(0))
}}});
$.ui.plugin.add("resizable","grid",{resize:function(event,ui){var self=$(this).data("resizable"),o=self.options,cs=self.size,os=self.originalSize,op=self.originalPosition,a=self.axis,ratio=o._aspectRatio||event.shiftKey;
o.grid=typeof o.grid=="number"?[o.grid,o.grid]:o.grid;
var ox=Math.round((cs.width-os.width)/(o.grid[0]||1))*(o.grid[0]||1),oy=Math.round((cs.height-os.height)/(o.grid[1]||1))*(o.grid[1]||1);
if(/^(se|s|e)$/.test(a)){self.size.width=os.width+ox;
self.size.height=os.height+oy
}else{if(/^(ne)$/.test(a)){self.size.width=os.width+ox;
self.size.height=os.height+oy;
self.position.top=op.top-oy
}else{if(/^(sw)$/.test(a)){self.size.width=os.width+ox;
self.size.height=os.height+oy;
self.position.left=op.left-ox
}else{self.size.width=os.width+ox;
self.size.height=os.height+oy;
self.position.top=op.top-oy;
self.position.left=op.left-ox
}}}}});
var num=function(v){return parseInt(v,10)||0
};
var isNumber=function(value){return !isNaN(parseInt(value,10))
}
})(jQuery);
(function($,undefined){$.widget("ui.selectable",$.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var self=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var selectees;
this.refresh=function(){selectees=$(self.options.filter,self.element[0]);
selectees.each(function(){var $this=$(this);
var pos=$this.offset();
$.data(this,"selectable-item",{element:this,$element:$this,left:pos.left,top:pos.top,right:pos.left+$this.outerWidth(),bottom:pos.top+$this.outerHeight(),startselected:false,selected:$this.hasClass("ui-selected"),selecting:$this.hasClass("ui-selecting"),unselecting:$this.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=selectees.addClass("ui-selectee");
this._mouseInit();
this.helper=$("<div class='ui-selectable-helper'></div>")
},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy();
return this
},_mouseStart:function(event){var self=this;
this.opos=[event.pageX,event.pageY];
if(this.options.disabled){return 
}var options=this.options;
this.selectees=$(options.filter,this.element[0]);
this._trigger("start",event);
$(options.appendTo).append(this.helper);
this.helper.css({left:event.clientX,top:event.clientY,width:0,height:0});
if(options.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var selectee=$.data(this,"selectable-item");
selectee.startselected=true;
if(!event.metaKey){selectee.$element.removeClass("ui-selected");
selectee.selected=false;
selectee.$element.addClass("ui-unselecting");
selectee.unselecting=true;
self._trigger("unselecting",event,{unselecting:selectee.element})
}});
$(event.target).parents().andSelf().each(function(){var selectee=$.data(this,"selectable-item");
if(selectee){var doSelect=!event.metaKey||!selectee.$element.hasClass("ui-selected");
selectee.$element.removeClass(doSelect?"ui-unselecting":"ui-selected").addClass(doSelect?"ui-selecting":"ui-unselecting");
selectee.unselecting=!doSelect;
selectee.selecting=doSelect;
selectee.selected=doSelect;
if(doSelect){self._trigger("selecting",event,{selecting:selectee.element})
}else{self._trigger("unselecting",event,{unselecting:selectee.element})
}return false
}})
},_mouseDrag:function(event){var self=this;
this.dragged=true;
if(this.options.disabled){return 
}var options=this.options;
var x1=this.opos[0],y1=this.opos[1],x2=event.pageX,y2=event.pageY;
if(x1>x2){var tmp=x2;
x2=x1;
x1=tmp
}if(y1>y2){var tmp=y2;
y2=y1;
y1=tmp
}this.helper.css({left:x1,top:y1,width:x2-x1,height:y2-y1});
this.selectees.each(function(){var selectee=$.data(this,"selectable-item");
if(!selectee||selectee.element==self.element[0]){return 
}var hit=false;
if(options.tolerance=="touch"){hit=(!(selectee.left>x2||selectee.right<x1||selectee.top>y2||selectee.bottom<y1))
}else{if(options.tolerance=="fit"){hit=(selectee.left>x1&&selectee.right<x2&&selectee.top>y1&&selectee.bottom<y2)
}}if(hit){if(selectee.selected){selectee.$element.removeClass("ui-selected");
selectee.selected=false
}if(selectee.unselecting){selectee.$element.removeClass("ui-unselecting");
selectee.unselecting=false
}if(!selectee.selecting){selectee.$element.addClass("ui-selecting");
selectee.selecting=true;
self._trigger("selecting",event,{selecting:selectee.element})
}}else{if(selectee.selecting){if(event.metaKey&&selectee.startselected){selectee.$element.removeClass("ui-selecting");
selectee.selecting=false;
selectee.$element.addClass("ui-selected");
selectee.selected=true
}else{selectee.$element.removeClass("ui-selecting");
selectee.selecting=false;
if(selectee.startselected){selectee.$element.addClass("ui-unselecting");
selectee.unselecting=true
}self._trigger("unselecting",event,{unselecting:selectee.element})
}}if(selectee.selected){if(!event.metaKey&&!selectee.startselected){selectee.$element.removeClass("ui-selected");
selectee.selected=false;
selectee.$element.addClass("ui-unselecting");
selectee.unselecting=true;
self._trigger("unselecting",event,{unselecting:selectee.element})
}}}});
return false
},_mouseStop:function(event){var self=this;
this.dragged=false;
var options=this.options;
$(".ui-unselecting",this.element[0]).each(function(){var selectee=$.data(this,"selectable-item");
selectee.$element.removeClass("ui-unselecting");
selectee.unselecting=false;
selectee.startselected=false;
self._trigger("unselected",event,{unselected:selectee.element})
});
$(".ui-selecting",this.element[0]).each(function(){var selectee=$.data(this,"selectable-item");
selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
selectee.selecting=false;
selectee.selected=true;
selectee.startselected=true;
self._trigger("selected",event,{selected:selectee.element})
});
this._trigger("stop",event);
this.helper.remove();
return false
}});
$.extend($.ui.selectable,{version:"1.8.16"})
})(jQuery);
(function($,undefined){$.widget("ui.sortable",$.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var o=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?o.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var i=this.items.length-1;
i>=0;
i--){this.items[i].item.removeData("sortable-item")
}return this
},_setOption:function(key,value){if(key==="disabled"){this.options[key]=value;
this.widget()[value?"addClass":"removeClass"]("ui-sortable-disabled")
}else{$.Widget.prototype._setOption.apply(this,arguments)
}},_mouseCapture:function(event,overrideHandle){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(event);
var currentItem=null,self=this,nodes=$(event.target).parents().each(function(){if($.data(this,"sortable-item")==self){currentItem=$(this);
return false
}});
if($.data(event.target,"sortable-item")==self){currentItem=$(event.target)
}if(!currentItem){return false
}if(this.options.handle&&!overrideHandle){var validHandle=false;
$(this.options.handle,currentItem).find("*").andSelf().each(function(){if(this==event.target){validHandle=true
}});
if(!validHandle){return false
}}this.currentItem=currentItem;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(event,overrideHandle,noActivation){var o=this.options,self=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(event);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
$.extend(this.offset,{click:{left:event.pageX-this.offset.left,top:event.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(event);
this.originalPageX=event.pageX;
this.originalPageY=event.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();
if(o.containment){this._setContainment()
}if(o.cursor){if($("body").css("cursor")){this._storedCursor=$("body").css("cursor")
}$("body").css("cursor",o.cursor)
}if(o.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",o.opacity)
}if(o.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",o.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",event,this._uiHash());
if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!noActivation){for(var i=this.containers.length-1;
i>=0;
i--){this.containers[i]._trigger("activate",event,self._uiHash(this))
}}if($.ui.ddmanager){$.ui.ddmanager.current=this
}if($.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,event)
}this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(event);
return true
},_mouseDrag:function(event){this.position=this._generatePosition(event);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var o=this.options,scrolled=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-event.pageY<o.scrollSensitivity){this.scrollParent[0].scrollTop=scrolled=this.scrollParent[0].scrollTop+o.scrollSpeed
}else{if(event.pageY-this.overflowOffset.top<o.scrollSensitivity){this.scrollParent[0].scrollTop=scrolled=this.scrollParent[0].scrollTop-o.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-event.pageX<o.scrollSensitivity){this.scrollParent[0].scrollLeft=scrolled=this.scrollParent[0].scrollLeft+o.scrollSpeed
}else{if(event.pageX-this.overflowOffset.left<o.scrollSensitivity){this.scrollParent[0].scrollLeft=scrolled=this.scrollParent[0].scrollLeft-o.scrollSpeed
}}}else{if(event.pageY-$(document).scrollTop()<o.scrollSensitivity){scrolled=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed)
}else{if($(window).height()-(event.pageY-$(document).scrollTop())<o.scrollSensitivity){scrolled=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed)
}}if(event.pageX-$(document).scrollLeft()<o.scrollSensitivity){scrolled=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed)
}else{if($(window).width()-(event.pageX-$(document).scrollLeft())<o.scrollSensitivity){scrolled=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed)
}}}if(scrolled!==false&&$.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,event)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var i=this.items.length-1;
i>=0;
i--){var item=this.items[i],itemElement=item.item[0],intersection=this._intersectsWithPointer(item);
if(!intersection){continue
}if(itemElement!=this.currentItem[0]&&this.placeholder[intersection==1?"next":"prev"]()[0]!=itemElement&&!$.ui.contains(this.placeholder[0],itemElement)&&(this.options.type=="semi-dynamic"?!$.ui.contains(this.element[0],itemElement):true)){this.direction=intersection==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(item)){this._rearrange(event,item)
}else{break
}this._trigger("change",event,this._uiHash());
break
}}this._contactContainers(event);
if($.ui.ddmanager){$.ui.ddmanager.drag(this,event)
}this._trigger("sort",event,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(event,noPropagation){if(!event){return 
}if($.ui.ddmanager&&!this.options.dropBehaviour){$.ui.ddmanager.drop(this,event)
}if(this.options.revert){var self=this;
var cur=self.placeholder.offset();
self.reverting=true;
$(this.helper).animate({left:cur.left-this.offset.parent.left-self.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:cur.top-this.offset.parent.top-self.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){self._clear(event)
})
}else{this._clear(event,noPropagation)
}return false
},cancel:function(){var self=this;
if(this.dragging){this._mouseUp({target:null});
if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}for(var i=this.containers.length-1;
i>=0;
i--){this.containers[i]._trigger("deactivate",null,self._uiHash(this));
if(this.containers[i].containerCache.over){this.containers[i]._trigger("out",null,self._uiHash(this));
this.containers[i].containerCache.over=0
}}}if(this.placeholder){if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){$(this.domPosition.prev).after(this.currentItem)
}else{$(this.domPosition.parent).prepend(this.currentItem)
}}return this
},serialize:function(o){var items=this._getItemsAsjQuery(o&&o.connected);
var str=[];
o=o||{};
$(items).each(function(){var res=($(o.item||this).attr(o.attribute||"id")||"").match(o.expression||(/(.+)[-=_](.+)/));
if(res){str.push((o.key||res[1]+"[]")+"="+(o.key&&o.expression?res[1]:res[2]))
}});
if(!str.length&&o.key){str.push(o.key+"=")
}return str.join("&")
},toArray:function(o){var items=this._getItemsAsjQuery(o&&o.connected);
var ret=[];
o=o||{};
items.each(function(){ret.push($(o.item||this).attr(o.attribute||"id")||"")
});
return ret
},_intersectsWith:function(item){var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;
var l=item.left,r=l+item.width,t=item.top,b=t+item.height;
var dyClick=this.offset.click.top,dxClick=this.offset.click.left;
var isOverElement=(y1+dyClick)>t&&(y1+dyClick)<b&&(x1+dxClick)>l&&(x1+dxClick)<r;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>item[this.floating?"width":"height"])){return isOverElement
}else{return(l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b)
}},_intersectsWithPointer:function(item){var isOverElementHeight=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,item.top,item.height),isOverElementWidth=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,item.left,item.width),isOverElement=isOverElementHeight&&isOverElementWidth,verticalDirection=this._getDragVerticalDirection(),horizontalDirection=this._getDragHorizontalDirection();
if(!isOverElement){return false
}return this.floating?(((horizontalDirection&&horizontalDirection=="right")||verticalDirection=="down")?2:1):(verticalDirection&&(verticalDirection=="down"?2:1))
},_intersectsWithSides:function(item){var isOverBottomHalf=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,item.top+(item.height/2),item.height),isOverRightHalf=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,item.left+(item.width/2),item.width),verticalDirection=this._getDragVerticalDirection(),horizontalDirection=this._getDragHorizontalDirection();
if(this.floating&&horizontalDirection){return((horizontalDirection=="right"&&isOverRightHalf)||(horizontalDirection=="left"&&!isOverRightHalf))
}else{return verticalDirection&&((verticalDirection=="down"&&isOverBottomHalf)||(verticalDirection=="up"&&!isOverBottomHalf))
}},_getDragVerticalDirection:function(){var delta=this.positionAbs.top-this.lastPositionAbs.top;
return delta!=0&&(delta>0?"down":"up")
},_getDragHorizontalDirection:function(){var delta=this.positionAbs.left-this.lastPositionAbs.left;
return delta!=0&&(delta>0?"right":"left")
},refresh:function(event){this._refreshItems(event);
this.refreshPositions();
return this
},_connectWith:function(){var options=this.options;
return options.connectWith.constructor==String?[options.connectWith]:options.connectWith
},_getItemsAsjQuery:function(connected){var self=this;
var items=[];
var queries=[];
var connectWith=this._connectWith();
if(connectWith&&connected){for(var i=connectWith.length-1;
i>=0;
i--){var cur=$(connectWith[i]);
for(var j=cur.length-1;
j>=0;
j--){var inst=$.data(cur[j],"sortable");
if(inst&&inst!=this&&!inst.options.disabled){queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element):$(inst.options.items,inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),inst])
}}}}queries.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var i=queries.length-1;
i>=0;
i--){queries[i][0].each(function(){items.push(this)
})
}return $(items)
},_removeCurrentsFromItems:function(){var list=this.currentItem.find(":data(sortable-item)");
for(var i=0;
i<this.items.length;
i++){for(var j=0;
j<list.length;
j++){if(list[j]==this.items[i].item[0]){this.items.splice(i,1)
}}}},_refreshItems:function(event){this.items=[];
this.containers=[this];
var items=this.items;
var self=this;
var queries=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],event,{item:this.currentItem}):$(this.options.items,this.element),this]];
var connectWith=this._connectWith();
if(connectWith){for(var i=connectWith.length-1;
i>=0;
i--){var cur=$(connectWith[i]);
for(var j=cur.length-1;
j>=0;
j--){var inst=$.data(cur[j],"sortable");
if(inst&&inst!=this&&!inst.options.disabled){queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element[0],event,{item:this.currentItem}):$(inst.options.items,inst.element),inst]);
this.containers.push(inst)
}}}}for(var i=queries.length-1;
i>=0;
i--){var targetData=queries[i][1];
var _queries=queries[i][0];
for(var j=0,queriesLength=_queries.length;
j<queriesLength;
j++){var item=$(_queries[j]);
item.data("sortable-item",targetData);
items.push({item:item,instance:targetData,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(fast){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var i=this.items.length-1;
i>=0;
i--){var item=this.items[i];
if(item.instance!=this.currentContainer&&this.currentContainer&&item.item[0]!=this.currentItem[0]){continue
}var t=this.options.toleranceElement?$(this.options.toleranceElement,item.item):item.item;
if(!fast){item.width=t.outerWidth();
item.height=t.outerHeight()
}var p=t.offset();
item.left=p.left;
item.top=p.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var i=this.containers.length-1;
i>=0;
i--){var p=this.containers[i].element.offset();
this.containers[i].containerCache.left=p.left;
this.containers[i].containerCache.top=p.top;
this.containers[i].containerCache.width=this.containers[i].element.outerWidth();
this.containers[i].containerCache.height=this.containers[i].element.outerHeight()
}}return this
},_createPlaceholder:function(that){var self=that||this,o=self.options;
if(!o.placeholder||o.placeholder.constructor==String){var className=o.placeholder;
o.placeholder={element:function(){var el=$(document.createElement(self.currentItem[0].nodeName)).addClass(className||self.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!className){el.style.visibility="hidden"
}return el
},update:function(container,p){if(className&&!o.forcePlaceholderSize){return 
}if(!p.height()){p.height(self.currentItem.innerHeight()-parseInt(self.currentItem.css("paddingTop")||0,10)-parseInt(self.currentItem.css("paddingBottom")||0,10))
}if(!p.width()){p.width(self.currentItem.innerWidth()-parseInt(self.currentItem.css("paddingLeft")||0,10)-parseInt(self.currentItem.css("paddingRight")||0,10))
}}}
}self.placeholder=$(o.placeholder.element.call(self.element,self.currentItem));
self.currentItem.after(self.placeholder);
o.placeholder.update(self,self.placeholder)
},_contactContainers:function(event){var innermostContainer=null,innermostIndex=null;
for(var i=this.containers.length-1;
i>=0;
i--){if($.ui.contains(this.currentItem[0],this.containers[i].element[0])){continue
}if(this._intersectsWith(this.containers[i].containerCache)){if(innermostContainer&&$.ui.contains(this.containers[i].element[0],innermostContainer.element[0])){continue
}innermostContainer=this.containers[i];
innermostIndex=i
}else{if(this.containers[i].containerCache.over){this.containers[i]._trigger("out",event,this._uiHash(this));
this.containers[i].containerCache.over=0
}}}if(!innermostContainer){return 
}if(this.containers.length===1){this.containers[innermostIndex]._trigger("over",event,this._uiHash(this));
this.containers[innermostIndex].containerCache.over=1
}else{if(this.currentContainer!=this.containers[innermostIndex]){var dist=10000;
var itemWithLeastDistance=null;
var base=this.positionAbs[this.containers[innermostIndex].floating?"left":"top"];
for(var j=this.items.length-1;
j>=0;
j--){if(!$.ui.contains(this.containers[innermostIndex].element[0],this.items[j].item[0])){continue
}var cur=this.items[j][this.containers[innermostIndex].floating?"left":"top"];
if(Math.abs(cur-base)<dist){dist=Math.abs(cur-base);
itemWithLeastDistance=this.items[j]
}}if(!itemWithLeastDistance&&!this.options.dropOnEmpty){return 
}this.currentContainer=this.containers[innermostIndex];
itemWithLeastDistance?this._rearrange(event,itemWithLeastDistance,null,true):this._rearrange(event,null,this.containers[innermostIndex].element,true);
this._trigger("change",event,this._uiHash());
this.containers[innermostIndex]._trigger("change",event,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[innermostIndex]._trigger("over",event,this._uiHash(this));
this.containers[innermostIndex].containerCache.over=1
}}},_createHelper:function(event){var o=this.options;
var helper=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[event,this.currentItem])):(o.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!helper.parents("body").length){$(o.appendTo!="parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(helper[0])
}if(helper[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(helper[0].style.width==""||o.forceHelperSize){helper.width(this.currentItem.width())
}if(helper[0].style.height==""||o.forceHelperSize){helper.height(this.currentItem.height())
}return helper
},_adjustOffsetFromHelper:function(obj){if(typeof obj=="string"){obj=obj.split(" ")
}if($.isArray(obj)){obj={left:+obj[0],top:+obj[1]||0}
}if("left" in obj){this.offset.click.left=obj.left+this.margins.left
}if("right" in obj){this.offset.click.left=this.helperProportions.width-obj.right+this.margins.left
}if("top" in obj){this.offset.click.top=obj.top+this.margins.top
}if("bottom" in obj){this.offset.click.top=this.helperProportions.height-obj.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var po=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0])){po.left+=this.scrollParent.scrollLeft();
po.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&$.browser.msie)){po={top:0,left:0}
}return{top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var p=this.currentItem.position();
return{top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var o=this.options;
if(o.containment=="parent"){o.containment=this.helper[0].parentNode
}if(o.containment=="document"||o.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,$(o.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,($(o.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(o.containment)){var ce=$(o.containment)[0];
var co=$(o.containment).offset();
var over=($(ce).css("overflow")!="hidden");
this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0)-this.margins.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0)-this.margins.top,co.left+(over?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,co.top+(over?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(d,pos){if(!pos){pos=this.position
}var mod=d=="absolute"?1:-1;
var o=this.options,scroll=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,scrollIsRootNode=(/(html|body)/i).test(scroll[0].tagName);
return{top:(pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(scrollIsRootNode?0:scroll.scrollTop()))*mod)),left:(pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())*mod))}
},_generatePosition:function(event){var o=this.options,scroll=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,scrollIsRootNode=(/(html|body)/i).test(scroll[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var pageX=event.pageX;
var pageY=event.pageY;
if(this.originalPosition){if(this.containment){if(event.pageX-this.offset.click.left<this.containment[0]){pageX=this.containment[0]+this.offset.click.left
}if(event.pageY-this.offset.click.top<this.containment[1]){pageY=this.containment[1]+this.offset.click.top
}if(event.pageX-this.offset.click.left>this.containment[2]){pageX=this.containment[2]+this.offset.click.left
}if(event.pageY-this.offset.click.top>this.containment[3]){pageY=this.containment[3]+this.offset.click.top
}}if(o.grid){var top=this.originalPageY+Math.round((pageY-this.originalPageY)/o.grid[1])*o.grid[1];
pageY=this.containment?(!(top-this.offset.click.top<this.containment[1]||top-this.offset.click.top>this.containment[3])?top:(!(top-this.offset.click.top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;
var left=this.originalPageX+Math.round((pageX-this.originalPageX)/o.grid[0])*o.grid[0];
pageX=this.containment?(!(left-this.offset.click.left<this.containment[0]||left-this.offset.click.left>this.containment[2])?left:(!(left-this.offset.click.left<this.containment[0])?left-o.grid[0]:left+o.grid[0])):left
}}return{top:(pageY-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(scrollIsRootNode?0:scroll.scrollTop())))),left:(pageX-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())))}
},_rearrange:function(event,i,a,hardRefresh){a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?i.item[0]:i.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var self=this,counter=this.counter;
window.setTimeout(function(){if(counter==self.counter){self.refreshPositions(!hardRefresh)
}},0)
},_clear:function(event,noPropagation){this.reverting=false;
var delayedTriggers=[],self=this;
if(!this._noFinalSort&&this.currentItem.parent().length){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var i in this._storedCSS){if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static"){this._storedCSS[i]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}if(this.fromOutside&&!noPropagation){delayedTriggers.push(function(event){this._trigger("receive",event,this._uiHash(this.fromOutside))
})
}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!noPropagation){delayedTriggers.push(function(event){this._trigger("update",event,this._uiHash())
})
}if(!$.ui.contains(this.element[0],this.currentItem[0])){if(!noPropagation){delayedTriggers.push(function(event){this._trigger("remove",event,this._uiHash())
})
}for(var i=this.containers.length-1;
i>=0;
i--){if($.ui.contains(this.containers[i].element[0],this.currentItem[0])&&!noPropagation){delayedTriggers.push((function(c){return function(event){c._trigger("receive",event,this._uiHash(this))
}
}).call(this,this.containers[i]));
delayedTriggers.push((function(c){return function(event){c._trigger("update",event,this._uiHash(this))
}
}).call(this,this.containers[i]))
}}}for(var i=this.containers.length-1;
i>=0;
i--){if(!noPropagation){delayedTriggers.push((function(c){return function(event){c._trigger("deactivate",event,this._uiHash(this))
}
}).call(this,this.containers[i]))
}if(this.containers[i].containerCache.over){delayedTriggers.push((function(c){return function(event){c._trigger("out",event,this._uiHash(this))
}
}).call(this,this.containers[i]));
this.containers[i].containerCache.over=0
}}if(this._storedCursor){$("body").css("cursor",this._storedCursor)
}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!noPropagation){this._trigger("beforeStop",event,this._uiHash());
for(var i=0;
i<delayedTriggers.length;
i++){delayedTriggers[i].call(this,event)
}this._trigger("stop",event,this._uiHash())
}return false
}if(!noPropagation){this._trigger("beforeStop",event,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){this.helper.remove()
}this.helper=null;
if(!noPropagation){for(var i=0;
i<delayedTriggers.length;
i++){delayedTriggers[i].call(this,event)
}this._trigger("stop",event,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){if($.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(inst){var self=inst||this;
return{helper:self.helper,placeholder:self.placeholder||$([]),position:self.position,originalPosition:self.originalPosition,offset:self.positionAbs,item:self.currentItem,sender:inst?inst.element:null}
}});
$.extend($.ui.sortable,{version:"1.8.16"})
})(jQuery);
(function($,undefined){$.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var self=this,options=self.options;
self.running=0;
self.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
self.headers=self.element.find(options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(options.disabled){return 
}$(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){if(options.disabled){return 
}$(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){if(options.disabled){return 
}$(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){if(options.disabled){return 
}$(this).removeClass("ui-state-focus")
});
self.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(options.navigation){var current=self.element.find("a").filter(options.navigationFilter).eq(0);
if(current.length){var header=current.closest(".ui-accordion-header");
if(header.length){self.active=header
}else{self.active=current.closest(".ui-accordion-content").prev()
}}}self.active=self._findActive(self.active||options.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
self.active.next().addClass("ui-accordion-content-active");
self._createIcons();
self.resize();
self.element.attr("role","tablist");
self.headers.attr("role","tab").bind("keydown.accordion",function(event){return self._keydown(event)
}).next().attr("role","tabpanel");
self.headers.not(self.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();
if(!self.active.length){self.headers.eq(0).attr("tabIndex",0)
}else{self.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0})
}if(!$.browser.safari){self.headers.find("a").attr("tabIndex",-1)
}if(options.event){self.headers.bind(options.event.split(" ").join(".accordion ")+".accordion",function(event){self._clickHandler.call(self,event,this);
event.preventDefault()
})
}},_createIcons:function(){var options=this.options;
if(options.icons){$("<span></span>").addClass("ui-icon "+options.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(options.icons.header).toggleClass(options.icons.headerSelected);
this.element.addClass("ui-accordion-icons")
}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();
this.element.removeClass("ui-accordion-icons")
},destroy:function(){var options=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");
this._destroyIcons();
var contents=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
if(options.autoHeight||options.fillHeight){contents.css("height","")
}return $.Widget.prototype.destroy.call(this)
},_setOption:function(key,value){$.Widget.prototype._setOption.apply(this,arguments);
if(key=="active"){this.activate(value)
}if(key=="icons"){this._destroyIcons();
if(value){this._createIcons()
}}if(key=="disabled"){this.headers.add(this.headers.next())[value?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
}},_keydown:function(event){if(this.options.disabled||event.altKey||event.ctrlKey){return 
}var keyCode=$.ui.keyCode,length=this.headers.length,currentIndex=this.headers.index(event.target),toFocus=false;
switch(event.keyCode){case keyCode.RIGHT:case keyCode.DOWN:toFocus=this.headers[(currentIndex+1)%length];
break;
case keyCode.LEFT:case keyCode.UP:toFocus=this.headers[(currentIndex-1+length)%length];
break;
case keyCode.SPACE:case keyCode.ENTER:this._clickHandler({target:event.target},event.target);
event.preventDefault()
}if(toFocus){$(event.target).attr("tabIndex",-1);
$(toFocus).attr("tabIndex",0);
toFocus.focus();
return false
}return true
},resize:function(){var options=this.options,maxHeight;
if(options.fillSpace){if($.browser.msie){var defOverflow=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}maxHeight=this.element.parent().height();
if($.browser.msie){this.element.parent().css("overflow",defOverflow)
}this.headers.each(function(){maxHeight-=$(this).outerHeight(true)
});
this.headers.next().each(function(){$(this).height(Math.max(0,maxHeight-$(this).innerHeight()+$(this).height()))
}).css("overflow","auto")
}else{if(options.autoHeight){maxHeight=0;
this.headers.next().each(function(){maxHeight=Math.max(maxHeight,$(this).height("").height())
}).height(maxHeight)
}}return this
},activate:function(index){this.options.active=index;
var active=this._findActive(index)[0];
this._clickHandler({target:active},active);
return this
},_findActive:function(selector){return selector?typeof selector==="number"?this.headers.filter(":eq("+selector+")"):this.headers.not(this.headers.not(selector)):selector===false?$([]):this.headers.filter(":eq(0)")
},_clickHandler:function(event,target){var options=this.options;
if(options.disabled){return 
}if(!event.target){if(!options.collapsible){return 
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var toHide=this.active.next(),data={options:options,newHeader:$([]),oldHeader:options.active,newContent:$([]),oldContent:toHide},toShow=(this.active=$([]));
this._toggle(toShow,toHide,data);
return 
}var clicked=$(event.currentTarget||target),clickedIsActive=clicked[0]===this.active[0];
options.active=options.collapsible&&clickedIsActive?false:this.headers.index(clicked);
if(this.running||(!options.collapsible&&clickedIsActive)){return 
}var active=this.active,toShow=clicked.next(),toHide=this.active.next(),data={options:options,newHeader:clickedIsActive&&options.collapsible?$([]):clicked,oldHeader:this.active,newContent:clickedIsActive&&options.collapsible?$([]):toShow,oldContent:toHide},down=this.headers.index(this.active[0])>this.headers.index(clicked[0]);
this.active=clickedIsActive?$([]):clicked;
this._toggle(toShow,toHide,data,clickedIsActive,down);
active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header);
if(!clickedIsActive){clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(options.icons.header).addClass(options.icons.headerSelected);
clicked.next().addClass("ui-accordion-content-active")
}return 
},_toggle:function(toShow,toHide,data,clickedIsActive,down){var self=this,options=self.options;
self.toShow=toShow;
self.toHide=toHide;
self.data=data;
var complete=function(){if(!self){return 
}return self._completed.apply(self,arguments)
};
self._trigger("changestart",null,self.data);
self.running=toHide.size()===0?toShow.size():toHide.size();
if(options.animated){var animOptions={};
if(options.collapsible&&clickedIsActive){animOptions={toShow:$([]),toHide:toHide,complete:complete,down:down,autoHeight:options.autoHeight||options.fillSpace}
}else{animOptions={toShow:toShow,toHide:toHide,complete:complete,down:down,autoHeight:options.autoHeight||options.fillSpace}
}if(!options.proxied){options.proxied=options.animated
}if(!options.proxiedDuration){options.proxiedDuration=options.duration
}options.animated=$.isFunction(options.proxied)?options.proxied(animOptions):options.proxied;
options.duration=$.isFunction(options.proxiedDuration)?options.proxiedDuration(animOptions):options.proxiedDuration;
var animations=$.ui.accordion.animations,duration=options.duration,easing=options.animated;
if(easing&&!animations[easing]&&!$.easing[easing]){easing="slide"
}if(!animations[easing]){animations[easing]=function(options){this.slide(options,{easing:easing,duration:duration||700})
}
}animations[easing](animOptions)
}else{if(options.collapsible&&clickedIsActive){toShow.toggle()
}else{toHide.hide();
toShow.show()
}complete(true)
}toHide.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();
toShow.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()
},_completed:function(cancel){this.running=cancel?0:--this.running;
if(this.running){return 
}if(this.options.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this.toHide.removeClass("ui-accordion-content-active");
if(this.toHide.length){this.toHide.parent()[0].className=this.toHide.parent()[0].className
}this._trigger("change",null,this.data)
}});
$.extend($.ui.accordion,{version:"1.8.16",animations:{slide:function(options,additions){options=$.extend({easing:"swing",duration:300},options,additions);
if(!options.toHide.size()){options.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},options);
return 
}if(!options.toShow.size()){options.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},options);
return 
}var overflow=options.toShow.css("overflow"),percentDone=0,showProps={},hideProps={},fxAttrs=["height","paddingTop","paddingBottom"],originalWidth;
var s=options.toShow;
originalWidth=s[0].style.width;
s.width(parseInt(s.parent().width(),10)-parseInt(s.css("paddingLeft"),10)-parseInt(s.css("paddingRight"),10)-(parseInt(s.css("borderLeftWidth"),10)||0)-(parseInt(s.css("borderRightWidth"),10)||0));
$.each(fxAttrs,function(i,prop){hideProps[prop]="hide";
var parts=(""+$.css(options.toShow[0],prop)).match(/^([\d+-.]+)(.*)$/);
showProps[prop]={value:parts[1],unit:parts[2]||"px"}
});
options.toShow.css({height:0,overflow:"hidden"}).show();
options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps,{step:function(now,settings){if(settings.prop=="height"){percentDone=(settings.end-settings.start===0)?0:(settings.now-settings.start)/(settings.end-settings.start)
}options.toShow[0].style[settings.prop]=(percentDone*showProps[settings.prop].value)+showProps[settings.prop].unit
},duration:options.duration,easing:options.easing,complete:function(){if(!options.autoHeight){options.toShow.css("height","")
}options.toShow.css({width:originalWidth,overflow:overflow});
options.complete()
}})
},bounceslide:function(options){this.slide(options,{easing:options.down?"easeOutBounce":"swing",duration:options.down?1000:200})
}}})
})(jQuery);
(function($,undefined){var requestIndex=0;
$.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var self=this,doc=this.element[0].ownerDocument,suppressKeyPress;
this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(event){if(self.options.disabled||self.element.propAttr("readOnly")){return 
}suppressKeyPress=false;
var keyCode=$.ui.keyCode;
switch(event.keyCode){case keyCode.PAGE_UP:self._move("previousPage",event);
break;
case keyCode.PAGE_DOWN:self._move("nextPage",event);
break;
case keyCode.UP:self._move("previous",event);
event.preventDefault();
break;
case keyCode.DOWN:self._move("next",event);
event.preventDefault();
break;
case keyCode.ENTER:case keyCode.NUMPAD_ENTER:if(self.menu.active){suppressKeyPress=true;
event.preventDefault()
}case keyCode.TAB:if(!self.menu.active){return 
}self.menu.select(event);
break;
case keyCode.ESCAPE:self.element.val(self.term);
self.close(event);
break;
default:clearTimeout(self.searching);
self.searching=setTimeout(function(){if(self.term!=self.element.val()){self.selectedItem=null;
self.search(null,event)
}},self.options.delay);
break
}}).bind("keypress.autocomplete",function(event){if(suppressKeyPress){suppressKeyPress=false;
event.preventDefault()
}}).bind("focus.autocomplete",function(){if(self.options.disabled){return 
}self.selectedItem=null;
self.previous=self.element.val()
}).bind("blur.autocomplete",function(event){if(self.options.disabled){return 
}clearTimeout(self.searching);
self.closing=setTimeout(function(){self.close(event);
self._change(event)
},150)
});
this._initSource();
this.response=function(){return self._response.apply(self,arguments)
};
this.menu=$("<ul></ul>").addClass("ui-autocomplete").appendTo($(this.options.appendTo||"body",doc)[0]).mousedown(function(event){var menuElement=self.menu.element[0];
if(!$(event.target).closest(".ui-menu-item").length){setTimeout(function(){$(document).one("mousedown",function(event){if(event.target!==self.element[0]&&event.target!==menuElement&&!$.ui.contains(menuElement,event.target)){self.close()
}})
},1)
}setTimeout(function(){clearTimeout(self.closing)
},13)
}).menu({focus:function(event,ui){var item=ui.item.data("item.autocomplete");
if(false!==self._trigger("focus",event,{item:item})){if(/^key/.test(event.originalEvent.type)){self.element.val(item.value)
}}},selected:function(event,ui){var item=ui.item.data("item.autocomplete"),previous=self.previous;
if(self.element[0]!==doc.activeElement){self.element.focus();
self.previous=previous;
setTimeout(function(){self.previous=previous;
self.selectedItem=item
},1)
}if(false!==self._trigger("select",event,{item:item})){self.element.val(item.value)
}self.term=self.element.val();
self.close(event);
self.selectedItem=item
},blur:function(event,ui){if(self.menu.element.is(":visible")&&(self.element.val()!==self.term)){self.element.val(self.term)
}}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
if($.fn.bgiframe){this.menu.element.bgiframe()
}},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();
$.Widget.prototype.destroy.call(this)
},_setOption:function(key,value){$.Widget.prototype._setOption.apply(this,arguments);
if(key==="source"){this._initSource()
}if(key==="appendTo"){this.menu.element.appendTo($(value||"body",this.element[0].ownerDocument)[0])
}if(key==="disabled"&&value&&this.xhr){this.xhr.abort()
}},_initSource:function(){var self=this,array,url;
if($.isArray(this.options.source)){array=this.options.source;
this.source=function(request,response){response($.ui.autocomplete.filter(array,request.term))
}
}else{if(typeof this.options.source==="string"){url=this.options.source;
this.source=function(request,response){if(self.xhr){self.xhr.abort()
}self.xhr=$.ajax({url:url,data:request,dataType:"json",autocompleteRequest:++requestIndex,success:function(data,status){if(this.autocompleteRequest===requestIndex){response(data)
}},error:function(){if(this.autocompleteRequest===requestIndex){response([])
}}})
}
}else{this.source=this.options.source
}}},search:function(value,event){value=value!=null?value:this.element.val();
this.term=this.element.val();
if(value.length<this.options.minLength){return this.close(event)
}clearTimeout(this.closing);
if(this._trigger("search",event)===false){return 
}return this._search(value)
},_search:function(value){this.pending++;
this.element.addClass("ui-autocomplete-loading");
this.source({term:value},this.response)
},_response:function(content){if(!this.options.disabled&&content&&content.length){content=this._normalize(content);
this._suggest(content);
this._trigger("open")
}else{this.close()
}this.pending--;
if(!this.pending){this.element.removeClass("ui-autocomplete-loading")
}},close:function(event){clearTimeout(this.closing);
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.deactivate();
this._trigger("close",event)
}},_change:function(event){if(this.previous!==this.element.val()){this._trigger("change",event,{item:this.selectedItem})
}},_normalize:function(items){if(items.length&&items[0].label&&items[0].value){return items
}return $.map(items,function(item){if(typeof item==="string"){return{label:item,value:item}
}return $.extend({label:item.label||item.value,value:item.value||item.label},item)
})
},_suggest:function(items){var ul=this.menu.element.empty().zIndex(this.element.zIndex()+1);
this._renderMenu(ul,items);
this.menu.deactivate();
this.menu.refresh();
ul.show();
this._resizeMenu();
ul.position($.extend({of:this.element},this.options.position));
if(this.options.autoFocus){this.menu.next(new $.Event("mouseover"))
}},_resizeMenu:function(){var ul=this.menu.element;
ul.outerWidth(Math.max(ul.width("").outerWidth(),this.element.outerWidth()))
},_renderMenu:function(ul,items){var self=this;
$.each(items,function(index,item){self._renderItem(ul,item)
})
},_renderItem:function(ul,item){return $("<li></li>").data("item.autocomplete",item).append($("<a></a>").text(item.label)).appendTo(ul)
},_move:function(direction,event){if(!this.menu.element.is(":visible")){this.search(null,event);
return 
}if(this.menu.first()&&/^previous/.test(direction)||this.menu.last()&&/^next/.test(direction)){this.element.val(this.term);
this.menu.deactivate();
return 
}this.menu[direction](event)
},widget:function(){return this.menu.element
}});
$.extend($.ui.autocomplete,{escapeRegex:function(value){return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(array,term){var matcher=new RegExp($.ui.autocomplete.escapeRegex(term),"i");
return $.grep(array,function(value){return matcher.test(value.label||value.value||value)
})
}})
}(jQuery));
(function($){$.widget("ui.menu",{_create:function(){var self=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(event){if(!$(event.target).closest(".ui-menu-item a").length){return 
}event.preventDefault();
self.select(event)
});
this.refresh()
},refresh:function(){var self=this;
var items=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");
items.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(event){self.activate(event,$(this).parent())
}).mouseleave(function(){self.deactivate()
})
},activate:function(event,item){this.deactivate();
if(this.hasScroll()){var offset=item.offset().top-this.element.offset().top,scroll=this.element.scrollTop(),elementHeight=this.element.height();
if(offset<0){this.element.scrollTop(scroll+offset)
}else{if(offset>=elementHeight){this.element.scrollTop(scroll+offset-elementHeight+item.height())
}}}this.active=item.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();
this._trigger("focus",event,{item:item})
},deactivate:function(){if(!this.active){return 
}this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");
this.active=null
},next:function(event){this.move("next",".ui-menu-item:first",event)
},previous:function(event){this.move("prev",".ui-menu-item:last",event)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(direction,edge,event){if(!this.active){this.activate(event,this.element.children(edge));
return 
}var next=this.active[direction+"All"](".ui-menu-item").eq(0);
if(next.length){this.activate(event,next)
}else{this.activate(event,this.element.children(edge))
}},nextPage:function(event){if(this.hasScroll()){if(!this.active||this.last()){this.activate(event,this.element.children(".ui-menu-item:first"));
return 
}var base=this.active.offset().top,height=this.element.height(),result=this.element.children(".ui-menu-item").filter(function(){var close=$(this).offset().top-base-height+$(this).height();
return close<10&&close>-10
});
if(!result.length){result=this.element.children(".ui-menu-item:last")
}this.activate(event,result)
}else{this.activate(event,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))
}},previousPage:function(event){if(this.hasScroll()){if(!this.active||this.first()){this.activate(event,this.element.children(".ui-menu-item:last"));
return 
}var base=this.active.offset().top,height=this.element.height();
result=this.element.children(".ui-menu-item").filter(function(){var close=$(this).offset().top-base+height-$(this).height();
return close<10&&close>-10
});
if(!result.length){result=this.element.children(".ui-menu-item:first")
}this.activate(event,result)
}else{this.activate(event,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element[$.fn.prop?"prop":"attr"]("scrollHeight")
},select:function(event){this._trigger("selected",event,{item:this.active})
}})
}(jQuery));
(function($,undefined){var lastActive,startXPos,startYPos,clickDragged,baseClasses="ui-button ui-widget ui-state-default ui-corner-all",stateClasses="ui-state-hover ui-state-active ",typeClasses="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",formResetHandler=function(){var buttons=$(this).find(":ui-button");
setTimeout(function(){buttons.button("refresh")
},1)
},radioGroup=function(radio){var name=radio.name,form=radio.form,radios=$([]);
if(name){if(form){radios=$(form).find("[name='"+name+"']")
}else{radios=$("[name='"+name+"']",radio.ownerDocument).filter(function(){return !this.form
})
}}return radios
};
$.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",formResetHandler);
if(typeof this.options.disabled!=="boolean"){this.options.disabled=this.element.propAttr("disabled")
}this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");
var self=this,options=this.options,toggleButton=this.type==="checkbox"||this.type==="radio",hoverClass="ui-state-hover"+(!toggleButton?" ui-state-active":""),focusClass="ui-state-focus";
if(options.label===null){options.label=this.buttonElement.html()
}if(this.element.is(":disabled")){options.disabled=true
}this.buttonElement.addClass(baseClasses).attr("role","button").bind("mouseenter.button",function(){if(options.disabled){return 
}$(this).addClass("ui-state-hover");
if(this===lastActive){$(this).addClass("ui-state-active")
}}).bind("mouseleave.button",function(){if(options.disabled){return 
}$(this).removeClass(hoverClass)
}).bind("click.button",function(event){if(options.disabled){event.preventDefault();
event.stopImmediatePropagation()
}});
this.element.bind("focus.button",function(){self.buttonElement.addClass(focusClass)
}).bind("blur.button",function(){self.buttonElement.removeClass(focusClass)
});
if(toggleButton){this.element.bind("change.button",function(){if(clickDragged){return 
}self.refresh()
});
this.buttonElement.bind("mousedown.button",function(event){if(options.disabled){return 
}clickDragged=false;
startXPos=event.pageX;
startYPos=event.pageY
}).bind("mouseup.button",function(event){if(options.disabled){return 
}if(startXPos!==event.pageX||startYPos!==event.pageY){clickDragged=true
}})
}if(this.type==="checkbox"){this.buttonElement.bind("click.button",function(){if(options.disabled||clickDragged){return false
}$(this).toggleClass("ui-state-active");
self.buttonElement.attr("aria-pressed",self.element[0].checked)
})
}else{if(this.type==="radio"){this.buttonElement.bind("click.button",function(){if(options.disabled||clickDragged){return false
}$(this).addClass("ui-state-active");
self.buttonElement.attr("aria-pressed","true");
var radio=self.element[0];
radioGroup(radio).not(radio).map(function(){return $(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed","false")
})
}else{this.buttonElement.bind("mousedown.button",function(){if(options.disabled){return false
}$(this).addClass("ui-state-active");
lastActive=this;
$(document).one("mouseup",function(){lastActive=null
})
}).bind("mouseup.button",function(){if(options.disabled){return false
}$(this).removeClass("ui-state-active")
}).bind("keydown.button",function(event){if(options.disabled){return false
}if(event.keyCode==$.ui.keyCode.SPACE||event.keyCode==$.ui.keyCode.ENTER){$(this).addClass("ui-state-active")
}}).bind("keyup.button",function(){$(this).removeClass("ui-state-active")
});
if(this.buttonElement.is("a")){this.buttonElement.keyup(function(event){if(event.keyCode===$.ui.keyCode.SPACE){$(this).click()
}})
}}}this._setOption("disabled",options.disabled);
this._resetButton()
},_determineButtonType:function(){if(this.element.is(":checkbox")){this.type="checkbox"
}else{if(this.element.is(":radio")){this.type="radio"
}else{if(this.element.is("input")){this.type="input"
}else{this.type="button"
}}}if(this.type==="checkbox"||this.type==="radio"){var ancestor=this.element.parents().filter(":last"),labelSelector="label[for='"+this.element.attr("id")+"']";
this.buttonElement=ancestor.find(labelSelector);
if(!this.buttonElement.length){ancestor=ancestor.length?ancestor.siblings():this.element.siblings();
this.buttonElement=ancestor.filter(labelSelector);
if(!this.buttonElement.length){this.buttonElement=ancestor.find(labelSelector)
}}this.element.addClass("ui-helper-hidden-accessible");
var checked=this.element.is(":checked");
if(checked){this.buttonElement.addClass("ui-state-active")
}this.buttonElement.attr("aria-pressed",checked)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");
this.buttonElement.removeClass(baseClasses+" "+stateClasses+" "+typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
if(!this.hasTitle){this.buttonElement.removeAttr("title")
}$.Widget.prototype.destroy.call(this)
},_setOption:function(key,value){$.Widget.prototype._setOption.apply(this,arguments);
if(key==="disabled"){if(value){this.element.propAttr("disabled",true)
}else{this.element.propAttr("disabled",false)
}return 
}this._resetButton()
},refresh:function(){var isDisabled=this.element.is(":disabled");
if(isDisabled!==this.options.disabled){this._setOption("disabled",isDisabled)
}if(this.type==="radio"){radioGroup(this.element[0]).each(function(){if($(this).is(":checked")){$(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true")
}else{$(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")
}})
}else{if(this.type==="checkbox"){if(this.element.is(":checked")){this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true")
}else{this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")
}}}},_resetButton:function(){if(this.type==="input"){if(this.options.label){this.element.val(this.options.label)
}return 
}var buttonElement=this.buttonElement.removeClass(typeClasses),buttonText=$("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),icons=this.options.icons,multipleIcons=icons.primary&&icons.secondary,buttonClasses=[];
if(icons.primary||icons.secondary){if(this.options.text){buttonClasses.push("ui-button-text-icon"+(multipleIcons?"s":(icons.primary?"-primary":"-secondary")))
}if(icons.primary){buttonElement.prepend("<span class='ui-button-icon-primary ui-icon "+icons.primary+"'></span>")
}if(icons.secondary){buttonElement.append("<span class='ui-button-icon-secondary ui-icon "+icons.secondary+"'></span>")
}if(!this.options.text){buttonClasses.push(multipleIcons?"ui-button-icons-only":"ui-button-icon-only");
if(!this.hasTitle){buttonElement.attr("title",buttonText)
}}}else{buttonClasses.push("ui-button-text-only")
}buttonElement.addClass(buttonClasses.join(" "))
}});
$.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")
},_init:function(){this.refresh()
},_setOption:function(key,value){if(key==="disabled"){this.buttons.button("option",key,value)
}$.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){var ltr=this.element.css("direction")==="ltr";
this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return $(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(ltr?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(ltr?"ui-corner-right":"ui-corner-left").end().end()
},destroy:function(){this.element.removeClass("ui-buttonset");
this.buttons.map(function(){return $(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
$.Widget.prototype.destroy.call(this)
}})
}(jQuery));
(function($,undefined){var uiDialogClasses="ui-dialog ui-widget ui-widget-content ui-corner-all ",sizeRelatedOptions={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},resizableRelatedOptions={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},attrFn=$.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};
$.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(pos){var topOffset=$(this).css(pos).offset().top;
if(topOffset<0){$(this).css("top",pos.top-topOffset)
}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var self=this,options=self.options,title=options.title||"&#160;",titleId=$.ui.dialog.getTitleId(self.element),uiDialog=(self.uiDialog=$("<div></div>")).appendTo(document.body).hide().addClass(uiDialogClasses+options.dialogClass).css({zIndex:options.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(event){if(options.closeOnEscape&&!event.isDefaultPrevented()&&event.keyCode&&event.keyCode===$.ui.keyCode.ESCAPE){self.close(event);
event.preventDefault()
}}).attr({role:"dialog","aria-labelledby":titleId}).mousedown(function(event){self.moveToTop(false,event)
}),uiDialogContent=self.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(uiDialog),uiDialogTitlebar=(self.uiDialogTitlebar=$("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(uiDialog),uiDialogTitlebarClose=$('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){uiDialogTitlebarClose.addClass("ui-state-hover")
},function(){uiDialogTitlebarClose.removeClass("ui-state-hover")
}).focus(function(){uiDialogTitlebarClose.addClass("ui-state-focus")
}).blur(function(){uiDialogTitlebarClose.removeClass("ui-state-focus")
}).click(function(event){self.close(event);
return false
}).appendTo(uiDialogTitlebar),uiDialogTitlebarCloseText=(self.uiDialogTitlebarCloseText=$("<span></span>")).addClass("ui-icon ui-icon-closethick").text(options.closeText).appendTo(uiDialogTitlebarClose),uiDialogTitle=$("<span></span>").addClass("ui-dialog-title").attr("id",titleId).html(title).prependTo(uiDialogTitlebar);
if($.isFunction(options.beforeclose)&&!$.isFunction(options.beforeClose)){options.beforeClose=options.beforeclose
}uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();
if(options.draggable&&$.fn.draggable){self._makeDraggable()
}if(options.resizable&&$.fn.resizable){self._makeResizable()
}self._createButtons(options.buttons);
self._isOpen=false;
if($.fn.bgiframe){uiDialog.bgiframe()
}},_init:function(){if(this.options.autoOpen){this.open()
}},destroy:function(){var self=this;
if(self.overlay){self.overlay.destroy()
}self.uiDialog.hide();
self.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
self.uiDialog.remove();
if(self.originalTitle){self.element.attr("title",self.originalTitle)
}return self
},widget:function(){return this.uiDialog
},close:function(event){var self=this,maxZ,thisZ;
if(false===self._trigger("beforeClose",event)){return 
}if(self.overlay){self.overlay.destroy()
}self.uiDialog.unbind("keypress.ui-dialog");
self._isOpen=false;
if(self.options.hide){self.uiDialog.hide(self.options.hide,function(){self._trigger("close",event)
})
}else{self.uiDialog.hide();
self._trigger("close",event)
}$.ui.dialog.overlay.resize();
if(self.options.modal){maxZ=0;
$(".ui-dialog").each(function(){if(this!==self.uiDialog[0]){thisZ=$(this).css("z-index");
if(!isNaN(thisZ)){maxZ=Math.max(maxZ,thisZ)
}}});
$.ui.dialog.maxZ=maxZ
}return self
},isOpen:function(){return this._isOpen
},moveToTop:function(force,event){var self=this,options=self.options,saveScroll;
if((options.modal&&!force)||(!options.stack&&!options.modal)){return self._trigger("focus",event)
}if(options.zIndex>$.ui.dialog.maxZ){$.ui.dialog.maxZ=options.zIndex
}if(self.overlay){$.ui.dialog.maxZ+=1;
self.overlay.$el.css("z-index",$.ui.dialog.overlay.maxZ=$.ui.dialog.maxZ)
}saveScroll={scrollTop:self.element.scrollTop(),scrollLeft:self.element.scrollLeft()};
$.ui.dialog.maxZ+=1;
self.uiDialog.css("z-index",$.ui.dialog.maxZ);
self.element.attr(saveScroll);
self._trigger("focus",event);
return self
},open:function(){if(this._isOpen){return 
}var self=this,options=self.options,uiDialog=self.uiDialog;
self.overlay=options.modal?new $.ui.dialog.overlay(self):null;
self._size();
self._position(options.position);
uiDialog.show(options.show);
self.moveToTop(true);
if(options.modal){uiDialog.bind("keypress.ui-dialog",function(event){if(event.keyCode!==$.ui.keyCode.TAB){return 
}var tabbables=$(":tabbable",this),first=tabbables.filter(":first"),last=tabbables.filter(":last");
if(event.target===last[0]&&!event.shiftKey){first.focus(1);
return false
}else{if(event.target===first[0]&&event.shiftKey){last.focus(1);
return false
}}})
}$(self.element.find(":tabbable").get().concat(uiDialog.find(".ui-dialog-buttonpane :tabbable").get().concat(uiDialog.get()))).eq(0).focus();
self._isOpen=true;
self._trigger("open");
return self
},_createButtons:function(buttons){var self=this,hasButtons=false,uiDialogButtonPane=$("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),uiButtonSet=$("<div></div>").addClass("ui-dialog-buttonset").appendTo(uiDialogButtonPane);
self.uiDialog.find(".ui-dialog-buttonpane").remove();
if(typeof buttons==="object"&&buttons!==null){$.each(buttons,function(){return !(hasButtons=true)
})
}if(hasButtons){$.each(buttons,function(name,props){props=$.isFunction(props)?{click:props,text:name}:props;
var button=$('<button type="button"></button>').click(function(){props.click.apply(self.element[0],arguments)
}).appendTo(uiButtonSet);
$.each(props,function(key,value){if(key==="click"){return 
}if(key in attrFn){button[key](value)
}else{button.attr(key,value)
}});
if($.fn.button){button.button()
}});
uiDialogButtonPane.appendTo(self.uiDialog)
}},_makeDraggable:function(){var self=this,options=self.options,doc=$(document),heightBeforeDrag;
function filteredUi(ui){return{position:ui.position,offset:ui.offset}
}self.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(event,ui){heightBeforeDrag=options.height==="auto"?"auto":$(this).height();
$(this).height($(this).height()).addClass("ui-dialog-dragging");
self._trigger("dragStart",event,filteredUi(ui))
},drag:function(event,ui){self._trigger("drag",event,filteredUi(ui))
},stop:function(event,ui){options.position=[ui.position.left-doc.scrollLeft(),ui.position.top-doc.scrollTop()];
$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
self._trigger("dragStop",event,filteredUi(ui));
$.ui.dialog.overlay.resize()
}})
},_makeResizable:function(handles){handles=(handles===undefined?this.options.resizable:handles);
var self=this,options=self.options,position=self.uiDialog.css("position"),resizeHandles=(typeof handles==="string"?handles:"n,e,s,w,se,sw,ne,nw");
function filteredUi(ui){return{originalPosition:ui.originalPosition,originalSize:ui.originalSize,position:ui.position,size:ui.size}
}self.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:self.element,maxWidth:options.maxWidth,maxHeight:options.maxHeight,minWidth:options.minWidth,minHeight:self._minHeight(),handles:resizeHandles,start:function(event,ui){$(this).addClass("ui-dialog-resizing");
self._trigger("resizeStart",event,filteredUi(ui))
},resize:function(event,ui){self._trigger("resize",event,filteredUi(ui))
},stop:function(event,ui){$(this).removeClass("ui-dialog-resizing");
options.height=$(this).height();
options.width=$(this).width();
self._trigger("resizeStop",event,filteredUi(ui));
$.ui.dialog.overlay.resize()
}}).css("position",position).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var options=this.options;
if(options.height==="auto"){return options.minHeight
}else{return Math.min(options.minHeight,options.height)
}},_position:function(position){var myAt=[],offset=[0,0],isVisible;
if(position){if(typeof position==="string"||(typeof position==="object"&&"0" in position)){myAt=position.split?position.split(" "):[position[0],position[1]];
if(myAt.length===1){myAt[1]=myAt[0]
}$.each(["left","top"],function(i,offsetPosition){if(+myAt[i]===myAt[i]){offset[i]=myAt[i];
myAt[i]=offsetPosition
}});
position={my:myAt.join(" "),at:myAt.join(" "),offset:offset.join(" ")}
}position=$.extend({},$.ui.dialog.prototype.options.position,position)
}else{position=$.ui.dialog.prototype.options.position
}isVisible=this.uiDialog.is(":visible");
if(!isVisible){this.uiDialog.show()
}this.uiDialog.css({top:0,left:0}).position($.extend({of:window},position));
if(!isVisible){this.uiDialog.hide()
}},_setOptions:function(options){var self=this,resizableOptions={},resize=false;
$.each(options,function(key,value){self._setOption(key,value);
if(key in sizeRelatedOptions){resize=true
}if(key in resizableRelatedOptions){resizableOptions[key]=value
}});
if(resize){this._size()
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option",resizableOptions)
}},_setOption:function(key,value){var self=this,uiDialog=self.uiDialog;
switch(key){case"beforeclose":key="beforeClose";
break;
case"buttons":self._createButtons(value);
break;
case"closeText":self.uiDialogTitlebarCloseText.text(""+value);
break;
case"dialogClass":uiDialog.removeClass(self.options.dialogClass).addClass(uiDialogClasses+value);
break;
case"disabled":if(value){uiDialog.addClass("ui-dialog-disabled")
}else{uiDialog.removeClass("ui-dialog-disabled")
}break;
case"draggable":var isDraggable=uiDialog.is(":data(draggable)");
if(isDraggable&&!value){uiDialog.draggable("destroy")
}if(!isDraggable&&value){self._makeDraggable()
}break;
case"position":self._position(value);
break;
case"resizable":var isResizable=uiDialog.is(":data(resizable)");
if(isResizable&&!value){uiDialog.resizable("destroy")
}if(isResizable&&typeof value==="string"){uiDialog.resizable("option","handles",value)
}if(!isResizable&&value!==false){self._makeResizable(value)
}break;
case"title":$(".ui-dialog-title",self.uiDialogTitlebar).html(""+(value||"&#160;"));
break
}$.Widget.prototype._setOption.apply(self,arguments)
},_size:function(){var options=this.options,nonContentHeight,minContentHeight,isVisible=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(options.minWidth>options.width){options.width=options.minWidth
}nonContentHeight=this.uiDialog.css({height:"auto",width:options.width}).height();
minContentHeight=Math.max(0,options.minHeight-nonContentHeight);
if(options.height==="auto"){if($.support.minHeight){this.element.css({minHeight:minContentHeight,height:"auto"})
}else{this.uiDialog.show();
var autoHeight=this.element.css("height","auto").height();
if(!isVisible){this.uiDialog.hide()
}this.element.height(Math.max(autoHeight,minContentHeight))
}}else{this.element.height(Math.max(options.height-nonContentHeight,0))
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}}});
$.extend($.ui.dialog,{version:"1.8.16",uuid:0,maxZ:0,getTitleId:function($el){var id=$el.attr("id");
if(!id){this.uuid+=1;
id=this.uuid
}return"ui-dialog-title-"+id
},overlay:function(dialog){this.$el=$.ui.dialog.overlay.create(dialog)
}});
$.extend($.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:$.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(event){return event+".dialog-overlay"
}).join(" "),create:function(dialog){if(this.instances.length===0){setTimeout(function(){if($.ui.dialog.overlay.instances.length){$(document).bind($.ui.dialog.overlay.events,function(event){if($(event.target).zIndex()<$.ui.dialog.overlay.maxZ){return false
}})
}},1);
$(document).bind("keydown.dialog-overlay",function(event){if(dialog.options.closeOnEscape&&!event.isDefaultPrevented()&&event.keyCode&&event.keyCode===$.ui.keyCode.ESCAPE){dialog.close(event);
event.preventDefault()
}});
$(window).bind("resize.dialog-overlay",$.ui.dialog.overlay.resize)
}var $el=(this.oldInstances.pop()||$("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
if($.fn.bgiframe){$el.bgiframe()
}this.instances.push($el);
return $el
},destroy:function($el){var indexOf=$.inArray($el,this.instances);
if(indexOf!=-1){this.oldInstances.push(this.instances.splice(indexOf,1)[0])
}if(this.instances.length===0){$([document,window]).unbind(".dialog-overlay")
}$el.remove();
var maxZ=0;
$.each(this.instances,function(){maxZ=Math.max(maxZ,this.css("z-index"))
});
this.maxZ=maxZ
},height:function(){var scrollHeight,offsetHeight;
if($.browser.msie&&$.browser.version<7){scrollHeight=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
offsetHeight=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(scrollHeight<offsetHeight){return $(window).height()+"px"
}else{return scrollHeight+"px"
}}else{return $(document).height()+"px"
}},width:function(){var scrollWidth,offsetWidth;
if($.browser.msie){scrollWidth=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
offsetWidth=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(scrollWidth<offsetWidth){return $(window).width()+"px"
}else{return scrollWidth+"px"
}}else{return $(document).width()+"px"
}},resize:function(){var $overlays=$([]);
$.each($.ui.dialog.overlay.instances,function(){$overlays=$overlays.add(this)
});
$overlays.css({width:0,height:0}).css({width:$.ui.dialog.overlay.width(),height:$.ui.dialog.overlay.height()})
}});
$.extend($.ui.dialog.overlay.prototype,{destroy:function(){$.ui.dialog.overlay.destroy(this.$el)
}})
}(jQuery));
(function($,undefined){var numPages=5;
$.widget("ui.slider",$.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var self=this,o=this.options,existingHandles=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),handle="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",handleCount=(o.values&&o.values.length)||1,handles=[];
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(o.disabled?" ui-slider-disabled ui-disabled":""));
this.range=$([]);
if(o.range){if(o.range===true){if(!o.values){o.values=[this._valueMin(),this._valueMin()]
}if(o.values.length&&o.values.length!==2){o.values=[o.values[0],o.values[0]]
}}this.range=$("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+((o.range==="min"||o.range==="max")?" ui-slider-range-"+o.range:""))
}for(var i=existingHandles.length;
i<handleCount;
i+=1){handles.push(handle)
}this.handles=existingHandles.add($(handles.join("")).appendTo(self.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(event){event.preventDefault()
}).hover(function(){if(!o.disabled){$(this).addClass("ui-state-hover")
}},function(){$(this).removeClass("ui-state-hover")
}).focus(function(){if(!o.disabled){$(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
$(this).addClass("ui-state-focus")
}else{$(this).blur()
}}).blur(function(){$(this).removeClass("ui-state-focus")
});
this.handles.each(function(i){$(this).data("index.ui-slider-handle",i)
});
this.handles.keydown(function(event){var ret=true,index=$(this).data("index.ui-slider-handle"),allowed,curVal,newVal,step;
if(self.options.disabled){return 
}switch(event.keyCode){case $.ui.keyCode.HOME:case $.ui.keyCode.END:case $.ui.keyCode.PAGE_UP:case $.ui.keyCode.PAGE_DOWN:case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:ret=false;
if(!self._keySliding){self._keySliding=true;
$(this).addClass("ui-state-active");
allowed=self._start(event,index);
if(allowed===false){return 
}}break
}step=self.options.step;
if(self.options.values&&self.options.values.length){curVal=newVal=self.values(index)
}else{curVal=newVal=self.value()
}switch(event.keyCode){case $.ui.keyCode.HOME:newVal=self._valueMin();
break;
case $.ui.keyCode.END:newVal=self._valueMax();
break;
case $.ui.keyCode.PAGE_UP:newVal=self._trimAlignValue(curVal+((self._valueMax()-self._valueMin())/numPages));
break;
case $.ui.keyCode.PAGE_DOWN:newVal=self._trimAlignValue(curVal-((self._valueMax()-self._valueMin())/numPages));
break;
case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:if(curVal===self._valueMax()){return 
}newVal=self._trimAlignValue(curVal+step);
break;
case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:if(curVal===self._valueMin()){return 
}newVal=self._trimAlignValue(curVal-step);
break
}self._slide(event,index,newVal);
return ret
}).keyup(function(event){var index=$(this).data("index.ui-slider-handle");
if(self._keySliding){self._keySliding=false;
self._stop(event,index);
self._change(event,index);
$(this).removeClass("ui-state-active")
}});
this._refreshValue();
this._animateOff=false
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this
},_mouseCapture:function(event){var o=this.options,position,normValue,distance,closestHandle,self,index,allowed,offset,mouseOverHandle;
if(o.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
position={x:event.pageX,y:event.pageY};
normValue=this._normValueFromMouse(position);
distance=this._valueMax()-this._valueMin()+1;
self=this;
this.handles.each(function(i){var thisDistance=Math.abs(normValue-self.values(i));
if(distance>thisDistance){distance=thisDistance;
closestHandle=$(this);
index=i
}});
if(o.range===true&&this.values(1)===o.min){index+=1;
closestHandle=$(this.handles[index])
}allowed=this._start(event,index);
if(allowed===false){return false
}this._mouseSliding=true;
self._handleIndex=index;
closestHandle.addClass("ui-state-active").focus();
offset=closestHandle.offset();
mouseOverHandle=!$(event.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=mouseOverHandle?{left:0,top:0}:{left:event.pageX-offset.left-(closestHandle.width()/2),top:event.pageY-offset.top-(closestHandle.height()/2)-(parseInt(closestHandle.css("borderTopWidth"),10)||0)-(parseInt(closestHandle.css("borderBottomWidth"),10)||0)+(parseInt(closestHandle.css("marginTop"),10)||0)};
if(!this.handles.hasClass("ui-state-hover")){this._slide(event,index,normValue)
}this._animateOff=true;
return true
},_mouseStart:function(event){return true
},_mouseDrag:function(event){var position={x:event.pageX,y:event.pageY},normValue=this._normValueFromMouse(position);
this._slide(event,this._handleIndex,normValue);
return false
},_mouseStop:function(event){this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(event,this._handleIndex);
this._change(event,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false
},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"
},_normValueFromMouse:function(position){var pixelTotal,pixelMouse,percentMouse,valueTotal,valueMouse;
if(this.orientation==="horizontal"){pixelTotal=this.elementSize.width;
pixelMouse=position.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{pixelTotal=this.elementSize.height;
pixelMouse=position.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}percentMouse=(pixelMouse/pixelTotal);
if(percentMouse>1){percentMouse=1
}if(percentMouse<0){percentMouse=0
}if(this.orientation==="vertical"){percentMouse=1-percentMouse
}valueTotal=this._valueMax()-this._valueMin();
valueMouse=this._valueMin()+percentMouse*valueTotal;
return this._trimAlignValue(valueMouse)
},_start:function(event,index){var uiHash={handle:this.handles[index],value:this.value()};
if(this.options.values&&this.options.values.length){uiHash.value=this.values(index);
uiHash.values=this.values()
}return this._trigger("start",event,uiHash)
},_slide:function(event,index,newVal){var otherVal,newValues,allowed;
if(this.options.values&&this.options.values.length){otherVal=this.values(index?0:1);
if((this.options.values.length===2&&this.options.range===true)&&((index===0&&newVal>otherVal)||(index===1&&newVal<otherVal))){newVal=otherVal
}if(newVal!==this.values(index)){newValues=this.values();
newValues[index]=newVal;
allowed=this._trigger("slide",event,{handle:this.handles[index],value:newVal,values:newValues});
otherVal=this.values(index?0:1);
if(allowed!==false){this.values(index,newVal,true)
}}}else{if(newVal!==this.value()){allowed=this._trigger("slide",event,{handle:this.handles[index],value:newVal});
if(allowed!==false){this.value(newVal)
}}}},_stop:function(event,index){var uiHash={handle:this.handles[index],value:this.value()};
if(this.options.values&&this.options.values.length){uiHash.value=this.values(index);
uiHash.values=this.values()
}this._trigger("stop",event,uiHash)
},_change:function(event,index){if(!this._keySliding&&!this._mouseSliding){var uiHash={handle:this.handles[index],value:this.value()};
if(this.options.values&&this.options.values.length){uiHash.value=this.values(index);
uiHash.values=this.values()
}this._trigger("change",event,uiHash)
}},value:function(newValue){if(arguments.length){this.options.value=this._trimAlignValue(newValue);
this._refreshValue();
this._change(null,0);
return 
}return this._value()
},values:function(index,newValue){var vals,newValues,i;
if(arguments.length>1){this.options.values[index]=this._trimAlignValue(newValue);
this._refreshValue();
this._change(null,index);
return 
}if(arguments.length){if($.isArray(arguments[0])){vals=this.options.values;
newValues=arguments[0];
for(i=0;
i<vals.length;
i+=1){vals[i]=this._trimAlignValue(newValues[i]);
this._change(null,i)
}this._refreshValue()
}else{if(this.options.values&&this.options.values.length){return this._values(index)
}else{return this.value()
}}}else{return this._values()
}},_setOption:function(key,value){var i,valsLength=0;
if($.isArray(this.options.values)){valsLength=this.options.values.length
}$.Widget.prototype._setOption.apply(this,arguments);
switch(key){case"disabled":if(value){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.propAttr("disabled",true);
this.element.addClass("ui-disabled")
}else{this.handles.propAttr("disabled",false);
this.element.removeClass("ui-disabled")
}break;
case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case"value":this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case"values":this._animateOff=true;
this._refreshValue();
for(i=0;
i<valsLength;
i+=1){this._change(null,i)
}this._animateOff=false;
break
}},_value:function(){var val=this.options.value;
val=this._trimAlignValue(val);
return val
},_values:function(index){var val,vals,i;
if(arguments.length){val=this.options.values[index];
val=this._trimAlignValue(val);
return val
}else{vals=this.options.values.slice();
for(i=0;
i<vals.length;
i+=1){vals[i]=this._trimAlignValue(vals[i])
}return vals
}},_trimAlignValue:function(val){if(val<=this._valueMin()){return this._valueMin()
}if(val>=this._valueMax()){return this._valueMax()
}var step=(this.options.step>0)?this.options.step:1,valModStep=(val-this._valueMin())%step,alignValue=val-valModStep;
if(Math.abs(valModStep)*2>=step){alignValue+=(valModStep>0)?step:(-step)
}return parseFloat(alignValue.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var oRange=this.options.range,o=this.options,self=this,animate=(!this._animateOff)?o.animate:false,valPercent,_set={},lastValPercent,value,valueMin,valueMax;
if(this.options.values&&this.options.values.length){this.handles.each(function(i,j){valPercent=(self.values(i)-self._valueMin())/(self._valueMax()-self._valueMin())*100;
_set[self.orientation==="horizontal"?"left":"bottom"]=valPercent+"%";
$(this).stop(1,1)[animate?"animate":"css"](_set,o.animate);
if(self.options.range===true){if(self.orientation==="horizontal"){if(i===0){self.range.stop(1,1)[animate?"animate":"css"]({left:valPercent+"%"},o.animate)
}if(i===1){self.range[animate?"animate":"css"]({width:(valPercent-lastValPercent)+"%"},{queue:false,duration:o.animate})
}}else{if(i===0){self.range.stop(1,1)[animate?"animate":"css"]({bottom:(valPercent)+"%"},o.animate)
}if(i===1){self.range[animate?"animate":"css"]({height:(valPercent-lastValPercent)+"%"},{queue:false,duration:o.animate})
}}}lastValPercent=valPercent
})
}else{value=this.value();
valueMin=this._valueMin();
valueMax=this._valueMax();
valPercent=(valueMax!==valueMin)?(value-valueMin)/(valueMax-valueMin)*100:0;
_set[self.orientation==="horizontal"?"left":"bottom"]=valPercent+"%";
this.handle.stop(1,1)[animate?"animate":"css"](_set,o.animate);
if(oRange==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[animate?"animate":"css"]({width:valPercent+"%"},o.animate)
}if(oRange==="max"&&this.orientation==="horizontal"){this.range[animate?"animate":"css"]({width:(100-valPercent)+"%"},{queue:false,duration:o.animate})
}if(oRange==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[animate?"animate":"css"]({height:valPercent+"%"},o.animate)
}if(oRange==="max"&&this.orientation==="vertical"){this.range[animate?"animate":"css"]({height:(100-valPercent)+"%"},{queue:false,duration:o.animate})
}}}});
$.extend($.ui.slider,{version:"1.8.16"})
}(jQuery));
(function($,undefined){var tabId=0,listId=0;
function getNextTabId(){return ++tabId
}function getNextListId(){return ++listId
}$.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)
},_setOption:function(key,value){if(key=="selected"){if(this.options.collapsible&&value==this.options.selected){return 
}this.select(value)
}else{this.options[key]=value;
this._tabify()
}},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+getNextTabId()
},_sanitizeSelector:function(hash){return hash.replace(/:/g,"\\:")
},_cookie:function(){var cookie=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+getNextListId());
return $.cookie.apply(null,[cookie].concat($.makeArray(arguments)))
},_ui:function(tab,panel){return{tab:tab,panel:panel,index:this.anchors.index(tab)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var el=$(this);
el.html(el.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(init){var self=this,o=this.options,fragmentId=/^#.+/;
this.list=this.element.find("ol,ul").eq(0);
this.lis=$(" > li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return $("a",this)[0]
});
this.panels=$([]);
this.anchors.each(function(i,a){var href=$(a).attr("href");
var hrefBase=href.split("#")[0],baseEl;
if(hrefBase&&(hrefBase===location.toString().split("#")[0]||(baseEl=$("base")[0])&&hrefBase===baseEl.href)){href=a.hash;
a.href=href
}if(fragmentId.test(href)){self.panels=self.panels.add(self.element.find(self._sanitizeSelector(href)))
}else{if(href&&href!=="#"){$.data(a,"href.tabs",href);
$.data(a,"load.tabs",href.replace(/#.*$/,""));
var id=self._tabId(a);
a.href="#"+id;
var $panel=self.element.find("#"+id);
if(!$panel.length){$panel=$(o.panelTemplate).attr("id",id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(self.panels[i-1]||self.list);
$panel.data("destroy.tabs",true)
}self.panels=self.panels.add($panel)
}else{o.disabled.push(i)
}}});
if(init){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(o.selected===undefined){if(location.hash){this.anchors.each(function(i,a){if(a.hash==location.hash){o.selected=i;
return false
}})
}if(typeof o.selected!=="number"&&o.cookie){o.selected=parseInt(self._cookie(),10)
}if(typeof o.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length){o.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}o.selected=o.selected||(this.lis.length?0:-1)
}else{if(o.selected===null){o.selected=-1
}}o.selected=((o.selected>=0&&this.anchors[o.selected])||o.selected<0)?o.selected:0;
o.disabled=$.unique(o.disabled.concat($.map(this.lis.filter(".ui-state-disabled"),function(n,i){return self.lis.index(n)
}))).sort();
if($.inArray(o.selected,o.disabled)!=-1){o.disabled.splice($.inArray(o.selected,o.disabled),1)
}this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(o.selected>=0&&this.anchors.length){self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash)).removeClass("ui-tabs-hide");
this.lis.eq(o.selected).addClass("ui-tabs-selected ui-state-active");
self.element.queue("tabs",function(){self._trigger("show",null,self._ui(self.anchors[o.selected],self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash))[0]))
});
this.load(o.selected)
}$(window).bind("unload",function(){self.lis.add(self.anchors).unbind(".tabs");
self.lis=self.anchors=self.panels=null
})
}else{o.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[o.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
if(o.cookie){this._cookie(o.selected,o.cookie)
}for(var i=0,li;
(li=this.lis[i]);
i++){$(li)[$.inArray(i,o.disabled)!=-1&&!$(li).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(o.cache===false){this.anchors.removeData("cache.tabs")
}this.lis.add(this.anchors).unbind(".tabs");
if(o.event!=="mouseover"){var addState=function(state,el){if(el.is(":not(.ui-state-disabled)")){el.addClass("ui-state-"+state)
}};
var removeState=function(state,el){el.removeClass("ui-state-"+state)
};
this.lis.bind("mouseover.tabs",function(){addState("hover",$(this))
});
this.lis.bind("mouseout.tabs",function(){removeState("hover",$(this))
});
this.anchors.bind("focus.tabs",function(){addState("focus",$(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){removeState("focus",$(this).closest("li"))
})
}var hideFx,showFx;
if(o.fx){if($.isArray(o.fx)){hideFx=o.fx[0];
showFx=o.fx[1]
}else{hideFx=showFx=o.fx
}}function resetStyle($el,fx){$el.css("display","");
if(!$.support.opacity&&fx.opacity){$el[0].style.removeAttribute("filter")
}}var showTab=showFx?function(clicked,$show){$(clicked).closest("li").addClass("ui-tabs-selected ui-state-active");
$show.hide().removeClass("ui-tabs-hide").animate(showFx,showFx.duration||"normal",function(){resetStyle($show,showFx);
self._trigger("show",null,self._ui(clicked,$show[0]))
})
}:function(clicked,$show){$(clicked).closest("li").addClass("ui-tabs-selected ui-state-active");
$show.removeClass("ui-tabs-hide");
self._trigger("show",null,self._ui(clicked,$show[0]))
};
var hideTab=hideFx?function(clicked,$hide){$hide.animate(hideFx,hideFx.duration||"normal",function(){self.lis.removeClass("ui-tabs-selected ui-state-active");
$hide.addClass("ui-tabs-hide");
resetStyle($hide,hideFx);
self.element.dequeue("tabs")
})
}:function(clicked,$hide,$show){self.lis.removeClass("ui-tabs-selected ui-state-active");
$hide.addClass("ui-tabs-hide");
self.element.dequeue("tabs")
};
this.anchors.bind(o.event+".tabs",function(){var el=this,$li=$(el).closest("li"),$hide=self.panels.filter(":not(.ui-tabs-hide)"),$show=self.element.find(self._sanitizeSelector(el.hash));
if(($li.hasClass("ui-tabs-selected")&&!o.collapsible)||$li.hasClass("ui-state-disabled")||$li.hasClass("ui-state-processing")||self.panels.filter(":animated").length||self._trigger("select",null,self._ui(this,$show[0]))===false){this.blur();
return false
}o.selected=self.anchors.index(this);
self.abort();
if(o.collapsible){if($li.hasClass("ui-tabs-selected")){o.selected=-1;
if(o.cookie){self._cookie(o.selected,o.cookie)
}self.element.queue("tabs",function(){hideTab(el,$hide)
}).dequeue("tabs");
this.blur();
return false
}else{if(!$hide.length){if(o.cookie){self._cookie(o.selected,o.cookie)
}self.element.queue("tabs",function(){showTab(el,$show)
});
self.load(self.anchors.index(this));
this.blur();
return false
}}}if(o.cookie){self._cookie(o.selected,o.cookie)
}if($show.length){if($hide.length){self.element.queue("tabs",function(){hideTab(el,$hide)
})
}self.element.queue("tabs",function(){showTab(el,$show)
});
self.load(self.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if($.browser.msie){this.blur()
}});
this.anchors.bind("click.tabs",function(){return false
})
},_getIndex:function(index){if(typeof index=="string"){index=this.anchors.index(this.anchors.filter("[href$="+index+"]"))
}return index
},destroy:function(){var o=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var href=$.data(this,"href.tabs");
if(href){this.href=href
}var $this=$(this).unbind(".tabs");
$.each(["href","load","cache"],function(i,prefix){$this.removeData(prefix+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){if($.data(this,"destroy.tabs")){$(this).remove()
}else{$(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}});
if(o.cookie){this._cookie(null,o.cookie)
}return this
},add:function(url,label,index){if(index===undefined){index=this.anchors.length
}var self=this,o=this.options,$li=$(o.tabTemplate.replace(/#\{href\}/g,url).replace(/#\{label\}/g,label)),id=!url.indexOf("#")?url.replace("#",""):this._tabId($("a",$li)[0]);
$li.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var $panel=self.element.find("#"+id);
if(!$panel.length){$panel=$(o.panelTemplate).attr("id",id).data("destroy.tabs",true)
}$panel.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(index>=this.lis.length){$li.appendTo(this.list);
$panel.appendTo(this.list[0].parentNode)
}else{$li.insertBefore(this.lis[index]);
$panel.insertBefore(this.panels[index])
}o.disabled=$.map(o.disabled,function(n,i){return n>=index?++n:n
});
this._tabify();
if(this.anchors.length==1){o.selected=0;
$li.addClass("ui-tabs-selected ui-state-active");
$panel.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){self._trigger("show",null,self._ui(self.anchors[0],self.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[index],this.panels[index]));
return this
},remove:function(index){index=this._getIndex(index);
var o=this.options,$li=this.lis.eq(index).remove(),$panel=this.panels.eq(index).remove();
if($li.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(index+(index+1<this.anchors.length?1:-1))
}o.disabled=$.map($.grep(o.disabled,function(n,i){return n!=index
}),function(n,i){return n>=index?--n:n
});
this._tabify();
this._trigger("remove",null,this._ui($li.find("a")[0],$panel[0]));
return this
},enable:function(index){index=this._getIndex(index);
var o=this.options;
if($.inArray(index,o.disabled)==-1){return 
}this.lis.eq(index).removeClass("ui-state-disabled");
o.disabled=$.grep(o.disabled,function(n,i){return n!=index
});
this._trigger("enable",null,this._ui(this.anchors[index],this.panels[index]));
return this
},disable:function(index){index=this._getIndex(index);
var self=this,o=this.options;
if(index!=o.selected){this.lis.eq(index).addClass("ui-state-disabled");
o.disabled.push(index);
o.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[index],this.panels[index]))
}return this
},select:function(index){index=this._getIndex(index);
if(index==-1){if(this.options.collapsible&&this.options.selected!=-1){index=this.options.selected
}else{return this
}}this.anchors.eq(index).trigger(this.options.event+".tabs");
return this
},load:function(index){index=this._getIndex(index);
var self=this,o=this.options,a=this.anchors.eq(index)[0],url=$.data(a,"load.tabs");
this.abort();
if(!url||this.element.queue("tabs").length!==0&&$.data(a,"cache.tabs")){this.element.dequeue("tabs");
return 
}this.lis.eq(index).addClass("ui-state-processing");
if(o.spinner){var span=$("span",a);
span.data("label.tabs",span.html()).html(o.spinner)
}this.xhr=$.ajax($.extend({},o.ajaxOptions,{url:url,success:function(r,s){self.element.find(self._sanitizeSelector(a.hash)).html(r);
self._cleanup();
if(o.cache){$.data(a,"cache.tabs",true)
}self._trigger("load",null,self._ui(self.anchors[index],self.panels[index]));
try{o.ajaxOptions.success(r,s)
}catch(e){}},error:function(xhr,s,e){self._cleanup();
self._trigger("load",null,self._ui(self.anchors[index],self.panels[index]));
try{o.ajaxOptions.error(xhr,s,index,a)
}catch(e){}}}));
self.element.dequeue("tabs");
return this
},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup();
return this
},url:function(index,url){this.anchors.eq(index).removeData("cache.tabs").data("load.tabs",url);
return this
},length:function(){return this.anchors.length
}});
$.extend($.ui.tabs,{version:"1.8.16"});
$.extend($.ui.tabs.prototype,{rotation:null,rotate:function(ms,continuing){var self=this,o=this.options;
var rotate=self._rotate||(self._rotate=function(e){clearTimeout(self.rotation);
self.rotation=setTimeout(function(){var t=o.selected;
self.select(++t<self.anchors.length?t:0)
},ms);
if(e){e.stopPropagation()
}});
var stop=self._unrotate||(self._unrotate=!continuing?function(e){if(e.clientX){self.rotate(null)
}}:function(e){t=o.selected;
rotate()
});
if(ms){this.element.bind("tabsshow",rotate);
this.anchors.bind(o.event+".tabs",stop);
rotate()
}else{clearTimeout(self.rotation);
this.element.unbind("tabsshow",rotate);
this.anchors.unbind(o.event+".tabs",stop);
delete this._rotate;
delete this._unrotate
}return this
}})
})(jQuery);
(function($,undefined){$.extend($.ui,{datepicker:{version:"1.8.16"}});
var PROP_NAME="datepicker";
var dpuuid=new Date().getTime();
var instActive;
function Datepicker(){this.debug=false;
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._datepickerShowing=false;
this._inDialog=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};
$.extend(this._defaults,this.regional[""]);
this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){if(this.debug){console.log.apply("",arguments)
}},_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(settings){extendRemove(this._defaults,settings||{});
return this
},_attachDatepicker:function(target,settings){var inlineSettings=null;
for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);
if(attrValue){inlineSettings=inlineSettings||{};
try{inlineSettings[attrName]=eval(attrValue)
}catch(err){inlineSettings[attrName]=attrValue
}}}var nodeName=target.nodeName.toLowerCase();
var inline=(nodeName=="div"||nodeName=="span");
if(!target.id){this.uuid+=1;
target.id="dp"+this.uuid
}var inst=this._newInst($(target),inline);
inst.settings=$.extend({},settings||{},inlineSettings||{});
if(nodeName=="input"){this._connectDatepicker(target,inst)
}else{if(inline){this._inlineDatepicker(target,inst)
}}},_newInst:function(target,inline){var id=target[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");
return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))}
},_connectDatepicker:function(target,inst){var input=$(target);
inst.append=$([]);
inst.trigger=$([]);
if(input.hasClass(this.markerClassName)){return 
}this._attachments(input,inst);
input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
this._autoSize(inst);
$.data(target,PROP_NAME,inst);
if(inst.settings.disabled){this._disableDatepicker(target)
}},_attachments:function(input,inst){var appendText=this._get(inst,"appendText");
var isRTL=this._get(inst,"isRTL");
if(inst.append){inst.append.remove()
}if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");
input[isRTL?"before":"after"](inst.append)
}input.unbind("focus",this._showDatepicker);
if(inst.trigger){inst.trigger.remove()
}var showOn=this._get(inst,"showOn");
if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)
}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");
var buttonImage=this._get(inst,"buttonImage");
inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));
input[isRTL?"before":"after"](inst.trigger);
inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==input[0]){$.datepicker._hideDatepicker()
}else{$.datepicker._showDatepicker(input[0])
}return false
})
}},_autoSize:function(inst){if(this._get(inst,"autoSize")&&!inst.inline){var date=new Date(2009,12-1,20);
var dateFormat=this._get(inst,"dateFormat");
if(dateFormat.match(/[DM]/)){var findMax=function(names){var max=0;
var maxI=0;
for(var i=0;
i<names.length;
i++){if(names[i].length>max){max=names[i].length;
maxI=i
}}return maxI
};
date.setMonth(findMax(this._get(inst,(dateFormat.match(/MM/)?"monthNames":"monthNamesShort"))));
date.setDate(findMax(this._get(inst,(dateFormat.match(/DD/)?"dayNames":"dayNamesShort")))+20-date.getDay())
}inst.input.attr("size",this._formatDate(inst,date).length)
}},_inlineDatepicker:function(target,inst){var divSpan=$(target);
if(divSpan.hasClass(this.markerClassName)){return 
}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
$.data(target,PROP_NAME,inst);
this._setDate(inst,this._getDefaultDate(inst),true);
this._updateDatepicker(inst);
this._updateAlternate(inst);
if(inst.settings.disabled){this._disableDatepicker(target)
}inst.dpDiv.css("display","block")
},_dialogDatepicker:function(input,date,onSelect,settings,pos){var inst=this._dialogInst;
if(!inst){this.uuid+=1;
var id="dp"+this.uuid;
this._dialogInput=$('<input type="text" id="'+id+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
this._dialogInput.keydown(this._doKeyDown);
$("body").append(this._dialogInput);
inst=this._dialogInst=this._newInst(this._dialogInput,false);
inst.settings={};
$.data(this._dialogInput[0],PROP_NAME,inst)
}extendRemove(inst.settings,settings||{});
date=(date&&date.constructor==Date?this._formatDate(inst,date):date);
this._dialogInput.val(date);
this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);
if(!this._pos){var browserWidth=document.documentElement.clientWidth;
var browserHeight=document.documentElement.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;
var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]
}this._dialogInput.css("left",(this._pos[0]+20)+"px").css("top",this._pos[1]+"px");
inst.settings.onSelect=onSelect;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);
if($.blockUI){$.blockUI(this.dpDiv)
}$.data(this._dialogInput[0],PROP_NAME,inst);
return this
},_destroyDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
$.removeData(target,PROP_NAME);
if(nodeName=="input"){inst.append.remove();
inst.trigger.remove();
$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)
}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()
}}},_enableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=false;
inst.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().removeClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
})
},_disableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=true;
inst.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().addClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
});
this._disabledInputs[this._disabledInputs.length]=target
},_isDisabledDatepicker:function(target){if(!target){return false
}for(var i=0;
i<this._disabledInputs.length;
i++){if(this._disabledInputs[i]==target){return true
}}return false
},_getInst:function(target){try{return $.data(target,PROP_NAME)
}catch(err){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);
if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))
}var settings=name||{};
if(typeof name=="string"){settings={};
settings[name]=value
}if(inst){if(this._curInst==inst){this._hideDatepicker()
}var date=this._getDateDatepicker(target,true);
var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
extendRemove(inst.settings,settings);
if(minDate!==null&&settings.dateFormat!==undefined&&settings.minDate===undefined){inst.settings.minDate=this._formatDate(inst,minDate)
}if(maxDate!==null&&settings.dateFormat!==undefined&&settings.maxDate===undefined){inst.settings.maxDate=this._formatDate(inst,maxDate)
}this._attachments($(target),inst);
this._autoSize(inst);
this._setDate(inst,date);
this._updateAlternate(inst);
this._updateDatepicker(inst)
}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)
},_refreshDatepicker:function(target){var inst=this._getInst(target);
if(inst){this._updateDatepicker(inst)
}},_setDateDatepicker:function(target,date){var inst=this._getInst(target);
if(inst){this._setDate(inst,date);
this._updateDatepicker(inst);
this._updateAlternate(inst)
}},_getDateDatepicker:function(target,noDefault){var inst=this._getInst(target);
if(inst&&!inst.inline){this._setDateFromField(inst,noDefault)
}return(inst?this._getDate(inst):null)
},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);
var handled=true;
var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");
inst._keyEvent=true;
if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker();
handled=false;
break;
case 13:var sel=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",inst.dpDiv);
if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])
}var onSelect=$.datepicker._get(inst,"onSelect");
if(onSelect){var dateStr=$.datepicker._formatDate(inst);
onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{$.datepicker._hideDatepicker()
}return false;
break;
case 27:$.datepicker._hideDatepicker();
break;
case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");
break;
case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");
break;
case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
default:handled=false
}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)
}else{handled=false
}}if(handled){event.preventDefault();
event.stopPropagation()
}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);
if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));
var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);
return event.ctrlKey||event.metaKey||(chr<" "||!chars||chars.indexOf(chr)>-1)
}},_doKeyUp:function(event){var inst=$.datepicker._getInst(event.target);
if(inst.input.val()!=inst.lastVal){try{var date=$.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),(inst.input?inst.input.val():null),$.datepicker._getFormatConfig(inst));
if(date){$.datepicker._setDateFromField(inst);
$.datepicker._updateAlternate(inst);
$.datepicker._updateDatepicker(inst)
}}catch(event){$.datepicker.log(event)
}}return true
},_showDatepicker:function(input){input=input.target||input;
if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]
}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return 
}var inst=$.datepicker._getInst(input);
if($.datepicker._curInst&&$.datepicker._curInst!=inst){if($.datepicker._datepickerShowing){$.datepicker._triggerOnClose($.datepicker._curInst)
}$.datepicker._curInst.dpDiv.stop(true,true)
}var beforeShow=$.datepicker._get(inst,"beforeShow");
var beforeShowSettings=beforeShow?beforeShow.apply(input,[input,inst]):{};
if(beforeShowSettings===false){return 
}extendRemove(inst.settings,beforeShowSettings);
inst.lastVal=null;
$.datepicker._lastInput=input;
$.datepicker._setDateFromField(inst);
if($.datepicker._inDialog){input.value=""
}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);
$.datepicker._pos[1]+=input.offsetHeight
}var isFixed=false;
$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";
return !isFixed
});
if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;
$.datepicker._pos[1]-=document.documentElement.scrollTop
}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
$.datepicker._pos=null;
inst.dpDiv.empty();
inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
$.datepicker._updateDatepicker(inst);
offset=$.datepicker._checkOffset(inst,offset,isFixed);
inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});
if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim");
var duration=$.datepicker._get(inst,"duration");
var postProcess=function(){var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");
if(!!cover.length){var borders=$.datepicker._getBorders(inst.dpDiv);
cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}};
inst.dpDiv.zIndex($(input).zIndex()+1);
$.datepicker._datepickerShowing=true;
if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[showAnim||"show"]((showAnim?duration:null),postProcess)
}if(!showAnim||!duration){postProcess()
}if(inst.input.is(":visible")&&!inst.input.is(":disabled")){inst.input.focus()
}$.datepicker._curInst=inst
}},_updateDatepicker:function(inst){var self=this;
self.maxRows=4;
var borders=$.datepicker._getBorders(inst.dpDiv);
instActive=inst;
inst.dpDiv.empty().append(this._generateHTML(inst));
var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");
if(!!cover.length){cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}inst.dpDiv.find("."+this._dayOverClass+" a").mouseover();
var numMonths=this._getNumberOfMonths(inst);
var cols=numMonths[1];
var width=17;
inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")
}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
if(inst==$.datepicker._curInst&&$.datepicker._datepickerShowing&&inst.input&&inst.input.is(":visible")&&!inst.input.is(":disabled")&&inst.input[0]!=document.activeElement){inst.input.focus()
}if(inst.yearshtml){var origyearshtml=inst.yearshtml;
setTimeout(function(){if(origyearshtml===inst.yearshtml&&inst.yearshtml){inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
}origyearshtml=inst.yearshtml=null
},0)
}},_getBorders:function(elem){var convert=function(value){return{thin:1,medium:2,thick:3}[value]||value
};
return[parseFloat(convert(elem.css("border-left-width"))),parseFloat(convert(elem.css("border-top-width")))]
},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();
var dpHeight=inst.dpDiv.outerHeight();
var inputWidth=inst.input?inst.input.outerWidth():0;
var inputHeight=inst.input?inst.input.outerHeight():0;
var viewWidth=document.documentElement.clientWidth+$(document).scrollLeft();
var viewHeight=document.documentElement.clientHeight+$(document).scrollTop();
offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);
offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;
offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;
offset.left-=Math.min(offset.left,(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0);
offset.top-=Math.min(offset.top,(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(dpHeight+inputHeight):0);
return offset
},_findPos:function(obj){var inst=this._getInst(obj);
var isRTL=this._get(inst,"isRTL");
while(obj&&(obj.type=="hidden"||obj.nodeType!=1||$.expr.filters.hidden(obj))){obj=obj[isRTL?"previousSibling":"nextSibling"]
}var position=$(obj).offset();
return[position.left,position.top]
},_triggerOnClose:function(inst){var onClose=this._get(inst,"onClose");
if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])
}},_hideDatepicker:function(input){var inst=this._curInst;
if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return 
}if(this._datepickerShowing){var showAnim=this._get(inst,"showAnim");
var duration=this._get(inst,"duration");
var postProcess=function(){$.datepicker._tidyDialog(inst);
this._curInst=null
};
if($.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide"))]((showAnim?duration:null),postProcess)
}if(!showAnim){postProcess()
}$.datepicker._triggerOnClose(inst);
this._datepickerShowing=false;
this._lastInput=null;
if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if($.blockUI){$.unblockUI();
$("body").append(this.dpDiv)
}}this._inDialog=false
}},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(event){if(!$.datepicker._curInst){return 
}var $target=$(event.target);
if($target[0].id!=$.datepicker._mainDivId&&$target.parents("#"+$.datepicker._mainDivId).length==0&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker()
}},_adjustDate:function(id,offset,period){var target=$(id);
var inst=this._getInst(target[0]);
if(this._isDisabledDatepicker(target[0])){return 
}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);
this._updateDatepicker(inst)
},_gotoToday:function(id){var target=$(id);
var inst=this._getInst(target[0]);
if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;
inst.drawMonth=inst.selectedMonth=inst.currentMonth;
inst.drawYear=inst.selectedYear=inst.currentYear
}else{var date=new Date();
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear()
}this._notifyChange(inst);
this._adjustDate(target)
},_selectMonthYear:function(id,select,period){var target=$(id);
var inst=this._getInst(target[0]);
inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);
this._notifyChange(inst);
this._adjustDate(target)
},_selectDay:function(id,month,year,td){var target=$(id);
if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return 
}var inst=this._getInst(target[0]);
inst.selectedDay=inst.currentDay=$("a",td).html();
inst.selectedMonth=inst.currentMonth=month;
inst.selectedYear=inst.currentYear=year;
this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))
},_clearDate:function(id){var target=$(id);
var inst=this._getInst(target[0]);
this._selectDate(target,"")
},_selectDate:function(id,dateStr){var target=$(id);
var inst=this._getInst(target[0]);
dateStr=(dateStr!=null?dateStr:this._formatDate(inst));
if(inst.input){inst.input.val(dateStr)
}this._updateAlternate(inst);
var onSelect=this._get(inst,"onSelect");
if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{if(inst.input){inst.input.trigger("change")
}}if(inst.inline){this._updateDatepicker(inst)
}else{this._hideDatepicker();
this._lastInput=inst.input[0];
if(typeof (inst.input[0])!="object"){inst.input.focus()
}this._lastInput=null
}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");
if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");
var date=this._getDate(inst);
var dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));
$(altField).each(function(){$(this).val(dateStr)
})
}},noWeekends:function(date){var day=date.getDay();
return[(day>0&&day<6),""]
},iso8601Week:function(date){var checkDate=new Date(date.getTime());
checkDate.setDate(checkDate.getDate()+4-(checkDate.getDay()||7));
var time=checkDate.getTime();
checkDate.setMonth(0);
checkDate.setDate(1);
return Math.floor(Math.round((time-checkDate)/86400000)/7)+1
},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"
}value=(typeof value=="object"?value.toString():value+"");
if(value==""){return null
}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var year=-1;
var month=-1;
var day=-1;
var doy=-1;
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var getNumber=function(match){var isDoubled=lookAhead(match);
var size=(match=="@"?14:(match=="!"?20:(match=="y"&&isDoubled?4:(match=="o"?3:2))));
var digits=new RegExp("^\\d{1,"+size+"}");
var num=value.substring(iValue).match(digits);
if(!num){throw"Missing number at position "+iValue
}iValue+=num[0].length;
return parseInt(num[0],10)
};
var getName=function(match,shortNames,longNames){var names=$.map(lookAhead(match)?longNames:shortNames,function(v,k){return[[k,v]]
}).sort(function(a,b){return -(a[1].length-b[1].length)
});
var index=-1;
$.each(names,function(i,pair){var name=pair[1];
if(value.substr(iValue,name.length).toLowerCase()==name.toLowerCase()){index=pair[0];
iValue+=name.length;
return false
}});
if(index!=-1){return index+1
}else{throw"Unknown name at position "+iValue
}};
var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue
}iValue++
};
var iValue=0;
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{checkLiteral()
}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");
break;
case"D":getName("D",dayNamesShort,dayNames);
break;
case"o":doy=getNumber("o");
break;
case"m":month=getNumber("m");
break;
case"M":month=getName("M",monthNamesShort,monthNames);
break;
case"y":year=getNumber("y");
break;
case"@":var date=new Date(getNumber("@"));
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"!":var date=new Date((getNumber("!")-this._ticksTo1970)/10000);
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"'":if(lookAhead("'")){checkLiteral()
}else{literal=true
}break;
default:checkLiteral()
}}}if(iValue<value.length){throw"Extra/unparsed characters found in date: "+value.substring(iValue)
}if(year==-1){year=new Date().getFullYear()
}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)
}}if(doy>-1){month=1;
day=doy;
do{var dim=this._getDaysInMonth(year,month-1);
if(day<=dim){break
}month++;
day-=dim
}while(true)
}var date=this._daylightSavingAdjust(new Date(year,month-1,day));
if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"
}return date
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(((1970-1)*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*10000000),formatDate:function(format,date,settings){if(!date){return""
}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var formatNumber=function(match,value,len){var num=""+value;
if(lookAhead(match)){while(num.length<len){num="0"+num
}}return num
};
var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])
};
var output="";
var literal=false;
if(date){for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{output+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);
break;
case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);
break;
case"o":output+=formatNumber("o",Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime()-new Date(date.getFullYear(),0,0).getTime())/86400000),3);
break;
case"m":output+=formatNumber("m",date.getMonth()+1,2);
break;
case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);
break;
case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);
break;
case"@":output+=date.getTime();
break;
case"!":output+=date.getTime()*10000+this._ticksTo1970;
break;
case"'":if(lookAhead("'")){output+="'"
}else{literal=true
}break;
default:output+=format.charAt(iFormat)
}}}}return output
},_possibleChars:function(format){var chars="";
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{chars+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";
break;
case"D":case"M":return null;
case"'":if(lookAhead("'")){chars+="'"
}else{literal=true
}break;
default:chars+=format.charAt(iFormat)
}}}return chars
},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]
},_setDateFromField:function(inst,noDefault){if(inst.input.val()==inst.lastVal){return 
}var dateFormat=this._get(inst,"dateFormat");
var dates=inst.lastVal=inst.input?inst.input.val():null;
var date,defaultDate;
date=defaultDate=this._getDefaultDate(inst);
var settings=this._getFormatConfig(inst);
try{date=this.parseDate(dateFormat,dates,settings)||defaultDate
}catch(event){this.log(event);
dates=(noDefault?"":dates)
}inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
inst.currentDay=(dates?date.getDate():0);
inst.currentMonth=(dates?date.getMonth():0);
inst.currentYear=(dates?date.getFullYear():0);
this._adjustInstDate(inst)
},_getDefaultDate:function(inst){return this._restrictMinMax(inst,this._determineDate(inst,this._get(inst,"defaultDate"),new Date()))
},_determineDate:function(inst,date,defaultDate){var offsetNumeric=function(offset){var date=new Date();
date.setDate(date.getDate()+offset);
return date
};
var offsetString=function(offset){try{return $.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),offset,$.datepicker._getFormatConfig(inst))
}catch(e){}var date=(offset.toLowerCase().match(/^c/)?$.datepicker._getDate(inst):null)||new Date();
var year=date.getFullYear();
var month=date.getMonth();
var day=date.getDate();
var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches=pattern.exec(offset);
while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);
break;
case"w":case"W":day+=parseInt(matches[1],10)*7;
break;
case"m":case"M":month+=parseInt(matches[1],10);
day=Math.min(day,$.datepicker._getDaysInMonth(year,month));
break;
case"y":case"Y":year+=parseInt(matches[1],10);
day=Math.min(day,$.datepicker._getDaysInMonth(year,month));
break
}matches=pattern.exec(offset)
}return new Date(year,month,day)
};
var newDate=(date==null||date===""?defaultDate:(typeof date=="string"?offsetString(date):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):new Date(date.getTime()))));
newDate=(newDate&&newDate.toString()=="Invalid Date"?defaultDate:newDate);
if(newDate){newDate.setHours(0);
newDate.setMinutes(0);
newDate.setSeconds(0);
newDate.setMilliseconds(0)
}return this._daylightSavingAdjust(newDate)
},_daylightSavingAdjust:function(date){if(!date){return null
}date.setHours(date.getHours()>12?date.getHours()+2:0);
return date
},_setDate:function(inst,date,noChange){var clear=!date;
var origMonth=inst.selectedMonth;
var origYear=inst.selectedYear;
var newDate=this._restrictMinMax(inst,this._determineDate(inst,date,new Date()));
inst.selectedDay=inst.currentDay=newDate.getDate();
inst.drawMonth=inst.selectedMonth=inst.currentMonth=newDate.getMonth();
inst.drawYear=inst.selectedYear=inst.currentYear=newDate.getFullYear();
if((origMonth!=inst.selectedMonth||origYear!=inst.selectedYear)&&!noChange){this._notifyChange(inst)
}this._adjustInstDate(inst);
if(inst.input){inst.input.val(clear?"":this._formatDate(inst))
}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return startDate
},_generateHTML:function(inst){var today=new Date();
today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));
var isRTL=this._get(inst,"isRTL");
var showButtonPanel=this._get(inst,"showButtonPanel");
var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");
var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");
var numMonths=this._getNumberOfMonths(inst);
var showCurrentAtPos=this._get(inst,"showCurrentAtPos");
var stepMonths=this._get(inst,"stepMonths");
var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);
var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
var drawMonth=inst.drawMonth-showCurrentAtPos;
var drawYear=inst.drawYear;
if(drawMonth<0){drawMonth+=12;
drawYear--
}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-(numMonths[0]*numMonths[1])+1,maxDate.getDate()));
maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);
while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;
if(drawMonth<0){drawMonth=11;
drawYear--
}}}inst.drawMonth=drawMonth;
inst.drawYear=drawYear;
var prevText=this._get(inst,"prevText");
prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));
var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));
var nextText=this._get(inst,"nextText");
nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));
var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));
var currentText=this._get(inst,"currentText");
var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);
currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));
var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");
var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";
var firstDay=parseInt(this._get(inst,"firstDay"),10);
firstDay=(isNaN(firstDay)?0:firstDay);
var showWeek=this._get(inst,"showWeek");
var dayNames=this._get(inst,"dayNames");
var dayNamesShort=this._get(inst,"dayNamesShort");
var dayNamesMin=this._get(inst,"dayNamesMin");
var monthNames=this._get(inst,"monthNames");
var monthNamesShort=this._get(inst,"monthNamesShort");
var beforeShowDay=this._get(inst,"beforeShowDay");
var showOtherMonths=this._get(inst,"showOtherMonths");
var selectOtherMonths=this._get(inst,"selectOtherMonths");
var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;
var defaultDate=this._getDefaultDate(inst);
var html="";
for(var row=0;
row<numMonths[0];
row++){var group="";
this.maxRows=4;
for(var col=0;
col<numMonths[1];
col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));
var cornerClass=" ui-corner-all";
var calender="";
if(isMultiMonth){calender+='<div class="ui-datepicker-group';
if(numMonths[1]>1){switch(col){case 0:calender+=" ui-datepicker-group-first";
cornerClass=" ui-corner-"+(isRTL?"right":"left");
break;
case numMonths[1]-1:calender+=" ui-datepicker-group-last";
cornerClass=" ui-corner-"+(isRTL?"left":"right");
break;
default:calender+=" ui-datepicker-group-middle";
cornerClass="";
break
}}calender+='">'
}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var thead=(showWeek?'<th class="ui-datepicker-week-col">'+this._get(inst,"weekHeader")+"</th>":"");
for(var dow=0;
dow<7;
dow++){var day=(dow+firstDay)%7;
thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"
}calender+=thead+"</tr></thead><tbody>";
var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);
if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)
}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;
var curRows=Math.ceil((leadDays+daysInMonth)/7);
var numRows=(isMultiMonth?this.maxRows>curRows?this.maxRows:curRows:curRows);
this.maxRows=numRows;
var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));
for(var dRow=0;
dRow<numRows;
dRow++){calender+="<tr>";
var tbody=(!showWeek?"":'<td class="ui-datepicker-week-col">'+this._get(inst,"calculateWeek")(printDate)+"</td>");
for(var dow=0;
dow<7;
dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);
var otherMonth=(printDate.getMonth()!=drawMonth);
var unselectable=(otherMonth&&!selectOtherMonths)||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);
tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()==currentDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+inst.id+"',"+printDate.getMonth()+","+printDate.getFullYear()+', this);return false;"')+">"+(otherMonth&&!showOtherMonths?"&#xa0;":(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()==currentDate.getTime()?" ui-state-active":"")+(otherMonth?" ui-priority-secondary":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";
printDate.setDate(printDate.getDate()+1);
printDate=this._daylightSavingAdjust(printDate)
}calender+=tbody+"</tr>"
}drawMonth++;
if(drawMonth>11){drawMonth=0;
drawYear++
}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");
group+=calender
}html+=group
}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");
inst._keyEvent=false;
return html
},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,secondary,monthNames,monthNamesShort){var changeMonth=this._get(inst,"changeMonth");
var changeYear=this._get(inst,"changeYear");
var showMonthAfterYear=this._get(inst,"showMonthAfterYear");
var html='<div class="ui-datepicker-title">';
var monthHtml="";
if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span>"
}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);
var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);
monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+inst.id+"', this, 'M');\" >";
for(var month=0;
month<12;
month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"
}}monthHtml+="</select>"
}if(!showMonthAfterYear){html+=monthHtml+(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")
}if(!inst.yearshtml){inst.yearshtml="";
if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"
}else{var years=this._get(inst,"yearRange").split(":");
var thisYear=new Date().getFullYear();
var determineYear=function(value){var year=(value.match(/c[+-].*/)?drawYear+parseInt(value.substring(1),10):(value.match(/[+-].*/)?thisYear+parseInt(value,10):parseInt(value,10)));
return(isNaN(year)?thisYear:year)
};
var year=determineYear(years[0]);
var endYear=Math.max(year,determineYear(years[1]||""));
year=(minDate?Math.max(year,minDate.getFullYear()):year);
endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);
inst.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+inst.id+"', this, 'Y');\" >";
for(;
year<=endYear;
year++){inst.yearshtml+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"
}inst.yearshtml+="</select>";
html+=inst.yearshtml;
inst.yearshtml=null
}}html+=this._get(inst,"yearSuffix");
if(showMonthAfterYear){html+=(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")+monthHtml
}html+="</div>";
return html
},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);
var month=inst.drawMonth+(period=="M"?offset:0);
var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);
var date=this._restrictMinMax(inst,this._daylightSavingAdjust(new Date(year,month,day)));
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
if(period=="M"||period=="Y"){this._notifyChange(inst)
}},_restrictMinMax:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
var newDate=(minDate&&date<minDate?minDate:date);
newDate=(maxDate&&newDate>maxDate?maxDate:newDate);
return newDate
},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");
if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])
}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");
return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))
},_getMinMaxDate:function(inst,minMax){return this._determineDate(inst,this._get(inst,minMax+"Date"),null)
},_getDaysInMonth:function(year,month){return 32-this._daylightSavingAdjust(new Date(year,month,32)).getDate()
},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()
},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);
var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[0]*numMonths[1]),1));
if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))
}return this._isInRange(inst,date)
},_isInRange:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
return((!minDate||date.getTime()>=minDate.getTime())&&(!maxDate||date.getTime()<=maxDate.getTime()))
},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}
},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;
inst.currentMonth=inst.selectedMonth;
inst.currentYear=inst.selectedYear
}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))
}});
function bindHover(dpDiv){var selector="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return dpDiv.bind("mouseout",function(event){var elem=$(event.target).closest(selector);
if(!elem.length){return 
}elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
}).bind("mouseover",function(event){var elem=$(event.target).closest(selector);
if($.datepicker._isDisabledDatepicker(instActive.inline?dpDiv.parent()[0]:instActive.input[0])||!elem.length){return 
}elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
elem.addClass("ui-state-hover");
if(elem.hasClass("ui-datepicker-prev")){elem.addClass("ui-datepicker-prev-hover")
}if(elem.hasClass("ui-datepicker-next")){elem.addClass("ui-datepicker-next-hover")
}})
}function extendRemove(target,props){$.extend(target,props);
for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]
}}return target
}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))
}$.fn.datepicker=function(options){if(!this.length){return this
}if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
$.datepicker.initialized=true
}var otherArgs=Array.prototype.slice.call(arguments,1);
if(typeof options=="string"&&(options=="isDisabled"||options=="getDate"||options=="widget")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)
})
};
$.datepicker=new Datepicker();
$.datepicker.initialized=false;
$.datepicker.uuid=new Date().getTime();
$.datepicker.version="1.8.16";
window["DP_jQuery_"+dpuuid]=$
})(jQuery);
(function($,undefined){$.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});
this.valueDiv=$("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
this.oldValue=this._value();
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();
$.Widget.prototype.destroy.apply(this,arguments)
},value:function(newValue){if(newValue===undefined){return this._value()
}this._setOption("value",newValue);
return this
},_setOption:function(key,value){if(key==="value"){this.options.value=value;
this._refreshValue();
if(this._value()===this.options.max){this._trigger("complete")
}}$.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var val=this.options.value;
if(typeof val!=="number"){val=0
}return Math.min(this.options.max,Math.max(this.min,val))
},_percentage:function(){return 100*this._value()/this.options.max
},_refreshValue:function(){var value=this.value();
var percentage=this._percentage();
if(this.oldValue!==value){this.oldValue=value;
this._trigger("change")
}this.valueDiv.toggle(value>this.min).toggleClass("ui-corner-right",value===this.options.max).width(percentage.toFixed(0)+"%");
this.element.attr("aria-valuenow",value)
}});
$.extend($.ui.progressbar,{version:"1.8.16"})
})(jQuery);
jQuery.effects||(function($,undefined){$.effects={};
$.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(i,attr){$.fx.step[attr]=function(fx){if(!fx.colorInit){fx.start=getColor(fx.elem,attr);
fx.end=getRGB(fx.end);
fx.colorInit=true
}fx.elem.style[attr]="rgb("+Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2],10),255),0)+")"
}
});
function getRGB(color){var result;
if(color&&color.constructor==Array&&color.length==3){return color
}if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)){return[parseInt(result[1],10),parseInt(result[2],10),parseInt(result[3],10)]
}if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)){return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55]
}if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)){return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)]
}if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)){return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)]
}if(result=/rgba\(0, 0, 0, 0\)/.exec(color)){return colors.transparent
}return colors[$.trim(color).toLowerCase()]
}function getColor(elem,attr){var color;
do{color=$.curCSS(elem,attr);
if(color!=""&&color!="transparent"||$.nodeName(elem,"body")){break
}attr="backgroundColor"
}while(elem=elem.parentNode);
return getRGB(color)
}var colors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var classAnimationActions=["add","remove","toggle"],shorthandStyles={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function getElementStyles(){var style=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,newStyle={},key,camelCase;
if(style&&style.length&&style[0]&&style[style[0]]){var len=style.length;
while(len--){key=style[len];
if(typeof style[key]=="string"){camelCase=key.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()
});
newStyle[camelCase]=style[key]
}}}else{for(key in style){if(typeof style[key]==="string"){newStyle[key]=style[key]
}}}return newStyle
}function filterStyles(styles){var name,value;
for(name in styles){value=styles[name];
if(value==null||$.isFunction(value)||name in shorthandStyles||(/scrollbar/).test(name)||(!(/color/i).test(name)&&isNaN(parseFloat(value)))){delete styles[name]
}}return styles
}function styleDifference(oldStyle,newStyle){var diff={_:0},name;
for(name in newStyle){if(oldStyle[name]!=newStyle[name]){diff[name]=newStyle[name]
}}return diff
}$.effects.animateClass=function(value,duration,easing,callback){if($.isFunction(easing)){callback=easing;
easing=null
}return this.queue(function(){var that=$(this),originalStyleAttr=that.attr("style")||" ",originalStyle=filterStyles(getElementStyles.call(this)),newStyle,className=that.attr("class");
$.each(classAnimationActions,function(i,action){if(value[action]){that[action+"Class"](value[action])
}});
newStyle=filterStyles(getElementStyles.call(this));
that.attr("class",className);
that.animate(styleDifference(originalStyle,newStyle),{queue:false,duration:duration,easing:easing,complete:function(){$.each(classAnimationActions,function(i,action){if(value[action]){that[action+"Class"](value[action])
}});
if(typeof that.attr("style")=="object"){that.attr("style").cssText="";
that.attr("style").cssText=originalStyleAttr
}else{that.attr("style",originalStyleAttr)
}if(callback){callback.apply(this,arguments)
}$.dequeue(this)
}})
})
};
$.fn.extend({_addClass:$.fn.addClass,addClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{add:classNames},speed,easing,callback]):this._addClass(classNames)
},_removeClass:$.fn.removeClass,removeClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{remove:classNames},speed,easing,callback]):this._removeClass(classNames)
},_toggleClass:$.fn.toggleClass,toggleClass:function(classNames,force,speed,easing,callback){if(typeof force=="boolean"||force===undefined){if(!speed){return this._toggleClass(classNames,force)
}else{return $.effects.animateClass.apply(this,[(force?{add:classNames}:{remove:classNames}),speed,easing,callback])
}}else{return $.effects.animateClass.apply(this,[{toggle:classNames},force,speed,easing])
}},switchClass:function(remove,add,speed,easing,callback){return $.effects.animateClass.apply(this,[{add:add,remove:remove},speed,easing,callback])
}});
$.extend($.effects,{version:"1.8.16",save:function(element,set){for(var i=0;
i<set.length;
i++){if(set[i]!==null){element.data("ec.storage."+set[i],element[0].style[set[i]])
}}},restore:function(element,set){for(var i=0;
i<set.length;
i++){if(set[i]!==null){element.css(set[i],element.data("ec.storage."+set[i]))
}}},setMode:function(el,mode){if(mode=="toggle"){mode=el.is(":hidden")?"show":"hide"
}return mode
},getBaseline:function(origin,original){var y,x;
switch(origin[0]){case"top":y=0;
break;
case"middle":y=0.5;
break;
case"bottom":y=1;
break;
default:y=origin[0]/original.height
}switch(origin[1]){case"left":x=0;
break;
case"center":x=0.5;
break;
case"right":x=1;
break;
default:x=origin[1]/original.width
}return{x:x,y:y}
},createWrapper:function(element){if(element.parent().is(".ui-effects-wrapper")){return element.parent()
}var props={width:element.outerWidth(true),height:element.outerHeight(true),"float":element.css("float")},wrapper=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),active=document.activeElement;
element.wrap(wrapper);
if(element[0]===active||$.contains(element[0],active)){$(active).focus()
}wrapper=element.parent();
if(element.css("position")=="static"){wrapper.css({position:"relative"});
element.css({position:"relative"})
}else{$.extend(props,{position:element.css("position"),zIndex:element.css("z-index")});
$.each(["top","left","bottom","right"],function(i,pos){props[pos]=element.css(pos);
if(isNaN(parseInt(props[pos],10))){props[pos]="auto"
}});
element.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}return wrapper.css(props).show()
},removeWrapper:function(element){var parent,active=document.activeElement;
if(element.parent().is(".ui-effects-wrapper")){parent=element.parent().replaceWith(element);
if(element[0]===active||$.contains(element[0],active)){$(active).focus()
}return parent
}return element
},setTransition:function(element,list,factor,value){value=value||{};
$.each(list,function(i,x){unit=element.cssUnit(x);
if(unit[0]>0){value[x]=unit[0]*factor+unit[1]
}});
return value
}});
function _normalizeArguments(effect,options,speed,callback){if(typeof effect=="object"){callback=options;
speed=null;
options=effect;
effect=options.effect
}if($.isFunction(options)){callback=options;
speed=null;
options={}
}if(typeof options=="number"||$.fx.speeds[options]){callback=speed;
speed=options;
options={}
}if($.isFunction(speed)){callback=speed;
speed=null
}options=options||{};
speed=speed||options.duration;
speed=$.fx.off?0:typeof speed=="number"?speed:speed in $.fx.speeds?$.fx.speeds[speed]:$.fx.speeds._default;
callback=callback||options.complete;
return[effect,options,speed,callback]
}function standardSpeed(speed){if(!speed||typeof speed==="number"||$.fx.speeds[speed]){return true
}if(typeof speed==="string"&&!$.effects[speed]){return true
}return false
}$.fn.extend({effect:function(effect,options,speed,callback){var args=_normalizeArguments.apply(this,arguments),args2={options:args[1],duration:args[2],callback:args[3]},mode=args2.options.mode,effectMethod=$.effects[effect];
if($.fx.off||!effectMethod){if(mode){return this[mode](args2.duration,args2.callback)
}else{return this.each(function(){if(args2.callback){args2.callback.call(this)
}})
}}return effectMethod.call(this,args2)
},_show:$.fn.show,show:function(speed){if(standardSpeed(speed)){return this._show.apply(this,arguments)
}else{var args=_normalizeArguments.apply(this,arguments);
args[1].mode="show";
return this.effect.apply(this,args)
}},_hide:$.fn.hide,hide:function(speed){if(standardSpeed(speed)){return this._hide.apply(this,arguments)
}else{var args=_normalizeArguments.apply(this,arguments);
args[1].mode="hide";
return this.effect.apply(this,args)
}},__toggle:$.fn.toggle,toggle:function(speed){if(standardSpeed(speed)||typeof speed==="boolean"||$.isFunction(speed)){return this.__toggle.apply(this,arguments)
}else{var args=_normalizeArguments.apply(this,arguments);
args[1].mode="toggle";
return this.effect.apply(this,args)
}},cssUnit:function(key){var style=this.css(key),val=[];
$.each(["em","px","%","pt"],function(i,unit){if(style.indexOf(unit)>0){val=[parseFloat(style),unit]
}});
return val
}});
$.easing.jswing=$.easing.swing;
$.extend($.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){return $.easing[$.easing.def](x,t,b,c,d)
},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b
},easeOutQuad:function(x,t,b,c,d){return -c*(t/=d)*(t-2)+b
},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b
}return -c/2*((--t)*(t-2)-1)+b
},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b
},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b
},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b
}return c/2*((t-=2)*t*t+2)+b
},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b
},easeOutQuart:function(x,t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b
},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b
}return -c/2*((t-=2)*t*t*t-2)+b
},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b
},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b
},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b
}return c/2*((t-=2)*t*t*t*t+2)+b
},easeInSine:function(x,t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b
},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b
},easeInOutSine:function(x,t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b
},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b
},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b
},easeInOutExpo:function(x,t,b,c,d){if(t==0){return b
}if(t==d){return b+c
}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b
}return c/2*(-Math.pow(2,-10*--t)+2)+b
},easeInCirc:function(x,t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b
},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b
},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b
}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b
},easeInElastic:function(x,t,b,c,d){var s=1.70158;
var p=0;
var a=c;
if(t==0){return b
}if((t/=d)==1){return b+c
}if(!p){p=d*0.3
}if(a<Math.abs(c)){a=c;
var s=p/4
}else{var s=p/(2*Math.PI)*Math.asin(c/a)
}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b
},easeOutElastic:function(x,t,b,c,d){var s=1.70158;
var p=0;
var a=c;
if(t==0){return b
}if((t/=d)==1){return b+c
}if(!p){p=d*0.3
}if(a<Math.abs(c)){a=c;
var s=p/4
}else{var s=p/(2*Math.PI)*Math.asin(c/a)
}return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b
},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;
var p=0;
var a=c;
if(t==0){return b
}if((t/=d/2)==2){return b+c
}if(!p){p=d*(0.3*1.5)
}if(a<Math.abs(c)){a=c;
var s=p/4
}else{var s=p/(2*Math.PI)*Math.asin(c/a)
}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b
}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b
},easeInBack:function(x,t,b,c,d,s){if(s==undefined){s=1.70158
}return c*(t/=d)*t*((s+1)*t-s)+b
},easeOutBack:function(x,t,b,c,d,s){if(s==undefined){s=1.70158
}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b
},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined){s=1.70158
}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b
}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b
},easeInBounce:function(x,t,b,c,d){return c-$.easing.easeOutBounce(x,d-t,0,c,d)+b
},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b
}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b
}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b
}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b
}}}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2){return $.easing.easeInBounce(x,t*2,0,c,d)*0.5+b
}return $.easing.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b
}})
})(jQuery);
(function($,undefined){$.effects.blind=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var direction=o.options.direction||"vertical";
$.effects.save(el,props);
el.show();
var wrapper=$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(direction=="vertical")?"height":"width";
var distance=(direction=="vertical")?wrapper.height():wrapper.width();
if(mode=="show"){wrapper.css(ref,0)
}var animation={};
animation[ref]=mode=="show"?distance:0;
wrapper.animate(animation,o.duration,o.options.easing,function(){if(mode=="hide"){el.hide()
}$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(el[0],arguments)
}el.dequeue()
})
})
}
})(jQuery);
(function($,undefined){$.effects.bounce=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var direction=o.options.direction||"up";
var distance=o.options.distance||20;
var times=o.options.times||5;
var speed=o.duration||250;
if(/show|hide/.test(mode)){props.push("opacity")
}$.effects.save(el,props);
el.show();
$.effects.createWrapper(el);
var ref=(direction=="up"||direction=="down")?"top":"left";
var motion=(direction=="up"||direction=="left")?"pos":"neg";
var distance=o.options.distance||(ref=="top"?el.outerHeight({margin:true})/3:el.outerWidth({margin:true})/3);
if(mode=="show"){el.css("opacity",0).css(ref,motion=="pos"?-distance:distance)
}if(mode=="hide"){distance=distance/(times*2)
}if(mode!="hide"){times--
}if(mode=="show"){var animation={opacity:1};
animation[ref]=(motion=="pos"?"+=":"-=")+distance;
el.animate(animation,speed/2,o.options.easing);
distance=distance/2;
times--
}for(var i=0;
i<times;
i++){var animation1={},animation2={};
animation1[ref]=(motion=="pos"?"-=":"+=")+distance;
animation2[ref]=(motion=="pos"?"+=":"-=")+distance;
el.animate(animation1,speed/2,o.options.easing).animate(animation2,speed/2,o.options.easing);
distance=(mode=="hide")?distance*2:distance/2
}if(mode=="hide"){var animation={opacity:0};
animation[ref]=(motion=="pos"?"-=":"+=")+distance;
el.animate(animation,speed/2,o.options.easing,function(){el.hide();
$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(this,arguments)
}})
}else{var animation1={},animation2={};
animation1[ref]=(motion=="pos"?"-=":"+=")+distance;
animation2[ref]=(motion=="pos"?"+=":"-=")+distance;
el.animate(animation1,speed/2,o.options.easing).animate(animation2,speed/2,o.options.easing,function(){$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(this,arguments)
}})
}el.queue("fx",function(){el.dequeue()
});
el.dequeue()
})
}
})(jQuery);
(function($,undefined){$.effects.clip=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right","height","width"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var direction=o.options.direction||"vertical";
$.effects.save(el,props);
el.show();
var wrapper=$.effects.createWrapper(el).css({overflow:"hidden"});
var animate=el[0].tagName=="IMG"?wrapper:el;
var ref={size:(direction=="vertical")?"height":"width",position:(direction=="vertical")?"top":"left"};
var distance=(direction=="vertical")?animate.height():animate.width();
if(mode=="show"){animate.css(ref.size,0);
animate.css(ref.position,distance/2)
}var animation={};
animation[ref.size]=mode=="show"?distance:0;
animation[ref.position]=mode=="show"?0:distance/2;
animate.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=="hide"){el.hide()
}$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(el[0],arguments)
}el.dequeue()
}})
})
}
})(jQuery);
(function($,undefined){$.effects.drop=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right","opacity"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var direction=o.options.direction||"left";
$.effects.save(el,props);
el.show();
$.effects.createWrapper(el);
var ref=(direction=="up"||direction=="down")?"top":"left";
var motion=(direction=="up"||direction=="left")?"pos":"neg";
var distance=o.options.distance||(ref=="top"?el.outerHeight({margin:true})/2:el.outerWidth({margin:true})/2);
if(mode=="show"){el.css("opacity",0).css(ref,motion=="pos"?-distance:distance)
}var animation={opacity:mode=="show"?1:0};
animation[ref]=(mode=="show"?(motion=="pos"?"+=":"-="):(motion=="pos"?"-=":"+="))+distance;
el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=="hide"){el.hide()
}$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(this,arguments)
}el.dequeue()
}})
})
}
})(jQuery);
(function($,undefined){$.effects.explode=function(o){return this.queue(function(){var rows=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
var cells=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
o.options.mode=o.options.mode=="toggle"?($(this).is(":visible")?"hide":"show"):o.options.mode;
var el=$(this).show().css("visibility","hidden");
var offset=el.offset();
offset.top-=parseInt(el.css("marginTop"),10)||0;
offset.left-=parseInt(el.css("marginLeft"),10)||0;
var width=el.outerWidth(true);
var height=el.outerHeight(true);
for(var i=0;
i<rows;
i++){for(var j=0;
j<cells;
j++){el.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(width/cells),top:-i*(height/rows)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:width/cells,height:height/rows,left:offset.left+j*(width/cells)+(o.options.mode=="show"?(j-Math.floor(cells/2))*(width/cells):0),top:offset.top+i*(height/rows)+(o.options.mode=="show"?(i-Math.floor(rows/2))*(height/rows):0),opacity:o.options.mode=="show"?0:1}).animate({left:offset.left+j*(width/cells)+(o.options.mode=="show"?0:(j-Math.floor(cells/2))*(width/cells)),top:offset.top+i*(height/rows)+(o.options.mode=="show"?0:(i-Math.floor(rows/2))*(height/rows)),opacity:o.options.mode=="show"?1:0},o.duration||500)
}}setTimeout(function(){o.options.mode=="show"?el.css({visibility:"visible"}):el.css({visibility:"visible"}).hide();
if(o.callback){o.callback.apply(el[0])
}el.dequeue();
$("div.ui-effects-explode").remove()
},o.duration||500)
})
}
})(jQuery);
(function($,undefined){$.effects.fade=function(o){return this.queue(function(){var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide");
elem.animate({opacity:mode},{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){(o.callback&&o.callback.apply(this,arguments));
elem.dequeue()
}})
})
}
})(jQuery);
(function($,undefined){$.effects.fold=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var size=o.options.size||15;
var horizFirst=!(!o.options.horizFirst);
var duration=o.duration?o.duration/2:$.fx.speeds._default/2;
$.effects.save(el,props);
el.show();
var wrapper=$.effects.createWrapper(el).css({overflow:"hidden"});
var widthFirst=((mode=="show")!=horizFirst);
var ref=widthFirst?["width","height"]:["height","width"];
var distance=widthFirst?[wrapper.width(),wrapper.height()]:[wrapper.height(),wrapper.width()];
var percent=/([0-9]+)%/.exec(size);
if(percent){size=parseInt(percent[1],10)/100*distance[mode=="hide"?0:1]
}if(mode=="show"){wrapper.css(horizFirst?{height:0,width:size}:{height:size,width:0})
}var animation1={},animation2={};
animation1[ref[0]]=mode=="show"?distance[0]:size;
animation2[ref[1]]=mode=="show"?distance[1]:0;
wrapper.animate(animation1,duration,o.options.easing).animate(animation2,duration,o.options.easing,function(){if(mode=="hide"){el.hide()
}$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(el[0],arguments)
}el.dequeue()
})
})
}
})(jQuery);
(function($,undefined){$.effects.highlight=function(o){return this.queue(function(){var elem=$(this),props=["backgroundImage","backgroundColor","opacity"],mode=$.effects.setMode(elem,o.options.mode||"show"),animation={backgroundColor:elem.css("backgroundColor")};
if(mode=="hide"){animation.opacity=0
}$.effects.save(elem,props);
elem.show().css({backgroundImage:"none",backgroundColor:o.options.color||"#ffff99"}).animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){(mode=="hide"&&elem.hide());
$.effects.restore(elem,props);
(mode=="show"&&!$.support.opacity&&this.style.removeAttribute("filter"));
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue()
}})
})
}
})(jQuery);
(function($,undefined){$.effects.pulsate=function(o){return this.queue(function(){var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"show");
times=((o.options.times||5)*2)-1;
duration=o.duration?o.duration/2:$.fx.speeds._default/2,isVisible=elem.is(":visible"),animateTo=0;
if(!isVisible){elem.css("opacity",0).show();
animateTo=1
}if((mode=="hide"&&isVisible)||(mode=="show"&&!isVisible)){times--
}for(var i=0;
i<times;
i++){elem.animate({opacity:animateTo},duration,o.options.easing);
animateTo=(animateTo+1)%2
}elem.animate({opacity:animateTo},duration,o.options.easing,function(){if(animateTo==0){elem.hide()
}(o.callback&&o.callback.apply(this,arguments))
});
elem.queue("fx",function(){elem.dequeue()
}).dequeue()
})
}
})(jQuery);
(function($,undefined){$.effects.puff=function(o){return this.queue(function(){var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide"),percent=parseInt(o.options.percent,10)||150,factor=percent/100,original={height:elem.height(),width:elem.width()};
$.extend(o.options,{fade:true,mode:mode,percent:mode=="hide"?percent:100,from:mode=="hide"?original:{height:original.height*factor,width:original.width*factor}});
elem.effect("scale",o.options,o.duration,o.callback);
elem.dequeue()
})
};
$.effects.scale=function(o){return this.queue(function(){var el=$(this);
var options=$.extend(true,{},o.options);
var mode=$.effects.setMode(el,o.options.mode||"effect");
var percent=parseInt(o.options.percent,10)||(parseInt(o.options.percent,10)==0?0:(mode=="hide"?0:100));
var direction=o.options.direction||"both";
var origin=o.options.origin;
if(mode!="effect"){options.origin=origin||["middle","center"];
options.restore=true
}var original={height:el.height(),width:el.width()};
el.from=o.options.from||(mode=="show"?{height:0,width:0}:original);
var factor={y:direction!="horizontal"?(percent/100):1,x:direction!="vertical"?(percent/100):1};
el.to={height:original.height*factor.y,width:original.width*factor.x};
if(o.options.fade){if(mode=="show"){el.from.opacity=0;
el.to.opacity=1
}if(mode=="hide"){el.from.opacity=1;
el.to.opacity=0
}}options.from=el.from;
options.to=el.to;
options.mode=mode;
el.effect("size",options,o.duration,o.callback);
el.dequeue()
})
};
$.effects.size=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right","width","height","overflow","opacity"];
var props1=["position","top","bottom","left","right","overflow","opacity"];
var props2=["width","height","overflow"];
var cProps=["fontSize"];
var vProps=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var hProps=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var restore=o.options.restore||false;
var scale=o.options.scale||"both";
var origin=o.options.origin;
var original={height:el.height(),width:el.width()};
el.from=o.options.from||original;
el.to=o.options.to||original;
if(origin){var baseline=$.effects.getBaseline(origin,original);
el.from.top=(original.height-el.from.height)*baseline.y;
el.from.left=(original.width-el.from.width)*baseline.x;
el.to.top=(original.height-el.to.height)*baseline.y;
el.to.left=(original.width-el.to.width)*baseline.x
}var factor={from:{y:el.from.height/original.height,x:el.from.width/original.width},to:{y:el.to.height/original.height,x:el.to.width/original.width}};
if(scale=="box"||scale=="both"){if(factor.from.y!=factor.to.y){props=props.concat(vProps);
el.from=$.effects.setTransition(el,vProps,factor.from.y,el.from);
el.to=$.effects.setTransition(el,vProps,factor.to.y,el.to)
}if(factor.from.x!=factor.to.x){props=props.concat(hProps);
el.from=$.effects.setTransition(el,hProps,factor.from.x,el.from);
el.to=$.effects.setTransition(el,hProps,factor.to.x,el.to)
}}if(scale=="content"||scale=="both"){if(factor.from.y!=factor.to.y){props=props.concat(cProps);
el.from=$.effects.setTransition(el,cProps,factor.from.y,el.from);
el.to=$.effects.setTransition(el,cProps,factor.to.y,el.to)
}}$.effects.save(el,restore?props:props1);
el.show();
$.effects.createWrapper(el);
el.css("overflow","hidden").css(el.from);
if(scale=="content"||scale=="both"){vProps=vProps.concat(["marginTop","marginBottom"]).concat(cProps);
hProps=hProps.concat(["marginLeft","marginRight"]);
props2=props.concat(vProps).concat(hProps);
el.find("*[width]").each(function(){child=$(this);
if(restore){$.effects.save(child,props2)
}var c_original={height:child.height(),width:child.width()};
child.from={height:c_original.height*factor.from.y,width:c_original.width*factor.from.x};
child.to={height:c_original.height*factor.to.y,width:c_original.width*factor.to.x};
if(factor.from.y!=factor.to.y){child.from=$.effects.setTransition(child,vProps,factor.from.y,child.from);
child.to=$.effects.setTransition(child,vProps,factor.to.y,child.to)
}if(factor.from.x!=factor.to.x){child.from=$.effects.setTransition(child,hProps,factor.from.x,child.from);
child.to=$.effects.setTransition(child,hProps,factor.to.x,child.to)
}child.css(child.from);
child.animate(child.to,o.duration,o.options.easing,function(){if(restore){$.effects.restore(child,props2)
}})
})
}el.animate(el.to,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(el.to.opacity===0){el.css("opacity",el.from.opacity)
}if(mode=="hide"){el.hide()
}$.effects.restore(el,restore?props:props1);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(this,arguments)
}el.dequeue()
}})
})
}
})(jQuery);
(function($,undefined){$.effects.shake=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var direction=o.options.direction||"left";
var distance=o.options.distance||20;
var times=o.options.times||3;
var speed=o.duration||o.options.duration||140;
$.effects.save(el,props);
el.show();
$.effects.createWrapper(el);
var ref=(direction=="up"||direction=="down")?"top":"left";
var motion=(direction=="up"||direction=="left")?"pos":"neg";
var animation={},animation1={},animation2={};
animation[ref]=(motion=="pos"?"-=":"+=")+distance;
animation1[ref]=(motion=="pos"?"+=":"-=")+distance*2;
animation2[ref]=(motion=="pos"?"-=":"+=")+distance*2;
el.animate(animation,speed,o.options.easing);
for(var i=1;
i<times;
i++){el.animate(animation1,speed,o.options.easing).animate(animation2,speed,o.options.easing)
}el.animate(animation1,speed,o.options.easing).animate(animation,speed/2,o.options.easing,function(){$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(this,arguments)
}});
el.queue("fx",function(){el.dequeue()
});
el.dequeue()
})
}
})(jQuery);
(function($,undefined){$.effects.slide=function(o){return this.queue(function(){var el=$(this),props=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"show");
var direction=o.options.direction||"left";
$.effects.save(el,props);
el.show();
$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(direction=="up"||direction=="down")?"top":"left";
var motion=(direction=="up"||direction=="left")?"pos":"neg";
var distance=o.options.distance||(ref=="top"?el.outerHeight({margin:true}):el.outerWidth({margin:true}));
if(mode=="show"){el.css(ref,motion=="pos"?(isNaN(distance)?"-"+distance:-distance):distance)
}var animation={};
animation[ref]=(mode=="show"?(motion=="pos"?"+=":"-="):(motion=="pos"?"-=":"+="))+distance;
el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=="hide"){el.hide()
}$.effects.restore(el,props);
$.effects.removeWrapper(el);
if(o.callback){o.callback.apply(this,arguments)
}el.dequeue()
}})
})
}
})(jQuery);
(function($,undefined){$.effects.transfer=function(o){return this.queue(function(){var elem=$(this),target=$(o.options.to),endPosition=target.offset(),animation={top:endPosition.top,left:endPosition.left,height:target.innerHeight(),width:target.innerWidth()},startPosition=elem.offset(),transfer=$('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(o.options.className).css({top:startPosition.top,left:startPosition.left,height:elem.innerHeight(),width:elem.innerWidth(),position:"absolute"}).animate(animation,o.duration,o.options.easing,function(){transfer.remove();
(o.callback&&o.callback.apply(elem[0],arguments));
elem.dequeue()
})
})
}
})(jQuery)
})(window.$CQ||window.$||function(){throw new Error("jQuery is not defined")
}(),window.$CQ||window.$);
(function(B,A){(function(K,H){var V=K.fn.domManip,J="_tmplitem",W=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,R={},G={},a,Z={key:0,data:{}},Y=0,S=0,I=[];
function M(d,c,f,g){var e={data:g||(c?c.data:{}),_wrap:c?c._wrap:null,tmpl:null,parent:c||null,nodes:[],calls:E,nest:D,wrap:P,html:T,update:b};
if(d){K.extend(e,d,{nodes:[],parent:c})
}if(f){e.tmpl=f;
e._ctnt=e._ctnt||e.tmpl(K,e);
e.key=++Y;
(I.length?G:R)[Y]=e
}return e
}K.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(c,d){K.fn[c]=function(e){var h=[],m=K(e),g,j,f,n,k=this.length===1&&this[0].parentNode;
a=R||{};
if(k&&k.nodeType===11&&k.childNodes.length===1&&m.length===1){m[d](this[0]);
h=this
}else{for(j=0,f=m.length;
j<f;
j++){S=j;
g=(j>0?this.clone(true):this).get();
K.fn[d].apply(K(m[j]),g);
h=h.concat(g)
}S=0;
h=this.pushStack(h,c,m.selector)
}n=a;
a=null;
K.tmpl.complete(n);
return h
}
});
K.fn.extend({tmpl:function(e,d,c){return K.tmpl(this[0],e,d,c)
},tmplItem:function(){return K.tmplItem(this[0])
},template:function(c){return K.template(c,this[0])
},domManip:function(e,j,k,d){if(e[0]&&e[0].nodeType){var h=K.makeArray(arguments),g=e.length,f=0,c;
while(f<g&&!(c=K.data(e[f++],"tmplItem"))){}if(g>1){h[0]=[K.makeArray(e)]
}if(c&&S){h[2]=function(i){K.tmpl.afterManip(this,i,k)
}
}V.apply(this,h)
}else{V.apply(this,arguments)
}S=0;
if(!a){K.tmpl.complete(R)
}return this
}});
K.extend({tmpl:function(e,h,g,d){var f,c=!d;
if(c){d=Z;
e=K.template[e]||K.template(null,e);
G={}
}else{if(!e){e=d.tmpl;
R[d.key]=d;
d.nodes=[];
if(d.wrapped){U(d,d.wrapped)
}return K(O(d,null,d.tmpl(K,d)))
}}if(!e){return[]
}if(typeof h==="function"){h=h.call(d||{})
}if(g&&g.wrapped){U(g,g.wrapped)
}f=K.isArray(h)?K.map(h,function(i){return i?M(g,d,e,i):null
}):[M(g,d,e,h)];
return c?K(O(d,null,f)):f
},tmplItem:function(d){var c;
if(d instanceof K){d=d[0]
}while(d&&d.nodeType===1&&!(c=K.data(d,"tmplItem"))&&(d=d.parentNode)){}return c||Z
},template:function(d,c){if(c){if(typeof c==="string"){c=N(c)
}else{if(c instanceof K){c=c[0]||{}
}}if(c.nodeType){c=K.data(c,"tmpl")||K.data(c,"tmpl",N(c.innerHTML))
}return typeof d==="string"?(K.template[d]=c):c
}return d?(typeof d!=="string"?K.template(null,d):(K.template[d]||K.template(null,W.test(d)?d:K(d)))):null
},encode:function(c){return(""+c).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
}});
K.extend(K.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(c){R={}
},afterManip:function X(e,c,f){var d=c.nodeType===11?K.makeArray(c.childNodes):c.nodeType===1?[c]:[];
f.call(e,c);
Q(d);
S++
}});
function O(c,g,e){var f,d=e?K.map(e,function(h){return(typeof h==="string")?(c.key?h.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+J+'="'+c.key+'" $2'):h):O(h,c,h._ctnt)
}):c;
if(g){return d
}d=d.join("");
d.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(i,j,h,k){f=K(h).get();
Q(f);
if(j){f=C(j).concat(f)
}if(k){f=f.concat(C(k))
}});
return f?f:C(d)
}function C(d){var c=document.createElement("div");
c.innerHTML=d;
return K.makeArray(c.childNodes)
}function N(c){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+K.trim(c).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(k,e,i,f,g,l,h){var n=K.tmpl.tag[i],d,j,m;
if(!n){throw"Template command not found: "+i
}d=n._default||[];
if(l&&!/\w$/.test(g)){g+=l;
l=""
}if(g){g=L(g);
h=h?(","+L(h)+")"):(l?")":"");
j=l?(g.indexOf(".")>-1?g+l:("("+g+").call($item"+h)):g;
m=l?j:"(typeof("+g+")==='function'?("+g+").call($item):("+g+"))"
}else{m=j=d.$1||"null"
}f=L(f);
return"');"+n[e?"close":"open"].split("$notnull_1").join(g?"typeof("+g+")!=='undefined' && ("+g+")!=null":"true").split("$1a").join(m).split("$1").join(j).split("$2").join(f?f.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(p,o,q,r){r=r?(","+r+")"):(q?")":"");
return r?("("+o+").call($item"+r):p
}):(d.$2||""))+"_.push('"
})+"');}return _;")
}function U(d,c){d._wrap=O(d,true,K.isArray(c)?c:[W.test(c)?c:K(c).html()]).join("")
}function L(c){return c?c.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null
}function F(c){var d=document.createElement("div");
d.appendChild(c.cloneNode(true));
return d.innerHTML
}function Q(j){var n="_"+S,d,c,g={},h,f,e;
for(h=0,f=j.length;
h<f;
h++){if((d=j[h]).nodeType!==1){continue
}c=d.getElementsByTagName("*");
for(e=c.length-1;
e>=0;
e--){k(c[e])
}k(d)
}function k(q){var m,p=q,o,i,l;
if((l=q.getAttribute(J))){while(p.parentNode&&(p=p.parentNode).nodeType===1&&!(m=p.getAttribute(J))){}if(m!==l){p=p.parentNode?(p.nodeType===11?0:(p.getAttribute(J)||0)):0;
if(!(i=R[l])){i=G[l];
i=M(i,R[p]||G[p],null,true);
i.key=++Y;
R[Y]=i
}if(S){r(l)
}}q.removeAttribute(J)
}else{if(S&&(i=K.data(q,"tmplItem"))){r(i.key);
R[i.key]=i;
p=K.data(q.parentNode,"tmplItem");
p=p?p.key:0
}}if(i){o=i;
while(o&&o.key!=p){o.nodes.push(q);
o=o.parent
}delete i._ctnt;
delete i._wrap;
K.data(q,"tmplItem",i)
}function r(s){s=s+n;
i=g[s]=(g[s]||M(i,R[i.parent.key+n]||i.parent,null,true))
}}}function E(e,c,f,d){if(!e){return I.pop()
}I.push({_:e,tmpl:c,item:this,data:f,options:d})
}function D(c,e,d){return K.tmpl(K.template(c),e,d,this)
}function P(e,c){var d=e.options||{};
d.wrapped=c;
return K.tmpl(K.template(e.tmpl),e.data,d,e.item)
}function T(d,e){var c=this._wrap;
return K.map(K(K.isArray(c)?c.join(""):c).filter(d||"*"),function(f){return e?f.innerText||f.textContent:f.outerHTML||F(f)
})
}function b(){var c=this.nodes;
K.tmpl(null,null,null,this).insertBefore(c[0]);
K(c).remove()
}})(B)
})(window.$CQ||window.$||function(){throw new Error("jQuery is not defined")
}(),window.$CQ||window.$);
/*
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */
(function(B,A){(function(E){var F={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},D=false;
E(window).bind("load.jcarousel",function(){D=true
});
E.jcarousel=function(K,H){this.options=E.extend({},F,H||{});
this.locked=false;
this.autoStopped=false;
this.container=null;
this.clip=null;
this.list=null;
this.buttonNext=null;
this.buttonPrev=null;
this.buttonNextState=null;
this.buttonPrevState=null;
if(!H||H.rtl===undefined){this.options.rtl=(E(K).attr("dir")||E("html").attr("dir")||"").toLowerCase()=="rtl"
}this.wh=!this.options.vertical?"width":"height";
this.lt=!this.options.vertical?(this.options.rtl?"right":"left"):"top";
var O="",M=K.className.split(" ");
for(var J=0;
J<M.length;
J++){if(M[J].indexOf("jcarousel-skin")!=-1){E(K).removeClass(M[J]);
O=M[J];
break
}}if(K.nodeName.toUpperCase()=="UL"||K.nodeName.toUpperCase()=="OL"){this.list=E(K);
this.clip=this.list.parents(".jcarousel-clip");
this.container=this.list.parents(".jcarousel-container")
}else{this.container=E(K);
this.list=this.container.find("ul,ol").eq(0);
this.clip=this.container.find(".jcarousel-clip")
}if(this.clip.size()===0){this.clip=this.list.wrap("<div></div>").parent()
}if(this.container.size()===0){this.container=this.clip.wrap("<div></div>").parent()
}if(O!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1){this.container.wrap('<div class=" '+O+'"></div>')
}this.buttonPrev=E(".jcarousel-prev",this.container);
if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null){this.buttonPrev=E(this.options.buttonPrevHTML).appendTo(this.container)
}this.buttonPrev.addClass(this.className("jcarousel-prev"));
this.buttonNext=E(".jcarousel-next",this.container);
if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null){this.buttonNext=E(this.options.buttonNextHTML).appendTo(this.container)
}this.buttonNext.addClass(this.className("jcarousel-next"));
this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});
this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css((this.options.rtl?"right":"left"),0);
this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});
if(!this.options.vertical&&this.options.rtl){this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl")
}var L=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;
var N=this.list.children("li");
var P=this;
if(N.size()>0){var G=0,I=this.options.offset;
N.each(function(){P.format(this,I++);
G+=P.dimension(this,L)
});
this.list.css(this.wh,(G+100)+"px");
if(!H||H.size===undefined){this.options.size=N.size()
}}this.container.css("display","block");
this.buttonNext.css("display","block");
this.buttonPrev.css("display","block");
this.funcNext=function(){P.next()
};
this.funcPrev=function(){P.prev()
};
this.funcResize=function(){if(P.resizeTimer){clearTimeout(P.resizeTimer)
}P.resizeTimer=setTimeout(function(){P.reload()
},100)
};
if(this.options.initCallback!==null){this.options.initCallback(this,"init")
}if(!D&&E.browser.safari){this.buttons(false,false);
E(window).bind("load.jcarousel",function(){P.setup()
})
}else{this.setup()
}};
var C=E.jcarousel;
C.fn=C.prototype={jcarousel:"0.2.8"};
C.fn.extend=C.extend=E.extend;
C.fn.extend({setup:function(){this.first=null;
this.last=null;
this.prevFirst=null;
this.prevLast=null;
this.animating=false;
this.timer=null;
this.resizeTimer=null;
this.tail=null;
this.inTail=false;
if(this.locked){return 
}this.list.css(this.lt,this.pos(this.options.offset)+"px");
var G=this.pos(this.options.start,true);
this.prevFirst=this.prevLast=null;
this.animate(G,false);
E(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);
if(this.options.setupCallback!==null){this.options.setupCallback(this)
}},reset:function(){this.list.empty();
this.list.css(this.lt,"0px");
this.list.css(this.wh,"10px");
if(this.options.initCallback!==null){this.options.initCallback(this,"reset")
}this.setup()
},reload:function(){if(this.tail!==null&&this.inTail){this.list.css(this.lt,C.intval(this.list.css(this.lt))+this.tail)
}this.tail=null;
this.inTail=false;
if(this.options.reloadCallback!==null){this.options.reloadCallback(this)
}if(this.options.visible!==null){var I=this;
var J=Math.ceil(this.clipping()/this.options.visible),H=0,G=0;
this.list.children("li").each(function(K){H+=I.dimension(this,J);
if(K+1<I.first){G=H
}});
this.list.css(this.wh,H+"px");
this.list.css(this.lt,-G+"px")
}this.scroll(this.first,false)
},lock:function(){this.locked=true;
this.buttons()
},unlock:function(){this.locked=false;
this.buttons()
},size:function(G){if(G!==undefined){this.options.size=G;
if(!this.locked){this.buttons()
}}return this.options.size
},has:function(H,I){if(I===undefined||!I){I=H
}if(this.options.size!==null&&I>this.options.size){I=this.options.size
}for(var G=H;
G<=I;
G++){var J=this.get(G);
if(!J.length||J.hasClass("jcarousel-item-placeholder")){return false
}}return true
},get:function(G){return E(">.jcarousel-item-"+G,this.list)
},add:function(K,O){var L=this.get(K),I=0,H=E(O);
if(L.length===0){var N,J=C.intval(K);
L=this.create(K);
while(true){N=this.get(--J);
if(J<=0||N.length){if(J<=0){this.list.prepend(L)
}else{N.after(L)
}break
}}}else{I=this.dimension(L)
}if(H.get(0).nodeName.toUpperCase()=="LI"){L.replaceWith(H);
L=H
}else{L.empty().append(O)
}this.format(L.removeClass(this.className("jcarousel-item-placeholder")),K);
var M=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;
var G=this.dimension(L,M)-I;
if(K>0&&K<this.first){this.list.css(this.lt,C.intval(this.list.css(this.lt))-G+"px")
}this.list.css(this.wh,C.intval(this.list.css(this.wh))+G+"px");
return L
},remove:function(G){var H=this.get(G);
if(!H.length||(G>=this.first&&G<=this.last)){return 
}var I=this.dimension(H);
if(G<this.first){this.list.css(this.lt,C.intval(this.list.css(this.lt))+I+"px")
}H.remove();
this.list.css(this.wh,C.intval(this.list.css(this.wh))-I+"px")
},next:function(){if(this.tail!==null&&!this.inTail){this.scrollTail(false)
}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size)?1:this.first+this.options.scroll)
}},prev:function(){if(this.tail!==null&&this.inTail){this.scrollTail(true)
}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1)?this.options.size:this.first-this.options.scroll)
}},scrollTail:function(G){if(this.locked||this.animating||!this.tail){return 
}this.pauseAuto();
var H=C.intval(this.list.css(this.lt));
H=!G?H-this.tail:H+this.tail;
this.inTail=!G;
this.prevFirst=this.first;
this.prevLast=this.last;
this.animate(H)
},scroll:function(H,G){if(this.locked||this.animating){return 
}this.pauseAuto();
this.animate(this.pos(H),G)
},pos:function(U,H){var I=C.intval(this.list.css(this.lt));
if(this.locked||this.animating){return I
}if(this.options.wrap!="circular"){U=U<1?1:(this.options.size&&U>this.options.size?this.options.size:U)
}var R=this.first>U;
var W=this.options.wrap!="circular"&&this.first<=1?1:this.first;
var Z=R?this.get(W):this.get(this.last);
var T=R?W:W-1;
var X=null,S=0,P=false,Y=0,V;
while(R?--T>=U:++T<U){X=this.get(T);
P=!X.length;
if(X.length===0){X=this.create(T).addClass(this.className("jcarousel-item-placeholder"));
Z[R?"before":"after"](X);
if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(T<=0||T>this.options.size)){V=this.get(this.index(T));
if(V.length){X=this.add(T,V.clone(true))
}}}Z=X;
Y=this.dimension(X);
if(P){S+=Y
}if(this.first!==null&&(this.options.wrap=="circular"||(T>=1&&(this.options.size===null||T<=this.options.size)))){I=R?I+Y:I-Y
}}var M=this.clipping(),O=[],G=0,N=0;
Z=this.get(U-1);
T=U;
while(++G){X=this.get(T);
P=!X.length;
if(X.length===0){X=this.create(T).addClass(this.className("jcarousel-item-placeholder"));
if(Z.length===0){this.list.prepend(X)
}else{Z[R?"before":"after"](X)
}if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(T<=0||T>this.options.size)){V=this.get(this.index(T));
if(V.length){X=this.add(T,V.clone(true))
}}}Z=X;
Y=this.dimension(X);
if(Y===0){throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...")
}if(this.options.wrap!="circular"&&this.options.size!==null&&T>this.options.size){O.push(X)
}else{if(P){S+=Y
}}N+=Y;
if(N>=M){break
}T++
}for(var L=0;
L<O.length;
L++){O[L].remove()
}if(S>0){this.list.css(this.wh,this.dimension(this.list)+S+"px");
if(R){I-=S;
this.list.css(this.lt,C.intval(this.list.css(this.lt))-S+"px")
}}var K=U+G-1;
if(this.options.wrap!="circular"&&this.options.size&&K>this.options.size){K=this.options.size
}if(T>K){G=0;
T=K;
N=0;
while(++G){X=this.get(T--);
if(!X.length){break
}N+=this.dimension(X);
if(N>=M){break
}}}var J=K-G+1;
if(this.options.wrap!="circular"&&J<1){J=1
}if(this.inTail&&R){I+=this.tail;
this.inTail=false
}this.tail=null;
if(this.options.wrap!="circular"&&K==this.options.size&&(K-G+1)>=1){var Q=C.intval(this.get(K).css(!this.options.vertical?"marginRight":"marginBottom"));
if((N-Q)>M){this.tail=N-M-Q
}}if(H&&U===this.options.size&&this.tail){I-=this.tail;
this.inTail=true
}while(U-->J){I+=this.dimension(this.get(U))
}this.prevFirst=this.first;
this.prevLast=this.last;
this.first=J;
this.last=K;
return I
},animate:function(K,G){if(this.locked||this.animating){return 
}this.animating=true;
var H=this;
var I=function(){H.animating=false;
if(K===0){H.list.css(H.lt,0)
}if(!H.autoStopped&&(H.options.wrap=="circular"||H.options.wrap=="both"||H.options.wrap=="last"||H.options.size===null||H.last<H.options.size||(H.last==H.options.size&&H.tail!==null&&!H.inTail))){H.startAuto()
}H.buttons();
H.notify("onAfterAnimation");
if(H.options.wrap=="circular"&&H.options.size!==null){for(var M=H.prevFirst;
M<=H.prevLast;
M++){if(M!==null&&!(M>=H.first&&M<=H.last)&&(M<1||M>H.options.size)){H.remove(M)
}}}};
this.notify("onBeforeAnimation");
if(!this.options.animation||G===false){this.list.css(this.lt,K+"px");
I()
}else{var L=!this.options.vertical?(this.options.rtl?{right:K}:{left:K}):{top:K};
var J={duration:this.options.animation,easing:this.options.easing,complete:I};
if(E.isFunction(this.options.animationStepCallback)){J.step=this.options.animationStepCallback
}this.list.animate(L,J)
}},startAuto:function(H){if(H!==undefined){this.options.auto=H
}if(this.options.auto===0){return this.stopAuto()
}if(this.timer!==null){return 
}this.autoStopped=false;
var G=this;
this.timer=window.setTimeout(function(){G.next()
},this.options.auto*1000)
},stopAuto:function(){this.pauseAuto();
this.autoStopped=true
},pauseAuto:function(){if(this.timer===null){return 
}window.clearTimeout(this.timer);
this.timer=null
},buttons:function(I,H){if(I==null){I=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="first")||this.options.size===null||this.last<this.options.size);
if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>=this.options.size){I=this.tail!==null&&!this.inTail
}}if(H==null){H=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="last")||this.first>1);
if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1){H=this.tail!==null&&this.inTail
}}var G=this;
if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);
if(I){this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext)
}this.buttonNext[I?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",I?false:true);
if(this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=I){this.buttonNext.each(function(){G.options.buttonNextCallback(G,this,I)
}).data("jcarouselstate",I)
}}else{if(this.options.buttonNextCallback!==null&&this.buttonNextState!=I){this.options.buttonNextCallback(G,null,I)
}}if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);
if(H){this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev)
}this.buttonPrev[H?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",H?false:true);
if(this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=H){this.buttonPrev.each(function(){G.options.buttonPrevCallback(G,this,H)
}).data("jcarouselstate",H)
}}else{if(this.options.buttonPrevCallback!==null&&this.buttonPrevState!=H){this.options.buttonPrevCallback(G,null,H)
}}this.buttonNextState=I;
this.buttonPrevState=H
},notify:function(G){var H=this.prevFirst===null?"init":(this.prevFirst<this.first?"next":"prev");
this.callback("itemLoadCallback",G,H);
if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",G,H,this.first);
this.callback("itemFirstOutCallback",G,H,this.prevFirst)
}if(this.prevLast!==this.last){this.callback("itemLastInCallback",G,H,this.last);
this.callback("itemLastOutCallback",G,H,this.prevLast)
}this.callback("itemVisibleInCallback",G,H,this.first,this.last,this.prevFirst,this.prevLast);
this.callback("itemVisibleOutCallback",G,H,this.prevFirst,this.prevLast,this.first,this.last)
},callback:function(K,N,G,L,J,I,H){if(this.options[K]==null||(typeof this.options[K]!="object"&&N!="onAfterAnimation")){return 
}var O=typeof this.options[K]=="object"?this.options[K][N]:this.options[K];
if(!E.isFunction(O)){return 
}var P=this;
if(L===undefined){O(P,G,N)
}else{if(J===undefined){this.get(L).each(function(){O(P,this,L,G,N)
})
}else{var Q=function(R){P.get(R).each(function(){O(P,this,R,G,N)
})
};
for(var M=L;
M<=J;
M++){if(M!==null&&!(M>=I&&M<=H)){Q(M)
}}}}},create:function(G){return this.format("<li></li>",G)
},format:function(J,I){J=E(J);
var H=J.get(0).className.split(" ");
for(var G=0;
G<H.length;
G++){if(H[G].indexOf("jcarousel-")!=-1){J.removeClass(H[G])
}}J.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+I)).css({"float":(this.options.rtl?"right":"left"),"list-style":"none"}).attr("jcarouselindex",I);
return J
},className:function(G){return G+" "+G+(!this.options.vertical?"-horizontal":"-vertical")
},dimension:function(I,J){var H=E(I);
if(J==null){return !this.options.vertical?(H.outerWidth(true)||C.intval(this.options.itemFallbackDimension)):(H.outerHeight(true)||C.intval(this.options.itemFallbackDimension))
}else{var G=!this.options.vertical?J-C.intval(H.css("marginLeft"))-C.intval(H.css("marginRight")):J-C.intval(H.css("marginTop"))-C.intval(H.css("marginBottom"));
E(H).css(this.wh,G+"px");
return this.dimension(H)
}},clipping:function(){return !this.options.vertical?this.clip[0].offsetWidth-C.intval(this.clip.css("borderLeftWidth"))-C.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-C.intval(this.clip.css("borderTopWidth"))-C.intval(this.clip.css("borderBottomWidth"))
},index:function(G,H){if(H==null){H=this.options.size
}return Math.round((((G-1)/H)-Math.floor((G-1)/H))*H)+1
}});
C.extend({defaults:function(G){return E.extend(F,G||{})
},intval:function(G){G=parseInt(G,10);
return isNaN(G)?0:G
},windowLoaded:function(){D=true
}});
E.fn.jcarousel=function(I){if(typeof I=="string"){var G=E(this).data("jcarousel"),H=Array.prototype.slice.call(arguments,1);
return G[I].apply(G,H)
}else{return this.each(function(){var J=E(this).data("jcarousel");
if(J){if(I){E.extend(J.options,I)
}J.reload()
}else{E(this).data("jcarousel",new C(this,I))
}})
}}
})(B)
})(window.$CQ||window.$||function(){throw new Error("jQuery is not defined")
}(),window.$CQ||window.$);
if(!window.CQ_Analytics){window.CQ_Analytics={}
}CQ_Analytics.Operator=(function(){return function(){}
})();
CQ_Analytics.Operator.IS="is";
CQ_Analytics.Operator.EQUALS="equals";
CQ_Analytics.Operator.NOT_EQUAL="notequal";
CQ_Analytics.Operator.GREATER="greater";
CQ_Analytics.Operator.GREATER_OR_EQUAL="greaterorequal";
CQ_Analytics.Operator.OLDER="older";
CQ_Analytics.Operator.OLDER_OR_EQUAL="olderorequal";
CQ_Analytics.Operator.LESS="less";
CQ_Analytics.Operator.LESS_OR_EQUAL="lessorequal";
CQ_Analytics.Operator.YOUNGER="younger";
CQ_Analytics.Operator.YOUNGER_OR_EQUAL="youngerorequal";
CQ_Analytics.Operator.CONTAINS="contains";
CQ_Analytics.Operator.BEGINS_WITH="beginswith";
CQ_Analytics.OperatorActions=function(){var mapping={};
var addOperator=function(name,text,operation){mapping[name]=[text,operation]
};
addOperator(CQ_Analytics.Operator.EQUALS,CQ.I18n.getMessage("equals"),"==");
addOperator(CQ_Analytics.Operator.IS,CQ.I18n.getMessage("is"),"==");
addOperator(CQ_Analytics.Operator.NOT_EQUAL,CQ.I18n.getMessage("is not equal to"),"!=");
addOperator(CQ_Analytics.Operator.GREATER,CQ.I18n.getMessage("is greater than"),">");
addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL,CQ.I18n.getMessage("is equal to or greater than"),">=");
addOperator(CQ_Analytics.Operator.OLDER,CQ.I18n.getMessage("is older than"),">");
addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL,CQ.I18n.getMessage("is equal to or older than"),">=");
addOperator(CQ_Analytics.Operator.LESS,CQ.I18n.getMessage("is less than"),"<");
addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL,CQ.I18n.getMessage("is equal to or less than"),"<=");
addOperator(CQ_Analytics.Operator.YOUNGER,CQ.I18n.getMessage("is younger than"),"<");
addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL,CQ.I18n.getMessage("is equal to or younger than"),"<=");
addOperator(CQ_Analytics.Operator.CONTAINS,CQ.I18n.getMessage("contains",null,"Ex: language contains french, Ex: gender contains female"),function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())!=-1
}return true
}return false
});
addOperator(CQ_Analytics.Operator.BEGINS_WITH,"begins with",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())==0
}return true
}return false
});
var getByIndex=function(op,index){if(mapping[op]&&mapping[op][index]){return mapping[op][index]
}return""
};
var escapeQuote=function(str){if(str){str=str.replace(new RegExp("\\'","ig"),str)
}return str
};
return{getText:function(operator){return getByIndex(operator,0)
},getOperation:function(operator){return getByIndex(operator,1)
},operate:function(object,property,operator,value,valueFormat){try{if(object&&object[property]){var toEval="";
var op=this.getOperation(operator);
op=op?op:operator;
var objectValue=CQ.shared.XSS.getXSSTablePropertyValue(object,property);
if(typeof op=="function"){return op.call(this,objectValue,value,valueFormat)
}else{if(valueFormat){toEval=valueFormat+"("+objectValue+") "+op+" "+valueFormat+"("+value+")"
}else{var s1=escapeQuote(objectValue);
var s2=escapeQuote(value);
toEval="'"+s1+"' "+op+" '"+s2+"'"
}var b=eval(toEval);
return b
}}}catch(e){}return false
}}
}();
var RUZEE=window.RUZEE||{};
RUZEE.ShadedBorder={create:function(Q){var M=/msie/i.test(navigator.userAgent)&&!window.opera;
var a=M&&!window.XMLHttpRequest;
function S(n,b){for(k in b){if(/ie_/.test(k)){if(M){n.style[k.substr(3)]=b[k]
}}else{n.style[k]=b[k]
}}}function V(n){var b=document.createElement("div");
b.className="sb-gen";
S(b,n);
return b
}function T(b){b=b<0?0:b;
if(b>0.99999){return""
}return M?" filter:alpha(opacity="+(b*100)+");":" opacity:"+b+";"
}var I=Q.shadow||0;
var c=Q.corner||0;
var G=0;
var F=Q.border||0;
var H=Q.borderOpacity||1;
var X=I!=0;
var P=c>I?c:I;
var R=P;
var B=P;
var j=P;
if(F>0){G=c;
c=c-F
}var L=c!=0&&X?Math.round(P/3):0;
var K=L;
var O=Math.round(L/2);
var N=c>0?"sb-inner":"sb-shadow";
var U="sb-shadow";
var f="sb-border";
var J=Q.edges||"trlb";
if(!/t/i.test(J)){B=0
}if(!/b/i.test(J)){j=0
}if(!/l/i.test(J)){P=0
}if(!/r/i.test(J)){R=0
}var e={position:"absolute",left:"0",top:"0",width:P+"px",height:B+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"};
var A=V(e);
delete e.left;
e.right="0";
e.width=R+"px";
var l=V(e);
delete e.top;
e.bottom="0";
e.height=j+"px";
var d=V(e);
delete e.right;
e.left="0";
e.width=P+"px";
var g=V(e);
var h=V({position:"absolute",width:"100%",height:B+"px",ie_fontSize:"1px",top:"0",left:"0",overflow:"hidden",margin:"0",padding:"0"});
var Z=V({position:"relative",height:B+"px",ie_fontSize:"1px",margin:"0 "+R+"px 0 "+P+"px",overflow:"hidden",padding:"0"});
h.appendChild(Z);
var Y=V({position:"absolute",left:"0",bottom:"0",width:"100%",height:j+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"});
var m=V({position:"relative",height:j+"px",ie_fontSize:"1px",margin:"0 "+R+"px 0 "+P+"px",overflow:"hidden",padding:"0"});
Y.appendChild(m);
var E=V({position:"absolute",top:(-j)+"px",left:"0",width:"100%",height:"100%",overflow:"hidden",ie_fontSize:"1px",padding:"0",margin:"0"});
function W(p,AD,AH){var AA=AH?P:R;
var AK=AD?B:j;
var AE=AD?O:-O;
var u=[];
var q=[];
var b=[];
var AB=0;
var AI=1;
if(AH){AB=AA-1;
AI=-1
}for(var z=0;
z<AA;
++z){var AL=AK-1;
var n=-1;
if(AD){AL=0;
n=1
}var r=false;
for(var v=AK-1;
v>=0&&!r;
--v){var AF='<div style="position:absolute; top:'+AL+"px; left:"+AB+"px; width:1px; height:1px; overflow:hidden; margin:0; padding:0;";
var AJ=z-L;
var o=v-K-AE;
var AM=Math.sqrt(AJ*AJ+o*o);
var AC=false;
if(c>0){if(AJ<0&&o<G&&o>=c||o<0&&AJ<G&&AJ>=c){u.push(AF+T(H)+'" class="'+f+'"></div>')
}else{if(AM<G&&AM>=c-1&&AJ>=0&&o>=0){var AN=AF;
if(AM>=G-1){AN+=T((G-AM)*H);
AC=true
}else{AN+=T(H)
}u.push(AN+'" class="'+f+'"></div>')
}}var AN=AF+" z-index:2;"+(AD?"background-position:0 -"+(c-o-1)+"px;":"background-image:none;");
var AG=function(){if(!AD){AN=AN.replace(/top\:\d+px/,"top:0px")
}AN=AN.replace(/height\:1px/,"height:"+(v+1)+"px");
q.push(AN+'" class="'+N+'"></div>');
r=true
};
if(AJ<0&&o<c||o<0&&AJ<c){AG()
}else{if(AM<c&&AJ>=0&&o>=0){if(AM>=c-1){AN+=T(c-AM);
AC=true;
q.push(AN+'" class="'+N+'"></div>')
}else{AG()
}}else{AC=true
}}}else{AC=true
}if(I>0&&AC){AM=Math.sqrt(z*z+v*v);
if(AM<I){b.push(AF+" z-index:0; "+T(1-(AM/I))+'" class="'+U+'"></div>')
}}AL+=n
}AB+=AI
}p.innerHTML=b.concat(u.concat(q)).join("")
}function C(q){var p=[];
p.push('<div style="position:relative; top:'+(B+j)+"px; height:2048px;  margin:0 "+(R-c-L)+"px 0 "+(P-c-L)+"px;  padding:0; overflow:hidden; background-position:0 "+(B>0?-(c+K+O):"0")+'px;" class="'+N+'"></div>');
var n='<div style="position:absolute; width:1px; top:'+(B+j)+"px; height:2048px; padding:0; margin:0;";
if(I>0){for(var b=0;
b<P-c-L;
++b){p.push(n+" left:"+b+"px;"+T((b+1)/P)+'" class="'+U+'"></div>')
}for(var b=0;
b<R-c-L;
++b){p.push(n+" right:"+b+"px;"+T((b+1)/R)+'" class="'+U+'"></div>')
}}if(F>0){var o=" width:"+F+"px;"+T(H)+'" class="'+f+'"></div>';
p.push(n+" left:"+(P-G-L)+"px;"+o);
p.push(n+" right:"+(R-G-L)+"px;"+o)
}q.innerHTML=p.join("")
}function D(q,n){var r=[];
var p=n?B:j;
var b='<div style="height:1px; overflow:hidden; position:absolute; margin:0; padding:0; width:100%; left:0px; ';
var o=n?O:-O;
for(var u=0;
u<p-o-K-c;
++u){if(I>0){r.push(b+(n?"top:":"bottom:")+u+"px;"+T((u+1)*1/p)+'" class="'+U+'"></div>')
}}if(u>=F){r.push(b+(n?"top:":"bottom:")+(u-F)+"px;"+T(H)+" height:"+F+'px;" class="'+f+'"></div>')
}r.push(b+(n?"background-position-y:0; top:":"background-image:none; bottom:")+u+"px; height:"+(c+K+o)+'px;" class="'+N+'"></div>');
q.innerHTML=r.join("")
}W(A,true,true);
W(l,true,false);
W(g,false,true);
W(d,false,false);
C(E);
D(Z,true);
D(m,false);
return{render:function(n){if(typeof n=="string"){n=document.getElementById(n)
}if(n.length!=undefined){for(var q=0;
q<n.length;
++q){this.render(n[q])
}return 
}n.className+=" sb";
S(n,{position:"relative",background:"transparent"});
var o=n.firstChild;
while(o){var p=o.nextSibling;
if(o.nodeType==1&&o.className=="sb-gen"){n.removeChild(o)
}o=p
}var u=n.firstChild;
var r=h.cloneNode(true);
var t=E.cloneNode(true);
var s=Y.cloneNode(true);
n.insertBefore(A.cloneNode(true),u);
n.insertBefore(l.cloneNode(true),u);
n.insertBefore(g.cloneNode(true),u);
n.insertBefore(d.cloneNode(true),u);
n.insertBefore(r,u);
n.insertBefore(t,u);
n.insertBefore(s,u);
if(a){n.onmouseover=function(){this.className+=" hover"
};
n.onmouseout=function(){this.className=this.className.replace(/ hover/,"")
};
window.setTimeout(function(){n.className+=" hover";
n.className=n.className.replace(/ hover/,"")
},100)
}if(M){function b(){r.style.width=s.style.width=t.style.width=n.offsetWidth+"px";
t.firstChild.style.height=n.offsetHeight+"px"
}n.onresize=b;
b()
}}}
}};
CQ_Analytics.Utils=new function(){return{registerDocumentEventHandler:function(C,B){var A=window.document[C];
if(typeof window.document[C]!="function"){window.document[C]=B
}else{window.document[C]=function(D){if(A){A(D)
}B(D)
}
}},eventWrapper:function(A){return function(D){var C,B;
if(document.all){C=window.event.keyCode;
B=window.event
}else{C=(typeof (D.which)!="undefined")?D.which:0;
B=D
}if(B){A(B,C)
}}
},loadElement:function(A,B){$CQ("#"+B).load(A)
},loadTeaserElement:function(A,D){var E=$CQ("#"+D).css("height");
var F=$CQ("#"+D).height();
if(F>0){$CQ("#"+D).css("height",F)
}var G=function(L){if(L&&L!=""){var K=$CQ(L).css("display","none");
$CQ("#"+D).append(K);
K.fadeIn(function(){if(E&&E!="0px"){$CQ("#"+D).css("height",E)
}})
}else{if(E&&E!="0px"){$CQ("#"+D).css("height",E)
}}};
var H=function(K,L){if(!CQ_Analytics.Utils.teasersCache){CQ_Analytics.Utils.teasersCache={}
}CQ_Analytics.Utils.teasersCache[K]=L
};
var B=function(){if(CQ_Analytics.Utils.teasersCache&&CQ_Analytics.Utils.teasersCache[A]){G(CQ_Analytics.Utils.teasersCache[A])
}else{CQ_Analytics.Utils.teasersLoading=CQ_Analytics.Utils.teasersLoading||{};
if(CQ_Analytics.Utils.teasersLoading[A]){window.setTimeout(function(){CQ_Analytics.Utils.loadTeaserElement(A,D)
},100)
}else{CQ_Analytics.Utils.teasersLoading[A]=true;
I()
}}};
var I=function(){CQ.shared.HTTP.get(A,function(N,M,K){if(M){var L=K.body;
if(L){L=L.replace(new RegExp("\\n","ig"),"");
L=L.replace(new RegExp("\\r","ig"),"");
H(A,L);
B();
delete CQ_Analytics.Utils.teasersLoading[A]
}}else{H(A,"")
}})
};
var C=$CQ("#"+D).children().length;
if(C>0){var J=0;
$CQ("#"+D).children().fadeOut(function(){var K=$CQ(this);
window.setTimeout(function(){K.remove();
J++;
if(J>=C){B()
}},50)
})
}else{B()
}},clearElement:function(A){if(A){$CQ("#"+A).html("")
}},indexOf:function(D,C){for(var B=0,A=D.length;
B<A;
B++){if(D[B]==C){return B
}}return -1
},load:function(A,C,B){return CQ.shared.HTTP.get(A,C,B)
},post:function(A,D,C,B){return CQ.shared.HTTP.post(A,D,C,B)
},getPagePath:function(){return CQ.shared.HTTP.getPath()
},getPath:function(A){return CQ.shared.HTTP.getPath(A)
},addParameter:function(B,A,C){return CQ.shared.HTTP.addParameter(B,A,C)
},removeParameters:function(A){return CQ.shared.HTTP.removeParameters(A)
},removeAnchor:function(A){return CQ.shared.HTTP.removeAnchor(A)
},getSchemeAndAuthority:function(A){return CQ.shared.HTTP.getSchemeAndAuthority(A)
},internalize:function(A,B){return CQ.shared.HTTP.internalize(B)
},externalize:function(A,B){return CQ.shared.HTTP.externalize(A,B)
},encodePathOfURI:function(A){return CQ.shared.HTTP.encodePathOfURI(A)
},encodePath:function(A){return CQ.shared.HTTP.encodePath(A)
},getContextPath:function(){return CQ.shared.HTTP.getContextPath()
},detectContextPath:function(){return CQ.shared.HTTP.detectContextPath()
},urlEncode:function(H){if(!H){return""
}if(typeof H=="string"){return H
}var C=[];
for(var F in H){var E=H[F],B=encodeURIComponent(F);
var G=typeof E;
if(G=="undefined"){C.push(B,"=&")
}else{if(G!="function"&&G!="object"){C.push(B,"=",encodeURIComponent(E),"&")
}else{if(typeof E=="array"){if(E.length){for(var D=0,A=E.length;
D<A;
D++){C.push(B,"=",encodeURIComponent(E[D]===undefined?"":E[D]),"&")
}}else{C.push(B,"=&")
}}}}}C.pop();
return C.join("")
},getUID:function(){var A=Math.floor(Math.random()*(Math.pow(2,42)-1));
return this.getTimestamp().toString(16)+A.toString(16)
},getTimestamp:function(){var A=new Date();
return A.getTime()
},insert:function(D,C,B){if(!D||isNaN(C)||!B){return D
}var A="";
var F=0;
var E=C;
while(E<D.length){A+=D.substring(F,E)+B;
F+=C;
E+=C
}if(F<D.length){A+=D.substring(F)
}return A
},addListener:function(){if(window.addEventListener){return function(D,B,C,A){D.addEventListener(B,C,(A))
}
}else{if(window.attachEvent){return function(D,B,C,A){D.attachEvent("on"+B,C)
}
}else{return function(){}
}}},removeListener:function(){if(window.removeEventListener){return function(D,B,C,A){D.removeEventListener(B,C,(A))
}
}else{if(window.detachEvent){return function(C,A,B){C.detachEvent("on"+A,B)
}
}else{return function(){}
}}}}
};
CQ_Analytics.ClickstreamcloudRenderingUtils=new function(){return{createLink:function(F,D,B,A){var C=document.createElement("a");
C.href=A;
C.onclick=D;
C.innerHTML=F;
if(B){for(var E in B){if(B.hasOwnProperty(E)){C[E]=B[E]
}}}return C
},createStaticLink:function(D,A,C){var B=document.createElement("a");
B.href=A;
B.innerHTML=D;
B.title=C;
B.alt=C;
return B
},createNameValue:function(B,D,A,E){var C=document.createElement("span");
C.className=A||"ccl-data";
C.innerHTML=B+" = "+D;
C.title=E;
C.alt=E;
return C
},createText:function(D,A,C){var B=document.createElement("span");
B.className=A||"ccl-data";
if(D&&D.indexOf&&((D.indexOf("/home")!=-1&&D.indexOf("/image")!=-1)||(D.indexOf("/")!=-1&&D.indexOf(".png")!=-1))){B.innerHTML='<img src="'+D+'.prof.thumbnail.png" border="0">'
}else{if(D&&D.indexOf&&D.indexOf("www.gravatar.com")!=-1){B.innerHTML='<img src="'+D+'">'
}else{B.innerHTML=D
}}B.title=C;
B.alt=C;
return B
},createEditablePropertySpan:function(B,D){var A="var editSpan = this.nextSibling; this.style.display = 'none'; editSpan.style.display = 'block';";
var E="var editSpan = this.parentNode; var readSpan = this.parentNode.previousSibling;var newValue = this.value;editSpan.style.display = 'none'; readSpan.innerHTML = '"+B+" = '+value; readSpan.style.display = 'block';";
var C=document.createElement("span");
C.innerHTML='<span class="ccl-data" onclick="'+A+'">'+B+" = "+D+"</span>";
C.innerHTML+='<span class="ccl-data" style="display: none;">'+B+' = <input class="ccl-input" type="text" value="'+D+'" onblur="'+E+'"></span>';
C.className="ccl-data";
return C
}}
};
CQ_Analytics.ClientContextUtils=new function(){return{renderStoreProperty:function(F,C,B,D,E,A){if(CQ_Analytics&&CQ_Analytics.CCM){CQ_Analytics.CCM.onReady(function(){var G=function(){var H=CQ_Analytics.StoreRegistry.getStore(C);
if(H){var I=function(){var L=H.getProperty(B)||A;
var K=$CQ("#"+F);
if(K.attr("contenteditable")&&K.attr("contenteditable")!="inherit"){return 
}if(typeof (L)=="string"&&((L.indexOf("/")==0&&(L.toLowerCase().indexOf(".png")!=-1||L.toLowerCase().indexOf(".jpg")!=-1||L.toLowerCase().indexOf(".gif")!=-1)||L.toLowerCase().indexOf("http")==0))){if(!L||L==""){K.children().remove();
K.html("No "+B)
}else{var J="";
if(K.parents(".cq-cc-thumbnail").length==0||L.toLowerCase().indexOf("http")==0||L.indexOf("/libs/wcm/mobile")==0){J=L.replace(new RegExp("&amp;","g"),"&")
}else{J="/etc/clientcontext/shared/thumbnail/content.png";
J=CQ.shared.HTTP.addParameter(J,"path",CQ_Analytics.Variables.replaceVariables(L))
}J=CQ_Analytics.Variables.replaceVariables(J);
if(K.find("div").css("background-image")!="url("+J+")"){if(H.fireEvent("beforepropertyrender",H,F)!==false){K.html("");
K.children().remove();
$CQ("<div>").addClass("cq-cc-thumbnail-img").css("background-image","url("+_g.shared.HTTP.externalize(J)+")").appendTo(K);
H.fireEvent("propertyrender",H,F)
}}}}else{L=CQ_Analytics.Variables.replaceVariables(L);
L=(!L||L=="")?"No "+B:L=D+L+E;
if(K.html()!=L){if(H.fireEvent("beforepropertyrender",H,F)!==false){K.html(L);
H.fireEvent("propertyrender",H,F)
}}}};
if(H.fireEvent("beforeinitialpropertyrender",H,F)!==false){I();
if(H.addListener){H.addListener("update",function(){I()
})
}H.fireEvent("initialpropertyrender",H,F)
}}};
CQ_Analytics.ClientContextUtils.onStoreRegistered(C,G)
})
}},renderStore:function(B,A){if(CQ_Analytics&&CQ_Analytics.CCM&&B&&A){CQ_Analytics.CCM.onReady(function(){var C=function(){var D=CQ_Analytics.StoreRegistry.getStore(A);
if(D){D.divId=B;
var E=function(){if(D.fireEvent("beforerender",D,D.divId)!==false){D.renderer(D,D.divId);
D.fireEvent("render",D,D.divId)
}};
if(D.fireEvent("beforeinitialrender",D,B)!==false){E();
if(D.addListener){D.addListener("update",function(){E()
})
}D.fireEvent("initialrender",D,B)
}}};
CQ_Analytics.ClientContextUtils.onStoreRegistered(A,C)
})
}},storesOptionsProvider:function(){var C=[];
var A=CQ_Analytics.StoreRegistry.getStores();
for(var B in A){C.push({value:B})
}return C
},storePropertiesOptionsProvider:function(C,E){var B=[];
var A=CQ_Analytics.StoreRegistry.getStore(C);
if(A){var G=A.getPropertyNames();
for(var D=0;
D<G.length;
D++){var F=G[D];
if(!CQ.shared.XSS.KEY_REGEXP.test(F)){var H={value:F};
if(E){H.text=F+" - "+A.getProperty(F)
}B.push(H)
}}}return B
},onStoreRegistered:function(B,C){if(C){var A=CQ_Analytics.StoreRegistry.getStore(B);
if(A){C.call(A,A)
}else{CQ_Analytics.CCM.addListener("storeregister",function(E,D){if(D.getName()==B){C.call(D,D)
}})
}}},onStoreInitialized:function(C,E,B){if(B===true){B=CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY
}var D=function(){var F=CQ_Analytics.StoreRegistry.getStore(C);
if(F.DELAYED_INIT_TIMEOUT){window.clearTimeout(F.DELAYED_INIT_TIMEOUT);
F.DELAYED_INIT_TIMEOUT=null
}if(B>0){F.DELAYED_INIT_TIMEOUT=window.setTimeout(function(){F.DELAYED_INIT_TIMEOUT=null;
E.call(F,"initialize",F)
},B)
}else{E.call(F,"initialize",F)
}};
var A=CQ_Analytics.StoreRegistry.getStore(C);
if(A){if(A.isInitialized()){D.call(A);
A.addListener("initialize",function(G,F){D.call(F)
})
}else{A.addListener("initialize",function(G,F){D.call(F)
})
}}else{CQ_Analytics.CCM.addListener("storeregister",function(G,F){if(F.getName()==C){CQ_Analytics.ClientContextUtils.onStoreInitialized(C,E,B)
}})
}},init:function(D,C){CQ_Analytics.ClientContextMgr.PATH=D;
CQ_Analytics.ClientContextMgr.loadConfig(null,true);
var A=CQ.shared.HTTP.externalize(D+"/content/jcr:content/stores.init.js");
A=CQ.shared.HTTP.addParameter(A,"path",C);
A=CQ.shared.HTTP.noCaching(A);
var B=CQ.shared.HTTP.get(A)
},initUI:function(B,A){CQ_Analytics.ClientContextUI.create(B,A)
}}
};
CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY=200;
CQ_Analytics.Variables=new function(){return{containsVariable:function(A){return CQ_Analytics.Variables.getVariables(A).length>0
},getVariables:function(B){if(!B||typeof (B)!="string"){return[]
}var A=B.match(new RegExp("\\$\\{([\\w/]*)\\}","ig"));
return A?A:[]
},replaceVariables:function(E){if(!E){return E
}var F="";
var D=E;
var G=CQ_Analytics.Variables.getVariables(E);
while(G.length>0&&F.indexOf(G.join())==-1){for(var C=0;
C<G.length;
C++){var B=G[C].substring(2,G[C].length-1);
var A=CQ_Analytics.ClientContext.get(B)||"";
D=CQ_Analytics.Variables.replace(D,B,A)
}F+=G.join();
G=CQ_Analytics.Variables.getVariables(D)
}return D
},replace:function(A,B,C){return A.replace(new RegExp("\\$\\{"+B+"\\}","ig"),C)
}}
};
CQ_Analytics.Cookie={set:function(C,D,E){var A="";
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
},erase:function(A){CQ_Analytics.Cookie.set(A,"",-1)
}};
CQ_Analytics.SessionPersistence=function(){return{COOKIE_NAME:"SessionPersistence-"+CQURLInfo.runModes.replace(",","-"),set:function(C,D){if(C!="PROFILEDATA"){D=D||"";
var F=this.getMap();
if(!F){F=""
}var B=F.indexOf(C+":=");
if(B==-1){F+=C+":="+D+"|"
}else{var E=F.substring(0,B);
var A=F.substring(F.indexOf("|",B+2)+1);
F=E+C+":="+D+"|"+A
}this.setMap(F)
}},get:function(B){var D=this.getMap();
var C="";
if(D){var A=D.indexOf(B+":=");
if(A!=-1){C=D.substring(A+(B+":=").length,D.indexOf("|",A+2))
}}C=(C=="null"?"":(C||""));
return C
},getMap:function(){var A=CQ_Analytics.Cookie.read(this.COOKIE_NAME);
if(A){return decodeURIComponent(A)
}return null
},setMap:function(A){CQ_Analytics.Cookie.set(this.COOKIE_NAME,encodeURIComponent(A),365)
},clearMap:function(){CQ_Analytics.Cookie.erase(this.COOKIE_NAME)
},remove:function(C){var E=this.getMap();
if(!E){E=""
}var B=E.indexOf(C+":=");
if(B!=-1){var D=E.substring(0,B);
var A=E.substring(E.indexOf("|",B+2)+1);
E=D+A
}this.setMap(E)
}}
};
CQ_Analytics.Observable=function(){this.fireEvent=function(D){if(D&&this.listeners){D=D.toLowerCase();
var B=Array.prototype.slice.call(arguments,0);
for(var C=0;
C<this.listeners.length;
C++){var A=this.listeners[C];
if(D==A.event){if(A.fireFn.apply(A.scope||this||window,B)===false){return false
}}}}return true
}
};
CQ_Analytics.Observable.prototype.addListener=function(C,A,B){this.listeners=this.listeners||new Array();
if(C&&A){this.listeners.push({event:C.toLowerCase(),fireFn:A,scope:B})
}};
CQ_Analytics.Observable.prototype.removeListener=function(C,A){this.listeners=this.listeners||new Array();
if(C&&A){for(var B=0;
B<this.listeners.length;
B++){if(this.listeners[B].event==C&&this.listeners[B].fireFn==A){this.listeners.splice(B,1)
}}}};
CQ_Analytics.Observable.prototype.listeners=null;
if(!CQ_Analytics.StoreRegistry){CQ_Analytics.StoreRegistry=new function(){var A={};
return{register:function(B){if(B.STORENAME){A[B.STORENAME]=B
}},getStores:function(){return A
},getStore:function(B){return A[B]
}}
}()
}CQ_Analytics.SessionStore=function(){};
CQ_Analytics.SessionStore.prototype=new CQ_Analytics.Observable();
CQ_Analytics.SessionStore.prototype.setProperty=function(A,C){if(this.data==null){this.init()
}this.data[A]=C;
var B=CQ.shared.XSS.getXSSPropertyName(A);
this.data[B]=CQ.shared.XSS.getXSSValue(C);
this.fireEvent("update",A)
};
CQ_Analytics.SessionStore.prototype.initialized=false;
CQ_Analytics.SessionStore.prototype.init=function(){this.initialized=true;
this.fireEvent("initialize",this)
};
CQ_Analytics.SessionStore.prototype.getLabel=function(A){return A
};
CQ_Analytics.SessionStore.prototype.getLink=function(A){return A
};
CQ_Analytics.SessionStore.prototype.removeProperty=function(A){if(this.data==null){this.init()
}if(this.data[A]){delete this.data[A]
}var B=CQ.shared.XSS.getXSSPropertyName(A);
if(this.data[B]){delete this.data[B]
}this.fireEvent("update",A)
};
CQ_Analytics.SessionStore.prototype.getPropertyNames=function(A){if(this.data==null){this.init()
}A=A?A:[];
var B=new Array();
for(var C in this.data){if(CQ_Analytics.Utils.indexOf(A,C)==-1){B.push(C)
}}return B
};
CQ_Analytics.SessionStore.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SessionStore.prototype.clear=function(){this.data=null
};
CQ_Analytics.SessionStore.prototype.getData=function(B){if(this.data==null){this.init()
}if(B){var A={};
for(var C in this.data){if(CQ_Analytics.Utils.indexOf(B,C)==-1){A[C]=this.data[C]
}}return A
}else{return this.data
}};
CQ_Analytics.SessionStore.prototype.reset=function(){if(this.data!=null){this.data=null;
this.fireEvent("update")
}};
CQ_Analytics.SessionStore.prototype.getProperty=function(B,A){if(this.data==null){this.init()
}if(!A){var C=CQ.shared.XSS.getXSSPropertyName(B);
if(this.data[C]){return this.data[C]
}}return this.data[B]
};
CQ_Analytics.SessionStore.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.SessionStore.prototype.addInitProperty=function(A,B){if(!this.initProperty){this.initProperty={}
}this.initProperty[A]=B
};
CQ_Analytics.SessionStore.prototype.getInitProperty=function(A){return this.initProperty?this.initProperty[A]:null
};
CQ_Analytics.SessionStore.prototype.loadInitProperties=function(C,A){if(C){for(var B in C){this.addInitProperty(B,C[B]);
if(A&&this.data&&this.data[B]===undefined){this.setProperty(B,C[B])
}}}};
CQ_Analytics.SessionStore.prototype.isInitialized=function(){return this.initialized
};
CQ_Analytics.PersistedSessionStore=function(){};
CQ_Analytics.PersistedSessionStore.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY="key";
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted=function(A){if(!this.nonPersisted){this.nonPersisted={}
}this.nonPersisted[A]=true
};
CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX="^generated*";
CQ_Analytics.PersistedSessionStore.prototype.isPersisted=function(A){if(!this.nonPersisted){this.nonPersisted={}
}return this.nonPersisted[A]!==true&&!new RegExp(CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX,"ig").test(A)&&!$CQ.isFunction(this.data[A])&&(typeof this.data[A])!="object"
};
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey=function(){return this.STOREKEY
};
CQ_Analytics.PersistedSessionStore.prototype.persist=function(){if(this.fireEvent("beforepersist")!==false){var A=new CQ_Analytics.SessionPersistence();
A.set(this.getStoreKey(),this.toString());
this.fireEvent("persist")
}};
CQ_Analytics.PersistedSessionStore.prototype.setProperty=function(A,C){if(this.data==null){this.init()
}this.data[A]=C;
var B=CQ.shared.XSS.getXSSPropertyName(A);
this.data[B]=CQ.shared.XSS.getXSSValue(C);
if(this.isPersisted(A)){this.persist()
}this.fireEvent("update",A)
};
CQ_Analytics.PersistedSessionStore.prototype.toString=function(){var B=null;
if(this.data){var A=function(E){if(!E||typeof (E)!="string"){return E
}var D=E;
D=D.replace(new RegExp(",","g"),"&#44;");
D=D.replace(new RegExp("=","g"),"&#61;");
D=D.replace(new RegExp("\\|","g"),"&#124;");
return D
};
for(var C in this.data){if(this.isPersisted(C)&&this.data.hasOwnProperty(C)){B=(B===null?"":B+",");
B+=(C+"="+A(this.data[C]))
}}}return B
};
CQ_Analytics.PersistedSessionStore.prototype.parse=function(E){var D=function(H){if(!H||typeof (H)!="string"){return H
}var G=H;
G=G.replace(new RegExp("&#44;","g"),",");
G=G.replace(new RegExp("&#61;","g"),"=");
G=G.replace(new RegExp("&#124;","g"),"|");
return G
};
var C={};
var F=E.split(",");
for(var A in F){if(F.hasOwnProperty(A)){var B=F[A].split("=");
if(B.length==2){C[B[0]]=D(B[1])
}}}return C
};
CQ_Analytics.PersistedSessionStore.prototype.reset=function(A){if(this.data!=null){this.data={};
this.persist();
this.data=null;
if(!A){this.fireEvent("update")
}}};
CQ_Analytics.PersistedSessionStore.prototype.removeProperty=function(A){if(this.data==null){this.init()
}if(this.data[A]){delete this.data[A];
if(this.isPersisted(A)){this.persist()
}}this.fireEvent("update",A)
};
CQ_Analytics.PersistedSessionStore.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null
};
if(!CQ_Analytics.ClientContextMgr){CQ_Analytics.ClientContextMgr=function(){this.clientcontext=null;
this.clientcontextToServer=null;
this.stores={};
this.data=null;
this.config=null;
this.isConfigLoaded=false;
this.areStoresLoaded=false
};
CQ_Analytics.ClientContextMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ClientContextMgr.prototype.STOREKEY="CLIENTCONTEXT";
CQ_Analytics.ClientContextMgr.prototype.STORENAME="clientcontext";
CQ_Analytics.ClientContextMgr.prototype.INITIALIZATION_EVENT_TIMER=1000;
CQ_Analytics.ClientContextMgr.prototype.CONFIG_PATH=CQ_Analytics.Utils.externalize("/etc/clientcontext/legacy/config.json",true);
CQ_Analytics.ClientContextMgr.prototype.init=function(){this.clientcontext={};
this.clientcontextToServer={};
var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(B){this.data=this.parse(B)
}else{this.data={}
}this.initialized=true;
this.fireEvent("initialize",this)
};
CQ_Analytics.ClientContextMgr.prototype.getSessionId=function(){if(!this.data.sessionId){this.setSessionId(CQ_Analytics.Utils.getUID())
}return this.data.sessionId
};
CQ_Analytics.ClientContextMgr.prototype.setSessionId=function(A){if(A){this.setProperty("sessionId",A)
}};
CQ_Analytics.ClientContextMgr.prototype.getVisitorId=function(){return this.data.visitorId
};
CQ_Analytics.ClientContextMgr.prototype.setVisitorId=function(A){this.setProperty("visitorId",A)
};
CQ_Analytics.ClientContextMgr.prototype.getId=function(){var A=this.getVisitorId();
if(!A){return this.getSessionId()
}return A
};
CQ_Analytics.ClientContextMgr.prototype.isAnonymous=function(){var A=this.getVisitorId();
return(!A)
};
CQ_Analytics.ClientContextMgr.prototype.isMode=function(A){return CQ_Analytics.ClientContextMgr.ServerStorage.isMode(A)
};
CQ_Analytics.ClientContextMgr.prototype.get=function(A){if(this.clientcontext==null){this.init()
}if(A){return this.clientcontextToServer
}return this.clientcontext
};
CQ_Analytics.ClientContextMgr.prototype.register=function(C){if(this.clientcontext==null){this.init()
}var A=this;
this.clientcontext[C.getName()]=C.getData();
this.stores[C.getName()]=C;
CQ_Analytics.StoreRegistry.register(C);
var B=this.getStoreConfig(C.getName());
if(B.stats!==false&&B.stats!="false"){this.clientcontextToServer[C.getName()]=C.getData(B.excludedFromStats)
}if(this.initTimer){window.clearTimeout(this.initTimer);
this.initTimer=null
}this.initTimer=window.setTimeout(function(){A.fireEvent("storesinitialize");
A.areStoresInitialized=true
},this.INITIALIZATION_EVENT_TIMER);
C.addListener("update",function(){A.update(C)
});
CQ_Analytics.ClientContextMgr.ServerStorage.handleStoreRegistration(C);
this.addListener("clear",function(){C.clear()
});
this.fireEvent("storeregister",C);
this.fireEvent("storeupdate",C)
};
CQ_Analytics.ClientContextMgr.prototype.update=function(B){if(this.clientcontext==null){this.init()
}this.clientcontext[B.getName()]=B.getData();
var A=this.getStoreConfig(B.getName());
if(A.stats!==false&&A.stats!="false"){this.clientcontextToServer[B.getName()]=B.getData(A.excludedFromStats)
}this.fireEvent("storeupdate",B)
};
CQ_Analytics.ClientContextMgr.prototype.startPosting=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.startPosting()
};
CQ_Analytics.ClientContextMgr.prototype.stopPosting=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.stopPosting()
};
CQ_Analytics.ClientContextMgr.prototype.post=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.post()
};
CQ_Analytics.ClientContextMgr.prototype.getCCMToJCR=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.getCCMToJCR()
};
CQ_Analytics.ClientContextMgr.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.ClientContextMgr.prototype.clear=function(){this.clientcontext=null;
this.clientcontextToServer=null;
this.fireEvent("clear")
};
CQ_Analytics.ClientContextMgr.prototype.getRegisteredStore=function(A){return this.stores&&this.stores[A]?this.stores[A]:null
};
CQ_Analytics.ClientContextMgr.prototype.loadConfig=function(c,autoConfig){var setConfig=function(ccm,config){ccm.config=config;
ccm.isConfigLoaded=true;
ccm.fireEvent("configloaded");
ccm.fireEvent("storesloaded");
ccm.areStoresLoaded=true
};
if(c){setConfig(this,c)
}else{if(!autoConfig){var params={};
var pathOfPage=CQ_Analytics.Utils.getPagePath();
pathOfPage=pathOfPage.replace("/jcr:content/clickstreamcloud","");
params.path=pathOfPage;
params.cq_ck=new Date().valueOf();
var url=this.CONFIG_PATH;
url+="?"+CQ_Analytics.Utils.urlEncode(params);
CQ_Analytics.Utils.load(url,function(data,status,response){var config={};
try{config=eval("config = "+response.responseText)
}catch(error){}setConfig(this,config)
},this)
}else{setConfig(this,{})
}}};
CQ_Analytics.ClientContextMgr.prototype.getConfig=function(){return this.config
};
CQ_Analytics.ClientContextMgr.prototype.getStoreConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["store"]){return this.config.configs[A]["store"]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getEditConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["edit"]){return this.config.configs[A]["edit"]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getUIConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["ui"]){return this.config.configs[A]["ui"]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getInitialData=function(A){if(this.config&&this.config.data&&this.config.data[A]){return this.config.data[A]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getStores=function(){return this.stores
};
CQ_Analytics.ClientContextMgr.prototype.onReady=function(B,A){if(B){if(this.areStoresLoaded){B.call(A)
}else{this.addListener("storesloaded",B,A)
}}};
CQ_Analytics.ClientContextMgr=CQ_Analytics.CCM=new CQ_Analytics.ClientContextMgr();
CQ_Analytics.ClickstreamcloudMgr=CQ_Analytics.CCM;
CQ_Analytics.ContextCloudMgr=CQ_Analytics.CCM;
CQ_Analytics.ClientContextMgr.PATH=null;
CQ_Analytics.ClientContextMgr.getClientContextURL=function(A){return CQ_Analytics.ClientContextMgr.PATH+A
};
window.setTimeout(function(){CQ_Analytics.CCM.init()
},1);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var B in CQ_Analytics.ClientContextMgr){delete CQ_Analytics.ClientContextMgr[B]
}CQ_Analytics.ClientContextMgr=null
}catch(A){}CQ_Analytics.CCM=null
})
}if(CQ_Analytics.ClientContextMgr&&!CQ_Analytics.ClientContextMgr.ServerStorage){CQ_Analytics.ClientContextMgr.ServerStorage=function(){this.posting=false;
this.initialized=false
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_PAGELOAD=1;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_TIMER=2;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_DATAUPDATE=4;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_TIMER=600;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PROCESS_TIMER=60;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE=6;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PATH="/var/statistics/";
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.init=function(){if(this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER)){var A=this;
var B=function(){A.timer=window.setInterval(function(){try{var D=parseInt(A.data.lastPost);
var F=false;
if(isNaN(D)){F=true
}else{var E=new Date().getTime();
if(E>D+CQ_Analytics.ClientContextMgr.ServerStorage.POST_TIMER*1000){F=true
}}}catch(C){}if(F){A.post()
}},CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER*1000)
};
B.call(this)
}this.initialized=true
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.isMode=function(A){return(CQ_Analytics.CCM.POST_MODE&A)>0
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.handleStoreRegistration=function(A){if(!this.initialized){this.init()
}if(this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE)){A.addListener("persist",function(){CQ_Analytics.ClientContextMgr.ServerStorage.post(A)
})
}};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.startPosting=function(){this.posting=true
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.stopPosting=function(){this.posting=false
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.post=function(D,F){if(this.posting||F){try{var G=this.getCCMToJCR(D);
var E=CQ_Analytics.Utils.getTimestamp();
G["./jcr:primaryType"]="nt:unstructured";
G["./sessionId"]=CQ_Analytics.CCM.getSessionId();
var C=this.POST_PATH+"clientcontext/";
if(CQ_Analytics.CCM.isAnonymous()){var A=CQ_Analytics.Utils.insert(CQ_Analytics.CCM.getId(),2,"/");
C+="anonymous/"+A+"/"+E
}else{C+="users/"+CQ_Analytics.CCM.getId()+"/"+E
}CQ_Analytics.Utils.post(C,null,G);
this.lastPost=E
}catch(B){}}};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.getCCMToJCR=function(G){var C=CQ_Analytics.CCM.get(true);
var E={};
for(var I in C){if(!G||I==G){var A=C[I],B=encodeURIComponent(I);
var F=typeof A;
if(F=="object"){for(var D in A){var H=A[D];
D=D.replace(":","/");
E["./"+I+"/./"+D]=H
}}else{E["./"+I]=A
}}}return E
};
CQ_Analytics.ClientContextMgr.ServerStorage=new CQ_Analytics.ClientContextMgr.ServerStorage();
CQ_Analytics.ClickstreamcloudMgr.POST_MODE_PAGELOAD=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_PAGELOAD;
CQ_Analytics.ClickstreamcloudMgr.POST_MODE_TIMER=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER;
CQ_Analytics.ClickstreamcloudMgr.POST_MODE_DATAUPDATE=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE;
CQ_Analytics.ClickstreamcloudMgr.POST_TIMER=CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;
CQ_Analytics.ClickstreamcloudMgr.POST_PROCESS_TIMER=CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;
CQ_Analytics.ClickstreamcloudMgr.POST_MODE=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE;
CQ_Analytics.ClickstreamcloudMgr.POST_PATH=CQ_Analytics.ClientContextMgr.ServerStorage.POST_PATH
}if(!CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr=function(){this.SEGMENTATION_ROOT="/etc/segmentation";
this.SEGMENT_SELECTOR=".segment.js";
this.SEGMENTATION_SCRIPT_LOADER="cq-segmentation-loader";
this.segments={};
this.boosts={};
var A=this;
this.fireUpdate=function(){A.fireEvent("update")
};
this.init()
};
CQ_Analytics.SegmentMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.SegmentMgr.prototype.STORENAME="segments";
CQ_Analytics.SegmentMgr.prototype.register=function(A,C,B){this.segments[A]=C;
this.boosts[A]=!isNaN(B)?parseInt(B):0;
this.fireUpdate()
};
CQ_Analytics.SegmentMgr.prototype.resolveArray=function(E,G,B){G=G||CQ_Analytics.ClientContextMgr.get();
if(!(E instanceof Array)){return this.resolve(E,G)
}B=(B=="AND"?"AND":"OR");
var A=(B=="AND");
for(var D=0;
D<E.length;
D++){var F=E[D];
var C=this.resolve(F,G);
if(B=="AND"){if(C!==true){return C
}}else{if(C===true){return true
}}}return A
};
CQ_Analytics.SegmentMgr.prototype.resolve=function(segmentPath,clientcontext){clientcontext=clientcontext||CQ_Analytics.ClientContextMgr.get();
if(!segmentPath){return false
}if(segmentPath instanceof Array){return this.resolveArray(segmentPath,clientcontext)
}if(segmentPath.indexOf(this.SEGMENTATION_ROOT)!=0){return false
}if(segmentPath==this.SEGMENTATION_ROOT){return true
}if(!this.segments[segmentPath]){return true
}var parent=segmentPath.substring(0,segmentPath.lastIndexOf("/"));
if(parent.indexOf(this.SEGMENTATION_ROOT)==0){var pres=this.resolve(parent,clientcontext);
if(pres!==true){return pres
}}var rules="function(clientcontext, contextcloud, clickstreamcloud) { return true ";
rules+=" && ( "+this.segments[segmentPath]+" ) ";
rules+=";}";
var res=true;
try{var f=null;
eval("f = "+rules+"");
var e=(f==null||f(clientcontext,clientcontext,clientcontext));
res=res&&(e===true)
}catch(error){return"Unresolved - Error while evaluating segment "+segmentPath+" : "+error.message
}return res
};
CQ_Analytics.SegmentMgr.prototype.getResolved=function(C){C=C||CQ_Analytics.ClientContextMgr.get();
var A=new Array();
for(var B in this.segments){if(this.resolve(B,C)===true){A.push(B)
}}return A
};
CQ_Analytics.SegmentMgr.prototype.getMaxBoost=function(D,F){if(!(D instanceof Array)){return this.getBoost(D)
}var B=0;
for(var C=0;
C<D.length;
C++){var E=D[C];
if(this.resolve(E,F)===true){var A=this.boosts[E]||0;
if(A>B){B=A
}}}return B
};
CQ_Analytics.SegmentMgr.prototype.getBoost=function(A){if(!(A instanceof Array)){A=[A]
}return this.boosts[A]||0
};
CQ_Analytics.SegmentMgr.prototype.reload=function(path){var url=path;
if(!url){url=this.SEGMENTATION_ROOT
}if(url){if(url.indexOf(this.SEGMENT_SELECTOR)==-1){url+=this.SEGMENT_SELECTOR
}try{CQ_Analytics.Utils.load(url,function(config,status,response){if(response&&response.responseText){eval(response.responseText)
}},this);
var response=CQ.HTTP.get(scripts[i].src)
}catch(err){}}};
CQ_Analytics.SegmentMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SegmentMgr.prototype.getProperty=function(A){return A
};
CQ_Analytics.SegmentMgr.prototype.getLink=function(A){return A+".html"
};
CQ_Analytics.SegmentMgr.prototype.getLabel=function(C){if(C){var B=C;
var A=B.lastIndexOf("/");
if(A!=-1){B=B.substring(A+1,B.length)
}var D=this.resolve(C);
if(D===true){return B
}else{if(D!==true){return'<span class="invalid" title="'+D+'" alt="'+D+'">'+B+"</span>"
}}}return C
};
CQ_Analytics.SegmentMgr.prototype.getPropertyNames=function(){return this.getResolved()
};
CQ_Analytics.SegmentMgr=new CQ_Analytics.SegmentMgr();
CQ_Analytics.SegmentMgr.loadSegments=function(A){CQ_Analytics.SegmentMgr.areSegmentsLoaded=false;
CQ.shared.HTTP.get(CQ.shared.HTTP.externalize(A+".segment.js"));
CQ_Analytics.SegmentMgr.areSegmentsLoaded=true;
this.fireEvent("segmentsload")
};
CQ_Analytics.SegmentMgr.renderer=function(A,C){if(A&&A.STORENAME==CQ_Analytics.SegmentMgr.STORENAME){var E=A.getPropertyNames();
var F=$CQ("<div>");
for(var D=0;
D<E.length;
D++){var B=E[D];
F.append($CQ("<span>").attr("title",A.getProperty(B)).append($CQ("<a>").attr("href",_g.shared.HTTP.externalize(A.getLink(B))).attr("title",A.getProperty(B)).html(A.getLabel(B))))
}$CQ("#"+C).children().remove();
$CQ("#"+C).append(F)
}};
CQ_Analytics.ClientContextMgr.addListener("storeupdate",CQ_Analytics.SegmentMgr.fireUpdate);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var B in CQ_Analytics.SegmentMgr){delete CQ_Analytics.SegmentMgr[B]
}}catch(A){}CQ_Analytics.SegmentMgr=null
})
}if(!CQ_Analytics.StrategyMgr){CQ_Analytics.StrategyMgr=function(){this.strategies={}
};
CQ_Analytics.StrategyMgr.prototype={};
CQ_Analytics.StrategyMgr.prototype.isRegistered=function(A){return !!this.strategies[A]
};
CQ_Analytics.StrategyMgr.prototype.register=function(B,A){if(typeof A=="function"){this.strategies[B]=A
}};
CQ_Analytics.StrategyMgr.prototype.choose=function(B,A){if(A.length==1){return A[0]
}if(this.strategies[B]){return this.strategies[B].call(this,A)
}};
CQ_Analytics.StrategyMgr=new CQ_Analytics.StrategyMgr()
}CQ_Analytics.StrategyMgr.register("clickstream-score",function(H){if(H.length==1){return H[0]
}var A=[];
if(CQ_Analytics.TagCloudMgr){var K=CQ_Analytics.TagCloudMgr.getTags();
K=K||{};
var J=-1;
for(var E=0;
E<H.length;
E++){var G=0;
var I=H[E].tags;
if(I){for(var D=0;
D<I.length;
D++){var F=I[D].tagID;
G+=parseInt(K[F])||0
}}if(G==J){A.push(H[E])
}else{if(G>J){A=[];
A.push(H[E]);
J=G
}}}}else{A=H
}if(A.length==1){return A[0]
}var B=null;
if(CQ_Analytics.PageDataMgr){B=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!B){B=window.CQ_StrategyRandom
}if(!B){B=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(B)>1){B=1/B
}if(parseFloat(B)==1){B=0
}var C=Math.floor(B*A.length);
return A[C]
});
CQ_Analytics.StrategyMgr.register("first",function(A){return A[0]
});
CQ_Analytics.StrategyMgr.register("random",function(C){var A=null;
if(CQ_Analytics.PageDataMgr){A=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!A){A=window.CQ_StrategyRandom
}if(!A){A=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(A)>1){A=1/A
}if(parseFloat(A)==1){A=0
}var B=Math.floor(A*C.length);
return C[B]
});
if(!CQ_Analytics.ClickstreamcloudUI){CQ_Analytics.ClickstreamcloudUI=function(){this.SHOW_BOX_COOKIE="show-clickstreamcloud";
this.BOX_ID="clickstreamcloud";
this.box=null;
this.top=null;
this.sections=null;
this.bottom=null;
this.nbSection=0;
this.isRendered=false
};
CQ_Analytics.ClickstreamcloudUI.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClickstreamcloudUI.prototype.createBox=function(C){var A=this;
this.box=document.createElement("div");
this.box.id=this.BOX_ID;
this.box.style.display="none";
var D=document.createElement("div");
this.box.appendChild(D);
this.top=document.createElement("div");
this.top.className="ccl-header ccl-header-close";
this.addListener("close",function(){A.onVisibilityChange()
});
this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink("","#ccl",""));
this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink(CQ.I18n.getMessage("Close"),function(){A.box.style.display="none";
A.fireEvent("close")
},{className:"ccl-close"},"#ccl"));
if(this.hideLoadLink===false){this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink(CQ.I18n.getMessage("Load"),function(){A.fireEvent("loadclick")
},{className:"ccl-load"},"#ccl"))
}if(this.hideEditLink===false){this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink(CQ.I18n.getMessage("Edit"),function(){A.fireEvent("editclick")
},{className:"ccl-edit"},"#ccl"))
}D.appendChild(this.top);
this.sections=document.createElement("div");
D.appendChild(this.sections);
this.bottom=document.createElement("div");
this.bottom.className="ccl-spacer";
D.appendChild(this.bottom);
var B=RUZEE.ShadedBorder.create({corner:10,border:2,shadow:21});
B.render(D);
C.appendChild(this.box);
if(D.onresize){this.addListener("show",D.onresize,D)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.init=function(B){B=B||{};
this.parentId=B.target;
var C=document.getElementById(this.parentId);
if(C){this.version=B.version||CQ_Analytics.ClickstreamcloudUI.VERSION_FULL;
this.hideEditLink=B.hideEditLink!==false;
this.hideLoadLink=B.hideLoadLink!==false;
this.disableKeyShortcut=B.disableKeyShortcut!==false;
if(CQ_Analytics.Cookie.read(this.SHOW_BOX_COOKIE)=="true"){this.show()
}if(!this.disableKeyShortcut){var A=this;
CQ_Analytics.Utils.registerDocumentEventHandler("onkeydown",CQ_Analytics.Utils.eventWrapper(function(D,E){if(D.ctrlKey&&D.altKey&&E=="C".charCodeAt(0)){A.toggle()
}}))
}}};
CQ_Analytics.ClickstreamcloudUI.prototype.onVisibilityChange=function(){CQ_Analytics.Cookie.set(this.SHOW_BOX_COOKIE,this.isVisible()?"true":"false",365)
};
CQ_Analytics.ClickstreamcloudUI.prototype.isVisible=function(){return(this.box!=null&&this.box.style.display!="none")
};
CQ_Analytics.ClickstreamcloudUI.prototype.toggle=function(){if(this.isVisible()){this.hide()
}else{this.show()
}};
CQ_Analytics.ClickstreamcloudUI.prototype.register=function(D,A,C){var B=function(){var F=new CQ_Analytics.ClickstreamcloudUI.Section(D,this.version,A||{},C);
var E=CQ_Analytics.CCM.getUIConfig(D.getName())||{};
this.addSection(F,E.rank||null);
D.addListener("update",F.reset,F)
};
if(this.isRendered){B.call(this)
}else{this.addListener("render",B,this)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.addSection=function(C,A){if(A<this.nbSection&&this.nbSection>0){var B=this.nbSection;
var D=this.sections.lastChild;
while(B>A+1){B--;
D=D.previousSibling
}this.sections.insertBefore(C.get(),D)
}else{this.sections.appendChild(C.get())
}this.nbSection++
};
CQ_Analytics.ClickstreamcloudUI.prototype.removeSection=function(A){this.sections.removeChild(A);
this.nbSection--
};
CQ_Analytics.ClickstreamcloudUI.prototype.show=function(){if(!this.isRendered){var A=document.getElementById(this.parentId);
if(A){this.createBox(A);
this.isRendered=true;
this.fireEvent("render")
}}this.box.style.display="block";
this.onVisibilityChange();
this.fireEvent("show")
};
CQ_Analytics.ClickstreamcloudUI.prototype.hide=function(){if(this.box!=null){this.box.style.display="none"
}this.onVisibilityChange()
};
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_TEXTFIELD="textfield";
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_LINK="link";
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_STATIC="static";
CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_FULL="full";
CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_LIGHT="light";
CQ_Analytics.ClickstreamcloudUI.prototype.Section=function(D,A,B,C){this.contentbox=null;
this.section=null;
this.sessionStore=D;
this.version=A;
this.title=B.title;
this.mode=B.mode||CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD;
this.renderer=C;
this.sort=function(J,E){if(!E||!J){return J
}var I=[];
for(var H=0;
H<E.length;
H++){var G=E[H];
var F=$CQ.inArray(G,J);
if(F>-1){I.push(G);
J=$CQ.merge(J.slice(0,F-1),J.slice(F+1,J.length))
}}I=$CQ.merge(I,J);
return I
};
this.buildContentBox=function(){if(this.renderer){this.contentbox=this.renderer.call(this.sessionStore)
}else{this.contentbox=document.createElement("p");
this.contentbox.className="ccl-sectioncontent";
var G=CQ_Analytics.CCM.getStoreConfig(this.sessionStore.getName());
var I=CQ_Analytics.CCM.getUIConfig(this.sessionStore.getName());
var L=this.sessionStore.getPropertyNames(G.invisible);
L=this.sort(L,I.order);
var J=this.sessionStore.getData();
if(this.version==CQ_Analytics.ClickstreamcloudUI.VERSION_LIGHT){var H=new Array();
var N=new Array();
for(var K=0;
K<L.length;
K++){var F=L[K];
var Q=this.sessionStore.getProperty(F);
if(Q==F){H.push(F);
N.push(F)
}else{var P=CQ.shared.XSS.getXSSTablePropertyValue(J,F);
P=CQ_Analytics.Variables.replaceVariables(P);
if(CQ_Analytics.Utils.indexOf(H,P)==-1){H.push(P);
F=CQ.shared.XSS.KEY_REGEXP.test(F)?F.substring(0,F.length-4):F;
N.push(F)
}}}for(var K=0,E=0;
K<H.length;
K++){var F=N[K];
var O=H[K];
O=CQ_Analytics.Variables.replaceVariables(O);
if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_LINK){var M=CQ_Analytics.Utils.externalize(this.sessionStore.getLink(F),true);
this.addLink(this.sessionStore.getLabel(F),M,"ccl-data-light",F)
}else{this.addStaticText(O,"ccl-data-light",F)
}E++;
if(E>3){E=0;
this.addLineBreak()
}}}else{for(var K=0;
K<L.length;
K++){var F=L[K];
var P=CQ.shared.XSS.getXSSTablePropertyValue(J,F);
F=CQ.shared.XSS.KEY_REGEXP.test(F)?F.substring(0,F.length-4):F;
if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD){this.addNameValueField(this.sessionStore.getLabel(F),P,F,"ccl-data",F)
}else{if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_LINK){var M=CQ_Analytics.Utils.externalize(this.sessionStore.getLink(F),true);
this.addLink(this.sessionStore.getLabel(F),M,"ccl-data",F)
}else{this.addStaticText(this.sessionStore.getLabel(F),"ccl-data",F)
}}this.contentbox.appendChild(document.createTextNode(" "))
}}}};
this.buildSection=function(){if(this.contentbox==null){this.buildContentBox()
}if(this.section==null){this.section=document.createElement("div")
}var F=document.createElement("div");
F.className="ccl-header";
this.section.appendChild(F);
var E=document.createElement("div");
E.innerHTML=CQ.shared.I18n.getVarMessage(this.title);
E.className="ccl-title";
F.appendChild(E);
this.section.appendChild(this.contentbox)
}
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.get=function(){if(this.section==null){this.buildSection()
}return this.section
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.reset=function(){if(!this.isReseting){this.isReseting=true;
if(this.section!=null){while(this.section.hasChildNodes()){this.section.removeChild(this.section.firstChild)
}this.contentbox=null
}this.buildSection();
this.isReseting=false
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addNameValueField=function(C,D,B,A,E){this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createNameValue(B,D,A,E))
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLink=function(E,C,A,D){if(C){var B=document.createElement("span");
B.className=A||"ccl-data";
B.title=D;
B.alt=D;
B.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink(E,C,D));
this.contentbox.appendChild(B)
}else{this.addStaticText(E)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addStaticText=function(C,A,B){if(C){this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createText(C,A,B))
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLineBreak=function(){this.contentbox.appendChild(document.createElement("br"))
};
CQ_Analytics.ClickstreamcloudUI=new CQ_Analytics.ClickstreamcloudUI();
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.ClickstreamcloudUI.init(CQ_Analytics.CCM.getConfig()["ui"])
})
}if(!CQ_Analytics.PageDataMgr){CQ_Analytics.PageDataMgr=function(){};
CQ_Analytics.PageDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PageDataMgr.prototype.STORENAME="pagedata";
CQ_Analytics.PageDataMgr.prototype.FORCE_EXPERIENCE_COOKIE="cq-forceexperience";
CQ_Analytics.PageDataMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.PageDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.PageDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.PageDataMgr.prototype.setExperience=function(A){CQ.shared.HTTP.setCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE,A,"/")
};
CQ_Analytics.PageDataMgr.prototype.getExperience=function(){return CQ.shared.HTTP.getCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE,"/")
};
CQ_Analytics.PageDataMgr.prototype.clearExperience=function(){CQ.shared.HTTP.clearCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE,"/")
};
CQ_Analytics.PageDataMgr=new CQ_Analytics.PageDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.PageDataMgr)
}CQ_Analytics.BrowserInfo=function(){var F=navigator.userAgent.toLowerCase();
var C=function(H){return H.test(F)
};
var E=function(){if(C(/opera/)){return{browserFamily:"Opera",browserVersion:""}
}if(C(/chrome/)){return{browserFamily:"Chrome",browserVersion:""}
}if(C(/safari/)){if(C(/applewebkit\/4/)){return{browserFamily:"Safari",browserVersion:"2"}
}if(C(/version\/3/)){return{browserFamily:"Safari",browserVersion:"3"}
}if(C(/version\/4/)){return{browserFamily:"Safari",browserVersion:"4"}
}if(C(/version\/5/)){return{browserFamily:"Safari",browserVersion:"5"}
}if(C(/version\/6/)){return{browserFamily:"Safari",browserVersion:"6"}
}return{browserFamily:"Safari",browserVersion:"7 or higher"}
}if(C(/webkit/)){return{browserFamily:"WebKit",browserVersion:""}
}if(C(/msie/)){if(C(/msie 6/)){return{browserFamily:"IE",browserVersion:"6"}
}if(C(/msie 7/)){return{browserFamily:"IE",browserVersion:"7"}
}if(C(/msie 8/)){return{browserFamily:"IE",browserVersion:"8"}
}if(C(/msie 9/)){return{browserFamily:"IE",browserVersion:"9"}
}if(C(/msie 10/)){return{browserFamily:"IE",browserVersion:"10"}
}return{browserFamily:"IE",browserVersion:"11 or higher"}
}if(C(/gecko/)){if(C(/rv:1\.8/)){return{browserFamily:"Firefox",browserVersion:"2"}
}if(C(/rv:1\.9/)){return{browserFamily:"Firefox",browserVersion:"3"}
}if(C(/rv:2.0/)){return{browserFamily:"Firefox",browserVersion:"4"}
}if(C(/rv:5./)){return{browserFamily:"Firefox",browserVersion:"5"}
}if(C(/rv:6./)){return{browserFamily:"Firefox",browserVersion:"6"}
}if(C(/rv:7./)){return{browserFamily:"Firefox",browserVersion:"7"}
}if(C(/rv:8./)){return{browserFamily:"Firefox",browserVersion:"8"}
}if(C(/rv:9./)){return{browserFamily:"Firefox",browserVersion:"9"}
}return{browserFamily:"Firefox",browserVersion:"10 or higher"}
}var H=C(/adobeair/);
if(H){return{browserFamily:"Adobe AIR",browserVersion:""}
}return{browserFamily:"Unresolved",browserVersion:"Unresolved"}
};
var D=function(){if(C(/windows 98|win98/)){return"Windows 98"
}if(C(/windows nt 5.0|windows 2000/)){return"Windows 2000"
}if(C(/windows nt 5.1|windows xp/)){return"Windows XP"
}if(C(/windows nt 5.2/)){return"Windows Server 2003"
}if(C(/windows nt 6.0/)){return"Windows Vista"
}if(C(/windows nt 6.1/)){return"Windows 7"
}if(C(/windows nt 4.0|winnt4.0|winnt/)){return"Windows NT 4.0"
}if(C(/windows me/)){return"Windows ME"
}if(C(/mac os x/)){if(C(/ipad/)||C(/iphone/)){return"iOS"
}return"Mac OS X"
}if(C(/macintosh|mac os/)){return"Mac OS"
}if(C(/android/)){return"Android"
}if(C(/linux/)){return"Linux"
}return"Unresolved"
};
var B=function(){if(C(/ipad/)){return"iPad"
}if(C(/iphone/)){return"iPhone"
}if(C(/mobi/)){return"Mobile"
}return"Desktop"
};
var A=E.call();
this.browserFamily=A.browserFamily;
this.browserVersion=A.browserVersion;
this.browserName=this.browserFamily+" "+this.browserVersion;
this.OSName=D.call();
this.deviceType=B.call();
this.ua=F;
var G=/^https/i.test(window.location.protocol);
this.screenResolution=screen.width+"x"+screen.height
};
CQ_Analytics.BrowserInfo.prototype={getBrowserName:function(){return this.browserName
},getBrowserFamily:function(){return this.browserFamily
},getBrowserVersion:function(){return this.browserVersion
},getOSName:function(){return this.OSName
},getScreenResolution:function(){return this.screenResolution
},getDeviceType:function(){return this.deviceType
},getUserAgent:function(){return this.ua
},isMobile:function(A){if(!A){A=this.getDeviceType()
}A=A?A.toLowerCase():"desktop";
return A!="desktop"
},isIE:function(A){return this.getBrowserFamily()=="IE"&&(A?this.getBrowserVersion()==A:true)
},isIE6:function(){return this.isIE("6")
},isIE7:function(){return this.isIE("7")
},isIE8:function(){return this.isIE("8")
},isIE9:function(){return this.isIE("9")
}};
CQ_Analytics.BrowserInfoInstance=new CQ_Analytics.BrowserInfo();
if(!CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr=function(){this.position={x:0,y:0};
this.getPageX=function(C){var B=C.pageX;
if(!B&&0!==B){B=C.clientX||0
}return B
};
this.getPageY=function(B){var C=B.pageY;
if(!C&&0!==C){C=B.clientY||0
}return C
};
var A=this;
this.timer=null;
$CQ(document).bind("mousemove",function(E,D,C,H){var F=E||window.event;
if(F){if(!A.timer){var B=A.getPageX(F);
var G=A.getPageY(F);
A.timer=setTimeout(function(){A.setPosition(B,G);
A.timer=null
},500)
}}});
this.init()
};
CQ_Analytics.MousePositionMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.MousePositionMgr.prototype.STORENAME="mouseposition";
CQ_Analytics.MousePositionMgr.prototype.setPosition=function(A,B){this.position.x=A;
this.position.y=B;
this.fireEvent("update")
};
CQ_Analytics.MousePositionMgr.prototype.getProperty=function(A){return this.position[A]
};
CQ_Analytics.MousePositionMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.MousePositionMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.MousePositionMgr.prototype.getPropertyNames=function(){var A=new Array();
for(var B in this.position){A.push(B)
}return A
};
CQ_Analytics.MousePositionMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.MousePositionMgr.prototype.getData=function(A){return this.position
};
CQ_Analytics.MousePositionMgr.prototype.clear=function(){this.position={}
};
CQ_Analytics.MousePositionMgr=new CQ_Analytics.MousePositionMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.CCM.register(this)
},CQ_Analytics.MousePositionMgr)
}if(!CQ_Analytics.EventDataMgr){CQ_Analytics.EventDataMgr=function(){};
CQ_Analytics.EventDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.EventDataMgr.prototype.STORENAME="eventdata";
CQ_Analytics.EventDataMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.EventDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.EventDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.EventDataMgr=new CQ_Analytics.EventDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.EventDataMgr)
}if(!window.CQ_Context){window.CQ_Context=function(){};
window.CQ_Context.prototype=new CQ_Analytics.Observable();
window.CQ_Context.prototype.getProfile=function(){return(function(){return{getUserId:function(){return this.getProperty("authorizableId")
},getDisplayName:function(){var A=this.getProperty("formattedName");
if(A){return A
}A=this.getProperty("displayName");
if(A){return A
}return this.getUserId()
},getFirstname:function(){return this.getProperty("givenName")
},getLastname:function(){return this.getProperty("familyName")
},getEmail:function(){return this.getProperty("email")
},getProperty:function(A){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getProperty(A)
}return""
},getProperties:function(){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getData()
}return{}
},getAvatar:function(){return this.getProperty("avatar")
},onUpdate:function(A,B){if(A&&CQ_Analytics&&CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr.addListener("update",A,B||this)
}}}
})()
};
window.CQ_Context=new window.CQ_Context()
}window.CQ_trackTeasersStats=true;
function initializeTeaserLoader(B,F,G,E,A,D){E=CQ.Ext&&(E=="true"||E===true);
if(window.CQ_Analytics){var C=function(){var M="/_jcr_content/par.html?wcmmode=disabled";
var K=CQ_Analytics.PageDataMgr.getExperience();
if(K){CQ_Analytics.PageDataMgr.clearExperience();
CQ_Analytics.Utils.loadElement(K+M,G);
return 
}var L=function(O){var Q="";
var U=new Array();
if(CQ_Analytics.SegmentMgr){var S=0;
for(var P=0;
P<B.length;
P++){var R=CQ.shared.HTTP.externalize(B[P].path+".html");
if(!B[P]["segments"]||B[P]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(B[P]["segments"])===true){var N=CQ_Analytics.SegmentMgr.getMaxBoost(B[P]["segments"]);
var T=[B[P]["title"],N,B[P].thumbnail,R];
if(O==B[P].path){Q+=CQ.I18n.getMessage('<b><a href="{3}" class="cq-teaser-segment-link"><img src="{2}" class="cq-teaser-decision-thumbnail cq-teaser-decision-match"></a>Teaser: {0} - match ( boost = {1} )</b><br>',T)
}else{Q+=CQ.I18n.getMessage('<a href="{3}" class="cq-teaser-segment-link"><img src="{2}" class="cq-teaser-decision-thumbnail cq-teaser-decision-match"></a>Teaser: {0} - match ( boost = {1} )<br>',T)
}if(N==S){U.push(B[P])
}else{if(N>S){U=new Array();
U.push(B[P]);
S=N
}}}else{var T=[B[P]["title"],B[P].thumbnail,R];
Q+=CQ.I18n.getMessage('<a href="{2}" class="cq-teaser-segment-link"><img src="{1}" class="cq-teaser-decision-thumbnail cq-teaser-decision-nomatch"></a>Teaser: {0} - no match<br>',T)
}}}Q+=CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>",F);
return Q
};
var J=null;
var H=null;
var I=function(){var U=new Array();
if(CQ_Analytics.SegmentMgr){var S=0;
for(var Q=0;
Q<B.length;
Q++){if(!B[Q]["segments"]||B[Q]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(B[Q]["segments"])===true){var N=CQ_Analytics.SegmentMgr.getMaxBoost(B[Q]["segments"]);
if(N==S){U.push(B[Q])
}else{if(N>S){U=new Array();
U.push(B[Q]);
S=N
}}}}}if(U.length>0){var T=U[0];
if(CQ_Analytics.StrategyMgr){var R=CQ_Analytics.StrategyMgr.choose(F,U);
if(R!=null){T=R
}}if(!J||J.path!=T.path){J=T;
var O=T.path+M;
O=CQ.shared.HTTP.addSelectors(O,CQ.shared.HTTP.getSelectors());
CQ_Analytics.Utils.loadTeaserElement(O,G);
if(window.CQ_trackTeasersStats&&A){if(!CQ_Analytics.loadedTeasersStack){CQ_Analytics.loadedTeasersStack=[];
$CQ(window).unload(function(){try{var V=CQ_Analytics.loadedTeasersStack;
if(V){delete CQ_Analytics.loadedTeasersStack;
var X=A;
for(var Y=0;
Y<V.length;
Y++){X=CQ.shared.HTTP.addParameter(X,"path",V[Y])
}CQ.shared.HTTP.get(X,function(){})
}}catch(W){}})
}CQ_Analytics.loadedTeasersStack.push(T.path)
}if(E){if(D){var P=CQ.WCM.getEditable(D);
if(P){if(P&&P.teaserToolTip){P.teaserToolTip.hide();
P.teaserToolTip.remove();
P.teaserToolTip=null
}else{P.on(CQ.wcm.EditRollover.EVENT_SHOW_HIGHTLIGHT,function(V){if(!this.teaserInfoButton){this.teaserInfoButton=CQ.Ext.DomHelper.append("CQ",{tag:"div",cls:"x-tool x-tool-help cq-teaser-tooltip-tool"},true);
this.teaserInfoButton.position("absolute");
this.teaserInfoButton.on("click",function(){if(!P.teaserToolTip){P.teaserToolTip=new CQ.Ext.Tip({html:L(J.path),title:CQ.I18n.getMessage("Selection decision"),width:450,autoHide:false,closable:true,height:300,floating:true,autoHeight:false,bodyStyle:"overflow-y: scroll;"})
}var W=this.getXY();
P.teaserToolTip.setPosition(W[0]-460,W[1]-100);
P.teaserToolTip.show()
})
}this.teaserInfoButton.anchorTo(V.frameBottom.getEl(),"tr",[-26,-15]);
this.teaserInfoButton.show()
});
P.on(CQ.wcm.EditRollover.EVENT_HIDE_HIGHTLIGHT,function(V){if(this.teaserInfoButton){this.teaserInfoButton.hide()
}})
}}}}}}else{if(E){var P=CQ.WCM.getEditable(D);
if(P&&P.teaserToolTip){P.teaserToolTip.hide();
P.teaserToolTip.remove();
P.teaserToolTip=null
}}CQ_Analytics.Utils.clearElement(G);
J=null
}};
I.call();
if(CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr.addListener("update",I)
}};
if(CQ_Analytics.CCM.areStoresInitialized){C.call(this)
}else{CQ_Analytics.CCM.addListener("storesinitialize",C)
}}}window.CQ_trackLandingPagesStats=true;
function initializeLandingPageLoader(F,D,E,C,A){C=CQ.Ext&&(C=="true"||C===true);
if(window.CQ_Analytics){var G=".html";
var B=function(){var I=null;
var H=function(){var K=new Array();
if(CQ_Analytics.SegmentMgr){var R=0;
for(var O=0;
O<F.length;
O++){if(!F[O]["segments"]||F[O]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(F[O]["segments"])===true){var U=CQ_Analytics.SegmentMgr.getMaxBoost(F[O]["segments"]);
if(U==R){K.push(F[O])
}else{if(U>R){K=new Array();
K.push(F[O]);
R=U
}}}}}if(K.length>0){var N=K[0];
if(CQ_Analytics.StrategyMgr){var S=CQ_Analytics.StrategyMgr.choose(D,K);
if(S!=null){N=S
}}if(!I||I.path!=N.path){var W=I;
I=N;
var M=CQ.shared.HTTP.get(N.path+G);
var X=M.responseText;
var P=function(m,Z){var g="";
if(m&&m.indexOf('id="'+Z+'"')!=-1){var f=m.indexOf('id="'+Z+'"');
var a=m.substring(0,f).lastIndexOf("<div");
var e=m.substring(a);
var l=e.split(new RegExp("<div","ig"));
var c=0;
for(var d=0;
d<l.length;
d++){c++;
var h=l[d].split(new RegExp("</div","ig"));
for(var b=1;
b<h.length;
b++){c--;
if(c==1){var Y=l[d].lastIndexOf("</div")+6;
Y=e.indexOf(l[d])+Y;
e=e.substring(0,Y);
e=e.substring(e.indexOf(">")+1,e.lastIndexOf("</div"));
return e
}}}}return""
};
X=P(X,E);
var T=$CQ("#"+E)[0];
var Q=function(a,Y){if(C){var b=CQ.WCM.getEditables();
for(var c in b){var Z=b[c];
if(!a||Z.path.indexOf(a)!=-1){Z.hide();
Z.remove()
}}}};
var L=document.createElement("div");
L.innerHTML=X;
if(W){$CQ("object",T).parent().fadeOut("slow");
$CQ("img",T).fadeOut("slow");
$CQ(T).slideUp("slow",function(){Q(W.path,false);
$CQ(T).children().remove();
var Y=T.insertBefore(L,T.firstChild);
$CQ(T).slideDown("slow",function(){if(C){CQ.DOM.executeScripts(CQ.Ext.get(L))
}})
})
}else{var J=T.insertBefore(L,T.firstChild);
$CQ(T).slideDown("slow",function(){if(C){CQ.DOM.executeScripts(CQ.Ext.get(L))
}})
}try{if(window.CQ_trackLandingPagesStats&&A){if(!CQ_Analytics.loadedLandingPagesStack){CQ_Analytics.loadedLandingPagesStack=[];
$CQ(window).unload(function(){try{var b=CQ_Analytics.loadedLandingPagesStack;
if(b){delete CQ_Analytics.loadedLandingPagesStack;
var Z=A;
for(var a=0;
a<b.length;
a++){Z=CQ.shared.HTTP.addParameter(Z,"path",b[a])
}CQ.shared.HTTP.get(Z,function(){})
}}catch(Y){}})
}CQ_Analytics.loadedLandingPagesStack.push(N.path)
}}catch(V){}}}else{CQ_Analytics.Utils.clearElement(E);
I=null
}};
H.call();
if(CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr.addListener("update",H)
}};
if(CQ_Analytics.ClickstreamcloudMgr){if(CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded){B.call(this)
}else{CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",B)
}}}}CQ_Analytics.PersistedJSONStore=function(){};
CQ_Analytics.PersistedJSONStore.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.PersistedJSONStore.prototype.STOREKEY="";
CQ_Analytics.PersistedJSONStore.prototype.STORENAME="";
CQ_Analytics.PersistedJSONStore.prototype.init=function(){var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(!B||B==""){this.data={};
for(var C in this.initProperty){this.data[C]=this.initProperty[C]
}}else{this.data=this.parse(B)
}this.persist();
this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.PersistedJSONStore.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.PersistedJSONStore.prototype.initJSON=function(B,C){if(!C){this.initProperty={}
}var A=function(G,D,F){for(var E in F){if(typeof F[E]=="object"){A(G,D?D+"/"+E:E,F[E])
}else{G[D?D+"/"+E:E]=F[E]
}}};
A(this.initProperty,null,B)
};
CQ_Analytics.PersistedJSONStore.prototype.getJSON=function(){var E=this.getData();
var C={};
for(var G in E){var D=G.split("/");
var F=C;
for(var B=0;
B<D.length;
B++){var A=D[B];
if(B==D.length-1){F[A]=E[G]
}else{F[A]=F[A]||{};
F=F[A]
}}}return C
};
CQ_Analytics.PersistedJSONStore.getInstance=function(A,C){var B=new CQ_Analytics.PersistedJSONStore();
B.STOREKEY=A.toUpperCase();
B.STORENAME=A;
B.initJSON(C);
return B
};
CQ_Analytics.PersistedJSONStore.registerNewInstance=function(A,B){var C=CQ_Analytics.PersistedJSONStore.getInstance(A,B);
C.init();
CQ_Analytics.CCM.register(C);
return C
};
CQ_Analytics.JSONStore=function(){};
CQ_Analytics.JSONStore.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.JSONStore.prototype.STOREKEY="";
CQ_Analytics.JSONStore.prototype.STORENAME="";
CQ_Analytics.JSONStore.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.JSONStore.prototype.clear=function(){this.data=null;
this.initProperty={}
};
CQ_Analytics.JSONStore.prototype.initJSON=function(B,C){if(!C){this.initProperty={}
}var A=function(G,D,F){for(var E in F){if(typeof F[E]=="object"){A(G,D?D+"/"+E:E,F[E])
}else{G[D?D+"/"+E:E]=F[E]
}}};
A(this.initProperty,null,B)
};
CQ_Analytics.JSONStore.prototype.getJSON=function(){var E=this.getData();
var C={};
for(var G in E){var D=G.split("/");
var F=C;
for(var B=0;
B<D.length;
B++){var A=D[B];
if(B==D.length-1){F[A]=E[G]
}else{F[A]=F[A]||{};
F=F[A]
}}}return C
};
CQ_Analytics.JSONStore.getInstance=function(A,C){var B=new CQ_Analytics.JSONStore();
B.STOREKEY=A.toUpperCase();
B.STORENAME=A;
B.initJSON(C);
return B
};
CQ_Analytics.JSONStore.registerNewInstance=function(A,B){var C=CQ_Analytics.JSONStore.getInstance(A,B);
C.init();
CQ_Analytics.CCM.register(C);
return C
};
CQ_Analytics.PersistedJSONPStore=function(){};
CQ_Analytics.PersistedJSONPStore.prototype=new CQ_Analytics.PersistedJSONStore();
CQ_Analytics.PersistedJSONPStore.prototype.setServiceURL=function(A){this.serviceURL=A
};
CQ_Analytics.PersistedJSONPStore.prototype.getServiceURL=function(){return this.serviceURL
};
CQ_Analytics.PersistedJSONPStore.prototype.load=function(D,A,E){var C=this.getName();
if(!CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[this.getName()]){CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[C]=function(G){var F=CQ_Analytics.CCM.getRegisteredStore(C);
if(F){F.initJSON(G);
if(A){F.initJSON(A,true)
}}if(E){E.call(F)
}}
}if(D){this.setServiceURL(D)
}var B=this.serviceURL;
B=B.replace("${callback}","CQ_Analytics.PersistedJSONPStore.JSONPCallbacks."+C);
$CQ.getScript(B)
};
CQ_Analytics.PersistedJSONPStore.JSONPCallbacks={};
CQ_Analytics.PersistedJSONPStore.getInstance=function(E,F,B,A,D){if(E&&F){try{var G=new CQ_Analytics.PersistedJSONPStore();
G.STOREKEY=E.toUpperCase();
G.STORENAME=E;
if(F){G.setServiceURL(F)
}if(!A){G.load(F,B,D)
}return G
}catch(C){console.log("Cannot create the JSONP store",E,F,C)
}}return null
};
CQ_Analytics.PersistedJSONPStore.registerNewInstance=function(D,E,B,F){if(!E){return null
}if(!D){var A=CQ.shared.HTTP.getSchemeAndAuthority(E);
if(A){if(A.indexOf(".")!=-1){A=A.substring(0,A.lastIndexOf("."));
D=A.substring(A.lastIndexOf(".")+1)
}else{D=A.substring(A.lastIndexOf("/")+1)
}}else{D=E
}}var C=CQ_Analytics.PersistedJSONPStore.getInstance(D,E,B,false,function(){this.init();
this.reset();
if(F){F.call(this)
}});
if(C!=null){CQ_Analytics.CCM.register(C);
return C
}return null
};
CQ_Analytics.JSONPStore=function(){};
CQ_Analytics.JSONPStore.prototype=new CQ_Analytics.JSONStore();
CQ_Analytics.JSONPStore.prototype.setServiceURL=function(A){this.serviceURL=A
};
CQ_Analytics.JSONPStore.prototype.getServiceURL=function(){return this.serviceURL
};
CQ_Analytics.JSONPStore.prototype.load=function(D,A,E){var C=this.getName();
if(!CQ_Analytics.JSONPStore.JSONPCallbacks[this.getName()]){CQ_Analytics.JSONPStore.JSONPCallbacks[C]=function(G){var F=CQ_Analytics.CCM.getRegisteredStore(C);
if(F){F.initJSON(G);
if(A){F.initJSON(A,true)
}}if(E){E.call(F)
}}
}if(D){this.setServiceURL(D)
}var B=this.serviceURL;
B=B.replace("${callback}","CQ_Analytics.JSONPStore.JSONPCallbacks."+C);
$CQ.getScript(B)
};
CQ_Analytics.JSONPStore.JSONPCallbacks={};
CQ_Analytics.JSONPStore.getInstance=function(E,F,B,A,D){if(E){try{var G=new CQ_Analytics.JSONPStore();
G.STOREKEY=E.toUpperCase();
G.STORENAME=E;
if(F){G.setServiceURL(F);
if(!A){G.load(F,B,D)
}}return G
}catch(C){console.log("Cannot create the JSONP store",E,F,C)
}}return null
};
CQ_Analytics.JSONPStore.registerNewInstance=function(D,E,B,F){if(!D&&E){var A=CQ.shared.HTTP.getSchemeAndAuthority(E);
if(A){if(A.indexOf(".")!=-1){A=A.substring(0,A.lastIndexOf("."));
D=A.substring(A.lastIndexOf(".")+1)
}else{D=A.substring(A.lastIndexOf("/")+1)
}}else{D=E
}}var C=CQ_Analytics.JSONPStore.getInstance(D,E,B,false,function(){this.init();
this.reset();
if(F){F.call(this)
}});
if(C!=null){CQ_Analytics.CCM.register(C);
return C
}return null
};
$CQ(function(){CQ_Analytics.Slider=function(A){return{init:function(){this.vertical=A.vertical;
this.clazz=A.clazz;
this.parent=A.parent;
this.container=$CQ("<div>").addClass("cq-cc-slider").addClass("cq-cc-slider-"+((this.vertical)?"vertical":"horizontal")).addClass(this.clazz).appendTo(this.parent);
this.container.hide();
this.carousel=$CQ("<ul>").addClass("jcarousel-skin-cq-cc").appendTo(this.container)
},show:function(){if(!this.isWidget){var B=this;
A.initCallback=function(C){B.carouselObj=C
};
this.carousel.jcarousel(A);
this.isWidget=true
}var B=this;
this.select(this.computeSelectedIndex(),true,true);
if(this.vertical){this.container.slideDown("fast")
}else{$CQ(".cq-cc-slider",this.parent).css("top",(this.parent.position().top-9)+"px");
$CQ(".cq-cc-slider",this.parent).css("left",(this.parent.position().left-27)+"px");
$CQ(".cq-cc-slider",this.parent).fadeIn(1000,function(){$CQ(".jcarousel-container-horizontal",B.parent).animate({width:"270px"},"fast");
$CQ(".jcarousel-clip-horizontal",B.parent).animate({width:"268px"},"fast",function(){B.carousel.jcarousel()
})
})
}B.container.bind("click",this.stopPropagation);
$CQ(document).bind("click",{scope:this},this.handleDocClick)
},handleDocClick:function(B){B.data.scope.hide()
},stopPropagation:function(B){B.stopPropagation()
},hide:function(){$CQ(document).unbind("click",this.handleDocClick);
this.container.unbind("click",this.stopPropagation);
if(this.vertical){this.container.slideUp("fast")
}else{var B=this;
$CQ(".jcarousel-container-horizontal",this.parent).animate({width:"90px"},"fast");
$CQ(".jcarousel-clip-horizontal",this.parent).animate({width:"90px"},"fast",function(){$CQ(".cq-cc-slider",B.parent).fadeOut(1000)
})
}},select:function(D,G,C){var F=this.getSelected();
if(G||F.length==0||F.attr("jcarouselindex")!=D){var E=this.getItem(D);
F.removeClass("jcarousel-item-selected");
E.addClass("jcarousel-item-selected");
$CQ(this.container).find(".jcarousel-item-selected-marker").removeClass("jcarousel-item-selected-marker");
var B=this.getCurrentValue();
var H=E.children().attr("data-id");
$CQ(this.container).find("[data-id='"+H+"']").addClass("jcarousel-item-selected-marker");
if(B!=H){this.onSelect(H)
}this.carouselObj.scroll($CQ.jcarousel.intval(E.attr("jcarouselindex")),!C)
}},getSelected:function(){return $CQ(this.container).find(".jcarousel-item-selected")
},computeSelectedIndex:function(){var B=this.getCurrentValue();
return $CQ(this.container).find("[data-id='"+B+"']").parent().attr("jcarouselindex")||0
},getItem:function(B){return $CQ(this.container).find("[jcarouselindex="+B+"]")
},onSelect:function(B){},getCurrentValue:function(){}}
}
});
CQ_Analytics.record=function(C){if(C.collect){return[C.event,C.values]
}else{if(C.event){C.options=C.options||{};
try{CQ_Analytics.recordBeforeCallbacks.sort(function(G,F){return G.rank-F.rank
});
for(var E in CQ_Analytics.recordBeforeCallbacks){if(CQ_Analytics.recordBeforeCallbacks[E].func.call(this,C)){return 
}}}catch(D){}var A=C.dataMgr||CQ_Analytics.EventDataMgr;
A.reset();
if(typeof C.event=="string"){A.setProperty("events",C.event)
}else{A.setProperty("events",C.event.join("\u2026"))
}if(C.values){for(var B in C.values){A.setProperty(B,C.values[B])
}}try{CQ_Analytics.recordAfterCallbacks.sort(function(G,F){return G.rank-F.rank
});
for(var E in CQ_Analytics.recordAfterCallbacks){if(CQ_Analytics.recordAfterCallbacks[E].func.call(this,C)){return 
}}}catch(D){}}}};
CQ_Analytics.recordBeforeCallbacks=[];
CQ_Analytics.recordAfterCallbacks=[];
CQ_Analytics.registerBeforeCallback=function(B,A){CQ_Analytics.recordBeforeCallbacks.push({rank:A,func:B})
};
CQ_Analytics.registerAfterCallback=function(B,A){CQ_Analytics.recordAfterCallbacks.push({rank:A,func:B})
};
if(!CQ_Analytics.ClientContext){CQ_Analytics.ClientContext=new function(){return{get:function(F,C){if(F){if(F.indexOf("/")!=0){F="/"+F
}var D=F.split("/")[1];
var B=F.substring(F.indexOf("/"+D)+D.length+2,F.length);
var A=CQ_Analytics.CCM.getRegisteredStore(D);
if(A){if(B){var E=A.getProperty(B);
if(E&&C){E=CQ_Analytics.Variables.replaceVariables(E)
}return E
}return A
}}return null
},set:function(E,D){if(E){if(E.indexOf("/")!=0){E="/"+E
}var C=E.split("/")[1];
var B=E.substring(E.indexOf("/"+C)+C.length+2,E.length);
var A=CQ_Analytics.CCM.getRegisteredStore(C);
if(A){if(B){A.setProperty(B,D)
}}}},clear:function(){var A=CQ_Analytics.CCM.getStores();
if(A){for(var B in A){if(A[B].clear){A[B].clear()
}}}},reset:function(){var A=CQ_Analytics.CCM.getStores();
if(A){for(var B in A){if(A[B].reset){A[B].reset()
}}}},persist:function(A){CQ_Analytics.ClientContextMgr.ServerStorage.post(A,true)
}}
}();
window.ClientContext=CQ_Analytics.ClientContext;
window.ContextCloud=CQ_Analytics.ClientContext
}if(!CQ_Analytics.ClientContextUI){CQ_Analytics.ClientContextUI=function(){this.loaded=false;
this.ccUrl=null;
this.visible=false;
this.rendered=false;
this.containerId=null;
this.boxId=null;
this.contentPlaceholderId=null;
this.editMode=false
};
CQ_Analytics.ClientContextUI.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClientContextUI.prototype.SHOW_BOX_COOKIE="cq-show-clientcontext";
CQ_Analytics.ClientContextUI.prototype.init=function(B,A,E,C,D){this.ccUrl=B;
this.containerId=A;
this.boxId=E;
this.contentPlaceholderId=C;
this.editMode=D;
$CQ(document).bind("keydown",CQ_Analytics.Utils.eventWrapper(function(F,G){if(F.ctrlKey&&F.altKey&&G=="C".charCodeAt(0)){CQ_Analytics.ClientContextUI.toggle()
}}));
if(CQ_Analytics.Cookie.read(this.SHOW_BOX_COOKIE)=="true"){this.show()
}};
CQ_Analytics.ClientContextUI.prototype.render=function(){if(!this.rendered&&this.fireEvent("beforerender")!==false){this.rendered=true;
this.fireEvent("render")
}};
CQ_Analytics.ClientContextUI.prototype.load=function(C){if(this.ccUrl&&(!this.loaded||C)&&this.fireEvent("beforeload")!==false){var B=CQ.shared.HTTP.addParameter(this.ccUrl,"wcmmode",this.editMode?"preview":"disabled");
var A=CQ.shared.HTTP.get(B);
$CQ("#"+this.contentPlaceholderId).html(A.responseText);
this.loaded=true;
this.fireEvent("load")
}};
CQ_Analytics.ClientContextUI.prototype.show=function(){this.load();
this.render();
if(this.fireEvent("beforeshow")!==false){if($CQ.support.opacity){$CQ("#"+this.containerId).show("normal")
}else{$CQ("#"+this.containerId).show()
}this.visible=true;
CQ_Analytics.Cookie.set(this.SHOW_BOX_COOKIE,"true",365);
this.fireEvent("show")
}};
CQ_Analytics.ClientContextUI.prototype.hide=function(){if(this.fireEvent("beforehide")!==false){if($CQ.support.opacity){$CQ("#"+this.containerId).hide("fast")
}else{$CQ("#"+this.containerId).hide()
}this.visible=false;
CQ_Analytics.Cookie.set(this.SHOW_BOX_COOKIE,"false",365);
this.fireEvent("hide")
}};
CQ_Analytics.ClientContextUI.prototype.toggle=function(){if(this.visible){this.hide()
}else{this.show()
}};
CQ_Analytics.ClientContextUI.prototype.onLoad=function(B,A){if(B){if(this.loaded){B.call(A||this)
}else{this.addListener("load",B,A)
}}};
CQ_Analytics.ClientContextUI.prototype.isAvailable=function(){return this.boxId&&$CQ("#"+this.boxId).length>0
};
CQ_Analytics.ClientContextUI.prototype.getBoxId=function(){return this.boxId
};
CQ_Analytics.ClientContextUI=new CQ_Analytics.ClientContextUI();
CQ_Analytics.ClientContextUI.CONTAINER_ID="cq-clientcontext-container";
CQ_Analytics.ClientContextUI.BOX_ID="cq-clientcontext-box";
CQ_Analytics.ClientContextUI.BOX_CLASS="cq-clientcontext";
CQ_Analytics.ClientContextUI.ACTIONS_ID="cq-clientcontext-box-actions";
CQ_Analytics.ClientContextUI.ACTIONS_CONTAINER_ID="cq-clientcontext-box-actions-container";
CQ_Analytics.ClientContextUI.CONTENT_ID="cq-clientcontext-box-content";
CQ_Analytics.ClientContextUI.createPlaceholders=function(){var B=$CQ("<div>").attr("id",CQ_Analytics.ClientContextUI.BOX_ID).addClass(CQ_Analytics.ClientContextUI.BOX_CLASS);
B.append($CQ("<div>").attr("id",CQ_Analytics.ClientContextUI.ACTIONS_ID).append($CQ("<div>").attr("id",CQ_Analytics.ClientContextUI.ACTIONS_CONTAINER_ID)));
B.append($CQ("<div>").attr("id",CQ_Analytics.ClientContextUI.CONTENT_ID));
var A=$CQ("<div>").attr("id",CQ_Analytics.ClientContextUI.CONTAINER_ID);
A.append(B);
$CQ("body").append(A)
};
CQ_Analytics.ClientContextUI.create=function(B,A){CQ_Analytics.ClientContextUI.createPlaceholders();
CQ_Analytics.ClientContextUI.addListener("beforerender",function(){$CQ("<div>").addClass("cq-clientcontext-box-action").addClass("cq-clientcontext-design").attr("title","Open the ClientContext design page").appendTo("#"+CQ_Analytics.ClientContextUI.ACTIONS_CONTAINER_ID).bind("click",function(){CQ.shared.Util.open(_g.shared.HTTP.externalize(B+"/content.html"))
});
$CQ("<div>").addClass("cq-clientcontext-box-action").addClass("cq-clientcontext-load").attr("title","Load a profile in the ClientContext").appendTo("#"+CQ_Analytics.ClientContextUI.ACTIONS_CONTAINER_ID).bind("click",function(){var E=new CQ.personalization.ProfileLoader({});
E.show()
});
$CQ("<div>").addClass("cq-clientcontext-box-action").addClass("cq-clientcontext-reset").attr("title","Reset the ClientContext").appendTo("#"+CQ_Analytics.ClientContextUI.ACTIONS_CONTAINER_ID).bind("click",function(){CQ_Analytics.ClientContext.reset()
});
$CQ("<div>").addClass("cq-clientcontext-box-action").addClass("cq-clientcontext-close").attr("title","Close the ClientContext").appendTo("#"+CQ_Analytics.ClientContextUI.ACTIONS_CONTAINER_ID).bind("click",function(){CQ_Analytics.ClientContextUI.hide()
});
var D=$CQ("#"+CQ_Analytics.ClientContextUI.BOX_ID).offset();
$CQ("#"+CQ_Analytics.ClientContextUI.BOX_ID).draggable({handle:"#"+CQ_Analytics.ClientContextUI.ACTIONS_ID,revert:false,stop:function(){D=$CQ("#"+CQ_Analytics.ClientContextUI.BOX_ID).offset()
}});
$CQ("#"+CQ_Analytics.ClientContextUI.BOX_ID).addClass("CQjquery").resizable();
if(window.CQ&&CQ.wcm&&CQ.wcm.emulator&&CQ.wcm.emulator.EmulatorManager&&CQ.wcm.emulator.EmulatorManager.WRAPPING_EXCLUDED_IDS){CQ.wcm.emulator.EmulatorManager.WRAPPING_EXCLUDED_IDS.push(CQ_Analytics.ClientContextUI.CONTAINER_ID)
}});
var C=CQ.shared.HTTP.addParameter(B+"/content/jcr:content/stores.html","path",A);
CQ_Analytics.ClientContextUI.init(C,CQ_Analytics.ClientContextUI.CONTAINER_ID,CQ_Analytics.ClientContextUI.BOX_ID,CQ_Analytics.ClientContextUI.CONTENT_ID,true)
}
}if(!CQ_Analytics.TagCloudMgr){CQ_Analytics.TagCloudMgr=function(){this.data=null;
this.addedTags={};
this.frequencies=null;
this.initialTags=null;
this.initialAddedTags={};
this.copyObject=function(C){var B={};
for(var A in C){B[A]=C[A]
}return B
}
};
CQ_Analytics.TagCloudMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.TagCloudMgr.prototype.STOREKEY="TAGCLOUD";
CQ_Analytics.TagCloudMgr.prototype.STORENAME="tagcloud";
CQ_Analytics.TagCloudMgr.prototype.parseTagList=function(A){var C={};
var B=A.split(",");
for(var D in B){if(B.hasOwnProperty(D)){var E=B[D].split("=");
if(E.length==2){C[E[0]]=parseInt(E[1])
}}}return C
};
CQ_Analytics.TagCloudMgr.prototype.parseString=function(A){this.data=this.parseTagList(A);
return this
};
CQ_Analytics.TagCloudMgr.prototype.add=function(A){this.addedTags[A]=true;
this.data[A]=(this.data[A]||0)+1
};
CQ_Analytics.TagCloudMgr.prototype.each=function(B){for(var A in this.data){if(this.data.hasOwnProperty(A)){B(A,this.data[A])
}}};
CQ_Analytics.TagCloudMgr.prototype.calculateFrequencies=function(){var C={};
var A=[];
this.each(function(D,E){if(!C[E]){A.push(E)
}C[E]=true
});
A.sort(function B(E,D){if(E>D){return 1
}if(E<D){return -1
}return 0
});
return A
};
CQ_Analytics.TagCloudMgr.prototype.calculateNtile=function(B,C){if(this.frequencies===null){this.frequencies=this.calculateFrequencies()
}var A=0;
while(true){if((A>=(this.frequencies.length-1))||(this.frequencies[A]>=B)){return Math.ceil((A+1)/this.frequencies.length*C)
}A++
}};
CQ_Analytics.TagCloudMgr.prototype.getTags=function(){return this.data
};
CQ_Analytics.TagCloudMgr.prototype.getData=function(A){return this.getTags()
};
CQ_Analytics.TagCloudMgr.prototype.getTag=function(A){return this.data[A]>0?this.data[A]:0
};
CQ_Analytics.TagCloudMgr.prototype.init=function(A){var B=new CQ_Analytics.SessionPersistence();
var D=B.get(this.getStoreKey());
D=D===null?"":new String(D);
this.data=this.parseTagList(D);
if(A){for(var C in A){if(A.hasOwnProperty(C)){this.add(A[C])
}}}this.initialTags=this.copyObject(this.data);
this.initialAddedTags=this.copyObject(this.addedTags);
this.persist();
this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}if(B>0){this.addedTags[A]=true;
this.data[A]=B>0?B:0
}else{delete this.addedTags[A];
delete this.data[A]
}this.persist();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.reset=function(){this.clear();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.getProperty=function(A){if(this.data==null){this.init()
}return this.data[A]>0?this.data[A]:0
};
CQ_Analytics.TagCloudMgr.prototype.removeProperty=function(A){if(this.data==null){this.init()
}this.setProperty(A,0)
};
CQ_Analytics.TagCloudMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.addedTags={};
this.data={}
};
CQ_Analytics.TagCloudMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.TagCloudMgr.prototype.getLabel=function(B){if(B){var C=B.split(":");
var A=C[C.length-1].split("/");
B=A[A.length-1]
}return B
};
CQ_Analytics.TagCloudMgr.prototype.createHTMLElement=function(){var E=document.createElement("div");
var C=document.createElement("div");
var B=this;
C.className="cloud";
var D=0;
this.each(function(G,J){var F=document.createElement("div");
var I=B.calculateNtile(J,10);
var K=G.split(":");
var H=K[K.length-1].split("/");
F.innerHTML=H[H.length-1];
F.className="tag";
if(B.addedTags[G]){F.className+=" new"
}F.className+=" tag"+I;
F.title=G+" ("+J+")";
F.setAttribute("data-property",G);
F.setAttribute("data-store",B.STORENAME);
C.appendChild(F);
C.appendChild(document.createTextNode(" "));
D++
});
if(D==0){var A=document.createElement("div");
A.className="tag notag";
A.innerHTML="No interest";
C.appendChild(A)
}E.appendChild(C);
return E
};
CQ_Analytics.TagCloudMgr=new CQ_Analytics.TagCloudMgr();
CQ_Analytics.TagCloudMgr.renderer=function(A,B){if(A&&A.STORENAME==CQ_Analytics.TagCloudMgr.STORENAME){$CQ("#"+B).children().remove();
$CQ("#"+B).append(A.createHTMLElement())
}};
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()),this.createHTMLElement);
CQ_Analytics.CCM.register(this)
},CQ_Analytics.TagCloudMgr)
}if(!CQ_Analytics.SurferInfoMgr){CQ_Analytics.SurferInfoMgr=function(){};
CQ_Analytics.SurferInfoMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.SurferInfoMgr.prototype.STOREKEY="SURFERINFO";
CQ_Analytics.SurferInfoMgr.prototype.STORENAME="surferinfo";
CQ_Analytics.SurferInfoMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.SurferInfoMgr.prototype.clear=function(){this.data=null;
this.initProperty={}
};
CQ_Analytics.SurferInfoMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.SurferInfoMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.SurferInfoMgr=new CQ_Analytics.SurferInfoMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){var B=CQ_Analytics.BrowserInfoInstance;
this.addInitProperty("browserFamily",B.getBrowserFamily());
this.addInitProperty("browserVersion",B.getBrowserVersion());
this.addInitProperty("browser","${/surferinfo/browserFamily} ${/surferinfo/browserVersion}");
this.addInitProperty("OS",B.getOSName());
this.addInitProperty("resolution",B.getScreenResolution());
this.addInitProperty("device",B.getDeviceType());
this.addInitProperty("isMobile",B.isMobile());
this.addInitProperty("userAgent",B.getUserAgent());
var A=new Date();
this.addInitProperty("day",A.getDate());
this.addInitProperty("month",A.getMonth()+1);
this.addInitProperty("year",A.getFullYear());
this.addInitProperty("hours",A.getHours());
this.addInitProperty("minutes",A.getMinutes());
var C="${/surferinfo/browserFamily}";
if(B.isMobile()){C="${/surferinfo/device}"
}this.addInitProperty("image",C);
var D=CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/surferinfo/resources/${/surferinfo/image}.png");
this.addInitProperty("thumbnail",D);
if(CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr.addListener("update",function(){this.setProperty("mouse X",CQ_Analytics.MousePositionMgr.getProperty("x"));
this.setProperty("mouse Y",CQ_Analytics.MousePositionMgr.getProperty("y"))
},this)
}this.addListener("update",function(){var F=this.getProperty("device");
var G="${/surferinfo/browserFamily}";
if(B.isMobile(F)){G="${/surferinfo/device}"
}var E=this.getProperty("image");
if(E!=G){this.setProperty("image",G)
}},this);
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.SurferInfoMgr)
}if(!CQ_Analytics.MobileSliderUtils){CQ_Analytics.MobileSliderUtils=function(){return{injectCss:function(A){$CQ("head").append("<link>");
var B=$CQ("head").children(":last");
B.attr({rel:"stylesheet",type:"text/css",href:_g.shared.HTTP.externalize(A)})
},removeCss:function(A){$CQ("[href='"+_g.shared.HTTP.externalize(A)+"']").remove()
},switchToMobile:function(A){this.injectMobileBodyClass(A);
this.injectMobileCss(A)
},switchToDesktop:function(A){this.injectDesktopBodyClass(A);
this.injectDesktopCss(A)
},injectDesktopCss:function(D){var A=this.getConfig(D,"DESKTOP_CSS");
if(A){for(var C=0;
C<A.length;
C++){var B=A[C];
CQ_Analytics.MobileSliderUtils.injectCss(CQ_Analytics.Variables.replace(B,"app",D))
}}A=this.getConfig(D,"MOBILE_CSS");
if(A){for(var C=0;
C<A.length;
C++){var B=A[C];
CQ_Analytics.MobileSliderUtils.removeCss(CQ_Analytics.Variables.replace(B,"app",D))
}}},injectMobileCss:function(D){var A=this.getConfig(D,"MOBILE_CSS");
if(A){for(var C=0;
C<A.length;
C++){var B=A[C];
CQ_Analytics.MobileSliderUtils.injectCss(CQ_Analytics.Variables.replace(B,"app",D))
}}A=this.getConfig(D,"DESKTOP_CSS");
if(A){for(var C=0;
C<A.length;
C++){var B=A[C];
CQ_Analytics.MobileSliderUtils.removeCss(CQ_Analytics.Variables.replace(B,"app",D))
}}},injectMobileBodyClass:function(C){var B=this.getConfig(C,"MOBILE_BODY_CLASS");
if(B){for(var A=0;
A<B.length;
A++){var D=B[A];
$CQ(document.body).addClass(D)
}}B=this.getConfig(C,"DESKTOP_BODY_CLASS");
if(B){for(var A=0;
A<B.length;
A++){var D=B[A];
$CQ(document.body).removeClass(D)
}}},injectDesktopBodyClass:function(C){var B=this.getConfig(C,"DESKTOP_BODY_CLASS");
if(B){for(var A=0;
A<B.length;
A++){var D=B[A];
$CQ(document.body).addClass(D)
}}B=this.getConfig(C,"MOBILE_BODY_CLASS");
if(B){for(var A=0;
A<B.length;
A++){var D=B[A];
$CQ(document.body).removeClass(D)
}}},getConfig:function(C,B){var A=CQ_Analytics.MobileSliderUtils.CONFIG[C];
if(!A){return null
}return CQ_Analytics.MobileSliderUtils.CONFIG[C][B]
}}
}();
CQ_Analytics.MobileSliderUtils.CONFIG=window.CQMobileSlider||{}
}if(!CQ_Analytics.SocialGraphMgr){CQ_Analytics.SocialGraphMgr=CQ_Analytics.JSONPStore.registerNewInstance("socialgraph");
CQ_Analytics.SocialGraphMgr.internalRenderer=function(A){var C=CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
CQ_Analytics.SocialGraphMgr.lastUid=C;
var D=CQ_Analytics.ProfileDataMgr.getProperty("path");
var B=D+".form.html";
B+=CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/socialgraph.js");
B+="?limit=10";
B+="&callback=${callback}";
CQ_Analytics.SocialGraphMgr.load(CQ.shared.HTTP.externalize(B),{},function(){$CQ("#"+A).children().remove();
CQ_Analytics.SocialGraphMgr.reset();
var F=CQ_Analytics.ProfileDataMgr.getProperty("formattedName");
var E=$CQ("<div>").addClass("cq-socialgraph");
$CQ("<div>").addClass("cq-socialgraph-text").html(F+"'s friends and followers (social graph): ").appendTo(E);
var M={};
var H=this.getJSON();
var N=H.friends;
if(N){for(var I in N){if(N[I]["authorizableId"]){M[N[I]["authorizableId"]]=N[I]
}}}var K=H.followers;
if(K){for(var I in K){if(K[I]["authorizableId"]){M[K[I]["authorizableId"]]=K[I]
}}}var L=0;
for(var G in M){var J=M[G];
$CQ("<img>").attr("title",J.formattedName||J.authorizableId).attr("src",_g.shared.HTTP.externalize(J.avatar)).appendTo(E);
L++;
if(L>=9){break
}}E.hide();
$CQ("#"+A).append(E);
E.fadeIn("fast")
})
};
CQ_Analytics.SocialGraphMgr.renderer=function(B,A){var C=CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
if(C!=CQ_Analytics.SocialGraphMgr.lastUid){CQ_Analytics.SocialGraphMgr.internalRenderer(A)
}};
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.CCM.register(this);
CQ_Analytics.ProfileDataMgr.addListener("update",function(){var A=CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
if(A!=this.lastUid){this.fireEvent("update")
}},CQ_Analytics.SocialGraphMgr)
},CQ_Analytics.SocialGraphMgr)
}if(CQ_Analytics.SegmentMgr&&!CQ_Analytics.SegmentMgr.isResolvedRegistered){CQ_Analytics.SegmentMgr.isResolvedRegistered=true;
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.StoreRegistry.register(CQ_Analytics.SegmentMgr);
CQ_Analytics.CCM.fireEvent("storeregister",CQ_Analytics.SegmentMgr);
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()))
},CQ_Analytics.SegmentMgr)
}if(!CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr=function(){this.addListener("beforepersist",function(){this.checkAuthorizableId()
},this)
};
CQ_Analytics.ProfileDataMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ProfileDataMgr.prototype.STOREKEY="PROFILEDATA";
CQ_Analytics.ProfileDataMgr.prototype.STORENAME="profile";
CQ_Analytics.ProfileDataMgr.prototype.LOADER_PATH=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.js",true);
CQ_Analytics.ProfileDataMgr.prototype.PROFILE_LOADER=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.json",true);
CQ_Analytics.ProfileDataMgr.prototype.init=function(){var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(!B||B==""){this.data={};
for(var C in this.initProperty){this.data[C]=this.initProperty[C]
}}else{this.data=this.parse(B)
}this.persist();
this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.ProfileDataMgr.prototype.checkAuthorizableId=function(){if(!this.data){this.init()
}if(this.data.authorizableId){CQ_Analytics.CCM.setVisitorId(this.data.authorizableId)
}else{CQ_Analytics.CCM.setVisitorId("")
}};
CQ_Analytics.ProfileDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.ProfileDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.ProfileDataMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.ProfileDataMgr.prototype.getLoaderURL=function(){return CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/profiledata/loader.json")
};
CQ_Analytics.ProfileDataMgr.prototype.loadProfile=function(authorizableId){var url=this.getLoaderURL();
url=CQ_Analytics.Utils.addParameter(url,"authorizableId",authorizableId);
try{var object=CQ.shared.HTTP.eval(url);
if(object){this.data={};
for(var p in object){this.data[p]=object[p]
}this.persist();
this.fireEvent("initialize",this);
this.fireEvent("update");
if(CQ_Analytics.ClickstreamcloudEditor){CQ_Analytics.ClickstreamcloudEditor.reload()
}return true
}}catch(error){if(console&&console.log){console.log("Error during profile loading",error)
}}return false
};
CQ_Analytics.ProfileDataMgr=new CQ_Analytics.ProfileDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.checkAuthorizableId();
this.addListener("update",function(A,I){if(I=="birthday"||!I){var J=this.getProperty("birthday");
var K=this.getProperty("age");
var G="";
if(J){try{var C=function(N,M){var L=new Date(M.getTime());
L.setUTCHours(N.getUTCHours(),N.getUTCMinutes(),N.getUTCSeconds(),N.getUTCMilliseconds());
var O=L.getTime()-N.getTime();
return O/(1000*60*60*24)
};
var D=function(L){var M=new Date(L.getFullYear(),0,0);
return C(L,M)*-1
};
var H=new Date(Date.parse(J));
if(!isNaN(H.getTime())){var F=new Date();
if(D(H)==D(F)&&H.getMonth()==F.getMonth()){G=CQ.shared.HTTP.externalize(CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/profiledata/resources/birthday_cake.png"))
}else{var B=F.getFullYear()-H.getFullYear();
if(D(H)>D(F)){G=B
}else{G=Math.max(0,B-1)
}}}else{G=""
}}catch(E){G=""
}}if(K!=G){this.setProperty("age",G)
}}});
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.ProfileDataMgr)
}if(!CQ_Analytics.GeolocationUtils){CQ_Analytics.GeolocationUtils=new function(){return{init:function(B){var D;
try{if(typeof navigator.geolocation==="undefined"){D=google.gears.factory.create("beta.geolocation")
}else{D=navigator.geolocation
}}catch(E){}var A=function(F){var G=CQ_Analytics.PersistedJSONStore.registerNewInstance(B,F);
G.addListener("update",function(H,J){var K=CQ_Analytics.ClientContext.get(B+"/latitude");
var I=CQ_Analytics.ClientContext.get(B+"/longitude");
if(!K||!I){if(J!="generatedThumbnail"){G.setProperty("generatedThumbnail",CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback)
}else{if(G.getProperty(J,true)!=CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback){G.setProperty(J,CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback)
}}}else{if(G.getProperty("generatedThumbnail",true)==CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback){G.setProperty("generatedThumbnail",G.getInitProperty("generatedThumbnail"))
}if(J=="latitude"||J=="longitude"||!J){CQ_Analytics.GeolocationUtils.computeAddress(K,I,B)
}}})
};
var C=function(I,H){var G=CQ_Analytics.StoreRegistry.getStore(B);
if(G){I=I||CQ_Analytics.GeolocationUtils.DEFAULTS;
var F=I.generatedThumbnail=G.getInitProperty("generatedThumbnail");
G.initJSON(I);
if(!H){G.init();
G.setProperty("generatedThumbnail",F)
}}else{A(I)
}};
A();
if(D){D.getCurrentPosition(function(F){var G={longitude:F.coords.longitude,latitude:F.coords.latitude};
if(F.address){G.address=F.address
}C(G,CQ_Analytics.CCM.areStoresInitialized)
},function(F){if(!CQ_Analytics.CCM.areStoresInitialized){var H="Connection timeout";
if(F.code==1){H="Permission denied"
}else{if(F.code==2){H="Position unavailable"
}}var G={address:{country:H}};
C(G,CQ_Analytics.CCM.areStoresInitialized)
}})
}else{C()
}},computeAddress:function(D,B,A){CQ_Analytics.ClientContext.set(A+"/address/region");
CQ_Analytics.ClientContext.set(A+"/address/countryCode");
CQ_Analytics.ClientContext.set(A+"/address/country");
var C=function(){var E=new google.maps.LatLng(D,B);
var F=new google.maps.Geocoder();
F.geocode({location:E},function(G,I){if(I==="OK"&&G[0]&&G[0].address_components){for(var J=0;
J<G[0].address_components.length;
J++){var H=G[0].address_components[J];
if(H.types&&H.types.length){if(H.types[0]=="administrative_area_level_1"){CQ_Analytics.ClientContext.set(A+"/address/region",H.short_name)
}else{if(H.types[0]=="country"){CQ_Analytics.ClientContext.set(A+"/address/countryCode",H.short_name);
CQ_Analytics.ClientContext.set(A+"/address/country",H.long_name)
}}}}}})
};
if(!window.google){window.geocode_callback=C;
$CQ.getScript("http://maps.google.com/maps/api/js?sensor=false&callback=geocode_callback")
}else{C.call()
}}}
}();
CQ_Analytics.GeolocationUtils.DEFAULTS={latitude:37.331375,longitude:-121.893992};
CQ_Analytics.GeolocationUtils.THUMBNAILS={fallback:"http://maps.googleapis.com/maps/api/staticmap?center=37,-121&zoom=0&size=80x80&sensor=false"}
}if(!CQ_Analytics.ActivityStreamMgr){CQ_Analytics.ActivityStreamMgr=CQ_Analytics.JSONStore.registerNewInstance("activitystream",{});
CQ_Analytics.ActivityStreamMgr.internalRenderer=function(C,A){var B=C+".form.html";
B+=CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/activitystream.html");
B+="?limit=3";
CQ.shared.HTTP.get(B,function(E,F,D){$CQ("#"+A).children().remove();
if(F){$CQ("#"+A).append(D.body)
}})
};
CQ_Analytics.ActivityStreamMgr.renderer=function(B,A){if(!B.isReady){B.isReady=true;
CQ_Analytics.ClientContextUtils.onStoreRegistered("profile",function(C){C.addListener("update",function(E,F){var G=this.getProperty("path");
if(G!=CQ_Analytics.ActivityStreamMgr.currentProfilePath){CQ_Analytics.ActivityStreamMgr.currentProfilePath=G;
CQ_Analytics.ActivityStreamMgr.internalRenderer(G,A)
}},C);
var D=C.getProperty("path");
CQ_Analytics.ActivityStreamMgr.currentProfilePath=D;
CQ_Analytics.ActivityStreamMgr.internalRenderer(D,A)
})
}return""
}
};






