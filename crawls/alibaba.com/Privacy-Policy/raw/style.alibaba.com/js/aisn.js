
function calTimeByName(name){var offset=time_map[name];return calTime(offset);}
function calTime(offset){if(String(offset)=='undefined')
return;d=new Date();utc=d.getTime()+(d.getTimezoneOffset()*60000);nd=new Date(utc+(3600000*offset));var t_str=nd.toString();var arrTmp=t_str.split(' ');var t_t='';if((navigator.appName=="Microsoft Internet Explorer")&&(parseInt(navigator.appVersion)>=3)){var timeArray=arrTmp[3].split(':');t_t=timeArray[0]+':'+timeArray[1]}else{var timeArray=arrTmp[4].split(':');t_t=timeArray[0]+':'+timeArray[1]}
t_str=t_t+' '+arrTmp[0]+' '+arrTmp[1]+' '+arrTmp[2];img_str='Local Time:'+t_str;return img_str;}
function calCountryUrl(name){var countryFullName=country_map[name];if(countryFullName!=null)
return"http://country.alibaba.com/profiles/"+name+'/'+countryFullName+'.htm';else
return'http://country.alibaba.com';}

var Cookies={set:function(name,value){var argv=arguments;var argc=arguments.length;var expires=(argc>2)?argv[2]:null;var domain=(argc>3)?argv[3]:null;var path=(argc>4)?argv[4]:'/';var secure=(argc>5)?argv[5]:false;document.cookie=name+"="+escape(value)+
((expires==null)?"":("; expires="+expires.toGMTString()))+
((path==null)?"":("; path="+path))+
((domain==null)?"":("; domain="+domain))+
((secure==true)?"; secure":"");},get:function(name){var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;var j=0;while(i<clen){j=i+alen;if(document.cookie.substring(i,j)==arg)
return this.__get(j);i=document.cookie.indexOf(" ",i)+1;if(i==0)
break;}
return null;},__get:function(offset){var endstr=document.cookie.indexOf(";",offset);if(endstr==-1){endstr=document.cookie.length;}
return unescape(document.cookie.substring(offset,endstr));},clear:function(name){var argv=arguments;var argc=arguments.length;var domain=(argc>1)?argv[1]:null;var path=(argc>2)?argv[2]:'/';var secure=(argc>3)?argv[3]:false;if(this.get(name)){document.cookie=name+"="+
((path)?"; path="+path:"")+
((domain)?"; domain="+domain:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT";}},cookieCache:{},getCookieTable:function(name,domain){var table=Cookies.cookieCache[name];if(null==table||table.changed){table=new CookieTable(name);var str=Cookies.get(name);if(null!=str&&str!=""){table.parseFromString(str);}
if(domain){table.domain=domain;}
Cookies.cookieCache[name]=table;}
return table;}};var noExpires=new Date();noExpires.setTime(noExpires.getTime()+60*60*1000*24*60);var SEP_GROUP="\n\n";var SEP_GROUP_NAME="^\n";var SEP_GROUP_ITEM="$\n";var SEP_ATTR="\t";var NO_SET_STR="NOSET";function isArray(object){return object!=null&&typeof object=="object"&&'join'in object;}
function CookieTable(name,arrOrString,expires,domain,path,secure){this.expires=expires?expires:noExpires;this.domain=domain?domain:null;this.path=path?path:'/';this.secure=secure?secure:false;this.name=name?name:null;this.groups=arrOrString&&isArray(arrOrString)?arrOrString:[];this.__tree={};this.changed=false;this.buildString=function(arr){if(null!=arr&&arr.length>0){return arr.join(SEP_GROUP);}
return null;}
this.parseFromString=function(str){if(null==str||""==str)return this;var arr=str.split(SEP_GROUP);this.removeAll();for(var i=0;i<arr.length;i++){if(null!=arr[i]&&""!=arr[i]){var group=new CookieGroup();group.parseFromString(arr[i]);this.add(group);}}
return this;}
this.toString=function(){return this.buildString(this.groups);}
this.size=function(){return this.groups.length;}
this.arrange=function(){var arr=[],obj={};for(var i=0;i<this.size();i++){if(null!=this.groups[i]){arr[arr.length]=this.groups[i];obj[this.groups[i].name]=this.groups[i];}}
this.removeAll();this.groups=arr;this.__tree=obj;}
this.__clearTree=function(){this.__tree={};}
this.__addToTree=function(obj){if(null!=obj){this.__tree[obj.name]=obj;}}
this.__removeFromTree=function(obj){if(null!=obj){delete this.__tree[obj.name];}}
this.removeAll=function(){this.groups=[];this.__clearTree();}
this.get=function(name){if(this.__tree[name]){return this.__tree[name];}
return null;}
this.add=function(obj){if(null==obj)return;for(var i=0;i<this.size();i++){if(obj.name.toLowerCase()==this.groups[i].name.toLowerCase()){this.remove(obj.name);}}
obj.parent=this;this.groups[this.size()]=obj;this.__addToTree(obj);return this;}
this.remove=function(str){if(null==str||""==str)return;for(var i=0;i<this.size();i++){if(str.toLowerCase()==this.groups[i].name.toLowerCase()){this.__removeFromTree(this.groups[i]);this.groups[i]=null;}}
this.arrange();return this;}
this.save=function(){this.changed=true;Cookies.set(this.name,this.toString(),this.expires,this.domain,this.path,this.secure);}
this.clear=function(){Cookies.clear(this.name);}
if(this.name!=null&&typeof(arrOrString)=="string"){this.parseFromString(arrOrString);}else if(this.name!=null&&isArray(arrOrString)){for(var i=0;i<this.size();i++){if(null!=this.groups[i]){this.__addToTree(this.groups[i]);this.groups[i].parent=this;}}}}
function CookieGroup(name,arrOrString){this.name=name?name:null;this.items=arrOrString&&isArray(arrOrString)?arrOrString:[];this.__tree={};this.max=20;this.parent=null;this.buildString=function(arr){var str=this.name?this.name:NO_SET_STR;if(null!=arr&&arr.length>0){return str+SEP_GROUP_NAME+arr.join(SEP_GROUP_ITEM);}
return str;}
this.parseFromString=function(str){if(null==str||""==str)return this;var name_end=str.indexOf(SEP_GROUP_NAME);if(name_end>-1){this.name=str.substring(0,name_end);var itemsStr=str.substring(name_end+SEP_GROUP_NAME.length);if(null!=itemsStr&&itemsStr!=""){this.removeAll();var arr=itemsStr.split(SEP_GROUP_ITEM);for(var i=0;i<arr.length;i++){if(null!=arr[i]&&""!=arr[i]){var item=new CookieItem();item.parseFromString(arr[i]);this.add(item);}}}}else{this.name=str;}
return this;}
this.toString=function(){return this.buildString(this.items);}
this.getReverse=function(){var arr=[];if(this.size()>0){return this.items.slice(0,this.items.length).reverse();}
return arr;}
this.setMax=function(max){this.max=max;this.arrange();}
this.size=function(){return this.items.length;}
this.arrange=function(){var arr=[],obj={};for(var i=0;i<this.size();i++){if(null!=this.items[i]){arr[arr.length]=this.items[i];}}
if(arr.length>this.max){arr=arr.slice(arr.length-this.max,arr.length);}
for(var i=0;i<arr.length;i++){obj[arr.key]=arr[i];}
this.removeAll();this.items=arr;this.__tree=obj;}
this.__clearTree=function(){this.__tree={};}
this.__addToTree=function(obj){if(null!=obj){this.__tree[obj.key]=obj;}}
this.__removeFromTree=function(obj){if(null!=obj){delete this.__tree[obj.key];}}
this.removeAll=function(){this.items=[];this.__clearTree();}
this.get=function(key){if(this.__tree[key]){return this.__tree[key];}
return null;}
this.add=function(obj){if(null==obj)return;for(var i=0;i<this.size();i++){if(obj.key.toLowerCase()==this.items[i].key.toLowerCase()){this.remove(obj.key);}}
obj.parent=this;this.items[this.size()]=obj;this.__addToTree(obj);return this;}
this.remove=function(str){if(null==str||""==str)return;for(var i=0;i<this.size();i++){if(str.toLowerCase()==this.items[i].key.toLowerCase()){this.__removeFromTree(this.items[i]);this.items[i]=null;}}
this.arrange();return this;}
this.save=function(){if(null!=this.parent){this.arrange();this.parent.save();}}
if(this.name!=null&&typeof(arrOrString)=="string"){this.parseFromString(this.name+SEP_GROUP_NAME+arrOrString);}else if(this.name!=null&&isArray(arrOrString)){for(var i=0;i<this.size();i++){if(null!=this.items[i]){this.__addToTree(this.items[i]);this.items[i].parent=this;}}}}
function CookieItem(key,arrOrString){this.key=key?key:null;this.attributes=arrOrString&&isArray(arrOrString)?arrOrString:[];this.max=20;this.parent=null;this.buildString=function(arr){var str=this.key?this.key:NO_SET_STR;if(null!=arr&&arr.length>0){return str+SEP_ATTR+arr.join(SEP_ATTR);}
return str;}
this.parseFromString=function(str){if(null==str||""==str)return this;var arr=str.split(SEP_ATTR);if(arr.length>0){this.key=arr[0];this.attributes=arr.slice(1,arr.length);}
return this;}
this.setMax=function(max){this.max=max;this.arrange();}
this.size=function(){return this.attributes.length;}
this.toString=function(){return this.buildString(this.attributes);}
this.getReverse=function(){var arr=[];if(this.size()>0){return this.attributes.slice(0,this.attributes.length).reverse();}
return arr;}
this.reverseString=function(){return this.buildString(this.getReverse());}
this.arrange=function(){var arr=[];for(var i=0;i<this.size();i++){if(null!=this.attributes[i]){arr[arr.length]=this.attributes[i];}}
if(arr.length>this.max){this.attributes=arr.slice(arr.length-this.max,arr.length);}else{this.attributes=arr;}}
this.removeAll=function(){this.attributes=[];}
this.get=function(index){return index<this.size()?this.attributes[index]:null;}
this.add=function(str){if(null==str||""==str)return;this.remove(str);this.attributes[this.size()]=str;this.arrange();return this;}
this.remove=function(str){if(null==str||""==str)return;for(var i=0;i<this.size();i++){if(str.toLowerCase()==this.attributes[i].toLowerCase()){this.attributes[i]=null;}}
this.arrange();return this;}
this.contains=function(str){for(var i=0;i<this.size();i++){if(str.toLowerCase()==this.attributes[i].toLowerCase()){return true;}}}
this.save=function(){if(null!=this.parent){this.arrange();this.parent.save();}}
if(this.key!=null&&typeof(arrOrString)=="string"){this.parseFromString(this.key+SEP_ATTR+arrOrString);}}
var TOP_DOMAIN="alibaba.com";var HISTORY_COOKIE_NAME="history";var GROUP_KEYWORDS="keywords";var GROUP_PRODUCT="product";var GROUP_SELLOFFER="selloffer";var GROUP_BUYOFFER="buyoffer";var GROUP_COMPANY="company";var GROUP_CATEGORY="category";var GROUP_PRODUCT_SELLOFFER=GROUP_PRODUCT+"_"+GROUP_SELLOFFER;var MAX_KEYWORDS=8;var MAX_PRODUCT=8;var MAX_SELLOFFER=8;var MAX_BUYOFFER=6;var MAX_COMPANY=4;var MAX_CATEGORY=6;var MAX_PRODUCT_SELLOFFER=8;function getHistoryCookieTable(){return Cookies.getCookieTable(HISTORY_COOKIE_NAME,TOP_DOMAIN);}
function getHistoryCookieGroup(groupName){var table=getHistoryCookieTable();var group=table.get(groupName);if(null==group){group=new CookieGroup(groupName);table.add(group);group.parent=table;}
return group;}
function addOrUpdateHistoryCookieItem(groupName,itemKey,value,max){if(null==value||""==value)return;var group=getHistoryCookieGroup(groupName);var item=group.get(itemKey);var changed=false;if(isArray(value)){item=new CookieItem(itemKey,value);changed=true;}else{item=(null==item)?new CookieItem(itemKey):item;item.add(value);changed=true;}
group.add(item);if(groupName==GROUP_KEYWORDS){item.setMax(max);}else{group.setMax(max);}
if(changed){group.save();}}
function logKeywordsHistory(value){addOrUpdateHistoryCookieItem(GROUP_KEYWORDS,GROUP_KEYWORDS,value,MAX_KEYWORDS);}
function logProductHistory(itemKey,value){addOrUpdateHistoryCookieItem(GROUP_PRODUCT_SELLOFFER,itemKey,value,MAX_PRODUCT_SELLOFFER);}
function logSellOfferHistory(itemKey,value){addOrUpdateHistoryCookieItem(GROUP_PRODUCT_SELLOFFER,itemKey,value,MAX_PRODUCT_SELLOFFER);}
function logCompanyHistory(itemKey,value){addOrUpdateHistoryCookieItem(GROUP_COMPANY,itemKey,value,MAX_COMPANY);}
function logBuyOfferHistory(itemKey,value){addOrUpdateHistoryCookieItem(GROUP_BUYOFFER,itemKey,value,MAX_BUYOFFER);}
function logCategoryHistory(itemKey,value){addOrUpdateHistoryCookieItem(GROUP_CATEGORY,itemKey,value,MAX_CATEGORY);}

var noExpires=new Date();noExpires.setTime(noExpires.getTime()+60*60*1000*24*60);var attributeSplit="\t";var itemSplit="\n";function CookieBuilder(name,maxItemNum,expires){var index;this.name=name;this.maxItemNum=maxItemNum;this.expires=expires;var value=getCookie(this.name);var s="";if(value!=null){var aId=value.split(itemSplit);if(aId.length>0){index=parseInt(aId[0]);if(isNaN(index))index=0;}
else{index=0;}
if(index>=maxItemNum)index=0;}
else{index=0;}
this.addItemToCookie=function(item){index=addItemToCookieByIndex(index,this.name,item,this.maxItemNum,this.expires);}
this.getCookie=function(){return getTrueCookie(this.name);}
this.getFullCookie=function(){return getCookie(this.name);}
this.deleteCookie=function(){index=0;return deleteCookie(this.name);}
this.getIndex=function(){return index;}}
function getTrueCookie(name)
{var value=getCookie(name);if(value!=null){firstSplitIndex=value.indexOf(itemSplit);if(firstSplitIndex!=-1){return value.substr(firstSplitIndex+itemSplit.length);}}
return value;}
function addIndexToCookieValue(index,value){if(index!=null&&value!=null&&value.length>0){return index.toString()+itemSplit+value;}
return value;}
function setCookie(name,value,expires,path,domain,secure)
{s=name+"="+escape(value)+
((expires)?"; expires="+expires.toGMTString():"")+
((path)?"; path="+path:"; path=/")+
((domain)?"; domain="+domain:"; domain=alibaba.com")+
((secure)?"; secure":"");document.cookie=s;}
function getCookie(name)
{var dc=document.cookie;var prefix=name+"=";var begin=dc.indexOf("; "+prefix);if(begin==-1)
{begin=dc.indexOf(prefix);if(begin!=0)return null;}
else
{begin+=2;}
var end=document.cookie.indexOf(";",begin);if(end==-1)
{end=dc.length;}
return unescape(dc.substring(begin+prefix.length,end));}
function deleteCookie(name,path,domain)
{if(getCookie(name))
{document.cookie=name+"="+
((path)?"; path="+path:"")+
((domain)?"; domain="+domain:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT";}}
function addItemToCookie(name,ItemId,maxItemNum){var value=getCookie(name);var s=ItemId;if(value!=null){var aId=value.split(itemSplit);var k=1;var n=containElem(aId,s);for(var i=0;i<aId.length;i++)
{if(i==n){continue;}
s=s+","+aId[i];k=k+1;if(k>=maxItemNum)break;}}
setCookie(name,s);}
function addItemToCookieByIndex(index,name,ItemId,maxItemNum,expires){var value=getTrueCookie(name);var s="";if(value!=null){var aId=value.split(itemSplit);var k=1;var n=containElem(aId,ItemId);if(n!=-1)return index;if(index>maxItemNum-1)index=0
aId[index]=ItemId;for(var i=0;i<aId.length;i++)
{if(i==n){continue;}
s=s+itemSplit+aId[i];if(i>=maxItemNum-1)break;}
s=s.substr(itemSplit.length);}
else{s=ItemId;}
s=addIndexToCookieValue(index+1,s);setCookie(name,s,expires);return index+1;}
function containElem(arrayObj,elem){for(var i=0;i<arrayObj.length;i++){if(elem==arrayObj[i])return i;}
return-1;}

(function(){var YL=YAHOO.lang,YUD=YAHOO.util.Dom,YUE=YAHOO.util.Event,get=YUD.get;window.trsLanguge=new function(){var sysLanguage=navigator.browserLanguage?navigator.browserLanguage:navigator.language;_self=this;var sImgUrl;_self.init=function(){switch(sysLanguage.toLowerCase().substring(0,2)){case'fr':{sImgUrl='fr_trs.gif';break;}
case'de':{sImgUrl='ge_trs.gif';break;}
case'it':{sImgUrl='it_trs.gif';break;}
case'nl':{sImgUrl='nl_trs.gif';break;}
case'ja':{}
case'jp':{sImgUrl='jp_trs.gif';break;}
case'ko':{}
case'kr':{sImgUrl='kr_trs.gif';break;}
case'pt':{sImgUrl='pt_trs.gif';break;}
case'ru':{sImgUrl='ru_trs.gif';break;}
case'es':{sImgUrl='sp_trs.gif';break;}
case'zh':{sImgUrl='zh_cn_trs.gif';if(sysLanguage.toLowerCase()=='zh-cn'){sImgUrl='zh_cn_trs.gif';break;}
if(sysLanguage.toLowerCase()=='zh-tw'){sImgUrl='zh_tw_trs.gif';break;}}
default:{sImgUrl=false;break;}}
if(sImgUrl){get('trsTargetId').innerHTML='<img align="bottom" id="trsLangugeImg" src="'+globalImgServer+'/images/eng/others/'+sImgUrl+'" border="0"/>';}else{get('trsTargetId').innerHTML='Translate this page';}}}
try{AE.defer(function(){if(top.location!=self.location||!get('trsTargetId')){return;}
trsLanguge.init();var trsTargetWidth=get('trsTargetId').offsetWidth;trsTargetWidth=trsTargetWidth||104;var clickkShowConfig={targetId:"trsTargetId",contentId:"trsContentId",needMask:true,excursion:[trsTargetWidth-104,16],needXY:true};var clickkShowInstance=new AE.widget.clickShow();clickkShowInstance.init(clickkShowConfig);var trsContentItems=get('trsContentId').getElementsByTagName('a');YUE.on(trsContentItems,'click',clickkShowInstance.hiddenDirectly,true);})}catch(E){}}());

AE.namespace('AE.widget.translation');(function(){var YL=YAHOO.lang,YUD=YAHOO.util.Dom,YUE=YAHOO.util.Event,get=YUD.get;AE.widget.translation=function(){var _self=this;var config;var defConfig={containerId:'trsContentId',transType:['en_fr','en_de','en_it','en_nl','en_ja','en_ko','en_pt','en_ru','en_es','en_zh','en_zt'],propertiesA:{'line-height':'12px','background-image':'url('+globalImgServer+'/images/eng/others/translate_type.gif)','background-repeat':'no-repeat'},backgroundOffset:16};_self.YahooDirect=function(ev,lang){var url=document.URL;var index1=url.indexOf("&trurl=");var index2=url.indexOf("&",index1+3);if(index1!=-1&&index2!=-1){url=url.substring(index1+7,index2);}
if(index1!=-1&&index2==-1){url=url.substring(index1+7);}
url=unescape(url);var string='http://fanyi.cn.yahoo.com/translate_url?fr=alicom&lp='+lang+'&trurl='+escape(url);window.open(string);}
_self.init=function(userConfig){config=YL.merge(defConfig,userConfig||{})
var cDiv=get(config.containerId);for(var i=0,j=config.transType.length;i<j;i++){var a=document.createElement('A');a.innerHTML='&nbsp;';for(var m in config.propertiesA){YUD.setStyle(a,m,config.propertiesA[m]);}
YUD.setStyle(a,'background-position','0 -'+config.backgroundOffset*i+'px')
a.href="javascript:void(0);";cDiv.appendChild(a);YUE.on(a,'click',_self.YahooDirect,config.transType[i])}}};}());

AE.widget.InputHint=new function(){var $D=YAHOO.util.Dom,$E=YAHOO.util.Event,$=YUD.get;var defConfig={hintMessage:'',hintClass:'InputHint',appearOnce:false};var EMPTY_PATTERN=/^\s*$/;var focusHandler=function(ev,handle){handle.disappear();}
var blurHandler=function(ev,handle){handle.appear();}
var checkModify=function(ev,handle){handle.checkModify();}
this.decorate=function(inputField,config){inputField=$(inputField);config=config||{};YAHOO.lang.augmentObject(config,defConfig);var hintMessage=config.hintMessage||inputField.title;var handle={};handle.disappear=function(){if(hintMessage==inputField.value){inputField.value='';$D.removeClass(inputField,config.hintClass);}};handle.appear=function(){if(EMPTY_PATTERN.test(inputField.value)||hintMessage==inputField.value){inputField.value=hintMessage;$D.addClass(inputField,config.hintClass);}}
inputField.setAttribute("title",hintMessage);$E.on(inputField,'focus',focusHandler,handle);$E.on(inputField,'drop',focusHandler,handle);if(!config.appearOnce)
$E.on(inputField,'blur',blurHandler,handle);handle.checkModify=function(){if(inputField.value!=hintMessage){$D.removeClass(inputField,config.hintClass);}}
$E.on(window,'load',checkModify,handle);handle.appear();return handle;}}

var browerType='';function isIE(){if(browerType==''){if((navigator.appName=="Microsoft Internet Explorer")&&(parseInt(navigator.appVersion)>=3)){browerType='ie';}else{browerType='notie';}}
return browerType=='ie';}
function hideAdBanner(){var adBanners=getBannerElements();if(adBanners==null||adBanners.length==null){return;}else{var findFirst=false;for(var i=0;i<adBanners.length;i++){if(!findFirst&&!isHidden(adBanners[i])){findFirst=true;}else{if(isIE()){adBanners[i].style.display="none";}else{adBanners[i].width=1;adBanners[i].height=0;}}}}}
function isHidden(obj){var loopNumber=0;var currentObj=obj;do{if(currentObj==null||currentObj.style.display=="none"||currentObj.style.visibility=="hidden"){return true;}
currentObj=currentObj.parentNode;}while(currentObj.tagName!='BODY'&&(loopNumber++)<10)
return false;}
function getBannerElements(){if(isIE()){return document.all('ad160_15Banner');}else{var objArr=new Array();var index=0;for(var i=0;i<document.images.length;i++){if(document.images[i].src.indexOf('160x15_ad.gif')!=-1){objArr[index++]=document.images[i];}}
return objArr;}}

var marqueeArray=new Array();function Marquee(obj1,obj2){this.icefable1=obj1;this.icefable2=obj2;this.marqueesHeight=18;this.stopscroll=false;this.preTop=0;this.currentTop=0;this.stoptime=0;this.init_srolltext=init_srolltext;this.scrollUp=scrollUp;this.setTimer=setTimer;this.setStopScroll=setStopScroll;var index=marqueeArray.length;marqueeArray[index]=this;this.icefable1.scrollTop=0;with(this.icefable1){style.width=0;style.height=this.marqueesHeight;style.overflowX="visible";style.overflowY="hidden";noWrap=true;onmouseover=new Function("marqueeArray["+index+"].setStopScroll(true)");onmouseout=new Function("marqueeArray["+index+"].setStopScroll(false)");}}
function init_srolltext(){this.icefable2.innerHTML="";this.icefable2.innerHTML+=this.icefable1.innerHTML;this.icefable1.innerHTML=this.icefable2.innerHTML+this.icefable2.innerHTML;this.setTimer();}
function setTimer(){var index=marqueeArray.length-1;setInterval("marqueeArray["+index+"].scrollUp()",50);}
function setStopScroll(flag){this.stopscroll=flag;}
function scrollUp(){if(this.stopscroll)return;this.currentTop+=1;if(this.currentTop==20){this.stoptime+=1;this.currentTop-=1;if(this.stoptime==50){this.currentTop=0;this.stoptime=0;}}
else{this.preTop=this.icefable1.scrollTop;this.icefable1.scrollTop+=1;if(this.preTop==this.icefable1.scrollTop){this.icefable1.scrollTop=this.icefable2.offsetHeight-this.marqueesHeight;this.icefable1.scrollTop+=1;}}}

AE.namespace('AE.run.mainNavTransButton');AE.run.mainNavTransButton=function(){var _self=this;var elmButton,elmButtonItems;var sysLanguageId,sysLanguageCode;var defConfig={containerId:'transButton',langCodes:['fr','de','it','ru','es','pt'],langServerNames:['french','german','italian','russian','spanish','portuguese'],langTextImagePath:globalImgServer+'/images/eng/navigation/others/'};_self.init=function(config){var YL=YAHOO.lang,YUD=YAHOO.util.Dom,YUE=YAHOO.util.Event,get=YUD.get;defConfig=YL.merge(defConfig,config||{});sysLanguageCode=(navigator.browserLanguage?navigator.browserLanguage:navigator.language).toLowerCase();sysLanguageId=defConfig.langCodes.indexOf(sysLanguageCode.substr(0,2));if(sysLanguageId<0)return false;elmButton=get(defConfig.containerId);elmButtonItems=elmButton.getElementsByTagName('A');if(elmButton==null||elmButtonItems.length==0)return false;for(var i=0;i<elmButtonItems.length;i++){if(i==sysLanguageId){elmButtonItems[i].innerHTML='<img src="'+getLangTextImage(sysLanguageCode)+'" align="absmiddle" border="0" />';YUD.setStyle(elmButtonItems[i],'display','');}else{YUD.setStyle(elmButtonItems[i],'display','none');}}
YUD.setStyle(elmButton,'display','');};var getLanguageInfo=function(langInfos,langCode){var i=defConfig.langCodes.indexOf(langCode.substr(0,2));if(i>=0&&i<langInfos.length){return langInfos[i];}else{return'';}};var getLangTextImage=function(langCode){var imageName=getLanguageInfo(defConfig.langServerNames,langCode);if(imageName!='')imageName=defConfig.langTextImagePath+'txt_'+imageName+'.gif';return imageName;};};

AE.namespace('AE.run.transSelecter');AE.run.transSelecter=function(){var YL=YAHOO.lang,YUD=YAHOO.util.Dom,YUE=YAHOO.util.Event,get=YUD.get;var _self=this;var container,elTips,elButtonMore,elLangugeList;var languageListDisplay='none';var sysLanguageId,sysLanguageCode,sysLanguageName,serverName;var canClose=false,contentShowed=false,holded=false,delayTimer=false;var defConfig={containerId:'trans',langCodes:['fr','de','it','ru','es','pt'],showDelayTime:100,hiddenDelayTime:500};_self.init=function(config){defConfig=YL.merge(defConfig,config||{});container=get(defConfig.containerId);if(container==null)return false;sysLanguageCode=(navigator.browserLanguage?navigator.browserLanguage:navigator.language).toLowerCase();sysLanguageId=defConfig.langCodes.indexOf(sysLanguageCode.substr(0,2));elTips=YUD.getElementsByClassName('transTips','SPAN',container);elButtonMore=YUD.getElementsByClassName('transMore','A',container)[0];elLanguageList=YUD.getElementsByClassName('transList','UL',container)[0];if(elTips==null||elButtonMore==null||elLanguageList==null)return false;if(sysLanguageId<0){YUD.setStyle(elTips[0],'display','block');YUD.setStyle(elTips[1],'display','none');var optionButton=YUD.getElementsByClassName('btnOption','A',elTips[0]);YUE.on(optionButton,'mouseover',showDelay);YUE.on(optionButton,'mouseout',hiddenDelay);YUE.on(optionButton,'mouseover',function(){canClose=false;});YUE.on(optionButton,'mouseout',function(){canClose=true;});}else{YUD.setStyle(elTips[0],'display','none');YUD.setStyle(elTips[1],'display','block');var defaultButtons=YUD.getElementsByClassName('btnDefault','A',elTips[1]);for(var i=0;i<defaultButtons.length;i++){if(i!=sysLanguageId){YUD.setStyle(defaultButtons[i],'display','none');}else{YUD.setStyle(defaultButtons[i],'display','block');}}}
var listButtons=elLanguageList.getElementsByTagName('LI');for(var i=0;i<listButtons.length;i++){if(i==sysLanguageId){YUD.setStyle(listButtons[i],'display','none');}}
YUE.on(elLanguageList,'mouseover',showDelay);YUE.on(elLanguageList,'mouseout',hiddenDelay);YUE.on(elLanguageList,'mouseover',function(){canClose=false;});YUE.on(elLanguageList,'mouseout',function(){canClose=true;});YUE.on(elButtonMore,'mouseover',showDelay);YUE.on(elButtonMore,'mouseout',hiddenDelay);YUE.on(elButtonMore,'mouseover',function(){canClose=false;});YUE.on(elButtonMore,'mouseout',function(){canClose=true;});};var showDelay=function(){if(delayTimer)clearTimeout(delayTimer);delayTimer=setTimeout(showDirectly,defConfig.showDelayTime);};var hiddenDelay=function(){if(holded==true)return;if(delayTimer)clearTimeout(delayTimer);delayTimer=setTimeout(hiddenDirectly,defConfig.hiddenDelayTime);};var showDirectly=function(){if(contentShowed||holded)return;languageListDisplay='block';YUD.setStyle(elLanguageList,'display',languageListDisplay);contentShowed=true;};var hiddenDirectly=function(){if(!canClose)return false;languageListDisplay='none';YUD.setStyle(elLanguageList,'display',languageListDisplay);contentShowed=false;};};
