
function AddNamespace(namespacePath){var rootObject=window;var namespaceParts=namespacePath.split('.');for(var i=0;i<namespaceParts.length;i++){var currentPart=namespaceParts[i];if(!rootObject[currentPart]){rootObject[currentPart]=new Object();}
rootObject=rootObject[currentPart];}}
AddNamespace('NPR.ServerConstants');NPR.ServerConstants.webHost='www.npr.org';NPR.ServerConstants.phototoolImgTmpUploadDir='/assets/tmp';NPR.ServerConstants.crowdCookieTokenkey='crowd.token_key';NPR.ServerConstants.googleAnalyticsAccount='UA-5828686-4';NPR.ServerConstants.dfpServer='ad.doubleclick.net';NPR.ServerConstants.dfpNetwork='n6735';NPR.ServerConstants.dfpSite='NPR';NPR.ServerConstants.dfpUsetestserver='';NPR.ServerConstants.localizeStation=true;NPR.ServerConstants.localizeURL='http://api.npr.org/v2/local/stream/basic';
(function($){$.fn.tabs=function(options){var defaults={initTab:1};options=$.extend(defaults,options);function getCurrentViewClass(item){if($(item).hasClass('npr-tab-h-item-inactive')){return'npr-tab-h-item-inactive';}
if($(item).hasClass('npr-tab-h-item-active')){return'npr-tab-h-item-active';}}
function updateTabsCss(item){$(item).addClass('npr-tab-h-item-active').removeClass('npr-tab-h-item-inactive').attr('viewCls','npr-tab-h-item-active').siblings().addClass('npr-tab-h-item-inactive').removeClass('npr-tab-h-item-active').attr('viewCls','npr-tab-h-item-inactive');}
function switchPanel(sid,item){var hid=$(item).attr('headId');updateTabsCss(item);$(sid).find('.npr-tabs-d > li[dataId='+hid+']').show().siblings().hide();}
return this.each(function(){var id=$(this).attr('id');var sid='#'+id;function init(){var count=0;$(sid).find('.npr-tabs-h > li').each(function(){var incr=count++;$(this).addClass('npr-tab-h-items').addClass('npr-tab-h-item-'+incr).attr('headId',id+incr).css('cursor','pointer');}).hover(function(){var viewCls=getCurrentViewClass(this);$(this).attr('viewCls',viewCls).removeClass(viewCls).addClass('npr-tab-h-item-hover');},function(){var viewCls=$(this).attr('viewCls');$(this).removeClass('npr-tab-h-item-hover').addClass(viewCls);}).click(function(){switchPanel(sid,this);});count=0;$(sid).find('.npr-tabs-d > li').each(function(){$(this).addClass('npr-tab-d-items');$(this).attr('dataId',id+count++);});var query='.npr-tabs-h > li:eq('+options.initTab+')';var initItem=$(sid).find(query).get();switchPanel(sid,initItem);$(sid).removeClass('init-hidden');}
init();});};})(jQuery);(function($){$.checkNickname=function(clickable,nicknameInput){$(clickable).click(function(){var inputEl=$(nicknameInput).get(0);var value=inputEl.value;var params={public_user_nick_name:value};var render=function(result)
{var msg='<div id="nicknameresult" class="activeerror">';msg+='Unable to check nickname.</div>';switch(result){case true:msg='<div id="nicknameresult" class="activemsg">';msg+='This nickname is available</div>';break;case false:msg='<div id="nicknameresult" class="activeerror">';msg+='This nickname is not available</div>';break;}
var parent=$(inputEl).parent('p');var offset=$(parent).offset();var height=$(parent).height();$(document.body).append(msg);$('#nicknameresult').css('left',offset.left).css('top',offset.top+height).css('position','absolute');setTimeout(function(){var oncomplete=function(){$('#nicknameresult').remove();};$('#nicknameresult').fadeOut("slow",oncomplete);},4000);};$.ajax({url:'/templates/reg/remoteValidateUsername.php',type:'GET',data:params,dataType:'json',timeout:1500,success:render});return false;});};})(jQuery);(function($){$.fn.delay=function(options){var timer;function count(scope){if(timer!==null){clearTimeout(timer);}
var newFn=function(){options.fn.apply(scope);};timer=setTimeout(newFn,options.delay);}
return this.each(function(){var obj=$(this);obj.bind(options.event,function(event){var ignoreKey=null;if(event.keyCode){ignoreKey=event.keyCode;}else if(event.which){ignoreKey=event.which;}
if(ignoreKey&&ignoreKey==13||ignoreKey==27||ignoreKey==38||ignoreKey==40||ignoreKey>60000){event.preventDefault();}else{count(this);}});});};})(jQuery);(function($){if(!$.validator){return;}
$.validator.addMethod("rfc2822email",function(value,element){if(value===""){return true;}
var atSym=value.lastIndexOf("@");if(atSym<1){return false;}
if(atSym==value.length-1){return false;}
if(atSym>64){return false;}
if(value.length-atSym>255){return false;}
var lastDot=value.lastIndexOf(".");if(lastDot>atSym+1&&lastDot<value.length-1){return true;}
if(value.charAt(atSym+1)=='['&&value.charAt(value.length-1)==']'){return true;}
return false;},"Please enter a valid email.");$.validator.addMethod("personname",function(value,element){var regex=/^[a-z\.' -]+$/i;if(value===""){return true;}
var passes=regex.test(value);return passes;},"Please enter a valid name.");$.validator.addMethod("nickname",function(value,element){var regex=/^[a-z0-9_]+$/i;if(value===""){return true;}
var passes=regex.test(value);return passes;},"Please enter a valid nickname. Only letters, numbers, and the underscore character may be used.");$.validator.addMethod("alpha",function(value,element){var regex=/^[a-z]+$/i;if(value===""){return true;}
var passes=regex.test(value);return passes;},"Please enter a valid alpha string.");})(jQuery);(function($){$.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!==''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=$.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};$.newsletterscookie=function(){var cookie=$.cookie('nl');if(cookie===null){return null;}
return cookie.split(",");};$.stationscookie=function(){var cookie=$.cookie('st');if(cookie===null){return null;}
return cookie.split(",");};$.authcookie=function(){var obj={};var cookie=$.cookie('at');if(cookie===null){return obj;}
var items=cookie.split('&');for(var i=0;i<items.length;i++){var kv=items[i].split('=');var key=kv[0];var val=kv[1];switch(key){case'u':obj.userid=val;break;case'a':obj.username=val;break;case'e':obj.email=val;break;case'f':obj.fname=val;break;case'l':obj.lname=val;break;case'g':obj.gender=val;break;default:obj[key]=val;}}
if(obj.fname!=='undefined'){obj.fullname=obj.fname;}
if(obj.lname!=='undefined'){if(obj.fullname){obj.fullname+=' '+obj.lname;}else{obj.fullname=obj.lname;}}
return obj;};})(jQuery);(function($){$.grabStationIds=function(){var stations=$('input[name="public_user_stations[]"]').get();var sids=[];for(var i=0;i<stations.length;i++){sids.push(stations[i].value);}
var csv=sids.join(',');return csv;};})(jQuery);(function($){$.arrayContains=function(element,arr){for(var i=0;i<arr.length;i++){if(arr[i]==element){return true;}}
return false;};})(jQuery);(function($){$.fn.login=function(callback){var fn=null;if(callback){fn=function(){$(this).bind('login',callback);};}else{fn=function(){$(this).trigger('login');};}
return this.each(fn);};$.fn.logout=function(callback){var fn=null;if(callback){fn=function(){$(this).bind('logout',callback);};}else{fn=function(){$(this).trigger('logout');};}
return this.each(fn);};})(jQuery);
jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
(function($){AddNamespace('NPR.util');var __filename='cookie.js';var at=undefined,_methods={init:function(){var _at,p,q,x;if(typeof at==='undefined'){try{_at=get_cookie('at');if(typeof _at!=='undefined'&&_at!==null){at={};p=_at.split('&');for(x in p){q=p[x].split('=');if(q.length>2){}else if(q.length===2){if(q[0]=='e'){at[q[0]]=decodeURIComponent(q[1]);}else{at[q[0]]=decodeURIComponent(q[1].replace(/\+/g," "));}}}}else{at=undefined;}}catch(e){NPR.messaging.exception(e,__filename,'cookie.init',NPR.messaging.constants.EVENT_JS_ERROR);}}}},methods={cookie:{getKey:function(key){if(methods.cookie.exists(key)){return at[key];}},exists:function(key){_methods.init();if(typeof at!=='undefined'&&key in at){return true;}
return false;},full:function(){_methods.init();return at;},reset:function(callback){at=undefined;_methods.init();callback();}}}
$.extend(true,NPR.util,methods);})(jQuery);
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
return'\\u'+('0000'+
(+(a.charCodeAt(0))).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
return{stringify:function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+
(+(a.charCodeAt(0))).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');}};}();}
var sUserAgent=navigator.userAgent.toLowerCase();var isOp=(sUserAgent.indexOf('opera')!=-1)?true:false;if(typeof NPR==='undefined'){document.write("<script type='text/javascript' src='/templates/javascript/player/player.js'></script>\n");}
function popUp(oAnchor,sProps,sWindow){var sUrl='';if(typeof(oAnchor)=='string')sUrl=oAnchor;else{if(oAnchor.getAttribute)sUrl=oAnchor.getAttribute('href');if(sUrl=='')sUrl=oAnchor.href;}
if(sUrl=='')return true;var sWindowName=sWindow?sWindow:'nprPopup';if(!sProps)sProps=null;if(sUrl)var oPopup=window.open(sUrl,sWindowName,sProps);if(oPopup&&!isOp)oPopup.focus();return(oPopup)?false:true;}
function setUserVars()
{if(navigator.appName.indexOf('Internet Explorer')!=-1)
{window.isIE=true;}
window.userPlatform=navigator.platform;if((window.userPlatform.indexOf("mac")!=-1)||(window.userPlatform.indexOf("MAC")!=-1)||(window.userPlatform.indexOf("Mac")!=-1))
{window.userPlatform="mac";}}
setUserVars();function adCompatible(mediaPreference)
{if(navigator.userAgent.indexOf("Windows\ NT\ 5.1")!=-1)
{return true;}
else
{return true;}
return true;}
function doAd(newURL,mediaPreference)
{if(adCompatible(mediaPreference))
{location.href=newURL+"&getUnderwriting=1";}
else
{location.href=newURL;}}
function toNumericMonth(month)
{var monthArray=new Object();monthArray["jan"]=0;monthArray["feb"]=1;monthArray["mar"]=2;monthArray["apr"]=3;monthArray["may"]=4;monthArray["jun"]=5;monthArray["jul"]=6;monthArray["aug"]=7;monthArray["sep"]=8;monthArray["oct"]=9;monthArray["nov"]=10;monthArray["dec"]=11;return monthArray[month.toLowerCase()];}
function toFullMonth(num)
{var monthArray=new Object();monthArray[0]="January";monthArray[1]="February";monthArray[2]="March";monthArray[3]="April";monthArray[4]="May";monthArray[5]="June";monthArray[6]="July";monthArray[7]="August";monthArray[8]="September";monthArray[9]="October";monthArray[10]="November";monthArray[11]="December";return monthArray[num];}
function parseZero(valToUse)
{if(valToUse.length>1&&valToUse.charCodeAt(0)==0)
{valToUse=valToUse.substr(1,valToUse.length);}
return valToUse;}
function setDate(dateToUse)
{dateArray=dateToUse.split("-");dateToReturn=new Date();dateToReturn.setDate(parseZero(dateArray[0]));dateToReturn.setMonth(toNumericMonth(dateArray[1].toLowerCase()));dateToReturn.setYear(dateArray[2]);dateToReturn=Date.parse(dateToReturn);return dateToReturn;}
function compareDates(date1,date2)
{date1=setDate(date1);date2=setDate(date2);returnVal="after";if(date2<date1)
{returnVal="before";}
return returnVal;}
function checkMediaPrefs(mediaPrefVals,valToTest)
{match=false;for(i=0;i<mediaPrefVals.length;i++)
{if(mediaPrefVals[i]==valToTest)
{match=true;}}
return match;}
function trimString(sInString)
{sInString=sInString.replace(/^\s+/g,"");return sInString.replace(/\s+$/g,"");}
function makePrefArray(mediaPreference)
{numRetArray=0;retArray=new Array();temp=new Array();temp=mediaPreference.split(",");for(i=0;i<temp.length;i++)
{if(trimString(temp[i])!="")
{retArray[numRetArray]=temp[i].toUpperCase();numRetArray++;}}
return retArray;}
function goNewURL(newURL,saURL,winTarget)
{if(saURL=="")
{saURL=newURL;}
if(window.sa_onclick)
{sa_onclick(saURL);}
if(winTarget=="new")
{window.open(newURL,'',"width=540,height=360,toolbar=none,location=none,menubar=none,status=none,resizable=yes");}
else
{location.href=newURL;}}
function getMedia(prgCode,showDate,segNum,mediaAvailable)
{nprcookie=get_cookie('sauid');mediaAvailArray=makePrefArray(mediaAvailable);if((segNum=="all")||(segNum=="ALL"))
{segNum="";}
if(checkMediaPrefs(mediaAvailArray,"RAM")&&(!checkMediaPrefs(mediaAvailArray,"RM"))&&(!checkMediaPrefs(mediaAvailArray,"WM")))
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?prgCode="+prgCode+"&showDate="+showDate+"&segNum="+segNum+"&mediaPref=RAM","","");}
else if(checkMediaPrefs(mediaAvailArray,"RM")&&!checkMediaPrefs(mediaAvailArray,"WM"))
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?prgCode="+prgCode+"&showDate="+showDate+"&segNum="+segNum+"&mediaPref=RM","","");}
else if(checkMediaPrefs(mediaAvailArray,"WM")&&!checkMediaPrefs(mediaAvailArray,"RM"))
{if(nprcookie!=null&&nprcookie!="undefined")
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg_wmref.php?prgCode="+prgCode+"&showDate="+showDate+"&segNum="+segNum+"&mediaPref=WM&sauid="+nprcookie,"","");}
else
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg_wmref.php?prgCode="+prgCode+"&showDate="+showDate+"&segNum="+segNum+"&mediaPref=WM","","");}}
else if((checkMediaPrefs(mediaAvailArray,"WM")&&!checkMediaPrefs(mediaAvailArray,"RM"))||((checkMediaPrefs(mediaAvailArray,"RAM")||checkMediaPrefs(mediaAvailArray,"RM"))&&checkMediaPrefs(mediaAvailArray,"WM")))
{if(nprcookie!=null&&nprcookie!="undefined")
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg_wmref.php?prgCode="+prgCode+"&showDate="+showDate+"&segNum="+segNum+"&mediaPref=WM&sauid="+nprcookie,"","");}
else
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg_wmref.php?prgCode="+prgCode+"&showDate="+showDate+"&segNum="+segNum+"&mediaPref=WM","","");}}}
function getStaticMedia(URL,mediaPreference)
{sauid=checkCookie("sauid");referrer=document.referrer;mediaPrefVals=makePrefArray(mediaPreference);if(URL.indexOf("http://")!=-1)
{goNewURL(URL,'','');}
else if(URL.toUpperCase()=="NEWSCAST")
{getNewsCast();}
else if(URL.toUpperCase()=="PROGRAMSTREAM")
{getProgramStream();}
else if((checkMediaPrefs(mediaPrefVals,"WM"))&&(checkMediaPrefs(mediaPrefVals,"RM")))
{mediaPreference=checkCookie("NPRMediaPref");if((mediaPreference==false)||(mediaPreference=="RM"))
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?mediaURL="+URL+"&mediaType=RM",URL,"");}
else if(mediaPreference=="WM")
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?mediaURL="+URL+"&mediaType=WM",URL,"");}}
else if((checkMediaPrefs(mediaPrefVals,"RM"))&&(!checkMediaPrefs(mediaPrefVals,"WM")))
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?mediaURL="+URL+"&mediaType=RM",URL,"");}
else if((checkMediaPrefs(mediaPrefVals,"WM"))&&(!checkMediaPrefs(mediaPrefVals,"RM")))
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?mediaURL="+URL+"&mediaType=WM",URL,"");}}
function getTopicMedia(topicId,topicName,mediaPreference)
{topicName=escape(topicName);nprcookie=get_cookie('sauid');mediaPrefVals=makePrefArray(mediaPreference);if(checkCookie("NPRMediaPref"))
{mediaPreference=checkCookie("NPRMediaPref");newURL="http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?topicId="+topicId+"&topicName="+topicName+"&mediaPref="+mediaPreference;if(mediaPreference=="WM")
{if(nprcookie!=null&&nprcookie!="undefined")
{newURL="http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg_wmref.php?topicId="+topicId+"&topicName="+topicName+"&mediaPref="+mediaPreference+"&sauid="+nprcookie;}
else
{newURL="http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg_wmref.php?topicId="+topicId+"&topicName="+topicName+"&mediaPref="+mediaPreference;}}
if(window.sa_onclick)
{sa_onclick(newURL);}
doAd(newURL,mediaPreference);}
else
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/audioplayer.php?topicId="+topicId+"&topicName="+topicName,"","new");}}
function getLatestShow(prgCode)
{if(checkCookie("NPRMediaPref"))
{mediaPreference=checkCookie("NPRMediaPref");goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?getLatestShow=true&prgCode="+prgCode+"&NPRMediaPref="+mediaPreference,"","new");}
else
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/audioplayer.php?getLatestShow=true&prgCode="+prgCode,"","new");}}
function getFeaturedAudio(newURL)
{nprcookie=get_cookie('sauid');if(checkCookie("NPRMediaPref"))
{mediaPreference=checkCookie("NPRMediaPref");if(mediaPreference=="WM")
{newURL+="&NPRMediaPref=WM";newURL=replaceString(newURL,'dmg.php','dmg_wmref.php');if(nprcookie!=null&&nprcookie!="undefined")
{newURL+="&sauid="+nprcookie;}}
else
{newURL+="&NPRMediaPref=RM";}
if(window.sa_onclick)
{sa_onclick(newURL);}
doAd(newURL,mediaPreference);}
else
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/audioplayer.php?newURL="+newURL,'','new');}}
function getProgramStream()
{NPR.Player.openPlayer(0,0,null,NPR.Player.Action.LIVE_STREAM,NPR.Player.Type.PROGRAM_STREAM,NPR.Player.Mode.FROM_FILE);}
function getNewsCast()
{NPR.Player.openPlayer(0,0,null,NPR.Player.Action.PLAY_NOW,NPR.Player.Type.NEWSCAST,NPR.Player.Mode.FROM_FILE);}
function getMusicButton(songId,musicAudioFileName,prgCode)
{if(checkCookie("NPRMediaPref"))
{mediaPreference=checkCookie("NPRMediaPref");goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/dmg.php?getMusicButton=true&songId="+songId+"&musicAudioFileName="+musicAudioFileName+"&prgCode="+prgCode+"&NPRMediaPref="+mediaPreference,"","");}
else
{goNewURL("http://"+NPR.ServerConstants.webHost+"/templates/dmg/audioplayer.php?getMusicButton=true&songId="+songId+"&musicAudioFileName="+musicAudioFileName+"&prgCode="+prgCode,'',"new");}}
function setCookie(cookieToSet,daysToExpiration,cookieValue)
{var exp=new Date();exp.setTime(exp.getTime()+(1000*60*60*24*daysToExpiration));document.cookie=cookieToSet+"="+cookieValue+"; path=/; domain=npr.org; expires="+exp.toGMTString();}
function checkCookie(cookieToCheck)
{var allcookies=document.cookie;var pos=allcookies.indexOf(cookieToCheck+"=");if(pos!=-1)
{var start=pos+cookieToCheck.length+1;var end=allcookies.indexOf(";",start);if(end==-1)
{end=allcookies.length;}
return allcookies.substring(start,end);}
else
{return false;}}
function killCookie(cookieToKill)
{setCookie(cookieToKill,-1,'');if(cookieToKill=='station'){$('.ddstn').slideUp(250,function(){$('#header .headercontent, #musicHeader .headercontent').removeClass("dd_active");});$('#globalstationlocation').html("\n");$('#station_info').html("\n");$('#stationLocalizationWrap').removeClass('localized');}}
function replaceString(repStr,stringToFind,stringToRep)
{sFind=0;newStr=repStr;while(sFind!=-1)
{sFind=newStr.indexOf(stringToFind);if(sFind!=-1)
{startString=newStr.substring(0,sFind);endString=newStr.substring(sFind+stringToFind.length,newStr.length);newStr=startString+stringToRep+endString;}}
return newStr;}
function set_cookie(name,value,expires,path,domain,secure)
{var today=new Date();today.setTime(today.getTime());if(expires)
{expires=expires*1000*60*60*24;}
var expires_date=new Date(today.getTime()+(expires));document.cookie=name+"="+escape(value)+
((expires)?";expires="+expires_date.toGMTString():"")+
((path)?";path="+path:"")+
((domain)?";domain="+domain:"")+
((secure)?";secure":"");}
function get_cookie(name)
{var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length)))
{return null;}
if(start==-1)return null;var end=document.cookie.indexOf(";",len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end));}
function get_source_code()
{var url=document.URL;var sc=url.match(/(&|\?)sc=(\w+)/);var sourceCode=url.match(/(&|\?)sourceCode=(\w+)/);var ft=url.match(/(&|\?)ft=(\w+)/);if(ft!=null&&ft[2]!=null)
{return'/sc='+ft[2];}
else if(sc!=null&&sc[2]!=null)
{return'/sc='+sc[2];}
else if(sourceCode!=null&&sourceCode[2]!=null)
{return'/sc='+sourceCode[2];}
else
{return'';}}
function get_target()
{if(window.target!=null)
{return window.target;}
else
{return'';}}
function getFinalPrefs(mediaPrefVals,valToTest)
{retPref="";for(i=0;i<mediaPrefVals.length;i++)
{if(valToTest=="WM"&&(mediaPrefVals[i]=="WM"||mediaPrefVals[i]=="WAX"||mediaPrefVals[i]=="ASX"))
{retPref=mediaPrefVals[i];}
else if(valToTest=="RM"&&(mediaPrefVals[i]=="RM"||mediaPrefVals[i]=="RAM"))
{retPref=mediaPrefVals[i];}}
return retPref;}
function choosePlayer(mediaAvailableVals,playerAvailableVals)
{countAvaPlayer=0;avaMatchPlayer="";for(i=0;i<mediaAvailableVals.length;i++)
{for(j=0;j<playerAvailableVals.length;j++)
{if(mediaAvailableVals[i]==playerAvailableVals[j])
{if(countAvaPlayer==0)
{avaMatchPlayer=mediaAvailableVals[i];countAvaPlayer++;}
else
{avaMatchPlayer+=","+mediaAvailableVals[i];}}}}
return avaMatchPlayer;}
function forceChoosePlayer(mediaAvailableVals)
{finalChoose="";for(i=0;i<mediaAvailableVals.length;i++)
{if(mediaAvailableVals[i]=="WM"||mediaAvailableVals[i]=="ASX"||mediaAvailableVals[i]=="WAX")
{finalChoose=mediaAvailableVals[i];break;}}
if(finalChoose=="")
{for(i=0;i<mediaAvailableVals.length;i++)
{if(mediaAvailableVals[i]=="RM"||mediaAvailableVals[i]=="RAM")
{finalChoose=mediaAvailableVals[i];break;}}}
if(window.userPlatform=="mac"&&finalChoose!="RM"&&finalChoose!="RAM")
{for(i=0;i<mediaAvailableVals.length;i++)
{if(mediaAvailableVals[i]=="RM"||mediaAvailableVals[i]=="RAM")
{finalChoose=mediaAvailableVals[i];break;}}}
return finalChoose;}
function getRandom(num)
{myRandomNum='';for(myRandomNum='';myRandomNum.length<num;myRandomNum+=Math.round(Math.random()*7));return myRandomNum;}
function getGUID()
{myGuid=get_cookie('GUID');if(myGuid==null||myGuid=="undefined")
{for(myGuid='';myGuid.length<32;myGuid+=Math.round(Math.random()*7));}
return myGuid;}
function popNewWindow(newURL)
{if(newURL)
{popUp(newURL,'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=340,height=492','player');}}
function addExtraMediaType(availableMediaTypeArray)
{returnArray=new Array();mCounter=0;for(i=0;i<availableMediaTypeArray.length;i++)
{returnArray[mCounter]=availableMediaTypeArray[i];mCounter++;if(availableMediaTypeArray[i]=="RM")
{returnArray[mCounter]="RAM";mCounter++;returnArray[mCounter]="RA";mCounter++;returnArray[mCounter]="RMM";mCounter++;}
else if(availableMediaTypeArray[i]=="WM")
{returnArray[mCounter]="ASX";mCounter++;returnArray[mCounter]="WAX";mCounter++;}}
return returnArray;}
function checkFileMediaType(mediaAvailArray)
{for(i=0;i<mediaAvailArray.length;i++)
{if(mediaAvailArray[i]=='WM'||mediaAvailArray[i]=='ASX'||mediaAvailArray[i]=='WMA'||mediaAvailArray[i]=='RM'||mediaAvailArray[i]=='RAM'||mediaAvailArray[i]=='RA'||mediaAvailArray[i]=='RMM')
{return true;}}
return false;}
function launchPlayer(baseId,baseType,baseDate,accParameters,mediaAvailable)
{errorCode=0;pageId=getRandom(8);random10=getRandom(10);myGuid=getGUID();wAudioMediaType='WM,RM';mediaAvailArray=makePrefArray(mediaAvailable);if(!checkFileMediaType(mediaAvailArray))
{errorCode=1;}
audioMediaTypeArray=makePrefArray(wAudioMediaType);audioMediaTypeArray=addExtraMediaType(audioMediaTypeArray);if(audioMediaTypeArray.length==0)
{errorCode=2;}
avaMatchPlayer=choosePlayer(mediaAvailArray,audioMediaTypeArray);avaMatchPlayerArray=makePrefArray(avaMatchPlayer);userMediaPreference=checkCookie("NPRMediaPref");newURL="http://"+NPR.ServerConstants.webHost+"/templates/dmg/popup.php?id="+baseId+"&type="+baseType+"&date="+baseDate+"&au=1&pid="+pageId+"&random="+random10+"&guid="+myGuid+"&uaType="+wAudioMediaType+"&aaType="+mediaAvailable+"&upf="+window.userPlatform+accParameters;if(baseType==10)
{newURL="http://"+NPR.ServerConstants.webHost+"/templates/dmg/popup.php?id=100&type=10&staticUrl="+baseDate+"&au=1&pid="+pageId+"&random="+random10+"&guid="+myGuid+"&uaType="+wAudioMediaType+"&aaType="+mediaAvailable+"&upf="+window.userPlatform+accParameters;}
if(userMediaPreference)
{finalSelMediaType=getFinalPrefs(avaMatchPlayerArray,userMediaPreference);if(finalSelMediaType!="")
{newURL+="&mtype="+finalSelMediaType;popNewWindow(newURL);}
else
{if(avaMatchPlayerArray.length>0)
{forceChooseMedia=forceChoosePlayer(avaMatchPlayerArray);if(forceChooseMedia!="")
{newURL+="&mtype="+forceChooseMedia;popNewWindow(newURL);return;}}
if(avaMatchPlayerArray.length==0&&errorCode==0)
{errorCode=3;}
newURL+="&errorCode="+errorCode;popNewWindow(newURL);}}
else
{forceChooseMedia=forceChoosePlayer(avaMatchPlayerArray);if(forceChooseMedia!="")
{newURL+="&mtype="+forceChooseMedia;popNewWindow(newURL);}
else
{newURL+="&errorCode="+errorCode;popNewWindow(newURL);}}}
function launchPlayerError(baseId,baseType,baseDate,accParameters,mediaAvailable,error_id)
{pageId=getRandom(8);random10=getRandom(10);myGuid=getGUID();errorCode=0;mediaAvailable="";switch(error_id)
{case 1:mediaAvailable="DC";break;case 2:window.audioMediaType="";mediaAvailable="RM,WM";break;case 3:window.audioMediaType="WM";mediaAvailable="RM";break;case 4:window.audioMediaType="RM";mediaAvailable="WM";break;case 5:window.audioMediaType="RM,WM";mediaAvailable="WM";break;case 6:window.audioMediaType="RM,WM";mediaAvailable="RM";break;case 7:window.audioMediaType="WM";mediaAvailable="WM,RM";break;case 8:window.audioMediaType="RM";mediaAvailable="WM,RM";break;}
wAudioMediaType=window.audioMediaType;mediaAvailArray=makePrefArray(mediaAvailable);if(!checkFileMediaType(mediaAvailArray))
{errorCode=1;}
audioMediaTypeArray=makePrefArray(wAudioMediaType);audioMediaTypeArray=addExtraMediaType(audioMediaTypeArray);if(audioMediaTypeArray.length==0)
{errorCode=2;}
avaMatchPlayer=choosePlayer(mediaAvailArray,audioMediaTypeArray);avaMatchPlayerArray=makePrefArray(avaMatchPlayer);userMediaPreference=checkCookie("NPRMediaPref");newURL="http://"+NPR.ServerConstants.webHost+"/templates/dmg/popup.php?id="+baseId+"&type="+baseType+"&date="+baseDate+"&au=1&pid="+pageId+"&random="+random10+"&guid="+myGuid+"&uaType="+wAudioMediaType+"&aaType="+mediaAvailable+accParameters;if(userMediaPreference)
{finalSelMediaType=getFinalPrefs(avaMatchPlayerArray,userMediaPreference);if(finalSelMediaType!="")
{newURL+="&mtype="+finalSelMediaType;popNewWindow(newURL);}
else
{if(avaMatchPlayerArray.length>0)
{forceChooseMedia=forceChoosePlayer(avaMatchPlayerArray);if(forceChooseMedia!="")
{newURL+="&mtype="+forceChooseMedia;popNewWindow(newURL);return;}}
if(avaMatchPlayerArray.length==0&&errorCode==0)
{errorCode=3;}
newURL+="&errorCode="+errorCode;popNewWindow(newURL);}}
else
{forceChooseMedia=forceChoosePlayer(avaMatchPlayerArray);if(forceChooseMedia!="")
{newURL+="&mtype="+forceChooseMedia;popNewWindow(newURL);}
else
{newURL+="&errorCode="+errorCode;popNewWindow(newURL);}}}
function getURLParamArray()
{var aQueryString=new Array();var strHref=window.location.href;if(strHref.indexOf("?")>-1)
{var strQueryString=strHref.substr(strHref.indexOf("?"));var aQueryString=strQueryString.split("&");}
return aQueryString;}
function getURLParam(strParamName)
{var strReturn="";var strHref=window.location.href;if(strHref.indexOf("?")>-1)
{var strQueryString=strHref.substr(strHref.indexOf("?"));var aQueryString=strQueryString.split("&");for(var iParam=0;iParam<aQueryString.length;iParam++)
{if(aQueryString[iParam].indexOf(strParamName+"=")>-1)
{var aParam=aQueryString[iParam].split("=");strReturn=aParam[1];break;}}}
return strReturn;}
try
{document.execCommand("BackgroundImageCache",false,true);}
catch(err){}
function collectionToArray(col){a=new Array();for(i=0;i<col.length;i++)
a[a.length]=col[i];return a;}
function concatCollections(col1,col2)
{if(col1==null)
{return collectionToArray(col2);}
else if(col2==null)
{return collectionToArray(col1);}
else
{return collectionToArray(col1).concat(collectionToArray(col2));}}
function toggleDetails(num)
{if(document.getElementById)
{objRef=document.getElementById("descriptionTxt"+num);expanderRef=document.getElementById("expander"+num);if(objRef.className=="closeDiv")
{objRef.className="openDiv";expanderRef.setAttribute("src","http://media.npr.org/images/quiz_hide.gif");expanderRef.setAttribute("alt","Hide Answer");}
else if(objRef.className=="openDiv")
{objRef.className="closeDiv";expanderRef.setAttribute("src","http://media.npr.org/images/quiz_show.gif");expanderRef.setAttribute("alt","Show Answer");}}}
function clearField()
{if(document.go_local&&document.go_local.txtSearchValue.value.toUpperCase().indexOf("LETTERS")>-1)
{document.go_local.txtSearchValue.value="";}}
function fillField()
{if(document.go_local.txtSearchValue.value=="")
{document.go_local.txtSearchValue.value="Call Letters";}}
function zipUcase()
{if(document.go_local.txtSearchValue.value!="Call Letters")
{document.go_local.txtSearchValue.value=document.go_local.txtSearchValue.value.toUpperCase();}}
function href()
{url=escape(window.location.href);andFind=url.indexOf("&");startPos=0;while(andFind>-1)
{url=url.substring(startPos,andFind)+"%26"+url.substring(andFind+1);andFind=url.indexOf("&");}
var re=new RegExp(' ','gi');window.location.href="/stations/?refUrl="+url;}
function removeHref(cookieValue)
{url=escape(window.location.href);andFind=url.indexOf("&");startPos=0;while(andFind>-1)
{url=url.substring(startPos,andFind)+"%26"+url.substring(andFind+1);andFind=url.indexOf("&");}
var re=new RegExp(' ','gi');window.location.href="/stations/cookies/stations_kill_cookie.php?cookieValue="+cookieValue+"&url="+url;}
var isDHTML=0;var isLayers=0;var isAll=0;var isID=0;if(document.getElementById){isID=1;isDHTML=1;}
else{if(document.all){isAll=1;isDHTML=1;}
else{browserVersion=parseInt(navigator.appVersion);if((navigator.appName.indexOf('Netscape')!=-1)&&(browserVersion==4)){isLayers=1;isDHTML=1;}}}
function findDOM(objectID,withStyle){if(withStyle==1){if(isID){return(document.getElementById(objectID).style);}
else{if(isAll){return(document.all[objectID].style);}
else{if(isLayers){return(document.layers[objectID]);}};}}
else{if(isID){return(document.getElementById(objectID));}
else{if(isAll){return(document.all[objectID]);}
else{if(isLayers){return(document.layers[objectID]);}};}}}
function setClass(objectID,newClass){var dom=findDOM(objectID,0);dom.className=newClass;viewType=newClass;};
AddNamespace('NPR.Devices');if($('html').hasClass('touch')){if(Modernizr.mq('only screen and (min-device-width: 768px) and (max-device-width: 1024px)')){$('html').addClass('NPRtablet');}
if(Modernizr.mq('only screen and (max-device-width: 767px)')){$('html').addClass('NPRphone');}}
if(NPR.PageInfo.getUrlParameter('device')=='tablet'){$('html').addClass('NPRtablet');}
if(NPR.PageInfo.getUrlParameter('device')=='phone'){$('html').addClass('NPRphone');}
NPR.Devices.isOnTablet=function(){if($('html').hasClass('NPRtablet')){return true;}
else{return false;}};NPR.Devices.isOnPhone=function(){if($('html').hasClass('NPRphone')){return true;}
else{return false;}};NPR.BREAKPOINT={SMALL:{NAME:'small',MIN:0,MAX:767},MEDIUM:{NAME:'medium',MIN:768,MAX:1024},MEDIUM_WITH_AD:{NAME:'mediumAd',MIN:1000,MAX:1024},LARGE:{NAME:'large',MIN:1025,MAX:1200},LARGER:{NAME:'larger',MIN:1201,MAX:1759},LARGEST:{NAME:'largest',MIN:1760,MAX:10000}};NPR.Devices.isScreenSmallerOrEqual=function(breakpoint){if(typeof(breakpoint)=="object"){return Modernizr.mq('only screen and (max-width: '+breakpoint.MAX+'px)');}
else if(typeof(breakpoint)=="number"){return Modernizr.mq('only screen and (max-width: '+breakpoint+'px)');}
else{return false;}};NPR.Devices.isScreenSmaller=function(breakpoint){if(typeof(breakpoint)=="object"){return Modernizr.mq('only screen and (max-width: '+(breakpoint.MIN-1)+'px)');}
else if(typeof(breakpoint)=="number"){return Modernizr.mq('only screen and (max-width: '+(breakpoint-1)+'px)');}
else{return false;}};NPR.Devices.isScreenLargerOrEqual=function(breakpoint){if(typeof(breakpoint)=="object"){return Modernizr.mq('only screen and (min-width: '+breakpoint.MIN+'px)');}
else if(typeof(breakpoint)=="number"){return Modernizr.mq('only screen and (min-width: '+breakpoint+'px)');}
else{return false;}};NPR.Devices.isScreenWithin=function(breakpoint){if(breakpoint){return Modernizr.mq('only screen and (min-width: '+breakpoint.MIN+'px) and (max-width: '+breakpoint.MAX+'px)');}
return false;};
$(document).ready(function(){try{var loginElm=$('a[href$="login.php"]');if(loginElm.length>0){var loginUrl=loginElm.attr('href');var returnUrl=encodeURIComponent(window.location);loginUrl=loginUrl+"?returnUrl="+returnUrl;loginElm.attr('href',loginUrl);}}
catch(e){}});
AddNamespace('NPR.disqus');(function($){var DataModel,__filename='api.js',threads={},users={};DataModel=function(options){var type,_options={type:'GET',el:null,base_url:'https://disqus.com/api/3.0/',data_type:'jsonp',event:'',data:{api_key:'tIbSzEhGBE9NIptbnQWn4wy1gZ546CsQ2IHHtxJiYAceyyPoAkDkVnQfCifmCaQW'}};this.options=$.extend(true,{},_options,options);type=this.options.event.split('.');this.url=this.options.base_url+type[0]+'/'+type[1]+'.'+this.options.data_type;}
DataModel.prototype={getData:function(){$.ajax({type:this.options.type,cache:true,url:this.url,context:this,data:this.options.data,timeout:30000,success:this.onSuccess,error:this.onError,dataType:this.options.data_type});},onSuccess:function(data){$(this.options.el).trigger(this.options.event+'.success',data);},onError:function(jqXHR,textStatus,errorThrown){if(NPR.metrics){NPR.metrics.event({network:'NPR Site',category:'Disqus',action:'API Error',label:this.options.event});}
$(this.options.el).trigger(this.options.event+'.error');}};threads=NPR.disqus.threads={details:function(opts){if(typeof opts==='undefined'&&typeof opts!=='object')return{};var data={},model;this.event='threads.details';try{if(opts.id){data['thread:ident']=opts.id;data.forum=opts.forum;}
if(opts.el){model=new DataModel({event:'threads.details',el:opts.el,data:data,type:'GET'});model.getData();}}catch(e){NPR.messaging.exception(e,__filename,'threads.details',NPR.messaging.constants.EVENT_JS_ERROR);}},postCount:function(el,storyId,forum){var element=el;try{threads.details({el:el,id:storyId,forum:forum});$(el).bind('threads.details.success',function(e,data){$(el).trigger('threads.postCount.success',data.response.posts);});}catch(e){NPR.messaging.exception(e,__filename,this.event,NPR.messaging.constants.EVENT_JS_ERROR);}},vote:function(el,storyId){var data={},model;try{data.thread=storyId;if(typeof el!=='undefined'){model=new DataModel({event:'threads.vote',el:el,data:data,type:'POST'});model.getData();}}catch(e){NPR.messaging.exception(e,__filename,this.event,NPR.messaging.constants.EVENT_JS_ERROR);}}};users=NPR.disqus.users={listActivity:function(opts){try{var data={'user:remote':'npr-'+opts.id,'limit':10,'since':opts.since,'include':['user']},model;model=new DataModel({el:opts.el,data:data,event:'users.listActivity'});model.getData();}catch(e){NPR.messaging.exception(e,__filename,this.event,NPR.messaging.constants.EVENT_JS_ERROR);}},details:function(el,id){var data={'user:remote':'npr-'+id},model=new DataModel({el:el,data:data,event:'users.details'});model.getData();}};})(jQuery);
(function($){var defaults={comments:10};var since,activityElement;var methods={extend:function(options,element){methods.element=element;methods.options=$.extend(true,{},defaults,options);},init:function(options){methods.extend(options,this);return methods.element.each(function(){});},activity:function(options){methods.extend(options,this);return methods.element.each(function(){var curElem=this;var userId=methods.element.data('persona');methods._showLoadingComments();$(curElem).bind('users.listActivity.error',function(){methods._hideLoadingComments(false);});methods._bindOnSuccess(curElem,'users.listActivity',function(e,data){methods._displayActivity(curElem,data);});NPR.disqus.users.listActivity({el:curElem,id:userId,since:since});});},moreActivity:function(){return this.each(function(){$(this).on('click',function(){if(since&&activityElement){$(activityElement).disqus('activity');}})});},details:function(options){methods.extend(options,this);return methods.element.each(function(){var curElem=this,userId=$(curElem).data('persona');$(curElem).bind('users.details.success',function(e,data){$(curElem).attr('src',data.response.avatar.cache);});NPR.disqus.users.details(curElem,userId);});},comments:function(options){methods.extend(options,this);return methods.element.each(function(){var el=this,storyId=$(this).data('storyid'),forum=$(this).data('shortname');$(el).bind('threads.postCount.success',function(e,data){var pluralization="";if(data.toString()==="0"){pluralization="no-comments";}else if(data.toString()==="1"){pluralization="one-comment";}else{pluralization="multiple-comments";}
if(typeof data==="number"||typeof data==="string"){$(el).addClass(pluralization).find('span.count').text(data);}});NPR.disqus.threads.postCount(el,storyId,forum);});},reloadCookie:function(options){methods.extend(options,this);return methods.element.each(function(){var el=this;NPR.disqus.reset(function(){NPR.disqus.reload();NPR.util.cookie.reset(function(){$('.avatar-form img').disqus('setAvatar');});});});},setAvatar:function(options){methods.extend(options,this);return methods.element.each(function(){var el=this;$(el).attr('src',NPR.util.cookie.getKey('da'));})},_bindOnSuccess:function(el,eventType,callback){$(el).bind(eventType+'.success',callback);},_displayActivity:function(element,data){var posts=$(element).find('.posts').first(),showMoreLink=true;if(data.cursor.hasNext===true){since=parseISO8601(data.response[data.response.length-1].createdAt).getTime()/1000;}else{since=undefined;showMoreLink=false;}
methods._hideLoadingComments(showMoreLink);activityElement=element;$.each(data.response,function(k,v){var post=$('<div>').appendTo(posts);var title=$('<div>').addClass('title').append($('<span>').text('Comment on: ')).appendTo(post);$('<a>').addClass('storylink').attr('href',v.object.url).text(v.object.thread.title).appendTo(title);$('<div>').addClass('datetime').text('Posted ').append(v.createdAt).appendTo(post);$('<div>').addClass('message').html(v.object.message).appendTo(post);});},_showLoadingComments:function(){$('.comment-activity .show-more button').hide();$('.comment-activity .show-more .loading').show();},_hideLoadingComments:function(showMoreLink){if(showMoreLink!==false){$('.comment-activity .show-more button').show();}
$('.comment-activity .show-more .loading').hide();}};$.fn.disqus=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.infinite');}};function parseISO8601(a,l){var d=a.split("T"),b=d[0].split("-"),f=d[1].split(":"),d=Number(b[0]),g=Number(b[1]-1),b=Number(b[2]),h=Number(f[0]),i=Number(f[1]),f=Number(f[2])||0;return l?new Date(d,g,b,h,i,f):new Date(Date.UTC(d,g,b,h,i,f));}})(jQuery);
AddNamespace('NPR.disqus');var disqus_shortname,disqus_identifier,disqus_url,disqus_config;(function($){var _methods={init:function(){var disqusData=_methods.getDisqusData();if(typeof disqusData.timestamp!=='undefined'){var expiration=3600;var ts=new Date(disqusData.timestamp*1000);var now=new Date();var diff=Math.ceil((now-ts)/1000);if(diff>expiration){methods.reset(methods.renderIframe);return;}}
methods.renderIframe();},getDisqusData:function(){var disqusData={};disqusData.userId=NPR.util.cookie.getKey('u');disqusData.hmac=NPR.util.cookie.getKey('dh');disqusData.message=NPR.util.cookie.getKey('dm');disqusData.timestamp=NPR.util.cookie.getKey('dt');return disqusData;},setDisqusConfig:function(){var disqusData=_methods.getDisqusData();if(typeof disqusData.timestamp!=='undefined'){$('#login-overlay-link').hide();disqus_config=function(){this.page.remote_auth_s3=disqusData.message+' '+disqusData.hmac+' '+disqusData.timestamp;this.page.api_key='K5ANvxVxS7meX7au7vJpUpqIgFqQcDBEH8q39Z8N750SFmBhaOLTsShueMWid956';this.callback.onNewComment=[function(){NPR.metrics.newComment();}];}}},setDisqusGlobals:function(){disqus_shortname=$('#disqus-npr').data('shortname');disqus_identifier=$('#disqus-npr').data('identifier');disqus_url=$('#disqus-npr').data('url');disqus_title=$('#disqus-npr').data('title');}},methods={renderIframe:function(){if(typeof NPR.responsivePage!=='undefined'){if(NPR.responsivePage.renderMobileDisqus===false&&(NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.MEDIUM)||$('html').hasClass('lt-ie9'))){return;}
else{NPR.responsivePage.registerCommentsActive();NPR.responsivePage.renderMobileDisqus=true;}}
_methods.setDisqusGlobals();_methods.setDisqusConfig();if($('#disqus-npr').length){var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='http://'+disqus_shortname+'.disqus.com/embed.js';(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);}},reload:function(){_methods.setDisqusConfig();if(typeof DISQUS!=='undefined'){DISQUS.reset({reload:true,config:disqus_config})}},reset:function(callback){$.get('/templates/community/renewCookie.php',{t:(new Date()).getTime()},function(d){callback();});}};$.extend(true,NPR.disqus,methods);$(document).ready(_methods.init);})(jQuery);
AddNamespace("NPR.community");NPR.community.userCookie='at';NPR.community.handleAccountBanner=function(pElm){try{var cookie=NPR.util.cookie.full();if(typeof cookie!=="undefined"){var showProfileLink=false;if('tier'in cookie){showProfileLink=true;}
if('u'in cookie&&'a'in cookie){if(showProfileLink){displayName='<a href="/templates/community/persona.php?uid='+cookie.u+'" data-metrics=\'{action:"Click Profile Link",label:"Account",category:"Global Navigation"}\'>'+cookie.a+'</a>';}else{displayName='<a href="/templates/reg/manage-account.php?tab=your_account&uid=='+cookie.u+'" data-metrics=\'{action:"Click Profile Link",label:"Account",category:"Global Navigation"}\'>'+cookie.a+'</a>';}
$('.loggedOut','#loginPElm, #loginSidebar').hide();$('#userLogin, #userLoginSidebar').html(displayName);$('.loggedIn','#loginPElm, #loginSidebar').show();}
else{$('.loggedOut','#loginPElm, #loginSidebar').show();$('.loggedIn','#loginPElm, #loginSidebar').hide();}}
else{$('.loggedOut','#loginPElm, #loginSidebar').show();$('.loggedIn','#loginPElm, #loginSidebar').hide();}}catch(e){NPR.messaging.exception(e,'no extra debug','NPR.community.handleAccountBanner for events',NPR.messaging.constants.EVENT_JS_ERROR);}};$(document).ready(function(){NPR.community.handleAccountBanner();});
(function($){try{var cookieValue=document.cookie;var stationFind=cookieValue.indexOf("station=");if(stationFind>-1){semiFind=cookieValue.indexOf(";",stationFind);if(semiFind==-1){semiFind=cookieValue.length;}
var stationCallLetters=cookieValue.substring(stationFind+8,semiFind-3);var displayStation='<a href="/templates/stations/stations/?q='+stationCallLetters+'">'+stationCallLetters+'</a>';$('li.stations').html(displayStation);}}catch(e){NPR.messaging.exception(e,'station_minimal.js','station_minimal',NPR.messaging.constants.JAVASCRIPT_GENERAL_ISSUE);}})(jQuery);
AddNamespace("NPR.community");NPR.community.getBaseUrl=function(){try{var strHref=window.location.href;if(strHref.indexOf("?")>-1){return strHref.slice(0,strHref.indexOf("?"));}
return strHref;}catch(e){NPR.messaging.exception(e,'no debug data','NPR.community.getBaseUrl',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};NPR.community.redrawAccountBanner=function(){try{if(typeof NPR.community.drawAccountBanner==="function"){var pElm=document.getElementById('loginPElm');NPR.community.drawAccountBanner(pElm);}else if(typeof NPR.community.handleAccountBanner==="function"){NPR.community.handleAccountBanner();}}catch(e){NPR.messaging.exception(e,' in story.js','NPR.community.redrawAccountBanner',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};
$(document).ready(function(){try{$('.comment-count').disqus('comments');}catch(e){NPR.messaging.exception(e,'NPR.serverVars.storyId = '+NPR.serverVars.storyId,'doc.ready in story.js',NPR.messaging.constants.COMMUNITY_JS_ERROR);}});
$(document).ready(function(){$(".bookedition a.purchase").click(function(){$(".ecommercepop").hide();renderAdCountHtmlForEcommerce();var $parent=$(this).parent();var $popup=$parent.siblings('div.ecommercepop');$popup.show();if($('body').hasClass('blog')){centerEcommercePop($popup);}
return false;});$(".ecommercepop a.close").click(function(){$(".ecommercepop").hide();return false;});$("a.buylink1").click(function(){return false;});$("a.buyLink3").click(function(){return false;});$(".playlistitem a.purchase").click(function(){$(".ecommercepop").hide();renderAdCountHtmlForEcommerce();var $targetPopup=$(this).parents(".bucketblock").children(".ecommercepop");$targetPopup.show();if($('body').hasClass('blog')){centerEcommercePop($targetPopup);}});$(".ecommerce a.purchase, .ecommerce a.purchasepl").click(function(){$(".ecommercepop").hide();renderAdCountHtmlForEcommerce();$(this).parents(".ecommerce").children(".ecommercepop").show();});$(".primary a.purchase, .secondary a.purchase").click(function(){$(".ecommercepop").hide();renderAdCountHtmlForEcommerce();$(this).parents(".bucketwrap").children(".ecommercepop").show();});$(".ecommercepop a.close").click(function(){$(".ecommercepop").hide();});});var currentOpenDiv=null;function toggleEcommerceDiv(uniqueId,index,title,type)
{var ecommerceDiv=document.getElementById("ecommerceDiv"+uniqueId+'_'+index);if(ecommerceDiv!=null)
{if(currentOpenDiv!=null&&currentOpenDiv!=ecommerceDiv)
{currentOpenDiv.className=currentOpenDiv.className.replace("openDiv","closeDiv");}
if(ecommerceDiv.className.indexOf("closeDiv")!=-1)
{ecommerceDiv.className=ecommerceDiv.className.replace("closeDiv","openDiv");currentOpenDiv=ecommerceDiv;}
else
{ecommerceDiv.className=ecommerceDiv.className.replace("openDiv","closeDiv");currentOpenDiv=null;}}}
function renderAdCountHtmlForEcommerce()
{try{var adCountHtml;var zone;var ecommerceId=$('#ecommerceId').val()
var anchorTarget;var imageSrc;var testServer="";var generateHtml=false;var ord=Math.random()*10000000000000000;if(NPR.ServerConstants.dfpUsetestserver=="1"){testServer=';testserver=true';}
if(ecommerceId=="3"||ecommerceId=="1"){if(ecommerceId=="3"){zone="bsg_bookbuyers";}else{zone="bsg_buymusic";}
anchorTarget='http://'+NPR.ServerConstants.dfpServer+'/jump/'+
NPR.ServerConstants.dfpNetwork+'.'+NPR.ServerConstants.dfpSite+'/'+zone+testServer+';sz=1x1;ord='+ord+'?';imageSrc='http://'+NPR.ServerConstants.dfpServer+'/ad/'+
NPR.ServerConstants.dfpNetwork+'.'+NPR.ServerConstants.dfpSite+'/'+zone+testServer+';sz=1x1;ord='+ord+'?';adCountHtml='<a href="'+anchorTarget+'" target="_blank"><img alt="" src="'+imageSrc+'" border="0" alt=""/></a>';$('body').append(adCountHtml);}}catch(e){NPR.messaging.exception(e,'renderAdCountHtmlForEcommerce',NPR.messaging.constants.SPONSORSHIP_ERROR);}}
function centerEcommercePop($targetPopup){var topOffset=-($targetPopup.height()/2);var leftOffset=-($targetPopup.width()/2);$('.ecommercepop').css({marginTop:topOffset,marginLeft:leftOffset});}
$(document).ready(function(){$('.podicon').click(function(){try{$('.podbox').hide();$('.feed ul li').css("z-index","0");$(this).parent('li').css("z-index","90");$(this).siblings('.podbox').show();return false;}
catch(e){NPR.messaging.exception(e,'podicon onclick','rsspodcast.js',NPR.messaging.constants.RSS_PODCAST_JS_ERROR);}});$('.closethis').click(function(){try{$('.podbox').hide();return false;}
catch(e){NPR.messaging.exception(e,'closethis onclick','rsspodcast.js',NPR.messaging.constants.RSS_PODCAST_JS_ERROR);}});$('.subitunes').click(function(){try{$('.podbox').hide();}
catch(e){NPR.messaging.exception(e,'subitunes onclick','rsspodcast.js',NPR.messaging.constants.RSS_PODCAST_JS_ERROR);}});$('.podurl').focus(function(){try{if(this.value==this.defaultValue){this.select();}}
catch(e){NPR.messaging.exception(e,'podurl focus','rsspodcast.js',NPR.messaging.constants.RSS_PODCAST_JS_ERROR);}});});
AddNamespace("NPR.responsivePage");$(function(){NPR.responsivePage.initSharing();});NPR.responsivePage.initSharing=function(){$("li.share a").click(function(event){NPR.responsivePage.toggleSharing();event.preventDefault();if($(this).parent().hasClass('email')===true){location.href=$(this).attr('href');}});}
NPR.responsivePage.toggleSharing=function(){if(NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.SMALL)){NPR.responsivePage.toggleMobileSharing();}
$('.social .share').toggleClass('expanded');}
NPR.responsivePage.toggleMobileSharing=function(){if($('article .social .share').hasClass('expanded')){$('.social.shareModal').remove();}else{$('body').prepend('<ul class="social shareModal"></ul>');$('.share').clone().prependTo('.social.shareModal');$(".shareModal li.share a.sharemaintab").click(function(event){NPR.responsivePage.toggleSharing();event.preventDefault();});}}
AddNamespace("NPR.twitter");NPR.twitter.updateList=function(twitters){var statusHTML=[];try{if(twitters.length>0){var divName="twitter_list_"+twitters[0].user.screen_name;for(var i=0;i<twitters.length;i++){var username=twitters[i].user.screen_name;var status=twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g,function(url){return'<a href="'+url+'">'+url+'</a>';}).replace(/\B@([_a-z0-9]+)/ig,function(reply){return reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';});statusHTML.push('<li><span class="tweet">'+status+'</span> <a class="timestamp" href="http://twitter.com/'+username+'/statuses/'+twitters[i].id+'">'+NPR.twitter.relative_time(twitters[i].created_at)+'</a></li>');}
document.getElementById(divName).innerHTML=statusHTML.join('');}}catch(e){NPR.messaging.exception(e,'updating: '+divName,'NPR.twitter.updateList',NPR.messaging.constants.JAVASCRIPT_GENERAL_ISSUE);}}
NPR.twitter.relative_time=function(time_value){try{var values=time_value.split(" ");time_value=values[1]+" "+values[2]+", "+values[5]+" "+values[3];var parsed_date=Date.parse(time_value);var relative_to=(arguments.length>1)?arguments[1]:new Date();var delta=parseInt((relative_to.getTime()-parsed_date)/1000);delta=delta+(relative_to.getTimezoneOffset()*60);if(delta<60){return'less than a minute ago';}else if(delta<120){return'about a minute ago';}else if(delta<(60*60)){return(parseInt(delta/60)).toString()+' minutes ago';}else if(delta<(120*60)){return'about an hour ago';}else if(delta<(24*60*60)){return'about '+(parseInt(delta/3600)).toString()+' hours ago';}else if(delta<(48*60*60)){return'1 day ago';}else{return(parseInt(delta/86400)).toString()+' days ago';}}catch(e){NPR.messaging.exception(e,'time_value: '+time_value,'NPR.twitter.relative_time',NPR.messaging.constants.JAVASCRIPT_GENERAL_ISSUE);}}
AddNamespace("NPR.more");$(document).ready(function(){try{if(typeof NPR.serverVars!=='undefined'&&typeof NPR.serverVars.storyId!=='undefined'){$('#relatedstories article#story'+NPR.serverVars.storyId).not('.last').each(function(){$(this).hide();$('#relatedstories article.last').show();});}}catch(e){NPR.messaging.exception(e,' in more.js ','NPR.more.docReady',NPR.messaging.constants.JAVASCRIPT_GENERAL_ISSUE);}});
AddNamespace('NPR.socialMedia');$(document).ready(function(){var po=document.createElement('script');po.type='text/javascript';po.async=true;po.src='http://apis.google.com/js/plusone.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(po,s);});NPR.socialMedia.openTwitterLoginWindow=function(url){try{var newwindow=window.open(url,'twitterAuthentication','height=400,width=800,location=yes');if(!newwindow){alert('We have detected that you are using popup blocking software. Please add www.npr.org to your safe list to be able to authenticate with Twitter and tweet this story. Thank you.');}
if(window.focus){newwindow.focus()}
return false;}catch(e){NPR.messaging.exception(e,'shareOnSocialMedia.js (NPR.socialMedia.openTwitterLoginWindow)','NPR.socialMedia',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};NPR.socialMedia.shareOnTwitter=function(storyId,useParen){try{var station='',pageUrl,url,twitterSource='';if(NPR.Event){station=NPR.Event.getQuerystring('station');}
pageUrl=(station)?station:$('#modelShortUrl'+storyId).attr('value');if(NPR.socialMedia.twitterSource===undefined||NPR.socialMedia.twitterSource===''){twitterSource='@npr'+$('body').attr('id');}
else{twitterSource=NPR.socialMedia.twitterSource;}
url='http://twitter.com/share?url='+pageUrl+'&text='+'Via '+twitterSource+': '
+encodeURIComponent($('#title'+storyId).attr('value'));NPR.socialMedia.openTwitterLoginWindow(url);NPR.socialMedia.updateShareCount('twitter',storyId,useParen);}catch(e){NPR.messaging.exception(e,'shareOnSocialMedia.js (NPR.socialMedia.shareOnTwitter)','NPR.socialMedia',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};NPR.socialMedia.openFacebookLoginWindow=function(url){try{var newwindow=window.open(url,'sharer','toolbar=0,status=0,width=580,height=400');if(!newwindow){alert('We have detected that you are using popup blocking software. Please add www.npr.org to your safe list to be able to authenticate with Facebook and share this story. Thank you.');}
if(window.focus){newwindow.focus()}
return false;}catch(e){NPR.messaging.exception(e,'shareOnSocialMedia.js (NPR.socialMedia.openFacebookLoginWindow)','NPR.socialMedia',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};NPR.socialMedia.shareOnFacebook=function(storyId,useParen){try{var station='',pageUrl,url;if(NPR.Event){station=NPR.Event.getQuerystring('station');}
pageUrl=(station)?station:$('#modelFullUrl'+storyId).attr('value');url='http://www.facebook.com/dialog/feed?link='
+encodeURIComponent(pageUrl)+'&display=popup&app_id='+NPR.serverVars.facebookAppId
+'&redirect_uri='+encodeURIComponent(NPR.serverVars.closeurl);NPR.socialMedia.openFacebookLoginWindow(url);NPR.socialMedia.updateShareCount('facebook',storyId,useParen);}catch(e){NPR.messaging.exception(e,'shareOnSocialMedia.js (NPR.socialMedia.shareOnFacebook)','NPR.socialMedia',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};NPR.socialMedia.updateShareCount=function(mediaName,storyId,useParen){try{var urlParams='media='+mediaName+'&id='+storyId;var postToFeedURL='/templates/socialmedia/count/updateSocialMediaShareCount.php';var rightParen='';var leftParen='';if(useParen===undefined||useParen===''||useParen===true){rightParen=' (';leftParen=')';}
$.ajax({data:urlParams,url:postToFeedURL,success:function(data){var count=parseInt(data,10);if(!isNaN(count)){$('.'+mediaName+'Count').html(rightParen+data+leftParen);}}});}catch(e){NPR.messaging.exception(e,'shareOnSocialMedia.js (NPR.socialMedia.updateShareCount)','NPR.socialMedia',NPR.messaging.constants.COMMUNITY_JS_ERROR);}};
AddNamespace("NPR.responsivePage");NPR.responsivePage.trackWidth=0;NPR.responsivePage.ieEightCheck=($.browser.msie===true);NPR.responsivePage.renderMobileDisqus=false;$(document).ready(function(){NPR.responsivePage.initContentHeader();NPR.responsivePage.initGlobalFooter();NPR.responsivePage.initializeContentFooter();NPR.responsivePage.initSearchToggle();NPR.responsivePage.initCommentToggle();NPR.responsivePage.initAudioHover();NPR.responsivePage.initEcommercePop();NPR.responsivePage.initFooterLinks();NPR.responsivePage.trackWidth=$(window).width();NPR.responsivePage.initOffCanvasEvents();NPR.responsivePage.positionShareToolsAnd88ad();if((NPR.Devices.isScreenLargerOrEqual(NPR.BREAKPOINT.LARGE)===true||NPR.Devices.isScreenWithin(NPR.BREAKPOINT.MEDIUM_WITH_AD))&&(!$('body').hasClass('agg')&&!$('body').hasClass('multimedia'))){NPR.responsivePage.positionEggCarton();}
if($('body').hasClass('agg')){NPR.responsivePage.initSeriesCarousel();}
if($('body#music').length>0){NPR.responsivePage.initMusicHeaderSubnavs();}
if($('body#books').length>0){NPR.responsivePage.initBookHeaderSubnavs();}
if($('body#about').length>0){NPR.responsivePage.initAboutHeaderSubnavs();}
if($('body').hasClass('tmplSearch')){$('#filter-results').click(function(e){$(this).toggleClass('open');$('.searchRefine').slideToggle('fast');e.preventDefault();});}
$('.enlargebtn').click(function(){try{var enlargementImg=$('div.enlarge_measure img',$(this).parents('.bucketwrap'));if(typeof $(enlargementImg).attr('src')==='undefined'){$(enlargementImg).bind('load',function(){if(typeof $(enlargementImg).attr('src')==='undefined'){$(enlargementImg).attr('src',$(enlargementImg).data('original'));}
NPR.responsivePage.openEnlargment($(this));}).attr("src",$(enlargementImg).data('original'));}else{NPR.responsivePage.openEnlargment($(this));}}
catch(e){NPR.messaging.exception(e,'responsive_page.js','NPR.responsivePage. enlargebtn click');}
return false;});try{$('.bucketwrap.statichtml').fitVids();}catch(e){}
$('.contentheader nav .toggle').toggle(function(){$(this).addClass('active');$(this).parent().next('ul').slideDown();},function(){$(this).removeClass('active');$(this).parent().next('ul').slideUp();});if(window.location.hash.indexOf('#comment')===0){NPR.responsivePage.openComments();}});$(window).resize(function(){NPR.responsivePage.checkContentFooter();NPR.responsivePage.positionShareToolsAnd88ad();if(!$('body').hasClass('agg')&&!$('body').hasClass('multimedia')){NPR.responsivePage.positionEggCarton();NPR.responsivePage.stickyEggCarton();}});$(window).scroll(function(){NPR.responsivePage.stickyEggCarton();});NPR.responsivePage.initMusicHeaderSubnavs=function(){try{var musicHeaderHoverConfig={over:NPR.responsivePage.musicHeaderSubnavShow,timeout:0,out:NPR.responsivePage.musicHeaderSubnavHide,interval:50};$('#globalheader .genres, #globalheader .programs, #globalheader .reviews').hoverIntent(musicHeaderHoverConfig);}
catch(e){NPR.messaging.exception(e,'responsive_page.js','NPR.responsivePage.initMusicHeaderSubnavs');}};NPR.responsivePage.musicHeaderSubnavShow=function(){$(this).children('ul').fadeIn(300);};NPR.responsivePage.musicHeaderSubnavHide=function(){$(this).children('ul').fadeOut();};NPR.responsivePage.initBookHeaderSubnavs=function(){try{var bookHeaderHoverConfig={over:NPR.responsivePage.bookHeaderSubnavShow,timeout:0,out:NPR.responsivePage.bookHeaderSubnavHide,interval:50};$('#globalheader .genres, #globalheader .programs, #globalheader .reviews').hoverIntent(bookHeaderHoverConfig);}
catch(e){NPR.messaging.exception(e,'responsive_page.js','NPR.responsivePage.initBooksHeaderSubnavs');}};NPR.responsivePage.bookHeaderSubnavShow=function(){$(this).children('.subnav').fadeIn(300);};NPR.responsivePage.bookHeaderSubnavHide=function(){$(this).children('.subnav').fadeOut();};NPR.responsivePage.initAboutHeaderSubnavs=function(){try{var aboutHeaderHoverConfig={over:NPR.responsivePage.aboutHeaderSubnavShow,timeout:0,out:NPR.responsivePage.aboutHeaderSubnavHide,interval:50};$('#globalheader .has-subnav').hoverIntent(aboutHeaderHoverConfig);}
catch(e){NPR.messaging.exception(e,'responsive_page.js','NPR.responsivePage.initAboutHeaderSubnavs');}};NPR.responsivePage.aboutHeaderSubnavShow=function(){$(this).children('.subnav').fadeIn(300);};NPR.responsivePage.aboutHeaderSubnavHide=function(){$(this).children('.subnav').fadeOut();};NPR.responsivePage.initGlobalFooter=function(){try{var globalFooterHoverConfig={over:NPR.responsivePage.globalFooterSubnavShow,timeout:0,out:NPR.responsivePage.globalFooterSubnavHide,interval:50};$('#nprfooter .primary > ul > li').hoverIntent(globalFooterHoverConfig);}
catch(e){NPR.messaging.exception(e,'responsive_page.js','NPR.responsivePage.initGlobalFooter');}};NPR.responsivePage.globalFooterSubnavShow=function(){$(this).children('ul').fadeIn(300);};NPR.responsivePage.globalFooterSubnavHide=function(){$(this).children('ul').fadeOut();};NPR.responsivePage.initContentHeader=function(){$(document).on('click','.contentheader .toggle',function(e){if($(this).hasClass('active')){$(this).parent().find('nav').slideUp();$(this).removeClass('active');}else{$(this).parent().find('nav').slideDown();$(this).addClass('active');}
return false;});};NPR.responsivePage.initializeContentFooter=function(){if(NPR.responsivePage.ieEightCheck||NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.SMALL)||$('body').hasClass('agg')){NPR.responsivePage.contentFooterToggled=true;$('#contentfooter .module > h3 a, .adwrapper.housead h3 a').toggle(function(){$(this).parent().next('div').slideDown();$(this).addClass('active');return false;},function(){$(this).parent().next('div').slideUp();$(this).removeClass('active');return false;});}else{NPR.responsivePage.contentFooterToggled=false;$('#contentfooter .module div, .adwrapper.housead div').css({'display':'','overflow':'visible'});$('#contentfooter .module > h3 a, .adwrapper.housead h3 a').on('click',function(){return false;});}};NPR.responsivePage.checkContentFooter=function(){if((NPR.responsivePage.ieEightCheck||$('body').hasClass('agg'))){return;}
if(NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.SMALL)&&!NPR.responsivePage.contentFooterToggled){$('#contentfooter .module > h3 a, .adwrapper.housead h3 a').toggle(function(){NPR.responsivePage.contentFooterToggled=true;$(this).parent().next('div').slideDown();return false;},function(){$(this).parent().next('div').slideUp();return false;});}else if(NPR.Devices.isScreenLargerOrEqual(NPR.BREAKPOINT.MEDIUM)&&NPR.responsivePage.contentFooterToggled){NPR.responsivePage.contentFooterToggled=false;$('#contentfooter .module div, .adwrapper.housead div').css({'display':'','overflow':'visible'});$('#contentfooter .module > h3 a, .adwrapper.housead h3 a').on('click',function(){return false;});}};NPR.responsivePage.initSeriesCarousel=function(){var carouselEl=$('.blog-featured-series .stories');if(NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.SMALL)){$(carouselEl).addClass('carousel').attr('data-transition','slide').attr('data-paginate','');}
$(window).resize(function(){if(NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.SMALL)){$(carouselEl).addClass('carousel').attr('data-transition','slide').attr('data-paginate','');if($('.carousel-nav').length===0){$(carouselEl).carousel();}}else{$(carouselEl).removeClass('carousel');$('.carousel-nav').remove();}});};NPR.responsivePage.registerCommentsActive=function(){$('.comment-head a').addClass('active');}
NPR.responsivePage.openComments=function(){NPR.responsivePage.registerCommentsActive();$('#disqus-npr').slideDown('slow');if(NPR.responsivePage.renderMobileDisqus===false){NPR.responsivePage.renderMobileDisqus=true;NPR.disqus.renderIframe();}};NPR.responsivePage.initCommentToggle=function(){var commentToggle=$('.comment-head a'),disqusModuleDiv=$('#disqus-npr'),socialToolsLink=$('.social a.comment-count'),commentBlockDiv=$('#commentBlock');var closeComments=function(){$(commentToggle).removeClass('active');$(disqusModuleDiv).slideUp('fast');};$(commentToggle).click(function(e){e.preventDefault();if($(this).hasClass('active')){closeComments();}else{NPR.responsivePage.openComments();}});$(socialToolsLink).click(function(e){e.preventDefault();$('html, body').animate({scrollTop:$(commentBlockDiv).offset().top},500);if(!$(commentToggle).hasClass('active')){NPR.responsivePage.openComments();}});};NPR.responsivePage.initSearchToggle=function(){$('.search-toggle').toggle(function(){$(this).prev('form').show();},function(){$(this).prev('form').hide();});};NPR.responsivePage.initAudioHover=function(){$('.listenicon, .listen h3 a').hover(function(){var $audioMod=$(this).parents('.bucketwrap');$audioMod.addClass('hover-for-audio');},function(){var $audioMod=$(this).parents('.bucketwrap');$audioMod.removeClass('hover-for-audio');});};NPR.responsivePage.openEnlargment=function(theImage){var content_div=$(theImage).parents('.bucketwrap').children('.enlarge_html');var measure_div=$(theImage).parents('.bucketwrap').children('.enlarge_measure');$('body').append('<div id="mediaEnlargeOverlay"><div id="mediaEnlargeFrame"><a href="#" class="close">Close</a></div></div>').addClass('mediaEnlarged');$('#mediaEnlargeFrame').append($(measure_div).html()+$(content_div).html());NPR.responsivePage.doPositionLightbox();$(window).resize(NPR.responsivePage.doPositionLightbox);$('#mediaEnlargeOverlay, #mediaEnlargeFrame img, #mediaEnlargeFrame .close').click(function(e){NPR.responsivePage.closeMediaEnlarge(e);});$(document).on('keyup.mediaEnlargement',function(e){if(e.keyCode===27){NPR.responsivePage.closeMediaEnlarge();}});}
NPR.responsivePage.doPositionLightbox=function(){var $mediaEnlargeFrame=$('#mediaEnlargeFrame');var viewportWidth=$(window).width();var viewportHeight=$(window).height();var lightboxWidth=viewportWidth*.8;var lightboxHeight=viewportHeight*.8;if(lightboxHeight<350){lightboxHeight=350;}
if(lightboxWidth>1000){lightboxWidth=1000;}
var leftOffset=(viewportWidth-lightboxWidth)/2;var topOffset=((viewportHeight-lightboxHeight)/2)+$(window).scrollTop();$mediaEnlargeFrame.css({width:lightboxWidth,height:lightboxHeight,top:topOffset,left:leftOffset});var imagedataHeight=$('#mediaEnlargeFrame .image_data').outerHeight()+parseInt($('#mediaEnlargeFrame .image_data').css('bottom'));var imgWrapHeight=$mediaEnlargeFrame.height()-imagedataHeight;$('#mediaEnlargeFrame .img_wrap').css({height:imgWrapHeight,lineHeight:imgWrapHeight+'px'});};NPR.responsivePage.closeMediaEnlarge=function(e){if(e!==undefined){e.preventDefault();}
$('body').removeClass('mediaEnlarged');$('#mediaEnlargeOverlay').remove();$(document).off('keyup.mediaEnlargement');};NPR.responsivePage.initEcommercePop=function(){$('#storyEcommerce .purchase > a').click(function(e){$('#storyEcommerce .purchase').not($(this).parent()).removeClass('selected');$(this).parent().toggleClass('selected');e.preventDefault();});};NPR.responsivePage.initOffCanvasEvents=function(){if($('.sidebarButton').length>0){$('.sidebarButton').on('click',function(e){e.preventDefault();$('body').toggleClass('active');if($('body').hasClass('active')){$('.social').fadeOut(250);}
else{$('.social').fadeIn(500);}});}
if(Modernizr.touch){$('section[role="main"]').on('click',function(e){if($(e.target).parent().is('.sidebarButton')){return;}
if($('body').hasClass('active')){$('body').removeClass('active');}});}
$(window).resize(function(){if($(window).width()!==NPR.responsivePage.trackWidth){$('body').removeClass('active');NPR.responsivePage.trackWidth=$(window).width();}});};NPR.responsivePage.positionEggCarton=function(){if(NPR.Devices.isScreenLargerOrEqual(NPR.BREAKPOINT.LARGE)===true&&$('.story #resMore').length>0){$("#resMore").appendTo("#main_sidebar");return;}
else if((NPR.Devices.isScreenWithin(NPR.BREAKPOINT.MEDIUM_WITH_AD)===true&&$('html').hasClass('no-touch'))&&$('.story #resMore').length>0){$("#resMore").appendTo("#main_sidebar");return;}
else if((NPR.Devices.isScreenSmallerOrEqual(NPR.BREAKPOINT.MEDIUM)===true&&NPR.Devices.isScreenWithin(NPR.BREAKPOINT.MEDIUM_WITH_AD)===false)&&$('#main_sidebar #resMore').length>0&&$('.story #resMore').length===0){$('#main_sidebar #resMore').detach().insertAfter('.story .social');return;}
if($('html').hasClass('lt-ie9')&&$('.story #resMore').length>0){$("#resMore").appendTo("#main_sidebar");return;}};NPR.responsivePage.stickyEggCarton=function(){if($('.adwrapper.sidebarad').length>0){var windowTop=$(window).scrollTop();var sidebarAd=$('.adwrapper.sidebarad');var sidebarAdOffset=sidebarAd.offset().top+sidebarAd.outerHeight()+22;if(windowTop>=sidebarAdOffset&&(NPR.Devices.isScreenLargerOrEqual(NPR.BREAKPOINT.LARGE)===true||NPR.Devices.isScreenWithin(NPR.BREAKPOINT.MEDIUM_WITH_AD)===true)){$('#relatedstorieswrap').addClass('sticky',"stopped");}else{$('#relatedstorieswrap').removeClass('sticky').removeClass('stopped').css('top','');}}};NPR.responsivePage.positionShareToolsAnd88ad=function(){if(!$('body').hasClass('agg')&&!$('html').hasClass('lt-ie9')&&!$('body').hasClass('multimedia')){var $widgetsToMove=$('.story .social, #ad_impression_88_wrap');if(NPR.Devices.isScreenLargerOrEqual(1448)===true){var contentWidth=$('#wrapper').width();var viewportWidth=$(window).width();var nonContentSpace=viewportWidth-contentWidth;var amountToOffset=(nonContentSpace/2)+$('#main_sidebar').width()+2;$widgetsToMove.css('right',amountToOffset);}else{$widgetsToMove.css('right','');}}};NPR.responsivePage.initFooterLinks=function(){if($('html').hasClass('touch')){$('#footerContact a').attr('href','http://help.npr.org/npr/wf/m/index.aspx');}};
(function($){$.fn.fitVids=function(options){var settings={customSelector:null}
var div=document.createElement('div'),ref=document.getElementsByTagName('base')[0]||document.getElementsByTagName('script')[0];div.className='fit-vids-style';div.innerHTML='&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';ref.parentNode.insertBefore(div,ref);if(options){$.extend(settings,options);}
return this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='www.youtube.com']","iframe[src*='www.kickstarter.com']","object","embed"];if(settings.customSelector){selectors.push(settings.customSelector);}
var $allVideos=$(this).find(selectors.join(','));$allVideos.each(function(){var $this=$(this);if(this.tagName.toLowerCase()=='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return;}
var height=(this.tagName.toLowerCase()=='object'||$this.attr('height'))?$this.attr('height'):$this.height(),width=$this.attr('width')?$this.attr('width'):$this.width(),aspectRatio=height/width;if(!$this.attr('id')){var videoID='fitvid'+Math.floor(Math.random()*999999);$this.attr('id',videoID);}
$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+"%");$this.removeAttr('height').removeAttr('width');});});}})(jQuery);
AddNamespace('NPR.enhancements');NPR.enhancements.testIE8OrLess=function(){if(navigator.appName=='Microsoft Internet Explorer')
{var rv=false;var ua=navigator.userAgent;var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");if(re.exec(ua)!=null){rv=parseFloat(RegExp.$1);}
if(rv!==false){if(rv<=8.0){return true;}}}
return false;}
NPR.enhancements.testHtml5Audio=function(){var start=navigator.userAgent.indexOf("Android ");if(start>=0){var majorversion=parseInt(navigator.userAgent.substr(start+8,1));if(!isNaN(majorversion)&&parseInt(majorversion)<3){return true;}}
return!(Modernizr.audio.mp3);}
NPR.enhancements.testHtml5Video=function(element){var start=navigator.userAgent.indexOf("Android ");if(start>=0){var majorversion=parseInt(navigator.userAgent.substr(start+8,1));if(!isNaN(majorversion)&&parseInt(majorversion)<3){return true;}}
var video=element.find('video').first();if(typeof video.get(0)==='undefined'){return true;}
video=video.attr('src').split('.').pop();if(video==='mp4'){video='h264';}
return!(Modernizr.video[video]);}
NPR.enhancements.hideComments=function(){$('div.social ul li.comments').hide();}
NPR.enhancements.showAudioPlaceholder=function($this){$this.html('<div class="enhance-replace audio resaudio">'+'<div class="listenicon">'+'<span class="disabled"></span>'+'</div>'+'<div class="avcontent listen">'+'<h3>Audio Unavailable</h3>'+'<p>Try one of our other <a href="/listen">listening options</a></p>'+'</div>'+'</div>').show();}
NPR.enhancements.showInlineVideoPlaceholder=function($this){$this.html('<div class="enhance-replace video resvideo">'+'<div class="videoicon">'+'<span class="disabled"></span>'+'</div>'+'<div class="avcontent video">'+'<h3>Video Unavailable</h3>'+'</div>'+'</div>').show();}
NPR.enhancements.bindEnhancements=function(){if(NPR.Devices.isOnPhone()===true||NPR.Devices.isOnTablet()===true){$('.resaudio').enhance({testMethod:NPR.enhancements.testHtml5Audio,resultMethod:NPR.enhancements.showAudioPlaceholder});$('.video-popup').enhance({testMethod:NPR.enhancements.testHtml5Video,resultMethod:NPR.enhancements.showInlineVideoPlaceholder});}}
$(document).ready(NPR.enhancements.bindEnhancements);;(function($){$(function(){if(NPR.Devices.isScreenLargerOrEqual(NPR.BREAKPOINT.MEDIUM)===true)
{var cachebust=(Math.random()+"").substr(2);var protocol="https:"==document.location.protocol?'https:':'http:';new Image().src=protocol+"//20501671p.rfihub.com/ca.gif?rb=3035&ca=20501671&ra="+cachebust;}});})(jQuery);