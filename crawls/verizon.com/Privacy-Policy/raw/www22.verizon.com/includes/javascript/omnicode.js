
/* SiteCatalyst code version: H.23.3.
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/***************************** REVISIONS *****************************
2011-07-12
Setup Initial Functionality
2012-01-24
Added POST Functionality
*/

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */

function scfObj(n,d){
	var p,i,x;if(!d)d=document;if((p=n.indexOf('?'))>0&&parent.frames.length){
	d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
	if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=scfObj(n,d.layers[i].document);
	if(!x&&d.getElementById)x=d.getElementById(n);return x;
}
function scStrip(a){
	a=a.split('Verizon | ').join('');
	a=a.split('verizon | ').join('');
	a=a.split('|').join('');
	a=a.split('(').join('');
	a=a.split(')').join('');
	a=a.split('&amp;').join('and');
	a=a.split('&reg;').join('');
	a=a.split('&trade;').join('')
	a=a.split('&#36;').join('');
	a=a.split('&#8482;').join('');
	a=a.split("'").join("");
	a=a.split('©').join('');
	a=a.split('\u00A9').join(''); 
	a=a.split('®').join('');
	a=a.split('\u00AE').join(''); 
	a=a.split('\u2122').join('');  
	a=a.split('™').join('');
	a=a.split('\u2013').join('');  
	a=a.split('–').join('');
	a=a.split('\u2014').join('');  
	a=a.split('—').join('');
	a=a.split('\u2022').join('');  
	a=a.split('•').join('');
	a=a.split('\u00F1').join('');  
	a=a.split('ñ').join('');
	a=a.split(' & ').join(' and ');
	a=a.split('&').join('');
	a=a.split('#').join('');
	a=a.split('$').join('');
	a=a.split('%').join('');
	a=a.split('^').join('');
	a=a.split('*').join('');
	a=a.split(':').join('');
	a=a.split('!').join('');
	a=a.split('~').join('');
	a=a.split('<').join('');
	a=a.split('>').join('');
	a=a.split(';').join('');
	return a;
}

/******   custom globals start   ******/
var strSCapp='[noapp]';
var strSCappname='[noname]';
var strSCbizunit='[nobizunit]';
var strSClineofbiz='[nolineofbusiness]';
if(typeof(scType)=='undefined'){scType='[notype]';}
if(scType=='res'){strSCapp='res';strSCappname='residential';strSClineofbiz='residential';strSCbizunit='residential';}
else if(scType=='corp'){strSCapp='crp';strSCappname='corporate';strSClineofbiz='corporate';}
else if(scType=='smb'){strSCapp='smb';strSCappname='business';strSClineofbiz='business';strSCbizunit='small business';}
else if(scType=='myvz20'){strSCapp='myvz';strSCappname='myverizon';strSClineofbiz='myverizon';strSCbizunit='res myverizon';}
else if(scType=='rord'){strSCapp='res';strSCappname='ordering';strSClineofbiz='residential';strSCbizunit='res ordering';}
else if(scType=='myvz20ord'){strSCapp='myvz';strSCappname='ordering';strSClineofbiz='myverizon';strSCbizunit='res ordering';}

var scLHR=window.location.href;
var scLH=window.location.hostname;
var scLP=window.location.pathname;
var scLHRnogoto=scLHR.toLowerCase().substring(0,(scLHR.search(/goto=/)>-1)?scLHR.search(/goto=/):999);
var scIsPrd=false;
var scPS=new Array('www22.verizon.com','smallbiz.verizonmarketing.com','smallbusiness.verizon.com','mediumbusiness.verizon.com','www.verizonbusiness.com','www.verizonmarketing.com','search.verizon.com','espanol.verizon.com','promo.verizon.com','promo.verizon.koreansite.us.com','promo.verizon.chinesesite.us.com','promopage.verizon.com','verizon.koreansite.us.com','verizon.chinesesite.us.com','vas.verizon.com','forums.verizon.com','wirelesssupport.verizon.com','newscenter.verizon.com','investor.verizon.com','responsibility.verizon.com','foundation.verizon.com','community.verizon.com','communities.verizon.com','referafriend.verizon.com','multimedia.verizon.com','newsfeed.verizon.com','www36.verizon.com','gogreen.verizon.com','myoffer.verizon.com','offer.verizon.com','signin.verizon.com','my.verizon.com','searchservices.verizon.com','media.verizon.com','webmail.verizon.com','newsroom.verizon.com','surround.verizon.com','games.verizon.com','essentialsandextras.verizon.com','auth.verizon.com','registration.verizon.com','m.verizon.com','learningcenter.verizon.com','perks.verizon.com','lookup.verizon.com','touchdownchallenge.verizon.com','youdeservebetter.verizon.com','business.verizon.com','mail.verizon.com','shop.verizon.com','disneychannelpromo.verizon.com','entertainment.verizon.com','paperfree.verizon.com','searchresults.verizon.com','musthavefios.verizon.com');
for(i=0;i<scPS.length;i++){
	var sDom=scPS[i];
	sDom=sDom.toLowerCase();
	if((scLH.toLowerCase()).indexOf(sDom)>-1){
		scIsPrd=true;
		break;
	}
}
var s_accountglob='verizontelecomglobal';
var s_accountapp='';
if(strSCapp!='[noapp]'){s_accountapp='verizontelecom'+strSCapp+'';}

var scURL=new Array(
	'smallbusiness.verizon.com/default.aspx|verizontelecomsmb|business|ghp|small business|global homepage'
	,'/home/verizonglobalhome/ghp_business.aspx|verizontelecomsmb|business|ghp|business|global homepage'
	,'/home/verizonglobalhome/ghp_business|verizontelecomsmb|business|smb|business|small business'
	,'/foryourhome/myaccount/unprotected/usermanagement/login/login.aspx|verizontelecommyvz|myverizon|ghp|res myverizon|global homepage'
	,'www22.verizon.com/foryoursmallbiz/goflow|verizontelecomsmb|business|smb|small business|ordering'
	,'mail.verizon.com,webmail.verizon.com|verizontelecommsgctr|myverizon|msg|res myverizon|msgcenter'
	,'entertainment.verizon.com|verizontelecoment|myverizon|ent|res myverizon|entertainment'
	,'|verizontelecomres|myverizon|cht|residential|chat'
	,'|verizontelecomsmb|myverizon|cht|small business|chat'
	,'|verizontelecommyvz|myverizon|cht|residential|chat'
	,'business.verizon.net|verizontelecommas|business|smp|small business|smbportal'
	,'_pagelabel=smbportal_page_newsandresources|verizontelecommas|business|nws|small business|smbportal'
	,'_pagelabel=smbportal_page_main_profnetworking|verizontelecommas|business|pnt|small business|smbportal'
	,'_pagelabel=smbportal_page_main_marketplace|verizontelecommas|business|mkt|small business|smbportal'
	,'_pagelabel=smbportal_page_main_support|verizontelecommas|business|spp|small business|smbportal'
	,'|verizontelecommas|business|app|small business|smbportal'
	,'www22.verizon.com/ondemand/|verizontelecomflx|myverizon|flx|res myverizon|flexview'
	,'www22.verizon.com/support/residential,www22.verizon.com/residentialhelp/|verizontelecomesp|myverizon|esp|residential|esupport'
	,'www22.verizon.com/customerhelp/,www22.verizon.com/smallbusiness/help/|verizontelecomesp|myverizon|esp|small business|esupport'
	,'signin.verizon.com/ssogb/|verizontelecomsmb|business|sso|small business|reg_sso'
	,'signin.verizon.com,registration.verizon.com|verizontelecomres|myverizon|sso|residential|reg_sso'
	,'www22.verizon.com/fiostv/myaccount/,www22.verizon.com/fiostv/myaccount/members,www22.verizon.com/fiostv/web/,www22.verizon.com/fiostv/web/members,www22.verizon.com/fiostv/myaccount/,www22.verizon.com/fiostv/myaccount/members,www22.verizon.com/fiostv/web/,www22.verizon.com/fiostv/web/members|verizontelecomftc|myverizon|ftc|res myverizon|fiostvcentral'
	,'_pagelabel=pws,_pagelabel=vzcp_mat_billinghistory,_pagelabel=vzcp_wifi_manage,my.verizon.com/central/portlets/broadbandwifi/hotspotsearch.jsp,my.verizon.com/central/portlets/wifi/submitwifi.jsp?mode=download|verizontelecomvzc|myverizon|vzc|res myverizon|verizoncentral'
	,'shop.verizon.com|verizontelecomshp|myverizon|shp|res myverizon|shop'
	,'my.verizon.com/whatsnext|verizontelecomwhn|myverizon|wnr|residential|whatsnext'
	,'business.verizon.com/whatsnext|verizontelecomwhn|myverizon|wns|small business|whatsnext'
	,'www22.verizon.com/products/mediamanager|verizontelecommdm|myverizon|mdm|res myverizon|mediamanager'
	,'www36.verizon.com/fiosvoice,www36.verizon.com/products/fiosvoice|verizontelecomfdv|myverizon|fdv|res myverizon|fiosdigvoice'
	,'www36.verizon.com/callassistant|verizontelecomvca|myverizon|vca|res myverizon|vzcallassist'
	,'|verizontelecommdd|myverizon|mdd|res myverizon|mediadock'
	,'|verizontelecomrap|myverizon|rap|residential|rap'
	,'|verizontelecomrap|myverizon|rap|small business|rap'
	,'forums.verizon.com,/content/sso/community.aspx|verizontelecomcfr|myverizon|cfr|res myverizon|community'
	,'|verizontelecommsm|myverizon|msm|res myverizon|multimobileaps'
	,'|verizontelecomoas|myverizon|oas|res myverizon|oas'
	,'|verizontelecomwel|myverizon|wel|res myverizon|welcomebasket'
	,'type=myvz20|verizontelecommyvz|myverizon|msv|res myverizon|varies'
	,'type=rord,www22.verizon.com/foryourhome/goflow|verizontelecomres|residential|res|res ordering|ordering'
	,'www22.verizon.com/home|verizontelecomres|residential|res|residential|residential'
);


for(i=0;i<scURL.length;i++){
	var strboolFound=false;
	var tmpArr=scURL[i].split('|');
	var arrURL=tmpArr[0].split(',');
	for(j=0;j<arrURL.length;j++){
		if(scLHRnogoto.indexOf(arrURL[j])>0 ||
			((arrURL[j].toLowerCase()).indexOf('type=')==0 && arrURL[j].toLowerCase().substring(5)==scType)){
			strboolFound=true;
		}
		if(strboolFound){
			s_accountapp=tmpArr[1];
			strSClineofbiz=tmpArr[2];
			strSCapp=tmpArr[3];
			strSCbizunit=tmpArr[4];
			strSCappname=tmpArr[5];
			break;
		}
	}
	if(strboolFound){
		break;
	}
}

if (!s_account){
	var s_account=s_accountglob+(s_accountapp!=''?','+s_accountapp:'');
	//var s_account="verizontelecomcleanup";
}

var arSCValid=new Array('verizontelecomcfr','verizontelecomcrp','verizontelecoment','verizontelecomesp','verizontelecomfdv','verizontelecomflx','verizontelecomftc','verizontelecomglobal','verizontelecommas','verizontelecommdd','verizontelecommdm','verizontelecommsgctr','verizontelecommsm','verizontelecommyvz','verizontelecomoas','verizontelecomrap','verizontelecomres','verizontelecomshp','verizontelecomsmb','verizontelecomvca','verizontelecomvzc','verizontelecomwel','verizontelecomwhn');

s_account=s_account.replace(/\s/g,'');
var arSAcc=s_account.split(',');
for(x=0;x<arSAcc.length;x++){
	var scBoolAccOK=false;
	for(i=0;i<arSCValid.length;i++){
		if(arSAcc[x].indexOf(arSCValid[i])>-1){scBoolAccOK=true;break;}
	}
	if(scBoolAccOK==false){s_account='verizontelecomcleanup';break;}
}
var s_837=s_gi(s_account)

if(s_account=="verizontelecomcleanup"){
	s_837.prop20=document.URL;
}

if(!s_837.pfxID){s_837.pfxID=strSCapp.toLowerCase();}
if(!s_837.simplepageName){s_837.simplepageName=scLP.toLowerCase();}
if(!s_837.detailpageName){s_837.detailpageName=s_837.simplepageName}
if(!s_837.prop4){s_837.prop4=scStrip(scLP.substring(0,scLP.lastIndexOf('/')));}

if(!s_837.prop2){s_837.prop2=strSCbizunit.toLowerCase();}
if(!s_837.prop6){s_837.prop6=strSClineofbiz.toLowerCase();}
if(!s_837.prop48){s_837.prop48=strSCappname.toLowerCase();}

/******   custom globals end   ******/

s_837.charSet="ISO-8859-1"
/* Conversion Config */
s_837.currencyCode="USD"
/* Link Tracking Config */
s_837.trackDownloadLinks=true
s_837.trackExternalLinks=true
s_837.trackInlineStats=true
s_837.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,xlsx,docx"
s_837.linkInternalFilters="javascript:,verizon.com"
s_837.linkLeaveQueryString=false
s_837.linkTrackVars="None"
s_837.linkTrackEvents="None"
var _lc=true;

/* Plugin Config */
s_837.usePlugins=true
function s_doPlugins(s) {
	//Raw marketing campaign tracking
	if(!s_837.campaign){
		s_837.campaign=s_837.getQueryParam('CMP');
	}
	if(!s_837.campaign){
		s_837.campaign=s_837.getQueryParam('PromoTCode');
	}
	if(!s_837.eVar37){
		s_837.eVar37=s_837.getQueryParam('incid');
	}

	if(!s_837.pageLanguage){s_837.pageLanguage="en"}
	else {s_837.pageLanguage=s_837.pageLanguage.toLowerCase()
	}
	if(!s_837.prop38){s_837.prop38="vz"}
	else {s_837.prop38=s_837.prop38.toLowerCase()
	}

	//validate prefix
	if(!s_837.pfxID){s_837.pfxID="[unset]"}
	else {s_837.pfxID=s_837.pfxID.toLowerCase()
	}
	if(!s_837.simplepageName){s_837.simplepageName="[unset]"}
	else {s_837.simplepageName=s_837.simplepageName.toLowerCase()
	}
	if(!s_837.detailpageName){s_837.detailpageName=document.URL.split("?")[0].toLowerCase()}
	else {s_837.detailpageName=s_837.detailpageName.toLowerCase()
	}
	s_837.pageName=s_837.pfxID + "| " + s_837.simplepageName
	s_837.eVar30="D=pageName"
	s_837.prop1=s_837.pfxID  + "| " + s_837.detailpageName
	s_837.eVar1="D=c1"

	//Check contents of c2 and c3, set for validation & set v2 and v3
	if(!s_837.prop2){s_837.prop2="[unset]"}
	else {s_837.prop2=s_837.prop2.toLowerCase()
	}
	s_837.eVar2="D=c2"
	if(!s_837.prop3){s_837.prop3="[unset]"}
	else {s_837.prop3=s_837.prop3.toLowerCase()
	}
	s_837.eVar3="D=c3"

	//Channel Tracking
	s_837.channel=s_837.prop48+"| "+s_837.prop3+"- "+s_837.pageLanguage
	s_837.channel=s_837.channel.toLowerCase();

	//Set with current content channel value from HBX
	if(!s_837.prop4){s_837.prop4="Content category not set in HBX"}
	else {s_837.prop4=s_837.prop4.toLowerCase()
	}
	s_837.eVar4="D=c4"

	//Get Profile ID
	if(!s_837.prop5){s_837.prop5="Not Available"}
	else {s_837.prop5=s_837.prop5.toLowerCase()
	}
	s_837.eVar5="D=c5"
	s_837.eVar25="D=c5"
	s_837.eVar26="D=c5"

	//Set Line of Business (LOB) change residential to [unset] when moved to GHF
	if(!s_837.prop6){s_837.prop6="residential"}
	else {s_837.prop6=s_837.prop6.toLowerCase()
	}
	s_837.eVar6="D=c6"

	//Get Offer ID
	if(!s_837.prop7){s_837.prop7="No Offer ID"}
	s_837.eVar7="D=c7"

	//Get Visitor IDs
	/*
	s_837.visID=(s_837.c_r('s_vi').substring(7,40).split('-'))
	s_837.lowID=parseInt(s_837.visID[0], 16).toString()
	s_837.highID=parseInt(s_837.visID[1], 16).toString()
	s_837.prop8=s_837.lowID + ":" + s_837.highID

	//Write the Vis ID cookies for later use with the Order Flow
	document.cookie='s_837_visidlow='+s_837.lowID
	document.cookie='s_837_visidhigh='+s_837.highID

	s_837.eVar8="D=c8"
	*/

	//Get New vs. Repeat
	s_837.prop9=s_837.getNewRepeat(365)
	s_837.eVar9="D=c9"

	//Get Registration Status
	if(!s_837.prop10){
		if(typeof(bIsLogin)!='undefined'&&bIsLogin&&typeof(bLogBiz)!='undefined'&&!bLogBiz){s_837.prop10="RES Logged In"}
		else if(typeof(bIsLogin)!='undefined'&&!bIsLogin&&typeof(bLogBiz)!='undefined'&&bLogBiz){s_837.prop10="SMB Logged In"}
		else if(typeof(bIsLogin)!='undefined'&&bIsLogin&&typeof(bLogBiz)!='undefined'&&bLogBiz){s_837.prop10="RES/SMB Logged In"}
	}
	if(!s_837.prop10){s_837.prop10="Anonymous"}
	s_837.eVar10="D=c10"

	//Link ID of the object clicked on the prior page
	if(!s_837.prop11){s_837.prop11="No Link ID"}
	else{s_837.prop11=s_837.prop11.toLowerCase()}
	s_837.eVar11="D=c11"

	//Get Link Location OR X1 PLACEMENT ID OR Widget ID
	if(!s_837.prop12){s_837.prop12="No Link Location"}
	else{s_837.prop12=s_837.prop12.toLowerCase()}
	s_837.eVar12="D=c12"

	//Get Days Since Last Visit (fix)
	s_837.prop13=s_837.getDaysSinceLastVisit('s_lv')
	s_837.eVar13="D=c13"

	// Get TimeParting, Hourly
	s_837.prop14=s_837.getTimeParting('h','-5')
	s_837.eVar14="D=c14"

	// Get TimeParting, Daily
	s_837.prop15=s_837.getTimeParting('d','-5')
	s_837.eVar15="D=c15"

	//Get Visit Number
	s_837.prop16=s_837.getVisitNum(365)
	s_837.eVar16="D=c16"

	//Get Previous Page
	s_837.prop17=s_837.getPreviousValue(s_837.pageName,'gpv_p17','')
	s_837.eVar17="D=c17"

	//Get Creative Group ID
	if(!s_837.prop18){s_837.prop18="No Creative Group ID"}
	s_837.eVar18="D=c18"

	//Get Creative ID
	if(!s_837.prop19){s_837.prop19="No Creative ID"}
	s_837.eVar19="D=c19"

	//Get URL plus page identifiable qs params and not user identifiable qs params
	//ADD getQueryParam
	if(!s_837.prop20){s_837.prop20=document.URL.split("?")[0].toLowerCase()}
	else {s_837.prop20=s_837.prop20.toLowerCase()
	}
	s_837.eVar20="D=c20"

	//Get Domain Name
	if(!s_837.prop21){s_837.prop21=document.location.host.toLowerCase()}
	s_837.eVar21="D=c21"

	//Get DMA Value
	if(!s_837.prop22){s_837.prop22="No DMA Value"}
	s_837.eVar22="D=c22"

	//Get Qualification Attempt and Result
	/*
	if(!s_837.prop23){s_837.prop23="No Qual Attempt"}
	s_837.eVar23="D=c23"
	s_837.eVar27="D=c23"
	s_837.eVar28="D=c23"
	*/

	// Get Coupon Code
	if(s_837.prop24){s_837.prop24=(s_837.prop24).toLowerCase();}
	s_837.eVar24="D=c24"

	// Get Country
	if(s_837.prop26){s_837.prop26=(s_837.prop26).toLowerCase();}

	//Alternate Campaign Stacking
	s_837.eVar29=s_837.crossVisitParticipation(s_837.campaign,'s_ev29','30','10','>','purchase','1')

	// Get Navigation Used
	if(s_837.prop35){s_837.prop35=(s_837.prop35).toLowerCase();}
	s_837.eVar35="D=c35"

	// Get Internal Search Terms
	if(s_837.prop36){s_837.prop36=(s_837.prop36).toLowerCase();}
	s_837.eVar36="D=c36"

	//Flow Name
	if(s_837.prop45){s_837.prop45=s_837.pfxID+"| "+s_837.prop45}
	s_837.eVar45="D=c45"

	// Get Qual Attempt
	if(s_837.prop46){s_837.prop46=(s_837.prop46).toLowerCase();}
	s_837.eVar46="D=c46"

	// Get Qual Response
	if(s_837.prop47){s_837.prop47=(s_837.prop47).toLowerCase();}
	s_837.eVar47="D=c47"

	// Get Name of Application
	if(s_837.prop48){s_837.prop48=(s_837.prop48).toLowerCase();}

	//Get Personalization/Channel New or Repeat Visitor
	if(s_837.prop74==1){s_837.prop74="repeat"}
	else if(s_837.prop74==0){s_837.prop74="new"}
	if(s_837.prop74)s_837.prop74=s_837.prop74.toLowerCase()
	if (!s_837.prop74)s_837.prop74="Not Available"
	s_837.eVar74="D=c74"

	//Get Verizon User ID
	if(!s_837.prop75){s_837.prop75="No Verizon UID"}
	s_837.eVar75="D=c75"

	if(!s_837.events){s_837.events="event1"}
	else{s_837.events+=",event1"}

	//Populate workstream custom converxion variables
	if(s_837.useCustom == 1){
		s_837.pfxID=(scType!='res'?s_837.pfxID+="| ":'')
		if(s_837.prop51){
			s_837.prop51=s_837.pfxID+s_837.prop51
			if(!s_837.eVar51)s_837.eVar51="D=c51"}

		if(s_837.prop52){
			s_837.prop52=s_837.pfxID+s_837.prop52
			if(!s_837.eVar52)s_837.eVar52="D=c52"}

		if(s_837.prop53){
			s_837.prop53=s_837.pfxID+s_837.prop53
			if(!s_837.eVar53)s_837.eVar53="D=c53"}

		if(s_837.prop54){
			s_837.prop54=s_837.pfxID+s_837.prop54
			if(!s_837.eVar54)s_837.eVar54="D=c54"}

		if(s_837.prop55){
			s_837.prop55=s_837.pfxID+s_837.prop55
			if(!s_837.eVar55)s_837.eVar55="D=c55"}

		if(s_837.prop56){
			s_837.prop56=s_837.pfxID+s_837.prop56
			if(!s_837.eVar56)s_837.eVar56="D=c56"}

		if(s_837.prop57){
			s_837.prop57=s_837.pfxID+s_837.prop57
			if(!s_837.eVar57)s_837.eVar57="D=c57"}

		if(s_837.prop58){
			s_837.prop58=s_837.pfxID+s_837.prop58
			if(!s_837.eVar58)s_837.eVar58="D=c58"}

		if(s_837.prop59){
			s_837.prop59=s_837.pfxID+s_837.prop59
			if(!s_837.eVar59)s_837.eVar59="D=c59"}

		if(s_837.prop60){
			s_837.prop60=s_837.pfxID+s_837.prop60
			if(!s_837.eVar60)s_837.eVar60="D=c60"}

		if(s_837.prop61){
			s_837.prop61=s_837.pfxID+s_837.prop61
			if(!s_837.eVar61)s_837.eVar61="D=c61"}

		if(s_837.prop62){
			s_837.prop62=s_837.pfxID+s_837.prop62
			if(!s_837.eVar62)s_837.eVar62="D=c62"}

		if(s_837.prop63){
			s_837.prop63=s_837.pfxID+s_837.prop63
			if(!s_837.eVar63)s_837.eVar63="D=c63"}

		if(s_837.prop64){
			s_837.prop64=s_837.pfxID+s_837.prop64
			if(!s_837.eVar64)s_837.eVar64="D=c64"}

		if(s_837.prop65){
			s_837.prop65=s_837.pfxID+s_837.prop65
			if(!s_837.eVar65)s_837.eVar65="D=c65"}

		if(s_837.prop66){
			s_837.prop66=s_837.pfxID+s_837.prop66
			if(!s_837.eVar66)s_837.eVar66="D=c66"}

		if(s_837.prop67){
			s_837.prop67=s_837.pfxID+s_837.prop67
			if(!s_837.eVar67)s_837.eVar67="D=c67"}

		if(s_837.prop68){
			s_837.prop68=s_837.pfxID+s_837.prop68
			if(!s_837.eVar68)s_837.eVar68="D=c68"}

		if(s_837.prop69){
			s_837.prop69=s_837.pfxID+s_837.prop69
			if(!s_837.eVar69)s_837.eVar69="D=c69"}

		if(s_837.prop70){
			s_837.prop70=s_837.pfxID+s_837.prop70
			if(!s_837.eVar70)s_837.eVar70="D=c70"}

		if(s_837.prop71){
			s_837.prop71=s_837.pfxID+s_837.prop71
			if(!s_837.eVar71)s_837.eVar71="D=c71"}

		if(s_837.prop72){
			s_837.prop72=s_837.pfxID+s_837.prop72
			if(!s_837.eVar72)s_837.eVar72="D=c72"}

		if(s_837.prop73){
			s_837.prop73=s_837.pfxID+s_837.prop73
			if(!s_837.eVar73)s_837.eVar73="D=c73"}

	}

	if(_lc && navigator.appName.indexOf('Explorer')>-1)s_837.checkLength();

	s_837.linkTrackVars="prop37,prop27,prop11,prop12";
	s_837.hbx_lt="manual";
	s_837.setupLinkTrack("prop37,prop27,prop11,prop12","SC_LINK");
	s_837.linkTrackVars="";

}


s_837.doPlugins=s_doPlugins

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
/*
 * Plug-in: Check Length - checks the image request length and
 * overrides GET request if it is too long
*/
s_837.checkLength=new Function("",""
+"vid=s_837.c_r('s_vi')!=''?parseInt(s_837.c_r('s_vi').substring(7,40"
+").split('-')[0],16)!='':Math.floor(Math.random()*1000000000);tm=new"
+" Date;sed=Math&&Math.random?Math.floor(Math.random()*10000000000000"
+"):tm.getTime();sess='s'+Math.floor(tm.getTime()/10800000)%10+sed;y="
+"tm.getYear();vt=tm.getDate();tm.getMonth()+' '+tm.getHours()+':'+tm"
+".getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezon"
+"eOffset();y=y<1900?y+1900:y;urlnew=document.location.protocol+'//';urlnew"
+"+=urlnew.indexOf('s')>-1?s_837.trackingServerSecure:s_837.trackingServ"
+"er;urlnew+='/b/ss/'+s_837.un+'/0/FAS-3.4.5-AS3C/'+sess+'?AQB=1&ndh=1&t"
+"=';urlnew+=vt+'/'+tm.getMonth()+'/'+y+' '+tm.getHours()+':'+tm.getMinu"
+"tes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset("
+");urlnew+='&vid='+vid+s_837.hav()+'&AQE=1';if(urlnew.length>2047&&navigat"
+"or.appName.indexOf('Explorer')>-1){s_837.clp(urlnew);s_doPlugins=false"
+";_scEnabled='post';_lc=false;}");
s_837.cce=new Function("t",""
+"var o=document.createElement(t);o.style.display='none';document.get"
+"ElementsByTagName('body')[0].appendChild(o);return o;");
s_837.clp=new Function("q",""
+"var is_ie=navigator.appName.indexOf('Explorer')>-1;var ifr=is_ie?do"
+"cument.createElement('<iframe name=\"ifr\" style=\"display:none\"><"
+"/iframe>'):document.createElement('IFRAME');if(!ifr.name)ifr.name='"
+"ifr';ifr.style.display='none';document.getElementsByTagName('body')"
+"[0].appendChild(ifr);var f=s_837.cce('FORM');f.action=q.substring(0,q.i"
+"ndexOf('?'));f.method='POST';f.target='ifr';var v=q.substring(q.ind"
+"exOf('?')+1).split('&');var n;var e,l=v.length;for(var i=0;i<l;i++)"
+"{e=v[i];n=document.createElement('INPUT');n.type='text';n.name=e.su"
+"bstring(0,e.indexOf('='));n.value=unescape(e.substring(e.indexOf('=')+1));f.a"
+"ppendChild(n);}f.submit();ifr.style.display='none';");
/*
 * channelManager v2.5 - Tracking External Traffic
 */
s_837.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s_837.c_r("
+"e))v=0;if(!s_837.c_w(e,1,n))s_837.c_w(e,1,0);if(!s_837.c_r(e))v=0;}g=s_837.referrer"
+"?s_837.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+"Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s_837.linkInter"
+"nalFilters.toLowerCase();k=s_837.split(k,',');for(m=0;m<k.length;m++){B"
+"=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf('//'"
+");q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;u=t=g.substring(q,r).t"
+"oLowerCase();P='Other Natural Referrers';S=s_837.seList+'>'+s_837._extraSea"
+"rchEngines;if(d==1){j=s_837.repl(j,'oogle','%');j=s_837.repl(j,'ahoo','^');"
+"g=s_837.repl(g,'as_q','*')}A=s_837.split(S,'>');for(i=0;i<A.length;i++){D=A"
+"[i];D=s_837.split(D,'|');E=s_837.split(D[0],',');for(G=0;G<E.length;G++){H="
+"j.indexOf(E[G]);if(H>-1){i=s_837.split(D[1],',');for(k=0;k<i.length;k++"
+"){l=s_837.getQueryParam(i[k],'',g).toLowerCase();if(l){M=l;if(D[2])N=u="
+"D[2];else N=t;if(d==1){N=s_837.repl(N,'#','-');g=s_837.repl(g,'*','as_q');N"
+"=s_837.repl(N,'^','ahoo');N=s_837.repl(N,'%','oogle');}}}}}}}if(!O||f!='1')"
+"{O=s_837.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';else P='Unkn"
+"own Paid Channel';}if(!O&&M){u=N;P='Natural Search';}}if(h==1&&!O&&"
+"v==1)u=P=t=p='Typed/Bookmarked';g=s_837._channelDomain;if(g){k=s_837.split("
+"g,'>');;for(m=0;m<k.length;m++){q=s_837.split(k[m],'|');r=s_837.split(q[1],"
+"',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.index"
+"Of(Y);if(i>-1)P=q[0];}}}g=s_837._channelParameter;if(g){k=s_837.split(g,'>'"
+");h;for(m=0;m<k.length;m++){q=s_837.split(k[m],'|');r=s_837.split(q[1],',')"
+";S=r.length;for(T=0;T<S;T++){U=s_837.getQueryParam(r[T]);if(U)P=q[0];}}"
+"}g=s_837._channelPattern;if(g){k=s_837.split(g,'>');for(m=0;m<k.length;m++)"
+"{q=s_837.split(k[m],'|');r=s_837.split(q[1],',');S=r.length;for(T=0;T<S;T++"
+"){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H==0"
+")P=q[0];}}}X=P+M+t;c=c?c:'c_m';if(c!='0')X=s_837.getValOnce(X,c,0);if(X"
+"){s_837._referrer=p?p:'n/a';s_837._referringDomain=t?t:'n/a';s_837._partner=N?N"
+":'n/a';s_837._campaignID=O?O:'n/a';s_837._campaign=u?u:'n/a';s_837._keywords=M?"
+"M:'n/a';s_837._channel=P?P:'n/a';}");
/* Top 130 - Grouped */
s_837.seList="altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc"
+".de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum"
+".net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Go"
+"ogle>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|"
+"MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query"
+",search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sezn"
+"am.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query"
+"|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>"
+"yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.ea"
+"rthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>"
+"search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s_837.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s_837.c_r(cn);if(cval.length="
+"=0){s_837.c_w(cn,ct+'-New',e);return'New';}sval=s_837.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s_837.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s_837.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
 * Plugin Utility: apl v1.1
 */
s_837.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s_837.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s_837.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: Days since last Visit 1.0.H - capture time from last visit
 */
s_837.getDaysSinceLastVisit=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
+"60*60*1000;e.setTime(ct+3*365*day);cval=s_837.c_r(c);if(!cval){s_837.c_w(c,"
+"ct,e);return 'First page view or cookies not supported';}else{var d"
+"=ct-cval;if(d>30*60*1000){if(d>30*day){s_837.c_w(c,ct,e);return 'More t"
+"han 30 days';}if(d<30*day+1 && d>7*day){s_837.c_w(c,ct,e);return 'More "
+"than 7 days';}if(d<7*day+1 && d>day){s_837.c_w(c,ct,e);return 'Less tha"
+"n 7 days';}if(d<day+1){s_837.c_w(c,ct,e);return 'Less than 1 day';}}els"
+"e return '';}"
);
/*
* Plugin: getVisitNum - version 3.0
*/
s_837.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s_837.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s_837.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s_837.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s_837.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s_837.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s_837.c_w(c2,'true',e);return str;}else {s_837.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s_837.c_w(c2,'true',e);return 1;}}");
s_837.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s_837.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s_837.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");
/*
 * Plugin: setupLinkTrack 2.0 - return links for HBX-based link
 *         tracking in SiteCatalyst (requires s_837.split and s_837.apl)
 */
