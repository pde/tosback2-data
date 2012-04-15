if('function'!=typeof document.getElementsByClassName){document.getElementsByClassName=function(className){return jQuery('.'+className)}}

function USATSiteLife(baseUrl){this._usatAj=new usatAj(baseUrl)}
USATSiteLife.prototype={sitelifeApiUrl:"http:/"+"/sitelife.usatoday.com/ver1.0/Direct/Process",
personaUrl:"http:/"+"/www.usatoday.com/community/profile.htm",
storyLookupPrefix:"http:/"+"/asp.usatoday.com/community/utils/idmap/",
enabled:true,

exceptionLogging:false,
apiLogging:false,
widgetLogging:true,
Debug:0,
initialSetup:function(){try{if(this.enabled==true&&this.isSitelifeAvailable()==true){if($("uslComments")){if(usl.loadReportAbuseForm){usl.loadReportAbuseForm()}
if(usl.Comments){usl.Comments();}}
else if($("uslReviews")){if(usl.loadReportAbuseForm){usl.loadReportAbuseForm()}
if(usl.Reviews){usl.Reviews()}}

if(usl.ArticleControls){usl.ArticleControls()}}}catch(e){this.showException("initialSetup",e)}},
_updateArticle:false,
getUserPersona:function(pid){return this.personaUrl+'?UID='+pid},
getUserPhotoLink:function(pid,photo){var personaHref=this.getUserPersona(pid)
var personaHtml="<a href='"+personaHref+"' border='0'><img src='"+photo+"' alt='User Image' width='58' height='58' /></a>"
return personaHtml},
getUserHandle:function(){var uu=this.getCookie("USATINFO")
return this.getCookieValue(uu,"Handle")},
getUserHandleLink:function(pid,handle){var personaHref=this.getUserPersona(pid)
var handleHtml="<a href='"+personaHref+"'><b>"+handle+"</b></a>"
return handleHtml},
getUserPid:function(){var uu=this.getCookie("USATINFO")
return this._guidToPid(this.getCookieValue(uu,"UserID"))},
isSignedIn:function(){var uu=this.getCookie("USATINFO")
if(uu){var uuStatus=this.getCookieValue(uu,"Status")
return(uuStatus=="Signed In")}
return false},
getUserMsgsLink:function(msgs){var msgLink="<a href='"+this.personaUrl+"?plckPersonaPage=PersonaMessages'>"+msgs+" messages</a>"
return msgLink},
getArticleKey:function(){var id=(usat.contentID)?usat.contentID:usat.storyID
return id},
getArticleTitle:function(){var title=""
if(usat.contentTitle){title=usat.contentTitle}else{title=document.title.split('- USATODAY')[0]
title=title.split('#')[0]}
return title},
getArticleLink:function(artId){var id=(artId)?artId:""

if(!id||id==""){id=this.getArticleKey()}
if(id&&id!=""){if(id.match(/http\:/)){return id}else{return this.storyLookupPrefix+id}}else{return"#none"}},

getArticleSection:function(){return new Section(this.getArticleKey().split(".")[1])},

getArticleCats:function(cats){if(!cats){cats=usat.contentType}
cats=(cats&&cats!='')?cats.split("."):new Array()
var categories=new Array()
for(i=0;i<cats.length;i++){categories[i]=new Category(cats[i])}
return categories},
_compareArticleInfo:function(article){if(!article||(article&&(!article.Section||article.Categories.length==0))){return true}

var sec=this.getArticleSection()
if(article&&(article.Section&&sec.Section&&(article.Section.Name!=sec.Section.Name))){return true}

var cats=this.getArticleCats()
if(article&&article.Categories&&article.Categories.length>0){if(article.Categories.length!=cats.length){return true}
var i=0
for(i=0;i<article.Categories.length;i++){if(cats[i].Category.Name!=article.Categories[i].Name){return true}}}
return false},
getCommentCountControl:function(count,link){var comCntCtl=""
var strCount=usl.niceNumber(count)
var strLabel="Comments"
var strZeroPad=""
if(count==0){strCount="&nbsp;"
strLabel="Comment"
strZeroPad=" style='padding-left:10px;'"}
comCntCtl+="<span class='uslCommentsLink'>"
comCntCtl+=" <a href='"+link+"' title='Go to comments' alt='Go to comments'>"
if(typeof(uslReverseLabelCount)!="undefined"){comCntCtl+="  <span class='uslCommentsCount'"+strZeroPad+">"+strCount+"</span>"
comCntCtl+="  <span class='uslCommentsLabel'>"+strLabel+"</span>"}
else{comCntCtl+="  <span class='uslCommentsLabel'>"+strLabel+"</span>"
comCntCtl+="  <span class='uslCommentsCount'"+strZeroPad+">"+strCount+"</span>"}
comCntCtl+=" </a>"
comCntCtl+="</span>"
return comCntCtl},
getReviewCountControl:function(count,link){var revCntCtl=""
var strCount=usl.niceNumber(count)
var strLabel="Reviews"
var strZeroPad=""
if(count==0){strCount="&nbsp;"
strLabel="Review"
strZeroPad=" style='padding-left:10px;'"}
revCntCtl+="<span class='uslReviewsLink'>"
revCntCtl+=" <a href='"+link+"' title='Go to reviews' alt='Go to reviews'>"
revCntCtl+="  <span class='uslReviewsLabel'>"+strLabel+"</span>"
revCntCtl+="  <span class='uslReviewsCount'"+strZeroPad+">"+strCount+"</span>"
revCntCtl+=" </a>"
revCntCtl+="</span>"
return revCntCtl},
getRecommendCountControl:function(type,key,recCount,recommended){var recHtml=""
if(key==null||key.split('.')[0]==""){recHtml+="<span class='uslDisabledRecommendLink'>"
if(typeof(uslReverseLabelCount)!="undefined"){recHtml+=" <span class='uslDisabledRecommendCount'>0</span>"
recHtml+=" <span class='uslRecommendLabel'>Recommend</span>"}
else{recHtml+=" <span class='uslRecommendLabel'>Recommend</span>"
recHtml+=" <span class='uslDisabledRecommendCount'>0</span>"}
recHtml+="</span>"}else{if(recommended==true){recHtml+="<span class='uslRecommended'>"
if(typeof(uslReverseLabelCount)!="undefined"){recHtml+=" <span class='uslRecommendedCount'>"+usl.niceNumber(recCount)+"</span>"
recHtml+=" <span class='uslRecommendLabel'>Recommended</span>"}
else{recHtml+=" <span class='uslRecommendLabel'>Recommended</span>"
recHtml+=" <span class='uslRecommendedCount'>"+usl.niceNumber(recCount)+"</span>"}
recHtml+="</span>"}else{var strCount=usl.niceNumber(recCount)
var strZeroPad=""
if(recCount==0){strCount="&nbsp;"
strZeroPad=" style='padding-left:10px;'"}
recHtml+="<span id='uslRecommend:"+type+":"+key+"'>"
recHtml+=" <span class='uslRecommendLink'>"
recHtml+="  <a href=\"javascript:void(\'Recommend\')\" title='Recommend this article' alt='Recommend this article' onclick=\"usl.Recommend('"+type+"','"+key+"','"+recCount+"');\">"
if(typeof(uslReverseLabelCount)!="undefined"){recHtml+="   <span class='uslRecommendCount'"+strZeroPad+">"+strCount+"</span>"
recHtml+="   <span class='uslRecommendLabel'>Recommend</span>"}
else{recHtml+="   <span class='uslRecommendLabel'>Recommend</span>"
recHtml+="   <span class='uslRecommendCount'"+strZeroPad+">"+strCount+"</span>"}
recHtml+="  </a>"
recHtml+=" </span>"
recHtml+="</span>"}}
return recHtml},
Recommend:function(type,key,recCount){var recKey=null
if(type=='comment'){recKey=new CommentKey(key)}else if(type=='review'){recKey=new ReviewKey(key)}else if(type=='article'){recKey=new ArticleKey(key)}
if(usl.widgetLogging==true){var logTxt="recommend "+type+" "+key
usl.countEvent(logTxt)}
var rb=new RequestBatch()
rb.AddToRequest(new RecommendAction(recKey))
this.sitelifeRequest(rb,"SubmitRecommend",this._recommendCallback)
var recLink=$("uslRecommend:"+type+":"+key)
if(recLink){var num=parseInt(recCount,10)
num+=1
recLink.innerHTML=this.getRecommendCountControl(type,key,num,true)}},
_recommendCallback:function(res){if(res.Messages.length>0&&res.Messages[0].Message=="ok"){usl.showDebug("Recommend Successful")}else{usl.showDebug("Recommend Failed: "+res.Messages[0].Message)}

if(usl.Debug&&res.Responses){usl.lastRecommendRes=res.Responses}},
sitelifeRequest:function(slBatch,action,callback,errH){if(this._updateArticle==true){var articleKey=this.getArticleKey()
var loc=""
var articleLink=(loc=document.location.toString().split('#')[0])?loc:this.getArticleLink()
var title=this.getArticleTitle()
var section=this.getArticleSection()
var cats=this.getArticleCats()
slBatch.AddToRequest(new UpdateArticleAction(new ArticleKey(articleKey),articleLink,title,section,cats))}
this.logSiteLife("uslRequest:"+action,slBatch)
var This=this
var callbackWrap=function(response){try{usl.logSiteLife("uslResponse:"+action,{'Response':response,'OrigRequest':slBatch})
callback(response)}catch(e){usl.showException("SL Request Callback Wrapper",e)}}
try{slBatch.BeginRequest(this.sitelifeApiUrl,callbackWrap)}catch(e){this.showException("SL Request",e)}},
getIframeDocument:function(id){var ifNode=$(id)
var slDoc=null
try{if(ifNode.contentDocument&&ifNode.contentDocument.document&&ifNode.contentDocument.document.body){slDoc=ifNode.contentDocument.document}else if(ifNode.contentWindow&&ifNode.contentWindow.document&&ifNode.contentWindow.document.body){slDoc=ifNode.contentWindow.document}else if(ifNode.document&&ifNode.document.body){slDoc=ifNode.document}}catch(e){return null}
return slDoc},
isSitelifeAvailable:function(){if(typeof(DiscoverArticlesAction)!='undefined'){return true}else{return false}},
logSiteLife:function(msg,obj){if(usl.apiLogging==true){usl.showDebug(msg)
if(typeof(uoTrack)!='undefined'){var code="USL DAAPI Call '"+msg+"'"
uoTrack(code)}}},
countEvent:function(code){if(typeof(uoTrack)!='undefined'){code="USL "+code
uoTrack(code)}},
ajax:function(url,rH,errH){this._usatAj.ajax(url,rH?this._rH(rH):function(){},errH?this._rH(errH):null)},
ahah:function(tag,innerHTML,url,optionalErrorHtml){this._usatAj.ahah(tag,innerHTML,url,optionalErrorHtml)},
_rH:function(fn){var This=this
return function(){fn.apply(This,arguments)}},
_loadTemplate:function(templateUrl,templateType,callback){var This=this
this.showDebug("loading template '"+templateUrl+"'")
var rh=function(response){var tNode=document.createElement('div')
var bodyNode=document.getElementsByTagName('body')[0]
bodyNode.appendChild(tNode)
try{tNode.style.display='none'}catch(e){}
tNode.innerHTML=response

var tmpls=document.getElementsByClassName("uslTemplate")
try{var i
var tid
var tcontent
for(i=0;i<tmpls.length;i++){tid=tmpls[i].id
tcontent=tmpls[i].innerHTML
this._templates[templateType][tid]=tcontent}}catch(e){this.showException("loadTemplate rH",e)}

bodyNode.removeChild(tNode)
if(callback){callback(response)}}
var errH=function(response){this.showException("_loadTemplate - "+templateUrl,response)}

this.ajax(templateUrl,rh,errH)},
_transform:function(data,template){var self=data
var rules={"self":unescape(template)}
var T={output:false,
init:function(){for(var rule in rules){if(rule.substr(0,4)!="self"){rules["self."+rule]=rules[rule]}}
return this},
apply:function(expr){var trf=function(s){var result=''
var index=0
var places=s.match(/{[A-Za-z0-9_\$\.\[\]\'@\(\)]+}/g)
for(var j=0;j<places.length;j++){var ndx2=s.indexOf(places[j])
result+=s.substring(index,ndx2)
result+=T.processArg(places[j].substring(1,places[j].length-1),expr)
index=ndx2+places[j].length}
result+=s.substring(index,s.length)
return result}
var x=expr.replace(/\[[0-9]+\]/g,"[*]"),res
if(x in rules){if(typeof(rules[x])=="string"){res=trf(rules[x])}else if(typeof(rules[x])=="function"){res=trf(rules[x](eval(expr)).toString())}}else{res=T.eval(expr)}
return res},
processArg:function(arg,parentExpr){var expand=function(a,e){return(e=a.replace(/^\$/,e)).substr(0,4)!="self"?("self."+e):e},
res=""
T.output=true
if(arg.charAt(0)=="@"){res=eval(arg.replace(/@([A-za-z0-9_]+)\(([A-Za-z0-9_\$\.\[\]\']+)\)/,
function($0,$1,$2){return"rules['self."+$1+"']("+expand($2,parentExpr)+")"}))}else if(arg!="$"){res=T.apply(expand(arg,parentExpr))}else{res=T.eval(parentExpr)}
T.output=false
return res},
eval:function(expr){var v=eval(expr),res=""
if(typeof(v)!="undefined"){if(v instanceof Array){for(var i=0;i<v.length;i++){if(typeof(v[i])!="undefined"){res+=T.apply(expr+"["+i+"]")}}}else if(typeof(v)=="object"){for(var m in v){if(typeof(v[m])!="undefined"){res+=T.apply(expr+"."+m)}}}else if(T.output){res+=v}}
return res}}
try{return T.init().apply("self")}catch(e){usl.showException("_transform",e)
return" "}},
_stripHtml:function(body){var stripped=""
if(body.length>0){var stripped=body.replace(/</g,"&lt;")
stripped=stripped.replace(/>/g,"&gt;")
stripped=stripped.replace(/\u2019/g,"&#8217;")
stripped=stripped.replace(/\u201C/g,"&#8220;")
stripped=stripped.replace(/\u201D/g,"&#8221;")
stripped=stripped.replace(/\r\n/g,"\n")
stripped=stripped.replace(/\n/g,"<br />\n")}
return stripped},
_getNameValues:function(arr,delim){var valArray=new Array()
var i=0
for(i=0;i<arr.length;i++){valArray[i]=arr[i].Name}
return valArray.join(delim)},
_stopFormSubmit:function(evt){if((evt.keyCode?evt.keyCode:evt.which)=="13"){evt.cancelBubble=true
if(evt.preventDefault){evt.preventDefault()}
if(evt.returnValue){evt.returnValue=false}
if(evt.stopPropagation){evt.stopPropagation()}}},
_mouseX:function(evt){if(evt.pageX){return evt.pageX}else if(evt.clientX){return evt.clientX+(document.documentElement.scrollLeft?
document.documentElement.scrollLeft:
document.body.scrollLeft)}else{return null}},
_mouseY:function(evt){if(evt.pageY){return evt.pageY}else if(evt.clientY){return evt.clientY+(document.documentElement.scrollTop?
document.documentElement.scrollTop:
document.body.scrollTop)}else{return null}},
_hideDiv:function(id){document.getElementById(id).style.display="none"},
_showDivAtMouse:function(evt,id){posx=this._mouseX(evt)-170
posy=this._mouseY(evt)
document.getElementById(id).style.left=posx+"px"
document.getElementById(id).style.top=posy+"px"
document.getElementById(id).style.display="block"},
niceNumber:function(num){num=num.toString()
if(num.length<=3){return(num=="")?"0":num}else{var niceNum=""
try{if(mod=(num.length%3)){niceNum=num.substr(0,mod)+","}
for(i=0;i<=(num.length/3)-1; i++) {if(i!=0){niceNum=niceNum+","}
niceNum=niceNum+num.substr((3*i)+mod,3)}}catch(e){return num}
return niceNum}},
niceDate:function(date){var retDate=date
if(typeof(niceDate)=='undefined'){retDate=date}else{try{retDate=niceDate(date)}catch(e){retDate=date}}
return retDate},
_guidToPid:function(guid){var pid=""
var i=0
var hashval=0

guid=guid.replace(/-/g,"")

for(i=0;i<16;i++){hashval=0

hashval=parseInt("0x"+guid.charAt(i*2))+
parseInt("0x"+guid.charAt((i*2)+1))

if(hashval>=16){hashval=hashval-16}

pid=pid+hashval.toString(16)}
return pid},
getCookie:function(name){var v=usat.cookie.get(name)
if("undefined"==v||"null"==v||null==v){v=""}
return v},
setCookie:function(name,value,expirationDate,path,domain,encrypted){usat.cookie.set(name,value,expirationDate,path,domain,encrypted)},
getCookieValue:function(cookie,name){return getCookieStringParamValue(cookie,name)},
setCookieValue:function(cookie,name,value){var updatedNVPS=setCookieParamValueForCookieString(cookie,name,value)
if(!updatedNVPS){updatedNVPS=cookie+'&'+name+'='+escape(value)}
return updatedNVPS},
showDebug:function(debugtext){if(this.Debug==1){this._usatAj.showDebug("usl> "+debugtext)}},
showException:function(location,ex){var msg=" "
if(ex&&ex.name&&ex.message){msg="Javascript Exception in "+location+": "+ex.name+" - "+ex.message}else{msg="Error in "+location+" - "+ex}
this.showDebug(msg)

if(usl.exceptionLogging==true){if(typeof(uoTrack)!='undefined'){var code="USL EXCEPTION '"+location
if(ex&&ex.message){code+=" ~ "+ex.message+"'"}else{code+="'"}
uoTrack(code)}}}}
var usl=new USATSiteLife("http:/"+"/js.usatoday.com")

DirectAccessErrorHandler=function(msg,ex){usl.showException("SL ex - "+msg,ex)}

