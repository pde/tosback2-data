var popmeback=undefined;var mypop;var poped=0;function createCookie(b,e,f){var d=60*60*1000*f;var a=new Date();a.setTime(a.getTime()+(d));var c="; expires="+a.toGMTString();document.cookie=b+"="+e+c+"; path=/"}
function getCookie(a){var b=document.cookie.match("(^|;) ?"+a+"=([^;]*)(;|$)");if(b){return(unescape(b[2]))}else{return null}}
var cokieLifeTime=24;var popunderUrl=null;var popunderWidth=800;var popunderHeight=600;function popunder(ignorecookie){if((!ignorecookie&&getCookie("popunder")==1)||!popunderUrl||poped==1){return true;}
poped=1;createCookie("popunder",1,cokieLifeTime);var b="toolbar=0,statusbar=1,resizable=1,scrollbars=0,menubar=0,location=1,directories=0";if(navigator.userAgent.indexOf("Chrome")!=-1){b="scrollbar=yes"}
var win=window.open("about:blank","",b+",height="+popunderHeight+",width="+popunderWidth+",saveHistory=true");var regex=new RegExp(/rv:[2-9]/);if(regex.exec(navigator.userAgent)){win.windowPop=function(c){if(regex.exec(navigator.userAgent)){this.window.open("about:blank").close()}
this.document.location.href=c;this.parent.focus();};win.windowPop(popunderUrl)}else{win.document.location.href=popunderUrl}
setTimeout(function(){window.focus();},50);window.mainwindow=window.open('','mainwindow');window.mainwindow.focus();window.mainwindow.close();if(win){setTimeout(function(){positionpopunder(win);});}else{donepop=null;ifSP2=false;if(typeof(poppedWindow)=="undefined"){poppedWindow=false}
if(window.SymRealWinOpen){open=SymRealWinOpen}
if(window.NS_ActualOpen){open=NS_ActualOpen}
ifSP2=(navigator.userAgent.indexOf("SV1")!=-1);if(!ifSP2){openpopunder()}else{if(window.Event){document.captureEvents(Event.CLICK)}
document.onclick=doclickedpopunder}
self.focus();clickedpopunder()}
return true;}
function openpopunder(){if(!poppedWindow&&popunderUrl){donepop=open(popunderUrl,"",'_blank',"toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1");if(donepop){poppedWindow=true;self.focus();}}}
function positionpopunder(win){win.blur();win.moveTo(0,0);win.resizeTo(screen.availWidth,screen.availHeight);}
function clickedpopunder(){if(!poppedWindow&&popunderUrl){if(!ifSP2){donepop=open(popunderUrl,"",'_blank',"toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1");self.focus();if(donepop){poppedWindow=true;}}}
if(!poppedWindow){if(window.Event){document.captureEvents(Event.CLICK)}
document.onclick=openpopunder;self.focus()}}
function initpopunder(){document.body.onclick=function(){popunder()};var userAgent=navigator.userAgent;if((userAgent.indexOf("Chrome")!=-1)||(userAgent.indexOf("Safari")!=-1)){add_event_listener(window,'unload',popunder);}else{window.onbeforeunload=function(){popunder();};}}
function set_popunder_url(url){popunderUrl=url;}
function add_event_listener(elem,event,func){if(elem.addEventListener){elem.addEventListener(event,func,false);}else{elem.attachEvent('on'+event,func);}}
function MMOTrafficPopunder(affiliate_,creative_){if(getCookie("popunder")!=1){var url='http://json.mmotraffic.com/url/?affiliate_='+affiliate_+(creative_?'&creative_='+creative_:'')+'&func=set_popunder_url';add_event_listener(window,'load',function(){var script=document.createElement("SCRIPT");script.type="text/javascript";script.src=url;document.getElementsByTagName("body")[0].appendChild(script);});}}
add_event_listener(window,'load',initpopunder);