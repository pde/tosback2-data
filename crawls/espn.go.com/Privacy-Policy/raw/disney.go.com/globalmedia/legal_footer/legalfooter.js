/****************************************************************/
/*  Disney.com Legal Footer
/*  Updated 2011/12/27 by DTSS PS - New IBA link URL
/*  DO NOT EDIT OR MODIFY WITHOUT QA ENGINEERING APPROVAL
/*  CONTACT QA ENGINEERING FOR ISSUES
/*  NOTE: This file should only be used on corporate.disney.go.com
/****************************************************************/

var lfIsValidColor=false,lfDcWrtInf="";
var _cFURL=location.href,isThisPageURL=_cFURL.toLowerCase(),ppLink="",lgCDSIPQuery="0";
var lgProtocol=window.location.protocol.toString()
var lfDCOM3 = false;

if (isThisPageURL.indexOf('?') != -1) {
	isThisPageURL = isThisPageURL.substr(0, isThisPageURL.indexOf('?'));
}

/*********
Updated Privacy Policy and Terms Of Use link style
Set this to true to change the privacy policy link to BOLD and RED; false for normal
**********/
var updatePrivacyPolicyRED=false;
var privacyPolicyText="Privacy Policy/Your California Privacy Rights";
var IBAText="Interest-Based Ads";

var termsOfUseRED=false;
var termsOfUseText="Terms of Use";

