var doc=document,win=window,sById=(doc.getElementById)?true:false;function setStyleName(objId,styleName){document.getElementById(objId).style.display=styleName;}
var archivedState=0;
function setCookie(name,value,expires,path,domain,secure){document.cookie=name+'='+escape(value)+((expires)?';expires='+expires.toGMTString():'')+';path='+((path)?path:'/')+';domain='+((domain)?domain:'boston.com')+((secure)?';secure':'');}
function ifSafari(){if((navigator.userAgent.indexOf('Safari')!=-1)||(navigator.userAgent.indexOf("Macintosh")!=-1)||(navigator.userAgent.indexOf("Mac_PowerPC")!=-1)){document.write("<style type='text/css' media='all'>@import 'http://cache.boston.com/universal/css/bcom_hp_styles_safari.css';</style>")};}
function getCookie(name){var dc=document.cookie,prefix=name+'=',begin=dc.indexOf('; '+prefix);if(begin==-1){begin=dc.indexOf(prefix);if(begin!=0)return null;}else begin+=2;var end=dc.indexOf(';',begin);if(end==-1)end=dc.length;return unescape(dc.substring(begin+prefix.length,end));}
function expireCookie(name,path,domain){document.cookie=name+'=;expires=Thu, 01-Jan-70 00:00:01 GMT;path='+((path)?path:'/')+';domain='+((domain)?domain:'boston.com');}
function windowLoaded(){}
function tabs(view,hideA,hideB){if(view.style.visibility=="hidden")
{view.style.visibility="visible";view.style.display="block";hideA.style.visibility="hidden";hideB.style.visibility="hidden";hideA.style.display="none";hideB.style.display="none";}
else{view.style.visibility="visible";view.style.display="block";}}
function tabs2(view,hideA){if(view.style.visibility=="hidden")
{view.style.visibility="visible";view.style.display="block";hideA.style.visibility="hidden";hideA.style.display="none";}
else{view.style.visibility="visible";view.style.display="block";}}
var var5='hp_header_';function keyword(){if(document.getElementById('textField').value!=""&&document.getElementById('textField').value!=null){return document.getElementById('textField').value.toLowerCase();}
else{return"User_Blank"}}
var otherTab;function choose(tab){if(tab!=otherTab){tab.className="searchOn";otherTab.className="";otherTab=tab;if(tab.id=="searchLocal"){document.getElementById("tab").value="";}else if(tab.id=="searchSite"){document.getElementById("tab").value="ssearch";}else if(tab.id=="searchBusiness"){document.getElementById("tab").value="yp";}}}
function searchSubmit(){omnitureCode(document.getElementById("tab"));}
function omnitureCode(tabName){var temp5=var5;if(tabName.value==""){if(document.getElementById('p1')!=null){document.getElementById('p1').value='Header_Searchbox_LocalSearch'};temp5=var5+'searchbox_greaterboston';}
    if(tabName.value=="ssearch"){if(document.getElementById('p1')!=null){document.getElementById('p1').value='Header_Searchbox_SiteSearch'};temp5=var5+'searchbox_site';}
    if(tabName.value=="yp"){if(document.getElementById('p1')!=null){document.getElementById('p1').value='Header_Searchbox_BusinessSearch'};temp5=var5+'searchbox_site';{document.getElementById('textField').name='s.ypsearch'};}
    if(keyword()!="User_Blank"){s_linkType='o';s_linkName='search_query';s_eVar2=keyword();s_eVar5=temp5;s_lnk=s_co(document.getElementById('searchForm'));s_gs('nytbglobe');}}
