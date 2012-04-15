/****************************************************************/
/*  Disney.com 3.0 Midchrome (Global Navigation)					
/*  Updated 07/14/2009
/*  DO NOT EDIT OR MODIFY WITHOUT QA ENGINEERING APPROVAL
/*  CONTACT QA ENGINEERING FOR ISSUES
/****************************************************************/
var chromePlayLinks=new Array(
	"Games|http://disney.go.com/games",
	"Videos|http://disney.go.com/videos",
	"Create|http://disney.go.com/create",
	"My Page|http://disney.go.com/mypage",
	"Characters|http://disney.go.com/characters"
); 
var chromeExploreLinks=new Array( 
	"Movies|http://home.disney.go.com/movies/",
	"TV|http://home.disney.go.com/tv/",
	"Music|http://home.disney.go.com/music/",
	"Live Events|http://home.disney.go.com/liveevents/",
	"Parks|http://disneyparks.disney.go.com/disneyparks/en_US/index?name=HomePage",
	"Store|http://www.disneystore.com/?CMP=OTL-DcomMicro&att=MicroChrmShpTb",
	"For You|http://home.disney.go.com/foryou/"
); 
var chromeLocURLMap=new Array( // Format: Category|current url map  :this is the map for the onState
	"Movies|/disneypictures/;disneyvideos.disney.go.com;disney.videos.go.com;mydisneymovies.go.com;.com/movies/;",
	"TV|/disneychannel;tv.disney.go.com;.com/tv/;playhouse/today;.com/abcnetworks/;",
	"Music|radio.disney.go.com;disney.go.com/disneyrecords/;disney.go.com/music/;.com/music/;disneymusic.disney.go.com;",
	"Live Events|disney.go.com/theatre/;disneyonice.disney.go.com;disney.go.com/disneylive/;.com/liveevents/;",
	"Travel|disneyparks.disney.go.com;disneyworld.disney.go.com;disneyland.disney.go.com;disneycruise.disney.go.com;dvc.disney.go.com;abd.disney.go.com;dvc.disney.go.com;disneycruise.disney.go.com;disneymeetings.disney.go.com;disneyyouthgroups.disney.go.com;disneyworldsports.disney.go.com;disneyweddings.;disneygolf.;.com/travel/;",
	"Parks|disneyparks.disney.go.com;disneyworld.disney.go.com;disneyland.disney.go.com;disneycruise.disney.go.com;dvc.disney.go.com;abd.disney.go.com;dvc.disney.go.com;disneycruise.disney.go.com;disneymeetings.disney.go.com;disneyyouthgroups.disney.go.com;disneyworldsports.disney.go.com;disneyweddings.;disneygolf.;.com/travel/;",
	"Store|disneyshopping.go.com;disney.go.com/visa;disney.go.com/disneybooks;disney.go.com/disneygiftcard;eventservices.disney.go.com/pintrading/;disney.go.com/dcards;disney.go.com/disneyadventures/;.com/shopping/;",
	"For You|disney.go.com/foryou/",
	"Games|disney.go.com/games;/blast;playhouse.go.com;play.toontown.com;vmk.disney.go.com;disney.go.com/webtoons;disney.go.com/surfswell;disney.go.com/hotshot;buenavistagames;disney.go.com/features/souvenears/;.com/games/;",
	"Videos|http://disney.go.com/videos",
	"Create|http://disney.go.com/create",
	"My Page|http://disney.go.com/mypage",
	"Characters|http://disney.go.com/characters"
); 
var chromeColorMap=new Array( //FOR LEGACY COLOR MAPPING ONLY  Format:   color|current colors hex map
	"steelblue|#3b4f74;#2c7bbd;#3261af;#485a78;#5992d7;#607499;#60a5ba",
	"skyblue|#0163a8;#00a2d6;#058ccc;#256f97;#3099e3;",
	"trueblue|#003399;#3e7ce3;",
	"blue|#002775;",
	"darkblue|#1e1e78;#000066;",
	"teal|#136f66;#07a985;#4aa69d;#00a5b3;",
	"olivegreen|#117107;;#343403;#628e32;#7a8760",
	"green|#386408;#5ebe54;#609c3a;#09640a;",
	"darkgrey|#1b1b1b;#333333;#434343;#000000;#040c1f;",
	"grey|#4d4d4d;#666666;#878e9b;#888888",
	"lightgrey|#a3a3a3;#878e9b;",
	"red|#c9111b;#b23e49;#da222c",
	"maroon|#370005;#530008;",
	"orange|#d31f05;#952d05;#bf6b34;#d09e00;#e04d0d;#ef5115;#edc407;#dc4626;#fd9b01",
	"purple|#5e2fbe;#2f0c63;#5526b5;#902578;#904b96;#a382e7;#c857f7",
	"brown|#5c2e14;#3d241c;#836031;#9a6d46;#a35713;#8e3a1e;#62441a"
);
var chromeLinksPadding=4,chromeHeight=30,chromeDLogoWidth=76,chromeSearchWidth=143,chromeLinkOffset=9,chromeLinkShOffset,chromeClrFin="blue",chromeImgPath="",chromeSearchBgImg="",chCurOnStateLink="None",chromeStrictDTD=false,chromeLooseDTD=false,chSysId="invalid",chDcWrtInf="",chIsValidColor=false,chProtocol=chProtocol=window.location.protocol.toString();
var chromeLocURL=window.location.toString(),chAppVersion=navigator.appVersion.split("MSIE"),chBrwsrVer=parseFloat(chAppVersion[1]),chBrwsrAgnt=navigator.userAgent,chIsIE6=false,chIsIE7=false,chIsFirefox=false,chIsOpera=false,chIsSafari=false,chIsMac=false,chIsPC=false,chromeDebug=false;
var chImgLogo=new Image(),chImgExpBg=new Image(),chImgExpDiv=new Image(),chImgPlayBg=new Image(),chImgPlayDiv=new Image(),chImgSearchBg=new Image(),chImgRightBg=new Image(),chImgSearchLongBg=new Image(),chImgRightLongBg=new Image(),chImgPlayOnSt=new Image(),chImgExpOnSt=new Image();
function chParams(wut,qp,dflt){dflt=(dflt==null)?'':dflt; try{r=unescape(wut.match(new RegExp(qp+"=+([^&;]*)"))[1]);}catch(qp){r=dflt;} return r;}
function chRemoveSpaces(string){var tempStr=string;tempStr=tempStr.replace(/ /g,'');return tempStr;}
function chSpace2Plus(string){var tempStr=string;tempStr=tempStr.replace(/ /g,'+');return tempStr;}
function chTrackSearch(chSearchForm){
	try{
		cto.trackLink("chrome_midsearch_na_na", "chrome_midsearch_na_");
	}catch(e){}
	try{
		if(chSearchForm.q.value.indexOf("Search Disney.com")!=-1){chSearchForm.q.value="";}
	}catch(e){}
	return true;
}
function chIsValidHexColor(hexColor){var strPattern=/^#([0-9a-f]{1,2}){3}$/i; chIsValidColor=strPattern.test(hexColor); return chIsValidColor;}
function chIsOnPage(identifier){return(chromeLocURL.indexOf(identifier)!=-1)?true:false;}
function setChromeColor(color){
	var colorStr="",tmpStr="",tmpClrStr="",tmpHexClrStr="",tmpArr=new Array();
	color=color.toLowerCase();
	if(chromeLocURL.indexOf("chdbclr=")!=-1)color=chParams(document.location.search,"chdbclr","trueblue");
	if(!color||color==""){
		colorStr="trueblue";
	} else { 
		for(var i=0; i<chromeColorMap.length; i++){
			tmpStr=chromeColorMap[i];
			tmpArr=tmpStr.split("|");
			tmpClrStr=tmpArr[0];
			tmpHexClrStr=tmpArr[1];
			if((tmpHexClrStr.indexOf(color)!=-1)){
				colorStr=tmpArr[0];
			}
			if((tmpClrStr.indexOf(color)!=-1)&&tmpClrStr.length==color.length){
				colorStr=tmpArr[0];
			}
		}
	}
	if(!colorStr||colorStr=="")colorStr="trueblue";
	return colorStr;
}
function chInitImages(){
	chImgLogo.src=chromeImgColorPath+"chdlogo.png";
	chImgPlayBg.src=chromeImgColorPath+"chplaybg.png";
	chImgPlayDiv.src=chromeImgColorPath+"chplaydiv.png";
	chImgPlayOnSt.src=chromeImgColorPath+"chplayonstatebg.png";
	chImgExpBg.src=chromeImgColorPath+"chexplorebg.png";
	chImgExpDiv.src=chromeImgColorPath+"chexplorediv.png";
	chImgExpOnSt.src=chromeImgColorPath+"chexploreonstatebg.png";
	chImgSearchBg.src=chromeImgColorPath+"chsearchbg.png";
	chImgRightBg.src=chromeImgColorPath+"chrightbg.png";
	chImgSearchLongBg.src=chromeImgColorPath+"chsearchlongbg.png";
	chImgRightLongBg.src=chromeImgColorPath+"chrightlongbg.png";
}
function chOnState(cellId){
	var obj=document.getElementById(cellId);
	var imgName = (cellId.indexOf("Play")!=-1)?chImgPlayOnSt.src:chImgExpOnSt.src;
	var curOnSt = chRemoveSpaces(chCurOnStateLink);
	if(cellId.indexOf(curOnSt)<0){
		document.getElementById(cellId).style.background="url("+imgName+")";
		document.getElementById(cellId).style.backgroundRepeat="repeat-x"; 
	}
}
function chOffState(cellId){
	var obj=document.getElementById(cellId);
	var imgName = (cellId.indexOf("Play")!=-1)?chImgPlayBg.src:chImgExpBg.src;
	var curOnSt = chRemoveSpaces(chCurOnStateLink);
	if(cellId.indexOf(curOnSt)<0){
		document.getElementById(cellId).style.background="url("+imgName+")";
		document.getElementById(cellId).style.backgroundRepeat="repeat-x";
	}
}
function chSetOnState(){
	for(var i=0; i<chromeLocURLMap.length; i++){
		var tmpSlt=chromeLocURLMap[i].split("|");
		var tmpUrls=tmpSlt[1].split(";");
		for(var j=0;j<tmpUrls.length;j++){
			if(chromeLocURL.indexOf(tmpUrls[j])!=-1&&tmpUrls[j]!=""){
				chCurOnStateLink=tmpSlt[0];
			}
		}
	}
}
function chAddNbsp(tmpStr){
	var spaces = (tmpStr.length<3)?"&nbsp;&nbsp;&nbsp;&nbsp;":"";
	return spaces;
}
if((chBrwsrVer>=5.5&&chBrwsrVer<7)&&(document.body.filters)){chIsIE6=true;}if(navigator.userAgent.indexOf("MSIE")!=-1&&chBrwsrVer>6){chIsIE7=true;}if(navigator.userAgent.indexOf("Firefox")!=-1){chIsFirefox=true;}if(navigator.userAgent.indexOf("Opera")!=-1){chIsOpera=true;}if(navigator.userAgent.indexOf("Safari")!=-1){chIsSafari=true;}if(navigator.userAgent.indexOf("Macintosh")!=-1){chIsMac=true;}if(navigator.userAgent.indexOf("Windows")!=-1){chIsPC=true;}
chromeLocURL=chromeLocURL.toLowerCase();
if(chromeLocURL.indexOf("chdb=true")!=-1)chromeDebug=true;
try{document.execCommand("BackgroundImageCache",false,true);}catch(e){} //IE6 Flicker fix
try{chromeClrFin=setChromeColor(chromeColor);}catch(e){chromeClrFin=setChromeColor("trueblue");}
try{if(!chromeWidth){chromeWidth=770;}}catch(e){chromeWidth=770;}
try{if(chromeCategory){chCurOnStateLink=chromeCategory;}}catch(e){chSetOnState();}
try{if(!noLinksChrome){noLinksChrome=false}}catch(e){noLinksChrome=(chromeLocURL.indexOf("chdbnl=true")!=-1)?true:false;}
chromeImgPath="//"+((chProtocol=="https:")?"s":"a")+".dolimg.com/media/en-US/globalmedia/chrome/images/";
chromeImgColorPath=chromeImgPath+chromeClrFin+"/";
chInitImages(); //Initialize images
//Firefox link offset check
try{
	chSysId=document.doctype.systemId;chSysId=chSysId.toLowerCase();
	if(chSysId.indexOf("www.w3.org/tr/xhtml1/dtd/xhtml1-strict.dtd")!=-1&&chIsFirefox&&chIsPC){chromeLinkOffset=7;}
	if(chSysId.indexOf("http://www.w3.org/1999/xhtml")!=-1&&chIsFirefox&&chIsPC){chromeLinkOffset=4;}
	if(chSysId.indexOf("www.w3.org/tr/html4/loose.dtd")!=-1&&chIsFirefox){chromeLinkOffset=8;}
	if(chSysId.indexOf("http://www.w3.org/tr/xhtml11/dtd/xhtml11.dtd")!=-1&&chIsFirefox&&chIsPC){chromeLinkOffset=4;}
}catch(e){}
//Set link Shadow offset. 
chromeLinkShOffset=chromeLinkOffset-13;
//Set proper widths for chrome.
if(typeof(chromeWidth)=="string"){if(chromeWidth.indexOf("%")!=-1){chromeWidth=994;}} //Percentage widths are not allowed.  Set to 994 if a percentage is declared.
if(parseInt(chromeWidth)<745){chromeWidth=745;}
chromeSearchBgImg=chImgSearchLongBg.src;
if(noLinksChrome){chromeSearchBgImg=chImgRightLongBg.src;}
/******** BEGIN CHROME STYLE *******/
chromeMainTable="width:"+chromeWidth+";height:"+chromeHeight+"px; text-align:center; padding:0px;table-layout:auto;border:none;border-collapse:collapse";
chromeBrandTd="width:"+chromeDLogoWidth+"px;height:"+chromeHeight+"px; vertical-align:top;text-align:right;background-repeat:no-repeat;";
chromeMidPlayTd="padding:0px 2px 0px 2px;height:"+chromeHeight+"px;vertical-align:top;text-align:center;background-repeat:repeat-x;";
chromeMidExpTd="padding:0px 2px 0px 2px;height:"+chromeHeight+"px;vertical-align:top;text-align:center;background-repeat:repeat-x;";
chromeMidPlayOnStateTd="padding:0px 2px 0px 2px;height:"+chromeHeight+"px; vertical-align:top;text-align:center;background-repeat:repeat-x;";
chromeMidExploreOnStateTd="padding:0px 2px 0px 2px;height:"+chromeHeight+"px; vertical-align:top;text-align:center;background-repeat:repeat-x;";
chromeSearchTd="width:"+chromeSearchWidth+"px; height:"+chromeHeight+"px;vertical-align:top;text-align:right;padding:0px;background-repeat:no-repeat;";
if(chIsIE6){
	chromeBrandTd+="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+chImgLogo.src+"',sizingMethod='image');";
	chromeSearchTd+="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+chromeSearchBgImg+"',sizingMethod='image');";
}else{
	chromeBrandTd+="background-image:url('"+chImgLogo.src+"'); ";
	chromeSearchTd+="background-image:url('"+chromeSearchBgImg+"'); ";
}
chromeMidPlayTd+="background-image:url('"+chImgExpBg.src+"'); ";
chromeMidExpTd+="background-image:url('"+chImgExpBg.src+"'); ";
chromeMidPlayOnStateTd+="background-image:url('"+chImgExpOnSt.src+"'); ";
chromeMidExploreOnStateTd+="background-image:url('"+chImgExpOnSt.src+"'); ";
chromeBrandCon="position:relative;"
chromeLinkDiv="position:relative;height:12px;z-index:150;top:"+chromeLinkOffset+"px;padding:0px;";
chromeLinkShPlayDiv="position:relative;height:12px;z-index:140;top:"+chromeLinkShOffset+"px;left:1px;color:#ffffff;padding:0px;background-color:transparent;";
chromeLinkShExploreDiv="position:relative;height:12px;z-index:140;top:"+chromeLinkShOffset+"px;left:1px;color:#000000;padding:0px;background-color:transparent;";
chromePlayLinkTextStyle="font:normal normal bold 10px/normal Arial;text-decoration:none;padding:0px;letter-spacing:0px;";
chromeExploreLinkTextStyle="font:normal normal bold 10px/normal Arial;text-decoration:none;padding:0px;letter-spacing:0px;";
chromeContentDivider="position:relative;width:1px;height:"+chromeHeight+"px;padding:0px;";
chromeContentDividerTd="position:relative;width:1px;height:"+chromeHeight+"px;padding:0px;";
chromeSearchTextField="position:relative;top:1px;left:-16px;border:none;padding:0px;";
chromeSearchInput="width:87px;height:12px;font:normal normal bold 9px/normal Arial;border:none;color:#C0C0C0;background-color:white;padding:0px;margin:0px;";
chromeSearchGoBtn="position:relative; top:7px; left:-3px; border:none; background-color:none; padding:0px; ";
chromeSearchGoBtnCls="width:26px; height:17px; border:none; background-color:transparent; padding:0px; ";

if(chromeDebug){document.write("<div style='position:absolute;z-index:200;top:100px;left:0px;width:400px;font:bold 9px arial;padding:5px;border:1px solid red;background-color:white;text-align:left;color:red;'>BEGIN<br><br>Browser: "+navigator.userAgent+"<br><br>Browser System ID: "+chSysId+"<br><br>Chrome width: "+chromeWidth+"<br><br>Chrome links padding: "+chromeLinksPadding+"<br><br>Chrome Link Offset: "+chromeLinkOffset+"<br><br>Chrome image path: "+chromeImgPath+"<br><br>Valid Chrome Color: "+chIsValidColor+"<br><br>Chrome Color: "+chromeColor+"<br><br>Chrome Color Final: "+chromeClrFin+"<br><br>Chrome Location On State: "+chCurOnStateLink+"<br><br>END</div>");}
chDcWrtInf+="<style type='text/css'>";
chDcWrtInf+="a.chromePlayLink,a.chromePlayLink:hover,a.chromePlayLink:active,a.chromePlayLink:visited,a.chromeExploreLink,a.chromeExploreLink:hover,a.chromeExploreLink:active,a.chromeExploreLink:visited,a.chromePlayLink,a.chromePlayLinkOnState,a.chromePlayLinkOnState:hover,a.chromePlayLinkOnState:active,a.chromePlayLinkOnState:visited,a.chromeExploreLinkOnState,a.chromeExploreLinkOnState:hover,a.chromeExploreLinkOnState:active,a.chromeExploreLinkOnState:visited{padding:0px !important;text-decoration:none !important;background-color:transparent !important; }";
chDcWrtInf+="a.chromePlayLink:hover{color:#012468 !important;}";
chDcWrtInf+="a.chromeExploreLink:hover{color:#ffffff !important;}";

chDcWrtInf+="a.chromePlayLinkOnState:hover{color:#012468 !important;}";
chDcWrtInf+="a.chromeExploreLinkOnState:hover{color:#ffffff !important;}";
chDcWrtInf+="a.chromePlayLinkOnState,a.chromePlayLinkOnState:active,a.chromePlayLinkOnState:visited{color:#012468 !important;}";
chDcWrtInf+="a.chromeExploreLinkOnState,a.chromeExploreLinkOnState:active,a.chromeExploreLinkOnState:visited{color:#ffffff !important;}";

chDcWrtInf+="a.chromePlayLink,a.chromePlayLink:active,a.chromePlayLink:visited{color:#012468 !important;}";
chDcWrtInf+="a.chromeExploreLink,a.chromeExploreLink:active,a.chromeExploreLink:visited{color:#ffffff !important;}";
chDcWrtInf+="</style>";  //#fff55c
//OPEN MAIN TABLE
chDcWrtInf+='<form method="get" action="http://disney.go.com/search" style="margin:0px; padding:0px;" onSubmit="chTrackSearch(this)">';
chDcWrtInf+='<table width="'+chromeWidth+'" height="'+chromeHeight+'" cellspacing="0" cellpadding="0" align="center" border="0" style="'+chromeMainTable+'"><tr>';
//DCOM LOGO
chDcWrtInf+='<td width=""+chromeDLogoWidth+"" height="'+chromeHeight+'" style="'+chromeBrandTd+'">';
if(!noLinksChrome){chDcWrtInf=chDcWrtInf+'<div style="'+chromeBrandCon+'"><a href="http://disney.go.com" style="position:relative;background-color:transparent !important;" name="&lid=chrome_midplay_home_na&lpos=chrome_midplay_home_"><img src="'+chromeImgPath+'/clear.gif" width="70" height="25" border="0"></a></div>';}
chDcWrtInf+='</td>';

if(!noLinksChrome){
	//PLAY
	chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeContentDividerTd+'"><span style="'+chromeContentDivider+'"><img src="'+chImgExpDiv.src+'" width="1" height="'+chromeHeight+'" border="0"></span></td>';
	for(i=0;i<chromePlayLinks.length;i++){
		chromeTmpStr=chromePlayLinks[i];
		chromeSplitStr=chromeTmpStr.split("|");
		chLnkId=chRemoveSpaces(chromeSplitStr[0]);
		chLnkHBId=chSpace2Plus(chromeSplitStr[0]);
		if(chCurOnStateLink==chromeSplitStr[0]){
			chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeMidExploreOnStateTd+'" id="'+chLnkId+'ExploreCell">';
			chDcWrtInf+='<div style="'+chromeLinkDiv+'"><a href="'+chromeSplitStr[1]+'" class="chromeExploreLinkOnState" id="chromeLink'+chLnkId+'" target="_top" name="&lid=chrome_midplay_'+chLnkId.toLowerCase()+'_na&lpos=chrome_midplay_'+chLnkId.toLowerCase()+'_" onMouseOver="chOnState(\''+chLnkId+'ExploreCell\')" onMouseOut="chOffState(\''+chLnkId+'ExploreCell\')"><span style="'+chromeExploreLinkTextStyle+'">'+chromeSplitStr[0]+'</span></a></div>';
		} else {
			chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeMidExpTd+'" id="'+chLnkId+'ExploreCell">';
			chDcWrtInf+='<div style="'+chromeLinkDiv+'"><a href="'+chromeSplitStr[1]+'" class="chromeExploreLink" id="chromeLink'+chLnkId+'" target="_top" name="&lid=chrome_midplay_'+chLnkId.toLowerCase()+'_na&lpos=chrome_midplay_'+chLnkId.toLowerCase()+'_" onMouseOver="chOnState(\''+chLnkId+'ExploreCell\')" onMouseOut="chOffState(\''+chLnkId+'ExploreCell\')"><span style="'+chromeExploreLinkTextStyle+'">'+chromeSplitStr[0]+'</span></a></div>';
		}
		if(chromeClrFin=="lightgrey"){
			chDcWrtInf+='<div style="'+chromeLinkShExploreDiv+'"><span style="'+chromeExploreLinkTextStyle+'">'+chromeSplitStr[0]+'</span></div>';
		}
		chDcWrtInf+='</td>';
		if(i<chromePlayLinks.length){//spit out the divider
			chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeContentDividerTd+'"><span style="'+chromeContentDivider+'"><img src="'+chImgExpDiv.src+'" width="1" height="'+chromeHeight+'" border="0"></span></td>';
		}
	}
	//EXPLORE
	for(i=0;i<chromeExploreLinks.length;i++){
		chromeTmpStr=chromeExploreLinks[i];
		chromeSplitStr=chromeTmpStr.split("|");
		chLnkId=chRemoveSpaces(chromeSplitStr[0]);
		chLnkHBId=chSpace2Plus(chromeSplitStr[0]);
		if(chCurOnStateLink==chromeSplitStr[0]){
			chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeMidExploreOnStateTd+'" id="'+chLnkId+'ExploreCell">';
			chDcWrtInf+='<div style="'+chromeLinkDiv+'"><a href="'+chromeSplitStr[1]+'" class="chromeExploreLinkOnState" id="chromeLink'+chLnkId+'" target="_top" name="&lid=chrome_midexplore_'+chLnkId.toLowerCase()+'_na&lpos=chrome_midexplore_'+chLnkId.toLowerCase()+'_" onMouseOver="chOnState(\''+chLnkId+'ExploreCell\')" onMouseOut="chOffState(\''+chLnkId+'ExploreCell\')"><span style="'+chromeExploreLinkTextStyle+'">'+chAddNbsp(chromeSplitStr[0])+chromeSplitStr[0]+chAddNbsp(chromeSplitStr[0])+'</span></a></div>';
		} else {
			chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeMidExpTd+'" id="'+chLnkId+'ExploreCell">';
			chDcWrtInf+='<div style="'+chromeLinkDiv+'"><a href="'+chromeSplitStr[1]+'" class="chromeExploreLink" id="chromeLink'+chLnkId+'" target="_top" name="&lid=chrome_midexplore_'+chLnkId.toLowerCase()+'_na&lpos=chrome_midexplore_'+chLnkId.toLowerCase()+'_" onMouseOver="chOnState(\''+chLnkId+'ExploreCell\')" onMouseOut="chOffState(\''+chLnkId+'ExploreCell\')"><span style="'+chromeExploreLinkTextStyle+'">'+chAddNbsp(chromeSplitStr[0])+chromeSplitStr[0]+chAddNbsp(chromeSplitStr[0])+'</span></a></div>';
		}
		if(chromeClrFin=="lightgrey"){
			chDcWrtInf+='<div style="'+chromeLinkShExploreDiv+'"><span style="'+chromeExploreLinkTextStyle+'">'+chromeSplitStr[0]+'</span></div>';
		}
		chDcWrtInf+='</td>';
		if(i<chromeExploreLinks.length){//spit out the divider
			chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeContentDividerTd+'"><span style="'+chromeContentDivider+'"><img src="'+chImgExpDiv.src+'" width="1" height="'+chromeHeight+'" border="0"></span></td>';
		}
	}
} else {
	chDcWrtInf+='<td height="'+chromeHeight+'" style="'+chromeMidExpTd+'"><img src="'+chromeImgPath+'/clear.gif" width="500" height="'+chromeHeight+'" border="0"></td>';
}
//SEARCH
chDcWrtInf+='<td width="'+chromeSearchWidth+'" height="'+chromeHeight+'" style="'+chromeSearchTd+'">';
if(!noLinksChrome){
	chDcWrtInf+='<span style="'+chromeSearchTextField+'"><input type="text" name="q" value="Search Disney.com" onClick="this.value=\'\'" style="'+chromeSearchInput+'"></span>';
	chDcWrtInf=chDcWrtInf+'<span style="'+chromeSearchGoBtn+'">';
	if(chIsIE6)chDcWrtInf=chDcWrtInf+'<input type="image" value="Go" src="'+chromeImgPath+'/clear.gif" alt="Go" style="'+chromeSearchGoBtnCls+'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+chromeImgPath+'/goBtn.png\',sizingMethod=\'image\')">';
	else chDcWrtInf=chDcWrtInf+'<input type="image" value="Go" src="'+chromeImgPath+'goBtn.png" alt="Go" style="'+chromeSearchGoBtnCls+'">';
	chDcWrtInf=chDcWrtInf+'</span>';
}
chDcWrtInf+='</td>';
//CLOSE MAIN TABLE
chDcWrtInf+='</tr></table></form>';
/****** WRITE OUT CHROME HERE ******/
document.write(chDcWrtInf);
