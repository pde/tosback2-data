
usl.reportAbuseForm="community/_templates/reportAbuseForm.htm"
usl.commentsTemplateUrl="http://i.usatoday.net/community/_templates/commentsTemplate.htm"
usl.commentsTemplateUrlPage2="http://i.usatoday.net/community/_templates/commentsTemplateFormBottom.htm"
usl.commentMaxChars=10000
usl.commentSortOrder="TimeStampDescending"
usl.commentSortEnabled=false
usl.msgURL="community/pm.htm"
usl.reviewsTemplateUrl="community/_templates/reviewsTemplate.htm"
usl.reviewMaxChars=10000
usl.reviewSortOrder="TimeStampDescending"
usl.ratingStarsUrl="http:/"+"/i.usatoday.net/community/_common/_images/stars/"
usl.badWordUrl="http:/"+"/content.usatoday.com/community/utils/bwf/get.ashx"
usl.paginationLinks=6
usl.paginationURL="http://content.usatoday.com/community/comments.aspx"
usl.paginationSet="2"
usl.commentsPerPage=10

var uu=usl.getCookie("USATINFO")
if(uu){if(getCookieStringParamValue(uu,"so")=="asc"){usl.commentSortOrder="TimeStampAscending"}
else if(getCookieStringParamValue(uu,"so")=="rec"){usl.commentSortOrder="RecommendationsDescending"}}

