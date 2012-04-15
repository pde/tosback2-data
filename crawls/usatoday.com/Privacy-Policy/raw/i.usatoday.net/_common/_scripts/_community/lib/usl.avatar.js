
usl.cacheAvatar=true;
usl.reloadOnEvent=false;
usl.avatarOverride=function(xOffset,yOffset){
if(this.enabled==true&&this.isSitelifeAvailable()==true){
this._avatarOverride=true;
usatAuth.urLoggedIn="uslAvatarIn.htm";
usatAuth.urLoggedOut="uslAvatarOut.htm";
usatAuth.urStatusXOffset=(xOffset)?xOffset:165;
usatAuth.urStatusYOffset=(yOffset)?yOffset:-1;
if(ur=$("USATRegister")){ur.style.display='none';}
usatAuth.em.setPos=usl.setPosOverride;}};
usl.populateAvatar=function(pid,handle,photo,msgs){
setTimeout("$('USATRegister').style.display='block'",10);
$("uslAvtPhoto").innerHTML=this.getUserPhotoLink(pid,photo);
$("uslAvtHandle").innerHTML=this.getUserHandleLink(pid,handle);
$("uslAvtMsgs").innerHTML=this.getUserMsgsLink(msgs);};
usl.loadAvatar=function(){
var pid=this.getUserPid();
var slpc=this.getCookie("SLPERSIST");
if(slpc){
var uid=this.getCookieValue(slpc,"PID");
var msgs=this.getCookieValue(slpc,"MSGS");
var photo=unescape(this.getCookieValue(slpc,"ICON"));}
if(slpc&&pid==uid&&this.cacheAvatar==true){
this.populateAvatar(pid,this.getUserHandle(),photo,msgs);}else{
var rb=new RequestBatch();
rb.AddToRequest(new UserKey(pid));
this.sitelifeRequest(rb,"LoadAvatarInfo",this._loadAvatarCallback);}};
usl._loadAvatarCallback=function(result){
for(var i=0;i<result.Responses.length;i++){
var res=result.Responses[i];
if(res.User!=null){
var user=res.User;
var expire=new Date(new Date().getTime()+(10*60*1000));
var slpc=usl.getCookie("SLPERSIST");
if(!slpc){slpc="";}
slpc=usl.setCookieValue(slpc,"PID",user.UserKey.Key);
slpc=usl.setCookieValue(slpc,"MSGS",user.NumberOfMessages);
slpc=usl.setCookieValue(slpc,"ICON",user.AvatarPhotoUrl);
usl.setCookie("SLPERSIST",slpc,expire,"/",document.domain,"");
usl.populateAvatar(user.UserKey.Key,usl.getUserHandle(),user.AvatarPhotoUrl,user.NumberOfMessages);}}
if(usl.Debug&&result.Responses){usl.lastAvatarRes=result.Responses;}};
usl.logoutReload=function(){
usl.logoutInterval=setInterval("usl.logoutReloadInterval()",100);};
usl.logoutReloadInterval=function(){
if(usl.isSignedIn()==false){
clearInterval(usl.logoutInterval);
setTimeout('usl.reloadPage()',1);}};
usl.reloadPage=function(){
usatAuth.genericErrorResponseHandler=function(){};
window.location.reload();};
usl.findPos=function(obj,axis){
var curleft=curtop=0;
if(obj.offsetParent){
curleft=obj.offsetLeft
curtop=obj.offsetTop
while(obj=obj.offsetParent){
curleft+=obj.offsetLeft
curtop+=obj.offsetTop}}
if(axis=='y'){
return curtop;}else{
return curleft;}};
usl.setPosOverride=function(){
var regAnchor;
if(!(regAnchor=$('uslAvatarAnchor'))){
if(!(regAnchor=$('regAnchor'))){
regAnchor=$('regAnchorSite');}}
if(regAnchor){
var ur=$('USATRegister');
var nav=navigator.userAgent;
ur.style.left=(usl.findPos(regAnchor,'x')-(usatAuth.urStatusXOffset))+'px';
ur.style.top=(usl.findPos(regAnchor,'y')+(usatAuth.urStatusYOffset))+'px';}};
usl._avatarOverride=false;
usl.logoutInterval=null;