function openWindow(url,name,props){try{props=props.replace(/(resizable|scrollbars)\=no/g,'$1=yes');var nw=win.open(url,name,props);nw.focus();window.event.cancelBubble=true;}catch(e){}}
function MM_openBrWindow(url,name,props){openWindow(url,name,props);}
var doc=document,win=window,sById=(doc.getElementById)?true:false;function openWindow(url,name,props){try{props=props.replace(/(resizable|scrollbars)\=no/g,'$1=yes');var nw=win.open(url,name,props);nw.focus();window.event.cancelBubble=true;}catch(e){}}
var bcHomepage;var bcCategoryPage;var homepageSWF="homepage_thumbs";var categorySWF="category_thumbs";var titleIDs=new Array();function onTemplateLoaded()
{callFlash("addEventListener","contentLoad","onContentLoad");callFlash("addEventListener","mediaReady","onMediaReady");bcHomepage=document.getElementById("bcHomepage");bcCategoryPage=document.getElementById("bcCategoryPage");bcArticlePage=document.getElementById("bcArticlePage");bcRelatedVideos=document.getElementById("bcRelatedVideos");bcPlayerThumbnails=document.getElementById("bcPlayerThumbnails");bcThumbnailTitle=document.getElementById("bcThumbnailTitle");bcTitleHeadline=document.getElementById("bcTitleHeadline");bcPaging=document.getElementById("bcPaging");bcDescription=document.getElementById("bcDescription");bcVideoHeader=document.getElementById("bcVideoHeader");}
function onContentLoad()
{if(bcHomepage||bcCategoryPage)callFlash("getFeaturedLineup");if(bcHomepage)thisMovie(homepageSWF).unhide();if(bcArticlePage)onMediaReady();}
function onMediaReady()
{callFlash("getCurrentTitle");}
function getCurrentTitle_Result(titleDTO)
{if(bcTitleHeadline)bcTitleHeadline.innerHTML=titleDTO.displayName;if(bcDescription)bcDescription.innerHTML=titleDTO.shortDescription;if(bcVideoHeader)bcVideoHeader.style.visibility="visible";}
function getFeaturedLineup_Result(lineupDTO)
{titleIDS=new Array();titleIDs=lineupDTO.videoIds;for(var i=0;i<lineupDTO.videoIds.length;i++)
{callFlash("getTitleById",lineupDTO.videoIds[i]);}
if(bcRelatedVideos)bcRelatedVideos.innerHTML="RELATED VIDEOS ("+lineupDTO.videoIds.length+")";if(bcRelatedVideos)bcRelatedVideos.style.color="#000";onMediaReady();if(bcHomepage)thisMovie(homepageSWF).getPage("next");if(bcCategoryPage)thisMovie(categorySWF).buildThumbnails();}
function getTitleById_Result(titleDTO)
{if(bcHomepage)thisMovie(homepageSWF).buildTitleIDs(Number(titleDTO.id));if(bcHomepage)thisMovie(homepageSWF).buildTitles(String(titleDTO.displayName));if(bcHomepage)thisMovie(homepageSWF).buildThumbArray(String(titleDTO.thumbnailURL));if(bcCategoryPage)thisMovie(categorySWF).buildTitleIDs(Number(titleDTO.id));if(bcCategoryPage)thisMovie(categorySWF).buildTitles(String(titleDTO.displayName));if(bcCategoryPage)thisMovie(categorySWF).buildThumbArray(String(titleDTO.thumbnailURL));if(bcCategoryPage)thisMovie(categorySWF).buildDescriptions(String(titleDTO.shortDescription));}
function thisMovie(movieName)
{if(navigator.appName.indexOf("Microsoft")!=-1)
{return window[movieName];}
else
{return document[movieName];}}
var doc=document,win=window,sById=(doc.getElementById)?true:false;function openWindow(url,name,props){try{props=props.replace(/(resizable|scrollbars)\=no/g,'$1=yes');var nw=win.open(url,name,props);nw.focus();window.event.cancelBubble=true;}catch(e){}}
var primary_id='tab1';function switchTab1(){document.getElementById('tab1').className='active';document.getElementById('tab2').className='';document.getElementById('tab3').className='';document.getElementById('zventsFooter').style.display='block'}
function switchTab2(){document.getElementById('tab1').className='';document.getElementById('tab2').className='active';document.getElementById('tab3').className='';document.getElementById('zventsFooter').style.display='block'}
function switchTab3(){document.getElementById('tab1').className='';document.getElementById('tab2').className='';document.getElementById('tab3').className='active';document.getElementById('zventsFooter').style.display='none'}
var primary_id='tab1';function switchTabA(){document.getElementById('tabA').className='active';document.getElementById('tabB').className=''}
function switchTabB(){document.getElementById('tabA').className='';document.getElementById('tabB').className='active'}
function ShowDiv(a,b,c,d){var i;if(c){i=c}else{i=1};var z;while(z=document.getElementById(b+i)){if((i>=c)&&(i<=d)){if(i==a){z.style.display='block'}else{z.style.display='none'}}
i++}}
tabber={click:function(clicked){var ul=clicked.parentNode.parentNode;var tabs=ul.getElementsByTagName('a');for(i=0;i<tabs.length;++i){var a=tabs[i],on=(a==clicked);a.className=(on?'active':'');tabber.show(a.id.replace(/^tab/,'div'),on);}},zclick:function(clicked,when){tabber.click(clicked);tabber.show('zventsFooter',!when);if(ZventsTomorrowID&&when=='Tomorrow'){Z.widget.popular({id:ZventsTomorrowID,load:{when:when}});ZventsTomorrowID=null;}},show:function(id,show){document.getElementById(id).style.display=show?'block':'none';}};function keywordSelect(inputfield){if(document.getElementById(inputfield).value!=""&&document.getElementById(inputfield).value!=null){return document.getElementById(inputfield).value.toLowerCase();}
else{return"User_Blank"}}
function travelWidgetSubmit(){var kw="";if(document.getElementById('textField2').value==""){alert('Please enter a keyword, like "Maine" or "Bermuda hotels"');}else{document.getElementById('travelSearchWidget').submit();kw="Travel-"+keywordSelect('textField2');travelWidgetomnitureCode('searchbox',kw);}}
function travelWidgetomnitureCode(tabName,keyword,sco){var temp5=var5;temp5=var5+'travel'+tabName;s_linkType='o';s_linkName='search_query';s_eVar2=keyword;s_eVar5=temp5;s_lnk=s_co(document.getElementById('searchForm'));s_gs('nytbglobe');}