s_837.setupLinkTrack=new Function("vl","c",""
+"_lc=true;var s=this;var l=s_837.d.links,cv,cva,vla,h,i,l,t,b,o,y,n,oc,d='';cv=s_837."
+"c_r(c);if(vl&&cv!=''){cva=s_837.split(cv,'^^');vla=s_837.split(vl,',');for("
+"x in vla)s_837._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}s_837.c_w(c,'',0);if(!s_837.e"
+"o&&!s_837.lnk)return '';o=s_837.eo?s_837.eo:s_837.lnk;y=s_837.ot(o);n=s_837.oid(o);if(s_837.eo&"
+"&o==s_837.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement"
+":o.parentNode;if(!o)return '';y=s_837.ot(o);n=s_837.oid(o);}for(i=0;i<4;i++"
+")if(o.tagName)if(o.tagName.toLowerCase()!='a')if(o.tagName.toLowerC"
+"ase()!='area')o=o.parentElement;}b=s_837._LN(o);o.lid=b[0];o.lpos=b[1];"
+"if(s_837.hbx_lt&&s_837.hbx_lt!='manual'){if((o.tagName&&s_837._TL(o.tagName)=='"
+"area')){if(!s_837._IL(o.lid)){if(o.parentNode){if(o.parentNode.name)o.l"
+"id=o.parentNode.name;else o.lid=o.parentNode.id}}if(!s_837._IL(o.lpos))"
+"o.lpos=o.coords}else{if(s_837._IL(o.lid)<1)o.lid=s_837._LS(o.lid=o.text?o.t"
+"ext:o.innerText?o.innerText:'');if(!s_837._IL(o.lid)||s_837._II(s_837._TL(o.lid"
+"),'<img')>-1){h=''+o.innerHTML;bu=s_837._TL(h);i=s_837._II(bu,'<img');if(bu"
+"&&i>-1){eval(\"__f=/ src\s*=\s*[\'\\\"]?([^\'\\\" ]+)[\'\\\"]?/i\")"
+";__f.exec(h);if(RegExp.$1)h=RegExp.$1}o.lid=h}}}h=o.href?o.href:'';"
+"i=h.indexOf('?');h=s_837.linkLeaveQueryString||i<0?h:h.substring(0,i);l"
+"=s_837.linkName?s_837.linkName:s_837._hbxln(h);t=s_837.linkType?s_837.linkType.toLowerC"
+"ase():s_837.lt(h);oc=o.onclick?''+o.onclick:'';cv=s_837.pageName+'^^'+o.lid"
+"+'^^'+s_837.pageName+' | '+(o.lid=o.lid?o.lid:'no &lid')+'^^'+o.lpos;if"
+"(t&&(h||l)){cva=s_837.split(cv,'^^');vla=s_837.split(vl,',');for(x in vla)s"
+"._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}else if(!t&&oc.indexOf('.tl(')<"
+"0){s_837.c_w(c,cv,0);}else return ''");
s_837._IL=new Function("a","var s=this;return a!='undefined'?a.length:0");
s_837._II=new Function("a","b","c","var s=this;return a.indexOf(b,c?c:0)"
);
s_837._IS=new Function("a","b","c",""
+"var s=this;return b>s_837._IL(a)?'':a.substring(b,c!=null?c:s_837._IL(a))");
s_837._LN=new Function("a","b","c","d",""
+"var s=this;b=a.href;b+=a.name?a.name:'';c=s_837._LVP(b,'lid');d=s_837._LVP("
+"b,'lpos');r"
+"eturn[c,d]");
s_837._LVP=new Function("a","b","c","d","e",""
+"var s=this;c=s_837._II(a,'&'+b+'=');c=c<0?s_837._II(a,'?'+b+'='):c;if(c>-1)"
+"{d=s_837._II(a,'&',c+s_837._IL(b)+2);e=s_837._IS(a,c+s_837._IL(b)+2,d>-1?d:s_837._IL(a)"
+");return e}return ''");
s_837._LS=new Function("a",""
+"var s=this,b,c=100,d,e,f,g;b=(s_837._IL(a)>c)?escape(s_837._IS(a,0,c)):esca"
+"pe(a);b=s_837._LSP(b,'%0A','%20');b=s_837._LSP(b,'%0D','%20');b=s_837._LSP(b,'%"
+"09','%20');c=s_837._IP(b,'%20');d=s_837._NA();e=0;for(f=0;f<s_837._IL(c);f++){g"
+"=s_837._RP(c[f],'%20','');if(s_837._IL(g)>0){d[e++]=g}}b=d.join('%20');retu"
+"rn unescape(b)");
s_837._LSP=new Function("a","b","c","d","var s=this;d=s_837._IP(a,b);return d"
+".join(c)");
s_837._IP=new Function("a","b","var s=this;return a.split(b)");
s_837._RP=new Function("a","b","c","d",""
+"var s=this;d=s_837._II(a,b);if(d>-1){a=s_837._RP(s_837._IS(a,0,d)+','+s_837._IS(a,d"
+"+s_837._IL(b),s_837._IL(a)),b,c)}return a");
s_837._TL=new Function("a","var s=this;return a.toLowerCase()");
s_837._NA=new Function("a","var s=this;return new Array(a?a:0)");
s_837._hbxm=new Function("m","var s=this;return (''+m).indexOf('{')<0");
s_837._hbxln=new Function("h","var s=this,n=s_837.linkNames;if(n)return s_837.pt("
+"n,',','lnf',h);return ''");
/*
 * Plugin: getQueryParam 2.4
 */
