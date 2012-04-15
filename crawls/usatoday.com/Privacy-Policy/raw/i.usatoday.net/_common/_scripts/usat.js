var usat=new clsUsat();
usat.init();
function clsUsat(){
this.util=new clsUtil();
this.page=new clsPage();
this.cookie=new clsCookie();
this.init=fxInit;
function fxInit(){
this.util.init();
this.page.init();}
function clsUtil(){
this.init=fxInit;
this.openBareWindow=fxOpenBareWindow;
this.isEmpty=fxIsEmpty;
function fxInit(){
String.prototype.trim=fxTrim;}
function fxTrim(strInput){
var strResult=null;
if(strInput==null)
strInput=this;
if(strInput){
strResult=new String(strInput);
strResult=strResult.replace(/^\s+/,"");
strResult=strResult.replace(/\s+$/,"");}
return(strResult);}
function fxOpenBareWindow(url,title,width,height){
window.open(url,title,"scrollbars=no,menubar=no,toolbar=no,status=no,top=0,left=0,screenx=0,screeny=0,width="+width+",height="+height+",resizable=no");}
function fxIsEmpty(x){
blnIsEmpty=false;
if((x==null)||(new String(x)=="undefined")||(x=="")){
blnIsEmpty=true;}
return(blnIsEmpty);}}
function clsPage(){
this.onLoadList=new Array();
this.jumpSelect=fxJumpSelect;
this.onLoad=fxOnLoad;
this.addLoadEvent=fxAddLoadEvent;
this.init=fxInit;
this.onResize=fxOnResize;
this.writeObject=fxWriteObject;
this.writeString=fxWriteString;
this.insertTags=fxInsertTags;
function fxInit(){
fxOnResize(true);}
function fxOnResize(init){
if(init==true)with(navigator){
if((appName=="Netscape")&&(parseInt(appVersion)==4)){
document.MM_pgW=innerWidth;
document.MM_pgH=innerHeight;
onresize=fxOnResize;}}
else if(innerWidth!=document.MM_pgW||innerHeight!=document.MM_pgH){
location.reload();}}
function fxJumpSelect(objSelect){
var strLocation=objSelect.options[objSelect.selectedIndex].value;
if(strLocation){
document.location=strLocation;}
objSelect.selectedIndex=0;}
function fxOnLoad(){
var fx;
for(var i=0;i<this.onLoadList.length;i++){
fx=this.onLoadList[i];
try{
fx();}catch(e){}}}
function fxAddLoadEvent(objFunction){
this.onLoadList[this.onLoadList.length]=objFunction;}
function fxWriteObject(){
document.write(usatGenerateObject("usatGenerateObject",true,arguments));}
function fxWriteString(objectString){
document.write(objectString);}
function fxInsertTags(element,id,mode){
var url='http://www.usatoday.com/community/tags/';
if(mode==0){url+='GetStoryTags.ashx'}else if(mode==1){url+='GetLinkedByline.ashx'}
url+='?id='+id;
var rH=function(result){
try{
if((mode==0&&result.indexOf('piped-taglist-string')!=-1)||(mode==1&&result.indexOf('linkedBylineName')!=-1)){
$(element).innerHTML=result;}}catch(e){}}
var errH=function(result){
usatAj.showDebug("Get Tags Error: "+result);}
usatAj.ajax(url,rH,errH);}}
function clsCookie(){
this.set=fxSet;
this.get=fxGet;
this.remove=fxRemove;
this.buildMatrix=fxBuildMatrix;
function fxSet(strKey,strValue,dtExpires,
strPath,strDomain,blnSecure){
var strCookie=strKey+"="+escape(strValue)+";";
if(dtExpires){
strCookie+="expires="+dtExpires.toUTCString()+";";}
if((strPath)&&(strPath!="")){
strCookie+="path="+strPath+";";}
if((strDomain)&&(strDomain!="")){
strCookie+="domain="+strDomain+";";}
if(blnSecure){
strCookie+="secure";}
document.cookie=strCookie;}
function fxGet(strKey){
var strValue=null;
var arrCookies=this.buildMatrix(new String(document.cookie));
for(var intIndex=0;intIndex<arrCookies.length;intIndex++){
if(arrCookies[intIndex][0]==strKey){
strValue=arrCookies[intIndex][1];
break;}}
return strValue;}
function fxBuildMatrix(strCookies){
var arrCookie;
var arrCookies=strCookies.split(";");
for(var intIndex=0;intIndex<arrCookies.length;intIndex++){
arrCookie=arrCookies[intIndex].trim().split("=");
arrCookie[1]=unescape(arrCookie[1]);
arrCookies[intIndex]=arrCookie;}
return arrCookies;}
function fxRemove(strKey,strPath,strDomain){
var strCookie,dtYesterday;
var strValue=this.get(strKey);
if(strValue){
strCookie=strKey+"=;";
if((strPath)&&(strPath!="")){
strCookie+="path="+strPath+";";}
if((strDomain)&&(strDomain!="")){
strCookie+="domain="+strDomain+";";}
dtYesterday=new Date();
dtYesterday.setDate(dtYesterday.getDate()-1);
strCookie+="expires="+dtYesterday.toGMTString()+";";
document.cookie=strCookie;}
return strValue;}}}
function openPopUp(theurl,thewidth,theheight){
var theargs="width="+thewidth+",height="+theheight+"top=100,left=100";
window.open(theurl,'earpopup',theargs);}
var APlayerSrc="";
function OpenAudio(url){
APlayerSrc=url;
var page="/audio/aplay1v1.htm";
if(_version<12){
page="/audio/aplay1v2.htm";}
usat.util.openBareWindow(page,"RAPlayer",390,220);}
var VPlayerSrc="";
function OpenVideo(url){
VPlayerSrc=url;
var page="/video/mplay5v1.htm";
if(_version<12){
page="/video/mplay5v2.htm";}
usat.util.openBareWindow(page,"RMPlayer",425,345);}
function OpenVideoNgeo(url){
VPlayerSrc=url;
var page="/video/mplay6v4-ngeo.htm";
if(_version<12){
page="/video/mplay6v4_1-ngeo.htm";}
usat.util.openBareWindow(page,"RMPlayer",425,425);}
function OpenVideobig(url){
VPlayerSrc=url;
var page="/video/mplay6v1.htm";
if(_version<12){
page="/video/mplay6v2.htm";}
usat.util.openBareWindow(page,"RMPlayer",425,425);}
function OpenVideoNoad(url){
VPlayerSrc=url;
var page="/video/mplay_noad_1.htm";
if(_version<12){
page="/video/mplay_noad_2.htm";}
usat.util.openBareWindow(page,"RMPlayer",425,345);}
var _version=10;
detectJSVersion();
function detectJSVersion(){
document.write("<scr"+"ipt language=\"JavaScript1.1\">_version = 11;</S"+"CRIPT>");
document.write("<scr"+"ipt language=\"JavaScript1.2\">_version = 12;</S"+"CRIPT>");}
function MM_preloadImages(){
var d=document;if(d.images){if(!d.MM_p)d.MM_p=new Array();
var i,j=d.MM_p.length,a=MM_preloadImages.arguments;for(i=0;i<a.length;i++)
if(a[i].indexOf("#")!=0){d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];}}}
function MM_swapImgRestore(){
var i,x,a=document.MM_sr;for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)x.src=x.oSrc;}
function MM_findObj(n,d){
var p,i,x;
if(!d)d=document;
if((p=n.indexOf("?"))>0&&parent.frames.length){
d=parent.frames[n.substring(p+1)].document;
n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);
if(!x&&document.getElementById)x=document.getElementById(n);return x;}
function MM_swapImage(){
var i,j=0,x,a=MM_swapImage.arguments;document.MM_sr=new Array;for(i=0;i<(a.length-2);i+=3)
if((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x;if(!x.oSrc)x.oSrc=x.src;x.src=a[i+2];}}
function MM_jumpMenu(targ,selObj,restore){
eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
if(restore)selObj.selectedIndex=0;}
function setCookieParamValueForCookieString(cookieString,paramName,newParamValue){
var startPos=cookieString.indexOf(paramName+"=");
var newString="";
if(startPos>-1){
var endPos=cookieString.indexOf("&",startPos);
if(endPos==-1)endPos=cookieString.length;
newString=cookieString.substring(0,startPos)+paramName+"="+newParamValue+cookieString.substring(endPos,cookieString.length);}
return newString;}
function getCookieStringParamValue(string,paramName){
var startPos=string.indexOf(paramName+"=");
var paramValue="";
if(startPos>-1){
startPos=startPos+paramName.length+1;
var endPos=string.indexOf("&",startPos);
if(endPos==-1)endPos=string.length;
paramValue=string.substring(startPos,endPos);}
return paramValue;}
function writeOAC(cookieString){
var expireTime=new Date();
expireTime.setHours(23,59,59,999);
usat.cookie.set("adCookie",cookieString,new Date(expireTime),"/",".usatoday.com");}
function processOACValue(paramName,bornOnTime){
var timeSet=bornOnTime;
var cookieValue=usat.cookie.get("adCookie");
var cookied=false;
var paramValue="";
var allValues="popup1=&cokepopup=&sweeppopup=&sweepemailpopup=&sb_home=&section_count=0&section_intermediate=&section_money=&section_weather=&section_life=&section_tech=&section_news=&section_travel=&section_sports=";
var newCookieString="";
if(cookieValue!=null){
paramValue=getCookieStringParamValue(cookieValue,paramName);}
var startPos=paramName.indexOf("section_");
if(startPos>-1){
if(cookieValue!=null){
var totalSectionCount=parseInt(getCookieStringParamValue(cookieValue,"section_count"));
if((totalSectionCount<3)&&(paramValue=="")){
newCookieString=setCookieParamValueForCookieString(cookieValue,paramName,"1");
writeOAC(newCookieString);
totalSectionCount=totalSectionCount+1;
newCookieString=setCookieParamValueForCookieString(newCookieString,"section_count",totalSectionCount);
writeOAC(newCookieString);
cookied=true;}}
else{
writeOAC(allValues);
newCookieString=setCookieParamValueForCookieString(allValues,paramName,"1");
writeOAC(newCookieString);
newCookieString=setCookieParamValueForCookieString(newCookieString,"section_count","1");
writeOAC(newCookieString);
cookied=true;}}
else if(paramName.indexOf("popup")>-1){
if(cookieValue!=null){
if(paramValue==""||paramValue==null){
newCookieString=setCookieParamValueForCookieString(cookieValue,paramName,timeSet);
writeOAC(newCookieString);
cookied=true;}}
else{
writeOAC(allValues);
newCookieString=setCookieParamValueForCookieString(allValues,paramName,timeSet);
writeOAC(newCookieString);
cookied=true;}}
else{
if(cookieValue!=null){
if(paramValue==""||paramValue==null){
newCookieString=setCookieParamValueForCookieString(cookieValue,paramName,"1");
writeOAC(newCookieString);
cookied=true;}}
else{
writeOAC(allValues);
newCookieString=setCookieParamValueForCookieString(allValues,paramName,"1");
writeOAC(newCookieString);
cookied=true;}}
return cookied;}
function writeQQCookie(paramName){
var cookieValue=usat.cookie.get("qqCookie");
var paramValue="";
if(cookieValue!=null){
paramValue=getCookieStringParamValue(cookieValue,paramName);}
if(cookieValue!=null){
if(paramValue==""||paramValue==null){
cookieValue=cookieValue+"&"+paramName+"=";
newCookieString=setCookieParamValueForCookieString(cookieValue,paramName,"1");
usat.cookie.set("qqCookie",newCookieString,new Date("1/1/2020"),"/",".usatoday.com");}}
else{
usat.cookie.set("qqCookie",paramName+"=1",new Date("1/1/2020"),"/",".usatoday.com");}}
function readQQCookie(paramName){
var cookieValue=usat.cookie.get("qqCookie");
var cookied=true;
var paramValue="";
if(cookieValue!=null){
paramValue=getCookieStringParamValue(cookieValue,paramName);
if(paramValue==""||paramValue==null){
cookied=false;}}
else{
cookied=false;}
return cookied;}
function usatAddAttribute(prefix,slotName,tagName){
var		value;
value=gTagAttrs[prefix+slotName];
if(null==value)
value=gTagAttrs[slotName];
if(null !=value){
if(0==slotName.indexOf(prefix)&&(null==tagName))
tagName=slotName.substring(prefix.length);
if(null==tagName)
tagName=slotName;
return tagName+'="'+value+'" ';}
else
return "";}
function usatAddObjectAttr(slotName,tagName){
if(0==slotName.indexOf("emb#"))
return "";
if(0==slotName.indexOf("obj#")&&(null==tagName))
tagName=slotName.substring(4);
return usatAddAttribute("obj#",slotName,tagName);}
function usatAddEmbedAttr(slotName,tagName){
if(0==slotName.indexOf("obj#"))
return "";
if(0==slotName.indexOf("emb#")&&(null==tagName))
tagName=slotName.substring(4);
return usatAddAttribute("emb#",slotName,tagName);}
function usatAddObjectParam(slotName,generateXHTML){
var		paramValue;
var		paramStr="";
var		endTagChar=(generateXHTML)?' />':'>';
if(-1==slotName.indexOf("emb#")){
paramValue=gTagAttrs["obj#"+slotName];
if(null==paramValue)
paramValue=gTagAttrs[slotName];
if(0==slotName.indexOf("obj#"))
slotName=slotName.substring(4);
if(null !=paramValue)
paramStr='  <param name="'+slotName+'" value="'+paramValue+'"'+endTagChar+'\n';}
return paramStr;}
function usatDeleteTagAttrs(){
for(var ndx=0;ndx<arguments.length;ndx++){
var attrName=arguments[ndx];
delete gTagAttrs[attrName];
delete gTagAttrs["emb#"+attrName];
delete gTagAttrs["obj#"+attrName];}}
function usatGenerateObject(callingFcnName,generateXHTML,args){
if(args.length<4||(0!=(args.length%2))){
usatComplain(callingFcnName,gArgCountErr);
errMsg='The "%%" function requires an even number of arguments. Arguments should be in the form "atttributeName", "attributeValue", ...';
errMsg=errMsg.replace("%%",callingFcnName);
return "<!-- "+errMsg+" -->";}
gTagAttrs=new Array();
gTagAttrs["src"]=args[0];
gTagAttrs["width"]=args[1];
gTagAttrs["height"]=args[2];
gTagAttrs["classid"]="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
gTagAttrs["pluginspage"]="http://www.macromedia.com/go/getflashplayer/";
var activexVers=args[3]
if((null==activexVers)||(""==activexVers))
activexVers="8,0,24,0";
gTagAttrs["codebase"]="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+activexVers;
var	attrName,
attrValue;
for(var ndx=4;ndx<args.length;ndx+=2){
attrName=args[ndx].toLowerCase();
attrValue=args[ndx+1];
if("name"==attrName||"id"==attrName)
gTagAttrs["name"]=attrValue;
else
gTagAttrs[attrName]=attrValue;}
var objTag='<object '+usatAddObjectAttr("classid")+usatAddObjectAttr("width")+usatAddObjectAttr("height")+usatAddObjectAttr("codebase")+usatAddObjectAttr("name","id")+usatAddObjectAttr("tabindex")+usatAddObjectAttr("hspace")+usatAddObjectAttr("vspace")+usatAddObjectAttr("border")+usatAddObjectAttr("align")+usatAddObjectAttr("class")+usatAddObjectAttr("title")+usatAddObjectAttr("accesskey")+usatAddObjectAttr("noexternaldata")+'>\n'+usatAddObjectParam("src",generateXHTML);
var embedTag='  <embed '+usatAddEmbedAttr("src")+usatAddEmbedAttr("width")+usatAddEmbedAttr("height")+usatAddEmbedAttr("pluginspage")+usatAddEmbedAttr("name")+usatAddEmbedAttr("align")+usatAddEmbedAttr("tabindex");
usatDeleteTagAttrs("src","width","height","pluginspage","classid","codebase","name","tabindex",
"hspace","vspace","border","align","noexternaldata","class","title","accesskey");
for(var attrName in gTagAttrs){
attrValue=gTagAttrs[attrName];
if(null !=attrValue){
embedTag+=usatAddEmbedAttr(attrName);
objTag+=usatAddObjectParam(attrName,generateXHTML);}}
return objTag+embedTag+'> </em'+'bed>\n</ob'+'ject'+'>';}


function niceDate(fullDate)
{
	if(fullDate==""||!fullDate)
	{
		return " ";
	}
	try
	{
		var strNow=new Date();
		var dateParts=fullDate.split(/[\/ :]/);
		var month=parseInt(dateParts[0],10)-1;
		var hr=dateParts[3];
		if(dateParts[5]=='PM' || (dateParts[6] && dateParts[6]=='PM'))
		{
			if(hr!=12)
			{
				hr=parseInt(hr,10)+parseInt(12);
			}
		}
		else if(hr==12)
		{
			hr=parseInt(hr,10)-parseInt(12);
		}
		var strDate=new Date(dateParts[2],month,dateParts[1],hr,dateParts[4]);
	}
	catch(e)
	{
		return fullDate;
	}
	return dateDiff(strNow,strDate,fullDate);
}

function dateDiff(date1,date2,fullDate){
var niceDateStr='';
var diff=new Date();
var COMMENT = "the next line must be adjusted for DST: 5 for standard, 4 for DST";
var tzo=(date1.getTimezoneOffset()/60)-4;
diff.setTime(Math.abs(date1.getTime()-(date2.getTime()-(tzo*60*60*1000))));
var timediff=diff.getTime();
var years=Math.floor(timediff/(1000*60*60*24*365));
timediff-=years*(1000*60*60*24*365);
var days=Math.floor(timediff/(1000*60*60*24));
timediff-=days*(1000*60*60*24);
var hours=Math.floor(timediff/(1000*60*60));
timediff-=hours*(1000*60*60);
var mins=Math.floor(timediff/(1000*60));
timediff-=mins*(1000*60);
var secs=Math.floor(timediff/1000);
timediff-=secs*1000;
// If older than 7 days, return the full date 
if(diff.getTime()>(7*24*60*60*1000)) {
	return fullDate;
}
if(years>0){
niceDateStr=years+"y";
if(days==0){
niceDateStr+=" ago";}else{
niceDateStr+=" "+days+"d ago";}}else if(days>0){
niceDateStr=days+"d";
if(hours==0||days>=7){
niceDateStr+=" ago";}else if(days<7){
niceDateStr+=" "+hours+"h ago";}}else if(hours>0){
niceDateStr=hours+"h";
if(mins==0){
niceDateStr+=" ago";}else{
niceDateStr+=" "+mins+"m ago";}}else if(mins>0){
niceDateStr=mins+"m ago";}else{
niceDateStr="<1m ago";}
return niceDateStr;}

function swapContent(oldHeader,newHeader){
var oldContent=document.getElementById(oldHeader).innerHTML;
var newContent=document.getElementById(newHeader).innerHTML;
document.getElementById(oldHeader).innerHTML='';
document.getElementById(newHeader).innerHTML=oldContent;
document.getElementById(oldHeader).style.height='1px';
document.getElementById(oldHeader).style.overflow='hidden';}
function uShowHide(elem){
if(document.getElementById(elem).style.display=='none'){
document.getElementById(elem).style.visibility='visible';}else{
document.getElementById(elem).style.visibility='hidden';}}