function Nytd_Pixel_addGlobalTaxonomyValue(value){}
function Nytd_Pixel(){}
function goToUgcProfileUrl(){var pathAuth=getCookie("pathAuth");if(!pathAuth)return;$.getJSON("/ugc/user/regiauthtoken/"+getCookie("pathAuth"),function(user,textStatus,jqXHR){window.location.href="/community/user/"+user.id}); return false;}
function showLoginRRD(twidth){if(!twidth)twidth=191;if(getCookie("pathAuth")||getCookie("pathAuthSess")){ if(((getCookie("PSyncHint"))&&(getCookie("PSyncHint")!="-"))&&(getCookie("AT"))){if(OAS_sitepage == 'www.boston.com/homepage/defaulted'){document.writeln('<div align="center"> <span id="mp"><a onclick="goToUgcProfileUrl()" href="javascript:void(0)">Profile</a></span> | <span id="mc"><a href="http://www.boston.com/?__goto=mcenter">Settings</a></span> | <span id="lo"><a onclick="setCookie(\'AT\');document.location=\'http://www.boston.com/?__goto=logout\';return false" href="http://www.boston.com/?__goto=logout">Log out</a></span></div>')}
																							   else{document.writeln('<div align="center"><span id="mp"><b><a onclick="goToUgcProfileUrl()" href="javascript:void(0)">' + getCookie("PSyncHint") + '\'s profile</a></b></span> | <span id="mc"><a href="http://www.boston.com/?__goto=mcenter">Account settings</a></span> | <span id="lo"><a onclick="setCookie(\'AT\');document.location=\'http://www.boston.com/?__goto=logout\';return false" href="http://www.boston.com/?__goto=logout">Log out</a></span></div>')}}else{document.writeln('<div align="center"><span id="mc"><a href="http://www.boston.com/?__goto=mcenter&amp;Header_Regi_Preferences">Preferences</a></span> | <span id="lo"><a href="http://www.boston.com/?__goto=logout&amp;p1=Header_Regi_LogOut">Log out</a></span></div>');}}
			      else{document.writeln('<div align="center"><span id="si"><a href="http://www.boston.com/?__goto=loginonlypage&amp;p1=Header_Regi_Signin">Sign In</a></span> | <span id="rn"><a href="http://www.boston.com/?__goto=loginpage&amp;Header_Regi_RegisterNow">Register now</a></span></div>');}}