s_837.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s_837.pageURL?s_837.pageURL:s_837.wd.loca"
+"tion);if(u=='f')u=s_837.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s_837.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s_837.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s_837.pt(q,'&','p_gvf',k)}return v");
s_837.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s_837."
+"epa(v)}return''");
/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *  variable (requires split utility)
 */
s_837.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s_837.events){i=s_837.split(el,',');j=s_837.split(s_837.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s_837.c_r(c)) r=s_837.c_r(c);v?s_837.c_w(c,v,t)"
+":s_837.c_w(c,'no value',t);return r}}}}}else{if(s_837.c_r(c)) r=s_837.c_r(c);v?"
+"s_837.c_w(c,v,t):s_837.c_w(c,'no value',t);return r}");
/*
 * Plugin: getValOnce_v1.1
 */
s_837.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s_837.c_r(c);if(v){a.setTime(a.getTime()+e*i);s_837.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");
/*
 * Plugin: getTimeParting 2.0
 */
s_837.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s_837.dstStart&&s_837.dstEnd){B=s_837.dstStart;C=s_837.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s_837.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");
/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value

s_837.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s_837.events&&ev){var"
+" ay=s_837.split(ev,',');var ea=s_837.split(s_837.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s_837.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s_837.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s_837.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s_837.repl(z,'[','');z=s_837.repl(z,']','');z=s_837.repl(z,\"'\",'');arry"
+"[q]=s_837.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s_837.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s_837.c_w(cn,data,e);var r=s_837.join(h,{deli"
+"m:dl});if(ce)s_837.c_w(cn,'');return r;");
*/