function lfCheckValidColor(hexColor){var strPattern=/^#([0-9a-f]{1,2}){3}$/i; lfIsValidColor=strPattern.test(hexColor); return lfIsValidColor;}
function SetFooterOut(linkOut){try{hitbox.Footer_hbLink(linkOut);}catch(e){}}
function isThisPage(identifier){return(isThisPageURL.indexOf(identifier)!=-1)?true:false;}

legalFooterImgPath="//"+((lgProtocol=="https:")?"s":"a")+".dolimg.com/media/en-US/globalmedia/legal_footer/images";
var lFArVersion=navigator.appVersion.split("MSIE"),lFVersion=parseFloat(lFArVersion[1]),lFBrowserAgent=navigator.userAgent,legalFooterWidth=770;
try{if(!legalFooterColor){legalFooterColor="#000000";}}catch(e){var legalFooterColor="#000000";}
try{if(lFMCFtr){lFMCFtr=true;}}catch(e){var lFMCFtr=false;}//check for Movie Club variable.
try{if(!lgMinLinks){lgMinLinks=false;}}catch(e){var lgMinLinks=false;}
try{if(!lfCatLinks){lfCatLinks=false;}}catch(e){var lfCatLinks=false;}
try{if(!legalFooterCat){legalFooterCat="home";}}catch(e){var legalFooterCat="home";}
try{if(legalFooterDCOM3){lfDCOM3=legalFooterDCOM3;}}catch(e){}
legalFooterCat=legalFooterCat.toLowerCase();
lfCheckValidColor(legalFooterColor); if(!lfIsValidColor){legalFooterColor="#000000";}
try{if(chromeWidth!=null){legalFooterWidth=chromeWidth;}}catch(e){}
try{if(!noLinksChrome){noLinksChrome=false}}catch(e){noLinksChrome=false}
try{if(lgMinLinks||noLinksChrome){lgCDSIPQuery="1"}}catch(e){}
var legalFooterLineWidth=0;
try{if(legalFtrLine1==null){legalFtrLine1="<span style='font-weight:bold;'>"+document.title+"</span>";}}
catch(e){try{if(legalFtrOpts){legalFtrLine1="<span style='font-weight:bold;'>"+document.title+"</span>";}}catch(e){}}

//Do Privacy Policy Stuff
var lgPrivacyPolicyMap = new Array(
	"pp_abccng|disney.go.com/disneychannel;disney.go.com/playhouse;psc.disney.go.com/abcnetworks/toondisney;register.go.com/disneychannel/;",
	"pp_dccs|disney.go.com/visa;disneyrewards.disney.go.com;",
	"pp_bvtg|disney.go.com/disneytheatrical;register.go.com/disneytheatrical;register.go.com/disney/disneyonice/;disney.go.com/theatre;",
	"pp_ddrp|disney.go.com/disneyartclassics;",
	"pp_bvhe|disneyvideos.disney.go.com;register.go.com/bvhe/;",
	"pp_bvm|disney.go.com/disneyadventures;disney.go.com/disneymagazine;",
	"pp_wdpro|eventservices.disney.go.com;disney.go.com/eventservices;disneyland.disney.go.com;disneyworld.disney.go.com;disneycruise.disney.go.com;abd.disney.go.com;disneyworldsports.disney.go.com;disneyweddings.go.com;vmk.disney.go.com;disneymeetings.disney.go.com;disneymagicalbeginnings.com;honeymoonregistry.disney.go.com;disneylandgradnite.com;destinations.disney.go.com;disneyeverest.com;secure.disney.go.com/tickets/en_us/index;secure.disney.go.com/registration/sites/dyp/;disneylandyouthprograms.com;www.disneylandmagicmusicdays.com;",
	"pp_dvc|dvc.disney.go.com;disney.go.com/dvc/;",
	"pp_dsi|disneyshopping.go.com;disneystore.com;"
); 
function lgSetPPQuery(){
	for(var i=0; i<lgPrivacyPolicyMap.length; i++){
		var tmpSlt=lgPrivacyPolicyMap[i].split("|");
		var tmpUrls=tmpSlt[1].split(";");
		for(var j=0;j<tmpUrls.length;j++){
			if(isThisPageURL.indexOf(tmpUrls[j])!=-1&&tmpUrls[j]!=""){
				ppQuery=tmpSlt[0];
			}
		}
	}
}
ppQuery="pp";
lgSetPPQuery();
ppLink="http://corporate.disney.go.com/corporate/"+ppQuery+".html"
ppLinkShop="http://corporate.disney.go.com/corporate/pp_dsi.html"
//Do Legal Footer Image Stuff
if(isThisPage("/disneypictures/")||isThisPage("disneyvideos.disney.go.com")||isThisPage("disney.videos.go.com")||isThisPage("mydisneymovies.go.com")||isThisPage(".com/movies/")||legalFooterCat=="movies"){
	legalFooterImg="movies.png";//Movies
	legalFooterImgLink="http://home.disney.go.com/movies/index";
}else if(isThisPage("disney.go.com/games")||isThisPage("/blast")||isThisPage("playhouse.go.com")||isThisPage("play.toontown.com")||isThisPage("vmk.disney.go.com")||isThisPage("disney.go.com/webtoons")||isThisPage("disney.go.com/surfswell")||isThisPage("disney.go.com/hotshot")||isThisPage("buenavistagames")||isThisPage("disney.go.com/features/souvenears/")||isThisPage("/disneyxd")||isThisPage("disney.go.com/downloads")||isThisPage("disney.go.com/gamecafe")||isThisPage("spapps.go.com/downloads")||isThisPage("register.go.com/downloads2")||legalFooterCat=="games"){
	legalFooterImg="games.png";	//Games
	legalFooterImgLink="http://disney.go.com/games/";
}else if(isThisPage("radio.disney.go.com")||isThisPage("disney.go.com/disneyrecords/")||isThisPage("disney.go.com/music/")||isThisPage(".com/music/")||legalFooterCat=="music"){
	legalFooterImg="music.png";	//Music
	legalFooterImgLink="http://home.disney.go.com/music/index";
}else if(isThisPage("disney.go.com/theatre/")||isThisPage("disneyonice.disney.go.com")||isThisPage("disney.go.com/disneylive/")||isThisPage(".com/liveevents/")||legalFooterCat=="liveevents"){
	legalFooterImg="liveevents.png";	//Live Events
	legalFooterImgLink="http://home.disney.go.com/liveevents/index";
}else if(isThisPage("disneyparks.disney.go.com")||isThisPage("disneyworld.disney.go.com")||isThisPage("disneyland.disney.go.com")||isThisPage("disneycruise.disney.go.com")||isThisPage("dvc.disney.go.com")||isThisPage("abd.disney.go.com")||isThisPage("dvc.disney.go.com")||isThisPage("disneycruise.disney.go.com")||isThisPage("disneymeetings.disney.go.com")||isThisPage("disneyyouthgroups.disney.go.com")||isThisPage("disneyworldsports.disney.go.com")||isThisPage("disneyweddings.")||isThisPage("disneygolf.")||isThisPage(".com/travel/")||legalFooterCat=="travel"){
	legalFooterImg="travel.png";	//Travel
	legalFooterImgLink="http://home.disney.go.com/travel/index";
}else if(isThisPage("disneyshopping.go.com")||isThisPage("disney.go.com/visa")||isThisPage("disney.go.com/disneybooks")||isThisPage("disney.go.com/disneygiftcard")||isThisPage("eventservices.disney.go.com/pintrading/")||isThisPage("disney.go.com/dcards")||isThisPage("disney.go.com/disneyadventures/")||isThisPage(".com/shopping/")||isThisPage("disneystore.com")||legalFooterCat=="shop"){
	legalFooterImg="shop.png";	//Shop
	legalFooterImgLink="http://www.disneystore.com";
}else if(isThisPage("disneymobile.go.com")||isThisPage("mobile.disney.go.com")||isThisPage(".com/mobile/")||legalFooterCat=="mobile"){
	legalFooterImg="mobile.png";	//Mobile
	legalFooterImgLink="http://home.disney.go.com/mobile/index";
}else if(isThisPage("/disneychannel")||isThisPage("tv.disney.go.com")||isThisPage(".com/tv/")||isThisPage("playhouse/today")||isThisPage(".com/abcnetworks/")||legalFooterCat=="dctvnetwork"){
	legalFooterImg="disneychannel_tv_network.png";	//DC&TV
	legalFooterImgLink="http://home.disney.go.com/tv/index";
}else if(isThisPage("disney.go.com/characters")){
	legalFooterImg="characters.png";	//Characters
	legalFooterImgLink="http://disney.go.com/characters";
}else if(isThisPage("disney.go.com/mypage")){
	legalFooterImg="mypage.png";	//My Page
	legalFooterImgLink="http://disney.go.com/mypage";
}else if(isThisPage("disney.go.com/videos")){
	legalFooterImg="videos.png";	//Videos
	legalFooterImgLink="http://disney.go.com/videos";
}else if(isThisPage("disney.go.com/create")) {
	legalFooterImg="disney_footer_create.png";
	legalFooterImgLink="http://disney.go.com/create";
}else if(isThisPage("disney.go.com/preschool")) {
	legalFooterImg="disney_footer_preschool.png";
	legalFooterImgLink="http://disney.go.com/preschool";
}else{
	legalFooterImg="disney_footer.png";
	legalFooterImgLink="http://disney.go.com/index";
}

var copyRight="",copyRightType="",ftTransfer="http://transfer.go.com/cgi/transfer.dll?srvc=dis&goto=";
try{if(legalFtrCpyRgt){copyRight=legalFtrCpyRgt;}}catch(e){copyRight="&copy; Disney. All rights reserved.";}
//Spit out the legal footer...
dolFooterMainTable="width:"+legalFooterWidth+"px; text-align:center; padding:0px; margin:10px 0px; background:transparent none; border:none; ";
dolFooterTableCell="padding:0px; margin:12px 0px; background:transparent none; border:none; ";
dolFooterSt="font-family:verdana,helvetica; color:"+legalFooterColor+"; background-color:transparent; text-align:center; font-size:10pt; border:none; "
dolFooterSmallSt="font-family:verdana,helvetica; color:"+legalFooterColor+"; background-color:transparent; text-align:center; font-size:10px; border:none; "
dolFooterLnk="font-size:10pt !important; ";
dolFooterLnkRed="color: #FF0000 !important; font-size:10pt !important; font-weight: bold;";
dolFooterSmallLnk="font-size:10px !important; ";
lfDcWrtInf+="<style>a.dolFooterLnk,a.dolFooterLnk:visited,a.dolFooterLnk:hover,a.dolFooterLnk:active,a.dolFooterSmallLnk,a.dolFooterSmallLnk:visited,a.dolFooterSmallLnk:hover,a.dolFooterSmallLnk:active{color:"+legalFooterColor+" !important;background-color:transparent !important;text-decoration:underline;}a.dolFooterLnkRed,a.dolFooterLnkRed:visited,a.dolFooterLnkRed:hover,a.dolFooterLnkRed:active{color:#FF0000 !important;background-color:transparent !important;text-decoration:underline;}</style>";
lfDcWrtInf+='<div id="legalFooterMainDiv" align="center"><table cellspacing="0" cellpadding="0" align="center" style="'+dolFooterMainTable+'"><tbody>';
try{if(legalFtrLine1.toString()!="undefined")lfDcWrtInf+='<tr><td style="'+dolFooterSt+'" colspan="3">'+legalFtrLine1+'</td></tr>';}catch(e){}
try{
	if(legalFtrOpts){
		lfDcWrtInf+='<tr><td style="'+dolFooterSt+'" colspan="3">';
		for(i=0;i<legalFtrOpts.length;i+=2){
			lfDcWrtInf+='<a href="'+legalFtrOpts[i+1]+'" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'">'+legalFtrOpts[i]+'</a>';
			if(i<legalFtrOpts.length-2)lfDcWrtInf+='&nbsp;|&nbsp;';
		}
		lfDcWrtInf+='</td></tr>';
	}
}catch(e){}
try{if(legalFtrLine2.toString()!="undefined")lfDcWrtInf+='<tr><td style="'+dolFooterSt+'" colspan="3">'+legalFtrLine2+'</td></tr>';}catch(e){}
legalFooterHostName=location.hostname;
lgFtHrLn='<hr style="border: 0; border-top: 1px solid #A3A3A3; height: 0px; background: #A3A3A3;">';
if(copyRight.indexOf("Disney")!=-1||copyRight.indexOf("Buena Vista Home Entertainment")!=-1||copyRight.indexOf("Buena Vista Pictures Marketing")!=-1||copyRight.indexOf("Baby Einstein Company")!=-1){   /******** USE Disney Logo *********/
	legalFooterLineWidth=(parseInt(legalFooterWidth)-205)/2;
	lfDcWrtInf+='<tr><td style="width:'+legalFooterLineWidth+'px;text-align:center;">'+lgFtHrLn+'</td><td style="width:205px;text-align:center;">';
	if(!lgMinLinks){lfDcWrtInf+='<a href="'+legalFooterImgLink+'" name="&lid=footer_legal_image_'+legalFooterCat+'&lpos=footer_legal" class="dolFooterLnk" '+((lfDCOM3)?'id=\'legalFooterImageAnchor\'':'')+'>';}
	if(lfDCOM3){lfDcWrtInf+="<div id='legalFooterImage'>";}
	if((lFVersion>=5.5&&lFVersion<7)&&(document.body.filters)){
		lfDcWrtInf+='<img src="'+legalFooterImgPath+'/clear.gif" border="0" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+legalFooterImgPath+'/'+legalFooterImg+'\')" id="lgDcomFtrImg">';
	} else {
		lfDcWrtInf+='<img src="'+legalFooterImgPath+'/'+legalFooterImg+'" border="0" id="lgDcomFtrImg">';
	}
	if(lfDCOM3){lfDcWrtInf+="</div>";}
	if(!lgMinLinks){lfDcWrtInf+='</a>';}
	lfDcWrtInf+='</td><td style="width:'+legalFooterLineWidth+'px;text-align:center;">'+lgFtHrLn+'</td></tr>';
}else{ /******** USE Company Logo *********/
	legalFooterLineWidth=(parseInt(legalFooterWidth)-150)/2;
	lfDcWrtInf+='<tr><td style="width:'+legalFooterLineWidth+'px;text-align:center;">'+lgFtHrLn+'</td><td style="width:150px;text-align:center;">';
	if((lFVersion>=5.5&&lFVersion<7)&&(document.body.filters)){
		lfDcWrtInf+='<img src="'+legalFooterImgPath+'/clear.gif" border="0" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+legalFooterImgPath+'/disneyCO_footer.png\')">';
	} else {
		lfDcWrtInf+='<img src="'+legalFooterImgPath+'/disneyCO_footer.png" border="0">';
	}
	lfDcWrtInf+='</td><td style="width:'+legalFooterLineWidth+'px;text-align:center;">'+lgFtHrLn+'</td></tr>';
}
lfDcWrtInf+='<tr><td align="center" style="width:'+legalFooterWidth+'px; '+dolFooterSt+'" colspan="3" '+((lfDCOM3)?'id=\'lgContent\'':'')+'>';
if(!lgMinLinks){
	lfDcWrtInf+='<a href="'+ftTransfer+'http://home.disney.go.com/guestservices&name=g_legalFooter_guestservices" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_GuestServices&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgGuestServices\'>':'')+'Disney.com Guest Services/Help'+((lfDCOM3)?'</span>':'')+'</a>&nbsp;|&nbsp;';
	lfDcWrtInf+='<a href="'+ftTransfer+'http://home.disney.go.com/sitemap/&name=g_legalFooter_sitemap" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_SiteMap&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgSiteMap\'>':'')+'Site Map'+((lfDCOM3)?'</span>':'')+'</a><br />';
}