usl.bwfon=true
usl.reactionsClosed=false
usl.ratingsEnabled=true
usl.Comments=function(){if(usl.widgetLogging==true){if(document.location.toString().indexOf("#uslPageReturn")!=-1){usl.countEvent("comment link")}
if(document.location.toString().indexOf("#discov")!=-1){usl.countEvent("discovery link")}}

usl._templates.comments['loaded']=false
if(document.URL.match(/comments.aspx/)){this._loadTemplate(usl.commentsTemplateUrlPage2,'comments',this._loadCommentTemplatesCallback)}
else{this._loadTemplate(this.commentsTemplateUrl,'comments',this._loadCommentTemplatesCallback)}}
usl._loadCommentTemplatesCallback=function(response){usl._templates.comments['loaded']=true

$("uslComments").style.display='none'
$("uslComments").innerHTML=usl._templates.comments['section']
if(usl.reactionsClosed==false){$("uslReactionForm").innerHTML=usl._templates.comments['form']
usl.updateReactionFormHead('comment')}

if(typeof(commentsPage)!='undefined'&&commentsPage!=''){usl.getReactions('comment',commentsPage)}
else{usl.getReactions('comment')}}
usl.setSortOrder=function(){var orderNode=$('uslSortOrder')
if(orderNode){usl.paginationTransition('Sort Order Action')
usl.commentSortOrder=orderNode.value
var soVal=""
if(usl.commentSortOrder=="TimeStampDescending"){soVal="dsc"}
else if(usl.commentSortOrder=="TimeStampAscending"){soVal="asc"}
else if(usl.commentSortOrder=="RecommendationsDescending"){soVal="rec"}
if(soVal){var uu=usl.getCookie("USATINFO")
if(uu){uu=usl.setCookieValue(uu,'so',soVal)
var now=new Date().getTime()
var expireDate=new Date(new Date().setTime(now+usatAuth.urExpireTime))
usl.setCookie("USATINFO",uu,expireDate,"/",usatAuth.cookieDomain,"")}
else{var now=new Date().getTime()
var expireDate=new Date(new Date().setTime(now+usatAuth.urExpireTime))
usl.setCookie("USATINFO","so="+soVal,expireDate,"/",usatAuth.cookieDomain,"")}}
usl.getReactions('comment')}}
usl.Reviews=function(){if(usl.widgetLogging==true){if(document.location.toString().indexOf("#uslPageReturn")!=-1){usl.countEvent("review link")}
if(document.location.toString().indexOf("#discov")!=-1){usl.countEvent("discovery link")}}
this.detectRatingImageUrl()

usl._templates.reviews['loaded']=false
this._loadTemplate(this.reviewsTemplateUrl,'reviews',this._loadReviewTemplatesCallback)}
usl._loadReviewTemplatesCallback=function(response){usl._templates.reviews['loaded']=true

$("uslReviews").style.display='none'
$("uslReviews").innerHTML=usl._templates.reviews['section']
if(usl.reactionsClosed==false){$("uslReactionForm").innerHTML=usl._templates.reviews['form']
usl.updateReactionFormHead('review')}
usl.getReactions('review')}
usl.detectRatingImageUrl=function(){var section=""
section=document.location.toString().split("/")[3]
section=section.toLowerCase()
if(section=="news"||section=="travel"||section=="money"||section=="sports"||section=="life"||section=="tech"||section=="weather"){this.ratingStarsUrl+=section+"/"}else{section=(usat.contentType)?usat.contentType.split(".")[0]:""
if(section=="news"||section=="travel"||section=="money"||section=="sports"||section=="life"||section=="tech"||section=="weather"){this.ratingStarsUrl+=section+"/"}}}
usl.getRatingControl=function(rating,enabled){var ratCtl=""
if(enabled==true&&this._templates.reviews['loaded']==true){ratCtl=this._templates.reviews['ratingControl']
ratCtl=ratCtl.replace(/http[^\"\']+zero.gif/,this.ratingStarsUrl+"null_zero.gif")
ratCtl=ratCtl.replace(/http[^\"\']+00.gif/,this._getRatingImageUrl(rating))}else{ratCtl="<img alt='' src='"+this.ratingStarsUrl+"null_zero.gif' border='0' />"
ratCtl+="<img alt='' src='"+this._getRatingImageUrl('0')+"' border='0'>"}
return ratCtl}
usl.getRatingImage=function(rating){var ratHtml="<img alt='' src='"+this._getRatingImageUrl(rating)+"' border='0'>"
return ratHtml}
usl._getRatingImageUrl=function(rating){var starsUrl=""
var ratNum=parseInt(Math.round(rating))
switch(ratNum){case 1:starsUrl=this.ratingStarsUrl+"00.gif";break
case 2:starsUrl=this.ratingStarsUrl+"05.gif";break
case 3:starsUrl=this.ratingStarsUrl+"10.gif";break
case 4:starsUrl=this.ratingStarsUrl+"15.gif";break
case 5:starsUrl=this.ratingStarsUrl+"20.gif";break
case 6:starsUrl=this.ratingStarsUrl+"25.gif";break
case 7:starsUrl=this.ratingStarsUrl+"30.gif";break
case 8:starsUrl=this.ratingStarsUrl+"35.gif";break
case 9:starsUrl=this.ratingStarsUrl+"40.gif";break
default:starsUrl=this.ratingStarsUrl+"00.gif";break}
return starsUrl}
usl._fillRatingStar=function(ratingStars,ratingField,rating){var ratStars=$(ratingStars)
var ratField=$(ratingField)
var oldRating=parseInt(ratField.value,10)
var newRating=rating
if(newRating<1&&oldRating>=newRating){newRating=oldRating}
if(newRating>=1&&newRating<=9){ratStars.src=this._getRatingImageUrl(newRating)}else{ratStars.src=this._getRatingImageUrl('0')}}
usl._setRating=function(ratingField,rating){var ratField=$(ratingField)
ratField.value=rating}
usl.getReactions=function(type,page){if(page==null){page=1}
var articleKey=this.getArticleKey()
if(articleKey.split(".")[0]==""){this.showException("getReactions: ContentID not specified")
return}
var rb=new RequestBatch()
if(type=='comment'){rb.AddToRequest(new CommentPage(new ArticleKey(articleKey),usl.commentsPerPage,page,this.commentSortOrder))}else if(type=='review'){rb.AddToRequest(new ReviewPage(new ArticleKey(articleKey),usl.commentsPerPage,page,this.reviewSortOrder))}else{this.showException("getReactions: ContentType not specified")
return}
rb.AddToRequest(new ArticleKey(articleKey))
this.sitelifeRequest(rb,"LoadReactions",this._getReactionsCallback)}
usl._getReactionsCallback=function(resBatch){var rPage=null
var rList=null
var rType=null
var article=null
var i=0
for(i=0;i<resBatch.Responses.length;i++){var res=resBatch.Responses[i]
if(res.CommentPage!=null){rPage=res.CommentPage
rList=res.CommentPage.Comments
rType='comment'}else if(res.ReviewPage!=null){rPage=res.ReviewPage
rList=res.ReviewPage.Reviews
rType='review'}else if(res.Article!=null){article=res.Article}}

usl._updateArticle=usl._compareArticleInfo(article)

try{var slpc=usl.getCookie("USATINFO")
var pid=usl.getCookieValue(slpc,"UserID")
var uid=usl._guidToPid(pid)}
catch(err){}

if(rList){var rListHtml=""
var countControl=0
for(i=0;i<rList.length;i++){var bozocheck=usl._getReactionHtml(rType,rList[i],uid)
rListHtml+=bozocheck
if(bozocheck!=""){countControl++}}
$("uslReactionList").innerHTML=rListHtml}
if(rPage){if(rType=='comment'){$("uslComments").style.display='block'
var comCnt=(typeof(uslComCountOffset)!='undefined'&&uslComCountOffset!='')?uslComCountOffset:0
comCnt=parseInt(comCnt)+parseInt(rPage.NumberOfComments)
var sortControl=""
if(usl.commentSortEnabled){sortControl+="<div class='uslSortOrder'>Showing:&nbsp;&nbsp;"
sortControl+=" <select id='uslSortOrder' onchange='usl.setSortOrder();'>"
sortControl+="  <option value='TimeStampDescending'"+((usl.commentSortOrder=="TimeStampDescending")?" selected":"")+">Newest first</option>"
sortControl+="  <option value='TimeStampAscending'"+((usl.commentSortOrder=="TimeStampAscending")?" selected":"")+">Oldest first</option>"
sortControl+="  <option value='RecommendationsDescending'"+((usl.commentSortOrder=="RecommendationsDescending")?" selected":"")+">Most recommended</option>"
sortControl+=" </select>"
sortControl+=" &nbsp;&nbsp;<span style=color:#ff0000>New:</span> Most recommended!"
sortControl+="</div>"}
if(comCnt==0&&usl.commentSortOrder=="RecommendationsDescending"){$("uslReactionSummary").innerHTML="<div class='uslSortOrder' style='height:40px;'><span style='float:left;'>There are not yet any recommended comments.</span>"+sortControl+"</div><div class='uslSortOrder' style='height:60px;'>Please change your sort order to Newest First or Oldest First to view any other comments.</div>"}
else
{if(comCnt>usl.commentsPerPage){$("uslReactionSummary").innerHTML="<div class='uslComSmry' style='height:20px;'><span class='uslComSmryCount' style='float:left;'>Comments: ("+usl.niceNumber(comCnt)+")</span>"+sortControl+"</div>"}
else{$("uslReactionSummary").innerHTML="<div class='uslComSmry' style='height:20px;'><span class='uslComSmryCount' style='float:left;'>Comments: ("+usl.niceNumber(countControl)+")</span>"+sortControl+"</div>"}}}else if(rType=='review'){$("uslReviews").style.display='block'
var smryHtml="<div class='uslRevSmry'><span class='uslRevSmryCount'>Reviews: ("+usl.niceNumber(rPage.NumberOfReviews)+")</span>"
if(usl.ratingsEnabled==true)
smryHtml+="<span class='uslRevSmryRating'>Average Rating: <span class='uslRevSmryRatingStars'>"+usl.getRatingImage(rPage.AverageReviewRating)+"</span></span></div>"
$("uslReactionSummary").innerHTML=smryHtml}}
if(rPage){$("uslPagination").innerHTML=usl.getPaginationControl(rType,rPage)
if($("uslPaginationTop")){$("uslPaginationTop").innerHTML=$("uslPagination").innerHTML}}
var cntCtl=$("uslCountControl")
if(cntCtl){if(rType=='comment'){var comCnt=(typeof(uslComCountOffset)!='undefined'&&uslComCountOffset!='')?uslComCountOffset:0
if(rPage){comCnt=parseInt(comCnt)+parseInt(rPage.NumberOfComments)}
if(comCnt>usl.commentsPerPage){cntCtl.innerHTML=usl.getCommentCountControl(comCnt,"#uslPageReturn")}
else{cntCtl.innerHTML=usl.getCommentCountControl(countControl,"#uslPageReturn")}}else if(rType=='review'){var revCnt=0
if(rPage){revCnt=rPage.NumberOfReviews}
cntCtl.innerHTML=usl.getReviewCountControl(revCnt,"#uslPageReturn")}}
var recCtl=$("uslRecommendControl")
if(recCtl){var recd=false
var recCnt=0
var artKey=usl.getArticleKey()
if(article){recd=(article.Recommendations&&article.Recommendations.CurrentUserHasRecommended=='True')?true:false
recCnt=article.Recommendations.NumberOfRecommendations
artKey=article.ArticleKey.Key}
recCtl.innerHTML=usl.getRecommendCountControl('article',artKey,recCnt,recd)}

if(usl.Debug&&resBatch.Responses){usl.lastReactionsRes=resBatch.Responses}}
usl._getReactionHtml=function(type,reaction,userid){var reacHtml=""
var authorKey=reaction.Author.UserKey.Key
var recd=(reaction.CurrentUserHasRecommended=="True")?true:false
var rptd=(reaction.CurrentUserHasReportedAbuse=="True")?true:false
recNum=(!recNum)?'0':recNum
var staffMark=(reaction.Author.UserTier=="Editor")?"USA TODAY Staff":""
staffMark=(reaction.Author.UserTier=="Featured")?"USA TODAY Staff":staffMark
staffMark=(reaction.Author.UserTier=="Staff")?"USA TODAY Staff":staffMark
var recNum=reaction.NumberOfRecommendations
if(type=='comment'){if(userid=="undefined"){userid=""}
if((authorKey==userid&&reaction.Author.IsBlocked=="True")||(reaction.Author.IsBlocked=="False")){var comKey=reaction.CommentKey.Key
var title=this.getArticleTitle()
var articleLink=this.getArticleLink(document.location.toString().split('#')[0])
articleLink=articleLink.replace("=","%3D")
var pmURL=usl.msgURL+"?slPage=compose&slSeedUserId="+authorKey+"&slForumMessageSubject="+title+"&slForumUrl="+articleLink
var commentData={'authorIcon':this.getUserPhotoLink(authorKey,reaction.Author.AvatarPhotoUrl),
'authorHandle':this.getUserHandleLink(authorKey,reaction.Author.DisplayName),'authorFriends':reaction.Author.NumberOfFriends,
'pmURL':pmURL,
'commentTimestamp':this.niceDate(reaction.PostedAtTime),
'commentBody':reaction.CommentBody.replace(/([^\s]{48})/g, "$1 "),
'commentKey':comKey,
'recommendLink':this.getRecommendCountControl('comment',comKey,recNum,recd),
'reportAbuseLink':this.getReportAbuseLink('comment',comKey,rptd),
'staffMark':staffMark}
try{reacHtml=this._transform(commentData,this._templates.comments['comment'])}catch(e){this.showException("_getReactionHtml() comment transform",e)}}}
else if(type=='review'){var revKey=reaction.ReviewKey.Key
var title=this.getArticleTitle()
var articleLink=this.getArticleLink(document.location.toString().split('#')[0])
articleLink=articleLink.replace("=","%3D")
var pmURL=usl.msgURL+"?slPage=compose&slSeedUserId="+authorKey+"&slForumMessageSubject="+title+"&slForumUrl="+articleLink
var rating=""
if(this.ratingsEnabled==true){rating=this.getRatingImage(reaction.ReviewRating)}
var reviewData={'authorIcon':this.getUserPhotoLink(authorKey,reaction.Author.AvatarPhotoUrl),
'authorHandle':this.getUserHandleLink(authorKey,reaction.Author.DisplayName),
'authorFriends':reaction.Author.NumberOfFriends,
'pmURL':pmURL,
'reviewTimestamp':this.niceDate(reaction.PostedAtTime),
'reviewTitle':reaction.ReviewTitle,
'reviewRating':rating,
'reviewBody':reaction.ReviewBody,
'reviewKey':revKey,
'recommendLink':this.getRecommendCountControl('review',revKey,recNum,recd),
'reportAbuseLink':this.getReportAbuseLink('review',revKey,rptd),
'staffMark':staffMark}
try{reacHtml=this._transform(reviewData,this._templates.reviews['review'])}catch(e){this.showException("_getReactionHtml() review transform",e)}}
return reacHtml}
usl.updateReactionFormHead=function(type,signOut){if(this.reactionsClosed==false&&(this._templates.comments['loaded']==true||this._templates.reviews['loaded']==true)){var reacFormHead=$("uslReactionFormHead")
if(reacFormHead){var headHtml=""
if(signOut==true||!this.isSignedIn()){if(type=='comment'){headHtml=this._templates.comments['headLoggedOut']}else if(type=='review'){headHtml=this._templates.reviews['headLoggedOut']}}else{var uHandleLink=this.getUserHandleLink(this.getUserPid(),this.getUserHandle())
var headerData={'userHandleLink':uHandleLink}
var headerTemplate=""
if(type=='comment'){headerTemplate=this._templates.comments['headLoggedIn']}else if(type=='review'){headerTemplate=this._templates.reviews['headLoggedIn']}
try{headHtml=this._transform(headerData,headerTemplate)}catch(e){this.showException("updateReactionFormHead() head transform",e)}}
reacFormHead.innerHTML=headHtml}
if(type=='comment'){var comBody=$("uslComFormBody")
var comBtn=$("uslComFormSubmit")
var comFb=$("facebook_connect_checkbox")
if(comBody&&comBtn){if(signOut==true||!this.isSignedIn()){comBody.disabled=true
comBtn.disabled=true
comFb.disabled=true}else{comBody.disabled=false
comBtn.disabled=false
comFb.disabled=false}}
slFB.init(function(){if(slFB.isLoggedIn()){document.getElementById('facebook_connect_wrapper').style.display='block'
document.getElementById('facebook_connect_checkbox').checked=false
document.getElementById('no_facebook_connect').style.display='none'}})}else if(type=='review'){var revTitle=$("uslRevFormTitle")
var revRating=$("uslRevFormRatingControl")
var revValNode=$("uslRevFormRating")
var revRatingVal=(revValNode)?revValNode.value:0
var revRatingImage=$("uslRevFormRatingImage")
var revBody=$("uslRevFormBody")
var revBtn=$("uslRevFormSubmit")
if(revTitle&&revRating&&revBody&&revBtn){if(signOut==true||!this.isSignedIn()){revTitle.disabled=true
if(this.ratingsEnabled==true){if(revRatingImage){revRatingImage.innerHTML=this.getRatingControl(0,false)}else{revRating.innerHTML=this.getRatingControl(0,false)}}else{revRating.innerHTML=""}
revBody.disabled=true
revBtn.disabled=true}else{revTitle.disabled=false
if(this.ratingsEnabled==true){revRating.innerHTML=this.getRatingControl(revRatingVal,true)
this._setRating("uslRevFormRating",revRatingVal)}else{revRating.innerHTML=""}
revBody.disabled=false
revBtn.disabled=false}}}

if(this.reloadOnEvent==false){usatAuth.em.loginHandlers["uslReactionHeader"]=function(){if(usl._avatarOverride==true&&(ur=$("USATRegister"))){ur.style.display='none'};usl.updateReactionFormHead(type);usl.getReactions(type,1)}
usatAuth.em.logoutHandlers["uslReactionHeader"]=function(){if(usl._avatarOverride==true&&(ur=$("USATRegister"))){ur.style.display='none'};usl.updateReactionFormHead(type,true);usl.getReactions(type,1)}
usatAuth.em.optionsHandlers["uslReactionHeader"]=function(){usl.updateReactionFormHead(type);usl.getReactions(type,1)}}}}
usl.getPaginationControl=function(type,page){var reacCount=(type=='comment')?page.NumberOfComments:page.NumberOfReviews
var plusMinus=this.paginationLinks
var pageControl=""
if(reacCount>usl.commentsPerPage){pageControl+="<div class=\"uslPaginationInside\">"
if(page.OnPage==1&&!document.URL.match(/comments.aspx/)){pageControl+="<span class=\"morecomments\">More comments on this story: </span>"}
else{pageControl+="<span class=\"morecomments\">More comments: </span>"}
var pageDiv=parseInt(reacCount)/usl.commentsPerPage
if(pageDiv>parseInt(pageDiv)){pageDiv+=1}
pageDiv=parseInt(pageDiv)
var ll,ul
var rPoP=page.OnPage
var pnp=rPoP-1
var urlPage=usl.paginationURL+"?id="+usat.contentID+"&p="

var urlPageNum=document.URL.replace(/.*&p=(\d+).*/,"$1")
if(urlPageNum>0&&urlPageNum!=page.OnPage){}
if(rPoP!=1){if(document.URL.match(/blogs.|\/travel\/flights|\/travel\/cruises\/|\/smokestack\/|\/guide\//)){pageControl+=" <a href=\"#uslPageReturn\" title='Go to first page' alt='Go to first page' onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','1');\"><img src='http:/"+"/i.usatoday.net/community/_common/_images/home-arrow-pag-prev.gif' border='0'></a> "
pageControl+=" <a href=\"#uslPageReturn\" title='Go to previous page' alt='Go to previous page' onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','"+pnp+"');\">Prev</a> "}
else{pageControl+=" <a href=\""+urlPage+"1\" title='Go to first page' alt='Go to first page' onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','1');\"><img src='http:/"+"/i.usatoday.net/community/_common/_images/home-arrow-pag-prev.gif' border='0'></a> "
pageControl+=" <a href=\""+urlPage+pnp+"\" title='Go to previous page' alt='Go to previous page' onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','"+pnp+"');\">Prev</a> "}}
ll=rPoP-plusMinus
ul=parseInt(rPoP)+plusMinus
if(ll<1){ll=1}
if(ul>pageDiv){ul=pageDiv}
for(var i=ll;i<=ul;i++)
{if(rPoP!=i){if(document.URL.match(/blogs.|\/travel\/flights|\/travel\/cruises\/|\/smokestack\/|\/guide\//)){pageControl+=" <a href=\"#uslPageReturn\" onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','"+i+"');\">"+i+"</a> "}
else{pageControl+=" <a href=\""+urlPage+i+"\">"+i+"</a> "}}
else{pageControl+=" "+i+" "}}
pnp=pnp+2
if(rPoP!=pageDiv){if(document.URL.match(/blogs.|\/travel\/flights|\/travel\/cruises\/|\/smokestack\/|\/guide\//)){pageControl+=" <a href=\"#uslPageReturn\" title='Go to next page' alt='Go to next page' onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','"+pnp+"');\">Next</a> "
pageControl+=" <a href=\"#uslPageReturn\" title='Go to last page' alt='Go to last page' onClick=\"javascript:usl.paginationTransition();usl.getReactions('"+type+"','"+pageDiv+"');\"><img src=\"http:/"+"/images.usatoday.com/community/_common/_images/home-arrow-pag-next.gif\" border='0'></a>"}
else{pageControl+=" <a href=\""+urlPage+pnp+"\" title='Go to next page' alt='Go to next page'>Next</a> "
pageControl+=" <a href=\""+urlPage+pageDiv+"\" title='Go to last page' alt='Go to last page'><img src=\"http:/"+"/i.usatoday.net/community/_common/_images/home-arrow-pag-next.gif\" border='0'></a>"}}
pageControl+="</div>"}
return pageControl}
usl.paginationTransition=function(){if(usl.widgetLogging==true){usl.countEvent("pagination")}
var reactionList=$('uslReactionList')
if(reactionList){reactionList.innerHTML="<img src='http:/"+"/i.usatoday.net/_common/_images/squaresAnimated.gif' />"}}
usl.submitReaction=function(){var type=$("uslReactionType").value
var tmpl=""
var body=""
var bwfBody=""
var max=0
var err=$("uslFormError")
err.innerHTML=""
var emptyFlag=false

usatAuth.getAuthStatus()
if(usl.isSignedIn()==false){if(type=='comment'){tmpl=this._templates.comments
err.innerHTML=tmpl['loggedOutError']}else if(type=='review'){tmpl=this._templates.reviews
err.innerHTML=tmpl['loggedOutError']}
usatAuth.initialSetup()
this.showException("Invalid user status")
return false}
if(type=='comment'){tmpl=this._templates.comments
body=$("uslComFormBody").value
bwfBody=body
max=this.commentMaxChars
if(body.length==0){err.innerHTML=tmpl['missingInputError']
setTimeout("$('uslComFormBody').focus()",1)
return false}}else if(type=='review'){tmpl=this._templates.reviews
var revTitle=$("uslRevFormTitle").value
var revRating=(ratNode=$("uslRevFormRating"))?ratNode.value:0
body=$("uslRevFormBody").value
bwfBody=body+" "+revTitle
max=this.reviewMaxChars
emptyFlag=(body.length==0||revTitle.length==0)?true:false
if(body.length==0||revTitle.length==0){err.innerHTML=tmpl['missingInputError']
if(revTitle.length==0){setTimeout("$('uslRevFormTitle').focus()",1)}
else if(body.length==0){setTimeout("$('uslRevFormBody').focus()",1)}
return false}}

if(this.checkBodyLength(body,max)==false){var data={'maxchars':max}
err.innerHTML=this._transform(data,tmpl['entryTooLongError'])
return false}

if(this.bwfon==true){this._checkBadWords(bwfBody)}else{this._submitReactionToSiteLife()}}
usl._checkBadWords=function(body){var rH=function(request){try{var res=request.responseText
usl.showDebug("Bad Word Filter Response: "+res)
usl._checkBadWordsCallback(res)}catch(e){usl.showException("BWF return handler",e)
usl._submitReactionToSiteLife()}}
try{var bwfForm=document.createElement("form")
bwfForm.name="fbwf"
bwfForm.id="fbwf"
bwfForm.action=this.badWordUrl
bwfForm.method="post"
var inputElem=document.createElement("input")
inputElem.name="jsonRequest"
inputElem.type="hidden"
inputElem.value=body
bwfForm.appendChild(inputElem)
document.body.appendChild(bwfForm)

var bwfIframe=new iframe(bwfForm,{onComplete:rH},(new Date()).getTime())}catch(e){this.showException("BWF Submit",e)
usl._submitReactionToSiteLife()}}
usl._checkBadWordsCallback=function(response){try{if(response.indexOf("false")!=-1){this._submitReactionToSiteLife()}else if(response){var type=$("uslReactionType").value
var err=$("uslFormError")
var tmpl=null
if(type=='comment'){tmpl=this._templates.comments}else if(type=='review'){tmpl=this._templates.reviews}
this.updateReactionFormHead(type,false)
var bwText="\""+response.substr(0,response.length-1).replace(/,/g,", ")+"\""
var data={'badwords':bwText}
err.innerHTML=this._transform(data,tmpl['badWordsFoundError'])}else{usl.showException("BWF response empty")
usl._submitReactionToSiteLife()}}catch(e){usl.showException("BWF callback",e)
usl._submitReactionToSiteLife()}}
usl._submitReactionToSiteLife=function(){var type=$("uslReactionType").value
var title=this.getArticleTitle()
var articleKey=this.getArticleKey()
var articleLink=this.getArticleLink(document.location.toString().split('#')[0])
var rb=new RequestBatch()
if(usl.widgetLogging==true){usl.countEvent(type)}
if(type=='comment'){var comBody=$("uslComFormBody").value

var stripped=usl._stripHtml(comBody)
usl.strippedcomment=stripped
usl.type=type
rb.AddToRequest(new CommentAction(new ArticleKey(articleKey),articleLink,title,stripped))
$("uslComFormBody").value=""}else if(type=='review'){var revTitle=$("uslRevFormTitle").value
var revRating=(this.ratingsEnabled==true)?$("uslRevFormRating").value:0
var revBody=$("uslRevFormBody").value

var strippedBody=usl._stripHtml(revBody)
var strippedTitle=usl._stripHtml(revTitle)
rb.AddToRequest(new ReviewAction(new ArticleKey(articleKey),articleLink,title,strippedTitle,revRating,strippedBody,null,null))
$("uslRevFormTitle").value=""
$("uslRevFormBody").value=""
if(this.ratingsEnabled==true){this._setRating('uslRevFormRating',1)
this._fillRatingStar('uslRevFormStars','uslRevFormRating',-1)}}
this.sitelifeRequest(rb,"SubmitReaction",this._submitReactionToSiteLifeCallback)}
usl._submitReactionToSiteLifeCallback=function(res){var type=$("uslReactionType").value
for(var i=0;i<res.Messages.length;i++){var msg=res.Messages[i]
if(msg.Message!="ok")
{usl.showException("_submitReactionToSiteLifeCallback"+msg.Message)}
else{if(usl.reloadOnEvent==true)
{setTimeout("window.location.reload()",100)}
else{var facebook_checked=document.getElementById("facebook_connect_checkbox").checked
if(slFB.connectEnabled()&&facebook_checked)
{var fbArticleTitle=usl.getArticleTitle()
var fbarticleLink=usl.getArticleLink(document.location.toString().split('#')[0])+"?csp=FacebookC1"
slFB.submitArticleComment(fbArticleTitle,fbarticleLink,'',usl.strippedcomment,handleFacebookCallback)
usl.getReactions(type)}
else{usl.getReactions(type)}}}}}
function handleFacebookCallback(){usl.getReactions(type)}
usl.checkBodyLength=function(body,max){if(body.length<=max){return true}else{return false}}
usl.getReportAbuseLink=function(type,key,reported){var raHtml=""
if(reported==true){raHtml+="<span id='uslReportAbuse:"+type+":"+key+"' class='uslAbuseReported'>Reported</span>"}else{raHtml+="<span id='uslReportAbuse:"+type+":"+key+"' class='uslReportAbuseLink'>"
raHtml+="<a href='#none' onclick=\"javascript:usl.ReportAbuse(event, '"+type+"', '"+key+"'); return false;\">Report Abuse</a>"
raHtml+="</span>"}
return raHtml}
usl.loadReportAbuseForm=function(){var id='uslReportAbuseForm'
var cssClass='uslReportAbuseForm'
var tNode=document.createElement('div')
tNode.setAttribute('id',id)
document.getElementsByTagName('body')[0].appendChild(tNode)
try{if(cssClass)tNode.className=cssClass
tNode.style.display='none'}catch(e){}
this.showDebug('Loading report abuse form.')
this.ahah(id,null,this.reportAbuseForm,null)}
usl.ReportAbuse=function(evt,type,key){if(rogueFlashHack)rogueFlashHack(1)
this._showDivAtMouse(evt,"uslReportAbuseForm")
$("uslReportAbuseType").value=type
$("uslReportAbuseKey").value=key}
usl.reportAbuseSubmit=function(){var key=$("uslReportAbuseKey").value
var type=$("uslReportAbuseType").value
var text=$("uslReportAbuseCommentText").value
var reason=$("uslReportAbuseReason").value
if(rogueFlashHack){rogueFlashHack(0)}
this.reportAbuseClose()
var cntKey=null
if(type=='comment'){cntKey=new CommentKey(key)}else if(type=='article'){cntKey=new ArticleKey(key)}else if(type=='review'){cntKey=new ReviewKey(key)}
if(usl.widgetLogging==true){usl.countEvent("report abuse "+type)}
var raReq=new RequestBatch()
raReq.AddToRequest(new ReportAbuseAction(cntKey,reason,text))
this.sitelifeRequest(raReq,"SubmitReportAbuse",this._reportAbuseCallback)
var raLink=$("uslReportAbuse:"+type+":"+key)
if(raLink){raLink.innerHTML=this.getReportAbuseLink(type,key,true)}}
usl._reportAbuseCallback=function(res){if(res.Messages.length>0&&res.Messages[0].Message=="ok"){usl.showDebug("Report Abuse Successful")}else{usl.showDebug("Report Abuse Failed: "+res.Messages[0].Message)}

if(usl.Debug&&res.Responses){usl.lastReportAbuseRes=res.Responses}}
usl.reportAbuseClose=function(){this._hideDiv("uslReportAbuseForm")
$("uslReportAbuseKey").value=""
$("uslReportAbuseType").value=""
$("uslReportAbuseCommentText").value=""
$("uslReportAbuseReason").value=" "}
usl._templates={'comments':{'loaded':false},'reviews':{'loaded':false}}