/*
 *	Plug-in: crossVisitParticipation v1.6 - stacks values from
 *	specified variable in cookie and returns value
 */
s_837.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s_837.events&&ev){var"
+" ay=s_837.split(ev,',');var ea=s_837.split(s_837.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s_837.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s_837.c_r(cn),g=0,h=new Array()"
+";if(c&&c!='')arry=eval(c);var e=new Date();e.setFullYear(e.getFullY"
+"ear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[ar"
+"ry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new"
+" Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var "
+"td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.roun"
+"d((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arr"
+"y[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s_837.join(a,{deli"
+"m:',',front:'[',back:']',wrap:\"'\"});s_837.c_w(cn,data,e);var r=s_837.join"
+"(h,{delim:dl});if(ce)s_837.c_w(cn,'');return r;");

/*
 * s_837.join: 1.0 - Joins an array into a string
 */
s_837.join=new Function("v","p",""
+"var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s_837.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


//s_837.visitorNamespace="verizontelecom"
//s_837.trackingServer="verizontelecom.112.2o7.net"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
s_837.visitorNamespace="verizontelecom"
s_837.trackingServer="verizontelecom.112.2o7.net"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.23.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s."
+"d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window."
+"s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload"
+"=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTrackin"
+"g){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}if(typeof _scEnabled=='undefined'){im.src=rs};if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.na"
+"me))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){va"
+"r s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s"
+".pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.su"
+"bstring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,s"
+"earch_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',"
+"')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs"
+"='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nf"
+"l)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(n"
+"ke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='ret"
+"rieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss"
+")){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k"
+"}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrac"
+"kVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+f"
+"e+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if("
+"v&&(!fv||fv.indexOf(k)>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}"
+"else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else i"
+"f(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else i"
+"f(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel"
+"')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q"
+"='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';"
+"else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='ligh"
+"tStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q"
+"='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else "
+"if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('"
+"?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;"
+"return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&l"
+"ft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Func"
+"tion('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&"
+"s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');"
+"s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o."
+"protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot="
+"function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.ty"
+"pe&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t="
+"='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o"
+".value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t"
+",un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return"
+" q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t"
+".indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='"
+"s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s."
+"squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wd"
+"l=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\""
+"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)"
+"s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.vis"
+"itorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};"
+"s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dy"
+"asmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if"
+"(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun"
+")s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m"
+"_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s',"
+"'n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._i"
+"n]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]="
+"new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}"
+"m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x"
+");u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else i"
+"f(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadMod"
+"ule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))"
+"&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o"
+".l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f"
+"2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.o"
+"nreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;"
+"o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){"
+"k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.leng"
+"th;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime"
+"()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if("
+"!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&"
+"&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.ge"
+"tHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tf"
+"s.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s"
+".isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if"
+"(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerH"
+"eight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&"
+"&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b."
+"addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;p"
+"n++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb)"
+";s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer"
+"=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.paren"
+"tElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)r"
+"eturn ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||"
+"t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1"
+";i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s"
+".sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs"
+");}else{s.dl(vo);}if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};"
+"s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncre"
+"mentBy=i;s.t(vo)};s.jsLoaded=function(){var s=this,x;if(s.lmq)for(i=0;i<s.lmq.length;i++){x=s.lmq[i];s.loadModule(x.n,x.u,x.d)}if(s.onLoad)s.onLoad(s);if(s.tq)for(i=0;i<s.tq.length;i++)s.t(s.tq[i])"
+"};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navi"
+"gator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='"
+"Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substrin"
+"g(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(St"
+"ring.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,vis"
+"itorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,co"
+"okieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,z"
+"ip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s"
+".vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,color"
+"Depth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerS"
+"ecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,"
+"trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';"
+"s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(u"
+"n,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,x,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||x=='s_l')&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
