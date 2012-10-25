//<!--
//1@@m5

function ebHelpWebformLink(pStr)
{if(typeof(top.location.href)=="unknown")
return;if(top.cuLink)
outputContactUsLinks(true);else if(!top.fromInlineCU)
{var str='<a href="#" onclick=\'document.forms';str+='["InlineSelfHelpWebform"].submit();return false;\'>';str+=pStr+'</a>';document.write(str);}
top.cuLink=null;}
function popupWindow(mypage,target,w,h,scroll,no,pLeft,pTop,params)
{if(typeof(top.location.href)=="unknown")
return;if(target=="_self")
return false;LeftPosition=(screen.width)?(screen.width-w)/2:0;TopPosition=(screen.height)?(screen.height-h)/2:0;if(pLeft)
LeftPosition=pLeft;if(pTop)
TopPosition=pTop;settings='height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable='+no+'';top.win=window.open(mypage,target,settings+","+params);winPopped=true;return false;}
function ebIndiaPostLink(pLink)
{var s="",h='http://indiapost.org/',p='PostageCalculator.html';var cl=ebay.oGlobals.oClient;s+='<a href="'+h;if(cl&&(cl.bNav||cl.bFirefox))
s+='Netscape/';s+=p;s+='">'+pLink+'</a>';document.write(s);}

//2@@m12

var ebHelpFeatureRef="1",ebHelpFeatureName=null;var ebHelpCookDelim="||",ebHelpCookName="ebh",ebHelpContainerName="ds2";var eInd=document.domain.indexOf(".ebay."),tDomain;if(eInd!=-1)
tDomain=document.domain.substr(eInd+1);function ebHelpGBTFInit()
{if(typeof(dot)=='undefined'||typeof(ebStr)=='undefined')
return false;var eInd=document.domain.indexOf(dot+ebStr+dot),tDomain;if(eInd!=-1)
tDomain=document.domain.substr(eInd+1);var srch=decodeURIComponent(document.location.search);var ind=srch.indexOf("fromFeature=");if(ind==-1)
{var vals=ebHelpGetCookieVals();if(vals[0]&&vals[1])
ebHelpFeatureName=vals[0];if(vals[1])
ebHelpFeatureRef=vals[1];}
else
{var lInd=srch.indexOf("&",ind+12);if(lInd==-1)
lInd=srch.length;ebHelpFeatureName=srch.substring(ind+12,lInd);ebHelpFeatureRef=(window.history.length-1-((ebay.oGlobals.oClient.bFirefox)?1:0));if(ebHelpFeatureName.hasAny('script','document','alert','javascript','write','window','ript'))
ebHelpFeatureName="";var cv=encodeURIComponent(ebHelpFeatureName)+ebHelpCookDelim+ebHelpFeatureRef;writeCookieletEx(ebHelpContainerName,ebHelpCookName,cv,tDomain,"/");}}
function ebHelpGetCookieVals()
{return readCookieletEx(ebHelpContainerName,ebHelpCookName).split(ebHelpCookDelim);}
function ebHelpSendBackToFeature(pIndex)
{writeCookieletEx(ebHelpContainerName,ebHelpCookName,"",tDomain,"/");if(history.iAnchClickCounts)
{pIndex=pIndex+history.iAnchClickCounts;}
history.go(pIndex);}
window.sendBackToFeature=ebHelpSendBackToFeature;function ebHelpGetBackToFeature()
{var str='&nbsp;';if(ebHelpFeatureRef>0&&ebHelpFeatureName&&window.history.length>((ebay.oGlobals.oClient.bFirefox)?1:0))
{str='<font face="arial" size="2">';str+='<a href="javascript:sendBackToFeature(';str+=(parseInt(ebHelpFeatureRef)-window.history.length)+');">';str+=decodeURIComponent(ebHelpFeatureName);str+='</a></font>&nbsp;&nbsp;';}
return str;}
window.getBackToFeature=ebHelpGetBackToFeature;window.ebHelpSearchClear=new Function("return true;");ebHelpGBTFInit();

//3@@m2

var openedWin=null;var wpercent=100;function launch()
{var args=launch.arguments;var url=args[0];var width=args[1];var height=args[2];if(!url||!width||!height)
{alert("Error");}
else if(width>screen.availWidth||height>screen.availHeight)
{var targetW=screen.availWidth-8;wpercent=Math.floor((targetW*100)/width);var targetH=Math.floor((height*wpercent)/100);width=targetW;height=targetH;_launch(url,width,height);}
else
{_launch(url,width,height);}}
function _launch()
{var args=_launch.arguments;if(args.length<3)
{alert('Wrong amount of arguments');return}
closeChild();var url=args[0];var width=args[1];var height=args[2];var resizable=args[3]?"yes":"no";var scrollbars=args[4]?"yes":"no";var toolbar=args[5]?"yes":"no";var menubar=args[6]?"yes":"no";var status=args[7]?"yes":"no";var address=args[8]?"yes":"no";var directories=args[9]?"yes":"no";var NewX=Math.max(0,Math.floor((screen.availWidth-(width+8))/2));var NewY=Math.max(0,Math.floor((screen.availHeight-(height+27))/2));var params='';params+="width="+width;params+=",height="+height;params+=",screenx="+NewX;params+=",screeny="+NewY;params+=",left="+NewX;params+=",top="+NewY;params+=",resizable="+resizable;params+=",scrollbars="+scrollbars;params+=",toolbar="+toolbar;params+=",menubar="+menubar;params+=",status="+status;params+=",location="+address;params+=",directories="+directories;openedWin=window.open(url,"",params);}
function closeChild()
{if(openedWin!=null)
{if(!openedWin.closed)
{openedWin.close();}}}
onunload=closeChild;
// b=15480557 -->