eval(function(p,a,c,k,e,d){while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+c+'\\b','g'),k[c])}}return p}('36={7:9(6,4,5,3){35(!6)34;4=4||\'\';5=5||\'\';3=3||\'\';33.32(\'31://30.29/28-27?26=2&6=\'+6+\'&4=\'+4+\'&5=\'+5+\'&3=\'+3,20 19().17(),\'21=1,22=1,15=0,13=1,25=1,11=1,18=23,14=12,10 = 24,8 = 16\')}}',10,37,'|||topic|title|bodytext|url|remoteSubmit|top|function|left|resizable|600|statusbar|height|location|150|getTime|width|Date|new|toolbar|scrollbars|575|470|menubar|phase|submit|remote|com|digg|http|open|window|return|if|Digg'.split('|')))
function fbs_click(){u=location.href;t=document.title;void(window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=no,width=626,height=436'));return false;}
function classySwap(){var foo=Math.random();var bar;
var bar;
if(foo<0.25)
  bar='cars'
else
    bar='re';
var baz=bar+'CfiedContent';var spaz='g'+bar+'_on';var jazz='g'+bar;if(bar=='cars'){setStyleName('gcars_on','block');setStyleName('gcars','none');setStyleName(baz,'block');}
else{setStyleName(spaz,'block');setStyleName(jazz,'none');setStyleName('carsCfiedContent','None');setStyleName(baz,'block');}}
var globeWidgetTab;function chooseGlobe(tab){if(tab!=globeWidgetTab){tab.className="searchOn";globeWidgetTab.className="";globeWidgetTab=tab;if(tab.id=="globeArchive"){document.getElementById("gwsort").value="-articleprintpublicationdate";document.getElementById("gwdateRange").value="";}else if(tab.id=="todayGlobe"){document.getElementById("gwdateRange").value="today";document.getElementById("gwsort").value="";}}}
function globeWidgetSubmit(){omnitureGlobeCode(globeWidgetTab.id);}
function omnitureGlobeCode(tabName){var globeTemp5='';if(tabName=="globeArchive"){globeTemp5=temp5+'globearchive';}
if(tabName=="todayGlobe"){globeTemp5=temp5+'todaysglobe';}
if(globekeyword()!="User_Blank"){s_linkType='o';s_linkName='search_query';s_eVar2=globekeyword();s_eVar5=globeTemp5;s_lnk=s_co(document.getElementById('articleright_searchbox'));s_gs('nytbglobe');}}
function globekeyword(){if(document.getElementById('globeText').value!=""&&document.getElementById('globeText').value!=null){return document.getElementById('globeText').value.toLowerCase();}
else{return"User_Blank"}}
function calImage(){CalDate=CalDate.toLowerCase() ;
if(CalDate.indexOf(":")==-1){dte=CalDate.split("|");}else{dte=new Array();tmpDte=CalDate.split("-");dte[0]=tmpDte[0].substring(0,3);dte[1]=tmpDte[1];dte[3]=tmpDte[2].substring(0,4);tmpDte=tmpDte[0].split(", ");dte[2]=tmpDte[1];}
if(dte[2].indexOf("0")==0){dte[2]=dte[2].charAt(1)}
gbDate=parseInt(dte[2]);gbMonth=dte[1];gbYear=dte[3];var ldays=new Array("jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec")
for(i=0;i<ldays.length;i++){if(gbMonth.substring(0,3)==ldays[i]){gbMonNum=i};}
gbMonNum=gbMonNum+1;if(gbDate<10)(gbDate="0"+gbDate);else(gbDate=gbDate);if(gbMonNum<10)(gbMonNum="0"+gbMonNum);else(gbMonNum=gbMonNum);var popParams="'http://www.boston.com/news/globe/larger_view','largerview','width=650,height=1100,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,status=no'";document.write("<a href=\"http://www.boston.com/news/globe/larger_view\" class=\"imageLink\" onclick=\"openWindow("+popParams+"); return false;\"><img src='http://cache.boston.com/globe/"+gbYear+"/"+gbMonNum+"/"+gbDate+"/today_thumbnail.jpeg' alt='The Boston Globe' width='189' /></a>");}
function redirectSelectMenu(smenu){if(typeof(smenu)=='string'&&sById)smenu=doc.getElementById(smenu);if(smenu){var sval=smenu.options[smenu.selectedIndex].value;if(sval)document.location.href=sval;}}
function MM_findObj(n,d){var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);if(!x&&d.getElementById)x=d.getElementById(n);return x;}
function MM_showHideLayers(){var i,p,v,obj,args=MM_showHideLayers.arguments;for(i=0;i<(args.length-2);i+=3)if((obj=MM_findObj(args[i]))!=null){v=args[i+2];if(obj.style){obj=obj.style;v=(v=='show')?'visible':(v=='hide')?'hidden':v;}
obj.visibility=v;}}
function displayEmbed(){};function changeImageOn(){};function changeImageOff(){};function displayInformBox(){};
 
function clearText(thefield){if (thefield.defaultValue==thefield.value) thefield.value = ""; thefield.className='search_box active';} 
function checkForm(theform){if (theform.q.defaultValue==theform.q.value) theform.q.value = "";}

function signupLink(){var cookie1=getCookie('pathAuth'),cookie2=getCookie('pathAuthSess');if(cookie1!=null || cookie2!=null){document.writeln('<a href="http://www.boston.com/Boston/email?p1=Foot_ContactBostonCom_Newsletters">Newsletters</a>');}else{document.writeln('<a href="http://www.boston.com/Boston/email?p1=Foot_ContactBostonCom_Newsletters">Newsletters</a>');}}

function showWhat(divid)
{
	if(document.getElementById(divid).style.display == 'none'){
      document.getElementById(divid).style.display = 'block';
    }
}

function hideWhat(divid)
{
	if(document.getElementById(divid).style.display == 'block'){
      document.getElementById(divid).style.display = 'none';
    }
}

function keywordForm(inputId){
    if (document.getElementById(inputId).value != "" && document.getElementById(inputId).value != null){
      return document.getElementById(inputId).value.toLowerCase();
    }
    else{
      return "User_Blank"
    }
}


function bload(){
    if(document.getElementById("plckForumTitleTag")){
	document.title=(document.getElementById("plckForumTitleTag").innerHTML + " - Boston.com");
    }else{
	if(document.getElementById("plckTitleTag")){
	    document.title=(document.getElementById("plckTitleTag").innerHTML + " - Boston.com");
	}
    }
}


// Added for Pluck discovery widget.
function dateCleanUp(fromDate)
{
	var today = new Date();
	var dCompare = new Date(fromDate);
	var difference = (today.getTime() - dCompare.getTime());
	var tDiff = Math.floor(difference/(1000*60));
	var diffString = "";
	if(tDiff < 60)
	{
		diffString = tDiff + " " + ((tDiff > 1)?"minutes":"minute");
	}
	else
	{
		tDiff = Math.floor(tDiff/60);
		if(tDiff < 24)
		{
			diffString = tDiff + " " + ((tDiff > 1)?"hours":"hour");
		}
		else
		{
			tDiff = Math.floor(tDiff/24);
			diffString = tDiff + " " + ((tDiff > 1)?"days":"day");
		}
	}
	return(diffString);
}




//This is for refershing ads in iframes on pages with paginated Flash conent. When avail it should target OAS iframes only
function bcom_refreshAds(){
	var iframes = document.getElementsByTagName('iframe');
	for (var i = 0; i<iframes.length; i++){
		iframes[i].src = iframes[i].src;
	}
}

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

	
function bdc_showCompanionAdSection(adstring) {
    cleanAd();  

    var vca_div = document.createElement("div");
    vca_div.setAttribute("id", "bdc_videoCompanionAdSection");
    vca_div.innerHTML = adstring ;
    document.getElementById("Col2Top").appendChild(vca_div);
    $("#bdc_videoCompanionAdSection").slideDown(1000);
}

function cleanAd() {
    var x = document.getElementById("Col2Top");
    while (x.lastChild) {
	x.removeChild(x.lastChild);
    }
}


// YourTown Boston neighborhoods/suburbs toggle
function ytFlipTowns(resp)
{
	var isSuburbs = 0;
	if(resp.type == 'default')
		isSuburbs = 1;
	flipTownList(isSuburbs, false);
}

function flipTownList(isSuburbs, flashToggle)
{
	if(isSuburbs == 0)
	{		
		$('#townList').hide() ; 
		$('#neighborhoodList').show() ; 		
		if(typeof(flashToggle) == 'undefined') { document.getElementById("state_towns").jsZoomToTown('boston'); }
	}
	else
	{
		$('#neighborhoodList').hide(); 		
		$('#townList').show(); 		
		if(typeof(flashToggle) == 'undefined') { document.getElementById("state_towns").jsZoomToDefault(); }
	}
}
// End YourTown neighborhoods/suburbs toggle


/* To populate the Real Estate search box */
function reSearchTextDisplay() {
	var searchChild = document.getElementById('suggest1').firstChild;
	var searchChildValue = "Enter city, town or neighborhood";
	searchChild.value = searchChildValue;
	searchChild.onblur = function(){
		if (searchChild.value == "") 
			searchChild.value = searchChildValue;
	};
	searchChild.onfocus = function(){
		searchChild.value = "";
	};
	return false;
}


// PointsLocal widget function 
function loadPoints(design_id, element_id, proxy, options) {
	var pointsdata = "";
	var s_leadin;
	var id = "#" + element_id;
	var pointscall = proxy + design_id;

	$(document).ready(function() {
		$.get(pointscall, { },
		function(data){
			$(data).find('item').each(function(){
				var title = $(this).find('title').text();
				var url = $(this).find('url').text();
				var sourcename = $(this).find('sourcename').text();
				var description = $(this).find('description').text();
				var show_leadin = $(this).find('showdescription').text();
				s_leadin = show_leadin;
				var date = $(this).find('date').text();
				var tmpDate = new Date(date);
				var image = $(this).find('image').text();
				var show_image = 1;
				
				if (show_leadin != 1) {
					pointsdata += '<li><a href="' + url + '"><b>' + title + '</b></a> <span class="attr">' + sourcename + ', ' + (parseInt(tmpDate.getMonth())+1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear() + '</span></li>';
				}
				else {
					if (show_image == 1 && image) { 
					
						pointsdata += '<div class="padTop4"></div><div class="img100h3Left"><a href="' + url + '">' + '<img src="' + image + '" /></a><h3><a href="' + url + '">' + title + '</a></h3><div class="tt"><span>' + description + ' <span class="attr">' + sourcename + ', ' + (parseInt(tmpDate.getMonth())+1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear() + '</span></span></div><div class="cf"></div></div><div class="padTop4"></div>';
					 
					} else { 
						pointsdata += '<div class="padTop4"></div><div class="img100h3Left"><h3><a href="' + url + '">' + title + '</a></h3><div class="tt"><span>' + description + ' <span class="attr">' + sourcename + ', ' + (parseInt(tmpDate.getMonth())+1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear() + '</span></span></div><div class="cf"></div></div><div class="padTop4"></div>';
					}
				}

			});

		if (s_leadin != 1) {
			pointsdata = '<ul class="linklist">' + pointsdata + '</ul>';
		}

		$(id).append(pointsdata);

	  });

  });

 } //end pointsLocal





	jQuery(function($){
    
	    $('.generic-scroller').each(function(){
		    var scroller = $(this),
			pos_prop = scroller.hasClass( 'generic-scroller-horizontal' ) ? 'left' : 'top',
			size_prop = pos_prop === 'left' ? 'width' : 'height',
			outer = scroller.find( '.generic-scroller-outer' ),
			inner = outer.children().eq(0);
        
		    if ( inner.children().length <= 1 ) { return; }
        
		    // Allow interactive controls to be hidden until ready.
		    scroller.addClass( 'generic-scroller-js' );
        
		    // Add hover class for prev/next button mouseover.
		    scroller.find('.generic-scroller-prev_next').bind( 'mouseenter mouseleave', function(e){
			    $(this).toggleClass( 'generic-scroller-prev_next-hover', e.type === 'mouseenter' );
			});
        
		    // Prev button click.
		    scroller.find('.generic-scroller-prev').click(function(){
			    var pos = parseInt( inner.css( pos_prop ) ),
				scroller_size = outer[ size_prop ](),
				obj = {};
            
			    inner.children(':last').prependTo( inner );
			    inner.css( pos_prop, -scroller_size );
            
			    obj[ pos_prop ] = 0;
			    inner.stop( true, true ).animate( obj );
			});
        
		    // Next button click.
		    scroller.find('.generic-scroller-next').click(function(){
			    var pos = parseInt( inner.css( pos_prop ) ),
				scroller_size = outer[ size_prop ](),
				obj = {};
            
			    obj[ pos_prop ] = pos - scroller_size;
			    inner.stop( true, true ).animate( obj, function(){
				    inner.children(':first').appendTo( inner );
				    inner.css( pos_prop, 0 );
				});
			});
		});
    
	});
 
 
	// Quote Scroller.
 
	jQuery(function($){
 
	    $('.quote-scroller li').each(function(){
		    var li = $(this),
			a = li.find('a').eq(0),
			href = a.attr('href'),
			hit;
        
		    if ( href ) {
			li.addClass( 'clickable' );
            
			hit = a.clone()
			    .html( '&nbsp;' )
			    .addClass( 'button-hitarea' )
			    .appendTo( li );
            
			li.bind( 'mouseenter mouseleave', function(e){
				li.toggleClass( 'hover', e.type === 'mouseenter' );
			    });
		    }
		});
    
	    });
 
 
// BCOM-1439: billboardSlider
(function($){
  
  var ns = $.fn.billboardSlider = function( options ) {
    options = $.extend( {}, ns.options, options );
    
    return this.each(function(){
      var that = $(this),
        
        // Get cookie name.
        cname = that.attr( 'data-cname' ),
        
        // Get widget state based on cookie.
        collapsed = getCookie( cname ),
        
        // To cancel the timeout.
        timeout_id;
      
      // If already initialized, skip!
      if ( that.data( 'billboardSlider' ) ) { return; }
      
      // Set already-initialized flag
      that.data( 'billboardSlider', true );
      
      if ( !collapsed ) {
        // Close billboard after a delay (unless canceled).
        timeout_id = setTimeout( toggle , options.delay );
      } else{
        toggle( true );
      }
      
      // Toggle the clicked element
      function toggle( instantly ) {
        var speed = instantly ? 0 : options.speed;
        
        that.children( '.slider-expanded' )
          .stop( true, true )
          .animate({
            height: 'toggle'
          }, speed )
          
          .siblings('div')
            .stop( true, true )
            .animate({
              height: 'toggle'
            }, speed );
      };
      
      // Binding the toggle function to click.
      that.find('.slider-toggle').click(function(e){
        e.preventDefault();
        
        var date = new Date();
        date.setDate( date.getDate() + options.expiration_days );
        setCookie( cname, 1, date );
        
        timeout_id && clearTimeout( timeout_id );
        toggle();
      }); 
    });
  };
  
  // Set up some reasonable global defaults.
  ns.options = {
    delay: 10000,
    speed: 500,
    expiration_days: 7
  };
  
  // Initialize any sliders that weren't explicitly initialized.
  $(function(){
    // $('.slider-billboard').billboardSlider();
    ns.call( $('.slider-billboard') );
  });
  
})(jQuery);

// BCOM-1755 re-do Weather Map tabs (originally done w/Protoype) 

$(document).ready(function() {
  // Weather map tabs 
  $(".weatherMapsContent").hide();  // Hide tab content 
  $("ul.weatherMapTabs li:first").addClass("active").show(); // Show 1st element by default  
  $(".weatherMapsContent:first").show();  // Ditto 
	
  $("ul.weatherMapTabs li").click(function() { // tab is clicked 
    $("ul.weatherMapTabs li").removeClass("active");  // reset active 
    $(this).addClass("active"); // make new active 
    $(".weatherMapsContent").hide(); // hidecurrent content so we can show selected 
    var activeTab = $(this).find("a").attr("href"); // find id by href  
    $(activeTab).fadeIn(); 
    return false;
  });
  
  // Temp toggle F/C 
  $("#tempToggle .temp a").click(function(){ 
    $("#tempToggle .temp").toggleClass("active") ;
    $(".currentDeg").toggleClass("active") ;
  }) ; 
});

/* Travel drop-down widget revisited */
var count=0;
function clickLink(containerID) {
	var widgetkeyword='';
	if(count==0) { count++; }
	else 
		if(count==1) {
			var mylist=document.getElementById(containerID);
			var urlString=mylist.options[mylist.selectedIndex].value;
			if(urlString!='none') { window.location=mylist.options[mylist.selectedIndex].value }
			count=0;
		}
}

// Enable print styles
$(function() {
	// Bind to blog print link
  $('a#blogPrint').click(function() {
    // Launch print dialog
    print();
    return false;
  });
});

/* Daily Dose health widget,
 * enable category toggling  */
$(function() {
  var filterTeaseButtons = $( 'li.filter-single-category' ).not( '#more_categories' );
  // Bind toggling to click
  filterTeaseButtons.click(function() {
    var that = $(this);
    var curID = that.attr( 'id' );
    var curTease = $( 'li.filter-single-tease#' + curID + '_tease' );
    
    that
      .addClass( 'active' )
      .siblings()
      .removeClass('active');
    
    curTease
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
});


/* empty mbox function */
function mboxCreate (){};


/* Allows for omniture tracking to be appended to deals widgets with some specificity */

$(function() {
	var all = document.getElementsByTagName("a")
	    , s = "?s_campaign="
	    , p = "?p1=";
	for (var i= all.length; i >= 0; i--){
	    if ($(all[i]).attr("data-campaign")){
    var us = "_"
		, current = $(all[i])
		, trackposn = current.attr("data-posn")
		, trackposn2 = current.attr("data-posntwo")
		, omnitureName = "Deals"
		, href = current.attr("href")
		, merchantAbbr = current.text().split(' ').slice(0,2).join(''); //scavanged from deals widget
    ;

		//deals with custom set deals
    if (current.attr("data-campaign") === "s"){
			$(all[i]).attr('href', href + s + omnitureName + us + var5 + trackposn + us + trackposn2);
	   }
	
    //deals with appended deals
		if (current.attr("data-campaign") === "s" && current.attr("data-posntwo") === "deal"){
			$(all[i]).attr('href', href + s + omnitureName + us + var5 + trackposn + us + merchantAbbr);
    }
    if (current.attr("data-campaign") === "p"){
			$(all[i]).attr('href', href + p + trackposn + us + var5 + trackposn2);
    }
	
	}
	}});


var _vrq = _vrq || [];
_vrq.push(['id', 55]);

if (typeof pgType != 'undefined' && pgType == 'Homepage')
   {
       _vrq.push(['automate', true]);
   }
else
   {
       _vrq.push(['automate', false]);
   }
_vrq.push(['track', function(){}]);
(function(d, a){
    var s = d.createElement(a),
        x = d.getElementsByTagName(a)[0];
    s.async = true;
    s.src = 'http://a.visualrevenue.com/vrs.js';
    x.parentNode.insertBefore(s, x);
})(document, 'script');

var radioType = "header";
function constantContact (){
    setTimeout(function(){checkNowPlaying()}, 60000);
}

function scrollerDome() {
    $('.scrollMeAway').bind('marquee', function() {
        var ob = $(this);
        var tw = ob.width();
        var ww = ob.parent().width();
        ob.css({ right: -tw });
        ob.animate({ right: ww }, 10000, 'linear', function() {
            ob.trigger('marquee');
        });
    }).trigger('marquee');
}

function checkNowPlaying () {
    if (radioType != 'none')
    {
    var randomMeAway = Math.floor(Math.random()*101);
    var jsonURL = 'http://www.boston.com/ae/radio/nowplaying.json?check=' + randomMeAway;
    $.getJSON(jsonURL,
              function(data) {  if  ($("#now-playing-" + radioType + " .np-song-artist").text() != data.nowplaying.artist)
				{
				    $("#now-playing-" + radioType + " .np-song-artist").replaceWith('<span class="np-song-artist">' + data.nowplaying.artist + '</span>');
				    $("#now-playing-" + radioType + " .np-song-title").replaceWith('<span class="np-song-title">' + data.nowplaying.track + '</span>');
				 scrollerDome();
				}
                                else
                                {
				 scrollerDome();
				}
                             });

    constantContact();
    }
}

$(function() {checkNowPlaying();})


// adds the 'wmode=transparent' param to any object on the page
//
// (04/19/12) - Commented this out, as it causes IE6-8 to choke.
// Appending params to an object in IE can be done, I believe, just not this way.
// See http://bugs.jquery.com/ticket/11280 for more info - Eddie
/*
$(function(){
        var wmodeSet = '<param name="wmode" value="transparent" />';
        $(".tcCentered object").append(wmodeSet);
        $(".videoplayer object").append(wmodeSet);
});
*/


var bcom_cookie = {
    
    get: function(the_cookie){ // Returns value of the_cookie
	
	var cookie_array = document.cookie.split(';'),
	this_cookie, cookie_name, cookie_value, i;
	for(i=0; i<cookie_array.length; i++){
	    this_cookie= cookie_array[i].split('=');
	    cookie_name= $.trim(this_cookie[0]);
	    cookie_value= $.trim(this_cookie[1]);
	    if( cookie_name == the_cookie ){
		return unescape(cookie_value);
	    }
	}
	return false;
	
    },
    
    set: function(cookie_name, value, expiration_days, escape_this){ // Sets a cookie
	
	var expiry_date = new Date();
	expiry_date.setDate(expiry_date.getDate() + expiration_days);
	//var the_cookie = escape(value) + ((expiration_days == null) ? '' : '; expires='+expiry_date.toUTCString()) + '; path=/';
	// Not escaping cookie value lets login redirect work as intended
	var the_cookie = value + ((expiration_days == null) ? '' : '; expires='+expiry_date.toUTCString()) + '; path=/';
	document.cookie = cookie_name + '=' + the_cookie;
	
    }
    
}


var bcom_regi = {
    
    max_count: 50, // Max pathCnt cookie value before redirect
    
    valid_ref: [ // Array of valid referral URLs
	'google.com',
	'search.yahoo.com'
    ],
    
    page_status: function(){ // Determines whether page is behind the annoyance wall
	
	var regi_status = document.getElementsByTagName('body')[0].getAttribute('data-regi');
	regi_status = regi_status == 'outside' ? false : true;
	return regi_status;
	
    },
    
    check_ref: function(){ // Checks referrer URL against valid referrers

	var ref_domain= document.referrer.split('/')[2],
	valid_ref= bcom_regi.valid_ref, i;
	
	for(i=0; i<valid_ref.length; i++){
	    
	    if( ref_domain == valid_ref ){
		return true;
	    }
	    
	}
	return false
	
    },
    
    check_login: function(){
	
	// Check for pathAuth cookie - if one exists, do nothing
	if( !bcom_cookie.get('pathAuth') ){
	    // Check referer against exceptions - if match, do nothing
	    if( !bcom_regi.check_ref() ){
		// Check pathCnt cookie
		var path_count = bcom_cookie.get('pathCnt');
		path_count = path_count == false ? 1 : parseInt(path_count);
		if( path_count <= bcom_regi.max_count ){
		    // Increment pathCnt cookie by 1, then do nothing
		    path_count++;
		    bcom_cookie.set('pathCnt', path_count);
		}else{
		    // Redirect to login page
		    document.location = 'https://www.boston.com/Boston/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp';
		}
	    }
	}
	
    }

};

$(document).ready(function(){

    // Set the pathUrl cookie
    bcom_cookie.set('pathUrl', document.location.href);
    
    // Check wall status of the page
    if( bcom_regi.page_status() ){
	// Check user status
	bcom_regi.check_login();
    }

});