/******** Privacy Poliy 2009/6/11 ********/
if(isThisPage("www.disneystore.com")){
if(!lFMCFtr){lfDcWrtInf+='<a href="'+ftTransfer+ppLinkShop+'&name=g_legalFooter_privacypolicy" target="_top" class="dolFooterLnk'+(updatePrivacyPolicyRED?"Red":"")+'" style="'+(updatePrivacyPolicyRED?dolFooterLnkRed:dolFooterLnk)+'" name="&lid=footer_legal_PrivacyPolicy&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgPrivacyPolicy\'>':'')+privacyPolicyText+'</a>&nbsp;|&nbsp;';}
} else {
if(!lFMCFtr){lfDcWrtInf+='<a href="'+ftTransfer+ppLink+'&name=g_legalFooter_privacypolicy" target="_top" class="dolFooterLnk'+(updatePrivacyPolicyRED?"Red":"")+'" style="'+(updatePrivacyPolicyRED?dolFooterLnkRed:dolFooterLnk)+'" name="&lid=footer_legal_PrivacyPolicy&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgPrivacyPolicy\'>':'')+privacyPolicyText+'</a>&nbsp;|&nbsp;';}
}

/******** Interest Based Ads 2011/12/27 ********/

lfDcWrtInf+= "<a href=\"http://preferences.truste.com/2.0/?type=disneycolor&affiliateId=115\" style=\"font-size:10pt !important;\" class=\"dolFooterLnk\" onclick=\"window.open('http://preferences.truste.com/2.0/?type=disneycolor&affiliateId=115','popup','width=986,height=878,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0'); return false\">Interest-Based Ads</a>&nbsp;|&nbsp;";

/******** Terms of Use 2009/6/11 ********/
lfDcWrtInf+='<a href="http://corporate.disney.go.com/corporate/terms.html" target="_top" class="dolFooterLnk" style="'+(termsOfUseRED?dolFooterLnkRed:dolFooterLnk)+'" name="&lid=footer_legal_TermsOfUse&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgTermsOfUse\'>':'')+termsOfUseText+'</a>&nbsp;|&nbsp;';
lfDcWrtInf+='<a href="'+ftTransfer+'http://home.disney.go.com/guestservices/safety?qp='+lgCDSIPQuery+'&name=g_legalFooter_internetsafety" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_InternetSafety&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgInternetSafety\'>':'')+'Internet Safety</a>';
if(lfCatLinks){
	lfDcWrtInf+='<br /><a href="'+ftTransfer+'http://corporate.disney.go.com/index.html&name=g_legalFooter_corpinfo" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_CorpInfo&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgCorporateInfo\'>':'')+'Corporate Info'+((lfDCOM3)?'</span>':'')+'</a>&nbsp;|&nbsp;';
	lfDcWrtInf+='<a href="'+ftTransfer+'http://home.disney.go.com/guestservices/legalnotices&name=g_legalFooter_legalnotices" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_LegalNotices&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgLegalNotices\'>':'')+'Legal Notices'+((lfDCOM3)?'</span>':'')+'</a>&nbsp;|&nbsp;';
	lfDcWrtInf+='<a href="'+ftTransfer+'http://home.disney.go.com/more&name=g_legalFooter_moredsites" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_MoreDisneySites&lpos=footer_legal">'+((lfDCOM3)?'<span id=\'lgMoreDisneySites\'>':'')+'More Disney Sites'+((lfDCOM3)?'</span>':'')+'</a><br />';
}
/******** Added Disney Rewards Visa link on Search pages 5/16/07 ********/
if(isThisPage("search.disney.go.com")||isThisPage("disney.go.com/search")){lfDcWrtInf+='<br /><a href="'+ftTransfer+'http://disney.go.com/visa/today/index.html?CELL=641W19&name=g_legalFooter_DisneyVisa" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_DisneyVisa&lpos=footer_legal"><span style="font-style:italic;">Disney Rewards</span>&reg; Visa&reg; Card</a><br />';}

/******** Added Disney Rewards Visa link on ForYou 4/22/09 ********/
if(isThisPage("disney.go.com/foryou/disneyfans")){lfDcWrtInf+='<br /><a href="'+ftTransfer+'http://disney.go.com/visa/today/index.html?CELL=641W19&name=g_legalFooter_DisneyVisa" target="_top" class="dolFooterLnk" style="'+dolFooterLnk+'" name="&lid=footer_legal_DisneyVisa&lpos=footer_legal"><span style="font-style:italic;">Disney Rewards</span>&reg; Visa&reg; Card</a>';}

lfDcWrtInf+='<br /><span style="'+dolFooterSmallSt+'" '+((lfDCOM3)?'id=\'lgCopyRight\'':'')+'>'+copyRight+'</span></td></tr><tbody></table></div><br />';

document.write(lfDcWrtInf);
/***************  CEREBELLUM SCRIPT *****************/
document.write('<scr'+'ipt src="//clog.go.com/log?srvc=dis&a=5" type="text/javascript"></scr'+'ipt>');
